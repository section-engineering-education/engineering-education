# Creating a Responsive HTML Registration form

Good day, readers! In today's tutorial, we will learn how to make a Responsive HTML Registration Form.

Nowadays, HTML Forms may be found on a wide range of websites. All such HTML forms are intended to gather data, feedback, and various information for your website's visitors. Contact forms, Login forms, and registration forms are just a few examples. This tutorial will guide you to make the registration form.

The registration form has multiple input fields (checkboxes, text areas, submit buttons, radio buttons, etc) with varied input details (email address, name, and age, etc) where the visitor must enter in his or her information to register for a certain web page.

By the end of the tutorial, you will be able to make a registration form using only HTML and CSS. Isn’t it good right?

No need to worry if you don’t know the HTML and CSS. Here we will use the basic HTML and CSS which can be understood by everyone.

There are several kinds of the registration form. Here you will get to know how to make a basic responsive HTML registration form. Our HTML form consists of the following elements.
•	First Name / Last Name
•	Username or Email
•	Password / Confirm Password
•	Signup Button
 
**Table of content**  
•	Selecting an HTML editor.
•	Make an HTML file.
•	Creating a form.
•	Creating a structure for form
•	Creating a form header
•	Creating form the body [ First name and Last name}
•	Creating form the body [Email and Password]
•	Creating a footer
•	Adding responsiveness to the form

Excited!! to learn how to make responsive HTML registration form? let’s start learning.

### Selecting an HTML Editor.

To write HTML code, you'll need a text editor, precisely like you'll require a word processor to make a text document. These programs turn the odd code you write into a registration form.

Here in the market, there are dozens (if not a large number) of HTML editors, some of which have identical functionality. We won't drag this with specifying it in more detail, but there are a few essential points to remember:

**Detecting the Error**: Highlight the syntax mistakes automatically to make corrections simpler.

**Complete Automatically**: Based on past modifications, it suggests appropriate HTML components (With lengthy code, this will save you a lot of time).

**Highlights the Syntax**: Uses colours to highlight various HTML elements depending on categories to enable your code simpler to read and organize.

**Replace & Search**: Rather than changing each one manually, locate and overwrite all occurrences of a specific code.

There are more aspects to concern about, but that should be plenty for the basic registration form.

![Editors for HTML](Editors.png)

It is entirely up to you to decide which app to use. Do you want anything to utilize in your browser? probably take a glance at Codepen. Barebones? Notepad++. Does a simple user interface with a simple input field? It's all about Sublime Text.

In this tutorial, we'll be coding with Visual Studio Code.

There’s hardly any need to get too worked up over it. Unfortunately, no HTML editor, no matter how powerful, will build a registration form for you. It's entirely up to you how will you want to go about it.

### Make an HTML File.

Next, inform your text editor that you're going to generate an HTML file. Create a new file and save it with the ".html" extension to do this.

For instance, "myform.html." Once you've informed the editor that you're writing HTML code, it should create the following code for you automatically:

``` html
<!DOCTYPE html>
<html>
<head>          
      <title></title>
</head>
<body> 
    
</body>
</html>
```

**Tip**: Some editors will not autofill. That's OK. Simply copy and paste the code above to get the same result.

### Creating a Form

In any HTML page, the `<form>` element is used to begin a form that could be a contact, registration, or login form. In this tutorial, we are adding a `<form>` element within the `<body>` element.

``` html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title> Responsive HTML Register Form</title>
    <link rel="stylesheet" href="style.css">
  </head>
  <body>
    <form class="signupForm" action="/register" method="post">
    </form>
   </body>
</html>
```

The class, action, and method attributes have been added to the `<form>` start tag.

As you may be aware, selectors in CSS and JavaScript may be used to target an element using class attributes.

When a form is submitted, the action property containing a URL, or any server-side file name tells it to publish the form values to that URL or file name. The method property specifies the HTTP method should be used by the browser when submitting the form.

### Creating a Structure For form

Once the `<form>` element is in place, we use three additional DIVs inside it to represent the `<form>` element's header, body, and footer, as seen in the code below.

``` html
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

### Creating a form Header 

Within the `.formHeader` element, insert an H1 element.

```html
<!-- form header -->
<div class="formHeader">
  <h1>Create Account</h1>
</div>
```
Now we are required to include some CSS code to our CSS file for `formHeader`, as seen below.

``` html
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
At the beginning of the CSS code, we have an import line stating that we are obtaining any preferred font form the Google font collection. You may change the font you're using by going [here](https://fonts.google.com/).

The CSS code above is for the form's header and main form container. Now, you would be able to view the header layout on the browser once you reload at this point.

Let's now add some HTML form components to the inside of one by one, `formBody`.

### Creating Form Body [ First name and Last name]

I'm constructing a div with the class `horizontalGroup` inside `formBody` in the HTML code below. Then, inside `horizontalGroup`, we will create two more DIVs with the same class name `formGroup`. The placement of the `formGroup` on the page is indicated by adding an additional left or right class. Inside `formGroups`, there are 2 more HTML elements: `<label>` and `<input>`, as seen below.

``` html

    <!-- form body -->
    <div class="formBody">

        <!-- Firstname and Lastname -->
        <div class="horizontalGroup">
          <div class="formGroup left">
            <label for="firstname" class="labelTitle">First name *</label>
            <input type="text" id="firstname" class="formInput" placeholder="enter your first name" required="required" />
          </div>
          <div class="formGroup right">
            <label for="lastname" class="labelTitle">Last name</label>
            <input type="text" id="lastname" class="formInput" placeholder="enter your last name" />
          </div>
        </div>
    <div>
```

Now we learn the CSS coding for the First name and last name `horizontalGroup`.

``` html
/*---------------------------------------*/
/* Form Body */
/*--------------------------------------*/
.formBody {
  padding:10px 40px;
  color:#666;
}

.formGroup{
  margin-bottom:20px;
}

.formBody .labelTitle {
  color: #1BBA93;
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


.horizontalGroup .left{
  float:left;
  width:49%;
}

.horizontalGroup .right{
  float:right;
  width:49%;
}

input[type="file"] {
  outline: none;
  cursor:pointer;
  font-size: 17px;
}

#range-label {
  width:15%;
  padding:5px;
  background-color: #1BBA93;
  color:white;
  border-radius: 5px;
  font-size: 17px;
  position: relative;
  top:-8px;
}


::-webkit-input-placeholder  {
  color:#d9d9d9;
}

/*---------------------------------------*/
/* Form Footer */
/*---------------------------------------*/

.formFooter {
 clear:both;
}
```
You should be able to see the styles applied to the page if you reload the page at this point after adding HTML and CSS code to your files.

### Creating Form the Body [Email and Password]
In HTML, the email address will be a distinct block, and the Password and Confirm Password will be the equivalent of the first name and last name. After the end tags of the first name and last name, insert the following code. `horizontalGroup` but contained within the `formBody` wrapper.

```html
    <!-- Email -->
        <div class="formGroup">
          <label for="email" class="labelTitle">Email*</label>
          <input type="email" id="email" class="formInput" placeholder="enter your email" required="required">
        </div>

     <!-- Passwrod and confirm password -->
        <div class="horizontalGroup">
          <div class="formgGroup left">
            <label for="password" class="labelTitle">Password *</label>
            <input type="password" id="password" class="formInput" placeholder="enter your password" required="required">
          </div>
          <div class="formGroup right">
            <label for="confirmPassword" class="labelTitle">Confirm Password *</label>
            <input type="password" class="formInput" id="confirm-password" placeholder="enter your password again" required="required">
          </div>
        </div>
  ```
I don't need to add any additional style to the above code because I'm using the same CSS classes.

### Creating a Form Footer

In our registration form footer consist of submit button in formFooter.

``` html
      <!-- form-footer -->
      <div class="formFooter">
        <button type="submit" class="btn">Create</button>
      </div>
```
Now we will do CSS coding for FormFooter.

```html
/*---------------------------------------*/
/* Form Footer */
/*---------------------------------------*/
.signupForm .formFooter  {
  background-color: #EFF0F1;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  padding:10px 40px;
  text-align: right;
  border-top: 1px solid #cccccc;
  clear:both;
}

.formFooter span {
  float:left;
  margin-top: 10px;
  color:#999;  
  font-style: italic;
  font-weight: thin;
}

.btn {
   display:inline-block;
   padding:10px 20px;
   background-color: #1BBA93;
   font-size:17px;
   border:none;
   border-radius:5px;
   color:#bcf5e7;
   cursor:pointer;
}

.btn:hover {
  background-color: #169c7b;
  color:white;
}
```
Now you can see the final output of the code that you have written. Isn’t it look like the form as shown below, right? 

![Hurry we created the form](FinalForm.PNG)

Wait, we didn’t add the responsiveness yet.

It's time to learn how to add responsiveness to your HTML registration form.

### Adding Responsiveness to the Form

Responsiveness is part of CSS. Don’t worry we won’t do heavy coding for it. Just the basic one.

At first, we need to know what is responsiveness?

Responsiveness is a way to make your form, website, or application adjustable and perfect view on any screen. The screen may be of any device laptop, mobile phone, PC or Mac, etc.

For making the form responsive we will use a media query. On the screens that are 680px or less, we need to set the width of our form accordingly to the screen.

``` html
@media screen and (max-width: 680px) 
{
 .signupForm{
   width: 450px;
}
```
Hurry! You have successfully learned how to make a responsive HTML registration form. 