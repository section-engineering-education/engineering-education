
This is an article about Sockets. It will give you a glimpse of how clients and servers communicate over the internet.

Table of content:
- [What is a socket](#what-is-a-socket)
- [Programming on Server-side](#programming-on-server-side)
- [](#)
- [](#)
- [](#)

### Introduction
Socket programming is a way of connecting two computers on a network to allow the exchange of information between the two machines that are running over `JRE`(Java Runtime Environment). The connection can be through **connection-oriented protocol** or **connectionless** but for our case, we will be using connection-oriented which is TCP/IP.

TCP is a connection-oriented protocol, which means that before data can be transferred, two computers must first establish a connection.

Connectionless -For this type of connection, UDP protocol (User Datagram Protocol)also a layer 2 protocol, is used to provide a good picture where you do not necessarily need every packet to arrive at its desired destination.

We will be using Client\Server architecture to illustrate more on sockets. Client and server communicate by writing to and reading from socket connection thus for a connection to happen between the server and a client, a socket must be present. The two machines should know each other's network information.

### What is a Socket?
A socket is an **endpoint** of communication, acting as a connection between two computers on a network. It contains a socket number that the TCP layer can use to identify the application to which data will be transmitted. An endpoint is made up of a port number and an IP address.

There are two types of sockets

1. Server socket - which waits for a request from clients
2. Client socket - can be used to send and receive a request from clients.

The client must know two information about the server:
1.IP address of Server and 
2.Port number

>Port number 0-1024 are reserved for administrative purposes(e,g 21 for FTP,23 for Telnet,25 for email and 80 for HTTP).

This happens when a TCP connection is being used between two machines:-

1. server creates a ServerSocket object, to indicate which port number our communication is to occur. If an I/O  error occurs, exception handling mechanisms are implemented; **Throws** an **I/OException** or a **try** **catch** block is used.
2. The accept() function of the ServerSocket class is called by the server. This method waits for a client to connect to the server on a specific port before returning.
3. A client builds an object in the socket, giving the name of the server and the connecting port number as the server awaits.
4. The Socket Class builder will try to connect the client to the server and port number provided. The client now has a socket object that, if communication is established, may connect with the server.
5. The accept() method on the server produces a reference to a new server socket that is connected to the client's socket.
 
If the connection becomes a success, communication can therefore be established using **I/O streams**. Each socket has an input and output stream. The client's OutputStream connects to an InputStream of the server while the server's OutputStream connects to the client's InputStream.

A stream is a collection of data in a particular order. Character streams can be divided into two categories:
1. Character stream (usually used with text files)
2. Byte stream(usually used with images)
Character stream is in human-readable language while byte stream is in machine language, a language understandable by the CPU.

Our data/messages will be sent across both streams at the same time because TCP is a two-way communication protocol.
   
### Programming on Server-side 
A server socket is an instance of ServerSocket class and can be created by one of the following constructors: 

```java
serversocket= new Serversocket ( int port )
```

port: port number at which the server will be listening for requests from clients.

The ServerSocket object sits and waits for network requests to arrive. Our client will try to connect to port 5000 that we created. 

**Note**Make sure the ports are similar otherwise there will be no connection
Two while loops will be in use: 

**First Loop**- This is to ensure the server is constantly running.

**Second Loop**- Ensures that once the client is connected, the server constantly interacts with the client until the client disconnects.

```java
while (true) {  
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
   
### Methods used in ServerSocket

-` public InputStream( getInputStream())` - returns an InputStream object that receives data.
- `public OutputStream( getOutputStream())`- returns an OutputStream for sending data.
- `public Socket accept ( )` -Waits for client connection( the program won't move to the next level until the client is connected). When you connect, you'll get a socket object that you may use to communicate with the client. 
-  void close ( ) - closes the server socket i.e stops waiting for requests from clients.

### THIS IS A SERVER PROGRAM THAT WILL BE ACCEPTING THE COMMUNICATION
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

### Client side Programming
# Establish a Socket Connection
This is an instance of a socket class and can be obtained in two ways: 
    
1. On the server side it can be used as a return value of the accept ( ) method.
2. The builder of socket objects accepts the hostname of the server on which the server operates and the server's port number.

```java
socket = new Socket("localhost", 5000);
```

localhost - is a domain name like google.com, localhost takes you to your computer. It is resolved to IP address 127.0.0.1 .
port - Port – This is built to connect with the server via the port number socket object.
Two computers communicate through sockets.

Client and Server communicate by writing to an output stream and reading from an input stream on the socket.

```java
inputStreamReader = new InputStreamReader(socket.getInputStream());  
outputStreamWriter = new OutputStreamWriter(socket.getOutputStream());
``` 

The Scanner class is used to get input from the user from the console/terminal. System. in is a keyboard input connected input stream system.

```java
Scanner scanner = new Scanner(System.in);
```

### Methods used in Client Socket
1. `public InputStream( getInputStream())` - returns an InputStream object for receiving data. Our Server will keep on receiving messages until client sends "BYE".
2. `public OutputStream( getOutputStream())`- returns an OutputStream for sending data.
3. `BufferReader( )` - Wraps inputStreamReader to improve efficiency
4. `BufferWriter( )` - Wraps outputStreamReader to improve efficiency
5. `BufferedWriter.flush( )` - Flushes the streams...The flush method is invoked when the buffer is complete.
6.  `void close() `- closes all streams and the socket.
  
### THIS IS A CLIENT PROGRAM THAT WILL BE COMMUNICATING WITH THE SERVER.
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
The output of the code:

```
Hey there 
Server:  Message Received
am doing this for the first time
Server:  Message Received
BYE
Server:  Message Received

```
### Procedure of How to run the two programs if using Intellij or any other IDE
1. Compile the two 
2. First execute the program
3. on the server **run**, then run the program client **run* 
4. Type client window messages that are simultaneously received and shown by the Server window.
5. Type **BYE** to end.

### If using Command prompt/Terminal
1. Depending on how you stored it, start the server program as the java server.
2. Then there are two. Run the client application on a terminal like a java customer.
3. Then Type messages in the client window

Example 
```
Hey there 
Server:  Message Received
am doing this for the first time
Server:  Message Received
BYE
Server:  Message Received
```
4.The server receives and simultaneously shows;

```bash
Connected
Client: Hey there 
Client: am doing this for the first time
Client: BYE
Closing connection
```
 Important note
Sending "BYE" closes the connection between the Client and the Server.
Port number may fail to work you can always change it and use a different one from those commercially owned.

### Conclusion 

In this article, we have been able to get an insight of sockets and TCP/IP protocol. We have understood what socket programming entails and its relation to Java. We have also seen a clear picture of client/server relationship, how server accepts information from client and sends it back.
I urge the reader to use the knowledge learned above to write programs on how server accepts the clients' request in java programming language.