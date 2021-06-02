---
layout: engineering-education
status: draft
published: false
url: /creating-a-dark-mode-with-javascript-and-css/
title: How to create a simple Dark-Mode using CSS and JavaScript along with Switch
description: In this article we will understand how to create dark mode  using CSS and javaScripT along Switch
author: chandramouli-dasari
date: 2021-02-06T00:00:00-22:09
topics: []
excerpt_separator: <!--more-->
images:
  - url: /engineering-education/creating-a-dark-mode-with-javascript-and-css/hero.png
    alt: Dark mode using CSS and JavaScripT along Switch
---

**In the write-up I want to explain how to create a simple Dark Mode with JavaScript and CSS in few lines. If you're a little familiar with JavaScript and CSS I'm sure you can understand this easily and I will explain in detail so beginners can understand easily**

### Prerequisites

- Any Code Editor
  - Recommded Vscode
- Extenstions
  - [LiveServer](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)
- projectfolder/
  - index.html
  - css/style.css
  - js/main.js
- Since we apply our CSS and JavaScript in HTML. So let us create a basic Html file you can name as you like with the .html extension `index.html`

  ```html
  <!DOCTYPE html>
  <html>
    <head>
      <title>Light and Dark Mode</title>
    </head>
    <body>
      <h1>Dark Mode using CSS and JavaScript</h1>
    </body>
  </html>
  ```

- Simply copy-paste the above code in your editor and save it as _`.html`_ extension
- Now if you install [LiveServer](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) right-click and you will find an option `Open with Live server`
- You will see White Background with Dark Mode using CSS and JavaScript text

## CSS(Cascading Style Sheets)

- As I mentioned in Prerequisites I hope you created _`css`_ folder and created a file in that folder with extension _`.css`_ **(style.css)**
- Navigate to css/style.css then follow the below steps

  - First, we have to style the HTML tags in style.css

    ```css
    html {
      --bg-color: #fff; /* Here The we styling the Background-color White with in HTML tags in html code  */
      --text-color: #000; /* Here The we styling the Text-color Black with in HTML tags in html code */
    }
    ```

  - Second, we have to style the body tags and input them in style.css

    ```css
    body {
      background-color: var(
        --bg-color
      ); /* Here The we styling the Background-color White with in BODY tags in html code */
      color: var(
        --text-color
      ); /* Here The we styling the Text-color Black with in BODY tags in html code*/
    }
    ```

  - Finally, add one more styling

    ```css
    [data-theme='dark'] {
      --bg-color: #000; /*This in the Swaping the background and the text colors from white to black and vice-versa */
      --text-color: #fff;
    }
    ```

## SWITCH

- Back to index.html 
- Add Switch Button to your `HTML` file

  ```html
  <input type="button" id="Switch" value="Switch themes" class="right" />
  ```


- Now, Again Navigate to css/style.css then add `button` properties
  
  ```css
   input.right {
    float: right;
  }
  ```

- Final CSS looks like this in _`style.css`_

  ```css
  html {
    --bg-color: #fff;
    --text-color: #000;
  }

  [data-theme='dark'] {
    --bg-color: #000;
    --text-color: #fff;
  }

  input.right {
    float: right;
  }

  body {
    background-color: var(--bg-color);
    color: var(--text-color);
  }
  ```

### Now Link this style.css to index.html

- Navigate back to `index.html`
- This can be done by adding a reference in your `HTML` file

  ```html
  and add data-theme="dark" to HTML tags ==>
  <html data-theme="dark">
    <link rel="stylesheet" type="text/css" href="css/style.css" />
  </html>
  ```
 
- And your `HTML` file looks like
  ```html
  <!DOCTYPE html>
  <html data-theme="dark">
    <head>
      <title>Light and Dark Mode</title>
      <link rel="stylesheet" type="text/css" href="css/style.css" />
    </head>
    <body>
      <h1>Dark Mode using CSS and JavaScript</h1>
      <input type="button" id="Switche" value="Switch themes" class="right" />
    </body>
  </html>
  ```
- Now if you install [LiveServer](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) right-click and you will find an option `Open with Live server`
- You will see White Background with Dark Mode using CSS and JavaScript text and a button on the right side

## JAVASCRIPT

- Alright, now we just need a small JavaScript code to get this working, in your main.js file add the following code:
- Navigate to `js/main.js`

  - Add the below JavaScript code into your `main.js`

    ```js
    document.addEventListener('DOMContentLoaded', function (event) {
      document.documentElement.setAttribute('data-theme', 'light') // First get the document to load after visitng the page & page appears into light theme & create a function

      var themeSwitch = document.getElementById('Switch') // creating a variable THEMESWITCH & Get the Id which we created SWITCH

      themeSwitch.onclick = function () {
        // When we click the SWITCH button & create a function

        var currentTheme = document.documentElement.getAttribute('data-theme') // creating a variable currentTheme & Get the current selected theme, ny default it should be `light`

        var switchToTheme = currentTheme === 'dark' ? 'light' : 'dark' // creating a variable switchToTheme & Switch between `dark` and `light`

        document.documentElement.setAttribute('data-theme', switchToTheme) // Set our currenet theme to the selected theme
      }
    })
    ```

### Now Link the This main.js to index.html

- Navigate back to `index.html`
- This can be done by adding an src in your `HTML` file

  ```html
  <script type="text/javascript" src="js/main.js"></script>
  ```

## Finally your index.html looks like

```html
<!DOCTYPE html>
<html data-theme="dark">
  <head>
    <title>Light and Dark Mode</title>
    <link rel="stylesheet" type="text/css" href="css/Style.css" />
    <script type="text/javascript" src="js/main.js"></script>
  </head>
  <body>
    <input
      type="button"
      id="theme-switcher"
      value="Switch themes!"
      class="right"
    />
    <h1>Dark Mode using CSS and JavaScript</h1>
  </body>
</html>
```

## Finally your style.css looks like

```css
html {
  --bg-color: #fff;
  --text-color: #000;
}
[data-theme='dark'] {
  --bg-color: #000;
  --text-color: #fff;
}
input.right {
  float: right;
}
body {
  background-color: var(--bg-color);
  color: var(--text-color);
}
```

## Finally your main.js looks like

```js
document.addEventListener('DOMContentLoaded', function (event) {
  document.documentElement.setAttribute('data-theme', 'light')

  var themeSwitch = document.getElementById('Switch')
  themeSwitch.onclick = function () {
    var currentTheme = document.documentElement.getAttribute('data-theme')
    var switchToTheme = currentTheme === 'dark' ? 'light' : 'dark'
    document.documentElement.setAttribute('data-theme', switchToTheme)
  }
})
```

### Conclusion

In this article, we've covered how to create a Dark mode using CSS and JavaScript along with a switch in a simple way. Now we can perform many styles to switch button and font style and more as you like. Finally, we saw how we can create a dark mode using CSS and javascript and we can include it in our projects and websites also. And I hope I explained everything in detail and hands-on. See you in the next article until then 
Happy Coding!

---
Peer Review Contributions by: 
