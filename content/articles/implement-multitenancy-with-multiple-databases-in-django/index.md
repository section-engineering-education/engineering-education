---
layout: engineering-education
status: publish
published: true
url: /implement-multitenancy-with-multiple-databases-in-django/
title: Implement Multitenancy with Multiple Databases in Django
description: This article will discuss how to implement multitenancy of applications with separate databases for each client using Django.
author: samuel-mwangi
date: 2022-04-17T00:00:00-09:30
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/implement-multitenancy-with-multiple-databases-in-django/hero.png
    alt: Implement Multitenancy With Multiple Databases In Django Hero Image
---
Multitenancy is a property whereby a web application can serve more than one customer while having each customer's data and users isolated.
<!--more-->
In this tutorial, we will learn how to implement multitenancy in multiple databases with a shared Django app. We will use MongoDB.

Let's imagine that you built a web-based Library Management System for your university, and you want to provide your services to other universities without having to rebuild and host the same application for each university.

We can call each university to be a tenant of your application, hence the name `Multitenancy`.

Multitenancy allows you to build one application and offer instances of the application to various customers as a Software as a Service (SaaS).

Now, let's start to build a simple application that records the details of students, and lists them on a table. Then, we shall implement multitenancy to the app.

### Table of contents
- [Prerequisites](#prerequisites)
- [Create the app](#create-application)
  - [Setup the environment](#setup-the-environment)
  - [Install required packages](#install-required-packages)
  - [Create the project](#create-the-project)
  - [Connect Django to Mongo DB](#connect-django-to-mongodb)
  - [Add and register the models](#add-and-register-the-models)
  - [Create a view](#create-a-view)
  - [Configure the URLs](#configure-the-urls)
  - [Template](#template)
  - [Run the project](#run-the-project)
- [Implement Multitenancy](#implement-multitenancy)
  - [Add multiple databases](#add-multiple-databases)
  - [Get tenant-specific database from request](#get-tenant-specific-database-from-request)
  - [Use middlewares for tenant-specific database routing](#use-middlewares-for-tenant-specific-database-routing)
  - [Route the databases](#route-the-databases)
  - [Register the middleware and the router](#register-the-middleware-and-the-router)
  - [Configure hosts names](#configure-host-names)
  - [Django migrations](#django-migrations)
  - [Run the commands](#run-the-commands)
  - [Test](#test)
- [Conclusion](#conclusion)
- [Reference](#references)

### Prerequisites
To follow along with this tutorial, you will need to have:
- Fundamental knowledge in both Python and Django.
- Any code editor that you are comfortable with.
- Have [MongoDB](https://docs.mongodb.com/manual/administration/install-community/) installed on your PC.

### Create application
#### Setup the environment
Using your terminal, create a new directory for our project `myProject` as shown:

```bash
mkdir myProject
cd myProject
```

Now, create and activate the Python virtual environment using the following commands:

```bash
py -m venv .venv
.venv\Scripts\activate.bat
```

#### Install required packages
Now, we need to install `django` web development framework and `djongo` to help interface Django's Object Relation Model (ORM) with MongoDB (a non-relational model).

To install the libraries, follow the commands as shown:

```bash
pip install django
pip install djongo
```

#### Create the project
Let's create our Django project in the directory `multitenant` as shown:

```bash
django-admin startproject multitenant
cd multitenant
```

Then, we create our Django app `School` using:

```bash
py manage.py startapp School
```

We need to register the app in the list of installed apps in `settings.py` under `INSTALLED_APPS`:

```py
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'School'                  # new
]
```

#### Connect Django to MongoDB
In `settings.py` under `DATABASES`, delete the MySQLite configurations and replace them with:

```py
DATABASES = {
    'default': {'ENGINE': 'djongo','NAME': 'default',},
}
```

The snippet above tells Django that the default database to be called will be `djongo`.

#### Add and register the models
In `models.py`, add a `Student` model into our app as shown:

```py
from django.db import models

class Student(models.Model):    
    registration_no = models.CharField(max_length=255, unique=True)
    first_name = models.CharField(max_length=255)
    second_name = models.CharField(max_length=255)

    def __str__(self):
        return self.registration_no
```

This model records the names of a student and their registration number `registration_no`.

Now, register the model in `admin.py` with Django's admin site along with the access to the database:

```py
from django.contrib import admin
from .models import Student

class adminStudent(admin.ModelAdmin):
    # the list only tells Django what to list on the admin site
    list_display = ["registration_no","first_name","second_name"]

admin.site.register(Student, adminStudent)
```

While we register the model, the Django admin displays the three attributes of the model.

#### Create a view
In our `views.py`, we add a function-based view that fetches all the student objects, and returns them along with the index page upon being called:

```py
from django.shortcuts import render
from .models import Student

def get_Students(request):
    students = Student.objects.all()
    context = {
        'students': students
    }
    return render(request, 'index.html', context)
```

#### Configure the URLs
Now, we create the URL pattern that points to the view that we just created.

In the app directory `School`, create a file named `urls.py` and add the following code:

```py
from django.urls import path
from .import views

urlpatterns = [
    path('',views.get_Students, name="index"),
]
```

Here, we point the root URL of the project to our app's URLs patterns. Modify the `urls.py` in the project-level directory `multitenant`, to accommodate the root URL:

```py
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('',include('School.urls'))
]
```

#### Template
Create a directory named `templates` in the app level directory and create an HTML file named `index.html` inside it.

We will use the template to display the students data in a table styled by bootstrap. In `index.html` add the following code:

```HTML
<!doctype html>
<html lang="en">
  <head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">

    <title>students table</title>
  </head>   

  <body class="container">
    <table class="table ">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">First</th>
            <th scope="col">Last</th>
            <th scope="col">Registration Number</th>
          </tr>
        </thead>
        <tbody>
            {% for student in students %}
          <tr>
            <th scope="row">{{student.id}}</th>
            <td>{{student.first_name}}</td>
            <td>{{student.second_name}}</td>
            <td>{{student.registration_no}}</td>
          </tr>
          {% endfor %}
        </tbody>
      </table>
  </body>
</html>
```

In the table above, we used a `for` loop to populate the table's data from the available student objects. If there aren't any student objects created yet, the table won't display anything.

#### Run the project
Now, we will run the Django project just to make sure that everything is working well before we implement the multitenancy.

We will start with migrating the project as shown:

```bash
py manage.py makemigrations
```

If you get the following error:

```bash 
raise ImproperlyConfigured(
django.core.exceptions.ImproperlyConfigured: 'djongo' isn't an available database backend or couldn't be imported. Check the above exception. To use one of the 
built-in backends, use 'django.db.backends.XXX', where XXX is one of: 'mysql', 'oracle', 'postgresql', 'sqlite3'
```

Follow the steps below to resolve this, then repeat the command:
 
1. Uninstall your default version of `pymongo`:

```bash
pip uninstall pymongo
```

2. Reinstall it with version `3.12.1`:

```bash
pip install pymongo==3.12.1
```

3. Install `pytz`:

```bash
pip install pytz
```

Now, resume the migrations after resolving the error:

```bash
py manage.py makemigrations
```

To create schemas for your DB, run:

```bash
py manage.py migrate
```

We will add a superuser to enable adding the student's data from the admin's site:

```bash
py manage.py createsuperuser
```

Populate the details that you will use to log into the admin site. Then run the project using:

```bash
py manage.py runserver
```

Log into the [admin](http://127.0.0.1:8000/admin/) site, add some students, then check the results on the [homepage](http://127.0.0.1:8000/).

Here is a sample screenshot of what the table will look like:

![index HTML page](/engineering-education/implement-multitenancy-with-multiple-databases-in-django/index.jpg)

### Implement multitenancy
Now, we add the ability to handle more than one default tenant (client) by assigning each client their database. By doing so, we have to tell Django where to get the data for each client. 

#### Add multiple databases
The first thing would be to create a database for each of our tenants. Apart from the `default` database, we are going to add two more databases.

Assuming we have two clients namely: `Nairobi` and `Accra`, we will add them by updating the `DATABASES` dictionary in `settings.py` to:

```py
DATABASES = {
    'default': {'ENGINE': 'djongo','NAME': 'default',},
    'nairobi': {'ENGINE': 'djongo','NAME': 'nairobi',}, # new
    'accra': {'ENGINE': 'djongo','NAME': 'accra',},    # new
}
```

#### Get tenant-specific database from request
When a request is sent to the server, our app must be able to tell, which database the tenant should read from. We can do that with help of a few helper functions.

In the `School` folder, add a file named `utils.py` and add the following code to it:

```py
from django.db import connection

def hostname_from_the_request(request):
    return request.get_host().split(":")[0].lower()

def tenant_db_from_the_request(request):
    hostname = hostname_from_the_request(request)
    tenants_map = get_tenants_map()
    return tenants_map.get(hostname)

def get_tenants_map():
    return {
        "nairobi.school.local": "nairobi",
        "accra.school.local": "accra"
    }
```

In the above code:
- `hostname_from_the_request()` function takes the request and removes the ports and returns the bare URL.
- `get_tenants_map()` function returns a dictionary with the added tenant's URLs as keys and their database names as the values.
- `tenant_db_from_the_request()` function calls the other two functions. By comparing the host's URL from the request and the dictionary, it returns the name of the database that matches its tenant.

#### Use middlewares for tenant-specific database routing
> Middleware is a framework that helps you plug into the request/response processing in Django.

The `tenant_db_from_the_request()` method can be used to fetch the database name that will be passed to the database router using a thread-local variable.

> Thread local variables are variables whose data is accessible throughout the entire life-cycle of the thread.

In the `School` folder, add a file named `middleware.py` and add the following code:

```py
import threading
from django.db import connections
from .utils import tenant_db_from_the_request

Thread_Local = threading.local()

class SchoolMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        db = tenant_db_from_the_request(request)
        setattr(Thread_Local, "DB", db)
        response = self.get_response(request)
        return response

def get_current_db_name():
    return getattr(Thread_Local, "DB", None)

def set_db_for_router(db):
    setattr(Thread_Local, "DB", db)
```

In the above code:
- We declared a thread-local variable and created a middleware class.
- Using the callable object `__call__()`, we get the name of the database by calling `tenant_db_from_the_request()` and passing it to the thread-local variable.
- We created a function to get the current DB name from the thread-local variable and another one to set the DB name for the DB router.

#### Route the databases
The routing class implements several methods with no arguments, hence we can't pass the tenant's database request to them. This is why we introduce the middleware here.

Using the data passed to the middleware we can hook into the database routing process. This would help us establish a central place where Django can look up the database that the tenant request should refer to.

In the app-level directory `School`, create a file named `router.py` and add the following code to it:

```py
from .middleware import get_current_db_name

class SchoolRouter:
    def db_for_read(self, model, **hints):
        return get_current_db_name()

    def db_for_write(self, model, **hints):
        return get_current_db_name()

    def allow_relation(self, *args, **kwargs):
        return True

    def allow_syncdb(self, *args, **kwargs):
        return None

    def allow_migrate(self, *args, **kwargs):
        return None
```

The router class in Django provides up to four methods. We modified the first three and left the other as default in the above router class.

We modified the functions that point to a DB to read or write operations to return the name of the current DB. We also set `allow_relations()` to `True` to allow relationships between two objects in our models if we need to use them.

#### Register the middleware and the router
In `settings.py`, update the `MIDDLEWARE` list and add the `DATABASE_ROUTERS` list as follows:

```py
MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'School.middleware.SchoolMiddleware', # new
]
DATABASE_ROUTERS = ['School.router.SchoolRouter']  # new
```

#### Configure host names
Now, we need to map the hostnames to the local machine.

For Linux users, navigate to the `/etc/hosts` and for Windows users, follow the path `C:\Windows\System32\Drivers\etc\`.

Open the `host` file using notepad or any other text editor and add our hosts as shown below:

```txt
127.0.0.1 school.local
127.0.0.1 nairobi.school.local
127.0.0.1 accra.school.local
```

We also need to update the `ALLOWED_HOSTS` in our `settings.py` to:

```py
ALLOWED_HOSTS = ['school.local', '.school.local']
```

#### Django migrations
For any Django app to start operating as intended, we must run migrations for all the databases, create superusers for each tenant, and finally run the server.

The problem is that not all commands can work with multiple databases, and those that can, have to use the option `--database=db_name`. We, therefore, need to create a custom `manage.py` file for our case.

In our project-level folder `multitenant`, add a file `school_manage.py` and add the following code in it:

```py
#!/usr/bin/env python
"""Django's command-line utility for administrative tasks."""
import os
import sys

from School.middleware import set_db_for_router #new

if __name__ == "__main__":                  
    """Run administrative tasks."""
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'multitenant.settings')
    try:
        from django.core.management import execute_from_command_line
    except ImportError as exc:
        raise ImportError(
            "Couldn't import Django. Are you sure it's installed and "
            "available on your PYTHONPATH environment variable? Did you "
            "forget to activate a virtual environment?"
        ) from exc

    #new 
    from django.db import connection

    args = sys.argv
    db = args[1]
    with connection.cursor() as cursor:
        set_db_for_router(db)
        del args[1]
        execute_from_command_line(args)
```

In the above code:
- `args` - The array stores `sys.args`, which is a list of command-line arguments that we pass to python.
- `db = args[1]` - Among arguments that we shall pass, the one at position `[1]` in the array is the name of the DB that we want to execute the command on.
- `with connection.cursor()` - opens the connection for the queries in it to be executed.
- `set_db_for_router(db)` - uses the name we pass as `arg[1]` to route the database specified.
- `del args[1]` - This deletes the DB name argument after the routing has taken place (we only need the name to point to the DB, then carry out the execution of the command as it was originally intended to be used by Django).
- `execute_from_command_line(args)` - This executes the command that you had typed. It takes the arguments array as a parameter.

#### Run the commands
We shall start the migrations and create a superuser for each tenant. Then, we shall run the server and test each client:

```bash
py manage.py makemigrations School
```

- For tenant `Accra`:

```bash
py manage.py migrate --database=accra
py school_manage.py accra createsuperuser --database=accra
```

- For tenant `Nairobi`:

```bash
py manage.py migrate --database=nairobi
py school_manage.py nairobi createsuperuser --database=nairobi
```

- For tenant `default`:

> If you had already made the migrations in step 1, you can skip this step.

```bash
py manage.py migrate
py manage.py createsuperuser
```

#### Test
Now, we can run the local server and test our multitenant sites:

```bash
py manage.py runserver school.local:8000
```

When the local host starts the server, you can access the tenant sites using the following URLs:

- Tenant `Default`:
  - Main site - `http://school.local:8000/`
  - Admin site - `http://school.local:8000/admin/`

- Tenant `Nairobi`:
  - Main site - `http://nairobi.school.local:8000/`
  - Admin site - `http://nairobi.school.local:8000/admin`

- Tenant `Accra`:
  - Main site - `http://accra.school.local:8000/`
  - Admin site - `http://accra.school.local:8000/admin`

Upload some content on the admin site of each tenant and check out the results on the main site.

Here is what my tenants' main sites look like:

- `default`
![default](/engineering-education/implement-multitenancy-with-multiple-databases-in-django/default.jpg)

- `Nairobi`
![nairobi](/engineering-education/implement-multitenancy-with-multiple-databases-in-django/nairobi.jpg)

- `Accra`
![accra](/engineering-education/implement-multitenancy-with-multiple-databases-in-django/accra.jpg)

### Conclusion
We have seen how powerful Django is, to an extent of being able to support multitenancy and multiple databases. You can go ahead and customize this project to suit your other needs.

The full code for this project can be found in my Github [repo](https://github.com/Sajeyks/Django-multitenancy-multipleDB-single-App).

All the best!

### References
- [Django Multiple DB support](https://docs.djangoproject.com/en/4.0/topics/db/multi-db/)
- [Django multitenant with isolated DB](https://books.agiliq.com/projects/django-multi-tenant/en/latest/isolated-database.html)

---
Peer Review Contributions by: [Srishilesh P S](/engineering-education/authors/srishilesh-p-s/)