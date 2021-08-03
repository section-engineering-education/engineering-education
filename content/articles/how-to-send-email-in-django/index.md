---
layout: engineering-education
status: publish
published: true
url: /how-to-send-email-in-django/
title: How to Send Emails in Django
description: This tutorial will guide the reader on how to send emails in Django. We will quickly set up a new Django project to demonstrate how to send emails.
author: samuel-torimiro
date: 2021-08-02T00:00:00-11:30
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/how-to-send-email-in-django/hero.jpg
    alt: Django Email Google Gmail Example Image
---

In most customer-driven web applications, there may be a need to send an email. Sending an email with Django is quite simple.
<!--more-->
In the first part of this tutorial, we will quickly set up a new Django project from scratch with some URLs, views and templates.

Then, we will take a look at configuring the Google SMTP service provider and finally how to use the `send_mail()` function in Django which helps us send emails.

### Prerequisites
To follow along with this tutorial, you will need a Google account. If you don't have one, follow this [link](https://accounts.google.com/signup/v2/webcreateaccount?flowName=GlifWebSignIn&flowEntry=SignUp) to create a new Google account.

Prior knowledge of Django is also required.

### Project Setup and Overview
Open your terminal or command prompt, and run the following commands:

```bash
mkdir mail && cd mail

pipenv install django

pipenv shell
```

We created a new virtual environment using the `pipenv` command.

You can install Pipenv if you don't have it installed using the command below.

```bash
pip install pipenv
```

Next, create a new Python project and application.

```bash
django-admin startproject send_mail .

python manage.py startapp mailer

python manage.py migrate

python manage.py runserver
```

Navigate to <http://127.0.0.1:8000/> using your browser. You should see the default Django homepage.

![Django homepage](/engineering-education/how-to-send-email-in-django/django-homepage.jpg)

Add the new application to your `settings.py` file.

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

Update your project's `send_mail/urls.py` to look like this:

```py
from django.contrib import admin
from django.urls import path, include # new

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('mailer.urls')), # new
]
```

Then create a new file inside the `mailer` directory called `urls.py` and add the following code:

```python
from django.urls import path
from .views import sendMail

urlpatterns = [
    path('', sendMail),
]
```

Create a new file in your `mailer` directory called `forms.py` and add the following code:

```python
from django import forms

class EmailForm(forms.Form):
    recipient = forms.EmailField()
    message = forms.CharField(widget=forms.Textarea)
```

#### What's happening here?
We created a form class that inherits from the `Form` base class. We then created two attributes (recipient and message) that we want to be displayed in our form.

Based on the attributes configuration, Django will determine how to generate the HTML for these fields and how to validate the fields.

Next, let's update the `views.py` of our mailer application to look like this:

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
We created a function called `sendMail`. We then checked if the form was submitted. If it was, we validate the  user input, send the mail and then return `True`

Finally, if the form was not submitted we return an empty form or if the form has some errors we send the errors back for the form input to be corrected

Also, take note of the `send_email()` function. It takes three required arguments. **The subject**, followed by **the message**, **the sender** and finally the **list of recipients**.

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
We are checking if the variable `messageSent` is `True`. If so, we show a success message. Otherwise, we display an empty form for the users to fill out.

We have now successfully set up our project. In the following section, we will turn our attention to actual sending emails with Google Gmail SMTP provider.

To test that all works well, update your `settings.py` file and add these configurations:

```python
EMAIL_BACKEND = 'django.core.mail.backends.console.EmailBackend'

DEFAULT_FROM_EMAIL = 'test@test.com'
```

Open the app and try submitting the form. The email should be printed out in your console.

### Configuring Google Gmail SMTP provider.
To use your Google Gmail account to send an email, you will need to enable access for less secure applications using [this link](https://myaccount.google.com/lesssecureapps).

![Google Less Secure Homepage](/engineering-education/how-to-send-email-in-django/google-less-secure.jpg)

Note that Google accounts with the 2-step Verification turned on don't work with secure apps. Instead, you use app passwords. You can generate an app password using [this link](https://myaccount.google.com/u/1/apppasswords).

### Sending emails with Google Gmail SMTP provider
To complete the process of sending emails using Google Gmail SMTP provider, you have to update and add some additional settings to your project with your Google Gmail account details!

```python
DEFAULT_FROM_EMAIL = '<paste your gmail account here>'

EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST = 'smtp.gmail.com'
EMAIL_HOST_USER = '<paste your gmail account here>'
EMAIL_HOST_PASSWORD = '<paste Google password or app password here>'
EMAIL_PORT = 587
EMAIL_USE_TLS = True
```

Note that some of the details like the account and password should be kept hidden. This can be achieved by setting them as environment variables. A very good third-party application to achieve this is [django-environ](https://django-environ.readthedocs.io/en/latest/#django-environ)

At this point, we are ready to send the emails. Open the app and try sending out some emails.

![homepage](/engineering-education/how-to-send-email-in-django/homepage.jpg)

![success page](/engineering-education/how-to-send-email-in-django/success-page.jpg)

### Conclusion
In this tutorial, we briefly set up a new Django project that we used to send an email using a free service (Google Gmail SMTP) provider.

Why not add this functionality to your next Django project.

Happy coding!

---

Peer Review Contributions by: [Geoffrey Mungai](/engineering-education/authors/geoffrey-mungai/)
