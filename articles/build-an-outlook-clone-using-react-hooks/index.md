---
layout: engineering-education
status: publish
published: true
url: /engineering-education/build-an-outlook-clone-using-react-hooks/
title: Building Outlook Clone with React Hooks
description: This article helps developers get started with React by building an Outlook clone using React so that you can learn the fundamentals by getting hands-on with the code.
author: lalithnarayan-c
date: 2020-08-11T00:00:00-10:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/build-an-outlook-clone-using-react-hooks/hero.jpg
    alt: output image outlook clone example
---
Welcome to part two of the React series. In this tutorial, we will cover the same Outlook clone that we built in [part one](/engineering-education/build-an-outlook-clone-using-react), but this time we will use React Hooks. The earlier codebase was repetitive and there is a scope for optimization of the entire project. To skip the theory and get straight into coding, [click here](#code)
<!--more-->
To sum up the earlier attempt at building an Outlook clone, we made API calls and displayed emails according to the filter requested. We also implemented local storage. Let's think about this for a minute. When we implemented local storage, was it a good idea to store the entire state?

While this made sense during the last project, it does not produce the best experience for the user. Upon reloading, we can simply show the user the set of Read and Favourite e-mails and refresh the layout to the default option. This is the ideal approach to building projects. First, we build them logically step by step. Once done, we work on various optimizations in terms of performance, user experience, and code quality.

One of the drawbacks is repetitiveness. We need to define lifecycle methods for each event. This leads to ambiguous function calls and event handling. Therefore, react-class base components are not conducive for following best coding practices. DRY, an acronym that stands for Don't Repeat Yourself, is one such example for an effective coding practice.

React Hooks solves the problem of repetition, ambiguity and increases the performance. In my previous article, we were constrained to use state and other React features inside the class. We defined the class as:

```jsx
import React from 'react';

class Example extends React.Component{
    //sample component code here
}
```

The definition above declares the *Example* class, which is a child component of *React.Component* class.

Class based components have many disadvantages, like repetitiveness and ambiguity. Let us understand the shortcomings in more detail to appreciate the inclusion of functional components.

### Why Use Functional Components in React?

#### It’s hard to reuse stateful logic between components

Using class based components, the communication between parent and child components happens via props. What if a case arises, where information has to be sent to multiple children vertically? Imagine a [long skewed tree](https://www.google.com/url?sa=i&url=https%3A%2F%2Fen.wikipedia.org%2Fwiki%2FSkew_heap&psig=AOvVaw1XQb6By8Nfiuv-Oj3WXFjA&ust=1596810759593000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCIie5eXlhusCFQAAAAAdAAAAABAD).
In class-based components, it can become messy due to the layers of providers, consumers, render props, and higher-order components. Overall this is due to an underlying problem: *The inability to share stateful info to children components efficiently*. For more info about providers and consumers refer to the documentation on [ContextAPI](https://reactjs.org/docs/context.html#gatsby-focus-wrapper).

With Hooks, we can extract [stateful logic from a component](https://codersera.com/blog/hooks-getting-in-a-new-relationship/) so it can be tested independently and reused. Hooks allow us to reuse stateful logic without changing your component hierarchy.

#### Complex components become hard to understand
Usually projects start out small and in no time turn into an unmanageable mess of stateful logic and side effects. The order of the lifecycle methods is important for absolute control over the web page. However, consider the example where components might perform some data fetching in componentDidMount and componentDidUpdate. At the same time, another piece of code is present in componentDidUpdate that is setting up event listeners. The event listeners need to be set free as each event listener is actively looking out for the event decreases performance. This is done in the componentWillUnmount lifecycle method.

So many lifecycle methods, with dependency on multiple non-related pieces of code, are problematic. Usually, state management libraries like redux are used to manage the state. However, with the use of Hooks, the problem above is solved.

#### Classes are confusing, Functions enable modularity

We used a lot of the *this* keyword in JavaScript in the previous article. For beginners, learning *this* in JavaScript is quite a steep learning curve. Functional components totally eliminate the need for this, as they are function. Additionally, the [React team](https://reactjs.org/docs/hooks-intro.html) found that classes inhibited higher performance.  

Hooks solve the above-mentioned problems gracefully. Once you have learned hooks, trust me, you will love React.

### React Hooks: In Practice
We will consider some of the hooks to try and get an understanding of the underlying functionality. For a detailed explanation, refer to the [documentation](https://reactjs.org/docs/getting-started.html). We will be covering useState, useRef, useEffect, createContext and useContext. All theses hooks are imported from the React library.

1. **useState**:

useState enables one to create state variables and use it anywhere within the functional component. The syntax for useState is as shown below:

   ```jsx
    [stateName, setStateName] = useState(defaultValue)
   ```
`useState` returns a list which consists of the state variable, and a function to set the state variable. Using list destructuring in JavaScript, we can easily rename it to any names at our convenience. The defaultValue can be any of the data types that JavaScript supports.

2. **useEffect**:

A `useEffect` is used for executing certain actions to take place upon triggering of events. `useEffect` replaces the original way of declaring lifecycle methods.

- *componentDidMount*: To declare this event, we can use `useEffect` with an empty dependency list.

```jsx
   useEffect(()=>{
       //update the state on componentDidMount
   },[])
```
- *componentWillUnMount*: Once a component is unmounted, any clean-up that needs to be done can be performed by returning a function in `useEffect`.

```jsx
   useEffect(()=>{
       //update the state on componentDidMount
   return //cleanup code... for example freeing up event listeners
   },[])
```
- *dependency list*: The dependency list ensures that the `useEffect` runs only when a change occurs in the state variables mentioned in the dependency list. This way, we can modularize effects and direct it to different actions on the basis of state variables.

```jsx
   useEffect(()=>{
       //update the state on componentDidMount
   },[stateVariable1, stateVariable2])
```

The `useEffect` above will run when there is a change in `stateVariable1` or `stateVariable2`

3. **useRef**:

The `useRef` Hook is a function that returns a mutable ref object whose current property is initialized with the passed argument (`initialValue`).

   ```jsx
    const refVariable = useRef(initialValue)
   ```

It is usually used to access the DOM variables and to keep track of a mutable variable.

4. **createContext** and **useContext**:
A `createContext` is used to pass props from parent to child components. Consider the example of passing props from parent to child components presented below. Sending it via the props makes the code messy. Instead, `createContext` is used to send the props. Whenever the props are needed, we use `useContext` to get the value of the props.  We will discuss this below in the example project.

### Code
Alright, we first begin with creating a React project, using the create-react-app package. The command creates a react-project template. Open a new terminal, (**Command Prompt** on Windows or **Terminal** on Linux OS)  and execute the following commands. I have used **Command Prompt** on a **Windows10 System**

```sh
npx create-react-app outlookclonereacthooks
cd outlookclonereacthooks
npm start
```

The folder structure should look like this:

```
outlookclonereacthooks
├── README.md
├── node_modules
├── package.json
├── .gitignore
├── public
│   ├── favicon.ico
│   ├── index.html
│   ├── logo192.png
│   ├── logo512.png
│   ├── manifest.json
│   └── robots.txt
└── src
    ├── App.css
    ├── App.js
    ├── App.test.js
    ├── index.css
    ├── index.js
    ├── logo.svg
    └── serviceWorker.js
```

Let us create a folder called components in the root folder. Add the components *Email.js*, *EmailBody.js*,*SearchBox.js*,*Scroll.js*, and create directories named *styledComponents* and *css*. Add the files *ButtonStyles.js*, *EmailBody.js* and *EmailStyle.js* to styledComponents directory. Add file *EmailBody.css* to the CSS folder.

The updated directory looks like this:

```
outlookclonereacthooks
├── README.md
├── node_modules
├── package.json
├── .gitignore
├── public
│   ├── favicon.ico
│   ├── index.html
│   ├── logo192.png
│   ├── logo512.png
│   ├── manifest.json
│   └── robots.txt
└── src
    ├── components     
    │   ├── Email.js
    │   ├── EmailBody.js
    │   ├── Scroll.js
    |   ├── styledComponents
    |      ├── ButtonStyles.js
    │      ├── EmailBodyStyles.js
    │      ├── EmailStyle.js
    |   ├── css
    |      ├── EmailBody.css
    ├── App.css
    ├── App.js
    ├── App.test.js
    ├── index.css
    ├── index.js
    ├── logo.svg
    └── serviceWorker.js
```

### Setting up API on localhost
For the project, we need to make API calls to get the list of emails and email body. Lets set that up. We will be using *json-server* package.

```sh
npm install -g json-server
```

The single-line command installs the required package. -g denotes that the following package is installed globally.

Our first JSON file consists of 15 emails. We will use [My JSON Server](https://my-json-server.typicode.com/lalith1403/jsonemaillist/list), a hosted service that provides fake online REST APIs for free.

The other API of interest is fetching the email body given the email id. Online hosting services have various bottlenecks when it comes to content length. Let's use local hosting to get the data.

The email body JSON file is as follows. Paste the following code into a file called *db.json*. *db.json* is a naming convention used, and you will find the above name in most of the codebases on GitHub.

``` json
{
  "emailbody": [
    {
      "id": "1",
      "body": "<div><p>Nulla at euismod erat. Donec fermentum dui ut scelerisque rhoncus. Aliquam erat volutpat. Nunc ut tortor sit amet lectus gravida dictum. Morbi eget ultricies eros, nec mollis arcu. Quisque nunc massa, gravida quis sem et, dignissim ultrices nulla. Quisque non venenatis dui, nec volutpat magna. Vivamus porttitor, arcu sed euismod faucibus, mauris lacus interdum orci, et ultrices augue leo id lorem. Ut lectus leo, finibus quis urna vitae, auctor mollis nulla. Aliquam auctor nulla tristique lectus placerat, ac commodo ex egestas. Ut venenatis, eros eu tristique maximus, libero nisi fermentum mi, at sollicitudin quam lorem in felis.</p><p>Integer lacinia, ante ut mattis tincidunt, quam augue laoreet elit, vitae consequat arcu lacus ac magna. Nunc euismod in magna eget molestie. Phasellus lacinia in sapien id ultricies. Nulla ac rhoncus nulla. Donec pellentesque tortor iaculis dolor mollis laoreet. Nunc magna orci, suscipit ut nunc fringilla, imperdiet tempus libero. Mauris sed nunc mattis urna tempor tempor vitae eget lorem. Sed pellentesque, tellus vel sagittis dignissim, ipsum erat tempor turpis, id tristique augue mi tincidunt nunc. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut nec ipsum quis nibh scelerisque pretium vitae ac turpis. Cras porta vestibulum lorem sit amet lacinia. Phasellus accumsan est sagittis, scelerisque ligula at, porta arcu. Vestibulum metus justo, tempus eget feugiat id, iaculis tincidunt elit.</p><p>Aliquam diam mauris, porttitor non commodo at, viverra id dui. Proin finibus a nulla id posuere. Donec ultricies cursus metus, at egestas tortor dignissim eu. Aliquam a massa eu erat gravida ultrices. Vivamus venenatis imperdiet purus, at egestas enim elementum quis. Nunc ultricies sapien sapien, gravida porttitor diam porta non. Fusce pretium sodales erat. Donec interdum ipsum odio, sit amet luctus est pharetra non. Mauris euismod neque eu malesuada scelerisque. In ultricies lectus eu libero accumsan, ultricies commodo nibh consequat. Pellentesque condimentum, neque id sollicitudin egestas, risus est lobortis diam, in faucibus sapien tortor eu felis. Cras a turpis aliquam, tristique eros at, ullamcorper tellus. Maecenas at tortor magna.</p></div>"
    },
    {
      "id": "2",
      "body": "<div><p>Aliquam diam mauris, porttitor non commodo at, viverra id dui. Proin finibus a nulla id posuere. Donec ultricies cursus metus, at egestas tortor dignissim eu. Aliquam a massa eu erat gravida ultrices. Vivamus venenatis imperdiet purus, at egestas enim elementum quis. Nunc ultricies sapien sapien, gravida porttitor diam porta non. Fusce pretium sodales erat. Donec interdum ipsum odio, sit amet luctus est pharetra non. Mauris euismod neque eu malesuada scelerisque. In ultricies lectus eu libero accumsan, ultricies commodo nibh consequat. Pellentesque condimentum, neque id sollicitudin egestas, risus est lobortis diam, in faucibus sapien tortor eu felis. Cras a turpis aliquam, tristique eros at, ullamcorper tellus. Maecenas at tortor magna.</p><p>Phasellus eu purus hendrerit, blandit ante ut, rhoncus neque. Nullam mattis non velit nec bibendum. Morbi commodo enim nec semper ultrices. Pellentesque sit amet vestibulum leo. Pellentesque blandit diam in placerat viverra. Phasellus posuere velit mauris, et auctor lectus scelerisque eu. Cras turpis lorem, gravida quis congue id, tristique non lorem. Proin sit amet eros sit amet ligula vehicula faucibus nec quis ipsum. Nullam semper urna sit amet justo iaculis porta. Nullam commodo libero pulvinar, faucibus dui in, viverra ante. Duis vel leo neque.</p><p>Quisque rhoncus dignissim tincidunt. Duis ornare enim pretium imperdiet iaculis. Fusce finibus turpis non lacus convallis vehicula. Quisque et porta orci. Quisque sed erat at diam feugiat viverra. Vestibulum dignissim velit interdum nibh consectetur venenatis. Sed sodales blandit facilisis. Duis elementum, justo at vehicula tempor, libero quam malesuada magna, et fermentum arcu diam vel elit. Pellentesque sollicitudin egestas varius. Vestibulum efficitur tortor eu dolor mollis fringilla. Aliquam tincidunt ornare leo. Pellentesque malesuada urna magna, sed imperdiet leo vehicula eu. In a odio sit amet magna lobortis aliquet a ac est.</p></div>"
    },
    {
      "id": "3",
      "body": "<div><p>Integer lacinia, ante ut mattis tincidunt, quam augue laoreet elit, vitae consequat arcu lacus ac magna. Nunc euismod in magna eget molestie. Phasellus lacinia in sapien id ultricies. Nulla ac rhoncus nulla. Donec pellentesque tortor iaculis dolor mollis laoreet. Nunc magna orci, suscipit ut nunc fringilla, imperdiet tempus libero. Mauris sed nunc mattis urna tempor tempor vitae eget lorem. Sed pellentesque, tellus vel sagittis dignissim, ipsum erat tempor turpis, id tristique augue mi tincidunt nunc. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut nec ipsum quis nibh scelerisque pretium vitae ac turpis. Cras porta vestibulum lorem sit amet lacinia. Phasellus accumsan est sagittis, scelerisque ligula at, porta arcu. Vestibulum metus justo, tempus eget feugiat id, iaculis tincidunt elit.</p><p>Aliquam diam mauris, porttitor non commodo at, viverra id dui. Proin finibus a nulla id posuere. Donec ultricies cursus metus, at egestas tortor dignissim eu. Aliquam a massa eu erat gravida ultrices. Vivamus venenatis imperdiet purus, at egestas enim elementum quis. Nunc ultricies sapien sapien, gravida porttitor diam porta non. Fusce pretium sodales erat. Donec interdum ipsum odio, sit amet luctus est pharetra non. Mauris euismod neque eu malesuada scelerisque. In ultricies lectus eu libero accumsan, ultricies commodo nibh consequat. Pellentesque condimentum, neque id sollicitudin egestas, risus est lobortis diam, in faucibus sapien tortor eu felis. Cras a turpis aliquam, tristique eros at, ullamcorper tellus. Maecenas at tortor magna.</p><p>Phasellus eu purus hendrerit, blandit ante ut, rhoncus neque. Nullam mattis non velit nec bibendum. Morbi commodo enim nec semper ultrices. Pellentesque sit amet vestibulum leo. Pellentesque blandit diam in placerat viverra. Phasellus posuere velit mauris, et auctor lectus scelerisque eu. Cras turpis lorem, gravida quis congue id, tristique non lorem. Proin sit amet eros sit amet ligula vehicula faucibus nec quis ipsum. Nullam semper urna sit amet justo iaculis porta. Nullam commodo libero pulvinar, faucibus dui in, viverra ante. Duis vel leo neque.</p><p>Quisque rhoncus dignissim tincidunt. Duis ornare enim pretium imperdiet iaculis. Fusce finibus turpis non lacus convallis vehicula. Quisque et porta orci. Quisque sed erat at diam feugiat viverra. Vestibulum dignissim velit interdum nibh consectetur venenatis. Sed sodales blandit facilisis. Duis elementum, justo at vehicula tempor, libero quam malesuada magna, et fermentum arcu diam vel elit. Pellentesque sollicitudin egestas varius. Vestibulum efficitur tortor eu dolor mollis fringilla. Aliquam tincidunt ornare leo. Pellentesque malesuada urna magna, sed imperdiet leo vehicula eu. In a odio sit amet magna lobortis aliquet a ac est.</p></div>"
    },
    {
      "id": "4",
      "body": "<div><p>Nulla at euismod erat. Donec fermentum dui ut scelerisque rhoncus. Aliquam erat volutpat. Nunc ut tortor sit amet lectus gravida dictum. Morbi eget ultricies eros, nec mollis arcu. Quisque nunc massa, gravida quis sem et, dignissim ultrices nulla. Quisque non venenatis dui, nec volutpat magna. Vivamus porttitor, arcu sed euismod faucibus, mauris lacus interdum orci, et ultrices augue leo id lorem. Ut lectus leo, finibus quis urna vitae, auctor mollis nulla. Aliquam auctor nulla tristique lectus placerat, ac commodo ex egestas. Ut venenatis, eros eu tristique maximus, libero nisi fermentum mi, at sollicitudin quam lorem in felis.</p><p>Aliquam diam mauris, porttitor non commodo at, viverra id dui. Proin finibus a nulla id posuere. Donec ultricies cursus metus, at egestas tortor dignissim eu. Aliquam a massa eu erat gravida ultrices. Vivamus venenatis imperdiet purus, at egestas enim elementum quis. Nunc ultricies sapien sapien, gravida porttitor diam porta non. Fusce pretium sodales erat. Donec interdum ipsum odio, sit amet luctus est pharetra non. Mauris euismod neque eu malesuada scelerisque. In ultricies lectus eu libero accumsan, ultricies commodo nibh consequat. Pellentesque condimentum, neque id sollicitudin egestas, risus est lobortis diam, in faucibus sapien tortor eu felis. Cras a turpis aliquam, tristique eros at, ullamcorper tellus. Maecenas at tortor magna.</p><p>Phasellus eu purus hendrerit, blandit ante ut, rhoncus neque. Nullam mattis non velit nec bibendum. Morbi commodo enim nec semper ultrices. Pellentesque sit amet vestibulum leo. Pellentesque blandit diam in placerat viverra. Phasellus posuere velit mauris, et auctor lectus scelerisque eu. Cras turpis lorem, gravida quis congue id, tristique non lorem. Proin sit amet eros sit amet ligula vehicula faucibus nec quis ipsum. Nullam semper urna sit amet justo iaculis porta. Nullam commodo libero pulvinar, faucibus dui in, viverra ante. Duis vel leo neque.</p><p>Quisque rhoncus dignissim tincidunt. Duis ornare enim pretium imperdiet iaculis. Fusce finibus turpis non lacus convallis vehicula. Quisque et porta orci. Quisque sed erat at diam feugiat viverra. Vestibulum dignissim velit interdum nibh consectetur venenatis. Sed sodales blandit facilisis. Duis elementum, justo at vehicula tempor, libero quam malesuada magna, et fermentum arcu diam vel elit. Pellentesque sollicitudin egestas varius. Vestibulum efficitur tortor eu dolor mollis fringilla. Aliquam tincidunt ornare leo. Pellentesque malesuada urna magna, sed imperdiet leo vehicula eu. In a odio sit amet magna lobortis aliquet a ac est.</p></div>"
    },
    {
      "id": "5",
      "body": "<div><p>Nulla at euismod erat. Donec fermentum dui ut scelerisque rhoncus. Aliquam erat volutpat. Nunc ut tortor sit amet lectus gravida dictum. Morbi eget ultricies eros, nec mollis arcu. Quisque nunc massa, gravida quis sem et, dignissim ultrices nulla. Quisque non venenatis dui, nec volutpat magna. Vivamus porttitor, arcu sed euismod faucibus, mauris lacus interdum orci, et ultrices augue leo id lorem. Ut lectus leo, finibus quis urna vitae, auctor mollis nulla. Aliquam auctor nulla tristique lectus placerat, ac commodo ex egestas. Ut venenatis, eros eu tristique maximus, libero nisi fermentum mi, at sollicitudin quam lorem in felis.</p><p>Integer lacinia, ante ut mattis tincidunt, quam augue laoreet elit, vitae consequat arcu lacus ac magna. Nunc euismod in magna eget molestie. Phasellus lacinia in sapien id ultricies. Nulla ac rhoncus nulla. Donec pellentesque tortor iaculis dolor mollis laoreet. Nunc magna orci, suscipit ut nunc fringilla, imperdiet tempus libero. Mauris sed nunc mattis urna tempor tempor vitae eget lorem. Sed pellentesque, tellus vel sagittis dignissim, ipsum erat tempor turpis, id tristique augue mi tincidunt nunc. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut nec ipsum quis nibh scelerisque pretium vitae ac turpis. Cras porta vestibulum lorem sit amet lacinia. Phasellus accumsan est sagittis, scelerisque ligula at, porta arcu. Vestibulum metus justo, tempus eget feugiat id, iaculis tincidunt elit.</p><p>Phasellus eu purus hendrerit, blandit ante ut, rhoncus neque. Nullam mattis non velit nec bibendum. Morbi commodo enim nec semper ultrices. Pellentesque sit amet vestibulum leo. Pellentesque blandit diam in placerat viverra. Phasellus posuere velit mauris, et auctor lectus scelerisque eu. Cras turpis lorem, gravida quis congue id, tristique non lorem. Proin sit amet eros sit amet ligula vehicula faucibus nec quis ipsum. Nullam semper urna sit amet justo iaculis porta. Nullam commodo libero pulvinar, faucibus dui in, viverra ante. Duis vel leo neque.</p><p>Quisque rhoncus dignissim tincidunt. Duis ornare enim pretium imperdiet iaculis. Fusce finibus turpis non lacus convallis vehicula. Quisque et porta orci. Quisque sed erat at diam feugiat viverra. Vestibulum dignissim velit interdum nibh consectetur venenatis. Sed sodales blandit facilisis. Duis elementum, justo at vehicula tempor, libero quam malesuada magna, et fermentum arcu diam vel elit. Pellentesque sollicitudin egestas varius. Vestibulum efficitur tortor eu dolor mollis fringilla. Aliquam tincidunt ornare leo. Pellentesque malesuada urna magna, sed imperdiet leo vehicula eu. In a odio sit amet magna lobortis aliquet a ac est.</p></div>"
    },
    {
      "id": "6",
      "body": "<div><p>Nulla at euismod erat. Donec fermentum dui ut scelerisque rhoncus. Aliquam erat volutpat. Nunc ut tortor sit amet lectus gravida dictum. Morbi eget ultricies eros, nec mollis arcu. Quisque nunc massa, gravida quis sem et, dignissim ultrices nulla. Quisque non venenatis dui, nec volutpat magna. Vivamus porttitor, arcu sed euismod faucibus, mauris lacus interdum orci, et ultrices augue leo id lorem. Ut lectus leo, finibus quis urna vitae, auctor mollis nulla. Aliquam auctor nulla tristique lectus placerat, ac commodo ex egestas. Ut venenatis, eros eu tristique maximus, libero nisi fermentum mi, at sollicitudin quam lorem in felis.</p><p>Integer lacinia, ante ut mattis tincidunt, quam augue laoreet elit, vitae consequat arcu lacus ac magna. Nunc euismod in magna eget molestie. Phasellus lacinia in sapien id ultricies. Nulla ac rhoncus nulla. Donec pellentesque tortor iaculis dolor mollis laoreet. Nunc magna orci, suscipit ut nunc fringilla, imperdiet tempus libero. Mauris sed nunc mattis urna tempor tempor vitae eget lorem. Sed pellentesque, tellus vel sagittis dignissim, ipsum erat tempor turpis, id tristique augue mi tincidunt nunc. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut nec ipsum quis nibh scelerisque pretium vitae ac turpis. Cras porta vestibulum lorem sit amet lacinia. Phasellus accumsan est sagittis, scelerisque ligula at, porta arcu. Vestibulum metus justo, tempus eget feugiat id, iaculis tincidunt elit.</p><p>Aliquam diam mauris, porttitor non commodo at, viverra id dui. Proin finibus a nulla id posuere. Donec ultricies cursus metus, at egestas tortor dignissim eu. Aliquam a massa eu erat gravida ultrices. Vivamus venenatis imperdiet purus, at egestas enim elementum quis. Nunc ultricies sapien sapien, gravida porttitor diam porta non. Fusce pretium sodales erat. Donec interdum ipsum odio, sit amet luctus est pharetra non. Mauris euismod neque eu malesuada scelerisque. In ultricies lectus eu libero accumsan, ultricies commodo nibh consequat. Pellentesque condimentum, neque id sollicitudin egestas, risus est lobortis diam, in faucibus sapien tortor eu felis. Cras a turpis aliquam, tristique eros at, ullamcorper tellus. Maecenas at tortor magna.</p><p>Phasellus eu purus hendrerit, blandit ante ut, rhoncus neque. Nullam mattis non velit nec bibendum. Morbi commodo enim nec semper ultrices. Pellentesque sit amet vestibulum leo. Pellentesque blandit diam in placerat viverra. Phasellus posuere velit mauris, et auctor lectus scelerisque eu. Cras turpis lorem, gravida quis congue id, tristique non lorem. Proin sit amet eros sit amet ligula vehicula faucibus nec quis ipsum. Nullam semper urna sit amet justo iaculis porta. Nullam commodo libero pulvinar, faucibus dui in, viverra ante. Duis vel leo neque.</p></div>"
    },
    {
      "id": "7",
      "body": "<div><p>Nulla at euismod erat. Donec fermentum dui ut scelerisque rhoncus. Aliquam erat volutpat. Nunc ut tortor sit amet lectus gravida dictum. Morbi eget ultricies eros, nec mollis arcu. Quisque nunc massa, gravida quis sem et, dignissim ultrices nulla. Quisque non venenatis dui, nec volutpat magna. Vivamus porttitor, arcu sed euismod faucibus, mauris lacus interdum orci, et ultrices augue leo id lorem. Ut lectus leo, finibus quis urna vitae, auctor mollis nulla. Aliquam auctor nulla tristique lectus placerat, ac commodo ex egestas. Ut venenatis, eros eu tristique maximus, libero nisi fermentum mi, at sollicitudin quam lorem in felis.</p><p>Integer lacinia, ante ut mattis tincidunt, quam augue laoreet elit, vitae consequat arcu lacus ac magna. Nunc euismod in magna eget molestie. Phasellus lacinia in sapien id ultricies. Nulla ac rhoncus nulla. Donec pellentesque tortor iaculis dolor mollis laoreet. Nunc magna orci, suscipit ut nunc fringilla, imperdiet tempus libero. Mauris sed nunc mattis urna tempor tempor vitae eget lorem. Sed pellentesque, tellus vel sagittis dignissim, ipsum erat tempor turpis, id tristique augue mi tincidunt nunc. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut nec ipsum quis nibh scelerisque pretium vitae ac turpis. Cras porta vestibulum lorem sit amet lacinia. Phasellus accumsan est sagittis, scelerisque ligula at, porta arcu. Vestibulum metus justo, tempus eget feugiat id, iaculis tincidunt elit.</p><p>Aliquam diam mauris, porttitor non commodo at, viverra id dui. Proin finibus a nulla id posuere. Donec ultricies cursus metus, at egestas tortor dignissim eu. Aliquam a massa eu erat gravida ultrices. Vivamus venenatis imperdiet purus, at egestas enim elementum quis. Nunc ultricies sapien sapien, gravida porttitor diam porta non. Fusce pretium sodales erat. Donec interdum ipsum odio, sit amet luctus est pharetra non. Mauris euismod neque eu malesuada scelerisque. In ultricies lectus eu libero accumsan, ultricies commodo nibh consequat. Pellentesque condimentum, neque id sollicitudin egestas, risus est lobortis diam, in faucibus sapien tortor eu felis. Cras a turpis aliquam, tristique eros at, ullamcorper tellus. Maecenas at tortor magna.</p></div>"
    },
    {
      "id": "8",
      "body": "<div><p>Aliquam diam mauris, porttitor non commodo at, viverra id dui. Proin finibus a nulla id posuere. Donec ultricies cursus metus, at egestas tortor dignissim eu. Aliquam a massa eu erat gravida ultrices. Vivamus venenatis imperdiet purus, at egestas enim elementum quis. Nunc ultricies sapien sapien, gravida porttitor diam porta non. Fusce pretium sodales erat. Donec interdum ipsum odio, sit amet luctus est pharetra non. Mauris euismod neque eu malesuada scelerisque. In ultricies lectus eu libero accumsan, ultricies commodo nibh consequat. Pellentesque condimentum, neque id sollicitudin egestas, risus est lobortis diam, in faucibus sapien tortor eu felis. Cras a turpis aliquam, tristique eros at, ullamcorper tellus. Maecenas at tortor magna.</p><p>Phasellus eu purus hendrerit, blandit ante ut, rhoncus neque. Nullam mattis non velit nec bibendum. Morbi commodo enim nec semper ultrices. Pellentesque sit amet vestibulum leo. Pellentesque blandit diam in placerat viverra. Phasellus posuere velit mauris, et auctor lectus scelerisque eu. Cras turpis lorem, gravida quis congue id, tristique non lorem. Proin sit amet eros sit amet ligula vehicula faucibus nec quis ipsum. Nullam semper urna sit amet justo iaculis porta. Nullam commodo libero pulvinar, faucibus dui in, viverra ante. Duis vel leo neque.</p><p>Quisque rhoncus dignissim tincidunt. Duis ornare enim pretium imperdiet iaculis. Fusce finibus turpis non lacus convallis vehicula. Quisque et porta orci. Quisque sed erat at diam feugiat viverra. Vestibulum dignissim velit interdum nibh consectetur venenatis. Sed sodales blandit facilisis. Duis elementum, justo at vehicula tempor, libero quam malesuada magna, et fermentum arcu diam vel elit. Pellentesque sollicitudin egestas varius. Vestibulum efficitur tortor eu dolor mollis fringilla. Aliquam tincidunt ornare leo. Pellentesque malesuada urna magna, sed imperdiet leo vehicula eu. In a odio sit amet magna lobortis aliquet a ac est.</p></div>"
    },
    {
      "id": "9",
      "body": "<div><p>Integer lacinia, ante ut mattis tincidunt, quam augue laoreet elit, vitae consequat arcu lacus ac magna. Nunc euismod in magna eget molestie. Phasellus lacinia in sapien id ultricies. Nulla ac rhoncus nulla. Donec pellentesque tortor iaculis dolor mollis laoreet. Nunc magna orci, suscipit ut nunc fringilla, imperdiet tempus libero. Mauris sed nunc mattis urna tempor tempor vitae eget lorem. Sed pellentesque, tellus vel sagittis dignissim, ipsum erat tempor turpis, id tristique augue mi tincidunt nunc. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut nec ipsum quis nibh scelerisque pretium vitae ac turpis. Cras porta vestibulum lorem sit amet lacinia. Phasellus accumsan est sagittis, scelerisque ligula at, porta arcu. Vestibulum metus justo, tempus eget feugiat id, iaculis tincidunt elit.</p><p>Aliquam diam mauris, porttitor non commodo at, viverra id dui. Proin finibus a nulla id posuere. Donec ultricies cursus metus, at egestas tortor dignissim eu. Aliquam a massa eu erat gravida ultrices. Vivamus venenatis imperdiet purus, at egestas enim elementum quis. Nunc ultricies sapien sapien, gravida porttitor diam porta non. Fusce pretium sodales erat. Donec interdum ipsum odio, sit amet luctus est pharetra non. Mauris euismod neque eu malesuada scelerisque. In ultricies lectus eu libero accumsan, ultricies commodo nibh consequat. Pellentesque condimentum, neque id sollicitudin egestas, risus est lobortis diam, in faucibus sapien tortor eu felis. Cras a turpis aliquam, tristique eros at, ullamcorper tellus. Maecenas at tortor magna.</p><p>Phasellus eu purus hendrerit, blandit ante ut, rhoncus neque. Nullam mattis non velit nec bibendum. Morbi commodo enim nec semper ultrices. Pellentesque sit amet vestibulum leo. Pellentesque blandit diam in placerat viverra. Phasellus posuere velit mauris, et auctor lectus scelerisque eu. Cras turpis lorem, gravida quis congue id, tristique non lorem. Proin sit amet eros sit amet ligula vehicula faucibus nec quis ipsum. Nullam semper urna sit amet justo iaculis porta. Nullam commodo libero pulvinar, faucibus dui in, viverra ante. Duis vel leo neque.</p><p>Quisque rhoncus dignissim tincidunt. Duis ornare enim pretium imperdiet iaculis. Fusce finibus turpis non lacus convallis vehicula. Quisque et porta orci. Quisque sed erat at diam feugiat viverra. Vestibulum dignissim velit interdum nibh consectetur venenatis. Sed sodales blandit facilisis. Duis elementum, justo at vehicula tempor, libero quam malesuada magna, et fermentum arcu diam vel elit. Pellentesque sollicitudin egestas varius. Vestibulum efficitur tortor eu dolor mollis fringilla. Aliquam tincidunt ornare leo. Pellentesque malesuada urna magna, sed imperdiet leo vehicula eu. In a odio sit amet magna lobortis aliquet a ac est.</p></div>"
    },
    {
      "id": "10",
      "body": "<div><p>Nulla at euismod erat. Donec fermentum dui ut scelerisque rhoncus. Aliquam erat volutpat. Nunc ut tortor sit amet lectus gravida dictum. Morbi eget ultricies eros, nec mollis arcu. Quisque nunc massa, gravida quis sem et, dignissim ultrices nulla. Quisque non venenatis dui, nec volutpat magna. Vivamus porttitor, arcu sed euismod faucibus, mauris lacus interdum orci, et ultrices augue leo id lorem. Ut lectus leo, finibus quis urna vitae, auctor mollis nulla. Aliquam auctor nulla tristique lectus placerat, ac commodo ex egestas. Ut venenatis, eros eu tristique maximus, libero nisi fermentum mi, at sollicitudin quam lorem in felis.</p><p>Aliquam diam mauris, porttitor non commodo at, viverra id dui. Proin finibus a nulla id posuere. Donec ultricies cursus metus, at egestas tortor dignissim eu. Aliquam a massa eu erat gravida ultrices. Vivamus venenatis imperdiet purus, at egestas enim elementum quis. Nunc ultricies sapien sapien, gravida porttitor diam porta non. Fusce pretium sodales erat. Donec interdum ipsum odio, sit amet luctus est pharetra non. Mauris euismod neque eu malesuada scelerisque. In ultricies lectus eu libero accumsan, ultricies commodo nibh consequat. Pellentesque condimentum, neque id sollicitudin egestas, risus est lobortis diam, in faucibus sapien tortor eu felis. Cras a turpis aliquam, tristique eros at, ullamcorper tellus. Maecenas at tortor magna.</p><p>Phasellus eu purus hendrerit, blandit ante ut, rhoncus neque. Nullam mattis non velit nec bibendum. Morbi commodo enim nec semper ultrices. Pellentesque sit amet vestibulum leo. Pellentesque blandit diam in placerat viverra. Phasellus posuere velit mauris, et auctor lectus scelerisque eu. Cras turpis lorem, gravida quis congue id, tristique non lorem. Proin sit amet eros sit amet ligula vehicula faucibus nec quis ipsum. Nullam semper urna sit amet justo iaculis porta. Nullam commodo libero pulvinar, faucibus dui in, viverra ante. Duis vel leo neque.</p><p>Quisque rhoncus dignissim tincidunt. Duis ornare enim pretium imperdiet iaculis. Fusce finibus turpis non lacus convallis vehicula. Quisque et porta orci. Quisque sed erat at diam feugiat viverra. Vestibulum dignissim velit interdum nibh consectetur venenatis. Sed sodales blandit facilisis. Duis elementum, justo at vehicula tempor, libero quam malesuada magna, et fermentum arcu diam vel elit. Pellentesque sollicitudin egestas varius. Vestibulum efficitur tortor eu dolor mollis fringilla. Aliquam tincidunt ornare leo. Pellentesque malesuada urna magna, sed imperdiet leo vehicula eu. In a odio sit amet magna lobortis aliquet a ac est.</p></div>"
    },
    {
      "id": "11",
      "body": "<div><p>Nulla at euismod erat. Donec fermentum dui ut scelerisque rhoncus. Aliquam erat volutpat. Nunc ut tortor sit amet lectus gravida dictum. Morbi eget ultricies eros, nec mollis arcu. Quisque nunc massa, gravida quis sem et, dignissim ultrices nulla. Quisque non venenatis dui, nec volutpat magna. Vivamus porttitor, arcu sed euismod faucibus, mauris lacus interdum orci, et ultrices augue leo id lorem. Ut lectus leo, finibus quis urna vitae, auctor mollis nulla. Aliquam auctor nulla tristique lectus placerat, ac commodo ex egestas. Ut venenatis, eros eu tristique maximus, libero nisi fermentum mi, at sollicitudin quam lorem in felis.</p><p>Integer lacinia, ante ut mattis tincidunt, quam augue laoreet elit, vitae consequat arcu lacus ac magna. Nunc euismod in magna eget molestie. Phasellus lacinia in sapien id ultricies. Nulla ac rhoncus nulla. Donec pellentesque tortor iaculis dolor mollis laoreet. Nunc magna orci, suscipit ut nunc fringilla, imperdiet tempus libero. Mauris sed nunc mattis urna tempor tempor vitae eget lorem. Sed pellentesque, tellus vel sagittis dignissim, ipsum erat tempor turpis, id tristique augue mi tincidunt nunc. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut nec ipsum quis nibh scelerisque pretium vitae ac turpis. Cras porta vestibulum lorem sit amet lacinia. Phasellus accumsan est sagittis, scelerisque ligula at, porta arcu. Vestibulum metus justo, tempus eget feugiat id, iaculis tincidunt elit.</p><p>Phasellus eu purus hendrerit, blandit ante ut, rhoncus neque. Nullam mattis non velit nec bibendum. Morbi commodo enim nec semper ultrices. Pellentesque sit amet vestibulum leo. Pellentesque blandit diam in placerat viverra. Phasellus posuere velit mauris, et auctor lectus scelerisque eu. Cras turpis lorem, gravida quis congue id, tristique non lorem. Proin sit amet eros sit amet ligula vehicula faucibus nec quis ipsum. Nullam semper urna sit amet justo iaculis porta. Nullam commodo libero pulvinar, faucibus dui in, viverra ante. Duis vel leo neque.</p><p>Quisque rhoncus dignissim tincidunt. Duis ornare enim pretium imperdiet iaculis. Fusce finibus turpis non lacus convallis vehicula. Quisque et porta orci. Quisque sed erat at diam feugiat viverra. Vestibulum dignissim velit interdum nibh consectetur venenatis. Sed sodales blandit facilisis. Duis elementum, justo at vehicula tempor, libero quam malesuada magna, et fermentum arcu diam vel elit. Pellentesque sollicitudin egestas varius. Vestibulum efficitur tortor eu dolor mollis fringilla. Aliquam tincidunt ornare leo. Pellentesque malesuada urna magna, sed imperdiet leo vehicula eu. In a odio sit amet magna lobortis aliquet a ac est.</p></div>"
    },
    {
      "id": "12",
      "body": "<div><p>Nulla at euismod erat. Donec fermentum dui ut scelerisque rhoncus. Aliquam erat volutpat. Nunc ut tortor sit amet lectus gravida dictum. Morbi eget ultricies eros, nec mollis arcu. Quisque nunc massa, gravida quis sem et, dignissim ultrices nulla. Quisque non venenatis dui, nec volutpat magna. Vivamus porttitor, arcu sed euismod faucibus, mauris lacus interdum orci, et ultrices augue leo id lorem. Ut lectus leo, finibus quis urna vitae, auctor mollis nulla. Aliquam auctor nulla tristique lectus placerat, ac commodo ex egestas. Ut venenatis, eros eu tristique maximus, libero nisi fermentum mi, at sollicitudin quam lorem in felis.</p><p>Integer lacinia, ante ut mattis tincidunt, quam augue laoreet elit, vitae consequat arcu lacus ac magna. Nunc euismod in magna eget molestie. Phasellus lacinia in sapien id ultricies. Nulla ac rhoncus nulla. Donec pellentesque tortor iaculis dolor mollis laoreet. Nunc magna orci, suscipit ut nunc fringilla, imperdiet tempus libero. Mauris sed nunc mattis urna tempor tempor vitae eget lorem. Sed pellentesque, tellus vel sagittis dignissim, ipsum erat tempor turpis, id tristique augue mi tincidunt nunc. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut nec ipsum quis nibh scelerisque pretium vitae ac turpis. Cras porta vestibulum lorem sit amet lacinia. Phasellus accumsan est sagittis, scelerisque ligula at, porta arcu. Vestibulum metus justo, tempus eget feugiat id, iaculis tincidunt elit.</p><p>Aliquam diam mauris, porttitor non commodo at, viverra id dui. Proin finibus a nulla id posuere. Donec ultricies cursus metus, at egestas tortor dignissim eu. Aliquam a massa eu erat gravida ultrices. Vivamus venenatis imperdiet purus, at egestas enim elementum quis. Nunc ultricies sapien sapien, gravida porttitor diam porta non. Fusce pretium sodales erat. Donec interdum ipsum odio, sit amet luctus est pharetra non. Mauris euismod neque eu malesuada scelerisque. In ultricies lectus eu libero accumsan, ultricies commodo nibh consequat. Pellentesque condimentum, neque id sollicitudin egestas, risus est lobortis diam, in faucibus sapien tortor eu felis. Cras a turpis aliquam, tristique eros at, ullamcorper tellus. Maecenas at tortor magna.</p><p>Phasellus eu purus hendrerit, blandit ante ut, rhoncus neque. Nullam mattis non velit nec bibendum. Morbi commodo enim nec semper ultrices. Pellentesque sit amet vestibulum leo. Pellentesque blandit diam in placerat viverra. Phasellus posuere velit mauris, et auctor lectus scelerisque eu. Cras turpis lorem, gravida quis congue id, tristique non lorem. Proin sit amet eros sit amet ligula vehicula faucibus nec quis ipsum. Nullam semper urna sit amet justo iaculis porta. Nullam commodo libero pulvinar, faucibus dui in, viverra ante. Duis vel leo neque.</p></div>"
    },
    {
      "id": "13",
      "body": "<div><p>Nulla at euismod erat. Donec fermentum dui ut scelerisque rhoncus. Aliquam erat volutpat. Nunc ut tortor sit amet lectus gravida dictum. Morbi eget ultricies eros, nec mollis arcu. Quisque nunc massa, gravida quis sem et, dignissim ultrices nulla. Quisque non venenatis dui, nec volutpat magna. Vivamus porttitor, arcu sed euismod faucibus, mauris lacus interdum orci, et ultrices augue leo id lorem. Ut lectus leo, finibus quis urna vitae, auctor mollis nulla. Aliquam auctor nulla tristique lectus placerat, ac commodo ex egestas. Ut venenatis, eros eu tristique maximus, libero nisi fermentum mi, at sollicitudin quam lorem in felis.</p><p>Integer lacinia, ante ut mattis tincidunt, quam augue laoreet elit, vitae consequat arcu lacus ac magna. Nunc euismod in magna eget molestie. Phasellus lacinia in sapien id ultricies. Nulla ac rhoncus nulla. Donec pellentesque tortor iaculis dolor mollis laoreet. Nunc magna orci, suscipit ut nunc fringilla, imperdiet tempus libero. Mauris sed nunc mattis urna tempor tempor vitae eget lorem. Sed pellentesque, tellus vel sagittis dignissim, ipsum erat tempor turpis, id tristique augue mi tincidunt nunc. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut nec ipsum quis nibh scelerisque pretium vitae ac turpis. Cras porta vestibulum lorem sit amet lacinia. Phasellus accumsan est sagittis, scelerisque ligula at, porta arcu. Vestibulum metus justo, tempus eget feugiat id, iaculis tincidunt elit.</p><p>Aliquam diam mauris, porttitor non commodo at, viverra id dui. Proin finibus a nulla id posuere. Donec ultricies cursus metus, at egestas tortor dignissim eu. Aliquam a massa eu erat gravida ultrices. Vivamus venenatis imperdiet purus, at egestas enim elementum quis. Nunc ultricies sapien sapien, gravida porttitor diam porta non. Fusce pretium sodales erat. Donec interdum ipsum odio, sit amet luctus est pharetra non. Mauris euismod neque eu malesuada scelerisque. In ultricies lectus eu libero accumsan, ultricies commodo nibh consequat. Pellentesque condimentum, neque id sollicitudin egestas, risus est lobortis diam, in faucibus sapien tortor eu felis. Cras a turpis aliquam, tristique eros at, ullamcorper tellus. Maecenas at tortor magna.</p></div>"
    },
    {
      "id": "14",
      "body": "<div><p>Nulla at euismod erat. Donec fermentum dui ut scelerisque rhoncus. Aliquam erat volutpat. Nunc ut tortor sit amet lectus gravida dictum. Morbi eget ultricies eros, nec mollis arcu. Quisque nunc massa, gravida quis sem et, dignissim ultrices nulla. Quisque non venenatis dui, nec volutpat magna. Vivamus porttitor, arcu sed euismod faucibus, mauris lacus interdum orci, et ultrices augue leo id lorem. Ut lectus leo, finibus quis urna vitae, auctor mollis nulla. Aliquam auctor nulla tristique lectus placerat, ac commodo ex egestas. Ut venenatis, eros eu tristique maximus, libero nisi fermentum mi, at sollicitudin quam lorem in felis.</p><p>Integer lacinia, ante ut mattis tincidunt, quam augue laoreet elit, vitae consequat arcu lacus ac magna. Nunc euismod in magna eget molestie. Phasellus lacinia in sapien id ultricies. Nulla ac rhoncus nulla. Donec pellentesque tortor iaculis dolor mollis laoreet. Nunc magna orci, suscipit ut nunc fringilla, imperdiet tempus libero. Mauris sed nunc mattis urna tempor tempor vitae eget lorem. Sed pellentesque, tellus vel sagittis dignissim, ipsum erat tempor turpis, id tristique augue mi tincidunt nunc. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut nec ipsum quis nibh scelerisque pretium vitae ac turpis. Cras porta vestibulum lorem sit amet lacinia. Phasellus accumsan est sagittis, scelerisque ligula at, porta arcu. Vestibulum metus justo, tempus eget feugiat id, iaculis tincidunt elit.</p><p>Aliquam diam mauris, porttitor non commodo at, viverra id dui. Proin finibus a nulla id posuere. Donec ultricies cursus metus, at egestas tortor dignissim eu. Aliquam a massa eu erat gravida ultrices. Vivamus venenatis imperdiet purus, at egestas enim elementum quis. Nunc ultricies sapien sapien, gravida porttitor diam porta non. Fusce pretium sodales erat. Donec interdum ipsum odio, sit amet luctus est pharetra non. Mauris euismod neque eu malesuada scelerisque. In ultricies lectus eu libero accumsan, ultricies commodo nibh consequat. Pellentesque condimentum, neque id sollicitudin egestas, risus est lobortis diam, in faucibus sapien tortor eu felis. Cras a turpis aliquam, tristique eros at, ullamcorper tellus. Maecenas at tortor magna.</p></div>"
    },
    {
      "id": "15",
      "body": "<div><p>Aliquam diam mauris, porttitor non commodo at, viverra id dui. Proin finibus a nulla id posuere. Donec ultricies cursus metus, at egestas tortor dignissim eu. Aliquam a massa eu erat gravida ultrices. Vivamus venenatis imperdiet purus, at egestas enim elementum quis. Nunc ultricies sapien sapien, gravida porttitor diam porta non. Fusce pretium sodales erat. Donec interdum ipsum odio, sit amet luctus est pharetra non. Mauris euismod neque eu malesuada scelerisque. In ultricies lectus eu libero accumsan, ultricies commodo nibh consequat. Pellentesque condimentum, neque id sollicitudin egestas, risus est lobortis diam, in faucibus sapien tortor eu felis. Cras a turpis aliquam, tristique eros at, ullamcorper tellus. Maecenas at tortor magna.</p><p>Phasellus eu purus hendrerit, blandit ante ut, rhoncus neque. Nullam mattis non velit nec bibendum. Morbi commodo enim nec semper ultrices. Pellentesque sit amet vestibulum leo. Pellentesque blandit diam in placerat viverra. Phasellus posuere velit mauris, et auctor lectus scelerisque eu. Cras turpis lorem, gravida quis congue id, tristique non lorem. Proin sit amet eros sit amet ligula vehicula faucibus nec quis ipsum. Nullam semper urna sit amet justo iaculis porta. Nullam commodo libero pulvinar, faucibus dui in, viverra ante. Duis vel leo neque.</p><p>Quisque rhoncus dignissim tincidunt. Duis ornare enim pretium imperdiet iaculis. Fusce finibus turpis non lacus convallis vehicula. Quisque et porta orci. Quisque sed erat at diam feugiat viverra. Vestibulum dignissim velit interdum nibh consectetur venenatis. Sed sodales blandit facilisis. Duis elementum, justo at vehicula tempor, libero quam malesuada magna, et fermentum arcu diam vel elit. Pellentesque sollicitudin egestas varius. Vestibulum efficitur tortor eu dolor mollis fringilla. Aliquam tincidunt ornare leo. Pellentesque malesuada urna magna, sed imperdiet leo vehicula eu. In a odio sit amet magna lobortis aliquet a ac est.</p></div>"
    }
  ]
}

```

### Initiate JSON Server
This command runs on the local terminal or command prompt initiates the json-server. This enables the API functionality. We can make API calls once the server is running.

```sh
json-server --watch db.json
```

If you get an error message, check if **npm** has been added to the environment variables. That should be a quick fix. Add the following text to your **PATH** environment variable: `C:\Users\YOUR_NAME\AppData\Roaming\npm`

Once we have the server running, we can double check via Postman or by going to http://localhost:3000/emailbody. To get a specific email body, we can send the *id* as a parameter. The URL is modified as follows: http://localhost:3000/emailbody?id=1. This returns the first email body.

### Let's implement the hooks we just learned
In my [previous article](/engineering-education/build-an-outlook-clone-using-react/), we focused on the logic to go about implementing the project from scratch. If you would like a refresher on how to implement a project feel free to refer back to the previous article. In this article, we will focus on understanding the hooks and performing optimization.

### Explanation: *App.js*
We declare functional components and hooks that need to be declared within the function. We use various state variables. We have looked at declaring state variables using `useState` [earlier in this article](#react-hooks-in-practice). They are:

1. emails
2. dualPanel
3. id
4. body
5. searchField
6. readList
7. fav
8. forRead
9. forSearch
10. forFav
11. unread

These are the same state variables as earlier. Declaring state variables as and when required is a powerful feature. It enables modularity and makes the codebase easier to read.

Initially, on `componentDidMount`, the first `useEffect` is called, where we fetch the list. Initially, the id is set to an empty string. When there is a change in id, we will make an API call to the localhost to fetch the body. The body state is set. getId is the call-back function that is passed as a prop to Email component and we set the id.

Earlier, we had to send a call-back function to modify the readlist. In this case, we can directly send the `useState` list. We send `readlist` and `setReadList` as props to *Email.js*. In *Email.js*, we `setReadList` on an `onClick` event.

We have also used `createContext`. We declare a global const `EmailContext`. This is wrapped around the child component. We send the emails as the value to be received at the child component. In the child component, we use the hook `useContext` to receive the prop email.

### Styled-components
Styled-components is by far the easiest library to use for styling. There are various alternatives like inline styling and tachyons. But styled-components enables us to use our CSS knowledge. Let's say we want to style a button element. The inline styling would be

```jsx
<button style={{borderRadius:'1%'}}>Hey there</button>  
```
Inline styling decreases code readability. Using styled-components, on the other hand, allows us to maintain much more tidy code. Let's look at styling the button using styled-components.

All we have to do is create a constant and define our CSS styling within the constant. We can also create classes and ids similar to CSS.

```jsx
const ButtonStyle = styled.button {
    border-radius: 1%;
    color: white;
    font-family: "Helvetica Neue", Helvetica;
    .app: {
        font-size: 12px;
    };
}

function App() {
    <ButtonStyle className='app'>
        <button>Hey there</button>  
    </ButtonStyle>
}

```

In the newly created file named **App.js**, paste the code below. We are creating the main file that will interact with all the other components. We created the files earlier. Have a quick recap on the [project structure](#code).


**App.js**
```jsx
import React, { useState, useEffect, createContext, useRef } from 'react';

import EmailBody from './components/EmailBody'
import Email from './components/Email'
import Scroll from './components/Scroll'
import { ButtonStyles, DualPanel } from './components/styledComponents/ButtonStyles'

export const EmailContext = createContext()

function App() {
  const [emails, setEmails] = useState([])
  const [dualPanel, setDualPanel] = useState(false)

  useEffect(() => {
    fetch('https://my-json-server.typicode.com/lalith1403/jsonemaillist/db')
      .then(response => response.json())
      .then(email => {
        setEmails(email["list"])
        setEmailsToBeSent(email['list'])
      })
      .catch(err => console.log(err))
  }, [])

  const [id, setId] = useState('')
  const [body, setBody] = useState('')
  const [searchField, setSearchField] = useState('')
  const isMounted = IsMounted();

  useEffect(() => {
    if (isMounted) {
      fetch(`http://localhost:3000/emailbody?id=${id}`)
        .then(data => data.json())
        .then(data => setBody(data.body))
        .catch(err => console.log(err))
    }
  }, [id])

  const getId = (id) => {
    setId(id)
  }

  const [readList, setReadList] = useLocalStorage('read', [])
  const [fav, setFav] = useLocalStorage('fav', [])

  const markAsFav = () => {
    if (!fav.includes(id)) {
      setFav([...fav, id])
    }
    else {
      const favUpdated = fav.filter(ele => ele !== id)
      setFav(favUpdated)
    }
  }

  const [forRead, setForRead] = useState(false)
  const [unread, setUnread] = useState(false)
  const [forFav, setForFav] = useState(false)
  const [forSearch, setForSearch] = useState(false)

  const searchChange = (event) => {
    setSearchField(event.target.value)
    setForSearch(!forSearch)
  }

  useEffect(() => {
    if (isMounted) {
      const filterBySearch = emails.filter(email => {
        return email.short_description.toLowerCase().includes(searchField.toLowerCase())
      })

      forSearch && setEmailsToBeSent(filterBySearch)
      !forSearch && setEmailsToBeSent(filterBySearch)
    }
  }, [forSearch])

  useEffect(() => {
    if (isMounted) {
      const filterByFav = emails.filter(email => {
        return fav.includes(email.id)
      })

      forFav && setEmailsToBeSent(filterByFav)
      !forFav && setEmailsToBeSent(emails)
    }
  }, [forFav])

  useEffect(() => {
    if (isMounted) {
      const filterByUnread = emails.filter(email => {
        return !readList.includes(email.id)
      })

      unread && setEmailsToBeSent(filterByUnread)
      !unread && setEmailsToBeSent(emails)
    }
  }, [unread])

  useEffect(() => {
    if (isMounted) {
      const filterByRead = emails.filter(email => {
        return readList.includes(email.id)
      })

      forRead && setEmailsToBeSent(filterByRead)
      !forRead && setEmailsToBeSent(emails)
    }
  }, [forRead])

  const [emailsToBeSent, setEmailsToBeSent] = useState(emails)

  let xyz = 0;
  const findEmail = (id) => {
    console.log(xyz++)
    for (let i = 0; i < emails.length; i++) {
      if (emails[i].id === id) {
        return emails[i]
      }
    }
  }

  if (emails.length) {
    return (
      <div className='background' >
        <ButtonStyles >
          <span>Filter By </span>
          <button className={unread ? 'buttons clicked' : 'buttons'} onClick={() => setUnread(!unread)}> Unread </button>
          <button className={forRead ? 'buttons clicked' : 'buttons'} onClick={() => setForRead(!forRead)}> Read </button>
          <button className={forFav ? 'buttons clicked' : 'buttons'} onClick={() => setForFav(!forFav)}> Favourite </button>
          {dualPanel && <button className='goback' onClick={() => setDualPanel(!dualPanel)}>Back</button>}
          <input type='search' placeholder='Search Emails ' onChange={searchChange} />
        </ButtonStyles>

        <DualPanel onClick={() => setDualPanel(true)}>
          <div className={dualPanel ? 'dualpanel' : 'nodualpanel'}>
            <Scroll>
              {(emailsToBeSent.length === 0) && <h1>
                No Emails Found <br /><br /><br /></h1>}
              {emailsToBeSent.map((email, index) => {
                return (
                  <div key={Number(index)}>
                    <EmailContext.Provider value={email}>
                      <Email getId={getId} id={id} fav={fav} readList={readList} setReadList={setReadList} />
                    </EmailContext.Provider>
                  </div>
                );
              })}
            </Scroll>
          </div>
          {dualPanel && emailsToBeSent.length > 0 && <EmailBody email={findEmail(id)} body={body} markAsFav={markAsFav} />}
        </DualPanel>
      </div>
    );
  }

  else {
    return (
      <h1>
        Loading...
      </h1>
    )
  }
}

export default App;

//check if first render has occured to delay emailbody fetch
function IsMounted() {
  const isMountRef = useRef(false);
  useEffect(() => {
    isMountRef.current = true;
  }, []);
  return isMountRef.current;
}

//check if anything is stored in local storage
function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  const setValue = value => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.log(error);
    }
  };
  return [storedValue, setValue];
}
```
### Custom Hooks
We have defined two custom hooks for different purposes. Let's understand what custom hooks are. Custom hooks enables the reuse of stateful logic by providing boundaries to maintain isolated states and side effects.

The first custom hook is called `isMounted` and is used to check if the component is mounted or not. This is done to ensure performance. At the time of mounting, we only want the first useEffect to make the API call. All the other hooks should not be called. The lesser the number of API calls made, the faster the web page will be.

The second custom hook is used to store the read and fav lists in local storage. This time, we consider it from the user experience perspective. Showing the user the list of read and favourite, while reloading the page enhances the user experience. It is very important to store only relevant information. Therefore, the second custom hook takes in the input key and `initialValue`. It is checked if the key exists in the `localStorage`. If yes, it is updated with the new value, otherwise a new key is created.

To check the value of the `localStorage`, go to Developer Tools -> Application -> Local Storage. You will find the values stored there. Any changes in the list will be immediately reflected in the `localStorage`.

### Explanation: *Email.js*
We use `useContext` to get the email. Each email is displayed with the incorporation of various styling components. The scroll component limits the display height and prevents overflow.  

**Email.js**

```jsx
import React, { useContext } from 'react'
// import './css/Email.css'
import { EmailStyle, EmailListStyle, AvatarStyle, AvatarTextStyle, Scroll } from './styledComponents/EmailStyle'
import { EmailContext } from '../App'

const processDate = date => {
    let time = date;
    let formattedDate = new Date(time);
    const mnth = ("0" + (formattedDate.getMonth() + 1)).slice(-2)
    const day = ("0" + formattedDate.getDate()).slice(-2)
    const hours = ("0" + formattedDate.getHours()).slice(-2)
    const minutes = ("0" + formattedDate.getMinutes()).slice(-2)
    const displayTime = [hours - 12, minutes].join(":")
    const displayDate = [day, mnth, formattedDate.getFullYear()].join("-")
    return [displayDate, ' ', displayTime, ' ', hours > 12 ? 'pm' : 'am'];
}

const Email = ({ fav, getId, readList, setReadList, id }) => {
    const markAsRead = (id) => {
        if (!readList.includes(id))
            setReadList([...readList, id])
    }
    const email = useContext(EmailContext)

    return (
        <Scroll onClick={() => { getId(email.id) }}>
            <EmailStyle >
                <EmailListStyle onClick={() => markAsRead(email.id)}
                    className={readList.includes(email.id) ? ((String(id) === email.id) ? 'outline card' : 'nooutline card') : 'nooutline cardnocolor'}>
                    <AvatarStyle>
                        <AvatarTextStyle>
                            {email.from.name[0]}
                        </AvatarTextStyle>
                    </AvatarStyle>
                    <div>
                        <h4><span>From:</span> {email.from.name} &lt;{email.from.email}&gt;</h4>
                        <p className='subject'><span>Subject:</span> {email.subject} </p>
                        <p>{email.short_description} </p>
                        <p>{processDate(email.date)}
                            {fav.includes(email.id) ? <button className='colored'> Favourite</button> : <button></button>}
                        </p>
                    </div>
                </EmailListStyle>
            </EmailStyle>
        </Scroll>
    );
}

export default Email;
```

### Explanation: *EmailBody.js*
We received the body of the email and a call-back function `markAsFav`, which is called when the Favourite button is clicked. `markAsFav` is a call-back function that updates the fav list.

**EmailBody.js**

```jsx
import React from 'react'
import { OuterBody, AvatarTextStyle } from './styledComponents/EmailBodyStyles'
import styled from 'styled-components'

const ButtonStyle = styled.button`
    margin-left:65vh;
    background:#e54065;
    color:white;
    cursor:pointer;
    width: 4vw;
    font-size: .5em;
    outline: none;
`
const processDate = date => {
    let time = date;
    let formattedDate = new Date(time);
    const mnth = ("0" + (formattedDate.getMonth() + 1)).slice(-2)
    const day = ("0" + formattedDate.getDate()).slice(-2)
    const hours = ("0" + formattedDate.getHours()).slice(-2)
    const minutes = ("0" + formattedDate.getMinutes()).slice(-2)
    const displayTime = [hours - 12, minutes].join(":")
    const displayDate = [day, mnth, formattedDate.getFullYear()].join("-")
    return [displayDate, ' ', displayTime, ' ', hours > 12 ? 'pm' : 'am'];
}

const EmailBody = ({ body, email, markAsFav }) => {
    return (
        <OuterBody className='upperbody' >
            <div className='avatar'>
                <AvatarTextStyle>
                    {email.from.name[0]}
                </AvatarTextStyle>
            </div>
            <div className="body">
                <h1>
                    {email.subject}
                    <ButtonStyle onClick={markAsFav}>
                        Favourite
                    </ButtonStyle>
                </h1>
                <p>From {email.from.name}</p>
                <p>{processDate(email.date)}</p>
                <div dangerouslySetInnerHTML={{ __html: body }} />
            </div>
        </OuterBody>)
}

export default EmailBody

```

**Scroll.js**

```jsx
import React from 'react';
import styled from 'styled-components'

const ScrollStyles = styled.div`
    overflow-y:auto;
    height:89vh;
`
const Scroll = (props) => {
    return (
        <ScrollStyles>
            {props.children}
        </ScrollStyles>
    )
}

export default Scroll
```

### Styled Components
Let's define the styling for the entire project. We can also send props to the styled elements. These props can enable us to include stateful logic inside the styled-components.

**ButtonStyles.js**
```css
import styled from 'styled-components'

export const ButtonStyles = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 2em;
  margin-bottom: 2em;
  margin-left: 1em;
  font-size: 1.1em;
  font-weight: bold;

.buttons{
    margin-right: 10px;
    background: transparent;
    border: none;
    border-radius: 15%;
    width: 5em;   
    outline: none;
    cursor: pointer;
}
.goback{
  cursor:pointer;
  border: 1px solid black;
  background-color: #e54065;
  width:60vw;
}

.clicked {
    background-color: #e54065;
}

  input{
    margin-left: 105em;
  }
  span{
    /* margin-right:1em; */
    background: transparent;
    font-size: 0.8em;
    font-weight: bolder;
  }
`

export const DualPanel = styled.div`
    display: flex;
    flex-direction: row;
    margin-left: 1vw;
    margin-right: 1vw;
    margin-bottom: 1vw;

    .dualpanel{
      width: 40vw;
    }

    .nodualpanel {
      width:98vw;
    }
`
```

**EmailBodyStyles.js**

```css
import styled from 'styled-components'

export const OuterBody = styled.div`
    display: flex;
    flex-direction: row;
    /* border-spacing: 10px; */

    .avatar{
        width:30px;
        height:30px;
        border-radius:50%;
        background-color: #e54065;
        color: white;
        text-transform: uppercase;
        margin-left: 10px;
        margin-right:1em;
        margin-top:1em;
    }
    .upperbody {
    background-color: #ffffff;
    margin-left: 2vw;
    width: 59vw;
    height: fit-content;
    text-align: justify;
    color: #636363;
    border-radius: 1%;
    border: 1px solid black;
    }
    .body {
    margin-top: 2em;
    background-color: #ffffff;
    margin-left: 1vw;
    width: 59vw;
    height: fit-content;
    text-align: justify;
    margin-right: 2vw;
    color: #636363;
    }
`
export const AvatarTextStyle = styled.div`
width: inherit;
height: inherit;
display: flex;
justify-content: center;
align-items: center;
    /* margin-left: 1.2em; */
    /* padding-top:0.8em; */
`
```

**EmailStyle.js**

```css
import styled from 'styled-components'

export const EmailStyle = styled.div`
    span {
        font-weight: lighter;
    }
    button {
        background: transparent;
        outline: none;
        border: none;
    }
    .dualpanel{
      margin-left: 1vw;
      margin-right: 1vw;
      margin-bottom: 1vw;
      width: 30vw;
    }
    .outline {
        border: 2px solid #e54065;
        border-radius: 5%;
        outline: #e54065;
    }
    .nooutline {
        outline: none;
    }
    .subject {
        font-weight: bold;
    }
    .card {
        color: #636363;
        background-color: white;
        border: 0 10px 3px rgba(0, 0, 10, 0.5);
        padding-left: 5em;
        margin-bottom: 10px;
        box-shadow: 4px 4px 4px 4px rgba(0, 0, 10, 0.1);
        margin-right: 5px;
        border-radius: 1%;
    }
    .card:active {
        outline: #e54065;
    }
    .cardnocolor {
        color: #636363;
        background-color: #eeeded;
        border: 0 10px 3px rgba(0, 0, 10, 0.5);
        padding-left: 5em;
        margin-bottom: 10px;
        box-shadow: 4px 4px 4px 4px rgba(0, 0, 10, 0.1);
        margin-right: 5px;
        border-radius: 1%;
    }
    .cardnocolor:active {
        outline: #e54065;
    }
`


export const EmailListStyle = styled.div`
    display: flex;
    flex-direction: row;
`

export const AvatarStyle = styled.div`
    width:3em;
    height:3em;
    border-radius:50%;
    background-color: #e54065;
    color: white;
    text-transform: uppercase;
    margin-left: 10px;
    margin-right:1em;
    margin-top:1em;
`
export const AvatarTextStyle = styled.div`
    margin-left: 1.1em;
    padding-top:0.8em;
`

export const Scroll = styled.div`
  overflow-y: hidden;
  .colored{
      color: #e54065;
  }
  /* height:90vh; */
`
```

### Performance
Let's discuss some of the performance improvements that we have just implemented in this project.

1. Calculation of lists only when the filter button is clicked. In the previous article, we had computed the lists every time it rendered. This is an overhead on the browser and can be avoided by computing the list in the `useEffect`.
2. We make fewer API calls by ensuring that the call is made on a change in the value of id.
3. Enhancing user experience by showing relevant information.
4. Another reason to avoid inline styling is the constant updating of CSSOM (CSS Object Model). Every change causes a re-render of the entire page. If we increase the computational load by updating the CSSOM every single time, it will cause performance issues. Styled-components, on the other hand, do not update the CSSOM unless we change it manually.

### Conclusion
In this two-part series, we have introduced all the prominent React features, including hooks. Going through the process of designing the web page and incorporating optimizations towards the end is a good way to get a more user-friendly experience. This way, the next time you will start from a point of optimization, and find new parameters to be optimized.
