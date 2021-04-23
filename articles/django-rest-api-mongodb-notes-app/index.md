# Build a Notes App API with Django REST Framework and MongoDB

### Introduction
MongoDB is a NoSQL database system. It stores data in a JSON-like format instead of the traditional row-column format. The Django framework is a Python framework for web development. The Django REST framework is a powerful toolkit for building extensible APIs. 

In this tutorial, you will learn how to use the powerful Django REST framework and MongoDB in your web projects. You will learn how to put in place CRUD features in a notes app API.

By the end of this tutorial, you will be able to:

- Integrate MongoDB into Django projects.
- Set up and run a Django REST API.
- Create CRUD features for a Django REST API.
- Build a notes app API.

### Prerequisites
- Python 3 installed on your machine. You can install Python 3 from the [Python website](https://www.python.org/download/releases/3.0/).
- Some knowledge of Python and Django.

### Setting up a MongoDB server
Download and install the MongoDB database server from the [official MongoDB website](https://www.mongodb.com/try/download/community).

You can check [this](https://docs.mongodb.com/v4.4/tutorial/install-mongodb-on-windows/#install-mongodb-community-edition) guide for setting up MongoDB if you use a Windows machine. For Linux users, follow [this](https://linuxize.com/post/how-to-install-mongodb-on-ubuntu-20-04/) tutorial. Mac users can follow [this](https://docs.mongodb.com/v4.4/tutorial/install-mongodb-on-os-x/#install-mongodb-community-edition) tutorial.

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

MongoDB Compass is a GUI tool that enables you to interact with MongoDB. You can view and operate on your MongoDB databases with MongoDB Compass. You can download and install MongoDB Compass from the [official website](https://docs.mongodb.com/compass/master/install/).

### Setting up the virtual environment
We will install `virtualenv` for creating a virtual environment for our project. It will enable us to isolate this project and its dependencies from other projects on our machine. Run the following command to install `virtualenv`:

```bash
python -m pip install --user virtualenv
```

Next, let's create a folder for our project and then create a virtual environment inside it. Use the following command to create a folder called `django_mongodb_project`.

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

### Installing packages
We will need the following packages.
1. `django`: the Django framework package
2. `django-rest-framework`: the Django REST Framework for developing APIs in Django.
3. `djongo`: a tool that maps Python objects to MongoDB documents

Let us install these packages with the following command:

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

Navigate to the `settings.py` file in the project directory. Then, add `api` and `rest_framework` to the `INSTALLED_APPS` list:

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
Change the `DATABASES` setting to look as follows:

```python
DATABASES = {
   'default' : {
      'ENGINE' : 'djongo',
      'NAME' : 'notes_database'
   }
}
```

### Building the notes app API
We will develop an API for a notes app for jotting down notes. Users will be able to make notes, get a list of notes they made, edit and delete the notes.

Let us define a model for the notes in the `models.py` file of the `api` app that we have created:

```python
from django.db import models

class Note(models.Model):
	title = models.CharField(max_length=50)
	text = models.TextField()

	def __str__(self):
		return self.title
```

Let us migrate the model into the database:

```bash
python manage.py makemigrations
python manage.py migrate
```

Next, let us create a serializer class. When users make requests to the API, the serializers format the corresponding responses.

Create a new `serializers.py` file in the `api` app folder and add the following code.

```python
from rest_framework import serializers
from .models import Note

class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = ('id', 'title', 'text')
```

Next, let us create the views that will handle the request and response actions of our API.

Add the following code to the `views.py` file of the `api` app.

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

Next, we will create endpoints to receive requests. Create a new `urls.py` file inside the `api` directory and add the following code inside:

```python
from django.urls import path
from api import views

urlpatterns = [
    path('', views.NoteList.as_view()),
    path('/<int:pk>/', views.NoteDetail.as_view()),
]
```

Next, set up the `urls.py` file of the project to point to the app level `urlpatterns`. Then, include a path to the `urls.py` file of the `api` app.

```python
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api', include('api.urls')), # add this line
]
```

The first endpoint receives the actions 'LIST' and 'CREATE' actions of the `NoteList` view. The second endpoint takes the `id` of a particular note to view the details of the note.

### Testing with Browsable API
Django REST framework comes shipped with the browsable API. You can test your API endpoints with the browsable API.

Run the following command:

```bash
python manage.py runserver
```

Then navigate to http://127.0.0.1:8000/api/ on your browser to create notes.

![List notes](/engineering-education/django-rest-api-mongodb-notes-app/list-notes.JPG)

You can add notes and refresh the webpage to see the added notes.

![add notes](/engineering-education/django-rest-api-mongodb-notes-app/added-notes.JPG)

You can then view the created notes at 127.0.0.1:8000/api/id:

![details view](/engineering-education/django-rest-api-mongodb-notes-app/detail-view.JPG)

You can also delete or update the note on the detail page. The delete button is marked out in the red square on the image below.

![delete update option](/engineering-education/django-rest-api-mongodb-notes-app/delete-update-option.png)

You can also update the title or the text of the note. See the blue square area on the image above. Edit the text or title and click the `PUT` button.

### Conclusion
In this article, we have been able to configure the MongoDB database for a RESTful Django API. We also created an API for a notes app. You can go on and use MongoDB in your Django REST API projects.

You can check out the code in this tutorial in [this GitHub repo](https://github.com/J-rayX/django_mongodb_project).

Thanks for reading.
