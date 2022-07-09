---
layout: engineering-education
status: publish
published: true
url: /customized-axios-for-mulitple-servers-in-vue/
title: Customizing Axios Packages and Configuring Interceptors using Vue.js
description: This tutorial introduces the reader to the concepts of Axios interceptors in Vue.js.
author: naomi-seint
date: 2022-06-28T00:00:00-11:30
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/customized-axios-for-mulitple-servers-in-vue/hero.png
    alt: Axios Vue hero image
---
Axios is a library for making HTTP requests. It is a wrapper around the [fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API). It is a promise-based API.
<!--more-->
Working in large-scale applications may require a lot of requests from the server. Axios makes it easy to make and manage these requests. However, there might be a need to handle requests to multiple servers.

In this tutorial, we will learn how to make requests to multiple servers.

### Table of contents
- [Table of contents](#table-of-contents)
- [Prerequisites](#prerequisites)
- [Objectives](#objectives)
- [What is the Axios library?](#what-is-the-axios-library)
- [Setting up the Vue.js application](#setting-up-the-vuejs-application)
- [Setting up the vue store](#setting-up-the-vue-store)
- [Conclusion](#conclusion)

### Prerequisites
To follow along with this tutorial, you will need to have the following:
- Basic knowledge of JavaScript or TypeScript.
- Basic knowledge of Vue.js.
- An Integrated Development Environment (IDE) that supports TypeScript.
- An understanding of the [fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API).
- A basic knowledge of the Axios library may come in handy, though it is unnecessary.

### Objectives
By the end of this tutorial, you will be able to:
- Make requests to multiple servers.
- Be able to modify the Axios library to understand how it works behind the hoods.
- Add an interceptor to attach authentication tokens.

### What is the Axios library?
The Axios library is a wrapper around the [fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API). 

Axios makes it easy to make and manage API requests in Node.js. Let us now proceed and create a simple application with Axios to better understand on how it works on a higher level.

To start, install Axios on your project root directory as shown below:
```bash
# initialise the package.json file
npm init
# install the Axios package
npm install axios
```

Next, add the following scripts in your `index.ts` file:
```typescript
// initialise our axios
const axios= require("axios");
axios
    .get('https://api.github.com/users/section-engineering-education')
    .then((res)=>{
        console.log(res);
    })
.catch(err => {
    console.log(err)
})
```

In the code above, we are requesting the GitHub API. The request is made to the GitHub API, and the response is printed to the console.

In this case, we request the GitHub API to get the user's information named `section-engineering-education`.

Output:
```bash
  login: 'section-engineering-education',
    id: 78109665,
    node_id: 'MDEyOk9yZ2FuaXphdGlvbjc4MTA5NjY1',
    avatar_url: 'https://avatars.githubusercontent.com/u/78109665?v=4',
    gravatar_id: '',
    url: 'https://api.github.com/users/section-engineering-education',
    html_url: 'https://github.com/section-engineering-education',
    followers_url: 'https://api.github.com/users/section-engineering-education/followers',
    following_url: 'https://api.github.com/users/section-engineering-education/following{/other_user}',
    gists_url: 'https://api.github.com/users/section-engineering-education/gists{/gist_id}',
    starred_url: 'https://api.github.com/users/section-engineering-education/starred{/owner}{/repo}',
    subscriptions_url: 'https://api.github.com/users/section-engineering-education/subscriptions',
    organizations_url: 'https://api.github.com/users/section-engineering-education/orgs',
    repos_url: 'https://api.github.com/users/section-engineering-education/repos',
    events_url: 'https://api.github.com/users/section-engineering-education/events{/privacy}',
    received_events_url: 'https://api.github.com/users/section-engineering-education/received_events',
    type: 'Organization',
    site_admin: false,
    name: null,
    company: null,
    blog: '',
    location: null,
    email: null,
    hireable: null,
    bio: `“Section's Engineering Education (EngEd) Program is dedicated to offering a unique quality community experience for computer science university students."`,
    twitter_username: null,
    public_repos: 1,
    public_gists: 0,
    followers: 0,
    following: 0,
    created_at: '2021-01-27T20:10:11Z',
    updated_at: '2022-03-01T15:42:41Z'
  }
```

In the above response, as you will notice, we can retrieve all details about this site (Engineering Education) from the GitHub API using the Axios library.  

Now, what happens when we want to make this request to multiple servers, let's say [Section](https://section.io) and [GitHub](https://github.com) servers?

In the next section, we will set up our Vue.js application, which will request both the Section and GitHub servers using an Axios instance.

### Setting up the Vue.js application
To set up our Vue.js application, we will use the following command:
```bash
vue create axios-example-app
```

Next, `cd` into the application root directory and run the following command:
```bash
npm i axios
```

Output:
```json
...
 "dependencies": {
    "axios": "^0.26.1",
    "core-js": "^3.6.5",
    "vue": "^2.6.11"
  },
```

> The Axios version used in this tutorial may differ from your version depending on the time you installed it.

With the Vue application set up, we will now proceed to create our Vue.js application.

In the `src`, create a new directory called `services`. Next, In the `services` directory, create a new directory called `http/client` and add a file called `client.js`.

Modify the client file as shown below:
```javascript
// we first import the axios library
import axios from 'axios'
// we get the base url from the environment variables
import {apiBaseUrl} from "@/environment";
// we also import the auth service from the modules.
import {AuthService} from "@/modules/auth";
/**
 * Axios basic configuration
 */
const config = {
  baseURL: apiBaseUrl
}

/**
 * Creating the instance of Axios
 * It is because in large-scale application, we may need
 * to consume APIs from more than a single server,
 */
const client = axios.create(config)

/**
 * Auth interceptors
 * @description Add auth tokens to every outgoing request.
 * @param {*} config
 */
const authInterceptor = config => {
  config.headers.Authorization = `Bearer ${AuthService.token}`
  config.headers.common.Accept = 'Application/json'
  config.headers['Access-Control-Allow-Origin'] = '*'
  return config
}

/**
 * Logger interceptors
 * @description Log app requests.
 * @param {*} config
 */
const loggerInterceptor = config =>
/** Add logging here */
  config

/** Adding the request interceptors */
client.interceptors.request.use(authInterceptor)
client.interceptors.request.use(loggerInterceptor)

/** Adding the response interceptors */
client.interceptors.response.use(
  response => Promise.resolve(response),
  error => {
    Event.$emit('error', 500, error.response.data.message)
    if (error.response.status === 401) AuthService.logout()
    const errorMessage = error.response.data.message
    error.response.data.message = errorMessage.length > 200
      ? JSON.parse(errorMessage.split('code :').pop()).error.message.split(':')[0]
      : errorMessage
    throw error
    // Promise.reject(error)
  }
)

export default client

```

In the above code, we are setting up the base URL of the API. We are also setting up the auth interceptor. Now, we cannot use the basic Axios package to request resources from a protected server.

To make these requests, we need to create an instance of the Axios package and name it `client`. With this new instance, we can use the `axios.config()` method to modify this package to attach our tokens.

This is achievable by adding the `interceptor` property of the Axios instance, `client` previously created. The `config.headers.Authorization = `Bearer ${AuthService.token}` is then used to attach the tokens required to make requests to the server.

As discussed in the next step, we have also made the Axios response handle both the success and failure messages. We then export the client instance to be used in other modules.

Let's now proceed and create our auth service as shown below:
```javascript
// in the src/services/auth/auth.js file
class AuthService {
  // our constructor
  constructor () {
    // create an object with auth details
    this.obj = {
      token: `${process.env.VUE_APP_NAME}_token`,
      user: `${process.env.VUE_APP_NAME}_user`,
    }
    // get the auth token from local storage
    this.token = window.localStorage.getItem(this.obj.token)
    // get the current user from local storage
    this.user = JSON.parse(window.localStorage.getItem(this.obj.user))
  }
  // check if user is authenticated
  check () {
    return !!this.token
  }
  // get the token
  token () {
    return !!this.token
  }
  // we getting the current user
  user () {
    return !!this.user
  }
  // logout the current user
  logout () {
    // unset the token and the user
    window.localStorage.removeItem(this.obj.token)
    window.localStorage.removeItem(this.obj.user)
    location.reload()
  }
  // login the user
  login ({ token, user }) {
    window.localStorage.setItem(this.obj.token, token)
    window.localStorage.setItem(this.obj.user, JSON.stringify(user))
    this.token = token
    this.user = user
    window.location = '/'
  }
  // set the value of the current user
  setUser (user) {
    window.localStorage.removeItem(this.obj.user)
    window.localStorage.setItem(this.obj.user, JSON.stringify(user))
    this.user = user
    location.reload()
  }
}
// export the auth service
export default new AuthService()

```

This file is created, with an assumption that your Vue application has an `env` file, otherwise create one at the root of your project and add the following contents:
```bash
VUE_APP_NAME = Test
VUE_APP_API_BASE_URL=http://127.0.0.1:8080/api/v1/
```

In the authentication script, we created a constructor function with the initial user setup. We then added a few public methods we can use when importing this auth service.

Now that we have the auth service and the Axios instance defined let's set up an action in our store to request multiple servers depending on the running server.

### Setting up the Vue store
To get started with state management in Vue, we need to install a few packages, including the Vuex.

```bash
vue add vuex
```

The above command will prompt you to `yes` or `no` questions, which you should answer with `yes` in this case.

Output:
```json
 "dependencies": {
    ...
    "vuex": "^3.4.0" 
  },
```

> It's essential to note that the above-installed version may differ depending on the installation time.

Next, let's define the required setup for our store as shown below:
```javascript
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  getters: {},
  actions: {},
  modules: {}
});

```

Vuex is a state management tool in Vue.js just as we have Redux for React and NgRx for Angular.

It has 5 key components that ensures that the state of the application is maintained in a fashionable manner.

Since we want to query the GitHub APIs to get users, update the store as shown below:
```js
import call from "@/service/http";
const BaseURL='https://api.github.com/users/';
export default {
    state: {
        githubUsers : [],
    },
    mutations: {
        MUTATE: (state, payload) => {
            state[payload.state] = payload.data;
        },
    },
    getters: {
        GithubGetter: state => (setup) => state[setup],
    },
    actions: {
        users: ({commit}, payload) => {
            call('get', BaseURL, payload)
                .then(response => {
                    commit("MUTATE", {
                        state: "githubUsers",
                        data: response.data.data,
                    });
                })
                .catch(error => {
                    Event.$emit("ApiError", error.response.data.message);
                });
        },
    }
}

```
In the above store file, we defined the state of our application, by first defining an array of GitHub users as our state. We then created our mutator since we don't want to modify our state directly.

Next, we defined our getter to access our store from anywhere in the application and an action which will make requests to the server.

As you may have noticed, we used the `call()` method instead of the normal `axios` package to make requests to the remote server. `(It's not a mistake)`.

What happens is that the `client` is a new instance of the axios package that we previously created. To use the client, add a file, `index.js` at the root of the `http/client` and add the following contents:

```js
import client from './client/client'

export default async function call (requestType, url, data = null) {
  return client[requestType](url, data)
}
```

Now the `call(arg1,arg2,optional)` method above takes 2 parameters, with optional payload argument. When this method is invoked, it ensures that all requests leaving our application carries the authentication token and any other value added on the headers.

This is one way on modifying the axios to make customized requests depending on your requirements. With this new instance, you can make requests to servers by only defining the API base URL.

### Conclusion
In this tutorial, we have seen how we can customize the Axios package to create a interceptor.

We then configured our store to make requests to the server of our choice with this newly created instance, `call()` method which takes 3 arguments.

Happy coding!

---
Peer Review Contributions by: [Miller Juma](/engineering-education/authors/miller-juma/)
