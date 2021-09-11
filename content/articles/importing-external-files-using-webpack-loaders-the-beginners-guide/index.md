# Importing External Files using Webpack Loaders:The Beginners Guide 
Today, I am going to show you how to utilize Webpack loaders and easily import external files while making use of Webpack. In this tutorial, I am going to be very concise, because I have understood that making use of Webpack loaders to import external files in a web project, can be quite demanding and may look like rocket science,especially for beginners, but it is actually quite easy. 

## Table Of Contents
1. What is Webpack?
2. Installing Webpack
3. Plugins and Loaders
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
As you can see there is no file in our folder and this is totally fine!

Now the next thing we are going to be doing, is to initialize NPM (Node Package Manager), so I am going to open my terminal in VS Code and enter this command: 

```
npm init
```
<a href="https://ibb.co/sCZXP2s"><img src="https://i.ibb.co/HCj92VG/Screenshot-2021-09-11-at-13-24-05.png" alt="Screenshot-2021-09-11-at-13-24-05" border="0"></a>