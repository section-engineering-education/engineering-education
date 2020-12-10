---
layout: engineering-education
status: publish
published: true
url: /engineering-education/complete-guide-on-installing-flask-for-beginners/
title: A Complete Guide on Installing Flask for Beginners
description: This tutorial will walk you on how to install Flask, structure your web application professionally, and create a web page with Flask that prints hello world in your web browser. 
author: adetu-ridwan
date: 2020-12-10T00:00:00-15:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/complete-guide-on-installing-flask-for-beginners/hero.jpg
    alt: address resolution protocol image example

---
Flask is a popular micro web framework that provides you with tools, libraries, and technologies for building web pages, e-commerce applications, and much more. There is a common problem for beginners when selecting what framework to learn (for backend web development). The common choices for developers are Flask and Django. I recommend Flask for a beginner, because it is easier to learn and use.
<!--more-->
We could use the analogy of a compact home library (when talking about Flask), while Django would be more of a state library. The point here is that, when you intend to build apps that have minimal functionality, Flask is one of the best choices.

However, because of its extensibility, organizations like Netflix, Airbnb, Uber, Lyft, Mozilla, and MIT make use of Flask as one of the technologies when developing their web applications.

By the end of this tutorial, you will adequately understand the following:
- How to install Flask.
- How to install a virtual environment.
- How to structure your web app.
- Building and running a simple Hello World program.

### Installing Flask
The Flask web framework is built on the Python programming language, thus, it will require that we install Python. Albeit, your system might have Python installed; to check if you have Python installed, open your terminal or cmd (in Windows) and type in the command:

```bash
$  python --version
Python 2.7.17
$  python3 --version
Python 3.6.9
```

If you have Python already installed, you should see the version appear in your terminal when you run either of the commands. If you don't have Python installed, we will describe the installation process next.

### Installing Python
The installation process of Python is quite easy. For windows users, visit the [Python official website](https://www.python.org/) and download the .exe file. Launch the file and follow the installation process.

For Linux users, on the other hand, Python2 is mostly installed by default, but to upgrade to the latest version, go through the [official documentation](https://docs.python-guide.org/starting/install3/linux/).

### Installing a virtual environment
A virtual environment is a tool that helps keep the dependencies required in different projects separate.

A virtual environment is designed to allow you to work on multiple projects that require diverse dependencies. 

You may have a project that requires the use of SQLAlchemy in your Flask application, but you don’t want this particular dependency to be a global one in every project. 

A virtual environment would be ideal, as it gives you control over that.

To install your virtual environment, you need Pip installed.

#### What is Pip
Pip is a package manager for Python packages and modules. You can follow through the step-by-step process provided by the [Python official documentation](https://packaging.python.org/guides/installing-using-pip-and-virtual-environments/) to install pip and a virtual environment.

### Installing Flask
Now that you have Python, pip, and a virtual environment installed on your system. We can proceed to the installation of Flask itself. 

This is a step-by-step process on how to install Flask:

#### Terminal and file directory
The first step is to create the flask_website directory: 
```bash
$  mkdir flask_website
```

Next, change directory to the flask_website directory created in the previous step:

```bash
$  cd flask_website
```

Create a virtual environment and store its tools in the "**env**" folder:

```bash
$  python3 -m venv env
```

By following the steps above, we have our virtual environment ready for our Flask app, next, we will activate it.

#### Running a virtual environment
To activate your virtual environment, from the directory of your folder, type the following command this will activate our virtual environment in the “env” folder as we demonstrated in the previous step.

```bash
$  source env/bin/activate
(env)$  
```

If you have successfully activated your virtual environment, you should see the **(env)** word indicating that we are working in a virtual environment. 

With all these completed, the fun part can now begin, what you’ve been waiting for, installing Flask!

#### Installing Flask
In this step, you will be installing the Flask web framework in our virtual environment specifically for the project being worked on.

Before you install Flask, I recommend you check your Python and Pip version just to confirm they are installed and activated in your virtual environment. 

You can proceed to install Flask by running the following command:

```bash
(env)$ pip install flask
```

#### Launching the workspace
For the scope of this article, we will be using Visual Studio Code here. Now, back to your terminal after installing Flask, run the subsequent command to launch VSCode in the current directory of the web application. 

```bash
(env)$ code .
```

Now, let’s proceed to structure the web application.

### Structuring your web application
The structuring of your web application is the first thing to do before delving into the coding process, and below is a diagrammatic representation of how your Flask app should be structured:

![image for web application structure](/engineering-education/complete-guide-on-installing-flask-for-beginners/web-app-structure.jpg)

The first process in structuring your web application is to create an “**app**” folder, a `run.py` file and a "**requirement.txt**" file.

The "**app**" folder structure provides us with the flexibility of defining our Flask application as a package that could be imported in any part of the app that we would require. 

The `run.py` file will basically serve as a pointer to Flask, informing it about where the App itself is and thereby running it. Lastly, the "**requirement.txt**" file houses all packages used in the project.

To start off, head back to your terminal and run the following command to generate the "**requirements.txt**" file:

```bash
(env)$ pip freeze > requirements.txt
```

To see the packages in use open the "**requirement.txt file**". It shouldn’t be more than seven requirements.

Next, you should create the "**app**" folder and the `run.py` file at the top level of your working directory.

### The Run.py file
This file serves as a pointer to Flask, informing it about the existence of our application and to run the application. In this file, we start off by importing the **app module** from the app folder we created earlier, while this seems confusing, it will make sense soon.

Next, we write an "**if**" condition to run the app when we run the Flask server, by the end of this, your `run.py` file should have a code that looks just like this:

```python
from app import app
if __name__ = "__main__":
    app.run()
```

### The app folder
In the previous step, you wrote the necessary code for Python to execute the app when we run the Flask server.

In this step, we will completely structure the **app** folder, and to do that you need to create certain files and folders. 

We start off by creating two folders and two Python files, which are: **static folder**, **templates folder**, `__init__.py` and `views.py`.

The `__init__.py` file houses the code to initialize our Flask application and to import our views. In this file, we import Flask, and also create and app object which is an instance of the Flask class. 

Lastly, we import the `views.py` file from the app folder. 

Your code in the `__init__.py` file should look this way:
```python
from flask import Flask
app = Flask(__name__)
from app import views
```

If you recall in the previous step we imported the **app** module from the app file, what we were basically doing was importing the app object in the **__init__** file. Let’s proceed by examining the `view.py` file.

### The views.py file
The views file contains the routes to webpages and might also house logic for your web app. In our case, we'll start with a function that returns a simple "Hello world' message to our browser. 

To achieve this add the code below to the `views.py` file:
```python
from app import app
@app.route("/")
def index():
    return "Hello world"
```

From the first line of code, we imported the app object from the app itself. Next, we define the route using the **@app.route** decorator, and passing the URL of the web page.

In this case, it's the homepage and we use the backward slash to delineate that. Then let's create an **index()** function that returns a simple hello world message. 

At this stage we can run our application to see what it looks like on a web browser.

### Running your application
Congratulations, you’ve made it this far, you can run your application by opening your terminal with the virtual environment active and run the following command line:

```bash
(env)$ flask run
 * Environment: production
   WARNING: This is a development server. Do not use it in a production deployment.
   Use a production WSGI server instead.
 * Debug mode: off
 * Running on http://127.0.0.1:5000/ (Press CTRL+C to quit)
```

By executing the command, your Flask server should be running and you can click on the link to see if your application works. 

If you’ve followed the process outlined here carefully, you should see hello world in your web browser.

### Conclusion
By now you should be able to install Flask, structure your web application professionally, and create a web page with Flask that prints hello world in your web browser. 

With this introduction, you can now build on it to create web applications.

You can find the full codebase for this article [here](https://github.com/corpsgeek/introduction-to-flask).

---
Peer Review Contributions by: [Adrian Murage](/engineering-education/authors/adrian-murage/)
