Have you ever wanted to build a music player web application?. If your answer is yes then this article is for you. I have always wanted to build a music player and finally, I did. I love how Django's ORM makes it so easy to work with a database along with the views (i.e the functional backend of the app) and the template files all connected with the Django MVT (i.e Model View Template) architecture. Django is a perfect choice when building a music player web application, and I would be happy to walk you through every step of how I achieved it.

The purpose of this article is to introduce the reader to the Django web framework and explore its ORM and MVT capabilities by engaging him/her in making use of Django to build a simple music player for their personal use.

We'll be creating bot song objects, retrieving songs, bookmarking songs, and playing songs.

### Django ORM

Object-Relational Mapping (ORM) is a method that helps you to question and control statistics from a database, the usage of an object-orientated paradigm. When speaking about ORM, we are referring to a library that implements the Object-Relational Mapping technique, the phrase "an ORM".

An ORM library is an everyday library written in your language of desire that encapsulates the code required to control the data so that you do not use raw SQL queries anymore. You engage at once with an object within the same language you are utilizing.

### MVT Architecture

MVT (Model View Template) is a software program layout sample that's a group of 3 elements: Model, View and Template. The Model allows dealing with the database. It is a data access layer that handles the information in the database.

The Template is a presentation layer that handles all the User Interface parts. The View executes the logic and interact with the model to carry data and renders the template.

Although Django follows the MVC pattern, it however, continues its conventions so control is taken care of through the framework itself.

There isn't any separate controller and the entire framework is primarily based totally on Model, View and Template. That's why it's largely known as the MVT framework.

In the MVC architecture, a user sends a request for a resource to Django, Django works as a controller and check for the available resource in the URL.

If URL maps, a view is called that interact with model and template, it renders a template.

Django responds to the user and sends a template as a response.

The principal distinction among the 2 styles is that Django itself looks after the Controller part (Software Code that controls the interactions among the Model and View), leaving us with the template. The template is an HTML record combined with Django Template Language (DTL).

Here is an easy diagram that indicates the MVT structure in Django:

![mvt structure](/engineering-education/how-to-build-a-music-player-using-django/mvt.png)

### Getting Started with Django

If you are new to Django and want to get started with it, you can view the [official Django documentation](https://docs.djangoproject.com/en/3.1/).

### Prerequisites

Python, Django, Pillow

Install python and enable `pip`. Then run the following to install the required packages:

```bash
pip install django
pip install pillow
```

### Creating  our Django App

Let's begin by creating a Django project from any directory using our command-line interface:

```bash
# create our project
$ django-admin startproject MusicPlayer

# change directory to project
$ cd MusicPlayer

# create our app
$ django-admin startapp App
```

The above commands should provide you with a directory structured as seen in the image below

![directory structure](/engineering-education/how-to-build-a-music-player-using-django/structure.png)

Now let's create our static and templates folders in our APP directory. The template folder will house our HTML files, while the static folder will house our CSS, Javascript, and other static files. To do this, run the command below on your command-line

```bash
# changing directory to our app
$ cd App

# creating  the static and templates folders
$ mkdir templates
$ mkdir static
```

Now go to the "MusicPlayer" directory and edit our settings.py file by adding our App to the list of installed apps as seen below

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

Inside the static and templates folders, we are going to create their respective files.

For the templates, folder create a new file "index.html" and add the HTML code below

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

In the code above we created the HTML attributes for our music player and made use of jinja; a python web templates engine to render our query set object in our **"page_obj"** context which we defined in our *views.py* file. Also the next and previous links, we rendered the pagination attributes which will separate our songs into a page per song format.

In the static folder create two new files: *script.js* and *style.css*. These are the static files our HTML templates file is going to use. In the "*cript.js* file, add the following code as seen below:

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
Edit the "style.css" file, add the following code as seen in the github gist (link)[https://gist.github.com/Chukslord1/f65093cd9b16fff56e68903259887299].

The "script.js" file is the javascript file that defines how our music is played, while the "style.css" file in the link above is the CSS file that styles our HTML  template design and feels.

The *script.js* file is the javascript file that defines how our music is played, while the *style.js* file is the CSS file that styles our HTML template design and feels.

We would also define our `static_root`, `media_root`, and `media_url` in our *settings.py* file as seen below

```python
STATIC_URL = '/static/'
STATIC_ROOT = os.path.join(BASE_DIR, 'static')
MEDIA_ROOT =os.path.join(BASE_DIR, 'media')
MEDIA_URL = '/media/'
```

Still in the "MusicPlayer" directory, edit the *urls.py* file

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

Goto back to our APP directory and create a new file called *urls.py*. Here we would define the URLs the root Django project would be linked to. After creating the new urls.py file, add the following code to it:

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

In the *models.py* file above, we defined our Song model which represents a data table in our database for storing our songs. The attributes of the class define the fields of the "Song" table in our database.

Next, go to the *views.py* file in the same directory. Edit the file and add the following lines of code:

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

In the *views.py* code above, we started by importing the required packages needed; "render", "redirect" and "Paginator". We also imported our model class "Song" from the *models.py* file. We then defined our index view function which controls how the index page works. In the index view, we defined how our paginator will work. We created the paginator object and gave it a query set to render. We created this query set by utilizing Django's ORM to ask the database for all Songs as seen here `Song.objects.all()`. As you can see this method makes your code very clean which minimizes the errors in our code unlike when using raw SQL queries to fetch data from the database. The number one in the object definition specifies the number of songs we want on one page. Thus, the number of songs on one page in this project is one.

Finally, we can migrate our app by typing the below command on the command-line in the root directory where we can find our *manage.py* file.

```shell
# migrating the app and database changes
$ python manage.py makemigrations

# final migrations
$ python manage.py migrate
```

The result of running the above migrations should be as in the image below:

![success_migrate](/engineering-education/how-to-build-a-music-player-using-django/success_migrate.png)

You would also notice our SQLite database file was created in the root folder for us very easily. You should see the file in the root directory as seen below:

![database file created](/engineering-education/how-to-build-a-music-player-using-django/db_Seen.png)

If your migrations were successful, congratulations!!!. However, the work isn't finished. We still have to import and register our models in our "admin.py" file so we would be able to create new Song objects.

Our admin file would contain the following code

```python
from django.contrib import admin
from . models import Song

# Register your models here.
admin.site.register(Song)
```

The last thing we would be doing is creating a superuser so that we can log in to Django's admin page.

To create a superuser enter the below command in your command-line:

```bash
python manage.py createsuperuser
```

You'll be prompted to create a **username**, **email**, and **password**. Once you are done with this, you can now log in to the admin page and create songs. Let's now run our app with the command below

```bash
$ python manage.py runserver
```

If your app is running you should see something like this:

![app running](/engineering-education/how-to-build-a-music-player-using-django/runapp.png)

Finally, let's now login to the admin page, create some songs and play them.

To login to the admin page go to this link [http://127.0.0.1:8000/admin](http://127.0.0.1:8000/admin) and enter your login details as seen in the image below

![admin login](/engineering-education/how-to-build-a-music-player-using-django/adminpage.png)

If your login was successful you should now see the page below:

![admin home](/engineering-education/how-to-build-a-music-player-using-django/admin_home.png)

Click on the add button where you have the Songs panel and enter the song details as seen below. Add two or three more songs by clicking on the "add and save another" button at the bottom right of the page as seen in the image below:

![admin song creation](/engineering-education/how-to-build-a-music-player-using-django/new_admin_add.png)

If you completed all the steps above, **Congratulations!!** you just built yourself a music player.

You can view it on your localhost at this link [http://127.0.0.1:8000/](http://127.0.0.1:8000/) and you would have a music player like the one in the image below:

![music player image](/engineering-education/how-to-build-a-music-player-using-django/final_image_music.png)

You can also go to the [GitHub repo](https://github.com/Chukslord1/DjangoMusicPlayer) to view the project.

### Conclusion

By using Django, we were able to build a music player web app using Django, HTML, Jinja, CSS, and Javascript. We also saw how easy it was to create a web app using Django and manipulate the database with Django's ORM.

If you have any questions, don't hesitate to hit me up on Twitter: @LordChuks3.

### Resources

- https://www.javatpoint.com/django-mvt
