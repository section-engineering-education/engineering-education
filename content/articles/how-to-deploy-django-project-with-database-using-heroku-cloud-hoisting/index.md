
![hero](/how-to-deploy-django-project-with-database-using-heroku-cloud-hoisting/heroku.png)


### Introduction 

Welcome folks! I am Arafat Olayiwola and in this tutorial I will be walking you through steps of hoisting Django application on Heroku server. Heroku is one of the cloud providers out there that allows developers to hoist their application on their server, together with monitoring and managing the health checks of the server. 

To deploy Django application on Heroku server, some dependencies are needed to set up and we shall do justice on that in this article.
You can brush up concepts of Django that require mastering if you are curious to know, though it is not a prequisite for this. 

[Core concepts of Django to master.](/https://section.io/engineering-education/core-concepts-of-django-to-learn/)

#### Prequisites
1. Latest version of Python is required. So head on to `Python docs` and download if you are not having it locally.
[Python Websites](/https://www.python.org/downloads/)

2. Latest Version of PostgreSQL database is needed. Download here.

3. Download workbench of postgreSQL here too. 

#### Key take aways
The aim of this article is to familiarise you with steps on how to deploy any django project using database on heroku server by building a student profile app. While the objectives are as follows:

1. How to setup Django project with requirement dependencies.
2. Developing an application for the article and setting up database.
2. How to setup account and login with Heroku.
3. How to push up project to git so that Heroku account created can access it.
4. How to hoist your project and get domain name with extension of herokuapp.com.

### Setting Up Django Project

Like I said earlier, we are developing students profile application that would have features like name, email, phone and delete button. So, Let's get started by setting up our Django project.

I will be using bash for as CLI. Feel free to use your terminal if you do not have that. We need to set up virtual enviroment as dependency for django project. But before that, navigate to where your project will stay in your local computer.

```bash
$ cd Desktop
$ mkdir myproject
$ cd myproject
```

Now our project stays inside Desktop folder and we are inside `myproject` folder.

Let us make virtual enviroment an configure the project.
```bash 
$ virtualenv env
    created virtual environment CPython3.8.6.final.0-64 in 11821ms
    creator CPython3Windows(dest=C:\Users\user\Desktop\myproject\env, clear=False
    , no_vcs_ignore=False, global=False)
    seeder FromAppData(download=False, pip=bundle, setuptools=bundle, wheel=bundl
    e, via=copy, app_data_dir=C:\Users\user\AppData\Local\pypa\virtualenv)
        added seed packages: pip==21.1.2, setuptools==57.0.0, wheel==0.36.2
    activators BashActivator,BatchActivator,FishActivator,PowerShellActivator,Pyt
    honActivator,XonshActivator

$ cd env
$ source env/Scripts/activate
$ pip install django
    Collecting django
  Downloading Django-3.2.6-py3-none-any.whl (7.9 MB)
     |████████████████████████████████| 7.9 MB 123 kB/s
Collecting sqlparse>=0.2.2
  Using cached sqlparse-0.4.1-py3-none-any.whl (42 kB)
Collecting asgiref<4,>=3.3.2
  Downloading asgiref-3.4.1-py3-none-any.whl (25 kB)
Collecting pytz
  Downloading pytz-2021.1-py2.py3-none-any.whl (510 kB)
     |████████████████████████████████| 510 kB 731 kB/s
Installing collected packages: sqlparse, pytz, asgiref, django
Successfully installed asgiref-3.4.1 django-3.2.6 pytz-2021.1 sqlparse-0.4.1
```

Django is successfully installed on your local computer. Now let us set up the project.

```bash
$ django-admin startproject studentprofile
$ cd studentprofile
$ pip freeze > requirements.txt
$ code .
```

What `code .` does is to open your current directory in any editor you use.
Every brand new Django project comes with default page. So to reference that, type `python manage.py runserver` in bash and click on the `http://127.0.0.1:8000/` to open in browser.

Never close the development server while you are still developing your application.

```bash
$ python manage.py runserver
    Watching for file changes with StatReloader
    Performing system checks...

    System check identified no issues (0 silenced).

    You have 18 unapplied migration(s). Your project may not work properly until yo
    u apply the migrations for app(s): admin, auth, contenttypes, sessions.
    Run 'python manage.py migrate' to apply them.
    August 04, 2021 - 07:02:41
    Django version 3.2.6, using settings 'studentprofile.settings'
    Starting development server at http://127.0.0.1:8000/
    Quit the server with CTRL-BREAK.
```

Congratulations!! Your project is initiated successfully. 

### Development Of Project and Setting PostgreSQL database

In this project, we need two main apps `students` and `account`. We will serve our application index page from `students` app while `account` app is for form where details can be entered.

Let us create the two with this codes.

```bash
$ python manage.py startapp students
$ python manage.py startapp account
```

We have added the two apps. For Django to recognise them, we need to add both to `INSTALLED_APPS` inside `settings.py`  in the `studentprofile` app. Like below.

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'students',
    'account'
]

Now we need to set up our database and we will be considering `postgresql`. 
But before that Django required  dependecy called `psycopg2` to talk to postgres. So let us insatll it.

```bash
$ pip install psycopg2
$ pip freeze > requirements.txt
```
Note: always use this command `pip freeze > requirements.txt` whenever you install new dependency. That will add it to our `env` enviroment.

So go inside the workbench downloaded and create database named `StudentsProfile`. Having done, that we need to conect our project to the database created.

Now go into `settings.py` and change the `DATABASES` option to something like this.

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': 'StudentsProfile',
        'USER': 'postgres',
        'PASSWORD': '******',
        'HOST': 'localhost',
    }
    
}

Note that `PASSWORD` is encrypted here. That stands for your password provided when installing workbench earlier for your computer.