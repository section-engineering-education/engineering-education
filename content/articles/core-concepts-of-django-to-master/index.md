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

In out today's discussion, I would be introducing you to this great Python backend framework known DJANGO. In web applications development world, there are different server side languages and frameworks of which Django happens to be one. To be cleared enough, Django is just a framework built on top a well known programming language called Python few years back. Join me in this journey of my favorite backend framework to explore more. Yes, you reader!!

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
5. Django Default Form System
6. Adding Custom Database To Django Project

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

You are on the track, keep reading...

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
Note that this command `python manage.py runserver`, always start django default server for your project and it must be left running while working on. To quit the server, simply press CTRL+C. 

### 2. URL Routing In Django

Generally speaking,the routing mapped the uri that user types into the browser with the exact match in views. This route talks to the server from the client browser back and forth.

Uniform Resource Locators, URLs are sorts of addresses that allows client to reach out to server via the `HyperTextTransferProtocol` HTTP requests. The server then render any HTML file returned in the views that matches the route.

In Django apps, there is url python file named `urls.py`. This is where url routes live in with features like path, views, name, and urlpattern.

A valid example of routes in django apps `urls.py` 

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

_MODEL_ controls how the features and properties of the incoming data will look like. Developers describe the way data will be collected and saved in database in this model. 

For instance, the model class extends from  a super `models.Model` class built in Django and this allows our `models` to inherit all its properties by actually calling `models.PROPERTIES`.

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

Now make migration of the model to create migration folder.

   ```bash
   $ python manage.py makemigrations
   ```

Running this command, create a `migration` folder inside the app. What this holds is just the required SQL commands for the model.

We can now migrate to the default database from Django `Sqlite3`;

   ```bash
   $ python manage.py migrate
   ```
Pay attention to the sqlite file created for your project.

_VIEW_ returns the rendered HTML template for each url requests to different incoming route. This is nothing but a Python function or class based views that render the template by returning some data from the model after the logic behind it.

The main purpose of views generally is to accept data coming from models and sends or maps it with template HTML file rendered. Django uses its render method which takes in three param i.e request, template_to_load and context_dictionary.

This is an example of functional `views.py` in Django apps.

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

_TEMPLATE_  This is most cases your HTML boiler plate that will be shown to users whenver they come to the rendered uri. It is where the interface to be returned to clients from views been saved.


### 3. DJANGO ADMIN INTERFACE
Django helps developers by providing them a dashboard that contains all activities going on in the application and it is the `admin` as the name implies. In the admin, all rows and columns of your model table made from models.py can be edited. 

Admin is extended from `django.contrib` python module and for it to work as expected, one has to make route for it in the project `urls.py` and register it in the apps installed `settings.py`. But fortunately, this come default with django project created. Django is sweet.

Now we have to register the models in `admin.py` for accessing.

```python
   from django.contrib import admin
   from .models import MyModel

   admin.site.register(MyModel)
```

Then create a super user account that will access the admin and answer all questions about the credentials needed for the account

   ```bash
   $ python manage.py createsuperuser
   ```

Having done that, head on to the browser and paste the url, then login to the account `http://127.0.0.1:8000/admin` to view the admin prepared for your project. 

Don't you fall for Django by now?? You should because of all the already made stuffs for you as a developer, and of which all other frameworks do not.


### 4. DJANGO DEFAULT FORM SYSTEM

Using Django as backend has alot of funtionalities for you as a developer. Among these benefits is the dafult form. To reference this form, this can be done in two ways:

1. We can use the database/model properties for the form if need be. How?? 

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
Note we can only use one of the fields inside the codes above.

2. We can use django built `User` for the form too.

```python
   from django.contrib import User
   from django import forms

   class MyModelForm(forms.ModelForm):
      class Meta:
         model = User
         fields = ['firstname', 'email', 'username', 'password']
```

Having done with the `forms.py`, then we can use it by bringing it into the views and render it for the template.

### 5. ADDING CUSTOM DATABASE TO DJANGO PROJECT
Django uses a relational database such as `Sqlite3` which is the default development database. But in this section, I want to walk you through the mode of adding custom database of your choice.

We firstly download the type of database to be used and their workbench too into the machine. This could be done by making little research in google on how to download your choice database.

Practical example can be found below where I used `postgresql` database.

Having downloaded and installed, create a database name in the workbench and connect it.

Changing the following in `settings.py` file inside the `dj-project` created earlier, will help your project utilize the database created.

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

To create table in the database, we will then run the command `python manage.py migrate`.

To make migrations run:

   ```bash
   python manage.py makemigrations
   ```

To apply the migrations run:

   ```bash
   python manage.py migrate
   ```

Then you can go ahead and confirm the table with rows and columns created for your project in the postgres workbench.

### CONCLUSION

Django as a framework makes web development backend simple and easy to use. With this succint article on the concepts of Django, I will implore you to head on to Django documentations site for more information and try to reference it in subsequent project of yours. Congratulations on your new skills added. Django is awesome!!

Thank you for making it to this end, see you!!.

![Django Official Docs](/https://docs.djangoproject.com/en/3.2/intro/)

![Github Profile](/https://github.com/Horlawhumy-dev)

Happy Learning!

---

Peer Review Contributions by: [Daniel Katungi](/engineering-education/authors/daniel-katungi/)
