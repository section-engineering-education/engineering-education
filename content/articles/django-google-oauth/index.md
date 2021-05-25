---
layout: engineering-education
status: publish
published: true
url: /django-google-oauth/
title: User Registration in Django using Google OAuth
description: In this tutorial, we will look at how to register users in a Django app using Google OAuth. This process allows users to log in to multiple sites with the same credentials. 
author: geoffrey-mungai
date: 2020-12-18T00:00:00-13:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/django-google-oauth/hero.jpg
    alt: Django using Google OAuth
---
Open Authorization (OAuth) is a service that allows websites or apps to share user information with other websites without being given a users password. Users can log in to multiple websites with the same account without creating other credentials. 
<!--more-->
Some of the most popular OAuth service providers are Google, Facebook and GitHub. In this tutorial, we look at registering users in a Django app using Google OAuth.

### Prerequisites
To follow along with this tutorial, you need [Python3](https://www.python.org/downloads/) installed on your machine.

### Step 1 -- Create and set up a new Django project
Create a new virtual environment using the command below.

```bash
$ python3 -m venv virtual
```

Activate the created virtual environment by running the command below.

```bash
$ source virtual/bin/activate
```

Then, install the latest version of Django from PyPI by running the following command.

```bash
$ pip install django
```

Then, create a new Django project using the command:
```bash
$ django-admin startproject oauth_project .
```

Then, create a Django app using this command:
```bash
$ python manage.py startapp oauth_app
```

Then, apply the database migrations using the `migrate` command:
```bash
$ python manage.py migrate
```

Register the `oauth_app` to the `oauth_project` project by adding it to `INSTALLED_APPS` in `settings.py`.

*djangooauth/settings.py*
```python
INSTALLED_APPS = [
    #...
    'django.contrib.sites',
    'oauth_app',
]
```

### Step 2 -- Install and set up `django-allauth`
To integrate Google OAuth features into our app, we will use [*django-allauth*](https://django-allauth.readthedocs.io/en/latest/installation.html). 

Install the package from Pypi by running the command:
```bash
$ pip install django-allauth
```

Then register `django-allauth` by adding it to `INSTALLED_APPS` in `settings.py`.

*djangooauth/settings.py*
```python
INSTALLED_APPS = [
    #...
    'allauth',
    'allauth.account',
    'allauth.socialaccount',
    'allauth.socialaccount.providers.google',
]
```

The line `allauth.socialaccount.providers.google` specifies the OAuth provider since `django-allauth` supports [many OAuth providers](https://django-allauth.readthedocs.io/en/latest/providers.html).

We will also set `django-allauth` as the authentication backend for our application in the `AUTHENTICATION_BACKEND` configurations. 

At the bottom of `settings.py`, add the following code:

*djangooauth/settings.py*
```python
AUTHENTICATION_BACKENDS = [
    'django.contrib.auth.backends.ModelBackend',
    'allauth.account.auth_backends.AuthenticationBackend'
]
```

Then set Google as the OAuth provider under `SOCIALACCOUNT_PROVIDERS` configurations.

*djangooauth/settings.py*
```python
SOCIALACCOUNT_PROVIDERS = {
    'google': {
        'SCOPE': [
            'profile',
            'email',
        ],
        'AUTH_PARAMS': {
            'access_type': 'online',
        }
    }
}
```

The `SCOPE` specifies what is requested from Google APIs. If the scope is not specified, it defaults to `profile` . To refresh authentication in the background, set `AUTH_PARAMS['access_type']` to `offline`.

Then add a site ID and redirect users to the base route after a successful login or logout.

*djangooauth/settings.py*
```python
SITE_ID = 2

LOGIN_REDIRECT_URL = '/'
LOGOUT_REDIRECT_URL = '/'
```

### Step 3 -- Create and configure templates
We will be using Django templates to display the **Login with Google** button. Create a new folder called `templates` in your base directory. Then create a file `index.html` inside the `templates` folder.

```bash
$ mkdir templates
$ cd templates
$ touch index.html
```

Open `index.html` and put the following code:

*templates/index.html*
```jinja
{% load socialaccount %}
<html>
<body>
<h1>My Google OAuth Project </h1>
{% if user.is_authenticated %}
  <p>Welcome, You are logged in as {{ user.username }}</p>
{% else %}
  <a href="{% provider_login_url 'google' %}">Login With Google</a>
{% endif %}
</body>
</html>
```

The code above checks if the user is authenticated. If true, the username is displayed. If not, the "**Login with Google**" link is displayed. On clicking the link, the user will be directed to the Google OAuth dialog.

Then, register this `templates` folder in the `TEMPLATES` configurations in `settings.py`.

*djangooauth/settings.py*
```python
TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [BASE_DIR / 'templates'],
        'APP_DIRS': True,
        #...
    }
]
```

### Step 4 -- Configure OAuth URLs
Open the project's `urls.py` and put add the following code.

*djangooauth/urls.py*
```python
#...
from django.urls import path, include
from django.views.generic import TemplateView
from django.contrib.auth.views import LogoutView

urlpatterns = [
    #...
    path('', TemplateView.as_view(template_name="index.html")),
    path('accounts/', include('allauth.urls')),
    path('logout', LogoutView.as_view()),
]
```

We add a base route that will display our template `index.html`. We also add a route `/accounts` that "includes" django-allauth URLs. All OAuth operations will be performed under this route. We also add the default Django logout view at `/logout`.

### Step 4 -- Create  and configure a new Google APIs project
Head over to [Google Developer APIs Console](https://console.developers.google.com/apis) and create a new project. 

![](/engineering-education/django-google-oauth/create-g-oauth-project.jpg)

Then, register your app by filling the [OAuth consent screen](https://console.developers.google.com/apis/credentials/consent).

![](/engineering-education/django-google-oauth/g-oauth-consent-screen-1.jpg)

Then, create a new **OAuth client ID** under **[Credentials](https://console.developers.google.com/apis/credentials)**. Select **Web application** for the **Application type**.  

Then, add:
- `http://127.0.0.1:8000` under **Authorized JavaScript origins**.
- `http://127.0.0.1:8000/accounts/google/login/callback/` under  **Authorized redirect URIs**.

![](/engineering-education/django-google-oauth/authorised-redirects.jpg)

After a successful OAuth client ID creation, copy `Your Client ID` and `Your Client Secret`, you will need them in step 5.

### Step 5 -- Add a social app in Django admin

Now, make the migrations using this command:
```bash
$ python manage.py migrate
```

Then, create a superuser by running the following command in a terminal.

```bash
$ python manage.py createsuperuser
```

Run the app using:
```bash
$ python manage.py runserver
```

Open http://127.0.0.1:8000/admin and login to Django Admin.  Under `Sites` click `Add` and put `127.0.0.1:8000` as both the **Domain name** and **Display name**.

![](/engineering-education/django-google-oauth/create-dj-site.jpg)

Then, under `Social Applications` click `Add` and fill in the details as follows:
1. Provider: Google
2. Name: OAuth App
3. Client id: <The client ID you created in step 4>
4. Secret key: <The Secret key you created in step 4>
5. Sites: 127.0.0.1:8000

![](/engineering-education/django-google-oauth/add-social-app.jpg)

Since you are currently logged in as a superuser, logout and login again using your Google account.

If you get an error: `SocialApp matching query does not exist` at http://127.0.0.1:8000/accounts/google/login/, it means that the ID of the site you created in Django admin is not the same as the one in `settings.py`. Consider playing around with the `SITE_ID` value. 

For example: `SITE_ID = 3`, etc.

For more information look at [Django "sites" framework docs](https://docs.djangoproject.com/en/3.1/ref/contrib/sites/).

![](/engineering-education/django-google-oauth/sign-in-with-google.jpg)

After signing in with Google, you can check the user information obtained from Google at: `http://127.0.0.1:8000/admin/socialaccount/socialaccount/`. 

Google provides little information about its users. To get more user information from Google, [your app needs to be verified](https://developers.google.com/apps-script/guides/client-verification).

### Conclusion
You can integrate Google OAuth into your Django application with Django OAuth packages like `django-allauth`. You can also integrate other OAuth services similarly using `django-allauth`.

Happy Coding!

---
Peer Review Contributions by: [Adrian Murage](/engineering-education/authors/adrian-murage/)
