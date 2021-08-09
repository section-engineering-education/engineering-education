---
layout: engineering-education
status: publish
published: true
url: /integrating-django-with-tinymce/
title: Integrating Django with TinyMCE
description: This article will serve as a guide to integrate Django with a TinyMCE. TinyMCE is a rich and flexible online text editor that is compatible with Django amongst many other frameworks.
author: samuel-mwangi
date: 2021-01-22T00:00:00-11:00
topics:
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
 - Some basic knowledge with the Python programming language.
 - Visual Studio Code, Sublime Text, or just any other good code editor that you will be comfortable with .
 - A stable internet connection.

### Step 1 – Creating our Django app
Open your cmd and type in the following commands to create the Django project.

`$ django-admin startproject TinyMce`

Now change your directory to TinyMce,
`$ cd TinyMce `
      
Type the following command to create an app called *myapp* inside the *TinyMce* project.

`$ django-admin startapp myapp`
    
Next, use the command below to create a virtual environment in our project-level directory,

`$ py -m venv .venv`
    
and then use the command below to activate it.    

`$ .venv\Scripts\activate.bat`

### Step 2 – Installation
You can now Install Django in the virtual environment:

`$ pip install django`

and also Install TinyMCE:

`$ pip install django-tinymce4-lite`

### Step 3 – Intergration
After the installations are complete, you can now proceed to *settings.py* and add both our app and the *tinymce* app.

```py
   INSTALLED_APPS = [
     ...
    'myapp',
    'tinymce',
     ... 
    ]
```

You should also add the *tinymce* configurations below to *settings.py*, where you can opt to copy and paste.

```py
 TINYMCE_DEFAULT_CONFIG = {

   'height': 360,

   'width': 1000,

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

### Step 4 – Applying TinyMCE
Now that we have installed and integrated TinyMCE, we can create a model with a text field in *models.py* that will utilize TinyMCE.

In *models.py* create a model and name it *textEditor* and a textfield by the name *content*:

```py
from django.db import models

class textEditor(models.Model): # new

   content = models.TextField() #new

```

Next, run the Django command-line utilities to create the database table automatically:

`$ py manage.py makemigrations`

`$ py manage.py migrate `
   
In your *admin.py* file, add the following code. 

```py
from .models import textEditor

from django.db import models

from tinymce.widgets import TinyMCE

  

class textEditorAdmin(admin.ModelAdmin):

   list_display = ["content"]

   formfield_overrides = {

   models.TextField: {'widget': TinyMCE()}

   }
admin.site.register(textEditor, textEditorAdmin)
```
 
Then in your project-level *urls.py* add the following code that's commented *new*:

```py
from django.contrib import admin

from django.urls import path ,include # new

  

   urlpatterns = [
       path('admin/', admin.site.urls),
       path('tinymce/',include('tinymce.urls')), # new
    ]
 ```

Now let us create the super-user to be able to login to the admin's page.

`$ py manage.py createsuperuser`
    
After typing in the above command, you'll be asked to enter the username and password, that you will use to log into Django admin. 

Now let us run our local server and log into the admin's page. 

`$ py manage.py runserver`

Open your browser now and type in the following URL:
**http://127.0.0.1:8000/admin/** and log in using the credentials that you used to create the super-user.

> You should make sure that up to this step, that you're still connected to the internet since TinyMCE fetches its CSS and Javascript from a CDN.

After logging in, you should be able to see *MYAPP* with its *Text editors* table, and when you click on *add*, you should be able to see the below results:

![tinymce-the-final-results](/engineering-education/integrating-django-with-tinymce/tinymce-the-final-results.jpg)

### Conclusion
If you're not okay with the size of your TinyMCE text editor, you could go back to its configurations in *settings.py* and adjust the *height* and *width* values until you get the size you want.

In the project above, we used the *modern* theme. However, you might be pleased to know that there are other themes available to replace the *modern* theme in the TinyMCE configurations with any other available.

Now that we have accomplished the goal, you can try to use TinyMCE in various projects since practice makes perfect.

Happy Coding!

---
Peer Review Contributions by: [Lalithnarayan C](/engineering-education/authors/lalithnarayan-c/)

