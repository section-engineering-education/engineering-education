---
layout: engineering-education
status: publish
published: true
url: /container-components-in-react/
title: Container Components in React
description: This tutorial will provide the reader a detailed guide on what are container components and how to work with them.
author: caleb-olojo
date: 2021-05-29T00:00:00-19:30
topics: [Containers]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/container-components-in-react/hero.png
    alt: Container Components in React Hero image
---
When you use React to build applications, you should think of how data is being passed among different components in the application. 
<!--more-->
In this article, we'll go through what container components are and how they work by building a search component that makes use of the container component React pattern.
### Prerequisites
Before you read this article, you need to have an idea of the following:
- [What is React](https://reactjs.org).
- You can read up on [how to create a React app with Parcel](https://www.digitalocean.com/community/tutorials/how-to-set-up-a-react-project-with-parcel) or simply use [CRA: Create React App](https://create-react-app.dev/).
- [How to make use of React Hooks](https://reactjs.org/docs/hooks-intro.html) to store the state in a component
- [Understand how components and Props work together](https://reactjs.org/docs/components-and-props.html).

When you're done getting around to these concepts, you can come back here to read this article.

### What exactly are they?
The term “Container components” was used by [Dan Abramov](https://overreacted.io/) when he was buttressing on the concept of separation of concerns in a React Application.

> A container component is always responsible for how things work in a component. -- Dan Abramov

When we think of the word "container", the first thing that pops up in our mind is the ideal representation of the word, which is an entity or material that stores and or holds contents. The type of content such a container holds may vary.

The same thing goes for a **"container component"** in React. Container components can be primarily referred to as the parent elements of other components in a React app. They serve as a bridge between the normal components that render the UI and the logic that makes the UI components interactive and dynamic.

The most common function of a container component is to obtain data. Obtaining data doesn’t mean the traditional way of fetching data from an API’s endpoint, it also has to do with the logic of a React component. 

Once the process of executing the logic or obtaining data in the component is complete. It renders the corresponding component Sometimes, the container component can perform two functions (i.e. to render UI and hold logic).

In a situation where a container component performs these. The component itself does not hold too many markups (JSX) and is void of CSS styles. 

Here’s an example below:

```js
import React from “react”

export const exampleComponent = ({ children }) => {
  const open = () => {
    alert("You clicked this container component")
  }

  return (
    <div onClick={open}>
	{children}
    </div>
  );
};
```

The component above illustrates how a container component performs two functions, presenting the UI and handling the logic of the component.

If you look at the component above, you’d see that it makes use of props to share data among components in the “arbitrary” React app.

**Note:** There’s a convention that is quite common in the developer community.

Developers tend to place their container components in a separate folder and the UI components into another folder, so they can distinguish between these components. You can choose not to follow this pattern of creating different folders if you already have one that works fine for you, so long you’re able to solve the same problem.

### Building the search component
A search component is among the most ubiquitous components in a typical React application.

Before we start building this app, let's have look at how the folder structure containing all the files is represented. You do not need to go with this type of structure if you have already had one that is suitable for you. 

The goal is just to be able to under the whole flow of the project.

```bash
src
 |-- App.js
 |-- bookshelf.js
 |-- components
           |---- Books.js
           |---- Search.js
```

Let’s start by thinking about the function(s) that the search component would perform. A search component should be able to perform basic tasks like searching and filtering.

To keep things simple, let's use an array of objects as the data to search from, instead of using an API.

Let's create an array of objects containing simple information about books that will be in this component:

```js
// bookshelf.js
export const books = [
  {
    name: "Eloquent JavaScript",
    author: "Marijn Haverbeke",
  },
  {
    name: "CSS The Definitive Guide",
    author: "Eric A. Meyer & Estelle Weyl",
  },
  {
    name: "Automate the boring stuff with Python",
    author: "Al Sweigart",
  },
  {
    name: "Make: JavaScript Robotics",
    author: "Donovan Buck, Bryan Hughes et al",
  },
];
```

The data in the `bookshelf.js` file will serve as the information. The search component should be able to filter the list of books once the user starts typing into the input field.

Let's create the components needed in this app below and I'll explain how everything works.

The `Search` component presents the UI (i.e. it renders an input element where users can filter the books in the list.) to the user.

```js
// search.js
import React from “react”

const Search = ({ val, onSearch, ...props }) => {
  return (
    <input
	  value={val}
	  onChange={onSearch}
	  placeholder="Search for any book"
	  {...props}
    />
  );
};

export default Search
```

The `Books` component performs almost the same function as the search component. Most people refer to this type of component as **"dumb", "stateless" or "presentational"** components. 

This is because they're only concerned with how the user interface of the application is being rendered or displayed to the user. 

They do not always have a state, instead, they use props from the parent of the component to get data in the application component tree.

```js
// books.js

import React from "react";

const Books = ({ books }) => {
  return books.map((book, index) => {
    return (
      <ul key={index}>
        <li>Book: {book.name}</li>
        <li>Author: {book.author}</li>
      </ul>
    );
  });
};
export default Books;
```

The `App` component illustrates how a container component can perform two functions, rendering the UI and housing the logic of that container.

The text that the user types into the input field is stored in the `App` component's state as a string so that we’d be able to perform a filter of the books using the [filter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/) method.

This is possible because the data passed to the `Book` component is also controlled in this container component.

So each time the input field detects a character, it starts looping through the search term and all the items in the `books` array to see which one matches the text and renders it to the DOM.

```js
import React, { useState } from "react";
import { books } from "./bookshelf.js";
import Books from "./Books";
import Search from "./Search";

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };
  // performs a filtering on the questions
  // based on the user's input and returns a new array
  // which gets rendered to the DOM.

  const filteredBooks = books.filter((book) => {
    return book.name.includes(searchTerm);
  });
  return (
    <section>
      <Search name="search" onSearch={handleInputChange} val={searchTerm} />
      <Books books={filteredBooks} />
    </section>
  );
};
export default App;
```

### Conclusion
The idea behind this paradigm is the ability to be able to adopt the “separation of concern” pattern.

By adopting this pattern, developers have been able to structure the components in an app in a way that is reusable and scalable in the future.

Thank you for reading this article up till this point. Kindly share it with your peers.

Happy coding!

---
Peer Review Contributions by: [Mohan Raj](/engineering-education/authors/mohan-raj/)
