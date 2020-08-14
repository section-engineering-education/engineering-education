---
layout: engineering-education
status: publish
published: true
url: /engineering-education/css-flexbox/
title: Create Layouts for Websites using CSS Flexbox
description: CSS Flexbox is a one-dimensional layout system for creating layouts for webpages. It is used to align and define element behavior across a row or a column.
author: saiharsha-balasubramaniam
date: 2020-08-05T00:00:00-08:00
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/css-flexbox/hero.jpg
    alt: css flexbox

---
CSS Flexible Box is a CSS Module that defines a one-dimensional layout for webpages. It can be used to align and define element behavior across a row or a column. Flexbox is really simple yet powerful to use.
<!--more-->

Let us understand some terms in Flexbox and build a simple layout using it.

### Table of Contents

- [Introduction](#introduction)
- [Terminology](#terminology)
- [Let's Code](#let's-code)
- [Further Reading](#further-reading)
- [Conclusion](#conclusion)

### Introduction

CSS Layout is a tricky process, and developers tend to go with frameworks such as [Bootstrap](https://getbootstrap.com/) or [Bulma](https://bulma.io/) for getting a good layout system. Frameworks like these tend to **add weight** to the project, with their huge sizes and **complexity**. The in-built CSS Flex Module can substitute frameworks like these to create lightweight responsive website layouts.

Let's look at some basic terminology used in the flexbox module.

### Terminology

#### container

A container is a placeholder or a wrapper to which we apply flex properties.

#### display

```css
.bucket {
    display: flex;
}
```

Here, the *display: flex* property defines the parent container to be the element with class 'bucket'. Flex properties can be applied to both the parent and children containers.

#### Main-Axis, Cross-Axis

![Flexbox, diagram](/engineering-education/css-flexbox/flex-diag.png)

Flex has a two-coordinate axis system. The horizontal axis is referred to as the **main-axis** and the vertical axis is referred to as the **cross-axis**. To stretch across the main axis, **justify** properties are used. To set the cross-axis alignment, **align** properties are used.

#### flex-direction

*flex-direction* sets the direction of flow of items in the parent container.

```css
.bucket1 {
    display: flex;
    flex-direction: row;
}

.bucket2 {
    display: flex;
    flex-direction: row-reverse;
}

.bucket3 {
    display: flex;
    flex-direction: column;
}

.bucket4 {
    display: flex;
    flex-direction: column-reverse;
}
```

- **row** would make the items flow from left -> right.
- **column** would make the items flow from top -> bottom.
- **row-reverse** would make the items flow from right -> left.
- **column-reverse** would make the elements flow from bottom -> top.

#### flex-wrap

*flex-wrap* defines the behaviour for elements when container runs out of space.

```css
.bucket1 {
    flex-wrap: nowrap;
}

.bucket2 {
    flex-wrap: wrap;
}

.bucket3 {
    flex-wrap: wrap-reverse;
}
```

- **no-wrap** property says that the items would not overflow into the next line, and would be wrapped in the same line.
- **wrap** property says that the items would wrap into many lines, from top to bottom.
- **wrap-reverse** property is similar to *wrap*, but would wrap the items from bottom to top.

#### justify-content

*justify-content* defines the placement and alignment along the main-axis. The mode we use defines how to distribute the extra space leftover.

```css
.bucket {
    justify-content: flex-start | flex-end | center;
}
```

*Note - There are many other modes in justify-content, but we're looking at the basic ones to understand the idea of flexbox.*

- **flex-start** packs the items towards the start of the row/column according to the flex-direction.
- **flex-end** packs the items towards the end of the row/column according to the flex-direction.
- **center** packs the items towards the center of the main-axis.

#### align-items

*align-items* defines the placement and alignment along the cross-axis.

```css
.bucket {
    align-items: flex-start | flex-end | center;
}
```

*Note - There are many other modes in align-items, but we're looking at the basic ones to understand the idea of flexbox.*

- **flex-start** packs the items towards the start of the cross-axis.
- **flex-end** packs the items towards the end of the cross-axis.
- **center** packs the items towards the center of the cross-axis.

### Let's Code
Our goal is to generate a simple image grid as shown.

![Image Grid](/engineering-education/css-flexbox/img-grid.png)

Let's start by writing the markup.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/bulma@0.9.0/css/bulma.min.css"
    />
    <title>Document</title>
  </head>

  <body>
    <div class="container">
      <div class="container1">
        <div class="img-box">
          <img src="https://picsum.photos/300/200" />
        </div>
        <div class="img-box">
          <img src="https://loremflickr.com/300/200" />
        </div>
        <div class="img-box">
          <img src="https://placekitten.com/300/200" />
        </div>
      </div>
      <div class="container2">
        <div class="container3">
          <div class="img-box">
            <img src="http://lorempixel.com/300/200" />
          </div>
          <div class="img-box">
            <img src="https://source.unsplash.com/random/300x200" />
          </div>
        </div>

        <div class="img-box">
          <img src="https://source.unsplash.com/random/600x400" />
        </div>
      </div>
    </div>
  </body>
</html>
```

Here, we're having a parent container for every alignment we need.

**Container 1** and **Container 2** are used for creating a horizontal flex layout, whereas **Container 3** is used for having a vertical layout. We fetch images from random image generators from the internet.

Let's write the stylesheet!

```css
.container1 {
      margin-top: 10%;
      display: flex;
      flex-direction: row;
      justify-content: center;
    }

    .container2 {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
    }

    .container3 {
      display: flex;
      flex-direction: column;
      justify-content: center;
    }

    .img-box {
      padding: 1em;
    }
```

This can either be embedded within a style tag or linked as an external file.
In this code snippet, the `justify-content` property defines the mode of alignment along the main-axis and the `align-items` property defines the alignment along the cross-axis of the container.

### Further Reading
To learn in-depth about Flexbox and CSS, check out the links below.

- [CSS Flexbox](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Flexbox) - Mozilla Developer Network
- [A Complete Guide to Flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/) - CSS Tricks
- [Flexbox](https://www.w3schools.com/css/css3_flexbox.asp) - W3Schools

### Conclusion
CSS Flexbox has proven to be an extremely simple and powerful tool for creating layouts. For a two-dimensional layout, there's a CSS module called the CSS Grid.
