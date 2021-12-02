---
layout: engineering-education
status: publish
published: true
url: /integrating-django-with-tinymce/
title: Integrating Django with TinyMCE
description: This article will serve as a guide to integrating Django with a TinyMCE. TinyMCE is a rich and flexible online text editor that is compatible with Django amongst many other frameworks.
author: samuel-mwangi
date: 2021-01-22T00:00:00-10:00
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/integrating-django-with-tinymce/hero.jpg
    alt: Integrating Django with TinyMCE example image
---
TinyMCE is a rich and flexible online text editor that is compatible with Django amongst many other frameworks. It comes in handy when trying to make your content look more stylish with colorful texts, various fonts, tables, and many other features.
<!--more-->
### Goal
I will guide you on creating a simple Django app with a text field, then help you modify the text field to use the TinyMCE text editor in place of Django's plain text field box. 

### Prerequisites
You should have the following things before we begin, as they will come in handy:
 - Have Python installed on your PC.
 - Django installed.
 - Some basic knowledge of the Python programming language.
 - Visual Studio Code, Sublime Text, or just any other good code editor that you will be comfortable with.
 - A stable internet connection.

### Step 1 – Setting up the environment
To set up the environment, we will start by creating a project directory. In the command line type:

```bash
mkdir projectTiny
```

change your current directory to `projectTiny/`:

```bash
cd projectTiny
```

Now create the virtual environment and activate it respectively as shown below:

```bash
py -m venv .venv
```

```bash
.venv\Scripts\activate.bat
```

### Step 2 – Installing required packages
Now we will need to install the Django and TinyMce libraries. To install both simultaneously, we will use:

```bash
pip install django django-tinymce4-lite
```

### Step 3 – Creating our Django app
To create the Django project we will type in the following commands:

```bash
django-admin startproject myEditor
```

Now let's change our directory to TinyMce:

```bash
cd myEditor 
```

Type the following command to create an app called `myapp` inside the `TinyMce` project:

```bash
django-admin startapp myapp
```

### Step 4 – Intergration
After the installations are complete, we can now proceed to `settings.py` and add both our app and the `tinymce` app to the list.

```py
   INSTALLED_APPS = [
     #...
    'myapp',
    'tinymce',
    ]
```

We should also add the `tinymce configurations` below to `settings.py`, where you can opt to copy and paste.

```py
TINYMCE_DEFAULT_CONFIG = {

   'height': 360,
   'width': 750,
   'cleanup_on_startup': True,
   'custom_undo_redo_levels': 20,
   'selector': 'textarea',
   'theme': 'modern',
   'plugins': '''
   textcolor save link image media preview codesample contextmenu
   table code lists fullscreen insertdatetime nonbreaking
   contextmenu directionality searchreplace wordcount visualblocks
   visualchars code fullscreen autolink lists charmap print hr
   anchor pagebreak
   ''',
   'toolbar1': '''
   fullscreen preview bold italic underline | fontselect,
   fontsizeselect | forecolor backcolor | alignleft alignright |
   aligncenter alignjustify | indent outdent | bullist numlist table |
   | link image media | codesample |
   ''',
   'toolbar2': '''
   visualblocks visualchars |
   charmap hr pagebreak nonbreaking anchor | code |
   ''',
   'contextmenu': 'formats | link image',
   'menubar': True,
   'statusbar': True,
   }
```

### Step 5 – Setting up the backend and applying TinyMCE
Now that we have installed and integrated TinyMCE, we can create a model with a text field in `models.py` that will utilize TinyMCE.

In `models.py` create a model and name it `textEditor`.Add a charfield by the name `title`, and a textfield by the name `content`:

```py
class textEditor(models.Model): 
   title = models.CharField(max_length=20)
   content = models.TextField()

   def __str__(self):
       return str(self.title)
```

`title` will store the title of the text and `content` will store the contents of our text.

Next, run the Django command-line utilities to create the database table automatically:

```bash
py manage.py makemigrations
```

```bash
py manage.py migrate 
```

Let's add the following code in our `admin.py` file. 

```py
from .models import textEditor
from django.db import models
from tinymce.widgets import TinyMCE

  
class textEditorAdmin(admin.ModelAdmin):
   list_display = ["title"]
   formfield_overrides = {
   models.TextField: {'widget': TinyMCE()}
   }


admin.site.register(textEditor, textEditorAdmin)
```

The `textEditorAdmin()` class tells Django Admin which attributes to display, and also helps to override the default textField and replace it with the TinyMce editor instead.
The last line registers the model for it to be accessible from the admin site.

Then in your project-level `urls.py` add the following code that's commented `new`:

```py
from django.contrib import admin
from django.urls import path ,include # new

urlpatterns = [
    path('',include('myapp.urls')), # new
    path('admin/', admin.site.urls),
    path('tinymce/',include('tinymce.urls')), # new
    ]

 ```

The first path points the root `URLconf` to the `myapp.urls`, and the last path points to the TinyMCE app when called.

In `myapp`, Create a new file and name it `urls.py` then add the code below:

```py
from django.urls import path
from .import views


urlpatterns = [
    path('', views.homepage),
    
]
```

The above code points the homepage of your site to the view called `homepage`.

In `views.py` add:

```py
from django.shortcuts import render
from .models import textEditor
# Create your views here.
def homepage(request):
    text = textEditor.objects.all()
    context = {
        'text':text
    }
    return render(request, "homepage.html",context)
```

The above view returns all the `text` objects on receiving the request from the homepage.

### Step 6 – Setting up the frontend
Create a new directory in `myapp/` and name it `templates`. Now create a file in `templates/` and name it `homepage.html`.
In `homepage.html`, add the following code:

```HTML
<head>
{% load static %}
<link href="{% static 'tinymce/css/prism.css' %}" rel="stylesheet">

</head>

<body>
    {% for txt in text %}
        
        <p> {{txt.content|safe}}  </p>

    {% endfor %}
</body>
<script src="{% static 'tinymce/js/prism.js' %}"></script>
```

The {% load static %} tag loads the options for static files and {% static 'tinymce/css/prism.css' %} finishes the job by loading the specific files.

> NB: using double quotes for `'tinymce/js/prism.js'` will cause an error in finding the css\js file. 

Also note the use of the `safe` flag in `{{txt.content|safe}}`, which tells Django that it's safe to display the css\js that styles your input from tinyMce.

### Step 7 – Testing the app
Now let us create the super-user to be able to login to the admin's page.

```bash
py manage.py createsuperuser
```

After typing in the above command, you'll be asked to enter the username and password, that you will use to log into Django admin. 

Now let us run our local server and log into the admin's page. 

```bash
py manage.py runserver
```

Open your browser now and type in the following URL:
**http://127.0.0.1:8000/admin/** and log in using the credentials that you used to create the super-user.

> You should make sure that up to this step, that you're still connected to the internet since TinyMCE fetches its CSS and Javascript from a CDN.

After logging in, we should be able to see `MYAPP` with its `Text editors` table, and when we click on `add`, we should be able to see the below results:

![tinymce-the-final-results](/engineering-education/integrating-django-with-tinymce/tinymce-the-final-results.jpg)

Let's go ahead and add some content to test the editor:

![tinymce](/engineering-education/integrating-django-with-tinymce/tinymceTest.jpg)

I added the title, changed the text color, wrote some text, clicked the `insert/edit code` button from the toolbar, selected python in languages, then wrote some code and saved it. 

This is how my [homepage](http://127.0.0.1:8000/) looks like now:

![homepage](/engineering-education/integrating-django-with-tinymce/homepage_Test.jpg)

### Conclusion
If you're not okay with the size of your TinyMCE text editor, you could go back to its configurations in `settings.py` and adjust the `height` and `width` values until you get the size you want.

In the project above, we used `modern` theme. However, you might be pleased to know that there are other themes available to replace the *modern* theme in the TinyMCE configurations with any other available.

Now that we have accomplished the goal, you can try to use TinyMCE in various projects since practice makes perfect.

Happy Coding!

---
Peer Review Contributions by: [Lalithnarayan C](/engineering-education/authors/lalithnarayan-c/)
