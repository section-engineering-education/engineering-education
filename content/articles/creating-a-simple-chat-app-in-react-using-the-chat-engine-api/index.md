---
layout: engineering-education
status: publish
published: true
url: /creating-a-simple-chat-app-in-react-using-the-chat-engine-api/
title: Creating a Simple Chat App in React.js Using the Chat Engine API
description: This tutorial introduces readers to the concept of developing a realtime chat engine using React.js library.
author: neema-muganga
date: 2021-10-18T00:00:00-10:50
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/creating-a-simple-chat-app-in-react-using-the-chat-engine-api/hero.jpg
    alt: chat engine React api image
---
In this article, I will show you the easiest way possible to create a chat application using React.js. It will be done entirely without server-side code, as we will let the [chat engine](https://chatengine.io) API handle the back-end.
<!--more-->
You will understand how the chat engine API works and how to use it to create a precise yet functional direct-messaging application.

If you follow along with this tutorial, you’ll end up with your very own chat application at the end, which you can build further upon if you’d like to.

### Prerequisites
- Basic knowledge of JavaScript.
- Basic knowledge of [React.js](https://reactjs.org/tutorial/tutorial.html) library.
- [Node.js](https://nodejs.org/en/download/) installed on your local development environment.
- You should be familiar with [Node Package Manager](https://docs.npmjs.com/cli/v6/commands/npm).

### What chat engine API is?
A chat engine is an API that makes it very simple to develop chat services.

The chat engine makes it simple to develop chat services which would rather take time building from scratch.

Using services like chat engines has a greater advantage as compared to systems build from scratch since they provide an easy to use environment.

For instance, it provides an access to REST API for chat hosting.

The chat engine is so powerful that it meets all your needs when it comes to chat UI components development and storage.

### Creating the application
Not that we have basic knowledge in chat engines, let's proceed and set up our application as follows:

Run the following command on your terminal to create a chat application project.

```bash
npx create-react-app chat-application-example
```

> If you prefer using the Vite tool to create the React app, its step-by-step guide is taught in [this article](https://www.section.io/engineering-education/creating-a-react-app-using-vite/).

Upon installation, `cd` into the project root and install the chat engine as shown below:

```bash
cd chat-application-example
npm i react-chat-engine
```

#### Setting up a chat engine Project
In this section, we are setting up the chat engine application using the steps described below:
- You are required to have the API keys from your [chatengine.io](https://chatengine.io/) account.
- Register/login to your account.
- You will be redirected to a page like below:

![Project Setup](/engineering-education/creating-a-simple-chat-app-in-react-using-the-chat-engine-api/new-project.png)

- Click the `New Project` button you see on the page, and give your project a title.

By now, your browser shows such a page.

![Project Keys](/engineering-education/creating-a-simple-chat-app-in-react-using-the-chat-engine-api/keys.png)

Save the project ID and the secret keys somewhere safe. We will use them along the way.

- Still, on this page, click the "new user" section at the top right corner and give a name to your new user in a modal that pops up.

![New User](/engineering-education/creating-a-simple-chat-app-in-react-using-the-chat-engine-api/user.png)

> You may need to create a users' list to select from, when starting a direct chat later.

As a developer, practise separating **sensitive** information such as the user secret you obtained, and the project ID from the rest of the code.

It prevents such information from being exposed to **unauthorized users**, hence protecting your data.

Therefore, create a "**_.env_**" file at the root of your project and have the **_user secret_** and **_project ID_** saved as environment variables.

Remember to add the **.env** file to the **.gitignore** file to avoid pushing such sensitive data when sharing your code.

```bash
CHAT_APP_PROJECT_ID = projectIdxxxxxxxx
CHAT_APP_USER_SECRET = secretkeyxxxxxxx
```

> NOTE : Include the secret you used when creating a user for the user secret parameter, and not the private key provided with the project ID.

#### Adding the ChatEngine component
In the React app created, delete every unnecessary file such as **_logo.SVG, reportWebVital.js, setupTest.js, and App.test.js_**.

Remember to delete the `reportWebVital` import and its called function in the `index.js` file.

Setting up the chat engine in our application will be done as shown below:

```JSX
import React from 'react'
import {ChatEngine} from 'react-chat-engine';

//Using arrow function component
const App = () => {
  return (
    <ChatEngine
      userName=''//Put your userName instead
      projectID = ''// Your project id goes here
      userSecret=''// Replace with your secret key
    />
  )
}
export default App
```

Properties passed to the component are:
1. **user Name** - That you created in your project at [chat engine](chatengine.io).
2. **project ID** - This is created for every project you add on the dashboard.
3. **secret key** - We had secretly stored before and the username we came up with for the new user.

> My username will be 'Muganga' for testing purposes.

This component sets up the chat engine or in layman's terms, backbone for any chat application.

We may want to create either the Group chat application, or the Direct messages one.

### Implementing the direct messages app
In a typical direct messaging application, sender of messages needs to select the receiver using their contact or their username. Not any different from the chat engine implementation.

The `getOrCreateChat()` function from the API that carries an object or "dictionary" if you are coming from a python background, is used.

This object takes _usernames_ (from created users) from which an existing chat may be searched for, or a new one is created.

By now, you have the user interface of the application created in your mind I guess.

This UI will constitute a field for the username, a section of usernames to `get()`\* or `create()` a chat with, and of course, a button to hit send when a message in the text field is typed.

Create a component file named `DirectMessaging.js` where we will write the required few lines of code to bring to life our application.

> NOTE: React component naming convention should always apply.

We will use:
- The imported ChatEngine component as implemented previously, with extra properties like width and height.
- The [useState](https://reactjs.org/docs/hooks-state.html) hook.

```JSX
// DirectMessaging.js file code
import React, {useState} from 'react';
import {ChatEngine, getOrCreateChat} from 'react-chat-engine'

const DirectMessaging = () => {
    // The useState hook initially sets the username to an empty string
    const[username, setUsername] = useState('')
    //Custom function that will implement the getOrCreateChat function that to select username to chat with
    //only when the correct credentials(user  secret, project id, username) are passed will the application be rendered
    function implementingDirectChat(credentials){
        getOrCreateChat(
            credentials,
            // function will only work if the app is a Direct Messaging one, hence setting 'is_direct_chat' to true and consequentially setting a list of usernames to search from.
            {is_direct_chat: true, usernames:[username]},
            () => setUsername('')
        )
    }

    const displayChatInterface = (credentials) => {
        return (
            <div>
                <input
                    type="text"
                    placeholder='Find username'
                    value={username} //prop from the useState hook
                    // A controlled function that sets the username to what the user types in the input field
                    onChange = {(e) => setUsername(e.target.value)}
                />

                {/* clicking button will call the implementingDirectChat function that displays a list of usernames to create or find an existing chat.  */}
                <button onClick={() => implementingDirectChat(credentials)}>
                    Create Chat
                </button>

            </div>
        )
    }

    return(
        <ChatEngine
            height='100vh'
            userName='Muganga'
            // Accessing the stored environment variables in .env file
            userSecret={process.env.CHAT_APP_USER_SECRET}
            projectID={process.env.CHAT_APP_PROJECT_ID}
            displayNewChatInterface={(credentials) => displayChatInterface(credentials)}
            />
    )
}

export default DirectMessaging
```

> NOTE : Import the DirectMessaging.js component in the App.js component for rendering on the browser.

App.js file will show the following:

```JSX
import React from 'react'
import DirectMessaging from './DirectMessaging';
import './App.css';


const App = () => {
  return (

    <DirectMessaging/>
  )
}

export default App
```

Run:

```JSX
npm start
```

You know you are doing great if your browser renders such a page:

![New Chat](/engineering-education/creating-a-simple-chat-app-in-react-using-the-chat-engine-api/new-chat.png)

Let's make our app real-time!

![App](/engineering-education/creating-a-simple-chat-app-in-react-using-the-chat-engine-api/real-app.png)

Search for an app title you named during chat engine project setup, by clicking the labeled **_"Add Chat"_** blue button at the top-left corner.

The **_people_** dropdown at the top-right corner is where you search for existing users in your project. Select a username to initiate a chat with from the list that shows:

![Selecting user](/engineering-education/creating-a-simple-chat-app-in-react-using-the-chat-engine-api/select.png)

Type on the text input field, and click the button labeled `send`:

![Start chat](/engineering-education/creating-a-simple-chat-app-in-react-using-the-chat-engine-api/chat.png)

You can keep texting the other user as much as you please.

Observe the left section with the chat title, it displays the last message you sent.

![Final App](/engineering-education/creating-a-simple-chat-app-in-react-using-the-chat-engine-api/final-app.png)

Getting your hands dirty with code couldn't be more fun! Right?

### Wrap up
Creating any chat application using the chat engine API seems pretty easier now, don't you think?

Without a doubt, you can use the API to come up with your own direct messaging app and even better, a group chat application.

Enjoy Coding!

### References
- [Chat engine API official documentation](https://chatengine.io/docs/direct_messages)
- [The github link to the application's source code](https://github.com/Neema-2016/Direct-messaging-app/tree/app/chat-app)

---
Peer Review Contributions by: [Miller Juma](/engineering-education/authors/miller-juma/)
