<!-- Author Biography -->
Name: ARAFAT OLAWUMI OLAYIWOLA
I am Software and Associate Cloud Engineer who is passionate about the over-whelming technologies out there. I develop a scalable and user friendly applications that run on all platforms and responsive. I love Django like my girlfriend. Undergraduate of Computer Engineering here in Nigeria.

<!-- My Picture -->
![Arafat Olayiwola](/core-concepts-of-django-for-mastering/Arafat-Olayiwola.jpg)

![django-img](/core-concepts-of-django-for-mastering/django-image.png)

<!-- INTRODUCTION -->
Are you  a beginner or an intermediate of Django? Join me to explore more on this superb and sweet framework used to setup web apps by connecting to server. You don't want to miss this!!

### Keys Take Away
At the end of this article, you will be able to do the following;
1. Setup Django project and configure it
2. Have core understanding of how routers work
3. Know what we mean by MVT in Django world
4. Understand Django Admin Interface
5. Be able to authenticate users 
6. Know what is relational database management system

Let's Begin!!!!

What is Django Framework?

"Django is a free, open source web framework written in the Python programming language". A “web framework” is software that abstracts away many of the common challenges related to building a website, such as connecting to a database, handling security, user accounts and much more. Django uses a python package called pip and this come in handy having installed Python. 
Django  is used to configure the server side of most website applications as used by Shopify, Google, Pinterest etc. This web framework allows developers out there to develop the backend by actually making ties with frontend of aplications through the use of it concepts, as we want to discuss in this article and databases in a real  world applications. Been a django developer with few years of experience, I have come to conclude on the these concepts as the backbone of Django which you cannot escape if truly you  want to be a succesful Django developer. Below is the bulletin of concepts to be mastered whether you are just starting out learning the framework or you have been into it for a while.

1. Django Project Structure
2. How Route Works In Web Applications using Django
3. Understanding Of Model View Template (MVT)
4. Dajngo Admin Interface Usage
5. Django User Authentication System
6. Basics Of Relational Database Management System

<!-- PART ONE -->
DJANGO PROJECT STRUCTURE

Let me begin by congratulating you for choosing Django as favorite web framework. Now how do we set up Django project in real world?
Least I forget, Django uses a virtual enviroment. What is virtual enviroment?
Virtual Enviroment is just a file/folder that contains all the Django dependencies installed from Python pip command which are neccessary  for the framework. All these dependecies are shipped out together with the project when it is time to deploy to real world by freezing them into a file called requirements.txt with command below.

* pip freeze > requirements.txt

How To Set Up Django Project 

Firstly, download and configure any code editor of your choice be it VSCODE, SUBLIME, ATOM e.t.c. Then head to python.org to download latest python to your machine which is Python3.9 currently. Python uses a command known as "pip" to install any of it package. For this reason, you will be using this alot whenever you are to install or update any Python package. Now its time to open your editor, lets get our hands dirty!! 
Open the terminal of the editor at the top center and type the following commands: 

* ls   ----> this print out files at the current path you are.
* mkdir dango-project  -----> folder that host our project is django-project
* cd django-project    -----> changing directory to the folder
* virtualenv venv      -----> venv named our virtual enviroment
* pip install django   -----> this command will install latest django

Having installed Django itself, then lets create our django project with below few commands: 

* django-admin startproject djangotutorial  -----> djangotutorial is the name of our folder that host project. 

Create a new app in your project by typing in the previous terminal opened earlier;

* python manage.py startapp home   

home is the new web app and this will create a folder with few files and folders.

For Django project to open on browser, we need a separate server to be running somewhere. Then open another terminal window and type the following commands below;

* python manage.py runserver  -----> server will start running and then click on the localhost:3000 to open up the project in the web browser and do no close it!

Congrataulations you have just created a Django project.

A Django Project when initialised contains basic files by default such as manage.py, view.py, etc. A simple project structure is enough to create a single page application. Here are the major files and there explanations. Inside the ( project folder ) there will be following files;

manage.py-This file is used to interact with your project via the command line(start the server, sync the database… etc). For getting the full list of command that can be executed by manage.py type this code in the command window;

* python manage.py help

_init_.py – It is python package.
settings.py – As the name indicates it contains all the website settings. In this file we register any applications we create, the location of our static files, database configuration details, etc.
urls.py – In this file we store all links of the project and functions to call.
wsgi.py – This file is used in deploying the project in WSGI. It is used to help your Django application communicate with the web server.

<!-- PART TWO -->

How Route Works In Web Applications

Modern web apps can often communicate with the server and have more direct access to the request that's being sent and the response that you get back. Generally speaking, web application routing is the process of using URLs to drive the user interface (UI). URLs are a prominent feature in every single web browser, and have several main functions from the user’s point of view. Where the server renders HTML one page at a time, the URL is the fundamental entry point for the user to access the application. Users navigate an application by clicking through URLs, which are sent to the server via HTTP, and the server responds appropriately via a server-side router.

In Django apps,  there is urls file with an extension of .py . This is where routes live in with features like path, views, name, and urlpattern. A valid example of router is  path('', views.index, name='index').

What does this route mean? this is route for homepage or root page of your project due to the empty quotations which calls whatever that is in the 'views.index' and will be rendered as index page. While 'name' is just the name given to our route that can be referenced in our template.

<!-- PART THREE -->
MODEL VIEW TEMPLATE SYSTEM 

MVT is an acronym for MODEL VIEW TEMPLATE. Django as a  web framework uses this architecture for its operation while other servers side language or framework use MODEL VIEW CONTROLLER, MVC. Lets understand each keyword!

Model: Model is going to act as the interface of your data. It is responsible for maintaining data. It is the logical data structure behind the entire application and is represented by a database (generally relational databases such as MySql, Postgres). This is configured in models.py file inside apps in django project folder. More on this when we reach the relational database part.

View: The View is the user interface — what you see in your browser when you render a website. It is represented by HTML/CSS/Javascript and Jinja files. Also this is where django developers develop  the views mapped with urls routes as shown to you under routing section. This can be of two types, be it function or class based views. The main purpose of views generally is to accept data coming from models and sends or maps it with template HTML file rendered. Django uses it render method which takes in three param i.e request, template_to_load and context_dictionary. Dont be surprised with Jinja files mentionede earlier, they are just files loaded in template with specific tag like {% load static % } as instance.

Template: A template consists of static parts of the desired HTML output as well as some special syntax describing how dynamic content will be inserted. Majorly, this represent what will render to page for user as interface. And this will be rendered from the views as explained above.

<!-- PART FOUR -->
DJANGO ADMIN INTERFACE

Django-admin-interface is a modern responsive flat admin interface customizable by the django admininstration. This is a ready-to-use user interface for administrative activities which is important for a web project. Django automatically generates admin UI based on your project models. This is where you can edit any of your model table made from models.py .
The Admin interface depends on the django.countrib module and to have it working you need to make sure some modules are imported in the INSTALLED_APPS and MIDDLEWARE_CLASSES tuples of the myproject/settings.py file.
Before launching your server, to access your Admin Interface, you need to initiate the database with commands like;

* python manage.py migrate 

This will create necessary tables or collections depending on your db type, necessary for the admin interface to run. Even if you don't have a superuser, you will be prompted to create one. If you already have a superuser or have forgotten it, you can always create one using the following code.

* python manage.py createsuperuser

Now to start the Admin Interface, we need to make sure we have configured a URL for our admin interface. Open the admin.py in your app folder and import your model example as MYModel and register with comman below;

* admin.site.register(MyModel)

Now run the server and navigate to localhost:3000/admin or port to see the admin. Type in your details and you have the admin configured.

<!-- PART FIVE -->
DJANGO USER AUTHENTICATION SYSTEM

Django provides an authentication and authorization ("permission") system, built on top of the session framework, that allows you to verify user credentials and define what actions each user is allowed to perform. The django framework includes built-in models for Users and Groups (a generic way of applying permissions to more than one user at a time), permissions/flags that designate whether a user may perform a task, forms and views for logging in users, and view tools for restricting content. According to Django the authentication system aims to be very generic, and so does not provide some features provided in other web authentication systems. Solutions for some common problems are available as third-party packages. For example, throttling of login attempts and authentication against third parties (e.g. OAuth).

The authentication system is very flexible, and you can build up your URLs, forms, views, and templates from scratch if you like, just calling the provided API to log in the user. We'll still need to create some templates, but that's pretty easy. Django provides almost everything you need to create authentication pages to handle login, log out, and password management "out of the box". This includes a URL mapper, views and forms, but it does not include the templates, we have to create our own.

If you're using function-based views, the easiest way to restrict access to your functions is to apply the login_required decorator to your view function. If the user is logged in then your views code will execute as normal. If the user is not logged in, this will redirect to the login URL defined in the project settings (settings.LOGIN_URL), passing the current absolute path as the next URL parameter. If the user succeeds in logging in then they will be returned back to the page redirected to, but this time authenticated.

<!-- PART SIX -->
RELATIONAL DATABASE MANAGEMENT SYSTEM

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

CONCLUSION

Django as a framework makes web development backend simple and easy to use. With this succint article on the concepts of Django,  I will implore you to head on to Django documentations site for more information and try to reference it in subsequent project of yours. Congratulations on your new skills added!! Django is awesome.

Happy Learning!