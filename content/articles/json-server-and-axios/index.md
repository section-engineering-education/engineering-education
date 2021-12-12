### Introduction
Vue is a front-end JavaScript framework used to create single-page apps that run on the client but can be used to create full-stack applications by making HTTP requests to a backend server. It is popular with Node.js and Express(MEVN stack).

JSON Server is an `npm` package that lets you create fake REST APIs with zero coding. It is used to create a simple JSON file that can be used as a database and responds to HTTP requests.

Axios is an HTTP client to make HTTP requests to the JSON Server.

In this article, we will build a shopping list application but start with a blank Vue.js application then add `json-server` for local data storage, and Axios for making HTTP requests.

### Table of contents
- [New Vue.js application](#new-vuejs-application)
- [Creating a JSON file and installing JSON-Server](#creating-a-json-file-and-installing-json-server)
- [Getting HTTP data within our application](#getting-http-data-within-our-application)
- [Adding data using POST](#adding-data-using-post)
- [Updating data using PATCH](#updating-data-using-patch)
- [Deleting data using DELETE](#deleting-data-using-delete)

### Prerequisites
To follow along with this tutorial, you are required to have the following:
- [Node.js](https://nodejs.org/en/download/package-manager/) installed
- Some knowledge of JavaScript

### New Vue.js application
Assuming you have installed [Node.js](https://nodejs.org/en/download/package-manager/) in your computer, run the following commands in your terminal to install Vue CLI:

```bash
#Install Vue.js CLI globally
$ npm install -g @vue/cli
```

After the installation, create a new project using:

```bash
$ vue create shopping-list 
```

Navigate to the folder and open the project in your favorite editor. e.g VS Code:

```bash
$ cd shopping-list

# open project in vs code
$ code .
```

Run the following command to start the Vue.js application:

```bash
$ npm run serve
```

Our application will run on `http://localhost:8080/` in the browser. We should now have a blank Vue.js project running on our browser.

### Creating a JSON file and installing JSON Server
We can now create a simple JSON file that can be used as a database. Inside our shopping-list directory, let's create a file named `data.json`:

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

From the code above, we have created a shopping list but we need to install `json-server` and start it:

```bash
#Install json-server globally
$ npm install json-server -g 

#Inside your working directory, start the JSON Server
$ json-server data.json
```

If we type `http://localhost:3000/items` in our browser, we should see our shopping list in the database.

### Getting HTTP data within our application
First, we need to install `axios` in our project to access the data in the `data.json` file:

```bash
npm install axios
```

After the installation, we can now import `axios` in our application. Inside App.vue, add the following code:

```vuejs
<template>
 <div id="app">
   <h1>Shopping List</h1>
 </div>
 <ul>
   <li v-for="item of items" :key="item.id">
     {{item.name}}
   </li>
 </ul>
</template>

<script>
import axios from 'axios'

export default {
  name: 'App',
  data () {
    return {
      items: []
    }
  },
  async created (){
    try {
      const res = await axios.get(`http://localhost:3000/items`)
      this.items = res.data;
    } catch (error) {
      console.log(error)
      }
  },
}
</script>

<style>
#app {
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
li {
  list-style:none;
}
</style>

```

From the above code, we're utilizing the [async and await](https://www.javascripttutorial.net/es-next/javascript-async-await/) keywords, which build on promises and allow you to construct asynchronous code.

### Adding data using `POST`
You can make `POST`, `PUT`, `PATCH` or `DELETE` requests to the database using Axios.

`POST` is method of HTTP used to create or add data in the database. In our project, let's add `POST` method to add an item in our shopping list:

```vuejs
<template>
 <div id="app">
   <h1>Shopping List</h1>
   <input v-model="itemName"  type="text"><br>
   <button @click="addItem()">Add Item</button>
 </div>
 <ul>
   <li v-for="item of items" :key="item.id">
     {{item.name}}
   </li>
 </ul>
</template>

<script>
import axios from 'axios'

export default {
  name: 'App',
  data () {
    return {
      items: [],
      itemName: ''
    }
  },
  async created (){
    try {
      const res = await axios.get(`http://localhost:3000/items`)
      this.items = res.data;
    } catch (error) {
      console.log(error)
      }
  },
  methods: {
    async addItem () {
        const res = await axios.post(`http://localhost:3000/items`,{name: this.itemName})
          this.items = [...this.items,res.data]
          this.itemName = ''
        }
  }
}
</script>

<style>
#app {
  text-align: center;
  color: #2c3e50;
}
li {
  list-style:none;
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
input{
  margin-top: 5px;
  padding: 10px 20px;
  font-size: 14px;
  border-radius: 4px;
}
</style>
```

Here, we have added an input area and a button. We have also added `addItem()` method that is called once you click the button to add the item. JSON Server handles `id` property by incrementing it by 1 automatically. We are then setting the new items to contain every item element, and then add the item to the end of the list.

### Updating data using `PATCH`
We use the `PATCH` method to update one value in an object. We will be striking out the items we already bought by adding the following code in the methods field:

```js
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

### Deleting data using `DELETE`
`DELETE` method is a request used to delete a specific data in a server. We can do this by adding the following code in the methods field:

```js
removeItem(id) {
      axios.delete(`http://localhost:3000/items/${id}`)
      this.items = this.items.filter(item => item.id !== id)
    }
```

Let's add the above two methods in our `App.vue`:

```vuejs
<template>
<div class="container">
 <div id="app">
   <h1>Shopping List</h1>
   <input v-model="itemName" @keyup.enter="addItem"  type="text"><br>
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
     {{item.name}}
   </li>
 </ul>
</div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'App',
  data () {
    return {
      items: [],
      itemName: ''
    }
  },
  async created (){
    try {
      const res = await axios.get(`http://localhost:3000/items`)
      this.items = res.data;
    } catch (error) {
      console.log(error)
      }
  },
  methods: {
    async boughtItem(id) {
  await axios.patch(`http://localhost:3000/items/${id}`,{ 
    //patch is a method that allows you to update a specific item in the database
    //in our case, we are updating the bought property of the item by striking a line on clicking the item on our list  
          bought: true
        });
        this.items = this.items.map(item => {
          if (item.id === id) {
            item.bought = true;
          }
          return item;
        });
    },
    //on double clicking the item, it will call removeItem(id) method
    removeItem(id) {
      axios.delete(`http://localhost:3000/items/${id}`)
      this.items = this.items.filter(item => item.id !== id)
    },
    //method for adding items in the list
    async addItem () {
        const res = await axios.post(`http://localhost:3000/items`,{name: this.itemName})
          this.items = [...this.items,res.data]
          this.itemName = ''
        }
  },
}
</script>

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
  list-style:none;
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
input{
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

In your browser, you should see the application with the list of items. You can see that the items are striked out when you click on them and deleted when you double click on them:

![shopping-list](/engineering-education/json-server-and-axios/shopping-list.png)

### Conclusion
In this article, we used `json-server` to create an API that you can consume using Axios and Vue 3.0. We used methods like `GET`, `POST`, `PATCH`, `DELETE` to interact with the API. Axios is recommended for more sophisticated requests since it enables different settings of numerous requests in one location.
