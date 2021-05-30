---
layout: engineering-education
status: publish
published: true
url: /why-node-js-is-popular
title: Why is Node.js wildly popular among developers?
description: Node.js is defined as a JavaScript runtime built on Chrome's V8 JavaScript engine. Node.js can be simply referred to as a technology. It is mainly used for backend operations.
author: geoffrey-mungai
date: 2020-08-13T00:00:00-10:00
topics: [Node.js]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/why-node-js-is-popular/hero.jpg
    alt: computer image example nodejs
---
Node.js has been a household name among developers for a few years now. So, what is all this recent excitement around Node.js we've been all hearing lately? Why is it so popular? Let's look at all this and more.
<!--more-->
### What is Node.js?
The definition of Node.js is quite complex. It's not a programming language nor is it a framework or a library. On their official [website](https://nodejs.org/en), Node.js is defined as a JavaScript runtime built on Chrome's V8 JavaScript engine.

Node.js can be simply referred to as a technology. It is mainly used for backend operations and is/can be used together with frontend JavaScript frameworks like [Angular](https://angularjs.org/), [React](https://reactjs.org/), [Vue](https://vuejs.org/) and others. Node.js is similar in design to Ruby's [Event Machine](https://github.com/eventmachine/eventmachine) and Python's [Twisted](https://twistedmatrix.com/trac/).

### How and why did Node.js gain popularity?
Node.js was introduced into the developer world in 2009 by the initial writer Ryan Dahl. Back in 2009, Apache HTTP server was a popular web server. But, it had a major problem, it could not handle a lot of concurrent connections.

When Node.js was created it was able to solve the problem Apache had. It offered scalability and parallel code execution. It introduced a new logic and approach for JavaScript server-side development. It introduced use of a single threaded event loop model. A single thread is used to perform all requests.

Since then its popularity has wildly grown. For instance in [Github](https://github.com/nodejs/node), Node.js has 71.9k stars, 17.6k forks, and 2.9k watchers. In [Stackshare](https://stackshare.io/nodejs) it has 54.4k followers and 8.2k votes. These numbers alone can show how popular Node.js is. Popular tech giants like Microsoft and Netflix use Node.js.

For the second year in a row, Node.js won the top spot in the StackOverflow's [2020 developer survey](https://insights.stackoverflow.com/survey/2020#technology-other-frameworks-libraries-and-tools-all-respondents3). Over half of the respondents in the survey reported having used it in their projects.

![Half of the respondents use Node.js](/engineering-education/why-node-js-is-popular/stackoverflow1.jpg)
[Image Source](https://insights.stackoverflow.com/survey/2020#technology-other-frameworks-libraries-and-tools-all-respondents3)

Node.js took the first position as the most wanted technology in the survey.

![most wanted technology 2020](/engineering-education/why-node-js-is-popular/stackoverflow2.jpg)
[Image Source](https://insights.stackoverflow.com/survey/2020#technology-other-frameworks-libraries-and-tools-all-respondents3)

According to Node.js [metrics](https://nodejs.org/metrics/), Node.js has been downloaded more than 1 billion times globally.

### Why Node.js is popular among developers.

#### 1. It is easy to learn Node.js.
This is one of the major contributors to its wide usage.
Among many developers, JavaScript skills are common. Node.js uses JavaScript. So, learning Node.js is relatively easy and few weeks of learning can get you up and running. Without JavaScript Knowledge, learning Node.js will take a bit longer but still manageable. Therefore, learning Node.js is not that tricky.

#### 2. The scalability offered.
Node.js is designed with scalable network applications in mind. Node.js can handle many concurrent requests. This is the main reason it quickly became popular among developers and large companies. It can handle many simultaneous requests without straining the server. A callback is fired only after a request, but if there are no more jobs to be done, Node.js will go to sleep. Node.js is only online when needed. This avoids unnecessary usage of your RAM.

### 3. The Mobile-friendly, Cross-platform, and Dev-Friendly nature of Node.js.
The ability to build flexible apps that run smoothly on any platform, be it Linux, Windows, or Mac OS gives Node.js a big thumbs up. There has been a rise in cross-platform app development in the last few years. The fear of apps not running on other operating systems is gone, as Node.js helped take care of that. It has enabled developers to write apps that run on different platforms with little or no modifications being made.

#### 4. Node.js is light and fast.
Node.js uses Google's V8 JavaScript engine which is built in C++. The engine is an open source and high-performance JavaScript and WebAssembly engine. The engine was developed for Google Chrome and Chromium browsers by The Chromium Project. V8 engine handles memory allocation, compiles, and executes JavaScript. It compiles JavaScript into machine code using a just-in-time (JIT) compiler before executing it.

More about Google's V8 JS engine can be found in the V8 [docs](https://v8.dev/docs). Node.js uses a non-blocking model in performing operations. Node.js has published a full article on blocking and non-blocking models [here](https://nodejs.org/en/docs/guides/blocking-vs-non-blocking/). It handles requests made in a single asynchronous thread. This reduces CPU workloads as well as memory. This makes your app lightweight.

#### 5. The many hosting providers available.
As a result of its growth in recent years, many cloud-based hosting providers and web servers have added quite simple ways of hosting Node.js code. Some of these hosting providers include Heroku, Amazon Web Services, and DigitalOcean among others. There are also many detailed and simple guides on this.

#### 6. Highly extensible
Node.js does not provide everything that you need all at once. Instead, you customize or add what you need over time. This prevents having unnecessary libraries. [Npm](https://www.npmjs.com/) - **Node package manager** is the default package manager in Node.js. Here, you can browse and install over 1 million open source packages. You can also use it to identify and install project dependencies.

#### 7. Its caching ability
Node.js provides the ability to cache single modules. Caching is the storage of data for future requests. When a request involving the module is made, it is fetched from the cache instead of the main servers. Thus, the app loads faster and responds quicker.

### What apps can I develop with Node.js?
You may be asking, what kind of apps can I make with Node.js. The answer is: Node.js can be used to make almost any kind of app. Below are some of the apps you can develop using Node.js.

- Single-page applications (SPA). eg. portfolio etc.
- Social media applications. LinkedIn uses Node.js.
- Real-time apps like chat apps.
- Streaming apps. For example, Netflix.
- Ecommerce apps. For example, Walmart.
- Blogs.
- Online Payment systems. For example, PayPal
- APIs
- Mobile apps. Node.js can be used together with other frameworks eg. ExpressJs to build mobile apps.
- Many more.

### The advantages of using Node.js.
 - Node.js modules and tools are easily available via [Npm](https://www.npmjs.com/).
 - Node.js developers are easily available.
 - Strong community and bug tracking team.
 - It can be used to build a wide range of apps.
 - It's Cross-platform and mobile-friendly.
 - Hosting Node.js code is not a hassle due to many of its supported hosting platforms.
 - It's lightweight.
 - It's ability to handle many simultaneous requests.
 - Fast code execution.

### Conclusion
Looking at the rate at which Node.js has risen to be one of the most wanted technology since its release in 2009, you can simply tell that it's really powerful. By offering security, scalability and performance among other things, Node.js has become a solution to many problems.

These are a few of the main reasons behind its usage by large tech companies. Node.js offers many advantages compared to its competitors like ASP.NET. Since you now know what Node.js has to offer, why don't you give it a try in your next project?
