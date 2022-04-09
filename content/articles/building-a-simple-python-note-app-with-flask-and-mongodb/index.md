---
layout: engineering-education
status: publish
published: true
url: /building-a-simple-python-note-app-with-flask-and-mongodb/
title: Building a Python Note Application Using Flask and MongoDB
description: This tutorial will help readers build a Python note application using Flask framework and MongoDB. Flask is designed to make it easy to get a simple application up and running.
author: joseph-chege
date: 2021-09-16T00:00:00-13:20
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/building-a-simple-python-note-app-with-flask-and-mongodb/hero.jpg
    alt: Python Notes App With Flask and MongoDB Hero Image
---
Python is a very easy-to-learn language due to its user-friendly syntax. Moreover, Python has many open-source libraries, and almost every use case of Python has an existing library for that.
<!--more-->
Python has several web application frameworks such as Django and Flask. Flask is an open-source, lightweight, Python web application framework.

Flask is designed to make it easy to get a simple application up and running.

We will use MongoDB as the database. MongoDB is a cross-platform, document-oriented database platform. It uses JSON objects as its data tuples.

When working with a web application, you might not know the exact data format being sent. In such cases, a NoSQL database such as MongoDB would be a good solution for data handling and storage.

In this article, we will create a simple note application using Flask and MongoDB.

### Prerequisites
To follow along with this article, the following basic information will be essential:
- Basic knowledge of working with Python.
- [Python](https://www.python.org/downloads/) installed on your computer.
- [MongoDB](https://docs.mongodb.com/manual/administration/install-community/) installed on your computer.
- [Pip](https://pypi.org/project/pip/) installed on your computer.

### Setting up the Flask application
We will use [virtualenv](https://pypi.org/project/virtualenv/) to set up the application. Virtualenv is a tool for creating standalone Python environments. It prevents global installation of dependencies that are only used in a single application.

Run the command below to install virtualenv:

```bash
pip install virtualenv
```

To test whether virtualenv is correctly installed, run the following command:

```bash
virtualenv --version
```

To start, run the following command in the project folder where you want the project to reside:

```bash
virtualenv venv
```

If the environment is not activated automatically by having the name of your project folder on the left side, then run the following command to activate it:

```bash
source venv/bin/activate
```

Once activated, we need two dependencies:
- flask - It is essential for setting up the web resource.
- PyMongo - This will form the infrastructure from MongoDB to our application.

To install the dependencies, use the command below:

```bash
pip install flask PyMongo
```

### Setting up MongoDB
To begin setting up MongoDB in our application, we need to create an `app.py` file at the project root folder. This will be our main file.

In this `app.py` file, add the following block of code:

```python
from flask import Flask
from flask_pymongo import PyMongo

app = Flask(__name__)
app.config["MONGO_URI"] = "mongodb://localhost:27017/flaskCrashCourse"
mongo = PyMongo(app)

if __name__ == "__main__":
    app.run(debug=True)
```

Here, we have done basic configuration for a basic Flask app. We;
- Have imported the necessary packages.
- Set up the main `app` variable.
- Initialized an instance of `PyMongo`.
- Started the app in `debug` mode. This means that each change we make to the app will be reloaded automatically.

To test this, run the command below:

```bash
python3 app.py
```

The command above will start the application. You can access it from port number 5000; i.e. `http://localhost:5000`. For now, you will get a `Not Found` message since we have not defined any route.

Let us get to that in the next step.

### Setting up the routes
First, let us import the `request` module from `flask`:

```python
from flask import request, Flask
```

We will have four routes:
- Route for fetching notes.
- Route for adding a note.
- Route for editing a note.
- Route for deleting a note.

Let us start by adding the route for fetching notes. This will be the home page.

Add the following in your `app.py` file:

```python
@app.route('/')
def home():
    return "<p>The home page</p>"
```

Whenever one visits the home page (/), the decorator will execute the function below, which returns a paragraph.

Let us do the same for the `add-note` route, `edit-note` route, and `delete-note` route by adding the following code:

```python
@app.route('/add-note', methods=['GET','POST'])
def addNote():

    if(request.method == "GET"):

        return "<p>Add note page</p>"

    elif (request.method == "POST"):
        # logic for adding a note

@app.route('/edit-note', methods=['GET','POST'])
def editNote():

    if(request.method == "GET"):

        return "<p>Edit note page</p>"

    elif (request.method == "POST"):
        #logic for editing a note

@app.route('/delete-note', methods=['POST'])
def deleteNote():

    # logic for deleting a note
```

The `add-note` route accepts two methods; `GET` notes while a user visits that page, and `POST` when a user submits a filled form containing details of a new note.

Same applies to `edit-note`; `GET` when the user visits the page, and `POST` when the user submits a form on the page.

At this point, we are only returning paragraphs for the pages. We need to return more visual content and handle the commented logic for the routes that do not return pages. We do this in the next step.

### Adding logic and templates to the routes
First, we will import the `render_template` and `redirect` module from `flask`:

```python
from flask import request,Flask,render_template,redirect
```

As the name suggests, `render_template` will load an `HTML` template file, and `redirect` will be called when redirecting from one route to another, particularly those that do not return pages.

#### Working on the templates
In the project root folder, create a folder and name it `templates`. Inside the folder, create a `base.html` file and add the following code:

```html
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<meta http-equiv="X-UA-Compatible" content="IE=edge" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<link
			rel="stylesheet"
			href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"
			integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm"
			crossorigin="anonymous"
		/>

		<title>{% block title%} {% endblock %}</title>
	</head>
	<body>
		<nav class="navbar navbar-expand-lg navbar-light bg-light">
			<a class="navbar-brand" href="#">Notes app</a>
			<div class="collapse navbar-collapse" id="navbarSupportedContent">
				<ul class="navbar-nav mx-auto">
					<li class="nav-item {{ 'active' if homeIsActive == True }}">
						<a class="nav-link" href="/">Home</a>
					</li>
					<li class="nav-item {{ 'active' if addNoteIsActive == True }}">
						<a class="nav-link" href="/add-note">Add note</a>
					</li>
				</ul>
			</div>
		</nav>
		{% block content %} {% endblock %}
		<footer>
			<hr />
			<p class="text-center">Notes app</p>
		</footer>
	</body>
</html>
```

To enhance code reusability, all templates will be loaded from one base file. Furthermore, since Flask uses [Jinja](https://jinja.palletsprojects.com/en/3.0.x/) for templating, dynamic content will be loaded on each page.

According to the file above, only the `title` and the `body content` will be different for each page, and that is pretty much what we want in our simple application.

#### The home page route
In the templates folder, create a `pages` folder. Inside, create a `home.html` file and add the code below:

```html
{% extends 'base.html'%} {% block title %} Home {% endblock %} {% block content
%}
<div class="container mt-5 mb-5 px-10 ">
	<div class="row">
		{% if (notes is defined) and notes %} {% for note in notes %}
		<div class="col-md-6 offset-md-3 mb-2 ">
			<div class="card">
				<div class="card-body">
					<p class="card-text text-muted">
						{{ note['createdAt'].strftime('%Y-%m-%d') }}
					</p>
					<h4 class="card-title">{{ note['title'] }}</h4>
					<p class="card-text">{{ note['description'] }}</p>
					<div class="d-flex justify-content-between">
						<a href="/edit-note?form={{ note['_id'] }}" class="btn btn-primary">
							Edit
						</a>
						<form method="POST" action="/delete-note">
							<input type="hidden" name="_id" value="{{ note['_id'] }}" />
							<button type="submit" class="btn btn-danger">Delete</button>
						</form>
					</div>
				</div>
			</div>
		</div>
		{% endfor %} {% else %}
		<div class="col-md-6 offset-md-3 text-center">
			<h4>You have not added any notes</h4>
			<a href="/add-note" class="btn btn-primary"> Add note </a>
		</div>
		{% endif %}
	</div>
</div>
{% endblock %}
```

In the file above, we are:
- Extending the base file we had created previously.
- Setting the title of the page.
- Setting the body of the page, which comprises checking whether we have notes added. If we have, we loop through them, or we output a message and a call to action. For every note, we are showing its date of creation, its title, and description.

In `app.py`, edit the `home` route function as shown below:

```python
@app.route("/")
def home():

    # get the notes from the database
    notes = list(mongo.db.notes.find({}).sort("createdAt",-1));

    # render a view
    return render_template("/pages/home.html",homeIsActive=True,addNoteIsActive=False,notes=notes)
```

In the `home()` function, we are:
- Fetching the notes from the database; ordered in descending order.
- Returning a view, passing along data. `homeIsActive` and `addNoteIsActive` for the navbar to set the active page, and `notes` for the data fetched.

To test this home route, make sure your application is running, and refresh the page on the browser. Since you do not have any added notes, you will receive a message and a call to action.

#### The add-note route
In `templates/pages`, create a file `add-note.html`. In this file, add the following code:

```html
{% extends 'base.html'%} {% block title %} Add note {% endblock %} {% block
content %}
<div class="container mt-5 mb-5 px-10 ">
	<div class="row">
		<div class="col-md-6 offset-md-3">
			<form method="POST" action="/add-note">
				<div class="form-group">
					<label for="title">Title</label>
					<input
						type="text"
						class="form-control"
						id="title"
						aria-describedby="noteTitle"
						placeholder="Enter note title"
						name="title"
						required
					/>
					<small id="noteTitle" class="form-text text-muted"
						>E.g My new room.</small
					>
				</div>
				<div class="form-group">
					<label for="description">Description</label>
					<textarea
						id="description"
						name="description"
						class="form-control"
						placeholder="Some description"
						aria-describedby="description"
						required
					>
					</textarea>
					<small id="description" class="form-text text-muted"
						>E.g My new room number is 1234.</small
					>
				</div>
				<button type="submit" class="btn btn-primary">Submit</button>
			</form>
		</div>
	</div>
</div>
{% endblock %}
```

In the file above, we are;
- Extending the common `base.html` file.
- Setting the title.
- Setting the body, which is a form with a title and a description field.

In `app.py`, edit the `addNote()` function as follows:

```python
@app.route("/add-note", methods=['GET','POST'])
def addNote():
    if(request.method == "GET"):

        return render_template("pages/add-note.html",homeIsActive=False,addNoteIsActive=True)

    elif (request.method == "POST"):

        # get the fields data
        title = request.form['title']
        description = request.form['description']
        createdAt = datetime.datetime.now()

        # save the record to the database
        mongo.db.notes.insert({"title":title,"description":description,"createdAt":createdAt})

        # redirect to home page
        return redirect("/")
```

When we have a `GET` call in the function above, we are simply returning a view with navigation bar configuration variables.

When we have a `POST` call, we get the data submitted from the form, save it to the database, and redirect to the home page.

To test the functionality, ensure the development server is running, and refresh the `add-note` page. You should see a form, and when you fill and submit it, you will be redirected to the home page; now with a saved note.

#### The edit-note route
In the `templates/pages` folder, create a `edit-note.html` file. In the file, add the following code:

```html
{% extends 'base.html'%} {% block title %} Edit note {% endblock %} {% block
content %}
<div class="container mt-5 mb-5 px-10 ">
	<div class="row">
		<div class="col-md-6 offset-md-3">
			<form method="POST" action="/edit-note">
				<input type="hidden" name="_id" value="{{ note._id }}" />
				<div class="form-group">
					<label for="title">Title</label>
					<input
						type="text"
						class="form-control"
						id="title"
						aria-describedby="noteTitle"
						placeholder="Enter note title"
						name="title"
						value="{{ note.title }}"
						required
					/>
					<small id="noteTitle" class="form-text text-muted"
						>E.g My new room.</small
					>
				</div>
				<div class="form-group">
					<label for="description">Description</label>
					<textarea
						id="description"
						name="description"
						class="form-control"
						placeholder="Some description"
						aria-describedby="description"
						required
					>
{{ note.description }}</textarea
					>
					<small id="description" class="form-text text-muted"
						>E.g My new room number is 1234.</small
					>
				</div>
				<button type="submit" class="btn btn-primary">Submit</button>
			</form>
		</div>
	</div>
</div>
{% endblock %}
```

In the file above, we extend the common `base.html` file, adding a title and a body content; simply a pre-filled form with a specific note's data.

In `app.py`, edit the `editNote` function as follows:

```python
@app.route('/edit-note', methods=['GET','POST'])
def editNote():

    if request.method == "GET":

        # get the id of the note to edit
        noteId = request.args.get('form')


        # get the note details from the db
        note = dict(mongo.db.notes.find_one({"_id":ObjectId(noteId)}))

        # direct to edit note page
        return render_template('pages/edit-note.html',note=note)

    elif request.method == "POST":

        #get the data of the note
        noteId = request.form['_id']
        title = request.form['title']
        description = request.form['description']

        # update the data in the db
        mongo.db.notes.update_one({"_id":ObjectId(noteId)},{"$set":{"title":title,"description":description}})

        # redirect to home page
        return redirect("/")
```

In the function above, we have two calls.
- A `GET` call, where we get the note details from the database using its id, and render the form using those details.
- A `POST` call, where we get the updated details from the form, and update the note from the database after which you are redirected to the home page.

To test this functionality:
- Ensure the development server is running.
- Refresh the home page.
- For any note, click on edit, edit any field, and then hit `Submit`. The new details should be reflected.

#### The delete-note route
In `app.py`, edit the `deleteNote` as follows:

```python
@app.route('/delete-note', methods=['POST'])
def deleteNote():

    # get the id of the note to delete
    noteId = request.form['_id']

    # delete from the database
    mongo.db.notes.delete_one({ "_id": ObjectId(noteId)})

    # redirect to home page
    return redirect("/")
```

From the function above, we are getting the `id` of the note to be deleted, deleting it from the database, and redirecting it to the home page.

To test this functionality:
- Make sure the development server is running.
- Refresh the home page.
- For any note, click on delete; it should be deleted successfully.

### Conclusion
In this article, we have built a simple notes app using Flask and MongoDB.

Here are some resources that will help you gain more insights into the covered technologies.
- [Installing packages using virtual environments](https://packaging.python.org/guides/installing-using-pip-and-virtual-environments/)
- [Guide using PyMongo](https://analyticsindiamag.com/guide-to-pymongo-a-python-wrapper-for-mongodb/)
- [Understanding Jinja](https://codeburst.io/jinja-2-explained-in-5-minutes-88548486834e?gi=79dbb3611ff)

---
Peer Review Contributions by: [Mercy Meave](/engineering-education/authors/mercy-meave/)
