---
layout: engineering-education
status: publish
published: true
url: /create-a-headless-cms-website-using-wordpress-nextjs-and-graphql/
title: How to Create a Headless CMS Website using WordPress, Next.js, and GraphQL Queries (WPGraphQL)
description: In this guide we will learn how we can use Next.js to run WordPress as a headless CMS. Next.js uses generators that render a static spage.
author: catherine-macharia
date: 2021-09-20T00:00:00-14:00
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/create-a-headless-cms-website-using-wordpress-nextjs-and-graphql/hero.jpg 
    alt: WordPress Image Example
---
Building a website can be overwhelming in the current online world, especially without extreme knowledge of building one. But, building a website can be easier with a well-established and ready-made content management systems such as WordPress.
<!--more-->
WordPress is an open-source content management system (CMS). CMS is a software that runs on a web server to host ready-made and customizable website templates. This means you can build a full-fledged website using or modifying WordPress for free. 

Being a CMS, it allows you to manage different aspects of a website, such as changing WordPress appearance, adding and modifying content, and search engine enhancement.

Yet, with WordPress being beginner-friendly, its back end technology is server-side rendered (SSR). This alludes that you can encounter some performance overhead over other technologies such as Next.js. WordPress content is served directly from the server. 

Every request has to go over to the server, requesting the necessary resources. With many requests to process, servers with less processing power can be overwhelmed when requesting traffic increases.

Technology such as Next.js supports hybrid content generation. They support both SSR and CSR for Static Site Generation. This means server-side content is served ahead of time. 

Next.js uses generators that render a page statically, making it load ahead of time. With superior technologies such as Next.js, you can combine them with CMS such as WordPress and run them as headless. This way, WordPress will run a headless CMS. This produces a performant website with a great user experience.

### Overview
- [Prerequisites](#prerequisites)
- [What is a headless CMS](#what-is-a-headless-cms)
- [Reasons for running WordPress as a headless CMS](#reasons-for-running-wordpress-as-a-headless-cms)
- [Adding a post](#adding-a-post)
- [Installing the WpGraphQL plugin](#installing-the-wpgraphql-plugin)
- [Running a query from the GraphiQL IDE](#running-a-query-from-the-graphiql-ide)
- [Setting up the Next.js environment](#setting-up-the-nextjs-environment)
- [Adding WordPress API to Next.js using the GraphQL schema](#adding-wordpress-api-to-nextjs-using-the-graphql-schema)
- [Connecting to the WordPress CMS](#connecting-to-the-wordpress-cms)
- [Fetch all WordPress posts](#fetch-all-wordpress-posts)
- [Fetch a single WordPress post](#fetch-a-single-wordpress-post)
- [Testing](#testing)
- [Testing with a single post](#testing-with-a-single-post)
- [Conclusion](#conclusion)
- [References](#references)

### Prerequisites
The following prerequisites will help you navigate around this tutorial:
- Having a basic understanding on working with [Next.js](https://www.youtube.com/watch?v=mTz0GXj8NN0&t=54s).
- Good understanding of [how WordPress works](https://webdesign.tutsplus.com/articles/how-does-wordpress-work--cms-34542) and [how to use it to build a website](https://themeisle.com/blog/install-wordpress-on-aws/).

### What is a headless CMS
In a WordPress CMS, the backend (where you manage your content) and frontend (where the content is displayed to the website visitors) are integrated as one monolithic system. When WordPress runs as a headless CMS, both the content and the content presentation are decoupled. 

This makes the content presentation layer flexible. You can now build a website or a mobile application to present the raw WordPress-driven content. The backed and the frontend are not tied to the CMS anymore.

You still have WordPress CMS for content creation, and management saved to a database. The only difference is that content presentation is delivered through the application programming interface (API) as raw data format such as JSON. Then the data is presented in the websites, mobile applications, or any other channels and devices.

### Reasons for running WordPress as a headless CMS
- It enables you to change the content delivery channels when you would like to without re-authoring the content.
- Since the content is delivered as raw data through an API, you can use any technology you wish to present this data. As a developer, this allows you to focus on things that matter most, such as creating great digital experiences for your users.
- API-driven data promote omni-channel architectures. You create WordPress content and channel it through API. Thus, the content shines across all touch points.
- It creates more efficient, scalable, and faster applications. Both backend and frontend are separated from the monolith CMS architecture. If the WordPress-backed CMS has any issues, the channel delivery pipelines will not be affected. Hence, the performance of the delivery channel is not compromised.

In this guide, we will learn how we can use Next.js to run WordPress as a headless CMS.

Let's dive in.

### Adding a post
First, head over to your remote WordPress website Admin dashboard. If you don't have a running WordPress website, check this [guide](https://themeisle.com/blog/install-wordpress-on-aws/) on how to install WordPress and set up one.

Since WordPress and Next.js are used to develop blog-based websites, we will use this scenario by first adding and posting a post in WordPress admin.

Then, from your WordPress [admin dashboard](https://colibriwp.com/blog/wordpress-admin-dashboard-area/), navigate to `posts` and add a `category`. On the left pane of the resulting page, enter a name, slug, and a description for the post category, and then click the button `Add new category`.

The following image shows how to set up these fields.

![add-post-category](/engineering-education/create-a-headless-cms-website-using-wordpress-nextjs-and-graphql/add-post-category.png)

Now add a new post. From the admin dashboard, navigate to the left sidebar and click on `posts`. On the resulting right pop-up, click on `Add new`. 

In the resulting panel, enter the title and some dummy content as below:

![add-post-form](/engineering-education/create-a-headless-cms-website-using-wordpress-nextjs-and-graphql/add-post-form.png)

Each published post in a WordPress blog can be associated with a particular category. On the right side, click on the `Post` tab. 

In the `Categories` menu tab, check the category you created in the previous step:

![post-category-selection](/engineering-education/create-a-headless-cms-website-using-wordpress-nextjs-and-graphql/post-category-selection.png)

If you want to add a featured image, you can do so in the `Featured image` menu tab. In the `Excerpt` menu tab, add a short description of the post.

![post-excerpt](/engineering-education/create-a-headless-cms-website-using-wordpress-nextjs-and-graphql/post-excerpt.png)

Once done, navigate to the top right corner and click `Publish`, and your post will be live.

![post-publish-button](/engineering-education/create-a-headless-cms-website-using-wordpress-nextjs-and-graphql/post-publish-button.png)

With that, you have a post set up. Repeat the process a couple of times to have several posts to query from.

### Installing the WpGraphQL plugin
[WPGraphQL](https://www.wpgraphql.com/docs/introduction/) is a free, open-source WordPress plugin that provides an extendable GraphQL schema and API for any WordPress site. We will be using it to fetch GraphQL schema to help the WordPress API communicate with Next.js. Let's go ahead and install this plugin.

From the left sidebar of the dashboard, navigate to plugins. On the resulting pop-up to the right, click on `Add new`. 

On the search bar, search `WpGraphQL`:

![plugins-search-bar](/engineering-education/create-a-headless-cms-website-using-wordpress-nextjs-and-graphql/plugins-search-bar.png)

Click `Install now` on the following result.

![wp-graphql-plugin](/engineering-education/create-a-headless-cms-website-using-wordpress-nextjs-and-graphql/wp-graphql-plugin.png)

Once the installation is over, make sure to activate the plugin.

![wp-graphql-plugin](/engineering-education/create-a-headless-cms-website-using-wordpress-nextjs-and-graphql/wpgraphql-activate.png)

### Running a query from the GraphiQL IDE
After installing the plugin on your WordPress site, you will have a `GraphQL` tab at the bottom of the left sidebar. Navigate to it, and on the resulting pop-up, click `GraphiQL IDE`. This will redirect you to a GraphQL playground where you can write your queries.

To query the posts we have published, we will use the following GraphQL schema:

```js
query postsQuery{
  posts{
      edges{
      node{
          title
          categories{
          edges{
              node{
              name
              }
          }
          }
          excerpt
          slug
          content
      }
      }
  }
 }
```

We are fetching all posts from the above query, each query getting the post title, category, excerpt, and content. On the left pane, paste in the above query. Then, execute the query by hitting the play button as shown.

![wp-graphql-playbutton](/engineering-education/create-a-headless-cms-website-using-wordpress-nextjs-and-graphql/wp-graphql-playbutton.png)

### Setting up the Next.js environment
To set up the Next.js environment, follow the following steps:

- Create a simple Next.js app using [create-next-app](https://nextjs.org/docs/api-reference/create-next-app) by running the following command:

```bash
npx create-next-app cms-wordpress-app
```

- A folder `cms-wordpress-app` will be created, which will contain all the necessary files to start working on a Next.js project. Use the `Change Directory (cd)` command to get into the project folder `cms-wordpress-app` we created.

```bash
cd cms-wordpress-app
```

- To test if everything is working fine, run the following command to start the Next.js development server:

```bash
npm run dev
```

The command above will start the development server on port 3000 and expose it to your localhost. Open your browser and visit `http://localhost:3000`. A Next.js boilerplate blog will be served on your browser.

![default-next-js-page](/engineering-education/create-a-headless-cms-website-using-wordpress-nextjs-and-graphql/default-next-js-page.png)

### Adding WordPress API to Next.js using the GraphQL schema
Create a `.env.local` file and a `WORDPRESS_API_URL` in the root folder as shown below:

```bash
WORDPRESS_API_URL=your_wordpress_api_url
```

To get your `API_URL`;

- Go to your WordPress admin page.
- On the left sidebar, click on GraphQL.
- Get your URL under *GraphQL Endpoint*.

![wpgraphql-endpoint](/engineering-education/create-a-headless-cms-website-using-wordpress-nextjs-and-graphql/wpgraphql-endpoint.png)

### Connecting to the WordPress CMS
To connect to the WordPress CMS, create a folder called `lib`. In this folder, we will handle the connection from our app to the WordPress CMS.

In the `pages` folder is an `api.js` file where we will implement the various functions for communicating with the WordPress API.

So in the `api.js` file, get the `API_URL` we saved in the `env.local` file by adding this line:

```js
const API_URL = process.env.WORDPRESS_API_URL;
```

Configure a function to be called to send the request to the API as shown below:

```js
async function fetchAPI(query, { variables } = {}) {
    const headers = { 'Content-Type': 'application/json' }

    if (process.env.WORDPRESS_AUTH_REFRESH_TOKEN) {
      headers[
        'Authorization'
      ] = `Bearer ${process.env.WORDPRESS_AUTH_REFRESH_TOKEN}`
    }

    const res = await fetch(API_URL, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        query,
        variables,
      }),
    })

    const json = await res.json()
    if (json.errors) {
      console.error(json.errors)
      throw new Error('Failed to fetch API')
    }
    return json.data
  }
```

The above function will receive two parameters; the query to run and the variables to pass with the query. Then, we will fetch the data from the CMS using the query.

The request will be sent as a POST using [Fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API). If an error occurs when running the query, a message will be thrown else the data will be returned.

### Fetch all WordPress posts
Add a function to fetch all the posts as follows:

```js
export async function getPosts(){
    const data = await fetchAPI(
        `query AllPosts {
          posts(first: 20) {
            edges {
              node {
                title
                categories{
                edges{
                    node{
                    name
                    }
                }
                }
                excerpt
                slug
                author {
                  node {
                    name
                    firstName
                    lastName
                  }
                }
              }
            }
          }
        }
      `,
        {
          variables: {},
        }
      );
    return data?.posts?.edges;
}
```

In the code above, we are sending a request to the WordPress API to get the first twenty posts.

### Fetch a single WordPress post
Similarly, we can add a function to get a single post as follows:

```js
export async function getSinglePost(id){
    const data = await fetchAPI(`
    query getSinglePost($id:ID!){
        post(id:$id){           
              title
              categories{
              edges{
                  node{
                  name
                  }
              }
              }
              excerpt
              content
              slug
              id
              author {
                node {
                  name
                  firstName
                  lastName
                }
              }
        }
      }
    `,{id});

    return data?.post;
}
```

In the function above, we received the post's id that we wanted to retrieve and sent it alongside the query to get its specific data.

To show the posts in our app, we will utilize the [getServerSideProps()](https://nextjs.org/docs/basic-features/data-fetching) method. The method will run on each request to get the data from the CMS. 

The method will be implemented on the home page, where we fetch all the posts and on a specific post page.

To implement the method on the home page, follow the below steps in `pages/index.js`.

- Let's import the `getPosts` function:

```js
import {getPosts} from "../lib/api";
```

- Below the `Home` function, call the `getServerSideProps()` as shown below:

```js
export async function getServerSideProps(ctx){
  let posts = await getPosts();
  return {
    props:{
      posts
    }
  }
}
```

In the `getServerSideProps()` above, we are calling the `getPosts()` function to get the posts and return them inside the `props` object. The data will be sent to the component. We have to get it and map through it to show the posts.

- Edit the `Home` function as shown below:

```js
export default function Home({posts}) {
    return (
      <div className={styles.container}>
        <Head>
          <title>CMS blog</title>
          <meta name="description" content="CMS Wordpress with Next.js" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main>
        {
          posts.map((post,index) => (
            <div key={index}>

              <Link href={`/posts/${post.node.id}`}>
              <a style={{color:'blue'}}>{post.node.title}</a>
              </Link>
              
              <div dangerouslySetInnerHTML={{__html:post.node.excerpt}} />

              <p>By {post.node.author.node.name}</p>
            </div>
          ))
          }
        </main>

        <footer className={styles.footer}>
          <p>Posts</p>
        </footer>
      </div>
    )
  }
```

In the above function:

- We are getting the posts sent from the `getServerSideProps()`.
- Mapping through the posts and for each post showing the title, excerpt, and the author. The title is a link to a specific posts page.

### Testing
To test, let's ensure the development server is up and running using the following command:

```bash
npm run dev
```

In your browser, navigate to `http://localhost:3000`. Your post will be displayed based on the posts you added to your WordPress blog.

![posts-page](/engineering-education/create-a-headless-cms-website-using-wordpress-nextjs-and-graphql/posts-page.PNG)

### Testing with a single post
To show a single post page, navigate to the the `pages` directory and create the `posts` directory. Inside the `posts` directory, create `[id].js` file. 

The [] signifies that the id will be dynamic. 

In the `[id].js` file, import the `getSinglePost` function:

```js
import {getSinglePost} from "../../lib/api";
```

This function does two things:

- It gets the posts sent from the `getServerSideProps()`.
- It maps through the posts and for each post showing the title, excerpt, and the author. The title is a link to a specific posts page.

Next, implement `getServerSideProps()` as follows:

```js
export async function getServerSideProps(ctx){
    let {id} = ctx.params;
    let post = await getSinglePost(id);
    
    return {
        props:{
            post
        }
    }
}
```

From the block of code above, we get the post's id, fetch the post based on that id, and send the post inside the props object. The next step is to implement a function for the view.

To do that, import the `styles` module and `Head` package from Next.js:

```js
import Head from "next/head";
import styles from '../../styles/Home.module.css';
```

Next, create a `Post` function as shown below:

```js
export default function Post({post}) {
    return (
        <div className={styles.container}>

            <Head>
                <title>{post.title}</title>
            </Head>
            <main>                
                <div dangerouslySetInnerHTML={{__html:post.excerpt}} />
                <br />
                <br />
                <div dangerouslySetInnerHTML={{__html:post.content}} />
            </main>

        </div>
    )
}
```

Here, we get the post passed and render it to the view from the above function by showing its title, excerpt, and content. Feel free to show as many fields as you want but make sure they are in the query.

To test this, ensure the development server is running, we can start it by running;

```bash
npm run dev
```

In your browser, navigate to `http://localhost:3000`.

![post-page](/engineering-education/create-a-headless-cms-website-using-wordpress-nextjs-and-graphql/post-page.png)

To test the implementation, click on the title of any post on the home page. You should be redirected to a single post page. Then, click on the back arrow and explore the other posts.

### Conclusion
We have managed to create posts in WordPress, query, and show them from a Next.js application. To gain more insightful knowledge about the various technologies and concepts used, check out the resources listed in the reference section.

Happy coding!

### References
- [WpGraphQL](https://www.wpgraphql.com/)
- [WordPress CMS](https://wordpress.org/)
- [Next.js](https://nextjs.org/)
- [GraphQL](https://graphql.org/)
- [Data fetching in Next.js](https://nextjs.org/docs/basic-features/data-fetching)

---
Peer Review Contributions by: [Willies Ogola](/engineering-education/authors/willies-ogola/)
