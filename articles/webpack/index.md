---
layout: engineering-education
status: publish
published: true
url: /engineering-education/webpack/
title: Introduction To Webpack with Node.js
description: This article serves as an Introduction to webpack - webpack is a static module bundler for modern JavaScript applications. 
author: rohan-reddy
date: 2020-08-07T00:00:00-08:00
topics: [Node.js]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/webpack/hero.jpg
    alt: webpack example text image
---
[Webpack](https://webpack.js.org/) is a *static module bundler* for JavaScript applications. It takes [modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules), whether that's a custom file that we created or something that was installed through NPM, and converts these modules to static assets.
<!--more-->

This enables you to take a fully dynamic application and package it into static files, which you can then upload and deploy to your server. We can also extend what webpack can do with [Plugins](https://webpack.js.org/concepts/plugins/) and [Loaders](https://webpack.js.org/concepts/loaders/). A module is JavaScript code with a discrete chunk of functionality, and it abstracts and delegates functionality to libraries so that we don't have to understand the complexity of it.

### Why Use Module Bundlers and Webpack?
When we had very few JS scripts on a webpage, there were two ways to load JavaScript.

```html
<html>
  <body>
    <script src="index.js"></script>
  </body>
</html>
```

and

```html
<html>
  <body>
    <script>
      var foo = "bar";
      console.log(foo);
    </script>
  </body>
</html>
```

This method does not scale, and when we have many scripts, it becomes a problem to load these scripts because of network bottleneck. If we keep them all in one file, then it becomes unmaintainable and causes problems with the name and scope of variables.

Then came **[IIFE's](https://developer.mozilla.org/en-US/docs/Glossary/IIFE)** which solved scope issues for large projects, but changing even one file meant rebuilding the entire project.

#### JavaScript Modules [(Node.js modules)](https://www.w3schools.com/nodejs/nodejs_modules.asp)
 When JavaScript was bought server-side with Node.js, there were no HTML files to add `<script>` tags. [CommonJS](http://wiki.commonjs.org/wiki/CommonJS) (an organisation) came out and introduced Common.js modules and `require`, which allows you to load and use a module in the current file.

```javascript
//math.js
module.exports = function add(a,b){
  return a+b;
}
```
```javascript
//index.js
var add = require("./add")
```
While this was great for Node.js projects, there is no browser support for CommonJS. Bundling tools like [RequireJS](https://requirejs.org/) and [Browserify](http://browserify.org/) were created for this purpose.


#### ECMAScript Modules (ESM)
ECMAScript modules are the official standard format to package JavaScript code for reuse. Modules are defined using a variety of `import` and `export` statements.

```javascript
//add.mjs
function add(a,b){
  return a+b;
}
```
```javascript
//app.mjs
import {add} from "./add.mjs"
console.log(add(1,2));
// .mjs file extension used for using ES modules in Node
```
This is good news for web projects. However, browser support is incomplete, and bundling is still faster than early module implementations.


#### So, why webpack?

Webpack provides a great developer experience as it not only bundles JavaScript applications (supporting **both EcmaScript Modules and CommonJS**), but when paired with plugins and loaders it can be used for taking care of dependencies and assets, such as images, fonts, SASS, CSS, etx. Webpack goes through your project and builds a [dependency graph](https://webpack.js.org/concepts/dependency-graph/) based on what is imported and exported. 


### Getting Started with Webpack 

Webpack provieds a Command Line Interface ([CLI](https://webpack.js.org/api/cli)), which we can call as `webpack filename.js target/index.js` from the terminal; and Node.js [API](https://webpack.js.org/api/node), which we can use in our Node.js application. With webpack 4 we can use it without any configuration.

Let's create a dummy Node.js project and bundle it with webpack. You can use your project.

### Install webpack
You need [NPM](https://www.npmjs.com/get-npm) and [Node](https://nodejs.org/en/download/) installed on your machine.

```bash
mkdir dummy-project
cd dummy-project
npm init -y
npm install webpack webpack-cli --save-dev
```

### webpack without configuration
Create the following directory structure.

```
  webpack-demo
  |- package.json
  |- index.html
  |- /src
  |- index.js
```
Add the following code to `index.js`:

```javascript
function component() {
  const element = document.createElement('div');
  element.innerHTML = _.join(['Hello', 'world'], ' ');
  return element;
}

document.body.appendChild(component());
```
In `index.html`:
```html
<!doctype html>
<html>
  <head>
    <title>Basic Application</title>
    <script src="https://unpkg.com/lodash@4.16.6"></script>
  </head>
  <body>
    <script src="./src/index.js"></script>
  </body>
</html>
```
The above code works because we added a `<script>` loading [lodash](https://lodash.com/). If we run **`npx webpack`** in the *dummy-project* directory, webpack creates a bundle in the `dist` directory with filename `main.js`.


`src` is the "source" directory where we write and edit our code. The `dist` folder contains "distribution" code, which is the minimized and optimized output of the build process that will eventually be loaded in the browser.

If we inspect `dist/main.js`.

```javascript
!function(e){var n={};function t(r){if(n[r])return n[r].exports;var o=n[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,t),o.l=!0,o.exports}t.m=e,t.c=n,t.d=function(e,n,r){t.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:r})},t.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},t.t=function(e,n){if(1&n&&(e=t(e)),8&n)return e;if(4&n&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(t.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var o in e)t.d(r,o,function(n){return e[n]}.bind(null,o));return r},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},t.p="",t(t.s=0)}([function(e,n){document.body.appendChild(function(){const e=document.createElement("div");return e.innerHTML=_.join(["Hello","world"]," "),e}())}]);
```
Let's install `lodash` locally and remove the `<script>` tag in index.html. We should also tweak the directory structure and move index.html into `dist` to use main.js file.

```bash
npm install --save lodash
```
##### src/index.js

```javascript
  import _ from 'lodash';
  function component() {
  const element = document.createElement('div');
  element.innerHTML = _.join(['Hello', 'world'], ' ');
  return element;
  }

  document.body.appendChild(component());
```
##### dist/index.html

```html
  <!doctype html>
  <html>
    <head>
      <title>Basic Application</title>
    </head>
    <body>
      <script src="main.js"></script>
    </body>
  </html>
```
If we now open `index.html` in the browser we see "Hello world".


### Using a configuration with webpack

Webpack doesn't require any configuration, but most projects will need a more complex setup, which is why webpack supports a configuration file. Add a file with the name `webpack.config.js` in the `dummy-project` directory.


Example **webpack.config.js**
```javascript
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
  filename: 'main.js',
  path: path.resolve(__dirname, 'dist'),
  },
};
```

The following are some configurable concepts of webpack.

* **Entry**. *Entry* defines the entry-point for the application. It is the first module that webpack will process to build its dependency graph.
```javascript
module.exports = {
  entry: './path/to/my/entry/file.js'
};
```
* **Output**. The output property tells webpack where to store the bundles it creates and how to name these files. The default location is `./dist/main.js` for Javascript files and also stores other generated files in the `./dist` folder.
```javascript
module.exports = {
  output: {
  filename: 'my-first-bundle.js',
  pathname: __dirname + '/dist'
  }
}
```
* **Loaders**. Out of the box, webpack only understands JavaScript and JSON files. Loaders allow webpack to process other types of files and convert them into valid modules that can be consumed by your application and added to the dependency graph.


```javascript
moduel.exports = {
  module: {
  rules: [
  {test: /\.txt$/, use: 'raw-loader'}
  ]
  }
}
```

The `test` property identifies which file should be transformed. The `use` property indicates which loader should be used.


* **Plugins**. While loaders are used to transform certain types of modules, plugins can be leveraged to perform a wider range of tasks like bundle optimization, asset management and injection of environment variables. In order to use a plugin, you need to `require()` it and add it to the `plugins` array. Most plugins are customizable through options.

```javascript
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  plugins: [
  new HtmlWebpackPlugin({template: './src/index.html'})
  ]
};
```

* **Mode**. The mode can be set to `production` or `development` with their usual meanings.

We can add webpack to npm scripts in `package.json` so as to ease our development process. Add ` "build": "webpack",` to package.json and run the command `npm run build`.

### Conclusion
A huge advantage of using webpack is its customizability and its features like [Hot Module Reloading](https://webpack.js.org/concepts/hot-module-replacement/), we have discussed only some ways in which webpack can be configured please visit [this link](https://webpack.js.org/configuration/) for more information. There are other tools which have emerged like [Parcel Bundler](https://parceljs.org/), but webpack is still well suited for large and complex applications due to its features. Read about comparisons [here](https://webpack.js.org/comparison/).


## References

* [DOCS](https://webpack.js.org/guides/getting-started)
* [https://www.freecodecamp.org/news/](https://www.freecodecamp.org/news/how-to-configure-webpack-4-with-angular-7-a-complete-guide-9a23c879f471)
* [dev.to](https://dev.to/vinodchauhan7/webpack-zero-to-production-part-1-1m9e)
* [https://www.oreilly.com/library/view/learning-javascript-design/9781449334840/ch11s03.html](https://www.oreilly.com/library/view/learning-javascript-design/9781449334840/ch11s03.html)
