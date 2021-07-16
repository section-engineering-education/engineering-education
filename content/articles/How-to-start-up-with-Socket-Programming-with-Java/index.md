
This is an article about Sockets. It will give you a glimpse of how clients and servers communicate over the internet.

### Introduction
Socket programming is a way of connecting two computers over a network to allow the exchange of information.The connection can be through **connection-oriented protocol** or **connectionless**. In our case, we will be using  TCP/IP a connection-oriented protocol.

In connection-oriented protocols, two computers must establish a connection before transferring data. Whereas in connectionless, you do not need every packet to arrive at its desired destination. This is made possible by UDP(User Datagram Protocol)

We will be using the Client\Server architecture to illustrate more on sockets. Client and server communicate by writing to and reading from socket connection.To establish this connection,the machines must have each other's network information.

Table of contents:
- [Definition-of-a-Socket](#definition-of-a-socket)
- [Server-Side-Programming ](#server-side-programming)
- [Client-Side-Programming](#client-side-programming)
- [How-to-Run-the-Programs-on-different-applications](#how-to-run-the-programs-on-diffrent-applications)
- [Conclusion](#conclusion)


### Definition of a Socket
A socket is an **endpoint** of communication, acting as a connection between two computers on a network. It contains a socket number that the TCP layer can use to identify the application to which data will be transmitted. Additionally an endpoint is made up of a port number and an IP address.

There are two types of sockets

1. Server socket - which waits for a request from clients
2. Client socket - can be used to send and receive a request from clients.

The client must know two information about the server:
1.IP address of Server and 
2.Port number

>Port number 0-1024 are reserved for administrative purposes(e,g 21 for FTP,23 for Telnet,25 for email and 80 for HTTP).In our program we will use port number 5000.

Whenever we create a socket connection in Java, the following steps take place:

1. Server creates a `ServerSocket` object, to indicate which port number our communication is to occur. If an I/O  error occurs, exception handling mechanisms are implemented; **Throws** an **I/OException** or a **try** **catch** block is used.
2. The `accept()` function of the ServerSocket class is called by the server. This method waits for a client to connect to the server on a specific port before returning.
3. A client builds a `Socket` object, giving the name of the server and the connecting port number as the server awaits.
4. The `Socket` class constructor will try to connect the client to the server and port number provided. The client now has a `socket` object that if communication is established, may connect with the server.
5. The `accept()` method on the server produces a reference to a new server socket that is connected to the client's socket.
 
If the connection is successful, client and server can then communicate using **I/O streams**. The **I/O streams** come from socket objects of the client and server. The client's `OutputStream` connects to the server's `InputStream` while the server's `OutputStream` connects to the client's `InputStream`.

Incase you don't know, a stream is a collection sequenced data. They can be divided into two categories:
1. Character stream (usually used with text files)
2. Byte stream (usually used with images)

Character stream is in human-readable language while byte stream is in machine language, a language understandable by the CPU.

In our case, the client and server will send messages to each other's streams in parallel.This is made possible because TCP is a two-way communication protocol.
   
### Server-side Programming 

A server socket is an instance of `ServerSocket` class and can be created by one of the following constructor: 

```java
serversocket = new Serversocket (int port)
```

port: port number at which the server will be listening for requests from clients.

The ServerSocket object sits and waits for network requests to arrive. Our client will try to connect to port number 5000 that we selected. 

**Note** Make sure the ports are same otherwise there will be no connection
Two while loops will be in use: 

**First Loop**- This is to ensure the server is constantly running.

**Second Loop**- Ensures that once the client is connected, the server interacts with the client until the client disconnects.

```java
while (true)
{  
    try {  
   socket = serversocket.accept();  
   
   inputStreamReader = new InputStreamReader(socket.getInputStream());  
   outputStreamWriter = new OutputStreamWriter(socket.getOutputStream()); 
   
   bufferedReader = new BufferedReader(inputStreamReader);  
   bufferedWriter = new BufferedWriter(outputStreamWriter);  
  while (true) { 

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
   
#### Methods used in ServerSocket

-`public InputStream getInputStream()` - returns an InputStream object that receives data.
-`public OutputStream getOutputStream()`- returns an OutputStream for sending data.
-`public Socket accept()` - Waits for client connection( the program won't continue until the client is connected). When you connect, you'll get a socket object that you may use to communicate with the client. 
-`void close ()` - closes the server socket i.e stops waiting for requests from clients.

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

The output of this  program is:

```
Connected
Client: Hey there 
Client: am doing this for the first time
Client: BYE
Closing connection
```

### Client-side Programming
#### Establish a Socket Connection

A Socket instance can be obtained in two ways: 
    
1. Server side receive it as a return value of the accept method.
2. You can instatiate it as a Socket like so:

```java
socket = new Socket("localhost", 5000);
```

localhost - is a domain name like google.com,which takes you to your computer. It is resolved to IP address 127.0.0.1 .
Additionally, the second argument is a port number.

Like before we create I/O streams via the socket object:

```java
inputStreamReader = new InputStreamReader(socket.getInputStream());  
outputStreamWriter = new OutputStreamWriter(socket.getOutputStream());
``` 

Client-side, we need to use a Scanner object to get input from the user from the console/terminal. 

```java
Scanner scanner = new Scanner(System.in);
```

System.in specifies that we are getting the keyboard input.

#### Methods used in Client Socket
1. `public InputStream getInputStream()` - returns an InputStream object for receiving data. Our Server will keep on receiving messages until client sends "BYE".
2. `public OutputStream getOutputStream()`- returns an OutputStream for sending data.
3. `BufferReader()` - Wraps inputStreamReader to improve efficiency
4. `BufferWriter()` - Wraps outputStreamReader to improve efficiency
5. `BufferedWriter.flush()` - Flushes the streams...The flush method is invoked when the buffer is complete.
6. `void close()`- closes all streams and the socket.
  
### Full Client-Side Application
```java
package com.company;  
  
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
am doing this for the first time
Server:  Message Received
BYE
Server:  Message Received

```
### How to run the Programs on Diffrent Applications.
#### Using Intellij or any other IDE
1. Compile the two 
2. First execute the program
3. On the server **run**, then run the program client **run* 
4. Type messages in the client's window which will be simultaneously received and shown by the server window.
5. Type **BYE** to end.

#### If using Command prompt/Terminal
1. Depending on how you stored it, start the server program as the java server.
2. Run the client application on a terminal like a java customer.
3. Then type messages in the client window.

Example 
```
Hey there 
Server:  Message Received
am doing this for the first time
Server:  Message Received
BYE
Server:  Message Received
```
4.The server receives and simultaneously shows:

```
Connected
Client: Hey there 
Client: am doing this for the first time
Client: BYE
Closing connection
```
 Important note
Port number may cause an error if the port is already in use. To fix this, change the port number to a value that is not commercially owned.

### Conclusion 

In this article,we got an insight into sockets and TCP/IP protocol. We went through what socket programming entails and its relation to Java. We have also seen a clear picture of client/server relationship, including the flow of data between the two.
I urge the reader to use the knowledge learned above to write networking programs in java programming language.
