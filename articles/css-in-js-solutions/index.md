---
layout: engineering-education
status: publish
published: true
url: /engineering-education/css-in-js-solutions/
title: CSS-In-JS For Web Components
description: This article will cover various techniques a developer can use in defining styles within app components during development than maintaining multiple stylesheets for a single app component.
author: aransiola-ayodele-leom
date: 2020-10-21T00:00:27-21
topic: [CSS-In-JS For Web Components]
excerpt_separator: <!--more-->
images:

    - url: /engineering-education/css-in-js-solutions/hero.jpg
      alt: code view on a laptop
---
The modern web is now written in components and not pages. CSS was designed to declare styles in different files (.CSS) for each page of your web application, and this structure makes it challenging to maintain multiple stylesheets for multiple pages.
<!--more-->

### CSS-In-JS For Web Components
Web components have changed the landscape for the development of web applications for front-end developers. The use of web components provides ample opportunities to reuse and build UI components and custom elements that are critical in the development process of web applications.

Understanding web components might seem a bit daunting for novice web developers. However, let’s take a web application that has two prime features― a dropdown menu and a navigation menu appears on all pages. 

The traditional way of building web applications would require linking JavaScript and CSS files to every page that needed a dropdown or navigation menu and copy/pasting the HTML code to every location you wanted them to appear. 

This methodology of building web applications makes it difficult to maintain because in a big application, you could have hundreds of small files or one very large file which is difficult to sort through.

But, if the generic features that span the entire web application can be isolated and built-in as components, then each web page will inherit that component and its generic features. This makes the dropdown and navigation menu components reusable, hence Web Components.

### CSS and Web Components
Styling elements has been the underlying factor for the appeal of frontend web applications, and with it comes a clear understanding of web components and how it relates to CSS.

A web component contains its own default CSS stylinng. When a webpage invokes a component, it brings its styling with it.

However, you may not want the default component styles every time and this would require over-riding them. A technical approach to this issue is to create an external stylesheet for each web page inheriting the specific element, but this however also leads to a clogged codebase of CSS files.

Although web components simplify the development process of web applications, with it comes the barrier of maintaining multiple external style sheets when using CSS.

Some solutions exist to simplify web component CSS, such as CSS-in-JS. CSS-in-JS will encapsulate your CSS code within your JavaScript files, rather than creating external stylesheets for each web component.

Although web components simplify the development process of web applications, with it comes the barrier of maintaining multiple external style sheets when using CSS.

Some solutions exist to simplify web component CSS, such as CSS-in-JS. CSS-in-JS will encapsulate your CSS code within your JavaScript files, rather than creating external stylesheets for each web component.



### What is CSS-in-JS and how does it benefit CSS Web Components? 

CSS-in-JS is a JavaScript library that offers a variety of techniques to style web components. CSS-in-JS was a result of the flaws in using CSS to style web applications, especially with custom elements, and some of which include scoping, specificity, portability, and dynamic functioning.

The adaptation of CSS-in-JS libraries over CSS is as a result of stylesheets loading in any order, which sometimes override each other. Meanwhile, before the advent of CSS-in-JS, developers applied specific CSS methodologies to ensure modular, reusable, and scalable styling, and some of these methodologies are [BEM](http://getbem.com/introduction/), [OOCSS](http://oocss.org/), and [SMACSS](http://smacss.com/) amongst others.

CSS-in-JS is an improvement over pure CSS for various reasons, but the end goal is a result of the need for a simpler, easier to maintain codebase. Rather than maintaining multiple external stylesheets, CSS-in-JS solutions provide us with different libraries with specific advantages for developers to choose from in the development of their web applications.

CSS-in-JS is the best styling technique to use with web components. But, this doesn’t render CSS redundant because it certainly does have its pros and cons.

![A code example of style declaration in the JavaScript variable font](/engineering-education/css-in-js-solutions/js.png) 

## Pros of CSS

1. Inline Styling: The use of inline styles enhances website performance because the browser loads the CSS within elements faster before loading external styles.

2. Reduction in Redundancy: With inline styles, you can avoid redundant code and only declare CSS styles to a particular element when needed, this way, all extraneous code sis removed.

3.  External stylesheets: Inline-styles aren't the only way to write CSS.  External stylesheets keep your codebase organized and allows you to store all CSS code within a single file and reference them in webpages that need them.

4. Media Queries: The use of media queries allows you to specify the application of specific CSS rules for a particular screen layout and media types or devices.

## Cons of CSS

1. Overriding Inline Styles: The advantage of using inline styling is as a result of the acceleration of website performance, but it also results in a challenge when trying to override styles.

Overriding styles is a bit of an issue without the !important keyword. When you use inline styles and try to override them in your stylesheet,  you can't do that without using the !important keyword. 

The !important keyword is a bad CSS practice. It disrupts the natural flow in applying the CSS rules where in properties are applied from top to bottom. With !important, the property will now give priority to the latest !important value.

2. Compatibility: One of the disadvantages of CSS is its compatibility issues across browsers. What works in Internet Explorer might not work in Google Chrome. Yet, web developers have to run compatibility tests with their CSS code or write their code based on the browsers accessing the website.

3. Performance: Using an external stylesheet slows down the performance of your website since all CSS files referenced are loaded at once even when the page needing them is not currently rendered. 

However, the performance hindrances can be mitigated by combining multiple stylesheets and inline CSS such that only the necessary CSS files are rendered on each page. This approach is similar to Styletron’s critical rendering concept as a CSS-in-JS solution.

### CSS-in-JS Solutions for Web Components

There are several approaches to adapting CSS-in-JS within your web application. The following are different CSS-in-JS solutions to deploy in your web application.

1. JSS
2. Styled-Components
3. Styletron
4. Emotion
5. Material-UI

1. JSS: JSS is one of the options for CSS-in-JS solutions which provides you with the flexibility of using JavaScript to describe styles in your app component. It blooms on its reusability and declarative way of applying CSS styles to your web app.

To dive in further, here are the benefits of using JSS in your project:
* Conflict-free Selectors: JSS ensures that CSS selectors are collision-free by generating unique class names, which eliminates the need for following naming conventions in CSS.
* Real CSS: JSS does not convert your CSS code to inline styles when passed to elements to be rendered on the web, and it still maintains the use of real CSS.
* Reusability: With the application of JavaScript modules, variables, and functions, you can store CSS rules and call upon them in multiple instances without having to declare CSS rules for every element within your app component every time they are needed. 
* Easy Modification: With JSS, making changes becomes more comfortable, because you only need to run down on where you declared the CSS rules and make necessary changes if any within the variable or function, and changes take effect where the variable or functions are applied. 

Conclusively, JSS can be easily integrated into your React application. Follow this [guide](https://cssinjs.org/setup) to get started with JSS, and you can see a live code [here](https://codesandbox.io/s/z21lpmvv33) of CSS-in-JS in action with JSS.

2. Styled-Components: Styled-components are one of the most used CSS-in-JS solutions in app development. It ensures the usage of ES6 and CSS to style your application with template literals and CSS; you can easily style app components. With an intense focus on improving user experience, styled-components are designed to enhance CSS styling for React app components. 

The following are the benefits of using styled-components in your application:

* CSS Automation: By using styled-components as your preferred CSS-in-JS solution, it keeps track of which components are active and rendered on the page to inject all styles related to that component automatically, which increases the speed of loading your application.
* Maintenance: As with other CSS-in-JS solutions, you can maintain your CSS codebase easily and track styles affecting your component without having to check through multiple CSS files.
* CSS Deletion: Deleting CSS styles is made more comfortable, styled-components make it evident as to which component is unused, and deleting such components automatically deletes all styles related to that component.

The above are some of the benefits of using styled-components as your preferred choice of CSS-in-JS solutions. You can view how styled-components handle CSS in JavaScript from [here](https://github.com/styled-components/styled-components#example), and you can also follow this [guide](https://www.styled-components.com/docs/basics#installation) to installing styled-components in your React application. 

3. Styletron: Styletron is another CSS-in-JS library that works with plain JS, React, and other frontend frameworks. 
Styletron has some great features which will be examined shortly, but the distinct feature that sets Styletron apart from other CSS-in-JS solutions is the ability to use media queries and other CSS selectors which couldn’t be done via inline styles.

Well, apart from the cool feature of declaring media queries, here are some of the benefits of using Styletron:

* Performance: To ensure high performance, Styletron follows the critical rendering concept by generating styles when needed by the demanding components. With this, browsers only load CSS rules that are currently in use rather than processing all CSS rules in one go.

* Portability: Styletron ensures portability by ensuring declaration of styles written in JavaScript within your component, providing the same experience as using inline styles but all in a CSS-in-JS solutions. 

Styletron provides the above distinct advantages when used, the same advantages to other CSS-in-JS solutions also apply to it. You can get started with Styletron [here](https://www.styletron.org/getting-started).

4. Emotion
Like every other CSS-in-JS library, Emotion is a performant and flexible CSS-in-JS solution. Emotion makes use of String and Object styles to write CSS in JavaScript, and even better it ensures improved runtime performance by parsing styles with Babel and PostCSS.

Emotion took into consideration approaches taken by other CSS-in-JS solutions like [styled-components](https://www.styled-components.com/) and [glamor](https://glamorous.rocks/basics), so you tend to enjoy the same benefit as them. However, despite the foundation of existing solutions, Emotion was designed to solve the issue of specificity in CSS.

Getting started with Emotion is also easy, you can follow this [guide](https://emotion.sh/docs/install) to start using Emotion in your project, and you can check out live code of Emotion Strings and Objects in declaring CSS styles in JavaScript [here](https://5bb1495273f2cf57a2cf39cc--emotion.netlify.com/).

5. Material UI: Material UI is a React component that aims to ensure fast and easy web application development. The material UI is not only restricted to material UI components, but you can also employ the CSS-in-JS solution through the @material-ui/styles package you can find [here](https://www.npmjs.com/package/@material-ui/styles).

Material UI has been using LESS and Inline CSS to style components, but that has come to an end since the modification to take full advantage of CSS-in-JS. Material UI also has similar advantages to styled-components. 

In favor of performance, Material UI uses JSS as its core, which ensures speedy compilation from JS to CSS both at runtime and server-side. Material UI is small in size, occupying just 15kb gzipped space. Follow this [guide](https://material-ui.com/) to get started with the installation.

### Conclusion
CSS-in-JS changes the perspective of web application development from specificity to modularity. You now have a list of modern CSS-in-JS solutions you can use in combination with web components with links to get you started.
