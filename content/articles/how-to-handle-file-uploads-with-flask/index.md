
### Introduction
Flask is a lightweight or micro web framework built with python that helps in creating web applications. It provides useful tools and features that make building web applications easier. Flask is extensible and doesn’t force a particular structure or require complicated boilerplate code before getting started. it gives developers flexibility.
One important feature in web applications is the ability to let users upload files. These files could be pictures, pdf, audio CSV, etc. in this article we will look at how to set up a basic flask app that will allow users to upload files.

### Prerequisites
Going through this guide it is assumed that the reader has a basic knowledge of python programming, HTML, and must have a fundamental knowledge of flask, even though this guide will be beginner-friendly.
In this guide, we will be using python 3, and VS Code text editor you can download [vscode](https://code.visualstudio.com/download) and [python](https://www.python.org/downloads/)

### Goal
We will be building a flask app that will enable users to upload files to a server, at the end of this guide it is expected that the reader will be familiar with;

- Creating and setting up a flask app 

- Activating a virtual environment 

- Enabling file uploads

### Python Virtual Environment
A virtual environment is an isolated environment for python projects, this is a module created by python called venv, it gives a developer a unique environment that enables the installation of all packages that are unique to a particular project, the virtual environment doesn’t change the default python version or default packages installed in a system, instead, it gives you freedom from the interference of other packages installed in the system, this makes it easy to run any python project in any computer irrespective of python version or packages installed in the system.
### How To Create a Virtual Environment  
The process of creating a virtual environment differs base on the operating system in this guide we will look at the process in the context of a windows operating system. follow link to see how its done on a [Mac](https://programwithus.com/learn/python/pip-virtualenv-mac) and on a [Ubuntu](https://gist.github.com/Geoyi/d9fab4f609e9f75941946be45000632b).
To start on a windows device open PowerShell and make a directory using the command 
```python   
mkdir
```
cd into the new directory
then install virtual environment using the command
```
pip install virtualenv
```
Then create the virtual environment using the command 
```
virtualenv myenv
```
Note that myenv is the name of my virtual environment it can be anything you wish
Then activate the virtual environment using the command
```python
myenv/Scripts/activate
```
If you are using CMD your command will be 
```
myenv\Scripts\activate.bat
``` 

### Creating Our Project
After activating our virtual environment we can now create our project, to do that we will make a new directory for the project. Use the below command 

```
mkdir tutorial
```
NOTE this is my project name choice yours can be anything.
To build a flask application we must install flask, to do that we will use the below command 
```
pip install flask 

```
After installation, we will create a new file with the name ```app.py```, update the file with the below code

```python
from flask import Flask

app = Flask(__name__)


@app.route('/')
def index():
    return"hello world"

if __name__==('__main__'):
    app.run(debug=True)
```
from the code above we are importing flask from the flask library we installed.

The ```@app.route``` is doing the routing for us, index is our view function which will return our page content to the browser.

The if statement return the ```app.run``` which will enable us to run our app and refresh our page whenever we save changes.

to run our app we run the below command on our terminal
```python
python app.py
```
note that ```app.py``` is the name of my app yours can be different. if everything goes well you will have a result like the one shown below.

[image1]

To upload files we will use the WTforms and the flask-uploads library. To work with this library we need to install them. do that with the code below
```
pip install flask_wtf, WTForms
```
```
pip install flask-uploads
```
after installation, we will create a file field, by updating the code to the one below 
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
from the code above we start by importing FlaskForm from flask_wtf and FileField from wtforms. Then we created a class for our form as ```Myform``` image is the file field our image files will be saved to, then we call our Form class in our index function. We changed our render to render template, this is also a flask library used for rendering HTML templates from the code we rendered ```index.html```. Now let us create the HTML template we are rendering. update the code to the one below to do that 
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
From the above code, our form takes a method ```POST``` because we will be posting a file the ```csrf_token``` is a built-in function that handles security for us, then we call our form field we created in our ```Form Class``` using ```form.image```

now we can run our app using ```python app.py``` if everything is correct you will get a runtime error like shown in the below image.

['image']

this error occurs whenever you try to use a csrf_token without adding a secret_key to your project file. let's add a secret key to our code. update your code to the one below

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
the Secret_key can be anything you want.

let's update our code to the one below.
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
our page should now look as shown in the picture below

[image file upload page]

from the code above ```form=form``` is parsed so that our form can be displayed on our HTML page. if we try to upload an image we will encounter another error as shown below

[image of not allowed error]

this error is often coursed when we don't specify a method to our route. To solve this we will add the code below to our route.

```python
@app.route('/', methods=['GET', 'POST'])
```
after adding the above code, our upload will work but it won't be saved because we didn't give it a path to save to. this is where flask uploads come into play. lets import flask-uploads
```python
from flask_uploads import configure_uploads, IMAGES, UploadSet
```
configure_uploads enable us to set the path for the image to be saved, IMAGES is the file type we are uploading.

we will update our code with,
```app.config['UPLOADED_IMAGES_DEST'] = 'uploads/images``` this will set the file path were the images will be saved, ```images = UploadSet('images', IMAGES) ``` and ```configure_uploads(app, images)``` 
saves the file extension and configure uploads 

```python
if form.validate_on_submit():
        filename = images.save(form.image.data)
        return f'Filename: {filename}'
    return render_template('index.html', form = form)
```
the above will validate and save our image file. our final code will look like the one below.

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
# Conclusion
now we can upload images. To upload other types of files all we will do is to import them through flask upload, configure their destination path, and specify their file extension. learn more about flask-uploads by clicking the link in the further reading section. link to project github [Repo](https://pythonhosted.org/Flask-Uploads/)

# Further Reading

- [flask-upload](https://pythonhosted.org/Flask-Uploads/)

- [WTForms](https://wtforms.readthedocs.io/en/2.3.x/)

- [flask Documentation for file uploads](https://flask.palletsprojects.com/en/2.0.x/patterns/fileuploads/)


