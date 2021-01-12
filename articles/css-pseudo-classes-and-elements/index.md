
Cascading Style Sheets (CSS) is an independent language commonly used to describe the presentation of web applications.
In this article, you will be introduced to a CSS concept known as pseudo-classes and pseudo-elements using practical examples. Let us now dive into this concepts.

### Prerequisites
This article focuses on the concepts of the pseudo-classes and pseudo elements. You will therefore need a basic understanding of other HTML and CSS concepts. Check the introduction to CSS and HTML topics.
We will be creating a simple web page to demonstate these two concepts. Therefore, you need a text editor such as [VS Code]() and a browser like [Google Chrome]().

### The CSS Pseudo Classes
A pseudo-class is a CSS property that will style an element based on a change to its state. 
A pseudo-class will target HTML elements that can’t be targeted with combinators or other selectors like id or classes. This selector is used to define a special state of an element like when a user mouses over an element in a web page or an element gets a focus state.
The syntax of pseudo-class looks like:
```CSS
selector:pseudo-class{
    property:  value;
}
```
Pseudo classes are preceded by a colon (:) placed just after a CSS selector and then followed by the name of the pseudo-class. It is important to note that the pseudo-classes are not case sensitive.

### Types of CSS Pseudo Classes
Having understood what a pseudo-class is and its structure, I will introduce you to the common types of CSS pseudo classes.
First, we will go through the pseudo-classes for the anchor or the `<a>` tags. These pseudo-classes will only apply to elements in the HTML that contains `<a>` tag and the `href=""` attribute. They include:

- The `:link` pseudo-class will match and select all unvisited. An example to make all unvisited links on a web page grey is like:
  ```CSS
  a:link{
    color: grey;
    }
    ```

- The `:visited` pseudo-class will match and select all the visited links. An example in the CSS code will look like:
```CSS
   a:visited{
     color: blue;
     }
```

- The `:hover` pseudo-class will apply when the mouse cursor is over a certain link, the link is in its hover state and therefore will be selected. For example, to change a color of a hovered link, the CSS code can be:
  ```CSS
   a:hover{
     color: cyan;
   }
   ```

- The `:active` pseudo-class will be matched when the user activates an element by clicking the links on the web page. An example is like:
  ```CSS
   a:active{
     color: green;
   }
   ```
> Note that the `:hover` should come after the `:link` and `:visited` pseudo-classes in CSS definition.

Other common CSS pseudo-classes include:

- The `:root` that selects the document's root element specifically the `<html>` element.
  
- The`:focus` pseudo-class will select all the input elements that have the focus state active. Such as checkbox or radio elements.
  
- The `focus-within` will match an element with focus and also the descendants elements with that focus.

- Using the `:enabled` pseudo-class will match an element that is in an enabled state.
  
-  The `:disabled` selects every disabled element.

-  Using the `:checked` pseudo-class will select every checked element such as a radio button or checkbox.

-  Using the `:not` performs a negation of the pseudo-classes . Example `:not(p)` `:not(:hover)` selects every element that is not a `<p>` element and all the other links that will not be hovered. 

-  The `:first child` pseudo-class will match the first element within its parent element. 

- `:last-child` selects the element which is last among its siblings in the parent element.

- `:nth-child()` match elements from a list of siblings. The siblings are matched by a formula of the form an+b. For example, 2n+1 would match elements 1,3,5,7 etc to give an odd outcome.

Check out other CSS pseudo-classes available in detail [here]().

### The CSS Pseudo Elements

A CSS pseudo-element is a keyword added to a selector that lets you style a specific part of that selected element.
I like to think of pseudo-elements like virtual elements that we can treat as regular HTML elements. The thing is that they do not exist in the DOM. We do not actually type the pseudo-elements in HTML, but rather create them with CSS.

The structure of a pseudo-element in CSS is like:
```CSS
selector::pseudo-element-name{
  property:value;
}
```
The pseudo-elements, will therefore allow us to create items that do not normally exist in the document tree, for example `::after` and `::before`. In CSS3, to distinguish pseudo-elements from pseudo-classes, you neet to use two colons (::).

### The Common Types of CSS Pseudo Elements
The common types of pseudo-elements include:
- The `::before` will insert content before every element. This enables us to add content before a certain element like:
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

- `::first-letter` will match the first letter of the containing element. An example using `<p>` tag is like:
  ```HTML
  <p> The very first letter in this line will have a 22px font size and a red color.</p>
  ```
  ```CSS
  p::first-letter{
    font-size: 22px;
    color: color;
  }
  ```
- `::first-line` selects the first line of every element. Here is an example using a `<p>` tag element:
  ```HTML
  <p>
    the first line is here and I want it blue in color. Let us keep learning CSS.
    Their is more to it than meets the eye.
  </p>
  ```
Using the `::first-line` pseudo-element in the CSS will make this `<p>` tag first line have a blue color:
  ```CSS
  p::first-line{
    color: blue;
  }
  ```

- The `::selection` pseudo-class will select the portion of text of an element that the user selects. Example:
  ```HTML
  <p>
    This text will have a black background and a red color when user selects it.
  </p>
  ```
  The CSS to apply selection will be:
  ```CSS
  p::selection{
    background: black;
    color: red;
  }
  ```
- The `::placeholder` pseudo-element can be used to grab the placeholder in the `<input type="text" placeholde="Your Username">` tag element. This example below will make the color of the input element's placeholder color red.
  
  ```HTML
  <input type="text" placeholder="Your Username">
  ```

  ```CSS
  input::placeholder{
    color: red;
  }
  ```

- The `::-webkit-scrollbar` will let you customize the scrollbar on scrollable elements. An example of this in CSS will look like:

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
Checkout all the Pseudo-elements available and the browser compatibility in the [MDNdocs].

### Conclusion
CSS plays a crucial part in frontend web development. With concepts such as pseudo-elements and pseudo-classes, web developers now have more exciting options for styling web pages. The question on which pseudo-class or element to use depends on what you want to achieve. If used wisely, these concepts will bring a cleaner semantic styles. I appreciate your time reading the article.