---
layout: engineering-education
status: publish
published: true
url: /using-amazon-web-service-for-django-media-files-storage/
title: Using Amazon Web Services for Django media file storage.
description: This article will show you how to use Amazon Web Services (AWS) to store media files, which will run on a Django backend server. First, we will introduce how to get started with Django, then later move on to setting up a cloud service, in this case, Amazon Simple Storage Service (S3). 
author: oruko-pius
date: 2021-11-03T00:00:00-03:08
topics: [Languages]
excerpt_separator: <!--more-->
images:
  - url: /engineering-education/using-amazon-web-service-for-django-media-files-storage/hero.jpg
    alt:  Using Amazon Web Services for Django media file storage Image
---
Cloud storage services make application scalability easy. These services enable webpages to serve large files without causing heavy traffic and load to the application database, reducing the system load time and offering a good user experience.   
 <!--more-->
This article will show you how to use Amazon Web Services (AWS) to store media files, which will run on a Django backend server. First, we will introduce how to get started with Django, then later move on to setting up a cloud service, in this case, Amazon Simple Storage Service (S3). Finally, our application will retrieve images from S3 and display them to users.

### Table of contents
1. [Prerequisites](#prerequisites)
2. [Setting up the Django Application](#setting-up-the-django-application)
3. [Setting up Gallery](#setting-up-gallery-app)
4. [Introduction to AWS S3](#introduction-to-aws-s3)
4. [Configuring AWS S3](#configuring-aws-s3)
5. [Testing Our Application](#testing-our-application)
6. [Conclusion](#conclusion)

### Prerequisites
To follow along and get the most out of this article, you should have an elementary knowledge of web applications. In addition, it is helpful to have a more advanced comprehension of the Python language and its frameworks. Optionally, you can familiarize yourself with Django.

Install Python 3 or above on your local machine before starting this project.

### Setting up the Django application  
Django is a Python-based web framework for building scalable website applications with ease. This software has been around for quite some time, and a strong community of users keeps improving it to suit developers’ needs. We will use Django as our backend logic and SQLite as our development database.   

We need a virtual environment to install and run a Django application. A virtual environment separates a particular Python project’s dependencies, libraries, and packages from other projects. 

You can also install it globally to save time recreating the environment for a new project. There are various ways to create a virtual environment, depending on your local machine’s operating system.  Before you create a virtual environment, open your terminal and create a folder called django_sample by running this script on the terminal:

```bash
mkdir django_sample
```

To get to the directory, run `cd django_sample` in the terminal. `mkdir` and `cd` are terminal commands to make a directory and change a directory, respectively. 
A more straightforward way of creating a virtual environment in Linux is by running `pip install pipenv` in the terminal and activating it by running `pipenv shell`.

After activating the environment, install Django by executing:

```bash
pipenv install django
```

With Django installed, it is time to start building our application. We will start by creating a Django project. Run this command:  

```bash
django-admin startproject django_project   
```

The project is called `django_project`. To move into the project, run:

```bash
cd django_project
```

At this point, your application should resemble this tree:  

```bash
.  

├── django_project  

│ ├── asgi.py  

│ ├── __init__.py  

│ ├── settings.py  

│ ├── urls.py  

│ └── wsgi.py  

└── manage.py  
```

To run the application, type this command:

```bash
python manage.py runserver   
```

Ignore the migrations for now. Then, when you open the link on the browser, you should see a congratulation text.  

### Setting up Gallery app  
The Django project cannot act without a Django application. The Django application contains the models, views, and templates for processing our application. 

In addition, the project has external settings to make this possible. Think of the Django application as our web program’s car engine and the project as its exterior and wheels to put this into perspective.  

Run the command below to create a Django app:

```bash
python manage.py startapp gallery
```
Let us call the application “gallery” because it will display images to the user. The current structure should look like the tree below:  

```bash
.  

├── django_project  

│ ├── asgi.py  

│ ├── __init__.py  

│ ├── settings.py  

│ ├── urls.py  

│ └── wsgi.py  

├── gallery  

│ ├── admin.py  

│ ├── apps.py  

│ ├── __init__.py  

│ ├── migrations  

│ │ └── __init__.py  

│ ├── models.py  

│ ├── tests.py  

│ └── views.py  

└── manage.py  
```

Before running the application again, we need to configure a couple of things. First, we need to place our app in the `INSTALLED_APPS` section in the `settings.py` file. 

Then, in the `settings.py` file inside the `INSTALLED_APPS` array, we add `gallery.apps.GalleryConfig`. The new array should look like this:  

```python
INSTALLED_APPS = [  

   'gallery.apps.GalleryConfig', #added  

   'django.contrib.admin',  

   'django.contrib.auth',  

   'django.contrib.contenttypes',  

   'django.contrib.sessions',  

   'django.contrib.messages',  

   'django.contrib.staticfiles'  

]  
```

We placed the app in `INSTALLED_APPS` because that is where Django checks for models, management commands, and other utilities. In the project directory, `django_project`, we need to include the app in  `urls.py`  because the Django project directory serves the application. 

In the file, import `include()` from the `django.urls` module. Then, add a path and include `gallery.urls`, which will fetch the routes from the app directory when the application runs. Our file should resemble this:  

```python
from django.contrib import admin  
from django.urls import path, include  

urlpatterns = [  

   path('admin/', admin.site.urls),  
   path('', include('gallery.urls')),

]  
```

We will follow Django model-template-view (MTV) architecture when building our application. The framework is not different from the conventional model-view-controller (MVC) framework, where the model handles the data and logic involving database operations. 

The view displays data to the user, and the controller takes care of input requests like GET and POST then passes them on to the user.

#### Importing the Model
With that context in mind, let us go ahead and create our model. In the gallery folder, we open the `models.py` file and generate the model demonstrated in the snippet below:

```python
from django.db import models  
from PIL import Image  

class Post(models.Model):  

   """docstring for Post."""  

   title = models.CharField(max_length=100)  
   image = models.ImageField(upload_to='images/')  


   def __str__(self):  
       return self.title
```

First, we import the models from `django.db.models.Models` that enable us to map the properties of our model in the database table. Then, we import the Image module from Pillow library `PIL`. To install this, we type:`pipenv install Pillow`.

We then create a `Post` model by passing it `models.Model` as a parameter. We use docstrings, not conventional comments, to describe what the class does. Finally, we describe two fields in the model, title and image, and specify their fields.

Since the name is a string, we use the `CharField` model field and `ImageField` for the image attribute. We then specify where the images will upload. In this case, our application uploads the photos to the images directory in the media parent folder, as we will see later in this article. Pass the maximum number of character lengths to the `CharField` field, which in our case is 100.  

To view the name of our posts instead of the default Python name, we define a magic string` __str__()`. It takes itself as an argument and uses it to return the title of our posts.

#### Creating our View
Let us create our view now. Python’s view functions take web requests and return a response, which the application can call in the controllers and display in the browser. Our view function will be simple since it is not the main focus of this article. The snippet below shows the view function in `views.py` in the gallery directory:  

```python
from django.shortcuts import render  
from .models import Post  

def posts(request):  

   context = {  
   'posts':Post.objects.all()  
   }  

   return render(request, 'gallery/posts.html', context)  
```

Django already imports the `render()` from `django.shortcuts` package. `render()` enables us to return the contents of a template. We import the `Post` model we created earlier from the `models.py` file. We place a period before the models to show the path to the `models.py` file. Then, we pass a request as an argument in our posts view as an `HttpRequest` object. As we will see later, this enables us to call the view function in our routes.

We also pass in a context that contains the objects in our models in dictionary format. The dictionary value, `Post.objects.all()`, retrieves all the `Post` objects. As of now, our `Post` model is empty as we have not added any posts yet. We then render the yet-to-be-created template, `posts.html`. Finally, we pass in the request and context which the code will call before rendering our template.  

#### Setting up Templates  
In the gallery directory, create a sub-directory called `templates`. Then, create another directory similar to our app name, `gallery` in the templates directory. These are Django conventions:

```bash
cd gallery

mkdir templates

cd templates  

mkdir gallery  
```

In our `gallery` directory inside the templates, we create a file, `posts.html`:  

```html
<!DOCTYPE html>  
<html lang="en" dir="ltr">  
    <head>  
        <meta charset="utf-8">  
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css">  
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js"></script>  
        <title>Amazon Cloud With Django</title>  
    </head>  
    <body>  
        <div class="header">  
            <h2 class="text-center">Gallery Posts</h2>  
        </div>  
        <br>  
        <div class="container-fluid">  
            <div class="row">  
            {% for post in posts %}  
            <div class="col-md-4 col-sm-12">  
                <div class="card" style='width: 100%; float: left; margin-bottom:10px;'>  
                <img src="{{ post.image.url }}" class="img-responsive-resize" style="width: 100%; height: 400px; object-fit: cover; float: left; margin-right: 10px;" alt="">  
                </div>  
            </div>  
            {% endfor %}  
            </div>  
        </div>  
    </body>  
</html>  
```

Next, we import bootstrap links to help with web styling and title our page. In the posts page, which we will call Gallery Posts, we create a div container-fluid to pad the content inside the page and loop the posts, which are the images in the template. We then add bootstrap styling to make the images responsive.

The key-value `posts` from the context passed when rendering the template in our view. Next, in the `img src` attribute, we give the URL of the image the browser will render. From the bootstrap class, we then define how we want the picture to appear on the page. Finally, we close the loop with an `endfor` in Django.  

Now that everything is almost set, we just need to route our views then upload images to our site. In our app directory, gallery, create a file called urls.py:  

```bash
cd gallery  

touch urls.py  
```

In the `urls.py` file, add the following snippet:  

```python
from django.urls import path  
from .import views  

urlpatterns = [  
   path('', views.posts, name='posts')  
]  
```

We import the path function from the `django.urls` module and views from the parent directory gallery. `urlpatterns` is an array to route our views. We leave the route blank using the `path()` as it will be the home page when running the application. However, it can take any route, and it is not a convention for homepages to take the default route. 

For instance, if we have many pages and want users to route to the about page, we can configure it as `about/` instead of blank. For this case, your landing page will take a blank route.

We created the views. posts function in the view earlier. The name calls the route in other files within the application.  

In `admin.py`, we have not registered our model, `Post`, yet we will add images through the admin panel. In a`dmin.py`, we import the `Post` from the models.py file. To register the file, we add `admin.site.register(Post)`. The file should look like this:  

```python
from django.contrib import admin  
from gallery.models import Post  

admin.site.register(Post)  
```

We must configure our application to work with media files. In the project directory’s `settings.py` file, first, add an import command like this at the top of the file:  

```python
import os   
```

Then, add a URL to serve media files and a folder to store media files, like this:  

```python
MEDIA_URL = '/media/'  

MEDIA_ROOT = os.path.join(BASE_DIR, 'media/')  
```

In the project directory, `django_project`, we import `MEDIA_URL` and `MEDIA_ROOT` in `urls.py`. We begin by importing settings and `static()` from the `django.conf` and `django.conf.urls.static` modules, respectively.

Below the file, we then add:  

```python
if settings.DEBUG:  
    urlpatterns += static(settings.MEDIA_URL,  
                          document_root=settings.MEDIA_ROOT)  
```

The file’s final snippet should look like this:

```python
from django.contrib import admin   
from django.conf import settings #added
from django.conf.urls.static import static #added
from django.urls import path, include  

urlpatterns = [  
   path('', include('gallery.urls')),  
   path('admin/', admin.site.urls),  

]  

if settings.DEBUG:  
    urlpatterns += static(settings.MEDIA_URL,  
                          document_root=settings.MEDIA_ROOT)  
```

To run the application, we need to perform migrations and create a superuser, then add a few posts to see how they appear in the browser.  

To perform migrations, run the following SQL commands in the terminal:  

```bash
python manage.py makemigrations  
python manage.py migrate  
```

These commands create the model we created earlier.

To create a superuser, run the following command. Remember the credentials you use.  

```bash
python manage.py createsuperuser   
```

We can now run the application by typing this command:  

```bash
python manage.py runserver  
```

As of now, the page is empty. To add some posts, we head over to `http://127.0.0.1:8000/admin/` and enter the username and password we specified while creating the superuser. 

We click on `Posts` in the admin panel to add posts, return to the page and view the uploaded images.   

In the next section, we’ll explore how to serve the site’s images from a cloud service, AWS.  

### Introduction to AWS S3  
Amazon Web Services is a cloud service that allows users to store their object files through an interactive service interface. This type of storage enables application scalability in various infrastructures.

We’ll use Amazon S3 to store images from the application we created earlier. To do so, we first head over to the Amazon S3 [website](https://aws.amazon.com/s3/) and create an account. After registering an account, we sign in with the root user, like in the screenshot below:

![aws login](/engineering-education/using-amazon-web-service-for-django-media-files-storage/aws-landingpage.jpg)

Amazon Web Services might charge a small fee to register an account. At the time of writing, this fee was $1. In the next section, we will create an S3 bucket to start our configuration.

### Configuring AWS S3  
The AWS management console offers a variety of services. In the search bar, search for S3, then click on it as it is the service we will be using. 

Amazon will direct us to a page similar to the one in the screenshot below, and we then create a bucket with a unique name.

![aws console](/engineering-education/using-amazon-web-service-for-django-media-files-storage/aws-console.jpg)


An AWS bucket holds our files, and its name must be universally unique. For this tutorial, we use the name `djangotest-section`.

When creating a bucket, we just click through and accept all the defaults. We can change the AWS region, although the default is fine. We will not have to set the `CORS` configuration in the permission tab as we will not deploy the site.  

Once we create the bucket, we head over to the AWS management console. In the search tab, search for IAM, which stands for Identity and Access Management. IAM enables us to create a new user, as the screenshot below shows:  

![aws user](/engineering-education/using-amazon-web-service-for-django-media-files-storage/aws-users.jpg)


We create a username. Then, in  `AWS access type`, we click `Programmatic access`. It will enable us to access AWS with an access key ID and secret access key. 

However, we do not need the AWS console for that user, so we just leave it unchecked, as the screenshot shows:

![aws user](/engineering-education/using-amazon-web-service-for-django-media-files-storage/detailsone-aws.jpg)

Next, we set the permissions. In `Attach existing policies directly`, we search for the S3 policies and click `AmazonS3FullAccess`. Although it gives our users more access than they need, the access key ID and secret access key protect us. The page should resemble the screenshot below:

![aws details](/engineering-education/using-amazon-web-service-for-django-media-files-storage/detailstwo-aws.jpg)

For the next step, we leave the tags blank as we will not require them. We then review the user and the steps we completed then create a user. Our user should have an access key ID and secret access key, like in the screenshot below:  

![aws keys](/engineering-education/using-amazon-web-service-for-django-media-files-storage/aws-keys.jpg)

We need to set the access key ID and secret access key in an environment variable so anyone viewing our code cannot see them. In this article, we'll configure the credentials using environment variables. We could also place them in a `.env` file in our code and add it to our `.gitignore` file.   

In the default root of our terminal, we enter this command:   

```bash
nano ~/.bashrc
```

Then, we add our credentials and bucket name. Use your own here:  

```bash
export AWS_ACCESS_KEY_ID="***********"  

export AWS_SECRET_ACCESS_KEY="*********"  

export AWS_STORAGE_BUCKET_NAME="djangotest-section"  
```

To use the credentials we placed in environment variables, we need to close and restart the terminal.

To change Django code to use S3 instead of the local file system, we need to install some packages, including boto3, AWS Python package, and `django-storages`, making Django S3 interact.

We pull up our terminal and run these commands to install them:  

```bash
pipenv install boto3  

pipenv install django-storages  
```

Once these are installed, we’ll have to change the `settings.py` file. The `django-storages` we installed is a Django app, and we should place it in `INSTALLED_APPS`. So we go ahead and add it, then `INSTALLED_APPS` should look like this:  

```python
INSTALLED_APPS = [  

   'gallery.apps.GalleryConfig', #added  

   'django.contrib.admin',  

   'django.contrib.auth',  

   'django.contrib.contenttypes',  

   'django.contrib.sessions',  

   'django.contrib.messages',  

   'django.contrib.staticfiles',  

   'storages' #added  

]  
```

Add it as `storages`, not `django-storages`. Once that is done, we’ll have to add more settings in the environment variables that we placed earlier. So we add them to our `settings.py` file:

```python
# S3 Bucket Configurations  

AWS_ACCESS_KEY_ID = os.environ.get('AWS_ACCESS_KEY_ID')  

AWS_SECRET_ACCESS_KEY = os.environ.get('AWS_SECRET_ACCESS_KEY')  

AWS_STORAGE_BUCKET_NAME = os.environ.get('AWS_STORAGE_BUCKET_NAME')  
```

This configuration provides AWS with all the credentials it needs to access that particular bucket through that user. Next, we add a few more settings:

```python
AWS_S3_FILE_OVERWRITE = False  

AWS_DEFAULT_ACL = None  

DEFAULT_FILE_STORAGE = 'storages.backends.s3boto3.S3Boto3Storage'   
```

`AWS_S3_FILE_OVERWRITE` prevents the system from overwriting files in case two users upload the same file name. Finally, the `DEFAULT_FILE_STORAGE` setting enables us to upload our media files to AWS S3. 

For more on how to use `django-storages` in Amazon S3, read their [documentation](https://django-storages.readthedocs.io/en/latest/backends/amazon-S3.html).   

Lastly, we need to configure the region we specified earlier in S3 while creating a bucket. We add the region like this:  

```python
AWS_S3_REGION_NAME = "us-east-2"  

AWS_S3_ADDRESSING_STYLE = "virtual"
```

Our media directory has an image folder containing images we uploaded through the admin panel. We need to upload this folder to the S3 bucket. To do this, we head over to the bucket we created earlier. 

We upload the whole images folder within our bucket. We can also choose to drag and drop it in our bucket.

Once that is done, we go ahead and test our application.

### Testing Our Application
To test our application, we first need to run the application through the command line:

```bash
python manage.py runserver
```

Our site should resemble a page like this:  

![gallery app](/engineering-education/using-amazon-web-service-for-django-media-files-storage/test-application.jpg)

If we right-click on an image and open it in another tab, Amazon S3 should serve the picture. We can similarly check the image URL when we open it through the S3 bucket.

### Conclusion
This tutorial created a simple gallery application that displays images using a Python macro framework, Django. 

In addition, we used AWS cloud storage to store the photos to scale the site quickly and for an efficient way to render media files when deploying to any platform a user chooses.

Using these same techniques, you can create your own Django application and set up cloud image hosting to scale along with your user base.

For a detailed discussion of AWS and getting started, check their [documentation](https://docs.aws.amazon.com/s3/index.html). To get started with the Django Framework, explore their [documentation](https://docs.djangoproject.com/en/3.2/intro/).

---
Peer Review Contributions by: [Jerim Kaura](/engineering-education/authors/jerim-kaura/)
