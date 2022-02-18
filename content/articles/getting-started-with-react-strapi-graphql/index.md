---
layout: engineering-education
status: publish
published: true
url: /getting-started-with-react-strapi-graphql/
title: Getting Started With React, Strapi, and GraphQL 
description: This tutorial will help the reader understand how to get started with React, Strapi, and GraphQL.
author: kevin-kimani
date: 2022-02-16T00:00:00-05:00
topics: [Languages]
excerpt_separator: <!--more-->
images:
  - url: /engineering-education/getting-started-with-react-strapi-graphql/hero.jpg
    alt: Getting Started With React, Strapi, and GraphQL Hero Image
---
Strapi is a headless CMS(Content Management System) written in JavaScript that enables users to create APIs with ease through a user-friendly interface. 
<!--more-->
In traditional Content Management Systems, the frontend and backend parts of a website are usually bundled together. 

With a headless CMS, the two parts are separated. Therefore, we can customize our frontend the way we want and create it with the languages or frameworks that we prefer.

In this article, we will take a look at how we can use the Strapi CMS and React to create a blog web application. 

You can read more about Strapi in the [official documentation](https://docs.strapi.io/developer-docs/latest/getting-started/quick-start.html).

### Table of contents
- [Prerequisites](#prerequisites)
- [Key takeaways](#key-takeaways)
- [Creating a Strapi app](#creating-a-strapi-app)
- [Creating Content Types](#creating-content-types)
- [Creating new blogs](#creating-new-blogs)
- [Setting up permissions](#setting-up-permissions)
- [Installing the GraphQL plugin](#installing-the-graphql-plugin)
- [Creating a React app](#creating-a-react-app)
- [Creating pages](#creating-pages)
- [Testing the application](#testing-the-application)
- [Conclusion](#conclusion)

### Prerequisites
To follow along, you need to have the following:
- Some knowledge of React and React hooks.
- A basic understanding of [GraphQL](https://graphql.org/learn/).
- [Node.js](https://nodejs.org/en/download/) installed on your computer.
- Both yarn and npm should be enabled to work on the same project. To see how you can enable this functionality, click [here](https://yarnpkg.com/getting-started/install).

### Key takeaways
This tutorial will help you to:
- Work with a headless CMS.
- Use GraphQL plugin with the Strapi CMS.
- Work with Apollo and React.

### Creating a Strapi app
Open your terminal, navigate to the directory where you want to create the project, and create a folder for the project, as shown below:

```bash
mkdir react-strapi-blog && cd react-strapi-blog
```

Use the following code to create the Strapi app:

```bash
npx create-strapi-app backend
```

You will be given these options:

![Installation Type](/engineering-education/getting-started-with-react-strapi-graphql/installation-type.png)

Choose `Quickstart` to install Strapi with the recommended settings.

Once the installation is done, Strapi will automatically fire up a local development server on `http://localhost:1337/admin/auth/register-admin` which serves the admin backend to us. 

On this URL, the following page will appear. Fill in the required credentials to create an admin user and click on `Let's Start`.

![Register Admin](/engineering-education/getting-started-with-react-strapi-graphql/register.png)

If this does not happen automatically, `cd` into the `backend` folder and run the command below:

```bash
npm run develop
```

You will then be redirected to `http://localhost:1337/admin/` which is the Strapi admin dashboard. The dashboard looks like this:

![Admin Dashboard](/engineering-education/getting-started-with-react-strapi-graphql/admin.png)

### Creating content types
A content type is a blueprint for a piece of content. It describes what fields the content should have and the data types. 

For example, a blog content type might have a *title field, a body field*, and an *author field*.

To create a content type, click on the `Content-Type Builder` on the left sidebar. The following screen will appear:

![Content Type](/engineering-education/getting-started-with-react-strapi-graphql/content-type-builder.png)

Under `COLLECTION TYPES`, click on `Create new collection type`:

![New Collection Type](/engineering-education/getting-started-with-react-strapi-graphql/content-type-builder-screen.png)

Under display name, input `blog` as shown above and the other fields will automatically generate their text. Click on `Continue`.

You will then be presented with the following screen where you will choose a field for your content type. Choose `Text`.

![Blog Fields](/engineering-education/getting-started-with-react-strapi-graphql/fields.png)

On the next screen which is shown below, add a name for your field, input `Title`, which is going to represent the *title* of the blog.

![Text Fields](/engineering-education/getting-started-with-react-strapi-graphql/text-filed.png)

Click on `Add another field` to add other fields. Follow the process and add the following two fields:

- Select the field `Rich Text` and give it the name `Body`. This will store the content/body of the blog.

- Select the field `Text` and give it the name `Author`. This will store the author's name.

After you've added all the fields, click *finish*.

### Creating new blogs
To create new blogs which we will later fetch from the frontend, click on `Content Manager` on the sidebar of the admin dashboard and you will be presented with the following screen:

![Add Blogs](/engineering-education/getting-started-with-react-strapi-graphql/add-blogs.png)

Click on `Create new entry` to add a blog. Input the *blog title, body*, and *author*. Then click `Save` and `Publish` so that the blog can be retrieved from the frontend.

To add new blogs, click on the `Back` button at the top and select `Add new entry`. Create as many blogs as you wish. For this tutorial, I have created 3 blogs.

### Setting up permissions
By default, Strapi protects content types so that they can't be accessed by the public. To access the data in Strapi from the frontend, we will need to update permissions.

On the admin dashboard, click `Settings`. Under `USERS & PERMISSIONS PLUGIN`, select `Roles` and you will be presented with the screen below:

![Roles](/engineering-education/getting-started-with-react-strapi-graphql/roles.png)

Click on `Public` and under permissions select `Blog` and tick the `find` and `findOne` fields as shown below:

![Permissions](/engineering-education/getting-started-with-react-strapi-graphql/find-findOne.png)

Click `Save`. The above configuration will enable the frontend to retrieve a single as well as many blogs.

### Installing the GraphQL plugin
To use GraphQL in our Strapi app, we need to install the plugin. Open the terminal where the Strapi app is running and press `Ctrl + C` to stop the server.

Run the command below to install GraphQL:

```bash
yarn strapi install graphql
```

### Creating a React app
Now that the backend is all set up, we can now create the frontend. To create the React app, run the code below in the appropriate folder:

```bash
npx create-react-app frontend
```

After the React application has been successfully created, we need to install the following packages:

- *apollo-client* - This will help us to manage and make queries in React components.
- *graphql* - To parse GraphQL queries.
- *react-router-dom* - To set up routing in the web application.

Run the code below to install them:

```bash
npm install @apollo/client graphql react-router-dom
```

We will be using *TailwindCSS* to style our React application. Click [here](https://tailwindcss.com/docs/guides/create-react-app) to learn how to setup React with TailwindCSS.

After the installation is complete, create two new folders in the `src` directory with the names `components` and `pages`. 

In the `component`s folder, create a new file named `Header.js` and paste in the code below:

```js
import React from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
      <Link to={`/`}> 
        <h2 className='text-3xl text-purple-600'>
          Strapi React Blog      
        </h2>
      </Link>
  );
}
```

In the code above, we created a simple header for our web application and linked it to the homepage.

### Creating pages
In the `pages` folder, create two new files namely `Homepage.js` (it will be used to display a list of all blogs) and `BlogDetails.js`(this will be used to display the content of a single blog).

Open the `Homepage.js` file and paste in the code below:

```js
//Make the necessary imports
import React from 'react';
import { useQuery, gql } from '@apollo/client'
import { Link } from 'react-router-dom'

//GraphQL query to fetch all the blogs from the backend
const BLOGS = gql`
{
    blogs {
      data {
        id
        attributes {
          Title
          Body
          Author
        }
      }
    }
  }
`

export default function Homepage() {

//Execute the query using the useQuery hook and store the return values.
const { loading, error, data } = useQuery(BLOGS)

//Display the following when fetching
if (loading) return <p>Loading...</p>
//Display the following in case an error is encountered
if (error) return <p>Error :(</p>
//log the data to the console
console.log(data)
  return (
      <div>
      {/* Map through the data */}
          {
            data.blogs.data.map(blog => (
                <div key={blog.id} className='mt-2 mb-2 p-4 bg-white rounded-md'>
                    <div className='text-xl'>
                        {blog.attributes.Title}
                    </div>

                    <small>
                        {blog.attributes.Author}
                    </small>

                    {/* Display only the first 150 characters of the body */}
                    <div>
                        {blog.attributes.Body.substring(0,150)}...
                    </div>

                    {/* Link to display the whole blog content */}
                    <Link to={`/blog/${blog.id}`} className='text-purple-600'>Read more...</Link>
                </div>
            ))
          }
      </div>
  );
}
```

**Code explanation:**

- `gql` is used by apollo to convert a query string into a format that apollo can understand.

- In the code above, we write a query to fetch all the blogs from the backend, store it in a `const BLOGS`, and then use the `useQuery()` hook to execute the query.

- The `useQuery()` is a React hook. It shares the graphql data with our UI. 

- The `useQuery()` hook automatically executes our query and stores the results in an object. This object contains the `loading`, `error`, and `data` properties.

- After the data has been successfully fetched, we map through it using the JavaScript `map()` method and display it on the user interface.

Next, open the `BlogDetails.js` file and paste in the following code:

```js
//Make the necessary imports
import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client'

//Create the query
const BLOG = gql`
query GetBlog($id: ID!) {
        blog(id: $id) {
          data {
            id
            attributes {
              Title
              Body
              Author
            }
          }
        }
}
`

export default function BlogDetails() {
    //Get the id from the URL
    const { id } = useParams()

    //Pass variables to the query and execute it. Store the results in an object
    const { loading, error, data } = useQuery(BLOG, {
        variables: { id: id }
      })

    //Display messages accordingly
      if (loading) return <p>Loading...</p>
      if (error) return <p>Error :(</p>
    
      console.log(data)

  return (
    <div className='mt-2 mb-2 p-4 bg-white rounded-md'>
        <div className='text-2xl'>
            {data.blog.data.attributes.Title}
        </div>

        <div className='mt-2 mb-2'>
            {data.blog.data.attributes.Body}
        </div>

        <div className=''>
            <p className='text-purple-500'>Blog Author: {data.blog.data.attributes.Author}</p>
        </div>
    </div>
  );
}
```

**Code explanation:**

- In the above code, we use the `useParams()` hook to get the parameters from the URL.

- We then use the `useQuery()` hook to pass the `id` of the blog we want to fetch, execute the query and store the results in an object.

- After the data has been successfully fetched, we display it on the webpage.

Lastly, open the `App.js` file and paste in the code below:

```js
//Make the necessary imports
import Header from "./components/Header";
import Homepage from "./pages/Homepage";
import BlogDetails from "./pages/BlogDetails";

import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client"

import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

// initialize apollo client
const client = new ApolloClient({
  uri: 'http://localhost:1337/graphql',
  cache: new InMemoryCache()
})

function App() {
  return (
    <BrowserRouter>
      <ApolloProvider client={client}>
        <div className="w-screen bg-gray-100 h-screen overflow-y-auto">
          <div className="w-4/5 mx-auto mt-4"> 
            <Header />
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="blog/:id" element={<BlogDetails />} />
            </Routes>
          </div>
        </div>
      </ApolloProvider>
    </BrowserRouter>
  );
}

export default App;
```

**Code explanation:**

- In the above code, we initialize Apollo Client and pass a configuration object with `uri` and `cache`.

- `uri` is used to specify the URL of our GraphQL server. `cache` specifies where Apollo Client will cache query results after fetching them.

- We then wrap everything in the correct order and set up routing.

### Testing the application
To test the application, start the React app by running:

```bash
npm start
```

Make sure the Strapi backend is also running. If it is not, run it using:

```bash
npm run develop
```

Now open `localhost:3000` on the browser. You will see the following:

![All Blogs](/engineering-education/getting-started-with-react-strapi-graphql/allblogs.png)

Note that the content will be different based on what you put in your backend.

After clicking on `Read more...` the following page will be shown:

![Single Blog](/engineering-education/getting-started-with-react-strapi-graphql/singleblog.png)

This shows that the routing is working correctly.

### Conclusion
In this tutorial, we have covered how we can create a blog web app using Strapi and React. We have also discussed how we can use GraphQL to fetch the exact data that we need from the backend and style our web app with TaiwindCSS.

Feel free to build on the project and add as many features as you wish. More information about Strapi can be found in the [offcial documentation](https://docs.strapi.io/developer-docs/latest/getting-started/introduction.html).

---
Peer Review Contributions by: [Jethro Magaji](/engineering-education/authors/jethro-magaji/)