Have you ever wanted to build a telegram bot that would allow you to schedule or plan your appointments? If your answer is yes, then this article is just what you need. You would also be utilizing a serverless database system called FaunaDB to build our system which will make your work easier. Now that you know what this article entails, let's get to the building part.

Not so many people know about Fauna and how amazing it can be when managing databases. Therefore, I will be doing a little introduction to the Fauna serverless database system.

### What is Fauna?

Fauna is a client-side serverless document database that uses GraphQL and the Fauna Query Language (FQL) to support various data types and relational databases in a serverless API. You can learn more about Fauna in their official documentation [here](https://docs.fauna.com/fauna/current/).

### Creating A Fauna Database

To make use of Fauna, you have to signup on their website [here](https://dashboard.fauna.com/accounts/register). After signing up, you can create a new database by clicking on the `CREATE DATABASE` button on your dashboard. Provide a name for your database and save it.

![database_dashboard](/engineering-education/building-an-appointment-scheduling-telegram-bot/database_dashboard.png)

#### Creating the Fauna Collections

For this article, you will need to create two collections in your database. A collection is similar to tables in your conventional database system. The first collection you need to create is the `Users` collection. This is where you will save all the user’s information. The second collection you need to create is the `Appointments` collection. This is where you will create all the user’s appointments. 

To create a collection, click on `CREATE COLLECTION` then provide information for the required fields. You will be required to enter the name of the collection, the `History Days` and `TTL`. The `History Days` field refers to the number of days you want Fauna to retain a historical record of any data in that collection. The `TTL` refers to an expiry date for data in the collection. For example, if the `TTL` is 3, Fauna will automatically delete any data stored in the database three (3) days after the last date you modified it.

![create_collection](/engineering-education/building-an-appointment-scheduling-telegram-bot/create_collection.png)

After saving the collections you just created, you will notice there are no documents in your collections. A document is similar to rows of data in a table as in your conventional database system.

#### Creating a Fauna Index

You will need to create a Fauna index that will allow you to scroll through the data created in your database. To do this, go to the `DB Overview` tab on the left side of your screen, then click on the `New Index` button.

For this article, you will be creating three indexes; `users_index`, `appointment_index`, and `appointment_today_index`. The `users_index` index will enable you to scroll through data in the `Users` collection using the `id` field as a parameter to match. The `appointment_index` index will enable you to scroll through data in the `Appointments` collection using the `user_id` field as a parameter to match. The `appointment_today_index` index will allow you to scroll through data in the `Appointments` collection. It will use the `user_id` and `date_due` fields as parameters to match.

![create_index](/engineering-education/building-an-appointment-scheduling-telegram-bot/create_index.png)

After clicking on the `New Index` button, the system will display the screen above to you. You need to select the collection you want to connect to this particular index. After choosing the collection, enter a name for your index, terms for your index, and values. Ticking the `Unique` checkbox ensures the data entered for the term is unique. The terms field specifies what data you want the index to be able to browse.

For the `users_index`, we will use the `id` field as the terms. Also make sure you tick the unique checkbox so the data entered is unique. 
For the `apppointment_index`, we will use the `user_id` field as the terms. For the `appointment_today_index` we will use the `user_id` and `date_due` fields as the terms. After filling in the required fields, click on save and continue.

![indexes](/engineering-education/building-an-appointment-scheduling-telegram-bot/indexes.png)

### Integrating Fauna with Python

#### Creating a Fauna API Key

For your python app to interact with fauna, you need to create an API key for the database. To do this, go to the security tab on the left side of your screen.

![new_key](/engineering-education/building-an-appointment-scheduling-telegram-bot/new_key.png)

Click on `New Key` to generate a secret key. To create the key, you will need to provide a name for your key and save it. Your secret key will now be displayed to you, as seen in the image below. Copy and paste it somewhere you can easily retrieve it.

![key](/engineering-education/building-an-appointment-scheduling-telegram-bot/key.png)

#### Prerequisites

From this point onwards, to follow this step by step guide on building an appointment scheduling telegram bot with fauna, you need to have the following installed:


* [Python 3.7 or >3.7](http://python.org/)
* [Faunadb](https://pypi.org/project/faunadb/)
* [telegram](https://pypi.org/project/telegram/)
* [python_telegram_bot](https://pypi.org/project/python-telegram-bot/)

#### Installing the requirements

To install the prerequisites, you simply need to run the below commands in your command-line interface.

```bash

pip install faunadb

pip install telegram

pip install python_telegram_bot

```

To check if Fauna installed correctly, run the sample python code provided in Fauna’s Python driver [documentation](https://docs.fauna.com/fauna/current/drivers/python.html).

```python

from faunadb import query as q

from faunadb.objects import Ref

from faunadb.client import FaunaClient


client = FaunaClient(secret="your-secret-here")


indexes = client.query(q.paginate(q.indexes()))


print(indexes)


```
If your result after running is similar to the image below, then you are good to go.

![run_result](/engineering-education/building-an-appointment-scheduling-telegram-bot/run_result.png)

# Creating the Telegram Bot

#### Starting a Conversation with BotFather

Go to your telegram account, then search for @botfather and start a conversation with the account.

![search_bot_father](/engineering-education/building-an-appointment-scheduling-telegram-bot/search_bot_father.png)

![start_bot_father](/engineering-education/building-an-appointment-scheduling-telegram-bot/start_bot_father.png)

#### Creating the Telegram Bot Interface with BotFather

Use the `/newbot` command to create a new Telegram Bot. To create a bot using BotFather, you need to give your bot a name and assign a username.

![bot_father_command](/engineering-education/building-an-appointment-scheduling-telegram-bot/bot_father_command.png)

![bot_father_convo](/engineering-education/building-an-appointment-scheduling-telegram-bot/bot_father_convo.png)

After supplying the name and username for your Telegram Bot, the system will provide you with the API token that you can use to interact with the Bot account via the Telegram API (protected for security reasons in the image above ). Copy and paste the API token somewhere safe.

#### Powering the Bot with Python

Create a new python file and give it any name of your choice. Now you have to import the required modules into your python file.

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

We are importing `telegram`, telegram libraries, the python `datetime` module, and `faunadb` libraries, all of which we will be utilizing while building the bot.

Now you need to create a dispatcher and updater for your bot. Copy and paste the code below after your imports in your python file.

```python

telegram_bot_token = "your-telegram-token"

client = FaunaClient(secret="your-fauna-secret-key")

updater = Updater(token=telegram_bot_token, use_context=True)

dispatcher = updater.dispatcher

```

The dispatcher handles and processes the received message while the updater tracks, monitors, and reads messages sent to the bot and delivers them to the dispatcher.

Now you need to write a script to start your bot. Copy and paste the code below in your python file.

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

You then collected the `chat_id`, `first_name`, and `username` from the updater then made a request to the FQL (Fauna Query Language) client using the `users_index` to check if the user with the `chat_id` already exists in the database. If the user exists, you send a welcome message. Else,  you create a user with the information provided.

Next, you need to create a dispatch handler for the `/start` command. A command in telegram is any text that starts with `/`.

You can also add other handlers such as image handler, text handler, regex handler, and many more. We are starting with a command handler because that is the first thing every user enters into a Telegram Bot.

Copy and paste the code below at the end of your python file to call the dispatch handler to connect a command handler to the “start” command. The “start” command triggers the `start` method. The updater checks for messages from the user.

```python

dispatcher.add_handler(CommandHandler("start", start))

updater.start_polling()

```

After updating your python file, run with the code below:


```bash

# python file name is app.py

python app.py

```
While your python app is running, open your telegram app and search for the bot you created.

![search_bot](/engineering-education/building-an-appointment-scheduling-telegram-bot/search_bot.png)

Open your bot and start it by typing in the `/start` command. You will now receive a welcome message from the bot, as seen in the image below:

![start_bot](/engineering-education/building-an-appointment-scheduling-telegram-bot/start_bot.png)

#### Creating New Appointments

To enable your telegram bot to create new appointments in the fauna database, copy and paste the code below in your python file.

```python

def add_appointment(update, context):

    chat_id = update.effective_chat.id


    user = client.query(q.get(q.match(q.index("users_index"), chat_id)))

    client.query(q.update(q.ref(q.collection("Users"), user["ref"].id()), {"data": {"last_command": "add_appointment"}}))

    context.bot.send_message(chat_id=chat_id, text="Enter the appointment event you want to add along with its due in this format(mm/dd/yyyy) date separated by a comma 😁")

```

In the code above, you defined a method called `add_appointment` in which you passed `update` and `context` as parameters. In the function, you aved the user’s message and `chat_id`. You then made use of the `chat_id` to query the FQL client using  the `users_index` index to check the user data that matches the `chat_id`.

Next, you updated the `last_command` field in the user data to save the `add_appointment` command the user sent. You then sent a message requesting the user to enter the name of the appointment and its due date separated by a comma.

You have to create another method called `echo` that will collect the name and the due date for the new appointment then save it to the database. Copy and paste the code below after your `add_appointment` method in your python file.


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

In the code above, you defined a method called `echo` in which you passed `update` and `context` as parameters. In the function, you saved the user’s message and `chat_id`. You then made use of the `chat_id` to query the FQL client using the `users_index` index to check the user data that matches the `chat_id`.

Next, you checked if the `last_command` in the data retrieved is an `add_appointment` command. If it is, you proceed to query the FQL client to create an appointment using the Fauna `create` method in the `Appointments` collection with the information provided in the user’s message.

Finally, you need to create a command handler for the `add_appointment` command and a message handler for the `echo` method. The message handler filters the message and triggers the `echo` method when a message the user enters a message( a message is any text that does not start with `/`).

> Note: The echo method only works when the last command was an `add_appointment` command.

```python

dispatcher.add_handler(CommandHandler("add_appointment", add_appointment))

dispatcher.add_handler(MessageHandler(Filters.text, echo))

```

![add_appointment](/engineering-education/building-an-appointment-scheduling-telegram-bot/add_appointment.png)

#### Listing Appointments

To list all the appointments saved for a user, copy and paste the code below in your python file.

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

       event_message = "You dont hava any appointments saved, type /add_appointment to schedule one now 😇"

   context.bot.send_message(chat_id=chat_id, text=event_message)

```

In the code above, you defined a method called `list_appointments` in which you passed `update` and `context` as parameters. In the function, you aved the `chat_id` of the user and created an empty variable called `event_message`. You then made use of the `chat_id` to query the FQL client using the `appointments_index` index to check the user data that matches the `chat_id`.

Next, you looped through the data retrieved to check if the `completed` field was set to True. If this was the case, you set the `event_status` to “Completed”. Otherwise, you set it to “Not Completed”. 
You then sent a message to the user containing the `event`, `status`, update link and delete link for each appointment scheduled.

The update link is created by attaching `/update_` to the appointment’s id, while the delete link is created by attaching `/delete_` to the appointment’s id. If the query retrieved contains no data, this means the `event_message` is empty. You then sent a message to the user stating that the user has no appointments saved.

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

       event_message = "You dont have any appointments saved, type /add_appointment to schedule one now 😇"

   context.bot.send_message(chat_id=chat_id, text=event_message)


```


The `list_today_appointments` method is similar to the `list_appointments` method with one striking difference, the `appointment_today_index`. The `appointment_today_index` retrieves only data where the `date_due` field matches the current date.

Copy and paste the code below to create a command handler for both methods above.

```python

dispatcher.add_handler(CommandHandler("list_appointments", list_appointments))

dispatcher.add_handler(CommandHandler("list_today_appointments", list_today_appointments))

```

![list_today_appointment](/engineering-education/building-an-appointment-scheduling-telegram-bot/list_today_appointment.png)

#### Updating Appointments

To enable your bot to update appointments in the database, copy and paste the code below in your python file.


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

In the code above, you defined a method called `update_appointment` where you passed  `update` and `context` as parameters. In the function, you saved the `chat_id` of the user and the message passed, then created `event_id` by removing the `update_` prefix for the message.

You then made use of the `event_id` to query the FQL client to check for the appointment that matches the `event_id`. You then checked if the `completed` field of the appointment was set to True. If this is the case, you set the `new_status` variable to False. Otherwise, you set the `new_status` variable to True. 

Finally, you made a query to the FQL client to update the `completed` field to the value of the `new_status` variable using the Fauna `update` method then sent a successful update message to the user.

You set the `update_appointment` method to get triggered by a message handler that uses the regex filter to detect the update method’s regex code. You then split the message to extract the appointment id. Copy and paste the code below to create the message handler.

```python

dispatcher.add_handler(MessageHandler(Filters.regex("/update_[0-9]*"), update_appointment))

```

![update_appointment](/engineering-education/building-an-appointment-scheduling-telegram-bot/update_appointment.png)

#### Deleting Appointments

To enable your bot to delete appointments in the database, copy and paste the code below in your python file.

```python

def delete_appointment(update, context):

   chat_id = update.effective_chat.id

   message = update.message.text

   event_id = message.split("_")[1]


   client.query(q.delete(q.ref(q.collection("Appointments"), event_id)))

   context.bot.send_message(chat_id=chat_id, text="Successfully deleted appointment👌")


```

The `delete_appointment` method is similar to the `update_appointment` method. However, the difference is that after retrieving the appointment by querying the `Appointments` collection, you used the Fauna `delete` method to delete the data from the database. Subsequently, you sent a message to alert the user of a successful appointment deletion.

The `delete_appointment` method is similar to the ‘update_appointment` method.  You set the `delete_appointment` method to get triggered by a message handler that uses the regex filter to detect the delete method’s regex code. You then split the message to extract the appointment id. Copy and paste the code below to create the message handler.

```python

dispatcher.add_handler(MessageHandler(Filters.regex("/delete_[0-9]*"), update_appointment))

```

![delete_appointment](/engineering-education/building-an-appointment-scheduling-telegram-bot/delete_appointment.png)

### Conclusion

In this article, we built an appointment scheduler telegram bot with [Fauna's serverless database](https://fauna.com/). We saw how easy it is to integrate Fauna into a Python application and got the chance to explore some of its core features and functionalities.

The source code of our bot is available on [Github](https://github.com/Chukslord1/FAUNA_APPOINTMENT_SCHEDULER_BOT). If you have any questions, don't hesitate to contact me on Twitter: [@](https://twitter.com/LordChuks3)[LordChuks3](https://twitter.com/LordChuks3).


