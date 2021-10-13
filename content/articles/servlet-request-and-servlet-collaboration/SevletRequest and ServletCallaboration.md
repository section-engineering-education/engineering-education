### Introduction.

The request delivered by your computer to a web server containing every kind of information that could be of interest is known as an HTTP request.
In this case, the ServletRequest object forward client information from the request for a servlet, such as content type, names, and values of parameters, header information, attributes, etc.

The RequestDispatcher interface allows the request to be forwarded or included to another resource, can be from servlet to another servlet or servlet to HTML file, or servlet to JSP file. Also can be used to add other resource content. It's one approach to work with `Servlet Collaboration`.

### Prerequisites
- Some basic knowledge of core Java is needed.
- An introductory path of the servlet and its life cycle is needed.
- Some basic knowledge of HTML is also required.

You will need to install the following tools to go along with the article:
- An open-source editor, such as Eclipse, or any other related Java editor. In my case, I will be using [Eclipse IDE for Java EE Developers 2021‑06 windows version](https://www.eclipse.org/downloads/packages/release/2021-06/r)
- Java JDK current version or any. In my case, I will be using [Java SE Development Kit 17 for Windows 64 bit system](https://download.oracle.com/java/17/latest/jdk-17_windows-x64_bin.zip).
- You need a web browser installed on your computer.
- Server. In my case, I will be using TomCat version 9.0.10 for windows. You can download it [here](https://dlcdn.apache.org/tomcat/tomcat-10/v10.1.0-M6/bin/apache-tomcat-10.1.0-M6.zip).


Table of contents:

- [ServletRequest](#servletrequest)	
- [Methods of ServletRequest](#methods-of-servletrequest)	
- [ServletRequest interface example](#servletrequest-interface-example)	 
- [RequestDispatcher](#requestdispatcher)	
- [RequestDispatcher Methods](#requestdispatcher-methods)	
- [RequestDispatcher example](#requestdispatcher-example)
- [Conclusion](#conclusion)

### ServletRequest
When we talk of websites, we do interact with,
 we keep asking web pages to do something for us, for example, client updating their profiles, etc. Whenever a client or user tries to update their profile. In this case, Java provides us with an object of the ServletRequest interface, which forwards requested information to a servlet. 
The service container creates objects for `ServletRequest` and `ServletResponse` when a customer sends requests to a web server that pass through the service method as an argument. The request object provides access to query information, such as the header and information from the requested database.

### Methods of ServletRequest
The `ServletRequest` interface provides us with many methods to work with client request information. Some explained as follows.

- `getParameter(String parameterName)`: This method returns a client's requested parameter value of the `String` type. 

- `String[] getParameterValues(type parameterName)`: Majorly used to obtained all values of a given multi-valued parameter name. In this case, it would be useful to work with a list box that contains multiple values in a single parameter.

- `getContentLength()`: The actual size of the type of data requested is returned.

- `Public String getContentType()`: Returns the media type or null if unknown. 

- `Enumeration getParameterNames()`: The name of the target parameter is used to return an enumeration.

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
We will create a user login project with a servlet in this example. In this context, we will be using `getParameter()` to return the value of the specified query parameter name.

**Steps to create this project.**

**Step 1:** [Download the Eclipse IDE for Java EE developers](https://www.eclipse.org/downloads/packages/release/2021-06/r) and install, as shown.

![download eclipse](/engineering-education/servlet-request-and-servlet-collaboration/downloadeclipse.png)

**Step 2:** Install TomCat current version. In my case, I will be using TomCat version 9.0.10 for windows. You can download it [here](https://dlcdn.apache.org/tomcat/tomcat-10/v10.1.0-M6/bin/apache-tomcat-10.1.0-M6.zip).

![download Apache TomCat version 9](/engineering-education/servlet-request-and-servlet-collaboration/downloadpage.png)

*Extract it to a new folder of your choice.*

![Extracted TomCat files](/engineering-education/servlet-request-and-servlet-collaboration/extract.png)

**Step 3:** Open Eclipse IDE for Java EE developers. Create a Dynamic web project by selecting files, new then Dynamic web projects, and press enter as shown.

![create new web project](/engineering-education/servlet-request-and-servlet-collaboration/new.png)

**Step 4:** We will name our project `LogInDemo`, and leave the other fields with default values then select Finish.

![Project name](/engineering-education/servlet-request-and-servlet-collaboration/projectname.png)

**Step 5:** Right-click on the `LogInDemo` project, select new -> HTML file option and name it `Login.html`. In the html page you created, replace the default code with the following code.

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

- Right-click on the `LogInDemo project` select new -> servlet as shown.

![creating sevlate page](/engineering-education/servlet-request-and-servlet-collaboration/sevlatepage.png)

- Finish by giving your servlet class a name. `LoginAction1` is the name I'll use.

![servlet class](/engineering-education/servlet-request-and-servlet-collaboration/servletclass.png)

 - Substitute the code below for the code in the servlet page you just created.

```java

import java.io.IOException;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
public class LoginAction1 extends HttpServlet {
		
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

- Right-click on the `LogInDemo project` select new -> JSP file as shown.

![new jsp file](/engineering-education/servlet-request-and-servlet-collaboration/newjsp.png)

- Finish by giving your jsp page a class name. We'll call it `welcomePage1.jsp` in this case.

![naming jsp file](/engineering-education/servlet-request-and-servlet-collaboration/welcompagejsp.png)

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

#### Setup Apache Tomcat Server in the Eclipse IDE and run the project as outlined in the steps below.

- Select "No servers are available" from the Servers Tab as shown.

 ![Servers Tab](/engineering-education/servlet-request-and-servlet-collaboration/addsever1.png)
 
- Next, select Tomcat v9.0 Server. or any of your choice, but I recommend the current version.

![Choose the server version that you want to use.](/engineering-education/servlet-request-and-servlet-collaboration/addserver2.png)

- Add Apache installation Directory

![Apache installation directory.](/engineering-education/servlet-request-and-servlet-collaboration/selectpath.png)

 Click Finish after adding the Apache installation directory.
 
 - Right-click on the `Login.html` page while your cursor is over it. The following screen will then appear. To run the project, select run on server and press enter.

![Run web project on server.](/engineering-education/servlet-request-and-servlet-collaboration/runus.png)

- When tomCat server is selected as shown bellow. Select "Finish" and restat the server when the screen pops up.

![Run web project on server.](/engineering-education/servlet-request-and-servlet-collaboration/selectsever.png)
 
- In the intanal browser, the following page will appear. Try logging in with the credentials we specified in LoginAction.java (user name `India`, password `1234`) and have some fun with the code.Happy coding!

![Login page.](/engineering-education/servlet-request-and-servlet-collaboration/pageinbrowser.png)

**Explanation:**

From the example above, the `LoginAction.java` servlet, in the Post Request form, is called if a user supplies the correct credentials on the login page. A `doPost ()` will set a user parameter, and store it in a variables userName and password, as shown:

```java
      String userName=request.getParameter("name");
      String password=request.getParameter("password");
```
If the user has provided the correct details with the help of the `equals()` method, the `welcomePage.jsp` will be executed; otherwise the client browser will remain on the `login.html` page. 

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

**How it works**

This example shows how  RequestDispatcher can forward a resource response or include it on a server. Here we use `htmlPage.html` to get a user response. In this case, `Controller.java` Servlet checks the entered response if a user has more than 18 years or less, if the user select (under18 ) as the reply, `forward()` will be called to Under18Page Servlet. Above18 servlet is included if the user has entered (above18) otherwise. The client browser will stay on the `htmlPage.html` page.

Construct the `ServletDispatcherDemo` project as follows, assuming you know how to create and run a web project using the eclipse IDE and TomCat server as explained in the [ServletRequest interface example](#servletrequest-interface-example) above.

**Steps to create this project.**

**Step 1:** Open Eclipse IDE for Java EE developers. Create a web project by selecting Files -> New -> Dynamic Web Project.

**Step 2:** Provide a project name. We will name ours `ServletDispatcherDemo`, then select Finish.

**Step 3:** Right-click on the `ServletDispatcherDemo` project, select new -> HTML file option.

Give the page you just created a name. We'll call it `htmlPage.html` in this example. In the html page you created, delete and replace the default code with the following code.

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
 <option value="Below">Below 18 years</option>
 </select><br>
 <input type="submit" value="submit">
</form>
</body>
</html>
```

**Step 4:** Create a new servlet file as follows:

- Right-click on the `ServletDispatcherDemo project` select new -> servlet and finish by giving your servlet class a name. We'll call it `Controller` in this case.

- Replace the code in the servlet page you just created with the code below.

```java

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
		if(select.equals("Below"))
		{
			RequestDispatcher rd=request.getRequestDispatcher("Under18Page");
			rd.include(request,response);
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

**Step 5:** Create a new servlet file as follows:

- Right-click on the `ServletDispatcherDemo project` select new -> servlet and finish by giving your servlet class a name. We'll call it `Under18Page` in this case.

- Replace the code in the servlet page you just created with the code below.

```java

import java.io.IOException;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public class Under18Page extends HttpServlet 
{
	
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException
	{
		response.setContentType("Text/html");
		response.getWriter().append("<html><body style='background-color: red; color: white; text-align: center; padding :200px'><h1>you are under 18</h1></body></html>");
	}


}

```
**Step 7:** Lastly, create a new servlet file as follows:

- Right-click on the `ServletDispatcherDemo project` select new -> servlet and finish by giving your servlet class a name. We'll call it `Above18` in this case.
- Replace the code in the servlet page you just created with the code below.

```java

import java.io.IOException;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
public class Above18 extends HttpServlet 
{
	private static final long serialVersionUID = 1L;

   
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException 
	{
		response.setContentType("Text/html");
		response.getWriter().append("<html><body style='background-color: red; color: white; text-align: center; padding :200px'><h1>you are above 18</h1></body></html>");
	}


}

```
Right-click on the login.html page and choose "run As"-> "Launch on Server"-> "Save all changes and restart the server" to run the project. In the internal browser, a menu will appear, prompting you to select your age category.

In conclusion, this example will give you a solid foundation for working with the `ServletDispatcher` interface in your project. To improve your understanding and enhance your coding skills, I recommend that you start exploring for more examples.

We assumed you already knew how to use the eclipse IDE and configure the Tomcat server in this example. If not, look at the [ServletRequest example above.](servletRequest-interface-example)

**Happy coding!**

[Get project source code here](https://github.com/Evanslodoctor/ServletDispatcher-sourse-code)

### Conclusion
In conclusion, we learned some of the `ServletRequest` methods and `ServletDispatcher` methods and how to implement them with the help of examples. We discussed both these interfaces (`ServletRequest` and `ServletDispatcher`) and what they comprise.

 This article will help you get started with servlet and understand how users send requests to a server. From here, you should be able to use servlet and JSP technology to build your dynamic website.

I urge you to copy and play with the code.

Happy coding!!
