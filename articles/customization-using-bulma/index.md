---
layout: engineering-education
status: publish
published: true
url: /engineering-education/customization-using-bulma/
title: Customize CSS using Bulma
description: Bulma is a lightweight, open source CSS framework that has excellent customization features, perfect for rapid development.
author: saiharsha-balasubramaniam
date: 2020-09-04T00:00:00-08:00
topics: [Languages]
excerpt_separator: <!--more-->
images:
  - url: /engineering-education/customization-using-bulma/hero.jpg
    alt: bulma
---

**Cascading Style Sheets** is a stylesheet language that is used to describe how a webpage looks and feels visually. To speed up the development of projects, developers use CSS frameworks like Bulma. Let us see why CSS frameworks are useful and learn about Bulma.

### Table of Contents

- [Need for a CSS Framework](#need-for-a-css-framework)
- [Bulma](#bulma)
- [Getting Started](#getting-started)
- [Column System](#column-system)
- [Components](#components)
- [Customizing Variables](#customizing-variables)
- [Further Reading](#further-reading)

### Need for a CSS Framework

CSS is an flexible language, with a ton of customization options. This may sometime prove to be overwhelming for a beginner. When you're out to build a product, a CSS framework helps to accelerate the process of development. It helps to reduce time to production and this may prove crucial to a project. Some other benefits to using a CSS framework include:

- Good CSS frameworks have excellent documentation.
- Easier to make websites responsive.
- Cross-browser support.

### Bulma

Bulma is a fast, lightweight and customizable CSS framework. Bulma is perfect for production-grade web applications due to its excellent performance and small size.

- Bulma is based on CSS Flexbox.
- It has an excellent developer community.
- It can be customized extensively through variables.
- Bulma uses easy-to-read class names that are easy to remember.
- It is extremely clean and aesthetic looking.

For the above reasons, Bulma is an efficient CSS framework that can be used to create performant websites.

### Getting Started

Let us add Bulma to our web application project. We can do this by one of the following ways.

- We can use the Bulma CDN to add Bulma to our webpage. In the website `<head>`, add the following line.

```html
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/bulma@0.9.0/css/bulma.min.css"
/>
```

- Download the npm package from the npm repository.

```
npm install bulma
```

- We can also download the `bulma.css` file from [here](https://github.com/jgthms/bulma/tree/master/css) and include it in our webpage using the `<link>` tag.

### Column System

One of the best features of Bulma is the responsive column grid system. For building a columns layout,

- Every row in Bulma is defined by a `columns` container.
- Every column should be defined as a `column` and should be nested within the `columns` container.

For example,

```html
<div class="columns">
  <div class="column">1st column</div>
  <div class="column">2nd column</div>
  <div class="column">3rd column</div>
</div>
```

This snippet would create a responsive column layout with 3 columns of equal width. You can also specify the column size by using the size classes.

```html
<div class="columns">
  <div class="column is-half">1st column</div>
  <div class="column is-one-quarter">2nd column</div>
  <div class="column">3rd column</div>
</div>
```

The above snippet would create three columns. One column occupies half the space, and the other two occupy a quarter of the space. For more options on columns, visit [this link](https://bulma.io/documentation/columns/).

### Components

Bulma comes with many in-built UI components. Let us try to create a card component.

```html
<div class="card">
  <div class="card-content">
    <p class="title">
      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Architecto,
      corrupti.
    </p>
    <p class="subtitle">Lorem Ipsum.</p>
  </div>
  <footer class="card-footer">
    <p class="card-footer-item">
      <span>Footer-Left</span>
    </p>
    <p class="card-footer-item">
      <span>Footer-Right</span>
    </p>
  </footer>
</div>
```

This code snippet would create a card component that would look like this:

![Bulma Card](/engineering-education/customization-using-bulma/card.png)

Bulma has many other components, for which the documentation can be viewed [here](https://bulma.io/documentation/components/).

### Customizing Variables

For customizing Bulma, there are four kinds or levels of variables:

- Initial Variables -- There are global variables with literal values.
- Derived Variables -- These are derived from other variables.
- Generic Variables -- HTML elements that cary no CSS class.
- Element Variables -- variables that are specific to a bulma element.

Now, for customizing these Bulma Variables, let us set up sass and bulma.

- Initiate a node project.

```
npm init
```

- Install bulma and sass.

```
npm i bulma sass
```

- Now, to get started, create three files.
  - index.html
  - style.css
  - style.scss

Let us now create a html page with a basic button.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <link rel="stylesheet" href="style.css" />
  </head>
  <body>
    <button class="button is-danger">Button1</button>
    <button class="button is-primary">Button2</button>
  </body>
</html>
```

Inititally, our output would be a red and a green button. The `is-danger` modifier is by default red, and the `is-primary` modifier is by default green.

![Bulma Buttons](/engineering-education/customization-using-bulma/buttons.png)

Let's say we want to change these colors.

We can do this by modifying `style.scss`

```scss
// Importing Initital Variables

@import "node_modules/bulma/sass/utilities/initial-variables";

// Setting our own variables

$blue: #06bcef;

$family-sans-serif: "Helvetica", "Arial", sans-serif;

// Set derived variables

$primary: $pink;
$danger: #0000ec;

// Import the rest of bulma

@import "node_modules/bulma/bulma";
```

SCSS should be compiled back to CSS, so we run the following command:

```
sass style.scss:style.css
```

Now, the buttons are changed into pink and the blue shade.

![Bulma Buttons Themed](/engineering-education/customization-using-bulma/buttons-themed.png)

If we want to change the primary font to Times New Roman for the entire document, we can use the `$family-primary` variable.

```scss
$family-primary: "Times New Roman";
```

Now, the font of the document is changed to Times New Roman.

![Bulma Buttons Font](/engineering-education/customization-using-bulma/buttons-font.png)

An exhaustive list of customizable Bulma variables can be found [here](https://bulma.io/documentation/customize/variables/).

### Further Reading

We have learnt the basics of Bulma and how to customize and theme bulma using variables. For further reading, check out the following links.

- [Bulma Expo](https://bulma.io/expo/) -- A list of websites created using Bulma, for inspiration.
- [Extensions](https://creativebulma.net/products) -- Bulma templates and extra components.
- [Sass Documentation](https://sass-lang.com/guide)
- [Learn Bulma](https://scrimba.com/g/gbulma) -- An interactive course to learn bulma.
