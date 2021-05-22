---
layout: engineering-education
status: publish
published: true
url: /uploading-images-to-cloudinary-from-django-application/
title: Uploading Images to Cloudinary from a Django Application
description: This article will be an introduction to uploading images to Cloudinary using Django. We will be building a simple Django app to demonstrate how uploading images to Cloudinary is a better solution.
author: shuaib-oseni
date: 2021-04-13T00:00:00-12:30
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/uploading-images-to-cloudinary-from-django-application/hero.png
    alt: Uploading images to cloudinary from django application Image
---
Sometimes while working on applications that require the use of images, a simple process like uploading images to a server can become difficult. If you deploy your application to a platform like Heroku, you can't save images.
<!--more-->
Alternatively, we could have our images stored in the database, but the database size will explode over time. Hence, a reason images should be stored in external services like Cloudinary, AWS S3, or Imgur. 

The advantage Cloudinary has is that "configuration is quick and easy". In this tutorial, we will learn about how to save images in Django using Cloudinary.

Cloudinary is an end-to-end image and video management solution for websites and mobile apps. It covers everything from image and video uploads, storage, manipulations, and optimizations to delivery.

Creating an account is free and you also get 25GB of storage.

### Prerequisites
To follow along with this tutorial, you'll need [Python3](https://www.python.org/downloads/) installed on your machine.

A basic understanding of Django would help the reader follow along better.

### Table of contents
- [Creating and setting up a new Django project](#creating-and-setting-up-a-new-django-project)
- [Setting up Cloudinary](#setting-up-cloudinary)
- [Installation](#installation)
- [Configuration](#configuration)
- [Creating a model](#creating-a-model)
- [Creating a view](#creating-view)
- [Conclusion](#conclusion)

### Creating and setting up a new Django project
Let's start by creating a new virtual environment.

A virtual environment allows you to create different spaces on your computer, with a different set of libraries and versions.

By creating a virtual environment, you'll be able to separate the necessary library installation for a project, without having to install them globally.

Now, you create a virtual environment `env` as shown below:

```bash
$ python -m venv /path/to/new/virtual/environment
```

Here, we specify the `/path/to/new/virtual/environment` as `env`.

On creation, you can activate the virtual environment using the following command:

```bash
$ source env/bin/activate
```

On activating the environment, we can install Django using the following command:

```bash
$ pip install django
```

Now, let's create a new Django project `photoapp` using:

```bash
$ django-admin startproject photoapp
```

Then, we create a Django app.

```bash
$ django-admin startapp photos
```

Let's add our app to the list of installed apps. Navigate to the `photoapp` directory and edit the `settings.py` file.

```python
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'photos',
    ]
```

### Setting up Cloudinary
Now, let's head over to the [Cloudinary](https://cloudinary.com/) website to create a new account.

Click on the `Sign Up` button and fill in your details to create an account.

### Installation
Install the Cloudinary module in our project using the following command:

```bash
$ pip install cloudinary
```

Next, we have to add Cloudinary to the list of installed apps in `settings.py` something like this:

```python
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'photos',
    'cloudinary'
    ]
```

We will also need to include Cloudinary's Python classes in `settings.py`.

```python
import cloudinary
import cloudinary.uploader
import cloudinary.api
```

### Configuration
To use the Cloudinary Django library, we have to configure our `cloud_name`, `api_key`, and `api_secret`.

We can find our account-specific configuration credentials on the Dashboard page of the account console as shown below:

![Cloudinary dashboard page](/engineering-education/uploading-images-to-cloudinary-from-django-application/dash.png)

*Cloudinary dashboard page*

Add the configuration credentials in `settings.py` as shown below:

```python
# adding config
cloudinary.config( 
  cloud_name = "YOUR_CLOUD_NAME", 
  api_key = "YOUR_API_KEY", 
  api_secret = "YOUR_API_SECRET" 
)
```

### Creating a model
Migrations are Django’s way of propagating changes you make to your models (adding a field, deleting a model, etc.) into your database schema.

In the `photos` directory, edit the `models.py` file and add the following lines of code to it:

```python
from django.db import models
from cloudinary.models import CloudinaryField

class photos(models.Model):
    # title field
    title = models.CharField(max_length=100)
    #image field
    image = CloudinaryField('image')
```

Now, let's migrate our model to the database by running the commands below:

```bash
# migrating the app and database changes
$ python manage.py makemigrations

# final migrations
$ python manage.py migrate
```

A superuser has the permissions to create, edit, update, and delete data in Django admin. We create a superuser by running the command below:

```bash
$ python manage.py createsuperuser 
```

Now let's register the model of photos in the `admin.py` file, so we can modify it in the Django admin section.

```python
from django.contrib import admin
from .models import photos

admin.site.register(photos)
```

Now, we can log in to the admin page.

To login to the admin section, go to this link [localhost:8000/admin](localhost:8000/admin) and log in with our just created superuser details.

![Django admin login page](/engineering-education/uploading-images-to-cloudinary-from-django-application/admin.png)

*Django admin login page*

![Django admin page](/engineering-education/uploading-images-to-cloudinary-from-django-application/django-admin.png)

*Django admin page*

Now, let's add an image in the photos category to test if it uploads to Cloudinary.

Click on pictures, then click `Add Photo` to add an image.

![Add photo](/engineering-education/uploading-images-to-cloudinary-from-django-application/add-photo.png)

*Add photo*

![Photo added](/engineering-education/uploading-images-to-cloudinary-from-django-application/photo-added.png)

*Photo added*

To confirm if the image was uploaded successfully, click on the just added image, and click on the link there.

We can also confirm by going to the `media library` section on our Cloudinary account.

### Creating a view
Now, let's create a view, to view the image. 

Add the following code to your `views.py` file:

```python
from django.shortcuts import render

def index(request):
    return render(request, 'index.html')
```

Let's create our `templates` folder. Inside the folder, create an `index.html` file like `photos/templates/index.html`.

Before adding our HTML code, let's quickly create a new URL for the newly created view.

Add the following code to the `urls.py` file:

```python
from django.contrib import admin
from django.urls import path
from photos import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', views.index, name='index'),
]
```

Let's also import our `photos` model in the `views.py` file.

We also need to add context to the render, so we can use images in our template.

```python
from django.shortcuts import render
from .models import photos #import photos model

def index(request):
    # imports photos and save it in database
    photo = photos.objects.all()
    # adding context 
    ctx = {'photo':photo}
    return render(request, 'index.html', ctx)
```

Now, let's work on our HTML template for displaying the image.

Open the `index.html` file that we created earlier and paste the following code:

```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Photoapp</title>
    </head>
    <body>
        <h2>Cloudinary Fish</h2>
        <!-- loop through all the images -->
        {% for pic in photo %}
        <h2>{{pic.title}}</h2>
            <img src="{{pic.image.url}}" alt="fish">
        {% endfor %}
    </body>
</html>
```

In the code above, we used a `for-loop` to go through all the pictures.

![Image of a fish](/engineering-education/uploading-images-to-cloudinary-from-django-application/fish-local.png)

*Image of a fish displayed on an HTML page*

### Conclusion
To conclude, we have learned how Cloudinary provides a better way to handle media content for our webpage. We have also learned to upload images from a Django app.

To summarize:
- The reader learned to upload images to Cloudinary from our Django app.
- The reader understood how Cloudinary provides a better way to store images.
- The reader learned to build a Django app and integrate it with Cloudinary.

The full code can be found [here](https://github.com/shosenwales/django-cloudinary) on GitHub.

For further learning on image/video upload and transformation using Cloudinary, check out [this](https://cloudinary.com/documentation/django_image_and_video_upload) link.

Happy coding!

---
Peer Review Contributions by: [Srishilesh P S](/engineering-education/authors/srishilesh-p-s/)