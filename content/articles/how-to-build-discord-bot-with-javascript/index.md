### introduction
Discord is a robust communication app used by a large community of gamers, developers, and cryptocurrency enthusiasts. Admins can add a plethora of unique Discord bots to their servers. There are also powerful APIs for creating Discord bots for those who prefer to take matters into their own hands.
With Discord.js, it is relatively simple to create a Discord bot using Javascript. In this Discord bot tutorial, we'll go over everything you need to know to get a bot up and running on the Discord server.


### Table of content
- [introduction](#introduction)
- [Table of content](#table-of-content)
- [Requirements](#requirements)
- [Add New Discord Application](#add-new-discord-application)
- [Creating Node.js project](#creating-nodejs-project)
- [Install dependencies.](#install-dependencies)
- [Building our bot](#building-our-bot)
- [Create the bot file](#create-the-bot-file)
- [Have bot reply to messages](#have-bot-reply-to-messages)
- [Summary](#summary)
- [Conclusion](#conclusion)

### Requirements
1. Wi-Fi connection
2. Discord account
3. Text editor
4. Node v17.1.0 (latest version)

### Add New Discord Application
To get started, we need to register the application and is done via Discord Developer's portal. To access this portal visit https://discord.com/developers/applications. 
 Click on the New Application button on the highest right-hand side.

   ![new application](/education-engineering/how-to-build-discord-bot-with-javascript/new.png)

   After clicking the button a dialog box will pop up which will ask you to name your bot, In my case, I will name mine 'mybot'. This is the screen that will appear:

   ![Dialog](/education-engineering/how-to-build-discord-bot-with-javascript/dialog.png)

Having named your bot, click the bot option, followed by add bot button. 
This dialog will pop up.

![Confirmation](/education-engineering/how-to-build-discord-bot-with-javascript/yes.png)

Confirm the creation of the new application and that is it, you have a bot. But I don't think you want a dummy bot, so let's add some pizzas by giving it extra permission which will improve its interactivity with users. Click the OAuth2 menu and check the boxes as shown below. Copy the link that appears in the text box.

   ![bot](/education-engineering/how-to-build-discord-bot-with-javascript/bot.png)

   ![permission](/education-engineering/how-to-build-discord-bot-with-javascript/permission.png)

 Paste your copied link to any browser of your choice. This screen should appear.

   ![paste-link](/education-engineering/how-to-build-discord-bot-with-javascript/link.png)

 select your server, hit authorize.

   ![authorize](/education-engineering/how-to-build-discord-bot-with-javascript/authorize.png)

in case you don't have a server follow this [link](https://discord.com/.) to login to your discord account and create one. 



### Creating Node.js project
Having our bot registered we need to set up our project by create a folder where you want to store your files and initialize a new node.js project.

 Navigate through this [link](https://nodejs.org/en/download/) to install node.js/update if necessary.


 ### Install dependencies.
Dependencies are packages that are required by other packages to work. The only necessary library is `discord.js`. But we will install `dotenv` to assist in managing mybot token so that our call is properly authorized,  and `nodemon` library.
Select a new terminal and type the following command that will help you initialize your project.

```
npm init -y
```

Note how the code generates npm project without going through the interactive process.
In my case, the following are the result. 

```
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

The command below will help you install discord.js and dotenv library in your workspace 

```
npm install discord.js dotenv
```

Now let's install nodemon library, write the following command.

```
npm install -D nodemon
```

Nodemon restarts the server every time we make a change to our files.

### Building our bot
There is one more thing we need to do in the Discord application developers portal before we start coding. To authorize calls from Discord.js, we must first copy our Bot's token.

![copy-token](/education-engineering/how-to-build-discord-bot-with-javascript/Token.png)

Once copied, open a new file and name it `.env`, then paste it in the following format

```
TOKEN=Paste_token_here
```

### Create the bot file
In my case, I will name my file as `bot.js` in the main project directory.

First, we will set up environment variables using the `dotenv` package, import classes from `discord.js`, and then start up a new client. This is accomplished utilizing the accompanying code:

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

To run your bot, type the following in your terminal:

```
node bot.js
```

![bot-online](/education-engineering/how-to-build-discord-bot-with-javascript/botonline.png)

As you can see above, our bot is online but it does not have any functionality.

Note we are authenticating the named variable from our .env file, which authenticates our bot with Discord API. To test our bot we have to be logged into a Discord account and have a server running.

### Have bot reply to messages
So far our bot is online but has no active functionality, The following lines of code will have our bot reply to a simple hello message.

```
client.on('message',
function (messages){
    if(messages.content.toLocaleLowerCase()==='hello') 
    messages.channel.send('hello' + ' '  + messages.author.username); //reply hello word message with senders name
})
```

Our bot will reply hello message and mention the sender.

![reply-message](/education-engineering/how-to-build-discord-bot-with-javascript/reply.png)


### Summary
In recap, we have added a new Discord application via the discord developers portal [](https://discord.com/developers/applications), in order to code our bot we have created node.js project in the same folder where we have installed dependencies and stored bot(.js) file. After that we make our bot reply to a text.

Follow this [link](https://github.com/Kamau-ke/how-to-build-discord-bot-with-javascript) to check out for the complete code.

### Conclusion
Discord platform is rapidly growing since it has opened a secure way for gamers, entrepreneurs, and cryptocurrency enthusiastic to communicate and connect with other like-minded people. Having a good bot that will assist in replying, banning, and muting members is an added advantage. 

In this article, we covered how to make the bot do a simple task and that is replying to a text. However, there is a batch of free bots which you can use if you want more added functionality to your bot.

Happy coding!










   


