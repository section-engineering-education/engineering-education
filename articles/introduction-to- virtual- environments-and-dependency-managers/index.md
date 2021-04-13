### Introduction to Python Virtual Environments and Dependency managers

Virtual environments. What are they and what are they used for? From the Python documentation, a virtual environment is an isolated Python environment where a Python interpreter, libraries, modules and scripts (collectively called dependencies) are installed in a different directory from those installed in the system’s default Python path and other virtual environments.

Dependency managers are tools that enable easy management of a project's dependencies.

### Prerequisites

This article assumes:

* The reader's knowledge of Python programming language.
* Has Python installed into his/her computer.

    >Just to make sure run this command on your terminal.  `python --version`

### Overview

This article will look into the most used virtual environments and dependency managers in python, how to use them and their pros and cons.

1. [Pipenv](#1.-Pipenv)
2. [Venv](#2.-Venv)
3. [Virtualenv](#3.-Virtualenv)
4. [Poetry](#4.-Poetry)
5. [Conda](#5.-Conda)

### 1.  Pipenv

### What is Pipenv?

Pipenv is a package manager that is used to manage python projects dependencies. It is good for the common typical workflow of using dependencies like *pip*, *requirements.txt* etc.
Under the hood, pipenv generally combines the use of pip and Virtualenv into a simple command line interface.

### The problem it solves

1. Managing projects with different dependencies i.e. when one project requires `Django==2.6` but another project requires `Django==3.0.6`.
2. Installation of python packages and libraries.
3. Dependency resolution. This is where you specify the requirements for a particular project sub-dependency to avoid installation problems.
4. Reproduction of environments

### Installation

Before we use pipenv let us first install it.

```bash
pip install pipenv
```

After running this, pipenv will be installed in your computer. Here’s the part where we now say goodbye to pip. It has been indeed a journey!

#### Creating a virtual environment

After installation, we just need to install a Python module using *Pipenv* and **boom!** We have a virtual environment.
**Example**

```bash
cd my_project_folder

pipenv install Django==2.0.13
```

The command above automatically creates a virtual environment for your project(*my_project_folder*) with a **Pipfile** and a **Pipfile.lock** files. These files are where your project dependencies are saved.
If you wish to change this, you could change the default pipenv configurations.

### Activating the virtual environment

After creating our virtual environment, we activate it using:

```bash
pipenv shell
```

### Uninstalling Packages

You can uninstall a package from your project by using the following command:

```bash
pipenv uninstall Django
```

Here, you don’t need to specify the package version. The package is also removed from the Pipfile and Pipfile.lock file.

### Deleting a virtual environment

For whatever reason you feel the need to remove a virtual environment, you can do that with pipenv using the command below.

```bash
pipenv --rm
```

Always make sure to be working in your project directory terminal before using these commands.

**Note:** With Pipenv, you can force install a specific python version for your project using:

```bash
pipenv install –python 3.6
```

### Advantages of Pipenv

1. It automatically creates and manages a virtual environment for your projects.
2. It generates the Pipfile.lock file which helps in deterministic builds.
3. It adds and removes packages from a Pip file as you install and uninstall packages.
4. It automatically locate you project location by looking for a Pip file.

### 2. Venv

### What is Venv?

Venv is a Python's module that is used to create light weight virtual environments. It is the standard virtual environment module for **Python 3**.
It is one of the easiest modules to use for creating virtual environments.

### The problem it solves

* Installation of python packages and libraries of different versions in the same computer.

### Installation

Since Venv comes pre-installed in Python 3 and above, there's no need for installing it.

So, we will go ahead and create a virtual environment.

### Creating a virtual environment

when working on windows Command Prompt, use:

```bash
> python3 -m venv \path_to\my_project_env
```

### Activating the virtual environment

Before using the virtual environment, we need to activate it. This makes the current directory you're working on to temporarily function as the default python interpreter.

Activate your project's environment by using the following command:

```bash
> cd \path_to\my_project\venv\Scripts>activate.bat
```

On Windows PowerShell, use:

```bash
path_to\my_project\venv\Scripts>Activate.ps1
```

 You've successfully activated your environment once the path changes to :

```bash
(venv) path_to\my_project\venv\Scripts>
```

### Configuring the virtual environment

After activating the virtual environment, you can now start installing modules and packages by using the great *`pip install`* command.

For example:

```bash
pip install Django
```

Check the version of Pip you're using and directory with the following command:

```bash
(venv) path_to\my_project\venv\Scripts> pip -V
```

>**Note**: It is a good practice to always work with a *requirements.txt* file for easy collaboration since it stores a list of all installed packages in your environment.
In order to create one, use

``` bash
(venv) path_to\my_project\venv\Scripts> python -m pip freeze > requirements.txt` 
```

or manually create the file and add the packages installed.

### Deactivating

After you finish with the environment, deactivate it using:

```bash
(venv) path_to\my_project\venv\Scripts>deactivate.bat
```

### Deleting the virtual environment

Since virtual environments are self-contained, when no longer needed, just delete the project's directory.

### Advantages of Venv

* You don't have to install it for **Python 3** and above since it comes preinstalled with it.
* Easy to use.

### Weaknesses

* It is very primitive when compared to tools like Pipenv as it doesn't tell us which Python version we are working on.

### 3. Virtualenv
  
### What is Virtualenv?

**Virtualenv** is a third-party dependency manager  tool for creting and managing Python projects. It is the most used and most popular module for **Python 2**  language.
>**Note** virtual environments do not come as a native feature for Python 2.

### The problem it solves

* Project dependencies conflicts i.e. separating project A's dependencies from project B's.

### Installation

In order to order use Virtualenv, we first need to install it using the following command:

```bash
pip install virtualenv
```

### Basic Usage

### Creating a virtual environment

Create a virtual environment using the following command:

```bash
virtualenv venv
```

For activation and deactivation, the same commands used with **Venv** applies.

### Installing Dependancies

For installing additional packages and libraries, use:

 ```bash
 pip install <package name>
 ```

### Advantages of Virtualenv

* Easy to use

### Weaknesses

* It is slower than other tools like Venv

* It is not as scalable as other tools

* It does not create virtual environments for arbitrarily installed Python versions and automatically discover them

* It is cannot be upgraded using [pip](https://pip.pypa.io/en/stable/installing/)

* It does not allow description of virtual environments without creating them.

### 4. Poetry

### What is Poetry?

**Poetry** is popularly known as a very feature-rich Python tool for project dependency management. It comes wrapped with a powerful CLI for creating and managing Python projects.

### The problem it solves

* Project dependency conflicts.

### Installation

Unlike other project dependency tools, Poetry comes with a custom installer that isolately installs it from the rest of your system by vendorizing its dependencies.
Run the following command in the Windows Powershell.
> **Note**: This is the recommended way of installing `poetry` .

```bash
(Invoke-WebRequest -Uri https://raw.githubusercontent.com/python-poetry/poetry/master/get-poetry.py -UseBasicParsing).Content | python -
```

>**Note**: Even though it is possible to install it using **pip**, it is not recommended as it causes more dependency conflicts with other packages.

### Create a virtual environment

When creating a new virtual environments, use:

```bash
poetry new venv
```

This will create a directory like follows:

```text
venv
├── pyproject.toml
├── README.rst
├── venv
│   └── __init__.py
└── tests
    ├── __init__.py
    └── test_venv.py
```

### Activating the environment

Activate the virtual environment using:

```bash
poetry shell
```

or

```bash
source {path_to_venv}\Scripts\activate.bat
```

### Adding Dependencies

To add a new dependency , use the following command:

```bash
poetry add  <package name>
```

or

```bash
poetry install <package name>
```

### Deactivate the environment

Deactivate using either:

```bash
> exit  #(Exits the virtual environment plus the powershell)
 ```

 or

 ```bash
 > deactivate    # (only exits the virtual environment.)
 ```

### Advantages of Poetry

* Rich with features
* It is faster than most tools

### Weaknesses

* Not easy to install and set up

### 5. Conda

### What is Conda?

**Conda** is a package management system and environment management system that not only supports Python but also other languages like Ruby, Scala, R and C/C++. It is used to create, save, load and switch between environments in your local computer.

Conda comes pre-installed with [anaconda](https://www.anaconda.com/) and [miniconda](https://docs.conda.io/en/latest/miniconda.html).  

### The problem it solves

* Finding and installing packages -  There's no need of switching between different environments. Since Conda is also a environment manager, you can set up a another environment to run a different version of Python, without interfering with the environment that runs your usual version of Python.

### Installation

Installing Conda is quite different from other dependency managers.
The easiest way to install it is by installing [anaconda](https://docs.anaconda.com/anaconda/install/windows/) or [miniconda](https://docs.conda.io/en/latest/miniconda.html) - a mini version of anaconda that contains only conda and its dependancies.

### Create an environment

Create an environment using:

```bash
conda create --venv
```

When conda asks you to proceed, type  `y`:

```bash
proceed ([y]/n)?
```

There are [several](https://conda.io/projects/conda/en/latest/user-guide/tasks/manage-environments.html#activating-an-environment) other ways of creating a conda environment that goes beyond the scope of this article.

### Activating an environment

To activate an environment, run:

```bash
conda activate venv
```

or you can run the following in the Anaconda Prompt:

```bash
c:\Anaconda3\Scripts\activate  base
```

### Deactivating an environment

To deactivate an environment, run:

```bash
conda deactivate
```

### Advantages of Conda

* You can [share](https://conda.io/projects/conda/en/latest/user-guide/tasks/manage-environments.html#sharing-an-environment) environments
* It is rich with features

### Weaknesses

* Can be a little complicated for beginners to understand

### Conclusion

>**Tip**
>When creating virtual environments, always try to use **venv** as it is a universal convention name that is easily available in ignore files like *.gitignore.*

It is generally a good practice to work with virtual environments as they save you hours of debugging basic errors like *`No module errors`*. They also enable easy collaboration between developers.
Now that you have learnt quite a lot about virtual environments, let me welcome you to the path of a Python Intermediate.

Good luck on your future projects.
