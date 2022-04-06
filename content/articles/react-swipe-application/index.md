---
layout: engineering-education
status: publish
published: true
url: /react-swipe-application/
title: Building a Swipe Application Using the MongoDB Cloud and React.js
description: This is a tutorial on how to build a swipe application using the MongoDB Cloud and React.js
author: bhanji-brilliant
date: 2022-04-06T00:00:00-04:00
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/react-swipe-application/hero.png
    alt: Swipe App React Img Alt
---
With JavaScript popularity on the rise, it is becoming more and more common to build web applications using JavaScript. One of the major requirements of these applications is the use of REST APIs to communicate with the backend.
<!--more-->
One of the most common ways of connecting to backend is using a REST API build with Express.js, a powerful Node.js framework.

In this tutorial, we will build a full-stack swipe application with React, Express.js and Mongo. Depending on the direction of the swipe, different events are triggered in the backend.

### Table of contents
- [Table of contents](#table-of-contents)
- [Prerequisites](#prerequisites)
- [Objectives](#objectives)
- [Setting up the swipe application](#setting-up-the-swipe-application)
  - [Setup the backend](#setup-the-backend)
- [Conclusion](#conclusion)

### Prerequisites
To follow along with this tutorial, you'll need the following:
- Basic concepts of the RESTful APIs. [Section Engineering Education](https://www.section.io/engineering-education/) community have a wide variety of resources to learn about [RESTful APIs](https://www.section.io/engineering-education/rest-api/).
- Basic knowledge of React.js. If you're new to React, you can start with the [React tutorial](https://www.section.io/engineering-education/search/?q=React) from our large pool contents.
- Basic knowledge in Express.js for our backend application.
- MongoDB locally set up or on the cloud. In this tutorial, we will be using MongoDB on the cloud.
- Local development environment setup.

> **Note:** If you are using a Mac, you can install the MongoDB Cloud by following the instructions on the [MongoDB Cloud](https://www.mongodb.com/cloud/atlas/) page.

### Objectives
By the end of this tutorial, you will be able to connect your local MongoDb to a cloud instance and build a swipe application using React.js and Express.js.

To better understand this tutorial, we encourage learners to code along to master the concepts.

### Setting up the swipe application
Let's start by setting up the swipe application frontend.

Run the following command to install the necessary dependencies:

```bash
npx create-react-app swipe-app
# next cd to the application root
cd swipe-app
# start the development server
npm start
```

Next, we need to install a few packages. Since we're building a swipe application, React has a component [React Tinder Card](https://www.npmjs.com/package/react-tinder-card) that we will use to develop our application.

Additionally, we want our app to be able to connect to the backend server, and we will need to install [Axios](https://www.npmjs.com/package/axios) to make requests to remote resources.

Finally, we will need to install [React-Bootstrap](https://react-bootstrap.github.io/react-bootstrap/) for styling and [UUID](https://www.npmjs.com/package/uuid) to build our application.

Run the following commands to install the dependencies above:

```bash
# install a card component for swipeable elements
npm install react-tinder-card
# install Axios
npm install axios
# install react-bootstrap
npm install react-bootstrap
# install UUID
npm install uuid
```

Now that we have installed our main dependencies, let's create a folder for our application.

Proceed to create a folder named `swipe-app` in your current directory.

Next, create a JavaScript file named `index.js` in the `swipe-app` folder and import the dependencies above as shown below:

```javascript
// import the axios package
import axios from "axios";
// import the react-tinder-card package
import TinderCard from "react-tinder-card";
// import the react and a component
import React, { Component } from "react";
// import the uuid package
import { v4 as uuid } from "uuid";
```

We import the Axios package and the react-tinder-card package in the script above. We also import react and a component. Finally, we import the uuid package.

Let's add logic to our application as shown below:

```javascript
// edit the index.js file as shown below
class SwipeApp extends Component {
  //add a constructor
  constructor() {
    // add super to call the parent constructor
    super();
    // add state
    this.state = {
      photos: [],
      sessionId: uuid(),
      isLiked: false,
    };
    // add the click events
    this.handlePhotoClick = this.handlePhotoClick.bind(this);
    // the details method invoked when an image is clicked
    this.showImageDetails = this.showImageDetails.bind(this);
  }
}
```

In the script above, we create a constructor. We then add a `super()` method to call the parent constructor.

We then proceed to add state, a `handlePhotoClick()` and `showImageDetails()` methods. We will use these methods to handle the click events.

While the `handlePhotoClick()` method is invoked when an image is clicked, it will update the application's state.

The `showImageDetails()` method is also invoked when the image is clicked, it will show the details of the image.

Next, let's add the methods below to handle our key logics while interacting with the application:

```javascript
// async method to run on screen swipe
async onScreenSwipe(to, photoId, currentSessionId) {
        // set the isLiked to false, since we only swipe the screen
        this.setState({
            isLiked: false,
        });
        // when the swipe is to the bottom, remove the picture
        if (to === 'bottom') {
            await axios
                    .delete(`${BASE_URL}/delete/${photoId}`);
        } else {
            // record swipes
            await axios
                .post(`${BASE_URL}/record`, {
                    id: listingId,
                    sessionId: currentSessionId,
                    to,
            });
        }
}
// this event is invoked when image is clicked
async handlePhotoClick(itemId) {
    this.setState({
        isLiked: !this.state.isLiked,
    });

    await axios
        .post(`${BASE_URL}/update`, {
            id: itemId,
    });
}
// show user details on view
showImageDetails(item) {
    window.alert(
        `username: ${item.username}\n Location : $${item.location['$location']} \n Followers : ${item.followers}\n Collections : ${item.collections}`
    );
}
```

In the script above, we add the `onScreenSwipe()`, `handlePhotoClick()` and `showImageDetails()` methods.

The `onScreenSwipe()` method is invoked when the user swipes the screen. Therefore, it acts as a watcher to update the application's state.

The `handlePhotoClick()` method is invoked when the user clicks on the like button. We want to record the reactions of the user to the image. Therefore, we use the `axios.post()` method to record the reaction.

The state of the like button is either true or false. We use the `!this.state.isLiked` to toggle the state of the like button.

The `showImageDetails()` method is invoked when the user clicks on an image. We want to show the details of the image. Therefore, we use the `window.alert()` method.

Finally, we add the `onScreenSwipe()`, `handlePhotoClick()` and `showImageDetails()` methods to the `index.js` file.

We also make necessary adjustments whenever events are invoked. For example, on-screen swipe, we remove the image from the screen.

Likewise, we update the image's `isLiked` property on the image click.

Next, let's mount our component as shown below:

```javascript
// edit the index.js file as shown below
async componentWillMount() {
        const res = await axios
            .get(`${BASE_URL}/photos`);
        // api result is an array of photos
        const result = await res.data;
        // next set the state
        this.setState({data: result});
}
// this is the render method to display our contents
render() {
    // the like button
    const photoLikeButtonLabel = this.state.isLiked ? '❤' : 'Like';
    // return
    return (
        <div className="swipeApp">
            <div>
                <h1>Celebrities</h1>

                <div className="container-fluid">
                    {this.state.data.map((item) => (
                        <!-- add the tinder card component-->
                        <TinderCard
                            className="swipeItems"
                            key={item.username}
                            onSwipe={(dir) => this.onScreenSwipe(to, item._id)}
                        >
                            <div
                                style={{
                                    backgroundImage: 'url(' + item.images.image_url + ')',
                                }}
                                className="card"
                            >
                                <div className="card-details">
                                    <h3>{item.name}</h3>
                                    <div className="card-actions">
                                        <button
                                            className="button"
                                            onClick={() => this.handlePhotoClick(item._id)}
                                        >
                                            {photoLikeButtonLabel}
                                        </button>
                                        <button
                                            className="button"
                                            onClick={() => this.showDetails(item)}
                                        >
                                            view more
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </TinderCard>
                    ))}
                </div>
            </div>
        </div>
    );
}
```

In the template above, we add the `onScreenSwipe()`, `handlePhotoClick()` and `showImageDetails()` methods to our elements. These elements acts as the trigger on the DOM.

We also add the `photoLikeButtonLabel` variable to our elements. Then we define the `TinderCard` component and add the events.

Finally, we add the `render()` method to our component. This application is ready to be used, so we need to add the backend server.

Now that we have set up our frontend let's set up our backend.

#### Setup the backend
We need to create a new folder named `backend` in our current directory to set up the backend.

Let's begin by setting up the routes as follows:

```javascript
// create routes.js file in the backend folder
// start by importing the express main app
const express = require("express");
// import the router
const appRoute = express.Router();
// import the db connection
const dbConnection = require("dbConnection");
// create the app route for photos
appRoute.route("/photos").get(async function (_req, res) {
  // get the photos from the db
  const dbConnect = dbConnection.getDatabaseConnection();
  dbConnect
    .collection("photosAndReviews")
    .limit(10)
    .toArray((err, result) => {
      if (err) {
        // if there is an error, return the error
        res.status(400).send("Error fetching photos!");
      } else {
        // if there is no error, return the photos
        res.json(result);
      }
    });
});
// create the app route for photos swipe
appRoute.route("/photos/photoSwipe").post((req, res) => {
  // get the photos from the db
  const dbConnect = dbConnection.getDatabaseConnection();
  // create an object to hold the data
  const tryMatchingDocument = {
    listing_id: req.body.id,
    last_modified: new Date(),
    session_id: req.body.session_id,
    direction: req.body.direction,
  };
  // insert the data into the db
  dbConnect
    .collection("matchingDocument")
    .insertOne(tryMatchingDocument, (err, result) => {
      if (err) {
        res.status(400).send("Error saving matching document!");
      } else {
        res.json(result);
      }
    });
});
// export the app route
module.exports = appRoute;
```

We add the `appRoute` variable in the script above and define the `/photos` route. We also add the `/photos/photoSwipe` route.

Next, we export the `appRoute` to make it available to other files.

To test our application, run the following commands:

```bash
# cd to the backend folder
cd backend
# install the dependencies
npm install
# start the server
npm start
```

You can now browse to [http://localhost:3000/photos](http://localhost:3000/photos) to see the photos and perform various actions.

### Conclusion
This tutorial shows how to set up a frontend and backend for our application using React and Express.js.

We can use the `TinderCard` component to display images and use `Axios` to make API calls.

At [Section](https://www.section.io/engineering-education/), we always strive to give you the best experience. If you have any questions, don't hesitate to get in touch with us or leave your comments below.

Happy Coding!

---
Peer Review Contributions by: [Miller Juma](/engineering-education/content/authors/miller-juma/)
