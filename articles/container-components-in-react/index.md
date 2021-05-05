![Article cover image](./hero.jpg)

# What are Container Components in React.

As time goes on, while making use of React, one would need to think of how data is being passed among different components in a React application.

In this article we’d create a search component that makes use of the container component React pattern.

When you’re done reading this article, you’d have an understanding of how a container component works and how to build any React component using this pattern.

## What exactly are they?

The term “Container components” was used by [Dan Abramov](https://overreacted.io/) when he was buttressing on the concept of separation of concerns in a React Application.

A container component is one whose core responsibility or functionality is to get data.

Obtaining data doesn’t mean the traditional way of fetching data from an API’s endpoint, it also has to do with the logic of a React component. Once the process of executing the logic or obtaining data in the component is complete. It renders the corresponding component.

The component that gets rendered represents the user interface or layout of the app.

> A container component is always responsible for how things work in a component.

Sometimes it (the container component) can perform two functions (i.e. to render UI and hold logic). In a situation where a container component performs these. The component itself does not hold too many markups (JSX) and is void of CSS styles. Here’s an example below:

```js
import React from “react”

export const exampleComponent = ({ children, open }) => {
	return (
		<div onClick={() => open()} alt="">
			{children}
		</div>
	);
};

```

The component above illustrates how a container component performs two functions, presenting the UI and handling the logic of the component.

If you look at the component above, you’d see that it makes use of props to share data among components in the “arbitrary” React app.

Note: There’s a convention that is quite common in the developer community.

Developers tend to place their container components in a separate folder and the UI components into another folder, so they can distinguish between these components. You can choose not to follow this pattern of creating different folders if you already have one that works fine for you, so long you’re able to solve the same problem.

Building the search component
A search component is among the most ubiquitous components in a typical React application.

Let’s start by thinking about the function(s) that the search component would perform. A search component should be a able to perform basic tasks like searching and filtering.
To limit the amout of time spent on getting the perfect API that the search component has to interact with.

I’d go ahead to create an array of objects containing simple information that will be in this component

```js
// bookshelf.js
export const bookShelf = [
  {
    bookName: "Eloquent JavaScript",
    author: "Marijn Haverbeke",
  },
  {
    bookName: "CSS The Definitive Guide",
    author: "Eric A. Meyer & Estelle Weyl",
  },
  {
    bookName: "Automate the boring stuff with Python",
    author: "Al Sweigart",
  },
  {
    bookName: "Make: JavaScript Robotics",
    author: "Donovan Buck, Bryan Hughes et al",
  },
];
```

The data in `authors.js` will serve as the information that would be mapped onto the `authorsPage` so the search component can be able to filter the list of authors once the user starts typing into the input field.

I’d go on to create the components needed in this app below and explain how everything works below.

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

The `Books` component performs almost the same function with the search component. Its only difference has to with the usage of React props to share data amongst the other components in the app.

Take a look at how the `bookShelf` component is being imported into the authors container and how it is being used in the `Books` component.

```js
// books.js
const Books = ({ books }) => {
	return (
		{books.map((bookShelf, index) => {
			return (
				<ul key={index}>
					<li>Book: {bookShelf.bookName}</li>
					<li>Author: {bookShelf.author}</li>
				</ul>
			)
		})}
	)
}
export default Books
```

The `authorsPage` component illustrates how a container component can perform two functions, rendering the UI and housing the logic of that container.

Notice how the usage of React Hooks is being used to store/hold the state of the component, which also is among the features of a container component, they are usually stateful components.

The text that user types into the input field is being stored in an array so that we’d be able to perform a filtering functionality using [JavaScript’s filter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/) method.

This is possible because the state of the `Book` component is also monitored in this container component.

So each time the input field detects a character, it starts looping through and all the items in the bookShelf array to see which one matches the text and renders it to the DOM.

```js
import React from “react”
import { bookShelf } from “./bookshelf.js”
import Books from “./books”

const authorsContainer = () => {
	const [searchTerm, setSearchTerm] = React.useState([]);
	const [books, setBooks] = React.useState(bookShelf);

    const handleInputChange = (e) => {
		setSearchTerm(e.target.value);
	};

	// perfoms a filtering on the questions
	// based on the users input and returns a new array
	// which gets rendered to the DOM.
	const filteredBooks = books.filter((bookShelf) => {
		return bookShelf.bookName.includes(searchTerm);
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
export default authorsContainer
```

## Conclusion

The idea behind this paradigm is the ability to be able to adopt the “separation of concern” pattern.

By adopting this pattern, developers have been able to structure the components in an app in way that is reusable and scalable in the future.

Thank you for reading this article up till this point. Kindly share it with your peers.
