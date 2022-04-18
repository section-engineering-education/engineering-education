---
layout: engineering-education
status: publish
published: false
url: /intro-to-emberjs
title: Introduction to Ember JS
description: Ember.js is a free JavaScript web framework that follows the Model–View–View Model (MVVM) architecture. By combining popular idioms and best practises into the framework, developers may design scalable single-page web apps.
author: dev-verma
date: 2022-04-06 T00:00:00-13:23
topics: [languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/intro-to-emberjs
    alt: Ember JS
---

###  Ember JS
###  Pre-requisites
- You should know the basics of HTML, CSS, JavaScript, and the command line.
- Have a basic understanding of some JavaScript concepts like classes, modules, OOP, state management etc.

###  Table of contents
- Component Service Framework
- Introduction
- Ember tooling installation
- Difference between React JS and Ember JS
- Advantages of Ember JS
- Disadvantages of Ember JS
- Conclusion

 Before diving into Ember.js let's have knowledge about the component service framework which is a key and fundamental concept of Ember.js.

### Component Service Framework
A component-service framework is a popular strategy adopted by companies to create complex UI by breaking it down into small and reusable components. This allows to : 
- Rapidly increase the development rate as working on smaller component take less time.
- Finding bugs is also easy as the code base is precise, small, and easily readable.

### Introduction
Ember.js is a free JavaScript client-side framework for designing web apps that is open source. It is a component-service framework that focuses on a layer by layer application development experience using precise components while maintaining a light layer on top of JavaScript.  Ember also includes a lot of backward and forward compatibilities, which makes it easier for businesses to keep up with the latest Ember versions and community-driven practices.

Backward and forward compatibilities in terms of software or hardware system that can successfully use interfaces and data from earlier versions of Ember API. To read more about it here is the [link](https://emberjs.com/releases/) to the official docs.

### Ember tooling installation
Ember builds and scaffolds sections of your application using a command-line interface (CLI) tool.

-  Before you can install `ember-cli`, you'll need to have node and npm installed. If you don't already have node and npm installed, here is the [link](https://nodejs.org/en/download/) to the official docs.

-  To install `ember-cli`, put the following into your terminal:

```bash
 npm install -g ember-cli
```
`ember-cli` (command line interface) is the official method for creating, building, testing, and serving the files that comprise an Ember app or addon.

-	To make a new application, type the following into your terminal. Inside the current directory, a new directory named `example` is created, which contains the scaffolding for a new Ember app.

```bash
 ember new example
```
   Or, on Windows:
```bash
 npx ember-cli new example
```
Once ember installation is compleate, check your ember version. You should see an output similar to this:
```bash ember -v
ember-cli: 2.16.2
node: 7.4.0
os: darwin x64
```
This creates an application development environment that is ready for production and includes the following features by default:

-	Live reloading development server.
- 	Babel and Webpack integration for the newest JavaScript.
- 	Provides automated testing that allows you to test the app by running your tests in the browser.
- 	CSS and JavaScript transpilation and minification for an optimised production build.
- 	The use of conventions to reduce the variations across applications.

Now after getting some idea about ember, let's see an example that will further clarify your idea about this amazing framework.


###  Difference between React JS and Ember JS

###  Performance
###  React 
- React is a JavaScript open-source toolkit that provides a full suite of lean architecture and component-based workflow.
- It is a lightweight platform that is used for the application layer layer of an app while also allowing to manage state of the app.

### Ember
- This elephant moves slowly, especially when it comes to rendering. The observe and change recognition are far faster than Angular, however the first render is too slow.
- Because change detection is slower, it enables for the development of large-scale applications with frequent updates.


### Code Maintainability
### React
- Thanks to its component-based design, it can keep the application code structure. This minimizes the complexity of the code and the time spent building apps.

- You can add UI features or elememts while designing apps with React JS. You may also develop custom hooks and reuse conditional logics.

### Ember
- Ember JS is a good choice if following good development standards is super important as it prioritizes conventions over configs. When you utilize Ember CLI and integrated tools for app development, you can keep your applications organized and maintainable.

- It allows you to access anyone's code that is simple to grasp and does not require the assistance of a developer.

### User Experience
### React 
- React JS improves the user experience by properly matching development processes with design. You'll discover a number of developer-friendly designs here, where the core community is working hard to provide a uniform user experience.

- React also offers a lot of freedom to developers, but it's critical to use it effectively. You'll be in charge of ensuring that React is at the heart of your ecosystem.

### Ember
- Ember JS is like a vast library of data and tools, therefore you'll find a lot of them here. You may use them all to create your web application however you like.

- Ember CLI and add-ons can be used to create a pre-testable user interface. They serve as APIs for user interface testing and when you utilise Ember CLI, you may take use of capabilities that aren't available by default.

To know more about React here is the [link](https://reactjs.org/) to the official docs.

### Advantages of Ember JS
### Detailed documentation

- Ember's package ecosystem is large and well-developed, so you can be confident in choosing the proper ones to solve your problems.
- The framework has a dedicated website where all of the packages are organized and sorted, as well as detailed documentation and individual ratings, here is the [link](https://guides.emberjs.com/release/) for the detailed documentation.

###  Ember CLI
- Ember's "Command Line Interface for Ambitious Web Applications" allows you to interface with the operating system of your machine. 
- This is the main tool for producing codes, doing live recompilations, and running tests in the browser. Most well-known frameworks, like Ember, employ a CLI tool, showing its flexibility.

### Disadvantages of Ember JS
### Tough to learn
- Beginner developers may find Ember to be tougher to grasp than React or Vue.
- It is ideal for complex large-scale programs, but it may be overly hefty for basic small-scale apps.

### Less in popularity
- Ember has had a period of stagnation in popularity over the previous few years, and it has failed to attract any new developers.
- If things keep going this way, Svelte JS may soon surpass Ember.

###  Conclusion        
Ember JS allows us to focus on building amazing applications without worrying about the massive overhead that is required to keep an application up and running.

To find more information about Ember JS check out the official docs via this [link](https://guides.emberjs.com/release/tutorial/part-1/)

I hope you enjoyed reading this article as much as I enjoyed writing it.

Happy coding.

