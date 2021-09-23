Working with tables in React has always been a burden for a very long time now.

issues related to the styling, responsiveness and the proper rendering of data on tables has been encountered by developers whenever they're trying to render a lot of data onto the UI of a web-application

In this article, we will look at an approach that would enable us to properly visualize data in tables with an npm package, called react-table. It is a library that focuses on the React Hooks pattern, therefore abstracting the need to create or hardcode HTML table elements.

### Prerequisites

Before you read this article any further, you should have the fundamental knowledge of:

- React, a JavaScript framework used for creating single page applications
- The JavaScript spread operator,
- PropTypes validation in React,
- Props handling in React,
- React Hooks,
- Styled Components.

### Getting Started

The scope of this article is around the react framework called Nextjs. We can also use create-react-app to build this project, so there’s no need to fret.

Let’s start by installing the dependencies that we need in this project. We’d start by creating a nextjs app. The command below does that for us.

```bash
    npx create-next-app [your-app-name]
```

The file structure of a nextjs app is quite different from `create-react-app`'s file architecture.

We’ll only be interacting with the files that we need in this project, so we don’t end up getting overwhelmed.

Let’s take a look at the files we’d be interacting with, below.

```md
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

Now, that we are familiar with the file structure above. Let us continue by installing the `styled-component` and `react-table` package. The command below does that for us.

```bash
npm install styled-component react-table
```

### An overview of the components and files

Let us take a look at the components and the roles that they perform. We’ll start from the top (i.e. from the `pages` folder) to the bottom.

- `_app.js`: is the root file of the codebase. It looks similar to the `index.js` file in `create-react-app`. Here, you can:

  - apply any global style(s),
  - add new themes,
  - provide context to the whole application, and
  - even import the redux provider context to manage the state of your application (if you are using redux).

```javascript
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

The code snippet above shows what `_app.js` looks like, for the scope of this article. Upon opening it for the first time, this is what it looks like below:

```javascript
function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
```

In the first `_app.js` snippet, the `Head` component gets imported from `"next/head"`. This component performs the same function that the normal HTML `<head>` element does.

In the `Head` component, we can add different child elements like the `<title>` element that describes the current route or page, the `<link>` element that imports stylesheets or set the page’s favicon, the `<meta>` tags, for SEO, and so on.

- `index.js`: is our default route. Anything we do in the file gets displayed at this address: `https://localhost:3000/` when we run the command that opens our dev server.

```bash
npm run dev
```

- `Table.js`: is the component that holds the UI of the data that we’ll be mapping from `data.json` and `columns.js`

- `data.json`: holds the array of user objects that we’ll be rendering in the `Table` component. We’d be making use of the data copied from Jsonplaceholder user API, instead of writing the API calls by ourselves.

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
  // the remaining user objects falls below
];
```

We’re reducing the number of user objects in the array so that this article can be brief. If you want to make use of all the objects, you can get them [here](https://jsonplaceholder.typicode.com/users). The API endpoint provides a list of ten user objects in the array per API call, so you can grab them there.

- `columns.js`: is also an array of objects that stores the items we want to render on the table’s header.

```javascript
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

Notice how we declared the `accessor` key in the objects? The `accessor` is more like the locator of the property that is in `src/data.json`. Let’s compare both objects below:

```javascript
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

In the last section, we installed the necessary dependencies that we need in our nextjs app.

we have also seen the contents of the files that hold the table’s data and how they function.

In this section, we’re going to start having a look at the content of `Table.js` in the `component` folder below.

```javascript
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

The table component above focuses on the style of the table. Let’s take a look at some of the properties below:

The `table` selector sets the width and height of the table to `100%`, making it responsive to receive more columns and rows.

```css
table {
  width: 100%;
  margin-top: 20px;
  height: 100%;
}
```

The media query rule set’s the `text-wrap` property of the table to `no-wrap` at a maximum screen width of `992px`. Click [here](https://www.freecodecamp.org/news/media-queries-width-ranges/) to learn more about media queries

```css
@media only screen and (max-width: 992px) {
  table {
    white-space: nowrap;
  }
}
```

### Now, unto the Table component itself.

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

Let’s break the component above into smaller chunks.

- The snippet below illustrates the process of creating the table instance using the `useTable()` hook from `react-table` library.

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

We passed `columns` and `data` as props to the `useTable()` hook because it is required for the hook to function properly.

- The destructuring assignment of the `useTable()` gives us access to the table’s instance methods.

```javascript
const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
  useTable({ columns, data });
```

The props are also required to be memoized, this can be done with the use of the `useMemo()` hook. We’ll get to the reasons why, in the next section.

- The `getTableProps()` is among the methods of the table instance we created with the `useTable()` Hook. Notice how we passed it as an attribute to the `<table>` element? That syntax `(…)` is called the spread operator.

```javascript
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

When we applied `…getTableProps()` as an attribute to the `table` element, we are making the other properties of this method (the `getTableProps()` method) to be accessible for us.

That is why we can do something like this:

```javascript
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

Let us take a look at this example below, that illustrates the process of a spread operation.

```javascript
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

With the spread operator, the `daughter` array is added to the `family` array. It can be accessed by looping through the array with the `map()` function or using the array syntax to access it.

```javascript
console.log(family[2].role); // prints daughter to the console
```

To learn more about the spread operator, click [here](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax). To also learn more about the methods associated with the table instance, click [here](https://github.com/skyfriends/react-table-hooks/blob/master/docs/api.md).

### Now, onto the index page component

![a relieved person gif](https://media.giphy.com/media/TydPOgdlcjYTAwGYLS/giphy.gif)

In the previous sections, we looked at:

- The contents of each component,
- The function that they all perform,
- The `useTable()` hook,
- The spread operator, its function and how the table instance methods works behind the scenes

In this section, we’ll be covering the final steps of this process. We’ll be importing the `Table` component into `pages/index.js` and also work on adding a custom scrollbar that will be visible on desktop modes.

Let’s get started. We are importing the `COLUMNS` module, alongside the `tableData` from their respective files

```javascript
import React from "react";
import styled from "styled-components";
import Table from "../../components/Table";
import { COLUMNS } from "../../src/Columns";
import tableData from "../../src/table_data.json";
```

Now, let us take a look at the styled component that is wrapping the index page, we’ll also go over the function of some important style blocks.

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
`;
```

The snippet below represents the custom scrollbar style

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

This snippet below, makes the table to be responsive on mobile and desktop screens. But, on mobile screens the custom scrollbar is hidden, so it doesn’t display on the UI.

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

Now, that we have an understanding of the styles, let’s have a look at the main component that renders the complete data on the UI.

```javascript
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

Notice how we passed the `columns` and `data` props to the `Table` component and how we assigned their values to the `useMemo()` hook?

The `useMemo()` ensures that the data isn’t re-created at every render (i.e. whenever the component is mounted to the DOM).

If we don’t set it that way, `react-table` will think it is receiving new data which would result in recompiling the code, which leads to poor performance.

### Conclusion

Here’s the outcome of what we’ve been working on. I hope this article has helped you gain knowledge on how to visualize data on a table in React.

![a demo of the react-table project](react-table.gif)

Thank you for reading this article. Kindly share it with your peers too. Happy coding.
