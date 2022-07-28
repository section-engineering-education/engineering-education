---
layout: engineering-education
status: publish
published: true
url: /custom-decorators-in-django/
title: Creating and Utilizing Decorators in Django
description: In this article, we will learn how to develop custom decorators similar to the built-in decorators such as login_required, require_http_methods, csrf_exempt used in real-world applications. 
author: boluwatife-fayemi
date: 2022-07-28T00:00:00-13:00
topics: [Languages]
excerpt_separator: <!--more-->
images:

 - url: /engineering-education/custom-decorators-in-django/hero.jpg
   alt: Creating and Utilizing Decorators in Django example image
---
In Python, a decorator is a function that takes another function as an argument and adds functionality or augments the function without changing it. Django, as a Python web framework, comes with a large number of built-in decorators.
<!--more-->
These built-in decorators are used when decorating function-based views. However, the real-world application you're working on may require custom checks or validations that Django doesn't supply out of the box.

### Introduction
In software development, situations like the one mentioned above are unavoidable. When such a situation happens while developing a Django application, the default option for the normal programmer is to conduct the checks or validations in the view. 

This method is straightforward, however, it is inefficient, and it goes against software development best practices and principles such as DRY (Don't Repeat Yourself). This is because, as the program expands in size, the same check or validation must be performed in many views. As a result, the identical code is repeated across the application.

In this article, you'll learn how to develop custom decorators similar to the built-in decorators (such as login_required, require_http_methods, csrf_exempt) used in real-world applications. 

### Key takeaways
We will build a Quora-like website to illustrate it. 
The following are custom decorators that will be created:
- authentication_not_required: Logged in users will be unable to access a view as a result of this decorator. This is useful for login and registration views.
- verification_required: Users who haven't verified their email address or phone number will be unable to access a view as a result of this.
- xhr_request_only: This ensures only request via fetch, XHR(XMLHttpRequest) or AJAX(Asynchronously Javascript and XML) is allowed.


### Prerequisites
To follow along, it’s important that:
- You have a basic knowledge of [Python](https://docs.python.org/) and [Django](https://docs.djangoproject.com/) Web Framework
- You have a basic understanding of decorators in Python as well. If you don’t, [this article](/engineering-education/python-decorators/) should be of help.
- & you have [Pipenv](https://pipenv.pypa.io/en/latest/install/#installing-pipenv) installed.

### Building Django application

#### Initial set up
To get started, navigate to your preferred directory and create a new folder to use for this project. You must first create a virtual environment before proceeding to install the project dependencies.

Run this command to create a virtual environment:
```bash
pipenv shell 
```
![Pipenv shell terminal](/engineering-education/custom-decorators-in-django/pipenv.JPG)

> Pipenv is a Python package that makes creating and managing virtual environments and project dependencies easier in a deterministic way. It’s like npm and yarn used in Node.js.

To prevent conflicts between project dependencies, it is advisable that you first create a virtual environment.

Installing project dependencies:
```bash
pipenv install django==4.0
```

After a successful installation of Django in the virtual environment, you will see a Pipfile.lock in your project directory.

Starting django project:
```bash
django-admin startproject config .
```

I prefer calling my Django project `config` as all it contains are configuration files that are used in setting up the application we will be creating subsequently.

The dot added after `config` ensures that an additional folder is not created but instead the config folder & manage.py file are created in the root directory.

Since the default user model in django does not have an is_verified field we will make use of the is_active fields. We will also make the email address required when creating an account. 

The simple approach to achieve this is by creating a custom user model subclassing the AbstractUser model and then making the email field required. Create a new application called accounts to handle the users' accounts.

```bash
python manage.py startapp accounts
```

Inside the accounts/models.py file, paste the below code inside:
```py
from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.
class User(AbstractUser):
    email = models.EmailField(verbose_name='Email Address' ,blank=False, unique=True)
```

Go to settings.py and include this:
```py
AUTH_USER_MODEL = ‘accounts.User’
```

Here, the code included above enforces that the active user model in this project is the custom user model we have created. It is recommended that you build a custom user model early on in a project because doing so later, after database tables have been created and relationships have been established, is more challenging.

Creating a new application to handle quora posts:
```bash
python manage.py startapp posts
```
Open the settings.py in the config folder and include the newly created apps (posts and accounts) in the list of installed apps, so django can be aware of the apps.

```py
# Application definition
INSTALLED_APPS = [
    'posts',
    'accounts',
     … 
   ]
```

Inside the posts/models.py, paste the following code inside:
```py
from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()
class Post(models.Model):
    post = models.CharField(max_length=1000)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='posts')
    upvote_users = models.ManyToManyField(User, related_name='upvoted_posts', blank=True)
    downvote_users = models.ManyToManyField(User, related_name='downvoted_posts', blank=True)

    def __str__(self):
        return f'{self.post} upvoted by {self.get_no_of_upvote()} and \
            downvoted by {self.get_no_of_downvote()}'

    def get_no_of_upvote(self):
        return self.upvote_users.count()

    def get_no_of_downvote(self):
        return self.downvote_users.count()
```

In the code above,

- We import get_user_model to get the currently active user model in the project and use it as the model in the foreign key field. It implies that a user can create several posts, but only one user can be associated with each post (many to one relationship).
- The post model has upvote_users and downvote_users fields which have many-to-many relationships to the user model. This means that a post may receive many upvotes and downvotes from users, and vice versa.
- get_no_of_upvote & get_no_of_downvote methods return the number of users who have upvoted and downvoted a post respectively. We will use these two methods in our template in the next section.

Run these commands to create migrations files and sync the changes to the database to create the tables in the database.

```bash
python manage.py makemigrations
python manage.py migrate
```

### Creating custom decorators
Now that we have our project set up, let’s dive into creating our custom decorators.

Authentication_not_required decorator

Navigate to the account folder and create a new file called `decorators.py`. This decorators.py file will contain all the decorators related to authentication.

Inside the file copy and paste the code below:
```py
import functools
from django.shortcuts import redirect
from django.contrib import messages

def authentication_not_required(view_func, redirect_url="accounts:profile"):
    """
        this decorator ensures that a user is not logged in,
        if a user is logged in, the user will get redirected to 
        the url whose view name was passed to the redirect_url parameter
    """
    @functools.wraps(view_func)
    def wrapper(request, *args, **kwargs):
        if not request.user.is_authenticated:
            return view_func(request,*args, **kwargs)
        messages.info(request, "You need to be logged out")
        print("You need to be logged out")
        return redirect(redirect_url)
    return wrapper
```

In the above code,

- A conditional statement checks if the user making the request is logged in, if the user isn’t logged in we will call the view function and otherwise redirect the user to the redirect_url.
- The messages framework is used to notify the user if the user’s intended action wasn’t granted. The message is also shown in the terminal / cmd using the print statement.
- The @functools.wraps(view_func) copies the view_func meta data (including __doc__, __name__) to the wrapper function.

Verification_required:

```py
def verification_required(view_func, verification_url="accounts:activate_email"):
    """
        this decorator restricts users who have not been verified
        from accessing the view function passed as it argument and
        redirect the user to page where their account can be activated
    """
    @functools.wraps(view_func)
    def wrapper(request, *args, **kwargs):
        if request.user.is_active:
            return view_func(request, *args, **kwargs)
        messages.info(request, "Email verification required")
        print("You need to be logged out")
        return redirect(verification_url)  
    return wrapper
```

In the code above,

- A conditional statement checks if the user is active or not. The view function in which the decorator is being used on is called if the user is active. This redirects the user to the verification_url if otherwise while showing a message using the message framework on the template and in the terminal or cmd using the print statement.

xhr_request_only

The xhr_request_only decorator required would be created in the posts folder as it is related to the posts application. We will use it to decorate the view that will handle upvoting and downvoting of posts in the next section.

Navigate to the posts directory and create a new file called decorators.py file.
```py
import functools
from django.shortcuts import redirect
from django.http import HttpResponseBadRequest

def xhr_request_only(view_func):
    """
    this decorators ensures that the view func accepts only 
    XML HTTP Request i.e request done via fetch or ajax
    """
    @functools.wraps(view_func)
    def wrapper(request, *args, **kwargs):
        if request.headers.get('x-requested-with') == 'XMLHttpRequest':
            return view_func(request, *args, **kwargs)
        print("Can't Process this Request")
        return HttpResponseBadRequest("Can't Process this Request")
    return wrapper
```
In the code above,

- We access the request headers to know what is being used to generate the request a user makes. And if the request is being made with XMLHttpRequest we call the view function and otherwise a bad request response will be returned to the user. 

> Bad request response has a status code of 400.
 
> If you are using a previous version of Django, say version 3.2 or earlier, the request has a method called is_ajax which returns True if the request is made via XMLHttpRequest and otherwise returns false. 

So the check will just be: 
```py
if request.is_ajax():
    ...
```

### Utilizing the custom decorators
Now it’s time to start using the custom decorators you have created in the previous section with the view functions.

Navigate to accounts/forms.py and write the following lines of code.
```py
from django import forms
from django.contrib.auth import get_user_model
from django.conf import settings

User = get_user_model()
class RegisterForm(forms.ModelForm):
    password1 = forms.CharField(widget=forms.PasswordInput, min_length=6)
    password2 = forms.CharField(widget=forms.PasswordInput, min_length=6)

    class Meta:
        model = User
        fields = ['username', 'email']

    def clean_password2(self):
        password1 = self.cleaned_data.get('password1')
        password2 = self.cleaned_data.get('password2')
        if password1 != password2:
            raise forms.ValidationError("Passwords don't match")
        return password1

class LoginForm(forms.Form):
    username = forms.CharField()
    password = forms.CharField(widget=forms.PasswordInput, min_length=6)
```

In the above code,

- We created two forms; a form for login and registration.
- In the registration form, the clean_password2 method checks to make sure the characters entered in the first password field and confirm password field are the same.

> If you want to know more about working with model forms in django, you should check out [this article](/engineering-education/working-with-forms-in-django/).

Navigate to accounts/views.py:
```py
from django.http import HttpResponse
from django.shortcuts import render, redirect
from django.contrib import auth
from .forms import RegisterForm,LoginForm
from django.contrib import messages
from .decorators import authentication_not_required, verification_required
from django.contrib.auth.decorators import login_required

@authentication_not_required
def register(request):
    """  
        registration view for users
    """
    if request.method == 'POST':
        form = RegisterForm(request.POST)
        if form.is_valid():
            # don't save to the database yet
            instance = form.save(commit=False)
            instance.set_password(form.cleaned_data['password1'])
            instance.is_active = False
            instance.save()
            messages.success(request, "Account created successfully!")
            return redirect('accounts:login')
        else:
            messages.error(request, 'Error creating your account!!!')
    else:
        form = RegisterForm()
    return render(request, 'accounts/register.html', context={'form': form})

@authentication_not_required
def login(request):
    login_form = LoginForm()
    if request.method == 'POST':
        login_form = LoginForm(request.POST)
        if login_form.is_valid():
            cleaned_data = login_form.cleaned_data
            user = auth.authenticate(request, username=cleaned_data.get('username'), 
            password=cleaned_data.get('password'))
            if user is not None:
                auth.login(request, user)
                messages.success(request, "Logged in Successfully!")
                print("Logged in Successfully!")
                return redirect("accounts:profile")
            else:
                messages.error(request, "Invalid credentials, wrong username or password")
                print("Invalid credentials, wrong username or password")
        else:
            messages.error(request, "form invalid")
            print("form invalid")
    return render(request, 'accounts/login.html', {'form': login_form})

def profile(request):
    return render(request, 'accounts/profile.html')
```

Let’s have a brief overview of what is happening in the above code,

- In line 3, we import auth to use the default authentication function when getting a user object from their username and password.
- In line 4, we import the LoginForm & RegisterForm from forms.py file to render in the template and users to fill.
- In the register view, the newly created user has been made inactive intentionally to illustrate the verificaton_required decorator.
- authentication_not_required decorator has been applied on the register & login view to perform their purpose.
- In the profile view, we simply render a template named profile.html to the user. The profile.html displays the text profile and the message in the messages framework from our view.

templates/accounts/profile.html:
```html
{% for message in messages %}
    <p>{{ message }}</p>
{% endfor %}
<h1>Profile</h1>
```
templates/accounts/register.html
```html
<form action="{% url 'accounts:register' %}" method="post">
    {% csrf_token %}
    {{ form.as_p }}
    <input type="submit" value="Register">
</form>
```

The login.html file is the same as the register.html, just replace register with login.
Create a new file called `urls.py` to map the route / path to the right view function
```py
from django.urls import path
from .views import (login, profile, register)

app_name = 'accounts'
urlpatterns = [
    path('login', login, name="login"),
    path('register', register, name="register"),
    path('profile', profile, name="profile"),
]
```

Testing the application written so far…
Create a superuser and then start your server.

```bash
python manage.py createsuperuser
python manage.py runserver
```

Go to your browser and navigate to: `http://127.0.0.1:8000/`

Check the image below:

![Authentication Decorators in Action](/engineering-education/custom-decorators-in-django/authdec.gif)

- A link or an OTP should be sent to the user's email address in order to verify his/her email account and activate the user. In order to keep this tutorial simple, the admin can make the user active.

> The default authentication backend does not return a user object for inactive users. So a user who created an account using the 'register.html' won't be able to login unless the admin makes the user active.

Now to implement the 'xhr_request_only' decorator created earlier, add the following code inside 'posts/views.py'.

```py
from django.http import JsonResponse
from django.shortcuts import get_object_or_404, render
from .decorators import xhr_request_only
from accounts.decorators import verification_required
from django.contrib.auth.decorators import login_required
from django.views.decorators.http import require_POST
from .models import Post
import json

def post_detail_view(request, id):
    post = get_object_or_404(Post, id=id)
    return render(request, 'posts/detail.html', {'post': post})

@verification_required
@login_required(login_url="accounts:login")
@xhr_request_only
@require_POST
def post_vote_view(request):
    data  = json.loads(request.body.decode("utf-8"))
    id = data.get('postId')
    action = data.get('action')
    post = get_object_or_404(Post, id=id)
    if action == "upvote":
        post.downvote_users.remove(request.user)
        post.upvote_users.add(request.user)
    elif action == "downvote":
        post.upvote_users.remove(request.user)
        post.downvote_users.add(request.user)
    return JsonResponse({"message": action})
```

In the code above,

- Line 3 is to import xhr_request_only from the decorators module.
- Line 4 is to import verification_required from the decorators module in the accounts application.
- The built-in require_POST decorator has been used on the 'post_vote_view' to ensure  that it only accepts the 'POST' request method.
- Our custom decorators; verification_required & xhr_request_only have also been used to serve their purpose.
- You can see that multiple decorators can be stacked, i.e use more than one decorator for a single view.
- request.body returns a byte. We will need to decode the byte inorder to get the dictionary. The decoding process returns a string and json.loads converts it to a dictionary. Hence, the reason why we import json in line 8 and make use of json.loads in line 18.
- If the action is upvote we ensure the user is removed from the downvote_users and add the user to upvote_users field. If the action is downvote we ensure the user is removed from the upvote_users as well and add the user to downvote_users field. 

Doing it this way ensures that a user can only upvote or downvote and not both for a post. You might be pondering over what happens if the user isn’t in the field and we are trying to remove the user. 

The answer is very simple, the remove manager does not return an error if the user does not exist there. Likewise the add manager does not duplicate the user inside the related object if the user already exists there.

Create a templates/posts directory within the posts app and create a file named detail.html.

In order to test out our decorator.
```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Bootstrap demo</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-0evHe/X+R7YkIZDRvuzKMRqM+OrBnVFBL6DOitfPri4tjfHxaWutUpFmBp4vmVor" crossorigin="anonymous">
  </head>
  <body>
    {% with post_id=post.id %}  
    <div class="card" style="width: 18rem;">
        <div class="card-body">
          <h5 class="card-title">First Post</h5>
          <p class="card-text">{{ post.post }}</p>
          <button data-id = "{{ post_id }}" class="btn btn-primary" id="upvote">UPVOTE</button>
          <h2>{{ post.get_no_of_upvote }}</h2>
          <button data-id = "{{ post_id }}" class="btn btn-primary" id="downvote">DOWNVOTE</button>
          <h2>{{ post.get_no_of_downvote }}</h2>
            {% csrf_token %}
        </div>
      </div>
    {% endwith %}
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/js/bootstrap.bundle.min.js" integrity="sha384-pprn3073KE6tl6bjs2QrFaJGz5/SUsLqktiwsUTF55Jfv3qYSDhgCecCxMW52nD2" crossorigin="anonymous"></script>
    <script>
        const voteUrl = "{% url 'posts:post_vote' %}";
        const upvoteBtn = document.getElementById("upvote");
        const downvoteBtn = document.getElementById("downvote");
        const csrfToken = document.querySelector("input[name=csrfmiddlewaretoken]");
        function vote (action) {
            const data = {
            'action': action,
            'postId': parseInt("{{ post.id }}")
            }
            console.log(data);
            fetch(voteUrl, 
            {   
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "X-Requested-With": "XMLHttpRequest",
                "HTTP_X_REQUESTED_WITH": "XMLHttpRequest",
                'X-CSRFToken': csrfToken.value,
            },
            credentials: 'same-origin',
            body: JSON.stringify(data) 
        })
        .then(res => res.json())
        .then(resdata => console.log(resdata));
        }

        upvoteBtn.addEventListener("click", vote.bind(null, 'upvote'));
        downvoteBtn.addEventListener("click", vote.bind(null, 'downvote'));
    </script>
</body>
</html>
```
In the code above,

- The `with` template tag creates a variable called post_id which stores the value of the post id. The fields of the post are also rendered within the template. There are two buttons, one for upvote and another for downvote. We also call the get_no_upvote and get_no_of_downvote methods to display the number of upvotes and downvotes a post has.
- Within the script tag, we get the URL for voting a post using the url template tag instead of hard coding it. We also selected the upvote & downvote buttons to listen to a click event on each of them. When any of the two buttons is being clicked the vote function gets called.
- The vote function sends a POST request to the voteUrl using the fetch API in JavaScript. It sends the action (i.e either upvote or downvote) and the post id to the backend as well as the csrftoken alongside with the request. We console log the response from the backend.

> Data sent using fetch can be accessed in request.body and not request.POST.

> The above code makes use of bootstrap to make the page attractive.

Create a urls.py file in the posts directory and copy the code below inside:
```py
from django.urls import path
from .views import post_detail_view, post_vote_view
app_name = 'posts'
urlpatterns = [
    path('<int:id>', post_detail_view, name="detail"),
    path('vote', post_vote_view, name="post_vote"),
]
```

Below is a gif of the xhr_request_only decorator in action.

![Xhr_request_only decorator in Action](/engineering-education/custom-decorators-in-django/xhrdec.gif)

### Decorating class-based views
A Django application always uses class-based views because of their simplicity. But using decorators with class-based views is not as straightforward as function-based views. Luckily, Django provides a utility decorator called method_decorator to achieve that.

To add a decorator function to every instance of a class-based view, you need to decorate the class definition itself. To do this, you pass the name of the method to be decorated as the keyword argument name:

```py
from .decorators import authentication_not_required
from django.utils.decorators import method_decorator

@method_decorator(authentication_not_required, name='dispatch')
class LoginView(TemplateView):
    ...
```

### Conclusion
It is advisable to create custom decorators for your views if you find that you are repeating the same validation in many views.

As you have seen above, you'll agree that utilizing a decorator is far preferable to writing the if statement alongside the too many conditional statements already in a function-based view.

Happy coding!!!

---
Peer Review Contributions by: [Collince Okeyo](/engineering-education/authors/collince-okeyo)

