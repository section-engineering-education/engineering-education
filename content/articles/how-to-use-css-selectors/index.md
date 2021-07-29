In [CSS](https://developer.mozilla.org/en-US/docs/Web/CSS), one of the most important concepts is the `CSS selectors`. They let you style specific [HTML](https://html.com/) elements on your website differently.

If you want to create amazing elements, then you need to understand CSS selectors and what you can do with them. Before moving on to advanced CSS selectors, the reader should first learn the basic CSS selectors.

By the end of this tutorial, you will be able to use CSS selectors to create incredible elements.

### What are CSS Selectors?
The first portion of a CSS rule is a CSS selector. It is a set of elements and words that instruct the browser on which `HTML` elements to use when applying CSS property values.

CSS selectors are divided into two key categories, `basic` and `advanced`. This tutorial will cover both of them.

The `basic` selectors are the most common and are used to style specific elements on your website

In the `basic` category, we have `simple` selectors such as:
- Type selectors
- CSS id selectors
- CSS class selectors
- Universal selectors

In `Advanced` selectors, we have the following:
- Combination selectors
- Pseudo class-selectors
- CSS Pseudo-elements

### Basic CSS Selectors
To understand something better, we need to start from the basic parts. They are the foundation of what we will learn later. Let's start by looking at the basic selectors.

#### CSS type selectors
CSS type selectors apply to `HTML` elements based on their names. Examples of such selectors are, `P` and `h1`. They are used to select all `HTML` components that have the specified name.

See the example below:
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
                text-align: center;
                background-color: blue;
            }
        </style>
    </body>
</html>
```
In the above example, we have selected and applied styles to all the elements of types `h6` and `p`. The code becomes clean and simple when you apply the styling by selecting a single element to represent all other similar elements.

#### CSS id selector
The id selector applies to `HTML` elements with the same id property as the selector. Each element has a unique id. Therefore, the styling of the selected element differs from one element to the other.
 
 The syntax for id selector is:
 ```css
 #id-name{
      property: value;
 } 
 ```

Let's look at the example below:
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
In the code above, we have selected two different `HTML` elements and applied different styles to them. I.e, the id `#contacts` has different background color from that of id `#about`.

#### CSS class selector
This applies styles to all `HTML` elements with the same class name.

The `.` character is used to select an element with a specific class followed by the `class-name`. I.e `.class-name`. This selector is very useful in styling multiple elements like cards and images that require the same styling.

Example of a Class selector in code form:
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
In the snippet above, we have selected and styled all elements with the class name `card`. These elements will have a `white color` and will be centered on the web page.

#### CSS universal selector
As the name suggests, these selectors apply to `all HTML` elements. Every element from the header to the footer has the same style.

It is denoted by the `*` (asterisk). Below is an example to illustrate universal selector.
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
The above code has zeroed out the `padding` and `margin` by `10px` and `20px` respectively.

### How are CSS selectors grouped?🤔
Sometimes we may want to group different elements to apply similar styles to them. This saves time and makes your code clean and easy for other developers to understand. However, this can be a challenge if you don't know how to go about it.

In this section, we will look at how to group CSS selectors then proceed to advanced selectors. The code snippet below will be our explanation reference.
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
In the snippet above, we have given three different elements, `p`, `h5` and `h6` the same style. This is repetition and time wastage 😒. To avoid this, we can group the selectors using `,` character to separate elements as shown below.
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
In the snippet above, We have composed the styles for different elements once because they have the same definitions. Isn't that great?

We can also add different definitions on each element despite grouping them together.
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
I hope `basic selectors` are clear 🥳. Let's move on to `advanced selectors`.

### Advanced CSS selectors
To gain more knowledge on CSS selectors, we need to deep further into `advanced CSS selectors`.

Advanced CSS allows us to perform more than what basic selectors do. They also allow us to push beyond the boundaries of CSS.

Let's look at some of the advanced CSS selectors.

#### Combination selectors
Combination is a term used to describe the relationship between selectors. These selectors amalgamate two CSS selectors. There are **four types** of CSS combination Selectors.

1. Descendant selectors
2. Child selectors
3. Adjacent sibling selectors
4. General sibling selectors 

#### Descendant selectors
In this type of selector, all elements that fall under a specific element are matched to each other.

The syntax for descendant selectors is as shown below:
```html
selector1 selector2 {
  /* property declarations */
}
```
Let's look at the example below:
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
The code above selects all `ol` elements in the `ul` elements.

#### Child combination selectors

This appears in the middle of two selectors. It only selects direct child elements of the specified element.

To denote a child selector, we use `>` character.

Let's look at the example below:
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
Styling the above `HTML` code.
```css
div > h1 {
    color: blue;
}
```
In the snippet above, the element (`div`) will only find `p` element, not `h1`. This is because the `h1` tag is not a direct child of the `div` tag.

#### Adjacent sibling selectors
These types of selectors select one element that immediately follows the other.

They are denoted by the `+` (plus) character.

Below is an example to demonstrate `adjacent sibling selectors`.
```css
div + p {
    font-size: 50px;
    color: white;
    font-style: large;
}
```
Any `p` element that follows the div element will have the above style definitions.

#### General sibling combination selector
These types of selectors select `any` element that is a sibling of a specified element. They are denoted by the `~` (tilde) character. 

Example:
```css
title ~ h1 {
    color: blue;
}
```
In this example, all `h1` elements that are siblings of the `title` element will be selected and styled with a blue color.

#### Pseudo-selectors
They are divided into **two** categories:

1. [Pseudo class-selectors](https://developer.mozilla.org/en-US/docs/Web/CSS/Pseudo-classes) - They are used to define the states of an element. For example, they can be used to:
- Style an element when a user hovers over it.
- Differently style visited and unvisited links.

2. [CSS Pseudo-elements](https://peterlunch.com/css-pseudo-elements/) - Styles a specific part of an element. They can be used to:
- Style the first letter or line of an element.
- Insert content before or after the content of an element.

Example of a Pseudo class-selectors:
```css
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
When the user hovers over the link, its color changes to hot-pink. `Visited` and `unvisited` links are styled with different colors.

Example of a CSS Pseudo-elements:
```html
 <html>
     <body>
         <p>The first character has a yellow color. I.e `T`. The first line has color red.</p>
     </body>
 </html>
```

Let's style the above HTML code.
```css
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
The first letter, I.e `T` will have a `yellow-green` color, and its font size will be `large`.

The first line in the above sentence will have a red color.

### Wrap up!
Congrats 🥳. You can now apply the knowledge of CSS selectors to style your Web pages in different ways depending on your taste.

For further reading, please visit the links below:
- [Advanced CSS course](https://www.udemy.com/course/advanced-css-and-sass/).
- [CSS Selectors official docs](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors).

Happy coding! 💪
