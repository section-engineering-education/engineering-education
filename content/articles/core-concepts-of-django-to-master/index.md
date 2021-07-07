---
layout: engineering-education
status: publish
published: true
url: /engineering-education/core-concepts-of-django-to-master/hero.png
title: Core concepts to master when using Django
description: In this article we will cover a number of concepts to be mastered whether you are just starting out learning the framework or have some experience with it.
author: arafat-olayiwola
date: 2021-06-26T00:00:00-11:40
topics: [Languages]
excerpt_separator: <!--more-->
images:
  - url: /engineering-education/core-concepts-of-django-to-master/hero.png
    alt: Core concepts to master when using Django
---

In out today's discussion, I would be introducing you to this great Python backend framework known DJANGO. In web applications development world, there are different server side languages and frameworks of which Django happens to be one. To be cleared enough, Django is just a framework built on top a well known programming language called Python few years back. Join me in this journey of my favorite web framework to explore more. Yes, you reader!!

Django uses a python package called pip and this come in handy with Python installed. Django is used to configure the server side of web applications as used by Shopify, Google, Pinterest, Instagram etc.

Surprised!! Yes, companies mentioned used Django for their backend operations.

Django web framework allows developers to connect the server side by actually making ties with the user interface of applications through the use of its concepts.

In this article we will cover a number of concepts to be mastered whether you are just starting out learning the framework or have some experience with it.

## Key Take Aways

By the end of this article, readers would have knowledge about the following topics:

1. Django Projects Structure
2. How url routing works in Django
3. Meaning of MVT as a concept in Django
4. Understanding Django Admin Interface
5. Django Authentication System
6. Relational Database System As Used In Django

![hero](/core-concepts-of-django-for-mastering/hero.png)

### 1. DJANGO PROJECTS STRUCTURE

We will start by creating our project's work directory and a virtual environment for our project as required by Django.

Virtual Enviroment is just a file/folder that contains all the Django dependencies installed from Python pip command which are neccessary. All these dependecies are to be shipped out together with the project when it is time to deploy to real world by freezing them into a file called `requirements.txt`.

To compile all installed dependencies into the `requirements.txt` file, run command below:

```bash
$ pip freeze > requirements.txt
```
But assuming you are to install all dependencies inside already made `requirements.txt` file, then run command 

```bash
$ pip install -r requirements.txt
```
Now to set up the django project itself, please continue reading the article.

We firstly need to check if Python is installed properly. Use bash or terminal and type command as follows. 

I have installed `Python 3.9.6` on my machine. Yours might be different, no qualms at all. 

```bash
$ python --version
Python 3.9.6
```
It is advisable to install `Python3` anyways. If you have no Python installed, then head on to official website and download latest according to your OS.

![Python Official ](/https://python.org)

You are on track, keep up reading...

Navigate into the directory folder you would like to have your Django project and run this.

```console
  mkdir mydjangoproject
  cd mydjangoproject
```
Now you are inside the `mydjangoproject` folder.

Yaay! you are doing well buddy. Let's explore more.

1. Inside the current directory, create the virtual enviroment folder as described above. You remember? Good.

   ```bash
   $ virtualenv myenv
   ```

   Verify this by typing `virtualenv --version`.

   ```bash
   $ virtualenv --version
   virtualenv 21.0.40
   ```

2. To activate the `myenv` for the project, run this if you are window user.

   ```bash
    source myenv/Scripts/activate 
   ```
   
   But if you are on Mac/Linux OS use:

   ```bash
   $ myenv/bin/activate
   ```

3. To install Django in our virtual environment run the command below:

   ```bash
     pip install django
   ```
   You can verify this installation by freezing the `requirements.txt` file.

   ```bash
   $ pip freeze > requirements.txt
   ```
   Now open this current directory in your favorite code editor. The `requirements.txt` will be there and you can check to see the version of django installed for you. Great!!
   
   Let's create our django project now by running the command `django-admin startproject dj-project`

   ```bash
   $ django-admin startproject dj-project .
   ```
   
Adding dots in the command is optional. What this does is that your `dj-project` will be created inside the current working directory.

Having succesfully created the `dj-project`, now run command below and open the `http://127.0.0.1:8000/` brought to you  in the browser.

```bash
$ python manage.py runserver
```
Typing this in bash `python manage.py runserver`, always start django default server for your project and it must be left running while working on. To quit the server, simply press CTRL+C. 

### 2. URL Routing In Django

Generally speaking,the routing mapped the url that user type with the exact match in views. This talks to the server from the client browser back and forth.

URLs or Uniform Resource Locators in full, are a prominent feature in every single web browser and have several main functions from the users point of view. Where the server renders HTML one page at a time, the URL is the fundamental entry point for the user to access the application via HTTP.

In Django apps, there are url files with an extension of `.py`. This is where url routes live in with features like path, views, name, and urlpattern.

A valid example of router in django apps in `urls.py` is below

```python
from django.urls import path
from . import views

urlpatterns = [
   path('', views.index, name='index'),
   path('users/', views.userList, name='users'),
]
```

### 3. Django MODEL VIEW TEMPLATE SYSTEM (MVT)

Model View Template (MVT), is an acronym for MODEL VIEW TEMPLATE. Django as a web framework uses this architecture for its operation while other servers side language or framework use MODEL VIEW CONTROLLER, MVC. Let's understand each keyword!

_MODEL_ is going to act as the interface of your data. It is responsible for maintaining data and it is the logical data structure behind the entire application that is represented by a database (generally relational databases such as SQL). This is configured in models.py file inside apps in django project folder.

In the `models.py`, we will create our `MyModel` class with these Python class:

```python
from django.db import models

# Create your models here.
class MyModel(models.Model):
   title = models.CharField(max_length = 100)
   is_completed = models.BooleanField(default=False)
   date_created = models.DateField(auto_created=True)

   def __str___(self):
      return self.title
```

What the private method `__str__` does is that it helps to return whatever the title is as the representational name for our model in admin.

_VIEW_ is the user interface code that returns what you see in your browser when you render a website uri. This is nothing but a Python function or class views that render the template by returning some data from the model after the logic behind it.

The main purpose of views generally is to accept data coming from models and sends or maps it with template HTML file rendered. Django uses its render method which takes in three param i.e request, template_to_load and context_dictionary.

This looks like this below in django apps `views.py`. This is an example of functional view in Django.

```python
from django.shortcuts import render

def myView(request):
   context = {}
   return render(request, index.html, context)
```
While this is class based views in Django as well.

```python
from django.views imoport TemplateView

class MyViewClass(TemplateView):
   template_name = 'index.html'
```
Note that class based views do not require `return`.

_TEMPLATE_ consists of static parts of the desired HTML output as well as some special syntax describing how dynamic content will be inserted. Majorly, this represent what will render to page for user as interface from the views.

This is most cases your HTML boiler plate that will be shown to users whenver they come to the rendered uri.

### 3. DJANGO ADMIN INTERFACE

Django-admin-interface is a modern responsive flat admin interface customizable by the django admininstration. This is a ready-to-use user interface for administrative activities which is important for a web project.

Django automatically generates admin UI based on your project models. This is where you can edit any of your model table made from models.py . The Admin interface depends on the django.countrib module and to have it working you need to make sure some modules are imported in the INSTALLED_APPS and MIDDLEWARE_CLASSES tuples of the django-project/settings.py file.

To access your Admin Interface, you need to initiate the database with our django-project created in the `admin.py` file

```python
   from django.contrib import admin
   from .models import MyModel

   admin.site.register(MyModel)

```

Then create a super user account that will access the admin and answer all questions about the credentials needed for the account

```bash
$ python manage.py createsuperuser
```

Having done that, head on to the browser and paste the url, then login to the account `http://127.0.0.1:8000/admin` to view the admin prepared for your project. Don't you fall for Django by now?? You should because of all the stuffs configured for you as a developer, of which all other frameworks do not.

### 4. DJANGO USER AUTHENTICATION SYSTEM

Django provides an authentication and authorization ("permission") system, built on top of the session framework, that allows you to verify user credentials and define what actions each user is allowed to perform.

The django framework includes built-in models for Users and Groups (a generic way of applying permissions to more than one user at a time), permissions/flags that designate whether a user may perform a task, forms and views for logging in users, and view tools for restricting content.

The authentication system aims to be very generic, and so does not provide some features provided in other web authentication systems. Solutions for some common problems are available as third-party packages. For example, throttling of login attempts and authentication against third parties (e.g. OAuth).

The authentication system is very flexible, and you can build up your URLs, forms, views, and templates from scratch if you like, just calling the provided API to log in the user. Django provides almost everything you need to create authentication pages to handle login, log out, and password management "out of the box".

This includes a URL mapper, views and forms, but it does not include the templates, we have to create our own. If you're using function-based views, the easiest way to restrict access to your functions is to apply the login_required decorator to your view function.

See to the official documentations here for more [Django Official Docs](/https://docs.djangoproject.com/en/3.2/django-authentication/)

### 5. RELATIONAL DATABASE MANAGEMENT SYSTEM

A relational database is a type of databases. It uses a structure that allows us to identify and access data in relation to another piece of data in the database. Often, data in a relational database is organized into tables.

What is now RDBMS? A relational database management system (RDBMS) is a program that allows you to create, update, and administer a relational database. Most relational database management systems use the SQL language to access the database.

What is SQL language? SQL (Structured Query Language) is a programming language used to communicate with data stored in a relational database management system. SQL syntax is similar to the English language, which makes it relatively easy to write, read, and interpret.

Many RDBMSs use SQL (and variations of SQL) to access the data in tables. For example, SQLite is a relational database management system. SQLite contains a minimal set of SQL commands (which are the same across all RDBMSs). Other RDBMS(s) may use other variants. Django supports sqlite for its development stage and also can be used for a very small applications. But when it comes to a larger apllications, then sql databases like Postgresql, Mysql nand SQLServer are options.

Let us explore how to add custom database in django, you do this by firstly download the type of database to be used and their workbench too on your machine. You can just type your choice database into browser and head over to the site.

Having downloaded and install, create a database name and connect it by changing the following in `settings.py` file under the django project folder created earlier.

```python
   DATABASES = {
      'default': {
         'ENGINE': 'django.db.backends.postgresql',
         'NAME': 'db_name',
         'USER': 'db_user',
         'PASSWORD': ********,
         'HOST': '',
         'PORT': 'db_port_number',
      }
   }
```

We will first run the command `python manage.py makemigrations` to create SQL queries that will be used to create a table in the database. To create table in the database, we will run the command `python manage.py migrate`.

To make migrations run:

```bash
 python manage.py makemigrations
```

To apply the migrations run:

```bash
 python manage.py migrate
```

Then you can go ahead and confirm the table with rows and columns created for your project in the workbench.

### CONCLUSION

Django as a framework makes web development backend simple and easy to use. With this succint article on the concepts of Django, I will implore you to head on to Django documentations site for more information and try to reference it in subsequent project of yours. Congratulations on your new skills added. Django is awesome!!

Thank you for making it to this end, see you soon in next article.

![Django Official Docs](/https://docs.djangoproject.com/en/3.2/intro/)

![Follow Me Here](/https://github.com/Horlawhumy-dev)

Happy Learning!

---

Peer Review Contributions by: [Daniel Katungi](/engineering-education/authors/daniel-katungi/)
