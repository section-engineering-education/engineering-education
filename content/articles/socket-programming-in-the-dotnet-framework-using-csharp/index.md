---
layout: engineering-education
status: publish
published: true
url: /socket-programming-in-the-dotnet-framework-using-csharp/
title: Socket Programming in The .NET Framework Using C#
description: This tutorial will take the reader through the the concept of socket programming. This will be a server side implementation of the socket programming in the .NET frameworks using C#.
author: geoffrey-omukuba
date: 2022-03-09T00:00:00-21:40
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/socket-programming-in-the-dotnet-framework-using-csharp/hero.png
    alt: Socket Programming in The .NET Framework Using C# Hero Image
---

Let's say there are two computer devices on a network that needs to communicate with each other. To enhance communication between these devices, we set one device on a socket of a specific port and an IP address. The other device wil be able to communicate with the first device through the same port and IP address if they on the same socket or network.
<!--more-->
In the .NET framework, we have the `Socket` class that enables network programming. This class handles both synchronous and asynchronous modes of network programming.

In asynchronous programming, our program can continue doing other tasks and receiving data while it waits for other tasks to be executed. In synchronous programming, tasks are only done one at time and follow the order in which they come in. In this state, our program can only handle one task until it completes, then it accepts another task.

Thus, this calls us to look at how asynchronous socket programming is handled and how we can develop one in C#. By doing this, we will build a simple server-side console application.

### Table of contents
- [Table of contents](#table-of-contents)
- [Prerequisites](#prerequisites)
- [Getting started](#getting-started)
- [C# namespaces](#c-namespaces)
- [Server-side socket programming](#server-side-socket-programming)
- [Conclusion](#conclusion)

### Prerequisites
To better understand this tutorial, you will need to:
- have some basic knowledge of [C#](https://docs.microsoft.com/en-us/dotnet/csharp/)
- be familiar with [.NET frameworks](https://docs.microsoft.com/en-us/dotnet/framework/)
- An IDE, [Microsoft Visual Studio](https://visualstudio.microsoft.com/downloads/) is the recommended one for the [.NET frameworks](https://docs.microsoft.com/en-us/dotnet/framework/)development.

### Getting started
To be able to create our application, we will start by creating a project. Open [Microsoft Visual Studio](https://visualstudio.microsoft.com/downloads/) and click on the new project as shown in the image below.

![New Project](/engineering-education/socket-programming-in-the-dotnet-framework-using-csharp/new.png)

Since we are creating a console application, we will click on `Console Application`, the one that is using C#, and click next.

![Console application](/engineering-education/socket-programming-in-the-dotnet-framework-using-csharp/console.png)

On the next screen, we are required to enter the name of our application. In this case, we will use `ConsoleApp1` as the name of our application.

![Name of our project](/engineering-education/socket-programming-in-the-dotnet-framework-using-csharp/name.png)

On the next screen, we are required to select the target framework for our application, we will use `.NET 5.0` and then click on create, to create our application.

![Target framework](/engineering-education/socket-programming-in-the-dotnet-framework-using-csharp/framework.png)

In this application, we will mainly look at server-side socket programming.

### C# namespaces
This project will use the following C# namespaces.

```C#
using System;
using System.Net.Sockets;
using System.Text;
using System.Threading;
using System.Net;
```

### Server-side socket programming
We will start by creating the server-side of our application. We will start by writing our code in the `program.cs`. The first thing we will do is to create a public class and call it `AppState`. Inside this class, we will define a socket and call it `socket` and set it to null. We will also define an integer and give it a data size of 1024 bytes.

We will define a byte array that will be able to hold the new data and pass in the data size we initialized above. The last thing we need in this class is a string builder and we will initialize it new.

```c#
public class ProgramState
        {
            public Socket socket = null;
            public const int dataSize = 1024;
            public StringBuilder sBuilder = new StringBuilder();
        }
```
We will again create another class which will be a socket listener. In this class we will do the following:
- set a reset event for all completed tasks and set its initial parameter to false.
- Add a method to start the listener and in the method, we will add a byte array and set it to a new instance and set it to 1024.
  - Add an IP host entry and get the host entry by passing in the hostname of the DNS server.
  - Next, we set the IP address of the host and pick the first element of it.
  - Next, we will set the endpoint IP address and set it to a new IP on port 80.
  - We then initialize another socket and call a listener and pass in the IP address family, set a stream, and a protocol.
  - Now, we can try and start our application and catch any errors in the application. We will do this by using the `try...catch` method.

In our try method, we will bind our listener to the local endpoint and set the listen backlog `111`.  We will use a while loop to wait for any incoming connections. In the catch method, we will be printing the message on the screen using the `e.Message` method.

```C#
 public class AsyncSocketListener
 {
     public static ManualResetEvent completed = new ManualResetEvent(false);
     public static void StartListener()
     {
         byte[] dataSize = new byte[1024];
         IPHostEntry hostEntry = Dns.GetHostEntry(Dns.GetHostName());
         IPAddress ip = hostEntry.AddressList[0];
         IPEndPoint localEnd = new IPEndPoint(ip, 4444);
         Socket eventListener = new Socket(ip.AddressFamily, SocketType.Stream,ProtocolType.Tcp);
         try
         {
             eventListener.Bind(localEnd);
             eventListener.Listen(111);
             while (true)
             {
                 completed.Reset();
                 Console.WriteLine($"Waiting for new connections...");
                 eventListener.BeginAccept(new AsyncCallback(AcceptCallBack), eventListener);
                 completed.WaitOne();
             }
         }
         catch(Exception e)
         {
             Console.WriteLine(e.Message);
             throw;
         }
     }
```

In the while loop we created above, we realize that we are getting, so what we need to do is to create a method to handle the `AcceptCallBack` event. In this method, we will set the completed tasks to void by using empty brackets. We will also define a socket as a listener and initialize it with the `asyncState`. We then define another socket as a handler and use the `EndAccept` method to initialize it. We will define the program state and initialize it with the `new`  keyword.

We will set the state of our handler and use it to start receiving data. With this, we will use the `.BeginReceive` method and the pass in the data, program state, and the callback event as parameters.

```C#
 private static void AcceptCallBack(IAsyncResult ar)
            {
                completed.Set();
                Socket eventListener = (Socket)ar.AsyncState;
                Socket handler = eventListener.EndAccept(ar);
                ProgramState state = new ProgramState();
                state.socket = handler;
                handler.BeginReceive(state.data, 0, ProgramState.dataSize, 0, new AsyncCallback(ReadCallBack), state);
            }
```

From the method above, we realize that we are getting errors when we pass in the `ReadCallBack` function as a parameter to the begin receive method. To remove this error, we will create another method to handle the `ReadCallBack` even. Inside this method, we will create a string and call it content and set it to empty using the `Empty` method.

We will create the program state and initialize it with the `ar.AsyncState` method. We need to define where the data read will be stored after the connection is established. So, we will initialize the data read variable with the `handler.EndReceive` method.

We will use an if statement to print the data read on the screen in case the data is greater than zero. We will need to encode this data using the `ASCII` method before printing it on the screen, then covert the data read in `ASCII ` to string. If the connection is set and the data is read, we need to send a response to the client. With this, we will create the `Send` event and pass in the `handler` and `content` as parameters.

```C#
 private static void ReadCallBack(IAsyncResult ar)
            {
                string content = string.Empty;
                ProgramState state = (ProgramState)ar.AsyncState;
                Socket handler = state.socket;
                int dataRead = handler.EndReceive(ar);
                if(dataRead > 0)
                {
                    state.sBuilder.Append(Encoding.ASCII.GetString(state.data, 0, dataRead));
                    content = state.sBuilder.ToString();
                    if (content.IndexOf("<EOF>", StringComparison.Ordinal) > -1)
                    {
                        Console.WriteLine($"Read:{content.Length} data from \n socket data:{content}");
                        Send(handler, content);
                    }
                }
                else
                {
                    handler.BeginReceive(state.data, 0, ProgramState.dataSize, 0, new AsyncCallback(ReadCallBack), state);
                }
            }
```

When we created the method above, we got an error that requires us to create the `Send` method. In this method, we will have a byte array and name it `sizeOfData` and pass in the content of our data. We then use the `BeginSend` function on our handler and pass in the `sizeOfData`, data length, handler as parameters. `new AsyncCallBack` is a parameter in this function that receives `SendCallBack` as another parameter.

```C#
private static void Send(Socket handler, string content)
            {
                byte[] sizeOfData = Encoding.ASCII.GetBytes(content);
                handler.BeginSend(sizeOfData, 0, sizeOfData.Length, 0, new AsyncCallback(SendCallBack), handler);
            }
```

The `SendCallBack` argument in the above method generates an error that requires us to create another method called `SendCallBack`. In this method we will use a `try...catch` method and add a socket handler, and define the data sent to the client. We will be closing the connections on both ends once data is sent. The `catch `method is used to check for any errors in the connection.

```C#
private static void SendCallBack(IAsyncResult ar)
            {
                try
                {
                    Socket handler = (Socket)ar.AsyncState;
                    int dataSent = handler.EndSend(ar);
                    Console.WriteLine($"Send:{dataSent} to client");
                    handler.Shutdown(SocketShutdown.Both);
                    handler.Close();
                }
                catch (Exception e)
                {
                }
            }
```

Now the last thing is to implement our application in the `main` function, in this we will use the `Console.WriteLine` method to display a message on the screen. The `Console.ReadLine` will be used to take data from the user and then we will start our listener in the main function.

```C#
        static void Main(string[] args)
        {
            Console.WriteLine("Press enter key to continue...");
            Console.ReadLine();
            AsyncSocketListener.StartListener();
            Console.ReadLine();
        }
```

### Conclusion
From this article, we can deduce socket programming is a better way for devices to communicate on a network. For example, if a computer device sends data on port `4444` and uses the TCP protocol, the data can be received on our device since our device will be acting as a server and the sender will be acting as a server.
