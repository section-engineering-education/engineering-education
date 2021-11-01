---
layout: engineering-education
status: publish
published: true
url: /how-to-run-contentful-cms-as-headless-with-nextjs/
title: How to Run Contentful CMS as Headless with Nextjs
description: In this guide, we will learn how we can use Next.js to run a website as a headless CMS. Next.js uses generators that render static pages.
author: catherine-macharia
date: 2021-11-01T00:00:00-05:34
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/how-to-run-contentful-cms-as-headless-with-nextjs/hero.png 
    alt: How to run Contentful CMS as headless with Nextjs Image
---
Contentful is a headless CMS. This means that it is built as a content repository and avails data through an API.
<!--more-->
In this article, we will create simple blog posts on the CMS and then display them to users using Next.js. 

We will query the data from the CMS using an API and a content model. 

A content model refers to a Schema, which will allow the generation of similarly structured data. 

For example, for every blog post, we want to have a title, an excerpt, a description, a cover image, and a date. All these fields make up the Schema.

### What is a headless CMS
A content-oriented CMS consists of the backend and the frontend. This way, they both run as a monolithic system. It combines various modules and features and runs like one. 

So when you run a CMS as a headless system, both the content and the presentation are decoupled. As a headless system, the content presentation layer is flexible. 

The backend can now be driven with raw data using APIs (application programming interface).

### Reasons for running WordPress as a headless CMS
This technique allows you to modify the content delivery channels that you present to users. In other words, it lets you change the way content is presented without re-authorizing it.

Since the data is delivered as raw data, you can use any technology that fits your needs. API-driven data promotes omnichannel architecture.

It simplifies developers' work by separating the frontend and backend components. This means that you can create a faster efficient, and scalable application.

### Goal
This article will interact with Contentful as a headless CMS. We will showcase this concept by building a simple posts app with Next.js.

### Pre-requisites
To follow along with this article, you should have:
- [Node.js](https://nodejs.org/en/) installed on your computer.
- [Git](https://git-scm.com/) installed on your computer.
- Some working knowledge with JavaScript and Next.js.
- Some working knowledge with Git.

### Table of contents
- [What is a headless CMS](#what-is-a-headless-cms)
- [Reasons for running WordPress as a headless CMS](#reasons-for-running-wordpress-as-a-headless-cms)
- [Goal](#goal)
- [Prerequisites](#prerequisites)
- [Table of contents](#table-of-contents)
- [Creating an account with Contentful](#creating-an-account-with-contentful)
- [Setting up the content model](#setting-up-the-content-model)
- [Adding posts to Contentful](#adding-posts-to-contentful)
- [Setting up the Next.js app](#setting-up-the-nextjs-app)
- [Adding Contentful credentials to the Next.js app](#adding-contentful-credentials-to-the-nextjs-app)
- [Querying the added posts](#querying-the-added-posts)
- [Displaying posts](#displaying-posts)
- [Testing simpleBlogPostCollection](#testing-simpleblogpostcollection)
- [Solving the single post 404 error](#solving-the-single-post-404-error)
- [Fetching a single post data](#fetching-a-single-post-data)
- [Displaying a single post](#displaying-a-single-post)
- [Testing simpleBlogPost](#testing-simpleblogpost)
- [Preview mode](#preview-mode)
- [Hosting to Vercel](#hosting-to-vercel)
- [References](#references)

### Creating an account with Contentful
You need to have an account with Contentful. If you already have an account, just [login](https://be.contentful.com/login) and continue to the next step, else you can follow the steps below to create one:

- Visit the [signup](https://www.contentful.com/sign-up/) page.
- You can signup manually, or you can also use your Google or GitHub account. 
- Answer the highlighted questions.
- Then click `Start With Contentful`.

At this point, you are ready for the next step.

### Setting up the content model
A content model refers to a Schema, which supports the generation of similarly structured information. 

For example, for every blog post we want to have a ***title***, an ***excerpt***, a ***description***, a ***cover-image***, and a ***date***. 

To set up the above Schema, follow the steps below:

- On the top bar, click on ***Content model***.
- And then ***Design your content model***.
- Press the ***Create content type*** button in the modal that pops up.
- Give the ***content type*** a name of ***simple blog post***, the API identifier field is auto-populated. Next, provide a brief comment in the `descriptions` field.

It's now time to add the fields to make up the Schema. We will add the fields we have discussed above one by one. We can do this using the `add field` button.

Remember to save the preferences once you are done.

At this point, we have defined our Schema by creating a content type and adding fields to that content type. We now move on to adding Content to our `content type`.

### Adding posts to Contentful
After adding the content type, it is now time to add the data that we want to see in our app.

To do this, we will follow the following steps:

- On the top navigation bar, click `Content`.
- Click the `Add simple blog post` button.
- On the resulting form, input the `title`, `excerpt`, and `description`. You can also choose to add dummy text or not.

Let's now add the cover image. 

To do so, click on `Add new media`, give it a title like `simple cover image` or something else, by hitting `Open file selector`. 

You can then upload an image from your computer or other sources. Once you select a file, click on the `Publish` button. 

Remember to add the current date. Finally, click on the `Publish` button. You will see a notification message that your blog post was added successfully. 

On the content page, you should see your published blog post. You can repeat the process to add several posts. 

### Setting up the Next.js app
We will use [create-next-app](https://nextjs.org/docs/api-reference/create-next-app) to set up the Next.js environment. 
 
To generate this Next.js template app, open a terminal (command line) and run the following command from the directory:

```bash
npx create-next-app contentful-nextjs-app
```

The above command will create the Next.js app inside the `contentful-nextjs-app` folder. 

You can navigate to this project folder using the `cd` command, as shown below;

```bash
cd contentful-nextjs-app
```

### Adding Contentful credentials to the Next.js app
For Next.js to communicate with the Contentful API, we will need to add credentials for validation. 

In your `contentful-nextjs-app` project folder, create a `.env.local` file. 

This file will host the environmental variables to connect to Contentful. Add the following properties to the file:

```bash
CONTENTFUL_SPACE_ID=your_contentful_space_id
CONTENTFUL_ACCESS_TOKEN=your_contentful_space_token
CONTENTFUL_PREVIEW_ACCESS_TOKEN=your_contentful_preview_access_token
CONTENTFUL_PREVIEW_SECRET=your_contentful_preview_secrets
```
To access the above variables, we will use the following steps:

- From your Contentful dashboard page, click on `Settings`.
- Under `Space settings`, click on `API keys`.

If you have not added an `API key` yet, click on the `Add Api Key` button.

In the resulting form:

- Copy the `Space ID` and paste it to the `CONTENTFUL_SPACE_ID` field.
- Copy the `Access token` and paste it to the `CONTENTFUL_ACCESS_TOKEN` field.
- Copy the `Preview access token` and paste it to the `CONTENTFUL_PREVIEW_ACCESS_TOKEN` field.
- For the `CONTENTFUL_PREVIEW_SECRET`, key in any random string.

Our app is now fully set up, and we are ready to proceed to the next step.

### Querying the added posts
At this point, we can now fetch the posts that we added earlier. To query these posts, we will first set up the API.

Start by creating a `lib` folder in your project's root folder. Inside the `lib` folder, create an `api.js` file. 

In the `api.js`, we will declare the fields that we need to fetch, as shown below:

```js
const POST_GRAPHQL_FIELDS = `
    sys {
        id
    }  
    title
    coverImage {
        url
    }
    date
    excerpt
    description {
        json
    }`
```

In the above code, we are defining the fields we want for each blog post using the Schema we created earlier.

Still in the `api.js` file, create a custom `fetchGraphQL` method for establishing contact with the Contentful API:

```js
async function fetchGraphQL(query, preview = false) {
    return fetch(
        `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}`,
        {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${
            preview
                ? process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN
                : process.env.CONTENTFUL_ACCESS_TOKEN
            }`,
        },
        body: JSON.stringify({ query }),
        }
    ).then((response) => response.json())
}
```

The above `fetchGraphQL` method will form the base for querying the posts. We will send a `POST` request to the Contentful API with the `URL` and `headers` set. 

Note that the `body` is dynamic in each request.

Next, we need to create a method for extracting data from the retrieved posts:

```js
function extractPostEntries(fetchResponse) {
    return fetchResponse?.data?.simpleBlogPostCollection?.items
}
```

For every response from the Contentful API, the data will be returned with various metadata. So we have to narrow it down to the data we want.

Now, create a function to query the posts from the Contentful API :

```js
export async function getAllPostsForHome(preview) {
    const entries = await fetchGraphQL(
        `query {
        simpleBlogPostCollection(order: date_DESC, preview: ${preview ? 'true' : 'false'}) {
            items {
            ${POST_GRAPHQL_FIELDS}
            }
        }
        }`,
        preview
    )
    return extractPostEntries(entries)
}
```

In the above code, we are using the `fetchGraphQL` method we defined above to get posts from the CMS. 

Note that we will use `simpleBlogPostCollection` when we are querying more than one blog post. If we were querying one blog post, we would use `simpleBlogPost`.

### Displaying posts
We can now show the posts. In `pages/index.js`, we will fetch the posts using [getStaticProps](https://nextjs.org/docs/basic-features/data-fetching#getstaticprops-static-generation). 

It simply implies that data will be pre-rendered at build time. This helps Next.js to load this data ahead of time. 

Furthermore, this makes the web app render the Content fast as if it was a static page.

To implement this, import the `getAllPostsForHome` function from `lib/api.js` specified at the top of the `pages/index.js`.

```js
import {getAllPostsForHome} from "../lib/api"
```

Also, add the following code after the `Home` function:

```js
export async function getStaticProps({preview = false}){
    let allPosts = (await getAllPostsForHome(preview))  ?? [];

    return {
        props: { preview, allPosts }
        
    }
    
    }
```

Since we are now fetching the posts, we will modify the `Home` function as follows so that we can receive and show the posts:

```js
export default function Home({allPosts}) {
    return (
        <div className={styles.container}>
        <Head>
            <title>Blog app</title>
            <meta name="description" content="Simple blog app with Contentful CMS" />
            <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className={styles.main}>

            <div className={styles.grid}>
            {
                allPosts.length > 0 ? (
                allPosts.map((post) => (
                    <div className={styles.card} key={post.sys.id}>
                    <div className={styles.imageHolder}>
                        <img src={post.coverImage.url} alt={post.title} />
                    </div>
                    <div className={styles.details}>
                        <Link href={`posts/${post.sys.id}`}>
                        <a>
                        {post.title} &rarr;
                        </a>
                        </Link>
                        <p>{post.excerpt}</p>
                    </div>
                    </div>
                ))
                ) : (
                <div className={styles.card}>
                <p>No posts added!</p>
            </div>
                )
            }
            </div>
        </main>

        <footer className={styles.footer}>
            <p>Simple blog app</p>
        </footer>
        </div>
    )
    }
```

In the above code, we check if we have any posts. If this is true, we loop through the results and display each of them. Otherwise, we display a message if we do not have posts. 

Modify the `styles/Home.module.css` as follows to include the changes we have made to the `Home` function:

```css
.container {
  min-height: 100vh;
  padding: 0 0.5rem;
}

.main {
  padding: 5rem 0;
  min-height: 85vh;
}

.footer {
  width: 100%;
  padding: 1rem;
  border-top: 1px solid #eaeaea;
  display: flex;
  justify-content: center;
  align-items: center;
}

.footer a {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}

.title a {
  color: #0070f3;
  text-decoration: none;
}

.title a:hover,
.title a:focus,
.title a:active {
  text-decoration: underline;
}

.title {
  margin: 0;
  line-height: 1.15;
  font-size: 1rem;
}

.title,
.description {
  text-align: left;
  padding: 12px;
}

.description {
  line-height: 1.5;
  font-size: 1.5rem;
}
.grid {
  max-width: 800px;
  margin: 0px auto;
  /* display:flex;
    justify-content: left; */
}

.card {
  margin: 1rem;
  text-align: left;
  color: inherit;
  text-decoration: none;
  border: 1px solid #eaeaea;
  border-radius: 10px;
  transition: color 0.15s ease, border-color 0.15s ease;
  width: 90%;
  display: flex;
  justify-content: space-between;
}

.imageHolder {
  width: 15%;
}

.imageHolder img {
  width: 100%;
  height: 100%;
  margin-right: 10px;
  border-radius: 10px 0px 0px 10px;
}

.details {
  width: 85%;
  padding: 1.5rem;
}

.details a {
  margin: 0 0 1rem 0;
  font-size: 16px;
  font-weight: bold;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}

.details p {
  margin: 0;
  font-size: 14px;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  line-height: 1.5;
}

@media (max-width: 600px) {
  .grid {
    width: 100%;
    flex-direction: column;
  }
}
```

After doing the changes, we are now ready to view the posts.

### Testing simpleBlogPostCollection
We are now ready to test if we can fetch all posts that we added to the Contentful API. 

To do so, ensure that your development server is started by running the following command from the terminal in the `contentful-nextjs-app` project root folder.

```bash
npm run dev
```

Open your browser and navigate to `http://localhost:3000`. You should view the posts now. 

In case of any error, kindly revisit the ABOVE steps. Your page should be similar to:

![home-page](/engineering-education/how-to-run-contentful-cms-as-headless-with-nextjs/home-page.png)

### Solving the single post 404 error
When you click on any post, it gives you a `404` error because we have not worked on that yet. 

Let us get into it using the following steps:

### Fetching a single post data
In the `lib/api.js` file, we will add a method for extracting a single post as follows:

```js
function extractPost(fetchResponse){
    return fetchResponse?.data?.simpleBlogPost?.items[0];
}
```

To avoid the metadata, we will derive what we want using the above function.

In the `lib/api.js` file, we add another function to fetch a single post, as well as other related posts as follows:

```js
export async function getPostAndMorePosts(preview,postId){
        
    // Get a singlepost/entry

    const entry = await fetchGraphQL(
        `query{
            title(id:"${postId}",preview:${preview ? true : false}){                
                ${POST_GRAPHQL_FIELDS}                
            }
        }`
    );

    // Get entries

    const entries = await fetchGraphQL(
        `query{
            titleCollection(preview:${preview ? true : false}, limit:2){
                items{
                    ${POST_GRAPHQL_FIELDS}
                }
            }
        }`
    );

    // Extract a post
    const post = extractPost(entry);

    // Get the related posts
    const relatedPosts = extractPostEntries(entries).filter((_post) => _post.sys.id !== post.sys.id);

    return {
        post,
        relatedPosts
    };
}
```

In the above function, we fetched a single post and the related posts.

In the `pages` folder, create another folder and call it `posts`. 

In the `posts` folder, create a `[postId].js` file. The `[postId]` signifies that the `post id` will be dynamic. 



We need to import the `getPostAndMorePosts` function from `lib/api.js` into the `[postId].js` file:

```js
import {getPostAndMorePosts} from "../../lib/api";
```
Fetch the post using `getStaticProps` and `getStaticPaths` methods, as highlighted below:

```js
// Fetch for a single post

export async function getStaticProps({ params: { postId } }) {
    let { post, relatedPosts } = await getPostAndMorePosts(false, postId);
    return {
        props: {
            post,
            relatedPosts
        }
    }
}

// Fetch the other posts done at build time

export async function getStaticPaths() {

    const posts = await getAllPostsForHome(false);

    let paths = posts.map((post) => ({
        params: {
            postId: post.sys.id
        }
    })
    );

    return {
        paths,
        fallback: true
    }
}
```

The `getStaticProps()` function will receive the `postId` from the `context params` and then fetch that specific post.

The `getStaticPaths` will create dynamic pages based on the posts from Contentful. Therefore, the next time you are fetching a specific post, you will get the dynamic page that was created earlier.

### Displaying a single post
Create a `Post` function to display the retrieved post. 

We start by importing the necessary modules, as shown below:

```js
import Head from "next/head";
import Link from "next/link";
import {useRouter} from "next/router";
import styles from "../../styles/Home.module.css";
```

For the `Post` function, add the following code:

```js
export function Post({posts, relatedPosts}){

    const router = useRouter();

    return (
        <div className={styles.container}>
            <Head>
            <title>Blog app</title>
            <meta name="description" content="Simple blog app with Contentful CMS" />
            <link rel="icon" href="/favicon.ico" />
            </Head>

        <main className={styles.main}>

        {
            router.isFallBack ? (
                <div styles={styles.title}>
                    Loading
                </div>
            ): (
            <>
            <div className={styles.content}>

            <div styles={styles.title}>
                {post.title}
            </div>


            <p className={styles.meta}>
                {new Date(post.date).toDateString()}
            </p>


            <div className={styles.coverImage}>
                <img src={post.coverImage.url} alt={post.title} />
            </div>

            </div>

            <div className={styles.grid}>
            {
                relatedPosts.length > 0 ? (
                    <>
                        <div className={styles.title}>
                            Related posts
                        </div>
                        {
                        relatedPosts.map((post) => (
                            <div className={styles.card} key={post.sys.id}>
                            <div className={styles.imageHolder}>
                                <img src={post.coverImage.url} alt={post.title} />
                            </div>
                            <div className={styles.details}>
                                <Link href={`posts/${post.sys.id}`}>
                                <a>
                                {post.title} &rarr;
                                </a>
                                </Link>
                                <p>{post.excerpt}</p>
                            </div>
                            </div>
                        ))
                        }
                    </>
                ) : null
            }
            </div>
                </>
            )
        }

            
        </main>

        <footer className={styles.footer}>
            <p>Simple blog app</p>
        </footer>
        </div>
    )
}
```

In the above code, we are receiving the `post` and the related posts from the `getStaticProps` to our function. 

To cater for the build process, we are checking for the `isFallBack` from the router and displaying a loading text. We then display the `title`, `date`, `coverimage`, and `related posts`.

We need to add the following styles to the `Home.module.css` file:

```js
.content{
    max-width: 800px;
    margin: 0px auto;
    padding: 12px;
}
.meta{
    font-size:12px;
    color: #aaa;
}

.coverImage {
    width:100%;
    height:300px;
}

.coverImage img{
    width: 100%;
    height: 100%;
}
```

### Testing simpleBlogPost
At this point, if you click on any of the posts, you will be redirected to a single post page. 

To test this, ensure that your server is up and running. If not, run the following command from the terminal of your project's root folder:

```bash
npm run dev
```

Open your browser and navigate to `http://localhost:3000`. Then, click on any of the posts on the home page. The selected post should be displayed on your screen:

![initial-post-page](/engineering-education/how-to-run-contentful-cms-as-headless-with-nextjs/initial-post-page.png)

Though it seems okay, there is something we are missing; the description part. Let's handle this feature in the next step. 

Since we added our description as rich-text, we will have to use [@contentful/rich-text-react-renderer](https://www.npmjs.com/package/@contentful/rich-text-react-renderer) to display it in the UI. 

Open a separate tab in your terminal and install the package using the command below:

```bash
npm install @contentful/rich-text-react-renderer
```

After installing it, import the package in the `[postId].js` file:

```js
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
```

After the `cover image` section, add the following code:

```js
<div className={styles.contentBody}>
    {documentToReactComponents(post.description.json)}
</div>
```

In the above code, we have embedded the rich text inside a `div`. In the `Home.module.css`, let' give this `div` some margin as follows:

```css
.contentBody{
    margin:10px auto;
}
```

Now, check if your server is still running. If not, use:

```bash
npm run dev
```

When you refresh your page, you should now see the description as follows:

![post-page-with-description](/engineering-education/how-to-run-contentful-cms-as-headless-with-nextjs/post-page-with-description.png)

We are now remaining with only one step. We should be able to transition to the home page easily. 

For this, we will add a home link inside the main component, as shown below:

```js
<div className={styles.homeLink}>
<Link href="/">
    <a>Home</a>
</Link>
</div>
 ```

Add the following styles to the `Home.module.css`:

```css
.homeLink {
  max-width: 800px;
  margin: 10px auto;
  padding: 12px;
}

.homeLink a {
  color: #0070f3;
}

```

On the posts page, you should have a visible link that you can click to go to the home page. 

Your page should be similar to the following:

![final-post-page](/engineering-education/how-to-run-contentful-cms-as-headless-with-nextjs/final-post-page.png)

At this point now, the posts are now visible to the user.

### Preview mode
To view the unpublished changes made to your blog posts, you need to use the preview mode. 

To do this, you should set the preview option to `true*` whenever you are making the API call.

### Hosting to Vercel
To host the project to Vercel, use the steps highlighted below:

- Create a GitHub repository.
- Push the code to your GitHub repository.
- Log on to [Vercel](https://vercel.com/).
- If you do not have an account, simply sign up with any provider.
- From your dashboard, click on [new project](https://vercel.com/new).
- Under the `import Git repository` section, select the repository you previously created and click `import`.
- Skip the `create team` section onto the `Configure project` section.
- Under the environmental variables tab, add all the variables from your project's `.env.local`, each with its name and value. You can copy-paste them to avoid errors.
- Finally, click on the `Deploy` button.
- Wait a few seconds for everything to be set up.
- From your dashboard, you will be able to visit your project. 

### Conclusion
In this article, we have discussed various concepts revolving around Next.js and Contentful.

This project's source code can be found on this [GitHub repository](https://github.com/Catemacharia/How-to-run-Contentful-CMS-as-Headless-with-Next.js).

To gain more knowledge, kindly consider the resources in the next section.

### Further reading
- [Data fetching in Next.js](https://nextjs.org/docs/basic-features/data-fetching)
- [Css in Next.js](https://nextjs.org/docs/basic-features/built-in-css-support)
- [Image component in Next.js](https://nextjs.org/docs/api-reference/next/image)
- [Contentful and react.js intergration](https://www.contentful.com/developers/docs/javascript/tutorials/getting-started-with-react-and-contentful/)
- [Git cheat sheet](https://www.atlassian.com/git/tutorials/atlassian-git-cheatsheet)

---
Peer Review Contributions by: [Mercy Meave](/engineering-education/authors/mercy-meave/)
