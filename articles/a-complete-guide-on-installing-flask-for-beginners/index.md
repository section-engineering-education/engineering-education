# A Complete Guide On Installing Flask For Beginners

Flask is a popular micro web framework which provides you with tools, libraries and technologies for building web applications. such as web pages, e-commerce applications and more.

However, there is a basic problem of selecting what framework to learn as a beginner starting a career in backend web development. Nonetheless, I recommend Flask over Django for a beginner, because it is easier to learn and use.

Flask could be related to the analogy of a home compact library, while Django can be attributed to a state library. The point here is that, when you intend to build apps that wouldn’t scale up in the future, Flask is one of the best choices, and the opposite is the case when you intend to use Django.

However, because Flask is related to a home library, that does not mean it is not widely adopted in the tech industry. Organizations like Netflix, Airbnb, Uber, Lyft, Mozilla, MIT make use of Flask as one of the technologies in developing their web applications.

By the end of this article, you will adequately understand the following:
* How to install Flask.
* How to install a virtual environment
* How to structure your web app.
* Building and running a simple Hello World program.

# Installing Flask
The Flask web framework is built on the Python programming language, thus, it requires the installation of Python. Albeit, your system might have Python installed; to check if you have Python installed, open your terminal or cmd(windows) and type in the command:

```bash
~$  python --version
Python 2.7.17
~$  python3 --version
Python 3.6.9
```

On your terminal, if you have Python installed you should see the version appear below when you run either of the commands. But, what if you do not have Python installed, how do you go about it?

## Installing Python
The installation process of Python is quite easy. For windows users, visit the [Python official website](https://www.python.org/). and download the .exe file. Launch the file and follow the installation process.

For Linux users, on the other hand, Python2 is mostly installed by default, but to upgrade to the latest version, go through the [official documentation](https://docs.python-guide.org/starting/install3/linux/).

## Installing A Virtual Environment
A virtual environment is a tool that aids in keeping dependencies required by different projects separate.

A virtual environment is designed to allow you to work on multiple projects that require diverse dependencies. E.g You might have a project that requires the use of SQLAlchemy in your Flask application, but you don’t want this particular dependency to be a global one in every project, and a virtual environment gives you control over that.

To install your virtual environment, you need Pip installed.

### What is Pip
Pip is a package manager for Python packages and modules. You can follow through the step-by-step process provided by the [Python official documentation](https://packaging.python.org/guides/installing-using-pip-and-virtual-environments/) to install pip and a virtual environment.

## Installing Flask
It is assumed that you have Python, pip and a virtual environment installed on your system. Now, we can proceed to the installation of Flask itself. 

The following is a step-by-step process to follow to install Flask:

### Terminal and File Directory
The first step is to create the flask_website directory 
```bash
~$  mkdir flask_website
```
Next, change directory to the flask_website directory created in the previous step
```bash
~$  cd flask_website
```
Create a virtual environment and store its tools in the "**env**" folder
```bash
~$  python3 -m venv env
```
By following the steps above, we have our virtual environment for our Flask app ready, next, we activate it.

### Running A Virtual Environment
To activate your virtual environment, from the directory of your folder, the following command will activate our virtual environment in the “env” folder as we demonstrated in the previous step.

```bash
~$  source env/bin/activate
(env) ~$  
```

If you have successfully activated your virtual environment, you should see the **(env)** word indicating that we are working in a virtual environment. With all these done, the fun part is here, what you’ve been waiting for, installing Flask!

### Installing Flask
In this step, you will be installing the Flask web framework in our virtual environment specifically for the project being worked on.

Before you install Flask, I recommend you check your Python and Pip version just to confirm they are installed and activated in your virtual environment. You can proceed to install Flask by running the following command:

```bash
(env) ~$ pip install flask
```

### Launching The Workspace
For the scope of this article, Visual Studio Code is the choice of code editor here. Now, back to your terminal after installing Flask, run the subsequent command to launch VSCode in the current directory of the web application. 

```bash
(env) ~$ code .
```

By following through this process, you have successfully installed Python, a virtual environment and most importantly Flask. Now, let’s proceed to structure the web application.

## Structuring Your Web Application
The structuring of your web application is the first thing to do before delving into the coding process, and below is a diagrammatic representation of how your Flask app should be structured:

![image for web application structure](/engineering-education/a-complete-guide-on-installing-flask-for-beginners/web-app-structure.jpg)

The first process in structuring your web application is to create an “**app**” folder, a `run.py` file and a "**requirement.txt**" file.

The "**app**" folder structure provides us with the flexibility of defining our Flask application as a package that could be imported in any part of the app which we would require. The `run.py` file will basically serve as a pointer to Flask, informing it about where the App itself is and thereby running it. Lastly, the "**requirement.txt**" file houses all packages used in the project.

To start off, head back to your terminal and run the following command to generate the "**requirements.txt**" file:

```bash
(env) ~$ pip freeze > requirements.txt
```

To see the packages in use open the "**requirement.txt file**". It shouldn’t be more than seven requirements.

Next, you should create the "**app**" folder and the `run.py` file at the top level of your working directory.

## The Run.py File
This file serves as a pointer to Flask, informing it about the existence of our application and to run the application. In this file, we start off by importing the **app module** from the app folder we created earlier, while this seems confusing, it will make sense soon.

Next, we write an "**if**" condition to run the app when we run the Flask server, by the end of this, your `run.py` file should have a code that looks just like this:

```python
from app import app
if __name__ = "__main__":
    app.run()
```

## The app Folder
In the previous step, you wrote the necessary code for Python to execute the app when we run the Flask server.

In this step, we will completely structure the **app** folder, and to do that you need to create certain files and folders. We start off by creating two folders and two Python files, which are: **static folder**, **templates folder**, `__init__.py` and `views.py`.

The `__init__.py` file houses the code to initialize our Flask application and to import our views. In this file, we import Flask, and also create and app object which is an instance of the Flask class. 

Lastly, we import the `views.py` file from the app folder. At the end of following this process, your code in the `__init__.py` file should look this way:

```python
from flask import Flask
app = Flask(__name__)
from app import views
```

If you recall in the previous step we imported the **app** module from the app file, what we were basically doing was importing the app object in the **__init__** file. Let’s proceed by examining the `view.py` file

### The views.py file
The views file contains the routes to webpages and might also house logic for your web app. In our case, we'll start with a function that returns a simple "Hello world' message to our browser. To achieve this add the code below to the `views.py` file:

```python
from app import app
@app.route("/")
def index():
    return "Hello world"
```

From the first line of code, we imported the app object from the app itself. Next, we define the route using the **@app.route** decorator, and passing the URL of the  web page, in this case, it's the homepage and we use the backward slash to delineate that. Proceed further to create an **index()** function that returns a simple hello world message. 

At this stage we can run our application to see what it looks like on a web browser.

## Running Your Application
Congratulations, you’ve made it this far, you can run your application by opening your terminal with the virtual environment active and run the following command line:

```bash
(env) ~/Desktop/flask_website$ flask run
 * Environment: production
   WARNING: This is a development server. Do not use it in a production deployment.
   Use a production WSGI server instead.
 * Debug mode: off
 * Running on http://127.0.0.1:5000/ (Press CTRL+C to quit)
```

By executing the command, your Flask server should be running and you can click on the link to see if your application works. If you’ve followed the process outlined here carefully, you should see hello world in your web browser.

## Conclusion
At the end of this article, you should be able to install Flask, structure your web application professionally and create a web page with Flask that prints hello world in your web browser. With this introduction, you can now build on it to create web applications.

In addition, you can find the codebase for this article [here](https://github.com/corpsgeek/introduction-to-flask).

