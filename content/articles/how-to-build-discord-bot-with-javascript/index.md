---
layout: engineering-education
status: publish
published: true
url: /how-to-build-discord-bot-with-javascript/
title: How to Build a Discord Bot using JavaScript
description: This tutorial will help readers understand how to build a Discord bot using JavaScript. The bot will be able to answer certain messages automatically.
author: kamau-wambui
date: 2021-12-28T00:00:00-17:33
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/how-to-build-discord-bot-with-javascript/hero.png
    alt: Build a Discord Bot using JavaScript Hero Image
---
Discord is a robust communication app used by a large community of gamers, developers, and cryptocurrency enthusiasts. 
<!--more-->
Admins can add unique Discord bots to their servers. There are also powerful APIs for creating Discord bots for those who prefer to take matters into their own hands. For instance, [Discord.js](https://discord.js.org/#/) allows us to create a simple Discord bot using Javascript. 

In this tutorial, we'll discuss how to create a Discord bot and run it on the server.

### Table of contents
- [Requirements](#requirements)
- [Add a new Discord application](#add-a-new-discord-application)
- [Creating a Node.js project](#creating-a-nodejs-project)
- [Installing dependencies.](#installing-dependencies)
- [Building a Discord bot](#building-a-discord-bot)
- [Create the bot file](#create-the-bot-file)
- [Replying to messages](#replying-to-messages)
- [Summary](#summary)
- [Conclusion](#conclusion)

### Requirements
To follow along, the reader will need:
- A Wi-Fi connection.
- A Discord account.
- A code editor such as Visual Studio Code.
- [Node v17.1.0](https://nodejs.org/en/).

### Add a new Discord application
To get started, we need to register the application via Discord Developer's portal. To access this portal, navigate to https://discord.com/developers/applications. 

Then click on the `New Application` button on the right-hand side.

![new application](/engineering-education/how-to-build-discord-bot-with-javascript/new.PNG)

After clicking the button, a dialog box will pop up which will ask you to name your bot. In my case, I will name the bot simply as 'mybot':

![Dialog](/engineering-education/how-to-build-discord-bot-with-javascript/dialog.PNG)

Next, click the `bot option`, followed by the `add bot` button. The following dialog will pop up:

![Confirmation](/engineering-education/how-to-build-discord-bot-with-javascript/yes.PNG)

Then confirm the creation of the new application and that is it; you have a bot. 

However, I don't think you want a dummy bot. Let's add some extra features by giving it several permissions which will improve its interactivity with users. 

Click the `OAuth2` menu and check the `boxes`, as shown below. Then, copy the link that appears in the text box:

![bot](/engineering-education/how-to-build-discord-bot-with-javascript/bot.PNG)

![permission](/engineering-education/how-to-build-discord-bot-with-javascript/permission.PNG)

Next, paste the link you copied earlier in any browser. You should see the following screen:

![paste-link](/engineering-education/how-to-build-discord-bot-with-javascript/link.PNG)

Select your server and then click on the `authorize` button:

![authorize](/engineering-education/how-to-build-discord-bot-with-javascript/authorize.PNG)

In case you don't have a server, follow this [link](https://discord.com/) to create one. 

### Creating a Node.js project
Since we have registered our bot, we now need to create a folder where will store our Node.js files. You can download the latest Node.js version from [here](https://nodejs.org/en/download/).

### Installing dependencies
Dependencies are packages that are required by the application to work. In our case, we only need the `discord.js` library. Nevertheless, we will install the `dotenv` package to assist in managing `mybot token`. 

This will ensure that all calls are properly authorized. We also require `nodemon` to keep the server running. Start a `new terminal` and type in the following command to initialize the project:

```bash
npm init -y
```

> Note how the above command generates an npm project without going through the interactive process.

In my case, the following are the results:

```json
{
  "name": "mybot",
  "version": "1.0.0",
  "description": "",
  "main": "bot.js",
  "scripts": {
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}
```

The command below will install `discord.js` and `dotenv` library in the project:

```bash
npm install discord.js dotenv
```

To install `nodemon` library, use the following command:

```bash
npm install -D nodemon
```

Nodemon restarts the server every time we make a change to our files.

### Building our bot
We need to authorize calls from `Discord.js` in the developers' portal. To do this, we must copy our bot's token.

![copy-token](/engineering-education/how-to-build-discord-bot-with-javascript/Token.PNG)

Once copied, open a new file and name it `.env`, then paste it in the following format.

```bash
TOKEN=Paste_token_here
```

### Create the bot file
Create a new file and name it `bot.js` in the main project directory. We will set up environment variables using the `dotenv` package, import classes from `discord.js`, and then start up a new client:

```javascript
require("dotenv").config(); //to start process from .env file
const {Client, Intents}=require("discord.js");
const client=new Client({
    Intents:[
        Intents.FLAGS.GUILDS,//adds server functionality
        Intents.FLAGS.GUILD_MESSAGES //gets messages from our bot.
    ]
});
client.once("ready", () =>{
    console.log("BOT IS ONLINE"); //message when bot is online
})
client.login(process.env.TOKEN);
```

To run the bot, type the following in your terminal:

```bash
node bot.js
```

![bot-online](/engineering-education/how-to-build-discord-bot-with-javascript/botonline.PNG)

As shown above, our bot is online but it does not have any functionality.

> Note that we are authenticating the `named variable` from our `.env` file, which is connected to the `Discord API`. To test the bot, we have to be logged into a Discord account and have a server running.

### Replying to messages
So far, our bot is online but has no active functionality. The following lines of code will have our bot reply to a simple hello message:

```js
client.on('message',
function (messages){
    if(messages.content.toLocaleLowerCase()==='hello') 
    messages.channel.send('hello' + ' '  + messages.author.username); //reply hello word message with senders name
})
```

Our bot will reply to the `hello` message and mention the `sender`.

![reply-message](/engineering-education/how-to-build-discord-bot-with-javascript/reply.PNG)

### Summary
We added a new Discord application via the [Discord developers portal](https://discord.com/developers/applications).

To develop our bot, we created a Node.js project and installed the required dependencies. We then allowed the bot to reply to certain messages from users.

You can access the complete code from [here](https://github.com/Kamau-ke/how-to-build-discord-bot-with-javascript).

### Conclusion
The Discord platform is growing rapidly. It has created a secure way for gamers, entrepreneurs, and cryptocurrency enthusiastic to communicate and connect with other like-minded people. 

Having a good bot that can reply, ban, and mute members is an added advantage.  In this article, we covered how to create a bot to reply to certain text. You can, therefore, use this knowledge to incorporate other functionalities.

Happy coding!

#### Other resources
- [Making a Discord Bot (With Node.js)](/engineering-education/discord-bot-node/)

---
Peer Review Contributions by: [Wanja Mike](/engineering-education/authors/michael-barasa/)