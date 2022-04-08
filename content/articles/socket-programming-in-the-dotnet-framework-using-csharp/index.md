---
layout: engineering-education
status: publish
published: true
url: /socket-programming-in-the-dotnet-framework-using-csharp/
title: Socket Programming in The .NET Framework Using C#
description: This tutorial will take the reader through the concept of socket programming. We will have a server side implementation of the socket programming concept in the .NET frameworks using C#.
author: geoffrey-omukuba
date: 2022-03-25T00:00:00-02:10
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/socket-programming-in-the-dotnet-framework-using-csharp/hero.png
    alt: Socket Programming in The .NET Framework Using C# Hero Image
---
Let us say there are two devices on a network that need to communicate with each other. To enhance communication between these devices, we set one device on a socket of a specific port and an IP address.
<!--more-->
The other device will be able to communicate with the first device through the same port and IP address if they are on the same socket or network. In the .NET framework, we have the `Socket` class that enables network programming. This class handles both synchronous and asynchronous modes of network programming.

In asynchronous programming, our program can continue doing other tasks and receiving data while it waits for other tasks to be executed. In synchronous programming, tasks are only carried out one at a time and follow the order in which they come in.

In this state, our program can only handle one task until it completes, then it accepts another task. Therefore, this calls us to look at how asynchronous socket programming is handled and how we can develop one in C#. To do this, we will build a simple server-side console application.

### Table of contents
- [Table of contents](#table-of-contents)
- [Prerequisites](#prerequisites)
- [Getting started](#getting-started)
- [C# namespaces](#c-namespaces)
- [Server-side socket programming](#server-side-socket-programming)
- [Conclusion](#conclusion)

### Prerequisites
To follow through this tutorial, you must:
- Have a basic knowledge of the [C#](https://docs.microsoft.com/en-us/dotnet/csharp/) programming language.
- Be familiar with [.NET frameworks](https://docs.microsoft.com/en-us/dotnet/framework/)
- Have an IDE installed. [Microsoft Visual Studio](https://visualstudio.microsoft.com/downloads/) is the recommended IDE for the [.NET framework](https://docs.microsoft.com/en-us/dotnet/framework/) development.

### Getting started
To create our application, we will start by creating a new project. Open [Microsoft Visual Studio](https://visualstudio.microsoft.com/downloads/) and click on `create new project` as shown in the image below:

![New Project](/engineering-education/socket-programming-in-the-dotnet-framework-using-csharp/new.png)

Since we are creating a console application, we will click on the `Console Application` which uses C# as the programming language, and click next.

![Console application](/engineering-education/socket-programming-in-the-dotnet-framework-using-csharp/console.png)

On the next screen, we are required to enter the name of our application. In this case, we will use `ConsoleApp1` as the name of our application.

![Name of our project](/engineering-education/socket-programming-in-the-dotnet-framework-using-csharp/name.png)

On the next screen, we are required to select the target framework for our application, we will use `.NET 5.0` and then click on create to create our application.

![Target framework](/engineering-education/socket-programming-in-the-dotnet-framework-using-csharp/framework.png)

In this application, we will mainly look at server-side socket programming.

### C# namespaces
This project will use the following C# namespaces:

```c#
using System;
using System.Net.Sockets;
using System.Text;
using System.Threading;
using System.Net;
```

### Server-side socket programming
We will start by creating the server-side of our application. To begin, we will write our code in the `program.cs` file.

The first thing we need to do is to create a public class and call it `AppState`. Inside this class, we will define a socket, name it `socket` and set it to null. We will also define an integer and give it a data size of 1024 bytes.

Next, we will define a byte array that will be able to hold the new data and pass in the data size we initialized above. The last thing we need to do in this class is to create a `string builder` and initialize it `new`:

```c#
public class ProgramState
        {
            public Socket socket = null;
            public const int dataSize = 1024;
            public StringBuilder sBuilder = new StringBuilder();
        }
```

We will again create another class which will be a socket listener. In this class we need do the following:
- Set a reset event for all completed tasks and set its initial parameter to false.
- Add a method to start the listener. In this same method, we will also add a byte array and set the new instance to 1024 bytes
- Add an IP host entry and get the host entry by passing in the hostname of the DNS server.
- Next, we set the IP address of the host and pick its first element.
- Afterwards, we will set the endpoint IP address and set it to a new IP on port 80.
- We then initialize another socket, call a listener and pass in the IP address family. Afterwards, we set a stream and a protocol.
- Finally, we can start our application and catch any errors in the application. We will do this by using the `try...catch` method.

In our try method, we will bind our listener to the local endpoint and set the listen backlog `111`. We will use a while loop to wait for any incoming connections.

In the catch method, we will print the message on the screen using the `e.Message` method:

```c#
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

In the while loop we created above, we realize that we are getting an error that requires us to create another method, the method we will be creating to remove the error is the `AcceptCallBack`. In this method, we will set the completed tasks to void by using empty brackets.

In this same method, we will create a socket as our listener. This listener will be initialized with the `asyncState`. We will create another socket as our handler. This method will be initialized with the `EndAccept` method. The program state which tells us the state of the connection we have currently will be initialized by the `new` keyword.

Next, we set the state of our handler, which we will use to start receiving data. With this, we can use the `.BeginReceive` method to pass in the data, program state, and the callback event as parameters:

```c#
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

From the method above, we realize that we are getting errors when we pass in the `ReadCallBack` function as a parameter to the begin receive method. To remove this error, we will create another method to handle the `ReadCallBack` even. Inside this method, we will create a string, call it `content`, and set it to empty using the `Empty` method.

We will create the program state and initialize it with the `ar.AsyncState` method. We need to define where the data read will be stored after the connection is established. So we will initialize the data read variable with the `handler.EndReceive` method.

We need to use an `if` statement to print the data read on the screen in case the data is greater than zero. We will need to convert this data into string because in socket programming, data encoding is necessary when it is presented in bytes format. In this case, we will use the `ASCII` encoding method to convert it to string format before printing it on the screen.

If the connection is set and data is read, we need to send a response to the client. Because of this, we will create the `Send` event and pass in the `handler`, and `content` as parameters:

```c#
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

When we create the method above, we realise that we are getting an error message that requires us to create the `Send` method. In the `Send` method, we will create a byte array, name it `sizeOfData`, and pass in the content of our data.

The `BeginSend` function below in our handler receives the `sizeOfData`, data length, and handler as parameters. `new AsyncCallBack` is a parameter in our function that receives `SendCallBack` as another parameter:

```c#
private static void Send(Socket handler, string content)
            {
                byte[] sizeOfData = Encoding.ASCII.GetBytes(content);
                handler.BeginSend(sizeOfData, 0, sizeOfData.Length, 0, new AsyncCallback(SendCallBack), handler);
            }
```

The `SendCallBack` argument in the method above generates an error message that requires us to create another method called `SendCallBack`. In the `SendCallBack` method, we will use a `try...catch` method, add a socket handler, and define the data sent to the client.

We will be closing the connections on both ends once data is sent and the `catch` method is used to check for any errors in the connection:

```c#
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

The last thing we need to do is to implement our application in the `main` function. We will use the `Console.WriteLine` method to display a message on the screen.

The `Console.ReadLine` will be used to take data from the user. With that, we can start our listener in the main function:

```c#
        static void Main(string[] args)
        {
            Console.WriteLine("Press enter key to continue...");
            Console.ReadLine();
            AsyncSocketListener.StartListener();
            Console.ReadLine();
        }
```

### Conclusion
From this article, we can deduce that socket programming is a better way for devices to communicate over a network. For example, if a device sends data on port `4444` using the TCP protocol, the data can be received on the other end. This is because our device will be acting as a recipient and the sender will be acting as a server.

---
Peer Review Contributions by: [Dawe Daniel](/engineering-education/authors/dawe-daniel/)
