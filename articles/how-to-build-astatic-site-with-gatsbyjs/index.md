---
layout: engineering-education
status: publish
published: true
url: /engineering-education/how-to-build-astatic-site-with-gatsbyjs/
title: How to build a static site with GatsbyJs
description: This article will help developers on how to get started building their very first static site using GatsbyJs.
author: jethro-magaji
date: 2020-10-21T00:00:00-08:00
topics: [Node.js]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/how-to-build-astatic-site-with-gatsbyjs/hero.png
    alt: hero example image computer Node.js
---
When I first heard about GatsbyJs, I was confused about what it was, and how I would get started. As time went on, I learned more about it and found out it is awesome. My goal for this article is not to confuse you about GatsbyJs, but to help you get started with building your very first static site using GatsbyJs.
<!--more-->
A paradigm shift has begun in the web development world, where static sites are now becoming more of a trend over dynamic sites. Building a dynamic site that required you to set it up and/or maintaining it, is now obsolete.

This is not an issue when building static sites. Due to cloud service companies like [Amazon](https://aws.amazon.com/), [Google](https://cloud.google.com/), [Netlify](https://www.netlify.com/), [Heruko](https://www.heroku.com/), and [Gaysby](https://www.gatsbyjs.com/cloud/) etc. Having worked on making software development easier, faster, and more scalable for developers.

When compared to static sites, dynamic sites are slow to load and can cause high bounce rate on a page by users, now that’s where GatsbyJs comes into play; it is a powerful and easy static site generator.

### What is GatsbyJs?
>GatsbyJs can be defined as a static site generator that uses [React.js](https://reactjs.org/) (for the client-side) and [GraphQL](https://graphql.org/) (to access data) to build a reliable and faster website.

**Advantages**
- It's [faster](https://www.gatsbyjs.com/contributing/how-to-pitch-gatsby/) to create a static site with GatsbyJs.
- It's easy to set up.
- It's scalable.
- It has a great [community of developers](https://www.gatsbyjs.com/contributing/community/).

### Prerequisites
To get started with GatsbyJs, you will need some background knowledge on the following:
- [React.js](https://reactjs.org/) (the basics, components, etc.)
- [Nodejs](https://nodejs.org/en/) (the basics, [npm](https://www.npmjs.com/), etc)
- [GraphQL](https://graphql.org/) (the basics and advanced)

However there’s no problem if you don’t have any knowledge on these technologies, this article will help you get started with GatsbyJs, so stick around and check the links out later if you are interested in advancing your knowledge.

### Installations
First of all, you'll need to install [Node.js](https://nodejs.org/en/) on your computer.
Go to the [official Node.js website](https://nodejs.org/en/) to download the Node.js version for your operating system.

After installing it, open up your terminal and type in:

```bash
node –version
```

and

```bash
npm –version
```

These commands will give you the version of Node.js and node package manager respectively.

Next, in your terminal type in:

```bash
npm install –global gatsby-cli
```

You just installed Gatsby and its command line interface globally in your computer, this is the first step to interact with Gatsby using the command line interface.

In order to confirm you have Gatsby installed, type in:

```bash
gatsby –version
```

### Creating a new GatsbyJs site
Now let's create a static site using GatsbyJs.

Open up your terminal in your code editor, if you are using [VS Code](https://code.visualstudio.com/), It comes in built-in with a terminal. You will be using the GatsbyJs site template from GitHub to create your site from scratch.

Create a **my-first-gatsby-site** folder, and then in your terminal type in
`Users/first-gatsby-site: gatsby new first-gatsby-site https://github.com/gatsbyjs/gatsby-starter-hello-world`.

To see the new site, you have created, check it out using these commands.

First, go into the file directory you have just created:

```bash
cd first-gatsby-site
```

Next:
```bash
npm run develop
```

You will then get a success message saying *“your site is running at”* :
`http://localhost:8000`

You can now open up your web browser and access `http://localhost:8000`:

Open `http://localhost:8000` in your browser and you will see "hello world" displayed.

Congratulations! You just built your first static site using GatsbyJs.


Now let’s talk about your file directory, it looks overwhelming especially if you are still a beginner using [Node.js](https://nodejs.org/en/).

-	**The node-modules folder:** Contains a bunch of files you may or may not need.
-	**The public folder:** This contains all of your finished static sites that would be served on a cloud server.
-	**The src folder:** This is the folder you will be using the most because this is where you are going to store the pages you are building for your site.
You will find an  ***index.js*** file in the pages folder because Gatsby uses *Node.js* and *React.js* and these files will be a JavaScript file but you can also use a markdown file as well with the file extension of '.md'.
-	**The gitignore file:** This file tells GitHub to ignore whatever file you specify in it ignore. For example: API keys.
-	**The package.json:** Contain the dependencies or packages you have installed using the node package manager *“npm install”*

### Adding contents to the site
As excited as I am that you have created your first GatsbyJs static site, let's move forward by adding more content to the site by making it look better.
Remember how I mentioned you will need some knowledge of React.js?

Yes, good! The moment has come for us to use it now, but don’t worry we will just be working with the basics here that are pretty easy.

In the index.js file add this piece of code:

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

### Linking between pages
Having a one-page static site doesn’t sound cool at all, what if you want to have 2 or more pages? To do this create another page and link them together, so that you can easily navigate through the added pages.

First of all, import a Gatsby react link and add it to the top of the index.js file
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

Then finally link it using the Gatsby link by placing this code in the index.js file to connect it to the page-2.js file

```bash
<Link to=”/page-2/”>Page 2</Link>
```

### Counter.js file
Here you are going to make the site more interactive by adding a counter to the site where you can click on a **plus** button to increase a number and a **minus** button to decrease a number.

Create a counter.js file in the pages folder and then add this code snippet.
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

### Using React Components
Using react components to build your static site will help you get the job done faster. With react you can make parts of your code as a component, component codes are reusable and can be placed in any of your react code file to be used again.

Yet, I highly recommend you check out the [react component documentation](https://reactjs.org/docs/react-component.html) to gain a better understanding of react components.

The counter code in your counter.js file is already a component because it extends the react component class. You will use it in the index.js file but as a component,
by adding this piece of code.


```bash
<Counter></Counter>
```

Also import the counter component by placing this code at the top:

`bash
import { Link } from "gatsby"
`

### Using plugins in GatsbyJs
What if you want to extend your site to have cool features that you don’t want to build from the scratch, GatsbyJs offers [plugins](https://www.gatsbyjs.com/plugins/) built by a community of developers who want to share cool and awesome features with everyone.

We will be using a plugin for [Typogyaphy Js](https://kyleamathews.github.io/typography.js/) (a CSS framework) to style up the CSS by default.

To use this plugin, you have to do this:

```bash
npm install gatsby-plugin-typography react-typography typography
```

When the installation is done go to the *gatsby-config.js* file, you want to tell Gatsby that you want to use this plugin.

Add these lines of code in the *gatsby-config.js* file.

``` JavaScript
//plugin code
module.exports = {
plugins: [ `gatsby-plugin-typography`]
}
```

### Building the site on a web server
So far so good, your site has been running on your local server which is `http://localhost:8000`, what’s the use of building a static site without showing it to your friends, family, and probably your boss online.

To get your Gatsby site ready for cloud deployment you will need to build it using this command:

```bash
npm run build
```

You will notice some changes in the public folder, that’s where your static site files are. If you want to host it on a webserver you could copy the public folder and place it in a server. Otherwise, you could use a cloud static site server like Amazon, Google, Netlify, Gatsby Cloud, Heruko, etc. to place the whole file directory on a cloud server.

### Deploying to a cloud server
You can deploy your Gatsby site online in a variety of ways, but there are 2 easy methods that we will discuss.  Those being [Netlify](https://www.netlify.com/) and [Gatsby Cloud](https://www.gatsbyjs.com/cloud/).

**Netlify:** With Netlify you can drag and drop your code folder into it or deploy your site from [GitHub](https://github.com/) if your code is on GitHub, but I would recommend that you place your code on GitHub to automatically sync any changes made to the site.

**Gatsby cloud:** This provides a simpler way to deploy the site, but it requires your code to be on GitHub or Gitlab. Deploying your site on Gatsby cloud offers you the flexibility to use content management systems like [Contentful](https://www.contentful.com/), [DatoCMS](https://www.datocms.com/), [Strapi](https://strapi.io/), and [Wordpress](https://wordpress.com/) etc.

[GatsbyJs deployed on Netlify](https://my-first-gatsby-sites.netlify.app/)
[Github code](https://github.com/Jethro-magaji/first-gatsby-site)
[Deployed on Gatsby cloud](https://build-6a85bef9-47a2-4002-bb74-1b44f3dbf5bd.gtsb.io/)


### Summary
In summary, we defined what GatsbyJs is and went over its advantages, we set up your computer for GatsbyJs site development by installing Nodejs, we created your first GatsbyJs static site, added content to it, linked the pages, learned about React components, made the site interactive with a counter, and lastly deployed it to the cloud.


### Additional Readings
-[Gatsby](https://www.gatsbyjs.com/)

-[Gatsby Doc](https://www.gatsbyjs.com/docs/quick-start/)

-[Gaysby Cloud](https://www.gatsbyjs.com/cloud/)

-[Gatsby - Full Tutorial for Beginners](https://www.youtube.com/watch?v=mHFAM0CXviE&t=2838s)
