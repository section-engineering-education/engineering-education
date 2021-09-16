This article is about checking IP addresses on the internet using Java Programming Language.

### Introduction 

A **host** is a computer that can connect to the internet. Every host has a unique identification number that allows its identification anytime it is online. An IP address is a name given to this specific number.

### Table of Contents
- [Definition of an IP Address](#definition-of-an-ip-address)
- [Definition of a DNS and its Workflow](#definition-of-a-dns-and-its-workflow)
- [Representing IP Addresses in Java using InetAddress](#representing-ip-addresses-in-java-using-inetaddress)
- [Exception Handling Mechanisms used](#exception-handling-mechanisms-used)
- [Commonly used methods](#commonly-used-methods)
- [Conclusion](#conclusion)

### Definition of an IP Address

An IP address is a string of numbers separated by dots that stands for **Internet Protocol**. It is in the OSI model, a layer two protocol. IP addresses are either four-digit numbers in **32 bit** format known as **IPv4 addresses** e.g., 192.168.1.3 or **IPv6 addresses** a standardized version of IP addresses that use six-digit numbers in **128 bits** format. Each integer in the set can be anywhere between 0 and 255. Indicating the range of an IP address is from 0.0.0.0 to 255.255.255.255.

IP addresses are not just random numbers that one can assign to a host. The *Internet Assigned Numbers Authority* creates and allocates them to devices.

#### Definition of a DNS and its Workflow

- DNS, or Domain Name System, is a TCP/IP protocol that defines how application processes in different systems exchange messages.
- DNS functions similarly to an internet-based database. It has a list of *hostnames* (domains) and IP addresses in it.
- With the help of DNS, it is now easier to connect to all types of websites by remembering the domain hostnames. One does not need to carry around a card catalog full of IP addresses.
- Without DNS, you'll have to write an IP address that may or may not be correct.
- DNS associates hostnames that humans can remember (such as www.google.com) with IP addresses that computers can remember (e.g., 172.217.170.164).

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
 
#### Representing IP Addresses in Java using the InetAddress Class

Java is used in networking as an interconnection point between two or more computing devices, allowing them to share resources and control applications centrally. ***Java.net.InetAddress*** class is a high-level representation of an IP address in java for IPv4 and IPv6. It generally includes both a hostname and an IP address.

#### Java InetAddress Class Methods
If necessary, the three methods may connect to a local DNS server to fill up the information in the InetAddress objects. Always remember that these methods make network connections to retrieve all information they need.

The InetAddress class caches the results of the DNS lookups such that once it has the address of the given host, it won't have to look it up again.
If the IP address does not change while your program is running, there will be no issues.

Negative results such as `host not found` are slightly problematic. It happens for the first time, and in the second trial, one succeeds.
This error will occur when the first attempt timed out while the information was in transit from the remote DNS server.

#### public static InetAddress getByName(String hostName) throws UnknownHostException

`InetAddress.getByName()` is the most frequently used method. It is a static method that takes the hostname that you are looking for as its arguments. It looks up the host's IP address using DNS. It is called like this: `getByName()`.

Assuming there is an import **java.net.***  statement at the top of the program and any other necessary import statements.

``` java
 InetAddress address = InetAddress.getByName("www.google.com");
 ```

#### Exception handling mechanism used :

The `InetAddress.getByName()` method throws UnknownHostException if host can't be found. 

It can either be declared using the `throws` exception or wrapped in a try-catch block. As shown below :

``` java
try{
    InetAddress address = InetAddress.getByName("www.google.com");
    System.out.println(address);
}
catch(UnknownHostException ex){
    System.out.println("www.google.com not found");
}

```
### Commonly used methods.

#### Below is a sample code using getByName() method:

```java
package com. company;

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
my local machine: www.microsoft.com/2.21.100.214

```
> For machines that do not have hostnames, you can always pass a String that contains a hexadecimal form of the IP address to InetAddress.getByName().

Example :
```java
InetAddress address = InetAddress.getByName("172.217.170.164");

```
> Hostnames are more stable than IP addresses. Most services have lived at the same hostnames but have changed their IP addresses severally. When choosing between hostnames like www.google.com and IP addresses like 172.217.170.164, always go with the hostname.

#### public static InetAddress[]getAllByName(String hostName) throws UnknownHostException:

Some computers will have more than one IP address. When given a hostname, the `InetAddress.getAllByName()` returns an array of addresses that correspond to that name.

#### As shown in this snippet :

```java
InetAddress[] address = InetAddress.getAllByName("www.google.com");
```
It throws UnknownHostException just like InetAddress.getByName().

#### Below is a sample code using getAllByName() method:

``` java
package com. company;

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
> Note :
Hosts with multiple IP addresses are very high-volume web servers.

 #### public static InetAddress getLocalHost() throws UnknownHostException :

This static method returns the InetAddress of the machine on which it's running.

Just like InetAddress.getByName() and InetAddress.getAllByName() it throws UnknownHostException when it cannot find the address of the host.

```java
InetAddress address = InetAddress.getLocalHost();
```
#### Below is a sample code using getLocalHost() method:

```java
package com. company;

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
> When not connected to the internet, and the system lacks a fixed IP address or domain name, the domain name is *localhost*,  and the IP address is 127.0.0.1.
  
**Note** :
The programs will not work on a standalone computer. Your machine should be connected to the internet for you to obtain the IP addresses and domain names.

### Conclusion
In this tutorial, we learned about IP addresses and their versions. We managed to look at the DNS and its workflow. We also learned that the IP addresses and hostnames are accessible via the InetAddress class.
My advice to the learner is to practice how to lookup IP addresses over the internet using Java Programming Language.
















