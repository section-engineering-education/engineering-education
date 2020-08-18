---
layout: engineering-education
status: publish
published: true
url: /engineering-education/discord-bot-node/
title: So You Want to Make a Discord Bot (With Node.js)
description: Discord bots can do lots of things. They can manage voice chats, moderate servers, and make lots of fun. Making them is also fun. This tutorial shows you how to make your own.
author: mike-white
date: 2020-08-13T00:00:00-07:00
topics: [Node.js]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/discord-bot-node/hero.jpg
    alt: discord bot node example image
---
Discord bots are very cool. They're also very fun to make. But how do you make one?

Typically, Discord bots are written in [Node.js](https://nodejs.org/en/). Node is a JavaScript interpreter that runs on the desktop. Of course, it's possible to write a bot in [other languages](https://discordapi.com/unofficial/libs.html). For some people this may be preferable. If you have lots of users, you will need an efficient language ([unlike javascript](https://benchmarksgame-team.pages.debian.net/benchmarksgame/fastest/node-gpp.html)). We will use the JavaScript library because it is the most popular. But, many of the other libraries are somewhat similar. Once you are done reading this article, try looking at some [Rust tutorials](https://www.youtube.com/watch?v=sOA6rSRCqPw&list=PLPwSz_Jcam3xVjrTAYgIHvf1Jq94yrRXp).
<!--more-->
## Get Started By Making a Bot

### Creating The Bot
First, you need to visit the [Discord Developer Portal](https://discordapp.com/developers/applications/). Click the "New Application" button. Give your bot a name, and click "Create".

![The New Application button is in the top right corner](./discordbot1.png)

![Create](/engineering-education/discord-bot-node/discordbot2.png)

You'll get to your application's page, where if you want, you can give it a description and an avatar.

On the left, you should see a "Bot" tab. Click on that, and then click on the button that says, "Add Bot".

![The tab that says “Bot” is on the right side of the page](/engineering-education/discord-bot-node/discordbot3.png)

![The “Add Bot” button is in the top right corner](/engineering-education/discord-bot-node/discordbot4.png)

Give your new bot a name and an icon to make it stand out.

### Adding The Bot To Your Server
You'll need to use a link that looks something like this:

```
https://discord.com/oauth2/authorize?client_id=CLIENT_ID&scope=bot
```

You'll need to replace `CLIENT_ID` with the client ID of your bot, which you can find on the application page.

![The client ID is on the “General Information” tab](/engineering-education/discord-bot-node/discordbot6.png)

Once you've traveled to this page, you'll need to specify which server to add it to. It needs to be a server where you have administrative privileges. Then click "Authorize", and you'll be ready!

## Set up Your Project
You'll need to install [Node](https://nodejs.org/en/). Discord.js requires at least version 12 of Node. You can check your version by running `node -v` in a terminal or command prompt. If the version number is at least `12.0`, you're good.

![The version number should be at least 12](/engineering-education/discord-bot-node/gdiscordbot7.png)

Make a folder for your project. You can call it anything. Once you're in that folder, type `npm install discord.js`. It will take a bit of time. You might see a few warnings, but that's perfectly normal. Make sure you have administrative privileges if you’re on Windows, and use `sudo` on Linux.

![The npm install discord.js command](/engineering-education/discord-bot-node/discordbot8.png)


### Getting Your Token

The token for your bot is like a username and a password. It tells Discord which bot you want to control, and proves that you are the owner of the bot. **DO NOT GIVE AWAY YOUR DISCORD TOKEN!** I sometimes accidentally put my token on GitHub. Then I have to go through the trouble of resetting it. I'll show you how to hide it from GitHub in just a sec.

![“Click Here To Reveal Your Token”](/engineering-education/discord-bot-node/discordbot5.png)

If this project is on GitHub, you'll want to hide your token. Create a file called `token.txt`, and add it to your `.gitignore` file. You might want to put some random text in `token.txt` first, and then push to make sure it’s actually hidden. Once you’re sure you’ve done it correctly, put the token in your `token.txt` file. Now, we can start coding.

Make a file called `index.js` and open it up in your text editor of choice. There's some basic boilerplate code that you'll need to get started.

```javascript
const Discord = require("discord.js"); // imports the discord library
const fs = require("fs"); // imports the file io library

const client = new Discord.Client(); // creates a discord client
const token = fs.readFileSync("token.txt").toString(); // gets your token from the file

client.once("ready", () => { // prints "Ready!" to the console once the bot is online
	console.log("Ready!");
});

client.login(token); // starts the bot up
```

You can run this by using `node index.js`. Once you’ve done that it should look something like this:

![The word “ready” appears in the command prompt](/engineering-education/discord-bot-node/discordbot9.png)

## Creating Commands

That's cool, but we want the bot to actually do something. The most common example is [ping-pong](https://www.youtube.com/watch?v=DEqrCI1018I), but we should do something a little more interesting. Let's generate random numbers. Whenever a user types in "?random", let's make the bot reply with a random number. We just need to add some more code above the `client.login()` call.

```javascript
client.on("message", message => { // runs whenever a message is sent
    if (message.content === "?random") { // checks if the message says "?random"
        const number = Math.random(); // generates a random number
        message.channel.send(number.toString()); // sends a message to the channel with the number
    }
});
```

We did it! Albeit, in a [less than optimal way](http://www0.cs.ucl.ac.uk/staff/d.jones/GoodPracticeRNG.pdf).

We can add more commands by just adding more `if` statements. This can get messy though. Let's come up with a better command structure. We can use a Map to store strings as keys and functions as values.

```javascript
function random(message) {
    const number = Math.random(); // generates a random number
    message.channel.send(number.toString()); // sends a message to the channel with the number
}

let commands = new Map();
commands.set("random", random);

client.on("message", message => {
    if (message.content[0] === '?') {
        const command = message.content.split(" ")[0].substr(1); // gets the command name
        if (commands.has(command)) { // checks if the map contains the command
            commands.get(command)(message) // runs the command
        }
    }
});
```

![I say "?random", and the bot replies with a random number](/engineering-education/discord-bot-node/discordbot0.png)

There. Now to add more commands, you just add them to `commands`.

## Bot Ideas
Now that you know how to make a Discord bot, it would nice if you would actually make one. If you need a list of Discord Bot ideas, I've come up with a few already for [my blog](https://botahamec.github.io/posts/20_06_03_project_ideas/). Here are a few more though:

- A bot that can compile its own programming language
- Calculator Bot. If you're learning a new programming language, you could start by making this bot in that language. Try different ways of inputting the values.
- Betting Bot, where users bet on which option will receive the least bets
- Betting bot, where users bet on elections. Just mentioning it makes me really want to do this
- A bot that tracks a GitHub repository. Yes, you can already do this with webhooks, but regular bots are more fun
- A bot that tracks a YouTube channel
- A game bot. Any game will work. Sudoku, Tic-Tac-Toe, Trivia, Chess, Pokémon, Tetris (ok maybe not that last one). For an extra challenge, make an AI to play it.
- Assign points to all the members of your server. I wanted to do this for the Effective Altruism server, but I honestly couldn't figure out how to reward them. *Maybe integrate it with the betting bot...?*

Some of these are going to be more complicated, so the info that's here isn't going to be enough. You can get more information by using the [guide](https://discordjs.guide/) or by reading the [documentation](https://discord.js.org/#/docs/main/stable/general/welcome).
