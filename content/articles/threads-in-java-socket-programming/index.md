---
layout: engineering-education
status: publish
published: true
url: /threads-in-java-socket-programming/
title: Getting Started with Threads in Java Socket Programming
description: This tutorial will guide the reader through the process of creating an application utilizing threads in Java Socket Programming.
author: stephen-mutua
date: 2022-01-04T00:00:00-16:00
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/threads-in-java-socket-programming/hero.jpg
    alt: Threads in Java Socket programming hero image
---
Socket programming establishes communication between two computers on a network. Socket communication utilizes two protocols:
<!-- more -->
1. **User Datagram Protocol (UDP)**: This is a connectionless protocol. It is mainly used to establish a low latency connection between two nodes.
2. **Transport control protocol (TCP)**: This is a connection-oriented protocol. It is used to establish a connection between two nodes.

### Prerequisites
To follow along the reader will need to be familiar with:
1. The Java programming language.
2. Have a  code editor of your choice installed. I'll be using [IntelliJ IDEA](https://www.jetbrains.com/idea/).

### Table of contents
- [Threads](#threads)
- [Why threads](#why-threads)
- [Server-Side Programming](#server-side-programming)
- [Client-Side Programming](#client-side-programming)
- [Testing the program](#testing-the-program)
- [Conclusion](#conclusion)

### Threads
Threads allow a program to operate more efficiently by doing multiple things simultaneously. `Java.lang` is in charge of making and managing every thread in the `Java.Class` of threads.

### Why threads
It is also essential that the server is able to handle multiple clients at once. Having the ability to manage several consumers simultaneously is a requirement of our design framework. Our server-side architecture necessitates threading to assign each request to a data input stream thread as it arrives. 

To create a new Java thread, it is essential to:
- Implement the `Runnable` interface. It is possible by running `java.lang.Runnable`.
- Extend the `Thread` class by running `java.lang.Thread`.

### Server-Side Programming
Here are the classes that we will require.

#### Server class
Client-side construction shall begin with a collection of streams and port numbers from the server, and then the below steps:
- A while loop will build socket objects that receive connections from server socket objects.
- We will incorporate the streams of the requests into the current socket.
- Client handler objects are created by the class from streams and port numbers.
- Starting the program will be invoking the `start()` method. This new thread object's `start()` function must be invoked to begin operating.

#### ClientHandler class
The Thread's attributes are passed down to the framework-based client handler class. The class's constructor requires three parameters: `Socket`, `DataInputStream`, and `DataOutputStream`. The server gets the Thread's port number and data input and output stream objects when it creates it.

The Java server-side software includes the `Server` and `ClientHandler` classes.

1. Create a new Java class named `Serverclass` and update it with the code snippet below.

```java
import java.io.*;
import java.text.*;
import java.util.*;
import java.net.*;
public class Serverclass
{
	public static void main(String[] args) throws IOException
	{
		ServerSocket myserverSocket = new ServerSocket(5056);
		// getting client request
		while (true)
    // running infinite loop 
		{
			Socket mynewSocket = null;
			
			try
			{
				// mynewSocket object to receive incoming client requests
				mynewSocket = myserverSocket.accept();
				
				System.out.println("A new connection identified : " + mynewSocket);
        // obtaining input and out streams
				DataInputStream ournewDataInputstream = new DataInputStream(mynewSocket.getInputStream());
				DataOutputStream ournewDataOutputstream = new DataOutputStream(mynewSocket.getOutputStream());
				
				System.out.println("Thread assigned");

				Thread myThread = new ClientHandler(mynewSocket, ournewDataInputstream, ournewDataOutputstream);
				// starting
				myThread.start();
				
			}
			catch (Exception e){
				mynewSocket.close();
				e.printStackTrace();
			}
		}
	}
}
```
2. Create a new Java class named `ClientHandler` and update it with the code snippet below.

```java
class ClientHandler extends Thread
{
	DateFormat forourdate = new SimpleDateFormat("yyyy/MM/dd");
	DateFormat forourtime = new SimpleDateFormat("hh:mm:myserverSocket");
	final DataInputStream ournewDataInputstream;
	final DataOutputStream ournewDataOutputstream;
	final Socket mynewSocket;
	

	// Constructor
	public ClientHandler(Socket mynewSocket, DataInputStream ournewDataInputstream, DataOutputStream ournewDataOutputstream)
	{
		this.mynewSocket = mynewSocket;
		this.ournewDataInputstream = ournewDataInputstream;
		this.ournewDataOutputstream = ournewDataOutputstream;
	}

	@Override
	public void run()
	{
		String receivedString;
		String stringToReturn;
		while (true)
		{
			try {
				ournewDataOutputstream.writeUTF("Choose: [Date | Time]..\n"+
							"Or Exit");
				
				// getting answers from client
				receivedString = ournewDataInputstream.readUTF();
				
				if(receivedString.equals("Exit"))
				{
					System.out.println("Client " + this.mynewSocket + " sends exit...");
					System.out.println("Connection closing...");
					this.mynewSocket.close();
					System.out.println("Closed");
					break;
				}
				
				// creating Date object
				Date mynewDate = new Date();

				switch (receivedString) {
				
					case "Date" :
						stringToReturn = forourdate.format(mynewDate);
						ournewDataOutputstream.writeUTF(stringToReturn);
						break;
						
					case "Time" :
						stringToReturn = forourtime.format(mynewDate);
						ournewDataOutputstream.writeUTF(stringToReturn);
						break;
						
					default:
						ournewDataOutputstream.writeUTF("Invalid input");
						break;
				}
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
		
		try
		{
			// closing resources
			this.ournewDataInputstream.close();
			this.ournewDataOutputstream.close();
			
		}catch(IOException e){
			e.printStackTrace();
		}
	}
}

```
3. Run the `main` method in the `Serverclass`.

Output:

```bash
A new connection identified : Socket[addr=/127.0.0.1,port=60536,localport=5056]
Thread assigned
Client Socket[addr=/127.0.0.1,port=60536,localport=5056] sends exit...
Connection closing...
Closed
```

### Client-Side Programming
There are many similarities between client-side programming and traditional socket programming, which include:
- Establishing a socket Connection.
- Communication.

1. Create a new Java class named `NewClient` and update it with the code snippet below.
```java
import java.util.Scanner;
import java.io.*;
import java.net.*;


public class NewClient
{
    public static void main(String[] args) throws IOException
    {
        try
        {
            Scanner ourNewscanner = new Scanner(System.in);
            InetAddress inetadress = InetAddress.getByName("localhost");
            // establishing the connection 
            Socket ournewsocket = new Socket(inetadress, 3333);           
            DataInputStream ournewDataInputstream = new DataInputStream(ournewsocket.getInputStream());
            DataOutputStream ournewDataOutputstream = new DataOutputStream(ournewsocket.getOutputStream());
    // In the following loop, the client and client handle exchange data.
            while (true)
            {
                System.out.println(ournewDataInputstream.readUTF());
                String tosend = ourNewscanner.nextLine();
                ournewDataOutputstream.writeUTF(tosend);
                // Exiting from a while loo should be done when a client gives an exit message.
                if(tosend.equals("Exit"))
                {
                    System.out.println("Connection closing... : " + ournewsocket);
                    ournewsocket.close();
                    System.out.println("Closed");
                    break;
                }
                
                // printing date or time as requested by client
                String newresuiltReceivedString = ournewDataInputstream.readUTF();
                System.out.println(newresuiltReceivedString);
            }
            
            ourNewscanner.close();
            ournewDataInputstream.close();
            ournewDataOutputstream.close();
        }catch(Exception e){
            e.printStackTrace();
        }
    }
}

```

2. Run the `main` method in `NewClient` class above.

Output:

```bash
Choose[Date | Time]..
Or Exit 
Date
2017/06/16
Choose[Date | Time]..
Or Exit 
Time
05:35:28
Choose[Date | Time]..
Or Exit 
Exit
Connection closing... : Socket[addr=localhost/127.0.0.1,port=5056,localport=60536]
Closed
```

- Each time a client requests a connection to the server, a new thread is created.
- The new Thread gets access to all available streams as soon as it is allocated. While the server is assigned, it will accept this request.
- Until the first request is complete, the server accepts and processes the second one.

### Testing the program
Run the `Server.java` and the `Client.java` one after another. To execute numerous instances of the client program simultaneously, utilize an IDE like multiple instances, or run the client software in separate files. To get the results data input stream displayed above, you will need numerous clients.

### Conclusion
This article covers socket programming, `Thread` and its use, server-side programming, and client-side programming.

Our implementation showed the importance of threads in Java, enhancing and understanding threads in Java socket programming.

Happy learning!

---
Peer Review Contributions by: [Odhiambo Paul](/engineering-education/authors/odhiambo-paul/)
