---
layout: engineering-education
status: publish
published: true
url: /building-a-video-cataloging-app-with-react-firebase-and-styled-components/
title: Building a Video Cataloging App with React, Firebase, and React-styled-components.
description: This tutorial will guide the reader through building a video cataloging app with React.js and React-styled components.
author: kingsley-jack
date: 2022-01-08T00:00:00-02:30
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/building-a-video-cataloging-app-with-react-firebase-and-styled-components/hero.jpg
    alt: Video Cataloging React Firebase Styled Components
---

Video-based social media websites and applications have experienced widespread adoption over the decade. From platforms such as YouTube, Instagram, and most recently TikTok which has been at the forefront having an average monthly user exceeding a billion.

<!--more-->

You might want to build your video-based social media and I will show you how to build a video cataloging app capable of displaying content in categories ranging from sports, entertainment, educational, etc. can be done with React.js and React-styled components.

Creating and styling the user interface will be handled with React.js and styled components while firebase will handle storage and catalog (categories) management.

### Prerequisite
To follow along with this tutorial, you need basic knowledge of React.js and any other front-end styling library e.g. bootstrap, etc. take out time to enroll in this [React crash course](https://scrimba.com/learn/) by Scrimba for free if you are not comfortable in React.js.

### Key takeaways
At the competition of this tutorial, the reader will have the understanding and knowledge to implement the following:

- Getting started with React.js
- Getting started with Firebase
- Building a video cataloging app with React.js
- Creating and managing firebase entries
- Error handling in React.js and firebase
- Customizing video components with react-styled-components

### Guide to React development cycle
The first thing to have in mind when building web applications with React.js is creating the React application. This process is done by running a single command in the `command terminal` of your computer. The command scaffolds the application creation by setting up the required files, folders, and default dependencies needed to start development.

#### Step 1 - Creating the React application
To create our React application, we open up the command terminal and run the command as shown below:

```bash
npx create-react-app My-app
```

Alternatively, for yarn users:

```bash
yarn create-react-app My-app
```

The process requires some minutes and an internet connection to set up the new application so ensure your computer is connected to an active Wi-Fi or Modem.
Once the application has been created, it’s time to begin development.

#### Step 2 - Installing the required dependencies
We need to install some dependencies to enable our application to perform the desired tasks. And they include the following:

- Firebase: the firebase package will enable our application to have access to the Google cloud database suite where our content will be stored and managed. Firebase has numerous functionalities including authentication, hosting, and other server management features. Feel free to look up the [official documentation](https://firebase.google.com/) for more information.
- [React-styled-components](https://www.styled-components.com): this will be used to style and customize our components. React-styled-components reduces the complexities of styling React applications since it allows you to target specific page elements for styling and also create your customized elements. It also allows the flexibility of writing both the JavaScript and the styles snippets in one `.js` file.
  To install the above dependencies to our application, open the `package.json` file, and add the snippet shown below:

```JSON
"dependencies": {
   "firebase": "^8.4.1",
   "styled-components": "^5.2.3"
},
```

Thereafter we install them by running the command below:

```bash
npm install
```

Alternatively, for yarn:

```bash
yarn add
```

That should start the installation process. Once that is completed, it is time to begin the application setup.

#### Step 3 - Setting up Firebase (firebase.js)
To set up and use the firebase suite in our application, there are some basic steps we need to fulfill to get the config keys for the application. To get started, go to the [Google Firebase website](https://console.firebase.google.com/) and create a new project as shown in the image below:

Click on the button highlighted in the image to create a new firebase project

![how to create a new firebase project](/engineering-education/building-a-video-cataloging-app-with-react-firebase-and-styled-components/image1.jpg)


follow the simple steps shown on the console. Feel free to give the new project a name of your choice. Once that is completed, create a new `cloud firestore` by clicking on the cloud firestore button on the sidebar as shown below:

![creating a cloud firestore](/engineering-education/building-a-video-cataloging-app-with-react-firebase-and-styled-components/image2.jpg)


you may choose any of the options (test mode or production mode), afterward, you select your location. That should create a `cloud firestore` for our project.
 Additionally, click on the project overview button at the top left corner and follow the steps to register the app and add Firebase SDK so we can make use of the database functionalities in our project as shown below:

 ![registering the new application](/engineering-education/building-a-video-cataloging-app-with-react-firebase-and-styled-components/image3.jpg)


 once that is completed, the config keys will be revealed. the config information should be copied as shown below:

![the config information](/engineering-education/building-a-video-cataloging-app-with-react-firebase-and-styled-components/image4.jpg)


Finally, in the `src` folder of your React app, create a new `firebase.js` file, thereafter you go ahead and paste the config keys copied into the `firebase.js` file. it should look similar to this below:

```JavaScript
import Firebase from "firebase/app";
import "firebase/firestore";
// NOTE: we are importing seed database before we create it. we will create and export it to avoid errors.
import seedDatabase from './catalog'

const config = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
};
const firebase = Firebase.initializeApp(config);

// Delete this line after the catalog has been uploaded
 seedDatabase(firebase)
export { firebase };
```

Note all the fields in the snippet must be supplied, so ensure you copied and pasted the keys appropriately. Also, notice the added line of code:

```JavaScript
import seedDatabase from './catalog'
```
this will be in charge of pushing our local catalog into the `cloud firestore` we created in our project.
Once that is correctly implemented, there’s one more step before we have access to the firebase functionalities up and running.
The final step in our firebase setup will be to hook it up to our application. To do that, open the `index.js` file, and implement the code snippet below:


```JavaScript
import React, { createContext }  from "react";
import { render } from "react-dom";
import App from "./app";
import { firebase } from "./lib/firebase.prod";


export const FirebaseContext = createContext(null);

render(
    <FirebaseContext.Provider value={{ firebase }}>
      <App />
    </FirebaseContext.Provider>,
  document.getElementById("root")
);
```

From the snippet above, we wrapped our entire app with an instance of `FirebaseContext` created with the React `createContext` hook. Then we passed the config keys to the `FirebaseContext` as a value `prop` to be used throughout the application.

#### Step 4 - Setting up the content catalog (catalog.js)
Our content catalog will be stored in the firebase database which was created alongside the project earlier. To push our categories to firebase, we will create a `catalog.js` in the `src` folder file which will contain the command to automatically create a collection containing the following information:

- Category title
- Video description
- Video duration
- Video title
- Video genre
  Let’s go ahead and create some dummies categories. Feel free to adjust the various fields to your satisfaction:

```JavaScript
export function seedDatabase(firebase) {
  function getUUID() {
    /* default eslint-disable command to prevent possible errors */
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
      const piece = (Math.random() * 16) | 0;
      const elem = c === "x" ? piece : (piece & 0x3) | 0x8;
      return elem.toString(16);
    });
  }

  /* movies
    ============================================ */
  // Documentaries
  firebase.firestore().collection("movies").add({
    id: getUUID(),
    title: "The legend never dies",
    description:
      "This movie shows the lifetime myths and believes of ancient empires and kingdoms",
    genre: "Documentaries",
    duration: "2 hrs 30mins",
    slug: "legend-never-dies",
  });
  firebase.firestore().collection("movies").add({
    id: getUUID(),
    title: "Origin of Caesarean doctrines",
    description:
      "we explore the ancient beginnings and life of Emperor Julius Caesar, how his doctrines affected mindsets in the medieval era. popular beliefs and myths exposed",
    genre: "Documentaries",
    duration: "2 hrs",
    slug: "origin-of-caesarean-doctrines",
  });

  // Comedies
  firebase.firestore().collection("movies").add({
    id: getUUID(),
    title: "Kids do funny things",
    description:
      "This movie takes away the stress and pains of a rough day with laughter from the amazing scenes of the funniest things kids do.",
    genre: "Comedy",
    duration: "1 hrs 15 mins",
    slug: "kids-do-funny-things",
  });

  firebase.firestore().collection("movies").add({
    id: getUUID(),
    title: "Scooby Do the funny and sad",
    description:
      "Scooby do is a kid's comedy movie, very interesting to watch. it is a story about a Dog and 3 humans going around solving mysteries",
    genre: "Comedy",
    duration: "1 hrs 25 mins",
    slug: "scooby-do-the funny-and-sad",
  });

  // Educational
  firebase.firestore().collection("movies").add({
    id: getUUID(),
    title: "Veterinary Medicine",
    description:
      "Introduction to Veterinary Medicine, concept of Veterinary Medicine, classifications, principles and related theories.",
    genre: "Educational",
    duration: "4",
    slug: "veterinary-medicine",
  });
  firebase.firestore().collection("movies").add({
    id: getUUID(),
    title: "Maintenance Services",
    description:
      "Introduction to Maintenance Services, concept of Maintenance Services, classifications, principles and related theories",
    genre: "Educational",
    duration: "3 hrs",
    slug: "maintenance-services",
  });

  // Action
  firebase.firestore().collection("movies").add({
    id: getUUID(),
    title: "The Amazing Spiderman",
    description:
      "The Amazing Spiderman franchise has been widely popular among action movies enthusiasts. It is produced by Marvel studios",
    genre: "action",
    duration: "5 hrs",
    slug: "the-amazing-spiderman",
  });

  /* series
    ============================================ */
  // Drama
  firebase.firestore().collection("series").add({
    id: getUUID(),
    title: "Squid Game",
    description:
      "Squid game is a popular Korean 2021 series. It is now the most-watched series on Netflix with billions of streamed hours",
    genre: "drama",
    duration: "6 hrs",
    slug: "squid-game",
  });
  firebase.firestore().collection("series").add({
    id: getUUID(),
    title: "Harry Potter",
    description:
      "Harry Potter is an incredible series about mysteries and magic in England from the book Harry Potter.",
    genre: "drama",
    duration: "8 hrs",
    slug: "harry-potter",
  });

  // Suspense
  firebase.firestore().collection("series").add({
    id: getUUID(),
    title: "Knives out",
    description:
      "Knives Out is an interesting suspense movie about a murder incident involving a famous multi-millionaire author in his home estate.",
    genre: "suspense",
    duration: "1 hrs 30 mins",
    slug: "knives-out",
  });

  // Children
  firebase.firestore().collection("series").add({
    id: getUUID(),
    title: "Ben 10",
    description:
      "Ben 10 is an interesting kids movie about a little boy who found a watch that gave him super-human abilities to transform into many creatures. Ben alongside his grandpa and sister decided to use their new abilities to fight crime.",
    genre: "children",
    duration: "2 hrs",
    slug: "ben-10",
  });

  // Romance
  firebase.firestore().collection("series").add({
    id: getUUID(),
    title: "Romeo and Juliet",
    description:
      "Romeo and Juliet is a classic romance movie from the legendary novel Romeo and Juliet.",
    genre: "Romance",
    duration: "2 hrs",
    slug: "romeo-and-juliet",
  });
}
```

The snippet above will simply create a firebase catalog containing the above-listed categories and video information.
To upload the content to firebase, an internet connection is required. Once you are connected to a Wi-Fi or Modem, save the `catalog.js` file and refresh your code editor, which should automatically upload everything to the Firebase project earlier created. so open up the firebase console again in your browser and view the catalog by clicking open the `cloud firestore` button in the [firebase console](https://console.firebase.google.com/). Once you have confirmed the catalog in the firebase console, go back to the `firebase.js` file and delete this line of code shown below:

```JavaScript
 seedDatabase(firebase)
```
Note: before you save and upload the data, ensure that the entries are accurate because further corrections can only be done manually on the firebase terminal. Also, if the operation failed, check your network connection to ensure it is stable and try again.

#### Step 5 – Setting up the app requirements
To view the catalog we created and stored in our firebase project, we go ahead will create some React components that will handle the fetching and rendering of information locally on our browser. We need to set up the following:

- Local directory
- Firebase querying commands
- Content display component
- Styling and customizing the display component
  Now let’s go ahead with the setup:

#### Creating the local directory (directory.js)
The local directory will contain the category title and data holder for the content we will be querying from our cloud database. To set up the local directory, we create a `directory.js` file, thereafter we paste the snippet below:

```JavaScript
export function contentFilter({ series, movies }) {
  return {
    movies: [
      {
        title: "Documentaries",
        data: movies.filter((item) => item.genre === "Documentaries"),
        image: "/images/Documentaries.JPG",
      },
      {
        title: "Comedy",
        data: movies.filter((item) => item.genre === "Comedy"),
        image: "/images/comedy.JPG",
      },
      {
        title: "Educational",
        data: movies.filter((item) => item.genre === "Educational"),
        image: "/images/educational.JPG",
      },
      {
        title: "Action",
        data: movies.filter((item) => item.genre === "Action"),
        image: "/images/action.JPG",
      },
      {
        title: "Business",
        data: movies.filter((item) => item.genre === "Business"),
        image: "/images/business.JPG",
      },
    ],
    series: [
      {
        title: "Drama",
        data: series.filter(
          (item) => item.genre === "Drama"
        ),
        image: "/images/Drama.JPG",
      },
      {
        title: "Suspense",
        data: series.filter((item) => item.genre === "suspense"),
        image: "/images/suspense.JPG",
      },
    ],
  };
}
```

The snippet above contains the title and `filter` command to filter the data array to their respective category based on the video genre.

### Fetching and displaying catalog from firebase (content.js)
We need a few more lines of code to `query` and `map` the content of our firebase database to our React application. To get the content to our application, we create a `content.js` file in the `src` folder, then paste the snippet below:

```JavaScript
import { useEffect, useState, createContex, useContext } from "react";

const FirebaseContext = createContex(null)

export function useContent(target) {
  const [content, setContent] = useState([]);
  const { firebase } = useContext(FirebaseContext);

  useEffect(() => {
    firebase
      .firestore()
      .collection(target)
      .get()
      .then((snapshot) => {
        const allContent = snapshot.docs.map((contentObj) => ({
          ...contentObj.data(),
          docId: contentObj.id,
        }));
        setContent(allContent);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, [firebase, target]);
  return { [target]: content };
}
```

The snippet above is more like a default pattern/snippet of fetching and displaying content from  firebase. First, we created a `FirebaseContext` which will act as our local state holder for the array of data that will be retrieved from firebase.
Then we created a null state named `content` that is awaiting the data from firebase. Finally, we used the React `useEffect` hook which triggers the firebase `get allContent` command immediately our page loads. At completion, the data is stored in the local state we created to be displayed in our application.

### Creating the display component (Render.js)
After we have successfully received our content array from firebase, we need to create the React component that will map over the data and render the content in their respective categories. To do that, we create a new `Render.js` file, thereafter we implement the code block shown below:

```JavaScript
import React, { useState, useEffect } from "react";
import {
 Header,
 HeaderLink,
 Card,
 CardTitle,
 CardEntities,
 CardMeta,
 CardItem
}
 from "./styles";

export function RenderContainer({ slides }) {
  const [category, setCategory] = useState("movies");
  const [slidesRows, setSlidesRows] = useState([]);

  useEffect(() => {
    setSlidesRows(slides[category]);
  }, [slides, category]);
  return (
    <>
      <Header>
          <HeaderLink
              active={category === "movies" ? "true" : "false"}
              onClick={() => setCategory("movies")}
            >
              Movies
            </HeaderLink>
            <HeaderLink
              active={category === "series" ? "true" : "false"}
              onClick={() => setCategory("series")}
            >
              Series
            </HeaderLink>
      </Header>
        {slidesRows.map((slideItem) => (
            <Card>
              <CardTitle>{slideItem.title}</CardTitle>
              <CardEntities>
                {slideItem.data.map((item) => (
                  <CardItem key={item.docId} item={item}>
                    <CardMeta>
                      <CardSubTitle>{item.title}</CardSubTitle>
                      <p>{item.description}</p>
                    </CardMeta>
                  </CardItem>
                ))}
              </CardEntities>
            </Card>
        ))}
    </>
  )
}
```

From the snippet above, we imported the following from `styles` which will be created shortly:

- Header
- HeaderLink
- Card
- CardItem
- CardMeta
- CardEntity

  We will use those imported elements to display each data field from the database. To do that, we used the `map` function to loop over the array and render the content accordingly.
  Now let’s create and customize the page elements i.e. Header, Card, etc. with styled-components.

#### Customizing the component (styles.js)
Using styled-components library, we will create and add some styles and customization to the page elements we used in the display component. To do that we create a `styles.js` file, afterwards, we ship the styles snippet shown below:

```JavaScript
import styled from "styled-components/macro";
export const Background = styled.div`
  display: flex;
  height: 50%;
  width: auto;
`;
export const HeaderLink = styled.p`
  color: ${({ active }) => (active === "true" ? "blue" : "white")};
  text-decoration: none;
  margin-right: 30px;
  font-weight: ${({ active }) => (active === "true" ? "700" : "normal")};
  cursor: pointer;
  border: 2px solid ${({ active }) => (active === "true" ? "blue" : "white")};
  padding: 10px;
  width: fit-content;
  border-radius: 10px;
`;

export const Card = styled.div`
  display: flex;
  margin-bottom: 50px;
  margin: 2% 15px;
  box-sizing: border-box;
  cursor: pointer;
  width: 30vw;
  border-radius: 10px;
  border: 3px solid green;
  height: 40vh;
  transition: transform 0.2s;
`;
export const CardTitle = styled.p`
  font-size: 25px;
  color: red;
  font-weight: bold;
`;
export const CardEntities = styled.div`
  display: flex;
  flex-direction: row;
`;
export const CardItem = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 5px;
  position: relative;
  cursor: pointer;
  transition: transform 0.2s;
`;
export const CardMeta = styled.div`
  display: none;
  position: absolute;
  bottom: 0;
  padding: 10px;
  background-color: #0000008f;
`;
export const CardSubTitle = styled.h5`
  color: gold;
  font-size: larger;
  font-weight: 800;
`;
```

From the snippet above we created and styled the page elements we used in earlier. we customized the elements by adding some `margin`, `padding`, `color`, `background`, etc.
Note: Bear in mind that the above are styled-components snippets, not vanilla CSS as they may appear similar.

#### Starting the development server and viewing the application:
Before we can view our amazing looking application, we need to do two final things which are:

- Importing the components, local directories, and firebase content to our `App.js` file.
- Starting the React development server.
  First, in the `App.js` file, we do all the imports as shown below:

```JavaScript
import React from "react";
import { RenderContainer } from "./Render";
import { useContent } from "./Content";
import { contentFilter } from "./directory";
export default function App() {
  const { movies } = useContent("movies");
  const { series } = useContent("series");
  const slides = selectionFilter({ movies, series });

  return <RenderContainer slides={slides} />;
}
```

Once you have correctly imported all the components to the `App.js` file, we can now go ahead and start the development server. To start the development server, in the `command terminal`, run the command shown below

```bash
npm start
```

Or for yarn:

```bash
yarn start
```

Once the development server is started, an instance of the application will be displayed on your default browser at `http://localhost:3000/`.
Note: the most efficient error handling technique is to always provide an `onError` function to catch and log the error to the console as we have done throughout the application.

### Conclusion
We discussed extensively the various steps, dependencies, and logic required to create a video cataloging application with React.js, styled-components, and firebase. We also created some dummies content, explored the commands used to upload/retrieved content from firebase, and finally render it in our React application. Here is a link to a [GitHub Repository](http://github.com/Kingsley-Jack/video-app) containing the full code snippets to the project in case you encountered some errors. I hope this tutorial was useful to your React development journey.
Happy Coding!

### References
- https://firebase.google.com/
- https://www.styled-components.com

---
Peer Review Contributions by: [Adrian Murage](/engineering-education/authors/adrian-murage/)
