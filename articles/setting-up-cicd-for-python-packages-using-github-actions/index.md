# Setting up CI/CD for Python Packages using GitHub Actions

When building Python packages or any Python project, being able to test code and deploy to production faster is an attribute of a fast-paced development environment.
After each bug fix, users expect to see the effect on their local software and this is an attribute of Continuous Integration and Continuous Deployment.

In this article, we will cover what CI/CD is, build a python package that informs us of the time in various timezones.
Then we cover working with the Test Python Package Index and GitHub Actions. The outline below shows a bit more information about the article.

### Outline

- [Prerequisites](#prerequisites)
- [What is CI/CD](#what-is-cicd)
- [Building a Python Package](#building-a-python-package)
- [Authenticating GitHub with Test PyPI](#authenticating-github-with-test-pypi)
- [Packaging & Deploying with GitHub Actions](#packaging-deploying-with-github-actions)
- [Testing Python Package Locally](#testing-python-package-locally)
- [Conclusion](#conclusion)

### Prerequisites

- Understanding of Git and GitHub.
- Creating a GitHub repository.
- Creating a Test PyPI account.
- Understanding how to [Build Python Packages](/engineering-education/building-a-python-package-and-publishing-on-pypi/).

### What is CI/CD

CI/CD comprises three phrases: continuous integration, continuous delivery, and continuous deployment. These phrases seem similar but are of different meanings and implementations. Yet, they are very important to the software development life-cycle.

#### Continuous Integration

Continuous Integration is a set of practices that enable development teams to integrate code into version control repositories regularly.
> It’s a primary DevOps best practice, allowing developers to frequently merge code changes into a central repository where builds and tests then run.

#### Continuous Delivery

Continuous delivery is a software development practice where release to production is done automatically after a code changes.

#### Continuous Deployment

Continuous Deployment (CD) is a software release process that uses automated testing to validate if changes to a codebase are correct and stable for immediate autonomous deployment to a production environment.

This [Amazon](https://aws.amazon.com/devops/continuous-delivery/) blog explains in details the difference between these three.

### Building a Python Package

We will attempt to build a basic Python package that tells a user the time in another time zone and works on the command line. The code for this project is in [this repository](https://github.com/edeediong/timezone_checker).

#### Application Logic

To build our basic python package, we need two components, namely a `setup.py` file and an `src` folder containing our package logic. Let's start with the `src` folder: it should contain three files, namely `__init__.py`, `logic.py` and `main.py`.

Copy and paste the following code snippet into `logic.py`.

```python
from datetime import datetime
import pytz

def area(location):
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

1. The `logic.py` uses the Python package *pytz* to understand the different time zones as it comes with the time zones in-built. We wrap the various functions in this file around *pytz* and its in-built functions. We also format some of the results to fit our end goal, a CLI for time zones.
2. The `main.py` is where the magic happens as we build and design our CLI. The *click* library is used to build CLIs in Python (similar to *typer*, *fire*, and the in-built *argparse*). This library has functions that wrap around our previously created functions in `logic.py` to interface directly with a user on the command line.
3. The `__init__.py` enables the `src` folder to be seen as a module as we imported some functions from `logic.py` into `main.py`.

### Packaging Code

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
        description="An aplication that informs you of the time in different locations and timezones",
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

This file contains the information or metadata for the python package we built. On the command line, we will call it using the command `timechecker` as defined in `entry_point` of *setup.py.*

Below is the directory structure after creating the above file structure:

```bash
    ├── LICENSE
    ├── README.md
    ├── setup.py
    ├── src
          ├── __init__.py
          ├── logic.py
          └── main.py
```

## Authenticating GitHub with Test PyPI

Let's create a credential for GitHub Action to communicate with Test PyPI. Follow the instructions below:

1. Go to [https://test.pypi.org/manage/account/#api-tokens](https://test.pypi.org/manage/account/#api-tokens) and create a new [API token](https://pypi.org/help/#apitoken). If you have the project on Test PyPI already, limit the token scope to just that project. You can call it something like `GitHub Actions CI/CD — project-org/project-repo` in order for it to be easily distinguishable in the token list. **Don’t close the page just yet — you won’t see that token again.**
2. In a separate browser tab or window, go to the `Settings` tab of your target repository and then click on [Secrets](https://help.github.com/en/articles/virtual-environments-for-github-actions#creating-and-using-secrets-encrypted-variables) in the left sidebar.
3. Create a new secret called `TEST_PYPI_PASSWORD` and copy-paste the token from the first step.

**Attention**

If you don’t have a TestPyPI account, you’ll need to create it. It’s not the same as a regular PyPI account.

## Packaging & Deploying with GitHub Actions

Execute the following steps to package the application with GitHub Actions:

1. In your repository, create the `.github/workflows/` directory to store your workflow files.
2. In the `.github/workflows/` directory, create a new file called `python-package.yml` and add the following code:

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
            - name: Set up Python 3.7
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
                # exit-zero treats all errors as warnings. The GitHub editor is 127 chars wide
                flake8 . --count --exit-zero --max-complexity=10 --max-line-length=127 --statistics
            - name: Build binary wheel and a source tarball
            run: python setup.py sdist
            - name: Publish distribution to Test PyPI
            uses: pypa/gh-action-pypi-publish@master
            with:
                password: ${{ secrets.test_pypi_password }}
                repository_url: https://test.pypi.org/legacy/
    ```

Few things to note about the above workflow:

1. We have just a single `build-n-publish` job which runs on `ubuntu-18.04`.
2. Then, we checkout the project into the ubuntu environment and setup our python distribution (Python 3.7)
3. Then, we install dependencies needed for the package and test it against a `flake8` linter.
4. Once done, we will produce a source distribution from the packages coded. We do this using the `python [setup.py](http://setup.py) sdist` command.
5. The last step uses `pypa/gh-action-pypi-publish` GitHub Action to upload contents of the dist/ folder into TestPyPI unconditionally.  It also used the secrets declared and defined in the previous section.

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

Once this is achieved, push the code to the repository. Then navigate to the **Actions** tab and see something similar to the screenshot below:

![actions.png](/engineering-education/setting-up-cicd-for-python-packages-using-github-actions/actions.png)

### Things To Note

- If you're facing *"the user <username> is not allowed...",* change the name of the package in `[setup.py](http://setup.py)` to `<username>_timechecker`.
- If you face an indentation error, in the pipeline, follow the error on the line flagged and try to fix the indentation error. This is part of CI/CD.

## Testing Python Package Locally

To test the package locally, execute the following command locally:

```bash
pip install -i https://test.pypi.org/simple/ timechecker
timechecker --location Algiers
timechecker --zone EST
```

## Conclusion

At the end of this tutorial, we have built a python application, packaged it in GitHub Action, and deployed it to Test PyPI using GitHub Actions. I hope this guide helps anyone in the future when building their Python packages and wanting to push them using GitHub Actions.
