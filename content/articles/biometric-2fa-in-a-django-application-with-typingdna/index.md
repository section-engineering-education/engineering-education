---
layout: engineering-education
status: publish
published: true
url: /biometric-2fa-in-a-django-application-with-typingdna/
title: Getting Started with Biometric 2FA in a Django Application with TypingDNA
description: This article will explain a step-by-step tutorial on how to implement two factor authentication in a Django application using the TypingDNA API.
author: doro-onome
date: 2021-04-04T00:00:00-18:00
topics: [API]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/biometric-2fa-in-a-django-application-with-typingdna/hero.jpg
    alt: Getting started with biometric 2FA in a Django Application with TypingDNA example image
---
Have you ever wanted to implement biometric two-factor authentication in your Django web application? If you answered yes, then this article is just what you need to get started.
<!--more-->
This article will show a step-by-step guide to integrating TypingDNA services into a Django web video player application. To learn more, visit their official website [TypingDNA](https://www.typingdna.com).

### Biometric 2FA in a Django application with TypingDNA
TypingDNA is a two-factor authentication API that easily integrates biometrics authentication to secure user accounts on your website using powerful typing analysis. 

TypingDNA typically helps you learn a user’s typing pattern, match them, and then use it to authenticate users after login. This double user verification is what is known as a “two-factor authentication”.

### Signing up with TypingDNA
To get started, we need to create an account on their website at [TypingDNA](https://www.typingdna.com/clients/signup). 

After we have finished creating and setting up our account, we should see a page like the one in the image below.

![Signup-page](/engineering-education/biometric-2fa-in-a-django-application-with-typingdna/signup-page.png)

Copy your `api_key` and `secret_key` and store them somewhere safe and easily retrievable.

### Building our Django application
#### Prerequisites
-  [Python](https://www.python.org/) 3.7 and later versions installed on your computer.
-  [Django](https://www.djangoproject.com/) installed on your computer.

#### Cloning the project
To build our Django application, we need to develop the frontend and the backend of our video player application. We already have the video application pre-built for us and will focus mainly on integrating biometrics with TypingDNA. 

You can clone the [GitHub](https://github.com/Nomzy-kush/mine.git) repository and run the application by executing the commands below:

```bash
git clone https://github.com/Nomzy-kush/mine.git
cd typingdnavideoplayer
```

Below is the project structure.

![project-structure](/engineering-education/biometric-2fa-in-a-django-application-with-typingdna/project_structure.png)

We need to install the `requests` module required by our project to interact with typingDNA APIs.

Execute the command below to install Django and requests into our project.

```bash
pip install requests
pip install django
```

Run the application to ensure all configurations are working. Execute the command below to start the development server.

```python
python manage.py runserver
```

![application-running](/engineering-education/biometric-2fa-in-a-django-application-with-typingdna/application-running.png)

Navigate to [localhost](ttp://127.0.0.1:8000/) on the browser to test if our app is running.

![sign-in-page](/engineering-education/biometric-2fa-in-a-django-application-with-typingdna/sign-in-page.png)

### Installing the TypingDNA library
To install TypingDNA, we need to download the JavaScript files that are needed to implement the two-factor authentication. 

You can download the file from [GitHub](https://github.com/TypingDNA/TypingDnaRecorder-JavaScript/blob/master/typingdna.js), or [TypingDNA](https://typingdna.com/scripts/typingdna.js) or [TypingDNA API](https://api.typingdna.com/scripts/typingdna.js).

After downloading the JavaScript files, open the `App` folder and place the `typingdna.js` file in the static folder. We also need to download and import the TypingDNA `Autocomplete Disabler` and `Typing Visualizer` files. 

These files will enable users to see that their typing pattern is being recorded as they enter the required text. Download the `autocomplete-disabler.js` and `typing-visualizer.js` from this [TypingDNA](https://github.com/TypingDNA/autocomplete-disabler) repo and store them in the `static` folder of our Django application.

The final project structure should be as shown below.

![project-structure](/engineering-education/biometric-2fa-in-a-django-application-with-typingdna/project-structure.png)

After downloading and placing our files in the proper directories, we need to modify our models for the `Video` table to display videos added by a particular user. 

To do this, update the `models.py` file with the code snippet below:


```python
from django.db import models
from django.shortcuts import reverse
from django.contrib.auth.models import User
# Create your models here.
class Video(models.Model):
    title= models.TextField()
    summary= models.TextField()
    image= models.ImageField()
    file = models.FileField(blank=True,null=True)
    link = models.CharField(max_length=200,blank=True,null=True)
    user=models.ForeignKey(User, null=True,blank=True, on_delete=models.CASCADE)
    slug = models.SlugField()
    paginate_by = 2
    def __str__(self):
        return self.title
    def get_absolute_url(self):
        return reverse("App:details", kwargs={
            'slug': self.slug
        })
```

Next, we need to create a `UserProfile` table to verify captured typing patterns containing extra details for TypingDNA authentication users in our database. 

Update the `models.py` file with the code below:

```python
from django.db import models
from django.shortcuts import reverse
from django.contrib.auth.models import User
### Create your models here.
class Video(models.Model):
    title= models.TextField()
    summary= models.TextField()
    image= models.ImageField()
    file = models.FileField(blank=True,null=True)
    link = models.CharField(max_length=200,blank=True,null=True)
    user=models.ForeignKey(User, null=True,blank=True, on_delete=models.CASCADE)
    slug = models.SlugField()
    paginate_by = 2
    def __str__(self):
        return self.title
    def get_absolute_url(self):
        return reverse("App:details", kwargs={
            'slug': self.slug
        })
class UserProfile(models.Model):
    user = models.OneToOneField(User, related_name="profile", on_delete=models.CASCADE)
    private_key = models.TextField()
```

After updating the `models.py` file with the code above, we need to run migrations for the database. Execute the command below to make database migrations.

```python
python manage.py makemigrations
python manage.py migrate
```

We should see the results below if our migrations ran successfully.

![migrations](/engineering-education/biometric-2fa-in-a-django-application-with-typingdna/migrations.png)

Let’s edit the `videos` view in the `views.py` file with the following code snippet to render only a particular user’s videos in the frontend.


```python
def videos(request):
    paginator= Paginator(Video.objects.filter(user=request.user),2)
    page_number = request.GET.get('page')
    page_obj = paginator.get_page(page_number)
    context={"page_obj":page_obj}
    return render(request,"videos.html",context)
```
We need to update the `register` view to create new `UserProfile` objects for every registered user. To do this, edit the `register` view by entering the code snippet below after the line with `user.save`:

```python
userprofile=UserProfile.objects.create(user=user)
userprofile.save()
```
### The TypingDNA check user endpoint

![check-user-endpoint](/engineering-education/biometric-2fa-in-a-django-application-with-typingdna/check-user-endpoint.png)

The TypingDNA API [Check User](https://api.typingdna.com/index.html%23api-API_Services-Standard_APIs-GetUser) endpoint helps us to check if a user exists then checks the number of saved typing patterns they have. If the user has saved typing patterns, then verification can be done. You are recommended to save at least two typing patterns for effective authentications.

For the `login` view in our `views.py` file, we need to create a variable in our session to check whether TypingDNA verified the current user session or not. 

Update your `login` view with the code snippet below:

```python
def login(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')
        user = auth.authenticate(username=username, password=password)
        if user is not None:
            auth.login(request, user)
            if 'user' in request.session:
                return redirect("App:videos")
            else:
                return redirect("App:verify")
        else:
            context={"message":"Invalid login credentials"}
            return render(request,"login.html",context)
    else:
        return render(request,"login.html")
```
### Enrolling users typing patterns
#### The enrollment page
The enrollment page allows users to register their typing patterns to TypingDNA for future authentication. We will be building the HTML page needed to implement this functionality. 

As seen in the project we cloned, we already have the `enroll.html` file. Update the `enroll.html` file in the templates folder with the code snippet below:


```html

{% load static %}


<link href="//maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css">

<script src="//maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js"></script>

<script src="//cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>


<style>
 body {
background-color: #b2beb5
}
</style>

<div class="container">

        <div class="row justify-content-center align-items-center" style="height:100vh">

            <div class="col-4">

                <div class="card">

                  <center><h2>Setup TypingDNA 2FA on your Video Player</h2></center>

                  <br>

                    <div class="card-body">

                {% if messages %}

                  {% for message in messages %}

                        <div class="alert alert-danger" role="alert">

                        {{message}}

                        </div>

                    {% endfor %}

                  {% endif %}



                      <div id="failed-auth" class="alert alert-danger" role="alert" style="display: none">

                          <strong>You have not completed your authentication, please type the text above</strong>

                      </div>


                        <form method="POST">

                          {% csrf_token %}

                            <div class="form-group">

                              <p class="mb-0" style="color:red;"><strong>"I am authenticated by the way I type"</strong></p>

                              <br>

                                <input type="text" class="form-control disable-autocomplete" id="auth-text" name="type" placeholder="enter text seen above">

                            </div>

                            <input type="hidden" id="tp" name="tp">

                            <button class="btn btn-primary" type="button" class="btn btn-success" onclick="startAuthentication()">Start Authentication</button>

                        </form>

                    </div>

                </div>

            </div>

        </div>

    </div>

<script src="{% static 'typingdna.js' %}">
    </script>

    <script src="{% static 'autocomplete-disabler.js' %}">
    </script>

    <script src="{% static 'typing-visualizer.js' %}">
    </script>


```

In the HTML code above, you would notice that at the end of our file, we imported the `typingdna.js`, `autocomplete-disabler.js`, and `typing-visualizer.js` files that we downloaded earlier. With jinja tags, we rendered messages passed from the backend in our frontend. 

TypingDNA visualizer only captures input elements with the `disable-autocomplete` class attribute, which is why we added it to our `input` HTML tags above.

#### Submitting typing patterns to TypingDNA
After creating the enrollment page above, we need to send the collected typing patterns to TypingDNA to be recorded. To do this, we need to integrate the TypingDNA recorder and visualizer into the enroll page to enroll our users. 

Create an instance of the TypingDNA and Autocomplete-disabler classes so that you can record the user’s typing patterns as soon as he/she starts typing.

Add the code snippet below right after the line where we imported TypingDNA in the `enroll.html` page.

```html

<script>
  var typingdna = new TypingDNA();
      var auto_complete_disabler = new AutocompleteDisabler({
        showTypingVisualizer: true,
        showTDNALogo: true
      });
</script>

```

![autocomplete-disabler](/engineering-education/biometric-2fa-in-a-django-application-with-typingdna/autocomplete-disabler.png)

Next, create a variable to store our users’ captured typing patterns and a function named `beginAuthentication` triggered by the users when they enter the auth text.

```html

  <script>
  var typingdna = new TypingDNA();
  var auto_complete_disabler = new AutocompleteDisabler({
    showTypingVisualizer: true,
    showTDNALogo: true
  });
  var typing_patterns = [];
  function beginAuthentication() {
    document.getElementById("failed-auth").style.display = "none";
    document.getElementById("auth-text").value = "";
    TypingDNA.stop();
    let typing_pattern = tdna.getTypingPattern({
      type: 1,
      text: "I am authenticated by the way I type"
    });
    if (typing_pattern == null) {
      document.getElementById("failed-auth").style.display = "block";
    } else {
      typing_patterns.push(typing_pattern);
      if (typing_patterns.length == 3) {
        let tp = typing_patterns[0] + ";" + typing_patterns[1] + ";" + typing_patterns[2];
        document.getElementById("tp").value = tp;
        document.forms[0].submit();
      } else {
        alert("Successfully logged typing pattern, please type the text again to improve accuracy");
      }
    }
    TypingDNA.reset();
    TypingDNA.start();
  }
</script>

```

In the code above, we called the `beginAuthentication` function to stop recording the user’s keystrokes, which allows us to record and analyze the current typing pattern.

We then captured the user’s typing pattern recorded using the `sametext` capture method provided by TypingDNA. You can explore other TypingDNA methods on their official docs here [https://api.typingdna.com/#api-capture-methods](https://api.typingdna.com/%23api-capture-methods).

After capturing the user’s typing pattern, we went ahead to verify if the typing pattern was captured successfully. If capturing was successful, we store the typing patterns in the `typing_patterns` variable we created earlier. However, if capturing was not successful, we display an error message reflected from TypingDNA.

According to the TypingDNA documentation, to ensure accurate authentications, our users’ captured typing patterns, the user must enroll his/her typing patterns at least three (3) times. To achieve this, we check if the user registered all three times before submitting the form. 

If the user hasn’t satisfied the three enrollments, we just store the current pattern and restart registration using the TypingDNA `TypingDNA.reset()` method. 

We also restart the `TypingDNA.start()` method to start the recorder again while keeping track of the number of enrollments the user has done. TypingDNA requires that all typing patterns sent should be concatenated into one (1) string separated by semicolons.

![enrollment-page](/engineering-education/biometric-2fa-in-a-django-application-with-typingdna/enrollment-page.png)

### Saving recorded typing patterns
TypingDNA needs to analyze the recorded typing patterns and use them for authenticating users. For this to be possible, we need to save the recorded typing patterns to our database. We then make use of the TypingDNA [”auto” endpoint](https://api.typingdna.com/%23api-API_Services-Standard_APIs-auto) that helps TypingDNA API to submit and save captured typing patterns.

#### The TypingDNA auto endpoint
Let’s now talk about how the [”auto” endpoint](https://api.typingdna.com/%23api-API_Services-Standard_APIs-auto) works. The [”auto” endpoint](https://api.typingdna.com/%23api-API_Services-Standard_APIs-auto) enrolls each of the first three patterns captured for the current user using the user’s ID. 

After registering the first three patterns, you use every other pattern for authentication.

#### Building our helper library
For our Django app to interact with the TypingDNA API, we need to create a helper library to simplify things for us. Create a new file named `typingdnahelper.py` in your `App` folder and add the code snippet below into it:

```Python
import base64
import hashlib
import requests
class TypingDNA:
    def __init__(self, apiKey, apiSecret):
        self.apiKey = apiKey
        self.apiSecret = apiSecret
        self.base_url = "https://api.typingdna.com"
        authstring = f"{apiKey}:{apiSecret}"
        self.headers = {
            "Authorization": "Basic " + base64.encodebytes(authstring.encode()).decode().replace("\n", ""),
            "Content-Type": "application/x-www-form-urlencoded"
        }
    def auto(self, id, tp, custom_field=None):
        url = f"{self.base_url}/auto/{id}"
        data = {
            "tp": tp,
            "custom_field": custom_field
        }
        return requests.post(url, headers=self.headers, data=data)
    def check_user(self, id, user_type=None, text_id=None, custom_field=None):
        url = f"{self.base_url}/user/{id}"
        params = {
            "type": user_type,
            "text_id": text_id,
            "custom_field": custom_field
        }
        return requests.get(url, headers=self.headers, params=params)
    def hash_text(self, text):
        return hashlib.sha1((text + text[::-1]).encode()).hexdigest()
```

TypingDNA requires a user ID to save typing patterns to a user, so we created a `hash_text` method to hash the user’s ID before sending.

#### Saving users typing patterns
After building our helper library, we can start saving our users’ typing patterns in our accounts for future matching. Let’s first import the helper library class into our Django application and create an instance of our helper class by supplying the `apiKey` and `apiSecret` we saved from our TypingDNA dashboard earlier.

```Python
from . typingdnahelper import TypingDNA
tdna = TypingDNA("apiKey", "apiSecret")
```

The image below shows `views.py` importations.

![import](/engineering-education/biometric-2fa-in-a-django-application-with-typingdna/import.png)

Update the `enroll` view with the code snippet below to save the patterns received in the dashboard.

```python
def enroll(request):
    if request.method=="POST":
        tp = request.POST.get("tp")
        username = request.session["reg_user"]["username"]
        r = tdna.auto(tdna.hash_text(username), tp)
        if r.status_code == 200:
            user=UserProfile.objects.get(user=User.objects.get(username=username))
            user.typingdna_secured=True
            user.save()
            request.session["typingdna_auth"] = True
            messages.add_message(request, messages.INFO,"You have successfully registered TypingDNA 2FA", "success")
            return redirect("App:videos")
        else:
            messages.add_message(request, messages.INFO,r.json()["message"], "danger")
            return redirect("App:enroll")
    return render(request,"enroll.html")
```

In the code above, we collected the user’s typing pattern and stored it in the `tp` variable. We then requested the `auto` endpoint of the TypingDNA API to verify if the typing pattern provided matches the typing patterns enrolled for that user. 

We then checked if the status code of the request was successful (status code 200). If this were the case, we would update the user data in our database to indicate they have been enrolled. 

Then we will mark the current logged-in session as authenticated with `session["typingdna_auth"] = True` then redirect the user to their dashboard. However, if the authentication was unsuccessful (due to an error from TypingDNA), we will prompt the error message to the user and let them retry the enrollment process.

After successfully enrolling in TypingDNA, we would be redirected to a page similar to the one in the image below:

![dashboard](/engineering-education/biometric-2fa-in-a-django-application-with-typingdna/dashboard.png)

### Authenticating new users with TypingDNA
#### Building our login logic
After registering and enrolling our typing patterns with TypingDNA, we can now log in and implement our two-factor authentication.

![login](/engineering-education/biometric-2fa-in-a-django-application-with-typingdna/login.png)

In the image above, our `login` view checks if the user is set in the session. If the user is set, then the user is redirected to view all videos page. If the user is not set then the user is redirected to verify his/her 2FA with their typing pattern.

#### Building the verify page
Now we are going to build the verification page where we will verify user identities using TypingDNA biometrics. 

Let's update our `verify.html` file with the code snippet below:

```html

{% load static %}

<link href="//maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css">

<script src="//maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js"></script>

<script src="//cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>


<style>
 body {
background-color: #b2beb5
}
</style>

<div class="container">

        <div class="row justify-content-center align-items-center" style="height:100vh">

            <div class="col-4">

                <div class="card">

                  <center><h2>2FA Verify Your Typing Style</h2></center>

                 {% if messages %}

                  {% for message in messages %}

                        <div class="alert alert-danger" role="alert">

                        {{message}}

                        </div>

                    {% endfor %}

                  {% endif %}


                  <div id="failed-auth" class="alert alert-danger" role="alert" style="display: none">

                      <strong>You have not completed your authentication, please type the text above</strong>

                  </div>          

                    <div class="card-body">

                        <form method="POST">

                          {% csrf_token %}

                            <div class="form-group">

                              <p class="mb-0" style="color:red;"><strong>"I am authenticated by the way I type"</strong></p>

                              <br>

                                <input type="text" class="form-control disable-autocomplete" id="auth-text" name="type" placeholder="enter text seen above">

                            </div>

                            <input type="hidden" id="tp" name="tp">

                          <button class="btn btn-primary" type="button" class="btn btn-success" onclick="startAuthentication()">Start Authentication</button>

                        </form>

                        <p class="mb-0" style="color:blue;"><strong>Can't verify?<a href="verify-email"> Try verifying with your email</a></strong></p>

                    </div>

                </div>

            </div>

        </div>

    </div>

    <script src="{% static 'typingdna.js' %}">
    </script>

    <script src="{% static 'autocomplete-disabler.js' %}">
    </script>

    <script src="{% static 'typing-visualizer.js' %}">
    </script>

```

![verify-page](/engineering-education/biometric-2fa-in-a-django-application-with-typingdna/verify-page.png)

This page is where users will be authenticated with their pre-registered typing patterns.

#### Verifying with TypingDNA
After preparing our `verify.html` page, we need to use the TypingDNA recorder to start verifying typing patterns, which will help us record typing patterns and match them. 

You can read more about recording typing patterns [here](https://www.typingdna.com/docs/how-to-record-typing-patterns.html).

First, we will create two variables, `typingdna` and `auto_complete_dIsabler`, which are instances of the TypingDNA and AutocompleteDisabler classes. This will ensure that as soon as the user starts typing, he/she starts being recorded (as a history of keystroke events).

We also called the `beginAuthentication` function that stops recording the user’s keystrokes using the `TypingDNA.stop()` method and analyze them.

Add the code below right after the TypingDNA importation in the `enroll.html` page.

```html

<script>
  var typingdna = new TypingDNA();
      var auto_complete_disabler = new AutocompleteDisabler({
        showTypingVisualizer: true,
        showTDNALogo: true
      });
      function beginAuthentication() {
        document.getElementById("failed-auth").style.display = "none";
        document.getElementById("auth-text").value = "";
        TypingDNA.stop();
        let typing_pattern = typingdna.getTypingPattern({
          type: 1,
          text: "I am authenticated by the way I type"
        });
        if (typing_pattern == null) {
          document.getElementById("failed-auth").style.display = "block";
          TypingDNA.reset();
          TypingDNA.start();
        } else {
          document.getElementById("tp").value = typing_pattern;
          document.forms[0].submit();
        }
      }
</script>

```

When the user’s typing pattern has been captured, we check if the capturing was successful. If it was unsuccessful, we display an error message else we submit the form and send the recorded typing pattern for verification if it was successful.

Update our `verify` view to capture and verify the submitted user typing pattern with the `auto` endpoint in the TypingDNA API.

```Python
def verify(request):
    if request.method == "POST":
        tp = request.POST.get("tp")
        username = request.user.username
        r = tdna.auto(tdna.hash_text(username), tp)
        if r.status_code == 200:
            if r.json()["result"] == 1:
                request.session["typingdna_auth"] = True
                return redirect("App:videos")
            else:
                messages.add_message(request, messages.INFO,"You failed the TypingDNA verification check, please try again", "danger")
                return redirect("App:verify")
        else:
            messages.add_message(request, messages.INFO,r.json()["message"], "danger")
            return redirect("App:verify")
    return render(request,"verify.html")
```

In the Python code above, we checked if the request sent from the frontend is a POST request. If this was the case, we proceeded to capture the POST request for `tp`, which was the typing pattern recorded, and setting `username` to the current user. We are using the username as the user ID, which automatically does the authentication required. 

We then make a request to the TypingDNA `auto` method while sending the user ID of the current user and the collected typing pattern `tp`. The `auto` method then returns a `status code 200` if the verification is successful or returns an error message if verification is unsuccessful. 

If the verification is successful, we set `typingdna_auth` in the session to True and redirect the user to the `videos` page. However, if verification is unsuccessful, we display an error message from the `auto` endpoint on the `verify` page.

### Fall back verification option
Supposing a user cannot use the TypingDNA verify page, we need to provide a fallback option for the user to secure logins. Earlier, while signing up to TypingDNA, you may have noticed a third option to complete two-factor authentication with OTP if the biometric typing verification fails. 

In this case, we will be using a required magic link sent to the user’s email, which automatically does the authentication when clicked by the user.

Create a new file named `verify-email.html` in the templates folder and add the following HTML code snippet.

```html

{% load static %}

<link href="//maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css">

<script src="//maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js"></script>

<script src="//cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>


<style>
 body {
background-color: #b2beb5
}
</style>

<div class="container">

        <div class="row justify-content-center align-items-center" style="height:100vh">

            <div class="col-4">

                <div class="card">

                  <center><h2>Verify With Your Email</h2></center>

                  {% if messages %}

                        <div class="alert alert-danger" role="alert">

                        {{messages}}

                        </div>

                  {% endif %}

                  {% if error %}

                  <div id="failed-auth" class="alert alert-danger" role="alert" style="display: none">

                      <strong>Cannot verify with email!!</strong>

                  </div>

                    {% endif %}

                      {% if messages %}

                      {% else %}

                    <div class="card-body">

                        <form method="POST">

                          {% csrf_token %}

                            <div class="form-group">

                              <center><p class="mb-0" style="color:green;"><strong>"Get a link in your Email"</strong></p></center>

                              <br>

                                <input type="hidden" name="verify_email" value="true" />

                            </div>

                          <center><button class="btn btn-primary"  type="submit" >Send Link</button></center>

                        </form>

                    </div>

                    {% endif %}

                </div>

            </div>

        </div>

    </div>

```

![email-verification](/engineering-education/biometric-2fa-in-a-django-application-with-typingdna/email-verification.png)

#### Creating the tokens file
We need to create a `tokens.py` file which we will use to generate the magic link for verification. Create a `tokens.py` file and add the following python code snippet.

```python
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.utils import six
class AccountActivationTokenGenerator(PasswordResetTokenGenerator):
    def _make_hash_value(self, user, timestamp):
        return (
            six.text_type(user.pk) + six.text_type(timestamp)
        )
account_activation_token = AccountActivationTokenGenerator()
```

#### Creating the activation token page
We need to create an `activation.html` file that we will use to display the link sent to the user. Create an `activation.html` file in the templates directory and add the following HTML code.


```html

{% autoescape off %}

Hi {{ user.username }},


Please click on the link below to verify your login:


http://{{ domain }}{% url 'App:activate' uidb64=uid token=token %}

{% endautoescape %}


```

#### Building the login activation logic
We will now be building our logic for how the activation token will be generated and sent.

First, we need to import the required modules and libraries needed. 

Copy and paste the code below in your `views.py` file.

```python
from django.views.generic import  View
from . tokens import account_activation_token
from django.contrib.sites.shortcuts import get_current_site
from django.template.loader import render_to_string
```

We need to create the activation token each time the user requests it on the `verify-email` page. Usually, we would send the activation link to the user’s email, but in this case, we would simply just display the link in our console. 

However, if you want to send the activation link to the user’s email, you will need to use Django’s SMTP module. You can learn more about it [here](https://docs.djangoproject.com/en/3.1/topics/email/).

Update your `verify_email` function in the `views.py` file with the code below:

```python
def verify_email(request):
    if request.method=="POST":
        name=request.POST.get("verify_email")
        if name=="true":
            context={"messages":"A link has been sent to your email"}
            current_site = get_current_site(request)
            message = render_to_string('activation.html', {
                'user': request.user,
                'domain': current_site.domain,
                'uid': request.user.pk,
                'token': account_activation_token.make_token(request.user),
                })
            print(message)
            return render(request,"verify-email.html",context)
        else:
            context={"error":"true"}
            return render(request,"verify-email",context)
    return render(request,"verify-email.html")
```

In the code snippet above, we checked if the request received from the frontend is a POST request. If this was the case, we proceed to collect the data in the POST request for `name` and then to check if the value is “true”. 

If this is the case, we create a message using the `render_to_string` function to send the activation token and other data required to the `activation_email` page to be rendered for the user to see. 

We created the token using the `make_token` method we imported from our `tokens.py` file, that will make the token using the username of the user.

The activation link was sent to the user in the images below and displayed in the console for the user to see.

![link-sent](/engineering-education/biometric-2fa-in-a-django-application-with-typingdna/link-sent.png)

![verification-token](/engineering-education/biometric-2fa-in-a-django-application-with-typingdna/verification-token.png)

#### The confirmation page
Create a new file name `confirm.html` in the templates folder and update the file with the code snippet as shown below:

```html

{% load static %}


<center>{% if message %}

  <h2>{{message}}</h2>

{% endif %}

</center>


```

#### Verifying the activation token
The activation token created for the user has to be verified after the user clicks on it. To do this, update your `views.py` file by placing the following Python code at the beginning of the file.

```python
class ActivateAccount(View):
    def get(self, request, uidb64, token, *args, **kwargs):
        try:
            uid = uidb64
            user = User.objects.get(pk=uid)
        except (TypeError, ValueError, OverflowError, User.DoesNotExist):
            user = None
        if user is not None and account_activation_token.check_token(user, token):
            request.session["verify_email"]= True
            auth.login(request,user)
            return redirect('App:videos')
        else:
            context={"message":'The confirmation link was invalid, possibly because it has already been used.'}
            return render(request,'confirm.html',context)
```

In the code snippet above, we created the `get` method, which receives the activation token clicked and collects the data required for verification from it. We then make a `try...except` cache that checks if any errors in matching the `uid` passed with a user in the database. 

If there are no errors, the user is automatically logged in, and the “verify_email” in the session is set to True. However, if any problems are matching the `uid` with a user in the database, the user is set to “None” and the error message produced is sent to rendered in the `confirm.html` page.

Finally, we need to create a new URL to handle verifications with the activation token. Add the following code to our `urlpatterns` in the`urls.py` file to verify activation token by the `ActivateAccount` class.

```python
path('activate/<uidb64>/<token>/', views.ActivateAccount.as_view(), name='activate')
```

The image below shows the result of navigating to a wrong, used, or timed-out activation token.

![invalid-token](/engineering-education/biometric-2fa-in-a-django-application-with-typingdna/invalid-token.png)

### Adding videos to database
To add videos to our database that we can play, we need to visit the admin page and log in. Let's navigate to the admin page on [admin](http://127.0.0.1:8000/admin) and log in. 

After a successful login, click on the `+` button next to `Videos` to add a new video and provide the required details as seen in the image below.

![add-video](/engineering-education/biometric-2fa-in-a-django-application-with-typingdna/add-video.png)

After providing the details required for our video, we will click save the video and return to the homepage. Go to the [videos](http://127.0.0.1:8000/all-videos) page. You will notice we now have a new video added that we can play.

![added-video](/engineering-education/biometric-2fa-in-a-django-application-with-typingdna/added-video.png)

### Conclusion
While integrating TypingDNA with Django, we implemented two-factor authentication that uses biometrics in a Python web application with little to no effort. We also saw how easy it was to create and verify identities by analyzing user typing patterns using TypingDNA.

The source code of our application is available on [GitHub](https://github.com/Nomzy-kush/mine.git). Trying out TypingDNA for biometric authentication was very interesting, try implementing it in your applications.

Happy coding!

---
Peer Review Contributions by: [Odhiambo Paul](/engineering-education/authors/odhiambo-paul/)
