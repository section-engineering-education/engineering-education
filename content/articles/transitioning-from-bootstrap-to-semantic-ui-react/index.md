---
layout: engineering-education
status: publish
published: true
url: /transitioning-from-bootstrap-to-semantic-ui-react/
title: Transitioning from Bootstrap to Semantic-UI React
description: This article will compare Bootstrap and Semantic-UI design libraries and help readers decide which one best suits their web needs. Website styling and design is an integral part of front-end web development.
author: toro-nyong
date: 2021-09-13T00:00:00-14:50
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/transitioning-from-bootstrap-to-semantic-ui-react/hero.jpg
    alt: Transitioning from Bootstrap to Semantic-UI React Hero Image
---
Website styling and design is an integral part of front-end web development. We expect Web developers to build a flawless interface that enhances user experience. Bootstrap has been a leading design library preferred by many front-end developers until now.
<!--more-->
Semantic UI React and other modern design libraries are reducing the complexity of web styling by providing advanced elements and features. 

### Prerequisites
The reader should have basic knowledge of React.js, CSS, and Bootstrap. For absolute beginners, they will require a crash course on the above to begin this tutorial.

### Part 1: Setting Up Bootstrap in ReactJS
To fully understand the rationale for transitioning from bootstrap to semantic-UI React, the article will be divided into two sections. 

The first section will perform the following tasks: `
- Create a React App.
- Add Bootstrap dependencies to the App.
- Create a sample page that includes a Form, Table, and Button with React.
- Examine the flaws and limitations of using Bootstrap.

#### Step 1 - Getting started with a React App
We will use our command terminal to create a react app, we do that by running:

```bash
npx create-react-app Design-demo
```

Alternatively, if you are a yarn user:
```bash
yarn create-react-app Design-demo
```

#### Step 2 - Adding Bootstrap to your React App
There are various methods of adding the bootstrap package to your new `react` application, but we will look at two methods which are:
1. Installing Bootstrap as a dependency using the `command terminal`.
2. Using the BootstrapCDN.

#### Installing Bootstrap as a dependency
This method is widely used by React developers who are comfortable with the `command terminal`. Your `public/index.html` is not altered, and the packages are automatically installed to the `node-modules`. 

This is done by running:

```bash
npm install react-bootstrap
```

If you are a yarn user:
```bash
Yarn add react-bootstrap
```

#### Using the Bootstrap Content Delivery Network (CDN)
This method involves going to your `public/index.html` and pasting a `<link>` containing the bootstrapCDN to the `<head> ` tag. 

The code snippet is as follows:

```HTML
<!-- Latest compiled and minified CSS -->
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous"/>
```

After that your `public/index.js` will look like this:

```HTML
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#000000" />
    <meta
      name="description"
      content="Web site created using create-react-app"
    />
    <link rel="apple-touch-icon" href="%PUBLIC_URL%/logo192.png" />
    <!-- Latest compiled and minified CSS -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"
      integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
    <!--
      manifest.json provides metadata used when your web app is installed on a
      user's mobile device or desktop. See https://developers.google.com/web/fundamentals/web-app-manifest/
    -->
    <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />

    <title>Design-demo</title>
  </head>
  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"></div>
  </body>
</html>
```

Please note that bootstrap v4 requires `jQuery` to enable its JavaScript functionalities.

#### Step 3 - Creating a sample page with Bootstrap
At this point, our `react` app has bootstrap running. And, we will create a home page that contains a navbar, form, button, and some text using react-bootstrap. 

To do this, we will create two files `Navbar.js` and `Forms.js` in our `src` directory.

#### Bootstrap navbar component
The navbar component will be displayed at the top of the page and will have some elements in it. 

To create a navbar using Bootstrap, the imports and code block below should be implemented:

```JavaScript
import React, {Component} from 'react';
import {
  Navbar,
  NavItem,
  NavDropdown,
  MenuItem,
  Nav,
  Grid,
  PageHeader
} from 'react-bootstrap';

class App extends Component {
  render() {
    return (
     <div>
      <Grid fluid>
        <Navbar inverse="inverse" collapseOnSelect="collapseOnSelect">
          <Navbar.Collapse>
            <Nav>
              <NavItem eventKey={1} href="#">
                Link
              </NavItem>
              <NavItem eventKey={2} href="#">
                Link
              </NavItem>
              <NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">
                <MenuItem eventKey={3.1}>Action</MenuItem>
                <MenuItem eventKey={3.2}>Another action</MenuItem>
              </NavDropdown>
            </Nav>
            <Nav pullRight="pullRight">
              <NavItem eventKey={1} href="#">
                Link Right
              </NavItem>
              <NavItem eventKey={2} href="#">
                Link Right
              </NavItem>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </Grid>
    </div>
    )}
}
export default App;
```
  
#### Bootstrap form component
We are ready to move on with the page `Form` component and it will contain the following bootstrap elements:
- Grid
- Row
- Form-Group
- Button, Radio, and Checkbox.

The code block below is a view of the implementation:
  
```JavaScript
import React, {Component} from 'react';
import {
  Panel,
  PageHeader,
  Col,
  Grid,
  Row,
  FormGroup,
  Checkbox,
  FormControl,
  Radio,
  ControlLabel,
  Button,
} from 'react-bootstrap';

class Forms extends Component {
  render() {
    const formInstance = (
      <form>
        <FieldGroup
          id="formControlsText"
          type="text"
          label="Text"
          placeholder="Enter text"
        />
        <FieldGroup
          id="formControlsEmail"
          type="email"
          label="Email address"
          placeholder="Enter email"
        />
        <FieldGroup id="formControlsPassword" label="Password" type="password" />
        <Checkbox checked readOnly>
          Checkbox
        </Checkbox>
        <FormGroup>
          <Radio name="radioGroup" inline>
            true
          </Radio>{' '}
          <Radio name="radioGroup" inline>
            false
          </Radio>{' '}

        </FormGroup>

        <FormGroup controlId="formControlsSelect">
          <ControlLabel>Select</ControlLabel>
          <FormControl componentClass="select" placeholder="select">
            <option value="select">select</option>
            <option value="other">...</option>
          </FormControl>
        </FormGroup>
        <FormGroup controlId="formControlsSelectMultiple">
          <ControlLabel>Multiple select</ControlLabel>
          <FormControl componentClass="select" multiple>
            <option value="select">select (multiple)</option>
            <option value="other">...</option>
          </FormControl>
        </FormGroup>

        <Button type="submit">Submit</Button>
      </form>
    );

    return (<div>
      <div className="_gradient-purple section-padding">
        <Grid>
          <PageHeader className="white">
            Forms <small>Inverse</small>
          </PageHeader>
          <Row className="white">
            <Col sm={12}>
              {formInstance}
            </Col>
          </Row>
        </Grid>
      </div>
      <Grid>
        <PageHeader>
          Forms
        </PageHeader>
        <Row>
          <Col sm={12}>
            {formInstance}
          </Col>
        </Row>
      </Grid>
      <div className="section-padding"></div>
    </div>);
  }
}
export default Forms;
```

#### App component
In the `app.js` we will import both the `Navbar.js` and `Forms.js` and they will be displayed on our main page. 

Below is the code snippet:

```JavaScript
import React, { Component } from 'react';
import Navbar from '/Navbar;
import Forms from '/Forms;

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar />
        <Forms />
      </div>
    );
  }
}
export default App;
```

Once the codes are properly imported, we will start our development server. 

To do that, we run the following command:

For npm users:

```bash
npm start
```

Or for yarn users:
```bash
Yarn start
```

On successful compilation, a home page containing the following bootstrap elements will be displayed on your browser window:
- Form
- Buttons
- Input field
- Navbar
- Header texts

#### Design flaws and limitations of Bootstrap
Bootstrap, although popular and widely used has some flaws and limitations, such as:
1.  Bootstrap `Icons` package is inferior to other modern design libraries, e.g. Semantic-UI react.
2.  Bootstrap elements and components are generic and easily recognizable thereby producing similar websites.
3.  Bootstrap `ClassName` is complicated.
4.  Element customization is difficult in Bootstrap compared to others.

### Part 2: Setting Up Semantic-UI in React.js
In the first part of this article we discussed the concept of using bootstrap in a react application. We also looked at the limitations and design flaws in bootstrap. 

The second part of the article will focus on the following:
- Getting started with Semantic-UI React.
- Creating a sample web page with Semantic-UI elements.
- Customization of elements in semantic-UI.
- Modern features and advancements offered by Semantic-UI.
- Why you should pick Semantic-UI React.

#### Getting started with Semantic-UI React
Semantic-UI is a modern web design and styling framework. 

It provides efficient and customizable elements such as:
1. Avatars
2. Modals
3. Popups
4. Cards and Icons, etc.

Using semantic-UI in your `React` application is simple. But for absolute beginners, we will go through the steps to get you familiar with the process.

#### Installing Semantic-UI package to your project
The easiest way of installing the package as a dependency to your `React` application is by running the following command:

npm:
```bash
npm install semantic-ui-react
```

For yarn users:
```bash
Yarn add semantic-ui-react
```

Once the installation is complete, you should be able to use `semantic-ui-react` in your `react` project.

#### Building a sample page with Semantic-UI React
We now have access to the library and we will use it to create a sample page. 

The page will contain the following elements:
- Navbar
- Avatar
- Header Texts
- Popup
- Button and Input Fields
- Card

To achieve this, we will create two files `Navbar.js` and `Body.js`. Afterwards, we will import the above elements and add them to our web page. 

Be sure to create the files in your `src` directory.

#### Step 1 - Creating the Navbar component:
To create a Navbar with semantic-UI, we open our `Navbar.js` file and implement the code snippet below:

```JavaScript
import React "react";
import {
    Icon,
    Loader,
    Menu,
    Avatar
} from "semantic-ui-react";

function Navbar() {
	<>
    <div className="header">
      <Menu className="navbar" pointing secondary size="massive" color="blue">
        <div className="navbar-left">
          Name
          <Menu.Item
            style={{ paddingLeft: "5px", color: "white" }}
            name="Username"
            as={Link}
            to="/profile"
          />
        </div>

        <Menu.Menu position="right">
          <div className="nav-input">
            <Icon name="search" />
            <input type="text" placeholder="search anything" />
          </div>
          <Menu.Item
            style={{ color: "white" }}
            name="Logout"
          />
        </Menu.Menu>
      </Menu>
    </div>
    <div className="header">
      <Menu className="navbar" pointing secondary size="massive" color="blue">
        <Menu.Item
          style={{ color: "white" }}
          name="home"
          onClick={handleItemClick}
          as={Link}
          to="/"
        />
        </Menu.Menu>
      </Menu>
    </div>
	</>
  return navBar;
}
export default Navbar;
```

#### Step 2 - Creating the Body component:
We will create the body component for our web page. 

To do this we open our `Body.js` file and implement the block of code below:

```JavaScript
import React, { useContext, useState } from "react";
import {
 Button,
 Avatar,
 Card,
 Image,
 Modal,
 Popup } from "semantic-ui-react";

Export default function PostCard() {
  return (
    <Card fluid className="post-card">
      <Card.Content style={{ padding: 0 }}>
        <div className="post-content">
          <div className="user-details">
              <Avatar src=""/>
                  <div className="form">
                    <h3>Susan Colins h3>
                <Card.Meta className="post-time">
                  {moment().fromNow(true)}
                </Card.Meta>
              </div>
          </div>
          </div>


        <Modal
          onClose={() => setOpen(false)}
          onOpen={() => setOpen(true)}
          open={open}
          size="tiny"
          trigger={
            <Image
              floated="right"
              size="large"
              src="https://images.pexels.com/photos/4300986/pexels-photo-4300986.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
            />
          }
        >
          <Modal.Content image>
            <Image size="massive" src="https://images.pexels.com/photos/4300986/pexels-photo-4300986.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" wrapped />
          </Modal.Content>
        </Modal>
      </Card.Content>
      <Card.Content extra>
        <Popup
          content="Comment"
          trigger={
            <Button
              color="teal"
              basic
              content="Comment"
              icon="comments"

            />
          }
        />
      </Card.Content>
    </Card>
  );
}
```

#### Step 3 - Main page component
The main page will enable both the `Navbar` and `Body` components to be displayed on the web page. 

To achieve this, we open our `app.js` file and import both components as illustrated below:

```JavaScript
import React from 'react';
import Navbar from '/Navbar;
import Body from '/Body;

Function App(){

    return (
      <div className="App">
        <Navbar />
        <Body />
      </div>
    );
}
export default App;
```

#### Customizing elements in Semantic-UI React
Semantic-UI components and elements are designed with default values in color, size, orientation, and layout. With the aid of a `CSS` file, you can customize each Semantic-UI element to your desired specifications. 

Below is an example of element customization using CSS:

```JavaScript
import React from "react";
import { Card, Image } from "semantic-ui-react";
import "/demo.css"

function Demo(){
  return (
    <div className='app-demo'>
      <a href="http://facebook.com">
        <Card fluid className="demo-card">
          <div className="header">
            <Card.Meta>25 Mins ago</Card.Meta>
            <h3>
              Hello World
            </h3>
          </div>
          <Image
            className="demo-img"
            src="https://images.pexels.com/photos/4300986/pexels-photo-4300986.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
            wrapped
            ui={false}
          />

          <Card.Content>
            <Card.Description>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              Reprehenderit similique officia ratione? Ad, corrupti!
            </Card.Description>
          </Card.Content>
        </Card>
      </a>
    </div>
  );
}

export default Demo;
```

From the `demo.js` above, each element is assigned a `className` that will eventually be targeted and customized in our `demo.css` file. 

The customization is illustrated below:

```CSS
.app-demo{
 margin-top: 20px
}
.demo-img {
  width: 100% !important;
  max-height: 70vh !important;
  overflow: hidden;
}
.post-card {
  margin: auto !important;
  width: 100% !important;
  background: #ecf3ff;
  height: fit-content !important;
  border-radius: 10px !important;
  padding-top: 10px !important;
}
.card {
  margin: 0 !important;
}

```

>Note that the `!important` flag is used to override the default values of the `Semantic-UI` element.

### Modern features of Semantic-UI
The Semantic-UI package comes with many modern features. 

A few of which includes the following:
- Simplified error handling and debugging.
- High level theming variables.
- Advanced elements such as Accordions, Dividers, Segments, Menu, etc.
- Easy to use APIs.
- Customizable layouts and orientation.

### Why you should choose Semantic-UI React
Every developer wants the easiest and most efficient way of solving problems. I will share a few reasons why I think you should consider Semantic-UI React in your next project. 

They include the following:
- Semantic-UI design library is lightweight and easy to use - Which means it does not increase the package size of your project.
- Semantic-UI contains hundreds of customizable icons - All you have to do is import whichever icon you'd like to use into your project.
- Semantic-UI has high efficiency and compilation rate.
- Semantic-UI is easy to use and understand.
- Semantic-UI is used by many tech companies, such as Snapchat, Google Cloud Partners, etc.

### Conclusion
In this article, we have compared both Bootstrap and Semantic-UI design libraries. The verdict is out and is up to you to decide which one best suits your web needs, but I strongly recommend Semantic-UI. 

I hope you find this article helpful in your web development journey.

Happy coding!

### References
- https://semantic-ui.com/
- https://getbootstrap.com/

---
Peer Review Contributions by: [Dawe-Daniel](/engineering-education/authors/dawe-daniel/)