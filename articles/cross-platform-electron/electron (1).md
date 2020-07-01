# Cross-Platform Applications With Electron

![electron logo](51.png)

### Introduction to Electron
 [Electron](https://www.electronjs.org/) is a framework for building cross-platform desktop applications with web technologies like HTML, CSS and Javascript. Github maintains Electron. Instead of having different teams and having different codebases for the same application, for different platforms, we can have a single codebase in JavaScript (which is a [pretty popular language](https://insights.stackoverflow.com/survey/2019#most-popular-technologies)).  Beginners who are building applications **for fun** don't have to learn Swift, Objective-C, .NET, C++ for the wide variety of platforms, they can use frontend technologies like HTML and JavaScript which are beginner-friendly. There are many cross-platform technologies like [Xamarin](https://dotnet.microsoft.com/apps/xamarin), [Tcl/Tk](https://www.tcl.tk/software/tcltk/) and Java Swing. Still, these involve learning a new programming language or lack of functionality, check them out if you are interested. In your journey with Electron you can write platform-specific code to take advantage of the hardware and software like you can use the touch bar capabilities of Macbooks and so on.


### When to use Electron
Different scenarios in which we can use Electron for building desktop applications :
* To create a GUI for node app. Suppose you want to create an interface for your already existing Node CLI application, then Electron comes to your help.
* For building an application with advanced permissions like file-system, Electron is a good choice. Applications like text editors cannot work without these permissions.
* Build a small application that lives in the user's menubar or the system tray to always run in the background, something that can be opened by a global shortcut.
* Build an app that works offline!
* Better User Experience, use a native app instead of a web page.

### Popular Electron Applications
![pop](52.png)

### How does it work
![node chrome](53.png)
Electron is based on [Node.js](https://nodejs.org/en/) and [Chromium](https://www.chromium.org/), From chrome we get HTML5 support, V8 engine,GPU acceleration,Blink the rendering engine. From Node, we get stuff the browser cannot do like FileSystem access and native modules that are compiled C and C++ programs. In an electron application, the client-side code has all the same privileges as the server-side code so it can directly make Third Party API requests. 

![flow](54.png)

**Electron Process Model**
In the `package.json` file, we define the main file, which is executed first when we start the application. The main.js file creates an application window or a browser window instance to run web pages. The main.js file will spawn the *Main Process*. The web page runs its processes known as *rendered processes*. 

### Advantages of using Electron
* [**Automatic Updates**](https://www.electronjs.org/docs/api/auto-updater), this enables apps to update themselves automatically. The easiest way is to use [Squirrel](https://github.com/Squirrel) which describes itself as server-driven updates for native apps, or autoUpdater module of Electron.
* **Native Menus**, developers can create native application menus and context menus, and this makes the application look-and-feel similar to the OS theme. 
* **Crash Reporting**, this monitors the app, and if the app crashes, it sends reports to a remote server.
* **Debugging and Profiling**,  collect tracing data from Chromium to find performance bottlenecks and slow operations. Debugging is possible through the option openDevTools() where you can open [Chrome Dev Tools](https://developers.google.com/web/tools/chrome-devtools).

### Getting Started with Electron
Make sure you have Node and NPM installed. 
[Download Node](https://nodejs.org/en/download/)
[Download NPM](https://www.npmjs.com/get-npm)
To check the installation status.
```
# to check if you have Node installed type this command in terminal
node -v
# to check if you have npm installed 
npm -v
```
**Project Structure** 
A basic electron app has the following structure.
```
your-app/
├── package.json
├── main.js
└── index.html
```
Step 1: Run `npm init`, npm will guide you through the process and creates a package.json file.
Step 2: Add this to `scripts` inside `package.json`.
```
"scripts": {
    "start": "electron ."
  }
```
Step 3: Install electron `npm install --save-dev electron`.
Step 4: Create files.

**Electron Development**

A simple `main.js` file might wait for the application to be ready and open a window:
```
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
```
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
**Running your app**
You can try your app by running `npm start` from your application's directory.

### Conclusion
Every technology has some "drawbacks" or "disadvantages", and Electron is no exception; some of these can be ignored depending on your application look at these before you proceed. 
**_Application Size_**  since Electron uses Chromium and NodeJS, the application size is quite big. 
**_Memory Usage_** chrome and Chromium are known for consuming a large amount of RAM and CPU. If your target is low-end devices, then Electron may not be the good framework.
Happy Hacking!!



### References and Resources
* [https://www.intertech.com/Blog/why-major-companies-are-using-electron-to-build-cross-platform-apps/](https://www.intertech.com/Blog/why-major-companies-are-using-electron-to-build-cross-platform-apps/)
* [https://frontendmasters.com/courses/electron-v2/](https://frontendmasters.com/courses/electron-v2/)
* [https://www.cabotsolutions.com/using-electron-for-cross-platform-desktop-application-development-an-introduction.](https://www.cabotsolutions.com/using-electron-for-cross-platform-desktop-application-development-an-introduction)
* [https://github.com/electron/electron/blob/master/docs/tutorial/](https://github.com/electron/electron/blob/master/docs/tutorial/)
