---
layout: engineering-education
status: publish
published: true
url: /how-to-handle-navigation-in-flutter/
title: How to Handle Navigation in Flutter
description: This article will show you how to ---
author: 
date: 2021-06-01T00:00:00-18:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/how-to-handle-navigation-in-flutter/hero.jpg
    alt: Handling Navigation in Flutter
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
To create a responsive website using Material UI and Next.js The application will retrieve test data from [JSONPlaceholder](http://jsonplaceholder.typicode.com/users) which is a dummy API.

### What is Material UI
Material UI is a React-based CSS utility framework that enables developers to create quality user interfaces. Material UI can be compared to Bootstrap but in a more advanced way. Since it is a React-based CSS framework, it features numerous components that can be imported anywhere in a React application. Material UI has various use cases, ranging from layouts, styling inputs, navigation, etc. You can read more about the components in the [official docs](https://material-ui.com/components/). 

### What is NextJS
Next.js is a front-end web framework that is based on React. It provides developers with loads of functionalities including [Server Side Rendering and Static Site Generation](https://www.section.io/engineering-education/client-side-rendering-vs-server-side-rendering-vs-static-site-generation/). Next.js saves developers from the stress of setting up a react application from scratch. You can learn more about Next.js from [here](https://nextjs.org/docs/getting-started).

### NextJs and Material UI setup
To make use of Material UI and Next.js, we need to install them as dependencies in our React application.

To install Next.js, use the command below.

> Note that you need to have [Node](https://nodejs.org/en/) and [NPM](https://www.section.io/engineering-education/beginner-guide-to-npm/) installed on your machine.

```bash
 npm install next react react-dom
```

We can then create a Next.js project using the following command.

```bash
npx create-next-app
```

To install Material UI, you can type the command below in your terminal.

```bash
npm install @material-ui/core
```

We can start the dev server using `npm run dev` command.

### Creating the web-app

Before moving further, we need to familiarize ourself with the project structure.

We will put all of our web pages in the `pages` folder. For instance, the `pages/index.js` will serve as the default home page.

Here is our project structure.

```
|--pages
|   |--index.js
|--components
|   |__Layout
|   |   | |--Header
|   |   | |--index.js
|   |   |--index.js
|   |--Card
|	     |--index.js
|--container
|--index.js
```

The `Layout` folder in the `components` directory will render the app's navigation bar. The `Card` folder will serve as the [container component](https://www.section.io/engineering-education/container-components-in-react/) that gets mapped with the data retrieved from the remote API.

The card component serves as a reusable component that can be imported on any page in the app. It makes use of the React `propTypes` module to validate the type of data that gets into the component.

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

PropType valiadtion as the name implies, involves the validation of the type of data that gets passed to a React component as `Props` [Properties]. If the conditions set in the `propType` object are not being met, JavaScript will throw an error.

Say for example, we pass a **"Number"** data-type as the value of the `className` prop, it definitely does not meet the condition, which is (in literal terms): the value(s) that gets assigned to the `className` prop must be a string at all times and it is required. Meaning that, it (the `className` prop) must not be missing in that particukar component.

```js
Card.propTypes = {
  className: propTypes.string.isRequired;
}
```

The header component renders a simple text displaying the title/name of the app. It gets imported into `layout/index.js` which in turn gets used across the whole application.

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

The Header component is imported into the `Layout` component, thus making it reusable throughout the whole application.

The Layout component is structured in a way that makes it accept only the Header component and the `children` props. As we've seen previously, the use of the `propTypes` module in react enables us to perform type-checks on the tpe of data that enters into a React component.

The `children` prop that is passed to this component represents the remaining part of the UI (i.e the layout of the card that will populate the webpage through the data obtained from the API). We’d see how that works shortly!

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

The `Container` component handles "data-fetching" from the API endpoint and it also holds the state of the application.

It gets imported into the index page component alongside the Layout component.

You’d notice how the `Layout` component wraps the `Container` component like a normal HTML tag

Now, we'd take a look at the Container component and how Material UI Grid’s component will enable us to create an application that is responsive on all media breakpoints or screen sizes.

```js
import React, { useState } from "react";
import Card from "../components/Card";
import Grid from "@material-ui/core/Grid";

const Container = () => {
  const { profiles, setProfiles } = useState([]);

  const getProfiles = () => {
    fetch("https://jsonplaceholder.typicode/users")
      .then((response) => {
        setProfiles(response.profiles);
      })
      .catch((err) => console.log(JSON.stringify(err)));
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
              item
              xs={12}
              sm={6}
              lg={4}
              key={users.id}
              className={`cont-card`}
            >
              <Card>
                <div className={style.avatar}>
                  <img
                    src={`https://avatars.dicebear.com/v2/avataaars/{{${users.name}}}.svg?options[mood][]=happy`}
                  />
                </div>
                <div className={style.details}>
                  <h2 className={`text-center`}>{users.name}</h2>
                  <div className={style.userInfo}>
                    <p>{users.email}</p>
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

Breaking the component above into smaller chunks...

### App state

```js
const { profiles, setProfiles } = useState([]);
```

The snippet above holds/sets the state of the application, or the component in particular. The `useState` React hook is destructured its first property, i.e `profiles` is assigned to an array, so that the data coming from the remote API endpoint can be mapped onto the UI of the application.

### Data request from the API

```js
const getProfiles = () => {
  fetch("https://jsonplaceholder.typicode/users")
    .then((response) => {
      setProfiles(response.profiles);
    })
    .catch((err) => console.log(JSON.stringify(err)));
};
```

The function `getProfiles()`, initiates the process of getting data from the API (user data) endpoint with the help of the Browser's Fetch API. You can read more abut it [here](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)

This function is then called inside the `useEffect()` hook of React. The `useEffect()` performs all the lifecycle method of React component at a go. Everytime the browser reloads, the `useEffect` hook is triggered, thereby causing the data to be available everytime that action happens.

```js
useEffect(() => {
  getProfiles();
}, []);
```

The essence of the array `[]` symbol or data-type inside the `useEffect` is to prevent the continuous loop of fetching the same data from the remote API endpoint. The process of adding that symbol/value is called the "useEffect cleanup". It stops the continous firing of the fetch request inside the `getProfiles()` function.

### Understanding the Markup.

In the component above, you’d notice the `xs`, `sm`, and `lg` props in the `Grid` component. These props are breakpoints of the card component, they are responsible for how it behaves across the different breakpoints.

Assigning the value of twelve, six, and four to these properties means that:

On extra small screens, the card should occupy the full width of the device. On small screen sizes, the cards should occupy half of the screen width. Hence allowing two cards to be arranged side by side on the webpage. and on large screen sizes, the cards should occupy a specified part of four columns. Hence allowing three cards to stacked side by side.

Here’s how we can test the usefulness of the PropType checking.
If you forget to put the Container component inside the Layout component, React will throw an error saying that it is required. This is as a result of this snippet below:

```js
Layout.propTypes = {
  children: PropTypes.node.isRequired,
};
```

The container Component is then imported into the Home page container at `pages/index.js`

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
I intentionally ommited the styles of this app for brevity’s sake, if you really want to see how this app looks like in real time, you check it out [here](https://profilez.netlify.app) and inspect the responsiveness accross the different breakpoints. Here the link to the [repository](https://github.com/Caleb335/profiles)https://github.com/Caleb335/profiles­ on GitHub if you want to inspect it.

If you want to understand how to create responsive layouts without making use of a framework, kindly check this [article](https://www.freecodecamp.org/news/media-queries-width-ranges/) that explains media queries in CSS.

Thank You for reading this article. Kindly share it with your pals, if you’ve been able to grasp the concept of creating responsive layouts with Material UI.


---
Peer Review Contributions by: [Wanja Mike](/engineering-education/content/authors/michael-barasa/)