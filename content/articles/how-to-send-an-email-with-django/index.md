---
layout: engineering-education
status: unpublish
published: false
url: /how-to-send-an-email-with-django/
title: How to send an email with Django
description: This tutorial is focused on teaching you how to send an email with Django using the Google SMTP service provider.
author: samuel-torimiro
date:
topics: [Languages]
excerpt_separator: <!--more-->
images:
  - url: /engineering-education/how-to-send-an-email-with-django/hero.jpg
    alt: Gmail example image
---

In most web applications that are customer-driven, there may be a need to send an email. Sending an email with Django is quite simple. In the first part of this tutorial, we will quickly set up a new Django project from scratch with some URLs, views and templates. Then, we will take a look at configuring the Google SMTP service provider and finally how to use the `send_mail()` function Django provides, to enable us to send emails.

### Prerequisites
To follow along with this tutorial, you will need a Google account. If you don't have one follow this [link](https://accounts.google.com/signup/v2/webcreateaccount?flowName=GlifWebSignIn&flowEntry=SignUp) to create a new Google account.

Prior knowledge of Django is also required.

### Project Setup and Overview
Open your terminal or command prompt, and run the following commands:

```bash
mkdir mail && cd mail

pipenv install django

pipenv shell
```

We created a new virtual environment using the `pipenv` command, you can install Pipenv if you don't have it already installed using `pip install pipenv`.

Next, create a new Python project and application.

```bash
django-admin startproject send_mail .

python manage.py migrate

python manage.py startapp mailer

python manage.py runserver
```

Next, navigate to <http://127.0.0.1:8000/> with your browser, you should see the default Django homepage.

![Django homepage](/engineering-education/how-to-send email-with-django/django-homepage.jpg)

Next, add the new application to your `settings.py` file.

```python
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',

    # new
    'mailer.apps.MailerConfig',
]
```

Next, update your project `send_mail/urls.py` to look like this:

```python
from django.contrib import admin
from django.urls import path, include # new

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('mailer.urls')), # new
]
```

Next, create a new file inside the `mailer` directory called `urls.py` and add the following code:

```python
from django.urls import path
from .views import sendMail

urlpatterns = [
    path('', sendMail),
]
```

Next, create a new file in your `mailer` directory called `forms.py` and add the following code:

```python
from django import forms

class EmailForm(forms.Form):
    recipient = forms.EmailField()
    message = forms.CharField(widget=forms.Textarea)
```

#### What's happening here?
1. We created a form class that inherits from the `Form` base class.
2. We then created several attributes (name, email, to, message) that we want to be displayed in our form.
3. Based on the attributes configuration, Django will determine how to generate the HTML for these fields and how to validate the fields.

Next, let's update the `views.py` of your mailer application to look like this:

```python
from django.shortcuts import render
from .forms import EmailForm
from django.core.mail import send_mail
from django.conf import settings


def sendMail(request):

    # create a variable to keep track of the form
    messageSent = False

    # check if form has been submitted
    if request.method == 'POST':

        form = EmailForm(request.POST)

        # check if data from the form is clean
        if form.is_valid():
            cd = form.cleaned_data
            subject = "Sending an email with Django"
            message = cd['message']

            # send the email to the recipent
            send_mail(subject, message,
                      settings.DEFAULT_FROM_EMAIL, [cd['recipient']])

            # set the variable initially created to True
            messageSent = True

    else:
        form = EmailForm()

    return render(request, 'index.html', {

        'form': form,
        'messageSent': messageSent,

    })
```

#### What's happening here?
1. We created a function called `sendMail`.
2. We then checked if the form was submitted, if it was, we validate user input, send the mail and then return `True`
3. Finally, if the form was not submitted we return an empty form or if the form has some errors we send the errors back for the form input to be corrected

Also take note of the `send_email()` function. It takes three required arguments. **The subject**, followed by **the message**, **the sender** and finally the **list of recipients**.

Next, create a new `templates` folder in your mailer application and inside a file called `index.html`, and add the following code:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css"
      rel="stylesheet"
      integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC"
      crossorigin="anonymous"
    />
    <title>Send Email</title>
  </head>
  <body>
    {% if messageSent %}
    <div class="container">
      <h3><strong>Email successfully sent</strong></h3>
      <p>Your message was successfully sent to {{ form.cleaned_data.to }}</p>
    </div>
    {% else %}
    <div class="container">
      <h3><strong>Send E-mail</strong></h3>

      <form method="post">
        {% csrf_token %} 
        {{ form.as_p }}
        <br />
        <div class="text-center">
          <input
            type="submit"
            class="btn btn-secondary"
            style="width: 100%"
            value="Send e-mail"
          />
        </div>
      </form>
    </div>
    {% endif %}
  </body>
</html>
```

#### What's happening here?
1. We are checking if the variable `messageSent` is `True`. If it is, we show a success message.
2. If it isn't true, we show an empty form for the users to fill out.

We have now successfully set up our project. In the following section, we will turn our attention to actual sending emails with Google Gmail SMTP provider.

To test that all works well, update your `settings.py` file and add these configurations:

```python
EMAIL_BACKEND = 'django.core.mail.backends.console.EmailBackend'

DEFAULT_FROM_EMAIL = 'test@test.com'
```

Try submitting the form. The email will be printed out to your console. This is a good way of testing your application.

### Configuring Google Gmail SMTP provider.
To use your Google Gmail account to send an email, you will need to enable access for less secure applications, using [this link](https://myaccount.google.com/lesssecureapps).

![Google Less Secure Homepage](/engineering-education/how-to-send email-with-django/google-less-secure.jpg)

Note that, Google accounts with 2-step Verification turned on don't work with secure apps. Instead, you use App passwords. You can generate an App password using [this link](https://myaccount.google.com/u/1/apppasswords).

### Sending emails with Google Gmail SMTP provider
To complete the process of actually sending emails using Google Gmail SMTP provider, you have to update and add some additional settings to your project with your Google Gmail account details!

```python
DEFAULT_FROM_EMAIL = '<paste your gmail account>'

EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST = 'smtp.gmail.com'
EMAIL_HOST_USER = '<paste your gmail account'>'
EMAIL_HOST_PASSWORD = '<paste the key or password app here>'
EMAIL_PORT = 587
EMAIL_USE_TLS = True
```

Note that some of the details like the account and password should be kept hidden. This can be achieved by setting them as environment variables. A very good third-party application to achieve this is [django-environ](https://django-environ.readthedocs.io/en/latest/#django-environ)

Try sending out some emails.

![homepage](/engineering-education/how-to-send-email-with-django/homepage.jpg)

![success page](/engineering-education/how-to-send-email-with-django/success-page.jpg)

### Conclusion
Glad you've reached the end of this tutorial. In this tutorial, we briefly set up a new Django project, that we used to send an email using a free service (Google Gmail SMTP) provider.

Why not add this functionality to your next Django project.

Happy coding!

---

Peer Review Contributions by:
