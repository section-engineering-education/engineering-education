# Introduction To Webpack
[Webpack](https://webpack.js.org/) is a *static module bundler* for JavaScript applications. It takes [modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules) whether that's a custom file that we created or something that was installed through NPM and converts these modules to static assets so that you can take a fully dynamic application package it into static files which you can then upload and deploy to your server. We can also extend what webpack can do with [Plugins](https://webpack.js.org/concepts/plugins/) and [Loaders](https://webpack.js.org/concepts/loaders/). A module is javascript code with discrete chunk of functionality and its abstract and delegates functionality to libraries so that we dont have to understand the complexity of it. 

## Why Use Module Bundlers and Webpack?

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
This method does not scale and when we have many scripts it becomes a problem to load these scripts because of network bottleneck. If we keep them all in one file then it becomes unmaintainable. There will be problems with name and scope of variables. Then came **[IIFE's](https://developer.mozilla.org/en-US/docs/Glossary/IIFE)** which solved scope issues for large projects but changing even one file meant rebuilding ther entire project.

**JavaScript Modules** when javascript was bought to server side with NodeJS, there were no HTML files to add `<script>` tags. CommonJS came out and introduced `require`, which allows you to load and use a module in the current file. 

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

**ECMAScript Modules (ESM)**
ECMAScript modules are the official standard format to package JavaScript code for reuse. Modules are defined using a variery of `import` and `export` statements.

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
This is a good news for web projects. However, browser support is incomplete and bundling is still faster than early module implementations.

So why webpack? Bundlers like webpack automatically go through your application and build a [dependency graph](https://webpack.js.org/concepts/dependency-graph/) based on what is imported and exported. This along with other plugins and loaders make for a great developer experience. It's a tool that lets you bundle your JavaScript applications (supporting both ESM and CommonJS). Any time one file depends on another, webpack treats this as a dependency. This allows webpack to take non-code assets, such as images or web fonts, and also provide them as dependencies for your application.

## Getting Started with Webpack

### Install webpack

`npm init`
`npm install webpack webpack-cli --save-dev` 



## References 
* [Video Tutorial](https://www.youtube.com/watch?v=lziuNMk_8eQ)
* [Documentation](https://webpack.js.org/concepts/)
