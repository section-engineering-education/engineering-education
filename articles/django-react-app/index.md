# Building a React.js Application Using Django REST framework

![admin panel](header.jpg)

## Introduction

In this article, we build a Todo application using React and Django.

[React](https://reactjs.org/) is a JavaScript framework for building painless interactive UIs.

[Django](https://www.djangoproject.com/) is a python web framework that simplifies common practices in web development making it easier to build web apps more quickly. It has a stable community and problems have been solved, and there is a set of libraries supporting common development needs.

In the application we are to build, react serves as the frontend handling UI and getting data via requests to the django back-end, which is an API built using the Django REST framework(DRF).

## Prerequisites

Before getting our hands dirty, you will need to:
1. [Install and set up environment for Python3](https://www.python.org/downloads/)
2. [Install Node.js and create a Local Development](https://nodejs.org/en/download/package-manager/#debian-and-ubuntu-based-linux-distributions-enterprise-linux-fedora-and-snap-packages)

## Setting Backend
We will start by setting our backend and creating all the folders. Launch a new terminal and create the project's directory by running:

```
$ mkdir django-react-todoApp
```
Then, we navigate to that directory:
```
$ cd django-react-todoApp
```
We then install Pipenv using pip and activate our virtual environment;
```
$ pip install pipenv
$ pipenv shell
```
Let's install Django using Pipenv then create a new project called backend:
```
$ pipenv install django
$ django-admin startproject backend
```
Next, we navigate into the newly created backend folder and start a new application called todo. We will run migrations and start up the server:
```
$ cd backend
$ python manage.py startapp todo
$ python manage.py migrate
$ python manage.py runserver
```
At this point, we should see an instance of django application running on this address - http://localhost:8000

Great! You should be proud :<3

## Registering the Todo Application

After setting the backend, we want to register our app `todo` as an installed app so that Django can recognise it. Head to `backend/settings.py` file and update the `INSTALLED_APPS` section:
```python
# backend/settings.py

# Application definition
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'todo',                        # Add this
]
```
## Defining the Todo model
We now want to create a model to define how the Todo items should be stored in the database, open `todo/models.py` and update it with this snippet:
```python
# todo/models.py
from django.db import models
#create your models here.

# add this
class Todo(models.Model):
   title = models.CharField(max_length=100)
   description = models.TextField()
   completed = models.BooleanField(default=False)

   def _str_(self):
     return self.title
```
The code describes three properties on the Todo model:
* Title; What the task is.
* Description; Give more explanation about a particular task.
* Completed; Completed is the status of a task; either completed or not completed.
Since we have created a Todo model, we need to create a migration file and apply the changes to the database, so let's run these commands:
```
$ python manage.py makemigrations todo
$ python manage.py migrate todo
```

We can test to see that CRUD operations work on the Todo model we created using the admin interface that Django provides. But first, we will do a little configuration:

Open the `todo/admin.py` file and update:
```python
# todo/admin.py

from django.contrib import admin
from .models import Todo # add this

class TodoAdmin(admin.ModelAdmin):
  list = ('title', 'description', 'completed')

  # Register your models here
  admin.site.register(Todo, TodoAdmin)
```
We then create a superuser account to access the admin interface with this command:
```
$ python manage.py createsuperuser
```
You will be prompted to enter a username, email and password for the superuser.

NB: Be sure to remember the credentials you enter since you will need them to log in to the admin dashboard.

Start the server once more and log in on the address - http://localhost:8000/admin
```
$ python manage.py runserver
```
![admin dashboard](admin.jpg)

We can go ahead and create, edit and delete Todo items using the interface. Try creating and deleting some.

![admin panel](adminpanel.jpg)


Awesome work so far, take a break and reflect on what we have done so far. Next section we will create the API using the Django REST framework.

## Setting up the APIs
You can learn more about APIs in this amazing [article](https://www.section.io/engineering-education/rest-api/)

Quit the server(Ctrl-C) then install the `djangorestframework` and `django-cors-headers` using Pipenv:
```
$ pipenv install djangorestframework django-cors-headers
```
We need to add `rest_framework` and `corsheaders` to the list of installed applications.

Open `backend/settings.py` file and update the `INSTALLED_APPS` and `MIDDLEWARE` sections accordingly:
```python
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'todo',
    'corsheaders', # add this
    'rest_framework', # add this
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware', # add this
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]
```
Add this code snippet to the bottom of the `backend/settings.py` file
```python
# we whitelist localhost:3000 because that's where frontend will be served
CORS_ORIGIN_WHITELIST = [
    'http://localhost:3000',
]
```
Django-cors-headers is a python library that will help in preventing the errors that we would normally get due to CORS rules. In the `CORS_ORIGIN_WHITELIST` snippet, we whitelisted `localhost:3000` because we want the frontend (which will be served on that port) of the application to interact with the API.

## Creating serializers for the Todo model
We need serializers to convert model instances to JSON so that the frontend can work with the received data easily. We will create a `todo/serializers.py`
```
$ touch todo/serializers.py
```
Open the `serializers.py` file and update with the following code:
```python
# todo/serializers.py

from rest_framework import serializers
from .models import Todo

class TodoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Todo
        fields = ('id' ,'title', 'description', 'completed')
```
In the code snippet above, we specified the model to work with and the fields we want to be converted to JSON.

## Creating the view
We will create a `TodoView` class in the `todo/views.py` file, so update it with the following code:
```python
# todo/views.py

from django.shortcuts import render
from rest_framework import viewsets      # add this
from .serializers import TodoSerializer  # add this
from .models import Todo                 # add this

# Create your views here.

class TodoView(viewsets.ModelViewSet):   # add this
    serializer_class = TodoSerializer    # add this
    queryset = Todo.objects.all()        # add this

```
The `viewsets` base class provides the implementation for CRUD operations by default, what we had to do was specify the serializer class and the query set.

Let us roll over to `backend/urls.py` file and completely replace it with the code below. This code specifies the URL path for the API:
```python
# backend/urls.py

from django.contrib import admin
from django.urls import path,include               # add this
from rest_framework import routers                 # add this
from todo import views                             # add this

router = routers.DefaultRouter()                   # add this
router.register(r'todos', views.TodoView, 'todo')  # add this

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls))             # add this
]
```
This is the final step that completes the building of the API, we can now perform CRUD operations on the Todo model. The router class allows us to make the following queries:
* `/todos/` - This returns a list of all the Todo items(Create and Read operations can be done here).
* `todos/id` - Returns a single Todo items using the id primary key(Update and Delete operations can be done here).

Let's restart the server and visit this address - http://localhost:8000/api/todos:
```
$ python manage.py runserver
```
![api](json.jpg)

We can create a new todo item using the interface.

We can also perform DELETE and UPDATE operations on specific Todo using their `id` primary keys. To do this, we will visit an address with this structure `api/todos/id`. Let's try with this address - http://localhost:8000/api/todos/1:


That's all for the backend of the application, now we can move on to fleshing out the frontend.

## Setting up the frontend

Now we will create our frontend and make it communicate with the backend over the interface that we have created.

Since we are using React as our frontend, we want to use the `create-react-app` CLI tool because it registers optimal settings and several benefits such as Hot reloading and Service workers. We will install the `create-react-app` CLI(command line interface) tool globally with this command:
```
$ npm install -g create-react-app
```
Let's navigate to the parent working directory - `django-react-todoApp`- of our application and create a new React application called frontend:
```
$ create-react-app frontend
```
It will probably take a while for all of the dependencies to be installed, once it's over.

Run the following commands to navigate into the working directory and start the frontend server:
```
$ cd frontend
$ npm start
```
We can now visit this address - http://localhost:3000- and we will see the default React screen:

We will pull in `bootstrap` and `reactstrap` to spice the UI up a bit:
```
$ npm add bootstrap reactstrap
```
Let's open the `src/index.css` file and replace the styles there with this one:
```css
/_frontend/src/index.css _/

body {
  margin: 0;
  padding: 0;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: #282c34; }

.todo-title {
  cursor: pointer; }

.completed-todo {
  text-decoration: line-through; }

.tab-list > span {
  padding: 5px 8px;
  border: 1px solid #282c34;
  border-radius: 10px;
  margin-right: 5px;
  cursor: pointer; }

.tab-list > span.active {
  background-color: #282c34;
  color: #ffffff; }
```
We will import Bootstrap's stylesheet in `src/index.js` so that we can Bootstrap's classes:
```javascript
// frontend/src/index.js

import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';   // add this
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(<App />,document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
```
Let's replace the code in `src/App.js` with this one:
```javascript 
// frontend/src/App.js

import React, { Component } from "react";
const todoItems = [
    {
        id: 1,
        title: "Code",
        description: "Learn React Components",
        completed: true
    },
    {
        id: 2,
        title: "Study",
        description: "Go to the library at 1400hrs",
        completed: false
    },{
        id: 3,
        title: "Supper",
        description: "Go to the mall to pick some groceries",
        completed: false
    }
];
class App extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            viewCompleted: false, 
            todoList: todoItems
            };
    }
    displayCompleted = status => {
        if (status) {
            return this.state({ viewCompleted: true });
        }
        return this.state({ viewCompleted: false });
    };
    renderTabList = () => {
        return (
            <div className="my-5 tab-list">
                <span 
                    onClick={() => this.displayCompleted(true)}
                    className={this.state.viewCompleted ? "active" : ""}
                >
                Complete
                </span>
                <span 
                    onClick={() => this.displayCompleted(false)}
                    className={this.state.viewCompleted ? "" : "active"}
                >
                Incomplete
                </span>
            </div>    
        );
    };
    renderItems = () => {
        const { viewCompleted } = this.state;
        const newItems = this.state.todoList.filter(
            item => item.completed === viewCompleted
        );
        return newItems.map(item => (
            <li key={item.id}
                className="list-group-item d-flex justify-content-between align-items-center">
                <span 
                    className={`todo-title mr-2 ${
                        this.state.viewCompleted ? "completed-todo" : ""
                     }`}
                    title={item.description}>
                    {item.title}
                </span>
                <span>
                    <button className="btn btn-secondary mr-2"> Edit</button>
                    <button className="btn btn-danger">Delete</button>
                </span>
            </li>
        ));
    };
    render() {
        return (
            <main className="content">
                <h1 className="text-white text-uppercase text-center my-4">Todo app</h1>
                <div className="row">
                    <div className="col-md-6 col-sm-10 mx-auto p-0">
                        <div className="card p-3">
                            <div className="">
                                <button className="btn btn-primary">Add Task</button>
                            </div>
                            {this.renderTabList()}
                            <ul className="list-group list-group-flush">
                                {this.renderItems()}
                            </ul>  
                        </div>
                    </div>
                </div>
            </main>                  
        );
    }
}
export default App;
```
Well, that's a lot of code, but there is no need to be afraid now, we haven't started interacting with the backend API, so we included default values to populate the Todo list. The `renderTabList()` function renders two spans which help control set of items displayed i.e clicking on the completed tab shows completed tasks and the same for incomplete tab.

If we visit the React frontend application now, it will look like this:

![frontend](todo.jpg)

TO handle actions such as adding and editing tasks, we will use a modal, so let's create a Modal component in `components` folder.

Create a `components` folder in the `src` directory:
```
$ mkdir src/components
```
Create a `Modal.js` file in the components folder:
```
$ touch src/components/Modal/js
```
Open the `Modal.js` file and populate it with the code below:
```javascript
// frontend/src/components/Modal.js

import React, { Component } from "react";
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Form,
    FormGroup,
    Input,
    Label
} from "reactstrap";

export default class CustomModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeItem: this.props.activeItem
        };
    }
    handleChange = e => {
        let { name, value } = e.target;
        if (e.target.type === "checkbox") {
            value = e.target.checked;
        }
        const activeItem = { ...this.state.activeItem, [name]: value };
        this.setState({ activeItem });
    };
    render() {
        const { toggle, onSave } = this.props;
        return (
            <Modal isOpen={true} toggle={toggle}>
                <ModalHeader toggle={toggle}>Todo Item</ModalHeader>
                <ModalBody>
                    <Form>
                        <FormGroup>
                            <Label for="title">Title</Label>
                            <Input
                                type="text"
                                name="title"
                                value={this.state.activeItem.title}
                                onChange={this.handleChange}
                                placeholder="Enter Todo Title"
                            />
                        </FormGroup>   
                        <FormGroup>
                            <Label for="description">Description</Label>
                            <Input
                                type="text"
                                name="description"
                                value={this.state.activeItem.description}
                                onChange={this.handleChange}
                                placeholder="Enter Todo description"
                            />
                        </FormGroup>   
                        <FormGroup check>
                            <Label for="completed">
                                <Input
                                    type="checkbox"
                                    name="completed"
                                    checked={this.state.activeItem.completed}
                                    onChange={this.handleChange}
                                />
                                Completed
                            </Label>
                        </FormGroup>  
                    </Form>
                </ModalBody> 
                <ModalFooter>
                    <Button color="success" onClick={() => onSave(this.state.activeItem)}>
                    Save
                    </Button>  
                </ModalFooter>
            </Modal>               
        );
    }
}
```
We created a `CustomModal` class and it nests the Modal component that is derived from the `reactstrap` library. We also defined three fields in the form:
* Title
* Description
* Completed

Here's how the `CustomModal` works, it receives `activeItem`, `toggle` and onSave as props.
1. `activeItem` represents the Todo item to be edited.
2. `toggle` is a function used to control the Modal's state i.e open or close the modal.
3. `onSave` is a function that is called to save the edited values of the Todo item.

Next, we will import the `CustomModal` component into the `App.js` file. Head over to the `src/App.js` and replace it completely with this code snippet:
```javascript
// frontend/src/App.js

import React, { Component } from "react";
import Modal from "./components.Modal";

const todoItems = [
    {
        id: 1,
        title: "Code",
        description: "Learn React Components",
        completed: true
    },
    {
        id: 2,
        title: "Study",
        description: "Go to the library at 1400hrs",
        completed: false
    },{
        id: 3,
        title: "Supper",
        description: "Go to the mall to pick some groceries",
        completed: false
    }
];
class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            viewCompleted: false,
            activeItem: {
                title: "",
                description: "",
                completed: false
            },
            todoList: todoItems
        };
    }
    toggle = () => {
        this.setState({ modal: !this.state.modal });
    };
    handleSubmit = item => {
        this.toggle();
        alert("save" + JSON.stringify(item));
    };
    handleDelete = item => {
        alert("delete" + JSON.stringify(item));
    };
    createItem = () => {
        const item = { title: "", description: "", completed: false };
        this.setState({ activeItem: item, modal: !this.state.modal });
    };
    editItem = item => {
        this.setSate({ activeItem: item, modal: !this.state.modal });
    };
    displayCompleted = status => {
        if (satus) {
            return this.setState({ viewCompleted: true });
        }
        return this.setState({ viewCompleted: false });
    };
    renderTabList = () => {
        return (
            <div className="my-5 tab-list">
                <span
                    onClick={() => this.displayCompleted(true)}
                    className={this.state.viewCompleted ? "active" : ""}
                >
                    Complete
                </span>
                <span
                    onClick={() => this.displayCompleted(false)}
                    className={this.state.viewCompleted ? "" : "active"}
                >
                    Incomplete
                </span>
            </div>    
        );
    };
    renderItems = () => {
        const { viewCompleted } = this.state;
        const newItems = this.state.todoList.filter(
            item => item.completed === viewCompleted
        );
        return newItems.map(item => (
            <li
                key={item.id}
                className="list-group-item d-flex justify-content-between align-items-center"
            >
                <span
                    className={`todo-title mr-2 ${
                        this.state.viewCompleted ? "complete-todo" : ""
                    }`}
                    title={item.description}
                >
                    {item.title}
                </span>
                <span>
                    <button
                        onClick={() => this.editItem(item)}
                        className="btn btn-secondary mr-2"
                    >
                        Edit
                    </button>
                    <button
                        onClick={() => this.handleDelete(item)}
                        className="btn btn-danger"
                    >
                        Delete
                    </button>
                </span>
            </li>
        ));
    };
    render() {
        return (
            <main className="content">
                <h1 className="text-white text-uppercase text-center my-4">Todo app</h1>
                <div className="row">
                    <div className="col-md-6 col-sm-10 mx-auto p-0">
                        <div className="card p-3">
                            <div className="">
                                <button onClick={this.createItem} className="btn btn-primary">
                                    Add Task
                                </button>
                            </div>
                            {this.renderTabList()}
                            <ul className="list-group list-group-flush">
                                {this.renderItems()}
                            </ul>
                        </div>
                    </div>
                </div>   
                {this.state.modal ? (
                    <Modal
                        activeItem={this.state.activeItem}
                        toggle={this.toggle}
                        onSave={this.handleSubmit}
                    />
                ) : null} 
            </main>
        );
    }

}
```
We can now revisit the React frontend, this is what the application should resemble at this point:

![styled](styled.jpg)

If we attempt to edit and save a Todo item, we will get an alert showing the Todo item's object. Clicking on save and delete will perform fitting actions but still have no functionality. We will add the functionality in the following paragraphs.

We will modify the application so that it interacts with the Django API we built in the previous section. Let's start by starting up the backend server(on a different instance of the terminal) if it isn't already running:
```
$ cd backend
$ python manage.py runserver
```
For us to make requests to the API endpoints on the backend server, we will install a JavaScript library called `axios`.
```
$ npm add axios
```
Once `axios` is successfully installed, head over to the `frontend/package.json` file and add a proxy:
```javascript
// frontend/package.json

[...]
"name": "frontend",
  "version": "0.1.0",
  "private": true,
  "proxy": "http://localhost:8000",
  "dependencies": {
    "@testing-library/jest-dom": "^5.11.9",
    "@testing-library/react": "^11.2.3",
    "@testing-library/user-event": "^12.6.0",
    "bootstrap": "^4.5.3",
    "react": "^17.0.1",
    "react-dom": "^17.0.1",
    "react-scripts": "4.0.1",
    "reactstrap": "^8.8.1",
    "web-vitals": "^0.2.4"
  },
  [...]
```
This proxy will help in tunnelling API requests to http://localhost:8000 where the Django application will handle them, so we can write the requests like this in the frontend:
```
axios.get("/api/todos/")
```
Instead of:
```
axios.get("http://localhost:8000/api/todos/")
```
### Note: You might need to restart the development server for the proxy to register with the application.

We will modify the `frontend/src/App.js` one last time so that it doesn't use dummy data we passed in the array but request data from the backend server and lists them instead. We want to ensure that all CRUD operations send requests to the backend server instead of interacting with the dummy data.

Replace `App.js` with this final version:
```javascript
// frontend/src/App.js

import React, { Component } from "react"
import Modal from "./components/Modal";
import axios from "axios";


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewCompleted: false,
      activeItem: {
        title: "",
        description: "",
        completed: false
      },
      todoList: []
    };
  }
  componentDidMount() {
    this.refreshList();
  }
  //Rendering the backend data to frontend
  refreshList = () => {
    axios
      .get("/api/todos/")
      .then(res => this.setState({ todoList: res.data}))
      .catch(err => console.log(err));
  };

  toggle = () => {
    this.setState({ modal: !this.state.modal });
  };

  //Responsible for saving the task
  handleSubmit = item => {
    this.toggle();
    if (item.id) {
      axios
        .put(`http://localhost:8000/api/todos/${item.id}/`, item)
        .then(res => this.refreshList());
      return;  
    }
    axios
      .post("http://localhost:8000/api/todos/", item)
      .then(res => this.refreshList())
  };

  //deleting the task
  handleDelete = item => {
    axios
      .delete(`http://localhost:8000/api/todos/${item.id}/`, item)
      .then(res => this.refreshList());
  };
  
  //Create an item
  createItem = () => {
    const item = {title: "", description: "", completed: false };
    this.setState({ activeItem: item, modal: !this.state.modal });
  };
  //Edit an item
  editItem = item => {
    this.setState({ activeItem: item, modal: !this.state.modal });
  };
  displayCompleted = status => {
    if (status) {
      return this.setState({ viewCompleted: true});
    }
    return this.setState({ viewCompleted: false});
  };
  renderTabList = () => {
    return (
      <div className="my-5 tab-list">
        <span 
          onClick={() => this.displayCompleted(true)}
          className={this.state.viewCompleted ? "active" : ""}
        >
          Complete
        </span>
        <span 
          onClick={() => this.displayCompleted(false)}
          className={this.state.viewCompleted ? "" : "active"}
        >
          Incomplete
        </span>
      </div>  
    );
  };
  renderItems = () => {
    const { viewCompleted } = this.state;
    const newItems = this.state.todoList.filter(
      item => item.completed === viewCompleted
    );
    return newItems.map(item => (
      <li 
        key={item.id}
        className="list-group-item d-flex justify-content-between align-items-center"
      >
        <span 
          className={`todo-title mr-2 ${
            this.state.viewCompleted ? "completed-todo" : ""
          }`}
          title={item.description}
          >
            {item.title}
          </span>
          <span>
            <button 
              onClick={() => this.editItem(item)}
              className="btn btn-secondary mr-2">Edit</button>
            <button 
              onClick={() => this.handleDelete(item)}
              className="btn btn-danger">Delete</button>
          </span>
      </li>
    ));
  };
  render() {
    return (
      <main className="content">
        <h1 className="text-white text-uppercase text-center my-4">Todo App</h1>
        <div className="row">
          <div className="col-md-6 col-sm-10 mx-auto p-0">
            <div className="card p-3">
              <div className="">
                <button onClick={this.createItem} className="btn btn-primary">Add Task</button>
              </div>
              {this.renderTabList()}
              <ul className="list-group list-group-flush">
                {this.renderItems()}
              </ul>
            </div>
          </div>
        </div>
        {this.state.modal ? (
          <Modal
            activeItem={this.state.activeItem}
            toggle={this.toggle}
            onSave={this.handleSubmit}
          />
        ): null}
      </main>
    );
  }
}
export default App;
```
The `refreshList()` function is reusable that is called each time an API request is completed. It updates the Todo list to display the most recent list of added items.

The `handleSubmit()` function takes care of both the create and update operations. If the item passed as the parameter doesn't have an id, then it has probably not been created, so the function creates it.

Congratulations! We have built the frontend successfully.

## Testing the Application
Let's start the backend server on a terminal instance that's sourced into the Pipenv virtual shell and pointed to the backend directory:
```
$ python manage.py runserver
```
We also need to start the frontend development server:
```
$ npm start
```
We can visit the application at - http://localhost:8000 - to see that it works:

## Conclusion
We've come to the end of this tutorial and learnt how to configure Django and React to interact with each other. We also saw some of the benefits that come with bootstrapping a React application using the `create-react-app` tool, such as Hot-reloading which is basically the feature that makes it possible for the web to reload on its own whenever a change is detected.

The source code for this application is available [here](https://github.com/OkothPius/React-todo-app) on Github.



