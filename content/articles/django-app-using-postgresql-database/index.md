---
layout: engineering-education
status: publish
published: true
url: /django-app-using-postgresql-database/
title: Creating a Django App Using PostgreSQL Database
description: In this article, we wil create a Hello World Django application using PostgreSQL database. PostgreSQL is a open-source object-relational database system that uses the SQL language.
author: adeyemi-atoyegbe
date: 2021-01-12T00:00:00-10:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/django-app-using-postgresql-database/hero.jpg
    alt: Django PostgreSQL Database example
---
Django is a high-level Python Web framework that encourages rapid development, clean, and pragmatic design. Built by experienced developers, it takes care of much of the hassle of web development, so you can focus on writing your app without needing to reinvent the wheel. Best of all, it's [free and open-source](https://www.djangoproject.com).
<!--more-->
PostgreSQL is a powerful, open-source object-relational database system that uses and extends the SQL language combined with many features that safely store and scale the most complicated [data workloads](https://www.postgresql.org/about/).

### Prerequisites
To follow along with this tutorial, you should have:

 - [Python3](https://www.python.org/downloads/).
 
 - [PostgreSQL](https://www.postgresql.org/download/windows/).
 
 - [virtualenv](https://pypi.org/project/virtualenv/).

### Step 1: Creating our database through the command line
Open the PostgreSQL shell. You can find the PSQL Shell in the Start Menu.

![access psql](/engineering-education/django-app-using-postgresql-database/access_psql.png)

The shell will prompt you for **Server, Database, Port, and Username** details. You can set it to default by clicking on the Enter button in the keyboard without providing any value. Finally, the shell will prompt you for the **Password**. 

You should provide the password that you used during the PostgreSQL installation. You will see a similar result in your PSQL shell like the one the above image if correctly implemented.

![psql_shell](/engineering-education/django-app-using-postgresql-database/psql_shell.png)

Let's create a PostgreSQL database.

The `CREATE DATABASE` command let's us create a new database in PostgreSQL.

```bash 
CREATE DATABASE helloworld;
```

The `CREATE USER` command let's us create a user for our database along with a password.

```bash 
CREATE USER <yourname> WITH PASSWORD '<password>';
```

Let's modify a few connection parameters for the new database user.

```bash 
ALTER ROLE <yourname> SET client_encoding TO 'utf8';
ALTER ROLE <yourname> SET default_transaction_isolation TO 'read committed';
ALTER ROLE <yourname> SET timezone TO 'UTC';
```

- In the first line we are setting the default encoding to UTF-8 expected by Django.

- With the second line we are also setting the default transaction isolation scheme to “read committed”, that blocks reads from uncommitted transactions. 

- Finally, by default Django timezone is UTC we are setting our database's timezone to UTC.


Next, we have to grant our new user access to the database we created earlier.

```bash 
GRANT ALL PRIVILEGES ON DATABASE helloworld TO <yourname>;
```

### Step 2: Creating a virtual environment & installing necessary Python packages
Let's start by creating a folder for our project.

```bash 
 mkdir myproject   #creating our project folder
 cd myproject     #changing into our project folder directory
```

A virtual environment helps create an isolated Python environment that will contain all that packages that our Django project will need. Let's create a virtual environment named `venv`.

```bash 
virtualenv venv
```

When we activate our virtual environment, any Python packages installed will only be available for our Django project. 

To activate the **venv** virtual environment, run:

```bash 
source venv/bin/activate
```

**pip** is the standard package manager for Python. **pip** is used to install Python packages from the Python package index(PyPI). More on `pip` [here](https://pip.pypa.io/en/stable/).

Let's install `django` and `psycopg2` using `pip`. `psycopg2` is a popular PostgreSQL database adapter for Python.

```bash
pip install django psycopg2
```
  
Let's create our Hello World Django project.

```bash
 django-admin startproject django_app
```

Change your current directory into our Django project `django_app`.

```bash
cd django_app
```

Let's create an `hello_world` app in our `django_app` project.

> A Django application is a Python package that is specifically intended for use in a Django project. Django apps are reusable in different [Django project](https://docs.djangoproject.com/en/3.1/ref/applications/).

```bash 
django-admin startapp hello_world
```

For our `hello_world` app to work we need to register the app in the `django_app` project. To do this, let's navigate to the `django_app/settings.py`.

Add the `hello_world` app name to the installed apps section of the file.

```python 
...
INSTALLED_APPS = [
    ...
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'hello_world',  # registering the hello_world app
]
```

### Step 3: Set up your project to use PostgreSQL database
SQlite is the default database that comes with Django. We need to change the database configurations to use PostgreSQL.

Let's navigate to `django_app/settings.py`. In the `DATABASES` section, you'll see the code snippet below.

```python 
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
    }
}
```

Change the above code snippet to this:

```python 
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': 'helloworld',
        'USER': '<yourname>',
        'PASSWORD': 'password',
        'HOST': 'localhost',
        'PORT': '',
    }
}
```

We changed the database engine to use `postgresql_psycopg2` instead of the default `sqlite3`.

- NAME is the name of the database we created for our project.

- USER is the database user we created during the database creation.

- PASSWORD is the password to the database we created.

Now, let's make sure that we have connected to the PostgreSQL database.

> The **manage.py** file is a Python script that allows us to perform adminstartive tasks like migrations, running the server, etc.

The `makemigrations` command is responsible for creating new migrations based on the changes you have made to our models. Since we don't have a model in our Django project, we will not worry about this.

```python
python manage.py makemigrations
```

When you run it for the first time, the default models in the Django project will get migrated and the `makemigrations` command creates a file with all the SQL commands that needs to be executed for the models. The `migrate` command will execute SQL commands.

```python
python manage.py migrate
```

After running the above command, you will get something like this in your CLI.

```bash 
Operations to perform:
  Apply all migrations: admin, auth, contenttypes, sessions
Running migrations:
  Applying contenttypes.0001_initial... OK
  Applying auth.0001_initial... OK
  Applying admin.0001_initial... OK
  ....
  ....
  Applying auth.0012_alter_user_first_name_max_length... OK
  Applying sessions.0001_initial... OK
```

`python manage.py migrate` command created some default tables in our database.

![postgres_database](/engineering-education/django-app-using-postgresql-database/postgresql_database.jpg).


To get a better understanding of what this command does, check out this article [Django Migrations: A Primer](https://realpython.com/django-migrations-a-primer/).

Now, Let's start the server by running this command:

```bash
python manage.py runserver
```

After running the command above, proceed to visit [http://127.0.0.1:8000](http://127.0.0.1:8000) in your browser.

If your Django project runs without any errors, you should see something like this.

![Django Homepage](/engineering-education/django-app-using-postgresql-database/django_webpage.jpg)

Congratulations! you've configured Django to use PostgresSQL.

### Hello World In Django
First, let create a templates folder in our `django_app/templates` directory and create an `index.html` file. Your project directory should look like this.

```bash
--django_app
| ---django_app
| ---hello_world
| ---templates
|     --- index.html
| ---manage.py
```

The templates folder is the display layer that handles user interface of our Django project. It contains HTML, CSS, and JavaScript files that are required in our Django project. We can use a single template folder for our entire project, or we can create different templates folder for each app in our Django project. Since we only have one app, which is our **helloworld** app, we will stick to using a single template folder for our project. 

Django web framework comes with is own built-in template engine called the Django template language. For more information on [Django template langauage](https://docs.djangoproject.com/en/3.1/topics/templates/).

Let's configure our app to make use of the templates folder. Head over to `django_app/settings.py` the TEMPLATES section. 

```python 
TEMPLATES = [
   {
       'BACKEND': 'django.template.backends.django.DjangoTemplates',
       'DIRS': [
           Path(BASE_DIR, 'templates') #include this line to your file
       ],
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

In `hello_world/views.py`, add the `homepage()` function, that will render our `index.html` file.
  
```python 
from django.shortcuts import render

def homepage(request):
  return render(request, 'index.html', context={})
```

Let's create a new Python file in the `hello_world` folder, `hello_world/urls.py`.

```python 
from django.urls import path
from . import views  #importing our view file 

urlpatterns = [
    path("", views.homepage, name="home"), #mapping the homepage function
]
```

Now, let's map the `hello_world/urls.py` file to `/`. In `django_app/urls.py`:

```python 
from django.contrib import admin
from django.urls import path, include #import include

urlpatterns = [
    path('admin/', admin.site.urls),
    path("", include("hello_world.urls")),  # add this line
]
```


The above code in our `django_app/urls.py` file maps the available URLs in the `hello_world/urls.py` to `/`.

For more information on views and URLs in Django, [refer here](https://djangobook.com/mdj2-django-views/).

Let's navigate to the `index.html` in our templates folder and add this:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Hello World App</title>
</head>
<body>
    <h1> Hello World </h1>
</body>
</html>
```

If the development server is still running visit [http://127.0.0.1:8000](http://127.0.0.1:8000) in your browser or run the `python manage.py runserver` command again. 

![homepage](/engineering-education/django-app-using-postgresql-database/homepage.png)

If you can see the image above, Congratulations! You just created a Hello World App in Django.

### References
1. [Django](https://www.djangoproject.com).

2. [PostgreSQL](https://www.postgresql.org/about/).

3. [Views and URLs in Django](https://djangobook.com/mdj2-django-views/).

4.  [Django Migrations](https://realpython.com/django-migrations-a-primer/). 

---
Peer Review Contributions by: [Mohan Raj](/engineering-education/authors/mohan-raj/)

