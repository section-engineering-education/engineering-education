---
layout: engineering-education
status: publish
published: true
url: /setting-up-cicd-for-python-packages-using-github-actions/
title: Setting up CI/CD for Python Packages using GitHub Actions
description: This article will provide an overview what CI/CD is, build a Python package to inform time in various timezones and deploy the package via GitHub Actions.
author: edidiong-etuk
date: 2021-03-18T00:00:00-14:00
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/setting-up-cicd-for-python-packages-using-github-actions/hero.png
    alt: GitHub Actions hero image
---
When building Python packages or any Python project, being able to test code and deploy to production faster is an attribute of a fast-paced development environment. After each bug fix, users expect to see the effect on their local software, and this is an attribute of Continuous Integration and Continuous Deployment.
<!--more-->
In this article, we will cover what Continuous Integration and Continuous Deployment (CI/CD) is, build a python package that informs us of the time in various time zones.

We will also cover working with the Test Python Package Index and GitHub Actions. The list below outlines a bit more information about the article.

### Outline
- [Prerequisites](#prerequisites)
- [What is CI/CD?](#what-is-cicd)
- [Building a Python Package](#building-a-python-package)
- [Authenticating GitHub with Test PyPI](#authenticating-github-with-test-pypi)
- [Packaging & Deploying with GitHub Actions](#packaging-deploying-with-github-actions)
- [Testing Python Package Locally](#testing-python-package-locally)
- [Conclusion](#conclusion)

### Prerequisites
- Understanding of Git and GitHub.
- Creating a GitHub repository.
- Creating a Test PyPI account.
- Understanding how to [build Python packages](/building-a-python-package-and-publishing-on-pypi/).

### What is CI/CD?
CI/CD is a practice used by organizations to ship applications to customers faster and without common errors.

There are three major phrases when talking about CI/CD namely:
1. Continuous Integration,
2. Continuous Delivery, and
3. Continuous Deployment.
  
These phrases seem similar but are of different meanings and implementations. Yet, they are very important to the software development life-cycle.

#### Continuous Integration
Continuous Integration is a set of practices that enable development teams to integrate code into version control repositories regularly.

It's an important DevOps (Development Operations) practice that allows developers to merge code changes regularly and ensure the execution of builds/tests against the code. We merge this code changes into a central repository.

#### Continuous Delivery
Continuous delivery is a software development practice where code changes are prepared to be released after being built and tested. These builds are automatically pushed to testing/production after a code changes.

#### Continuous Deployment
[Continuous Deployment (CD)](https://en.wikipedia.org/wiki/Continuous_delivery) is a software release process that uses automated testing to validate if changes to a codebase are correct and stable for immediate autonomous deployment to a production environment.

This blog by [Amazon](https://aws.amazon.com/devops/continuous-delivery/) explains in details the difference between these three.

### Building a Python Package
#### Objective
We will attempt to build a basic Python package that tells a user the time in another time zone and works on the command line. The code for this project is in [this repository](https://github.com/edeediong/timezone_checker).

#### Application logic
To build our basic Python package, we need two components, namely a `setup.py` file and an `src` folder containing our package logic.

Let's start with the `src` folder: it should contain three files, namely `__init__.py`, `logic.py`, and `main.py`.

Copy and paste the following code snippet into `logic.py`.

```python
from datetime import datetime
import pytz

def area(location):
    """This function takes in a location as argument, checks the list of locations available and returns the formatted time to the user."""
    location = format_location(location)
    for areas in pytz.all_timezones:
        if location.lower() in areas.lower():
            location = areas
            tz = pytz.timezone(location)
            date_now = datetime.now(tz)
            formatted_date = date_now.strftime("%B %d, %Y %H:%M:%S")
            print(f"{location} time: ", formatted_date)
            break

    else:
        print("This location isn't on the tz database on Wikipedia")

def area_zone(zone):
    """This function takes in a time zone as argument, checks the list of timezones and returns the formatted time to the user."""
    try:
        zone = timezones(zone)
        tz = pytz.timezone(zone)
        date_now = datetime.now(tz)
        formatted_date = date_now.strftime("%B %d, %Y %H:%M:%S")
        print(f"{zone} time: ", formatted_date)

    except Exception:
        print("Timezone is not on the list. Consider using location instead.")

def timezones(zone):
    """This function is used to handle situations of Daylight Saving Time that the standard library can't recognize."""
    zones = {
        "PDT": "PST8PDT",
        "MDT": "MST7MDT",
        "EDT": "EST5EDT",
        "CDT": "CST6CDT",
        "WAT": "Etc/GMT+1",
        "ACT": "Australia/ACT",
        "AST": "Atlantic/Bermuda",
        "CAT": "Africa/Johannesburg",
    }

    try:
        zones[zone]

    except:
        return zone
    return zones[zone]

def format_location(location):
    location = location.replace(" ", "_")
    return location
```

Next we copy the following code snippet into `main.py`.

```python
import click
from src.logic import area, area_zone

@click.command()
@click.option(
    "--location",
    help="This specifies the location you want to know the time. For example, Lagos or London",
)
@click.option(
    "--zone",
    help="The timezone information you need. Ensure it is properly capitalized, for example CET or WAT",
)
def main(location, zone):
    if location:
        area(location)
    if zone:
        area_zone(zone)

if __name__ == "__main__":
    main()
```

We leave the `__init__.py` empty.

**Important things to note:**
1. The `logic.py` uses the Python package `pytz` to understand the different time zones as it comes with the time zones in-built. We wrap the various functions in this file around `pytz` and its in-built functions. We also format some of the results to fit our end goal, a CLI for time zones.
2. The `main.py` is where the magic happens as we build and design our CLI. The `click` library is used to build CLIs in Python (similar to `typer`, `fire`, and the in-built `argparse`). This library has functions that wrap around our previously created functions in `logic.py` to interface directly with a user on the command line.
3. The `__init__.py` enables the `src` folder to be seen as a module as we imported some functions from `logic.py` into `main.py`.

### Packaging code
Once we're done with the application logic, we package our application to work locally on our machines. First, let's create a `setup.py` file in the top-level directory.

Then, fill the file with the contents in the code snippet below:

```python
from setuptools import setup, find_packages

setup(
    name="timechecker",
    version="0.0.1",
    author="Edidiong Etuk",
    author_email="edeediong@gmail.com",
    url="https://bit.ly/edeediong-resume",
    description="An application that informs you of the time in different locations and timezones",
    packages=find_packages(),
    classifiers=[
        "Programming Language :: Python :: 3",
        "License :: OSI Approved :: MIT License",
        "Operating System :: OS Independent",
    ],
    install_requires=["click", "pytz"],
    entry_points={"console_scripts": ["timechecker = src.main:main"]},
)
```

This file contains the information or metadata for the Python package we built. On the command line, we will call it using the command `timechecker` as defined in `entry_point` of *setup.py.*

Below is the directory structure after creating the file structure above:

```bash
├── LICENSE
├── README.md
├── setup.py
├── src
      ├── __init__.py
      ├── logic.py
      └── main.py
```

### Authenticating GitHub with Test PyPI
Following the guide on the official [Python documentation](http://packaging.python.org/guides/publishing-package-distribution-releases-using-github-actions-ci-cd-workflows.html), let's create a credential for GitHub Action to communicate with Test PyPI. 

Follow the instructions below:
1. Go to [https://test.pypi.org/manage/account/#api-tokens](https://test.pypi.org/manage/account/#api-tokens) and create a new [API token](https://pypi.org/help/#apitoken). If you have the project on Test PyPI already, limit the token scope to just that project. Name it something unique in order for it to be distinct in the token list. Finally, COPY the token.
2. In a separate browser tab or window, go to the `Settings` tab of your target repository and then click on `Secrets` in the left sidebar.
3. Create a new secret called `TEST_PYPI_PASSWORD` and PASTE the token from the first step.

**Attention**

You'll need to create a Test PyPI account if you don't have one already as it is different from the standard PyPI account.

### Packaging & deploying with GitHub Actions
Execute the following steps to package the application with GitHub Actions:
1. Create the `.github/workflows/` directory in your repository to store your workflow files.
2. Create a new file called `python-package.yml` in the `.github/workflows/` directory and add the following code:

```yaml
name: Publish Python distributions to PyPI and TestPyPI

on:
    push:
    branches: [ master ]
    pull_request:
    branches: [ master ]

jobs:
    build-n-publish:
    name: Build and publish Python distribution
    runs-on: ubuntu-18.04
    steps:
        - uses: actions/checkout@master
        - name: Initialize Python 3.7
        uses: actions/setup-python@v1
        with:
            python-version: 3.7
        - name: Install dependencies
        run: |
            python -m pip install --upgrade pip
            pip install flake8
        - name: Lint with flake8
        run: |
            # stop the build if there are Python syntax errors or undefined names
            flake8 . --count --select=E9,F63,F7,F82 --show-source --statistics
            # exit-zero treats all errors as warnings.
            flake8 . --count --exit-zero --max-complexity=10 --max-line-length=127 --statistics
        - name: Build binary wheel and a source tarball
        run: python setup.py sdist
        - name: Publish distribution to Test PyPI
        uses: pypa/gh-action-pypi-publish@master
        with:
            password: ${{ secrets.test_pypi_password }}
            repository_url: https://test.pypi.org/legacy/
```

Few things to note about the workflow above:
1. We have just a single `build-n-publish` job which runs on `ubuntu-18.04`.
2. Then, we checkout the project into the Ubuntu environment and setup our Python distribution (Python 3.7)
3. Then, we install dependencies needed for the package and test it against a `flake8` linter.
4. Next, create a source distribution. We do this using the `python setup.py sdist` command.
5. The last step uses `pypa/gh-action-pypi-publish` GitHub Action to upload contents of the dist/ folder into TestPyPI unconditionally. It also used the secrets declared and defined in the previous section.

Below is the final directory structure:

```bash
.
├── .github
│   └── workflows
│       └── python-package.yml
├── .gitignore
├── LICENSE
├── README.md
├── setup.py
└── src
    ├── __init__.py
    ├── logic.py
    └── main.py
```

Once this is achieved, push the code to the repository. Then navigate to the `Actions` tab and see something similar to the screenshot below:

![actions.png](/engineering-education/setting-up-cicd-for-python-packages-using-github-actions/actions.png)

#### Things to note
- If you're facing *"the user <username> is not allowed...",* change the name of the package in `setup.py` to `<username>_timechecker`.
- If you face an indentation error, in the pipeline, follow the error on the line flagged and try to fix the indentation error. This is part of CI/CD.

### Testing Python package locally
To test the package locally, execute the following command locally:

```bash
pip install -i https://test.pypi.org/simple/ timechecker
timechecker --location Algiers
timechecker --zone EST
```

### Conclusion
In this tutorial, we've seen what continuous integration, delivery and deployment are. We then built a Python package to detect the time in a particular timezone. We've also seen how to package a Python application and a Test repository that doesn't affect the general Python index.

This article aimed to introduce you to CI/CD with Python packages, and an example that builds on this introduction. We used GitHub Actions to achieve our said objectives and ensured the entire pipeline works as developed.

The source code for this repository can be found on [GitHub](https://github.com/edeediong/timezone_checker).

Happy building!

### Further reading
- [Introduction to GitHub Actions](/github-actions/)
- [How to Build a Python Package?](https://edeediong.me/how-to-build-a-python-package)

---
Peer Review Contributions by: [Srishilesh P S](/engineering-education/authors/srishilesh-p-s/)