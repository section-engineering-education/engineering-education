---
layout: engineering-education
status: publish
published: true
url: /engineering-education/customization-using-bulma/
title: Customize CSS using Bulma
description: Bulma is a lightweight and open-source CSS framework that has excellent customization features that are perfect for rapid development.
author: saiharsha-balasubramaniam
date: 2020-09-06T00:00:00-08:00
topics: [Languages]
excerpt_separator: <!--more-->
images:
  - url: /engineering-education/customization-using-bulma/hero.jpg
    alt: bulma image example
---
**Cascading Style Sheets** (CSS) is a stylesheet language that is used to describe how a webpage looks and feels visually. To speed up the development of projects, developers use CSS frameworks like Bulma. Let us see why CSS frameworks are useful and learn more about Bulma as well.
<!--more-->
### Table of Contents
- [The Need for a CSS Framework](#need-for-a-css-framework)
- [Bulma](#bulma)
- [Getting Started](#getting-started)
- [Column System](#column-system)
- [Components](#components)
- [Customizing Variables](#customizing-variables)
- [Further Reading](#further-reading)

### The Need for a CSS Framework
CSS is a flexible language, with a ton of customization options. This may sometimes be overwhelming for a beginner. Yet, when you're out to build a product, a CSS framework can really help in accelerating the development process. It helps to reduce time to production, which is crucial for a project. Some other benefits to using a CSS framework include:

- Good CSS frameworks have excellent documentation.
- Easier to make websites responsive.
- Cross-browser support.

### Bulma
Bulma is a fast, lightweight, and customizable CSS framework. Bulma is perfect for production-grade web applications due to its excellent performance and small size.

- Bulma is based on CSS Flexbox.
- It has an excellent developer community.
- It can be customized extensively through variables.
- Bulma uses easy-to-read class names that are easy to remember.
- It provides a modern and clean design.

For the reasons listed above, Bulma is an efficient CSS framework that can be used to create performant websites.

### Getting Started
Let's add Bulma to our web application. We can do this in one of the following ways.

- We can use the Bulma CDN to add Bulma to our webpage. To do so in the website's `<head>`, add the following line.

```html
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/bulma@0.9.0/css/bulma.min.css"
/>
```

- Let us initialize the `package.json` file for managing dependencies.

```bash
npm init
```

- Download the npm package from the npm repository.

```bash
npm install bulma
```

- We need to import the Bulma module into our CSS file.

```css
@import "../node_modules/bulma/css/bulma.css";
```

- We can also download the minified `bulma.min.css` file from [here](https://github.com/jgthms/bulma/blob/master/css/bulma.min.css) and include it in our webpage using the `<link>` tag.

```html
<link rel="stylesheet" href="bulma.css" />
```

### Column System
One of the best features of Bulma is the responsive column grid system. For building a columns layout,

- Every row in Bulma is defined by a `columns` container.
- Every column should be defined as a `column` and should be nested within the `columns` container.

For example:

```html
<div class="columns has-text-centered">
  <div class="column has-background-success">1st column</div>
  <div class="column has-background-danger">2nd column</div>
  <div class="column has-background-info">3rd column</div>
</div>
```

![Three Columns in Bulma](/engineering-education/customization-using-bulma/three-column.png)

This snippet would create a responsive column layout with three columns of equal width. You can also specify the column size by using the size classes.

```html
<div class="columns has-text-centered">
  <div class="column has-background-success is-half">1st column</div>
  <div class="column has-background-danger is-one-quarter">2nd column</div>
  <div class="column has-background-info">3rd column</div>
</div>
```

![Uneven Three Columns in Bulma](/engineering-education/customization-using-bulma/three-column-uneven.png)

The snippet above would create three columns. One column occupies half the space, and the other two occupy a quarter of the space. For more options on columns, visit [this link](https://bulma.io/documentation/columns/).

### Components
Bulma comes with many built-in UI components. Let's try to create a card component.

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

Bulma has many other components that you can find out about [here](https://bulma.io/documentation/components/).

### Customizing Variables
In order to customize Bulma, there are four kinds or levels of variables:

- Initial Variables -- These are global variables with literal values.
- Derived Variables -- These are derived from other variables.
- Generic Variables -- These are HTML elements that carry no CSS classes.
- Element Variables -- These are variables that are specific to a Bulma element.

Now, for customizing these Bulma Variables, let us set up Sass and Bulma. [Sass](https://sass-lang.com) is a CSS preprocessor that adds extra features like variables and loops. CSS preprocessors are an extension of CSS that provides additional features and reduces repetition.

- First, initiate a Node.js project.

```bash
npm init
```

- Next, install Bulma and Sass.

```bash
npm i bulma sass
```

- Now, to get started, create the three files below.
  - index.html
  - style.css
  - style.scss

Finally, let's create an HTML page with a basic button.

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

Initially, our output would be a red and a green button. The `is-danger` modifier is by default red, and the `is-primary` modifier is by default green.

![Bulma Buttons](/engineering-education/customization-using-bulma/buttons.png)

Let's say we want to change these colors.

We can do this by modifying `style.scss`

```scss
// Importing Initial Variables

@import "node_modules/bulma/sass/utilities/initial-variables";

// Setting our own variables

$blue: #06bcef;

$family-sans-serif: "Helvetica", "Arial", sans-serif;

// Set derived variables

$primary: $pink;
$danger: #0000ec;

// Import the rest of Bulma

@import "node_modules/bulma/bulma";
```

SCSS needs to be compiled back to CSS so the browser can understand it, we do that by running the following command:

```bash
sass style.scss:style.css
```

Now, the buttons have changed to pink and blue.

![Bulma Buttons Themed](/engineering-education/customization-using-bulma/buttons-themed.png)

If we want to change the primary font to Times New Roman for the entire document, we can use the `$family-primary` variable.

```scss
$family-primary: "Times New Roman";
```

Now, compile the SCSS again by running

```bash
sass style.scss:style.css
```

Now, the font of the document is changed to Times New Roman.

![Bulma Buttons Font](/engineering-education/customization-using-bulma/buttons-font.png)

An exhaustive list of customizable Bulma variables can be found [here](https://bulma.io/documentation/customize/variables/).

### Further Reading
We have just learned the basics of Bulma, how to customize, and theme Bulma using variables. For further reading, check out the following links to learn more.

- [Bulma Expo](https://bulma.io/expo/) -- A list of websites created using Bulma, for inspiration.
- [Extensions](https://creativebulma.net/products) -- Bulma templates and extra components.
- [Sass Documentation](https://sass-lang.com/guide)
- [Learn Bulma](https://scrimba.com/g/gbulma) -- An interactive course to learn Bulma.

---
Peer Review Contributions by: [Louise Findlay](/engineering-education/authors/louise-findlay/)
