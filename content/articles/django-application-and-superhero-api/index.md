---
layout: engineering-education
status: publish
published: true
url: /django-application-and-superhero-api/
title: Working with the Superhero API
description: This article will help the reader understand how to consume data from an API in a Django application.
author: victor-elvis
date: 2022-01-25T00:00:00-07:30
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url:  /engineering-education/django-application-and-superhero-api/hero.png
    alt: Working with the Superhero API Hero Image
---
An application programming interface is a software middleware that sits between two applications and allows them to communicate and exchange data. 
<!--more-->
This intermediary software, therefore, enables data transmission between two applications. For example, other software may be use an API to communicate with a specific framework.

The Superhero API is an application programming interface that provides data and information about a list of superheroes from the comic universe. 

This includes their physical capabilities, biography information, occupations, power statistics, connections with other heroes, and appearances in movies.

This article explores the superhero API by consuming its data in a Django application. First, we will create a Django application that lists all the superheroes in the comic world. Each superhero will have his page to showcase his characteristics.

### Prerequisites
- Code editor most preferably [Visual Studio Code](https://code.visualstudio.com/).
- Good undestanding of [Django](https://www.djangoproject.com/) framework.
- [Superhero API key](https://superheroapi.com/).
- Some basic undertanding of [CSS](https://www.w3schools.com/css/) and [HTML](https://www.w3schools.com/html/default.asp).

### Project setup
Each Django project requires its virtual environment to store all the requirements and dependencies of the project. 

For this reason, we will create a virtual environment for our project. Execute the command below to create a virtual environment and call it `superhero`:

```bash
virtualenv superhero
```

Next, change the directory into the folder containing the virtual environment, then start the virtual environment using the command below:

```bash
source superhero/bin/activate
```

### Installing Django
Now that we have activated the virtual environment, we need to install Django in the virtual environment together with all other dependencies required to work with the application. 

Execute the following command to install Django:

```bash
pip install Django
```

This command is responsible for fetching the Django packages using *Pip* and installing it locally in the virtual environment. 

Next, execute the command below to create a new Django project in the current working directory:

```bash
Django-admin startproject superheroes
```

The project folder structure as of now should be as shown below:

```bash
├── superheroes
│   ├── __init__.py
│   ├── asgi.py
│   ├── settings.py
│   ├── urls.py
│   └── wsgi.py
├── manage.py
└── .superhero/
```

In the next step, we will install `requests`. `Requests` is a simple HTTP library used to send HTTP requests using Python. 

This library allows one to pass different parameters to the HTTP request including headers, form data, and multipart files. Moreover, it will enable one to access response data from the request made in JSON format.

Run the following command in the terminal to install the `requests` library:

```bash
pip install requests
```

We can then run `pip freeze > requirements.txt` to copy all the requirements in the virtual environment to a new file called `requirements.txt`.

### Creating the application
After successfully executing the above steps, we need to create the application using a Django command. 

Applications in Django are sub-projects of the main project. So, for instance, a website may have `news` as a separate application from `portfolio`. To Django, these could be two different sub-application. 

To create an application, execute the following command:

```bash
django-admin startapp heroes
```

This command will create a new `heroes` application with *views, models, URLs, templates*, and *migrations*. The application's folder overview is as shown below:

```bash
├── heroes
│   ├── __pycache__
│   ├── migrations
│   ├── templates
│   ├── __init__.py
│   ├── admin.py
│   ├── models.py
│   ├── tests.py
│   ├── urls.py
│   └── views.py
```

### Working on the URLs
A Universal Resource Locator is what specifies the path to a given resource in the system. The site-wide navigation is in the `url.py` file. 

Once a url is specified, the function to be executed is fetched from the `view.py` file. 

This function tells Django where the template to be rendered is located. We will have two paths that specify the default home page and a single hero page. 

In the `urls.py` file, add the following snippets:

```py
from Django.URLs import path
from . import views
from Django.conf import settings
from Django.conf.URLs.static import static

urlpatterns = [
    path('', views.homepage, name='index'),
    path('single-hero/<int:id>', views.single_hero, name='single-hero'),
]+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
```

The `single-hero` path has an extra parameter `<int:id>`, which specifies the superhero's id whose details are to be viewed.

### Working on the views
The `views.py` file contains all the functions to be executed when a specific path is accessed. Since we use `requests` and render methods, we need to import them into the `views.py` file.

```py
from Django.shortcuts import render
import requests
```

We will have two functions in this file. The first function will be the `homepage()`. This function will take in requests and use the `requests` library to fetch all superheroes from the API url. Next, it converts the list of superheroes to json then passes it to the template rendered.

```py
def homepage(request):
    res = requests.get('https://akabab.github.io/superhero-api/api/all.json')
    heroes = res.json()
    context = {'heros': heroes}
    return render(request, 'homepage.html', context)
```

The next function will be called `single_hero`, which also handles requests and an ID of a specific superhero. 

We can follow the same url but with a different ID to get the details of other superheroes. After retrieving the superhero's data, the response is converted into JSON the passed to the `single-hero.html` template.

```py
def single_hero(request, id):
    response = requests.get(f"https://akabab.github.io/superhero-api/api/id/{id}.json")
    response.raise_for_status()  # raises exception when not a 2xx response
    if response.status_code != 204:     
        hero = response.json()
        context = {'hero': hero}
    return render(request, 'single-hero.html', context)
```

### Working on the templates
The templates contain the user interface files that will be rendered. We are designing three template files with the data that was passed from the views. 

The first file will contain the uniform components to all pages, like the navigation bar and the footer, while the remaining two will vary depending on the data they display.

#### The base template
The base template contains the snippets needed in all the pages. In addition, we also specify the links to the CSS and JavaScript files that we need for our project. 

All other templates extend the base template. Create a new file called `base.html`, then add the snippets below:

```html
{% load static %}

<html>    
    <head>
        <meta charset="UTF-8">
        <link rel="stylesheet" href="{% static 'main.css' %}">
        <link rel="stylesheet" href="{% static 'det.css' %}">
        <link rel="stylesheet" href="{% static 'fav.css' %}">
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css">
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>
        <title>Home</title>
    </head>

    <body>
        <header>
            <div class="app-name center"><a href='index.html'>SuperHeroApp</a></div>
        </header>

        {% block content %}
        <!-- Begin Page Content -->
    
        <!-- /.container-fluid -->
        {% endblock %}
        
        <script type="text/javascript" src="../scripts/index.js"></script>
    </body>
</html>
```

### All superheroes template
This template is the html file that contains the list of all superheroes, their name, and a link to visit individual superheroes. First, create a new file called `homepage.html` in the `templates` folder. In the file, add the following snippets:

```html
{% extends 'base.html' %}
{% load static %}
{% block content %}


 <!-- Main Search results -->
 <div id="result-container">
    <div id='results'>
        {% for hero in heros %}
        <div class="card-container center" id="data-id">
            <div class="card-img-container">
                <!-- the super hero image -->
                <img src="{{hero.images.sm}}"> //the super hero image
            </div>
            <!-- superhero name -->
            <div id="details_btn" class="card-name">{{hero.name}}</div> 
            <div class="card-btns">
                <a href="{% url 'single-hero' hero.id %}"><button class="btn primary">View</button></a>
            </div>
        </div>
        {% endfor %}

    </div>
</div>

{% endblock %}
```

We use a for loop to go through the list of superheroes fetched from the API. We then display the *name, image*, and a *button* to go to each superhero's specific page.

### The single superhero page
This page is rendered by the `def single_hero(request, id)` function. On this page, we access all the properties of a single superhero.

In the *templates* folder, create a new file called `single-hero.html`, then add the snippets below to display the superheroes image:

```html
{% extends 'base.html' %}
{% load static %}
{% block content %}

<div class="container">
    <!-- A navigation bar -->
    <div id="top-bar" style="color: #02a86b;">
        <div><a href="#powerstats">Powerstats</a></div>
        <div><a href="#appearance-target">Appearance</a></div>
        <div><a href="#biography-target">Biography</a></div>
        <div><a href="#occupation-target">Occupation</a></div>
        <div><a href="#connections-target">Connections</a></div>
    </div>
    <div id='data-container'>
        <!-- Image of the hero -->
        <div id="image">
            <img width="400" height="400" src="{{hero.images.sm}}">
        </div>
        <div id="detail-container">
            <!-- powerstatts -->
            <!-- Appearance -->
            <!-- Biography -->
            <!-- occupation -->
            <!-- connections -->
        </div>
    </div>
</div>

{% endblock %}

```

To display the power stats of the hero, add this block of code in the `detail-container` div.

```html
  <div class="detail-item">
    <!-- Powerstats bars -->
    <span class="anchor" id="powerstats"></span>
    <h4 id="powerstats">{{ hero.name }}'s' Powerstats</h4>
    <div id="stats-container">
        <table class="table table-bordered">
            <thead>
                <tr>
                <th>Metrics</th>
                <th>Measure</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Intelligence</td>
                    <td>{{hero.powerstats.intelligence}}</td>
                </tr>
                <tr>
                    <td>Strength</td>
                    <td>{{hero.powerstats.strength}}</td>
                </tr>
                <tr>
                    <td>Speed</td>
                    <td>{{hero.powerstats.speed}}</td>
                </tr>
                <tr>
                    <td>Durability</td>
                    <td>{{hero.powerstats.durability}}</td>
                </tr>
                <tr>
                    <td>Power</td>
                    <td>{{hero.powerstats.combat}}</td>
                </tr>
            </tbody>
         </table>
    </div>
</div>
```
![Single hero](/engineering-education/django-application-and-superhero-api/single-hero1.png)


To display the hero's details, we do as follows:

```html
<div class="detail-item">
    <span class="anchor" id="appearance-target"></span>
    <h1>Appearance</h1>
    <section id="appearance">
        <table class="table table-bordered">
            <thead>
                <tr>
                    <th>Metrics</th>
                    <th>Measure</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Gender</td>
                    <td>{{hero.appearance.gender }}</td>
                </tr>
                <tr>
                    <td>Race</td>
                    <td>{{hero.appearance.race}}</td>
                </tr>
                <tr>
                    <td>Height</td>
                    <td>{{hero.appearance.height}}</td>
                </tr>
                <tr>
                    <td>Weight</td>
                    <td>{{hero.appearance.weight}}</td>
                </tr>
            </tbody>
        </table>
    </section>
</div>
```

The superhero's biography details:

```html
<div class="detail-item">
    <span class="anchor" id="biography-target"></span>
    <h1>Biography</h1>
    <section id="biography">
        <table class="table table-bordered">
            <thead>
                <tr>
                <th>Metrics</th>
                <th>Measure</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Full Name</td>
                    <td>{{hero.biography.fullName }}</td>
                </tr>
                <tr>
                    <td>Alter Egos</td>
                    <td>{{hero.biography.alterEgos}}</td>
                </tr>
                <tr>
                    <td>Aliases</td>
                    <td>{{hero.biography.aliases}}</td>
                </tr>
                <tr>
                    <td>Place of Birth</td>
                    <td>{{hero.biography.placeOfBirth }}</td>
                </tr>
                <tr>
                    <td>First Appearance</td>
                    <td>{{hero.biography.firstAppearance }}</td>
                </tr>
                <tr>
                    <td>Publisher</td>
                    <td>{{hero.biography.publisher }}</td>
                </tr>
                <tr>
                    <td>Alignment</td>
                    <td>{{hero.biography.alignment }}</td>
                </tr>
            </tbody>
        </table>
    </section>
</div>
```

The superhero's occupation details:

```html
  <div class="detail-item">
    <span class="anchor" id="occupation-target"></span>
    <h1>Occupation</h1>
    <section id="occupation">
        <table class="table table-bordered">
            <thead>
                <tr>
                    <th>Metrics</th>
                    <th>Measure</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Occupation</td>
                    <td>{{hero.work.occupation}}</td>
                </tr>
                <tr>
                    <td>Base</td>
                    <td>{{hero.work.base}}</td>
                </tr>
            </tbody>
        </table>
    </section>
</div>
```

Connection Details:

```html
<div class="detail-item">
    <span class="anchor" id="connections-target"></span>
    <h1>Connections</h1>
    <section id="connections">
        <table class="table table-bordered">
            <thead>
                <tr>
                    <th>Metrics</th>
                    <th>Measure</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Group Affiliation</td>
                    <td>{{hero.connections.groupAffiliation}}</td>
                </tr>
                <tr>
                    <td>Relatives</td>
                    <td>{{hero.connections.relatives }}</td>
                </tr>
            </tbody>
            </table>
    </section>
</div>
```

![Single hero2](/engineering-education/django-application-and-superhero-api/single-hero2.png)

### The static folder
The static folder contains all the static files required for the project. These files include *images, css, javascript*, and other *media files*.

Add the following snippets to the `settings.py` file to set up the *static* folder:

```py
#at the beginning of the file
from pathlib import Path
import environ
import os


# at the end of the file
env = environ.Env()
environ.Env.read_env()

STATIC_URL = '/static/'

STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')

STATICFILES_DIRS = (
    os.path.join(BASE_DIR, 'static'),
)
```

You can  find the CSS and JavaScript file in [this link.](https://github.com/victorelvice/superhero/tree/main/static) and the entire application [here](https://github.com/victorelvice/superhero).

The final application should look as shown below:

![All Heros](/engineering-education/django-application-and-superhero-api/all-hero.png)

### Conclusion
The superhero API is a simple and easy-to-use middleware. This tutorial discussed how to use the API in building a superhero application. 

First, we fetched the data and rendered it on a user interface. This tutorial should provide a headstart in using the Superhero API and other APIs with the Django framework. 

---
Peer Review Contributions by: [Mercy Meave](/engineering-education/authors/mercy-meave/)