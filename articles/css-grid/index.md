---
layout: engineering-education
status: publish
published: true
url: /engineering-education/css-flexbox/
title: Create Two-Dimensional Layouts for Websites using CSS Grid
description: CSS Grid is a two-dimensional positioning layout system in CSS, that can be used to create responsive interfaces for the web.
author: saiharsha-balasubramaniam
date: 2020-09-16T00:00:00-08:00
topics: [Languages]
excerpt_separator: <!--more-->
images:
  - url: /engineering-education/css-grid/hero.jpg
    alt: css grid
---

CSS Grid is a two-dimensional positioning layout system in CSS, that can be used to create responsive interfaces for the web. Similar to flexbox, CSS rules are applied to the parent container and the children.

CSS Flexbox is a one dimension positioning system. Check out [this](https://www.section.io/engineering-education/css-flexbox/#conclusion) article to learn more about CSS Flexbox.

## Table of Contents

- [Introduction & History](#introduction-&-history)
- [Terminology](#terminology)
- [Let's Code](#let's-code)
- [Further Reading](#further-reading)

## Introduction & History

Using CSS for laying out items on a webpage has always been a tricky affair. We used tables and floats to position items before. They were inefficient hacks and they weren't intuitive.

Therefore, CSS Flexbox was introduced and it made positioning easier. But as the complexity of your website layout increased, flexbox wasn't the best option. It was designed for one-dimensional website layouts. Thus, CSS grid solves that problem by introducing features for building two-dimensional layouts.

Let us look into some basic terminology used in grid and dive into building a layout using the CSS grid system.

## Terminology

### grid container

This container acts as the parent of all the grid elements.

```html
<div class="grid-parent-container">
  <div class="grid-child child-1"></div>
  <div class="grid-child child-2"></div>
  <div class="grid-child child-3"></div>
  <div class="grid-child child-4"></div>
  <div class="grid-child child-5"></div>
</div>
```

In this example, a parent `grid-container` wraps around five children grid containers.

### grid children

The direct children of the `grid-parent-container`.

```html
<div class="grid-parent-container">
  <div class="grid-child child-1">
    <div class="sub-child"></div>
  </div>
  <div class="grid-child child-2"></div>
  <div class="grid-child child-3">
    <div class="sub-child"></div>
  </div>
  <div class="grid-child child-4"></div>
  <div class="grid-child child-5"></div>
</div>
```

In this example, the `sub-child` does not count as grid-children. Only the **direct children** of the `parent-container` count as grid-children.

![CSS Grid Terminology](/engineering-education/css-grid/grid-terminology.png)

_Figure: CSS Grid Diagram - [Source](https://webkit.org/blog/7434/css-grid-layout-a-new-layout-module-for-the-web/)_

### grid-line

The lines that divide the grid into boxes are called the grid lines. They're divided into row grid lines and column grid lines.

### grid-cell

A grid cell is the most elementary unit of a grid. It is made up of two adjacent row and column grid lines.

### grid-track

The grid track is the area between two adjacent row grid lines or adjacent column grid lines.

### grid-area

The grid area is the area surrounded by any four grid lines. A grid area is comprised of one or more grid cells.

### display

```css
.grid-parent-container {
  display: grid;
}

.inline-grid-parent-container {
  display: inline-grid;
}
```

Here, the `display: grid` property defines the parent grid container to be element with class 'grid-parent-container'. This generates a block level grid. This means that the grid takes up the entire line and other elements cannot co-exist with the grid.

The `display: inline-grid` property defines the parent grid container to be element with class 'inline-grid-parent-container'. This generates an inline-level-grid. Other elemenets can take up the free space on the same line.

### grid-template-rows & grid-template-columns

These properties define how the rows and columns of the grid layout are arranged. They set the grid-track size.

```css
.grid-parent-container {
  grid-template-columns: 100px 50px auto 50px 100px;
  grid-template-rows: 25% 50% 25%;
}
```

The above code creates a grid of 3 rows of 25%, 50% and 25% size of the parent container, and 5 columns of 100px, 50px, 50px and 100px. The middle column would automatically take up the rest of the space.

We can also use the `fr` unit. One fr or fraction takes up a fraction of the free space available in the grid container.

```css
.grid-parent-container {
  grid-template-columns: 1fr 1fr 1fr 1fr;
}
```

The above code creates four columns of one fraction space each. In this case, they take up 25% space each.

### grid-template-areas

This property defines the grid template. It defines which page elements are placed in which grid in the layout.

```css
.child-1 {
  grid-area: area-1;
}

.child-2 {
  grid-area: area-2;
}

.child-3 {
  grid-area: area-3;
}

.grid-parent-container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  grid-template-areas:
    "area-1 area-2 area-2"
    "area-1 area-3 area-3";
}
```

The above snippet will create a grid that is three columns wide and two rows tall. The top row will be comprised of area-1 and two cells of area-2. The bottom row will be composed of a cell of area-1 and two cells of area-3.

The syntax of `grid-template-areas` provides a visualization of the defined grid structure.

_Note: There is more terminology related to CSS Grid. We have covered only the important ones so that we get a basic understanding of the grid features. For a more detailed overview of all grid features, visit this [MDN link](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout)_

## Let's Code

Our goal is to generate a simple image grid as shown.

![Image Grid](/engineering-education/css-grid/image-grid.png)

Let us start by defining our page's HTML.

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

Here, we have the `grid-parent-container`. This is the wrapper for the grid layout we made. The images are fetched using a random image generator, [Unsplash](https://unsplash.com/).

Let us write the CSS and define our grid layout.

```css
/* The grid-area defines the names of the grid areas that would be speicified 
in the grid-template-areas in the parent container */
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
```

This above snippet can be added in a style tag within the HTML file or can be added as an external stylesheet. The complete code is as follows.

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

## Further Reading

Thus, we have seen the basics of the CSS grid module and learnt how to build a basic grid layout. For a more in-depth dive into grid, check out the resources below.

- [CSS Grid](https://developer.mozilla.org/en-US/docs/Web/CSS/grid) - Mozilla Developer Network
- [CSS Grid Layout: A New Layout Module for the Web](https://webkit.org/blog/7434/css-grid-layout-a-new-layout-module-for-the-web/) - Webkit Blog
- [CSS Grid Garden](https://cssgridgarden.com/) - A site to learn and play with CSS grids.
