---
layout: engineering-education
status: publish
published: true
url: /building-a-video-cataloging-app-with-react-firebase-and-styled-components/
title: Building a Video Cataloging App with React, Firebase, and React-styled-components.
description: This tutorial will guide the reader through building a video cataloging app with React.js and React-styled components.
author: kingsley-jack
date: 2022-04-15T00:00:00-16:30
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/building-a-video-cataloging-app-with-react-firebase-and-styled-components/hero.jpg
    alt: Video Cataloging React Firebase Styled Components
---
Video-based social media websites and applications have experienced widespread adoption over the decade. From platforms such as YouTube, Instagram, and most recently TikTok experiencing exponential growth, having an average monthly user exceeding a billion.
<!--more-->
In this tutorial, we will walk through how to build a video cataloging app. It will be capable of displaying content in categories ranging from sports, entertainment, education, etc. We can do this with React.js, React-styled components, and Firebase.

### Prerequisite
To follow along with this tutorial, you will need basic knowledge of React.js and any other front-end styling library. For example, bootstrap, styled-components, etc. Take out time to enroll in this [React crash course](https://scrimba.com/learn/) by Scrimba for free if you are not comfortable in React.js.

### Key takeaways
On completion of this tutorial, the reader will have the understanding and knowledge to implement the following:
- Getting started with React.js.
- Getting started with Firebase.
- Building a video cataloging app with React.js.
- Creating and managing Firebase entries.
- Error handling in React.js and Firebase.
- Customizing video components with react-styled-components.

### Guide to React development cycle
#### Step 1 - Creating the React application
To create our React application, we open up the command terminal and run the command shown below:

```bash
npx create-react-app video-app
```

Alternatively, for yarn users:

```bash
yarn create-react-app video-app
```

#### Step 2 - Installing the required dependencies
We need to install the following packages:

- Firebase: To have access to the Google cloud database where our content will be stored and managed. Feel free to look up the [official documentation](https://firebase.google.com/) for more information about Firebase.
- [Styled-components](https://www.styled-components.com): Used to style and customize our React components. 

To install the Firebase and styled-components to our application, open the `package.json` file, and add the snippet shown below:

```JSON
"dependencies": {
   "firebase": "^8.4.1",
   "styled-components": "^5.2.3"
},
```

Thereafter we install them by running:

```bash
npm install
```

Alternatively, for yarn:

```bash
yarn add
```

Once that is completed, it is time to begin the application setup.

#### Step 3 - Setting up Firebase (firebase.js)
To get started, go to the [Google Firebase website](https://console.firebase.google.com/) and create a new project as shown in the image below:

- Click on the button highlighted in the image to create a new Firebase project.

![how to create a new firebase project](/engineering-education/building-a-video-cataloging-app-with-react-firebase-and-styled-components/image1.jpg)

- Give the new project a name of your choice.
- Once that is completed, create a new `cloud firestore` by clicking the cloud firestore button on the sidebar as shown below:

![creating a cloud firestore](/engineering-education/building-a-video-cataloging-app-with-react-firebase-and-styled-components/image2.jpg)

- `Cloud firestore` is the database that will store our catalog information.
- You may choose either test mode or production mode. *Test mode restricts the application to a test environment that is valid for 30 days for development and testing purposes while production mode allows the full functionalities of the `cloud firestore` without any restrictions.*
- Select your location and submit the form. 
- Click on the project overview button at the top left corner and follow the steps to register the app and add Firebase SDK (Software development kit) so we can make use of the database and other server-side management functionalities in our project.

![registering the new application](/engineering-education/building-a-video-cataloging-app-with-react-firebase-and-styled-components/image3.jpg)

Once that is complete, the config information will be shown at the bottom of the page. The config information should be copied as shown below:

![the config information](/engineering-education/building-a-video-cataloging-app-with-react-firebase-and-styled-components/image4.jpg)

Then create a new `firebase.js` file and paste the project config information you copied. 

It should look similar to this:

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

**All the fields** in the snippet must be supplied, so ensure you copied and pasted the keys correctly. Also, notice the added line of code in the `firebase.js` file:

```JavaScript
import seedDatabase from './catalog'
```

This will help upload the catalog information we will create into the `cloud firestore` database in our Firebase project.

The final step is to hook up Firebase to our React application. We will create a state context and wrap it around our application. To do that, open the `index.js` file, and implement the code snippet below:

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

We wrap the entire React app with an instance of `FirebaseContext` created with the React `createContext` hook. We then passed the config keys to the `FirebaseContext` as a value `prop` to be used throughout the application.

`FirebaseContext` is a container that stores the firebase state in our React application.

#### Step 4 - Setting up the content catalog (catalog.js)
We create the data entries locally in our text editor then add the command to upload the entries automatically to the Cloud Firestore.

We need to create a `catalog.js` file which will contain data entries with the following information:
- Category title
- Video description
- Video duration
- Video title
- Video genre

Let’s go ahead and create the local data entries. Feel free to adjust the entries to your satisfaction:

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

From the snippet above, we created a hand full of data entries locally. We then added the Firebase upload command (`firebase.firestore().collection().add()`) to automatically create a collection and upload the entries into it.

Save the `catalog.js` file and refresh your code editor. That should automatically upload the catalog to the cloud collection. You can open up the Firebase console again in your browser and view the catalog by clicking the `cloud firestore` button in the [Firebase console](https://console.firebase.google.com/). Once you have confirmed that the entries were uploaded successful in the Firebase console, go back to the `firebase.js` file and delete this line of code shown below:

```JavaScript
 seedDatabase(firebase) //delete or comment out
```

#### Step 5 – Setting up the app requirements
To view the catalog stored in our Firebase cloud collection, we need to create some React components that will fetch and render the information locally on our browser. 

We will set up the following requirements:
- A local video directory.
- Firebase querying commands.
- Content display component.

Now let’s go ahead with the setup:

#### Creating the local video directory (directory.js)
The local directory will contain the category title and data holder for the content we will fetch from our cloud database. To set up the local directory, we will create a `directory.js` file, thereafter we can paste the snippet below:

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

The snippet above contains the title and a `filter` command to filter the data array to their respective category based on the genre.

### Fetching and displaying catalog from Firebase (content.js)
We need a few more lines of code to `fetch` and `map` the content in our Firebase database to the React application. The good news is that in the firebase documentation, we have been provided with a JavaScript snippet used in retrieving data from the `cloud-firestore`.
 
We will now create a `content.js` file, then paste the snippet provided by the firebase documentation as shown below:

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

The snippet above is a default pattern/snippet of fetching and displaying content from Firebase.  

Let’s take a look at it:
- We created a `FirebaseContext` that will act as the state holder for our data array retrieved from Firebase.
- Then we created an empty state named `content` that is awaiting the data from Firebase.
- Then we used the React `useEffect` hook which triggers the Firebase `get allContent` command whenever the web page loads. At completion, the data is then stored in the local state and displayed in our application.

### Creating the display component (Render.js)
After we have successfully received our content from the cloud database, we need to create the React component that will map over the data and render the content in their respective categories. 

To do that, we create a new `Render.js` file, thereafter we implement the code block shown below:

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

From the snippet above, we imported the following from `styles.js` which we will create shortly:
- Header
- HeaderLink
- Card
- CardItem
- CardMeta
- CardEntity

Those imported elements will be combined to display each data field from the database. To do that, we used the `map` function to loop over the array and render the content accordingly.

Now let’s create and customize the page elements i.e. Header, Card, etc. with styled-components.

#### Creating the page elements (styles.js)
Using the styled-components library, we will create and customize the page elements used in the display component. To do that we create a `styles.js` file, then we ship the styles snippet shown below:

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

From the snippet above, we created and styled the page elements used earlier. We added some `margin`, `padding`, `color`, `background`, `font-size`, etc. to the elements.

>Note: Keep in mind that the snippets above are styled-components snippets, not vanilla CSS as they may appear similar.

#### Starting the development server and viewing the application
Before we can view our amazing looking application, we need to do two final things which are:

- Importing the render components, local directories, and Firebase content to our `App.js` file.
- Starting the React development server.
  
Let’s import the all components to  the `App.js` file as shown below:

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

Once you have correctly imported all the components to the `App.js` file, we can now go ahead and start the development server. The development server displays our application on the browser. To start the development server, we run the command shown below:

```bash
npm start
```

Or for yarn:

```bash
yarn start
```

Once the development server starts, an instance of the application will be displayed on your default browser at `http://localhost:3000/`.

### Error handling when working with React and Firebase
The most efficient error handling technique is to always provide an `onError` function to catch and log the errors to the console as we have done throughout the application. Additionally, you can also use the `try catch()` function in React to catch and log all errors should they occur.

### Conclusion
We discussed the various steps, dependencies, and logic required to create a video cataloging application with React.js, styled-components, and Firebase. We also created some dummies content, explored the commands used to upload/retrieved content from Firebase, and finally render it in our React application. 

Here is a link to a [GitHub Repository](http://github.com/Kingsley-Jack/video-app) containing the full code snippets to the project in case you encountered any errors. I hope this tutorial was useful to your React development journey.

Happy Coding!

### References
- https://firebase.google.com/
- https://www.styled-components.com

---
Peer Review Contributions by: [Adrian Murage](/engineering-education/authors/adrian-murage/)
