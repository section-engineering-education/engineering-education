---
layout: engineering-education
status: publish
published: true
url: /cross-platform-applications-electron/
title: Cross-Platform Applications With Electron
description: Electron is an open-source software framework developed and maintained by GitHub. It allows for the development of desktop GUI applications using web technologies.
author: rohan-reddy
date: 2020-07-01T00:00:00-09:00
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/cross-platform-applications-electron/hero.jpg
    alt: cross platform apps electron
---
[Electron](https://www.electronjs.org/), maintained by Github, is a framework for building cross-platform desktop applications with web technologies like HTML, CSS and Javascript.
<!--more-->

<img alt="electron logo" src="/engineering-education/cross-platform-applications-electron/electron-logo.png" width="300">

### Introduction to Electron
 Instead of having different teams and different codebases for the same application across different platforms, we can have a single codebase in JavaScript (which is a [popular language](https://insights.stackoverflow.com/survey/2019#most-popular-technologies)).

 Beginners who are building applications for fun don't have to learn Swift, Objective-C, .NET, C++ for the wide variety of platforms. Instead, they can use frontend technologies like HTML and JavaScript that are more beginner-friendly.

 There are many cross-platform technologies like [Xamarin](https://dotnet.microsoft.com/apps/xamarin), [Tcl/Tk](https://www.tcl.tk/software/tcltk/) and Java Swing. Still, these involve learning a new programming language and may not have all of the functionality to meet your requirements. In your journey with Electron, you can write platform-specific code to take advantage of the hardware and software, such as the touch bar capabilities of Macbooks and so on.

### When to use Electron
There are many different scenarios in which we can use Electron for building desktop applications. Some examples include:
* Creating a GUI for a Node app. Suppose you want to create an interface for your existing Node CLI application, then Electron can help.
* Building an application with advanced permissions, like FileSystem. Applications like text editors cannot work without these permissions, and Electron offers solutions for this.
* Building a small application that lives in the user's menu bar or the system tray to always run in the background, something that can be opened by a global shortcut.
* Building an app that works offline.
* Better User Experience (UX) - offer a native app instead of a web page.

### Popular Electron Applications
![popular electron apps](/engineering-education/cross-platform-applications-electron/popular-electron-apps.png)

### How does it work?
![node chrome](/engineering-education/cross-platform-applications-electron/node-chrome.png)
Electron is based on [Node.js](https://nodejs.org/en/) and [Chromium](https://www.chromium.org/). From Chrome, we get HTML5 support, V8 engine, GPU acceleration, and Blink (the rendering engine). From Node, we get stuff the browser cannot do like FileSystem access and native modules that are compiled C and C++ programs.

In an electron application, the client-side code has all the same privileges as the server-side code, so it can directly make third-party API requests.

![electron workflow](/engineering-education/cross-platform-applications-electron/electron-workflow.png)

#### Electron Process Model
In the `package.json` file, we define the main file, which is executed first when we start the application. The `main.js` file creates an application window, or a browser window instance, to run web pages. The main.js file will spawn the *Main Process*. The web page runs its processes known as *rendered processes*.

### Advantages of using Electron
* [**Automatic Updates**](https://www.electronjs.org/docs/api/auto-updater) enable apps to update themselves automatically. The easiest way is to use [Squirrel](https://github.com/Squirrel), which describes itself as server-driven updater for native apps, or autoUpdater module of Electron.
* **Native Menus** allow developers to create native application menus and context menus, which makes the application look-and-feel similar to the OS theme.
* **Crash Reporting** monitors the app, and if it crashes, sends reports to a remote server.
* **Debugging and Profiling** collects tracing data from Chromium to find performance bottlenecks and slow operations. Debugging is possible through the option openDevTools() where you can open [Chrome Dev Tools](https://developers.google.com/web/tools/chrome-devtools).

### Getting Started with Electron
Make sure you have Node and NPM installed.
[Download Node](https://nodejs.org/en/download/)
[Download NPM](https://www.npmjs.com/get-npm)
To check the installation status:
```bash
# to check if you have Node installed type this command in terminal
node -v
# to check if you have npm installed
npm -v
```
#### Project Structure
A basic electron app has the following structure:
```
your-app/
├── package.json
├── main.js
└── index.html
```
1. Run `npm init`. npm will guide you through the process and will create a `package.json` file.
2. Add this to `scripts` inside `package.json`.
```json
"scripts": {
    "start": "electron ."
  }
```
3. Install electron using `npm install --save-dev electron`.
4. Create files.

#### Electron Development
A simple `main.js` file might wait for the application to be ready and open a window:
```javascript
const { app, BrowserWindow } = require('electron')

function createWindow () {
  // Create the browser window.
  let win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })

  // and load the index.html of the app.
  win.loadFile('index.html')
}

app.whenReady().then(createWindow)
```
Finally, the  `index.html`  is the web page you want to show:
```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Hello World!</title>
  </head>
  <body>
    <h1>Hello World!</h1>
    We are using node
    <script>document.write(process.versions.node)</script>,
    Chrome <script>document.write(process.versions.chrome)</script>,
    and Electron <script>document.write(process.versions.electron)</script>.
  </body>
</html>
```
#### Running your app
You can try your app by running `npm start` from your application's directory.

### Conclusion
Every technology has some "drawbacks" or "disadvantages", and Electron is no exception; some of these can be ignored depending on your application. Be sure to evaluate these before you proceed:
- **_Application Size:_**  Since Electron uses Chromium and NodeJS, the application size is quite big.
- **_Memory Usage:_** Chrome and Chromium are known for consuming a large amount of RAM and CPU. If your target is low-end devices, then Electron may not be the best framework.

Happy Hacking!!

### References and Resources
* [https://www.intertech.com/Blog/why-major-companies-are-using-electron-to-build-cross-platform-apps/](https://www.intertech.com/Blog/why-major-companies-are-using-electron-to-build-cross-platform-apps/)
* [https://frontendmasters.com/courses/electron-v2/](https://frontendmasters.com/courses/electron-v2/)
* [https://www.cabotsolutions.com/using-electron-for-cross-platform-desktop-application-development-an-introduction.](https://www.cabotsolutions.com/using-electron-for-cross-platform-desktop-application-development-an-introduction)
* [https://github.com/electron/electron/blob/master/docs/tutorial/](https://github.com/electron/electron/blob/master/docs/tutorial/)
