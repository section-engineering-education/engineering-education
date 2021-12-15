Svelte is a JavaScript front-end framework for building reactive and interactive UI components like React, Angular, and Vue. Svelte is a compiler, unlike its peers, which provides a JavaScript runtime to the browser to make your code work. It converts the declarative code that you write into imperative code that works with native browser APIs. This produces highly performant applications in a very small codebase, allowing you to write complex applications.

This tutorial will build a portfolio application that demonstrates how to utilize Vite, TypeScript, and Tailwind CSS in a Svelte application.

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
- [Additional Resources](#additional-resources)

### Setting up the application with Vite and TypeScript
Vite is a JavaScript development server tooling that makes front-end development more easier. Vite distributes your app source files through native ES modules, allowing you to quickly start or reload your development server. Vite starts the server right away, and it takes the dependencies that don't change often and pre-bundles them using ES build.

It then uses route-based code splitting to figure out what parts of the code need to be loaded. It does this on the fly, and it doesn't have to rebundle everything every time.

This ES build is written in Go, making it faster than JavaScript-based bundlers such as Webpack.

Some of the key features of Vite include;

- On-demand compilation - Vite compiles your project source files as the browser requests them. The only code imported and required on the current screen/page is compiled on-demand, making your page serve fast and on-demand. This makes Vite suitable for building and serving large projects.
- Hot Module Replacement - When you Vite bundler, all our file changes are reflected in the browser almost immediately.
- Bear Module Resolving - When you import from a package, it does not contain the relative path to installed Node.js modules. Vite checks your packages imports, rewrites them, and performs module resolution to locate the correct files in your project's dependencies.
- Advanced configuration options - Vite gives you control to extend the default configuration of your project. It allows you to extend, use, and run TypeScript.

On the other side, TypeScript is a superset of JavaScript that allows static typing of your code. This means TypeScript includes all possible valid JavaScript features plus some extra features, functionalities, and syntax on top of it. TypeScript is compiled down into regular JavaScript so that the browser can understand it.

Some of the main features TypeScript offers are;

- It offers is type checking - This allows you to specify variables and functions types whenever you use them. This makes your code readable and descriptive, especially when building a large-scale project. For example, when you have a lot of different variables and functions that you need to keep track of.
- It has static typing - Static typing means that a lot of basic errors can be caught by the compiler. This allows you to check any possible errors before runtime.
- TypeScript offers classes - This means you can use object-oriented programming principles such as encapsulation, access modifiers, and inheritance.
- It has support for ES6 syntax.

To set up a Svelte application with Vite and TypeScript support, create a project folder and run the following command inside that folder.

```bash
npm init vite@latest
```

The above command will create an interactive window. Go ahead and;

- Enter your preferred application name as `svelte-app`.
- Select `svelte` as the framework you want to use.
- Select `svelte.ts` since you are working with TypeScript.

![svelte-app](/engineering-education/svelte-with-vite-typescript-and-tailwind-css/svelte.png)

When the process is complete, navigate to your created application folder;

```bash
cd svelte-app
```

Then run the following command to install the default dependencies;

```bash
npm install
```

Your application will build using the Vite dependencies.

![vite](/engineering-education/svelte-with-vite-typescript-and-tailwind-css/vite.png)

This will create a simple TypeScript boilerplate application. You can test it by starting the development server using the below command;

```bash
npm run dev
```

On your browser, navigate to the URL that is logged on your console, e.g., `http://localhost:3000`. This will serve you a simple TypeScript Svelte application, as shown below.

![default-landing-page](/engineering-education/svelte-with-vite-typescript-and-tailwind-css/default-landing-page.PNG)

### Setting up Tailwind CSS
Tailwind is a collection of CSS utility classes that allows you to write less CSS code. Tailwind enables you to use these utility classes and create responsive, animated UI components easier and faster. One of the significant reasons Tailwind is popular is because it works well with component-based JavaScript frameworks such as  Svelte, Vue, React, and Angular.

To set up Tailwind for Svelte, open a new tab on your terminal and run the following command to install TailwindCSS and its peer dependencies.

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

We have also included the `index.html`, and `svelte, js, ts` files on a purge to remove any unused CSS from files with such extensions.

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
- `Hero.svelte`: This will be used to create a Hero section component.
- `Services.svelte`: This will be used to create the Services section component.
- `Team.svelte`: This will be used to create the Team section component.
- `Footer.svelte`: This will be used to create a footer section.

#### Set up the navigation bar component
Add the following to `Nav.svelte`.

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

This will render the navigation links with an on-click function that scrolls you to a specified section. Thus we need to import `animateScroll` from `svelte-scrollto` package. With the help of this package, users will be able to browse and scroll through the various sections of our page. This is not installed yet. Run the command below from your terminal to install it;

```bash
npm i svelte-scrollto
```

#### Set up the Hero component
Add the following to the `Hero.svelte` component.

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

This displays dummy content, including a button that scrolls to the services section.

#### Set up the services component
Add the following to the `services.svelte` component.

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

Create a dummy services section from the above component.

#### Set up the Team component
Add the following to the `Team.svelte` component.

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

Create a dummy team members section from the above component.

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

This creates and renders a simple footer section.

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

To view this portfolio, launch your Svelte development server using `npm run dev` and then navigate to `http://localhost:3000` in your browser.

![new-landing-page](/engineering-education/svelte-with-vite-typescript-and-tailwind-css/new-landing-page.png)

![our-services-section](/engineering-education/svelte-with-vite-typescript-and-tailwind-css/our-services-section.png)

![our-team-section](/engineering-education/svelte-with-vite-typescript-and-tailwind-css/our-team-section.png)

### Conclusion
This guide has illustrated how you set up a TypeScript Svelte boilerplate that you can use to write TypeScript code within a Svelte application. We also configured and used TailwindCSS to create a Svelte portfolio application.

### Additional Resources
For further information on the tools and resources used in this guide, check the following articles.

- [Vite guide](https://vitejs.dev/guide/#overview)
- [Building Vite for production](https://vitejs.dev/guide/build.html#public-base-path)
- [A Friendly Beginner's Guide to TypeScript](/engineering-education/a-friendly-beginner-guide-to-typescript/)
- [Why Static Typing & Why is TypeScript so popular?](/engineering-education/typescript-static-typing/)
- [Introduction to Tailwind CSS](/engineering-education/introduction-to-tailwind-css/)
- [Using Tailwind CSS Grid Classes](/engineering-education/using-tailwind-css-grid-classes/)
- [Making Card Components Using Tailwind CSS](/engineering-education/card-components-using-tailwind-css/)