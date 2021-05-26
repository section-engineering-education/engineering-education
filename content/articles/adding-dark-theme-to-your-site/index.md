---
layout: engineering-education
status: publish
published: true
url: /adding-dark-theme-to-your-site/
title: Dark Theme using CSS Variables and Local Storage
description: In this article we will understand how to build dark theme webpages using CSS and local storage. We will also build a simple webpage for toggling between light and dark themes.
author: phina-kersly
date: 2021-03-17T00:00:00-20:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/adding-dark-theme-to-your-site/hero.png
    alt: Dark theme using CSS variables and local storage example image
---
The dark theme has gained prevalence in screens today. With this trend in iOS, macOS, Windows, and Google, most systems have adopted dark themes. Dark theme makes your website more exciting and attractive to users who love a darker color theme. The experience becomes better if you include the functionality to switch between light and dark themes.
<!--more-->
This article will help you learn how to implement a switch function between light and dark themes using [CSS Variables](https://www.w3schools.com/css/css3_variables.asp).

Click [this link](https://replit.com/@PhinaKersly/dark-theme#index.html) to find the source code and a runnable program for the implementation.

### Prerequisite
As a prerequisite, the reader must have a good understanding of the following concepts:
- Basic Knowledge of HTML, SCSS, and Javascript.
- Understand CSS variables.

### Table of contents
- [Adding HTML](#adding-html)
- [Adding CSS](#adding-css)
- [Toggle theme](#toggle-theme)
- [Adding JavaScript](#adding-javascript)
- [Using local storage](#using-local-storage)
- [Conclusion](#conclusion)
- [Further reading](#further-reading)

### Adding HTML
Let's begin by building the HTML page that we will use for the tutorial. We will add the `theme` name and `switch` id to the checkbox input so that we will need to to refer to it in our `javascript`.

We are creating a simple webpage consisting of a container, in which we also add a heading, a toggle button, and a paragraph as shown below:

```html
<!DOCTYPE html>
<html lang="en" data-theme="light">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="css/main.css">
    <title>Adding dark theme to your site</title>
</head>
<body>
    <!-- container -->
    <div class="container">
        <!-- heading -->
        <h1>Section Engineering Education</h1>
        <!-- toggle switch contaner -->
        <div class="toggle-container">
            <input type="checkbox" id="switch" name="theme" /><label for="switch">Toggle</label>
        </div>
            <!-- close toggle switch container -->
            <!-- paragraph -->
        <p>Section partners with university students in Computer Science related fields of study to research and write about topics that are relevant to engineers in the modern technology landscape. You can find more information and program guidelines in the GitHub repository. If you're currently enrolled in a Computer Science related field of study and are interested in participating in the program, please complete <a href="https://docs.google.com/forms/d/e/1FAIpQLSfTbj3kqvEJEb5RLjqJurfbHa8ckzQx0CjRzaizblue9ZOK5A/viewform">this form </a></p>
            <!-- close paragraph -->
    </div>
       <!-- close container -->
    <script src="main.js"></script>
</body>
</html>
```

![Output - HTML page](/engineering-education/adding-dark-theme-to-your-site/html-page.PNG)

*HTML page*

### Adding CSS
In the same directory as the HTML file, we will add the CSS file that will be used to  toggle the default "Light" theme to the "Dark" theme.

I recommend installing a live SCSS Compiler to compile our CSS Code in real-time. You can look into the SCSS compiler's installation [here](https://marketplace.visualstudio.com/items?itemName=ritwickdey.live-sass).

You can change the color code to your favorite color that looks attractive both in dark and light themes.

The CSS styling for the default white theme is:

```css
/* default styling variables - making background color as white */
html{
    --bg: #fff;
    --bg-panel: #ebebeb;
    --color-heading: rgb(27, 168, 14); 
    --color-text: #333333;
}
```

The CSS styling for dark theme is:

```css
/* dark theme styling - Here, we set data-them as "dark"*/
html[data-theme='dark'] {
    --bg: #333333;
    --bg-panel: #434343;
    --color-heading: #0077ff; 
    --color-text: #B5B5B5;
}
```

Next, we need to specify the CSS styling in the CSS file `main.css`, so that the website elements will change when we click on the toggle theme button.

```css
body { 
    background-color: var(--bg); /* background color variable */
}

.container {
  background-color: var(--bg-panel); /* background panel color variable */
  margin: 5em;
  padding: 5em;
  border-radius: 15px;
  display: -ms-grid;
  display: grid;
  -ms-grid-columns: 80% auto;
      grid-template-columns: 80% auto;
  -ms-grid-rows: auto auto;
      grid-template-rows: auto auto;
      grid-template-areas: "title switch"
 "content content";
}

.container h1 {
  margin: 0;
  color: var(--color-heading); /* heading 1 background color variable */
}

.container p {
  color: var(--color-text); /* text-color variable */
  -ms-grid-column-span: 2;
  grid-area: content;
  font-size: 1.1em;
  line-height: 1.8em;
  margin-top: 2em;
}
```

![Output After Adding CSS](/engineering-education/adding-dark-theme-to-your-site/after-adding-css.png)

*Output after adding CSS styling*

### Toggle theme
In the next section, we will style our "Toggle switch" which will helps us switch between the dark and light themes. The code for the toggle button is shown below:

You can find the code to this switch [here](https://codepen.io/mburnette/pen/LxNxNg).

```css
input[type=checkbox] { /* styling for input element */
    height: 0;
    width: 0;
    visibility: hidden;
}

label { /* styling for labels */
    cursor: pointer;
    text-indent: -9999px;
    width: 52px;
    height: 27px;
    background: #1ba80e;
    float: right;
    border-radius: 100px;
    position: relative;
}

label:after { /* styling for labels - on toggle */
    content: '';
    position: absolute;
    top: 3px;
    left: 3px;
    width: 20px;
    height: 20px;
    background: #fff;
    border-radius: 90px;
    -webkit-transition: 0.3s;
    transition: 0.3s;
}

input:checked + label { /* conditional check while toggling */
    background: var(--color-heading);
}

input:checked + label:after {
    left: calc(100% - 5px);
    -webkit-transform: translateX(-100%);
            transform: translateX(-100%);
}

label:active:after {
    width: 45px;
}
```

![Toggle theme switch](/engineering-education/adding-dark-theme-to-your-site/toggle-switch.png)

*Toggle theme*

### Adding JavaScript
We will handle the theme switching with JavaScript by changing the toggle switch's class name to either `light` or `dark`, as defined below. In doing so, we write two functions `changeThemeToDark()` and `chnageThemeToWhite()`.

#### Change the theme to dark

```javascript
// Change theme to dark by adding the `dark` classname to html element.
const changeThemeToDark = () => {
    document.documentElement.setAttribute("data-theme", "dark")//set theme to light
}
```

#### Change the theme to light

```javascript
// Reset the html class to default
const changeThemeToDark = () => {
    document.documentElement.setAttribute("data-theme", "light"); //set theme to light
}
```

### Using local storage
The local storage provides a store for key and value pairs in a browser. Data stores with local storage do not expire even after the browser is closed or refreshed.

The `setItem` and `getItem` methods are used to store and retrieve the stored data respectively.

We will use local storage to store our currently set theme, so that in subsequent visits or page refreshes, the users will see their previously set themes.

The pieces of code below are used to save and retrieve the theme from local storage:

```javascript
let theme = localStorage.getItem('data-theme');
const changeThemeToDark = () => {
    document.documentElement.setAttribute("data-theme", "dark") // set theme to dark
    localStorage.setItem("data-theme", "dark") // save theme to local storage
}

const changeThemeToLight = () => {
    document.documentElement.setAttribute("data-theme", "light") // set theme light
    localStorage.setItem("data-theme", 'light') // save theme to local storage
}
```

After writing the functions, we will check to see what theme is set currently and toggle it.

```javascript
// Get the element based on ID
const checkbox = document.getElementById("switch");
// Apply retrived them to the website
checkbox.addEventListener('change', () => {
    let theme = localStorage.getItem('data-theme'); // Retrieve saved them from local storage
    if (theme ==='dark'){
        changeThemeToLight()
    }else{
        changeThemeToDark()
    }   
});
```

![Dark Theme](/engineering-education/adding-dark-theme-to-your-site/dark-theme.png)

*Dark theme webpage*

### Conclusion
This article has explained how we can implement dark and light themes, and a toggle them to switch, by using CSS variables and localStorage.

You can now try out implementing the dark theme on your own website. You can find the link to the code used in the article [here](https://replit.com/@PhinaKersly/dark-theme#index.html).

### Further reading
- [CSS Variables](https://www.w3schools.com/css/css3_variables.asp)
- [Local storage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)

Happy coding.

---
Peer Review Contributions by: [Srishilesh P S](/engineering-education/authors/srishilesh-p-s/)