---
layout: engineering-education
status: publish
published: true
url: /engineering-education/python-frameworks/
title: A look at Python web development frameworks.
description: What a web framework is, types of frameworks, 5 most used frameworks, installation, and a minimal app in each. Which Python web framework is best.
author: geoffrey-mungai
date: 2020-08-17T00:00:00-10:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/python-frameworks/hero.jpg
    alt: computer image example nodejs
---
Many people nowadays use web frameworks to develop web apps. Using them is better than using raw python. They automate many things like database connections and management, Authorization, and URL routing. In this article we will be exploring what framework should you use? Which is the best framework? Should you even use a framework? Let's look at all this and more.
<!--more-->
### What is a web framework?
A web framework is a collection of packages and modules which help developers write web applications. They prevent the developer from having to manage low-level details such as protocols, process management, or sockets. Many frameworks are server-side technologies. With the increasing commonness of AJAX, some of them have started using AJAX to integrate client-side operations. The end product is a web app with a backend and a frontend.
In short, frameworks support a large number of activities such as interpreting requests, handling cookies, sessions, and producing responses. Let's look at the different types of Python frameworks that we will explore.

### Types of Web Frameworks.
There are 3 main types of web frameworks:
 1. **Full-stack Frameworks** - These are frameworks that can build a web app with both a backend and a frontend. They may have an HTTP application server, a database, a template engine, an authentication module, and an AJAX toolkit.
 2. **Micro frameworks** or non-full stack - These are frameworks designed for the development of small web apps. They provide fewer features than full-stack frameworks. A developer has to add code manually for things to work. They are usually used by experienced Python developers.
 3. **Asynchronous Frameworks** - It is the most recent type of Python framework. It is a microframework with the ability to handle a large set of concurrent connections.

### Popular Web Frameworks.
#### 1. [Django](https://www.djangoproject.com/)
[Github](https://github.com/django/django) stars: 51.3k

Django is a full-stack Python web framework, developed by Django Software Foundation. It was released in 2005 as an open-source framework. It uses the DRY (don't repeat yourself) code principle. It has a vast collection of python libraries. Some of the main features offered by Django are:

 1. Authentication
 2. URL routing
 3. Jinja2 template engine
 4. Object-relational mapper (ORM)
 5. Database schema migrations

Django comes with an SQLite database out of the box. It's advised to use Django with Python3. *It is used by some tech giants like Instagram, Pinterest, and GoDaddy.* [Source](https://stackshare.io/django)

### Setup and Installation
**Create a virtual environment**
Make sure any version of **python3** is installed on your computer. If not [download](https://www.python.org/downloads/) for your system. Run this command in the command line.

```
$ python3 -m venv virtual && source virtual/bin/activate
```

Virtual here is the name of the virtual environment.
**Install Django**

```
$ pip install Django
```

This will install the latest Django version available. You can give it any name you like.
**Start Django project**

```
$ django-admin startproject helloworld
```

This creates a `helloworld` directory in your current directory.
**Run the project**
Navigate to the newly created directory and run.

```
$ python manage.py runserver
```

This fires up the app and can be accessed in a browser via http://127.0.0.1:8000/ by default.

#### 2. [Flask](https://flask.palletsprojects.com/)
[Github](https://github.com/pallets/flask) stars: 51.6k

Flask is a micro-framework built on the Werkzeug library and Jinja2 template engine. It comes with a built-in development server and unit testing support. It comes fully Unicode-enabled with RESTful request dispatching and WSGI compliance. Features include:

 - A built-in HTTP server and debugger
 - Jinja2 template engine
 - URL routing
 - Cookie handling
 - different databases support

Flask is recommended to be used with Python3.5 or newer.

**Installation and setup**
Create a project folder, create and initialize a virtual environment. Look at the how to make one in the Django section. After activation, run:

```
$ pip install Flask
```

**A minimal application**
Make a file `app.py` in your current directory. Open the file in your favorite code editor and paste this inside code.

```python
from flask import Flask
app = Flask(__name__)

@app.route('/')
def hello_world():
	return 'Hello World!'
if __name__ == '__main__':
    app.run(debug = True)
```

Then run the app.

```
$ python app.py
```

The app can be accessed using a browser by opening http://127.0.0.1:5000
*Netflix, Mozilla, Uber, and Samsung are some companies using Flask*. [Source](https://stackshare.io/flask)

#### 3. [Tornado](https://www.tornadoweb.org/)
[Github](https://github.com/tornadoweb/tornado) stars: 19.4k

Tornado is a full-stack Python web framework and asynchronous networking library. It is used to build apps that expect many long-lived connections to users. Some features offered by Tornado are:

 - Authentication
 - Third-party authentication apps support. It can be used to build apps that support *sign in with Google, Facebook, Twitter, etc.*
 - Streaming services support.
 - Built-in Template engine

**Installation and Setup**
After creating and activating a virtual environment, run:

```
$ pip install tornado
```

**A minimal tornado app**
create a file `app.py` and paste the code below.

```python
import tornado.ioloop
import tornado.web

class MainHandler(tornado.web.RequestHandler):
	def get(self):
	    self.write("Hello World!")

def make_app():
	return tornado.web.Application([
	    (r"/", MainHandler),
	])

if __name__ == "__main__":
	app = make_app()
	app.listen(8888)
	tornado.ioloop.IOLoop.current().start()
```

run the app by executing the command:

```
$ python app.py
```

*Facebook and Delivery Hero are some of the companies using Tornado.* [Source](https://stackshare.io/tornado)

#### 4. [Sanic](https://sanicframework.org/)
[Github](https://github.com/huge-success/sanic) stars: 14k

Sanic is an open-source asynchronous web framework for building fast web apps. It runs on Python 3.6 or newer. It was designed especially for quick HTTP responses with the help of asynchronous handlers. Sanic can handle many concurrent requests. The name Sanic is an indirect imitation of [Sonic the Hedgehog](https://en.wikipedia.org/wiki/Sonic_the_Hedgehog_%28character%29). Some features of Sanic are:

 - Cookies handling
 - Logging support (error and access logs)
 - URL routing
 - Static files support
 - Class-based views
 - Plugins are supported
 - Handlers with easy to apply decorators.

**Installation and setup**
After creating and activating a virtual environment, run:

```
$ pip install sanic
```

**minimal sanic app**
create a file `app.py` and paste the code below.

```python
from sanic import Sanic
from sanic.response import json

app = Sanic("hello_world")

@app.route("/")
async def test(request):
    return json({"Hello": "World!"})

if __name__ == "__main__":
    app.run(host="127.0.0.1", port=8800)
```

run the app by executing:

```
$ python3 app.py
```

The app is accessible from the browser on http://127.0.0.1:8800.
*Sanic is used by companies like Bonton and Herren.* [Source](https://stackshare.io/sanic)

#### 5. Bottle
[Github](https://github.com/bottlepy/bottle) stars: 6.9k

Bottle is a fast and simple micro-framework for building small web applications.  It's only dependency is the Python Standard Library. It's recommended to use Bottle with Python3.4 or newer. Features offered include:

 - URL routing
 - Template engine
 - A built-in HTTP server
 - Third party WSGI/HTTP server support

**Setup and installation**
After creating and activating a virtual environment, run:

```
$ pip install bottle
```

**A minimal Bottle app**

create a file `app.py` and paste the code below.

```python
from bottle import route, run

@route('/hello')
def hello():
    return "Hello World!"

run(host='localhost', port=8080, debug=True)

```    
run the app by executing:

```
$ python app.py
```

The app is accessible from the browser on http://127.0.0.1:8080.
### Other frameworks worth mentioning.
 - [Hug](https://www.hug.rest/)
 - [Web2py](http://www.web2py.com/)
 - [CherryPy](https://cherrypy.org/)
 - [Pyramid](https://trypyramid.com/)
 - [TurboGears](https://turbogears.org/)

### Which Python web framework is the best?
Each web framework has its pros and cons. Every developer has a different coding styles and preferences. The only way to tell the best framework is by knowing which does what better in each circumstance. But in essence, finding the best framework is close to impossible.

### Do I have to use a framework?
The choice is yours. Whether to use one or not, depends on your experience and what you want to accomplish. For beginners, a framework can be a good choice. It will help you to understand development concepts like:

 - URL routing
 - Data manipulation
 - Authentication
 - How cookies work, etc.

If you are an experienced developer, you can filter out frameworks that don't match your project requirements.

### How should I learn a framework?

 1. Choose one Python web framework and stick with it. It's not advisable to learn one framework at a time.
 2. Find and work through detailed tutorials on the framework. The official documentation **should** be the first place you search.
 3. Look and try **open source** examples built on your framework. You can remake the projects and reuse the code in your app.
 4. To help you learn, choose a project that you will work with throughout your learning process. Add functionalities and refine your code as your skills improve. **You can use this project as a future reference.**

### Conclusion
There are many Python frameworks out there. The choice of using or not using one is fully dependent on you. Knowing what type of app you want to build, you can easily choose a framework. It's not a must that you use a framework. If you don't get one that covers your needs, feel free to build one. And please make it open source, it helps us all out a lot.
