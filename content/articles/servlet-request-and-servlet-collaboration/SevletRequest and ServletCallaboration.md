### Introduction.

The request delivered by your computer to a web server containing every kind of information that could be of interest is known as an HTTP request.
In this case, the ServletRequest object forward client information from the request for a servlet, such as content type, names, and values of parameters, header information, attributes, etc.

The RequestDispatcher interface allows the request to be forwarded or included to another resource, can be from servlet to another servlet or servlet to HTML file, or servlet to JSP file. Also can be used to add other resource content. It's one approach to work with `Servlet Collaboration`.
### Prerequisites
- Some basic knowledge of core Java is needed.
- An introductory path of the servlet and its life cycle is needed.
- Some basic knowledge of HTML is also required.
- 
You will need to install the following tools to go along with the article:
- An open-source editor, such as Eclipse, or any other related Java editor. In my case, I will be using [Eclipse IDE for Java EE Developers 2021‑09 windows version](https://www.eclipse.org/downloads/download.php?file=/oomph/epp/2021-09/R/eclipse-inst-jre-win64.exe)
- Java JDK current version or any. In my case, I will be using [Java SE Development Kit 17 for Windows 64 bit system](https://download.oracle.com/java/17/latest/jdk-17_windows-x64_bin.zip).
- You need a web browser installed on your computer.
- Server. In my case, I will be using TomCat version 10.1.0-m5


Table of contents:

- [ServletRequest](#ServletRequest)	
- [Methods of ServletRequest](#Methods-of-ServletRequest)	
- [ServletRequest interface example](#ServletRequest-interface-example)	 
- [RequestDispatcher](#RequestDispatcher)	
- [RequestDispatcher Methods](#RequestDispatcher-Methods)	
- [RequestDispatcher example](#RequestDispatcher-example)
- [Conclusion](#conclusion)
- 
### ServletRequest
When we talk of websites, we do interact with,
 we keep asking web pages to do something for us, for example, client updating their profiles, etc. Whenever a client or user tries to update their profile. In this case, Java provides us with an object of the ServletRequest interface, which forwards requested information to a servlet. 
The service container creates objects for `ServletRequest` and `ServletResponse` when a customer sends requests to a web server that pass through the service method as an argument. The request object provides access to query information, such as the header and information from the requested database.


### Methods of ServletRequest
The `ServletRequest` interface provides us with many methods to work with client request information. Some explained as follows.

- `getParameter(String parameterName)`: This method returns a client's requested parameter value of the `String` type. 

- `String[] getParameterValues(type parameterName)`: Majorly used to obtained all values of a given multi-valued parameter name. In this case, it would be useful to work with a list box that contains multiple values in a single parameter.

- `getContentLength()`: The actual size of the type of data requested is returned.

- `Public String getContentType()`: Returns the media type or, if unknown, null data requests. 

- `Enumeration getParameterNames()`: The name of the target parameter is used to return an enumeration

- `String getCharacterEncoding()`: If the encoded character is specified, this method will return the name. It returns null in the request body if not specified.

- `public int getServerPort()`: The port number received by this method is returned.

- ``public abstract String getServerName()``:  It returns the server name which receives the request.

- `ServletInputStream getInputStream()`: Returns the binary data input stream in the query body. 

 - `String getCharacterQueryString()`: Returns the URL path of the request from the protocol name of a type `String.`

- `getInputStream()`: This method returns information stream from the standard output stream of a type `ServletInputStream`

- ``String getLocalAddr()``: It returns the IP address of the interface from which the request has taken.

- `getAttribute(String name)`:  It returns the attribute of the requested object set by its name, and the return type is `Object.`

- `Enumeration getAttributeName()`: It returns the Attribute name of the type `Enumeration` available in the current request.

- `ServletContext getServletContext()`: It returns the content of the current Servlet request and the return type is `ServletContext`.

- `removeAttribute(String name)`: Used when removing the attribute from the current request of a type `void.`

### ServletRequest interface example
We will create a user login project with a servlet in this example. In this context, we have been using `getParameter()` to return the value of the specified query parameter name.
**Steps to create this project.**

Step 1: Open Eclipse IDE for Java EE developers. Create a Dynamic web project by selecting files, new then Dynamic web projects, and press enter.
Step 2: Provide a project name. Mine is called LogInDemo.
Step 3: Create an `index.html` page as shown below.
```html
<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<title>login demo</title>
</head>
<body>
 <form action="LoginAction" method="post">
        <input type="text" name="name" placeholder="Enter username" required>
         <input type="password" name="password" placeholder="Enter userName" required>
         <input type="submit" value="submit">
         </form>
</body>
</html>
```
Step 4: Create `login.java` servlet file.
```java
package com.lodoctor;

import java.io.IOException;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
public class LoginAction extends HttpServlet {
	
	
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException 
	{
		String userName=request.getParameter("name");
        String password=request.getParameter("password");
        if(userName.equals("Evans") && password.equals("lodoctor"))
        {
        response.sendRedirect("welcomePage.jsp");
        }
        else
        {
        	response.sendRedirect("loginHtmlPage.html");
        }
		
	}

}

```
Step 5: Lastly, create the `welcomePage.jsp` file.
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
[Get project source code here](https://github.com/Evanslodoctor/ServletRequest-sourse-code)

### RequestDispatcher
RequestDispatcher interface allows us to send a client query to another resource.
`Servlet`, `Html`, `JSP`. It also defines an object that receives the request and includes the content of the target resource.

### RequestDispatcher Methods
Here are two methods provided by the `RequestDispatcher` interface, namely: 

`forward()` and `include()` method explained as follows.
- `public void forward(ServletRequest request, ServletResponse response)`: This method offers an efficient way to forward customer requests. It can be to Html file, servlet or JSP file from servlet resource.

- `public void include(ServletRequest request, ServletResponse response)`: From its name `include()`, It helps to include in the response the content of another resource.

**NOTE:** Both of these two methods throw IOExceptions.
### RequestDispatcher example
This example shows how  RequestDispatcher can forward a resource response or include it on a server. Here we use `htmlPage.html` to get a user response. In this case, `Controller.java` Servlet checks the entered response if a user has more than 18 years or less if the user select (under18 ) as the reply, `forward()` will be called to Under18Page Servlet. Above18 servlet is included if the user has entered (above18) otherwise. The client browser will stay on the `htmlPage.html` page.

*htmlPage.html*
```html
<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<title>Welcome</title>
</head>
<body>
<form action="Controller">
 <select name="selectOption">
 <option value="select your category">select your category</option>
 <option value="Older">Older than 18</option>
 <option value="Bellow">Bellow 18 years</option>
 </select><br>
 <input type="submit" value="submit">
</form>
</body>
</html>
```
*Controller.java servlet1 page*
```java
package com.lodoctor;

import java.io.IOException;

import jakarta.servlet.RequestDispatcher;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;



public class Controller extends HttpServlet 
{
	
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException 
	{
		response.setContentType("Text/html");
		String select=request.getParameter("selectOption");
		response.getWriter().append("<html><body style='background-color: red;'></body></html>");
		if(select.equals("Bellow"))
		{
			RequestDispatcher rd=request.getRequestDispatcher("Under18Page");
			rd.forward(request,response);
		}
		if(select.equals("Older"))
		{
			RequestDispatcher rd=request.getRequestDispatcher("Above18");
			rd.include(request,response);
		}
		else
		{
			RequestDispatcher rd=request.getRequestDispatcher("htmlPage.html");
			rd.forward(request,response);
		}
		
	}

	

}

```
*Under18page.java servlet2 page*
```java
package com.lodoctor;

import java.io.IOException;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public class Under18Page extends HttpServlet {
	
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException
	{
		response.setContentType("Text/html");
		response.getWriter().append("<html><body style='background-color: red; color: white; text-align: center; padding :200px'><h1>you are under 18</h1></body></html>");
	}


}

```
*Above18.java servlet3 page*
```java
package com.lodoctor;

import java.io.IOException;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
public class Above18 extends HttpServlet {
	private static final long serialVersionUID = 1L;

   
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException 
	{
		response.setContentType("Text/html");
		response.getWriter().append("<html><body style='background-color: red; color: white; text-align: center; padding :200px'><h1>you are above 18</h1></body></html>");
	}


}

```
[Get project source code here](https://github.com/Evanslodoctor/ServletDispatcher-sourse-code)
### Conclusion
In conclusion, we learned some of the `ServletRequest` methods and `ServletDispatcher` methods and how to implement them with the help of examples. We discussed both these interfaces (`ServletRequest` and `ServletDispatcher`) and what they comprise.

 This article will help you get started with servlet and understand how users send requests to a server. From here, you should be able to use servlet and JSP technology to build your dynamic website.

I urge you to copy and play with the code.

Happy coding!!
