---
layout: engineering-education
status: publish
published: true
url: /understanding-react-useeffect/
title: Understanding React UseEffect and Creating Custom Hooks
description: In this article we will look at what hooks are, how they work and their benefits. We will also demonstrate how useEffect can manage side effects from components.
author: zuko-obi
date: 2021-11-23T00:00:00-18:45
topics: [API]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/understanding-react-useeffect/hero.jpg
    alt: Understanding React UseEffect and creating custom Hooks Hero Image
---
React hooks are special functions that allow you to "hook into" React features without the need to create classes. They provide an alternative to writing class-based components (as hooks do not function inside classes).
<!--more-->
Operations like data fetching or manually changing the Document Object model (DOM) via React components can cause side effects or "effects" as they are known. This can affect other components within your application.

React comes with in-built hooks like `useEffect` that allow you to perform side effects from a function or component. With a single effect function, we can achieve the purposes of the React classes. This includes `componentDidMount`, `componentWillUnmount`, and `componentDidUpdate`.

### Key takeaways
By the end of this tutorial, the reader will be able to understand:
- What React hooks are and their benefits.
- The functionalities of `useEffect`.
- Rules when using `useEffect`.
- How to consume APIs with `useEffect` and process responses.
- How to use `useEffect` to "clean up" effects (or "after effects" as I call them) by returning a function.

### Prerequisites
To follow through with this article, the reader should have:
- React v16.0 or newer installed.
- An understanding of Javascript.
- A Basic knowledge of React.js.
- A suitable text editor of your choice.

### What are React hooks?
React Hooks are the best thing to happen for React devs in a long time. It makes it possible for functional programmers to create dynamic projects. 

This happens without having to write classes as class-based components need a `render() method`, have complex UI logic and are generally more complex to manage. You create a hook depending on its utility.

### What is the React UseEffect?
The useEffect hook has superpowers that enable us to design our custom hooks. When a change occurs, it allows us to perform side effects in functional components. It allows data retrieval, DOM modification, and function execution each time a component renders.

Let us explore some examples:

```javascript

import React, { useState, useEffect } from "react";

import "./Counter.css";

export const Counter = () =\&gt; {

const [count, setCount] = useState(0);

// useEffect hook used to log and display the number of times counter is updated

useEffect(() =\&gt; {

console.log("counter ran once");

}, []);

return (

\&lt;div className="modal"\&gt;

\&lt;div className="modal\_\_counter"\&gt;


\&lt;div

className="modal\_\_counter--decrease"

onClick={() =\&gt; setCount(count - 1)}

\&gt;

-

\&lt;/div\&gt;


\&lt;div className="modal\_\_counter--reset"\&gt;{count}\&lt;/div\&gt;


\&lt;div

className="modal\_\_counter--increase"

onClick={() =\&gt; setCount(count + 1)}

\&gt;

+

\&lt;/div\&gt;

\&lt;/div\&gt;

\&lt;/div\&gt;

);

};

```

The above code is a simple counter that allows the user to increase and decrease a value. 

Let us add some styling to it with the code below:

```css
.modal\_\_counter {
  display: flex;

  justify-content: space-between;

  align-items: center;

  border: 1px solid #dbdada;

  border-radius: 5px;

  width: 100%;

  max-width: 100px;

  margin-top: 0.5rem;

  overflow: hidden;
}

.modal\_\_counter--increase,
.modal\_\_counter--decrease {
  background-color: #f2f2f2;

  padding: 0 0.7rem;

  cursor: pointer;
}

.modal\_\_counter--reset {
  padding: 0 0.5rem;

  cursor: pointer;
}

.modal-body\_\_date,
.modal-body\_\_time {
  font-weight: 400;

  padding-top: 2rem;
}
```

We used the `useState` hook to update the `counter` variable in the above code. Each time we intend to change the value of `count`, we trigger the `useEffect` function. This keeps track of any changes made to the component. 

In this example, the initial loading of the page triggers the `useEffect` function.

![counter zero](/engineering-education/understanding-react-useeffect/counter-zero.png)

This is the output of the preceding code.

![counter log](/engineering-education/understanding-react-useeffect/counter-log.png)

The output above shows the value of `counter`. The initial render of the component causes the function to run.

Let us modify the code by altering the array dependence, which is currently empty, and then reflect the current status of `counter`.

```javascript

import React, { useState, useEffect } from "react";

import "./Counter.css";

export const Counter = () =\&gt; {

const [count, setCount] = useState(0);

//useEffect hook used to log and display the number of times counter is updated

useEffect(() =\&gt; {

console.log("counter ran once");

}, [count]); //current status of count is used to update component

return (

\&lt;div className="modal"\&gt;

\&lt;div className="modal\_\_counter"\&gt;

{/\* subtraction button to reduce the value of counter \*/}

\&lt;div

className="modal\_\_counter--decrease"

onClick={() =\&gt; setCount(count - 1)}

\&gt;

-

\&lt;/div\&gt;

{/\* counter value is displayed \*/}

\&lt;div className="modal\_\_counter--reset"\&gt;{count}\&lt;/div\&gt;

{/\* addition button to increase the value of counter \*/}

\&lt;div

className="modal\_\_counter--increase"

onClick={() =\&gt; setCount(count + 1)}

\&gt;

+

\&lt;/div\&gt;

\&lt;/div\&gt;

\&lt;/div\&gt;

);

};

```

Next, we increment the value of `counter` three times. This is so that whenever a user clicks the increment or decrement button, the `useEffect **` function runs and sends a result to the console.

![counter three](/engineering-education/understanding-react-useeffect/counter-three.png)

This informs us that there has been a change in our `counter` variable. It continues for as long as a change occurs on the variable.

![counter three](/Understanding-React-UseEffect/counter-three.png)

![counter log 2](/engineering-education/understanding-react-useeffect/counter-log2.png)

The counter starts counting when the page loads for the first time. It was increased three times, resulting in a total of four runs.

### Rules for using 'useEffect'
We use the `useEffect` hook to run functionalities during the lifetime of the component rather than specific user interactions or DOM events.

For example, you might wish to get a list of users as soon as the page loads. The names of the people change as the component mounts without user interaction.

It is recommended that you use `useEffect` for asynchronous operations. This helps avoid unwanted errors that could cause your UI to become unusable.

### How to consume APIs with useEffect and process responses
Now that we have some understanding of the `useEffect`, let us fetch some data with an API. We will use the [JSON placeholder](https://jsonplaceholder.typicode.com/) free API, a standard API to work with the dummy data.

```javascript

import React, { useEffect, useState } from "react";

import axios from "axios"

export const Users = () =\&gt; {

const [names, setNames] = useState([]);

//We make an asynchronous API call using the useEffect hook

useEffect(() =\&gt; {

const getAllUsers = async () =\&gt; {

//The actual API call is made within the try block

try {

const res = await

//A GET request is sent to retrieve "users"

axios.get("[https://jsonplaceholder.typicode.com/users](https://jsonplaceholder.typicode.com/users)");

//We set names using the data from the response of the API call

setNames(res.data);

} catch (err) {

console.log(err);

}

};

getAllUsers(); //component unmounts

}, []);

//List of users is then displayed

return (

\&lt;div\&gt;

\&lt;h1\&gt;\&lt;b\&gt;List of Users\&lt;/b\&gt;\&lt;/h1\&gt;

\&lt;br /\&gt;

{ names.map((name) =\&gt; (

\&lt;div key={ name.username }\&gt;

\&lt;h2\&gt;{ name.name }\&lt;/h2\&gt;

\&lt;br /\&gt;

\&lt;hr /\&gt;

\&lt;/div\&gt;

)

)}

\&lt;/div\&gt;

);

};

```

In the example above, we used `useState` and `useEffect`, which are two different hooks. We used the `useState` variable to regulate the API response, and the `useEffect` was employed for data retrieval. 

We used the `try-catch` function to regulate whether the obtained request succeeded or failed. We imported axios, which was used to make a `get **`\*\* request to the API. 

We received the result, and passed it to the `setState` to map across the available users list.

![list of users](/engineering-education/understanding-react-useeffect/list-of-users.png)

The request we used above returned the result that we can see in the image above. Before we conclude, let us take a look at the final key point.

### How to use useEffect to "clean up" effects
Here is a typical error that necessitates the employment of a cleanup function within a `useEffect`:

| Warning: Cannot perform a React state update on an unmounted component. This is a no-op, but it indicates a memory leak in your application. To fix, cancel all subscriptions and asynchronous tasks in a useEffect cleanup function. |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |

To fix the error, we can add a cleanup method to our application as shown below:

```javascript

import React, { useEffect, useState } from "react";

import axios from "axios"

export const Users = () =\&gt; {

const [names, setNames] = useState([]);

//We make an asynchronous API call using the useEffect hook

useEffect(() =\&gt; {

const getAllUsers = async () =\&gt; {

//The actual API call is made within the try block

try {

const res = await

//A GET request is sent to retrieve "users"

axios.get("[https://jsonplaceholder.typicode.com/users](https://jsonplaceholder.typicode.com/users)");

//We set names using the data from the response of the API call

setNames(res.data);

} catch (err) {

console.log(err);

}

};

getAllUsers(); //component unmounts

//clean up function is added

return () =\&gt; {

console.log("I am inside a cleanup function");

};

}, []);

//List of users is then displayed

return (

\&lt;div\&gt;

\&lt;h1\&gt;\&lt;b\&gt;List of Users\&lt;/b\&gt;\&lt;/h1\&gt;

\&lt;br /\&gt;

{ names.map((name) =\&gt; (

\&lt;div key={ name.username }\&gt;

\&lt;h2\&gt;{ name.name }\&lt;/h2\&gt;

\&lt;br /\&gt;

\&lt;hr /\&gt;

\&lt;/div\&gt;

)

)}

\&lt;/div\&gt;

);

};

```

In the code above, the cleanup function runs after the second change in the `useEffect` function. We use the cleanup to abort asynchronous actions, usually after a component updates or unmounts on the second render.

### How to create a custom hook
We can construct logic that can be reused across our applications by creating our custom hooks. It generates a lot of reusable features.

To begin, let us create a folder within our `src` directory and name it `hooks` and then we create a file called `CounterHook.jsx` within the `hooks` folder.

Add the code below to the `CounterHook.jsx` file.

```javascript

import { useState } from "react";

export const useCounter = () =\&gt; {

const [counter, setCounter] = useState(0);

const increment = () =\&gt; setCounter(counter + 1);

const decrement = () =\&gt; setCounter(counter - 1);

return { counter, increment, decrement };

};

```

We are using useState to create the same logic we used in our first `counter` app, but this time, the logic is in a reusable function.

Next, let us add this function to our `counter` application.

```javascript

import React from "react";

import "./Counter.css";

import { useCounter } from "../../hooks/CounterHook";

export const Counter = () =\&gt; {

const { counter, increment, decrement } = useCounter();

return (

\&lt;div className="modal"\&gt;

\&lt;div className="modal\_\_counter"\&gt;

\&lt;div className="modal\_\_counter--decrease" onClick={decrement}\&gt;

-

\&lt;/div\&gt;

\&lt;div className="modal\_\_counter--reset"\&gt;{counter}\&lt;/div\&gt;

\&lt;div className="modal\_\_counter--increase" onClick={increment}\&gt;

+

\&lt;/div\&gt;

\&lt;/div\&gt;

\&lt;/div\&gt;

);

};

```

Our application is not broken; in fact, it is in perfect working order! We imported the `CounterHook` component as a hook which we can also use in any other programs. The custom hook we created improves the efficiency of our application.

Depending on the context of your application, creating custom hooks should be dependent on personal preferences.

### Conclusion
We have learned what hooks are, how they work, and their benefits. We have also demonstrated how useEffect can manage side effects from components. 

Lastly, we have been able to create a custom reusable hook with simple logic. With the React `useEffect` hook, you can manage component lifecycle seamlessly without necessarily having to convert your functional based components into class based components.

Happy coding!

### References
- [Using the Effect Hook – React](https://reactjs.org/docs/hooks-effect.html)
- [Hooks API Reference – React](https://reactjs.org/docs/hooks-reference.html#useeffect)
- [The last guide to the useEffect Hook you will ever need](https://blog.logrocket.com/guide-to-react-useeffect-hook/)
- [How the useEffect Hook Works (with Examples)](https://daveceddia.com/useeffect-hook-examples/)
- [A Simple Explanation of React.useEffect()](https://dmitripavlutin.com/react-useeffect-explanation/)
- [Full React Tutorial #14 - useEffect Hook (the basics)](https://www.youtube.com/watch?v=gv9ugDJ1ynU)
- [React v16.8: The One With Hooks – React Blog](https://reactjs.org/blog/2019/02/06/react-v16.8.0.html)

---
Peer Review Contributions by: [Dawe Daniel](/engineering-education/authors/dawe-daniel/)