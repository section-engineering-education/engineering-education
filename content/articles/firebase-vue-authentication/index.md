---
layout: engineering-education
status: publish
published: true
url: /firebase-vue-authentication/
title: Managing User State in Vue.js and Firebase Applications
description: This article will help the reader understand how to use Vuex 4, Firebase, and the Composition API in Vue 3.0 to set up a state management system.
author: anne-mwangi
date: 2022-03-02T00:00:00-05:30
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/firebase-vue-authentication/hero.jpg
    alt: Vuex 4 and Firebase Auth Hero Image
---
In this article, we will discuss how to use Vuex 4 and the Composition API in Vue 3.0 to set up a state management system for authenticating users with Firebase Auth. 
<!--more-->
These components will help us to have a global state that we can access from any place in the Vue.js application.

### Prerequisites
To follow along, you need:
- A basic understanding of Vue.js and the Composition API.
- Familiarity with *Firebase version 9*.
- *Node.js* installed on your local machine.
- A web browser.

### Goals
- Working with the Vuex 4 and the Composition API.
- Managing user state in Vue.js applications.
- Integrating Firebase in Vue.js.

### Getting Started
To create a Vue.js app, you need to have the Vue CLI. To install it, run the following command in your terminal:

```bash
npm install -g @vue/cli
```

After the installation is complete, go ahead and create a Vue app with the command below:

```bash
vue create firebase-vue-user-management
```

On this screen, choose `Vue 3`:

![preset](/engineering-education/firebase-vue-authentication/preset.png)

And lastly on this screen choose `Use NPM`:

![package manager](/engineering-education/firebase-vue-authentication/packagemanager.png)

The above configurations will create a Vue 3 application with *npm* as the package manager.

Now, run the following commands to install the dependencies that we will use in the project:

```bash
npm install vue-router@4

npm install vuex@next --save
```

- vue-router@4 - To set up routing in the Vue app.
- vuex@next - For state management.
  
### Setting up Firebase Auth
To create a new firebase project, click [here](https://firebase.google.com/) and select `Go to console` on the top navigation bar.

Here, click on `Add new project` and name the project `vue-firebase-auth`.

![New Project](/engineering-education/firebase-vue-authentication/addnewproject.png)

You will be redirected to the project's dashboard. On the dashboard, click on the web icon to register your front-end app.

![Dashboard](/engineering-education/firebase-vue-authentication/dashboard.png) 

Name your app `vuex-firebase-authentication` and click on `Register app`.

Copy the configuration provided by Firebase and click `Continue to console`.

Back on the dashboard, click `Authentication` in the left sidebar:

![Authentication](/engineering-education/firebase-vue-authentication/authentication.png)

Finally, enable `Email/Password` and `save`.

### Adding Firebase to the Vue.js app
Open the terminal and type the following command to install Firebase:

```bash
npm install firebase
```

After the installation is complete, create a new folder in the `src` folder and name it `firebase`. 

Inside this folder, create a `config.js` file. Modify the file with the following code:

```js
//Import the required methods
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

//The config we copied from firebase(Replace with your config)
const firebaseConfig = {
    apiKey: "",
    authDomain: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: ""
  };

//initialize the firebase app
initializeApp(firebaseConfig)

//initialize firebase auth
const auth = getAuth()

//export the auth object
export { auth }
```

In the above code, we have:
- Imported the required functions from Firebase. We will use `initializaApp()` to create a Firebase app instance and `getAuth()` to create a Firebase Auth object.

- We also used the config file from the Firebase platform and then invoked the `initializeApp()` method and passed in `firebaseConfig` as a parameter.

- Finally, we created an `auth` object using the `getAuth()` method.

### Creating a store
We now need to create a global store to help in state management. This will enable us to access and mutate the user state from any component.

To do this, create a folder `store` inside the `src` directory. In this `store` folder, create an `index.js` file and paste in the following code:

```js
import { createStore } from 'vuex'

//Firebase imports
import { auth } from '../firebase/config'
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut
} from 'firebase/auth'

const store = createStore({
    state: {
        //The user state will initially be null. After login, this state will be updated
        user: null
    },
    mutations: {
        //Mutation to update the user state
        //Takes in two arguments, the state and the payload. When we call this mutation, the payload will be user object from firebase auth
        //When the user logs out, we call the mutation and the payload will be null
        setUser(state, payload) {
            state.user = payload
            //Log out the user state
            console.log(state.user)
        }
    },
    actions: {
        async signup(context, { email, password }){
            const response = await createUserWithEmailAndPassword(auth, email, password)
            if (response) {
                context.commit('setUser', response.user)
            } else {
                throw new Error('signup failed')
            }
        },

        async login(context, { email, password }){
            const response = await signInWithEmailAndPassword(auth, email, password)
            if (response) {
                context.commit('setUser', response.user)
            } else {
                throw new Error('login failed')
            }
        },

        async logout(context){
            await signOut(auth)

            context.commit('setUser', null)
        }
    }
})

// export the store
export default store
```

In the code above we have:

- Imported `createStore()` from `vuex` which will us create a global store.

- Imported the `auth` object from the firebase folder.

- Imported 3 methods:
  -  `createUserWithEmailAndPassword()` to help create a user account with email and password.
  -  `signInWithEmailAndPassword()` to allow the user to login with email and password.
  -  `signOut()` to log out a user.

We also created a global store using the `createStore()` method and passed in an object containing the `state`, `mutations` and `actions`. 

`state` contains the pieces of state we want to keep track of. `mutations` are used to mutate/update the `state`. `actions` commit `mutations` which then update the `state`.

Inside the `state`, we have `user` state which is initially null. This piece of state will be updated when a user logs in.

The `setUser()` mutation is used to update the `user` state. It takes in two arguments, `state` and `payload`. This mutation is committed every time a user logs in, signs up, or logs out. 

When a user signs up or logs in, the `payload` will be the user object that is sent back from Firebase as a response. When the user signs out, the payload will be null.

There are also three actions that will be dispatched from various pages: 

The *signup() action* takes in the `email` and `password` which will be passed from the page where the action is dispatched. 

This action uses the `signInWithEmailAndPassword()` method to send a request to Firebase and parses the `auth`, `email`, and `password` as arguments. 

Firebase sends back a response in the form of an object and it is stored in the const `response`. 

If there is a response from firebase, the `setUser()` mutation is committed and `response.user` is passed as the payload. Else an error is thrown.

The *login() action* uses the same logic as the `signup()` action.

The *logout() action* uses the `signOut()` method which takes in the `auth` object as the only parameter. It then commits the `setUser()` mutation and passes `null` as the payload.

### Creating pages
We will style our project with Tailwind CSS. To learn how you can set up Tailwind with Vue, click [here](https://tailwindcss.com/docs/guides/vite).

After you set up Tailwind with Vue.js, you may encounter this error: `Error: PostCSS plugin tailwindcss requires PostCSS 8`. To correct this, run these commands:

```bash
npm uninstall tailwindcss postcss autoprefixer

npm install tailwindcss@npm:@tailwindcss/postcss7-compat @tailwindcss/postcss7-compat postcss@^7 autoprefixer@^9

npm run serve
```
Now, in the `src/components` folder, create a file named `Navbar.vue` and paste in the following code:

```js
<template>
  <nav class="flex items-center justify-between">
    <h1 class="text-2xl">Firebase Vuex Auth</h1>

    <!-- for all users -->
    <div class="">
      <router-link to="/">Home</router-link>
    </div>

    <!-- for logged in users -->
    <div class="flex space-x-4">
      <button>Logout</button>
    </div>

    <!-- for logged out users -->
    <div class="flex space-x-4">
      <router-link to="/login">Login</router-link>
      <router-link to="/signup">Signup</router-link>
    </div>
  </nav>
</template>

<script>
export default {

}
</script>
```

In the above code, we have created a basic Navigation bar with `Firebase Vuex Auth` as the main text. It also contains different pieces of text to be viewed by users based on their logged in state.

We have also linked the buttons to the respective pages using `router-link`. 

Next, in the `src` folder, create a `views` folder. In this directory, we will create the following pages:

- `Home.vue` - This will be the homepage.
- `Login.vue` - This will have a login page.
- `Signup.vue` - This will have a signup page.

Open the `Home.vue` page and paste in the following code:

```js
<template>
  <div class="mt-4">
    <div v-for="blog in blogs" :key="blog.id">
      <div class="mt-4 mb-4">
        <h3 class="text-xl underline">{{ blog.title }}</h3>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur aspernatur consectetur doloremque sunt ducimus enim iure animi fugit nulla et! Perferendis autem deleniti quo eum corrupti reiciendis voluptatem ab ducimus?</p>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
export default {
  setup() {
    const blogs = ref([
      { title: 'What is programming?', id: 1 },
      { title: 'What is JS?', id: 2 },
      { title: 'What is Python?', id: 3 },
    ])
    return { 
      blogs
    }
  }
}
</script>
```

**Code explanation:**

In the above code, we have used the Vue [setup() hook](https://v3.vuejs.org/guide/composition-api-setup.html#arguments) and created a `blogs` array that contains 3 objects with `title` and `id`. 

We then map through the `blogs` array in the `template` section and use `blog.id` as the key.

Next, open the `Login.vue` file and paste in the following code:

```js
<template>
  <form @submit.prevent="handleSubmit" class="mt-4 flex flex-col">
    <h3 class="text-xl underline">Login</h3>

    <label for="email">Email:</label>
    <input class="border w-4/12" type="email" name="email" v-model="email" required>

    <label for="email">Password:</label>
    <input class="border w-4/12" type="password" name="password" v-model="password" required>

    <button class="w-max mt-4 px-4 py-2 text-center rounded-full bg-blue-500 text-white">Login</button>
    <div v-if="error">{{ error }}</div>  
  </form>
</template>

<script>
import { ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

export default {
  setup() {
    const email = ref('')
    const password = ref('')
    const error = ref(null)

    const store = useStore()
    const router = useRouter()

    const handleSubmit = async () => {
      try {
        await store.dispatch('login', {
          email: email.value,
          password: password.value
        })
        router.push('/')
      }
      catch (err) {
        error.value = err.message
      }
    }
    return { handleSubmit, email, password, error }
  }
}
</script>
```

In the code above, we have created a login form with two input fields (email and password fields), a submit button and a `div` to show the error if there is one.

In the `setup()` hook, we have an asynchronous `handleSubmit` function that dispatches the `login` action from the store. 

When dispatching this action, `email` and `password` are passed in as the parameters. 

When a log in attempt is successful, the user is redirected to the homepage. If an error is encountered, an error message is displayed on the form.

Finally, open the `Signup.vue` file and paste in the following code:

```js
<template>
  <form @submit.prevent="handleSubmit" class="mt-4 flex flex-col">
    <h3 class="text-xl underline">Sign up</h3>

    <label for="email">Email:</label>
    <input class="border w-4/12" type="email" name="email" v-model="email" required>

    <label for="email">Password:</label>
    <input class="border w-4/12" type="password" name="password" v-model="password" required>

    <button class="w-max mt-4 px-4 py-2 text-center rounded-full bg-blue-500 text-white">Sign up</button>
    <div v-if="error">{{ error }}</div>
  </form>
</template>

<script>
import { ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

export default {
  setup() {
    const email = ref('')
    const password = ref('')
    const error = ref(null)

    const store = useStore()
    const router = useRouter()

    const handleSubmit = async () => {
      try {
        await store.dispatch('signup', {
          email: email.value,
          password: password.value
        })
        router.push('/')
      }
      catch (err) {
        error.value = err.message
      }
    }

    return { handleSubmit, email, password, error }
  }
}
</script>
```

The above code uses the same logic as the `Login.vue` page.

### Setting up routing
In the `src` folder, create a folder named `router`. In this folder, create an `index.js` file and paste in the following code:

```js
import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Signup from '../views/Signup.vue'
import Login from '../views/Login.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
```

**Code explanation:**

In the code above, we have imported all the `views`. We then created a `routes` array that contains 3 objects. 

These objects have path and a corresponding component to render when that path is visited. We then create our router using the `createRouter()` method.

### Configuring the Vue app to use the Router and the Store
To achieve this, open the `main.js` file and replace the existing code with the one below:

```js
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './index.css'

// import store
import store from './store/index'

createApp(App).use(router).use(store).mount('#app')
```

Finally, open the `App.vue` file and replace the existing code with the one below:

```js
<template>
  <div class="w-4/5 mx-auto mt-4">
    <Navbar />
    <router-view/>
  </div>
</template>

<script>
import Navbar from './components/Navbar'
export default {
  components: {Navbar}
}
</script>
```

### Testing the application
Run the code below to start a local development server.

```bash
npm run serve
```
Go to `localhost:8080` on your browser and you will see the this screen:

![Test Pic](/engineering-education/firebase-vue-authentication/testpic.png)

From here you can be able to test the login and signup actions.

### Conclusion
In this article, we have discussed how to implement authentication in Firebase, Vue.js application. 

However, this project can be improved further. For example, you can add more login options and add custom error messages.

Happy coding!

---
Peer Review Contributions by: [Adrian Murage](/engineering-education/authors/adrian-murage/)