---
layout: engineering-education
status: publish
published: true
url: /microfrontend-using-module-federation-in-solid-js/
title: Micro Frontends Using Module Federation In Solid.js
description: In this tutorial, we'll be discussing micro frontends. We'll also set it up using module federation in Solid.js.
author: oyedele-temitope
date: 2022-03-22T00:00:00-11:45
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/microfrontend-using-module-federation-in-solid-js/hero.png
    alt: Solid Js Micro Frontends alt
---
In this tutorial, we will be discussing micro frontends. We will also set it up using module federation in Solid.js and take a look at how to share a micro frontend between Solid.js and React.
<!--more-->
### Prerequisites
To follow through with this article, you will need:
- Yarn or npm locally installed.
- A basic knowledge of JavaScript.

### What is a micro-frontend?
It originated from the concept of microservice. When talking about a micro frontend, think of it as a website composed of different web pages.

These pages consist of features created by independent teams. Let's look at [Section](https://www.section.io), for example. Separate teams may have built the header section and the welcome page.

These teams have different ways of working, building up the main [Section](https://www.section.io) website. Another way to think of micro frontends could be separate pages on the leading site. These pages combined build the website.

Micro frontends are a popular approach to increasing flexibility. It allows teams to combine components built in different frameworks or libraries.

There are several ways to put in place micro frontends. We'll be focusing on module federation in this tutorial but first, let's look at its benefits and how we split our apps.

### Benefits of micro-frontends
There are many benefits. Some of them include:
- Independent deployments.
- Independent updates and bug fixes.
- Tech stack freedom.
- Independent decoupled units.
- Application split up by business domain.

### How do we split apps?
Here are some examples of how developers split large apps:

#### By page
Sometimes, having many pages opened simultaneously can crash devices. In such cases, splitting by page is the safest option.

You can run separate, specific micro-apps for each page if you have good routing.

#### By functionality
Suppose you have a single page with many features. Then, you can divide those prominent features into more minor apps.

This will make each one an independent application that runs a specific feature.

#### By section
You can also divide your apps into sections. This enables different apps to share the same section or components.

### What is Module Federation?
Zack Jackson created the module federation JavaScript architecture. The goal is to make code sharing more manageable and more independent.

It allows a JavaScript application to import code from another application. We can achieve this by configuring [Webpack](https://webpack.js.org).

The module will generate a unique JavaScript entry file. Other applications can access this file. It gives you the freedom and flexibility to build your project the way you want.

Now that we understand module federation let's create a micro frontend in [Solid.js](https://www.solidjs.com).

### Creating a Micro-frontend in Solid.js
First, navigate to the folder where you want your project to live and run the following command:
```bash
 npx create-mf-app
```

This will be our host app. We want the host app to consume a micro frontend from a remote app.

So let's give it the name of `host`. We'll be setting up our app with the following configurations:
```bash
 Project-type: Application
 port:8080
 Framework:solid.js
 Language:javascript
 Css:tailwind
```

Next, let's navigate into our folder:
```bash
 cd host
```

Run the yarn command:
```bash
# for yarn
yarn
# for npm
npm install
```

> Note: If you get an error while running the yarn command, open your terminal and run the command below:
```bash
 Set-ExecutionPolicy RemoteSigned
```

We also want to create our remote app. So, let's open up a new terminal and run the command:
```bash
 npx create-mf-app
```

In this tutorial, let's name it `remote`. Other options would be:
```bash
Project-type: application
Port:3000
Framework:solid.js
Language:javascript
Css:tailwind
```

Next, move into the remote directory and run yarn to get it started:
```bash
yarn
# for npm
npm install
```

Now, let's go back to our host app and start it up:

```bash
#yarn
yarn start
# npm
npm start
```

Output:

![host_app](/engineering-education/microfrontend-using-module-federation-in-solid-js/the-host.png)

Let's also start up our remote app:
```bash
# yarn
yarn start
# npm
npm start
```

Output:

![remote_app](/engineering-education/microfrontend-using-module-federation-in-solid-js/the-remote.png)

Now we have our two apps running; Let's proceed and integrate both apps.

### Consuming the micro-frontend
We want to look at how the host app will consume the remote app.

Let's create a counter app in the remote app and then configure the host app to consume it.

In your editor, go to the remote directory. Inside the `src` folder, create a new file called `counter.jsx` and add the following:
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

In the above code, we created a counter that adds one whenever we click the add button. Go to the `app.jsx` and import the `counter.jsx` we created:
```javascript
import Counter from "./Counter";
```

We'll also have to call it out. So inside our `const App()`, below our remote name, add this:
```javascript
<Counter />
```

Save it and check out the result in our browser.

![remote_result](/engineering-education/microfrontend-using-module-federation-in-solid-js/count.png)

Now our counter is running, but we want it in our host, so how will we turn this into a micro frontend?

That's where Module Federation comes in. If we were to use `npx`, we'd have to go through many processes which would take more time.

In our `webpack.config.js` of our remote app, scroll down to `plugins` and locate `ModuleFederationPlugin`.

In the `exposes` section add the following:
```bash
"./Counter":"./src/Counter.jsx",
```

Let's restart our app.  First, use `ctrl + c` to stop the app and `yarn start` or `npm start` to start it again.

You might not notice this, but a new file is generated by webpack. You can see it by adding `/remoteEntry.js` in the `localhost:3000` URL. It is a manifest of all the modules exposed from `remote`.

![remote_entry](/engineering-education/microfrontend-using-module-federation-in-solid-js/remote-entry.png)

Let's copy the URL of our remote, which is `localhost:3000/remoteEntry.js`. Next, go to our host directory.

Inside the `src/webpack.config.js`, scroll down to `plugins: ModuleFederationPlugin`.

Instead of posting this inside our exposes, we'll be pasting it inside the `remotes` section.

So, inside our remote, paste this:
```bash
remote: "remote@http://localhost:3000/remoteEntry.js"
```

This remote links to our federation plugin in our remote app. The next thing we'll do is go to our `app.jsx` inside our `host/src` folder and import our counter:
```bash
import Counter from "remote/Counter";
```

Save and refresh the host app in our browser. We should see this:

![microfontend](/engineering-education/microfrontend-using-module-federation-in-solid-js/micro-frontend.png)

Module federation allows us to share code between these two applications at runtime.

### Can we use another framework to consume our remote app?
The answer is yes! Let's see how we can do it.

Let's open another separate terminal and create a `new mf-app.`
```bash
 npx create-mf-app
```

We'll be using [React](https://reactjs.org) this time. So, let's give it the name of `react-host`. The options will be:
```bash
Project-type: application
Port:3001
Framework:react
Language:javascript
Css:tailwind
```

Select the above options depending on your preference.

Next, navigate into the `react-host` folder and run the following command:
```bash
yarn
# for npm
npm install
```

In the `webpack.config.js`, scroll down to `plugins` and locate `ModuleFederationPlugin`. Inside the `remote` object add this:
```bash
remote: "remote@http://localhost:3000/remoteEntry.js"
```

Our React host does not know anything about Solid.js. So, what we are going to do is wrap the Solid.js component.

Back in our remote app folder, inside the `src` folder create a file called `counterWrapper.jsx`.

Paste the following in the file:
```javascript
import { render } from "solid-js/web";

import Counter from "./Counter";

import "./index.scss";

export default (el) => {
  render(Counter, el);
};
```

We imported our counter into the `counterWrapper` and exported a default function that renders our `Counter` into the `el`.

Lastly, We have to expose this module to our `webpack.config.js`. Scroll down to `plugins` and locate `ModuleFederationPlugin`.

Inside the `expose {}` add the following:
```bash
 "./counterWrapper":"./src/counterWrapper.jsx",
```

When we restart our app, there are no visible changes.

Go back to the `react-host`, navigate to the `app.jsx` and replace the contents of the file with the following:

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

We imported the `counterwrapper` and brought in `useRef` and `useEffect` from React. We also created a variable for our `divRef`, which we set to `null`.

Next, We created a function for our `useEffect` calling out the `counterWrapper` inside and then assigned the current value of `divRef` to it.

This will allow our `react-host` to adapt and link up with our remote app.

Let's start our `react-host` app:
```bash
yarn start
# for npm
npm start
```

![react_host](/engineering-education/microfrontend-using-module-federation-in-solid-js/react-host.png)

As you can see, we have a functional Solid.js micro frontend embedded into our `react-host`.

Here's a link to the [GitHub](https://github.com/oyedeletemitope/micro-frontend-with-module-federation-in-solid-js) repository for this project.

### Conclusion
In this article, we discussed micro frontend and its benefits. We also talked about module federation. We then used it to build a micro frontend in Solid.js and embedded a Solid.js remote application into a React host app.

A micro front-end approach is a great option when working on a large project with many teams.

---
Peer Review Contributions by: [Miller Juma](/engineering-education/authors/miller-juma/)
