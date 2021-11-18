# How to Automate Tests for Dockerized Django Applications with GitHub Actions

## Introduction

Have you had a problem figuring out how to test your Django application continuously? Do you know how to integrate GitHub Actions, automated testing, and Django?
If these questions are in your mind, then you are in luck.

In this article, we will be testing the Django application with [Pytest](https://docs.pytest.org/en/stable/getting-started.html#:~:text=pytest%20is%20a%20framework%20that,for%20your%20application%20or%20library.), Dockerize it and write codes to run the tests automatically with GitHub Actions.

Pytest is a Python library used for running tests for Python code.
[GitHub Actions](https://docs.github.com/en/actions) enables you can automate a lot of repetitive stuff in your repository.
Docker helps make sure your app works the same way on all platforms. Adding these functionalities to your application can make it easy for **[continuous delivery](https://en.wikipedia.org/wiki/Continuous_delivery#:~:text=Continuous%20delivery%20(CD)%20is%20a,with%20greater%20speed%20and%20frequency.)** and collaboration.

Here you will learn how to configure GitHub Actions to automate your Django tests.

### Prerequisites

To follow this tutorial the following is required:

1. knowledge of Django
2. Knowledge of Git/GitHub
3. [Docker](https://docs.docker.com/get-docker/) and [Docker compose](https://docs.docker.com/compose/install/) installed

## Building a Base Django App

Let's first of all build the project that we will be using for this tutorial.
First of all, create a new virtual environment for the project, which will come in handy when you are trying to get a list of all the dependencies.

After creating the virtual environment, install Django with:

```bash
(env)$ pip install django
```

Run the code below to create a new project:

```bash
(env)$ django-admin startproject <name_of_project>
```

Example:

```bash
(env)$ django-admin startproject django_test_githubactions
```

`cd` into the directory that contains *manage.py* and run the code below to initialize the Django application:

```bash
(env)$ python manage.py startapp blog
```

Add “blog” to *settings.py* file which will enable Django recognise the app you just created.

```python
INSTALLED_APPS = [
"blog",  #new

]
```


We will be building a blog application for this illustration so in the ~*/blog/models.py* file and paste the code below:

```python
from django.db import models
    
    class Article(models.Model):  
       author_name = models.CharField(max_length=30)  
       title = models.CharField(max_length=20)  
       content = models.CharField(max_length=200)  
       def __str__(self):  
           return self.title
```

Next we have to write the logic to display the content. To do this, navigate to *app/views.py* on your text editor and paste the code below:

```python
from django.shortcuts import get_object_or_404, render
from .models import Article
def content_view(request, pk):
   post = get_object_or_404(Article, pk=pk)
   return render(request, "blog/article.html", {'post':post})
```

Next, update your *urls.py* file with the code below so that we can access that route in the browser.

```python

from blog import views 

urlpatterns = [  
    path('<int:pk>', views.content_view, name="content")
]
```

Next, create a template folder in the app directory to hold the template to display the blog content. Navigate to your app folder and create *templates/blog/article.html* and paste the code below:

```
Blog title:  
    {% if post.content %}  
    {{ post.content }}  
    {% endif %}
```

Migrate the models so that you can start adding articles to the database. To do this go to your terminal/command prompt run:

```bash
(env)$ python manage.py makemigrations
```

Then run:

```bash
(env)$ python manage.py migrate
```

### Populate the Database

We need to populate our database so that we can actually know whether our application is working as expected. To populate the database, go to your terminal the below instruction to go into the Django shell:

```bash
(env)$ python manage.py shell
```

Then run the code below one after the other, the second line populates the database.

```bash
>>> from blog.models import Article
>>> Article.objects.create(author_name="Ali",title="First app", content="Some detail of the article").save()`
```

You can add more data if you like.

Now run your server and go to your localhost([http://127.0.0.1:8000/](http://127.0.0.1:8000/)) then add the *id* of the article you just added, like this: [http://127.0.0.1:8000/1](http://127.0.0.1:8000/1), you’ll see that the article content is being displayed.

![display-blog.png](display-blog.png)

## How to Add Tests to Django Application

In this section I will show you how to add tests to your urls and models. Before you start testing the application you just created install the necessary libraries, you can install them with the code below:

```
(env)$ pip install pytest pytest-django
```

[Pytest-django](https://pytest-django.readthedocs.io/en/latest/) is a plugin built to make it easier for you to use Pytest with Django.

Next, create a file with name *pytest.ini* in the root at the root of your project. In the *pytest.ini* file you will put the path to the *settings.py* file of your project. In the *pytest.ini* file, paste the code below:

```
[pytest]
DJANGO_SETTINGS_MODULE = django_test_githubactions.settings
```

Next, create a test folder in the app directory where all your test files for that app will be, so you’ll create a new directory in the blog application, *blog/tests/*.

To start, we will test the *urls.py* file so you’ll create a new file in the test folder *blog/tests/test_urls.py*.
Note:
All test files must begin with *test_* because that is the convention when working with Pytest. 

Paste the code below in the *test_urls.py* file you just created.

```python
from django.urls import reverse, resolve
from django.urls import path

    class TestUrls: 
    # here you are checking if the path's view name is content
        def test_post_content_url(self):  
            path = reverse('content', kwargs={'pk':1})  
            assert resolve(path).view_name == "content"  # here you are checking if the path's view name is content 
```

Next, we will be testing the models, create a new file for it app/tests/test_models.py, and put the code below:

```python
import pytest  
    from app.models import Article  
    @pytest.mark.django_db  
    def test_article_create():
    # Create dummy data  
       article = Article.objects.create(  
       author_name="Muhammed Ali",  
       title="Simple article",  
       content="This is my content",  
       )  
    # Assert the dummy data saved as expected
       assert article.author_name=="Muhammed Ali"  
       assert article.title=="Simple article"  
       assert article.content=="This is my content"
```

To run the tests, go to your command line and run:

```bash
(env)$ python -m pytest
```

You should see something like the image below to show that all the tests passed:

![run-test.png](run-test.png)

## Setting up Docker

In this section you will learn how to use Docker and Docker compose to run your application. Assuming you have installed Docker and Docker compose on your local machine,  create a *Dockerfile* file at the root of your project. In the *Dockerfile* you'll put step-by-step instructions that will be used to build the Docker image.

The *Dockerfile* you just created should contain the code below:

```docker
FROM python:3.7-alpine

ENV PYTHONUNBUFFERED 1

COPY ./requirements.txt /requirements.txt
RUN pip install -r /requirements.txt

# make a directory in our Docker image in which we can use to store our source code
# Copy the project folder from our local machine to the docker image
RUN mkdir /project
WORKDIR /project

COPY . .
```

`FROM python:3.7-alpine` is the image you are going to inherit your Dockerfile from, it is usually the language you are using.

`ENV PYTHONUNBUFFERED 1`  is necessary so Docker doesn't buffer the output and that you can see the output of your application (e.g. Django logs) in real time.

`COPY ./requirements.txt /requirements.txt` copy the *requirements.txt* file adjacent to the *Dockerfile* file in your local machine for our Docker image *requirements.txt*.

`RUN pip install -r /requirements.txt` Install requirements.txt file in docker image

Next, create *requirements.txt* file at the root of your project, this file will contain will contain a list of all the dependencies we would like to install for the project. Paste the text below in the *requirements.txt* file.

```
asgiref==3.4.1
attrs==21.2.0
Django==3.2.7
pytest==6.2.5
pytest-django==4.4.0
python-dateutil==2.8.2
pytz==2021.1
six==1.16.0
sqlparse==0.4.1
```

## Setup Docker Compose

In this section you willl write the instruction in other to tell Docker how to run your application. At the root of your project, create *docker-compose.yml* file and add the following:

```yaml
version: "3"   # Verion of docker-compose we want to use
services:
  proj:
    build:
    # command that is used to run services
      context: . # builds the current directory
    # map port on local machine to port on docker image
    ports:
      - "8000:8000"
      
    volumes:
      - .:/project # Updates the image with new changes in the code
    command: >
      sh -c "python manage.py runserver 0.0.0.0:8000"
```

After that, go to your terminal and run `$ docker-compose build` to build our image using the docker-compose configuration.

Docker-compose runs at `0.0.0.0:8000` which is not recognized by Django so you need to add it to your `ALLOWED_HOSTS` in your *settings.py* file, like this:

`ALLOWED_HOSTS = ['0.0.0.0']`

Now run `$ docker-compose up` to start the server and go to [http://0.0.0.0:8000/1](http://0.0.0.0:8000/1) on your browser and you will see the blog you created.

![docker.png](docker.png)

## Setup GitHub Actions

[GitHub Actions](https://docs.github.com/en/actions) enables you to automate, customize specified development and deployment processes in your GitHub repository. In this tutorial it will just be used for automating Django tests, which is what you will be learning in this section.

### Some Terminology

1. Jobs: step-by-step instructions for an action.
2. Workflows: A workflow is a list of automated processes made up of one or more jobs that are configured on a YAML file.

### Activate GitHub Actions in your Project

On your text editor, navigate to the root of your project and create a directory named *.github/workflows* in there create *main.yml* file. The *main.yml* file will contain all the GitHub Actions commands.

In the *main.yml* file you just created, paste the code below

```yaml
name: test_project  
on:
  # activates the workflow when there is a push or pull request on the main branch
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]
jobs:  
  test_project: 
# the operating system your job will run on
     runs-on: ubuntu-latest  
     steps:  
       - uses: actions/checkout@v2  
       - uses: actions/setup-python@v2  
       - run: pip install -r requirements.txt  # install requirements to enable GitHub run our code
       - run: pytest . # run the unit test
```

The code above just runs tests on your latest push. You can visit the [GitHub docs](https://docs.github.com/en/actions/reference/workflow-syntax-for-github-actions) page to learn more about syntax.

## GitHub Actions at Work

Commit and push all the code you have at the moment to GitHub.

After pushing your code, go to your project on GitHub and click on the “Actions” tab. You’ll see that your GitHub Actions ran completely and that your application has been tested and all tests passed.

![github-actions.png](github-actions.png)

When you click on it you should see this:

![github-actions1.png](github-actions1.png)

To check if the intention of GitHub Actions is met you will update the test so it fails.

In the models test, change it to:

```python
def test_article_create():  
   article = Article.objects.create(  
   author_name="Muhammed Ali",  
   title="Simple article",  
   content="The article's content",  
   )  
   assert article.author_name=="Muhammed Al" # this will make sure the test fails  
   assert article.title=="Simple article"  
   assert article.content=="The article's content"
```

Commit and push your code. Go to your project Actions and you should see the test fails, to show that our GitHub Actions instructions are working as expected.

![fail-test.png](fail-test.png)

## Conclusion

In this tutorial, you learned how to write unit tests for Django application URL and models at the same time you were able to automate the process of running the tests when your application is pushed to GitHub.

In addition, you can add some linting tests to the workflow to improve the continuous integration of your application. Through my explanation and some research, doing that should be easy.

Hopefully, with this article, you can add some continuous delivery with GitHub Actions for your future projects.

The code for this tutorial can be found on [GitHub](https://github.com/khabdrick/Django-docker-actions).
