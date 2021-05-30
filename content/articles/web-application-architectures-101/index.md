---
layout: engineering-education
status: publish
published: true
url: /web-application-architectures-101/
title: Web Application Architectures - 101
description: Web Apps are everywhere. Let's look into their structure and how they interact with various services - looking at server side rendering, client side rendering, and universal or isomorphic applications.
author: saiharsha-balasubramaniam
date: 2020-08-07T00:00:00-09:00
topics: []
excerpt_separator: <!--more-->
images:
  - url: /engineering-education/web-application-architectures-101/hero.jpg
    alt: web app
---

Websites have become an integral part of the technology landscape. It is important for developers to understand how they work, and how various internal components of a website interact with one another. In this article, we'll look at how web applications are structured and some of the most used web application architectures.

<!--more-->

### Table of Contents

- [Components of a Web Application](#components-of-a-web-application)
- [Traditional Server Side Rendering](#traditional-server-side-rendering)
- [Client Side Rendering](#client-side-rendering)
- [Universal or Isomorphic Apps](#universal-or-isomorphic-apps)
- [Comparison](#comparison)
- [Conclusion](#conclusion)

The end user can visualize a website, with various buttons, content and links that behave beautifully and serve the content that they request. The framework that works behind the scenes to manage this plethora of different content and programs interacting with each other could be termed as an **_architecture_**.

![csr, ssr](/engineering-education/web-application-architectures-101/csr-ssr.png)<br>
_Figure: Client Side Rendering vs Server Side Rendering ([Source](https://www.toptal.com/front-end/client-side-vs-server-side-pre-rendering))_

### Components of a Web Application

A Web Application could be termed as an _orchestra_ of various diverse components, all working together in harmony to produce a _beautiful website_.

- [Web Client](#web-client)
- [Web Server](#web-server)
- [Database](#database)
- [APIs](#apis)

#### Web Client

A **Web Client** is the browser, where the web application is fully rendered into a form with which the user can interact. The browser contains a JavaScript Engine, which is capable of rendering webpages by translating HTML, CSS and JS into a viewable form. It manages how the user **interacts** with the application.

#### Web Server

The Server is an environment that manages the business logic, authentication and data exchange by the use of a server-side language. Many popular languages like PHP, JavaScript, Ruby, Python, Java are used as a server-side language. There has also been a rise in server-side frameworks like Django & Flask (**Python**), Express & Deno (**JS**), Rails (**Ruby**), Laravel (**PHP**) and Spring Boot (**Java**) for developing robust server-side logic.

#### Database

A database, or a database server, stores data and provides an interface to Create, Read, Update and Delete the data, according to the business logic of our application. There are multiple database providers like Firestore, MySQL, Postgres, Mongo, etc.

#### APIs

APIs or **Application Programming Interfaces** are really popular in today's web applications. APIs are software intermediaries that allow applications to interact with each other. It differs from Web Servers in the fact that Web Servers serve HTML pages, whereas APIs serve data. This obtained data is rendered interactively in the Web Client using JavaScript. Nowadays, a more general stack called the _JAMStack_ is being used, which relies on generated markup, APIs for data and JavaScript to interactively render the data.

### Traditional Server-Side Rendering

Server-Side Rendering used to be the most common way used to build websites. There existed a web server that compiled everything, including the data and fully populated HTML page. Every time we needed to switch to another route, a request was sent to the server, which again populated the page with data and sent it back to the client. This approach had a huge disadvantage as the website felt slow and lacked a native feel. **Django**, **Flask**, etc. are server-side rendered.

### Client Side Rendering

![CSR](/engineering-education/web-application-architectures-101/csr.png)<br>
_Figure: Client Side Rendering ([Source](https://laptrinhx.com/understanding-server-side-rendering-721376809/))_

In Client Side Rendering, a single request is sent to a Content Delivery Network, which sends a single HTML file back, and all the JavaScript is sent to the browser. The interactivity is managed by the JavaScript on the browser, since a web browser is capable of running JavaScript on the browser.

This approach works really well with a good internet connection and the web application feels native. This is due to the fact that every time we switch routes, there aren’t repeated requests to the server. Instead, it is handled by the client. Frameworks like **Vue** and **React** use Client Side Rendering.

### Universal or Isomorphic Apps

![Isomorphic](/engineering-education/web-application-architectures-101/iso.png)<br>
_Figure: Universal Rendering ([Source](https://dzone.com/articles/client-side-vs-server-side-rendering-what-to-choos))_

Client Side Rendering fares poorly with Search Engine Optimization because crawlers cannot read the entire page content due to the initial time-to-load. To solve this, there is an increasingly popular method of designing web apps called the _Universal_ approach. This approach consists of both the client and server rendering pages. This approach solves the problem of SEO, while maintaining the snappy and fluid experience of a client side rendered application. Frameworks like **Next** and **Nuxt** use the isomorphic approach.

### Comparison

|                               | **Server Side Rendering** | **Client Side Rendering** | **Universal / Isomorphic** |
| ----------------------------- | ------------------------- | ------------------------- | -------------------------- |
| Search Engine Optimization    | Good                      | Bad for SEO               | Good                       |
| Reload during Route Switching | Yes                       | No                        | No                         |
| Needs a Server?               | Yes                       | No                        | Yes                        |
| Native User Experience        | No                        | Yes                       | Yes                        |
| Quick Initial Load            | Yes                       | No                        | Yes                        |

### Conclusion

As a web developer, it is important to choose an architecture according to the requirements of the application we are going to build. A good understanding of how each approach works and some development experience will help to become a better developer.
