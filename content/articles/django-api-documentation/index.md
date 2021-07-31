---
layout: engineering-education
status: publish
published: true
url: /django-api-documentation/
title: Getting started with Django API documentation
description: This article will go over a step-by-step tutorial on how to document Django REST APIs with swagger, coreapi and redoc.
author: okelo-violet
date: 2021-04-02T00:00:00-11:00
topics: [API]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/django-api-documentation/hero.jpg
    alt: Getting started with Django API documentation example image
---
REST API documentation is an important step in the process of API development. Documentation makes it possible for other developers who will consume the API to understand how the API works.
<!--more-->

### Documenting APIs
In this tutorial, we are going to learn how to add documentation to our RESTful API endpoints.

### Prerequisites
1. [Python](https://www.python.org/downloads/) installed on your computer.
2. [Virtualenv](https://pypi.org/project/virtualenv/) installed on your computer.
3. [Python](https://www.python.org/) and [Django](https://www.djangoproject.com/) knowledge.

### Creating the project
On the terminal execute the command below to create a working directory for our project.

```bash
$ mkdir documentation
$ cd documentation
```

Now that we have created a working directory and changed our path to it, create a virtual environment for the project by executing the command below.

```bash
$ virtualenv venv
$ source venv/bin/activate
```

Let's now install Django into our virtual environment and create our Django project by executing the commands below.

```bash
$ (venv) pip install django
$ (venv) django-admin startproject django_todo
```

Since we are going to use the DjangoRest framework, drf_yasg, and coreapi, we need to install these packages.

Execute the commands below to install DjangoRest framework, drf_yasg, and coreapi.

```bash
$ pip install djangorestframework
$ pip install coreapi
$ pip install -U drf-yasg[validation]
```

Django organizes code into applications, this makes it easier to write code that is easier to maintain. Execute the command below to create a `todo` app that will hold the source code for our application.

```bash
$ ./manage.py startapp todo
```

### Django Model
In the `todo` app created above, add the code snippet below to the `models.py` file. A model is a Python class that represents a table in a relational database. Django maps the models to database tables.

```python
class Todo(models.Model):
    title = models.CharField(max_length = 100)
    body = models.CharField(max_length = 100)
    is_completed = models.BooleanField(default=False)
    date_created = models.DateField(auto_created=True)
    last_modified = models.DateField(auto_now=True)

    def __str___(self):
        return self.title 
```

### Django serializer
Converting data from Python objects to JSON and vice versa is a challenging task. Django simplifies that process of conversion by providing a `serializer` class that can be extended to perform the conversion.

In the `todo` app create a Python file named `serializers.py` and add the code snippets below.

```python
class TodoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Todo
        fields = "__all__"
```

### Django API view
Django follows the model view template (MVT) pattern. The view holds the logic that acts on the incoming HTTP requests.

In the `views.py` file in the `todo` app, add the code snippet below.

```python
from rest_framework.generics import ListAPIView
from rest_framework.generics import CreateAPIView
from rest_framework.generics import DestroyAPIView
from rest_framework.generics import UpdateAPIView
from todo.serializers import TodoSerializer
from todo.models import Todo

# Create your views here.
class ListTodoAPIView(ListAPIView):
    """Lists all todos from the database"""
    queryset = Todo.objects.all()
    serializer_class = TodoSerializer

class CreateTodoAPIView(CreateAPIView):
    """Creates a new todo"""
    queryset = Todo.objects.all()
    serializer_class = TodoSerializer

class UpdateTodoAPIView(UpdateAPIView):
    """Update the todo whose id has been passed through the request"""
    queryset = Todo.objects.all()
    serializer_class = TodoSerializer

class DeleteTodoAPIView(DestroyAPIView):
    """Deletes a todo whose id has been passed through the request"""
    queryset = Todo.objects.all()
    serializer_class = TodoSerializer
```

### Django URL
To communicate with our applications, we must provide an API endpoint URL where the client can request and submit data. In the `todo` app, create a new file named `urls.py` and add the code snippet below.

```python
urlpatterns = [
    path("",views.ListTodoAPIView.as_view(),name="todo_list"),
    path("create/", views.CreateTodoAPIView.as_view(),name="todo_create"),
    path("update/<int:pk>/",views.UpdateTodoAPIView.as_view(),name="update_todo"),
    path("delete/<int:pk>/",views.DeleteTodoAPIView.as_view(),name="delete_todo")
]
```

In the root project `urls.py` file, add the code snippet below to configure our `todo` app URLs with the root project URLs.

```python
# Swagger documentation setup
schema_view = get_schema_view(
    openapi.Info(
        title="Snippets API",
        default_version='v1',
        description="Test description",
        terms_of_service="https://www.google.com/policies/terms/",
        contact=openapi.Contact(email="contact@snippets.local"),
        license=openapi.License(name="MIT License"),
    ),
    public=True,
    permission_classes=[permissions.AllowAny],
)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/v1/todo/', include("todo.urls")),
    path('docs/', include_docs_urls(title='Todo Api')),
    url(r'^swagger(?P<format>\.json|\.yaml)$', schema_view.without_ui(cache_timeout=0), name='schema-json'),
    url(r'^swagger/$', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    url(r'^redoc/$', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
]

```

### Django settings.py
The `settings.py` file should contain the configurations below. Add the packages we installed earlier to the `INSTALLED_APPS` apps dictionary.

```python
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent


SECRET_KEY = '9s^sq5s0pp*hd)%i2)*m3n--e-=)2tn&7i&c)o6z#l-m18jx4)'

DEBUG = True

ALLOWED_HOSTS = []


# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'todo',
    'rest_framework',
    'coreapi', # Coreapi for coreapi documentation
    'drf_yasg', # drf_yasg fro Swagger documentation
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'django_todo.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]
REST_FRAMEWORK = {
    'DEFAULT_SCHEMA_CLASS': 'rest_framework.schemas.coreapi.AutoSchema'
}

WSGI_APPLICATION = 'django_todo.wsgi.application'


DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}


AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_L10N = True

USE_TZ = True


STATIC_URL = '/static/'
```

### Testing the documentation
Now that we have implemented the code required to generate documentation for our API, let us test it.

>**Note:** Make sure the application is running.

#### Coreapi
On your browser, navigate to `http://127.0.0.1:8000/docs/` to view the coreapi documentation. 

![coreapi documentation](/engineering-education/django-api-documentation/coreapi.png)

#### Swagger
On your browser, navigate to `http://127.0.0.1:8000/swagger/` to view the swagger documentation.

![Swagger documentation](/engineering-education/django-api-documentation/swagger.png)

#### redoc
On your browser, navigate to `http://127.0.0.1:8000/redoc` to view redoc documentation.

![redoc documentation](/engineering-education/django-api-documentation/redoc.png)

### Conclusion
Now that you have learned how to document Django RESTful API endpoints, proceed and add descriptive notes to every API endpoint documentation.

Happy coding!

---
Peer Review Contributions by: [Odhiambo Paul](/engineering-education/authors/odhiambo-paul/)
