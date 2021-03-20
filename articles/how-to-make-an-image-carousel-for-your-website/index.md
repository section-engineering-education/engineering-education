### Introduction
An Image Carousel is a container(slideshow) of images or text that a user can select by clicking a button that directs him forward or backward in collecting images. It enables the website to be more interactive and hence enhance the user experience. The images' collection can be set to change automatically using a timer or manually when the user clicks the displayed buttons.

### Goal
To add an image carousel to our website to enhance user experience and improve the website's user interface.

### Prerequisites
* The reader should have basic knowledge in HTML, CSS, and JavaScript, especially the use of functions in Javascript. 
* A code editor installed. The recommended text editor is [Visual Studio code](https://visualstudio.microsoft.com/downloads/). 


### Procedure
### Step 1 - Creating a new project.
Open Visual Studio Code and create a new folder. In that folder add three files ending with the .html extension, .css extension and .js extension for the HTML,CSS and Javascript files in which you will type the respective codes.

### Step 2 - Write the HTML code
Html is like our code's skeleton, so it will lay out the frame of our work onto which we shall continue modifying by using other languages. In this step, we will define containers with our images using the `<div>` tags. We also define our buttons which will enable the user to move through the carousel. The small circles at the bottom of the carousel are also defined. The code has comments just for one to follow through. Dive into the HTML file and write the code as illustrated below.
 
```HTML
 <!-- Slideshow container -->
<div class="slideshow-container">

  <!-- Full-width images with number and caption text -->
  <div class="mySlides fade">
    <div class="numbertext">1 / 3</div>
    <img src="img1.jpg" style="width:100%">
    <div class="text">Caption Text</div>
  </div>

  <div class="mySlides fade">
    <div class="numbertext">2 / 3</div>
    <img src="img2.jpg" style="width:100%">
    <div class="text">Caption Two</div>
  </div>

  <div class="mySlides fade">
    <div class="numbertext">3 / 3</div>
    <img src="img3.jpg" style="width:100%">
    <div class="text">Caption Three</div>
  </div>

  <!-- Next and previous buttons -->
  <a class="prev" onclick="plusSlides(-1)">&#10094;</a>
  <a class="next" onclick="plusSlides(1)">&#10095;</a>
</div>
<br>

<!-- The dots/circles -->
<div style="text-align:center">
  <span class="dot" onclick="currentSlide(1)"></span>
  <span class="dot" onclick="currentSlide(2)"></span>
  <span class="dot" onclick="currentSlide(3)"></span>
</div> 
```
### Step -2 Write the HTML code
In the CSS file, we will style our HTML. We style the containers for the images, the buttons, and the small circles(we will call them navigation circles). We also position them in desired places using the various CSS properties. The code has comments just for one to follow through. 

```CSS
* {box-sizing:border-box}

/* Slideshow container */
.slideshow-container {
  max-width: 1000px;
  position: relative;
  margin: auto;
}

/* Hide the images by default */
.mySlides {
  display: none;
}

/* Next & previous buttons */
.prev, .next {
  cursor: pointer;
  position: absolute;
  top: 50%;
  width: auto;
  margin-top: -22px;
  padding: 16px;
  color: white;
  font-weight: bold;
  font-size: 18px;
  transition: 0.6s ease;
  border-radius: 0 3px 3px 0;
  user-select: none;
}

/* Position the "next button" to the right */
.next {
  right: 0;
  border-radius: 3px 0 0 3px;
}

/* On hover, add a black background color with a little bit see-through */
.prev:hover, .next:hover {
  background-color: rgba(0,0,0,0.8);
}

/* Caption text */
.text {
  color: #f2f2f2;
  font-size: 15px;
  padding: 8px 12px;
  position: absolute;
  bottom: 8px;
  width: 100%;
  text-align: center;
}

/* Number text (1/3 etc) */
.numbertext {
  color: #f2f2f2;
  font-size: 12px;
  padding: 8px 12px;
  position: absolute;
  top: 0;
}

/* The dots/bullets/indicators */
.dot {
  cursor: pointer;
  height: 15px;
  width: 15px;
  margin: 0 2px;
  background-color: #bbb;
  border-radius: 50%;
  display: inline-block;
  transition: background-color 0.6s ease;
}

.active, .dot:hover {
  background-color: #717171;
}

/* Fading animation */
.fade {
  -webkit-animation-name: fade;
  -webkit-animation-duration: 1.5s;
  animation-name: fade;
  animation-duration: 1.5s;
}

@-webkit-keyframes fade {
  from {opacity: .4}
  to {opacity: 1}
}

@keyframes fade {
  from {opacity: .4}
  to {opacity: 1}
}
```
### Step 4 - Write the Javascript code
In this step, we define the functions we had linked to our buttons in the HTML file. Also, we will include a timer so that our image carousel displays images automatically like a slideshow. Add the following lines of code in the Javascript file. The code has comments just for one to follow through. 

```js
var slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
} 
```
**Remember to link the .css file and the .js file to the HTML file. To remind yourself click [ here ](https://www.w3schools.com/tags/att_script_src.asp) for css or click [ here ](https://www.w3schools.com/tags/att_script_src.asp)js.**

To make the carousel change images automatically without the user input, we need to modify our Javascript code. In this code, we will include a timer of 2 seconds.
```js
var slideIndex = 0;
showSlides();

function showSlides() {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slideIndex++;
  if (slideIndex > slides.length) {slideIndex = 1}
  slides[slideIndex-1].style.display = "block";
  setTimeout(showSlides, 2000); // Change image every 2 seconds
} 
```
### Testing
One can test whether the code works by navigating to the folder where the project is stored and opening the HTML file using any browser. The code should work just fine.
### Conclusion
In this article, we have learned how to implement an Image carousel on websites. An image Carousel can view various images or videos by scrolling left or right hence getting an overview of the website. Image carousels are essential in websites because they improve the user interface and experience of a website.  Image carousels are a great way to show content cards.




