---
layout: engineering-education
status: publish
published: true
url: /how-to-make-a-discord-bot-using-python/
title: How to Make a Discord Bot using Python
description: In this article, we will understand the utility of Discord bots and develop a Discord Bot from scratch using the discord.py library. 
author: harshita-bansal
date: 2021-07-27T00:00:00-15:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/how-to-make-a-discord-bot-using-python/hero.jpg
    alt: How to make a Discord Bot Using Python example image
---
We will construct a Discord Chatbot with Repl.it and Python in this tutorial. If you are reading this guide, you've undoubtedly heard of Discord and possibly already have an account. If not, then with the help of this tutorial, you will join the bot to a Discord server and reply to messages delivered by other users.
<!--more-->
**Note: This tutorial is an extract from Code with Repl.it: Python programs for beginners, a book, and series of tutorials for those who want to learn Python programming by doing it.**

If you know Python and have used Discord or a comparable service like Skype or Telegram previously, you can also tag along. We won't go through the fundamentals of Python, but we will go over each line of code in great detail, so if you've done any programming before, you should be ready to follow along.

Things we will employ in the process of learning to make Discord bot with Python:
1.	Various tools,
2.	Discord APIs 
3.	Python libraries, and 
4.	Cloud computing platform called Repl.it.

#### Table of contents
- [Introduction to Discord](#introduction-to-discord)
- [What are bots?](#what-are-bots)
- [Overview and requirements](#overview-and-requirements)
- [Creating a discord bot account on the Discord](#creating-a-discord-bot-account-on-the-discord)
  - [Creating an account](#creating-an-account)
  - [Forming an application](#forming-an-application)
  - [Forming a bot](#forming-a-bot)
  - [Forming a guild (a server)](#forming-a-guild-a-server)
- [Create a discord bot using discord.py library](#create-a-discord-bot-using-discordpy-library)
  - [Installing `discord.py`  and creating a Repl](#installing-discordpy--and-creating-a-repl)
  - [Setting up Discord event for your bot](#setting-up-discord-event-for-your-bot)
  - [How to Run the Bot](#how-to-run-the-bot)
- [Conclusion](#conclusion)

We will begin by understanding more about Discord is and why it's valuable.

### Introduction to Discord
If you're unfamiliar with Discord, it's a Voice over Internet Protocol (VoIP) and chat program that's meant to take the role of Skype for gamers and educational use. It helps users communicate better.
  
Discord is used by players, educational institutions, broadcasters, and developers to talk about games, answer queries, communicate while playing and studying, and even more. There's even a gaming store with critical reviews and streaming services. For gaming communities, it's almost a one-stop shop.

### What are bots?
Discord is becoming extremely prevalent. As a result, for a community to survive and develop, automatic procedures such as banning unsuitable members and responding to user requests are critical.

Bot users are automated programs that appear and behave like people and respond to events and orders on Discord automatically. Users of Discord bots (or just bots) have virtually limitless options.

Let's assume you're in charge of a new Discord guild and a new member joins for the first time. If you're feeling very enthusiastic, you may personally contact that individual and welcome them to your community. You may also inform them about your channels or request that they introduce themselves.

When an individual feels welcomed and likes the conversations in your guild, they are more inclined to invite their friends.

The guild's membership expands to the point that it's no longer practical to reach each new member individually. Still, you always want to send them something that will acknowledge their arrival.

It's possible to automatically respond to a new member entering your guild using a bot. You may even manage how it interacts with each new user by customizing its behavior based on circumstances.

This is fantastic, but it's only an example of how a bot may be beneficial. Once you learn how to build bots, there are several ways to get creative with them.

**Note: Even though Discord permits you to develop bots for vocal communication, this tutorial will focus on the texting side of the platform.**

When building a bot, there are two critical stages to follow:
1. Create a Discord bot user and assign it to a guild.
2. Create code that executes your bot's actions and makes use of Discord's APIs.

In the following part, you'll discover how to use Discord's Developer Portal to create a Discord bot.

###  Overview and requirements
We'll be performing all of our coding and hosting our bot using the Repl.it web IDE, so there won't be any other software to set up in your system. 

However, you'll need to establish a Discord account for this guide (you may skip this if you already have one). The following section contains instructions on how to achieve this.

We'll go through the following points in this tutorial:
- Build an application and a bot user in your Discord account.
- Creating a server on Discord. 
- Joining the Discord server with our bot.
  
Let's start with the administrative tasks, and then we'll move on to the exciting part: *programming our bot*.

### Creating a Discord bot account on the Discord
We need to create a Discord Bot account before using the Python library and the Discord API.

To begin, you'll need to build a few Discord components:
1.	An account
2.	An application
3.	A bot
4.	A guild

In the sections that precede, you'll discover much more about these components.

When you've completed each of these components, you'll need to register your bot with your guild to connect everything.

You may begin by entering [Discord's User Portal](https://discord.com/login?redirect_to=%2Fdevelopers%2Fapplications)

#### Creating an account
The initial webpage you'll see is a landing page in which you can either log in by filling in details, or with QR Code if you're using an existing account or to make a new one:

![login](/engineering-education/how-to-make-a-discord-bot-using-python/img1.png)

Click the Register beneath the login button if you need to establish a new account and fill out your account details.

**Important: You must first validate your email address before proceeding.**

When you're done, you'll be taken to the User Portal home page, where you can start building your application.

#### Forming an application
By establishing authentication tokens, defining privileges, and so forth, an application facilitates communication with Discord's APIs.

To develop a new application, proceed towards the application's page.

Select the **New Application** button.

![NewApp](/engineering-education/how-to-make-a-discord-bot-using-python/img2.png)

Assign a name to the application and then select "Create."

![createApplication](/engineering-education/how-to-make-a-discord-bot-using-python/img3.png)

Congratulations! You created a Discord account. 

You may view details about the application on the screen:

![loggedIn](/engineering-education/how-to-make-a-discord-bot-using-python/img4.png)

Remember that every software that communicates with Discord APIs, not only bots, requires a Discord application. Thus, Bot-related APIs make up a small portion of Discord's overall interface.

Navigate to the "Bot" tab on the left-hand side panel, as this section is about how to build a Discord bot.

#### Forming a bot
A bot user listens to and automatically replies to specific events and orders on Discord, as discussed in the preceding parts.

To see your code in action on Discord, you'll require to build a bot user. For that, select the "Add Bot" button.

![bot](/engineering-education/how-to-make-a-discord-bot-using-python/img5.png)

You'll notice the new bot user in the portal after you confirm by clicking "Yes, do it!".

![bot2](/engineering-education/how-to-make-a-discord-bot-using-python/img6.png)

It's important to realize that the bot user will preserve the name of your application by default. 

Now that the bot is finally ready to go, where will it be placed?

If a bot user isn't communicating with other users, it's useless. So you'll then create a guild for your bot so that it may communicate with other people.

#### Forming a guild (a server)
A guild (as it's referred to in Discord's user interface) is a collection of routes where members may communicate.

**Notes: While the terms guild and server are equivalent, we will use the term "guild" in this article because the APIs use the exact phrase. We will only use the term "server" in the graphical user interface to refer to a guild.**

Now, go to your Discord home (link) page and establish a guild:

You may see and connect with friends, direct messages, and guilds through this home page. 

To add a Server, click the "+" button from the left side panel of the web page:

![AddFriend](/engineering-education/how-to-make-a-discord-bot-using-python/img7.png)

On the upcoming screen, select "Create a server" and give the server a name. Then, you can interact with yourself or request some people to communicate with you after the server is up and running. We'll be inviting our bot to communicate with us soon. 

You'll be able to view the users on the right side and the channels on the left panel when you're done building your guild:

![screen](/engineering-education/how-to-make-a-discord-bot-using-python/img8.png)

The final stage is to register the bot with the new guild at Discord.

### Create a Discord bot using discord.py library
The bot's programming will be written in Python using the discord.py package. discord.py is a Discord API wrapper that makes creating a Discord bot in Python effortless.

#### Installing discord.py and creating a Repl
Any coding editor may be used to create the bot on your PC. However, we'll utilize Repl.it in this tutorial as it makes things easier for anybody to follow along. Repl.it is a web-based IDE.

Begin by visiting Repl.it. Make a new Repl.it and set the language to "Python."

Simply put, import Discord at the start of main.py to utilize the discord.py module. Then, when you hit the "run" button on Repl.it, it will automatically install this dependency.

On MacOS, run this command to install discord.py if you wish to develop the bot locally:

```bash
python3 -m pip install -U discord.py
```

You may have to use pip3 instead of pip.

```bash
py -3 -m pip install -U discord.py
```

#### Setting up Discord event for your bot
The structure of events is central to `discord.py`. An event is anything to which you pay attention and then respond. So, for example, when a message arrives, you will be notified via an event to which you can reply.

Let's build a bot that responds to a given phrase. This simple bot code is derived from the discord.py manual, as is the [documentation](https://discordpy.readthedocs.io/en/latest/quickstart.html#a-minimal-bot). Later on, we'll add more functionality to the bot.

This code should be added to main.py. (You may rename the file to whatever you like, don't call it discord.py since discord.py is a library we installed before, and naming the folder the same as the library may cause confusion).

```python
import discord
import os

client = discord.Client()

@client.event
async def on_ready():
    print('We have logged in as {0.user}'.format(client))

@client.event
async def on_message(message):
    if message.author == client.user:
        return

    if message.content.startswith('$hello'):
        await message.channel.send('Hello!')

client.run(os.getenv('TOKEN'))
```

You copied a token when you created your bot user on Discord. Now we'll make a `.env` file to hold the token. You don't need the `.env` file if you're executing your code locally. Substitute the token for `os.getenv('TOKEN')`.

Environment variables are declared in `.env` files. Most of the files you create on Repl.it are available to everyone, but `.env` files are exclusively visible to you. Therefore, the contents of the `.env` file will not be visible to other individuals viewing a public repl.

If you're developing on Repl.it, include only the private information in a `.env` file, such as tokens or keys.

Create a file called `.env` by clicking the "Add file" button.

Add the following line to the file, replacing your token with the one you copied earlier:

"TOKEN=[paste token here] "

Let's have a look at how each line of the code in your Discord bot.

1. The `discord.py` library is imported in the first line.
   
2. The `os` library is imported in the second line. However, it is just needed to obtain the `TOKEN` variable from the `.env` file. You don't need this line if you don't use a `.env` file.
   
3. After that, we construct a Client instance. This is the Discord connection.
   
4. To register an event, use the `@client.event()` decorator. Because this is an asynchronous library, everything is handled through callbacks. A callback is a function that is invoked when another event occurs. For example, when the bot is ready to be utilized, the `on_ready()` event is invoked in this code. The `on_message()` event is then triggered when the bot gets a message.
   
5. When a message is received, the `on_message()` event is triggered, but we don't want to do anything when the message is from us. So if the `Message.author` and `Client.user` are the same, the code returns.
   
6. Next, we look to see if the `Message.content` contains the string '$hello'. If this is the case, the bot will respond with a 'Hello!' to the channel in which it was utilized.
   
7. The bot is now configured, and the final line executes it using the login token. The token is obtained from the `.env` file.
   
Now that we have the bot's code, all we have to do is execute it.

#### How to run the Bot
To run your bot in Repl.it, click the run button at the top.

If you're writing the bot locally, you may launch it using the following instructions at the terminal:

On Windows:

```bash
py -3 main.py
```

On other systems:

```bash
python3 main.py
```

Now type "$hello" into your Discord room. 

"Hello!" should be the response from your bot.

### Conclusion
By following the tutorial above that you have learned the following:

- What Discord is, and why is it so important?
- How to use the Developer Portal to create a Discord bot.
- Discord Connections: How to Make Them.
- How to deal with the unexpected situation.
- What are the different Discord APIs, and how can I use them?
- For the reference of the code, you may refer to this [link](https://replit.com/@harshitabansal1/DISCORD-BOT#main.py).

Happy coding!

---
Peer Review Contributions by: [Lalithnarayan C](/engineering-education/authors/lalithnarayan-c/)

