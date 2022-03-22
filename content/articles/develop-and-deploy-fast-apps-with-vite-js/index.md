---
layout: engineering-education
status: publish
published: true
url: /what-is-dataops-and-why-data-engineers-need-it/
title: What is DataOps and Why Data Engineers Need it
description: This article will dig deeper into DataOps what it is and why data engineers need it.
author: esther-waithera
date: 2022-02-20T00:00:00-12:40
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/what-is-dataops-and-why-data-engineers-need-it/hero.jpg
    alt: What is DataOps and why Data Engineers need it example image
---
Vite is a JavaScript development tool that greatly enhances front-end development. It was created to simplify, build, and speed up the development process. 

With the help of commands, Vite allows you to launch a development environment for frameworks such as Vue, React, and even vanilla.js applications.

Vite JS is the next-generation front-end tool. It has instant server-start, lighting fast Hot Module Replacement (HMR), Rich features, optimized build, server-side rendering, and more. 

This guide will teach you what Vite is, how it works, and its features to help you understand why you need it. we will look at how easy it is getting Vite up and running. 

We will also discover how quick Vite is, how to get started with it using React, Vue, vanilla.js etc. and how much it gets in the way while you're working with it.

### Table of contents
- [What is Vite JS](#what-is-vite-js).
- [How Vite works](#how-vite-works).
- [Features of Vite](#features-of-vite).
- [Develop and deploy fast applications with Vite](#develop-and-deploy-fast-applications-with-vite).

### Prerequisites
To follow along with this tutorial, you will need to have:
- Knowledge of JavaScript and its frameworks.
- Node.JS installed on your computer.
- NPM installed on your computer.
- Visual Studio Code IDE.

### What is Vite JS
Vite is a JavaScript development server and bundler that delivers source files over `ECMAScript 6` module (ESM). This makes it fast in things like starting and reloading. [Evan You](https://www.linkedin.com/in/evanyou/), the inventor of Vue.js, created it. 

Vite comes in when old tools like Webpack and Rollup have started to feel slower. The problem that Vite is trying to solve is the feedback loop speed as it is super fast.

Vite aims to provide modern web projects with speedy apps and a seamless developer experience. This is done in two ways:
- During development, code is not bundled like when using Webpack - Instead, it supports ECMAScript 6 module (ESM). ESM support allows browsers to fetch modules when importing them. Vite uses ESM to eliminate the build step while in development fully. This is because it is supported by all recent browsers such as Chrome, Edge and Firefox to ensure ESM support.
- Code and libraries that need to be imported have to be compiled - Vite achieves this with the help of `esbuild`, a fast Go-based tool. ESbuild pre-bundles dependencies are faster than JavaScript bundles (WebPack).
- Vite uses Rollup to bundle your project during production - The development process is much smoother since this compilation phase isn't necessary until the code is ready for production or testing.

### How Vite works
Vite immediately launches the server. It uses esbuild to pre-bundle the dependencies that don't change frequently. Vite analyzes the code elements ought to be processed via route-based code splitting. Everything does not have to be bundled.

Vite then delivers the code using native ESM support in modern browsers. This lets the browser take the job of bundling and development. But for production, Vite uses Rollup to bundle and implement other performance optimizations.

### Features of Vite
Vite has features that help you know why you should use it and why you need it:
- Vite is compatible with ECMAScript modules.
- [Vite offers Hot Module Replacement (HMR)](https://vitejs.dev/guide/api-hmr.html#hot-accept-cb).
- Legacy mode plugin enables support for browsers that don't support native ESM.
- Vite has faster dependency pre-building - It uses esbuild instead of Rollup for dependency pre-building, and es-build is faster.
- It has typescript support.
- It has CSS pre-processor support.
- Vite has automatic CSS code-splitting - It makes your site much faster as it only loads the CSS code needed for the specific part of the application.

### Develop and deploy fast applications with Vite
So let's learn by doing. Let us develop and deploy a Vanilla.js Vite application.

#### Vite Installation
To get started with Vite, we will need Node.js and npm installed on your computer. Open the terminal in your VS Code and run the command below:

`$ npm init vite@latest`

![Project name](/engineering-education/develop-and-deploy-fast-apps-with-vite-js/project-name.jpg)

Afterwards, enter the project name and continue. We will then choose the JavaScript framework to use. We will use vanilla.js in this article. You'll see it has scaffold in your project. Then you can follow the instructions that you see.

The instructions include:

![Vanilla.js](/engineering-education/develop-and-deploy-fast-apps-with-vite-js/vanilla-js.jpg)

We will cd into our project and run the npm install. This means changing the directory of our project and installing all the dependencies.

![Instructions](/engineering-education/develop-and-deploy-fast-apps-with-vite-js/instructions.jpg)

Before running the `vite-project`, this is its structure after installing dependencies. We have a front-end structure with some `node modules` for our dependencies. We have a default `index.html` file. The CSS file gets imported at the `main.js` file.

![Installed dependencies](/engineering-education/develop-and-deploy-fast-apps-with-vite-js/installed-dependencies.jpg)

The project structure is pretty simple. Let us look at what the `package.json` file contains. It has three scripts that we're going to use:
- dev script - start our local folder.
- build script - bundle our project for production.
- preview script - look at our local build in our local environment.

![Package.json](/engineering-education/develop-and-deploy-fast-apps-with-vite-js/package-json.jpg)

Since we have installed the dependencies, let's run `npm run dev`. Then, open the project at [localhost 3000](http://localhost:3000/). Click the link, and it will open on your browser.

Congratulations! You now have Vanilla.js and Vite running on your local server. You will notice the `hmr update` running when you edit files and changes appear instantly on the browser.

![Launch the project on the browser](/engineering-education/develop-and-deploy-fast-apps-with-vite-js/npm-run.jpg)

![Vite project](/engineering-education/develop-and-deploy-fast-apps-with-vite-js/vite-project.jpg)

To begin building or developing the project, run `npm run build`. The project is compiled into a `dist` folder containing the JavaScript and CSS files when that command is executed. Both files appear to be hashed.

![Dist](/engineering-education/develop-and-deploy-fast-apps-with-vite-js/dist.jpg)

We execute the command `npm run preview` to preview the project. It will serve as a preview on [localhost 4173](http://localhost:4173/). So, 3000 is your build server, and 4173 is the preview for our build.

![Preview](/engineering-education/develop-and-deploy-fast-apps-with-vite-js/preview.jpg)

#### Build a JavaScrip app to learn more about Vite.
Let us create a simple JavaScript application to learn more about Vite. We will create a file in our project's folder called `index.md`. The markdown file will have some data for us to load.

File `index.md`:

![Markdown file](/engineering-education/develop-and-deploy-fast-apps-with-vite-js/markdown-cop.jpg)

One of the awesome features of Vite is that you can easily import data into your JavaScript. We will need to install markdownIt `npm install markdown-it`. This will let us process text into markdown directly in my application.

![MarkdownIt](/engineering-education/develop-and-deploy-fast-apps-with-vite-js/markdown-it.jpg)

Now we can import the library into our `main.js` file. You can not only import modules but data as well.
`import markdown-it from 'markdown-it'`
`import copy from './index.md?raw'`, the added a question mark with the value of raw helps to import it as text. Then this code will render our data in the app `markdownIt().render(copy)`. This is our `main.js` file:

```js
import './style.css'
import markdownIt from 'markdown-it'
import copy from './index.md?raw'// added a question mark with the value of raw to import it as text

document.querySelector('#app').innerHTML =
 markdownIt().render(copy)// This code render our data from the markdown to the app
```

Here is the output that shows that the app rendered data from the markdown file.

![Project output](/engineering-education/develop-and-deploy-fast-apps-with-vite-js/output.jpg.jpg)

Vite uses HMR to import other JavaScript modules. Modules are updated individually without reloading other modules to speed up development.

### Conclusion
Vite is a very fast tool that is easy to set up. Hopefully, you loved working with it as I did. we have learned how to use Vite to create and deploy apps quick. 

This guide has gone through Vite, which is a fast build tool. It has also highlighted how it works and its features.

You can apply the knowledge and skills you've gained from this tutorial to create fast applications with Vite.

Happy coding!

---
Peer Review Contributions by: [Dawe Daniel](/engineering-education/authors/dawe-daniel/)