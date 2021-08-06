
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

Yes! We made it together. We are 75% done with the project, now let us move on to the next on the list.

Django as a backend framework requires some few dependencies for it to be live and accessible over the internet, so that clients can access it. Here are the lists of them:

1. gunicorn
    This `gunicorn` allows the Django project to be accessible via HTTP protocol. And this will be configured inside a file named `Procfile`. For that let us install `gunicorn`.

```bash
$ pip install gunicorn
    Collecting gunicorn
    Using cached gunicorn-20.1.0-py3-none-any.whl (79 kB)
    Requirement already satisfied: setuptools>=3.0 in c:\users\user\desktop\myproject\env\lib\site-packages (from gunicorn) (57.0.0)
    Installing collected packages: gunicorn
    Successfully installed gunicorn-20.1.0
```
Now create a `Procfile` with no extension in the root directory.

```bash
$ ls
    account  manage.py  requirements.txt  studentprofile  students  templates
$ touch Procfile
$ ls
    account  manage.py  Procfile  requirements.txt  studentprofile  students  templates
```

Inside the `Procfile` do add this. This is to allow HTTP traffic and tell Heroku that this is a web dyno. 
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

5. django-heroku
    This package configures Django project for Heroku automatically. It has to be installed too into the dependedcies.
```bash
$ pip install django_heroku
    Collecting django-heroku
    Using cached django_heroku-0.3.1-py2.py3-none-any.whl (6.2 kB)
    Requirement already satisfied: psycopg2 in c:\users\user\desktop\myproject\env\lib\site-packages (from django-heroku) (2.9.1)
    Requirement already satisfied: django in c:\users\user\desktop\myproject\env\lib\site-packages (from django-heroku) (3.2.6)
    Requirement already satisfied: whitenoise in c:\users\user\desktop\myproject\env\lib\site-packages (from django-heroku) (5.3.0)
    Requirement already satisfied: dj-database-url>=0.5.0 in c:\users\user\desktop\myproject\env\lib\site-packages (from
    django-heroku) (0.5.0)
    Requirement already satisfied: sqlparse>=0.2.2 in c:\users\user\desktop\myproject\env\lib\site-packages (from django->django-heroku) (0.4.1)
    Requirement already satisfied: pytz in c:\users\user\desktop\myproject\env\lib\site-packages (from django->django-heroku) (2021.1)
    Requirement already satisfied: asgiref<4,>=3.3.2 in c:\users\user\desktop\myproject\env\lib\site-packages (from django->django-heroku) (3.4.1)
    Installing collected packages: django-heroku
    Successfully installed django-heroku-0.3.1
```

Having done that, we need to add this at the bottom of the `settings.py` file and ensure that you save. Note that all `import` keyword must be at the top of the file by convention.

```
    import django_heroku
    django_heroku.settings(locals())
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
    django-heroku==0.3.1
    gunicorn==20.1.0
    psycopg2==2.9.1
    python-dotenv==0.19.0
    pytz==2021.1
    sqlparse==0.4.1
    whitenoise==5.3.0

```
I commend your effort. Well-done!!

As a good developer, all secret keys generated for every project is inside `settings.py` and this must be always hiden. So we will need to make `.env` file and store our keys there. For this reason,  a couple of files and installations shall be done.

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
Inside the `.env` file add this below.

```
    YOUR_SECRET_KEY = <your secret key here>
    DEBUG = False
    export YOUR_DEBUG = ${DEBUG}
    export SECRET_KEY = ${YOUR_SECRET_KEY}
```

Now go into the `settings.py` and connect the `.env` file with the project by adding this below.

```
    from dotenv import load_dotenv
    load_dotenv()

    SECRET_KEY = os.getenv("YOUR_SECRET_KEY", <your secret key here>)
```

So navigate to [django gitginore](/https://www.toptal.com/developers/gitignore/api/django) and copy out all the gitgnores then go ahead and paste them into your `.gitignore` file created.


The project is not in track with git yet. We have to initialize it, add all files and then commit them to git locally. Open your terminal or bash and let us do justice to this.

```bash
$ ls 
    account  manage.py  Procfile  requirements.txt  runtime.txt  studentprofile  students  templates
$ git init
    Initialized empty Git repository in C:/Users/user/Desktop/myproject/studentprofile/.git/
$ git status
    On branch master

    No commits yet

    Untracked files:
    (use "git add <file>..." to include in what will be committed)
            .gitignore
            Procile
            account/
            manage.py
            requirements.txt
            runtime.txt
            studentprofile/
            students/
            templates/

    nothing added to commit but untracked files present (use "git add" to track)
$ git add .
$ git commit -m"Initial commit"
    [master (root-commit) 79f502a] initial commit
    31 files changed, 555 insertions(+)
    create mode 100644 .gitignore
    create mode 100644 ProcFile
    create mode 100644 account/__init__.py
    create mode 100644 account/admin.py
    create mode 100644 account/apps.py
    create mode 100644 account/forms.py
    create mode 100644 account/migrations/0001_initial.py
    create mode 100644 account/migrations/__init__.py
    create mode 100644 account/models.py
    create mode 100644 account/tests.py
    create mode 100644 account/urls.py
    create mode 100644 account/views.py
    create mode 100644 manage.py
    create mode 100644 requirements.txt
    create mode 100644 runtime.txt
    create mode 100644 studentprofile/__init__.py
    create mode 100644 studentprofile/asgi.py
    create mode 100644 studentprofile/settings.py
    create mode 100644 studentprofile/urls.py
    create mode 100644 studentprofile/wsgi.py
    create mode 100644 students/__init__.py
    create mode 100644 students/admin.py
    create mode 100644 students/apps.py
    create mode 100644 students/migrations/__init__.py
    create mode 100644 students/models.py
    create mode 100644 students/tests.py
    create mode 100644 students/urls.py
    create mode 100644 students/views.py
    create mode 100644 templates/account/form.html
    create mode 100644 templates/students/base.html
    create mode 100644 templates/students/index.html
```

Great!! With this we have initialized and commited the whole project to git repository locally on our machine. To track it with git remote using `github`, go to [Github](/https://github.com/) and sign up if you do not have account. But if you do have, then go ahead and make new repository for the project.

We need to connect the project with the remote repository created. So for that let us do some git permutations in the bash or terminal as your choice.

```bash
$ ls
    account  manage.py  Procfile  requirements.txt  runtime.txt  studentprofile  students  templates
$ git remote add origin YOUR_REPOSITORY_FROM_GITHUB
$ git push -U origin master
    Enumerating objects: 36, done.
    Counting objects: 100% (36/36), done.
    Delta compression using up to 4 threads
    Compressing objects: 100% (31/31), done.
    Writing objects: 100% (36/36), 8.04 KiB | 514.00 KiB/s, done.
    Total 36 (delta 2), reused 0 (delta 0), pack-reused 0
    remote: Resolving deltas: 100% (2/2), done.
    To github.com:Horlawhumy-dev/studentprofileapp.git
    * [new branch]      master -> master
    Branch 'master' set up to track remote branch 'master' from 'origin'.
```

On successful `git push` like above, you shoule see soemthing like the image below.


### Heroku Account Set Up
To use Heroku free tier plan, an account must be created first. So follow the steps on [Heroku SignUp](/https://id.heroku.com/login) and sign up.

Now we are set for deployment into Heroku server. Please make sure to follow this steps below very well, because a slight mistake could cause your not to be properly deployed and cannot be accessed. I wish you the best!!

Open your bash and follow up.

1. heroku login
    Your editor must be connected to Heroku and log into the account created earlier.

```bash
$ heroku login
     »   Warning: heroku update available from 7.47.3 to 7.56.1.
    heroku: Press any key to open up the browser to login or q to exit:
    Opening browser to https://cli-auth.heroku.com/auth/cli/browser/37acdb3e-bea6-4b12-8662-ae0136247969?requestor=SFMyNTY.g2gDbQAAAA4xMDUuMTEyLjI5LjE2Nm4GAJBOQBl7AWIAAVGA.QBKX6P4I0X1XZTdjh5TZwMuKvlpIcm4RfaEzoWPEzLk
    Logging in... done
    Logged in as {YOUR_EMAIL}
$ heroku create
    »   Warning: heroku update available from 7.47.3 to 7.56.1.
    Creating app... done, ⬢ nameless-wildwood-10532
    https://nameless-wildwood-10532.herokuapp.com/ | https://git.heroku.com/nameless-wildwood-10532.git

$ heroku config:set DISABLE_COLLECTSTATIC=1 

$ git push heroku master
     »   Warning: heroku update available from 7.47.3 to 7.56.1.
    Setting DISABLE_COLLECTSTATIC and restarting ⬢ nameless-wildwood-10532... done, v3
    DISABLE_COLLECTSTATIC: 1

    (env) C:\Users\user\Desktop\myproject\studentprofile>git push heroku master

    (env) C:\Users\user\Desktop\myproject\studentprofile>git push heroku master
    Enumerating objects: 41, done.
    Counting objects: 100% (41/41), done.
    Delta compression using up to 4 threads
    Compressing objects: 100% (36/36), done.
    Writing objects: 100% (41/41), 8.39 KiB | 358.00 KiB/s, done.
    Total 41 (delta 6), reused 0 (delta 0), pack-reused 0
    remote: Compressing source files... done.
    remote: Building source:
    remote:
    remote: -----> Building on the Heroku-20 stack
    remote: -----> Determining which buildpack to use for this app
    remote: -----> Python app detected
    remote: -----> Using Python version specified in runtime.txt
    remote:  !     Python has released a security update! Please consider upgrading to python-3.8.11
    remote:        Learn More: https://devcenter.heroku.com/articles/python-runtimes
    remote: -----> Installing python-3.8.6
    remote: -----> Installing pip 20.2.4, setuptools 47.1.1 and wheel 0.36.2
    remote: -----> Installing SQLite3
    remote: -----> Installing requirements with pip
    remote:        Collecting asgiref==3.4.1
    remote:          Downloading asgiref-3.4.1-py3-none-any.whl (25 kB)
    remote:        Collecting dj-database-url==0.5.0
    remote:          Downloading dj_database_url-0.5.0-py2.py3-none-any.whl (5.5 kB)
    remote:        Collecting Django==3.2.6
    remote:          Downloading Django-3.2.6-py3-none-any.whl (7.9 MB)
    remote:        Collecting django-heroku==0.3.1
    remote:          Downloading django_heroku-0.3.1-py2.py3-none-any.whl (6.2 kB)
    remote:        Collecting gunicorn==20.1.0
    remote:          Downloading gunicorn-20.1.0-py3-none-any.whl (79 kB)
    remote:        Collecting psycopg2==2.9.1
    remote:          Downloading psycopg2-2.9.1.tar.gz (379 kB)
    remote:        Collecting python-dotenv==0.19.0
    remote:          Downloading python_dotenv-0.19.0-py2.py3-none-any.whl (17 kB)
    remote:        Collecting pytz==2021.1
    remote:          Downloading pytz-2021.1-py2.py3-none-any.whl (510 kB)
    remote:        Collecting sqlparse==0.4.1
    remote:          Downloading sqlparse-0.4.1-py3-none-any.whl (42 kB)
    remote:        Collecting whitenoise==5.3.0
    remote:          Downloading whitenoise-5.3.0-py2.py3-none-any.whl (19 kB)
    remote:        Building wheels for collected packages: psycopg2
    remote:          Building wheel for psycopg2 (setup.py): started
    remote:          Building wheel for psycopg2 (setup.py): finished with status 'done'
    remote:          Created wheel for psycopg2: filename=psycopg2-2.9.1-cp38-cp38-linux_x86_64.whl size=579458 sha256=743eec008801f7305c409c0634747a25b5150def2de34f2f44a4bc6707630458
    remote:          Stored in directory: /tmp/pip-ephem-wheel-cache-b1pkfpw1/wheels/65/eb/f9/74b53754e764a113930b709eb319a3bd5b681889b5ffbf1aab
    remote:        Successfully built psycopg2
    remote:        Installing collected packages: asgiref, dj-database-url, sqlparse, pytz, Django, whitenoise, psycopg2, django-heroku, gunicorn, python-dotenv
    remote:        Successfully installed Django-3.2.6 asgiref-3.4.1 dj-database-url-0.5.0 django-heroku-0.3.1 gunicorn-20.1.0 psycopg2-2.9.1 python-dotenv-0.19.0 pytz-2021.1 sqlparse-0.4.1 whitenoise-5.3.0
    remote: -----> Skipping Django collectstatic since the env var DISABLE_COLLECTSTATIC is set.
    remote: -----> Discovering process types
    remote:        Procfile declares types -> (none)
    remote:
    remote: -----> Compressing...
    remote:        Done: 57.5M
    remote: -----> Launching...
    remote:        Released v6
    remote:        https://nameless-wildwood-10532.herokuapp.com/ deployed to Heroku
    remote:
    remote:  !
    remote:  ! ## Warning - The same version of this code has already been built: 4231bed480287e5ae75399a71ae69ddb915f2ed9
    remote:  !
    remote:  ! We have detected that you have triggered a build from source code with version 4231bed480287e5ae75399a71ae69ddb915f2ed9
    remote:  ! at least twice. One common cause of this behavior is attempting to deploy code from a different branch.
    remote:  !
    remote:  ! If you are developing on a branch and deploying via git you must run:
    remote:  !
    remote:  !     git push heroku <branchname>:main
    remote:  !
    remote:  ! This article goes into details on the behavior:
    remote:  !   https://devcenter.heroku.com/articles/duplicate-build-version
    remote:
    remote: Verifying deploy... done.
    To https://git.heroku.com/nameless-wildwood-10532.git
    * [new branch]      master -> master
```

Fantastic!! Our app is live on heroku server by now. But inaccessible due to the database configuration that needs to be done. 

```bash
$ heroku run python manage.py migrate
     »   Warning: heroku update available from 7.47.3 to 7.56.1.
    Running python manage.py migrate on ⬢ nameless-wildwood-10532... up, run.3237 (Free)
    Operations to perform:
    Apply all migrations: account, admin, auth, contenttypes, sessions
    Running migrations:
    Applying account.0001_initial... OK
    Applying contenttypes.0001_initial... OK
    Applying auth.0001_initial... OK
    Applying admin.0001_initial... OK
    Applying admin.0002_logentry_remove_auto_add... OK
    Applying admin.0003_logentry_add_action_flag_choices... OK
    Applying contenttypes.0002_remove_content_type_name... OK
    Applying auth.0002_alter_permission_name_max_length... OK
    Applying auth.0003_alter_user_email_max_length... OK
    Applying auth.0004_alter_user_username_opts... OK
    Applying auth.0005_alter_user_last_login_null... OK
    Applying auth.0006_require_contenttypes_0002... OK
    Applying auth.0007_alter_validators_add_error_messages... OK
    Applying auth.0008_alter_user_username_max_length... OK
    Applying auth.0009_alter_user_last_name_max_length... OK
    Applying auth.0010_alter_group_name_max_length... OK
    Applying auth.0011_update_proxy_permissions... OK
    Applying auth.0012_alter_user_first_name_max_length... OK
    Applying sessions.0001_initial... OK
$ heroku run ptyhon manage.py createsuperuser
    »   Warning: heroku update available from 7.47.3 to 7.56.1.
    Running python manage.py createsuperuser on ⬢ nameless-wildwood-10532... up, run.5798 (Free)
    Username (leave blank to use 'u33910'): <your own username>
    Email address: <your email>
    Password:
    Password (again):
    The password is too similar to the username.
    This password is too short. It must contain at least 8 characters.
    This password is too common.
    Bypass password validation and create user anyway? [y/N]: y
    Superuser created successfully.
$ heroku config:set SECRET_KEY="<your secret key>"
     »   Warning: heroku update available from 7.47.3 to 7.56.1.
    Setting SECRET_KEY and restarting ⬢ nameless-wildwood-10532... done, v9
    SECRET_KEY: django-insecure-4448=<secret key>
$ heroku config:set YOUR_DEBUG="False"
     »   Warning: heroku update available from 7.47.3 to 7.56.1.
    Setting YOUR_DEBUG and restarting ⬢ nameless-wildwood-10532... done, v10
    YOUR_DEBUG: False
```