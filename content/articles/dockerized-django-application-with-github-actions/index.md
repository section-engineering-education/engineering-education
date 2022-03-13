---
layout: engineering-education
status: publish
published: true
url: /dockerized-django-application-with-github-actions/
title: Automating Tests for Dockerized Django Applications with GitHub Actions
description: In this article, the reader will learn how to test a Django application with Pytest, dockerize it, and configure GitHub Actions to automate your Django tests.
author: muhammed-ali
date: 2021-11-26T00:00:00-19:10
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/dockerized-django-application-with-github-actions/hero.jpg
    alt: Automating tests for Dockerized django application Image
---
In this article, the reader will learn how to test a Django application with [Pytest](https://docs.pytest.org/en/stable/getting-started.html), dockerize it, and configure GitHub Actions to automate your Django tests.
<!--more-->
Pytest is a Python library used for running tests for Python code. [GitHub Actions](https://docs.github.com/en/actions) enables you can automate much repetitive tasks in your repository.

Docker ensures your application works the same way on all platforms. Adding these functionalities to your application can make it easier for [continuous delivery](https://en.wikipedia.org/wiki/Continuous_delivery) and collaboration.

### Prerequisites
The reader should have the following to follow along with this tutorial:
1. A good understanding of Django.
2. Using Git/GitHub.
3. [Docker](https://docs.docker.com/get-docker/) and [Docker compose](https://docs.docker.com/compose/install/) installed.

### Building a base Django app
Let us build the project that we will be using for this tutorial. We will create a new virtual environment for the project, which will come in handy when trying to get a list of all the dependencies.

After creating the virtual environment, install Django with the following command executed in the terminal.

```bash
(env)$ pip install django
```

Run the command below to create a new project:

```bash
(env)$ django-admin startproject <name_of_project>
```

For instance, if the name of your application is `django_test_githubactions`, use that name in the command.

```bash
(env)$ django-admin startproject django_test_githubactions
```

`cd` into the directory that contains *manage.py* and execute the command below to initialize the Django application:

```bash
(env)$ python manage.py startapp blog
```

Add `blog` application to the list of the installed application in the `settings.py` file. This step enables Django to recognize it as a sub-application to the main application. 

```python
INSTALLED_APPS = [
"blog",  #new

]
```

We will be building a blog application for this demostration, so in the `*`blog/models.py` file and paste the code snippet below:

```python
from django.db import models
    
    class Article(models.Model):  
       author_name = models.CharField(max_length=30)  
       title = models.CharField(max_length=20)  
       content = models.CharField(max_length=200)  
       def __str__(self):  
           return self.title
```

Next, we have to write the logic to display the content. To do this, navigate to `app/views.py`. Then, add the code snippet below in that file.

```python
from django.shortcuts import get_object_or_404, render
from .models import Article
def content_view(request, pk):
   post = get_object_or_404(Article, pk=pk)
   return render(request, "blog/article.html", {'post':post})
```

Next, update your `urls.py` file with the code below to access that route in the browser.

```python

from blog import views 

urlpatterns = [  
    path('<int:pk>', views.content_view, name="content")
]
```

Next, create a `templates` folder in the app directory to hold the template to display the blog content. 

Navigate to your app folder and create `templates/blog/article.html` and paste the code below:

```html
Blog title:  
    {% if post.content %}  
    {{ post.content }}  
    {% endif %}
```

Migrate the `models` to start adding articles to the database. To do this, go to your terminal/command prompt and run:

```bash
(env)$ python manage.py makemigrations
```

Then run:

```bash
(env)$ python manage.py migrate
```

### Populate the database
We need to populate our database to know whether our application is working as expected. To populate the database, go to your terminal and type the instructions below to go into the Django shell:

```bash
(env)$ python manage.py shell
```

Then run the code below one after the other; the second line adds a single record to the database and saves it. You can use the same format to add more data.

```bash
>>> from blog.models import Article
>>> Article.objects.create(author_name="Ali",title="First app", content="Some detail of the article").save()`
```

Now run your server and go to your localhost([http://127.0.0.1:8000/](http://127.0.0.1:8000/)) then add the *id* of the article you just added, like this: [http://127.0.0.1:8000/1](http://127.0.0.1:8000/1), you will see that the article content is being displayed.

![display-blog.png](/engineering-education/dockerized-django-application-with-github-actions/display-blog.png)

### How to add tests to Django application
This section will show you how to add tests to your URLs and models. Before testing the application, execute the command below to install the testing library.

```bash
(env)$ pip install pytest pytest-django
```

[Pytest-django](https://pytest-django.readthedocs.io/en/latest/) is a plugin built to make it easier for you to use Pytest with Django.

Next, create a file with the name `pytest.ini` at the root of your project. In the `pytest.ini` file, you will put the path to your project's `settings.py` file. 

In the `pytest.ini` file, paste the code below:

```python
[pytest]
DJANGO_SETTINGS_MODULE = django_test_githubactions.settings
```

Next, create a test folder in the app directory where all your test files for that app will be stored. You will create a new directory in the blog application, `blog/tests/`.

To start, we will test the `urls.py` file, so you will create a new file in the test folder `blog/tests/test_urls.py`.

>All test files must begin with `test_` because that is the convention used with Pytest. 

Paste the code below in the `test_urls.py` file you just created.

```python
from django.urls import reverse, resolve
from django.urls import path

    class TestUrls: 
    # here, you are checking if the path's view name is content
        def test_post_content_url(self):  
            path = reverse('content', kwargs={'pk':1})  
            assert resolve(path).view_name == "content"  # here you are checking if the path's view name is content 
```

Next, we will be testing the models, create a new file for it `app/tests/test_models.py`, and add the code snippet below:

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

You should see a similar process like the image below to show that all the tests passed:

![run-test.png](/engineering-education/dockerized-django-application-with-github-actions/run-test.png)

### Setting up Docker
This section helps you learn how to use Docker and Docker compose to run your application. Assuming you have installed Docker and Docker compose on your local machine, create a `Dockerfile` file at the root of your project. In the `Dockerfile`, you will put step-by-step instructions that will be used to build the Docker image.

The `Dockerfile` you just created should contain the code below:

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

`FROM python:3.7-alpine` is the image you will inherit your Dockerfile from. It is usually the language you are using.

`ENV PYTHONUNBUFFERED 1` is necessary, so Docker does not buffer the output and that you can see the output of your application (e.g., Django logs) in real-time.

`COPY ./requirements.txt /requirements.txt` copies the *requirements.txt* file adjacent to the *Dockerfile* file in your local machine for our Docker image *requirements.txt*.

`RUN pip install -r /requirements.txt` installs requirements.txt file in the docker image.

Next, create a `requirements.txt` file at the root of your project. This file will contain a list of all the dependencies we would like to install for the project. 

Paste the text below in the `requirements.txt` file.

```txt
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

### Setup Docker Compose
In this section, you will write the instruction to tell Docker how to run your application.  First, at the root of your project, create a `docker-compose.yml` file and add the lines of code.

```yaml
version: "3"   # Verion of docker-compose we want to use
services:
  proj:
    build:
    # command that is used to run services
      context: . # builds the current directory
    # map port on local machine to port on the docker image
    ports:
      - "8000:8000"
      
    volumes:
      - .:/project # Updates the image with new changes in the code
    command: >
      sh -c "python manage.py runserver 0.0.0.0:8000"
```

After that, go to your terminal and run `$ docker-compose build` to build our image using the docker-compose configuration.

Docker-compose runs at `0.0.0.0:8000` which Django does not recognize, so you need to add it to your `ALLOWED_HOSTS` in your `settings.py` file, like this:

```py
`ALLOWED_HOSTS = ['0.0.0.0']`
```

Now run `$ docker-compose up` to start the server and go to [http://0.0.0.0:8000/1](http://0.0.0.0:8000/1) on your browser, and you will see the blog you created.

![docker.png](/engineering-education/dockerized-django-application-with-github-actions/docker.png)

### Setup GitHub Actions
[GitHub Actions](https://docs.github.com/en/actions) enables you to automate, customize specified development, and deployment processes in your GitHub repository. 

### Terminologies
1. Jobs: Step-by-step instructions for action.
2. Workflows: A workflow is a list of automated processes of one or more jobs configured on a YAML file.

### Activate GitHub Actions in your Project
On your text editor, navigate to the root of your project and create a directory named `.github/workflows` in there, create a file named `main.yml` f. The `main.yml` file will contain all the GitHub Actions commands.

Paste the code below in the `main.yml` file you just created.

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

### GitHub Actions at work
Commit and push all the code you have at the moment to GitHub. After pushing your code, go to your project on GitHub and click on the “Actions” tab.  If you followed the steps correctly, you should see that your GitHub Actions ran completely and that your application has been tested and all tests passed.

![github-actions.png](/engineering-education/dockerized-django-application-with-github-actions/github-actions.png)

When you click on it, you should see this:

![github-actions1.png](/engineering-education/dockerized-django-application-with-github-actions/github-actions1.png)

To check if the intention of GitHub Actions is met, you will update the test, so it fails.

In the models' test, change it to:

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

Commit and push your code. Then, go to your project Actions, and you should see the test fails to show that our GitHub Actions instructions are working as expected.

![fail-test.png](/engineering-education/dockerized-django-application-with-github-actions/fail-test.png)

### Conclusion
This tutorial taught you to write unit tests for Django application URLs and models. At the same time, you could automate the process of running the tests when your application is pushed to GitHub.

In addition, you can add some linting tests to the workflow to improve the continuous integration of your application.

Hopefully, you can add some continuous delivery with GitHub Actions for your future projects with this article.

The code for this tutorial can be found on [GitHub](https://github.com/khabdrick/Django-docker-actions).

Happy coding!

---
Peer Review Contributions by: [Jerim Kaura](/engineering-education/authors/jerim-kaura/)
