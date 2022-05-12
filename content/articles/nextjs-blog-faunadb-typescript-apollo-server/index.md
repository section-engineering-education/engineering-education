---
layout: engineering-education
status: publish
published: true
url: /nextjs-blog-faunadb-typescript-apollo-server/
title: Create a Next.js Blog App with TypeScript, Apollo Server and FaunaDB
description: This guide will use FaunaDB, model the data relationships, and create an API that you can use to connect to your frontend application.
author: catherine-macharia
date: 2021-12-06T00:00:00-16:20
topics: [API]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/nextjs-blog-faunadb-typescript-apollo-server/hero.jpg
    alt: Create a Next.js Blog App with TypeScript, Apollo Server and FaunaDB Hero Image
---
FaunaDB is a hosted cloud database that is entirely serverless. It is fast and scales infinitely in the cloud. FaunaDB lets you manage your database data from its web interface or the command line. It can handle complex data modeling use cases.
<!--more-->
Developers tend to prefer SQL for its security and data consistency, and we prefer NoSQL for its flexibility, scalability, and productivity. FaunaDB is a hybrid of these two. It combines the safety and security of SQL with the productivity and scalability of NoSQL.

This guide will use FaunaDB, model the data relationships, and create an API that you can use to connect to your frontend application. We will bootstrap Next.js with TypeScript and Apollo client on the frontend. Then create a blog app that leverages the serverless FaunaDB and Apollo server on the backend. Then we will deploy the application using the Next.js Versel.

### Prerequisites
To follow along with this tutorial, you'll need to:
- Have [Node.js](https://nodejs.org/en/) installed on your computer.
- Be familiar with TypeScript.
- Have a basic knowledge of working with Apollo client and server.
- Have a basic understanding of FaunaDB.

### Table of content
- [Prerequisites](#prerequisites)
- [Tables of content](#tables-of-content)
- [Setting up and configuring FaunaDB](#setting-up-and-configuring-faunadb)
- [Setting up the backend API](#setting-up-the-backend-api)
- [Setting up the frontend](#setting-up-the-frontend)
- [Configuring the frontend](#configuring-the-frontend)
- [Fetching the added articles](#fetching-the-added-articles)
- [Adding an article](#adding-an-article)
- [Showing a single article](#showing-a-single-article)
- [Conclusion](#conclusion)

### Setting up and configuring FaunaDB
If you already have a FaunaDB account, you can log in [here](https://dashboard.fauna.com/accounts/login). Otherwise, you may [register](https://dashboard.fauna.com/accounts/register) for one. Then, create a Fauna database from [here](https://dashboard.fauna.com/).

![create-fauna-db](/engineering-education/nextjs-blog-faunadb-typescript-apollo-server/create-fauna-db.png)

Once the database is created, create a new collection where the blog documents will be saved. Collections are Fauna's version of tables.

![new-collection](/engineering-education/nextjs-blog-faunadb-typescript-apollo-server/new-collection.png)

Enter the **collection name** and then click **Save**. The collection will be created, and you will be redirected to the collections page.

Fauna saves data and information in "documents." If you are used to working with other databases, individual documents in a collection are comparable to the rows in a table. As of now, it won't have any documents.

![new-collection-page](/engineering-education/nextjs-blog-faunadb-typescript-apollo-server/new-collection-page.png)

### Setting up the backend API
Create a project directory and initialize an NPM project by running the following command.

```bash
npm init --yes
```

Install the following packages:
- [FaunaDB](https://www.npmjs.com/package/faunadb): This is to provide a driver to access FaunaDB instance.
- [Apollo server](https://www.npmjs.com/package/apollo-server): For setting up backend GraphQL API.
- [GraphQL](https://www.npmjs.com/package/graphql): For providing a query language for the API.
- [Nodemon](https://www.npmjs.com/package/nodemon): For automatically restarting the development server.

```bash
npm i --save apollo-server faunadb graphql
```

Run the following command to install Nodemon as a development dependency.

```bash
npm i --save-dev nodemon
```

Inside your project folder, create an `index.js` file and set up your backed server as follows:

Import the above installed packages:

```js
const {gql,ApolloServer} = require("apollo-server");
const faunadb = require("faunadb");
```

Define a query and create a client instance for FaunaDB:

```js
const q = faunadb.query;
const faunaClient = new faunadb.Client({
    secret:"your_secret",
    domain: 'db.us.fauna.com',
    scheme: 'https'
})
```

To get your secret, go to the dashboard of the Fauna database you have just created and head over to the security section.

![security_section](/engineering-education/nextjs-blog-faunadb-typescript-apollo-server/security-section.png)

You probably don't have any key right now; click on **New Key**, enter any Key name, and then hit **Save**. Copy the Key present on the new page and paste it in the **secret** section of the above code.

The domain will be determined by the region you have selected. For example, if you have selected **US**, the domain will be `db.us.fauna.com`. 

For **EU**, it will be `db.eu.fauna.com`. Refer to these [docs](https://docs.fauna.com/fauna/current/learn/understanding/region_groups) for more information. You can view your region group in the **DB overview** section.

The next step is to come up with the type definitions. Add the following after the previous section.

```js
const typeDefs = gql`
# structure of an article
type Article{
    ref: String
    title: String
    summary: String
    content: String
}

# queries
type Query {
    articles:[Article]
    article(id:ID):Article
}

# mutations 
type Mutation {
    createArticle(title:String,summary:String,content:String):Article
}   
`;
```

Based on the information provided above, we are defining the following fields for each blog article:
- `Ref`: A unique identifier for the article.
- `Title`: Article's title.
- `Summary`: Short description of the article.
- `Content`: Article's content.

We are also defining a query for getting many and single articles. And, a mutation to create an article based on the article's fields.

Next, add a method to get many articles as follows:

```js
const  getArticles = async() => {
    try{
        // Get the articles added.
        let {data} = await faunaClient.query(
            q.Map(
                q.Paginate(q.Documents(q.Collection("articles"))),
                q.Lambda(x => [ q.Select('id', x), q.Get(x) ])
            )
        );
        
        // Map through the articles, redefining the structure
        let articles = data.map((article) =>{
            return {
                "ref":article[0],
                ...article[1]['data']
            }
        });
        
        // return the articles.
        return articles;
    }catch(error){
        // return an error message
        return new Error(error).message;
    }
}
```

Using the `faunaClient` instance, we're able to retrieve articles from our database. We are using the `Map` to go through the returned data sets, `Paginate` to add pagination to our dataset, and `Lambda` to be able to get the specific ids of each dataset.

We are also mapping through the dataset, restructuring it to match our schema. And in case of any error, return that error message.

Implement the method to get a single article as follows:

```js
const getArticle  = async (id) => {
    try{
        // Get the specific article bases on id
        const {data} = await faunaClient.query(
            q.Get(q.Ref(q.Collection("articles"),id))
        );
        // return it
        return data;
    }catch(error){
        // return an error message
        return new Error(error).message;
    }
}
```

We are requesting the data of a specific article based on the `id`, which is the reference number given for every single article. We then return the fetched data, and in case of any error, we are returning the error message.

Implement the method to create an article as follows:

```js
const createArticle = async (title,summary,content) => {
    try{
        // create an article with its title, summary, and content
        const {data} = await faunaClient.query(
            q.Create(q.Collection("articles"),{data:{title,summary,content}})
        );
        // return the created article
        return data;
    }catch(error){
        // return an error message
        return new Error(error).message;
    }
}
```

We are creating an article using the `title`, `summary`, and `content` fields. Then, return the article created. In case of any error, return that specific error message.

Connect the above functions to the `Query` or `Mutation` object using the below resolver.

```js
const resolvers = {
    Query:{
        articles: () => getArticles(), // all articles
        article: (_,{id}) => getArticle(id) // single article
    },
    Mutation:{
        createArticle: (_,{title,summary,content}) => createArticle(title,summary,content), // creating an article
    }
}
```

We are connecting the types we defined for the `Query` and `Mutation` to their respective resolver functions above.

Instantiate the Apollo server.

```js
const server = new ApolloServer({typeDefs,resolvers,cors:{
    credentials:true,
    origin:'*'
}});
```

We instantiate the Apollo server above by sending our `type definitions`, `resolvers`, and setting `cors` to permit all origins. In a production application, you are recommended to whitelist the origins.

Create a port the server will run on.

```js
const PORT = process.env.PORT || 4000;
```

Now, start the server.

```js
server.listen(PORT).then( ({url}) => {
    console.log(`server started on ${url}`);
});
```

By calling the `listen` method, the server will be started on the specified port, and then a message will be logged with the local `URL` of the server.

To start the server, add the following line in the `scripts` section in your `package.json`.

```js
"dev":"nodemon index.js"
```

This command will start the development server using `nodemon`. Open the terminal from the current project location and run the following command to start the development server.

```bash
npm run dev
```

![initial_server_log](/engineering-education/nextjs-blog-faunadb-typescript-apollo-server/initial-server-log.png)

From your browser, visit the URL logged on your console. Since we are using `Apollo Server`, you will receive a page like the one shown below.

![apollo-launch-server](/engineering-education/nextjs-blog-faunadb-typescript-apollo-server/apollo-launch-server.png)

Click on `Query your server` and your playground will be populated for the current running server.

![apollo-playground](/engineering-education/nextjs-blog-faunadb-typescript-apollo-server/apollo-gui-playground.png)

Feel free to interact with the `GUI`, write operations on the `operations` tab, run them, and view the response from the `response` section. Our server is now up and running. Let us build the frontend using `Next.js`.

### Setting up the frontend
To set up the frontend, we will use [create next app](https://nextjs.org/docs/api-reference/create-next-app), a tool provided by the Next.js team to make setting up a Next.js project much easier. 

Create a fronted directory. Within that folder, run the following command to initialize the Next.js project.

```bash
npx create-next-app --typescript .
```

Since we will be using TypeScript, we need to pass in the `--typescript` parameter followed by a `.` to specify that the project is to be hosted in the current directory.

After the installation is complete, we will need to install two packages:
- `@apollo-client` - Is used when connecting to our Apollo server instance.
- `graphql` - For interpreting the queries that will be in our application.

Run the following command to install the above packages.

```bash
npm i @apollo/client graphql
```

### Configuring the frontend
Configuring implies setting up the utilities and the components we will need in our application. Create a `lib` directory on the project root folder. 

Inside the `lib` directory, create an `apollo-client.tsx` file and add the following function.

```tsx
import {ApolloClient,InMemoryCache} from "@apollo/client";

export const getApolloClient = () => {
    return new ApolloClient({
        uri: 'http://localhost:4000',
        cache: new InMemoryCache()
      });
};
```

The above function is instantiating an `ApolloClient` by passing in the `URI` of our `ApolloServer` and a `cache` where `ApolloClient` will save its cached queries. Navigate to the `pages/_app.tsx` and import the `ApolloProvider`  and `getApolloClient` functions as follows.

```tsx
import {
ApolloProvider,
} from "@apollo/client";
import {getApolloClient} from "../lib/apollo-client";
```

Instantiate `ApolloClient` on a `client` variable.

```tsx
const client = getApolloClient();
```

Wrap the `Component` returned with the `ApolloProvider` and provide its client.

```tsx
<ApolloProvider client={client}>  
    <Component {...pageProps} />
</ApolloProvider>
```

Create a `components` directory on the project root folder. Inside it, create a `navbar` and `footer` directories. Inside the `navbar` directory, create a `Navbar.tsx` and `Navbar.module.css` file. In the `Navbar.tsx`, add the following code block to create a simple navbar.

```tsx
import React from 'react'
import Link from "next/link"
import styles from "./Navbar.module.css";

export default function Navbar() {
    return (
        <div className={styles.navbarContainer}>
            <nav>
                <div className={styles.navbarBrand}>
                    Blog app
                </div>
                <div className={styles.navbarList}>
                    <ul>
                        <li>
                            <Link href="/">
                                <a>Home</a>
                            </Link>
                        </li>
                        <li>
                            <Link href="/add-article">
                                <a>Add article</a>
                            </Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    )
}
```

Add the following styles in the `Navbar.module.css` to format the `Navbar`.

```css
.navbarContainer{
    width:100%;
    padding:10px;
    background-color:#cccc
}

.navbarContainer nav{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 60%;
    margin: 0px auto;
}

.navbarBrand {
    font-weight: bold;
    padding: 15px 0px;
}

.navbarList{
    justify-content: center;
    align-items: center;
}

.navbarList ul {
    display: flex;
    flex-direction: row;
    list-style-type: none;
}

.navbarList ul li{
    margin-left: 10px;
}
```

Inside the `footer` directory, create a `Footer.tsx` and a `Footer.module.css` file. In the `Footer.tsx` file, add the following code block to create a simple footer.

```tsx
import React from 'react'
import styles from "./Footer.module.css"

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <p>
                Next.js blog app
            </p>
        </footer>
    )
}
```

Add the following styles in your *Footer.module.css* to format the `Footer`.

```css
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

Create a `Layout.tsx` file inside the `component` directory to host the configuration for every specific page that we will build. Go ahead and add the following configurations to the file.

```tsx
import React from 'react'
import Head from 'next/head'
import Navbar from "./navbar/Navbar";
import Footer from "./footer/Footer";

interface LayoutProps {
    children:React.ReactNode
}

export default function Layout({children}:LayoutProps) {
    return (
        <div>
            <Head>
            <title>Blog app</title>
            <meta name="description" content="Blog app using Next.js and FaunaDB" />
            <link rel="icon" href="/favicon.ico" />
            </Head>
            <Navbar />
            <main>
            {children}
            </main>
            <Footer />
            <style jsx>{`
                main {
                    min-height: 70vh;
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                  }
            `}</style>
        </div>
    )
}
```

Here, we are setting up a static `Head` configuration, the dynamic content for the `Navbar` and `Footer` pages, and some basic styling.

Import the `Layout` above into the `pages/_app.tsx` file. Then inside the `ApolloProvider` wrap the `Component` with `Layout` so that the `Navbar` and `Footer` can be persistent on all pages.

```tsx
import Layout from "../components/Layout";

<ApolloProvider client={client}>
    <Layout>
        <Component {...pageProps} />
    </Layout>
</ApolloProvider>
```

### Fetching the added articles
To fetch the added articles, we will work on the `pages/index.tsx` file and edit it as follows:

```tsx
import type { NextPage } from 'next'
import {useQuery,gql} from "@apollo/client";
import Link from "next/link";

const Home: NextPage = () => {
  const GetArticles = gql`
    query GetArticles {
      articles {
        content
        ref
        title
        summary
      }
    }
  `;
  const {loading,error,data} = useQuery(GetArticles);  
  return (
   
    <div className="container">    
      {
        loading ? (
          <h2>Loading</h2>
        ) : (
          error ? (
            <h2>{error.message}</h2>
          ) : (
              data.articles.length > 0 ? (
                  data.articles.map((article:any,index:any) => {
                    return (
                        <div key={index}>
                        <Link href={`/posts/${article['ref']}`}>
                            <a>{article['title']}</a>
                            </Link>
                        <p>{article['summary']}</p>
                        </div>
                    )
                  })
              ) : (
                  <h2>No saved articles found</h2>
              )           
          )
        )
      }
      <style jsx>{`
        .container {
          margin-top: 2rem;
          width:60%;
          margin: 0px auto;
          padding:2rem 0px;
        }
        .container a{
          font-weight:bold;
        }
      `}</style>
    </div>
  )
}
export default Home;
```

The `useQuery` hook sends our query to our `Apollo server` by passing the `query` as the parameter. This will the `loading`, `error`, `data` states. 

If we are in the `loading` state, it means the server is fetching the articles. If an error occurs during this process, an error message will be returned. Otherwise, the loaded list of data/articles will be returned.

If there are no saved articles, we will receive a message. Otherwise, the articles will be mapped to the set `container` UI. Start the development server for the frontend by running the following command. Make sure you run this command within the folder that hosts the backend Next.js application.

```bash
npm run dev
```

Ensure that the development server of the apollo server is still up and running. Then open `http://localhost:3000` on your browser depending on whether you have saved articles.

![articles_home](/engineering-education/nextjs-blog-faunadb-typescript-apollo-server/articles-home.png)

### Adding an article
To handle this operation, navigate to the `pages` directory of the project folder and create an `add-article.tsx` file. Then add the following code block to handle adding a new article.

```tsx
import React,{useState} from 'react';
import {useMutation,gql} from "@apollo/client";
import Link from "next/link";

export default function AddArticle() {

    const [title,setTitle] = useState('');
    const [summary,setSummary] = useState('');
    const [content,setContent] = useState('');
    const [form_error,setFormError] = useState("");
    const [success_message,setSuccessMessage] = useState("");

    // create a graphql mutation query
    const ADD_ARTICLE = gql`
    mutation createArticle($title: String, $content: String, $summary: String) {
    createArticle(title: $title,content: $content,summary: $summary) {
        content
        summary
        title
    }
    }`; 

    // instanciate useMutation
    const [addArticle,{loading,data,error}] = useMutation(ADD_ARTICLE);

    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        // reset error and success message fields.
        setSuccessMessage("");
        setFormError("");

        // check the fields.
        if(title && summary && content){

            addArticle({variables:{
                title,
                summary,
                content
            }}).then( () => {
                //release state
                setTitle("");
                setSummary("");
                setContent("");
                setFormError("");
                // set success message
                setSuccessMessage("Article successfully added");
                return;
            })
            .catch( () => {
                setFormError("An error occurred");
            });

        }else{
            setFormError("All fields are required");
        }
    }

    return (
        <div className="container">

            <div className="add-todo-form">

                <form onSubmit={handleSubmit}>
                {
                    form_error ? (
                        <p className="form-error">{form_error}</p>
                    ) : null
                }
                {
                    error ? (
                        <p className="form-error">{error.message}</p>
                    ) : null
                }
                {
                    success_message ? (
                        <p className="form-success">{success_message}. Go to <Link href="/"> <a>home</a>
                        </Link>
                        </p>
                    ) : null
                }
                <div className="form-group">
                    <label>Title</label>
                    <input type="text" value={title} placeholder="Article title" onChange={ (e) => setTitle(e.target.value)}  />
                </div>

                <div className="form-group">
                    <label>Summary</label>
                    <input type="text" value={summary} placeholder="Article summary" onChange={ (e) => setSummary(e.target.value)} />
                </div>

                <div className="form-group">
                    <label>Content</label>
                    <textarea value={content} placeholder="Article content" onChange={ e => setContent(e.target.value)} rows={10}/>
                </div>
                
                <div className="form-group">
                    <button type="submit">
                        {
                            loading ? 'Loading' : "Add article"
                        }
                    </button>
                </div>
                </form>

            </div>

            <style jsx>{`
                .container {
                margin-top: 2rem;
                width:60%;
                margin: 0px auto;
                padding:2rem 0px;
                }
                .add-todo-form{
                    width:100%;
                }
                .form-group label{
                    width:100%;
                    display:block;
                    margin-bottom:10px;
                }
                .form-group input[type='text']{
                    width:100%;
                    padding:10px;
                    margin-bottom:10px;
                }
                .form-group textarea{
                    width:100%;
                    padding:10px;
                    margin-bottom:10px;
                }
                .form-error{
                    color:red;
                }
                .form-success{
                    color:green;
                }
            `}
            </style>
        </div>
    )
}

```

We're using `state` to hold `title`, `summary`, `content`, `form error`, and a `success message`.We have the GraphQL mutation query that runs and adds the article on the server. We then instantiate the `useMutation` hook and destructure the `submit function`, `loading`, `data`, and `error`. 

The `handleSubmit` function will check if all fields have been filled with the necessary data and then send a request to the server using the `submit function` from `useMutation`. When the article is submitted successfully, we reset the state and show a success message. 

Otherwise, if an error occurs, we are setting a form error and showing the error directly from `useMutation`. Ensure the fronted and backed development servers are running. Open `http://localhost:3000` on your browser and click `Add article` on the navigation bar.

![add-article](/engineering-education/nextjs-blog-faunadb-typescript-apollo-server/add-article.png)

Fill in the fields and send a request.

![add-article-response](/engineering-education/nextjs-blog-faunadb-typescript-apollo-server/add-article-response.png)

Go to the `Home` page, and you should see your newly added articles.

### Showing a single article
Navigate to your `pages` folder and create a `posts` directory. Inside the `posts` directory, create a `[ref].tsx` file. The square brackets in Next.js imply that the `ref` will be dynamic and refer to a single request associated with the current `ref` (the article's reference number/id). 

In the `[ref].tsx` file, add the following code block.

```tsx
import React from 'react'
import {GetStaticProps} from 'next';
import {gql} from "@apollo/client";
import {getApolloClient} from "../../lib/apollo-client";
import { ParsedUrlQuery } from 'querystring';
import {useRouter} from "next/router";

// get a single article query
const GET_ARTICLE = gql`
    query GetArticle($articleId: ID) {
        article(id: $articleId) {
            content
            title
            summary
        }
    }
`;

// get many articles
const GET_ARTICLES = gql`
    query GetArticles {
    articles {
        ref
    }
    }
`;

interface Iprops{
    article:any
}

export default function Post({article}:Iprops) {
    const router = useRouter();

    if(router.isFallback){
        return (
            <h2>Loading...</h2>
        )
    }

    return (
        <div className="container">
            <h3>{article['title']}</h3>

            <h5>{article['summary']}</h5>

            <p>{article['content']}</p>

            <style jsx>{`
            .container {
                margin-top: 2rem;
                width:60%;
                margin: 0px auto;
                padding:2rem 0px;
                }`}
            </style>

        </div>
    )
}

interface Iparams extends ParsedUrlQuery {
    ref:string
}

// Fetch a single article based on the ref

export const  getStaticProps:GetStaticProps = async  (context) => {
    const {ref} = context['params'] as Iparams;
    const apolloClient = getApolloClient();
    const {data} = await apolloClient.query({
        query:GET_ARTICLE,
        variables:{
            "articleId":ref
        }
    });
    return {
        props:{
            "article":data['article']
        }
    }
}

// Build paths for the articles present at build time

export async function getStaticPaths(){
    const apolloClient = getApolloClient();
    const {data} = await apolloClient.query({
        query:GET_ARTICLES
    });
    const paths = data['articles'].map((article: any) => {
        return {
            params:{
                "ref" : article['ref']
            }
        }
    });
    return {
        paths,
        fallback:false
    }
}
```

Here we're creating two queries, one when fetching a single article and the other when fetching many articles. We're using two methods for data fetching. `getStaticProps` and `getStaticPaths`. `getStaticProps` will be used to fetch the article from the server-side, whereas `getStaticPaths` will fetch the articles at build time.

In both cases, we're instantiating `apolloClient` with `getApolloClient`. In the `getStaticPaths`, set `fallback` to `false` so that any path not generated will return a `404` error. Ensure the fronted and backed development servers are running. Open `http://localhost:3000` on your browser. On the home page, click on any article title, and you will be redirected to its specific page as such.

![article-spec-page](/engineering-education/nextjs-blog-faunadb-typescript-apollo-server/article-spec-page.png)

### Conclusion
We built a blog application with Next.js, TypeScript, Apollo Client, Apollo Server, and FaunaDB. Refer to the further reading section for more information on the technologies and techniques used in this topic.

Happy coding!

### Further reading
- [Apollo client guide](https://www.apollographql.com/docs/react/)
- [Apollo server guide](https://www.apollographql.com/docs/apollo-sever/)
- [FaunaDB tutorial](https://docs.fauna.com/fauna/current/tutorials/)
- [Data fetching in Next.js](https://nextjs.org/docs/basic-features/data-fetching)

---
Peer Review Contributions by: [Dawe Daniel](/engineering-education/authors/dawe-daniel/)