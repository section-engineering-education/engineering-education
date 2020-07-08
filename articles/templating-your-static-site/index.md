---
layout: engineering-education
status: publish
published: true
slug: templating-your-static-site
title: Templating Your Static Site (Converting a Static Site to a Static Site Generator)
description:
author: louise-findlay
date: 2020-07-08T00:00:00-07:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/templating-your-static-site/hero.jpg
    alt:
---
Static sites are much easier to develop and deploy than full-stack dynamic web apps. You don’t have to pay monthly hosting charges (if you use a free hosting provider like [Netlify]**Link here**) and if you use a CSS framework like Bootstrap **Link here** or Material **check name** it only takes a basic knowledge of HTML and CSS to code a simple website. **Insert reference to articles you’ll write about designing and developing static websites**

<!--more-->

However, for more complex multi-page websites, a static site may not be suitable. Every time you want to add content, a new page has to be created and coded. If you change something that appears on multiple pages then you’d have to change it everywhere. That’s where static site generators come in. They bring the power of templating to static sites.

There are many static site generators (Hugo, Gatsby, to name a few **links and add more**) but we will use Eleventy because it’s easy to use and flexible. It uses vanilla JavaScript and allows multiple template languages to be mixed and matched so you don’t have to learn a new language or templating system. Static site generators work by taking the layout templates you’ve created and building the pages using the template and data you’ve provided.

**Swap these paragraphs around?**

Templating (see Converting a Static Site to a Dynamic NodeJS Web App **link** for more info **maybe link later when I mention EJS**) lets you reuse code by inserting it into multiple places and add dynamic data. There are a variety of templating languages such as Nunchucks, Liquid, Pug and Handlebars **Link to them** but the one we’ll be using is EJS **link**.

## Installing Eleventy

The first step is to install Eleventy which will be done through the package manager, NPM. New to NPM? Check out my installation guide **(link to NPM install)**.

Create a package.json file using `npm init -y` and then install Eleventy using `npm install --save-dev @11ty/eleventy`.

To test the install, run `npx @11ty/eleventy` which should return:
`Processed 0 files in number of seconds (version number)`.

## Creating Your First EJS Partial

**Note:** If you've followed my [Converting a Static Site to NodeJS tutorial] **link and grab full title** where you learned EJS or prefer to use a different templating language then feel free to skip to the next section, [Creating Your First Layout File]**Anchor link**.

## Creating Your First Layout File

**Tip:** Adding _site folder to .gitignore. **Explain the StackOverflow answer to fix any issues with it**

Creating the base layout with the EJS partials (head, header and footer).

Any pages will just have the content and front-matter

## Adding Front-Matter (should this be a sub-heading in previous section?)

## Creating a Page Template (Layout Chaining)

## Deploying Your First Static Site Generator Website

Netlify
