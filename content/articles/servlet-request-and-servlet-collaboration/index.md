---
layout: engineering-education
status: publish
published: true
url: /servlet-request-and-servlet-collaboration/
title: Servlet request and Servlet Collaboration
description: This tutorial will guide the reader on how to create serverless functions with AWS Lambda and Golang.
author: evans-lodoctor
date: 2021-10-20T00:00:00-10:20
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/servlet-request-and-servlet-collaboration/hero.jpg
    alt: Servlet request and servlet collaboration Image
---
An HTTP request is every kind of information that could be of interest and is requested by your computer from a web server.
<!--more-->
A servletRequest object can forward client information from the request, such as content type, names, and values of parameters, header information, attributes, etc.

### Introduction
The RequestDispatcher interface allows the request to be forwarded or included to another resource. This can be from servlet to another servlet or servlet to HTML file, or servlet to JSP file. 

This can also be used to add other resource content. It's one approach to work with `Servlet Collaboration`.

### Prerequisites
To follow this article along the reader will need the following:
- Some basic knowledge of core Java.
- An introductory path of the servlet and its life cycle.
- Some basic knowledge of HTML is also required.

You will need to install the following tools:
- An open-source editor, such as Eclipse, or any other related Java editor. In my case, I will be using [Eclipse IDE for Java EE Developers 2021‑06 windows version](https://www.eclipse.org/downloads/packages/release/2021-06/r)
- Java JDK current version or any. In my case, I will be using [Java SE Development Kit 17 for Windows 64 bit system](https://download.oracle.com/java/17/latest/jdk-17_windows-x64_bin.zip).
- You need a web browser installed on your computer.
- Server. In my case, I will be using TomCat version 9.0.54 for Windows. You can download it [here](https://dlcdn.apache.org/tomcat/tomcat-9/v9.0.54/bin/apache-tomcat-9.0.54.zip).


### Table of contents
- [ServletRequest](#servletrequest)	
- [Methods of ServletRequest](#methods-of-servletrequest)	
- [ServletRequest interface example](#servletrequest-interface-example)	 
- [RequestDispatcher](#requestdispatcher)	
- [RequestDispatcher Methods](#requestdispatcher-methods)	
- [RequestDispatcher example](#requestdispatcher-example)
- [Conclusion](#conclusion)

### ServletRequest
When we interact with websites, we keep asking web pages to do something for us, for example, client updating their profiles, etc. Whenever a client or user tries to update their profile. In this case, Java provides us with an object of the ServletRequest interface, which forwards requested information to a servlet.
 
The service container creates objects for `ServletRequest` and `ServletResponse` when a customer sends requests to a web server that passes through the service method as an argument. The request object provides access to query information, such as the header and information from the requested database.

### Methods of ServletRequest
The `ServletRequest` interface provides us with many methods to work with client request information. 

Some are explained below:
- `getParameter(String parameterName)`: This method returns a client's requested parameter value of the `String` type. 
- `String[] getParameterValues(type parameterName)`: Majorly used to obtain all values of a given multi-valued parameter name. In this case, it would be useful to work with a list box that contains multiple values in a single parameter.
- `getContentLength()`: The actual size of the type of data requested is returned.
- `Public String getContentType()`: Returns the media type or null if unknown. 
- `Enumeration getParameterNames()`: The name of the target parameter is used to return an enumeration.
- `String getCharacterEncoding()`: If the encoded character is specified, this method will return the name. It returns null in the request body if not specified.
- `public int getServerPort()`: The port number received by this method is returned.
- `public abstract String getServerName()`: It returns the server name which receives the request.
- `ServletInputStream getInputStream()`: Returns the binary data input stream in the query body. 
 - `String getCharacterQueryString()`: Returns the URL path of the request from the protocol name of a type `String.`
- `getInputStream()`: This method returns information stream from the standard output stream of a type `ServletInputStream`.
- `String getLocalAddr()`: It returns the IP address of the interface from which the request has taken.
- `getAttribute(String name)`: It returns the attribute of the requested object set by its name, and the return type is `Object.`
- `Enumeration getAttributeName()`: It returns the Attribute name of the type `Enumeration` available in the current request.
- `ServletContext getServletContext()`: It returns the content of the current Servlet request and the return type is `ServletContext`.
- `removeAttribute(String name)`: Used when removing the attribute from the current request of a type `void.`

### ServletRequest interface example
We will create a user login project with a servlet in this example. In this context, we will be using `getParameter()` to return the value of the specified query parameter name.

#### Steps to create this project

**Step 1:** [Download the Eclipse IDE for Java EE developers](https://www.eclipse.org/downloads/packages/release/2021-06/r) and install, as shown.

![download eclipse](/engineering-education/servlet-request-and-servlet-collaboration/downloadeclipse.PNG)

**Step 2:** Install TomCat current version. In my case, I will be using TomCat version 9.0.10 for Windows. You can download it [here](https://dlcdn.apache.org/tomcat/tomcat-10/v10.1.0-M6/bin/apache-tomcat-10.1.0-M6.zip).

![download Apache TomCat version 9](/engineering-education/servlet-request-and-servlet-collaboration/downloadpage.PNG)

*Extract it to a new folder of your choice.*

![Extracted TomCat files](/engineering-education/servlet-request-and-servlet-collaboration/extract.PNG)

**Step 3:** Open Eclipse IDE for Java EE developers. Create a Dynamic web project by selecting files, new then Dynamic web projects, and press enter as shown.

![create new web project](/engineering-education/servlet-request-and-servlet-collaboration/new.PNG)

**Step 4:** We will name our project `LogInDemo`, and leave the other fields with default values then select `Finish`.

![Project name](/engineering-education/servlet-request-and-servlet-collaboration/projectname.PNG)

**Step 5:** Right-click on the `LogInDemo` on the Project Explorer, select new -> HTML file option and name it `Login.html`. In the HTML page, you created, replace the default code with the following code.

```html
<!DOCTYPE html>
<html>

<head>
    <meta charset="ISO-8859-1">
    <title>login demo</title>
</head>

<body>
    <form action="LoginAction1" method="post">
        <input type="text" name="name" placeholder="Enter username" required>
        <input type="password" name="password" placeholder="Enter password" required>
        <input type="submit" value="submit">
    </form>
</body>

</html>
```

**Step 6:** Create a new servlet file as follows:

- Right-click on `LogInDemo` on the Project Explorer, select new -> servlet as shown.

![creating sevlate page](/engineering-education/servlet-request-and-servlet-collaboration/sevlatepage.PNG)

- Finish by giving your servlet class a name. `LoginAction1` is the name I'll be using.

![servlet class](/engineering-education/servlet-request-and-servlet-collaboration/servletclass.PNG)

- Substitute the code below for the code in the servlet page you just created.

```java



import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet({ "/LogInDemo", "/LoginAction1" })
public class LoginAction1 extends HttpServlet 
{
		
	private static final long serialVersionUID = 1L;

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException 
	{
		String userName=request.getParameter("name");
        String password=request.getParameter("password");
        if(userName.equals("India") && password.equals("1234"))
        {
        response.sendRedirect("welcomePage1.jsp");
        }
        else
        {
        	response.sendRedirect("Login.html");
        }
		
	}

}


```

**Step 5:** Create a new JSP file as follows:

- Right-click on the `LogInDemo` on the Project Explorer, select new -> JSP file as shown.

![new jsp file](/engineering-education/servlet-request-and-servlet-collaboration/newjsp.PNG)

- Finish by giving your jsp page a class name. We'll call it `welcomePage1.jsp` in this case.

![naming jsp file](/engineering-education/servlet-request-and-servlet-collaboration/welcompagejsp.PNG)

- Replace the code in the JSP page you just created with the code below.

```jsp
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<html>

<head>
    <meta charset="ISO-8859-1">
    <title>Insert title here</title>
</head>

<body>
    <h1>Hello World !</h1>
</body>

</html>
```

#### Setup Apache Tomcat server in the Eclipse IDE and run the project
- Select "No servers are available" from the Servers Tab as shown.

![Servers Tab](/engineering-education/servlet-request-and-servlet-collaboration/addsever1.PNG)
 
- Next, select Tomcat v9.0 Server or any of your choice, but I recommend the current version.

![Choose the server version that you want to use.](/engineering-education/servlet-request-and-servlet-collaboration/addserver2.PNG)

- Add Apache installation directory

![Apache installation directory](/engineering-education/servlet-request-and-servlet-collaboration/selectpath.PNG)

Click Finish after adding the Apache installation directory.
 
- Right-click on the `Login.html` page, select Run As then Run on Server.

![Run web project on server](/engineering-education/servlet-request-and-servlet-collaboration/runus.jpg)

- When TomCat server is selected as shown below. Select `Finish` and restart the server when the screen pops up.

![Run web project on server](/engineering-education/servlet-request-and-servlet-collaboration/selectsever.PNG)
 
- In the internal browser, the following page will appear. Try logging in with the credentials we specified in LoginAction1.java (user name `India`, password `1234`)

![Login page.](/engineering-education/servlet-request-and-servlet-collaboration/pageinbrowser.PNG)

#### Explanation
From the example above, the `LoginAction1.java` servlet, in the Post Request form, is called if a user enters the correct credentials on the login page. 

A `doPost ()` will set the user parameters, and store them in variables userName and password, as shown:

```java
      String userName=request.getParameter("name");
      String password=request.getParameter("password");
```

If the user provided the correct details, with the help of the `equals()` method, the `welcomePage1.jsp` will be executed, otherwise, the client browser will remain on the `login.html` page. 

- [Get project source code here](https://github.com/Evanslodoctor/ServletRequest-sourse-code)

### RequestDispatcher
RequestDispatcher interface allows us to send a client query to another resource. `Servlet`, `Html`, `JSP`. It also defines an object that receives the request and includes the content of the target resource.

### RequestDispatcher methods
Here are two methods provided by the `RequestDispatcher` interface, mainly `forward()` and `include()` method explained below.
- `public void forward(ServletRequest request, ServletResponse response)`: This method offers an efficient way to forward customer requests. It can be to HTML file, Servlet, or JSP file from servlet resource.

- `public void include(ServletRequest request, ServletResponse response)`: From its name `include()`, it helps to include in the response the content of another resource.

>**NOTE:** Both of these two methods throw IOExceptions.

### RequestDispatcher example
#### How it works
This example shows how `RequestDispatcher` can forward a resource response or include it on a server. Here we use `index.jsp` to get a user response. In this case, `Controller` Servlet checks the entered response if a user is more than 18 years old or below. 

If the user selects `Above18`, the  `Above18` servlet page will be executed with the help of the `forward()` method. Otherwise, the client browser will remain on the `index.jsp` page and a denial message will appear, indicating that the user is under the age of 18.

Construct the `ServletDispatcherDemo` project as follows, assuming you know how to create and run a web project using the Eclipse IDE and TomCat server as explained in the [ServletRequest interface example](#servletrequest-interface-example) above.

#### Steps to create this project
**Step 1:** Open Eclipse IDE for Java EE developers. Create a web project by selecting Files -> New -> Dynamic Web Project.

**Step 2:** Provide a project name. We will name ours `ServletDispatcherDemo`, then select Finish.

**Step 3:** Right-click on the `ServletDispatcherDemo` on the Project Explorer, select new -> JSP file option.

Give the page you just created a name. We'll call it `index.jsp` in this example. Replace the code in the HTML file with the code below:

```jsp
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<title>page verification</title>
</head>
<body>
<body>
<form action="Controller" method="post">
 <select name="selectOption" required>
  <option value="Select you option">Select you option</option>
  <option value="Above18">Above18</option>
  <option value="below18">below18</option>
 </select>
 <input type="submit" value="Submit">				    
</form>

  <%
  String msg=request.getParameter("msg");
  if("below18".equals(msg))
  {
  %>
 <h1> Access denied! You are below 18 years!<h1>
  <%} %>
</body>
</html>

```

**Step 4:** Create a new servlet file as follows:

- Right-click on the `ServletDispatcherDemo` on the Project Explorer, select new -> servlet and finish by giving your servlet class a name. We'll call it `Controller` in this case.

- Replace the code in the servlet page you just created with the code below:

```java

import java.io.IOException;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
@WebServlet({ "/ServletDispatcherDemo", "/Controller" })
public class Controller extends HttpServlet 
{
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException 
	{
		response.setContentType("Text/html");
		String select=request.getParameter("selectOption");
		HttpSession session=request.getSession();
		session.setAttribute("userName", select);
		
		response.getWriter().append("<html><body'></body></html>");
		if(select.equals("Above18"))
		{
			RequestDispatcher rd=request.getRequestDispatcher("Above18");  
	        rd.forward(request, response); 
	    }	 
		else
		{
			RequestDispatcher rd=request.getRequestDispatcher("index.jsp?msg=below18");
			rd.include(request,response);
		}
		
	}


	

}

```

**Step 5:** Create a new servlet file as follows:

- Right-click on the `ServletDispatcherDemo` on the Project Explorer, select new -> servlet and finish by giving your servlet class a name. We'll call it `Above18` in this case.

- Replace the code in the servlet page you just created with the code below.

```java

import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
@WebServlet({ "/Above18" })
public class Above18 extends HttpServlet 
{
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException 
	{
		PrintWriter out = response.getWriter();  
       
	    out.print("Welcome to the adult page."); 
	}
}

```

Right-click on the `index.jsp` page and choose run As-> Run on Server -> Save all changes and restart the server to run the project. In the internal browser, a menu will appear, prompting you to select your age category.

This example will give you a solid foundation for working with the `ServletDispatcher` interface in your project. To improve your understanding and enhance your coding skills, I recommend that you start exploring more examples.

We assumed the reader knew how to use the Eclipse IDE and configure the Tomcat server in this example. 

If not, take a look at the resources below:
- [ServletRequest example above](#servletrequest-interface-example)
- [Get project source code here](https://github.com/Evanslodoctor/ServletDispatcher-sourse-code)

### Conclusion
In conclusion, we learned some of the `ServletRequest` methods and `ServletDispatcher` methods and how to implement them with the help of examples. We discussed both these interfaces (`ServletRequest` and `ServletDispatcher`) and what they are comprised of.

This article will help you get started with servlet and understand how users send requests to a server. From here, you should be able to use servlet and JSP technology to build your own dynamic website.

Happy coding!!

---
Peer Review Contributions by: [Samuel Mwangi](/engineering-education/authors/samuel-mwangi/)

