---
layout: engineering-education
status: publish
published: true
url: /how-to-build-astatic-site-with-gatsbyjs/
title: How to Build a Static site with Gatsby.js
description: This tutorial will help developers on how to get started building their very first static site using Gatsby.js. It will cover the the advantages JAMstack and Gatsby.js.
author: jethro-magaji
date: 2020-11-22T00:00:00-16:00
topics: [Node.js]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/how-to-build-astatic-site-with-gatsbyjs/hero.png
    alt: hero example image computer Node.js
---
The goal for this tutorial is to help you get started with building your very first static site using Gatsby.js.
<!--more-->
Gatsby.js is used to build websites powered by [JAMstack](https://jamstack.org/what-is-jamstack). JAMstack is a modern framework for creating websites and software.

“JAM” is an acronym for JavaScript, APIs, and HTML markup. JAMstack sites don’t need a database, unlike websites designed using WordPress or Drupal.

In JAMstack architecture, the front-end and back-end are separated ([decoupled](https://www.Gatsby.js.com/docs/glossary/#decoupled)) so you can use whatever front-end you choose. During the building process, Gatsby creates JavaScript, HTML, and CSS files used for the front-end, while the back-end can be a content management software that allows modification and creation of contents, a hosted datastore, or a custom application that returns JSON or XML.

[Matt Billmann](https://www.netlify.com/oreilly-jamstack/) and [Chris Bach](https://www.linkedin.com/in/christianbachdk/) came up with the name “JAMstack” because they were creating modern web development workflows and capabilities at Netlify.

### Advantages of JAMstack architecture
- **Speed**: They load faster than sites using [monolithic architectures](https://whatis.techtarget.com/definition/monolithic-architecture#) i.e. sites where contents are only parsed as HTML.
- **Flexibility for hosting**: Being a static file, JAMstack sites can be hosted anywhere. To get the best performance and security, it's preferable to use a cloud storage service and content delivery networks such as [Netlify](https://www.netlify.com/), [Render](https://www.Gatsby.js.com/docs/deploying-to-render/), or Amazon Web Services’ [S3 and CloudFront](https://www.Gatsby.js.com/docs/deploying-to-s3-cloudfront/) because they provide many integrations and protection against server side attack.
- **Improved security**: Because JAMstack sites don’t have software layers and databases (back-end), this makes them invulnerable to server-side code injection.
- **An enhanced experience for developers**: Front-end developers can build JAMStack sites without a server-side language and back-end developers can focus on building APIs rather than creating databases.

### What is Gatsby.js?
>Gatsby.js can be defined as a static site generator that uses [React.js](https://reactjs.org/) (for the client-side) and [GraphQL](https://graphql.org/) (to access data) to build a reliable and faster website.

Static site generators can be defined as software applications that generates HTML pages from templates or components. Light-weight markup language such as [markdown-formatted](https://www.markdownguide.org/getting-started/#) text files are used by most static site generators.

Static site generators are different from content management systems such as WordPress and Drupal that are powered by databases.

Other static site generators used for JAMstack Sites include [Next.Js](https://nextjs.org/), [Hugo](https://gohugo.io/), [Jekyll](http://jekyllrb.com/), [Hexo](https://hexo.io/), [Slate](https://slatedocs.github.io/slate/), [Nuxt.js](https://nuxtjs.org), [GitBook](https://www.gitbook.com/), [Docusaurus](https://v2.docusaurus.io/) and [more](https://jamstack.org/generators/).

**Advantages of Gatsby.js**
- Creating a static site with Gatsby.js. is [faster](https://www.Gatsby.js.com/contributing/how-to-pitch-gatsby/).
- It's easy to set up.
- It's scalable.
- It has a great [community of developers](https://www.Gatsby.js.com/contributing/community/).

### Prerequisites
To get started with Gatsby.js, you'll need some background knowledge on the following:
- [React.js](https://reactjs.org/) (the basics, components, etc.).
- [Node.js](https://nodejs.org/en/) (the basics, [npm](https://www.npmjs.com/), etc.).
- [GraphQL](https://graphql.org/) (the basics and advanced).


### Installations
First, you'll need to install [Node.js](https://nodejs.org/en/) on your computer.
Go to the [official Node.js website](https://nodejs.org/en/) to download the Node.js version for your operating system.
Installing Node.js also comes with a node package manager pre-installed.

To confirm you have Node.js and node package manager (npm) installed, open up your terminal and type in:

```bash
node –version
```

This command is to verify you have Node.js installed and to see your current version.

```bash
npm –version
```

This is to verify you have the node package manager installed and to see your current version.

Next, in your terminal type in:

```bash
npm install –global gatsby-cli
```

You just installed Gatsby and its command-line interface globally on your computer.

To confirm you have Gatsby installed, type in:

```bash
gatsby –version
```

This command will show you the current version of Gatsby.js you have installed.

### Creating a new Gatsby.js site
Now let's create a static site using Gatsby.js.

Open up the terminal.

In your code editor if you are using [VS Code](https://code.visualstudio.com/), it comes built-in with a terminal. You'll be using the Gatsby.js site template from GitHub to create your site from scratch.

First, create a folder with the name **my-first-gatsby-site** by typing this command in your terminal.

```bash
mkdir my-first-gatsby-site
```

Then clone the Gatsby template site by typing this in your terminal:

```bash
Users/my-first-gatsby-site: gatsby new first-gatsby-site https://github.com/Gatsby.js/gatsby-starter-hello-world
```

To see the new site you have created, check it out using the commands below.

Go into the file directory you have just created:

```bash
cd first-gatsby-site
```

Next:
```bash
npm run develop
```

This will run your site on a development level, where you can access it on your computer using the Localhost.

You will then get a success message saying *“your site is running at”*:
`http://localhost:8000`

You can now open up your web browser and access the site by going to `http://localhost:8000`:

Open `http://localhost:8000` in your browser and you will see "hello world" displayed.

Congratulations! You just built your first static site using Gatsby.js.

Now let’s talk about your file directory.

-	**The node-modules folder:** This contains a bunch of files you may or may not need.
-	**The public folder:** This contains all of your finished static sites that would be served on a cloud server.
-	**The src folder:** This is the folder you will be using the most because this is where you are going to store the pages you're building for your site.

You'll find an ***index.js*** file in the pages folder because Gatsby uses *Node.js* and *React.js* these files will be JavaScript files but you can also use a markdown file as well, with the file extension of '.md'.

-	**The gitignore file:** This file tells GitHub to ignore whatever file you specify in it, for example API keys.
-	**The package.json:** Contain the dependencies or packages you have installed using the node package manager *“npm install”*. The node package manager is the package manager for Node.js JavaScript platform, this allows you to import other external dependencies or modules making your work faster without reinventing the wheel to build your own tools from scratch.

### Adding content to the site
Let's modify the look and feel of the site.

In the index.js file, add this piece of code:
```JavaScript
// index.js code
import React from "react"

export default function Home() {
return <div style={{ color: 'tomato' }}>
    <h1>Hello world!</h1>
    // Your new paragraph or content
    <p>Welcome to my first Gatsby site</p>
</div>
}
```

This React code returns a div containing a h1 tag and paragraph tag styled with a tomato color.

### Linking between pages
What if you want to have 2 or more pages? To do this create another page and link them together so that you can easily navigate through the added pages.

First, import a Gatsby react link and add it to the top of the index.js file:
`import { Link } from "gatsby"`.

Secondly, create a .js file with the name **page-2.js** in the pages folder and add this code snippet:

```JavaScript
//page-2 code
import React from "react"
import { Link } from "gatsby"

export default function Home() {
    return <div style={{ color: 'tomato' }}>
        <h1>Welcome to Page 2</h1>
        // To go back to the homepage
        <Link to="/">Back</Link>
    </div>
}
```

This React code returns a div containing a h1 tag and Gatsby link styled with a tomato color.

Then finally link it using the Gatsby link by placing this code in the index.js file to connect it to the page-2.js file:

```bash
<Link to=”/page-2/”>Page 2</Link>
```

This Gatsby link connects the index.js file to page-2.js file using a link.

### Counter.js file
We'll now make the site more interactive by adding a counter to the site, where you can click on a **plus** button to increase a number and a **minus** button to decrease a number.

Create a counter.js file in the pages folder and then add this code snippet:
```JavaScript
//counter code
import React from "react"

class Counter extends React.Component {
    constructor() {
        super()
        this.state = { count: 0 }
    }
    render() {
        return <div style={{ color: 'blue' }}>
            <h1>Counter</h1>
            <p>current counter: {this.state.count}</p>
            //plus button
            <button onClick={() => this.setState({ count: this.state.count + 1 })} style={{ color: 'tomato' }}>PLUS</button>
            //minus button
            <button onClick={() => this.setState({ count: this.state.count - 1 })} style={{ color: 'tomato' }}>MINUS</button>
            <br></br>
            <br></br>
            <br></br>
            // To go back to the homepage
            <Link to="/">Back</Link>
        </div>
    }
}

export default
```

This React code has a class named "Counter" that extends a stateful React Component with a constructor of initial count state set to 0.

Then it renders a div tag styled with blue color containing a h1 tag, paragraph tag displaying the current count, a button tag styled tomato color labeled "PLUS" that sets the state of the counter by adding 1 to the current count.

It also has a button tag styled tomato color labeled "MINUS" that sets the state of the counter by subtracting 1 from the current count.

### Using React components
Using React components to build your static site will help you get the job done faster. You can make your code reusable by making it a React component, these code snippets can be used independently or in any of your React code file.

A React components can be either a class component or a function component, a class component extends a React. Component that creates an inheritance to the React.

Component gives access to the functions, while the function component doesn't extends the React component.

It's recommended that you check out the [React component documentation](https://reactjs.org/docs/react-component.html) to gain a better understanding of React components.

The counter code in your counter.js file is already a component because it extends the React component class.

You will use it in the index.js file but as a component, by adding this piece of code.

```bash
<Counter></Counter>
```

Also, import the counter component by placing this code at the top:
`import { Link } from "gatsby"`

### Using plugins in Gatsby.js
Gatsby.js offers [plugins](https://www.Gatsby.js.com/plugins/) built by a community of developers to extend the functionality of your site.

We'll be using a plugin for [Typogyaphy.js](https://kyleamathews.github.io/typography.js/) (a CSS framework) to style up the CSS by default.

To use this plugin, enter this code snippet:

```bash
npm install gatsby-plugin-typography react-typography typography
```

This command installs the node package for the Gatsby React typography.js plugin.

When the installation is complete go to the *gatsby-config.js* file.

Gatsby needs a way of knowing that this plugin will be used.

Add these lines of code in the *gatsby-config.js* file.

```JavaScript
//plugin code
module.exports = {
plugins: [ `gatsby-plugin-typography`]
}
```

This code adds the Gatsby typography.js plugin.

### Building the site on a web server
Your site has been running on your local server, which is `http://localhost:8000`.

To get your Gatsby site ready for cloud deployment you will need to build it using this command:

```bash
npm run build
```

Gatsby will build the site by generating a static HTML and JavaScript code bundles.

You'll notice some changes in the public folder that’s where your static site files are. If you want to host it on a web server you could copy the public folder and place it on a server.

Otherwise, you could use a cloud static site server like Amazon, Google, Netlify, Gatsby Cloud, Heruko, etc.

### Deploying to a cloud server
You can deploy your Gatsby site online in a variety of ways, but there are 2 easy methods that we will discuss. We will be deploying on [Netlify](https://www.netlify.com/) and [Gatsby Cloud](https://www.Gatsby.js.com/cloud/).

1. **Netlify**: With Netlify you can drag-and-drop your code folder into it or deploy your site from [GitHub](https://github.com/) if it's hosted there, but it's recommended that you also put your code on GitHub to automatically sync any changes made to the site.

2. **Gatsby Cloud**: This provides a simpler way to deploy the site, but it requires your code to be on GitHub or Gitlab. Deploying your site on Gatsby cloud offers you the flexibility to use content management systems like [Contentful](https://www.contentful.com/), [DatoCMS](https://www.datocms.com/), [Strapi](https://strapi.io/), and [Wordpress](https://wordpress.com/) etc.

Here you can fine some [live site deployed on Netlify](https://my-first-gatsby-sites.netlify.app/).

To get the full code, you can refer to [this link](https://github.com/Jethro-magaji/first-gatsby-site).

To see the [live site deployed on Gatsby cloud](https://build-6a85bef9-47a2-4002-bb74-1b44f3dbf5bd.gtsb.io/) click the link provided.

### Summary
In summary, we covered the advantages JAMstack and Gatsby.js. You created your first Gatsby.js site, added content to it, linked between pages, learned about React components, made the site interactive, and deployed it to the cloud.


### Additional Resources
- [Gatsby](https://www.gatsbyjs.com/)

- [Gatsby Doc](https://www.gatsbyjs.com/docs/quick-start/)

- [Gatsby Cloud](https://www.gatsbyjs.com/cloud/)

- [Gatsby - Full Tutorial for Beginners](https://www.youtube.com/watch?v=mHFAM0CXviE&t=2838s)

---
Peer Review Contributions by: [Sophia Raji](/engineering-education/authors/sophia-raji/)
