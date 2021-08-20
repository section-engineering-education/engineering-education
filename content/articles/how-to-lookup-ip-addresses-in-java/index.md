This article is about checking IP addresses on the internet using Java Programming Language.

### Introduction 

A **host** is a computer that can connect to the internet. Every host has a unique identification number that allows its identification anytime it is online. An IP address is a name given to this specific number.

### Table of Contents
- [Definition of an IP Address](#definition-of-an-ip-address)
- [Definition of a DNS and its Workflow](#definition-of-a-dns-and-its-workflow)
- [Representing IP Addresses in Java using InetAddress](#representing-ip-addresses-in-java-using-inetaddress)
- [Conclusion](#conclusion)

### Definition of an IP Address

An IP address is a string of numbers separated by dots that stands for **Internet Protocol**. It is in the OSI model, a layer two protocol. IP addresses are either four-digit numbers in **32 bit** format known as **IPV4 addresses** e.g., 192.168.1.3 or **IPV6 addresses** a standardized version of IP addresses that use six-digit numbers in **128 bits** format. Each integer in the set can be anywhere between 0 and 255. Indicating the range of an IP address is from 0.0.0.0 to 255.255.255.255.

IP addresses are not just random numbers that one can assign to a host. The *Internet Assigned Numbers Authority* creates and allocates them to devices.

#### Definition of a DNS and its Workflow

- DNS, or Domain Name System, is a TCP/IP protocol that defines how application processes in different systems exchange messages.
- DNS functions similarly to an internet-based database. It has a list of *hostnames* (domains) and IP addresses in it.
- With the help of DNS, it is easier to connect to all types of websites by remembering the domain hostnames. 
- Without DNS, you'll have to write long IP address numbers that may or may not be correct.

#### How DNS Works:

DNS is not self-contained; it requires additional programs, one of which is a *resolver*. A piece of client-side software that makes it easier to connect to a DNS server. It is an extra program on the client computer that assists in connecting to a DNS server.
A *web browser* or a *mail client* is the most widely used resolvers. To access the DNS server, you must have a web browser or an e-mail client installed on your computer. Chrome, Opera, Firefox, and Safari are some of the most popular browsers.

#### The following is a procedure of a DNS Workflow:
Below is what is required:

1. Two DNS servers
2. A web browser 
3. A computer

- The client computer asks the local DNS server for a website's IP address.
- The local DNS server will check its records and reserve the information.
- If the DNS server finds the reserved file, it will immediately give the browser app an IP address. If the server can't find it, it sends a request to the other DNS server.
- Once the IP address has been acquired, the local server puts it in a stash/cache. When the client computer requests the IP address again, the DNS server does not need to contact the other servers. *The data or cache is transferred to a different DNS server if it can't get sited on the current server.
 
#### Representing IP Addresses in Java using InetAddress

Java is used in networking as an interconnection point between two or more computing devices, allowing them to share resources and control applications centrally. ***Java.net.package*** is used to represent the IP addresses from the `InetAddress` class.

### Ip Address LookUp Program:
#### Using getAllByName() method:

``` java
package com.company;

import java.net.InetAddress;
import java.net.UnknownHostException;


public class GetIpAddress {
    public static void main(String[] args) throws UnknownHostException {
    
        InetAddress[] inetAddresses=InetAddress.getAllByName("www.google.com");

        for (InetAddress ipAddress : inetAddresses) 
        {
            System.out.println("Google different ip " + ipAddress);
        }
    }
}

``` 
A sample output of this code:
```
Google different ip:www.google.com/172.217.170.164
```
#### Using getByName() method:
```java
package com.company;

import java.net.InetAddress;
import java.net.UnknownHostException;

public class GetIpAddress {
   public static void main(String[]args) throws UnknownHostException{
        InetAddress address = InetAddress.getByName("localhost");

        System.out.println("my local machine: " + address);
    }
}
```
A sample output of this code:
```
my local machine: localhost/127.0.0.1
```

#### Using getLocalHost() method:

```java
package com.company;

import java.net.InetAddress;
import java.net.UnkownHostException;

public class GetIpAddress {
    public static void main(String[] args)throws UnknownHostException {
        InetAddress inetaddress = InetAddress.getLocalHost();
           System.out.println("My local machine Ip is: "+ inetaddress);

    }
}

```
A sample output of this code:
```
My local machine Ip is: DESKTOP-MC2R176/192.168.43.35

```
  
**Note**:
You should be connected to the internet for you to obtain the IP addresses and domain names.

#### Java InetAddress Class Methods
- `getAllByName (String host)` - This method returns the instance that finds all IP addresses related to the same hostname.
- `getLocalHost()` -  This method returns the instance that contains the IP address and the hostname of the local machine in which your program is running.
- `getByName()` - This method finds the IP address of a particular machine.

#### Exception Handling mechanism used:
`throws  UnknownHostException` - This exception handling mechanism handles all Unknown Host situations.

- For loop is created to obtain all IP addresses.

### Conclusion
In this tutorial, we learned about IP addresses and their versions. We managed to look at the DNS and its workflow. We also learned that the IP addresses and hostnames are accessible via the InetAddress class.
My advice to the learner is to practice how to lookup IP addresses over the internet using Java Programming Language.
















