### Watching for system dark mode changes using JavaScript and CSS
Dark mode is one of the most neccesary features of the web. Many people prefer it because it's easy on the eyes.

In this tutorial we will learn how to use JavaScript and CSS to detect when the system dark mode is enabled and change the color of the page accordingly.

In the first part of this tutorial we will learn how to detect the system dark mode using JavaScript. In the second part we will detect the system dark mode using CSS.

### 1. Using JavaScript
In this  part we will learn how to detect the system dark mode using JavaScript.

Create a new file `index.html` and open it in your code editor. 

Add the following code to the file:

```html
<!DOCTYPE html>
<head>
    <title>Some title</title>
</head>
<body>
    <div id="content">
        <h1>Hey there</h1>
    </div>
</body>
<script src='./script.js'></script>
</html>
```

We have created a simple HTML file with a `<div>` element with an `id` of `content`. We will use this element to display the text `Hey there`.

Let's create the CSS to be toggled using JavaScript.

```css
.dark{
    color: #fff;

}

.light {
    color: #000;
}
```

Create a new file `script.js` and open it in your code editor.

Add the following code to the file:

```javascript
let dark = window.matchMedia('(prefers-color-scheme: dark)').matches;
console.log(matched);

let body = document.querySelector('body');
let content = document.getElementById('content');

if (dark) {
    body.style.backgroundColor = '#1a1a1a';
    content.setAttribute('class', 'dark');
} else {
    body.style.backgroundColor = '#f5f5f5';
    content.setAttribute('class', 'light');
}
```
We first create a variable called `dark` and assign it to the `window.matchMedia` function, that will return a `MediaQueryList` object. This object will contain a `matches` property that will be `true` if the system dark mode is enabled.

We then create a variable called `body` and assign it the `document.querySelector` function, which will return the first element that matches the stated selector. In this case, we are selecting the `body` element.

We then create a variable called `content` and assign it to the `document.getElementById` function. This function will return the first element that matches the stated id. In this case we are selecting the `content` element.

We then check if the `dark` variable is `true`. If it is, we set the `body` background color to `#1a1a1a` and set the `content` element's `class` attribute to `dark`. If it is not, we set the `body` background color to `#f5f5f5` and set the `content` element's `class` attribute to `light`.

You can now open `index.html` in your browser and see the result.

One thing to note about this method is: the change is not realtime. The change will only be applied after the page is reloaded.

To fix this, we can use the `addEventListener` function, as shown below.

```javascript
let body = document.querySelector('body');
let content = document.getElementById('content');

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function(e) {
    const colorScheme = e.matches ? 'dark' : 'light';
    console.log(colorScheme);

    if (colorScheme === 'dark') {
        body.style.backgroundColor = '#1a1a1a';
        content.setAttribute('class', 'dark');
    } else {
        body.style.backgroundColor = '#f5f5f5';
        content.setAttribute('class', 'light');
    }
})
```

We add an event listener to the `window` object. The event name and a callback function are passed to the `addEventListener` function as parameters.

The event name is `change` and the callback function is the `e` variable. The `e` variable is an object that contains information about the event. In this case, we are interested in the `matches` property of the `e` object. If the system dark mode is enabled, the `matches` property will be `true`.

You can now open `index.html` in your browser and see the result.

### Using CSS
In this part of the tutorial, we will learn how to detect the system dark mode using CSS.

CSS has improved over time add more features to web browsers. It is now possible to use the `prefers-color-scheme` media query. This media query will return `true` if the system dark mode is enabled.

Using the Html in the first part of this tutorial, let's see how you can detect the system dark mode using CSS.

```css
@media (prefers-color-scheme: light) {
    body {
        background-color: #f5f5f5;
        color: #222;
    }
}

@media (prefers-color-scheme: dark) {
    body {
        background-color: #222;
        color: #fff;
    }
}
```

This CSS code will set the `body` background color to `#f5f5f5` if the system dark mode is disabled. If it is not, it will set the `body` background color to `#222`.

This method is responds in realtime to change in the system dark mode.

### Conclusion
In this tutorial, we learned how to detect the system dark mode using JavaScript and CSS.

When building web apps, you can either use JavaScript or CSS to detect the system dark mode. You can use either CSS or you can decide to get your hands dirty using a little JavaScript.

Happy coding!