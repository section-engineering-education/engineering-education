---
layout: engineering-education
status: publish
published: true
url: /django-celery-tasks/
title: Getting started with Django and Celery
description: In this article, we will learn how to integrate Celery into a Django application and perform periodic tasks, create a Django application that runs a backup script to backup itself every 1 hour.
author: njeri-karen
date: 2021-08-05T00:00:00-10:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/django-celery-tasks/hero.png
    alt: Django and Celery example
---
When we are working with data-intensive applications, long-running tasks slow down the application and the website load time. We can improve the application load time by offloading some work from the application server to a message broker server in such an application.
<!--more-->
In this tutorial, we will learn how to use Celery in a Django application to perform long-running background tasks.

### Table of contents
- [Table of Contents](#table-of-contents)
- [Prerequisites](#prerequisites)
- [Workers](#workers)
- [Celery Message Queue](#celery-message-queue)
- [Celery](#celery)
- [Project Setup](#project-setup)
  - [Adding Celery configuration to Django application](#adding-celery-configuration-to-django-application)
  - [Creating a Celery task](#creating-a-celery-task)
  - [Creating the HTML files](#creating-the-html-files)
  - [Form](#form)
- [View](#view)
  - [URLs](#urls)
- [Setting up base templates directory](#setting-up-base-templates-directory)
- [Containerization](#containerization)
  - [Creating the Dockerfile](#creating-the-dockerfile)
  - [Create a Docker compose deployment file](#create-a-docker-compose-deployment-file)
  - [Building the image](#building-the-image)
  - [Deploying with Docker compose](#deploying-with-docker-compose)
- [Testing](#testing)
- [Conclusion](#conclusion)

### Prerequisites
In order to follow along with this tutorial - you will need the following:
1. [Python](https://www.python.org/) installed in your computer.
2. A good understanding of [Python](https://www.tutorialspoint.com/python/index.htm) and [Django](https://www.djangoproject.com/).
3. [Docker](https://www.section.io/engineering-education/getting-started-with-docker/) installed on your computer.
   
### Workers
The background-based task servers are called `workers`. In an application with web servers, we can have several workers perform the heavy computations in the background and send back the response to the application through webhooks or callbacks.

### Celery message queue
A queue is a data structure that works based on the first-in, first-out principle. We assign work to the workers through a message queue. The worker processes the tasks in the order in which the message broker queued them.

> The queue ensures that each worker processes a single task at a time, and only a single worker processes a particular task.

### Celery
Celery makes it easier to implement the task queues for many workers in a Django application.

Functions of Celery:
- Define tasks as python functions.
- Listen to a message broker for new tasks.
- Assign the tasks to workers.
- Monitor the workers and tasks.

### Project setup
1. Create a working directory by executing the command below.

```bash
mkdir project
```

2. Change the working directory to the `project` directory created above by executing the command below.

```bash
cd project
```

3. Create a Django application with the command below.
   
```bash
django-admin startproject celerytask
```

4. Create a virtual environment where the packages will be installed with the command below.

```bash
virtualenv venv
```

5. Activate the virtual environment by executing the command below.

```bash
source venv/bin/activate
```

6. Install Django into the virtual environment we have created above by executing the command below.

```bash
pip install django
```

7. Migrate the database models by executing the command below.
  
```bash
cd celerytask
python manage.py migrate
```

8. Now we can add celery to our application.
    
```bash
pip install celery
```

9. Start the Django web server by executing the command below.
   
```bash
python manage.py runserver
```

10. Navigate to [http://localhost:8000/](http://localhost:8000/) to confirm that the application is up and running.


#### Adding Celery configuration to Django application
- In the project folder where the `settings.py` file exists, create a new Python file named `celery.py`.

- Add the code snippet below to the file created above.
   
```python
    from __future__ import absolute_import, unicode_literals
    import os
    from celery import Celery

    # setting the Django settings module.
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'celery_task.settings')
    app = Celery('celery_task')
    app.config_from_object('django.conf:settings', namespace='CELERY')

    # Looks up for task modules in Django applications and loads them
    app.autodiscover_tasks()
```
   
The above configuration creates a Celery application using the Django settings. `app.autodiscover_tasks()` tries to discover a file named `task.py` in all of our Django applications.

In the `__init__.py` file within the package where `settings.py` file is located, add the code snippet below.

```python
from .celery import app as celery_app

__all__ = ['celery_app']
```

The above code snippet imports Celery every time our application starts.

#### Creating a Celery task

Let's create a Django app from where we will set up the Celery task.

- To create a new Django app, execute the command below. In the command, `task` will be the name of our app.
   
```bash
python manage.py startapp task
```
   
- Create a Python file named `task.py` in the `task` directory that we have just created.

- Add the Code snippet below into the `task.py` created above.
   
```python
   import string
   from django.contrib.auth.models import User
   from django.utils.crypto import get_random_string

   from celery import shared_task

   @shared_task
   def create_random_user_accounts(total):
      for i in range(total):
         username = 'user_{}'.format(get_random_string(10, string.ascii_letters))
         email = '{}@example.com'.format(username)
         password = get_random_string(50)
         User.objects.create_user(username=username, email=email, password=password)
      return '{} random users created with success!'.format (total)
   
``` 

The above function creates random user accounts.

The method signature of a Celery task is as shown below.

```python
from celery import shared_task

@shared_task
def name_of_your_function(optional_param):
    pass  # do some long running task
```

#### Creating the HTML files
Create a folder named `templates` in the project's root directory. In the `templates` directory created above, create another directory within it named `task` as it will hold the HTML files for our Django `task`.

- In the `task`, directory created above, create a file named `base.html` and add the code snippets below into it. The below code snippet is the base template that other template files will extend from.
   
   ```html
   <!DOCTYPE html>
   <html>
   <head>
      <meta charset="utf-8">
      <title>Celery tasks</title>
      <style type="text/css">
         body {
         width: 800px;
         margin: 20px auto;
         }
      </style>
   </head>
   <body>
      <h1>Django Celery Task</h1>
      <a href="{% url 'users_list' %}">Users List</a> /
      <a href="{% url 'generate' %}">Generate Random Users</a>
      <hr>

      {% if messages %}
         {% for message in messages %}
            <p style="color: green">{{ message }}</p>
         {% endfor %}
      <hr>
      {% endif %}

   {% block content %}
   {% endblock %}

   </body>
   </html>
   ```
   
- In the `task` directory, create a file named `user_list.html` and add the code snippets below. The code snippet below will display the list of generated random users.
   
```html
   {% extends 'task/base.html' %}

   {% block content %}
    <h2>Users List</h2>

    <ul>
        {% for user in object_list %}
            <li>{{ user.username }} - {{ user.email }} - {{ user.date_joined }}</li>
        {% empty %}
            <li>No users. <a href="{% url 'generate' %}">Generate some random users.</a></li>
        {% endfor %}
    </ul>
   {% endblock %}
```
  
- In the `task` directory create a file named `generate_random_user.html` and add the code snippets below. The below code snippet contains an input field where we will specify the number of random users to generate.
   
```html
   {% extends 'task/base.html' %}

   {% block content %}
    <h2>Generate Random Users</h2>
    <form method="post">
        {% csrf_token %}
        <table>
            {{ form }}
        </table>
        <button type="submit">Submit</button>
    </form>
   {% endblock %}
```

#### Form
In the `task` directory (not the one in the templates directory), create a Python file named `form.py` and add the code snippet below:

```python
from django import forms
from django.core.validators import MinValueValidator, MaxValueValidator

class GenerateRandomUserForm(forms.Form):
    total = forms.IntegerField(
        validators=[
            MinValueValidator(50),
            MaxValueValidator(500)
        ]
    )
```

### View
Add the code snippet below into the `views.py` file in the `task`:

```python
from django.contrib.auth.models import User
from django.contrib import messages
from django.views.generic import ListView
from django.views.generic.edit import FormView
from django.shortcuts import redirect

from .form import GenerateRandomUserForm
from .task import create_random_user_accounts

# returns a list of generated user accounts
class UsersListView(ListView):
    template_name = 'task/user_list.html'
    model = User

# A page with the form where we can input the number of accounts to generate
class GenerateRandomUserView(FormView):
    template_name = 'task/generate_random_user.html'
    form_class = GenerateRandomUserForm

    def form_valid(self, form):
        total = form.cleaned_data.get('total')
        create_random_user_accounts.delay(total)
        messages.success(self.request, 'We are generating your random users! Wait a moment and refresh this page.')
        return redirect('users_list')
```

In the code snippet above, notice that we did not call the `create_random_user_accounts` method instead we called `create_random_user_accounts.delay(total)`. This instructs Celery to perform the task as a background process.

#### URLs
Update the `urls.py` with the code snippet below.

```python
from django.conf.urls import url
from django.contrib import admin
from django.urls import path

from task.views import GenerateRandomUserView, UsersListView

urlpatterns = [
    path('admin/', admin.site.urls),
    url('users/', UsersListView.as_view(), name='users_list'),
    url('generate/', GenerateRandomUserView.as_view(), name='generate')

]
```

### Setting up base templates directory
In the `settings.py` file, update the `TEMPLATES` section with the code snippet below.

```python
TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [BASE_DIR / 'templates'], # We are adding in the directory where our templates will be stored.
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

``` 

- Execute the command below to create a `requirements.txt` file that we will use when building the Docker image.

```bash
pip freeze > requirements.txt
```

- `requirements.txt` file contains all the packages required by our application.

### Containerization
#### Creating the Dockerfile
In the root project directory, `project/celerytask`, create a file named `Dockerfile` and add the code snippet below.

```Dockerfile
# pull the official base image
FROM python:3.9.5-alpine

# set work directory
WORKDIR /usr/src/app

# set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# install dependencies
RUN pip install --upgrade pip
COPY ./requirements.txt /usr/src/app/requirements.txt
RUN pip install -r requirements.txt

# copy project
COPY . /usr/src/app/

RUN python manage.py migrate

EXPOSE 8000

CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
```

The code snippet above contains directives that will be used to create the Docker image. For more information on creating Django Docker images, visit [creating Django Docker images](https://www.section.io/engineering-education/django-docker/).

#### Create a Docker compose deployment file
In the working directory `project`, create a file named `docker-compose.yml` and add the code snippet below.

```yml
version: '3.3'

services:
  web:
    build: ./celerytask #path to the root project folder
    command: python manage.py runserver 0.0.0.0:8000
    volumes:
      - ./celerytask:/usr/src/app/
    ports:
      - 8000:8000 # sets the port that maps to internal port in docker container
    environment:
      - DEBUG=1
      - SECRET_KEY=dbaa1_i7%*3r9-=z-+_mz4r-!qeed@(-a_r(g@k8jo8y3r27%m
      - DJANGO_ALLOWED_HOSTS=localhost 127.0.0.1 [::1]
      - CELERY_BROKER=redis://redis:6379/0
      - CELERY_BACKEND=redis://redis:6379/0
    depends_on:
      - redis

  celery:
    build: ./celerytask
    command: celery worker --app=core --loglevel=info --logfile=logs/celery.log # Command used to start the Celery worker in the Docker container
    volumes:
      - ./celerytask:/usr/src/app
    environment:
      - DEBUG=1
      - SECRET_KEY=dbaa1_i7%*3r9-=z-+_mz4r-!qeed@(-a_r(g@k8jo8y3r27%m
      - DJANGO_ALLOWED_HOSTS=localhost 127.0.0.1 [::1]
      - CELERY_BROKER=redis://redis:6379/0
      - CELERY_BACKEND=redis://redis:6379/0
      # depends on show that celery worker service requires the web service and the redis service to run
    depends_on: 
      - web
      - redis

  redis:
    image: redis:6-alpine
```

In the above `docker-compose.yml` file, we have 3 services:
1. `web` - is the service that runs our application code.
2. `celery`- is the service that runs the Celery worker.
3. `redis` - is the service that runs the Redis server. Redis is a key-pair datastore that will be used to store the queued events.

For more information and a getting started guide on Docker compose, visit [Docker compose guide](/engineering-education/set-up-containerize-and-test-a-single-hadoop-cluster-using-docker-and-docker-compose/).

#### Building the image
In the root project directory, execute the command below to create an image.

```bash
docker build -t celerytask .
```

- `-t` adds a tag `celerytask` to the image that will be created.
- `.` the end of the command indicates that Dockerfile is in the current directory from where the command is being executed.

To verify that the image has been created successfully, execute the command below:

```bash
karen@karen:~$ docker image ls
REPOSITORY                                                 TAG                 IMAGE ID       CREATED              SIZE
celerytask                                                 latest              a9803f267258   About a minute ago   172MB

```

#### Deploying with Docker compose
Execute the command below to create and start the services we declared in the `docker-compose.yml` file.
 
```bash
docker-compose up -d --build
```

### Testing
- Open your browser and navigate to [http://localhost:8000/generate](http://localhost:8000/generate/) and input the number of users to generate.
   
![Celery generate user](/engineering-education/django-celery-tasks/celery-generate.png)

- On clicking generate users, Celery schedules a background task that generates random user accounts in the background as shown below.
   
![Celery task scheduled](/engineering-education/django-celery-tasks/celery-success.png)

- When refreshing the `users` page after few seconds, we see a list of randomly generated users as shown below.
   
![Celery random users](/engineering-education/django-celery-tasks/celery-users.png)

> Make sure to run migrations before starting the celery worker.

### Conclusion
Now that you have learned how to integrate Celery into a Django application and perform periodic tasks, create a Django application that runs a backup script to backup itself every 1 hour. 

You can download the full source code [here](https://replit.com/@njerikaren/DjangoCelery#).

Happy coding!

---
Peer Review Contributions by: [Mohan Raj](/engineering-education/authors/mohan-raj/)
