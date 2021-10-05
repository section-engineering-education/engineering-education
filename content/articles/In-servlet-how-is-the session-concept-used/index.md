### In servlet, how is the session concept used?

### Introduction.

A session is a way of keeping track of a client's activity across multiple requests. It simply implies that each time a user queries the server at a specific time interval, the server interprets the client request as a new request. As a result, we must keep track of a user's current status to recognize them.

For session techniques, the `Servlet` application employs four distinct approaches, namely: `HttpSession`, `Cookies`, `Hidden` form field, and `URL` Rewriting

 In this article, we will only discuss `HttpSession`.

 ### Prerequisite.

To go along with the article, you'll need to install the following tools:

- An open-source `Java` IDE, such as Eclipse, NetBeans, etc. In my case, I will be using [Eclipse IDE 2021-09 Linux x86_64](https://www.eclipse.org/downloads/download.php?file=/technology/epp/downloads/release/2021-09/R/eclipse-java-2021-09-R-linux-gtk-x86_64.tar.gz).


- The Java Development Kit (JDK). In my case, I'll be running Linux with the default version of Java, JDK-11 installed.

- Server. In my case, I will be using TomCat version 10.1.0-m5.

You need to have some basic knowledge of:

- core Java.

- An introduction to `servlets`, `JSP`, and basic `HTML` tags is also helpful here. 

### Table of content.

- [The HttpSession and its Functions](#the-httpsession-and-its-functions)

- [HttpSession object](#httpsession-object)

- [HttpSession interface methods](#httpsession-interface-methods)

- [HttpSession Example](#httpsession-example)
 
- [Conclusion](#conclusion)

### The HttpSession and its Functions

`HttpSession` is an interface for binding items together and manipulating session information such as the session id, creation time, and last seen.  

**Functions:**

1. Used to connect objects and.

2. Manipulate information about the session, such as the session id, time created and last seen.  

**How Does HttpSession Work**


- When a client sends a message in the form of a request, a servlet `container` creates a unique session id (identifier) for that particular user and sends it back to the client in the form of a response. And a temporary session is created by the servlet `container`.

- The client returns the session id (identifier) with each request, making it simple for the servlet `container` to determine the request origin.

- Finally, the servlet `container` finds the corresponding id (session identifier) and correlates it with the request using an id (session identifier) retrieved from a client computer.


**The advantages of HttpSessions in servlets**

- Session information is secure and visible.

- The client's browser has no bearing on session usage. Compared to cookies, which are browser-dependent.

- A session can store items of any type, such as text, databases, and datasets. 

**HttpSession Drawbacks**

- There is a performance overhead since the session object is on the server-side. 

- Overhead incurred as a result of data serialization and de-serialization


### HttpSession object

`HttpSession` object helps to keep track of a client's session. From the `HttpSession` object, we may save, get, or delete attributes.

**How to create HttpSession object**

Two ways are available for creating the `HttpSession` object. `HttpServletRequest` provides this functionality.

1. Using `getSession()` method. In this case, a non parameterized `getSession()` method. Returns a session if the session already exists or creates a new session if it does not.

```java 
HttpSession session=request.getSession();

````

2. Using the parameterized `getSession(boolean)` method. This method returns a new session if the `true` parameter is passed.

```java
HttpSession session=request.getSession();
```
**Getting a pre-existing session**

`getSession(false)`. It returns a pre-existing session.

```java
HttpSession session=request.getSession(false);
```

**Destroy existing session.**

`invalidate()` method is used to destroy a session object.

```java
session.invalidate();
```
### HttpSession interface methods

The following are some of the most important Servlet `HttpSession` methods:


- `String getId()`: A unique session identifier (id) is returned. Of a type  `String`.

- `getSession()`: It returns a session that exists or creates a new session if it does not.

- `getSession(boolean I)`: This method creates a new session if `i` is `true`, and returns an existing session if `I` is `false`.

- `getCreationTime()`: This method provides the time measured in milliseconds from the beginning of the session at midnight on `January 1, 1970`.
`GMT`.

- `getLastAccessedTime()`: It is returned the last time the client submitted a session-related request.

- `invalidate()`: used to destroy a session object.

- `isNew()`: If the session is new, `true` is returned; otherwise, `false`.

- `setMaxInactiveInterval(int interval)`: The time in seconds after which the `servlet container` will expire is specified. And the return type is `void`.

- `getMaxInactiveInterval()`: In this method, the maximum time interval per second is, returned.
 


### HttpSession Example

We're going to demonstrate the use of `HttpSession` in this example. We will be using the login and logout pages to see how `HttpSession` prevents direct access to the secured pages. In this case, `index. jsp` is a secured page. A user is required to provide the correct credentials to access the content of the `index.jsp` page.

I strongly advise you to copy and experiment with the following code. Provide a style page if possible to make it seem beautiful.

**Steps to create this project**

**Step 1:** Create a new dynamic web project in the Eclipse IDE for Java EE developers, and give it a name. I'll call it `HttpSessionDemo` in my instance.

**Step 2:** Make a new JSP page with the name `index.jsp`. Copy and paste the code below into the `index.jsp` prepared.

**index.jsp page**

```jsp


<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<title>welcome page</title>
</head>
<body bgcolor="silver">

<h1>Welcome.</h1> 

<form action="LogoutAction" method="post">
<input type="submit" value="logout">
</form>
<%
if(session.getAttribute("userName")==null)
{
response.sendRedirect("LoginPage.jsp");	
}
%>
</body>
</html>

```
**Step 3:** Make a new JSP page called `LoginPage.jsp` and save it, copy the code below and paste it into the `LoginAction.java` created.


**LoginPage.jsp**

```jsp

<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<title>Login page</title>
</head>
<body>
<form action="LoginAction" method="post">
<input type="text" name="userName" placeholder="Enter user name" required><br>
<input type="password" name="password" placeholder="Enter your password" required><br>
<input type="submit" value="login">


</form>

<%
String msg=request.getParameter("msg");
if("invalid".equals(msg))
{
%>
Wrong password or username.
<%} %>
</body>
</html>
```

**Step 4:**  Create a new servlet page and name it `LoginAction.java`. Copy the below code and paste it inside the `LoginAction.java` you created.

**LoginAction.java page**


```java
package com.chaun;

import java.io.IOException;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

public class LoginAction extends HttpServlet
{
	
    public LoginAction() 
    {
      
    }

	
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException 
	{
		String userName=request.getParameter("userName");
		String password=request.getParameter("password");
		
		HttpSession session=request.getSession();
		session.setAttribute("userName", userName);
		
		if(userName.equals("Chaun")&& password.equals("1234"))
		{
			response.sendRedirect("index.jsp");
		}
		else
		{
			response.sendRedirect("LoginPage.jsp?msg=invalid");
		}
		
		
		
	}

}

```

**Step 5:** Finally, make a new servlet page called `LogoutAction.java.` Copy and paste the code below into the `LogoutAction.java` file you generated.

**LogoutAction.java page.**

```java
package com.chaun;

import java.io.IOException;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

public class LoginAction extends HttpServlet
{
	
    public LoginAction() 
    {
      
    }

	
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException 
	{
		String userName=request.getParameter("userName");
		String password=request.getParameter("password");
		
		HttpSession session=request.getSession();
		session.setAttribute("userName", userName);
		
		if(userName.equals("Chaun")&& password.equals("1234"))
		{
			response.sendRedirect("index.jsp");
		}
		else
		{
			response.sendRedirect("LoginPage.jsp?msg=invalid");
		}
		
		
		
	}

}

```
### Conclusion

We've seen how `HttpSession` works in our applications and how useful it is. In this article. We've looked at some of the most essential methods in `HttpSession`, as well as their capabilities. Using the example above will help you understand how `HttpSession` works.

This lesson will assist you in gaining a solid foundation in HttpSession, from which you may progress to the next level. I also recommend that you copy and play with the code above. If feasible, include a style page to make it look more appealing.

Good luck with your coding!
