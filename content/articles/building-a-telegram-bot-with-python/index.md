Chatbots are software application used to conduct online chat conversation via text or text-to-speech. Chatbots are used in many scenarios, ranging from menial tasks to more complex operations. Personal assistant chatbot can help in basic tasks and also serve as reminders. The most common use case of chatbots are social media platforms, as most people use them on a regular basis.

In this tutorial, we will build a simple Telegram bot that sends back the message we send to it with python.

[Telegram](https://www.telegram.org/) Telegram is a cloud-based instant messaging service, that allows users to send multemedia messages and make voice and video calls.

### Prerequisites
To follow along with this tutorial, you'll need [Python3](https://www.python.org/downloads/) installed on your machine.

A little understanding of Python would help the reader to follow along better.

### Table of contents
1. [Setting up bot profile](#setting-up-bot-profile)
2. [Coding the bot](#coding-the-bot)
3. [Conclusion](#conclusion)


### Setting up bot profile
In order to set up a new bot, we need to start a conversation with "BothFather" on Telegram. If you don't have a Telegram account, go ahead and create one [here](https://www.telegram.org/).

Click on the search icon in Telegram and search for @bothfather

![BothFather](/engineering-education/building-a-telegram-bot-with-python/bot-father.png)

Now, click on the start button to start a conversation.

![start conversation](/engineering-education/building-a-telegram-bot-with-python/start-bot-father.png)

Next, we create the bot by running /newbot command.

![create](/engineering-education/building-a-telegram-bot-with-python/create.png)

Next, we type in our preffered name and username for the bot.

![BothFather](/engineering-education/building-a-telegram-bot-with-python/naming.png)

Now, we copy our access token and save it somewhere. Remember to properly secure the access token, as it gives anyone who has it access to the bot.

### Coding the bot
We start by creating a new directory, and navigate into it.

Next, we create a virtual environment.

A virtual environment allows you to create different spaces on your computer, with different set of libraries and versions.

By creating a virtual environment, you'll be able to separate the necessary library installation for a project, without having to install them globally.

Now, create a virtual environment `env` by running the command below:

```bash
$ python -m venv env
```

Here, we tell Python to create the virtual environment in a folder named `env` in the current directory.

On creation, activate the virtual environment using the following command:

```bash
$ source env/bin/activate
```

We will be making use of a package called "python-telegram-bot" to interact with Telegram Api.

Install the package using the following command:

```bash
$ pip install python-telegram-bot
```

Now, we create a new python file named "bot.py" and add the following lines of code in it:

```python
import logging

from telegram.ext import Updater, CommandHandler, MessageHandler, Filters

# Enable logging
logging.basicConfig(format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
                    level=logging.INFO)

logger = logging.getLogger(__name__)


def start(update, context):
    """Send a message when the command /start is issued."""
    update.message.reply_text("Hello! i'm a bot that repeats what ever you type")


def help(update, context):
    """Send a message when the command /help is issued."""
    update.message.reply_text('Help!')


def repeat(update, context):
    """Repeat the user message."""
    update.message.reply_text(update.message.text)


def error(update, context):
    """Log Errors caused by Updates."""
    logger.warning('Update "%s" caused error "%s"', update, context.error)


def main():
    """Start the bot."""
    updater = Updater("TOKEN", use_context=True)

    # Get the dispatcher to register handlers
    dp = updater.dispatcher

    # on different commands - answer in Telegram
    dp.add_handler(CommandHandler("start", start))
    dp.add_handler(CommandHandler("help", help))

    # on noncommand i.e message - repeat the message on Telegram
    dp.add_handler(MessageHandler(Filters.text, repeat))

    # log all errors
    dp.add_error_handler(error)

    # Start the Bot
    updater.start_polling()
    updater.idle()


if __name__ == '__main__':
    main()
```

Remember the token we copied from botfather earlier, now replace "TOKEN" with it.

Next, let's run the bot using the following command:

```bash
$ python bot.py
```

Now let's test the bot

![Testing Bot](/engineering-education/building-a-telegram-bot-with-python/start.png)

It works!

### Conclusion
To conclude, we have learned about building telegram bots.

There is still a lot you can achieve with a telegram bot, like connecting your bot to an API, and hosting on a platform like Heeroku.

That's all!

Happy Coding!
