---
layout: engineering-education
status: publish
published: true
url: /how-to-handle-file-uploads-with-flask/
title: How to Handle File Uploads with Flask
description: In this tutorial, we will be building a flask app that will enable users to upload files to a server.
author: nathaniel-dauda-wobin
date: 2021-07-26T00:00:00-12:59
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/how-to-handle-file-uploads-with-flask/hero.jpg
    alt: How to Handle File Uploads with Flask Hero Image
---

### Introduction
Flask is a lightweight or micro web framework built with Python that helps in creating web applications. It provides useful tools and features that make building web applications easier. Flask is extensible and doesn’t force a particular structure or require complicated boilerplate code before getting started. It gives developers flexibility.
One important feature in web applications is the ability to let users upload files. These files could be pictures, PDF, audio CSV, etc. In this article, we will look at how to set up a basic flask app that will allow users to upload files.

### Prerequisites
Going through this guide, it is assumed that the reader has a basic knowledge of Python programming language, HTML, and must have a fundamental knowledge of flask; even though this guide will be beginner-friendly.
In this guide, we will be using python 3, and VS Code text editor you can download [vscode](https://code.visualstudio.com/download) and [python](https://www.python.org/downloads/)

### Goal
We will be building a flask app that will enable users to upload files to a server. At the end of this guide, it is expected that the reader will be familiar with:

- Creating a virtual environment 
- Activating a virtual environment
- Setting up a flask app  
- Enabling file uploads

### Python Virtual Environment
A virtual environment is an isolated environment for Python projects. There is a module created by python called venv which gives a developer a unique environment that enables the installation of all packages that are unique to a particular project. The virtual environment doesn’t change the default Python version or default packages installed in a system, instead, it gives you freedom from the interference of other packages installed in the system. This makes it easy to run any Python project on any computer irrespective of the Python version or packages installed in the system.
### How To Create a Virtual Environment  
The process of creating a virtual environment differs based on the operating system. In this guide, we will look at the process in the context of a windows operating system. follow the link to see how it's done on a [Mac](https://programwithus.com/learn/python/pip-virtualenv-mac) and on a [Ubuntu](https://gist.github.com/Geoyi/d9fab4f609e9f75941946be45000632b).
To start, on a windows device open PowerShell and make a directory using the command below: 
```python   
mkdir
```
Get into the new directory using the `cd directory-name` then install the virtual environment using the command:
```
pip install virtualenv
```
Then create the virtual environment using the command: 
```
virtualenv myenv
```
Note that `myenv` is the name of my virtual environment it can be any name you wish. Next, activate the virtual environment using the command:
```python
myenv/Scripts/activate
```
If you are using the command-line interface (CMD) your command will be as below: 
```
myenv\Scripts\activate.bat
``` 

### Creating Our Project
After activating our virtual environment, we can now create our project. To do that, we will make a new directory for the project. Use the below command below:

```
mkdir tutorial
```
> NOTE: `tutorial` is my project's name. You can give yours any name you like.
To build a flask application, we must install flask. To do that, we will use the below command: 
```
pip install flask 

```
After installation, we will create a new file with the name ```app.py```, update the file with the below code:

```python
from flask import Flask

app = Flask(__name__)


@app.route('/')
def index():
    return"hello world"

if __name__==('__main__'):
    app.run(debug=True)
```
From the code above we are importing flask from the flask library we installed.

The `@app.route` is doing the routing for us.

The `index()` is our view function which will return our page content to the browser.

The if statement return the `app.run` which will enable us to run our app then refresh our page whenever we save changes. To run our app we run the below command on our terminal.
```python
python app.py
```
Note that `app.py` is the name of my app yours can be different. If everything goes well you will have a result like the one shown below.

![App running](/engineering-education/how-to-handle-file-upload-in-flask/image1.PNG)

To upload files, we will use the `WTforms` and the `flask-uploads` libraries. To work with these libraries we need to install them. Do that with the command below:
```
pip install flask_wtf, WTForms
```
```
pip install flask-uploads
```
After installation, we will create a file field, by updating the code to the one below: 
```python 
from flask import Flask, render_template
from flask_wtf import FlaskForm
from wtforms import FileField

app = Flask(__name__)

class MyForm(FlaskForm):
    image = FileField('image')

@app.route('/')
def index():
    form = MyForm()
    return render_template('index.html')

if __name__==('__main__'):
    app.run(debug=True)
```
From the code above, we start by importing `FlaskForm` from `flask_wtf` and `FileField` from `wtforms`. Next, we created a class for our form as `Myform` image is the file field our image files will be saved to. We call our Form class in our `index function`. We changed our `render` to `render template`. This is also a flask library used for rendering HTML templates. From the code we rendered `index.html`. When we use render_template in Flask we create a folder called templates where we store the HTML files. Now let us create the HTML template we are rendering, inside our templates folder. Update the html file with the code below: 
```python
!doctype html>
<html>
  <head>
    <title>File Upload</title>
  </head>
  <body>

    <form action="/" method="POST" enctype="multipart/form-data">
        {{ form.csrf_token }}
        {{ form.image }}
        <button type="submit">upload</button>
    </form>
  </body>
</html>
```
From the above code, our form takes a method `POST` because we will be posting a file the `csrf_token` is a built-in function that handles security for us, then we call our form field we created in our `Form Class` using `form.image`. Now we can run our app using `python app.py`. If everything is correct you will get a runtime error like shown in the below image.

![RuntimeError](/engineering-education/how-to-handle-file-upload-in-flask/image2.PNG)

This error occurs whenever you try to use a `csrf_token` without adding a `secret_key` to your project file. Let's add a `secret key` to our code. Update your code to the one below:

```python 
from flask import Flask, render_template
from flask_wtf import FlaskForm
from wtforms import FileField

app = Flask(__name__)

app.config['SECRET_KEY'] = 'mysecretkey'

class MyForm(FlaskForm):
    image = FileField('image')

@app.route('/')
def index():
    form = MyForm()
    return render_template('index.html')

if __name__==('__main__'):
    app.run(debug=True)
```
the `secret_key` can be anything you want. Let's update our code to the one below:
```python
from flask import Flask, render_template
from flask_wtf import FlaskForm
from wtforms import FileField

app = Flask(__name__)

app.config['SECRET_KEY'] = 'mysecretkey'

class MyForm(FlaskForm):
    image = FileField('image')

@app.route('/')
def index():
    form = MyForm()
    return render_template('index.html', form = form)

if __name__==('__main__'):
    app.run(debug=True)
```
Our page should now look as shown in the picture below:

![App running](/engineering-education/how-to-handle-file-upload-in-flask/image3.PNG)

From the code above, `form=form` is parsed so that our form can be displayed on our HTML page. If we try to upload an image, we will encounter another error as shown below:

![Method Not Allowed](/engineering-education/how-to-handle-file-upload-in-flask/image4.PNG)

This error is often thrown when we don't specify a method to our `route`. To solve this, we will add the code below to our route.

```python
@app.route('/', methods=['GET', 'POST'])
```
After adding the above code, our upload will work but it won't be saved because we didn't give it a path to save to. this is where `flask uploads` come into play. let's import `flask-uploads` using the command:
```python
from flask_uploads import configure_uploads, IMAGES, UploadSet
```
`configure_uploads` enable us to set the path for the image to be saved, `IMAGES` is the file type we are uploading.

We will update our code with:
```app.config['UPLOADED_IMAGES_DEST'] = 'uploads/images``` this will set the file path were the images will be saved, ```images = UploadSet('images', IMAGES) ``` and ```configure_uploads(app, images)``` 
saves the file extension and configure uploads 

```python
if form.validate_on_submit():
        filename = images.save(form.image.data)
        return f'Filename: {filename}'
    return render_template('index.html', form = form)
```
The above snippet will validate and save our image file. Our final code will look like the one below:

```python
from flask import Flask, render_template
from flask_wtf import FlaskForm
from wtforms import FileField
from flask_uploads import configure_uploads, IMAGES, UploadSet

app = Flask(__name__)

app.config['SECRET_KEY'] = 'thisisasecret'
app.config['UPLOADED_IMAGES_DEST'] = 'uploads/images'

images = UploadSet('images', IMAGES)
configure_uploads(app, images)


class MyForm(FlaskForm):
    image = FileField('image')

@app.route('/', methods=['GET', 'POST'])
def index():
    form = MyForm()
    if form.validate_on_submit():
        filename = images.save(form.image.data)
        return f'Filename: {filename}'
    return render_template('index.html', form = form)

if __name__==('__main__'):
    app.run(debug=True)
```
After uploading file, the file name will be return as seen in the image below:

![File Uploaded](/engineering-education/how-to-handle-file-upload-in-flask/image5.PNG)

# Conclusion
Now we can upload images. To upload other types of files all we will do is to import them through flask upload, configure their destination path, and specify their file extension. Learn more about flask-uploads by clicking the link in the further reading section. Link to project Github [Repo](https://github.com/wobin1/how-to-handle-file-upload-in-flask)

# Further Reading

- [flask-upload](https://pythonhosted.org/Flask-Uploads/)

- [WTForms](https://wtforms.readthedocs.io/en/2.3.x/)

- [flask Documentation for file uploads](https://flask.palletsprojects.com/en/2.0.x/patterns/fileuploads/)

---
Peer Review Contributions by: [Jerim Kaura](/engineering-education/authors/jerim-kaura/)
