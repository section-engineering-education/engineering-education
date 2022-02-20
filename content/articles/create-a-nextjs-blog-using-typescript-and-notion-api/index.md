### How to Create a Next.js Blog App using Typescript and the Notion as the CMS

Next.js has been used to create Server-side Rendering" (SSR) and "Static Site Generation" (SSG) apps using JavaScript. This means the app fetches extra data from the server after the browser loads the website's HTML page. Technologies such as SSG often have to rebuild the app when data from the source is updated and render it to the user at build time—making the site load even faster. Hence good user experiences.

This guide will help you learn how to use Next.js with Notion API and create a blog app powered by Typescript code.

### Prerequisites

To continue in this article, it is helpful to have the following:

- [Node.js](https://nodejs.org/en/) installed on your computer.
- Basic knowledge working with TypeScript and Next.js.

### Overview

- [How to Create a Next.js Blog App using Typescript and the Notion as the CMS](#how-to-create-a-nextjs-blog-app-using-typescript-and-the-notion-as-the-cms)
- [Prerequisites](#prerequisites)
- [Overview](#overview)
- [Setting up the database on Notion](#setting-up-the-database-on-notion)
- [Setting up an integration on Notion](#setting-up-an-integration-on-notion)
- [Setting up the Nextjs application](#setting-up-the-nextjs-application)
- [Querying multiple posts](#querying-multiple-posts)
- [Querying single post](#querying-single-post)

### Setting up the database on Notion

First, create a notion account. If you already have an account, just [login](https://www.notion.so/login) or [register](https://www.notion.so/login) a new account.

Once you have created an account, click on the plus icon under *Getting Started* of the dashboard page. On the resulting popup, under *Database*, click on *list*. A sample skeleton will be loaded:

![list-database-skeleton](list-database-skeleton.png)

Enter the title. Feel free to add an icon and a cover image.

On the first default page *page 1*, click on it. Change the title to any of your preferences:

![page-title-change](page-title-change.png)
  
Change the icon and cover image too. For this article, ensure the cover image you pick is from Unsplash:

![cover_image_change](cover-image-change.png)

![cover_image_changed](cover-image-changed.png)

Scroll down to the content section. Add some *prerequisites* to your blog on a bullet list:

![prerequisites_section](prerequisites-section.png)
Add some dummy body:

![body_section](body-section.png)

Append an image; remember to source it from Unsplash:

![image_section](image-section.png)

Append some conclusions:

![conclusion_section](conclusion-section.png)

Click outside the modal when done.

Your post should now be listed as below:

![database_posts](database-posts.png)

Feel free to add as many posts as you can while following the guidelines above.

### Setting up an integration on Notion

On the left pane, click on *Settings & Members*. On the resulting modal, on the left section, under *Workspace*, click on *Integrations*. If you already have integrations listed, you can avoid the following steps, else click on *Develop your own integrations*:

![notion_integrations](notion-integration.png)

Click on *Create New Integration*:

![create_new_integrations](notion-create-new-integration.png)

Give it a name e.g *blog_app_integration*, then click *Submit*.

You should now be able to view your secrets, i.e., the integration token:

![notion_secrets](notion-secrets.png)

Go back to the workspace you created in the previous step, i.e., *Latest posts*.

On the top right, click on *Share*:

![notion_share](notion-share.png)

Click on Invite. On the resulting modal, under *integrations*, you should be able to see the integration we just created:

![notion_integrations](notion-integrations.png)

Click on the integration, and then on the top right, click *Invite*.

With that, we will be able to access our workspace using the integration token we generated in the previous step.

### Setting up the Nextjs application

- Proceed to the desired project folder. Run the following command to bootstrap the application:

```bash
npx create-next-app blog_app --ts
```

*--ts* flag so as we can use TypeScript.

Once the process is done, install the notion client package:

```bash
npm install @notionhq/client
```

On the project root folder, create a *.env* file. In it, we will host two variables, the integration token key, and the database id:

```bash
NOTION_KEY=""
NOTION_DATABASE=""
```

To get the *notion key*, on the page of the integration we created in the previous step, under *Secrets*, Click on *Show* and the *Copy* and paste it in the file above.

To get the *notion database id*, on the workspace page, on the page URL. Copy the first path parameter before the query parameter as in the below illustration:

```bash
https://www.notion.so/your_database_id?v=some_long_hash
```

Start the development server:

```bash
npm run dev
```

On your browser, open  *<http://localhost:3000>*, you should be able to view the default Next.js page.

### Querying multiple posts

On the project root folder, create a folder *lib*. Inside *lib*, create a file: *notion.ts*. On *notion.ts*:

Import the client package:

```ts
import {Client} from '@notionhq/client';
```

Instantiate the client:

```ts
const client = new Client({
    auth: process.env.NOTION_KEY,
});
```

Define a function to get the posts:

```ts
async function posts() {
    const myPosts = await client.databases.query({
        database_id: process.env.NOTION_DATABASE,
    });
    return myPosts;
}
```

Export an object with the function:

```ts
export {
    posts
}
```

On *pages/index.tsx*, import the function we have defined above:

```ts
import {posts} from '../lib/notion'
```

Fetch the posts from the server-side;

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

Define an interface for the props:

```ts
interface Props {
    posts: [any]
}
```

Render the posts to the view:

```ts
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

Add the following styles to *styles/Home.module.css*:

```css
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
```

Ensure your development server is up and running. You should now be able to view your posts on the home page:

![posts_page](posts-page.png)

### Querying single post

On *lib/notion.ts*, add a function to get a single post based on id:

```ts
async function post(id: string) {
    const myPost = await client.pages.retrieve({
        page_id: id,
    });
    return myPost;
}
```

Add another function on the same file to get the children(blocks) of a particular post:

```ts
async function blocks(id: string) {
    const myBlocks = await client.blocks.children.list({
        block_id: id
    });
    return myBlocks;
}
```

Add the functions to the exported object:

```ts
export {
    posts,
    post,
    blocks
} 
```

On the root folder, create a *posts* folder. Inside it, create an *[id].tsx* file to serve the dynamic post. In *[id].tsx*, add the following imports:

```ts
import { GetStaticProps, NextPage, GetStaticPaths } from 'next';
import Image from 'next/image';
import Head from 'next/head';
import Link from 'next/link';
import { ParsedUrlQuery } from 'querystring';
import { post, posts, blocks } from '../../lib/notion';
import styles from '../../styles/Home.module.css';
```

Implement an interface for the context when getting the dynamic id:

```ts
interface IParams extends ParsedUrlQuery {
    id: string
}
```

Get the dynamic post, children from the server-side:

```ts
export const getStaticProps: GetStaticProps = async (ctx) => {
    let { id } = ctx.params as IParams; // Get the dynamic id
    let page_result = await post(id); // Fetch the post
    let { results } = await blocks(id); // Get the children
    return {
        props: {
            id,
            post: page_result,
            blocks: results
        }
    }
}
```

Implement the paths for the other posts on *getStaticPaths*:

```ts
export const getStaticPaths: GetStaticPaths = async () => {
    let { results } = await posts(); // Get all posts
    return {
        paths: results.map((post) => { // Go through every post
            return {
                params: { // set a params object with an id in it
                    id: post.id
                }
            }
        }),
        fallback: false
    }
} 
```

Implement an interface for the *Props*:

```ts
interface Props {
    id: string,
    post: any,
    blocks: [any]
}
```

Implement a function to render a child:

```ts
const renderBlock = (block: any) => {
    switch (block.type) {
        case 'heading_1': // For a heading
            return <h1>{ block['heading_1'].text[0].plain_text } < /h1> 
        case 'image': // For an image
            return <Image src={ block['image'].external.url } width = { 650} height = { 400} />
            case 'bulleted_list_item': // For an unordered list
            return <ul><li>{ block['bulleted_list_item'].text[0].plain_text } < /li></ul >
            case 'paragraph': // For a paragraph
            return <p>{ block['paragraph'].text[0]?.text?.content } < /p>
        default: // For an extra type
            return <p>Undefined type < /p>
    }
}
```

Implement the view to render the post:

```ts
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

Add some style to the *blogPageHolder* class:

```css
.blogPageHolder {
    display: flex;
    flex-direction: column;
    justify-content: left;
    width: 50%;
    margin: 10px auto;
}
```

Ensure that the development server is running, and then click on any title of the posts on the home page:

![single_post_page](single-post-page.png)

You have now implemented a blog application utilizing Notion as your CMS/Database API.
