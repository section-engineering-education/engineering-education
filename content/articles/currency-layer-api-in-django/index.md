---
layout: engineering-education
status: publish
published: true
url: /currency-layer-api-in-django/
title: Consuming Currencylayer API in Django
description: This article will illustrate how to use the Currencylayer API in a Django application.
author: mercy-meave
date: 2022-02-15T00:00:00-16:15
topics: [API]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/currency-layer-api-in-django/hero.jpg
    alt: Consuming Currencylayer API in Django Image
---

The Currencylayer API is one of the APIs that provide real-time currency exchange rates. It is easy and reliable to use due to its readable JSON responses.
<!--more-->
### Introduction
The API is mainly preferred over other APIs because of its reliability in providing real-time Forex rates, ease of integration and affordability.

To learn more about this API and how to work with it, we will develop a Django application that uses the API to provide real-time currency exchange rates.

A user will enter a currency and find the current conversion rate. Additionally, the application should allow the user to enter an amount in one currency and find the equivalence in another currency.

Besides the above basic functionality, we should be able to retrieve the exchange rates of a particular currency on a given date.

### Prerequisites
- Working with the [Django](https://www.djangoproject.com/) framework.
- Code editor, most preferably [Visual Studio Code.](https://code.visualstudio.com/)
- Basics of consuming APIs in Django
- understanding of [CSS](https://www.w3schools.com/css/) and [HTML.](https://www.w3schools.com/html/default.asp)
- Currencylayer [API key.](https://currencylayer.com/product)

### Project setup

#### The virtual environment
Conventionally, good programming practice requires every project to remain in its virtual environment. Furthermore, the virtual environment is required so that the development dependencies only exist in a specific project.

This technique enables developers to use a specific version of a dependency instead of the one installed globally.

Therefore let us create a folder name `converter` and create a virtual environment in the same folder.

```bash
mkdir currency
```

Navigate into the folder using the command below:

```bash
cd currency
```

Execute the command below to create a virtual environment in the desired folder.

```bash
virtualenv venv.
```

The next step under this sub-topic is to activate the development environment in readiness for building the application.

```bash
source venv/bin/activate
```

#### Installing the dependencies
We have set up our development environment to install the required dependencies.

- First, we begin by installing Django by executing the command below:

```bash
pip install Django
```

Next, we need to install [Python Decouple](https://pypi.org/project/python-decouple/) to help us organize our configuration files appropriately and hide confidential application details like the API key during deployment.

```bash
pip install python-decouple
```

#### Starting the project
To start a new Django application, execute the command below in the current working directory.

```bash
Django-admin startproject currency-converter
```

If you executed all the commands correctly, the folder structure should be as shown below.

```bash
├── curerncy
│   ├── __init__.py
│   ├── asgi.py
│   ├── settings.py
│   ├── urls.py
│   └── wsgi.py
├── manage.py
└── .superhero/
```

#### Creating the converter app
An app in the Django project is a subcomponent of the major application. Dividing a project into several applications ensures that the project groups related activities together, thus facilitating easy debugging and scalability.

To start a new application, execute the command below:

```bash
Django-admin startapp converter
```

The folder organization of the new application will be as shown below:

```bash
├── converter
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

In the `settings.py` file, add the created application under the installed apps as shown below:

```py
# Application definition
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'converter'
]
```

### Global variables configuration
We need to set up a file where we store the global variables we intend to use for the application.

With the help of `Python Decouple`, we can create a single file and refer to the file every time we need to fetch a single particular in that file.

In the same directory as the `settings.py` file, create a new file called `.env` then add the following code snippet.

```env
API_KEY=''
SECRET_KEY='YOUR DJANGO PROJECT SECRET KEY'
DEBUG=True()
BASE_URL=https://apilayer.net/api/
```

In the `settings.py` file, add the following snippets, which fetches the global variables from the `.env` file and patches them where necessary.

```py
from pathlib import Path
from decouple import config
import os

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = config('SECRET_KEY')

# SECURITY WARNING: do not run with debug turned on in production!
DEBUG = config('DEBUG')
```

### Getting the API-key
To obtain the API key, navigate to the [Currencylayer](https://currencylayer.com/product) website and create an account with them. Once the account is set up, you can log in and obtain an API key. However, you need to pay for the advanced packages.

> There are endpoints that one cannot access when using the free package. For instance, you can only view the live and historical rates of the default currency,  USD,  in the basic plan.

Copy the API key, then head over to the `.env` file and insert it as one of the global variables.

```env
API_KEY='YOUR API KEY'
```

### Building the website views
In Django, views are packages that pass the data from the API or database to the HTML file where the data is consumed. Each view should be returned after the data is processed in a function.

In the `converter` folder, you should have a file named `views.py`. Then, add the following snippet to import the libraries we need to use.

```py
from Django.shortcuts import render
from decouple import config
import requests

# Create your views here.
key = config('API_KEY')
url = config('BASE_URL')
```

### Live rates data view
Next, create a function-based view called `show-live`, which handles the live rates of a given currency. Finally, we pass the template name and the response data from the API to the template in the same function.

```py
def show_live(request):
    # define the temlate name
    template = 'live.html'

    # pass api response to a variable
    response = requests.get(f"{url}/live?access_key={key}")

    # response data converted to json
    data = response.json()
    quotes = data['quotes']
    context = {'quotes': quotes}

    # Pass data to the template
    return render(request, template, context)
```

#### Currency exchange view
This view is responsible for handling currency exchange from one currency to another and showing the rate of exchange.

```py
def index(request):
    # define the temlate name
    template = 'index.html'
    if request.method == 'POST':

        # first currency
        currency1 = request.POST.get('currency1', False)

        # second currency
        currency2 = request.POST.get('currency2', False)

        # amount to exchnage
        amount= request.POST.get('amount', False)

        response = requests.get(f"{url}/convert?access_key={key}&from={currency1}&to={currency2}&amount={amount}")

        # response data convterted to json
        data = response.json()
        rate = data['info']['quote']
        amt = data['result']
        context = {"rate": rate, 'amount': amt}

        # render the template with the data passed to it
        return render(request, template, context)
    else:
        return render(request, template)
```

#### Historical exchange rates view
This view is responsible for finding the exchange rates of a given currency at a particular date. First, the user supplies the date, then the API fetches the exchange rates for that date.

> The exchange rates of other currencies can be found in the other API plan and not the basic plan.

```py
def show_historical(request):
    # specify the templaet name
    template = 'historical.html'

    if request.method == 'POST':
        # extract date from the post request
        date = request.POST.get('date', False)   

        # pass api response to a variable
        response = requests.get(f"{url}/historical?access_key={key}&date={date}")

        # convert the response data to json
        data = response.json()
        quotes = data['quotes']
        context = {'quotes': quotes}

        # Passing the data to the temlate
        return render(request, template, context)
    else:
        return render(request, template)
```

### Designing the templates
Templates define how the application's user interface will appear. It is composed of HTML and CSS.

In the `templates` folder, create three files as follows:

```bash
├── templates
│   ├── base.html
│   ├── historical.html
│   ├── index.html
│   └── live.html
```

#### The base HTML file
The `base.html` file contains the overall structure of the web page that remains similar to other pages. This method spares the programmer from having to re-write similar code.

In the `base.html` file, add the snippets below in the body section of the HTML file.

```html
<!-- Nvaigation bar -->
<nav class="navbar navbar-expand-lg navbar navbar-dark" style="background-color: #02a86b;">
    <div class="container-fluid">
        <a class="navbar-brand" href="{% url 'index' %}">CONVX</a>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                <li class="nav-item">
                    <a class="nav-link" href="{% url 'live' %}">Live</a>
                    </li>
                    <li class="nav-item">
                    <a class="nav-link" href="{% url 'historical' %}">Historical</a>
                    </li>
                    <li class="nav-item">
                    <a class="nav-link" href="{% url 'index' %}">Exchage</a>
                    </li>
            </ul>
        </div>
    </div>
</nav><br><br>

<!-- container -->
<div class="container">
    <div class="row">
        {% block content %}

        {% endblock %}
    </div>
</div>
```

#### The entry point HTML file
This file appears at the application's entry point. It is rendered on the default page once the application loads. It also contains the page where the conversion of the currencies occurs.

In the `index.html` file, add the following code snippets:

```html
 {% extends 'base.html' %}
 
 {% block content %}
 <!-- enter text to granlate area -->
 <div class="col-sm-6">
    <div class="card">
        <div class="card-header" style="background-color: #02a86b;">
            <h5 class="card-title text-light">Fill the Details to convert</h5>
        </div>
        <div class="card-body">
            <form action="{% url 'index' %}" method="POST">
                {% csrf_token %}
                <div class="form-group">
                    <label for="format">Currency 1:</label>
                    <select class="form-control" name="currency1">
                        <option value="USD" selected >USD</option>
                        <option value="UYU">UYU</option>
                        <option value="VND">VND</option>
                        <option value="ZAR">ZAR</option>
                        <!-- Other options are available in the github link -->
                    </select><br>
                    <label for="format">Currency 2:</label>
                    <select class="form-control" name="currency2">
                        <option value="AED">AED</option>
                        <option value="ARS">ARS</option>
                        <option value="AUD">AUD</option>
                        <option value="USD" selected >USD</option>
                    </select>
                </div>
                <br>
                <div class="form-group">
                    <label for="exampleFormControlTextarea1">Enter Amount</label>
                    <input class="form-control" id="amount-one" name="amount" value="1" rows="5"></input>
                </div>
               <br>
               <br>
                <button type="submit" class="btn btn-primary">Submit</button>
            </form>
            <br>
            <div id="rate" style="text-align-last: right; font-size: 20px; font-weight:900">
                Conversion Rate: {{ rate }}
            </div>
        </div>
    </div>
</div>

<!-- Transtalated text area -->
<div class="col-sm-6">
    <div class="card">
        <div class="card-header bg-primary">
            <h5 class="card-title text-light">Equivalent Amount</h5>
        </div>
        <div class="card-body">  
            <!-- Notice how we bring in the response data sent as we render the same page by the request -->
            <textarea class="form-control "name="translated" id="translated" cols="30" rows="8" style="text-align-last: right; font-size: 30px; font-weight:900">
                    {{ amount }}                              
            </textarea>                  
        </div>
    </div>
</div>

{% endblock %}
```

> The currency selection options are available in the GitHub link provided at the end of the tutorial.

![Live rates](/engineering-education/currency-layer-api-in-django/most-recent-rates.png)

#### Historical data HTML file
This file renders the historical data passed from the `def historical()` function to display rates on a given date.

In the file named `historical.html`, add the following snippets:

```html
{% extends 'base.html' %}

{% block content %}
<div class="col-sm-12">
    <div class="card">
        <div class="card-header" style="background-color: #02a86b;">
            <h5 class="card-title text-light">Historical Breakdown</h5>
        </div>
        <br>
        <div class="card-body">
            <form action="{% url 'historical' %}" method="POST" role="form">
                {% csrf_token %}
                <div class="form-group">
                    <label for="date">Select date:</label>
                    <input class="form-control" type="date" id="date" name="date"><br>
                    <button type="submit" class="btn btn-primary">Submit</button>
                    <br>
                </div>
            </form>
            <table class="table table-bordered">
                <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Currency</th>
                    <th scope="col">Rate</th>   
                </tr>
                </thead>
                <tbody>
                {% for key, value in quotes.items %}
                <tr>
                    <td>{{ forloop.counter }}</td>
                    <td>{{key}}</td>
                    <td>{{value}}</td>                                          
                </tr>
                {% endfor %}
                </tbody>
            </table>
        </div>
    </div>
</div>
{% endblock %}
```

![Date selection](/engineering-education/currency-layer-api-in-django/date-selection.png)

![Rate on a specific date](/engineering-education/currency-layer-api-in-django/rate-on-specific-date.png)

### Working on the URLs
In Django, URLs are specified in the `urls.py` file. The URLs determine where to fetch a particular resource in the application.

The main `urls.py` file is found in the main application folder in the same directory as the `settings.py` file.

Add the following code snippets to the file to facilitate the routing and rendering of the HTML templates.

```py
from Django.contrib import admin
from Django.URLs import path, include
from converter import views
from Django.conf import settings
from Django.conf.URLs.static import static

urlpatterns = [
    # admin panel url
    path('admin/', admin.site.urls),

    # index page url
    path('', views.index, name="index"),

    # historical exchange rates page
    path('historical/', views.show_historical, name="historical"),

    # live rates page
    path('live/', views.show_live, name="live")
]
```

### Application clean-up
In this section, we will do a clean-up on our application to ensure that it conforms to the development best practices.

The first step is to add all the confidential and autogenerated files into a `.gitignore` file. The files remain on the local machine when the project is pushed to GitHub.

In the application's root directory, create a file called `.gitgnore`, then add the following code snippet.

```.gitignore
.env
venv/
settings.ini
**/__pycache__/**
**__init__.py/**
__pycache__/
```

The next step is to save the list of our libraries and project dependencies such that when deploying the application, they are automatically installed with a single command.

Run the following command in the terminal to copy all the installed dependencies into a file.

```py
pip freeze > requirements.txt
```

> When the application is installed in a new environment, the programmer runs the command `pip install -r requirements.txt.`

### Running the application
Start the virtual environment as illustrated before, then execute the following command to run the server to run the application.

```bash
python manage.py runserver
```

Once all system checks have been completed and the server is up and running, go to `http://127.0.0.1:8000/` to view the site.

The site should have all the pages shown below. You can try exchanging currencies, viewing historical data of different currencies, and checking the live rates.

![Selecting a currency](/engineering-education/currency-layer-api-in-django/selecting-currency.png)

![Currency conversion](/engineering-education/currency-layer-api-in-django/conversion.png)

You can find the files for this project at [this link](https://github.com/mercymeave/currency-xchange-guide)

### Conclusion
This tutorial showed readers how to create an app that converts currencies in real time. In addition, it provided a roadmap for using APIs in Django and working with the Currencylayer API.

The article should be a starting point for working with financial APIs in Django applications.

---
Peer Review Contributions by: [Jerim Kaura](/engineering-education/authors/jerim-kaura/)
