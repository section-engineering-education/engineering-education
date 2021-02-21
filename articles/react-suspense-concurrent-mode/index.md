JavaScript is a single threaded language yet most of the tasks done on the web seems to be blocking. One such task is data fetching. React is a popular JavaScript library that simplifies the data fetching patterns in JavaScript. In this article, we will discuss React suspense and concurrent mode and how they are used to fetch data. A basic understanding of the [JavaScript ES6](https://developer.mozilla.org/en-US/docs/Archive/Web/JavaScript/New_in_JavaScript/ECMAScript_2015_support_in_Mozillasyntax) is needed to follow along.


### Objectives
   
1. What is Concurrent mode in React
   
2. Introduction to Suspense component
   
3. How to use Suspense component for data fetching


### The React concurrent mode 
In a single threaded language like JavaScript, concurrency is used to structure a program by breaking it into pieces that can execute independently. React does alot of work under the hood to handle updates to the components and map them to the DOM. Concurrent Mode is a set of changes to the React rendering mechanism so as to essentially let React perform multiple renders concurrently. It can interrupt, delay, or dismiss an ongoing render and defer state updates.  This will help break the limitations of a single threaded language while making our applications stay responsive and performant.
You need to change the line `ReactDOM.render(<App />, rootNode)` to:
`ReactDOM.createRoot(rootNode).render(<App />)`

This will enable full Concurrent Mode for your application. To use Concurrent Mode effectively, we will refer to the Suspense  that React rolls out together with Concurrent Mode.

### The React Suspense
suspense allows us to show a placeholder while waiting for a code split part of the application.This feature works on anything using promises. It is an overall improvement when dealing with asynchronous data fetching in React applications.

Suspense suspends your component rendering and renders a fallback component until a condition is met. For example, it can render a loader while waiting for resources,
The future - Suspense for data fetching: your component throws a promise that is caught by Suspense, waiting for it to resolve. While waiting, Suspense renders a 
fallback component. Then your component is rendered again.


### Conclusion
Suspense and Concurrent mode is a powerful set of features. It has the benefits to our applications by prioritizing render updates and increasing the user’s performance. It's worth noting that React evolves constantly and this is still an experiemental feature in React. That means that the API may change significantly before it becomes a stable. Once stable, it will be a powerful data fetching pattern on top of other solutions that already work today. I hope you find this article useful.