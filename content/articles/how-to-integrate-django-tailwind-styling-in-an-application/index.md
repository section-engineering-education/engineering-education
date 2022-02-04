---
layout: engineering-education
status: publish
published: true
url: /how-to-integrate-django-tailwind-styling-in-an-application/
title: How to Integrate Django-Tailwind Styling in an Application
description: This tutorial will discuss a better way to style Django applications using a framework called django-tailwind.
author: umoh-mercy
date: 2022-02-04T00:00:00-10:30
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/how-to-integrate-django-tailwind-styling-in-an-application/hero.jpg
    alt: How to Integrate Django-Tailwind Styling in an Application Hero Image
---
Every application requires good styling for better and more readable content. Over the years, the Cascading Style Sheets (CSS), has dominated before frameworks came into existence.
<!--more-->
In this tutorial, we will be discuss a better way to style Django applications using a framework called `django-tailwind`. This was made to make use of the `tailwind` styling classes in Django projects.

### Table of contents
- [Prerequisites](#prerequisites)
- [Project setup](#project-setup)
- [Integrating django-tailwind](#integrating-django-tailwind)
- [Making route for the project](#making-route-for-the-project)
- [Views for the project](#views-for-the-project)
- [Conclusion](#conclusion)

### Prerequisites
To follow along with this tutorial, you should have:
- An understanding of the Python programming language.
- A pre-installed IDE, preferably [Visual Studio Code](https://code.visualstudio.com/download).
- The [Python](https://python.org) programming language installed.
- [Node.js](https://nodejs.org/en//) installed.
- An understanding of the [Django](https://docs.djangoproject.com/en/4.0/) framework.

### Project setup
We will start this tutorial by setting up a project structure in Django's way of doing things. First off, we have to design a storage location where we can place the project.

Open your git bash, and type out the following commands:

```bash
cd
cd Desktop
mkdir project
cd project
```

We checked the working directory and ensure you are on the `Desktop` directory. You also made a directory called `project`, change to it.

Now let us make a virtual environment for the project and install the required dependencies as shown below:

```bash
python -m venv env
source env/Scripts/activate
pip install django django-tailwind
pip freeze > requirements.txt
```

We have configured the environment for the project, installed all the dependencies, and are keeping track of them via the `requirements.txt` file.

Furthermore, let us spin up the Django server, install some apps, and add them to the project settings.

```bash
django-admin startproject myprojectapp
python manage.py startapp comment
python manage.py runserver
```

The `myprojectapp` project was started and made the `comment` app as well. We also started the Django server with the command `python manage.py runserver`. 

If you open your browser to `127.0.0.1:8000`, you should confirm what we have in the image below:

![First page](/engineering-education/how-to-integrate-django-tailwind-styling-in-an-application/first-page.png)

### Integrating django-tailwind
The `django-tailwind` framework requires a special app that contains all its dependencies. This framework allows us to style the application using `tailwind` classes in the templates. 

But before that, we would have to initialize it with the code snippet below:

```bash
python manage.py tailwind init
```

> The default name to the tailwind app is `theme`. You can change it if you like but ensure you change the name in the `settings.py` file.

Now open to the project settings, navigate to the `INSTALLED_APPS`, and add the snippets below:

```
'tailwind'
'theme'
'comment'
```

In addition, it is mandatory to register the app name in the `settings.py` right below the file, and also specify the internal IP address.

```
TAILWIND_APP_NAME = 'theme'
INTERNAL_IPS = [
    "127.0.0.1",
]
```

Furthermore, the `tailwind` dependency has to be installed. However, installing this will need a `node` package manager called `npm` which would have come with the node package.

```
python manage.py tailwind install
```

> In case the installation could not find the `npm` package on your system, add the snippet below to your `settings.py` file.

If your operating system is either `Linux` or `MacOs`, then add the snippet below:

```
NPM_BIN_PATH = '/usr/local/bin/npm'
```

Otherwise, this works for `Windows` operating system:

```
NPM_BIN_PATH = r"C:\Program Files\nodejs\npm.cmd"
```

In addition, we have to add a library that takes care of automatic page refreshing for the styling to take effect in the development phase. Add the line below to the `INSTALLED_APPS` inside the `settings.py` file.

```
'django_browser_reload'
```

Also, add this into the middleware of the same settings file. This will help to insert the script tag on every HTML response in case `DEBUG` is turned `True`.

```
"django_browser_reload.middleware.BrowserReloadMiddleware",
```

### Making route for the project
Next, we have to make a route for the middleware added in the root `urls.py`. This route will automate the reloading of the browser for the styling to take effect. 

Now copy the snippet below and attach it with the `urlpatterns` list inside the root URL file.

> Add the `include` parameter to the `django.urls import path` command.

```
path("__reload__/", include("django_browser_reload.urls")),
```

Let us configure the routing for the index page. Remember we have made an app called `comment` earlier, now go into the folder and create the `urls.py` file. Having made the file, copy the following code into it.

```Python
from django.urls import path
from.  import views

urlpatterns = [
    path('', views.homepage, name="index")
]
```

Navigate into the `urls.py` for the root that is the `myprojectapp` folder, attach the file made above to the `URL patterns` list. This will allow the root to keep track of URLs matching the app.

```Python
path('', include('comment.urls')),
```

### Views for the project
Furthermore, we will be making the first views for the `comment` app. This will be done by using a simple functional view named `index` based on what we used in the route.

Open the `views.py` file inside the `comment` app and type the following:

```Python
from django.shortcuts import render

# Create your views here.

def homepage(request):
    return render(request, 'base.html')
```

> The `base.html` file can be found at the `theme/templates/base.html` directory.

Finally, we will start the development server using the commands below in a separate terminal.

```bash
python manage.py tailwind start
python manage.py runserver
```

Open the `127.0.0.1:8000` address and confirm the image below as the first page of the `django-tailwind` framework.

![Django Tailwind](/engineering-education/how-to-integrate-django-tailwind-styling-in-an-application/tailwind-init.png)

### Conclusion
In this tutorial, we integrated the framework called `django-tailwind` purposely for styling the Django application. Following this tutorial, you can style any Django app by writing the `tailwind` classes in the HTML syntax.

Happy coding!

---
Peer Review Contributions by: [Dawe Daniel](/engineering-education/authors/dawe-daniel/)