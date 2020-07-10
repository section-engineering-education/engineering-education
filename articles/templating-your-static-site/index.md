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
`Processed X files in number of seconds (version number)`.

## Serving Your Static Site using Eleventy

The second step is to be able to serve your current site using Eleventy.

To do so, you'll have to create a config file and add some settings to it which will tell Eleventy how to handle your images, CSS and JavaScript.

In the root folder of your site, create a JS file called .eleventy.js and include the following:

```js
module.exports = function (eleventyConfig) {
    eleventyConfig.addPassthroughCopy('img');
    eleventyConfig.addPassthroughCopy('css');
    eleventyConfig.addPassthroughCopy('js');
    return {
        passthroughFileCopy: true
    };
};
```
This will tell Eleventy when it builds your website to just copy the img, css and js folders across (which is called passthrough copy) so you can link them to them in your code.

Now run `npx @11ty/eleventy` and it should have built your website and output the result to the _site folder. Congratulations, you've just finished the first Eleventy build of your website.

**Tip:** If you're using the version control software, Git **link to a section article on Git** manage your code then it would be a good idea to add the _site folder to your .gitignore file. This will stop you commiting your _site folder to Git which prevents the constant uncommitted changes warning. 

## Creating Your First EJS Partial

**Note:** If you've followed my [Converting a Static Site to NodeJS tutorial] **link and grab full title** where you learned EJS or prefer to use a different templating language then feel free to skip to the next section, [Creating Your First Layout File]**Anchor link**.

Now that your site is up and running on Eleventy, we can get to the templating part.

EJS partials are a way of reusing pieces of code for example, if you created an EJS partial of your website's header then it could be referenced on all your website's pages. In the future, if you decided to add a new menu item then you would only need to update one file.

Create a folder in the root of your website called _includes. This is where Eleventy looks for templates.

**Tip:** A naming convention you may wish to use is to add an _ to your template files so _head.ejs.

**Explain the StackOverflow answer to fix any issues with the tip**

In your _includes folder, add a file called _head.ejs and copy and paste the content of your website's head section. Don't worry if the content differs between pages such as the title tag. We will cover how to use EJS variables with Eleventy in the Adding Front-Matter section **Link here** so such values can be unique for each page.

Add new partial files for other repeated elements such as the header and footer.

## Creating Your First Layout (Template) File

With the partials created, you can now create your first layout file (template.) 

The first layout (often named base layout) will form the basic template of all your pages and will contain the EJS partials (head, header and footer) that you've just created.

**Tip:** Another naming convention that you may want to use is to add -layout at the end of your layout files. This helps to diffrentiate them from your partials.

In the _includes folder, create a file called _base-layout.ejs file and add the following to it:

```html
<!doctype html>
<html lang="en">
<head>
    <% include _head.ejs %>
</head>
<body>
    <% include _header.ejs %>
    <main>
        <%- content %>
    </main>
    <% include _footer.ejs %>
</body>
</html>
```
If you're new to EJS, `<% include` is the code (syntax) for including a partial file and `<%-` is for including an EJS variable. Content is a variable Eleventy uses to add the body content of HTML, Markdown and other input files.

Congratulations, you've just created your first Eleventy layout file. 

## Adding Front-Matter (should this be a sub-heading in previous section?)

We have our basic layout template but we need to tell Eleventy where to use it. This is where front-matter comes in.

Front-Matter allows you to define variables you can use in your layout templates both built-in (from Eleventy) and those you've created yourself. By default, Eleventy uses YAML for front-matter though you can change it to JSON or even JavaScript if you prefer.

The most basic front-matter variable, layout will instruct Eleventy which layout file to use to render a page.

On one of the HTML pages of your site, remove the code you included in EJS partials (head, header and footer if you followed the tutorial.)

Then, add the following layout front-matter at the beginning:

```yaml
---
layout: _base-layout.ejs
---
```
The three dashes define the start and the end of the front-matter.

Any pages will just have the content and front-matter

## Creating a Page Template (Layout Chaining)

## Deploying Your First Static Site Generator Website

Netlify
