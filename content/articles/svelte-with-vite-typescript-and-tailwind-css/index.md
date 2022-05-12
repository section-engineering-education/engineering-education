---
layout: engineering-education
status: publish
published: true
url: /svelte-with-vite-typescript-and-tailwind-css/
title: How to Set up Svelte using Vite, TypeScript and Tailwind CSS
description: This article will help readers understand how to set up Svelte using Vite, Tailwind CSS, and TypeScript.
author: joakim-gakure
date: 2022-01-04T00:00:00-02:25
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/svelte-with-vite-typescript-and-tailwind-css/hero.jpg
    alt: Svelte with vite, TypeScript, and Tailwind CSS Hero Image
---
Svelte is a JavaScript front-end framework for building reactive and interactive UI components just like in React, Angular, and Vue. 
<!--more-->
Unlike other frameworks, which provide a JavaScript runtime to the browser to make your code work, Svelte converts the declarative code that you write into imperative code that works with native browser APIs. 

This produces high-performance applications with a small codebase which allows you to incorporate numerous functionalities.

In this tutorial, we will build a portfolio application. This app will help you learn how to use Vite, TypeScript, and Tailwind CSS in a Svelte application.

### Prerequisites
To follow along, you need:
- Basic knowledge of TypeScript, Tailwind CSS, and Svelte.
- [Node.js](https://nodejs.org/en/) installed on your computer.

### Table of contents
- [Prerequisites](#prerequisites)
- [Overview](#overview)
- [Setting up the application with Vite and TypeScript](#setting-up-the-application-with-vite-and-typescript)
- [Setting up Tailwind CSS](#setting-up-tailwind-css)
- [Building a simple portfolio](#building-a-simple-portfolio)
  - [Setting up the navigation bar component](#setting-up-the-navigation-bar-component)
  - [Setting up the Hero component](#setting-up-the-hero-component)
  - [Setting up the services component](#setting-up-the-services-component)
  - [Setting up the Team component](#setting-up-the-team-component)
  - [Setting up the Footer component](#setting-up-the-footer-component)
- [Conclusion](#conclusion)
- [Further reading](#further-reading)

### Setting up the application with Vite and TypeScript
Vite is a JavaScript development server tool that makes front-end development easier. Vite distributes your app source files through native ES modules.

This allows you to quickly start or reload your development server. Vite starts the server right away, and it takes the dependencies that don't change often and pre-bundles them using ES build.

Vite uses route-based code-splitting to figure out what parts need to be loaded. One huge advantage is that it does not have to rebundle files each time.

Since ES build is written in Go, it is faster than JavaScript-based bundlers such as Webpack.

**Some of the key features of Vite include:**

- On-demand compilation - Vite compiles your project source files as the browser requests them. The only code imported and required on the current screen/page is compiled. This makes your web pages load faster. As a result, Vite is suitable for building and serving large projects.

- Hot module replacement - Vite bundler ensures that file changes are reflected in the browser almost immediately.

- Bear module resolving - Vite checks your package imports, rewrites them, and performs module resolution to locate the correct files in your project's dependencies.

- Advanced configuration options - Vite allows one to extend the default configuration of a project. For instance, a developer can extend, use, and run TypeScript.

TypeScript is a superset of JavaScript that supports static typing. This means TypeScript includes all possible valid JavaScript features plus some extra functionalities. 

TypeScript is compiled into regular JavaScript so that the browser can understand it.

**Some of the main features that TypeScript offers are:**

- It supports type checking - This allows you to specify variables and functions types whenever you use them. This makes your code readable and descriptive, especially when building a large-scale project.

- It has static typing - Static typing means that a lot of basic errors can be caught by the compiler. This allows you to correct numerous errors before runtime.

- TypeScript supports classes - This means you can use object-oriented programming principles such as encapsulation, access modifiers, and inheritance.

- It features ES6 syntax.

To set up a Svelte application with Vite and TypeScript support, create a project folder and run the following command inside that folder.

```bash
npm init vite@latest
```

The above command will create an interactive window. Go ahead and:

- Enter your preferred application name as `svelte-app`.
- Select `svelte` as your desired framework.
- Choose `svelte.ts` as the `framework variant` since you are working with TypeScript.

![svelte-app](/engineering-education/svelte-with-vite-typescript-and-tailwind-css/svelte.png)

When the process is complete, navigate to your generated application folder using the following command:

```bash
cd svelte-app
```

Then run the below command to install the default dependencies:

```bash
npm install
```

Your application will build using Vite dependencies:

![vite](/engineering-education/svelte-with-vite-typescript-and-tailwind-css/vite.png)

The above commands will create a simple TypeScript boilerplate application. You can test it by starting the development server using the below command:

```bash
npm run dev
```

On your browser, navigate to the URL that is logged on your console, e.g., `http://localhost:3000`. This will serve you a simple TypeScript Svelte application, as shown below:

![default-landing-page](/engineering-education/svelte-with-vite-typescript-and-tailwind-css/default-landing-page.png)

### Setting up Tailwind CSS
Tailwind is a collection of CSS utility classes that allows you to write less CSS code. 

Tailwind enables you to use these utility classes and create responsive, animated UI components easier and faster. 

One of the significant reasons Tailwind is popular is because it works well with component-based JavaScript frameworks such as  Svelte, Vue, React, and Angular.

To set up Tailwind for Svelte, open a new tab on your terminal and run the following command to install `TailwindCSS` and its peer dependencies:

```bash
npm install -D tailwindcss@latest postcss@latest autoprefixer@latest
```

Tailwind requires the creation of two configuration files, `tailwind.config.js` and `postcss.config.js`. Run the following command to generate these files:

```bash
npx tailwindcss init -p
```

We are using `Vite 2`, which relies on `ES modules`. Therefore, we will have to edit our configuration files to execute Tailwind with Vite. 

Navigate to the `tailwind.config.js` file and edit it as follows:

```ts
export default {
  plugins: [],
    theme: {
    extend: {},
  },
  purge: ["./index.html",'./src/**/*.{svelte,js,ts}'], // for unused CSS
  variants: {
    extend: {},
  },
  darkMode: false, // or 'media' or 'class'
}
```

We have also included `index.html`, `svelte`, `js`, and `ts` files on a purge to remove any unused CSS from files with such extensions.

Also, update the `postcss.config.js` as follows:

```ts
import tailwind from 'tailwindcss'
import tailwindConfig from './tailwind.config.js'
import autoprefixer from 'autoprefixer'

export default {
  plugins:[tailwind(tailwindConfig),autoprefixer]
}
```

Apply the `postcss` from `postcss.config.js` to the `vite.config.js` file to define the Tailwind CSS configuration:

```ts
import postcss from './postcss.config.js';
import { svelte } from '@sveltejs/vite-plugin-svelte'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte()],
  css:{
    postcss
  }
})
```

Inside your project's `src` directory, create a `TailwindCSS.svelte` file. To incorporate Tailwind's `base`, `components`, and `utilities`, add the `@tailwind` tag to this code, as shown below:

```js
<style global>
@tailwind utilities;
@tailwind components;
@tailwind base;
</style>
```

This style will be applied globally in the application since we have used the `global` keyword.

Import the `TailwindCSS.svelte` file into the `App.svelte` file inside the `script` tag.

```js
import TailwindCss from './TailwindCSS.svelte';
```

After the script tag, call the `TailwindCSS` component to apply the overall style setup.

```js
<TailwindCss />
```

### Building a simple portfolio
Having configured TailwindCSS, let's create a simple portfolio page that demonstrates how to use the whole setup. 

Start by creating the following components inside the `src/lib` folder:

- `Nav.svelte`: This module will be used to construct a navigation bar.
- `Hero.svelte`: This will be used to create a Hero section component.
- `Services.svelte`: This will be used to create the Services section component.
- `Team.svelte`: This will be used to create the Team section component.
- `Footer.svelte`: This will be used to create a Footer section.

#### Setting up the navigation bar component
Add the following code to `Nav.svelte`:

```ts
<script>
  import * as animateScroll from "svelte-scrollto";
</script>

<header class="text-gray-600 body-font">
  <div class="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
    <a class="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0" href="/" 
    on:click={
      () => {
        window.scrollTo({
          top:0,
          left:0,
          behavior:"smooth"
        })
      }
    }
    >       
      <h2 class="ml-3 text-xl">ABC</h2>
    </a>
    <nav class="md:mx-auto flex flex-wrap items-center justify-center">
      <a class="mr-5"
      name="navigation"
      on:click={
        () => 
          animateScroll.scrollTo({
            element:"#home",
            offset:50
          })
        
      }>Home</a>
      <a class="mr-5"  
      name="navigation"
      on:click={
        () => 
          animateScroll.scrollTo({
            element:"#services",
            offset:50
          })
        
      }>Our Services</a>
      <a class="mr-5"
      name="navigation"
      on:click={
        () => 
          animateScroll.scrollTo({
            element:"#team",
            offset:50
          })
        
      }>Our team</a>
    </nav>
  </div>
</header>
```

The above code will render the navigation links with an `on-click` function that scrolls you to a specified section. 

We need to import `animateScroll` from `svelte-scrollto` package. This package will allow users to browse and scroll through various sections of our page. 

Run the below command from your terminal to install `svelte-scrollto` package:

```bash
npm i svelte-scrollto
```

#### Setting up the Hero component
Add the following to the `Hero.svelte` component:

```js
<script>
  import * as animateScroll from "svelte-scrollto";
</script>

<section id="home" class="text-gray-600 body-font">
  <div class="container mx-auto flex items-start justify-between">
    <div class="py-20">
      <h1 class="title-font text-gray-900 mb-10 title-font font-medium">
        Trusted by over one thousand clients
      </h1>
      <p class="mb-8 leading-relaxed">We offer the best web service to our clients. </p>
      <div class="flex items-center">
        <button
        class="bg-blue-600 px-6 py-2 text-white rounded-full hover:bg-blue-500 focus:outline-none focus:shadow-outline"
        on:click={
          () => animateScroll.scrollTo({
            element:"#services",
            offset:50
          })
        }
        >Our services</button>
      </div>
      </div>
    <div class="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
      <img class="object-cover object-center rounded" alt="hero" src="https://images.unsplash.com/photo-1633114127451-558041183c3b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80">
    </div>
  </div>
</section>
```

The above code displays dummy content, including a button that scrolls to the services section.

#### Setting up the services component
Add the following to the `services.svelte` component:

```ts
<section id="services">
  <div class="container mx-auto">
    <div class="py-20">
      <h1 class="title-font text-center text-gray-900 mb-10 title-font font-medium">
        Our services
      </h1>
      <p class="mb-8 leading-relaxed text-center">We offer the following services to our clients. </p>
      <div class="flex flex-wrap lg:w-4/5 sm:mx-auto">
          <div class="p-2 md:w-1/2 w-full">
              <div class="bg-blue-600 rounded p-4 text-center text-white">
                  <p>Website design</p>
              </div>
          </div>
          <div class="p-2 md:w-1/2 w-full">
              <div class="bg-blue-600 rounded p-4 text-center text-white">
                  <p>Website development</p>
              </div>
          </div>
          <div class="p-2 md:w-1/2 w-full">
              <div class="bg-blue-600 rounded p-4 text-center text-white">
                  <p>Mobile application design</p>
              </div>
          </div>
          <div class="p-2 md:w-1/2 w-full">
              <div class="bg-blue-600 rounded p-4 text-center text-white">
                  <p>Mobile application development</p>
              </div>
          </div>
      </div>
      </div>
  </div>
</section>
```

The above code creates a dummy `services` section.

#### Set up the Team component
Add the following code to the `Team.svelte` component:

```ts
<section id="teams">
    <div class="container mx-auto">
      <div class="py-20">
        <h1 class="title-font text-center text-gray-900 mb-10 title-font font-medium">
          Our team
        </h1>
        <p class="mb-8 leading-relaxed text-center"> Our pool of talented employees </p>
        <div class="flex flex-wrap lg:w-4/5 sm:mx-auto">
            <div class="p-2 md:w-1/2 w-full">
                <div class="bg-gray-400 rounded p-4 text-center ">
                    <p>John Doe</p>
                    <p>C.E.O/Co-founder</p>
                </div>
            </div>
            <div class="p-2 md:w-1/2 w-full">
                <div class="bg-gray-400 rounded p-4 text-center">
                    <p>Jane Doe</p>
                    <p>Co-founder/ Product management</p>
                </div>
            </div>
            <div class="p-2 md:w-1/2 w-full">
                <div class="bg-gray-400 rounded p-4 text-center">
                    <p>Alex Doe</p>
                    <p>Wed developer</p>
                </div>
            </div>
            <div class="p-2 md:w-1/2 w-full">
                <div class="bg-gray-400 rounded p-4 text-center">
                    <p>Alice Doe</p>
                    <p>Mobile application developer</p>
                </div>
            </div>
        </div>
        </div>
    </div>
</section>
```

The above code generates a dummy `team members` section.

#### Setting up the Footer component
Add the following code to the `Footer.svelte` component:

```js
<footer class="text-gray-600 body-font">
    <div class="container mx-auto text-center">
      <a href="/">
        <span class="ml-3 text-xl text-gray-900">ABC Company</span>
      </a>
      <p class="text-sm text-gray-500">© 2021 </p>
    </div>
</footer>
```

The above code creates and renders a simple footer section.

Import the components in the `src/App.svelte` under the `script` section.

```js
import Nav from './lib/Nav.svelte';
import Hero from './lib/Hero.svelte';
import Team from './lib/Team.svelte';
import Services from './lib/Services.svelte';
import Footer from './lib/Footer.svelte';
```

Next, call the components inside the `main` section of the app, as shown below:

```js
<script lang="ts">
  import TailwindCss from './TailwindCSS.svelte';
</script>

<TailwindCss />
<main class="max-w mx-auto px-4">
<div class="pt-4 pb-12">
  <Nav />
  <Hero />
  <Services />
  <Team />
  <Footer />
  </div>
</main>
```

To view this portfolio, launch your Svelte development server using the `npm run dev` command and then navigate to `http://localhost:3000` in your browser.

![new-landing-page](/engineering-education/svelte-with-vite-typescript-and-tailwind-css/new-landing-page.png)

![our-services-section](/engineering-education/svelte-with-vite-typescript-and-tailwind-css/our-services-section.png)

![our-team-section](/engineering-education/svelte-with-vite-typescript-and-tailwind-css/our-team-section.png)

### Conclusion
In this guide, we have learned how to set up a TypeScript-Svelte application. We have also discussed how to write TypeScript code within a Svelte application. 

We configured and used TailwindCSS to create a Svelte portfolio application. For further reference, check this project's code on [GitHub](https://github.com/Joakim-gakure/Svelte-with-Vite-TypeScript-and-Tailwind-CSS).

### Further reading
- [Vite guide](https://vitejs.dev/guide/#overview)
- [Building Vite for production](https://vitejs.dev/guide/build.html#public-base-path)
- [A Friendly Beginner's Guide to TypeScript](/engineering-education/a-friendly-beginner-guide-to-typescript/)
- [Why Static Typing & Why is TypeScript so popular?](/engineering-education/typescript-static-typing/)
- [Introduction to Tailwind CSS](/engineering-education/introduction-to-tailwind-css/)
- [Using Tailwind CSS Grid Classes](/engineering-education/using-tailwind-css-grid-classes/)
- [Making Card Components Using Tailwind CSS](/engineering-education/card-components-using-tailwind-css/)


---
Peer Review Contributions by: [Jethro Magaji](/engineering-education/authors/jethro-magaji/)

