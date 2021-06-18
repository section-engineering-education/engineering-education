---
layout: engineering-education
status: publish
published: true
url: /introduction-to-vitejs/
title: Introduction to ViteJS 2.0
description: This article will provide a detailed introduction on what Vite.js is and how it's superior over other frameworks. It also provides the reader a detailed guide on how to set it up.
author: abdulazeez-saidu
date: 2021-06-18T00:00:00-13:00
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/introduction-to-vitejs/hero.jpg
    alt:  Introduction to ViteJS 2.0 Hero Image
---

Vite.js (a French word for “fast” or “quick”, pronounced /vit/) developed by the creator of Vue.js, Evan You. Vite.js 2.0 is a front-end build tool or framework for designing a rich, elegant and sleek User Interface, it is referred to as the next-generation framework for front-end tooling.
<!--more-->

In this tutorial, we are going to install Vite 2.0 with all the dependencies and explore its advantages over other frameworks.

### Prerequisites
It is assumed that the reader possesses the following:

- Basic understanding of JavaScript or TypeScript

- [Node.js](https://www.nodejs.org) version 12 or later.

- Preferred text editor (Recommended: [VS Code](https://code.visualstudio.com))

### Why Vite.js?
Before we install Vite.js, let's have a look at the following advantages of Vite.js over other frameworks.

- **Instant server-side rendering:** Contrary to other frameworks, Vite starts the server instantly, taking the dependencies that don't often change and rebuild them using esbuild (an extremely fast javascript bundler).

- **CSS Preprocessors:** To be able to use CSS preprocessors in Vite, you have to install its corresponding preprocessor.

- **Mono repo support:** Vite.js provides support for multiple file rendering within the `dist/` folder.

- **Lighting fast HMR:** Regardless of the app size, Vite.js provides a fast Hot Module Replacement by re-bundling only the dependencies.

- **Rich features:** Vite.js offers out-of-the-box support for CSS, JSX, and JavaScript.

- **Optimized building:** Vite.js uses Rollup in build mode with multiple pages and library mode support.

- **Fully typed APIs:** Vite.js offers Typescript typing and server-side rendering for APIs.

- **Faster dependency pre-building:** When talking about other bundlers like webpack, parcel, or Rollup, the rebuilding process occurs on every save, which may cause a delay in bundling.

- **Browser Support:** The default build targets browsers that support both native ESM via script tags and native ESM dynamic import. Legacy browsers can be supported via the official `@vitejs/plugin-legacy` - see the Building for Production section for more details.

Among other advantages of Vite is its experimental support for **React**, **Vanilla**, **Preact**, **Vue**, and **Svelte**.

### Installing Vite.js
In this tutorial, we are going to install Vite using npm and yarn.

### Steps
Open your terminal, navigate into the folder you want to install Vite.js, and run the following commands:

#### Installing using npm
```bash
npm init @vitejs/app
```

Follow the prompts to continue:

After a successful installation, run the following commands:

```bash
cd project-folder-name
```

To install all the dependencies, run:

```bash
npm i
```

To start the development server run:

```bash
npm run dev
```

To run the build server, execute this command:

```bash
npm run build
```

#### Installing using yarn
```bash
yarn create @vitejs/app
```

Follow the prompts to continue:

After a successful installation, run the following commands:

```bash
cd project-folder-name
```

To install all the dependencies, run this command:

```bash
yarn
```

To start the development server, run:

```bash
yarn run dev
```

To start the build server, run:

```bash
yarn run build
```

### Scaffolding Vite.js project
Vite.js also supports template scaffolding for other frameworks like:

- Vue
- React
- Vanilla
- Preact
- lit-element
- Svelte

All you have to do is to specify the project name and the desired template.

**Example:**

To scaffold Vite plus React, just run the following commands:

```bash
npm init @vitejs/app project-name --template react
```

**OR**

```bash
yarn create @vitejs/app project-name --template react
```

#### Adding a CSS Preprocessor
To add CSS preprocessors into your project, run the following commands:

- [SASS](https://sass-lang.com/):

  ```bash
  npm install -D sass
  ```

- [LESS](https://lesscss.org/):

  ```bash
  npm install -D less
  ```
  
- [Stylus](https://stylus-lang.com/):

  ```bash
  npm install -D stylus
  ```

### Project Folder Structure
Now, let's have a look at some files in our project folder:

![project structure](/introduction-to-vitejs/folder-structure.png)

Looking at the project folder we have:

- **node_modules:** This folder contains all the packages that the external modules depend upon.

- **src:** This folder contains the root components such as `app.js` and `main.js` for bootstrapping your app.

- **index.html:** This file serves as the source code and part of the module graph. This file also serves as the entry point of your app.

  ```html
  <!DOCTYPE html>
  <html lang="en">

  <head>
      <meta charset="UTF-8" />
      <link rel="icon" type="image/svg+xml" href="/src/favicon.svg" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Vite App</title>
  </head>

  <body>
      <div id="root"></div>
      <script type="module" src="/src/main.js"></script>
  </body>

  </html>
  ```

- **package.json:** This file contains the scripts, dependencies, etc of the project.

- **vite.config.js:**

  This file contains project configuration files, setting a base URL, plugins, where to output build files, and also contains proxies to a back-end service.

  ```JavaScript
  // vite,config.js
  import { defineConfig } from 'vite'

  // https://vitejs.dev/config/
  export default defineConfig()
  ```

### Conclusion

In this tutorial, we have learned:

- How to install Vite.js on our machine.
- Its advantages over other front-end frameworks.
- How to add CSS preprocessors to the project.
- How to create the folder structure of a Vite.js project.
- How to use Vite.js to template scaffold other front-end frameworks.

Vite is cool, easy to install, and supports scaffolding with other front-end frameworks. It comes in handy when looking for a framework that offers a minified scripts and styles.

Don’t hesitate to read more about [Vite.js](https://www.vitejs.dev).

---
Peer Review Contributions by: [Mohan Raj](/engineering-education/authors/mohan-raj/)
