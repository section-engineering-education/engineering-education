The React.js framework allows you to create single-page applications. These are applications in which the pages won’t reload when you click on different links. The transition from one link to the next is so quick that it's difficult to notice when the content changes. As a result, we can use transitions while navigating through various links or routes on a website. This improves the application's User Experience.

For some, transitioning from page to page has often seemed difficult. We can archive that using a library called framer motion. In this tutorial, we'll take a look at what framer motion is and how to use it to make page transitions
### What is framer motion?

Framer Motion is an animation library that makes it so simple to create animations. Its simplified API allows us to extract the complexities of animations. Thus creating animations with ease. An open-source, production-ready React motion library. Framer Motion is ideal for dealing with animations on 99 percent of websites. We can check out their website [here](https://www.framer.com/motion/) to know more about framer motion. We can also find cool websites built with framer motion at [awwards](https://www.awwwards.com/websites/framer-motion/) for inspiration.

The `motion` component is the Framer motion core API. Every HTML and SVG element has a `motion` component. They function exactly the same as their HTML counterparts. They also have more props that allow the addition of animations and gestures. . We would get to understand better when we’re building our project. So let’s get started
### Prerequisites

To follow through this article, we need to have a basic understanding of Javascript. We also need to know how react-router works. This is beacuse we'll be using the react router to navigate through our links(pages). We'll be creating a navbar which houses links to the `home`, `about`, `contact us` pages.
### Page Transitions With Framer-motion

Open our terminal and navigate to the folder where we want to have our project installed.

Run the code:

```bash
 npx create react-app framer-motion
```

We won’t be using some files like `App.css`, `App.test.js`, `Index.css`, `reportWebvitals.js`, `setupWebVitals.js`. let’s delete them and also where they are being called in any pf our project’s file. Locate `App.js` file which is in our src folder and also edit it making it look like this:
![app.js](/engineering-education/page-transition-in-react-using-framer-motion/app.png)

The next step is to change the directory into the app we created. We want to install the packages that we’ll be using in this tutorial. These are react-router-dom and framer motion. We'll use the react-router-dom to navigate through pages. :

```bash
npm install react-router-dom
```

For framer motion:

```bash
npm install framer-motion
```

Start our app:

```bash
npm start
```

Now that we’ve done that let’s start building.

Inside our `src` folder, we’ll create a folder called `pages`(you can name it anything you like). The `pages` folder would contain five files. These files include `Home.js`, `About.js`, `Contact.js`, `Navbar.js`, and `AnimatedRoutes.js`.

The `Home.js`, `About.js`, and `Contact.js` are the page that we’ll be using to show the transitions. We’ll also be embedding them into the `Navbar` file. The `AnimatedRoutes` will contain all our routes for navigating between these pages. We will also call out our framer motion on this page.

Let’s create a folder inside our `src` folder called `pages`. Inside this folder, create a field named `Home.js`. Paste this in:

```javascript
import React from "react";
import { motion } from "framer-motion";
import React from "react";

function Home() {
  return (
    <div className="container text-center">
      <h1>Home page</h1>
      <p>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sequi, qui.
        Hic animi distinctio et maiores, ab nostrum at neque. Iusto minus
        perspiciatis vitae unde? In quibusdam nulla perspiciatis laboriosam ex.
      </p>
    </div>
  );
}

export default Home;
```

* We created our homepage. Let’s move on to create the others and also write their respective codes. Create a file named `About.js` and paste this in:

```javascript
import React from "react";

function About() {
  return (
    <div className="container text-center">
      <h1>About Page</h1>

      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint quasi
        debitis fuga deserunt, placeat qui optio totam perspiciatis error.
        Repudiandae, enim veniam. Dolorum officiis recusandae consequuntur
        veritatis magni aliquam itaque.
      </p>
    </div>
  );
}

export default About;
```

Next, create a file called `Contact.js` and paste this in:

```javascript
import React from "react";

function Contact() {
  return (
    <div className="container text-center">
      <h1>Contact us</h1>

      <p>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Optio mollitia
        in minima architecto odit sunt enim quidem blanditiis voluptates,
        provident veritatis labore. Natus pariatur eos at nemo, officia
        voluptatibus accusamus.
      </p>
    </div>
  );
}

export default Contact;
```

Let's also create our `Navbar` and paste this:

```javascript
import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <nav
        fixed="top"
        expand="sm"
        bg="dark"
        className="navbar navbar-expand-lg
				navbar-light bg-light"
      >
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link active" to="/home">
                  Home
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/about">
                  About Us
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/contact">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
```

* What we did here is import `Link` from react-router-dom. We used this to create links to the location of each of our pages.

Next up create a file called `AnimatedRoutes` and paste this:

```javascript
import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./Home";
import Contact from "./Contact";
import About from "./About";
import { AnimatePresence } from "framer-motion";

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence exitBeforeEnter>
      <Routes key={location.pathname} location={location}>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </AnimatePresence>
  );
}

export default AnimatedRoutes;
```

* Here, we imported our `Routes`, `Route`, and `useLocation` from react-router-dom. `Routes` are a significant improvement over the `Switch` element in v5. The route will allow us to go to each of the pages we created in response to our request. The 'useLocation' hook will assist our routes in determining which pages we are on. We also imported our pages as well as the `animatedPresence` from framer motion. We then wrapped our routes with our `animatePresence`. We’re almost done with working on our pages folder.

The next thing we want to do is go back to our pages which are the `Home.js`, `About.js`, and `Contact.js` delete and paste this:

Home.js

```javascript
import React from "react";
import { motion } from "framer-motion";

function Home() {
  return (
    <motion.div
      className="container text-center  bg-black"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 3 }}
    >
      <h1>Home page</h1>

      <p>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sequi, qui.
        Hic animi distinctio et maiores, ab nostrum at neque. Iusto minus
        perspiciatis vitae unde? In quibusdam nulla perspiciatis laboriosam ex.
      </p>
    </motion.div>
  );
}

export default Home;
```

About.js

```javascript
import React from "react";
import { motion } from "framer-motion";

function About() {
  return (
    <motion.div
      className="container text-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 3 }}
    >
      <h1>About Page</h1>

      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint quasi
        debitis fuga deserunt, placeat qui optio totam perspiciatis error.
        Repudiandae, enim veniam. Dolorum officiis recusandae consequuntur
        veritatis magni aliquam itaque.
      </p>
    </motion.div>
  );
}

export default About;
```

Contact.js

```javascript
import React from "react";
import { motion } from "framer-motion";

function Contact() {
  return (
    <motion.div
      className="container text-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 3 }}
    >
      <h1>Contact us</h1>

      <p>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Optio mollitia
        in minima architecto odit sunt enim quidem blanditiis voluptates,
        provident veritatis labore. Natus pariatur eos at nemo, officia
        voluptatibus accusamus.
      </p>
    </motion.div>
  );
}

export default Contact;
```

* We’ll import `motion` from framer-motion into each of our three pages. The motion will allow us to define how our animation will run. It works like this we grab our upper level `div` and define it as a `motion.div`, More like adding `motion.` to our div. We also added some properties to it which are:

* Initial: This defines an element's initial state

* Animate: This property defines the animation on the component mount. . If its values differ from style or initial, it will animate these values.

* Exit: This Specifies the animation that occurs when the component is unmounted.

* Transition: This allows us to change the properties of the animation. They include the duration, easing, type of animation, duration, and many other properties. t.

These are some of the extra props that we talked about earlier in the article. Now we’re done with everything that concerns our pages folder.

The last thing we’ll be doing is return `Navbar` and `AnimatedRoutes`. In our App.js, paste this

```javascript
import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./pages/Navbar";
import AnimatedRoutes from "./pages/AnimatedRoutes";
```

Here we imported our router. We’ll return our `navbar` and `AnimatedRoutes` by wrapping them inside our `Router`. Delete everything inside of our `return()` and paste this:

```javascript
<Router>
  <Navbar />
  <AnimatedRoutes />
</Router>
```

**NOTE: we didn’t work on our index.js, we only edited it to look like this:**
![work](/engineering-education/page-transition-in-react-using-framer-motion/work.png)

Let’s now check out our result in the browser:
![result](/engineering-education/page-transition-in-react-using-framer-motion/result.gif)

Here’s a [link](https://github.com/oyedeletemitope/page-transition-in-react-using-framer-motion) to the github repository. We can also find examples on how to use framer motion on their [website](https://www.framer.com/docs/examples/)

### Conclusion
Our main discussion was about framer motion as a tool for making page transitions in React. We also were able to make page transitions by making use of it in our project. Would you please share if this was helpful?
