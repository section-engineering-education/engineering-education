---
layout: engineering-education
status: publish
published: true
url: /engineering-education/css-grid/
title: Create Two-Dimensional Layouts for Websites using CSS Grid
description: CSS Grid is a two-dimensional positioning layout system in CSS, that can be used to create responsive interfaces for the web.
author: saiharsha-balasubramaniam
date: 2020-09-21T00:00:00-08:00
topics: [Languages]
excerpt_separator: <!--more-->
images:
  - url: /engineering-education/css-grid/hero.jpg
    alt: css grid
---
CSS Grid is a two-dimensional positioning layout system in CSS, that can be used to create responsive interfaces for the web. Similar to Flexbox, CSS rules are applied to the parent container and the children.

CSS Flexbox is a one dimensional positioning system. Check out [this](/engineering-education/css-flexbox) article to learn more about CSS Flexbox.

### Table of Contents
- [Introduction & History](#introduction-&-history)
- [Terminology](#terminology)
- [Let's Code](#lets-code)
- [Further Reading](#further-reading)

### Introduction & History
Using CSS for web layouts has always been a tricky affair. We used tables and floats to position items before. These were inefficient hacks and weren't intuitive.

Therefore, CSS Flexbox was introduced and it made positioning much easier. But as the complexity of website layouts increased, Flexbox wasn't always the best option. It was designed for one-dimensional layouts.

Thus, CSS Grid was developed to solve that problem by introducing features for building two-dimensional layouts.

If we try to build a two-dimensional layout using CSS Flexbox, it would become extremely complicated because the layout would have a lot of rows and columns. Making it responsive would create cluttered and unclean code. CSS Grid results in cleaner code for these type of layouts.

Let's look into some basic terminology used in grid and dive into building a layout using the CSS grid system.

### Terminology

#### Grid Container

This container acts as the parent of all the grid elements.

![Grid Container](/engineering-education/css-grid/grid-basic.png)

```html
<div class="grid-parent-container">
  <div class="grid-child child-1">Grid Child 1</div>
  <div class="grid-child child-2">Grid Child 2</div>
  <div class="grid-child child-3">Grid Child 3</div>
  <div class="grid-child child-4">Grid Child 4</div>
  <div class="grid-child child-5">Grid Child 5</div>
</div>
<style>
  .grid-child {
    background-color: #d0d1cd;
  }

  .grid-parent-container {
    display: grid;
    column-gap: 20px;
    row-gap: 20px;
  }
</style>
```

In this example, a parent `grid-container` wraps around five children grid containers.

#### Grid Children
The direct children of the `grid-parent-container`.

![Grid Children](/engineering-education/css-grid/grid-sub-child.png)

```html
<div class="grid-parent-container">
  <div class="grid-child child-1">
    Grid Child 1
    <div class="sub-child">Grid Sub Child 1</div>
  </div>
  <div class="grid-child child-2">Grid Child 2</div>
  <div class="grid-child child-3">
    Grid Child 3
    <div class="sub-child">Grid Sub Child 3</div>
  </div>
  <div class="grid-child child-4">Grid Child 4</div>
  <div class="grid-child child-5">Grid Child 5</div>
</div>
<style>
  .grid-child {
    background-color: #d0d1cd;
  }

  .grid-parent-container {
    display: grid;
    column-gap: 20px;
    row-gap: 20px;
  }
</style>
```

In this example, the `sub-child` does not count as grid-children. Only the **direct children** of the `parent-container` count as grid-children.

![CSS Grid Terminology](/engineering-education/css-grid/grid-terminology.png)

*Figure: CSS Grid Diagram - [Source](https://webkit.org/blog/7434/css-grid-layout-a-new-layout-module-for-the-web/)*

#### grid-line
The lines that divide the grid into boxes are called the grid lines. They're divided into row grid lines and column grid lines.

#### grid-cell
A grid cell is the most elementary unit of a grid. It is made up of two adjacent rows and column grid lines.

#### grid-track
The grid track is the area between two adjacent row grid lines or adjacent column grid lines.

#### grid-area
The grid area is the area surrounded by any four grid lines. A grid area is comprised of one or more grid cells.

#### display

```CSS
.grid-parent-container {
  display: grid;
}

.inline-grid-parent-container {
  display: inline-grid;
}
```

Here, the `display: grid` property defines the parent grid container to be the element with class 'grid-parent-container'.

This generates a block level grid. This means that the grid takes up the entire line and other elements cannot co-exist with the grid.

![Grid](/engineering-education/css-grid/display-grid.png)

The `display: inline-grid` property defines the parent grid container to be an element with the class 'inline-grid-parent-container'. This generates an inline-level-grid.

Other elements can take up the free space on the same line. The grid elements take up space according to its contents.

![Inline Grid](/engineering-education/css-grid/inline-grid.png)

#### grid-template-rows & grid-template-columns
These properties define how the rows and columns of the grid layout are arranged. They set the grid-track size.

```html
<style>
  .grid-child {
    background-color: #d0d1cd;
  }
  .grid-parent-container {
    display: grid;
    row-gap: 10px;
    column-gap: 20px;
    grid-template-columns: 200px 100px auto 100px 200px;
    grid-template-rows: 25% 50% 25%;
  }
</style>
<div class="grid-parent-container">
  <div class="grid-child-1 grid-child">Grid Child 1</div>
  <div class="grid-child-2 grid-child">Grid Child 2</div>
  <div class="grid-child-3 grid-child">Grid Child 3</div>
  <div class="grid-child-4 grid-child">Grid Child 4</div>
  <div class="grid-child-5 grid-child">Grid Child 5</div>
  <div class="grid-child-6 grid-child">Grid Child 6</div>
  <div class="grid-child-7 grid-child">Grid Child 7</div>
  <div class="grid-child-8 grid-child">Grid Child 8</div>
  <div class="grid-child-9 grid-child">Grid Child 9</div>
  <div class="grid-child-10 grid-child">Grid Child 10</div>
  <div class="grid-child-11 grid-child">Grid Child 11</div>
  <div class="grid-child-12 grid-child">Grid Child 12</div>
  <div class="grid-child-13 grid-child">Grid Child 13</div>
  <div class="grid-child-14 grid-child">Grid Child 14</div>
  <div class="grid-child-15 grid-child">Grid Child 15</div>
</div>
```

The above code creates a grid of three rows of 25%, 50% and 25% size of the parent container, and five columns of 100px, 50px, 50px and 100px. The middle column would automatically take up the rest of the space.

![Grid Template Areas](/engineering-education/css-grid/grid-template.png)

We can also use the `fr` unit. One fr or fraction takes up a fraction of the free space available in the grid container.

![Grid Fraction](/engineering-education/css-grid/grid-fr.png)

```html
<style>
  .grid-child {
    background-color: #d0d1cd;
  }

  .grid-parent-container {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    column-gap: 20px;
    row-gap: 20px;
  }
</style>
<div class="grid-parent-container">
  <div class="grid-child-1 grid-child">Grid Child 1</div>
  <div class="grid-child-2 grid-child">Grid Child 2</div>
  <div class="grid-child-3 grid-child">Grid Child 3</div>
  <div class="grid-child-4 grid-child">Grid Child 4</div>
</div>
```

In the code above, the `row-gap` defines the gap between grid rows and the `column-gap` defines the gap between grid columns.

The above code creates four columns of one fraction space each. In this case, they each take up 25% space.

#### grid-template-areas
This property defines the grid template. It defines which page elements are placed in which grid in the layout.

Add the code below between style tags in your HTML file.

```html
<style>
  .child-1 {
    grid-area: area-1;
  }

  .child-2 {
    grid-area: area-2;
  }

  .child-3 {
    grid-area: area-3;
  }

  .grid-child {
    background-color: #d0d1cd;
  }

  .grid-parent-container {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    row-gap: 10px;
    column-gap: 20px;
    grid-template-areas:
      "area-1 area-2 area-2"
      "area-1 area-3 area-3";
  }
</style>
<div class="grid-parent-container">
  <div class="child-1 grid-child">Grid Child 1</div>
  <div class="child-2 grid-child">Grid Child 2</div>
  <div class="child-3 grid-child">Grid Child 3</div>
</div>
```

The above snippet will create a grid that is three columns wide and two rows tall. The top row will be comprised of area-1 and two cells of area-2. The bottom row will be composed of a cell of area-1 and two cells of area-3.

![Grid Areas](/engineering-education/css-grid/grid-areas.png)

The syntax of `grid-template-areas` provides a visualization of the defined grid structure.

*Note: There is more terminology related to CSS Grid. We have only covered the most important ones so that we get a basic understanding of the grid features. For a more detailed overview of all grid features, visit this [MDN link](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout)*

### Let's Code
Our goal is to generate a simple image grid as shown. We have used random [Unsplash](https://unsplash.com/) images. The result may be different for every user.

![Image Grid](/engineering-education/css-grid/image-grid.png)

We start by defining our page's HTML.

```html
<div class="grid-parent-container">
  <div class="grid-child small-img1">
    <img src="https://source.unsplash.com/random/200x100" />
  </div>
  <div class="grid-child medium-img1">
    <img src="https://source.unsplash.com/random/200x400" />
  </div>
  <div class="grid-child large-img1">
    <img src="https://source.unsplash.com/random/300x600" />
  </div>
  <div class="grid-child medium-img2">
    <img src="https://source.unsplash.com/random/210x400" />
  </div>
  <div class="grid-child small-img2">
    <img src="https://source.unsplash.com/random/210x100" />
  </div>
  <div class="grid-child large-img2">
    <img src="https://source.unsplash.com/random/400x600" />
  </div>
</div>
```

Here, we have the `grid-parent-container`. This is the wrapper for the grid layout we made. The images are fetched using a random image generator, from [Unsplash](https://unsplash.com/).

Next, we will write the CSS and define our grid layout.

```html
<style>
  /* The grid-area defines the names of the grid areas that would be specified in the grid-template-areas in the parent container */
  .small-img1 {
    grid-area: small-img1;
  }
  .medium-img1 {
    grid-area: medium-img1;
  }
  .large-img1 {
    grid-area: large-img1;
  }
  .medium-img2 {
    grid-area: medium-img2;
  }
  .small-img2 {
    grid-area: small-img2;
  }
  .large-img2 {
    grid-area: large-img2;
  }

  /* Parent Grid Container */
  .grid-parent-container {
    display: grid;
    justify-items: center; /* Centers the grid items on the row axis */
    align-items: center; /* Centers the grid items on the column axis */
    grid-template-rows: 1fr 1fr 1fr;
    grid-template-columns: 1fr 1fr 1fr 1fr; /* three row and four column grid */
    grid-template-areas:
      "small-img1 large-img1 medium-img2 large-img2"
      "medium-img1 large-img1 medium-img2 large-img2"
      "medium-img1 large-img1 small-img2 large-img2";
    /* The above option defines where every grid-area should be laid out within the grid */
  }
</style>
```

The above snippet can be added in a style tag within the HTML file or can be added as an external stylesheet. The complete code is as follows.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>CSS Grid</title>
  </head>
  <body>
    <style>
      .small-img1 {
        grid-area: small-img1;
      }
      .medium-img1 {
        grid-area: medium-img1;
      }
      .large-img1 {
        grid-area: large-img1;
      }
      .medium-img2 {
        grid-area: medium-img2;
      }
      .small-img2 {
        grid-area: small-img2;
      }
      .large-img2 {
        grid-area: large-img2;
      }
      .grid-parent-container {
        display: grid;
        justify-items: center;
        align-items: center;
        grid-template-rows: 1fr 1fr 1fr;
        grid-template-columns: 1fr 1fr 1fr 1fr;
        grid-template-areas:
          "small-img1 large-img1 medium-img2 large-img2"
          "medium-img1 large-img1 medium-img2 large-img2"
          "medium-img1 large-img1 small-img2 large-img2";
      }
    </style>
    <div class="grid-parent-container">
      <div class="grid-child small-img1">
        <img src="https://source.unsplash.com/random/200x100" />
      </div>
      <div class="grid-child medium-img1">
        <img src="https://source.unsplash.com/random/200x400" />
      </div>
      <div class="grid-child large-img1">
        <img src="https://source.unsplash.com/random/300x600" />
      </div>
      <div class="grid-child medium-img2">
        <img src="https://source.unsplash.com/random/210x400" />
      </div>
      <div class="grid-child small-img2">
        <img src="https://source.unsplash.com/random/210x100" />
      </div>
      <div class="grid-child large-img2">
        <img src="https://source.unsplash.com/random/400x600" />
      </div>
    </div>
  </body>
</html>
```

### Further Reading
We've seen the basics of the CSS grid module and learned how to build a basic grid layout. For a more in-depth dive into grid, check out the resources below.

- [CSS Grid](https://developer.mozilla.org/en-US/docs/Web/CSS/grid) - Mozilla Developer Network
- [CSS Grid Layout: A New Layout Module for the Web](https://webkit.org/blog/7434/css-grid-layout-a-new-layout-module-for-the-web/) - Webkit Blog
- [CSS Grid Garden](https://cssgridgarden.com/) - A site to learn and play with CSS grids.

---
Peer Review Contributions by: [Louise Findlay](/engineering-education/authors/louise-findlay/)
