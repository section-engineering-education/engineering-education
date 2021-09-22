---
layout: engineering-education
status: publish
published: true
url: /how-to-lookup-ip-addresses-in-java/
title: How to Lookup IP Addresses in Java
description: This tutorial will guide the reader on how to check IP addresses on the internet using the InetAddress class in Java.
author: apondi-ashley
date: 2021-09-22T00:00:00-12:30
topics: [Networking]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/how-to-lookup-ip-addresses-in-java/hero.jpg
    alt: How to Lookup Ip Addresses in Java Hero Image
---
A host is a computer that can connect to the internet. Every host has a unique identification number that distinguishes it from other online devices. 
<!--more-->
### Prerequisites
To follow along, you should have:
- A basic understanding of Java and networking.
- Some knowledge in using the Java.Net package.
 
### Table of contents
- [Definition of an IP address](#definition-of-an-ip-address)
- [Definition of DNS and its workflow](#definition-of-a-dns-and-its-workflow)
- [Representing IP addresses in Java using the InetAddress class](#representing-ip-addresses-in-java-using-the-inetaddress-class)
- [Exception handling](#exception-handling-mechanism-used)
- [Commonly used methods](#commonly-used-methods)
- [Conclusion](#conclusion)

### Definition of an IP address
An IP address is a string of numbers separated by dots that stands for **Internet Protocol**.

IP addresses are four-digit numbers in a 32-bit format known as IPv4 addresses. For example, 192.168.1.3. 

There are also IPv6 addresses that use six-digit numbers in 128-bit format. 

Each integer in the set can be anywhere between 0 and 255. This means that the range of an IP address is from 0.0.0.0 to 255.255.255.255.

IP addresses are not just random numbers that one can assign to a host. The _Internet Assigned Numbers Authority_ creates and allocates IP addresses to devices.

#### Definition of DNS and its workflow
DNS (Domain Name System) is a TCP/IP protocol that defines how application processes in different systems exchange messages.

DNS functions similarly to an internet-based database. It has a list of _hostnames_ (domains) and IP addresses.

DNS helps users to connect to all types of websites by remembering their domain hostnames. Therefore, one does not need to carry around a catalog full of IP addresses.

DNS associates hostnames that humans can remember (such as www.google.com) with IP addresses that computers can remember (e.g., 172.217.170.164).

#### How DNS works
DNS is not self-contained; it requires extra programs, one of which is a _resolver_. 

A `resolver` is client-side software that makes it easier to connect to a DNS server. 

It is a program on the client computer that assists in connecting to a DNS server.

A _web browser_ and _mail client_ are the most widely used resolvers. Therefore, to access the DNS server, you must have a web browser or an e-mail client installed on your computer. 

Chrome, Opera, Firefox, and Safari are some of the most popular browsers.

#### Procedure of a DNS workflow 
We require the following:
1. Two DNS servers
2. A web browser
3. A computer

- The client computer asks the local DNS server for a website's IP address.
- The local DNS server will check its records and reserve the information.
- If the DNS server finds the reserved file, it will immediately give the browser app an IP address. If the server can't find it, it sends a request to the online DNS server.
- Once the IP address has been acquired, the local server puts it in a stash/cache. When the client computer requests the IP address again, the DNS server does not need to contact other online servers. 
- The data or cache is transferred to a different DNS server if it can't get sited on the current server.

#### Representing IP Addresses in Java using the InetAddress Class
Java Net packages act as the interconnection point between two or more computing devices. This allows them to share resources and control applications centrally. 

**_Java.net.InetAddress_** class is a high-level representation of an IP address in Java for IPv4 and IPv6. It generally includes both a hostname and an IP address.

#### Java InetAddress Class Methods
InetAddress methods can connect to a local DNS server to retrieve or send information. 

The InetAddress class caches the results of DNS lookups for future reference. 

If the IP address does not change while your program is running, there will be no issues.

Negative results such as `host not found` are slightly problematic. This error will occur when the first connection attempt times out while the information was in transit from the remote DNS server.

`InetAddress.getByName()` is the frequently used method. This static function takes the hostname that you are looking for as its arguments. It then looks up the host's IP address using DNS. 

```java
 InetAddress address = InetAddress.getByName("www.google.com");
```

#### Exception handling
The `InetAddress.getByName()` method throws `UnknownHostException` if the host cannot be found.

It can either be declared using the `throws` exception or wrapped in a `try-catch` block, as shown below:

```java
try{
    InetAddress address = InetAddress.getByName("www.google.com");
    System.out.println(address);
}
catch(UnknownHostException ex){
    System.out.println("www.google.com not found");
}

```

### Commonly used methods
Below is a sample code using `getByName()` method:

```java
package com.company;

import java.net.InetAddress;
import java.net.UnknownHostException;

public class GetIpAddress {
   public static void main(String[]args) throws UnknownHostException{
        InetAddress address = InetAddress.getByName("www.microsoft.com");

        System.out.println("my local machine: " + address);
    }
}
```

Output:

```bash
my local machine: www.microsoft.com/2.21.100.214
```

> For machines that do not have hostnames, you can always pass a string that contains a hexadecimal form of the IP address to `InetAddress.getByName()`.

Example:

```java
InetAddress address = InetAddress.getByName("172.217.170.164");
```

Hostnames are more stable than IP addresses. Most services have maintained the same hostnames but have changed their IP addresses severally. 

Some computers will have more than one IP address. This means that the `InetAddress.getAllByName()` will return an array of addresses that correspond to that hostname.

This is shown in the code snippet below:

```java
InetAddress[] address = InetAddress.getAllByName("www.google.com");
```
The following code shows how to return an array of addresses using the `getAllByName()` method:

```java
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

Output:

```bash
Google different ip:www.google.com/172.217.170.164
```

> Hosts with multiple IP addresses are usually high-volume web servers.

The `getLocalHost` method returns the InetAddress of the host machine.

The `getLocalHost` function throws `UnknownHostException` when it cannot find the host's address.

```java
InetAddress address = InetAddress.getLocalHost();
```

The following code shows how to use `getLocalHost()` method:

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

Output:

```bash
My local machine Ip is: DESKTOP-MC2R176/192.168.43.35
```

When you are not connected to the internet, and the computer lacks a fixed IP address or domain name, the default domain name and IP address are `localhost`, and `127.0.0.1` respectively.

### Conclusion
In this tutorial, we learned about IP addresses and their versions. We also discussed DNS and its workflow. 

We learned that IP addresses and hostnames are accessible via the InetAddress class.


---
Peer Review Contributions by: [Dawe-Daniel](/engineering-education/authors/dawe-daniel/)
