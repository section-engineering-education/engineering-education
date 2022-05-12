---
layout: engineering-education
status: publish
published: true
url: /build-vue-application-with-django-rest-api-and-axios/
title: Building a Vue Application with Django REST-API and Axios
description: This tutorial aims to guide the reader on how to build Vue web applications that can consume and display data from APIs using the Axios library.
author: atonya-dennis
date: 2022-01-25T00:00:00-09:50
topics: [Languages]
excerpt_separator: <!--more-->
images:
  - url: /engineering-education/build-vue-application-with-django-rest-api-and-axios/hero.jpg
    alt: Build Vue application with Django Image
---

It is common when developing applications to use APIs to consume and display data. This process can be made possible using the Axios library to create Vue.js apps where Django, a python-based backend framework, is only used as an API using the Django rest framework package.
<!--more-->
To help you grasp this concept, we will cover using Vue.js, Axios, and the Django REST APIs to consume and display data from APIs.

### Table of contents
- [Prerequisites](#prerequisites)
- [Introduction](#introduction)
- [Setting up Django and Vue](#setting-up-django-and-vue)
- [Creating the Django application](#creating-the-django-application)
  - [Django TodoApp project](#django-todoapp-project)
  - [Django TodoApp Models](#django-todoapp-models)
  - [API accessibility the by Vue application](#api-accessibility-by-the-vue-application)
- [Creating the Vue application](#creating-the-vue-application)
- [Getting and displaying application data](#getting-and-displaying-application-data)
- [Conclusion](#conclusion)

### Prerequisites
The reader should have the following to follow along with this tutorial:
- Fundamental understanding of the [Django REST framework](https://www.django-rest-framework.org/) and REST API.
- Knowledge about [Vue.js](https://vuejs.org/) and the [Axios](https://www.axios.com/) library.
- Know how to use [PyCharm](https://www.jetbrains.com/pycharm/download/#section=windows), [Visual Studio Code](https://code.visualstudio.com/download), or any other IDE for working with [Python Django](https://www.djangoproject.com/start/) and [Vue.js](https://vuejs.org/).


### Introduction
**Django** is a Python-based backend framework used to create native applications or APIs using the Django rest framework package. We can also combine it with Vue.js, a JavaScript-based front-end framework, in building applications.

This process is made possible by including the Vue.js scripts directly into the Django template HTML code. However, we can also use the Django API to consume and display data using the HTTP client library called **Axios**. To implement this, we will create a simple Vue Todo Application together with the Django REST API and Axios.

### Setting up Django and Vue
You have to set up Django, Vue.js, and the Axios library on your machine to get started. First, use the command below to check if Django is installed:

```bash
pip show Django
```

If not, install it using the following command:

```bash
pip install Django
```

Since we will use the Django REST API and Axios, we need to install both the `Django rest framework` package to handle API requests and the `Django-cors-headers` to allow requests done via Ajax.

```bash
pip install djangorestframework
pip install django-cors-headers
```

For the Vue.js and Axios library, we use the commands below:

```bash
sudo npm install -g @vue/cli //for vue.js
npm install Axios
```

### Creating the Django application 
After setting up Django, let us create our Todo application and all the required models.

#### Django TodoApp project
We begin by creating the Django project and activating the virtual environment.

```bash
django-admin.py startproject TodoApp
```

To create and activate the virtual environments:

```bash
virtualenv -p env
source bin/activate
```

Inside the TodoApp folder, add the installed Django rest_framework, and cors headers inside the `settings.py` file under the INSTALLED_APPS section.

Next, run the application after making all the migrations using the commands below:

```python
python manage.py runserver
```
And the output produced should be:

![Django Output](/engineering-education/build-vue-application-with-django-rest-api-and-axios/output.jpg)

> NOTE: To tell the Django project that connections are accepted, ensure to add the line `CORS_ORIGIN_ALLOW_ALL = True` inside the `settings.py` file.

#### Django TodoApp Models 
We need to create the Todo Application inside the `TodoApp` folder using the command shown and then add the application's name inside the `settings.py` file under the INSTALLED_APPS section.

```python
python manage.py startapp todo
```

Next, we need to create the superuser and the database models required with the help of the command below:

```python
python manage.py createsuperuser #set the username, email, and password
```

Add the code snippet below inside the `models.py` file under the todo application folder to create the database.

```python
class WorkTodo(models.Model):  
    WORKTODO = 'worktodo'
    WORKDONE = 'workdone'

    STATUS_CHOICES = (  
        (WORKTODO, 'Work To do'),
        (WORKDONE, 'Work Done')
    )

    work_description = models.CharField(max_length=255)  
    work_status = models.CharField(max_length=10, choices=STATUS_CHOICES,
                              default=WORKTODO)  
```

Since we use the rest_framework, we need to create another file under the todo application folder called `serializers.py`. 

This file is relatively similar to the Form and ModelForm classes in Django. It provides a convenient shortcut for creating serializers that deal with model instances and querysets, and a general approach to managing the output of your responses. With the serializers, the data is then transformed into a format that can be stored or transmitted.

```python
from rest_framework import serializers
from .models import WorkTodo

class WorkSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = WorkTodo
        fields = ('id', 'work_description', 'work_status')
```

To return the tasks of the todo application, we add the code snippet to the `views.py` file.

```python
from django.shortcuts import render
from .models import WorkTodo 
from .serializers import WorkSerializer 


from rest_framework import viewsets
from rest_framework.authentication import BasicAuthentication
from rest_framework.permissions import IsAuthenticated

class WorkViewSet(viewsets.ModelViewSet): 
    authentication_classes = (BasicAuthentication,)
    permission_classes = (IsAuthenticated,)
    queryset = WorkTodo.objects.all() 
    serializer_class = WorkSerializer 
```

Run all the database migrations, open the python shell, and execute the commands below.

```python
python manage.py shell 
>>> from todo.models import WorkTodo
>>> task1 = WorkTodo.objects.create(work_description='Cleaning')
>>> task2 = WorkTodo.objects.create(work_description='Reading')
>>> task3 = WorkTodo.objects.create(work_description='Cooking',work_status=1)
>>> WorkTodo.objects.all()
<QuerySet [<WorkTodo: WorkTodo object (1)>, <WorkTodo: WorkTodo object (2)>, <WorkTodo: WorkTodo object (3)>]>
>>> 
```

#### API accessibility by the Vue application
For the API to be viewed by the Vue application, add the code below inside the `TodoApp/urls.py` file.

```python
from Django.contrib import admin
from Django.URLs import path, include

from rest_framework import routers 

from todo.views import WorkViewSet 

router = routers.DefaultRouter() 
router.register(r'tasks', WorkViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include(router.urls))
]
```

We then run the CURL command below by entering the username and password used when creating the superuser to test the application.

```bash
$ curl -H 'Accept: application/json; indent=4' -u username:useranmepassword http://127.0.0.1:8000/tasks/
```

The command produces the output below:

![Test Output](/engineering-education/build-vue-application-with-django-rest-api-and-axios/test-output.jpg)

The complete Django code can be found [here](https://github.com/dentonya/Todo-Application-using-Vue.js-Django-REST-API-and-Axios/tree/master/django/TodoApp).

### Creating the Vue application
After setting up the Vue.js, we create and run our project using the commands below:

```bash
vue create TodoApp
cd TodoApp
npm run serve
```

![Vue Output](/engineering-education/build-vue-application-with-django-rest-api-and-axios/vue-output.jpg)

### Getting and displaying application data 
Once the Vue.js app is created, we need the application to communicate with the backend using the `Axios` library and display the tasks. Add the code snippets below in the `HelloWorld.vue` file under the `src` folder.

```html
<template>
  <div class="hello">
    <h1 class="title">TODO APP</h1> 

    <hr>

    <div class="columns">
      <div class="column is-one-third is-offset-one-third">
        <form>
          <h2 class="subtitle">Add the task</h2>

          <div class="field">
            <label class="label">Add Description</label>
            <div class="control">
              <input class="input" type="text">
            </div>
          </div>

          <div class="field"> 
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

          <div class="field is-grouped"> 
            <div class="control">
              <button class="button is-link">Submit</button>
            </div>
          </div>
        </form>
      </div>
    </div>

    <hr>

    <div class="columns">
      <div class="column is-half"> 
        <h2 class="subtitle">Task Todo</h2>

       <div class="todo">
      <div class="card" v-for="task in tasks" v-if="task.status == 'todo'"> 
        <div class="card-content">
          <div class="content">
            {{ task.work_description }} 
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
      <div class="card" v-for="task in tasks" v-if="task.status == 'done'">
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
      tasks: [] 
    }
  },
  mounted () { 
    this.get_Tasks();
  },
  methods: {
    get_Tasks() {
        axios({
            method:'get',
            url: 'http://127.0.0.1:8000/tasks/',
            auth: {
                username: 'your username',
                password: 'your password'
            }
        }).then(response => this.tasks = response.data);
    }
  }
}
</script>
```

Re-running the project, you should see two sets of tasks. The tasks to be done appear on the left, while the ones that were already done on the right.

The complete code for this application can be found [here](https://github.com/dentonya/Todo-Application-using-Vue.js-Django-REST-API-and-Axios/tree/master/vue.js/todoapp).

![Final Output](/engineering-education/build-vue-application-with-django-rest-api-and-axios/final_output.jpg)

### Conclusion
In this tutorial, we have learned how to use the Axios library to fetch and display data in Vue.js applications, and we have used Django framework as a backend API.

### Further reading
- [Combining Django and - Everything you Need to Know](https://codewithstein.com/combining-django-and-vuejs-everything-you-need-to-know/).

Happy coding!

---
Peer Review Contributions by: [Mercy Meave](/engineering-education/authors/mercy-meave/)
