---
layout: engineering-education
status: publish
published: true
url: /collapsible-sidebar-with-react-and-ant-design-library/
title: Building a Responsive Collapsible Sidebar using React and Ant Design Library
description: This article will show the reader how to design a responsive and collapsible sidebar using the Ant Design Library and React.js.
author: tio-umoh
date: 2021-09-28T00:00:00-00:40
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/collapsible-sidebar-with-react-and-ant-design-library/hero.png
    alt: Responsive collapsible sidebar with image
---
Many developers use the three-column web page design architecture because it provides an efficient way to present content. 
<!--more-->
In the past, designing a perfect responsive sidebar was a difficult task that required element manipulation with CSS alone. 

However, modern design libraries such as the Ant design library have reduced the complexity of building sidebars, as well as other components.

### Prerequisite
To better understand and utilize this article, the reader is expected to have basic knowledge of React.js and CSS. This project is beginner-friendly.

### Getting started with Ant Design Library
Ant Design Library is a modern design library that provides multiple design elements, components, and features. 

It is one of the widely used design libraries for `React` in front-end web development. 

Ant Design Library is used by companies such as Tencent, Alibaba, Baidu in their respective user interfaces. Feel free to look up the official documentation of [Ant Design Library](https://ant.design/docs/react/introduce).

### Building the user-interface
For better understanding, we will break down the task of building the user interface (sidebar and navbar) into the various steps below:

#### Creating the React application
The first step in building our responsive sidebar is to create our `React` application. 

We do this by opening our `command` terminal and running the command below:

```bash
npx create-react-app my-app
```

Or

```bash
yarn create-react-app my-app
```

### Adding Ant-Design Library to the application
To access the Ant-Design library and features, we need to install our application's `@antd` and `@ant-design/icons` dependencies. We do that using the following command:

```bash
npm install @antd @ant-design/icons
```

Or

```bash
Yarn add @antd @ant-design/icons
```

The above command will install `ant-design` and the `icons` packages to our `React` app.


Once the installation is completed, we start the development server by running the command below:

```bash
Npm start
```

#### Creating the Navbar components
We will create a `Navbar.js` file to accommodate the Navbar component in our `src` folder. 

`Navbar` components are usually displayed right above other components on the page. Therefore, it will contain a `logo`, `menu links texts`, `icons` and a `button`. 

To achieve this, we implement the code snippet below in the `Navbar.js` file.

```js
import React, { useState } from "react"; //useState helps us manage our app state
import { Drawer, Button } from "antd"; //importing compnents from ant library
import { AlignRightOutlined } from "@ant-design/icons"; //importing ant design icons
import { MiniSidebar } from "./Sidebar ";
import "./Navbar.css"; //importing a css styling sheet

function NavBar() {
  const [shown, setShown] = useState(false);

  const showSidebar = () => {
    setShown(true);
  };

  const drawerClosed = () => {
    setShown(false);
  };

function LeftMenu({mode}) {
  return (
    <Menu mode={mode}>
    <Menu.Item key="mail">
      <Link to="/">Home</Link>
    </Menu.Item>
    <Menu.Item key="subscription">
      <Link to="/subscription">Subscription</Link>
    </Menu.Item>
  </Menu>
  )
}

function LeftMenu({mode}) {
 return (
      <Menu mode={mode}>
        <Menu.Item key="mail">
          <a href="/login">Signin</a>
        </Menu.Item>
        <Menu.Item key="app">
          <a href="/register">Signup</a>
        </Menu.Item>
      </Menu>
    )
}
  return (
    <nav
      className="menu"
      style={{ position: "fixed", zIndex: 5, width: "100%" }}
    >
      <div className="main-logo">
        <a href="/">Logo</a>
      </div>
      <div className="menu-container">
        <div className="left-menu">
          <LeftMenu mode="horizontal" />
        </div>
        <div className="right-menu">
          <RightMenu mode="horizontal" />
        </div>
        <Button
          className="small-screen-btn"
          type="primary"
          onClick={showSidebar}
        >
          <AlignRightOutlined size="medium" />
        </Button>
        <Drawer
          title="Sidebar Drawer"
          placement="left"
          className="menu-drawer"
          closable={false}
          onClose={drawerClosed}
          visible={shown}
        >
          <MiniSidebar />
        </Drawer>
      </div>
    </nav>
  );
}

export default NavBar;
```

#### Customising and styling the Navbar components
In the step above, we have created a raw Navbar that requires styling. To do that, we create a `Navbar.css` file and then proceed with the customization. 

In the `Navbar.css`, we target the `className` assigned to the various elements and implement the code snippet below:

```css
@import "~antd/dist/antd.css";

.menu {
  border-bottom: solid 1px #f5e2e2;
  overflow: auto;
  padding: 0px 19px;
  box-shadow: 1 0 28px #dbd6d6;
  background-color: #fff;
}

.main-logo {
  width: 152px;
  float: left !important;
}

.main-logo a {
  padding: 18px 21px;
  font-size: 20px;
  display: inline-block;
}

.menu-container .ant-menu-item {
  padding: 0px 5px;
}

.menu-container .ant-menu-submenu-title {
  padding: 10px 20px;
}

.menu-container .ant-menu-item a,
.menu-container .ant-menu-submenu-title a {
  padding: 10px 15px;
}

.menu-container .ant-menu-horizontal {
  border-bottom: none;
}

.menu-container .left-menu {
  float: left;
}

.menu-container .right-menu {
  float: right;
}

.small-screen-btn {
  height: 33px;
  padding: 7px;
  margin-top: 9px;
  display: none !important;
  float: right;
  background: #3e91f7;
}

.menu-drawer .ant-drawer-body {
  padding: 0 1px !important;
}

.menu-drawer .ant-drawer-header {
  padding: 15px 23px !important;
}

@media (max-width: 700px) {
  .small-screen-btn {
    display: inline-block !important;
  }

  .left-menu,
  .right-menu {
    display: none !important;
  }

  .main-logo a {
    margin-left: -22px;
  }

  .menu-container .ant-menu-item,
  .menu-container .ant-menu-submenu-title {
    padding: 1.5px 19px;
  }

  .main-logo a {
    padding: 11px 19px;
  }
}
```

The snippet above will place the Navbar at the top of the page, add responsiveness, show a drawer on the small screen, and provides additional styles to our app component.

> Note: Ensure that the `Navbar.css` is appropriately imported in your `Navbar.js`.

#### Creating the sidebar components
Creating our Sidebar component is quite easy. We will repeat the same steps we took when creating the `Navbar.js`. However, this time, the filename should be `Sidebar.js`.

The `Sidebar` component, which is the focus of this article, will comprise of the following elements
- Icons.
- Texts.
- Toggle Button.
- Mini-sidebar component.

We will subsequently import these components from the `@antd` dependency that we installed earlier. 

Open the `Sidebar.js` file and then add the code snippet below:

```js
import React from "react";
import Icon, {
  EllipsisOutlined,
  GlobalOutlined,
  HomeOutlined,
  MessageOutlined,
  NotificationOutlined,
  PlaySquareOutlined,
  ReadOutlined,
  UserOutlined,
} from "@ant-design/icons";
import "./Sidebar.css";
export default function Sidebar() {
  function SidebarOption({ text, name, tag }) {
    return (
      <div className="sidebar-option">
        <Icon className="sidebar-icon" component={name} size="medium" />
        <h2>{text}</h2>
      </div>
    );
  }

  return (
    <div className="sidebar">
      <SidebarOption text="Home" name={HomeOutlined} />
      <SidebarOption text="Profile" name={UserOutlined} />
      <SidebarOption text="Messages" name={MessageOutlined} />
      <SidebarOption text="Notify" name={NotificationOutlined} />
      <SidebarOption text="News" name={ReadOutlined} />
      <SidebarOption text="Videos" name={PlaySquareOutlined} />
      <SidebarOption text="Explore" name={GlobalOutlined} />
      <SidebarOption text="More" name={EllipsisOutlined} />
    </div>
  );
}

export function MiniSidebar() {
  function SidebarOption({ text, name, tag }) {
    return (
      <div className="sidebar-option">
        <Icon className="sidebar-icon" component={name} size="medium" />
        <h3 style={{ paddingTop: "23px" }}>{text}</h3>
      </div>
    );
  }
  return (
    <div className="mini-sidebar">
      <SidebarOption text="Home" name={HomeOutlined} />
      <SidebarOption text="Profile" name={UserOutlined} />
      <SidebarOption text="Messages" name={MessageOutlined} />
      <SidebarOption text="Notify" name={NotificationOutlined} />
      <SidebarOption text="News" name={ReadOutlined} />
      <SidebarOption text="Videos" name={PlaySquareOutlined} />
      <SidebarOption text="Explore" name={GlobalOutlined} />
      <SidebarOption text="More" name={EllipsisOutlined} />
    </div>
  );
}
```

The code snippet above will provide all the elements required in our sidebar, and it will also provide a `mini-sidebar` that will be displayed on a medium and small screen.

> Note: Ensure that all icons are imported from the `@ant-design/icons` dependency, as shown above.

#### Customizing and styling the Sidebar component
It's time to customize our `Sidebar`. We will go ahead and include the styles and responsiveness to improve the Sidebar's appearance.

To do that, we create a `Sidebar.css` file and implement the code snippet below.

```css
.mini-sidebar {
  display: none;
}
.sidebar {
  flex: 0.4;
  padding: 5px;
  box-shadow: 0 0 10px #d8d3d3;
  height: 100%;
  width: 15%;
  position: fixed;
  left: auto;
  top: 30px;
  margin-top: 20px;
  background-color: #fff;
  margin-top: 5vh;
}
@media (max-width: 767px) {
  .sidebar {
    top: 12px;
  }
}
@media (max-width: 700px) {
  .sidebar {
    display: none;
  }
  .mini-sidebar {
    display: inherit;
    top: 30px;
    left: 1%;
    margin-top: 20px;
    position: fixed;
    height: 100%;
    width: 30% !important;
  }
}

.sidebar-option {
  margin-top: 10px;
  height: fit-content;
  display: flex;
  padding-bottom: 5px;
  border: 1px solid #ccbcbc;
  border-radius: 20px;
  width: 80%;
  cursor: pointer;
  color: #1a1919;
}
.sidebar-active {
  background-color: #1c065e;
  border-radius: 20px;
  color: #f01cf0;
}
.sidebar-active h2 {
  color: #f01cf0;
}
.sidebar-icon {
  margin: 0 !important;
  color: red !important;
  align-self: center;
  margin-top: 10% !important;
  font-size: medium;
  padding: 5px;
}

.sidebar-option:hover {
  background-color: #cfd7dd;
  border-radius: 20px;
  transition: color 100ms ease-out;
}
.sidebar-option > h2 {
  font-size: medium;
  font-weight: 600;
  margin-right: 20px;
  padding-top: 26px;
}


```

The code snippet above will add the following to our `sidebar.`

- A new style whenever the user hovers over a sidebar item.
- Responsiveness.
- Font-size and weight adjustments.
- Font and Background colors.
- Borders.

> Note: ensure that the `Sidebar.css` file is created in your `src` folder and imported in your `Sidebar.js`.

####  Displaying the Navbar and Sidebar components on the webpage
Finally, we need to display our components on the web page. 

In the `App.js` file, import both Navbar and Sidebar components, as illustrated below:

```js
import React from "react";
import NavBar from "./NavBar";
import Sidebar from "./Sidebar";  //importing our defined components

function App() {
  return (
    <div className="app">
      <Navbar/> //displaying our components
      <Sidebar/>
    </div>
  );
}

export default App;
```

When the code snippet above is correctly rendered in your browser, the responsive `Navbar` and `Sidebar` components will be displayed with the expected styling. 

In addition, you may interact and adjust the screen size to view the `Mini-sidebar` and confirm the styles.

### Conclusion
In this article, we have created and styled `Navbar` and `Sidebar` components with React.js and Ant-Design Library. 

I hope you found this article to be of great help. 


Happy Coding.

### Further reading
- [Ant Design icons](https://ant.design/components/icon/)
- [Ant Design for React.js](https://ant.design/docs/react/introduce)

---
Peer Review Contributions by: [Mercy Meave](/engineering-education/authors/mercy-meave/)
