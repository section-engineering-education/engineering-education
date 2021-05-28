---
layout: engineering-education
status: publish
published: true
url: /implementing-flask-wtform/
title: Implementing Flask WTForms
description: In this article, you will understand how to work with forms in your Flask web application. Forms are integral components of web applications. They are required to send data from the user to the backend.
author: adetu-ridwan
date: 2021-02-13T00:00:00-11:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/implementing-flask-wtform/hero.jpg
    alt: Implementing Flask WTForms example image
---
Forms are integral components of web applications. They are needed to send data from the user to the backend. In this article, we will understand how to work with forms in our Flask web application.
<!--more-->
This article requires a basic understanding of how to set up Flask web applications. If you do not know how to approach that, then read through my previous [article](https://www.section.io/engineering-education/complete-guide-on-installing-flask-for-beginners/).  

Clone the GitHub [repository](https://github.com/corpsgeek/introduction-to-flask) to get started with implementing the Flask form.

### Configuring the work environment
Start by cloning the GitHub repository to your environment.

```bash
$ git clone https://github.com/corpsgeek/introduction-to-flask.git
```

Change the directory to the folder you have the cloned GitHub repo. Proceed to install the necessary package required for the cloned Flask application. 

Run the following command to install the required dependencies.

```bash
$ pip3 install -r requirements.txt
```

Note that if you are running Python2, then replace **pip3** with **pip**.

### Possible errors
If you stumble upon the following error when installing the required dependencies for the cloned file, ignore it, and proceed to the next step.

```bash
$   Could not find a version that satisfies the requirement pkg-resources==0.0.0 (from -r requirements.txt (line 6)) (from versions: )
No matching distribution found for pkg-resources==0.0.0 (from -r requirements.txt (line 6))
```

The `requirements.txt` folder has a `pkg-resources==0.0.0` requirement for the Flask web app. This resource is a result of the use of a virtual environment in the cloned repository. While this article isn't working with a virtual environment, this causes the `pkg-resources` error.

An alternative to resolving this error is to delete the `pkg-reources==0.0.0` requirement in line 6 from the `requirements.txt` file before installing the required packages for the project.

### Running the application
In light of any errors distinct from the one stated above, comment, and if not, proceed to run the flask application by executing the following in your terminal.

```bash
$ flask run
```

With this, you can proceed to your web browser and follow the URL stated in your terminal (127.0.0.1:500), and you should see a simple hello world application displayed.

![Hello world image](/engineering-education/implementing-flask-wtform/hello_world.jpg)

### Form handling in Flask
The Flask framework does not provide a unique way to handle forms. However, there exist two ways developers can create and handle forms.

### The form creation technique
The following are the two methods of creating forms in Flask:
1. HTML Forms
2. WTForms

### The form handling technique
The following are the two methods of handling forms in Flask:
1. Request Object
2. Flask-WTF Extension

### Form creation with HTML forms
The first step to working with forms in your Flask application is to create your forms before handling them. You can create your forms using basic HTML and CSS. 

However, for development and production purpose. Use frameworks like Bootstrap because form error handling in Flask is easier.

In our cloned Flask application, the HTML template is rendered from the `app/views.py` file, displaying a Hello World text. Now, we use the above files to code the application.

Then create a new folder named **template** within the **app** folder. This folder will consist of all our HTML files. Proceed further to creating a new HTML file named `register.html`. 

In the `register.html` folder, we initialize the content with a complete HTML code that links to Bootstrap CSS. You should go to the gist [link](https://gist.github.com/corpsgeek/18cb010ff2d051c4da15897d08083a45) to copy the code.

With the `register.html` file setup with Bootstrap, you won’t be using any bootstrap classes for the moment. 

Proceed to create a basic HTML form that accepts the username, email, and password. Also, ensure you set the method attribute to post in the form tag. 

You should have something similar to this.

```HTML
 <form action="" method="post">
       <fieldset>
           <label for="username">Username</label>
           <input type="text" name="username" placeholder="username">
       </fieldset>
       <fieldset>
           <label for="email"> Email</label>
           <input type="email" name="email" placeholder="xyz@gmail.com">
       </fieldset>
       <fieldset>
           <label for="password">Password</label>
           <input type="password" name="password" placeholder="password">
       </fieldset>
       <button type="submit">Register</button>
   </form>
```

### Rendering the form
To render our newly created registration forms, we navigate to our view.py file within the app folder. 

In our views, below the app import file, let’s import the `render_template` and `request` function from Flask. They are required to render our HTML pages and to make requests.

```Python
from flask import render_template, request
```

### Creating the registration route
The next process is to create the registration route to handle the forms. Start by creating a route with the path `/register` and a register function for the code logic. 

In the route function, render the `registration.html` file by returning the template. Return the `render_template()` function, and pass in the HTML file name to be rendered. 

Your code should be similar to this

```Python
@app.route("/register")
def register():
   return render_template('register.html')
```

With the form created and the route created, in your web browser, navigate to the form page by following the URL: `127.0.0.1:500/path`, where you replace the `path` variable with the pathname you specified in the route. 

In our case, the `/register` is the path. If you’ve done everything right, then your web browser should display this:

![formdisplayimage](/engineering-education/implementing-flask-wtform/form_displayraw.jpg)

### Handling the form data
At this stage, you can view your form. Try filling the data like a regular user signing up for a web application, and hit the submit button. By submitting the data, you should see a 405 method not allowed error page. This error can be handled by following this process.

### Handling the 405 method error
The 405 method not allowed error tells us that the page's route does not accept the method we passed in our HTML form. 

The way to fix this is to switch to the registration route function. In the app route decoration, we pass in another parameter called `methods` with a list of methods the route should expect. 

```Python
@app.route("/register", methods=["GET", "POST"])
def register():
   return render_template('register.html')
```

In your web browser, refresh the page. If you still get this error after adding the above line of code, Flask isn’t picking up the changes, so you have to kill the server and run it for the code changes to take effect.

If you refreshed your page and submitted user data, you will notice that you are referred back to the registration form, which implies that your form data is sent to the route but not handled. Let’s proceed to the handling of this form data with the request object.

### The request object
To handle the form data sent to our route, we use the request object. The way to access this is by importing the request object from Flask in your route file.

```Python
from flask import request
```

The first process is to check the method of an incoming request, whether it’s a `GET` request or a `POST` request, and the way to approach this is to use the method member variable of the request object. 

In your register route function, we check the request method to be a `POST` request, then in the `if` block, we get the form data sent by using the form member variable of the request object, then pass in the name value of each field in the HTML forms as a key to store the values.

```Python
@app.route("/register", methods=["GET", "POST"])
def register():
   #check the request method to ensure the handling of POST request only
   if request.method == "POST":
       #store the form value
       username = request.form["username"]
       email = request.form["email"]
       password = request.form["password"]
 
   return render_template('register.html')
```

Your register view function should have a similar code. Recall that the value passed to the `request.form` method is our HTML form's name value. 

The form data are handled adequately. The next process is to return the data to the webpage rather than redirecting the user to the registration form page.

To return the data to the webpage, add the following line of code:
```Python
@app.route("/register", methods=["GET", "POST"])
def register():
   #check the request method to ensure the handling of POST request only
   if request.method == "POST":
       #store the form value
       username = request.form["username"]
       email = request.form["email"]
       password = request.form["password"]
 
       return username + " <br/> " + email
   return render_template('register.html')
```

By adding the return statement inside the request method block, the web app will redirect the user to a blank page and display their username data. Note that you need to restart your server for the code changes to take effect.

If you’ve followed the instructions accordingly, then you should be able to handle a form using the request object. Now, let’s proceed to the other method of form creation and handling.

### Form creation with Flask-WTForms
Flask WTForms is a library that makes form handling easy and structured. It also ensures the effective handling of form rendering, validation, and security.

To build forms with this approach, you start by creating a new file in our app directory and name it `forms.py.` This file will contain all the application forms. Let’s create a new `contact.html` template, then the route with path `/contact` to handle the form logic, then render the contact template.

In the implementation of our flask form, we need to install the `Flask-WTForms` first. 

```bash
$ pip install flask-wtf
```

Next, open the `forms.py` file created earlier. 

Here, we import the Flask form:
```Python
from flask_wtf import FlaskForm
```

The subsequent step is to create a contact form. To do this, we initialize a class that inherits the `FlaskForm` object. Your code should look similar to this.

```Python
from flask_wtf import FlaskForm
 
class ContactForm(FlaskForm):
   pass

```

Next, we proceed to create our form fields. A contact form would ideally consist of the user name, their email address, and a message. To replicate this in pure HTML, inputting textfield and textarea would be the only choice. But, this process is quite different from WTForms.

To create our form fields in WTForms, we import the fields we require. For example, the name field of the user is going to be a string. Therefore, we import `StringField`.

```Python
from wtforms import StringField
```

After importing the `StringField`, we initialized the field within our form class for the user name.

```Python
   name = StringField('name', validators=[])
```

From the above code, it’s noteworthy that the fields in WTForms accept two parameters. The first is the label of the form field and a list of validators for the form field. Since we require this data from the user, we can import the `DataRequired()` validator from Wtforms.

```Python
from wtforms.validator import DataRequired, Email
```

In the validators list, we pass in the validator we require for the particular field. I’ll go about creating the email and message field to avoid bloating this article. 

```Python
from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, SubmitField
from wtforms.validators import DataRequired, Email
class ContactForm(FlaskForm):
  name = StringField('name', validators=[DataRequired()])
  email = StringField('email', validators=[DataRequired(), Email()])
  message = TextAreaField('message', validators=[DataRequired()])
  send = SubmitField('send')
```

The only new thing here is that I imported the `TextAreaField` and `SubmitField`, to handle the user message and submit the form. With this, your contact form is complete. Now let’s render the form.

### Errors with validators
When you run your web application, and a validator package is missing, install the validator using `pip install`. For example, if the Email validator isn’t available, run the following in your terminal to install the Email validator.

```bash
$ pip install email
```

### Rendering the form
To render our form, the first thing you need to do is to set a secret key for your application in your app file, which is the `__init__.py` file. 

First, we need to generate a random 16 digit character for our secret key. The secure way to do this is to open up your Python interpreter and follow the coding process below.

```bash
Python 2.7.17 (default, Sep 30 2020, 13:38:04) 
[GCC 7.5.0] on linux2
Type "help", "copyright", "credits" or "license" for more information.
>>> import secrets
>>> secrets.token_hex(16)
u'571ebf8e13ca209536c29be68d435c00'
>>> 
```

The alphanumeric characters in quotes are what you need to copy to use as our secret key in our `__init__.py` file, and you can set this by adding the following.

```Python
from flask import Flask
 
app = Flask(__name__)
 
app.config["SECRET_KEY"] = '571ebf8e13ca209536c29be68d435c00'
 
from app import views
```

Subsequently, in our route file where we declared the contact form's route function, import the contact form in our `forms.py` file.

```Python
from app.forms import ContactForm
```

Then, in our view function, we create an instance of the form, then pass the form object to our contact template.

```Python
@app.route("/contact", methods=["GET", "POST"])
def contact():
   form = ContactForm()
   return render_template('contact.html', form=form)
```

Please proceed to our contact template to display the forms in our browser. Initialize the form with a `POST` method.

```HTML
   <form action="" method="post">
      <!-- Form content -->
   </form>
```

In our form tag, the first thing you need to do is add the following tag at the top of the form.

```JINJA
{{ form.hidden_tag() }}
```

The above Jinja code adds a cross-site request forgery token to protect our forms from attacks from hackers.

Next, we want to render the form labels and the form itself. To do this, we make use of the jinja template, and the code template takes the form.

```JINJA
{{ form.varname_of_the_form_field.label()}} 
{{ form.varname_of_the_form_field()  }}
```

The first jinja template returns the label of the form field. While the second returns the form field itself. Also, the form field and label can take a class argument for styling. 

I’ll add all the form fields.

```HTML
<form action="" method="post">
   {{form.hidden_tag()}}
 
   <div class="form-group m-5">
       {{form.name.label()}}
      {{form.name(class="form-control")}}
   </div>
   <div class="form-group m-5">
       {{form.email.label()}}
       {{form.email(class="form-control")}}
   </div >
   <div class="form-group m-5">
       {{form.message.label()}}
       {{form.message(class="form-control")}}
   </div>
   {{form.send(class="btn-lg btn-primary m-5")}}
</form>
```

Your contact form should be similar to this, and remember we are using Bootstrap. You can now run the server and navigate to the contact page to view the form to ensure you’ve done the right thing.

### Handling the form data
The form handling process with the Flask-WTF extension is easy. In our contact route, we can fetch the form data by checking if the form is validated when the user submits the data, then if it is, we can fetch the data.

```Python
if form.validate_on_submit():
    Var = form.form_variablename.data
```

When the user sends a message, we fetch the data from the contact form and render it on a new page. Your contact route logic should have something similar to this.

```Python
@app.route("/contact", methods=["GET", "POST"])
def contact():
   form = ContactForm()
   if form.validate_on_submit():
       name = form.name.data
       email = form.email.data  
       message = form.message.data  
 
       return name + "<br /> " + email + "<br /> " + message
 
   return render_template('contact.html', form=form)
```

The Flask-WTForm extension makes it simpler and quicker to assess form data. It also ensures speedy validation checks on form data without writing every code logic for each validation check.

### Handling form errors
Forms encounter errors when the user submits invalid data, we can capture the error, but the user needs to be aware of what it is he/she is doing wrong to avoid such mistakes. The Flask Wtform makes it easy to work with errors in our form.

To display form errors, we navigate to our contact form template. The form field is where we want to perform the error check. 

The first step is to check if the form field itself has any errors, then pass in the form field with a bootstrap class of is-invalid. The bootstrap class makes it easy to work with form errors, so I recommended it when working with the flask wtf-forms.

```JINJA
 {% if form.email.errors %}
       {{form.email(class="form-control is-invalid")}}
 
       {% endif %}
```

The next step is to loop through the errors and display them just below the form field itself. The error response is wrapped in a div with the bootstrap class `invalid-feedback`.

```JINJA
{% if form. email.errors %}
 
       {{form.email(class="form-control is-invalid")}}
           {% for error in form.email.errors %}
               <div class="invalid-feedback">
                   <span>{{error}}</span>
               </div>
           {% endfor %}
          
       {% endif %}
```

Finally, write an else statement to display the form field without the is-invalid bootstrap class.

```JINJA
 
       {% if form. email.errors %}
 
       {{form.email(class="form-control is-invalid")}}
           {% for error in form.email.errors %}
               <div class="invalid-feedback">
                   <span>{{error}}</span>
               </div>
           {% endfor %}
       {% else %}
       {{form.email(class="form-control")}}
       {% endif %}
```

By the end of the implementation of form error handling, the whole block of a particular form field should be similar to the code below.

```JINJA
 <div class="form-group m-5">
       {{form.email.label()}}
 
       {% if form. email.errors %}
 
       {{form.email(class="form-control is-invalid")}}
           {% for error in form.email.errors %}
               <div class="invalid-feedback">
                   <span>{{error}}</span>
               </div>
           {% endfor %}
       {% else %}
       {{form.email(class="form-control")}}
       {% endif %}
 
   </div >
```

You can repeat the whole process for other form fields, and that’s just how easy it is to handle form errors with the flask-wtf extension.

### Conclusion
Form handling is one of the crucial components of web applications. This article has illustrated the two ways to handle forms when building web applications with Flask.

However, the Flask WTForms extension is the best approach to adopt when handling forms. It has all the components needed for form handling, which makes form writing easy.

One can find the complete codebase for this tutorial [here](https://github.com/corpsgeek/flask-form-handling).

---
Peer Review Contributions by: [Lalithnarayan C](/engineering-education/authors/lalithnarayan-c/)
