Have you ever wanted to create a restful API endpoint for consumption in your mobile app or single page front end application but never had an idea on how to get started? This article explains step by step process of creating a Restful crud API endpoints in the [Django](https://www.djangoproject.com/) and [Django rest framework](https://www.django-rest-framework.org/). Don't worry the article explains the stepwise process of creating a todo crud API endpoint from start to finish, even if you have little knowledge of the Django framework, this article is for you.

### Prerequisites

- Basics of Django web framework
- Basics of Python programming language.
- Postman installed.
- Code editor of your choice installed.
- Python and Virtualenv installed.
  
To verify if Python is installed and configured correctly on your system, Open the terminal and type in the command `python3 --version` on Linux/Mac or `python --version` if you are on windows.

```python
$ python3 --version
Python 3.8.5
```
To verify virtualenv installation execute the command `virtualenv --version` on the terminal.
```python
$ virtualenv --version
virtualenv 20.0.35 from /home/user/.local/lib/python3.8/site-packages/virtualenv/__init__.py
```

### Creating the todo project.

We will start by creating our project's work directory and a virtual environment for our project. The virtual environment makes it possible to run our project in an isolated environment together with its dependencies.
Run `mkdir ~/todo` to create our working directory.

```python
$ mkdir ~/todo
$ cd todo
```
Run `virtualenv venv` to create a virtual environment for our project and `source venv/bin/activate` to activate the virtual environment for our project.
To install Django and Django rest framework in our virtual environment we run the command `pip3 install django` and `pip3 install djangorestframework`.

```python
$ pip install django
Collecting django
  Using cached Django-3.1.3-py3-none-any.whl (7.8 MB)
Collecting asgiref<4,>=3.2.10
  Downloading asgiref-3.3.1-py3-none-any.whl (19 kB)
Collecting pytz
  Using cached pytz-2020.4-py2.py3-none-any.whl (509 kB)
Collecting sqlparse>=0.2.2
  Using cached sqlparse-0.4.1-py3-none-any.whl (42 kB)
Installing collected packages: asgiref, pytz, sqlparse, django
Successfully installed asgiref-3.3.1 django-3.1.3 pytz-2020.4 sqlparse-0.4.1
```

```python
$ pip install djangorestframework
Collecting djangorestframework
  Downloading djangorestframework-3.12.2-py3-none-any.whl (957 kB)
     |████████████████████████████████| 957 kB 595 kB/s 
Requirement already satisfied: django>=2.2 in ./venv/lib/python3.8/site-packages (from djangorestframework) (3.1.3)
Requirement already satisfied: asgiref<4,>=3.2.10 in ./venv/lib/python3.8/site-packages (from django>=2.2->djangorestframework) (3.3.1)
Requirement already satisfied: sqlparse>=0.2.2 in ./venv/lib/python3.8/site-packages (from django>=2.2->djangorestframework) (0.4.1)
Requirement already satisfied: pytz in ./venv/lib/python3.8/site-packages (from django>=2.2->djangorestframework) (2020.4)
Installing collected packages: djangorestframework
Successfully installed djangorestframework-3.12.2
```

Lets create out django-todo project now by running the command `django-admin startproject django_todo`
```python
$ django-admin startproject django_todo
```
After successfully creating the project we change our working directory to our project folder and run the Django development server.
```python
$ cd django_todo
$ ./manage.py runserver
Watching for file changes with StatReloader
Performing system checks...

System check identified no issues (0 silenced).

You have 18 unapplied migration(s). Your project may not work properly until you apply the migrations for app(s): admin, auth, contenttypes, sessions.
Run 'python manage.py migrate' to apply them.
November 17, 2020 - 10:14:01
Django version 3.1.3, using settings 'django_todo.settings'
Starting development server at http://127.0.0.1:8000/
Quit the server with CONTROL-C.
```

When we visit http://127.0.0.1:8000/ we should see Django welcome page. Django makes it easy for us to organize our code into apps which we can easily use in another Django project. We just plug and play. We are going to create an app which we will use to organize our code for the todo endpoints.

To create an app, run:

```python
$ python3 manage.py startapp todo
```
The above command creates a directory todo and generates boilerplate code for a todo app. Now we can plug our todo app into our `django_todo` project.
Open `settings.py` in the project directory `django_todo` and add the name of our `todo` app in the `INSTALLED_APPS` list. We also add the `rest_framework` app that we installed to make it available for use in our project.
```python
# ./django_todo/settings.py
...
INSTALLED_APPS = [
    ...
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'todo',
    'rest_framework',
]
```
### Creating the Todo model

Models are python classes that get mapped to the database tables in the database. The Todo Model will be mapped to the todo table in the database. All Django models subclass the model. Model superclass.
In the `models.py` in the `todo` app, we will create our `Todo` model will the below code.

```python
from django.db import models

# Create your models here.
class Todo(models.Model):
    title = models.CharField(max_length = 100)
    body = models.CharField(max_length = 100)
    is_completed = models.BooleanField(default=False)
    date_created = models.DateField(auto_created=True)
    last_modified = models.DateField(auto_now=True)

    def __str___(self):
        return self.title 
```
To create an SQLite database and Todo table in the database, we will run the command `./manage.py makemigrations` to create SQL queries that will be used to create a `Todo` table in the database. To create the Todo table in the database will run the command `./manage.py migrate`.

### Creating the TodoSerializer

For converting the python objects we get from the database into a JSON format which we uses for our endpoints and conversion of JSON to python object which can be mapped to our database tables we will be subclassing a Django rest framework `Serializer.ModelSerializer` class for easier conversion.
In the todo app directory let's create a file `serializers.py` where we will write our `TodoSerializer` code.

```python
from rest_framework import serializers
from todo.models import Todo

class TodoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Todo
        fields = "__all__"
```

We only need to pass in the model that we need to serialize and the fields to serialize as meta fields. In our case, we are serializing all of the fields from the `Todo` model that's why we are passing `__all__` to our `fields` variable.

### Creating the TodoAPIView
In the `todo` app directory in the `views.py` file, we need to write in the logic for the CRUD functionality for our app. Django Rest framework comes with inbuilt classes which make building the CRUD functionality very easy. We start by importing the Django rest framework classes that we will use to create our CRUD API. We just need to create a class for each of our crud endpoints and add in the `queryset` and the `serializer_class` for our `Todo` model.

```python
from django.shortcuts import render
from rest_framework.generics import ListAPIView
from rest_framework.generics import CreateAPIView
from rest_framework.generics import DestroyAPIView
from rest_framework.generics import UpdateAPIView
from todo.serializers import TodoSerializer
from todo.models import Todo

# Create your views here.
class ListTodoAPIView(ListAPIView):
    """This endpoint list all of the available todos from the database"""
    queryset = Todo.objects.all()
    serializer_class = TodoSerializer

class CreateTodoAPIView(CreateAPIView):
    """This endpoint allows for creation of a todo"""
    queryset = Todo.objects.all()
    serializer_class = TodoSerializer

class UpdateTodoAPIView(UpdateAPIView):
    """This endpoint allows for updating a specific todo by passing in the id of the todo to update"""
    queryset = Todo.objects.all()
    serializer_class = TodoSerializer

class DeleteTodoAPIView(DestroyAPIView):
    """This endpoint allows for deletion of a specific Todo from the database"""
    queryset = Todo.objects.all()
    serializer_class = TodoSerializer
```
### Creating URL paths for our Todo endpoints.
The URLs allows us to interact with the various `Todo` crud views. In the `todo` app directory create a file `urls.py` where we will write URLs for various endpoints.

```python
from django.urls import path
from todo import views

urlpatterns = [
    path("",views.ListTodoAPIView.as_view(),name="todo_list"),
    path("create/", views.CreateTodoAPIView.as_view(),name="todo_create"),
    path("update/<int:pk>/",views.UpdateTodoAPIView.as_view(),name="update_todo"),
    path("delete/<int:pk>/",views.DeleteTodoAPIView.as_view(),name="delete_todo")
]
```
In the `urls.py` in the `django_todo` project directory, let's added the base URL for our app so that the `django_todo` project can be aware of the `todo` app URLs.

```python
from django.contrib import admin
from django.urls import path
from django.urls import include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/v1/todo/',include("todo.urls"))
]
```
### Testing the endpoints

Making a GET request to http://localhost:8000/api/v1/todo in postman returns a list of `todos`.
```json
[
    {
        "id": 1,
        "date_created": "2020-11-19",
        "title": "Go to market",
        "body": "Go Buy Goods from the market",
        "is_completed": true,
        "last_modified": "2020-11-17"
    },
    {
        "id": 2,
        "date_created": "2020-11-20",
        "title": "Go to school",
        "body": "Pick a book from the Library",
        "is_completed": false,
        "last_modified": "2020-11-17"
    }
]
```

To create a new Todo we make a POST request to 
http://localhost:8000/api/v1/todo/create/ with the new Todo object.

```json
{
    "date_created": "2020-11-19",
    "title": "Go to School",
    "body": "Go Buy Goods from the market",
    "is_completed": true,
}
```

To Update a Todo we make a PUT request to http://localhost:8000/api/v1/todo/update/1/ with the Todo object fields to update and the passing in Todo id as a URL parameter.

```json
{
    "date_created": "2020-11-19",
    "title": "Go to Town",
    "body": "Go Buy Goods from the market",
    "is_completed": false
}
```

To Delete a Todo we make a DELETE request to http://localhost:8000/api/v1/todo/update/1/ passing the id of the Todo to delete as URL parameter.

### Documenting Todo Endpoints
It's a good practice to provide documentation for the various endpoints that we create, this makes it easier for other people to use our API endpoints.

We will use coreapi to document our endpoints.To install coreapi and plug it into our app we run the command `pip3 install coreapi` in the terminal. On the `setting.py` file in ` django_todo` project directory add `coreapi` to the installed apps list and the add the below rest framework configuration to enable documentation autogeneration.
```python

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'todo',
    'rest_framework',
    'coreapi',
]
```

```python
REST_FRAMEWORK = {
    'DEFAULT_SCHEMA_CLASS': 'rest_framework.schemas.coreapi.AutoSchema'
}
```
Finally we create a url to our documentation page by adding a url configuration in the `urls.py` file in the `django_todo` project directory.

```python
from django.contrib import admin
from django.urls import path
from django.urls import include
from rest_framework.documentation import include_docs_urls

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/v1/todo/',include("todo.urls")),
    path('docs/', include_docs_urls(title='Todo Api')),
]
```

By visiting http://127.0.0.1:8000/docs/ in the browser we will get a full documentation of our Todo Crud API endpoints..

### Conclusion
We finally understand how to create and document our restful endpoint APIS in Django. Go ahead and clone the repos [django_todo](https://github.com/paulodhiambo/django_todo) to view the full source code of the project and add new fields to our Todo model. Next, we will secure our endpoints and add social authentication to our app.
