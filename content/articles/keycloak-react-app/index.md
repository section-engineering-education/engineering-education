Many web-based applications implement authentication mechanisms to ensure security. However, securing these vulnerabilities from the ground up is a complicated task. For these reasons, we tend to turn into external third-party services. One such service is Keycloak. KeyCloak is a complete open-source identity and access management service. It aims to make it painless to handle security services in modern application infrastructure. Keycloak handles multiple authentication services such as login forms and storing user data.

### Goal
This tutorial is a walkthrough on how to set up a Keycloak server to secure React frontend applications. 

### Prerequisites
- Have [Docker Engine](https://docs.docker.com/engine/install/) installed on your machine.
- Text Editor such as [VS code](https://docs.docker.com/engine/install/).
- A web browser such as [Google Chrome](https://www.google.com/chrome/) or [Firefox](https://www.mozilla.org/en-US/firefox/new/).
- [Node.js](https://nodejs.org/en/) runtime environemt installed on your local system.

### KeyCloak features
- Single sign-on and Sign-out mechanisms.
- Support for OIDC e.g OpenID Connect and SAML 2.0.
- Support for social media Login channels.
- User account management via both the web console and REST API.
- Provision of Admin Console, Account Management Console, and Client Adapters.

### KeyCloak Set up and Configurations
We will begin our setup by pulling the KeyCloak docker image from [Docker Hub](https://hub.docker.com/r/jboss/keycloak/). On your terminal, confirm that Docker is installed by running the command:

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

Once our container fires up, navigate to your browser on http://localhost:8080/auth/admin and log in with the
credentials we created earlier. On this page you should see something like:

![Keycloak sign](assets/admin_dashboard.png)

### Understanding Key Concepts
We need to briefly understand Keycloak terms and concepts as an authentication solution for web applications and RESTful services.
- Realms:  A realm creates the domain where we define all entities. In our setup so far, we have a master realm.
- Roles: Roles guarantee authorization by levels to protect resources in the system. E.g an admin, a manager, staff, etc.
- Users: Users are the entities within our Keyloak that access the system depending on their roles.
- Identity Providers include any third party we integrate E.g Facebook, Google, and OpenID Connect/SAML 2.0.

### Creating Realm
Currently, we are at the master realm which is the root. The master realm is the recommended sandbox environment for admin tasks for creating other realms. To create a new realm for our applications, use the left sidebar of the admin console. Under the dropdown option, click the `Add realm` button to add a new realm. 

![Add Realm](/assets/add-realm.png)

To create a realm, we need to specify a name. I'll use the name `myRealmDemo`.

Within our newly created `myRealmDemo`, we will create a test user instance. On the left panel under the `manage` section, click `Add User` and provide a username and a password under the `Credentials` tab. 

![Add user](/assets/add-user.png)


> The initial password created is temporary. Make sure to reset it before accessing the account management panel.

We can confirm our new user by navigating to `http://localhost:8080/auth/realms/myRealmDemo/account`.

![user1-info](/assets/user1-personal-info.png).

For user details,  add `First name`, `Last name`, and `Email`  fields.

To complete our configuration on the Keycloak server, we need to add a client that will initiate login for any web service. Go back to the `Clients` tab under the admin console and click the `Create` button.

![Add client](/assets/add-client.png)

Provide a name as your `Client ID` and `Root URL` as `http://localhost:3000` where our React client will run.

One last thing we need is the Keycloak JSON that we will pass along to the client when initiating requests. On the `Installation` tab, select Keycloak OIDC JSON as the data format. Keep it safe since we will reuse it in the next section!


### Set Up React Frontend
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
- The `App` component is the root component.
- `NavBar` component: For links and navigation.
- `Home` component: This is a public route.
- `Resources` component: To access this route, the client will have to be authenticated from our Keycloak server.
- A `Footer` component with basic links and subscribe form.

### App component
Inside our `App.jsx` file, replace everything inside with:

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
```jsx

import {Link} from 'react-router-dom'

export default function NavBar() {
  return (
    <>
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
    </>
  )
}
```
### Home
```jsx
export default function Home() {
  return (
    <div className='my-[12rem] text-center'>
      <p className='text-2xl font-bold'>Keycloak Landing Page. You are at Home &trade;</p>
    </div>
  )
}
```

### Resources

```jsx
import { useState, useEffect } from 'react';
import Keycloak from 'keycloak-js';
```

```jsx
export default function Resources(){
  const [keycloak, setKeycloak] = useState(null)
  const [authenticated, setAuthenticated] = useState(false)

}
```

```jsx
  useEffect(()=>{
    const keycloak = Keycloak('/keycloak.json');
    keycloak.init({ onLoad: 'login-required' }).then(authenticated => {
      setKeycloak(keycloak)
      setAuthenticated(authenticated)
    })
  }, [])
```

Finally, I
```jsx
  if (keycloak) {
    if (authenticated) return (
      <div className='my-12 grid place-items-center'>
        <p>This is a Keycloak-secured component of your application. You shouldn't be able
          to see this unless you've authenticated with Keycloak.</p>
          <div>
          <img src="https://random.imagecdn.app/500/250"/> 
          </div>
      </div>
    ); 
    else return (<div className='my-12'>Unable to authenticate!</div>)
  }

  return(
    <>
      <div className='my-12'>Initializing Keycloak...</div>
    </>
  )
```

### Footer

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

Grab the project source code on my [GitHub repo](https://github.com/Qodestackr/keycloak-app).

### Conclusion
Digital technology has offered vast alternatives to implementing authentication services. From a user's perspective, developers need multiple ways to verify identities and roles management in accessing systems resources. Therefore having this set of tools in an open-source tool such as Keycloak is very convenient. This is what makes Keycloak a success in every way. Happy hacking!

### Further reading
- [Keycloak SSL configuration](https://www.keycloak.org/docs/latest/server_installation/index.html#setting-up-https-ssl).
- [Keycloak authorization services](http://www.keycloak.org/docs/latest/authorization_services/index.html).
