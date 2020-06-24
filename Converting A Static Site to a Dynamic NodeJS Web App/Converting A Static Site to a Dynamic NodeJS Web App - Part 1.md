# Converting A Static Site to A Dynamic NodeJS Web App - Part 1: Create a Basic Express Server

This tutorial will guide you how to convert a static website that uses HTML, CSS and JS to a dynamic one using the MEN stack. Similar to the popular MEAN/MEARN stack (MongoDB, Express, Angular or React and NodeJS), but instead of using Angular or React, we will use a templating engine called [EJS](https://ejs.co) (Embedded JavaScript.) Other popular templating engines include Handlebars, Pug and Nunjucks.

Learning a templating language is easier than a JS framework because you can just write HTML and it lets you insert the same piece of code in multiple locations (called partials) or pass server-side variables to be displayed in the front-end (such as a username).


## Installing NodeJS

First, make sure you’ve installed NodeJS on your local machine or VPS hosting provider.  If you haven’t installed it, go to the [NodeJS website](https://nodejs.org/en/) in order to do so. With NodeJS, you can write server-side code using a special form of JavaScript so you can use an already familiar language. 

The NodeJS installer comes bundled with the package manager, NPM. NPM is a repository for Node Modules (reusable pieces of code that can extend the functionality of your server). It’s similar to a plugin repository and Node Modules can be thought of as code snippets or libraries (depending on how large they are).

*Windows Users:* Need to add Node and NPM to their PATH so they can call them easily on the command line. See my [guide](https://www.section.io/engineering-education/working-with-databases-part1/#mondodb-installation)  on How to Install MongoDB if you don’t already know how.


## Testing the Install

To test that the installation has worked correctly, open a terminal window, and type `node -v`  and  `npm -v` If the resulting message starts with a v and is followed by some numbers then the installation has been successful. Now you’re ready to create your first server.

## Creating Your First Server

Once you have created a static website, the first step to create a NodeJS app is to create an Express web server. 

First, move all your website’s static files (HTML, CSS, JS and images etc.) into a folder called public and create a file called server.js in the root directory of your website folder. In the server.js file type:

```js
// Load Node modules
var express = require('express');
// Initialise Express
var app = express();
// Render static files
app.use(express.static('public'));
// Port website will run on
app.listen(8080);
```

Then in the terminal, type: `npm init`. Press enter to accept the default parameters for all the following options but make sure the entry point is server.js. 

Finally, type: `npm start` and then go to (IP Address of your VPS host or localhost):8080/index.html (or the name of one of your webpages) in the browser. The Express server you just created should now be serving your website’s static files.

## ~~Next Steps~~

~~In Part 2, we will discuss how to convert your static files to dynamic ones using the EJS templating engine and how to copy repeated code using partials and inject server-side variables to the front-end.~~

# Part 2 - Templating Basics (included in same article/or part 2?)

## Installing EJS

The first step to use EJS is to install it. A simple `npm install ejs --save` will do the trick. The --save parameter saves the module to the package.json file so anyone that clones the git repo (or otherwise downloads the site's files) can install all the required node modules for the project (called dependencies) using the `npm install` command instead of having to type `npm install (module name)` for however many modules you need.

## Converting Static Pages to EJS Files

Next, you need to convert your static HTML files into dynamic EJS ones and setup your folder structure in the way EJS expects. In the root directory of your website, create a folder called views and inside that folder create two sub-folders called pages and partials. Move all your HTML files into the pages sub-folder and rename the .html file extensions to .ejs. Your folder structure should look similar to the picture below.

![NodeJS File Structure.png](img%5CNodeJS%20File%20Structure.png)

## Reusing Code - Creating Your First EJS Partial

When creating static sites, there's often code that you repeat on every page such as the head (where the meta tags are located), header and footer sections. It's inconvienent to change them on every page (especially on larger sites) if alterations are needed but if you use EJS partials then you won't have to. Editing one template (partial) file will update the code on every page and location the file is included in.

We'll take a typical part of a website to be templated, the header as an example. Create a new file called header.ejs in the partials folder. Copy and paste all the code between the `<header></header>` tags on one of your EJS pages into it.

Finally, on all pages with a header delete the code between the `<header></header>` tags (the same code you copied to the header.ejs partial file) and replace it with `<%- include('../partials/header') %>`. Now, you've created your first EJS partial. Repeat the process for any other repetitive pieces of code such as the head and footer sections.

*Small Tip:* If you find it hard to differentiate between your pages and partials since they have the same .ejs file extension then it can be helpful to put a underscore _ in front of the names of partials so _header.ejs. It's a naming convention that some developers use that can be helpful.


## Rendering EJS Pages

Now we get to the exciting part, making the server render the EJS pages and partials so you can see them on the front-end.

First, we need to add the EJS node module to our server so in the server.js file add `const ejs = require('ejs');` near the beginning of the file with the other node modules.

Second, we need to tell our Express server to use EJS so underneath the `app.use(express.static('public'));` line add  `app.set('view engine', 'ejs');`.

Now we need to configure routes. Routes tell the server what to do when a user goes to a certain URL in your website such as http://testapp.com/login. There are two types of routes, get and post. Get routes display pages and post routes upload data from the front-end to the server (usually via a form) typically before a page is rendered and the uploaded data is somehow used.

Since we only want to display our EJS pages, we will just use get routes. Add them after the `app.listen(8080)` line in server.js. For the index page, the route will be:

```js
// *** GET Routes - display pages ***

// Root Route
app.get('/', function (req, res) {
    res.render('pages/index');
});
```
The '/' specifies the URL of the website the code will activate on, the req stands for request and res for result so the result of going to http://testapp.com is rendering (displaying to the browser) the pages/index.ejs page. Add similar routes for your other EJS pages. 

**Should this be left till Part 3? Article over 1200 words**

## Passing Server-Side Data to the Frontend

The main attraction of templating apart from reusing code is that you can pass server-side variables to the front-end either a single variable like the current user's username or array of registered users' details. The real strength is apparent when using APIs. **For API Use, see Part 3?**

 