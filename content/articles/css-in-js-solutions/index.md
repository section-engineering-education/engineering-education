---
layout: engineering-education
status: publish
published: true
url: /css-in-js-solutions/
title: CSS in JS for Web Components
description: This article will cover various techniques a developer can use in defining styles within app components during development than maintaining multiple stylesheets for a single app component.
author: aransiola-ayodele
date: 2020-11-15T00:00:00-15:00
topic: []
excerpt_separator: <!--more-->
images:

    - url: /engineering-education/css-in-js-solutions/hero.jpg
      alt: CSS in JS for Web Components image
---
The modern web is written in components and not pages. CSS was designed to declare styles in different files (.CSS) for each page of your web application, and this structure makes it challenging to maintain multiple stylesheets for multiple pages.
<!--more-->

### The Problem Web Components Solve
Web components have changed the landscape of front-end web development. Using web components provides ample opportunities to reuse and build UI components and custom elements critical in the development process.

Understanding web components might seem daunting for novice web developers. However, let’s take a web application that has two prime features ― a drop-down menu and a navigation menu that appears on every page.

The traditional way of building web applications would require linking JavaScript and CSS files to every page that needed a drop-down or navigation menu and copy/pasting the HTML code to every location you wanted them to appear.

However, this method of building web applications makes it difficult to maintain, because in a big application, you could have hundreds of small files or one extensive file difficult to sort through.

### What are Web Components?
A web component contains its own default CSS styling. When a webpage invokes a component, it brings its styling with it.

However, you may not want the default component styles every time and this would require over-riding them. A technical approach to this issue is to create an external stylesheet for each web page inheriting the specific element, but this however also leads to a clogged codebase of CSS files.

Although web components simplify the development process of web applications, with it comes the barrier of maintaining multiple external style sheets when using CSS.

Some solutions exist to simplify web component CSS, such as CSS-in-JS. CSS-in-JS will encapsulate your CSS code within your JavaScript files, rather than creating external stylesheets for each web component.

### What is CSS-in-JS and how does it benefit CSS Web Components?
CSS-in-JS is a JavaScript library that offers a variety of techniques to style web components. CSS-in-JS resulted from the flaws in using CSS to style web applications, especially with custom elements, and some of which include scoping, specificity, portability, and dynamic functioning.

The adaptation of CSS-in-JS libraries over CSS is because of stylesheets loading in any order, that sometimes override each other. Before CSS-in-JS, developers applied specific CSS methodologies to ensure modular, reusable, and scalable styling. Some of these methodologies are [BEM](http://getbem.com/introduction/), [OOCSS](http://oocss.org/), and [SMACSS](http://smacss.com/) amongst others.

CSS-in-JS is an improvement over pure CSS for various reasons, but the end goal is the need for a simpler, easier to maintain codebase. Rather than maintaining multiple external stylesheets, CSS-in-JS solutions provide us with different libraries that each have their unique take on solving the problems of CSS.

CSS-in-JS is the best styling technique to use with web components. But, this doesn’t render CSS redundant because it does have its pros and cons.

![A code example of style declaration in the JavaScript variable font](/engineering-education/css-in-js-solutions/js.png)

### Pros of CSS
1. Inline Styling: The use of inline styles enhances website performance because the browser loads the CSS within elements faster before loading external styles.

2. Reduction in Redundancy: With inline styles, you can avoid redundant code and only declare CSS styles to a particular element when needed, this way, all extraneous code is removed.

3. External stylesheets: Inline-styles aren't the only way to write CSS. External stylesheets keeps your codebase organized and allows you to store all CSS code within a single file and reference them in webpages that need them.

4. Media Queries: The use of media queries allows you to specify the application of specific CSS rules for a particular screen layout and media types or devices.

### Cons of CSS
1. Overriding Inline Styles: The advantage of using inline styling is due to the acceleration of website performance, but it also results challenges when trying to override styles.

Overriding styles is a bit of an issue without the `!important` keyword. When you use inline styles and try to override them in your stylesheet, you can't do that without using the `!important` keyword.

The `!important` keyword is bad CSS practice. It disrupts the natural flow in applying the CSS rules where in properties are applied from top to bottom. With `!important`, the property will now give priority to the latest `!important` value.

2. Compatibility: One disadvantage of CSS is its compatibility issues across browsers. What works in Internet Explorer might not work in Google Chrome. Yet, web developers have to run compatibility tests with their CSS code or write their code based on the browsers accessing the website.

3. Performance: Using an external stylesheet slows down the performance of your website since all CSS files referenced are loaded at once, even when the page needing them is not currently rendered.

However, the performance hindrances can be mitigated by combining multiple stylesheets and inline CSS, that way it renders only the necessary CSS files on each page. Called critical CSS, this approach is like Styletron’s (a CSS-in-JS library) critical rendering feature.

### CSS-in-JS Libraries
There are several approaches to adapting CSS-in-JS within your web application. The following are different CSS-in-JS libraries you could use in your web application.

1. JSS

2. Styled-Components

3. Styletron

4. Emotion

5. Material-UI


1. JSS: JSS is one CSS-in-JS option that provides you with the flexibility of using JavaScript to declare styles. It blooms on its reusability and declarative way of applying CSS styles to your web app.

To dive in further, here are some benefits of using JSS in your project:

- Conflict-free Selectors: JSS ensures that CSS selectors are collision-free by generating unique class names, which eliminates the need for following naming conventions in CSS.

- Real CSS: JSS doesn't convert your CSS code to inline styles when passed to elements to be rendered on the web, so it still uses real CSS.

- Reusability: With the application of JavaScript modules, variables, and functions, you can store CSS rules and call upon them in multiple instances without having to declare CSS rules for every element every time it needs them.

- Easy Modification: Making changes with JSS becomes more comfortable, because you only need to run down where you declared the CSS rules and make necessary changes within the variable or function. Changes take effect where the variable or function is applied.

Conclusively, JSS can be integrated easily into your React application. Follow this [guide](https://cssinjs.org/setup) to get started with JSS, and look at some live code of CSS-in-JS in action with JSS [here](https://codesandbox.io/s/z21lpmvv33).

2. Styled-Components: Styled-components are one of the most used CSS-in-JS libraries. It ensures the usage of ES6 and CSS to style your application with template literals and CSS to make styling easy.

With an intense focus on improving user experience, styled-components enhance CSS styling for React app components. The following are the benefits of using styled-components in your application:

- CSS Automation: By using styled-components as your preferred CSS-in-JS solution, it keeps track of which components are active and rendered on the page to inject all styles related to that component automatically, which increases the speed of loading your application.

- Maintenance: As with other CSS-in-JS solutions, you can maintain your CSS codebase easily and track styles affecting your component without having to check through multiple CSS files.

- CSS Deletion: Deleting CSS styles is easier, styled-components make it clear which component not being used, and deleting such components automatically deletes all styles related to that component.

Listed above are some benefits of using styled-components as your preferred choice of CSS-in-JS solution. You can view how styled-components handles CSS in JavaScript [here](https://github.com/styled-components/styled-components#example), and you can also follow this [guide](https://www.styled-components.com/docs/basics#installation) to install styled-components in your React application.

3. Styletron: Styletron is another CSS-in-JS library that works with vanilla JavaScript, React, and other front-end frameworks.

Styletron has some outstanding features that will be examined shortly, but the distinct feature that sets Styletron apart from other CSS-in-JS solutions is the ability to use media queries and other CSS selectors which can’t be done via inline styles.

Here are some more benefits of using Styletron:

- Performance: To ensure high performance, Styletron follows the critical rendering concept by generating styles when needed by the demanding components. With this, browsers only load CSS rules currently in use rather than processing all CSS rules in one go.

- Portability: Styletron ensures portability by ensuring declaration of styles written in JavaScript within your component, providing the same experience as using inline styles but all in a CSS-in-JS solution.

Styletron provides the distinct advantages listed above when used, plus the same advantages to other CSS-in-JS solutions will also apply to it. You can get started with Styletron [here](https://www.styletron.org/getting-started).

4. Emotion
Like every other CSS-in-JS library, Emotion is a highly performing and flexible CSS-in-JS solution. Emotion makes use of String and Object styles to write CSS in JavaScript, and even better, it ensures improved runtime performance by parsing styles with Babel and PostCSS.

Emotion took into consideration approaches taken by other CSS-in-JS solutions like [styled-components](https://www.styled-components.com/) and [glamor](https://glamorous.rocks/basics), so you enjoy similar benefits. Using String and Object styles solve the problem of CSS specificity.

Getting started with Emotion is also easy. You can follow this [guide](https://emotion.sh/docs/install) to use Emotion in your project, and you can check out live code of Emotion Strings and Objects in declaring CSS styles in JavaScript [here](https://5bb1495273f2cf57a2cf39cc--emotion.netlify.com/).

5. Material UI

Material UI is a React component that aims to ensure fast and easy web application development. Material UI is not only restricted to Material UI components, but can also use the CSS-in-JS solution through the @material-ui/styles package [here](https://www.npmjs.com/package/@material-ui/styles).

Material UI used LESS and Inline CSS to style components, but that has been changed in order to take full advantage of CSS-in-JS. Material UI also has similar advantages to styled-components.

In favor of performance, Material UI uses JSS as its core, which ensures speedy compilation from JS to CSS both at runtime and server-side. Material UI is small, occupying just 15kb gzipped space. Follow this [guide](https://material-ui.com) to get started.

### Conclusion
CSS-in-JS changes the perspective of web application development from specificity to modularity. With a list of modern CSS-in-JS solutions with links to get you started, you can now take advantage of the power of web components combined with CSS-in-JS.

---
Peer Review Contributions by: [Louise Findlay](/engineering-education/authors/louise-findlay/)
