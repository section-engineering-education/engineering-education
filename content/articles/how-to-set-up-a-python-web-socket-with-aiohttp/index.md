---
layout: engineering-education
status: publish
published: true
url: /how-to-set-up-a-python-web-socket-with-aiohttp/
title: How to Set Up a Simple Python WebSocket with AioHTTP
description: In this tutorial, we will build a client-server socket architecture application using AioHTTP.
author: carol-wanjiru
date: 2021-12-02T00:00:00-09:35
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/how-to-set-up-a-python-web-socket-with-aiohttp/hero.png
    alt: How to set up a Simple Python WebSocket with AioHTTP
---

A web socket consists of two significant endpoints. One end sends data, and the other end receives data. Take an example of what you can do over the internet. In this case, different nodes/computers are connected to establish a connection that will allow you to send or receive data.
<!--more-->

A node can be a server or a client. A client sends a request, and the server will send back a response. These connections between the server and client are achieved through sockets. Thus, a socket acts as the communication endpoint.

This guide will help you understand the socket concept by building client-server socket architecture using the AioHTTP.

[AioHTTP](https://docs.aiohttp.org/en/stable/) is an asynchronous HTTP client/server for Python and [asyncio](https://docs.aiohttp.org/en/stable/glossary.html#term-asyncio).

The library supports client and HTTP servers, client WebSockets and server WebSockets out of the box without callbacks.

We will build a WebSocket by setting up the client and the server with AioHTTP and sending data between the client and the server.

### Table of contents

- [Table of contents](#table-of-contents)
- [Prerequisites](#prerequisites)
- [Setting up a virtual environment using virtualenv](#setting-up-a-virtual-environment-using-virtualenv)
- [Installing AioHTTP](#installing-aiohttp)
- [Building a server with AioHTTP](#building-a-server-with-aiohttp)
- [Building a client with AioHTTP](#building-a-client-with-aiohttp)
- [Sending data between client and server](#sending-data-between-client-and-server)
- [Conclusion](#conclusion)

### Prerequisites
1. [Python 3.7](https://www.python.org/) or later installed on your machine.
2. Basic knowledge of Python programming.

### Setting up a virtual environment using virtualenv

[Virtualenv](https://pypi.org/project/virtualenv/) is a library for creating an independent Python environment. All the libraries we install will be installed locally for our project. First, create a project folder and open it in a command line.

Then install virtualenv by running the following command:

```bash
pip3 install virtualenv
```

If you have pre-installed virtualenv, ensure that your [pip](https://pypi.org/project/pip/) is up to date by running the following command from your terminal.

```bash
pip --version
```

You can check the version of virtualenv installed on your computer by running:

```bash
which virtualenv
```

If the virtualenv version is not up to date, run this command to get the latest version installed:

```bash
python3 -m pip install --upgrade pip
```

This will output the path as the already installed virtualenv. Initialize the environment for this project using virtualenv

```bash
python3 -m virtualenv .
```

Then run `Activate` to activate this environment by running:

- For the Windows operating system, run this command in your:

1. Powershell terminal

```bash
./Scripts/Activate.ps1
```

2. Command prompt

```bash
./Scripts/activate.bat
```

- For Unix systems use:

```bash
source /Scripts/activate
```

At this point, virtualenv is set up, and we can proceed to the next step.

### Installing AioHTTP

To install AioHTTP along with the related modules, run the following command:

```bash
pip install aiohttp[speedups]
```

The above command will install AioHTTP along with the following packages:

- [Charset-normalizer](https://docs.aiohttp.org/en/stable/glossary.html#term-charset-normalizer) : A universal charset detector.

- [Aiodns](https://docs.aiohttp.org/en/stable/glossary.html#term-aiodns) : A DNS resolver for asyncio.

- [Brotli](https://pypi.org/project/Brotli/): A data compression libarry.

The modules ensure that the AioHTTP module is as fast as possible when receiving and sending requests.

### Building a server with AioHTTP

Create a `server.py` file in the project folder. We will configure an AioHTTP server here.

Import the `web` module from the `aiohttp` library.

```python
from aiohttp import web
```

The web module will enable us to create a local webserver. First, add a dummy list of todos.

```python
todos = [
    {"id":"1","title":"Go to the garden"},
    {"id":"2","title":"Go to the market"},
    {"id":"3","title":"Prepare dinner"},
]
```

The dummy data will be the server's response when called by the client.

Create a handler function that will send the dummy data.

```python
async def handle(request):
    return web.json_response(todos)
```

Notice that the handler is an `async` function returning `JSON` data.

- Initialize the application, set up the routes with their listeners, and add scripts for starting a server as shown below:

```python
app = web.Application()

app.add_routes([web.get('/', handle),
        web.get('/todos', handle)])

if __name__ == '__main__':
    web.run_app(app)
```

Here we target the `/` route and the `/todos` route, both of which will be handled by the same function. We are also starting our server by running the application instance.

You can start the server by running the following command on your terminal. Before running the command, ensure you are in the project folder that hosts the `server.py` file.

```bash
./Scripts/python server.py
```

Your response should be similar to;

```bash
========= Running on http://0.0.0.0.8080 =======
```

The server is up and running, and as you can the server is listening on port `8080`.

### Building a client with AioHTTP

Create a `client.py` file in the project folder. Next, let's configure the client using the AioHTTP.

Import the `aiohttp` and `asyncio` modules.

```python
import aiohttp
import asyncio
```

- `aiohttp` will create a client session that will listen to the server.

- `asyncio` will initialize an event loop which the client will listen to.

Create a method for creating the client session and listening to the server.

```python
async def main():
    async with aiohttp.ClientSession() as session:
        async with session.get('http://localhost:8080/todos') as response:

            print(response.status)
            print(await response.json())
```

Here we are creating a client session, awaiting the response from our local server, and printing out the status and `JSON` response from the server.

Initialize an event loop and run the `main` function in the event loop until completion.

```python
loop = asyncio.get_event_loop()
loop.run_until_complete(main())
```

The event loop will only close when the `main` function has been fully executed.

### Sending data between client and server
To send the client and the server data, we need to run the `client.py` file to receive the dummy data we set from the server.

Open a separate tab of your terminal and run the following command inside the project folder.

```bash
./Scripts/python client.py
```

The above command will run the `main` function inside the `client.py` file, and your response should be comparable to:

```bash
200
[
    {
        'id':'1',
        'title': 'Go to the garden'
    },
    {
        'id':'2',
        'title': 'Go to the market'
    },
    {
        'id':'3',
        'title': 'Prepare dinner'
    }
]
```

### Conclusion

We have built a simple WebSocket by setting up an AioHTTP server and client and sending data between them. Check the following resources to learn more about the AioHTTP client and server.

- [AioHTTP client](https://docs.aiohttp.org/en/stable/client.html#aiohttp-client)
- [AioHTTP server](https://docs.aiohttp.org/en/stable/web.html#aiohttp-web)
- [AioHTTP tutorials](http://demos.aiohttp.org/en/latest/)

---

Peer Review Contributions by: [Odhiambo Paul](/engineering-education/authors/odhiambo-paul/)
