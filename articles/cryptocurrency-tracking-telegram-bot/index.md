title: Building a Cryptocurrency Tracking Telegram Bot with Python

description: Telegram bots are accounts operated by software that serve as handy tools for many tasks.

# Building a Cryptocurrency Tracking Telegram Bot with Python

Telegram bots are accounts operated by software that serve as handy tools for a lot of tasks. This article will go through what Telegram bots are, how to use them, and their development process in Python. We will also build a Telegram bot to track cryptocurrencies and send regular updates on prices to understand them completely.

### Introduction

Telegram is one of the top social media platforms for messaging. Its core functionalities include:
- Sending messages to other Telegram users.
- Creating group chats.
- Calling contacts.
- Sending files and stickers.

You can learn more about Telegram here: <https://telegram.org>

Telegram bots are accounts that are operated by software and not actual people. They can do anything from teaching to playing games, acting as search engines, broadcasting messages, serving as reminders, connecting and integrating with other services, and even passing commands to Internet of Things (IoT) devices. [@GroupButler_bot](https://t.me/groupbutler_bot) is a very popular Telegram Bot for managing Telegram groups.

![](/engineering-education/cryptocurrency-tracking-telegram-bot/ngcq6rvjxrpoibsspq9g.png)

Cryptocurrencies are digital forms of currencies in which transactions are verified and records maintained by a decentralized system using cryptography rather than a centralized authority. Examples of cryptocurrency include Bitcoin (BTC), Ethereum (ETH), and Litecoin (LTC).

### Building a Cryptocurrency Tracker

Cryptocurrencies are volatile, so their prices change every second. There are also many cryptocurrencies in existence, and it can be troublesome to keep track of everyone. A cryptocurrency tracker aggregates multiple coins' prices in a single place and updates itself as their prices change.

This article will build a cryptocurrency tracker by consuming data provided by [CryptoCompare API](https://min-api.cryptocompare.com) using Python.

First, we need to install the [Requests](https://requests.readthedocs.io/en/master/) library, an elegant and simple HTTP library for Python. Requests allow us to send HTTP/1.1 requests too easily by saving us the stress of manually adding query strings to our URLs or form-encode POST data.

In the terminal, type:

```
pip install requests
```

Second, we need to write code responsible for sending requests to CryptoCompare to fetch the current prices of currencies we wish to track. CryptoCompare provides an endpoint that returns the data we require so that we will be consuming that.

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
```

This is the expected output from the code above when executed:

![](/engineering-education/cryptocurrency-tracking-telegram-bot/2en1wn0m-8gcycfjmtvs.png)

## Building a Telegram Bot

#### Step 1: Have a Conversation with BotFather

Sign In to your Telegram account, then search for `@botfather` and start a conversation with the account. PS: BotFather is also a Telegram bot.

![](/engineering-education/cryptocurrency-tracking-telegram-bot/2frh-rcjna_zv5g1epn7.png)

![](/engineering-education/cryptocurrency-tracking-telegram-bot/ru4lx8fvo0u5nnmmp5bj.png)

#### Step 2: Creating the Telegram Bot Interface with BotFather

We will now use the `/newbot` command to create a new Telegram bot. Creating a Telegram bot with BotFather means, you assign a name and username to it.

![](/engineering-education/cryptocurrency-tracking-telegram-bot/w9cqynzuungmtirs_gg6.png)

![](/engineering-education/cryptocurrency-tracking-telegram-bot/a6kvxsmfgq_slhwtwp5z.png)

After supplying the name and username for your Telegram bot, BotFather will give you the API token used to interact with the bot account via the Telegram API.

![](/engineering-education/cryptocurrency-tracking-telegram-bot/drowpxw1kqxlc2sw7ct8.png)

#### Step 3: Powering the Bot with Python

First, we will install the required Python libraries for building telegram bots. Of course, we can use the Telegram API directly following the [official docs](https://core.telegram.org/bots), but Python already simplifies this by providing libraries we can easily make use of.

In the terminal, type:

```
pip install telegram
pip install python_telegram_bot
```

Second, we need to write code that listens to new messages being sent to our bot on Telegram and sends a reply to the user. Create a file named `bot.py` and save the following code in it:

```Python
import telegram
from Telegram.ext import Updater
from Telegram.ext import CommandHandler

telegram_bot_token = "your-telegram-token"

updater = Updater(token=telegram_bot_token, use_context=True)
dispatcher = updater.dispatcher


def start(update, context):
    chat_id = update.effective_chat.id
    context.bot.send_message(chat_id=chat_id, text="Hello World")


dispatcher.add_handler(CommandHandler("start", start))
updater.start_polling()
```

In the code above, we created an `updater` and `dispatcher` for our Telegram bot using the Telegram python module. The `updater` class tracks and monitors messages sent to the bot and delivers them to the `dispatcher`, while the `dispatcher` handles and processes the received message.

Then, we created a `command handler` for our dispatcher. A `command handler` is a function called when a bot user triggers a certain command.

We then used the `send_message` method of the `context.bot` class, which takes in a `chat_id` parameter. Telegram assigns a unique identifier to every user on its platform, and it is accessible via the `chat_id` variable. Bots can use the `chat_id` to send messages to users or serve as a primary key in databases.

After setting our handlers, we initiated our `updater` to start monitoring messages sent to the bot from Telegram using the `start_polling` method of the `updater` class.

This is the expected response from our Telegram bot when the `bot.py` script is executed, and a message is sent to the bot (don’t forget to replace the placeholder with your token):

![](/engineering-education/cryptocurrency-tracking-telegram-bot/iqzwzfv5gdstworaokgj.png)

![](/engineering-education/cryptocurrency-tracking-telegram-bot/3svqucj7ez1ntgridksb.png)

### Integrating Cryptocurrency Tracking to Our Bot

Now we have a script that tracks cryptocurrency prices and a Telegram bot that responds to messages sent to it. Let us build a Telegram bot that will fetch cryptocurrency data from CryptoCompare and send it to users.

We need to update our `bot.py` file with the following code:

```Python
import telegram
from Telegram.ext import Updater
from Telegram.ext import CommandHandler
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

![](/engineering-education/cryptocurrency-tracking-telegram-bot/foniwp8tirtgmrqugcxc.png)

### Resources


- <https://core.telegram.org/bots>
- <https://python-telegram-bot.readthedocs.io/en/stable/>

### Conclusion

In this article, we learned what Telegram bots are and built our first Telegram bot. We also built a script to track cryptocurrency prices and integrated it into a Telegram bot to build a handy tool for us.

Looking to develop the Telegram bot further, improve the design or check out example code? Check out the [Github Repo](https://github.com/LordGhostX/telegram-crypto-tracker). You can also access the bot built in this article [here](https://t.me/lordghostx_cryptobot). I hope you find this tutorial on building telegram bots useful.
