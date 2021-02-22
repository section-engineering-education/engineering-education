
Cascading Style Sheet (CSS) is an independent language used to describe the presentation of web applications.
As in any other language, one needs to understand the various concepts of the language.
This article will cover the CSS pseudo-classes and pseudo-elements concepts using practical examples.

### Prerequisites
This article focuses on the concepts of pseudo-classes and pseudo-elements, a basic understanding of other HTML and CSS concepts is useful. Check the introduction to [CSS](https://www.w3schools.com/css/css_intro.asp) and [HTML](https://www.w3schools.com/html/default.asp) topics.

### The CSS Pseudo Classes
A pseudo-class is a CSS property that styles an element based on a change to its state.
A pseudo-class targets HTML elements that cannot be targeted by combinators or other selectors such as id and/or classes. This selector is used to define a special state of an element. An example is when a user hovers the mouse over an element in a web page, or an input element gets a focus state.
The syntax of pseudo-class looks like:
```CSS
selector:pseudo-class{
    property:  value;
}
```
Pseudo-classes are preceded by a colon (:) placed just after a CSS selector and then the name of the pseudo-class. It is important to note that the pseudo-classes are not case sensitive.

### Types of CSS Pseudo Classes
Having understood what a pseudo-class is and its structure. This section covers the common types of CSS pseudo-classes.
First, we will go through the pseudo-classes for the anchor tags `<a>`. These pseudo-classes only apply to elements containing the `<a>` tag and the `href=" "` attribute.
The anchor pseudo-class selectors include:

- The `: link` pseudo-class selects all unvisited links. An example to make all unvisited links on a web page grey is like:
  ```CSS
  a:link{
    color: grey;
    }
    ```

- The `: visited` pseudo-class selects and matches all the visited links. An example in the CSS code:
```CSS
   a: visited{
     color: blue;
     }
```

- The `: hover` pseudo-class selects a link when the mouse cursor is over a certain link. This link is said to be in its hover state. For example, to change a color of a hovered link to cyan:
  ```CSS
   a:hover{
     color: cyan;
   }
   ```

- The `: active` pseudo-class matches an element that is activated by the user by clicking a link on the web page. For example:
  
  ```CSS
   a:active{
     color: green;
   }
   ```
> Note that the `: hover` should come after the `: link` and `: visited` pseudo-classes in CSS definition to be effective.

Other common CSS pseudo-classes include:

- The `:root` selects the highest-level parent of a given document's like the `<html>` element. In the current HTML specification, the `:root` is equivalent to the html selector. For example:

  ```CSS
  :root{
  background: blue;
  }
  ```
This is still equivalent to:
```CSS
html{
  background: blue;
}
```
> Note: The CSS pseudo-class selectors specifity is higher than other DOM CSS selectors. Therefore, the `:root` pseudo-class will have a higher specifity over the `html` selector. In the example below, the background color is blue despite the html selector coming before the `:root` selector:
 ```CSS
 :root {
  background-color: blue;
  color: white;
}
```
 ```CSS 
 html {
  background-color: red;
  color: white;
}
 ```

- The`:focus` pseudo-class will select all the input elements that have the focus state active. Such as checkbox or radio elements.

- The `:focus-within pseudo-class selects an element with focus and also the descendant's elements with that focus.

- Using the `: enabled` pseudo-class selects every element that is in its enabled state.

-  The `: disabled` pseudo-class selects every disabled element.

-  Using the `: checked` pseudo-class matches every checked element such as a radio button or checkbox.

-  Using the `: not` performs a negation of the pseudo-classes. Example `: not(p)` `: not(: hover)` selects every element that is not a `<p>` element and all the other links that will not be in the hover state.

-  The `:first-child pseudo-class selects and matches the first element within its parent element.

- `:last-child selects the element which is last among its siblings in the parent element.

- `:nth-child()` match elements from a list of siblings. We apply a formula of an+b to match the siblings. For example, 2n+1 would match elements 1,3,5,7, etc to give an odd outcome.

Check out other CSS pseudo-classes available in detail [here](https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Selectors/Pseudo-classes_and_pseudo-elements).

### The CSS Pseudo Elements

A CSS pseudo-element is a keyword added to a selector that lets you style a specific part of that selected element.
I like to think of pseudo-elements like virtual elements that we can treat as regular HTML elements. The thing is that they do not exist in the DOM. We do not type the pseudo-elements in HTML, but rather create them with CSS.

The structure of a pseudo-element in CSS is like:
```CSS
selector::pseudo-element-name{
  property:value;
}
```
The pseudo-elements selectors allow us to create items that do not normally exist in the document tree. In CSS3, to distinguish pseudo-elements from pseudo-classes, you need to use two colons (::).

### The Common Types of CSS Pseudo Elements
The common types of pseudo-elements include:
- The `:: before` pseudo-element inserts content specified in the `content` property before every element. This enables us to add content before a certain element like:
```HTML
<p>This is a paragraph</p>
```
```CSS
p::after{
  content:"Hey";
  color:green;
}
```

- `::after` matches a stylable element appearing after the originating element's actual content. Here is an example:
```HTML
  <p>This is a paragraph</p>
```
```CSS
p::before{
content:"well";
color:green;
}
```

- The `::first-letter` pseudo-element matches the first letter of the containing element. An example using `<p>` tag is like:
  ```HTML
  <p> The very first letter in this line will have a 22px font size and a red color.</p>
  ```
  ```CSS
  p::first-letter{
    font-size: 22px;
    color: color;
  }
  ```
- The `::first-line pseudo-element selects the first line of every element. Here is an example using a `<p>` tag element:
  ```HTML
  <p>
    This is the first line. I want it blue in color. Let us keep learning CSS.
    There is more to it than meets the eye.
  </p>
  ```
Using the `::first-line` pseudo-element in the CSS will make this `<p>` tag first line have a blue color:
  ```CSS
  p::first-line{
    color: blue;
  }
  ```

- The `:: selection` pseudo-class selects the portion of the text of an element that the user selects by either clicking and dragging the mouse across the text in a web page. Example:
  ```HTML
  <p>
    This text has a black background and a red color when a user selects it.
  </p>
  ```
  The CSS to apply selection will be:
  ```CSS
  p::selection{
    background: black;
    color: red;
  }
  ```
- The `::placeholder` pseudo-element can be used to grab the placeholder in the `<input type="text" placeholde="Your Username">` tag element. For example, to make the color of a placeholder in the input element red:

  ```HTML
  <input type="text" placeholder="Your Username">
  ```

  ```CSS
  input::placeholder{
    color: red;
  }
  ```

- The `::-webkit-scrollbar` lets you customize the scrollbar on any scrollable element. An example of this in CSS:

  ```CSS
  body::-webkit-scrollbar{
    width: 10px;
  }
  body::-webkit-scrollbar-track{
    background-color: grey;
  }
  body::-webkit-scrollbar-thumb{
    background-color: yellow;
  }
  ```
Check out all the Pseudo-elements available and the browser compatibility in the [MDN](https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Selectors/Pseudo-classes_and_pseudo-elements) documentation.

### Conclusion
CSS plays a crucial part in frontend web development. With concepts such as pseudo-elements and pseudo-classes, web developers now have more exciting options for styling web pages. The question of which pseudo-class or element to use depends on what you want to achieve. If used wisely, the=end result is a cleaner semantic style.
