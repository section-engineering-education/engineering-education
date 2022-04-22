---
layout: engineering-education
status: publish
published: true
url: /building-a-custom-user-reviews-page-in-react-typescript-and-reactstrap/
title: Building a Custom User Reviews Page With Stars Rating in React, Typescript and Bootstrap
description: This article gives a step by step procedure of creating a user reviews page used to display ratings in a website. The page is built using React, Typscript, and ReactStrap.
author: richard-john
date: 2022-04-22T00:00:00-06:20
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/building-a-custom-user-reviews-page-in-react-typescript-and-reactstrap/hero.jpg
    alt: Building a Custom User Reviews Page with Stars Rating in React, Typescript and Bootstrap Hero Image
---
In front-end web development, applications are required to be user (client) centric, meaning the overall users reviews and recommendations should be taken into consideration. Most applications rely on user feedback to improve their service quality delivery.
<!--more-->
React, Typescript, and Reactstrap can be an incredible combination in building a custom user review page that users’ recommendations/reviews and stars rating can be displayed, similar to the Apple store and Google Play Store reviews section.

In this article, we will discuss the various steps and package dependencies required to build a custom user reviews page with React and typescript.

### Key takeaway
After reading the article, the reader is expected to understand and be able to implement the following:
- Getting started with React application development.
- How to add and use typescript in React.
- Adding and using the reactstrap library in a React application.
- Building a custom user review page with star ratings in React.js, typescript, and Bootstrap.
- How to populate star rating in Typescript.

### Prerequisites
Basic knowledge of [React](https://scrimba.com/learn/learnreact), Typescript, and a design library is required to follow along with this tutorial. Visual Studio Code is also the preferred code editor.

### Getting started with React application development
React.js is a light-weight front-end web library that enables us to create multiple reusable components and interfaces.

Some of us have decided to take React.js a step further by adding Typescript to our React application to enjoy added development functionalities such as:
- Real-time error catching and reporting functionalities in Typescript.
- Robust intellisense.
- Value types definitions etc.

Those are a few of the advantages of combining Typescript and React.js in application development. Let’s get started with the development process listed in the following steps:

### Step 1 – Creating the React application
As always, the first step in application development with React is to create a new `react app`. This is done by running a single command on your `command terminal`. To create your React application, open up the `command terminal` and run the command below:

```bash
npx create-react-app reviews-app
```

Alternatively, for yarn users:

```bash
yarn create-react-app reviews-app
```

In a couple of minutes, your new React application should be ready for development.

Once that is completed, time to move on to the next step.

### Step 2 - Setting up Typescript in the application
As mentioned, our custom reviews application will be built with React.js, Typescript, and reactstrap libraries. Reactstrap is a modified bootstrap package made for React.js applications. It contains numerous reusable elements for your React application such as:
- Modal
- Grid
- Icons
- Headers
- Card
- Navbar etc.

Installing the Typescript and reactstrap dependencies in our project involves running the installation command shown below:

```bash
npm install  typescript reactstrap
```

or

```bash
Yarn add typescript reactstrap
```

Your `package.json` should look like this:

```JSON
{
  "name": "reviews-app",
  "version": "0.1.0",
  "private": true,
  "dependencies": {
    "reactstrap":"^8.7.1",
    "react": "^17.0.2",
    "react-scripts": "5.0.0",
    "typescript": "^4.5.4",
    "web-vitals": "^2.1.2"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
  "eslintConfig": {
    "extends": [
      "react-app",
      "react-app/jest"
    ]
  },
  "browserslist": {
    "production": [
      ">0.2%",
      "not dead",
      "not op_mini all"
    ],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  }
}
```

Once that is completed, we will generate a typescript config file which is required in all Typescript-based applications. The config file contains settings/options required to successfully create and compile Typescript snippets to JavaScript.

To generate the `tsconfig.json` file, we run the command below:

```bash
npx tsc init
```

That should get the config file ready.

We will set up the Typescript configurations by providing the options below to the `tsconfig.json` file:

```JSON
{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "declaration": true,
    "sourceMap": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react"
  },
  "include": ["src"],
  "exclude": ["node_modules"]
}
```

The snippet above is a basic and common Typescript config setup. Let’s take a look at some of the options:
- We added an `include` option so Typescript can compile everything in the root directory (`src` folder) into JavaScript to be executed by the browser.
- The `exclude` flag instructs Typescript to ignore all the files in the array which in our case is the `node_modules`.
- The `target` option specifies the version of JavaScript our code snippets will be compiled to by the Typescript compiler.
- The `jsx` options notifies Typescript that we intend to use it with React.js.

For more information on the config options in Typescript, here is a link to all the [available config options](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html.) in Typescript.

### Step 3 – Creating the navbar component (Navbar.tsx)
One common feature in most websites is the presence of a navbar. The navbar is an important part of a website as it helps in routing/navigation and displaying the company logo and other essential information about the website.

We will create and add a navbar to our `reviews app`. To do that, we create a `Navbar.tsx` file in the `src` folder thereafter we implement the snippet below:

```Typescript
import React from "react";
import { NavLink, Navbar, Nav, NavItem, NavbarBrand, NavbarText } from "reactstrap";

export default function NavbarComponent() {
  return (
    <div>
      <Navbar className="navbar">
        <Nav navbar>
          <div className="left">
            <NavbarBrand href="/">Logo</NavbarBrand>
          </div>
          <div className="center">
            <NavItem>
              <NavLink to="/">Home</NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/explore">Explore</NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/career">Career</NavLink>
            </NavItem>
          </div>
          <div className="right">
            <NavItem>
              <NavLink to="/contact">Contact Us </NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/login">Login</NavLink>
            </NavItem>
            <NavItem>
              < NavbarText >Profile</ NavbarText >
            </NavItem>
          </div>
        </Nav>
      </Navbar>
    </div>
  );
}
```

Note: The `.tsx` file extension is used when using React and Typescript to create components. React files use the `.jsx` or `.js` file extension.

From the snippet above, we created a Navbar exclusively using page elements imported from the reactstrap design library. The elements include the following:
- Navbar
- Nav
- NavItem
- NavBrand
- NavLink

We did not use the conventional `div`, `h3`, `span`, `ul`, etc. tags to create the Navbar components then style it later with CSS. This is because we have already pre-styled reactstrap elements that we could import and utilize in our application.

Importing and using pre-styled elements reduces the complexities (back and forth) of styling a Navbar and other components since the library has already done the heavy lifting for us. We are however going to add a little `CSS` to customize our `Navbar` to taste.

### Step 4 – Creating the reviews component (Reviews.tsx)
As typical reviews or comments section in websites, our reviews components will have the following details displayed:
- First name
- Last name
- Profile avatar
- Comment
- Star rating
- Timestamp

We will also provide an input form so a user can write their reviews on the page. To build the `Reviews` components, we first need to create a `Reviews.tsx` file in the `src` folder then we implement the snippet below:

```Typescript
import React from "react";
import {
  Card,
  CardSubtitle,
  CardText,
  CardTitle,
  CardBody,
  CardImg,
} from "reactstrap";

function Body({
  firstName,
  lastName,
  profilePic,
  stars,
  comment,
  timestamp,
}: {
  firstName: string;
  lastName: string;
  profilePic: string;
  stars: number;
  comment: string;
  timestamp: number;
}) {
  return (
    <Card>
      <CardBody>
        <CardTitle tag="h1">Reviews Page</CardTitle>
        <div className="reviews-top">
          <div className="user-details">
            <CardImg
              className="avatar"
              src={
                profilePic ||
                https://images.pexels.com/photos/7129713/pexels-photo-7129713.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500
              }
              alt="user avatar"
            />

            <CardSubtitle className="mb-2 text-muted" tag="h6">
              {firstName} {lastName || "John Doe"}
            </CardSubtitle>
            {[...Array(stars || 5)].map((star) => {
              return <CardSubtitle tag="h5">⭐ </CardSubtitle>;
            })}
          </div>
          <div className="reviews-body">
            <CardText>
              {comment ||
                "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut reiciendis delectus dignissimos, nisi pariatur fuga officiis itaque fugiat! Quibusdam accusantium quae beatae vel.Quas possimus reprehenderit sequi quia nesciunt sunt!"}
            </CardText>
          </div>
          <CardText>
            <small className="text-muted text-bold">
              {timestamp || "3 mins ago"}
            </small>
          </CardText>
        </div>
      </CardBody>
    </Card>
  );
}

export default Body;
```

To have a better view of what is going on under the hood in our snippet, let’s go over what we did:
- We imported `Card`, `CardTitle`, `CardSubtitle`, `CardText`, `CardImg` and `CardBody` from the reactstrap library we installed in our React application.
- As required by Typescript, we assigned the value types to our user details (`firstname`, `lastName`, etc.).
- We then created a Reviews component with the elements we imported from reactstrap and the user details.
- To avoid errors, we used the conditional operator (`||`) to render a hardcoded value if/when the user details are not provided.
- Finally, we created a `map` function that loops over the number of stars provided by the user and then render the equivalent in stars on the page.

Ideally, you’d want to fetch the information from a database, etc. setting up and using a database in the application is outside the scope of this tutorial, we have however added some dummies data for rendering purposes.

### Step 5 – Creating the Form component (Form.tsx)
We will create an input form to retrieve the reviews from the user. The form will have an input field that is awaiting the user reviews which will update the state of our reviews and a submit `button`.

To do that, we create a `Form.tsx` file, thereafter, we implement the snippet below:

```Typescript
import React, { useState } from "react";
import { Button, Form, Input } from "reactstrap";


export default function FormComponent() {
  const [reviews, setReviews] = useState("");
  const onChange = (e: any) => {
    setReviews(e.target.value);
  };
  const onSubmit = (e: any) => {
    console.log("Form Submitted");
  };

  return (
    <div className="form-container">
      <Form onSubmit={onSubmit}>
        <Input
          className="reviews-form"
          type="text"
          placeholder="enter you reviews"
          value={reviews}
          onChange={onChange}
        />
        <Button type="submit" style={{ background: "Green" }}>
          Submit
        </Button>
      </Form>
    </div>
  );
}
```

- We imported a `Form`, `Input`, and `Button` from the reactstrap library which we used to create our `Form` component.
- We also created a React state `reviews` that is updated when the user edits the input field.
- Finally, we implemented a submit `Button` to submit the reviews. At this point, we are just logging `Form Submitted` to the console.

You may want to submit the reviews to your database, simply create a `POST` request to your database API to submit the reviews.

### Step 6 – Styling our Navbar, Reviews, and Form Components (app.css)
Ordinarily, our components look amazing because we used pre-styled elements from reactstrap to create them, but we still need to fully customize them to enhance their appearance on the page.

We will add a few lines of `CSS` snippets to the application. To do that, in the `app.css` file, implement the snippet below:

```CSS
.navbar {
  padding: 20px;
  box-shadow: 0 -2px 8px 1px rgba(0, 0, 0, 0.4);
}
.navbar-nav {
  display: flex;
  justify-content: space-evenly;
}
.navbar-nav a {
  padding: 5px;
  border: 1px solid black;
  border-radius: 10px;
  margin: 5px;
}
.center,
.right {
  display: flex;
}
/* Reviews */
.card {
  width: 50vw;
  margin: auto;
  margin-bottom: 5px;
}
.card-title {
  margin-bottom: 20px;
  font-size: x-large;
  font-weight: 800;
  text-align: center;
}
.reviews-top {
  box-shadow: 2px 2px 5px 1px rgba(0, 0, 0, 0.4);
  padding: 20px;
}
.user-details {
  align-items: center;
  display: flex;
}

.avatar {
  border-radius: 90px;
  width: 60px;
  height: 60px;
  margin: 2px;
}
h6 {
  font-size: larger;
  font-weight: 700;
  margin-right: 10px;
}
.reviews-form {
  padding: 5px;
  width: 50vw;
  border-radius: 20px;
}

.form-container {
  padding: 20px;
  background: #eedfdf;
  width: 60%;
  border-radius: 20px;
  margin: auto;
}
```

From the snippet above, we added some styles to the `classNames` we assigned to our various page elements. We added some `box-shadow`, `padding`, `margin`, `font-size`, etc. to further enhance the overall appearance of our application.

That being done, let's import and view our application on the browser.

### Step 6 – Importing and viewing the application (App.tsx)
We have completed the creation and styling of our custom user reviews page. Let’s import all the components to the main `App.tsx` file.
To do that, rename the `App.js` file extension to `App.tsx`, thereafter, perform the imports as shown below:

```Typescript
import React from 'react'
import Body from './Body'
import FormComponent from './Form'
import NavbarComponent from './Navbar'
import './styles.css'

export default function App() {
  return (
    <>
    <NavbarComponent/>
    <Body/>
    <FormComponent/>
    </>
  )
}
```

From the snippet above, we imported the following to our `App` component:
- NavbarComponent
- Body
- FormComponent

We also imported the main `styles.css` file containing all our styles to the `App` component.

Finally, to render our application on the browser, we need to start the `development server`. To do that, we run the `start` command on our `command terminal` as shown below:

```bash
npm start
```

Alternatively, for yarn users:

```bash
yarn start
```

Once the `development server` is started, an instance of the application will be displayed on your default browser at `http://localhost:3000/` and should look like this:

![full application display](/engineering-education/building-a-custom-user-reviews-page-in-react-typescript-and-reactstrap/full-page.jpg)

### Conclusion
In this tutorial, we created a custom user reviews page with stars rating from scratch. We also discussed the advantages of using React and Typescript together to create applications.

How to set up Typescript and reactstrap dependencies were also discussed, among other interesting concepts.

I hope you find this tutorial helpful.

Happy Coding!

### References
- [https://www.typescriptlang.org/docs/handbook/tsconfig-json.html](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html)
- [https://reactjs.org/docs/conditional-rendering.html](https://reactjs.org/docs/conditional-rendering.html)
- [https://reactstrap.github.io/?path=/docs/](https://reactstrap.github.io/?path=/docs/)

---
Peer Review Contributions by: [Monica Masae](/engineering-education/authors/monica-masae/)
