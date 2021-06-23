### Key Take Aways
At the end of this article, readers would have knowledge about the following topics:

1. Django Projects Structure
2. How routing works in Django
3. Meaning of MVT as a concept in Django
4. Understand Django Admin Interface
5. Django Authentication System
6. Relational Database System As Used In Django

![django-img](/core-concepts-of-django-for-mastering/django-image.png)

## Introduction

Django is a free, open source web framework written in the Python programming language. A web framework is software that abstracts away many of the common challenges related to building a website, such as connecting to a database, handling security, user accounts and much more.

Django uses a python package called pip and this come in handy having installed Python. 
Django  is used to configure the server side of most website applications as used by Shopify, Google, Pinterest etc. This web framework allows developers out there to develop the backend by actually making ties with frontend of aplications through the use of it concepts, as we want to discuss in this article and databases in a real  world applications. 

Been a django developer with few years of experience, I have come to conclude on the these concepts as the backbone of Django which you cannot escape if truly you  want to be a succesful Django developer. Below is the bulletin of concepts to be mastered whether you are just starting out learning the framework or you have been into it for a while.

### 1. DJANGO PROJECTS STRUCTURE

We will start by creating our project's work directory and a virtual environment for our project. The virtual environment makes it possible to run our project and its dependencies in an isolated environment.

Virtual Enviroment is just a file/folder that contains all the Django dependencies installed from Python pip command which are neccessary  for django. All these dependecies are shipped out together with the project when it is time to deploy to real world by freezing them into a file called 'requirements.txt'. To set up the django project, an example is as follows:

To verify if Python is installed and configured correctly on your system, Open the terminal and type in the command `python3 --version` on Linux/Mac or `python --version` if you are on Windows.

```bash
$ python --version
Python 3.8.5
```

To verify virtualenv installation execute the command `virtualenv --version` on the terminal.

```bash
$ virtualenv --version
virtualenv 20.0.35 from /home/user/.local/lib/python3.9/site-packages/virtualenv/__init__.py
```

Run `mkdir ~/django-project` to create our working directory.

```bash
$ mkdir ~/django-project
$ cd django-project
```

1. To create a virtual environment for our project run the command below:

      ```bash
      $ virtualenv venv
      ```
   `venv` in the command `virtualenv venv` is the name of our virtual environment.

2. To activate the virtual environment for the project run the command below, if you are on window os use this:

   ```bash
   $ source venv/bin/activate
   ```

3. To install Django in our virtual environment run the command below:

   ```bash
   $ pip install django
   ```
   Running the command will result in something similar to the code block below

   ```bash
   $ pip install django
   Collecting django
   Using cached Django-3.1.3-py3-none-any.whl (7.8 MB)
   Collecting asgiref<4,>=3.2.10
    Downloading asgiref-3.3.1-py3-none-any.whl (19 kB)
   Collecting pytz
     Using cached pytz-2020.4-py2.py3-none-any.whl (509 kB)
   Collecting sqlparse>=0.2.2
    Using cached sqlparse-0.4.1-py3-none-any.whl (42 kB)
   Installing collected packages: asgiref, pytz, sqlparse, django
   Successfully installed asgiref-3.3.1 django-3.1.3 pytz-2020.4 sqlparse-0.4.1
   ```

Let's create our django project now by running the command `django-admin startproject django-project`

```bash
$ django-admin startproject django-project
```

After successfully creating the project we change our working directory to our project folder and run the Django development server.

```bash

$ cd django-project
$ python manage.py runserver

Watching for file changes with StatReloader
Performing system checks...

System check identified no issues (0 silenced).

You have 18 unapplied migration(s). Your project may not work properly until you apply the migrations for app(s): admin, auth, contenttypes, sessions.
Run `python manage.py migrate` to apply them.
November 17, 2020 - 10:14:01
Django version 3.1.3, using settings 'django_todo.settings'
Starting development server at http://127.0.0.1:8000/
Quit the server with CONTROL-C.
```

When we visit `http://127.0.0.1:8000/` in web browser, we should see the default Django welcome page. To restart the server, always run the command below.

```bash
$ python manage.py runserver
```

### 2. How Route Works In Web Applications

Modern web apps can often communicate with the server and have more direct access to the request that's being sent and the response that you get back. Generally speaking, web application routing is the process of using URLs to drive the user interface (UI). URLs are a prominent feature in every single web browser, and have several main functions from the user’s point of view. Where the server renders HTML one page at a time, the URL is the fundamental entry point for the user to access the application. Users navigate an application by clicking through URLs, which are sent to the server via HTTP, and the server responds appropriately via a server-side router.

In Django apps,  there is urls file with an extension of .py . This is where routes live in with features like path, views, name, and urlpattern. A valid example of router is  path('', views.index, name='index').

What does this route mean? this is route for homepage or root page of your project due to the empty quotations which calls whatever that is in the 'views.index' and will be rendered as index page. While 'name' is just the name given to our route that can be referenced in our template.

### 3. MODEL VIEW TEMPLATE SYSTEM 

MVT is an acronym for MODEL VIEW TEMPLATE. Django as a  web framework uses this architecture for its operation while other servers side language or framework use MODEL VIEW CONTROLLER, MVC. Lets understand each keyword!

Model: Model is going to act as the interface of your data. It is responsible for maintaining data. It is the logical data structure behind the entire application and is represented by a database (generally relational databases such as MySql, Postgres). This is configured in models.py file inside apps in django project folder. More on this when we reach the relational database part.

View: The View is the user interface — what you see in your browser when you render a website. It is represented by HTML/CSS/Javascript and Jinja files. Also this is where django developers develop  the views mapped with urls routes as shown to you under routing section. This can be of two types, be it function or class based views. The main purpose of views generally is to accept data coming from models and sends or maps it with template HTML file rendered. Django uses it render method which takes in three param i.e request, template_to_load and context_dictionary. Dont be surprised with Jinja files mentionede earlier, they are just files loaded in template with specific tag like {% load static % } as instance.

Template: A template consists of static parts of the desired HTML output as well as some special syntax describing how dynamic content will be inserted. Majorly, this represent what will render to page for user as interface. And this will be rendered from the views as explained above.


### 3. DJANGO ADMIN INTERFACE

Django-admin-interface is a modern responsive flat admin interface customizable by the django admininstration. This is a ready-to-use user interface for administrative activities which is important for a web project. Django automatically generates admin UI based on your project models. This is where you can edit any of your model table made from models.py .
The Admin interface depends on the django.countrib module and to have it working you need to make sure some modules are imported in the INSTALLED_APPS and MIDDLEWARE_CLASSES tuples of the myproject/settings.py file.
Before launching your server, to access your Admin Interface, you need to initiate the database with commands like;

* python manage.py migrate 

This will create necessary tables or collections depending on your db type, necessary for the admin interface to run. Even if you don't have a superuser, you will be prompted to create one. If you already have a superuser or have forgotten it, you can always create one using the following code.

* python manage.py createsuperuser

Now to start the Admin Interface, we need to make sure we have configured a URL for our admin interface. Open the admin.py in your app folder and import your model example as MYModel and register with comman below;

* admin.site.register(MyModel)

Now run the server and navigate to localhost:3000/admin or port to see the admin. Type in your details and you have the admin configured.

### 4. DJANGO USER AUTHENTICATION SYSTEM

Django provides an authentication and authorization ("permission") system, built on top of the session framework, that allows you to verify user credentials and define what actions each user is allowed to perform. The django framework includes built-in models for Users and Groups (a generic way of applying permissions to more than one user at a time), permissions/flags that designate whether a user may perform a task, forms and views for logging in users, and view tools for restricting content. According to Django the authentication system aims to be very generic, and so does not provide some features provided in other web authentication systems. Solutions for some common problems are available as third-party packages. For example, throttling of login attempts and authentication against third parties (e.g. OAuth).

The authentication system is very flexible, and you can build up your URLs, forms, views, and templates from scratch if you like, just calling the provided API to log in the user. We'll still need to create some templates, but that's pretty easy. Django provides almost everything you need to create authentication pages to handle login, log out, and password management "out of the box". This includes a URL mapper, views and forms, but it does not include the templates, we have to create our own.

If you're using function-based views, the easiest way to restrict access to your functions is to apply the login_required decorator to your view function. If the user is logged in then your views code will execute as normal. If the user is not logged in, this will redirect to the login URL defined in the project settings (settings.LOGIN_URL), passing the current absolute path as the next URL parameter. If the user succeeds in logging in then they will be returned back to the page redirected to, but this time authenticated.


### 5. RELATIONAL DATABASE MANAGEMENT SYSTEM

A relational database is a type of database. It uses a structure that allows us to identify and access data in relation to another piece of data in the database. Often, data in a relational database is organized into tables.
A relational database management system (RDBMS) is a program that allows you to create, update, and administer a relational database. Most relational database management systems use the SQL language to access the database.

What is SQL language?
SQL (Structured Query Language) is a programming language used to communicate with data stored in a relational database management system. SQL syntax is similar to the English language, which makes it relatively easy to write, read, and interpret.

Many RDBMSs use SQL (and variations of SQL) to access the data in tables. For example, SQLite is a relational database management system. SQLite contains a minimal set of SQL commands (which are the same across all RDBMSs). Other RDBMSs may use other variants. Django supports sqlite for its development stage and also can be used for a very small applications. But when it comest to a larger apllications, then sql databases like Postgresql, Mysql nand SQLServer are options. You do this by firstly download the type of database to be used and their workbench too. This database shall be added to the settings.py file under the project folder. With configurations like below;

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

Then use the commands below to migrate all your models into the database. This command will create a 0001 file in your Migrate folder generated during the first migration.

* python manage.py makemigrations <your_app_name>

Then this command will push tht sql codes in the Migrate folder to register it as tables in the database added.

* python manage.py migrate

### CONCLUSION

Django as a framework makes web development backend simple and easy to use. With this succint article on the concepts of Django,  I will implore you to head on to Django documentations site for more information and try to reference it in subsequent project of yours. Congratulations on your new skills added!! Django is awesome.

![Django Official Docs](/https://docs.djangoproject.com/en/3.2/intro/)

Happy Learning!