This article is about Sockets. It will give you a glimpse of how clients and servers communicate over the internet.

### Introduction

Socket programming is a means of communicating data between two computers across a network. Connections can be made using either a **connection-oriented protocol** or a **connectionless protocol**. TCP/IP, a connection-oriented protocol, will be used in our case.

Before exchanging data, two computers must establish a link that is for connection-oriented protocols. UDP (User Datagram Protocol) is the only option for connectionless protocol.

To demonstrate sockets further, we shall use the Client/Server architecture. Client and server communicate by writing to and reading from the socket connection. The machines must have each other's network information to make this connection.

### Table of contents:
- [Definition of a Socket](#definition-of-a-socket)
- [Programming on the Server-side ](#programming-on-the-server-side)
- [Programming on the Client-side](#programming-on-the-client-side)
- [How to Run Programs in a Variety of Applications](#how-to-run-programs-in-a-variety-of-applications)
- [Conclusion](#conclusion)

### Definition of a Socket

A Socket is a communication **endpoint** that serves as a link between two machines on a network. It has a port number, which the TCP/IP layer can use to identify the application that receives the data. Additionally, a port number and an IP address are what make up an endpoint.

#### What is TCP?
Transmission Control Protocol (TCP) - This is one of the most important protocols of the Internet Protocols suite. It is a widely used protocol for data transmission in a network that operates in Client/Server point-to-point mode.

#### Two categories of Sockets:

1. A server socket - awaits a request from a client.
2. A client socket - establishes communication between client and server.

#### The client has to know two things about the server:

1. Its server's IP address 
2. Its port number

>The ports 0-1023 are for administrative use only (e.g.,  21 for FTP, 23 for Telnet, 25 for email, and 80 for HTTP). In our program, we'll be using port number 5000.

#### When we make a socket connection in the Java programming language, we go through the following steps:

- The Server constructs a `ServerSocket` object to specify the port number on which our conversation will occur. Exception handling methods are in use whenever an I/O error occurs. **Throws** an **I/OException** or a **try** **catch** block is used.

- The `accept()` method is called by the server. This method is used to accept an incoming request to the socket.

- A client creates a `Socket` object, giving the server name and the connecting port number as the server awaits.

- The `Socket` class constructor will attempt to connect the client to the server and port number provided. The client now has a socket object that can connect to the server if communication occurs.

If the connection is successful, the client and server can then communicate using **I/O streams**. The client and server socket classes provide the **I/O streams**. The client's OutputStream communicates with the server's InputStream, and the server's OutputStream communicates with the client's InputStream.

A stream is a collection of sequenced data, in case you didn't know. 

#### There are two types of streams:
1. A character stream (usually used with text files).
2. A byte stream (usually used with images).

A character stream is in human-readable language while a byte stream is in machine language, a language understandable by the CPU.

>In this situation, the client and server will simultaneously broadcast messages to each other's streams. Because TCP is a two-way communication protocol, this is conceivable.

#### Programming on the Server-side

A server socket is an object of the ServerSocket that uses the constructor below:

```java
serversocket = new ServerSocket(int port)
```
Port: the port number on which the server will listen for the client's requests.

>The ServerSocket object stays idle, waiting for network requests. Our client will attempt to connect to port 5000, which we have specified.

**Note** :
Make sure the ports are the same otherwise, the connection will fail.

There will be two while loops in use:

**First Loop** - This ensures that the server is indeed running.
**Second Loop** - Ensures that the server interacts with the client after connection until the client disconnects.

```java
while (true)
{  
    try {  
        socket = serversocket.accept();  
        
        inputStreamReader = new InputStreamReader(socket.getInputStream());  
        outputStreamWriter = new OutputStreamWriter(socket.getOutputStream()); 
        
        bufferedReader = new BufferedReader(inputStreamReader);  
        bufferedWriter = new BufferedWriter(outputStreamWriter);  
        while (true) 
        { 
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
   
#### Methods used in Server-side program
- `public InputStream getInputStream()` - returns an InputStream object that receives data.
- `public OutputStream getOutputStream()`- returns an OutputStream for sending data.
- `public Socket accept()` - Waits for client connection (the program won't continue until the client is connected). When you connect, you'll get a socket object that you may use to communicate with the client. 
- `BufferReader()` - Wraps inputStreamReader to improve efficiency
- `BufferWriter()` - Wraps outputStreamReader to improve efficiency
- `BufferedWriter.flush()` - Flushes the output streams. It forces any buffered output bytes to be written out. The flush method is invoked when the buffer is full.
- `void close()` - closes the server socket i.e. stops waiting for requests from clients.

#### Full Server-Side Application
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

              while (true)
              {  
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
```
Connected
Client: Hey there 
Client: I am doing this for the first time
Client: BYE
Closing connection
```
### Programming on the Client-side

#### Establish a Socket Connection
There are two ways to get a Socket instance:

1. The server receives it as a return value of the accept method.
2. You can use the following code to create a Socket:

```java
socket = new Socket("localhost", 5000);
```
Localhost is a domain name that redirects you to your computer, a good example is google.com. It resolves to 127.0.0.1 as the IP address.
A port number is in the second argument.

We generate I/O streams using the socket object, just as we did before:

```java
inputStreamReader = new InputStreamReader(socket.getInputStream());  
outputStreamWriter = new OutputStreamWriter(socket.getOutputStream());
``` 
Client-side, we need to use a Scanner object to get input from the user from the console/terminal. 

```java
Scanner scanner = new Scanner(System.in);
```
`System.in` specifies that we are getting the keyboard input.

#### Methods and objects used in client-side program
- `public InputStream getInputStream()` - returns an InputStream object for receiving data. Our Server will keep on receiving messages until client sends "BYE".
- `public OutputStream getOutputStream()`- returns an OutputStream for sending data.
- `BufferReader()` - Wraps inputStreamReader to improve efficiency
- `BufferWriter()` - Wraps outputStreamReader to improve efficiency
- `BufferedWriter.flush()` - Flushes the output streams. It forces any buffered output bytes to be written out. The flush method is invoked when the buffer is full.
- `void close()`- closes all streams and the socket.
  
#### Full Client-Side Application
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
            while (true)
            {  
                String msgToSend = scanner.nextLine();  
                bufferedWriter.write(msgToSend);  
                bufferedWriter.newLine();  
                bufferedWriter.flush();  
                
                System.out.println("Server: " + bufferedReader.readLine());  
                
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
A sample output of this code:
```
Hey there 
Server:  Message Received
I am doing this for the first time
Server:  Message Received
BYE
Server:  Message Received
```
### How to Run Programs in a Variety of Applications
#### Using Intellij or another integrated development environment:
- compile the two programs.
- **Run** the server program first, then the client application.
- Type messages in the client window, which will be received and shown by the server window at the same time.
- To exit, type **BYE**.

#### If you're using Command Prompt/Terminal:
- Make a new folder named project(it's your package name).
- Put the Server.java and Client.java into the project folder.
- Open the CMD and cd (change directory) to the root path.
-  Run javac project\Server.java.
-  Run java project.Server.
- Run the client program using the same process as the Server program.
- Then, in the client window, type messages.

Example:
```
Hey there 
Server:  Message Received
I am doing this for the first time
Server:  Message Received
BYE
Server:  Message Received
```
4. The server receives the messages and simultaneously shows:

```
Connected
Client: Hey there 
Client: I am doing this for the first time
Client: BYE
Closing connection
```
>Note of importance:
If the port is already in use, the port number may result in an error. To solve the issue, change the port number to a value that isn't commercially licensed.

### Conclusion 
In this tutorial, we learned about sockets and the TCP/IP protocol. We covered the fundamentals of socket programming and how they relate to the Java programming language. We've also gotten a clear picture of the data flow and client/server interaction.
I strongly advise the reader to apply what they've learned so far to writing networking programs in the Java programming language.
