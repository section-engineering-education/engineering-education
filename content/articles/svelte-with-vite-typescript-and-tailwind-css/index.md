Svelte is a JavaScript front-end framework for building reactive and interactive UI components like React, Angular, and Vue. Unlike its peers would ship a JavaScript runtime to the browser to make your code work, Svelte is a compiler. It converts the declarative code that you write into imperative code that works with native browser APIs. This produces highly performant applications in a very small codebase, allowing you to write complex applications. Svelte also runs with no virtual DOM. This guide will build a portfolio application that shows how to use Vite, TypeScript, and Tailwind CSS in a Svelte application.

### Prerequisites
- Have [Node.js](https://nodejs.org/en/) installed on your computer.
- Basic knowledge working with TypeScript, Tailwind CSS and Svelte.

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

For Tailwind to work, you need to generate its configuration files, `tailwind.config.js` and `postcss.config.js`. To do this, run the following command.

```bash
npx tailwindcss init -p
```

We are using Vite 2, which relies on ES modules. Therefore, we will have to edit our configuration files to execute Tailwind with Vite. Navigate to the `tailwind.config.js` file and edit it as follows.

```ts
export default {
  purge: ["./index.html",'./src/**/*.{svelte,js,ts}'], // for unused CSS
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
```

We have also included the `index.html`, and `svelte,js,ts` files on a purge to remove any unused CSS from files with such extensions.

Also, update the `postcss.config.js` as follows.

```ts
import tailwind from 'tailwindcss'
import autoprefixer from 'autoprefixer'
import tailwindConfig from './tailwind.config.js'

export default {
  plugins:[tailwind(tailwindConfig),autoprefixer]
}
```

Apply the `postcss` from `postcss.config.js` to the `vite.config.js` file to define the Tailwind CSS configuration.

```ts
import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import postcss from './postcss.config.js';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte()],
  css:{
    postcss
  }
})
```

Inside your project's `src` directory, create a `TailwindCSS.svelte` file. In this file, add the `@tailwind` directive to include Tailwind's `base`, `components`, and `utilities` as follows.

```js
<style global>
    @tailwind base;
    @tailwind components;
    @tailwind utilities;
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

- `Nav.svelte`: Will be used to creating a navigation bar component.
- `Hero.svelte`: Will be used to creating a Hero section component.
- `Services.svelte`: Will be used to create the Services section component.
- `Team.svelte`: Will be used to create the Team section component.
- `Footer.svelte`: Will be used to creating a footer component.

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
        <span class="ml-3 text-xl">ABC company</span>
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
        <a class="mr-5 cursor:pointer transition duration-500 ease-in-out hover:text-anaranjado transform hover:-translate-y-1 hover:scale-110"
        name="navigation"
        on:click={
          () => 
            animateScroll.scrollTo({
              element:"#contact-us",
              offset:50
            })
      }>Contact us</a>
    </nav>
  </div>
</header>
```

From above, we are;

- Importing `animateScroll` from `svelte-scrollto` package, which we do not have installed. To install the package, run the following command from your terminal:

```bash
npm i svelte-scrollto
```

The package will enable us to scroll to the different sections of our page.

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
      <h1 class="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">ABC company
        <br class="hidden lg:inline-block">Trusted by over one thousand eateries
      </h1>
      <p class="mb-8 leading-relaxed">We offer best delivery services to our clients. Stay at home, let us deliver to you. </p>
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
<section id="services" class="text-gray-600 body-font">
    <div class="container px-5 py-24 mx-auto">
      <div class="flex flex-wrap w-full mb-20 flex-col items-center text-center">
        <h1 class="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900">Our services</h1>
      </div>
      <div class="flex flex-wrap -m-4">
        <div class="xl:w-1/3 md:w-1/2 p-4">
          <div class="border border-gray-200 p-6 rounded-lg">
            <div class="w-10 h-10 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 mb-4">
              <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-6 h-6" viewBox="0 0 24 24">
                <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
              </svg>
            </div>
            <h2 class="text-lg text-gray-900 font-medium title-font mb-2">Shooting Stars</h2>
            <p class="leading-relaxed text-base">Fingerstache flexitarian street art 8-bit waist co, subway tile poke farm.</p>
          </div>
        </div>
        <div class="xl:w-1/3 md:w-1/2 p-4">
          <div class="border border-gray-200 p-6 rounded-lg">
            <div class="w-10 h-10 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 mb-4">
              <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-6 h-6" viewBox="0 0 24 24">
                <circle cx="6" cy="6" r="3"></circle>
                <circle cx="6" cy="18" r="3"></circle>
                <path d="M20 4L8.12 15.88M14.47 14.48L20 20M8.12 8.12L12 12"></path>
              </svg>
            </div>
            <h2 class="text-lg text-gray-900 font-medium title-font mb-2">The Catalyzer</h2>
            <p class="leading-relaxed text-base">Fingerstache flexitarian street art 8-bit waist co, subway tile poke farm.</p>
          </div>
        </div>
        <div class="xl:w-1/3 md:w-1/2 p-4">
          <div class="border border-gray-200 p-6 rounded-lg">
            <div class="w-10 h-10 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 mb-4">
              <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-6 h-6" viewBox="0 0 24 24">
                <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </div>
            <h2 class="text-lg text-gray-900 font-medium title-font mb-2">Neptune</h2>
            <p class="leading-relaxed text-base">Fingerstache flexitarian street art 8-bit waist co, subway tile poke farm.</p>
          </div>
        </div>
        <div class="xl:w-1/3 md:w-1/2 p-4">
          <div class="border border-gray-200 p-6 rounded-lg">
            <div class="w-10 h-10 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 mb-4">
              <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-6 h-6" viewBox="0 0 24 24">
                <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1zM4 22v-7"></path>
              </svg>
            </div>
            <h2 class="text-lg text-gray-900 font-medium title-font mb-2">Melanchole</h2>
            <p class="leading-relaxed text-base">Fingerstache flexitarian street art 8-bit waist co, subway tile poke farm.</p>
          </div>
        </div>
        <div class="xl:w-1/3 md:w-1/2 p-4">
          <div class="border border-gray-200 p-6 rounded-lg">
            <div class="w-10 h-10 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 mb-4">
              <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-6 h-6" viewBox="0 0 24 24">
                <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"></path>
              </svg>
            </div>
            <h2 class="text-lg text-gray-900 font-medium title-font mb-2">Bunker</h2>
            <p class="leading-relaxed text-base">Fingerstache flexitarian street art 8-bit waist co, subway tile poke farm.</p>
          </div>
        </div>
        <div class="xl:w-1/3 md:w-1/2 p-4">
          <div class="border border-gray-200 p-6 rounded-lg">
            <div class="w-10 h-10 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 mb-4">
              <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-6 h-6" viewBox="0 0 24 24">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
              </svg>
            </div>
            <h2 class="text-lg text-gray-900 font-medium title-font mb-2">Ramona Falls</h2>
            <p class="leading-relaxed text-base">Fingerstache flexitarian street art 8-bit waist co, subway tile poke farm.</p>
          </div>
        </div>
      </div>
    </div>
  </section>
```

From above, we are simply rendering dummy services.

#### Set up the Team component
Add the following to the `Team.svelte` component.

```ts
<section class="text-gray-600 body-font" id="team">
      <div class="container px-5 py-24 mx-auto">
        <div class="flex flex-col text-center w-full mb-20">
          <h1 class="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">Our Team</h1>
          <p class="lg:w-2/3 mx-auto leading-relaxed text-base">Meet our very talented team members.</p>
        </div>
        <div class="flex flex-wrap -m-2">
          <div class="p-2 lg:w-1/3 md:w-1/2 w-full">
            <div class="h-full flex items-center border-gray-200 border p-4 rounded-lg">
              <img alt="team" class="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4" src="https://dummyimage.com/80x80">
              <div class="flex-grow">
                <h2 class="text-gray-900 title-font font-medium">Holden Caulfield</h2>
                <p class="text-gray-500">UI Designer</p>
              </div>
            </div>
          </div>
          <div class="p-2 lg:w-1/3 md:w-1/2 w-full">
            <div class="h-full flex items-center border-gray-200 border p-4 rounded-lg">
              <img alt="team" class="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4" src="https://dummyimage.com/84x84">
              <div class="flex-grow">
                <h2 class="text-gray-900 title-font font-medium">Henry Letham</h2>
                <p class="text-gray-500">CTO</p>
              </div>
            </div>
          </div>
          <div class="p-2 lg:w-1/3 md:w-1/2 w-full">
            <div class="h-full flex items-center border-gray-200 border p-4 rounded-lg">
              <img alt="team" class="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4" src="https://dummyimage.com/88x88">
              <div class="flex-grow">
                <h2 class="text-gray-900 title-font font-medium">Oskar Blinde</h2>
                <p class="text-gray-500">Founder</p>
              </div>
            </div>
          </div>
          <div class="p-2 lg:w-1/3 md:w-1/2 w-full">
            <div class="h-full flex items-center border-gray-200 border p-4 rounded-lg">
              <img alt="team" class="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4" src="https://dummyimage.com/90x90">
              <div class="flex-grow">
                <h2 class="text-gray-900 title-font font-medium">John Doe</h2>
                <p class="text-gray-500">DevOps</p>
              </div>
            </div>
          </div>
          <div class="p-2 lg:w-1/3 md:w-1/2 w-full">
            <div class="h-full flex items-center border-gray-200 border p-4 rounded-lg">
              <img alt="team" class="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4" src="https://dummyimage.com/94x94">
              <div class="flex-grow">
                <h2 class="text-gray-900 title-font font-medium">Martin Eden</h2>
                <p class="text-gray-500">Software Engineer</p>
              </div>
            </div>
          </div>
          <div class="p-2 lg:w-1/3 md:w-1/2 w-full">
            <div class="h-full flex items-center border-gray-200 border p-4 rounded-lg">
              <img alt="team" class="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4" src="https://dummyimage.com/98x98">
              <div class="flex-grow">
                <h2 class="text-gray-900 title-font font-medium">Boris Kitua</h2>
                <p class="text-gray-500">UX Researcher</p>
              </div>
            </div>
          </div>
          <div class="p-2 lg:w-1/3 md:w-1/2 w-full">
            <div class="h-full flex items-center border-gray-200 border p-4 rounded-lg">
              <img alt="team" class="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4" src="https://dummyimage.com/100x90">
              <div class="flex-grow">
                <h2 class="text-gray-900 title-font font-medium">Atticus Finch</h2>
                <p class="text-gray-500">QA Engineer</p>
              </div>
            </div>
          </div>
          <div class="p-2 lg:w-1/3 md:w-1/2 w-full">
            <div class="h-full flex items-center border-gray-200 border p-4 rounded-lg">
              <img alt="team" class="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4" src="https://dummyimage.com/104x94">
              <div class="flex-grow">
                <h2 class="text-gray-900 title-font font-medium">Alper Kamu</h2>
                <p class="text-gray-500">System</p>
              </div>
            </div>
          </div>
          <div class="p-2 lg:w-1/3 md:w-1/2 w-full">
            <div class="h-full flex items-center border-gray-200 border p-4 rounded-lg">
              <img alt="team" class="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4" src="https://dummyimage.com/108x98">
              <div class="flex-grow">
                <h2 class="text-gray-900 title-font font-medium">Rodrigo Monchi</h2>
                <p class="text-gray-500">Product Manager</p>
              </div>
            </div>
          </div>
        </div>
      </div>
</section>
```

From above, we are rendering dummy team members.

#### Set up the Footer component
Add the following to the `Footer.svelte` component.

```js
<footer class="text-gray-600 body-font">
    <div class="container px-5 py-8 mx-auto flex items-center sm:flex-row flex-col">
      <a class="flex title-font font-medium items-center md:justify-start justify-center text-gray-900" href="/">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full" viewBox="0 0 24 24">
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
        </svg>
        <span class="ml-3 text-xl">ABC Company</span>
      </a>
      <p class="text-sm text-gray-500 sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-200 sm:py-2 sm:mt-0 mt-4">© 2021 ABC Company —
        <a href="https://twitter.com" class="text-gray-600 ml-1" rel="noopener noreferrer" target="_blank">@twitter_account</a>
      </p>
      <span class="inline-flex sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start">
        <a class="text-gray-500" href="/">
          <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-5 h-5" viewBox="0 0 24 24">
            <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
          </svg>
        </a>
        <a class="ml-3 text-gray-500" href="/">
          <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-5 h-5" viewBox="0 0 24 24">
            <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
          </svg>
        </a>
        <a class="ml-3 text-gray-500" href="/">
          <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-5 h-5" viewBox="0 0 24 24">
            <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
            <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
          </svg>
        </a>
        <a class="ml-3 text-gray-500" href="/">
          <svg fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="0" class="w-5 h-5" viewBox="0 0 24 24">
            <path stroke="none" d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"></path>
            <circle cx="4" cy="4" r="2" stroke="none"></circle>
          </svg>
        </a>
      </span>
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

Your page should have the following sections:

![new-landing-page](/engineering-education/svelte-with-vite-typescript-and-tailwind-css/new-landing-page.PNG)

![our-services-section](/engineering-education/svelte-with-vite-typescript-and-tailwind-css/our-services-section.PNG)

![our-team-section](/engineering-education/svelte-with-vite-typescript-and-tailwind-css/our-team-section.PNG)

![footer-section](/engineering-education/svelte-with-vite-typescript-and-tailwind-css/footer-section.PNG)

### Conclusion
In this article, we have created a Svelte application using TypeScript and TailwindCSS. To gain more insights into the tools used, refer to the following resources.

- [Vite guide](https://vitejs.dev/guide/#overview)
- [Building for production](https://vitejs.dev/guide/build.html#public-base-path)