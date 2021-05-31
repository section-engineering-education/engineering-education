# GETTING STARTED WITH CSS

CSS is an abbreviation for cascading style sheets. It is a  language used to style the display of a document written in a markup language like HTML. Alongside HTML and JavaScript, CSS is a foundational technology of the worldwide web.
## Functions of CSS
CSS helps developers change the presentation of web pages and make them responsive to different types of gadgets. It also helps them apply elements like lists and headings consistently throughout the site pages.

In this article I will explain how to select elements using different styles, doing various manipulations to the elements selected, changing the font and width of an element , and lastly, using CSS to style HTML.
## 1.Selecting Elements
### Using the Element's Name
Developers can select the element uing an element using it's tag for example `p`,`h2`,`h1` etc as I have shown in the example below.
```html
<style>
   p{}
</style>
```
`p` in this case is the selector. It targets all paragraphs in the HTML document.

### Using a Class Name
To use an element's class as a selector ,you need to put a full-stop before the class name in a style block for example `.red-text`followed by a declaration block `{}` as shown below.
```html
<style>
   .red-text{}
</style>
```


### Using an Id Selector
To use an element's id as a selector you prepend it with the `#` character followed by the element's Id. Id attributes are only applicable to one element. An Id attribute is more specific when compared to a class declaration, therefore, prioritized if they collide. You can read [more about specificity on CSS tricks](https://css-tricks.com/specifics-on-css-specificity/). An example of an Id selector is like`#Properties-of-CSS`. It can be set in HTML like this;
```html
<h2 id= "Properties-of-CSS">
 ```
 You can then select an element by id like so:
 ```html
 <style>
  #Properties-of-CSS{}
 </style>
 ```

### Using Inline Styles
Although discouraged, you can add styling to elements using inline styles. In the example below, we set the color of the `h2` element to red using inline styles. We achieve this by using the `style` attribute.
```html
<h2 style=" color: red;">Properties of CSS </h2>
```

## 2.Different ways  to Manipulate coLors in CSS
### Using Names of Colors
With CSS you can change the text. To do this you need to target the element whose text you need to modify with the appropriate selector. You then use the `color`attribute to specify the color you desire for your text as shown below. This can either be done in a separate style sheet or in your HTML file by adding the `style`element as I have in the example.
```html
<style>
 h2{
     color: red;
 }
 </style>
 ```
 This will change all the h2 elements to the color red.
 
### Using Hex Codes
Hex is the short name for Hexadecimal code. Hex code uses six hexadecimal numbers to specify colors in CSS. Some Hex values of different colors according to [ComputerHope](https://www.computerhope.com/htmcolor.htm) are;
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
 But since it is hard to remember hex code,one can shorten it. This are examples from [freshersnow](https://tutorials.freshersnow.com/css/css-colors/);
 - black  #000

 - red  #F00

 - cyan  #0FF

### Using RGB colors
RGB stands for red, green, and blue. It is another way of representing colors in CSS. Each value could have a value from between o to 255. A value of 0 means none of the colors was used while a value of 255  means all of that color was used. The color black would result from all values (red, green, and blue) being 0 while the color white would result from all the values being 255.

Here are some of RGB values according to [rapidtables](https://www.rapidtables.com/web/color/RGB_Color.html) are as follows;
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
Let us use RGB values to represent an Id attribute;
```html
       #Properties-of-CSS{
                color: rgb(128, 128, 128);
                }
```

## 3.Changing the Font Size and Font Family of an Element
In order to change the font size of an element,the **font-size** element is introduced like this;
```html
h2{
    font-size: 15px;
}
```
Say for example one wants to change the font size of a paragraph to 17px within the style element it will be like;

 ```html
p{
    font-size: 17px;
}
</style>
```

In order to change the font name of an element,the **font-family** property is introduced like this;
```html
<style>
 p{
     font-family: Helvetica;
 }
</style>
```
## 4.Sizing Images
CSS uses a property known as **width** to manipulate the width of  elements. The use of the width property is shown below:
```html
<style>
 .smaller-image{
     width: 120px;
 }
 </style>
```
This should also be incorporated into your HTML element like this;
```html
<img class= "smaller-image">
```

## 5.Styling HTML Using CSS
  Let us create a HTML element and style it using the few CSS elements we have learned so far;
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
    </body>
    </html>
    ```
    
    
   These are just a few guidelines to get you started with CSS but there is a lot more to learn. A good place to start would be the [webplatform CSS docs](https://webplatform.github.io/docs/css)

### References
   1.[FreecodeCamp](https://www.freecodecamp.org/)

   2.[Wikipedia](https://en.wikipedia.org/wiki/CSS)

   3.[rapidtables](https://www.rapidtables.com/web/color/RGB_Color.html)

