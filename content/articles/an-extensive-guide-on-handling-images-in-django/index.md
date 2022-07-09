---
layout: engineering-education
status: publish
published: true
url: /an-extensive-guide-on-handling-images-in-django/
title: An Extense Guide On Handling Images In Django
description: This article will help readers understand how to work with images in Django. We will build a simple application to demonstrate it.
author: donel-mwangi
date: 2022-03-11T00:00:00-03:34
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/an-extensive-guide-on-handling-images-in-django/hero.jpg
    alt: Handling Images Django Hero Image
---
As a web developer, working with images is an important skill to have. Django is one of the most popular web development frameworks, it provides ways to deal with images conveniently.
<!--more-->
In this tutorial, we are going to build a Django application that handles images. By building this, you shall learn how to set up your Django project environment to handle images and also how to perform other operations on the images.

### Table of contents
- [Set up the environment](#set-up-the-environment)
- [Create and register the models](#create-and-register-the-models)
- [Display the images](#display-the-images)
- [User image upload](#user-image-upload)
- [List the images in the Admin site](#list-the-images-in-the-admin-site)
- [Create thumbnails](#create-thumbnails)
- [Add a background image in a Django template](#add-a-background-image-in-a-django-template)
- [Conclusion](#conclusion)

### Pre-requisites
To follow through this tutorial, you need to have:
- Fundamental knowledge of both Python and Django.
- A code editor like Visual Studio Code.

### Set up the environment
We shall start by setting up the development environment for our Django project.

In your command line, create a new directory for our project and name it `Images` as shown:

```bash
mkdir Images
```

Then, enter the directory, create a virtual environment and activate it respectively using the commands below:

```bash
cd Images
py -m venv .venv
.venv\Scripts\activate.bat
```

Now, we will need to install the following libraries:
- [Django](https://www.djangoproject.com/) helps build our website using the Django web development framework.
- [Pillow](https://pypi.org/project/Pillow/) is an image library that we shall use to manipulate our images.

```bash
pip install django
pip install pillow
```

After the installation, we now proceed to create the Django project named `myGallery`:

```py
django-admin startproject myGallery
cd myGallery
py manage.py startapp demo
```

Now, we need to register our `demo` app in the list of installed apps in the `settings.py` file as shown:

```py
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'demo', # new
]
```

We need to tell Django which URL to use for serving the media files and also specify the root directory where our images will be stored.

We shall do this using `MEDIA_URL` and `MEDIA_ROOT` respectively. In the `settings.py` file, we will add the following:

```py
import os

MEDIA_URL = '/media/'
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')
```

To enable a user to upload images during development, we need to add the following settings in our project-level `urls.py` for testing purposes. It should look like this:

```py
from django.contrib import admin
from django.urls import path
from django.conf import settings
from django.conf.urls.static import static 

urlpatterns = [
    path('admin/', admin.site.urls),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT) # New
```

The above snippet tells Django where to find user-uploaded images when the project is still in the development stage.

### Create and register the models
We can now proceed and define a model that shall be used to store the images in our app.

In Django, a default database is automatically created for you. All you have to do is add the tables called models.

In `models.py`, we shall create a model with two fields, the `title` of a photo and the `photo` as shown:

```py
from django.db import models

class Image(models.Model):
    title = models.CharField(max_length=20)
    photo = models.ImageField(upload_to='pics')
```

The `upload_to` tells Django to store the photo in a directory called `pics` under the `media` directory.

Now, we can register our model in `admin.py` as shown:

```py
from django.contrib import admin
from .models import Image

class imageAdmin(admin.ModelAdmin):
    list_display = ["title", "photo"]

admin.site.register(Image, imageAdmin)
```

The `list_display` list tells Django admin to display its contents in the admin dashboard. The contents are the model's fields.

In this case, we want it to display the `title` and `photo` fields of every image that is uploaded.

### Display the images
So far, we made it possible to upload the images using the Django admin, but we also need to display the images on our site.

So, let's add the display template, display view, and also configure the URLs.

#### Display view
Views in Django are used to send requests to and from the server. The requests can be to return a page, query the database, make calculations, and so on.

In `views.py`, we add:

```py
from django.shortcuts import render
from .models import Image

# Create your views here.
def index(request):
    data = Image.objects.all()
    context = {
        'data' : data
    }
    return render(request,"display.html", context)
```

- The above function-based view will return all the `Image` objects from our database when requested.

#### Display template
In our app `demo`, we will create a directory named `templates` and create a file named `display.html` inside it.

Inside `display.html` we will add the following code to help display all the uploaded images:

```html
<!doctype html>
<html lang="en">
  <head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">

    <title>Demo Gallery</title>
  </head>
  <body class="container " style="padding-top: 5%;">
    <div class="row">
        {% for x in data %}
        <div class="col-md-4">
          <div class="thumbnail">
            <a href="{{ x.photo.url }}">
              <img src="{{ x.photo.url }}" alt="Lights" style="width:100%">
              <div class="caption">
                <p>{{ x.title }}</p>
              </div>
            </a>
          </div>
        </div>
        {% endfor %}
      </div>
  </body>
</html>
```

#### Configure the URLs
At the project level (`myGallery`), we will add some code to point the root URL to our demo app's URLs:

```py
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static 

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('demo.urls')) # new
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
```

Now, we shall create another file named `urls.py` in our `demo` app directory. This new `urls.py` file is supposed to contain the `urlpatterns` of our app.

Add the following code to it:

```py
from django.urls import path
from .import views

urlpatterns = [
    path('', views.index, name='index'),
]
```

- The root path `('')` in the pattern above points towards the index view, which in return gets the images and renders them together with the `display.html`.

#### Testing
To test if the upload and display work, we can go ahead and run the server. But, before all that, we will first have to make the migrations in our database, then create the superuser.

In our `cmd`, we shall go ahead and run:

```bash
py manage.py makemigrations
py manage.py migrate
```

- `makemigrations` - generates the SQL commands for the new `Images` model.
- `migrate` - executes the SQL commands generated by the `makemigrations` command.

We can now create our admin account using the command below:

```bash
py manage.py createsuperuser
```

- `createsuperuser` - Django comes with a ready-built admin site that can be used to administrate the users and the database of the site.

When you run this command, you will be prompted to enter credentials to login into your account.

Run the following command to start the localhost server:

```bash
py manage.py runserver
```

In the [Admin site](http://127.0.0.1:8000/admin/), add some images to check how they appear on the [display page](http://127.0.0.1:8000/).

On adding four images from my PC, here is what my web page looks like:

![display.html](/engineering-education/an-extensive-guide-on-handling-images-in-django/display.jpg)

Now that we have looked at the basic concepts to deal with images, we shall proceed to the advanced concepts next.

### User image upload
In this case, we are going to look at how to enable a user to upload an image using forms.

In our app-level directory `demo`, create a file and call it `forms.py`. In the file, we shall create the class to handle the upload form and link it to our `Image` model as shown:

```py
from django import forms
from .models import Image

class ImageUploadForm(forms.ModelForm):
    class Meta:
        model = Image
        fields = ['title', 'photo']
```

With the above fields, Django will present us with the input fields in our form.

Now, let's create an HTML form to display those input fields. In our `templates` folder, add a file named `upload.html` and add this code to it:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Image Upload</title>
</head>
<body>
    <form method="POST" enctype="multipart/form-data">
        {% csrf_token %}
        {{ form.as_p }}
        <button type="submit"> Upload Image </button>
    </form>
</body>
</html>
```

In the above HTML form:
- `method="POST"` requests the server to accept the submission of a form.
- `enctype="multipart/form-data"` encodes files in a certain way that allows them to be submitted through `POST` method.
- `{% csrf_token %}` enables us to protect out site from [Cross Site Request Forgeries](www.synopsys.com/glossary/what-is-csrf.html).
- `{{ form.as_p }}` displays the form fields wrapped around with the paragraph's HTML tags

Next, we will create a function-based view that handles the image upload. In `views.py`, update your code as shown:

```py
from django.shortcuts import render, redirect # new
from .models import Image
from .forms import ImageUploadForm # new 

def index(request):
    data = Image.objects.all()
    context = {
        'data' : data
    }
    return render(request,"display.html", context)
# new
def uploadView(request):                                      
    if request.method == 'POST':
        form = ImageUploadForm(request.POST, request.FILES)
        if form.is_valid():
            form.save()
            return redirect('index')
    else:
            form = ImageUploadForm()
    return render(request, 'upload.html', {'form': form})
```

Upon the submission of the form, it will be checked if the request is a `POST` request. If so, the `ImageUploadForm` will be called to handle it.

We then go ahead to check the validity of the form before saving it and redirecting the users to the display page.

The only remaining part is updating our `urls.py`. In our apps level `urls.py` file, update it as shown:

```py
from django.urls import path
from .import views

urlpatterns = [
    path('', views.index, name='index'),
    path('upload_image/', views.uploadView, name= 'upload_image') # new
]
```

- The new path [upload_image](http://127.0.0.1:8000/upload_image/) points to the `uploadView` which takes care of the upload process.

Here is what mine looks like :

![upload.html](/engineering-education/an-extensive-guide-on-handling-images-in-django/upload.jpg)

### List the images in the Admin site
As of now, our admin site images are listed using their names and paths:

![before](/engineering-education/an-extensive-guide-on-handling-images-in-django/before.jpg)

This makes it hard to identify the images without having to click on the links. We can easily improve this by listing the images on the dashboard, alongside their names.

We will edit our `Image` model in `models.py`, to add an `image_tag` field that helps render the images as shown:

```py
from django.db import models
from django.utils.safestring import mark_safe # new

# Create your models here.
class Image(models.Model):
    title = models.CharField(max_length=20)
    photo = models.ImageField(upload_to='pics')

    def image_tag(self): # new
        return mark_safe('<img src="/../../media/%s" width="150" height="150" />' % (self.photo))
```

- The `mark_safe` tells the Django templates to render the string as such (render it as text using `&lt;&gt;`). Therefore, it renders the HTML image tag with its path and size for every image.

Now, we need to update `admin.py` to include the `image_tag` in the `list_display`:

```py
from django.contrib import admin
from .models import Image

class imageAdmin(admin.ModelAdmin):
    list_display = ["title", "image_tag", "photo"] # new

admin.site.register(Image, imageAdmin)
```

As a result, our [Image dashboard](http://127.0.0.1:8000/admin/demo/image/) should resemble this:

![after](/engineering-education/an-extensive-guide-on-handling-images-in-django/after.jpg)

### Create thumbnails
If you click on images in the [display page](http://127.0.0.1:8000/), they tend to have different default sizes. The big images might even take longer to load due to their size.

In case you want to change this behavior and give them a reasonable size, you would have to override the `save` method in our Image model.

We will create thumbnails for the images by editing their size during the uploading process, and set the maximum value of width and height to `300`.

Let's update our `models.py` as shown:

```py
from django.db import models
from django.utils.safestring import mark_safe 
from PIL import Image as Im # new

# Create your models here.
class Image(models.Model):
    title = models.CharField(max_length=20)
    photo = models.ImageField(upload_to='pics')

    def image_tag(self):                     
        return mark_safe('<img src="/../../media/%s" width="150" height="150" />' % (self.photo))

    def save(self): # new
        super().save()
        img = Im.open(self.photo.path)
        # resize it
        if img.height > 300 or img.width > 300:
            output_size = (300,300)
            img.thumbnail(output_size)
            img.save(self.photo.path)
```

### Add a background image in a Django template
We shall go on and add a background image to our upload template. To do so, we shall create a directory named `static` in our app-level directory `demo`, and add the background image that you intend to use inside it.

> The background image that we use is `bj.jpg`.

In `upload.html`, we shall load the statics at the top, then add the background image in the body tag. Update your `upload.html` as shown:

```html
{% load static %}
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Image Upload</title>
</head>
<body  style="background-image: url('{% static 'bg.jpg' %}');">
    <form method="POST" enctype="multipart/form-data">
        {% csrf_token %}
        {{ form.as_p }}
        <button type="submit"> Upload Image </button>
    </form>
</body>
</html>
```

After that, we shall change the `STATIC_URL` in `settings.py` from the first code block below to the second code block.

```py
STATIC_URL = 'static/'
```

```py
STATIC_URL = '/static/'
```

This enables Django to find the static files within the `static` folder.

### Conclusion
To conclude, we looked at a live code implementation on how to handle images in Django. We built a Django project to enable users to upload images and view them. Also, we enabled the admins to view the thumbnail version of the images.

I hope you have learned how to implement these solutions into your Django projects.

You can find the full source code [here](https://github.com/Donel254/Images).

Happy coding!

---
Peer Review Contributions by: [Srishilesh P S](/engineering-education/authors/srishilesh-p-s/)