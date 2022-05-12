---
layout: engineering-education
status: publish
published: true
url: /how-to-build-templates-for-django-applications-with-htmx/
title: How to Build Templates for Django Applications with HTMX
description: This tutorial will guide the reader on how to build templates for Django applications with HTMX.
author: muhammed-ali
date: 2022-05-12T00:00:00-13:40
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/how-to-build-templates-for-django-applications-with-htmx/hero.jpg
    alt: How to Build templates for Django Applications with HTMX Hero Image
---
Did you know it is possible to use AJAX without writing a single line of JavaScript code? Are you a Django developer who is not really familiar with JavaScript and who would like to display components of your application asynchronously?
<!--more-->
If you've asked these questions before, then you are in the right place. In this article, I will build a simple Django application that creates, deletes content from the database, and displays the current content asynchronously without the page refreshing.

This is important if you don’t want to go through the stress of using a library like React or Vue. We can find the project built in this tutorial on  [GitHub](https://github.com/khabdrick/django-htmx-tutorial).

#### Prerequisites
- Basic understanding of Django
- Django installed (v3.2)
- Python installed (v3.8)

### What is HTMX?
The general idea behind [HTMX](https://htmx.org/) is simplifying web application development by using HTML attributes to incorporate [AJAX](https://htmx.org/docs#ajax), [CSS Transitions](https://htmx.org/docs#css_transitions), [WebSockets](https://htmx.org/docs#websockets), and [Server-Sent Events](https://htmx.org/docs#sse) directly into HTML. 

You don’t need to write any JavaScript for the basic things required to run a full-fledged web application unlike React, Vue, and other frontend libraries. To use HTMX in Django, you don’t need to install anything, you just need to attach CDN to your HTML and you are good to go.

### Creating, Listing, and Deleting with HTMX and Django
In this section, you will learn how to build the basic create, list, and delete functionality with HTMX and Django to illustrate how HTMX works in Django. We will build a contact list application.

Something to note, when working with HTMX, if you must return something from the server-side, it must be HTML fragments, not JSON.

Let’s get right into it!

First, let’s create an app for our contacts. You can do this by going to the root of your application and running the following command.
```bash
django-admin startapp app
```

Then add `app` to `INSTALLED_APPS` *settings.py* file.
```python
INSTALLED_APPS = [...,
                 "app",
                   ...,
]
```

#### Creating and Listing with HTMX and Django
Open your preferred text editor, navigate to *app/models.py*, and paste the code below, which is just a simple model for a contact list application.
```python
from django.db import models
class Contact(models.Model):
    name = models.CharField(max_length=200)
    phone_number=models.CharField(max_length=200)
    def __str__(self):
        return self.name
```
Now, generate a database for your modules by running the following commands.
```bash
python manage.py makemigrations
python manage.py migrate
```
Next, in the *app/* directory, create a new file called *forms.py,* this is where the code for our form will be. After creating the file, paste the code below into it.
```python
from .models import Contact
from django import forms

class ContactForm(forms.ModelForm):
    class Meta:
        fields = ["name", "phone_number"]
        model = Contact
        widgets = {
            "name": forms.TextInput(attrs={"class": "form-control"}),
            "phone_number": forms.TextInput(attrs={"class": "form-control"}),
        }
```
Now in the *app/views.py* file, paste the code below. The code below is generally just creating and listing a contact.
```python
from django.shortcuts import render
from .models import Contact
from django.views.generic.list import ListView

def create_contact(request):
    name = request.POST.get('contactname') # get data from form where name="contactname"
    phone_number = request.POST.get('phone_number') # get data from form where name="phone_number"
    
    # add contact
    contact = Contact.objects.create(name=name, phone_number=phone_number) # add contact to databse
    contacts = Contact.objects.all()
    return render(request, 'contact-list.html', {'contacts': contacts}) # display the list of contacts in contact-list.html

class ContactList(ListView):
    template_name = 'contact.html' # html file to display the list of contacts
    model = Contact
    context_object_name = 'contacts' # used in the HTML template to loop through and list contacts
```

Up next is creating URLs for the views above. Go to the *urls.py* file at the root of your project and replace the code you have there with the code below.
```python
from django.contrib import admin
from django.urls import path
from app.views import create_contact, ContactList

urlpatterns = [
    path('admin/', admin.site.urls),
    path('create-contact/', create_contact, name='create-contact'),
    path("contacts/", ContactList.as_view(), name='contact-list'),

]
```

Let’s now create templates for the form and the contact list. To do this, go to the directory for `app` and create a new directory called *templates/* (the name of the file is mandatory). 

In the directory you just created, create new files with names *base.html, contact.html, contact-list.html*. Now, paste the code below into the *base.html* file you just created. The code below contains all the **Content Delivery Network** (CDN) required for the entire project to display properly.

```html
{% load static %}
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Contact Application</title>
    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
    <!-- jQuery -->
    <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
    <!-- HTMX -->
    <script src="https://unpkg.com/htmx.org@1.6.0"></script>
</head>
<body>
    <div class="container mt-4">
        {% block content %}
        {% endblock %}
    </div>
    <script>
    document.body.addEventListener('htmx:configRequest', (event) => {
        event.detail.headers['X-CSRFToken'] = '{{ csrf_token }}'; //insert csrf token when performing AJAX request 
    })
    </script>
</body>
</html>
```

>*Note: We will use bootstrap just for styling.*

Now let’s get to writing the template that will create and list contacts without the page reloading. To do this with htmx, you will need 2 attributes; `hx-post`( for Issues a **`POST`** request to the specified URL), `hx-target`(load response into another element i.e. list in this case). 

Paste the code below in the contact.html file you just created to implement the form. In the code above, you see that the submitting of the form triggers `<div id="contact-list">` which displays the current list with the newly submitted contact.
```html

{% extends 'base.html' %}

{% block content %}

<div class="align-center col-10 offset-1">
    <div class="d-flex justify-content-between align-items-center">
        <p class="lead ml-0">My contacts</p>
        <form hx-post="{% url 'create-contact' %}" hx-target='#contact-list' class="d-flex align-items-center" method="POST">
            {% csrf_token %}
            <input type="text" name="contactname" class="form-control-sm mr-2" placeholder="Enter name" hx-post="/check-name/" hx-trigger="keyup" hx-target="#name-exist"/>

            <input type="text" name="phone_number" class="form-control-sm mr-2" placeholder="Enter phone number" />
            
            <button hx-post='{% url "create-contact"%}' hx-target='#contact-list' type="submit" class="btn btn-success btn-sm">Save</button>
        </form>
    </div>
    <hr/>
    
    <div id="contact-list">
        {% include 'contact-list.html' %}
    </div>
</div>
{% endblock content %}
```

Now let’s create the template to display the list of contacts. Paste the code below in the  `contact-list.html`.

```html
{% if contacts %}
{% csrf_token %}
<ul class="list-group col-4">
{% for contact in contacts %}
    <li class="list-group-item d-flex justify-content-between align-items-center">
        {{ contact.name }}: {{ contact.phone_number }}      
    </li>
{% endfor %}
</ul>
{% else %}
<p>No Contact</p>
{% endif %}
```

#### Deleting with HTMX and Django
In the *app/views.py* file, paste the function below.
```python
def delete_contact(request, pk):
    # remove the contact from list.
    contact_id = Contact.objects.get(id=pk)
    contact_id.delete()
    contacts = Contact.objects.all()
    return render(request, 'contact-list.html', {'contacts': contacts})
```
Next, create the URL for this view in your *urls.py* file.

```python
...
from app.views import create_contact, ContactList, delete_contact

urlpatterns = [
    ...
    path('delete-contact/<int:pk>/', delete_contact, name='delete-contact'),
]
```

Now we have to update the *contact-list.html* file to include the delete button and the necessary HTML attributes required for htmx to work. The attributes are; `hx-delete`(Issues a `DELETE` request to the given URL), `hx-target` (triggers the response of the current list with the contact deleted, `hx-confirm` (required if you need to add a confirmation message before deleting).

To add the delete functionality, replace the code you have in *contact.html* with the code below.

```html
{% if contacts %}

{% csrf_token %}
<ul class="list-group col-4">
{% for contact in contacts %}
    <li class="list-group-item d-flex justify-content-between align-items-center">
        {{ contact.name }}: {{ contact.phone_number }}
        <span class="badge badge-danger badge-pill" 
            style="cursor: pointer;"
            hx-delete="{% url 'delete-contact' contact.pk %}"
            hx-target="#contact-list"
            hx-confirm="Are you sure you wish to delete?">X</span>
            
    </li>
{% endfor %}
</ul>
{% else %}
<p>No Contact</p>
{% endif %}
```

You can now test out the app functionality by running the server with `python manage.py runserver` then go to the contact list URL([http://127.0.0.1:8000/contacts/](http://127.0.0.1:8000/contacts/)) and you will see that everything works correctly.

![final outcome of code](/engineering-education/how-to-build-templates-for-django-applications-with-htmx/output.png)

### Conclusion
We learned about htmx and how it can be used in Django applications. We looked at how to create, list, and delete data from the database and display current data without the page refreshing through the use of htmx.

You can take things a step further by using htmx to swap HTML or CSS components and also induce transitions if you want to. The greatest advantage of using htmx is that you don’t need JavaScript at all, so if you intend to build a better contact application or maybe a simple e-commerce site, I’ll advise you to use htmx.

Happy coding!

---
Peer Review Contributions by: [Mohamed alghadban](/engineering-education/authors/mohamed-alghadban/)
