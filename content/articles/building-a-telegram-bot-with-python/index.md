Chatbots are software applications used to conduct online chat conversations and automate customer service via text or text-to-speech. Chatbots are used in many scenarios, ranging from menial tasks to more complex operations. Personal assistant chatbots can help in basic tasks and also serve as reminders. The most common use case of chatbots is social media platforms, as most people use them regularly.

In this tutorial, we will build a simple Telegram bot that sends automated programming quotes to a Telegram group at intervals using python.

[Telegram](https://www.telegram.org/) is a free and open-source, cross-platform, cloud-based instant messaging (IM) software. The service also provides end-to-end encrypted video calling, VoIP(voice over IP), file sharing, and several other features. 


### Prerequisites
To follow along with this tutorial, you'll need [Python3](https://www.python.org/downloads/) installed on your machine.

A little understanding of Python would help the reader to follow along better.

Telegram group.

### Table of contents
1. [Setting up bot profile](#setting-up-bot-profile)
2. [Coding the bot](#coding-the-bot)
3. [Conclusion](#conclusion)

### Setting up bot profile
To set up a new bot, we need to register our bot first before using it. That way, we get the token to access the Telegram API. If you don't have a Telegram account, go ahead and create one [here](https://www.telegram.org/).

Click on the search icon in Telegram, then, type `@botfather` in the search bar. BotFather is the official bot created by Telegram to facilitate bot creation.

![BothFather](/engineering-education/building-a-telegram-bot-with-python/bot-father.png)


Now, click on the start button to start a conversation. You should get the following interface:

![start conversation](/engineering-education/building-a-telegram-bot-with-python/start-bot-father.png)

Next, we create the bot by running /newbot command.

![create](/engineering-education/building-a-telegram-bot-with-python/create.png)

Next, we type in our preferred name and username for the bot.

![BothFather](/engineering-education/building-a-telegram-bot-with-python/botname.png)

Now, we copy our access token and save it somewhere. Remember to properly secure the access token, as it serves as your bot password.

### Coding the bot
We start by creating a new directory and navigate into it.

Next, we create a virtual environment.

A virtual environment allows you to create different spaces on your computer, with a different set of libraries and versions.

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
Next, we need to create a Telegram group and add our bot as a member.

![Add bot to group](/engineering-education/building-a-telegram-bot-with-python/add.png)

Next, we need to get the chat id, we can do this by sending this command as a message on the Telegram group:

```text
/my_id BOT_NAME
```

After that, we need to open the URL below in our browser to get our chat id:

```text
https://api.telegram.org/botBOT_TOKEN/getUpdates

BOT_TOKEN = the token we copied earlier
```
This returns a JSON response, something like a python dictionary that contains our chat id.

![json](/engineering-education/building-a-telegram-bot-with-python/json.png)

Now, we create a new python file named "bot.py" and add the following lines of code in it:

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
$ pip install requests
```

Now, let's test our bot by running our python file in the terminal:

```bash
$ python bot.py
```

![programming quotes](/engineering-education/building-a-telegram-bot-with-python/message.png)

Hurray, it works!

### Conclusion
To conclude, we have learned about building telegram bots for groups.

There is still a lot you can achieve with a telegram bot, like connecting your bot to an API and hosting on a platform like [Heroku](https://medium.com/analytics-vidhya/schedule-a-python-script-on-heroku-a978b2f91ca8) to make your bot available 24/7.

You can also check the [Telegram bot](https://core.telegram.org/bots/api) documentation for more info on creating bots.

Here are some API's you could integrate with your telegram bot

1. [Random dog images](https://random.dog)
2. [Open weather map](https://rapidapi.com/community/api/open-weather-map)
3. [Currency converter](https://rapidapi.com/natkapral/api/currency-converter5)
4. [Football](https://rapidapi.com/api-sports/api/api-football)
5. [Yahoo Finance](https://rapidapi.com/apidojo/api/yahoo-finance1)

That's all!

Happy Coding!



