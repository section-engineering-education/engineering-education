### What is AJAX? 

Ajax is an acronym for Asynchronous JavaScript and XML. It’s not a language, framework or a web library. It’s a web technology that sends and receives data from a client to a server asynchronously all done in the background behind the scenes without needing to reload the current web page. It includes even though XML in the acronym, it’s rarely used in AJAX anymore, it has been replaced by JSON (JavaScript Object Notation). JSON is easy to use, faster and much more popular compared to XML.

### Prerequisite

1. [Python](https://www.python.org/downloads/) and above installed on your computer.

2. Python package manager, [pip](https://pypi.org/project/pip/) installed on your computer.

3. knowledge of [Django]()

3. knowledge of [JavScript](https://javascript.info/).

### Goals.

- Using Axios to submit a form.

- Handling a post request in Django.

### Project setup

Ensure `virtualenv` is installed on your computer.

```bash

$ virtualenv --version

virtualenv 20.2.2 from /home/username/.local/lib/python3.8/site-packages/virtualenv/__init__.py

```

If you get an error message command, run the command below to install `virtualenv` on your computer.

```bash

 pip install virtualenv

```

Change to any directory of your choice on your system/laptop or you can as well make a new directory.  Create a virtual environment for our project using the `virtualenv`.

 Run the command below to create and activate the virtual environment.

```bash

$ virtualenv venv

$ source venv/bin/activate

```

 

I have created a starter template for you to follow along in this tutorial, clone the starter template in your current directory using the command below.

```bash 

 git clone https://github.com/atoyegbe/note-app.git

 ```

 

Run the command below to install the dependency needed for this project to work.

```bash 

pip install -r requirements.txt

```

Let’s make sure nothing is broken in our application, change into the project directory and run the command below.

```bash 

python manage.py runserver

```

![form page](/engineering-education/ajax-request-in-django-using-axios/form_page.png)

Let’s go into the **templates/home.html** and we will add to our project the **Axios** library by adding the CDN script tag below outside the div tag.

```html

{% include ‘base.html’ %}

{% block content %}

<div class="container">

     <h1> Notes </h1>

 .....

 ....

</div>

<!-- Adding axios script tag here-->

<script src="https://cdnjs.cloudflare.com/ajax/libs/axios/0.21.1/axios.min.js"></script>

{% endblock %}

```

### Using Axios to submit a form.

Adding event listner to the form and sending form data to django serverside. Add this code snippets below the axios script tag.

```javascript

<script>

let form = document.getElementById(‘form’); #selecting the form

form.addEventListener(‘submit’, function(event) { #a

    event.preventDefault()

    let data = new FormData(); #b

    data.append(“title”, document.getElementById(‘title’).value)  

    data.append(“note”, document.getElementById(‘note’).value)

    data.append(“csrfmiddlewaretoken”, ‘{{csrf_token}}’) #c

    

    axios.post(‘create_note/’, data) #d

     .then(res => alert(“Form Submitted”)) #e

     .catch(errors => console.log(errors)) #f

})

</script>

```

The above code 

   - #a - Adding a submit event listener to the form.

   - #b - Creating a new Form in JavaScript.

   - #c - adding a CRSF token, if we do not include this we get a 403 forbidden response we won’t be able to submit the form data.

   - #d - Here we use **axios.post** method to submit form data.

   - #e - A alert message **Form Submitted** pop on your windows if the form submitted successfully.

   - #f - This catches and displays the error in the console if an error occurs when submitting the form.

   

Your **home.html** file should exactly like this.

```html

{% include ‘base.html’ %}

{% block content %}

<div class="container">

     <h1> Notes </h1>

    <form method="POST" id="form">

        {% csrf_token %}

        <div class="form-group">

            <label for="title">

                Title

            </label>

            <input type="text" class="form-control" id="title">

        </div>

        <div class="form-group">

            <label for="note">Note</label>

            <textarea class="form-control" id="note" rows="3"></textarea>

        </div>

        <button type="submit">Submit </button>

    </form>

</div>

<!-- Adding axios script tag  here-->

<script src="https://cdnjs.cloudflare.com/ajax/libs/axios/0.21.1/axios.min.js"></script>

<script>

    let form = document.getElementById(‘form’);

    

    form.addEventListener(‘submit’, function(event) { 

        event.preventDefault()

        let data = new FormData(); 

        data.append(“title”, document.getElementById(‘title’).value)  

        data.append(“note”, document.getElementById(‘note’).value)

        data.append(“csrfmiddlewaretoken”, ‘{{csrf_token}}’) 

        

        axios.post(‘create_note/’, data) 

         .then(res => alert(“Form Submiited”))

         .catch(errors => console.log(errors))

    })

</script>

{% endblock %}

```

### Handling Post Request in Django views.

Navigate to the note app in the views.py file. add the code below

```python

from django.http import JsonResponse #1

    ....

    ....

def createNote(request):

    if request.method == ‘POST’: #2

        title = request.POST.get(‘title’) #3

        note = request.POST.get(‘note’) #4

        Note.objects.create(      #5

            title=title,

            note=note

        )

    

    return JsonResponse({"status": “Success”}) #6

```

 - #1 - JsonResponse is an HttpResponse subclass that helps to create a JSON-encoded response

 - #2 - Check if the request is a **POST method** request

 - #3 - 

 - #4 -

 - #5 - Creating a new Note object in the database.

 - #6 - 

Your note/view.py file should look like this now.

```python

from django.shortcuts import render

from .models import Note    #imported the Note model from the models.py file

from django.http import JsonResponse 

# Create your views here.

def homepage(request):

    notes = Note.objects.all()

    return render(request, ‘home.html’, context={"notes": notes})

def note(request):

    notes = Note.objects.all()

    return render(request, ‘notes.html’, context={"notes": notes})

    

def createNote(request):

    if request.method == ‘POST’:

        title = request.POST.get(‘title’)

        note = request.POST.get(‘note’)

        Note.objects.create(

            title=title,

            note=note

        )

    

    return JsonResponse({"message": “Your note have been saved”})

```

In the note/ursl.py file

```python

from django.urls import path 

from .views import *

urlpatterns = [

    path(‘’, homepage, name="home"),

    path(‘notes/’, notes, name="notes"),

    path(‘create_note/’, createNote, name="note" ) #add this 

]

```

Let test our form, first start up the project development server by running the command below.

```python 

python manage.py runserver

```

Fill in the form and submit it. You should see an alert message pop up in your browser. Saying “Form Submitted” 

Navigate to **http://127.0.0.1:8000/notes/** in your browser if your form works as expected, you should see the details of the note you submitted.