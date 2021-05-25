---
layout: engineering-education
status: publish
published: true
url: /react-and-django-rest-framework/
title: Building a React.js Application using Django REST Framework
description: In this tutorial, we will create a Todo application using React for the front-end and Django REST Framework for the backend.
author: oruko-pius
date: 2021-03-03T00:00:00-13:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/react-and-django-rest-framework/hero.jpg
    alt: React Progressive Web Application example Image
---
In this tutorial, we will build a Todo application using React and Django. [React](https://reactjs.org/) is a front-end JavaScript framework that uses components in creating user interfaces for single-page applications. [Django](https://www.djangoproject.com/) is a Python backend web framework used to build scalable and secure website applications.
<!--more-->
We are going to create an application that consumes [React](https://reactjs.org/) for the user interface and [Django](https://www.djangoproject.com/) for the API of our application using Django REST framework (DRF).

### Prerequisites
Basic knowledge of `React`, `Python(Django)` is required but I'll try and boil things down as much as possible.

You can check out these articles to get started with React and Python:

- [Introduction to React](https://www.freecodecamp.org/news/react-introduction-for-people-who-know-just-enough-jquery-to-get-by-2019-version-28a4b4316d1a/)

- [Django Tutorials](https://realpython.com/tutorials/django/)

Before getting your hands dirty, you may need to:

1. [Install Python 3](https://www.python.org/downloads/)

2. [Install Node.js](https://nodejs.org/en/download/)

### Step 1: Backend using Django
From a terminal create a new project directory called `django-react-todoApp`

```bash
mkdir django-react-todoApp
cd django-react-todoApp
```

We must have a virtual environment activated to be able to install Django. 

Let's create a virtual environment and activate it:
```bash
pip install pipenv
pipenv shell
```

Install Django and create a project named `backend`:

```bash
pipenv install django
django-admin startproject backend
```

Now that we have created our project, let's go ahead and create an application called `todo` and migrate the models into the database.

If everything works you should see the "Congratulations" page from Django.

Navigate to `backend/settings.py` and add `todo` to the list of `INSTALLED_APPS`

```python
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'todo',
]
```

We'll go ahead and set up our model for Todo item fields. 

Modify `todo/models.py` as follows:

```python
from django.db import models

class Todo(models.Model):
   title = models.CharField(max_length=100)
   description = models.TextField()
   completed = models.BooleanField(default=False)

   def _str_(self):
     return self.title
```

The model contains:
- Title: What the task is.

- Description: Give more explanation about a particular task.

- Completed: If the task is complete the status is True otherwise it remains False.

Django uses `_str_()` to display a default attribute to be displayed, in our case we return `title` to be shown from our model.

Let us run migrations to add our model to the database schema.

```bash
python manage.py makemigrations
python manage.py migrate
```

Django comes with a built-in admin interface. The interface allows administrators and authorized users to perform actions directly to the objects defined in the models.

We can add models to our Admin page using the `admin.site.register()` functions. In the todo app's `admin.py`, let's add the model to our admin page.

```python
from django.contrib import admin
from .models import Todo

class TodoAdmin(admin.ModelAdmin):
  list = ('title', 'description', 'completed')

  admin.site.register(Todo, TodoAdmin)
```

Let's create a superuser for the admin page to login.

```bash
python manage.py createsuperuser
```

This will prompt you to enter the `username`, `email`, `password`, `password(again)`. We can open the admin page using the following link `http://localhost:8000/admin`.

```bash
python manage.py runserver
```

![admin dashboard](/engineering-education/react-and-django-rest-framework/admin.jpg)

We can now add and delete items from the admin page. Great!

![admin panel](/engineering-education/react-and-django-rest-framework/adminpanel.jpg)

### Step 2: Putting in the APIs
You can learn more about APIs in this amazing [article](/rest-api/).

Install the `djangorestframework` and `django-cors-headers`:

```bash
pipenv install djangorestframework django-cors-headers
```

Add `rest_framework` and `corsheaders` to the `INSTALLED_APPS` in `backend/settings.py` file and modifiy the `MIDDLEWARE`:

```python
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'todo',
    'corsheaders',
    'rest_framework',
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]
```

Add this code snippet in `backend/settings.py` file:

```python
CORS_ORIGIN_WHITELIST = [
    'http://localhost:3000',
]
```

Django-cors-headers is an HTTP-header-based that allows a server to indicate any other origins to your Django application. [Cross-origin Resource Sharing (CORS)](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS). Within the `CORS_ORIGIN_WHITELIST` , `localhost:3000` will serve as our port.

Now, let's create a serializer file.

A serializer is a component that converts Django models to JSON objects and vice-versa.

```bash
touch todo/serializers.py
```

Let's add this to the `serializers.py` file:

```python
from rest_framework import serializers
from .models import Todo

class TodoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Todo
        fields = ('id' ,'title', 'description', 'completed')
```

From the `rest_framework` package, we import the `serializers`. We create a class, `TodoSerializer` that extends from the `ModelSerializer` class. We then go ahead and specify the model and fields we want to be returned.

Let's also update the `todo/views.py`:

```python
from django.shortcuts import render
from .serializers import TodoSerializer 
from rest_framework import viewsets      
from .models import Todo                 

class TodoView(viewsets.ModelViewSet):  
    serializer_class = TodoSerializer   
    queryset = Todo.objects.all()     
```

Before creating webpages in Django we must define our URLs. A URL is an address to which a webpage is served. Defining URLs describes what requests are returned from the views when the templates are rendered in the browser.

In the `backend/urls.py` we define the URL routes for the API:

```python
from django.contrib import admin
from django.urls import path,include               
from rest_framework import routers                 
from todo import views                             

router = routers.DefaultRouter()                   
router.register(r'todos', views.TodoView, 'todo')  

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls))             
]
```

The next module is the `router.urls` that provides routing for our API.

The `router` enables us to create the subsequent operations:

Performing CRUD operations to our items is enabled by the `router`.

- `/todos/` - This route return each item from our API.

- `todos/id` - Returns a specific item and it's `id`.

```bash
python manage.py runserver
```

![api](/engineering-education/react-and-django-rest-framework/json.jpg)

We have set our backend to let us move forward to the frontend.

### Step 3: Frontend using React
To install React we use the following command:

`-g` stands for global as we are first installing `create-react-app` globally:

```bash
npm install -g create-react-app
```

While in the parent directory - `django-react-todoApp`- create a React application, `frontend`:

```bash
create-react-app frontend
```

To start the server:

```bash
cd frontend
npm start
```

You should be able to see the default React app by now.

Next, let's install `bootstrap` and `reactstrap` to style the user interface. You can learn more on bootstrap and reactstrap from [here](https://www.npmjs.com/package/reactstrap).

```bash
npm install bootstrap@4.6.0 reactstrap@8.9.0 --legacy-peer-deps
```

When we open our `index.js` file it should resemble the code below:

```JavaScript
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
    <App />,
    document.getElementById('root')
);

//React generated comments ignored
reportWebVitals();
```

`ReactDOM.render()` renders a React element into the DOM in the given container element. It takes two arguments. The first is the JSX being rendered, and the second displays the container element on the HTML page. 

Substitute the below code in `src/App.js`:

```JavaScript 
import React, { Component } from "react"

const todoItems = [
  {
    id: 1,
    title: "Nature walk in the park",
    description: "Visit the park with my friends",
    completed: true
  },

  {
    id: 2,
    title: "Visit",
    description: "Got to my aunt's place",
    completed: true
  },

  {
    id: 3,
    title: "Write",
    description: "Do an article about anthropology",
    completed: true
  },
];

class App extends Component {
    constructor(props) {
      super(props);
      this.state = {todoItems};
    };

    render() {
      return (
        <main className="content">
        <div className="row">
          <div className="col-md-6 col-sm-10 mx-auto p-0">
            <div className="card p-3">
              <ul className="list-group list-group-flush">
              {this.state.todoItems.map(item => (
              <div>
                <h1>{item.title}</h1>
                <span>{item.description}</span>
              </div>
              ))}
              </ul>
            </div>
          </div>
        </div>
      </main>
      )
    }
  }
  
export default App;
```

We start by rendering a list of items. The list will be artificial data but later we'll fetch the data from the API we created in the previous steps.

We define a list of items. Each item has an `id`, `title`, `description`, and status of whether the task is completed or not, `completed`.

We introduce the class constructor where we set the initial state. In our case, the internal state is the dummy list of items, `todoItems`.

We use the built-in JavaScript `map` functionality in our JavaScript XML (JSX). 

The `map()` method creates a new array populated with the results of calling a provided function on [every element in the calling array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map). We use curly braces to evaluate JavaScript expressions.

The `render()` method when called displays the JSX. The `classname` attribute in the `render()` method enables us to use the CSS properties. 

We use [arrow functions](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Functions/Arrow_functions) because they shorten our functions declaration.

Your User Interface should resemble the one below:

![frontend](/engineering-education/react-and-django-rest-framework/dummy_data.jpg)

It is time to consume the API we created earlier.

```bash
cd backend
python manage.py runserver
```

We'll need to modify the `frontend/package.json` by adding `proxy`. A `proxy` is used in the development environment to facilitate communication between the server and the UI since the backend and the UI will be running on different ports. 

The `proxy` enables us to use Django's localhost which handles our API requests.

Let's go ahead and add it.

```JavaScript
[...]
"name": "frontend",
  "version": "0.1.0",
  "private": true,
  "proxy": "http://localhost:8000", 
  "dependencies": {
    "@testing-library/jest-dom": "^5.11.9",
    "@testing-library/react": "^11.2.3",
    "@testing-library/user-event": "^12.6.0",
    "react": "^17.0.1",
    "react-dom": "^17.0.1",
    "react-scripts": "4.0.1",
    "web-vitals": "^0.2.4"
    "reactstrap": "^8.8.1",
  },
  [...]
```

To consume our API instead of the artificial data, update the `frontend/src/App.js` with the snippet below:

```JavaScript
import React, { Component } from "react"

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

    async componentDidMount() {
      try {
        const res = await fetch('http://localhost:8000/api/todos/');
        const todoList = await res.json();
        this.setState({
          todoList
        });
      } catch (e) {
        console.log(e);
    }
    }
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
        </li>
      ));
    };

    render() {
      return (
        <main className="content">
        <div className="row">
          <div className="col-md-6 col-sm-10 mx-auto p-0">
            <div className="card p-3">
              <ul className="list-group list-group-flush">
                {this.renderItems()}
              </ul>
            </div>
          </div>
        </div>
      </main>
      )
    }
  }
  
export default App;
```

Let's go through each line of code to better understand what they do:

In our constructor, we created a few properties in our `state` object. We assigned the `viewCompleted` property to false since our interface only shows items marked as not complete from our API at the moment. 

The `activeItem` property includes the `title`, `description` and passes `false` to `completed` as the default status. 

We then pass an empty array to our `todoList` because we are going to fetch our data from an API.

First, we wrap `fetch()` in a `try/catch` block to handle any network errors. We then call `fetch()` with the `await` keyword, where we pass our API endpoints.

The `async` enables asynchronous operations, it returns a resolve value promise from our function.

We will define the `componentDidMount()` method as part of the `async` function. This enables us to perform each `fetch` using the `await` keyword.

The `componentDidMount()` function is called by React when a component is rendered on the client-side. Read more about [life cycle functions from this article](https://reactjs.org/docs/react-component.html).

The `setState()` method in the `componentDidMount()` function is called when we want to update a change to our previous state in the application.

We create a `renderItems()` function that uses the `filter` built-in array functionality, to show the completed items from our `todoList`. The `filter` function takes a function to evaluate each item in the list. 

We define a variable `newItems` to store the items which we display by using the `map` functionality. We use a ternary conditional operator to show if an `item description` is marked as complete or not. 

Ternary is a JavaScript operator that returns true in the first condition and false in the second part of an expression.

In our `render()` method we display the items through the `renderItems()` function.

The consumed data from the API should be displayed as follows:

![api_data](/engineering-education/react-and-django-rest-framework/api_fetched_data.jpg)

To handle actions such as adding tasks and marking them complete, we can create a modal component.
 
Modal enables us to create custom content such as popovers or dialog boxes in our applications. 

Let's go ahead and create a `components` folder in the `src` directory then create a file in it called `Modal.js`:

```bash
mkdir src/components
cd components
touch Modal.js
```

Let's add this to the file:

```JavaScript
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

In the code above we first import React and the components from `reactstrap` that we installed earlier. In the constructor, we use the property that we created earlier in the `App.js` file. The `props` keyword passes the argument to the `activeItem` component as objects.

The `handleChange` method takes note of a change in the state of a React component, takes the event as a parameter, and does something to change the state. 

We use [destructuring assignment](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment) to create a checkbox where users can click to mark a task as complete. We then change the `activeItem` in our state object by `setState()` method.

In our `render()` method we pass `toggle` and the `onSave()` method to `props`. We return the Modal component when toggled.

We add the `toggle` component in the `ModalHeader` to enable dropping the modal. In the `ModalBody`, we add the forms for adding the item title and item description. 

In each `FormGroup`, we specify the `activeItem` value. We use the `onChange` event to detect when the input value changes and returns the target input's name and value. 

Since the last `FormGroup`'s input type is a checkbox the target value will be `checked` as we assigned it in our `handlechange()` method.

In the `ModalFooter` we will create a button to save our items using the `onSave()` method.

We can then create the `add task` and `mark as completed` functionalities in `App.js`.

Before we continue let's install `axios`. It allows our applications to make a request to external endpoints. We use it to perform CRUD operations to our API.

```bash
npm install axios@0.21.1
```

In the `App.js` add the code snippet below:

```JavaScript
import React, { Component } from "react"
import Modal from "./components/Modal"; 
import axios from "axios";

class App extends Component {
    state = {
      viewCompleted: false,
      activeItem: {
        title: "",
        description: "",
        completed: false
      },
      todoList: []
    };

    async componentDidMount() {
      try {
        const res = await fetch('http://localhost:8000/api/todos/');
        const todoList = await res.json();
        this.setState({
          todoList
        });
      } catch (e) {
        console.log(e);
    }
    }

    toggle = () => {
      this.setState({ modal: !this.state.modal });
    };
  
    //Responsible for saving the task
    handleSubmit = item => {
      this.toggle();
      if (item.id) {
        axios
          .put(`http://localhost:8000/api/todos/${item.id}/`, item)
        return;  
      }
      axios
        .post("http://localhost:8000/api/todos/", item)
    };

    createItem = () => {
      const item = {title: "", description: "", completed: false };
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
          <button 
            onClick={() => this.displayCompleted(true)}
            className={this.state.viewCompleted ? "active" : ""}
          >
            Complete
          </button>
          <button 
            onClick={() => this.displayCompleted(false)}
            className={this.state.viewCompleted ? "" : "active"}
          >
            Incomplete
          </button>
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
                <button onClick={this.createItem} className="btn btn-success">Add Task</button>
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
      )
    }
  }
  
export default App;
```

First, import the `Modal` that we created earlier and `axios`. The `toggle()` method changes the `Modal` state when toggled, if the expression is true it returns the properties defined in the `Modal` in `Modal.js`, otherwise nothing happens. We add this in the `render()` method.

The `handleSubmit()` saves our items to the API, we use `axios` to make the requests to it. We use `PUT` to insert the item into the already existing list of items according to the item id. 

We then create a `createItem()` method to add our task which is defined in the `render()` method.

The `displayCompleted()` method checks the status of the `viewCompleted` we created in our state earlier and returns true or false.

The `renderTabList()` method define two buttons `Complete` and `Incomplete`, if the `viewCompleted()` method returns true, the item is `Complete`. If it returns false then the item is `Incomplete`. We had stated earlier how the `renderItems()` method works.

Our `render()` method returns `renderTabList()`, `renderItems()` methods and the `Add Task` functionality which uses the `createItem()` method to allow users to add task.

Your application should be like the one below at this point:

![frontend](/engineering-education/react-and-django-rest-framework/final.jpg)

### Step 4: Testing
Let's start our backend server made using Django by running the following commands:

```bash
cd backend
pipenv shell
python manage.py runserver
```

Let's start our React application by running the following commands:

```bash
npm start
```

### Conclusion
We have learned how to integrate a Django application with React serving as the frontend.
 
You can learn more on Django and React from this [article](https://www.digitalocean.com/community/tutorials/build-a-to-do-application-using-django-and-react) (Jordan Irabor, 2020).

Happy coding.

---
Peer Review Contributions by: [Mohan Raj](/engineering-education/authors/mohan-raj/)

