---
layout: engineering-education
status: publish
published: true
url: /engineering-education/js-promises-under-the-hood/
title: How JavaScript Promises Work Under The Hood.
description: 
author: adrian-murage
date: 
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/js-promises-under-the-hood/hero.jpg
Introduction    alt: JS Promises under the hood
---
### Introduction
Pure JavaScript has a single thread of execution. Known as the [**main thread**](https://developer.mozilla.org/en-US/docs/Glossary/main_thread) in the browser context. "This means that long-running JavaScript functions can block the thread, leading to an unresponsive page and a bad user experience."[(MDN docs)](https://developer.mozilla.org/en-US/docs/Glossary/main_thread)

Examples of long-running JavaScript functions are those that:
- Fetch data from an API.
- Wait sometime before executing.

But, the above-mentioned functionality is commonly used in today's web applications. In this guide, you will learn how this functionality is achieved Asynchronously with Web Browser APIs and JavaScript Promises. You will also learn how the two are implemented under the hood.

With an understanding of Asynchronous functionality you should be able to:
1. Run long-running JavaScript functions without blocking the Thread Of Execution.
2. Run functionality related to long-running JavaScript functions once they are completed.
3. Understand what happens under the hood during the entire process.

### Prerequisites
Before you begin this guide you will need:
- An understanding of what happens when [JavaScript executes your code](https://www.section.io/engineering-education/js-execution-under-the-hood/).
