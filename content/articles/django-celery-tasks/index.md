#### Getting started with Django Celery Asynchronous task
When working with data-intensive applications, long-running tasks slows down the application and the website load time.

In such an application, we can improve the application load time but offloading some work off the application server to a message broker server.

In this tutorial, we will learn how to use Celery in a Django application to perform long-running background tasks.

### Table of Contents
- [Table of Contents](#table-of-contents)
- [Prerequisites](#prerequisites)
- [Workers](#workers)
- [Message Queue](#message-queue)
- [Celery](#celery)
- [Project Setup](#project-setup)
  - [Adding Celery configuration to Django application](#adding-celery-configuration-to-django-application)
  - [Creating a Celery task](#creating-a-celery-task)
  - [Creating the HTML files.](#creating-the-html-files)
  - [Form](#form)
- [View](#view)
  - [URLs](#urls)
  - [Starting the Celery worker process](#starting-the-celery-worker-process)
- [Testing](#testing)
- [Conclusion](#conclusion)

### Prerequisites
1. [Python](https://www.python.org/) installed in your computer.
2. Knowledge of [Python](https://www.tutorialspoint.com/python/index.htm) and [Django](https://www.djangoproject.com/).
   
### Workers
The background-based task-servers are called `workers`. In an application with one of a few web servers, we can have several workers that perform the heavy computations in the background and send back the response to the application through webhooks or callbacks.


### Message Queue
A queue is a data structure that works on the first-in, first-out principle. We assign work to the workers through a message queue. The worker process the tasks in the order in which they were queued.

> The queue ensures that each worker processes a single task at a time and only a single worker processes a particular task.

### Celery
Celery makes it easier to implement the task queues for many workers in a Django application.

Functions of Celery
1. Define tasks as python functions.
2. Listen to a message broker for new tasks.
3. Assign the tasks to workers.
4. Monitor the workers and tasks.

### Project Setup
1. Create a Django application by executing the command below.
   ```bash
   $ django-admin startproject celerytask
   ```
2. Migrate the database models by executing the command below.
   ```bash
   $ cd celerytask
   $ python manage.py migrate
   ```
3. Start the Django web server by executing the command below.
   ```bash
   $ python manage.py runserver
   ```
4. Navigate to [http://localhost:8000/](http://localhost:8000/) to confirm that the application is up and running.

5. Execute the command below to add celery to our application.
   ```bash
   $ pip install celery
   ```
#### Adding Celery configuration to Django application
1. Create a new file named `celery.py` in the project folder where `settings.py` file exists.
2. Add the code snippet below to the file created above.
   ```python
    from __future__ import absolute_import, unicode_literals
    import os
    from celery import Celery

    # setting the Django settings module.
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'celery_tutorial.settings')
    app = Celery('celery_tutorial')
    app.config_from_object('django.conf:settings', namespace='CELERY')

    # Looks up for task module in Django applications and loads them
    app.autodiscover_tasks()
   ```
The above configuration creates a Celery application using the Django settings.
`app.autodiscover_tasks()` tries to discover a file named `task.py` in all of our Django applications.


In the `__init__.py` file within the package where `settings.py` file is located, add the code snippet below.

```python
from .celery import app as celery_app

__all__ = ['celery_app']
```
The above code snippet imports Celery every time our application starts.
#### Creating a Celery task
Let's create a Django app from where we will set up the Celery task.

1. Execute the command below to create a Django app named `task`.
   ```bash
   $ python manage.py startapp task
   ```
2. Create a python file named `task.py` in the `task` that we have just created.
3. Add the Code snippet below into the `task.py` created above.
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
#### Creating the HTML files.
Create a directory named `templates` in the root project directory.
In the `templates` directory created above, create another directory within it named `task` as it will hold the HTML files for our Django `task`.
1. In the `task` directory created above, create a file named `base.html` and add the code snippets below into it.
   
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
   - The code snippet above is the base template that other template files will extend from.

2. In the `task` directory, create a file named `user_list.html` and add the code snippets below.
   
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
   - The code snippet above will display the list of generated random users.
  
3. In the `task` directory create a file named `generate_random_user.html` and add the code snippets below.
   
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
   {% endblock %
   ```
   - The code snippet above contains an input field where we will specify the number of random users to generate.

#### Form
In the `task`, create a python file named `random_user_form.py` and add the code snippet below.
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
Add the code snippet below into the `views.py` file in the `task`.
```python
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
In the code snippet above, you notice that we did not call the `create_random_user_accounts` method instead we called `create_random_user_accounts.delay(total)`. This instructs Celery to perform the task in a background process.

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

#### Starting the Celery worker process
Execute the command below to start a Celery worker process.
```bash
$ celery -A celerytask worker -l info
```
### Testing
1. Run Django migrations to create the tables in the database by executing the command below.
```bash
$ python manage.py migrate
```

2. Start the Django web server by executing the command below.
```bash
$ python manage.py runserver
```

3. Start the Celery worker by executing the command below.
   ```bash
   $ celery -A celerytask worker -l info
   ```

   ![Celery running](/engineering-education/django-celery-tasks/celery.png)

4. Open your browser and navigate to [http://localhost:8000/generate](http://localhost:8000/generate/) and input the number of users to generate.
   
   ![Celery generate user](/engineering-education/django-celery-tasks/celery-generate.png)

5. On clicking generate users, Celery schedules a background task that generates random user accounts in the background as shown below.
   
   ![Celery task scheduled](/engineering-education/django-celery-tasks/celery-success.png)

6. On refreshing the `users` page after few seconds, we see a list of randomly generated users as shown below.
   
   ![Celery random users](/engineering-education/django-celery-tasks/celery-users.png)

> Make sure to run migrations before starting the celery worker.

### Conclusion
Now that you have learned how to integrate Celery into a Django application and perform periodic tasks, create a Django application that runs a backup script to backup itself every 1 hour. You can download the full source code [here](https://replit.com/@njerikaren/DjangoCelery#).
