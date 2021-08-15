---
title: Creating a React app using Vite
---

ReactJS is a Javascript library used to create the frontend of a single-page web application ***(SPAs)***. This means it is used to develop User Interfaces 
for web projects, by reducing the complex UI of the application into components, using relatively least possible code as compared to using HTML, CSS, and Javascript.

If you are coming from the SPA development context using ReactJS, you are probably acquainted with the normal way of starting a React application using the **"npx create-react-app ***app-name***"** command. If this is unknown to you, you probably want to visit [this](https://create-react-app.dev/docs/getting-started/) page that clearly lays out the step-by-step guide on how to create one using **"npm"**.


<!--more-->
This article will talk of an alternative way of setting up a React application using Vite. Below, we will appreciate what Vite is, why you should use it, features of Vite, and finally cover the process of creating a React application using Vite. 
Stay tuned!.


### Prerequisites
Care to know the concepts and install tools of what follows next before going further with this article.
1. An overview of ReactJS.
2. Concept of **Hot Module Replacement** in React. [This](https://webpack.js.org/guides/hot-module-replacement/) page talks more about the same.
3. Have nodejs installed. Install from [here](https://nodejs.org/en/download/). Node provides the node package manager **(npm)** used to configure dependencies required to set up the application. Learn ***npm*** from [here](https://docs.npmjs.com/cli/v6/commands/npm).


### Table of contents
1. What Vite is?
2. Why use Vite?
3. Features of Vite
4. Process of creating a react application using Vite.

### What Vite is?
Vite is a build tool that seeks to ensure a relatively faster development experience for developers. 
Evan You, creator of Vue.js, a Javascript frontend framework created Vite also.

Vite as a tool is split majorly into two sections:
- A flash-like speed dev server, that provides swift **Hot Module Replacement**(HMR), owing to the dev server's enhanced rich features as compared to native ES modules. You can see what ES native modules are and how they work in a module setup from [this](https://flaviocopes.com/es-modules/) link. Not so long, we will come to terms with how Vite enhances the HMR feature.
- Vite has a build command that bundles the developer's code with **Rollup**, a Javascript module bundler that does a compilation of simple pieces of code and builds them into rather complex products like a library or an application. You may want to understand Rollup more and how you could set it up. So head [here](https://rollupjs.org/guide/en/).
  Rollup comes pre-configured and therefore produces static applications or what they call static assets that are highly optimized for production.

### Why use Vite?
A developer's productivity will always be enhanced by many factors. Performance and speed of the developed application is one. It is only common to experience slow loading of the dev server as an application grows more complex, thanks to Javascript. Javascript causes the bottleneck in performance from its tools. 
Vite resolves this issue by making use of the Esbuild, which is a dependency pre-bundler that makes the pre-bundling of dependencies quite fast compared to normal Javascript-based bundlers. This results in the loading of the dev server taking even seconds, and the Hot Module Replacement also taking few seconds each time a developer makes edits to the code.

### Features of Vite
Already, we have seen that Vite has several properties as a build tool.
1. Starting the dev server instantly.
2. Very fast Hot Module Replacement feature.
3. It has its build process optimized as a result of the pre-bundling of the dependencies.

Without a doubt, you now understand Vite well enough. We will get down to the process of using it to create a React application now.
Open your command-line interface(CMD) and create a directory where you will be setting up the application and then navigate into it.
Now you are ready to get started.

### Process of creating a react application using Vite.
> Confirm that you have navigated into the folder you would want to create the application in as below.

![Vite Directory](/engineering-education/creating-a-react-app-using-vite/ViteTut.PNG)

I will be using **npm** in this article but in case you prefer to use **yarn** visit the official Vite documentation which you can access from [this](https://vitejs.dev/guide/#scaffolding-your-first-vite-project) link.

Write the following command in your CLI.

```bash
npm init vite
```
Add a project name and a package name you prefer as I have.
![Vite project](/engineering-education/getting-started-with-sessions-in-php/viteproject.PNG)

You will then select a framework and a variant like in the images that follow. Remember we are using react so scroll down to select react for both framework and variant, and hit enter. 
![framework](/engineering-education/creating-a-react-app-using-vite/framework.PNG)
![variant](/engineering-education/creating-a-react-app-using-vite/variant.PNG)

Our project is now created. All you should do now is install then run it.
![install](/engineering-education/creating-a-react-app-using-vite/install.PNG)

Move into the created project while you still are in your command line. In my case, ***ViteTutoral*** and type the command that follows.

```bash
npm install
```
![installing](/engineering-education/creating-a-react-app-using-vite/installing.PNG)
This command installs every required dev dependencies which you can access from the **package.json** file and eventually, it creates a **node_modules** folder
which can be viewed as an external modules' cache that is depended upon by your project.

Your ***package.json*** file will look like this, of course with the project name being what you chose.
![Packages file](/engineering-education/creating-a-react-app-using-vite/package.PNG)

Just one more command and we are done setting up Vite and React. Type the below command and hit enter.

```bash
npm run dev
```
![Running app](/engineering-education/creating-a-react-app-using-vite/run.PNG)

Copy and paste the local server link. And what do you know?! You have React and Vite running on your local server. Congratulations!
![Local app](/engineering-education/creating-a-react-app-using-vite/app.PNG).

If you open your project folder from your editor, you will see different files among which is the **main.jsx** file. Whatever we saw on the browser was the code in **App.jsx** that is rendered from the ***main.jsx*** file.
![files](/engineering-education/creating-a-react-app-using-vite/main.PNG).


We could add fun to our learning by creating a simple Application that outputs our experience using Vite, in few statements.

Edit the ***App.jsx*** file with the code below and save.
```JSX
import React from 'react'
import './App.css'

function App() {
  

  return (
    <div className="App">
        <h1>Working with Vite</h1>
        <p>Hello There! This was such a first fun experience creating a React app using Vite.
          The lightning-fast starting of the dev server is such an amazing experience while using this tool compared to the normal <b>npx create-react-app (app-name) way.</b>
          Now I will run the **"npm run server"** command to experience the instant HMR experience that Vite provides.
        </p>

        <h1>Happy Coding!</h1>
   </div>
  )
}

export default App
```
or like in this image.
![appcode](/engineering-education/creating-a-react-app-using-vite/appcode.PNG).

Now head to your terminal and run **npm run dev** command again and follow the local link provided. 

You did really great! We have created our simple React+Vite app that looks like this:
![finalapp](/engineering-education/creating-a-react-app-using-vite/finalapp.PNG).

Great Job!


### Wrap Up
This article is intended to teach you how to create a React+Vite app using the Vite build tool. I believe the step-by-step guide made the concept more clear.
You can create your own application using the process and see how the fast HMR feature makes development fun.

Good luck!

### References
-[The Vite guide documentation](https://vitejs.dev/guide/)