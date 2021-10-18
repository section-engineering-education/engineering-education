---
layout: engineering-education
status: publish
published: true
url: /structuring-large-applications-with-blueprints-and-application-factory-in-flask/
title: Structuring Large Applications in Flask with Blueprints and Application Factory
description: In this article, we will understand how to work with structure large applications in Flask. We will also learn to create individual components like Blueprints, and Application factories.
author: adetu-ridwan
date: 2021-07-12T00:00:00-07:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/structuring-large-applications-with-blueprints-and-application-factory-in-flask/hero.jpg
    alt: Structuring Large Applications in Flask with Blueprints and Application Factory example image
---
There are various techniques adopted by software developers to structure a Flask application. However, when building a small or medium-scale app, the structure of such application might not be of immense importance, especially if using the package structure technique.
<!--more-->
In building large applications, the use of package structure in structuring your application will result in a tactless codebase which inevitably results in issues such as circular imports.

To avoid the obstacles resulting in structuring a large application poorly, there are two main techniques used in structuring applications with Flask, which are: Blueprints and Application Factory.

### Prerequisites
The prerequisites for this article includes an understanding of the following concepts:

- Intermediate usage and implementation of a Flask web app
- Understanding of Object-Oriented Programming concepts with Python
- Understanding of Flask views and templates
- Intermediate knowledge with the use of terminals
- Intermediate understanding of databases

### Table of Contents
- [Work Environment Setup](#work-environment-setup)
- [Examining a Basic Flask Application Structure](#examining-a-basic-flask-application-structure)
- [Introduction to Blueprints](#introduction-to-blueprints)
- [Introduction to Application Factory](#introduction-to-application-factory)
- [Working with Configuration and Environment Variable](#working-with-configuration-and-environmental-variables)
- [Structuring Applications with Blueprint and Application Factory](#structuring-a-large-scale-application)
- [Conclusion](#conclusion)

### Work environment setup
In this tutorial, the use of [PyCharm](https://www.jetbrains.com/pycharm/) Integrated Development Environment is recommended, because it has all the features required to set up a basic application.

However, if you have a different preference in terms of IDE, then you should consider installing a virtual environment and installing Flask.

To keep the introductory section of this article concise, I won't cover how to set up a Flask web application. However, if you have no prior knowledge of setting up a Flask web application, read my article on the Flask framework [here](/engineering-education/complete-guide-on-installing-flask-for-beginners/).

### Examining a Basic Flask Application Structure
Before we delve into the structuring of a large-scale Flask application, let’s first understand how a basic Flask application is structured.

To examine the basic structure of a Flask web application, let’s clone this repository [here](https://github.com/corpsgeek/Flask-Basic-App)

In the cloned repository, we have the `app.py` file, the `static` folder, and the `templates` folder. The `app.py` file consists of the `app route` and the `run` statement, while the `static` folder stores the CSS, JS, and image files we would require in building our web application. The templates folder consists of the HTML files to be rendered to the user.

As an intermediate developer, running this application will result in a "Hello World" statement printed out on your web browser. While this basic application structure suffices for building small-scale applications, what happens if we need to start implementing additional features such as Authentication, Email, Errors, Database, User Profile, and many more as the application demands.

It would prove inefficient to write the code for each feature in the `app` folder or to store all the HTML files for each feature in the template directory without appropriate structure, this will result in conflict and it also makes debugging difficult.

To avoid the cons of building large-scale applications with the basic structure of flask, we need to understand Blueprints and Application Factory.

### Introduction to Blueprints
Blueprints aid in organizing components of our web applications into distinct components. The definition of Blueprints doesn’t exactly illustrate how it works, let’s take an example with a web application.

In a web application, we have the registration component and the user profile component. We can assign an unique identifier to each component such that any sub-component can be referenced with the unique identifier of their base component.

For example, the registration component can be registered with a Blueprint called *‘Reg’* then any template, views can be accessed via the Blueprint name, and the same thing applies to the user profile component.

The advantage of blueprint over the basic application structure is that the basic application structure utilizes a `view.py` file to store all views and routes for the web application.

However, the problem with this is that if we have an index route for both the registration and user profile component, how does Flask know which route to load when the user navigates to either of the components? It doesn’t, but with blueprints, it can.

#### Blueprint code sample
Let’s go about a step-by-step process of creating a simple blueprint for *‘authentication’*.

To create a Blueprint for a particular feature or component, it is a solid design approach to have a short name for it, and in the developer society, authentication is also commonly referred to as *‘auth’*.

First, we create a package in our Flask application and name it *‘auth’*.

> Note that a package has to be initialized with the `__init__.py` file. We  can also add the *views* and *form* file, but ensure they are prefixed with the package name, e.g `auth_views.py`, and `auth_form.py`

Next, in the `__init__.py` file, we import the blueprint and create a blueprint object with the variable `auth`, then below the blueprint object, we import the *views, forms*, and other files.

Your `auth __init__.py` file should look like this:

```python
from flask import Blueprint

auth = Blueprint('auth', __name__)

from . import auth_forms, auth_views
```

Now that we have created the blueprint, we need to register them. To register our blueprints, we require the creation of an application factory. So, let’s proceed to an introduction to the application factory.

### Introduction to Application Factory
The application factory is a function that wraps the creation of the app object and returns it. This pattern of structuring Flask applications gives the developer the unique flexibility of loading different configuration files for the same application.

Throughout the instantiation and configuration of the Flask application, blueprints and other extensions are handled in a function called the Application Factory function.

The use of this method of instantiating extensions and components of the application ensures that the developer configures the application before instantiating it, which resolves the circular import bug.

#### Application Factory Code Sample
The application factory takes the form of a function commonly named `create_app`. It takes the configuration argument. Then, the body of the function instantiates the flask app and the app configuration.

The application factory function also initializes extension instances with the `init_app` method which can be used to initialize the application while taking an argument of the flask application `app`.

> Note that all extensions required by the application are instantiated in the format above.

Lastly, the final component of the application factory function is the Blueprint registration. Here, we import the individual blueprint components of the application and register them with the `register_ blueprint()` method.

Below is the code template of the application factory:

```python
def application_factory_method(config):
   app = Flask(__name__)
   #load application configuration from its object
   app.config.from_object(config)

   #initialize installed extension instances
   #as an example, initialize database extension
   db.init_app(app)
   db.app = app

   #as an example, initialize flask mail extension 
   mail.init_app(app)
   Mail.app = app

   #register blueprints of applications
   #from app.blueprint_package import blueprint_object as dummy_name
   # register blueprint
#code sample using the auth blueprint sample
from app.auth import auth as auth_bp
app.register_blueprint(auth_bp)

#return the app object
return app
```

The above is a code template of the implementation of the application factory. In the final section of the article, we will put together all components of the application to understand how large applications are structured in Flask.

Let’s proceed to work with app configuration and environmental variables.

### Working with configuration and environmental variables
The configuration variables are required parameters for our application, and they retrieve sensitive information from our environmental variables. Therefore, we need to access the required variables for the scope of the application without loading and setting these variables individually during runtime.

A good analogy for the importance of configuration variables is when we want to run different states of your application. For example, in a production environment, we would need to have Debug set to false, the database uniform resource identifier, and other configuration variables specific to the production environment.

The developer would also like to have unique configuration parameters for a testing environment and a development environment.

#### Configuration file code sample
When working with configuration parameters for your flask web application, we need to create a `config .py` file in the base directory of our web application. In our config file, we will be working with the *os package*, therefore it has to be imported.

We also need to set the base directory to the absolute path of the path directory name, and this should look like this:

```python
import os 

basedir = os.path.abspath(os.path.dirname(__name__))
```

The next step is to create a *super* class of Config, that inherits the class *object*.

The Config class is then inherently a base class of the object class which accepts no arguments and returns a new featureless instance that has no instance attributes.

The Config *super* class takes certain attributes which are the secret key and some database configuration attributes. The secret key attributes will be retrieved from the app environment, this would become clear when we start working with environmental configuration. The config class should look like this:

```python
# Create the super class
class Config(object):
   SECRET_KEY = os.environ.get('SECRET_KEY')
   SQLALCHEMY_COMMIT_ON_TEARDOWN = True
   SQLALCHEMY_TRACK_MODIFICATIONS = False
```

Next, we need to create each config class that inherits the *super class* config.

In web development, there are three standard configuration class which are the *development config, testing config and production config*. To save time, the config settings should look like this:

```python
# Create the development config
class DevelopmentConfig(Config):
   DEBUG = True
   SQLALCHEMY_DATABASE_URI = 'sqlite:///'+os.path.join(basedir, 'dev-data.db')
   SQLALCHEMY_TRACK_MODIFICATIONS = False
   MAIL_SERVER = os.environ.get('MAIL_SERVER')
   MAIL_PORT = os.environ.get('MAIL_PORT')
   MAIL_USERNAME = os.environ.get('MAIL_USERNAME')
   MAIL_PASSWORD = os.environ.get('MAIL_PASSWORD')
   MAIL_USE_TLS = os.environ.get('MAIL_USE_TLS')
   MAIL_USE_SSL = os.environ.get('MAIL_USE_SSL')


# Create the testing config
class TestingConfig(Config):
   DEBUG = False
   TESTING = True
   SQLALCHEMY_DATABASE_URI = 'sqlite:///' + os.path.join(basedir, 'test-data.db')
   SQLALCHEMY_TRACK_MODIFICATIONS = False

# create the production config
class ProductionConfig(Config):
   DEBUG = False
   SQLALCHEMY_DATABASE_URI = 'sqlite:///' + os.path.join(basedir, 'data.db')
   SQLALCHEMY_TRACK_MODIFICATIONS = False
```

The above code encapsulates the basic template for configuration files, as the developer, it is at your discretion to decide what goes under each config (production, development, and testing). Let’s proceed to the environmental variables.

#### Environmental file code sample
The environmental variable file is stored in the base directory of our web application. However, to work with environmental variables, we have to install the *python-dotenv* extension via pip.

```bash
pip install python-dotenv
```

Once we install the dotenv extension, create a `.env` file in the base directory of our application. In the `.env` file, we create variable names that will be required by our application and assign them a default value, this way we do not have to assign a value to these environmental variables every time we want to run our web application.

It is also crucial to know that variables that contain sensitive data are best stored in the environment (not readable and accessible by the public). Some of these variables are `FLASK_APP`,  `SECRET_KEY`, `MAIL_SERVER` and other variables the developer would require.

Below is a sample of a `.env` file content:

```python
FLASK_APP = 'run.py'
FLASK_ENV = development
FLASK_DEBUG = True
SECRET_KEY = '2a43ca5b42240a33dadc64beace65d1f'
MAIL_SERVER = 'smtp.gmail.com'
MAIL_PORT = 465
MAIL_USERNAME = ‘demodeveloper@gmail.com'
MAIL_PASSWORD = ‘demodeveloperpassword’
```

We’ve successfully been able to dissect the pieces that would come together to structure a large-scale application. Now, let’s proceed to place the pieces of the puzzle together to structure a demo social network application.

### Structuring a large scale application
We now understand the components of structuring a large Flask application. Now, let’s place the pieces together to know how we can structure one.

The process of structuring a large flask application is quite straightforward. All we require are the following:

- The config file
- The .env file
- The features/components of our application
- Use of blueprints
- Implementing blueprints in an application factory
- The run file

We also know how to create a config file and an environmental variable file.

However, let’s cover how to handle the components of our application then couple them with blueprints and the application factory. Lastly, we implement the structure and code the run file.

#### The components of our application
When building a component of our application or a feature, the first thing we need to do is to create a package for the component.

For example, in a social network web application, we have the user authentication feature; so we create a package for user authentication, which is commonly attributed as `auth` in web development.

In our auth package, we can add the *views* and *forms* file for this specific feature. It is best practice to use the feature name as a prefix to files within the package. E.g the `views.py` for auth will be saved as `auth_views.py` this way it eases recognition.

In the `__init__.py` file in the auth package, here are the things we need to do:

- Import Blueprint from flask
- Initialize an object of a blueprint and pass in the blueprint name for this specific component which in our case is ‘auth’
- Underneath the object initialization, we import all other components of this package/feature here such as `auth_forms`, `auth_views` etc.

A complete implementation of this is as follows:

```python
from flask import Blueprint

auth = Blueprint('auth', __name__)

from . import auth_forms, auth_views, auth_utils
```

#### The application factory
After creating components of our application and setting up blueprints, we have to register the blueprints in the application factory method.

In our app folder where we have the `__init__.py` file for the application itself, we import all extensions and modules required for our application to function. We also create instances of our extensions installed.

Next, we create an application factory function commonly named `create_app()`. The `create_app()` function takes a config argument from our `config.py` file. The following outlines the process on the block of code that goes into the application factory function:

- Create an app variable and initialize Flask
- Load the application configuration as an object from the `config.py` passed into the function
- Initialize extension instances created outside our application factory function
- Register the blueprints
- Return the app variable

The implementation of this logic is as follows:

```python
from flask import Flask
from config import DevelopmentConfig
from flask_mail import Mail

#instances of extensions
Mail = Mail()

#creating the application factory

def create_app(config=DevelopmentConfig):
   app = Flask(__name__)
   app.config.from_object(config)

   #initialization of extension instances
   mail.init_app(app)
   mail.app = app

   # register the authentication blueprint
   from app.auth import auth as auth_bp
   app.register_blueprint(auth_bp)

   return app
```

#### The run file
The run file is where we have the code instructions to run our flask application.

Here, we do the following:

- Import the application factory from the app
- Import the application config classes
- Create an instance of the application and pass it to the app variable name
- Create the main block to run the application

The implementation of this code instruction is as follows:

```python
# import the create app application factory
from app import create_app

# import the application config classes
from config import DevelopmentConfig, ProductionConfig, TestingConfig

app = create_app()

if __name__ == '__main__':
   app.run()
```

### Conclusion
This article covers all facets of structuring large applications and providing a unique perspective to the individual components. While there isn’t a codebase of this application, I find it a huge learning experience to examine the implementation of this mode of structuring application in a large-scale application.

The GitHub link [here](https://github.com/corpsgeek/social-app-structure) consists of a social network flask application structured by me. The goal isn’t for you to run the application, but for you to glean the structure and how the process described in this article knots to the structure of the codebase.

Your goal is to examine how the code connect and create a personal note of yours of how you best understand it, then structure a large application for your personal development.

---
Peer Review Contributions by: [Srishilesh P S](/engineering-education/authors/srishilesh-p-s/)