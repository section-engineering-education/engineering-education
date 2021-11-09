---
layout: engineering-education
status: publish
published: true
url: /api-authentication-with-django-knox-and-postman-testing/
title: API Authentication with Django Knox and Postman Testing
description: This tutorial will guide you on how to set up and integrate API authentication with Django Knox.
author: arafat-olayiwola
date: 2021-11-09T00:00:00-02:44
topics: [API]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/api-authentication-with-django-knox-and-postman-testing/hero.png
    alt: API Authentication with Django Knox and Postman Testing
---
Django-Knox is a framework that makes the authentication of the API endpoints built with the Django Rest Framework easier. However, Knox is also a token-based authentication like JSON Web Token (JWT) auth. Django-Knox comes with well-detailed documentation for easy implementation.

### Key takeaways

In this tutorial, the following are the subjects to be covered:
1. Why Knox is used with Django Rest Framework.
2. Designing Rest API endpoints with class-based views.
3. Securing endpoints with Django-Knox.
4. Testing API with postman application.

Now that you have a grasp of what Django-Knox is, let us discuss it in detail.

### Why Django-Knox with DRF

Like I said earlier, Knox solves some problems found with the built-in `TokenAuthentication` in DjangoRestFramework. How?

1. Token is generated per one call in login views with Knox. This allows each user to have one active token that gets deleted when a user logs out.
2. Knox provides an encrypted form of tokens before storing them in the database. This feature would not allow any hacker to have access even if the database is compromised.
3. Expiration of tokens is also a key feature of Knox that is not inbuilt in DRF.

If you are curious to know more about all these benefits, head on to [Django-Knox](https://james1345.github.io/django-rest-knox/).

### Designing Rest API with class-based views

We are building the Rest API endpoints for an application called `Leads`. Leads will contain all information of leads, like name, email, message, and owner models.

To build the API endpoints, we have to initialize the Django project. I believe you are familiar with the Django Rest Framework project setup. But if you are not, follow the below commands. 

```bash
$ cd Desktop
$ mkdir myproject
$ cd myproject 
$ virtualenv env
$ cd env
$ source env/Scripts/activate
$ pip install django
```

The latest Django has been installed. Let us configure the project folder and open it up in your favorite code editor.

```bash
$ django-admin startproject Leads
$ cd Leads
$ code  .
$ python manage.py runserver
```

Django default page will spin up when you open on localhost with port `8080` in the browser. 

To work with the Django Rest Framework, we have to install the package `django-rest-framework`.

```bash
$ pip install django-rest-framework
$ pip freeze > requirements.txt
```

The `requirements.txt` will keep track of all dependencies installed into the application.

Moreso, it has to be attached to the rest of the framework classes to use Knox with the DRF. For this reason, we will add the below python dictionary to the `settings.py`.

```python
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': ('knox.auth.TokenAuthentication', ),
}
```

### Building the Rest API

The best practice is to make a separate app for the leads API inside the project `Leads`. To make an app in Django, we type the command:

```bash
$ python manage.py startapp leadsapi
```
First, we must add every app generated to the `INSTALLED_APPS` in `settings.py` of the `Leads` folder.

```python
INSTALLED_APPS = [
    'rest_framework',
    'knox',
    'leadsapi'
]
```

Furthermore, we have to define our lead models inside the `models.py` of the app created. In this model, each lead would have the properties like `name`, `email`, `message`, and lastly `owner`. 

Every lead will be linked to the built Django `User` as the owner, through the `Foreign Key` connection. Here is an instance:

```python
from django.contrib.auth.models import User
from django.db.models.deletion import CASCADE
from datetime import timezone

class LeadModel(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField(max_length=100, unique=True)
    message = models.CharField(max_length=500)
    owner = models.ForeignKey(User, related_name="leads", null=True, on_delete=CASCADE)

    def __str__(self):
        return self.name
```
Now let us migrate the model into the database. First, we will generate a migration folder and finally migrate to the default  `Sqlite3`.

```bash
$ python manage.py makemigrations
$ python manage.py migrate
```

We have to serialize the data from the leads model. Serialization of data means turning the model data into the `JSON` format. So here is the serialization code. 

```python
from rest_framework import serializers
from leadsapi.models import LeadModel

class LeadSerializer(serializers.ModelSerializer):

    class Meta:
        model = LeadModel
        fields = '__all__'
```

The fields having `__all__` means that all the properties of the lead shall be serialized.

Inside the same `leadsapi` app, make an `api.py`. Here we will be inheriting from the `viewsets` of the DRF and map the serializer class. Also, we will be defining the `permission_class` from the rest framework and getting the query set of all leads with the method called `get_querysets`. The code below does the implementation.

```python
from rest_framework import serializers, viewsets, permissions

from leadsapi.models import LeadModel
from .serializers import LeadSerializer

class LeadViewset(viewsets.ModelViewSet):
    serializer_class = LeadSerializer
    permission_classes = [
        permissions.IsAuthenticated
    ]

    def get_queryset(self):
        return self.request.user.leads.all()
    
    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)
```

All things have been good so far. The very next thing is to use the `urls.py` file inside the `leadsapi` app. 

In this file, we will be making use of the rest framework routers by registering the endpoints.  


```python
from rest_framework import routers

from .api import LeadViewset

router = routers.DefaultRouter()
router.register('leads', LeadViewset, 'leads')

urlpatterns = router.urls
```
Whenever there are `HTTP GET` calls with `/leads` endpoint, the API fetches the client all serialized leads.

Let us register the endpoint with the project by going into the `urls.py` of the `Leads`folder.

```python
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('api/', include('leadsapi.urls')),
    path('', include('accounts.urls'))
]
```
Note that the `account.urls` shall be used later in the tutorial.

### Securing the endpoints with Django-Knox

Now that we have built the rest API endpoints, it is time to secure them by allowing only the authenticated users to perform HTTP `GET`, `POST` methods.

We will make a new app called `account` which I believe we have demonstrated above. Follow the procedures, make the new app and add it to the settings.

As we have said that Knox provides a token to every logged-in user, for them to access the secured data. 

We will serialize the user's data by making use of the Django built-in `User` model. This will be done inside the `serializers.py` in the new app created.

```python
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from django.db import models
from django.db.models import fields
from rest_framework import serializers

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email')


class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(validated_data['username'], validated_data['email'], validated_data['password'])
        return user


class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        user = authenticate(**data)
        if user and user.is_active:
            return user
        raise serializers.ValidationError('Incorrect Credentials Passed.')
```

The `UserSerializer` class maps the `User` model and extracts the mentioned fields for the serialization.

The `RegisterSerialize` class does the same thing but added the password field with the modality of `write_only`. 

While the `LoginSerializer` class does the trick of the authentication. The `validate` method requires the data as the argument which passes it to the `authenticate` method from the rest framework. 

We will verify the user with their token that is already inside the data passed. If the token provided matches, the user would be logged in. But if otherwise, the application will send a validation error.

Furthermore, the views for the registration and login shall be done inside the file named `api.py` in our `account` app. 

```python
from django.contrib import auth
from rest_framework import generics, permissions, serializers
from rest_framework.response import Response
from knox.models import AuthToken
from .serializers import UserSerializer, RegisterSerializer, LoginSerializer

class SignUpAPI(generics.GenericAPIView):
    serializer_class = RegisterSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        token = AuthToken.objects.create(user)
        return Response({
            "users": UserSerializer(user, context=self.get_serializer_context()).data,
            "token": token[1]
        })


class SignInAPI(generics.GenericAPIView):
    serializer_class = LoginSerializer

    def post(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data
        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            "token": AuthToken.objects.create(user)[1]
        })


class MainUser(generics.RetrieveAPIView):
  permission_classes = [
      permissions.IsAuthenticated
  ]
  serializer_class = UserSerializer

  def get_object(self):
    return self.request.user
```

Here are the explanations for each of the classes.

As for the `RegisterAPI` and `LoginAPI` classes, we are providing the serializers made earlier to the `serializer_class` due to the class-based views that we used.

The method `post` will be triggered whenever a user tries to register by sending data and a token is generated simultaneously. For every user that registered successfully, a token will be sent along with the data for login.

The `UserAPI` will make the user available from the `User` model. Also, the authentication will be done on the received user.

Lastly, the `urls.py` file in the `account` app will be used to make URLs endpoints for the registration and login of users. 

We will be importing the APIViews made in `api.py` as the views for the routes. Here is the code for the routing.

```python
from django.urls import path, include
from .api import SignUpAPI, SignInAPI, MainUser
from knox import views as knox_views

urlpatterns = [
    path('api/auth/', include('knox.urls')),
    path('api/auth/register', SignUpAPI.as_view()),
    path('api/auth/login', SignInAPI.as_view()),
    path('api/auth/user', MainUser.as_view()),
    path('api/auth/logout',knox_views.LogoutView.as_view(), name="knox-logout"),
]
```

Note that we include `knox.urls`. This is to route every HTTP calls with the endpoints `api/auth` to match the secured API. 

Also, we are using the built-in `LogoutView` to enable users to logout.

### Postman testing

If you already have a postman, go ahead and test the API following the procedures below. But if you don't have it installed on your local machine, then [click here](https://www.postman.com/downloads/) to download it.

Remember that the server has to be running before you can make HTTP calls to the endpoints. For that reason, we will be starting the server with the command below.

```bash
$ python manage.py runserver
```

Before we can interact with the API, we must register and then login, which I assume you know.

1. Make a `GET` request to `http://localhost:8080/api/leads` and `http://localhost:8080/api/user`. Since the user is not logged in, then a validation error should be sent.

2. Now make a `POST` request to  `http://localhost:8080/api/auth/register` and under the body, choose `raw` >> `JSON`. Provide the JSON object for the user having `username`, `email`, and `password`.

The response will be a token that will be used to authorize the user when logging in. See image below;

![Postman Registration API Testing](/engineering-education/api-authentication-with-django-knox-and-postman-testing/register.png)

3. Copy out the token sent from the registration and paste it in the value section of `Authorization` under the `Headers` by typing `Token` before it as shown below.

 Now Make a `POST` request to `http://localhost:8080/api/auth/login` with the `username`, and `password` of the registered user only. Having logged in, another fresh token will be sent for log out.

![Postman Log In API Testing](/engineering-education/api-authentication-with-django-knox-and-postman-testing/login.png)

4. Finally, make a `GET` request to the leads API endpoints and you will be allowed to access it. This must be done before the token expires.

### Conclusion

In this tutorial, we covered the implementation of Django-Knox. We demonstrated the token wise of the framework by building the rest of the API endpoints based on user authentication and authorization.

Happy Coding!

---
Peer Review Contributions by: [Okelo Violet](/engineering-education/authors/okelo-violet/)
