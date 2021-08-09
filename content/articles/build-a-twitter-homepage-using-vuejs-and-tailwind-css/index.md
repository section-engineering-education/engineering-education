---
layout: engineering-education
status: publish
published: true
url: /clone-twitter-home-page-with-vue-and-tailwind/
title: Clone Twitter Home Page with Vue and Tailwind
description: In this tutorial, we are going to learn how to integrate Tailwind CSS into the Vue project. We are going to go through each configuration to set up tailwind CSS in the Vue project. The CSS classes provided by the Tailwind CSS to create a Twitter Home Page UI clone. 
author: worawat-kaewsanmaung
date: 2021-05-21T00:00:00-10:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/clone-twitter-home-page-with-vue-and-tailwind/hero.jpg
    alt: vue tailwind twitter homepage
---
Web development projects frequently use CSS frameworks nowadays, for proper and efficient styling of the UI. Using these CSS frameworks saves design time as most of the UI elements and classes are readily available for use. Yet, one disadvantage is that the CSS frameworks such as Bootstrap, Bulma, etc. are hardbound to their styles. 
<!--more-->
There is little to no customization available. However, there is one solution available that is flexible, lightweight, and customizable based on the requirements. That solution being [Tailwind CSS](https://tailwindcss.com/).

Tailwind CSS is a utility-first CSS framework packed with classes that can be composed to build any design, directly in your markup. It is easy to customize, adapts, and build. The doesn't bulk up the project as it is lightweight. It is a low-level CSS framework adapting to changing design implementations.

In this tutorial, we are going to learn how to integrate Tailwind CSS into the Vue project. We are going to go through each configuration to set up tailwind CSS in the Vue project. Then, we are going to use the CSS classes provided by the Tailwind CSS to create a Twitter Home Page UI clone. 

*So, let's get started!*

### Create Vue project
First, we are going to create a Vue project using Vue CLI. If you don't have Vue CLI installed then, you can simply install it by executing the following command:

```bash
npm install -g @vue/cli
# OR
yarn global add @vue/cli
```

After successful installation, we can use it to create the Vue project. We can create a new Vue project by executing the following command on the terminal:

```bash
vue create twitter-clone
```

Remember to select Vue version 3. All other configurations can be in default or customized based on requirements.

After the project has been successfully created, we can serve it by running the following command:

```bash
npm serve
```

### Integrating Tailwind CSS
The integration of steps for Tailwind CSS with Vue CLI is pretty simple. You can get detailed information from the official [documentation](https://github.com/tailwindlabs/tailwindcss-setup-examples/tree/master/examples/vue-cli). 

To integrate Tailwind CSS, we can simply execute the following command in the project terminal:

```xml
npm install tailwindcss @tailwindcss/ui
```

Then, we need to create **two config files** in the root project folder. 

First, we need to create a file called **Postcss.config.js**. This file will hold all the configurations to run post CSS events. Here, we just need to include the `tailwindcss` package along with `autoprefixer`. 

The required configuration is provided in the code snippet below:

```jsx
const purgecss = require('@fullhuman/postcss-purgecss')({
  // Specify the paths to all of the template files in your project
  content: [
    './src/**/*.html',
    './src/**/*.vue',
    './src/**/*.jsx',
    // etc.
  ],
  // Include any special characters you're using in this regular expression
  defaultExtractor: content => content.match(/[\w-/.:]+(?<!:)/g) || []
});

module.exports = {
  plugins: [
    require('tailwindcss'),
    require('autoprefixer'),
    ...process.env.NODE_ENV == 'production'
      ? [purgecss]
      : []
  ]
};
```

Another configuration file that we need to create is called **Tailwind.config.js**. This file will hold all the configurations for Tailwind CSS. The file exports the overall theme properties along with color, font-family. The connection between the Vue project and the `tailwindcss` plugin is established from this config file. 

The configurations are available in the code snippet below:

```jsx
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  theme: {
    container: {
      center: true
    },
    extend: {
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        'blue': '#1DA1F2',
        'darkblue': '#2795D9',
        'lightblue': '#EFF9FF',
        'dark': '#657786',
        'light': '#AAB8C2',
        'lighter': '#E1E8ED',
        'lightest': '#F5F8FA',
      }
    },
  },
  plugins: [
    require('@tailwindcss/ui'),
  ]
};
```

Next, we need to create a file called **tailwind.css** inside **./assets/styles**. Inside the file, we need to include the base CSS styles, components, and utility-style classes of Tailwind CSS as shown in the code snippet below:

```css
@tailwind  base;
@tailwind  components;
@tailwind  utilities;
```

Hence, we have successfully integrated the Tailwind CSS to our Vue project.

Since we are going to use some icons from the Fontawesome package, we need to add them to our project. For now, we are just going to include the CDN for Fontawesome icons in the index.js file as shown in the code snippet below:

```html
<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.6.3/css/all.css" integrity="sha384-UHRtZLI+pbxtHCWp1t77Bi1L4ZtiqrqD80Kn4Z8NTSRyMA2Fd33n5dQ8lWUE00s/" crossorigin="anonymous">
<link rel="stylesheet" href="https://rsms.me/inter/inter.css">
```

Since all our configurations are done and requirements for the project are already added. 

Now, we can move to implementing our Twitter clone UI using Tailwind CSS as styling component.

### Twitter Home screen UI clone implementation
#### Creating side menu
First, we are going to create a Side menu section. This section will include the menu options to navigate to other packages.

In the **App.vue** file, we need to replace the default code with the code from the following code snippet:

```jsx
export default {
  name: 'app',
  components: {
  },
  data() {
    return {
      tabs: [
        {icon: 'fas fa-home', title: 'Home', id:'home'},
        {icon: 'fas fa-hashtag', title: 'Explore', id: 'explore'},
        {icon: 'far fa-bell', title: 'Notifications', id: 'notifications'},
        {icon: 'far fa-envelope', title: 'Messages', id: 'messages'},
        {icon: 'far fa-bookmark', title: 'Bookmarks', id: 'bookmarks'},
        {icon: 'fas fa-clipboard-list', title: 'Lists', id: 'lists'},
        {icon: 'far fa-user', title: 'Profile', id: 'profile'},
        {icon: 'fas fa-ellipsis-h', title: 'More', id: 'more'}
      ],
    }
  }
}
```

To create the menu options easily, we are going to loop through an array. The array of tabs provided in the code snippet above includes icon name, title, and id for each menu option.

Now, the UI template code for this section is provided in the code snippet below:

```jsx
<template>
  <div id="app" class="flex container h-screen w-full">
    <div class="lg:w-1/5 border-r border-lighter px-2 lg:px-6 py-2 flex flex-col justify-between">
      <div>
        <button class="h-12 w-12 hover:bg-lightblue text-3xl rounded-full text-blue">
          <i class="fab fa-twitter"></i>
        </button>
        <div>
          <button v-for="(tab,index) in tabs" :key="index" @click="id = tab.id" :class="`focus:outline-none hover:text-blue flex items-center py-2 px-4 hover:bg-lightblue rounded-full mr-auto mb-3 ${ id === tab.id ? 'text-blue' : ''}`">
            <i :class="`${ tab.icon } text-2xl mr-4 text-left`"></i>
            <p class="text-lg font-semibold text-left hidden lg:block"> {{ tab.title }} </p>
          </button>
        </div>
        <button class="text-white bg-blue rounded-full font-semibold focus:outline-none w-12 h-12 lg:h-auto lg:w-full p-3 hover:bg-darkblue">
          <p class="hidden lg:block">Tweet</p>
          <i class="fas fa-plus lg:hidden"></i>
        </button>
      </div>
    </div>
  </div>  
</template>
```

The style classes used here are all from Tailwind CSS. The loops and logical operations are the results of the Vue programming ecosystem.

We will get the Side Menu section as shown in the screenshot below:

![side menu section](/engineering-education/build-a-twitter-homepage-using-vuejs-and-tailwind-css/side-menu-section.jpg)

### Add side menu dropdown
Now, we are going to add a dropdown menu to the bottom of the Side menu section. This dropdown will hold the user information and some buttons.

First, we need to define a boolean variable to handle the closing and opening of this dropdown as shown in the code snippet below:

```jsx
dropdown: false,
```

Next, we need to add the dropdown template code to just below the Upper menu section as shown in the code snippet below:

```jsx
…….Upper Menu Section…
.
.
.
.
<div class="lg:w-full relative">
  <button @click="dropdown = !dropdown" class="flex items-center w-full hover:bg-lightblue rounded-full p-2 focus:outline-none">
    <img src="https://randomuser.me/api/portraits/men/11.jpg" class="w-10 h-10 rounded-full border border-lighter" />
    <div class="hidden lg:block ml-4">
      <p class="text-sm font-bold leading-tight"> Kriss Kawa </p>
      <p class="text-sm leading-tight"> @kriss </p>
    </div>
    <i class="hidden lg:block fas fa-angle-down ml-auto text-lg"></i>
  </button>
  <div v-if="dropdown === true" class="absolute bottom-0 left-0 w-64 rounded-lg shadow-md border-lightest bg-white mb-16">
    <button @click="dropdown = false" class="p-3 flex items-center w-full hover:bg-lightest p-2 focus:outline-none">
      <img src="https://randomuser.me/api/portraits/men/11.jpg" class="w-10 h-10 rounded-full border border-lighter" />
      <div class="ml-4">
        <p class="text-sm font-bold leading-tight"> Kriss Kawa </p>
        <p class="text-sm leading-tight"> @kriss </p>
      </div>
      <i class="fas fa-check ml-auto test-blue"></i>
    </button>
    <button @click="dropdown = false" class="w-full text-left hover:bg-lightest border-t border-lighter p-3 test-sm focus:outline-none">
      Add an existing account
    </button>
    <button @click="dropdown = false" class="w-full text-left hover:bg-lightest border-t border-lighter p-3 test-sm focus:outline-none">
      Log out @kriss
    </button>
  </div>
</div>
```

We will get the result as shown in the code snippet below:

![add side menu dropdown](/engineering-education/build-a-twitter-homepage-using-vuejs-and-tailwind-css/add-side-menu-dropdown.gif)

### Creating a trending section
Now, we are going to add the trending section to our UI. This section will be displayed on the right side of the screen and show the trending topics. 

In order to add this section, we need to add the code from the following code snippet just below the side menu `div`:

```jsx
<!-- Tweet Section -->
    <div class="w-full md:w-1/2 h-full overflow-y-scroll">
    </div>
    <!-- Trending Section-->
    <div class="md:block hidden w-1/3 h-full border-l border-lighter py-2 px-6 overflow-y-scroll relative">
      <input class="pl-12 rounded-full w-full p-2 bg-lighter text-sm mb-4" placeholder="Search Twitter" />
      <i class="fas fa-search absolute left-0 top-0 mt-5 ml-12 text-sm text-light"></i>
    </div>
```

We will get the result shown in the screenshot below:

![create trending section](/engineering-education/build-a-twitter-homepage-using-vuejs-and-tailwind-css/create-trending-section.jpg)

Here, we already have the trending section along with a search bar. Now, we are going to add the trending topics section inside it.

For that, we need to define an array that holds the data for trending topics as shown in the code snippet below:

```jsx
trending: [
        {top: 'techies all around', title: 'Tech', bottom: 'The technology'},
        {top: 'Apps', title: 'Flutter', bottom: '100K Tweets'},
        {top: 'Animals', title: 'Shark larger than Great white', bottom: '115k tweets'},
        {top: 'The techies nation', title: '2m servers', bottom: '30k tweets'},
      ],
```

Now, we are going to loop through the `trending` array and display the UI template for trending topics using the code from the code snippet below:

```jsx
<input class="pl-12 rounded-full w-full p-2 bg-lighter text-sm mb-4" placeholder="Search Twitter" />
      <i class="fas fa-search absolute left-0 top-0 mt-5 ml-12 text-sm text-light"></i>
      <div class="w-full rounded-lg bg-lightest">
        <div class="flex items-center justify-between p-3">
          <p class="text-lg font-bold">Trends for You</p>
          <i class="fas fa-cog text-lg text-blue"></i>
        </div>
        <button v-for="(trend,index) in trending" :key="index" class="w-full flex justify-between hover:bg-lighter p-3 border-t border-lighter">
          <div>
            <p class="text-xs text-left leading-tight text-dark"> {{ trend.top}} </p>
            <p class="font-semibold text-sm text-left leading-tight"> {{ trend.title}} </p>
            <p class="text-left text-sm leading-tight text-dark"> {{ trend.bottom}} </p>
          </div>
          <i class="fas fa-angle-down text-lg text-dark"></i>
        </button>
        <button class="p-3 w-full hover:bg-lighter text-left text-blue border-t border-lighter">
          Show More
        </button>
      </div>
```

We will get the trending topics section as shown in the screenshot below:

![trending topics section](/engineering-education/build-a-twitter-homepage-using-vuejs-and-tailwind-css/trending-topics-section.jpg)

Now, just below the trending topics section inside the trending section, we are going to add the Follow section. The Follow section will display the user accounts that the user should follow. 

First, we need to define an array that holds the data of user accounts containing image, name, and username as shown in the code snippet below:

```jsx
follow: [
        {src: 'https://randomuser.me/api/portraits/men/79.jpg', name: 'Kriss Kovan', handle: '@kriss'},
        {src: 'https://randomuser.me/api/portraits/men/70.jpg', name: 'Danny D', handle: '@theD'},
        {src: 'https://randomuser.me/api/portraits/men/27.jpg', name: 'Hubert Aly', handle: '@alyway'}
      ],
```

Now to add the UI for the Follow section, we need to use the code from the following code snippet just below the trending topics `div`:

```jsx
<div class="w-full rounded-lg bg-lightest my-4">
  <div class=" p-3">
    <p class="text-lg font-bold">Who to Follow</p>
  </div>
  <button v-for="(user,index) in follow" :key="index" class="w-full flex hover:bg-lighter p-3 border-t border-lighter">
    <img :src="`${ user.src }`" class="w-12 h-12 rounded-full border border-lighter" />
    <div class="hidden lg:block ml-4">
      <p class="text-sm font-bold leading-tight"> {{ user.name }} </p>
      <p class="text-sm leading-tight"> {{ user.handle }} </p>
    </div>
    <button class="ml-auto text-sm text-blue py-1 px-4 rounded-full border-2 border-blue">
      Follow
    </button>
  </button>
  <button class="p-3 w-full hover:bg-lighter text-left text-blue border-t border-lighter">
    Show More
  </button>
</div>
```

We will get the result as shown in the screenshot below:

![follow section](/engineering-education/build-a-twitter-homepage-using-vuejs-and-tailwind-css/follow-section.jpg)

### Creating middle tweet section
Now, we are going to create the tweet section which is the middle part of the UI. This section will contain a Header, a Tweet input section to enter the tweets, and a tweets display section just below the input section.

For this we are going to start with the Header section. The Header section will contain a title and an icon. 

The code for this is provided in the code snippet below:

```jsx
<!-- Tweet Section -->
    <div class="w-full md:w-1/2 h-full overflow-y-scroll">
      <div class="px-5 py-3 border-b border-lighter flex items-center justify-between">
        <h1 class="text-xl font-bold">Home</h1>
        <i class="far fa-star text-xl text-blue"></i>
      </div>
    </div>
```

We will get the Header section as shown in the code snippet below:

![middle tweet section](/engineering-education/build-a-twitter-homepage-using-vuejs-and-tailwind-css/middle-tweet-section.jpg)


Next, is the Tweet Input section. The Tweet Input section will contain a text editor to write the tweets and a button to add the tweet to the tweet list.

We need to define some variables that will hold the tweet list as well as the text of the current tweet:

```jsx
tweetList: [
        {text: 'Why am I a nerd!'}
      ],
tweet: {text: ''}
```

Next, we need to implement a function that will add the current tweet to the tweet list once the tweet button is clicked. The overall implementation of the function is provided in the code snippet below:

```jsx
methods: {
    addTweet () {
      let temp = {
        text: this.tweet.text
      };
      this.tweetList.push(temp)
	this.tweet = {
        text : ""
      }

    }
  }
```

Now, we need to add the UI for the Tweet input section just below the Header section by using the code from the following code snippet:

```jsx
<div class="px-5 py-3 border-b-8 border-lighter flex">
  <div class="flex-none">
    <img src="https://randomuser.me/api/portraits/men/11.jpg" class="flex-none w-12 h-12 rounded-full border border-lighter"/>
  </div>
  <form v-on:submit.prevent = "addTweet" class="w-full px-4 relative">
    <textarea v-model="tweet.text" placeholder="What's up?" class="mt-3 pb-3 w-full focus:outline-none"/>
    <div class="flex items-center">
      <i class="text-lg text-blue mr-4 far fa-image"></i>
      <i class="text-lg text-blue mr-4 fas fa-film"></i>
      <i class="text-lg text-blue mr-4 far fa-chart-bar"></i>
      <i class="text-lg text-blue mr-4 far fa-smile"></i>
    </div>
    <button type="submit" class="h-10 px-4 text-white font-semibold bg-blue hover:bg-darkblue focus:outline-none rounded-full absolute bottom-0 right-0">
      Tweet
    </button>
  </form>
</div>
```

Here, we have used the `form` tag and called our `addTweet` function in the `submit` event of the `form` tag. The `button` has the `type` submit which means pressing the button will trigger the submit event in turn calling the `addTweet` function.

We can see the Tweet Input section as shown in the screenshot below:

![tweet input section](/engineering-education/build-a-twitter-homepage-using-vuejs-and-tailwind-css/tweet-input-section.jpg)

Now, we need to display the tweet list just below the Tweet Input section. For that, we need to use the code from the following code snippet:

```jsx
<div class="flex flex-col-reverse">
  <div v-for="(tweet, index) in tweetList" :key="index" class="w-full p-4 border-b hover:bg-lighter flex">
    <div class="flex-none mr-4">
      <img src="https://randomuser.me/api/portraits/men/11.jpg" class="h-12 w-12 rounded-full flex-none"/>
    </div>
    <div class="w-full">
      <div class="flex items-center w-full">
        <p class="font-semibold"> Kriss Kawa </p>
        <p class="text-sm text-dark ml-2"> @kriss </p>
        <p class="text-sm text-dark ml-2"> 2 sec </p>
        <i class="fas fa-angle-down text-dark ml-auto"></i>
      </div>
      <p class="py-2">
        {{ tweet.text }}
      </p>
      <div class="flex items-center justify-between w-full">
        <div class="flex items-center text-sm text-dark">
          <i class="far fa-comment mr-3"></i>
          <p> 1 </p>
        </div>
        <div class="flex items-center text-sm text-dark">
          <i class="fas fa-retweet mr-3"></i>
          <p> 0 </p>
        </div>
        <div class="flex items-center text-sm text-dark">
          <i class="fas fa-heart mr-3"></i>
          <p> 2 </p>
        </div>
        <div class="flex items-center text-sm text-dark">
          <i class="fas fa-share-square mr-3"></i>
        </div>
      </div>
    </div>
  </div>
</div>
```

We can now add our tweets to the tweet list as shown in the demo below:

![show tweet list](/engineering-education/build-a-twitter-homepage-using-vuejs-and-tailwind-css/show-tweet-list.gif)

Now, we are also going to add some mock tweets from the user. For that, we need to define an array variable that will hold the information regarding user image, name, username, tweet, time, likes, and comments as shown in the code snippet below:

```jsx
following: [
        {src: 'https://randomuser.me/api/portraits/women/52.jpg', name: 'Giza Lamo', handle: '@giza', time: '1.2 hr', tweet: 'The very essence of TailWindCSS??', comments: '500', retweets: '250', like: '52,003'},
        {src: 'https://randomuser.me/api/portraits/women/62.jpg', name: 'Doug mama', handle: '@mama', time: '25 min', tweet: 'Should I use Flutter now?', comments: '1000', retweets: '500', like: '70,003'},
        {src: 'https://randomuser.me/api/portraits/men/63.jpg', name: 'Ezy Pzy', handle: '@ezypzy', time: '2.7 hr', tweet: 'Get Ready for the tech revolution', comments: '10,000', retweets: '100,002', like: '200,003'},
      ],
```

Now, we just need to loop through the array to display these tweets. For that, we can use the code from the following code snippet:

```jsx
<div v-for="(follow,index) in following" :key="index" class="w-full p-4 border-b hover:bg-lighter flex">
  <div class="flex-none mr-4">
    <img :src="`${follow.src}`" class="h-12 w-12 rounded-full flex-none"/>
  </div>
  <div class="w-full">
    <div class="flex items-center w-full">
      <p class="font-semibold"> {{ follow.name }} </p>
      <p class="text-sm text-dark ml-2"> {{ follow.handle }} </p>
      <p class="text-sm text-dark ml-2"> {{ follow.time }} </p>
      <i class="fas fa-angle-down text-dark ml-auto"></i>
    </div>
    <p class="py-2">
      {{ follow.tweet }}
    </p>
    <div class="flex items-center justify-between w-full">
      <div class="flex items-center text-sm text-dark">
        <i class="far fa-comment mr-3"></i>
        <p> {{ follow.comments }} </p>
      </div>
      <div class="flex items-center text-sm text-dark">
        <i class="fas fa-retweet mr-3"></i>
        <p> {{ follow.retweets }} </p>
      </div>
      <div class="flex items-center text-sm text-dark">
        <i class="fas fa-heart mr-3"></i>
        <p> {{ follow.like }} </p>
      </div>
      <div class="flex items-center text-sm text-dark">
        <i class="fas fa-share-square mr-3"></i>
      </div>
    </div>
  </div>
</div>
```

Hence, we will get the result as shown in the code snippet below:

![complete twitter clone with vue and tailwind](/engineering-education/build-a-twitter-homepage-using-vuejs-and-tailwind-css/complete-twitter-clone-with-vue-and-tailwind.jpg)

Finally, we have successfully implemented the Twitter Home Page UI clone using Vue version 3 along with Tailwind CSS.

### Conclusion
The main objective of this tutorial was to show the integration and usage of Tailwind CSS in the Vue ecosystem and create the Twitter Home page UI clone in the process. The Tailwind CSS was easy to configure which required a few configuration files and imports. Using these Tailwind CSS classes was simple and easy just like normal CSS classes. 

This made the UI development even simpler and easy. The layout design along with other style implementations was awesome. We can see from the final result of the Twitter Home page; how the design implementations were made easier by Tailwind CSS. The class properties are similar to regular CSS in Tailwind CSS which can be customized based on the needs. 

The major advantage is that Tailwind CSS does not impose strong style implements as in other CSS frameworks like Bootstrap. Bulma, etc.

Happy coding!

---
Peer review contribution by: [Odhiambo Paul](/engineering-education/authors/odhiambo-paul/)
