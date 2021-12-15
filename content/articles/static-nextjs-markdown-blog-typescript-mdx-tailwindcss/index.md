---
layout: engineering-education
status: publish
published: true
url: /static-nextjs-markdown-blog-typescript-mdx-tailwindcss/
title: Build a Static Next.js Markdown Blog with Typescript, MDX, and Tailwind CSS
description: This article will provide a step-by-step guide on how to create a markdown blog using TypeScript, MDX, and Tailwind CSS.
author: rose-waitherero 
date: 2021-12-15T00:00:00-13:40
topics: [Languages, Node.js]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/static-nextjs-markdown-blog-typescript-mdx-tailwindcss/hero.jpg
    alt: Build a Static Next.js Markdown Blog with Typescript, MDX, and Tailwind CSS Hero Image
---
Next.js is a framework that is built over React.js. React is a client-side rendering library where everything gets rendered on the client-side of the user's browser. Next.js brought in server-side rendering to React.
<!--more-->
First and foremost, it was for server-side rendering, where you can render components on the server-side and show them to the user. Next.js further supported static sites generation. This meant you could easily build both server-side rendering applications and static site-generated applications.

In this guide, we will build a static Next.js markdown files blog with Typescript, MDX, and Tailwind CSS. We will discuss technologies to build an entire application from scratch using this stack. Finally, we will set up the whole stack for the CI/CD Vercel deployment.

### Prerequisites
To proceed with this tutorial, it is important to have the following:
- [Node.js](https://nodejs.org/en/) installed on your system.
- Basic knowledge working with React, Next.js, and TypeScript.
- Basic understanding of Git and GitHub.

### Table of contents
- [Why Next.js?](#why-nextjs)
- [Create a basic Next.js TypeScript application](#create-a-basic-nextjs-typescript-application)
- [Adding packages](#adding-packages)
- [Setting up the utilities](#setting-up-the-utilities)
- [Setting up the components](#setting-up-the-components)
- [Creating a blog post](#creating-a-blog-post)
- [Creating types](#creating-types)
- [Showing all posts](#showing-all-posts)
- [Showing a single post](#showing-a-single-post)
- [Deploy to Vercel](#deploy-to-vercel)
- [Conclusion](#conclusion)
- [Further reading](#further-reading)

### Why Next.js?
Building an application with Next.js is made powerful by some of the cool features that it has. This includes:

#### Hot code reloading
When you're working on your application, it'll reload quickly on the side, and you don't have to refresh the page to view the changes.

#### Static file serving
It helps you serve any static files such as images, icons, robots.txt, `.html`, etc.

#### Fast
Next.js does the heavy lifting for us. It loads the files such as HTML files that are generated ahead of time. This implies that once a user requests a webpage, it gets loaded and served instantly. This happens pretty quickly since the site is static, and the generator produces the webpages at the build time.

#### Integration with several styling frameworks
With Next.js, you can start styling with JSX CSS, less, sass, Tailwind, CSS modules, or any other styling framework.

#### Supports TypeScript
You don't have to install anything special to make Typescript work with Next.js. Typescript is a superset and a static type version of JavaScript. Next.js provides a one-time `create-next-app` command that helps you bootstrap and load TypeScript supported templates.

Even if you change your files from `.js` to `.ts`, it works the same.

### Create a basic Next.js TypeScript application
The `create-next-app` command in Next.js allows you to fetch a bootstrapped Next.js application.  To set up the Next.js application, we will use a tool provided by the Next.js team to abstract the process of setting up an application.

We will use [create next app](https://nextjs.org/docs/api-reference/create-next-app) to simplify the process of laying down the Next.js application.

Select the folder where you want the project to be saved and run the command below:

```bash
npx create-next-app --typescript .
```

This returns a setup process for this Next.js application. The `--typescript` parameter will specify that the application will use TypeScript.

### Adding packages
[MDX](https://mdxjs.com/docs/) is a markdown component that allows you to style your text content easily. With markdown, you can write content any such as insert bold, italic, images, etc.

MDX will enable you to integrate components inside of your markdown files and render them on a web page. MDX pairs well with component-based frameworks such as React.js or Next.js.

This way, we can use MDX to set up a blog and manage the entire lifecycle of those posts. To set up an MDX blog app, we will require the following packages based on the technology stack we are using:

- [Gray matter](https://www.npmjs.com/package/gray-matter): Gray matter is used to parse a front matter from a file or a string.
- [Next MDX remote](https://www.npmjs.com/package/next-mdx-remote): It allows you to load MDX (Markdown) content on the server and client.

To use with Tailwind CSS:
- [Tailwind CSS](https://www.npmjs.com/package/tailwindcss): This is a CSS framework that offers CSS styles when creating customized interface design.
- [Post CSS](https://www.npmjs.com/package/postcss): Post CSS is a stylistic development tool that uses JavaScript modules. We will use it to transform CSS from MDX.
- [Auto Prefixer](https://www.npmjs.com/package/autoprefixer): A Post CSS-based library for parsing CSS and adding vendor prefixes to CSS rules.
- [@tailwind/typography](https://www.npmjs.com/package/@tailwindcss/typography): Provides `classes` that can be used to generate beautiful typographic defaults from our components (such as HTML generated from Markdown).

To install the packages above, run the following command:

```bash
npm i gray-matter next-mdx-remote tailwindcss postcss autoprefixer @tailwindcss/typography
```

We also need to set up Post CSS and Tailwind CSS. Run the following command to generate `tailwind` and `postcss` configuration files:

```bash
npx tailwindcss init -p
```

Open the `tailwind.config.js` file and make the following changes:

```js
module.exports = {
  plugins: [require('@tailwindcss/typography')],
  purge: ['./components/**/*.tsx', './pages/**/*.tsx'],
  variants: {},
  theme: {
    extend: {},
  },
  darkMode: false, 
};
```

This configuration will set the `purge` option to remove unused styles from the production environment. The plugin `@tailwindcss/typography` allows you to use pre-styled classes.

To leverage these tailwind configurations in our application, we'll need to include this import to `pages/_app.tsx` as shown:

```ts
import 'tailwindcss/tailwind.css';
```

### Setting up the utilities
Since we'll be working with Markdown files, efficient utility functions will be required. This will help us perform tasks such as getting posts, getting a single post, and getting post items.

Create a new directory on the project root folder and name it `utils`. Create a `mdxUtils.ts` file under the `utils` directory as shown:

```ts
import matter from 'gray-matter';
import {join} from 'path';
import fs from 'fs';
import { verify } from 'crypto';

// structure of items
type Items =  {
    // each post has a parameter key that takes the value of a string
    [key: string] : string
}

// structure of a post
type Post = {
    data:{
        // each post has a parameter key that takes the value of a string
        [key: string] : string
    };
    // each post will include the post content associated with its parameter key
    content: string
}

// path to our list of available posts
const POSTS_PATH = join(process.cwd(),'_posts');

// get the file paths of all available list of posts
function getPostsFilePaths(): string[]{
    return (
        // return the mdx file post path
        fs.readdirSync(POSTS_PATH)
        // load the post content from the mdx files
        .filter((path) => /\.mdx?$/.test(path))
    )
}

// getting a single post
export function getPost(slug:string):Post {
    // add path/location to a single post
    const fullPath = join(POSTS_PATH,`${slug}.mdx`);
    // post's content
    const fileContents = fs.readFileSync(fullPath,'utf-8');
    // get the front matter data and content
    const {data,content} = matter(fileContents);
    // return the front matter data and content
    return { data,content};
}

// load the post items
export function getPostItems(filePath:string,fields:string[] = []): Items{
    // create a slug from the mdx file location
    const slug = filePath.replace(/\.mdx?$/,"");
    // get the front matter data and content
    const {data,content} = getPost(slug);

    const items: Items = {};

    // just load and include the content needed
    fields.forEach((field) => {
        // load the slug
        if(field === 'slug'){
            items[field] = slug;
        }
        // load the post content
        if(field === 'content'){
            items[field] = content;
        }
        // check if the above specified field exists on data
        if(data[field]){
            // verify the fileds has data
            items[field] = data[field];
        }
    });
    // return the post items
    return items;
}

// getting all posts
export function getAllPosts(fields: string[]): Items []{
    // add paths for getting all posts 
    const filePaths = getPostsFilePaths();
    // get the posts from the filepaths with the needed fields sorted by date
    const posts = filePaths.map((filePath) => getPostItems(filePath,fields)).sort((post1,post2) => post1.date > post2.date ? 1 : -1);
    // return the available post
    return posts;
}
```

We have created functions such as `getAllPosts()`, `getPostItems()`, `getPost()`, and `getPostsFilePaths()`. This way, we can access the markdown files to read their content. Then, fetch these files as blog posts with paths that will allow you to fetch a single post or the whole list of the available posts.

### Setting up the components
Create a directory called `components` within the project's root folder. Prepare three scripts inside this `components` directory. These will be `Header.tsx`, `Thumbnail.tsx`, and `Layout.tsx`. Each script will hold different components, as described below:

`Header.tsx` script will serve as the navigation bar as shown below:

```ts
// Import the link props
import Link from 'next/link';

// add the React Header Element
const Header: React.FC = () => {

    return (
        // header value
        <header className="py-2">

        <Link href="/">
            <a className="text-2xl font-bold text-green-500">My Simple Blog App</a>
        </Link>
        </header>
    )
}

// export Header module
export default Header;
```

Each blog will essentially have an image. `Thumbnail.tsx` will script down the blog post's image component as described in the code block below. We will utilize the `Image` component, which works smoothly when rendering an image in Next.js.

```ts
// import link artifacts
import Link from 'next/link';
// import image artifacts
import Image from 'next/image';

// Thumbnail properties
type Props = {
    // Thumbnail title
    title: string;
    // Thumbnail image src
    src: string;
    // Thumbnail slug link
    slug?:string;
}

const Thumbnail: React.FC<Props> = ({ title, src, slug}: Props) => {
  // Add the Thumbnail cover image
    const image = (
        <Image
        height={720}
        width={1280}
        src={src}
        alt={`Thumbnail cover image ${title}`}
        />
    );

    // return the Thumbnail cover image slug
    return (
        <>
            {slug ? (
                <Link href={`/posts/${slug}`}>
                <a aria-label={title}>{image}</a>
                </Link>
            ) : (
                image
            )}
        </>
    )
}

// export Thumbnail module
export default Thumbnail;
```

The layout of every page in this application will be stored in `Layout.tsx`. Each page will have the `Header` we set above.

```ts
import Header from './Header';

type Props = {
    children: React.ReactNode;
}

const Layout: React.FC<Props> = ({ children }: Props) => {
    return (
        <>
            <div className="max-w-prose mx-auto px-4">
                <Header />
                <main className="pt-4 pb-12">{children}</main>
            </div>
        </>
    )
}

export default Layout;
```

We call the `Header` and then attach the dynamic page content that will go under the `children` section. To apply the above layout to all pages, we'll make the following modifications to the `pages/_app.tsx` file:

```ts
import Layout from '../components/Layout';
function MyApp({ Component, pageProps }: AppProps) {
    return (
        <Layout>
            <Component {...pageProps} />
        </Layout>
    );
}
```

All you need is to import `Layout` and wrap the `Component` returned with `Layout`.

### Creating a blog post
In your project root folder, create a `getting-started.mdx` file within the `_posts` directory. In the `getting-started.mdx` file, we'll write a simple blog post as follows:

- Add the front-matter section.

```md
---
date: '2021-11-25'
thumbnail: /assets/getting-started.jpeg
title: Getting started in Next.js with TypeScript
description: A quick guide into Next.js and Typescript with deployment to vercel
prerequisites: ['Node.js installed on your computer', 'Basic knowledge working with Next.js and TypeScript']
stacks: ['Next.js','TypeScript','Git']
---
```

- Call the components.

```md
<Prerequisites />
<Stacks />
```

Using MDX, you can use the component-based structure provided by JSX.

- Add some extra content. The content below is just for demonstration purposes. You can customize it to your liking.

```md
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
```

- Go to [unsplash](https://unsplash.com/), download an image of your preference, and add it to `/public/assets/`, i.e., `/public/assets/getting-started.jpeg`.

Our blog posts will adhere to the structure outlined above. Try creating more posts by following the same steps we did.

### Creating types
Since we are using TypeScript, it will be helpful to define the structure of our data. TypeScript supports type annotation which allows you to define which data types you are dealing with.

In the project root directory, create a `post.ts` file in the `types` folder and specify the structure of a post, as shown below:

```ts
export interface IPost {
    slug:string;
    date:string;
    thumbnail:string;
    title:string;
    description:string;
    prerequisites:string[];
    stacks:string[];
}
```

### Showing all posts
To show the posts, we will work on the `pages/index.tsx` file. Edit your `pages/index.tsx` file as follows:

```ts
import Thumbnail from '../components/Thumbnail';
import type { NextPage, GetStaticProps } from 'next'
import { IPost } from "../types/post";
import Link from 'next/link'
import { getAllPosts } from "../utils/mdxUtils";

// props type
type Props = {
  posts: [IPost]
}

// component render function
const Home: NextPage<Props> = ({ posts }: Props) => {
  return (
    <div>
      <h1 className="text-4xl font-bold mb-4">Technical articles</h1>

      <div className="space-y-12">
        {posts.map((post) => (
          <div key={post.slug}>
            <div className="mb-4">
              <Thumbnail
                slug={post.slug}
                title={post.title}
                src={post.thumbnail}
              />
            </div>

            <h2 className="text-2xl font-bold mb-4">
              <Link href={`/posts/${post.slug}`}>
                <a>{post.title}</a>
              </Link>
            </h2>

            <p>{post.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Home

// get posts from serverside at build time
export const getStaticProps: GetStaticProps = async () => {
  const posts = getAllPosts([
    'title',
    'slug',
    'date',
    'description',
    'thumbnail'
  ]);

  // retunr the posts props
  return { props: { posts } }
}
```

We are simply doing the following:
- Fetching the posts at the build time from the server-side using the `getStaticProps()` component function, as previously defined in the `mdxUtils.ts` utility functions.
- Displaying the fetched posts from the rendered component function.

Let's test if everything is working right. From your project folder, run the following command to start the development server:

```bash
npm run dev
```

Open the running server on a browser using `http://localhost:3000`. Now, you should be able to have the added MDX content on your webpage.

![home-page](/engineering-education/static-nextjs-markdown-blog-typescript-mdx-tailwindcss/home-page.PNG)

### Showing a single post
We will first handle the state management in the application for managing our component's data. We will use the Context API that is present in Next.js. Create a `context` directory on the project root folder with a `mdxContext.tsx` file. 

Edit your `mdxContext.tsx` as shown below:

```ts
import {
    createContext,
    useContext,
    useState,
    Dispatch,
    ReactElement,
    ReactNode,
    SetStateAction,
} from 'react';

type ContextProps = {
    prerequisites: string[];
    setPrerequisites: Dispatch<SetStateAction<string[]>>;
    stacks: string[];
    setStacks: Dispatch<SetStateAction<string[]>>;
};

type Props = {
    children: ReactNode;
};

const MdxComponentsContext = createContext({} as ContextProps);

export function MdxComponentsProvider({ children }: Props): ReactElement {
    const [prerequisites, setPrerequisites] = useState < string[] > ([]);
    const [stacks, setStacks] = useState < string[] > ([]);

    return (
        <MdxComponentsContext.Provider
            value={{
                prerequisites,
                setPrerequisites,
                stacks,
                setStacks,
            }}
        >
            {children}
        </MdxComponentsContext.Provider>
    );
}

export function useMdxComponentsContext(): ContextProps {
    return useContext(MdxComponentsContext);
} 
```

The above code block manages the state of our components. This includes `prerequisites`, and `stacks`. Then, we export the `Provider (MdxComponentsProvider)` and a `Consumer hook function (useMdxComponentsContext)`.

The next step is to embed `MdxComponentsProvider` in the `pages/_app.tsx` file to be accessed on all pages by wrapping the components with it:

```ts
import type { AppProps } from 'next/app';
import Layout from '../components/Layout';
import 'tailwindcss/tailwind.css'
import { MdxComponentsProvider } from '../context/mdxContext';

function MyApp({ Component, pageProps }: AppProps) {
    return (
    <MdxComponentsProvider>
        <Layout>
            <Component {...pageProps} />
        </Layout>
    </MdxComponentsProvider>)
}

export default MyApp
```

In your `components` folder, add two more files, `Prerequisites.tsx`, and `Stacks.tsx`. In the `Prerequisites.tsx` file, we will be getting the `prerequisites` from the consumer hook and mapping them on a list. 

Add the following code block:

```tsx
import { useMdxComponentsContext } from "../context/mdxContext";

const Prerequisites: React.FC = () => {
    const prerequisites = useMdxComponentsContext().prerequisites;
    return (
        <>
            <h2>Prerequisites</h2>
            <ol>
                {prerequisites.map((prerequisite, index) => (
                    <li key={index}>{prerequisite}</li>
                ))}
            </ol>
        </>
    )
}

export default Prerequisites;
```

The `Stacks.tsx` will get the `stacks` from the consumer hook and map them to a list as shown:

```ts
import {useMdxComponentsContext} from "../context/mdxContext";

const Stacks: React.FC = () => {
    const stacks = useMdxComponentsContext().stacks;
    return (
        <>
            <h2>Stacks</h2>
            <ol>
                {stacks.map((stack, index) => (
                <li key={index}>{stack}</li>
                ))}
            </ol>
        </>
    )
}

export default Stacks;
```

Within the `pages` directory, create a `posts` folder with a `[slug].tsx` file under it. The square brackets indicate that this is a dynamic file dependent on the `slug` keyword. 

This is how we will set up the `[slug].tsx`:

```ts
import { serialize } from 'next-mdx-remote/serialize';
import { GetStaticProps, GetStaticPaths } from 'next';
import { useEffect } from 'react';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';

import { useMdxComponentsContext } from '../../context/mdxContext';
import Thumbnail from '../../components/Thumbnail';
import { IPost } from '../../types/post';
import { getPost, getAllPosts } from '../../utils/mdxUtils';
import Prerequisites from '../../components/Prerequisites';
import { ParsedUrlQuery } from 'querystring';
import Stacks from '../../components/Stacks';

// props type
type Props = {
    source: MDXRemoteSerializeResult,
    frontMatter: Omit<IPost, 'slug'>;
}

// components to render
const components = {
    Prerequisites,
    Stacks,
}

const PostPage: React.FC<Props> = ({ source, frontMatter }: Props) => {

    // get setters
    const { setPrerequisites, setStacks } = useMdxComponentsContext();

    useEffect(() => {
        // set prerequisites
        setPrerequisites(frontMatter.prerequisites);
        // set stacks
        setStacks(frontMatter.stacks);
    }, [
        setPrerequisites,
        setStacks,
        frontMatter.prerequisites,
        frontMatter.stacks
    ]);

    return (
        <div>

            <article className="prose prose-green">
                <div className="mb-4">
                    <Thumbnail title={frontMatter.title} src={frontMatter.thumbnail} />
                </div>

                <h1>{frontMatter.title}</h1>

                <p>{frontMatter.description}</p>

                <MDXRemote components={components} {...source} />
            </article>
        </div>
    )
}

export default PostPage;

interface Iparams extends ParsedUrlQuery {
    slug: string
}

export const getStaticProps: GetStaticProps = async (context) => {

    const { slug } = context.params as Iparams;
    // get the slug
    const { content, data } = getPost(slug);
    // serialize the data on the server side
    const mdxSource = await serialize(content, { scope: data });
    return {
        props: {
            source: mdxSource,
            frontMatter: data
        }
    }
}

export const getStaticPaths: GetStaticPaths = () => {
    //only get the slug from posts 
    const posts = getAllPosts(['slug']);

    // map through to return post paths
    const paths = posts.map((post) => ({
        params: {
            slug: post.slug
        }
    }));

    return {
        paths,
        fallback: false
    }
}
```

This dynamic file allows you to set your server-side and client-side as follows:

On the server-side:
- Fetch the content of the current post using `getStaticProps()`. The article's data is serialized and returned as `source`, and `frontMatter`.
- Fetch the post paths at build time from the `getStaticPaths()`. Also, return `fallback` to `false` so that every post path that is not generated at build time will generate a `404` error.

On the client-side:
- Get the `source`, and the `frontMatter` sent from the server.
- Set the data to the application context using the consumer hook.
- Check whether the page is building and returning a loading text.
- Display the article content. The `source` and the `components` as shown in the `MDXRemote` component.

Ensure that the development server is still running, and test if this works. Click on any article from the home page, and a single article page should be loaded.

![specific-article-page](/engineering-education/static-nextjs-markdown-blog-typescript-mdx-tailwindcss/specific-article-page.PNG)

Check the complete working code on [GitHub](https://github.com/Rose-stack/static-nextjs-blog-with-typescript-mdx-tailwindcss).

### Deploy to Vercel
To deploy to Vercel, ensure you first push/publish your code to a GitHub repository.

[Login](https://vercel.com/login) to your Vercel dashboard or [register](https://vercel.com/signup) if you don't have one.

Select `New Project` from the Vercel [dashboard](https://vercel.com/dashboard). Ensure that you have logged in to your GitHub account, select it as your Git provider, and then search and import your project.

Enter your preferred project name and then click Deploy:

![vercel-deployment-conf](/engineering-education/static-nextjs-markdown-blog-typescript-mdx-tailwindcss/vercel-deployment-conf.PNG)

After the deployment is done, click on the generated preview. You will be redirected to your hosted blog application which you can share with friends and the general community.

![hosted-blog-application](/engineering-education/static-nextjs-markdown-blog-typescript-mdx-tailwindcss/hosted-blog-application.PNG)

### Conclusion
Next.js is an amazing React-based framework. It allows you to work with almost any aspect of both server-side and client-side content. It is very lightweight and allows you to create full fledge fast applications.

In this tutorial, we built a blog application with Next.js, TypeScript, MDX, and Tailwind CSS and deployed it to Vercel.

I hope you found the entire stack worth learning.

Happy coding!

### Further reading
- [Getting started MDX](https://mdxjs.com/docs/getting-started/)
- [How MDX works](https://mdxjs.com/docs/using-mdx/#how-mdx-works)
- [What is MDX](https://mdxjs.com/docs/what-is-mdx/)
- [How to Create Responsive Layouts with Material UI and Next.js](/engineering-education/creating-responsive-layouts-with-materialui-in-reactjs/)
- [Introduction to Next.js, TypeScript, and Firebase Database](/engineering-education/introduction-to-nextjs-with-typescript-and-firebase-database/)
- [How to build a Nextjs application with MongoDB and deploy on Vercel](/engineering-education/build-nextjs-with-mongodb-and-deploy-on-vercel/)

---
Peer Review Contributions by: [Srishilesh P S](/engineering-education/authors/srishilesh-p-s/)