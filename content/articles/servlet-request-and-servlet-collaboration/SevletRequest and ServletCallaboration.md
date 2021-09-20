### Servlet Request and Servlet Collaboration.

The request delivered by your computer to a web server contains every kind of information that could be of interest. It is known as HTTP requests.
In this case, the ServletRequest object forward client information from the request for a servlet, such as content type, names and values of parameters, header information, attributes, etc.

The RequestDispatcher interface allows the request to be forwarded or included to another resource, can be from servlet to another servlet or servlet to HTML file, or servlet to JSP file. Also can be used to add other resource content. It's one approach to work with the servlet Collaboration.
### Prerequisites
- Some basic knowledge of core Java is needed.
- Introductory path of the servlet and its life cycle is needed.
- Some basic knowledge of HTML is also required.
You will need to install the following tools to go along with the article:
- An open-source editor, such as Eclipse, or any other related Java editor.
- Java JDK current version or any.
- You need a web browser installed on your computer.
- Server. In my case, I will be using TomCat version 10.1.0-m5


Table of contents:

- [ServletRequest Interface](ServletRequest-Interface )	
- [Methods of ServletRequest interface](#Methods-of-ServletRequest-interface)	
- [Example of ServletRequest interface](#Example-of-ServletRequest-interface)	 
- [RequestDispatcher Interface](#RequestDispatcher-Interface)	
- [Methods of RequestDispatcher interface](#Methods-of-RequestDispatcher-interface)	
- [Example of RequestDispatcher](#Example-of-RequestDispatcher)
- [Conclusion](#conclusion)
### ServletRequest Interface.
When we talk of websites, we do interact with,
 we keep asking web pages to do something for us, for example, client updating their profiles, etc. Whenever a client or user tries to update their profile. In this case. Java provides us with an object of the ServletRequest interface, which forwards client requested information to a servlet. 
The service container creates ServletRequest and ServletResponse objects when a client sends a request to a web server, which passe as an argument in the service method.
 The request object allows access to request information such as the header and the requested data body information.


### Methods of ServletRequest interface
The ServletRequest interface provides us with many methods to work with client request information. Some explained as follows.

- `String getParameter(String variableName)`: This method returns a value of parameter requested by a client of a return type `String`. 

- `String[] getParameterValues(type parameterName)`: Majorly used to obtained all values of a given multi-valued parameter name. In this case, useful while working with the multi-select list box where a single parameter may contain multiple values. 

- `public int getContentLength()`: It  returns the actual size of requested data of type `int`.

- `Public String getContentType()`:  Returns the data of a request Internet Media Type, or null, if unknown. 

- `Enumeration getParameterNames()`: It’s used to return an enumeration of all target parameter name.

- `String getCharacterEncoding()`: This method returns the name if the encoded character is specified. If not specified, it returns null in the body of the request.

- `public int getServerPort()`: This method returns the port number that received this request.

- ``public abstract String getServerName()``:  It returns the server name which receives the request.

- `ServletInputStream getInputStream(): throws IOException`: Returns the binary data input stream in the query body. 

 - `String getCharacterQueryString()`: Returns the url path of the request from the protocol name of a type `String.`

- `getInputStream()`: This method returns information stream from the standard output stream of a type `ServletInputStream`

- ``String getLocalAddr()``: It returns the IP address of the interface from which the request has taken.

- `getAttribute(String name)`:  It returns the attribute of the requested object set by its name, and the return type is `Object.`

- `Enumeration getAttributeName()`: It returns the Attribute name of the type Enumeration available in the current request.

- `ServletContext getServletContext()`: It returns the content of the current Servlet request and the return type is `ServletContext`.

- `removeAttribute(String name)`: Used when removing the attribute from the current request of a type `void.`

### Example of ServletRequest interface
In this example, we are going to create a user login project using servlet. We used the getParameter method () to return the value of the specified request parameter name in this context.

**Steps to create this project.**

1. Open eclipse IDE for Java EE developers.
2. Create a Dynamic web project by selecting files, new and Dynamic web project and press enter.
3. Provide a project name. Mine is called LogInDemo.
4. Create an html page as shown below.
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
5. Create login servlet file.
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
6. Lastly, create the welcomePage.jsp file.
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
[Get project source code here]
(https://drive.google.com/drive/folders/1V2gDQ_sJWC0tEIXvdPhZbB400NJ56oCI?usp=sharing)
### RequestDispatcher Interface
RequestDispatcher interface provides us a way of dispatching a client request to another resource it may be Html, JSP, or servlet. It also defines an object that receives the request and includes the content of the target resource.

### Methods of RequestDispatcher interface
Here are two methods provided by the RequestDispatcher interface, namely: 

forward() and include() method explained as follows.
- `public void forward(ServletRequest request, ServletResponse response)throws ServletException,java.io.IOException`: This method provides an effective way of forwarding client requests from servlet to another resource on the server, can be to Html file, servlet, or JSP file.

- `public void include(ServletRequest request, ServletResponse response)throws ServletException,java.io.IOException`: From its name `include(),` it helps to include the content of another resource in the response.

**NOTE:** Both of these two methods throw IOExceptions.
### Example of RequestDispatcher
This example demonstrates how `RequestDispatcher` can forward or include a resource response on a server. Here we use htmlPage.html to get a user response. In this case, Controller.java Servlet checks the entered response if a user has more than 18 years or less if the user passe  (under18 ) as the reply,  forward() will be called to Under18Page Servlet and  Above18 servlet included if the user has entered (above18) otherwise the client browser will stay in htmlPage.html page.

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
[Get project source code here]
(https://drive.google.com/drive/folders/1S0S2SJKG1PIwRGX-zll25Y3mTrCOLy5D?usp=sharing)
### Conclusion
In conclusion, we learned some of the ServletRequest methods and ServletDispatcher methods and how to implement them with the help of examples. We discussed both these interfaces (ServletRequest and ServletDispatcher) and what they comprise.

 This article will help you get started with servlet and understand how users send requests to a server. From here, you should be able to use servlet and JSP technology to build your dynamic website.

I encourage you to copy the code and play around with it.
Happy coding!!