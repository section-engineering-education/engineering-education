![hero](/engineering-education/api-authentication-with-django-knox-and-postman-testing/hero.png)

#### Introduction

Django-Knox is a framework that makes the authentication of the API endpoints built with the Django Rest Framework easier. Although Knox is also a token-based authentication like JSON Web Token (J.W.T) auth. This comes with well-detailed documentation for easy implementation.

#### Keys Take Away

In this tutorial,  the following are the subjects to be covered:
1. Why Knox is used with Django Rest Framework
2. Designing Rest API endpoints with class-based views
3. Securing endpoints with Django-Knox
4. Testing API with postman application

Now that you have been introduced and the keys are defined, let us dive deep into the business of the day.

### Why Django-Knox With DRF

Like I said earlier, Knox solves some problems found with the built-in `TokenAuthentication` in DjangoRestFramework. How right?

1. Token is generated per one call in login views with Knox. This allows each user to have one active token which can be deleted having logged out.
2. Knox provides an encrypted form of tokens before storing them in the database. This feature will not allow any hacker to have access even if the database was stolen.
3. Expiration of tokens is also a key feature of Knox which was not built in DRF.

If you are curious to know more about all these benefits, head on to `https://james1345.github.io/django-rest-knox/`.

### Designing Rest API With Class-Based Views

We are building the Rest API endpoints for an application called `Leads`. Leads will contain all information of leads like name, email, message, and owner models.

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

Moreso, to use Knox with the DRF, it has to be attached to the rest framework classes. For this reason, we will be adding the below python dictionary to the `settings.py`.

```python
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': ('knox.auth.TokenAuthentication', ),
}
```

### Building The Rest API

The best practice is to make a separate app for the leads API inside the project `Leads`. To make an app in Django,  we type the command:

```bash
$ python manage.py startapp leadsapi
```
First thing first, every app generated has to be added to the `INSTALLED_APPS` in `settings.py` of the `Leads` folder.

```python
INSTALLED_APPS = [
    'rest_framework',
    'corsheaders',
    'knox',
    'leadsapi'
]
```

Furthermore, we have to define our lead models inside the `models.py` of the app created. In this model, each lead would have the properties like `name`, `email`, `message`, and lastly `owner`. 

Every lead will be linked to the built Django `User` as the owner, through the `Foreign Key` connection. Here is an instance below:

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
Now let us migrate the model into the database. First of all,  we will be generating a migration folder and finally migrate to the default `Sqlite3`.

```bash
$ python manage.py makemigrations
$ python manage.py migrate
```

We have to serialize the data from the leads model.Serialization of data means turning the model data into the `JSON` format. So here is the serialization code. 

```python
from rest_framework import serializers
from leadsapi.models import LeadModel

class LeadSerializer(serializers.ModelSerializer):

    class Meta:
        model = LeadModel
        fields = '__all__'
```

The fields having `__all__` means that all the properties of the lead shall be serialized.

Inside the same `leadsapi` app, make an `api.py`. Here we will be inheriting from the `viewsets` of the DRF and map the serializer class. Also, we will be defining the `permission_class` from the rest framework and get the query set of all leads with the method called `get_querysets`. The code below does the implementation.

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

All things have been good so far. The very next thing is to make use of the `urls.py` file inside the `leadsapi` app. 

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

Now that we have built the rest API, it is time to secure it by allowing only the authenticated users to perform HTTP `GET`, `POST` methods.

We will make a fresh app called `account` which I believe we have demonstrated above. Follow the procedures, make the new app and add it to the settings.

As we have said that Knox provides a token to every logged-in user, for them to access the secured data. 

We will be serializing the data of the user by making use of the Django built-in `User` model. This will be done inside the `serializers.py` in the new app created.

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

The `RegisterSerialize` class does the same thing but added the password field with the modality of ``write_only`. 

While the `LoginSerializer`class does the trick of the authentication. The method called `validate` requires the data as the argument which passes it to the `authenticate` method from the rest framework. 

By doing so, the user will be verified with their token that is already inside the data passed. If the token provided matches, the user will be logged in. But if otherwise,  a validation error will be sent.

Furthermore, the views for the registration and login shall be done inside the file named `api.py` in our `account` app. 

```python
from django.contrib import auth
from rest_framework import generics, permissions, serializers
from rest_framework.response import Response
from knox.models import AuthToken
from .serializers import UserSerializer, RegisterSerializer, LoginSerializer

class RegisterAPI(generics.GenericAPIView):
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


class LoginAPI(generics.GenericAPIView):
    serializer_class = LoginSerializer

    def post(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data
        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            "token": AuthToken.objects.create(user)[1]
        })


class UserAPI(generics.RetrieveAPIView):
  permission_classes = [
      permissions.IsAuthenticated
  ]
  serializer_class = UserSerializer

  def get_object(self):
    return self.request.user
```

Here are the explanations for each of the classes.

As for the `RegisterAPI` and `LoginAPI` classes, we are providing the serializers made earlier to the `serializer_class` due to the class-based views that we used.

The method `post` will be triggered whenever a user is try to register by sending data and a token is generated at the same time. For every user that registered successfully, a token will be sent along with the data for login.

The `UserAPI` will make the user available from the `User` model. Also, the authentication will be done on the received user.

Lastly, the `urls.py` file in the `account` app will be used to make URLs endpoints for the registration and login of users. 

We will be importing the APIViews made in `api.py` as the views for the routes. Here is the code for the routing.

```python
from django.urls import path, include
from .api import RegisterAPI, LoginAPI, UserAPI
from knox import views as knox_views

urlpatterns = [
    path('api/auth/', include('knox.urls')),
    path('api/auth/register', RegisterAPI.as_view()),
    path('api/auth/login', LoginAPI.as_view()),
    path('api/auth/user', UserAPI.as_view()),
    path('api/auth/logout',knox_views.LogoutView.as_view(), name="knox-logout"),
]
```

Note that we are including `knox.urls`, this is to route every HTTP calls with the endpoints `api/auth` to match the secured API. 

And also we are using the built-in `LogoutView` for logout of users if requested.

### Postman Testing

If you already have a postman, go ahead and test the API following the procedures below. But if you don't have it installed on your local machine, head on to ![Download Postman](/https://www.postman.com/downloads/).and download.

Remember that the server has to be running before you can make HTTP calls to the endpoints. For that reason, we will be starting the server with the command below.

```bash
$ python manage.py runserver
```

Before we can reference the API we have to register and then login which I assume you know.

1. Make a `GET` request to `http://localhost:8080/api/leads` and `http://localhost:8080/api/user`. Since the user is not logged in, then a validation error should be sent.
"fcdec16877f60c59f8552533444d1e809ffc4b7436606ad94139f82ad25542d1"

2. Now make a `POST` request to  `http://localhost:8080/api/auth/register` and under the body, choose `raw` >> `JSON`. Provide the JSON object for the user having `username, `email`, and `password`.

The response will come with a token that will be used to authorize the user when logging in. See image below;

![Postman Registration API Testing](/engineering-education/api-authentication-with-django-knox-and-postman-testing/register.png)


3. Copy out the token sent from the registration and paste it in the value section of `Authorisation` under the `Headers` by typing `Token` before it as shown below.

 Now Make a `POST` request to `http://localhost:8080/api/auth/login` with only the `username`, and `password` of the registered user. Having logged in, another fresh token will be sent for log out.

![Postman Log In API Testing](/engineering-education/api-authentication-with-django-knox-and-postman-testing/login.png)

4. Finally, make a `GET` request to the leads API endpoints and you will be allowed to access it. This must be done before the token expired.

#### Conclusion

In this tutorial, I covered the detail about the Django-Knox. I was able to demonstrate the token wise of the framework by building the rest API endpoints that are based on user authentication and authorization. Seek more by checking out the documentation of the framework here![Django-Knox](/https://james1345.github.io/django-rest-knox/).

Happy Coding!!
