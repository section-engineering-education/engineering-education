---
layout: engineering-education
status: publish
published: true
url: /how-to-build-a-vue-app-with-flask-sqlite-backend-using-docker/
title: How to Set up and Build a Vue App with a Flask Backend using Docker
description: In this article we will build a Vue app with a Flask backend using Docker. We will build a simple Vue app that will get data from a Flask backend.
author: moses-maina
date: 2021-10-18T00:00:00-16:00
topics: [Containers, Languages]
excerpt_separator: <!--more-->
images:

 - url: /engineering-education/how-to-build-a-vue-app-with-flask-sqlite-backend-using-docker/hero.png
   alt: Docker Flask Notes Vue Image hero
---
[Vue.js](https://v3.vuejs.org) is a JavaScript frontend framework used to build web user interfaces. Vue is commonly used to build single page based applications that run on the client-side.
<!--more-->
Nevertheless, Vue can be used to build a full-stack web application with other backend technologies such as Node.js and Flask coming into play. This is done by making HTTP requests to a server and populating them in a Vue-based interface.

Vue is great, due to its well-outlined features. This includes the ability to use virtual DOM, easy integration with other technologies such as Node.js and Python, and high run time performance.

On the other side, Flask is a micro web application-based framework written in Python to manipulate server-side-based data. Flask is designed to make getting started quick and easy with the ability to scale up to complex applications.

When building a full-stack application, Vue and Flask can be used and run as a single application. This gives you the ability to manipulate the web page appearance and to process server-based data using Flask. 

When running such different technologies together, it can be become extensive to always set local environments to run the full-stack application.

As a result, Docker plays a very important role. It allows you to build such an application and run them virtually through containers. This means any local environment doesn't affect how your application runs. 

Docker will spin up Vue and Flask, containerize them and run them as one. All you have to do is set simple instructions that explain the different dependencies that the application needs to run. This includes the version of Python and the libraries you want to run Flask.

In this guide, we will build an application using Vue and Flask and run it using Docker. We will use SQLite as the application database.

### Prerequisites
To follow along in this article, it is important to have the following:
1. [Python](https://www.python.org/) installed on your computer.
2. Some working knowledge with Flask.
3. [Node.js](https://nodejs.org/en/) installed on your computer.
4. Some working knowledge with Vue.js.
5. [Docker](/engineering-education/docker-concepts/) installed on your computer.

### Overview
- [Setting up the server-side environment using Flask](#setting-up-the-server-side-environment-using-flask)
  - [Installing the packages](#installing-the-packages)
  - [Setting up the server-side application Using Flask](#setting-up-the-server-side-application-using-flask)
  - [Setting up the database](#setting-up-the-database)
  - [Set up the SQLite database and the tables](#set-up-the-sqlite-database-and-the-tables)
  - [Setting up routes](#setting-up-routes)
  - [Creating a todo](#creating-a-todo)
  - [Getting all todos](#getting-all-todos)
  - [Getting a single route](#getting-a-single-route)
  - [Updating a todo route](#updating-a-todo-route)
  - [Deleting a todo route](#deleting-a-todo-route)
- [Setting up the client-side using Vue](#setting-up-the-client-side-using-vue)
  - [Setting up the Vue frontend application](#setting-up-the-vue-frontend-application)
  - [Todos list cards](#todos-list-cards)
  - [Add a todo form](#add-a-todo-form)
  - [Add an edit todo form](#add-an-edit-todo-form)
- [Dockerizing the application](#dockerizing-the-application)
  - [Dockerize the Flask API](#dockerize-the-flask-api)
  - [Dockerize the Vue app](#dockerize-the-vue-app)
  - [Set up an overall docker-compose file](#set-up-an-overall-docker-compose-file)
  - [Build the Docker image](#build-the-docker-image)
  - [Start the Docker container](#start-the-docker-container)
- [Conclusion](#conclusion)

### Setting up the server-side environment using Flask
For the server-side, we will build a REST API using Flask and SQLite (A lightweight SQL database). 

To achieve this, we will follow the following steps:

First create a project folder that you will use to create a Flask REST API, name it, `flask-todos-rest-api` .

To set up our Flask environment, we will use [pipenv](https://pipenv.pypa.io/en/latest/). 

To check if you have `pipenv` installed, run the following command:

```bash
python -m pipenv --version
```

If you don't have it installed, run the following command:

```bash
pip install pipenv
```

Initialize the environment by running:

```bash
python -m pipenv shell
```

#### Installing the packages
We will use the following packages:
- [Flask](https://flask.palletsprojects.com/en/2.0.x/): The framework providing the architectural setup for the application.
- [Flask-sqlalchemy](https://flask-sqlalchemy.palletsprojects.com/en/2.x/): Provides useful defaults and extra helpers that make it easier to accomplish database tasks.
- [Flask-marshmallow](https://flask-marshmallow.readthedocs.io/en/latest/): Thin integration layer for Flask useful when building APIs.
- [Marshmallow-sqlalchemy](https://marshmallow-sqlalchemy.readthedocs.io/en/latest/): Binder for sqlalchemy and marshmallow.
- [Flask-cors](https://flask-cors.readthedocs.io/en/latest/): For handling cross-origin resource access.

To install all the above packages run this command:

```bash
python -m pipenv install flask flask-sqlalchemy flask-marshmallow marshmallow-sqlalchemy flask-cors
```

#### Setting up the server-side application using Flask
To setup, the server-side application, create an `app.py` file inside your `flask-todos-rest-api` folder.

In this file, set up a basic flask app by adding the following lines of code.

```python
from flask import Flask

## Init app

app = Flask(__name__)

# Start the app
if __name__ == '__main__':
    app.run(debug=True)
```

With the command above we are importing the Flask module, initializing it, and starting it.

#### Setting up the database
To set up the SQLite database, start by importing the following packages:

```python
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
import os
```

Then set up the base directory for the application:

```python
basedir = os.path.abspath(os.path.dirname(__file__))
```

Add the database application configuration.

```python
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir,'db.sqlite')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
```

Since we are using Flask-sqlalchemy and Flask-marshmallow, we can now set `SQLAlchemy` to initialize the database `Marshmallow` to initialize marshmallow as shown below.

```python
db = SQLAlchemy(app)

ma = Marshmallow(app)
```

The database configurations are now set, and we can start setting up the todo model. This will make up a sample todo list stored in the SQLite database.

```python
class Todo(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100))
    description = db.Column(db.String(400))

    def __init__(self,title,description):
        # Add the data to the instance
        self.title = title
        self.description = description
```

From above, we are defining that a Todo will have an id, title, and description.

Since we are using an SQLite database, we need to set up a schema that will store our todo. The schema will be called when querying the todos data.

```python
class TodoSchema(ma.Schema):
    class Meta:
        fields = ('id','title','description')
```

Above, we define that for every todo, we will be interested in the id, title, and description.

To initialize the above schema, we have to do it differently for a single todo and multiple todos. 

For this, we will add the following:

```python
todo_schema = TodoSchema()
todos_schema = TodoSchema(many=True)
```

The first is for a single todo, and the other is for multiple todos.

#### Set up the SQLite database and the tables
Open the terminal from your code editor and run the following command to start an interactive python environment:

```bash
python -m pipenv run python
```

- Run the following commands from the shell:

```python
from app import db # import db

db.create_all() # create database and tables
```

- Close the interactive shell:

```bash
exit()
```

#### Setting up routes
To set up the routes, start by importing packages:

```python
from flask import Flask,request, jsonify
from flask_cors import CORS,cross_origin
```

`request` will be used to get the payload (data sent), whereas `jsonify` will be used to return JSON data. `CORS` and `cross_origin` for setting up the access policy.

Then add CORS configuration to handle cross-origins coming in to consume this API.

```python
CORS(app,resources={r"/api": {"origins": "*"}})
app.config['CORS_HEADERS'] = 'Content-Type'
```

From above, we accept all origins hitting the `/api` endpoint from which we will expose the API.

Let us now add all the necessary routes to handle the CRUD operations.

#### Creating a todo
The following route creates a todo:

```python
@app.route('/api/todo', methods=['POST'])
@cross_origin(origin='*',headers=['content-type'])
def add_todo():
# get the data
    title = request.json['title']
    description = request.json['description']

    # Create an instance
    new_todo = Todo(title, description)

    # Save the todo in the db
    db.session.add(new_todo)
    db.session.commit()

# return the created todo
    return todo_schema.jsonify(new_todo)
```

From the above route, we accept all origins, receive the todo's title and description from the payload, save it to the database, and return the saved todo.

#### Getting all todos
The following route gets all todos.

```python
# Get all todos
@app.route('/api/todo', methods=['GET'])
@cross_origin(origin='*',headers=['Content-Type'])
def get_todos():
    # get the todos from db
    all_todos = Todo.query.all()
    # get the todos as per the schema
    result = todos_schema.dump(all_todos)
    # return the todos
    return jsonify(result)
```

From above, we are accepting all origins, fetching all saved todos, and returning them.

#### Getting a single route
The following route fetches a single route.

```python
# Get a single todo
@app.route('/api/todo/<id>', methods=['GET'])
@cross_origin(origin='*',headers=['Content-Type'])
def get_todo(id):
    # get a single todo
    todo = Todo.query.get(id)
    # return the todo as per the schema
    return todo_schema.jsonify(todo)
```

From above, we accept the todo's id from the URL, accept all origins, get that specific todo, and return it.

#### Updating a todo route
The following route updates a todo.

```python
# update a todo
@app.route('/api/todo/<id>', methods=['PUT'])
@cross_origin(origin='*',headers=['Content-Type'])
def update_todo(id):
    # get the todo first
    todo = Todo.query.get(id)
    # get the data
    title = request.json['title']
    description = request.json['description']

    # set the data
    todo.title = title
    todo.description = description
    
    # commit to the database
    db.session.commit()

    # return the new todo as per the schema
    return todo_schema.jsonify(todo)
```

From above, we accept the todo's id to be updated, accept all origins, get the specific todo and the data, set the new data, save to the database, and return the saved database.

#### Deleting a todo route
The following route deletes a todo.

```python
# Delete a todo
@app.route('/api/todo/<id>', methods=['DELETE'])
@cross_origin(origin='*',headers=['Content-Type'])
def delete_todo(id):
    # get the todo to be deleted
    todo = Todo.query.get(id)

    # delete from the database
    db.session.delete(todo)

    # commit on the database
    db.session.commit()

    # return thr deleted todo as per the schema
    return todo_schema.jsonify(todo)
```

The routes above accept the todo's id to be deleted, accepting all origins, getting the todo, deleting it from the database, and returning the deleted todo.

After setting the routes, start your application by running the following command:

```bash
python -m pipenv run python app.py
```

Everything should work fine, and the development server should be started. In case you encounter an error, revisit the steps. 

Your console output should be similar to:

![flask-console-output](/engineering-education/how-to-build-a-vue-app-with-flask-sqlite-backend-using-docker/flask-console-output.PNG)

### Setting up the client-side using Vue
To set up the client-side, start by creating a skeleton app using Vue CLI. 

To check whether you have the CLI installed, use the following command:

```bash
vue --version
```

If you do not have the CLI installed, install it with the following command:

```bash
npm install -g @vue/cli
```

Create the skeleton app using the following command:

```bash
vue create todos-flask-app
```

For the questions that follow, feel free to go with the defaults or your own selections.

We will also add some additional packages to handle server-side routing. 

These are:
- Axios: For handling client/server-side requests.
- Vue-router: For handling navigation.

```bash
npm install axios vue-router
```

#### Setting up the Vue frontend application
After installing the packages, we need to configure them in the `src/main.js` as follows:

```javascript
import axios from 'axios'
import VueRouter from 'vue-router'

Vue.config.productionTip = false
Vue.prototype.$http = axios;
Vue.use(VueRouter);
```

In `src/App.vue` , edit the `<template>` as follows:

```html
<div id="app">
    <head>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous" />
        <title>Todos</title>
    </head>

    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <a class="navbar-brand" href="/"> Todos app </a>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mx-auto">
                <li class="nav-item" :class="home_class">
                    <a class="nav-link" href="/"> Home </a>
                </li>
                <li class="nav-item" :class="add_todo_class">
                    <a class="nav-link" href="/add-todo"> Add todo </a>
                </li>
            </ul>
        </div>
    </nav>

    <router-view> </router-view>
</div>
```

We are externally linking the bootstrap CSS to handle our styling, adding a simple navigation bar, and adding the dynamic content area while navigating different pages.

Edit the JavaScript as follows:

```html
<script>
    export default {
        data() {
            return {
                home_class: this.$route.path === "/" ? "active" : "",
                add_todo_class: this.$route.path === "/add-todo" ? "active" : "",
            };
        },
    };
</script>
```

In the snippet above, we are setting the dynamic classes for the navigation bar.

Edit the style as follows:

```html
<style>
    #app {
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
    }
</style>
```

Above we are adding custom styles to the app component.

#### Todos list cards
In the `src/components` folder, create a `Todos.vue` file. 

In the file, add the following HTML:

```html
<template>
    <div class="todos">
        <div class="container">
            <div class="row">
                <div class="col-sm-6 offset-sm-3">
                    <!-- Showing the added todos -->

                    <div v-if="todos.length == 0">
                        <div class="card mt-2 mb-2">
                            <div class="card-body">
                                <h4 class="card-title">You do not have any saved todo</h4>
                                <div class="d-flex justify-content-between">
                                    <a class="btn btn-info text-white" href="/add-todo">Add todo</a>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div v-else-if="todos.length > 0" v-for="todo in todos" v-bind:key="todo.id">
                        <div class="card mt-2 mb-2">
                            <div class="card-body">
                                <h4 class="card-title">{{todo.title}}</h4>
                                <p class="card-text">{{todo.description}}</p>
                                <div class="d-flex justify-content-between">
                                    <button class="btn btn-info text-white" @click="editTodo(todo.id)">
                                        Edit
                                    </button>
                                    <button class="btn btn-danger" @click="deleteTodo(todo.id)">
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
```

Here we are checking if we have todos; if we don't, we show a message. Otherwise, we loop through them, outputting each of them.

Add the following JavaScript:

```html
<script>
    export default {
        // component data
        data() {
            return {
                todos: [],
            };
        },
        methods: {
            // fetching todos
            async getData() {
                try {
                    const response = await this.$http.get(
                        "http://localhost:5000/api/todo"
                    );
                    this.todos = response.data;
                } catch (error) {
                    console.log(error);
                }
            },
            // editing a todo
            async editTodo(todoId) {
                // Push to the edit todo page
                this.$router.push({
                    path: `/edit-todo/${todoId}`,
                });
                return;
            },
            // deleting a todo
            async deleteTodo(todoId) {
                // confirm with the user
                let confirmation = confirm("Do you want to delete this todo?");

                if (confirmation) {
                    try {
                        await this.$http.delete(`http://localhost:5000/api/todo/${todoId}`);
                        // refresh the todos
                        this.getData();
                    } catch (error) {
                        console.log(error);
                    }
                }
            },
        },

        // Fetch the todos on load
        created() {
            this.getData();
        },
    };
</script>
```

Here we export the todos fetched when the component was loaded, the functionality of editing and deleting a todo.

Add the following styles:

```css
<style scoped>h3 {
    margin: 40px 0 0;
}

ul {
    list-style-type: none;
    padding: 0;
}

li {
    display: inline-block;
    margin: 0 10px;
}

a {
    color: #42b983;
}

.card-body {
    text-align: left;
}

.todos {
    margin-top: 10px;
}

</style>
```

The code snippets above are simple styles to add to our todo component.

#### Add a todo form
Create an `AddTodo.vue` file and add the following components.

#### The HTML

```html
<template>
    <div class="container">
        <div class="row">
            <div class="col-sm-6 offset-sm-3">
                <form id="todo-form" method="post" @submit.prevent="checkForm" novalidate="true">
                    <div v-if="todo.error" class="form-group mt-1">
                        <div class="alert alert-danger">{{todo.error}}</div>
                    </div>
                    <div v-if="todo.message" class="form-group mt-1">
                        <div class="alert alert-success">{{todo.message}}</div>
                    </div>
                    <div class="form-group mt-3" style="text-align: left">
                        <label for="title">Title</label>
                        <input v-model="todo.title" type="text" class="form-control" id="title" placeholder="Enter todo's title" />
                        <small id="titleHelp" class="form-text text-muted">E.g taking a walk.</small>
                    </div>
                    <div class="form-group mt-3" style="text-align: left">
                        <label for="description">Description</label>
                        <textarea v-model="todo.description" class="form-control" name="description" id="description" placeholder="Todo's description"></textarea>
                        <small id="descriptionHelp" class="form-text text-muted">E.g A long walk around the estate.</small>
                    </div>
                    <div class="form-group mt-3">
                        <button type="submit" class="btn btn-primary btn-lg btn-block">
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>
```

Here we are showing a form with fields populated from JavaScript.

#### The JavaScript
```html
<script>
    export default {
        data() {
            return {
                todo: {
                    title: "",
                    description: "",
                    error: null,
                    message: null,
                },
            };
        },
        methods: {
            checkForm: async function(e) {
                if (this.todo.title && this.todo.description) {
                    try {
                        // send data to the server
                        await this.$http.post("http://localhost:5000/api/todo", {
                            title: this.todo.title,
                            description: this.todo.description,
                        });

                        //reset the fields
                        this.todo.title = "";
                        this.todo.description = "";

                        // set the message
                        this.todo.message = "Todo added successfully";

                        return;
                    } catch (error) {
                        this.todo.error = error;
                        return;
                    }
                }
                this.todo.error = null;
                if (!this.todo.title) {
                    this.todo.error = "Title is required";
                    return;
                }
                if (!this.todo.description) {
                    this.todo.error = "Description is required";
                    return;
                }
                e.preventDefault();
            },
        },
    };
</script>
```

From the above script, we are exporting data from the component and a method that handles validation and data submission on the submission of the form.

#### Add an edit todo form
Create an `EditTodo.vue` file and add the following.

```html
<template>
    <div class="container">
        <div class="row">
            <div class="col-sm-6 offset-sm-3">
                <form id="todo-form" method="post" @submit.prevent="checkForm" novalidate="true">
                    <div v-if="todo.error" class="form-group mt-1">
                        <div class="alert alert-danger">{{todo.error}}</div>
                    </div>
                    <div v-if="todo.message" class="form-group mt-1">
                        <div class="alert alert-success">{{todo.message}}</div>
                    </div>
                    <div class="form-group mt-3" style="text-align: left">
                        <label for="title">Title</label>
                        <input v-model="todo.title" type="text" class="form-control" id="title" placeholder="Enter todo's title" />
                        <small id="titleHelp" class="form-text text-muted">E.g taking a walk.</small>
                    </div>
                    <div class="form-group mt-3" style="text-align: left">
                        <label for="description">Description</label>
                        <textarea v-model="todo.description" class="form-control" name="description" id="description" placeholder="Todo's description"></textarea>
                        <small id="descriptionHelp" class="form-text text-muted">E.g A long walk around the estate.</small>
                    </div>
                    <div class="form-group mt-3">
                        <button type="submit" class="btn btn-primary btn-lg btn-block">
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>
```

Similar to the `add todo` form, we are outputting an `edit todo` form that is pre-populated with data from the JavaScript for the particular todo to be edited.

#### The JavaScript
```html
<script>
    export default {
        data() {
            return {
                todo: {
                    loading: false,
                    title: "",
                    description: "",
                    error: null,
                    message: null,
                    id: this.$route.params.id,
                },
            };
        },

        methods: {
            getTodo: async function() {
                // the current todo id
                let todoId = this.todo.id;
                // start loading
                this.todo.loading = true;
                // get the todo
                try {
                    let response = await this.$http.get(
                        `http://localhost:5000/api/todo/${todoId}`
                    );
                    this.todo.title = response.data.title;
                    this.todo.description = response.data.description;
                    this.todo.loading = false;
                    return;
                } catch (error) {
                    this.todo.error = error;
                    return;
                }
            },
            checkForm: async function(e) {
                // Custom validation
                if (this.todo.title && this.todo.description) {
                    try {
                        // send data to the server
                        await this.$http.put(
                            `http://localhost:5000/api/todo/${this.todo.id}`, {
                                title: this.todo.title,
                                description: this.todo.description,
                            }
                        );

                        //reset the fields
                        this.todo.title = "";
                        this.todo.description = "";

                        // set the message
                        this.todo.message = "Todo edited successfully";

                        return;
                    } catch (error) {
                        this.todo.error = error;
                        return;
                    }
                }
                this.todo.error = null;
                if (!this.todo.title) {
                    this.todo.error = "Title is required";
                    return;
                }
                if (!this.todo.description) {
                    this.todo.error = "Description is required";
                    return;
                }
                e.preventDefault();
            },
        },
        created() {
            // Called on load
            this.getTodo();
        },
    };
</script>
```

Above we are exporting the todo data, getting the todo when the page is loaded, handling custom validation, and data submission of the edited todo.

After setting up the components, we need to handle the routing into various pages. 

To do this, we will add the following in the `src/main.js` file:

Import the `AddTodo` , `EditTodo` and `Todos` components.

```javascript
import AddTodo from "./components/AddTodo"
import EditTodo from "./components/EditTodo"
import Todos from "./components/Todos"
```

Then create the various `VueRouter` instances to handle the components above.

```javascript
// create a vuerouter instance
const router = new VueRouter({
    mode: 'history',
    base: __dirname,
    routes: [{
            path: '/',
            component: Todos,
            name: 'home'
        },
        {
            path: '/add-todo',
            component: AddTodo,
            name: 'add-todo'
        },
        {
            path: '/edit-todo/:id',
            component: EditTodo,
            name: 'edit-todo'
        },
    ]
});

// pass the router to the app config
new Vue({
    router: router,
    render: h => h(App),
}).$mount('#app');
```

From above, we are creating a `VueRouter` instance passing in the `mode` , `base` , and `routes` . For the routes, we pass the `path` , `component` , and `name` for each.

After creating the instance, we pass it to the Vue object. With that, we are ready to start the development server and test the functionalities we have implemented. 

To do that, run the following command:

```bash
npm run serve
```

The above command will spin up the development server on port `8080` . You can access your app from `http://localhost:8080` .

Your application should resemble the following:

*Todos page*

![todos-page](/engineering-education/how-to-build-a-vue-app-with-flask-sqlite-backend-using-docker/todos-page.PNG)

*Add todo page*

![add-todo-page](/engineering-education/how-to-build-a-vue-app-with-flask-sqlite-backend-using-docker/add-todos-page.PNG)

### Dockerizing the application
To dockerize the application we have built, we will follow the following steps:

#### Dockerize the Flask API
To dockerize the API, create a Dockerfile, and a `.dockerignore` file in the API folder. The Dockerfile will host the instructions when creating the image, whereas the `.dockerignore` file will host the files to be ignored when copying to the image.

For the Flask application to work within Docker, we need to make sure all the packages we have used are available and accessible by the containerized REST API.

To make these packages accessible by Docker, we will import them to a `requirements.txt` file. Docker will then run this file and install the packages within the container that will run the API.

In your `flask-todos-rest-api` directory, run this command:

```bash
pip freeze > requirements.txt
```

This will create a `requirements.txt` and import all the packages we have used.

Add the following in the Dockerfile:

```dockerfile
# Base python package
FROM python:3.8-slim-buster

# Working directory
WORKDIR /app

# Copy the dependencies
COPY requirements.txt

# Install the dependencies
RUN pip3 install -r requirements.txt

# Copy the files
COPY . .

# Executable commands
CMD [ "python3", "-m" , "flask", "run", "--host=0.0.0.0"]
```

Here we are externally importing the Python package, defining the working directory, copying the dependencies, installing the dependencies, copying the files, and setting the execution commands.

Add the following to the `.dockerignore` file:

```docker
__pycache__/

.gitignore

Pipfile

Pipfile.lock

README.MD
```

From above, we are adding all the files that should not be included in the docker image.

#### Dockerize the Vue app
To dockerize the Vue app, we will also create a Dockerfile in the project folder. Similar to the previous instance, it will host the instructions when creating the docker image.

In the Dockerfile, add the following:

```dockerfile
#Base image
FROM node:lts-alpine

#Install serve package
RUN npm i -g serve

# Set the working directory
WORKDIR /app

# Copy the package.json and package-lock.json
COPY package*.json ./

# install project dependencies
RUN npm install

# Copy the project files
COPY . .

# Build the project
RUN npm run build

# Expose a port
EXPOSE 5000

# Executables
CMD [ "serve", "-s", "dist" ]
```

From above, we are importing the node image, setting the working directory, copying the contents of the `package.json` , and `package-lock.json` , installing the project dependencies, copying the project files, building the project, exposing a port, and setting the executables.

#### Set up an overall docker-compose file
After setting a Dockerfile for each of the folders i.e `api-folder` , and `client-folder` , we will set up a `docker-compose.yml` file outside the two folders.

Start by creating a `docker-compose.yml` file outside the API and the client folder.

In the `docker-compose.yml` file, add the following:

```yml
version: '3.8'

services:
    flask-todos-api:
        build: ./flask-todos-rest-api
        ports: 
            - 5000:5000

    vue-todos-app:
        build: ./todos-flask-app
        ports: 
            - 8080:5000
```

Here we define the version of `docker-compose` and set up the two services. For each service, we define the build (folder hosting the Dockerfile) and the ports (where the project is to run on). So that the services do not collide on parallel ports, the `client-side` will run on port `8080` .

#### Build the Docker image
To build the Docker image, from the location of the `docker-compose.yml` file, run the following:

```bash
docker-compose up -d --build
```

The above command will build the docker image.

#### Start the Docker container
To start the Docker container from the same location as in the previous step, run the following command:

```bash
docker-compose up
```

The above command will start the two services. After the two services are started, proceed to <http://localhost:8080> to interact with the app.

After interacting with the app, you can stop the container by pressing `CRTL + C` . You can also share the docker image with friends to showcase what you have built.

### Conclusion
In this article, we have created a Vue.js app that consumes a restful Flask API. To widen your knowledge on the tools used throughout the article, the following resources are recommended:

- [Flask-sqlalchemy docs](https://flask-sqlalchemy.palletsprojects.com/en/2.x/)
- [Flask-marshmallow docs](https://flask-marshmallow.readthedocs.io/en/latest/)
- [Marshmallow-sqlalchemy docs](https://marshmallow-sqlalchemy.readthedocs.io/en/latest/)
- [Flask-cors docs](https://flask-cors.readthedocs.io/en/latest/)
- [Vue-router docs](https://router.vuejs.org/installation.html)
- [How to Call a Vue Method on Page Load - Michael Thiessen](https://michaelnthiessen.com/call-method-on-page-load)
- [Build your python image using docker - Docker docs](https://docs.docker.com/language/python/build-images/)
- [Dockerizing a vue app - Vue.js Cookbook](https://vuejs.org/v2/cookbook/dockerize-vuejs-app.html)

Happy coding!

---
Peer Review Contributions by: [Geoffrey Mungai](/engineering-education/authors/geoffrey-mungai/)
