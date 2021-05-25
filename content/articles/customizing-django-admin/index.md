---
layout: engineering-education
status: publish
published: true
url: /customizing-django-admin/
title: How to Customize the Django Admin Site
description: This article will serve as a guide to customize the default Django administration site. Django admin is used to quickly manage a Django site content.
author: samuel-mwangi
date: 2021-03-26T00:00:00-13:00
topics:
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/customizing-django-admin/hero.jpg
    alt: Customize Django Admin example image
---
Django is a Web framework for perfectionists with deadlines. Django gives programmers the power of customizing this admin site to suit the requirements of the project or the needs of the client. This tutorial will be Windows oriented.
<!--more-->
### Prerequisites
Before we begin, you should have the following:
 - Python3 installed on your machine.
 - Django installed on a virtual environment.
 - Some knowledge of Python3 and Django.

### Step 1 – Creating our Django app
Use the following command to create a virtual environment for the project.

```bash
$ py -m venv .venv
```

Then, activate it using the following command.

```bash
$ .venv\Scripts\activate.bat
```

Now we can install Django in the virtual environment.

```bash
$ pip install django
```

Now execute the following command to create the Django project.

```bash
$ django-admin startproject Custom
```

Let's change to the created directory `Custom`.

```bash
$ cd Custom
```

In `Custom`, let's go ahead and create our Bookstore app.
```bash
$ django-admin startapp Bookstore
```

Then, add Bookstore to the installed apps in `settings.py`.

```python
INSTALLED_APPS  = [
  # ...
  'Bookstore' # new
]
```

###  Creating the models
Add the following code to your `models.py` to create some models.

```python
from django.db.models.deletion import CASCADE

class  Category(models.Model):
    cat_romance  =  "Romance"
    cat_fantacy  =  "Fantacy"
    cat_thriller=  "Thriller"
    cat_horror  =  "Horror"
    cat_crime  =  "Crime"
    cat_true_story=  "True Story"
    category  =  models.CharField(
        max_length=100,
        choices=(
        (cat_crime, cat_crime),
        (cat_fantacy, cat_fantacy),
        (cat_horror, cat_horror),
        (cat_romance, cat_romance),
        (cat_thriller, cat_thriller),
        (cat_true_story, cat_true_story)
          )
    )

    def  __str__(self):
        return  self.category

class  Publisher(models.Model):
    publisher_name  =  models.CharField(max_length=100)
    publish_date  =  models.DateField

    def  __str__(self):
        return  self.publisher_name

class  Author(models.Model):
    gender_male  =  "Male"
    gender_female  =  "Female"
    gender_other  =  "Other"
    name  =  models.CharField(max_length=100)
    gender  =  models.CharField(max_length=100,
        choices=(
        (gender_female, gender_female),
        (gender_male, gender_male),
        (gender_other, gender_other)
        )
        )
    country  =  models.CharField(max_length=100)

    def  __str__(self):
        return  self.name

class  Details(models.Model):
    book_name  =  models.CharField(max_length=100)
    category = models.ForeignKey(Category, on_delete=CASCADE)
    pages = models.IntegerField(default=1)
    publisher  =  models.ForeignKey(Publisher, on_delete=models.CASCADE)
    Author  =  models.ForeignKey(Author, on_delete=CASCADE)

    def  __str__(self):
        return  self.book_name
```

We can now go ahead and register our models in `admin.py` by adding the following lines of code.

```python
from django.db import models
from .models import Category, Publisher ,Details, Author

class  categoryAdmin(admin.ModelAdmin):
    pass

class  publisherAdmin(admin.ModelAdmin):
    pass

class  detailsAdmin(admin.ModelAdmin):
    pass

class  authorAdmin(admin.ModelAdmin):
    pass

admin.site.register(Category, categoryAdmin)
admin.site.register(Publisher, publisherAdmin)
admin.site.register(Details, detailsAdmin)
admin.site.register(Author, authorAdmin)  
```

Then, we can migrate using the below commands.

```bash
$ py manage.py makemigrations
$ py manage.py migrate
```

Now, let's create a superuser in order to start customizing our admin site.

```bash
$ py manage.py createsuperuser
```

Now, run the development server using the command below:
```bash
$ py manage.py runserver
```

You can now log in using the superuser credentials at http://127.0.0.1:8000/admin/.

Now, go ahead and add some input in the fields we created.

###  1 -  Setting plural text for models
We can change how the models *category* and *details* are appearing in plural at the admin site by adding the below code to `models.py`.

```python
class  Category(models.Model):
  # ...
    class  Meta:  #new
        verbose_name_plural  =  "Categories"     

class  Details(models.Model):
  # ...
    class  Meta:   #new
        verbose_name_plural  =  "Details"
```

###  2. Changing the Django administration header text
To change the admin site header text, login page, and the HTML title tag of our bookstore's instead, add the following code in `urls.py`.

```python
#...
admin.site.site_header  =  "Custom bookstore admin"  
admin.site.site_title  =  "Custom bookstore admin site"
admin.site.index_title  =  "Custom Bookstore Admin"
```

The `site_header` changes the **Django administration** text which appears on the login page and the admin site. The `site_title` changes the text added to the `<title>` of every admin page. 

The `index_title` changes our site's title that appears on top of the admin homepage list view.

###  3. Removing the default groups
Let's say, we want to get rid of the *Groups* app found in our Django admin site by default. 

We will go ahead and import it then unregister it in `admin.py`.

```python
from  django.contrib.auth.models  import  Group  # new
#...
admin.site.unregister(Group)  # new
```

If you like, you could also go ahead and unregister *users* through the same process.

###  4 - Using list_display
You might also want your *details* model to display more than one column at the change list page. To add other fields, we will have to make some adjustments to `admin.py`.

```python
class  detailsAdmin(admin.ModelAdmin):
    list_display=('book_name','category','Author','pages','publisher')
#pass
```

### 5. Adding an image to Django admin
We might also want to add the image of the Author besides their name using list display. To do that we will first have to install a third-party app called `pillow`.

Using a terminal, run the following command.
```bash
$ pip install pillow
```

Then, open `settings.py` and add the following code. This code tells Django where to store the images.

```python
import os # at the top
#...
MEDIA_URL = '/media/'
MEDIA_ROOT = os.path.join(BASE_DIR , 'media')
```

Now let's create the media folder and add an images folder inside it.

```bash
$ mkdir media\images 
```

Then, open `urls.py` and add the code below to add our `media` folder to the static files.

```python
# below the other imports
from . import settings
from django.contrib.staticfiles.urls import static
from django.contrib.staticfiles.urls import staticfiles_urlpatterns

#...

urlpatterns +=staticfiles_urlpatterns()
urlpatterns +=static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
```

In `models.py` we are going to import `mark_safe` and also add the image field to our *Author* model. Then we will add a function that will enable us to view the image in our admin site.

```python
# at the top
from django.utils.safestring import mark_safe

# in our Author model
class  Author(models.Model):
    # .....
    author_pic = models.ImageField(upload_to='images/', null=True)

    def  image_tag(self):
        return mark_safe('<img src="/../../media/%s" width="150" height="150" />' % (self.author_pic))

    image_tag.allow_tags = True       
```

Now let us make migrations then migrate to reflect the changes in our database.

```bash
$ py manage.py makemigrations
$ py manage.py migrate
```

Finally, we'll call our function inside the list display. Let's go to our `admin.py` and modify the `authorAdmin()`.

```python
class  authorAdmin(admin.ModelAdmin):
    list_display=['name','image_tag']
```

Now, run the development server and enjoy the changes.

That is how you can customize the Django Admin tool.

Hope you found this tutorial helpful.

Happy coding!  

---
Peer Review Contributions by: [Geoffrey Mungai](/engineering-education/authors/geoffrey-mungai/)
