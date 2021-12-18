---
layout: engineering-education
status: publish
published: true
url: /dynamically-update-react-and-javascript-with-css-variables/
title: Dynamically Update React and JavaScript with CSS Variables
description: In this article, the reader will learn how to dynamically update React.js and other JavaScript applications with custom CSS properties.
author: francis-kaguongo
date: 2021-11-24T00:00:00-11:30
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/dynamically-update-react-and-javascript-with-css-variables/hero.png
    alt: Dynamically Update React and JavaScript with CSS Variables Hero Image
---
While one might be familiar with using CSS variables with something like [SASS](https://sass-lang.com), custom properties are native CSS implementation of using the variables right inside the browser.
<!--more-->
There are three main methods applied to use these custom variables. These include defining the double hyphen(`--`) prefixes on them, stating the variable's name, and prefixing it with the **var** keyword. Representing it on an element or on a selector (this will make it be cascaded only within the scope).

The custom CSS variables are used in JavaScript and JavaScript frameworks.

In this article, we will learn how to use CSS Custom properties that dynamically update based on the change of state. This knowledge helps one to modify JavaScript UI component properties as the variables state changes.

### Table of contents
- [Key takeaways](#key-takeaways)
- [Prerequisites](#prerequisites)
- [Create a new React app](#create-a-new-react-app)
  - [Folder Structure](#folder-structure)
- [Adding a Custom Variable to change the React logo color](#adding-a-custom-variable-to-change-the-react-logo-color)
- [Getting property of a CSS custom property with JavaScript](#getting-property-of-a-css-custom-property-with-javascript)
- [Setting up the value of a CSS custom property with JavaScript](#setting-up-the-value-of-a-css-custom-property-with-javascript)
- [Dynamically resizing the Logo with a custom CSS Property](#dynamically-resizing-the-logo-with-a-custom-css-property)
- [Speeding up a CSS animation by updating a CSS custom property](#speeding-up-a-css-animation-by-updating-a-css-custom-property)
- [Conclusion](#conclusion)
- [References](#references)

### Key takeaways
- Set up the custom variables in a JavaScript framework such as React.js.
- Fetch the properties of the variables used.
- See how to use the custom variables during state changes and events.
- Use the variables to update component properties dynamically.
- Configure the variables to change with the application state dynamically.

### Prerequisites
For the reader to follow along, they will need the following:
- Previous hands-on React.js experience.
- Previous experience in webpage design.
- React.js environment already set up on the machine in use.
- A good JavaScript IDE or editor.
- A stable internet connection.
- CSS knowledge.

If all are in place, let's get started.

These are the steps that we will follow in the process:
1. Create a new React.js app.
2. Adding a custom variable to change the React.js logo color.
3. Getting property of a CSS custom property with JavaScript.
4. Setting up the value of a CSS custom property with JavaScript.
5. Dynamically resizing the logo with a custom CSS Property.
6. Speeding up a CSS animation by updating a CSS custom property.

### Create a new React app
- Head over to the folder location where the project will be.

Create the app by running the command below on the terminal:

```bash
npx create-react-app my-custom-properties
```

That will create an app named `my-custom-properties`.

- Open it up and do a test run using the following command:

```bash
cd my-custom-properties
npm start
```

- Access it via `http://localhost:3000/`.
- If you are using VS Code, open it up using the `code .` command.

#### Folder structure
The app should have the following folder structure:

```bash
.
├── node_modules
├── public
├── src
│   ├── App.css
│   ├── App.js
│   ├── App.test.js
│   ├── index.css
│   ├── index.js
│   ├── logo.svg
│   ├── reportWebVitals.js
│   └── setupTests.js
├── .gitignore
├── package.json
├── package-lock.json
└── README.md
```

### Adding a custom variable to change the React logo color

To do this, follow the steps below:
- To target the SVG file used as the centered logo image, copy-paste it from the `logo.svg` file into the `App.js` file. Do this under the header tag in new `p` tags. Set its *className* to `App-logo`.
- Delete the last line that imported the image source. Doing this makes the SVG to be an inline SVG file.

The result of these two steps are shown below inside the header tag:

```html
<header className="App-header">
    <p>
    {/*Insert the SVG here*/}
        <svg className="App-logo" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 841.9 595.3"><g fill="#61DAFB"><path ... ><path d="M520.5 78.1z"/></g></svg>
    </p>
    <p>
        ...
    </p>
    <a>
        ...
    </a>
</header>
```

- To verify that it uses the inline image, delete the `logo.svg` file and refresh the app.
- Open the webpage using the Inspect mode in the browser by first right-clicking anywhere on the page, then selecting the `Inspect` option.

Notice that the SVG is inside the following tag, `<g></g>`.

![Inspect the SVG element in browser](/engineering-education/dynamically-update-react-and-javascript-with-css-variables/g-tag-svg-element.png)

Unlike text, SVG color property can't be accessed using the `color` attribute. It is rather referenced by using the `fill` property as shown below:

![Red fill](/engineering-education/dynamically-update-react-and-javascript-with-css-variables/red-fill.png)

- In the `App.css` file, create a new styling to apply the Red color fill to the SVG under the `App-logo` class as shown below:

```CSS
.App-logo g {
    fill: red;
}
```

This code applies the fill effect to the app.

- Open up the `index.css` file. Define the CSS variables here.

Use the `root` element so that the variables may be visible in the entire application. For example, a variable to hold the color property.

```CSS
:root{
    --logo-color: red;
    }
```

The good thing about variables is that they use easy-to-understand names, hence can be reused several times without errors.

To change the variable's scope, refer to the element into which it is bound. The component will replace the root position.

- Set the app logo to rely on the set variable for color property. 

Do this in the `App.css` file:

```css
.App-logo g {
    fill: var(--logo-color);
}
```

- Refresh the browser. The logo doesn't change. This step proves that all is well.
- In case of fallbacks, which may occur when the variable is not set yet or can't be found, use the following code syntax to specify another option:

```css
.App-logo g {
    fill: var(--logo-color, aqua);
}
```

Try it by removing the variable from the application and refreshing the webpage. Once re-run, return the app variable to its initial state.

### Getting property of a CSS custom property with JavaScript
To get the value dynamically inside the variables, do the following:

- In the App.js file, import the `useEffect` from React as shown below:

```js
import { useEffect } from "react";
```

This allows the app to run client-side code outside the scope of the React rendering component.

Inside the `App()` function, add the *useEffect* hook, grab the variable, and run it for the first time by using `[]`.

- Since no behavior is added in the block quotes, it prevents the re-firing of the application in each render.

That is due to lack of values passed to it:

```js
useEffect(() => {
}, []);
```

- In it, create a constant that uses the `getComputedStyle()` function to fetch the value of its style.
- Pass the root element (`document.documentElement`) as an argument, along with the `--logo-color` variable. 

Get the variable property value as shown below:

```js
const color = getComputedStyle(document.documentElement).getPropertyValue('--logo-color');
console.log(color);
```

When the page is refreshed, the application will log out the variable's value inside the root element in the console.

![Log out the value of the variable](/engineering-education/dynamically-update-react-and-javascript-with-css-variables/console-log.png)

Try changing the color from red to orange and refresh the page.

> Notice that when the color is changed, e.g. yellow, it doesn't immediately log it out, though the results are already applied to the SVG.

This is because the `useEffect` hook is running only on the first instance. This requires another page refresh for it to be reflected.

### Setting up the value of a CSS custom property with JavaScript
- In the *App.js* file, under the *useEffect* function, create a function that sets the color of an element to the one passed as an argument.
- It will set the style property that is passed in the `--logo-color` variable with the new one passed as an argument. 

The two steps are shown in the code below:

```js
function setColor (newColor){
    document.documentElement.style.setProperty('--logo-color', newColor);
}
```

- Delete the code below in the *App.js* file:

![Delete the code shown](/engineering-education/dynamically-update-react-and-javascript-with-css-variables/delete-code.png)

Replace it with the following code that creates three buttons that can instantly set the color of the app logo to the one defined in each.

```html
<p>
    <button onClick={() => setColor('orange')}>orange</button>
    <button onClick={() => setColor('blueviolet')}>blueviolet</button>
    <button onClick={() => setColor('red')}>red</button>
</p>
```

This is just a simple way to change the variable values.

### Dynamically resizing the logo with a custom CSS Property
Now, what about changing the value of the variables dynamically based on an actual input value?

Do this as follows:

- Create another variable in the `index.css` file. It will be named `--logo-size`, and it shall hold the size of the logo. The `App.css` file defined the initial logo size as '_40vmin_' as seen in the file under the `App-logo` class.

```css
--logo-size: 40vmin;
```

- Modify so that one may obtain the height of the logo from the variable set.

```css
.App-logo {
  height: var(--logo-size);
  pointer-events: none;
}
```

- Create an input of the *range* type. It will have a range of 0 to 100, and a *defaultValue* of `--logo-size`. Do this above the `p` tags holding the SVG.

```html
<p>
    <input name="size" min="0" max="100" type="range" defaultValue="40" onChange={handleOSizeChange}/>
</p>
```

- Create a function that handles the change of the value of the input of the type `range`. It will then set the value of the current position of the range input dynamically per each change. It will also return the current value in the browser console. 

Create it under the `setColor()` method:

```js
    function handleOSizeChange(event) {
    console.log(event.currentTarget.value);
    document.documentElement.style.setProperty('--logo-size', event.currentTarget.value);
}
```

- Refresh the page and adjust the size of the input range to see if all is well. The app will automatically increase or decrease the logo size as it is made to slide in the right or left direction. This automatically updates whenever the range slider is moved.

![Dynamically update the logo size](/engineering-education/dynamically-update-react-and-javascript-with-css-variables/dynamic-logo-size.png)

### Speeding up a CSS animation by updating a CSS custom property
What if one would like to increase the speed of the animation per each click? Then at a specific rate, it will reset to the default speed.

Accomplish the above by following the steps below:

- Create a new variable named `logo-speed`. It shall contain the value previously stored in the 'animation' property of the App-logo class found media query.

```css
--logo-speed: 20s;
```

- Set the logo to use this property.

```css
@media (prefers-reduced-motion: no-preference) {
    .App-logo {
        animation: App-logo-spin infinite var(--logo-speedTiming) linear;
    }
}
```

- Add a function to the App.js file that increases the animation speed stored in the '_--logo-speed_' variable on each click. It then resets the speed to the default one.

> Remember that when the value is fetched from the variable, it has the `s` letter at its end. This makes it hard to do computation. Therefore, it will be removed and later returned.

```js
function onSVGClick() {
    const timing = getComputedStyle(document.documentElement).getPropertyValue('--logo-speedTiming').replace('s', '');

    let newTiming = timing;

    /*Reset point*/
    if (newTiming < 0.5){
        newTiming = 20;
    } else {
        newTiming = newTiming / 2;
    }
    
    document.documentElement.style.setProperty('--logo-speedTiming', `${newTiming}s`);
}
```

- Target the SVG through the paragraph that encloses it. Targeting the SVG directly is quite tricky, pass it through the paragraph.

```js
<p onClick={onSVGClick}>
    <svg className="App-logo" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 841.9 595.3">
        <g fill="#61DAFB">
            ...
        </g>
    </svg>
</p>
```

- Re-run the application and click on the logo at a constant rate.

The speed of the logo will continuously speed up until it reaches a reset point.

The app will run as shown here:

![Run the application](/engineering-education/dynamically-update-react-and-javascript-with-css-variables/run-app.gif)

In the above function, the variables have been dynamically fetched and updated per event changes.

All the things above, such as changing the color, size, and speed of rotation in the application, are examples of how CSS variables can be dynamically updated to create excellent effects.

This gives us an idea of how to implement it in the application in a very intuitive way to meet needs in a React or JavaScript application.

### Conclusion
Congratulations on making it this far, this means that we have learned the following:
- How to set up the custom variables in a JavaScript framework such as React.
- Get the fetch the properties of the variables used.
- Know how to use the custom variables during state changes and events.
- How to use the variables to update component properties dynamically.
- How to configure the variables to change with the application state dynamically.

Happy coding.

You can view the full project [here](https://github.com/franciskaguongo/Dynamically-Update-React-and-Javascript-with-CSS-Custom-Properties).

Happy coding!

### References
- [React useEffect hooks](https://reactjs.org/docs/hooks-reference.html) documentation.

---
Peer Review Contributions by: [Srishilesh P S](/engineering-education/authors/srishilesh-p-s/)
