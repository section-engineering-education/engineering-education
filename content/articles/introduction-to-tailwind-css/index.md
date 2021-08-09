---
layout: engineering-education
status: publish
published: true
url: /introduction-to-tailwind-css/
title: Introduction to Tailwind CSS
description: This article is an introduction to Tailwind CSS, we will cover different installation and configuration methods and how to use its utility-based classes. 
author: daniel-katungi
date: 2021-01-11T00:00:00-13:00
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/introduction-to-tailwind-css/hero.jpg
    alt: Introduction to Tailwind CSS image
---
CSS technology was one of the biggest game-changers in web development. It allowed for more styling capabilities and freedom. As CSS grew, so did its complexity. CSS in retrospect is not challenging to write, but it can be tricky to implement.
<!--more-->
The next phase in CSS was the development of libraries and frameworks. One of the most famous examples of CSS frameworks is Bootstrap.

Frameworks like Bootstrap have one major disadvantage. Due to increased growth and usage, they became too big and offer less control over their styles. Learning frameworks like Bootstrap has become increasingly challenging because developers have to learn hundreds of classes.

In this article, we will cover:
- What Tailwind CSS is.
- Different ways to install and configure Tailwind CSS.
- How to use utility-based classes over regular pre-written classes.

To follow along with this tutorial, a basic understanding of HTML and CSS is necessary. Any prior experience with a CSS framework is an added advantage.

### What is Tailwind CSS
Tailwind is a CSS framework created by [Adam Wathan](https://twitter.com/adamwathan). Unlike other frameworks, it does not come prebuilt with classes to add to the HTML tags. Instead, it uses a different approach. It brings a much lower level of control by using utility-based classes.

### Installation
Let's get right into it and install Tailwind CSS so we can discover more about it. There are two ways to install Tailwind CSS, depending on your use case.

#### Method 1: Using the CDN
Using a CDN is the most common way of using any CSS framework, and Tailwind CSS is no exception. We add the Tailwind CSS file from the CDN in form of a link in the HTML page's head section.

First, create a HTML file and give it a name. We will name ours `index.html`. Then inside it, Write the boilerplate HTML code and add the CDN as shown below:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Section Tailwind Demo</title>
    <link
      href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css"
      rel="stylesheet"
    />
  </head>
  <body></body>
</html>
```

Great. We have Tailwind CSS installed in our project.

Note: Installing Tailwind CSS by using its CDN has a few drawbacks such as:

- You cannot add any third-party plugins.
- Since Tailwind CSS fetches files when the file loads, you cannot purge unused files.
- You cannot tinker with some configurations like the theme.

#### Method 2: Using npm
Using the npm method bestows the full experience of Tailwind CSS. It is a common installation method because most JavaScript frameworks use a similar approach. There are minimal differences in the installation process, depending on the framework's architecture.

Let's get started. 

First, let's create a directory where we will be working. 

In your terminal, run:

```bash
mkdir section-tailwind-demo && cd section-tailwind-demo

npm init -y
```

Next, let's install Tailwind CSS. We also need to install some other packages alongside it. We need PostCSS because Tailwind CSS relies on a preprocessor to bundle the CSS. Tailwind uses a PostCSS plugin called `autoprefixer` to transpile the CSS into vanilla CSS.

In the terminal run:
```bash
npm install tailwindcss@latest postcss@latest autoprefixer@latest
```

The command above will install all the dependencies we need. Next, we have to create a script to configure Tailwind CSS and PostCss. To generate the scripts, we make use of the `tailwind cli` utility provided by Tailwind CSS.

In the terminal run:

```bash
npx tailwind init -p
```

It will generate two files, `tailwind.config.js` and `postcss.config.js`.
The tailwind.config.js looks like this:

```js
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

The `postcss.config.js` file should look like this:

```js
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

Now that we have successfully set up the environment, let's setup Tailwind CSS in our project.

First, create two files — an HTML file called `index.html` and a stylesheet called `style.css`.

The HTML part can have the basic boilerplate syntax at the beginning of the article. In the CSS file, we need to inform `autoprefixer` that we will use Tailwind CSS. 

We do this by importing the Tailwind CSS files, as shown below:

```CSS
@tailwind base;
@tailwind components;
@tailwind utilities;
```

Finally, we need to build our Tailwind CSS, so in the terminal run:

```js
npx tailwindcss-cli@latest build -o css/tailwind.css
```

This command will create a `tailwind.css` file in the CSS folder. The `-o` in the command stands for the output path, and we specified that our output file would be in the `_css/tailwind.css_` path.

Note: You do not need to have a CSS file to work with that command, it will still generate the Tailwind CSS file. You may, however, need the `style.css` file to add custom styles, write Tailwind CSS in that file, or mix Tailwind CSS with custom CSS.

A different way of processing the CSS is to do it in production by adding a script in the `package.json`. We will use the `postcss cli` to run the operation during build time.

To do this, let's install PostCSS CLI. 

Run this in the terminal:

```bash
npm install postcss-cli
```

Next, we add the build script in the package.json like this:

```json
 "scripts": {
 "build": "postcss style.css -o css/tailwind.css"
 }
```

Now, when you run `npm run build` it should compile the Tailwind CSS file into a CSS folder, as we wanted.

We then need to add our Tailwind CSS file to the HTML like we would a regular CSS file.

```HTML
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <link rel="stylesheet" href="css/tailwind.css" />
  </head>
  <body></body>
</html>
```

Like that, we have everything set up.

### Working with utility classes
To show and explain how utility classes work, let's create a button using Tailwind CSS. This will show how Tailwind CSS affects the HTML elements.

Within the Body tags in the HTML page, add:

```html
<button>Section</button>
```

Let's add some classes to our button because it looks plain. In Tailwind CSS, the color value ranges depending on the color intensity from 100 to 900. The utility class for the background is `bg`. To make our button's background a faint shade of green, we add the class `bg-green-100`.

Next, let's style the text in the button. For this, we use the utility class `text`. Color rules remain, hence to add text to the color, we add the class `text-green-100`.

Our button is looking good so now let's add some padding. For padding, the syntax is quite straightforward. It's the `_property`, size, then the `value_`. 

This applies to all size and spacing properties, like margin, for example. To add padding on the bottom, it would be `pb-8`. These values range from 0 to 64. To see how ranges work in-depth, check the [documentation](https://tailwindcss.com/docs/padding).

In our example, our padding will be `py-2` for the top and the bottom and `px-6` for the left and right. Let's add some margin on the top with `my-20` and some on the left with `mx-20`.

Now, let's make the button more rounded with the `rounded` utility. You can find a full list of border-radius utilities and all their classes in the [documentation](https://tailwindcss.com/docs/border-radius). We will use the border-radius of 0.5em, which corresponds to `rounded-lg`.

Finally, let's add some hover magic to make the button more lively. To do so, we add the classes `hover:hover:bg-green-600` and `hover:text-green-200`.

With that, we have styled our button with no CSS at all. The critical thing to take away is how much control Tailwind CSS gives you over the styling and elements. To get the full code for the tutorial, check [here](https://github.com/katungi/Section-tailwind-demo).

Our final code looks like this:
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Section-Tailwind-Demo</title>
    <link rel="stylesheet" href="css/tailwind.css" />
  </head>

  <body>
    <button
      type="button"
      class="hover:bg-green-600 hover:text-green-200 bg-green-100 text-green-700 mx-20 my-20 px-6 py-2 rounded-lg"
    >
      Section
    </button>
  </body>
</html>
```

The code (our button) should look like this:

![Final Product](/engineering-education/introduction-to-tailwind-css/result.png)

### Conclusion
Tailwind CSS is a game-changer to how we use CSS. As demonstrated above, utility classes are easy to use and learn. As a result, you should now be able to build a simple layout using Tailwind CSS.

Tailwind CSS also gives you more control over the look you want, which can be an advantage or a disadvantage. With other frameworks, the base look is usually good enough to get a developer started. That isn't the case with Tailwind CSS as you have to do everything yourself.

Another thing to note is how we added all the CSS classes, we used in the demo to HTML elements. As the complexity of your styling grows, the code will get untidy. We will tackle how to clean up Tailwind CSS projects with a full demo in the next article.

For further details on Tailwind CSS, you can take a look at the official [documentation](https://tailwindcss.com/docs).

---
Peer Review Contributions by: [Linus Muema](/engineering-education/authors/linus-muema/)
