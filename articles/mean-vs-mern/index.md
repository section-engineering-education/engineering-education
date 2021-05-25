---
layout: engineering-education
status: publish
published: true
url: /engineering-education/mean-vs-mern/
title: Breaking Down MEAN vs MERN Stacks
description: This is an article about MEAN and MERN stacks with respect to different parameters, MongoDB, expressjs, and Node.js.
author: richu-thomas
date: 2020-08-19T00:00:00-09:00
topics: [Node.js]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/mean-vs-mern/hero.jpg
    alt: mean vs mern
---
A technology stack is a combination of frameworks and tools utilized in a software product. A tech stack can be created with any combination of Frontend, Backend, Database, and Servers. In today's world, many companies especially startups, are seeing a huge demand for full-stack developers, that is, developers who are somewhat proficient in all the fields of development from frontend to managing servers.
<!--more-->

If the stack is all based on a single language, or little variation of that language, then it will be even more sought after. This was one of the main reasons for many JavaScript stacks becoming so popular. Some commonly used JavaScript-based stacks include:
- **MEAN:** ([MongoDB](https://www.mongodb.com/), [Express](https://expressjs.com/), [Angular](https://angular.io/), [Node.js](https://nodejs.org/en/docs/)
- **MERN:** (MongoDB, Express, [React](https://reactjs.org/), Node.js)
- **MEVN:** (MongoDB, Express, [Vue](https://vuejs.org/), Node.js)

In this article, we will be focusing on MEAN & MERN. Before jumping to the comparison, we should learn more about the common technologies and terminologies in these two stacks.

### MongoDB
MongoDB is a NoSQL open source database built in C++. It's a document store database, meaning it stores data as a "document" inside a collection, with many collections inside a database. The document data is stored as BSON, which is JSON in a binary format, for performance. The data is schema-less which means each document can have as many keys and values as needed with no restriction on the type of data. It's easy to think of the documents in collections like rows in a relational database table, except that these documents can have any arbitrary amount of properties and they can be different for each document and can include lots of nesting like arrays of more properties.

### Express
Express is a JavaScript library used for developing efficient, fast and scalable web applications on the backend. It uses "connect" which acts as a middleware between HTTP, Node.js and Express. We can use many different template libraries like Squirrelly, Marko, Swig, etc.

### Node.js
Node.js is a server-side solution for JavaScript, particularly for handling HTTP (RESTful services) requests and responses. It uses JavaScript engine V8 for interpreting and executing the code. It works on the concept of event-driven mechanism, meaning it does not create many threads for each request, rather it uses a callback to handle many requests in a single thread itself.

Now that we have a better understanding about the common terminology used with MongoDB, Express, and Node.js, let's talk about Angular and React, where we will be comparing the different parameters to define which one is best suited for your coding needs.

**Disclaimer: The Angular we are talking about here is Angular2, not Angular Js both are different frameworks. Let us not confuse the two here.**

### Language
Angular web apps are written in [Typescript](https://www.typescriptlang.org/), which is a superset of JavaScript with strict static type definition language developed by Microsoft that is compiled to JavaScript for the browser to understand. React web apps, on the other hand, are written in JavaScript.

### Popularity
[According to the StackOverflow Survey 2020](https://insights.stackoverflow.com/survey/2020), React is used by 36.8% and Angular is used by 26.5% of professional developers. In GitHub, Angular has gotten 64K stars, and React has gotten as many as 154K. As this data suggests, both are popular among web developers, with React having a bit more history (First Released - May 29, 2013), compared with Angular (First Released September 14th, 2016 - version 2 is quite new).

### Framework vs Library
People often get confused with the terms Framework and Library. Let's break it down. The first similarity is that both use code which is written by another developer to simplify the execution.

Where they differ is on the responsibility of control. In a library, it's up to the developer to decide how and where they want to use the library, like date pickers from bootstrap or Jquery. However, a Framework is a collection of different libraries that make up an architecture where you fill in the details you need. They have the control on how your code is rendered or used, such as in the example of Angular where there are libraries that manage routing, dependency injection, module management, testing inside the framework itself.  

You may be thinking why are we discussing this here, right? Well, the answer is that this is a distinct difference between React and Angular.

React is a library because it has a user interface library that does not include routing, testing, etc. Instead, it has its mechanism built into third-party libraries like [Redux](https://redux.js.org/), etc. that help provide these functionalities. Angular, on the other hand, is a framework.

### Testing
In React, the JavaScript code can be tested using [Jest](https://jestjs.io/) and [Enzyme](https://enzymejs.github.io/enzyme/), neither of which come pre-built in React. In Angular, we use [Jasmine](https://jasmine.github.io/) and [Karma](https://karma-runner.github.io/5.0/index.html) which come pre-built in Angular.

### Performance
#### Bundle Size
Both React and Angular are compiled to optimize JavaScript code. Angular contains many modules for routing, testing, etc., which may or may not be needed in every app. Its bundle size will be higher (although they are working to bring down the bundle size with the help of[Ivy](https://angular.io/guide/ivy)) in comparison to React, which does not have these modules built-in.

#### DOM
Angular works with Real DOM (Document Object Model) and React works with Virtual DOM. The key difference is how [DOM](https://en.wikipedia.org/wiki/Document_Object_Model) is updated when there is any change in the view. For example, lets say we want to update a user's phone number in a profile. In Real DOM, it will update the entire DOM tree structure instead of just updating the information which is changed, but in Virtual DOM only the information needing change is updated, without restructuring the entire DOM. So it provides a little performance advantage.

There are many other factors apart from the few parameters mentioned above which are not covered in this article.

### Third-Party Dependency
React is highly dependent on third-party modules like Redux, [Babel](https://babeljs.io/), etc. So it can be both an advantage as well as a disadvantage. One the one hand, it can be developed by different developers (advantage) or the community so that new features can ship faster, and on the other hand (disadvantage), if these modules are not maintained properly it can create issues in the future. However, the community is very active in contributing, maintaining, and updating these modules.

The above sits in stark contrast to Angular, where the teams only ship the necessary modules.

### Created and Used by
Angular was created by Google, and it is used by companies such as Nike, Forbes, Upwork, General Motors, PayPal, and Telegram, to name a few.

React was created by Facebook, and it is used by Airbnb, Uber, Netflix, Khan Academy, Dropbox, and many others.

Both MEAN and MERN stacks are a good choice for people who are just starting out their full stack web development career. The requirements of each unique application will help guide which stack is best suited for you. A good option is to start with one, and if it's not meeting your needs, then try the other. Gaining hands-on experience across different stacks is the way you become a better developer.
