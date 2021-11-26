---
layout: engineering-education
status: publish
published: true
url: /understanding-script-tag-attributes-async-defer/
title: Understanding Async and Defer HTML Attributes
description: This article will help the reader understand async and defer tags. These attributes help to reduce delays when the browser parses HTML code. 
author: emmanuel-alege
date: 2021-11-26T00:00:00-06:30
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/understanding-script-tag-attributes-async-defer/hero.jpg
    alt: Async and Defer Tag Attributes Hero Image
---
The script component is a vital HTML tag. It refers to executable code or data that runs in a web page. 
<!--more-->
The following is an example of a `script` tag:

```html
<script src='javcascriptcode.js'></script> 
<!-- the src attribute refers to an executable code or data-->
```

A `script` tag can point to an external source or even contain executable code.

In some cases, the executable data may be larger than the HTML file. This means there will be a delay in downloading and processing the HTML file. 

The browser has to download and process the content of the `script` tag before rendering the rest of the web page. 

`async` and `defer` attributes help to reduce delays when executing code in the script tag. 

These elements are essential in improving web page performance. They facilitate an enhanced user experience.

In this tutorial, you will learn about **async** and **defer** script attributes.

### Goal
In this article, you will learn:
- How the browser parses HTML.
- What are **async** and **defer**.
- How to use **async** or **defer**.
- Differences and similarities between **async** and **await**.

### Prerequisites
To follow along, you need:
- Some basic understanding of [HTML](https://www.w3schools.com/html/).
- Some basic understanding of [Javascript](https://www.w3schools.com/js/).
- A code editor. We will use [VS Code](https://code.visualstudio.com/download).

### Misconception about the Script tag
Most people assume that the `script` tag should come before the closing `body` tag, as shown below:

```html
<head></head>
<body>
    <H1>My Website</H1>
    <p>Welcome to my Portfolio</p>
    <script src=’javascriptcode.js’></script><!-- script tag before the closing tag -->
</body> <!-- closing body tag -->
```
This assumption is due to how the browser parses (loads) HTML. 

However, you can place the `script` tag anywhere within the HTML document. For instance, you can put it within the `header` tag or immediately after the opening `body` tag, as shown below:

```html
<head>
    <script src=’javascriptcode.js’></script> <!-- script tag within the header tag -->
</head>
<body>
    <H1> MY Website</H1>
    <p>Welcome to my Portfolio</p>
</body>
```

### How the browser parses HTML code
You need to understand how the browser parses HTML before we dive deeper into **async** and **defer** attributes.

> Parse means analyzing and converting program files into a format that is easy for the runtime environment (browser) to work with. Here, a program file can be an HTML file or a JavaScript file.

Parsing of an HTML file usually involves tokenization and tree construction.

Tokenization is the dividing of HTML opening tags, closing tags, attribute names, and values into units called `tokens`.

Tree construction involves [building the Document Object Model (DOM)](https://www.section.io/engineering-education/document-object-model/) using tokens.

When the browser parses HTML code and comes across a `script` tag, the browser pauses the execution process. 

The browser then downloads the content of the `script` and continues parsing the HTML code.

However, if you have an HTML file with many `script` tags within the `header` tag or `body` tag. Those tags may cause a significant delay in parsing the HTML file. 

The delay occurs because the browser pauses the parsing of the HTML file in each script tag. Then the browser requests the content of the `script` tag. The HTML content below the `script` tag is, therefore, blocked.

The parsing of the HTML file can then continue after the content of the `script` tag is downloaded.

The image below gives a better understanding of normal HTML parsing:

![Normal-script-execution](/engineering-education/understanding-script-tag-attributes-async-defer/normal-execution.png)

As shown above:
1. Once the browser parses HTML and comes across a script tag, it pauses HTML parsing.
2. The browser then fetches(downloads) and executes the script before continuing with HTML parsing.

Many `script` tags in an HTML file may lead to a noticeable delay. This issue may go unnoticed by end-users having a fast internet connection. 

However, most end-users have a slow internet connection and may, thus, notice this delay.
We can solve this issue using **defer** or **async** attributes:

```html
<script src='' async></script>
<script src='' defer></script>
```

### Understanding async and defer attributes
In this section of the article, you will learn what async and defer are.

Async and defer attributes are `script` tags [boolean](https://developer.mozilla.org/en-US/docs/Glossary/Boolean) that eliminate parser-blocking JavaScript.

> Parser-blocking JavaScript is a process whereby the browser blocks or pauses HTML code while it loads and executes contents of the `script` tag.

#### Defer
In a layperson's term, `defer` means postpone to a later time. Here is an example of `defer` used as a `script` tag attribute:

```html
<h1>...content before script...</h1>
<script defer src="script.js"></script>
<!-- visible immediately -->
<p>...content after script...</p>
```

When a `script` tag contains `defer` like the one above, it notifies the browser: 

- Not to block the HTML file from parsing when it comes in contact with the script. The browser continues to build the DOM, so contents after the `script` tag are visible.

- To load the script in the background.

- To pause `DOMContentLoaded` events until the script is fully loaded and evaluated. 

- To execute scripts sequentially. It maintains the order of `script` tags. For instance, the `long-script.js` will be loaded first before the `short-script.js`.

```html
<script defer src="long-script.js"></script>
<script defer src="short-script.js"></script>
```

In the above example, `short-script.js` may download first because of its size. But due to the `defer` attribute in the script tag, the browser will not execute `short-script.js` until `long-script.js` downloads and executes.

> The defer attribute has no effect when the `script` tag has no src attribute.

The image below provides a visual understanding of the defer attribute:

![defer-script-execution](/engineering-education/understanding-script-tag-attributes-async-defer/defer-execution.png)

From the image above:

Once the browser parses HTML and comes across a script tag. The browser fetches (downloads) and executes the script alongside the HTML parsing.

It does not pause HTML parsing. The script is executed after the HTML parses fully.

#### Async
We got async from the word 'asynchronous', which means events not occurring at the same time. 

When you add the boolean script attribute, `async` to a `script` tag. It notifies the browser:

- Not to block the HTML file from parsing when it comes in contact with the script. The browser continues to build the DOM, so contents after the `script` tag are visible.

- To load the script in the background and execute it when it's loaded. Scripts with `async` attribute don't wait for `DOMContentLoaded` before execution. 

Async scripts are independent of other scripts and DOM, as shown in the following example:

```html
<p>...content before scripts...</p>
    <script>
    document.addEventListener(‘DOMContentLoaded’, () => alert(“DOM is visible!”));
    </script>
    <script async src=”long-script.js”></script>
    <script async src="short-script.js"></script>
<p>...content after scripts...</p>
```

In the example above:

- The browser displays the page immediately. Async does not block `DOMContentLoaded` events. It shows 'DOM is visible' before the HTML content is fully loaded. 

Async scripts usually follow the `load-first` principle. The image below provides a visual understanding of the async attribute.

![Async-Execution](/engineering-education/understanding-script-tag-attributes-async-defer/async-execution.png)

Async scripts work with available DOM elements. Even when DOM is not fully parsed. 

For instance, if there are `25000` buttons in an HTML file and only `1000` buttons load, async will trigger `DOMCOntentLoaded` on the `1000` buttons. 

Async will not wait for the remaining `24000` buttons before triggering the `DOMContentLoaded` events.

### Getting started
Let's build a project to consolidate what we've learned so far.

In this project, you will create `25000` buttons. You will see how **defer** and **async** attributes are executed.

### Step 1 - Creating a project folder
We need to create a new folder that will contain the HTML file for the project.

Navigate to a command line or the integrated terminal in your code editor. Type in the command below:

```bash
mkdir buttons
```

Navigate to the folder using the command below:

```bash
cd buttons
```
### Step 2 - Creating an HTML file
Create a **buttons.html** file in the `buttons` folder. Add the code below into the generated HTML file:

```html
<head>
    <script src=”defer.js" defer></script>
    <script src="async.js" async></script>
</head>
<body>
    <div class="container">
    <!-- 25000 buttons -->
    </div>
</body>
```

In the HTML code above, we have two scripts. The first script with **defers** attribute and the second one with **async** attribute.

### Step 3 - Adding buttons
To create the `25000` buttons, place this [link](https://code.visualstudio.com/docs/editor/emmet) inside `**buttons.html**` below the comment. 

Then press the **tab** key.

```html
<head>
    <script src="defer.js" defer></script>
    <script src="async.js" async></script>
</head>
<body>
    <div class="container">
    <!-- 25000 buttons -->
    button{click}*250000 //press tab after typing this
    </div>
</body>
```
#### Step 4 - Creating JavaScript file(defer.js)
Let's write some JavaScript code to select all the buttons in the HTML code. follow these instructions:

Create a new JavaScript file in the **buttons folder**. Name the Javascript file **defer.js**.
 
Copy the code below and paste it into the `defer.js` file:

```js
// Defer script code
let deferButton = document.querySelectorAll(‘button’);
console.log(`Defer script button count: ${deferButton.length}`);
```
In the code above, we selected all `buttons` in the HTML file. We then logged the `buttons length` into the console.

### Step 5 - Creating JavaScript file(async.js)
Create an **async.js** file and add the code below in the **async.js** file.

```js
// Async script code
let asyncButton = document.querySelectorAll(‘button’);
console.log(`Async script button count: ${asyncButton.length}`);
```

In the code above, we selected all `buttons` in the HTML file. We then logged the buttons' length into the console.

#### Testing the project
Open the project in your browser. Then follow the instructions below to open the browser’s console:
1. Press **f12** to open the developer tools.

2. At the top of the developer tools, click on the console.

In the console, you will see something like the image below:

![image](/engineering-education/understanding-script-tag-attributes-async-defer/async-await-result.png)

From the image above:

- Async does not wait for the DOM to load fully. Async script triggers `DOMContentLoaded` on `buttons` available at the time of its execution i.e. 3957.

- Defer waited for DOM elements to load fully. Defer script selected all `25000` buttons after waiting for `DOMContentLoaded`.

### Differences between async and defer
In this section, we will look at the differences between `async` and `defer`.

| | Defer| Async |
|-----------|-----------|------|
|Load(Execution) order |Order of appearance of script tag matters.|Order of appearance of script tags doesn’t matter.|
|DOMContentLoaded| Execute after HTML file is fully loaded and parsed, right before DOMContentloaded.| May execute before or after DOMContentloaded.|

### When to use async or defer
When to use async and defer is a tough decision to make. However, we can use `defer` when:
- The script depends on the whole DOM.
- When your script depends on another script, e.g. when using [jQuery](https://jquery.com) or other [external libraries or frameworks](https://www.freecodecamp.org/news/the-difference-between-a-framework-and-a-library-bd133054023f/). Make sure you call the external library or framework before your script.
- When the order of execution of scripts is important.

You can use `async` when:
- A script is independent of the DOM, e.g. ads or google analytics.
- The relative execution order of scripts is not important, e.g. in ads.

### Conclusion
You have learned how the browser parses HTML. We have also discussed async and defer tag attributes, their differences, and use cases.

Async and defer attributes eliminate parse-blocking JavaScript. 

Happy coding!

### Further Reading
- [The script element-MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script)
- [Parse-MDN](https://developer.mozilla.org/en-US/docs/Glossary/Parse)

---
Peer Review Contributions by: [Wanja Mike](/engineering-education/authors/michael-barasa/)