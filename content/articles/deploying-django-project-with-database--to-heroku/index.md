![hero](/how-to-deploy-django-project-with-database-using-heroku-cloud-hoisting/django-heroku.png)

### Introduction 

Welcome folks! I am Arafat Olayiwola, a software developer and technical writer. In this tutorial I will be walking you through steps of deploying Django application with relational database using Heroku server by building a `studentprofile` application. Heroku is one of the cloud providers out there that allows developers to hoist their application on their server, and helps by monitoring, managing the health checks of the server. 

To deploy Django application on Heroku server, some dependencies are needed to set up and we shall do justice to that in this article. Feel free to brush up concepts of Django that require mastering in this article [Core Concepts of Django to master](/https://section.io/engineering-education/core-concepts-of-django-to-learn/), though it is not a prequisite for this.

#### Prequisites
1. Latest version of Python is required. So head on to `Python Docs` and download if you are not having it locally.
[Python Websites](/https://www.python.org/downloads/)

2. Latest Version of PostgreSQL database is needed. Download here.
[Download Postgres](/https://www.postgresql.org/download/)

3. Download workbench of postgreSQL here too. 
[Download Workbench](/https://www.pgadmin.org/download/)

4. Download git bash too. 
[Git Bash](/https://git-scm.com/download/win)


#### Key take aways
1. How to setup Django project with requirement dependencies.
2. Developing an application for the article and setting up database.
2. How to setup account and login with Heroku.
3. How to push up project to git so that Heroku account created can access it.
4. How to hoist your project and get domain name with extension of herokuapp.com.


### Setting Up Django Project
Like I said earlier, we are developing students profile mini websites that would have features like name, email, phone and delete button on each profile.

I will be using bash as CLI. Feel free to use your terminal if you do not have that. We need to set up virtual enviroment as dependency for django project. But before that, navigate to where your project will stay in your local computer and make the folder.

```bash
$ cd Desktop
$ mkdir myproject
$ cd myproject
```
Now our project stays inside Desktop folder and we are inside `myproject` folder. Virtual Enviroment is the next thing to make.

```bash 
$ virtualenv env
$ cd env
$ source env/Scripts/activate
$ pip install django
```
Django is successfully installed on your local computer, now set up the project.

```bash
$ django-admin startproject studentprofile
$ cd studentprofile
$ pip install -r requirements.txt
$ code .
```

What `code .` command does is to open your current directory in any editor you use. Every brand new Django project comes with default page. So to reference that, type `python manage.py runserver` in bash and click on the `http://127.0.0.1:8000/` to open it in browser. Always let the server be in open mode while working on the project.

```bash
$ python manage.py runserver
```
Congratulations!! Your project is initiated successfully.

### Developing Project and Setting PostgreSQL database

In this project, we need two main apps `students` and `account`. We will serve our application index page from `students` app while `account` app is form application where profiles shall be entered.

```bash
$ python manage.py startapp students
$ python manage.py startapp account
```
We have added the two apps to our project. For Django to recognise them, we need to add both to `INSTALLED_APPS` inside `settings.py`  in the `studentprofile` app.
```
    'account',
    'students'
```
Now we need to set up our database and we will be considering `postgresql`. But before that Django required  dependecy called `psycopg2` to talk to postgresql. So let us install it.
```bash
$ pip install psycopg2
$ pip freeze > requirements.txt
```
Note: Always use this command `pip freeze > requirements.txt` whenever you install new dependency. That will help to add all installations to our `env` virtual enviroment.

Now go inside the workbench downloaded and create database named `StudentsProfile`. For the connection with the database, kindly follow the scenario below.

Inside `settings.py` change the `DATABASES` option to something like this.
```
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.postgresql_psycopg2',
            'NAME': 'StudentsProfile',
            'USER': 'postgres',
            'PASSWORD': '******',
            'HOST': 'localhost',
        }
        
    }
```
Note that `PASSWORD` is encrypted here. That stands for your local password provided while installing workbench earlier for your computer.

Let us migrate the default models to the new database connection.

```bash
$ python manage.py makemigrations
$ python manage.py migrate
```
If you open your postgres workbench and navigate to the database created, you will confirm all the django default models migrated. 

Next thing is to set-up our models for the `account` app. Open the `models.py` inside the `account` app, and design your model with the students profile features we need.

```
    from django.db import models
    from datetime import timezone
    class StudentAccount(models.Model):
        name = models.CharField(max_length=200)
        email = models.EmailField()
        phone = models.CharField(max_length=200)
        date_created = models.DateTimeField(auto_now=timezone.now())


        def __str__(self):
            return self.name
```
Now we need to `makemigrations` to generate migration file. After that we migrate the file generated to the database.
```bash
$ python manage.py makemigrations account
$ python manage.py migrate
```
The next thing is to set up our admin backend. Remember every Django project comes in handy with already configured `admin`, so we will just make use of that. Open the the `admin.py` inside the `account` app and subscribe the `model` designed.
```
    from django.contrib import admin
    from .models import StudentAccount
    admin.site.register(StudentAccount)
````
What we have to do before it can work is to register an an admin account, so provide your details with the command below.
```bash
$ python manage.py createsuperuser
```
Great! You have just made an admin backend for your project. Only you as an admin can read, write, modify and delete data inside. Now let us `runserver` and access admin configured.
```bash
$ python manage.py runserver
```
Try and open localhost in browser and attest to your admin with `/admin` at the end of your url.

Wow! What is next? Yes, you guessed right. We need to make our form page, so that students profiles can be added to database from our UI.

We can make use of the `models` properties as form fields. How right? No worries.

Now create `forms.py` to your `account` app. And then do the logic as below.
```
    from django import forms
    from .models import StudentAccount
    class StudentForm(forms.ModelForm):
    class Meta:
        model = StudentAccount
        fields = ['name', 'email', 'phone']
```
To reference the form made, we need to send it to the template through the `views.py` inside the `account` app. As far as the `view` is concerned, this is all of the logic that we need. 
```
    from django.shortcuts import render, redirect
    from .forms import StudentForm
    from .models import StudentAccount
    def account_view(request):
        form = StudentForm()
        if request.method == 'POST':
            name = request.POST['name']
            email = request.POST['email']
            phone = request.POST['phone']
            
            user = StudentAccount(name=name, email=email, phone=phone)
            user.save()
            return redirect('/')
        else:
        return render(request, 'account/form.html', {'form': form})
    
    def delete(request, pk):
        student = StudentAccount.objects.get(id=pk)
        student.delete()
        return redirect('/')
```
Now let us make `urls` for the routing. Create `urls.py` inside the `account` app and configure it as below.
```
    path('form/', views.account_view, name="form"),
    path('delete/<str:pk>/', views.delete, name="delete")

```
With these that we have done so far, it is time to the connect to `students` app too. As we have been doing, quickly navigate to the app and create `urls.py` file and configure route.  This route will serve our index page to clients and use the path below.

```
    app_name = 'students'
    path('', views.index, name="index")
```
Furthermore, we need to write the views logic inside the `views.py`.

```
    from django.shortcuts import render
    from account.models import StudentAccount
    def index(request):
        students = StudentAccount.objects.all()
        return render(request, 'students/index.html',{'students': students})
```
Here we are just sending out all `students` in our database by querying it to the `index.html` template.

It is time we make the templates to render UI. As you know that Django uses `Model View Template MVT` architecture and if you are surprised quickly check the link above and read about that.

What we can do is to add `templates` folder into the root level with the project that is `studentprofile` folder and ensure that it is at the same level with the other `studentprofile` folder.
If you are confused, kindly open your bash and type commands below.
```bash
$ cd studentprofile
$ ls
    account/  manage.py*  requirements.txt  studentprofile/  students/
$ mkdir templates
$ cd templates
$ mkdir students
$ mkdir account
$ cd students
$ touch index.html
$ touch base.html
$ cd ../
$ cd account
$ touch form.html
$ cd ../../
$ ls
    account/  manage.py*  requirements.txt  studentprofile/  students/  templates/
```
Yes! We have made the templates. Now let us connect it to the project by going into the `settings.py` and do this below. Inside the directory under `TEMPLATES`, kindly paste this below in it.

```
    os.path.join(BASE_DIR, 'templates'
```
By now we are 60% done with the whole project. Let us finish it together okay!
So the next thing is to actually make our `html` boiler plates in the templates. We need to serve the whole of our project from `students/base.html`, therefore add this in your boiler plate.
```
    <head>
        <title>{% block title %} {% endblock %}</title>
    </head>
    <body>
        {%block content%}
        
        {% endblock%}
    </body>
    </html>
```
Inside the `account/index.html` add the following code below for the index page. 
```
    {% extends 'students/base.html'%}
    {% block title %} Home Page {% endblock %}
    {% block content %} 
        <h1>Welcome To Student Profile App.</h1>
        <h2><a href="{% url 'account:form' %}">Add Student</a></h2>
        {% if students %}
            <table>
                <thead>
                    <tr>
                        <th>Student ID</th>
                        <th>Full Name</th>
                        <th>Email</th>
                        <th>Phone Number</th>
                        <th>Edit Profile</th>
                        <th>Delete Profile</th>
                    </tr>
                </thead>
                <tbody>
                
                        {% for student in students %}
                            <tr>
                                <td>{{ student.id }}</td>
                                <td>{{student.name}}</td>
                                <td>{{student.email}}</td>
                                <td>{{student.phone}}</td>
                                <td>
                                    <form action="{% url 'account:delete' student.id %}" method="POST">
                                        {% csrf_token %}
                                        <input type="submit" value="Delete">
                                    </form>
                                </td>
                            </tr>
                        {% endfor %}
                
                </tbody>
            </table>
        {% endif %}
    {% endblock %}
```
And for the form page, go into the `account/form.html` and make your the interface like this.
```
    {% extends 'students/base.html'%}
    {% block title %} Form Page {% endblock%}
    {% block content %} 
        <h2>
            <a href="{% url 'students:index' %}">Go back home</a>
        </h2>
        <h1>Add Student Profile</h1>
        <form action="{% url 'account:form' %}" method="POST">
            {% csrf_token %}
            {{ form.as_p }}
            <input type="submit" value="Submit"/>
        </form>
        
    {% endblock %}
```
Run server and open your broswer to see the page made. 
```bash
$ python manage.py runserver
```
Yes! We made it together and by now the project is 75% done.

Here are the lists of dependencies required by Heroku for deployment. Now we need to install all of these into our `requirements.txt` file. 

1. gunicorn
    This `gunicorn` allows the Django project to be accessible via HTTP protocol. And this will be configured inside a file named `Procfile`.
```bash
$ pip install gunicorn
```
Now create a `Procfile` with no extension in the root directory. And make sure it is spelt as it is here in this tutorial.
```bash
$ ls
    account  manage.py  requirements.txt  studentprofile  students  templates
$ touch Procfile
$ ls
    account  manage.py  Procfile  requirements.txt  studentprofile  students  templates
```
Inside the `Procfile` do add this. This is to allow HTTP traffic to the application. 

Note that there should not be any unneccessary space at the back of the last dash symbol, this is because Heroku will never see your `Procfile` if such space is added.
```
    web: gunicorn studentprofile.wsgi --log-file -
```
2. whitenoise
    Heroku serves staticfiles for your project automatically through this dependency. So we have to install it and add its middleware to `settings.py`.
```bash
$ pip install whitenoise
```
Add this to `settings.py` for Django to serve it. Just below the `SecurityMiddleware` like this.
```
    'whitenoise.middleware.WhiteNoiseMiddleware',
```
3. runtime.txt
    This file tells Heroku what type and version of programming language is the project built on. Add it to the root level.
```bash
$ touch runtime.txt
$ ls
    account  manage.py  ProcFile  requirements.txt  runtime.txt  studentprofile  students  templates
```
Inside the `runtime.txt` file, write this. In my own case I used `python 3.8.6` for the project, ensure you add yours version.
```
    python-3.8.6
```
4. dj-database-url
    Since we are using a custom database, then we need a way to talk to the Heroku database for the project. And the dependency that does that for us is `dj-database-url` which we have to install and add it to the `settings.py`.
```bash
$ pip install dj-database-url
```
Then add this to your `settings.py` and the `import dj_database_url` should go to the top-most level. while other commands should follow each other and be positioned right below the `settings.py` databases option.
```
    import dj_database_url
    db_from_env = dj_database_url.config(conn_max_age=500)
    DATABASES['default'].update(db_from_env)
```
5. django-heroku
    This package configures Django project for Heroku automatically and it has to be installed too.
```bash
$ pip install django_heroku
```
Now add this to `settings.py` file and please ensure that you save the all file.
```
    import django_heroku
    django_heroku.settings(locals())
```
Now we need to add all our dependencies recently installed to `requirements.txt` file.
```bash
$ pip freeze > requirements.txt
```

I commend your effort. Well-done!! As a good developer, all secret keys generated for every project is inside `settings.py` and this must be always hidden. So we will need to make `.env` file and store our keys there.

```bash
$ ls
    account  manage.py  Procfile  requirements.txt  runtime.txt  studentprofile  students  templates
$ touch .env
$ touch .gitignore
$ pip install python-dotenv
$ pip freeze > requirements.txt
```
Inside the `.env` file add this below.

```
    YOUR_SECRET_KEY = <your secret key here>
    DEBUG = False
    export YOUR_DEBUG = ${DEBUG}
    export SECRET_KEY = ${YOUR_SECRET_KEY}
```
Now go into the `settings.py` and connect the `.env` file with the project by adding this below.
```
    from dotenv import load_dotenv
    load_dotenv()
    SECRET_KEY = os.getenv("YOUR_SECRET_KEY", <your secret key here>)
    DEBUG = os.getenv("YOUR_DEBUG")
```
So navigate to [django gitginore](/https://www.toptal.com/developers/gitignore/api/django) and copy out all the gitgnores into your `.gitignore` file.

Before diving to Heroku deployment steps, we need to track the project with github using git. We have to initialize it, add all files, then commit them to git locally. Open your bash and let us do justice to this.

```bash
$ ls 
    account  manage.py  Procfile  requirements.txt  runtime.txt  studentprofile  students  templates
$ git init
$ git status
$ git add .
$ git commit -m"Initial commit"
```
Great!! With this we have initialized and commited the whole project to git repository locally on our machine. To track it with git remote using `Github`, go to [Github](/https://github.com/) and sign up if you do not have account. But if you do, go ahead and make new repository for the project.
We need to connect the project with the remote repository created. So for that let us do some git permutations in the bash.

```bash
$ ls
    account  manage.py  Procfile  requirements.txt  runtime.txt  studentprofile  students  templates
$ git remote add origin <YOUR_REPOSITORY_FROM_GITHUB>
$ git push -U origin master
```

### Heroku Account Set Up
To use Heroku free tier plan, an account must be created first. So follow the steps on [Heroku SignUp](/https://id.heroku.com/login) and sign up.
Now we are set for deployment into Heroku server. Please make sure to follow this steps below very well, because a slight mistake can cause your app not to be properly deployed and cannot be accessed.

1. heroku login
    Your editor must be connected to Heroku and log into the account created earlier while you are still deploying.
```bash
$ heroku login
$ heroku create
$ heroku config:set DISABLE_COLLECTSTATIC=1 
$ git push heroku master
```
On error with `Procfile` created, your app will never be configured. Here are the potential solutions:
1. Always watch out for any error from the command `git push heroku master`.
2. Ensure that you actually confirm the below commands while pushing to Heroku master.
```
    remote: -----> Discovering process types
    remote:        Procfile declares types -> web
```
If you don't see such or it is saying `remote: Procfile declares types -> <none>`, kindly delete your `Procfile` and re-create it with proper configurations as described above in this tutorial.

Note that this url `https://nameless-wildwood-10532.herokuapp.com/` is your domain for the application. 
Fantastic!! Our app is live on Heroku server by now. But it is inaccessible due to the database configuration that needs to be done. 
So we need to configure the database with the production database to be provided by Heroku. Now follow the commands below.
```bash
$ heroku run python manage.py migrate
$ heroku run ptyhon manage.py createsuperuser
$ heroku config:set SECRET_KEY="<your secret key>"
$ heroku config:set YOUR_DEBUG="False"
```
With this the database is provisioned and ready. Now open `settings.py` and change your `ALLOWED_HOSTS` to something like below. Doing this will allow all hosts to access your application globally.
```
    ALLOWED_HOSTS = ['*']
```
Note that every bit of changes must  be pushed to remote repository. So we have to track the changes made with git and push it on to heroku master.
```bash
$ 
$ git add .
$ git commit -m"allowed hosts"
$ git push
$ heroku run python manage.py collectstatic
$ git push heroku master
$ heroku open
```
With the command `heroku open`, your application will open in browser.

Congratulations!!! We have come to the end of the tutorial and by now your application is accessible via internet.
You can access my own deployment of this tutorial on [studentprofileapp](/https://nameless-wildwood-10532.herokuapp.com/).

Your application admin can be accessed on [studentprofileappadmin](/https://nameless-wildwood-10532.herokuapp.com/admin).

For more updates and vast reading on this, kindly reference the docs [Getting Started on Heroku with Python](/https://devcenter.heroku.com/articles/getting-started-with-python?singlepage=true) and on MDN website too [Django Tutorial Part 11: Deploying Django to production](/https://developer.mozilla.org/en-US/docs/Learn/Server-side/Django/Deployment).

Do connect with me on LinkedIn here [Arafat O. Olayiwola](/https://www.linkedin.com/in/arafat-o-olayiwola-b52087191/).

Thanks and Happy coding Folks!!!