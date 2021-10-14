title: Creating a Simple Chat App in React.js using the chat engine API

This tutorial teaches you the React.js way of creating a chat application using the [chat engine](https://chatengine.io) API. 
By the end, you will understand how the chat engine API works and how to use it to create a precise yet functional direct-messaging application.

### Prerequisites
- Basic knowledge in [React.js](https://reactjs.org/tutorial/tutorial.html) library.
- [Node.js](https://nodejs.org/en/download/) installed on your local development environment. 
- You should be familiar with [Node Package Manager](https://docs.npmjs.com/cli/v6/commands/npm).

### What chat engine API is?
The chat engine is an API consumed to build chat services. Approximating to other APIs that deliver user responses to the system, and sends back the system's responses to the user, this API works the same way, with better functionalities.

It allows the hosting of these chats through the REST API it lays out. The chat User Interface(UI), is created from the NPM components this tool comes with. See how the hustle is waved away for us already? 

Furthermore, thanks to its server(s), the chat can as well be hosted from here(the server).

This tool also saves you a lot of implementation time otherwise needed on many lines of code.
Chat engine API can implement; 
 - A group chat application.
 - Direct messages chat application that would work like Facebook messenger .

### Creating the Application
This minute, let's begin creating the application.
- On the terminal, `cd` to your project directory and run the following command. 

```bash
npx create-react-app project-name
```

>If you prefer using the Vite tool to create the React app, its step-by-step guide is taught in [this](https://www.section.io/engineering-education/creating-a-react-app-using-vite/) article. 

- In the created app folder, install the chat engine as a component using the command;

```bash
npm i react-chat-engine
```

#### Setting up a chat engine Project 
- You are required to have the API keys which we will get after registering(signing up or logging in) at [chatengine.io](https://chatengine.io/) for an account.
- You will be redirected to a page like below;
  ![Project Setup](/engineering-education/creating-a-simple-chat-app-in-react-the-using-chat-engine-api/NewProject.png) 
- Click the "New Project" button you see on the page and give your project a title.
  By now, your browser shows such a page.
  ![Project Keys](/engineering-education/creating-a-simple-chat-app-in-react-the-using-chat-engine-api/Keys.png) 
  Save the project ID and the secret keys somewhere safe. We will use them along the way.
- Still, on this page, click the "new user" section at the top right corner and give a name to your new  user in a modal that pops up.
  ![New User](/engineering-education/creating-a-simple-chat-app-in-react-the-using-chat-engine-api/user.png)

> You may need to create a users' list to select from, when starting a direct chat later.

As a developer, practise separating **sensitive** information like the user secret, you obtained and the project ID from the rest of the code. It prevents such information from being exposed to **unauthorized users**, hence protecting your data. 
Therefore, create a "***.env***" file at the root of your directory and have the ***user secret*** and ***project ID*** saved as environment variables.
Remember to add the **.env** file to the **.gitignore** file to avoid pushing such sensitive data to Github.

```bash
CHAT_APP_PROJECT_ID = put your ID here
CHAT_APP_USER_SECRET = your secret key goes here
```

> NOTE : **MAKE CERTAIN** you include the **SECRET** you used when creating a user, for the user secret parameter, and **NOT** the **private key** provided with the project ID.

#### Adding the ChatEngine component
In the created React app, delete every unnecessary file like ***logo.SVG, reportWebVital.js, setupTest.js, and App.test.js***. 
Remember to delete the `reportWebVital` import and its called function lines of code in the `index.js` file. 
Setting up the chat engine in our application will be done like such.

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

Properties passed to the component are;
1. **user Name** -  that you created in your project at chatengine.io.
2. **project ID** 
3. **secret key** we had secretly stored before and the userName we came up with for the new user.
My username will be 'Muganga'.

This component sets up the chat engine or in layman's terms backbone for any chat application. We may want to create either; the Group chat application or the Direct messages one. 

### Implementing the Direct Messages app
In a typical direct messaging application, a sender of messages needs to select the receiver using their contact or their username. Not any different from the chat engine implementation.
The **"getOrCreateChat"** function from the API that carries an object or "dictionary" if you are coming from a python background, is used. This object takes "usernames"(from created users) from which an existing chat may be searched for, or a new one is created.
By now, you have the User Interface of the application created in your mind I guess. This UI will constitute a field for the username, a section of usernames to ***"Get"*** or ***"Create"*** a chat with, and of course, a button to hit send when a message in the text field is typed.
Create a component file named DirectMessaging.js where we will write the required few lines of code to bring to life our application.

> NOTE: React component naming convention should apply always. 

We will use:-
- The imported ChatEngine component as implemented previously, with extra properties like width and height.
- The [**"useState"**](https://reactjs.org/docs/hooks-state.html) hook.
DirectMessaging.js file code;

```JSX
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

App.js file will show;
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

You know you are doing great if your browser renders such a page.
![New Chat](/engineering-education/creating-a-simple-chat-app-in-react-the-using-chat-engine-api/NewChat.png)

Let's make our app real-time!
![App](/engineering-education/creating-a-simple-chat-app-in-react-the-using-chat-engine-api/realapp.png)

-Search for an app title you named from when the chat engine project was set up, by clicking the labeled ***"Add Chat"*** blue button at the top-left corner.  
- The ***"people"*** dropdown at the top-right corner is where you search for existing users in your project. Select a username to initiate a chat with from the list that shows. 
![Selecting user](/engineering-education/creating-a-simple-chat-app-in-react-the-using-chat-engine-api/select.png)

- Type on the text input field and click the button labeled ***"send"*** 
![Start chat](/engineering-education/creating-a-simple-chat-app-in-react-the-using-chat-engine-api/chat.png)

You can keep texting the other user however much you please. Observe, the left section with the chat title, displays the last message you send. 
![Final App](/engineering-education/creating-a-simple-chat-app-in-react-the-using-chat-engine-api/finalapp.png)

Getting your hands dirty with code couldn't be more fun! Right?

### Wrap Up
Creating any chat application using the chat engine API seems pretty easier now don't you think? 
Without a doubt, you can at this juncture use the API to come up with your own direct messaging app and better even, a group chat application. 

Enjoy Coding!

### References
- [Chat engine API official documentation](https://chatengine.io/docs/direct_messages)
- [The github link to the application's source code](https://github.com/Neema-2016/Direct-messaging-app/tree/app/chat-app)
