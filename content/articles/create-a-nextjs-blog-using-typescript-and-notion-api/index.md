---
layout: engineering-education
status: publish
published: true
url: /create-a-nextjs-blog-using-typescript-and-notion-api/
title: Next.js Blog using Typescript and Notion API 
description: This guide will help the reader learn how to use the Next.js with Notion API to create a blog app powered by Typescript.
author: joseph-chege 
date: 2022-03-25T00:00:00-17:00
topics: [Languages, API]
excerpt_separator: <!--more-->
images:
  - url: /engineering-education/create-a-nextjs-blog-using-typescript-and-notion-api/hero.jpg
    alt: Next.js Blog using Typescript and Notion API  Hero Image
---
Next.js is used to create Server-side Rendering (SSR) and Static Site Generation (SSG) using JavaScript. The app fetches extra data from the server after the browser loads the website's HTML page. 
<!--more-->
Technologies such as SSG often have to rebuild the app when data from the source is updated and render it to the user at build-time, making the site load even faster, creating a better user experience.

This guide will help the reader learn how to use Next.js with Notion API to create a blog app powered by Typescript code.

### Prerequisites
To follow along with this article, it is helpful to have the following:
- [Node.js](https://nodejs.org/en/) installed on your computer.
- Basic knowledge working with Typescript and Next.js.

### Overview
- [Prerequisites](#prerequisites)
- [Overview](#overview)
- [Setting up the database on Notion](#setting-up-the-database-on-notion)
- [Setting up an integration on Notion](#setting-up-an-integration-on-notion)
- [Setting up the Next.js application](#setting-up-the-nextjs-application)
- [Querying multiple posts](#querying-multiple-posts)
- [Querying single post](#querying-single-post)

### Setting up the database on Notion
First, create a notion account. If you already have an account, just [login](https://www.notion.so/login) or [register](https://www.notion.so/login) a new account.

Once you have created the account, hover over the `Getting Started` section of the dashboard page and click on the plus icon to add a new notion page. 

Under `Database`, click on `list` on the resulting popup. A sample skeleton will be loaded. Go ahead and enter a project title.

![list-database-skeleton](/engineering-education/create-a-nextjs-blog-using-typescript-and-notion-api/list-database-skeleton.PNG)

Navigate to the first default page, `page 1`, and click on it. Change the title as you prefer. 

![page-title-change](/engineering-education/create-a-nextjs-blog-using-typescript-and-notion-api/page-title-change.PNG)
  
You can choose to change the icon and cover image using the free images from [Unsplash](https://unsplash.com/). Hover over the page title and click the `Add cover` button to add the cover image.

![cover_image_change](/engineering-education/create-a-nextjs-blog-using-typescript-and-notion-api/cover-image-change.PNG)

![cover_image_changed](/engineering-education/create-a-nextjs-blog-using-typescript-and-notion-api/cover-image-changed.PNG)

Every new page created is a blank canvas where you can add content such as plain text, lists, and images. To add content to a page, scroll down to the content section and add some `prerequisites` to your blog page as shown below:

![page-content-section](/engineering-education/create-a-nextjs-blog-using-typescript-and-notion-api/page-content-section.png)

![prerequisites_section](/engineering-education/create-a-nextjs-blog-using-typescript-and-notion-api/prerequisites-section.PNG)

Add dummy body to the post body.

![body_section](/engineering-education/create-a-nextjs-blog-using-typescript-and-notion-api/body-section.PNG)

Add an image. Select an image from [Unsplash](https://unsplash.com/).

![image_section](/engineering-education/create-a-nextjs-blog-using-typescript-and-notion-api/image-section.PNG)

Append some conclusions.

![conclusion_section](/engineering-education/create-a-nextjs-blog-using-typescript-and-notion-api/conclusion-section.PNG)

Click outside the modal when done. The post should now be listed as shown below:

![database_posts](/engineering-education/create-a-nextjs-blog-using-typescript-and-notion-api/database-posts.PNG)

Repeat the same process for `page 2` and `page 3`. You can add other posts the same way.

### Setting up an integration on Notion
Navigate to the `Settings & Members` section of your notion dashboard page. Click `Integrations` under the `Workspace` section on the resulting modal. Then set the notion integration as shown in the following steps:

![notion_integrations](/engineering-education/create-a-nextjs-blog-using-typescript-and-notion-api/notion-integration.PNG)

Create a new integration. To do so, click on `Develop your Integration`. Then click the plus button to set up a new integration:

![create_new_integrations](/engineering-education/create-a-nextjs-blog-using-typescript-and-notion-api/notion-create-new-integration.PNG)

Name the integration `blog_app_integration`, then click `Submit` to set it up. Once done, you should be able to view the notion integrations settings, i.e., the integration token.

Scroll down and click save changes to reveal the notion-integration key to save this integration. Copy this key for use in connecting to Next.js.

![notion_secrets](/engineering-education/create-a-nextjs-blog-using-typescript-and-notion-api/notion-secrets.PNG)

Go back to the workspace created in the previous step, where you created the pages, i.e., `Latest posts`, and click on `Share`:

![notion_share](/engineering-education/create-a-nextjs-blog-using-typescript-and-notion-api/notion-share.PNG)

Click on Invite. On the resulting modal, you should be able to see the integration just created:

![notion_integrations](/engineering-education/create-a-nextjs-blog-using-typescript-and-notion-api/notion-integrations.PNG)

Click on the `blog_app_integration` integration, and then `Invite` to add your pages to this new notion integration.

![selected-integration](/engineering-education/create-a-nextjs-blog-using-typescript-and-notion-api/selected-integration.PNG)

With that, you will be able to access your workspace using the integration-generated token.

### Setting up the Next.js application
To set up a Next.js project, create a project folder, then run the following command to bootstrap the application inside the created directory:

```bash
npx create-next-app blog_app --ts
```

The `--ts` flag allows your app to run using Typescript.

This command will create a basic Next.js app inside the folder `blog_app`. Once the process is done, navigate to the `blog_app` folder using the command `cd blog_app` and install the notion client package:

```bash
npm install @notionhq/client
```

On the project root folder, create a `.env` file. This file will host the notion integration key that Next.js needs to access and connect with the notion API. Go ahead and add the two notion variables, the integration token key and the database id:

```bash
NOTION_KEY=""
NOTION_DATABASE=""
```

Paste the integration key copied earlier and add it to the `NOTION_KEY` value. If you did not copy this key, navigate to the integration page, under `Secrets`, click on `Show` and then `Copy` and paste it in the `NOTION_KEY` entry.

To get the `NOTION_DATABASE` ID, check your workspace page URL. Copy the first path parameter before the query parameter as shown in the illustration below:

![notion-api](/engineering-education/create-a-nextjs-blog-using-typescript-and-notion-api/notion-id.png)

In this case the id would be `53905ad838f04731b48fb1e40c25766a`. Let us say that your workspace URL is `https://www.notion.so/your_database_id?v=some_long_hash`. The parameter `your_database_id` should be the `NOTION_DATABASE`.

Start the development server to test the app.

```bash
npm run dev
```

Navigate to `http://localhost:3000`; you should be able to view the default Next.js page.

### Querying multiple posts
On the project root folder, create a folder named `lib`. Inside `lib`, create a file `notion.ts`. Then add the following code to query multiple posts from the notion API.

Start by importing the notion client package:

```ts
import {Client} from '@notionhq/client';
```

Instantiate the notion client using your notion integration key:

```ts
const client = new Client({
   auth: process.env.NOTION_KEY,
});
```

Define a function to get the posts. This function processes and queries the list of posts from the notion database:

```ts
async function posts() {
   const myPosts = await client.databases.query({
     database_id: `${process.env.NOTION_DATABASE}`,
   });
   return myPosts;
}
```

Export an object with the function. This export will make the function accessible by other files inside the project:

```ts
export {
   posts
}
```

On `pages/index.tsx`, import the function you have defined above and the Next.js link dependencies:

```ts
import Link from 'next/link';
import {posts} from '../lib/notion'
```

Then, fetch the posts from the server-side using the Next.js `getServerSideProps()` function:

```ts
export async function getServerSideProps() {
   // Get the posts
   let { results } = await posts();
   // Return the result
   return {
     props: {
       posts: results
     }
   }
}
```

Define an interface for the props. This interface creates the structure of `posts` and holds the array of posts:

```ts
interface Props {
   posts: [any]
}
```

To show the list of posts, render the posts to the view that lists down the fetched posts from the server-side:

```html
const Home: NextPage<Props> = (props ) => {
   return (
     <div className={styles.container}>
     <Head>
       <title>Latest posts</title>
     </Head>

     <main className={styles.main}>
       <h1 className={styles.title}>
       Latest posts
       </h1>
       {
         props.posts.map((result,index) => {
         return (
           <div className={styles.cardHolder} key={index}>
           <Link href={`/posts/${result.id}`}>
             <Image src={result.cover.external.url} width={300} height={200} />
           </Link>
           <div className={styles.cardContent}>
             <Link href={`/posts/${result.id}`}>
             <a className={styles.cardTitle}>{
             result.properties.Name.title[0].plain_text
             }</a>
             </Link>
           </div>
           </div>
           )
         })
       }
     </main>

     <footer className={styles.footer}>
       <p>Blog application</p>
     </footer>
     </div>
   )
}
```

For the Next.js application to load images, you must configure the image hostname/domain under images in your `next.config.js`. 

In this example, you loaded images from `unsplash.com`. To add this domain, navigate to the `next.config.js` and configure the `unsplash.com` image source as shown below:

```js
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['images.unsplash.com']
  }
}
```

Add the following styles to `styles/Home.module.css`. This will style the fetched posts:

```css
.container {
  padding: 0 2rem;
}

.main {
  min-height: 100vh;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.cardHolder {
   display: flex;
   width: 40%;
   margin: 10px auto;
   justify-content: space-between;
   padding: 10px;
   border: 1px solid #d4d4d4;
}

.cardContent {
   width: 100%;
   display: flex;
   align-items: center;
   justify-content: center;
}

.footer {
  display: flex;
  flex: 1;
  padding: 2rem 0;
  border-top: 1px solid #eaeaea;
  justify-content: center;
  align-items: center;
}

.footer a {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
}
```

To test this code, ensure the development server is up and running. You should now be able to view the posts on the home page.

![posts_page](/engineering-education/create-a-nextjs-blog-using-typescript-and-notion-api/posts-page.PNG)

### Querying single post
Let us create a function that will fetch a single post from the notion database. 

Navigate to the `lib/notion.ts` file and add a function to get a single post based on the post id as shown below:

```ts
async function post(id: string) {
   const myPost = await client.pages.retrieve({
     page_id: id,
   });
   return myPost;
}
```

Add another function inside the `lib/notion.ts` file. A post has other properties such as prerequisites and conclusion, which can be referred to as the children's properties of a particular post. 

Create a function `blocks()` to get the children (blocks) of a particular post:

```ts
async function blocks(id: string) {
   const myBlocks = await client.blocks.children.list({
     block_id: id
   });
   return myBlocks;
}
```

Export the functions `post()` and `blocks()` to make them accessible by other files inside your project:

```ts
export {
   posts,
   post,
   blocks
} 
```

On the root folder, create a `posts` folder. Inside the folder, create an `[id].tsx` file. This file will serve the dynamic post based on the parameter id. In `[id].tsx`, add the following imports:

```ts
import { GetStaticProps, NextPage, GetStaticPaths } from 'next';
import Image from 'next/image';
import Head from 'next/head';
import Link from 'next/link';
import { ParsedUrlQuery } from 'querystring';
import { post, posts, blocks } from '../../lib/notion';
import styles from '../../styles/Home.module.css';
```

Next, implement an interface for this context. This  interface will be applied when getting the dynamic id:

```ts
interface IParams extends ParsedUrlQuery {
   id: string
}
```

Get the dynamic post and the children properties from the server-side:

```ts
export const getStaticProps: GetStaticProps = async (ctx) => {
   let { id } = ctx.params as IParams; 
   // Get the dynamic id
   let page_result = await post(id); 
   // Fetch the post
   let { results } = await blocks(id); 
   // Get the children
   return {
     props: {
       id,
       post: page_result,
       blocks: results
     }
   }
}
```

Implement the paths for fetching all posts using `getStaticPaths`. Then map the results using the parameter id. This will help Next.js to go through every fetched post and display it based on its dynamic id:

```ts
export const getStaticPaths: GetStaticPaths = async () => {
   let { results } = await posts(); 
   // Get all posts
   return {
     paths: results.map((post) => { 
       // Go through every post
       return {
         params: { 
           // set a params object with an id in it
           id: post.id
         }
       }
     }),
     fallback: false
   }
} 
```

Implement an interface for the `Props`:

```ts
interface Props {
   id: string,
   post: any,
   blocks: [any]
}
```

Implement a function to render each child. For example, a single post has a heading, a hero image, the post content, and an unordered list of items. This function will help render them to from the server.

```ts
const renderBlock = (block: any) => {
   switch (block.type) {
     case 'heading_1': 
     // For a heading
       return <h1>{ block['heading_1'].text[0].plain_text } </h1> 
     case 'image': 
     // For an image
       return <Image src={ block['image'].external.url } width = { 650} height = { 400} />
       case 'bulleted_list_item': 
       // For an unordered list
       return <ul><li>{ block['bulleted_list_item'].text[0].plain_text } </li></ul >
       case 'paragraph': 
       // For a paragraph
       return <p>{ block['paragraph'].text[0]?.text?.content } </p>
     default: 
     // For an extra type
       return <p>Undefined type </p>
   }
}
```

Once the post has been rendered, create a view that will display the post to the user as shown below:

```js
const Post:NextPage<Props> = ({id,post,blocks}) => {
   return (
     <div className={styles.blogPageHolder}>
       <Head>
         <title>
           {post.properties.Name.title[0].plain_text}
         </title>
       </Head>
       <div className={styles.blogPageNav}>
         <nav>
           <Link href="/">
             <a>Home</a>
           </Link>
         </nav>
       </div>
       {
         blocks.map((block,index) => {
           return (
             <div key={index} className={styles.blogPageContent}>
               {
                 renderBlock(block)
               }
             </div>
           )})
       }
     </div>
   )
}
```

Add the view export:

```ts
export default Post;
```

Next, add some style to the `blogPageHolder` class to format the rendered post:

```css
.blogPageHolder {
   display: flex;
   flex-direction: column;
   justify-content: left;
   width: 50%;
   margin: 10px auto;
}

@media (max-width: 600px) {
  .grid {
    width: 100%;
    flex-direction: column;
  }
}
```

Ensure that the development server is running, and then click on any title of the posts on the home page:

![single_post_page](/engineering-education/create-a-nextjs-blog-using-typescript-and-notion-api/single-post-page.PNG)

### Conclusion
This guide helped the reader set up a notion database. We then used the database with Next.js. 

Check this project on this [GitHub](https://github.com/kimkimani/nextjs-blog-app-using-typescript-and-notion) repository.

Happy coding!

---
Peer Review Contributions by: [Jerim Kaura](/engineering-education/authors/jerim-kaura/)
