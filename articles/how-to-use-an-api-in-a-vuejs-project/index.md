In this modern era, the majority of developers are familiar with the language JavaScript and that has led to most web applications having JavaScript as one of the programming languages used in building them. To make the building process easier for developers, frameworks were built with the concept of creating a compiled version of JavaScript that adopts one programming architecture or is dynamic and allows programmers to build their applications on this framework. With this concept in mind came Vue.js.

## What is Vue.js

Vue.js is a progressive framework for JavaScript which is used to build user interfaces. You can read more about it [here](https://vuejs.org/v2/guide/index.html).

When developing some projects using Vue.js, there will be a need to fetch or consume data from an API. This will make the front-end of the application interact with the backend of the application. The fetched data can be consumed on the front-end of the application.

## What is an API?

API stands for Application Programming Interface, which is a set of definitions or protocols that allow software programs to communicate and share data with each other. It is more of a software intermediary.

## Prerequisite

To understand and follow this article, you will need:

- [Node.js](https://nodejs.org/en/download/) installed on your computer.

- Have Vue.js installed on your computer. If you don't already have it installed, click [here](https://vuejs.org/v2/guide/installation.html) to do so.

- Understand key concepts in Vue.js. You can learn more about Vue.js [here](https://vuejs.org/v2/guide/index.html) .

## Outline

1. Using Axios to consume an API
2. Using Fetch API method
3. Using APIs on Vuex
4. Conclusion

There are two methods of consuming/using an API in a Vue.js project. These methods are:

## Using Axios to consume APIs

[Axios](https://www.npmjs.com/package/axios) is a promise-based HTTP client which makes it appropriate for fetching data during server-side rendering. It works on both browser and Node apps.

**Axios Installation**

To use Axios on your project, you need to first install it. This can be done in two ways:

- By using `npm`: a default package manager for the JavaScript runtime environment Node.js.

- By using `yarn`: a package manager that doubles down as project manager. It is compactible with the npm registry and has the same set of features.

With npm:

```bash
npm i axios
```

With yarn:

```bash
yarn add axios
```

Next, you import axios in your `src/main.js` file

```JavaScript
    import axios from 'axios';
    Vue.prototype.$http = axios;
```

**How to make an API request and display data using Axios.**

We will make the API request using the `get` method. A get method is used to request data from a resource, the resource in this context is our API.  We want this API request running asynchronously therefore, we use a promise based function with keywords `async` and `await`. However, we also need to test for errors, this is done with the `try` method and the errors that is detected is handled with the `catch` method.

Copy the code below to your `App.vue` file

```JavaScript
<template></template>

<script>
export default {
data()  {
posts: [ ]

},

methods: {
async getData () {
     try {
              const response = await this.$http.get('http://jsonplaceholder.typicode.com/posts');
              // JSON responses are automatically parsed.
              this.posts = response.data
      }
      catch (error) {
          console.log(error);
      }

     }
   }
}
</script>
```

After requesting for data from the API, you will need to call it on a lifecycle hook. Here we will use the `created()` lifecycle hook, this is because we will be able to access reactive data and events that are active with the `created` hook.


    <template></template>
    
    <script>
    export default {
    data()  {
    posts: [ ]
    
    },
    
    methods: {
    async getData () {
         try {
                  const response = await this.$http.get('http://jsonplaceholder.typicode.com/posts');
                 // JSON responses are automatically parsed.
                  this.posts = response.data
                  console.log(posts)
               }
              catch (error) {
                 console.log(error);
             }
    
           }
       },
    
    
    created() {
        this.getData();
      },
    }
    </script>

We can now display the data in the template by looping through the posts using [v-for](https://vuejs.org/v2/guide/list.html) directive


    <template>
         <div>
             <div v-for="post in posts">
                 <h2>{{ post.title }}</h2>
                  <p>{{ post.body }}</p>
             </div>
          </div>
    </template>
    
    <script>
    export default {
    data()  {
      posts: [ ]
    },
    
    methods: {
    async getData () {
         try {
                  const response = await this.$http.get('http://jsonplaceholder.typicode.com/posts');
                  this.posts = response.data
               }
              catch (error) {
                 console.log(error);
             }
    
           }
       },
    
    
    created() {
        this.getData();
      },
    }
    </script>



## Using Fetch API method

Fetch API is a powerful and flexible method of flexible APIs. It provides a global `fetch()` method that provides an easy, logical way to fetch resources asynchronously across the network.

To make request with the Fetch API, you just have to make the request directly with the `fetch` object and follow all other steps used in the axios call above.


    <template>
         <div>
             <ul v-for="post in posts">
                 <li>{{ post.title }}</li>
             </ul>
          </div>
    </template>
    
    <script>
    export default {
    data()  {
      posts: [ ]
    },
    
    methods: {
    async getData () {
         try {
                  const response = await fetch('http://jsonplaceholder.typicode.com/posts');
                  this.posts = response.data
               }
              catch (error) {
                 console.log(error);
             }
    
           }
       },
    
    
    mounted() {
        this.getData();
      },
    }
    </script>


## Creating APIs in Vuex

Vuex is a state management library for vue.js applications. It serves as a centralized store for all components in an application. 

**Installing Vuex**

To make use of VueX, you will first need to install the VueX package on your Vue application.

This can be done during the installation of Vue CLI via “manual installation”: 

```bash
vue create project
```

OR

Added to an already existing vue.js project. In your terminal, write the code below:

```bash
npm install vuex --save
```

Then, in your `store` folder, access the `index.js` file and write the following code


    import Vue from 'vue'
    import Vuex from 'vuex'
    
    Vue.use(Vuex);

You will also need to install and import axios if you have not already done that. Check the earlier part of this tutorial for the steps.
 
 **Now let’s create:**
 
We will be working with the `store/index.js` file.

First, we create a `state` object which will contain all the application level state. It serves as the `data` object for store in a vuex project.


    export default new Vuex.Store({
     state: {
        posts: [],
      },
    
    })
    

 
Next, we create a `getters` property. Getters are like `computed` properties for stores. It is used to compute derived state based on store state. In this tutorial, we will use it to return posts in the state.
 

    getters: {
            posts: state => {
                return state.posts;
            }
        },

Next, we create a `mutation` property. The mutation property is were we can actually change state in Vuex store. There are very similar to events were we perform actual state modifications.


    mutations: {
            SET_Item (state, posts) {
                state.posts = posts
            }
    },

Now we can call our API in the `actions` property. Actions are similar to mutations only that actions commit mutations instead of mutating the state and also actions can contain asynchronous operations. Let’s go ahead with the API call.


    actions: {
           async loadPosts ({ commit }) {
             try {
                      const response = await this.$http.get('http://jsonplaceholder.typicode.com/posts');
                  // JSON responses are automatically parsed.
                  this.posts = response.data
                  commit('SET_Items', posts)
               }
              catch (error) {
                 console.log(error);
             }
    
           }
       },
    

We can display data in our vue file. To do that, some steps need to be taken:

1. Import `mapState` from vuex, this is to help generate computed getter functions for us.


    <script>
    
    import { mapState } from 'vuex';
    


2. Call the API on a lifecycle hook `mounted` and use `dispatch` method to call the action.


    mounted () {
            this.$store.dispatch('loadPosts')
        },


3. Add mapState on your computed:


    computed: mapState([
            'posts'
      ]),
    </script>


4. Finally display data on your template.


    <template>
         <div>
             <ul v-for="post in posts">
                 <li>{{ post.title }}</li>
             </ul>
          </div>
    </template>
    
    
## CONCLUSION

In this tutorial, we have looked at two ways to consume APIs in a vue.js project. Both methods of consuming APIs are similar in many ways and both get the job done. However, it is advised to use Axios for more complex request as it allows multiple configuration of multiple request in one place.

We also considered consuming an API in a vuex project i.e. a project that manages multiple state.

I hope this article was of great help 🙂.

Happy Coding!
