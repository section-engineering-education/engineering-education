---
layout: engineering-education
status: publish
published: true
url: /engineering-education/working-with-forms-in-django/
title: Working with Forms in Django
description: This article provides a walkthrough on the various types of Django forms, how these forms can be created in the Django framework and how form data is saved in the database
author: anita-achu
date: 2021-01-05T00:00:00-10:00
topics: []
excerpt_separator: <!--more-->
images: 

  - url: /engineering-education/working-with-forms-in-django/hero.jpg
    alt: django forms example image
---
A large percent of modern applications collect data from their users, which is done using forms. These forms could be used to log into an application, any registering, or even to gather data needed for a survey. User forms are very important and are required in every application.
<!--more-->
These forms are presented in simple HTML and can be styled with CSS and JavaScript. Luckily, the Django framework provides its model forms that save data on the backend, making it a lot easier, and the developer doesn't need to start from scratch when creating a form.

Typically, when creating a form, it would require a developer to do some styling, some validation of the form to ensure the user data has no error, and they would save it in a database. This is the advantage of the Django framework; it provides all of these functions with its ModelForm.

### Introduction
Django is a high-level Python open-source backend framework with various in-built libraries and packages. The Django framework is easy, fast, and secure. Due to its inbuilt libraries, many functions can be created with only a few lines of code rather than creating them from scratch. 

One of these inbuilt packages is **Django forms.**

We use Django forms when collecting user data to save in a database. There are various model field forms available in Django for different purposes, and these fields have various patterns. The most important part of Django forms is that the form handles the basic aspects of form creation in only a few code lines.

However, the developer can choose to create a form from scratch, but it is a lot easier to use the Django model form, which handles a user form's basic aspect. These basic aspects include: creating the form, styling the form, receiving user data, validating the form (checking for errors), and saving the data in a database. 

How cool! 

Let's dive into how this *Modelform* is created.

### Goal
- To create a Django register form.
- To get basic knowledge of the various Django *ModelField*.
- Save form data in a database.

### Prerequisite
To follow this article along it would be helpful to have some basic knowledge of the Django framework.

### Creating a Django register form
To begin, in your applications **views.py** file, import UserCreationForm. UserCreationForm is an inbuilt feature from the Django *ModelForm* class and is used for creating a new user form. The UserCreationForm is imported from *django.contrib.auth.forms.*

In the applications **views.py** file begin by adding the following lines of code:

```python
from django.shortcuts import render
from django.contrib.auth.forms import UserCreationForm

def register(request):
    form = UserCreationForm()
    return render(request, 'register.html', {'form': form})
```

**Note:** It is important that the **register.html** path in your app **views.py** must be the correct path. Otherwise you'll have an error. For example, if your **register.html** is located in your details app. 

We should write the above code this way:
```python
return render(request, 'details/register.html', {'form': form})
```

The next step is to create a register.html template that will display the form on the frontend. In your **register.html** template, add the following code.

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

*Csrf_token* is added security used as a hidden field to protect the form from attacks. It is an important feature in a Django form.

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

Now we can check our work in the browser by running the command `python manage.py runserver`.

This should display on our browser.

![Register form 1](/engineering-education/working-with-forms-in-django/register1.png)

As seen from these few lines of code, a form has been created, and Django also provides a password validation field just by importing the `UserCreationForm`.

To do this, we will add a few lines of code in our **views.py** file.

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

Once this is done successfully, try creating a new user again. 

**Bravo! It worked.** 

A new user account was created, validated, and the user will be redirected to the home page after creating an account.

**Note:** This form does not have an email field provided for us. Therefore, we'll need to create an email field but remember Django already provides this form for us through its UserCreationForm. Later, we'll be looking at how to edit the Django form to include `emailField` and any other necessary field.

To do this, we'll start by creating a new file **forms.py**.

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

*Class Meta* is used when adding fields in an already existing Django `ModelForm.` There are various Django fields. [Refer to the documentation](https://docs.djangoproject.com/en/3.1/topics/forms/modelforms/#field-types) for more details on Django forms.

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

**Note:** How we changed from UserCreationForm to UserRegisterForm.

![Register form 2 with emailField](/engineering-education/working-with-forms-in-django/register2.png)


A few additional styling choices can be done using either CSS or bootstrap within the template. This additional styling is done using ***Django-crispy-forms***.

This is an application that allows Django-forms to be styled without re-writing any lines of code.

Let's add crispy-forms. 

First, install crispy forms in your terminal.

`pip install Django-crispy-forms`

Once this is installed, go to your **settings.py** file and add the crispy form under installed_apps.

![Settings.py file](/engineering-education/working-with-forms-in-django/settings.png)

Then, at the bottom of the **settings.py** file, add these lines of code.

```python
CRISPY_TEMPLATE_PACK = 'bootstrap4'
```

Last, in your **register.html** file. 

Add the crispy form tag at the top, this way:
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

Notice, we also added **crispy** in our code. This showcases that we are adding crispy to do the editing. Don't skip that.

Once this is done properly, your form would look like this.

![Register form 4 with crispy](/engineering-education/working-with-forms-in-django/register4.png)

### Saving user form data in a database
This is one of the greatest features of Django. The Django framework comes with its own immersed database, ***sqlite3***. It immediately creates the Django app from the terminal, and it comes with an SQLite database.

The Django *ModelForm* automatically saves to the database without any additional line of code. How cool! More reason to love and to work with the Django framework.

***I hope this tutorial was of help to you.*** 

Happy coding! 🙂

### References:
- [Django Project Documentation](https://docs.djangoproject.com/en/3.1/topics/forms/)

- [Django Forms Project Documentation](https://docs.djangoproject.com/en/3.1/topics/forms/modelforms/)

---
Peer Review Contributions by: [Lalithnarayan C](/engineering-education/authors/lalithnarayan-c/)
