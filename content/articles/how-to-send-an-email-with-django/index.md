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

In most web applications that are customer-driven, there will be a need to be able to send an email. Sending an email with Django is quite simple. In the first part of this tutorial, we will quickly set up a new Django project from scratch with some URLs, views and templates. After, we will be taking a look at configuring the Google SMTP service provider and finally how to use the `send_mail` function Django provides us to enable us to send emails.

### Prerequisites

To follow along with this tutorial, you will be needing a google account. If you don't have one follow this [link](https://accounts.google.com/signup/v2/webcreateaccount?flowName=GlifWebSignIn&flowEntry=SignUp) to get one.

Prior knowledge of Django is also required.

### Project Setup and Overview

Open your terminal or command prompt, and type the following commands:

```py
mkdir mail && cd mail
pipenv install django
pipenv shell
```

We created a new virtual environment using the pipenv command, you can install pipenv if you don't have it already installed using `pip install pipenv`. Next, create a new Python project and application.

```py
django-admin startproject send_mail .
python manage.py startapp mailer
python manage.py runserver
```

Next, navigate to [http://127.0.0.1:8000/](http://127.0.0.1:8000/) with your browser, you should see the default Django homepage.

![Django homepage](/engineering-education/how-to-send email-with-django/django-homepage.jpg)

Next, add the new application to your settings.py file

```py
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

Next, update your project urls.py to look like this:

```py
from django.contrib import admin
from django.urls import path, include # new

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('mailer.urls')), # new
]
```

Next, create a new file inside the `mailer` directory called `urls.py` and add the following code:

```py
from django.urls import path
from .views import sendMail

urlpatterns = [
    path('', sendMail),
]
```

Next, create a new file in your `mailer` directory called `forms.py` and add the following code:

```py
from django import forms

class EmailForm(forms.Form):
    name = forms.CharField(max_length=50)
    email = forms.EmailField()
    to = forms.EmailField()
    message = forms.CharField(widget=forms.Textarea)
```

#### What's happening here?

1. we created a form class that inherits from the `Form` base class.
2. we then created several attributes (name, email, to, message) that we want to be displayed in our form.
3. based on the attributes configuration, Django will determine how to generate the HTML for these fields and our to validate the fields.

Next, let's update the `views.py` of your mailer application to look like this:

```py
from django.shortcuts import render
from .forms import EmailForm
from django.core.mail import send_mail
from django.conf import settings


def sendMail(request):

    sent = False

    if request.method == 'POST':
        # check if form was submitted
        form = EmailForm(request.POST)
        if form.is_valid():
            # check if form data is clean
            cd = form.cleaned_data
            subject = cd['subject']
            message = cd['message']
            send_mail(subject, message,
                      settings.DEFAULT_FROM_EMAIL, [cd['to']])
            sent = True

    else:
        form = EmailForm()

    return render(request, 'index.html', {

        'form': form,
        'sent': sent,

    })

```

#### What's happening here?

1. we created a function called `sendMail`.
2. we then if the form was submitted, if it was, we validate user input and return `True`
3. finally, if the form was not submitted we return an empty form.

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
    {% if sent %}
    <div class="container">
      <h3><strong>Email successfully sent</strong></h3>
      <p>Your message was successfully sent to {{ form.cleaned_data.to }}</p>
    </div>
    {% else %}
    <div class="container">
      <h3><strong>Send E-mail</strong></h3>

      <form method="post">
        {% csrf_token %} {{ form.as_p }}

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

1. we are checking if the variable sent is `True`. If it is, we show a success message.
2. if it isn't true, we show an empty form for users to fill out.

In this section, we quickly set up our project. In the following section, we will turn our attention to actual sending emails with Google Gmail SMTP provider.

To test that all works well, update your `settings.py` file and add this code:

```py
EMAIL_BACKEND = 'django.core.mail.backends.console.EmailBackend'

DEFAULT_FROM_EMAIL = 'test@test.com'
```

Try submitting the form, this will print out the email to your console. This is a good way of testing your application.

### Configuring Google Gmail SMTP provider.

To use your Google Gmail account to send an email, you will need to enable access for less secure applications, using this [link](https://myaccount.google.com/lesssecureapps).

![Google Less Secure Homepage](/engineering-education/how-to-send email-with-django/google-less-secure.jpg)

### Sending emails with Django

To send emails with Django, you have to update and add some additional settings to your project with your Google Gmail account details

```py
DEFAULT_FROM_EMAIL = 'past your gmail account'

EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST = 'smtp.gmail.com'
EMAIL_HOST_USER = 'past your gmail account'
EMAIL_HOST_PASSWORD = 'past the key or password app here'
EMAIL_PORT = 587
EMAIL_USE_TLS = True
```

#### What's happening here?

1. update your default email account with your original Gmail account.
2. we updated the email backend to use SMTP and not console.
3. we also stated our email host to use Gmail SMTP.
4. and finally, we set the host user to your Gmail account and password to your password.

Note that some of the details should be kept hidden.

Try sending out some emails.

![homepage](/engineering-education/how-to-send email-with-django/homepage.jpg)

![success page](/engineering-education/how-to-send email-with-django/success-page.jpg)

### Conclusion

Glad you've reached the end of this tutorial. In this tutorial, we briefly set up a new Django project, but most importantly we were able to send email using a free service (Google Gmail SMTP) provider.

Why not add this functionality to your next Django project.

Cheers!

---

Peer Review Contributions by:
