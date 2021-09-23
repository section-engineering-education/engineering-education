---
layout: engineering-education
status: publish
published: true
url: /css-supports-query/
title: Using modern CSS features in old browsers using @supports
description: In this tutorial, we will learn about the various web rendering engines, and we will talk about the supports feature query.
author: saiharsha-balasubramaniam
date: 2021-06-15T00:00:00-02:00
topics: [Languages]
excerpt_separator: <!--more-->
images: 

  - url: /engineering-education/css-supports-query/hero.jpg
    alt: CSS supports query hero image
---
A Web Rendering Engine is a component of a web browser that reads HTML documents and converts (or) renders them into a useful visual representation.
<!--more-->
According to Wikipedia:
> A browser engine is a core software component of every major web browser. The primary job of a browser engine is to transform HTML documents and other resources of a web page into an interactive visual representation on a user's device.

A web rendering engine is also known as a layout engine or a browser engine.

 There are various browser engines such as:
- [WebKit](https://webkit.org/) by Apple.
- [Blink](https://www.chromium.org/blink) by Google.
- [Gecko](https://en.wikipedia.org/wiki/Gecko_(software)) by Mozilla.

Since there are a lot of web engines, certain HTML/CSS features are supported only in a certain version of a browser. For example, the CSS `position: sticky` feature is only supported on Firefox version 26 and above. In this article, we will learn how to use modern CSS features in old browsers by using the CSS `@supports` rule.

### Table of Contents
- [Prerequisites](#prerequisites)
- [Objectives](#objectives)
- [Problems with Browser Support](#problems-with-browser-support)
- [Workaround using @supports](#workaround-using-@supports)
- [Conclusion](#conclusion)
- [Further Reading](#further-reading)

### Prerequisites
To follow along with this tutorial, you should have:
- A basic knowledge of HTML and CSS.
- A code editor, [VSCode](https://code.visualstudio.com/download) is recommended.

### Objectives
- In this article, we shall explore how browser versions and CSS features are related.
- We will also look at the `@supports` feature query and use it in an example.
- We will take the CSS rule `position: sticky` as an example and find a workaround to enable it on an older browser.

### Problems with Browser Support
We may encounter certain issues with our website due to the following reasons:
- When the browser version does not support that specific feature.
- When the browser handles it differently than it should, due to a bug.
- When the browser has partial support for the feature and is not enabled by default.

When the browser version does not support the specific feature, we can work around this by introducing a fallback. The fallback replicates the behavior using older CSS features. When the browser has a bug, we can raise an issue to the developer team through GitHub and get it fixed.

When the browser has partial support for the feature, we can enable it by a browser flag or configuration setting.

In this article, we are going to concentrate on how to introduce a fallback using the `@supports` feature query.

Let's demonstrate what problems may arise when a CSS feature isn't supported by a web engine.

For example, the table below demonstrates the browser support for the CSS rule `position: sticky`:

| **Browser**       | **Supported Version** |
| ----------------- | --------------------- |
| Firefox           | 26 and above          |
| Edge              | 16 and above          |
| Safari            | 6.1 and above         |
| Internet Explorer | Not Supported         |

_For more information about browser support for various CSS rules, visit [this site](https://caniuse.com/)._

There is a major percentage of users who use older browser versions. New CSS features are being introduced regularly. This makes supporting new features for older browser versions impractical. To solve this problem, we use the `@supports` feature query.

### Workaround using @supports
The `@supports` CSS rule is used to specify CSS rules based on browser support for one or more CSS features. This is called a feature query.

Let us start building a basic website to demonstrate the use of `@supports`. Open a text editor, create a file named `index.html`, and add the following code:

```html
<html lang="en">
  <head>
    <title>CSS @supports</title>
    <!--Page Styles-->
    <style>
      .body {
        margin: 0;
      }
      .hero {
        /* Sets the background color of the hero banner */
        background-color: blue;
        /* Sets padding on all sides */
        padding: 2rem;
        /* Sticky position sticks and scrolls along with the page */
        position: sticky;
        width: 100%;
        height: 100px;
        /* Top property is used to ensure that the hero banner is on the top */
        top: 0;
      }
      .text {
        /* Sets the font size */
        font-size: x-large;
      }
    </style>
  </head>

  <body>
    <div class="hero">This is the hero banner.</div>
    <!--Placeholder Text-->
    <p class="text">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Euismod elementum nisi
      quis eleifend quam. Et netus et malesuada fames. Tristique senectus et
      netus et malesuada. Mauris pellentesque pulvinar pellentesque habitant
      morbi tristique. Ornare quam viverra orci sagittis eu volutpat. Diam vel
      quam elementum pulvinar. Fermentum et sollicitudin ac orci phasellus
      egestas tellus rutrum tellus. In hac habitasse platea dictumst vestibulum
      rhoncus est. Neque aliquam vestibulum morbi blandit cursus risus. Enim
      neque volutpat ac tincidunt vitae semper quis. Magna sit amet purus
      gravida. Lorem mollis aliquam ut porttitor leo a. Maecenas accumsan lacus
      vel facilisis volutpat est velit egestas. Eget nullam non nisi est sit
      amet. Lacinia quis vel eros donec ac odio tempor orci dapibus.

      Vulputate sapien nec sagittis aliquam malesuada bibendum. Faucibus purus
      in massa tempor nec feugiat nisl. Venenatis a condimentum vitae sapien
      pellentesque habitant morbi tristique. Sit amet consectetur adipiscing
      elit pellentesque habitant. Vestibulum rhoncus est pellentesque elit. Id
      porta nibh venenatis cras sed felis eget. Lectus arcu bibendum at varius
      vel pharetra vel turpis. Dolor magna eget est lorem ipsum dolor sit amet
      consectetur. Sed augue lacus viverra vitae congue. Vel fringilla est
      ullamcorper eget nulla facilisi etiam. Tortor dignissim convallis aenean
      et tortor. Integer enim neque volutpat ac tincidunt vitae. Sem nulla
      pharetra diam sit amet nisl suscipit.

      Faucibus turpis in eu mi bibendum. Dignissim suspendisse in est ante in
      nibh. Quis imperdiet massa tincidunt nunc pulvinar sapien. Cursus risus at
      ultrices mi tempus. Aliquam ut porttitor leo a. Egestas integer eget
      aliquet nibh praesent tristique. Adipiscing commodo elit at imperdiet dui.
      Sit amet volutpat consequat mauris nunc congue nisi vitae suscipit. Sem
      fringilla ut morbi tincidunt augue interdum velit euismod. Sagittis
      aliquam malesuada bibendum arcu. Sapien nec sagittis aliquam malesuada
      bibendum arcu vitae elementum curabitur. Placerat orci nulla pellentesque
      dignissim enim sit amet venenatis urna. Nec tincidunt praesent semper
      feugiat nibh sed pulvinar proin. Non enim praesent elementum facilisis leo
      vel fringilla. Bibendum neque egestas congue quisque egestas diam in arcu.
      Amet commodo nulla facilisi nullam vehicula ipsum. Quisque egestas diam in
      arcu cursus euismod quis viverra nibh. Habitasse platea dictumst quisque
      sagittis purus sit amet. Sed tempus urna et pharetra pharetra massa massa
      ultricies.

      A scelerisque purus semper eget duis at tellus. Dolor sit amet consectetur
      adipiscing elit. Amet dictum sit amet justo donec. Ut sem viverra aliquet
      eget sit amet tellus cras adipiscing. Eu augue ut lectus arcu bibendum at.
      Scelerisque purus semper eget duis at tellus at urna. Pulvinar
      pellentesque habitant morbi tristique senectus et netus et malesuada.
      Aliquam sem et tortor consequat id porta nibh venenatis cras. Nunc vel
      risus commodo viverra maecenas. Sed vulputate mi sit amet mauris. Sem
      fringilla ut morbi tincidunt augue interdum velit euismod.

      Mattis molestie a iaculis at erat. Sapien nec sagittis aliquam malesuada
      bibendum arcu vitae elementum. In fermentum posuere urna nec tincidunt
      praesent semper. Ac tortor vitae purus faucibus ornare. Elit sed vulputate
      mi sit amet. Ullamcorper malesuada proin libero nunc consequat. Ipsum
      dolor sit amet consectetur adipiscing elit. Sem fringilla ut morbi
      tincidunt augue. Integer malesuada nunc vel risus commodo viverra maecenas
      accumsan lacus. Tempor orci eu lobortis elementum. Placerat duis ultricies
      lacus sed. Adipiscing enim eu turpis egestas pretium aenean pharetra
      magna. In massa tempor nec feugiat nisl. Diam maecenas sed enim ut sem
      viverra aliquet eget. Lacinia at quis risus sed vulputate odio. Aliquet
      lectus proin nibh nisl condimentum id venenatis. Id venenatis a
      condimentum vitae sapien pellentesque. Arcu vitae elementum curabitur
      vitae nunc. Non enim praesent elementum facilisis leo vel fringilla. Nisl
      pretium fusce id velit ut.
    </p>
  </body>
</html>
```

Open this file on a modern browser such as [Chrome version 90](https://www.google.com/intl/en_in/chrome/). You would notice that the hero banner sticks to the top. Try scrolling to the bottom, and you would notice that the hero banner still sticks to the top. Therefore, we can confirm that the `position: sticky` feature works.

![Position Sticky](/engineering-education/css-supports-query/sticky.jpg)

*Position Sticky on Chrome 90*

Now, download and install [Firefox version 22](https://ftp.mozilla.org/pub/firefox/releases/22.0/). Open `index.html` in Firefox and you will notice that the hero banner does not scroll, thus the `position: sticky` feature does not work.

![Position Sticky Firefox](/engineering-education/css-supports-query/sticky-firefox.jpg)

*Position Sticky on Firefox 22*

Let's now fix this using `@supports`:

```html
<style>
  body {
    margin: 0;
  }
  .hero {
    /* Sets the background color of the hero banner */
    background-color: blue;
    /* Sets padding on all sides */
    padding: 2rem;
    /* Sticky position sticks and scrolls along with the page */
    position: sticky;
    width: 100%;
    height: 100px;
    /* Top property is used to ensure that the hero banner is on the top */
    top: 0;
  }

  /* If the browser does not support the position: sticky property, the rules within this block are applied */
  @supports not (position: sticky) {
    .hero {
      /* We set the position to be fixed so that the hero banner stays at the top */
      position: fixed;
    }
    body {
      /* We set the top margin to be 100px so that the hero banner doesn't overlap the placeholder text */
      margin-top: 100px;
    }
  }
  .text {
    /* Sets the font size */
    font-size: x-large;
  }
</style>
```

If you run it again on Firefox 22, you would notice that the hero banner sticks to the top, even when we scroll to the bottom of the page.

In the example above, we used the `@supports` feature query and the **not** operator to check for the browsers that do not support the `position: sticky` CSS rule. We specified some alternative CSS rules for older browsers within the `@supports` block so that the CSS doesn't break in older browsers.

There are also the **and** and **or** operators that can be used to evaluate various support conditions. When the **and** operator is used, the corresponding block properties are applied only when all the expressions are true.

The **or** operator is used when we want the block properties to be applied when one of the expressions is true. For example, we can use the **or** operator with vendor prefixes.

**Note**: A vendor prefix is a string of characters added before a property name. This is done because browsers implement certain CSS rules differently than others. For example, the prefix -moz is used with CSS rules specific to Firefox.

To learn more about vendor prefixes, check out [this link](https://bitsofco.de/css-vendor-prefixes/).

```css
@supports (transform-style: preserve) or (-moz-transform-style: preserve) or 
    (-o-transform-style: preserve) or (-webkit-transform-style: preserve) {
      /* CSS rules */
    }
```

The code above will execute only if the `transform-style` property is supported on the browser. 

```css
@supports (display: table-cell) and (display: grid) {
  /* CSS rules */
}
```

These CSS rules will be applied only on browsers that support both `grid` and `table-cell` display properties.

### Conclusion
- In this article, we learned about the various web rendering engines and how they vary across browsers.
- We saw how certain CSS features are not supported in certain older versions of browsers.
- We took the `position: sticky` rule as an example and saw how it breaks in Firefox 22.
- We used the `@supports` feature query to fix this problem and made it work in Firefox 22.
- We learned about the various conditional operators that can be used with `@supports`.

By using the `@supports` feature query, web developers can ensure that they can reach a wider audience by making their websites work flawlessly with older browsers. For the finished code used in this article, visit [this link](https://glitch.com/edit/#!/surf-utopian-antelope).

### Further reading
To expand your knowledge about web rendering engines and browser support, check out the resources below:
- [Behind the scenes of browser rendering](https://blog.logrocket.com/how-browser-rendering-works-behind-the-scenes-6782b0e8fb10/)
- [Browser engine](https://en.wikipedia.org/wiki/Browser_engine)
- [A tool to check browser compatibility](https://caniuse.com/)

---
Peer Review Contributions by: [Ahmad Mardeni](/engineering-education/authors/ahmad-mardeni/)
