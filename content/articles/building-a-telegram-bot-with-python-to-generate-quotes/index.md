---
layout: engineering-education
status: publish
published: true
url: /building-a-telegram-bot-with-python-to-generate-quotes/
title: Building a Telegram Bot using Python to Generate Random Quotes
description: This article will be an introduction to building Telegram bots using Python. Here, we will learn to fetch random quotes from an API, and display them as and when the user requests.
author: shuaib-oseni
date: 2021-07-11T00:00:00-09:00
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/building-a-telegram-bot-with-python-to-generate-quotes/hero.png
    alt: Telegran Bot image
---
Chatbots are software applications used to conduct online chat conversations and automate customer service via text or text-to-speech. [Chatbots](https://en.wikipedia.org/wiki/Chatbot) can be utilized for things like reminders, booking of appointments, and also on social media platforms.
<!--more-->
In this tutorial, we will build a simple Telegram bot that sends automated programming quotes to a Telegram group at intervals using Python.

[Telegram](https://www.telegram.org/) is a [free and open-source](https://en.wikipedia.org/wiki/Telegram_(software)), cross-platform, cloud-based instant messaging (IM) software. It provides video calling and file-sharing amongst other features.

### Prerequisites
To follow along with this tutorial, you'll need [Python 3](https://www.python.org/downloads/) installed on your machine and, a little understanding of Python would help the reader to follow along better.

### Table of contents
1. [Setting up bot profile](#setting-up-bot-profile)
2. [Coding the bot](#coding-the-bot)
3. [Conclusion](#conclusion)

### Setting up bot profile
To set up a new bot, we need to register our bot first before using it. That way, we get the token to access the Telegram API. If you don't have a Telegram account, go ahead and create one [here](https://www.telegram.org/).

Click on the search icon in Telegram, then, type `@botfather` in the search bar.

BotFather is the official bot created by Telegram to facilitate bot creation.

![BotFather](/engineering-education/building-a-telegram-bot-with-python-to-generate-quotes/bot-father.png)
*Creating Bot father in Telegram*

Now, click on the start button to start a conversation. You should get the following interface:

![start conversation](/engineering-education/building-a-telegram-bot-with-python-to-generate-quotes/start-bot-father.png)
*Starting conversation with Bot father*

Type `/start` to get started.

Next, we create the bot by running `/newbot` command.

![create](/engineering-education/building-a-telegram-bot-with-python-to-generate-quotes/create.png)
*Create new bot*

Next, we type in our preferred name and username for the bot.

![BothFather](/engineering-education/building-a-telegram-bot-with-python-to-generate-quotes/botname.png)
*Choosing bot name*

Now, we copy our access token and save it somewhere. Remember to properly secure the access token, as it serves as your bot password.

### Coding the bot
We start by creating a new directory and navigate into it.

Next, we create a virtual environment.

A [virtual environment](https://en.wikipedia.org/wiki/Virtual_environment) allows you to create different spaces on your computer, with a different set of libraries and versions.

By creating a virtual environment, you'll be able to separate the necessary library installation for a project, without having to install them globally.

Now, create a virtual environment `env` by running the command below:

```bash
python -m venv env
```

On creation, activate the virtual environment using the following command:

```bash
source env/bin/activate
```

Next, we need to create a Telegram group and add our bot as a member.

![Add bot to group](/engineering-education/building-a-telegram-bot-with-python-to-generate-quotes/add.png)
*Add members to Bot*

Next, we need to get the Chat ID, we can do this by sending this command as a message on the Telegram group:

```text
/my_id BOT_NAME
```

After that, we need to open the URL below in our browser to get our chat id:

```text
https://api.telegram.org/botBOT_TOKEN/getUpdates

BOT_TOKEN = the token we copied earlier
```

This returns a JSON response, something like a python dictionary that contains our chat id.

![json](/engineering-education/building-a-telegram-bot-with-python-to-generate-quotes/json.png)
*JSON containing Chat ID*

Now, we create a new python file named `bot.py` and add the following lines of code in it:

```python
import requests
import time

# list of quotes
quotes = [
    'First, solve the problem. Then, write the code. – John Johnson',
    'Experience is the name everyone gives to their mistakes. – Oscar Wilde',
    'Code is like humor. When you have to explain it, it’s bad. – Cory House',
    'Before software can be reusable it first has to be usable. – Ralph Johnson',
    'Optimism is an occupational hazard of programming: feedback is the treatment. - Kent Beck'
]

# loop through the quotes
for quote in quotes:
    url = 'https://api.telegram.org/bot1848805395:AAHaacRzz3vDJ8vrQqVZ4vMPTqY1OBOQ12Q/sendMessage?chat_id=CHAT_ID&text="{}"'.format(quote)
    requests.get(url)
    # sends new quotes every 20seconds
    time.sleep(20)
```

Before testing the bot, we need to install the requests module using the following code:

```bash
pip install requests
```

Now, let's test our bot by running our Python file in the terminal:

```bash
python bot.py
```

![programming quotes](/engineering-education/building-a-telegram-bot-with-python-to-generate-quotes/message.png)
*Printing a quote every 20 seconds*

Hurray, it works!

Let's make our bot more interesting by connecting to an API that feeds us with random programming quotes.

We'll be using [this](http://quotes.stormconsultancy.co.uk) API, and the `/random` endpoint to get random quotes.

Next, we need to add the following lines of code at the top of our file

```python
from telegram.ext import Updater, CommandHandler, MessageHandler, Filters
import json
```

Now, let's create a function that sends random quotes, by adding the following lines of code:

```python
telegram_bot_token = "TOKEN"

updater = Updater(token=telegram_bot_token, use_context=True)
dispatcher = updater.dispatcher

def random(update, context):
    # fetch data from the api
    response = requests.get('http://quotes.stormconsultancy.co.uk/random.json')
    data = response.json()
    # send message
    context.bot.send_message(chat_id=update.effective_chat.id, text=data['quote']) 

# linking the /random command with the function random() 
quotes_handler = CommandHandler('random', random)
dispatcher.add_handler(quotes_handler)
```

Now, let's run the file and enter `/random` in our Telegram group. Our bot should respond with a random quote.

![random quotes](/engineering-education/building-a-telegram-bot-with-python-to-generate-quotes/random.png)
*Bot fetching random quote using an API*

### Conclusion
To conclude, we have learned about building Telegram bots for groups.

There is still a lot you can achieve with a Telegram bot, like connecting your bot to other APIs and hosting them on a platform like [Heroku](https://medium.com/analytics-vidhya/schedule-a-python-script-on-heroku-a978b2f91ca8) to make your bot available 24/7.

You can also check the [Telegram bot](https://core.telegram.org/bots/api) documentation for more info on creating bots.

Here are some API's you could integrate with your Telegram bot:

1. [Random dog images](https://random.dog)
2. [Open weather map](https://rapidapi.com/community/api/open-weather-map)
3. [Currency converter](https://rapidapi.com/natkapral/api/currency-converter5)
4. [Football](https://rapidapi.com/api-sports/api/api-football)
5. [Yahoo Finance](https://rapidapi.com/apidojo/api/yahoo-finance1)

Happy Coding!

---
Peer Review Contributions by: [Srishilesh P S](/engineering-education/authors/srishilesh-p-s/)