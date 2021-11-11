### Introduction
In the end, socket programming is all about two systems connecting In general, network communication is divided into two categories: `Transport Control Protocol` (TCP) and `User Datagram Protocol (UDP)`. There are data input stream advantages and data output stream advantages 
As long as every packet reaches its intended destination, streaming video can take advantage of UDP. As a server-side protocol, TCP is straightforward and reliable. There are no delays in the delivery of messages, and TCP ensures that all parties are aware of this fact.
### Threads
Each sequential program begins, progresses through its execution, and ends. In a thread, the program's control travels in a logical order. It's a separate path through the program's source code. Many applications nowadays are built to run on a single thread, which poses challenges when a large number of events or actions need to take place at the same time. It is common for one thread to take a different path through the same code as the others when numerous threads are running at the same time.Java.lang is responsible for creating and managing every thread in Java.Class of threads.
### Why use of threads
It's also important that the server can handle multiple clients at once.Having the ability to handle several consumers simultaneously is a requirement of our design framework. As a result, we need to implement threads on the server side so that a data input stream thread may be assigned to handle each request as it comes in.

In Java, there are two ways to generate a new thread:

- Implementation of the Runnable interface is required. It is possible to run (java.lang.Runnable)
- There are many ways to extend the Thread class. (java.lang.Thread)
### Server-Side Programming
Server Socket Program is a Java Console Application.
**Server class:** Client-side construction begins with a collection of streams and port numbers from the server, and then follows these steps:
- A while loop is used to build socket objects that receive connections from server socket objects.
- Requests' streams are included in the current requests' socket object.
- Based on the streams and port numbers, this class is used to create a new client handler object.
- Calling the start() function: The start() method is called when this freshly generated thread object is launched.
**ClientHandler class:**The Threads framework-based ClientHandler class and its implementation must be understood.
- Additionally, this class inherits all of Thread's attributes.
- This class's constructor requires three parameters: a Socket, a DataInputStream, and a DataOutputStream. Following any client request, the server first constructs a new thread object of this class and performs'start()' on it, taking its port number and the DataInputStream and DataOutputStream objects from them.
- The `run()` function of this class first asks the user if they need time or date, and then returns the input stream object and the output stream object to the developer, as seen in the following code.

Server and ClientHandler classes from the Java server-side software are part of this package.
```java
import java.io.*;
import java.text.*;
import java.util.*;
import java.net.*;

public class NewServerClass
{
    public static void main(String[] args) throws IOException
    {   
        ServerSocket newSocketServer = new ServerSocket(3333);
        while (true)
        {
            Socket newSocket = null;            
            try
            {               
                newSocket = newSocketServer.accept();
                
                System.out.println("Client connected : " + newSocket);
                     
                DataInputStream streamForDataInput = new DataInputStream(newSocket.getInputStream());

                DataOutputStream streamForDataOutput = new DataOutputStream(newSocket.getOutputStream());
                
                System.out.println("Thread assinment to new client");

                
                Thread thread = new ClientHandler(newSocket, streamForDataInput, streamForDataOutput);

                thread.start();
                
            }
            catch (Exception e){
                newSocket.close();
                e.printStackTrace();
            }
        }
    }
}


class ClientHandler extends Thread
{
    DateFormat newdateformat = new SimpleDateFormat("yyyy/MM/dd");

    DateFormat newtimeformat = new SimpleDateFormat("hh:mm:newSocketServer");
    
    final DataInputStream streamForDataInput;

    final DataOutputStream streamForDataOutput;
    final Socket newSocket;
    
    public ClientHandler(Socket newSocket, DataInputStream streamForDataInput, DataOutputStream streamForDataOutput)
    {
        this.newSocket = newSocket;

        this.streamForDataInput = streamForDataInput;
        this.streamForDataOutput = streamForDataOutput;
    }

    @Override
    public void run()
    {
        String newresuiltReceived;
        String newresuiltToreturn;
        //Implementing a loop
        while (true)
        {
            try {

                
                streamForDataOutput.writeUTF("Date or time, choose.\n"+
                            "To exit type Exit.");
                 newresuiltReceived = streamForDataInput.readUTF();
                
                if(newresuiltReceived.equals("Exit"))
                {
                    System.out.println("Closing...");
                    this.newSocket.close();
                    System.out.println("Closed");
                    break;
                }
                
                
                Date newDate = new Date();
                
                
                switch (newresuiltReceived) {
                
                    case "Date" :
                        newresuiltToreturn = new.format(newDate);
                        streamForDataOutput.writeUTF(newresuiltToreturn);
                        break;
                        
                    case "Time" :
                        newresuiltToreturn = new.format(newDate);
                        streamForDataOutput.writeUTF(newresuiltToreturn);
                        break;
                        
                    default:
                        streamForDataOutput.writeUTF("Invalid input");
                        break;
                }
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        
        try
        {
           
            this.streamForDataInput.close();
            this.streamForDataOutput.close();
            
        }catch(IOException e){
            e.printStackTrace();
        }
    }
}

```
 ### Client-Side Programming
 There are many similarities between client-side programming and traditional socket programming:

 - Establish a Socket Connection
 - Communication

 ```java
import java.util.Scanner;
import java.io.*;
import java.net.*;


public class Client
{
    public static void main(String[] args) throws IOException
    {
        try
        {
            Scanner scanner = new Scanner(System.in);
            InetAddress adress = InetAddress.getByName("localhost");
            // establishing the connection 
            Socket newSocket = new Socket(adress, 3333);           
            DataInputStream streamForDataInput = new DataInputStream(newSocket.getInputStream());
            DataOutputStream streamForDataOutput = new DataOutputStream(newSocket.getOutputStream());
    
            while (true)
            {
                System.out.println(streamForDataInput.readUTF());
                String tosend = scanner.nextLine();
                streamForDataOutput.writeUTF(tosend);
                
                if(tosend.equals("Exit"))
                {
                    System.out.println("Closing connection : " + newSocket);
                    newSocket.close();
                    System.out.println("Closed");
                    break;
                }
                
                
                String newresuiltReceived = streamForDataInput.readUTF();
                System.out.println(newresuiltReceived);
            }
            
            scanner.close();
            streamForDataInput.close();
            streamForDataOutput.close();
        }catch(Exception e){
            e.printStackTrace();
        }
    }
}

 ```
 ### Program's method of operation
To run the Java Server Socket Program, you must first launch it from the data output stream prompt (console). Then, you will see a message that reads "Server Started..." on your data output stream screen.

Java Client Socket Programs must be opened on both computers or on the same network. Your client program will wait for your input when you start it up. If you input a message and press ENTER, the server will also data input stream play the message. You can send messages to the client from the server after receiving them from the client. When the client transmits the word "bye" from the client-side of the connection, the connection is terminated.
### How these programs operate together
- To connect to the server, a new thread is created for each client that sends a request. To communicate with the client, the newly assigned thread is given access to the available streams.

- It is accepted by the server in the while loop after it has been assigned.

- As long as the first request is still being processed, the server accepts and processes the second one. Even as other requests are being processed, many requests can be addressed simultaneously.
### Testing the above program 
It does thread matter where you save the two applications. Afterward, run the Server.java and the Client.java one after the other. In order to execute numerous instances of the client program at the same time, utilize an IDE like multiple instances, or run the client software in separate files. To get the results data input stream played above, you'll need numerous clients.
### Conclusion
In this article, we’ve learned socket programming, thread and its use, server-side programming, and also client-side programming.

Our implementation showed the importance of threads in java and enhancing understanding of threads in java socket programming.

Happy learning!
