### Introduction
Socket programming is a way of connecting two nodes on a network to communicate with each other. One socket(node) listens on a particular port at an IP, while the other socket reaches out to the other to connect.

### Threads
Each sequential program begins, progresses through its execution, and ends. In a thread, the program's control travels in a logical order. It's a separate path through the program's source code. When a high number of events or actions need to coincide, many applications are developed to function on a single thread. It is common for one thread to take a different path through the same code as the others when numerous threads are running at the same time.Java.lang is responsible for creating and managing every thread in Java.Class of threads.

### Why use of threads
It's also important that the server can handle multiple clients at once.Having the ability to handle several consumers simultaneously is a requirement of our design framework. Our server side implementation needs threading so that each request may be assigned a data input stream thread as it comes in.
There are two methods for creating a new thread in Java:

- Implementation of the Runnable interface is required. It is possible to run (java.lang.Runnable)
- There are many ways to extend the Thread class. (java.lang.Thread)
### Server-Side Programming
Server Socket Program is a Java Console Application.
**Server class:** Client-side construction begins with a collection of streams and port numbers from the server, and then follows these steps:
- A while loop is used to build socket objects that receive connections from server socket objects.
- Requests' streams are included in the current requests' socket object.
- This class is used to construct a new client handler object based on the streams and port numbers.
- Starting the program by invoking the **start()** method. When this newly formed thread object is launched, the **start()** method is invoked.
**ClientHandler class:**The Threads framework-based ClientHandler class and its implementation must be understood.
- Additionally, this class inherits all of Thread's attributes.
- This class's constructor requires three parameters: a Socket, a DataInputStream, and a DataOutputStream. Following any client request, the server first constructs a new thread object of this class and performs'start()' on it, taking its port number and the DataInputStream and DataOutputStream objects from them.
- Before delivering an input stream and an output stream to the developer, this class' **run()** function asks the user whether they need time or date and then returns those objects to the developer.

Server and ClientHandler classes from the Java server-side software are part of this package.
```java
import java.io.*;
import java.text.*;
import java.util.*;
import java.net.*;

public class TestingServer
{
    public static void main(String[] args) throws IOException
    {   
        ServerSocket ourNewSocketServer = new ServerSocket(3333);
        // Forcing a client request into an unending loop
        while (true)
        {
            Socket newsoct = null;            
            try
            {               
            // receive inbound requests from clients
                newsoct = ourNewSocketServer.accept();
                
                System.out.println("Client connected : " + newsoct);
                     
                DataInputStream sdtinput = new DataInputStream(newsoct.getInputStream());

                DataOutputStream sdtOutput = new DataOutputStream(newsoct.getOutputStream());
                
                System.out.println("Thread assinment to new client");

                
                Thread ourThread = new ClientHandler(newsoct, sdtinput, sdtOutput);

                ourThread.start();
                
            }
            catch (Exception e){
                newsoct.close();
                e.printStackTrace();
            }
        }
    }
}


class OurClientHandler extends Thread
{
    DateFormat newDtformat = new SimpleDateFormat("yyyy/MM/dd");

    DateFormat newtimeformat = new SimpleDateFormat("hh:mm:ourNewSocketServer");
    
    final DataInputStream sdtinput;

    final DataOutputStream sdtOutput;
    final Socket newsoct;
    // Constructor
    
    public OurClientHandler(Socket newsoct, DataInputStream sdtinput, DataOutputStream sdtOutput)
    {
        this.newsoct = newsoct;

        this.sdtinput = sdtinput;
        this.sdtOutput = sdtOutput;
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

                
                sdtOutput.writeUTF("Date or time, choose.\n"+
                            "To exit type Exit.");
                 newresuiltReceived = sdtinput.readUTF();
                
                if(newresuiltReceived.equals("Exit"))
                {
                    System.out.println("Closing...");
                    this.newsoct.close();
                    System.out.println("Closed");
                    break;
                }
                
                
                Date newDt = new Date();
                
                // output stream dependent on the client's response
                switch (newresuiltReceived) {
                
                    case "Date" :
                        newresuiltToreturn = new.format(newDt);
                        sdtOutput.writeUTF(newresuiltToreturn);
                        break;
                        
                    case "Time" :
                        newresuiltToreturn = new.format(newDt);
                        sdtOutput.writeUTF(newresuiltToreturn);
                        break;
                        
                    default:
                        sdtOutput.writeUTF("Invalid input");
                        break;
                }
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        
        try
        {
           
            this.sdtinput.close();
            this.sdtOutput.close();
            
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


public class NewClient
{
    public static void main(String[] args) throws IOException
    {
        try
        {
            Scanner newscanner = new Scanner(System.in);
            InetAddress adress = InetAddress.getByName("localhost");
            // establishing the connection 
            Socket newsoct = new Socket(adress, 3333);           
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
 ### Program's method of operation
To run the Java Server Socket Program, you must first launch it from the data output stream prompt (console). Then, you will see a message that reads "Server Started..." on your data output stream screen.

Java Client Socket Programs must be opened on both computers or on the same network. Your client program will wait for your input when you start it up. If you input a message and press ENTER, the server will also data input stream play the message. You can send messages to the client from the server after receiving them from the client. When the client transmits the word "bye" from the client-side of the connection, the connection is terminated.
### How these programs operate together
- A new thread is started to connect to the server for each request made by a client. To communicate with the client, the newly assigned thread is given access to the available streams.

- It is accepted by the server in the while loop after it has been assigned.

- As long as the first request is still being processed, the server accepts and processes the second one. Even as other requests are being processed, many requests can be addressed simultaneously.
### Testing the above program 
It does thread matter where you save the two applications. Afterward, run the Server.java and the Client.java one after the other. In order to execute numerous instances of the client program at the same time, utilize an IDE like multiple instances, or run the client software in separate files. To get the results data input stream played above, you'll need numerous clients.
### Conclusion
In this article, we’ve learned socket programming, thread and its use, server-side programming, and also client-side programming.

Our implementation showed the importance of threads in java and enhancing understanding of threads in java socket programming.

Happy learning!
