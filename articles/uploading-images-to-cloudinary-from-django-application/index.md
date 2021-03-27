Sometimes while working on applications that require the use of images, a simple process like uploading images to a server can become difficult.
If you deploy your Django to platform like heroku, you can't save image.

In this tutorial, we look at how to save images in Django using CLoudinary.

Cloudinary is an end-to-end image- and video-management solution for websites and mobile apps, covering everything from image and video uploads, storage, manipulations, optimizations to delivery.

### Prerequisites

To follow along with this tutorial, you need Python3 installed on your machine.

### Creating and setting up a new Django project

Let's start by creating a new virtual environment

```bash
$ python -m virtualenv env

```

Activate virtual environment

```bash
$ source virtual/bin/activate

```

Install Django

```bash
$ pip install django

```

Create new Django project

```bash
$ django-admin startproject photoapp

```

Create Django app

```bash
$ django-admin startapp photos

```

Lets add our app to the list of installed apps. Navigate to the "photoapp" directory and edit the settings.py file

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

Now lets head over to [cloudinary](https://cloudinary.com/) website to create an account.
Click on the Sign Up button and fill in your details to create an account.

### Installation

Install the cloudinary module in our project

```bash
$ pip install cloudinary

```

Next thing is to add Cloudinary to the list of installed apps in settings.py


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

We will also need to include Cloudinary's python classes in settings.py

```python
    import cloudinary
    import cloudinary.uploader
    import cloudinary.api
```

### Configuration

To use the Cloudinary Django library, we have to configure at least our cloud_name, api_key and api_secret .
we can find our account-specific configuration credentials in the Dashboard page of the account console.

![Cloudinary Dashboard](/engineering-education/uploading-images-to-cloudinary-from-django-application/dash.png)

```python
cloudinary.config( 
  cloud_name = "your_cloud_name", 
  api_key = "Your_api_key", 
  api_secret = "Your_api_secret" 
)
```

### Creating a model

In the “photos” directory, edit the models.py file and add the following lines of code to it.

```python
    from django.db import models
    from cloudinary.models import CloudinaryField

    class photos(models.Model):
        Tittle = models.CharField(max_length=100)
        image = CloudinaryField('image')
```

Now let's migrate our model to the database by running the commands bellow

```bash
# migrating the app and database changes
$ python manage.py makemigrations

# final migrations
$ python manage.py migrate
```

Then we create a superuser by running the command below

```bash
 $ python manage.py createsuperuser 
 
 ```


Now let's register the photos model in the admin.py file so we can modify it in the Django admin section.

```python
from django.contrib import admin
from .models import photos

admin.site.register(photos)

```

Let's now login to the admin page.

To login to the admin section, go to this link [localhost:8000/admin](localhost:800/admin) and login with our just created superuser details.

![Django Admin](/engineering-education/uploading-images-to-cloudinary-from-django-application/admin.png)

![](/engineering-education/uploading-images-to-cloudinary-from-django-application/django-admin.png)

Now, let's add an image in the photos category to test if it uploads to cloudinary.

Click on pictures, then click "Add Photo" to add an image

![](/engineering-education/uploading-images-to-cloudinary-from-django-application/add-photo.png)

![](/engineering-education/uploading-images-to-cloudinary-from-django-application/photo-added.png)

To confirm if the image was uploaded successfully, click on the just added image, clik on the link there.

We can also confirm by going tp the "media library" section on our cloudinary account.


### Creating View

Now let's create a view to view the image. Add the following code to your views.py file

```python
from django.shortcuts import render

def index(request):
    return render(request, 'index.html')
```

Let's create our "templates" folder. Inside the folder, create a index.html file.

photos/templates/index.html

Before adding our html code, let's quickly create a new url for newly created view.

Add the following code to urls.py file

```python
from django.contrib import admin
from django.urls import path
from photos import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', views.index, name='index'),
]
```

Let's also import our photos model in the views.py file

we also need to add context to render, so we can use image in our template.

```python
from django.shortcuts import render
from .models import photos

def index(request):
    photo = photos.objects.all()
    ctx = {'photo':photo}
    return render(request, 'index.html', ctx)
    
```

Now let's work on our html template to display the image

Open the index.html file we created earlier and paste the following code.

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
    {% for pic in photo %}
    <h2>{{pic.Tittle}}</h2>
        <img src="{{pic.image.url}}" alt="fish">
    {% endfor %}
</body>
</html>

```

![](/engineering-education/uploading-images-to-cloudinary-from-django-application/fish-local.png)

### Conclusion
We've seen how we can add upload images to cloudinary from our Django app. For further learning on image/video upload and transformation using cloudinary. Check out the link below

[Django video and image upload](https://cloudinary.com/documentation/django_image_and_video_upload).




