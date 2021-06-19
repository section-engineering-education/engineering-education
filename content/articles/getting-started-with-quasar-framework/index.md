---
layout: engineering-education
status: publish
published: true
url: /getting-started-with-quasar-framework/
title: Getting Started with the Quasar Framework
description: This tutorial will introduces us to the Quasar Framework. We will create a simple app with Quasar framework. We will look at installing Quasar in our local machine and writing components in Quasar. 
author: espira-marvin
date: 2021-04-04T00:00:00-17:00
topics: [Node.js]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/getting-started-with-quasar-framework/hero.jpg
    alt: Vue Quasar Framework example
---
The [Quasar Framework](https://quasar.dev/) is a Vue.js-based framework used to develop cross-platform applications using one codebase. This helps by saving in development costs.
<!--more-->

Quasar offers a cutting edge user Interface and support builds for:
- Single-page applications.
- Progressive web applications.
- Server-side rendering.
- Mobile apps (Ios and android) using Cordova or capacitor.
- Multi-platform desktop apps using Electron.
- Browser extensions.
​
The overhead of using Quasar is minimal as it implements the best practices in web development out-of-the-box. These practices include SEO, image compression, and mobile responsiveness. It also has components for almost every web development need.
​
### Prerequisites
To follow along with this tutorial, you will need:
1. Some knowledge of Vue.js.
2. Node.js 10.x or newer, excluding 13 and 15. These versions are not tested with Quasar.
3. Npm 5.10 or newer / yarn 1.2 or newer.
​
### Installing the Quasar framework
There are three ways in which we can install Quasar as listed below.
​
In this tutorial, we're going to use the third method; `using Quasar CLI`, which comes with all Quasar features out-of-the-box. You can skip the first two and try them later.
​
#### 1. Embedding into an existing project through a CDN as shown below.
​
```html
<!DOCTYPE html>
<html>
  <head></head>
  <body>
    <!-- Add  at the end of your body tag -->  
    <script src="https://cdn.jsdelivr.net/npm/vue@^2.0.0/dist/vue.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/quasar@1.15.6/dist/quasar.umd.min.js"></script>
    
    <script>
      new Vue({
        el: '#q-app',
        data: function () {
          return {}
        },
        methods: {},
      })
    </script>
  </body>
</html>
```

In your body tag, you should use Quasar components in a div with id `q-app` as shown below:
```html
 <div id="q-app"> ... </div>
```

Do not use self-closing tags like `<q-list />` instead, use `<q-list></q-list>`.
​
> Note: This is not the best practice, since you will have to make sure to match all Quasar-related tags to the same version you have installed. In the `<script>` above, we have used version `@1.15.6`.
​
Finally, do not forget to add `<!DOCTYPE html>` at the beginning of the document. This is because some browsers like Safari will have compatibility issues e.g breaking flex.
​
#### 2. Installing using Vue CLI Quasar plugin
To work with Quasar through the Vue CLI plugin ensure to have installed `@vue/cli` globally.
​
Make sure you have at least version 3. Check the version using the command below.
```bash
$ vue --version
```

If you have Vue CLI 2.x.x, run the command below to uninstall it.
```bash
$ npm uninstall -g vue-cli 
```

If you're using yarn, run:
```bash
$ yarn global remove vue-cli
```

Now install Vue CLI (4+) with the command below:
```bash
$ npm install -g @vue/cli
```

If you're using yarn, run:
```bash
$ yarn global add @vue/cli
```

To create a project run the command below.
```bash
$ vue create my-app
```

Make sure to select babel from the vue CLI features list prompt while installing.
```bash
❯ Default ([Vue 2] babel, eslint) 
```

To add Vue CLI Quasar Plugin, navigate to the created project and run: `vue add quasar` to add the Quasar plugin.
```bash
$ cd my-app
$ vue add quasar
```

The CLI will prompt you to replace some existing files. You should accept this and move on to picking the features you'll need for the Quasar plugin.
​
This may not be the best approach to install quasar because you'll not have access to some of the features provided by Quasar CLI. Besides, Quasar was not tested with these plugins.
​
#### 3. Installing using Quasar CLI
Before we install Quasar, first check whether Quasar CLI is globally installed on your computer. 

Using the terminal run:
```bash
$ quasar -v
```

If you get a `command not found`, run the following command to install it.
```bash
$ npm install -g @quasar/cli
```

If you are using yarn, run:
```bash
$ yarn global add @quasar/cli
```
​
### Create a Hello World app with Quasar
To create a new Quasar app, run the command below.
​
```bash
$ quasar create hello-world-app
```

`hello-world-app` will be the name of your project.
​
Hit Enter to accept the default project details or edit them to your liking.
​
Using the arrow keys select the first CSS preprocessor:
​
```bash
❯ Sass with SCSS syntax (recommended)
  Sass with SCSS syntax (recommended)
  Sass with indented syntax (recommended)
  Stylus (deprecated)
  None (the others will still be available)
```

Select `Auto-import-in-use Quasar Components` and hit Enter.
​
```bash
? Pick a Quasar components & directives import strategy
❯ * Auto-import in-use Quasar components & directives
    - also treeshakes Quasar; minimum bundle size
  * Import everything from Quasar
    - not treeshaking Quasar; biggest bundle size    
```
​
Then press the spacebar to unselect the ESLint feature. We won't be needing it here. Hit Enter.
​
```bash
❯ (*) ESLint (recommended)
```

Finally, using the arrow keys select yarn. This is what we will use during development, you can use npm if you like.
​
```bash
❯ Yes, use Yarn (recommended)
```
​
Navigate to the created `hello-world-app` and serve the app by running the commands:
```bash
$ cd hello-world-app
$ quasar dev
```

After serving the app, the URL: http://localhost:8080/#/ opens in your browser to view the app. You'll see Quasar logo and the name "Quasar" at the center of the page.
​
Open the created `hello-world-app` folder in your editor of choice.
​
Navigate to the `src` folder, open `App.vue`. You'll see a div with and id q-app.
​
```html
<div id="q-app">
```

This is where the Quasar app is injected into the project using the id `q-app`.
​
Navigate to the `src/layouts` folder and open the file: `MainLayout.vue`.
​
Here, we will rename the app title to "Hello World App".  If everything is okay, you'll see the name change reflected on the toolbar at the top of the app.
​
The toolbar title tag looks like this:
​
```html
<q-toolbar-title> Hello World App </q-toolbar-title>
```

You can delete the next div after the `q-toolbar-title` to remove the Quasar version.
​
```html
<div>Quasar v{{ $q.version }}</div>
``` 

The  `MainLayout.vue` file also contains navigation links for the app. This is where you'll put navigation links to your app when it grows bigger.
​
For now, the links component, which is the `components/EssentialLink.vue`, is imported into the `MainLayout.vue` file. 

Data in `linksData` array is then looped through in the imported `EssentialLink` component and displayed to the left drawer of the app.
​
Don't worry if you don't understand, you'll get a hang of it with a little practice.
​
Now, navigate to the `src/pages` folder and open `Index.vue`. 
​
You can delete the whole image tag that looks like this:
​
```html
<img alt="Quasar logo" src="~assets/quasar-logo-full.svg">
```
​
This will remove the image and the name: "Quasar" from the center of the app, leaving the app ready for other components.
​
### Familiarize yourself with the structure of the components​
Here, we are going to build a component.
​
Just like Vue.js, Quasar uses a single file components (SFC) structure. A SFC has 3 parts; the HTML, SCRIPT (JS) and STYLE(CSS). 

The `<template>` tag represents the HTML, the `<script>` tag is for JavaScript and the `<style>` tag is for CSS. These tags should be in a single file.
​
If you have the knowledge of building Vue.js apps, this should be a breeze.
​
Create a file named `Country.vue` in the `components` folder. It has the SFC structure like Vue. Add the following code to the HTML part of the code.
​
```html
<template>
  <div>
    {{ name }}
  </div>
</template>
```

We intend to display a name of a country in the root page. In the `<script>`, add the following code.
​
```javascript
export default {
  name: "Country",
  data () {
      return {
        name: 'Kenya'
      }
  }
}
```

The `<style>` tag should remain as it is.
​
Now in the `pages/Index.vue` file, import the `Country` component. The `<script>` tag should be as shown below.
​
```javascript
import Country from "../components/Country";
export default {
  name: 'PageIndex',
  components: {Country}
}
```

The html part should look as shown below.
​
```html
<template>
  <q-page class="flex justify-start">
        <div>
          <Country />
        </div>
  </q-page>
</template>
```

The name of the country: "Kenya", appears at the top left of the page. This is how simple it is to create a component. This component can also be reused in other components.
​
### Pros of Choosing Quasar
The following are some of the pros of choosing Quasar framework.
​
#### 1. Support for multiple platforms
This is the most exciting feature that comes with Quasar. It has support builds for multiple platforms using only one codebase.
​
This is a very huge advantage since it saves on costs of application development and time. It supports builds for single-page applications, progressive web applications, etc.
​
#### 2. Fast to get up to speed
Although Quasar comes with a lot of technologies to make it a complete whole, such as [Webpack](https://webpack.js.org/), [Cordova](https://cordova.apache.org/), etc. You'll will only need to learn Vue.js which has a shallow learning curve. 

The other technologies are all integrated and configured in Quasar. Thus, you are not required to know them. In addition, it has one of the best detailed documentations around.
​
#### 3. Automated treeshaking​
With treeshaking, you can import only the needed components in your app. Quasar provides treeshaking out-of-the-box. Remember, during the installation of the `hello-world-app` we were prompted to `Pick a Quasar components & directives import strategy`? We selected the first.
​
```bash
❯ * Auto-import in-use Quasar components & directives
    - also treeshakes Quasar; minimum bundle size
  * Import everything from Quasar
    - not treeshaking Quasar; biggest bundle size    
```

This instructs Quasar to only import the components we'll need and not the whole Quasar, saving on the bundle size of our application.
​
#### 4. Support for RTL language
RTL (right-to-left) support for both Quasar components and the developer’s own code. It automatically converts developer-written website or app CSS code to RTL if a RTL language pack is used.
​
#### 5. Implements the best practices of web development. 
Web development best practices are implemented out-of-the-box; with features including cache busting, source mapping, code splitting, lazy loading and HTML, CSS, JS minification.
​
Quasar developers are also encouraged to implement the best practices in web developement.
​
#### 6. A vast number of language packs
Quasar comes with over 40 language packs out-of-the-box.
​
### Cons of choosing Quasar
#### 1. It is developed by only one person
The only drawback is that it was developed by one person. This may cause developers to rethink of the framework's future.
​
### Conclusion
We've just created a simple app with Quasar framework. You can create even bigger enterprise applications with it. 

Quasar tends to bring a better development environment and argues that not everything should be done (as they have been) like in the last decades.
​
If you are a total beginner to Vue and reactive UI libraries and want a good tutorial, I recommend you take a look at [Vue and Quasar video tutorials by Danny](https://www.youtube.com/watch?v=GV-D85D9KJQ&ab_channel=MakeAppswithDanny).
​
That is it.
​
Happy Coding!

---
Peer Review Contributions by: [Geoffrey Mungai](/engineering-education/authors/geoffrey-mungai/)
