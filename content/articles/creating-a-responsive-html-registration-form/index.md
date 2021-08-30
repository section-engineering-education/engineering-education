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

  - url: /engineering-education/creating-a responsive-html-registration-form/hero.jpg
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
- Signup Button

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

Next, inform your text editor that you're going to generate a HTML file. To do this, create a new file and save it with the ".html" extension. For instance, "myform.html."

Once you are done , type in the following code:

```html
<!DOCTYPE html>
<html>
  <head>
    <title></title>
  </head>
  <body></body>
</html>
```

**Tip**: Some editors will not autofill. That's OK. Simply copy and paste the code above to get the same result.

### Creating the Form
In any HTML page, the `<form>` element is used to create a form that could be a contact, registration, or login form.

In this tutorial, we are adding a `<form>` element within the `<body>` element, as shown below:

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>Responsive HTML Register Form</title>
    <link rel="stylesheet" href="style.css" />
  </head>
  <body>
    <form class="signupForm" action="/register" method="post"></form>
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
form class="signupForm" action="/register" method="post">

    <!-- form header -->
    <div class="formHeader">
    </div>

    <!-- form body -->
    <div class="formBody">
    </div>

    <!-- form footer -->
    <div class="formFooter">
    </div>

  </form>
```

#### Creating a form Header

Within the `.formHeader` element, insert an `<h1>` element:

```html
<!-- form header -->
<div class="formHeader">
  <h1>Create Account</h1>
</div>
```

Now we are required to include some CSS code to our CSS file for `formHeader`, as shown below:

```css
import url('https://fonts.googleapis.com/css?family=Roboto');

body {
  background:linear-gradient(to right, #78a7ba 0%, #385D6C 50%, #78a7ba 99%);
}

.signupForm {
  font-family: "Roboto", sans-serif;
  width:650px;
  margin:30px auto;
  background:linear-gradient(to right, #ffffff 0%, #fafafa 50%, #ffffff 99%);
  border-radius: 10px;
}

.formHeader  {
  background-color: #EFF0F1;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}

.formHeader h1 {
  font-size: 30px;
  text-align:center;
  color:#666;
  padding:20px 0;
  border-bottom:1px solid #cccccc;
}
```

At the beginning of the CSS code, we have an import line stating that we are obtaining any preferred font from the Google font collection.

You may change the font you're using by visiting [here](https://fonts.google.com/).

The CSS code above is for the form's header and main form container. At this point, you would be able to view the header layout on the browser once you reload.

Lets now add some HTML form components for `formBody`.

#### Creating Form Body [ First name and Last name]

We are constructing a `<div>` with the class `horizontalGroup` inside `formBody`. Then, inside `horizontalGroup`, we will create two more `<div>` elements with the same class name `formGroup`.

The placement of the `formGroup` on the page is indicated by adding an additional left or right class. Inside `formGroups`, there are two more HTML elements: `<label>` and `<input>`, as shown below.

```html
<!-- form body -->
<div class="formBody">
  <!-- Firstname and Lastname -->
  <div class="horizontalGroup">
    <div class="formGroup left">
      <label for="firstname" class="labelTitle">First name *</label>
      <input
        type="text"
        id="firstname"
        class="formInput"
        placeholder="enter your first name"
        required="required"
      />
    </div>
    <div class="formGroup right">
      <label for="lastname" class="labelTitle">Last name</label>
      <input
        type="text"
        id="lastname"
        class="formInput"
        placeholder="enter your last name"
      />
    </div>
  </div>
  <div></div>
</div>
```

Afterwards we add the CSS styling for the First name and last name `horizontalGroup`.

```css
/*---------------------------------------*/
/* Form Body */
/*--------------------------------------*/
.formBody {
  padding: 10px 40px;
  color: #666;
}

.formGroup {
  margin-bottom: 20px;
}

.formBody .labelTitle {
  color: #1bba93;
  font-size: 17px;
  font-weight: bold;
}

.formBody .formInput {
  font-size: 17px;
  box-sizing: border-box;
  width: 100%;
  height: 34px;
  padding-left: 10px;
  padding-right: 10px;
  color: #333333;
  text-align: left;
  border: 1px solid #d6d6d6;
  border-radius: 4px;
  background: white;
  outline: none;
}

.horizontalGroup .left {
  float: left;
  width: 49%;
}

.horizontalGroup .right {
  float: right;
  width: 49%;
}

input[type="file"] {
  outline: none;
  cursor: pointer;
  font-size: 17px;
}

#range-label {
  width: 15%;
  padding: 5px;
  background-color: #1bba93;
  color: white;
  border-radius: 5px;
  font-size: 17px;
  position: relative;
  top: -8px;
}

::-webkit-input-placeholder {
  color: #d9d9d9;
}

/*---------------------------------------*/
/* Form Footer */
/*---------------------------------------*/

.formFooter {
  clear: both;
}
```

At this point, you should be able to see the styles applied to the page after reloading.

#### Creating the form body [Email and Password]

In HTML, the email address will be a distinct block, and the Password and Confirm Password will be the equivalent of the first name and last name. After the end tags of the first name and last name, insert the following code; `horizontalGroup` but contained within the `formBody` wrapper.

```html
<!-- Email -->
<div class="formGroup">
  <label for="email" class="labelTitle">Email*</label>
  <input
    type="email"
    id="email"
    class="formInput"
    placeholder="enter your email"
    required="required"
  />
</div>

<!-- Password and confirm password -->
<div class="horizontalGroup">
  <div class="formgGroup left">
    <label for="password" class="labelTitle">Password *</label>
    <input
      type="password"
      id="password"
      class="formInput"
      placeholder="enter your password"
      required="required"
    />
  </div>
  <div class="formGroup right">
    <label for="confirmPassword" class="labelTitle">Confirm Password *</label>
    <input
      type="password"
      class="formInput"
      id="confirm-password"
      placeholder="enter your password again"
      required="required"
    />
  </div>
</div>
```

Here we don't need to add any additional style to the above code because we are using the same CSS classes.

#### Creating the Form Footer

In our form, the footer will consist of a submit button in `formFooter`.

```html
<!-- form-footer -->
<div class="formFooter">
  <button type="submit" class="btn">Create</button>
</div>
```

Now we will add  CSS styling for `FormFooter`.

```css
/*---------------------------------------*/
/* Form Footer */
/*---------------------------------------*/
.signupForm .formFooter {
  background-color: #eff0f1;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  padding: 10px 40px;
  text-align: right;
  border-top: 1px solid #cccccc;
  clear: both;
}

.formFooter span {
  float: left;
  margin-top: 10px;
  color: #999;
  font-style: italic;
  font-weight: thin;
}

.btn {
  display: inline-block;
  padding: 10px 20px;
  background-color: #1bba93;
  font-size: 17px;
  border: none;
  border-radius: 5px;
  color: #bcf5e7;
  cursor: pointer;
}

.btn:hover {
  background-color: #169c7b;
  color: white;
}
```

With the blocks of code above, our form will now look like this one below:

![Hurray we created the form!](/engineering-education/creating-a-responsive-html-registration-form/final-form.png)

Our next task is adding responsiveness to our form.

#### Adding responsiveness to the Form

Responsiveness is part of CSS. Don’t worry we won’t do heavy coding for it.

At first, we need to know what is responsiveness?

Responsiveness is a way to make your form, website, or application adjustable and perfect view on any screen. The screen may be of any device like laptop, mobile phone or a tablet.

For making the form responsive we will use a media query. On the screens that are 680px or less, we need to set the width of our form according to the screen.

```css
@media screen and (max-width: 680px)
{
 .signupForm{
   width: 450px;
}
```

Hurray! You have successfully learned how to make a responsive HTML registration form.

### Conclusion
Finally, we have created our registration form in just few simple steps. We have also made it responsive. Our webpage visitors who use mobile phones will be able to view it whole without any problem!

I hope you find this tutorial helpful! 

---
Peer Review Contributions by: [Monica Masae](/engineering-education/authors/monica-masae/)