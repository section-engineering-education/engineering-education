---
layout: engineering-education
status: publish
published: true
url: /random-joke-generator-a-complete-guide/
title: Random Joke Generator in Javascript
description: In this tutorial, we will create a random joke generator using Javascript.
author: esther-maina
date: 2022-01-27T00:00:00-11:00
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/random-joke-generator-a-complete-guide/hero.jpg
    alt: Random Joke Generator in Javascript Hero Image
---
Application programming interface(API) enables one to get material from other websites and display it anywhere you wish.

<!--more-->

This tutorial will teach you how to design a javaScript joke generator utilizing API links, a fantastic project for beginner developers to practice learning JavaScript.

### Table of contents
- [Table of contents](#table-of-contents)
- [Prerequisites](#prerequisites)
- [Objectives](#objectives)
- [Random Joke Generator Project Example](#random-joke-generator-project-example)
  - [Step 1: Basic structure of the joke generator](#step-1-basic-structure-of-the-joke-generator)
  - [Step 2: Adding a title](#step-2-adding-a-title)
  - [Step 3: Set up the joke viewing zone](#step-3-set-up-the-joke-viewing-zone)
  - [Step 4: Set up the generate joke button](#step-4-set-up-the-generate-joke-button)
  - [Step 5: Activating the button](#step-5-activating-the-button)
- [Conclusion](#conclusion)
- [Further reading](#further-reading)

### Prerequisites
To follow this tutorial, the reader should have the following:
- Essential expertise in HTML, CSS, and JavaScript.
- A code editor, preferably [Visual Code Studio](https://code.visualstudio.com/).

### Objectives
By the end of this tutorial, learners should be able to:
- Design a basic `HTML` container to contain content.
- Connect API links to get data from other web pages.
- Assign actions to `HTML` buttons with `eventListeners` in `javaScript`.
- Develop a complete functional random joke generator.

### Random joke enerator project example
This project will generate random jokes using API links.

First, we will make a box on the web page and add a title. Then we will create an area in which all the joke generators will be seen.

Below the area will be a generate button that will generate a different joke each time it is clicked on.

We will not use any text manually. Here we will use an API link to collect all the information from other places with the help of the fetch method and then display it on the webpage with the help of textContent.

Create the following files:
- `index.html`
- `style.css`
- `app.js`

This is the file structure.

![Output file arrangement](/engineering-education/random-joke-generator-a-complete-guide/output-file-arrangement.png)

#### Step 1: Basic structure of the joke generator
We will start by setting up the basic structure of the joke generator. The `background-color` of our basic box will be `#0C0C0C` and it will be `550px` wide. We will use a border radius of `5px` to round the edges of the box. Refer to the snippet below:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Random Joke Generator</title>
  </head>
  <body>
    <!-- box -->
    <div class="box"></div>
  </body>
</html>
```

The box will be on the top center position of our page by setting its `position` to `absolute`, on the `left` side of our page, we will have `50%` as well as the `top` and lastly, we will `transform` and `translate` our box from the top and left as `-50%`.

```css
.box {
  width: 550px;
  padding: 40px 50px;
  background-color: #0c0c0c;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 5px;
}
```

The box should resemble the following picture in appearance.

![Output box](/engineering-education/random-joke-generator-a-complete-guide/output-box.png)

#### Step 2: Adding a title
The next step is to add a title.

The title is there to enhance the page's appearance. The title will be oriented center to keep it in the box and will be `24px` in font size. See the example below.

```css
span {
  display: block;
  text-align: center;
  font-size: 24px;
  letter-spacing: 1.5px;
  font-weight: 400;
}
```

After adding the title, we should have something close to this.

![Output title](/engineering-education/random-joke-generator-a-complete-guide/output-title.png)

#### Step 3: Set up the joke viewing zone
Moving on to the third task, we will create an area to load all our jokes. This will be made possible by using `<p>` tags.

There is no need for a specific height and its size will be automatically determined based on the size of the content in it. It will have `opacity` set to `0` to visually hide everything in this section.

```html
<div id="joke-section"></div>
```

```css
p {
  font-size: 16px;
  font-weight: 400;
  text-align: center;
  word-wrap: break-word;
  line-height: 35px;
  margin: 30px 0;
  opacity: 0;
}
```

Using `.content-fade` we will set the `opacity` to `1` which essentially means when the class `.content-fade` is effective we should be able to view our content.

```css
.content-fade {
  opacity: 1;
  transition: opacity 0.1s;
}
```

So far, we should have the following, as displayed below.

![Output joke container](/engineering-education/random-joke-generator-a-complete-guide/output-joke-container.png)

#### Step 4: Set up the generate joke button
This button will help us generate random jokes when clicked. We will design the button using the code snippet below.

```html
<input type="submit" id="btn" value="Generate Jokes" />
```

```css
#btn {
  display: block;
  background-color: #0354ab;
  border: none;
  padding: 5px;
  font-size: 17px;
  color: #ececec;
  padding: 12px 25px;
  margin: 0 auto;
  border-radius: 5px;
  cursor: pointer;
  outline: none;
}
```

Below is the output after adding the button.

![Output button](/engineering-education/random-joke-generator-a-complete-guide/output-btn.png)

#### Step 5: Activating the button
Since we have the required layout, it's time to implement this example with the help of javaScript. First, we must get the joke container and then generate joke button, as shown below.

```javascript
// get the joke section container
let jokeSection = document.querySelector("#joke-section");
// get the generate joke button
let generateBtn = document.querySelector("#btn");
```

The next thing we have to do is include an API in our project to fetch content from other websites. Refer to the following code snippet.

```javascript
let API =
  "https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,religious,political,racist,sexist,explicit&type=single";
```

Next, we will code a method and name it `acquireJoke`. This method will be ideal since it will help us achieve the following:
- First, we will eliminate class `.content-fade`, ensuring that nothing can be viewed with the help of `classList.remove`.
- The data obtained from the API using the fetch method will be arranged to display with the help of `textContent`.
- We will create a display using paragraph tags and add class `.content-fade` using `classList`. As a result, our text will be seen in the display.

```javascript
// method
function acquireJoke() {
  // remove content-fade class
  jokeSection.classList.remove("content-fade");
  // fetch joke from the API
  fetch(api)
    .then((info) => info.json())
    .then((item) => {
      jokeSection.textContent = `${item.joke}`;
      // add the content-fade class
      jokeSection.classList.add("content-fade");
    });
}
```

The last part is to assign the method we just created to display a joke whenever our button is clicked. The script will contain the code below.

```javascript
generateBtn.addEventListener("click", acquireJoke);
```

![Output joke](/engineering-education/random-joke-generator-a-complete-guide/output-joke.png)

### Conclusion
We have covered using API links to bring material from another website to your website and develop a random joke generator in javaScript.

You can access and download the complete source code for this practice project [here](https://github.com/EssyG10/random-joke-generator).

### Further reading
[Web APIs](https://developer.mozilla.org/en-US/docs/Web/API/Document/links)

Happy Coding!
---
Peer Review Contributions by: [Briana Nzivu](/engineering-education/authors/briana-nzivu/)
