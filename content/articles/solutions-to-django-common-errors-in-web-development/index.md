### Solutions to Common Django Errors in Web Development


### Introduction
It is almost impossible to reach your destinations in web development using any framework with Django included without getting stuck at some point on the way. This problem specifically in web development can result from the wrong path, installation, procedures, and sometimes just ignorance. In this article, I will make your coding easy by clearly pointing to some common errors associated with Django, explaining step by step how to solve them to make sure we arrive at our destination. Happy reading!

By the end of this tutorial, the reader should be able to solve the following:
  
- 404 page not found error 
- No module named error
- Django-admin is not recognized as an internal or external command
- Django is not able to find static files
- Name error

### Prerequisites
To have a better understanding of this article, the reader should:
- Know how to create websites using the Django framework
- Have a well-functioning Computer
- Have Python, and Django installed

### Table of Contents
1. Handling 404 page not found error

      Causes of 404 page not found error and solution

2. Handling no module named error

3. Handling Django-admin is not recognized as an internal or external command

4. Handling Django is not able to find static files

5. Handling name error

6. Further learning

### Handling 404 page not found error
This means that the particular folder you are looking for, for example, home.html is not present in the folder. Admittedly, the template folder stores all HTML files in Django.
### Causes of 404 page not found error
There are possible three causes of this error in the Django framework.
1. Page is not present in the template folder.

This means that the particular folder you are looking for, for example, home.html is not present in the folder. Admittedly, the template folder stores all HTML files in Django.

#### Solution

Make sure your HTML file is well created with correct naming in the template directory.

2. Page has no function in views.py

Every page must have a function in the views.py file without any denial. The absence of page function in views.py will cause this error.

#### Solution

views.py in Django store functions that return page on the browser without a function in views.py because most of this function has a role of rendering HTML files to the browser. If there is an error that page is not found but we have the HTML existing in the template file, then we need to create a python function that will display an HTML file on the browser.

3. Absence in URL

The last thing to make sure you do is to create the URL, the function we have created in views.py should be defined in url.py as shown below. Remember to import views!

```python
from django.contrib import admin
from django.urls import path
from .views import home
from .import views

urlspatterns = [
    path('admin/, admin.site.urls),
    path('', views.home, name="home"),
---
]

 ```
 
### Handling no module named error
The occurrence of this error may imply that there is a misspelling in the installed app or you have included an app that does not exist in an app that is installed in your Django project.
In settings.py, make sure you include your installed app with the right spelling as shown below.


```python

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',

    'MODERNMAN.apps.ModernmanConfig',


]

 ```
 ### Handling Django-admin is not recognized as an internal or external command
To be able to fix this problem, close the terminal window and relaunch it with administrator privileges. Once that is done, change the directory to where you wish to start your Django project.


### Handling Django is not able to find static files
To solve this problem, go to settings.py and make sure the following appears as shown below.
1.	Check that ‘BASE_DIR’ is defined in settings.py if not defined define it.
``` python
'DIRS' : [os.path.join(BASE_DIR, 'templates/')],
```

2.	Check debug mode in settings.py
```python
DEBUG = True
```
3.	Define STATIC_URL and STATICFILES_DIRS in settings.py
```python
STATIC_URL = 'static/'
```
4.	Make you have this code, {% load static %} in every HTML file that you want to access the static files and your linking links as shown below.
```html
{% load static %}

<html lang="en">
    <head>
    ...
```
### Handling name error
Any name you would want to use or refer to later should be imported in settings.py. For example, an error like 
```‘DIRS’:[‘os’ is not defined, ```
you have to import "os" and the problem will be solved.
```python

import os
from pathlib import Path

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent
```
### Further learning
For further learning, I recommend you go through the following:

- [404 page not found error 
No module named error](https://www.youtube.com/watch?v=0M_PZU8wcXY&t=23s)
- [Django-admin is not recognized as an internal or external command](https://www.youtube.com/watch?v=EwJoN-G3w-s)
- [Django is not able to find static files](https://www.youtube.com/watch?v=0SAZByRZB9U)
- [Name error](https://www.youtube.com/watch?v=AFhpBvKilPA)
- [Internal server error](https://www.youtube.com/watch?v=y8DN8LOm8WA&t=9s)
- [Template does not exist error](https://www.youtube.com/watch?v=RWAKahsR1_g)
