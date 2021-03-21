layout: engineering-education
status: 
published: 
url: /engineering-education/getting-started-with-quasar-framework/
title: Getting Started with Quasar Framework
description: In this article, we will look at get started with quasar framework, its components structure, its pros and finally cons.
author: espira-marvin
date: 
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/getting-started-with-quasar-framework/hero.jpg
    alt: Getting Started with Quasar
---

### Introduction

Quasar Framework is a Vuejs based framework used to develop cross-platform applications using one codebase saving development costs. It offers state of art user Interface, support builds for single-page applications, progressive web applications, server-side rendering, mobile apps (Ios and android) using cordova or capacitor, multi-platform desktop apps using electron and browser extensions. The overhead of using quasar is minimal as it implements the best practices in web development out-of-the-box. Taking into account performance and responsiveness in mind. It also has components for almost every web development need.

### Prerequisites

1. Knowledge of Vue js
2. Quasar CLI
3. Node.js 10.x or newer excluding 13 and 15
4. Npm 5.10 or newer / yarn 1.2 or newer

### Installing Quasar Framework
There are three ways we can install quasar as listed below. In this tutorial, we're going to use the third method, `using quasar CLI` which comes with all quasar features out-of-the-box. You can skip the first two and try them at a later time.

1. Embedding into an existing project through CDN. Like below.

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
In your body tag you should use quasar components in a div with and id of `q-app`. Like below
```html
 <div id="q-app"> ... </div>
 ```
Do not use self-closing tags like `<q-list />` but use `<q-list></q-list>`

Note this is not the best practice, since you will have to make sure to match all quasar related tags to the same version you have installed. In the script, we have used version `@1.15.6`.

Finally, do not forget to add `<!DOCTYPE html>` at the beginning of the document or else some browsers like safari will have compatibility issues that break flex.

2. Installing using Vue CLI Quasar plugin

To work with quasar through the Vue CLI plugin ensure to have installed @vue/cli globally.
Make sure you have the right version(3). Check the version using the command below.
```bash
$ vue --version
```
If you have Vue CLI 2.x.x, run the command below to uninstall it.
```bash
$ npm uninstall -g vue-cli OR 
```
if you're using yarn, run
```bash
$ yarn global remove vue-cli
```
Now install Vue CLI (4+) with the command below.
```bash
$ npm install -g @vue/cli
```
if you're using yarn, run
```bash
$ yarn global add @vue/cli
```
To create a project run the command below
```bash
$ vue create my-app
```
Make sure to checkmark on babel from the vue CLI features list prompt while installing.
```bash
❯ Default ([Vue 2] babel, eslint) 
```
To add Vue CLI Quasar Plugin, navigate to the created project and run the `vue add quasar` to add quasar plugin
```bash
$ cd my-app
$ vue add quasar
```
The CLI will prompt you to replace some existing files, you should accept this and move to pick features you'll need for the quasar plugin.

This may not be the best approach to install quasar, because you'll not have access to some of the features provided by quasar CLI. Besides, quasar was not tested with these plugins.

3. Installing using Quasar CLI

Before we install quasar, first check if Quasar CLI is globally installed on your computer. Using the terminal run:
```bash
$ quasar -v
```
If it shows no version number, run the following command to install it.
```bash
$ npm install -g @quasar/cli
```
if you're using yarn, run
```bash
$ yarn global add @quasar/cli
```

### Create a hello-world-app with quasar

To create a new quasar app run the command below, after `create` is the folder name of your project.
```bash
$ quasar create hello-world-app
```
Hit Enter to accept the default project details or you can edit to your liking.

Using the arrow keys select the first CSS preprocessor:
```bash
❯ Sass with SCSS syntax (recommended) 
  Sass with SCSS syntax (recommended)
  Sass with indented syntax (recommended)
  Stylus (deprecated)
  None (the others will still be available)
```
Select Auto-import-in-use Quasar Components and hit enter
```bash
? Pick a Quasar components & directives import strategy
❯ * Auto-import in-use Quasar components & directives
    - also treeshakes Quasar; minimum bundle size
  * Import everything from Quasar
    - not treeshaking Quasar; biggest bundle size    
```
Then press the spacebar to unselect the ESLint feature, we won't be needing it here. Hit enter.
```bash
❯ (*) ESLint (recommended)
```
Finally using arrow keys select yarn, this is what we will use during development, you can use npm if you like.
```bash
❯ Yes, use Yarn (recommended)
```

Navigate to the created `hello-world-app` and serve the app by running the commands:
```bash
$ cd hello-world-app
$ quasar dev
```
After serving the app, it  opens the URL http://localhost:8080/#/ in your browser to view the app.
You'll see quasar logo and the name quasar in the center of the page.

Open the created `hello-world-app` folder in your editor of choice.

Navigate to the `src` folder, open App.vue you'll a div with and id of q-app
```html
<div id="q-app">
```
This is the where the quasar app is injected into the project using the id `q-app`.

Navigate to the `src` folder and into `layouts` folder and open MainLayout.vue file.

Here we'll rename the app title to "Hello World App", if everything is okay you'll see the name change reflected on the toolbar at the top of the app.
The toolbar title tag looks like this below
```html
   <q-toolbar-title> Hello World App </q-toolbar-title>
```
You can delete the next div after the q-toolbar-title to remove the quasar version.
```html
 <div>Quasar v{{ $q.version }}</div>
```  
The  MainLayout.vue file also contains navigation links for the app, this is where you'll put navigation links to your app while it grows bigger.

For now, the links component which is the Essential link.vue file in the `components` folder is imported into the MainLayout.vue file. Data in linksData array is then looped through in the imported EssentialLink component and displayed to the left drawer of the app.

Don't worry if you don't understand, you'll get a hang of it with more practice.

Now navigate to the `src` folder, then  `pages` folder and open the Index.vue file,
You can delete the whole image tag, looks like this below.

```html
    <img alt="Quasar logo" src="~assets/quasar-logo-full.svg">
```
This will delete the image at its name quasar from the center of the app. Leaving the app ready for other components

### Familiarize with the structure of the components

Here we're going to build a component. Just like Vuejs, Quasar uses single file components (SFC) structure. This has 3 parts; the HTML, SCRIPT(JS) and STYLE(CSS). If you have the know-how of building Vuejs apps this should be a breeze.

Create a file named Country.vue in the `components` folder.
It has the SFC structure like vue. Add the following code to the HTML part of the code.
```html
<template>
  <div>
    {{ name }}
  </div>
</template>
```
We are intend to display name of a countryin the root page. In the script add the following code,
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
The style tag should remain as it is. Now in the index.vue file in the `pages` folder import the County component. The script tag should be like below.
```javascript
import Country from "../components/Country";
export default {
  name: 'PageIndex',
  components: {Country}
}
```
The html part should look like below
```html
<template>
  <q-page class="flex justify-start">
        <div>
          <Country />
        </div>
  </q-page>
</template>
```
The name of the country, `Kenya`, appears at the top left of the app. This is how simple it is to create a component. It can also be reused in other components.


### Pros of Choosing Quasar

The following are some of the pros of choosing quasar framework

1. Support for multiple platforms

This is the most exciting feature of quasar, it has support builds for multiple platforms using only one codebase. This is a very huge advantage since it saves on costs of application development and time. It supports builds for single-page applications, progressive web applications, server-side rendering, mobile apps (Ios and android) using cordova or capacitor,  multi-platform desktop apps using electron and browser extensions

2. Faster to get up to speed.

Although quasar comes with a lot of technologies to make it a whole, such as [webpack](https://webpack.js.org/), [cordova](https://cordova.apache.org/), [capacitor](https://capacitorjs.com/), [electron](https://www.electronjs.org/), [nodejs](https://nodejs.org/en/) and [vuejs](https://vuejs.org/), you'll will only need to learn Vue which has a short learning curve. The other technologies are all integrated and configured in Quasar, thus, there are no requirements for you to know them. In addition, it has one of the best-detailed documentations around.

3. Treeshaking automatically

With treeshaking you can import only components that you need in your app. Quasar provides treeshaking out-of-the-box. Remember during the installation of the hello-world-app we were prompted to `Pick a Quasar components & directives import strategy`? We selected the first.
```bash
❯ * Auto-import in-use Quasar components & directives
    - also treeshakes Quasar; minimum bundle size
  * Import everything from Quasar
    - not treeshaking Quasar; biggest bundle size    
```
This instructs quasar to only import the components we'll need and not the whole quasar, saving on the bundle size of our application.


4. Support for RTL language

RTL (right-to-left) support for both Quasar components and the developer’s own code.
It automatically converts developer-written website or app CSS code to RTL if RTL language pack is used.

5. Implements the best practices in web development and Quasar developers are also encouraged to do so.

Web development best practices are implemented out-of-the-box; with features including cache busting, source mapping, code splitting, lazy loading and HTML, CSS, JS minification.

6. A vast number of language packs

Quasar comes with over 40 language packs out-of-the-box.

### Cons of choosing Quasar

1. It is developed by only one person.

The only drawback is it was developed by one person. Which may cause developers to rethink the framework's future.

### Conclusion
We've just created a simple app with quasar framework, you can create even bigger enterprise applications with it. Quasar tends to bring a better development environment and argues that not everything should be done like in the last decades.
If you are a total beginner to Vue and reactive UI libraries and want a good tutorial, I recommend you take a look at [Vue and Quasar video tutorials by Danny](https://www.youtube.com/watch?v=GV-D85D9KJQ&ab_channel=MakeAppswithDanny).

That is it.

Happy coding!
