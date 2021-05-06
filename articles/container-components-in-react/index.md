When you use react to build applications, you should think of how data is being passed among different components in the application. In this article, we'll go through what container components are and how they work by buiding a search component that makes use of the container component React pattern.

### Prerequisites

Before you read this article, you need to have an idea of the following:

- [What is React](https://reactjs.org).

- You can read up on [how to create a React app with Parcel](https://www.digitalocean.com/community/tutorials/how-to-set-up-a-react-project-with-parcel) or simply use [CRA: Create React App](https://create-react-app.dev/)

- [How to make use of React Hooks](https://reactjs.org/docs/hooks-intro.html) to store the state in a component

- [Understand how components and Props work together](https://reactjs.org/docs/components-and-props.html).

When you're done getting around these concepts, you can come back here to read this article.

### What exactly are they?

The term “Container components” was used by [Dan Abramov](https://overreacted.io/) when he was buttressing on the concept of separation of concerns in a React Application.

> A container component is always responsible for how things work in a component. -- Dan Abramov

When we think of the word "container"; The first thing that pops up in our mind is the ideal representation of the word; which is an entity or material that stores and or hold contents. The type of content such a container holds may vary.

The same thing goes for a **"container compponent"** in React. Container components can be primarily referred to as the parent elements of other components in a React app. They serve as a bridge between the normal components that render the UI and the logic that makes the UI components interactive and dynamic.

The most common function of a container component is to obtain data. Obtaining data doesn’t mean the traditional way of fetching data from an API’s endpoint, it also has to do with the logic of a React component. Once the process of executing the logic or obtaining data in the component is complete. It renders the corresponding component.

Sometimes, the container component can perform two functions (i.e. to render UI and hold logic).

In a situation where a container component performs these. The component itself does not hold too many markups (JSX) and is void of CSS styles. Here’s an example below:

```js
import React from “react”

export const exampleComponent = ({ children}) => {
  const open = () => {
    alert("You clicked this container component")
  }

  return (
    <div onClick={() => open()}>
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

Before we start building this app, let's have look at how the folder structure containing all the files are represented. You do not compulsorily need to go with this type of structure if you have already have one that is suitable for you. The goal is just to be able to under the whole flow of the project.

```
src
 |-- App.js
 |-- bookshelf.js
 |-- components
           |---- Books.js
           |---- Search.js
```

Let’s start by thinking about the function(s) that the search component would perform. A search component should be a able to perform basic tasks like searching and filtering.

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

The data in the `bookshelf.js` file will serve as the information that would be mapped onto the `App` component, so the search component can be able to filter the list of books once the user starts typing into the input field.

Let's create the components needed in this app below and I'll explain how everything works.

The `Search` component presents the UI (i.e. It renders an input element where users can filter the books in the list.) to the user. It makes use of React props to pass data down to other components such as the author’s page container component.

```js
// search.js
import React from “react”

const Search = ({ val, onSearch, ...props }) => {
  return (
    <input
	  type="text"
	  value={val}
	  placeholder="Search for any book"
	  onChange={onSearch}
	  {...props}
	/>
  );
};

export default Search
```

The `Books` component performs almost the same function as the search component. Most people refer to this type of components as **"dumb", "stateless" or "presentational"** components because they're only concerned with how the user interface of the application is being rendred or displayed to the user. They do not always have state, instead they use props to share data in the application component tree.

Take a look at how the `bookShelf` component is being imported into the authors container and how it is being used in the `Books` component.

```js
// books.js
const Books = ({ books }) => {
  return (
  {books.map((book, index) => {
    return (
	  <ul key={index}>
	    <li>Book: {book.bookName}</li>
		<li>Author: {book.author}</li>
	  </ul>
    )
  })}
  )
}
export default Books
```

The `App` component illustrates how a container component can perform two functions, rendering the UI and housing the logic of that container.

The text that user types into the input field is being stored in an array so that we’d be able to perform a filtering functionality using [JavaScript’s filter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/) method.

This is possible because the state of the `Book` component is also monitored in this container component.

So each time the input field detects a character, it starts looping through and all the items in the bookShelf array to see which one matches the text and renders it to the DOM.

Notice how the usage of React Hooks is being used to store/hold the state of the component in the snippet below, which also is among the features of a container component, they are usually stateful components

```js
import React, { useState } from “react”
import { books } from “./bookshelf.js”
import Books from “./books”

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // perfoms a filtering on the questions
  // based on the users input and returns a new array
  // which gets rendered to the DOM.
  const filteredBooks = books.filter((book) => {
    return book.bookName.includes(searchTerm);
  });

  return (
    <section>
	  <Search
	    name="search"
		onSearch={handleInputChange} val={searchTerm}
	  />
	  <Book books={filteredBooks}/>
	</section>
  )
}
export default App;

```

### Conclusion

The idea behind this paradigm is the ability to be able to adopt the “separation of concern” pattern.

By adopting this pattern, developers have been able to structure the components in an app in way that is reusable and scalable in the future.

Thank you for reading this article up till this point. Kindly share it with your peers.
