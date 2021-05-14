---
layout: engineering-education
status: publish
published: true
url: /cryptocurrency-tracking-telegram-bot/
title: Building a Cryptocurrency Tracking Telegram Bot with Python
description: Telegram bots are accounts operated by software that serve as handy tools for many tasks. In this article, we will build a cryptocurrency tracking telegram bot using Python.
author: solomon-esenyi
date: 2021-02-17T00:00:00-13:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/cryptocurrency-tracking-telegram-bot/hero.jpg
    alt: Telegram Bot to track cryptocurrencies image
---
Telegram bots are accounts operated by software that serve as handy tools for many tasks. This article will go through what Telegram bots are, how to use them, and their development process in Python. We will also build a Telegram bot to track cryptocurrencies and send regular updates on prices to better understand them.
<!--more-->
### Introduction
Telegram is a trendy social media platform for messaging and privacy.

Its core functionalities include:
- Sending messages to other Telegram users.
- Calling contacts.
- Sending files and stickers.
- Creating group chats and channels.
- Cloud backup

You can learn more about Telegram [here](https://telegram.org).

Telegram bots are accounts that are operated by software.

They can do many things, including:
- Teaching users.
- Broadcasting messages.
- Playing games.
- Acting as search engines.
- Serving as reminders.
- Passing commands to Internet of Things (IoT) devices.
- Connecting and integrating with other services.

[@GroupButler_bot](https://t.me/groupbutler_bot) is a Telegram bot for managing Telegram groups.

![telegram group butler](/engineering-education/cryptocurrency-tracking-telegram-bot/ngcq6rvjxrpoibsspq9g.png)

Cryptocurrencies are digital forms of currencies that exist in the cyber world. They are peer-to-peer and built upon [blockchain technology](/history-of-blockchain/), a distributed and decentralized ledger with no central authority. Popular cryptocurrencies include Bitcoin, Ethereum, Litecoin, Doge, and Ripple.

### Building a cryptocurrency tracker
Cryptocurrencies are volatile, so their prices change every second. There are also many cryptocurrencies in existence, and it can be troublesome to keep track of every one. A cryptocurrency tracker aggregates multiple coins' prices in a single place and updates itself as their prices change.

This article will build a cryptocurrency tracker by consuming data provided by [CryptoCompare API](https://min-api.cryptocompare.com) using Python.

First, we need to install the [Requests](https://requests.readthedocs.io/en/master/) library, which extends Python programs' functionality by providing functions that allow them to make HTTP requests. Here, we will be using it to communicate with the CryptoCompare API.

In the terminal, type:

```bash
pip install requests
```

Second, we need to write the code responsible for sending requests to CryptoCompare to fetch the current prices of currencies we wish to track. CryptoCompare provides an endpoint that returns the data we require so that we will be consuming that.

Create a file named `tracker.py` and save the following code in it:

```Python
import requests


def get_prices():
    coins = ["BTC", "ETH", "XRP", "LTC", "BCH", "ADA", "DOT", "LINK", "BNB", "XLM"]

    crypto_data = requests.get(
        "https://min-api.cryptocompare.com/data/pricemultifull?fsyms={}&tsyms=USD".format(",".join(coins))).json()["RAW"]

    data = {}
    for i in crypto_data:
        data[i] = {
            "coin": i,
            "price": crypto_data[i]["USD"]["PRICE"],
            "change_day": crypto_data[i]["USD"]["CHANGEPCT24HOUR"],
            "change_hour": crypto_data[i]["USD"]["CHANGEPCTHOUR"]
        }

    return data


if __name__ == "__main__":
    print(get_prices())
```

This is the expected output from the code above when executed:

![crypto tracker output](/engineering-education/cryptocurrency-tracking-telegram-bot/2en1wn0m-8gcycfjmtvs.png)

### Building a Telegram bot
#### Step 1: Launch BotFather on Telegram
Search for `@botfather` on Telegram and launch the bot. BotFather is a bot that helps us create and manage Telegram bot interfaces.

![telegram botfather](/engineering-education/cryptocurrency-tracking-telegram-bot/2frh-rcjna_zv5g1epn7.png)

![chatting with botfather](/engineering-education/cryptocurrency-tracking-telegram-bot/ru4lx8fvo0u5nnmmp5bj.png)

#### Step 2: Create a Telegram bot interface
To create a new bot with BotFather. First, use the `/newbot` command, that will trigger BotFather to ask you for the details of the bot you want to create.

![create new bot](/engineering-education/cryptocurrency-tracking-telegram-bot/w9cqynzuungmtirs_gg6.png)

![supply bot info](/engineering-education/cryptocurrency-tracking-telegram-bot/a6kvxsmfgq_slhwtwp5z.png)

BotFather will give you the HTTP token after you have supplied the name and username for your bot. The token is used to build functionality for your bot via the Telegram API.

![get bot token](/engineering-education/cryptocurrency-tracking-telegram-bot/drowpxw1kqxlc2sw7ct8.png)

#### Step 3: Connect to the Telegram API via Python
First, we will be installing a couple of Python libraries that will allow us to easily interact with the Telegram API. You can also refer to Telegram API documentation if you want to explore the full functionality of Telegram bots [here](https://core.telegram.org/bots).

In the terminal, type:
```bash
pip install telegram
pip install python_telegram_bot
```

Second, we need to write another Python script that will connect to the Telegram API and listen to messages sent to our bot then respond to them.

Create a file named `bot.py` and save the code below in it:

```Python
import telegram
from telegram.ext import Updater
from telegram.ext import CommandHandler

telegram_bot_token = "your-telegram-token"

updater = Updater(token=telegram_bot_token, use_context=True)
dispatcher = updater.dispatcher


def start(update, context):
    chat_id = update.effective_chat.id
    context.bot.send_message(chat_id=chat_id, text="Hello World")


dispatcher.add_handler(CommandHandler("start", start))
updater.start_polling()
```

In the code above, we first used the `updater` class from the Telegram library to listen to new messages being sent to our bot and then a message handler with the `dispatcher` class.

Then, we created a `command handler` and assigned it to our dispatcher. A `command handler` is a block of code called when a bot user triggers a certain command.

Then, we used the `send_message` method provided by the Telegram library to send messages to our users when they expect a response. The method takes in a parameter called `chat_id` that is uniquely assigned to every Telegram user along with the message we want to send.

This is the expected response from our Telegram bot when the `bot.py` script is executed, and a message is sent to the bot (don’t forget to replace the placeholder with your API token):

![find our bot](/engineering-education/cryptocurrency-tracking-telegram-bot/iqzwzfv5gdstworaokgj.png)

![message our bot](/engineering-education/cryptocurrency-tracking-telegram-bot/3svqucj7ez1ntgridksb.png)

### Integrating cryptocurrency tracking to our bot
Now we have a script that tracks cryptocurrency prices and a Telegram bot that responds to messages sent to it. Let us build a Telegram bot that will fetch cryptocurrency data from CryptoCompare and send it to users.

We need to update our `bot.py` file with the following code:

```Python
import telegram
from telegram.ext import Updater
from telegram.ext import CommandHandler
from tracker import get_prices

telegram_bot_token = "your-telegram-token"

updater = Updater(token=telegram_bot_token, use_context=True)
dispatcher = updater.dispatcher


def start(update, context):
    chat_id = update.effective_chat.id
    message = ""

    crypto_data = get_prices()
    for i in crypto_data:
        coin = crypto_data[i]["coin"]
        price = crypto_data[i]["price"]
        change_day = crypto_data[i]["change_day"]
        change_hour = crypto_data[i]["change_hour"]
        message += f"Coin: {coin}\nPrice: ${price:,.2f}\nHour Change: {change_hour:.3f}%\nDay Change: {change_day:.3f}%\n\n"

    context.bot.send_message(chat_id=chat_id, text=message)


dispatcher.add_handler(CommandHandler("start", start))
updater.start_polling()
```

This is the expected response from our Telegram bot when the `bot.py` script is executed, and a message is sent to the bot:

![testing our bot](/engineering-education/cryptocurrency-tracking-telegram-bot/foniwp8tirtgmrqugcxc.png)

### Conclusion
In this article, we learned what Telegram bots are and built our first Telegram bot. We also built a script to track cryptocurrency prices and integrated it into a Telegram bot to build a handy tool for us.

Looking to develop the Telegram bot further, improve the design or check out example code? Check out the [GitHub Repo](https://github.com/LordGhostX/telegram-crypto-tracker).

You can also access the bot built in this article [here](https://t.me/lordghostx_cryptobot). I hope you find this tutorial on building telegram bots useful.

### Resources
- https://core.telegram.org/bots
- https://python-telegram-bot.readthedocs.io/en/stable/

---
Peer Review Contributions by: [Lalithnarayan C](/engineering-education/authors/lalithnarayan-c/)
