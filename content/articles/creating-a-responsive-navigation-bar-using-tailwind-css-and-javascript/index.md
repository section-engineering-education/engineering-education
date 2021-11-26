---
layout: engineering-education
status: publish
published: true
url: /creating-a-responsive-navigation-bar-using-tailwind-css-and-javascript/
title: Creating a Responsive Navigation bar Using Tailwind CSS and Javascript 
description: In this tutorial, we are going to create a responsive navigation bar with Tailwind CSS and JavaScript. The navigation bar will transform into a hamburger menu on small screen devices. We will use JavaScript to create the toggle functionality for the hamburger menu.
author: ian-masae
date: 2021-07-08T00:00:00-08:00
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/creating-a-responsive-navigation-bar-using-tailwind-css-and-javascript/hero.jpg
    alt: Navigation Bar Image Example
---
What is a navigation bar? A navigation bar is a tool located at the top most position of a webpage. It is used by website visitors to steer through different sections of the website. A navigation bar comes in handy when a webpage is long. It helps the user to easily navigate to specific sections of the webpage. A navigation bar should, therefore, be simple and easy to use.
<!--more-->
### Introduction
In the Tailwind CSS framework, you can easily style up your website by adding styles directly into your HTML file through the use of various Tailwind CSS classes. This has made it much easier to create both mobile friendly and desktop friendly designs. The layout of the webpage transforms according to the size of the screen in which the website is being viewed on. This kind of website is said to be responsive.

In this tutorial, we are going to create a responsive navigation bar with Tailwind CSS and JavaScript. The navigation bar will transform into a hamburger menu on small screen devices. We will use JavaScript to create the toggle functionality for the hamburger menu.

### Prerequisites
1. Latest version of Tailwind CSS installed
2. Knowledge of Tailwind CSS
3. Knowledge of JavaScript functions

### Adding Tailwind CSS to your project
Visit this [article](/engineering-education/introduction-to-tailwind-css/) for complete installation process of the Tailwind CSS framework.

After installation of Tailwind CSS, we will link our Tailwind stylesheet using the link tag as shown:

```html
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<meta http-equiv="X-UA-Compatible" content="IE=edge" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<title>Navigation</title>
		<link rel="stylesheet" href="./css/tailwind.css" />
	</head>
</html>
```

We are all set to begin creating our navigation bar!

### Our HTML
In the snippet above, We gave our page a title, "Navigation".

Next, in the `<body>` tag, we add a `<nav>` tag and classes as shown:

```html
<body>
	<!-- Navbar goes here -->
	<nav class="bg-white shadow-lg">
		<div class="max-w-6xl mx-auto px-4">
			<div class="flex justify-between">
				<div class="flex space-x-7">
					<!-- Website Logo -->
					<div>
						<a href="#" class="flex items-center py-4 px-2">
							<img src="logo.png" alt="Logo" class="h-8 w-8 mr-2" />
							<span class="font-semibold text-gray-500 text-lg"
								>Navigation</span
							>
						</a>
					</div>
					<!-- Primary Navbar items -->
					<div class="hidden md:flex items-center space-x-1">
						<a
							href=""
							class="py-4 px-2 text-green-500 border-b-4 border-green-500 font-semibold "
							>Home</a
						>
						<a
							href=""
							class="py-4 px-2 text-gray-500 font-semibold hover:text-green-500 transition duration-300"
							>Services</a
						>
						<a
							href=""
							class="py-4 px-2 text-gray-500 font-semibold hover:text-green-500 transition duration-300"
							>About</a
						>
						<a
							href=""
							class="py-4 px-2 text-gray-500 font-semibold hover:text-green-500 transition duration-300"
							>Contact Us</a
						>
					</div>
				</div>
			</div>
		</div>
	</nav>
</body>
```

In the above snippet, we have added a white background color and a large shadow for our navigation bar to make it pop up a little.

Next, we add the following classes to the first `<div>` tag:

```html
<div class="max-w-6xl mx-auto px-4"></div>
```

This is the containment `<div>` into which all our navigation bar items will be placed. We have added the following classes to the tag :

- `max-w-6xl` class limits the width of our navigation bar to 1152px.
- `mx-auto` class centers the navigation bar.
- `px-4` class adds a padding of 16px on the left and right side of the content in the navigation bar.

Next, we add the following classes to the second `<div>` tag:

```html
<div class="flex justify-between"></div>
```

This is another containment `<div>` which makes our navbar items lie side by side. We have added the following classes to the tag :

- `flex` class aligns the children `<div>` tags vertically.

- `justify-between` class creates a space between children `<div>` tags. From our divisions, space will be added between the first division that contains the website logo, the division containing the primary navbar items, and the second division that contains the secondary navbar items.

Next, we will add the following classes to the third `<div>` tag:

```html
<div class="flex space-x-7"></div>
```

This tag wraps the two `<div>` tags containing our website logo and our primary navbar items. We will add `flex` and `space-x-7` classes which will align our logo and the navbar items vertically, and add some space between the items respectively.

### Website Logo
For this tutorial, I have used a basic image file as a logo and modified its height and width to make it fit in the Navigation bar. Here is our code :

```html
<div>
	<!-- Website Logo -->
	<a href="#" class="flex items-center py-4 px-2">
		<img src="logo.png" alt="Logo" class="h-8 w-8 mr-2" />
		<span class="font-semibold text-gray-500 text-lg">Navigation</span>
	</a>
</div>
```

In the above snippet, we have used `<a>`, `<img>` and `<span>` tags to create our logo.

We have added the following classes to the `<a>` tag:

- `flex` class aligns the image and text vertically.
- `items-center` class centers the logo and text in the container.
- `py-4` class adds a padding of 16px
- `px-2` class adds a padding of 8px

We have added the following classes to the `<img>` tag :

- `h-8` class limits the height of the image to 32px
- `w-8` class limits the width of the image to 32px
- `mr-2` class adds a space of 8px to the right margin of the image

We have added the following classes to the `<span>` tag :

- `font-semibold` class makes the text appear semi-bold.
- `text-gray-500` class makes the text appear gray in color.
- `text-lg` class increases the font size of the text.

### Primary Menu Items
This section contains the menu items that will be used by the website visitor to navigate through the page. Here is our code :

```html
<!-- Primary Navbar items -->
<div class="hidden md:flex items-center space-x-1">
	<a
		href=""
		class="py-4 px-2 text-green-500 border-b-4 border-green-500 font-semibold "
		>Home</a
	>
	<a
		href=""
		class="py-4 px-2 text-gray-500 font-semibold hover:text-green-500 transition duration-300"
		>Services</a
	>
	<a
		href=""
		class="py-4 px-2 text-gray-500 font-semibold hover:text-green-500 transition duration-300"
		>About</a
	>
	<a
		href=""
		class="py-4 px-2 text-gray-500 font-semibold hover:text-green-500 transition duration-300"
		>Contact Us</a
	>
</div>
```

We have used the following classes in the `<div>` tag :

- `hidden` class hides the navbar items when viewed in a small screen size.
- `md:flex` class aligns the navbar items side by side. On medium screen devices, the navbar items will appear

We have used the following classes to the `<a>` tags :

- `hover:text-green-500` class adds a hover effect on the link by making the text color change to green.
- `transition` class makes the hover effect have a delay to make it appealing.
- `duration-300` class adds a transition delay of 300 milliseconds.

### Secondary Menu Items
This section shows the sign up and login buttons.

```html
<!-- Secondary Navbar items -->
<div class="hidden md:flex items-center space-x-3 ">
	<a
		href=""
		class="py-2 px-2 font-medium text-gray-500 rounded hover:bg-green-500 hover:text-white transition duration-300"
		>Log In</a
	>
	<a
		href=""
		class="py-2 px-2 font-medium text-white bg-green-500 rounded hover:bg-green-400 transition duration-300"
		>Sign Up</a
	>
</div>
```

We have used the following classes :

- `rounded` class makes the button have a rounded look.
- `hover:bg-green-500` class adds a hover effect on the link by making the background color change to green.

### Mobile Menu Button
The navigation bar will transform into a hamburger menu on small screen devices, and the menu items will be in vertical position. We will use JavaScript to create the toggle functionality for the hamburger menu.

Here is our code:

```html
<!-- Mobile menu button -->
<div class="md:hidden flex items-center">
	<button class="outline-none mobile-menu-button">
		<svg
			class="w-6 h-6 text-gray-500"
			x-show="!showMenu"
			fill="none"
			stroke-linecap="round"
			stroke-linejoin="round"
			stroke-width="2"
			viewBox="0 0 24 24"
			stroke="currentColor"
		>
		<path d="M4 6h16M4 12h16M4 18h16"></path>
		</svg>
	</button>
</div>
```

We have used an SVG icon to make the hamburger menu button. We modified its height and width with the `h-6` and `w-6` classes. We also changed its color to gray with `text-gray-500` class.

Other classes that we have used are explained below.

- `md:hidden` class hides the mobile menu button when viewed in a medium screen size.
- `flex` class aligns the hamburger menu side by side with the other items in the navbar.
- `outline-none` class removes the outline border when the button is clicked.

We have named our hamburger menu button as `mobile-menu-button` so that we may be able to identify it when we are writing our JavaScript code.

### Mobile Menu
We will have to create new menu items that will appear when the mobile menu button is clicked. Here is our code:

```html
<!-- Mobile menu -->
<div class="hidden mobile-menu">
	<ul class="">
		<li class="active"><a href="index.html" class="block text-sm px-2 py-4 text-white bg-green-500 font-semibold">Home</a></li>
		<li><a href="#services" class="block text-sm px-2 py-4 hover:bg-green-500 transition duration-300">Services</a></li>
		<li><a href="#about" class="block text-sm px-2 py-4 hover:bg-green-500 transition duration-300">About</a></li>
		<li><a href="#contact" class="block text-sm px-2 py-4 hover:bg-green-500 transition duration-300">Contact Us</a></li>
	</ul>
</div>
```

We have used the following classes :

- `hidden` class hides the mobile menu items and will only show when the mobile menu button is clicked.
- `block` class aligns the menu items in vertical position like a list.

We have named our mobile menu as `mobile-menu` so that we may be able to identify it when we are writing our JavaScript code.

### Toggle Functionality
We will use JavaScript to add the toggle functionality to our mobile menu button so that when we click the button, it hides or shows the mobile menu items.

We will add the JavaScript code directly into our HTML code using the `<script>` tag instead of creating a JavaScript file and linking it to our HTML.

We grab the HTML elements that we want to add functionality to as shown:

```JavaScript
// Grab HTML Elements
const btn = document.querySelector("button.mobile-menu-button");
const menu = document.querySelector(".mobile-menu");
```

Then we add event listeners as shown:

```JavaScript
// Add Event Listeners
btn.addEventListener("click", () => {
	menu.classList.toggle("hidden");
});
```

This will add the toggle functionality to the mobile menu button, therefore, when you click the button, the mobile menu shows, and when you click again, it hides.

Here is the full JavaScript code:

```html
<script>
	// Grab HTML Elements
	const btn = document.querySelector("button.mobile-menu-button");
	const menu = document.querySelector(".mobile-menu");

	// Add Event Listeners
	btn.addEventListener("click", () => {
	menu.classList.toggle("hidden");
	});
</script>
```

Our fully responsive Navigation Bar is complete!

This is the full code:

```html
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<meta http-equiv="X-UA-Compatible" content="IE=edge"/>
		<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
		<title>Navigation</title>
		<link rel="stylesheet" href="./css/tailwind.css">
	</head>
	<body>
		<!-- Navbar goes here -->
		<nav class="bg-white shadow-lg">
			<div class="max-w-6xl mx-auto px-4">
				<div class="flex justify-between">
					<div class="flex space-x-7">
						<div>
							<!-- Website Logo -->
							<a href="#" class="flex items-center py-4 px-2">
								<img src="logo.png" alt="Logo" class="h-8 w-8 mr-2">
								<span class="font-semibold text-gray-500 text-lg">Navigation</span>
							</a>
						</div>
						<!-- Primary Navbar items -->
						<div class="hidden md:flex items-center space-x-1">
							<a href="" class="py-4 px-2 text-green-500 border-b-4 border-green-500 font-semibold ">Home</a>
							<a href="" class="py-4 px-2 text-gray-500 font-semibold hover:text-green-500 transition duration-300">Services</a>
							<a href="" class="py-4 px-2 text-gray-500 font-semibold hover:text-green-500 transition duration-300">About</a>
							<a href="" class="py-4 px-2 text-gray-500 font-semibold hover:text-green-500 transition duration-300">Contact Us</a>
						</div>
					</div>
					<!-- Secondary Navbar items -->
					<div class="hidden md:flex items-center space-x-3 ">
						<a href="" class="py-2 px-2 font-medium text-gray-500 rounded hover:bg-green-500 hover:text-white transition duration-300">Log In</a>
						<a href="" class="py-2 px-2 font-medium text-white bg-green-500 rounded hover:bg-green-400 transition duration-300">Sign Up</a>
					</div>
					<!-- Mobile menu button -->
					<div class="md:hidden flex items-center">
						<button class="outline-none mobile-menu-button">
						<svg class=" w-6 h-6 text-gray-500 hover:text-green-500 "
							x-show="!showMenu"
							fill="none"
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path d="M4 6h16M4 12h16M4 18h16"></path>
						</svg>
					</button>
					</div>
				</div>
			</div>
			<!-- mobile menu -->
			<div class="hidden mobile-menu">
				<ul class="">
					<li class="active"><a href="index.html" class="block text-sm px-2 py-4 text-white bg-green-500 font-semibold">Home</a></li>
					<li><a href="#services" class="block text-sm px-2 py-4 hover:bg-green-500 transition duration-300">Services</a></li>
					<li><a href="#about" class="block text-sm px-2 py-4 hover:bg-green-500 transition duration-300">About</a></li>
					<li><a href="#contact" class="block text-sm px-2 py-4 hover:bg-green-500 transition duration-300">Contact Us</a></li>
				</ul>
			</div>
			<script>
				const btn = document.querySelector("button.mobile-menu-button");
				const menu = document.querySelector(".mobile-menu");

				btn.addEventListener("click", () => {
					menu.classList.toggle("hidden");
				});
			</script>
		</nav>
		<h1 class="text-green-500 text-2xl md:text-3xl lg:text-4xl font-bold p-4">Tailwind Navigation Toolbar</h1>
	</body>
</html>
```

The navigation bar will look like this when viewed on different screen sizes:

a) On large screens

![Large Screen View](/engineering-education/creating-a-responsive-navigation-bar-using-tailwind-css-and-javascript/img-desktop-view.png)

b) On medium screens

![Medium Screen View](/engineering-education/creating-a-responsive-navigation-bar-using-tailwind-css-and-javascript/img-medium-view.png)

c) On small screens

![Small Screen View](/engineering-education/creating-a-responsive-navigation-bar-using-tailwind-css-and-javascript/img-mobile-view.png)

### Conclusion
In this article, we have gone through creating our own responsive navigation bar using Tailwind CSS. We have also learnt how to create the toggle functionality for our navbar using JavaScript. A navigation bar is an example of the many things you can create using Tailwind CSS classes. A navigation bar is an important tool for user navigation experience.

I hope you will find this tutorial helpful!

### Resources & References
- [Building Tailwind CSS Navbars - Mobile Navigation Too! ](https://www.youtube.com/watch?v=puaX_nhTMRU)
- [Tailwind CSS framework](/engineering-education/introduction-to-tailwind-css/)

---
Peer Review Contributions by: [Peter Kayere](/engineering-education/authors/peter-kayere/)
