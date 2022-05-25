---
layout: engineering-education
status: publish
published: true
url: /django-backend-autopilot/
title: Best Autopilot Setup for Django Backend Development
description: This tutorial will help the reader understand the best practices for writing readable and maintainable Django code.
author: mercy-meave
date: 2022-05-25T00:00:00-03:15
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/django-backend-autopilot/hero.jpg
    alt: Best Autopilot setup for Django Backend Development Image
---
Most developers know how to write software in Django. However, only a few can write readable code.
<!--more-->
For this reason, we need to follow some of the conventional best practices to write code that is maintainable and readable.

This tutorial intends to bring the best practices for writing readable and maintainable Django code using several packages. 

Furthermore, we will utilize several libraries to automate testing, code formatting, automatic deployment, dependency management, and pre-commit hooks.

### Prerequisites
To follow along, you need:
- Django software development
- Knowledge of Python
- A code editor, most preferably VS Code or Pycharm

### Environmental setup
To get started, we need to set up the virtual environment where we will develop the project.

Use the command below to set up the virtual environment. This command will only execute if you have [virtualenv](https://pypi.org/project/virtualenv/) installed on your computer.

```bash
virtualenv venv
```

Next, we need to add a dependency manager. Usually, we use `pip` and the `requirememnts.txt` to manage our dependencies, but in this case, we will use a different library called `poetry`.

[Poetry](https://python-poetry.org/) is a packaging and dependency management tool that manages the project dependencies in a deterministic way. 

The problem with the `requirements.txt` file is that when we run `pip freeze > requirements.txt`, it gets filled with other packages that we do not need to specify explicitly. Besides, Poetry writes a poetry lock file which prevents the packages from self-updating.

To install Poetry, run the following command in your terminal:

```bash
curl -SSL https://raw.githubusercontent.com/python-poetry/poetry/master/get-poetry.py | python -
```

After a successful installation, execute the command below to kickstart the project with Poetry:

```bash
poetry init
```

Fill in the required prompts or press enter to continue with the defaults. The step generates a `project.toml` file like the one shown below:

```toml
[tool.poetry]
name = "Django Autopilot Article"
version = "0.1.0"
description = "This is a project to showcase how to write clean and readable django code, with automated testing and formating using pre-commit hooks."
authors = ["Mercy Meave <mercymeave@gmail.com>"]
license = "MIT"

[tool.poetry.dependencies]
python = "^3.8"

[tool.poetry.dev-dependencies]

[build-system]
requires = ["poetry-core>=1.0.0"]
build-backend = "poetry.core.masonry.api"
```

### Installing project dependencies
Now that we have poetry set up, we can install any dependency we need for the project. Let's start by installing Django.

```bash
poetry add Django
```

![Installing Django](/engineering-education/django-backend-autopilot/django-install.png)

We will install other dependencies the same way as we proceed with the article.

### Starting the Django project
This section will create the Django project and a single application in the project. Execute the command below to start a Django project.

```bash
Django-admin startproject config
``` 

I prefer calling this project `config` because it mainly contains the configuration files for the Django project; not much code is written in that folder.

Next, we need to create a REST API application that allows users to create posts and view them in JSON format. This application will be entirely back-end-based. Therefore, we will not have templates.

Run the command below to start the application:

```bash
python manage.py startapp posts
```

By now, the project folders should be as shown below:

![Project folders](/engineering-education/django-backend-autopilot/project-folders.png)

### Setting up the REST Framework
Django REST framework is a toolkit used to build APIs with ease. It provides classes for data serialization, making it easy to convert Python data classes into JSON data objects.

To install the Django REST framework, run the following command:

```bash
poetry add djangorestframework
```

Then, head over to the `settings.py` file in the `config` folder; under the installed apps section, add the following line of code:

```py
INSTALLED_APPS = [

    #Third party apps
    "rest_framework",
]
```

### Working on the application
We will create the models, serializers, views, and URLs. The models are data classes that specify how we store data in the database. In the `models.py` folder, add the code below:

```py
class Post(models.Model):
    title = models.CharField(max_length=20)
    content = models.CharField(max_length=255)
    date = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return self.title
```

Serializers convert the data classes represented by the models into JSON data objects. Create a file in the `posts` folder called `serializers.py`, then add the snippets below:

```py
from rest_framework import serializers
from posts.models import Post

class PostSerializers(serializers.ModelSerializer):
    """ A post serializer to serializer the post model"""
    class Meta:
        model = Post
        fields = "__all__"
```

The `views.py`  files specify the function to be executed when a specific URL is visited. For example, in the `views.py` file, add the snippet below:

```py
from rest_framework import viewsets

from config.posts.models import Post
from config.posts.serializers import PostSerializer


class PostViewSet(viewsets.ModelViewSet):
    """A viewset to show, edit, delete and update posts"""
    queryset = Post.objects.all()
    serializer_class = PostSerializer
```

The `urls.py` is where we specify what resource to access when a given url is visited. In the `urls.py` file existing in the `config` folder, add the following code:

```py
from django.contrib import admin
from django.URLs import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('posts', include('posts.urls'))
]
```

Then, create a new file in the `posts` folder called `urls.py` and add the snippets below:

```py
from Django.URLs import path, include
from rest_framework import routers

from .views import PostViewSet

router = routers.DefaultRouter()
router.register(r'posts', PostViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
```

Next, we need to create and run our migrations to create tables in the database:

```bash
python manage.py makemigrations && python manage.py migrate
```

Run the server using the command `python manage.py runserver`, then head to the http://127.0.0.1:8000/ link to check if everything worked correctly.

![Running the project](/engineering-education/django-backend-autopilot/running-the-project.png)

### Setting up the automation
To get started, we need to know what we want to automate. Then, we should set up an application such that the code is automatically tested and formatted for every commit made. 

This setup is done using `pre-commit`. So first, we need to install `pre-commit` into our application using `poetry` as a development dependency.

```bash
poetry add pre-commit --dev
```

Next, we create a pre-commit configuration that defines what should be done before an actual commit. This setup is called pre-commit hooks.

Create a file called `.pre-commit-config.yaml`, then paste the following code into it:

```yaml
repos:
-   repo: https://github.com/pre-commit/pre-commit-hooks
    rev: v2.3.0
    hooks:
    -   id: check-yaml
    -   id: end-of-file-fixer
    -   id: trailing-whitespace
    -   id: check-merge-conflict
    -   id: check-added-large-files
    -   id: check-docstring-first
```

Next, we need to set up pre-commit to run on git hook scripts so that it runs on `git commit`.

```bash
pre-commit install
```

Note that the above command only runs after initializing a git repository for the project.

```bash
pre-commit installed at .git/hooks/pre-commit
```

#### Code formatting
To set up automated code formatting, we need to install [black](https://black.readthedocs.io/en/stable/), making code review faster.

To install *black*, execute the command below in the terminal:

```bash
poetry add black
```

*Black* comes with automated configurations, but we can modify them according to our needs. However, the default settings are the best since they align with [PEP8](https://peps.python.org/pep-0008/) standards.

Since I prefer having the length of my lines of code as 100, that's the only change I will make in the configurations.

```yaml
-   repo: https://github.com/psf/black
    rev: 22.1.0
    hooks:
    -   id: black
        args: [--line-length=100]
```

#### Flake8 Testing
*Flake8* will take care of testing and code pre-checks. In addition, it eliminates identified errors and unused imports, functions, and variables contributing to a cleaner code. To install *flake8* execute the command below:

```bash
poetry add flake8
```

Next, to automate *flake8* so that it is triggered every time we make a commit, we add it as a hook to the pre-commit, as shown below:

```yaml
-   repo: https://gitlab.com/pycqa/flake8
    rev: 3.7.9
    hooks:
    -   id: flake8
        args: [--max-line-length=120, count = True]
```

*Flake8* also has a line length defined by default. To avoid collision with the black settings, we defined the line length as similar to that of *black*.

Many hooks can be added to the file depending on the developer's needs. You can find more hooks [here.](https://pre-commit.com/hooks.html)

![Passed formatting and local testing](/engineering-education/django-backend-autopilot/passed-tests.png)

### Automation with Github actions
Github Actions allow developers to automate most workflows for their projects. It is a form of CI/CD where one can automatically build, test and deploy his code.

To set up GitHub actions, create a folder called `.github` in the application's root directory. Then, create another folder named `workflows` in the created folder where we will set up our workflows.

Create a new file called `automated-testing-workflow.yaml`, then add the snippets below:

```yaml
# Testing automation name
name: Django Copilot App Backend Testing

# Action on which to ruin the tests
on: [push, pull_request]

jobs:
  Build:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        python-version: ['3.8', '3,9', '3.10']

``` 

The code above specifies the test, the platform on which the code is to be executed, and the Python version.

Next, we need to check out the repository and set up Python versions onto which we run the tests.

```yaml
    steps:
      #  Checkout the repo and set-up python
      - name: Check out the repository
        uses: actions/checkout@v1
      - name: Set up Python
        uses: actions/setup-python@v1
        with:
          python-version: ${{ matrix.python-version }}
          run: |
            pip install --upgrade pip
            python -m venv env
            source env/bin/activate
            echo "VIRTUAL ENV:" $VIRTUAL_ENV
```

Next, we have to set up the *flake8* testing. Although we did this locally, we have to assume that the developer did not do any test, so before a pull request is merged, we perform the same test we did locally.

```yaml
# Install poetry
- name: Install Poetry in the Virtual Environment
run: |
    pip install -U pip
    pip install poetry

# Installing project dependencies
- name: Install Dependencies
run: poetry install

# Testing with Flake8
- name: Run Tests With Flake
run: poetry run flake8
```

When we run a commit, all the above operations are automatically performed on our code before the code is committed to GitHub.

![Automatic Code Testing with GitHub actions](/engineering-education/django-backend-autopilot/testing-with-github-actions.png)

### Conclusion
This article discussed some of the best practices required while writing code, especially in Django. We set up project management with Poetry to ensure that our dependencies are deterministically managed and locked from a self-update.

We went further and set up automated code formatting using Black. This tool formats our code in a readable manner. Together with Flake8 testing, Black ensures that code is written according to PEP8 standards.

Lastly, we hooked up everything into a pre-commit such that all the testing and formatting are automated for every commit made to the repository. 

You can find the code for the application in [this link.](https://github.com/mercymeave/django-app-autopilot)

---
Peer Review Contributions by: [Jerim Kaura](/engineering-education/authors/jerim-kaura/)