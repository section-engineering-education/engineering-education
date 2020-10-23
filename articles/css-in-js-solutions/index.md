---
layout: engineering-education
status: publish
published: true
url: /engineering-education/css-in-js-solutions/
title: CSS-in-JS solutions
description: This article will cover various techniques a developer can use in defining styles within app components during development than maintaining multiple stylesheets for a single app component.
author: aransiola-ayodele-leom
date: 2020-10-21T00:00:27-21
topic: [CSS-JS Solutions]
excerpt_separator: <!--more-->
images:

    - url: /engineering-education/css-in-js-solutions/hero.jpg
      alt: code view on a laptop
---
The modern web is now written in components and not pages. CSS was designed to declare styles in different files(.CSS) for each page of your web application, and this structure makes it challenging to maintain multiple stylesheets for multiple pages.
<!--more-->
### CSS-IN-JS Solutions
Maintaining multiple stylesheets for a single app component keeps your project verbose and unkempt, which makes modification a bit unpleasant, notably when you have over two thousand lines of code serving as style definitions for each of your app components.

However, simplicity comes into play with CSS-in-JS solutions in application development. With CSS-in-JS, you can now keep your project workflow simple by defining styles within the same component of your app rather than maintaining external stylesheets for each component.

## CSS and CSS-in-JS Pros and Cons

Comparing CSS and CSS-in-JS could be debatable which is subject to bias, but the simple fact is that as a developer you are expected to choose what works best for you and what ensures a smooth workflow in development.

The understanding of the underlying concept of these two terms is easy. With CSS, styles are declared in a single CSS file, while with CSS-in-JS styles are declared in JavaScript assigned to a variable. The image below depicts a code illustration of CSS styles declared into a javascript variable name font.

![A code example of style declaration in the javascript variable font](/engineering-education/css-in-js-solutions/js.png) 

When it comes to large scale app development, settling for CSS-in-JS proposes many advantages than maintaining separate CSS files for each app components, in light of these, the following are the pros and cons of using CSS-in-JS and CSS:

## Pros of Using CSS

#### Performance

The use of inline styles enhances website performance because the browser loads styles in elements faster before loading external styles.

#### Reduction in Redundancy

With inline styles, you can avoid redundant code and only declare styles to a particular element when needed, this way, all unnecessary code stays out of the code and at the mercy of the delete button.

#### External stylesheet

Inline-styles aren't the only golden property of CSS. External stylesheet keeps your codebase organized and allows you to store all CSS code within a single file and reference them in documents that require them.


## Cons of CSS

#### Overriding styles

Overriding styles is a bit of an issue without the  !important  keyword. When you use inline styles and try to override them in your stylesheet, you can't do that without using the !important  keyword.

#### Scope

Applying styles to a particular tag can only be done via inline stylings, specificity to HTML elements make your code difficult to maintain, especially when applying inline styles and external style to a particular element.

#### Performance

Using an external stylesheet slows down the performance of your website since all CSS files referenced are loaded at once even when the page needing them is not currently rendered.

## Pros of CSS-in-JS

#### Enhanced CSS

Enhanced CSS is as a result of writing CSS in JavaScript files by leveraging on the full power of JavaScript.

#### Modularity

CSS-in-JS uses the modularity approach by thinking in components(abstracting CSS for a particular component) rather than building CSS for each document.

#### Load Time

CSS-in-JS improves the load time of web applications by loading CSS that is currently required by active components in view rather than loading all CSS in a go.

## Cons of CSS-in-js

#### Requires Javascript

CSS-in-JS can only be used with javascript frameworks like React JS, Angular JS, and many more, which imposes a limitation to new developers trying to adapt CSS-in-JS.

Conclusively, CSS-in-JS could be a savior without specific cons to this method of writing CSS. However, each library of CSS-in-JS has its tradeoffs when compared to others.

  
There are several approaches to adapting CSS-in-JS within your web application. In this article, the following CSS-in-JS solutions are examined in brief:

-   JSS
-   Styled-Components
-   Styletron
-    Emotion
-   Material-UI
    
### JSS

JSS is one of the options for CSS-in-JS solutions which provides you with the flexibility of using Javascript to describe styles in your app component. It blooms on its reusability and declarative way of applying styles to your web app. To dive in further, here are the benefits of using JSS in your project:

 1. Conflict-free Selectors: JSS ensures that CSS selectors are collision-free by generating unique class names, which eliminates the need for following naming conventions in CSS.

2. Real CSS: JSS does not convert your CSS code to inline styles when passed to elements to be rendered on the web, and it still maintains the use of real CSS.

3. Reusability: With the application of javascript modules, variables, and functions, you can store CSS rules and call upon them in multiple instances without having to declare CSS rules for every element within your app component every time they are needed.

4. Easy Modification: With JSS, making changes becomes more comfortable, because you only need to run down on where you declared the CSS rules and make necessary changes if any within the variable or function, and changes take effect where the variable or functions are applied.

Conclusively, JSS can be easily integrated into your react application. Follow this [guide](https://cssinjs.org/setup) to get started with JSS, and you can see a live code [here](https://codesandbox.io/s/z21lpmvv33) of CSS-in-JS in action with JSS.

### Styled-Components

Styled-components are one of the most used CSS-in-JS solutions in app development. It ensures the usage of ES6 and CSS to style your application with template literals and CSS; you can easily style app components.
With an intense focus on improving user experience, styled-components are designed to enhance CSS styling for react app components. The following are the benefits of using styled-components in your react app:

1. CSS Automation: By using styled-components as your preferred CSS-in-JS solution, it keeps track of which components are active and rendered on the page to inject all styles related to that component automatically, which increases the speed of loading your application.

2. Maintenance: As with CSS-in-JS solutions, you can maintain your CSS codebase easily and track styles affecting your component without having to check through multiple CSS files.

3. CSS Deletion: Deleting CSS styles is made more comfortable, styled-components make it evident as to which component is unused, and deleting such components automatically deletes all styles related to that component.
The above are some of the benefits of using styled-components as your preferred choice of CSS-in-JS solutions. You can view how styled-components handle CSS in javascript from [here](https://github.com/styled-components/styled-components#example), and you can also follow this [guide](https://www.styled-components.com/docs/basics#installation) to installing styled-components in your react application.

### Styletron

Styletron is another CSS-in-JS library that works with plain JS, React, and other frontend frameworks.
Styletron has some great features which will be examined shortly, but the distinct feature that sets Styletron apart from other CSS-in-JS solutions is the ability to use media queries and other CSS selectors which couldn’t be done via inline styles. Well, apart from the cool feature of declaring media queries, here are some of the benefits of using Styletron:

1. Performance: To ensure high performance, Styletron follows the critical rendering concept by generating styles when needed by the demanding components. With this, browsers only load CSS rules that are currently in use rather than processing all CSS rules at a go.

2. Portability: Styletron ensures portability by ensuring declaration of styles written in javascript within your component, providing the same experience as using inline styles but all in CSS-in-JS solutions.

Styletron provides the above distinct advantages when used, the same advantages to other CSS-in-JS solutions also apply to it. You can get started with Styletron [here](https://www.styletron.org/getting-started).

### Emotion

Like every other CSS-in-JS library, Emotion is a performant and flexible CSS-in-JS solution. Emotion makes use of String and Object styles to write CSS in Javascript, and better it ensures improved runtime performance by parsing styles with Babel and PostCSS.

Emotion took into consideration approaches taken by other CSS-in-JS solutions like styled-components and glamor, so you tend to enjoy the same benefit as them. However, despite the foundation of existing solutions, Emotion was designed to solve the issue of specificity in CSS.

>Getting started with Emotions is also easy, you can follow this [guide](https://emotion.sh/docs/install) to start using Emotion in your project, and you can check out a live code of Emotion Strings and Objects in declaring CSS styles in javascript [here](https://5bb1495273f2cf57a2cf39cc--emotion.netlify.com/).

### Material UI

Material UI is a react component that aims to ensure fast and easy web application development. The material UI is not only restricted to material UI components, but you can also employ the CSS-in-JS solution through the @material-ui/styles package you can find [here](https://www.npmjs.com/package/@material-ui/styles).
Material UI has been using LESS and Inline CSS to style components, but that has come to an end since the modification to take full advantage of CSS-in-JS. Material UI also has similar advantages to styled-components.

In favor of performance, Material UI uses JSS as its core, which ensures speedy compilation from JS to CSS both at runtime and server-side. Material UI is small in size, occupying just 15kb gzipped space. 

## Conclusion

CSS-in-JS changes the perspective of web application development from specificity to modularity, and towards implementing CSS-in-JS aptly, you now have a list of preceding CSS-in-JS solutions examined in brief with links to get you started.
