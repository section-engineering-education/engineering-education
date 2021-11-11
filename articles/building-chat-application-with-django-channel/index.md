---
layout: engineering-education
status: publish
published: true
url: /engineering-education/building-chat-application-with-django-channel/
title: Building Chat Application with Django Channels
description: This tutorial explains how to use Django channels in a Djnago application by building a fully functional chat application
author: francisca-adekanye
date: 2020-11-07T00:00:00-10:00
topics: [API]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/building-chat-application-with-django-channel/hero.png
    alt: Building Chat Application with Django Channels
---

This tutorial will build a fully functional chat application by implementing the chat server using Django Channel. This Channel was implemented on the asynchronous server that is used by Django. And this server was named Asynchronous Server Gateway Interface `ASGI`.

ASGI is the server specification that the Channel was built upon. Like the `Web Server Gateway Interface` WSGI, this gives the opportunity of choosing server and framework of choice rather than just accepting the Channel server.

Channel allows the `HyperText Transfer Protocol` and other protocols that have long connections time. The Channel layers divide the entire applications into processes and supports parts of Django views.

### Spinning up the project

Let us get started to build the chat application. Navigate to your terminal and follow the processes below;

Note that Django must have be installed on your local machine.

```bash
$ django-admin startproject djangochatapp
$ cd djangochatapp
$ code .
```
Let us install the channels dependency and make the requirements file.

```bash
$ pip install channels
$ pip freeze > req.txt
```
Make sure that the Channel is added to the `INSTALLED_APP` in the `settings.py` file of your project folder.

Edit the `asgi.py` in `djangochatapp` folder with the codes below.

```python
import os
from channels.routing import ProtocolTypeRouter
from django.core.asgi import get_asgi_application
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'djangochatapp.settings')
application = ProtocolTypeRouter({
    "http": get_asgi_application()
})
```

Finally, the `ASGI` server must point to `asgi.py` file. That will be done inside `settings.py` file;

Note: This will replace the WSGIserver that came default with the Django project.

```
ASGI_APPLICATION = "djangochatapp.asgi.application"
```

The Channel server will take over the default Django's WSGI server and allow only the   `HTTP` protocol with this code.

Run the server with the command below and then open up the browser with the localhost; you should see the message of `500 internal server error`.

```bash
$ python manage.py run server
```

[500 Internal Server Error](/engineering-education/building-chat-application-with-django-channels/server-error.png)

### Creating the chat application

It is a good practice to separate the codes for the chats in its stand-alone application. Following the Django way of creating an app;

```bash
$ python manage.py startapp chatapp'
```
Add the new app to the installed apps section inside the `settings.py` file.
The next thing is to create a `template` folder inside the `chat app`. Then make a `chat app` folder, and inside that, make an `index.html` file.
Navigate to the index.html and paste the boiler codes below;
```html
<!-- chatapp/templates/chatapp/index.html -->
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8"/>
    <title>Chats Room</title>
</head>
<body>
    <div class="container">
        <h3>Enter any chat room of your choice?</h3><br>
        <input id="roomname" type="text" size="100"><br><br>
        <input id="submit" type="button" value="Enter">
    </div>
    <script>
        document.querySelector('#roomname').focus();
        document.querySelector('#submit').onclick = function(e) {
            var myRoom = document.querySelector('#roomname').value;
            window.location.pathname = '/chats/' + myRoom + '/';
        };
    </script>
</body>
</html>
```

The HTML template code allows clients to enter the name of the chat room they are navigating. Then the JavaScript does the trick by grabbing the submitted room name.

The submitted room name will be attached to the windows path and sent to the server. The server will receive the request and match it to the URLs if found.

We have to make both the `URLs` and `views` for the incoming HTTP requests from clients.

In the `views.py` file inside the chat app, we can define the index method as;

 ```python
# chatapp/views.py
from django.shortcuts import render
def index(request):
    return render(request, 'chatapp/index.html')
 ```

To call the views, we have to map it with the `URLConf`. Make `urls.py` file inside the `chat app` folder.

```python
# chatapp/urls.py
from django.urls import path
from .views import index
app_name = 'chatapp'
urlpatterns = [
    path('', index, name="index")
]
```  

The next step is to register the app URLConf file with the project. Navigate to the `urls.py` of the `mychatapp` folder and do the mapping like below;

```python
from Django.contrib import admin
from Django.URLs import path, include
urlpatterns = [
    path('chats/', include('chatapp.urls')),
    path('admin/', admin.site.urls),
]
```
Now run your server.


```bash
$ python manage.py runserver
```

Running the server and navigating to the `http://localhost:8080/chats/` will open the chat page with both the inputs and submit buttons.

But if you type in any room name, you should receive a `page not found` message because we have not implemented any other chat room for communication.

### Setting up a chat server

First of all, we need to add another room chat template. Inside the chat app templates, make chatroom.html and paste the following codes;

```html
<!-- chatapp/templates/chatapp/chatroom.html -->
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8"/>
    <title>Other Chats Room</title>
</head>
<body>
    <div class="container2">
        <h5>Chats Log</h5>
        <textarea id="log" cols="100" rows="20"></textarea><br>
        <h5>Enter your chats here</h5>
        <input id="chatmssg" type="text" size="100"  placeholder="Your message goes here..."><br><br>
        <input id="submit" type="button" value="Send">
    </div>

    {{ room_name|json_script:"roomname" }}
    <script>
        const roomName = JSON.parse(document.getElementById('roomname').textContent);
        const chatSocket = new WebSocket(
            'ws://'
            + window.location.host
            + '/ws/chat/'
            + roomName
            + '/'
        );
        chatSocket.onmessage = function(e) {
            const data = JSON.parse(e.data);
            document.querySelector('#log').value += (data.message + '\n');
        };
        chatSocket.onclose = function(e) {
            console.error('Ooops! Chats closed.');
        };
        document.querySelector('#chatmssg').focus();
        document.querySelector('#submit').onclick = function(e) {
            const messageDom = document.querySelector('#chatmssg');
            const message = messageDom.value;
            chatSocket.send(JSON.stringify({
                'message': message
            }));
            message = '';
        };
    </script>
</body>
</html>
``` 

> The common convention to distinguish the `HTTP` connection from WebSockets is to use the `ws` protocol.

In the `views.py` file, we have to make a function that will match the client request through the URLs.

```python
def roomName(request, room_name):
        return render(request, 'chatapp/chatroom.html', {'room_name': room_name})
 ```

This will grab whatever room name received from the request and send it to the Html templates rendered. Once it has been received, the `chatroom.html` will be opened for chatting.

While the URLs will be something like this;

```python
# chatapp/urls.py
from django.urls import path
from .views import index, roomName
app_name = 'chatapp'
urlpatterns = [
    path('', index, name="index"),
    path('<str:room_name>/', roomName, name='room'),
]
```

When running the server, do move to `http://localhost:8080/chats/`; you should confirm the below image.

![Chat Room 1](/engineering-education/building-chat-application-with-django-channels/chat.png) 

Then enter any room name of your choice for connections. That will open up the chat room like this;

![Chat Room 2](/engineering-education/building-chat-application-with-django-channels/chatroom.png)

But we have to make a consumer that will accept the WebSocket connections.

### Making consumers accept the connection

Historically, Django servers route URLConf to the appropriate view function and send the Html templates. The same thing goes to when Channels using the Daphne server receives any request, it maps the routing to the consumer and looks up to appropriate function.

Now we will make the `consumers.py` file inside the chat app folder.

```python
import json
from asgiref.sync import async_to_sync
from channels.generic.websocket import WebsocketConsumer
class Consumer(WebsocketConsumer):
    def connect(self):
        self.room_name = self.scope['url_route']['kwargs']['room_name']
        self.room_group_name = 'chat_%s' % self.room_name
        # Join room group
        async_to_sync(self.channel_layer.group_add)(
            self.room_group_name,
            self.channel_name
        )
        self.accept()
    def disconnect(self, close_code):
        # Leave room group
        async_to_sync(self.channel_layer.group_discard)(
            self.room_group_name,
            self.channel_name
        )
    # Receive message from WebSocket
    def receive(self, text_data):
        text_data_json = json.loads(text_data)
        message = text_data_json['message']
        # Send message to room group
        async_to_sync(self.channel_layer.group_send)(
            self.room_group_name,
            {
                'type': 'chat_message',
                'message': message
            }
        )
    # Receive message from room group
    def chat_message(self, event):
        message = event['message']
        # Send message to WebSocket
        self.send(text_data=json.dumps({
            'message': message
        }))
 ```

Now create the  `routing.py` file in the chat app folder. This will map the incoming WebSocket connection to the appropriate consumer function.

```python
from Django.URLs import re_path
from .consumers import Consumer
websocket_urlpatterns = [
    re_path(r'ws/chat/(?P<room_name>\w+)/$', Consumer.as_asgi()),
]
```

Note the regular expression used. This is because of the limitation with `URLRouter`.

Also, the `as_asgi()` method on the `Consumer` class does the same task as the class-based views method in Django, which is `as_view()`.

Now we have to make the root routing connection with the server. This is to allow the connection between the multiple requests or clients chatting at the same time.

Navigate to the `asgi.py` in the chat app folder and replace the codes with the following;

```python
# mychatapp/asgi.py
import os
from channels.auth import AuthMiddlewareStack
from channels.routing import ProtocolTypeRouter, URLRouter
from django.core.asgi import get_asgi_application
import chatapp.routing 
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'mychatapp.settings')
application = ProtocolTypeRouter({
    "http": get_asgi_application(),
    "websocket": AuthMiddlewareStack(
        URLRouter(
            chatapp.routing.websocket_urlpatterns
        )
    ),
})
```

The final step is to enable a channel layer to allow multiple chats connection from different clients. The abstractions behind this layer are;

1. Each channel has a name, and any client with the name can send a message in as much server is still on. 
2. Channel layers also can be grouped. Every group has a name, and anyone can remove or add a channel having the precise name.

We will be using the channel layer that uses `Redis` as its backbone database.

This will help to store the frequent chats as long as the chat server is still in connection.

Now we have to spin up the Redis server on default port `6379` by running the following command;

Note: you need to have [Docker](/https://docs.docker.com/engine/install/), 

[Redis](/https://redis.io/download/) and `channels_redis` installed.


```bash
$ docker run -p 6379:6379 -d redis:5
$ python3 -m pip install channels_redis
$ pip freeze > requiremnts.txt
```

Having installed the dependencies, we must track the layers by adding the code below to `settings.py` just under the `ASGI_APPLICATION`.

This will allow the host machine to connect with the Redis server.

```python
# mychatapp/settings.py
CHANNEL_LAYERS = {
    'default': {
        'BACKEND': 'channels_redis.core.RedisChannelLayer',
        'CONFIG': {
            "hosts": [('127.0.0.1', 6379)],
        },
    },
}
```

To test the application, open a browser window and an incognito tab window Simultaneously. And spin up the server;

```bash
$ python manage.py runserver
```

Open browser to `http://127.0.0.1:8000/chats/room/` in both windows and type messages.

You will receive them in the two chat logs `textarea`.

Now you have a functional basic chat application. I commend your efforts.

You care to know more, navigate to [Channels](/https://channels.readthedocs.io/en/stable/tutorial/part_1.html/).

---

Peer Review Contributions by: [Odhiambo Paul](/engineering-education/authors/odhiambo-paul/)
