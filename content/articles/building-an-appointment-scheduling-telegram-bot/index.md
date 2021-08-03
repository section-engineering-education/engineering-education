---
layout: engineering-education
status: publish
published: true
url: /building-an-appointment-scheduling-telegram-bot/
title: Building an Appointment Scheduling Telegram Bot with Python and Fauna
description: In this tutorial, you will learn how to build a telegram bot that would allow you to schedule your appointments using Python and a serverless database system called FaunaDB.
author: onojakpor-ochuko
date: 2021-04-16T00:00:00-13:00
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/building-an-appointment-scheduling-telegram-bot/hero.jpg 
    alt: Building an Appointment Scheduling Telegram Bot with Python and Fauna
---
Have you ever wanted to build a telegram bot that would allow you to schedule or plan your appointments? If your answer is yes, then this article is just what you need. 
<!--more-->
You would also use a serverless database system called FaunaDB to build our system, making your work easier. 

#### What is Fauna?
[Fauna](https://docs.fauna.com/fauna/current/) is a client-side serverless document database that uses GraphQL and the Fauna Query Language (FQL) to support various data types and relational databases in a serverless API.

#### Prerequisites
To follow along with this tutorial, you need to have:
- A good understanding of [Python](http://python.org/).
- [Faunadb](https://pypi.org/project/faunadb/), [telegram](https://pypi.org/project/telegram/) and [python_telegram_bot](https://pypi.org/project/python-telegram-bot/) installed.

#### Installing the requirements
Run the command below in your command-line interface to install the prerequisites if you haven't.

```bash
pip install faunadb telegram python_telegram_bot
```

### Setting up the Fauna database
Sign up on their website [here](https://dashboard.fauna.com/accounts/register) and create a new database with a name of your choice. This database will house the collections, documents, and other database elements relevant to this article.

![database_dashboard](/engineering-education/building-an-appointment-scheduling-telegram-bot/database_dashboard.png)

#### Setting up the Fauna collections
The two collections you will need to create are the `Users` collection and the `Appointment` collection. Visit [here](https://gist.github.com/Chukslord1/734cbaa32324eba23fa2d359b7fb33e0) for information about creating the required collections.

![create_collection](/engineering-education/building-an-appointment-scheduling-telegram-bot/create_collection.png)

#### Setting up the Fauna indexes
To easily access and scroll through data in the databse, we need to create a Fauna index. We need to create three indexes for the database, `users_index`, `appointment_index`, and `appointment_today_index`. 

Also visit [these](https://gist.github.com/Chukslord1/58430aaf25f1ce32b1d872d2b5e2547b) instructions on creating an index.

![create_index](/engineering-education/building-an-appointment-scheduling-telegram-bot/create_index.png)

![indexes](/engineering-education/building-an-appointment-scheduling-telegram-bot/indexes.png)

### Connecting Fauna to Python
#### Setting up a Fauna API key
Visit [here](https://gist.github.com/Chukslord1/17add481d7511b1b24ae33f8ef87c99b) for information on how to create and setup an API key. 

![new_key](/engineering-education/building-an-appointment-scheduling-telegram-bot/new_key.png)

![key](/engineering-education/building-an-appointment-scheduling-telegram-bot/key.png)

### Creating the Telegram Bot
To learn how to create a telegram bot visit [here](https://gist.github.com/Chukslord1/f32d8178327705ba9104e3366a2cce95).

#### Powering the bot with Python
Create a new Python file and give it any name of your choice. Now you have to import the required modules into your Python file.
```python
import telegram
from telegram.ext import Updater
from telegram.ext import CommandHandler
from telegram.ext import MessageHandler, Filters
import pytz
from datetime import datetime, date
from faunadb import query as q
from faunadb.objects import Ref
from faunadb.client import FaunaClient
```

Now let's create a dispatcher and updater for your bot.
```python
telegram_bot_token = "your-telegram-token"
client = FaunaClient(secret="your-fauna-secret-key")
updater = Updater(token=telegram_token, use_context=True)
dispatcher = updater.dispatcher
```

The dispatcher function is to handle and process the received message while the updater tracks, monitors, and reads messages sent to the bot and delivers them to the dispatcher.

Now let's start our bot using the Python code below.
```python
def start(update, context):
    chat_id = update.effective_chat.id
    first_name = update["message"]["chat"]["first_name"]
    username = update["message"]["chat"]["username"]
    
    try:
        client.query(q.get(q.match(q.index("users_index"), chat_id)))
        context.bot.send_message(chat_id=chat_id, text="Welcome to Fauna Appointment Scheduler Bot \n\n To schedule an appointment enter /add_appointment \n To list al appointment enter /list_appointments \n To list all appoint,emts you have today enter /list_today_appointments")

    except:
        user = client.query(q.create(q.collection("Users"), {
            "data": {
                "id": chat_id,
                "first_name": first_name,
                "username": username,
                "last_command": "",
                "date": datetime.now(pytz.UTC)
            }
        }))

        context.bot.send_message(chat_id=chat_id, text="Welcome to Fauna Appointment Scheduler Bot, your details have been saved 😊 \n\n To schedule an appointment enter /add_appointment \n To list al appointment enter /list_appointments \n To list all appointments you have today enter /list_today_appointments")
```

In the code above, you created a function called `start` then passed `update` and `context` as parameters. `update` is the telegram user’s data that is automatically passed from the dispatch handler. `context` is the bot instance passed from the dispatch handler. 

Then, you collected the `chat_id`, `first_name`, and `username` from the updater then made a request to the FQL (Fauna Query Language) client using the `users_index` to check if the user with the `chat_id` already exists in the database. 

If the user exists, you send a welcome message. Else,  you create a user with the information provided. Next, you need to create a dispatch handler for the `/start` command. A command in Telegram is any text that starts with `/`.

You can also add other handlers such as text handler, image handler, regex handler, and more. For this tutorial, we are starting with a command handler that initializes our bot.

Copy and paste the code below at the end of your Python file to call the dispatch handler to connect a command handler to the “start” command. 

The “start” command triggers the `start` method. The updater checks for messages from the user.
```python
dispatcher.add_handler(CommandHandler("start", start))
updater.start_polling()
```

Let's run our app by:
```bash
# python file name is app.py
python app.py
```

While your Python app is running, open your telegram app and search for the bot you created.

![search_bot](/engineering-education/building-an-appointment-scheduling-telegram-bot/search_bot.png)

Open your bot and start it by typing in the `/start` command. You will now receive a welcome message from the bot, as seen in the image below:

![start_bot](/engineering-education/building-an-appointment-scheduling-telegram-bot/start_bot.png)

#### Creating new appointments
Now we will enable your telegram bot to create new appointments in the fauna database.
```python
def add_appointment(update, context):
    chat_id = update.effective_chat.id
    user = client.query(q.get(q.match(q.index("users_index"), chat_id)))
    client.query(q.update(q.ref(q.collection("Users"), user["ref"].id()), {"data": {"last_command": "add_appointment"}}))
    context.bot.send_message(chat_id=chat_id, text="Enter the appointment event you want to add along with its due in this format(mm/dd/yyyy) date separated by a comma 😁")
```

In the `add_appointment` method, you made use of the `chat_id` to query the FQL client using the `users_index` index to check the user data that matches the `chat_id`.

Next, you updated the `last_command` field in the user's data to save the `add_appointment` command the user sent. You then sent a message requesting the user to enter the name of the appointment and its due date separated by a comma.

Now you have to create another method called `echo` that will collect the name and the due date for the new appointment, then save it to the database. 
```python
def echo(update, context):
    chat_id = update.effective_chat.id
    message = update.message.text
    user = client.query(q.get(q.match(q.index("users_index"), chat_id)))
    last_command = user["data"]["last_command"]
    
    if last_command == "add_appointment":
        events = client.query(q.create(q.collection("Appointments"), {
            "data": {
                "user_id": chat_id,
                "event": message.split(",")[0],
                "completed": False,
                "date_due": message.split(",")[1]
            }
        }))
        
        client.query(q.update(q.ref(q.collection("Users"), user["ref"].id()), {"data": {"last_command": ""}}))
        context.bot.send_message(chat_id=chat_id, text="Successfully added appointment event 👍")

```

In the `echo` method you made use of the `chat_id` to query the FQL client using the `users_index` index to check the user data that matches the `chat_id`.

Next, you checked if the `last_command` in the data retrieved is an `add_appointment` command. If it is, you query the FQL client to create an appointment using the Fauna `create` method in the `Appointments` collection with the information provided in the user’s message.

Finally, you need to create a command handler for the `add_appointment` command and a message handler for the `echo` method. The message handler filters the message and triggers the `echo` method when the user enters a message (a message is any text that does not start with `/`).

>Note: The echo method only works when the last command was an `add_appointment` command.
```python
dispatcher.add_handler(CommandHandler("add_appointment", add_appointment))
dispatcher.add_handler(MessageHandler(Filters.text, echo))
```

![add_appointment](/engineering-education/building-an-appointment-scheduling-telegram-bot/add_appointment.png)

#### Listing appointments
The following part will provide the feature of listing all the appointments saved for a user.
```python
def list_appointments(update, context):
   chat_id = update.effective_chat.id
   event_message = ""
   events = client.query(q.paginate(q.match(q.index("appointment_index"), chat_id)))
   for i in events["data"]:
       event = client.query(q.get(q.ref(q.collection("Appointments"), i.id())))
       if event["data"]["completed"]:
           event_status = "Completed"
          
       else:
           event_status = "Not Completed"
       event_message += "{}\nStatus:{} \nDate Due: {}\nUpdate Link: /update_{}\nDelete Link: /delete_{}\n\n".format(event["data"]["event"], event_status, event["data"]["date_due"], i.id(), i.id())
   if event_message == "":
       event_message = "You don't have any appointments saved, type /add_appointment to schedule one now 😇"
   context.bot.send_message(chat_id=chat_id, text=event_message)
```

In the `list_appointments` method, you saved the `chat_id` of the user and created an empty variable called `event_message`. You then made use of the `chat_id` to query the FQL client using the `appointments_index` index to check the user data that matches the `chat_id`.

Next, you looped through the data retrieved to check if the `completed` field was set to True. If this was the case, you set the `event_status` to “Completed”. Otherwise, you set it to “Not Completed”. 

You then sent a message to the user containing the `event`, `status`, update link and delete link for each appointment scheduled.

The update link is created by attaching `/update_` to the appointment’s id, while the delete link is created by attaching `/delete_` to the appointment’s id. 

If the query retrieved contains no data, this means the `event_message` is empty. Then, you sent a message to the user stating that the user has no appointments saved.

![list_appointment](/engineering-education/building-an-appointment-scheduling-telegram-bot/list_appointment.png)

```python
def list_today_appointments(update, context):
   chat_id = update.effective_chat.id
   event_message = ""
   today = date.today()
   date1=today.strftime("%m/%d/%Y")
   events = client.query(q.paginate(q.match(q.index("appointment_today_index"), chat_id, date1 )))
   for i in events["data"]:
       event = client.query(q.get(q.ref(q.collection("Appointments"), i.id())))
       if event["data"]["completed"]:
           event_status = "Completed"
          
       else:
           event_status = "Not Completed"
       event_message += "{}\nStatus:{} \nDate Due: {}\nUpdate Link: /update_{}\nDelete Link: /delete_{}\n\n".format(event["data"]["event"], event_status, event["data"]["date_due"], i.id(), i.id())
       
   if event_message == "":
       event_message = "You don't have no appointments saved, enter /add_appointment command to schedule one now 😇"
       
   context.bot.send_message(chat_id=chat_id, text=event_message)


```

The `list_today_appointments` method is like the `list_appointments` method with one striking difference, the  `appointment_today_index`. This index retrieves only data where the `date_due` field matches the current date.

Let's create a command handler for both methods.
```python
dispatcher.add_handler(CommandHandler("list_appointments", list_appointments))
dispatcher.add_handler(CommandHandler("list_today_appointments", list_today_appointments))
```

![list_today_appointment](/engineering-education/building-an-appointment-scheduling-telegram-bot/list_today_appointment.png)

#### Updating appointments
Now you will enable your bot to update appointments in the database.
```python
def update_appointment(update, context):
   chat_id = update.effective_chat.id
   message = update.message.text
   event_id = message.split("_")[1]
   event = client.query(q.get(q.ref(q.collection("Appointments"), event_id)))

   if event["data"]["completed"]:
       new_status = False

   else:
       new_status = True

   client.query(q.update(q.ref(q.collection("Appointments"), event_id), {"data": {"completed": new_status}}))
   context.bot.send_message(chat_id=chat_id, text="Successfully updated appointment status 👌")
```

In `update_appointment` method, you saved the `chat_id` of the user and the message passed, then created `event_id` by removing the `update_` prefix from the message.

You then made use of the `event_id` to query the FQL client to check for the appointment that matches the `event_id`. You then checked if the `completed` field of the appointment was set to True. 

If this is the case, you set the `new_status` variable to False. Otherwise, you set the `new_status` variable to True. 

Finally, you made a query to the FQL client to update the `completed` field to the value of the `new_status` variable using the Fauna `update` method. You then sent a successful update message to the user.

You set the `update_appointment` method to get triggered by a message handler that uses the regex filter to detect the update method’s regex code. You then split the message to extract the appointment id. Copy and paste the code below to create the message handler.

```python
dispatcher.add_handler(MessageHandler(Filters.regex("/update_[0-9]*"), update_appointment))

```

![update_appointment](/engineering-education/building-an-appointment-scheduling-telegram-bot/update_appointment.png)

#### Deleting appointments
Now you will enable your bot to delete appointments from the database.
```python
def delete_appointment(update, context):
   chat_id = update.effective_chat.id
   message = update.message.text
   event_id = message.split("_")[1]
   client.query(q.delete(q.ref(q.collection("Appointments"), event_id)))
   context.bot.send_message(chat_id=chat_id, text="Successfully deleted appointment👌")
```

The `delete_appointment` method is like the `update_appointment` method. However, the difference is that after retrieving the appointment by querying the `Appointments` collection, you used the Fauna `delete` method to delete the data from the database. Subsequently, you sent a message to alert the user of a successful appointment deletion.

You set the `delete_appointment` method to get triggered by a message handler that uses the regex filter to detect the delete method’s regex code. You then split the message to extract the appointment id. Copy and paste the code below to create the message handler.

```python
dispatcher.add_handler(MessageHandler(Filters.regex("/delete_[0-9]*"), update_appointment))
```

![delete_appointment](/engineering-education/building-an-appointment-scheduling-telegram-bot/delete_appointment.png)

### Conclusion
In this article, we built an appointment scheduling telegram bot with [Fauna's serverless database](https://fauna.com/). We saw how easy it is to use Fauna as the database in our python application.

The source code of our bot is available on [Github](https://github.com/Chukslord1/FAUNA_APPOINTMENT_SCHEDULER_BOT).

Happy coding!

---
Peer Review Contributions by: [Ahmad Mardeni](/engineering-education/authors/ahmad-mardeni/)
