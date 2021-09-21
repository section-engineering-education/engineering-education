Firebase is a backend cloud platform by google which provides a wide range of services like, real-time database and storage to help build apps. It is an online NoSQL database, which stores data in JSON-like format.

### Why Firebase

Firebase manages data in real-time, and can also be used in an application that isn't managing large amounts of data. Some of the benefits of using firebase are:

- Easy Setup
- Google Analytics
- Hosting
- Multi-platform Authentication

In this tutorial, we'll be looking at how to use the firebase real-time database in Django by building a simple project.

### Prerequisites
To follow along with this tutorial, you'll need [Python3](https://www.python.org/downloads/) installed on your machine.

A little understanding of Django would help the reader follow along better.

To understand more about Django, it is recommended to read these articles on [Django CRUD APIs](/engineering-education/django-crud-api/) and [Django API documentation](/engineering-education/django-api-documentation/).

### Table of contents
- [Creating Firebase project](#creating-firebase-project)
- [Conclusion](#conclusion)

### Creating Firebase project
To create a Firebase project, we need to head over to the [Firebase console](https://console.firebase.google.com).

Next, we click Add project
![Adding firebase project](/engineering-education/integrating-firebase-database-in-django/new-project.png)

*Adding project*

Next, we are asked to give our project a name
![Project name](/engineering-education/integrating-firebase-database-in-django/project-name.png)

*Project Name*

After typing in our project name, we click on the continue button, which takes us to the screen asking if we'd like google analytics in our project. We don't need analytics in our project, you can click the toggle button or just click continue.

Next, we need to select our account and click on create project. This takes a few seconds to create.
![Project created](/engineering-education/integrating-firebase-database-in-django/created.png)

*Project created*

Now that our project has been created, we click on continue, which redirects us to our project's dashboard.
![Project name](/engineering-education/integrating-firebase-database-in-django/project-name.png)

*Project Name*

On our dashboard, we have three icons, ios, android and web. Since we are working on a web project, we'll be clicking on the web icon. This directs us to a form which asks us to name our web app. Type in a name and click `register app`.
![App name](/engineering-education/integrating-firebase-database-in-django/appname.png)

*App name*

After clicking on the `register app` button, it gives us some code. Copy the code somewhere, we'll be needing it soon. Then we click on the `continue to console` button.

Now we are brought back to the dashboard. We need to refresh the page to view our newly created app.
![Refresh Dashboard](/engineering-education/integrating-firebase-database-in-django/refresh.png)

*refresh dashboard*

### Creating Database
To create a database, from our dashboard we click on  `Realtime Database`, `Create Database`.

Next, we need to set up the database. You can go with the default country and click `next`. For the security rules, we'll be choosing the `Start in Test Mode` option. This is because is still in testing stage. The `Start in Locked Mode` should be selected once the app is ready for production.

![Database Setup](/engineering-education/integrating-firebase-database-in-django/test-mode.png)

*Database Setup*

Once we are done with that, we are presented with a page for input data into our database.
![Database](/engineering-education/integrating-firebase-database-in-django/setup.png)

*Database*

Now let's add some demo data. Click on the `+` icon. Next, in the `Name` field, type in `Data`. We want our data in a dictionary form, so we'll be leaving the `value` field blank.

Next, click the `+` icon next to the value field to add another child. Fill in the `Name` and `Data` field. To another child, click on the `+` icon next to `Data`. Add a few more data, then click on the `Add` button. We should have a result like this:
![Data](/engineering-education/integrating-firebase-database-in-django/database.png)

*Data*

Now, let's integrate our newly created database into our Django app. 

### Creating and setting up a new Django project
Let's begin by setting up a new virtual environment.

A virtual environment allows you to set up a virtual space on your computer.

By creating a virtual environment, you'll be able to separate the necessary library installation for a project without having to install them globally.

Now, lets set up a virtual environment `env` by running the command below:

```bash
python -m venv env
```

On creation, we activate the virtual environment using the following command:

```bash
source env/bin/activate
```

Next, we install Django using the following command:

```bash
pip install django
```

Next, we create a new Django project `firebase` using:

```bash
django-admin startproject firebase
```

Then, navigate to the `firebase` directory and create a Django app:

```bash
cd Django-charts
django-admin startapp fireapp
```

Let's add our app to the list of already installed apps.

Navigate to the `firebase` directory and edit the `settings.py` file:

```python
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'fireapp',
]
```

To connect Firebase and Django, we need to install a python package named `pyrebase`

```bash
pip install pyrebase
```

### Creating a view
A view in Django is a function that accepts a web request and returns a web response.

Now, we'll be creating a view by adding the following to our `view.py` file:

```python
from django.shortcuts import render
import pyrebase

# Remember the code we copied from firebase.
#This can be copied by clicking on the settings icon > project settings, then scroll down in your firebase dashboard
config={
    "apiKey": "AIzaSyAxOhg2XQiRpktrfDpPGWoqjgQD7alSmq0",
    "authDomain": "fireapp-c3e36.firebaseapp.com",
    "databaseURL": "https://fireapp-c3e36-default-rtdb.firebaseio.com",
    "projectId": "fireapp-c3e36",
    "storageBucket": "fireapp-c3e36.appspot.com",
    "messagingSenderId": "564960363824",
    "appId": "1:564960363824:web:ff9ee05d0330b7f75734f5",
    "measurementId": "G-NBBM679DH2"
}

#here we are doing firebase authentication
firebase=pyrebase.initialize_app(config)
authe = firebase.auth()
database=firebase.database()


def index(request):
        #accessing our firebase data and storing it in a variable
        name = database.child('Data').child('Name').get().val()
        stack = database.child('Data').child('Stack').get().val()
        framework = database.child('Data').child('Framework').get().val()
    
        context = {
            'name':name,
            'stack':stack,
            'framework':framework
        }
        return render(request, 'index.html', context)
```

### Creating templates
We start by creating a templates directory in our fireapp directory. This templates directory will house our `index.html` file.

Next, we add the following lines of code to the `index.html` file.

```html
<h1>Firebase Database</h1>

<p>Hi, my name is {{name}} and i code {{stack}}.</p>
<p>My favourite framework is {{framework}}</p>

```

Next, we need to update the `DIRS` to the path of the templates folder in our `settings.py` file.

```python
TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [os.path.join(BASE_DIR, 'templates')],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]
```

Next, we edit our `urls.py` by adding the following code:

```python
from django.contrib import admin
from django.urls import path
from fireapp import views

urlpatterns = [
    path('admin/', admin.site.urls),  
    path('', views.index, name='index'),
 
]
```

Let's test this out by starting the server with the following command:

```bash
python manage.py runserver 
```

![result](/engineering-education/integrating-chart-js-in-django/result.png)

*Display database data*

### Conclusion
To conclude, we have learned about Firebase, and how to integrate the firebase database in a Django app.

In this tutorial, we learned how to use the `Realtime Database`. There are other firebase services you can try out, like authentication.

You can also check the [Firebase](https://firebase.google.com/docs) documentation for more info on Firebase.

You can check out the full code on [GitHub](https://github.com/shosenwales/django-firebase).
