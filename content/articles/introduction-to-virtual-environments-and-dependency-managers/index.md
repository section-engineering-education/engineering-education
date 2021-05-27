---
layout: engineering-education
status: publish
published: true
url: /introduction-to-virtual-environments-and-dependency-managers/
title: Introduction to Python Virtual Environments and Dependency Managers
description: A beginner's guide to virtual environments and dependency managers in Python. We will look at five of the most used dependency managers in Python.
author: adhinga-fredrick
date: 2021-05-20T00:00:00-12:00
topics: [Languages]
excerpt_separator: <!--more-->
images:

- url: /engineering-education/introduction-to-virtual-environments-and-dependency-managers/hero.png
  alt: Python Virtual Environment example
---
Virtual environments. What are they and what are they used for? This article will be a beginner's guide to virtual environments and dependency managers in Python. We will also look at five of the most used dependency managers in Python.
<!--more-->
From the [Python documentation](https://docs.python.org/3/library/venv.html):
> A virtual environment is an isolated Python environment where a project's dependencies are installed in a different directory from those installed in the system’s default Python path and other virtual environments.

Dependency managers are tools that enable easy management of a project's dependencies.

#### The problems solved by virtual environments
1. Managing projects with different dependencies. For example, when one project requires `Django==2.6` but another project requires `Django==3.0.6`.
2. Installation of Python packages and libraries.
3. Dependency resolution. This is where you specify the requirements for a particular project's sub-dependency to avoid installation problems. 
4. Reproduction of environments. One machine can handling many projects in different environments.

### Prerequisites
This article assumes that the reader:
- Has some knowledge of Python programming language.
- Has Python installed on their machine.

### Overview
This article will look at the following most used virtual environments and dependency managers in Python, how to use them and their pros and cons.

1. [Venv](#1.-Venv)
2. [Virtualenv](#2.-Virtualenv)
3. [Pipenv](#3.-Pipenv)
4. [Conda](#4.-Conda)
5. [Poetry](#5.-Poetry)

### 1. Venv
[Venv](https://docs.python.org/3/library/venv.html) is a Python's module that is used to create light weight virtual environments. It is the default virtual environment module for **Python 3**. It is one of the easiest modules around for creating virtual environments.

#### Features
- Python 3's default virtual environment tool.
- It is a light weight module.
- Stores all dependencies in a Scripts folder or bin sub-folder (on linux).

#### Installation
Since Venv comes pre-installed in Python 3 or newer, there's no need to install it.

So, we will go ahead and create a virtual environment.

#### Creating a virtual environment
When working on Windows Command Prompt, use:

```bash
$ python3 -m venv venv
```

#### Activating the virtual environment
Before using the virtual environment, we need to activate it. This makes the current virtual environment you're working on to temporarily function as the default Python interpreter.

>**Tip**: Before activating your virtual environment, always make sure that you are working from your project's directory.

Activate your project's environment by running the following command:

```bash
$ cd venv\Scripts
$ activate.bat
```

On Windows PowerShell, use:

```bash
$ Activate.ps1
```

Once you've successfully activated your virtual environment, the path changes to something similar to the example below:

```bash
(venv) Project_path\venv\Scripts>
```

#### Configuring the virtual environment
After activating the virtual environment, you can now start installing modules and packages by using the great `pip install` command.

For example:

```bash
$ pip install Django
```

You can check the version of Pip you're using and directory with the following command:

```bash
$ pip -V
```

**Note**: It is a good practice to always work with a `requirements.txt` file for easy collaboration since it stores a list of all installed packages in your environment.

To create a `requirements.txt`, use:

```bash
$ python -m pip freeze > requirements.txt
```

#### Deactivating a virtual environment
After you finish with the environment, deactivate it by using:

```bash
$ deactivate.bat
```

#### Deleting the virtual environment
Since virtual environments are self-contained, when no longer needed, just delete the project's virtual environment directory (in this case `/venv` ).

#### 2. Virtualenv
**[Virtualenv](https://virtualenv.pypa.io/en/latest/)** is a third-party dependency manager tool used for creating and managing Python projects. It is the most used and most popular virtual environment module for the **Python 2**  language.

>**Note** virtual environments do not come as a native feature for Python 2.

#### The cons
- It cannot be upgraded using [pip](https://pip.pypa.io/en/stable/installing/).
- It cannot create and discover virtual environments for randomly installed Python versions.

#### Installation
In order to use Virtualenv, we first need to install it using the following command:

```bash
$ pip install virtualenv
```

#### Creating a virtual environment
To create a virtual environment, run the following command:

```bash
$ virtualenv venv
```

Use *venv* as the name of your project's virtual environment. To activate and deactivate the virtual environment, use the same commands as [Venv](#1.-Venv).

#### Installing dependencies
To install additional packages and libraries, use:

```bash
$ pip install <package name>
```

### 3. Pipenv
[Pipenv](https://pypi.org/project/pipenv/) is a package manager that is used to manage Python projects dependencies. It is good for the common typical workflow of using dependencies like `pip`, `requirements.txt`, etc. 

Under the hood, Pipenv generally combines the use of pip and Virtualenv into a simple command-line tool.

#### Features
1. It automatically creates and manages a virtual environment for your projects.
2. It generates the `Pipfile.lock` file which helps in deterministic builds.
3. It adds and removes packages from a Pipfile as you install and uninstall packages.
4. It automatically locates you project by looking for a `Pipfile`.
5. Provides insights into your dependency graph. Try `pipenv graph`.
6. Smooth development workflow by loading `.env` files.

#### Installation
Before we use Pipenv, let's first install it. Run the following command on a terminal. 

```bash
$ pip install pipenv
```

After running this, Pipenv will be installed on your machine. Here’s the part where we now say goodbye to `pip`. It has been a journey indeed!

#### Creating a virtual environment
After installation, we just need to install a Python module using Pipenv and **boom!**, we have a virtual environment.

```bash
$ pipenv install Django==2.0.13
```

The command above automatically creates a `Pipfile` and a `Pipfile.lock` file in your project's virtual environment. These files are where your project dependencies are saved. 

If you wish to change the dependencies, you could change the default `Pipenv` configurations.

#### Activating the virtual environment
After creating our virtual environment, we can activate it by running the command below in the project directory.

```bash
$ pipenv shell
```

#### Uninstalling packages
You can uninstall a package from your project by running the following command:

```bash
$ pipenv uninstall Django
```

Here, you don’t need to specify the package version. The package is also removed from the `Pipfile` and `Pipfile.lock` file. 

#### Deleting a virtual environment
For whatever reason you feel the need to remove a virtual environment, you can do that with Pipenv using the command below.

```bash
$ pipenv --rm
```

>**Note** that with Pipenv, you can specify the version of Python to use, using the command below:

```bash
$ pipenv --python path/to/python
```

>**Note**: You can get the specific Python version using [Pyenv](https://github.com/pyenv/pyenv).

### 4. Conda
**[Conda](https://conda.io/projects/conda/en/latest/index.html)** is a package management and environment management system that not only supports Python but also other languages like Ruby, Scala, R and C/C++. It is used to create, save, load and switch between environments in your local machine.

Conda comes pre-installed in [anaconda](https://www.anaconda.com/) and [miniconda](https://docs.conda.io/en/latest/miniconda.html).  

#### Features
- You can [share](https://conda.io/projects/conda/en/latest/user-guide/tasks/manage-environments.html#sharing-an-environment) environments.
- Finding and installing packages -  Since Conda is also an environment manager, you can set up another environment to run a different version of Python, without interfering with the environment that runs your usual version of Python.

#### Installation
Installing Conda is a bit different from other dependency managers. The easiest way to install it is by installing [Anaconda](https://docs.anaconda.com/anaconda/install/windows/) or [Miniconda](https://docs.conda.io/en/latest/miniconda.html) - a mini version of anaconda that contains only Conda and its dependencies.

### Creating an environment
To create a virtual environment using Conda, run the following command on a terminal.

```bash
$ conda create --venv
```

There are [several](https://conda.io/projects/conda/en/latest/user-guide/tasks/manage-environments.html#activating-an-environment) other ways of creating a conda environment that goes beyond the scope of this article.

#### Activating an environment
To activate an environment, run:

```bash
conda activate venv
```

Or you can run the following in the Anaconda prompt:

```bash
$ activate base
```

#### Deactivating an environment
To deactivate a virtual environment, run:

```bash
$ conda deactivate
```

### 5. Poetry
**[Poetry](https://python-poetry.org/docs/)** is popularly known as a very feature-rich Python tool for project dependency management. It comes wrapped with a powerful CLI for creating and managing Python projects.

#### Features
- It comes with a `pyproject.toml` file that contains a `tool.poetry` section that is composed of several sections like README.md, name, author, [etc](https://python-poetry.org/docs/pyproject/) for project documentation.
- It is faster than most virtual environment tools.
- It allows libraries declaration and auto updating of dependencies.

#### Installation
Unlike other project dependency tools, Poetry comes with a custom installer that isolates it from the rest of your system by seperating its dependencies.

Run the following command in the Windows Powershell.

>**Note**: This is the recommended way of installing `poetry` .

```bash
$ (Invoke-WebRequest -Uri https://raw.githubusercontent.com/python-poetry/poetry/master/get-poetry.py -UseBasicParsing).Content | python -
```

>**Note**: Even though it is possible to install it using **pip**, it is not recommended as it causes more dependency conflicts with other packages.

#### Creating a virtual environment
To create a new virtual environment using Poetry, use:

```bash
$ poetry new venv
```

This will create a virtual environment directory structure like shown below:

```bash
venv
├── pyproject.toml
├── README.rst
├── venv
│   └── __init__.py
└── tests
    ├── __init__.py
    └── test_venv.py
```

#### Activating the environment
Activate the virtual environment by running:

```bash
$ poetry shell
```

or

```bash
$ source {path_to_venv}\Scripts\activate.bat
```

#### Adding dependencies
To add a new dependency, use the following command:

```bash
$ poetry add  <package name>
```

or

```bash
$ poetry install <package name>
```

#### Deactivate the environment
You can deactivate a virtual environment using either:

```bash
$ exit 
```

This commands exits the virtual environment together with the powershell.

or

If you want to exit only the virtual environment, run the following command.

```bash
$ deactivate    
```

### Conclusion
When creating virtual environments, always try to use **venv** as the environment name since it is a global convention that is easily available in ignore files like `.gitignore`.

It is generally a good practice to work with virtual environments as they save you hours of debugging common errors like the `No module error`. They also enable easy collaboration between developers.

Good luck on your future projects.

Happy coding!

---
Peer Review Contributions by: [Geoffrey Mungai](/engineering-education/authors/geoffrey-mungai/)
