---
layout: engineering-education
status: publish
published: true
url: /vue-deep-nesting/
title: Getting Started with Deep Watching in Vue
description: In this tutorial we will learn how to use Vue.js to watch for changes in nested data structures. Then we'll look at the detailed implementation of this feature to achieve the watch functionality.
author: odiwuor-amos
date: 2022-02-28T00:00:00-16:40
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/vue-deep-nesting/hero.png
    alt: Vue watchers image
---
When working with data in most cases, such as forms, you will need to watch the data and fire an event whenever a change occurs. This usually is possible whenever we work with data structures such as arrays, objects, or strings.
<!--more-->
However, this watcher doesn't work by default in Vue.js or any other programming language when we have nested data. Nested data makes it difficult to keep track of changes in the data structure.

In this tutorial, we will learn how to use Vue.js to watch for changes in nested data structures. Then we'll look at the detailed implementation of this feature to achieve the watch functionality.

### Table of contents
- [Table of contents](#table-of-contents)
- [Prerequisites](#prerequisites)
- [Objectives](#objectives)
- [What are watchers?](#what-are-watchers)
- [Vue project setup](#vue-project-setup)
- [A quick look at watchers example](#a-quick-look-at-watchers-example)
- [Implementing deep watching in nested data structures](#implementing-deep-watching-in-nested-data-structures)
- [Conclusion](#conclusion)

### Prerequisites
To follow this tutorial along, the reader will need the following;
- Basic knowledge of JavaScript, especially the ES2016 and above.
- Basic understanding of the Vue.js framework. The concepts may be similar if you come from another library such as React or Angular framework.
- Docker knowledge would be helpfful, though not necessary.
- A Vue CLI locally installed. In this tutorial, we will use the CLI version 4.15.x. This is the current version at the time of this writing, which may change at the time of your reading.
- An IDE of your choice. In this tutorial, we will use Visual Studio Code.

### Objectives
In this tutorial, we will learn how to use Vue.js to watch for changes in nested data structures.

### What are watchers?
At the highest level, we could describe a watcher as a function called whenever a change occurs in the data. 

However, in some cases, we may want to be notified when a change occurs in a specific property of the data. For example, if we have a data structure like the following:
```JavaScript
    {
        "name": "John",
        "age": 30,
        "address": {
            "street": "Main Street",
            "city": "New York",
            "state": "NY"
        }
    }
```

In the above data structure, we have a property called `name` that is a string. We also have a property called `age` that is an integer. We also have a property called `address` that is an object.

We can use the event listener `change` to detect changes in the `name` property. However, this is not the case for the `street` property. This is because Vue.js or any other programming language doesn't know how to watch for changes in nested data structures.

To overcome this limitation, Vue.js provides us with a way to watch over changes occurring in nested data structures, as we'll see in the next section.

### Vue project setup
Vue.js is a component-based framework. Therefore, to use Vue.js, we need to create a Vue project with some components.

Let's run the following command to create a new Vue project called `vue-watcher-tutorial`.
```bash
vue create vue-watcher-tutorial
```

The above command will create a new directory called `vue-watcher-tutorial` in the current directory.

> In this tutorial, we will use the docker to containerize the project. However, you may skip this section if you are not familiar with docker or you don't have a docker machine installed.

Next, we need to dockerize our Vue project. To achieve this, let's add a `Dockerfile` to our project root directory. 

The `Dockerfile` will contain the following:
```dockerfile
# get node version, you even use the LTS
FROM node:16.13.2-alpine
# install a test server to run our project
RUN npm install http-server
# set our work directory to watcher-tutorial
WORKDIR /watcher-tutorial
# copy the package.json. You may as well add the lock file
COPY package.json ./
# if you're planning to add private dependencies in the future, set the scope to the organisation name
RUN npm config set scope <organisation-name> --global
# the .npmrc file will contain the credentials for the npm registry
COPY .npmrc .npmrc
# install the dependencies 
RUN npm install --quiet node-gyp -g
# next, remove the  .npmrc file
RUN rm -f .npmrc
# copy the files
COPY . .
# Build the vue project
RUN npm run build
# expose the port 8000
EXPOSE 8000
# run the test server
CMD ["http-server", "dist"]

```

In the above dockerfile, we have set the `FROM` command to use the node version `16.13.2-alpine`, and we have set the `RUN` command to install the `http-server` package. 

We have also set the `WORKDIR` command to set the working directory to `watcher-tutorial`. And the `COPY` command will copy the `package.json` file to the current directory.

Your `.npmrc` file will contain the credentials for the npm registry as shown below:
```bash
//registry.npmjs.org/:_authToken=npm_mexxxxxaSvdxxxGUnR8O9cU2sxxxxxxxxxxx
```

The `//` slash indicates that the registry is private. In some cases, it adds the `http/https` protocol to the registry.

Next, let's build the docker image. To do this, we will run the following command:
```bash
docker build -t watcher-tutorial .
```

When the build process is done, we will get a new docker image called `watcher-tutorial`. Next, we will run the following command to run the docker image:
```bash
docker run -p 8000:8000 watcher-tutorial
```

You can now access your hot-reloaded Vue project on the `localhost:8000`.

However, if you don't want to use docker, you can run the following command to run the project:
```bash
npm run serve
```

In the next section, we'll learn how to use Vue.js to watch for changes in nested data structures.

### A quick look at watchers example
Now that we have our project setup let's proceed and create a new component called `ProductComponent.vue`.

Next, edit this component as follows:
```JavaScript
<template>

</template>

<script>
export default {
  name: "ProductComponent",
  data(){
    return{
      quantity: 0,
      price: 0,
    }
  },
  watch:{
    quantity(newVal, oldVal){
      if(newVal < 1){
        this.quantity = 1;
      }
    },
    price: function(newVal, oldVal){
      if(newVal < 0){
        this.price = 0;
      }
    }
  }
}
</script>

<style scoped>

</style>

```

We have created a new component called `ProductComponent.vue` in the above component. We then created a new data property called `quantity` and set it to `0`. We also created a new data property called `price` and set it to `0`.

Next, we created a new watch property called `quantity` and set it to a function. This function will be called whenever the `quantity` property changes. The function will receive the new value and the old value as parameters.

We also created a new watch property called `price` and set it to a function. This function will be called whenever the `price` property changes. The function will receive the new value and the old value as parameters.

From the implementation above, we can easily watch our data for any change that occurs and respond accordingly.

>We notice that achieving this behavior is quite straightforward. However, what happens when we have the `price` and `quantity` properties as nested data structures?

### Implementing deep watching in nested data structures
Now that we have an example of the `watch` property in action, we will learn how to implement deep watching in nested data structures.

Let's start by modifying the previous component we had created earlier,  `ProductComponent.vue`, as follows:
```JavaScript
<template>

</template>

<script>
export default {
  name: "ProductComponent",
  data(){
    return{
      product: {
        name: '',
        price: 0,
        description: '',
        image: '',
        quantity: 0
      }
    }
  },
  watch:{
    quantity(newVal, oldVal){
      if(newVal < 1){
        this.product.quantity = 1;
      }
    },
    price: function(newVal, oldVal){
      if(newVal < 0){
        this.product.price = 0;
      }
    }
  }
}
</script>

<style scoped>

</style>

```

We have created a new data property called `product` and set it to an object in the above scenario. We have also added the watchers as before.

Surprisingly, the functions won't be executed whenever a change occurs for `price` or `quantity`. The `product` property is an object and not a primitive value.

Vue provides us with the `deep` option in the `watch` property to overcome this limitation. This option will allow us to watch for changes in nested data structures.

This is achieved by defining our watcher to behave as an object that should receive a handler function. 

Let's look at our example:
```JavaScript
<template>

</template>

<script>
export default {
  name: "ProductComponent",
  data(){
    return{
      product: {
        name: '',
        price: 0,
        description: '',
        image: '',
        quantity: 0
      }
    }
  },
  watch:{
    quantity: {
      handler: function (newVal, oldVal) {
        if(newVal < 1){
          this.product.quantity = 1;
        }
      },
      deep: true
    },
    price: {
      handler: function (newVal, oldVal) {
        if(newVal < 1){
          this.product.price = 1;
        }
      },
      deep: true
    }
  }
}
</script>

<style scoped>

</style>

```

In the example above, we created a new data property called `product` and set it to an object. We have also added the watchers as before. Then in the watcher object we added a handler function. Whenever the `quantity` and `price` properties change, this function will be called.

This is the concept of deep watching in Vue.

> It has a limitation in that it requires the traversal of all nested properties in the object that we are watching. This is an expensive operation when it comes to algorithm efficiency. Only use when necessary.

### Conclusion
This tutorial taught us how to create a Vue.js project using the Vue CLI. We also learned how to use the `watch` property to achieve deep watching in nested data structures.

Happy coding!

---
Peer Review Contributions by: [Miller Juma](/engineering-education/authors/miller-juma/)
