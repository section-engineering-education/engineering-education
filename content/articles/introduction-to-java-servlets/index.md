---
layout: engineering-education
status: publish
published: true
url: /introduction-to-java-servlets/
title: Introduction to Java servlets
description: This article introduces the foundations of servlets in a Java web application, its properties and execution, architecture, server-side extensions, and finally its advantages and disadvantages.
author: Dennis-Kariuki
date: 2021-08-17T00:00:00-05:35
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/introduction-to-java-servlets/hero.png
    alt: Introduction to Java servlets Hero image

--- 
A `servlet` is often the software that improves the capabilities of a server. It is usually written in Java and can process web requests. 
Servlets are web server-based applications.
<!--more-->
Other technologies used to produce dynamic online content, such as ASP.NET and PHP, are the counterparts of these servlets in these situations. 

Nowadays, we are all familiar with the need for developing dynamic web pages, or those that may change the information of the site based on the time or produce material based on the client's request. 

If you enjoy coding in Java, you will be pleased to learn that there is a technique to produce dynamic web pages using Java. That method is known as Java Servlet. 

Before we get to the core of our discussion, it's important to understand why server-side extensions are necessary.

A Java servlet is a Java program that runs on a Java-enabled web server or application server. They are used to receive a request from a web server, process it, generate a reply, and then transmit the reply back to the webserver.

#### Prerequisites
You will need the following to follow along with this article:

- [Java JDK, version 1.7 (Java 2 Platform)](https://codenotfound.com/java-download-install-jdk-7-windows.html) installed on your computer.

- An open source Java Editor known as Eclipse.

>If you want to view part of your work in action, you'll need a Web browser that supports 128-bit encryption.

- Some solid basic knowledge of Java is required.

### Table of contents
- [Properties and execution of Java servlets](#properties-and-execution-of-java-servlets)
- [The Servlet Architecture](#the-servlet-architecture)
- [Extensions on the server](#extensions-on-the-server)
- [Common Gateway Interface](#common-gateway-interface)
- [Advantages and Disadvantages of Java Servlet](#advantages-and-disadvantages-of-java-servlet)
- [The Servlet Container](#the-servlet-container)

### Properties and execution of Java servlets
Servlets have two characteristics:  `the function on the server side` and the   `ability to handle sophisticated requests from the web server`.

In execution, Java servlets run in a container, which is a type of operating environment for a component that delivers a variety of services. The Web server or application server generally provides this container. 

The container also handles component security, limiting component access to the local operating environment. Also if desired, it provides authentication services to authenticate a user's identity. 

A request is mapped to a servlet component by the container, which also gives access to a set of developer-defined environment elements. This is because the servlet container processes many requests in various threads. 

As developers, we must be aware of the servlet container's lifecycle and state operations in this multithreaded context and program accordingly. Inexperienced servlet developers are prone to code mistakes due to thread-safe problems.

These coding mistakes may be avoided if you are aware from the outset that some sections of servlet code are not thread-safe.

The execution of the java servlets involves several steps:

- The answer is sent back to the web server by the servlet.
- The client browser receives the answer from the web server and shows it on the screen.
- The request is sent to the appropriate servlet by the webserver.
- The request is processed by the servlet, which then provides an output response.
- Clients make requests to the web server, which then processes them and returns the results to the client.
- The request is received by the webserver.

### The Servlet Architecture
The servlet high-level architectural diagram is shown below. Let's have a look at how each component contributes to the operation of a servlet in more detail.

![architecture_of_java_servlets](/engineering-education/introduction-to-java-servlets/architecture_of_java_servlets.png)

1. **Client**: The client in the design above serves largely as a channel, making HTTP requests to the server and then processing the response it receives. The web browser, as shown in the diagram, is our client.

2. **Web server**: A web server's major purpose is to process the requests and replies that a user sends over time and to keep track of how a web user may access the files that are housed on the server. The server in question is a piece of software that controls access to a network's centralized resource or service. Webservers are divided into two categories:

- A static web server
- A web server that is constantly updated

3. **Web container**: Another common component in servlet design is the web container, which handles interaction with the servlets. A web container has two primary functions:
* Servlet lifecycle management
* Mapping of URLs

A web container is a server-side application that manages and handles all requests that come in via servlets, JSP pages, or any other file system.

### Extensions on the server
As the name suggests, `server-side extensions` are used to create dynamic Web pages. Web pages need a `container` or Web server to enable dynamic Web page functionality. 

Independent Web server vendors offer various proprietary solutions in the form of `APIs` to meet this need.

With the help of these APIs, we can develop Web-based apps. As part of the Java Platform Enterprise Edition, which defines standards for creating dynamic Web applications in Java, Java Servlet is one of the component APIs.

> It's vital to understand the necessity for something before learning about it; after all, this isn't the only technology for producing dynamic Web sites. 

There are other Web server extensions that are linked to Servlet technology such as `CGI scripts` and `Hypertext Preprocessor` (PHP). Java Servlets, on the other hand, are more acceptable since they overcome CGI's constraints, such as slow performance and limited scalability.

### Common Gateway Interface
`Common Gateway Interface` is an independent application that can process user requests and create dynamic content. It is built in any of the computer languages such as C or C++.

When a client requests dynamic Web pages using a CGI program, the Web server carries out the following activities:

- It starts by utilizing the URL to find the requested web page, i.e. the needed CGI program.
- The process then launches a new one to handle the client's request.
- Invokes the CGI application and delivers the request information to the server inside the context of the current process.
- The answer from the CGI application is collected.
- HTTP response produced and delivered to the client once the process has ended.

As a result, the CGI server must establish and delete processes for each request. As the number of clients increases, so does the load on the server, and the time it takes to process requests.

### Advantages and Disadvantages of Java Servlet
#### Advantages
1. Servlets can be kept in memory until they are manually destroyed, allowing them to handle many requests over time. 
2. Furthermore, once a database connection has been established, it may be used to execute many database queries in the same database session.
3. Servlets inherit Java's portability feature and are thus interoperable with almost any web server. The most important feature of a servlet is that it is unaffected by server configuration and can be used with almost any web server.
4. Servlets are also protocol-agnostic, fully supporting FTP, HTTP, SMTP, and other protocols.
5. Servlets are translated into byte codes before being performed, which speeds up the processing time.

#### Disadvantages
1. Creating a servlet is a time-consuming process.
2. Because exceptions are not thread-safe, they must be addressed while creating a servlet.
3. To program a servlet, developers may need more expertise.

### The Servlet Container
`The Servlet container`, often known as the Servlet engine, is a group of nodes that provide the source code for Java Servlet elements.

In basic terms, it's a system that handles Web client requests by managing Java Servlet modules on top of a Web server.

The Servlet container provides the following services:

1. **Network Services**: This method loads a Servlet class. A local file system, a remote file system, or other network services may be used to load data. The network services, the request and responses are sent over provided by the Servlet container.
2. **Decode and Encode MIME-based messages**: Provides decoding and encoding services for MIME-based messages.
3. **Manage Servlet container**: A Servlet's lifecycle is managed by this class.
4. **Resource management**: Static and dynamic resources, including HTML files, Servlets, and JSP pages, are managed via resource management.
5. **Security Service**: Controls resource access permission and authentication.
6. **Session Management**: By adding a session ID to the URL route, the session is kept alive.

### Create a java servlet.
In creating a java servlet the following steps are involved:
- Build a directory hierarchy/structure.
- Build a Servlet.
- Create a Servlet and compile it.
- Inside the `web.xml` file, insert mappings.
- Launch the webserver and make the project available.
- Obtain the servlet

To execute a servlet program, we will need to install and set up the `Apache Tomcat Server`. 

Apache Tomcat is included with Eclipse for `Java EE`. You may begin working on your application once the server has been set up. 

One thing to keep in mind is that each servlet application requires three files: an `index.html file`, a `Java class file`, and a `web.xml file`. 

The first step is to establish a Dynamic Web Project, after which you may proceed. Let's look at how to use servlets to substruct two integers and display the result in the browser.

First, I will create the index.html file.

```html
<!DOCTYPE HTML> 
<html> 
<body> 
 
<form action = "add"> 
 Imput 1st number: <input type="text" name ="number1">
 Input 2nd number: <input type="text" name="number2">
 </form>
 
</body> 
</html>
```
The software above generates a form on which the user may input numbers for the subtraction operation. You will not be able to subtract two integers without the Java class file. So let's make a class file now.

```java
package edureka;

import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class Substract extends HttpServlet {
  public void service(HttpServletRequest req, HttpServletResponse res) throws IOException {
    int x = Integer.parseInt(req.getParameter("number1"));
    int y = Integer.parseInt(req.getParameter("number2"));
    int k = x - y;
    PrintWriter out = res.getWriter();
    out.println("Result is"+k);
  }
} 
```

The final step is to add mappings to the `web.xml` file after producing the Java class file. Let's have a look at how we can do that.

Your web content's `WEB-INF` folder will contain the `web.xml` file. Go to Deployment Descriptor and choose Generate Deployment Descriptor Stub if it is not already present. 

Mappings must be added to the `web.xml` file once it has been created. Let's have a look at how mapping works using the following example:

```html
<?xml version="1.0" encoding="UTF-8"?>
<web-app
	xmlns:xsi="
	<a href="http://www.w3.org/2001/XMLSchema-instance">http://www.w3.org/2001/XMLSchema-instance</a>"
	xmlns="
	<a href="http://java.sun.com/xml/ns/javaee">http://java.sun.com/xml/ns/javaee</a>" xsi:schemaLocation="
	<a href="http://java.sun.com/xml/ns/javaee">http://java.sun.com/xml/ns/javaee</a>
	<a href="http://java.sun.com/xml/ns/javaee/web-app_3_0.xsd">http://java.sun.com/xml/ns/javaee/web-app_3_0.xsd</a>" version="3.0">
	<display-name>Basic</display-name>
	<servlet>
		<servlet-name>substraction</servlet-name>
		<servlet-class>edureka.Add</servlet-class>
	</servlet>
	<servlet-mapping>
		<servlet-name>substraction</servlet-name>
		<url-pattern>/substract</url-pattern>
	</servlet-mapping>
	<welcome-file-list>
		<welcome-file>index.html</welcome-file>
	</welcome-file-list>
</web-app>
```

After that, you may start the server and run the application to receive the required result in the browser.

### Conclusion
In this article, we introduced the foundations of Servlets in a Java web application, its properties and execution, architecture, server-side extensions, and finally advantages and disadvantages. 

We also learned how to create a java servlet and what a common gateway interface was before the introduction of servlets.

---

Peer Review Contributions by: [Dawe Daniel](/engineering-education/authors/dawe-daniel/)

