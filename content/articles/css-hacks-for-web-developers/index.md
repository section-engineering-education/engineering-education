---
layout: engineering-education
status: publish
published: true
url: /css-hacks-for-web-developers/
title: CSS Hacks for Web Developers
description: In this article, we will be looking at seven of the most important CSS hacks for web developers. Hacks that every developer should know to write cleaner code, improve design components, and save time.
author: moses-wachiuri
date: 2021-08-17T00:00:00-16:00
topics: [Languages]
excerpt_separator: <!--more-->
images:

 - url: /engineering-education/css-hacks-for-web-developers/hero.png
   alt: CSS Image hero
---
Despite not being as popular as [JavaScript](https://www.javascript.com/), [CSS](https://en.wikipedia.org/wiki/CSS) is still among the top ten most used technologies, according to [Redmonk](https://redmonk.com/sogrady/2020/07/27/language-rankings-6-20/).
<!--more-->
CSS is popular among web developers because it is robust, relatively straightforward to learn, and ubiquitous across different browsers.

There are various CSS **hacks** every developer should know to write cleaner code, improve design components, and save time.

If you’re new to CSS, I would urge you to go through this [tutorial](/engineering-education/getting-started-with-css/) before proceeding. However, if you are familiar with fundamental aspects of CSS, let's get started.

### 1. Delaying hover effect using the transition property
In CSS, hovering is the action of placing the mouse pointer on a component, without clicking it. A component can be set to change in appearance on hover. You can further style this by adding a transition property to delay the hovering effect.

Despite looking neat, the hovering effect draws the user's attention to the element. 

Below is an example snippet of a hovering effect:

```html
<html>

<body>
  <h4>I am fast</h4>
  <p>I am slow</p>
  <style>
    /*Initial styles*/
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
      transition: all 0.5s ease;
      /*delaying the hovering effect. */
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

### 2. Centering content both vertically and horizontally using flex
Centering content on the screen seems difficult to some developers. However, it's not that difficult to do, it's just that there are many ways of doing it.

For instance, you can use flex to center content, as shown below.

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

In the snippet above, we have placed the element `p` at the center of its containing div using `div {display: flex}`. `justify-content: center` packs all the elements inside the div around the center. `align-items: center` then centers the alignment for all the element in the div.

### 3. Fitting images to their containers by using them as background
Some websites have oversize images which break on developers' site's layout and discourage end-users.

However, using this CSS hack, your images will always fit on their destined containers without being stretched.

Assuming your image is named `test.png`, you can display it in `#container` as shown below.

```html
<html>

<body>
  <div id="container">
    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
  </div>
  <style>
    #container {
      background-image: url('test.png');
      /* the image to display */
      background-position: center;
      /* crop the image from the center */
      background-size: cover;
      /* cover the container */
      background-repeat: no-repeat;
      /* do not repeat the image */
      width: 500px;
      /* the width */
      height: 500px;
      /* the height */
    }
  </style>
</body>

</html>
```

### 4. Styling visited links
CSS can be used to change the appearance of links before and after a user clicks on them.

The `a: visited` property controls all the links that the user has clicked on, the `a: link` controls all links that haven’t been clicked on yet. while the `a: active` link controls a link the moment it's being clicked.

Styling these links properly is a great benefit to the users. It builds a user-friendly website as the users can navigate through the site easier.

Different colors can be used on a link as shown in the snippet below:

```css
/* unvisited link */
a:link {
  color: red;
}

/* visited link */
a:visited {
  color: green;
}

/*selected link */
a:active {
  color: blue
}
```

### 5. Styling the first letter in a paragraph
The initial letter is a technique of selecting the first letter in a paragraph and specifying the number of lines it holds. It's usually used by print media and information sites, such as news sites. 

It's a very important technique as it grabs the reader's attention, making them read the first line and finally the entire paragraph.

While this style may appear to be dated, you can still design it to appear more modern to the end-users.

Let's have a look at the example snippet below:

```html
<html>

<body>
  <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit.</p>
  <style>
    p:first-letter {
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

### 6. How to group elements when styling using classes
Styling different HTML elements one by one is very tiresome and time-wasting. This can be easily solved by using classes.

To do this, group different elements under the same `class` attribute and style them using the `.class` selector. This selector will select all elements with the specific class attribute and apply styles to them.

This is an advantage to developers because they don't have to write the same line of code numerous times, they save time and reduce the size of their code.

Suppose you want to set a background color, text color, font, and center the text of the elements of multiple divs. 

Let's have a look at the example snippet below:

```html
<html>

<body>
  <div class="card">
    <h4>Why do developer Group elements together when styling?</h4>
    <p>Developers Group elements together to save on time </p>
    <h5>What are advantages Of Consolidating during styling?</h5>
  </div>

  <div class="card">
    <h4>Why do developer Group elements together when styling?</h4>
    <p>Developers Group elements together to save on time </p>
    <h5>What are advantages Of Consolidating during styling?</h5>
  </div>

  <style>
    .card {
      background-color: black;
      color: white;
      font-size: medium;
      text-align: center;
      width: 400px;
      padding: 10px;
      margin: 10px;
      border-radius: 5px;
    }
  </style>
</body>

</html>
```

### 7. Placing an element in a fixed position
Developers sometimes want to fix some elements in a fixed position to make them remain in that location within the browser's viewport. 

For instance, a developer may want to add a back-to-top button to a website, and the only suitable position is at the bottom-right of the website.

The code snippet below illustrates how to add a sticky back-to-top button at the bottom right of the website.

```html
<html>

<body>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
  <div>
    <p>
      Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eveniet illo
      corporis saepe sunt quidem nesciunt asperiores impedit odit! Enim quam
      voluptatum modi suscipit laboriosam porro fugiat odit molestiae error?
      Dolores.
      <br />
      <a class="arrowup" href=""><i class="fa fa fa-arrow-up"></i></a>
    </p>
  </div>
  <style>
    div {
      width: 410px;
      height: 230px;
    }

    .arrowup {
      position: fixed;
      right: 20px;
      bottom: 20px;
      background-color: blue;
      font-size: medium;
      padding: 20px;
      width: 20px;
      height: 20px;
      border-radius: 100px;
      color: white;
      text-align: center;
    }
  </style>
</body>

</html>
```

### Conclussion
In this tutorial, we have covered some important `hacks` that every developer needs to know to design a clean web app.

### Further reading
- [CSS tricks to revolutionise your layouts](https://www.creativebloq.com/features/css-tricks-to-revolutionise-your-layouts)

Happy coding!

---
Peer Review Contributions by: [Geoffrey Mungai](/engineering-education/authors/geoffrey-mungai/)
