---
layout: engineering-education
status: publish
published: false
url: /engineering-education/crud-operation-with-mysql-using-vue-js-and-php/
title: CRUD Operation with MySQL using Vue.js and PHP
description: In this article, you will learn how to select, insert, update, and delete records from a MySQL database with Vue.js and PHP.

author: aransiola-ayodele
date: 2020-12-17T00:00:00-05:00
topic: []
excerpt_separator: <!--more-->
images:

    - url: /engineering-education/css-in-js-solutions/hero.jpg
      alt: Interconnection of blue lines with a background of building
---
CRUD functionality is mostly required on every dynamic web based project. This article will put you through on how you can connect your Vuejs project with a MYSQL database.
<!--more-->

### Technologies Involved in this Article
1. AJAX (Asynchronous JavaScript and XML) is a technique for creating fast and dynamic web pages. AJAX allows web pages to be updated asynchronously by exchanging small amounts of data with the server behind the scenes. This means that it is possible to update parts of a web page, without reloading the whole page.

2. [Axios](https://www.npmjs.com/package/axios) is a modern and Promise-based JavaScript HTTP client library that can be used both in the browser and the server with Node.js. Axios works asynchronously and allows you to make HTTP calls to REST endpoints and consume JSON REST APIs. You can read more about how to consume API Endpoint with Vue.js [here](https://vuejs.org/v2/cookbook/using-axios-to-consume-apis.html).

3. [Vue.js](https://vuejs.org/) is an open-source model-view-view-model front end progressive Javascript framework for building user interfaces and single-page applications. Vue.js is not just used for web interfaces development alone, it is also used for desktop and mobile application development. You can read about the PROS and CONS of Vue.js [here](https://www.altexsoft.com/blog/engineering/pros-and-cons-of-vue-js/)

4. [PHP](https://www.php.net/) is a server-side scripting language, and a powerful tool for making dynamic and interactive Web pages. Every PHP code is executed on a web server. An instance of this, is when you complete a form on a website and submit it, or click a link to a web page written in PHP, no actual PHP code runs on your computer. Instead, the form data or request for the web page gets sent to a web server to be processed by the PHP scripts. The web server then sends the processed data and your web browser displays the results. You can install a local server on your computer by visiting this [link](https://www.apachefriends.org/download.html).

Add, edit, and delete functionality is mostly required on every dynamic web based project. With AJAX you can improve user experience and these operations can be performed without page reload. For this tutorial, I will be using the Axios package to send an Ajax request to PHP from Vue.js.

The article will be a hands on skill practise on how to have a Vue.js application that can communicate with your MySQL database using Axios and PHP.

### Creating Our Database
We will need to create a database using SQL the following command: 

```mysql
create database crud;
```
then we will need to create table in the database using the command below:

```mysql
CREATE TABLE `users` (
  `id` int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `username` varchar(100) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL
);
```

