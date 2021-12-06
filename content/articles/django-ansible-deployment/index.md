### Introduction
Deploying applications to production is a complex process requiring many configurations and testing. Imagine that you want to deploy a new version of your application to production. It would help if you made sure that the new version is stable and compatible with the existing version of your application. You will need to repeat the deployment steps for each application version. If you want to deploy your application to production several times, manual deployment becomes tiresome. This is where [ansible](https://www.ansible.com/) comes in. We can automate the deployment process with ansible.

In this article, we will be deploying a Django application to production. We will be using the [Django](https://docs.djangoproject.com/en/2.0/intro/tutorial01/) framework and [ansible](https://www.ansible.com/). We will also use the [nginx](https://www.nginx.com/) webserver.

### Table of Contents
- [Introduction](#introduction)
- [Table of Contents](#table-of-contents)
- [Prerequisites](#prerequisites)
- [Application Setup](#application-setup)
  - [Models](#models)
  - [Serializers](#serializers)
  - [Views](#views)
  - [URL Configuration](#url-configuration)
- [Ansible](#ansible)
  - [Update](#update)
  - [Generate SSH Key](#generate-ssh-key)
  - [Repository configuration](#repository-configuration)
  - [Ansible Shell Command](#ansible-shell-command)
- [Conclusion](#conclusion)

### Prerequisites
Before you start this article, you need to have a basic understanding of the following topics:
1. [Django](https://docs.djangoproject.com/en/2.0/intro/tutorial01/)
2. [Nginx](https://www.nginx.com/)
3. [Python](https://www.python.org/) programming language and [Python 3](https://www.python.org/downloads/) installed on your machine.

### Application Setup
We will build a budget management application API that will allow us to create, update, and delete a budget.
1. Create a new working directory for our project by executing the following command:
   ```bash
    mkdir deployment
   ```
2. Create a new virtual environment by executing the following command:
   ```bash
    virtualenv deployment/venv
   ```
3. Create a new Django project by executing the following command:
   ```bash
    django-admin startproject budgetmanager
   ```
4. Django organizes code into smaller units called apps. We will create a new app called `budget` by executing the following command:
   ```bash
    django-admin startapp budget
   ```
5. Since we are going to create RESTful APIS, we will need to install the [Django REST framework](https://www.django-rest-framework.org/) by executing the following command:
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

#### URL Configuration
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

#### Generate SSH Key
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

#### Ansible Shell Command
To pull the code from the repository to the server, we need a shell command that reads the configuration from the `hosts` file and uses the provided information to pull the code from the repository to the server.
1. In the `ansible` directory, create a new file named `ansible.sh`.
2. Add the code snippet below to the `ansible.sh` file created above.

```bash
ansible-playbook -i ./hosts $1
```
The code snippet above will run the server's `ansible-playbook` command.

### Conclusion
In this tutorial, we have created a budget management application and deployed it to production using ansible. First, try implementing automated deployments using ansible in Django projects to reduce the time spent on manual Django application deployments.
