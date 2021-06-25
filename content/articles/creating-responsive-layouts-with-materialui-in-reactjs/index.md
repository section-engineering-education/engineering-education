Oftentimes, when we build websites or web applications, one of the important aspects of the whole process is to make it responsive, asides from the functionalities.

Making a web(site/app) responsive is among the quirks of accessibility that it must have so anyone with any type of device can be able to make use of the app or website.

Responsiveness has to do with how an application behaves and appears when it is being accessed on different devices.

These devices range from mobile phones with different screen sizes and Personal computers or desktop computers.

It is then, the obligation of a Frontend developer to create or write styles that would conform with the layout of the app to the different screen sizes of devices.

In this article we’d take a look at how to create layouts that are responsive at different device widths and breakpoints using a React framework, called [NextJS](https://nextjs.org/) and [Material UI](https://materialui.com) to make the process of creating such layouts less painful.

Before reading this article, you should have an understanding of:

- How React works

- How data is being passed as props in a React component

- How to fetch data from a remote API endpoint

- Media queries in CSS

When you're done getting a hang of these concepts, you can come back here to read this article. It’d be worth it, I promise!

### Overview of what we’re building

The whole idea behind this article is so you can create layouts that are responsive at different device breakpoints while obtaining data from a remote API that'd be on the web page.

We'd complete this task by making use of [JSONPlaceholder’s](http://jsonplaceholder.typicode.com/users) dummy users API, which would be used to populate the user interface of the app.

### What is Material UI

Material UI is a React-based CSS utility framework that enables developers to be able to create aesthetic user interfaces. Its functions are quite like that of Bootstrap but in a more advanced way. Since it is a React-based CSS framework, it employs a paradigm of CSS components that can be imported anywhere in a React application. It has various use cases, ranging from layouts, styling inputs, navigation, etc. You can [read more](https://material-ui.com/components/) about the components in their docs. We’d have to make use of the Grid component in this article since it is the only one that tallies with what we’re trying to build.

### What is NextJS

NextJS isn’t “the next JavaScript”, as someone thought it was, rather, it is a front-end framework, based on React also, that provides developers with loads of functionalities like SSR: Server Side Rendering and SSG: Static Site Generation, just to mention a few. It saves developers the stress of setting up a react application from scratch. You can visit their [documentation](https://nextjs.org/docs/getting-started) to get a proper understanding of how this tool works

### NextJs and Material UI setup

To be able to make use of Material UI and NextJs, we’d need to install them as dependencies in our React application.

To install NextJs, type the command below into your terminal.

Note: for the command below to work, you need to have node and npm installed/downloaded on your machine.

```js
npx create-next-app

yarn create-next-app
```

When NextJS is installed, you should get yourself familiar with the folder structure.

The `pages` folder, for example, represents the first page that you’d see upon running the command to view it in your browser. You can edit `pages/index.js` to see the hot reloading feature of NextJS.
The command below starts up a dev server in your browser where you can view it.

```
npm run dev
```

To install Material UI, you can type the command below in your terminal.

```
npm install @material-ui/core
```

### Creating the web-app

Now that we have seen how to install the dependencies needed in the creation of this app. Let’s take a look at how the structure of the app will be:

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

The folder structure above will be a reference for the purpose of this article, so things don’t get mixed up. You can decide not to make use of this style, it’s your choice. Go with whatever feels convenient for you.

The `index.js` file is what we’d render inside `pages/index.js` after we’ve deleted the content that was there before.

The `Layout` folder in the components folder will render the navigation bar of the app while the `Card` folder will serve as the [container component](https://www.section.io/engineering-education/container-components-in-react/) that gets mapped with the data gotten from the remote API onto the index page.

Let’s get building. Shall we?

Taking it from the top. We’d take a look at the index file in `pages/index.js`, then we’d move on to creating the Nav and Card components, then the appContainer that wields the total data coming from the API, which gets imported into `pages/index.js`

The card component serves as a reusable component that can be imported anywhere in the app, it makes use of the React `propTypes` module to validate the type of data that gets into the component.

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

The Layout component is structured in a way that makes it accept only the Header component and the `children` props.

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
