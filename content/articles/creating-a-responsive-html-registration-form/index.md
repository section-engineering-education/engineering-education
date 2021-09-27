---
layout: engineering-education
status: publish
published: true
url: /engineering-education/creating-a responsive-html-registration-form/
title: Creating a responsive HTML registration form
description: In this article we will create a simple registration form using HTML and CSS. We will the add responsiveness to it so that it can be viewed in all screens.
author: harshita-bansal
date: 2021-03-25T00:00:00-18:00
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/creating-a-responsive-html-registration-form/hero.jpg
    alt: Registration form image example
---

Nowadays, HTML forms may be found on a wide range of websites. All such HTML forms are intended to gather data, feedback, and various information from website's visitors.
<!--more-->

Contact forms, Login forms, and registration forms are just a few examples. This tutorial will guide you on how to create one.

The registration form has multiple input fields (checkboxes, text areas, submit buttons, radio buttons, etc) with varied input details (email address, name, and age, etc) where the visitor must provide the information required to register for a certain web page.

There are several kinds of the registration forms. In this tutorial, you will get to know how to make a basic responsive HTML registration form.

Our HTML form will consists of:

- First Name / Last Name
- Username or Email
- Password / Confirm Password
- Register Button

Lets start learning!

#### Selecting an Editor for HTML.

To write HTML code, you'll need a text editor, precisely like you'll require a word processor to make a text document. These programs turn the odd code you write into a registration form.

Here in the market, there are dozens (if not a large number) of HTML editors, some of which have identical functionality.

We won't drag this with specifying it in more detail, but there are a few essential points to remember:

**Detecting the Error**: Highlight the syntax mistakes automatically to make corrections simpler.

**Complete Automatically**: Based on past modifications, it suggests appropriate HTML components (With lengthy code, this will save you a lot of time).

**Highlights the Syntax**: Uses colors to highlight various HTML elements depending on categories to make your code simpler to read and organize.

**Replace & Search**: Rather than changing each one manually, locate and overwrite all occurrences of specific code.

There are more aspects to be concerned about, but the above should be plenty for a basic registration form.

![Editors for HTML](/engineering-education/creating-a-responsive-html-registration-form/editors.png)

It is entirely up to you to decide which editor you will use. Do you want anything to utilize in your browser? Probably take a glance at Codepen.

Barebones? Notepad++. Does a simple user interface with a simple input field? It's all about Sublime Text.

In this tutorial, we'll be using Visual Studio Code.

There’s hardly any need to get too worked up over it. Unfortunately, no HTML editor, no matter how powerful, will build a registration form for you. It's entirely up to you how you will want to go about it.

#### Creating a HTML File.

Next, inform your text editor that you're going to generate a HTML file. To do this, create a new file and save it with the ".html" extension. For instance, "index.html."

Once you are done , type in the following code:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <title>Document</title>
</head>
<body>
    
</body>
</html>
```

**Tip**: Some editors will not autofill. That's OK. Simply copy and paste the code above to get the same result.

### Creating the Form
In any HTML page, the `<form>` element is used to create a form that could be a contact, registration, or login form.

In this tutorial, we are adding a `<form>` element within the `<body>` element, as shown below:

```html
<!DOCTYPE html>
<html lang="en">

<head>
    
    <link rel="stylesheet" href="style.css">
    <title>Responsive HTML Register Form</title>

</head>

<body>

    <form action="/register" class="form">
    </form>

  </body>

</html>
```

The class, action, and method attributes have been added to the `<form>` tag.

As you may be aware, selectors in CSS and JavaScript may be used to target an element using class attributes.

When a form is submitted, the action property containing a URL, or any server-side file name requests it to publish the form values to that URL or file name.

The method property specifies the HTTP method to be used by the browser when submitting the form.

#### Creating a Structure For form

Once the `<form>` element is in place, we add three more `<div>` elements inside it to represent the `<form>` element's header, body, and footer, as seen in the code below:

```html
   <form action="/register" class="form">

        <!-- HEADER -->
        <div class="header">
         
        </div>

        <!-- Body -->
        <div class="body">

        </div>

        <!-- Footer -->
        <div class="footer">

        </div>

    </form>
```

#### Creating a form Header

Within the `header` element, insert an `<h1>` element:

```html

<!-- HEADER -->
        <div class="header">

            <h1>Registration Form</h1>

        </div>
```

Now we are required to include some CSS code to our CSS file for `header`, as shown below:

```css
body{
    background: #8360c3; 
    background: -webkit-linear-gradient(to right, #2ebf91, #8360c3);  
    background: linear-gradient(to right, #2ebf91, #8360c3);
    
}

.form{
    background-color: white;
    border-radius: 5px;
    width: 600px;
    margin: 20px auto;
    padding: 20px;
}

.header{
    text-align: center;
    border-bottom: 2px solid black;
}

```


The CSS code above is for the form's header and main form container. At this point, you would be able to view the header layout on the browser once you reload.

Lets now add some HTML form components for `body`.

#### Creating Form Body [ First name and Last name]

We are constructing a `<div>` with the class `formElements` inside `body`. Then, we will create two `<div>` elements with the class name `user-first-name` and 'user-last-name'.

Inside `formGroups`, there are two more HTML elements: `<label>` and `<input>`, as shown below.

```html

<!-- Body -->

        <div class="body">

            <!-- First-Name -->
            <div class="formElements user-first-name">

                <label for="firstName">First Name: </label>
                <input class="form__input" type="text" id="firstName" placeholder="First Name"
                >
            </div>

            <!-- last-Name -->
            <div class="formElements user-last-name">

                <label for="lastName">Last Name: </label>
                <input class="form__input" type="text" name="" id="lastName" placeholder="LastName">

            </div>

        </div>
        
```

Afterwards we add the CSS styling for the First name and last name `formElements`.

```css

.body
{
    padding: 20px 0px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    font-size: 20px;
}


.formElements
{
    padding: 20px 0;
    font-weight: bold;
}


.form__input
{
    font-size: 20px;
    font-family: inherit;
    color: inherit;
    padding: 10px 10px 0 10px;
    border-radius: 2px;
    width: 90%;
    background-color: rgba(255, 255, 255, 0.5);
    border: none;
    border-bottom: 1px solid  black;
    display: block;
}

```

At this point, you should be able to see the styles applied to the page after reloading.

#### Creating the form body [Email and Password]

In HTML, the email address will be a distinct block, and the Password and Confirm Password will be the equivalent of the first name and last name. After the end tags of the first name and last name, insert the following code; `formElements` but contained within the `body` wrapper.

```html

         <div class="body"> 

           <!-- Email -->
            <div class="formElements email">

                <label for="email">Email: </label>
                <input class="form__input" type="email" id="email" placeholder="Email">

            </div> 

           <!-- Password -->
            <div class="formElements password">

                <label for="password">Password: </label>
                <input class="form__input" type="password"  id="password" placeholder="Password">

            </div>

           <!-- Confirm-Password -->
            <div class="formElements confirm-password">

                <label for="confirmPassword">Confirm Password: </label>
                <input class="form__input" type="password" id="confirmPassword" placeholder="Confirm Password">

            </div>

          </div>
```

Here we don't need to add any additional style to the above code because we are using the same CSS classes.

#### Creating the Form Footer

In our form, the footer will consist of a submit button in `footer`.

```html

 <!-- Footer -->
        <div class="footer">

            <button type="submit" class="btn">Register</button>

        </div>
```

Now we will add  CSS styling for `footer`.

```css

.footer
{
    display: flex;
    justify-content: center;
}

.btn
{
    cursor: pointer;
    background-color: black;
    border: none;
    color: white;
    padding: 10px 22px;
    border-radius: 4px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;    
}

```

With the blocks of code above, our form will now look like this one below:

![Hurray we created the form!](/engineering-education/creating-a-responsive-html-registration-form/htmlform.png)

Our next task is adding responsiveness to our form.

#### Adding responsiveness to the Form

Responsiveness is part of CSS. Don’t worry we won’t do heavy coding for it.

At first, we need to know what is responsiveness?

Responsiveness is a way to make your form, website, or application adjustable and perfect view on any screen. The screen may be of any device like laptop, mobile phone or a tablet.

For making the form responsive we will use a media query. On the screens that are 680px or less, we need to set the width of our form according to the screen.

```css
@media screen and (max-width: 680px)
{
 .form{
   width: 450px;
}
```

Hurray! You have successfully learned how to make a responsive HTML registration form.

### Conclusion
Finally, we have created our registration form in just few simple steps. We have also made it responsive. Our webpage visitors who use mobile phones will be able to view it whole without any problem!

I hope you find this tutorial helpful! 

---
Peer Review Contributions by: [Monica Masae](/engineering-education/authors/monica-masae/)