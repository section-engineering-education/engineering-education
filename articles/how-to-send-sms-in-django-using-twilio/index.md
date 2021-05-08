SMS is a good way to send alerts, notifications and even authenticate users. There comes a time where by we need sms functionality in our app, either to send notifications, send sms to clients or even serve as a way of having a "multifactor authentication" feature.

In this tutorial, we will build a simple Django project with SMS capability that sends message to a phone number once a particular condition is met.

Twillio is a cloud communications platform that allows you to add voice and SMS functionality in your app . Its actually a paid platform, but for the sake of this tutorial we'll be making use of the trial account.

### Prerequisites
To follow along with this tutorial, you'll need [Python3](https://www.python.org/downloads/) installed on your machine.

A basic understanding of Django would help the reader follow along better.

### Table of contents
- [Creating and setting up a new Django project](#creating-and-setting-up-a-new-django-project)
- [Setting up Twilio](#setting-up-twilio)
- [Creating a model](#creating-a-model)
- [Configuration](#configuration)
- [Conclusion](#conclusion)



### Creating and setting up a new Django project
Let's start by creating a new virtual environment.

A virtual environment allows you to create different spaces on your computer, with a different set of libraries and versions.

By creating a virtual environment, you'll be able to separate the necessary library installation for a project, without having to install them globally.

Now, you create a virtual environment `env` as shown below:

```bash
$ python -m venv /path/to/new/virtual/environment
```

Here, we specify the `/path/to/new/virtual/environment` as `env`.

On creation, you can activate the virtual environment using the following command:

```bash
$ source env/bin/activate
```

On activating the environment, we can install Django using the following command:

```bash
$ pip install django
```

Now, let's create a new Django project `twilio_proj` using:

```bash
$ django-admin startproject twilio_proj
```

Then, we create a Django app.

```bash
$ django-admin startapp score
```

Let's add our app to the list of installed apps. Navigate to the `twilio_proj` directory and edit the `settings.py` file.

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
To get started using Twilio, we need to sign up on [Twilio's](https://twilio.com) website to create an account and also get a twilio number.

Click on the `Sign Up` button and fill in your details to create an account.


### Creating a model
Now lets define a very simple class.

In the `score` directory, edit the `models.py` file and add the following lines of code to it:

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

Now let's register the model of Score in the `admin.py` file, so we can modify it in the Django admin section.

```python
from django.contrib import admin
from .models import Score

admin.site.register(Score)

```
Next step is to migrate our model to the database.

Migrations are Django’s way of propagating changes you make to your models (adding a field, deleting a model, etc.) into your database schema.

Now, let's migrate our model to the database by running the commands below:

```bash
# migrating the app and database changes
$ python manage.py makemigrations

# final migrations
$ python manage.py migrate
```

A superuser has the permissions to create, edit, update, and delete data in Django admin. We create a superuser by running the command below:

```bash
$ python manage.py createsuperuser 
```


Now, we can log in to the admin page.

To login to the admin section, go to this link [localhost:8000/admin](localhost:8000/admin) and log in with our just created superuser details.

![Django admin login page](/engineering-education/how-to-send-sms-in-django-using-twilio/admin.png)

*Django admin login page*

![Django admin page](/engineering-education/how-to-send-sms-in-django-using-twilio/django-admin.png)

*Django admin page*

Now, let's add a score in the score category to test if its error free.

Click on score, then click `Add Score` to add a score.

![Add photo](/engineering-education/how-to-send-sms-in-django-using-twilio/add-score.png)

*Add score*

### Configuration
To use twilio, we need a `trial number`, `account sid`, and `auth token`.

We can find our account-specific configuration credentials on the Dashboard page of the account console as shown below:

![Twilio dashboard page](/engineering-education/how-to-send-sms-in-django-using-twilio/twilio-console.png)

*Twilio dashboard page*

Click on the "Get a trial number" button to get a trial number.

A trial number is a free phone number assigned to you upon sign up by twilio for testing purpose.

![Trial number](/engineering-education/how-to-send-sms-in-django-using-twilio/trial-number.png)

*Trial number*

Next we need to install the twilio library using the following command:

```bash
$ pip install twilio
```

Now we need to import the twilio module in our `models.py` file:

```python
from twilio.rest import Client

```
Next, add the follwing code to the `models.py` file:

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

With a trial number, you can only send sms to a twilio verified number. If you want to send to unverified numbers, you need to purchase a phone number.

For testing purpose, our verified number will be the number we submitted for phone number verification when we created our twilio account.

Now head over to the django-admin page, add a score less than 80 and you should recieve an SMS.

![SMS](/engineering-education/how-to-send-sms-in-django-using-twilio/twilio-sms.png)

*Twilio SMS*

### Conclusion
To conclude, we have learned about Twilio. We have also learned to send SMS from a Django app.

There's still a lot you can achieve with Twilio. Upgrade from the trial version if you are looking to use Twilio in production.

To summarize:
- The reader learned to send SMS using Twilio from our Django app.
- The reader learned to build a Django app and integrate it with Twilio.


For further learning on how to recieve phone calls, recieve test and perform other communication functions using Twilio, check out [this](https://twilio.com/docs) link.
