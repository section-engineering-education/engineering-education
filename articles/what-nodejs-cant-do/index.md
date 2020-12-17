---
layout: engineering-education
url: \engineering-education\articles\what-nodejs-cant-do
title: What NodeJS Cannot Do
description: Cases where NodeJS cannot Function
author: gideonkibet
topic: [Node.js]
date: 2020-12-17T00:00:00-16:36
type: articles
---

#What node.js cannot do

In a nutshell, node.js is a JavaScript runtime environment which executes JavaScript code outside a web browser.Node.js has become so popular in the technology industry. In this document I seek to highlight what node.js cannot do. Before I do this it is imperative to understand some of node.js features. Firstly node.js is very fast in executing a code. Secondly it is asynchronous meaning it never waits for an API to return data. These among other reasons node.js has made node.js make a mark in the technology sector with its various uses. I will briefly highlight some of its uses below:

- It is used in event driven activities such as real time chats
- Used in data intensive activities-such as fetching, retrieving and saving data
- Used in I/O intensive activities
- Used in non-blocking

As earlier stated node is popular. Several companies including famous ones use it in its day to day activities. They include:

- Trello : a project management app is powered by node
- LinkedIn utilizes node for its mobile software stack
- PayPal has advanced their backend development from Java to node.js
- Groupon:a popular online deal market site made a resolve to rebuild their complete web course on top of node.js
- EBay has begun to utilize node.js more and more

From the examples above it is clear that node.js is being used for back end purposes. This is because it is the perfect match for building applications. However node.js has its fair share of activities which it&#39;s not able to execute well. In the next paragraphs I will explain what node.js cannot do. Simply put, instances where node.js will not shine. They include:-

1. Compute intensive activities
2. Processor intensive activities
3. Blocking operations

##1. Compute intensive activities

Node.js does not do well in activities that include data calculations. This because node.js is single threaded i.e. it runs through a queue of events. For example it would be impossible to run Fibonacci normally on node.js. Since it cannot pass it will discontinue the progress of the event loop till the calculation is entirely finished. To solve this problem we then have to come up with different solutions. This may include:

- Running Fibonacci in a different node.js process
- Using method 1 alongside a batch queue to process the Fibonacci
- Using method 2 together with a pool to manage the process

This clearly shows why node.js cannot be used to do compute intensive activities.

##2. Processor intensive activities

Node.js is single-threaded. It is therefore bad for CPU intensive tasks. This is because node.js runs on the event loop which in turn runs on a single thread. Everything on the node.js is due to the work of the event loop. Therefore if by any chance the thread is blocked then all the other tasks will have to wait for the thread to be unlocked before it can be executed. Hence it is heavily taxing on the processor. Therefore when you consider building some CPU heavy software then try using a more suitable and different technology which will provide better results.

##3. Blocking operations

Blocking methods execute synchronously and as stated earlier node.js functions asynchronously. Hence node.js is not the best to use during blocking operations

##Alternatives to node.js

Even though node.js in many cases is the best option for creating applications there are still other alternatives one can use. They include Rhino, Nashron and Ruby on Rails. I will focus on Ruby on Rails

##Ruby on Rails

Ruby on Rails is a fully developed framework that is all inclusive in terms of web applications that are backed up by databases. The structure is built on Ruby which is a robust programming language developed by Yukihiro Matsumoto back in the early 90s.It has since been used by top companies such as Airbnb and Shopify. The following are some of its benefits:-

- A well developed and robust infrastructure-Rails gives a fully blended web server solution and database which allows to conceptualize models. This is in contrast with node.js which many developers complain of its poor and slowly developing infrastructure.
- Constructed on impeccable web development practices-RoR tell of Rails as a good framework since it implements its goal of the best web development solutions . Because Ruby on Rails values arrangement as opposed to configuration of the framework tools with all the systems and components. All of these modules and libraries are implemented with Model-View-Controller (MVC) in entirety.
- The fact that Ruby on Rails carries out processor intensive applications better than node.js giving it an upper hand

However it is important to note that when choosing between Rails and Node one should consider performance and scalability of your application.

---
