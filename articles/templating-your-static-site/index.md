# Templating Your Static Site (Converting a Static Site to a Static Site Generator)

Static sites are much easier to develop and deploy than full-stack dynamic web apps. You don’t have to pay monthly hosting charges (if you use a free hosting provider like [Netlify]**Link here**) and if you use a CSS framework like Bootstrap **Link here** or Material **check name** it only takes a basic knowledge of HTML and CSS to code a simple website. **Insert reference to articles you’ll write about designing and developing static websites**

However, for more complex multi-page websites, a static site may not be suitable. Every time you want to add content, a new page has to be created and coded. If you change something that appears on multiple pages then you’d have to change it everywhere. That’s where static site generators come in. They bring the power of templating to static sites.

There are many static site generators (Hugo, Gatsby, to name a few **links and add more**) but we will use Eleventy because it’s easy to use and flexible. It uses vanilla JavaScript and allows multiple template languages to be mixed and matched so you don’t have to learn a new language or templating system. Static site generators work by taking the layout templates you’ve created and building the pages using the template and data you’ve provided.

**Swap these paragraphs around?**

Templating (see Converting a Static Site to a Dynamic NodeJS Web App **link** for more info **maybe link later when I mention EJS**) lets you reuse code by inserting it into multiple places and add dynamic data. There are a variety of templating languages such as Nunchucks, Liquid, Pug and Handlebars **Link to them** but the one we’ll be using is EJS **link**.

## Installing Eleventy

