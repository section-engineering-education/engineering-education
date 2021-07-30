---
layout: engineering-education
status: publish
published: true
url: /socket-programming-in-java/
title: Understanding Socket Programming in Java
description: This tutorial will introduce the reader to the basics of socket programming in Java. They will understand how clients and servers communicate over the internet.
author: apondi-ashley
date: 2021-07-30T00:00:00-13:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/socket-programming-in-java/hero.png
    alt: Understanding Socket Programming in Java
---
Socket programming is a means of communicating data between two computers across a network. Connections can be made using either a connection-oriented protocol or a connectionless protocol. In our case, we will use TCP/IP which is a connection-oriented protocol.
<!--more-->
Before exchanging data, computers must establish a link that is for connection-oriented protocols. UDP (User Datagram Protocol) is the only option for connectionless protocol.

To demonstrate sockets further, we shall use the Client/Server architecture. Client and server communicate by writing to and reading from the socket connection.

### Definition of a socket
A socket is a communication **endpoint** that serves as a link between two machines on a network. It has a `port number`, which the TCP/IP layer can use to identify the application that receives the data. An endpoint usually includes a `port number` and an `IP address`.

#### What is TCP?
Transmission Control Protocol (TCP) is a widely used protocol for data transmission on a network that supports client/server end points.

#### Two categories of Sockets:
1. A server socket - It awaits a request from a client.
2. A client socket - It establishes communication between client and server.

The client has to know two things about the server:
1. The server's IP address. 
2. The port number.

> Ports between 0 and 1023 are mainly used for administrative purpose (e.g.,  21 for FTP, 23 for Telnet, 25 for email, and 80 for HTTP). In our program, we'll be using port number `5000`.

### Creating a socket connection 
In Java, we create a socket connection by doing the following steps:

The server constructs a `ServerSocket` object to specify the port number on which our conversation will occur. Exception handling methods are in use whenever an I/O error occurs. 

The `accept()` method is called by the server to validate an incoming request to the socket.

A client then creates a `Socket` object by specifying the `server name` and the `port number`.

The `Socket` class constructor attempts to connect the client to the server using the provided port number.

If the connection is successful, the client and server can then communicate using `I/O streams`. The client and server socket classes are responsible for the **I/O streams**. 

The client's `OutputStream` communicates with the server's `InputStream`, and the server's `OutputStream` communicates with the client's `InputStream`. 

A stream is basically a collection of sequenced data. 

The two major types of streams are:
1. A character stream (usually used with text files).
2. A byte stream (used with images).

A character stream is in human-readable language while a byte stream is in machine language.

> In this situation, the client and server will simultaneously broadcast messages to each other's streams because TCP is a two-way communication protocol.

### Programming the server-side application
A `serversocket` is an object of the `ServerSocket` that uses the constructor below:

```java
serversocket = new ServerSocket(int port)
```

Port: The port number on which the server will listen for the client's requests.

>The ServerSocket object stays idle, waiting for network requests. Our client will attempt to connect to port `5000`.

> Make sure the ports are the same, otherwise, the connection will fail.

We will use two `while` loops:

- **First Loop** - This ensures that the server is indeed running.
- **Second Loop** - It ensures that the server interacts with the client after connection until the client disconnects.

```java
while (true){ //ensures server is running  
    try {  
        socket = serversocket.accept();  
        
        inputStreamReader = new InputStreamReader(socket.getInputStream());  
        outputStreamWriter = new OutputStreamWriter(socket.getOutputStream()); 
        
        bufferedReader = new BufferedReader(inputStreamReader);  
        bufferedWriter = new BufferedWriter(outputStreamWriter);  
        while (true) { // ensures server interacts with the client
            String msgFromClient = bufferedReader.readLine();  
            
            System.out.println("Client: " + msgFromClient); 
            bufferedWriter.write(" MSG Received");  
            bufferedWriter.newLine();  
            bufferedWriter.flush();  
            
          if (msgFromClient.equalsIgnoreCase("BYE"))  
              break;  
  
         }
         socket.close();  
         inputStreamReader.close();  
         outputStreamWriter.close();  
         bufferedReader.close();  
         bufferedWriter.close();  
    
     } catch (IOException e) {  
        e.printStackTrace();  
  }  
}
```

We used the following methods for the server-side program above:

- `public InputStream getInputStream()` - It returns an `InputStream` object that receives data.
- `public OutputStream getOutputStream()`- It returns an `OutputStream` object for sending data.
- `public Socket accept()` - It awaits for client connection (the program won't continue until the client is connected). When you connect, you'll get a socket object that you can use to communicate with the client. 
- `BufferedReader()` - It wraps inputStreamReader to improve efficiency.
- `BufferedWriter()` - It wraps outputStreamReader to improve efficiency.
- `BufferedWriter.flush()` - Flushes the output streams. It forces any buffered output bytes to be over written. The flush method is invoked when the buffer is full.
- `void close()` - This method closes the server socket i.e. stops waiting for requests from clients.

Here is the entire code for the server-side application:

```java
package com. company; 
 
import java.io.*;  
import java.net.ServerSocket;  
import java.net.Socket;  
  
public class Server {  
  
  public static void main(String[] args) throws IOException {   
      Socket socket ;  
      InputStreamReader inputStreamReader ;  
      OutputStreamWriter outputStreamWriter ;  
      BufferedReader bufferedReader ;  
      BufferedWriter bufferedWriter ;  
      ServerSocket serversocket ;  
  
      serversocket = new ServerSocket(5000);  
  
      while (true) {  
          try {  
         
              socket = serversocket.accept();  
      
              inputStreamReader = new InputStreamReader(socket.getInputStream());  
              outputStreamWriter = new OutputStreamWriter(socket.getOutputStream());  
              bufferedReader = new BufferedReader(inputStreamReader);  
              bufferedWriter = new BufferedWriter(outputStreamWriter);  

              while (true){  
                  String msgFromClient = bufferedReader.readLine();  
                  System.out.println("Client: " + msgFromClient);   
                  bufferedWriter.write(" MSG Received"); 
                  bufferedWriter.newLine();  
                  bufferedWriter.flush(); 

                  if (msgFromClient.equalsIgnoreCase("BYE"))  
                  break;  
              }  
              socket.close();  
              inputStreamReader.close();  
              outputStreamWriter.close();  
              bufferedReader.close();  
              bufferedWriter.close();  

          } catch (IOException e) {  
              e.printStackTrace();  
          }  
        }  
    }  
}
```

A sample output of this code is:

```bash
Connected
Client: Hey there 
Client: I am doing this for the first time
Client: BYE
Closing connection
```

### Programming the client-side application
There are two ways to access a `Socket` instance:

1. The server receives it as a `return` value of the `accept()` method.
2. You can also use the following code to create a `Socket`:

```java
socket = new Socket("localhost", 5000);
```

In the code above, a `localhost` is a domain name that redirects you to your computer. It resolves to `127.0.0.1` as the `IP` address. A port number is in the second argument.

We generate `I/O` streams using the socket object, as shown below:

```java
inputStreamReader = new InputStreamReader(socket.getInputStream());  
outputStreamWriter = new OutputStreamWriter(socket.getOutputStream());
``` 

On the client-side, we need to use a `Scanner` object to get user input: 

```java
Scanner scanner = new Scanner(System.in);
```

`System.in` specifies that we are getting the keyboard input.
  
Here is the full code for the client-side application:

```java
package com. company;  
  
import java.io.*;  
import java.net.Socket;  
import java.util.Scanner;  
  
public class client {  

    public static void main(String[] args) {  
        Socket socket = null;  
        InputStreamReader inputStreamReader = null;  
        OutputStreamWriter outputStreamWriter = null;  
        BufferedReader bufferedReader = null;  
        BufferedWriter bufferedWriter = null;  
        
        try {  
            socket = new Socket("localhost", 5000);  
            inputStreamReader = new InputStreamReader(socket.getInputStream());  
            outputStreamWriter = new OutputStreamWriter(socket.getOutputStream());  
            bufferedReader = new BufferedReader(inputStreamReader);  
            bufferedWriter = new BufferedWriter(outputStreamWriter);  

            Scanner scanner = new Scanner(System.in);  
            while (true){  
                String msgToSend = scanner.nextLine();  
                bufferedWriter.write(msgToSend);  
                bufferedWriter.newLine();  
                bufferedWriter.flush();  
                
                System.out.println("Server: " + bufferedReader.readLine());  //printing the server message
                
                if (msgToSend.equalsIgnoreCase("BYE"))  
                    break;  
            }  
        } catch (IOException e) {  
            e.printStackTrace();  
        } finally {  
             try {  
                  if (socket != null)  
                  socket.close();  
                  if (inputStreamReader != null)  
                    inputStreamReader.close();  
                  if (outputStreamWriter != null)  
                  outputStreamWriter.close();  
                  if (bufferedReader != null)  
                  bufferedReader.close();  
                  if (bufferedWriter != null)  
                  bufferedWriter.close();  
             } catch (IOException e) {  
            e.printStackTrace();  
          }  
       }  
    }  
}
```

A sample output of this code is shown below:

```bash
Hey there 
Server:  Message Received
I am doing this for the first time
Server:  Message Received
BYE
Server:  Message Received
```

### Testing the applications
#### Using Intellij or other IDEs
- Compile the two programs.
- **Run** the server program first, then the client application.
- Type messages in the client window, which will be received and shown by the server window at the same time.
- To exit, type **BYE**.

#### Using command prompt/terminal
- Make a new folder named `project` (it's your package name).
- Put the `Server.java` and `Client.java` into the `project` folder.
- Open the `command prompt` and navigate to the `root` path.
- Execute `javac project\Server.java` and then `java project.Server`.
- Run the `client` program using the same process as the `Server` program.
- You can then type messages in the `client` window.

Example:

```bash
Hey there 
Server:  Message Received
I am doing this for the first time
Server:  Message Received
BYE
Server:  Message Received
```

> If the port is already in use, the application may result in an error. To solve this issue, change the port number to a unique value.

### Conclusion 
In this tutorial, we learned about sockets and the TCP/IP protocol. We specifically covered the fundamentals of socket programming in Java. 

Furthermore, we discussed how data flow and client/server interactions work. You can, therefore, use this knowledge to build other highly productive applications.

Happy coding!

---
Peer Review Contributions by: [Wanja Mike](/engineering-education/content/authors/michael-barasa/)