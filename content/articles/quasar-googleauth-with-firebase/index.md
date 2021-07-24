---
layout: engineering-education
status: publish
published: true
url: /quasar-googleauth-with-firebase/
title: Google Authentication using Firebase in a Quasar Vue.js Application
description: This tutorial will help the readers to set up Google authentication using Firebase in a Quasar Vue.js application. 
author: espira-marvin
date: 2021-07-24T00:00:00-12:59
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/quasar-googleauth-with-firebase/hero.jpg
    alt: Google Authentication using Firebase in a Quasar Vue.js Application Hero Image
---
In an application, providing a specific authorization flow will ease the authentication of users with guaranteed security. Open Authorization (OAuth) provides such a standard without having to deal with users' sensitive data such as their passwords. Firebase implements OAth 2.0 with google auth provider in the most coherent way.
<!--more-->

### Prerequisites

To follow along with this tutorial, you'll need:
- A basic knowledge of [Vue.js](https://vuejs.org/).
- [Node.js](https://nodejs.org/) 10.x or newer, excluding 13 and 15. These versions are not tested with Quasar.
- [NPM](https://www.npmjs.com/package/npm5) 5.10 or newer / Yarn 1.2 or newer.

### Setting up Quasar Vuejs app

Before we set up the app, let's check whether Quasar CLI is globally installed on your computer. Using the terminal run:

```bash
quasar -v
```

If you get a command not found error, run the following command to install it:

```bash
npm install -g @quasar/cli
```

If you are using yarn, run:

```bash
yarn global add @quasar/cli
```

### Create a quasar-firebase-app with Quasar

Creating a quasar app is a simple step. You're going to do it on your own.

Visit this link [Getting Started with the Quasar Framework](https://www.section.io/engineering-education/getting-started-with-quasar-framework/)
and follow the installation process. When done, come back here to continue.

### Creating our app components

Navigate to the `src` folder, open `Index.vue`, delete the image tag that looks like below:

```HTML
<img alt="Quasar logo" src="~assets/quasar-logo-full.svg">
```

Rename the `Index.vue` file to `Auth.vue` and create another file named `Home.vue` inside the `pages` folder. Then add a div tag `<div>` inside the template tag with the following code:

```HTML
<template>
  <q-page class="flex q-pa-md">
      Welcome Home
    <q-space />
    <div>
      <q-btn
        class="flex flex-center q-px-lg q-py-sm q-mb-md"
        size="md"
        label="Logout"
        @click="logout"
        color="primary"
      />
    </div>
  </q-page>
</template>
```

Inside the `<Script>` tag add the code below:

```JavaScript
export default {
name: "Home",
  data () {
  return {}
  },
  methods: {
    logout() {
      console.log('logged out')
    }
  }
}
```

Now, navigate to the `router` folder, open `routes.js`, and edit the default route properties to match individual components as below.

We're going to create the components as our next step.

```JavaScript
const routes = [
  {
      path: '/',
      component: () => import('layouts/MainLayout.vue'),
      children: [
          { path: '/', component: () => import('src/pages/Auth.vue') },
          { path: '/home', component: () => import('src/pages/Home.vue'), meta: {requiresAuth: true} }
      ]
  },
  // Always leave this as the last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue')
  }
]
export default routes
```

According to the routes above, the `/` path is allowed for everyone, but the `/home` is only for signed-in users.

The `requiresAuth` meta property is set to `true`, which is responsible for guarding routes.

This will be well demonstrated after adding firebase to our application. 

### Signup/Signin component

We're going to create a signin/signup component. Navigate to `components` folder, create a new file `AuthComponent.vue` and paste the code below:

```HTML
<template>
  <div>
    <template v-if="tab === 'register'">
      <div class="text-center q-mb-lg">Sign up with</div>
    </template>
    <template v-else>
      <div class="text-center q-mb-lg">Sign in with</div>
    </template>
    <div class="flex flex-center">
      <q-btn class="flex flex-center q-px-lg q-py-sm q-mb-md" color="primary" size="md"  label="Google" 
        @click="google" 
      />
    </div>
    <template v-if="tab === 'register'">
      <p class="text-center">Sign up with credentials</p>
    </template>
    <template v-else>
      <p class="text-center">Sign in with credentials</p>
    </template>

    <q-form @submit="submitForm">
      <q-input outlined class="q-mb-md" type="email" label="Email" v-model="formData.email" />
      <q-input outlined class="q-mb-md" type="password" label="Password" v-model="formData.password" />
      <div class="row">
        <q-space />
        <q-btn type="submit" color="primary" :label="tab" />
      </div>
    </q-form>
    <div class="text-center q-my-md">
      <q-btn flat label="Forgot Password?" color="green" class="text-capitalize rounded-borders"
        v-if="tab !== 'register'" @click="forgotPassword" />
    </div>
    <q-dialog v-model="resetPwdDialog">
      <ForgotPassword />
    </q-dialog>
  </div>
</template>
```

This is a tab that displays AuthComponent for signing in and signing up. For the `<script>` tag paste the code below:

```JavaScript
import ForgotPassword from "./ForgotPassword.vue";
export default {
  name: "AuthComponent",
  props: ['tab'],
  components: { ForgotPassword },
  data (){
    return {
      formData: {
        email: '',
        password: ''
      },
      resetPwdDialog: false
    }
  },
  methods: {
    submitForm () {
      if (this.tab === 'login') {
         this.signInExistingUser(this.formData.email, this.formData.password)
      } else {
        this.createUser(this.formData.email, this.formData.password)
      }
    },
    google () {
      console.log('google login & signup')
    },
     signInExistingUser (email, password) {
      console.log(email, password)
    },
    createUser(email, password) {
      console.log(email, password)
    },
    forgotPassword () {
      this.resetPwdDialog = true
    }
  }
}
```

In the code above, we imported the `ForgotPassword` component which we're going to create next. The data function has form input data.

The methods `google()` will handle the firebase google authorization while the `forgotPassword()` alongside `resetPwdDialog` data property will display a dialog for password resets.

### Creating Forgot Password component

In this next stage, we're going to create the `ForgotPassword` component, in the `components` folder create the `ForgotPassword.vue` file and paste the following code in it:

```HTML
<template>
  <div class="flex flex-center">
    <q-card style="width: 500px; max-width: 40vw;">
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h6">
          Reset Password
        </div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>
      <q-card-section class="q-pt-md">
        <q-form ref="resetPasswordForm">
          <q-input
            type="email"
            v-model="form.email"
            label="Email *"
            lazy-rules
            :rules="[val => (val && val.length > 0) || 'Please type your email']"
          />
        </q-form>
        <q-card-actions align="right">
          <div class="row q-mt-xs">
            <q-btn
              class="q-pl-md q-pr-md q-mr-md text-capitalize rounded-borders"
              label="Submit"
              color="primary"
              @click="resetPassword"
            />
          </div>
        </q-card-actions>
      </q-card-section>
    </q-card>
  </div>
</template>
```

In the `<script>` tag paste the code below:

```JavaScript
export default {
  name: "ForgotPassword",
  data (){
    return {
      form: {
        email: ''
      }
    }
  },
  methods: {
    resetPassword () {
      // firebase reset password
    }
  }
}
```

This component is imported to the `AuthComponent.vue` which has a form for password resetting.

By now, everything is not displayed correctly yet. Navigate to the `pages` folder, open `Auth.vue ` and paste the code below:

```HTML
<template>
  <q-page class="flex q-pa-md">
    <q-card class="full-width">
      <q-tabs
        v-model="tab"
        dense
        class="text-grey"
        active-color="primary"
        indicator-color="primary"
        align="justify"
        narrow-indicator
      >
        <q-tab name="login" label="Login" />
        <q-tab name="register" label="Register" />
      </q-tabs>


      <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="login">
          <AuthComponent :tab="tab" />
        </q-tab-panel>

        <q-tab-panel name="register">
          <AuthComponent :tab="tab"/>
        </q-tab-panel>
      </q-tab-panels>
    </q-card>
  </q-page>
</template>
```

The `AuthComponent` above is imported to the `pages/Auth.vue` with props for register and login tabs. In the `<script>` tag paste the following code:

```JavaScript
import AuthComponent from "components/AuthComponent";
export default {
  components: { AuthComponent },
  data () {
    return {
      tab: 'login'
    }
  }
}
```

### Add Firebase to our application

To add firebase to our app, ensure the following is done correctly:

1. Visit [firebase console](https://console.firebase.google.com/u/0/).
2. Click `Add Project` to create a firebase project to connect to our app. Name it `quasar-google-auth` and click `Continue`.
3. Disable Google Analytics for this project and click `Continue` to create our project.
4. After the project is ready click `Continue`. It will take you to the project overview. Click the `web` icon, register an app name and name it `quasar-firebase-googleauth`, and click `Register App`.
5. You'll be taken to `Step 2 - Add Firebase SDK` and copy the whole script.

We're going to install firebase and create a boot file to initialize firebase before our app runs.

Go back to our project, open the terminal, and run the below commands:

```bash
yarn add firebase
quasar new boot firebase
```

Navigate to the `quasar.conf.js` file and search for `boot`. It should be an empty array. Add the `firebase.js` boot file in it as indicated below.

```JavaScript
boot: ['firebase'],
```

Navigate to the `boot` folder and open the `firebase.js` file. 

Replace the existing code in the `firebase.js` file to resemble the one below, then paste the firebase SDK script you copied from the previous step.

```JavaScript
import firebase from "firebase";

const firebaseConfig = {
    apiKey: "xxxxxxxxxxx",
    authDomain: "xxxxxxxxxx",
    projectId: "xxxxxxxxxx",
    storageBucket: "xxxxxxxx",
    messagingSenderId: "xxxxxxxxx",
    appId: "xxxxxxx"
  };
  firebase.initializeApp(firebaseConfig);

export default firebase
```

### Access Control for Routes

We're going to disable access to routes that require authorization when a user needs to access them. This is quite easy. Navigate to the `routes` folder, open the `index.js` file.

Import Firebase at the top of the file just like we did in the `firebase.js` boot file.

When done, add the following code just above the line `return Router`:

```JavaScript
  Router.beforeEach(async (to, from, next) => {
    const auth = to.meta.requiresAuth
    if (auth && !await firebase.getCurrentUser()) {
      next('/');
    } else {
      next();
    }
  })
```

Now if the currentUser is null or undefined, we should redirect users to the auth path (`/`). But how do we get currentUser? We can’t use `firebase.auth().currentUser` because on page refresh that property has not been set yet before the `requiresAuth` guard is triggered.

We'll have to use the `onAuthStateChanged` callback somehow. We have to add a method to the firebase object after we initialize the firebase app. The method is added to the `firebase.js` boot file. Edit the firebase boot file to resemble the code below.

```JavaScript
const firebaseConfig = {
    apiKey: "xxxxxxxxxxx",
    authDomain: "xxxxxxxxxx",
    projectId: "xxxxxxxxxx",
    storageBucket: "xxxxxxxx",
    messagingSenderId: "xxxxxxxxx",
    appId: "xxxxxxx"
  };
  firebase.initializeApp(firebaseConfig);

  firebase.getCurrentUser = () => {
    return new Promise((resolve, reject) => {
      const unsubscribe = firebase.auth().onAuthStateChanged(user => {
        unsubscribe();
        resolve(user);
      }, reject);
    })
  };
```  

`firebase.getCurrentUser` will return a Promise which resolves currentUser as soon as it is set. `onAuthStateChanged` will trigger the callback immediately with either null or the user object if signed in. Then we unsubscribe to not listen for further changes.

### Activate SignIn methods

We need to activate sign-in methods provided by firebase, we'll activate the `google` and `Email/Password` providers. Go back to the firebase console where we copied the firebase SDK script. Click `Continue to console`, it will take you to the project overview.

On the left sidebar click `Authentication`, then click `Set up sign-in method`. The image below displays the location of the sign-in providers.

![Sign-in methods](/engineering-education/quasar-googleauth-with-firebase/siginmethods.png)

Click on `Email/Password` and `Google` providers to activate them, as default they're disabled as seen in the above image.

For Email/Password click the first toggle button, don't enable the `passwordless sign-in` option.

![Enable Email/Password Provider](/engineering-education/quasar-googleauth-with-firebase/emailpasswordprovider.png)

As for Google, the provider makes sure to fill in your `Project support email`, preferably your email address.

![Enable Google Provider](/engineering-education/quasar-googleauth-with-firebase/googleprovider.png)

Once done, we can get started adding functionalities to our view.

### Adding sign-in with google provider functionality

Navigate to `AuthComponent.vue` file. Let's import firebase. As indicated below:

```javascript
import firebase from "firebase";
```

In the `google()` method, we create a provider variable, containing the `GoogleAuthProvider` that's used to sign in the user with google. Edit the `google()` method to resemble the code below.

```JavaScript
google () {
  const provider = new firebase.auth.GoogleAuthProvider()
  firebase.auth().signInWithPopup(provider)
  .then(result => {
    console.log('result', result)
    this.$q.notify({message: 'Sign In Success.'})
    this.$router.push('/home')
  })
  .catch(error => console.log('error',error))
},
```

This should be able to sign you in when you click the `Google` sign-in button.

Before clicking the button, navigate to the `quasar.conf.js` file, search for `plugins`, this should be an empty array. Add notify plugin, this will provide notification when authentication is done. The plugin should be added as a string. As indicated below:

```JavaScript   
plugins: [ 'Notify' ]
```

After adding the plugin, let's complete the other provider (Email/Password), which comes in handy when a user does not want to sign in with Google.

### Adding the Email/Password provider functionality

Open the` AuthComponent.vue` file, in the `createUser()` method, this method will be used to create a new user to the database, paste the following code for the method.

```JavaScript
createUser(email, password) {
  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(auth => {
      this.$q.notify({message: 'Sign In Success.'})
      this.$router.push('/home')
    })
    .catch(error => {console.log(error)
    })
},
```

When a user is created it redirects the user to the home page, with a `Sign In Success` notification at the bottom of the page.

Next, we're going to create a `signInExistingUser()` method, this sign in already registered users. Paste the following code for the method:

```JavaScript
signInExistingUser (email, password) {
  firebase.auth().signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      this.$q.notify({message: 'Sign In Success.'})
      this.$router.push('/home')
    })
    .catch(error => { console.log(error)})
},
```

By now, you can sign in with Google or with your email/password. If successful, you are redirected to the home page, containing a welcome message and a logout button.

If you're working locally, and have encountered a problem signing in, go to the firebase console in the project, click `Authentication`, then `Sign-in method`, below `Sign-in providers`, you'll see `Authorized domains`. Click `Add domain` and add `localhost`. You can add custom domains when your app is hosted.

![Customize Domain](/engineering-education/quasar-googleauth-with-firebase/domain.png)

Next, we're going to add the logout functionality once a user is signed in, they should be able to log out of the app.

### Adding the Logout functionality

At this stage, if you've done everything correctly, you're able to sign in and get redirected to the home page, where you'll see a logout button.

To add the logout function, navigate to the `Pages` folder, open `Home.vue` file, at the beginning of the `<script>` tag `import firebase from "firebase"`, just like in the `AuthComponent.vue` file

In the method `logout` replace its code to resemble the code below:

```JavaScript
logout() {
  firebase.auth().signOut()
  this.$router.push('/')
    .then(() => {
    this.$q.notify({message: 'Sign Out Success.'})
  })
  .catch(error =>  console.log('error',error))
}  
```

This method redirects the user to the auth route and notifies them they've been signed out.

### Adding the Forgot Password functionality

In case a user forgets their passwords, they should be able to reset to a new one and interact with our app. Let's take care of that.

Navigate to the `ForgotPassword.vue` file, it has a method reset password which we added sometime earlier. This method will help us send an email for password resetting.

The following code is for the method:

```JavaScript
resetPassword () {
  firebase.auth().sendPasswordResetEmail(this.form.email)
    .then(() => {
      this.form = {}
      this.$q.notify({message: 'Check you email and reset your password.'})
    })
    .catch(error => console.log(error))
}
```

If a user enters their email and it exists in the database, an email is sent to the user to reset the password. If the email does not exist, an error is thrown.

### Access user information 

When a user is logged in, we can access information about them and display it with a welcome home message. Navigate to the `Home.vue` file. Let's make a few changes.

At the `<template>` tag edit the welcome message to resemble this below:

```HTML
Welcome Home {{ user }} {{ email }}
```  

In the `<script>` tag add two data properties to hold the user's name and email that has signed in successfully. Edit the data function, to resemble below:

```JavaScript
data () {
  return {
    user: '',
    email: ''
  }
},
```

Now, lets add a lifecycle hook, when a user is redirected to the home page, we access the user's information and display it to them. Inside the  `<script>` tag just after the data function paste the hook `created()` below:

```JavaScript
data () { return { ... }},
created() {
  firebase.auth().onAuthStateChanged((auth) => {
    if (auth) {
      this.user = auth.displayName
      this.email = auth.email
    } else {
      console.log('user name is null')
    }
  })
},
methods: {...}
```

When a user signs in either with google or email/password, it will display the welcome message alongside their name and email, or with their email if the username is null.

### Conclusion

Firebase implementation of google authentication with standards such as the OAuth 2.0 has proven to be one of the best solutions to provide authentication for applications.

Be it a large or a small scale application, letting a 3rd party application handle your users' sensitive information is reliable, shortens application development time and the 
most important, it enables the integration of other social media authentications such as Facebook, Twitter, and GitHub.

This makes new users sign in to your applications with ease. 
Resulting in more users accessing services your application offers.
 
I have provided a [link to the repo](https://github.com/EspiraMarvin/quasar-firebase-googleauth-app) and a [link to the demo app](https://quasar-firebase-googleauth-app.vercel.app/). 

Happy Coding!

---
Peer Review Contributions by: [Mohan Raj](/engineering-education/authors/mohan-raj/)
