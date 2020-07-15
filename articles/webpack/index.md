# Introduction To Webpack
[Webpack](https://webpack.js.org/) is a *static module bundler* for JavaScript applications. It takes [modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules) whether that's a custom file that we created or something that was installed through NPM and converts these modules to static assets so that you can take a fully dynamic application package it into static files which you can then upload and deploy to your server. We can also extend what webpack can do with [Plugins](https://webpack.js.org/concepts/plugins/) and [Loaders](https://webpack.js.org/concepts/loaders/). A module is javascript code with discrete chunk of functionality and its abstract and delegates functionality to libraries so that we dont have to understand the complexity of it. 

## Why Use Module Bundlers?

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

**JavaScript Modules** when javascript was bought to server side there were no HTML files to add `<script>` tags. CommonJS came out and introduced `require`, which allows you to load and use a module in the current file. 

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

**EcmaScript Modules (ESM)**



## References 
* [Video Tutorial](https://www.youtube.com/watch?v=lziuNMk_8eQ)
* [Documentation](https://webpack.js.org/concepts/)
