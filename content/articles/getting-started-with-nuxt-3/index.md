# Getting started with Nuxt 3
[Nuxt 3](https://v3.nuxtjs.org/) is the Hybrid Vue Framework that allows you to create server-side rendered applications using Vue.js and, more importantly, Vue.js 3. Nuxt 3 was launched on October 12 2021, and will be used in Vue and Nuxt developer ecosystems. This is an updated version that has been redesigned to improve performance and facilitate builds.

The release of Nuxt 3 came loaded with alot of features and development experience enhancements mentioned in this article. Therefore using this framework will allow you to build web applications without worrying about the finer details. The goal of Nuxt is to make web development robust and performant while also providing a fantastic developer experience.

This article will look at Nuxt 3 installation process and everything you need to start building with Nuxt, go through its features, plugins, and why you need to use it in the next project. Now let's talk about what to expect from Nuxt and the kind of improvements it has brought.

### Table of contents
+ [Nuxt 3](#nuxt-3)
+ [Starting a new project](#starting-a-new-project)
+ [Nuxt 3 features](#nuxt-3-features)
+ [Nuxt 3 plugins](#nuxt-3-plugins)
+ [Why you need to use Nuxt 3](#why-you-need-to-use-nuxt-3)

### Prerequisites
To get started, knowledge of JavaScript concepts will be of much help. Also, make sure these tools are installed on your computer:
+ [Node.js](https://nodejs.org/en/download/)
+ [Visual Studio Code Editor](https://code.visualstudio.com/download)
+ [Volar extension](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar)

### Nuxt 3
Nuxt 3 is an open-source framework for web development that is both simple and powerful. Nuxt 3 was developed by Sébastien Chopin to emulate the functionality of [Nuxt.js](https://vueschool.io/lessons/what-is-nuxtjs) but with Vue instead of React. It is entirely written in typescript for easy maintenance and built-in typescript support.

Nuxt 3 is currently in beta. It is not yet production-ready. Let's take a look at what's available.

![Features comparison](/engineering-education/getting-started-with-nuxt-3/comparison.jpg)

There are two ways you can use to create your Nuxt 3 application. You can use Nuxt 3 or bridge. The bridge is a way to take your existing Nuxt 2 application and upgrade it in the meantime until Nuxt 3 is production-ready. It gives you some cool features as you know the differences between Nuxt 2, Nuxt bridge, and Nuxt 3. You can see that Nuxt 3 is currently unstable, so obviously, you will use it when it's production-ready.

If you want to use Nuxt Bridge, it's semi-stable, so it's better. You can see the performance is faster and a lot more features that are in Nuxt 3. You will learn about Nuxt 3 features later in this article. Go through this [migration guide](https://v3.nuxtjs.org/getting-started/migration/) to learn how to upgrade from Nuxt 2 to Nuxt 3.

### Starting a new project
Note that, Nuxt 3 only supports Node Version 14 or 16.

To create a new project, open a VS Code terminal and type the following command. 
`npx nuxi init nuxt3`
`nuxt3` is our project name.

The next step is to install the dependencies contained in the generated `package.json` file. First, `cd` into the nuxt3 directory
`cd nuxt3` then install the dependencies with `npm i` or `yarn i`. In our scenario, we'll use:
`npm i`

![Install Nuxt 3](/engineering-education/getting-started-with-nuxt-3/install-nuxt3.jpg)

Once it finishes installing, we can go ahead and start our project. To start a local development server, run this command:
`npm run dev`

![Initialize the project](/engineering-education/getting-started-with-nuxt-3/start-project.jpg)

If all works well, copy and open the [localhost] (http://localhost:3000/) link on your browser, and there is our Nuxt 3 project.

![Nuxt 3 Project](/engineering-education/getting-started-with-nuxt-3/nuxt3-project.jpg)

### Nuxt 3 features
There are a couple of things provided by Nuxt 3 that helps to improve the developer's productivity. Let's have a look at and a general picture of what to expect from Nuxt.

#### General optimizations
Nuxt 3 brings alot of improvements and general optimizations. Nuxt 3 is much lighter compared to Nuxt 2. Thus there is improved performance. Developers can notice the excellent performance during development due to the Nitro server engine with cold starts and dynamic code-splitting.

With other tool parts upgrades, Webpack 5, Vite, ESBuild, and PostCSS are now supported. As a result, making both development and production builds extra fast.

#### Nitro Engine
Nitro engine is the main feature of Nuxt 3. It is Nuxt 3's new server engine.

The Nitro engine adds many capabilities and new features to Nuxt applications. It also drives better performance and improvements in Nuxt 3.

#### Nuxt Bridge
The Nuxt Bridge is a compatibility layer that enables you to upgrade from Nuxt 2 to Nuxt 3. It enables you to access the new Nuxt 3 features on an existing Nuxt 2 application. The new set of features includes:
+ Nitro engine.
+ Dev tools.
+ Nuxt CLI.
+ Built-in TypeScript and ES modules Support.
+ Vite integration

You can learn more about the [Nuxt Bridge here](https://v3.nuxtjs.org/getting-started/bridge/).

#### Vue3 and Vite support
Nuxt 3 was designed to support Vue 3. Since Nuxt 3 is written in Vue 3, you can access features such as the Composition API, improved module imports, and faster overall app speeds.

#### TypeScript
Nuxt 3 is written in TypeScript for easier maintenance and built-in Typescript support.

Nuxt 3 is adopting TypeScript and ES Modules (ESM)to provide an enhanced development experience. TypeScript will prevent runtime errors and enhance auto-completion.

However, it's not a must to write your Nuxt 3 application in TypeScript (Using JavaScript is fine and works as expected). You'll still be able to use Nuxt with no problems.

#### New file structure
The `app.vue` file serves as the primary component of your Nuxt application. With Nuxt 3, the `pages/` directory is optional, and you can work with one page `app.vue`. Everything you add to `app.vue`, such as JavaScript and CSS, will be shared across all pages. .

#### Cross-platform support
Over the years, JavaScript has come a long way, and there are now a number of platforms that use it. Nuxt 3 will run smoothly in any JS environment. This includes Node.js, Cloudflare Workers, and Deno.

### Nuxt 3 plugins
Plugins in Nuxt allow you to extend your applications' functionalities with the JavaScript library. With Nuxt 3 plugins, you can extend the functionality of your Nuxt application in three different ways:
 + Making the functions to be available on the client-side and server-side.
 + Using your preferred Vue.js plugins in your Nuxt application.
 + Using external javascript packages and modules into your Nuxt application.

 You can learn more about [plugins here](https://v3.nuxtjs.org/docs/directory-structure/plugins/).
### Why you need to use Nuxt 3
Here are some of the main reasons Nuxt 3 is a great framework and why you should use it in your next project.

1. Flexibility.
Nuxt allows you to display your application in three different ways.
+ Pre-Rendered
In this mode, the entire website is rendered at the build step so that you can send the fully generated HTML file to the server. The app is universal, even if each is a separate file. This means that the first page is from the server, but all other pages  in the browser are single page applications (SPAs).
+ Server Rendered
In this mode, you can create highly dynamic sites by running a node server. Each hit is rendered to the server before the browser returns a response. Again, after the initial hit, it's still  SPA.
+ SPA Mode
In this mode, only the bare app shell is returned when the first page loads.

2. Improved performance
Nuxt is very well optimized for web performance. Nuxt has high speed and covers most by default from preload, prefetch, and lazy-loading.

3. Nuxt Bridge
The Nuxt Bridge makes migration from Nuxt 2 to Nuxt 3 easy. This layer lets you upgrade to Nuxt 3 improvements on performance and features. Also, it makes migration to be seamless.

### Conclusion
I hope you are excited as I am about the features and possibilities Nuxt 3 provides. We learned that Nuxt 3 has numerous features that will improve the project or application's performance. Nuxt 3 is an excellent framework for making the switch.

Although Nuxt 3 is still in beta, it is recommended not to be used in production until its stable.

To summarize, we learned about:
+ Nuxt 3
+ How to Install Nuxt and create a new project.
+ Nuxt 3 features
+ Nuxt 3 plugins
+ Why you should use Nuxt 3

### Further reading
+ [What’s Coming in Nuxt 3?](https://vueschool.io/articles/news/whats-coming-in-nuxt-3/)
+ [Introducing Nuxt 3 Beta](https://v3.nuxtjs.org/getting-started/introduction)