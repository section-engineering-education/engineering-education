### Getting Started with Tailwindcss

CSS technology was one of the biggest game-changers in web development. It allowed for more styling capabilities and freedom. As CSS grew, so did it's difficulty. CSS in retrospect is not challenging to write, but it can be tricky to implement.

The next phase in CSS was the development of libraries and frameworks. One of the most famous examples of CSS frameworks is bootstrap.

Frameworks like Boostrap have one major disadvantage due to increased growth and usage. They became too big and offered less control over the styles. The learning path became hard since the developer has to learn hundreds of classes.

In this article, we will cover:

- What Tailwindcss is,
- Different ways to install and configure tailwind,
- and How to use utility-based classes over regular prewritten classes.

To follow along with this tutorial, a basic understanding of HTML and CSS is necessary. Experience with any CSS frameworks is an added advantage.

### What is Tailwindcss

Tailwind is also a CSS framework created by [Adam Wathan](https://twitter.com/adamwathan). Unlike other frameworks, it does not come prebuilt with classes to add to the HTML tags. Instead, it uses a different approach. It brings a much lower level of control by using utility-based classes.

### Installation

Let's get right into it and install tailwind so we can discover more about it. There are two ways to install Tailwind CSS, depending on the use case.

#### Method 1: Using CDN

Using a CDN is the most common way of using any CSS framework, and tailwind is no exception. We add a CDN as a link to the tailwind files in the HTML page's head section.

Create a HTML file and name it anything. We will name ours `index.html`. Inside it, Write the boilerplate code for HTML and add the CDN as shown below:

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

And that, we have installed tailwind into our project.
Note: This might not be the best way to install tailwind into your project because it has a few setbacks like:

- You cannot add any third-party plugins
- Since tailwind fetches files when the file loads, you cannot purge unused files
- You cannot configure some configurations like the theme

#### Method 2: Using npm

This method bestows the full freedom of tailwind on the developer. It is common because most Javascript frameworks use a similar approach. Minimal differences are depending on the framework's architecture for installing tailwind.

Let's get started. First, let's create a directory we will be working. Within the folder, initialize npm. In your terminal, run.

```terminal
mkdir section-tailwind-demo && cd section-tailwind-demo

npm init -y // to initialize npm with everything set to true or yes
```

Now let's install tailwind. We need a few things alongside tailwind. We need a preprocessor because tailwind relies on a preprocessor. Tailwind uses a postcss plugin called autoprefixer to transpile the CSS into vanilla CSS.

In the terminal run :

```terminal
npm install tailwindcss@latest postcss@latest autoprefixer@latest
```

The command above will install all the dependencies we need. Next, we have to create a script for tailwind and postcss to configure them. To generate the scripts, we make use of the tailwind CSS utility provided by tailwind.

In the terminal run :

```terminal
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

and the postcss.config.js should look like this:

```js
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

We set up the environment, now let's setup tailwind in our project.

Let's create two files—an HTML file called `index.html` and a stylesheet called `style.css`.

The HTML part can have the basic boilerplate syntax. In the CSS file, we need to tell autoprefixer that we will use tailwind. We do this by importing the tailwind files, as shown below:

```CSS
@tailwind base;
@tailwind components;
@tailwind utilities;
```

Finally, we need to build our tailwind, so in the terminal run:

```js
npx tailwindcss-cli@latest build -o css/tailwind.css
```

This command will create a tailwind.css file in a CSS folder. The `-o` in the command stands for the output path, and we specified that our output file would be in the _css/tailwind.css_ path.

A different way of processing the CSS is to do it in production by adding a script in the `package.json`. We will use the postcss cli to run the operation during build time.

To do this, let's install postcss cli. Run this in the terminal:

`npm install postcss-cli`

Then we now add the build script in the package.json like this:

```json
 "scripts": {
 "build": "postcss style.css -o css/tailwind.css"
 }
```

Now, when you run `npm run build` it should compile the tailwind CSS file into a CSS folder, as we wanted.

We then need to add our tailwind file to the HTML like we would a regular CSS file.

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

And like that, we have everything set up.

### Working with Utility Classes

To show and explain how utility classes work, let's create a button using tailwind. It will show see how tailwind affects the element.

Within the Body tags in the HTML page, add:

```html
<button>Section</button>
```

Let's add some classes to our button because it looks plain. In tailwind, the colour value ranges depending on the colour intensity from 100 to 900. The utility class for the background is `bg`. To make our button's background a faint shade of green, we add a class `bg-green-100`.

Next, let's style the text in the button. We use the utility class `text`. Colour rules remain, hence to add text to the colour, we add a class `text-green-100`.

Our button is looking good, now let's add some padding. For padding, the syntax is direct. It's the _property, size then the value_. This applies for all size and spacing properties as well, like margin. To add padding on the bottom, it would be `pb-8`. The value ranges from 0 to 64. To see how the ranges work in-depth, check the [documentation](https://tailwindcss.com/docs/padding).

In our example, our padding will be `py-2` for top and bottom and `px-6` for left and right. Let's add some margin on the top with `my-20` and some on the left with `mx-20`.

Finally, let's make the button more rounded with the `rounded` utility. You can find a full list of utilities and all their classes in the [documentation](https://tailwindcss.com/docs/border-radius). We will use the border-radius of 0.5em, which is `rounded-lg`.

Finally, Let's add some hover magic to make the button more lively. To do so, we add the classes `hover:hover:bg-green-600` and `hover:text-green-200`.

And like that, we have styled our button with no CSS at all. The critical thing to take away is how much control tailwind gives you over the styling and elements. To get the code for the tutorial, check [here](https://github.com/katungi/Section-tailwind-demo).

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

and our button looks like this:

![Final Product](/engineering-education/introduction-to-tailwind-css/button.png)

### Conclusion

Tailwind CSS is a game-changer to how we all use CSS. As demonstrated above, utility classes are easy to learn and use.

Tailwind also gives you more control over the look you want, which can be an advantage or a disadvantage. With other frameworks, the base look is usually good enough to get a developer started. That isn't the case with tailwind as you have to do everything yourself.

Another thing to note is how we added all the CSS we used in the demo to the element. As complexity grows, the code will get untidy. We will tackle that and a full demo in the next article.

You should now be able to build a simple layout using tailwind. You can use the official [documentation](https://tailwindcss.com/docs) as reference.
