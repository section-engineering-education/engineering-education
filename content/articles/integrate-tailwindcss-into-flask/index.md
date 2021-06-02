---
layout: engineering-education
status: publish
published: true
url: /integrate-tailwindcss-into-flask/
title: Integrating TailwindCSS into Flask Apps
description: TailwindCss is a utility-first CSS framework for building frontend applications. This article focuses on how flask developers can use tailwind to quickly design frontend interfaces for their servers.
author: paul-asalu
date: 2021-06-02T00:00:00-15:30
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/integrate-tailwindcss-into-flask/hero.png
    alt: Integrating TailwindCSS into Flask Apps
---
TailwindCSS is a utility-first CSS framework used to build frontend applications. TailwindCSS differs from other kinds of CSS frameworks as it gives the user total control over their design. 
<!--more-->
Rather than adding obscure CSS classes to your code, with TailwindCSS you use utility classes to create your components, with as much control over every single styling as you want. All without having to ever write a single line of CSS.

### Prerequisites
For demonstration purposes in this article, I'll be using Python3, Flask, and JavaScript package managers (npm or yarn). 

I am assuming the reader has basic understanding of Python and by extension - Flask, and is already quite conversant with TailwindCSS.

Having the following will be needed:
- Python3
- Node.js 12.13.0 or higher
- npm or yarn
- Flask
- Your Favorite text editor
- Knowledge of using TailwindCSS

### Building a simple Flask app
#### Installing Flask
We'll begin by creating a really simple Flask server, that is capable of rendering frontend templates on our behalf. 

To begin we open up the terminal and install Flask using Python's package manager, as follows:

```bash
pip install flask
```

This will install Flask neatly for us on our computer, if you already have it installed you can skip this step. You can also choose to install it in a virtual environment if you feel like it.

### Creating the Flask server
The next step is to create a simple flask server that will render the frontend templates for us. Create a new folder (anywhere you wish) to hold our files and create a new file called `app.py` in the folder.

Create a sub-folder called `templates` as well; this is where all HTML files will go. Next we'll create another subfolder called `static`. This folder will hold all static files, including CSS files, scripts, and images for our frontend templates. 

When you're done the folder should look like this:

```bash
projectfolder/
   - app.py
   - templates/
   - static/
```

Now in app.py we'll add the following lines of code to create a server.

```python
from flask import Flask, render_template

app = Flask(__name__)


@app.route("/")
@app.route("/index")
def index():
	return render_template("index.html")


if __name__ == '__main__':
	app.run(debug=True)
```

The code block above creates a simple server with one endpoint (or route) that renders (or displays) a web page, that is supposed to be from a file called `index.html` as seen in the code. However, we haven't created that file yet. 

Remember, I mentioned that all HTML files go in the templates folder we created earlier. We'll go to that folder and add a new file called `index.html` so our Flask server can see it. 

In `index.html` we can add a simple "hello world" h1 tag as follows:

```html
<!DOCTYPE html>
<html>
  <head>
    <title></title>
  </head>

  <body>
    <h1>Hello World</h1>
  </body>
</html>
```

We'll save that and test run our server, from the terminal using the following command.

```bash
python app.py
```

Once the server is running head over to:

`http://localhost:5000/index` to test the server and you should see the "hello world" from the `index.html` file.

![demo1](/engineering-education/integrate-tailwindcss-into-flask/demo1.JPG)

### Installing TailwindCSS
To install Tailwind we can use either yarn or npm (depending on which one you have on your system). We navigate to the `static` folder we created earlier from the terminal using the `cd` command. 

Once there we'll use the `init` command to setup a new Node.js environment, that will allow us to install TailwindCSS using npm or yarn as follows:

```bash
npm init
```

Or with yarn:

```bash
yarn init
```

Doing this creates a new file called `package.json` which keeps track of installed (JavaScript) dependencies in our project. We can think of it as the `requirements.txt` file that holds dependencies in Python projects. 

The next thing is to run the installation command to actually install TailwindCSS, this is done as follows:

```bash
npm install tailwindcss
```

Or with yarn:


```bash
yarn add tailwindcss
```

If you don't have npm you can install Node.js since it comes with npm, or you can look at the yarn docs [here](https://classic.yarnpkg.com/en/docs/install#windows-stable) under the alternatives section.

Once this is done you should see that the installation includes some folders in the `static` folder, some of which include:
- node_modules/ : which is where the dependencies for tailwind reside.
- package.json
- yarn.lock (I used yarn)

#### Adding TailwindCss to our Flask App
The first step is to add some of the required files in order to get tailwindcss to work. To make things easier, we'll create a new folder called `src` in the `static` folder from earlier, and in the `src` folder we'll add a file called `style.css`, and this is where tailwindCss directives will go, as we will see in a bit. 

To keep things clear the project folder structure should look as follows:

```bash
projectfolder/
   - app.py
   - templates/
   - static/
     - src/
       - style.css
```

In this `style.css` file we'll add the following as stipulated by the Tailwindcss [docs](https://tailwindcss.com/docs/installation).

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

These are called preprocessor directives by the documentation, and you can think of them as you would preprocessor directives from a language like C++, these directives essentially paste in a lot of utility CSS classes during compile time (A lot!). 
The resulting CSS from this process is what we will link to our flask templates for styling.

Before we generate the CSS lets prepare a file where it should be dumped into. In the `static` folder we'll create another new folder called `css` and in here all our stylesheets will go, including the one we're about to generate. In this folder we'll create a new file called `main.css` and this is where our tailwind utility classes will go.
 
#### Compiling the preprocessor directives to generate CSS
In order to generate, the CSS from the preprocessor directives, we'll need to issue a command from the terminal using `npx` which is a tool that comes with npm (so ensure you have npm installed, you probably already do since Node.js is installed). Next we'll run the following command to compile and output the result into the `main.css` for our usage.

```bash
npx tailwindcss-cli@latest build ./src/style.css -o css/main.css   
```

This would generate a lot of utility css classes for us to use in our server templates.

#### Building our Frontend template with TailwindCSS
Now that we have generated the tailwind css, we can now use the utility classes to style our templates. We'll head over to the `templates` folder from earlier on, where we added the `index.html` file and edit it and add some more elements and styling to it using tailwindcss utility classes. 

In `index.html` add the following:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Beans Love Beers</title>
  <link rel="stylesheet" href="{{url_for('static',filename='css/main.css')}}">
</head>

<body>
  <div class="bg-green-300 px-3 py-1">
    <h2 class="text-3xl font-light text-white m-0">Beans Love Beers</h2>
  </div>
  <!-- Search Bar -->
  <div class="container">
    <input type="text" placeholder="Search for beer..."
      class="border-2 ml-64 border-gray-700 w-2/5 mt-10 py-3 px-4"></input>
    <button class="bg-blue-700 text-xl hover:bg-blue-500 text-white py-2 px-3">Search</button>
  </div>
  <!-- Selection -->
  <div class="container">
    <div class="grid gap-8 grid-cols-3 mt-5 ">
      <div
        class="transition duration-500 ease-in-out flex py-3 px-2 hover:bg-blue-400 transform hover:-translate-y-1 hover:scale-110 hover:text-white hover:shadow-none hover:rounded border border-gray-300 shadow-lg">
        <img src="img/logo.jpg" class="h-16 w-12 mr-20 ml-8 mt-10" alt="Image">
        <div class="w-3/5 mr-0">
          <h2 class="text-gray-800 font-bold">Buzz</h2>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore et excepturi autem iure molestias doloribus
            ipsa praesentium.</p>
        </div>
      </div>
      <div
        class="transition duration-500 ease-in-out flex py-3 px-2 hover:bg-blue-400 transform hover:-translate-y-1 hover:scale-110 hover:text-white hover:shadow-none hover:rounded border border-gray-300 shadow-lg"
        class="transition duration-500 ease-in-out flex py-3 px-2 hover:bg-blue-400 transform hover:-translate-y-1 hover:scale-110 hover:text-white hover:shadow-none hover:rounded border border-gray-300 shadow-lg">
        <img src="img/Asset 140.png" class="h-16 w-12 mr-20 ml-8 mt-10" alt="Image">
        <div class="w-3/5 mr-0">
          <h2 class="text-gray-800 font-bold">Buzz</h2>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore et excepturi autem iure molestias doloribus
            ipsa praesentium</p>
        </div>
      </div>
      <div
        class="transition duration-500 ease-in-out flex py-3 px-2 hover:bg-blue-400 transform hover:-translate-y-1 hover:scale-110 hover:text-white hover:shadow-none hover:rounded border border-gray-300 shadow-lg"
        class="transition duration-500 ease-in-out flex py-3 px-2 hover:bg-blue-400 transform hover:-translate-y-1 hover:scale-110 hover:text-white hover:shadow-none hover:rounded border border-gray-300 shadow-lg">
        <img src="img/Asset 150.png" class="h-16 w-12 mr-20 ml-8 mt-10" alt="Image">
        <div class="w-3/5 mr-0">
          <h2 class="text-gray-800 font-bold">Buzz</h2>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore et excepturi autem iure molestias doloribus
            ipsa praesentium.</p>
        </div>
      </div>
      <div
        class="transition duration-500 ease-in-out flex py-3 px-2 hover:bg-blue-400 transform hover:-translate-y-1 hover:scale-110 hover:text-white hover:shadow-none hover:rounded border border-gray-300 shadow-lg"
        class="transition duration-500 ease-in-out flex py-3 px-2 hover:bg-blue-400 transform hover:-translate-y-1 hover:scale-110 hover:text-white hover:shadow-none hover:rounded border border-gray-300 shadow-lg">
        <img src="img/Asset 160.png" class="h-16 w-12 mr-20 ml-8 mt-10" alt="Image">
        <div class="w-3/5 mr-0">
          <h2 class="text-gray-800 font-bold">Buzz</h2>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore et excepturi autem iure molestias doloribus
            ipsa praesentium.</p>
        </div>
      </div>
      <div
        class="transition duration-500 ease-in-out flex py-3 px-2 hover:bg-blue-400 transform hover:-translate-y-1 hover:scale-110 hover:text-white hover:shadow-none hover:rounded border border-gray-300 shadow-lg"
        class="transition duration-500 ease-in-out flex py-3 px-2 hover:bg-blue-400 transform hover:-translate-y-1 hover:scale-110 hover:text-white hover:shadow-none hover:rounded border border-gray-300 shadow-lg">
        <img src="img/logo.jpg" class="h-16 w-12 mr-20 ml-8 mt-10" alt="Image">
        <div class="w-3/5 mr-0">
          <h2 class="text-gray-800 font-bold">Buzz</h2>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore et excepturi autem iure molestias doloribus
            ipsa praesentium.</p>
        </div>
      </div>
      <div
        class="transition duration-500 ease-in-out flex py-3 px-2 hover:bg-blue-400 transform hover:-translate-y-1 hover:scale-110 hover:text-white hover:shadow-none hover:rounded border border-gray-300 shadow-lg"
        class="transition duration-500 ease-in-out flex py-3 px-2 hover:bg-blue-400 transform hover:-translate-y-1 hover:scale-110 hover:text-white hover:shadow-none hover:rounded border border-gray-300 shadow-lg">
        <img src="img/Asset 150.png" class="h-16 w-12 mr-20 ml-8 mt-10" alt="Image">
        <div class="w-3/5 mr-0">
          <h2 class="text-gray-800 font-bold">Buzz</h2>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore et excepturi autem iure molestias doloribus
            ipsa praesentium</p>
        </div>
      </div>
    </div>
  </div>

</body>

</html>
```

Observe the link to the CSS file points to the `css/main.css` file and not the pre-processed directives in the `src/style.css` file.

```html
<link rel="stylesheet" href="{{url_for('static',filename='css/main.css')}}" />
```

### Test running
Save the index file, and if the server is still running go to `localhost:5000/index` and you should see the updated index page looking better with the styling as shown below:

![demo2](/engineering-education/integrate-tailwindcss-into-flask/demo2.JPG)

There you have it!

### Conclusion
In this article, we've covered how to structure a simple Flask app to accomodate the TailwindCss package. We saw how to install Tailwindcss and how to generate CSS from its pre-processor directives into a file of our choosing. Finally, we saw how to use it in our flask templates. 

You should now be able to install Tailwindcss into your Flask projects and integrate it successfully into your applications.While this article focuses on integrating Tailwindcss in a single module Flask app, you are not limited to integrating Tailwindcss in this manner or in single file flask apps only. 

You can use Tailwindcss in more sophisticated structures such as blueprints. While making it available only for certain templates owned by a particular blueprint. 

While still having the autonomy of using regular css-stylings in other templates. Therefore, I implore you to explore and experiment with Tailwindcss as you continue your journey as a Flask developer.

Happy coding!

---
Peer Review Contributions by: [Daniel Katungi](/engineering-education/authors/daniel-katungi/)
