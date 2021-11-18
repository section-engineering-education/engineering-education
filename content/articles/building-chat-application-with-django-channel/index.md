---
layout: engineering-education
status: publish
published: true
url: /building-chat-application-with-django-channel/
title: Building Chat Application with Django Channels
description: This tutorial explains how to use Django channels in a Djnago application by building a fully functional chat application
author: francisca-adekanye
date: 2021-11-18T00:00:00-09:00
topics: [API]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/building-chat-application-with-django-channel/hero.png
    alt: Building Chat Application with Django Channels
---

This tutorial will build a fully functional chat application by implementing the chat server using Django Channel. This Channel was implemented on the asynchronous server used by Django. And this server was named Asynchronous Server Gateway Interface `ASGI`.
<!--more-->
ASGI is the server specification that the Channel was built upon. Like the WSGI, both server and framework can be chosen with choice rather than just accepting the Channel server.

The Django Channel supports HTTP and other types of protocols that have long connections time. The Channel layers divide the entire applications into processes and support parts of Django views.

### Table of Contents
- [Table of Contents](#table-of-contents)
- [Prerequisites](#prerequisites)
- [Goal](#goal)
- [Project setup](#project-setup)
- [Creating the chat application](#creating-the-chat-application)
- [Setting up a chat server](#setting-up-a-chat-server)
- [Making consumers accept the connection](#making-consumers-accept-the-connection)
  
### Prerequisites
- Knowledge of Django and Python.
- Favorite code editor installed. I use [Visual Studio Code](https://code.visualstudio.com/download).
- [Docker](https://www.docker.com/products/docker-desktop) installed on your machine.
- [Redis](https://redis.io/download/) installed on your machine.



### Project setup
Let us get started to build the chat application. Navigate to your terminal and follow the processes below.

```bash
$ django-admin startproject letschat
$ cd letschat
```
Let us install the channels dependency and make the requirements file.

```bash
$ pip install channels
$ pip freeze > req.txt
```
Add the Channel library to the apps inside the `settings.py` file.
Edit the `asgi.py` in the `letschat` folder with the codes below.

```python
import os
from channels.routing import ProtocolTypeRouter
from django.core.asgi import get_asgi_application
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'letschat.settings')
application = ProtocolTypeRouter({
    "http": get_asgi_application()
})
```

Finally, the `ASGI` server must point to the `asgi.py` file. That will be done inside the `settings.py` file;

> **Note**: This will replace the WSGI server that came default with the Django project.

```
ASGI_APPLICATION = "letschat.asgi.application"
```

The Channel server will take over the default Django's WSGI server and allow only the `HTTP` protocol with that code above.

Run the server with the command below and then open up the browser with the localhost; you should see the message of `500 internal server error`.

```bash
$ python manage.py run server
```


![500 Internal Server Error](/engineering-education/building-chat-application-with-django-channel/server-error.png)


### Creating the chat application
It is a good practice to separate the code for the chats in its stand-alone application. Following the Django way of creating an app;

```bash
$ python manage.py startapp letschat_app'
```
Add the new app to the installed apps section inside the `settings.py` file.

Next, create a `letschat/template/letschat_app` directory, then make an HTML file called `index`.

Navigate to the `index.html` and add the boiler code below;


![Index Page](/engineering-education/building-chat-application-with-django-channel/indexhtml.png) 


The HTML template code allows clients to enter the name of the chat room they are navigating.

The submitted room name will be attached to the windows path and gets sent to the server. The server will receive the request and match it to the URLs if found.

We have to make both the `URLs` and `views` for the incoming HTTP requests from clients.

In the `views.py` file inside the chat app, we can define the index method as;

 ```python
# letschat_app/views.py
from django.shortcuts import render
def app_index(request):
    return render(request, 'letschat_app/index.html')
 ```

To call the views, we have to map it with the `URLConf`. Make `urls.py` file inside the `letschat_app` folder.

```python
# letschat_app/urls.py
from django.urls import path
from .views import app_index
app_name = 'letschat_app'
urlpatterns = [
    path('', app_index, name="index")
]
```  

The next step is to register the app `URLConf` file with the project. Navigate to the `urls.py` of the `letschat` folder and map as below;

```python
from Django.URLs import path, include
urlpatterns = [
    path('chat/', include('letschat_app.urls'))
]
```
Now run your server with the command below.

```bash
$ python manage.py runserver
```
While the server is running, navigate to the `http://localhost:8080/chat/` and open the chat page.  Both the input and submit forms will be shown.

But if you type in any room name, you should receive a `page not found` message because we have not implemented any other chat room for communication.

### Setting up a chat server
First, we need to add another room chat template. Inside the `letschat/templates/letschat_app` directory, create `chatroom.html` and type the code snippets below.


![ChatRoom Page 1](/engineering-education/building-chat-application-with-django-channel/chatroomhtml1.png) 


![ChatRoom Page 2](/engineering-education/building-chat-application-with-django-channel/chatroomhtml2.png) 


> **Note**: The two code snippets are the continuation of each other.

The common convention to distinguish the `HTTP` connection from WebSockets is to use the `ws` protocol.

In the `views.py` file, we have to make a function that will match the client request through the URLs.

```python
def room_name(request, name):
        return render(request, 'letschat_app/chatroom.html', {'room_name': name})
 ```

This will grab whatever room name received from the request and send it to the HTML template that is rendered. Once it has been received, the `chatroom.html` will be opened for chatting.

While the URLs will be something like this;

```python
from django.urls import path
from .views import room_name
urlpatterns = [
    path('<str:name>/', room_name, name='room'),
]
```
When running the server, do move to `http://localhost:8080/chats/`; you should confirm the below image.


![Room 1](/engineering-education/building-chat-application-with-django-channel/chat.png) 


Input any room name of your choice for connections. That will open up the chat room like this;


![Room 2](/engineering-education/building-chat-application-with-django-channel/chatroom.png)


But we have to make a consumer that will accept the WebSocket connections.

### Making consumers accept the connection
Historically, Django servers route URLConf to the appropriate view function and send the Html templates. The same thing goes to when Channels using the Daphne server receives any request, it maps the routing to the consumer and looks up to appropriate function.

Make `consumers.py` file inside the chat app folder and use the code snippets in the image below.


![Consumer 1](/engineering-education/building-chat-application-with-django-channel/consumer1.png)


![Consumer 2](/engineering-education/building-chat-application-with-django-channel/consumer2.png)


The regular expression used solves the `URLRouter` limitations.

Also, the `as_asgi()` method on the `Consumer` class does the same task as the class-based views method in Django, which is `as_view()`.

Now we have to redirect to the socket URL defined. Navigate to the `asgi.py`, and configure the routing as the snippet below;

```python
from channels.auth import AuthMiddlewareStack
import letschat_app.routing 
application = ProtocolTypeRouter({
    "http": get_asgi_application(),
    "websocket": AuthMiddlewareStack(
        URLRouter(
            letschat_app.routing.websocket_urlpatterns
        )
    ),
})
```

The final step is to enable a channel layer to allow multiple chats connection from different clients. The abstractions behind this layer are;

1. Each channel has a name, and any client with the name can send a message in as much server is still on. 
2. Channel layers also can be grouped. Every group has a name, and anyone can remove or add a channel having the precise name.

We will be using the channel layer that uses `Redis` as its memory store.

This will help to store the frequent chats as long as the chat server is still in connection.

Now we have to spin up the Redis server on default port `6379` by running the following command;

```bash
$ docker run -p 6379:6379 -d redis:5
$ pip install channels_redis
```

This docker command will spin up the Redis image and run it on the specified port. Then we installed the `channel_redis`, which is the library required to connect with the memory store.

Having installed the dependencies, we must track the layers by adding the code below to `settings.py` just under the `ASGI_APPLICATION`.

```python
CHANNEL_LAYERS = {
    'default': {
        'BACKEND': 'channels_redis.core.RedisChannelLayer',
        'CONFIG': {
            "hosts": [('127.0.0.1', 6379)],
        },
    },
}
```
Channel layers will point to the Redis layer as its store. This connection is made using the library installed above.

The library requires a `BACKEND` configuration and its `CONFIG` property that defines the host which is the Redis server running locally.

To test the application, open a browser window and an incognito tab window Simultaneously. And spin up the server;

```bash
$ python manage.py runserver
```
On the web browser navigate to [http://127.0.0.1:8000/chats/room/](http://127.0.0.1:8000/chats/room/) in both windows and type messages.

You will receive them in the two chat logs `textarea`.

Now you have a functional basic chat application. This will prepare you ahead of your project and guide you against boring documentation.

For further reading, navigate to [Channels](https://channels.readthedocs.io/en/stable/tutorial/part_1.html/).

Happy reading!

---
Peer Review Contributions by: [Odhiambo Paul](/engineering-education/authors/odhiambo-paul/)
 
