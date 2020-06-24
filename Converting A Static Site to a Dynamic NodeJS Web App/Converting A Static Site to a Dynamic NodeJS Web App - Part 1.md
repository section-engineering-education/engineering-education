# Converting A Static Site to A Dynamic NodeJS Web App

This tutorial will guide you how to convert a static website that uses HTML, CSS and JS to a dynamic one. We will use a similar tech stack to the popular MEAN/MEARN (MongoDB, Express, Angular or React and NodeJS. But, we won't use a front-end JavaScript framework like Angular or React. Instead, we'll use a templating engine called [EJS](https://ejs.co) (Embedded JavaScript.) Other popular templating engines include Handlebars, Pug and Nunjucks.

Learning a templating language is easier than a JS framework because you only need to write HTML. Partials is a feature that lets you reuse code in multiple locations. You can also pass server-side variables to be displayed in the front-end (such as a username).


## Installing NodeJS

First, make sure you’ve installed NodeJS on your local machine or VPS hosting provider.  If you haven’t installed it, go to the [NodeJS website](https://nodejs.org/en/) to do so. NodeJS lets you write server-side code using a special form of JavaScript.  That has the benefit of to learn another language.

The NodeJS installer comes bundled with the package manager, NPM. NPM is a repository for Node Modules. It's like a plugin repository. Node Modules are reusable pieces of code. They can extend the functionality of your server. Node Modules are like code snippets or libraries (depending on how large they are).

*Windows Users:* Need to add Node and NPM to their PATH so they can call them by command on the command line. See my [guide](https://www.section.io/engineering-education/working-with-databases-part1/#mondodb-installation) on How to Install MongoDB if you need instruction.


## Testing the Install

To test that the installation has worked, open a terminal window, and type `node -v`  and  `npm -v`. If the message starts with a v and some numbers then the installation has been successful. Now you’re ready to create your first server.

## Creating Your First Server

Once you have created a static website, the first step to create a NodeJS app is to create an Express web server. 

First, move all your website’s static files (HTML, CSS, JS and images etc.) into a folder called public. Then create a file called server.js in the root directory of your website folder. In the server.js file type:

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

Then in the terminal, type: `npm init`. Press enter to accept the default parameters for all the following options. Make sure the entry point is server.js. 

Finally, type: `npm start` and then go to (IP Address of your VPS host or localhost):8080/index.html in the browser. The Express server you created should now be serving your website’s static files.

## ~~Next Steps~~

~~In Part 2, we will discuss how to convert your static files to dynamic ones using the EJS templating engine and how to copy repeated code using partials and inject server-side variables to the front-end.~~

# ~~Part 2 - Templating Basics (included in same article/or part 2?)~~

## Installing EJS

The first step to use EJS is to install it. A simple `npm install ejs --save` will do the trick. The --save parameter saves the module to the package.json file. This means anyone that downloads the site can install all the required node modules for the project.  Those modules are called dependencies. They do so by using the `npm install` command. So it saves having to type `npm install (module name)` for all the modules you need.

## Converting Static Pages to EJS Files

Next, you need to convert your static HTML files into dynamic EJS ones. First, setup your folder structure in the way EJS expects. In the root directory of your website, create a folder called views. Inside that folder, create two sub-folders called pages and partials. Move all your HTML files into the pages sub-folder and rename the .html file extensions to .ejs. Your folder structure should look like the picture below.

![NodeJS File Structure.png](img%5CNodeJS%20File%20Structure.png)

## Reusing Code - Creating Your First EJS Partial

When creating static sites, there's often code that you repeat on every page. These can be the the head (where the meta tags are), header and footer sections. It's inconvienent to change them on every page  if alterations are needed.  EJS partials solve that problem. Editing a template (partial) file will update the code everywhere the file is included.

We'll take a typical part of a website to template, the header as an example. Create a new file called header.ejs in the partials folder. Copy and paste all the code between the `<header></header>` tags on one of your EJS pages into it.

Finally, on all pages with a header, delete the code between the `<header></header>` tags. That's the same code you copied to the header.ejs partial file. Replace it with `<%- include('../partials/header') %>`. Now, you've created your first EJS partial. Repeat the process for any other repetitive pieces of code such as the head and footer sections.

*Small Tip:* You may find it hard to differentiate between your pages and partials since they have the same .ejs file extension. It can be helpful to put a underscore _ in front of the names of partials so _header.ejs. It's a naming convention that some developers use that can be helpful.


## Rendering EJS Pages

Now we get to the exciting part, making the server render the EJS pages and partials so you can see them on the front-end.

First, we need to add the EJS node module to our server. In the server.js file add `const ejs = require('ejs');` near the beginning of the file with the other node modules.

Second, we need to tell our Express server to use EJS. Underneath the `app.use(express.static('public'));` line add  `app.set('view engine', 'ejs');`.

Now we need to configure routes. Routes tell the server what to do when a user goes to a certain URL in your website such as http://testapp.com/login. There are two types of routes, get and post. Get routes display pages and post routes upload data from the front-end to the server. It's usually via a form before the page renders and the uploaded data is somehow used.

Since we only want to display our EJS pages, we will only use get routes. Add them after the `app.listen(8080)` line in server.js. For the index page, the route will be:

```js
// *** GET Routes - display pages ***

// Root Route
app.get('/', function (req, res) {
    res.render('pages/index');
});
```
The '/' specifies the URL of the website the code will activate on. The req stands for request and res for result. The result of going to http://testapp.com is rendering (displaying to the browser) the pages/index.ejs page. Add similar routes for your other EJS pages. 

**Should this be left till Part 3? Article over 1200 words**

## Passing Server-Side Data ~~(should it be variables?)~~ to the Frontend

The second attraction of templating is passing server-side variables to the front-end. Either a single variable like the current user's username or an array like the details of every registered users. However, the real strength of passing server-side variables becomes apparent when using APIs or databases. 

For a basic example, the below code will display "Louise" in the h2 tag of the index page:

**server.js**
```js
// Route Route
app.get('/', function (req, res) {
    var name = "Louise";
    // Render index page
    res.render('pages/index', {
        // EJS variable and server-side variable
        name: name
    });
});
```
The first name is the name of the EJS variable (the name for displaying it on the front-end). The second the variable that contains the data you want to send. They don't have to be identical.

**index.ejs**
``` html
<h2>My name is <%= name %></h2>
```

For a simple array, you can use this example instead. It will create a p tag for every name in the listnames variable:

**server.js**

``` js
// Route Route
app.get('/', function (req, res) {
    var listnames = ["Louise", "Sadie", "Erik", "Raph", "Gina"];
    // Render index page
    res.render('pages/index', {
        // EJS variable and server-side variable
        listnames: listnames
    });
});
```
**index.ejs**
``` html
<% listnames.forEach(function(name) { %>
        <p><%= name %></p>
        <% }); %>
```

## ~~Passing Server-Side Data (Extended)~~(Should it be more about continuing work/future work/building on skills?)

Congratulations. You've successfully converted your static website to a NodeJS web app. You've also created your first Express web server and  learned the basic of EJS templating.

Hopefully, you want to build on the skills you've learned on this tutorial. I suggest using EJS templating to work with APIs and databases. 

If you need a helping hand on either of those areas, check out my Getting to Grips with Databases [guide](https://www.section.io/engineering-education/working-with-databases-part1/) and ~~look out for The Simple Guide to Using APIs~~ **~~(only mention when I've written the article?)~~** which will get you started and later expand into using EJS.