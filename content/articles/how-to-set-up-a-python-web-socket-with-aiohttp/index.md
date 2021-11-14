A socket consists of two major endpoints. One end sends data, and the other end receives data. Take an example of what you can do over the internet. In this case, different nodes/computers are connected to establish a connection that will allow you to send or receive data. A node can be a server or a client. A client sends a request, and the server will send back a response. These connections between the server and client are achieved through sockets. Thus, a socket acts as the communication endpoint.

This guide will help you understand the socket concept by building client-server socket architecture using the AioHTTP.

[AioHTTP](https://docs.aiohttp.org/en/stable/) is an asynchronous HTTP client/server for Python and [asyncio](https://docs.aiohttp.org/en/stable/glossary.html#term-asyncio).

The library supports client and HTTP servers, client WebSockets and server WebSockets out of the box without callbacks.

We will build a WebSocket by setting up the client and the server with AioHTTP and sending data between the client and the server.

To follow along with this tutorial, ensure you have [Python3](https://www.python.org/) installed on your computer and some basic knowledge working with Python.

### Table of contents

- [Table of contents](#table-of-contents)
- [Setting up a virtualenv](#setting-up-a-virtualenv)
- [Installing AioHTTP](#installing-aiohttp)
- [Building a server with AioHTTP](#building-a-server-with-aiohttp)
- [Building a client with AioHTTP](#building-a-client-with-aiohttp)
- [Sending data between client and server](#sending-data-between-client-and-server)
- [Conclusion](#conclusion)

### Setting up a virtualenv

[Virtualenv](https://pypi.org/project/virtualenv/) is a tool for creating an independent Python environment. This implies that all the libraries that we will install will be installed specifically for our project. Create a project folder and open it in a command line.

Then install the virtualenv by runninh;

```bash
pip3 install virtualenv
```

If you have virtualenv already installed, ensure that your [pip](https://pypi.org/project/pip/) is up to date by running the following command from your terminal.

You can check the version of virtualenv installed on your computer by running;

```bash
which virtualenv
```

If virtualenv version is not up to date, run this command to get the latest version installed;

```bash
python3 -m pip install --upgrade pip
```

This will output the path as the already installed virtualenv.

Initialize the environment for this project using virtualenv

```bash
python3 -m virtualenv .
```

Then activate Activate this environment by running;

- For the Windows operating system, run this command in your;

1. Powershell terminal

```bash
./Scripts/Activate.ps1
```

2. Command prompt

```bash
./Scripts/activate.bat
```

- For Unix systems use;

```bash
source /Scripts/activate
```

The virtualenv is now set up, and we can proceed to the following stage.

At this point, the virtualenv is set up, and we can proceed to the next step.

### Installing AioHTTP

To install AioHTTP along with the related modules, run the following command:

```bash
pip install aiohttp[speedups]
```

The above command will install AioHTTP along with the following packages;

- [Charset-normalizer](https://docs.aiohttp.org/en/stable/glossary.html#term-charset-normalizer) : A universal charset detector.

- [Aiodns](https://docs.aiohttp.org/en/stable/glossary.html#term-aiodns) : A DNS resolver for asyncio.

- [Brotli](https://pypi.org/project/Brotli/): A data compression libarry.

The modules ensure that the AioHTTP module is as fast as possible when receiving and sending requests.

### Building a server with AioHTTP

Create a `server.py` file in the project folder. We will configure an AioHTTP server here.

Import the `web` module from the `aiohttp` module.

```python
from aiohttp import web
```

The web module will enable us to create a local webserver.

Add some dummy list of todos.

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

- Initialize the application, set up the routes with their listeners, and add scripts for starting a server as shown below;

```python
app = web.Application()

app.add_routes([web.get('/', handle),
        web.get('/todos', handle)])

if __name__ == '__main__':
    web.run_app(app)
```

Here are targeting the `/` route and the `/todos` route, both of which will be handled by the same function. We are also starting our server by running the application instance.

You can start the server by running the following command on your terminal. Before running the command, ensure you are in the project folder that hosts the `server.py` file.

```bash
./Scripts/python server.py
```

![Server response](/engineering-education/how-to-set-up-a-python-web-socket-with-aiohttp/server-start-response.png)

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

To send the data between the client and the server, we need to run the `client.py` file so that we can receive the dummy data we set from the server.

Open a separate tab of your terminal and run the following command inside the project folder.

```bash
./Scripts/python client.py
```

The above command will run the `main` function inside the `client.py` file, and your response should be comparable to:

![Sending data response](/engineering-education/how-to-set-up-a-python-web-socket-with-aiohttp/sending-data-response.png)

### Conclusion

We have built a simple WebSocket by setting up an AioHTTP server and client and sending data between them. Check the following resources to learn more about the AioHTTP client and server.

- [AioHTTP client](https://docs.aiohttp.org/en/stable/client.html#aiohttp-client)
- [AioHTTP server](https://docs.aiohttp.org/en/stable/web.html#aiohttp-web)
- [AioHTTP tutorials](http://demos.aiohttp.org/en/latest/)
