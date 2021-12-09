Socket programming is a way of connecting two nodes on a network to communicate. One socket(node) listens on a particular port at an IP, while the other socket reaches out to connect.

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
It's also essential that the server can handle multiple clients at once. Having the ability to manage several consumers simultaneously is a requirement of our design framework. Our server-side implementation needs threading to assign each request a data input stream thread as it comes in.
There are two methods for creating a new thread in Java:

- Implementation of the runnable interface is required. It is possible by running `java.lang.Runnable`.
- Extending the Thread class by running `java.lang.Thread`.

### Server-Side Programming
Here are the classes that we will require.

__Server class:__
Client-side construction shall begin with a collection of streams and port numbers from the server, and then the below steps:
- A while loop will build socket objects that receive connections from server socket objects.
- The requests' streams will be included in the current socket object.
- The class shall construct a new client handler object based on the streams and port numbers.
- Starting the program will be invoking the `start()` method. The `start()` method should be invoked when this newly formed thread object is launched.

__ClientHandler class:__
The threads framework-based client handler class inherits all of the thread's attributes. The class's constructor requires three parameters: a Socket, a DataInputStream, and a DataOutputStream. Following any client request, the server first constructs a new thread object of this class and performs `start()` on it, taking its port number and the data input stream and data output stream objects from them. Before delivering an input stream and an output stream to the developer, this class's `run()` function asks the user whether they need time or date and then returns those objects to the developer.

Server and ClientHandler classes from the Java server-side software are part of this package.
Below is a code for the server:
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

class ClientHandler extends thread
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
"`bash
A new client is connected : Socket[addr=/127.0.0.1,port=60536,localport=5056]
Assigning new thread for this client
Client Socket[addr=/127.0.0.1,port=60536,localport=5056] sends exit...
Closing this connection.
Connection closed
```

### Client-Side Programming
 There are many similarities between client-side programming and traditional socket programming, which include:
 - Establishing a Socket Connection.
 - Communication.
Below is the code for the client:
 ```java
import java.util.Scanner;
import java.io.*;
import java.net.*;


public class client
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
To run the java server socket program, you must first launch it from the data output stream prompt (console). Then, you will see a message that reads "Server Started..." on your data output stream screen.

Open java client socket programs on both computers or the same network. The client program will wait for your input when you start it up. If you input a message and press `ENTER,` the server will display the message. When the client transmits the word "bye" from the client-side of the connection, the connection is terminated.

### How these programs operate together
- A new thread is started to connect to the server for each request made by a client. 
- For a connection to be established, the newly assigned thread is given access to the available streams. The server accepts it in the while loop after being assigned.
- As long as the first request is still being processed, the server accepts and processes the second one. Even as other requests are being processed, many can be addressed simultaneously.

### Testing the program
It does matter where you save the two applications. Afterward, run the `Server.java` and the `Client.java` one after the other. To execute numerous instances of the client program simultaneously, utilize an IDE like multiple instances, or run the client software in separate files. To get the results data input stream displayed above, you will need numerous clients.

### Conclusion
This article taught socket programming, thread and its use, server-side programming, and client-side programming.

Our implementation showed the importance of threads in Java, enhancing and understanding threads in java socket programming.

Happy learning!
