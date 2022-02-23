---
layout: engineering-education
status: publish
published: true
url: /paytm-loading/
title: Building a Paytm Loading Effect from Scratch
description: This article takes the reader through the benefits of a custom preloader and how to use various CSS properties to build a custom Paytm loading animation from scratch.
author: phina-kersly
date: 2022-02-17T00:00:00-17:00
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/paytm-loading/hero.png
    alt: Paytm Loading Image Example
---
A good user interface is composed of several parameters. One of the parameters is an appealing loading effect. Loading effects are crucial in both mobile and web applications. 
<!--more-->
### Introduction
The benefit may not be seen when the internet speed is good and the web content is light; however, in a case where web pages are heavy in content the advantage may be apparent and brings the most benefit to the user interface. 

### Table of content
This article requires the reader to have an understanding of the following tools and languages:
- Django web development framework
- Good understanding of HTML and CSS
- A code editor, most preferably Visual Studio Code

### Website preloader
A preloader is a static picture, animation, or a Graphics Interchange Format (GIF) usually displayed on the screen while the specific webpage content is loading. Usually, preloaders are essential in showing the user that the content is still loading instead of a blank screen. 

According to research by [Google on the benefits of increasing the speed of a website](https://www.marketingdive.com/news/google-53-of-mobile-users-abandon-sites-that-take-over-3-seconds-to-load/426070/), they discovered that about 53% of website users would abandon a site if it took more than 3 seconds to load. This problem worsens when the page is blank. Therefore, the use of preloaders can mitigate this problem.

### Benefits of a preloader
While to most people, website preloaders are just fancy animations that make sites user-friendly, these tools are compelling in reducing the revenue caused by unreliable networks and developing a meaningful relationship with the content consumers of your website.

Additionally, the user experience brought about by these preloaders increases the engagement of the users and the website and maintains the website's professional image. The good look and feel of the site in combination with the loader will most likely raise the customers' waiting threshold until the page content is fully loaded.

Preloaders can be used to portray the image of the company. It can be used as a branding asset when designed to suit the company in color, shape, animation, and letters. It makes the company or organization instantly recognizable.

### Transition from the loading spinner 
Most websites have used loading spinners as the base webpage preloader in the recent past. However, according to a post by [Suleiman Ali](https://uxdesign.cc/stop-using-a-loading-spinner-theres-something-better-d186194f771e?gi=4d79464ee5c3) in 2017, loading spinners have become dull and have reduced the application's user interface experience. In addition, Ali argues that spinners are stagnant and lack the creativity required to develop websites over time.

For the reasons mentioned above, most developers opt for custom-made loaders for their websites. These loaders are easy to customize to match the website's theme color and look. Paytm is an example of a company that uses a custom preloader. This article explores preloaders and builds one that emulates Paytm's from scratch.

### Article overview
We will use the Django framework to create a single-page application that displays the loader when accessed. The loader will be purely built using CSS. The animation will depict Paytm's loading animation but may differ in color.

In building the loader from scratch, we must understand the various CSS concepts and properties. Understanding and appreciating these are the foundations for creating modern and intuitive CSS preloaders and animations.

### Setting up the application
Navigate to your desired folder, then create a virtual environment using the command below:

```bash
virtualenv venv
```

> You should take note that this command will only execute if you have virtualenv installed and set up on your computer. You can download it from [this link](https://virtualenv.pypa.io/)


Use the command below to activate the virtual environment to start installing the dependencies required for the application development. 

```bash
source venv/bin/activate
```

Once your virtual environment is up and running, we need to install the Django framework and build the application. Use the command below to install the Django framework.

```bash
pip install Django
```

The next step is to start a project that we will work on. This project can be named with any name of the developer's choice. Django automatically creates the project for us when we execute the command below:

```bash
Django-admin startproject paytm-loading
```

This command creates a new project with the following architecture:

```bash
paytm-loading/
    manage.py
    paytm-loading/
        __init__.py
        settings.py
        urls.py
        asgi.py
        wsgi.py
```

The next step is to start a new application that we will work on. An application in Django is like a sub-component of the entire project. Use the command below to create a new app called `loader`.

```bash
python manage.py startapp loader
```

The newly created application should have the folder organization below:

```bash
loader/
    __pycache__
    migrations
    templates
    __init__.py
    admin.py
    apps.py
    models.py
    tests.py
    views.py
```

Be sure to add the newly installed loader application to the list of installed apps in the `settings.py` file above.

```py
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'loader'
]
```

### The templates folder
Every Django application needs a `templates` folder in the application's root folder where all the view files for the application are stored. The views are the components displayed on the webpage for the website's users. 

The next step is to set up the accessed URL to display a specific template in the template folder. In the `urls.py` file found in the `paytm-loading` folder, add the following snippets to allow the index page to be viewed as the application's entry point.

```py
from Django.contrib import admin
from Django.URLs import path
from loader import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', views.index,  name="index"),
]
```

In the templates folder, create a new file called `index.html` that will contain our HTML code. Then head over to the `views.py` file and add the following snippets:

```py
from Django.shortcuts import render

# Create your views here.
def index(request):
    template = 'index.html'
    return render(request, template)
```

### Working on the static files
Static files in Django are the files that are primarily used to enhance the user interface, including the fonts, CSS, and JavaScript. These files form the foundation of any modern website. 

Given Django's flexibility around working with these files, most developers prefer Django when working with static files.

When working with static files in Django, it is crucial to place the folder at the root of the application so that all the sub-applications of Django can access the folder. 

For instance, we will create a new folder in the application's root folder and name it `static` in our application.

Then, in the `settings.py` file, add the snippets below:

```python
# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/4.0/howto/static-files/

STATIC_URL = '/static/'
MEDIA_URL = '/images/'

STATICFILES_DIRS = (os.path.join(BASE_DIR, 'static'),)
```

The snippets above show that the static files are stored in the application's main URL in the root folder so that any sub-application can access its sub-folders and files.

At this point, we are almost done with the setup. We need to load the static folder into our templates so that each HTML file can access the files in the `static` folder.


Since we are only working with a single template file, we will add it to the `index.html` file as shown below:

```html
{% load static %}
```

### The main template file
Now that we have set up every component, we can start building the loader in the following way:
We need a container in the `index.html` file to contain all the other components.

We have another `div` element that wraps up the individual "bouncing balls," as shown in Paytm's loading animations.

We have several `span` elements that form the "balls". The span elements will have the most styling as they form the base of the user interface concept discussed in this article.

The final `index.html` file should look like below. You can either create an entirely new file with your configurations or copy and paste the following code snippet into your `index.html` file.

```html
{% load static %}

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="{% static 'css/main.css' %}">
    <title>Loading Animation</title>
</head>
<body>
    <div class="container">
        <div class="box">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
        </div>
    </div>
</body>
</html>
```

### Core concepts of the CSS styling
This loading effect tutorial is primarily CSS-based. To work well with the CSS, we need to understand the concepts involved and make the CSS special. The list of the CSS concepts is as discussed below.

#### Keyframes
According to [Developer Mozilla Organization](https://developer.mozilla.org/en-US/docs/Web/CSS/@keyframes), keyframes are rules that control the intermediate steps in an animation sequence. They control the starting and ending points of an animation action. They tell you the action of a given frame and when it occurs.

Keyframes are used in animating at advanced levels where specific attributes need to be changed at given instances of the animating process.

When we specify a CSS style inside a keyframe rule, the animation will slowly change from the current style and migrate to the following style defined.

#### CSS Transformations
A CSS transformation allows you to change the property of an element along a specified dimension. Generally, CSS transformation modifies the linear coordinate of an element in the website window.

The significant parameters for transformation are rotation, translation, skewing, and scaling. However, the implementation of this tutorial will only focus on translation.

#### N-th child in css
Consider a list of similar sub-elements in a given element for instance a `<li></li>` elements. We might need to style an individual list element differently. We use the `:nth-child()` property for such a case. It takes a single style and applies it to all elements in a given list that match the specified pattern.

### Working on the styles
At this point, you should understand how different components are applied in this tutorial. First, we need to create a CSS file and add our CSS snippets to style the webpage appropriately. 

Then, in the static folder created at the application's root folder, create a new folder called `CSS` then another file in the CSS folder called `main.css`. Here is where all the styling will be scripted.

First, we specify the color of the body element. I prefer using section.io theme color. So, in the `main.css` file, add the snippets below to add the color:

```css
body{
    background: #02a86b;
}
```

Next, style the container that holds every other element in the webpage and style it according to the parameters specified in the snippet below:

```css
.container{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
```

The next step is creating a wrapper that contains the dots animated across the screen to complete the loading effect. These dots are formed by having the <span> elements have the same height and width, giving it a border-radius of 50% to make them circular.

```css
.box{
    position: relative;
    width: 120px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
}

span{
    display: block;
    width: 20px;
    height: 20px;
    background-color: #fff;
    border-radius: 50%;
    animation: effect 1s infinite linear alternate;
    transform: scale(0);    
}
```

We use the `infinite` property to animate the dots after a page is reloaded continually. We start with a scale of 0 and advance the appearance using keyframes as shown below:

```css
@keyframes effect{
    0% {
        transform: scale(0.5);
    }

    50%{
        transform: scale(0.8);
    }

    100% {
        transform: scale(1);
    }
}
```

To ensure that each dot is scaled differently at every instance, we use the `nth child` property discussed above. Each dot is given a short period before it is scaled gradually.

```css
span:nth-child(1){
    animation-delay: .1s
}
span:nth-child(2){
    animation-delay: .3s
}
span:nth-child(3){
    animation-delay: .5s
}
span:nth-child(4){
    animation-delay: .7s
}
span:nth-child(5){
    animation-delay: .9s
}
```

Your final loader should be up and running at the end of the styling and following the steps. Notice that this loading animation can be modified and used on the actual webpage before the main content is fetched from the database server. You can find the entire code snippet from [here](https://github.com/phinaomondi/loader) and try the application at [this](https://loader-app.herokuapp.com/) link.


### Conclusion
This tutorial was a comprehensive headstart for working with CSS on an actual website. We began by understanding the benefits of using loading animations and the level of risk that comes when a website has no suitable animation. Then, we discussed how to build a loading animation effect from scratch, keeping the Paytm one in mind.

We looked at various aspects of CSS used to model animation and varied the different parameters required to work effectively. Finally, we worked out all these concepts by implementing the animation in a Django application, one of the most popular web development frameworks.

---
Peer Review Contributions by: [Mercy Meave](/engineering-education/authors/mercy-meave/)
