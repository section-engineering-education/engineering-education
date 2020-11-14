# How to Build a Static Site with GatsbyJS
![Hero image](/engineering-education/howto-build-astatic-site-with-gatsbyjs/heroimage.png)
[*Image Source: Unsplash](https://unsplash.com/photos/uyfohHiTxho)
When I first heard about GatsbyJS, I was confused about what it was, and how I would get started. As time went on, I learned more about GatsbyJS and found out it is awesome. My goal for this article is not to confuse you about GatsbyJS, but to help you get started with building your very first static site using GatsbyJS.

GatsbyJS is used to build websites powered by [JAMStack](https://jamstack.org/what-is-jamstack/). JAMstack is a modern framework for creating websites and software. The “JAM” is an acronym for JavaScript, APIs, and HTML markup. JAMstack sites do not need a database, unlike websites designed using WordPress or Drupal. 
In JAMstack architecture, the frontend and backend are [decoupled](https://www.gatsbyjs.com/docs/glossary/#decoupled). During the building process, Gatsby creates JavaScript, HTML, and CSS files used for the frontend, while the backend is a content API that can be a headless [CMS](https://en.wikipedia.org/wiki/Content_management_system), a hosted datastore, or a custom application that returns JSON or XML.
[Matt Biilmann](https://www.netlify.com/oreilly-jamstack/) and [Chris Bach](https://www.linkedin.com/in/christianbachdk/) came up with the name "JAMstack" because they were creating modern web development workflows and capabilities at Netlify.

### Advantages of JAMstack Architecture
- **Speed**: They load faster than sites using [monolithic architectures](https://whatis.techtarget.com/definition/monolithic-architecture#:~:text=A%20monolithic%20architecture%20is%20the,and%20unable%20to%20be%20changed.).
- **Flexibility for hosting**: Being a static file, JAMStack sites can be hosted anywhere. To get the best performance and security, it is preferable to use an object storage service and content delivery networks such as [Netlify](https://www.netlify.com/), [Render](https://www.gatsbyjs.com/docs/deploying-to-render/), or Amazon Web Services’ [S3 and CloudFront](https://www.gatsbyjs.com/docs/deploying-to-s3-cloudfront/).
- **Improved security**: Because JAMStack sites don’t have software layers and databases, this makes them invulnerable to server-side code injection.
- **An enhanced experience for developers**: Frontend developers can build JAMStack sites without a server-side language and back-end developers can focus on building APIs rather than creating databases.


### What is GatsbyJS?

>GatsbyJS can be defined as a static site generator that uses [React.js](https://reactjs.org/) (for the client-side) and [GraphQL](https://graphql.org/) (to access data) to build a reliable and faster website.

A software application that generates HTML pages from templates and a given content source is called a “static site generation”. Markdown-formatted text files are used by most static site generators.
Static site generators are different from content management systems such as WordPress and Drupal that are powered by databases. 
Other static site generators for JAMstack Sites include [Next.Js](https://nextjs.org/), [Hugo](https://gohugo.io/), [Jekyll](http://jekyllrb.com/), [Hexo](https://hexo.io/), [Slate](https://slatedocs.github.io/slate/), [NuxtJS](https://nuxtjs.org), [GitBook](https://www.gitbook.com/), [Docusaurus](https://v2.docusaurus.io/) and [more](https://jamstack.org/generators/) 

**Advantages of GatsbyJS**
- It's [faster](https://www.gatsbyjs.com/contributing/how-to-pitch-gatsby/) to create a static site with GatsbyJs.
- It's easy to set up.
- It's scalable.
- It has a great [community of developers](https://www.gatsbyjs.com/contributing/community/).

### Prerequisites

To get started with GatsbyJS, you will need some background knowledge on the following:
- [React.js](https://reactjs.org/) (the basics, components, etc.)
- [Node.js](https://nodejs.org/en/) (the basics, [npm](https://www.npmjs.com/), etc)
- [GraphQL](https://graphql.org/) (the basics and advanced)


### Installations

First, you'll need to install [Node.js](https://nodejs.org/en/) on your computer.
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

You just installed Gatsby and its command-line interface globally on your computer, this is the first step to interact with Gatsby using the command line interface.

In order to confirm you have Gatsby installed, type in:

```bash
gatsby –version
```

### Creating a New GatsbyJS Site

Now let's create a static site using GatsbyJS.

Open up the terminal, in your code editor if you are using [VS Code](https://code.visualstudio.com/), it comes built-in with a terminal. You will be using the GatsbyJS site template from GitHub to create your site from scratch.

Create a **my-first-gatsby-site** folder, and then in your terminal, type in
`Users/first-gatsby-site: gatsby new first-gatsby-site https://github.com/gatsbyjs/gatsby-starter-hello-world`.

To see the new site you have created, check it out using these commands.

Next, go into the file directory you have just created:

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

Congratulations! You just built your first static site using GatsbyJS.


Now let’s talk about your file directory, it looks overwhelming especially if you are still a beginner using [Node.js](https://nodejs.org/en/).

-	**The node-modules folder:** This contains a bunch of files you may or may not need.
-	**The public folder:** This contains all of your finished static sites that would be served on a cloud server.
-	**The src folder:** This is the folder you will be using the most because this is where you are going to store the pages you are building for your site.
You will find an  ***index.js*** file in the pages folder because Gatsby uses *Node.js* and *React.js* and these files will be a JavaScript file but you can also use a markdown file as well with the file extension of '.md'.
-	**The gitignore file:** This file tells GitHub to ignore whatever file you specify in it ignore. For example API keys.
-	**The package.json:** Contain the dependencies or packages you have installed using the node package manager *“npm install”*

### Adding Content to the Site

As excited as I am that you have created your first GatsbyJS static site, let's move forward by adding more content to the site by making it look better.
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

### Linking Between Pages

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

### Counter.js File

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

Also, import the counter component by placing this code at the top:

`bash
import { Link } from "gatsby"
`

### Using Plugins in GatsbyJS

What if you want to extend your site to have cool features that you don’t want to build from the scratch, GatsbyJS offers [plugins](https://www.gatsbyjs.com/plugins/) built by a community of developers who want to share cool and awesome features with everyone.

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

### Building the Site on a Web Server

Your site has been running on your local server, which is `http://localhost:8000`.

To get your Gatsby site ready for cloud deployment you will need to build it using this command:

```bash
npm run build
```

You will notice some changes in the public folder that’s where your static site files are. If you want to host it on a web server you could copy the public folder and place it on a server. Otherwise, you could use a cloud static site server like Amazon, Google, Netlify, Gatsby Cloud, Heruko, etc. to place the whole file directory on a cloud server.

### Deploying to a Cloud Server

You can deploy your Gatsby site online in a variety of ways, but there are 2 easy methods that we will discuss. Those being deployed on [Netlify](https://www.netlify.com/) and [Gatsby Cloud](https://www.gatsbyjs.com/cloud/).

1. **Netlify**: With Netlify you can drag-and-drop your code folder into it or deploy your site from [GitHub](https://github.com/) if it is hosted there, but I would recommend that you place your code on GitHub to automatically sync any changes made to the site.

2. **Gatsby Cloud**: This provides a simpler way to deploy the site, but it requires your code to be on GitHub or Gitlab. Deploying your site on Gatsby cloud offers you the flexibility to use content management systems like [Contentful](https://www.contentful.com/), [DatoCMS](https://www.datocms.com/), [Strapi](https://strapi.io/), and [Wordpress](https://wordpress.com/) etc.

[Live site deployed on Netlify](https://my-first-gatsby-sites.netlify.app/)
[Github code](https://github.com/Jethro-magaji/first-gatsby-site)
[Live site deployed on Gatsby cloud](https://build-6a85bef9-47a2-4002-bb74-1b44f3dbf5bd.gtsb.io/)


### Summary

In summary, we covered the advantages JAMStack and GatsbyJS. You created your first GatsbyJS site, added content to it, linked between pages, learned about React components, made the site interactive, and deployed it to the cloud.


### Additional Resources
-[Gatsby](https://www.gatsbyjs.com/)

-[Gatsby Doc](https://www.gatsbyjs.com/docs/quick-start/)

-[Gatsby Cloud](https://www.gatsbyjs.com/cloud/)

-[Gatsby - Full Tutorial for Beginners](https://www.youtube.com/watch?v=mHFAM0CXviE&t=2838s)

