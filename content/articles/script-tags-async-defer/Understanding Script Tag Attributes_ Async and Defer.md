# Understanding Script Tag Attributes: Async and Defer

![hero](/script-tags-async-defer/hero.jpg)

You may have come across one of [Hypertext Markup Language(HTML)](https://www.section.io/engineering-education/semantic-html-for-beginners/) tags as shown below, the `script` tag. 

```HTML

<script src=’javcascriptcode.js’></script> <!-- the src attribute refers to an executable code or data-->

```

The `<script src=’’></script>` tag is an HTML tag. It is used to refer to executable codes or data, such as Javascript code. 

The script tag has some attributes. 

In this article, you will learn about two of these attributes, **async** and **defer**. The **async** and **defer** attributes are essential because they improve web performance.

### Goal

In this article, you will learn:

* How the browser parses HTML.

* What are **async** and **defer**.

* When to use **async** or **defer**.

* Differences and similarities between **async** and **await**.

### Prerequisites

* Basic understanding of [HTML](https://www.w3schools.com/html/).

* Basic understanding of [Javascript](https://www.w3schools.com/js/).

* A code editor. I use [VS Code](https://code.visualstudio.com/download).

### Misconception About The Script Tag

You must have been advised that the `script` tag should be placed before the closing `body` tag. Like we have in the HTML code below:

```HTML

<head></head>

<body>

 <H1>My Website</H1>

 <p>Welcome to my Portfolio</p> 

 

<script src=’javascriptcode.js’></script><!-- script tag before the closing tag -->

</body> <!-- closing body tag -->

```

Have you ever thought about why you are advised to place the `script` tag before the closing `body` tag? This is because of how the browser parses (loads) HTML. We will look at how the browser parses HTML soon.

But you can place the `script` tag anyway within the HTML document. You can place it within the `header` tag or immediately after the opening `body` tag. Like we have in the HTML code below:

```HTML

<head>

 <script src=’javascriptcode.js’></script> <!-- script tag within the header tag -->

</head>

<body>

 <H1> MY Website</H1>

 <p>Welcome to my Portfolio</p> 

</body> 

```

### How The Browser Parse HTML

You need to understand how the browser parses HTML before we go into the details of **async** and **defer**.

> Parse means analyzing and conversion of program files into a format that is easy for the runtime environment (browser) to work with. Here, a program file can be an HTML file or a Javascript file.

Parsing of an HTML file involves tokenization and tree construction.

> Tokenization is dividing HTML opening tags, closing tags, attribute names, and values into units called `tokens`.

Tree construction involves the [building of the Document Object Model (DOM)](https://www.section.io/engineering-education/document-object-model/) using tokens.

When the browser parses an HTML code and it comes across a `script` tag, the browser pauses the parsing of HTML codes and requests for the content of the `script` to download. After the download of the script tag’s content is completed, the parsing of HTML code continues.

If you have an HTML file with multiple `script` tags within the `header` tag or `body` tag. This may cause a significant delay in parsing the HTML file. The delay is because for every `script` tag the browser comes in contact with, the browser will pause the parsing of the HTML file, then request for the content of the `script` tag. The request blocks the content of the HTML file below the `script` tag.

The parsing of the HTML file can then continue after the content of the `script` tag has been downloaded. Although, this delay may be avoided by placing the `script` tag before the closing `body` tag.

The image below will give a better understanding of normal HTML parsing:

![Normal-script-execution](Normal-script-Execution.png)

From the image above, in Normal HTML parsing:

1. Once the browser parses HTML and comes across a script tag, the browser pauses HTML parsing.

2. Then, the browser fetches(downloads) and executes the script. 

3. After downloading and executing the script, then it continues HTML parsing.

In an HTML file with enormous size, with a `script` tag placed before the closing body tag, there may be a noticeable delay in parsing the HTML file. Although this delay may be unnoticed by end-users having a fast internet connection. Most end-users have a slow internet connection and they may notice this delay. 

The problems above can be solved by including **defer** or **async** in your `script` tag, as shown below:

```

<script src=’’ async></script>

<script src=’’ defer></script>

```

### What are Async and Defer?

In this section of the article, you will learn what async and defer are.

What are async and defer? Async and defer are `script` tag boolean attributes that eliminate parser-blocking Javascript.

> Parser-blocking Javascript is a process whereby parsing of HTML code is blocked or paused while the browser load and executes contents of the `script` tag.

#### Defer

In a layperson’s term, `defer` means postpone to a later time. 

Here is an example of defer used as a `script` tag attribute:

```HTML

<h1>...content before script...</h1>

<script defer src="script.js"></script>

<!-- visible immediately -->

<p>...content after script...</p>

```

When the boolean attribute, defer is used in a `script` tag like the one above, it tells the browser:

* Not to block the HTML file from parsing when it comes in contact with the script. The browser continues to build the DOM, so contents after the `script` tag are visible.

* To load the script ‘behind the scene’.

* To stop trigger of DOMContentLoaded events until the script is fully loaded and evaluated. In other words, it is only after the HTML file has been parsed that the script can be executed. After the script has been executed, DOMContentLoaded can then be triggered.

* To execute scripts in order of appearance. It maintains the order of appearance of `script` tags. Take, for instance, if there are two scripts, `long-script.js and short-script.js`. Like the ones below:

```HTML

<script defer src="long-script.js"></script>

<script defer src="short-script.js"></script>

```

When the browser comes across two or more scripts, they are downloaded in parallel. This is to improve page performance. 

In the above example, `short-script.js` may be downloaded first probably because of its size, but because of the `defer` attribute in the script tag, the browser will not execute `short-script.js` until `long-script.js` is fully downloaded and executed. 

> defer attribute has no effect when the `script` tag has no src attribute.

The image below provides a visual understanding of the defer attribute:

![defer-script-execution](Defer-script-Execution.png)

From the image above, in Defer:

1. Once the browser parses HTML and comes across a script tag. The browser fetches(downloads) and executes the script alongside the HTML parsing. 

2. It does not pause HTML parsing.

3. The script is then executed after HTML is parsed fully.

#### Async 

We got async from the word ‘asynchronous’, which means events not occurring at the same time. We got asynchronous from two Greek words ‘asyn’, which means ‘not with’ and ‘chronos’, which means ‘time’.

When you add the boolean script attribute, `async` to a `script` tag. it tells the browser:

* Not to block the HTML file from parsing when it comes in contact with the script. The browser continues to build the DOM, so contents after the `script` tag are visible.

* To load the script ‘behind the scene’ and execute when loaded. Scripts with async don’t wait for `DOMContentLoaded` before executing. So, `DOMContentLoaded` events may trigger before an async script is loaded or after an async script is loaded. Async scripts are independent of other scripts and DOM. Async scripts don’t wait for each other. We will see this in the example below.

```HTML

<p>...content before scripts...</p>

<script>

 document.addEventListener(‘DOMContentLoaded’, () => alert(“DOM is visible!”));

</script>

<script async src=”long-script.js"></script>

<script async src="short-script.js"></script>

<p>...content after scripts...</p>

```

In the example above:

* The page is visible immediately. It shows ‘DOM is visible’. Async doesn’t block triggers of `DOMContentLoaded` events.

* Whichever one loads first between `long-script.js` and ‘short-script.js’ is executed first. Async scripts follow the “load-first” principle.

The image below provides a visual understanding of the async attribute.

![async-script-execution](Async-script-Execution.png)

From the image above, in Async:

1. Once the browser parses HTML and comes across a script tag. The browser fetches(downloads) and executes the script alongside the HTML parsing. 

2. HTML parsing is not paused.

3. The script executes once the browser finishes fetching the script. Script execution doesn’t wait for HTML parsing.

 Also, async scripts work with available DOM. Even when DOM is not fully parsed. Take for instance, if there are 25000 buttons in an HTML file, and during the process of parse, if only 1000 buttons are loaded, async will trigger `DOMCOntentLoaded` on the loaded 1000 buttons. Async will not wait for the remaining 24000 buttons before triggering `DOMContentLoaded`.

 

 We can get a better understanding of what we have above by writing a few codes. Follow the instructions below:

 1. Create a folder named Buttons.

 2. In the Buttons folder, create an HTML file named **buttons.html**.

 3. Open your HTML file in your VS Code(IDE).

 4. Copy the code below into your HTML file.

**Buttons/buttons.html**

```HTML
<head>

  <script src="defer.js" defer></script>

  <script src="async.js" async></script>

</head>

<body>

  <div class="container">

  <!-- 25000 buttons -->

  </div>

</body>
```
 
 

 In the HTML code above, we have two scripts. The first script with **defer** attribute. The Second script with **async** attribute.

 To create the 25000 buttons, place this [emmet](https://code.visualstudio.com/docs/editor/emmet) code inside `**buttons.html**` below the comment. Then press the **tab** key. 

```HTML
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
 Let’s write some Javascript code to select all the buttons in the HTML code. follow these instructions:

 1. Create a JavaScript file in the **Button folder**. 

 2. Name the Javascript file **defer.js** 

 3. Copy the codes below into the file.

 **Buttons/defer.js**
```Javascript

 // Defer script code

let deferButton = document.querySelectorAll(‘button’);

console.log(`Defer script button count: ${deferButton.length}`);
```


 In the code above, we selected all the buttons in the HTML file. We then logged the button’s length into the console.

 Then, create an **async.js** file the same way you created **defer.js**. Copy the codes below inside **async.js** file.

 **Buttons/async.js**

```Javascript
 // Async script code 

let asyncButton = document.querySelectorAll(‘button’);

console.log(`Async script button count: ${asyncButton.length}`);
```
 In the code above, we selected all the buttons in the HTML file. We then logged the button’s length into the console.

 Now, open the code in your browser. Then follow the instructions below to open the browser’s console:

 

 1. Press **f12** to open developer tools.

 2. At the top of the developer tools, click on console.

 In the console, you will see something similar to the image below:

 ![image](async-await-result.png)

From the image above:

* Async didn’t wait for the DOM to load fully. Async script triggered DOMContentLoaded on buttons available at the time of its execution i.e 3957.

* Defer waited for the DOM to load fully. Defer script selected all 25000 buttons after waiting for DOMContentLoaded. 

### Differences Between Async and Defer

In this section, we will look at differences between async and defer in terms of order of execution and `DOMContentLoaded`.

| | Defer| Async |
|-----------|-----------|------|
|Load(Execution) order |Order of appearance of script tag matters.|Order of appearance of script tags doesn’t matter.|
|DOMContentLoaded| Execute after HTML file is fully loaded and parsed, right before DOMContentloaded.| May execute before or after DOMContentloaded.|

### When To Use Async or Defer

When to use async and defer is a tough decision to make.

We can look at it this way, use `defer` when:

* The script depends on the whole DOM.

* When your script depends on another script, e.g. when using [jQuery](https://jquery.com) or other [external libraries or frameworks](https://www.freecodecamp.org/news/the-difference-between-a-framework-and-a-library-bd133054023f/). Making sure we call the external library or framework first.

* When the relative order of execution of scripts is important.

you can use `async` when:

* When a script is independent on the DOM, e.g. ads or google analytics.

* When the relative execution order of scripts is not important, e.g. in ads.

### Conclusion

You have learned how HTML is parsed by the browser, script tag attributes, async and defer, their differences, and use cases.

You’ve learned that they eliminate parse-blocking Javascript and the importance of this in page performance.

You can now implement this in subsequent projects.

Happy coding!!!

### Further Reading

For further learning, visit the links below:

* [The script element-MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script)

* [Parse-MDN](https://developer.mozilla.org/en-US/docs/Glossary/Parse)

