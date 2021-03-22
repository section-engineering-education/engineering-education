### Introduction
An Image Carousel is a container(slideshow) of images or Info that a user can select by clicking a button that directs him forward or backward in collecting images. It enables the website to be more interactive and hence enhance the user experience. The images' collection can be set to change automatically using a timer or manually when the user clicks the displayed buttons.

### Goal
To add an image carousel to our website to enhance user experience and improve the website's user interface.

### Prerequisites
* The reader should have basic knowledge in HTML, CSS, and JavaScript, especially the use of functions in Javascript. 
* A code editor installed. The recommended Info editor is [Visual Studio code](https://visualstudio.microsoft.com/downloads/). 


### Procedure
### Step 1 - Creating a new project.
Open Visual Studio Code and create a new folder. In that folder add three files ending with the .html extension, .css extension and .js extension for the HTML,CSS and Javascript files in which you will type the respective codes.

### Step 2 - Write the HTML code
Html is like our code's skeleton, so it will lay out the frame of our work onto which we shall continue modifying by using other languages. In this step, we will define containers with our images using the `<div>` tags. We also define our buttons which will enable the user to move through the carousel. The small circles at the bottom of the carousel are also defined. The code has comments just for one to follow through. Dive into the HTML file and write the code as illustrated below.
 
```HTML
 <!-- Slideshow container -->
<div class="slideshow-container fade">

  <!-- Full images with numbers and message Info -->
  <div class="Containers">
    <div class="MessageInfo">1 / 3</div>
    <img src="image1.jpg" style="width:100%">
    <div class="Info">First caption</div>
  </div>

  <div class="Containers">
    <div class="MessageInfo">2 / 3</div>
    <img src="image2.jpg" style="width:100%">
    <div class="Info">Second Caption</div>
  </div>

  <div class="Containers">
    <div class="MessageInfo">3 / 3</div>
    <img src="image3.jpg" style="width:100%">
    <div class="Info">Third Caption</div>
  </div>

  <!-- Back and forward buttons -->
  <a class="Back" onclick="plusSlides(-1)">&#10094;</a>
  <a class="forward" onclick="plusSlides(1)">&#10095;</a>
</div>
<br>

<!-- The circles/dots -->
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

/* Make the images invisible by default */
.Containers {
  display: none;
}

/* forward & Back buttons */
.Back, .forward {
  cursor: pointer;
  position: absolute;
  top: 48%%;
  width: auto;
  margin-top: -23px;
  padding: 17px;
  color: grey;
  font-weight: bold;
  font-size: 19px;
  transition: 0.5s ease;
  border-radius: 0 4px 4px 0;
  user-select: none;
}

/* Position the "forward button" to the right */
.forward {
  right: 0;
  border-radius: 4px 0 0 4px;
}

/*when the user hovers,add a black background with some little opacity */
.Back:hover, .forward:hover {
  background-color: rgba(0,0,0,0.8);
}

/* Caption Info */
.Info {
  color: #f2f2f3;
  font-size: 16px;
  padding: 10px 14px;
  position: absolute;
  bottom: 8px;
  width: 100%;
  text-align: center;
}

/* Number Info (1/3 etc) */
.MessageInfo {
  color: #f2f2f3;
  font-size: 14px;
  padding: 10px 14px;
  position: absolute;
  top: 0;
}

/* The circles or bullets and indicators */
.dot {
  cursor: pointer;
  height: 16px;
  width: 16px;
  margin: 0 3px;
  background-color: #bbb;
  border-radius: 50%;
  display: inline-block;
  transition: background-color 0.5s ease;
}

.enable, .dot:hover {
  background-color: #717161;
}

/* Faint animation */
.fade {
  -webkit-animation-name: fade;
  -webkit-animation-duration: 1.4s;
  animation-name: fade;
  animation-duration: 1.4s;
}

@-webkit-keyframes fade {
  from {opacity: .5}
  to {opacity: 2}
}

@keyframes fade {
  from {opacity: .5}
  to {opacity: 2}
}
```
### Step 4 - Write the Javascript code
In this step, we define the functions we had linked to our buttons in the HTML file. Also, we will include a timer so that our image carousel displays images automatically like a slideshow. Add the following lines of code in the Javascript file. The code has comments just for one to follow through. 

```js
var slidePosition = 1;
SlideShow(slidePosition);

// forward/Back controls
function plusSlides(n) {
  SlideShow(slidePosition += n);
}

//  images controls
function currentSlide(n) {
  SlideShow(slidePosition = n);
}

function SlideShow(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var circles = document.getElementsByClassName("dot");
  if (n > slides.length) {slidePosition = 1}
  if (n < 1) {slidePosition = slides.length}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
  }
  for (i = 0; i < circles.length; i++) {
      circles[i].className = circles[i].className.replace(" enable", "");
  }
  slides[slidePosition-1].style.display = "block";
  circles[slidePosition-1].className += " enable";
} 
```
**Remember to link the .css file and the .js file to the HTML file. To remind yourself click [ here ](https://www.w3schools.com/tags/att_script_src.asp) for css or click [ here ](https://www.w3schools.com/tags/att_script_src.asp)js.**

To make the carousel change images automatically without the user input, we need to modify our Javascript code. In this code, we will include a timer of 2 seconds.
```js
var slidePosition = 0;
SlideShow();

function SlideShow() {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slidePosition++;
  if (slidePosition > slides.length) {slidePosition = 1}
  slides[slidePosition-1].style.display = "block";
  setTimeout(SlideShow, 2000); // Change image every 2 seconds
} 
```
### Testing
One can test whether the code works by navigating to the folder where the project is stored and opening the HTML file using any browser. The code should work just fine. Check out a sample of an image carousel illustrated below from Usain Bolt's website.

 ![demo](/engineering-education/articles/how-to-make-an-image-carousel-for-your-website/example.gif)
 
 The tutorial's code can also be found on my [Github](https://github.com/KanizoRGB/Imagecarousell-for-a-website/tree/main).
### Conclusion
In this article, we have learned how to implement an Image carousel on websites. An image Carousel can view various images or videos by scrolling left or right hence getting an overview of the website. Image carousels are essential in websites because they improve the user interface and experience of a website.  Image carousels are a great way to show content cards.




