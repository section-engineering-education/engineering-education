---
layout: engineering-education
status: publish
published: true
url: /keycloak-react-app/
title: Implementing Secure Authentication with Keycloak
description: This tutorial will help the reader understand how to set up a Keycloak server to secure React frontend applications. 
author: wilson-gichuhi
date: 2022-06-23T00:00:00-04:00
topics: [Languages]
excerpt_separator: <!--more-->
images:

- url: /engineering-education/keycloak-react-app/hero.png
  alt: Implementing Secure Authentication with Keycloak Hero Image
---
Many web-based applications implement authentication mechanisms to ensure security. However, securing these vulnerabilities from the ground up is a complicated task. 
<!--more-->
Due to these reasons, we tend to turn to external third-party services. One such service is Keycloak. KeyCloak is an open-source identity and access management service. 

It aims to make it easier to handle security services in modern application infrastructure. Keycloak handles multiple authentication services such as login forms and storing user data.

### Goal
This tutorial will help the reader understand how to set up a Keycloak server to secure React frontend applications. 

### Prerequisites
To follow along, you need:
- [Docker Engine](https://docs.docker.com/engine/install/) installed on your machine.
- A Text Editor such as [VS code](https://docs.docker.com/engine/install/).
- A web browser such as [Google Chrome](https://www.google.com/chrome/) or [Firefox](https://www.mozilla.org/en-US/firefox/new/).
- [Node.js](https://nodejs.org/en/) runtime environment installed on your local system.

### KeyCloak features
- Single sign-on and sign-out mechanisms.
- Support for OIDC e.g OpenID Connect and SAML 2.0.
- Support for social media login channels.
- User account management via both the web console and REST API.
- Provision of Admin Console, Account Management Console, and Client Adapters.

### KeyCloak set up and configurations
We will begin the setup by pulling the KeyCloak docker image from [Docker Hub](https://hub.docker.com/r/jboss/keycloak/). On your terminal, confirm that Docker is installed by running the command:

```bash
docker version
```

If Docker is not installed on your system, head over and complete the [setup guide](https://docs.docker.com/engine/install/) for Linux, Windows, or macOS.

Next, pull the KeyCloak image from Docker Hub with the command:

```bash
docker pull jboss/keycloak
```

To successfully create a KeyCloak instance, we need to:

- Expose a server port. In our case, we will use port `8080`.
- Specify a database that the Keycloak server will use. In this tutorial, we will go with the embedded H2 database.
- Create admin credentials with a username and password. 

Finally, begin the setup by running the command:

```bash
docker run -p 8080:8080 -e KEYCLOAK_PASSWORD=admin123 -e KEYCLOAK_USER=admin -e DB_VENDOR=H2 jboss/keycloak
```

Here, we pass along the `KEYCLOAK_USER` and `KEYCLOAK_PASSWORD` as environment variables.

Once our container fires up, navigate to your browser on http://localhost:8080/auth/admin and log in with the credentials we created earlier. On this page you should see something like:

![Keycloak sign](/engineering-education/keycloak-react-app/admin_dashboard.png)

### Understanding key concepts
We need to briefly understand Keycloak terms and concepts as an authentication solution for web applications and RESTful services.

- Realms:  A realm creates the domain where we define all entities. In our setup so far, we have a master realm.
- Roles: Roles guarantee authorization by levels to protect resources in the system. E.g an admin, a manager, staff, etc.
- Users: Users are the entities within our Keyloak that access the system depending on their roles.
- Identity Providers include any third party that we integrate E.g Facebook, Google, and OpenID Connect/SAML 2.0.

### Creating Realm
Currently, we are at the master realm which is the root. The master realm is the recommended sandbox environment for admin tasks for creating other realms. 

To create a new realm for our applications, use the left sidebar of the admin console. Under the dropdown option, click the `Add realm` button to add a new realm. 

![Add Realm](/engineering-education/keycloak-react-app/add-realm.png)

To create a realm, we need to specify a name. I'll use the name `myRealmDemo`.

Within our newly created `myRealmDemo`, we will create a test user instance. On the left panel under the `manage` section, click `Add User` and provide a username and a password under the `Credentials` tab. 

![Add user](/engineering-education/keycloak-react-app/add-user.png)

> The initial password that's created is temporary. Make sure to reset it before accessing the account management panel.

We can confirm our new user by navigating to `http://localhost:8080/auth/realms/myRealmDemo/account`.

![user1-info](/engineering-education/keycloak-react-app/user1-personal-info.png).

For user details,  add `First name`, `Last name`, and `Email`  fields.

To complete our configuration on the Keycloak server, we need to add a client that will initiate login for any web service. Go back to the `Clients` tab under the admin console and click the `Create` button.

![Add client](/engineering-education/keycloak-react-app/add-client.png)

Provide a name as your `Client ID` and `Root URL` as `http://localhost:3000` where our React client will run.

One last thing we need is the Keycloak JSON that we will pass along to the client when initiating requests. On the `Installation` tab, select Keycloak OIDC JSON as the data format. Keep it safe since we will reuse it in the next section!

![installation tab](/engineering-education/keycloak-react-app/installation-tab.png)

### Set up React Frontend
To bootstrap our client app, we will use the [Vite CLI](https://vitejs.dev/) build tool. To create a boilerplate React template with Vite, type the command: 

```bash
yarn create vite react-keycloak-app --template react
```

Next, navigate into the `react-keycloak-app` folder and install all the dependencies:

```bash
cd react-keycloak-app && npm i
``` 

Other dependencies that our application needs include `react-router-dom`, `keycloak-js`, and `tailwindcss`. Let's install the dependencies with the command:

```bash
npm i react-router-dom keycloak-js
```

Lastly, add TailwindCSS as a development dependency.

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

```js
content: [
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "./index.html",
  ]
```

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

Our app simply allows the client to navigate between public and protected routes. We have the following components:

- `App` component is the root component.
- `NavBar` component: For links and navigation.
- `Home` component: This is a public route.
- `Resources` component: To access this route, the client will have to be authenticated from our Keycloak server.
- A `Footer` component with basic links and subscribe form.

### App component
Inside our `App.jsx` file, add the code below. We will be creating these components in a moment.

```jsx
import {BrowserRouter, Route, Routes} from 'react-router-dom';

// components
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import Home from './components/Home';

import Resources from './components/Resources';

export default function App() {
  return (
  <div>
    <BrowserRouter>
      <NavBar/>

      <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/resource' 
              element={<Resources>}/>
      </Routes>

      <Footer/>
    </BrowserRouter>
  </div>
```

### NavBar component
Our `NavBar` component will have the basic links for routes and a brand name as `KeyCloak App`. Add a folder for components named `components`. 

Inside this folder, create `NavBar.jsx` file. We need to first import `Link` from the react-router package to handle navigation.

```jsx
import {Link} from 'react-router-dom'
```

The nav links for our app:

```jsx
export default function NavBar() {
  return (
    <nav>
    <div className='flex justify-around items-center py-5 bg-[#234] text-white'>
      <h1 className='font-semibold font-2xl'>KeyCloak App</h1>
      <ul className='flex'>

        <li className='mx-1'>
          <Link to='/'>Home</Link>
        </li>
        <li className='mx-1'>
          <Link to='/resource'>Login</Link>
        </li>
        <li className='mx-1'>
          <Link to ='/resource'>Resource</Link>
        </li>
      </ul>
    </div>
    </nav>
  )
}
```

### Home component
Within our `components folder`, add a new file and name it `Home.jsx`. The JSX for the file is:

```jsx
export default function Home() {
  return (
    <div className='my-[12rem] text-center'>
      <p className='text-2xl font-bold'>Keycloak Landing Page. You are at Home &trade;</p>
    </div>
  )
}
```

### Resources component
Add a new file under `components` folder as `Resources.jsx`. This component is stateful. Therefore, let's import our keycloak package, `useState`, and `useEffect` as:

```jsx
import { useState, useEffect } from 'react';
import Keycloak from 'keycloak-js';
```

Inside the `Resources` component, add the methods to check for keycloak instance and authentication. Using the `useState` hook:

```jsx
export default function Resources(){
  const [keycloak, setKeycloak] = useState(null)
  const [authenticated, setAuthenticated] = useState(false)
}
```

To track the render cycle, use the `useEffect` hook so that when the component is mounted onto the DOM, we can invoke the Keycloak instance. The path needs to point to the `keycloak.json` path that we downloaded earlier. 

```jsx
  useEffect(()=>{
    const keycloak = Keycloak('/keycloak.json');
    keycloak.init({ onLoad: 'login-required' }).then(authenticated => {
      setKeycloak(keycloak)
      setAuthenticated(authenticated)
    })
  }, [])
```

Lastly, we need to check that the user is authenticated with two states:

- If `keycloak` exists (Keycloak returns an object) and the user is authenticated, we render a text and a random image.
- If not, we return the "Unable to initiate auth!" message.
  
```jsx
  if (keycloak) {
    if (authenticated) return (
      {/* JSX returns an image and text as protected **resources** */}
      <div className='my-12 grid place-items-center'>
        <p> You are logged in.</p>
          <div>
          
          <img src="https://random.imagecdn.app/500/250"/> 
          </div>
      </div>
    ); 
    else return (<div className='my-12'>Unable to initiate auth!</div>)
  }

  return(
    <>
      <div className='my-12'>Keycloak initializing in a moment...</div>
    </>
  )
```

### Footer
Finally, our client code has a footer with social links and a subscribe button. Check the code below:

```jsx
export default function Footer() {
  return (
    <div className='py-7 bg-[#1b252d] text-white grid grid-cols-1 place-items-center w-full'>
      <div className="shadow-lg">
        <div>
          <div className='mb-4 text-white'>
            <p className='font-semibold'>Subscribe to Newsletter</p>
            <p>Get emails from me about web development, tech, and early access to new articles</p>
          </div>
          <div className='relative'>
          <input placeholder='tim@apple.com' className='p-3 text-[#4b586e] rounded-tl-full rounded-bl-full outline-none'/>
          <button className='p-3 bg-[#4b586e] text-white rounded-tr-full rounded-br-full outline-none hover:bg-[#1b252e]'>
            Subscribe</button>
          </div>
        </div>
        <div className='mt-4'>
        <ul className='flex'>
          <li className='px-4'>Facebook</li>
          <li className='px-4'>Instagram</li>
          <li className='px-4'>Twitter</li>
        </ul>
      </div>
      </div>
    </div>
  )
}
```

### Final demo
If we run the command `npm run dev` on our terminal. Our dev server fires up on `localhost:3000`. The final version of the app should look like this:

The home page as a public route:

![App landing page](/engineering-education/keycloak-react-app/home-page.png)

The protected route needs authentication with Keycloak:

![resource component](/engineering-education/keycloak-react-app/resource.png)

You can download the project source code from this [GitHub repo](https://github.com/Qodestackr/keycloak-app).

### Conclusion
Digital technology has offered vast alternatives to implementing authentication services. From a user's perspective, developers need multiple ways to verify identities and role management in accessing key systems and resources. 

Therefore, having this set of tools in an open-source framework such as Keycloak is very convenient. This is what makes Keycloak a success in every way. Happy hacking!

### Further reading
- [Keycloak SSL configuration](https://www.keycloak.org/docs/latest/server_installation/index.html#setting-up-https-ssl).
- [Keycloak authorization services](http://www.keycloak.org/docs/latest/authorization_services/index.html).

---
Peer Review Contributions by: [Wanja Mike](/engineering-education/authors/michael-barasa/)