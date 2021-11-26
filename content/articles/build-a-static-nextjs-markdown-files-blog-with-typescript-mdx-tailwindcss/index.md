Next.js is a framework that is built on React. Next.js first came about because react is a client-side rendering library. Everything changes on the client-side in the user's browser. Next.js brought in server-side rendering to react. First and foremost, it was for server-side rendering, where you can render components on the server-side and show them to the user. Next.js further supports static sites generation. This means you can easily build both server-side rendering applications and static site-generated applications.

Building an application with Next.js is made powerful by some of the cool features that it has. This includes;

- Hot code reloading - when you're working on your application, it'll reload quickly on the side. You don't have to refresh the page.
- Static File Serving - it helps you serve any static files such as images, icons, robots.txt, .html, etc.
- Fast- Next.js does the heavy lifting and handles it for us. It loads the file. Files such as HTML files are generated ahead of time. This implies that once a user requests a webpage, it gets loaded and served instantly. This happened pretty quickly since this site is static, and the generator produces the webpages at build time.
- Integrative with many different styling options. With Next.js, styling options just come out of the box. You can use JSX CSS, less, sass, Tailwind, CSS modules, etc.
- Provides Typescript support out of the box. You don't have to install anything special to make Typescript work with Next.js. Typescript is a superset of JavaScript. Typescript is a static type version of JavaScript. Next.js provides a one-time create-next-app command that will help you bootstrap Typescript supported templates. You can also change your files `.js` names to `.ts`, which will work the same with environment variables.

In this guide, we will build a static Next.js Markdown files blog with Typescript, MDX, Tailwind CSS. We will discuss technologies and build an entire application from scratch using this stack. Finally, set up the whole stack to the CI/CD Versel deployment.

### Prerequisites
To proceed with this tutorial, it is important to have the following;

- [Node.js](https://nodejs.org/en/) installed on your system.
- Basic knowledge working with React, Next.js, and TypeScript.
- Basic understanding of Git and GitHub.

### Table of content
- [Prerequisites](#prerequisites)
- [Table of content](#table-of-content)
- [Setting up the Next.js application](#setting-up-the-nextjs-application)
- [Adding packages](#adding-packages)
- [Setting up the utilities](#setting-up-the-utilities)
- [Setting up the components](#setting-up-the-components)
- [Creating a blog post](#creating-a-blog-post)
- [Creating types](#creating-types)
- [Showing all posts](#showing-all-posts)
- [Showing a single post](#showing-a-single-post)
- [Deploy to Vercel](#deploy-to-vercel)
- [Conclusion](#conclusion)

### Setting up the Next.js application
Next.js provides a `create-next-app` command that allows you to pull a Next.js starter application. To set up the Next.js application, we will use a tool provided by the Next.js team to abstract the process of setting up an application.

We will use [create next app](https://nextjs.org/docs/api-reference/create-next-app), a tool offered by the Next.js team, to simplify the process of laying down the Next.js application. Select the folder where you want the project to be saved and run the command below.

```bash
npx create-next-app --typescript .
```

This returns a setup process for this Next.js application. The `--typescript` parameter will specify that the application will use TypeScript.

### Adding packages
to set up this blog app, we will require the following packages based on the technology stack we are using.

To use with MDX;

- [Gray matter](https://www.npmjs.com/package/gray-matter): Gray matter is used to parse a front matter from a file or a string. We will have a look at how front matter looks like late in this guide.
- [Next MDX remote](https://www.npmjs.com/package/next-mdx-remote): It allows you to load MDX(Markdown) content on the server and client. Markdown is frequently used in conjunction with frontmatter, which usually entails integrating some extra special functionality to handle markdown. Fortunately, this can be done wholly independent of next-mdx-remote, along with any additional custom processing required.

To use with Tailwind CSS;

- [Tailwind CSS](https://www.npmjs.com/package/tailwindcss): This is a CSS framework that offers CSS styles for efficiently creating customized interface design.
- [Post CSS](https://www.npmjs.com/package/postcss): Post CSS is a stylistic development tool that uses JavaScript modules. We will use it to transform CSS from MDX.
- [Auto Prefixer](https://www.npmjs.com/package/autoprefixer): A Post CSS based library for parsing CSS and adding vendor prefixes to CSS rules.
- [@tailwind/typography](https://www.npmjs.com/package/@tailwindcss/typography): Provides `classes` that can be used to generate beautiful typographic defaults from our components (such as HTML generated from Markdown).

To install the above packages, run the following command;

```bash
npm i gray-matter next-mdx-remote tailwindcss postcss autoprefixer @tailwindcss/typography
```

We also need to set up Post CSS and Tailwind CSS. Run the following command to generate `tailwind` and `postcss` config files.

```bash
npx tailwindcss init -p
```

Open the `tailwind.config.js` file and make the following changes.

```ts
module.exports = {
    purge: ['./components/**/*.tsx', './pages/**/*.tsx'],
    darkMode: false,
    theme: {
        extend: {},
    },
    variants: {},
    plugins: [require('@tailwindcss/typography')],
};
```

This configuration will set the `purge` option to remove unused styles in production from the specified files. The plugin `@tailwindcss/typography` will allow you to use pre-styled classes.

To leverage these tailwind configurations in our application, we'll need to include this import to `pages/_app.tsx`.

```ts
import 'tailwindcss/tailwind.css';
```

### Setting up the utilities
Since we'll be working with Markdown files, efficient utility functions will be required. This will help us perform tasks such as getting posts, getting a single post, and getting post items. We will later implement views that will be called to display these tasks.

On the project root folder, create a new directory and name it `utils`. Make a `mdxUtils.ts` file in the `utils` directory. This is how we will structure the `mdxUtils.ts`.

```ts
import fs from 'fs';
import { join } from 'path';
import matter from 'gray-matter';

// structure of items
type Items = {
    [key: string]: string
}

// structure of a post
type Post = {
    data: {
        [key: string]: string
    };
    content: string
}

// path to our posts
const POSTS_PATH = join(process.cwd(), '_posts');

// getting the file paths of all posts 
function getPostsFilePaths(): string[] {
    return (
        fs.readdirSync(POSTS_PATH)
            // only include the mdx files
            .filter((path) => /\.mdx?$/.test(path))
    )
}

// getting a single post
export function getPost(slug: string): Post {
    // post path
    const fullPath = join(POSTS_PATH, `${slug}.mdx`);
    // post's content
    const fileContents = fs.readFileSync(fullPath, 'utf-8');
    // get the front matter data and content
    const { data, content } = matter(fileContents);
    return { data, content };
}

export function getPostItems(filePath: string, fields: string[] = []): Items {
    // construct a slug from file path
    const slug = filePath.replace(/\.mdx?$/, "");
    // get the front matter data and content
    const { data, content } = getPost(slug);

    const items: Items = {};

    // Only include the data that is needed
    fields.forEach((field) => {
        if (field === 'slug') {
            items[field] = slug;
        }

        if (field === 'content') {
            items[field] = content;
        }

        // check if the specified field exists on data
        if (data[field]) {
            items[field] = data[field];
        }
    });

    return items;
}

export function getAllPosts(fields: string[]): Items[] {
    // get all file paths
    const filePaths = getPostsFilePaths();
    // get the posts from the filepaths with the needed fields sorted by date
    const posts = filePaths.map((filePath) => getPostItems(filePath, fields)).sort((post1, post2) => post1.date > post2.date ? 1 : -1);

    return posts;
}
```

We have set functions such as `getAllPosts()`, `getPostItems()`, `getPost()` and `getPostsFilePaths()`. This way, we can access the Markdown files and read their content. Then fetch these files as blog posts with paths that will allow you to fetch a single post or the whole list of the available posts.

### Setting up the components
Create a directory called `components` within the project's root folder. Prepare three scripts inside this `components` directory. These are `Header.tsx`, `Thumbnail.tsx`, and `Layout.tsx`. Each script will hold different components, as described below.

`Header.tsx` script will serve as the navigation bar. Open `Header.tsx` and create a simple navigation bar as shown below.

```ts
import Link from 'next/link';

const Header: React.FC = () => {

    return (
        <header className="py-2">
            <Link href="/">
                <a className="text-2xl font-bold text-green-500">My blog</a>
            </Link>
        </header>
    )

}

export default Header;
```

Each blog will essentially have an image. `Thumbnail.tsx` will script down the blog post's image component as described in the code block below. We will utilize the `Image` component, which works smoothly for rendering an image in Next.js.

```ts
import Image from 'next/image';
import Link from 'next/link';

type Props = {
    title: string;
    src: string;
    slug?: string;
}

const Thumbnail: React.FC<Props> = ({ title, src, slug }: Props) => {
    const image = (
        <Image
            src={src}
            alt={`Cover image for ${title}`}
            width={1280}
            height={720}
        />
    );

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

We call the `Header` and then attach the page dynamic content that will go under the `children` section. To apply the above layout to all pages, we'll make the following modifications to the `pages/_app.tsx` file.

```ts
import Layout from '../components/Layout';
function MyApp({ Component, pageProps }: AppProps) {
    return <Layout>
        <Component {...pageProps} />
    </Layout>
}
```

All you need is to import `Layout` and wrap the `Component` returned with `Layout`.

### Creating a blog post
In the root of your project folder, create a `_posts` directory. Create a `getting-started.mdx` file within the `_posts` directory. In the `getting-started.mdx` file, we'll write a simple blog post as follows

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

Using MDX, you can be able to use the component-based structure provided by JSX.

- Add some extra content. The content below is just for demonstration purposes. You can customize it to your liking.

```md
Maumivu yenyewe ni upendo, mfumo mkuu wa kuhifadhi. Na kwa hivyo ni gari tu ambalo ni jambo zuri. Mpaka mwandishi wa nyumba na mtu mwenye busara, kutoka urn jumla ya mahakama. Kwa wingi wa magari ya protini laini ya kicheko Kila mtu ana upinde huu rahisi. Mpaka bonde liko kwenye uso wa simba. Mchezo ulikuwa mzuri, na maisha yenyewe yalikuwa rahisi Enea wakati mwingine ni moja tu ya kola Washiriki wa mchezo hata kabla ya mishale ya kwanza.

Kama bei ilivyopangwa. Cras vel vestibulum nibh, non pellentesque massa. Katika mipango ya nyumba ni muhimu tu kupendeza wakati. Ipasavyo, hakuna uwezekano wa matokeo. Ilikuwa ni soka ya moja kwa moja, ambayo imetengenezwa kupamba rada. Wingi wa waombolezaji wenye kisasi Mpaka afya ya mtu iweze kuokoa bili zake. Kila na mengi ya milango, mahitaji yangu, baadhi ya hofu. Hakuna haja, au uwekezaji wowote, kicheko cha pombe sumu Ni wakati wa kukaa karibu na katoni, lakini sio kuu, washa gari. Laini kama chapa ya biashara ya maisha Curabitur sit amet ipsum eleifend, members turpis et, aliquam augue. Maecenas tristique ipsum sit amet nunc consectetur laoreet. Filamu ya ziwa la aibu, mwisho wa taya, ili, kutoka kwa kemikali yenye sumu.
```

- Go to [unsplash](https://unsplash.com/), download an image of your preference, and add it to `/public/assets/`, i.e., `/public/assets/getting-started.jpeg`.

Our blog post will follow the above structure. Feel free to create others using the same steps we have done.

Our blog posts will adhere to the structure outlined above. Try creating more posts by following the same steps we did.

### Creating types
Since we are using TypeScript, it will be helpful to define the structure of our data. TypeScript support type annotation allows you to define which data types you are dealing with. In the project root directory, create a `type` folder. Create a `post.ts` file in the `types` folder and specify the structure of a post, as shown below.

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
To show the posts, we will work on the `pages/index.tsx` file. Edit your `pages/index.tsx` file as follows.

```ts
import type { NextPage, GetStaticProps } from 'next'
import Link from 'next/link'
import Thumbnail from '../components/Thumbnail';
import { IPost } from "../types/post";
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
        'slug',
        'date',
        'thumbnail',
        'title',
        'description'
    ]);

    return { props: { posts } }
}
```

We are simply;

- Fetching the posts at build time from the server-side using the `getStaticProps()` component function as previously defined in the `mdxUtils.ts` utility functions.
- Displaying the fetched posts from the rendered component function.

Let's test if everything is working right. From your project folder, run the following command to start the development server.

```bash
npm run dev
```

Open the running server on a browser using `http://localhost:3000`. And now you should be able to have the added MDX content on your webpage.

![home-page](/engineering-education/build-a-static-nextjs-markdown-files-blog-with-typescript-mdx-tailwindcss/home-page.PNG)

### Showing a single post
We will first handle the state management in the application for managing our component's data. We will use the Context API, which is present in Next.js.

Create a `context` directory on the project root folder. Inside the `context` directory, create an `mdxContext.tsx` file. Edit your `mdxContext.tsx` as shown below.

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

The above code block manages the state of our components. This includes `prerequisites`, and `stacks`. Then exporting a `Provider (MdxComponentsProvider)` and a `Consumer hook function (useMdxComponentsContext)`

The next step is to embed `MdxComponentsProvider` in the `pages/_app.tsx` file to be accessed on all pages by wrapping the components with it.

```ts
import type { AppProps } from 'next/app';
import Layout from '../components/Layout';
import 'tailwindcss/tailwind.css'
import { MdxComponentsProvider } from '../context/mdxContext';

function MyApp({ Component, pageProps }: AppProps) {
    return <MdxComponentsProvider> <Layout>

        <Component {...pageProps} />

    </Layout>

    </MdxComponentsProvider>
}

export default MyApp
```

In your `components` folder, add two more files `Prerequisites.tsx`, and *Stacks.tsx`.

In the `Prerequisites.tsx` file, we will be getting the `prerequisites` from the consumer hook and mapping them on a list. Add the following code block.

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

The `Stacks.tsx` will get the `stacks` from the consumer hook and map them on a list. Add the following code block.

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

Within the `pages` directory, create a `posts` folder. Create a `[slug].tsx` file in the `posts` directory. The square brackets indicate that this is a dynamic file dependent on the `slug` keyword. This is how we will set up the `[slug].tsx`.

```ts
import { GetStaticProps, GetStaticPaths } from 'next';
import { serialize } from 'next-mdx-remote/serialize';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Prerequisites from '../../components/Prerequisites';
import Stacks from '../../components/Stacks';
import Thumbnail from '../../components/Thumbnail';
import { IPost } from '../../types/post';
import { getPost, getAllPosts } from '../../utils/mdxUtils';
import { ParsedUrlQuery } from 'querystring';
import { useMdxComponentsContext } from '../../context/mdxContext';

type Props = {
    source: MDXRemoteSerializeResult,
    frontMatter: Omit<IPost, 'slug'>;
}

const components = {
    Prerequisites,
    Stacks,
}

const PostPage: React.FC<Props> = ({ source, frontMatter }: Props) => {

    const { setPrerequisites, setStacks } = useMdxComponentsContext(); // get setters

    useEffect(() => {
        setPrerequisites(frontMatter.prerequisites); // set prerequisites
        setStacks(frontMatter.stacks); // set stacks
    }, [
        setPrerequisites,
        setStacks,
        frontMatter.prerequisites,
        frontMatter.stacks
    ]);

    const router = useRouter();
    // check if the page is building
    if (router.isFallback) {
        return "<h1>Loading...</h1>";
    }

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
    const { content, data } = getPost(slug); // get the slug
    const mdxSource = await serialize(content, { scope: data }); // serialize the data on the server side
    return {
        props: {
            source: mdxSource,
            frontMatter: data
        }
    }
}

export const getStaticPaths: GetStaticPaths = () => {
    const posts = getAllPosts(['slug']); //only get the slug from posts 

    const paths = posts.map((post) => ({ // map through to return post paths
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

This dynamic file allows you to set your server-side and client-side as follows;

On the server-side;

- Fetch the content of the current post using `getStaticProps()`. The data of the article is serialized and returned as `source`, and `frontMatter`.
- Fetch the paths of the post at build time from the `getStaticPaths()`. Also, return `fallback` to `false` so that every post path that is not generated at build time will generate a `404` error.

On the client-side;

- Get the `source`, and the `frontMatter` sent from the server.
- Set the data to the application context using the consumer hook.
- Check whether the page is building and returning a loading text.
- Display the article content. The `source` and the `components` as shown in the `MDXRemote` component.

Ensure that the development server is still running, and test if this works. Click on any article from the home page, and a single article page should be loaded.

![specific-article-page](/engineering-education/build-a-static-nextjs-markdown-files-blog-with-typescript-mdx-tailwindcss/specific-article-page.PNG)

### Deploy to Vercel
To deploy to Vercel, ensure you push/publish your code to a GitHub repository first. [Login](https://vercel.com/login) to your Vercel dashboard or [register](https://vercel.com/signup) if you don't have one.

From your [dashboard](https://vercel.com/dashboard), click on [New Project](https://vercel.com/new). Ensure that you have logged in to your GitHub account, select it as your Git provider, and then search and import your project.

Enter your preferred project name and then click Deploy

![vercel-deployment-conf](/engineering-education/build-a-static-nextjs-markdown-files-blog-with-typescript-mdx-tailwindcss/vercel-deployment-conf.PNG)

After the deployment is done, click on the generated preview, and you will be redirected to your hosted blog application which you can share with friends and the general community.

![hosted-blog-application](/engineering-education/build-a-static-nextjs-markdown-files-blog-with-typescript-mdx-tailwindcss/hosted-blog-application.PNG)

### Conclusion
Next.js is an amazing React-based framework. It allows you to work with almost any aspect of bot server-side and client-side content. It is very lightweight and allows you to create full fledge fast applications. In this tutorial, we built a blog application with Next.js, TypeScript, MDX, and Tailwind CSS and deployed it to Vercel. I hope you found the whole stack worth learning.