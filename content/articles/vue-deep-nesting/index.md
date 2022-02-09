### Introduction
When working with data in most cases, for example, forms, you will need to watch the data and fire an event whenever a change occurs.

This usually is possible whenever we work with data structures such as arrays, objects, or strings. However, when we have a nested kind of data, this watcher doesn't work by default in Vue.js.

In this tutorial, we will learn how to use Vue.js to watch for changes in nested data structures. Then, we'll look at the detailed implementation of this feature to achieve the watch functionality.

### Table of contents
- [Introduction](#introduction)
- [Table of contents](#table-of-contents)
- [Prerequisites](#prerequisites)
- [Objectives](#objectives)
- [What are watchers?](#what-are-watchers)
- [Vue project setup](#vue-project-setup)
- [A quick look at watchers example](#a-quick-look-at-watchers-example)
- [Implementing deep watching in nested data structures](#implementing-deep-watching-in-nested-data-structures)
- [Conclusion](#conclusion)

### Prerequisites
To follow this tutorial along, you will need the following;
- Basic knowledge of JavaScript, especially the ES2016 and above.
- Basic understanding of the Vue.js framework. The concepts may be similar if you're coming from another library such as React or Angular.
- A Vue CLI is locally installed. In this tutorial, we will use the CLI version 4.15.x. This is the current version at the time of this writing, which may change at the time of your reading.
- An  IDE of your choice. In this tutorial, we will use Visual Studio Code.

### Objectives
In this tutorial, we will learn how to use Vue.js to watch for changes in nested data structures.

### What are watchers?
At the highest level, we could describe a watcher as a function called whenever a change occurs in the data. However, in some cases, 
we may want to be notified when a change occurs in a specific property of the data. For example, if we have a data structure like the following:
```javascript
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

In the above data structure, we have a property called `name` that is a string. We also have a property called `age` that is an integer. Finally, we also have a property called `address` that is an object.

We can use the event listener ' change' to detect changes happening in the `name` property. However, this is not the case for the `street` property. 

This is the case because Vue.js or any other programming language doesn't know how to watch for changes in nested data structures.

To overcome this limitation, Vue.js provides us with a way to watch over changes occurring in nested data structures, as we'll see in the next section.

### Vue project setup
Vue.js is a component-based framework. Therefore, to use Vue.js, we need to create a Vue project.

Let's run the following command to create a new Vue project called `vue-watcher-tutorial`.
```bash
vue create vue-watcher-tutorial
```

The above command will create a new directory called `vue-watcher-tutorial` in the current directory.

Next, we need to dockerize our Vue project. To achieve this, let's add a `Dockerfile` to our project root directory. The `Dockerfile` will contain the following:
```dockerfile
# get node version, you even use the LTS
FROM node:16.13.2-alpine
# install a test server to run our project
RUN npm install http-server
# set our work directory to watcher-tutorial
WORKDIR /watcher-tutorial
# copy the package.json. You may as well add the lock file
COPY package.json ./
# if you're planning to add private dependencies in the future, set the scope to organisation name
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
```npmrc
//registry.npmjs.org/:_authToken=npm_mexxxxxaSvdxxxGUnR8O9cU2sxxxxxxxxxxx
```

The `//` slash indicates that the registry is private. In some cases, it adds the `http/https` protocol to the registry.

Next, let's build the docker image. To do this, we will run the following command:

```bash
docker build -t watcher-tutorial .
```

We will get a new docker image called `watcher-tutorial` when the build process is done. Next, we will run the following command to run the docker image:
```bash
docker run -p 8000:8000 watcher-tutorial
```

You can now access your hot-reloaded Vue project on the `localhost:8000`.

However, if you don't want to use docker, you can run the following command to run the project:
```bash
npm run serve
```

In the next section, let's learn how to use Vue.js to watch for changes in nested data structures.

### A quick look at watchers example
Now that we've our project setup let's proceed and create a new component called `ProductComponent.vue`.

Next, edit this component as follows:
```javascript
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

We have created a new component called `ProductComponent.vue` in the above component. We then created a new data property called `quantity` and set it to 0. We also created a new data property called `price` and set it to 0.

Next, we have created a new watch property called `quantity` and set it to a function. This function will be called whenever the `quantity` property changes. The function will receive the new value and the old value as parameters.

We also created a new watch property called `price` and set it to a function. This function will be called whenever the `price` property changes. The function will receive the new value and the old value as parameters.

We notice that achieving this behaviour is quite straightforward from the above. However, what happens when we have the `price` and `quantity` properties as nested data structures?

### Implementing deep watching in nested data structures
Now that we have an example of the `watch` property in action, we will learn how to implement deep watching in nested data structures in this section.

Let's start by modifying the previous component we had earlier created,  `ProductComponent.vue`, as follows:
```javascript
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

Surprisingly, the functions won't be executed whenever a change occurs for either `price` or `quantity`. This is because the `product` property is an object and not a primitive value.

Vue provides us with the `deep` option in the `watch` property to overcome this limitation. This option will allow us to watch for changes in nested data structures.

This is achieved by defining our watcher so that it behaves as an object that should receive a handler function. Let's look at the example:
```javascript
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

In the above example, we have created a new data property called `product` and set it to an object. We have also added the watchers as before.

But then, in the watcher object, we have added a handler function. Whenever the `quantity` and `price` properties change, this function will be called.

This is the concept of deep watching in Vue.

### Conclusion
This tutorial has taught us how to create a Vue.js project using the Vue CLI. We have also learned how to use the `watch` property to achieve deep watching in nested data structures.

Happy coding!
