---
layout: engineering-education
status: publish
published: true
url: /card-components-using-tailwind-css/
title: Making Card Components Using Tailwind CSS
description: In this article, the reader will understand how to create various cards that are mostly used in web pages. We will use Tailwind CSS classes to create and style them.
author: ian-masae
date: 2021-10-08T00:00:00-07:40
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/card-components-using-tailwind-css/hero.jpg
    alt: Card Components Using Tailwind CSS Hero Image
---
What is a card component? Card components are like containers used to group related pieces of information about items, products or functions. They usually show information in an appealing way.
<!--more-->
A card component can be a product advert, a blog post, or even a user profile.

By the end of this tutorial, you will understand how to create and style different types of cards using Tailwind CSS classes.

Let’s jump into it!

### Adding Tailwind into your project
I will assume that you have the latest version of Tailwind added into your project. If not, I suggest you go through this [article](https://www.section.io/engineering-education/introduction-to-tailwind-css/) first.

After the installation process, we will link our Tailwind CSS stylesheet to our project as shown below:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <link rel="stylesheet" href="./public/tailwind.css" />
  </head>
</html>
```

### Setting up our page
First, we will set the background for our web page. In this case, green.

Next, we will specify the height of our containment `<div>` into which the cards will be displayed as shown below:

```html
<body class="bg-green-400">
  <div class="min-h-screen flex items-center justify-center space-x-5"></div>
</body>
```

What do these classes do?
- `min-h-screen` sets minimum height of the container to be equal to 100% of the screen height.
- `flex` aligns the cards vertically.
- `items-center` and `justify-center` align the cards to the center of the screen.

### Building our first two cards
This is how our first two cards will look like:

![Alert and Menu component](/engineering-education/card-components-using-tailwind-css/component1.png)

Our first card as shown above is an alert component. It is an example of a card that gives information to a user on a particular subject. It has buttons which require user interaction.

Our second card is a menu component. It contains functions aligned as menu items. this is also another example of how card components can be used.

Let's now see how it is done!

Let's begin by creating a container, `<div>`. This is where we will align our cards into rows meaning that the cards will be horizontally placed.

```html
<div class="w-1/4 grid grid-rows-2 gap-y-2"></div>
```

Here are the functions of the classes we have added above:
- `w-1/4` sets the width of the container to be equal to 25% of the screen width.
- `grid` enables us to divide the items in the div into rows and columns
- `grid-rows-2` divides the `<div>` items into two rows.
- `gap-y-2` adds space between the two rows.

We will start creating the first card using a container, `<div>` as shown in the code below:

```html
<div class="rounded-lg shadow-xl bg-white">
  <div class="p-5">
    <!--Card Header-->
    <header class="font-semibold text-lg pb-5">Welcome to Tailwind CSS</header>
    <p class="text-gray-500 px-4">
      Lorem ipsum dolor sit amet, consectetur adip!
    </p>
    <footer class="text-center space-x-5">
      <button
        class="py-2 px-4 mt-5 border border-green-500 rounded-lg text-green-500 font-semibold hover:text-white hover:bg-green-600"
      >
        CANCEL
      </button>
      <button
        class="py-2 px-4 mt-5 bg-green-500 rounded-lg text-white font-semibold hover:bg-green-600"
      >
        APPLY
      </button>
    </footer>
  </div>
</div>
```

From the code above, we have created the container into which the components of the card will be contained.

We have then added another container to enable us add space around the components that will be inside our card. We will do the same to the subsequent cards later on.

We added the header using the `<header>` element. We have made the text to be semi-bold with `font-semibold`, increased the font size to 18px with `text-lg`, and added space at the bottom of the header with `pb-5` as shown below:

![First Card Components](/engineering-education/card-components-using-tailwind-css/component1.png)

After the header, we have added some text with a `<p>` tag. We made the text color gray with `text-gray-500` and added space on the left and right side of the text using `px-4`.

For the footer, we have used element `<footer>`, then added two buttons for user interaction.

To the footer, we have made the class `text-center` to center the buttons, and class `space-x-5` adds space between the two buttons.

This is what the classes we have added to the buttons do:
- To increase the width and height of the buttons, we have used `py-2` and `px-4`.
- We have added space on the top margin by using `mt-5`.
- `rounded-lg` makes the edges of the button have a rounded look.
- `hover:bg-green-500` adds a hover effect that changes the background color to green.
- `border-green-500` adds a green border around the button.

That is all for the first card. We have used most of the classes that I have explained above. I will only explain the classes that we have not used above in the subsequent cards.

### Building a menu component card
As mentioned earlier, we have created a menu component in form of card. The card contains links (menu items) which the user can interact with.

The code for the menu card is shown below:

```html
<div class="rounded-lg shadow-xl bg-white ">
    <div class="items-center justify-center">
        <!--Card Header-->
        <header class="font-semibold text-sm py-3 px-4">
            Menu Items
        </header>
        <a href="" class="text-gray-500 p-3 flex  hover:bg-green-100 hover:text-green-500">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="roustroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></patsvg>
            Menu Item 1
        </a>
        <a href="" class="text-gray-500 p-3 flex hover:bg-green-100 hover:text-green-500">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="roustroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 02h-5l-5 5v-5z"></path></svg>
            Menu Item 2
        </a>
        <a href="" class="text-gray-500 p-3 flex hover:bg-green-100 hover:text-green-500"><svg class="w-6 h-6" fill="none" stroke="currentColviewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.822 0 010 2.828l-8.486 8.485M7 17h.01"></path></svg>
            Menu Item 3
        </a>
        <a href="" class="text-gray-500 p-3 flex hover:bg-green-100 hover:text-green-500"><svg class="w-6 h-6" fill="none" stroke="currentColviewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"></path></svg>
            Menu Item 4
        </a>
</div>
```

We have started with a containment `<div>`. We have given it a header `Menu Items` using `<header>`, as shown above.

`<a>` tags have been used to create the links for our menu items.

We have also added SVG icons to our menu items. `flex` class in each `<a>` tag is used to make the icons and the text vertically aligned.

We have added a padding of `12px` all round to add space between the menu items with class `p-3`. The padding is used to increase the clickable space of each item.

Lastly, we added a hover effect which changes the background color and the text to green.

### Building an advert card
We will now create the third card. The card will be next to the first and second card. This is what we will be creating:

![Advertisement Card](/engineering-education/card-components-using-tailwind-css/component2.png)

We are creating an advertisement card for a product.

We will add an image of the product at the top of the card, and other information following below it as shown below:

```html
<div class="w-1/4 rounded-lg shadow-xl bg-white">
  <img
    src="./img/pexels-antonio-dillard-4462781.jpg"
    alt=""
    class="rounded-t-lg h-60 w-full object-cover"
  />
  <!--Card Header-->
  <header class=" text-xl font-extrabold p-4">Card Component</header>
  <div class="px-5">
    <p class="text-gray-500 px-4">
      Use card components to easily show blog posts, merchandise, functions,
      items and more.
    </p>
  </div>
  <!--Card Footer-->
  <footer class="text-right py-3 px-8 text-gray-500">
    <button
      class="py-2 px-4 mt-5 bg-green-500 rounded-lg text-white font-semibold hover:bg-green-600"
    >
      GET STARTED
    </button>
  </footer>
</div>
```

From the snippet above, we created a containment `<div>` as we had done previously. We then added an image file.

For the image to fit perfectly into the container, we added a height class `h-60` which makes the image occupy a height of 240px in the container.

It will occupy the full width of the container due to class `w-full`.

We want to maintain the original size of the image but also want it to fit into the container. To achieve this, we add class, `object-cover`.

We made top part of the image rounded by using class, `rounded-t-lg`.

Then for the header, we made the text extrabold with class `font-extrabold` and used padding class `p-4` to add space around the text.

After the header, we added a paragraph text with a `<p>` tag as shown in the code above.

Lastly, for the footer, we created a button; which is at the right side of the container. This is achieved by using class, `text-right`.

For our button not to be too far to the right, we will add some space using padding classes, `py-3` and `px-8`. We have used the same classes that we had used earlier.

### Building a profile card
Our last card is a profile card. It contains information about a user such as their name, profile picture, and skills. We will create a card that looks like this:

![Profile card](/engineering-education/card-components-using-tailwind-css/component3.png)

The code for our profile card is shown below:

```html
<div class="w-1/4 rounded-lg shadow-xl bg-white p-10">
  <img
    src="./img/pexels-christina-morillo-1181690.jpg"
    alt=""
    class="rounded-full p-4 h-40 mx-auto"
  />
  <!--Card Header-->
  <header class=" text-2xl font-extrabold py-4 px-4 text-center">
    Christina Morillo
  </header>
  <div>
    <ul class="text-gray-500 text-center font-semibold">
      <li>Web Designer</li>
      <li>UX/UI Designer</li>
      <li>Database Administrator</li>
    </ul>
  </div>
  <!--Card Footer-->
  <footer class="text-center py-3 px-8 text-gray-500">
    <button
      class="py-2 px-4 mt-5 bg-green-500 rounded-lg text-white font-semibold hover:bg-green-600"
    >
      FOLLOW
    </button>
  </footer>
</div>
```

First, we created a container and added an image file that will be our profile picture. We will use class `rounded-full` to make it a full circle.

`mx-auto` will center the image in the container.

For our header, we added the profile name, we set the text to extrabold with a font size of 24px and centered it on the container using class `text-center`.

For the profile skills, we used `<ul>` which we centered using `text-center`.

Lastly, for the footer, we added a `FOLLOW` button using the same classes as previously, and centered it using class `text-center`.

### Conclusion
In this tutorial, we have gone through the steps of creating different card components which can be used in webpages to clearly show user profiles, adverts of products, and even blog posts.

It would be clever to implement card components to your webpages.

I hope you find this tutorial useful.

Happy Coding!

---
Peer Review Contributions by: [Monica Masae](/engineering-education/authors/monica-masae/)
