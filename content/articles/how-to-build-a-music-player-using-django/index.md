---
layout: engineering-education
status: publish
published: true
url: /how-to-build-a-music-player-using-django/
title: How to Build a Music Player using Django
description: This tutorial introduces the reader to the Django web framework and explore its ORM and MVT capabilities by engaging him/her in making use of Django to build a simple music player for their personal use.
author: onojakpor-ochuko
date: 2021-02-15T00:00:00-13:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/how-to-build-a-music-player-using-django/hero.jpg
    alt: How to Build a Music Player Using Django Hero Image
---
Have you ever wanted to build a music player web application?. If your answer is yes then this article is for you. I love how Django's ORM makes it so easy to work with a database along with the views (i.e the functional backend of the app) and the template files all connected with the Django MVT (i.e Model View Template) architecture. 
<!--more-->
Django is a perfect choice when building a music player web application, and I would be happy to walk you through every step of the way.

This article introduces the reader to the Django web framework and explore its ORM and MVT capabilities by engaging him/her in making use of Django to build a simple music player for their personal use.

We expect readers to have some experience with HTML, CSS, and Javascript as this article will be mostly focusing on the backend implementation.

If you are new to Django and want to get started with it, you can refer to the [official Django documentation](https://docs.djangoproject.com/en/3.1/).

### Prerequisites
Install Python from [python.org](https://www.python.org/). 

Then run the following to install the required packages:

```bash
pip install django
pip install pillow
```

The `pillow` package is a Python image handling library which we'll use to save cover images for the music in the database.

### Django ORM
Object-Relational Mapping (ORM) is a method that helps you question and control statistics from a database, the use of an object-orientated paradigm. 

When speaking about ORM, we are referring to a library that implements the Object-Relational Mapping technique, the phrase "an ORM".

An ORM library is an everyday library written in your language of choice that encapsulates the code required to control the data so that you do not use raw SQL queries anymore. You engage with an object immediately within the same language you are utilizing.

### MVT Architecture
MVT (Model View Template) is a software program layout sample that's a group of 3 elements: Model, View, and Template. The Model allows dealing with the database. It is a data access layer that handles the information in the database.

The Template is a presentation layer that handles all the User Interface parts. The View executes the logic and interact with the model to carry data and renders the template.

Although Django follows the MVC pattern, it still continues its conventions, so control is taken care of through the framework itself.

There isn't any separate controller and the entire framework is primarily based on Model, View, and Template. That's why it's largely known as the MVT framework.

In the MVC architecture, a user sends a request for a resource to Django, Django works as a controller and checks for the available resource in the URL.

If a URL is mapped, a view is called that interact with the model and template, it renders a template.

Django responds to the user and sends a template as a response.

The main distinction among the 2 styles is that Django itself looks after the Controller part (Software Code that controls the interactions among the Model and View), leaving us with the template. The template is an HTML record combined with Django Template Language (DTL).

Here is an easy diagram that indicates the MVT structure in Django:

![mvt structure](/engineering-education/how-to-build-a-music-player-using-django/mvt.png)

[Image source](https://www.javatpoint.com/django/images/django-mvt-based-control-flow.png)

### Creating our Django App
Let's begin by creating a Django project from any directory using our command-line interface:

```bash
# create our project
django-admin startproject MusicPlayer

# change directory to project
cd MusicPlayer

# create our app
django-admin startapp App
```

The commands above should provide you with a directory structured as seen in the image below:

![directory structure](/engineering-education/how-to-build-a-music-player-using-django/structure.PNG)

Now go to the "MusicPlayer" directory and edit our *settings.py* file by adding our App to the list of installed apps as seen below.

```python
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'App'
]
```

Now let's create our static and templates folders in our APP directory. The template folder will house our HTML files, while the static folder will house our CSS, Javascript, and other static files. 

To do this, run the command below on your command-line.

```bash
# changing directory to our app
cd App

# creating  the static and templates folders
mkdir templates
mkdir static
```

In the templates folder, create a new file "index.html" and add the HTML code below:

```HTML
{% load static %}

<!DOCTYPE html>
<html lang="en">
 <head>
  <meta charset="utf-8"/>
  <title>
   My Music Player
  </title>
  <link href="https://netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.css" rel="stylesheet"/>
  <link href="https://cdnjs.cloudflare.com/ajax/libs/mediaelement/4.2.7/mediaelementplayer.min.css" rel="stylesheet"/>
  <link href="{% static './style.css' %}" rel="stylesheet"/>
 </head>
 <body>
  <!-- partial:index.partial.html -->
  <html>
   <head>
    <meta charset="utf-8"/>
    <title>
     Flat music player
    </title>
   </head>
   <body>
    <div class="contain">
     <div class="container">
      <div class="music-player">
        {% for item in page_obj %}
       <div class="cover">
        <img alt="" src="{{item.image.url}}"/>
       </div>
       <div class="titre">
        <h3>
         {{item.artist}}
        </h3>
        <h1>
         {{item.title}}
        </h1>
       </div>
       <center><a href="{% if page_obj.has_previous %}?page={{ page_obj.previous_page_number }}{% endif %}"><i class="fa fa-step-backward fa-2x"></i></a> &nbsp; &nbsp; &nbsp; <a href="{% if page_obj.has_next %}?page={{ page_obj.next_page_number }} {% endif %}"><i class="fa fa-step-forward fa-2x"></i></a></center>
       <div class="lecteur">
        <audio class="fc-media" style="width: 100%;">
         <source src="{% if item.audio_file %}{{item.audio_file.url}} {% else %} {{item.audio_link}} {% endif %}" type="audio/mp3"/>
        </audio>

       </div>
       {% endfor %}
      </div>
     </div>
    </div>
   </body>
  </html>
  <!-- partial -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js">
  </script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/mediaelement/4.2.7/mediaelement-and-player.min.js">
  </script>
  <script src="{% static './script.js' %}">
  </script>
 </body>
</html>
```

In the code above we used [Bootstrap](https://getbootstrap.com/), which we imported using the CDN link (as seen in the head tag) to create the HTML attributes for our music player and we made use of jinja.  Which is a Python web template engine to render our query set object in our **"page_obj"** context that we are going to define in our *views.py* file. 

We are also importing the `mediaelement.js` plugin that ensures that the browser can play our media files even on browsers that do not support HTML5 attributes.

The next and previous links in our HTML code will also render the pagination attributes which will separate our songs into a page per song format. This pagination will reflect after we have set the **"page_obj"** in our **views.py** file later in this tutorial.

In the static folder create two new files: *script.js* and *style.css*. These are the static files that the HTML template file is going to use. 

In the *script.js* file, add the following code as seen below:

```JavaScript
var audio = {    
    init: function() {        
    var $that = this;        
        $(function() {            
            $that.components.media();        
        });    
    },
    components: {        
        media: function(target) {            
            var media = $('audio.fc-media', (target !== undefined) ? target : 'body');            
            if (media.length) {                
                media.mediaelementplayer({                    
                    audioHeight: 40,
                    features : ['playpause', 'current', 'duration', 'progress', 'volume', 'tracks', 'fullscreen'],
                    alwaysShowControls      : true,
                    timeAndDurationSeparator: '<span></span>',
                    iPadUseNativeControls: true,
                    iPhoneUseNativeControls: true,
                    AndroidUseNativeControls: true                
                });            
            }        
        },
            
    },
};

audio.init();
```

Edit the "style.css" file, add the following code from this [GitHub Gist](https://gist.github.com/Chukslord1/f65093cd9b16fff56e68903259887299).

The "script.js" file is the javascript file that defines how our music is played. When a link for the music stored in the database is passed to the music player, this code controls how the music is used. This includes how it is 'played', paused' or 'displayed' along with  its 'duration', 'progress', 'volume', and 'tracks'. 

To do this, we started by creating a variable function `audio` that controls all the components of the music link we passed by calling the `components` method. 

We then defined the `components` method and initialized a variable function `media` in it, that uses the music link passed earlier. The media function then carries out the following:

- The `media` function checks if the length of the music in the music link is `undefined`. If this is the case then no data is passed to the HTML page. However, if the length of the music is defined or greater than `0`, then the media components can be set and passed to the body. 

- Then, it sets the value of the `audioHeight`. In this case, the `audioHeight` attribute (which is the default volume) is set to 40.

- Next, it sets the `features` attribute that carries all the allowed controls for the audio file.

- Then, it sets the `alwaysShowConttrols` attribute that specifies if the controls in the `features` attribute are shown for the users to see or not. In this case we set the `alwaysShowConttrols` to true. 

- The `media` function also sets the native device attributes (`iPadUseNativeControls`, `iPhoneUseNativeControls` and `AndroidUseNativeControls`) which forces the specified device's native controls styles to the music player.

All these components are then called with `audio.init()` command and rendered to the HTML.

The "style.css" file in the link above is the CSS file that styles how our HTML template design looks and feels.

Next, let's first import the `os` module in our *settings.py* file. To import the `os` module add the code below to the top of the *settings.py* file.

```python
import os
``` 

We should also define our `static_root`, `media_root`, and `media_url` in our *settings.py* file as seen below:

```python
STATIC_URL = '/static/'
STATIC_ROOT = os.path.join(BASE_DIR, 'static')
MEDIA_ROOT =os.path.join(BASE_DIR, 'media')
MEDIA_URL = '/media/'
```

In the "MusicPlayer" directory, edit the *urls.py* file to:

```python
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.contrib.staticfiles.urls import staticfiles_urlpatterns
from django.contrib.staticfiles.urls import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include("App.urls")),

]
urlpatterns += staticfiles_urlpatterns()
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
```

Goto back to our *App* directory and create a new file called *urls.py*. Here we would define the URLs the root Django project would be linked to. After creating the new *urls.py* file, add the following code to it:

```python
from django.conf import settings
from django.conf.urls.static import static
from django.urls import path, include
from . import views

app_name = "App"

urlpatterns = [
    path("", views.index, name="index"),
]
```

In the code above, we defined all the URL patterns our app would be using. In other words all the visitable links on our web app.

In the "App" directory, edit the *models.py* file and add the following lines of code to it.

```python
from django.db import models

# Create your models here.
class Song(models.Model):
    title= models.TextField()
    artist= models.TextField()
    image= models.ImageField()
    audio_file = models.FileField(blank=True,null=True)
    audio_link = models.CharField(max_length=200,blank=True,null=True)
    duration=models.CharField(max_length=20)
    paginate_by = 2

    def __str__(self):
        return self.title
```

In the *models.py* file above, we defined our **Song** model which represents a data table in our database to store our songs. The attributes of the class define the fields of the "Song" table in our database.

Next, go to the *views.py* file in the same directory. 

Edit the file and add the following lines of code:

```python
# Create your views here.
from django.shortcuts import render, redirect

# imported our models
from django.core.paginator import Paginator
from . models import Song

def index(request):
    paginator= Paginator(Song.objects.all(),1)
    page_number = request.GET.get('page')
    page_obj = paginator.get_page(page_number)
    context={"page_obj":page_obj}
    return render(request,"index.html",context)
```

In the *views.py* code above, we started by importing the required packages needed; "render", "redirect" and "Paginator". We also imported our model class "Song" from the *models.py* file. 

Then, we defined our index view function that controls how the index page works. In the index view, we defined how our paginator will work. We created the paginator object and gave it a query set to render. 

We created this query set by utilizing Django's ORM to ask the database for all Songs as seen here `Song.objects.all()`. This method makes your code cleaner, by minimizing the errors in our code as opposed to using raw SQL queries to fetch data from the database. 

The number "*1*" in the object definition specifies the number of songs we want on one page. Thus, the number of songs on one page will be one.

Finally, we can migrate our model to the database by using the below command on the command-line in the root directory where we can find our *manage.py* file.

```shell
# migrating the app and database changes
python manage.py makemigrations

# final migrations
python manage.py migrate
```

The result of running the above migrations should look like the image below:

![success_migrate](/engineering-education/how-to-build-a-music-player-using-django/sucess_migrate.PNG)

You will also notice our SQLite database file was created in the root folder for us easily. The root directory file should look like the image seen below:

![database file created](/engineering-education/how-to-build-a-music-player-using-django/db_Seen.PNG)

If your migrations were successful, congratulations!!!. 

However, our work isn't finished. We still have to import and register our models in our "admin.py" file so we would be able to create new Song objects.

The `admin.py` file can be found in the `App` folder. Edit and add the following code.

```python
from django.contrib import admin
from . models import Song

# Register your models here.
admin.site.register(Song)
```

The last thing we will be doing is creating a superuser so that we can log in to Django's admin page.

To create a superuser enter the below command in your command-line:

```bash
python manage.py createsuperuser
```

You'll be prompted to create a **username**, **email**, and **password**. Once you are done with this, you can log in to the admin page and create songs. 

Let's now run our app with the command below.

```bash
python manage.py runserver
```

If your app is running you should see something like this:

![app running](/engineering-education/how-to-build-a-music-player-using-django/runapp.PNG)

Finally, let's now login to the admin page, and add some songs to play them.

To login to the admin page go to this link [http://127.0.0.1:8000/admin](http://127.0.0.1:8000/admin) and enter your login details as seen in the image below:

![admin login](/engineering-education/how-to-build-a-music-player-using-django/adminpage.PNG)

If your login was successful you should now see the page below:

![admin home](/engineering-education/how-to-build-a-music-player-using-django/admin_home.PNG)

Click on the add button where you have the Songs panel and enter the song details as seen below. Add two or three more songs by clicking on the "add and save another" button at the bottom right of the page as seen in the image below:

![admin song creation](/engineering-education/how-to-build-a-music-player-using-django/new_admin_add.PNG)

If you completed all the steps above, **congratulations!!** you just built a music player.

You can view it on your localhost at this link [http://127.0.0.1:8000/](http://127.0.0.1:8000/) and you should have a music player like the one in the image below:

![music player image](/engineering-education/how-to-build-a-music-player-using-django/final_image_music.PNG)

### Conclusion
You can take a look at this [GitHub repo](https://github.com/Chukslord1/DjangoMusicPlayer) to view the final code.

By using Django, we were able to build a music player web app using Django, HTML, Jinja, CSS, and Javascript. We also saw how easy it was to create a web app using Django and manipulate the database with Django's ORM.

If you have any questions, don't hesitate to hit me up on Twitter: @LordChuks3.

Happy coding!

---
Peer Review Contributions by: [Mohan Raj](/engineering-education/authors/mohan-raj/)
