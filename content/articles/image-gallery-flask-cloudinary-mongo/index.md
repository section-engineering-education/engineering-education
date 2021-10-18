---
layout: engineering-education
status: publish
published: true
url: /image-gallery-flask-cloudinary-mongo/
title: Building a CDN Image Gallery with Flask, Cloudinary, and MongoDB
description: A content delivery network (CDN) allows for the quick transfer and retrieval of web assets by distributing them to geographically distant servers that work together to provide required content to end-users.
author: onojakpor-ochuko
date: 2021-10-18T00:00:00-09:36
topics: [Languages]
excerpt_separator: <!--more-->
images:
  - url: /engineering-education/image-gallery-flask-cloudinary-mongo/hero.jpg
    alt: Building a CDN Image Gallery with Flask, Cloudinary, and MongoDB
---

A content delivery network (CDN) allows for the quick transfer and retrieval of web assets by distributing them to geographically distant servers that work together to provide required content to end-users.
<!--more-->
### Introduction

Content delivery networks (CDNs) work by hosting files (images, videos, HTML pages, stylesheets, JavaScript files, etc.) in many servers spread across the globe. When a user requests the file, the CDN loads it from the server closest to the user location (among other optimizations), reducing latency in fetching the assets and improving content availability.

In this article, you will learn:

- Benefits of using content delivery networks (CDNs).
- How to build CRUD applications with Flask and MongoDB.
- How to integrate Cloudinary services into a Python application.

### Prerequisites

To follow and fully understand this tutorial, you will need to have:

- Working knowledge of Python and Flask.
- Python 3.6 or newer installed on your machine.
- A Python development environment (IDE, text editor).
- MongoDB installed on your machine.

### Benefits of Content Delivery Networks (CDNs)

#### Reduction in Website Loading Time

Since CDNs fetch their assets from a server close to the user (among many other optimization techniques), making websites faster for visitors.

#### Improved Content Availability and Redundancy

CDNs share their files to multiple servers simultaneously, so you are sure server files are available at any time, even if there’s a server outage. CDNs can also manage large amounts of traffic and withstand hardware failure better than the origin server.

#### Improved Website Security

CDNs improve websites’ safety by providing [DDoS attack](https://www.section.io/engineering-education/denial-of-service/) mitigation, improving server security certificates, and other optimizations.

#### Reduction of Server Bandwidth

CDN assets are on multiple servers. This reduces the amount of data the origin server has to load and cache. It also lowers hosting costs incurred from bandwidth consumption.

### Building the Image Gallery with Flask and MongoDB

In this tutorial, you will build an image gallery with Flask and MongoDB that integrates a CDN with [Cloudinary](https://cloudinary.com/documentation/cloudinary_get_started). Create the backend with [Flask](https://flask.palletsprojects.com/en/1.1.x/), database with [Flask-PyMongo](https://flask-pymongo.readthedocs.io/en/latest/), and user interface with [Flask-Bootstrap](https://pypi.org/project/Flask-Bootstrap4/).

You will build three webpages for the image gallery. They are:

1. Index/Landing Page
2. Upload Image Page
3. View Gallery Page

- Flask is a Python web framework that allows you to build basic and complex applications quickly and easily.

- Flask-Bootstrap is a Flask extension that allows you to integrate [Bootstrap](https://getbootstrap.com/) into a web application effortlessly.

- Flask-PyMongo is a Flask extension that bridges the gap between Flask and [PyMongo](https://pymongo.readthedocs.io/en/stable/), providing Flask applications with the functionalities to integrate MongoDB easily.

#### Step 1: Installing the App Requirements

Install the libraries required to build the image gallery like Flask, PyMongo, and Flask-Bootstrap. In your terminal, type:

```sh
pip install Flask Flask-PyMongo Flask-Bootstrap4
```

#### Step 2: Setting Up the Flask Server

Create a file with the name `app.py` and save the following code in it:

```python
from flask import *
from flask_bootstrap import Bootstrap

app = Flask(__name__)
Bootstrap(app)

@app.route("/")
def index():
    return "Hello World!"

if __name__ == "__main__":
    app.run(debug=True)
```

When you run the `app.py` file and open your browser, you will get a response similar to the image below:

![terminal view](/engineering-education/image-gallery-flask-cloudinary-mongo/terminal-view.png)

![browser view](/engineering-education/image-gallery-flask-cloudinary-mongo/browser-view.png)

#### Step 3: Design the Landing Page

The landing page is where your users see your application’s information with navigation links to various routes in the app.

First, create a folder named `templates` in the same folder as your `app.py`. Flask uses a `templates` folder to store the HTML files that the server renders in the application. Your project folder should resemble the image below:

![project structure](/engineering-education/image-gallery-flask-cloudinary-mongo/
project-structure.png)

Create another file named `index.html` that will be stored in the `templates` folder and save the following code in it:

```html
{% extends "bootstrap/base.html" %} {% block content %}
<div class="container">
  <div class="row justify-content-center">
    <div class="col-lg-12">
      <div class="jumbotron text-center p-4">
        <h2>Cloudinary Image Management Demo</h2>
      </div>
    </div>
    <div class="col-lg-9 text-center">
      <h5>
        This is a Python + Flask demo application to showcase Cloudinary's
        comprehensive APIs and administration capabilities.
      </h5>
    </div>
    <div class="col-lg-7 text-center">
      <a href="{{ url_for('upload') }}" class="btn btn-primary m-3"
        >Upload Images</a
      >
      <a href="{{ url_for('gallery') }}" class="btn btn-primary m-3"
        >Image Gallery</a
      >
    </div>
  </div>
</div>
{% endblock %}
```

You need to update the `app.py` file to implement the upload and gallery routes referenced on the landing page. Update the `app.py` file with the code below:

```python
@app.route("/")
def index():
    return render_template("index.html")


@app.route("/gallery/")
def gallery():
    return "Gallery Page!"


@app.route("/upload/")
def upload():
    return "Upload Page!"
```

When you run the `app.py` file, you will get a response similar to the image below in your browser:

![landing page](/engineering-education/image-gallery-flask-cloudinary-mongo/landing-page.png)

#### Step 4: Build the Image Upload Functionality

The image upload page is where your users submit images to the application’s database to update the image gallery.

First, you need to update the `upload` route in the `app.py` file to render the upload page template; update the `upload` route with the code below:

```python
@app.route("/upload/")
def upload():
    return render_template("upload.html")
```

Create another file named `upload.html` that will be stored in the `templates` folder and save the following code in it:

```html
{% extends "bootstrap/base.html" %} {% block content %}
<div class="container">
  <div class="row justify-content-center">
    <div class="col-lg-12">
      <div class="jumbotron text-center p-4">
        <h2>Cloudinary Image Management Demo</h2>
      </div>
    </div>
    <div class="col-lg-6 text-center">
      {% with messages = get_flashed_messages(with_categories=true) %} {% if
      messages %} {% for category, message in messages %}
      <div class="alert alert-{{ category }}" role="alert">{{ message }}</div>
      {% endfor %} {% endif %} {% endwith %}
      <form method="POST" enctype="multipart/form-data">
        <div class="form-group">
          <label for="image">Choose Image</label>
          <input
            type="file"
            class="form-control-file"
            id="image"
            name="image"
            accept="image/*"
            required
          />
        </div>
        <div class="form-group">
          <label for="description">Image Description</label>
          <textarea
            class="form-control"
            id="description"
            name="description"
            rows="4"
            required
          ></textarea>
        </div>
        <div class="text-center">
          <button type="submit" class="btn btn-primary m-3">
            Upload Image
          </button>
          <a href="{{ url_for('index') }}" class="btn btn-primary m-3"
            >Go Home</a
          >
        </div>
      </form>
    </div>
  </div>
</div>
{% endblock %}
```

When you run the `app.py` file, your upload page should resemble the image below:

![upload page](/engineering-education/image-gallery-flask-cloudinary-mongo/upload-page.png)

You need to import the necessary libraries required by the application. Update the `app.py` file imports with the code below:

```python
import os
from flask_pymongo import PyMongo
from werkzeug.utils import secure_filename
```

You need to configure the application configurations (database, secret key, upload folder, accepted image formats). Update the `app.py` file with the code below:

```python
app.config["SECRET_KEY"] = "SECRET_KEY"
app.config["UPLOAD_FOLDER"] = "static/uploads/"
app.config["MONGO_DBNAME"] = "gallery"
app.config["MONGO_URI"] = "mongodb://localhost:27017/gallery"

mongo = PyMongo(app)
ALLOWED_EXTENSIONS = ["png", "jpg", "jpeg", "gif"]
```

Next, update the `upload` route to save the server’s uploaded images and record them in the database. Update the `app.py` file with the code below:

```python
@app.route("/upload/", methods=["GET", "POST"])
def upload():
    if request.method == "POST":
        image = request.files["image"]
        description = request.form.get("description")
        if image and description and image.filename.split(".")[-1].lower() in ALLOWED_EXTENSIONS:
            filename = secure_filename(image.filename)
            image.save(os.path.join(app.config["UPLOAD_FOLDER"], filename))

            mongo.db.gallery.insert_one({
                "filename": filename,
                "description": description.strip()
            })

            flash("Successfully uploaded image to gallery!", "success")
            return redirect(url_for("upload"))
        else:
            flash("An error occurred while uploading the image!", "danger")
            return redirect(url_for("upload"))
    return render_template("upload.html")
```

> Note that you need to create the directory you specified for the app `UPLOAD_FOLDER` in the project’s root.

Create a `static` directory in the same directory as the `app.py` file and another folder called `uploads` in the `static` directory.

![successful upload page](/engineering-education/image-gallery-flask-cloudinary-mongo/successful-upload.png)

#### Step 5: Build the Gallery Viewing Page

The gallery viewing page lets your users view and browse through the images in the application’s database.

First, update the `gallery` route in the `app.py` file to render the gallery page template and then update the `gallery` route with the code below:

```python
@app.route("/gallery/")
def gallery():
    return render_template("gallery.html", gallery=mongo.db.gallery.find())
```

Create another file named `gallery.html` that will be stored in the `templates` folder and save the following code in it:

```python
{% extends "bootstrap/base.html" %}

{% block content %}
<div class="container">
  <div class="row justify-content-center">
    <div class="col-lg-12 text-center">
      <div class="jumbotron text-center p-4">
        <h2>Cloudinary Image Management Demo</h2>
      </div>
      <a href="{{ url_for('index') }}" class="btn btn-primary m-3">Go Home</a>
    </div>
    {% for i in gallery %}
    <div class="col-lg-4">
      <div class="card">
        <img class="card-img-top" src="{{ url_for('static', filename='uploads/' + i.filename) }}">
        <div class="card-body">
          <p class="card-text">{{ i.description }}</p>
        </div>
      </div>
    </div>
    {% endfor %}
  </div>
</div>
{% endblock %}
```

When you run the `app.py` file, your gallery page should resemble the image below:

![gallery page](/engineering-education/image-gallery-flask-cloudinary-mongo/gallery-page.png)

### Integrating Cloudinary into a Flask Application

#### Generating Cloudinary API Keys

You need to generate your API keys from your Cloudinary dashboard. If you don’t have a Cloudinary account before now, create one on [Cloudinary’s website](https://cloudinary.com/users/register/free).

The dashboard will provide you with your CLOUD NAME, API KEY, and API SECRET. Store them somewhere secure and easily retrievable. The API keys allow any application to communicate with your Cloudinary account via the REST API.

![cloudinary keys](/engineering-education/image-gallery-flask-cloudinary-mongo/cloudinary-keys.png)

#### Integrating Cloudinary into Python

Install the Cloudinary Python SDK required to communicate with Cloudinary APIs using Python. In your terminal, type:

```sh
pip install cloudinary
```

You need to import the Cloudinary library so you can use it in your application. Update the `app.py` file imports with the code below:

```python
import cloudinary
import cloudinary.uploader
```

You need to configure the Cloudinary library with your API keys. Update the `app.py` file with the code below and update the appropriate placeholders with the correct information:

```python
cloudinary.config(
    cloud_name="CLOUDINARY CLOUD NAME",
    api_key="CLOUDINARY API KEY",
    api_secret="CLOUDINARY API SECRET"
)
```

Next, update the `upload` route to save the server’s uploaded images to Cloudinary. Update the `app.py` file with the code below:

```python
@app.route("/upload/", methods=["GET", "POST"])
def upload():
    if request.method == "POST":
        image = request.files["image"]
        description = request.form.get("description")
        if image and description and image.filename.split(".")[-1].lower() in ALLOWED_EXTENSIONS:
            upload_result = cloudinary.uploader.upload(image)
            mongo.db.gallery.insert_one({
                "url": upload_result["secure_url"],
                "description": description.strip()
            })

            flash("Successfully uploaded image to gallery!", "success")
            return redirect(url_for("upload"))
        else:
            flash("An error occurred while uploading the image!", "danger")
            return redirect(url_for("upload"))
    return render_template("upload.html")
```

Update the `gallery.html` template file to render the gallery images from the provided Cloudinary URLs instead of the `UPLOAD_FOLDER`. Update the `gallery.html` file with the code below:

```html
{% extends "bootstrap/base.html" %} {% block content %}
<div class="container">
  <div class="row justify-content-center">
    <div class="col-lg-12 text-center">
      <div class="jumbotron text-center p-4">
        <h2>Cloudinary Image Management Demo</h2>
      </div>
      <a href="{{ url_for('index') }}" class="btn btn-primary m-3">Go Home</a>
    </div>
    {% for i in gallery %}
    <div class="col-lg-4">
      <div class="card">
        <img class="card-img-top" src="{{ i.url }}" />
        <div class="card-body">
          <p class="card-text">{{ i.description }}</p>
        </div>
      </div>
    </div>
    {% endfor %}
  </div>
</div>
{% endblock %}
```

> NOTE: Since the application now stores images in Cloudinary, it is safe to completely delete the previous `UPLOAD_FOLDER` directory and remove all imports used by the local storage uploading.

Congratulations! You have successfully built a CDN image gallery with Flask, Cloudinary, and MongoDB. The images rendered on the gallery page should be fetched from Cloudinary CDN servers instead of your origin server, as shown in the image below:

![cloudinary path](/engineering-education/image-gallery-flask-cloudinary-mongo/cloudinary-path.png)

### Conclusion

This article introduced you to content delivery networks (CDN), discussed the benefits of using them in an application, and built a Flask application that implements Cloudinary comprehensive APIs and administration capabilities.

Looking to build the demo application further, check out example code, or improve its functionality? Visit the [GitHub Repo](https://github.com/LordGhostX/cloudinary-flask).

Happy coding!

---

Peer Review Contributions by: [Daniel Katungi](/engineering-education/authors/daniel-katungi/)
