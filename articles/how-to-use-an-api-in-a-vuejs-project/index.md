![hero image](/engineering-education/how-to-use-an-api-in-a-vuejs-project/hero.png)
### How to use an API on a Vue.js project

#### Introduction

Recently, the majority of developers build applications using Javascript programming language and this constitutes the fact that most web applications have Javascript as one of their programming languages. To make the building process easier and faster for developers, a compiled version of Javascript was created which takes on one programming architecture and allows programmers to build any application on this framework.
This complied version of JavaScript is called *JavaScript Framework*. Vue.js is one of the many JavaScript Frameworks.

#### What is Vue.js

[Vue.js](https://vuejs.org/v2/guide/index.html) is a progressive framework for JavaScript which is used to build user interfaces. Vue.js is called a progressive framework because it is user friendly and can be easily merged with different frameworks or library.
When developing most projects using Vue.js, there will be a need to fetch or consume data from an API. This will make the front-end of the application interact with the backend of the application. The fetched data can be consumed on the front-end of the application.

#### What is an API?

API stands for Application Programming Interface, which is a set of definitions or protocols that allow software programs to communicate and share data with each other. It is more of a software intermediary. To use APIs in Vue.js, you'll have to make an API request using two methods: [Axios](https://www.npmjs.com/package/axios) and [Fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) methods.
These concepts will be discussed externsively in the course of this article. Brace up! 

#### Prerequisite

To understand and follow this article, you will need:

- [Node.js](https://nodejs.org/en/download/) installed on your computer.
- to have Vue.js installed on your computer. If you don't already have it installed, click [here](https://vuejs.org/v2/guide/installation.html) to do so.
- to understand key concepts in Vue.js. You can learn it [here](https://vuejs.org/v2/guide/index.html).

#### Outline
1. Using Axios to consume an API
2. Using Fetch API method
3. Using APIs on Vuex
4. Conclusion

First, if you don't know how to create a vue project, check out this [documentation](https://cli.vuejs.org/guide/creating-a-project.html#vue-create) to walk you through the process.

There are two methods of consuming/using an API in a Vue.js project. These methods are:

#### Using Axios to consume APIs

[Axios](https://www.npmjs.com/package/axios) is a promise-based HTTP client which makes it appropriate for fetching data during server-side rendering. It works on both browser and Node apps.

**Axios Installation**

To use Axios on your project, you need to first install it. This can be done in two ways:

-  By using `npm` ; a default package manager for the JavaScript runtime environment Node.js. You can now see why having Node.js installed on your computer was a prerequisite.
- By using `yarn` ; a package manager that doubles down as project manager. It is compactible with the npm registry and has the same set of features. To install yarn in your project, paste the following line of code in your terminal `npm install --global yarn`


With npm:

```
    npm i axios
```
With yarn:

```
    yarn add axios
```
Next, you import axios in your `src/main.js` file

```
    import axios from 'axios';
    Vue.prototype.$http = axios;
```

**How to make an API request and display data using Axios.**

We will make the API request using a `get` method. A get method is used to request data from a resource, the resource in this context is our API.  We want this API request running synchronously therefore, we use a promise based function with keywords [async/await](https://github.com/section-engineering-education/engineering-education/pull/2235). You may wonder why we used a promise based function, this is because a promise provides a way of montinoring the state of the API and acts as a container for the data that will eventually return.
However, we also need to test for errors using the [try/catch](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch) method. `try` is used to check for errors while `catch` is used to handle all errors that are detected.


Copy the code below to your `App.vue` file

```
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
The above block of code in the `methods` property will be explained line by line. 
```
async getData (){
```
A function named `getData()` is created . It is in this function the API will be called.
The `async` keyword is prepended on the `getData` function to show that the function will return a promise.

```
try {
        const response = await this.$http.get('http://jsonplaceholder.typicode.com/posts');
```
`try` property defines a block of code to be tested for errors as the code is executed. In the block of code `const response = await this.$http.get('http://jsonplaceholder.typicode.com/posts');`, a get request is made with the `get` keyword using axios i.e.`$http` to get data from the URL. `await` is prepended to the request because we are calling a promise. The request is stored in a variable called `response`.

```
  this.posts = response.data
```
The data gotten from the request is saved to the 'posts' array which is created in the data property.

```
    catch (error) {
        console.log(error);
    }
```
If any error occurs during the code execution, the error will be caught and logged in the console.

After requesting for data from the API, you will need to call it on a lifecycle hook. Here we will use the `created()` lifecycle hook, this is because we will be able to access reactive data and events that are active with the `created` hook.

```
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
```

We can now display the data in the template by looping through the posts using [v-for](https://vuejs.org/v2/guide/list.html) directive

```
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
```


#### Using Fetch API method

[Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) is a powerful and flexible method of flexible APIs. It provides a global fetch() method that provides an easy, logical way to fetch resources asynchronously across the network.

To make request with the Fetch API, you just have to make the request directly with the `fetch` object and follow all other steps used in the axios call above.

```
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
    
    
    created() {
        this.getData();
      },
    }
    </script>

```
#### Creating APIs in Vuex

[Vuex](https://vuex.vuejs.org/) is a state management library for vue.js applications. It serves as a centralized store for all components in an application. 

**Installing Vuex**

To make use of VueX, you will first need to install the VueX package on your Vue application.

```
    vue create project
```
OR

```
    npm install vuex --save
```
then in your `store` folder, access the `index.js` file and write the following code

```
    import Vue from 'vue'
    import Vuex from 'vuex'
    
    Vue.use(Vuex);
```

You will also need to install and import axios if you have not already done that. Check the earlier part of this tutorial for the steps.
 
 **Now let’s make the API request:**
 
We will be working with the `store/index.js` file.
First, we create a `state` object which will contain all the application level state. It serves as the `data` object for store in a vuex project.
```

    export default new Vuex.Store({
     state: {
        posts: [],
      },
    
    })
    
```
 
Next, we create a `getters` property. Getters are like `computed` properties for stores. It is used to compute derived state based on store state. In this tutorial, we will use it to return posts in the state.
 
```
    getters: {
            posts: state => {
                return state.posts;
            }
        },
```

Next, we create a `mutation` property. The mutation property is were we can actually change state in Vuex store. There are very similar to events were we perform actual state modifications.
```

    mutations: {
            SET_Item (state, posts) {
                state.posts = posts
            }
    },
```

Now we can call our API in the `actions` property. Actions are similar to mutations only that actions commit mutations instead of mutating the state and also actions can contain asynchronous operations. Let’s go ahead with the API call.

```
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
    
```
We can display data in our vue file. To do that, some steps need to be taken:

1. Import `mapState` from vuex, this is to help generate computed getter functions for us.

```
    <script>
    
    import { mapState } from 'vuex';
    
```

2. Call the API on a lifecycle hook `mounted` and use `dispatch` method to call the action.

```
    mounted () {
            this.$store.dispatch('loadPosts')
        },
```

3. Add mapState on your computed:

```
    computed: mapState([
            'posts'
      ]),
    </script>
```

4. Finally display data on your template.

```
    <template>
         <div>
             <ul v-for="post in posts">
                 <li>{{ post.title }}</li>
             </ul>
          </div>
    </template>
```

#### CONCLUSION

In this tutorial, we have looked at two ways to consume APIs in a vue.js project. Both methods of consuming APIs are similar in many ways and both get the job done. However, it is advised to use Axios for more complex request as it allows multiple configuration of multiple request in one place.

We also considered consuming an API in a vuex project i.e. a project that manages multiple state.

I hope this article is of great help 🙂.

Happy Coding!
