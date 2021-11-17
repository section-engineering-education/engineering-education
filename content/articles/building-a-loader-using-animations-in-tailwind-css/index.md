---
layout: engineering-education
status: publish
published: true
url: /building-a-loader-using-animations-in-tailwind-css/
title: Building a Loader Using Animations in Tailwind CSS
description: This article takes the reader through creating a simple loader using animations in Tailwind CSS. Tailwind provides low level utility classes such us animate-spin that make animation easier.
author: monica-masae
date: 2021-07-06T00:00:00-13:30
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/building-a-loader-using-animations-in-tailwind-css/hero.jpg
    alt: Loader image example
---
A loader/preloader is what you see on the screen while the rest of the pages content is still loading. Animations play an important role in the design of this component. Not only does it make the loader interactive but also gives the impression of a faster loading response time on your webpage.
<!--more-->
While there are external libraries that can be used to build these loaders, we will be using Tailwind CSS to build simple ones in just simple steps and less code!

We will be using Tailwind CSS and some custom CSS through this tutorial. Tailwind provides us with low level utility classes like `animate-spin` which we will use to make our loader.

The loader will look like this when complete:

![loader](/engineering-education/building-a-loader-using-animations-in-tailwind-css/loader.gif)

### Prerequisites
1. Basic knowledge of HTML and CSS.
2. Basic knowledge of Tailwind CSS.

### Adding Tailwind into your project
I will assume that you already have the latest version of Tailwind installed. If you are not familiar with how Tailwind CSS works, I suggest you go through this [article](/engineering-education/introduction-to-tailwind-css/) to get up to speed.

Lets get started!

Add the following boiler plate and make sure to link Tailwind CSS.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Loader</title>
    <link rel="stylesheet" href="./public/css/tailwind.css" />
  </head>
</html>
```

Next, add a `body` tag and some styling to it.

```html
<body class="flex justify-center items-center bg-gray-900 h-screen"></body>
```

In the `body` tag we have added classes:
- `flex`, `items-center`, and `justify-center` which allows us to horizontally and vertically align our form to the center.
- `bg-gray-900` will add a cool gray background color.
- `h-screen` will set the height to 100%.

Now, let us add a `div` (parent) that will wrap around the circles for the loader, after which we will add three `div`s under it.

```html
<div
  class="bg-white flex space-x-2 p-5 rounded-full justify-center items-center"
></div>
```

The code above has created a component that will contain three, small, colored dots. 

The class:
1. `bg-white` has given it a white color,
2. `rounded-full` will create a circle, but will eventually change to a pill-like shape after we add the dots in it.
3. `justify-center` and `item-center` both center align the pill.

This gives us the following result:

![Step 1 Result](/engineering-education/building-a-loader-using-animations-in-tailwind-css/img1.png)

Now let's add something inside the 'boring' circle above. As mentioned earlier, we are going to add three `div`s which will create three dots.

```html
<div class="bg-blue-600 p-2 w-4 h-4 rounded-full"></div>
<div class="bg-green-600 p-2 w-4 h-4 rounded-full"></div>
<div class="bg-red-600 p-2 w-4 h-4 rounded-full"></div>
```

Our loader will now look like this:

![Result](/engineering-education/building-a-loader-using-animations-in-tailwind-css/img2.png)

In the above snippet, the dots are colored blue, green, and red respectively.

The space in between the three dots is achieved by adding the class `space-x-2` in the parent div. They are also horizontally aligned using `flex` class in the same wrapper.

And of course, the dots have the same width and height of 14px and a padding of 8px.

### Adding animations
Its animation time!

For the animation part, we will use `animate-bounce` class from Tailwind CSS and a few custom CSS properties.

Lets get to it!

Add `animate-bounce` to the three lines of code above like this:

```html
<div class="bg-blue-600 p-2  w-4 h-4 rounded-full animate-bounce"></div>
<div class="bg-green-600 p-2 w-4 h-4 rounded-full animate-bounce"></div>
<div class="bg-red-600 p-2  w-4 h-4 rounded-full animate-bounce"></div>
```

Now all our colored circles are bouncing! However, they are bouncing up and down at the same time. I think we should make it a little bit more fun 🤔. This can be achieved using the animation properties in CSS.

Let's give each circle a class name according to its color for faster reference.

```html
<div
  class="bg-blue-600 p-2  w-4 h-4 rounded-full animate-bounce blue-circle"
></div>
<div
  class="bg-green-600 p-2 w-4 h-4 rounded-full animate-bounce green-circle"
></div>
<div
  class="bg-red-600 p-2  w-4 h-4 rounded-full animate-bounce red-circle"
></div>
```

After the step above, we can now write the class selectors inside a `<style>` tag in the head section. We will then add the `animation-delay` property for all selectors.

Alternatively, you can create an external stylesheet file and link it to the HTML file.

Our code should look like this:

```css
<style>
	.blue-circle{
		animation-delay: 0.1s;
	}
	.green-circle{
		animation-delay: 0.2s;
	}
	.red-circle{
		animation-delay: 0.3s;
	}
</style>
```

The code above has added time for which each circle will wait before it bounces. For instance, the red circle waits for 0.3 seconds before it bounces. 

It also waits for the green circle to bounce before it does. The green circle on the other hand waits for the blue circle to bounce before it does.

Here's our very simple loader in just a few, simple steps!

![Animated Loader](/engineering-education/building-a-loader-using-animations-in-tailwind-css/loader.gif)

### Conclusion
In this article, we have gone through creating a simple animated loader using Tailwind CSS and some custom CSS. Animations and loaders are important for the user experience.

A webpage visitor is likely to visit the page more often if there are animations in most of the components.

I hope you found this tutorial helpful!

Happy coding!

---

Peer Review Contributions by: [Peter Kayere](/engineering-education/authors/peter-kayere/)
