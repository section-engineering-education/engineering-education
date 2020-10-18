---
layout: engineering-education
status: publish
published: true
url: /engineering-education/history-of-nodejs/
title: How to build a static site with GatsbyJs
description: Node.js is a runtime server environment that uses JavaScript on the server side and asynchronous programming. It is a free and open source technology that runs on various platforms (Mac OS X, Unix, Windows, etc.)
author: jethro-magaji
date: 2020-08-25T00:00:00-08:00
topics: [Node.js]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/history-of-nodejs/hero.jpg
    alt: hero example image computer Node.js
---
When I first heard about GatsbyJs I was pretty confused and related it to the famous ***‘J Gatsby’*** of the movie [“The Great Gatsby”](https://www.imdb.com/title/tt1343092/), my goal for this article is not to confuse you but to get you started in building your very first static site using GatsbyJs.
<!--more-->
A paradigm shift has begun in the web development world, where static sites are now becoming a trend over good old dynamic sites. Building a dynamic site that require you to worry about setting up a server and/or maintain it is now obsolete.

and it's not an issue when building static sites because cloud service companies like [Amazon](https://aws.amazon.com/), [Google](https://cloud.google.com/), [Netlify](https://www.netlify.com/), [Heruko](https://www.heroku.com/), [Gaysby Cloud](https://www.gatsbyjs.com/cloud/) etc. think you shouldn’t be doing so and they want software development to be fast, easy, scalable and fun not only for the developers but also for the clients because slow dynamic sites can cause high page bounce rate from users, so that’s where GatsbyJs comes in; a powerful and easy static site generator.

![GatsbyJs image](/engineering-education/how-to-build-astatic-site-with-gatsbyjs/gatsbyjs.png)
[*Image Source: https://www.datocms.com/blog/gatsbyjs-plugin-just-landed](https://www.datocms.com/blog/gatsbyjs-plugin-just-landed)

### What is GatsbyJs?
>GatsbyJs can simply be defined as a static site generator that uses [React.js](https://reactjs.org/) (for the client-side) and [GraphQL](https://graphql.org/) (to access data) to build a reliable and fast website.

**Advantages**
- It's [faster](https://www.gatsbyjs.com/contributing/how-to-pitch-gatsby/) to create a static site
- It's easy to set up.
- It's scalable
- It has a great [community of developers](https://www.gatsbyjs.com/contributing/community/)

### Prerequisite Knowledge
In order to get stared with GatsbyJs, you will need some knowledge of the followings:
- [React.js](https://reactjs.org/) (the basics, components, etc.)
- [Nodejs](https://nodejs.org/en/) (the basics, [npm](https://www.npmjs.com/), etc)
- [GraphQL](https://graphql.org/) (the basics and advanced)

However there’s no problem if don’t have any knowledge of these technologies, this article will help you get started with GatsbyJs, so stick around and check them out later if you are really interested in advancing your knowledge.

### Installations
First of all, you need to install [Node.js](https://nodejs.org/en/) in your computer.
Go to the [official Node.js website](https://nodejs.org/en/) to download the Nodejs version for your operating system.
After installing it, open up your terminal and type in:
`Users/yourname: node –version`
and
`Users/yourname: npm –version`
These commands will give you the version of Nodejs and node package manager respectively.
Next, in your terminal type in
`Users/yourname: npm install –global gatsby-cli`
You just installed Gatsby and its command line interface globally in your computer, this is the way for you to interact with Gatsby using the command line interface.

In order to confirm ypu have Gatsby installed, type in
`Users/yourname: gatsby –version`

### Creating a new GatsbyJs site
Now let's create a static site using GatsbyJs
Open up your terminal in your code editor, if you are using [VS Code](https://code.visualstudio.com/), this comes in handy with it.
You will be using the GatsbyJs site template from Github to create your own site from scratch.
Create a **my-first-gatsby-site** folder, and then in your terminal type in
`Users/first-gatsby-site: gatsby new first-gatsby-site https://github.com/gatsbyjs/gatsby-starter-hello-world`
In order to see the new site, you have created, check it out using these commands
First, go into the file directory you have just created
`Users/my-first-gatsby-site: cd first-gatsby-site`
Next `Users/my-first-gatsby-site /first-gatsby-site: npm run develop`
You will then get a success message saying *“your site is running at”*
`http://localhost:8000`
you can now open up your web browser and access `http://localhost:8000`

Open `http://localhost:8000` in your browser and you will get a **“hello world”** text display.
Congratulations ! you are now a GatsbyJs expert, oops ! i mean almost an expert but that shouldn’t be an issue now because you just created your very own first static site using GatsbyJs.
Now let’s talk about your file directory, it looks overwhelming especially if you are a beginner with [Nodejs](https://nodejs.org/en/)
-	**The node-modules folder:** Contains a bunch of files you may or may not need.
-	**The public folder:** This contains all of your finished static site that would be served on a cloud server.
-	**The src folder:** This is the folder you will be using the most, because this is where you are going to store the pages you are building.
You will find an  _**index.js**_ file in the pages folder, because Gatsby uses _Nodejs_ and _React.js_ so these files will be a JavaScript file but you can also use markdown file too with the file extension of .md
-	**The gitignore file:** This file tells Github to ignore whatever file you specify in it e.g API keys
-	**The package.json:** Contains the dependencies or packages you have installed using the node package manager _“npm install”_

### Adding contents to the site
As excited as I am that you have created your first GatsbyJs static site, lets move forward by adding more contents to the site by making it look great.
Remember on how I said you will need some knowledge of React.js ? yes ! the hour has come for us to use it now, but don’t worry you will just be working with the basics here which is pretty easy.
In the index.js file add this piece of code

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
Having a one-page static site doesn’t sound cool at all, what if you want to have 2 or more pages?
To do this create another page and link them together, so that you can easily navigate through.
First of all, import a Gatsby react link and add it to the top of the index.js file
`import { Link } from "gatsby"`
Secondly, create a .js file with the name **page-2.js** in the pages folder and add these codes
```Javascript
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
`<Link to=”/page-2/”>Page 2</Link>`


### Counter.js file
Here you are going to make the site more interactive by adding a counter to the site where you can click on a **plus** button to increase a number and a **minus** button to decrease a number
Create a counter.js file in the pages folder and then add these code.
````Javascript
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
````

### Using React Components
Using react components to build your static site will help you get the job faster, With react your can make part of your code as a component, component codes are resuable and can be placed in any of your react code file to be used again. But i highly recommend you check out the [react component documentation](https://reactjs.org/docs/react-component.html) to gain a better understanding of react components.
The counter code in the counter.js file is already a component because it extends the react component class. You will use it in the index.js file but as a component,
just by adding this piece of code
` <Counter></Counter>`
and also import the counter component by placing this code at the top
`import { Link } from "gatsby"`



### Using plugins in GatsbyJs
What if you want to extend you site to have a cool feature that you don’t want to build it== from the scratch, GatsbyJs offers [plugins](https://www.gatsbyjs.com/plugins/) built by community of developers who want to share cool and awesome features with you.
You will be using a plugin for [Typogyaphy Js](https://kyleamathews.github.io/typography.js/) (a CSS framework) to style up the CSS by default.
To use it you have to do this:
`Users/my-first-gatsby-site /my-gatsby-site: npm install gatsby-plugin-typography react-typography typography`
When the installation is done go to the *gatsby-config.js* file, you want to basically tell Gatsby that you want to use this plugin. Add these lines of code in the gatsby-config.js file.

``` javascript
//plugin code
module.exports = {
plugins: [ `gatsby-plugin-typography`]
}
```

### Building the site to a web server
So far so good your site has been running on your own local server which is `http://localhost:8000`, what’s the use of building a static site without even showing it to your friends, family and probably your boss online.
To get you Gatsby site ready for cloud deployment you will need to build it using this command:
`Users/learning: npm run build`
You will notice some changes in the public folder, basically that’s where your static site files are and if you want to host it on a web sever you could copy the public folder and server it up or you could use a cloud static site server like Amazon, Google, Netlify, Gatsby Cloud, Heruko etc to server the whole file directory

### Deploying to a cloud Server
You can deploy your Gatsby site online using various ways, but there are 2 easy ways, which is using [Netlify](https://www.netlify.com/) and [Gatsby Cloud](https://www.gatsbyjs.com/cloud/).
**Netlify:** With Netlify you can simply drag and drop your code folder into into it or deloy your site from [Github](https://github.com/) if your code is on Github, but i recommend that you put your code on github to automatically sync any change made to your site.
**Gatsby cloud:** This also provides a simpler way to deploy your site, but it requires your code to be on Github or Gitlab. Deploying your site on Gatsby cloud offers you the flexiblity to use Content management systems like [Contentful](https://www.contentful.com/), [DatoCMS](https://www.datocms.com/), [Strapi](https://strapi.io/), [Wordpress](https://wordpress.com/) etc.

[GatsbyJs deployed on Netlify](https://my-first-gatsby-sites.netlify.app/)
[Github code](https://github.com/Jethro-magaji/first-gatsby-site)
[Deployed on Gatsby cloud](https://build-6a85bef9-47a2-4002-bb74-1b44f3dbf5bd.gtsb.io/)


### Summary
In summary we defined what GatsbyJs is and its advantages, you set up your computer for GatsbyJs site development by installing Nodejs, you created your first GatsbyJs static site, added contents, linked pages, learnt about react components, made the site interactive with a counter and lastly deployed it to the cloud.

<iframe height="400px" width="100%" src="https://repl.it/@Jethromagaji/first-gatsby-site?lite=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>

### Additional Readings
-[Gatsby](https://www.gatsbyjs.com/)
-[Gatsby Doc](https://www.gatsbyjs.com/docs/quick-start/)
-[Gaysby Cloud](https://www.gatsbyjs.com/cloud/)
-[Gatsby - Full Tutorial for Beginners](https://www.youtube.com/watch?v=mHFAM0CXviE&t=2838s)
