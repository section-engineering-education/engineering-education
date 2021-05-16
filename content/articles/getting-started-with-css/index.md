# GETTING STARTED WITH CSS

CSS is an abbreviation for cascading style sheets. It is a  language used to style the display of a document  written in a markup language like HTML. Alongside HTML and JavaScript, CSS is a foundation technology of the worldwide web.
## Functions of CSS
CSS helps developers change the presentation of web pages and make them responsive to different types of gadgets. It also helps them apply elements like lists and headings consistently throughout the site pages.

In this article I will explain how to select elements using different styles,doing various manipulations to the elements selected, changing the font and width of an element and lastly, using CSS to style HTML.
## 1.Selecting Elements
### Using the Elements' Name
Developers can select the element uing the element's tag for example `p`,`h2`,`h1` etc as I have shown in the example below.
```html
<style>
   p{}
</style>
```
`p` is the element's name which stands for paragraph.

### Using a Class Name
A class declaration is done by putting a fullstop before the class name in a style block for example `.red-text`then followed by a declaration block`{}`. Using a class name to select an element will be as shown below.
```html
<style>
   .red-text{}
</style>
```


### Using an Id Selector
An element can be selected with a specific Id by writing a `#` character followed by the element's Id. Id attributes are only applicable to one element. An Id attribute has a higher dominance than a class declaration, therefore, prioritized if they collide.An example of an Id selector is like`#Properties-of-CSS`. It can be set in HTML like this;
```html
<h2 id= "Properties-of-CSS">
 ```
 Using CSS can style Id attributes like this;
 ```html
 <style>
  #Properties-of-CSS{}
 </style>
 ```

### Using Inline Styles
Developers set CSS to a specified HTML element by using the `style` attribute for example;
```html
<h2 style=" color: red;">Properties of CSS </h2>
```

## 2.Doing Various Manipulations to the Elements Selected
### Using Names of Colors
With CSS you can change the text. To do this you need to target the element who's text you need to modify with the appropriate selector. You then use the `color`attribute to specify the color you desire for your text as shown below. This can either be done in a separete style sheet or in your HTML file by adding the `style`element like I have in the example.
```html
<style>
 h2{
     color: red;
 }
 </style>
 ```
 This will change all the h2 elements to the color red.
 
 Although not advisable in practise,you can also use inline styles to achieve the same results as illustrated in the example below
 ```html
 <h2 style="color: red;">Properties of CSS</h2>
 ```
 As pointed out above, a class is declared by adding a fullstop(.) accompanied by the class name in a style block.Then followed by a declaration block({}).Using the name of a color to style the class declaration will be like this;
 ```html
 <style>
   .red-text{
       color: red;
   }
 </style>
 ```
 In this example,.red-text is the class declaration.

Introducing an Id attribute of Properties-of-CSS and giving it  a background color of black will be as shown in the example below.
```html
<style>
 #Properties-of-CSS{
    background-color: black;
 }
</style>
```
### Using Hex Codes
Hex is the short name for Hexadecimal code. Hex code uses six hexadecimal numbers to specify colors in CSS. Some Hex values of different colors according to [Simmons](http://web.simmons.edu/) are;
- black  #000000

- maroon  #800000

- yellow  #FFFF00

- purple  #800080

Representing color in Hex code will be like;
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
RGB stands for red, green and blue. It is another way of representing colors in CSS.Each value could have a value from between o to 100% or 0 to 255. A value of 0 means none of the colors was used while a value of 255 or 100% means all of that color was used. The color black would result from all values (red, green and blue)being 0 while the color white would result from all the values being a 100%. Some of RGB values according to [rapidtables](https://www.rapidtables.com/web/color/RGB_Color.html) are as follows;
- black  rgb(0, 0, 0)

- red  rgb(255, 0, 0)

- grey  rgb(128, 128, 128)

RGB values can be styled in CSS as follows;
```html
<style>
   p{
   color: rgb(128, 128, 128);
   }
</style>
```
Let us use RGB values to represent an Id attribute;
```html
<style>
   #Properties-of-CSS{
                color: rgb(128, 128, 128);
                }
</style>
```



## 3.Changing the Font Size and Font Family of an Element
In order to change the font size of an element,the **font-size** element is introduced like this;
```html
h2{
    font-size: 15px;
}
```
Say for example one wants to change the font-size of a paragraph to 17px within the style element it will be like;

 ```html
p{
    font-size: 17px;
}
</style>
```

In order to change the font name of an element,the **font-name** element is introduced like this;
```html
<style>
 p{
     font-family: Helvetica;
 }
</style>
```
## 4.Sizing Images
CSS uses a property known as **width** to size elements by the help of class declarations such as **.smaller-width** and **.larger-image** like this;
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
  Let us create a HTML element and style it using CSS;
  ```html
  <!DOCTYPE html>
  <html>
  <h1>Getting Started With CSS</h1>
  <style>
   body{
       color: black;
       background-color: blue;
       font-family: monospace;
       font-size: 16px;
   }
   </style>
   </html>
   ```
   
   These are just fe guidelines to get you started with CSS but there is a lot more to learn. You can learn it from here [CSS](https://webplatform.github.io/docs/css)

### References
   1.[FreecodeCamp](https://www.freecodecamp.org/)

   2.[Wikipedia](https://en.wikipedia.org/wiki/CSS)

   3.[rapidtables](https://www.rapidtables.com/web/color/RGB_Color.html)

