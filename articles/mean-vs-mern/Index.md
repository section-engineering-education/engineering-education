---
layout: engineering-education
status: publish
published: true
url: /engineering-education/mean-vs-mern/
title: Mean and MERN Stack
description: This is an article about Mean and MERN stack with respect to different parameters, MongoDB expressjs, and Node.js.
author: richu-thomas
date: 2020-08-19T00:00:00-09:00
topics: [Node.js]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/mean-vs-mern/hero.jpg
    alt: example image mean mern mevn
---
A technology stack is a combination of frameworks and tools utilized in a software product. A tech stack can be created with any combination of Frontend, Backend, Database, and Servers. In today's world, many companies especially startups, are seeing a huge demand for full-stack developers, that is, developers who are somewhat proficient in all the fields of development from frontend to managing servers.
<!--more-->

If the Stack is all based on a single language or little variation of that language then it will be even more sought after. This was one of the main reasons for many JavaScript stacks becoming so popular. MEAN which stands for ([MongoDB](https://www.mongodb.com/), [Express Js](https://expressjs.com/), [Angular](https://angular.io/), [Node.js](https://nodejs.org/en/docs/), MEVN(MongoDB, Express Js, [Vue Js](https://vuejs.org/), Node.js) and MERN(MongoDB, Express Js, [React Js](https://reactjs.org/), Node.js). Are all examples of Stacks. In this article, we will be focusing on MEAN & MERN.

Before jumping to the comparison, we should learn more about the common technologies and terminologies in these two stacks.

### Mongo DB
MongoDB is a NoSQL open source database built in C++. It's a document store database meaning it stores data as a "document" inside a collection, with many collections inside a database. The document data is stored as BSON which is JSON in a binary format for performance. The data is schema-less which means each document can have as many keys and values as needed with no restriction on the type of data. It's easy to think of the documents in collections like rows in a relational database table, except that these documents can have any arbitrary amount of properties and they can be different for each document and can include lots of nesting like arrays of more properties.

### Express Js
Express Js is a JavaScript library used for developing efficient, fast and scalable web applications on the backend. It uses "connect" which acts as a middleware between HTTP, Node.js and Express Js. We can use many different template libraries like Squirrelly, Marko, Swig, etc.

### Node.js
Node.js is a server-side solution for JavaScript, particularly for handling HTTP (RestFul Services) requests and responses. It uses JavaScript engine V8 for interpreting and executing the code. It works on the concept of event-driven mechanism, it does not create many threads for each request rather it uses a callback to handle many requests in a single thread itself.

Now that we have gotten some understanding about the common terminology used with MongoDB, Express Js and Node.js. Let's talk about Angular and React, which we will be comparing the different parameters to define which one is best suited for your coding needs.
**Disclaimer: The Angular we are talking about here is Angular2, not Angular Js both are different frameworks. Let us not confuse the two here.**

### Language
Angular web apps are written in [Typescript](https://www.typescriptlang.org/) (It is a superset of JavaScript with strict static type definition language developed by Microsoft that is compiled to JavaScript for the browser to understand). React web apps are written in JavaScript.

### Popularity
[According to a Stackoverflow Survey 2020](https://insights.stackoverflow.com/survey/2020) React.js is used by 36.8% and Angular is used by 26.5% of professional developers. In GitHub, Angular has gotten 64K stars, and React has gotten as many as 154K. Both are popular among web developers, React (First Released - May 29, 2013) comparing that with Angular (First Released September 14th, 2016) version 2 is quite new.

### Framework vs Library
People often get confused with the Framework and Library. Let's break it down, the first similarity is, that both use code which is written by another developer to simplify the  execution and where they differ is on the responsibility of control. In a library, it's up to the developer to use how and where they want to use, like date pickers from bootstrap or Jquery but a Framework is a collection of different libraries making an architecture where you fill in the details you will need, they have the control on how your code is rendered or used like in the example of Angular where there are libraries that manage routing, dependency injection, module management, testing inside the framework itself.  

You may be thinking why are we discussing this here. Right? Well the answer is React.
React is a library because it has a user interface library that does not have its routing, testing, etc.
Instead, it has its mechanism built into third-party libraries like [Redux](https://redux.js.org/), etc. that helps provide these functionalities and Angular is a framework.

### Testing
In React the JavaScript code is tested using [Jest Framework](https://jestjs.io/) and [Enzyme](https://enzymejs.github.io/enzyme/) is used to test React components because it doesn't come pre-built into React. In Angular, we use [Jasmine Framework](https://jasmine.github.io/) and [Karma](https://karma-runner.github.io/5.0/index.html) is used for testing and it comes pre-built in Angular.

### Performance
#### Bundle Size
This React and Angular app code is compiled to optimize JavaScript code. Angular contains many modules for routing, testing, etc. which may or may not be needed in every app its bundle size will be higher and they are trying to bring down the bundle size with the help of[Ivy](https://angular.io/guide/ivy) in comparison to React which does not have these modules built-in.

#### DOM
Angular works with Real DOM(Document Object Model) and React works with Virtual DOM. The key difference is how [DOM](https://en.wikipedia.org/wiki/Document_Object_Model) is updated when there is any change in the view, for example, lets say we want to update a users phone number in a profile, in Real DOM it will update the entire DOM tree structure instead of just updating the information which is changed but in Virtual DOM only the information (needing change) is updated without restructuring the entire DOM. So it provides a little performance advantage.

There are many other factors apart from the few parameters mentioned above which are not covered in this article.

### Third-Party Dependency
React is highly dependent on third party modules like Redux, [Babel](https://babeljs.io/), etc. So it can be both an advantage as well as a disadvantage. One the one hand, it can be developed by different developers (advantage) or the community so that new features can ship faster and on the other hand (disadvantage), if these modules are not maintained properly it can create issues in the future.
Although, the community is very active in contributing, maintaining, and updating these modules.

As opposed to Angular where the teams only ship the necessary modules.

### Created and Used by
Angular was created by Google and it is used by companies such as Nike, Forbes, Upwork, General Motors, PayPal, and Telegram, to name a few.

React was created by Facebook and it is used by Airbnb, Uber, Netflix, Khan Academy, Dropbox, and a few  others.

Both MEAN and MERN stack are a good choice for people who are just starting out their full stack web development career. It's mostly a personal decision, which stack will be best to suited for you. Start with any framework you'd like just explore and then decide which is best for your use case, this is the way you become a better developer.
