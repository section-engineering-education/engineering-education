---
layout: engineering-education
status: publish
published: true
url: /engineering-education/securing-django-api/
title: Introduction on Securing Django APIs
description: This tutorial will be an introduction on how to secure a Django API, using token-based authentication and JavaScript web token to perform requests.
author: odhiambo-paul
date: 2020-12-16T00:00:00-11:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/securing-django-api/hero.jpg
    alt: Django API web based tokens example image
---
In this tutorial, we will secure our TODO API endpoints that we previously created in this [article](/engineering-education/django-crud-api/). We will start by implementing Token-based authentication and then implement Javascript web tokens (JWT).
<!--more-->

### Token-based authentication
Token-based authentication works by getting a token for the correct username and password used to perform subsequent requests to the server.

#### Code setup
Add `'rest_framework.authtoken'` to the apps list in `django_todo` settings.py file.

```python
# ./django_todo/settings.py
...

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

Then add `'rest_framework.authentication.TokenAuthentication'` to the `REST_FRAMEWORK` dictionary in the `django_todo` project `settings.py`.

```python
REST_FRAMEWORK = {
    'DEFAULT_SCHEMA_CLASS': 'rest_framework.schemas.coreapi.AutoSchema',
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework.authentication.TokenAuthentication',
    ],
}
```

Run the command `./manage.py migrate` to create the table that will store the authentication tokens.

```bash
 $ ./manage.py migrate
 ```

 We need to create a user and test the token generation if it works as expected.  To create a user for testing, we use a `manage.py` command-line utility.
 
 Run the command:
 ```bash
 python manage.py createsuperuser --username paul --email paul@gmail.com
 ```

### Project setup
Since this is a continuation of our previous [article](/engineering-education/django-crud-api/), we will be using the `Django_todo` application that we created there.

If you don't have the application we created in the previous article, you can clone it from [here](https://github.com/paulodhiambo/django_todo/tree/master).


To secure our endpoint using a token, we will add `permission_classes` to our view classes in `views.py` file in the `todo` app directory.

```python
from rest_framework.generics import CreateAPIView
from rest_framework.generics import DestroyAPIView
from rest_framework.generics import ListAPIView
from rest_framework.generics import UpdateAPIView
from rest_framework.permissions import IsAuthenticated # new import

from todo.models import Todo
from todo.serializers import TodoSerializer


# Create your views here.
class ListTodoAPIView(ListAPIView):
    """This endpoint list all of the available todos from the database"""
    permission_classes = (IsAuthenticated,) #permission classes
    queryset = Todo.objects.all()
    serializer_class = TodoSerializer


class CreateTodoAPIView(CreateAPIView):
    """This endpoint allows for creation of a todo"""
    permission_classes = (IsAuthenticated,)#permission classes
    queryset = Todo.objects.all()
    serializer_class = TodoSerializer


class UpdateTodoAPIView(UpdateAPIView):
    """This endpoint allows for updating a specific todo by passing in the id of the todo to update"""
    permission_classes = (IsAuthenticated,)#permission classes
    queryset = Todo.objects.all()
    serializer_class = TodoSerializer


class DeleteTodoAPIView(DestroyAPIView):
    """This endpoint allows for deletion of a specific Todo from the database"""
    permission_classes = (IsAuthenticated,)#permission classes
    queryset = Todo.objects.all()
    serializer_class = TodoSerializer

```

Adding permission classes to our view classes will make our API endpoints more secure. When we visit `http://127.0.0.1:8000/api/v1/todo/` we get HTTP 403 forbidden error.

### Implementing the token authentication
In the `settings.py` file in our `django_todo` projects directory add `rest_framework.authtoken` to the `INSTALLED_APPS` list and also include `TokenAuthentication` to the `REST_FRAMEWORK` dictionary.

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
    'rest_framework.authtoken',# <-- authtoken
    'coreapi',
]

REST_FRAMEWORK = {
    'DEFAULT_SCHEMA_CLASS': 'rest_framework.schemas.coreapi.AutoSchema',
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework.authentication.TokenAuthentication',  # <-- TokenAuthentication
    ],
}
```

Now we should run the command `./manage.py migrate` to create the table that will store the authentication tokens.

```bash
$ ./manage.py migrate
```

To create an authentication token, we need a user account that we can create through the command line.

Run the command below to create a user account:
```bash
$ ./manage.py createsuperuser --username paul --email paul@domain.com
```

We can also generate the authentication token through the command line. Run the command `python manage.py drf_create_token paul` to generate the authentication token.

```bash
$ ./manage.py drf_create_token paul
Generated token 342b58233e5fdeb2446bcaae60b6e51e953f7a17 for user paul
```

We will be using the generated token `342b58233e5fdeb2446bcaae60b6e51e953f7a17` to authenticate our requests to the server.

Let's make a request to `http://127.0.0.1:8000/api/v1/todo/` adding our token as an authorization header `Authorization: Token 342b58233e5fdeb2446bcaae60b6e51e953f7a17`.

![GET Request with token](/engineering-education/securing-django-api/get-using-token.png)

### User token endpoint
The Django rest framework comes with an endpoint that users can use to generate their authentication tokens by providing their valid username and password.

In the `django_todo` project directory add the API endpoint for token generation in the `urls.py` file.
```python
from django.contrib import admin
from django.urls import path
from django.urls import include
from rest_framework.authtoken.views import obtain_auth_token
from rest_framework.documentation import include_docs_urls
from rest_framework_simplejwt import views as jwt_views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/v1/todo/', include("todo.urls")),
    path('docs/', include_docs_urls(title='Todo Api')),
    path('api/token', obtain_auth_token, name="auth_token")
]

```

Making a POST request to `http://127.0.0.1:8000/api/token/` with a valid username and password returns an authentication token in the response body that can be used to authenticate subsequent requests.

![POST Request](/engineering-education/securing-django-api/get-token.png)


### Implementing the JSON web token JWT authentication

#### How JWT works
JWT is an access token acquired by passing in username and password for a refresh token and access token.
**Access token** has a short lifespan (usually 5 minutes) while **refresh token** has a longer lifespan (usually 24 hours).

Sample JWT: 
```
eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNTQzODI4NDMxLCJqdGkiOiI3ZjU5OTdiNzE1MGQ0NjU3OWRjMmI0OTE2NzA5N2U3YiIsInVzZXJfaWQiOjF9.Ju70kdcaHKn1Qaz8H42zrOYk0Jx9kIckTn9Xx7vhikY
```

JWT consists of 3 parts:

`header.payload.signature`

In the JWT above, we have:
```bash
header = eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9
payload = eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNTQzODI4NDMxLCJqdGkiOiI3ZjU5OTdiNzE1MGQ0NjU3OWRjMmI0OTE2NzA5N2U3YiIsInVzZXJfaWQiOjF9
signature = Ju70kdcaHKn1Qaz8H42zrOYk0Jx9kIckTn9Xx7vhikY
```

The information above is encoded using a Base64 encoder. 

After decoding the information above, we get:

**Header**
```json
{
  "typ": "JWT",
  "alg": "HS256"
}
```

**Payload**
```json
{
  "token_type": "access",
  "exp": 1543828431,
  "jti": "7f5997b7150d46579dc2b49167097e7b",
  "user_id": 5
}
```

**Signature**

JWT provides the signature. The signature is verified whenever a request is made to the server. If the client's information in the header or payload is tempered, then the signature will be invalidated. We will be using `djangorestframework_simplejwt` to implement JWT authenticate.

We will be using `djangorestframework_simplejwt` to implement JWT authenticate.

To install run the command:
```bash
pip install djangorestframework_simplejwt
```

In the `settings.py` file in the `django_todo` applications directory, add `rest_framework_simplejwt.authentication.JWTAuthentication` to the `DEFAULT_AUTHENTICATION_CLASSES` in the `REST_FRAMEWORK` dictionary.

```python
REST_FRAMEWORK = {
    'DEFAULT_SCHEMA_CLASS': 'rest_framework.schemas.coreapi.AutoSchema',
    'DEFAULT_AUTHENTICATION_CLASSES': [
        # 'rest_framework.authentication.TokenAuthentication',  # <-- Token Authentication
        'rest_framework_simplejwt.authentication.JWTAuthentication',  # <-- JWT Authentication
    ],
}
```

In the `urls.py` file in the `django_todo` directory add the URL endpoints below to obtain the refresh and access tokens.

```python
from django.contrib import admin
from django.urls import path
from django.urls import include
from rest_framework.authtoken.views import obtain_auth_token
from rest_framework.documentation import include_docs_urls
from rest_framework_simplejwt import views as jwt_views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/v1/todo/', include("todo.urls")),
    path('docs/', include_docs_urls(title='Todo Api')),
    path('api/token', obtain_auth_token, name="auth_token"),
    path('api/jwt/token/', jwt_views.TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/jwt/token/refresh/', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),
]

```

**Obtaining Token**
To get the access and refresh tokens, make a POST request to `http://127.0.0.1:8000/api/jwt/token/` passing in username and password.

![POST JWT Request](/engineering-education/securing-django-api/jwt-get-token.png)

We get a refresh and access token as the response.

```json
{
    "access": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNTQ1MjI0MjU5LCJqdGkiOiIyYmQ1NjI3MmIzYjI0YjNmOGI1MjJlNThjMzdjMTdlMSIsInVzZXJfaWQiOjF9.D92tTuVi_YcNkJtiLGHtcn6tBcxLCBxz9FKD3qzhUg8",
    "refresh": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTU0NTMxMDM1OSwianRpIjoiMjk2ZDc1ZDA3Nzc2NDE0ZjkxYjhiOTY4MzI4NGRmOTUiLCJ1c2VyX2lkIjoxfQ.rA-mnGRg71NEW_ga0sJoaMODS5ABjE5HnxJDb0F8xAo"
}
```

To access the protected endpoints in our backend, we should include the access token in the header of all of our requests.

![Postman image](/engineering-education/securing-django-api/jwt-rquest.png)

We can use the access token within 5 minutes before it expires. After that we will need to obtain another access token using the refresh token we got from the previous API request.

When we try to make requests to protected endpoints, we will get the error below.

![GET Request](/engineering-education/securing-django-api/jwt-error.png)

To get a new access token, we will make a post request to `http://127.0.0.1:8000/api/jwt/token/refresh/` posting the refresh token.

![POST Request](/engineering-education/securing-django-api/jwt-refresh.png)

The refresh token is valid for 24 hours, after that a user is required to reauthenticate in order to obtain a new refresh and access token.

The access token is shortlived because it's sent through the HTTP header, which might get compromised; therefore, it's only valid for a short while.

For additional customization, visit [Django simple jwt](https://github.com/davesque/django-rest-framework-simplejwt)

Happy Coding!

---
Peer Review Contributions by: [Lalithnarayan C](/engineering-education/authors/lalithnarayan-c/)

