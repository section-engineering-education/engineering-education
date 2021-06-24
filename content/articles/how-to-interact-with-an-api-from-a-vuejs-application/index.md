---
layout: engineering-education
status: publish
published: true
url: /how-to-interact-with-an-api-from-a-vuejs-application/
title: How to Interact With an API from a Vue.js Application
description: This tutorial will provide the readers a detialed guide on how to interact with an API from a Vue.js application using Fetch and Axios.
author: edidiong-etok
date: 2021-06-19T00:00:00-11:00
topics: [API]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/how-to-interact-with-an-api-from-a-vuejs-application/hero.png
    alt: How to Interact With an API from a Vue.js Application Hero Image
---
A lot of developers build applications using JavaScript and this constitutes the fact that most web applications have JavaScript as one of their main programming languages. JavaScript frameworks were built to make the development process easier and quicker for developers. Vue.js is one of many popular JavaScript frameworks. Others of which include React and Angular.
<!--more-->

### What is Vue.js
[Vue.js](https://vuejs.org/v2/guide/index.html) is a progressive framework for JavaScript which is used to develop interactive user interfaces. Vue.js is called a progressive framework because it is user-friendly and can be easily merged with different frameworks or libraries.

When developing most projects using Vue.js, there'll be a need to fetch or consume data from an API. This is used to make the front-end interact with the back-end of the application. The fetched data can then be consumed on the front-end of the application.

### What is an API?
API stands for Application Programming Interface, which is a set of protocols that allow applications to share data. It's more of a software intermediary. To use APIs in Vue.js, you'll have to make an API request using either one of these methods: [Axios](https://www.npmjs.com/package/axios) or [Fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) methods.

These concepts will be discussed extensively in the course of this article.

### Prerequisites
To understand and follow this article, you should have:

- [Node.js](https://nodejs.org/en/download/) installed on your computer.
- Vue.js installed on your computer. If you don't already have it installed, refer to the [documentation](https://vuejs.org/v2/guide/installation.html).
- Understood the key concepts in Vue.js. You can learn them from this [Vue.js guide](https://vuejs.org/v2/guide/index.html).

### Overview
1. Using Axios to consume an API
2. Using the Fetch API method
3. Using APIs in Vuex
4. Conclusion

If you don't know how to create a Vue project, check out this [documentation](https://cli.vuejs.org/guide/creating-a-project.html#vue-create) to walk you through the process.

### Using Axios to consume APIs

[Axios](https://www.npmjs.com/package/axios) is a promise-based HTTP client which makes it suitable for fetching data during server-side display. It works on both browser and Node apps. Axios is a library that is built around the Fetch API.

#### Axios Installation

To use Axios in your project, you should install it. This can be done in two ways:

- By using `npm`; a standard package manager for the JavaScript runtime environment Node.js. You can now see why having Node.js installed on your computer was a prerequisite.

- By using `yarn`; a package manager that also acts as a project manager. It is synergetic with the npm registry and has the same features. To install yarn in your project, paste the following line of code in your terminal `npm install --global yarn`

With npm:

```bash
npm i axios
```

With yarn:

```bash
yarn add axios
```

Next, you should import Axios in your `src/main.js` file

```JavaScript
import axios from 'axios';
Vue.prototype.$http = axios;
```

#### How to make an API request and display data using Axios

Now, we'll make our first API request using the `GET` method. A GET method is used to fetch data from an API. We want this API request running asynchronously therefore, we use a promise-based function with the keywords [async/await](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function).

You may wonder why we used a promise-based function. This is because a promise is a stand-in for a value not necessarily known when the promise is created. Since API requests take an undeterminable amount of time, we use promises. You can learn more about Promises in the [MDN docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise).

We also need to test for errors using the [try/catch](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch) method. `try` is used to check for errors while `catch` is used to handle the error if one occurs.

Copy the code below to your `App.vue` file:

```JavaScript
<template></template>

<script>
export default {
  data() {
    return {
      posts: [],
    };
  },

  methods: {
    async getData() {
      try {
        const response = await this.$http.get(
          "http://jsonplaceholder.typicode.com/posts"
        );
        // JSON responses are automatically parsed.
        this.posts = response.data;
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
```

The above block of code in the `methods` property will be explained line by line.

```JavaScript
async getData (){
```

Here a function named `getData()` is created. In this function, the API will be called. The `async` keyword is prepended on the `getData` function to show that the function will make use of promises and we'll be using it to await to pause the execution of the function until the promise is resolved.

```JavaScript
try {
    const response = await this.$http.get('http://jsonplaceholder.typicode.com/posts');
```

`try` property defines a block of code to be tested for errors as the code is executed. In the block of code `const response = await this.$http.get('http://jsonplaceholder.typicode.com/posts');`, a get request is made with the `get` keyword using axios i.e.`$http` to get data from the URL.

`await` is prepended to the request because the `get` function will return a promise. The data returned from the API after the promise is resolved and will be stored in the variable `response`.

```JavaScript
this.posts = response.data
```

The data we get from the request is then saved to the `posts` array which is created in the data property.

```JavaScript
catch (error) {
    console.log(error);
}
```

If any error occurs during the execution, the error will be caught and logged in the console.

After requesting data from the API, you will need to call it on a lifecycle hook. Here we will use the `created()` lifecycle hook, this is because we will be able to retrieve sensitive data and events that are active with the `created` hook.

```JavaScript
<template></template>

<script>
export default {
  data() {
    return {
      posts: [],
    };
  },

  methods: {
    async getData() {
      try {
        const response = await this.$http.get(
          "http://jsonplaceholder.typicode.com/posts"
        );
        // JSON responses are automatically parsed.
        this.posts = response.data;
        console.log(posts);
      } catch (error) {
        console.log(error);
      }
    },
  },

  created() {
    this.getData();
  },
};
</script>
```

We can now display the data in the template by looping through the posts using [v-for](https://vuejs.org/v2/guide/list) directive.

```JavaScript
<template>
  <div>
    <div v-for="post in posts" v-bind:key="post.id">
      <h2>{{ post.title }}</h2>
      <p>{{ post.body }}</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      posts: [],
    };
  },

  methods: {
    async getData() {
      try {
        const response = await this.$http.get(
          "http://jsonplaceholder.typicode.com/posts"
        );
        this.posts = response.data;
      } catch (error) {
        console.log(error);
      }
    },
  },

  created() {
    this.getData();
  },
};
</script>
```

### Using Fetch API method

[Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) is a powerful and flexible method of flexible APIs. It produces a global fetch() method that provides a simple and rational way to fetch resources asynchronously over the network.

To request with the Fetch API, you just have to make the request directly with the `fetch` object and follow all other steps used in the Axios call above.

```JavaScript
<template>
  <div>
    <ul v-for="post in posts" v-bind:key="post.id">
      <li>{{ post.title }}</li>
      <p>{{ post.body }}</p>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      posts: [],
    };
  },

  methods: {
    async getData() {
      try {
        let response = await fetch("http://jsonplaceholder.typicode.com/posts");
        this.posts = await response.json();;
      } catch (error) {
        console.log(error);
      }
    },
  },

  created() {
    this.getData();
  },
};
</script>
```

### Creating APIs in Vuex

[Vuex](https://vuex.vuejs.org/) is a state management library for Vue.js applications. It provides a centralized store for all elements in an application.

#### Installing Vuex

To make use of Vuex, you will first need to install the Vuex package on your Vue application.

```bash
vue create project
```

OR

```bash
npm install vuex --save
```

Then, in your `store` folder, access the `index.js` file and write the following code

```JavaScript
import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios";

Vue.use(Vuex);
```

#### Making the API request
We will be working with the `store/index.js` file.
First, we create a `state` object which will contain all the application-level state. It serves as the `data` object for the store in a vuex project.

```JavaScript
export default new Vuex.Store({
 state: {
    posts: [],
  },
}) 
```

Next, we create a `getters` property. Getters are like `computed` properties for stores. It is used to determine derived states based on store states. In this tutorial, we will use it to return posts in the state.

```JavaScript
  getters: {
    posts: state => {
      return state.posts;
    }
  },
```

Next, we create a `mutation` property. The mutation property is where we can change the state in the Vuex store. There are very similar to events where we carry out actual state alterations.

```JavaScript
  mutations: {
    SET_ITEMS (state, posts) {
      state.posts = posts
    }
  },
```

Now we can call our API in the `actions` property. Actions are equivalent to mutations only that actions commit mutations rather than mutating the state and also actions can hold asynchronous operations. Let’s go ahead with the API call.

```JavaScript
  actions: {
   async loadPosts ({ commit }) {
     try {
        const response = await this.$http.get('http://jsonplaceholder.typicode.com/posts');
        // JSON responses are automatically parsed.
        commit('SET_ITEMS', response.data)
      }
      catch (error) {
       console.log(error);
     }
   }
  },
```

Now, we should import the store in `src/main.js` and pass it to our Vue app.

```JavaScript
import store from "../store/index";

new Vue({
  render: (h) => h(App),
  store,
}).$mount("#app");
```

Now, we can display the data in our vue file. To do that, some steps need to be taken:

1. Using the `computed` property, we access the content of the `getters` method in the store.

```JavaScript
<script>
export default {
  computed: {
      posts() {
           return this.$store.getters.posts;
        },
    },
```

2. Call the API on a lifecycle hook `created` and employ the `dispatch` method to call the action.

```JavaScript
  created() {
    this.$store.dispatch('loadPosts');
  },
}
</script>
```

3. Finally display data on your template.

```JavaScript
<template>
  <div>
    <div v-for="post in posts" v-bind:key="post.id">
      <h2>{{ post.title }}</h2>
      <p>{{ post.body }}</p>
    </div>
  </div>
</template>
```

Here is the whole code snippet:

For the `store` file:

```JavaScript
import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
 state: {
    posts: [],
  },

getters: {
    posts: state => {
        return state.posts;
    }
},
mutations: {
        SET_ITEMS (state, posts) {
            state.posts = posts
        }
},
actions: {
   async loadPosts ({ commit }) {
     try {
           const response = await axios.get('http://jsonplaceholder.typicode.com/posts');
          commit('SET_ITEMS', response.data)
       }
      catch (error) {
         console.log(error);
     }
   }
},
}) 
```

For your Vue file:

```JavaScript
<template>
  <div>
    <div v-for="post in posts" v-bind:key="post.id">
      <h2>{{ post.title }}</h2>
      <p>{{ post.body }}</p>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    posts() {
         return this.$store.getters.posts;
      },
  },
  created() {
    this.$store.dispatch('loadPosts');  
  },
}
</script>
```

### Conclusion

In this tutorial, we have looked at two ways to interact with APIs in a Vue.js project. Both methods of interacting with the APIs are similar in many ways and both get the job done. However, it's advised to use Axios for more complex requests as it allows many configurations of multiple requests in one place.

We also considered consuming an API in a Vuex project i.e. a project that manages multiple states.

I hope this article is of great help 🙂.

Happy Coding!

---
Peer Review Contributions by: [Mohan Raj](/engineering-education/authors/mohan-raj/)
