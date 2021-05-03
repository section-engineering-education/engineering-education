JavaScript is a programming language for creating basic and advanced web page features. With JavaScript, you can make a website interactive.
JavaScript can be directly written into a web page's HTML and run as the page loads. They are often delivered and executed in plain text format. There is no need for and robust or any particular configuration for scripts to run.
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

JavaScript is a programming language that empowers you to make enormous applications. It can likewise be utilized to make web games with dynamic styling, movement, and different highlights, including recognizing when catches are squeezed, or information is gone into structures.

JavaScript is a prearranging language with a ton of solidarity. Developers have composed various tools utilizing JavaScript on top of the core engine, which opens a tremendous measure of usefulness with negligible exertion.

Some of these tools include:

- Libraries and frameworks made by third parties can be utilized with HTML to accelerate the formation of uses.
- Developers may use third-party APIs to incorporate functionality from other websites, such as Twitter or Facebook, into their own.
- APIs (Application Programming Interfaces) are capacities incorporated into internet browsers that permit you to access different features.
  
With JavaScript, you can make a website interactive. The programs written in this language are referred to as scripts. They can be written into the HTML of a web page which executes as the page loads. Thus, there is no need for and robust or any particular configuration for scripts to run.
<!--more-->
Therefore, building a background generator with JavaScript is quite simple.

### What Are Gradients

A gradient is a reformist change starting from one colour to another. It gives anyone the ability almost to invent a new color. It adds a new dimension to the design and realism to the product, making it stand out. Gradients, to put it simply, add dimension.

The gradient pattern can be used in a variety of ways. It can be a focal point of a design or a background feature, and it can be bold or subtle. Gradients can also create new colour combinations that feel different and modern by mixing and blending different shades of colour, giving designs a unique feel.

Gradients can be used for creating logos, packaging, web design, apps, and Print materials.

### Benefits of Gradients

1. By creating more colour tones, gradients increase the number of colours available.

2. Gradients are memorable because they are lively and playful, and they create images that we aren't used to seeing.

3. These stunningly vivid colour transitions have a lot of energy, which makes them stand out and helps to elevate any style.

4. CSS gradients permit you to make consistent changes between at least two tones.

### Types of Gradients

- The Linear Gradients (Which goes down/up/left/right/diagonally direction).
- The Radial Gradients (which is defined by their centre).

#### Linear Gradients (moves down/up/left/right/diagonally)

You'll require two shading stops to make a linear gradient. Shading stops are the tones between which you need to deliver smooth advances. You may likewise determine a beginning stage and a heading notwithstanding the inclination impact (or a point).

**Syntax**
`background-image: linear-gradient(direction, color-stop1, color-stop2, ...);`

Example
`#grad {
  background-image: linear-gradient(red, yellow);
}`

**Direction (default)**
The example below shows a linear gradient that starts at the top. It starts red and gradually turns yellow:

![top](/engineering-education/how-to-build-a-background-generator-with-javaScript/linear-example.png)

**Direction - From Left to Right**

Example
`#grad {
  background-image: linear-gradient (to right, red , yellow);
}`

A linear gradient that starts on the left is shown in the illustration below. It starts red and gradually turns yellow:

![left](/engineering-education/how-to-build-a-background-generator-with-javaScript/linear-example-2.png)

**Direction - Diagonal**

You may make a diagonal gradient by determining both the level and vertical beginning positions.

Example
`#grad {
  background-image: linear-gradient (to the bottom right, red, yellow);
}`

The outline beneath portrays a direct slope at the upper left (and goes to the base right). It begins red and progressively becomes yellow:

![diagonal](/engineering-education/how-to-build-a-background-generator-with-javaScript/linear-example-3.png)

**Using Angles**

You can determine a point rather than the predefined bearings if you need more authority over the slope's course (to base, to top, to the right, to the left, to base right, and so on). "To the top" is equal to a value of 0deg. A value of 90 degrees equals "to the right." 180 degrees is the same as "to the floor."

Example

`#grad {
  background-image: linear-gradient(180deg, red, yellow);
}`

The example below demonstrates how to use angles on linear gradients:

![angles](/engineering-education/how-to-build-a-background-generator-with-javaScript/linear-example-4.png)

#### Radial Gradients

The centre of a radial gradient defines it.
At any rate, two shading stops are expected to make a radial gradient.

**Syntax**

`background-image: radial-gradient(shape size at position, start-color, ..., last-color);
`

The form is an ellipse by design, with the scale set to the farthest corner and the location set to the middle.

**Radial Gradient - The Evenly Spaced Color Stops (default)**

Example
`#grad {
  background-image: radial-gradient(red, yellow, green);
}`

A radial gradient with equally spaced colour stops is shown in the illustration below:

![radial](/engineering-education/how-to-build-a-background-generator-with-javaScript/radial-example.png)

**Radial Gradient - The Differently Spaced Color Stops**

Example
`#grad {
  background-image: radial-gradient(red 5%, yellow 15%, green 60%);
}`

An outspread inclination of distinctively dispersed shading stops appears in the outline underneath:

![radial spaced](/engineering-education/how-to-build-a-background-generator-with-javaScript/radial-example-2.png)

**Set Shape**

The shape parameter defines the shape. It may take the shape of a circle or an ellipse as a value. The ellipse value is the norm.

Example

`#grad {
  background-image: radial-gradient(circle, red, yellow, green);
}`

A radial gradient in the form of a circle is shown in the illustration below:

![radial set shape](/engineering-education/how-to-build-a-background-generator-with-javaScript/radial-example-3.png)

### Integrate JavaScript on web page

Now, let's see how to integrate javascript on a web page.

1. Open the code in Visual Studio. navigate to any directory on your computer, then type in the following commands in the terminal:

```Bash
code.
```

> Note: if you don't have Visual Studio Code installed on your device, `code.` won't work.

2. Type the following command to create index.html, style.css, and script.js:

- Windows power shell

```Bash
    ni index.html,style.css,script.js
```

- Linux

  ```Bash
  touch index.html,style.css,script.js
  ```

3. Inside the index.html With the following fragment, we need to build a simple html page:

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
<h2>The CSS History Currently...</h2>
<h4></h4>
```

### Step 3 - Link your `style.css` by adding the reference in `index.html.`

```html
 <link rel="stylesheet" type="text/css" href="style.css">
```

### Step 4 - Add the below snippet to the `style.css` we created earlier

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

### Step 5 - Navigate to your browser

If you don't have anything that looks like the picture below, please check if you skipped any of the steps above.

![browser image](/engineering-education/how-to-build-a-background-generator-with-javaScript/browser-img.png)

### Step 6 - Navigate to the `scrpt.js` let's add some Javascript action

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

### Step 7 - Your `index.html`, `style.css` and `script.js` should look similar to the snippet shown below

`Index.html`

```HTML

<!DOCTYPE html>
<html>
<head>
 <title>Gradient Background</title>
 <link rel="stylesheet" type="text/css" href="style.css">
</head>
<body id="gradient">
 <h3>How to Buld a Background Generator with JavaScript</b></h3>
 <input class="color1" type="color" name="color1" value="#00ff00">
 <input class="color2" type="color" name="color2" value="#ff0000">
 <h2>The Current CSS Background ..</h2>
 <h4></h4>
 <script type="text/javascript" src="script.js"></script>
</body>
</html>
```

`style.css`

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

`script.js`

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

### Step 8 - Navigate to the browser and see JavaScript in action after selecting a favourite colour on both inputs

Example:
![browser image](/engineering-education/how-to-build-a-background-generator-with-javaScript/browser-img-2.png)

Congratulations 🎉🎉

You can choose or tone any colour to achieve your desired colour and create incredible things with it.

### Conclusion

In this article, you learned about JavaScript, what Gradients are, the advantages of Gradients, and how to build a web-based context generator using JavaScript.
Different forms of gradients were also discussed and how to use them on the web.

Happy coding!

### Resources

- [Developer Mozilla Site](https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/JavaScript_basics)
- [Gradients by W3schools](https://www.w3schools.com/css/css3_gradients.asp)