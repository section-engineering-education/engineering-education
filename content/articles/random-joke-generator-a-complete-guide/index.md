---
layout: engineering-education
status: publish
published: true
url: /random-joke-generator-a-complete-guide/
title: Random Joke Generator in Javascript: A Complete Guide
description: In this tutorial, we will create a random joke generator using Javascript.
author: esther-maina
date: 2022-01-12T00:00:00-06:10
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/random-joke-generator-a-complete-guide/hero.jpg
    alt: Random Joke Generator in Javascript: A Complete Guide Hero Image
---

### Introduction

API connections enable you to get material from other websites and display it anywhere you wish. In this tutorial, you will learn how to design a javaScript joke generator utilizing API links which is an amazing project for begginer developers who may desire to fast produce lots of amusing jokes in what they have by far learnt in javaScript.

### Table of contents

- [Introduction](#introduction)
- [Table of contents](#table-of-contents)
- [Prerequesites](#prerequesites)
- [Objectives](#objectives)
- [About Example](#about-example)
- [Step-1: Basic structure of the Joke Generator](#step-1-basic-structure-of-the-joke-generator)
- [Step-2: Adding a title](#step-2-adding-a-title)
- [Step-3: Set up the Joke Viewing Zone](#step-3-set-up-the-joke-viewing-zone)
- [Step-4: Set up the Generate Joke Button](#step-4-set-up-the-generate-joke-button)
- [Step-5: Activating the Button](#step-5-activating-the-button)
- [Conclusion](#conclusion)
  - [Further reading](#further-reading)

### Prerequesites

- This article will only be useful if the following is in place before reading it:
  Basic expertise in HTML, CSS, and JavaScript:

### Objectives

- By the end of this tutorial learners should be able to:
  1. Design a basic `HTML` container to contain content.
  2. Connect API links to get data from other web pages.
  3. Assign actions to `HTML` buttons with `eventListeners` in `javaScript`.
  4. Develop a complete functional random joke generator

### About Example

For the comedy API, we're going to employ HTML, CSS, and javascript as our building blocks. We'll start by adding a header to a box on a webpage. A viewing area and a button will be set up next, which will create our amusing content when pressed.
The following files will be available:

- index.html
- style.css
- app.js

This is the file structure.

![output-file-arrangement](engineering-education/random-joke-generator-a-complete-guide/output-file-arrangement.png)

### Step-1: Basic structure of the Joke Generator

The `background-color` of our basic box will be `#0C0C0C` and it will be `550px` wide. We'll use `(border-radius:5px)` of `5px` to round the edges of the box. Refer to the following example.

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

The box will be on the top center position of our page by setting its `position` to `absolute`, on the `left` of our page, we will have `50%` as well as the `top` and lastly, we will `transform` and `translate` our box from the top and left as `-50%`.

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

![output-box](engineering-education/random-joke-generator-a-complete-guide/output-box.png)

### Step-2: Adding a title

The next step is to add a title. The title is there to enhance the page's appearance. The title will be oriented center to keep it in the box and will be `24px` in font size. See the example below.

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

![output-title](engineering-education/random-joke-generator-a-complete-guide/output-title.png)

### Step-3: Set up the Joke Viewing Zone

Moving on to the third task where we will create an area of loading all our jokes where this will be made possible by `<p>` tags. There is no need for a specific height and its size will be automatically determined based on the amount of content in it. It will have `opacity` set to `0` to visually hide everything in this section.

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

so far we should have the following as displayed below
![output-joke-container](engineering-education/random-joke-generator-a-complete-guide/output-joke-container.png)

### Step-4: Set up the Generate Joke Button

This button will help us generate random jokes when clicked and as a result, we will design it as shown.

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

Below is the output after adding the button
![output-btn](engineering-education/random-joke-generator-a-complete-guide/output-btn.png)

### Step-5: Activating the Button

Since we have the required layout, it's time for implementing this example with the help of javaScript.

- First and foremost we have to get the joke container and the `generate joke button` as shown below.

```javascript
// get the joke section container
let jokeSection = document.querySelector("#joke-section");
// get the generate joke button
let generateBtn = document.querySelector("#btn");
```

The next thing we have to do is to include an `API` in our project so that we can be able to fetch content from other websites. Refer to the following snippet.

```javascript
let API =
  "https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,religious,political,racist,sexist,explicit&type=single";
```

Next up we will code a method and name it `acquireJoke`. This method will be ideal since it will help us achieve the following:

- First, we will get rid of class `.content-fade` ensuring that nothing can be viewed with the help of `classList.remove`.
- The data obtained from the `API` using the `fetch` method will be arranged to display with the help of `textContent`.
- We will create a display using paragraph tags and add class `.content-fade` using `classList.add` as a result our text will be seen in the display.

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

The last part is to assign the method we just created so that it fires whenever our button is clicked. The script will contain the code below.

```javascript
generateBtn.addEventListener("click", acquireJoke);
```

![output-joke](engineering-education/random-joke-generator-a-complete-guide/output-joke.png)

### Conclusion

As a result of all you've learned so far, we may now wrap up this tutorial. It is my aim that you now know how to use API links to bring material from another website to your website, and how to develop a random joke generator in javaScript. You may download the whole source code for practice purposes. [here](https://github.com/EssyG10/random-joke-generator)

#### Further reading

[Web APIs](https://developer.mozilla.org/en-US/docs/Web/API/Document/links)

Happy Coding!
