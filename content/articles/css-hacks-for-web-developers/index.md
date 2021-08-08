### Introduction
Despite not being as popular as [JavaScript](https://www.javascript.com/), [CSS](https://en.wikipedia.org/wiki/CSS) is still among the top ten most used technologies according to [Redmonk](https://redmonk.com/sogrady/2020/07/27/language-rankings-6-20/).

CSS is popular among web developers because it is robust, relatively straightforward to learn, and ubiquitous across different browsers.

There are various CSS **hacks** that help developers to write cleaner code, improve design components, and save time.

If you’re new to CSS, I would urge you to go through this [tutorial](https://www.section.io/engineering-education/getting-started-with-css/) before proceeding. However, if you are familiar with fundamental aspects of CSS, let's get started.

### 1. Hover effect delays
In CSS, hovering is the action of placing a mouse on a component, without clicking it. A component can be set to change in appearance on hover. You can further style this by adding a transition element to `delay` the hovering effect.

Despite looking neat, the hovering effect draws the user's attention to the element. 

Below is an example snippet of a hovering effect:

```html
<html>
  <body>
    <h4>My website</h4>
    <p>This is my first website</p>
    <style>
      /*Styles without hovering effect*/
      h4 {
        font-size: 70px;
        color: red;
      }
      p {
        font-size: 60px;
        color: blue;
      }
      /* Styles, with hovering effect */
      h4:hover {
        color: black;
        transition: all 0.5s ease; /*An element for delaying the hovering effect. */*
      }

      p:hover {
        color: yellow;
        transition: all 2s ease;
      }
    </style>
  </body>
</html>
```

In the code snippet above, we have styled elements `h4` and `p` with different hovering effects. `h4`'s color will turn to black when the mouse is placed on it with a delay of 0.5 seconds while `p`'s color will change to yellow, but with a longer delay of 2.0 seconds.

### 2. Centering content both vertically and horizontally
To center content in the screen using CSS, most of the developers have to scratch their heads. According to research, it's not that it's difficult to do that task, it's just that there are many ways of doing it which confuse developers on which to use.

For instance, you can use the styles snippet below to place you content in the center: 
```html
<html>
  <body>
    <div style="border: 1px solid; width: 500px; height: 600px;">
      <p>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eveniet illo
        corporis saepe sunt quidem nesciunt asperiores impedit odit! Enim quam
        voluptatum modi suscipit laboriosam porro fugiat odit molestiae error?
        Dolores.
      </p>
    </div>
    <style>
      div {
        display: flex;
        justify-content: center;
        align-items: center;
      }
    </style>
  </body>
</html>
```
In the snippet above, we have placed the content of element `p` at the center by styling the `div`. Element `p` is a child element of `div`, therefore `p` will take all the styles given to element `div`.

### 3. Scaling down images
Some websites have oversize images which break on developers' site's layout and discourage end-users.

However, using this CSS hack, I can guarantee you that your images will always fit on your end-users screen despite the devices they are using.

To prove this practically, create a folder `hack` in your machine, add an image and rename it to `test.png`(`hack/test.png`), create an `index.html` file in the folder(`hack/index.html`), add the snippet below to the file and open it with your favorite browser.
```html
<html>
  <body>
    <div>
      Lorem ipsum, dolor sit amet consectetur adipisicing elit.
    </div>
    <style>
      div {
        background-image: url('../hack/test.png');
        background-position: center; 
        background-size: cover;
        background-repeat: no-repeat;   /*specifies the  image should not be repeated */
        width: 700px; /*specifies the widths of the border image */
        height: 500px;
      }
    </style>
  </body>
</html>
```
In the snippet above, you will notice that your image will fit within its container.

### 4. Styling visited links
CSS can be used to change the appearance of links before and after a user clicks on them.

The `a: visited` property controls all the links that the visitor has clicked on, the `a: link` controls all links that haven’t been clicked on yet. while the `a: active` link shows a link a moment it is clicked.

Styling these links properly is a great benefit to the users. It builds a user-friendly website as users can navigate through the site easily

Different colors are used for different link as shown in the snippet below:

```css
/* color red represent unvisited link */
a:link {
  color: red;
}

/* color green represent visited link */
a:visited {
  color: green;
}
/*color blue represent selected link */
a:active {
  color: blue
```

### 5. Styling the first letter in a paragraph
The initial letter is a technique of selecting the first letter of a paragraph and specifying the number of lines it holds. It's usually used by print media and information sites, such as news sites. It's a very important technique as it grabs the reader's attention making them read the first line and finally the entire paragraph.

While this style may appear to be dated, you can still design it to appear modern to the end-users.

Let's have a look at the example snippet below:

```html
<html>
  <body>
    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit.</p>
    <style>
       p:first-letter{
       display: grid;
       margin: 7px;
       color: black;
       font-size: 80px;
       float: left;
      }
    </style>
  </body>
</html>
```

### 6. How to group styling in CSS
Styling different HTML elements one by one is very tiresome and time wastage. This problem faced by developers is easily solved by learning how to consolidate CSS style.

To do this, group different elements under the same `class` attribute and style them using the `.class` selector. This selector will select all elements with a specific class attribute and apply styles to them.

This is an advantage to developers because they don't have to write the same line of code numerous times, they save time and reduce the size of their code.

Let's have a look at the example snippet below:

```html
<html>
  <body>
    <div class="title">
      <h4>Why do developer Group elements together when styling?</h4>
      <p>Developers Group elements together to save on time </p>
      <h5>What are advantages Of Consolidating during styling?</h5>
    </div>
    <style>
        /* suppose you want to add a background color, text color, font and center the 3 elements in the middle of the screen */
      .title {
        background-color: black;
        color: white;
        font-size: medium;
        text-align: center;
      }
    </style>
  </body>
</html>
```

### 7. Placing an element’s position using CSS
Developers sometimes want to fix some elements in a certain position to make them remain in that location within the browser viewport. For instance, a developer may want to add a `back-to-top button` to a website, and the only suitable position is at the `bottom-right` of the website.

The code snippet below illustrate how to add a sticky back-to-top button at the bottom right of the website:

```html
<html>
  <body>
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
    />
    <div style="border: 1px solid; width: 410px; height: 230px;">
      <p>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eveniet illo
        corporis saepe sunt quidem nesciunt asperiores impedit odit! Enim quam
        voluptatum modi suscipit laboriosam porro fugiat odit molestiae error?
        Dolores.
        <br />
        <br />
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eveniet illo
        corporis saepe sunt quidem nesciunt asperiores impedit odit! Enim quam
        voluptatum modi suscipit laboriosam porro fugiat odit molestiae error?
        Dolores.
        <br />
        <br />
        <a class="arrowup" href=""><i class="fa fa fa-arrow-up"></i></a>
      </p>
    </div>
    <style>
      i {
        position: fixed;
        right: 920px;
        background-color: blue;
        font-size: medium;
      }
    </style>
  </body>
</html>
```
### Conclussion
In this tutorial, we have covered some important `hacks` that every developer needs to know to design the best web app.

### Further Reading
- [CSS tricks](https://www.creativebloq.com/features/css-tricks-to-revolutionise-your-layouts)

Happy coding!
