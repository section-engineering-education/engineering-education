There’s a lot of buzz going on around micro frontends right now. You may be asking yourself this question, how do I try it out? Not to worry. In this tutorial, we’ll be discussing micro frontends. We'll also set up micro frontends using module federation in Solid.js. Also, we take a look at how to share a micro frontend between Solid.js and React using module federation. So, let’s jump right in!

### What are Micro-frontends?
Micro frontend originated from the concept of microservice. When we’re talking about micro frontends, think of it as a website composed of different web pages. These pages consist of features created by independent teams. Let’s look at Netflix for example. Imagine the header section of Netflix, the header video, and the carousel built by a separate team. Also, built by a different team is the video section.

These teams have their different ways of working and they build up the main Netflix website. Another way to think of micro frontend could be separate pages on the main site. These pages combined together build the website.

Micro frontends are one popular approach to increasing flexibility. It allows teams to combine components built in different frameworks or libraries. There are several ways to put in place micro frontends. We’ll be focusing on module federation in this tutorial but first, let’s look at the benefits of micro frontend and how we split our apps.

### Benefits of Micro-frontends
There are many benefits. Some of them include:
- Independent deployments.
- Independent updates and bug fixes.
- Tech stack freedom.
- Independent decoupled units.
- Application split up by business domain.

### How do we split apps?
Here are some examples of how developers split large apps:
#### By page
Sometimes, having many pages opened at the same time can crash older devices. In such cases, splitting by page is the safest option. If you have good routing, you can run separate, specific micro-apps for each page. This is also beneficial to your team's developers.

#### By functionality
If you have a single page with many features. You can divide those large features into smaller apps. This will make each one an independent application that runs that specific feature.

#### By section
You can also divide your apps into sections. This enables different apps to share the same section or components.

### What is Module Federation?
Zack Jackson created the module federation JavaScript architecture. The goal of module federation is to make code sharing easier and more independent. Module federation allows a JavaScript application to import code from another application. We can archive this by configuring Webpack. The module will generate a unique JavaScript entry file. Other applications can access this file. It gives you the freedom and flexibility to build your project the way you want.

Now that we have an understanding of what module federation is, let’s move on to create a micro frontend in Solid.js.

### Prerequisites 
To follow through this article, we need to have have yarn installed. We also need to have basic knowledge of JavaScript.
### Creating a Micro-frontend in Solid.js
First, navigate to the folder where you want your project to live and run the following command:

```bash
 npx create-mf-app
```

This will be our host app.What we want the host app to do is consume a micro frontend from a remote app. Let’s give it the name of `host`. We’ll be setting up our app with the following configurations:

```bash
 Project-type: Application
 port:8080
 Framework:solid.js
 Language:javascript
 Css:tailwind
```

Now that we’ve done that let’s `cd` into our folder:

```bash
 cd host
```

Run the yarn command:

```bash
yarn
```

**Note: If you get an error while running the yarn command, all you have to do is open your terminal and input this:**

```bash
 Set-ExecutionPolicy RemoteSigned
```

We also want to create our remote app. So, let’s open up a new terminal and rerun the command:

```bash
 npx create-mf-app
```

This time we’ll be giving it the name of `remote`. Other values would be:

```bash
Project-type: application
Port:3000
Framework:solid.js
Language:javascript
Css:tailwind
```

`Cd` into the remote directory and run yarn to get it started:

```bash
yarn
```

Let’s go back to our host app and start it up:

```bash
yarn start
```

We should see something like this:

![host_app](/engineering-education/microfrontend-using-module-federation-in-solid.js/host.PNG)

Let’s also start up our remote app:

```bash
yarn start
```

We should also see something like the host app.

![remote_app](/engineering-education/microfrontend-using-module-federation-in-solid.js/remote.PNG)

Now we have our two apps running.

### Consuming the Micro-frontend
We want to look at how the host app will consume the application of the remote app. To do this, we’ll first have to build something. Let’s create a counter app in the remote app and then configure the host app to consume it.

In our editor, let’s go to our remote directory. Inside the `src` folder, create a new file called `counter.jsx` and input this:

```javascript
import { createSignal } from "solid-js";

export default () => {
  const [count, setCount] = createSignal(0);

  return (
    <div className="h-auto w-auto p-6 mt-8 rounded-lg bg-green-200 border border-green-300">
      <div>No Of Clicks ={count()}</div>
      <button
        className="bg-indigo-800 text-white font-bold py-2 px-4 rounded"
        onClick={() => setCount(count() + 1)}
      >
        Add One
      </button>
    </div>
  );
};
```

What we did here is create a counter that adds one whenever we click the add button. Go to the `app.jsx` and import the counter.jsx we created:

```javascript
import Counter from "./Counter";
```

We'll also have to call it out. Inside our `const App()`, below our remote name, add this:

```javascript
<Counter />
```

Save it and check out the result in our browser.

![remote_result](/engineering-education/microfrontend-using-module-federation-in-solid.js/counter.PNG)

Now our counter is running but we want it in our host so how are we going to turn this into a micro frontend? That’s where Module Federation comes in. If we were to use npx, we’d have to go through a lot of processes that we do not have time for.

Back to our app. In our `webpack.config.js` of our remote app. Scroll down to `plugins` and locate `ModuleFederationPlugin`. In the exposes section add this:

```bash
"./Counter":"./src/Counter.jsx",
```

Let’s restart our app. `ctrl + c` to stop and `yarn start` to start

You might not notice this but there is a new file generated by webpack. We call this file `remoteEntry.js`. You can see it by adding /remoteEntry.js in the `localhost:3000` URL. It is a manifest of all the modules exposed from `remote`.

![remote_entry](/engineering-education/microfrontend-using-module-federation-in-solid.js/remote_entry.PNG)

Let’s copy the URL of our remote which is `localhost:3000/remoteEntry.js`. Go to our host directory. Inside of the `src/webpack.config.js`, scroll down to `plugins: ModuleFederationPlugin`. Instead of posting this inside our exposes, we’ll be pasting it inside the `remotes` section. So, inside our remote, paste this:

```bash
remote: "remote@http://localhost:3000/remoteEntry.js"
```

This remote serves as a link to our federation plugin in our remote app. The next thing we’ll do is go to our `app.jsx` in our `host/src` folder and import our counter:

```bash
import Counter from "remote/Counter";
```

Save and refresh the host app in our browser. We should see this:

![microfontend](/engineering-education/microfrontend-using-module-federation-in-solid.js/microfrontend.PNG)

Module federation allows us to share code between these two applications at runtime. This is cool.

### Can we use another framework to consume our remote app?
The answer is yes! Let’s see how we can do it. Let’s open another separate terminal and create a `new mf-app`

```bash
 npx create-mf-app
```

We’ll be using React this time. So, let’s give it a name of `react-host`. Other values would be:

```bash
Project-type: application
 Port:3001
 Framework:react
Language:javascript
Css:tailwind
```

`Cd` into the `react-host` folder and run the yarn command:

```bash
yarn
```

Navigate to the `webpack.config.js`. Scroll down to `plugins` and locate `ModuleFederationPlugin`. Inside the `remote{}` add this:

```bash
remote: "remote@http://localhost:3000/remoteEntry.js"
```

That’s not all. Our React host does not know anything about Solid.js. What we are going to do is wrap Solid.js component. So, let’s go back to our remote app folder. Inside our `src` folder create a file called `counterWrapper.jsx`. Paste this in:

```javascript
import { render } from "solid-js/web";

import Counter from "./Counter";

import "./index.scss";

export default (el) => {
  render(Counter, el);
};
```
What we did here is import our counter into the `counterWrapper`, export a default function that renders our `Counter` into the `el`.

The last thing we want to do here is go into our `webpack.config.js` and expose this module. Again, scroll down to `plugins` and locate `ModuleFederationPlugin`. Inside the `expose {}` we’ll add this too:

```bash
 "./counterWrapper":"./src/counterWrapper.jsx",
```

So, let’s stop and restart our app. No visible changes. Go back to the `react-host`. Navigate to the `app.jsx`. Delete and paste this:

```javascript
import React, { useRef, useEffect } from "react";

import ReactDOM from "react-dom";

import counterWrapper from "remote/counterWrapper";

import "./index.scss";

const App = () => {
  const divRef = useRef(null);

  useEffect(() => {
    counterWrapper(divRef.current);
  }, []);

  return (
    <div className="mt-10 text-3xl mx-auto max-w-6xl">
      <div>Name: react-host</div>

      <div ref={divRef}>Framework: react</div>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));
```
Here, we imported the `counterwrapper`, brought in `useRef` and `useEffect` from React. We also created a variable for our `divRef` which we set to `null`. We then created a function for our `useEffect` calling out the `counterWrapper` inside it and assigning the current value of `divRef` to it. This will allow our `react-host` adapt and also link up with our remote app.

Let’s start our `react-host` app:

```bash
yarn start
```

![react_host](/engineering-education/microfrontend-using-module-federation-in-solid.js/react_host.PNG)

As you can see, we have a functional Solid.js micro frontend embedded into our `react-host`. Here’s a link to the [GitHub](https://github.com/oyedeletemitope/micro-frontend-with-module-federation-in-solid.js) repository for this project.

### Conclusion
In this article, we discussed micro frontend and its benefits. We also talked about module federation. We then used it to build a micro frontend in Solid.js, embedded a Solid.js remote application into a React host app. When working on a large project with many teams, a micro frontend approach is a great option. Would you please share if this was helpful?
