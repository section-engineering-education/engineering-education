---
layout: engineering-education
status: publish
published: true
url: /how-to-handle-navigation-in-flutter/
title: How to Handle Navigation in Flutter
description: This article will show you how to navigate between different pages in Flutter. We will be building a simple app that uses an organized Navigation Named route.
author: nathaniel-dauda-wobin
date: 2021-06-01T00:00:00-18:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/how-to-handle-navigation-in-flutter/hero.jpg
    alt: Handling Navigation in Flutter
---
Choosing the right JavaScript framework for a project can be challenging and confusing. Today, there are many resources capable of supporting different project requirements. Some of the popular front-end frameworks are Angular and React. Selecting the right framework requires knowledge of several critical aspects.
<!--more-->
This article discusses and compare the two most used front-end platforms worldwide; [Angular](https://angular.io/docs) and [React](https://reactjs.org/tutorial/tutorial.html).

### Angular and React
Angular is a fully-fledged JavaScript framework, while React.js is a JavaScript library. The table below helps us understand the technical specifications of React and Angular.

Factor|Angular|React |
----------------|-------|----- |
Release Year| 2016 | 2013
Ideal For| Creating highly interactive web applications | Creating large web applications with frequently varying data
DOM | Real | Virtual
App Size | Relatively small | Relatively small
Performance | High | High
Dynamic UI Binding | UI binding at a plain object or property level | Direct linking of states to the UI
Data Binding | Two-way | One-way
Learning Curve | Steep | Moderate
UI Rendering | Client/Server-side | Client/Server-side
Price | Open-source | Open-source

#### Popularity Growth
Angular and React have gained much popularity in the recent past. Both have featured in numerous discussions and forums. However, React has more users due to its early release, as well as moderate learning curve.

#### Performance
Both React.js and Angular offer high performance. However, React.js is faster due to its one way data binding. Angular, on the other hand, has numerous tools that help cut development time.

Angular has a [cacheFactory](https://docs.angularjs.org/api/ng/service/$cacheFactory) feature that helps to store and retrieve data.

React.js supports component reusability which is quite productive.

#### Testing
Since JavaScript is a dynamically typed language, it is quite challenging to identify bugs. Therefore, code written in JavaScript has to go through a robust set of tests. Angular solves this problem by providing several features which support the isolation of the unit code. For instance, Angular has a [dependency injection](https://www.freecodecamp.org/news/a-quick-intro-to-dependency-injection-what-it-is-and-when-to-use-it-7578c84fa88f/) tool which assists in passing data between different components.

In React.js, tests are predictable due to the availability of [Mocking functions](https://jestjs.io/docs/mock-function-api).

React.js also comes with test runners such as [Ava](https://www.npmjs.com/package/ava), [Mocha](https://mochajs.org/), and [Jest](https://jestjs.io/) that run tests during development process.

Jest is compatible with other features like [Mocked Node modules](https://jestjs.io/docs/manual-mocks), [Timers](https://jestjs.io/docs/timer-mocks), and [Jdsm](https://openbase.com/js/jest-date-mock). Furthermore, libraries such as Mocha can support simulations just like a real browser.

#### Code Quality
In Angular, [Angular CLI](https://angular.io/cli) helps to improve code quality. It supports integrations from [Angular Core](https://angular.io/api/core), [Angular Material](https://material.angular.io/guide/getting-started).

React.js has numerous plugins that increase the code quality. For instance, [Linters](https://www.testim.io/blog/what-is-a-linter-heres-a-definition-and-quick-start-guide/) uses a set of strict rules to ensure that there is consistency.

#### Code Maintainability
Angular is used for developing single-page applications. Such applications have complex structures, as well as several programming modules. To maintain such a complex structure, developers must choose a flexible and reliable framework.

Often developers deal with the problem of code maintainability when building rich web clients. In addition, using both JavaScript and HTML is challenging due to minimal modularization.

Angular overcomes these challenges by the use of maintainable JavaScript. Furthermore, it provides an HTML extension to deal with such challenges, thereby relieving developers and saves time.

Developers always inquire about best practices on maintaining the code quality and making a habit of writing clean code from scratch. However, it proves challenging to write a clean code without delaying production. React.js is better when writing a clean code with the same timeframe and quality production.

It shows the developers not to rewrite the same code again and get confused between code review comments. React.js has made developers write code that works among small modules minimizing redundancy.

React.js does allow developers to write in splits and makes it usable by computer and more readable by the developers. In addition, it facilitates code reusability by the use of reusable UI components during development.

React.js allows developers to create customized components that can display the uncontrolled input fields. Moreover, components can be easily recognized with unique naming conventions.

#### Server Rendering
In Angular application is rendered first by creating a static view, then it gets interactive. It is entirely on developers to use both JSON and [client-side caching](https://medium.com/js-360/intro-to-client-side-caching-with-service-worker-354ce8ae831a) to boost the server's performance. Angular is the best when it comes to traffic reduction between client and server.

An angular test requirement can reduce the code by minimizing the need for recompiling. It also quickly reflects the changes made in the front end.

For the application to be [SEO](https://moz.com/beginners-guide-to-seo) strong, the application is needed to be rendered to the server. React.js does it at best with the help of specific functions. For example, it can be done by calling the [RenderToString()](https://www.npmjs.com/package/preact-render-to-string) instead of calling Render. However, React.js is not a rigid library that would restrict one from benefiting from other JavaScript frameworks.

Also, [renderToStaticMarkup()](https://reactjs.org/docs/react-dom-server.html) can be used to refrain from creating Document Object Model ([DOM](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction)) attributes such as data-react-id, responsible for creating a static page generator.

#### Optimizing the bundle size
Working with single-page applications is easy but tricky when it comes to managing the bundle file size. Most websites do not load at first click, and this is so because the file has to be downloaded at the initial page called a bundle file. Therefore the file has to be optimized as much as possible.

The bundle file size is essential to consider when developing an enterprise-grade application for it to run smoothly. In addition, analyzing the bundle file size is essential for optimizing the application's codebase.

It is crucial to monitor the bundle file size because new features constantly added, and dependencies occur over the new requirements.

#### Learning Curve
Angular is broad and flexible; for this reason, developers find it difficult to cover most topics in Angular at the initial stage. However, it is worth giving ample time at the first phase to enjoy better developing the applications. Angular has a higher learning curve compared to React.js at the initial stage.

One is advised to pick on one based on project requirements. For example, angular is best when it comes to solving the most challenging problems in large-scale projects.

In React, developers may find it absurd to write at the first stages since it does not require any complexity.

React.js will not request a developer to learn and encounter the complexities of learning logical structures but learning basics and state management and routing library.

### Reasons for using Angular
-   It has inbuilt features such as AngularCLI and [Rxjs](https://www.learnrxjs.io/), significant increating data exchange channels and independent handling of events. Also, creating applications, adding files, and code debugging is easy.
-   It overall optimizes the developer's efforts by having fewer lines of code and parallelly running components.
-   Increases the overall application performance
-   Enhances rapid server-side rendering, therefore supporting the views
 that may lack browser-side rendering

### Reasons for using React.js
-   Unlike in Angular, developers can integrate external entities to
 access specific functions of React.js and the fully
 interactive functionalities.
-   It has state containers such as [Redux](https://redux.js.org/introduction/getting-started), which assists in the faster development of scalable applications like dynamic elements and managing rendering.
-   It converts [JavaScript XML](https://reactjs.org/docs/introducing-jsx.html) into JavaScript for a browser to understand
-   Better when one wants to use code bundlers such as [webpack](https://webpack.js.org/guides/getting-started/)
-   Ideal when one is using the URL router library such as [ReactRouter](https://reactrouter.com/web/guides/quick-start)

### Angular and React.js Use Cases
Angular and React.js have both made popular applications used worldwide. Below are two cases for using Angular and React.js:

### Case 1:
For a complex UI project and starting off the project from scratch, React.js is simpler to use. On the other hand, if a developer has a longer learning curve, Angular and React.js will be best because of their short learning curve.

### Case 2:
Angular can be regarded as a complete package since it facilitates important functionalities as a built-in part. 

One cannot compare Angular functionalities with a library like React.js. Nevertheless, typescript experts opt to use it as their framework of development.

### Conclusion
In the end, depending on the project requirements, one can choose between the two technologies. For example, a developer can use React.js if an application is not huge and requires a small learning curve.

On the other hand, when developing a vast application with extensive features, the team can go for Angular since its big learning curve is not a problem compared with the benefits it offers.

React.js is easy to use since the developer does not have to organize HTML but can reuse the UI components. In addition, angular can handle multiple things independently without depending on any additional help, and it may seem technical at first. However, the benefit it offers foresee the extended concept and overlooks the time invested.

---
Peer Review Contributions by: [Wanja Mike](/engineering-education/content/authors/michael-barasa/)