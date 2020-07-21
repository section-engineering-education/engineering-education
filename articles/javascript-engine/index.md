---
layout: engineering-education
status: publish
published: true
slug: javascript-engine
title: Inside the Browser — How the JavaScript Engine works
description: A high-level overview of how browsers handle JavaScript code.
author: saiharsha-balasubramaniam
date: 2020-07-08T00:00:00-12:00
topics: [languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/javascript-engine/hero.jpg
    alt: javascript 

---
**Websites: they’re everywhere**. Every single business, educational institution, restaurants have a website. There are websites for the **weirdest** reasons possible. For example, there is a website which has an ASCII art of a horse having never ending legs.

![Endless Horse](/engineering-education/javascript-engine/horse.png)

*Figure: [Endless Horse](http://endless.horse/)*

We’re even told that Web Developers are paid well. As we see, websites are an integral part of today’s world. Nowadays, even some mobile applications are created using website-specific technologies like JavaScript.

JavaScript is a high-level, just-in-time compiled programming language that has become the de-facto language of the Web. Unlike, conventional languages like C, which are compiled then run, JavaScript follows a way of executing code called just-in-time compilation. Here the compilation is done during the execution of a program. In this article, we’d be taking a look at the JavaScript engine and how it works.

### JavaScript Engines

A **JavaScript Engine** is a program which executes JavaScript code. JS Engines were first mere interpreters, but modern engines utilize just-in-time compilation techniques for improved performance. These engines are typically developed by web browser vendors.

#### Obtaining the Source Code

Whenever a ```<script>``` tag is encountered by the parser, it tries to load the source code. This source code could be from our local machine, a content delivery network, cache or from a remote server.

![Source Code](/engineering-education/javascript-engine/source.jpeg)

*Figure: Source Code*

This source code in converted into a byte stream as it is loaded.

#### Tokenization

The byte stream, is sent to the byte stream decoder, which splits the bytes into meaningful tokens. For example,

```javascript
function hello() {
	return 'henlo'
}
```
is split into the following tokens:

- **keyword** : function
- **identifier** : hello
- **punctuation** : (
- **punctuation** : )
- **punctuation** : {
- **keyword** : return
- **string** : henlo
- **punctuation** : }

These tokens are sent to the parser.

#### Error Checking & Syntax Tree Generation

This phase is one of the most important parts of the engine. The engine uses **two parsers** for this phase -> **pre-parser** and the **parser**.

The pre-parser checks for errors in the code, which would increase the efficiency of the code and reduces the running time by a significant amount, because of the following reason : the tokens would be sent into the parser, and it would discover the errors in the code after constructing a parse tree. But checking with the pre-parser first saves a lot of time, and improves performance.

Now, once the pre-parser verifies that there are no errors in the code, the tokens are sent to the parser. The parser converts tokens into an abstract syntax tree.

##### What are abstract syntax trees?

Abstract syntax trees are data structures, that are used in compilers, because they represent the proper structure of the program code.

![Abstract Syntax Trees](/engineering-education/javascript-engine/ast.png)

*Figure: Abstract Syntax Trees*

#### Interpreting & Optimization

The **interpreter** now walks through the abstract syntax tree and converts it into bytecode, that the machine can understand.

Now, since source code is typed by humans, it can be highly inefficient in the memory and resource point of view. So in order to optimize the code, there is a tool called the **optimizing compiler**. For example,

```javascript
function foo() {
	return 3*3*3
}
foo()
foo()
foo()
foo()
foo()
```

Here, ```foo()``` is called 5 times, and there it is not optimized to calculate the return value every time. Therefore, the optimizing compiler converts the **inefficient bytecode → into efficient machine code**

This is a simple overview of what goes on inside the JavaScript engines. I haven’t covered in-depth nuances of the engine, because this was intended as an article for a beginner to understand how a JavaScript Engine works. Hope you enjoyed the article, and leave a clap if you liked it!

### References & Interesting Pages

- The V8 Engine — [https://github.com/v8/v8](https://github.com/v8/v8)
- V8 Docs — [https://v8.dev/](https://v8.dev/)
- V8 Engine (Wikipedia) — [https://en.wikipedia.org/wiki/V8_(JavaScript_engine)](https://en.wikipedia.org/wiki/V8_(JavaScript_engine))
- Further Reading — [https://bit.ly/39Dsjxf](https://bit.ly/39Dsjxf)