
![hero](/how-to-deploy-django-project-with-database-using-heroku-cloud-hoisting/django-heroku.png)


### Introduction 

Welcome folks! I am Arafat Olayiwola and in this tutorial I will be walking you through steps of hoisting Django application on Heroku server. Heroku is one of the cloud providers out there that allows developers to hoist their application on their server, together with monitoring and managing the health checks of the server. 

To deploy Django application on Heroku server, some dependencies are needed to set up and we shall do justice on that in this article.
You can brush up concepts of Django that require mastering if you are curious to know, though it is not a prequisite for this. 

[Core concepts of Django to master.](/https://section.io/engineering-education/core-concepts-of-django-to-learn/)

#### Prequisites
1. Latest version of Python is required. So head on to `Python docs` and download if you are not having it locally.
[Python Websites](/https://www.python.org/downloads/)

2. Latest Version of PostgreSQL database is needed. Download here.
[Download Postgres](/https://www.postgresql.org/download/)

3. Download workbench of postgreSQL here too. 
[Download Workbench](/https://www.pgadmin.org/download/)


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

We have added the two apps to our project. For Django to recognise them, we need to add both to `INSTALLED_APPS` inside `settings.py`  in the `studentprofile` app like below.
```
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
```
Now we need to set up our database and we will be considering `postgresql`. 
But before that Django required  dependecy called `psycopg2` to talk to postgres. So let us insatll it.

```bash
$ pip install psycopg2
$ pip freeze > requirements.txt
```
Note: Always use this command `pip freeze > requirements.txt` whenever you install new dependency. That will add it to our `env` enviroment.

So go inside the workbench downloaded and create database named `StudentsProfile`. Having done, that we need to conect our project to the database created.

Now go into `settings.py` and change the `DATABASES` option to something like this.
```
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.postgresql_psycopg2',
            'NAME': 'StudentsProfile',
            'USER': 'postgres',
            'PASSWORD': '******',
            'HOST': 'localhost',
        }
        
    }
```
Note that `PASSWORD` is encrypted here. That stands for your password provided when installing workbench earlier for your computer.

We can now migrate the default models to the new database connected with.

```bash
$ python manage.py makemigrations
$ python manage.py migrate
    Operations to perform:
    Apply all migrations: admin, auth, contenttypes, sessions
    Running migrations:
    No migrations to apply.
```

If you open your postgres workbench and navigate to the database created, you will confirm all the django default models migrated. 

Let us set-up our models for the `account` app. Go into the `account` app and open `models.py`. Then write your models like this below.

```
    from django.db import models
    from datetime import timezone

    class StudentAccount(models.Model):
        name = models.CharField(max_length=200)
        email = models.EmailField()
        phone = models.CharField(max_length=200)
        date_created = models.DateTimeField(auto_now=timezone.now())

        def __str__(self):
            return self.name
```
Let us `makemigrations` again to generate migration file. Then after that we migrate to the database.

```bash
$ python manage.py makemigrations account
    Migrations for 'account':
    account\migrations\0001_initial.py
    - Create model StudentAccount
$ python manage.py migrate
    Operations to perform:
    Apply all migrations: account, admin, auth, contenttypes, sessions
    Running migrations:
    Applying account.0001_initial... OK
```

The next thing is to set up our admin backend. Remember every Django project comes in handy with already configured `admin`, so we just utilise that. Open the the `admin.py` inside the `account` app and subscribe the `model`.
```
    from django.contrib import admin
    from .models import StudentAccount

    admin.site.register(StudentAccount)
````

One last thing to do before it can work is to register an account with the admin. Provide a username, email and password that you can remember.

```bash
$ python manage.py createsuperuser
    Username (leave blank to use 'user'):
    Email address:
    Password:
    Password (again):
    The password is too similar to the username.
    This password is too short. It must contain at least 8 characters.
    This password is too common.
    Bypass password validation and create user anyway? [y/N]: y
    Superuser created successfully.
```

Great! You have just made an admin backend for your project. Only you as an admin can read, write, modify and delete data there. Now let us `runserver` and access admin configured.

```bash
$ python manage.py runserver
    Watching for file changes with StatReloader
    Performing system checks...

    System check identified no issues (0 silenced).
    August 04, 2021 - 15:52:52
    Django version 3.2.6, using settings 'studentprofile.settings'
    Starting development server at http://127.0.0.1:8000/
    Quit the server with CTRL-BREAK.
```

Open `http://127.0.0.1:8000/admin/login/?next=/admin/` and login to the admin. You should see something similar to this image below.

Wow! What is next? Yes, you guessed right. We need to make our form page, so that students details can be added to database from UI.

We can make use of the `models` properties as form fields. How right? No worries.

Now add `forms.py` to your `account` app. And then do the logic as below.

```
    from django import forms
    from .models import StudentAccount

    class StudentForm(forms.ModelForm):

    class Meta:
        model = StudentAccount
        fields = ['name', 'email', 'phone']
```

To reference the form made, we need to send it to the template through the `views.py` inside the `account` app. As far as the `view` is concern, this is all of the logic that we need. 

```
    from django.shortcuts import render, redirect
    from .forms import StudentForm
    from .models import StudentAccount

    def account_view(request):
        form = StudentForm()
        if request.method == 'POST':
            name = request.POST['name']
            email = request.POST['email']
            phone = request.POST['phone']
            
            user = StudentAccount(name=name, email=email, phone=phone)
            user.save()
            return redirect('/')
        else:
        return render(request, 'account/form.html', {'form': form})

    
    def delete(request, pk):
        student = StudentAccount.objects.get(id=pk)
        student.delete()
        return redirect('/')
```
Now let us make `urls` for the routing. Make a `urls.py` inside the `account` app and configure as below.

```
    from django.urls import path
    from . import views

    app_name = 'account'
    urlpatterns = [
        path('form/', views.account_view, name="form"),
        path('delete/<str:pk>/', views.delete, name="delete")
    ]
```
With these that we have done so far, it is time to the connect to `students` app too. First thing to do here, is to make the routing working. As we have been doing, quickly navigat to the app and add `urls.py` file then make some route like this.

```
    from django.urls import path
    from . import views

    app_name = 'students'
    urlpatterns = [
        path('', views.index, name="index")
    ]
```

Having done that, we need to write the views logic inside the `views.py`.

```
    from django.shortcuts import render
    from account.models import StudentAccount

    def index(request):
        students = StudentAccount.objects.all()
        return render(request, 'students/index.html',{'students': students})
```

We have made it this far!! Great. It is time we make the templates for the project to render interface to users.
You remember Django uses `Model View Template` architecture and if you are surprised quickly check the link above and read about that.

What we can do is to add `templates` folder into the project that is `studentprofile` folder and ensure that it is at the same level with the other `studentprofile` folder.

If you are confused, kindly open your bash and type commands below.

```bash
$ cd studentprofile
$ ls
    account/  manage.py*  requirements.txt  studentprofile/  students/
$ mkdir templates
$ cd templates
$ mkdir students
$ mkdir account
$ cd students
$ touch index.html
$ touch base.html
$ cd ../
$ cd account
$ touch form.html
$ cd ../../
$ ls
    account/  manage.py*  requirements.txt  studentprofile/  students/  templates/
```

Yes! We have made the templates. Now let us connect it to the project by going into the `settings.py` and do this below. Kindly make sure to add `import os` at the topmost of the `settings.py`.

```
    import os
    TEMPLATES = [
        {
            'BACKEND': 'django.template.backends.django.DjangoTemplates',
            'DIRS': [os.path.join(BASE_DIR, 'templates')],
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

By now we are 60% done with the whole project. Let us finish it together okay!

So the next thing is to actually make our `html` boiler plates inside the templates. We need to serve the whole of our project from `base.html`, then go ahead and paste this inside the `students/base.html`.

```
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>{% block title %} {% endblock %}</title>
    </head>
    <body>
        {%block content%}
        
        {% endblock%}
    </body>
    </html>
```

Inside the `account/index.html` add the following code below for the index page. 

```
    {% extends 'students/base.html'%}

    {% block title %} Home Page {% endblock %}

    {% block content %} 
        <h1>Welcome To Student Profile App.</h1>
        <h2><a href="{% url 'account:form' %}">Add Student</a></h2>
        {% if students %}
            <table>
                <thead>
                    <tr>
                        <th>Student ID</th>
                        <th>Full Name</th>
                        <th>Email</th>
                        <th>Phone Number</th>
                        <th>Edit Profile</th>
                        <th>Delete Profile</th>
                    </tr>
                </thead>
                <tbody>
                
                        {% for student in students %}
                            <tr>
                                <td>{{ student.id }}</td>
                                <td>{{student.name}}</td>
                                <td>{{student.email}}</td>
                                <td>{{student.phone}}</td>
                                <td>
                                    <form action="{% url 'account:delete' student.id %}" method="POST">
                                        {% csrf_token %}
                                        <input type="submit" value="Delete">
                                    </form>
                                </td>
                            </tr>
                        {% endfor %}
                
                </tbody>
            </table>
        {% endif %}
    {% endblock %}
```
And for the form page, go into the `account/form.html` and make your the interface like this.

```
    {% extends 'students/base.html'%}

    {% block title %} Form Page {% endblock%}

    {% block content %} 
        <h2>
            <a href="{% url 'students:index' %}">Go back home</a>
        </h2>
        <h1>Add Student Profile</h1>
        <form action="{% url 'account:form' %}" method="POST">
            {% csrf_token %}
            {{ form.as_p }}
            <input type="submit" value="Submit"/>
        </form>
        
    {% endblock %}
```

This is awesome!! Now you can go ahead and run server to see your project in the browser.

```bash
$ python manage.py runserver
    Watching for file changes with StatReloader
    Performing system checks...

    System check identified no issues (0 silenced).
    August 04, 2021 - 15:52:52
    Django version 3.2.6, using settings 'studentprofile.settings'
    Starting development server at http://127.0.0.1:8000/
    Quit the server with CTRL-BREAK.
```

Yes! We made it together. We are done with the project, now let us move on to the next on the list.

Django as backend framework requires some few dependencies for it to be live and accessible over the internet users on Heroku server. Here are the lists of them:

1. gunicorn
    This `gunicorn` allows the Django project to be accessible via HTTP protocol. And this is will be configured inside a file named `Procfile`. For that let us install `gunicorn`.

```bash
$ pip install gunicorn
    Collecting gunicorn
    Using cached gunicorn-20.1.0-py3-none-any.whl (79 kB)
    Requirement already satisfied: setuptools>=3.0 in c:\users\user\desktop\myproject\env\lib\site-packages (from gunicorn) (57.0.0)
    Installing collected packages: gunicorn
    Successfully installed gunicorn-20.1.0
```
Now create a `ProcFile` with no extension in the root directory.

```bash
$ ls
    account  manage.py  requirements.txt  studentprofile  students  templates
$ touch ProcFile
$ ls
    account  manage.py  ProcFile  requirements.txt  studentprofile  students  templates
```

Inside the `ProcFile` add this. What this done is to allow HTTP traffic and to tell Heroku that this is a web dyno. 
```
    web: gunicorn studentprofile.wsgi --log-file -
```
2. whitenoise
    Heroku serves your staticfiles for your project automatically through this dependency. So we have to install it and add its middleware to `settings.py`.

```bash
$ pip install whitenoise
    Collecting whitenoise
    Downloading whitenoise-5.3.0-py2.py3-none-any.whl (19 kB)
    Installing collected packages: whitenoise
    Successfully installed whitenoise-5.3.0
```

Add this to `settings.py` for Django to serve it. Just below the `SecurityMiddleware` like this.
```
    MIDDLEWARE = [
        'django.middleware.security.SecurityMiddleware',
        'whitenoise.middleware.WhiteNoiseMiddleware',
        'django.contrib.sessions.middleware.SessionMiddleware',
        'django.middleware.common.CommonMiddleware',
        'django.middleware.csrf.CsrfViewMiddleware',
        'django.contrib.auth.middleware.AuthenticationMiddleware',
        'django.contrib.messages.middleware.MessageMiddleware',
        'django.middleware.clickjacking.XFrameOptionsMiddleware',
    ]
```

3. runtime.txt
    This file tells Heroku what type and version of programming language is the project built on. So let us add that to the root level.

Note: `python-3.8.6` might not be your version, do change that to your own.

```bash
$ touch runtime.txt
    account  manage.py  ProcFile  requirements.txt  runtime.txt  studentprofile  students  templates
$ echo python-3.8.6 > runtime.txt
```

4. dj-database-url
    Since we are using a custom database, then we need a way to talk to the Heroku database for the project. And the dependency that does that for us `dj-database-url` which we have to install and add it to the `settings.py`.

```bash
$ pip install dj-database-url
    Collecting dj-database-url
    Using cached dj_database_url-0.5.0-py2.py3-none-any.whl (5.5 kB)
    Installing collected packages: dj-database-url
    Successfully installed dj-database-url-0.5.0
```
Then add this to your `settings.py`
```
    import dj_database_url
    db_from_env = dj_database_url.config(conn_max_age=500)
    DATABASES['default'].update(db_from_env)
```

Now we need to add all our dependencies recently installed to `requirements.txt` file.

```bash
$ pip freeze > requirements.txt
````
So far if you open your `requirement.txt` file, these must be present.

```
    asgiref==3.4.1
    dj-database-url==0.5.0
    Django==3.2.6
    gunicorn==20.1.0
    psycopg2==2.9.1
    pytz==2021.1
    sqlparse==0.4.1
    whitenoise==5.3.0
```
I commend your effort. Well-done!!

As a good developer, all secret keys generated for every project is inside `settings.py` and this must be always hided. So we will need to make `.env` file and store our keys there. For this reason,  a couple of files and installations shall be done.

```bash
$ ls
    account  manage.py  ProcFile  requirements.txt  runtime.txt  studentprofile  students  templates
$ touch .env
$ touch .gitignore
$ pip install python-dotenv
    Collecting python-dotenv
    Using cached python_dotenv-0.19.0-py2.py3-none-any.whl (17 kB)
    Installing collected packages: python-dotenv
    Successfully installed python-dotenv-0.19.0
$ pip freeze > requirements.txt
```
Inside the `.env` file add this below. And that ??? means the secret keys inside your `settings.py` for the project and then save the file.

```
    SECRET_KEY = ???

    export YOUR_SECRET_KEY = ${SECRET_KEY}
```

Now go into the `settings.py` and connect the `.env` file with the project by adding this below.

```
    from dotenv import load_dotenv
    load_dotenv()

    SECRET_KEY = os.getenv("YOUR_SECRET_KEY")
```
The very next thing on the list is to set