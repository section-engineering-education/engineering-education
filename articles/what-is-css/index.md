---
layout: engineering-education
status: publish
published: true
url: /engineering-education/what-is-css/
title: What is CSS and Why Does it Matter?
description: CSS is a very important part of the modern web. Without CSS, websites would look plain, uninteresting and dated by today's standards.
author: gregory-manley
date: 2019-12-11T00:00:00-07:00
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/what-is-css/hero.jpg
    alt: what is CSS
---
CSS is a very important part of the modern web. CSS stands for Cascading Style Sheets. Modern web pages use HTML5 in conjunction with CSS to make amazing, beautiful websites. Without CSS, websites would look plain, uninteresting and dated by today's standards.
<!--more-->

### Brief History of CSS
CSS was first presented as an idea at The Web Conference of 1994 in Chicago. It received some criticism as some argued that to style documents, a full programming language was needed, while CSS was just a simple, declarative format ([w3.org](https://www.w3.org/Style/CSS20/history.html)). At the next conference in 1995, CSS was again presented, this time with implementations to showcase. Despite the want and need, it wasn't until a year later (in December of 1996) that CSS level 1 became ratified and accepted as a W3C Recommendation.

The current official version is CSS3. This version split CSS into modules, which have been allowed to level independently, allowing some modules to progress to level 4 ([A Word About CSS4](https://www.xanthir.com/b4Ko0)).

### How CSS Works
CSS is interpreted by the browser and applied to the HTML that calls it. Within the stylesheet, developers assign styles to select sections of the HTML document. For example, if we took the first paragraph in a website, likely denoted by the HTML:
```HTML
<p class="firstParagraph">This is the first paragraph.</p>
```
<p class="firstParagraph" style="border: 1px solid #e4e4e4; padding: 1.25rem;">This is the first paragraph.</p>

and if we wanted to apply style using CSS, we could change the syntax to:
```HTML  
<p class="firstParagraph" style="font-size: 14px; color: blue;">This is the first paragraph.</p>
```
<p class="firstParagraph" style="font-size: 14px; color: blue; border: 1px solid #e4e4e4; padding: 1.25rem;">This is the first paragraph.</p>

Thus changing the font size to 14 pixels and the color to blue instead of black.

What about the cascading? This is how all elements within the select section are assigned to the same style, unless another CSS section overrides it. For example if we took the first section of the HTML tag `<body>`, which could look like:
```HTML
<div class="first">
  <p class="firstParagraph">This is the first paragraph.</p>
  <p class="secondParagraph">This is the second paragraph.</p>
</div>
```

<div class="first" style="border: 1px solid #e4e4e4; padding: 1.25rem;">
  <p class="firstParagraph">This is the first paragraph.</p>
  <p class="secondParagraph">This is the second paragraph.</p>
</div>
<p></p>

and added CSS code that refers to "first" as follows:

```HTML
<style>
  .first {
    font-size: 14px;
    color: blue;
  }
</style>
<div class="first">
  <p class="firstParagraph">This is the first paragraph.</p>
  <p class="secondParagraph">This is the second paragraph.</p>
</div>
```

<div class="first" style="font-size: 14px; color: blue; border: 1px solid #e4e4e4; padding: 1.25rem;">
  <p class="firstParagraph" style="font-size: 14px; color: blue;">This is the first paragraph.</p>
  <p class="secondParagraph" style="font-size: 14px; color: blue;">This is the second paragraph.</p>
</div>
</p></p>

In this case, the CSS is applied to both the first and second paragraph, making them both have a font size of 14 pixels and a color of blue.

### Why Is CSS Important?
According to [Learn to Code With Me](https://learntocodewith.me/getting-started/topics/css/), "CSS is important because it allows web designers, developer, bloggers, and so forth to make our websites unique and attractive. CSS gives us the opportunity to play with a page layout, adjust colors and fonts, add effects to images, etc... Ultimately, it makes our lives easier. CSS allows us to separate the presentation from the structure (HTML) into different files."

[BigCommerce Essentials](https://www.bigcommerce.com/ecommerce-answers/what-css-and-why-it-important/) says that CSS "is the coding language that gives a website its look and layout. Along with HTML, CSS is fundamental to web design. Without it, website would still be plain text on white backgrounds."

Let us use the [iTech News](https://newsitech.weebly.com/) website as an example. Here it is with CSS:
![](https://newsitech.weebly.com/uploads/2/0/5/4/20542424/capture1_orig.png)
And here it is without any CSS:
![](https://newsitech.weebly.com/uploads/2/0/5/4/20542424/capture2_orig.png)
As you can see just the use of CSS can take a webpage from bland and unimportant, to looking well-designed and interesting.

CSS is an important element of modern web design. It takes plain, white background websites and turns them into something amazing, beautiful, and engaging.
