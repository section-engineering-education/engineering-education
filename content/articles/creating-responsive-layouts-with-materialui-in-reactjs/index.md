---
layout: engineering-education
status: publish
published: true
url: /creating-responsive-layouts-with-materialui-in-reactjs/
title: How to Create Responsive Layouts with Material UI and Next.js
description: This article will show you how to create responsive web pages using Material UI and Next.js. The website will adjust to different screen sizes and devices.
author: caleb-olojo
date: 2021-07-01T00:00:00-10:41
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/creating-responsive-layouts-with-materialui-in-reactjs/hero.png
    alt: Creating Responsive Layouts with Material UI and Next.js
---
One of the crucial aspects when building an application is to make it responsive. This feature allows the website or mobile app to adapt to different screen sizes or devices. This is because an individual can access the website via a mobile phone or computer.
<!--more-->
In this article, we will learn how to create layouts that respond to different device widths and breakpoints. We will use [Next.js](https://nextjs.org/) and [Material UI](https://materialui.com) for the design.

### Prerequisites
Before reading this article, you should have an understanding of:
- How React works.
- How data is passed as props in a React component.
- How to fetch data from a remote API endpoint.
- How to use media queries in CSS.

### Objective
To create a responsive website using Material UI and Next.js. The application will retrieve test data from [JSONPlaceholder](http://jsonplaceholder.typicode.com/users) which is a dummy API.

### What is Material UI
Material UI is a React-based CSS utility framework that enables developers to create quality user interfaces. Material UI can be compared to Bootstrap but in a more advanced way. 

Since it is a React-based CSS framework, it features numerous components that can be imported anywhere in a React application. Material UI has various use cases, ranging from layouts, styling inputs, navigation, etc. You can read more about the components in the [official docs](https://material-ui.com/getting-started/supported-components/). 

### What is Next.js
Next.js is a front-end web framework based on React. It provides developers with loads of functionalities including [Server Side Rendering and Static Site Generation](https://www.section.io/engineering-education/client-side-rendering-vs-server-side-rendering-vs-static-site-generation/). Next.js saves developers from the stress of setting up a react application from scratch. You can learn more about Next.js from [here](https://nextjs.org/docs/getting-started).

### Next.js and Material UI setup
To make use of Material UI and Next.js, we need to install them as dependencies in our React application.

To install Next.js, use the command below.

> Note that you need to have [Node](https://nodejs.org/en/) and [NPM](https://www.section.io/engineering-education/beginner-guide-to-npm/) installed on your machine.

```bash
 npm install next react react-dom
```

We can then create a Next.js project using the following command:

```bash
npx create-next-app
```

To install Material UI, you can type the command below in your terminal:

```bash
npm install @material-ui/core
```

We can start the `dev server` using `npm run dev` command.

### Creating the web-app

Before moving further, we need to familiarize ourselves with the project structure.

We will put all of our web pages in the `pages` folder. For instance, the `pages/index.js` will serve as the default home page.

Here is our project structure:
```bash
|--pages
|   |--index.js
|--components
|   |__Layout
|   |   | |--Header
|   |   | |--index.js
|   |   |--index.js
|   |--Card
|      |--index.js
|--container
|--index.js
```

The `Layout` folder in the `components` directory will render the app's navigation bar. The `Card` folder will serve as the [container component](https://www.section.io/engineering-education/container-components-in-react/) that gets mapped with the data retrieved from the remote API.

The card component serves as a reusable component that can be imported on any page in the app. It makes use of the React `propTypes` module to validate the type of data consumed by the component.

```js
// Card.js
import React from "react";
import PropTypes from "prop-types";

const Card = ({ children, className, ...props }) => {
  return (
    <div className={`base-card ${className}`} {...props}>
      {children}
    </div>
  );
};

export default Card;

Card.propTypes = {
  children: PropTypes.node.isRequired,
};
```

`PropType validation` involves validating the type of data that gets passed to a React component as `Props` (Properties). If the conditions set in the `propTypes` object are not being met, JavaScript will throw an error. A perfect example is when we pass a number rather than a string as a prop.

```js
Card.propTypes = {
  className: propTypes.string.isRequired; // the prop should be a string
}
```

The `header` component renders a simple text displaying the `name` of the app. This component is imported into the `layout/index.js` file. 

Here is the code for the header component:

```js
import React from "react";

const Header = () => {
  return (
    <header className={`header`}>
      <h1 className={`text-center`}>Awesome user profiles</h1>
    </header>
  );
};

export default Header;
```
In this project, the main `Layout` will only accept the Header component and the `children` props. 

The `children` prop represents the remaining part of the UI. For instance, the card will display the data retrieved from the API.

The code for the `Layout` component is shown below:

```js
import React from "react";
import Header from "./Header";
import PropTypes from "prop-types";

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      {children}
    </>
  );
};

export default Layout;

Layout.propTypes = {
  children: PropTypes.node.isRequired, 
};
```

The `Container` component retrieves data from the API endpoint. This is, therefore, the perfect place to manage the state of the application.

Both the `Container` and `Layout` components are imported into the `index` page.

Let's modify the `Container` component using `Material UI`. We will use the `Grid` component to allow the application to be responsive to all media breakpoints or screen sizes.

```js
import React, { useState } from "react";
import Card from "../components/Card"; // Importing the card component
import Grid from "@material-ui/core/Grid";  //Importing the Grid component

const Container = () => {  
  const { profiles, setProfiles } = useState([]);

  const getProfiles = () => { //fetching data
    fetch("https://jsonplaceholder.typicode/users")
      .then((response) => {
        setProfiles(response.profiles); //updating state with new information
      })
      .catch((err) => console.log(JSON.stringify(err))); // catching any errors
  };

  useEffect(() => { 
    getProfiles();
  }, []);

  return (
    <section className={style.root}>
      <Grid container spacing={4}>
        {profile.map((users) => {
          return (
            <Grid
              xs={12}
              sm={6}
              lg={4}
              key={users.id}
              className={`cont-card`}
            >
              <Card>
                <div className={style.avatar}>
                  <img
                    src={`https://avatars.dicebear.com/v2/avataaars/{{${users.name}}}.svg?options[mood][]=happy`} //updating image
                  />
                </div>
                <div className={style.details}>
                  <h2 className={`text-center`}>{users.name}</h2>
                  <div className={style.userInfo}>
                    <p>{users.email}</p> // insert infor to card
                    <p>{users.phone}</p>
                    <p>
                      ${users.address.street} ${users.address.suite}
                    </p>
                    <p>
                      <a href={`https://${users.website}`}>{users.website}</a>
                    </p>
                    <p>{users.company.name}</p>
                  </div>
                </div>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </section>
  );
};

export default Container;
```

Let's understand what the above code snippet does:

#### App state

```js
const { profiles, setProfiles } = useState([]);
```

The snippet above manages the state of the application or the component. The `profiles` is an array that will hold data retrieved from the API.

#### Fetching data

```js
const getProfiles = () => {
  fetch("https://jsonplaceholder.typicode/users")
    .then((response) => {
      setProfiles(response.profiles);
    })
    .catch((err) => console.log(JSON.stringify(err)));
};
```

The function `getProfiles()` initiates the process of retrieving data from the API. It relies on the Browser's Fetch API. You can read more about the Fetch API from [here](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)

The `getProfiles` method is then called inside the `useEffect()` hook. The `useEffect()` performs all the lifecycle methods of a React component. This hook is triggered every time the browser reloads.

```js
useEffect(() => {
  getProfiles(); // calls methods
}, []);
```

The purpose of the array `[]` inside the `useEffect` hook is to prevent the browser from fetching data from the API continuously. This process is referred to as "useEffect cleanup". In our case, it will prevent the `getProfiles` method from been called multiple times.

#### Understanding the markup.

In the above `Container` component, you will notice the `xs`, `sm`, and `lg` props in the `Grid` component. These props are the breakpoints of the card component. They allow the card to be responsive.

```js
 <Grid
      xs={12}
      sm={6}
      lg={4}        
      key={users.id}
      className={`cont-card`}
  >         
```
- On `extra small screens` (xs), the card should occupy the full width of the device. 

- On `small screen sizes` (sm), the cards should occupy half of the screen width. Hence, allowing two cards to be arranged side by side on the webpage. 

- On `large screen sizes` (lg), the cards should occupy a specified part of four columns. This will allow three cards to be stacked side by side.

The `container` Component is then imported into the `Home` page container at `pages/index.js`.

```js
import Layout from "../src/Layout";
import Container from "../src/Container";

export default function Home() {
  return (
    <div>
      <Layout>
        <Container />
      </Layout>
    </div>
  );
}
```

### Conclusion
In this article, we have learned how to create a responsive website using Next.js and Material UI. You can, therefore, use this knowledge to create more quality applications. 

### Further Reading
- [Media Queries](https://www.freecodecamp.org/news/media-queries-width-ranges/)
- [Basics of responsive web design](https://www.section.io/engineering-education/understanding-the-basics-of-responsive-web-design/)

---
Peer Review Contributions by: [Wanja Mike](/engineering-education/content/authors/michael-barasa/)