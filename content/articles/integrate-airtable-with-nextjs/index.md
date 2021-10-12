---
layout: engineering-education
status: publish
published: true
url: /integrate-airtable-with-nextjs/
title: Integrating Airtable with Next.js
description: In this article we will going over how to build a grocery list application using Nextjs and Airtable.
author: giridhar-talla
date: 2021-10-12T00:00:00-15:30
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/integrate-airtable-with-nextjs/hero.png
    alt: Nextjs Airtable
---
In this article, we will build a grocery list application where we can add all our groceries before visiting the store. We will be building the front-end of the application using [Next.js](https://nextjs.org/), a [React](https://reactjs.org/) framework. We will use [tailwindcss](https://tailwindcss.com/) to style our application. The database solution we will use is [Airtable](https://airtable.com/).

<!--more-->
Over the past few years, browsers have evolved and became more powerful. They can work with full functionality even without a single web server. Once can take advantage of browser capabilities when building flexible web applications. 

[JAMstack](https://jamstack.org) is the modern approach when building lightning-fast web applications. Database technologies became more user-friendly. In this tutorial, we'll learn how to integrate the Airtable API with a simple web application.

### What we're going to build?
The final application will look like this:

![final-grocery-list](/engineering-education/integrate-airtable-with-nextjs/final.png)

You can find the final demo on replit [Final demo](https://replit.com/@giridhar7632/grocery-list) | [source code](https://grocery-list.giridhar7632.repl.co/)

Before diving into the tutorial, the reader should have intermediate knowledge of React. It would help if the reader were comfortable using [React Hooks](https://reactjs.org/docs/hooks-intro.html) and [Context API](https://reactjs.org/docs/context.html).

### The JAM stack and Airtable
The **JAMstack** combines [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript), [APIs](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Client-side_web_APIs/Itemduction), and [Markup](https://developer.mozilla.org/en-US/docs/Glossary/markup) for developing fast and scalable web applications. The JAMstack website employs third-party APIs to get data.

You will use serverless functions when communicating with Airtable. [Airtable](https://try.airtable.com/database) is a spreadsheet and database hybrid that you can easily integrate into your application using its excellent API. 

Airtable API has wonderful documentation. The example code contains all your API keys and base names. To use them in your application, you can copy and paste the code. 

You can find the Airtable API documentation here: [https://airtable.com/api](https://airtable.com/api).

### Getting started
Open your favorite code editor and run the command `npx create-next-app -e with-tailwindcss`. It generates a Next.js application that has tailwindcss installed. 

Install Airtable using the command: `npm install airtable`. To verify that everything is working, try running the command: `npm run dev`. You're good to go if you see it render normally.

Next.js supports server-side rendering without the use of any other frameworks. It includes a router that allows you to access any file in the `/pages` directory as a new route. Within the `/pages/api` directory, you can create API endpoints using serverless functions.

### Airtable JavaScript setup
Head over to [airtable.com](https://airtable.com/) and sign up for a free account. After you sign in successfully, create a new `base` starting from scratch. The `base` is what airtable refers to as a database. 

You'll have a starter table created with some primary fields. You can personalize the entire base; start with the base's title and the table's name. 

You can see that the user interface is amicable, and you can work in the same way you would in a spreadsheet. By right-clicking on a field in the table, you can customize it. 

You'll need an `item` field for the grocery name and a `brought` checkbox field. Navigate to [Airtable API](https://www.airtable.com/api/) and select the base you'd like to integrate.

Let's connect Airtable to our app, but first, let's define a few variables that you will need in the code:
- `API_KEY`: the Airtable API key. You can find it within the documentation or on your [account](https://airtable.com/account) page.
- `BASE_ID`: the id of the base you want to integrate. You can find it on the documentation page.
- `TABLE_NAME`: the name of the table in that base (you can use a single base for multiple tables).

Add all these secrets in your application's environment variables (`.env` file). Make sure you ignore them if you're using version control. Learn more about [environment variables](https://www.twilio.com/blog/2017/08/working-with-environment-variables-in-node-js.html).

```bash
/.env

AIRTABLE_API_KEY=
AIRTABLE_BASE_ID=
AIRTABLE_TABLE_NAME=
```

### Connecting to Airtable
Create a new `Airtable.js` file. I prefer to create it inside a new `utils` folder under the `root` directory; you can create it wherever you want. 

Add the following code:

```js
const Airtable = require("airtable");

// Authenticate
Airtable.configure({
  apiKey: process.env.AIRTABLE_API_KEY,
});

// Initialize a base
const base = Airtable.base(process.env.AIRTABLE_BASE_ID);

// Reference a table
const table = base(process.env.AIRTABLE_TABLE_NAME);

export { table };
```

The code above establishes a connection with the Airtable base. It first authenticates you using your `API_KEY`. Then all you have to do is initialize a base and reference the table you need.

### Building an API using Next.js
Next.js allows you to create your own API using [API routes](https://nextjs.org/docs/api-routes/itemduction). Next.js maps any file inside the `/pages/api` folder to `/api/*`, an API endpoint instead of a route. 

For example, the boiler-plate code comes with a simple API endpoint `/api/hello` ([see more on API routes](https://nextjs.org/docs/api-routes/itemduction)).

You can handle any request that hits the endpoint using serverless functions ([what are serverless functions?](https://vercel.com/docs/serverless-functions/introduction)). It has read and write access to the request and response objects. You can handle different types of requests with a single function using a conditional block. 

But in this project, we are going to create a separate file when handling each request. However, it is not the best practice for developing an API (learn about API [best practices here](https://stackoverflow.blog/2020/03/02/best-practices-for-rest-api-design/)).

Now we are going to create an API to perform [CRUD operations](https://www.codecademy.com/articles/what-is-crud) with the Airtable database.

### Get the table records
The Airtable server returns a maximum of 100 records on a page at a time. If you know your table has no more than `100` items, you can use the `firstPage` method. If you have (or expect) more than 100 records, you should paginate through them using the `eachPage` method ([learn how to do it here](https://chinarajames.com/how-to-paginate-records-in-airtable-when-using-the-api/)).

Create a new file `items.js` file in `/pages/api` folder. 

Add the following code:

```js
import { table } from "../../utils/Airtable";

export default async (_req, res) => {
  try {
    const records = await table.select({}).firstPage();
    res.status(200).json(records);
  } catch (error) {
    console.error(err);
    res.status(500).json({ msg: "Something went wrong! 😕" });
  }
};
```

The code above retrieves all the records that are on the first page (100 records). You will get a record that looks something like this with all the extra data. Another thing to note is that we get nothing in the `brought` field if it is `false`. So we have to add that manually.

```json
[
  {
    "_table": {
      "_base": { "_airtable": {}, "_id": "AIRTABLE_BASE_ID" },
      "id": null,
      "name": "AIRTABLE_BASE_NAME"
    },
    "id": "RECORD_ID",
    "_rawJson": {
      "id": "RECORD_ID",
      "fields": {
        "item": "item name",
        "brought": false
      },
      "createdTime": "2021-08-08T13:28:29.000Z"
    },
    "fields": {
      "item": "item name",
      "brought": false
    }
  }
]
```

You should map through all the records and get only the required information. Declare the function under `/utils/Airtable.js` and import it when you need it.

```js
// /utils/Airtable.js

// ...

// To get minified records array
const minifyItems = (records) =>
  records.map((record) => getMinifiedItem(record));

// to make record meaningful.
const getMinifiedItem = (record) => {
  if (!record.fields.brought) {
    record.fields.brought = false;
  }
  return {
    id: record.id,
    fields: record.fields,
  };
};

export { table, minifyItems, getMinifiedItem };
```

Import the `minifyItems` into the `items.js` for displaying minified items.

```js
import { table, minifyItems } from "../../utils/Airtable";

export default async (_req, res) => {
  try {
    const records = await table.select({}).firstPage();
    const minfiedItems = minifyItems(records);
    res.status(200).json(minfiedItems);
  } catch (error) {
    console.error(err);
    res.status(500).json({ msg: "Something went wrong! 😕" });
  }
};
```

### Create a new record
To create new records, you can use the `create` method. It takes an array of up to 10 record objects. Each of the record objects should have `fields` key with the contents. It returns an array of record objects created if the call succeeded.

Create a new file, `createItem.js` in the `/pages/api` folder, and add the following code.

```js
import { table, getMinifiedItem } from "../../utils/Airtable";

export default async (req, res) => {
  const { item } = req.body;
  try {
    const newRecords = await table.create([{ fields: { item } }]);
    res.status(200).json(getMinifiedItem(newRecords[0]));
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Something went wrong! 😕" });
  }
};
```

You can use [Postman](https://www.postman.com/) or something similar to send a request and test the endpoint.

![Creating a new item in airtable by sending raw data to createItem endpoint](/engineering-education/integrate-airtable-with-nextjs/create-req.png)

### Update a record
To update records, you can use the `update` or `replace` method. If you want to update a single field of a record, use the `update` method, or if you're going to replace it with a new record, use `replace` method. 

The `update` method is very similar to the `create` method. It takes an array of `id`s and `fields` up to `10` records and returns the array of updated records.

Create a new file `updateItem.js` in the `/pages/api` folder and add the following code.

```js
import { table, getMinifiedItem } from "../../utils/Airtable";

export default async (req, res) => {
  const { id, fields } = req.body;
  try {
    const updatedRecords = await table.update([{ id, fields }]);
    res.status(200).json(getMinifiedItem(updatedRecords[0]));
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Something went wrong! 😕" });
  }
};
```

Here, you are retrieving the record corresponding to the id and updating the fields with new values. You can test the endpoint by sending a request to the API using Postman.

![Updating an item in airtable by sending data to updateItem endpoint](/engineering-education/integrate-airtable-with-nextjs/update-req.png)

### Delete a record
You can delete a record using the `destroy` method. It takes an array of `id`s of the records you want to delete. You can also set the first parameter to a record ID to delete a single record. It returns the deleted record.

Create a new file `deleteItem.js` in the `/pages/api` folder and add the following code.

```js
import { table } from "../../utils/Airtable";

export default async (req, res) => {
  const { id } = req.body;
  try {
    const deletedRecords = await table.destroy([id]);
    res.status(200).json(deletedRecords);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Something went wrong! 😕" });
  }
};
```

![Deleting an existing item in airtable by sending a delete request to deleteItem endpoint](/engineering-education/integrate-airtable-with-nextjs/delete-req.png)

### Creating front-end
Now we have our API ready for all our CRUD operations. Let's create the interface to display this data in our Next.js application. Head over to the `index.js` file in your `/pages` directory and get rid of all the code in it. 

Add the following code:

```jsx
import Head from "next/head";

export default function Home() {
  return (
    <div className="container mx-auto my-6 max-w-xl">
      <Head>
        <title>@Grocery List</title>
      </Head>

      <main>
        <p className="text-2xl font-bold text-grey-800 py-2">🛒 Grocery List</p>
      </main>
    </div>
  );
}
```

The code above is nothing but a React functional component. Next.js has a built-in `Head` component that will act as the `head` tag of your HTML page. Now, if you start running the server, you will see your app. Tailwindcss is a class-based framework. You have to add the classes according to the styles you want, just like in [bootstrap](https://getbootstrap.com).

Next.js has a built-in function `getServerSideProps` used when enabling the server-side rendering inside a page. Next.js executes the code inside this function every time before rendering the page. 

Learn more on `getServersideProps` [here](https://nextjs.org/docs/basic-features/data-fetching###getserversideprops-server-side-rendering).

We will fetch all the items from the Airtable and then pass them to the `Home` component as [`props`](https://reactjs.org/docs/components-and-props.html) to use the data. Add the following function to your `index.js` page.

```jsx
import { table, minifyItems } from "../utils/Airtable";

export default function Home({ initialItems }) {
  console.log(initialItems);
  // ...
}

export async function getServerSideProps(context) {
  try {
    const items = await table.select({}).firstPage();
    return {
      props: {
        initialItems: minifyItems(items),
      },
    };
  } catch (error) {
    console.log(error);
    return {
      props: {
        err: "Something went wrong 😕",
      },
    };
  }
}
```

The above function gets all the records from the Airtable and passes them to `initialItems`. For now, see if it's working by just console logging the data.

### React context API to integrate airtable data
> Context provides a way to pass data through the component tree passing props down [manually at every level](https://reactjs.org/docs/context.html).

In large-scale projects, we have to use the data in many components. So it is a better idea to use React context instead of passing props. 

Create a new `context` folder and add a new `items.js` file. Here, we will perform all the operations on Airtable data and pass the data to the front-end.

```js
import { createContext, useState } from "react";

const ItemsContext = createContext();

const ItemsProvider = ({ children }) => {
  const [items, setItems] = useState();

  // for creating an item
  const addItem = async (item) => {
    try {
      // we will send a POST request with the data required to create an item
      const res = await fetch("/api/createItem", {
        method: "POST",
        body: JSON.stringify({ item }),
        headers: { "Content-Type": "application/json" },
      });
      const newItem = await res.json();
      // then we will update the 'items' adding the newly added item to it
      setItems((prevItems) => [newItem, ...prevItems]);
    } catch (error) {
      console.error(error);
    }
  };

  // for updating an existing item
  const updateItem = async (updatedItem) => {
    try {
      // we will send a PUT request with the updated information
      const res = await fetch("/api/updateItem", {
        method: "PUT",
        body: JSON.stringify(updatedItem),
        headers: { "Content-Type": "application/json" },
      });
      await res.json();
      // then we will update the 'items' by replacing the fields of existing item.
      setItems((prevItems) => {
        const existingItems = [...prevItems];
        const existingItem = existingItems.find(
          (item) => item.id === updatedItem.id
        );
        existingItem.fields = updatedItem.fields;
        return existingItems;
      });
    } catch (error) {
      console.error(error);
    }
  };

  // for deleting an item
  const deleteItem = async (id) => {
    try {
      // we will send a DELETE request to the API with the id of item we want to delete
      const res = await fetch("/api/deleteItem", {
        method: "Delete",
        body: JSON.stringify({ id }),
        headers: { "Content-Type": "application/json" },
      });
      await res.json();
      // them we will update the 'items' by deleting the item with specified id
      setItems((prevItems) => prevItems.filter((item) => item.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ItemsContext.Provider
      value={{
        items,
        setItems,
        updateItem,
        deleteItem,
        addItem,
      }}
    >
      {children}
    </ItemsContext.Provider>
  );
};

export { ItemsContext, ItemsProvider };
```

Follow the comments along with the code. Every time we operate, we have to send an `HTTP` request and update the local `items` list to avoid refetching data.

Now, open the `/pages/_app.js` file and import the `ItemsProvider`. You can only use the `ItemContext` when the component is a child of `ItemProvider`.

```jsx
// /pages/_app.js
import "tailwindcss/tailwind.css";
import { ItemsProvider } from "../context/items";

function MyApp({ Component, pageProps }) {
  return (
    <ItemsProvider>
      <Component {...pageProps} />
    </ItemsProvider>
  );
}

export default MyApp;
```

You can set the `items` in the `index.js` file. Pass the `initialItems` you have fetched before to the `setItems` function. It updates `ItemsContext`, and you can use the items in any component.

```jsx
// /pages/index.js

import React, { useContext, useEffect } from "react";
// ...
import { ItemsContext } from "../context/items";

export default function Home({ initialItems }) {
  const { items, setItems } = useContext(ItemsContext);

  useEffect(() => {
    setItems(initialItems);
  }, [initialItems, setItems]);

  // ...
}

// ...
```

### Displaying item
Create a new `Item.js` in the `components` folder. It takes a prop `item` and displays it on the webpage.

When adding update and delete functionality, you can import the required functions from `ItemsContext`. Here you can update the item as `brought` by checking the checkbox. You can delete the item if you don't need it by clicking the delete button.

```jsx
// /components/Item.js

import React, { useContext } from "react";
import { ItemsContext } from "../context/items";

const Item = ({ item }) => {
  // for updating and deleting item
  const { updateItem, deleteItem } = useContext(ItemsContext);

  // Update the record when the checkbox is checked
  const handleCompleted = () => {
    const updatedFields = {
      ...item.fields,
      brought: !item.fields.brought,
    };
    const updatedItem = { id: item.id, fields: updatedFields };
    updateItem(updatedItem);
  };

  return (
    <li className="bg-white flex items-center shadow-lg rounded-lg my-2 py-2 px-4">
      <input
        type="checkbox"
        name="brought"
        id="brought"
        checked={item.fields.brought}
        className="mr-2 form-chechbox h-5 w-5"
        onChange={handleCompleted}
      />
      <p
        className={`flex-1 text-gray-800 ${
          item.fields.brought ? "line-through" : ""
        }`}
      >
        {item.fields.item}
      </p>
      {/* delete item when the delete button is clicked*/}
      <button
        type="button"
        className="text-sm bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded"
        onClick={() => deleteItem(item.id)}
      >
        Delete
      </button>
    </li>
  );
};

export default Item;
```

Now, you can import the `Item` component and map through the array of items passing each item to this component.

```jsx
// /pages/index.js

// ...
import Item from "../components/Item";

export default function Home({ initialItems }) {
  // ...
  return (
    // ...
    <main>
      <ul>
        {items && items.map((item) => <Item key={item.id} item={item} />)}
      </ul>
    </main>
  );

  // ...
}

// ...
```

### Adding items
You can create a simple form to add items to the Airtable. Create a new file `ItemForm.js`. The `form` element in HTML is different from that in React when you submit the form.

```jsx
// /components/ItemForm.js

import React, { useState, useContext } from "react";
import { ItemsContext } from "../context/items";

const ItemForm = () => {
  const [item, setItem] = useState("");
  const { addItem } = useContext(ItemsContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    addItem(item);
    setItem("");
  };

  return (
    <form className="form my-6" onSubmit={handleSubmit}>
      <div className="flex justify-between w-full">
        <input
          type="text"
          name="item"
          value={item}
          onChange={(e) => setItem(e.target.value)}
          placeholder="ex. Eggs"
          className="flex-1 border border-gray-200 p-2 mr-2 rounded-lg appearance-none focus:outline-none focus:border-gray-500"
        />
        <button
          type="submit"
          className="rounded bg-blue-500 hover:bg-blue-600 text-white py-2 px-4"
        >
          + Add Item
        </button>
      </div>
    </form>
  );
};

export default ItemForm;
```

You should render the `ItemForm` component in `index.js`.

```jsx
// /pages/index.js

// ...
import ItemForm from "../components/ItemForm";

export default function Home({ initialItems }) {
  // ...
  return (
    // ...
    <main>
      <ItemForm />
      <ul>{/* ... */}</ul>
    </main>
  );

  // ...
}

// ...
```

Find the source code [here](https://replit.com/@giridhar7632/grocery-list).

### Deployment
Let's deploy this application using [vercel](https://vercel.com). I recommend using Vercel for deployment. It does not require any configuration and is free of cost for your personal projects. 

It supports all the features of Next.js with the best performance. Go to [vercel.com](https://vercel.com) and create an account. Push your project to a Git repository. Then import it to the vercel for deployment. See my deployment [here](https://airtable-item-app.vercel.app/).

### Next steps
Now that you have a complete JAMstack application, try extending its functionality:
- Use the API [best practices](https://stackoverflow.blog/2020/03/02/best-practices-for-rest-api-design/) when building a perfect API.
- Try to add a filtering option. You should show all the brought and pending separately.
- Try to add [Authentication](https://en.wikipedia.org/wiki/Authentication). If you add an item, everyone can see that one. You can use authenticate a user using third-party services like [Auth0](https://auth0.com/).

Happy coding!

### Resources
- [React documentation](https://reactjs.org/docs/context.html)
- [Learn more on React forms here](https://reactjs.org/docs/forms.html)
- [Learn more here](https://vercel.com/guides/deploying-nextjs-with-vercel###step-2:-deploying-your-next.js-project-with-vercel)

---

Peer Review Contributions by: [Adrian Murage](/engineering-education/authors/adrian-murage/)
