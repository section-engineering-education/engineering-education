### Introduction

Vite.js (a French word for "fast" or “quick”, pronounced /vit/) developed by the creator of Vue.js, Evan You.

Vite.js 2.0 is a front-end build tool or framework for designing a rich, elegant and sleek User Interface, it is referred to as the next-generation framework for front-end tooling.

In this tutorial, we are going to install Vite 2.0 with all its dependencies and explore its advantages over other frameworks.

### Prerequisites

It is assumed that the reader possesses the following:

- Basic understanding of JavaScript or TypeScript
- [Node.js](www.nodejs.org) version 12 or later
- Preferred text editor( Recommended: [VS Code](code.visualstudio.com) )

### Why Vite.js

Before we install Vite.js, let's have a look at the following advantages of Vite.js over other frameworks;

- **Instant server-side rendering:** Contrary to other frameworks, Vite starts the server instantly, taking the dependencies that don't often change and rebuild them using esbuild (an extremely fast javascript bundler).

- **CSS preprocessor:** Vite.js offers CSS preprocessor support for LESS and SASS.

- **Mono repo support:** Vite.js provides support for multiple file rendering within the dist folder.

- **Lighting fast HMR:** Regardless of the app size, Vite.js provides a fast Hot Module Replacement by re-bundling only the dependencies.

- **Rich features:** Vite.js offers out-of-the-box support for CSS, JSX, and JavaScript.

- **Optimized building:** Vite.js uses Rollup in build mode with multiple pages and library mode support.

- **Fully typed APIs:** Vite.js offers Typescript typing and server-side rendering for APIs.

- **Faster dependency pre-building:** When talking about other bundlers like webpack, parcel, or Rollup, the rebuilding process occurs on every save, which may cause a delay in bundling.

Among other advantages of Vite is its experimental support for **React**, **Vanilla**, **Preact**, **Vue**, and **Svelte**.

### Installing Vite.js

In this tutorial, we are going to install Vite using npm and yarn.

### Steps

Open your terminal, navigate into the folder you want to install Vite.js, if you have one, else create a folder, navigate into the folder and run the following commands:

#### Installing using npm

```javascript
npm init @vitejs/app
```

Follow the prompts to continue:

After a successful installation, run the following commands:

```javascript
cd project-folder-name
```

To install all the dependencies, run:
```javascript
npm i
```

To start the development server run:
```javascript
npm run dev
```

To run the build server, execute this command:
```javascript
npm run build
```

#### Installing using yarn

```javascript
yarn create @vitejs/app
```

Follow the prompts to continue:

After a successful installation, run the following commands:

```javascript
cd project-folder-name
```

To install all the dependencies, run this command
```javascript
yarn i
```

To start the development server, run:
```javascript
yarn run dev
```

To start the build server, run:
```javascript
yarn run build
```

### Scaffolding Vite.js project
- Vite.js also supports template scaffolding for other frameworks like,
- Vue
- React
- Vanilla
- Preact
- lit-element
- Svelte

All you have to do is to specify the project name and the desired template.

#### **Example**

To scaffold Vite plus react, just run the following commands:

```javascript
npm init @vitejs/app project-name --template react
```

**OR**

```javascript
yarn create @vitejs/app project-name --template react
```

### Project Folder Structure
Now, let's have a look at some files in our project folder:
![project structure](/introduction-to-vitejs/folder-structure.png)

Looking at the project folder we have:
- **node_modules:** This folder contains all the caches that the external modules depend upon.

- **src:** This folder contains the root components such as App.js and main.js for bootstrapping your app.

- **index.html:** This file serves as the source code and part of the module graph. This file also serves as the entry point of your app.

```javascript
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

- **package.json:** This file contains the build-in scripts,
```javascript
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "serve": "vite preview"
}
```

- **vite.config.js:** This file contains project configuration files, from setting a base url, plugins, where to output build files and also contains proxies to a back-end service.

```javascript
  // vite,config.js
  import { defineConfig } from 'vite'

  // https://vitejs.dev/config/
  export default defineConfig(
  )
```

### Keywords
- NPM: Node Package Manager
- HMR: Hot Module Replacement
- API: Application Programming Interface
- CSS: Cascading Style Sheets

### Conclution
So far so good, we have seen how to install vitejs on our machine, its advantages, and the structure of its folders.

Vite is cool, easy to install and supports scaffolding with other front-end frameworks, it comes handy when looking for a framework that offers a minified scripts and styles.
Don’t hesitate to read more about [Vite.js](https://www.vitejs.dev).

### Reference
- www.vitejs.dev
- www.dev.to
- www.stackoverflow.com