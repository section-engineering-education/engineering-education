---
layout: engineering-education
status: publish
published: false
url: /intro-to-emberjs
title: Introduction to Ember JS
description: Ember.js is a free JavaScript web framework that follows the Model–View–View Model (MVVM) architecture. By combining popular idioms and best practises into the framework, developers may design scalable single-page web apps.
author: dev-verma
date: 2022-03-08 T00:00:00-13:23
topics: [languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/intro-to-emberjs
    alt: Ember JS
---


###  Ember JS
### Introduction
Ember.js is a free JavaScript client-side framework for designing web apps that is open source. It is a component-service framework that focuses on the overall online application development experience, eliminating minor variations between apps while remaining a current and lightweight overlay on top of native JavaScript. What does a component-service framework mean? Components, like those provided by other front-end frameworks like React, Vue, and Angular, are separate bundles of action, style, and HTML.
### Use cases
EmberJS is a good choice for apps that want to have one or both of the following characteristics:

1. Single-page apps, such as native-like web apps and progressive web apps (PWAs)
    1. Ember performs best when it is used to build your complete application's front end..

2. Improving technology stack cohesion across many teams
    1. "Best practices" supported by the community enable speedier long-term development.

    2. Ember features well-defined norms that are beneficial for enforcing uniformity and assisting team members in swiftly catching up.
### Installing the Ember tooling
Ember builds and scaffolds sections of your application using a command-line interface (CLI) tool.

1.  Before you can install `ember-cli`, you'll need to have node and npm installed. If you don't already have node and npm installed, go here to learn how to do so.

2.  To install `ember-cli`, put the following into your terminal:

  
         npm install -g ember-cli

The ember program, which is used to construct, build, develop, test, and scaffold your application, is provided via this tool in your terminal (run ember —help for a full list of commands and their options).

3. 	To make a new application, type the following into your terminal. Inside the current directory, a new directory named todomvc is created, which contains the scaffolding for a new Ember app. Make sure you've gone to the correct spot in the terminal before running it.


         npm install -g ember-cli

The ember program, which is used to construct, build, develop, test, and scaffold your application, is provided via this tool in your terminal (run ember —help for a full list of commands and their options).

  	  ember new todomvc
   Or, on Windows:

 	  npx ember-cli new todomvc



This creates an application development environment that is ready for production and includes the following features by default:

* 	Live reloading development server.
* 	Third-party packages can richly enrich your application thanks to the plugin architecture.
* 	Babel and Webpack integration for the newest JavaScript.
* 	Automated testing environment that allows you to test like a user by running your tests in the browser.
* 	CSS and JavaScript transpilation and minification for a production build.
* 	The use of conventions to reduce the variations across applications (allowing easier mental context switching).
	
### Installing the shared assets for TodoMVC projects

Installing shared assets, like we're going to do, isn't usually a compulsory step for new projects, but it does allow us to leverage existing shared CSS, which eliminates the need to guess what CSS is required to construct the TodoMVC styles.
1.	To begin, open a terminal window and navigate to your `todomvc` directory, for example, cd todomvc in macOS/Linux

2.	To add the common todomvc CSS to your app, use the following command

           npm install --save-dev todomvc-app-css todomvc-common

3.	Next, open the `ember-cli-build.js` file in your preferred code editor inside the todomvc directory (it's right there inside the root).

4.	In ember-cli-build.js, find the following code:

         let app = new EmberApp(defaults, {
          // Add options here
         });

5.	Before saving the file, add the following lines underneath it:


         app.import('node_modules/todomvc-common/base.css');
         app.import('node_modules/todomvc-app-css/index.css');

6.	Finally, find `app.css`, located at `app/styles/app.css`, and paste in the following:



          :focus,
         .view label:focus,
         .todo-list li .toggle:focus + label,
         .toggle-all:focus + label {
          /* ! Important since the outline is intentionally disabled in todomvc styles. */
          outline: #d86f95 solid !important;
          }

This CSS overrides some of the styles supplied by the `todomvc-app-css` npm package, making it possible to see the keyboard focus. This goes a long way toward addressing one of the TodoMVC app's key accessibility issues.

Starting the development server
In your terminal, type the following command while within the `todomvc` directory to launch the app in development mode:

        ember server

The development server is available at `http://localhost:4200`, which you can use to see how far your work has progressed.

###  Difference between React JS, Angular JS,  Ember JS, and Vue JS

| Attributes | React JS | Angular JS | Ember JS | Vue JS |
| :---: | :---: | :---: | :---: | :---: |
| **type** | Library to build UI | A framework | A framework | A framework |
|**Why choose?**|	If you like all things JavaScript | If you love TypeScript | If you like all things JavaScript | Easy JavaScript & HTML |
| **Backed By** | Facebook | Google | Community | Community | 
|**Performance**|	Excellent | Fine | Slow in Rendering | Excellent |
|**Data Binding** | One way | Two way | Two way | Two way |
|**Widely used for** | Modern web & native app development (IOS and Android) | Large-scale and feature-rich app development | Web app development | Web and SPAs development |
| **Learning Curve** | Easier than Angular | A steep learning curve | A steep learning curve | Small leaming curve |
|**Model**| Based on virtual DOM (flux) |	Based on MVC | Based on MVVM | Based on virtual DOM (flux) |
|**Community Support**| Facebook developers community | A large community of developers & supporters | A small community of developers | Open-source project sponsored through crowd-sourcing |
| **Development  Speed** | Normal | Normal | Fast | Normal |
| **Testing** | Your Choice	| Jasmine & karma | Q-unite | Karma & Mocha, Jest |
| **Documentation** | Good | Good | Good | Good |
| **Popularity** | Widely popular among developers | Widely popular among developers | More than 20,000 stars added on Github | More than 40.000 stars were added on GitHub during the year |
|**Best attraction**| Virtual DOM | Oldest Framework | Principals First | Combination of React & Angular |
| **Companies using** | Used by Facebook, Uber, Netflix, Twitter, Reddit, Paypal, Walmart, & others | Used by Google, Forbes, Wix, & weather.com | Netflix, LinkedIn, Sony & many more. | Used by Alibaba. Baidu, GitLab, & others |

###  Advantages of Ember JS
* 	Ember JS comes with a powerful data layer that works well with Java.
* 	It comes with an object model that describes the underlying data and makes key-value observation easier.
* 	The URL is supported by Ember JS. You also get user-friendly documentation and an API.
* 	When it comes to using Ember JS, you'll be able to take advantage of the best built-in features. You may tap into the collective wisdom of the software community and learn from others' experiences.
* 	Ember JS is the greatest framework to work with for long-term thinkers since it provides stability without stagnation.
* 	Ember JS has a quick boot time that aids server-side rendering, allowing search engines, curl, and other scrapers to access your project. 

### Disadvantages of Ember JS
* 	When using Ember JS, you may come across a lot of old stuff that isn't working anymore.
* 	When dealing with the Ember Js framework, you can't reuse the components.
* 	Ember JS is one of the heaviest and most strict frameworks available.
* 	It isn't appropriate for smaller tasks.
###  Conclusion        
Ember JS allows us to focus on building amazing applications without worrying about the massive overhead that is required to keep an application up and running and it makes life so much easier when we work with complex data in Node.

This is only a small snippet of what you can do with Ember JS, but you have to try it out yourself to see the full power that Ember JS has to offer.

To find more information about Ember JS check out the official docs via this link.
[link](https://guides.emberjs.com/release/tutorial/part-1/)

I hope you enjoyed reading this article as much as I enjoyed writing it.

Happy coding.

