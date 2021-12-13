To communicate between two computers on the same network, socket programming must be used. A second socket attempts to connect to a first socket by listening to a given port at a specific IP address.
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
Each sequential program starts, runs through its execution and ends. In a threaded program, the program's control moves logically. It's a separate way to go through the program's source code. Several apps employ a single thread of execution when several activities need to happen simultaneously. When many threads are running simultaneously, the code flow might vary. ` Java.lang` is in charge of making and managing every thread in the `Java.Class` of threads.

### Why threads
It's also essential that the server can handle multiple clients at once. Having the ability to manage several consumers simultaneously is a requirement of our design framework. To assign each request to a data input stream thread as it arrives, our server-side architecture necessitates threading. Starting a new Java thread is easy:
- It is important to implement the Runnable interface. It is possible by running `java.lang.Runnable`.
- Extending the Thread class by running `java.lang.Thread`.

### Server-Side Programming
Here are the classes that we will require.

__Server class:__
Client-side construction shall begin with a collection of streams and port numbers from the server, and then the below steps:
- A while loop will build socket objects that receive connections from server socket objects.
- The streams of the requests will be incorporated into the current socket.
- Client handler objects are created by the class from streams and port numbers.
- Starting the program will be invoking the `start()` method. The `start()` function of this new thread object must be invoked to begin operating.
__ClientHandler class:__
The thread's attributes are passed down to the framework-based client handler class. The class's constructor requires three parameters: a Socket, a DataInputStream, and a DataOutputStream. The server gets the thread's port number and data input and output stream objects when it creates it. After the user picks time or date, the run() method delivers those objects to the developer through input and output streams.

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
 There are many similarities between client-side programming and traditional mynewSocket programming which include:
 - Establishing a Socket Connection.
 - Communication.

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
### Method of operation for the program
To run the java server socket program, you must first launch it from the data output stream prompt (console). Then, you will see a message that reads "Server Started..." on your data output stream screen.

Open java client socket programs on both computers or the same network. The client program will wait for your input when you start it up. If you input a message and press `ENTER,` the server will display the message. When the client transmits the word "bye" from the client-side of the connection, the connection is terminated.

### How these programs operate together
- Each time a client requests a connection to the server, a new thread is started.
- The new thread gets access to all available streams as soon as it is allocated. While the server is allocated, it will accept this request.
- Until the first request is complete, the server accepts and processes the second one. 
### Testing the program
It does matter where you save the two applications. Run the `Server.java` and the `Client.java` one after another. To execute numerous instances of the client program simultaneously, utilize an IDE like multiple instances, or run the client software in separate files. To get the results data input stream displayed above, you will need numerous clients.

### Conclusion
This article taught socket programming, thread and its use, server-side programming, and client-side programming.

Our implementation showed the importance of threads in Java, enhancing and understanding threads in java socket programming.

Happy learning!

