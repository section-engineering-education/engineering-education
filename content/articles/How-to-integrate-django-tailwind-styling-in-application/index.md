
### Introduction
Every application requires good stylings for better and more readable content. Over the years, the Cascadian Styles Sheet, CSS has dominated before frameworks came into existence.
<!--more-->
In this tutorial, we will be covering the better way to style Django applications using a framework called `django-tailwind`. This was made to make use of the `tailwind` styling classes in Django projects.

### Table of Contents
- [Prerequisites](#prerequisites)
- [Project setup](#project-setup)
- [Integrating django-tailwind](#integrating-django-tailwind)
- [Making route for the project](#making-route-for-the-project)
- [Views for the project](#views-for-the-project)
- [Conclusion](#conclusion)



### Prerequisites
To follow along with this tutorial, you should meet the following requirements.
- An understanding of a Python programming language.
- A pre-installed IDE, preferably [Visual Studio Code](https://code.visualstudio.com/download).
- [Python](https://python.org) installed.
- [Node](https://nodejs.org/en//) installed.
- An understanding of [Django](https://docs.djangoproject.com/en/4.0/).


### Project setup
We will start this tutorial by setting up a project structure in Django's way of doing things. First of all, we have to design where we can place the project by following the below bash commands.

Open your git bash, and type out the following commands.

```bash
cd 
cd Desktop
mkdir project
cd project
```

You just checked the working directory, and ensure you are on the `Desktop` directory. You also made a directory called `project`, change to it.

Now let us make a virtual environment for the project, and install the required dependencies.

```bash
python -m venv env
source env/Scripts/activate
pip install django django-tailwind
pip freeze > requirements.txt
```

We have configured the environment for the project, installed all dependencies, and keep track of them via the `requirements.txt` file. 

Furthermore, let us spin up the Django server, install some apps, and add them to the project settings.

```bash
django-admin startproject myprojectapp
python manage.py startapp comment
python manage.py runserver
```

The `myprojectapp` project was started and made `comment` app too. We also started the Django server with the command `python manage.py runserver`.  If you open your browser to `127.0.0.1:8000`, you should confirm what we have in the image below.


![First Page](/engineering-education/how-to-integrate-django-tailwind-styling-in-application/firstpage.png)


### Integrating django-tailwind 

The `django-tailwind` framework required a special app that contains all of its dependencies. This framework allows us to style the application using `tailwind` classes in the templates. But before that, we would have to initialize it with the code snippet below;

```bash
python manage.py tailwind init
```

Note:) The default name to the tailwind app is `theme`. You can change it if you like but ensure you modify the name in the `settings.py` file.

Now open to the project settings, navigate to the `INSTALLED_APPS`, and add the below snippets.

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

Furthermore, the `tailwind` dependency has to be installed. However, installing this will require a `node` package manager called `npm` which would have come with the node package.

```
python manage.py tailwind install
```

Note:) In case the installation could not find the `npm` package on your system, then add the below snippet to your `settings.py` file.

If your operating system is either `Linux` or `MacOs`, then add this below.

```
NPM_BIN_PATH = '/usr/local/bin/npm'
```

Otherwise, this works for `Windows` operating system. 

```
NPM_BIN_PATH = r"C:\Program Files\nodejs\npm.cmd"
```

In addition, we have to add a library that takes care of automatic page refreshing for the styling to take effect in the development phase. Add the below line to `INSTALLED_APPS` inside `settings.py` file.

```
'django_browser_reload'
```

Also, add this into the middleware of the same settings file. This will help to insert the script tag on every HTML response perhaps `DEBUG` is turned `True`.

```
  "django_browser_reload.middleware.BrowserReloadMiddleware",
```

### Making route for the project

Next is to make a route for the middleware added in the root `urls.py`. This route will automate the reloading of the browser for the styling to take effect. Now copy the snippet below, and attach it with the `urlpatterns` list inside the root URL file. 

Note:) Add the `include` parameter to the `django.urls import path` command.

```
path("__reload__/", include("django_browser_reload.urls")),
```

Let us configure the routing for the index page. Remember we have made an app called `comment` earlier, now go into the folder and make `urls.py` file. Having made the file, copy the following code into it. 

```Python
from django.urls import path
from  .  import views

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

Open the `views.py` file inside the `comment` app, and type the following.

```Python
from django.shortcuts import render

# Create your views here.

def homepage(request):
    return render(request, 'base.html')
```

Note:) The `base.html` can be found at the directory `theme/templates/base.html`.

Finally, we will start the development server with the commands below in a separate terminal.

```bash
python manage.py tailwind start
python manage.py runserver
```

Open to the `127.0.0.1:8000`, and you should confirm the image below as the first page of the `django-tailwind` framework.


![Django Tailwind](/engineering-education/how-to-integrate-django-tailwind-styling-in-application/tailwind-init.png)


### Conclusion
In this tutorial, we integrated the framework called `django-tailwind` purposely for styling the Django application. Following this tutorial, you can style any Django app by writing the `tailwind` classes in the HTML syntax.
Thank you for reading!
