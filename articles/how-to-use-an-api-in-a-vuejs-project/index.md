Recently, the majority of developers build applications using Javascript programming language and this constitutes the fact that most web applications have Javascript as one of their programming languages. To make the building process easier and faster for developers, a compiled version of Javascript was created which takes on one programming architecture and allows programmers to build any application on this framework.
This complied version of JavaScript is called *JavaScript Framework*. Vue.js is one of the many JavaScript Frameworks.

#### What is Vue.js

[Vue.js](https://vuejs.org/v2/guide/index.html) is a progressive framework for JavaScript used to develop interactive user interfaces. Vue.js is called a progressive framework because it is user-friendly and can be easily merged with different frameworks or libraries.
When developing most projects using Vue.js, there will be a need to fetch or consume data from an API. This will make the front-end of the application interact with the backend of the application. The fetched data can be consumed on the front end of the application.

#### What is an API?

API stands for Application Programming Interface, which is a set of protocols that allow software programs to share data. It is more of a software intermediary. To use APIs in Vue.js, you'll have to make an API request using two methods: [Axios](https://www.npmjs.com/package/axios) and [Fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) methods.

These concepts will be discussed extensively in the course of this article. Brace up! 

#### Prerequisite

To understand and follow this article, you will need:

- [Node.js](https://nodejs.org/en/download/) installed on your computer.
- to have Vue.js installed on your computer. If you don't already have it installed, click [here](https://vuejs.org/v2/guide/installation.html) to do so.
- to understand key concepts in Vue.js. You can learn it [here](https://vuejs.org/v2/guide/index.html).

#### Overview
1. Using Axios to consume an API
2. Using the Fetch API method
3. Using APIs on Vuex
4. Conclusion

If you don't know how to create a Vue project, check out this [documentation](https://cli.vuejs.org/guide/creating-a-project.html#vue-create) to walk you through the process.

There are two methods of consuming/using an API in a Vue.js project. These methods are:

#### Using Axios to consume APIs

[Axios](https://www.npmjs.com/package/axios) is a promise-based HTTP client which makes it suitable for fetching data during server-side display. It works on both browser and Node apps.

**Axios Installation**

To use Axios on your project, you need to first install it. This can be done in two ways:

-  By using `npm`; a standard package manager for the JavaScript runtime environment Node.js. You can now see why having Node.js installed on your computer was a prerequisite.

- By using `yarn`; a package manager that also acts as a project manager. It is synergetic with the npm registry and has the same features. To install yarn in your project, paste the following line of code in your terminal `npm install --global yarn`


With npm:

```bash
npm i axios
```

With yarn:

```bash
yarn add axios
```

Next, you import Axios in your `src/main.js` file

```JavaScript
import axios from 'axios';
Vue.prototype.$http = axios;
```

**How to make an API request and display data using Axios.**

We will make the API request using a `get` method. A get method is used to call data from a resource, the resource in this context is our API.  We want this API request running synchronously therefore, we use a promise-based function with keywords [async/await](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function). You may wonder why we used a promise-based function. This is because a promise is a stand-in for a value not necessarily known when the promise is created. You can learn more about Promises in the [MDN docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise).

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

A function named `getData()` is created . It is in this function the API will be called. The `async` keyword is prepended on the `getData` function to show that the function will make use of promise and we'll be using it to await to pause the execution of the function until the promise is resolved.

```JavaScript
try {
    const response = await this.$http.get('http://jsonplaceholder.typicode.com/posts');
```

`try` property defines a block of code to be tested for errors as the code is executed. In the block of code `const response = await this.$http.get('http://jsonplaceholder.typicode.com/posts');`, a get request is made with the `get` keyword using axios i.e.`$http` to get data from the URL. 

`await` is prepended to the request because the `get` function will return a promise. The data returned from the API after the promise is resolved and will be stored in the variable `response`.

```JavaScript
this.posts = response.data
```

The data we get from the request is saved to the 'posts' array which is created in the data property.

```JavaScript
catch (error) {
    console.log(error);
}
```

If any error occurs during the code execution, the error will be caught and logged in the console.

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

We can now display the data in the template by looping through the posts using [v-for](https://vuejs.org/v2/guide/list.html) directive

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

#### Using Fetch API method

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

#### Creating APIs in Vuex

[Vuex](https://vuex.vuejs.org/) is a state management library for vue.js applications. It provides a centralized store for all elements in an application. 

**Installing Vuex**

To make use of VueX, you will first need to install the VueX package on your Vue application.

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
 
**Now let’s make the API request:**
 
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

For your vue file:

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

#### Conclusion

In this tutorial, we have looked at two ways to consume APIs in a vue.js project. Both methods of consuming APIs are similar in many ways and both get the job done. However, it is advised to use Axios for more complex requests as it allows multiple configurations of multiple requests in one place.

We also considered consuming an API in a vuex project i.e. a project that manages multiple states.

I hope this article is of great help 🙂.

Happy Coding!
