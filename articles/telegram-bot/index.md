---
layout: engineering-education
status: publish
published: true
slug: telegram-bot
title:  Python-Build a Reddit Autoposter Telegram Bot
description: How to create a Telegram bot - an approach of creating a Python autoposter Telegram Bot that autoposts from a subreddit.
author: saiharsha-balasubramaniam
date: 2020-07-06T00:00:00-12:00
topics: [languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/telegram-bot/hero.jpg
    alt: image telegram bot

---

Telegram is one of the best modern cross-platform apps that we all use extensively for messaging. It's extremely fast, secure, cloud-based, and works seamlessly across all devices. Seems perfect, doesn't it? The possibilities don't end there! **The entire code is open-sourced** and you can build your own version of telegram!

Telegram is also extremely developer-friendly. They offer APIs that are totally free. Their developer offerings can be classified into two types:
<!--more-->

- Bot APIs - Create powerful bots that run on Telegram.
- Telegram APIs and TDLib - Build your own customized Telegram clients.

Let us take a look at the Telegram Bot API and dive into building a powerful bot that can auto-post from a subreddit.

**All the Code for the following tutorial has been displayed in my GitHub Repository. You could use it as a reference, or star it. Fork it and submit a PR! Link to the repository would be displayed at the end of the tutorial**

### Table of Contents

- [Motivation](#motivation)
- [Get the Bot API Credentials](#get-the-bot-api-credentials)
- [Create a Telegram Channel](#create-a-telegram-channel)
- [Get Reddit Credentials](#get-reddit-credentials)
- [Let's Code!](#let's-code!)
- [Deploy to Heroku](#deploy-to-heroku)
- [References](#references)

### Motivation

We all love dogs, don't we? 😄

I love scrolling through dog photos on Reddit, and there was one point in time where I felt that I spend too much time in Reddit. So I had an idea. Like a true programmer, I decided to create a bot in Python that would automatically post new posts from Subreddits to a Telegram Channel. This way, I got better at Python and also I save time every day!

In the below example, we would be auto-posting from the [r/dogpictures](https://www.reddit.com/r/dogpictures/) subreddit.

### Get the Bot API Credentials

Our second step would be to create a new bot on Telegram and get API keys for the bot. Bot Management is done by a bot on Telegram called BotFather.

Now, click on this [link](https://t.me/botfather) and open up BotFather.

![Create a New Bot](/engineering-education/telegram-bot/newbot.png)

Create a new bot by entering the command, ```\newbot```

![Bot Username](/engineering-education/telegram-bot/botusername.png)

Enter a display name for the bot and hit enter. Now choose a username for the bot.

![Bot Success](/engineering-education/telegram-bot/botsuccess.png)

There! You have successfully created the bot! The API Token and the bot link are given. Store it securely as we'd need it soon.

### Create a Telegram Channel

Creating a channel on Telegram is quite simple.
- Click on the Hamburger Menu on the left and click on `New Channel`.
- Give a channel name of your choice.
- Add the bot that you created into the channel with administrative permissions.

### Get Reddit Credentials

To access posts from Reddit, we'll be using the **Reddit API** and the python library PRAW: **The Python Reddit API Wrapper**.

- The foremost step would be to get the credentials.
- Create a new Reddit account.
- Go to [App Preferences](https://www.reddit.com/prefs/apps/), and click on `create app`.

![Reddit Credentials](/engineering-education/telegram-bot/redditcreds.png)

- Give the desired app **name**, and select the sub-option `script` from the radio buttons.
- Enter a short **description**.
- Leave the **About URI** blank and enter `http://localhost:8080` in the **Redirect URI** field.
- Create the App.
- You would be provided with a Client ID and a Client Secret. Store them securely.

### Let's Code!

#### Required Imports

```
from __future__ import unicode_literals

import telegram
import praw
import logging
import html
import sys
import os
import json

from time import sleep
from datetime import datetime
```

Now that we have imported the necessary libraries, let us set the credentials and error loggers.

#### Credentials

```
credentials = {}

credentials["token"] = os.environ.get('TOKEN')
credentials["subreddit"] = os.environ.get('SUB')
credentials["channel"] = os.environ.get('CHANNEL')

token = credentials["token"]
channel = credentials["channel"]
sub = "dogpictures"
start_time = datetime.utcnow().timestamp()
```

Here, we are using the concept of environment variables to hide our sensitive information. When we open source our project and post it on code repositories like **GitHub**, it would be easier to manage the credentials.

We'll look at how to set the environment variables before deploying the Python Script.

#### Exceptions and Logs

```
ch = logging.StreamHandler(sys.stdout)
ch.setLevel(logging.DEBUG)
formatter = logging.Formatter('%(asctime)s - %(levelname)s - %(message)s')
ch.setFormatter(formatter)
log.addHandler(ch)

if credentials["token"] == "":
    raise RuntimeError('Bot token not found 🙁! Put bot token🔐 in credentials.json!')
if credentials["subreddit"] == "":
    raise RuntimeError('Subreddit name not found 🙁! Enter the subreddit name📃 in credentials.json!')
if credentials["channel"] == "":
    raise RuntimeError('Telegram Channel name not found 🙁! Enter the channel name📰 in credentials.json!')
```

The above code is used to raise exceptions when any of the environment variables are missing and also log the records. This makes it easier to debug the code.

#### Track Submissions

```
def prev_submissions():
    try:
        with open('prev_submissions.id', 'r') as f:
            return f.read().strip()
    except:
        return None

def write_submissions(sub_id):
    try:
        with open('prev_submissions.id', 'w') as f:
            f.write(sub_id)
    except:
        log.expection("Error writing sub ID!")
```
Here, we write two functions. The `prev_submissions()` function reads the **prev_submissions.id**, which is a file that specifies the previous posts that the bot has already posted to the telegram channel, so as to avoid duplicates.

`write_submissions()` writes the posts that are sent to the channel into the file.

#### Setting Variables and Initializing PRAW and the Bot API

```
post = False
last_sub_id = prev_submissions()

if not last_sub_id:
    log.info("Latest submission not found, starting all submissions!")
    post = True
else:
    log.info("Last posted submission is {}".format(last_sub_id))

r = praw.Reddit(user_agent="Dank Doggo by Harsha :D",
                client_id=os.environ.get('CLIENT_ID'),
                client_secret=os.environ.get('CLIENT_SECRET'),
                username=os.environ.get('RUSERNAME'),
                password=os.environ.get('RPASS'))
r.read_only = True
subreddit = r.subreddit(sub)

bot = telegram.Bot(token=token)
```

Here, the conditional statement set by the condition, `if not last_sub_id` starts posting to the channel if there are new posts on the subreddit.

We initialize the Reddit instance by passing in the `CLIENT_ID, CLIENT_SECRET`, Reddit Username, and Reddit Password as parameters.

The Bot is also initialized by passing in the Bot API Token.

#### Main Control Block

```
while True:
    try:
        for submission in subreddit.hot():
            try:
                link = "https://redd.it/{id}".format(id=submission.id)
                if not post and submission.created_utc < start_time:
                    log.info("Skipping {} --- latest submission not found!".format(submission.id))
                    if submission.id == last_sub_id:
                        post = True
                    continue
                image = html.escape(submission.url or '')
                title = html.escape(submission.title or '')
                user = html.escape(submission.author.name or '')

                template = "{title}\n{link}\nby {user}"
                message = template.format(title=title, link=link, user=user)

                log.info("Posting {}".format(link))
                bot.sendPhoto(chat_id=channel, photo=submission.url, caption=message)
                # bot.sendMessage(chat_id=channel, parse_mode=telegram.ParseMode.HTML, text=message)
                write_submissions(submission.id)
                sleep(600)
            except Exception as e:
                log.exception("Error parsing {}".format(link))
    except Exception as e:
        log.exception("Error fetching new submissions, restarting in 10 secs")
        sleep(10)
```

Here, the `subreddit.hot()` returns all the Hot Posts in the Subreddit. If the script finds a new post that has not been written to **prev_submissions.id** file (not yet been posted to the channel), it formats the message by using markup. Finally, it sends out the message by the use of the ```bot.sendPhoto()``` API call, which takes in the channel name, photo URL and the caption as parameters.

We have also set the bot to send only one message once every 10 minutes, so that it does not spam. This is achieved by pausing the script for 600 seconds using the `sleep()` function.

### Deploying to Heroku

Now, we have successfully written the code for our autoposter bot!

Let us deploy it on Heroku so that it runs 24x7!

- First, upload all the code to a GitHub Repository. Link to a sample repository is given at the end of this article.
- Go to [Heroku Dashboard](https://dashboard.heroku.com/) and create a new account.
- Create a new heroku app.

![Heroku Dash](/engineering-education/telegram-bot/herokudash.png)

- Go to the **Deploy** Tab, and select **GitHub** as the deployment method.
- Now search for your GitHub Repository and enable **auto deploy**.
- Auto Deploy starts deploying your script as soon as it detects an update in your GitHub.
- Now you would have to add the environment varibles.
- Select the **Settings** Tab and click on the **Reveal Config Vars** Option.
- Here, you would need to add the following config variables.
    - CHANNEL: "@your-telegram-channel-name"
    - CLIENT_ID: "your-reddit-clientid"
    - CLIENT_SECRET: "your-reddit-client-secret"
    - RPASSWORD: "your-reddit-password"
    - RUSERNAME: "your-reddit-username"
    - SUB: "subreddit-name"
    - TOKEN: "your-telegram-bot-api-token"
- Once you save, the bot would automatically be deployed!
- It would keep sending new posts every 10 minutes!

### References

Writing Python Scripts and Bots are an amazing way to improve your programming skills! Take a look at the following documentation to get a deeper understanding of the code.

- [Reference GitHub Repo](https://github.com/cybershaw/dank-doggo)
- [PRAW Docs](https://praw.readthedocs.io/en/latest/#)
- [Telegram Python API Docs](https://python-telegram-bot.readthedocs.io/en/stable/)
- [Python Docs](https://docs.python.org/3/)
