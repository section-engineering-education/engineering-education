---
layout: engineering-education
status: publish
published: true
url: /core-concepts-of-django-to-learn/
title: Core Concepts to Learn while using Django
description: In this article we will cover a number of concepts to be mastered whether you are just starting out learning the framework or have some experience with it.
author: arafat-olayiwola
date: 2021-07-12T00:00:00-17:40
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/core-concepts-of-django-to-learn/hero.png
    alt: Core concepts to learn when using Django
---
In todays discussion, I will introduce you to this great Python backend framework known as Django. In the web application development world, there are different server side languages and frameworks of which Django is one.
<!--more-->
To be clear, Django is just a framework built on top of a well-known programming language called Python few years back. Join me in this journey of my favorite backend framework to explore more.

Django uses a Python package called pip and this comes in handy with Python installed. Django is used to configure the server side of web applications as used by Shopify, Google, Pinterest, Instagram, etc.

Surprised!! Yes, companies such as those mentioned use Django for their backend operations.

The Django web framework allows developers to connect the server side by actually making ties with the user interface of applications through the use of its concepts.

This article will cover several concepts to be mastered whether you are just starting out learning the framework or have some experience with it.

### Key take aways
By the end of this article, readers would have knowledge about the following topics:
1. Django Projects Structure
2. How url routing works in Django
3. The meaning of MVT as a concept in Django
4. Understanding Django Admin Interface
5. Django Default Form System
6. Adding Custom Database To Django Project

### 1. Django project structure
We will start by creating our project's work directory and a virtual environment for our project as required by Django.

Virtual Enviroment is just a file/folder that contains all the Django dependencies installed from Python pip command which are neccessary. 

All these dependecies are to be shipped out together with the project when it is time to deploy to real world by freezing them into a file called `requirements.txt`.

To compile all installed dependencies into the `requirements.txt` file, run the command below:

```bash
$ pip freeze > requirements.txt
```

But assuming you are to install all the dependencies inside the already made `requirements.txt` file, then run this command: 

```bash
   $ pip install -r requirements.txt
```

Now to set up the Django project itself, please continue reading the article.

We first need to check if Python is installed properly. 

Use bash or terminal and type command as follows. 

I have installed `Python 3.9.6` on my machine. Yours might be different, no qualms at all. 

```bash
   $ python --version
   Python 3.9.6
```

It is advisable to install `Python3` anyways. If you have no Python installed, then head on to official website and download the latest according to your OS.

- [Python Official](https://python.org)

You are on the right track, keep reading...

Navigate into the directory folder you would like to have your Django project and run this.

```bash
mkdir mydjangoproject
cd mydjangoproject
```

Now you are inside the `mydjangoproject` folder.

Yaay! You are doing well. Let's explore more.

1. Inside the current directory, create the virtual enviroment folder as described above.

```bash
$ virtualenv myenv
```

Verify this by typing `virtualenv --version`.

```bash
$ virtualenv --version
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

Now open this current directory in your favorite code editor. The `requirements.txt` will be there and you can check to see the version of Django installed for you. 
   
Let's create our Django project now by running the command `django-admin startproject dj-project`

```bash
$ django-admin startproject dj-project .
```
   
Adding dots in the command is optional. What this does is that your `dj-project` will be created inside the current working directory.

Having succesfully created the `dj-project`, now run the command below and open the `http://127.0.0.1:8000/` brought to you in the browser.

```bash
$ python manage.py runserver
```

>Note that this command `python manage.py runserver`, always start Django default server for your project and it must be left running while working on. To quit the server, simply press CTRL+C. 

### 2. URL routing in Django
Generally speaking, the routing mapped the URL that user types into the browser with the exact match in views. This route talks to the server from the client browser back and forth.

Uniform Resource Locators, URLs are sorts of addresses that allows client to reach out to server via the `HyperTextTransferProtocol` HTTP requests. The server then render any HTML file returned in the views that matches the route.

In Django apps, there is an URL Python file named `urls.py`. This is where URL routes live in with features like path, views, name, and URL pattern.

A valid example of routes in django apps `urls.py` 

```python
   from django.urls import path
   from . import views

   urlpatterns = [
      path('', views.index, name='index'),
      path('users/', views.userList, name='users'),
   ]
```

### 3. Django Model View Template (MVT)
(MVT) is an acronym for MODEL VIEW TEMPLATE. Django as a web framework uses this architecture for its operation while other servers side language or framework use MODEL VIEW CONTROLLER, MVC. Let's go over each keyword.

*MODEL* controls how the features and properties of the incoming data will look like. Developers describe the way data will be collected and saved in the database in this model. 

For instance, the model class extends from a super `models.Model` class built in Django and this allows our `models` to inherit all its properties by actually calling `models.PROPERTIES`.

In the app `models.py`, we will create our `MyModel` class with this Python class:

```python
   from django.db import models

   class MyModel(models.Model):
      title = models.CharField(max_length = 100)
      is_completed = models.BooleanField(default=False)
      date_created = models.DateField(auto_created=True)

      def __str___(self):
         return self.title
```

What the private method `__str__` does is that it helps to return whatever the title is as the representational name for our model in admin.

Now migrate the model to create migration folder.

```bash
$ python manage.py makemigrations
```

Running this command, create a `migration` folder inside the app. What this holds is just the required SQL commands for the model.

We can now migrate to the default database from Django `Sqlite3`:

```bash
$ python manage.py migrate
```

Pay attention to the sqlite file created for your project.

*VIEW* returns the rendered HTML template for each URL requests to different incoming route. This is nothing but a Python function or class based views that render the template by returning some data from the model after the logic behind it.

The main purpose of views generally is to accept data coming from models and sends or maps it with template HTML file rendered. Django uses its render method which takes in three param i.e request, template_to_load and context_dictionary.

This is an example of functional `views.py` in Django apps.

```python
   from django.shortcuts import render

   def myView(request):
      context = {}
      return render(request, index.html, context)
```

While this is the class based views in Django as well.

```python
   from django.views imoport TemplateView

   class MyViewClass(TemplateView):
      template_name = 'index.html'
```

Note that class based views do not require `return`.

*TEMPLATE* in most cases is your HTML boiler plate that will be shown to users whenver they come to the rendered uri. It is where the interface will be returned to clients from views that have been saved.

### 3. Django admin interface
Django helps developers by providing them a dashboard that contains all activities going on in the application and it is the `admin` as the name implies. In the admin, all rows and columns of your model table made from models.py can be edited. 

Admin is extended from `django.contrib` Python module and for it to work as expected, one has to make a route for it in the project `urls.py` and register it in the apps installed `settings.py`. 

Fortunately, this come default with django project created.

Now we have to register the models in `admin.py` for accessing.

```python
   from django.contrib import admin
   from .models import MyModel

   admin.site.register(MyModel)
```

Then create a super user account that will access the admin and answer all questions about the credentials needed for the account.

```bash
$ python manage.py createsuperuser
```

Having done that, head on to the browser and paste the URL, then login to the account `http://127.0.0.1:8000/admin` to view the admin prepared for your project. 


### 4. Django default form system
Using Django for the backend has alot of funtionalities for you as a developer. Among these benefits is the dafult form. To reference this form, this can be done in two ways:

1. We can use the database/model properties for the form if need be. 

```python
   from .models import MyModel
   from django import forms

   class MyModelForm(forms.ModelForm):
      password = forms.PasswordInput()
      class Meta:
         model = MyModel
         fields = '__all__' 
         fields = ['title', 'is_completed', 'password']
```

>Note we can only use one of the fields inside the codes above.

2. We can use Django built `User` for the form as well.

```python
   from django.contrib import User
   from django import forms

   class MyModelForm(forms.ModelForm):
      class Meta:
         model = User
         fields = ['firstname', 'email', 'username', 'password']
```

Being done with the `forms.py`, then we can use it by bringing it into the views and render it for the template.

### 5. Adding custom a database to a Django project
Django uses a relational database such as `Sqlite3` which is the default development database. But in this section, I want to walk you through the mode of adding custom database of your choice.

We first need to download the type of database we will use and workbench into the machine. This can be done by doing a little research in Google.

Practical example can be found below where I used the `postgresql` database.

Having downloaded and installed it, we can create a database name in the workbench and connect it.

Changing the following in the `settings.py` file inside the `dj-project` created earlier, will help your project utilize the database created.

```python
   DATABASES = {
      'default': {
         'ENGINE': 'django.db.backends.postgresql',
         'NAME': 'db_name',
         'USER': 'db_user',
         'PASSWORD': ********,
         'HOST': 'localhost',
         'PORT': '5432',
      }
   }
```

We will first run the command `python manage.py makemigrations` to create SQL queries that will be used to create a table in the database. 

To create a table in the database, we can run the `python manage.py migrate` command.

To make migrations run:

```bash
python manage.py makemigrations
```

To apply the migrations run:

```bash
python manage.py migrate
```

Then you can go ahead and confirm the table with rows and columns created for your project in the postgres workbench.

### Conclusion
Django as a framework makes backend web development simple and easy to use. With this succint article on the concepts of Django, I will implore you to head on to Django documentations site for more information.

Try to reference it in subsequent project of yours. Congratulations on your new added skills. 

Thank you for making it to this end, see you!!.

- [Django Official Docs](https://docs.djangoproject.com/en/3.2/intro/)

- [Github Profile](https://github.com/Horlawhumy-dev)

Happy coding!

---
Peer Review Contributions by: [Daniel Katungi](/engineering-education/authors/daniel-katungi/)
