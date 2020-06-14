# Converting A Static Site to A Dynamic NodeJS Web App - Part 1: Create a Basic Express Server

This tutorial will guide you how to convert a static website that uses HTML, CSS and JS to a dynamic one using the MEN stack. Similar to the popular MEAN/MEARN stack (MongoDB, Express, Angular or React and NodeJS), but instead of using Angular or React, we will use a templating engine called EJS. 

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

```
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

In Part 2, we will discuss how to convert your static files to dynamic ones using the EJS templating engine and how to copy repeated code using partials and inject server-side variables to the front-end.