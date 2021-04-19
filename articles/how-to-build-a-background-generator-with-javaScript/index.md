JavaScript is a programming language that lets you create complex web page features. JavaScript was designed to "bring web pages to life."
Scripts are the name for the programs written in this language. They can be written directly in the HTML of a web page and run as the page loads. They are also delivered in plain text format and executed as such. They don't need any special set up or compilation to run.
<!--more-->
Therefore, building a background generator with JavaScript is quite simple.

### Table of Contents

- Introduction to JavaScript.
- What Are Gradients.
- Benefits of Gradients.
- Types of Gradients.
- Integrate JavaScript on the web page.
- Develop a Background generator with Javascript.
- Resources.
- Conclusion.

### Introduction to JavaScript

JavaScript is a programming language that lets you create complex applications. It can also be used to create web games with dynamic styling, animation, and other features such as when buttons are pressed or data is entered on forms.

JavaScript is a powerful scripting language. On top of the core JavaScript language, developers have written numerous tools that unlock a vast amount of functionality with minimal effort.

Some of these tools include:

- Third-party frameworks and libraries that can be used with HTML to speed up the development of applications.
- Third-party APIs allow developers to integrate features from other content providers such as Twitter or Facebook, into their websites.
- Browser Application Programming Interfaces (APIs) are functions built into web browsers that allow you to access different features.
  
JavaScript was designed to "bring web pages to life." Scripts are the name for the programs written in this language. They can be written directly in the HTML of a web page and run as the page loads. They are also delivered in plain text format and executed as such. They don't need any special set up or compilation to run.
<!--more-->
Therefore, building a background generator with JavaScript is quite simple.

### What Are Gradients

The gradual transition from one color to another is known as a gradient. It gives anyone the ability to almost invent a new color. It adds a new dimension to the design and realism to the product, which makes it stand out. Gradients, to put it simply, add dimension.

The gradient pattern can be used in a variety of ways. It can be a focal point of a design or a background feature, and it can be bold or subtle. Gradients can also create new color combinations that feel different and modern by mixing and blending different shades of color, giving designs a completely unique feel.

Gradients can be used for creating logos, packaging, web design, apps, and Print materials.

### Benefits of Gradients

1. Gradients increase the number of colors available by creating more color tones.

2. Gradients are memorable because they are lively and playful, and they create images that we aren't used to seeing.

3. These stunningly vivid color transitions have a lot of energy, which makes them stand out and helps to elevate any style.

4. Gradients in CSS allow you to create smooth transitions between two or more colors.

### Types of Gradients

- Linear Gradients (goes down/up/left/right/diagonally).
- Radial Gradients (defined by their center).

#### Linear Gradients (goes down/up/left/right/diagonally)

You'll need at least two color stops to make a linear gradient. The colors you want to make seamless transitions between are known as color stops. Along with the gradient effect, you can also set a starting point and a direction (or an angle).

**Syntax**
`background-image: linear-gradient(direction, color-stop1, color-stop2, ...);`

Example
`#grad {
  background-image: linear-gradient(red, yellow);
}`

**Direction - Top to Bottom (this is the default)**
A linear gradient that begins at the top is shown in the example below. It begins red and progresses to yellow:

![top](/engineering-education/how-to-build-a-background-generator-with-javaScript/linear-example.png)

**Direction - Left to Right**

Example
`#grad {
  background-image: linear-gradient(to right, red , yellow);
}`

The example below shows a linear gradient that begins on the left. It begins red and progresses to yellow:

![left](/engineering-education/how-to-build-a-background-generator-with-javaScript/linear-example-2.png)

**Direction - Diagonal**

By defining both the horizontal and vertical starting positions, you can create a diagonal gradient.

Example
`#grad {
  background-image: linear-gradient(to bottom right, red, yellow);
}`

A linear gradient that begins at the top left is shown in the illustration below (and goes to the bottom right). It begins red and progresses to yellow:

![diagonal](/engineering-education/how-to-build-a-background-generator-with-javaScript/linear-example-3.png)

**Using Angles**

You can specify an angle instead of the predefined directions if you want more control over the gradient's direction (to bottom, to top, to right, to left, to bottom right, etc.). "To the top" is equal to a value of 0deg. A value of 90 degrees equals "to the right." 180 degrees is the same as "to the floor."

Example

`#grad {
  background-image: linear-gradient(180deg, red, yellow);
}`

The following example shows how to use angles on linear gradients:

![angles](/engineering-education/how-to-build-a-background-generator-with-javaScript/linear-example-4.png)

#### Radial Gradients

The center of a radial gradient defines it.
A radial gradient requires at least two color stops to be formed.

**Syntax**

`background-image: radial-gradient(shape size at position, start-color, ..., last-color);
`

By default, the shape is an ellipse, the size is farthest-corner, and the position is center.

**Radial Gradient - Evenly Spaced Color Stops (this is the default)**

Example
`#grad {
  background-image: radial-gradient(red, yellow, green);
}`

The following example shows a radial gradient with evenly spaced color stops:

![radial](/engineering-education/how-to-build-a-background-generator-with-javaScript/radial-example.png)

**Radial Gradient - Differently Spaced Color Stops**

Example
`#grad {
  background-image: radial-gradient(red 5%, yellow 15%, green 60%);
}`
The following example shows a radial gradient with differently spaced color stops:

![radial spaced](/engineering-education/how-to-build-a-background-generator-with-javaScript/radial-example-2.png)

**Set Shape**

The shape is defined by the shape parameter. It may take the shape of a circle or an ellipse as a value. The ellipse value is the norm.

Example

`#grad {
  background-image: radial-gradient(circle, red, yellow, green);
}`

The following example shows a radial gradient with the shape of a circle:

![radial set shape](/engineering-education/how-to-build-a-background-generator-with-javaScript/radial-example-3.png)

### Integrate JavaScript on web page

Now, let's see how to integrate javascript on a web page.

1. Open visual studio code, navigate to any Directory of your choice on your pc, in the terminal, type:

```Bash
code.
```

> Note: `code .` won't work if you don't have visual studio code installed on your system

2. Create index.html, style.css, and script.js, by typing the following command:

- Windows power shell

```Bash
    ni index.html,style.css,script.js
```

- Linux

  ```Bash
  touch index.html,style.css,script.js
  ```

3. Inside the index.html we need to setup a basic html page with the following snippet:

```html
<!DOCTYPE html>
<html>
<head>
 <title>Gradient Background</title>
</head>
<body id="gradient">
 <h3>How to Buld a Background Generator with Javascript</h3>

</body>
</html>
```

4. Let's integrate Javascript by referencing the script file we created earlier.

Add `<script type="text/javascript" src="script.js"></script>` to `index.html`

### Develop a Background generator with Javascript

Now that we've covered the basics of JavaScript and gradients, it's time to use JavaScript to build a background generator.

### Step 1 - Add input tag to the `index.html` we created earlier

```html
<!DOCTYPE html>
<html>
<head>
 <title>Gradient Background</title>
</head>
<body id="gradient">
 <h3>How to Buld a Background Generator with Javascript</h3>
 <input type="color" name="color1" value="#00ff00">
 <input type="color" name="color2" value="#ff0000">
</body>
</html>
```

### Step 2 - Add class to the input tag and also `<h2></h2>` and `<h4></h4>`

We added the h4 tag to show the currently selected gradient, which you will see in action shortly.

```html
<input class="color1" type="color" name="color1" value="#00ff00">
<input class="color2" type="color" name="color2" value="#ff0000">
<h2>The Current CSS Background ..</h2>
<h4></h4>
```

### Step 3 - Add the below snippet to the `style.css` we created earlier

```css
body {
 font: 'Raleway', sans-serif;
    color: rgba(0,0,0,.5);
    text-align: center;
    text-transform: uppercase;
    letter-spacing: .5em;
    top: 15%;
 background: linear-gradient(to right, green , teal); /* Standard syntax */
}

h3 {
    font: 600 1.5em 'Raleway', sans-serif;
    color: rgba(0,0,0,.5);
    text-align: center;
    text-transform: uppercase;
    letter-spacing: .3em;
    width: 100%;
}

h2 {
 font: 900 1em 'Raleway', sans-serif;
    color: rgba(0,0,0,.5);
    text-align: center;
    text-transform: none;
    letter-spacing: 0.01em;

}

```

### Step 4 - Navigate to your browser

If you don't have anything that looks like the picture below, please check if you skipped any of the steps above.

![browser image](/engineering-education/how-to-build-a-background-generator-with-javaScript/browser-img.png)

### Step 5 - Navigate to the `scrpt.js` let's add some Javascript action

```javascript

// Define all the requried variables
var css = document.querySelector("h4");
var color1 = document.querySelector(".color1");
var color2 = document.querySelector(".color2");
var body = document.getElementById("gradient");

// Create a function to show the currently selected gradient
function setGradient() {
 body.style.background = 
 "linear-gradient(to right, " 
 + color1.value 
 + ", " 
 + color2.value 
 + ")";

 css.textContent = body.style.background + ";";
}

// Add Event listener to set gradient for both inputs
color1.addEventListener("input", setGradient);
color2.addEventListener("input", setGradient);
```

All should work fine because we already implemented JavaScript by adding a reference earlier.

### Step 6 - Navigate to the browser and see JavaScript in action after selecting a favorite color on both inputs

Example:
![browser image](/engineering-education/how-to-build-a-background-generator-with-javaScript/browser-img-2.png)

Congratulations 🎉🎉

You can choose or tone any color to achieve your desired color and create incredible things with it.

### Conclusion

You learned about JavaScript, what Gradients are, the benefits of Gradients, and how to build a background generator with JavaScript on the web in this post.
Some Gradients types were also highlighted, as well as how to use them on the web.

Happy coding!

### Resources

- [Developer Mozilla](https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/JavaScript_basics)
- [Gradients by W3schools](https://www.w3schools.com/css/css3_gradients.asp)