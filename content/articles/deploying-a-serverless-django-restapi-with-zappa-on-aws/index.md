Serverless technology has gradually become an area of interest in software development in recent times. A few years back, all applications built on classic web servers were manually managed until the development of this technology. This technology guarantees automatic web server configuration or permissions, allowing the developer to focus solely on developing and designing web applications, while their cloud provider handles the heavy lifting by managing the servers. Thereby, the user does not have to worry about the manual configuration of servers.

*Isn't this cool?*

The main purpose of the development of serverless technology is to aid developers to build and run applications without having to interact with or manage servers

Now, this does not mean the application runs entirely without a server, but that the management of the server would be handled by Amazon Web Services (AWS) through an open-source project known as [Serverless Application Model (SAM) framework](https://github.com/aws/serverless-application-model).

One of the upsides of serverless technology is that it runs on pay-per *request*. For example, a new company or startup that is low on budget can host their web apps on [AWS Lambda](https://aws.amazon.com/lambda/) to pay only when a user sends a request to the web app.

[AWS Lambda](https://aws.amazon.com/lambda/) is an Amazon serverless computing platform, referred to as the crux of AWS serverless offering that enables the user to run functions and manage computer resources automatically.

There are also other AWS services that will be used for this project, they include:

- API Gateway for managing and handling API HTTP endpoints.
- S3 bucket: Simple Storage Service is also known as S3 for storing data such as static files
- IAM roles for storing roles, user groups, and policies.

This process is quite exciting although the implementation in Django may be challenging. However, this is made easy using ***Zappa***.

[Zappa](https://www.zappa.io/) is an open-source tool for developing, deploying, and maintaining serverless Python applications on Amazon Web Services (AWS) technologies including Lambda and [API Gateway](https://aws.amazon.com/api-gateway/).

These configurations and deployment are handled automatically by Zappa with just a click. Well, not literally you will still need to configure it by running Zappa in it and setting a few parameters using a CLI interface. However, this is a lot easier and faster than conventional web servers.

### How does Zappa work

Zappa is a tool that allows deploying Django applications to AWS in a serverless environment. With Zappa, developers can deploy a WSGI-compatible application. Web Server Gateway Interface (WSGI) is a basic web server calling method used in sending requests to web apps implemented in Python. Simply, it describes how webservers and an application eg, Django, Flask, etc. communicate. WSGI uses Amazon Web Service products such as Lambda, API Gateway, and S3.  

In Django application, this is how Zappa works:

- When a request is sent to the server, it is received by API Gateway, which primarily handles HTTP requests. This API Gateway starts an instance in our AWS lambda function where the server is managed. Lambda processes this request and sends it to the server.
- Next, the request is sent to the server, which the Django app handles via the WSGI layer. WSGI layer is a basic web server calling method used in forwarding requests to web apps implemented in Python.
- Lastly, the server transmits the response to the API Gateway shortly before it is destroyed and the API Gateway provides the client with a response.

![/engineering-education/deploying-a-serverless-django-restapi-with-zappa-on-aws/architecture.jpg](/engineering-education/deploying-a-serverless-django-restapi-with-zappa-on-aws/meme.jpg)
[Image source](https://www.google.com/url?sa=i&url=https%3A%2F%2Fblog.archerysec.com%2FDeploy-ArcherySec-as-a-Serverless-on-AWS-using-Zappa%2F&psig=AOvVaw3-f5XWObLOEIa1mnBtnqSv&ust=1638433318404000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCNis2_WVwvQCFQAAAAAdAAAAABBW)

In the course of this project, we will work on how Zappa is implemented in Django by building a serverless Django REST API and deploying the application to AWS Lambda using Zappa.

### Prerequisites

- Basic knowledge of Python.
- Good understanding of [Django](https://docs.djangoproject.com/en/3.2/).
- [An AWS account](https://aws.amazon.com/).

### Project setup: Building a Django RESTAPI Application

In this project, we will be creating an E-book store, where the users can get a list of all books, create new books, edit and delete books.

We will begin by creating a directory for our project in our terminal.

```bash
mkdir bookstore
cd bookstore

```

Next, we will be creating a virtual environment to host our project. All the installed packages for this project would be contained the virtual environment.

Create a virtual environment using:

```bash
pip install virtualenv
virtual env

```

Let's activate our virtual environment

For Windows:

```
env\Scripts\activate

```

For Mac/Linux:

```
source env/bin/activate

```

*Virtualenv successfully activated!*

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

### Creating models

Let's build a model that stores information about books.

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

Next, we migrate these models into the database using these commands:

```python
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

### Creating Serializer file

Create a new file `serializers.py` file in your app directory.

Serializer converts the data in our models or queryset into datatypes such as JSON, XML, etc., that can be easily understood. Now add these lines of code to create a serializer class:

```python
from rest_framework import serializers
from .models import Book

class BookSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = '__all__'

```

### Creating views

Create your user's views in your `ebook/views.py` file.

The `views` file handles the logic of our API HTTP actions, making requests such as `GET`, `POST`, `UPDATE`, and `DELETE` to the API endpoints. Add these lines of code to you `views.py` :

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

### Create a URL handler

When a user makes a request, the Django controller takes over and searches the `urls.py` file for the corresponding view, returning the response or an error if not found.

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

Lastly, test out the API to see the work we have done so far to ensure it's running successfully. To test locally, run this command in your terminal, `python manage.py runserver`, and in your browser hit the endpoint [http://120.0.0.1:8000/api/books](http://120.0.0.1:8000/api/books).

***Hey! we are done building. Ladies and gentlemen let us deploy!***

![/engineering-education/deploying-a-serverless-django-restapi-with-zappa-on-aws/meme.jpg](/engineering-education/deploying-a-serverless-django-restapi-with-zappa-on-aws/meme.jpg)

[Image source](https://www.google.com/url?sa=i&url=https%3A%2F%2Fmakeameme.org%2Fmeme%2Fbrace-yourself-deploy&psig=AOvVaw30-YKcrTN4IWmGoZeWsnAT&ust=1637270554714000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCPiBt6GqoPQCFQAAAAAdAAAAABAJ)

### Setting up AWS

At this point, it is supposed that you have created your AWS account and have access to an AWS IAM user for the Zappa utility. Zappa utility handles tasks such as automatically creating an s3 bucket for deployment, creating lambda execution IAM roles, API gateways for web traffic work, etc. on your behalf.

Briefly, let us set up AWS on your console to properly utilize Zappa.

- Log in to your AWS console and go to the IAM section
- On the left side of the screen click on *users.*
- Click on *add users*. For this project, we will name our 'user', *'serverless'* and for access type, choose '*Programmatic access*'. This uses the API to interact with AWS.
- Move on the permission and select *'Attach existing policies directly*. We will be accessing two policies, the first is '*IAMFullAccess*" This creates users for lambda to be executed. The second is *'PowerUserAccess'* for creating API gateway and S3 bucket. Search for these policies and click on their boxes.
- Skip Add tags, move to Review and create a user.

*Successfully created!* We have also been supplied with an access key and secret access key. Download the *.csv file* which contains these keys as these pieces of information will be lost when the page closes

Briefly, let's set up AWS on your console in other to properly utilize Zappa.

### Deploying with Zappa

The first step is to install Zappa in our virtual environment:

```python
pip install zappa

```

Next, initialize Zappa,

```bash
zapa init

```

![/engineering-education/deploying-a-serverless-django-restapi-with-zappa-on-aws/zappainit.PNG](/engineering-education/deploying-a-serverless-django-restapi-with-zappa-on-aws/zappainit.PNG)

This command initializes Zappa and creates a `zappa_settings.json` file. Once the command executes, in your terminal you will get the following output and instructions

Flowing from this instruction, select an environment name. In this project, we used the default name, '*dev'.*

![/engineering-education/deploying-a-serverless-django-restapi-with-zappa-on-aws/zappa2.PNG](/engineering-education/deploying-a-serverless-django-restapi-with-zappa-on-aws/zappainit.PNG)


Here, Zappa created a bucket for handling uploaded files. Our Django application would be set in a private s3 bucket. Select the default.

![/engineering-education/deploying-a-serverless-django-restapi-with-zappa-on-aws/zappa3.PNG](/engineering-education/deploying-a-serverless-django-restapi-with-zappa-on-aws/zappainit.PNG)


In your code editor a new file, `zappa_settings.json` has been automatically created to handle the configurations.

Lastly, we deploy by running,

```bash
zappa deploy dev

```

This command deploys our application which we named, ''dev",  however, an error was raised due to improper configuration of SQLite. To solve this, in your `settings.py` comment out the database

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

N.B, This command updates changes that have been made to deployment. Therefore, whenever modifications are made to your project, use the command to update the deployment.

After successful deployment, you should receive a URL through which you may access your API over the web.

```
<https://oitzappv43.execute-api.eu-west-2.amazonaws.com/dev>

```

Copy the generated URL for your app and paste it into the project's `ALLOWED_HOSTS` in your `settings.py`

```python
ALLOWED_HOSTS = ["oitzappv43.execute-api.eu-west-2.amazonaws.com"]

```

Now, we can run this URL and load our application.

![/engineering-education/deploying-a-serverless-django-restapi-with-zappa-on-aws/admin.png](/engineering-education/deploying-a-serverless-django-restapi-with-zappa-on-aws/admin.png)

We've successfully redeployed the application. However, notice that the styling is not working properly, this is because we failed to map our application across to the CSS which contains the styling. Let us quickly do that.

### Manage static files

Static files must be maintained for the default Django styles to operate at the deployed stage, and to do so, start by establishing a unique name. Also, make sure ***'Block all public access'*** is unchecked before proceeding to create the bucket.

Next, in the "*permissions*" section of your bucket, navigate to Cross-Origin resource sharing (CORS) to allow access from other hosts, edit the file to this setup:

```
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
#AWS_S3_PUBLIC_URL_STATIC = "<https://static.yourdomain.com/>"

```

Afterward, run the following commands to update the changes and upload the static files to the bucket:

```bash
zappa update dev
zappa manage dev "collectstatic --noinput"

```

Re-run the admin page. The API at this point should render the required styles accurately.

![/engineering-education/deploying-a-serverless-django-restapi-with-zappa-on-aws/admin.png](/engineering-education/deploying-a-serverless-django-restapi-with-zappa-on-aws/admin.png)

As seen our application is running successfully.

### Conclusion

This course provides a walk-through guide on creating a Django REST API and deploying the API as a serverless application using Zappa on AWS Lambda. We began by building a simple RESTAPI  before proceeding to deploy on AWS. Having understood what Zappa is and how it works in Django. This knowledge can also be applied in your project, giving you the ease of building an application in which the server is managed automatically

I hope you find this article of good use.

Happy coding! 🙂

### Reference

[https://github.com/zappa/Zappa](https://github.com/zappa/Zappa) 

The code in this project is contained in this repo: 

[https://github.com/Anitaachu/Bookshop](https://github.com/Anitaachu/Bookshop) 

