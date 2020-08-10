---
layout: engineering-education
status: publish
published: true
slug: mean-vs-mern
title: Mean and MERN Stack
description: This is an article about Mean and MERN stack with respect to different parameters, MongoDB expressjs, and NodeJS.
author: richu-thomas
date: 2020-08-10T00:00:00-07:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/mean-vs-mern/hero.jpg
    alt: hero image visual data science python
---
Technology Stack is a combination of frameworks and tools utilized in a software product. Tech  Stack can be created with any a combination of Frontend, Backend, Database and Server.  In Today's world in many companies especially in startups, there is a huge demand for full-stack developers, that is developers who are somewhat proficient in all the fields of development from frontend to managing servers. If the Stack is all based on a single language or little variation of that language then it will be even more loved. This was one of the main reason for many JavaScript stacks became so popular.  In this article we will be focusing on MEAN & MERN. MEAN([MongoDB](https://www.mongodb.com/), [Express Js](https://expressjs.com/), [Angular](https://angular.io/), [Node Js](https://nodejs.org/en/docs/)), MEVN(MongoDB, Express Js, [Vue Js](https://vuejs.org/), Node Js) and MERN(MongoDB, Express Js, [React Js](https://reactjs.org/), Node Js).

Before jumping to the comparison, we should learn more about the common technology in these two stacks.
<!--more-->

### Mongo DB
MongoDB is a NoSQL open source database built in C++. It's a document store database which means it stores data as a "document" inside a collection, with multiple collections inside a database. The document data is stored as BSON which is JSON in a binary format for performance. The data is schema-less which means each document can have as many keys and values as you want with no restriction on the type of data. It's easy to think of the documents in collections like rows in a relational database table, except that these documents can have any arbitrary amount of properties and they can be different for each document and can include lots of nesting like arrays of more properties.

### Express Js
Express Js is a JavaScript library used for developing efficient, fast and scalable web applications on the backend. It uses "connect" which acts as a middleware between HTTP, Node Js and Express Js. We can use many different template libraries like Squirrelly, Marko, Swig, etc.


### Node Js
NodeJs is a server-side solution for JavaScript, particularly for handling HTTP (RestFul Services) requests and responses. It uses JavaScript engine V8 for interpreting and executing the code. It works on the concept of event-driven mechanism, it does not create multiple threads for each request rather it uses a callback to handle multiple requests in a single thread itself.

Now that we have got some understanding about the common terminology used with MongoDB, Express Js and Node Js. Let's talk about Angular and React, which we will be comparing the different parameters to define which one is best for you.
**Disclaimer: The Angular we are talking about here is Angular2, not Angular Js both are different frameworks. So don't get confused.**

### Language
Angular web apps are written in [Typescript](https://www.typescriptlang.org/) (It is a superset of JavaScript with strict static type definition developed by Microsoft that is compiled to JavaScript for the browser to understand). React web apps are written in JavaScript.


### Popularity
[According to a Stackoverflow Survey 2020](https://insights.stackoverflow.com/survey/2020) React.js is used by 36.8% and Angular is used by 26.5% of professional developers. In GitHub, Angular has gotten 64K stars, and React has gotten as many as 154K. Both are popular among web developers, React (First Released - May 29, 2013) compare that with Angular (First Released September 14th, 2016) version 2 is quite new.

### Framework vs Library
People often get confused with the Framework and Library. Let's break it down, the first similarity is code which is written by another developer to simplify your things and where they differ is based on the responsibility of control. In a library, it's up to the developer to use where ever they want to use like date pickers from bootstrap or Jquery.

Framework is a collection of different libraries making an architecture where you fill in the details you require they have the control of how your code is called like in the example of Angular where there are libraries to manage routing, dependency injection, module management, testing inside the framework itself.  You may be thinking why are we discussing here. You may have guessed it Right? React is a library because it is the only user interface library that does not have its routing, testing, etc mechanism built into third-party libraries like [Redux](https://redux.js.org/), etc. helps provide these functionalities and Angular is a framework.

### Testing
In React the JavaScript code is tested using [Jest Framework](https://jestjs.io/) and [Enzyme](https://enzymejs.github.io/enzyme/) is used to test React components it doesn't come pre-built in react. In Angular [Jasmine Framework](https://jasmine.github.io/) and [Karma](https://karma-runner.github.io/5.0/index.html) is used for testing and it comes pre-build in Angular.

### Performance

#### Bundle Size
This React and Angular app code is compiled to optimized JavaScript code. Since Angular contains many modules for Routing, Testing, etc. which may or may not be needed in every app its bundle size will be higher in comparison to React which does not have these modules inbuilt

#### DOM
Angular works with Real DOM(Document Object Model) and React works with Virtual DOM. The key difference is how [DOM](https://en.wikipedia.org/wiki/Document_Object_Model) is updated for example I want to update a users phone number in profile in Real DOM it will update the entire DOM tree structure instead of just updating the information but in Virtual DOM only the information is updated without restructuring the entire DOM. So it provides a little performance advantage

There are many factors apart from the above-mentioned parameters which are not covered in this article.

### Third-Party Dependency
React is highly depended on third party modules like Redux, [Babel](https://babeljs.io/), etc. So it is an advantage as well as disadvantage i.e. It can be developed by different developers or community so new features can ship faster and the disadvantage is if in future any library is not maintained properly it can create many issues although the community is very active in case of contribution but in Angular the Angular teams only ships all the necessary modules.

### Created and Used by
Angular is created by Google and it is used by Nike, Forbes. Upwork, General Motors, PayPal, Telegram, etc.
React is created by Facebook and it is used by Airbnb Uber, Netflix, Khan Academy, Dropbox, etc.

Both MEAN and MERN stack is a good choice for people who are just starting their full stack web developer career. Its all depends on person to person which stack it should choose. Starting with any framework just explore and then decide which is best for your use case this is the way you become a better developer
