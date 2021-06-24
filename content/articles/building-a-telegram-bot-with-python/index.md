Chatbots are software application used to conduct online chat conversation via text or text-to-speech. Chatbots are used in many scenarios, ranging from menial tasks to more complex operations. Personal assistant chatbot can help in basic tasks and also serve as reminders. The most common use case of chatbots are social media platforms, as most people use them on a regular basis.

In this tutorial, we will build a simple Telegram bot that sends back the message we send to it with python.

[Telegram](https://www.telegram.org/) Telegram is a cloud-based instant messaging service, that allows users to send multemedia messages and make voice and video calls.

### Prerequisites
To follow along with this tutorial, you'll need [Python3](https://www.python.org/downloads/) installed on your machine.

A little understanding of Python would help the reader to follow along better.

### Table of contents
1. [Setting up bot profile](#setting-up-bot-profile)
2. [Coding the bot](#coding-the-bot)


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

Next, we create a virtual environment

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

### Deploying the bot

At this point, the bot only works on our computer. If we want other people to make use of our bot, we need to move it to the internet.

We'll be deploying our bot to [PythonAnywhere platform](https://pythonanywhere.com).

[PythonAnywhere](https://pythonanywhere.com) is an online hosting platform built using python. It provides bash and python consoles that can be accessed directly from your we browser.

In order to deploy our bot, we need a requirements.txt file that contains all that contains all the python dependencies that it uses.

```text
APScheduler==3.6.3
cachetools==4.2.2
certifi==2021.5.30
python-telegram-bot==13.6
pytz==2021.1
six==1.16.0
tornado==6.1
tzlocal==2.1
```
Next, we need to create an account on [PythonAnywhere](https://pythonanywhere.com). A free account is fine for this tutorial.

Now, we need to create a bash console. On the dashboard, under "Consoles" section, click on the "$bash button" to open a bash session

![Dashboard](/engineering-education/building-a-telegram-bot-with-python/dashboard.png)

This will spin up a bash shell on your browser

![Bash](/engineering-education/building-a-telegram-bot-with-python/terminal.png)

Next, we have to copy our files to this platform. The bash console provides access to two text editors `nano` and `vi`. For the sake of this tutorial we'll be making use of `nano`

Now, we are going to copy and paste the content of "bot.py" file and "requirements.txt" file, but first we need to create another bot.py from the PythonAnywhere bash console using the following command:

```bash
$ nano bot.py
```
Now copy the content in our former "bot.py" and paste in the text editor. to exit the text editor, press `ctrl+x` and answer "Yes" when asked if you want to save the changes.

Now let's repeat the same process with the requirements.txt file:

```bash
$ nano requirements.txt
```

Now that we are done creating the files, we need to create and activate a virtual environment using the following command:

```bash
$ python -m venv venv
$ source env/bin/activate
```

The bash prompt should now have a (venv) prefix, which indicates that the virtual environment is activated. The next step is for us to install the Python dependencies referenced in the requirements.txt file using the following command:

```bash
$ pip install -r requirements.txt
```

With the application files and Python configuration in place, we need to tell PythonAnywhere to allocate a web application. Click on the menu in the top-right corner of your bash console window and select “Dashboard”.

From the Dashboard, select “Web” in the navigation bar and click on “Add a new web app”.

We will now enter a step-by-step guided configuration tool. In the first step, you will be given the public URL under which your web application will be hosted. If we have a paid PythonAnywhere account, we can select a custom domain name, but on free accounts the domain is going to have the format <your-username>.pythonanywhere.com.

Click the “Next” button to continue to the next step.

![Dashboard](/engineering-education/building-a-telegram-bot-with-python/domain.png)

Next, we'll be prompted to select a python web framework. We'll be using the "manual configuration" option