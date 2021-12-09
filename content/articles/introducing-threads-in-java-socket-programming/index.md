It is necessary to use socket programming in order to enable communication between two computers connected to the same network. A second socket attempts to connect to a first socket by listening on a given port at a specific IP address.
Socket communication utilizes two protocols:-
1. User Datagram Protocol(UDP): This is a connectionless protocol. It is mainly used to establish a low latency connection between two nodes.
2. Transport control protocol(TCP): This is a connection-oriented protocol. It is used to establish a connection between two nodes.

### Prerequisite
1. Knowledge of the Java programming language.
2. Code editor of your choice. I use (IntelliJ IDEA)[https://www.jetbrains.com/idea/]

### Table of contents
- [Prerequisite](#prerequisite)
- [Table of contents](#table-of-contents)
- [Threads](#threads)
- [Why threads](#why-threads)
- [Server-Side Programming](#server-side-programming)
- [Client-Side Programming](#client-side-programming)
- [Method of operation for the program](#method-of-operation-for-the-program)
- [How these programs operate together](#how-these-programs-operate-together)
- [Testing the program](#testing-the-program)
- [Conclusion](#conclusion)

### Threads
Each sequential program starts, runs through its execution and ends. In a threaded program, the program's control moves logically. It's a separate way to go through the program's source code. When many events or actions need to happen simultaneously, many applications are made to work on a single thread. When many threads are running simultaneously, it is common for one thread to take a different path through the same code as the rest. ` Java.lang` is in charge of making and managing every thread in the `Java.Class` of threads.

### Why threads
It's also essential that the server can handle multiple clients at once. Having the ability to manage several consumers simultaneously is a requirement of our design framework. In order to assign each request to a data input stream thread as it arrives, our server-side architecture necessitates threading. Starting a new thread in Java is accomplished in one of two ways:
- Runnable interface implementation is necessary. It is possible by running `java.lang.Runnable`.
- Extending the Thread class by running `java.lang.Thread`.

### Server-Side Programming
Here are the classes that we will require.

__Server class:__
Client-side construction shall begin with a collection of streams and port numbers from the server, and then the below steps:
- A while loop will build socket objects that receive connections from server socket objects.
- The streams of the requests will be incorporated into the current socket.
- Client handler objects are created by the class from streams and port numbers.
- Starting the program will be invoking the `start()` method. The start() method of this new thread object must be called in order for it to function.
- 
__ClientHandler class:__
All of the thread's attributes are passed down to the framework-based client handler class. The class's constructor requires three parameters: a Socket, a DataInputStream, and a DataOutputStream. As a first step, the server builds and launches a new instance of this kind of thread object, receiving its port number as well as the data input and output stream objects. Once the user has indicated whether they require time or date, the `run()` function of this class returns those objects to the developer via an input and output stream.

The Java server-side software includes the Server and ClientHandler classes. The following is the server's code:
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
		{
			Socket mynewSocket = null;
			
			try
			{
				// Receiving incoming client requests through mynewSocket
				mynewSocket = myserverSocket.accept();
				
				System.out.println("A new connection identified : " + mynewSocket);
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
Output:
```bash
A new connection identified : Socket[addr=/127.0.0.1,port=60536,localport=5056]
Thread assigned
Client Socket[addr=/127.0.0.1,port=60536,localport=5056] sends exit...
Connection closing...
Closed
```
### Client-Side Programming
Several elements of both client-side and traditional socket programming are shared by the two approaches.
 - Socket Connection Procedure.
 - Communication.
Below is the code for the client:
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
            // creating a relationship
            Socket ournewsocket = new Socket(inetadress, 3333);           
            DataInputStream ournewDataInputstream = new DataInputStream(ournewsocket.getInputStream());
            DataOutputStream 			this.ournewDataOutputstream.close();
 = new DataOutputStream(ournewsocket.getOutputStream());
    // In the following loop, the client and client handle exchange data.
            while (true)
            {
                System.out.println(ournewDataInputstream.readUTF());
                String tosend = ourNewscanner.nextLine();
                			this.ournewDataOutputstream.close();
.writeUTF(tosend);
                // Exiting from a while loo should be done when a client gives an exit message.
                if(tosend.equals("Exit"))
                {
                    System.out.println("Connection closing... : " + ournewsocket);
                    ournewsocket.close();
                    System.out.println("Closed");
                    break;
                }
                
                
                String newresuiltReceivedString = ournewDataInputstream.readUTF();
                System.out.println(newresuiltReceivedString);
            }
            
            ourNewscanner.close();
            ournewDataInputstream.close();
            			this.ournewDataOutputstream.close();
.close();
        }catch(Exception e){
            e.printStackTrace();
        }
    }
}

 ```
 Output:
```
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
### Method of operation for the program
To run the java server socket program, you must first launch it from the data output stream prompt (console). Then, you will see a message that reads "Server Started..." on your data output stream screen.

Open java client socket programs on both computers or the same network. The client program will wait for your input when you start it up. If you input a message and press `ENTER,` the server will display the message. When the client transmits the word "bye" from the client-side of the connection, the connection is terminated.

### How these programs operate together
- Each time a client makes a request, a new thread is initiated to connect to the server.
- As soon as the new thread is assigned, it has access to all the accessible streams. While the server is allocated, it will accept this request.
- Until the first request is complete, the server accepts and processes the second one. Many requests can be dealt with at the same time, even while others are being dealt with.

### Testing the program
It does matter where you save the two applications. Run the `Server.java` and the `Client.java` one after the other. To execute numerous instances of the client program simultaneously, utilize an IDE like multiple instances, or run the client software in separate files. To get the results data input stream displayed above, you will need numerous clients.

### Conclusion
This article taught socket programming, thread and its use, server-side programming, and client-side programming.

Our implementation showed the importance of threads in Java, enhancing and understanding threads in java socket programming.

Happy learning!
