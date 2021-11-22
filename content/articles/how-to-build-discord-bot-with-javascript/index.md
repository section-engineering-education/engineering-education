### introduction
Discord is a robust communication app used by a large community of gamers, developers, and cryptocurrency enthusiasts. Admins can add a plethora of unique Discord bots to their servers. There are also powerful APIs for creating Discord bots for those who prefer to take matters into their own hands.
With Discord.js, it is relatively simple to create a Discord bot using Javascript. In this Discord bot tutorial, we'll go over everything you need to know to get a bot up and running on the Discord server.

### Table of content
- [introduction](#introduction)
- [Table of content](#table-of-content)
- [Requirements](#requirements)
- [Add New Discord Application](#add-new-discord-application)
- [Create New Node.js Project](#create-new-nodejs-project)
- [Install dependencies.](#install-dependencies)
- [Building our bot](#building-our-bot)
- [Create the bot file](#create-the-bot-file)
- [Have bot reply to messages](#have-bot-reply-to-messages)
- [Summary](#summary)
- [Conclusion](#conclusion)

### Requirements
1. wifi connection
2. discord account
3. text editor
4. Node v17.1.0 (latest version)

### Add New Discord Application
visit https://discord.com/developers/applications. 
follow the following steps:
1. click on New Application.
   ![](new.png)
   After clicking the button a dialog box will pop up which will ask you to name your bot, In my case, I will name mine 'mybot'.
   ![](dialog.png)


2. Click the bot option on the left-hand side of the menu, then Add bot button.
This dialog will pop up.
![](yes.png)
Confirm the creation of the new application and let's proceed.

3. Here, we will give our bot extra permission to improve its interactivity with users. Click the OAuth2 menu and mark as shown below. Copy the link that appears in the text box.
   ![](bot.png)
   ![](permission.png)

  
4. Open a new tab and paste your link(copied in step 3).
   ![](link.png)
5. select your server, hit authorize.
   ![](authorize.png)

in case you don't have a server. Login to your discord account and create one. 
    


### Create New Node.js Project
First, we need to set up our project, do the following:
1. Create a folder where you want to store your files.
2. Initialize a new node.js project, by opening the folder in your text editor.
3. Install node.js/update if necessary.
   
 ### Install dependencies.
Dependencies are packages that are required by other packages to work. Here we will be using ``discord.js``, ``dotenv`` and ``nodemon``.

Select a new terminal and type the following.

```
npm init -y
```
The code generates npm project without going through the interactive process
In my case, the following are the result. Remove the script code.
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
```
npm install discord.js dotenv
```
discord.js will allow you to interact with Discord API.
dotenv will load variables from .env files.


```
npm install -D nodemon
```

nodemon restart the server every time we make a change to our files.

### Building our bot
First, we need to copy the bot token to allow calls in Discord.js:
It's done by clicking the copy button in the bot tab. As shown below
![](Token.png)
Once copied, open a new file and name it ``.env``, then paste it in the following format

```
TOKEN=Paste_token_here
```
### Create the bot file
In my case, I will name my file as ``bot.js`` in the main project directory.
First, we will set up environment variables using the ``dotenv`` package, import classes from ``discord.js``, and then start up a new client. This is accomplished utilizing the accompanying code:
```
require("dotenv").config(); //to start process from .env file
const {Client, Intents}=require("discord.js");
const client=new Client({
    Intents:[
        Intents.FLAGS.GUILDS,//adds server functionality
        Intents.FLAGS.GUILD_MESSAGES //gets messages from our bot.
    ]
});
client.once("ready", () =>{
    console.log("BOT IS ONLINE");
})
client.login(process.env.TOKEN);

```
To run your bot, type the following in your terminal:
```
node bot.js
```

![](botonline.png)

As you can see above, our bot is online but it does not have any functionality.


Note we are authenticating the named variable from our .env file, which authenticates our bot with Discord API. To test our bot we have to be logged into a Discord account and have a server running.

### Have bot reply to messages
So far our bot is online but has no active functionality, The following lines of code will have our bot reply to a simple hello message.

```

client.on('message',
function (messages){
    if(messages.content.toLocaleLowerCase()==='hello')
    messages.channel.send('hello' + ' '  + messages.author.username);
   
})
```
Our bot will reply hello message and mention the sender.

![](reply.png)

### Summary
Here is what we have covered:
1. Add New Discord Application
2. Create New Node.js Project
3. Install Dependencies
4. Create the bot file
5. Build our bot
6. Have bot reply to text

Below is our entire code:
```
require("dotenv").config(); //to start process from .env file
const {Client, Intents}=require("discord.js");
const client=new Client({
    Intents:[
        Intents.FLAGS.GUILDS,//adds server functionality
        Intents.FLAGS.GUILD_MESSAGES //gets messages from our bot.
    ]
});
client.once("ready", () =>{
    console.log("BOT IS ONLINE");
})
client.login(process.env.TOKEN);

client.on('message',
function (messages){
    if(messages.content.toLocaleLowerCase()==='hello')
    messages.channel.send('hello' + ' '  + messages.author.username);
   
})

```
   



### Conclusion
Discord platform is rapidly growing since it has opened a secure way for gamers, entrepreneurs, and cryptocurrency enthusiastic to communicate and connect with other like-minded people. Having a good bot that will assist in replying, banning, and muting members is an added advantage. In this article, we covered how to make the bot do a simple task and that is replying to a text, however, there is a batch of free bots which you can use if you want more added functionality to your bot.

Happy coding!










   


