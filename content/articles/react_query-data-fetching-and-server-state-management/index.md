
[React](https://reactjs.org/) is a powerful client-side JavaScript library. One of the complicated aspects to handle is state management. This pattern gets even more convoluted when dealing with server state. The server state is a bit different as it is asynchronous and persisted remotely. This means that we have to think about updating, caching, or re-fetching data to efficiently manage the state in our React applications. [React Query](https://react-query.tanstack.com/) is a pre-configured library that aims to solve these complexities. Using React Query, we can fetch, cache, and update data in React-based applications in a declarative and simple manner without touching any global state.

### Goal
Nowadays, almost every web app needs remote data. Unfortunately, for developers, data fetching and handling server state in React applications is easier said than done. As developers we need to rethink about:

- What to render while waiting for the remote data to load?

- What happens if an error occurs?

- How do we keep the client data up to date with the server?

- How will these tradeoffs impact users on a slow internet?

When dealing with asynchronous data that needs a frequent update, caching, and synchronization with the server, there is no better library than React-Query. In this tutorial, we will go through how the React-Query library can improve user experience in our react applications. To demonstrate these concepts, we will use the [JSON Placeholder](https://jsonplaceholder.typicode.com/) as the third-party REST API.

### Prerequisites
- For this tutorial, intermediate React kills such as React Hooks and functional components are essential.

- A basic understanding of REST APIs and data fetching in JavaScript.
  
- Make sure to have [Node.js](https://nodejs.org/en/) runtime installed on your machine.

###  Benefits of using React Query in React applications
Some of the features that React Query provides include:

- Using Window focus prefetching mechanism to prefetch data depending on application tab activity.
  
- We can set the number of request retries for any request if random errors occur.

- React Query performs prefetching so that the application can update stale data in the background.
  
- Handling complex application caching so that the request operation is optimized.

### Installation and setup
First things first, let's set up a basic React application. Use the command below to create a React application in the `react-query-demo` directory:

```bash
npx create-react-app react-query-demo
```

This will create the boilerplate for React application. Next, we need to add `axios` for making http requests and `react-query`. Run the command:

```bash
 npm i react-query axios
 ```

 For yarn, execute:

 ```bash
 yarn add react-query axios
```

Next, use the command:

```bash
npm start
```
This triggers our development server with hot-reload at `http://localhost:3000`.

To configure React Query in a React application, we need to wrap the components with `QueryClientProvider` component above the components that need data fetching. The child components of the `QueryClientProvider` can now access the hooks provided by React Query library which provides us with a `QueryClient` instance. This is what we will use to access the hooks provided by React Query library.

To start the React Query, we will use a basic configuration in our root *`index.js`* file as:
 
```js
import React from 'react'
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();
ReactDOM.render(
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>,
    document.getElementById('root')
);
```

In the next steps, we will implement data fetching using the `useQuery`, `useMutation`, and the native React hooks.

### Data fetching using React Query
The difference between React Query and the common data fetching patterns such as `useEffect` is that React Query will first return the previously fetched data and then refetch it again. If the resource is the same as the first, React Query will keep both as a reference without forcing the page to reload which improves the application user experience.
To demonstrate these concepts, we will use a `Post` and a `Posts` component. Go ahead and create a `components` folder in the root of our `src` application folder.

To fetch data, we will include the logic in the `Posts.js` file:

First, import React, `useQuery` hook, and `axios` library:

```js
import React from 'react'
import {useQuery} from 'react-query'
import axios from 'axios'
```

We need to define an asynchronous function `fetchPosts()` that will make network requests to the JSONPlaceholder API to fetch posts.

```js

async function fetchPosts(){
    const {data} = await axios.get('https://jsonplaceholder.typicode.com/posts')    
    return data
}
```

Finally, create a React functional component:

```js

function Posts(){
    const {data, error, isError, isLoading } = useQuery('posts', fetchPosts) // first argument is a string to cache and track the query result
    if(isLoading){
        return <div>Loading...</div>
    }
    if(isError){
        return <div>Error! {error.message}</div>
    }

    return(
        <div className='container'>
        <h1>Posts</h1>
        {
            data.map((post, index) => {
                return <li key={index}>{post.title}</li>
            })
        }

        </div>
    )
}

export default Posts
```

Let's briefly dissect the above code:

- We create a React functional component named `Posts` which is exported as default. 
  
- The  `useQuery` hook returns an application status which can be `isLoading` or `isError`, data, and an error.
  
- `useQuery` hook takes two arguments where the first one is a string to cache and tracks the query result. The second argument is the function we defined to make HTTP requests, `fetchPosts`. The react-query internally handles caching and updating functionality.
- Before the return statement of the component, we execute a basic logic to check if the application is in a loading state or if an error occurs.
- Inside the JSX part, we return the posts by mapping through the posts array.

> For an awesome developer experience, react-query includes the in-built react-query-devtools, so that we can be able to view the state and the cache. To enable in your application, ` import { ReactQueryDevtools } from 'react-query/devtools'`. 
[Check more](https://react-query.tanstack.com/devtools).


### Making a Post request with `useMutation` hook.

Unlike the useQuery hook, mutations are used to perform CREATE, UPDATE, or DELETE operations as the server side-effects inside our components. For our case, we will perform a `POST` request using `useMutation`. Inside the `components` folder, create a `Post.js` file.
Inside the `Post.js` component file, import axios, React and `useMutation` hook.
```js
import React, {Fragment, useState} from 'react'
import { useMutation } from 'react-query'

import axios from 'axios'
```

Next create a `Post` functional component:

```js
export default function Post(){
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [message, setMessage] = useState('')

    const {isLoading, isError, error, mutate} = useMutation(createPost, {retry: 3})


    async function createPost() {
        const response = await axios.post('https://jsonplaceholder.typicode.com/posts')
        setMessage(response.data)
    }

    return(
        <Fragment>
            <div className="post">
            <h1>Create a Post</h1>

                <label>Title:</label>
                <input type="text" value={title} onChange={e=>setTitle(e.target.value)}/>

                <label>Description:</label>
                <input type="text" value={description} onChange={e=>setDescription(e.target.value)}/>
                <button  onClick={() => {mutate({ id: Date.now(), title, description })}} >Create</button>
                <p> Created a new Post ID: {message && message.id}</p>
                <div style={{color: 'gray', background: '#234'}}>
        {isLoading
          ? "Saving...": ""
        }
        {
            isError
            ? error.message : ""
        }
      </div>
      </div>

        </Fragment>
    )
}
```
To briefly explain the above code:
- `createPost` is a function that makes HTTP POST request using `axios` library.

- The `useMutation()` hook returns `isLoading`, `isError`, `error`, and `mutate` function that will be used to wrap the values when making requests. It takes the `createPost` as an argument along with an option `{retry:3}` object. This comes in handy when prefetching queries after mutations and ensuring optimistic updates.

- `useState()` hook is used to create and update the `title`, and description state in our input elements.

- Below the create post functionality, we use the `isLoading` and `isError` to handle the mutation state accordingly.

### Conclusion

Building front-end applications often start easy and turns to be complicated as we continue adding features. For every API endpoint we add, we also need to deal with state management, synchronization, caching, and error handling. React Query is the library that helps us manage data involved in the web service requests keeping our application maintainable as the complexity grows while improving user experience.
