### Creating a Django Hello World App Using PostgreSQL Database
> Django is a high-level Python Web framework that encourages rapid development and clean, pragmatic design. Built by experienced developers, it takes care of much of the hassle of Web development, so you can focus on writing your app without needing to reinvent the wheel. It’s free and open-source <cite>[Django](https://www.djangoproject.com)<cite>

> PostgreSQL is a powerful, open-source object-relational database system that uses and extends the SQL language combined with many features that safely store and scale the most complicated data workloads. <cite>[PostgreSQL](https://www.postgresql.org/about/)<cite>

### Prerequisites
To follow this tutorial you need to have
 - [Python3](https://www.python.org/downloads/)
 - [PostgreSQL](https://www.postgresql.org/download/windows/)
 - [virtualenv](https://pypi.org/project/virtualenv/)

### Step 1 - we will be creating our database through the command line
 ![access psql](/engineering-education/django-app-using-postgresql-database/access_psql.png)

Open the PostgreSQL shell shown in the above image, you can find the PSQL Shell in the Start Menu

![psql_shell](/engineering-education/django-app-using-postgresql-database/psql_shell.png)

Leave the **Server, Database, Port, Username** options empty, by clicking on the Enter keyboard you have accepted the default value provided by Shell. Provide the **Password** input with the Password you used during the PostgreSQL Installation on your machine. You will see a similar result in your PSQL shell like the one the above image if correctly implemented.

Click on Enter to accept a default value. input the password that you provide during PostgresSQL installation.

```bash 
 CREATE DATABASE helloworld;
 CREATE USER <yourname> WITH PASSWORD '<password>';
```
Modifying a few connections parameters for the new database user. 
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

Let's start by creating a folder for our project
```bash 

 mkdir myproject 
 cd myproject
```
Let's create a virtual environment and activate it.

A virtual environment helps create an isolated python environment which will contain all that packages that our Django project will need. By activating our virtual environment, any Python packages installed will only be available to our Django project alone.
```bash 
virtualenv env
source venv/bin/activate
```

 Installing django and psycopg2
 ```bash
 pip install django psycopg2
 ```
 psycopg2 is a popular PostgreSQL database adapter for python programming language.
  
Let's create our Hello World Django project
```bash
 django-admin startproject django_app
```

Change your current directory into our Django project django_app

```bash
cd hello_world
```
Let's create an app in our django_app project
> A Django application is a Python package that is specifically intended for use in a Django project. Django apps are reusable in different Django project. [Django](https://docs.djangoproject.com/en/3.1/ref/applications/)
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
Navigate to django_app/settings.py, in the DATABASE SECTION you see the  code snippets below
```python 
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
    }
}
```
Change the code snippets above to this

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
We changed the backend engine to use postgresql_psycopg2 instead of the default sqlite3.
Where- NAME is the name of the database we created for our project,
     - USER is the database user we created during the database creation,
     - PASSWORD is the password to the database we created,

Now let's make sure our Django project is working without error 
```bash
python manage.py runserver
```
After running the above commands proceed to visit 127.0.0.1:8000
If your Django project runs without errors you should get the below picture. 
![Django Homepage](/engineering-education/django-app-using-postgresql-database/django_webpage.jpg)
Congratulations you configured Django to use a PostgresSQL.

### Hello World In Django.

First, let create a templates folder in our django_app/templates directory and create an index.html file. Your project directory should look like this.
```
--django_app
| ---django_app
| ---hello_world
| ---templates
|     --- index.html
| ---manage.py

```

The Templates folder is the display layer which handles User Interface of our Django project. 

Let's configure our app to make use of the templates folder. Head over to **django_app/settings.py** the TEMPLATES section. Django web framework comes with is own built-in template engine called the Django template language. For more information on [Django template langauage](https://docs.djangoproject.com/en/3.1/topics/templates/).
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

To make sure our Django template is now working let's walk through these short steps

* In **hello_world/views.py**
  
  ```python 

  from django.shortcuts import render
  
  def homepage(request):
    return render(request, 'index.html', context={})
  ```

The above code render our **index.html** file to our server by mapping our url path to the ``` homepage() function```.

In **django_app/urls.py**
```python 
from django.contrib import admin
from django.urls import path, include #import include

urlpatterns = [
    path('admin/', admin.site.urls),
    path("", include("hello_world.urls")), 
]
```
Let's create a new python file in your app folder, **hello_world/urls.py**.

```python 

from django.urls import path
from . import views  #importing our view file 

urlpatterns = [
    path("", views.homepage, name="home"), #mapping the homepage function
]
```
The above code in our **urls.py** file maps ```homepage()``` in the **views.py** to **127.0.0.1:8000/**.
For more information on visit [views and urls in Django](https://djangobook.com/mdj2-django-views/).

Let's navigate to the index.html in our templates folder **temaplates/index.html**

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
Visit **127.0.0.1:8000** in your browser. you can see 

# Hello World

Congratulation you have created a Hello World App in Django.


### References

1. [Django](https://www.djangoproject.com)
2. [PostgreSQL](https://www.postgresql.org/about/)
3. [views and urls in Django](https://djangobook.com/mdj2-django-views/) 