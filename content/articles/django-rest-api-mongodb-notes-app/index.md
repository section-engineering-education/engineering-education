---
layout: engineering-education
status: publish
published: true
url: /django-rest-api-mongodb-notes-app/
title: How to Build a Notes app API using Django REST Framework and MongoDB
description: This tutorial will teach us how to build a notes API using Django and MongoDB. We will look at how to install MongoDB. We will add notes using the Browsable API.
author: jekayinoluwa-olabemiwo
date: 2021-05-17T00:00:00-12:30
topics: [API]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/django-rest-api-mongodb-notes-app/hero.jpg
    alt: Django MongoDB API example
---
MongoDB is a NoSQL database package. It keeps data in JSON-like format instead of the traditional row-column format. The Django REST framework is a robust package of tools for building extensible APIs. Django is one of the most well-liked packages that Python developers use to build websites.
<!--more-->
You will learn how to use the powerful Django REST framework and MongoDB in your web projects. You will learn how to build CRUD features in a notes app.

In this article, you will:
- Understand to integrate MongoDB into Django projects.
- Learn how to set up and run Django REST API.
- Create CRUD features in Django REST API.
- Build a Notes app API.

### Prerequisites
To follow this article along it is important to have the following:
- Python 3 installed on your machine. Go to the [official website to download Python 3](https://www.python.org/download/releases/3.0/).
- Experience with Python and Django.

### Setting up the MongoDB server
You may download and install the MongoDB database server from the [official MongoDB website](https://www.mongodb.com/try/download/community).

You can check this guide if you use a Windows machine, [Installing MongoDB on Windows](https://docs.mongodb.com/v4.4/tutorial/install-mongodb-on-windows/#install-mongodb-community-edition). 

For Linux users, follow this tutorial, [How to Install MongoDB on Ubuntu 20.04](https://linuxize.com/post/how-to-install-mongodb-on-ubuntu-20-04/). 

Mac users can follow the tutorial, [Installing MongoDB on Mac](https://docs.mongodb.com/v4.4/tutorial/install-mongodb-on-os-x/#install-mongodb-community-edition)

You can check the version of MongoDB installed on your machine with the following command:

```bash
mongo --version
```

To use the mongo shell, start the service with the following command:

```bash
mongo
```

Create and switch to a new database with the following command:

```bash
use notes_database
```

MongoDB Compass is a GUI tool that enables you to interact with MongoDB. You can view and operate your MongoDB databases with MongoDB Compass. 

MongoDB Compass is available for download on the official website, [Download and Install Compass](https://docs.mongodb.com/compass/master/install/).

### Setting up the virtual environment
We will install `virtualenv` to enable a virtual environment for our project. It will enable one to isolate a project and its dependencies from other projects on your machine. 

Run the following command to install `virtualenv`:

```bash
python -m pip install --user virtualenv
```

Next, let's create a folder for our project and then create a virtual environment inside it. 

Create a folder called `django_mongodb_project` as such:

```bash
mkdir django_mongodb_project
```

Move into the project folder with the following command:

```bash
cd django_mongodb_project
```

Create a virtual environment called `venv` with the following command:

```bash
virtualenv venv
```

Next, activate the environment:

```bash
source venv/bin/activate
```

If you use Windows, activate the virtual environment with the following command:

```bash
.\venv\Scripts\activate
```

### Install packages
We will need the `django`, `djangorestframework`, and `djongo` packages.
- django: the Django framework package.
- djangorestframework: the Django REST Framework for developing APIs in Django.
- djongo: a tool that maps Python objects to MongoDB documents.

Let's install Django and the Django REST framework with the following command:

```bash
pip install django django-rest-framework djongo
```

Now, create a Django project called `notes_app`:

```bash
django-admin startproject notes_app
cd notes_app
```

Then, create an app called `api` inside the `notes_app` project.

```bash
django-admin startapp api
```

Navigate to the `settings.py` file inside the project-level folder. Then, change the `INSTALLED_APPS` list by adding our created app, `api` and `rest_framework`:

```python
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework',
    'api',
]
```

### Configuring MongoDB
Navigate to the `settings.py` file and change the `DATABASES` setting as follows:

```python
DATABASES = {
   'default' : {
      'ENGINE' : 'djongo',
      'NAME' : 'notes_database'
   }
}
```

### Building the notes app via API
We will develop an API for a notes app to jot and take notes down. Users will be able to take notes, get a list of notes they made, and delete the notes.

Let's define a model for the notes in the `models.py` file of the `api` app that we have created:

```python
from django.db import models
class Note(models.Model):
    title = models.CharField(max_length=50)
    text = models.TextField()
    def __str__(self):
        return self.title
```

Let's migrate the model into the database:

```bash
python manage.py makemigrations
python manage.py migrate
```

Next, let's create a serializer class. When users make requests to the API, the serializers format the corresponding responses. Create a new `serializers.py` file in the `api` app folder. Make the necessary imports as demonstrated below and create the `NoteSerializer` class.

```python
from rest_framework import serializers
from .models import Note
class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = ('id', 'title', 'text')
```

Next, let's create the views that will handle the request and response actions of our API. Create the `NoteList` and `NoteDetail` views in the `views.py` file of the `api` app.

```python
from rest_framework import generics
from .models import Note
from .serializers import NoteSerializer
class NoteList(generics.ListCreateAPIView):
    queryset = Note.objects.all()
    serializer_class = NoteSerializer
class NoteDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Note.objects.all()
    serializer_class = NoteSerializer
```

In the code above, we created two views. `NoteList` enables us to create a note and also view a list of created notes. `NoteDetail` allows us to view a particular note, update or delete it.

Next, we will create endpoints to receive requests. Create a new `urls.py` file inside the `api` directory. 

Create the `urlpatterns` as follows inside:

```python
from django.urls import path
from api import views
urlpatterns = [
    path('', views.NoteList.as_view()),
    path('<int:pk>/', views.NoteDetail.as_view()),
This conversation was marked as resolved by hectorkambow
]
```

Next, set up the `urls.py` file of the project to point to the app level `urlpatterns`. Then, include a path to the `urls.py` file of the `api` app.

```python
from django.contrib import admin
from django.urls import path, include
urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('api.urls')),  # add this line
]
```

The first endpoint receives the actions 'LIST' and 'CREATE' actions of the `NoteList` view. The second endpoint takes the `id` of a particular note to view the details of the note.

### Testing with browsable API
Django REST framework comes shipped with the browsable API. You can test your API endpoints with the browsable API.

Activate the test server:

```bash
python manage.py runserver
```

Then navigate to `127.0.0.1:8000/api/` on your browser to create notes.

![image title](/engineering-education/django-rest-api-mongodb-notes-app/list-notes.png)

You can add notes and refresh the webpage to see the added notes.

![image title](/engineering-education/django-rest-api-mongodb-notes-app/added-notes.png)

Then, view the created notes at `127.0.0.1:8000/api/id`:

![image title](/engineering-education/django-rest-api-mongodb-notes-app/detail-view.png)

You can also delete or update the note on the detail page. The red square in the next image contains the delete button.

![image title](/engineering-education/django-rest-api-mongodb-notes-app/delete-update-option.png)

You can also update the title or text of the note. See the blue square area on the image above. Edit the text or title and click the 'PUT` button.

### Conclusion
This article described how to configure the MongoDB database for a RESTful Django API. We also created an API for a Notes app. You may go on and use MongoDB in your Django REST API projects.'

You may check out the example code in the [GitHub repo](https://github.com/J-rayX/django_mongodb_project). 

Thanks for reading.

Happy coding!

---
Peer Review Contributions by: [Geoffrey Mungai](/engineering-education/authors/geoffrey-mungai/)
