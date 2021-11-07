---
layout: engineering-education
status: publish
published: true
url: /types-of-styling-in-css/
title: Types of CSS (Cascading Style Sheets)
description: This article will go over the different styling options in CSS, how to apply them, and when best to implement each style.
author: kioko-mulwa
date: 2020-11-10T00:00:00-10:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/types-of-styling-in-css/hero.jpg
    alt: Types of CSS (Cascading Style Sheets) example image

---
We will be going over [Cascading Style Sheets](https://www.w3.org/Style/CSS/Overview.en.html) commonly known as CSS. CSS is what turns your everyday Hypertext Markup Language, HTML, into a one of a kind expression that leaves people in admiration.
<!--more-->
On its own HTML is seen as just a word skeleton (on a webpage) that could easily have been written on Microsoft word and saved a lot of time. CSS complements HTML to help come up with various designs that make a website pop.

From background colors, font-size, font-weight, font-family, and much more the design of a website becomes limited by only your imagination.

CSS is the main playground for any developer. To use an analogy, CSS is like all the spices you can add to your food to give it a rich taste, enticing aroma, and the desired presentation when you finally serve it up. However, just throwing things in there randomly doesn't guarantee greatness.

You still have to understand what goes with what, when to apply a specific style or when something just doesn't fit in. How you implement your CSS can either make or break your website. Below we'll be looking at the different styling options in CSS, how to apply them, and when best to implement each style.

### Styling in CSS
There are [3 distinct methods for styling in CSS](https://www.hostinger.in/tutorials/difference-between-inline-external-and-internal-css), *Local style*, *Page-Level style*, and *External Styles*. Each level of styling is given a different hierarchical priority (when to apply) and is used for different reasons.

The 3 methods are further grouped into two categories. Namely *Internal CSS* and *External CSS*. *Internal CSS* is comprised of Local Styles and Page-Level Styles while *External CSS* is just as the name implies.

#### 1. Local styles
Also known as inline. This form is defined within your HTML tags/elements. It's mostly used to style specific elements in your code.

```HTML
  <html>
    <head>
      <title>Cascading Style Sheets</title>
    </head>
    <body>
      <p style = "font-family: sans-serif;
          font-size: 1.2em
          font-style: italic;">
          This paragraph is an example of a local style.
        </p>
        <p>This is an Unaffected paragraph</p>
    </body>
  </html>
```

This code snippet edits the font of the *p* tag within the *body*. However, it only changes the contents of the first *p* tag. The second *p* tag maintains the webpage's default style.

By using the style tag in the HTML element *p*, we're able to change the font, font-size, and style only for the first *p*. As for the second *p* element it retains its default style.

#### 2. Page-Level styles
Page-level styles are defined at the header area of the HTML file. All similar tags, whether elements members of the class or ID selector within the body of the HTML will undergo the changes at once. An ID selectors can only identify one element each while Class selectors can identify more than just one at a time.

```HTML
  <html>
    <head>
      <title>Cascading Style Sheets</title>
      <meta charset="utf-8">
      <style type="text/css">
         body{
           color: yellow;
           background-color: red;
         }
         p{
           color: red;
           background-color: yellow;
         }
      </style>
    </head>
    <body>
      <h1>Heading</h1>
      <p>This paragraph has been styled using page level styling.</p>
    </body>
  </html>
```

This time around we defined the style within the *head* HTML tags. By doing so the elements defined in the style tags will automatically adopt the style defined for them. This means that all *p* elements on the page will have a color red and a background-color of yellow.

The *body* on the other hand will have a yellow color and a background-color of red. Developers can implement this when trying to give the webpage a different or vibrant theme where the background body and paragraphs complement each other to give an appealing look.

#### 3. External Styles
The styles used for the webpage are located in a completely different file. This other file purely contains CSS code and is saved with a *.css* extension. The *.HTML* file is linked to the *.css* file that can be imported to modify the webpage style.

When developing a website with multiple pages this styling usually comes in handy. This is due to the fact that just one CSS file can be implemented on multiple pages making it easier to maintain uniformity.

```html
  <!DOCTYPE html>
  <html>
    <head>
        <meta charset="utf-8">
        <title>External Styles</title>
        <link rel="stylesheet" type="text/css" href="css/myStyle.css"/>
    </head>
    <body>
      <h1>Heading</h1>
        <p>This is an example of External CSS</p>
    </body>
  </html>
```

In the code above there are no style tags defined within. However, the styling used for the webpage has been written in another file (contents shown below) and linked to this one using the link tags.

```CSS
  /*This is the CSS file called myStyle.css*/
  body{
    background-color: black;
    color: white;
  }
  p{
    color: purple;
  }
```

The CSS written in this file, *mystyle.css*, is used in the code above to implement the design.

### When to use each style
With these three styling options in CSS, **the best practice** would be to avoid internal CSS and implement external CSS. As explained further below external brings about uniformity and clean code making it easier to make changes.

**Local Style** shouldn't be the first choice that comes to mind when dealing with CSS. At some point, it becomes too much of a burden to keep styling each element individually. By the time you come to the end of your project, the entire file is a mess. That in the end prolongs the time needed to complete the project thereby causing you to extend deadlines or spend more time just to keep up.

However, this does not mean that the style should not be used. It usually works well when you're trying to test out a new style on an element making it easier to determine if the style works well with the design or not.

Always keep in mind that local styles have a higher priority over page-level and external styles. This means they will override any style property defined within page-level and external.

They will act as the main style for the specific tag. For example, if a *p* tag has a page-level or external style where its color is given as red but a developer added a local style to the same tag with a blue color, the web page will display the color blue.

**Pros:**
- Easy to test designs on individual elements.
- You can use one document to load CSS styles.

**Cons:**
- It can take a long time to load or render a page since multiple individual elements are styled within.
- This final file will look disorganized, thus making it harder to read.

**Page Level Style** is the clean version local style where you have everything located in one central place within the header of the HTML file. This gives the best results especially when you're in the development phase of the project. This is because browsers do not cache page-level styles like they do external styles.

**Pros:**
- Easy to manage during initial development stages.
- The programmer doesn't need to keep switching files to make minor adjustments.

**Cons:**
- Adding code to the document increases the size of the file.
- In order to manipulate a website design, you would have to acquire all the files that contain CSS.

**External Styles** gives you a wider range for its implementation. Since all the code used in the page styling is stored on a separate file it allows one to perform global changes on the project since one style sheet can control many pages.

I prefer using [external styling](https://www.webucator.com/how-to/how-create-css-external-style-sheet.cfm#) when it comes to launching the project or working with a live webpage. It is easier to upgrade since the design parameters of the entire site are defined in a single file.

**Pros:**
- One style sheet controls many pages.
- Separation of content and design.

**Cons:**
- You can not render the page until the entire CSS file is downloaded.
- Linking multiple CSS files to the page can lead to downtime.

### Conclusion
Whether it's testing out a new style on an element, building a simple single-page website, or building a company website that requires a uniform design from start to finish, you might dabble in inline CSS, page-level styles, or external styles respectively.

Where inline lets you test out new design patterns but becomes too much of a workload implementing on the entire page. Page-level lets you play around with the entire web page design without leaving the page but proves disadvantageous when dealing with multiple pages. While external styles can give your website the feel of a whole new theme.

### Additional resources

- [External Styling](https://www.webucator.com/how-to/how-create-css-external-style-sheet.cfm#)

- [3 distinct methods for styling in CSS](https://www.hostinger.in/tutorials/difference-between-inline-external-and-internal-css)

- [Cascading Style Sheets](https://www.w3.org/Style/CSS/Overview.en.html)

---
Peer Review Contributions by: [Sophia Raji](/engineering-education/authors/sophia-raji/)
