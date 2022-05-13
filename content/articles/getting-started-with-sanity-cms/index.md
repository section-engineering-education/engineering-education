---
layout: engineering-education
status: publish
published: true
url: /getting-started-with-sanity-cms/
title: How to Get Started with Sanity CMS
description: This tutorial will walk the reader through how to get started with Sanity CMS.
author: abimbola-taofeek
date: 2022-03-31T00:00:00-12:09
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/getting-started-with-sanity-cms/hero.png
    alt: How to Get Started with Sanity CMS Hero Image
---
Sanity is a React open-source content management system. 
<!--more-->
If you're not familiar with the concept of CMS, a content management system (CMS) is a software application that enables users to design, edit, publish, and preserve digital information. 

A CMS enables you to build apps without starting from scratch, and it is typically used in web and business content management systems.

Sanity lets us focus on app designs rather than worrying about content file storage and databases. This tool provides efficient methods to create scalable and user-friendly applications.

### Table of contents
- [Prerequisites](#prerequisites)
- [Sanity as a Headless CMS](#sanity-as-a-headless-cms)
- [Getting Started](#getting-started)
- [Starting sanity content studio](#starting-sanity-content-studio)
- [Creating Schema](#creating-schema)
- [Importing custom schema](#importing-custom-schema)
- [Deploy Sanity project](#deploy-sanity-project)
- [Conclusion](#conclusion)
- [Further Reading](#further-reading)

#### Prerequisites
To follow along with this tutorial, the reader will need the following:
- A basic background knowledge in programming.
- Have [Node.js](https://nodejs.org/en/download/) installed.
- A code editor (VSCode is recommended).

### Sanity as a Headless CMS
A headless CMS is a backend-only content management system that makes content accessible to a user device through an API, eliminating the need for a built-in display layer. 

Headless CMS relies on JAMstack, which stands for (JavaScript, APIs, and Markup) to turn your web application content into a cloud-based API, where it can be accessed from any application. 

In JAMstack, Sanity is the A, in this case, the (API) as it is decoupled from your app, giving you a single source of truth for your database to model and custom tail the content. 

Sanity provides an open-source studio to manage content where the data is stored in a content lake. It supports queries from a CDN using GraphQL, webhooks, and real-time updates.

### Getting Started
#### Setting up our Sanity application - Sanity CLI Installation
To get started with Sanity, first install the Sanity CLI.

Run the command below in your terminal.

```bash
npm install -g @sanity/cli
```

Next, initialize it using the command below.

```bash
npx sanity init
```

#### Sanity Command Line Interface (CLI)
To work with the Sanity CLI, we need to answer a few questions so that we can create an ideal project structure.

##### Questions
- Sign in with Google, GitHub, or an email address and password.
- Fill in the name of your project.
- Use the default option for the dataset.
- Select a project route.
- Choose a blank project with no predefined schema to start sanity.

#### Starting sanity content studio
- Run the command below in your terminal.

```bash
sanity start
```

- In your browser tab, go to `http://localhost:3333` (Launching sanity)

![sanity-studio](/engineering-education/getting-started-with-sanity-cms/terminal.png)

>Note: Whenever you want to launch sanity, run `localhost:3333`; this is the default port for Sanity CMS.

Below is what our project should look like with no predetermined data.

![sanity-studio](/engineering-education/getting-started-with-sanity-cms/sanity-screenshot1.png)

Take a peek at the files and folders that sanity has created automatically, particularly the schema folder.

#### Creating Schema
Schema is a representation of a plan. It depicts how our database will be structured.

**Default sanity schema.js**
Our sanity default schema.js should look exactly like this.

![sanity-studio](/engineering-education/getting-started-with-sanity-cms/default-schema.png)

By default, we only have one schema.js file. We will need to define our schemas and types as a result.

Create a `new.js` file to create a custom schema file. For example `nameofSchema.js` file in the schema folder, inside the file, you will write plain JavaScript code.

See an example in the image below.

![import custom schema](/engineering-education/getting-started-with-sanity-cms/userSchema.png)

#### Importing custom schema
To use our custom schema, we need to import it into the default `schema.js` file and declare the type. We can make as many schema files as we need; all we have to do is import them all.
 
See an example in the image below.

![import custom schema](/engineering-education/getting-started-with-sanity-cms/import-schema.png)

Let us take a look at our sanity studio to see the changes.

![sanity-studio](/engineering-education/getting-started-with-sanity-cms/sanity-screenshot2.png)

It appears to be different from the initial layout because now we have the content and our first document type, the user.
 
Go ahead and fill in the username and the image link to publish a new user. We just implemented a database by establishing a schema that provides the ability for users to add new content.
 
#### Deploy Sanity project
Go ahead and run:

```bash
sanity deploy
```

To deploy a sanity project. Sanity deployed applications happen in real-time, meaning that any changes you make locally after deployment will be reflected in the deployed version.

You can find the source code [here](https://github.com/abimbolataofeek/getting-started-with-sanity-cms).

### Conclusion
We learned how to set up a database and create a schema that allows users to upload new content to the database. Consider how long it would take us to reach this position if we were working on a MERN stack app (MongoDB Express React and Node.js) or any other tech stack to build this. Instead, we can construct sophisticated apps quickly using Sanity because we don't have to worry about the content file or database query.

Happy coding!

### Further Reading
- [The Official Sanity Documentation](https://www.sanity.io)
- [Sanity Slack channel](https://slack.sanity.io/)
- [Read more on CMS](https://www.sitecore.com/knowledge-center/digital-marketing-resources/what-is-a-cms)
- [Find out more about the headless CMS.](https://www.youtube.com/watch?v=-Uor3I0n_vQ)

---
Peer Review Contributions by: [Jethro Magaji](/engineering-education/authors/jethro-magaji/)
