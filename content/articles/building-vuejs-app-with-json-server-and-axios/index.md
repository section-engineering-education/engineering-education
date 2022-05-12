---
layout: engineering-education
status: publish
published: true
url: /building-vuejs-app-with-json-server-and-axios/
title: Building a Vue 3 Application with JSON Server and Axios
description: This tutorial will show you how to build a Vue.js 3 application with JSON server and Axios.
author: terrypha-wamaitha
date: 2022-01-02T00:00:00-04:15
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/building-vuejs-app-with-json-server-and-axios/hero.jpg
    alt: Building a Vue.js 3 application with JSON server and Axios
---
Vue is a front-end JavaScript framework used to create single-page apps that run on the client-side. It can also be used to create full-stack applications by making HTTP requests to a backend server. It is popular with Node.js and the Express(MEVN stack).
<!--more-->
[JSON server](https://www.npmjs.com/package/json-server) is an npm package that lets you create mock REST APIs with zero coding. It is used to create a simple JSON file that can be used as a database and responds to HTTP requests.

[Axios](https://www.axios.com/) is the HTTP client that we will use to make HTTP requests to the JSON server.

In this article, we will build a shopping list application. We will start with a blank Vue.js application, then add the JSON server for local data storage, and Axios for making HTTP requests:

![shopping-list](/engineering-education/building-vuejs-app-with-json-server-and-axios/shopping-list.png)

### Table of contents
- [Prerequisites](#prerequisites)
- [Creating a new Vue.js application](#creating-a-new-vuejs-application)
- [Setting up the JSON server](#setting-up-the-json-server)
- [Getting HTTP data within our application](#getting-http-data-within-our-application)
- [Adding data using a POST request](#adding-data-using-a-post-request)
- [Updating data using a PATCH request](#updating-data-using-a-patch-request)
- [Deleting data using a DELETE request](#deleting-data-using-a-delete-request)
- [Conclusion](#conclusion)

### Prerequisites
To follow along with this tutorial, you are required to have the following:
- [Node.js](https://nodejs.org/en/download/package-manager/) installed.
- Some JavaScript knowledge.

### Creating a new Vue.js application
Assuming you have installed Node on your computer, run the following commands in your terminal to install Vue CLI:

```bash
$ npm install -g @vue/cli
```

After the installation, create a new project using:

```bash
$ vue create shopping-list 
```

Navigate to the `shopping-list` folder and open the project in your preferred code editor. If you are using VS Code, run the following command to open the project in VS Code:

```bash
$ cd shopping-list
$ code .
```

Then run the following command to start the Vue.js application:

```bash
$ npm run serve
```

The application will run on `http://localhost:8080/` in the browser. You should now see the default Vue homepage running in your browser.

### Setting up the JSON server
Let's now create a simple JSON file that will be used as a database.

Inside our `shopping-list` directory, create a file named `data.json`:

```bash
$ touch data.json
```

Let's add the following data in the file:

```json
{
  "items":[
      {
      "id":0,
      "name":"Carrots"
      },
      {
      "id":1,
      "name":"Cabbage"
      },
      {
      "id":2,
      "name":"Banana"
      },
      {
      "id":0,
      "name":"Cakes"
      }
  ]
}
```

We have created a shopping list object containing a list of items together with their IDs. To use this data in our application, we need to use `json-server`. Run the following command to install the package:

```bash
# Install json-server globally
$ npm install json-server -g 
$ json-server data.json
```

The command `json-server` will start a server using the data in our `data.json` file.

By default, the server runs on localhost port 3000. If you navigate to `http://localhost:3000/items` in your browser,  you should get the JSON response from the server.

### Getting HTTP data within our application
To access the data in our application, we need to use the HTTP client `Axios`.

Let's install the package:

```bash
$ npm install axios
```

After the installation, we can now import `axios` in our application. 

In our `App.vue`, let's remove everything inside the template, script, and style tags. Add the following code:

```vue
<template>
  <div id="app">
    <h1>Shopping List</h1>
  </div>
  <ul>
    <li v-for="item of items" :key="item.id">
      {{ item.name }}
    </li>
  </ul>
</template>
<script>
import axios from "axios";
export default {
  name: "App",
  data() {
    return {
      items: [],
    };
  },
  async created() {
    try {
      const res = await axios.get(`http://localhost:3000/items`);
      this.items = res.data;
    } catch (error) {
      console.log(error);
    }
  },
};
</script>
<style>
#app {
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
li {
  list-style: none;
}
</style>
```

Let's explain the code above.

```javascript
import axios from "axios";
```

Here, we have imported Axios that will help us access the data in the `data.json` file.

We have utilized the [async and await](https://www.javascripttutorial.net/es-next/javascript-async-await/) mechanism, which builds on promises and allows you to construct asynchronous code.
```javascript
async created() {
    // ...
}
```

Here, we have used the `created()` hook which will be used for fetching data from backend API and setting it to data properties. The `async` keyword is pre-pended on the `created()` function to show that the function will make use of promises and we’ll be using it to wait and pause execution until data from the server is resolved.

```javascript
try {
   const res = await axios.get(`http://localhost:3000/items`);
}
```

We have used `try/catch` blocks to catch errors. The `try` block is used to get the data from the server while `catch` is used to handle the error if one occurs. 

### Adding data using a POST request
You can make `POST`, `PUT`, `PATCH` or `DELETE` requests to the database using Axios.

`POST` is an HTTP method used to create or add data to the database. In our methods, let's add the `addItem` function to add an item to our shopping list:

```vue
<template>
  <div id="app">
    <h1>Shopping List</h1>
    <input v-model="itemName" type="text" /><br />
    <button @click="addItem()">Add Item</button>
  </div>
  <ul>
    <li v-for="item of items" :key="item.id">
      {{ item.name }}
    </li>
  </ul>
</template>
<script>
import axios from "axios";
export default {
  name: "App",
  data() {
    return {
      items: [],
      itemName: "",
    };
  },
  async created() {
    try {
      const res = await axios.get(`http://localhost:3000/items`);
      this.items = res.data;
    } catch (error) {
      console.log(error);
    }
  },
  methods: {
    async addItem() {
      const res = await axios.post(`http://localhost:3000/items`, {
        name: this.itemName,
      });
      this.items = [...this.items, res.data];
      this.itemName = "";
    },
  },
};
</script>
```

![adding input area and a button](/engineering-education/building-vuejs-app-with-json-server-and-axios/shopping1.png)

Here, we have added an input area and a button. We have also added `addItem()` method that is called once you click the button to add the item. The JSON server handles the `id` property by incrementing it by 1 automatically. We are then setting the new items to contain every item element, and then adding the item to the end of the list.

### Updating data using a PATCH request
We can use the `PATCH` method to update one value in an object. We will be striking out the items we already bought by adding the following function to our methods:

```javascript
async boughtItem(id) {
    try {
        await axios.patch(`${`http://localhost:3000/items`}/${id}`, {
            boughtItem: true
        });
        this.items = this.items.map(item => {
            if (item.id === id) {
                item.boughtItem = true;
            }
            return item;
        });
    } catch (error) {
        console.error(error);
    }
}
```

### Deleting data using a DELETE request
The `DELETE` method is a request used to delete specific data in an HTTP server.

We can add the delete functionality by adding the following function to our methods:

```javascript
removeItem(id) {
    axios.delete(`http://localhost:3000/items/${id}`)
    this.items = this.items.filter(item => item.id !== id)
}
```

After adding the two methods to our `App.vue`, we should have the following code:

```vue
<template>
  <div class="container">
    <div id="app">
      <h1>Shopping List</h1>
      <input v-model="itemName" @keyup.enter="addItem" type="text" /><br />
      <button @click="addItem()">Add Item</button>
    </div>
    <ul>
      <li
        v-for="item of items"
        :class="{ bought: item.bought }"
        :key="item.id"
        @click="boughtItem(item.id)"
        @dblclick="removeItem(item.id)"
      >
        {{ item.name }}
      </li>
    </ul>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "App",
  data() {
    return {
      items: [],
      itemName: "",
    };
  },
  async created() {
    try {
      const res = await axios.get(`http://localhost:3000/items`);
      this.items = res.data;
    } catch (error) {
      console.log(error);
    }
  },
  methods: {
    async boughtItem(id) {
      await axios.patch(`http://localhost:3000/items/${id}`, {
        bought: true,
      });
      this.items = this.items.map((item) => {
        if (item.id === id) {
          item.bought = true;
        }
        return item;
      });
    },
    //on double clicking the item, it will call removeItem(id) method
    removeItem(id) {
      axios.delete(`http://localhost:3000/items/${id}`);
      this.items = this.items.filter((item) => item.id !== id);
    },
    //method for adding items in the list
    async addItem() {
      const res = await axios.post(`http://localhost:3000/items`, {
        name: this.itemName,
      });
      this.items = [...this.items, res.data];
      this.itemName = "";
    },
  },
};
</script>
```

Let's explain the code above.

```html
<li
    v-for="item of items"
    :class="{ bought: item.bought }"
    :key="item.id"
    @click="boughtItem(item.id)"
    @dblclick="removeItem(item.id)"
>
```

Here, we have used the `@click` and `@dblclick` directives to listen to DOM events and run some JavaScript when they’re triggered. When the user clicks on an item, the `boughtItem` function is called. This will update the `done` property of the selected item to true in the API. When the user double clicks on an item, the `removeItem` method is called, removing the item.

To make our application a little less bare, add the following style to your `App.vue` file:

```css
<style>
#app {
  text-align: center;
  color: #2c3e50;
}
.container {
  background-color: #24e02dd2;
  max-width: 400px;
  margin: 0 auto;
  border-radius: 8px;
}
li {
  font-size: 1.5rem;
  list-style: none;
}
button {
  margin-top: 5px;
  background-color: #3498db;
  border: none;
  color: #ffffff;
  padding: 10px 20px;
  font-size: 14px;
  cursor: pointer;
  border-radius: 4px;
}
input {
  margin-top: 5px;
  padding: 10px 20px;
  font-size: 14px;
  border-radius: 4px;
}
.bought {
  text-decoration: line-through;
}
</style>
```

In your browser, you should see the application with the list of items. The items should be struck out when you click on them and deleted when you double click on them.
![shopping-list](/engineering-education/building-vuejs-app-with-json-server-and-axios/shopping-list.png)

Here is my [GitHub repo](https://github.com/Terripha/shopping-list) containing fully working code.

### Conclusion
In this article, we used `json-server` to create an API that you can consume using Axios and Vue 3.0. We used `GET`, `POST`, `PATCH`, `DELETE` HTTP methods to interact with the API. Axios is recommended for more sophisticated requests since it enables different settings of numerous requests in one location.

### Further reading
- [Introduction to Vue.js - Vuejs docs](https://vuejs.org/v2/guide/)
- [Getting started with Axios - Axios docs](https://axios-http.com/docs/intro)
- [Introduction to JSON Server - Zetcode.com](https://zetcode.com/javascript/jsonserver/)

Happy coding!

---
Peer Review Contributions by: [Geoffrey Mwangi](/engineering-education/authors/geoffrey-mwangi/)