Svelte is a JavaScript front-end framework for building reactive and interactive UI components like React, Angular, and Vue. Unlike its peers would ship a JavaScript runtime to the browser to make your code work, Svelte is a compiler. It converts the declarative code that you write into imperative code that works with native browser APIs. This produces highly performant applications in a very small codebase, allowing you to write complex applications. Svelte also runs with no virtual DOM. This guide will build a portfolio application that shows how to use Vite, TypeScript, and Tailwind CSS in a Svelte application.

### Prerequisites
- Basic knowledge working with TypeScript, Tailwind CSS and Svelte.
- Have [Node.js](https://nodejs.org/en/) installed on your computer.

### Overview
- [Prerequisites](#prerequisites)
- [Overview](#overview)
- [Setting up the application with Vite and TypeScript](#setting-up-the-application-with-vite-and-typescript)
- [Setting up Tailwind CSS](#setting-up-tailwind-css)
- [Building a simple portfolio](#building-a-simple-portfolio)
  - [Set up the navigation bar component](#set-up-the-navigation-bar-component)
  - [Set up the Hero component](#set-up-the-hero-component)
  - [Set up the services component](#set-up-the-services-component)
  - [Set up the Team component](#set-up-the-team-component)
  - [Set up the Footer component](#set-up-the-footer-component)
- [Conclusion](#conclusion)

### Setting up the application with Vite and TypeScript
Create a project folder and run the following command inside that folder.

```bash
npm init vite@latest
```

The above command will create an interactive window. Go ahead and;

- Enter your preferred application name.
- Select `svelte` as the framework you want to use.
- Select `svelte.ts` since we are working with TypeScript.

![svelte-app](/engineering-education/svelte-with-vite-typescript-and-tailwind-css/svelte.png)

When the process is complete, navigate to your created application folder and run the following command to install the default dependencies;

```bash
npm install
```

Your application will build using the vite dependencies.

![vite](/engineering-education/svelte-with-vite-typescript-and-tailwind-css/vite.png)

This we create a simple TypeScript boilerplate application. You can test it by starting the development server using the following command;

```bash
npm run dev
```

On your browser, navigate to the URL that is logged on your console, e.g., `http://localhost:3000`. This will save you a simple TypeScript Svelte application, as shown below.

![default-landing-page](/engineering-education/svelte-with-vite-typescript-and-tailwind-css/default-landing-page.PNG)

### Setting up Tailwind CSS
Open a new tab on your terminal and run the following command to install Tailwind and its peer dependencies.

```bash
npm install -D tailwindcss@latest postcss@latest autoprefixer@latest
```

Tailwind requires the creation of two configuration files, `tailwind.config.js` and `postcss.config.js`, in order to function. Run the following command to implement this.

```bash
npx tailwindcss init -p
```

We are using Vite 2, which relies on ES modules. Therefore, we will have to edit our configuration files to execute Tailwind with Vite. Navigate to the `tailwind.config.js` file and edit it as follows.

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

We have also included the `index.html`, and `svelte,js,ts` files on a purge to remove any unused CSS from files with such extensions.

Also, update the `postcss.config.js` as follows.

```ts
import tailwind from 'tailwindcss'
import tailwindConfig from './tailwind.config.js'
import autoprefixer from 'autoprefixer'


export default {
  plugins:[tailwind(tailwindConfig),autoprefixer]
}
```

Apply the `postcss` from `postcss.config.js` to the `vite.config.js` file to define the Tailwind CSS configuration.

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

Inside your project's `src` directory, create a `TailwindCSS.svelte` file. To incorporate Tailwind's `base`, `components`, and `utilities`, add the `@tailwind` tag to this code, as shown below.

```js
<style global>
@tailwind utilities;
@tailwind components;
@tailwind base;
</style>
```

This style will be applied globally in the application since we have used the `global` keyword.

Import the `TailwindCSS.svelte` file into the `App.svelte` file inside the script tag.

```js
import TailwindCss from './TailwindCSS.svelte';
```

After the script tag, call the `TailwindCSS` component to apply the overall style setup.

```js
<TailwindCss />
```

### Building a simple portfolio
Having configured Tailwind, we will create a simple portfolio page that demonstrates how to use the whole setup. Start by creating the following components inside the `src/lib` folder:

- `Nav.svelte`: This module will be used to construct a navigation bar.
- `Hero.svelte`: Will be used to create a Hero section component.
- `Services.svelte`: Will be used to create the Services section component.
- `Team.svelte`: Will be used to create the Team section component.
- `Footer.svelte`: Will be used to create a footer component.

#### Set up the navigation bar component
Add the following to `Nav.svelte`.

```js
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
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full" viewBox="0 0 24 24">
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
        </svg>
        <span class="ml-3 text-xl">ABC</span>
      </a>
      <nav class="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
        <a class="mr-5 cursor:pointer transition duration-500 ease-in-out hover:text-anaranjado transform hover:-translate-y-1 hover:scale-110"
        name="navigation"
        on:click={
          () => 
            animateScroll.scrollTo({
              element:"#home",
              offset:50
            })
          
        }>Home</a>
        <a class="mr-5 cursor:pointer transition duration-500 ease-in-out hover:text-anaranjado transform hover:-translate-y-1 hover:scale-110"  
        name="navigation"
        on:click={
          () => 
            animateScroll.scrollTo({
              element:"#services",
              offset:50
            })
          
        }>Our Services</a>
        <a class="mr-5 cursor:pointer transition duration-500 ease-in-out hover:text-anaranjado transform hover:-translate-y-1 hover:scale-110"
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

From above, we are;

- Importing `animateScroll` from `svelte-scrollto` package, which we do not have installed. Run the command below from your terminal to install the package:

```bash
npm i svelte-scrollto
```

We shall be able to browse and scroll through the various areas of our page with the help of this package.

- Rendering the navigation links, each with an on-click function that scrolls you to a specified section.

#### Set up the Hero component
Add the following to the `Hero.svelte` component.

```js
<script>
  import * as animateScroll from "svelte-scrollto";
</script>

<section id="home" class="text-gray-600 body-font">
  <div class="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
    <div class="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
      <h1 class="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
        Trusted by over one thousand clients
      </h1>
      <p class="mb-8 leading-relaxed">We offer the best web service to our clients. </p>
      <div class="flex justify-center">
        <button class="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg"
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

From above, we are simply showing dummy content, including a button that scrolls to the services section.

#### Set up the services component
Add the following to the `services.svelte` component.

```js
<p>Our services section</p>

```

From above, we are simply rendering dummy services.

#### Set up the Team component
Add the following to the `Team.svelte` component.

```ts
<p>Our team section</p>
```

From above, we are rendering dummy team members.

#### Set up the Footer component
Add the following to the `Footer.svelte` component.

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

From above, we are rendering a simple footer section.

Import the components in the `src/App.svelte` under the `script` section.

```js
import Nav from './lib/Nav.svelte';
import Hero from './lib/Hero.svelte';
import Team from './lib/Team.svelte';
import Services from './lib/Services.svelte';
import Footer from './lib/Footer.svelte';
```

Call the components inside the `main` section of the app.

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

Run your development server using `npm rum dev` and open `http://localhost:3000` on your browser to view this portfolio.

![new-landing-page](/engineering-education/svelte-with-vite-typescript-and-tailwind-css/new-landing-page.png)

### Conclusion
We used TypeScript with TailwindCSS to construct a Svelte application in this post. Refer to the following links for further information about the tools and resources used.

- [Vite guide](https://vitejs.dev/guide/#overview)
- [Building for production](https://vitejs.dev/guide/build.html#public-base-path)