---
layout: engineering-education
status: publish
published: true
url: /python-frameworks/
title: A look at Python web development frameworks
description: What is a web framework, types of frameworks, 5 most used frameworks, installation, and a minimal app in each. Which Python web framework is the best fit.
author: geoffrey-mungai
date: 2020-08-21T00:00:00-10:00
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/python-frameworks/hero.jpg
    alt: Python example image
---
Many people nowadays use web frameworks to develop web apps. Using frameworks is better than using raw Python. They automate many things like database connections and management, authorization, and URL routing.

In this article, we will be exploring what framework you should use? Which is the best framework? Should you even use a framework? We are going to be looking at this and more.
<!--more-->

### What is a Python web framework?
A Python web framework is a set of Python packages and modules that support web development. They prevent the developer from having to manage low-level details such as protocols, process management, or sockets. Many frameworks are server-side technologies. With the increasing commonness of AJAX, some of them have started using AJAX to integrate client-side operations. The end product is a web app with a backend and a frontend bundled together.
Some of the activities supported by frameworks are:

- Reading and writing cookies
- Sessions management
- Processing requests and returning responses
- Database management

### Types of Web Frameworks.
There are 3 main types of web frameworks:

 1. **Full-stack Frameworks** - These are frameworks that can build a web app with both a backend and a frontend. They may have an HTTP application server, a database, a template engine, an authentication module, and an AJAX toolkit.

 2. **Micro Frameworks** or non-full stack - These are frameworks designed for the development of small web apps. They provide fewer features than full-stack frameworks. A developer has to add code manually for things to work. They are usually used by experienced Python developers.

 3. **Asynchronous Frameworks** - It is the most recent type of Python framework. It is a microframework that can handle many simultaneous connections.

### Popular Web Frameworks.
#### 1. [Django](https://www.djangoproject.com/)
[Github](https://github.com/django/django) stars: 51.3k

Django is a full-stack Python web framework, developed by Django Software Foundation. It was released in 2005 as an open-source framework. It emphasizes on the DRY (don't repeat yourself) concept of software development. It comes with the support of many Python libraries. It also comes with Django ORM which is the built-in object-relational mapper. Some of the main features offered by Django are:

 1. Authentication
 2. URL routing
 3. Jinja2 template engine
 4. Database schema migrations

Django comes with an SQLite database out of the box. It's advised to use Django with Python3. *It is used by some [tech giants](https://stackshare.io/django) like Instagram, Pinterest, and GoDaddy.*


### Setup and Installation
**Create a virtual environment**
Make sure any version of **python3** is installed on your computer. If not [download it](https://www.python.org/downloads/) for your system. Run this command in the command line.

```
$ python3 -m venv virtual && source virtual/bin/activate
```

Virtual here is the name of the virtual environment.
**Install Django**

```
$ pip3 install Django
```

This will install the latest Django version available. You can give it any name you'd like.
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

This fires up the app and can be accessed in a browser via http://127.0.0.1:8000/ by default. On getting started with writing Django apps, click [here](https://www.djangoproject.com/start/).

#### 2. [Flask](https://flask.palletsprojects.com/)
[Github](https://github.com/pallets/flask) stars: 51.6k

Flask is a micro-framework built on the Werkzeug library and Jinja2 template engine. It comes with unit testing support out of the box. Its features include:

 - A built-in HTTP server and debugger
 - The server is WSGI compliant
 - Jinja2 template engine
 - URL routing
 - Cookie handling
 - Different databases support
 - RESTful request dispatching

Flask is recommended to be used with Python3.5 or newer.

**Installation and setup**
Create a project folder, create and initialize a virtual environment. Look at the how to make one in the Django section. After activation, run:

```
$ pip3 install Flask
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
$ python3 app.py
```

The app can be accessed using a browser on http://127.0.0.1:5000.
*Netflix, Mozilla, Uber, and Samsung are some companies [using Flask](https://stackshare.io/flask)*.


#### 3. [Tornado](https://www.tornadoweb.org/)
[Github](https://github.com/tornadoweb/tornado) stars: 19.4k

Tornado is a full-stack Python web framework and asynchronous networking library. It is used to build apps that expect many long-lived connections to users. Some features offered by Tornado are:

 - Authentication
 - Third-party authentication app support. It can be used to build apps that support *sign in with Google, Facebook, Twitter, etc.*
 - Streaming services support
 - Built-in template engine

**Installation and Setup**
After creating and activating a virtual environment, run:

```
$ pip3 install tornado
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
	app.listen(8008)
	tornado.ioloop.IOLoop.current().start()
```

Run the app by executing the command:

```
$ python3 app.py
```

The app is accessible from the browser on http://127.0.0.1:8008.
*Facebook and Delivery Hero are some of the companies [using Tornado](https://stackshare.io/tornado).*

#### 4. [Sanic](https://sanicframework.org/)
[Github](https://github.com/huge-success/sanic) stars: 14k

Sanic is an open-source asynchronous web framework for building fast web apps. It runs on Python 3.6 or newer. It was designed particularly for fast hypertext transfer protocol responses with the assistance of asynchronous handlers. Sanic can handle many concurrent requests. The name Sanic is an indirect imitation of [Sonic the Hedgehog](https://en.wikipedia.org/wiki/Sonic_the_Hedgehog_%28character%29). Some features of Sanic include:

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
$ pip3 install sanic
```

**Minimal sanic app**
Create a file `app.py` and paste the code below.

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

Run the app by executing:

```
$ python3 app.py
```

The app is accessible from the browser on http://127.0.0.1:8800.
*Sanic is used by [companies like](https://stackshare.io/sanic) Bonton and Herren.*


#### 5. Bottle
[Github](https://github.com/bottlepy/bottle) stars: 6.9k

Bottle is a fast and simple micro-framework for building small web applications.  Apart from the Python Standard Library, Bottle has no other dependency. It's recommended to use Bottle with Python3.4 or newer. Bottle features include:

 - URL routing
 - Template engine
 - A built-in HTTP server
 - Third-party WSGI/HTTP server support

**Setup and installation**
After creating and activating a virtual environment, run:

```
$ pip3 install bottle
```

**A minimal Bottle app**

Create a file `app.py` and paste the code below.

```python
from bottle import route, run

@route('/hello')
def hello():
    return "Hello World!"

run(host='localhost', port=2000, debug=True)

```    
Run the app by executing:

```
$ python3 app.py
```

The app is accessible from the browser on http://127.0.0.1:2000.
### Other frameworks worth mentioning.
 - [Hug](https://www.hug.rest/)
 - [Web2py](http://www.web2py.com/)
 - [CherryPy](https://cherrypy.org/)
 - [Pyramid](https://trypyramid.com/)
 - [TurboGears](https://turbogears.org/)

### Which Python web framework is the best?
Each web framework has varying features, and come with their own pros and cons. Every developer has a unique coding style and inclination. The only way to tell which is the best framework is by knowing what framework performs or works better in each circumstance. In essence, finding the best framework is close to impossible and depends on the use case and situation.

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
 4. To help you learn, choose a project that you will work with throughout your learning process. Add functionalities and refine your code as your skills improve. **You can use that project as a future reference.**

### Conclusion
There are many Python frameworks out there. The choice of using or not using one is fully dependent on you. Knowing what type of app you want to build, you can easily choose a framework. It's not a must that you use a framework. If you don't get one that covers your needs, feel free to build one. And please make it open source, it'll help us all out a lot.
