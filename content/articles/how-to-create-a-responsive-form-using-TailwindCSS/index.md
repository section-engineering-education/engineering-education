---
layout: engineering-education
status: publish
published: true
url: /how-to-create-a-responsive-form-using-tailwindcss/
title: How to create a Responsive Form using Tailwind CSS
description: In this article we will create a simple html form that is styled by tailwind css. Tailwind css is a new css framework that focusses on a utility first approach.
author: monica-masae
date: 2021-03-25T00:00:00-18:00
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/how-to-create-a-responsive-form-using-tailwindcss/hero.jpg
    alt: Tailwind image example
---
Tailwind CSS is one of the most popular frameworks used to build custom user interfaces for web applications. It is different from other CSS frameworks because of its utility-first approach. When building websites, we write the structure in a HTML file then implement the styles in a CSS file. 
<!--more-->
Thanks to the new CSS framework Tailwind, we can now add styles directly into our HTML file. Through this tutorial, we'll be using Tailwind to build a login form from scratch. 

The form will look like this when completed:

![Login form](/engineering-education/how-to-create-a-responsive-form-using-tailwindcss/form.png)

### Adding Tailwind CSS to your project
There are various ways of including Tailwind into your project. The most recommended method is to use a package manager in order to make full use of the configuration possibilities via PostCSS using build tools.

Visit this [link](https://github.com/section-engineering-education/engineering-education/blob/master/articles/introduction-to-tailwind-css/index.md) for the full installation process.

Let's get started on our form!

### Setting up our HTML page
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title> Login Form</title>
    <link 
      rel="stylesheet" 
      href="./css/tailwind.css" />    
  </head>
</html>
```

In our snippet, we gave our page a title `Login Form`. We also added a link to our `tailwind.css` file.

Now add the `<body>` tag and type in the following classes:
```html
 <body class="bg-gray-300" style="font-family:Georgia, 'Times New Roman', Times, serif;">
```

In the snippet above, we added a background color and the font for our form.

Next, add a `<div>` with the following classes to style the header (logo), and the form.

```html
<div class="h-screen flex items-center justify-center">
```

In the `<div>` we have added classes:
- `h-screen` to set the form to 100% height,
- `flex`, `items-center`, and `justify-center` allow us to horizontally and vertically align our form to the center.

### Adding form header and logo  
Let's now add our header and logo.

```html
<form class="w-full md:w-1/3 bg-white rounded-lg items-center">
<div class="flex font-bold justify-center mt-6">
   <img class="h-24 w-24"
      src="./Images/avatar1.png">
</div>
<h2 class="text-3xl text-center text-gray-700 mb-4">Welcome Back!</h2>
```

In the snippet above, the `form` container contains classes;
- `w-full` which sets the form width to 100%,
- `bg-white` which sets the background of our form to white,
- `rounded-lg` which sets the edges of the form to be rounded,
- `md:w-1/3` which sets the minimum width to 33.333%
- `items-center` which aligns our form to the center.
  
Inside the `<div>` our logo is designed as follows:
- `flex` allows items to grow and shrink hence preventing overflow,
- `font-bold` sets our heading to bold,
- `justify-center` aligns the heading and logo to the center,
- `mt-6` sets the top margin to 24px.
  
We then use the `<img>` tag to add and design our logo. The height and the width are both set to 94px (`h-24`, `w-24`).

Our header "Welcome Back!": 
- has a font size of 30px and a line height of 36px - `text 3x1`
- is center aligned - `text-center`
- is gray in color - `text-gray-700`
- has a bottom margin of 16px - `mb-4`

### Adding form input fields
Let's build the input fields and style them!

Our code will look like this:

```html
<div class="px-12 pb-10">
<div class="w-full mb-2">
   <div class="flex justify-center">
      <input type='text' placeholder="Username"
         class="px-8  w-full border rounded py-2 text-gray-700 focus:outline-none items-center" />
   </div>
</div>
<div class="w-full mb-2">
<div class="flex justify-center">   
   <input type='password' placeholder="Password"
      class="px-8 w-full border rounded py-2 text-gray-700 focus:outline-none" />
</div>
```            

So basically, our input fields (Username and password) have the same style.
 - All items are aligned center using `justify-center` and display is flex.   
 - Text is gray in color. (`text-gray-400`).
 - Width is set to 100% (`w-full`) and the bottom margin to 10px (`mb-2`).
 - The borders of both input fields are set to a width of 1px using `border`.
 - The left and right padding are set to 32px using `px-8`, while the top and bottom margin is 8px-`py-2`.
 - Borders are rounded and the border radius set to 4px using class `rounded`.

The input fields are done!

### Adding the button
Now we add a button at the bottom for our users to log in!

Our code should look as follows:

```html
<button type="submit"
   class="w-full mt-6 py-2  rounded bg-blue-500 text-gray-100  focus:outline-none ">Log In</button>
```

- The button will have rounded borders from class `rounded-full`.
- The top and bottom padding to 8px (`py-2`).
- It also has a top margin of 24px (`mt-6`).
- The button also has a blue background color set by `bg-blue-500` and a text color of grey.
- Full width of 100% (`w-full`).
- And, no outline focus (`focus:outline-none`).

### Finishing up
Finally, let's finish our form by adding a link for new users and for users who forgot their passwords!

```html
<a href="#" class="text-sm text-opacity-100 float-right mt-6 mb-4 hover:text-blue-600 underline">Forgot Password?</a>
<a href="#" class="text-sm text-opacity-100 float-left mt-6 mb-8 hover:text-blue-600 underline">Create Account</a>
```

- The links are set to blue on hover (`hover:text-blue-600`).
- The links are underlined (`underline`) with a text size set to small (`text-sm`).
- Both top margins are set to 24px `mt-6`.
  
Our form is done!

Here is our full code:

```html
<!DOCTYPE html>
<html lang="en">
   <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <title> Login Form</title>
      <link 
         rel="stylesheet" 
         href="./css/tailwind.css" />
   </head>
   <body class="bg-gray-300" style="font-family:Roboto">
      <div class="px-12 pb-10">
         <div class="w-full mb-2">
            <div class="flex justify-center">
               <input type='text' placeholder="Username"
                  class="px-8  w-full border rounded py-2 text-gray-700 focus:outline-none items-center" />
            </div>
         </div>
         <div class="w-full mb-2">
            <div class="flex justify-center">   
               <input type='password' placeholder="Password"
                  class="px-8 w-full border rounded py-2 text-gray-700 focus:outline-none" />
            </div>
         </div>
         <div class="w-full mb-2 justify-center">
            <div class="flex items-center">   
               <input type='password' placeholder="Password"
                  class="px-8 w-full border rounded py-2 text-gray-700 focus:outline-none" />
            </div>
         </div>
         <button type="submit"
            class="w-full mt-6 py-2 rounded bg-blue-500 text-gray-100 focus:outline-none">Log In</button>
         <a href="#" class="text-sm text-opacity-100 float-right mt-6 mb-4 hover:text-blue-600 underline">Forgot Password?</a>
         <a href="#" class="text-sm text-opacity-100 float-left mt-6 mb-8 hover:text-blue-600 underline">Create Account</a>
      </div>
      </div>
   </body>
</html>
```

### Conclusion
A log in form is a simple example but serves the purpose since it uses many of the key Tailwind classes. Hopefully this tutorial has shown just how easy and fast custom components can be built using Tailwind.

Happy coding.

---
Peer Review Contributions by: [Peter Kayere](/engineering-education/authors/peter-kayere/)
