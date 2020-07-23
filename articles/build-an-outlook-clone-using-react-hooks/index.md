---
layout: engineering-education
status: publish
published: true
slug: build-an-outlook-clone-using-react-hooks
title: React Hooks and Building Outlook Clone
description: Complete guide where we discuss react hooks and have written optimized code following up on our earlier topic of how to build an outlook clone using React.
author: lalithnaryan-c
date: 2020-07-23T00:00:00-07:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/build-an-outlook-clone-using-react-hooks/hero.jpg
    alt: outlook clone example image
---
Welcome to Hook part of the React series. This time we cover implementing the same outlook clone that we built earlier. But this time, we use React Hooks. The earlier codebase was repetitive and there is a scope for optimization of the entire project. To sum up the earlier attempt at building an outlook clone, we made API calls and displayed emails according to the filter requested. We also implemented local storage.

<!--more-->

Let's think about this for a minute. When we implemented local storage, was it a good idea to store the entire state? This is a factor that needs some consideration of the user interface. Upon reloading, we can simply show the user the set of reading and favorite mails and refresh the layout to the default option. This is the ideal approach to building projects. First, we build them and then work with various optimization in terms of performance, user experience, and code quality.

React class-based components have a bad outlook towards code quality. There is a lot of repetition. DRY, an acronym that stands for Don't Repeat Yourself, effectively speaks for itself. Therefore, React Hooks is a layer on top of the existing library. Let's understand what hooks are and how they work in the next section.

### React Hooks: Why?

In the earlier article, we were constrained to use state and other React features inside the class. We defined the class as

```jsx
import React from 'react';

class Example extends React.Component{
    //sample component code here
}
```
The above definition declares that *Example* class is a child component of *React.Component* class.

### The basis of the need for react hooks in terms of the React Documentation page is as follows.

#### *It’s hard to reuse stateful logic between components*

The previous article had a lot of messy lines, where all the info that had to be sent to the child components were sent via the props. What if cases arise, where information has to be sent multiple levels downwards? In class-based components, it becomes messy due to layers of providers, consumers, render props, and higher-order components. Overall this points to an underlying problem of inability to sharing stateful info.


With Hooks, you can extract stateful logic from a component so it can be tested independently and reused. Hooks allow you to reuse stateful logic without changing your component hierarchy.

#### *Complex components become hard to understand*

Usually projects that start out small, in no time, turn out to be an unmanageable mess of stateful logic and side effects. The order of the lifecycle methods is important for absolute control over the web page. However, consider the example where components might perform some data fetching in componentDidMount and componentDidUpdate. At the same time, another piece of code is present in componentDidUpdate setting up event listeners. The event listeners need to be set free, and this is done upon componentWillUnmount. So many lifecycle methods, with dependency on multiple non-related pieces of code, are problematic. Usually, state management libraries like redux are used to manage the state. However, with the introduction of Hooks, the above problem is solved.

#### *Classes are confusing, Functions enable modularity*

We used a lot of the *this* keyword in JavaScript in the earlier article. For beginners, learning *this* in JavaScript is quite a steep learning curve. Additionally, the React team found that classes inhibited higher performance.  

Hooks solve the above-mentioned problems gracefully. Once you have learned hooks, trust me, you will love React.

### React Hooks: In Practice

We will consider some of the hooks and get an understanding of the underlying functionality. For a detailed explanation, refer to the documentation. We will be covering useState, useRef, useEffect, createContext and useContext. All theses hooks are imported from the React library.

1. **useState**: useState enables creating state variables and using it anywhere within the functional component. The syntax for useState is as shown below:

   ```jsx
    [stateName, setStateName] = useState(defaultValue)
   ```
    useState returns a list which consists of the state variable, and a function to set the state variable. Uses list destructuring in JavaScript, we can easily rename it to names according to our convenience.

    The defaultValue can be any of the data types that JavaScript supports. We can have the stateName

2. **useEffect**: useEffect is used for executing certain actions to take place upon triggering of events. useEffect replaces the original way of declaring lifecycle methods.
   1. componentDidMount: To declare this event, we can use useEffect with an empty dependency list.
   ```jsx
   useEffect(()=>{
       //update the state on componentDidMount
   },[])
   ```
   2. componentWillUnMount: Once a component is unmounted, any cleanup that needs to be done can be performed by returning a function in useEffect.
   ```jsx
   useEffect(()=>{
       //update the state on componentDidMount
   return //cleanup code... for example freeing up event listeners
   },[])
   ```
   3. dependency list: The dependency list ensures that the useEffect runs only when a change occurs in the state variables mentioned in the dependecy list. This way, we can modularize effects and direct it to different actions on the basis of state variables.
   ```jsx
   useEffect(()=>{
       //update the state on componentDidMount
   },[stateVariable1, stateVariable2])
   ```
   The above useEffect will run when there is a change in stateVariable1 or stateVariable2


3. **useRef**: The useRef Hook is a function that returns a mutable ref object whose .current property is initialized with the passed argument (initialValue).
   ```jsx
    const refVariable = useRef(initialValue)
   ```
   It is usually used to access the DOM variables and to keep track of a mutable variable.
4. **createContext** and **useContext**: createContext us used to pass props from parent to child components. Consider the example of passing props from parent to child components present many levels below. Sending it via the props makes the code messy. Instead, createContext is used to send the props. Whenever the props are needed, we use useContext to get the value of the props.  We will discuss this below in the project.

### Code
Alrighty, we first begin with creating a React project, using create-react-app package. Open a new terminal of your choice and execute the following commands.  

```terminal
npx create-react-app outlookclonereacthooks
cd outlookclonereacthooks
npm start
```

The folder structure should look like this.

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
We will be working with class-based components in this article. The next article will talk about using Hooks for the same. A study of the two articles is enough to get a working understanding of React. Many examples that we find on GitHub are in class-based components. Having the ability to use React Hooks in place of class-based components is a useful skill to have.


Let us create a folder called components in the root folder. The updated directory looks like this. Add the components *Email.js*, *EmailBody.js*,*SearchBox.js*,*Scroll.js*, and create directories named *styledComponents* and *css*. Add the files *ButtonStyles.js*, *EmailBody.js* and *EmailStyle.js* to styledComponents directory. Add file *EmailBody.css* to the css folder.  

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
For the project, we need to make API calls to get the list of emails and email body. Thus, lets set that up. We will be using *json-server* package. This

```
npm install -g json-server
```

The single-line command installs the required package. -g denotes that the following package is installed globally.

Our first JSON file consists of 15 emails. We will use My JSON Server, a hosted service that provides fake online REST APIs for free.

The link for the hosted service is https://my-json-server.typicode.com/lalith1403/jsonemaillist/list

The other API of interest is fetching the email body given the email id. Online hosting services have various bottlenecks when it comes to content length. Thus, let's use local hosting to get the data.

The email body JSON file is as follows. Paste the following code into a file called *db.json*. Again *db.json* is a naming convention used.

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
```
json-server --watch db.json
```

If you get an error, do check if **npm** has been added to the environment variables. That should be a quick fix. Add the following to your **PATH** environment variable: C:\Users\YOUR_NAME\AppData\Roaming\npm

Once we have the server running, we can check via Postman or just go to http://localhost:3000/emailbody. To get a specific email body, we can send the *id* as a parameter. The URL is modified as follows: http://localhost:3000/emailbody?id=1. This returns the first email body.

### Let's implement the hooks we just learned

In the earlier article, we have discussed the logic to go about implementing the project from scratch. In this article, we will give more importance to understanding the hooks and performing optimization.

### Explaination: *App.js*

We declare functional components and hooks need to be declared within the function. We use various state variables. They are
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

These are the same state variables as earlier. This time they are declared as and when used. This is a powerful feature. Declare state variables as and when required.

Initially, on componentDidMount, the first useEffect is called, where we fetch the list. Initially, the id is set to an empty string. When there is a change in id, we will make an API call to the localhost to fetch the body. The body state is set. getId is the callback function that is passed as a prop to Email component and we set the id.

Earlier, we had to send a callback function to modify the readlist. In this case, we can directly send the useState list. We send readlist and setReadList as props to *Email.js*. In *Email.js*, we setReadList on an onClick event.

We have also used createContext. We declare a global const EmailContext. This is wrapped around the child component. We send the emails as the value to be received at the child component. In the child component, we use the hook useContext to receive the prop email.

### Styled-components

This is by far the easiest library to use for styling. There are various alternatives like inline styling and tachyons. But styled-components enables us to use our CSS knowledge. Let's say we want to style a button element. The inline styling would be

```jsx
<button style={{borderRadius:'1%'}}>Hey there</button>  
```
Using styled-components, on the other hand, would allow us to maintain a tidy code. Let's look at styling the button using styled-components.

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
Inline styling decreases code readability. Therefore, styledComponents is good.


*App.js*
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
We have defined two custom hooks for various purposes. Let's understand what custom hooks are. Custom hooks enable the reuse of stateful logic by providing boundaries to maintain isolated states and side effects.

The first custom hook called isMounted is used to check if the component is mounted or not. This is done to ensure performance. At the time of mounting, we want only the first useEffect to make the API call. All the other hooks should not be called. The lesser the number of API calls made, the faster the web page.

The second custom hook is used to store the read and fav lists in local storage. This time, we consider it from the user experience perspective. Showing the user the list of reading and favorite, while reloading the page enhances the user experience. It is very important to store only relevant information. Therefore, the second custom hook takes in the input key and initialValue. It is checked if the key exists in the localStorage. If yes, it is updated with the new value, else a new key is created.

To check the value of the localStorage, go to Developer Tools -> Application -> Local Storage. You will find the values stored there. Any change in the list will be immediately reflected in the localStorage.

### Explaination: *Email.js*
We use useContext to get the email. Each email is displayed with the incorporation of various styling components. The scroll component limits the display height and prevents overflow.  
*Email.js*

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

### Explaination: *EmailBody.js*
We receive the body of the email and a callback function markAsFav, which is called when the button Favourite is clicked.
markAsFav is a callback function that updates the fav list
*EmailBody.js*
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

*Scroll.js*

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

#### *ButtonStyles.js*
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

#### *EmailBodyStyles.js*

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

#### *EmailStyle.js*

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

Let's discuss some of the performance improvements that we have focused on.

1. Calculation of lists only when the filter buttons are clicked. In the earlier article, we had computed the lists every time it rendered. This is an overhead on the browser and can be avoided by computing the list in the useEffect.
2. We make fewer API calls by ensuring that the call is made on a change in the value of id.
3. Enhancing user experience by showing relevant information.
4. Another reason to avoid inline styling is the constant updating of CSSOM(CSS Object Model). Every change causes a re-render of the entire page. If we increase the computational load by updating the CSSOM every single time, it will cause performance issues. Styled-components, on the other hand, do not update the CSSOM unless we change it manually.

### Conclusion
In the two-part series, we have introduced all the prominent React features, including hooks. Going through the process of designing the web page and incorporating optimizations towards the end is a good way to get experience. This way, the next time you will start from a point of optimization, and find new parameters to be optimized.
