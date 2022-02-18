---
layout: engineering-education
status: publish
published: true
url: /build-an-ip-address-tracker/
title: How to Build an IP Address Tracker using Mapbox API and Vue
description: In this article, we are going to look at building an IP Address Tracker using Mapbox API and Vue
author: abiola-farounbi
date: 2022-02-06T00:00:00-05:17
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/build-an-ip-address-tracker/hero.jpg
    alt: How to Build an IP Address Tracker with Mapbox API and Vue hero image
---

An IP (Internet Protocol) address is a set of numbers that represents the location website or device. Each number in the set ranges from 0 to 255, that is from 0.0.0.0 to 255.255.255.255. They are of two types - IPv4 and IPv6.

IPv4 is old and limited to 32-bit addresses while IPv6 is the new standard and allows for 128-bit addresses. IPv6 was created because all possible IPv4 addresses are close to being exhausted as many new devices are being assigned to them, so IPv6 is the new standard. Find more about IP addresses [here](https://www.elegantthemes.com/blog/wordpress/what-is-an-ip-address).

The IP Address of a user can be used for various dynamic purposes, one of which is **IP Geolocation**.

IP Geolocation is the identification of a geographic location of a device by using an IP address. This involves tracking the device based on the IP address assigned to it. The IP address contains information pointing to where the device is located such as the latitude, longitude, country, region (city), timezone, etc.

Various types of IP Geolocation APIs are available through different services to make the tracking process easier. By making a GET request to the API, we can get the result as the geographic information of the device such as:

- IP Address
- Country Details - continent, capital, city, region, flag.
- Internet Service Provider(ISP)
- Timezone details.
- Currency Details - code, symbol, and rates.
- Latitude and Longitude values.

In this guide, we’ll build an IP Address Tracker from scratch using the Vue.js framework, an IP geolocation API, and the Mapbox API. We’ll cover the process of building the front-end, handling the user's IP address, and visualizing the location on a map. At the end of this tutorial, readers will have a functional and ready-to-deploy web application.

> It is important to note that result returned from each API service varies. In this tutorial, we will be using the [IPWHOIS](https://ipwhois.io/) API service.

### Table of Contents

- [Prerequisites](#prerequisites)
- [The Features of the IP Address Tracker](#the-features-of-the-ip-address-tracker)
- [Scaffolding The Front End With Vue.js](#scaffolding-the-front-end)
- [Modifying the styling and creating the Vue files](#modifying-the-styling-and-creating-the-vue-files)
- [Integrating the APIs](#integrating)
- [Full code](#full-code)
- [Further reading](#further-reading)
- [Conclusion](#conclusion)

### Prerequisites
To follow along for this tutorial, one needs the following:

1. Node installed in your machine.
2. A basic knowledge of HTML, CSS, JavaScript.
3. Fundamental knowledge of  Vue.js. We will be using the Vue CLI version. Its documentation is found [here](https://cli.vuejs.org/).
4. Knowledge of Tailwind CSS. This one is not so necessary though since you can use your preferred styling method. Follow [this link](https://tailwindcss.com/) to find out more about it if you are interested in using it.

### The Features of the IP Address Tracker
For our application, we will add the following features to it:
1. A search feature based on the IP Address entered.
2. A dashboard to display the geographic location details.
3. A visual display of the map.

### Scaffolding The Front End With Vue.js

To kickstart the process, we will start by setting up our project.

Create a new Vue app using Vue CLI.

```bash
vue create ip-tracker
```

#### Installing the required packages

**Axios** - For making HTTP requests.

```bash
npm install axios 
```

**Tailwind CSS** -  To enable styling with ease, we will use Tailwind CSS in the project. Building UI components can be done in a faster and more efficient way using this library. In case you are not familiar with setting up Tailwind.css for your project, please check out [this comprehensive guide](https://javascript.plainenglish.io/how-to-setup-tailwind-css-in-vue-3-405c889842d9). Follow it step by step.

### Modifying the styling and creating the Vue files

In this section, we will look at the modifications we will have to make to our files to fit our project.

#### Modifying the stylings

> NOTE: I won't go into explaining the stylings for that is beyond the scope of this article. As I said beforehand, you can create your styling. It doesn't have to resemble this one.

After the Tailwind setup, we will do some configurations to the *tailwind.config.js* and the *app.css* files.

i. **tailwind.config.js**

Open it and replace the code with this:

```javascript
// tailwind.config.js
const colors = require("tailwindcss/colors");

module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, 
  theme: {
    colors: {
      primary: '#0066FF',
   
      black: colors.black,
      white: colors.white,
      gray: colors.coolGray,
      red: colors.red,
      yellow: colors.amber,
      green: colors.emerald,
      blue: colors.blue,
      indigo: colors.indigo,
      purple: colors.violet,
      pink: colors.pink,
    },
    extend: {},
    screens: {
      '2xl': {'max': '1535px'},
      
      'xl': {'max': '1279px'},
      
      'lg': {'max': '1023px'},
     
      'md': {'max': '767px'},

      'sm': {'max': '500px'},
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
```

ii. **app.css**

Replace the code with this:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer components {

    .textStyle{
        @apply my-2 font-black text-xl sm:text-base;
    }

    .boardStyle{
        @apply  rounded-xl text-white text-center text-base p-2 uppercase sm:my-4 text-sm;
    }
} 
```

#### Creating and modifying the Vue files
A simple and efficient way to create an application is by dividing each part into reusable components. Our application will be divided into three components:
1. Search Bar
2. Dashboard
3. Map Display

i. **App.vue**

We start by writing the following code in it:

```html
<template>
  <div id='app' class='font-serif m-0 p-0'>
   <div class="bg-primary h-1/2 py-8 px-8 ">
      <header>
        <h1 class='text-center my-4 text-white font-black text-2xl sm:text-xl '> 
           TRACK-U 
        </h1>
        <p class='text-center my-4 text-white font-black text-xl sm:text-base'> Highly Optimized IP Address Tracker </p>
      </header>
      <!-- The separate components -->
      <search-bar @trackIp="trackIpCall"/>
      <dashboard  :ipAddress="ipAddress" :isp="isp" :country="country" :countryFlag="countryFlag" :city="city" :currency="currency" :timezone="timezone" />
   </div>
    <map-display  :longitude="longitude" :latitude="latitude"/>
  </div>
</template>
```

The code we just wrote was for the layout setting where the components will be displayed.

Next, we add a script where we import the components:

```javascript
<script> 
import axios from "axios";
import MapDisplay from './components/MapDisplay.vue'
import Dashboard from './components/Dashboard.vue'
import SearchBar from './components/SearchBar.vue'
export default {
  name: 'App',
  components: {
    MapDisplay,
    Dashboard,
    SearchBar
  },
}
</script>
```

> There's still more code to be added in this file which we will look at later. For now, let's proceed to create the layouts of the three components.

Create three files called *SearchBar.vue*, *Dashboard.vue*, and *MapDisplay.vue* in the **components** folder.

ii. **SearchBar.vue**

This component will handle the IP Address capture typed in by the user. We can code the entirety of this component since it does not directly interact with any of the APIs. It has a method called `takeIP()` which just 'takes' the IP address typed in the search box after a click of a button or the ENTER key press. The IP address is then stored in a property called `searchInput` which will be later used in the API integration. Here is the code:

```html
<template>
      <form class="search-form m-6 flex justify-center items-center">
          <input class="search-input rounded-l-2xl w-3/4 p-4 border-0 sm:p-2" type="text 
          placeholder="Search using any IP address" v-model="searchInput" @keyup.enter="takeIp" 
           />
      <button class="p-4 rounded-r-2xl bg-black sm:p-2" type="submit" 
             @click.prevent="takeIp"> <i class="fas fa-search text-white text-xl"></i></button>
    </form>
</template>
<script>
import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'
export default {
  name: 'SearchBar',
  data() {
    return {
      searchInput: "",
    };
  },
  methods: {
    //this function is used for getting the typed in IP address
    takeIp() {
      this.$emit("trackIp", this.searchInput);
    },
  },
}
</script>
```

iii. **Dashboard.vue**

We will use this to display the geographic information obtained from the response of the IP Geolocation API. The dashboard displays the country, IP address, city, country flag, currency, ISP, and timezone.

```html
<template>
    <div class=" dashboard container mx-auto px-4 grid grid-cols-3 gap-x-16 gap-y-4 sm:block">
      <!-- div to show the IP address -->
        <div class='boardStyle'> 
            IP ADDRESS
            <p class='textStyle'> {{ipAddress}} </p>
        </div>

      <!-- div to show the Country -->
        <div class='boardStyle'>
            Country
            <p class='textStyle'> 
                {{country}}
                <img class='w-fit m-auto w-8' :src=countryFlag alt='Country Flag'/>
            </p>
        </div>
      <!-- div to show the City -->
        <div class='boardStyle'>
            City
            <p class='textStyle'> {{city}}</p>
        </div>
      <!-- div to show the ISP -->
        <div class='boardStyle'>
            isp
            <p class='textStyle'> {{isp}}</p>
        </div>
      <!-- div to show the Currency -->
        <div class='boardStyle'>
            currency
            <p class='textStyle'> {{currency}}</p>
        </div>
      <!-- div to show the timezone -->
        <div class='boardStyle'>
            timezone
            <p class='textStyle'> {{timezone}}</p>
        </div>
    </div>
</template>
```

iv. **MapDisplay.vue**

Finally, for handling the map display for each request, we will use this component. Add the following to it:

```html
<template>
<!-- The container to display the map -->
     <div id="map" class='w-full relative h-96 sm:h-60'></div>
</template>

```

### Integrating the APIs
> We will do a couple of edits in the Vue files, so don't start modifying the files yet. The full code for each Vue file will be provided at the end. Let's first look at the functions and the role they play in the tracking functionality using the APIs.

In the `App.vue` file, we will create a function called `getInfo()` to get the information obtained from the API request. In this function, we start by initializing the request through the API endpoint, getting the response, and then storing the values returned from the response in the appropriate properties. Note how the `searchInput` property plays a vital role - feeding the IP address to the IPWHOIS API endpoint.

```javascript
  getInfo(){
    // URL request to the API
      const endpoint = `https://ipwhois.app/json/${this.searchInput}`
      //getting the response using Axios
      axios.get(endpoint)
       .then((data) => data.data)
       .then((result) => {
        // Storing the values retrieved
            this.ipAddress = result.ip
            this.isp = result.isp
            this.longitude = result.longitude
            this.latitude = result.latitude
            this.country = result.country
            this.countryFlag = result.country_flag
            this.city = result.city
            this.currency = result.currency
            this.timezone = result.timezone_gmt
            
          })
         
          .catch(error => {
            console.log(error.message)
          })
    },
```

Next, we will create another function called `trackIpCall()` to get the value retrieved from the *SearchBar* component and then call the `getInfo()` function we just discussed.

```javascript
     trackIpCall(payload) {
      this.searchInput = payload;
      this.getInfo();
    },
```

With the help of a `props` object, the data is passed down from the parent components into the *Dashboard.vue*. This object will be created in the Dashboard component.

```javascript
 props: { 
    //the IP address fed in
      ipAddress:{
          type:String,
          required:true,
          default:''
      },
    //the ISP the user is using
     isp:{
          type:String,
          required:true,
          default:''
     },
     //the country where the device/use is currently located
   country:{
       type:String,
       required:true,
       default:''
   },
   //the image URL of the country flag
    countryFlag:{
         type:String,
         required:true,
          default:''
    },
    //the city where the device/use is currently located
    city:{
         type:String,
         required:true,
          default:''   
    },
    ////the currency of the country where the device/use is currently located
     currency:{
           type:String,
         required:true,
          default:''   
     },
     //the timezone where the device/use is currently located
    timezone:{
        type:String,
        required:true,
          default:''  
    }
}

```

#### Creating an Interactive Map Display with the Mapbox API
Here, we will be using Mapbox API for the *MapDisplay* component.

The API offers a library called **Mapbox GL JS** which is used to display maps in a web application. It also adds extra features to customize the map experience. **mapboxgl.Map** is a class that serves as the base framework for creating a map.

The following properties are needed to display the map in our application:

1. **accessToken**: An [access token](https://docs.mapbox.com/help/glossary/access-token/) is required for you to use the Mapbox API. This can be stored as an environment variable in your **.env** file as I have done. The access token can be accessed immediately after you sign up on the [MapBox API platform](https://www.mapbox.com/)

```javascript
    mapboxgl.accessToken =  process.env.VUE_APP_MAP_TOKEN
```

2. **container**: This is the HTML element in which the map will be rendered.

3. **style**: The URL for determining the style for the [tilesets](https://docs.mapbox.com/studio-manual/reference/tilesets/) being used.

4. **center**: The coordinates for the map's center are set using the longitude and latitude.

5. **zoom**: The zoom level in which the map can be viewed within a particular frame. It can either be a whole number or decimal.

We will pass the last four properties to an object and then later add zoom and rotation controls to the object using Mapbox GL JS' `addControl(new mapboxgl.NavigationControl())` function.

```javascript
      const map = new mapboxgl.Map({
      container: 'mapContainer', // container ID
      style: "mapbox://styles/mapbox/streets-v12",
      center: [this.longitude, this.latitude],
      zoom: 10
      });
```

Finally, we will add a marker to visually point to the location of the device. The marker will be placed at the exact coordinates on the map using the `setLngLat()` method.

```javascript
    //  Create a default marker colored black.
    const marker = new mapboxgl.Marker({ color: 'black' })
    .setLngLat([this.longitude, this.latitude])
    marker.addTo(map);
```

To implement these, we use a function called `displayMap()`.

```javascript

    displayMap(){
      // import the required JavaScript file for displaying the map
      let mapboxgl = require("mapbox-gl/dist/mapbox-gl.js");
      //access token
      mapboxgl.accessToken =  process.env.VUE_APP_MAP_TOKEN
      // the map object
      const map = new mapboxgl.Map({
      container: 'mapContainer', // container ID
      style: "mapbox://styles/mapbox/streets-v12",
      center: [this.longitude, this.latitude],
      zoom: 10
      });
    //adding zoom and rotation controls
     map.addControl(new mapboxgl.NavigationControl());

     
    //  Create a default marker colored black.
    const marker = new mapboxgl.Marker({ color: 'black' })
    .setLngLat([this.longitude, this.latitude])
    marker.addTo(map);
  },

```

This function will be called in the `mounted()` lifecycle method. It initializes the map based on the properties passed in the `displayMap()` method.

```javascript
  mounted() { // lifecycle method to load the map 
      this.displayMap();
  }
```

We then create a `watch` property to detect when the value of the properties changes and then display accordingly.

```javascript
   // watch props for any change in value and the calls map function
  watch: {
    longitude() {
      this.displayMap();
    },
    latitude() {
      this.displayMap();
    },
}
```

### Full code
Here is the final compiled code for each file.

i. **App.vue**

```html
<template>
  <div id='app' class='font-serif m-0 p-0'>
   <div class="bg-primary h-1/2 py-8 px-8 ">
      <header>
        <h1 class='text-center my-4 text-white font-black text-2xl sm:text-xl '> 
           TRACK-U 
        </h1>
        <p class='text-center my-4 text-white font-black text-xl sm:text-base'> Highly Optimized IP Address Tracker </p>
      </header>
      <!-- The separate components -->
      <search-bar @trackIp="trackIpCall"/>
      <dashboard  :ipAddress="ipAddress" :isp="isp" :country="country" :countryFlag="countryFlag" :city="city" :currency="currency" :timezone="timezone" />
   </div>
    <map-display  :longitude="longitude" :latitude="latitude"/>
  </div>
</template>

<script> 
import axios from "axios";
import MapDisplay from './components/MapDisplay.vue'
import Dashboard from './components/Dashboard.vue'
import SearchBar from './components/SearchBar.vue'

export default {
  name: 'App',
  components: {
    MapDisplay,
    Dashboard,
    SearchBar
  },

   data() {
    return {
      searchInput: "",
      ipAddress: "",
      isp: "",
      longitude:0,
      latitude:0,
      country:"",
      countryFlag:"",
      city:"",
      currency:"",
      timezone:"",
      result:{}
    };
  },

  mounted: function () {
    this.getInfo();
  },

  methods:{
    // Function to get the value searched for
     trackIpCall(payload) {
      this.searchInput = payload;
      this.getInfo();
    },

  getInfo(){
    // The Api request
      const endpoint = `https://ipwhois.app/json/${this.searchInput}`
      axios.get(endpoint)
       .then((data) => data.data)
       .then((result) => {
        // Storing the values obtained
            this.ipAddress = result.ip
            this.isp = result.isp
            this.longitude = result.longitude
            this.latitude = result.latitude
            this.country = result.country
            this.countryFlag = result.country_flag
            this.city = result.city
            this.currency = result.currency
            this.timezone = result.timezone_gmt
            
          })
         
          .catch(error => {
            console.log(error.message)
          })
    },
 
  }
}
</script>
```

ii. **Dashboard.vue**

```html
<template>
    <div class=" dashboard container mx-auto px-4 grid grid-cols-3 gap-x-16 gap-y-4 sm:block">
        <div class='boardStyle'> 
            IP ADDRESS
            <p class='textStyle'> {{ipAddress}} </p>
        </div>
        <div class='boardStyle'>
            Country
            <p class='textStyle'> 
                {{country}}
                <img class='w-fit m-auto w-8' :src=countryFlag alt='Country Flag'/>
            </p>
        </div>
        <div class='boardStyle'>
            city
            <p class='textStyle'> {{city}}</p>
        </div>
        <div class='boardStyle'>
            isp
            <p class='textStyle'> {{isp}}</p>
        </div>
        <div class='boardStyle'>
            currency
            <p class='textStyle'> {{currency}}</p>
        </div>
        <div class='boardStyle'>
            timezone
            <p class='textStyle'> {{timezone}}</p>
        </div>
    </div>
</template>


<script>
export default {
  name: 'Dashboard',
  // Passing the values as props.
  props: { 
      ipAddress:{
          type:String,
          required:true,
          default:''
      },
     isp:{
          type:String,
          required:true,
          default:''
     },
   country:{
       type:String,
       required:true,
       default:''
   },
    countryFlag:{
         type:String,
         required:true,
          default:''
    },
    city:{
         type:String,
         required:true,
          default:''   
    },
     currency:{
           type:String,
         required:true,
          default:''   
     },
    timezone:{
        type:String,
        required:true,
          default:''  
    }
}
}
</script>
```

iii. **MapDisplay.vue**

```html
<template>
<!-- The container to display the map -->
     <div id="mapContainer" class='w-full relative h-96 sm:h-60'></div>
</template>

<script>
export default {
  name: 'MapDisplay',
   props:{
    longitude:{
      type: Number,
      required: true,
      default:0
    },
    latitude:{
      type: Number,
      required: true,
      default:0
    },
   },
  mounted() { // lifecycle method to load the map 
    this.displayMap();
  },
   // watch props for any change in value and the calls map function
  watch: {
    longitude() {
      this.displayMap();
    },
    latitude() {
      this.displayMap();
    },
  },

  methods: {
      displayMap(){
        // import the required JavaScript file for displaying the map
        let mapboxgl = require("mapbox-gl/dist/mapbox-gl.js");
        //access token
        mapboxgl.accessToken =  process.env.VUE_APP_MAP_TOKEN
        // the map object
        const map = new mapboxgl.Map({
        container: 'mapContainer', // container ID
        style: "mapbox://styles/mapbox/streets-v12",
        center: [this.longitude, this.latitude],
        zoom: 10
        });
      //adding zoom and rotation controls
      map.addControl(new mapboxgl.NavigationControl());

      
      //  Create a default marker colored black.
      const marker = new mapboxgl.Marker({ color: 'black' })
      .setLngLat([this.longitude, this.latitude])
      marker.addTo(map);
    },
  }
}
</script>
```

iv. **SearchBar.vue**

```html
<template>
      <form class="search-form m-6 flex justify-center items-center">
      <input
        class="search-input rounded-l-2xl w-3/4 p-4 border-0 sm:p-2"
        type="text"
        placeholder="Search using any IP address"
        v-model="searchInput" @keyup.enter="takeIp"
      />
      <button class="p-4 rounded-r-2xl bg-black sm:p-2" type="submit" @click.prevent="takeIp"> <i class="fas fa-search text-white text-xl"></i></button>
    </form>
</template>

<script>
import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'
export default {
  name: 'SearchBar',
  data() {
    return {
      searchInput: "",
    };
  },
  methods: {
    //this function is used for getting the typed in IP address
    takeIp() {
      this.$emit("trackIp", this.searchInput);
    },
  },
}
</script>
```

Check out the [Demo](https://track-u.netlify.app/) and the [GitHub repository](https://github.com/Abiola-Farounbi/TRACK-U).

### Further reading
Read more about the two APIs using these links:
1. [IPWHOIS API documentation](https://ipwhois.io/documentation)
2. [MapBox API documentation](https://docs.mapbox.com/)

### Conclusion
In this tutorial, we have been able to develop the user interface of the application, integrate the IPWHOIS API, and finally display the geographic information on the map using the Mapbox API. Furthermore, with the concept of IP geolocation, websites can be built to suit the user's preference based on their geographic location thereby making it accessible for all.

You can reach out to me on [Twitter](https://twitter.com/abiolaesther_) for questions.

Thanks for reading!

---
Peer Review Contributions by: [Vincent Ngunzulu](/engineering-education/authors/vincent-ngunzulu/)
