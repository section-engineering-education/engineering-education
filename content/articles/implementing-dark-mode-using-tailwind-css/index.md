---
layout: engineering-education
status: publish
published: true
url: /implementing-dark-mode-using-tailwind-css/
title: Implementing Dark Mode Using Tailwind CSS
description: This article takes the reader through implementing dark mode using Tailwind CSS. The recent version of Tailwind css comes with a feature that enables users to add dark mode to their webpages.
author: monica-masae
date: 2021-08-17T00:00:00-10:50
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/implementing-dark-mode-using-tailwind-css/hero.jpg
    alt: Implementing Dark Mode Using Tailwind CSS Hero Image
---
Dark Mode is a display setting built for user interfaces. It lets users change the theme color of the application to black or a color closer to black.
<!--more-->
Recently, most developers have been including this feature in their applications. The applications contain a toggle switch that changes the color to dark or light when clicked.

The recent version of Tailwind css comes with a feature that enables users to add dark mode to their webpages.

In this tutorial, we will use the feature to add a dark theme to our page.

### Prerequisites
To follow through this article, you need to have a clear understanding of HTML, CSS, Tailwind CSS, and Javascript.

Let's get started!

#### Step 1: Adding Tailwind to your project
I will assume that you have the latest version of Tailwind installed. If not, I suggest you go through this [article](https://github.com/section-engineering-education/engineering-education/blob/master/articles/introduction-to-tailwind-css/index.md) first.

#### Step 2: Our HTML
We will need some content on our webpage so that we can see the cool dark mode effect.

This is the webpage we will use:

![Blog page](/engineering-education/implementing-dark-mode-using-tailwind-css/blogpage.jpg)

This is the code for the webpage:

```html
<div class="flex flex-row items-center justify-center">
  <div class="p-8 rounded-lg max-w-md mx-auto">
    <h2 class="text-3xl font-bold text-black items-start ">
      Tailwind Dark Mode
    </h2>
    <p class="font-semibold text-gray-800">
      We can switch from light to dark mode!
    </p>
    <p class="font-light">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe suscipit
      reprehenderit deleniti perferendis debitis ullam quos praesentium, esse
      totam adipisci illum illo.
    </p>
    <button
      class="
            flex
            items-center
            w-24
            px-2
            py-2
            mt-4
            text-center text-white
            bg-blue-900
            rounded-lg
          "
    >
      Read More
    </button>
    <!--IMAGE HERE-->
    <div class="w-96 h-46 mb-5">
      <img class="rounded mt-2" src="./images/image1.jpg" />
    </div>
  </div>
</div>
```

Now that we have a page to practice on, let's move to the next step.

#### Step 3: Building the switch
Before you begin, ensure you have a clear idea of how you want your switch to look like and where you want it to be.

Some web pages have the dark mode feature in the "Settings" tab of the navigation bar. Others include this feature on the top-right corner of the page.

For our case, we will place it on the right corner because it is much simpler.

Let's get to it!

We will use the `input` element for the switch.

Our first task is to ensure that the switch is at the top-right corner of the webpage.

We do this by creating a `div` container with the following classes:

```html
<body>
  <div
    class="flex items-center justify-center mx-auto absolute top-5 right-0 left-1/3"
  ></div>
</body>
```

What's happening here?
- `flex` will align the contents of the switch vertically.
- `items-center`, `justify-center`, and `mx-auto` will align the switch to the center.
- The `absolute` class positions elements outside of the normal flow of the page. Therefore, to control the absolutely positioned switch, we will add `top-5`, `right-0`, and `left-1/3`. This means that our element will be to the right and at the top.

Let's add some content so that we can see the position.

We will add another `div` element under the container.

The `div` will contain the following classes:

```html
<div class="flex justify-end items-center space-x-2 mx-auto relative">
  <span class="text-xs font-extralight">Light </span>
  <span class="text-xs font-semibold">Dark</span>
</div>
```

This is how it should look like at this point:

![Result](/engineering-education/implementing-dark-mode-using-tailwind-css/switch1.jpg)

In the code above:
- `flex` will align content vertically on the same line, while `justify-end` will align the switch to the end of the container's space. The switch is moved to the right.
- `space-x-2` adds some space between the toggle switch and the words "light" and "dark". In this case, we have used words instead of icons for easy understanding.
- The `<span>` element adds the words "light" and "dark".
- `relative` class positions the items to the right. This means that the words will not affect the layout of the page or anything around them.

With the words "light" and "dark" acting like icons on our page, let us add the switch which will be clickable. It will appear between the two words.

Under the `<span>` element that adds "Light" text, create another `div` element like the one below:

```html
<div>
  <input type="checkbox" name="" id="checkbox" class="hidden" />
  <label for="checkbox" class="cursor-pointer">
    <div class="w-9 h-5 flex items-center bg-gray-300 rounded-full p2">
      <div class="w-4 h-4 bg-white rounded-full shadow"></div>
    </div>
  </label>
</div>
```

What have we added here?
- First, we have created a checkbox; we have used `<input>` element to do so. The checkbox will apply the "ON" and "OFF" style to our switch; it is hidden using the `hidden` class.
- There is a `<label>` element below the `<input>` element. It will allow us to click anywhere on the switch to turn it on or off. The class `cursor-pointer` enables that feature.
- Under `<label>`, there is another `<div>` element that creates an item for us to click on. The item has a gray background and a round shape.
- The second `<div>` element creates a ball inside the round-shaped item. This will help us see if the checkbox is checked or unchecked since it is hidden.

At this point, our switch should look like the one below:

![Step 3 end result](/engineering-education/implementing-dark-mode-using-tailwind-css/switch2.jpg)

Let's add some custom CSS to the ball for it to move when we click on it!

For the custom CSS, let us name the ball `switch-ball` and add style using `<style>` element under the `<head>` tag.

Here is the style:

```css
<style>
    #checkbox:checked + label .switch-ball{
      background-color: white;
      transform: translateX(24px);
      transition: transform 0.3s linear;
    }
  </style>
```

What does this mean?

It means that:
- when the checkbox is clicked, the ball will slide to right. `transform` property makes this possible.
- `transition` property will make the ball slide smoothly and it will reach the other side within 0.3 seconds.

This is how it slides:

![Ball Sliding](/engineering-education/implementing-dark-mode-using-tailwind-css/switch3.gif)

#### Step 4: Configuring Tailwind CSS
Tailwind CSS dark mode is not enabled by default. According to the official documentation, it is not enabled by default because of the file size considerations.

Therefore, to enable it, we need to set the dark mode option in our `tailwind.config`.

Let's do so.

First, go to your `tailwind.config.js` file.

```javascript
module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
```

Set `darkMode` to 'class'.

Using 'media' will set the theme based on the operating system.

When we use 'class', the user will be able to toggle between the theme they prefer.

After changing to class mode, make sure your file looks like this:

```javascript
module.exports = {
  purge: [],
  darkMode: "class",
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
```

Afterwards, go to the terminal and run this command:

```bash
npm run tw:build
```

This will be the result:

![Step 4 result](/engineering-education/implementing-dark-mode-using-tailwind-css/npmresult.jpg)

This shows that dark mode is enabled in our project. Our next task is to add dark mode to our HTML.

#### Step 5: Adding dark mode classes to our HTML
Since we are implementing dark mode using class mode, we need to add class `dark` on the `<html>` tag as shown below:

```html
<html lang="en" class="dark"></html>
```

To see if it works, start adding classes to your elements. For example, if you want the background color of your page to be darker, choose a dark color like `bg-gray-800` then prefix "dark".

For the background color of our page, we will add colors as shown below:

```html
<body class="dark:bg-gray-800 dark:text-gray-200"></body>
```

In this case, the background in light mode will be white and text will be black. On the other hand, dark mode will have a gray background and white text.

When choosing the color combination for a dark theme, make sure they correspond.

After adding the `dark` classes to our page, it should look like the one shown below:

![Step 5 Result](/engineering-education/implementing-dark-mode-using-tailwind-css/darkpage.jpg)

Now that we have an idea of how our dark theme would look like, let's make our switch work so we can switch between the themes.

#### Step 6: Adding Javascript
In this step, we are going to add a few lines of Javascript code for our switch to work.

You can create an external Javascript file and link it, or you can add the code using the `<script>` tag. We will use the latter.

Add the following code inside the script tag:

```Javascript
    <script>
      const checkbox = document.querySelector("#checkbox");
      const html = document.querySelector("html");

      const toggleDarkMode = function () {
        checkbox.checked
        ? html.classList.add("dark")
        : html.classList.remove("dark");
      }

    //calling the function directly

      toggleDarkMode();
      checkbox.addEventListener("click",toggleDarkMode);

      </script>
```

What will these lines do?
- First, we have used the `querySelector()` method to get the element `HTML` and an `id` we created for our checkbox.
- We created a function and named it **toggleDarkMode**. It tells us how the dark theme will be applied. It means that, when the checkbox is checked, the HTML file will add the class `dark` and will remove it when the checkbox is unchecked.
- To switch between themes, we need to call our function then add an event listener. In our case, it will be **click**.

Here is our page in both light and dark mode:

![Dark and light theme](/engineering-education/implementing-dark-mode-using-tailwind-css/result.gif)

### Conclusion
In this article, we have gone through implementing dark mode in a webpage using Tailwind CSS. Dark mode is said to reduce battery life in smartphones and also eye strain. It is clever to add this feature to your webpages.

I hope you find this tutorial helpful.

Happy coding!

---
Peer Review Contributions by: [Dawe-Daniel](/engineering-education/authors/dawe-daniel/)
