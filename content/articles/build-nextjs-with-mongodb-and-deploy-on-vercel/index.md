---
layout: engineering-education
status: publish
published: true
url: /build-nextjs-with-mongodb-and-deploy-on-vercel/
title: How to build a Nextjs application with MongoDB and deploy on Vercel
description: This article will guide you on how to create a Next.js application, connect it to MongoDB and deploy it on Vercel.
author: rose-waitherero
date: 2021-08-28T00:00:00-05:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/build-nextjs-with-mongodb-and-deploy-on-vercel/hero.png
    alt: Next.js MongoDB Vercel
---
[Next.js](https://nextjs.org/) is a JavaScript framework that lets you build server-side rendering and static web applications using React.js as a client-side web-driven framework, just like vue.js and Angular.js. It has many features that make it great such as pre-rendering, CSS in JS, and many more.
<!--more-->
It is a hybrid framework and the easiest way to build React.js applications. It includes a lot of functionality that is easily extensible and customizable. 

Being a hybrid means it can be used for either CSR (Client-Side Rendering), SSR (Server-Side Rendering), or SSG (Static-Site Generation).

### Goal
In this guide, you will learn how to create a Next.js application, connect it to MongoDB and deploy it on [Vercel](https://vercel.com/dashboard). 

We will create a simple blog application that stores blog posts in a MongoDB database. This will allow you to add a new post to the blog app and update or delete a previous post from the app.

### Prerequisites
To follow along with this guide you will need:
- [Node.js](https://nodejs.org/en/) installed. Node.js will help us run NPM commands to install any necessary dependencies that will help us build our Next.js application.
- Since we are working with [Next.js](https://nextjs.org/), prior knowledge of how to use [Next.js](https://www.youtube.com/watch?v=mTz0GXj8NN0&t=53s) will be helpful.
- We are using [MongoDB](https://www.mongodb.com/) as the database. Prior knowledge of working with this database will be of great importance.

### Table of contents
- [Goal](#goal)
- [Prerequisites](#prerequisites)
- [Table of contents](#table-of-contents)
- [Installing Next.js](#installing-nextjs)
- [Laying out the postcards and a Navbar](#laying-out-the-postcards-and-a-navbar)
- [Setting up Next.js pages](#setting-up-nextjs-pages)
- [Setting up MongoDB using MongoDB Atlas](#setting-up-mongodb-using-mongodb-atlas)
- [Connecting to MongoDB Atlas cluster](#connecting-to-mongodb-atlas-cluster)
- [Setting up the API route](#setting-up-the-api-route)
- [Add handler function](#add-handler-function)
- [components/PostCard.js](#componentspostcardjs)
- [pages/add-post.js](#pagesadd-postjs)
- [pages/index.js](#pagesindexjs)
- [Fetching posts](#fetching-posts)
- [Adding a post](#adding-a-post)
- [Updating a post](#updating-a-post)
- [Deleting a post](#deleting-a-post)
- [Hosting to Vercel](#hosting-to-vercel)
- [Conclusion](#conclusion)

### Installing Next.js
Next.js provides a one-time command that helps developers to scaffold a Next.js project. This will fasten the development time and serve a developer a well already structured application. 

First, create a folder and change the directory to it. Then, to create a Next.js app, run the command `npx create-next-app` inside that directory. 

This will then prompt you with what name you want to call your app. As a shortcut, you can still run this one command with `npx create-next-app` followed the app's name, as shown below:

```bash
npx create-next-app nextjs-blog-app-with-mongodb
```

The above command will create a directory `nextjs-blog-app-with-mongodb` where all the project structure and dependencies will be saved.

![nextjs-app-scafold](/engineering-education/build-nextjs-with-mongodb-and-deploy-on-vercel/nextjs-app-scafold.png)

This template provides a ready-made project structure that you can use and increases your application development productivity. 

To test if it is working, change the directory to the newly created `nextjs-blog-app-with-mongodb` folder and run this command.

```bash
npm run dev
```

This will start up a local server that will expose this application on port `3000`. You can access it through a browser using the URL `http://localhost:3000`. 

If this gives you a `Welcome to Next.js!`, we are ready to go.

![welcome-to-nextjs](/engineering-education/build-nextjs-with-mongodb-and-deploy-on-vercel/welcome-to-nextjs.png)

### Laying out the postcards and a Navbar
Now that we have an app and database ready, we can start working on implementing our use case. 

To begin with, we will start by adding the page navigation bar and laying out the postcards to display the posts. On the `nextjs-blog-app-with-mongodb` create a directory and name it `components`. Here we will create three files.

- `Nav.js` - Here will add a navigation bar. Inside this navigation bar will add a link that will help us navigate to the home page and a page to insert a new post. (we will configure the pages later).

Here is how will layout the navigation bar.

```js
import Link from 'next/link';

import styles from '../styles/Nav.module.css';

export default function Nav() {
    return (
        <nav className={styles.nav}>
            <ul className={styles.list}>
                <li className={styles.item}>
                    <Link href="/">
                        <a>Home</a>
                    </Link>
                </li>
                <li>
                    <Link href="/add-post">
                        <a>Add post</a>
                    </Link>
                </li>
            </ul>
        </nav>
    );
}
```

- `Nav.module.css` - will style down the Navbar and the nav items (`Home` and `Add post`) using CSS.

```css
.nav {
    width: 100%;
    border-bottom: 1px solid #ccc;
}

.list {
    display: flex;
    justify-content: center;
    list-style-type: none;
}

.item {
    margin-right: 12px;
}
```

- `PostCard.js` - Here will lay a form that will allow us to display the posts, delete and update a post, and wrap them inside a card. Later in this guide, we will also add the API methods such as `PUT` and `DELETE`.

```js
import { useState } from 'react';
import { useRouter } from 'next/router';

export default function PostCard({ post }) {
    return (
        <>
            <li>
                <h3>{post.title}</h3>
                <p>{post.content}</p>
                <small>{new Date(post.createdAt).toLocaleDateString()}</small>
                <br />
                    <button type="button">
                        {'Publish'}
                    </button>
                <button type="button" >
                    {'Delete'}
                </button>
            </li>
        </>
    );
}
```

From the above, we add a form for displaying a post from the database, a delete button to erase a post, and a Publish button for updating an existing post.

Now we can test if the Navbar is set. First, navigate to `pages/index.js` and import the above three components to render them appropriately.

```js
import Head from 'next/head';

import Nav from '../components/Nav';
import PostCard from '../components/PostCard';
import styles from '../styles/Home.module.css';

export default function Home({ posts }) {
    return (
        <div>
            <Head>
                <title>Home</title>
            </Head>

            <Nav />

            <main>
                <div className={styles.container}>
                    {posts.length === 0 ? (
                        <h2>No added posts</h2>
                    ) : (
                        <ul>
                            {posts.map((post, i) => (
                                <PostCard post={post} key={i} />
                            ))}
                        </ul>
                    )}
                </div>
            </main>
        </div>
    );
}

export async function getServerSideProps(ctx) {

  return {
      props: {
          posts: ['message'],
      },
  };
}
```

If your server was still running, it will recompile the changes and render them to the exposed port. Otherwise, you can rerun your server using `npm run dev`. When you refresh the `http://localhost:3000/`, you can see the Navbar and the Post Card are set.

![nav-bar-and-the-post-card](/engineering-education/build-nextjs-with-mongodb-and-deploy-on-vercel/nav-bar-and-the-post-card.png)

### Setting up Next.js pages
Here we will add the Next.js pages that will help us do all the navigation around the application. Next, we will add one page that will navigate to `Add new post`. Then finally, we will add the functionalities that will help us add a post.

First, navigate to the `pages` directory inside your Next.js app. Then, inside the pages folder, create a file and name it `add-post.js` and add the following lines of code.

```js
import { useState } from 'react';

import Nav from '../components/Nav';
import styles from '../styles/Home.module.css';

export default function AddPost() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

    const handlePost = async (e) => {
        e.preventDefault();

        // reset error and message
        setError('');
        setMessage('');

        // fields check
        if (!title || !content) return setError('All fields are required');
    };

    return (
        <div>
            <Nav />
            <div className={styles.container}>
                <form onSubmit={handlePost} className={styles.form}>
                    {error ? (
                        <div className={styles.formItem}>
                            <h3 className={styles.error}>{error}</h3>
                        </div>
                    ) : null}
                    {message ? (
                        <div className={styles.formItem}>
                            <h3 className={styles.message}>{message}</h3>
                        </div>
                    ) : null}
                    <div className={styles.formItem}>
                        <label>Title</label>
                        <input
                            type="text"
                            name="title"
                            onChange={(e) => setTitle(e.target.value)}
                            value={title}
                            placeholder="title"
                        />
                    </div>
                    <div className={styles.formItem}>
                        <label>Content</label>
                        <textarea
                            name="content"
                            onChange={(e) => setContent(e.target.value)}
                            value={content}
                            placeholder="Post content"
                        />
                    </div>
                    <div className={styles.formItem}>
                        <button type="submit">Add post</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
```

First, we import the `Nav.js` to access the nav add and the item `Add post`. Here we are adding a post form that will add a new post.

To format and style the above page, navigate to the `styles` folder and replace the `Home.module.css` file with the following CSS code.

```css
.container {
    max-width: 800px;
    margin: 20px auto;
    padding: 10px;
}

.form {
    width: 100%;
}

.formItem {
    display: block;
    width: 100%;
    margin: 10px auto;
}

.formItem label {
    display: block;
}

.formItem input[type='text'] {
    display: block;
    width: 100%;
    padding: 10px;
}

.formItem textarea {
    display: block;
    width: 100%;
    padding: 10px;
}

.error {
    color: red;
}

.message {
    color: green;
}
```

Let's test if the page is working. Once again, if your server is still running, the above code changes will be recompiled and mapped to the exposed localhost on port `3000`.

Refresh `http://localhost:3000/` and on the Navbar, click `Add post`. This will redirect you to a `http://localhost:3000/add-post` page and serve you the following add new post form.

![add-new-post-form](/engineering-education/build-nextjs-with-mongodb-and-deploy-on-vercel/add-new-post-form.png)

### Setting up MongoDB using MongoDB Atlas
[MongoDB Atlas](https://www.mongodb.com/cloud/atlas) is a cloud database service for MongoDB. This means that you get to store and access your data from a remote computer. This eliminates the process of setting up MongoDB locally on your computer. 

To use MongoDB Atlas, you need to have an account. If you don't have one, create a free account from [here](https://account.mongodb.com/account/register?nds=true). If already you have one, login from [here](https://account.mongodb.com/account/login?nds=true).

Once you create an account, a project will be created and assigned a free **MO Sandbox** with a **Shared cluster**.

![free-mongodb-cluster](/engineering-education/build-nextjs-with-mongodb-and-deploy-on-vercel/free-mongodb-cluster.png)

### Connecting to MongoDB Atlas cluster
First, we need to make the MongoDB dependencies available on the Next.js app. To install MongoDB dependencies for our app, run the following command.

```bash
npm install mongodb
```

To connect our Next.js application to our MongoDB cluster, make sure you are on your MongoDB Atlas cluster and follow the following steps:

- Click the **connect** button on your cluster.
- In the resulting pop-up, Add a connection IP address. In this case, we will allow access from anywhere. So click the **Allow Access from Anywhere** button and then click **Add IP address** to set it up.
- Next, we need to create a user to connect to this database. On the **Create a Database User** form enter a **username**, a **password** and click **Create Database User**.

![create-a-database-user](/engineering-education/build-nextjs-with-mongodb-and-deploy-on-vercel/create-a-database-user.png)

- Next, click **Choose a connection method** and select **Connect your application**.
- Select your driver section, choose **Node.js**.
- Copy the connection string provided in the proceeding section.

Your connection string will have the following format:

```bash
mongodb+srv://<username>:<password>@cluster0.sium6.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
```

Edit this `MONGODB_URI` as follows:

- Change `<username>` to the username of the added database user of your MongoDB Atlas cluster.
- Change `<password>` to the password of the added database user of your MongoDB Atlas cluster.
- Change `<your-cluster-name>` to the cluster name you have created. In this case, this will be `cluster0`.
- Change `<db-name>` to `sample_posts`.

Let's test if this `MONGODB_URI` is working. First, download and install the [MongoDB Compass](https://www.mongodb.com/try/download/compass). Once installed, check that the `MONGODB_URI` format is correct. Finally, paste the connection `MONGODB_URI` and click connect.

![mongodb-compass-and-atlas-connection](/engineering-education/build-nextjs-with-mongodb-and-deploy-on-vercel/mongodb-compass-and-atlas-connection.png)

This should connect to your remote MongoDB remote Atlas cluster.

![mongodb-atlas-remote-connection](/engineering-education/build-nextjs-with-mongodb-and-deploy-on-vercel/mongodb-atlas-remote-connection.png)

Now you can proceed to create a database. In this case, name the database `sample_posts` and name the collection `posts`.

Now let's create parameters that will help the application to acces this database connections. In the root of your project folder (`nextjs-blog-app-with-mongodb`), create a `.env.local` file. Enter the following contents in the file:

```js
MONGODB_URI = ""
DB_NAME= "sample_posts"

DEV_URL = "http://localhost:3000"

PROD_URL = ""
```

Paste the connecting string as the **MONGODB_URI** value.

To access the database in our following functionalities, we will create a client by instantiating the MongoDB driver with our connection string.

To do this, create a folder, name it `lib` and create a `mongodb.js` file and add the following.

```js
import { MongoClient } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI;
const MONGODB_DB = process.env.DB_NAME;

// check the MongoDB URI
if (!MONGODB_URI) {
    throw new Error('Define the MONGODB_URI environmental variable');
}

// check the MongoDB DB
if (!MONGODB_DB) {
    throw new Error('Define the MONGODB_DB environmental variable');
}

let cachedClient = null;
let cachedDb = null;

export async function connectToDatabase() {
    // check the cached.
    if (cachedClient && cachedDb) {
        // load from cache
        return {
            client: cachedClient,
            db: cachedDb,
        };
    }

    // set the connection options
    const opts = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    };

    // Connect to cluster
    let client = new MongoClient(MONGODB_URI, opts);
    await client.connect();
    let db = client.db(MONGODB_DB);

    // set cache
    cachedClient = client;
    cachedDb = db;

    return {
        client: cachedClient,
        db: cachedDb,
    };
}
```

From the above function, we are:

- Checking whether we have a `cached client` and `db`. If we have, we are returning them. Once we connect to the remote server for the first time, we will `cache` the `client` and `db`; hence we won't have to repeat the process severally, saving on the response time.

- Setting MongoDB connection options.
- Connecting to the cluster using the connection string and the set options.
- Selecting the database based on the name.
- Caching the `client` and `db`.
- Returning the `client` and `db`.

### Setting up the API route
Next.js has the functionality of writing code that will run on the server. 

In this article, we will be utilizing the `api` folder configured in the `pages` folder. The `api` folder exposes files in it as endpoints. 

Therefore, the code you write here runs in the server, favoring the MongoDB package since it should run in the server.

In the `api` folder, inside the `pages` folder in our project, create a `posts.js` file. This file will form the `/api/posts` endpoint.

### Add handler function
The handler function will be called whenever a request is sent to that endpoint. Therefore, we will need to configure our various request methods and the various functions that should be called. 

To do that, edit the `handler` function as follows:

```js
const { connectToDatabase } = require('../../lib/mongodb');
const ObjectId = require('mongodb').ObjectId;

export default async function handler(req, res) {
    // switch the methods
    switch (req.method) {
        case 'GET': {
            return getPosts(req, res);
        }

        case 'POST': {
            return addPost(req, res);
        }

        case 'PUT': {
            return updatePost(req, res);
        }

        case 'DELETE': {
            return deletePost(req, res);
        }
    }
}
```

From above, we are switching the various request methods and matching them to their functions. The request methods are as follows:

- The GET method for fetching posts.
- The POST method for adding a post.
- The PUT method for updating a post.
- The DELETE method for deleting a post.

Before implementing these functions, there are a couple of files that we need to update. The Postcards that we set earlier are a skeleton of the application design. 

Now we need to update them to communicate with the API and display the respective methods that each performs.

To do this, we will update the following files. First, we will replace the existing code with the following code.

### components/PostCard.js
We already laid a form that will allow us to display the posts, delete and update a post. 

Next, we will add the API methods such as PUT and DELETE. This will help us process the API data and make a request to the server to perform the right operation. 

In this case, we will add API routes that will enable us to access the server to execute these methods. In `components/PostCard.js`, replace the existing code with the following.

```js
import { useState } from 'react';
import { useRouter } from 'next/router';

export default function PostCard({ post }) {
    const [publishing, setPublishing] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const router = useRouter();

    // Publish post
    const publishPost = async (postId) => {
        // change publishing state
        setPublishing(true);

        try {
            // Update post
            await fetch('/api/posts', {
                method: 'PUT',
                body: postId,
            });

            // reset the publishing state
            setPublishing(false);

            // reload the page
            return router.push(router.asPath);
        } catch (error) {
            // Stop publishing state
            return setPublishing(false);
        }
    };
    // Delete post
    const deletePost = async (postId) => {
        //change deleting state
        setDeleting(true);

        try {
            // Delete post
            await fetch('/api/posts', {
                method: 'DELETE',
                body: postId,
            });

            // reset the deleting state
            setDeleting(false);

            // reload the page
            return router.push(router.asPath);
        } catch (error) {
            // stop deleting state
            return setDeleting(false);
        }
    };
    return (
        <>
            <li>
                <h3>{post.title}</h3>
                <p>{post.content}</p>
                <small>{new Date(post.createdAt).toLocaleDateString()}</small>
                <br />
                {!post.published ? (
                    <button type="button" onClick={() => publishPost(post._id)}>
                        {publishing ? 'Publishing' : 'Publish'}
                    </button>
                ) : null}
                <button type="button" onClick={() => deletePost(post['_id'])}>
                    {deleting ? 'Deleting' : 'Delete'}
                </button>
            </li>
        </>
    );
}
```

From the above;

- We have added the post request methods
- We have added the post publishing and deleting states.
- The fetch API routes. Each route will reload and refresh when the request methods have executed the set state.
A form for displaying a post from the database, a delete button to erase a post, and a Publish button for updating an existing post.

### pages/add-post.js
We will add the functionalities that will help us add a post. Inside the pages folder, create a file and name it `add-post.js`. 

Next, add the following lines of code.

```js
import { useState } from 'react';

import Nav from '../components/Nav';
import styles from '../styles/Home.module.css';

export default function AddPost() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

    const handlePost = async (e) => {
        e.preventDefault();

        // reset error and message
        setError('');
        setMessage('');

        // fields check
        if (!title || !content) return setError('All fields are required');

        // post structure
        let post = {
            title,
            content,
            published: false,
            createdAt: new Date().toISOString(),
        };
        // save the post
        let response = await fetch('/api/posts', {
            method: 'POST',
            body: JSON.stringify(post),
        });

        // get the data
        let data = await response.json();

        if (data.success) {
            // reset the fields
            setTitle('');
            setContent('');
            // set the message
            return setMessage(data.message);
        } else {
            // set the error
            return setError(data.message);
        }
    };

    return (
        <div>
            <Nav />
            <div className={styles.container}>
                <form onSubmit={handlePost} className={styles.form}>
                    {error ? (
                        <div className={styles.formItem}>
                            <h3 className={styles.error}>{error}</h3>
                        </div>
                    ) : null}
                    {message ? (
                        <div className={styles.formItem}>
                            <h3 className={styles.message}>{message}</h3>
                        </div>
                    ) : null}
                    <div className={styles.formItem}>
                        <label>Title</label>
                        <input
                            type="text"
                            name="title"
                            onChange={(e) => setTitle(e.target.value)}
                            value={title}
                            placeholder="title"
                        />
                    </div>
                    <div className={styles.formItem}>
                        <label>Content</label>
                        <textarea
                            name="content"
                            onChange={(e) => setContent(e.target.value)}
                            value={content}
                            placeholder="Post content"
                        />
                    </div>
                    <div className={styles.formItem}>
                        <button type="submit">Add post</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
```

First, we import the `Nav.js` to access the nav add and the item `Add post`. Here we are adding a post form that will add a new post to the database.

We also need to handle the data state from this form. Since we are inserting a database, we need to set states so that Next.js can apply the added content to the app.

### pages/index.js
Navigate to the pages directory inside your Next.js app. Then, inside the `index.js` file, we will replace the existing code with the following code.

```js
import Head from 'next/head';

import Nav from '../components/Nav';
import PostCard from '../components/PostCard';
import styles from '../styles/Home.module.css';

export default function Home({ posts }) {
    return (
        <div>
            <Head>
                <title>Home</title>
            </Head>

            <Nav />

            <main>
                <div className={styles.container}>
                    {posts.length === 0 ? (
                        <h2>No added posts</h2>
                    ) : (
                        <ul>
                            {posts.map((post, i) => (
                                <PostCard post={post} key={i} />
                            ))}
                        </ul>
                    )}
                </div>
            </main>
        </div>
    );
}

export async function getServerSideProps(ctx) {
    // get the current environment
    let dev = process.env.NODE_ENV !== 'production';
    let { DEV_URL, PROD_URL } = process.env;

    // request posts from api
    let response = await fetch(`${dev ? DEV_URL : PROD_URL}/api/posts`);
    // extract the data
    let data = await response.json();

    return {
        props: {
            posts: data['message'],
        },
    };
}
```

Here we are setting the Home page. So we are first importing the `/components/Nav.js` to access the navigation bar where we added the home item.

We are also importing the `PostCard.js` here. This is because we want to display the post on the home page. This component has a card layout that will layout the existing posts and a button to delete and update a post item.

We are also adding the `getServerSideProps` to communicate to the server. We are fetching this post from a server running the MongoDB database service. We are adding the MongoDB environment to fetch the posts and render them to the posts card.

Now we can proceed to `pages/api/posts.js` and stars adding the respect function to handle the respective methods.

### Fetching posts
With our connection set up, we need to configure the function that will be called when we send a request for fetching posts.

To do that, add the `getPosts` function as follows:

```js
async function getPosts(req,res){
    try {
        // connect to the database
        let { db } = await connectToDatabase();
        // fetch the posts
        let posts = await db
            .collection('posts')
            .find({})
            .sort({ published: -1 })
            .toArray();
        // return the posts
        return res.json({
            message: JSON.parse(JSON.stringify(posts)),
            success: true,
        });
    } catch (error) {
        // return the error
        return res.json({
            message: new Error(error).message,
            success: false,
        });
    }
}
```

Here we are:

- Connecting to the database utilizing the function we created earlier.
- Fetching the posts.
- Returning the posts, in case an error occurred, we are returning the error.

To test this, start the development server by running the following command in the root of your project folder:

```bash
npm run dev
```

In your browser, open `http://localhost:3000`. Since it's your first time, there will be no posts.

![fetch-posts](/engineering-education/build-nextjs-with-mongodb-and-deploy-on-vercel/fetch-posts.png)

To enable the functionality of adding a post, we proceed to the next step.

### Adding a post
Add the `addPost` function as follows:

```js
async function addPost(req, res) {
    try {
        // connect to the database
        let { db } = await connectToDatabase();
        // add the post
        await db.collection('posts').insertOne(JSON.parse(req.body));
        // return a message
        return res.json({
            message: 'Post added successfully',
            success: true,
        });
    } catch (error) {
        // return an error
        return res.json({
            message: new Error(error).message,
            success: false,
        });
    }
}
```

From the above function, we are connecting to the database, adding a post, and returning a message if there was an error, we are returning an error.

To test this, ensure that your development server is already running. Then, in your browser, proceed to `http://localhost:3000/add-post`. Enter some data in the form and then hit `Add post`.

![add-a-post)](/engineering-education/build-nextjs-with-mongodb-and-deploy-on-vercel/add-a-post.png)

If you go to `http://localhost:3000` (Home page), you should be able to see the post you have just added, now being fetched from the database.

![the-added-post](/engineering-education/build-nextjs-with-mongodb-and-deploy-on-vercel/the-added-post.png)

At this point, the post got is saved into our database. You verify that, go to MongoDB Compass and open the `sample_posts` database. 

The added post was saved in the `posts` collection. If you open it, you will see the details of the added post.

![mongodb-saved-post](/engineering-education/build-nextjs-with-mongodb-and-deploy-on-vercel/mongodb-saved-post.png)

### Updating a post
To configure the functionality of updating a post, add the `updatePost` function as follows:

```js
async function updatePost(req, res) {
    try {
        // connect to the database
        let { db } = await connectToDatabase();

        // update the published status of the post
        await db.collection('posts').updateOne(
            {
                _id: new ObjectId(req.body),
            },
            { $set: { published: true } }
        );

        // return a message
        return res.json({
            message: 'Post updated successfully',
            success: true,
        });
    } catch (error) {

        // return an error
        return res.json({
            message: new Error(error).message,
            success: false,
        });
    }
}
```

From the above `updatePost` function, we are:

- Connecting to the database.
- Updating the published status of the post based on the post `_id` sent in the request body.
- Returning a message if everything went fine and an error in case an error occurred.

To test this, ensure that the development server is up and running. Then, on the [Home](http://localhost:3000) page, hit the `Publish` button and observe the results on the post you previously created. They will be recorded in the database.

![database-update-post](/engineering-education/build-nextjs-with-mongodb-and-deploy-on-vercel/database-update-post.png)

And as you can see, the value of the `published` post has been updated to `true`.

### Deleting a post
To enable the functionality of deleting a post, we need to edit the `deletePost` function as follows:

```js
async function deletePost(req, res) {
    try {
        // Connecting to the database
        let { db } = await connectToDatabase();

        // Deleting the post
        await db.collection('posts').deleteOne({
            _id: new ObjectId(req.body),
        });

        // returning a message
        return res.json({
            message: 'Post deleted successfully',
            success: true,
        });
    } catch (error) {

        // returning an error
        return res.json({
            message: new Error(error).message,
            success: false,
        });
    }
}
```

From the above `deletePost` function, we are:

- Connecting to the database.
Deleting the post based on the post sent through the request body is based on the `_id` of the post.
- Returning a message if everything went okay, and an error if an error occurred.

To test this, ensure your development server is running. Then, on the [home page](http://localhost:3000), hit the `Delete` button for any post and observe the results. The post will be deleted from the database.

At this point, you should have the following files and folders in your project.

```bash
└───nextjs-blog-app-with-mongodb
    │ .env.local
    │
    ├───components
    │ Nav.js
    │ Nav.module.css
    │ PostCard.js
    │
    ├───lib
    │ mongodb.js
    │
    ├───pages
    │ │ add-post.js
    │ │ index.js
    │ │ _app.js
    │ │
    │ └───api
    │ posts.js
    │
    └───styles
            Home.module.css
```

We have completed all of the CRUD functionalities in our project at this point. So, please feel free to interact with the application further. The finalized code is also available from this [GitHub repository](https://github.com/Rose-stack/nextjs-blog-app-with-mongodb).

### Hosting to Vercel
[Vercel](https://vercel.com) is the official hosting platform for Next.js. It enables you to ship your project from development to production without having a dedicated server or a domain name.

To host our project to Vercel, we will follow the following steps:

- First, make sure you push this project to a GitHub repository.

- Proceed to `https://vercel.com`. If you don't have an account, just hit the [signup link](https://vercel.com/signup). If you already have an account, just log in to your account.

- From your [dashboard](https://vercel.com/dashboard), hit [New Project](https://vercel.com/new).

- Make sure your GitHub account is selected as the provider on the resulting screen, then search for the project you just committed to GitHub and click the **import** button.

- Skip the **Create team** section.

- In the **Configure project** section, change the **Project name** to your preference, and then in the **Environment Variables** section enter the following:

```bash
MONGODB_URI = <your_mongodb_uri_string>
DB_NAME = sample_posts
PROD_URL = https://<your_project_name>.vercel.app
```

Copy the `MONGODB_URI` value from the `.env.local` file and paste it here.

Also, ensure you replace your **Project name** from above with the `PROD_URL` variable.

- Hit the **Deploy** button.

If everything goes well, your project will be deployed, and you will be able to access it from your dashboard. For example, here is a [sample of my deployed application](https://nextjs-mongo-finalized.vercel.app/).

### Conclusion
In this tutorial, we focused on integrating Next.js with MongoDB. Check the following sources to get a more in-depth understanding of this subject.

- [MongoDB Node.js driver](https://www.npmjs.com/package/mongodb)
- [MongoDB official Next.js article](https://developer.mongodbcom/how-to/nextjs-with-mongodb/)
- [Next.js official docs](https://nextjs.org/)

---
Peer Review Contributions by: [Adrian Murage](/engineering-education/authors/adrian-murage/)
