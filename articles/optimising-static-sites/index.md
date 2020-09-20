# Optimising a Static Site: Best Practises

## Table of Contents

## Introduction

Static sites by default are lean and fast compared to full-stack web applications since there's no server-side code involved (except if you use [serverless functions](https://docs.netlify.com/functions/build-with-javascript)). However, there are best practises to get the page load speed possible. 

For example, it would defeat the purpose of choosing a static site if you had a 10MB image displayed.

In this article, you'll learn the best practises for optimising a static site such as image optimisation, CSS and JS minification and the best location to include stylesheets and scripts. 

Also, you'll learn the ideal use cases for different optimisation methods such as using a content delivery network (CDN) for assets versus hosting them locally, bundling scripts and stylesheets together versus seperately and if it's ever a good idea to write inline CSS and JS.

Finally, you'll discover different speed-testing tools, find out which matters most and the metrics you should pay attention to.

## Three Ways to Optimise Your Static Site


### A Brief Guide to Image Optimisation

Briefly cover image optimisation and link to Section article with further detail - one you reviewed

### CSS and JS Minification

Cover CSS and JS Minification. Mention tools that do this manually and automatically. Mention libraries often come in a slim and minified format and explain this.

Can have unminified files in root folder and manually minified ones in a public folder. Netlify let's you easily pick publication folder in Git Repo.

## When Opposing Optimisation Methods Collide - The Ideal Use Cases of Each?


### Should you use CDNs for JS libraries and fonts or host them locally?

Mention the fastest Google Font code (preload etc.) from CSS Wizardry site and the difference between FOUT and flashes of unstyled text etc.

Mention variable fonts and picking only needed weights.

Users may already have CDNs cached.

### Is it better that bundle scripts and stylesheets together or use them seperately? 

Reducing requests to bundle them together. Better if code in scripts and stylesheets is used in every page. Mention bundling tools.

If code is only used on certain pages, better to split the CSS file into multiple and link to them on only required pages. Use my site as an example (animation.css/testimonial.js)

### Is it ever okay to write inline CSS and JS

For unique styles and scripts, only needed in one place, it's best to inline it for best performance.

You can also use an optimisation method called critically inline which means all the necessary code for the webpage to function is inlined and the extra code is contained in stylesheets and scripts and its loading is deferred.

## Speed Testing Tools

use Eleventy leaderboard/Speedlify/Google Lighthouse as speed testers

## The Most Important Speed Testing Tools

Discover different speed-testing tools, find out which matters most and 

## The Most Important Metrics in Speed Tests

the metrics you should pay attention to.

## Conclusion

Link to similar Section WordPress article you reviewed (and perhaps in Introduction too). 

Mention Eleventy as an alternative to Node.js and WordPress and link to relevant articles (Eleventy and Node.js)