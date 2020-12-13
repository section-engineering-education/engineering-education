---
Layout: engineering-education
status: publish
published: true
url: /engineering-education/working-with-forms-in-django
title: Working with forms in django
description: This article provides a walk through on the various types of django forms, how these forms can be created in django framework and how form data is saved in database
author: anita-achu
date: 2020-12-13T00:00:00-10:00
topics: [python-django]
excerpt_separator: <!--more-->
images: 

    - url: /engineering-education/working-with-forms-in-django/hero.jpg
      alt: django image example
---


User forms are very important and required in every application. A larger percent of applications in recent times collect data from their users and this is done with the use of forms. These forms could be for logging into an application, registering, or even data needed for a survey. Forms are presented in simple HTML and can be styled with CSS and JavaScript. Luckily, the Django framework provides its model forms which saves data on the backend which makes it a lot easier and the developer does not need to start from scratch while creating a form.

Usually, while the developer is required to create a form, do some styling, the developer is also required to validate the form, ensure the user data has no error, and save it in the database. This is the advantage of the Django framework hence it provides all of these functions for the developer with its ModelForm.

## Introduction

Django is a high-level python open-source backend framework with various in-built libraries and packages. Django framework is easy, fast and secure, due to its inbuilt libraries, a lot of functions can be created with a few lines of code rather than starting from scratch. One of the inbuilt packages is **Django forms.**

Django form is used in collecting user data and saving data in a database.  There are various model field forms available in Django for different purposes and these fields have various patterns. The most important part about Django forms is that the form handles the basic aspects of form creation and with only a few lines of code.

However, the developer can choose to create a form from scratch but it is a lot easier to make use of the Django model form which handles the basic aspect of a user form. These basic aspects include: creating the form, styling the form, receiving user data, validating the form (checking for errors), and saving the data in a database. How cool! Let's dive into how this *Modelform* is created.

## Goal

- To create a Django register form.
- To have basic knowledge of the various Django *ModelField*
- Save form data in a database

## Prerequisite

Basic knowledge of the Django framework.

1. **Creating a Django register form.**

To begin with, in your app **views.py** file, import UserCreationForm. UserCreationForm is an inbuilt feature from the Django *ModelForm* class and is used in creating a new user form. The UserCreationForm is imported from *django.contrib.auth.forms.*

In the app **views.py** by adding the following lines of code:

```python
from django.shortcuts import render
from django.contrib.auth.forms import UserCreationForm

def register(request):
    form = UserCreationForm()
    return render(request, 'register.html', {'form': form})
```

**Note:** It is important that the **register.html** path in your app **views.py** must be the correct path, else you'll have an error. For example, if your **register.html** is located in your details app. The code above should be written this way:

```python
return render(request, 'details/register.html', {'form': form})
```

The next, step is to create a register.html template that will display the form on the frontend. In your **register.html** template add the following code.

```html
<h1>Register Form</h1>
<form method="POST">
  {% csrf_token %} 
  <fieldset class="form-group">
    {{ form.as_p }}
  </fieldset>
  <div class="form-group">
    <button class="btn btn-outline-info" type="submit">Register</button>
  </div>
</form>
```

Csrf_token is an added security used as a hidden field to protect the form from attacks. It is an important feature in a Django form.

Next, add the register.html template in your app **urls.py** file.

```python
from django.contrib import admin
from django.urls import path
from accounts.views import view, detail_views

urlpatterns = [
  path('admin/', admin.site.urls),
  path('register/', detail_view, name="register"),
  path('', include(blog.urls)),
]
```

Now we check our work so far in the browser, by running the command  ***python manage.py runserver*** as you know.

This should display on our browser.

![Register form](/engineering-education/working-with-forms-in-django/register 1.png)

As seen from these few lines of code a form has been created and Django also provides a password validation field just by importing the UserCreationForm.

So to do this, we add a few lines of code in our ****views.py**** file

```python
from django.shortcuts import render, redirect
from django.contrib.auth.forms import UserCreationForm

def register(request):
    if request.method == 'POST':
      form = UserCreationForm(request.POST)
      if form.is_valid(): 
        form.save()
        username = form.cleaned_data.get('username')
        return redirect('home')
    else:
      form = UserCreationForm()
  return render(request, 'details/register.html', {'form': form})
```

Once this is done successfully, try creating a new user again. ***Bravo! It worked.*** So, a new user account is created, validated and the user is redirected to the home page after creating an account.

**Note:** This form does not have an email field provided for us. Therefore, we'll need to create an email field but remember Django already provides this form for us through its UserCreationForm. So in a bit, we'll be looking at how to edit the Django form to include '**emailField'** and any other field necessary.

To do this, we'll start by creating a new file **forms.py**

```python
from django import forms
from django.contrib.auth.models import User
from django.contrib.auth.forms import UserCreationForm

class UserRegisterForm(UserCreationForm):
    email = forms.EmailField()

    class Meta:
        model = User
        fields = ['username', 'email', 'password1', 'password2']
```

*Class Meta* is used in adding fields in an already existing Django **ModelForm.** There are various Django fields. [see](https://docs.djangoproject.com/en/3.1/topics/forms/modelforms/#field-types) for more on Django forms.

In **views.py:**

```python
from django.shortcuts import render, redirect
from .forms import UserRegisterForm

def register(request):
    if request.method == 'POST':
      form = UserRegisterForm(request.POST)
      if form.is_valid(): 
        form.save()
        username = form.cleaned_data.get('username')
        return redirect('home')
    else:
      form = UserRegisterForm()
  return render(request, 'details/register.html', {'form': form})
```

Note how we changed from UserCreationForm to UserRegisterForm.

![Register form with emailField](/engineering-education/working-with-forms-in-django/register 2.png)


A few additional styling can be done using either CSS or bootstrap within the template. This additional styling is done using ***Django-crispy-forms**.*  This is an application that allows Django-forms to be styled without re-writing the codes.

Swiftly, let's add crispy-forms. Firstly, install crispy forms in your terminal.

***pip install Django-crispy-forms***

Once this is installed, go to your **settings.py** file and add the crispy form under installed_apps

![Settings.py file](/engineering-education/working-with-forms-in-django/register 3.png)


Then, at the bottom of the **settings.py** file add this lines of code.

```python
CRISPY_TEMPLATE_PACK = 'bootstrap4'
```

Lastly, in your **register.html** file. Add the crispy form tag at the top, this way:

```python
{% load crispy_forms_tags %}
<h1>Register Form</h1>
<form method="POST">
  {% csrf_token %} 
  <fieldset class="form-group">
    {{ form|crispy }}
  </fieldset>
  <div class="form-group">
    <button class="btn btn-outline-info" type="submit">Register</button>
  </div>
</form>
```

 Notice, we also added "**crispy"** in our code. Hence we are adding crispy to do the editing. Don't skip that.

Once this is done properly, your form would look like this

 

![Register form with crispy](/engineering-education/working-with-forms-in-django/register 4.png)

 **2. Saving user form data in a database**

This is one of the most awesome features of Django. Yes, you have it! Django framework comes with its own immersed database, ***sqlite3***. Immediately the Django app is created from the terminal, it comes with an SQLite database. The Django *ModelForm* automatically saves to the database without an additional line of code. How cool! More reason to love and work with the Django framework.

***I hope this tutorial was of help to you... Happy coding!*** 🙂

### **References:**

**[Django Project Documentation](https://docs.djangoproject.com/en/3.1/topics/forms/)**

**[Django Forms Project Documentation](https://docs.djangoproject.com/en/3.1/topics/forms/modelforms/)**

