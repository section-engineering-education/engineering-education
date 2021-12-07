---
layout: engineering-education
status: publish
published: true
url: /the-concept-of-cookies-in-servlets/
title: Getting Started With Cookies in Servlets
description: This tutorial will guide the reader on how to create and read cookies in Servlets. Cookies are text-based bits of information sent by the webserver to the client.
author: evans-lodoctor
date: 2021-11-26T00:00:00-02:50
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/the-concept-of-cookies-in-servlets/hero.png
    alt: Getting Started with cookies in Servlets
---
Cookies are text-based bits of information sent by the webserver to the client. It's delivered along with a client's response. A cookie, in simple words, is a method of keeping a client's state by a web server.
<!--more-->
When a client makes a new request, it sends the request along with all cookies accessible for the server to recognize. When a cookie's life expectancy ends, the client browser deletes it.

### Table of content
- [Table of content](#table-of-content)
- [Prerequisites](#prerequisites)
- [Objectives](#objectives)
- [API for Cookies](#api-for-cookies)
- [How does Cookie work](#how-does-cookie-work)
- [Types of Cookies in Java Servlet](#types-of-cookies-in-java-servlet)
  - [Non persistent cookies](#non-persistent-cookies)
  - [persistent cookies](#persistent-cookies)
- [Advantage of Cookies](#advantage-of-cookies)
- [Disadvantage](#disadvantage)
- [Cookie class and the methods required for cookies](#cookie-class-and-the-methods-required-for-cookies)
  - [Cookie class](#cookie-class)
  - [Methods of Cookie class](#methods-of-cookie-class)
- [How to create, delete, and get cookies](#how-to-create-delete-and-get-cookies)
  - [Creating a new Cookie object](#creating-a-new-cookie-object)
  - [Setting up lifespan for a cookie](#setting-up-lifespan-for-a-cookie)
  - [Sending the cookies to the client](#sending-the-cookies-to-the-client)
  - [Getting cookie from a client request](#getting-cookie-from-a-client-request)
  - [Deletting cookies](#deletting-cookies)
- [Example to demonstrate Servlet Cookie](#example-to-demonstrate-servlet-cookie)
  - [Steps to create this Cookies project](#steps-to-create-this-cookies-project)
  - [Step 1: Creating the Example to demonstrate cookies in servlet project.](#step-1-creating-the-example-to-demonstrate-cookies-in-servlet-project)
  - [Step 2: Creating index.JSP page](#step-2-creating-indexjsp-page)
  - [Step 3: Creating a ProcessOneServlet Servlet page](#step-3-creating-a-processoneservlet-servlet-page)
  - [Step 4: Creating and reading values from Cookies Servlet page](#step-4-creating-and-reading-values-from-cookies-servlet-page)
- [Conclusion](#conclusion)

### Prerequisites
- Basic knowlegde of Java and Servlet.
- Code editor installed on your machine. In this article, we will use [Eclipse IDE](https://www.eclipse.org/downloads/packages/release/kepler/sr1/eclipse-ide-java-developers).
- Tomcat Server installed on your machine. It's available for download on their official [website](https://tomcat.apache.org/). We'll use TomCat version 10 in this case.

### Objectives
Learners should be able to answer the following questions by the end of this article:
1. What is a cookie? And why is it important to use it?
2. How do cookies work? What types of cookies are there in Java Servlet?
3. What is Cookie's class? And what are the methods required for cookies?
4. How to implement cookies in the Java Servlet program?

### API for Cookies
The `Cookie` class in the Servlet API is used to create cookies. This class employs a variety of approaches to give various cookie activities.

The `addCookie()` method, for example, is used to add cookies to the response object. It then sends cookie data from a client to a server or server to a client using the HTTP response.

The `getCookies()` method, on the other hand, is used to access the cookies that have been added to the response object.

### How does Cookie work
When a client makes a new request to a Web Server, the webserver assigns a unique ID as a `cookie`, which is then sent back with the response to the client and saved in the client's browser.

When a client sends another request, the server receives all cookie values stored in text form in the user's browser and uses them to identify the user and their current state.

When a user browses an online store and adds some items to their cart, and then goes on to do something else, he or she may become disconnected from the site; however, when he or she reconnects, he will be able to retrieve his or her previous carts.

In this case, a cookie is used to store information required each time the client visits a website, such as a user ID, name, or other identifiers.

### Types of Cookies in Java Servlet
There are two types of cookies in the servlet, these are Non-persistent, and persistent cookies.

#### Non persistent cookies
A non-persistent/Session cookie is only valid for one session and is automatically deleted when the browser is closed.

#### persistent cookies
It's valid for multiple sessions and, unlike non-persistent cookies, it's not deleted when the user closes the browser; instead, it's deleted only when the user logs out or signs out.

### Advantage of Cookies
- Transparent: Cookies work in this case without the user being aware that data is being saved in their browser.
- Simplest technique: Cookies are the most basic method for keeping client states while connected to a web server.
- Because cookies are stored in the client browser, they reduce the load on the server's memory.

### Disadvantage
- Cookies will only work if the user's web browser allows them; otherwise, they will not.
- In a Cookie object, only textual data can be stored.

### Cookie class and the methods required for cookies
#### Cookie class
A `Cookie` class contains several cookie-related methods that allow you to use cookies.

#### Methods of Cookie class
- `void setMaxAge()`: Cookie's maximum age is set using this `setMaxAge()` method. The cookie lifetime can be specified when max-age is set in web applications.
- `void setValue()`: When a new value is assigned to the cookie, this method is used.
- `String getName()`: Returns the cookie's name, which cannot be modified after it has been created.
- `String getValue()`: This method aids in obtaining the cookie's current value.
- `int getVersion()`: By using this method, you can get the version number of a cookie.
- `void setVersion()`: Cookie's version number is set in this method.
- ` int getMaxAge()`: Using `getMaxAge()`, you can determine the cookie's maximum age.
- `String getPath()`: The path from the cookie is obtained using this method.
- `void setPath()`: This method is used to specify a cookie path. For example, in a web application, it is possible to specify a specific path for the cookies to be saved.
- `String getDomain()`: This method can be used to extract the domain name from a cookie.

### How to create, delete, and get cookies
#### Creating a new Cookie object

```java
Cookie object=new Cookie("uName",variableName);
```

#### Setting up lifespan for a cookie

```java
object.serMaxAge(20*60); // setting maximum age of the cookie.

```

#### Sending the cookies to the client

```java
response.addCookie(object); // adding cookie to the response object.
```

#### Getting cookie from a client request

```java
Cookie[] object=request.getCookies();
```

#### Deletting cookies

```java
Cookie object=new Cookie("userId","");
ck.setMaxAge(0);
response.addCookie(object);
```

### Example to demonstrate Servlet Cookie
We'll develop two servlet classes in this example, one to create cookies and the other to retrieve them. Here, we will create two cookies to hold the user name and the allocated user subject, respectively.

In this scenario, the JSP page gives us a form to fill out with our information, such as user name and subject.

#### Steps to create this Cookies project
#### Step 1: Creating the Example to demonstrate cookies in servlet project.
Open Eclipse or any other Java IDE, create a new Dynamic web project by selecting a new Dynamic web project. Provide your favorite project name. In my case, I will call it `Example to demonstrate cookies in servlet`.

#### Step 2: Creating index.JSP page
By right-clicking on `Example to demonstrate cookies in servlet` and selecting New JSP, you can code a JSP page as shown. Provide your JSP class name. I will call mine `index.jsp`:

```html
<!DOCTYPE html>
<html>

<head>
    <meta charset="ISO-8859-1">
    <title>Insert title here</title>
</head>

<body>
    <form action="ProcessOneServlet">
        Enter User name <input type="text" name="userName" required><br>

        Enter subject <input type="text" name="subject" required><br>
        <input type="submit" value="Click me">
    </form>
</body>

</html>
```

#### Step 3: Creating a ProcessOneServlet Servlet page
You can code a Servlet page as shown below by right-clicking on the `Example to demonstrate cookies in servlet` project selecting New Servlet. First, provide your Servlet class name. I will call mine `ProcessOneServlet`.

```java
import java.io.IOException;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet("/ProcessOneServlet")
public class ProcessOneServlet extends HttpServlet
{
	private static final long serialVersionUID = 1L;

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException
  {
		response.setContentType("text/html");
		String uName=request.getParameter("userName");
		String subject=request.getParameter("subject");
		Cookie object=new Cookie("cookieuName",uName);
		Cookie object2=new Cookie("cookieSubject",subject);
		object.setMaxAge(365*24*60*60);
		response.addCookie(object);
		object2.setMaxAge(365*24*60*60);
		response.addCookie(object2);
		RequestDispatcher req=request.getRequestDispatcher("ReadingValuesFromCookies");
		req.forward(request, response);
	}

}
```

#### Step 4: Creating and reading values from Cookies Servlet page
You can code a Servlet page as shown below by right-clicking on the `Example to demonstrate cookies in servlet` project selecting New Servlet. Provide your Servlet class name. I will call mine `ReadingValuesFromCookies`.

```java
import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet("/ReadingValuesFromCookies")
public class ReadingValuesFromCookies extends HttpServlet
 {
	private static final long serialVersionUID = 1L;

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException
  {
		response.setContentType("text/html");
		PrintWriter out= response.getWriter();
		Cookie arrey[]=request.getCookies();
		out.print("<h1>User name is :"+ arrey[1].getValue()+"</h1>");
		out.print("<h1>Subject :"+ arrey[2].getValue()+"<h1>");
		out.close();
	}

}
```

### Conclusion
In summary, we have learned what cookies are in Java `Servlet` and why they are important to use. We also learned about the `Cookie` class and cookies methods used while creating and sending cookies to the client browser.

You should now to know how to implement the cookies concept.

Happy coding!

---
Peer Review Contributions by: [Odhiambo Paul](/engineering-education/authors/odhiambo-paul/)
