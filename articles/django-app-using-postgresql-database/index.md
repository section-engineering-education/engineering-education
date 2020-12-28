# Creating a Django Hello World App Using PostgreSQL Database
> Django is a high-level Python Web framework that encourages rapid development and clean, pragmatic design. Built by experienced developers, it takes care of much of the hassle of Web development, so you can focus on writing your app without needing to reinvent the wheel. It’s free and open source.
> <cite>[https://www.djangoproject.com]<cite>

> PostgreSQL is a powerful, open-source object-relational database system that uses and extends the SQL language combined with many features that safely store and scale the most complicated data workloads.

### Prerequisites
To follow this tutorial you need to have
 - [Python3](https://www.python.org/downloads/)
 - [PostgreSQL](https://www.postgresql.org/download/windows/)
 - [virtualenv](https://pypi.org/project/virtualenv/)

### Step 1 - Create a database and database user we will be creating our database through the command line.
 ![access psql](/engineering-education/django-app-using-postgresql-database/access_psql.jpg)

Click on the box area
Click on Enter to accept a default value. input the password that you provide during PostgresSQL installation.

```bash 
 CREATE DATABASE helloworld;
 CREATE USER <yourname> WITH PASSWORD '<password>';
```
Modifying few connections parameters for new database user. 
```bash 
ALTER ROLE <yourname> SET client_encoding TO 'utf8';
ALTER ROLE <yourname> SET default_transaction_isolation TO 'read committed';
ALTER ROLE <yourname> SET timezone TO 'UTC';
```
Next, we have to grant our new user access to the database we created earlier.
```bash 
 GRANT ALL PRIVILEGES ON DATABASE helloworld TO <yourname>;
```

### Step - 2 creating a virtual environment using and installing necessary python package

we will start by creating a folder for our project
```bash 
 mkdir myproject 
 cd myproject
```
creating a virtual environment and activate it.
```bash 
virtualenv env
source venv/bin/activate
```
 installing django and psycopg2
 ```bash
 pip install django psycopg2
 ```
  - psycopg2 is a popular PostgreSQL database adapter for python programming language.
  
creating our Hello World Django project
```bash
 django-admin startproject django_app
```
change your current directory into our Django project django_app
```bash
cd hello_world
```
creating a app in our django_app project
```bash 
django-admin startapp hello_world
```
We need to plug our hello_world app to our django_app to do this navigate to
django_app/settings.py

```python 
...
INSTALLED_APPS = [
    ...
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'hello_world',
]
```

### Step 3 - set up your project to use PostgreSQL Database 
navigate to django_app/settings.py
go to the DATABASE SECTION 
```python 
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
    }
}
```
change the above code to this

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
we changed the backend engine to use postgresql_psycopg2 instead of the default sqlite3.
Where- NAME is the name of the database we created for our project,
     - USER is the database user we created during the database creation,
     - PASSWORD is the password to the database we created,

Now let make sure our django project is working without errors.
 
```python
python manage.py makemigrations
python manage.py migrate
```
after running the above commands you will get something like this in your CLI
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
To verify our django app is working run this command: 
```bash
python manage.py runserver
```
after running the above commands proceed to visit 127.0.0.1:8000
if your app runs without errors you should get the below picture. 
![Django Homepage](/engineering-education/django-app-using-postgresql-database/django_webpage.jpg)
Congratulations you configured Django to use a PostgresSQL.

### Hello World in Django.

First let create a templates folder in our django_app/templates directory and create a index.html file. Your project directory should look like this.
```
--django_app
| ---django_app
| ---hello_world
| ---templates
|     --- index.html
| ---manage.py

```
Let configure our app to make use of the templates folder. Head over to django_app/settings.py the TEMPLATES section.
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
To make sure our django templates is now working let go me work you through this short steps

* In **hello_world/views.py**
  
  ```python 
  from django.shortcuts import render
  
  def homepage(request):
    return render(request, 'index.html', context={})
  ```


* In **django_app/urls.py**
    ```python 
    from django.contrib import admin
    from django.urls import path, include #import include
    
    urlpatterns = [
        path('admin/', admin.site.urls),
        path("", include("hello_world.urls")),
    ]
    ```


* create a new python file in your app folder. 
**hello_world/urls.py**
    ```python 
    from django.urls import path
    from django.urls import path 
    from . import views
    urlpatterns = [
        path("", views.homepage, name="home"),
    ]
    ```

visit **127.0.0.1:8000** in your browser. you can see 

# Hello World

Congratulation you have created a Hello World App in Django.


### References

1. [Django](https://www.djangoproject.com)
2. [PostgreSQL](https://www.postgresql.org/about/)