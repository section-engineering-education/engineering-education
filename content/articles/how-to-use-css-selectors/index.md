 In [CSS](https://developer.mozilla.org/en-US/docs/Web/CSS), one of the most important parts is the `CSS selectors. They let you style specific [HTML](https://html.com/) elements on your website differently.
 If you want to create amazing elements then you need to understand the CSS selectors and what you can do with them. Before moving on to advanced CSS selectors, it's always advisable that the reader should first learn the basic CSS selectors.

This article will cover both. By the end, you will be able to use CSS selectors to create your incredible elements.
### Getting Started
Lets start by defining CSS Selector.
### CSS Selectors
The first portion of a CSS Rule is a CSS selector. It is a set of elements and words that instructs the browser which HTML elements to use when applying CSS property values.

CSS selectors are divided into two key categories `Basic` and `advanced`.

In the `Basic` category we have `Simple` selectors. They include:
- CSS id 
- CSS class selector
- Universal selector 

In `Advanced` we have the following selectors:
- Combination selectors
- Pseudo class-selectors
- CSS Pseudo-elements

### Basic CSS Selectors
To understand something better, you have to start with the basic part. These parts are the foundation of what you will learn later. Let us start by looking at the basic selectors before we move on to advanced.
### CSS type selector
CSS type selectors choose HTML elements based on their names. Examples of CSS types are, `P` and `h1`.Type selectors are used to select all HTML components that have the name you specify.

Let's look at the example below.
```html
<html>
    <body>
        <style>
            /* selecting all h6 elements */
            h6{
                color: red;
                font: bond;
            }
              /* selecting all p elements */
            p{
                text-aligh: center;
                background-color: blue;
            }
        </style>
    </body>
</html>
```
In the above example, we have selected all the elements that are of type `h6` and `p` and applied styles to them.
 your code is clean and simple as you apply the styling by selecting an element once to represent all other similar elements.
### CSS id selector
The id selector chooses HTML elements with the same id property as the selector. Different element have unique id. Therefore the styling of the selected element will differ from any other.
 
 The syntax for id selector is;
 ```
 #id-name{
      property: value;
 } 
 ```
 To understand better let's look at the example below.
```html
<html>
    <body>
        <style>
             #contacts{
            background-color: yellow;
            color: green;
        }
        #about{
            background-color: black;
            color: green;
            }
        </style>
    </body>
</html>
```
From the above code snippet, we have selected two different HTML elements and applied different styles to them. I.e, the id `#contacts` has different background color from that of id`#about`.
### CSS class selector
The function of this selector is to apply styles to all HTML elements with the same class name.
The `.` character is used to select an element with a specific class followed by the `class-name`. I.e `.class-name`

This selector is very useful in styling multiple elements like cards, images that require the same styling in some cases.

Example of Class selector in code form.
```html
<html>
    <body>
        <style>
            .card{
                text-align: center;
                color: white;
            }
        </style>        
     </body>   
</html>
```
In the above code snippet, we have selected all elements with the class name `card` and applied styles to them. These elements will have `color white` and all will be at the `center` of the page.
### CSS Universal selector
As their name sounds, these selectors select `all` the HTML elements. Every element on your page from the heading to the footer will have the same styling.

The syntax for `Universal Indicator` is the  `*`(star). Below is an example to illustrate the univerasl Indicator.
```html
<html>
    <body>
        <style>
            /* selecting all the elements */
             *{ 
                 padding: 10px;
                 margin: 20px;
             }
        </style>
    </body>
</html>
```
By use of the Universal indicator, the above code snipped has zeroed out the `padding`and`margin` by `10px`and`20px` respectively.
### How are CSS Selectors Grouped?😕
Sometimes developers want to group different elements and apply similar styles to them. This saves on time and also makes your code clean and any other developer can easily follow. However, this can be a challenge if you don't know how to go about it.

In this section we will look on how to group CSS selectors and then progress to advanced selectors. The code snippet below will be our explanation reference. Let's have a loot at it.
```html
<html>
    <body>
        <style>
            p{
                background-color: red;
                font: large;
                text-align: center;
                color: blue;
            }
            h5{
                background-color: red;
                font: large;
                text-align: center;
                color: blue;
            }
            h6{
                background-color: red;
                font: large;
                text-align: center;
                color: blue;
            }
        </style>
    </body>
</html>
```
From the above code snippet, we gave three different elements, `p`,`h5`and`h6`same stlyling. This is repetition and time wastage😒 . To avoid this, we group the selectors by use of `,` character to separate each element as shown below.
```html
<html>
    <body>
        <style>
            p,h6,h5{
                background-color: red;
                font: large;
                text-align: center;
                color: blue;
            }
        </style>
    </body>
</html>
```
From the above, We have written the styles for different elements once because their definitions are the same. That saves time. Does it?😄

 We can also add different definitions on each element  despite grouping them together.
```html
<html>
    <body>
        <style>
            /*group the selectors and state definitions that are the same*/
            p,h5,h6{
                background-color: red;
                font: large;
                text-align: center;
            }
            /*apply individual styles(eg  color: black;) to selector p*/
            p{
                color: black;
            }
             /*apply individual styles(eg  padding: 10px;) to selector h5*/
            h5{
                padding: 10px;
                color: yellow;
            }
             /*apply individual styles(eg  color: black;) to selector h6*/
            h6{
                color: white;                
            }
        </style>
    </body>
</html>
```
I hope `Basic selectors` are clear.🥳 Let's move on to `Advanced selectors`.
### Advanced CSS Selectors
To have more knowledge on CSS selectors, we need to deep further into `Advanced CSS Selectors`

Advanced CSS allows you to do more than what basic selectors can do. They allow you to push beyond the boundaries of CSS.

Let's look at some of the advanced CSS selectors. Combination selectors
### Combination selectors
A combinator is a term used to describe the relationship between selectors. These selectors combine more than two CSS selectors. They are four different types of CSS combination Selectors.
1. Descendant selectors
2. Child selectors
3. Adjacent sibling selectors
4. General sibling selectors 
 ###  Descendant selectors
In this type of selector, all elements that are under a specified elemets are matched.
 
Syntax for Descendant selectors is as shown below:
```html
selector1 selector2 {
  /* property declarations */
}
```
To explain this more, lets look at the example below.
```html
<html>
    <body>
        <ul>
            <li> 
                 <li>Item 1</li>
                <ol> 
                    <li>Item 2</li>
                    <li>Item 3</li>
                    <li>Item 4</li>
                </ol>
            </li>
        </ul>
    </body>
</html>
```
```css
<style>
ul,ol{
    font: large;
}
</style>
```
The above code snippet selects all `ol` elements inside of ul elements.
### Child combination selector

It's in the middle of two CSS selectors. It only selects the element that is the direct child of the specified element

To denote a child selector we use `>` character

Let's look at the example below.
```html
<html>
    <body>
        <div>
            <p> Hello World!</p>
             <title>
                <h1>My website</h1>
             </title>
        </div>
    </body>
</html>
```
Let's style the above HTML Code snippet.
```css
div > h1 {
    color: blue;
}
```
From the above HTML snippet, this element(`div`) will only find the `p` element but not `h1`. This is because the `h1`tag is not directly child of the `div` tag
###  Adjacent sibling selectors
These types of selectors select one element that immediately follows another.

It is denoted by the `+` (plus) character.

Below is an example to demonstrate `adjacent sibling selectors`
```css
div + p {
    font-size: 50px;
    color: white;
    font-style: large;
}
```
Any `p` element that follows the element div will have the above style definitions.
### General sibling combination selector
General sibling combination selector select `any` element that is a sibling of a specified element. They are denoted by `~` character. 

Example.
```CSS
title ~ h1 {
    color: blue;
}
```
From the above example, all the `h1` elements that are siblings of the `title` elements will be selected and styled with the color blue.
### Pseudo-selectors
They are divided into two categories:
- [Pseudo class-selectors](https://developer.mozilla.org/en-US/docs/Web/CSS/Pseudo-classes) - They are used to define the states of an element. For example, they can be used to:
    1. Style an element when a user mouses over it
    2. Style visited and unvisited links differently
- [CSS Pseudo-elements](https://peterlunch.com/css-pseudo-elements/) - Styles a specific part of an element. They can be used to:
   1. Style the first letter, or line, of an element
   2. Insert content before, or after, the content of an element

Example of a Pseudo class-selectors.
```CSS
/* mouse over link */
a:hover {
  color: hotpink;
}
/* unvisited link */
a:link {
  color: yellow;
}

/* visited link */
a:visited {
  color: purple;
}
```
When the user moves the mouse over the link, the color of the link changes to hotpink. `visited` and `unvisited` links are each style with a different color.

Example of a CSS Pseudo-elements.
```HTML
   <html>
       <body>
           <p>The first letter has a yellow color. I.e `T`. The first line has color red.</p>
       </body>
   </html>
```
Let's style the above Html code snippet.
```CSS
<style>
p::first-letter {
  color: yellowgreen;
  font-size: large;
}
p::first-line {
  color: red;
}
</style>
```
The first letter, I.e `T` will have the color `yellow-green, and its font size will be `large`.

The first line in the above sentence (The first letter has a yellow color. I.e `T`) will have the color red.
### Wrap UP!
Congrats🥳. You can now apply the knowledge of CSS Selectors to style Your Web Page in different ways depending on your taste.

I hope this article is enjoyable to read and I believe that your knowledge of CSS has greatly increased.

