---
layout: engineering-education
status: publish
published: true
url: /getting-started-with-nuxt-3/
title: Getting started with Nuxt 3
description: This article will look at Nuxt 3 installation process and everything you need to start building with Nuxt 3.
author: wangui-leah
date: 2021-12-24T00:00:00-11:05
topics: [Languages]
excerpt_separator: <!--more-->
images:

 - url: /engineering-education/getting-started-with-nuxt-3/hero.jpg
   alt: Getting started with Nuxt 3 example image
---
[Nuxt 3](https://v3.nuxtjs.org/) is a Hybrid Vue Framework that allows us to use Vue.js and, most importantly, Vue.js 3 to build server-side rendered applications. Nuxt 3 was released on October 12, 2021, and will be used in Vue and Nuxt developer ecosystems. This is an updated version of Nuxt 2 that has been redesigned to improve performance and facilitate builds.
<!--more-->

Nuxt 3 has introduced many features and developer experience improvements described in this article. Using this framework, you will build web applications without worrying about the finer details. The goal of Nuxt is to make web development robust and performant while also providing a fantastic developer experience.

This article will look at Nuxt 3 installation process and everything you need to start building with Nuxt 3. Also, we will go through its features, plugins, and why you need to use them in the next project. Now let's discuss what to expect from Nuxt 3 and the kind of enhancements it has brought.

### Table of contents
- [Nuxt 3](#nuxt-3).
- [Starting a new project](#starting-a-new-project).
- [Nuxt 3 features](#nuxt-3-features).
- [Nuxt 3 plugins](#nuxt-3-plugins).
- [Why you need to use Nuxt 3](#why-you-need-to-use-nuxt-3).

### Prerequisites
To get started, the reader should have:
- A good knowledge of JavaScript concepts.
- [Node.js](https://nodejs.org/en/download/), [Visual Studio Code Editor](https://code.visualstudio.com/download), [Volar extension](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar) installed.

### Nuxt 3
Nuxt 3 is an open-source framework for web development that is both simple and powerful. Nuxt 3 was developed by Sébastien Chopin to emulate the functionality of [Nuxt.js](https://vueschool.io/lessons/what-is-nuxtjs), but with Vue instead of React. Furthermore, it is entirely written in typescript for easy maintenance and built-in typescript support.

We observe that Nuxt 3 is currently unstable, deeming it unfit to be production-ready. Let's take a look at what's available.

![Features comparison](/engineering-education/getting-started-with-nuxt-3/comparison.jpg)

[Image source](https://v3.nuxtjs.org/getting-started/introduction/#comparison)

There are two ways we can use to create a Nuxt 3 application. We can use Nuxt 3 or Nuxt Bridge. Nuxt Bridge allows us to upgrade the existing Nuxt 2 application while waiting for Nuxt 3 to be ready for production. We know the distinctions between Nuxt 2, Nuxt Bridge, and Nuxt 3. It provides us with some fascinating features. We observe that Nuxt 3 is currently unstable, so obviously, we will use it when it's production-ready.

If you want to use Nuxt Bridge, it's semi-stable, so it's better. The performance is faster, and a lot more features in Nuxt 3. We will learn about Nuxt 3 features later in this article. Go through this [migration guide](https://v3.nuxtjs.org/getting-started/migration/) to learn how to upgrade from Nuxt 2 to Nuxt 3.

### Starting a new project
Note that Nuxt 3 only supports Node Version 14 or 16.

Open a VS Code terminal and type the following command to create a new project. 
`npx nuxi init nuxt3`
`nuxt3` is our project name.

The next step is to install the dependencies in the generated `package.json` file. First, `cd` into the nuxt3 directory
`cd nuxt3` then install the dependencies with `npm i` or `yarn i`. In our scenario, we'll use:
`npm i`

![Install Nuxt 3](/engineering-education/getting-started-with-nuxt-3/install-nuxt3.jpg)

Once the installation finishes, we can go ahead and start our project. To start a local development server, run this command:

`npm run dev`

![Initialize the project](/engineering-education/getting-started-with-nuxt-3/start-project.jpg)

If all works well, copy and open the [localhost](http://localhost:3000/) link on your browser, and there is our Nuxt 3 project.

![Nuxt 3 Project](/engineering-education/getting-started-with-nuxt-3/nuxt3-project.jpg)

### Nuxt 3 features
There are a couple of things provided by Nuxt 3 that helps to improve developers' productivity. But, first, let's look at a general picture of what to expect from Nuxt 3.

#### General optimizations
Nuxt 3 presents numerous improvements and general optimizations. Nuxt 3 is much lighter compared to Nuxt 2. Thus there is improved performance. Developers can observe exceptional performance during development because of the cold starts and dynamic code-splitting nitro server engine.

Webpack 5, Vite, ESBuild, and PostCSS are now supported with other tool parts upgrades. This means that both development and production are built remarkably quickly.

#### Nitro Engine
Nitro engine is the main feature of Nuxt 3. It is Nuxt 3's new server engine.

The nitro engine gives Nuxt applications a lot of additional capabilities and features. It also boosts Nuxt 3's performance and improvements.

#### Nuxt Bridge
The Nuxt Bridge is a compatibility layer that enables us to upgrade from Nuxt 2 to Nuxt 3. We can access the new Nuxt 3 features on an existing Nuxt 2 application. The new set of features includes:
- Nitro engine.
- Dev tools.
- Nuxt CLI.
- Built-in TypeScript and ES modules Support.
- Vite integration.

Learn more about the [Nuxt Bridge here](https://v3.nuxtjs.org/getting-started/bridge/).

#### Vue 3 and Vite support
Nuxt 3 was created to work with Vue 3. Therefore, we can use features like the Composition API, enhanced module imports, and faster overall app speeds because Nuxt 3 is written in Vue 3.

#### TypeScript
Nuxt 3 is written in TypeScript for easier maintenance and built-in Typescript support.

Nuxt 3 adopts TypeScript and ES Modules (ESM) to enhance the development experience. TypeScript will prevent runtime errors and enhance auto-completion.

However, we must not write the Nuxt 3 application in TypeScript (JavaScript is fine and works as expected). We'll be able to use Nuxt 3 all the same with no problems.

#### New file structure
The `app.vue` file is the primary element of our Nuxt 3 application. The `pages/` directory is optional in Nuxt 3, and we can work with a single page, `app.vue`. Everything we add to `app.vue`, such as JavaScript and CSS, will be shared across all pages. 

#### Cross-platform support
Over the years, JavaScript has come a long way, and there are now several platforms that use it. Nuxt 3 will run smoothly in any JS environment. This includes Node.js, Cloudflare Workers, and Deno.

### Nuxt 3 plugins
Plugins in Nuxt 3 helps to extend your applications' functionalities with the JavaScript library. We can extend the functionality of our Nuxt application in three different ways:
- Making the functions to be available on the client-side and server-side.
- Using your preferred Vue.js plugins in the Nuxt 3 application.
- Using external javascript packages and modules into the Nuxt 3 application.

Learn more about [plugins here](https://v3.nuxtjs.org/docs/directory-structure/plugins/).

### Why should you use Nuxt 3
Here are some of the main reasons Nuxt 3 is a great framework and why you should use it in your next project.

1. Flexibility: Nuxt 3 allows you to display your application in three different ways.
   - Pre-Rendered - In this mode, the entire website is rendered at the build step so that you can send the fully generated HTML file to the server. The app is universal, even if each is a separate file. This means that the first page is from the server, but all other pages in the browser are single-page applications (SPAs).
   - Server Rendered - You can create highly dynamic sites by running a node server in this mode. Each hit is rendered to the server before the browser returns a response. Again, after the initial hit, it's still  SPA.
   - SPA Mode - Only the bare app shell is returned when the first page loads in this mode.

2. Improved performance: Nuxt is very well optimized for web performance. Nuxt has high speed and covers most by default from preload, prefetch, and lazy-loading.

3. Nuxt Bridge: The Nuxt Bridge facilitates the transition from Nuxt 2 to Nuxt 3. This layer lets you upgrade to Nuxt 3 improvements on performance and features. Also, it makes migration to be seamless.

### Conclusion
I hope you are as excited as I am about the features and possibilities that Nuxt 3 provides. We learned that Nuxt 3 has numerous features to improve the project or application's performance. Nuxt 3 is an excellent framework for making the switch.

Although Nuxt 3 is still in beta, it is not advised for production use until it is stable.

To summarize, we learned about:
- Nuxt 3.
- How to install Nuxt and create a new project.
- Nuxt 3 features.
- Nuxt 3 plugins.
- Why you should use Nuxt 3.

### Further reading
- [What’s Coming in Nuxt 3?](https://vueschool.io/articles/news/whats-coming-in-nuxt-3/).
- [Introducing Nuxt 3 Beta](https://v3.nuxtjs.org/getting-started/introduction).

---
Peer Review Contributions by: [Eric Kahuha](/engineering-education/authors/eric-kahuha/)