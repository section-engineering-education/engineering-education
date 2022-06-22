---
layout: engineering-education
status: publish
published: true
url: /making-jetpack-form-builder/
title: The Making of Jetpack Compose Form Builder Library
description: In this article, we will discuss how we made the Form builder library, how we solved the issues with the previous idea, as well as how to use the library.
author: linus-muema
date: 2022-03-18T00:00:00-02:33
topics: [Languages]
excerpt_separator: <!--more-->
images:

- url: /engineering-education/making-jetpack-form-builder/hero.jpg
  alt: Jetpack Compose Forms Hero Image
---
Working in large scale applications may require a lot of requests to the server. Axios makes it easy to make and manage these requests. 
<!--more-->
Axios is a library for making HTTP requests. It is a wrapper around the [fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) which is promise-based.

However, there is a need to handle nultiple requests. In this tutorial, we will learn how to make requests to multiple servers.

### Table of contents
- [Introduction](#introduction)
- [Prerequisites](#prerequisites)
- [Objectives](#objectives)
- [What's Axios library?](#whats-axios-library)
- [Setting up Vue.js application](#setting-up-vuejs-application)
- [Setting up the Vue store](#setting-up-the-vue-store)

### Prerequisites
To follow along with this tutorial, you will need to have:
- Basic knowledge of the JavaScript or TypeScript.
- Basic knowledge of Vue.js.
- An Integrated Development Environment (IDE) that supports TypeScript.
- An understanding on the [fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API).
- A basic knowledge of the Axios library may come in handy, though it is not necessary.

### Objectives
By the end of this tutorial, you will be able to:
- Make requests to multiple servers.
- Modify the Axios library to understand how it works behind the hood.

### What's Axios library?
Axios library is a wrapper around the [fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API). It makes it easy to manage API requests in Node.js. 

Let's now proceed and create a simple application with Axios to understand how it works on the higher level.

To start, install Axios on your project root directory, as shown below:

```bash
# initialise the package.json file
npm init
# install the axios package
npm install axios
```

Next, add the following scripts in your `index.ts` file:

```ts
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

In the above code, we are making a request to the GitHub and the response is printed on the console.

In this case, we are making a request to the GitHub API to retrieve the information of the user named `section-engineering-education`.

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
    bio: `"Section's Engineering Education (EngEd) Program is dedicated to offering a unique quality community experience for computer science university students."`,
    twitter_username: null,
    public_repos: 1,
    public_gists: 0,
    followers: 0,
    following: 0,
    created_at: '2021-01-27T20:10:11Z',
    updated_at: '2022-03-01T15:42:41Z'
  }
```

In the above code, we can retrieve all details about this site (Engineering Education) from the GitHub API using the Axios library.  

Now, what happens when we want to make this request to multiple servers, let's say [Section](https://section.io) and [GitHub](https://github.com) servers?

In the next section, we will setup our Vue.js application, which will make requests to both Section and GitHub servers using an Axios instance.

### Setting up Vue.js application
To set up the Vue.js application, we will use the following command:

```bash
vue create axios-example-app
```

Next, `cd` into the application's root directory and run the command below:

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

With the Vue application set up, we will now proceed to initiate the application.

In the `src`, create a new directory called `services`.

In the `services` directory, create a new folder called `http/client`, and add a file called `client.js`.

Modify the client file, as shown below:

```js
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
 * It is because, in large scale application we may need
 * to consume APIs from more than single server,
 */
const client = axios.create(config)

/**
 * Auth interceptors
 * @description Add auth tokens to every outgoing requests.
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
)export default client
```

In the above code, we are setting up the base URL of the API. We are also setting up the *auth* interceptor.

We then export the client instance to be used in other modules.

Let's now proceed and create our auth service, as demonstrated below:

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

In the above script, we first create a constructor function with initial user setup. We then add a few public methods that we can use when we import this auth service.

Now that we've the auth service and the axios instace defined, let's setup an action in our store to make requests to multiple servers depending on the running server.

### Setting up the Vue store
To get started with state management in Vue, we need to install a few packages including Vuex:

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

### Conclusion



---
Peer Review Contributions by: [Wanja Mike](/engineering-education/authors/michael-barasa/)