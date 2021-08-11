[React](https://reactjs.org/) is a powerful client-side JavaScript library. One of the complicated aspects to handle is state management. This pattern gets even more convoluted when dealing with server state. Server state is a bit different as it is asynchronous and persisted remotely. This means that we have to think about updating, caching, or re-fetching data to efficiently manage the state in our React applications. [React Query](https://react-query.tanstack.com/) is a pre-configured library that aims to solve this complexities. Using React Query, we can fetch, cache, and update data in React-based applications in a declarative and simple manner without touching any global state.

### Goal

Nowadays, almost every web app needs a remote data. Unfortunately, for developers, data fetching and handling server state in React applications is easier said than done. As developers we need to rethink about:

- What to render while waiting for the remote data to load?

- What happens if an error occurs?

- How do we keep the client data upto date with the server?

- How will this tradeoffs impact users on a slow internet?

When dealing with asynchronous data that needs frequent update, caching, and synchronization with the server, there is no better library than React-Query. In this tutorial, we will go through how React-Query library can improve user experience in our react applications. To demonstrate these concepts, we will use the [JSON Placeholder](https://jsonplaceholder.typicode.com/) as the thrid party REST API.

### Prerequisites

- For this tutorial, intermediate React kills such as React Hooks and functional components is essential.

- A basic understanding of REST APIs and data fetching in JavaScript.
  
- Make sure to have [Node.js](https://nodejs.org/en/) runtime installed on your machine.

### The React Query benefits in React applications

Some of the features that React Query provides include:

- Using Window focus refetching mechanism to refetch data depending on application tab activity.
  
- We can set amount of Request retries for any request if random errors occur.
  
- React Query performs prefetching so that the application can update stale data in the background.
  
- Handling complex application caching so that the request operation are optimized.

### Installation and Setup

First things first, let's setup a basic React application. Use the command below to create a React application in the `react-query-demo` directory:

`npx create-react-app react-query-demo`

This will create the boilerplate for React application. Next, we need to add `axios` for data fetching and `react-query`. Run the command:

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

This triggers our development server with hot reload at `http://localhost:3000`.

### Conclusion
Building front-end applications often starts out easy and turns to be complicated as we continue adding features. For every API endpoint we add, we also need to deal with state management, synchronization, caching and error handling. React Query is the library that keeps our application maintainable as the complexity grows while improving user experience.
