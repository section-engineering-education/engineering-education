---
layout: engineering-education
status: publish
published: true
url: /how-to-send-sms-in-django-using-twilio/
title: How to Send SMS in Django using Twilio
description: This article will be teaching us how to send SMS from a Django app using Twilio. We will be building a simple Django app to demonstrate how to send SMS from a Django app.
author: shuaib-oseni
date: 2021-05-31T00:00:00-15:30
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/how-to-send-sms-in-django-using-twilio/hero.png
    alt: Django Twilio SMS
---
In this tutorial, we will build a simple Django app with SMS capability to send messages to a phone number once a particular condition is met.
<!--more-->
SMS is a good way to send alerts, notifications, and to even authenticate users. There comes a time where by we need SMS functionality in our app. Either to send notifications to clients or even serve as a way of having a "multifactor authentication" feature.

[Twillio](https://www.twilio.com/) is a cloud communications platform that allows you to add voice and SMS functionality to your app. It is a paid platform, but for the sake of this tutorial we'll be making use of the trial account.

### Prerequisites
To follow along with this tutorial, you'll need [Python3](https://www.python.org/downloads/) installed on your machine.

A little understanding of Django would help the reader to follow along better.

### Table of contents
1. [Creating and setting up a new Django project](#creating-and-setting-up-a-new-django-project)
2. [Setting up Twilio](#setting-up-twilio)
3. [Creating a model](#creating-a-model)
4. [Configuration](#configuration)
5. [Conclusion](#conclusion)

### Creating and setting up a new Django project
Let's start by creating a new virtual environment.

A virtual environment allows you to create different spaces on your computer, with different set of libraries and versions.

By creating a virtual environment, you'll be able to separate the necessary library installation for a project, without having to install them globally.

Now, create a virtual environment `env` by running the command below:

```bash
$ python -m venv env
```

Here, we tell Python to create the virtual environment in a folder named `env` in the current directory.

On creation, activate the virtual environment using the following command:

```bash
$ source env/bin/activate
```

On activating the environment, install Django using the following command:

```bash
$ pip install django
```

Now, let's create a new Django project `twilio_proj` using:

```bash
$ django-admin startproject twilio_proj
```

Then navigate to the `twilio_proj` directory and create a Django app.

```bash
$ cd twilio_proj
$ django-admin startapp score
```

Let's add our app to the list of installed apps.

Navigate to the `twilio_proj` directory and edit the `settings.py` file.

```python
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'score',
]
```

### Setting up Twilio
To get started with Twilio, we need to sign up on [Twilio](https://twilio.com) to create an account and to also get a Twilio number.

Click on the `Sign Up` button and fill in your details to create an account.

### Creating a model
Now lets define a simple class.

In the `score` directory, edit the `models.py` file and add the following lines of code:

```python
from django.db import models

#defining a simple class
class Score(models.Model):
    #integer field
    test_result = models.PositiveIntegerField()

    #string representation
    def __str__(self):
        return str(self.test_result)
```

Now let's register the model of Score in the `admin.py` file, so that we can modify it in the Django admin section.

```python
from django.contrib import admin
from .models import Score

admin.site.register(Score)
```

The next step is to migrate our model to the database.

Migrations are Django’s way of propagating changes you make to your models (adding a field, deleting a model, etc.) into your database schema.

Now, let's migrate our model to the database by running the commands below:

```bash
$ python manage.py makemigrations # migrating the app and database changes
$ python manage.py migrate        # final migrations
```

A superuser has the permissions to create, edit, update, and delete data in Django admin. 

Create a superuser by running the command below:

```bash
$ python manage.py createsuperuser 
```

Now, we can log in to the admin page.

To login to the admin section, serve the app again and go to http://localhost:8000/admin and log in with your superuser details.

![Django admin login page](/engineering-education/how-to-send-sms-in-django-using-twilio/admin.png)

*Django admin login page*

![Django admin page](/engineering-education/how-to-send-sms-in-django-using-twilio/django-admin.png)

*Django admin page*

Now, let's add a score in the `Score` category to test if its error free.

Click on score, then click `Add Score` to add a score.

![Add Score](/engineering-education/how-to-send-sms-in-django-using-twilio/add-score.png)

*Add score*

### Configuration
To use Twilio, we need a `trial number`, `account sid`, and `auth token`.

We can find our account-specific configuration credentials on the Dashboard page of the account console as shown below:

![Twilio dashboard page](/engineering-education/how-to-send-sms-in-django-using-twilio/twilio-console.png)

*Twilio dashboard page*

Click on the "Get a trial number" button to get a trial number.

A trial number is a free phone number assigned to you upon sign up by Twilio for testing purposes.

![Trial number](/engineering-education/how-to-send-sms-in-django-using-twilio/trial-number.png)

*Trial number*

Next we need to install the Twilio library using the following command:

```bash
$ pip install twilio
```

Now we need to import the Twilio module in our `models.py` file:

```python
from twilio.rest import Client
```

Next, modify your `Score` class in `models.py`to look like the code below:

```python
#defining a simple class
class Score(models.Model):
    #integer field
    test_result = models.PositiveIntegerField()

    #string representation
    def __str__(self):
        return str(self.test_result)

    #save method
    def save(self, *args, **kwargs):
        #if test_result is less than 80 execute this
        if self.test_result < 80:
            #twilio code
            account_sid = 'YOUR_ACCOUNT_SID'
            auth_token = 'YOUR_AUTH_TOKEN'
            client = Client(account_sid, auth_token)

            message = client.messages.create(
                                        body=f'Hi, your test result is {self.test_result}. Great job',
                                        from_='YOUR_TRIAL_NUMBER',
                                        to='VERIFIED_NUMBER' 
                                    )

            print(message.sid)
        return super().save(*args, **kwargs)
```

With a trial number, we can only send SMS to a Twilio verified number. If we want to send to unverified numbers, you need to purchase a phone number.

For testing purposes, our verified number will be the number we submitted for phone number verification when we created our Twilio account.

Now head over to the django-admin page, add a score less than 80 and you should recieve an SMS.

![SMS](/engineering-education/how-to-send-sms-in-django-using-twilio/twilio-sms.png)

*Twilio SMS*

### Conclusion
To conclude, we have learned about Twilio. We have also learned how to send SMS from a Django app.

There's still a lot you can achieve with Twilio. Upgrade from the trial version if you are looking to use Twilio in production.

To summarize, we learned how to build a Django app and integrate it with Twilio. We also learned how to send SMS using Twilio from a Django app.

For further learning on how to recieve phone calls, recieve tests, and perform other communication functions using Twilio, check out [Twilio docs](https://twilio.com/docs).

That's all!

Happy coding!

---
Peer Review Contributions by: [Geoffrey Mungai](/engineering-education/authors/geoffrey-mungai/)
