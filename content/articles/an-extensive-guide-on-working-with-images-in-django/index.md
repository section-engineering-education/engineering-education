Working with images is an important skill to have as a web developer and since Django is one of the most popular web development frameworks, it provides ways of dealing with images conveniently.

This tutorial will look at various situations that you might encounter while working with images in Django and also provide guidance on how to tackle those situations.

### Table of content
 - [Setting up the environment](#step-1---setting-up-the-environment)
 - [Creating and registering the models](#step-2---creating-and-registering-the-models)
- [Displaying the images](#step-3---displaying-the-images)
- [User image upload](#user-image-upload)
- [Listing the images in the Admin site](#listing-the-images-in-the-admin-site)
- [Creating Thumbnails](#creating-thumbnails)
- [Adding a background image in a Django template](#adding-a-background-image-in-a-django-template)
- [Conclusion](#conclusion)

### Prerequisites
To follow through this tutorial practically, you need to:
1. Have fundamental knowledge in both Python and Django
2. Have a code editor.ie: VS code

### Step 1 - Setting up the environment
We shall start by setting up a development environment for our Django project. In your command line, create a new directory for our project and name it `Images`:
```bash
mkdir Images
```

Then enter the directory, create a virtual environment and activate it respectively using the commands below:
```bash
cd Images
```
```bash
py -m venv .venv
```
```bash
.venv\Scripts\activate.bat
```
Now we will need to install:
 - Django - this python package helps build our website using the Django web development framework.
 - Pillow - this is a python image library that we shall use to manipulate our images.

We will install the above using:
```bash
pip install django
```
```bash
pip install pillow
```
After the installation, we can now proceed to create the Django project named `myGallery`:
```cd 
django-admin startproject myGallery
```
Enter the project directory:
```bash
cd myGallery
```
and then create our app `demo`:
```bash
py manage.py startapp demo
```
Now we need to register our `demo` app in the list of installed apps. In the `settings.py` file under `installed apps`:

```py
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'demo',                        # new
]
```
Now we need to tell Django which URL to use when serving the media files and also give it a path to the root directory where our images will be stored. We shall do this by using `MEDIA_URL` and `MEDIA_ROOT` respectively. So while still in `settings.py` we shall add the following:

```py
MEDIA_URL = '/media/'
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')

```
Also, make sure to import os at the top of `settings.py`
```py
import os
```
Now to enable a user to upload images during development, we need to add the following settings in our project-level `urls.py` for testing purposes. It should look like this:

```py 
from django.contrib import admin
from django.urls import path
from django.conf import settings
from django.conf.urls.static import static 

urlpatterns = [
    path('admin/', admin.site.urls),

] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

```
We are now done laying down the groundwork of uploading our images.

### Step 2 - Creating and registering the models
We can now proceed and define a model that shall be used for storing the images in our app. In `settings.py` we shall create a model with two fields, title of a photo and the photo itself:
```py
from django.db import models

class Image(models.Model):
    title = models.CharField(max_length=20)
    photo = models.ImageField(upload_to='pics')
```

The `upload_to` tells Django to store the photo in a directory called `pics` which shall be created in the `media` directory upon image upload.

Now we can register our model in `admin.py`:
```py
from django.contrib import admin
from .models import Image

class imageAdmin(admin.ModelAdmin):
    list_display = ["title", "photo"]

admin.site.register(Image, imageAdmin)
```
The `list_display` list tells Django admin what to display in the admin dashboard.

### Step 3 - Displaying the images
So far, it is possible to upload the images using the Django admin, but we also need to display the images on our site. So we have to add the display template, display view, and also configure the URLs.

#### The display view
In `views.py`, we shall create a function-based view that shall fetch all the Image objects from our database when requested:
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

#### The display template
In our app `demo`, we shall create a directory named `templates` and create a file named `display.html` inside it. Inside `display.html` we will add the following code to help display all the uploaded images:
```HTML
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

#### Configuring the urls
At the project level(myGallery), we will add some code to point the root URL to our demo app's URLs:
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
Now we shall create another file named `urls.py` in our `demo` app directory, then add the following code:
```py
from django.urls import path
from .import views

urlpatterns = [
    path('', views.index, name='index'),
]
```
the root path points towards the index view which in return gets the images and renders them together with the `display.html`.

#### Testing
To test if the upload and display work, we can go ahead and run the server. But before all that, we will first have to make the migrations in our database, then create the superuser. In our `cmd`, we shall go ahead and run:
```bash
py manage.py makemigrations   
```
The command above generates the SQL commands for our new Images model.
Then also run:
```bash
py manage.py migrate
```
The command above executes the SQL commands generated by the `makemigrations` command.
We can now create our admin account using the command below:
```bash
py manage.py createsuperuser
```
Then run the local server:
```bash
py manage.py runserver
```
In your [Admin site](http://127.0.0.1:8000/admin/), add some images then check how they appear on the [display page](http://127.0.0.1:8000/).
On adding four images on my end, here is what my `display.html` looks like:

![display.html](/engineering-education/an-extensive-guide-on-working-with-images-in-django/display.jpg)

Now that we have looked at the basic concepts of dealing with images, we shall proceed to the advanced concepts next.

### User image upload
In this case, we are going to look at how to enable a user to upload an image from their end using the help of a form.
In our app-level directory `demo`, create a file and call it `forms.py`. In the file, we shall create the class for handling the upload form and link it to our `Image` model:
```py
from django import forms
from .models import Image

class ImageUploadForm(forms.ModelForm):

    class Meta:
        model = Image
        fields = ['title', 'photo']
```
With the help of the fields above, Django will present us with the input fields in our form. Now we shall create the HTML form that shall display those input fields. In our `templates` folder, add a file named `upload.html` and add this code to it:
```HTML
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
In our HTML form above:

 - method="POST" - this requests the server to accept the submission of a form.
 - enctype="multipart/form-data" - this encodes files in a certain way that allows them to be submitted through POST method.
 - {% csrf_token %} - this tag enables us to protect out site from Cross Site Request Forgeries
 - {{ form.as_p }} - this displays our form fields wraped around with the paragraph's HTML tags 

Next, we will create a function-based view that shall handle the image upload. In `views.py`, update your code into:
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
Upon the submission of a form, it will be checked for a POST request, and if it returns a positive result, the ImageUploadForm will be called to handle it. We then go ahead and check the validity of the form before saving it and redirecting the users to the display page where they can view it.

The only remaining part is updating our `urls.py`. In our apps level `urls.py` file, update it to:
```py
from django.urls import path
from .import views

urlpatterns = [
    path('', views.index, name='index'),
    path('upload_image/', views.uploadView, name= 'upload_image') # new
]
```
The new path [upload_image](http://127.0.0.1:8000/upload_image/) points to the `uploadView`, which in return, takes care of the upload process. 
 Here is what mine looks like :

![upload.html](/engineering-education/an-extensive-guide-on-working-with-images-in-django/upload.jpg)

### Listing the images in the Admin site
As of now, our admin site images are listed using their names and paths:

![before](/engineering-education/an-extensive-guide-on-working-with-images-in-django/before.jpg)

This makes it hard to identify the images without having to click on the links. We can easily improve this by listing the images themselves on the dashboard, alongside their names.

We will edit our Image model in `models.py`, to add an `image_tag` field which helps render the images.
Update your `models.py` into:

```py
from django.db import models
from django.utils.safestring import mark_safe # new

# Create your models here.

class Image(models.Model):
    title = models.CharField(max_length=20)
    photo = models.ImageField(upload_to='pics')

    def image_tag(self):                     # new
        return mark_safe('<img src="/../../media/%s" width="150" height="150" />' % (self.photo))
```
The `mark_safe` tells Django templates to render the string as it is instead of escaping it(render it as text using `&lt;&gt;`). Therefore it renders the HTML image tag with its path and size for every image.

Now we need to update `admin.py` to include the `image_tag` in the `list_display`:
```py
from django.contrib import admin
from .models import Image

class imageAdmin(admin.ModelAdmin):
    list_display = ["title", "image_tag", "photo"] # new

admin.site.register(Image, imageAdmin)
```
As a result, our [Image dashboard](http://127.0.0.1:8000/admin/demo/image/) should resemble this:

![after](/engineering-education/an-extensive-guide-on-working-with-images-in-django/after.jpg)

### Creating Thumbnails
If you click on images in our [display page](http://127.0.0.1:8000/), they tend to have different default sizes. The big images might even take longer to load due to their size. In case you want to change this behavior and give them a reasonable size, you would have to override the `save` method in our Image model. 

We will create thumbnails of the images by editing their size during the uploading process, and set the maximum value of width and height to 300. Let's update our `models.py` into:
```py
from django.db import models
from django.utils.safestring import mark_safe 
from PIL import Image as Im                  # new

# Create your models here.

class Image(models.Model):
    title = models.CharField(max_length=20)
    photo = models.ImageField(upload_to='pics')

    def image_tag(self):                     
        return mark_safe('<img src="/../../media/%s" width="150" height="150" />' % (self.photo))

    def save(self):                        # new
        super().save()

        img = Im.open(self.photo.path)

        # resize it
        if img.height > 300 or img.width > 300:
            output_size = (300,300)
            img.thumbnail(output_size)
            img.save(self.photo.path)

```

### Adding a background image in a Django template
We shall go on and add a background image to our upload template. To do so we shall create a directory named `static` in our app level directory `demo`, and add the background image you intend to use inside it. 

Our image in this case is called `bj.jpg`. In `upload.html`, We shall load the statics at the top, then add the background image in the body tag. Update your `upload.html` to:
```HTML
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
After that, we shall change the `STATIC_URL` in `settings.py` from 
```py 
STATIC_URL = 'static/'
```
To 
```py
STATIC_URL = '/static/'
```
This enables Django to find the static files(in this case the background image) within our `static` folder.

### Conclusion
We have looked at various solutions regarding working with images in Django. I Now hope you will be able to implement these solutions into your Django project as well.
