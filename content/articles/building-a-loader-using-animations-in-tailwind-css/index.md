## Introduction

A loader(preloader) is what you see on the screen while the rest of the page's content is still loading. Animations play an important role in the design of this component. Not only does it make the loader interactive but it also helps to give the impression of a faster loading process in your webpage.

While there are external libraries that can be used in building these loaders, we will be using Tailwind CSS to build simple ones in just simple steps and fewer code!
Tailwind CSS provides us with low level utility classes like `animate-spin` which we will use to make our loader.

Through this tutorial we will use Tailwind CSS and some custom CSS.
The loader will look like this when complete:

![loader](video.gif)

### Prerequisites

1. Basic knowledge of HTML nd CSS.
2. Tailwind CSS knowledge.

### Adding Tailwind Into your project

I will assume that you already have the latest version of Tailwind installed. If you are not familiar with how Tailwind CSS works, I suggest you go through this [article](https://github.com/section-engineering-education/engineering-education/blob/master/articles/introduction-to-tailwind-css/index.md) first.

Lets get started -;

### Our HTML

After adding the boiler plate, make sure to link Tailwind CSS for the styles like this:

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

Next, add a `body` tag to add some styling to it.

```html
<body class="flex justify-center items-center bg-gray-900 h-screen"></body>
```

In the `body` tag we have added classes:

- `flex`, `items-center`, and `justify-center` allow us to horizontally and vertically align our form to the center.
- `bg-gray-900` will add a cool gray background color.
- `h-screen` will set the height to 100%.

Now let's us add a `div` (parent) that will wrap around the circles for the loader, after which we will add three divs under it.

```html
<div
	class="bg-white flex space-x-2 p-5 rounded-full justify-center items-center"
></div>
```

The code above has a created component that will contain three small and colored dots. The class;

- `bg-white` has given it a white color,
- `rounded-full` will create a circle, but will eventually change to a pill-like shape after we add the dots in it.
- `justify-center` and `item-center` both center align the pill.

We get the result below:

![Step 1 Result](img1.png)

Now let's add something inside the "boring" circle above. We will add three divs which will create three dots, as mentioned earlier.

```html
<div class="bg-blue-600 p-2 w-4 h-4 rounded-full"></div>
<div class="bg-green-600 p-2 w-4 h-4 rounded-full"></div>
<div class="bg-red-600 p-2 w-4 h-4 rounded-full"></div>
```

Our loader now will look like this:

![Result](img2.png)

In the above snippet, the dots have been coloured with blue, green and red dots respectively.

- There's space in between the three dots. It is achieved by adding the class `space-x-2` in the parent div. They are also horizontally aligned using `flex` class in the same wrapper.
- And of course the dots have the same width and height of 14px and a padding of 8px.

### Adding animations

Its animation time!

For the animation part, we will use `animate-bounce` class for Tailwind CSS and a few custom CSS properties.

Lets get to it!

Add `animate-bounce` to the three lines of code above like this:

```html
<div class="bg-blue-600 p-2  w-4 h-4 rounded-full animate-bounce"></div>
<div class="bg-green-600 p-2 w-4 h-4 rounded-full animate-bounce"></div>
<div class="bg-red-600 p-2  w-4 h-4 rounded-full animate-bounce"></div>
```

Now all our coloured circles are bouncing! However, they are bouncing up and down at the same time. I think we should make it a little bit more fun, using animation properties in CSS.

Let's give each circle a class name according to its color for faster reference, as follows:

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

After the step above, we now write the class selectors inside a `<style>` tag in the head section. After which we can add the `animation-delay` property for all selectors.
You can create an external stylesheet file and link it or add as an inline style too.

Our code wil look like this:

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

The above code has a added time for which each circle would wait before it bounces. For example, we can say that the red circle waits for 0.3 seconds before it bounces. It waits for the green circle to bounce before it does.

Here's our very simple loader in just a few simple steps!

![Animated Loader](video.gif)

## Conclusion.

Animations and loaders are important for user experience. A webpage visitor is likely to visit the page more often if there are animations in most of the custom components.

I hope you find this tutorial helpful!
