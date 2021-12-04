Socket programming is a way of connecting two nodes on a network to communicate with each other. One socket(node) listens on a particular port at an IP, while the other socket reaches out to connect. As long as every packet reaches its intended destination, streaming video can take advantage of UDP. As a server-side protocol, TCP is straightforward and reliable. There are no delays in the delivery of messages, and TCP ensures that all parties are aware of this fact.
### Prerequisite
1. Before proceeding with this tutorial you should have a good knowledge of the Java programming language.
2. For server-side Java development, have __IntelliJ IDEA__ as the IDE.
### Table of contents
- [Threads](#threads)
- [Why threads](#why-threads)
- [Server-Side Programming](#server-side-programming)
- [Client-Side Programming](#client-side-programming)
- [Method of operation for the program](#method-of-operation-for-the-program)
- [How these programs operate together](#how-these-programs-operate-together)
- [Testing](#testing)
- [Conclusion](#conclusion)
### Threads
Each sequential program begins, progresses through its execution, and ends. In a thread, the program's control travels in a logical order. It's a separate path through the program's source code. When a high number of events or actions need to coincide, many applications are developed to function on a single thread. It is common for one thread to take a different path through the same code as the others when numerous threads are running at the same time. `Java.lang` is responsible for creating and managing every thread in `Java.Class` of threads.

### Why threads
It's also essential that the server can handle multiple clients at once. Having the ability to manage several consumers simultaneously is a requirement of our design framework. Our server-side implementation needs threading to assign each request a data input stream thread as it comes in.
There are two methods for creating a new thread in Java:

- Implementation of the Runnable interface is required. It is possible by running `java.lang.Runnable`.
- There are many ways to extend the Thread class by running `java.lang.Thread`.
### Server-Side Programming
Server Socket Program is a Java Console Application. Here are the classes that we will require.
__Server class:__ 
Client-side construction shall begin with a collection of streams and port numbers from the server, and then follow these steps:
- A while loop that will be used to build socket objects that receive connections from server socket objects.
- The requests' streams will be included in the current requests' socket object.
- The class shall be used to construct a new client handler object based on the streams and port numbers.
- Starting the program will be invoking the `start()` method. When this newly formed thread object is launched, the `start()` method should be invoked.
__ClientHandler class:__
The Threads framework-based ClientHandler class and its implementation must be understood.
- Additionally, this class inherits all of thread's attributes.
- This class's constructor requires three parameters: a Socket, a DataInputStream, and a DataOutputStream. Following any client request, the server first constructs a new thread object of this class and performs`start()` on it, taking its port number and the DataInputStream and DataOutputStream objects from them.
- Before delivering an input stream and an output stream to the developer, this class's `run()` function asks the user whether they need time or date and then returns those objects to the developer.

Server and ClientHandler classes from the Java server-side software are part of this package.
```java
import java.io.*;
import java.text.*;
import java.util.*;
import java.net.*;

public class Server
{
	public static void main(String[] args) throws IOException
	{
		ServerSocket sSocket = new ServerSocket(5056);
		// getting client request
		while (true)
		{
			Socket socket = null;
			
			try
			{
				// socket object to receive incoming client requests
				socket = sSocket.accept();
				
				System.out.println("A new client is connected : " + socket);
				DataInputStream datainputstream = new DataInputStream(socket.getInputStream());
				DataOutputStream dataoutputstream = new DataOutputStream(socket.getOutputStream());
				
				System.out.println("Assigning new thread for this client");

				Thread t = new ClientHandler(socket, datainputstream, dataoutputstream);
				// starting
				t.start();
				
			}
			catch (Exception e){
				socket.close();
				e.printStackTrace();
			}
		}
	}
}

class ClientHandler extends Thread
{
	DateFormat fordate = new SimpleDateFormat("yyyy/MM/dd");
	DateFormat fortime = new SimpleDateFormat("hh:mm:sSocket");
	final DataInputStream datainputstream;
	final DataOutputStream dataoutputstream;
	final Socket socket;
	

	// Constructor
	public ClientHandler(Socket socket, DataInputStream datainputstream, DataOutputStream dataoutputstream)
	{
		this.socket = socket;
		this.datainputstream = datainputstream;
		this.dataoutputstream = dataoutputstream;
	}

	@Override
	public void run()
	{
		String received;
		String toreturn;
		while (true)
		{
			try {
				dataoutputstream.writeUTF("What do you want?[Date | Time]..\n"+
							"Type Exit to terminate connection.");
				
				// getting answers from client
				received = datainputstream.readUTF();
				
				if(received.equals("Exit"))
				{
					System.out.println("Client " + this.socket + " sends exit...");
					System.out.println("Closing this connection.");
					this.socket.close();
					System.out.println("Connection closed");
					break;
				}
				
				// creating Date object
				Date date = new Date();

				switch (received) {
				
					case "Date" :
						toreturn = fordate.format(date);
						dataoutputstream.writeUTF(toreturn);
						break;
						
					case "Time" :
						toreturn = fortime.format(date);
						dataoutputstream.writeUTF(toreturn);
						break;
						
					default:
						dataoutputstream.writeUTF("Invalid input");
						break;
				}
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
		
		try
		{
			// closing resources
			this.datainputstream.close();
			this.dataoutputstream.close();
			
		}catch(IOException e){
			e.printStackTrace();
		}
	}
}

```
Output:
```bash
A new client is connected : Socket[addr=/127.0.0.1,port=60536,localport=5056]
Assigning new thread for this client
Client Socket[addr=/127.0.0.1,port=60536,localport=5056] sends exit...
Closing this connection.
Connection closed
```
 ### Client-Side Programming
 There are many similarities between client-side programming and traditional socket programming which include:
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
            Scanner newscanner = new Scanner(System.in);
            InetAddress adress = InetAddress.getByName("localhost");
            // establishing the connection 
            Socket newsoct = new Socket(adress, 5056);           
            DataInputStream sdtinput = new DataInputStream(newsoct.getInputStream());
            DataOutputStream sdtOutput = new DataOutputStream(newsoct.getOutputStream());
    // The following loop is responsible for exchanging data between the client and client handle.
            while (true)
            {
                System.out.println(sdtinput.readUTF());
                String tosend = newscanner.nextLine();
                sdtOutput.writeUTF(tosend);
                // If the client sends an exit, then the connection should be closed and the while loo should be terminated.
                if(tosend.equals("Exit"))
                {
                    System.out.println("Closing connection : " + newsoct);
                    newsoct.close();
                    System.out.println("Closed");
                    break;
                }
                
                
                String newresuiltReceived = sdtinput.readUTF();
                System.out.println(newresuiltReceived);
            }
            
            newscanner.close();
            sdtinput.close();
            sdtOutput.close();
        }catch(Exception e){
            e.printStackTrace();
        }
    }
}

 ```
 Output:
 ```bash
 What do you want?[Date | Time]..
Type Exit to terminate connection.
Date
2017/06/16
What do you want?[Date | Time]..
Type Exit to terminate connection.
Time
05:35:28
What do you want?[Date | Time]..
Type Exit to terminate connection.
Exit
Closing this connection : Socket[addr=localhost/127.0.0.1,port=5056,localport=60536]
Connection closed
 ```
### Method of operation for the program
To run the Java Server Socket Program, you must first launch it from the data output stream prompt (console). Then, you will see a message that reads "Server Started..." on your data output stream screen.

Java Client Socket Programs must be opened on both computers or on the same network. Your client program will wait for your input when you start it up. If you input a message and press ENTER, the server will also play the message. You can send messages to the client from the server after receiving them from the client. When the client transmits the word "bye" from the client-side of the connection, the connection is terminated.
### How these programs operate together
- A new thread is started to connect to the server for each request made by a client. For a connection to be established, the newly assigned thread is given access to the available streams.
- It is accepted by the server in the while loop after it has been assigned.
- As long as the first request is still being processed, the server accepts and processes the second one. Even as other requests are being processed, many requests can be addressed simultaneously.
### Testing 
It does matter where you save the two applications. Afterward, run the `Server.java` and the `Client.java` one after the other. To execute numerous instances of the client program simultaneously, utilize an IDE like multiple instances, or run the client software in separate files. To get the results data input stream played above, you will need numerous clients.
### Conclusion
This article we learned socket programming, thread and its use, server-side programming, and client-side programming.

Our implementation showed the importance of threads in Java and enhancing understanding of threads in java socket programming.

Happy learning!
