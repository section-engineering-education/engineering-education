### Introduction
In web development, an API is generally provided as a set of standards, such as HTTP request messages and response message formats, usually in XML or JSON format.
Gatsby (GatsbyJS) is a web application and website framework based on React and GraphQL. On the JAMstack, it is produced using client-side JavaScript (or other scripting languages), reusable APIs, and prebuilt Markup.

Serverless Functions offer server-side functionality that may be written alongside front-end code without relying on server-side infrastructure.

Front-end developers like me can increase the breadth of what's possible using technologies they already know and love.

### prerequisites
- Create a free [Gatsby Cloud](https://www.gatsbyjs.com/dashboard/signup) account.


### Table of contents
- [An overview on building a static API](#an-overview-on-building-a-static-api)
- [The structure of static API](#the-structure-of-static-api)
- [Creating a Static API and Hosting It](#creating-a-static-api-and-hosting-it)
- [The project](#the project)
-[Conclusion](#conclusion)

### An overview on building a static API
For a static API, you should simply provide a progression of JSON documents to the mentioning customer. Static APIs might be made by composing JSON documents the hard way, arranging them into organizers, and conveying them to a CDN or other record centered facilitating administration. 

Nonetheless, that is something nobody needs to do. I can barely comprehend how horrendous it is do. 

It's all the more impressive to utilize static APIs when they can progressively and naturally accumulate information from some various sources and afterward assemble JSON records from it. Static site generators make this cycle a breeze. With a static site generator, you might use outer (or inside) APIs to recover information, then, at that point, convert the information and produce JSON pages utilizing that changeable information. 

That is generally how you progressively build a static API. Before we get to the computerized viewpoint, we should talk about the design of the framework.

### The structure of static API
Static APIs ought to follow a similar plan standards as dynamic APIs. 

How about we guess I needed to make an API to monitor the melodies that play on repeat in my head when I awaken. A rundown of cerebrum worms would be accessible, possibly at/brainworm.json, and I would have the option to get to subtleties on a specific brainworm by utilizing some unique key, like an id. Pages with the example/brainworm/[ID].json may be offered, with [ID] being the earworm's id esteem.

Let's check an example JSON file for a better understanding

```json
{
  "results": [
    {// This file contains Despacitos song
      "file_unique_identifier": "1",
      "file_date": "10-29-2021",
      "title_of_the_song": "Despacito",
      "artist_name": "Luis Fonsi",
      "youtube_url": "https://www.youtube.com/watch?v=kJQP7kiw5Fk"
    },
    {// File two with Maroons song
      "file_unique_identifier": "2",
      "file_date": "10-30-2021",
      "title_of_the_song": "Girls Like You",
      "artist_name": "Maroon 5",
      "youtube_url": "https://www.youtube.com/watch?v=cBVGlBWQzuc"
    },
    {// This file contains Post Malone song
      "file_unique_identifier": "3",
      "file_date": "10-31-2021",
      "title_of_the_song": "Congratulations",
      "artist_name": "Post Marone",
      "youtube_url": "https://www.youtube.com/watch?v=SC4xMk98Pdc"
    }
  ],
  "meta": {
    "count": 3 // The count value is three because the files in this Json file are three
  }
}
```
> I deliver an object with a nested results array, not simply an array of results. So we can add top-level (meta) data in the future without changing the response format. 

### Creating a Static API and Hosting It
Static site generators are solid since they incorporate development instruments. That is the means by which they can offer unique information statically. Since most have a dev server that tunes in for changes and remakes, you can grow quickly. 

We wish to have these static JSON records on a CDN, or content conveyance organization. A CDN's benefit is speed and overall dispersal. Since everything we're doing is allowing the client to download a record, we don't need a convoluted web server.

On the whole, you'll need to build the project to get the JSON information to transfer. Once more, you might make locally and transfer to CDN physically. Then there's the issue of setting up DNS for your CDN or invalidating caches when updating.

Consider Netlify or Vercel as alternatives. These tools will make and transfer to a CDN previously settled for you. What's more, webhooks make it simple! Convey snares are Netlify's expression for assemble snares.


### The project
In this project, we will create the Static API using, GatsbyJS

#### Setting up the project
Let's start a Gatsby project first if you don't have one. My project is `demo-gatsby-static-api`, but you may name it anything you want:

```bash
$ gatsby new demo-gatsby-static-api # This command creates a new Gatsby project
$ cd demo-gatsby-static-api # This command opens the file directory containing the created project
```

Test everything by starting the development server.

```bash
$ npm run develop
```

After that, go to `http://localhost:8000/.` observe Gatsby's default start layout.

#### Adding data files
Assuming Gatsby is now up and running, let's add our data source.

> We will be using data from the local YML files.

This is saved in `data/brainworms/10-29-2021.yml`

```yml
---
file_unique_identifier: 1,
file_date: 10-29-2021,
title_of_the_song: Despacito,
artist_name: Luis Fonsi,
youtube_url: https://www.youtube.com/watch?v=kJQP7kiw5Fk
```

This is saved in `data/brainworms/10-30-2021.yml`

```yml
---
file_unique_identifier: 2,
file_date: 10-30-2021,
title_of_the_song: Girls Like You,
artist_name: Maroon 5,
youtube_url: https://www.youtube.com/watch?v=cBVGlBWQzuc
```
This is saved in `data/brainworms/10-31-2021.yml`

```yml
---
file_unique_identifier: "3",
file_date: 10-31-2021,
title_of_the_song: Congratulations,
artist_name: Post Marone,
youtube_url: https://www.youtube.com/watch?v=SC4xMk98Pdc
```
### Querying Data Files
Data can be accessed using GraphQL. Run the below command 

```bash
$ npm install --save-dev gatsby-transformer-yaml
```
After accessiing the files, we then congfig the plugin

```js
module.exports = {

  plugins: [
   
    {
      resolve: `gatsby-source-filesystem`, // This is used to add configurations to this plugin.
      options: {
        name: `brainworms`, //This is the name of the project 
        path: `${__dirname}/data/brainworms` // Gives the computer file lacation.
      }
    },
    `gatsby-transformer-yaml`
  
  ]
}
```
For this situation, we're advising Gatsby to source information documents in information/earworms. Data quering is enabled by the integration of the two modules.
 
Stop the server and afterwards restart it. Then, visit GraphiQL at http://localhost:8000/__graphiql with this request:

```bash
{
  allBrainwormsYaml {
    edges {
      node {
        id
        file_date(formatString: "DD-MM-YY")
        artist_name
        title_of_the_song
        youtube_url
      }
    }
  }
}
```

Run the request, which should show the going with on the right-side sheet:

```bash
{
  "data": {
    "allBrainwormsYaml": {
      "edges": [
        {
          "node": {
            "file_unique_identifier": "1",
            "file_date": "10-29-2021",
            "title_of_the_song": "Despacito",
            "artist_name": "Luis Fonsi",
            "youtube_url": "https://www.youtube.com/watch?v=kJQP7kiw5Fk"
          }
        },
        {
          "node": {
            "file_unique_identifier": "2",
            "file_date": "10-30-2021",
            "title_of_the_song": "Girls Like You",
            "artist_name": "Maroon 5",
            "youtube_url": "https://www.youtube.com/watch?v=cBVGlBWQzuc"
          }
        },
        {
          "node": {
            "file_unique_identifier": "3",
            "file_date": "10-31-2021",
            "title_of_the_song": "Congratulations",
            "artist_name": "Post Marone",
            "youtube_url": "https://www.youtube.com/watch?v=SC4xMk98Pdc"
          }
        }
      ]
    }
  }
}
```
#### Compose Brainworms Listing JSON File
In contrast to the commonplace way of making dynamic pages with Gatsby, this cycle will look vastly different. Rather than building pages, we will duplicate the aftereffects of the inquiry into records and compose those documents straightforwardly in the public registry. 

This methodology has a couple of admonitions. Maybe the greatest is that it will possibly work when assembling the task, and not being developed mode.

The code is listed below:

```json
const fs = require("fs")

exports.onPostBuild = async ({ graphql }) => {
  graphql(`
    {
     brainworm: allBrainwormYaml {
        edges {
          node {
            file_unique_identifier
            file_date(formatString: "DD-MM-YY") // this specifes the date format of the string used.
            artist_name
            title_of_the_song
            youtube_url
          }
        }
      }
    }
  `).then(result => {
    // These lines of code are reference to where we will put the documents.
    const brainwormsPath = "./public/brainworms"

    
    const brainworms = result.data.brainworms.edges.map(({ node }) => node)

    const allBrainworms = {
      result: brainworms,
      meta: {
        count: brainworms.length
      }
    }

    // This line of code is used to write the index file.
    fs.writeFileSync(`${brainwormsPath}.json`, JSON.stringify(allBrainworms))
  })
}
```

This is what continues: 

Tap into the post-form Node API from Gatsby, which suggests that this code gets sought after the structure has adequately wrapped up. This is cause Gatsby is finished composing documents, however, has effectively made the public catalog, so everything is arranged for us. 

Circle through the outcomes and compose a document to `public/brainworms.json` containing the outcomes from the question, alongside a meta-object in which we can stuff inquiry data. 

Build the project using the command listed below

```bash
npm run build
```
After running build command run the serve using the code below.
This serves the public directory `public/earworms.json`.

```bash
$ npm run serve
```

 Open that up in the program and you should see the data. 

> The local host port is 9000 when serving.

```bash
{
  "result": [
    {
      "file_unique_identifier": "1",
      "file_date": "10-29-2021",
      "title_of_the_song": "Despacito",
      "artist_name": "Luis Fonsi",
      "youtube_url": "https://www.youtube.com/watch?v=kJQP7kiw5Fk"
    },
    {
      "file_unique_identifier": "2",
      "file_date": "10-30-2021",
      "title_of_the_song": "Girls Like You",
      "artist_name": "Maroon 5",
      "youtube_url": "https://www.youtube.com/watch?v=cBVGlBWQzuc"
    },
    {
      "file_unique_identifier": "3",
      "file_date": "10-31-2021",
      "title_of_the_song": "Congratulations",
      "artist_name": "Post Marone",
      "youtube_url": "https://www.youtube.com/watch?v=SC4xMk98Pdc"
    }
  ],
  "meta": {
    "count": 3
  }
}
```
That is it! Presently you have a static API with Gatsby.

### Conclusion
From the article above, we have learned how to use Gatsby Functions. We understood how to develop an API and what to look out for when deploying it to Gatsby Cloud.

Happy cording!
