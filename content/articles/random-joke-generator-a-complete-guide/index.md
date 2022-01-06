### Introduction

API links allow you to acquire content from other websites and display it wherever you like. In this tutorial, you will learn how to create a javaScript joke generator using API links which is an excellent project for novice developers who may want to rapidly make plenty of humorous jokes.

#### Prerequesites

- This article will only be useful if the following is in place before reading it:
  Basic HTML, CSS, and JavaScript expertise are required for each of the following:

#### Objectives

- By the end of this tutorial learners should be able to:
  1. Design a basic `Html` container to contain content.
  2. Connect API links to get data from other web pages.

### Table of content

- [Introduction](#introduction)
  - [Prerequesites](#prerequesites)
  - [Objectives](#objectives)
- [Table of content](#table-of-content)
- [About Example](#about-example)
- [Basic structure of Joke Generator](#basic-structure-of-joke-generator)
- [Adding a title](#adding-a-title)
- [Set up Joke Viewing Zone](#set-up-joke-viewing-zone)
- [Set up Generate Joke Button](#set-up-generate-joke-button)
- [Activating The Button](#activating-the-button)
- [Conclusion](#conclusion)
  - [Further reading](#further-reading)

### About Example

For the comedy API, we're going to employ HTML, CSS, and javascript as our building blocks. We'll start by adding a header to a box on a webpage. A viewing area and a button will be set up next, which will create our amusing content when pressed.
The following files will be available:

- index.html
- style.css
- app.js

This is the file structure.

![output-file-arrangement](engineering-education/random-joke-generator-a-complete-guide/output-file-arrangement.png)

### Basic structure of Joke Generator

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

### Adding a title

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

### Set up Joke Viewing Zone

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

### Set up Generate Joke Button

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

### Activating The Button

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
