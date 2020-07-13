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
Static sites are much easier to develop and deploy than full-stack dynamic web apps. You don’t have to pay monthly hosting charges (if you use a free hosting provider like [Netlify](https://www.netlify.co) and if you use a CSS framework like [Bootstrap](https://getbootstrap.com) or [Materialize](https://materializecss.com) it only takes a basic knowledge of HTML and CSS to code a simple website. **Insert reference to articles you’ll write about designing and developing static websites**

<!--more-->

However, for more complex multi-page websites, a static site may not be suitable. Every time you want to add content, a new page has to be created and coded. If you change something that appears on multiple pages then you’d have to change it everywhere. That’s where static site generators come in. They bring the power of templating to static sites.

There are many static site generators, [Hugo](https://gohugo.io), [Gatsby](http://gatsbyjs.org) and [Next.js](http://gatsbyjs.org) to name a few but we will use Eleventy because it’s easy to use and flexible. It uses vanilla JavaScript and allows multiple template languages to be mixed and matched so you don’t have to learn a new language or templating system. Static site generators work by taking the layout templates you’ve created and building the pages using the template and data you’ve provided.

**Swap these paragraphs around?**

Templating (see Converting a Static Site to a Dynamic NodeJS Web App **link** for more info **maybe link later when I mention EJS**) lets you reuse code by inserting it into multiple places and add dynamic data. There are a variety of templating languages such as [Nunchucks](https://mozilla.github.io/nunjucks), [Liquid](https://shopify.github.io/liquid), [Pug](https://pugjs.org/api/getting-started.html) and [Handlebars](https://handlebarsjs.com) but the one we’ll be using is [EJS](https://ejs.co).

## Installing Eleventy

The first step is to install Eleventy which will be done through the package manager, NPM. New to NPM? Check out my installation guide **(link to NPM install in Converting a Static Site to a Dynamic NodeJS Web App article)**.

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

Now that your site is up and running on Eleventy, we can get to the templating part.

EJS partials are a way of reusing pieces of code for example, if you created an EJS partial of your website's header then it could be referenced on all your website's pages. In the future, if you decided to add a new menu item then you would only need to update one file.

Create a folder in the root of your website called _includes. This is where Eleventy looks for templates.

**Tip:** A naming convention you may wish to use is to add an _ to your template files so _head.ejs.

In your _includes folder, add a file called _head.ejs and copy and paste the content of your website's head section. Don't worry if the content differs between pages such as the title tag. We will cover how to use EJS variables with Eleventy in the Adding More Front-Matter section **Anchor Link** so such values can be unique for each page.

Add new partial files for other repeated elements such as the header and footer.

## Creating Your First Layout (Template) File

With the partials created, you can now create your first layout file (template.) 

The first layout (often named base layout) will form the basic template of all your pages and will contain the EJS partials (head, header and footer) that you've just created.

**Tip:** Another naming convention that you may want to use is to add -layout at the end of your layout files. This helps to differentiate them from your partials.

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

##  Rendering Your First Layout File

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

Run `npx @11ty/eleventy --serve` in the terminal to start a local web-server for your site that will reload on changes. 

Go to `http://localhost:8080/nameofhtmlfile` to view the page. It should display the head, header and footer as well as the content of the page.

Congratulations, you've successfully converted your first static HTML page to use an EJS Eleventy layout file.

## Adding More Front Matter

Remember how we templated your website's header so that all the meta tags would be the same? Now that you've added your first piece of front-matter, we can add some more to account for unique values like different page titles.

First, In your partial pages (such as _head.ejs), remove everything inside the content attribute of your meta tags and replace it with EJS variables like the example below:

```html
<meta property="og:title" content="<%- title %>">
<meta property="og:description" content="<%- short_description %>">
```
Adding - after <% definites it as an EJS variable rather than a partial file which we did before. The values such as title and short-description are the names of the variables which we will use in the front-matter.

Next, in one of your HTML pages, add the EJS variables you've just created and the content you want to add like so:
```yaml
---
layout: _base-layout.ejs
title: About Louise Findlay - Front-End Web Developer
short_description: Louise Findlay has designed and developed over 20 static websites.
---
```
Finally, check on your website and the front-matter content you've just added should be reflected in the code. If not, make sure you've run `npx @11ty/eleventy --serve` in the terminal to make your website automatically reload on changes.

## Creating a Page Template (Layout Chaining)

You've just created your basic layout containing the elements present on every page but what if you have a custom layout for only a select number of pages such as for products? This is where layout chaining comes in.

Layout chaining is how you can combine multiple layout files. You create a secondary (or as many layers as you want) layout file which uses the base layout in the exact same way as you linked it to a HTML page.

Create a file called _(layoutname)-layout.ejs in the _includes folder and add the layout front-matter to link it to your base layout (in the exact same way you did for your HTML file.)

Then add all the code that is identical throughout all your template pages. For example, if every product page had a section with three images, then add the section and div tags but remove the image tags since each image is unique.  In its place, add an EJS variable tag such as `<%- product_image1 %>`. See the example below:

```html
<section id="test1" class="product">
        <div class="flex-item">
            <picture>
                <%- product_image1 %>
            </picture>
        </div>
</section>
```
Add the image tags to the front-matter of the HTML page and change the layout: to your new layout file.

Remove the HTML you've just templated from the HTML page and check on your website. It should now display the HTML from the layout file with the images you added in the page's front-matter.

Congratulations you've just used layout chaining for the first time. You can create new templates for different parts of your website. The beauty of Eleventy is you can template as little or as much as you like.

## Deploying Your First Static Site Generator Website

You've converted your first static website to a static site generator but now you need to deploy it to a web hosting platform. 

There are many hosts for static sites but we will use [Netlify](https://www.netlify.com) because it's easy to use and has a generous free plan. 

If you're using Git for source control and using a provider like Github (which is highly recommended), then once you've created a Netlify account, click Sites and then New Site from Git. In basic build settings, change the build command to eleventy and the publish directory to _site. This instructs Netlify how to build your site after every change you've pushed to Github.

Otherwise, just drag and drop the _site folder into the space instructed on the Sites page on Netlify. This will deploy your website but won't automatically update once you've made changes. You'll have to update your website's files manually every time. 

Congratulations, you've finished converting your first static site to a static site generator and deployed it to the web. Think of it as a great middle ground between a static site and a full-blown CMS (content management system) or full-stack web app.

Look out for Part 2 where you can learn how to create a blog using Eleventy and create archive pages using Eleventy collections.

