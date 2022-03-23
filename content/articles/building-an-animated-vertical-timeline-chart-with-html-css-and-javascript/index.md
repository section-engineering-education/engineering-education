---
layout: engineering-education
status: publish
published: true---
layout: engineering-education
status: publish
published: true
url: /building-an-animated-vertical-timeline-chart-with-html-css-and-javascript/
title: Building an animated vertical timeline chart with HTML, CSS and JavaScript
description: 
author: bobate-segun
date: 2022-03-23T00:00:00-09:30
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/building-an-animated-vertical-timeline-chart-with-html-css-and-javascript/hero.jpg
    alt: Building an animated vertical timeline chart with HTML, CSS and JavaScript Hero Image
---

## BuIldIng an anImated vertIcal tImelIne Chart wIth HTML, CSS (GlassmorphIsm) and JavaScrIpt.

![hero](/engineering-education/building-an-animated-vertical-timeline-chart-with-html-css-and-javascript/hero.png)

Have you ever considered making a visual representation of your accomplishments throughout your career? If that's the case, you'll only need a timeline chart where you can easily incorporate all of your accomplishments in a single link using a timeline. The résumé, portfolio, and timeline chart are the primary visual representations of our accomplishments and experiences.
<!--more-->
In this article, you’ll learn how to use `HTML5`, `CSS3` (glassmorphism implementation), and Vanilla JavaScript to create a vertical timeline chart for storing your accomplishments and experiences.

### Prerequisites
To follow along with this tutorial, you’ll need:
- Any code editor of your choice such as [Visual Studio Code](https://code.visualstudio.com/download).
- Basic understanding of `HTML5`, `CSS`, and JavaScript.

### Designing the vertical timeline chart

![Screenshot for design](/engineering-education/building-an-animated-vertical-timeline-chart-with-html-css-and-javascript/design-screenshot.png)

The image above is a replica of the timeline chart you’d have created by the end of this tutorial. This chart will display various events vertically aligned in a card-like layout. Each card-like event is alternatively displayed in opposite positions such that card-like events at odd number positions are placed at the right side of the vertical line and the ones at even number positions are placed at the left side of the vertical line.

Create a folder where you will store three separate files for your HTML, CSS, and JavaScript implementations.

In your HTML file, link your `CSS` and `JavaScript` file using the code below:

```HTML
<!DOCTYPE html>
    <html lang="en">
         <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Vertical Timeline</title>
            <link rel="stylesheet" href="timeline.css"/>
            <script src="timeline.js" defer></script>
       </head>
```

The next thing to do is structure all the HTML elements that would be embedded in our *body* tag. In doing this, we will make use of a *main* tag. Therefore, create a *main* tag inside the *body* tag like this:

```HTML
<body>
      <main>
      </main> 
</body>
```

Now create a `section` tag with a class named `intro-text` inside the `main` tag. This `section` tag will take in a `div` with a class named `container` where you will insert the introductory header and title of the timeline. 

```HTML
<main>
     <section class="intro-text" >
         <div class="container">
             <h1>Tutorial Timeline</h1>
             <p>A timeline of my accomplishments.</p>
         </div>
     </section>
</main>
```

Within the `main` tag, create another `section` tag with a class named `timeline-section` that will contain the events for your timeline.

```HTML
<main>
     <section class="intro-text" >
         <div class="container">
             <h1>Tutorial Timeline</h1>
             <p>A timeline of my accomplishments.</p>
         </div>
     </section>
     <section class="timeline-section" ></section>
</main>
```

Below is the final HTML code for the timeline chart. The HTML code contains two sections - a header section and the timeline events section. You can replace the dummy texts with your desired contents. To generate the lorem ipsum text, follow the instructions [here](https://marketplace.visualstudio.com/items?itemName=Tyriar.lorem-ipsum#:~:text=A%20tiny%20VS%20Code%20extension,either%20a%20line%20or%20paragraph.) if you are using Visual studio code.

```HTML
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Vertical Timeline</title>
    <link rel="stylesheet" href="timeline.css"/>
    <script src="timeline.js" defer></script>
</head>
<body>
    <main>
        <section class="intro-text">
            <div class="container">
              <h1>Tutorial Timeline</h1>
              <p>A timeline of my accomplishments.</p>
            </div>
        </section>

        <section class="timeline-section">
            <!--Put all that should be in the timeline inside a ul tag-->
            <uL>
                <li>
                    <div>
                        <!--Use the time tag-->
                      <time>2001</time>Lorem ipsum dolor sit amet consectetur adipisicing
                        elit. Incidunt nostrum quidem eius repudiandae nam, nemo fuga
                        architecto possimus id at rem beatae consequuntur dolor commodi.
                    </div>
                </li>
                  
                <li>
                  <div>
                    <time>2002</time> Lorem ipsum dolor sit amet consectetur adipisicing
                    elit. Incidunt nostrum quidem eius repudiandae nam, nemo fuga
                    architecto possimus id at rem beatae consequuntur dolor commodi.
                  </div> 
                </li>
          
                <li>
                    <div>
                      <time>2004</time> Lorem ipsum dolor sit amet consectetur adipisicing
                      elit. Incidunt nostrum quidem eius repudiandae nam, nemo fuga
                      architecto possimus id at rem beatae consequuntur dolor commodi.
                    </div>
                </li>

                <li>
                    <div>
                      <time>2006</time> Lorem ipsum dolor sit amet consectetur adipisicing
                      elit. Incidunt nostrum quidem eius repudiandae nam, nemo fuga
                      architecto possimus id at rem beatae consequuntur dolor commodi.
                    </div>
                </li>

                <li>
                    <div>
                      <time>2008</time> Lorem ipsum dolor sit amet consectetur adipisicing
                      elit. Incidunt nostrum quidem eius repudiandae nam, nemo fuga
                      architecto possimus id at rem beatae consequuntur dolor commodi.
                    </div>
                </li>

                <li>
                    <div>
                      <time>2010</time> Lorem ipsum dolor sit amet consectetur adipisicing
                      elit. Incidunt nostrum quidem eius repudiandae nam, nemo fuga
                      architecto possimus id at rem beatae consequuntur dolor commodi.
                    </div>
                </li>

                <li>
                    <div>
                      <time>2012</time> Lorem ipsum dolor sit amet consectetur adipisicing
                      elit. Incidunt nostrum quidem eius repudiandae nam, nemo fuga
                      architecto possimus id at rem beatae consequuntur dolor commodi.
                    </div>
                </li>

                <li>
                    <div>
                      <time>2014</time> Lorem ipsum dolor sit amet consectetur adipisicing
                      elit. Incidunt nostrum quidem eius repudiandae nam, nemo fuga
                      architecto possimus id at rem beatae consequuntur dolor commodi.
                    </div>
                </li>

                <li>
                    <div>
                      <time>2016</time> Lorem ipsum dolor sit amet consectetur adipisicing
                      elit. Incidunt nostrum quidem eius repudiandae nam, nemo fuga
                      architecto possimus id at rem beatae consequuntur dolor commodi.
                    </div>
                </li>
          
                <li>
                    <div>
                      <time>2019</time> Lorem ipsum dolor sit amet consectetur adipisicing
                      elit. Incidunt nostrum quidem eius repudiandae nam, nemo fuga
                      architecto possimus id at rem beatae consequuntur dolor commodi.
                    </div>
                </li>

                <li>
                    <div>
                      <time>2020</time> This is a picture of my first hackathon.
                      <img src="example-image.png" alt="hackathon picture example"/>
                    </div>
                </li>

                <li>
                    <div>
                      <time>2021</time> Lorem ipsum dolor sit amet consectetur adipisicing
                      elit. Incidunt nostrum quidem eius repudiandae nam, nemo fuga
                      architecto possimus id at rem beatae consequuntur dolor commodi.
                    </div>
                </li>

                <li>
                    <div>
                      <time>2022</time> Lorem ipsum dolor sit amet consectetur adipisicing
                      elit. Incidunt nostrum quidem eius repudiandae nam, nemo fuga
                      architecto possimus id at rem beatae consequuntur dolor commodi.
                    </div>
                </li>
            </uL>
        </section>
    </main>
   <script src="timeline.js"> </script>
</body>
</html>
```

This is the expected view of the HTML content on your web browser:

![Html content design](/engineering-education/building-an-animated-vertical-timeline-chart-with-html-css-and-javascript/html-content.png)

### CSS Styling

#### Styling the vertical timeline chart

The next step is to style your timeline chart using CSS in other to give it an aesthetic look. First, use the universal selector (*) to select all the elements. With this selector, we can set values for the margin, padding, and box-sizing attributes using the code below:


```CSS
/*use the universal selector to set some styles*/
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
```

Define a set of colors you’ll like to apply to your chart as shown in the snippet below. With the use of the CSS `var()` function, you can retrieve these colors.

```CSS

:root {
    --white: #fff;
    --light-blue: lightblue;
    --color-blue: blue;
    --color-dark-grey: #222831;
}
```

Set the `font-size` in the `HTML` tag and the `font family` in the `body` tag.

```CSS
/*With this font size, anywhere you use `rem` in your styling, it will be translated to the value `rem` multiplied by 10px. By default, 1 `rem` is 16px but using this styling, 1 `rem` will be 10px*/

html {
    font-size: 10px;
}

@import url('https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@1,500&display=swap');

body {
    font-family: 'Open Sans', sans-serif;
}
```

#### Styling the Header Section

Inside the header section (with a class named `intro-text`), you have a `div` tag with a class named `container` that contains an `h1` tag and a `p` tag where the introductory header and introductory text are embedded respectively. 

Here is the code to style the header section of this timeline chart: 

```CSS
.intro-text {
    background-color: var(--color-dark-grey);
    color: var(--white);
    padding: 2rem 0;
}
  
.container {
    margin: 0 auto;
    padding: 0 20px;
    text-align: center;
}
  
.intro-text h1 {
    font-size: 2.5rem;
}

p {
    font-size: 1.5rem;
    padding-top: 2rem;
    line-height: 1.6;
}
```

This should be the look of your timeline so far:

![Html screenshot design](/engineering-education/building-an-animated-vertical-timeline-chart-with-html-css-and-javascript/html-screenshot.png)

#### Styling the `timeline-section`

Start by specifying a value for the `width` property of the `timeline-section`, as well as the value `hidden` for the `overflow` property, as shown below:

```CSS
.timeline-section {
    width: 100%;
    overflow: hidden;  /* creates block formatting context */
}
```

Next, target the `ul` tag inside the `section` tag with the class named `timeline-section`. This `ul` tag contains all the timeline events. The attributes to include in the targeted `ul` tag style are the `background-color` and the `padding*`.

Here is the code to target and style the `ul` (unordered list):

```CSS
.timeline-section ul {
    background: var(--light-blue);
    padding: 5rem 0; /* padding top and bottom 5rem */
}
```

Next, define some basic styles for the list items (timeline events) including the *after* elements.

```CSS
/*styling the list*/
.timeline-section ul li {
    list-style: none;
    position: relative;
    width: 5px; /* set width to 5px then set background to lightblue for that width */
    margin: 0 auto; /* center text */
    padding-top: 5rem; /* separate each list with a padding-top of 5rem = 5 x 10px= 50px */
    background: var(--color-blue);
}

/*use pseudo elements to style*/
/*This section will help us make the node-like structure - The circle*/
.timeline-section ul li::after {
    content: ""; /* The content attribute is required for pseudo-elements to render */
    position: absolute;
    left: 50%;
    bottom: 0;
    transform: translateX(-50%);
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
    background: inherit; /* inherits this property from its parent element */
}
```

The CSS code above is divided into two code blocks. The first code block simply aligns the list items to the page's center and adds a blue vertical line with a `width` of 5px at the center of the page.

Following the CSS styles you’ve added to your timeline so far, this is the expected view of your chart at this point:

![Present timeline design](/engineering-education/building-an-animated-vertical-timeline-chart-with-html-css-and-javascript/present-timeline-screenshot.png)

The next step is to style your list items to give them an `event-card` appearance. This would be accomplished by focusing on the `div` tag, which contains the text that represents an event.

Here is the code to produce the event card:

```CSS
/* Content box */
.timeline-section ul li div {
    width: 40rem;
    font-size: 1.2rem;
    position: relative;
    bottom: 0;
    padding: 1.5rem;
    /*glassmorphism effect*/
    background: rgba(255,255,255,.2);
    -webkit-backdrop-filter: blur(5px);
    backdrop-filter: blur(5px);
    box-shadow: 20px 20px 50px rgba(0, 0, 0, 0.5);
    border-radius: 10px;
    border-top: 2px solid rgba(255, 255, 255, 0.5);
    border-left: 2px solid rgba(255, 255, 255, 0.5);
    border-bottom: 2px solid rgba(255, 255, 255, 0.5);
    border-right: 2px solid rgba(255, 255, 255, 0.5);
    border: 1px solid rgba(255,255,255,0.2);
}
```

Following the implementation of  the code above, you should have your events in card-like structures.

Here is the difference the code block above has added to our timeline:

![Glassmorphism effect design](/engineering-education/building-an-animated-vertical-timeline-chart-with-html-css-and-javascript/glassmorphism-effect.png)

Looking closely at the snapshot above, you would notice the glassmorphism effect on the *event-card* where the card overlaps the vertical blue line.

The next step is to alternate the positions of the event cards; keeping the ones with odd number positions at the right-hand side of the vertical line and the ones with even number positions at the left-hand side of the vertical line.

```css
/* This code starts the production of the triangle at the bottom of each event-card*/
.timeline-section ul li div::before {
    content: "";
    position: absolute;
    bottom: 7px;
    width: 0;
    height: 0;
    border-style: solid;
}
/*This is to select the divs at odd position so we can separate the divs to the right hand side of the timeline*/
.timeline-section ul li:nth-child(odd) div {
    left: 45px;  /* this style pushes the divs at odd number position to the right */
}

/*this showcases the triangle for the event-cards at the odd number position*/
.timeline-section ul li:nth-child(odd) div::before {
    left: -15px;
    border-width: 8px 16px 8px 0;
    border-color: transparent var(--light-blue) transparent transparent;
}

/*This is to select the divs at an even number position so we can separate the divs to the left-hand side of the timeline*/
.timeline-section ul li:nth-child(even) div {
    left: -439px;
}

/*this showcases the triangle for the event-cards at odd number position*/
.timeline-section ul li:nth-child(even) div::before {
    right: -15px;
    border-width: 8px 0 8px 16px;
    border-color: transparent transparent transparent var(--light-blue); 
}
```

Let’s add more styles to the content of the `time` tag.

Style the content of the *time* tag:

```css
/*style the time tag*/
time {
    display: block;
    font-size: 1.1rem;
    font-weight: 800;
    margin-bottom: 7px;
}
```


Here is the expected view of the timeline so far:


![The timeline design](/engineering-education/building-an-animated-vertical-timeline-chart-with-html-css-and-javascript/timeline-design.png)

The timeline chart has already taken shape. Now, it is time to animate it using JavaScript.

### Adding animation using JavaScript

The first thing to do is understand how the animation will work. The scenarios to consider are:
- Hiding an event card when it is scrolled out of the viewport.
- Displaying an event card when it is in the viewport.

To achieve these, start by creating a function that is called automatically like this:

```js
(function () {
   
  })();
```

Inside the function in the code snippet above, define a `const` variable that will represent the event cards. Then perform a query using `document.querySelectorAll( )`. This variable will select all the event cards.

Here is the code to achieve that:

```js
const items = document.querySelectorAll(".timeline-section li");
```

Next, create a function that would determine when your event cards are in the viewport and when they are out of the viewport.

To fully grasp how you can create a function that will detect the target elements (the event cards) are in the viewport, [check out this StackOverflow solution](https://stackoverflow.com/questions/123999/how-can-i-tell-if-a-dom-element-is-visible-in-the-current-viewport). You can also read about *Element.getBoundingClientRect()* [here](https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect).

Here is the function to detect if an event card is in the viewport:

```js
function isElementInViewport(el) {
      let rect = el.getBoundingClientRect();
      return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <=
          (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
      );
    }
```

In the code above a variable `rect` is defined which takes a value that returns the information about the size of an element (the event cards) and the position relative to the viewport.

Next, create a function where a class named `slide-in` will be added to an event card when it is in the viewport and the function also removes the class named `slide-in` from an event card when it is out of the viewport.


```js
function slideIn() {
      for (let i = 0; i < items.length; i++) {
        if (isElementInViewport(items[i])) {
          items[i].classList.add("slide-in");
        } else {
          items[i].classList.remove("slide-in");
        }
      }
  }
```

The final step is to invoke the `slideIn` function through the window object for each of the following scenarios:
- When the page loads.
- As we scroll down.
- When the browser is resized.

The three events that will be used to access the cases listed above are:
- The load event.
- The scroll event.
- The resize event.

Add the code snippet below to use these events:

```js
window.addEventListener("load", slideIn);
window.addEventListener("scroll", slideIn);
window.addEventListener("resize", slideIn);
```

The entire JavaScript code:

```js
(function () {
    const items = document.querySelectorAll(".timeline-section li");
    function isElementInViewport(el) {
      let rect = el.getBoundingClientRect();
      return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <=
          (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
      );
    }
  
    function slideIn() {
      for (let i = 0; i < items.length; i++) {
        if (isElementInViewport(items[i])) {
          items[i].classList.add("slide-in");
        } else {
          items[i].classList.remove("slide-in");
        }
      }
    }
  
    window.addEventListener("load", slideIn);
    window.addEventListener("scroll", slideIn);
    window.addEventListener("resize", slideIn);
  })();
```

### Adding animation using the *slide-in* class

By default, we want the event cards to be visible when they are in the viewport and they should be hidden when they are out of the viewport. To get this done, we would make use of the `visibility` and `opacity` properties.

In addition, the `translateX()` will be used to move the event cards 20rem (which is 200px) from their original position. This is will make the cards hidden when they are out of the viewport. 

The code below represents the explanation above:

```css
.timeline-section ul li::after {
    transition: all 0.5s ease-in-out;
}  

 
/*this changes the node content..giving it a background of white and making the border thicker*/
.timeline-section ul li.slide-in::after {
    background: var(--white);
    border: 3px solid var(--light-blue);
}

/* Hide event card initially */
.timeline-section ul li div {
    visibility: hidden;
    opacity: 0;
    transition: all 0.5s ease-in-out;
}
  
.timeline-section ul li:nth-child(odd) div {
    transform: translateX(20rem);
}

.timeline-section ul li:nth-child(even) div {
    transform: translateX(-20rem);
}

/* display the event card */
.timeline-section ul li.slide-in div {
    transform: none;
    visibility: visible;
    opacity: 1;
}
```

With the addition of the code above, there should be an animation effect on the timeline chart.

### Making the timeline chart responsive

The next step is to make the timeline mobile-friendly. This tutorial considers two screen sizes:
- 600 < X < 900px be for mobile screens.
- >600px be for the tablet screens.

First, we consider the *tablet screen* where the only modification is reducing the *width* of the event cards.

Here is the code for the *tablet screens*:

The next step is to make the timeline mobile-friendly. To do so, we'll use *media queries* with two screen sizes in mind - greater than 600px but less than 900px, which will be used for tablet screens, and greater than 600px, which will be used for mobile screens.

First, we consider the *tablet screen* where the only modification is reducing the *width* of the event cards.

Here is the code for the *tablet screens*:
 
```css
/* Tablet Width */
@media screen and (max-width: 900px) {
    .timeline-section ul li div {
      width: 25rem;
   }

.timeline-section ul li:nth-child(even) div {
      left: -289px;
    }
}
```

Next, is to consider the *mobile screens* where the *calc()* function is used to determine the width of the event cards.

Here is the code for the *mobile screens*:

```css
/* Mobile width */
@media screen and (max-width: 600px) {
    .timeline-section ul li {
      margin-left: 2rem;
    }
  
    .timeline-section ul li div {
      width: calc(100vw - 91px);
    }
  
    .timeline-section ul li:nth-child(even) div {
      left: 45px;
    }
  
    .timeline-section ul li:nth-child(even) div::before {
      left: -15px;
      border-width: 8px 16px 8px 0;
      border-color: transparent var(--light-blue) transparent transparent;
    }
}
```

Here is the final CSS code:

```css
/*use the universal selector to set some styles*/
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

:root {
    --white: #fff;
    --light-blue: lightblue;
    --color-blue: blue;
    --color-dark-grey: #222831;
}

/*with this font size, anywhere we use rem in our styling, it will be translated to the value before the rem multiplied by 10px. Normally, 1 rem is 16px*/
html {
    font-size: 10px;
}

@import url('https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@1,500&display=swap');

body {
    font-family: 'Open Sans', sans-serif;
}
 
.intro-text {
    background-color: var(--color-dark-grey);
    color: var(--white);
    padding: 2rem 0;
}
  
.container {
    margin: 0 auto;
    padding: 0 20px;
    text-align: center;
}
  
.intro-text h1 {
    font-size: 2.5rem;
}

p {
    font-size: 1.5rem;
    padding-top: 2rem;
    line-height: 1.6;
}

/*Timeline section*/
img {
    width: 100%;
}

.timeline-section {
    width: 100%;
    overflow: hidden;  /* creates block formatting context */
}

.timeline-section ul {
    background: var(--light-blue);
    padding: 5rem 0; /* padding top and bottom 5rem */
}

/*styling the liSt*/
.timeline-section ul li {
    list-style: none;
    position: relative;
    width: 5px; /* set width to 5px then set background to lightblue for that width */
    margin: 0 auto; /* center text */
    padding-top: 5rem; /* separate each list with a padding-top of 5rem = 5 x 10px= 50px */
    background: var(--color-blue);
}

/*use pseudo elements to style*/
/*This section will help us make the node-like structure - The circle*/
.timeline-section ul li::after {
    content: "";/* The content attribute is required for pseudo-elements to render */
    position: absolute;
    left: 50%;
    bottom: 0;
    transform: translateX(-50%);
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
    background: inherit; /* inherits this property from its parent element */
}


/* Content box */
.timeline-section ul li div {
    width: 40rem;
    font-size: 1.2rem;
    position: relative;
    bottom: 0;
    padding: 1.5rem;
    /*glassmorphism effect*/
    background: rgba(255,255,255,.2);
    -webkit-backdrop-filter: blur(5px);
    backdrop-filter: blur(5px);
    box-shadow: 20px 20px 50px rgba(0, 0, 0, 0.5);
    border-radius: 10px;
    border-top: 2px solid rgba(255, 255, 255, 0.5);
    border-left: 2px solid rgba(255, 255, 255, 0.5);
    border-bottom: 2px solid rgba(255, 255, 255, 0.5);
    border-right: 2px solid rgba(255, 255, 255, 0.5);
    border: 1px solid rgba(255,255,255,0.2);
}

/* Triangle */
.timeline-section ul li div::before {
    content: "";
    position: absolute;
    bottom: 7px;
    width: 0;
    height: 0;
    border-style: solid;
}

/*This is to select the divs at odd position so we can separate the divs to the right part*/
.timeline-section ul li:nth-child(odd) div {
    left: 45px;  /* this style pushes the divs at odd number position to the right */
}
  
/*this showcases the triangle*/
.timeline-section ul li:nth-child(odd) div::before {
    left: -15px;
    border-width: 8px 16px 8px 0;
    border-color: transparent var(--light-blue) transparent transparent;
}
 
/*This is to select the divs at even number position so we can separate the divs to the left part*/
.timeline-section ul li:nth-child(even) div {
    left: -439px;
}
  
/*this showcases the triangle*/
.timeline-section ul li:nth-child(even) div::before {
    right: -15px;
    border-width: 8px 0 8px 16px;
    border-color: transparent transparent transparent var(--light-blue); 
}

/*style the time tag*/
time {
    display: block;
    font-size: 1.1rem;
    font-weight: 800;
    margin-bottom: 7px;
}

.timeline-section ul li::after {
    transition: all 0.5s ease-in-out;
}  

 
/*this changes the node content..giving it a background of white and making the border thicker*/
.timeline-section ul li.slide-in::after {
    background: var(--white);
    border: 3px solid var(--light-blue);
}

/* Hide event card initially */
.timeline-section ul li div {
    visibility: hidden;
    opacity: 0;
    transition: all 0.5s ease-in-out;
}
  
.timeline-section ul li:nth-child(odd) div {
    transform: translateX(20rem);
}

.timeline-section ul li:nth-child(even) div {
    transform: translateX(-20rem);
}

/* display the event card */
.timeline-section ul li.slide-in div {
    transform: none;
    visibility: visible;
    opacity: 1;
}

/* Tablet Width */
@media screen and (max-width: 900px) {
    .timeline-section ul li div {
      width: 25rem;
   }

.timeline-section ul li:nth-child(even) div {
      left: -289px;
    }
}

/* Mobile width */
@media screen and (max-width: 600px) {
    .timeline-section ul li {
      margin-left: 2rem;
    }
  
    .timeline-section ul li div {
      width: calc(100vw - 91px);
    }
  
    .timeline-section ul li:nth-child(even) div {
      left: 45px;
    }
  
    .timeline-section ul li:nth-child(even) div::before {
      left: -15px;
      border-width: 8px 16px 8px 0;
      border-color: transparent var(--light-blue) transparent transparent;
    }
}


```

Note, in case you lost about what the event cards mean; event cards are the *divs* used in storing the content for each event.

### Conclusion

This tutorial showed you how to build a timeline chart using HTML to build its structure, CSS to style it as desired and Javascript to animate the chart.

You also learned how to create a method that detects if an element is in the viewport, after which we used the CSS `visibility` and `opacity` properties as well as the `translateX()` function to add animation effects.

With that, you have an animated vertical timeline chart. The source code of this application is available on [GitHub](https://github.com/shegz101/Vertical-timeline/tree/main).










url: /building-an-animated-vertical-timeline-chart-with-html-css-and-javascript/
title: Building an animated vertical timeline chart with HTML, CSS and JavaScript
description: 
author: bobate-segun
date: 2022-03-23T00:00:00-09:30
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/building-an-animated-vertical-timeline-chart-with-html-css-and-javascript/hero.jpg
    alt: Building an animated vertical timeline chart with HTML, CSS and JavaScript Hero Image
---

## BuIldIng an anImated vertIcal tImelIne Chart wIth HTML, CSS (GlassmorphIsm) and JavaScrIpt.

![hero](/engineering-education/building-an-animated-vertical-timeline-chart-with-html-css-and-javascript/hero.png)

Have you ever considered making a visual representation of your accomplishments throughout your career? If that's the case, you'll only need a timeline chart where you can easily incorporate all of your accomplishments in a single link using a timeline. The résumé, portfolio, and timeline chart are the primary visual representations of our accomplishments and experiences.
<!--more-->
In this article, you’ll learn how to use `HTML5`, `CSS3` (glassmorphism implementation), and Vanilla JavaScript to create a vertical timeline chart for storing your accomplishments and experiences.

### Prerequisites
To follow along with this tutorial, you’ll need:
- Any code editor of your choice such as [Visual Studio Code](https://code.visualstudio.com/download).
- Basic understanding of `HTML5`, `CSS`, and JavaScript.

### Designing the vertical timeline chart

![Screenshot for design](/engineering-education/building-an-animated-vertical-timeline-chart-with-html-css-and-javascript/design-screenshot.png)

The image above is a replica of the timeline chart you’d have created by the end of this tutorial. This chart will display various events vertically aligned in a card-like layout. Each card-like event is alternatively displayed in opposite positions such that card-like events at odd number positions are placed at the right side of the vertical line and the ones at even number positions are placed at the left side of the vertical line.

Create a folder where you will store three separate files for your HTML, CSS, and JavaScript implementations.

In your HTML file, link your `CSS` and `JavaScript` file using the code below:

```HTML
<!DOCTYPE html>
    <html lang="en">
         <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Vertical Timeline</title>
            <link rel="stylesheet" href="timeline.css"/>
            <script src="timeline.js" defer></script>
       </head>
```

The next thing to do is structure all the HTML elements that would be embedded in our *body* tag. In doing this, we will make use of a *main* tag. Therefore, create a *main* tag inside the *body* tag like this:

```HTML
<body>
      <main>
      </main> 
</body>
```

Now create a `section` tag with a class named `intro-text` inside the `main` tag. This `section` tag will take in a `div` with a class named `container` where you will insert the introductory header and title of the timeline. 

```HTML
<main>
     <section class="intro-text" >
         <div class="container">
             <h1>Tutorial Timeline</h1>
             <p>A timeline of my accomplishments.</p>
         </div>
     </section>
</main>
```

Within the `main` tag, create another `section` tag with a class named `timeline-section` that will contain the events for your timeline.

```HTML
<main>
     <section class="intro-text" >
         <div class="container">
             <h1>Tutorial Timeline</h1>
             <p>A timeline of my accomplishments.</p>
         </div>
     </section>
     <section class="timeline-section" ></section>
</main>
```

Below is the final HTML code for the timeline chart. The HTML code contains two sections - a header section and the timeline events section. You can replace the dummy texts with your desired contents. To generate the lorem ipsum text, follow the instructions [here](https://marketplace.visualstudio.com/items?itemName=Tyriar.lorem-ipsum#:~:text=A%20tiny%20VS%20Code%20extension,either%20a%20line%20or%20paragraph.) if you are using Visual studio code.

```HTML
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Vertical Timeline</title>
    <link rel="stylesheet" href="timeline.css"/>
    <script src="timeline.js" defer></script>
</head>
<body>
    <main>
        <section class="intro-text">
            <div class="container">
              <h1>Tutorial Timeline</h1>
              <p>A timeline of my accomplishments.</p>
            </div>
        </section>

        <section class="timeline-section">
            <!--Put all that should be in the timeline inside a ul tag-->
            <uL>
                <li>
                    <div>
                        <!--Use the time tag-->
                      <time>2001</time>Lorem ipsum dolor sit amet consectetur adipisicing
                        elit. Incidunt nostrum quidem eius repudiandae nam, nemo fuga
                        architecto possimus id at rem beatae consequuntur dolor commodi.
                    </div>
                </li>
                  
                <li>
                  <div>
                    <time>2002</time> Lorem ipsum dolor sit amet consectetur adipisicing
                    elit. Incidunt nostrum quidem eius repudiandae nam, nemo fuga
                    architecto possimus id at rem beatae consequuntur dolor commodi.
                  </div> 
                </li>
          
                <li>
                    <div>
                      <time>2004</time> Lorem ipsum dolor sit amet consectetur adipisicing
                      elit. Incidunt nostrum quidem eius repudiandae nam, nemo fuga
                      architecto possimus id at rem beatae consequuntur dolor commodi.
                    </div>
                </li>

                <li>
                    <div>
                      <time>2006</time> Lorem ipsum dolor sit amet consectetur adipisicing
                      elit. Incidunt nostrum quidem eius repudiandae nam, nemo fuga
                      architecto possimus id at rem beatae consequuntur dolor commodi.
                    </div>
                </li>

                <li>
                    <div>
                      <time>2008</time> Lorem ipsum dolor sit amet consectetur adipisicing
                      elit. Incidunt nostrum quidem eius repudiandae nam, nemo fuga
                      architecto possimus id at rem beatae consequuntur dolor commodi.
                    </div>
                </li>

                <li>
                    <div>
                      <time>2010</time> Lorem ipsum dolor sit amet consectetur adipisicing
                      elit. Incidunt nostrum quidem eius repudiandae nam, nemo fuga
                      architecto possimus id at rem beatae consequuntur dolor commodi.
                    </div>
                </li>

                <li>
                    <div>
                      <time>2012</time> Lorem ipsum dolor sit amet consectetur adipisicing
                      elit. Incidunt nostrum quidem eius repudiandae nam, nemo fuga
                      architecto possimus id at rem beatae consequuntur dolor commodi.
                    </div>
                </li>

                <li>
                    <div>
                      <time>2014</time> Lorem ipsum dolor sit amet consectetur adipisicing
                      elit. Incidunt nostrum quidem eius repudiandae nam, nemo fuga
                      architecto possimus id at rem beatae consequuntur dolor commodi.
                    </div>
                </li>

                <li>
                    <div>
                      <time>2016</time> Lorem ipsum dolor sit amet consectetur adipisicing
                      elit. Incidunt nostrum quidem eius repudiandae nam, nemo fuga
                      architecto possimus id at rem beatae consequuntur dolor commodi.
                    </div>
                </li>
          
                <li>
                    <div>
                      <time>2019</time> Lorem ipsum dolor sit amet consectetur adipisicing
                      elit. Incidunt nostrum quidem eius repudiandae nam, nemo fuga
                      architecto possimus id at rem beatae consequuntur dolor commodi.
                    </div>
                </li>

                <li>
                    <div>
                      <time>2020</time> This is a picture of my first hackathon.
                      <img src="example-image.png" alt="hackathon picture example"/>
                    </div>
                </li>

                <li>
                    <div>
                      <time>2021</time> Lorem ipsum dolor sit amet consectetur adipisicing
                      elit. Incidunt nostrum quidem eius repudiandae nam, nemo fuga
                      architecto possimus id at rem beatae consequuntur dolor commodi.
                    </div>
                </li>

                <li>
                    <div>
                      <time>2022</time> Lorem ipsum dolor sit amet consectetur adipisicing
                      elit. Incidunt nostrum quidem eius repudiandae nam, nemo fuga
                      architecto possimus id at rem beatae consequuntur dolor commodi.
                    </div>
                </li>
            </uL>
        </section>
    </main>
   <script src="timeline.js"> </script>
</body>
</html>
```

This is the expected view of the HTML content on your web browser:

![Html content design](/engineering-education/building-an-animated-vertical-timeline-chart-with-html-css-and-javascript/html-content.png)

### CSS Styling

#### Styling the vertical timeline chart

The next step is to style your timeline chart using CSS in other to give it an aesthetic look. First, use the universal selector (*) to select all the elements. With this selector, we can set values for the margin, padding, and box-sizing attributes using the code below:


```CSS
/*use the universal selector to set some styles*/
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
```

Define a set of colors you’ll like to apply to your chart as shown in the snippet below. With the use of the CSS `var()` function, you can retrieve these colors.

```CSS

:root {
    --white: #fff;
    --light-blue: lightblue;
    --color-blue: blue;
    --color-dark-grey: #222831;
}
```

Set the `font-size` in the `HTML` tag and the `font family` in the `body` tag.

```CSS
/*With this font size, anywhere you use `rem` in your styling, it will be translated to the value `rem` multiplied by 10px. By default, 1 `rem` is 16px but using this styling, 1 `rem` will be 10px*/

html {
    font-size: 10px;
}

@import url('https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@1,500&display=swap');

body {
    font-family: 'Open Sans', sans-serif;
}
```

#### Styling the Header Section

Inside the header section (with a class named `intro-text`), you have a `div` tag with a class named `container` that contains an `h1` tag and a `p` tag where the introductory header and introductory text are embedded respectively. 

Here is the code to style the header section of this timeline chart: 

```CSS
.intro-text {
    background-color: var(--color-dark-grey);
    color: var(--white);
    padding: 2rem 0;
}
  
.container {
    margin: 0 auto;
    padding: 0 20px;
    text-align: center;
}
  
.intro-text h1 {
    font-size: 2.5rem;
}

p {
    font-size: 1.5rem;
    padding-top: 2rem;
    line-height: 1.6;
}
```

This should be the look of your timeline so far:

![Html screenshot design](/engineering-education/building-an-animated-vertical-timeline-chart-with-html-css-and-javascript/html-screenshot.png)

#### Styling the `timeline-section`

Start by specifying a value for the `width` property of the `timeline-section`, as well as the value `hidden` for the `overflow` property, as shown below:

```CSS
.timeline-section {
    width: 100%;
    overflow: hidden;  /* creates block formatting context */
}
```

Next, target the `ul` tag inside the `section` tag with the class named `timeline-section`. This `ul` tag contains all the timeline events. The attributes to include in the targeted `ul` tag style are the `background-color` and the `padding*`.

Here is the code to target and style the `ul` (unordered list):

```CSS
.timeline-section ul {
    background: var(--light-blue);
    padding: 5rem 0; /* padding top and bottom 5rem */
}
```

Next, define some basic styles for the list items (timeline events) including the *after* elements.

```CSS
/*styling the list*/
.timeline-section ul li {
    list-style: none;
    position: relative;
    width: 5px; /* set width to 5px then set background to lightblue for that width */
    margin: 0 auto; /* center text */
    padding-top: 5rem; /* separate each list with a padding-top of 5rem = 5 x 10px= 50px */
    background: var(--color-blue);
}

/*use pseudo elements to style*/
/*This section will help us make the node-like structure - The circle*/
.timeline-section ul li::after {
    content: ""; /* The content attribute is required for pseudo-elements to render */
    position: absolute;
    left: 50%;
    bottom: 0;
    transform: translateX(-50%);
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
    background: inherit; /* inherits this property from its parent element */
}
```

The CSS code above is divided into two code blocks. The first code block simply aligns the list items to the page's center and adds a blue vertical line with a `width` of 5px at the center of the page.

Following the CSS styles you’ve added to your timeline so far, this is the expected view of your chart at this point:

![Present timeline design](/engineering-education/building-an-animated-vertical-timeline-chart-with-html-css-and-javascript/present-timeline-screenshot.png)

The next step is to style your list items to give them an `event-card` appearance. This would be accomplished by focusing on the `div` tag, which contains the text that represents an event.

Here is the code to produce the event card:

```CSS
/* Content box */
.timeline-section ul li div {
    width: 40rem;
    font-size: 1.2rem;
    position: relative;
    bottom: 0;
    padding: 1.5rem;
    /*glassmorphism effect*/
    background: rgba(255,255,255,.2);
    -webkit-backdrop-filter: blur(5px);
    backdrop-filter: blur(5px);
    box-shadow: 20px 20px 50px rgba(0, 0, 0, 0.5);
    border-radius: 10px;
    border-top: 2px solid rgba(255, 255, 255, 0.5);
    border-left: 2px solid rgba(255, 255, 255, 0.5);
    border-bottom: 2px solid rgba(255, 255, 255, 0.5);
    border-right: 2px solid rgba(255, 255, 255, 0.5);
    border: 1px solid rgba(255,255,255,0.2);
}
```

Following the implementation of the code above, you should have your events in card-like structures.

Here is the difference the code block above has added to our timeline:

![Glassmorphism effect design](/engineering-education/building-an-animated-vertical-timeline-chart-with-html-css-and-javascript/glassmorphism-effect.png)

Looking closely at the snapshot above, you would notice the glassmorphism effect on the *event-card* where the card overlaps the vertical blue line.

The next step is to alternate the positions of the event cards; keeping the ones with odd number positions at the right-hand side of the vertical line and the ones with even number positions at the left-hand side of the vertical line.

```css
/* This code starts the production of the triangle at the bottom of each event-card*/
.timeline-section ul li div::before {
    content: "";
    position: absolute;
    bottom: 7px;
    width: 0;
    height: 0;
    border-style: solid;
}
/*This is to select the divs at odd position so we can separate the divs to the right hand side of the timeline*/
.timeline-section ul li:nth-child(odd) div {
    left: 45px;  /* this style pushes the divs at odd number position to the right */
}

/*this showcases the triangle for the event-cards at the odd number position*/
.timeline-section ul li:nth-child(odd) div::before {
    left: -15px;
    border-width: 8px 16px 8px 0;
    border-color: transparent var(--light-blue) transparent transparent;
}

/*This is to select the divs at an even number position so we can separate the divs to the left-hand side of the timeline*/
.timeline-section ul li:nth-child(even) div {
    left: -439px;
}

/*this showcases the triangle for the event-cards at odd number position*/
.timeline-section ul li:nth-child(even) div::before {
    right: -15px;
    border-width: 8px 0 8px 16px;
    border-color: transparent transparent transparent var(--light-blue); 
}
```

Let’s add more styles to the content of the `time` tag.

Style the content of the *time* tag:

```css
/*style the time tag*/
time {
    display: block;
    font-size: 1.1rem;
    font-weight: 800;
    margin-bottom: 7px;
}
```


Here is the expected view of the timeline so far:


![The timeline design](/engineering-education/building-an-animated-vertical-timeline-chart-with-html-css-and-javascript/timeline-design.png)

The timeline chart has already taken shape. Now, it is time to animate it using JavaScript.

### Adding animation using JavaScript

The first thing to do is understand how the animation will work. The scenarios to consider are:
- Hiding an event card when it is scrolled out of the viewport.
- Displaying an event card when it is in the viewport.

To achieve these, start by creating a function that is called automatically like this:

```js
(function () {
   
  })();
```

Inside the function in the code snippet above, define a `const` variable that will represent the event cards. Then perform a query using `document.querySelectorAll( )`. This variable will select all the event cards.

Here is the code to achieve that:

```js
const items = document.querySelectorAll(".timeline-section li");
```

Next, create a function that would determine when your event cards are in the viewport and when they are out of the viewport.

To fully grasp how you can create a function that will detect the target elements (the event cards) are in the viewport, [check out this StackOverflow solution](https://stackoverflow.com/questions/123999/how-can-i-tell-if-a-dom-element-is-visible-in-the-current-viewport). You can also read about *Element.getBoundingClientRect()* [here](https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect).

Here is the function to detect if an event card is in the viewport:

```js
function isElementInViewport(el) {
      let rect = el.getBoundingClientRect();
      return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <=
          (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
      );
    }
```

In the code above a variable `rect` is defined which takes a value that returns the information about the size of an element (the event cards) and the position relative to the viewport.

Next, create a function where a class named `slide-in` will be added to an event card when it is in the viewport and the function also removes the class named `slide-in` from an event card when it is out of the viewport.


```js
function slideIn() {
      for (let i = 0; i < items.length; i++) {
        if (isElementInViewport(items[i])) {
          items[i].classList.add("slide-in");
        } else {
          items[i].classList.remove("slide-in");
        }
      }
  }
```

The final step is to invoke the `slidein` function through the window object for each of the following scenarios:
- When the page loads.
- As we scroll down.
- When the browser is resized.

The three events that will be used to access the cases listed above are:
- The load event.
- The scroll event.
- The resize event.

Add the code snippet below to use these events:

```js
window.addEventListener("load", slideIn);
window.addEventListener("scroll", slideIn);
window.addEventListener("resize", slideIn);
```

The entire JavaScript code:

```js
(function () {
    const items = document.querySelectorAll(".timeline-section li");
    function isElementInViewport(el) {
      let rect = el.getBoundingClientRect();
      return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <=
          (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
      );
    }
  
    function slideIn() {
      for (let i = 0; i < items.length; i++) {
        if (isElementInViewport(items[i])) {
          items[i].classList.add("slide-in");
        } else {
          items[i].classList.remove("slide-in");
        }
      }
    }
  
    window.addEventListener("load", slideIn);
    window.addEventListener("scroll", slideIn);
    window.addEventListener("resize", slideIn);
  })();
```

### Adding animation using the *slide-in* class

By default, we want the event cards to be visible when they are in the viewport and they should be hidden when they are out of the viewport. To get this done, we would make use of the `visibility` and `opacity` properties.

In addition, the `translateX()` will be used to move the event cards 20rem (which is 200px) from their original position. This is will make the cards hidden when they are out of the viewport. 

The code below represents the explanation above:

```css
.timeline-section ul li::after {
    transition: all 0.5s ease-in-out;
}  

 
/*this changes the node content..giving it a background of white and making the border thicker*/
.timeline-section ul li.slide-in::after {
    background: var(--white);
    border: 3px solid var(--light-blue);
}

/* Hide event card initially */
.timeline-section ul li div {
    visibility: hidden;
    opacity: 0;
    transition: all 0.5s ease-in-out;
}
  
.timeline-section ul li:nth-child(odd) div {
    transform: translateX(20rem);
}

.timeline-section ul li:nth-child(even) div {
    transform: translateX(-20rem);
}

/* display the event card */
.timeline-section ul li.slide-in div {
    transform: none;
    visibility: visible;
    opacity: 1;
}
```

With the addition of the code above, there should be an animation effect on the timeline chart.

### Making the timeline chart responsive

The next step is to make the timeline mobile-friendly. This tutorial considers two screen sizes:
- 600 < X < 900px be for mobile screens.
- >600px be for the tablet screens.

First, we consider the *tablet screen* where the only modification is reducing the *width* of the event cards.

Here is the code for the *tablet screens*:

The next step is to make the timeline mobile-friendly. To do so, we'll use *media queries* with two screen sizes in mind - greater than 600px but less than 900px, which will be used for tablet screens, and greater than 600px, which will be used for mobile screens.

First, we consider the *tablet screen* where the only modification is reducing the *width* of the event cards.

Here is the code for the *tablet screens*:
 
```css
/* Tablet Width */
@media screen and (max-width: 900px) {
    .timeline-section ul li div {
      width: 25rem;
   }

.timeline-section ul li:nth-child(even) div {
      left: -289px;
    }
}
```

Next, is to consider the *mobile screens* where the *calc()* function is used to determine the width of the event cards.

Here is the code for the *mobile screens*:

```css
/* Mobile width */
@media screen and (max-width: 600px) {
    .timeline-section ul li {
      margin-left: 2rem;
    }
  
    .timeline-section ul li div {
      width: calc(100vw - 91px);
    }
  
    .timeline-section ul li:nth-child(even) div {
      left: 45px;
    }
  
    .timeline-section ul li:nth-child(even) div::before {
      left: -15px;
      border-width: 8px 16px 8px 0;
      border-color: transparent var(--light-blue) transparent transparent;
    }
}
```

Here is the final CSS code:

```css
/*use the universal selector to set some styles*/
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

:root {
    --white: #fff;
    --light-blue: lightblue;
    --color-blue: blue;
    --color-dark-grey: #222831;
}

/*with this font size, anywhere we use rem in our styling, it will be translated to the value before the rem multiplied by 10px. Normally, 1 rem is 16px*/
html {
    font-size: 10px;
}

@import url('https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@1,500&display=swap');

body {
    font-family: 'Open Sans', sans-serif;
}
 
.intro-text {
    background-color: var(--color-dark-grey);
    color: var(--white);
    padding: 2rem 0;
}
  
.container {
    margin: 0 auto;
    padding: 0 20px;
    text-align: center;
}
  
.intro-text h1 {
    font-size: 2.5rem;
}

p {
    font-size: 1.5rem;
    padding-top: 2rem;
    line-height: 1.6;
}

/*Timeline section*/
img {
    width: 100%;
}

.timeline-section {
    width: 100%;
    overflow: hidden;  /* creates block formatting context */
}

.timeline-section ul {
    background: var(--light-blue);
    padding: 5rem 0; /* padding top and bottom 5rem */
}

/*styling the liSt*/
.timeline-section ul li {
    list-style: none;
    position: relative;
    width: 5px; /* set width to 5px then set background to lightblue for that width */
    margin: 0 auto; /* center text */
    padding-top: 5rem; /* separate each list with a padding-top of 5rem = 5 x 10px= 50px */
    background: var(--color-blue);
}

/*use pseudo elements to style*/
/*This section will help us make the node-like structure - The circle*/
.timeline-section ul li::after {
    content: "";/* The content attribute is required for pseudo-elements to render */
    position: absolute;
    left: 50%;
    bottom: 0;
    transform: translateX(-50%);
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
    background: inherit; /* inherits this property from its parent element */
}


/* Content box */
.timeline-section ul li div {
    width: 40rem;
    font-size: 1.2rem;
    position: relative;
    bottom: 0;
    padding: 1.5rem;
    /*glassmorphism effect*/
    background: rgba(255,255,255,.2);
    -webkit-backdrop-filter: blur(5px);
    backdrop-filter: blur(5px);
    box-shadow: 20px 20px 50px rgba(0, 0, 0, 0.5);
    border-radius: 10px;
    border-top: 2px solid rgba(255, 255, 255, 0.5);
    border-left: 2px solid rgba(255, 255, 255, 0.5);
    border-bottom: 2px solid rgba(255, 255, 255, 0.5);
    border-right: 2px solid rgba(255, 255, 255, 0.5);
    border: 1px solid rgba(255,255,255,0.2);
}

/* Triangle */
.timeline-section ul li div::before {
    content: "";
    position: absolute;
    bottom: 7px;
    width: 0;
    height: 0;
    border-style: solid;
}

/*This is to select the divs at odd position so we can separate the divs to the right part*/
.timeline-section ul li:nth-child(odd) div {
    left: 45px;  /* this style pushes the divs at odd number position to the right */
}
  
/*this showcases the triangle*/
.timeline-section ul li:nth-child(odd) div::before {
    left: -15px;
    border-width: 8px 16px 8px 0;
    border-color: transparent var(--light-blue) transparent transparent;
}
 
/*This is to select the divs at even number position so we can separate the divs to the left part*/
.timeline-section ul li:nth-child(even) div {
    left: -439px;
}
  
/*this showcases the triangle*/
.timeline-section ul li:nth-child(even) div::before {
    right: -15px;
    border-width: 8px 0 8px 16px;
    border-color: transparent transparent transparent var(--light-blue); 
}

/*style the time tag*/
time {
    display: block;
    font-size: 1.1rem;
    font-weight: 800;
    margin-bottom: 7px;
}

.timeline-section ul li::after {
    transition: all 0.5s ease-in-out;
}  

 
/*this changes the node content..giving it a background of white and making the border thicker*/
.timeline-section ul li.slide-in::after {
    background: var(--white);
    border: 3px solid var(--light-blue);
}

/* Hide event card initially */
.timeline-section ul li div {
    visibility: hidden;
    opacity: 0;
    transition: all 0.5s ease-in-out;
}
  
.timeline-section ul li:nth-child(odd) div {
    transform: translateX(20rem);
}

.timeline-section ul li:nth-child(even) div {
    transform: translateX(-20rem);
}

/* display the event card */
.timeline-section ul li.slide-in div {
    transform: none;
    visibility: visible;
    opacity: 1;
}

/* Tablet Width */
@media screen and (max-width: 900px) {
    .timeline-section ul li div {
      width: 25rem;
   }

.timeline-section ul li:nth-child(even) div {
      left: -289px;
    }
}

/* Mobile width */
@media screen and (max-width: 600px) {
    .timeline-section ul li {
      margin-left: 2rem;
    }
  
    .timeline-section ul li div {
      width: calc(100vw - 91px);
    }
  
    .timeline-section ul li:nth-child(even) div {
      left: 45px;
    }
  
    .timeline-section ul li:nth-child(even) div::before {
      left: -15px;
      border-width: 8px 16px 8px 0;
      border-color: transparent var(--light-blue) transparent transparent;
    }
}


```

Note, in case you lost about what the event cards mean; event cards are the *divs* used in storing the content for each event.

### Conclusion

This tutorial showed you how to build a timeline chart using HTML to build its structure, CSS to style it as desired and Javascript to animate the chart.

You also learned how to create a method that detects if an element is in the viewport, after which we used the CSS `visibility` and `opacity` properties as well as the `translateX()` function to add animation effects.

With that, you have an animated vertical timeline chart. The source code of this application is available on [GitHub](https://github.com/shegz101/Vertical-timeline/tree/main).










