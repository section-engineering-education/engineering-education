![hero](/engineering-education/building-chat-application-with-django-channel/hero.png)

In this tutorial, we are building a fully-functional chat application by implementing the chat server using Django Channel. Channel is built on the async-server that Django uses to implement application servers which is `ASGI`.

ASGI is the server specification that Channel was built upon. Like the `Web Server Gateway Interface` WSGI, this gives the opportunity of choosing servers and/or a framework of choice rather than just accepting the Channel server called `Daphne`.

Channel allows not only the `HyperText Transfer Protocol` but other protocols that have long connections time too. It can also be integrated with WebSockets, chatbots, and more.

It also allows both the synchronous and asynchronous parts of Django's views through the Channels layers. This layer makes communication easier by dividing the application into different processes.

### Spinning up the project

Let us get started on building the chat application. We have to spin up Django's server by making a fresh project from scratch. Navigate to your terminal and follow the processes below;

```bash
$ cd Desktop
$ mkdir newproject
$ cd newproject 
$ virtualenv venv
$ cd venv
$ source venv/Scripts/activate
$ pip install django
```

Now that we have the latest Django version, we can prepare the project using the commands below;


```bash
$ django-admin startproject mychatapp
$ cd mychatapp
$ code  .
$ python manage.py runserver
```
Open the browser and route to `http://localhost:8080`, the Django's default project page will show up.

Let install the channels dependency and make the requirements file.

```bash
$ python -m pip install -U channels
$ pip freeze > requirements.txt
```

Make sure that the `channel` is added to the `INSTALLED_APP` in the `settings.py` file of your project folder.

However, it was said earlier that Channels was built on top of `ASGI` and for that reason, the `asgi.py` file in the `mychatapp` has to be adjusted with the codes below.

```python
import os
from channels.routing import ProtocolTypeRouter
from django.core.asgi import get_asgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'mychatapp.settings')

application = ProtocolTypeRouter({
    "http": get_asgi_application()
})
```

Finally, the `ASGI` has to be pointing to your `asgi.py` file and that is done in the `settings.py`; 

Note that this will replace the `WSGI`server that came default with the Django project.

```
ASGI_APPLICATION = "myproject.asgi.application"
```
With this code, the Channel server will take over the default Django's WSGI server and allow only the HTTP protocol for now.

Run the server with the command below and then open up the browser with the localhost, you should see the message of `500 internal server error`. 

```bash
$ python manage.py runserver
```

![500 Internal Server Error](/engineering-education/building-chat-application-with-django-channels/server-error.png)


### Creating the chat app

It is a good practice to separate the codes for the chats in its stand-alone application. Following the Django way of creating an app;

```bash
$ python manage.py startapp chatapp
```
 
Add the new app to the installed apps section inside the `settings.py` file. 

The next thing is to create a template folder inside the `chat app` folder. Then make `chat app` folder and inside that make `index.html` file.

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

The Html template code is allowing clients to enter the name of the chat room they are navigating. Then the JavaScript does the trick by grabbing the submitted room name.  

Having submitted, it will be attached to the windows path and sent to the server. The server will receive the request and match it to the URLs if found.

At this point, we have to make both the `URLs and `views` for the incoming HTTP requests from clients. 

In the `views.py` file inside the `chat app`, we can define the index method as;

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

The next step is to register the app URLConf file with the project. Navigate to the `urls.py` of the `mychat app` folder and do the mapping like below;

```python 
# mychatapp/urls.py
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('chats/', include('chatapp.urls')),
    path('admin/', admin.site.urls),
]
```

```bash
$ python manage.py runserver
```

Running the server and navigating to the `http://localhost:8080/chats/` will open the chat page having both the inputs and submit button. 

But if you type in any room name, you should receive a `page not found` message because we have not implemented any other chat room for communication. 

### Setting up chat server

First of all, we need to add another room chat template.  Inside the chat app templates, make `chatroom.html` and paste the following codes;

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
Note that the common convention to distinguish the `HTTP connection from WebSockets is to use the `ws` protocol.

In the views.py file, we have to make a function that will match the client request through the URLs. 

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

When running the server do move to `http://localhost:8080/chats/`, you should confirm the below image.

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

Now create the `routing.py` file in the chat app folder. This will map the incoming WebSocket connection to the appropriate consumer function.

```python
from django.urls import re_path

from .consumers import Consumer

websocket_urlpatterns = [
    re_path(r'ws/chat/(?P<room_name>\w+)/$', Consumer.as_asgi()),
]
```
Note the regular expression used. This is because of the limitation with `URLRouter`.

Also, the `as_asgi()` method called on the `Consumer` class does the same task with the class-based views method in Django which is `as_view()`.

Now we have to make the root routing connection with the server. This is to allow the connection between the multiple requests or clients chatting at the same time.

Navigate to the `asgi.py` in the `mychat app` folder and replace the codes with the following;

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

1. Each of the channels has a name and any client having the name can send a message in as much server is still on.
2. Channel layers also can be grouped. Every group has a name and anyone can remove or add a channel having the precise name.

The trick is that every consumer will generate a channel name that can be communicated with. We will be using the channel layer that uses `Redis` as its backbone database. 

This will help to store the frequent chats as long as the chat server is still in connection.

Now we have to spin up the Redis server on default port `6379` by running the following command;

Note: you need to have [Docker](/https://docs.docker.com/engine/install/), 

[Redis](/https://redis.io/download/) and `channels_redis` installed.



```bash
$ docker run -p 6379:6379 -d redis:5
$ python3 -m pip install channels_redis
$ pip freeze > requiremnts.txt
```

Having installed the dependencies, we have to track the layers by adding the code below to `settings.py` just under the `ASGI_APPLICATION`.

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

To test the application, kindly open a browser window and an incognito tab window same time. 

```bash
$ python manage.py runserver
```

Open browser to `http://127.0.0.1:8000/chats/room/` in both windows and type a message. You will receive the message in the two chat logs section from the windows.

Now you have a functional basic chat application. I commend your efforts.

You care to know more, navigate to [Channels](/https://channels.readthedocs.io/en/stable/tutorial/part_1.html/).
