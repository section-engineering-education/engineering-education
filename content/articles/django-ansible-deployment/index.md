---
layout: engineering-education
status: publish
published: true
url: /django-ansible-deployment/
title: Getting started with Django Ansible Deployment
description: This tutorial will guide you through the process of deploying a Django application using Ansible to a remote server.
author: elizabeth-akinyi
date: 2021-12-28T00:00:00-13:30
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/django-ansible-deployment/hero.png
    alt: Getting Started with Django Ansible Deployment Hero Image
---
Deploying applications to production is a complex process requiring many configurations and testing. Imagine that you want to deploy a new version of your application to production. It would help if you made sure that the new version is stable and compatible with the existing version.

You would need to repeat the deployment steps for each application version. Manual deployment becomes tiresome if you want to deploy your application to production several times. This is where [ansible](https://www.ansible.com/) comes into play. It gives us the ability to automate the deployment process.
 <!--more-->
In this article, we will be deploying a Django application to production. Besides the [Django](https://docs.djangoproject.com/en/2.0/intro/tutorial01/) framework and [ansible](https://www.ansible.com/), we will also use the [Nginx](https://www.nginx.com/) webserver.

### Table of contents
- [Prerequisites](#prerequisites)
- [Application Setup](#application-setup)
  - [Models](#models)
  - [Serializers](#serializers)
  - [Views](#views)
  - [URL Configuration](#url-configuration)
- [Ansible](#ansible)
  - [System Packages](#system-packages)
  - [Update](#update)
  - [Generate SSH Key](#generate-ssh-key)
- [Deployment](#deployment)
  - [Repository configuration](#repository-configuration)
  - [Ansible Shell Command](#ansible-shell-command)
- [Conclusion](#conclusion)

### Prerequisites
Before you start this article, you need to have a basic understanding of the following:
1. [Django](https://docs.djangoproject.com/en/2.0/intro/tutorial01/).
2. [Nginx](https://www.nginx.com/).
3. [Python](https://www.python.org/) programming language and [Python 3](https://www.python.org/downloads/) installed on your machine.

### Application setup
We will build a budget management application API that will allow us to create, update, and delete a budget.
1. Create a new working directory for our project by executing the following command:
   ```bash
   mkdir deployment
   ```
2. Create a new virtual environment:
   ```bash
   virtualenv deployment/venv
   ```
3. Create a new Django project:
   ```bash
   django-admin startproject budgetmanager
   ```
4. Django organizes code into smaller units called apps. We will create a new app called `budget`:
   ```bash
   django-admin startapp budget
   ```
5. Since we are going to create RESTful APIS, we will need to install the [Django REST framework](https://www.django-rest-framework.org/) by:
   ```bash
   pip install django-rest-framework
   ```
#### Models
Django models are objects that represent a database table. For example, we will create a budget model mapped to the `budgets` table in the database.

In the `budget` application, in `models.py`, add the following code:

```python
from django.db import models
class Budget(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField()
    amount = models.PositiveIntegerField()
    date_creates = models.DateTimeField(auto_created=True, auto_now_add=True)
    last_modified = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title

```
The code snippet above contains the Budget class and its attributes. The `__str__` method returns a string representation of the budget object.

#### Serializers
Django serializers are used to convert a Django model object into a JSON object. Django REST framework provides a way to serialize and deserialize data. We will create a serializer that Django uses to serialize and deserialize the budget model.
1. In the `budget` application, create a new file named `serializers.py`.
1. In the `budget` application, in `serializers.py`, add the following code:
```python
from rest_framework import serializers
from budget.models import Budget

class BudgetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Budget
        fields = "__all__"
```
- ` "__all__"` is a special keyword that represents all the fields of the model.
  
#### Views
Django views are used to handle requests from the client. Therefore, we will create a view that will be used to handle the requests from the client.
1. In the `budget` application, add the code snippet below in the `views.py` file.
```python
from rest_framework.generics import ListAPIView
from rest_framework.generics import CreateAPIView
from rest_framework.generics import DestroyAPIView
from rest_framework.generics import UpdateAPIView

from budget.models import Budget
from budget.serializer import BudgetSerializer

class ListBudgetAPI(ListAPIView):
    """Retrieves all the budgets available in our database"""
    queryset = Budget.objects.all()
    serializer_class = BudgetSerializer

class CreateBudgetAPI(CreateAPIView):
    """Creates a new budget in our database"""
    queryset = Budget.objects.all()
    serializer_class = BudgetSerializer

class UpdateBudgetAPI(UpdateAPIView):
    """Update budget with the id sent through the request url path"""
    queryset = Budget.objects.all()
    serializer_class = BudgetSerializer

class DeleteBudgetAPI(DestroyAPIView):
    """Deletes a budget whose id has been sent through the url path"""
    queryset = Budget.objects.all()
    serializer_class = BudgetSerializer
```

#### URL configuration
Django views are mapped to URLs. We will create a url configuration file that will be used to map the views to URLs.
1. In the `budget` application, create a new file named `urls.py`.
2. Add the following code snippet to the `urls.py` file.
```python
from django.urls import path
from budget import views

urlpatterns = [
    path("", views.ListBudgetAPI.as_view(), name="budget_list"),
    path("create/", views.CreateBudgetAPI.as_view(), name="create_budget"),
    path("update/<int:pk>/", views.UpdateBudgetAPI.as_view(), name="update_budget"),
    path("delete/<int:pk>/", views.DeleteBudgetAPI.as_view(), name="delete_budget")
]
```
We must always add the `url` configurations of the respective application in the main `urls.py` file located in the project's root directory.

```python
urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/v1/budget/', include("budget.urls")),
]
```

### Ansible
Ansible uses `yml` files to configure your server. The ansible `yml` files are also called `playbooks`. Create a new directory named `ansible` in the root project folder.

#### System packages
1. In the `ansible` directory, create a new file named `packages.yml`.
2. Add the following code snippet to the `packages.yml` file.
```yml
---
- hosts: all
  gather_facts: no
  tasks:
    - name: Running apt update
      apt: update_cache=yes
    - name: Installing required packages
      apt: name={{item}} state=present
      with_items:
        - fail2ban
        - git
        - python-pip
        - rdiff-backup
        - libpq-dev
        - uwsgi
        - uwsgi-plugin-python
        - nginx
```
The above file contains all the system packages that we require for our application to run on the server.

#### Update
1. In the `ansible` directory, create a new file named `update.yml`.
2. Add the following code to the `update.yml` file:
```yaml
---
- hosts: all
  gather_facts: no
  tasks:
    - name: Runing system update
      apt: update_cache=yes
        upgrade=safe
      register: result
    - debug: var=result.stdout_lines
```
The above playbook will run the `apt update` command on the server and run the `apt upgrade` command.

#### Generate SSH key
To make it possible for our server to connect with GitLab and pull the latest code, we need to generate an SSH key. Ansible will use this SSH key to establish a secure connection between our server and GitLab.

1. In the `ansible` directory, create a new file named `generate_ssh_key.yml`.
2. Add the code snippet below to the `generate_ssh_key.yml` file created above.
```yaml
---
- hosts: all
  gather_facts: no
  tasks:
    - name: Create a new system user
      user: name=ubuntu generate_ssh_key=yes ssh_key_bits=2048 ssh_key_file=.ssh/id_rsa #creates a ssh key in .ssh/id_rsa file
    - name: Read SSH public key
      slurp: src=/home/ubuntu/.ssh/id_rsa.pub
      register: public_key
    - debug: msg="{{ public_key['content'] | b64decode }}"
```
The above playbook generates an SSH key on our server and stores it in the `.ssh/id_rsa.pub` file.

### Deployment
1. In the `ansible` directory, create a new file named `deploy.yml`.
2. Add the code snippet below to the `deploy.yml` file.
```yaml
---
- hosts: all
  become: yes
  become_user: ubuntu
  gather_facts: no

  tasks:
    - name: pull branch master
      git: repo={{ repo_url }}/{{ repo }}.git
        dest={{ repo_dir }}
        accept_hostkey=yes

- hosts: all
  gather_facts: no
  tasks:
    - name: install python requirements
      pip: requirements={{ repo_dir }}/requirements/production.txt extra_args=--upgrade

- hosts: all
  become: yes
  become_user: ubuntu
  gather_facts: no
  environment:
    DJANGO_SETTINGS_MODULE: "{{ django_project }}.settings.production"
    STATIC_ROOT: "{{ static_dir }}"

  tasks:
    - name: create static_root dir
      file: path={{ static_dir }} state=directory mode=0755
    - name: django collectstatic
      shell: ./manage.py collectstatic --noinput chdir={{ django_dir }}
    - name: django migrate
      shell: ./manage.py migrate --noinput chdir={{ django_dir }}
    - name: django loaddata
      shell: ./manage.py loaddata user chdir={{ django_dir }}

- hosts: all
  gather_facts: no
  tasks:
    - name: uwsgi restart
      service: name=uwsgi state=restarted
```
The configuration above will pull the latest code from GitLab and install the required Python packages.
It will also:
1. Create the `static_root` directory and run the `collectstatic` command to collect all static files.
2. Run the `migrate` command to migrate the database.
3. Load the `user` fixture to populate the database.
4. Restart the `uwsgi` service.

#### Repository configuration
We need to configure our server to connect to our repository to pull the latest code.
1. In the `ansible` directory, create a new file named `hosts`.
2. Add the code snippet below to the `hosts` file created above.
```yaml
all:
    hosts: yourserver
    vars:
        repo_url: ssh://git@bitbucket.org/user
        repo: project
        home_dir: /home/ubuntu
        repo_dir: "{{ home_dir }}/{{ repo }}"
        django_dir: "{{ repo_dir }}/django"
        django_project: project
```
- Change the `yourserver` to your server name and `repo_url` to your repository url.

#### Ansible shell command
To pull the code from the repository to the server, we need a shell command that reads the configuration from the `hosts` file and uses the provided information to pull the code from the repository to the server.

In the `ansible` directory, create a new file named `ansible.sh`. Add the following code:

```bash
#!/bin/bash
ansible-playbook -i ./hosts $1
```
The code snippet above will run the server's `ansible-playbook` command.

Excecute the `ansible.sh` file using the following command:
```bash
./ansible.sh generate_ssh_key.yaml
```
The command above generates an SSH key on the server and stores it in the `.ssh/id_rsa.pub` file; the SSH key is also added to the Git repository.

Once the SSH key is added to the Git repository, we can pull the latest code to the server. Execute the commands below to pull the latest code from the repository and deploy it on the server.

```bash
./ansible.sh packages.yaml
./ansible.sh update.yaml
./ansible.sh deploy.yaml
```
Whenever we want to update our application, we only need to execute the command below to pull the latest code from the repository and deploy on the server.

```bash
./ansible.sh deploy.yaml
```
### Conclusion
We have created a budget management application in this tutorial and deployed it to production using Ansible.

Try implementing automated deployments using Ansible in Django projects to reduce the time spent on manual Django application deployments. You can download the source code of this tutorial [here](https://drive.google.com/file/d/19ST8qXnaHC0Rep7C9nO7uxg-yOENGfcR/view?usp=sharing).

---
Peer Review Contributions by: [Okelo Violet](/engineering-education/authors/okelo-violet/)