---
layout: engineering-education
status: publish
published: true
url: /deploying-a-serverless-jango-restapi-with-zappa-on-aws/
title: Deploying a Serverless Django REST API with Zappa on AWS
description: This article provides a walk through on how serverless technology works using Zappa and how Zappa is implemented in Django, while focusing on building a REST API and deploying same using Zappa on AWS.
author: anita-achu
date: 2021-11-17T00:00:00-10:00
topics: [Python]
excerpt_separator: <!--more-->
images: 

  - url: /engineering-education/deploying-a-serverless-jango-restapi-with-zappa-on-aws/hero.PNG
    alt: Django and Zappa image
---

Serverless technology has gradually become an area of interest in software development in recent times. A few years back, all applications built on classic web servers were manually managed until the development of this technology. This technology guarantees automatic web server configuration or permissions, allowing the developer to focus solely on developing and designing web applications while their cloud provider handles the heavy lifting by managing the servers, thereby, the user does not have to worry about manual configuration. *Isn't this cool?*

Serverless technology was created with the main goal of enabling developers to build and run applications without having to interact with or manage servers. Now, this does not mean the application runs entirely without a server, but that the management of the server would be handled by Amazon Web Services (AWS) through an open-source project known as [Serverless Application Model (SAM) framework](https://github.com/aws/serverless-application-model).

One of the upsides of serverless technology is that it runs on pay-per *request.* For example, a new company or startup that is low on budget can host their web apps on Lambda and only pay when a user requests the web app.

This process is quite exciting although the implementation in Django may be challenging. However, this is made easy using ***Zappa***. [Zappa](https://www.zappa.io/) is an open-source tool used for creating, deploying, and managing serverless python applications on AWS products such as Lambda and API Gateway.

To aid your understanding, AWS Lambda is an amazon serverless computing platform, referred to as the crux of AWS serverless offering, which enables the user to run functions and manage computer resources automatically.

These configurations and deployment are handled automatically by Zappa with just a click. Well, not literally you will still need to configure it by running Zappa in it and setting a few parameters using a CLI interface. However, this is a lot easier and faster than conventional web servers.

In the course of this project, we will work on how Zappa is implemented in Django by building a serverless Django REST API and deploying the application to AWS Lambda using Zappa.

### Prerequisite

- Basic knowledge of python
- Good understanding of Django
- [An AWS account](https://aws.amazon.com/)

### How does Zappa work

Simply, Zappa is a tool that allows deploying Django applications to AWS in a serverless environment. With Zappa, developers can deploy a WSGI-compatible application using Amazon Web Service products such as Lambda, API Gateway, and S3.

*This is how it works.*

When the user sends a request to the server, which is received by API Gateway, the Gateway starts a server inside our lambda function. Now, Django is installed in the same way that a lambda function is. The request is subsequently sent to the server, which the Django app handles via the WSGI layer. The server transmits the response to the API Gateway shortly before it is destroyed. Lastly, the API Gateway provides the client with a response.

That been understood, let's proceed to build our Django application.

### Project setup: Building a Django RESTAPI Application

In this project, we will be creating an E-book store, in which users can get a list of all books, create new books, edit and delete books.
We will begin by creating a directory for our project in our terminal.

```bash
mkdir bookstore 
cd bookstore
```

 

**Setting up virtual environment**

Next, we will be creating a virtual environment to host our project. All the installed packages for this project would be contained the virtual environment.

To create a virtual environment, let’s begin by installing `virtualenv`.

```bash
pip install virtualenv
virtual env
```

Let’s activate our virtual environment

For Windows:

```bash
env\Scripts\activate 
```

Mac/Linux:

```bash
source env/bin/activate
```

*Virtualenv successfully activated!*

Next, install the Django dependencies. 

```python
pip install django djangorestframework zappa
```

Now we can create both our Django project and app. 

```bash
django-admin startproject bookstore 
cd bookstore
django-admin startapp ebook
```

Next, in your project folder, open up the *settings.py* file add `rest_framework` and the name of the app-created `ebook` in the list of installed apps. 

```python
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework',
    'ebook',
]
```

### Creating models

```python
from django.db import models

# Create your models here.
class Book(models.Model):
    title = models.CharField(max_length=150)
    author = models.CharField(max_length=100, default='John Doe')
    isbn = models.CharField(max_length=13)
    pages = models.IntegerField()
    price = models.IntegerField()
    quantity = models.IntegerField()
    description = models.TextField()
    status = models.BooleanField()
    date_created = models.DateField(auto_now_add=True)

    class Meta:
        ordering = ['-date_created']

    def __str__(self):
        return self.title
```

Next, migrate models into the database using these commands:

```python
python manage.py makemigrations
python manage.py migrate
```

Next, register the models in your `ebook/admin.py` file. 

```python
from django.contrib import admin
from .models import Book

# Register your models here.
admin.site.register(Book)
```

 
**Creating Serializer file**

Create a new file, `serializers.py` file in your app directory. The function of serializer is to return a response of the users request. Add the following lines of code:

```python
from rest_framework import serializers
from .models import Book

class BookSerializer(serializers.ModelSerializer):

    class Meta:
        model = Book
        fields = '__all__'
```

**Creating views**

 Create your user's views in your `ebook/views.py` file, the views file handle the logic of our API HTTP actions, make requests such as GET, POST, UPDATE and DELETE to the API endpoints. Add these lines of code to you `views.py` :

```python
from rest_framework import generics
from .serializers import BookSerializer
from .models import Book

class BookList(generics.ListCreateAPIView):
    queryset = Book.objects.all()
    serializer_class = BookSerializer

class BookDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Book.objects.all()
    serializer_class = BookSerializer
```

The *BookList* view displays a list of all books and also allows the users to create a new book. 

The *BookDetail*, the other view, allows the user to create, retrieve, update, and delete a specific book. 

**Create a URL handler**

When a user makes a request, the Django controller takes over and searches the urls.py file for the corresponding view, returning the response or an error if not found.

In Django, the "*urlpatterns*" tuple is the most significant element, the URL-to-view mapping is defined here. To create a URL handler.

Next, create a `urls.py` file in your app directory, and add the following code:

```python
from django.urls import path
from .views import BookList, BookDetail

urlpatterns = [
    
    path('api/books/', BookList.as_view()),
    path('api/books/{id}', BookDetail.as_view()),
]
```

### Testing the API

Lastly, test out the API to see the work we have done so far to ensure it's running successfully. To test locally, run this command in your terminal, python manage.py runserver, and in your browser hit the endpoint [http://120.0.0.1:8000/api/books](http://120.0.0.1:8000/api/books).

***Hey! we are done building. Ladies and gentlemen let us deploy!***

![Deployment](/engineering-education/deploying-a-serverless-jango-restapi-with-zappa-on-aws/meme.jpg)

[Image source](https://www.google.com/url?sa=i&url=https%3A%2F%2Fmakeameme.org%2Fmeme%2Fbrace-yourself-deploy&psig=AOvVaw30-YKcrTN4IWmGoZeWsnAT&ust=1637270554714000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCPiBt6GqoPQCFQAAAAAdAAAAABAJ)


### Setting up AWS

At this point, it is supposed that you have created your AWS account and have access to an AWS IAM user for the Zappa utility. Zappa utility handles tasks such as automatically creating an s3 bucket for deployment, creating lambda execution IAM roles, API gateways for web traffic work, etc. on your behalf.

Briefly, let us set up AWS on your console to properly utilize Zappa.

S*tep 1*: Log in to your AWS console and go to the IAM section

*Step 2*: On the left side of the screen click on *users*

*Step 3*: Click on *add users*. For this project, we will name our 'user', *'serverless'* and for access type, choose '*Programmatic access*'. This uses the API to interact with AWS.

*Step 4*: Move on the permission and select *'Attach existing policies directly*. We will be accessing two policies, the first is '*IAMFullAccess*" This creates users for lambda to be executed. The second is *'PowerUserAccess'* for creating API gateway and S3 bucket. Search for these policies and click on their boxes.

*Step 5*: Skip Add tags, move to Review and create a user.

*Successfully created!* We have also been supplied with an access key and secret access key. Download the *.csv file* which contains these keys as these pieces of information will be lost when the page closes

Briefly, let'sSet up AWS on your console in other to properly utilize Zappa. 

### Deploying with Zappa

The first step is to install Zappa in our virtual environment:

```python
pip install zappa
```

Next, initialize Zappa, 

```python
zapa init
```

```python
███████╗ █████╗ ██████╗ ██████╗  █████╗
╚══███╔╝██╔══██╗██╔══██╗██╔══██╗██╔══██╗
  ███╔╝ ███████║██████╔╝██████╔╝███████║
 ███╔╝  ██╔══██║██╔═══╝ ██╔═══╝ ██╔══██║
███████╗██║  ██║██║     ██║     ██║  ██║
╚══════╝╚═╝  ╚═╝╚═╝     ╚═╝     ╚═╝  ╚═╝

Welcome to Zappa!

Zappa is a system for running server-less Python web applications on AWS Lambda and AWS API Gateway.
This `init` command will help you create and configure your new Zappa deployment.
Let's get started!

Your Zappa configuration can support multiple production stages, like 'dev', 'staging', and 'production'.
What do you want to call this environment (default 'dev'): dev
```

Flowing from this instruction, select an environment name. In this project, we used the default name, '*dev'.*
![Zappa initalisation](/engineering-education/deploying-a-serverless-django-restapi-with-zappa-on-aws/zappainit.PNG)

```python
It looks like this is a Django application!
What is the module path to your projects's Django settings?
We discovered: bookstore.settings
Would you like to deploy this application ←[1mglobally←[0m? (default 'n') [y/n/(p)rimary]: n

Okay, here's your zappa_settings.json:

{
    "dev": {
        "aws_region": "eu-west-2",
        "django_settings": "bookshop.settings",
        "profile_name": "default",
        "project_name": "bookstore",
        "runtime": "python3.9",
        "s3_bucket": "zappa-763nx6mgt"
    }
}
```

Firstly, Zappa created an a bucket for handling uploaded files. Now, our Django application would be set in a private s3 bucket. Select the default.

```python
Does this look ←[32m←[1mokay←[0m? (default 'y') [y/n]: y

Done! Now you can deploy your Zappa application by executing:

        $ zappa deploy dev

After that, you can update your application code with:

        $ zappa update dev

To learn more, check out our project page on GitHub here: https://github.com/Zappa/Zappa
and stop by our Slack channel here: https://zappateam.slack.com

Enjoy!,
 ~ Team Zappa!
```

In your code editor a new file, `zappa_settings.json` has been automatically created to handle the configurations.

Lastly we deploy by typing, 

```python
zappa deploy dev
```

This will however raise an error caused by improperly configured SQLite. To solve this, in your `settings.py` comment out the database

```python
# Database
# https://docs.djangoproject.com/en/3.2/ref/settings/#databases

# DATABASES = {
#     'default': {
#         'ENGINE': 'django.db.backends.sqlite3',
#         'NAME': BASE_DIR / 'db.sqlite3',
#     }
# }
```
Afterwards, run this command:
```python
zappa update dev
```

You should receive a URL where you can access your API via the internet after successful deployment.

```python
https://oitzappv43.execute-api.eu-west-2.amazonaws.com/dev
```

Copy the generated URL for your app and paste it into the project's `ALLOWED_HOSTS` in your `settings.py`

```python
ALLOWED_HOSTS = ["oitzappv43.execute-api.eu-west-2.amazonaws.com"]
```

Whenever modifications are made to your project, always update the deployment with the command used above.

Now, we can run this URL and load our application.

![Admin](/engineering-education/deploying-a-serverless-jango-restapi-with-zappa-on-aws/admin.png)

We've successfully redeployed the application. However, notice that the styling is not working properly, this is because we failed to map our application across to the CSS which contains the styling. Let us quickly do that. 

### Manage static files

For the default Django styles to work at the deployed stage, static files need to be managed, and to do this, begin by creating an [S3 bucket](https://console.aws.amazon.com/s3/) with a distinct name. Also, ensure you uncheck ***'Block all public access'***  then proceed in creating the bucket.

Next, in the "*permissions*" section of your bucket, go to the Cross-Origin resource sharing (CORS) section to allow access from other hosts, edit the file to the following configuration:

```python
[
  {
    "AllowedHeaders": ["*"],
    "AllowedMethods": ["GET"],
    "AllowedOrigins": ["*"],
    "MaxAgeSeconds": 3000
  }
]
```

### Setting Django Static File

Install the *Django s3 storage* library in order to work with S3. 

```python
pip install django-s3-storage
```

Next, in your `settings.py` file, add `'django_s3_storage'` to installed apps. 

```python
INSTALLED_APPS = [
  ... 
'django_s3_storage'
]
```

Also add the following:

```python
if DEBUG:
   STATICFILES_DIRS = [
   os.path.join(BASE_DIR, 'static'),
   ]
else:
   STATIC_ROOT = os.path.join(BASE_DIR,'static')

MEDIA_URL = '/media/'
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')
S3_BUCKET_NAME = "Enter the name ofyour bucket"
STATICFILES_STORAGE = "django_s3_storage.storage.StaticS3Storage"
AWS_S3_BUCKET_NAME_STATIC = S3_BUCKET_NAME
# serve the static files directly from the specified s3 bucket
AWS_S3_CUSTOM_DOMAIN = '%s.s3.amazonaws.com' % S3_BUCKET_NAME
STATIC_URL = "https://%s/" % AWS_S3_CUSTOM_DOMAIN
# if you have configured a custom domain for your static files use:
#AWS_S3_PUBLIC_URL_STATIC = "https://static.yourdomain.com/"
```

Afterward, run the following commands to update the changes and upload the static files to the bucket:

```python
zappa update dev
zappa manage dev "collectstatic --noinput"
```

Re-run the admin page. The API at this point should render the required styles accurately. 

![Admin with static file](/engineering-education/deploying-a-serverless-jango-restapi-with-zappa-on-aws/admin.png)

As seen our application is running successfully.

### Conclusion

This course walked you through creating Django RESTful APIs and deploying them as serverless applications using Zappa on AWS Lambda. Having understood what Zappa is and how it works in Django. You can apply what you have learned in your projects to create APIs and deploy serverless Python applications.

I hope you find this article of good use.

Happy coding! 🙂
