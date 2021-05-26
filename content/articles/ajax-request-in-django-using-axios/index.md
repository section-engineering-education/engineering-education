---
layout: engineering-education
status: publish
published: true
url: /ajax-request-in-django-using-axios/
title: How to Make Ajax POST Request in Django using Axios
description: In this article, we will look at how to make an Ajax POST request in Django using Axios. Axios is a Javascript library used to make HTTP requests from Node.js or XML HttpRequests from the browser.
author: adeyemi-atoyegbe
date: 2021-02-10T00:00:00-10:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/ajax-request-in-django-using-axios/hero.jpg
    alt: Django Ajax Axios example
---
Ajax is an acronym for Asynchronous JavaScript and XML. It is neither a language, a framework, nor a web library. It is a web technology that sends and receives data from a client to a server asynchronously, all done in the background without needing to reload the current web page.
<!--more-->
Even though it includes XML in the acronym, it’s rarely used in AJAX anymore. It has been replaced by JSON (JavaScript Object Notation). JSON is easy to use, faster, and much more popular compared to XML.

### What is Axios?
Axios is a Javascript library used to make HTTP requests from Node.js or [XMLHttpRequests](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest) from the browser. It is a lightweight HTTP client based on the XMLHttpRequests service. It is similar to the [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) and is used to perform HTTP requests.

### Prerequisites
1. [Python 3.7](https://www.python.org/downloads/) or newer installed on your computer.

2. Python package manager, [pip](https://pypi.org/project/pip/) installed on your computer.

3. Knowledge of [Django](https://www.djangoproject.com/).

4. Knowledge of [JavaScript](https://javascript.info/).

### Goals
- Using Axios to submit a form.

- Handling a POST request in Django.

### Project setup
First, ensure `virtualenv` is installed on your computer by running the command below.

```bash
$ virtualenv --version

virtualenv 20.2.2 from /home/username/.local/lib/python3.8/site-packages/virtualenv/__init__.py
```

If you get an error message, run the command below to install `virtualenv` on your computer.

```bash
$ pip install virtualenv
```

Change to a directory of your choice on your machine or make a new directory. Then, create a virtual environment for our project using `virtualenv`.

Run the commands below to create and activate the virtual environment.

```bash
$ virtualenv venv
$ source venv/bin/activate
```

I have created a starter template for you to follow along in this tutorial. Clone the starter template in your current directory using the command below.

```bash 
$ git clone https://github.com/atoyegbe/note-app.git
```

Change into the cloned directory using `cd note-app` and run the command below to install the dependencies needed for this project to work.

```bash 
$ cd note-app
$ pip install -r requirements.txt
```

Your project directory should look like this.

```bash
--note-app
|    --notes
|   | ---note
|   | ---notes
|   | ---templates
|   |    --- base.html
|   |    --- home.html
|   |    --- notes.html
|   | ---db.sqlite3
|   | ---manage.py
|   .gitignore
|   requirements.txt
```

Let’s make sure nothing is broken in our application, change into the project directory by running `cd notes` and run the command below.

```bash 
$ python manage.py runserver
```

After running the command above you will see something like this in your browser.
![form page](/engineering-education/ajax-request-in-django-using-axios/form_page.png)

Let’s go into `templates/home.html`. We will add **Axios** library to our project by adding the CDN script tag below `</div>` closing tag.

```html
{% include 'base.html' %}

{% block content %}

<div class="container">

     <h1> Notes </h1>

     <!-- ..... -->
     <!-- ..... -->

</div>

<!-- Adding axios script tag here-->

<script src="https://cdnjs.cloudflare.com/ajax/libs/axios/0.21.1/axios.min.js"></script>

{% endblock %}
```

Let us add an event listener to the form to send data to the Django server-side. Add the code below, just below the Axios script tag.

```html
<script>
let form = document.getElementById('form'); // selecting the form

form.addEventListener('submit', function(event) { // 1
    event.preventDefault()
    
    let data = new FormData(); // 2
    
    data.append("title", document.getElementById('title').value)  
    data.append("note", document.getElementById('note').value)
    data.append("csrfmiddlewaretoken", '{{csrf_token}}') // 3
    
    axios.post('create_note/', data) // 4
     .then(res => alert("Form Submitted")) // 5
     .catch(errors => console.log(errors)) // 6

})

</script>
```

The above code:
- 1 - Adds a submit event listener to the form.
- 2 - Creates a new form in JavaScript.
- 3 - Adds a CRSF token. If we do not include this we get a `403 forbidden response` and we won’t be able to submit the form data.
- 4 - Here we use `axios.post` method to submit form data.
- 5 - A `Form Submitted` alert message pop on your browser if the form is submitted successfully.
- 6 - This catches and displays the error in the console if an error occurs when submitting the form.

### Handling Post request in Django views
Navigate to the `note` directory and add the code below into `views.py`.

```python
from django.http import JsonResponse 
#....
#....
def createNote(request):
    if request.method == 'POST': 
        title = request.POST.get('title') 
        note = request.POST.get('note’) 
        Note.objects.create(
            title=title,
            note=note
        )
    return JsonResponse({"status": 'Success'}) 
```

In `note/urls.py` edit the code to look like the snippet below.

```python
from django.urls import path 
from .views import *
urlpatterns = [
    path('', homepage, name="home"),
    path('notes/', notes, name="notes"),

    path('create_note/', createNote, name="note" ) #add this 
]
```

Let's test our form. First, start the project development server by running the command below.

```bash 
$ python manage.py runserver
```

Fill in the form and submit it. You should see a `Form Submitted` alert message pop up on your browser.

Navigate to **http://127.0.0.1:8000/notes/** on your browser. If your form works as expected, you should see the details of the note you submitted.

That is it. 

Happy coding!

---
Peer Review Contributions by: [Geoffrey Mungai](/engineering-education/authors/geoffrey-mungai/)
