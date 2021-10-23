---
layout: engineering-education
status: publish
published: true
url: /watch-for-system-dark-mode-using-js-css/
title: How to Watch for System Dark Mode Changes Using JavaScript and CSS
description: In this article, we will learn how to watch for system dark mode changes using JavaScript and CSS. We will use the matchMedia function to detect if the system is in dark mode.
author: magdaline-kariuki
date: 2021-09-20T00:00:00-02:40
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/watch-for-system-dark-mode-using-js-css/hero.png
    alt: Dark Mode Image Example
---
Dark mode is one of the most necessary features of the web. Many people prefer it because it is easy on the eyes. In this tutorial we will learn how to use Javascript and CSS to detect when the system dark mode is enabled, and change the colors of the page accordingly.
<!--more-->
Most modern browsers change their color scheme according to the operating system theme. This tutorial assumes that your browser falls in this category.

If your browser does not change the color scheme according to the operating system theme (for example, in case you are using custom GTK themes in Ubuntu), you can manually change the browser color scheme in the browser settings.

In the first part of this tutorial, we will learn how to detect the system dark mode using JavaScript. In the second part, we will detect the system dark mode using CSS.

### Using Javascript
In this part we will learn how to detect the system dark mode using Javascript.

Create a new file named `index.html` and open it in your code editor.

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

We have created a simple HTML file containing a `<div>` element with an `id` of `content`. We will use this element to display the text `Hey there`.

Let's create the CSS to be toggled.

```css
.dark {
	color: #fff;
}

.light {
	color: #000;
}
```

Create a new file named `script.js` and open it in your code editor.

Add the following code to the file:

```javascript
let dark = window.matchMedia("(prefers-color-scheme: dark)").matches;
console.log(matched);

let body = document.querySelector("body");
let content = document.getElementById("content");

if (dark) {
	body.style.backgroundColor = "#1a1a1a";
	content.setAttribute("class", "dark");
} else {
	body.style.backgroundColor = "#f5f5f5";
	content.setAttribute("class", "light");
}
```

We first create a variable called `dark` and assign it to the `window.matchMedia` function. This function will return a `MediaQueryList` object. This object will contain a `matches` property that will be `true` if the system dark mode is enabled.

We then create a variable called `body` and assign it the `document.querySelector` function. This function will return the first element that matches the specified selector. In this case, we are selecting the `body` element.

We then create a variable called `content` and assign it to the `document.getElementById` function. This function will return the first element that matches the specified id. In this case, we are selecting the `content` element.

We then check if the `dark` variable is `true`. If true, we set the `body` background color to `#1a1a1a`, and the `content` element's `class` attribute to `dark`. If not, we set the `body` background color to `#f5f5f5`, and the `content` element's `class` attribute to `light`.

Open `index.html` in your browser to see the result.

One thing to note about this method is that the change is not realtime. The change will only be applied after the page is reloaded.

To fix this, we can use the `addEventListener` function, as shown below.

```javascript
let body = document.querySelector("body");
let content = document.getElementById("content");

window
	.matchMedia("(prefers-color-scheme: dark)")
	.addEventListener("change", function (e) {
		const colorScheme = e.matches ? "dark" : "light";
		console.log(colorScheme);

		if (colorScheme === "dark") {
			body.style.backgroundColor = "#1a1a1a";
			content.setAttribute("class", "dark");
		} else {
			body.style.backgroundColor = "#f5f5f5";
			content.setAttribute("class", "light");
		}
	});
```

We add an event listener to the `window` object. The `addEventListener` function takes two arguments: the event name and a callback function.

The event name is `change` and the callback function is the `e` variable. The `e` variable is an object that contains information about the event.

In this case, we are interested in the `matches` property of the `e` object. If the system dark mode is enabled, the `matches` property will be `true`.

You can now open `index.html` in your browser to see the result.

The example above features a very basic implementation of the dark mode detection.

To use it in a real world app; where a lot of CSS needs to be changed, you can replace the code in the `if else` block with a function that will load the correct CSS file.

```javascript
let loadColorScheme = (scheme) => {
	let head = document.getElementsByTagName("head")[0];
	let link = document.createElement("link");

	link.type = "text/css";
	link.rel = "stylesheet";
	link.href = `./css/${scheme}.css`;

	head.appendChild(link);
};
// assuming the if else block is inside window.matchMedia()
if (colorScheme === "dark") {
	loadColorScheme("dark");
	// loads /css/dark.css
} else {
	loadColorScheme("light");
	// loads /css/light.css
}
```

### Using CSS
CSS has improved over time adding more capabilities to web browsers. It is now possible to use the `prefers-color-scheme` media query.

The `prefers-color-scheme` media query allows us to detect whether the system dark mode is enabled. It is a very useful feature that will allow us to change the colors of the page accordingly.

This media query will return `true` if the system dark mode is enabled. It will return `false` if the user is using a light theme.

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

This CSS code will set the `body` background color to `#f5f5f5`, and the font color to dark grey; if the system dark mode is disabled. Otherwise, it will set the `body` background color to dark grey and the font color to white.

This method responds in realtime to change in the system dark mode.

> This method will not work on Internet Explorer.

### Conclusion
In this tutorial, we learned how to detect the system dark mode using JavaScript and CSS.

When building web apps, you can either use JavaScript or CSS to detect the system dark mode.

Happy coding!

---

Peer Review Contributions by: [Geoffrey Mungai](/engineering-education/authors/geoffrey-mungai/)
