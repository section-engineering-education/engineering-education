An IP(Internet Protocol) address is a set of numerical codes that identify where a website or device is located. This is a string of numbers separated by periods. Each number in the set ranges from 0 to 255, that is from 0.0.0.0 to 255.255.255.255. 
They are of two types which are: IPv4 and IPv6.
IPv4 is old and limited to a 32-bit address while IPv6 is the new standard and allows for 128-bit addresses. The creation of IPv6 is because all possible IPv4 addresses are close to being assigned, so IPv6 is the new standard.

The IP Address of a user can be used for various dynamic purposes one of which is **IP Geolocation** which is the identification of a geographic location of a device by using an IP address. This involves tracking based on IP addresses to the country, region (city), latitude/longitude, timezone, and other useful things.
In this guide, we’ll build an IP Address Tracker Application from scratch, using the vue.js framework and the Mapbox API. We’ll cover the process from building the front-end scaffolding up to implementing the API to handle the user's IP address, then go further to visualize the location on the map using the Mapbox API. At the end of this tutorial, readers would have a functional and ready to deploy a web application.


# The Features of the IP Address Tracker.

From the concept of IP geolocation, we are going to be building an IP Address Tracker. A device connected to the internet service is automatically allocated an IP address with that the location and other geographic information can be tracked.

Various types of IP Geolocation APIs are available through different services to make the process easier. By making an API request, we can get the following geographic information of the device:

- IP Address
- Country Details - continent, capital, city, region, flag.
- Internet Service Provider(ISP)
- Timezone details.
- Currency code and conversion
- - Latitude and Longitude.
The result varies, depending on what API service you are using.

For this application, we will build the following basic features:

- Search feature based on the IP Address entered.
- A dashboard to display the geographic location details.
- User's location is visualized on a map.



# Prerequisites.

To follow along for this tutorial the following are required:

- Node. You can verify if you do by running the command below in your terminal.

```
node -v
```

- A basic knowledge of HTML, CSS, JavaScript.

- Fundamental knowledge of  Vue JS.

# Scaffolding The Front End With Vue.js. 


To kickstart, we will first set up the project.
 
- Create a new vue app using vue CLI.

```
vue create ip-tracker
```

- Install Required Packages.

**Axios** 
```
npm install axios 
```

**Tailwind Css** -  To enable styling with ease, we use the Tailwind Css in the project.
 As a Utility first library, Tailwind lets you build UI components easily. [Here](https://javascript.plainenglish.io/how-to-setup-tailwind-css-in-vue-3-405c889842d9) is a comprehensive guide on how to set up your tailwind in your vue3 app.

An efficient and simple way to create the application is to divide each part into reusable components.
The application would be divided into different components.
- Search Bar
- Dashboard
- Map Display

Firstly we create a layout for our app.

In the `App.vue`file,

```html
<template>
  <div id='app' class='font-serif m-0 p-0'>
   <div class="bg-primary h-1/2 py-8 px-8 ">
      <header>
        <h1 class='text-center my-4 text-white font-black text-2xl sm:text-xl '> 
           TRACK-U 
        </h1>
        <p class='text-center my-4 text-white font-black text-xl sm:text-base'> Highly Optimized IP 
            Address Tracker </p>
         <!-- The separate components -->
      </header>
      <search-bar />
      <dashboard/>
   </div>
    <map-display />
  </div>
</template>
```
Then we create the 3 components in the component's folder.

`SearchBar.vue` - This component would handle the search function using the IP Address.

```html
<template>
      <form class="search-form m-6 flex justify-center items-center">
          <input class="search-input rounded-l-2xl w-3/4 p-4 border-0 sm:p-2" type="text 
          placeholder="Search using any IP address" v-model="searchInput" @keyup.enter="searchIp" 
           />
      <button class="p-4 rounded-r-2xl bg-black sm:p-2" type="submit" 
             @click.prevent="searchIp"> <i class="fas fa-search text-white text-xl"></i></button>
    </form>
</template>
```

`Dashboard.vue` - This component would be used to display the geographic information obtained  from the result of the IP Geolocation API.

```html
<template>
    <div class=" dashboard container mx-auto px-4 grid grid-cols-3 gap-x-16 gap-y-4 sm:block">
        <div class='boardStyle'> 
            IP ADDRESS
            <p class='textStyle'> {{ipAddress}} </p>
        </div>
        <div class='boardStyle'>
            County
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
```



`MapDisplay.vue` - This would be handling displaying the map for each request.

```html
<template>
<!-- The container to display the map -->
     <div id="map" class='w-full relative h-96 sm:h-60'></div>
</template>

```


# Integrating the APIs in the Vue App.

In this section, we will be using the [IPWHOIS.io](https://ipwhois.io/) for the IP Geolocation API.
This offers a free API service for a limited number of requests and allows quick and easy IP geolocation integration into your script or website.

In `App.vue` file, we will create a function to handle the API request.

```javascript

  getInfo(){
    // The Api request
      const endpoint = `https://ipwhois.app/json/${this.searchInput}`
      axios.get(endpoint)
       .then((data) => data.data)
       .then((result) => {
        // Storing the values gotten
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

Also, we go further to create a function to get the value entered from the search box.

```javascript

     trackIpCall(payload) {
      this.searchInput = payload;
      this.getInfo();
    },

```


The result is then displayed in the dashboard after it has been passed as `props` in `Dashboard.vue`

```javascript
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

```


# Creating Interactive Map Display with Mapbox API.

For this section, we will be using Mapbox GL JS  for the map display component.
The library is used to display Mapbox maps in a web application and also adds extra features to customize the map experience.

The `mapboxgl.Map` class serves as the basis for creating a map. 
It requires the following properties to function: 
- **accessToken**: Mapbox also requires [access token](https://docs.mapbox.com/help/glossary/access-token/) to compute map vector tiles for your account and you can store them as an environmental variable in your `.env file`. The access token can be gotten immediately after you sign up on their [platform](https://www.mapbox.com/)

- **container**: The HTML element in which the map will be placed.

- **style**: The style URL of the map style being used to determine which tilesets the map includes and how they are styled. 

- **center**: The coordinates of the map's starting position, in longitude, latitude order.

- **zoom**: The zoom level at which the map should be initialized. This can be a whole number or a decimal value.

To implement this, we create a function in the `MapDisplay` component.

```javascript

 displayMap(){
      mapboxgl.accessToken =  process.env.VUE_APP_MAP_TOKEN
      const map = new mapboxgl.Map({
      container: 'map', // container ID
      style: "mapbox://styles/mapbox/streets-v11",// style URL
      center: [this.longitude, this.latitude], // starting position [lng, lat]
      zoom: 5 // starting zoom    
      });
     map.addControl(new mapboxgl.NavigationControl());

     
    //  Create a default Marker, colored black.
    const marker = new mapboxgl.Marker({ color: 'black' })
    .setLngLat([this.longitude, this.latitude])
    marker.addTo(map);
  },

```


The function is then called in the `mounted lifecycle method`. This initializes the map based on the properties passed to the class.

```javascript
  mounted() { // lifecycle method to load the map 
          this.displayMap();
  }
```

Then we create the `watch` property for instances when the value of the properties changes.

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
In this tutorial, we have been able to implement all the required features for the application to work. Check out the [Demo](https://github.com/Abiola-Farounbi/TRACK-U) and the [Github repository](https://track-u.netlify.app/).

A lot more could be achieved using the IP Geolocation API and the Mapbox API for building other types of applications for different purposes.
You can also reach out to me on [Twitter](https://twitter.com/abiolaesther_) for questions. Thanks for reading!

