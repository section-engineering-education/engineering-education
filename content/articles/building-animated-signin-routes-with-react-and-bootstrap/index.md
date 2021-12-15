Building animated sign-in routes with React.js and bootstrap

### Introduction
User registration and authentication are required in most modern websites, where users are requested to provide certain information to have access to content and services offered such as social media websites, blogs, news websites, etc.
Creating the perfect sign-in routes to enable and entice visitors and users to register and log in to your platform is a focal point in web development.
In this tutorial, we will walk through the necessary steps and packages required to build animated sign-in routes with React.js. We will also take a deep dive into the application of vanilla CSS in adding animations and customizing components.

### Key takeaways
after this article, the reader will understand and implement the following:

- Building animated sign-in routes with React.js and bootstrap
- Using Reactstrap in react applications
- Getting started with React.js
- Creating a form with React.js and Bootstrap
- Adding animations and customization with CSS and Bootstrap

### Prerequisite
Basic knowledge of React.js, CSS, and any design library similar to bootstrap is required to follow along and understand the concepts covered in this tutorial. Enroll in this [crash course](https://scrimba.com/learn/learnreact) by scrimba for free if you don’t possess the above.

### Tutorial overview
For better understanding and follow up, we will breakdown the task of building animated sign-in routes with React.js and bootstrap into the following steps:

### Step 1: Getting started with React application
React.js simplifies application development by reducing the entire setup of the `react-app` to a single command. The command below will create and set up a new react application with all the required default dependencies automatically installed by React. So, open up your `command terminal` and run the command below.

```bash
npx create-react-app My-app
```

Alternatively, for yarn users

```bash
yarn create-react-app My-app
```

The operation takes some minutes to set up the application for subsequent development. Also feel free to use a name you wish for the application, just replace the “My-app” with any name of your choice. Take note of React naming convention to avoid errors that may occur when violated.

### Step 2: Setting up the React application
If you open up the application in your preferred text editor, you will find some useful files which we will set up to build the animated sign-in and sign-up routes.
Let’s proceed with the installation of dependencies.

#### Installing the required dependencies
There are a few dependencies that we should add to our react application so React.js will understand and execute the code snippets we will be implementing shortly. The following dependencies will be installed to our application
i. React-router-dom: this package enables React.js to switch between pages (routes) without stress or errors occurring in the process.
ii. Reactstrap: the Reactstrap dependency is a modified bootstrap package designed to React.js specifications. Usage of this package will be discussed in detail in this tutorial.
iii. React-date-picker: I added this package because it reduces the complexity of getting information involving date e.g. Date of birth, day of the month, etc. it provides a dropdown menu with days, months and years readily available.
iv. Semantic-ui-react: we will need the `semantic-ui-react` icons on our page. Icons make a webpage more descriptive and semantic-ui offers numerous ready-to-use icons.
Without any further delay, let’s proceed with the installation process.
To install the above packages, edit the `package. json` file to include the dependencies as shown below:

```JSON
"dependencies": {
 "react-router-dom": "^5.2.0",
 "reactstrap": "8.7.1",
 "react-datepicker": "^3.7.0",
"semantic-ui-react": "^2.0.1",
},
```

Once that is done, save the changes then open up the `command terminal` again and run the installation command shown below:

```bash
npm install
```

Alternatively, for yarn users

```bash
yarn add
```

That should initiate the installation process. Once it is completed, your `package. json` should look similar to this:

```JSON
"dependencies": {
  "@testing-library/jest-dom": "^4.2.4",
  "@testing-library/react": "^9.5.0",
  "@testing-library/user-event": "^7.2.1",
  "classnames": "2.2.6",
  "react": "17.0.1",
  "react-datepicker": "^3.7.0",
  "reactstrap": "8.7.1",
  "react-dom": "17.0.1",
  "react-router-dom": "5.2.0",
  "react-scripts": "4.0.1",
  "reactstrap": "8.7.1",
"semantic-ui-react": "^2.0.1",
},
```

#### Setting up React router and routes (App.js)
We will use the react-router-dom package we installed above to create the routes. To set up the routes (register and sign-in) required for our application, we need to modify the `App.js` file by implementing the code snippet below:

```JavaScript
import React from "react";
import { BrowserRouter as Router, Route, Switch   } from "react-router-dom";
import LoginPage from './LoginPage'
import RegisterPage from './RegisterPage'
export default function Routes() {

  return (
    <Router>
      <Switch>
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/register" component={RegisterPage} />
      </Switch>
    </Router>
  )
}
```

From the code snippet above, we did the following import:
i. BrowserRouter as Router: the is a router implementation that ensures your browser interface is in sync with the URL. It must also wrap all the components and routes (pages) for them to
ii. Route: to conditionally display a page when its path matches the desired path (URL), the route component is used
iii. Switch: the switch component prevents two routes from being rendered. It does this by rendering the first routes that match the location.
We also imported the `LoginPage` `RegisterPage` which will be created shortly.

### Step 3: Creating the required components
As mentioned, we will be creating only 2 routes components namely:
i. LoginPage Component and
ii. RegisterPage Component
You may create and add as many pages as you may desire.

#### The LoginPage Component (LoginPage.js)
The login page will enable registered users to sign in to the application. The page will consist of the following:

- Forms
- Button
- Page Header
- Page image
- Icons and
- Link to the registration page for new users.
  Now let’s begin. In the `src` folder, create a `LoginPage.js`, thereafter implement the code snippet shown below:

```JavaScript
import React from "react";
import { Button, Form} from "reactstrap";
import { Icon} from '"semantic-ui-react"'
import rocket from "./undraw_maker_launch_crhe.svg";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

function Login() {
  return (
    <div className="container signMode">
      <div className="form-container">

          <div className="signin-signup">
            <Form className="sign-form sign-in-form ">
              <h2 className="form-title">Sign in</h2>
              <div className="input-field">
                <Icon name="user" />
                <input
                  type="text"
                  placeholder="Username"
                />
              </div>
              <div className="input-field">
                <Icon name="lock" />
                <input
                  type="password"
                  placeholder="Password"
                />
              </div>
              <Button type="submit" className="sign-up-button">
                LOGIN
              </Button>
            </Form>

          </div>
      </div>
      <div className="panel-container">
        <div className="panel left-panel">
          <div className="content">
            <h3>New here?</h3>
            <p>
              Let's get you started with a new account to join the community
            </p>
            <Link to="/register">
              <Button className="transparent" onClick={() => setActive(true)}>
                SIGN UP
              </Button>
            </Link>
          </div>
          <img src={rocket} className="image" alt="rocket" />
        </div>
      </div>
    </div>
  );
}

export default Login;
```

From the code snippet above, we imported the `Form` and `Button` from the Reactstrap library we installed earlier. we also imported a `Link` from `react-router-dom` which will redirect a user to the registration page once it is clicked. As explained earlier, routing and navigation between web pages in React.js is primarily handled by the `react-router-dom`.
Finally, to add more details to our login page, we added some icons imported from the `semantic-ui-react` library, then some placeholders and descriptive texts.
Note: you need to add two images to the `src` folder. Feel free to two images from these [undraw illustrations](https://undraw.co/illustrations). Thereafter you import each to the `LoginPage` and `RegisterPage` components as shown in the snippet above.

#### The RegisterPage Component (RegisterPage.js)
The `RegisterPage` component will be similar to the login page but with a few differences. We will add extra form input fields for the following:
i. Full name
ii. username
iii. Email address
iv. Date of birth
v. Password and
vi. Confirm password
To create the register page, still, in the `src` folder create another file `RegisterPage.js`. once completed, proceed with the code snippet below:

```JavaScript
import React, {useState} from "react";
import { Button, Form} from "reactstrap";
import {Icon} from 'semantic-ui-react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import play from "../images/undraw_press_play_bx2d.svg";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

function Register() {
  const [next, setNext] = useState(false);
  const [startDate, setStartDate] = useState(null);

  return (
    <div className={`container ${active && `signMode`}`}>
      <div className="form-container">
          <div className="signin-signup">
            <Form
              className={`${next && `nextForm`}
              sign-form sign-up-form one `}
            >
              <h2 className="form-title">Sign Up</h2>
              <div className="input-field">
                <Icon name="user" />
                <input
                  type="text"
                  placeholder="Username"
                />
              </div>
              <div className="input-field">
                <Icon name="envelope" />
                <input
                  type="email"
                  placeholder="Email"
                />
              </div>

              <div className="input-field">
                <Icon name="calendar alternate outline" />
                <DatePicker
                  name="age"
                  onChange={(date) => setStartDate(date)}
                  placeholderText="Date of birth"
                  popperPlacement="top"
                  selected={startDate}
                />
              </div>
              <Button
                className="sign-up-button"
                onClick={() => setNext(true)}
              >
                NEXT
              </Button>
            </Form>

            <Form
              onSubmit={onSubmit}
              className={` ${
              next && `nextForm`}
              sign-form sign-up-form two `}
            >
              <h2 className="form-title">Continue</h2>
              <div className="input-field">
                <Icon name="lock" />
                <input
                  type="password"
                  placeholder="Password"
                />
              </div>
              <div className="input-field">
                <Icon name="lock" />
                <input
                  type="Password"
                  placeholder="Confirm Password"
                />
              </div>
              <h6>by signing up you have agreed to our terms and conditions</h6>
              <Button className="sign-up-button" type="submit">
                FINISH
              </Button>
            </Form>
          </div>
      </div>
      <div className="panel-container">
        <div className="panel right-panel">
          <div className="content">
            <h3>One of Us?</h3>
            <p>Continue from where you left off</p>
            <Link to="/login">
              <Button className="transparent" onClick={() => setActive(false)}>
                SIGN IN
              </Button>
            </Link>
          </div>
          <img src={play} className="image" alt="play image" />
        </div>
      </div>
    </div>
  );
}

export default Register;
```

Let’s go over the code snippet above. We did the following:

- First, we created a state with the `UseState` hook from React to conditionally display the second form containing the password field once the information required in the first form is provided.
- We imported the `DatePicker` package we installed earlier to enable the user to provide their date of birth. It requires some arguments such as a placeholder, placement, `onchange`, etc. which will determine the behavior of the dropdown.
- We also added a link to the sign-in page for already registered users to log in.
  The snippet is very basic and easy to understand because we haven’t added the form handler to accept and process the inputs.
  Once we have completed the login and register page setup, it is time to add the animations, customization, and stylings to our components.
  Before we proceed with the styling, we should start the development server to view our application in real-time on the browser.

#### Starting the React.js development server
To display our application on the browser window, we need to start the React development server. This operation is simple and easy to implement. To start the server, open up the `command terminal` and run the command below:

```bash
npm start
```

Or

```bash
yarn start
```

The command above should start up the development. Once that is completed, a new browser window on your default browser (http://localhost:3000/) should open up displaying the application.
Let’s now dive into the CSS part of the tutorial.

#### Styling and Customizing the Components (App.css)
With the help of vanilla CSS, we will add the stylings and animations to the pages. CSS can be used to perform numerous styling operations such as responsiveness and animations. To customize our pages, in the `App.css` file we implement the CSS snippet below:

```CSS
.container {
  position: relative;
  width: 100%;
  min-height: 100vh;
  background: #fff;
  overflow: hidden;
}
.container .form-container {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 2%;
  left: 0;
}

.container::before {
  content: "";
  position: absolute;
  width: 2000px;
  height: 2000px;
  border-radius: 50%;
  background: linear-gradient(-45deg, #740374, #a807a8);
  top: -10%;
  right: 48%;
  transform: translateY(-50%);
  z-index: 6;
  transition: 1.8s ease-in-out;
}
.sign-form {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 5rem;
  overflow: hidden;
  grid-column: 1 / 2;
  grid-row: 1 / 2;
  transition: 0.5s 0.7s ease-in-out;
}
.sign-form.sign-in-form {
  z-index: 2;
}

.sign-form.sign-up-form {
  z-index: 1;
  opacity: 0;
}

```

A greater portion of this tutorial revolves around CSS and reactstrap. From the snippet above we targeted the `container` `ClassName` which wraps every other page element. We adjusted the `width`and`height`, changed the `position`to`relative`. Also added was some `background-colors`, `border-radius`. Most importantly, we used a linear-gradient with the shades of purple for the background. We also added some styles to the sign-in forms such as `align-items`, `justify-content`, `paddings`, etc. as shown above. We will add more styles to our application. Still in the `App.css`, proceed with the CSS snippet below:

```CSS
.sign-up-button {
  background: #b90fb9 !important;
  color: #fff !important;
  width: 100px !important;
  height: 41px !important;
}
.form-title {
  font-size: 2.2rem;
  color: #444;
  margin-bottom: 10px;
}
.input-field {
  max-width: 340px;
  width: 100%;
  height: 55px;
  background: #f0f0f0;
  margin: 10px 0;
  border-radius: 55px;
  display: grid;
  grid-template-columns: 15% 85%;
  padding: 0.4rem;
}
.input-field i {
  text-align: center;
  line-height: 45px;
  color: #acacac;
  font-size: 1.1rem;
}

.signin-signup {
  position: absolute;
  top: 50%;
  left: 75%;
  transform: translate(-50%, -50%);
  width: 50%;
  height: fit-content;
  display: grid;
  grid-template-columns: 1fr;
  z-index: 5;
  transition: 1s 0.9s ease-in-out;
}

.sign-up-form .one {
  z-index: 2;
}
.sign-up-form .two {
  z-index: 1;
  opacity: 0;
}
.panel-container {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
}
.panel {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: space-around;
  text-align: center;
  z-index: 7;
}
.panel .content {
  color: #fff;
  transition: 0.9s 0.6s ease-in-out;
}

.transparent {
  margin: 0;
  background: none !important;
  color: #fff !important;
  border: 2px solid #fff !important;
  width: 130px !important;
  height: 41px !important;
  font-weight: 600 !important;
  font-size: 0.8rem !important;
}
.left-panel {
  pointer-events: all;
  padding: 3rem 17% 2rem 12%;
}
.right-panel {
  pointer-events: none;
  padding: 3rem 12% 2rem 17%;
}
.image {
  width: 100%;
  transition: 1.1s 0.4s ease-in-out;
}
.right-panel .content,
.right-panel .image {
  transform: translateX(800px);
}
```

We are still targeting the various `ClassName` we assigned to the component elements and adding styles to them. You should note that we added the `!important` flag to some of our styles to override default Reactstrap styles. Without the `!important` flag, our styles will not go into effect.
Now, let us add the animation and transformation to our pages. To do that, still, in the `App.css` continue with the CSS snippet below:

```CSS
/* Animation */
.container.signMode::before {
  transform: translate(100%, -50%);
  right: 52%;
}
.container.signMode .left-panel .image,
.container.signMode .left-panel .content {
  transform: translateX(-800px);
}

.container.signMode .right-panel .content,
.container.signMode .right-panel .image {
  transform: translateX(0px);
}
.container.signMode .left-panel {
  pointer-events: none;
}
.container.signMode .right-panel {
  pointer-events: all;
}
.container.signMode .signin-signup {
  left: 25%;
}
.container.signMode form.sign-in-form {
  z-index: 1;
  opacity: 0;
}

.container.signMode form.sign-up-form.one,
.container.signMode form.nextForm.sign-up-form.two {
  z-index: 2;
  opacity: 1;
}
.container.signMode form.sign-up-form.two {
  z-index: 1;
  opacity: 0;
}
.sign-in-form {
  transition: 1.5s 0.5 ease-in-out !important;
}
.sign-up-form.one {
  transition: 0.5s 0.6s ease-in-out !important;
}
.sign-up-form.two {
  transition: 1.5s 0.5 ease-in-out !important;
}
.nextForm.two {
  transform: translateX(0);
}

.nextForm.one {
  transform: translateX(-800px);
}
```

From the snippet above, we added CSS `transformation` to the container `classNames` which will allow a smooth transition left and right when the buttons are clicked by the user. We also added some `pointer-events` to enable and disable some clicking events on each panel at a time.
Finally, we added the `z-index` of 1 to ensure that no element sits above our forms and it is visible at all times.
In the last section of this step, we will add some responsiveness to our pages to ensure it stays visible and neat in all screen sizes. To do that, still, in the `App.css`, we implement the code snippet below:

```CSS
/* Responsiveness */
@media (max-width: 870px) {
  .container {
    min-height: 800px;
    height: 100vh;
  }
  .container::before {
    width: 1500px;
    height: 1500px;
    left: 30%;
    bottom: 70%;
    transform: translateX(-50%);
    right: initial;
    top: initial;
    transition: 2s ease-in-out;
  }
  .signin-signup {
    width: 100%;
    left: 50%;
    top: 95%;
    transform: translate(-50%, -100%);
    transition: 1s 0.8s ease-in-out;
  }
  .panel-container {
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 2fr 1fr;
  }
  .panel {
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    padding: 2.5rem 8%;
  }
  .transparent {
    width: 110px !important;
    height: 35px !important;
    font-size: 0.7rem !important;
  }
  .panel .content {
    padding-right: 15%;
    transition: 0.9s 0.8s ease-in-out;
  }
  .image {
    width: 200px;
    transition: 0.9s 0.6s ease-in-out;
  }
  .left-panel {
    grid-row: 1 / 2;
  }
  .right-panel {
    grid-row: 3 / 4;
  }
  .right-panel .content,
  .right-panel .image {
    transform: translateY(300px);
  }
  .container.signMode::before {
    transform: translate(-50%, 100%);
    bottom: 29%;
    right: initial;
  }
  .container.signMode .left-panel .image,
  .container.signMode .left-panel .content {
    transform: translateY(-300px);
  }
  .container.signMode .signin-signup {
    top: 0;
    transform: translate(-50%, 0);
    left: 50%;
  }
}
@media (max-width: 570px) {
  .sign-form {
    padding: 0 1.5rem;
  }
  .image {
    display: none;
  }
  .panel .content {
    padding: 0.5rem 1rem;
  }
  .container::before {
    bottom: 72%;
    left: 50%;
  }
  .container.signMode::before {
    bottom: 20%;
    left: 50%;
  }
}
```

From the snippet above, we used some CSS `@media` queries to add responsiveness to our pages. We also made the images hidden on small screens.
As we noticed, CSS snippets are pretty much self-explanatory and do not require intensive explanation. Take out time to observe the changes on your browser window once you’ve correctly implemented each of the CSS blocks to have a better understanding. You could also inspect each of the elements and classes from the browser `dev-tools`.

### Conclusion
In this article, we created and styled the login and register page with React.js, Reactstrap, and vanilla CSS. We also went through the page elements required to build good-looking sign-in routes for websites or blogs. Here is a link to a [Github repo.](https://github.com/KingsleyJack/sign-in-routes-codes) containing the full codes to the tutorial. Feel free to utilize this tutorial in your next React.js project and I hope you found this article useful.
Cheers!
Happy coding.

### References
- https://reactstrap.github.io/
- https://semantic-ui.com/