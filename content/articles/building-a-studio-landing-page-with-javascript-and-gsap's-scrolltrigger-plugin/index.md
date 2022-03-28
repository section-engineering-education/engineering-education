# Building a studio landing page with Javascript and GSAP's scrollTrigger plugin.

## Introduction

The use of animation enhances the appeal of a site and improves the user experience while navigating the website. The Greensock Animation platform popularly known as GSAP is a javascript animation library that can animate DOM elements, canvas, SVG, CSS properties, generic JavaScript objects, and so much more. Hence, it boasts about 10,000,000 websites built with it. Popular websites like Codesandbox, Drupal, Nvidia, Gitlab, and a lot more others use this tool for their animations.

GSAP introduced a plugin called ScrollTrigger for creating interactions as you scroll. The ScrollTrigger Library is an improvement of scroll-driven animation yet it is flexible, user-friendly, it supports vertical and horizontal scrolling (this effect is common amongst award-winning websites today).

In this tutorial, you will build a Studio landing page that uses GSAP for animations and ScrollTrigger to trigger the animations. The goal is to learn about the GSAP ScrollTrigger plugin and its properties, and how to use it to trigger animations on the scroll.

### Prerequisites

- A code editor installed e.g VS Code
- Basic knowledge of the use of GSAP
- A good knowledge of Html, CSS, and Javascript.

### Table of contents

- [Why use the GSAP scrollTrigger plugin](#why-use-the-gsap-scrolltrigger-plugin)
- [Trigger](#trigger)
- [Start](#start)
- [End](#end)
- [Scrub](#scrub)
- [toggleActions](#toggleactions)
- [Creating the project](#creating-the-project)
- [Adding content to the Html file](#adding-content-to-the-html-file)
- [Styling the landing page](#styling-the-landing-page)
- [Animating the website using GSAP and ScrollTrigger](#animating-the-website-using-gsap-and-scrolltrigger)
- [Conclusion](#conclusion)
- [References](#references)

### Why use the GSAP ScrollTrigger Plugin

GSAP makes it possible to animate anything on your webpage as long as javascript can interact with it. Let's say you decide to animate the three cubes as shown in the codepen image below:

![codepen](/engineering-education/building-a-studio-landing-page-with-javascript-and-gsap's-scrolltrigger-plugin/codepen.png)

you'd notice that the animations work perfectly fine. It's a group of tweens, each enabling the square to rotate at 360 degrees over a horizontal distance. While the scope of this tutorial is not to introduce you to GSAP, you can easily get up to speed with it by using [GSAP'S official docs](https://greensock.com/).
Furthermore, a problem arises when an object is off-screen. You'd notice that the animation already played before you scrolled to that section, preventing you from witnessing it. Nah! That's not fun.
This led to the creation of the ScrollTrigger Plugin. The plugin fixes this issue while enabling you to control when the animations should trigger.

### Getting familiar with the ScrollTrigger Plugin

Right before jumping into building the product for this tutorial, it would make sense to first familiarize one's self with scrolltrigger's features. The modified codepen demo can be found [here](https://codepen.io/umarmuh65823803/pen/yLpOPyN).

#### Trigger

This scrolltrigger property shows the point where we want the animation to begin. The name of the object to be animated is passed as the value of the trigger property. In this case, the trigger should be denoted this way:
` trigger: square`
From the codepen, the third square only animates when we are in the third square's ('.yellow') viewport.

#### Start

The scroll trigger activates when the top of the animated object enters the bottom of the viewport/scroller. You can change the start position by the use of the `start` property. The `start` property takes values like `top`, `bottom`, `center`. In the codepen demo it was assigned like so:
`start: 'top center'`
This tells the animation to start when the `top` of the third square hits the `center` of the viewport.

#### End

The animation deactivates when the bottom of the animated object hits the top of the viewport by default. You can change this by introducing the `end` property.
The end property is used in the example this way:
`end: 'bottom top'`
From here, the animation stops when the `bottom` of the third square hits the `top` of the viewport.

#### Scrub

Scrub makes the animation catch up with the scroll trigger. It links the animation progress with the scrollbar's position. Setting the value to true smoothens things up i.e `scrub: true`. You can also set a value for scrub and what this does is create a delay in the time (in seconds) i.e the time the playhead takes to catch up with the scrollbar e.g `scrub: 0.5`

#### toggleActions

ToggleAction controls how the animation behaves when it enters either of these toggle phases, that is `onEnter`, `onLeave`, `onEnterBack`, and `onLeaveBack`. Examples of possible values it can take include: `play`, `pause`, `restart`, `resume`, `none`, `reverse`.
To add the toggleAction property, use the following syntax:
`toggleActions: 'play pause resume pause'`.
Here, you want the animation to Play when it enters the screen/viewport(onEnter).
When we scroll past the viewport(onLeave) it pauses, but notice that it resumes when we enter back into the viewport(onEnterBack) - it unfreezes the paused animation. The final position is set to handle when we scroll back beyond the viewport(onLeaveBack), We set this to pause.
A benefit of the toggleAction property is that it improves the performance by not animating things that are not on the screen and lets the viewers see the animations on screen.

### Building the Landing page using ScrollTrigger

Now that you are familiar with the fundamentals of the scrollTrigger plugin, let's start building the Studio landing Page, you'll animate and trigger the HTML elements with GSAP and ScrollTrigger.

### Creating the project

You'll be needing a folder for this project, create a folder and label it GSAP landing page. Open the folder in VS code and create the `index.html`, `style.css`, and `index.js` files. Also, create a folder titled images to hold all the images you will be using. You can find the entire files and images in this [Github Repo](https://github.com/deverten/GSAP-Studio-Landing-Page)

### Adding content to the Html file

Add the following contents to the Html file you created:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <link rel="stylesheet" href="style.css" />
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.9.1/gsap.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.9.1/ScrollTrigger.min.js"></script>
    <script src="index.js" defer></script>
  </head>
  <body>
    <header class="header">
      <nav>
        <div class="navbar">
          <img src="images/logo.svg" alt="" />
          <ul>
            <li>
              <a href="#">About</a>
            </li>
            <li>
              <a href="#">Careers</a>
            </li>
            <li>
              <a href="#">Events</a>
            </li>
            <li>
              <a href="#">Products</a>
            </li>
            <li>
              <a href="#">Supports</a>
            </li>
          </ul>

          <img class="hamburger" src="images/icon-hamburger.svg" alt="" />
        </div>
        <div class="advert">
          <h1>IMMERSIVE EXPERIENCES THAT DELIVER</h1>
        </div>
      </nav>
    </header>
    <section>
      <div class="img-div">
        <img
          class="interactive-img"
          src="./images/image-interactive.jpg"
          alt="vr-image"
        />
      </div>

      <div class="interactive-div">
        <h3>THE LEADER IN INTERACTIVE VR</h3>
        <p>
          Founded in 2011, Loopstudios has been producing world-class virtual
          reality projects for some of the best companies around the globe. Our
          award-winning creations have transformed businesses through digital
          experiences that bind to their brand.
        </p>
      </div>
    </section>
    <article>
      <div class="label">
        <h3>OUR CREATIONS</h3>
        <button>SEE ALL</button>
      </div>
      <div class="photos">
        <div class="box img-box1">
          <img src="images/image-deep-earth.jpg" alt="" />
          <p>DEEP EARTH</p>
        </div>
        <div class="box img-box2">
          <img src="images/image-night-arcade.jpg" alt="" />
          <p>NIGHT ARCADE</p>
        </div>
        <div class="box img-box3">
          <img src="images/image-soccer-team.jpg" alt="" />
          <p>SOCCER TEAM VR</p>
        </div>
        <div class="box img-box4">
          <img src="images/image-grid.jpg" alt="" />
          <p>THE GRID</p>
        </div>
        <div class="box img-box5">
          <img src="images/image-from-above.jpg" alt="" />
          <p>FROM UP ABOVE VR</p>
        </div>
        <div class="box img-box6">
          <img src="images/image-pocket-borealis.jpg" alt="" />
          <p>POCKET BOREALIS</p>
        </div>
        <div class="box img-box7">
          <img src="images/image-curiosity.jpg" alt="" />
          <p>THE CURIOSITY</p>
        </div>
        <div class="box img-box8">
          <img src="images/image-fisheye.jpg" alt="" />
          <p>MAKE IT FISHEYE</p>
        </div>
      </div>
    </article>
    <div class="virtual-reality">
      <img
        class="layer"
        src="https://cdn.pixabay.com/photo/2021/11/22/00/02/interior-design-6815493__340.jpg"
        alt=""
      />
      <img
        class="layer"
        src="https://cdn.pixabay.com/photo/2022/03/03/21/30/vr-7046094__340.jpg"
        alt=""
      />
      <img
        class="layer"
        src="https://cdn.pixabay.com/photo/2021/12/24/13/01/vr-6891052__340.jpg"
        alt=""
      />
      <img
        class="layer"
        src="https://cdn.pixabay.com/photo/2021/12/26/03/48/earth-6894160__340.jpg"
        alt=""
      />
      <img
        class="layer"
        src="https://media.istockphoto.com/vectors/astronaut-looking-on-earth-from-alien-planet-vector-id1324630423?k=20&m=1324630423&s=612x612&w=0&h=b1-F0bexQ28zFZEl4igb1Nlda6zkmjDu_goGv3dg-Xc="
        alt=""
      />
    </div>
    <footer>
      <div class="logos">
        <img src="images/logo.svg" alt="" />
        <div class="icons">
          <img src="images/icon-facebook.svg" alt="" />
          <img src="images/icon-twitter.svg" alt="" />
          <img src="images/icon-pinterest.svg" alt="" />
          <img src="images/icon-instagram.svg" alt="" />
        </div>
      </div>
      <div class="bottom">
        <ul id="footer-list">
          <li>
            <a href="#">About</a>
          </li>
          <li>
            <a href="#">Careers</a>
          </li>
          <li>
            <a href="#">Events</a>
          </li>
          <li>
            <a href="#">Products</a>
          </li>
          <li>
            <a href="#">Support</a>
          </li>
        </ul>
        <p>&copy 2021 Loopstudios. All rights reserved.</p>
      </div>
    </footer>
  </body>
</html>
```

The HTML document is sectioned into the following major parts:
`header`, `section`, `article`, and `footer`.

### Styling the landing page

To make the HTML page more appealing, paste the following CSS styles in the style.css file.

```css
@import url("https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@100;200;300;400&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Alata&display=swap");
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: "Alata", sans-serif;
  color: blue;
  overflow-x: hidden;
}
h1 {
  color: #fff;
  font-size: 4rem;
  font-weight: 100;
}
p {
  font-size: 15px;
}
header {
  background-image: url("./images/image-hero.jpg");
  max-width: 100%;
  height: 80vh;
}
.virtual-reality {
  justify-content: center;
  align-items: center;
}
.virtual-reality img {
  display: block;
  margin: 2rem auto;
  height: 80vh;
  width: 80vw;
}

nav {
  display: flex;
  flex-wrap: wrap;
  width: 85%;
  margin: 0rem auto;
}
.navbar {
  display: flex;
  width: 100%;
  justify-content: space-between;
  padding: 3rem 0;
}
.hamburger {
  display: none;
}

h3 {
  color: #fff;
}
ul {
  display: flex;
  gap: 2rem;
}
li {
  list-style-type: none;
}
a {
  font-family: inherit;
  text-decoration: none;
  color: #fff;
  font-size: 15px;
  padding-bottom: 0.7rem;
}
a:hover {
  border-bottom: 3px solid #fff;
}
a.active {
  border-bottom: 3px solid #fff;
}

.advert {
  width: 50%;
  display: flex;
  margin-top: 3rem;
  padding: 1rem;
  text-align: left;
  flex-wrap: wrap;
  border: 1px solid #fff;
}
.advert h1 {
  max-width: 100%;
}
section {
  width: 85%;
  position: relative;
  display: flex;
  margin: 3.5rem auto 7rem auto;
  justify-content: space-between;
}
.interactive-img {
  display: block;
}
.interactive-div {
  position: absolute;
  left: 55%;
  background: #fff;
  bottom: 0;
  padding: 4rem 0 0 4rem;

  max-width: 600px;
}

h3 {
  letter-spacing: 3px;
  font-weight: 100;
  margin-bottom: 1rem;
  color: #000;
  font-size: 3rem;
}
section p {
  font-size: 15px;
  line-height: 1.5;
  color: hsl(0, 0%, 55%);
}
article {
  width: 85%;
  margin: 1rem auto;
}
.img-div {
  /* visibility: hidden; */
  overflow: hidden;
}
.img-div img {
  transform-origin: left;
}
img {
  cursor: pointer;
  max-width: 100%;
}
.label {
  display: flex;
  margin-bottom: 3rem;
  justify-content: space-between;
}
.label h3 {
  color: black;
  font-size: 2.5rem;
}
article button {
  cursor: pointer;
  border: none;
  padding: 0.1rem 3rem;
  background-color: #000;
  color: #fff;
  letter-spacing: 2px;
}

.photos {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  justify-content: space-between;
}
.photos img {
  margin-bottom: 1rem;
}
.photos img:hover {
  opacity: 0.5;
}
.img-box1,
.img-box2,
.img-box3,
.img-box4,
.img-box5,
.img-box6,
.img-box7,
.img-box8 {
  position: relative;
}
.img-box1 p,
.img-box2 p,
.img-box3 p,
.img-box4 p,
.img-box5 p,
.img-box6 p,
.img-box7 p,
.img-box8 p {
  position: absolute;
  font-weight: 100;
  padding: 5px;
  left: 1rem;
  width: 60%;
  font-size: 2rem;
  bottom: 2.5rem;
  color: #fff;
}
footer {
  background-color: #000;
  padding: 2rem 0;
  margin-top: 4rem;
}
.logos {
  width: 85%;
  margin: 1rem auto 1rem auto;
  display: flex;
  justify-content: space-between;
}
.logos h3 {
  color: #fff;
  align-items: center;
}
.icons img {
  margin-left: 0.5rem;
  padding-bottom: 5px;
}
.icons img:hover {
  border-bottom: 3px solid #fff;
}
.bottom {
  width: 85%;
  justify-content: space-between;
  display: flex;
  margin: 0 auto;
}
footer p {
  color: hsl(0, 0%, 55%);
}
#footer-list {
  display: flex;
  justify-content: space-between;
}

@media screen and (max-width: 600px) {
  nav {
    width: 100%;
  }
  .navbar {
    margin: 0 1rem;
  }
  .hamburger {
    display: flex;
  }

  .advert {
    width: 85%;
    margin: 0 auto;
    justify-content: center;
  }
  header {
    background-size: cover;
  }
  .navbar ul {
    display: none;
  }
  .interactive-div {
    width: 90%;
    text-align: center;
    position: relative;
    left: 0;
    padding-left: 0;
    padding-right: 0;
    margin: 0 auto;
  }
  .label {
    width: 100%;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
  }
  .label h3 {
    margin: 0 auto;
  }

  section {
    width: 95%;
    flex-direction: column;
  }
  article {
    width: 95%;
    justify-content: center;
  }
  .interactive-img {
    width: 100%;
  }
  .photos {
    margin: 0 auto;

    flex-direction: column;
    width: 100%;
  }
  .virtual-reality {
    margin-bottom: 2rem;
  }
  .virtual-reality img {
    height: 50vh;
  }

  .img-box1 img,
  .img-box2 img,
  .img-box3 img,
  .img-box4 img,
  .img-box5 img,
  .img-box6 img,
  .img-box7 img,
  .img-box8 img {
    max-width: 100%;
    width: 100%;
    height: 50vh;
    margin: 1rem 0;
  }
  .bottom {
    flex-direction: column;
    align-items: center;
  }
  footer {
    position: sticky;
    height: 35vh;
  }
  #footer-list {
    flex-direction: column;
    margin: 0 auto;
    gap: 0.5rem;
  }

  .logos {
    align-items: center;
    justify-content: center;
    flex-direction: column;
    margin: 0.2rem auto;
  }
}

@media screen and (max-width: 900px) {
  .advert h1 {
    font-size: 2.5rem;
  }
}
```

You now have a responsive website but without animations.

### Animating the website using GSAP and ScrollTrigger

Now, on to animating the HTML elements with GSAP. Note that the CDNs for Gsap and scrollTrigger were added using the script tag in the `head` of the HTML file. It would be impossible to create animations and trigger them on scroll without registering them like so. Edit the index.js file to resemble this:

```javascript
//Registering the scrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

//Animating the advert div with GSAP
gsap.fromTo(
  ".advert",
  { xPercent: 30 },
  { duration: 3, xPercent: 0, ease: "bounce" }
);

//Animating the Section elements
gsap
  .timeline()
  .from(".img-div img", {
    xPercent: -100,
    duration: 1,
    scrollTrigger: {
      trigger: ".img-div",
      start: "top center",
      end: "bottom center",
      scrub: true,
    },
  })
  .fromTo(
    ".interactive-div",
    { yPercent: -50, scale: 0.5 },
    {
      opacity: 1,
      yPercent: 0,
      scale: 1,
      scrollTrigger: {
        trigger: ".interactive-div",
        start: "top center",
        end: "bottom center",
        scrub: true,
      },
    }
  );
```

- From the code snippet above, the `scrollTrigger` plugin was first registered to enable the animation of elements on scroll. Simple animation is created for the `.advert` class using `gsap.fromTo`. The animation starts near the middle of the page `xPercent: 30` to the left `xPercent: 0`, bounces `ease: bounce` when it reaches the end. The entire animation takes place in three seconds `duration: 3`.
- Next, is a `timeline` created to control the following tweens as a whole.
  The `img-div` image is animated from the left of its container using `xPercent:-100`. This doesn't yet animate on scroll, so the scrollTrigger property is added and the `trigger` targets the `img-div` class, the image is set to begin animating when the top of the image is scrolled to the center of the page and should end when the bottom reaches the center. The scrub is added to synchronize the progress of the animation on scroll. The same process is repeated for the `interactive-div` which contains text, the element is animated from the middle(50%) of its container to the bottom(0%), its `scale` increases from `0.5` to `1.0` and it takes the scrub property to ensure a smooth animation.
  Awesome! Reload your browser and notice the nice animation that plays when you scroll.
- Now it's time to animate the `article` section of the website.
  Copy and paste the following codes in your `index.js` file:

```javascript
// Animating the article images
gsap.to(".box", 1, {
  scale: 0.3,
  y: 60,
  yoyo: true,
  repeat: -1,
  ease: "power1.inOut",
  delay: 2,
  stagger: {
    amount: 1.5,
    grid: "auto",
    from: "center",
  },
});
```

GSAP's `stagger` property is used in the snippet above to create a start time lag between each `.box` class animation. The `.box` class which contains the image is reduced in `scale` from `1` to `0.3`, it moves down the `y-axis` by `50px`. The `yoyo: true` and `repeat: -1` properties ensure that each `box` image animation waits for the entire animation to complete before restarting the whole sequence. It `eases` gently and then moves faster and a `delay` time of 2 seconds is set. The `stagger` property as an object takes in `amount: 1.5` which means the total time that is split between the staggers. In this case, 1.5/8 = 0.187 seconds is the time between each image's animation, `grid: auto` automatically calculates the rows and columns for responsive layouts, and `from: center` indicates you want the animation to begin from the center. Reload the website to see the beautiful animation.

- The last step will be to animate the metaverse images. The aim is to make layers off the `metaverse images` when you scroll down. Add the following code to the index.js file:

```javascript
//Animating the Metaverse images
gsap.utils.toArray(".layer").forEach((layer, i) => {
  ScrollTrigger.create({
    trigger: layer,
    start: "top top",
    pin: true,
    pinSpacing: false,
  });
});
```

From the code snippet and HTML document, you'd notice all the metaverse images have a class of `layer`. Gsap makes an array off this class and allows looping through them using the `forEach` method. For each layer, a scrollTrigger is created and the animation kicks off when the element reaches the top of the viewport. The current layer is pinned on top of the previous `pin: true` and spacing between them is set to false.
The demo website can be found on this [link](https://deverten.github.io/GSAP-Studio-Landing-Page/)

### Conclusion

Hooray! You've learned and applied the fundamental properties of GSAP'S scrollTrigger plugin by building a landing page. Hopeful to see you animate some more websites with this knowledge.
Have fun building!

### References

- [Greensock Docs](https://greensock.com/docs/)
- [ScrollTrigger Demos](https://greensock.com/st-demos/)
