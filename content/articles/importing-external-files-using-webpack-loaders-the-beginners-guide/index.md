# Importing External Files using Webpack Loaders:The Beginners Guide 
Today, I am going to show you how to utilize Webpack loaders and easily import external files while making use of Webpack. In this tutorial, I am going to be very concise, because I have understood that making use of Webpack loaders to import external files in a web project, can be quite demanding and may look like rocket science,especially for beginners, but it is actually quite easy. 

## Table Of Contents
1. What is Webpack?
2. Installing Webpack
3. Loaders and Plugins
4. Make use of Webpack loaders to import various types of files

## Prerequisites
This tutorial is tailored to suit the needs of a beginner, so if you are just a beginner frontend developer who writes just HTML, CSS and normal JavaScript, then you are good to go. 

**Let us dive in!**

## What is Webpack?
Webpack is a tool that allows you to modularise your code and helps you to push your codes to just one file in other for you not to worry about the hierarchy of your files, especially when working with JavaScript files and also helps you to inject external files, like an SVG, images, your CSS files or other modern JS codes, in your web app. Webpack simply provides a configuration file, where you declare how things should be sorted out and then you relax. 

**Remember I stated earlier that this tutorial is going to be concise, hence a very simple definition of Webpack, which is what I have stated above, for more elaborate definition of Webpack, check out this Wiki Definition of Webpack [Wikipedia's Definition of Webpack](https://en.wikipedia.org/wiki/Webpack)**

## Installing Webpack
First thing you are going to do is to create a directory or folder, you can call it Webpack or anything you feel appropriate, and then you create another folder and name it Webpack Tutorial. 

<a href="https://ibb.co/xLkRx46"><img src="https://i.ibb.co/wgkx5v4/Screenshot-2021-09-11-at-12-37-51.png" alt="Screenshot-2021-09-11-at-12-37-51" border="0"></a>

The next thing we are going to do now is to open the Webpack Tutorial Folder with your favourite code editor, in my case is Visual Studio Code!
So I am going to head over to Visual Studio Code and then drag and drop the Folder we last created
<a href="https://ibb.co/0XnKnCd"><img src="https://i.ibb.co/Db1Y19S/Screenshot-2021-09-11-at-13-06-15.png" alt="Screenshot-2021-09-11-at-13-06-15" border="0"></a>
<p style="text-align:center;">As you can see there is no file in our folder and this is totally fine!</p>

Now the next thing we are going to be doing, is to initialize NPM (Node Package Manager), so I am going to open my terminal in VS Code and enter this command: 

```
npm init
```
<a href="https://ibb.co/sCZXP2s"><img src="https://i.ibb.co/HCj92VG/Screenshot-2021-09-11-at-13-24-05.png" alt="Screenshot-2021-09-11-at-13-24-05" border="0"></a>

**Note: You can only run the npm init command if NodeJs is properly installed on your device. Kindly Check out this link to install NodeJS [Installing NodeJS with Package Manager](https://nodejs.org/en/download/package-manager/)**

<a href="https://ibb.co/zPqBj0P"><img src="https://i.ibb.co/p4YMG94/Screenshot-2021-09-11-at-13-48-57.png" alt="Screenshot-2021-09-11-at-13-48-57" border="0"></a>
If you initalised npm properly, it will generate a package.json file for you, just like you have here.

Now, we have properly initlaised our node pacakage and we have our package.json file. Next thing to do, is to install Webpack, and one thing you should note is that installing Webpack only, can make you have some issues later on, so it is always advisable to install Webpack along with the CLI. So you enter this command in your terminal. 

```
npm i webpack webpack-cli --save-dev
```
<a href="https://ibb.co/fHPDr1D"><img src="https://i.ibb.co/3cLRSrR/Screenshot-2021-09-12-at-14-17-09.png" alt="Screenshot-2021-09-12-at-14-17-09" border="0"></a>
If you successfully installed Webpack you should have a package-lock.json file and the node_modules folder in your root directory, just like I have here.

Moving forward now, the first thing to do in configuring your webpack, is to create a new file in your root directory and name it webpack.config.js and then we are going to add some codes into this our newly created configuration file. 

Add the following codes into your webpack.config.js file:

```
module.exports = {
    entry: "./app/index.js"
};
```
So in the code above we have the module.exports object and then we declared the entry point for our project which is the app directory and in the app directory you have the index.js file which is your main file. 

## Loaders and Plugins
Now we have successfully installed webpack and set up our webpack.config.js file. So before we continue to importing our files using Webpack loaders, you need to understand what are loaders and plugins, because this is what we will be using to successfuly handle the importation of our files. 

Whenever there are new things to load in the webpack, for example we want to import an svg, or a CSS file the job of the loaders is simply to bring in these files that we need while things are loaded. So before the final output.js file is created whatever configuration you need to do to bring in your files is being done by the loaders. And whatever configuration that you need to do after the output.js file is created is handled by the plugins. 

As we proceed to importing external files using webpack loaders we will understand more the work of the loaders and plugins. 

## Making use of Webpack loaders to import various type of files. 

### Importing your CSS File
The first thing we are going to do is to run the command below in our terminal

```
npm install --save-dev css-loader style-loader
```

Then you add the following into your webpack.config.js file
 ```
 module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
```
<a href="https://ibb.co/GPPNfWc"><img src="https://i.ibb.co/vzzRC3Z/Screenshot-2021-09-12-at-15-02-36.png" alt="Screenshot-2021-09-12-at-15-02-36" border="0"></a>
Your webpack.config.js file should now look like this. 

We have successfully configured our webpack.config.js file now to be able to load our CSS files and inject our styles into our JavaScript file. 

### Importing an SVG file
The first thing to do is to install the SVG Inline Loader for Webpack. You copy and run this command in the terminal, to do this. 

```
npm install svg-inline-loader --save-dev
```
After succesfully installing the SVG Inline loader for webpack,using the command above, the next thing is to add your configuration in your webpack.config.js file. So you add the code below to your webpack.config.js file, in your rules array. 

```
    {
        test: /\.svg$/,
        use: 'svg-inline-loader'
    }
```
If you did that correctly, your webpack.config.js should look like this. 

<a href="https://ibb.co/wz6DcMH"><img src="https://i.ibb.co/HHgmhnv/Screenshot-2021-09-12-at-15-28-00.png" alt="Screenshot-2021-09-12-at-15-28-00" border="0"></a>

**Kindly note that in some other learning resources, you will have them make use of loader instead of use while trying to configure our SVG file in the rules array, but for consistency we will make use of use instead of loader. Also I have found out that in recent learning resources / docs they make use of "use" instead of loader, for example in the documentation below, loader was used instead.**

<a href="https://ibb.co/YRp0pYJ"><img src="https://i.ibb.co/yfW4WGK/Screenshot-2021-09-12-at-15-41-40.png" alt="Screenshot-2021-09-12-at-15-41-40" border="0"></a>

### Importing images
Firstly, you are going to install the Image Loader for Webpack by running the command in the terminal below:

```
$ npm install img-loader --save-dev
```
Next we are going to add the Image loader configuration in our webpack.config.js file:

```
    {
      test: /\.(jpe?g|png|gif|svg)$/i,
      use: [
        'url-loader?limit=10000',
        'img-loader'
      ]
    }
```

<a href="https://ibb.co/Z6sZsVv"><img src="https://i.ibb.co/tMfdf4n/Screenshot-2021-09-12-at-16-08-28.png" alt="Screenshot-2021-09-12-at-16-08-28" border="0"></a>
Your webpack.config.js file should look like this, if you added the Image Loader configuration properly. 

### Importing Babel 
This tutorial is targeted for beginners, but I am going to show you how to also import your Babel JS file. 

The first thing we are going to be doing is to run the command below in our terminal to install the Babel Loader package. 

```
npm install --save-dev babel-loader
```
If you have successfully installed the Bable Loader Package, then we are going to add some configuration in our webpack.config.js file and we will be writing Regex Code. Just copy and add the following in your webpack.config.js file. 

```
    {
        test: /\.(js)$/,
        use: "babel-loader",
    },
```
After doing that your webpack.config.js file should now look like this
<a href="https://ibb.co/hWYkTpX"><img src="https://i.ibb.co/QNDZxs8/Screenshot-2021-09-12-at-16-26-02.png" alt="Screenshot-2021-09-12-at-16-26-02" border="0"></a>

We have successfully imported our CSS, SVG, Image and Babel files and added the configuration in our webpack.config.js file but that is not all. 

The next thing we are going to be doing now is to add the output object in our webpack.config.js file. 

So we are going to create an output object and add the path and filename parameter into this object, just copy the code below

```
output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js"
    }
```
Also we are going to be importing another module which is path and this comes in directly as long as you are using node, so you do not need to install it, just add this code to the top of your webpack.config.js. 

```
const path = require("path")
```
If you did everything correctly your webpack.config.js should now look like this
<a href="https://ibb.co/7NyTvy2"><img src="https://i.ibb.co/YTjK2jp/Screenshot-2021-09-12-at-16-46-43.png" alt="Screenshot-2021-09-12-at-16-46-43" border="0"></a>

One thing to note here is that you are importing four different files and those files will be bundled up into our bundle.js file but we also need to inject these files into our html file, and that is what we are going to be doing next, with the help of HTML webpack plugin. 

To install, we run the command below in the terminal: 

```
npm install --save-dev html-webpack-plugin
```
The next thing to do is to add the code below to the top of our webpack.config.js file

```
const HtmlWebpackPlugin = require('html-webpack-plugin');
```

Then we add the plugins after the output with the code below: 

```
  plugins: [new HtmlWebpackPlugin()],
```
<a href="https://ibb.co/6DRcBVZ"><img src="https://i.ibb.co/Yf74ZYW/Screenshot-2021-09-12-at-16-57-16.png" alt="Screenshot-2021-09-12-at-16-57-16" border="0"></a>
If you did everything correctly, your webpack.config.js file should now be like this. 