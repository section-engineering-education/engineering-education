---
layout: engineering-education
status: publish
published: true
url: /getting-started-with-css/
title: Getting Started with CSS
description: In this article we will go over how to select elements using different styles. We will go over how to make various manipulations to the selected elements, changing the font and width of an element, and using CSS to style HTML.  
author: lucy-maina
date: 2021-06-13T00:00:00-11:00
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/getting-started-with-css/hero.jpg
    alt: CSS beginners 
---
In this article I will explain how to select elements using different styles, how to do various manipulations to the elements selected, changing the font and width of an element , and how to use CSS to style HTML.
<!--more-->
CSS is an abbreviation for cascading style sheets. It is a language used to style the display of a document written in a markup language like HTML. Alongside HTML and JavaScript, CSS is a foundational technology of the worldwide web.

### Functions of CSS
CSS helps developers change the presentation of web pages and make them responsive to different types of gadgets. It also helps them apply elements like lists and headings consistently throughout the site pages.

### 1. Selecting elements
### Using the element's name
One way developers can select an element, is by using its tag for example `p`,`h2`,`h1` etc as shown in the example below:

```html
<style>
   p{}
</style>
```

`p` in this case is the selector. It targets all paragraphs in the HTML document.

### Using a class name
To use an element's class as a selector, you need to put a full-stop before the class name in a style block for example `.red-text` followed by a declaration block `{}` as shown below:

```html
<style>
   .red-text{}
</style>
```

### Using an id selector
To use an element's id as a selector you prepend it with the `#` character followed by the element's id. It is important that id attributes are only applicable to one element. 

Ids are also more specific when compared to a class declaration, therefore, it is prioritized if they happen to collide. You can read more about specificity on [CSS tricks here](https://css-tricks.com/specifics-on-css-specificity/). An example of an Id selector is like `#Properties-of-CSS`. 

It can be set in HTML like this:
```html
<h2 id= "Properties-of-CSS">
```
 
You can then select an element by id like so:
 
```html
 <style>
  #Properties-of-CSS{}
 </style>
```

### Using inline styles
Although discouraged, you can add styling to elements using inline styles. In the example below, we set the color of the `h2` element to red using inline styles. We achieve this by adding the `style` attribute to the `h2` tag.

```html
<h2 style=" color: red;">Properties of CSS </h2>
```

### 2. Different ways to manipulate colors in CSS
### Using names of colors
With CSS you can change the color of text. To do this you need to target the element whose text you need to modify with the appropriate selector. 

You then use the `color` attribute to specify the color you desire for your text as shown below. This can either be done in a separate style sheet or in your HTML file by adding the `style` element as I have in the example below.

```html
<style>
 h2{
     color: red;
 }
 </style>
 ```
 
This will change all the h2 elements to the color red.
 
### Using hex codes
Hex is the short name for Hexadecimal code. Hex code uses six hexadecimal numbers to specify colors in CSS. See the Hex values of different colors according to [ComputerHope](https://www.computerhope.com/htmcolor.htm) below:

- black  #000000
- maroon  #800000
- yellow  #FFFF00
- purple  #800080

How to represent color in Hex code is as shown below:

```html
<style>
   p{
   color: #800080;
   }
</style>
```

But since it is hard to remember hex code, one can shorten it. These are examples from [freshersnow](https://tutorials.freshersnow.com/css/css-colors/):
 
- black  #000
- red  #F00
- cyan  #0FF

### Using RGB colors
RGB stands for red, green, and blue. It is another way of representing colors in CSS. Each value could have a value ranging from 0 to 255. 

A value of 0 means none of the colors were used while a value of 255 means all of the color were used. The color black would result from all values (red, green, and blue) being 0 while the color white would result from all the values being 255.

Here are some RGB values according to [rapidtables](https://www.rapidtables.com/web/color/RGB_Color.html):
- black  rgb(0, 0, 0)
- red  rgb(255, 0, 0)
- grey  rgb(128, 128, 128)

How to represent RGB values in CSS is shown below:

```html
<style>
   p{
   color: rgb(128, 128, 128);
   }
</style>
```

Let us use RGB values to represent an Id attribute:

```html
       #Properties-of-CSS{
                color: rgb(128, 128, 128);
                }
```

### 3. Changing the font size and font family of an element
In order to change the font size of an element, we utilize the **font-size** property as shown:

```html
h2{
    font-size: 15px;
}
```

Say for example one wants to change the font size of a paragraph to 17px within the style element it will look like:

```html
p{
    font-size: 17px;
}
</style>
```

In order to change the font name of an element, the **font-family** property is utilized as shown:

```html
<style>
 p{
     font-family: Helvetica;
 }
</style>
```

### 4. Sizing images
CSS uses a property known as **width** to manipulate the width of elements. 

The use of the width property is shown below:

```html
<style>
 .smaller-image{
     width: 120px;
 }
 </style>
```

To make this work the `smaller-image` class should also be incorporated into your HTML element like this:

```html
<img class= "smaller-image">
```

### 5. Styling HTML using CSS
Let us create a HTML element and style it using the few CSS elements we have learned so far:

### Using the id name

```html
<html>
<head>
<h1>Getting Started With CSS</h1>
</head>
<body>
  <style>
 #description {
     color: black;
     background-color: blue;
     font-family: monospace;
     font-size: 16px;
 }
  </style>
  
  <p id="description">This is a description </p>
  
 </body>
 </html>
```

### Using the element's name
```html
 <html>
 <head>
 <h1>Getting started with CSS</h1>
 </head>
 <body>
   <style>
   p {
      background-color: blue ;
      color: black
   }
   </style>
   
   <p id="description">This is a description </p>
   
  </body>
  </html>
```

These are just a few guidelines to get you started with CSS but there is a lot more to learn. A good place to start would be the [webplatform CSS docs](https://webplatform.github.io/docs/css).

Happy coding!

### References
1. [FreecodeCamp](https://www.freecodecamp.org/)
2. [Wikipedia](https://en.wikipedia.org/wiki/CSS)
3. [rapidtables](https://www.rapidtables.com/web/color/RGB_Color.html)

---
Peer Review Contributions by: [Adrian Murage](/engineering-education/authors/adrian-murage/)
