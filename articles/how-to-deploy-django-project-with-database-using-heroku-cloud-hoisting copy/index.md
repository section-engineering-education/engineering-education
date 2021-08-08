![hero](/how-to-deploy-django-project-with-database-using-heroku-cloud-hoisting/django-heroku.png)

### Introduction 

Welcome folks! I am Arafat Olayiwola, a software developer, technical writer. In this tutorial I will be walking you through steps of deploying Django application on Heroku server using database by building a `studentprofile` application. Heroku is one of the cloud providers out there that allows developers to hoist their application on their server, and helps by monitoring, managing the health checks of the server. 

To deploy Django application on Heroku server, some dependencies are needed to set up and we shall do justice to that in this article. Feel free to brush up concepts of Django that require mastering in one of my articles [Core Concepts of Django to master.](/https://section.io/engineering-education/core-concepts-of-django-to-learn/), though it is not a prequisite for this

#### Prequisites
1. Latest version of Python is required. So head on to `Python Docs` and download if you are not having it locally.
[Python Websites](/https://www.python.org/downloads/)

2. Latest Version of PostgreSQL database is needed. Download here.
[Download Postgres](/https://www.postgresql.org/download/)

3. Download workbench of postgreSQL here too. 
[Download Workbench](/https://www.pgadmin.org/download/)

4. Download git bash too. 
[Git Bash](/https://git-scm.com/download/win)


#### Key take aways
1. How to setup Django project with requirement dependencies.
2. Developing an application for the article and setting up database.
2. How to setup account and login with Heroku.
3. How to push up project to git so that Heroku account created can access it.
4. How to hoist your project and get domain name with extension of herokuapp.com.


### Setting Up Django Project
Like I said earlier, we are developing students profile application that would have features like name, email, phone and delete button on each table row. So, Let's get started by setting up our Django project.

I will be using bash as CLI. Feel free to use your terminal if you do not have that. We need to set up virtual enviroment as dependency for django project. But before that, navigate to where your project will stay in your local computer.

Open your bash CLI and type.

```bash
$ cd Desktop
$ mkdir myproject
$ cd myproject
```

Now our project stays inside Desktop folder and we are inside `myproject` folder.

Let us make virtual enviroment and make the project.

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
$ pip install -r requirements.txt
$ code .
```

What `code .` command does is to open your current directory in any editor you use. Every brand new Django project comes with default page. So to reference that, type `python manage.py runserver` in bash and click on the `http://127.0.0.1:8000/` to open it in browser.

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

### Developing Project and Setting PostgreSQL database
In this project, we need two main apps `students` and `account`. We will serve our application index page from `students` app while `account` app is for form where profiles can be entered.
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
But before that Django required  dependecy called `psycopg2` to talk to postgresql. So let us install it.
```bash
$ pip install psycopg2
$ pip freeze > requirements.txt
```
Note: Always use this command `pip freeze > requirements.txt` whenever you install new dependency. That will help to add all installations to our `env` enviroment.
Now go inside the workbench downloaded and create database named `StudentsProfile`. Having done, that we need to conect our project to the database created.
Inside `settings.py` change the `DATABASES` option to something like this.
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
Let us migrate the default models to the new database connected with.
```bash
$ python manage.py makemigrations
$ python manage.py migrate
    Operations to perform:
    Apply all migrations: admin, auth, contenttypes, sessions
    Running migrations:
    No migrations to apply.
```
If you open your postgres workbench and navigate to the database created, you will confirm all the django default models migrated. 
Next thing is to set-up our models for the `account` app. Open the `models.py` inside the `account` app and make your model with the students profile features we need.
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
Now we need to `makemigrations` to generate migration file. After that we migrate the file genrated to the database.
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
The next thing is to set up our admin backend. Remember every Django project comes in handy with already configured `admin`, so we just make use of that. Open the the `admin.py` inside the `account` app and subscribe the `model`.
```
    from django.contrib import admin
    from .models import StudentAccount
    admin.site.register(StudentAccount)
````
What we have to do before it can work is to register an an admin account. Provide a username, email and password that you can remember.
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
Great! You have just made an admin backend for your project. Only you as an admin can read, write, modify and delete data inside. Now let us `runserver` and access admin configured.
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

![admin](/how-to-deploy-django-project-with-database-using-heroku-cloud-hoisting/admin.png)

Wow! What is next? Yes, you guessed right. We need to make our form page, so that students profiles can be added to database from our UI.
We can make use of the `models` properties as form fields. How right? No worries.
Now create `forms.py` to your `account` app. And then do the logic as below.
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
Now let us make `urls` for the routing. Create `urls.py` inside the `account` app and configure it as below.
```
    from django.urls import path
    from . import views
    app_name = 'account'
    urlpatterns = [
        path('form/', views.account_view, name="form"),
        path('delete/<str:pk>/', views.delete, name="delete")
    ]
```
With these that we have done so far, it is time to the connect to `students` app too. First thing to do here, is to make the routing works. As we have been doing, quickly navigate to the app and create `urls.py` file then make some route like this.
This route will serve our index page to clients.
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
Here we are just sending out all `students` in our database by querying it to the `index.html` template.
We have made it this far!! Great. It is time we make the templates for the project to render interfaces to user. You remember Django uses `Model View Template MVT` architecture and if you are surprised quickly check the link above and read about that.
What we can do is to add `templates` folder into the root level with the project that is `studentprofile` folder and ensure that it is at the same level with the other `studentprofile` folder.
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
Yes! We have made the templates. Now let us connect it to the project by going into the `settings.py` and do this below. Kindly ensure to add  comand `import os` at the top level of the `settings.py` in case it is not there.
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
Yes! We made it together. We are 75% done with the project, now let us move on to the next thing on the list.

Here are the lists of dependencies required by Heroku for deployment. Now we need to install all of these into our `requirements.txt` file. 

1. gunicorn
    This `gunicorn` allows the Django project to be accessible via HTTP protocol. And this will be configured inside a file named `Procfile`.
```bash
$ pip install gunicorn
    Collecting gunicorn
    Using cached gunicorn-20.1.0-py3-none-any.whl (79 kB)
    Requirement already satisfied: setuptools>=3.0 in c:\users\user\desktop\myproject\env\lib\site-packages (from gunicorn) (57.0.0)
    Installing collected packages: gunicorn
    Successfully installed gunicorn-20.1.0
```
Now create a `Procfile` with no extension in the root directory. And make sure it is spelt as it is here in this tutorial.
```bash
$ ls
    account  manage.py  requirements.txt  studentprofile  students  templates
$ touch Procfile
$ ls
    account  manage.py  Procfile  requirements.txt  studentprofile  students  templates
```
Inside the `Procfile` do add this. This is to allow HTTP traffic and tell Heroku that this is a web dyno. Please there should not be any unneccessary space at the back of the last dash symbol, this is because Heroku will never see your `Procfile` if such space is added.
```
    web: gunicorn studentprofile.wsgi --log-file -
```
2. whitenoise
    Heroku serves staticfiles for your project automatically through this dependency. So we have to install it and add its middleware to `settings.py`.
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
```bash
$ touch runtime.txt
$ ls
    account  manage.py  ProcFile  requirements.txt  runtime.txt  studentprofile  students  templates
```
Inside the `runtime.txt` file, write this. In my own case I used `python 3.8.6` for the project, ensure you add yours version.
```
    python-3.8.6
```
4. dj-database-url
    Since we are using a custom database, then we need a way to talk to the Heroku database for the project. And the dependency that does that for us is `dj-database-url` which we have to install and add it to the `settings.py`.
```bash
$ pip install dj-database-url
    Collecting dj-database-url
    Using cached dj_database_url-0.5.0-py2.py3-none-any.whl (5.5 kB)
    Installing collected packages: dj-database-url
    Successfully installed dj-database-url-0.5.0
```
Then add this to your `settings.py` and the `import dj_database_url` should go to the topmost level. while other commands should follow each other and be positioned right below the `settings.py` databases option.
```
    import dj_database_url
    db_from_env = dj_database_url.config(conn_max_age=500)
    DATABASES['default'].update(db_from_env)
```
5. django-heroku
    This package configures Django project for Heroku automatically and it has to be installed too.
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
Having done that, we need to add this at the bottom of the `settings.py` file and please ensure that you save the all file. 
Note that all `import` keyword must be at the top of the file by convention.
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
I commend your effort. Well-done!! As a good developer, all secret keys generated for every project is inside `settings.py` and this must be always hidden. So we will need to make `.env` file and store our keys there. For this reason,  a couple of files creation and installations shall be done too.

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
    DEBUG = os.getenv("YOUR_DEBUG")
```
So navigate to [django gitginore](/https://www.toptal.com/developers/gitignore/api/django) and copy out all the gitgnores and paste them into your `.gitignore` file created.
Before diving to Heroku deployment steps, we need to track the project with github using git. We have to initialize it, add all files and then commit them to git locally. Open your terminal or bash and let us do justice to this.

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
Great!! With this we have initialized and commited the whole project to git repository locally on our machine. To track it with git remote using `Github`, go to [Github](/https://github.com/) and sign up if you do not have account. But if you do, go ahead and make new repository for the project.
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

### Heroku Account Set Up
Why Heroku of all server providers? 
Heroku provides a free plan named `hobbydev` for the deployment of applications. Also Heroku Django deployment documentations is well written and understandable enough for developers.
To use Heroku free tier plan, an account must be created first. So follow the steps on [Heroku SignUp](/https://id.heroku.com/login) and sign up.
Now we are set for deployment into Heroku server. Please make sure to follow this steps below very well, because a slight mistake could cause your app not to be properly deployed and cannot be accessed. I wish you the best!!
Open your bash and follow up.
1. heroku login
    Your editor must be connected to Heroku and log into the account created earlier while you are still deploying.
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
     Enumerating objects: 5, done.
    Compressing objects: 100% (2/2), done.
    Writing objects: 100% (3/3), 309 bytes | 309.00 KiB/s, done.
    Total 3 (delta 1), reused 0 (delta 0), pack-reused 0
    remote: Compressing source files... done.
    remote: Building source:
    remote:
    remote: -----> Building on the Heroku-20 stack
    remote: -----> Using buildpack: heroku/python
    remote: -----> Python app detected
    remote: -----> Using Python version specified in runtime.txt
    remote:  !     Python has released a security update! Please consider
    upgrading to python-3.8.11
    remote:        Learn More: https://devcenter.heroku.com/articles/pytho
    n-runtimes
    remote: -----> No change in requirements detected, installing from cac
    he
    remote: -----> Using cached install of python-3.8.6
    remote: -----> Installing pip 20.2.4, setuptools 47.1.1 and wheel 0.36
    .2
    remote: -----> Installing SQLite3
    remote: -----> Installing requirements with pip
    remote: -----> Skipping Django collectstatic since the env var DISABLE
    _COLLECTSTATIC is set.
    remote: -----> Discovering process types
    remote:        Procfile declares types -> web
    remote:
    remote: -----> Compressing...
    remote:        Done: 59.3M
    remote: -----> Launching...
    remote:        Released v17
    remote:        https://nameless-wildwood-10532.herokuapp.com/ deployed
    to Heroku
    remote:
    remote: Verifying deploy... done.
    To https://git.heroku.com/nameless-wildwood-10532.git
    761f43c..55dfe8c  master -> master
```
On error with `Procfile` created, your app will never be configured. Here are the potential solutions:
1. Always watch out for any error from the command `git push heroku master` as above.
2. Ensure that you actually confirm the below commands while pushing to Heroku master.
```
    remote: -----> Discovering process types
    remote:        Procfile declares types -> web
```
If you don't see such or it is saying `remote: Procfile declares types -> <none>`, kindly delete your `Procfile` and re-create it with proper configurations as described above in this tutorial.
Note that this url `https://nameless-wildwood-10532.herokuapp.com/` is your domain for the application. 
Fantastic!! Our app is live on Heroku server by now. But it is inaccessible due to the database configuration that needs to be done. 
So we need to configure the database with the production database to be provided by Heroku. Now follow the commands below.
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
With this the database is provisioned and ready. Now open `settings.py` and change your `ALLOWED_HOSTS` to something like below. Doing this will allow all hosts to access your application globally.
```
    ALLOWED_HOSTS = ['*']
```
Note that every bit of changes must  be pushed to remote repository. So we have to track the changes made with git and push it on to heroku master.
```bash
$ 
$ git add .
$ git commit -m"allowed hosts"
$ git push
$ heroku run python manage.py collectstatic
$ git push heroku master
$ heroku open
```
With the command `heroku open`, your application will open in browser.

Congratulations!!! We have come to the end of the tutorial and by now your application is accessible via internet.
You can access my own deployment of this tutorial on [studentprofileapp](/https://nameless-wildwood-10532.herokuapp.com/).

Your application admin can be accessed on [studentprofileappadmin](/https://nameless-wildwood-10532.herokuapp.com/admin).

For more updates and vast reading on this, kindly reference the docs [Getting Started on Heroku with Python](/https://devcenter.heroku.com/articles/getting-started-with-python?singlepage=true) and on MDN website too [Django Tutorial Part 11: Deploying Django to production](/https://developer.mozilla.org/en-US/docs/Learn/Server-side/Django/Deployment).

Do follow me on LinkedIn [Arafat O. Olayiwola](/https://www.linkedin.com/in/arafat-o-olayiwola-b52087191/).

Thanks and Happy coding Folks!!!