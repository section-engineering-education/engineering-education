---
layout: engineering-education
status: draft
published: false
url: /build-vue-application-with-django-rest-api-and-axios/
title: Building Vue Application with Django REST API and Axios
description: The objective of this tutorial is to help the reader understand how we can build vue web applications that can consume and display data from API using the Axios library.
author: atonya-dennis
date: 2021-12-04T00:00:00-06:40
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/build-vue-application-with-django-rest-api-and-axios/hero.jpg
    alt: Vue example image
---
When developing applications, it's common to use APIs to consume and display data. We can make this possible using the Axios library, that can be used to create Vue.js apps where Django, a python-based backend framework, is only used as an API using the Django rest framework package.
<!--more-->
To help you grasp this, we'll cover how to use Vue, Axios, and the Django REST APIs to consume and display data from APIs.

### Table of contents
- [Table of contents](#table-of-contents)
- [Prerequisites](#prerequisites)
- [Introduction](#introduction)
- [Setting Up Django and Vue](#setting-up-django-and-vue)
- [Creating the Django App](#creating-the-django-app)
  - [Django TodoApp Project](#django-todoapp-project)
  - [Django TodoApp Models](#django-todoapp-models)
  - [API Accessibility by Vue App](#api-accessibility-by-vue-app)
- [Creating the Vue App](#creating-the-vue-app)
- [Getting and Displaying App Data](#getting-and-displaying-app-data)
- [Conclusion](#conclusion)

### Prerequisites
The reader should do the following to follow along with this tutorial:
-Have a fundamental understanding of the Django REST framework and REST API.
- Have knowledge about Vue.js and the Axios library.
- Know how to use PyCharm,Visual Studio Code or any other IDE for working with Python Django and Vue js.

Go to this [website](https://www.jetbrains.com/pycharm/download/#section=windows) to download and install the PyCharm IDE on your computer.


### Introduction
**Django** is a Python-based backend framework that may be used to create  applications by displaying HTML code or as a pure API using the Django rest framework package. We can also combine it with Vue.js, a JavaScript-based front-end framework, in building the best sites and applications.
This is made possible by including the Vue script directly into the Django template HTML code, but we can also use the Django API to consume and display data using the HTTP client library called **Axios**.
To implement this, we'll create a simple Vue Todo Application together with the Django REST API and Axios.

### Setting Up Django and Vue
We'll start by setting up the Django and Vue.js in our machines together with the Axios library.
Use the command below to check if Django is installed;
```bash
pip show django

```
If not, install it using the following command:
```bash
pip install django

```
Since we are using the Django REST API and Axios, we install the Django rest framework package to handle API requests and the Django-cors-headers allow requestS done via Ajax using the commands below:
```bash
pip install djangorestframework
pip install django-cors-headers
```
For the Vue.js and Axios library, we use the commands below.
```bash
sudo npm install -g @vue/cli //for vue.js
npm install axios
```

### Creating the Django App 
After finishing the setup of Django, we create our Todo application and all the required models.
#### Django TodoApp Project
We first create the django project and activate all the environments.
```bash
django-admin.py startproject TodoApp
```
To create and activate the environments:
```bash
virtualenv -p env
source bin/activate
```
Inside the TodoApp folder, add the installed Django rest_framework and cors headers inside the `settings.py` file under the INSTALLED_APPS section.
Run the application after making all the migrations using the commands below and the output produced should be as shown.

```python
python manage.py makemigrations
python manage.py migrate
python manage.py runserver
```
![Django Output](/engineering-education/build-vue-application-with-django-rest-api-and-axios/output.jpg)
>NOTE: In order to tell the Django project that connections are accepted anyway, ensure to add the line `CORS_ORIGIN_ALLOW_ALL = True` anyway inside the `settings.py` file.

#### Django TodoApp Models 
Since we need only one application in our project, we create the Todo Application inside the `TodoApp` folder using the command shown and then add the name of the application inside the `settings.py` file under the INSTALLED_APPS section;
```python
python manage.py startapp todo
```
We then create the superuser and the database models required by the help of the codes belows:
```python
python manage.py createsuperuser #set the username,email and password
```

To create the database, add the code snippet below inside the models.py file under the todo application folder.
```python
from django.db import models

# Create your models here.
class WorkTodo(models.Model):  # Our database model is called WorkTodo
    WORKTODO = 'worktodo'
    WORKDONE = 'workdone'

    STATUS_CHOICES = (  # We create a tuple of status choices
        (WORKTODO, 'Work To do'),
        (WORKDONE, 'Work Done')
    )

    work_description = models.CharField(max_length=255)  # The worktodo description is limited to 255 characters
    work_status = models.CharField(max_length=10, choices=STATUS_CHOICES,
                              default=WORKTODO)  # The work status, default status = WORKTODO
```
Since we are using the rest_framework, we need to create another file under the todo application folder called `serializers.py`  and add the code below:
```python

from rest_framework import serializers

from .models import WorkTodo

class WorkSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = WorkTodo
        fields = ('id', 'work_description', 'work_status')
```
To return the tasks of the todo application we add the code to the `views.py`
```python
from django.shortcuts import render
from .models import WorkTodo # Import our WorkTodo model
from .serializers import WorkSerializer # Import the serializer we just created

# Create your views here.

# Import django rest framework functions

from rest_framework import viewsets
from rest_framework.authentication import BasicAuthentication
from rest_framework.permissions import IsAuthenticated

class WorkViewSet(viewsets.ModelViewSet): # Create a class based view
    """
    API endpoint that allows tasks to be viewed or edited.
    """
    authentication_classes = (BasicAuthentication,)
    permission_classes = (IsAuthenticated,)
    queryset = WorkTodo.objects.all() # Select all taks
    serializer_class = WorkSerializer # Serialize data
```
Run all the database migrations and use the command below to open the python shell and type a few of the tasks and their descriptions then close the shell.
```python
python manage.py shell # Opens up a shell
#add the code inside the shell 
>>> from todo.models import WorkTodo
>>> task1 = WorkTodo.objects.create(work_description='Cleaning')
>>> task2 = WorkTodo.objects.create(work_description='Reading')
>>> task3 = WorkTodo.objects.create(work_description='Cooking',work_status=1)
>>> WorkTodo.objects.all()
<QuerySet [<WorkTodo: WorkTodo object (1)>, <WorkTodo: WorkTodo object (2)>, <WorkTodo: WorkTodo object (3)>]>
>>> 
```
#### API Accessibility by Vue App
For the api to be viewed by the Vue application, add the code below inside the `TodoApp/urls.py` file.
```python
from django.contrib import admin
from django.urls import path,include

from rest_framework import routers # Import the router

from todo.views import WorkViewSet # Import the view we just created

router = routers.DefaultRouter() # Define the router with our view
router.register(r'tasks', WorkViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include(router.urls)), #add view to pattern
]
```
To test the application, we then run the CURL command below by entering the username and password used when creating the superuser.
```bash
$ curl -H 'Accept: application/json; indent=4' -u username:useranmepassword http://127.0.0.1:8000/tasks/
```
The command produces the output below;
![Test Output](/engineering-education/build-vue-application-with-django-rest-api-and-axios/test-output.jpg)

The full Django code can be found from [here](https://github.com/dentonya/Todo-Application-using-Vue.js-Django-REST-API-and-Axios/tree/master/django/TodoApp).

### Creating the Vue App
After setting up the Vue.js, we create and run our vue project with the commands below;
```bash
vue create TodoApp
cd TodoApp
npm run serve
```
Once the project runs successfully the output  below is displayed in the browser.
![Vue Output](/engineering-education/build-vue-application-with-django-rest-api-and-axios/vue-output.jpg)

### Getting and Displaying App Data 
Once the vue app is created we then communicate with the backend usig the `Axios` libary and display the tasks by inserting the code below inside the `HelloWorld.vue` file under the `src` folder.

```html
<template>
  <div class="hello">
    <h1 class="title">TODO APP</h1> <!-- Page title -->

    <hr>

    <div class="columns">
      <div class="column is-one-third is-offset-one-third"> <!-- Narrow centered column -->
        <form><!-- Form for adding tasks -->
          <h2 class="subtitle">Add the task</h2>

          <div class="field"> <!-- Normal input field for the description -->
            <label class="label">Add Description</label>
            <div class="control">
              <input class="input" type="text">
            </div>
          </div>

          <div class="field"> <!-- Select field for choosing the status-->v
            <label class="label">Select Status</label>
            <div class="control">
              <div class="select">
                <select>
                  <option value="worktodo">Work To do</option>
                  <option value="workdone">Work Done</option>
                </select>
              </div>
            </div>
          </div>

          <div class="field is-grouped"> <!-- Submit button -->
            <div class="control">
              <button class="button is-link">Submit</button>
            </div>
          </div>
        </form>
      </div>
    </div>

    <hr>

    <div class="columns">
      <div class="column is-half"> <!-- Half of the column for todo tasks -->
        <h2 class="subtitle">Task Todo</h2>

       <div class="todo">
      <div class="card" v-for="task in tasks" v-if="task.status == 'todo'"> <!-- Loop through the tasks array, if status is 'todo' then we'll show it. -->
        <div class="card-content">
          <div class="content">
            {{ task.work_description }} <!-- Print the task's description here -->
          </div>
        </div>

        <footer class="card-footer">
          <a class="card-footer-item">Work Done</a>
        </footer>
      </div>
    </div>
  </div>
  </div>

  <div class="column is-half">
    <h2 class="subtitle">Work Done</h2>

    <div class="done">
      <div class="card" v-for="task in tasks" v-if="task.status == 'done'"> <!-- Loop through the tasks array, if status is 'done'then we'll show it. -->
        <div class="card-content">
          <div class="content">
            {{ task.work_description }}
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'HelloWorld',
  data () {
    return {
      tasks: [] // Array for holding the tasks
    }
  },
  mounted () { // This will be called when HelloWorld is loaded
    this.get_Tasks(); // Call our getTasks function below
  },
  methods: {
    get_Tasks() {
        axios({
            method:'get',
            url: 'http://127.0.0.1:8000/tasks/',
            auth: {
                username: 'denatonya',
                password: 'ADMIN@123'
            }
        }).then(response => this.tasks = response.data);
    }
  }
}
</script>

<style scoped>
.select, select { /* 100% width for the select */
  width: 100%;
}

.card { /* Adding some air under the tasks */
  margin-bottom: 25px;
}

.done { /* Make the done tasks a little bit transparent */
  opacity: 0.3;
}
</style>
```
Running the project again you should see two tasks to the left(work to do) and one in the right which is done.
The complete code can be found [here](https://github.com/dentonya/Todo-Application-using-Vue.js-Django-REST-API-and-Axios/tree/master/vue.js/todoapp).

### Conclusion
As seen from the above tutorial,it is possible using the Axios library to fetch and display data when building Vue.js applications where Django framework  used purely as an API.

To summarize, we have:
- Learned how to combine Django and Vue.js
- Explored the Django REST API and how we can use Axios to communicate with Django backend.
- Built a Todo Vue.js applications showing how we can fetch and display data from Django  REST APIs.

You can find more on this [site](https://codewithstein.com/combining-django-and-vuejs-everything-you-need-to-know/).

Happy coding.

---
Peer Review Contributions by: 