### Building a Responsive and Collapsible Sidebar with Ant Design Library and React

### Introduction:

Three-column web page design is the most widely used web design architecture by modern developers as it provides an efficient way of content presentation. Designing the perfect responsive sidebar, a decade ago was a difficult task that required element manipulation with CSS alone, but these days modern design libraries such as Ant design library has reduced the complexity of building the perfect sidebar and other components.

### Prerequisite:

For better understanding and utilization of this article, the reader is expected to have basic knowledge of ReactJS and CSS. For absolute beginners, the project is beginners friendly notwithstanding.

### Getting Started with Ant Design Library

If you are already familiar with the fundamentals of Ant Design Library, you may proceed to the tutorial. But for absolute beginners here is a brief overview. Ant Design Library is modern design library that provides multiple design elements, components and features. It is one of the most widely used design library for `react` front-end web-development. Finally, Ant Design Library is used by numerous companies such as Tencent, Alibaba, Baidu in their respective user-interface. Feel free to look up the official documentation of Ant Design Library.

### Building the User-Interface

For the purpose of better understanding, we will breakdown the task of building the user-interface which will consist of the `sidebar` and `navbar` components into the various steps below.

#### Step 1: Creating the React Application

The first step in building our responsive sidebar is the creation of our `react` application. This is done by opening our `command` terminal and running the command below

```bash
npx create-react-app my-app
```

Or

```bash
Yarn create-react-app my-app
```

At the completion of the operation, your `react` application should be ready for further actions.

### Step 2: Adding Ant-Design Library to the Application

To have access to Ant-Design library and features, we need to install the `@antd` and `@ant-design/icons` dependencies to our application. We do that by:

```bash
npm install @antd @ant-design/icons
```

Or

```bash
Yarn add @antd @ant-design/icons
```

The above command will install `ant-design` and the `icons` packages to our `react` app.
Once that is completed, we start our development server by running the command below

```bash
Npm start
```

#### Step 3: Creating the Navbar Components:

In our `src` folder we will create a `Navbar.js` file which will accommodate the Navbar component. `Navbar` components are usually displayed right above other components on the page. It will contain a logo, texts, icons and a button. To achieve that, in the`navbar.js` file we implement the code snippet below

```JavaScript
import React, { useState } from "react";
import { Drawer, Button } from "antd";
import { AlignRightOutlined } from "@ant-design/icons";
import { MiniSidebar } from "./Sidebar ";
import "./Navbar.css";

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

#### Step 4: Customizing and Styling the Navbar Component:

We have created a raw navbar that requires styling. To do that, we create a `Navbar.css` file and proceed with the customization. In the `Navbar.css` we target the `className` assigned to the various elements and implement the code snippet below:

```CSS
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

The snippet above will place the Navbar at the top of the page, add responsiveness, show a drawer on small screen, and provides additional styles to our component.
Note: ensure that the `Navbar.css` is appropriately imported in your `Navbar.js` above.

#### Step 5: Creating the Sidebar Components

Creating our Sidebar component is pretty easy, just like we created our `Navbar.js`, repeat the steps, this time the filename should be `Sidebar.js`.
the Sidebar component which is the focus of this article will comprise of the following elements

- Icons
- Texts
- Toggle Button
- Mini-sidebar component

Which we will subsequently import from the `@antd` dependency we installed earlier. in the `Sidebar.js` file implement the code snippet below.

```JavaScript
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

The code snippet above will provide all the elements required in our sidebar, it will also provide a `mini-sidebar` that will be displayed on medium and small screen.
Note: Ensure all the Icons are properly imported from `@ant-design/icons` dependency as shown above.

#### Step 6: Customization and styling the Sidebar Component:

It is time to customize our `Sidebar`. We will go ahead and include the styles and responsiveness to improve the appearance of our Sidebar.
To do that, we create a `Sidebar.css` file and implement the code snippet below.

```CSS
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

The code snippet above will add the following to our `sidebar`

- Styles on `hover`
- Responsiveness
- Font-size and weight adjustments
- Font colors and Background colors
- Borders, etc.
  Note: ensure the `Sidebar.css` file is created in your `src` folder and appropriately imported to your `Sidebar.js` as shown above

#### Step 7: Displaying the Navbar and Sidebar Components on the Web-Page:

Finally, we need to display our components on the web-page. In the `App.js` file, import both `Navbar` and `Sidebar` components as illustrated below.

```JavaScript
import React from "react";
import NavBar from "./NavBar";
import Sidebar from "./Sidebar";

function App() {
  return (
    <div className="app">
      <Navbar/>
      <Sidebar/>
    </div>
  );
}

export default App;

```

Once the code snippet above is properly implemented, in your browser, the responsive `Navbar` and `Sidebar` components will be displayed and styled as expected. You may interact and adjust the screen size to view the `Mini-sidebar` and confirm the styles.

### Conclusion:

In this brief article, we created and styled a `Navbar` and `Sidebar` components with ReactJS and Ant-Design Library. I hope you found this article to be of great help. Feel free to use the tutorial in your project.
Happy Coding!!

### References:

https://ant.design/components/icon/
https://ant.design/docs/react/introduce
