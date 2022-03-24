---
layout: engineering-education
status: publish
published: true
url: /job-scheduling-with-django-cron/
title: Automating Job Scheduling with Django_cron in a Python Application
description: This article will explain how to use the Django_cron library to schedule jobs in a Python application.
author: francisca-adekanye
date: 2022-03-24T00:00:00-15:30
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/job-scheduling-with-django-cron/hero.png
    alt: Job Scheduling Django Cron in a Python Application
---
Job scheduling is crucial in all streaming applications. There are various ways of streaming data from an external API into an application through automation.
<!--more-->
Sometimes, developers need to automate the writing of data into a database at every minute or hour(s). In this tutorial, we will be making a Python application to demonstrate job queues with a library called `django_cron`.

### Table of contents
- [Prerequisites](#prerequisites)
- [Objectives](#objectives)
- [Overview of job scheduling](#overview-of-job-scheduling)
- [How django_cron works](#how-django_cron-works)
- [Jobs scheduling automation with django_cron library](#jobs-scheduling-automation-with-django_cron-library)

### Prerequisites
To follow along with this tutorial, you should meet the following requirements.
- Have an understanding of the Python programming language.
- A pre-installed IDE, preferably [Visual Studio Code](https://code.visualstudio.com/download).
- A pre-installed API tester, preferably [Postman](https://www.postman.com/downloads/).
- [Python 3.x](https://python.org) installed.
- An understanding of [Django 3](https://docs.djangoproject.com/en/3.2/).
- How `django_cron` works.
- Jobs scheduling automation with the `django_cron` library.

### Objectives
In this tutorial, we will be learning jobs scheduling automation with `django_cron` in a Python application. In addition, we will learn and apply the following to an example Python project.

### Overview of job scheduling
Every repeated task that is carried out in the background is referred to as `jobs` in software development. Job scheduling deals with the execution of these various tasks by ensuring the connection of system applications.

There are many schedulers which are used in industries. This is based on the kind of company requirement. For instance, Oracle FLEXCUBE FCJ uses the two types of jobs schedulers named `Quartz` and `Flux`.

Furthermore, jobs schedulers are useful where repetitive tasks are needed. For example, every notification sent by social media applications to users' account are made through this process.

It is possible to schedule a job that needs to be carried out once a particular action is accomplished or executed. In every social application, the `Like` button keeps updating once it is pressed, and this action updates the database too. However, millions of users can like a particular content at the same time, and this does not distrupt any other likes.

All of these are done through job scheduling automation. Stay tuned to learn more on how to implement this into your next Python project.

Next, I will be introducing a library called `django_cron` for this automation.

### How django_cron works
In this chapter, we will be talking about how to achieve job scheduling automation through this library. This allows the `Django-Python` code to run on repeated basics.

This also helps to track, and execute recurring tasks whether they are successful or not having carried out. There are two main ways of going about this automation stuff. They are as follows:

#### 1. Custom script file
In this case, developers write their own personal scripts to achieve the queueing of jobs. This can take time but engineers get to design what they want based on their needs. An example of this can be found below.

```yaml
cron:
- description: "daily summary job"
  url: /tasks/summary
  schedule: every 24 hours
- description: "monday morning mailout"
  url: /mail/weekly
  schedule: every monday 09:00
  timezone: Australia/NSW
- description: "new daily summary job"
  url: /tasks/summary
  schedule: every 24 hours
  target: beta
```

> Note: This is a `cron.yml` file that can be used to automate jobs based on the steps defined.

#### 2. Using pre-defined libraries
So many libraries have been developed in the course of this action. Libraries like `django_cron`, `celery` and others can be used to achieve job scheduling.

---

Now, let's see how to incorporate `django_cron` in a Python application. Please note that this library can only be used in the Django Python framework.

Every Python package or library is used by installing it first. To install `django_cron` into a Django project, run the command below:

```bash
pip install django_cron
```

The convention is to prepare a Python script file for the code. Inside the file, a Python class will be used by extending the `CronJobBase` class from the installed library.

Also, a method called `Schedule` which takes an argument of `minutes` will be imported. That is, such job will run in a repeated manner in the interval of minutes provided. However, this will execute a `do()` method that is inside the cron job class.

Finally, the job can be run manually by executing the code snippet below.

```bash
python manage.py runcrons
```

> Note: The command above will run all available cron jobs. To run a specific cron job, you should provide the class name of the job instead of `runcrons`.

We will see a demo by building an API from an external API in the next section.

### Jobs scheduling automation with django_cron library
We will be developing a demo API using an external endpoint <https://hackernews.api-docs.io> data. Furthermore, this application will ensure the streaming of data into the database from the endpoint based on the configured number of `minutes`. Before anything, let us set up the project directory itself.

#### Project setup
We will start by setting up a project structure in Django's way of doing things. First off, we have to design a storage location for the project.

Open your terminal, and run the following commands:

```bash
cd Desktop
mkdir project && cd project
```

You navigated into the desktop directory, made a directory called `project`, then changed to it.

Now create a virtual environment for the project and install the required dependencies as shown below:

```bash
python -m venv env
source env/Scripts/activate

pip install Django==3.2 django_cron djangorestframework
pip freeze > requirements.txt
```

You have configured the environment for the project, and installed all of the dependencies. You are keeping track of them via the `requirements.txt` file.

Let's start the project, spin up the Django server and create an app called `news` with the commands below:

```bash
django-admin startproject hackernewsdemo
python manage.py startapp news

python manage.py runserver
```

If you open your browser at <http://127.0.0.1:8000> you should see the default Django welcome page as shown below:

![First page](/engineering-education/job-scheduling-with-django-cron/firstpage.png)

Now open to the project `settings.py` file, navigate to the `INSTALLED_APPS`, and add the snippet below:

```python
# ...
'rest_framework',
'django_cron',
'news'
```

In addition, it is mandatory to register the `CRON_CLASSES` list at the bottom of the `settings.py` file. The list contains all the cron classes that the application has. Also, we need to add the permission classes for the API inside `settings.py`. 

```python
CRON_CLASSES = [
    "news.cron.MyCronJob",
    # ...
]

REST_FRAMEWORK = {
  'DEFAULT_PERMISSION_CLASSES': [
      'rest_framework.permissions.AllowAny',
  ],
}
```

#### Making models for the endpoint
In this API, what is actually needed from the external endpoint is the `ids` of the external news data. For this reason, we will make the model with just two properties which are the `id` and the `datetime` fetched.

It is important to make the primary key of the database from the fetched data `id`. This is because it will be referenced whenever you are to get the latest news from the external endpoint.

Add the snippet below into your `models.py` of the `news` app.

```python
from django.db import models
from datetime import datetime

class HackerNewsID(models.Model):
    hackernews = models.BigIntegerField(unique=True, primary_key=True)
    fetched_at = models.DateTimeField(default=datetime.now())

    def save(self, *args, **kwargs):
        self.id = self.hackernews # replacing the id(primary key) as the hackernews id
        super(HackerNewsID, self).save(*args, **kwargs)

    def __str__(self):
        return str(self.hackernews)
```

- Note: The `save` method under the class `HackerNewsID` will be called whenever data is been saved. This only formats the primary key to the `id` fetched.

#### Making cron jobs
Here, we will make the cron job class. This class is required by the `django_cron` library to run every minute(s) as configured in the code below.

The code snippet below describes the cron job class. This goes inside the `cron.py` file in the `news` app directory.

```python
from django_cron import CronJobBase, Schedule
import requests
from .models import HackerNewsID

class MyCronJob(CronJobBase):
    RUN_EVERY_MINS = 5 # every 5 minutes
    RETRY_AFTER_FAILURE_MINS = 1
    schedule = Schedule(run_every_mins=RUN_EVERY_MINS, retry_after_failure_mins=RETRY_AFTER_FAILURE_MINS)
    code = 'news.my_cron_job'    # a unique code

    def do(self):

        NEWS_URL = 'https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty' # external endpoint that returns list of ids

        headers = {'user-agent': 'quickcheck/0.0.1'}
        response = requests.get(NEWS_URL, headers=headers)

        result = response.text.split(',')[1:len(response.text.split(','))-2] # in order to trim the last element
        last = response.text.split(',')[-1] # got this from API " 499287535 ] /n" --> reshaped to that below
        result.insert(len(result), last.strip().split()[0]) # "499287535"

        news = 400 # 100 downward/latest
        res = [int(id.strip()) for id in result[news+1:news+6]] # list comprehension

        for id in res:
            news_id = HackerNewsID(hackernews=id)
            news_id.save()
```
- Note:  Run the command below to add the latest hackernews id to database. This will execute the cron job class(es) by looping through the response from API data, and then call `save()` method on each.

```bash
python manage.py runcrons
```

The `MyCronJob` class extends the `CRONJoBBase`class imported from the library. Among the properties of the class is `code` which serves as a signature for a particular cron job. This identification will be referenced in `settings.py`.

Under the `do()` method, an API request is done. In this case to the external source with some formattings too. The response generated would be the latest 5 `ids` added from the external source.

Then, a loop to run through the responses list and add each `id` to the database by the `save()` method is called.

#### Serializing data from models
The convention is to make a `seralizers.py` file inside the `news` app folder. This is required for `djangorestframework` to serialize the data that you are getting or posting to the database through the `models.py`.

```python
from rest_framework import serializers
from .models import HackerNewsID

class NewsIdSerializer(serializers.ModelSerializer):

    class Meta:
        model = HackerNewsID
        fields = ('hackernews',)
```

> Note: In this application, we only care about the `id`, and that's why we made the fields a tuple with only one element from our model.

#### Setting up the views
We will make two class-based views called `NewsIdView`, and `NewsItemView`. The first view will make a request to the external API, and then get the list of ids for your endpoint. This will be done through the `get` method under the class.

However, the other view will match the saved id in the database to get the particular data from the external API. This will match half of the ids from the database, and then perform a request on each to fetch specific data of the id.

```python
import json
import requests
from rest_framework.generics import ListAPIView
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework import status
from .models import HackerNewsID


class NewsIdView(APIView):
  permission_classes = [AllowAny]

# get a list of all news ids from hackernews
  def get(self, request, format=None):

    NEWS_URL = 'https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty'
    
    headers = {'user-agent': 'quickcheck/0.0.1'}
    response = requests.get(NEWS_URL, headers=headers)

    result = response.text.split(',')[1:len(response.text.split(','))-2]  # to trim the last element
    last = response.text.split(',')[-1]  #got this from API " 499287535 ] /n" --> reshaped to that below
    result.insert(len(result), last.strip().split()[0]) # "499287535"

    res = [int(id.strip()) for id in result] # list comprehension to strip each element of the data

    return Response(res, status=status.HTTP_200_OK)


class NewsItemView(APIView):
    permission_classes = [AllowAny]

    def get_data_from_API(self):
        """
            This helps to return 
            formatted data fetched from endpoint provided
            using request.
        """
        # latest = HackerNewsID.objects.all()[len(HackerNewsID.objects.all())-1].hackernews # getting latest id from db
        result = []
        half = 0
        total = len(HackerNewsID.objects.all()) # getting the total ids from the db

        #slicing into half based on even or odd total
        if total % 2 == 0:
            half = len(HackerNewsID.objects.all()) / 2
        else:
            half = (len(HackerNewsID.objects.all()) / 2) + 1

        ids = HackerNewsID.objects.all()[:half] #slicing the queryset to get last half

        for id in ids:
            NEWS_URL = f'https://hacker-news.firebaseio.com/v0/item/{str(id)}.json?print=pretty'
            headers = {'user-agent': 'quickcheck/0.0.1'} 
            response = requests.get(NEWS_URL, headers=headers)
            data = json.loads(response.text)
            result.append(data)

        return result

    
#GET the latest hackernews streamed
    def get(self, request, format=None):
        return Response(self.get_data_from_API(),status=status.HTTP_201_CREATED)

```

#### Configuring routes for your endpoint
Under the project directory, open to the `urls.py` and paste the snippet below. These are the routes for the `rest-framework`, `admin`, and the `news` app made.

```python
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api-auth/', include('rest_framework.urls')),
    path('api/v0/items/', include('news.urls'))
]
```

To connect the `news` app with the `hackernewsdemo` project route, you will need to make your custom `urls.py` inside the app directory. Then add the code below.

```python
from django.urls import path
from .views import NewsIdView, NewsItemView

urlpatterns = [
    path('all/', NewsIdView.as_view(), name='index'),
    # http://127.0.0.1:8080/api/v0/items/all --> lists all news id from hackernews endpoint
    path('hackernews/', NewsItemView.as_view(), name='news-item'), 
    # http://127.0.0.1:8080/api/v0/items/hackernews --> GET the latest hackernews from db
]
```

#### Creating an admin site
As a Django developer, you are familiar with the default admin page that can be configured. Executing the command below will make a brand new administration site where all activities of the database are controlled.

```bash
python manage.py createsuperuser
```

Having created a superuser admin account, you will have to register the `news` app model in the `admin.py`. Add this code in the `admin.py` file.

```python
from django.contrib import admin
from .models import HackerNewsID


class HackerNewsIDAdmin(admin.ModelAdmin):
    list_display = ('hackernews', 'fetched_at') #these are the features to be listed
    list_display_links = ('hackernews', 'fetched_at') #these are the features links

admin.site.register(HackerNewsID, HackerNewsIDAdmin)
```

Furthermore, you can test the admin page made by executing the following command. 

```bash
python manage.py runserver
```

Now open <http://127.0.0.1:8000/admin> in your browser and log in.

Running the command showcased below will perform the API requests to the external enpoints from the cron class. This is to cycle through the endpoints inside the `cron.py` job class. By doing this, the latest `ids` generated wil be added to the application database.

```bash
python manage.py runcrons
```

![Admin page](/engineering-education/job-scheduling-with-django-cron/admin.png)

In addition, you can make an API request to the endpoint <http://127.0.0.1:8000/api/v0/items/hackernews> to fetch the data that each of the saved ids return. You should get something like shown in the images below.

![Response page](/engineering-education/job-scheduling-with-django-cron/response.png)

![Response page 2](/engineering-education/job-scheduling-with-django-cron/response2.png)

### Conclusion
In this tutorial, we have walked through how to make a cron job in a Python application. You learned about the `django_cron` library, and how it is used to make cron jobs.

You also performed API requests to an external source by fetching their data and writing it to your database using job scheduling. You can now go ahead and apply your job-scheduling skills in a real-world application.

Happy coding!

---
Peer Review Contributions by: [Geoffrey Mungai](/engineering-education/authors/geoffrey-mungai/)
