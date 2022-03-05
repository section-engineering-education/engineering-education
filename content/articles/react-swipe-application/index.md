### Building a swipe application using the MongoDB Cloud and React js
### Introduction
With JavaScript popularity on the rise, it is becoming more and more common to build web applications using JavaScript. One of the major requirements of these applications is the use of REST APIs to communicate with the backend.

In this tutorial, we will be building a full-stack application with React, Express Js and Mongo. This application is a swipe application. It is a social media application where users can swipe right or left on a user's profile.

### Table of contents
- [Building a swipe application using the MongoDB Cloud and React js](#building-a-swipe-application-using-the-mongodb-cloud-and-react-js)
- [Introduction](#introduction)
- [Table of contents](#table-of-contents)
- [Prerequisites](#prerequisites)
- [Objectives](#objectives)
- [Setting up the swipe application](#setting-up-the-swipe-application)
  - [Setup the backend](#setup-the-backend)
- [Conclusion](#conclusion)

### Prerequisites
To follow along with this tutorial, you'll need the following:
- Basic concepts of the RESTful APIs.
- Basic knowledge of React.js
- Basic knowledge in Express.js for our backend application.
- MongoDB locally set up or on the cloud. In this tutorial, we will be using MongoDB on the cloud.
- Local development environment setup.

> **Note:** If you are using a Mac, you can install the MongoDB Cloud by following the instructions on the [MongoDB Cloud](https://www.mongodb.com/cloud/atlas/) page.

### Objectives
By the end of this tutorial, you will be able to connect your local MongoDb to a cloud instance and build a swipe application using React.js and Express.js.

To better understand this application, you should code along for each step that is well detailed.

### Setting up the swipe application
Let's start by setting up the swipe application frontend. Run the following command to install the necessary dependencies:
```bash
npx create-react-app swipe-app
cd swipe-app
npm start
```

Next, we need to install a few packages; since we're building a swiping application, React has a component [React Tinder Card](https://www.npmjs.com/package/react-tinder-card) that we will use to build our application.

Additionally, we want our app to be able to connect to the backend server, and we will need to install [Axios](https://www.npmjs.com/package/axios) to make requests to remote resources.

Finally, we will need to install [React-Bootstrap](https://react-bootstrap.github.io/react-bootstrap/) and [UUID](https://www.npmjs.com/package/uuid) to build our application.

Run the following commands to install the above dependencies:
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

Now that you have installed our main dependencies let's create a folder for our application.

Proceed and create a folder named `swipe-app` in your current directory. Next, create a JavaScript file named `index.js` in the `swipe-app` folder and import the above dependencies as shown below.
```javascript
// import the axios package
import axios from 'axios';
// import the react-tinder-card package
import TinderCard from 'react-tinder-card';
// import the react and a component
import React, { Component } from 'react';
// import the uuid package
import { v4 as uuid } from 'uuid';

```

We import the Axios package and the react-tinder-card package in the above script. We also import the react and a component. Finally, we import the uuid package.

Next, let's proceed and add logic for our application as shown below:
```javascript
// edit the index.js file as shown below
class SwipeApp extends Component
{
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

In the above script, we create a constructor. We add a `super()` to call the parent constructor. We then proceed to add state, a `handlePhotoClick()` and `showImageDetails()` methods.

Next, let's add methods above to handle our key logics while interacting with the application.
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

In the above script we add the `onScreenSwipe()`, `handlePhotoClick()` and `showImageDetails()` methods.

The `onScreenSwipe()` method is invoked when the user swipes the screen. The `handlePhotoClick()` method is invoked when the user clicks on an image, while the `showImageDetails()` method is invoked when the user clicks on an image.

We also make necessary adjustments whenever events are invoked. For example, on-screen swipe, we remove the image from the screen. On image click, we update the image's `isLiked` property.

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
                <h1>People</h1>

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

In the above template, we add the `onScreenSwipe()`, `handlePhotoClick()` and `showImageDetails()` methods to our elements. We also add the `photoLikeButtonLabel` variable to our elements. Then we define the `TinderCard` component and add the events.

Finally, we add the `render()` method to our component.

Now that we have set up our frontend, let's set up our backend.

#### Setup the backend
We need to create a new folder named `backend` in our current directory to set up the backed.


### Conclusion
This tutorial shows how we can set up a frontend and backend for our application using React and Express.js. We have seen how we can use the `TinderCard` component to display images and use `Axios` to make API calls.
