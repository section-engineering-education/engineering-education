### Introduction
Job Scheduling is crucial in all streaming applications. There are various ways of streaming data from external API into an application through automation. 

Sometimes, developers need to automate the writing of data into database at every minute or hour(s). In this tutorial, we will be making a hands-on Python application by demonstrating job queues with a library called `django_cron`.


### Table of contents
- [Prerequisites](#prerequisites)
- [Objectives](#objectives)
- [Overview of job scheduling](#overview-of-job-scheduling)
- [How django_cron works](#how-django_cron-works)
- [Demo of job scheduling automation with django_cron library](#demo-of-job-scheduling-automation-with-django_cron-library)


### Prerequisites
To follow along with this tutorial, you are should meet the following requirements.
- An understanding of the Python programming language.
- A pre-installed IDE, preferably [Visual Studio Code](https://code.visualstudio.com/download).
- [Python 3x](https://python.org) installed.
- An understanding of [Django](https://docs.djangoproject.com/en/4.0/).

### Objectives
In this tutorial, we will be learning jobs scheduling automation with django_cron in Python application. In addition, you will learn and apply the following to your project.

- Overview of job scheduling.
- How django_cron works.
- Demo of jobs scheduling automation with django_cron library.


### Overview of job scheduling.
Every repeated tasks that are carried out underground are referred to as `jobs` in software development. But job scheduling deals with the process whereby the execution of various tasks is ensured by connecting system applications together.

There are many schedulers as used in industries. This is based on the kind of company needs, and what is required for. For instance, `Oracle FLEXCUBE FCJ` uses the two types of jobs schedulers named `Quartz` and `Flux`.

Furthermore, jobs schedulers are useful where repetitive tasks are needed. For example, every `notifications` sent by social media applications to users' account are made through this process. 

It is possible to schedule a job that needs to be carried out once a particular thing is accomplished or executed. In every social application, the `Like` button keeps updating once it is pressed, and this action updates the database too. However, millions of users can like a particular content at the same time, and this does not distrupt any other likes.

All of these are done through job scheduling automation. Stay tuned to learn more on how to implement this into your next Python project. 

Next, I will be introducing a library called `django_cron` for this automation.


### How django_cron works
In this chapter, we will be talking about how to achieve job scheduling automation through this library. This allows the `Django-Python` code to run on repeated basics.

This also helps to track, and execute recurring tasks whether they are successful or not having carried out. There are two main ways of going about this automation stuff. They are as follows;

- Custom script file
In this case, developers write their own personal scripts to achieve the queueing of jobs. This can take time but engineers get to design what they want based on their needs. An example of this can be found below;

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

- Note: This is a `cron.yml` file that can be used to automate jobs based on the steps defined.

- Using pre-defined libraries
So many libraries have been developed in the course of this action. Libraries like `django_cron`, `celery` etc can be used to achieve job scheduling.

Now, let's see how to incorporate the `django_cron` in the Python application. Remember this can only be used in the Python framework called `Django`.

Every Python package or library is used by installing it first. To extend `django_cron` into Django project, the installation can be done as follows;

```bash
pip install django_cron
```

The convention is to prepare a Python script file for the codes. Inside the file, Python class will be used by extending a particular class called `CronJobBase` from the installed library. 

Also, a method called `Schedule` will be imported which takes an argument of `minutes`. That is, such job will run in a repeated manner in the interval of minutes provided. However, this will execute a `do()` method that is inside the cron job class.

Finally, the job can be run manually by executing the code snippet below. We will see a demo by building an API from an external API in the next section.

```bash
python manage.py runcrons
```

- Note: The command above will run all available cron jobs. But to run a specific cron job, you provide the class name of the job instead of `runcrons`.


### Demo of jobs scheduling automation with django_cron library.

In this section, there are various headings for a better understanding of the workflow and efficient reading as well. We will be developing a demo API using an external endpoint `https://hackernews.api-docs.io.` data. 

Furthermore, this application will ensure the streaming of data into the database from the endpoint based on the configured number of `minutes`. Before anything, let us set up the project directory itself.


#### Project setup
We will start this tutorial by setting up a project structure in Django's way of doing things. First off, we have to design a storage location for the project.

Open your git bash, and type in the following commands:

```bash
cd
cd Desktop
mkdir project
cd project
```

You checked the working directory and ensure you are on the `Desktop` directory. You also made a directory called `project`, change to it.

Now make a virtual environment for the project and install the required dependencies as shown below:

```bash
python -m venv env
source env/Scripts/activate
pip install django django_cron djangorestframework
touch requirements.txt
pip freeze > requirements.txt
```

You have configured the environment for the project, and installed all of the dependencies. You are keeping track of them via the `requirements.txt` file.

Furthermore, you will start the project, spin up the Django server, install an app called `news` with the code snippet below:

```bash
django-admin startproject hackernewsdemo
python manage.py startapp news
python manage.py runserver
```

If you open your browser to `127.0.0.1:8000`, you should confirm what we have in the image below:

![First page](/engineering-education/automating-jobs-scheduling-with-django_cron-in-python-application/first-page.png)


Now open to the project `settings.py` file, navigate to the `INSTALLED_APPS`, and add the snippets below:

```python
'rest_framework'
'django_cron'
'news'
```

In addition, it is mandatory to register the `CRON_CLASSES` list in the `settings.py` right below the file. The list contains all the cron classes that the application has. Also, we need to add the permission classes for the API. 

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
In this API, what actually needed from the external endpoint is the `ids` of the external news data. For this reason, you will make the model with just two properties which are `id` and `datetime` fetched.

It is pertinent to make the primary key of the database from the fetched data `id`. This is because it will be referenced whenever you are to get the latest news from the external endpoint. 

Copy the snippets below into your `models.py` of the `news` app.

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
Here, you will make the cron job class. This class is required by the `django_cron` library to run every minute(s) as configured in the code below.

However, the code snippet below describes the cron job class together with the method that will be called whenever the above command is executed. 

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

# run the command to add the latest hackernews id to your DB -  "python manage.py runcrons"
```

This `MyCronJob` class extends the `CRONJOBBase`calss imported from the library. Among properties of the class is `code` which serves as a signature for a particular cron job. This identification will be referenced in the `settings.py`.

Under the `do()` method, API request was done. In this case to the external source with some formattings too. The response generated would be the latest 5 `ids` added from the external source. 

Then, a loop to run through the responses list, and add each `id` to the database by the `save()` method called.


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

- Note: In this application, you only care for the `id`, and that was why you made the fields tuple with only one element from the model. 


#### Views setup
You will make two class-based views called `NewsIdView`, and `NewsItemView`. The first view will make a request to the external API, and then get the list of ids for your endpoint. This will be done through the `GET` method under the class.

However, the other view will match the saved id in the database to get the particular data from the external API. This will match half of the ids from database, and then perform a request on each to fetch specific data of the id.

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

# GET a list of all news ids from hackernews
  def get(self, request, format=None):

    NEWS_URL = 'https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty'
    
    headers = {'user-agent': 'quickcheck/0.0.1'}
    response = requests.get(NEWS_URL, headers=headers)

    result = response.text.split(',')[1:len(response.text.split(','))-2]  # to trim the last element
    last = response.text.split(',')[-1]  #got this from API " 499287535 ] /n" --> reshaped to that below
    result.insert(len(result), last.strip().split()[0]) # "499287535"
    
    res = [int(id.strip()) for id in result] # list comprehension to strip each element of the data
    
    return Response(res, status=status.HTTP_200_OK)

        

class NewsItemView(ListAPIView):
  permission_classes = [AllowAny]

  def get_data_from_API(self):
    """
        This helps to return 
        formatted data fetched from endpoint provided
        using request.
    """
    result = []
    half = 0
    total = len(HackerNewsID.objects.all()) # getting the total ids from the db

    #slicing into half based on even or odd total
    if total % 2 == 0:
        half = len(HackerNewsID.objects.all()) / 2
    else:
        half = (len(HackerNewsID.objects.all()) / 2) + 1

    ids = HackerNewsID.objects.all()[:half] #slicing the queryset to get last half

    # looping through the ids queryset
    for id in ids:
      # external endpoint for each id
        NEWS_URL = f'https://hacker-news.firebaseio.com/v0/item/{str(id)}.json?print=pretty'
        headers = {'user-agent': 'quickcheck/0.0.1'} 
        response = requests.get(NEWS_URL, headers=headers)
        data = json.loads(response.text)
        result.append(data)

    return result

    
# GET the latest hackernews streamed
  def get(self, request, format=None):
    return Response(self.get_data_from_API(),status=status.HTTP_201_CREATED)
```


#### Configuring routes for your endpoint
Under the project folder, navigate to the `urls.py` and paste the snippet below. These are the routes for `rest-framewrok`, `admin`, and the `news` app made.

```python
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api-auth/', include('rest_framework.urls')),
    path('api/v0/items/', include('news.urls'))
]
```

To connect the `news` app with the `hackernewsdemo` project route, you will need to make your custom `urls.py` inside the app folder. Then copy the below code and paste it in.

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


#### Creating an admin
As a Django developer, you are familiar with the default admin page that can be configured. Executing this below will make a brand new administration site where all activities of the database are controlled.

```bash
python manage.py createsupuer
```

Having created a superuser admin account, you will have to register the `news` app model in the `admin.py`. Copy out the code snippet for such.

```python
from django.contrib import admin
from .models import HackerNewsID, QuickCheckItem, QuickCheckNews


class HackerNewsIDAdmin(admin.ModelAdmin):
    list_display = ('hackernews', 'fetched_at') #these are the features to be listed
    list_display_links = ('hackernews', 'fetched_at') #these are the features links
    
admin.site.register(HackerNewsID, HackerNewsIDAdmin)
```

Furthermore, you can attest to the admin page made by executing the following command. Then, open to the `http://127.0.0.1:8000/admin` in your browser and log in.

```bash
python manage.py runserver
```

Now, you can test the API by running the required command that was described above. This will perform API requests to the external API, and then add the latest `ids` to the database. All things have been equal, you should see something like the admin page below.

```bash
python manage.py runcrons
```

![Admin page](/engineering-education/automating-jobs-scheduling-with-django_cron-in-python-application/admin.png)

In addition, you can make an API request to the endpoint `http://127.0.0.1:8000/api/v0/items/hackernews` to fetch you the data that each of the saved ids return. Something like the image below.


![Response page](/engineering-education/automating-jobs-scheduling-with-django_cron-in-python-application/response.png)



### Conclusion
In this tutorial, you have walked through how to make a cron job in a Python application. You learned about the library called `django_cron`, and how it is used to make cron jobs. 

You also performed API requests to an external source by fetching their data and writing it to your database using job scheduling. Go ahead and apply your skills in a real-world application.

Thank you!!
