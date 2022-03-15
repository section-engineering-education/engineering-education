---
layout: engineering-education
status: publish
published: true
url: /deploying-a-serverless-django-restapi-with-zappa-on-aws/
title: Deploying Serverless Django REST API with Zappa on AWS
description: This article will explain how Zappa works with Django by building a serverless Django REST API and deploying the application to AWS Lambda using Zappa.
author: anita-achu
date: 2021-12-18T00:00:00-12:00
topics: [Languages, API]
excerpt_separator: <!--more-->
images: 

  - url: /engineering-education/deploying-a-serverless-django-restapi-with-zappa-on-aws/hero.png
    alt: Deploying serverless Django REST-API with Zappa on AWS Image
---
Serverless technology has gradually become an area of interest in software development. Before, they manually managed all applications built on classic web servers until the development of this technology.
<!--more-->
This technology guarantees automatic web server configuration and permissions, allowing the developer to focus solely on developing and designing web applications while their cloud provider handles the heavy tasks by managing the servers. 

For this reason, the user does not have to worry about the manual configuration of servers. The primary purpose of serverless technology is to aid developers in building and running applications without interacting with or managing servers.

Now, this does not mean the application runs entirely without a server, but that the management of the server would be handled by Amazon Web Services (AWS) through an open-source project known as [Serverless Application Model (SAM) framework](https://github.com/aws/serverless-application-model).

One of the upsides of serverless technology is that it runs on pay-per *request*. For example, a new company or startup that is low on budget can host their web apps on [AWS Lambda](https://aws.amazon.com/lambda/) to pay only when a user sends a request to the web app.

[AWS Lambda](https://aws.amazon.com/lambda/) is an Amazon serverless computing platform that enables users to run functions and manage computer resources automatically.

Other AWS services that will be used for this project include: 
- API Gateway for managing and handling API HTTP endpoints.
- S3 bucket: Simple Storage Service is also known as S3 for storing data such as static files
- IAM roles for storing roles, user groups, and policies.

This process is quite exciting; although the implementation in Django may be challenging, Zappa makes it easy.

[Zappa](https://www.zappa.io/) is an open-source tool for developing, deploying, and maintaining serverless Python applications on Amazon Web Services (AWS) technologies, including Lambda and [API Gateway](https://aws.amazon.com/api-gateway/).

Zappa handles the configurations and deployment automatically with just a click, but first, you need to configure Zappa by running Zappa `init` and setting a few parameters using a CLI interface. 

### How does Zappa work
With Zappa, developers can deploy a WSGI-compatible application. Web Server Gateway Interface (WSGI) is a web server calling method used in sending requests to web apps implemented in Python. 

It describes how web servers and applications like Django and Flask communicate. WSGI uses Amazon Web Service products such as Lambda, API Gateway, and S3.  

In the Django application, this is how Zappa works:
- When a request is sent to the server, it is received by the API Gateway, which handles HTTP requests. This API Gateway starts an instance in our AWS lambda function where the server is managed. Lambda then processes this request and sends it to the server.
- Next, the request is sent to the server, which the Django app handles via the WSGI layer. 
- Then, the server transmits the response to the API Gateway shortly before it is destroyed and then provides the client with a response.

![Architecture](/engineering-education/deploying-a-serverless-django-restapi-with-zappa-on-aws/architecture.png)

This project will work on how Zappa is implemented in Django by building a serverless Django REST API and deploying the application to AWS Lambda using Zappa.

### Prerequisites
- Basic knowledge of Python.
- Good understanding of [Django](https://docs.djangoproject.com/en/3.2/).
- An [AWS account](https://aws.amazon.com/).

### Project setup: Building a Django REST API Application
In this project, we will create an E-book store, where the users can get a list of all books, create new books, edit and delete books.

We will begin by creating a directory for our project in our terminal.

```bash
mkdir bookstore
cd bookstore
```

Next, we will create a virtual environment to host our project. All the installed packages for this project will be contained in the virtual environment.

Create a virtual environment using the following command:

```bash
pip install virtualenv
virtual env
```

Let us activate our virtual environment by running the following command: 

For Windows:

```bash
env\Scripts\activate
```

For Mac/Linux:

```bash
source env/bin/activate
```

Next, install the Django dependencies.

```bash
pip install django djangorestframework zappa
```

Now, we can create our Django project and run the app as shown below:

```bash
django-admin startproject bookstore
cd bookstore
django-admin startapp ebook
```

Next, in your project folder, open up the `settings.py` file, and add `rest_framework` along with the name of the created app `ebook` to the list of installed apps:

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

### Creating the application models
This step will build a model that stores information about books. Models specify how data appears in the database.

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

Next, we migrate these models into the database using these commands:
```bash
python manage.py makemigrations
python manage.py migrate
```

Then, we register the models in your `ebook/admin.py` file.

```python
from django.contrib import admin
from .models import Book

# Register your models here.
admin.site.register(Book)
```

### Creating a Serializer file
Create a new file, a `serializers.py` file, in your app directory.

Serializer converts the data in our models or queryset into data types such as JSON and XML that can be easily understood. Now add these lines of code to create a serializer class:

```python
from rest_framework import serializers
from .models import Book

class BookSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = '__all__'

```

### Creating views
Create your user's views in your `ebook/views.py` file. The `views` file handles the logic of our API HTTP actions, making requests such as `GET`, `POST`, `UPDATE`, and `DELETE` to the API endpoints. Add these lines of code to your `views.py`:

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

The *BookList* view displays a list of all books and also allows the users to create a new book. The *BookDetail*, the other view, allows the user retrieve, update, and delete a specific book.

### Create a URL handler
When a user makes a request, the Django controller takes over and searches the `urls.py` file for the corresponding view, returning the response or an error if not found.

In Django, the "*urlpatterns*" tuple is the most significant element. The URL-to-view mapping is defined here. Next, create a `urls.py` file in your app directory, and add the following code:

```python
from django.urls import path
from .views import BookList, BookDetail

urlpatterns = [
    path('api/books/', BookList.as_view()),
    path('api/books/{id}', BookDetail.as_view()),
]
```

### Testing the API
Now we can test out the API to see the if the work we have done is running successfully. To test locally, run `python manage.py runserver`, and in your browser, hit the endpoint [http://120.0.0.1:8000/api/books](http://120.0.0.1:8000/api/books).


### Setting up AWS
By this point, you should have created an AWS account and have access to an AWS IAM user for the Zappa utility. 

Zappa utility handles tasks such as automatically creating an s3 bucket for deployment, creating lambda execution IAM roles, API gateways for web traffic work, among other functionalities on your behalf.

Briefly, let us set up AWS on your console to utilize Zappa properly.
- Log in to your AWS console and go to the IAM section
- On the left side of the screen, click on *users.*
- Click on *add users*. For this project, we will name our 'user', *'serverless'*, and for access type, choose '*Programmatic access*'. This uses the API to interact with AWS.
- Move on the permission and select *'Attach existing policies directly*. We will be accessing two policies. The first is '*IAMFullAccess*" This creates users for Lambda to be executed. The second is *'PowerUserAccess'* used to create API gateway and S3 buckets. Search for these policies and click on their boxes.
- Skip Add tags, move to Review and create a user.

*Successfully created!* We have also been supplied with an access key and secret access key. Download the *.csv file* which contains these keys, as these pieces of information will be lost when the page closes.

![Deployment meme](/engineering-education/deploying-a-serverless-django-restapi-with-zappa-on-aws/meme.jpg)

[Image source](https://www.google.com/url?sa=i&url=https%3A%2F%2Fmakeameme.org%2Fmeme%2Fbrace-yourself-deploy&psig=AOvVaw30-YKcrTN4IWmGoZeWsnAT&ust=1637270554714000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCPiBt6GqoPQCFQAAAAAdAAAAABAJ)

### Deploying with Zappa
The first step is to install Zappa in our virtual environment:

```python
pip install zappa
```

Next, initialize Zappa,

```bash
zappa init
```

![Zappa Init](/engineering-education/deploying-a-serverless-django-restapi-with-zappa-on-aws/zappainit.PNG)

This command initializes Zappa and creates a `zappa_settings.json` file. Once the command executes in your terminal, you will get the following output and instructions. Select an environment name. 

We used the default name, '*dev' in this project.* Here, Zappa created a bucket for handling uploaded files. Our Django application would be set in a private s3 bucket. Then, we deploy by running:

![Zappa configuration](/engineering-education/deploying-a-serverless-django-restapi-with-zappa-on-aws/zappa2.PNG)

```bash
zappa deploy dev
```

![Zappa Deploy](/engineering-education/deploying-a-serverless-django-restapi-with-zappa-on-aws/zappa3.PNG) 

This command deploys our application which we named, '*dev',  however, an error was raised due to improper configuration of SQLite. To solve this, in your `settings.py` comment out the database.

```python
# Database
# <https://docs.djangoproject.com/en/3.2/ref/settings/#databases>

# DATABASES = {
#     'default': {
#         'ENGINE': 'django.db.backends.sqlite3',
#         'NAME': BASE_DIR / 'db.sqlite3',
#     }
# }
```

Afterward, run this command:

```bash
zappa update dev
```

>Note: This command updates changes that have been made to deployment. Therefore, whenever modifications are made to your project, use the command to update the deployment.

After successful deployment, you should receive a URL to access your API over the web.

```bash
<https://oitzappv43.execute-api.eu-west-2.amazonaws.com/dev>
```

Copy the generated URL for your app and paste it into the project's `ALLOWED_HOSTS` in your `settings.py.`

```python
ALLOWED_HOSTS = ["oitzappv43.execute-api.eu-west-2.amazonaws.com"]

```

Now, we can run this URL and load our application.

![Admin](/engineering-education/deploying-a-serverless-django-restapi-with-zappa-on-aws/admin.PNG)

We have successfully redeployed the application. However, notice that the styling is not working correctly. We failed to map our application across to the CSS, which contains the styling. Let's quickly do that.

### Manage static files
Static files must be maintained for the default Django styles to operate at the deployed stage, and to do so, start by establishing a unique name. Also, make sure ***'Block all public access'*** is unchecked before creating the bucket.

Next, in the "*permissions*" section of your bucket, navigate to Cross-Origin resource sharing (CORS) to allow access from other hosts, edit the file to this setup:

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

### Setting Django static file
Install the *Django s3 storage* library to work with S3.

```bash
pip install django-s3-storage
```

Next, in your `settings.py` file, add `'django_s3_storage'` to installed apps.

```python
INSTALLED_APPS = [
  ...
'django_s3_storage'
]
```

Also, add the following:

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
#AWS_S3_PUBLIC_URL_STATIC = "<https://static.yourdomain.com/>"
```

Afterwards, run the following commands to update the changes and upload the static files to the bucket:

```bash
zappa update dev
zappa manage dev "collectstatic --noinput"
```

Re-run the admin page. The API at this point should render the required styles accurately.

![New Admin](/engineering-education/deploying-a-serverless-django-restapi-with-zappa-on-aws/newadmin.PNG)

As seen, our application is running successfully.

### Conclusion
This article provides a walk-through on creating a Django REST API and deploying the API as a serverless application using Zappa on AWS Lambda. 

We began by building a simple REST API before proceeding to deploy on AWS. We now have a better understanding of what Zappa is and how it works in Django. This knowledge can also be applied in your other projects, giving you the ease of building an application in which the server is managed automatically.

Happy coding! 🙂

### Reference
- [https://github.com/zappa/Zappa](https://github.com/zappa/Zappa) 
- The code in this project is contained in this repo: [https://github.com/Anitaachu/Bookshop](https://github.com/Anitaachu/Bookshop) 

---
Peer Review Contributions by: [Jerim Kaura](/engineering-education/authors/jerim-kaura/)
