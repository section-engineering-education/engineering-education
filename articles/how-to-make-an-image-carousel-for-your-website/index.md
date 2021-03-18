
An Image Carousel is like a container of Images which the user can select through by clicking a buttons which directs him forward or backwards in the collection of images. It enables the website to be more interactive and hence enhance the user experience. The collection of Images can be set to change automatically by use of a timer or manually when the user clicks the displayed buttons.
<!--moore-->
### Goal
To add an image carousell to our website to enhance user experience and make the page more lively.

### Prerequisites
To follow along you should have some basic Knowledge in HTML,CSS and quite some good understanding of JavaScript especially the use of functions in Javascript.
You should also have a code editor installed in your laptop. The recommended text editor is [visual studio code](https://visualstudio.microsoft.com/downloads/). Click the link to download

### Procedure
#### Step -1 Creating the project
Open Visual Studio code and create a new folder. In that folder add three files ending with the .html extension, .css extension and .js extension for the HTML,CSS and Javascript files in which you will type the respective codes.

#### Step -2 Write the HTML code
Dive into the HTML file and write the code as illustrated in the figure text below. The code has illustrations so do not worry.
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
#### Step -3 Write the CSS code
Dive into the css file which you created and write the following. The code has illustrations to guide you on what is happening so do not worry.
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
#### Step -4 Write the Javascript code
Enter into the Javascript file and write the following code. The code has comments to guide you on what is happening .
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
**N/B**

Remember to link the .css file and the .js file to your HTMl file. To remind yourself [click here](https://www.w3schools.com/tags/att_script_src.asp).

### Automatic slide-show
In order to make the images in the carousel change automatically without the user input,we need to modify our Javascript code. Use the following code. In this code,we include a timer of 2 seconds.
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
You  can test whether your code works. Navigate to the folder where your project is stored and open the HTML file using any browser of your choice. The code should  work just fine.
### Conclusion
Image carousels are important in a website in the sense that they reduce the clutter within a website which may make discourage the user from scrolling further. Within an image Carousell the user can view various images or videos by scrolling left or right hence getting an overview of what's in the website and thus a higher chance for them finding something that interests them. Image carousels are a great way for showing content cards.




