---
layout: engineering-education
status: publish
published: true
url: /introduction-to-nodejs-15/
title: Getting Started with Node.js 15
description: This article outlines the new features in Node.js 15 and how they improve Node.js application development. To take advantage of experimental features, new NPM 7, V8.6, QUIC protocol, and bug fixes, developers should shift to Node.js 15. 
author: lorna-moraa
date: 2021-05-25T00:00:00-16:00
topics: [Node.js]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/introduction-to-nodejs-15/hero.jpg
    alt: Getting started with Node.js 15 example image
---
Node.js is a server-side platform based on Google Chrome (V8 Engine). Ryan Dahl [created Node.js in 2009](https://en.wikipedia.org/wiki/Node.js). Node.js is a tool used when creating fast and flexible network applications based on Chrome's JavaScript runtime.
<!--more-->
This article will discuss new features in Node.js 15. It will also show why you should consider updating to the latest release.

### Introduction
These are some of the Node.js characteristics: 
- It is asynchronous and event-driven, eliminating the need for a Node.js server to wait for an API to return data. 
- Fast in terms of code execution. There is no buffering since data transmitted in bits.

### New features of Node.js 15
Node.js 15 is the most recent version, released in October of 2020. It does not have long-term support. 

Node.js improvements:
- V8 JavaScript engine upgrade.
- Bugfix and an experimental version of Abort Controller and QUIC are all included.

#### NPM 7
Thanks to a slew of new features, NPM 7 is likely to be the biggest highlight of this update. NPM workspaces are the most important aspect since they mark the beginning of built-in support for building and managing multiple NPM packages in a single file system. 

Developers who are already familiar with the Yarn package manager or Lerna should find NPM's workspace implementation identical. NPM workspaces are relatively simple to set up. Start by arranging NPM package files on the file system, build a top-level package.

#### V8 8.6
Node.js 15's V8 engine has been updated to version 8.6 from version 8.4. V8 is the JavaScript engine that runs Node.js. It helps provides a runtime environment where Javascript executes its tasks. 

The good thing about this strong engine is how it operates independently in the host browser. Despite the small version bump, there are a few new language enhancements that will help you write less code and potentially increase the readability of your code.  

#### Experimental diagnostics channel module
Diagnostics channel is a new experimental framework in Node.js 15.1.0. This module effectively allows users to use a publish-subscribe pattern to upload arbitrary data to a network that can be accessed by other modules or applications. The module is designed to be universal and can be used in several scenarios.

#### Unhandled rejections are thrown
The default setting for unhandled rejection in Node.js 15 is now thrown (from warn). Unhandled Rejection hooks are treated as uncaught exceptions if they aren't set in throw mode. Users with an unhandled Rejection hook can see no difference in action, and the —unhandled-rejections=mode process flag can still be used to switch modes.

#### Abort controller
It's an experimental Node.js 15 application. It's a utility class that is used in promise-based APIs to signal cancellation. Developers may use the Abort Controller to terminate one or more Web requests as required. It makes native promise cancellation easier.

#### QUIC
QUIC is a UDP-based HTTP/3 network transport protocol that includes TLS 1.3 authentication, multipathing, flow control, error detection and correction, link migration, and other features. The QUIC configuration flag in Node.js 15 provides experimental evidence for this. It's quicker, more powerful, and more like the TCP+TLS+HTTP/2 protocol on UDP. In comparison to TCP, it aims to reduce bandwidth.

#### Node-API 7
Node-API (N-API) allows you to create native Addons. It's used to keep Node.js stable through various versions and compiler levels. Node.js 15 is a new major update of the N-API 7 API, which includes new functionality and additional methods for dealing with Array Buffers.

### Advantages of Node.js 15 over other versions
In `NPM 6`, peer dependencies were largely ignored. They are built by default in NPM 7. With the latest `NPM exec button`, it's now possible to run NPM packages without first installing them. This new directive replaces `NPX`, but it behaves in a somewhat different way. For backward compatibility, NPX was rewritten to use `NPM exec` instead of the old `CLI`.

If an unhandled rejection occurred in previous versions of Node.js, you will receive a `rejection alert` as well as a `deprecation warning`. The change of unhandled rejections being thrown has the potential to affect a large number of applications, especially for programmers who have previously ignored warning messages.

V8 has been upgraded from version `8.4` to version `8.6`, which includes several performance enhancements and features like new `logical assignment operators`.

Developers may use `Abort Controller` to terminate Web requests if they need to. Since `QUIC` is fast and efficient, it has lower latency than `TCP`.

Native modules, otherwise known as addons, are easier to generate, build, and support Node.js 15.

### Conclusion
Node.js 15 boosts user productivity and enhances the general developer experience with several significant bug fixes and improvements. To take advantage of experimental features, new NPM 7, V8.6, QUIC protocol, and bug fixes, developers should shift to Node.js 15. 

Happy coding!

---
Peer Review Contributions by: [Odhiambo Paul](/engineering-education/authors/odhiambo-paul/)
