---
layout: engineering-education
status: publish
published: true
url: /data-visualization-with-tables-in-react/
title: Data Visualization With Tables in React
description: This article will walk the reader through an approach to properly visualize data in tables with an npm package called react-table.
author: caleb-olojo
date: 2021-10-06T00:00:00-11:00
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/data-visualization-with-tables-in-react/hero.jpeg
    alt: Data Visualization With React Tables Image
---
Working with tables in React has always been a burden since developers encounter issues related to the styling, responsiveness and proper rendering of data on tables.
<!--more-->
This article will look at an approach that would enable us to properly visualize data in tables with an npm package known as `react-table`.

React table is a library that focuses on the React Hooks pattern, therefore abstracting the need to create or hard-code HTML table elements.

### Prerequisites
To follow along with this article, you should know the following:
- React; a JavaScript framework used for creating single-page applications
- The JavaScript spread operator,
- PropTypes validation in React,
- Props handling in React,
- React Hooks,
- React styled-components.

### Getting started
The scope of this article is around the react framework known as `Nextjs`. We can also use `create-react-app` to build this project.

```bash
    npx create-next-app [your-app-name]
```

The file structure of a next.js app is quite different from `create-react-app`'s file architecture.

We will only be interacting with the files we need in this project to avoid being overwhelmed.

```bash
    |--pages
    |   |-- _app.js
    |   |-- index.js
    |--src
    |   |-- components
    |   |      |-- Table.js
    |   |-- data.json
    |   |-- columns.js
    |__
```

Now that we are familiar with the file structure above. Let us continue by installing the `styled-components` and `react-table` packages.

```bash
npm install styled-components react-table
```

### An overview of the components and files
`_app.js`: is the root file of the application. It looks similar to the `index.js` file in `create-react-app`.

In this file, you can:
- apply any global style(s)
- add new themes
- provide context to the whole application
- import the `redux` provider context to manage the state of your application (if you are using redux)

```js
import Head from "next/head";
import React from "react";

function MyApp({ Component, pageProps }) {
	return (
		<React.Fragment>
			<Head>
				<meta name="theme-color" content="#3c1756" />
				<title>A React Table</title>
			</Head>
			<Component {...pageProps} />
		</React.Fragment>
	);
}

export default MyApp;
```

In the first `_app.js` snippet, the `Head` component gets imported from `"next/head"`. This component performs the same function that the normal HTML `<head>` element does.

In the `Head` component, we can add different child elements such as the `<title>` element which describes the current route or page, the `<link>` element which imports stylesheets or set the page’s favicon, the `<meta>` tags works for SEO optimization.

- `index.js`: is our default route.

When running the development server, anything we do in the file gets displayed at this address: `https://localhost:3000/`.

```bash
npm run dev
```

- `Table.js`: is the component that holds the UI of the data that maps from `data.json` and `columns.js.`
- `data.json`: holds the array of user objects that will be rendered in the `Table` component. We would use the data copied from the Jsonplaceholder user API instead of writing the API calls ourselves.

```json
[
  {
    "id": 1,
    "name": "Leanne Graham",
    "email": "Sincere@april.biz",
    "username": "Bret",
    "phone": "1-770-736-8031 x56442",
    "company_name": "Romaguera-Crona",
  },
  {
    "id": 2,
    "name": "Ervin Howell",
    "username": "Antonette",
    "email": "Shanna@melissa.tv",
    "phone": "010-692-6593 x09125",
    "company_name": "Romaguera-Crona",
  },
  // the remaining user objects fall below
];
```

We are reducing the number of user objects in the array so that this article can be shorter.

However, if you want to use all the objects, you can get them [here](https://jsonplaceholder.typicode.com/users).

The API endpoint provides a list of ten user objects in the array per API call.

- `columns.js`: is also an array of objects that stores the items we want to render on the table's header.

```js
export const COLUMNS = [
	{
		Header: "S/N",
		accessor: "id",
	},
	{
		Header: "Fullname",
		accessor: "name",
	},
	{
		Header: "Email address",
		accessor: "email",
	},
	{
		Header: "Username",
		accessor: "username",
	},
	{
		Header: "Phone number",
		accessor: "phone",
	},
	{
		Header: "Company",
		accessor: "company_name",
	},
];
```

Notice how we declared the `accessor` key in the objects. The `accessor` is more like the locator of the property that is in `src/data.json`.

Let us compare both objects below:

```js
// columns.js
{
    Header: "Company",
    accessor: "company_name",
},

// data.json
{
    "id": 2,
    "name": "Ervin Howell",
    "username": "Antonette",
    "email": "Shanna@melissa.tv"
    "phone": "010-692-6593 x09125",
    "company_name": "Romaguera-Crona"
},
```

The `accessor` property in `column.js` has a value of `company_name`, which in turn renders the corresponding property’s value from the json file.

### Putting the components together
In the last section, we installed the necessary dependencies that we need in our next.js app.

Additionally, we have also seen the contents of the files that hold the table’s data and how they function.

This section will start looking at the content of `Table.js` in the `component` folder below:

```js
import React from "react";
import styled from "styled-components";

// the styled component that serves as a
// wrapper for the table component goes here
const TableContainer = styled.div`
      table {
        width: 100%;
        height: 100%;
        border-collapse: collapse;
        box-shadow: 1px 3px 5px rgba(0, 0, 0, 0.08);
      }
      thead {
        height: 64px;
        background: #3c1742;
      }
      thead th {
        font-size: 14px;
        color: ;
        text-align: left;
        padding: 0 30px;
      }
      tr {
        height: 64px;
        border-bottom: 2px solid grey;
      }
      tr td {
        padding: 0 30px;
        border-bottom: 1px solid #3c1742;
      }
      @media only screen and (max-width: 992px) {
        table {
          white-space: nowrap;
        }
      }
    `
    const Table = ({ columns, data }) => {
      // react-table hooks will go here

      return (
        // Table's JSX will go here
      );
    }

    export default Table;
```

The table component above focuses on the style of the table.

Let us take a look at some of the properties below.

The `table` selector sets the width and height of the table to `100%`, making it responsive to receive more columns and rows:

```css
table {
	width: 100%;
	margin-top: 20px;
	height: 100%;
}
```

The media query rule sets the table's `text-wrap` property to `no-wrap` at a maximum screen width of `992px`. Find more about media queries [here.](https://www.freecodecamp.org/news/media-queries-width-ranges/)

```css
@media only screen and (max-width: 992px) {
	table {
		white-space: nowrap;
	}
}
```

### Working on the table component

```javascript
import React from "react";
import { useTable } from "react-table";
import styled from "styled-component";

const TableContainer = styled.div`
  ...
`;

const Table = ({ columns, data }) => {
	const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
		useTable({ columns, data });

	return (
		<TableContainer>
			<table {...getTableProps()}>
				<thead>
					{headerGroups.map((headerGroup, index) => (
						<tr {...headerGroup.getHeaderGroupProps()} key={index}>
							{headerGroup.headers.map((column, index) => (
								<th key={index} {...column.getHeaderProps()}>
									{column.render("Header")}
								</th>
							))}
						</tr>
					))}
				</thead>
				<tbody {...getTableBodyProps()}>
					{rows.map((row, index) => {
						prepareRow(row);
						return (
							<tr {...row.getRowProps()}>
								{row.cells.map((cell) => {
									return (
										<td {...cell.getCellProps()} key={index}>
											{cell.render("Cell")}
										</td>
									);
								})}
							</tr>
						);
					})}
				</tbody>
			</table>
		</TableContainer>
	);
};
export default Table;
```

Let us break the component above into smaller chunks.

- The snippet below illustrates the process of creating the table instance using the `useTable()` hook from the `react-table` library.

```javascript
import { useTable } from "react-table";
  const Table = ({ columns, data }) => {
    const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      rows,
      prepareRow
    } = useTable({ columns, data, });

    return (
     ...
    );
}

export default Table;
```

We passed `columns` and `data` as props to the `useTable()` hook because it must function correctly.

- The destructuring assignment of the `useable()` function gives us access to the table’s instance methods.

```javascript
const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
	useTable({ columns, data });
```

The props are also required to be memoized. This process can be done with the use of the `useMemo()` hook. We will get to the reasons why in the next section.

- The `getTableProps()` is among the methods of the table instance we created with the `useTable()` Hook. Notice how we passed it as an attribute to the `<table>` element. That syntax `(…)` is called the `spread operator`.

```js
const Table = ({ columns, data }) => {
  const { ... } = useTable({ columns, data, });
    return (
      <TableContainer>
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup, index) => (
              <tr {...headerGroup.getHeaderGroupProps()} key={index}>
                {headerGroup.headers.map((column, index) => (
                  <th key={index} {...column.getHeaderProps()}>
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
           ...
        </table>
      </TableContainer>
    );
};

export default Table;
```

When we apply `…getTableProps()` as an attribute to the `table` element, we are making the other properties of this method (the `getTableProps()` method) to be accessible for us.

That is why we can do something like this:

```js
<thead>
	{headerGroups.map((headerGroup, index) => (
		<tr {...headerGroup.getHeaderGroupProps()} key={index}>
			{headerGroup.headers.map((column, index) => (
				<th key={index} {...column.getHeaderProps()}>
					{column.render("Header")}
				</th>
			))}
		</tr>
	))}
</thead>
```

Let us take a look at this example below which illustrates the process of a spread operation.

```js
// a daughter array with an object in it
// showing the properties of this person
let daughter = [
	{
		firstname: "Bola",
		lastname: "Jones",
		hair_color: "black",
		role: "daughter",
	},
];

// a family array showing the list of members
// in a family and their properties.
let family = [
	{
		firstname: "Dapo",
		lastname: "Jones",
		hair_color: "black",
		role: "Father",
	},
	{
		firstname: "Teni",
		lastname: "Jones",
		hair_color: "red",
		role: "Mother",
	},
	...daughter,
];

console.log(family);
```

With the spread operator, the `daughter` array is added to the `family` array. It can be accessed by looping through the array with the `map()` function or using the array syntax.

```js
console.log(family[2].role); // prints daughter to the console
```

To learn more about the spread operator, click [here](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax).

To also learn more about the methods associated with the table instance, click [here](https://github.com/skyfriends/react-table-hooks/blob/master/docs/api.md).

### The index page component
In the previous sections, we looked at the contents of each component, the function that they all perform, the `useTable()` hook and the spread operator's functions, and how the table instance methods work behind the scenes.

In this section, we will be covering the final steps of this process.

First, we will be importing the `Table` component into `pages/index.js` and adding a custom scrollbar visible on desktop modes.

Let us get started.

We are importing the `COLUMNS` module alongside the `tableData` from their respective files:

```js
import React from "react";
import styled from "styled-components";
import Table from "../../components/Table";
import { COLUMNS } from "../../src/Columns";
import tableData from "../../src/table_data.json";
```

Now, let us look at the styled component that is wrapping the index page; we will also go over the function of some essential style blocks.

```javascript
import styled from "styled-components";

const TableWrapper = styled.section`
  padding: 0 150px 0 150px;
  padding-bottom: 130px;

  h1 {
    text-align: center;
    color: #000;
    font-size: 36px;
    font-weight: 900;
    padding: 50px 0 0 0;
  }
  .table-container {
    height: 700px;
    overflow: auto;
  }
  .table-container::-webkit-scrollbar {
    width: 10px;
  }
  .table-container::-webkit-scrollbar-thumb {
    height: 4px;
    background: #3c1742;
    border-radius: 10px;
  }
  .table-container::-webkit-scrollbar-track {
    border: 1px solid #3c1742;
    border-radius: 10px;
  }
  @media only screen and (max-width: 992px) {
    padding: 0 15px 0 15px;
    padding-bottom: 130px;

    .table-container::-webkit-scrollbar {
      display: none;
    }
  }
```

The snippet below represents the custom scrollbar style:

```css
.table-container::-webkit-scrollbar {
	width: 10px;
}
.table-container::-webkit-scrollbar-thumb {
	height: 4px;
	background: #3c1742;
	border-radius: 10px;
}
.table-container::-webkit-scrollbar-track {
	border: 1px solid #3c1742;
	border-radius: 10px;
}
```

The snippet below makes the table responsive on mobile and desktop screens. However, on mobile screens, the custom scrollbar is hidden.

```css
.table-container {
	height: 700px;
	overflow: auto;
}

@media only screen and (max-width: 992px) {
	.table-container::-webkit-scrollbar {
		display: none;
	}
}
```

Now that we understand the styles, let us look at the primary component that renders the complete data on the UI.

```js
import React from "react";
import { COLUMNS } from "../../src/Columns";
import tableData from "../../src/table_data.json";
import styled from "styled-components";

const TableWrapper = styled.section``;

const UserTable = () => {
	return (
		<TableWrapper>
			<h1>Leaderboard</h1>
			<div className="table-container">
				<Table
					columns={React.useMemo(() => COLUMNS)}
					data={React.useMemo(() => tableData)}
				/>
			</div>
		</TableWrapper>
	);
};

export default UserTable;
```

You notice how we passed the `columns` and `data` props to the `Table` component, and how we assigned their values to the `useMemo()` hook.

The `useMemo()` ensures that the data is not re-created at every render.

If we do not set it that way, `react-table` will think it is receiving new data, which would result in recompiling the code, which intern leads to poor performance.

Here is the outcome of the project:

![a demo of the react-table project](/engineering-education/data-visualization-with-tables-in-react/react-table.gif)

I hope this article guided you well on how to visualize data on a table in React.

### Conclusion
This article provided a head-start on working with data tables in React.

We developed an application using react and implemented the `react-table` library to demonstrate the concept.

Working on this project should be an insight into building responsive data tables in react.

---
Peer Review Contributions by: [Jerim Kaura](/engineering-education/authors/jerim-kaura/)
