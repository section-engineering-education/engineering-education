In this tutorial, we will learn how multitenancy is implemented in multiple databases with a shared Django app. Here, we will use MongoDB.
<!--more-->
Multitenancy is a property whereby a web application can serve more than one customer while having each customer's data and users isolated.

Let's imagine that you built a web-based Library Management System for your University, and you want to provide your services to other universities without having to rebuild and host the same application for each University.

Here, we call each university to be a tenant of your application, hence the name `Multitenancy`.

Multitenancy allows you to build one application and offer instances of the application to various customers as a Software as a Service (SaaS).

Now, let's start to build a simple application that records the details of students, and lists them on a table. Then, we shall implement multitenancy to the app.

### Table of contents
- [Prerequisites](#prerequisites)
- [Creating the app](#step-1--creating-the-app)
  - [Setting up the enviroment](#11--setting-up-the-enviroment)
  - [Installing required packages](#12--installing-required-packages)
  - [Creating our project and app](#13-creating-our-project-and-app)
  - [Connecting Django to Mongo DB](#14--connecting-django-to-mongo-db)
  - [Adding and registering the models](#15-adding-and-registering-the-models)
  - [Creating a view](#16--creating-a-view)
  - [Configuring the URLs](#17--configuring-the-urls)
  - [Templating](#18--templating)
  - [Running the project](#19-running-the-project)
- [Implementing Multitenancy](#step-2-implementing-multitenancy)
  - [Adding multiple databases](#21--adding-multiple-databases)
  - [Getting tenant specific database from request](#22--getting-tenant-specific-database-from-request)
  - [Using middlewares for tenant specific database routing](#23-using-middlewares-for-tenant-specific-database-routing)
  - [Routing the databases](#24--routing-the-databases)
  - [Registering the middleware and the router](#25--registering-the-middleware-and-the-router)
  - [Configuring our hosts names](#26--configuring-our-hosts-names)
  - [Taking care of the Django commands](#27-taking-care-of-the-django-commands)
  - [Running the commands](#28-running-the-commands)
  - [Testing](#29--testing)
- [Conclusion](#conclusion)

### Prerequisites
To follow through this tutorial, you will need to have:
- Fundamental knowledge in both Python and Django.
- Any code editor that you are comfortable with.
- [MongoDB](https://docs.mongodb.com/manual/administration/install-community/) installed in your PC.

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

#### Create our project and app
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

#### 1.4 : Connect Django to MongoDB
In `settings.py` under `DATABASES`, delete the MySQLite configurations and replace them with:

```py
DATABASES = {
    'default': {'ENGINE': 'djongo','NAME': 'default',},
}
```

The above snippet tells Django that the default database to be called will be `djongo`.

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

While we register the model, the Django admin displays all the three attributes of the model.

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
Now, we create the URL pattern that points to the view which we just created.

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
Create a directory named `templates` in the app level directory and create a HTML file named `index.html` inside it.

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

In the above table, we used a `for` loop to populate the table's data from the available student objects. If there aren't any student objects created yet, the table won't display anything.

#### Run the project
Now, we shall run the Django project just to make sure that everything is working fine before we implement the multitenancy.

We shall start with migrating the project as shown:

```bash
py manage.py makemigrations
```

If you get the following error:

```bash 
raise ImproperlyConfigured(
django.core.exceptions.ImproperlyConfigured: 'djongo' isn't an available database backend or couldn't be imported. Check the above exception. To use one of the 
built-in backends, use 'django.db.backends.XXX', where XXX is one of: 'mysql', 'oracle', 'postgresql', 'sqlite3'
```

Follow the below steps to resolve this, then repeat the command:
 
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

We will add a superuser to enable adding the students data from the admin's site:

```bash
py manage.py createsuperuser
```

Populate the details that you will use to log in to the admin site. Then, finally run the project using:

```bash
py manage.py runserver
```

Log in to the [admin](http://127.0.0.1:8000/admin/) site, add some students, then check the results on the [homepage](http://127.0.0.1:8000/).

Here is a sample screenshot of how the table looks like:

![index HTML page](/engineering-education/django-multitenancy-using-multiple-databases-and-one-app/index.jpg)

### Step 2: Implementing Multitenancy
We are now going to add the ability of the site to handle more than one default tenant(Client), by assigning each client their database. By doing so, we are gonna have to tell Django where to get the data for each client. 

#### 2.1 : Adding multiple databases
The first thing would be to create a database for each of our tenants. Apart from the `default` database, we are going to add two more databases. Assuming we have two clients namely: `Nairobi` and `Accra`, we will add them by updating the `DATABASES` dictionary in `settings.py` to:
```py
DATABASES = {
    'default': {'ENGINE': 'djongo','NAME': 'default',},
    'nairobi': {'ENGINE': 'djongo','NAME': 'nairobi',}, # new
    'accra': {'ENGINE': 'djongo','NAME': 'accra',},    # new
}
```
#### 2.2 : Getting tenant-specific database from request
When a request is sent to the server, our app must be able to tell, which database the tenant should read from. We can help it do so by adding a few helper functions. In our `School` folder, add a file named `utils.py` and add the following code to it.
```py
from django.db import connection

def hostname_from_the_request(request):
    return request.get_host().split(":")[0].lower()

def tenant_db_from_the_request(request):
    hostname = hostname_from_the_request(request)
    tenants_map = get_tenants_map()
    return tenants_map.get(hostname)

def get_tenants_map():
    return {"nairobi.school.local": "nairobi", "accra.school.local": "accra"}
```
- `hostname_from_the_request()` - This function takes the request and removes the ports then returns the bare URL

- `get_tenants_map()` - This function returns a dictionary of the added tenant's URLs as keys and their database names as values.

- `tenant_db_from_the_request()` - This function calls on the other two functions.By comparing the host's URL from the request and the dictionary, it returns the name of the database that matches its tenant.

#### 2.3: Using middlewares for tenant-specific database routing
 - Middleware - a framework that helps you plug into the request/response processing in Django.

The `tenant_db_from_the_request()` method shall be used to get the database name which will be passed to the database router using a thread-local variable.
- Thread local variables - these are variables whose data is accessible throughout the entire life-cycle of the thread.

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
In the above code, we declared a thread-local variable and created a middleware class. Using the callable object `__call__()`, we can now get the name of the DB by calling `tenant_db_from_the_request()` and pass it to the thread-local variable.
We also created a function to get the current DB name from the thread-local variable and another one to set the DB name for the DB router.

#### 2.4 : Routing the databases
The routing class implements several methods but none takes requests as an argument, hence we cant pass the tenant's database request to them for the referred database to be extracted. This is why the middleware above came in.

By using the data passed to the middleware we can hook into the database routing process. This would help us establish a central place where Django can look up which database the tenant's database request should refer to.

In our app-level directory `School`, create a file named `router.py` and add the following code to it:
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
The router class in Django provides up to four methods. We modified the first three and left the others as default in the above router class. We modified the functions that point to a DB for reading or writing operations to return the name of the current DB. We also set `allow_relations()` to `True` to allow relationships between two objects in our models if we need to use them.

#### 2.5 : Registering the middleware and the router
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

#### 2.6 : Configuring our host names
Now we need to add our hostnames to our local machine for them to be found when we request them.
For Linux users, navigate to the `/etc/hosts` and for Windows users, follow the path `C:\Windows\System32\Drivers\etc\`.Open the `hosts` file using notepad or any other text editor and add our hosts as shown below:
```
127.0.0.1 school.local
127.0.0.1 nairobi.school.local
127.0.0.1 accra.school.local
```
We also need to update the ` ALLOWED_HOSTS` in our `settings.py`, to:
```py
ALLOWED_HOSTS = ['school.local', '.school.local']
```
#### 2.7: Taking care of the Django commands
For our app to start operating as intended, we must run migrations for all our databases, create superusers for each tenant, and finally run the server. The problem is that not all commands can work with multiple databases, and those that can, have to use the option `--database=db_name`. We, therefore, need to create a custom `manage.py` file for our case.
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

-  `args` - The array stores `sys.args`, which is a list of command line arguments that we pass to python.
- `db = args[1]` - Among arguments that we shall pass, the one at position `[1]` in the array is the name of the DB that we want to execute the command on.
- `with connection.cursor()` - opens the connection fo the queries in it to be executed.
- `set_db_for_router(db)` - uses the name we pass as `arg[1]` to route the database specified.
- `del args[1]` - This deletes the DB name argument after the routing has taken place(we only needed the name to point to the DB, then carry out the execution of the command as it was originally intended to be by Django. ie: first argument isn't DB name).
- `execute_from_command_line(args)` - This executes the command that you had typed. It takes the arguments array as a parameter.

#### 2.8: Running the commands
We shall start by making migrations then creating a superuser for each tenant. Then we shall run the server and test each client:

```bash
py manage.py makemigrations School
```

- For tenant Accra:
```bash
py manage.py migrate --database=accra
```
```bash
py school_manage.py accra createsuperuser --database=accra
```

- For tenant Nairobi

```bash
py manage.py migrate --database=nairobi
```
```bash
py school_manage.py nairobi createsuperuser --database=nairobi
```

- For tenant default

>If you had already made the migrations in step 1, you can skip this step.
```bash
py manage.py migrate
```
```bash
py manage.py createsuperuser
```
NB: The default tenants commands can be run just the usual way.

#### 2.9 : Testing
Now we can run our local server and test our multitenant sites:
```bash
py manage.py runserver school.local:8000
```
When the local host starts the server, you can access the tenant sites using the following URLs:

- tenant `Default` :
    - main site - http://school.local:8000/
    - admin site - http://school.local:8000/admin/

- tenant `Nairobi` :
    - main site - http://nairobi.school.local:8000/
    - admin site - http://nairobi.school.local:8000/admin

- tenant `Accra` :
    - main site - http://accra.school.local:8000/
    - admin site - http://accra.school.local:8000/admin

Upload some content on the admin site of each tenant and check out the results on the main site.
Here is what my tenants' main sites look like:
- default
![default](/engineering-education/django-multitenancy-using-multiple-databases-and-one-app/default.jpg)
- nairobi
![nairobi](/engineering-education/django-multitenancy-using-multiple-databases-and-one-app/nairobi.jpg)
- accra
![accra](/engineering-education/django-multitenancy-using-multiple-databases-and-one-app/accra.jpg)

### Conclusion
We have seen how powerful Django is, to an extent of being able to support multitenancy and multiple databases. You can go ahead and customize this project to suit your other needs. The full code for this project can be found in my Github [repo](https://github.com/Sajeyks/Django-multitenancy-multipleDB-single-App). All the best!

### References
 - [Django Multiple DB support](https://docs.djangoproject.com/en/4.0/topics/db/multi-db/)
 - [Django multitenant with isolated DB](https://books.agiliq.com/projects/django-multi-tenant/en/latest/isolated-database.html)