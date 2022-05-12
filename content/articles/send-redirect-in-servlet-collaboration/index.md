---
layout: engineering-education
status: publish
published: true
url: /send-redirect-in-servlet-collaboration/
title: Getting started with SendRedirect in Servlet Collaboration
description: This tutorial will provide a step-by-step guide on how to implement HTTP redirects from one web page to another using servlet SendRedirect.
author: Chaun864
date: 2021-11-26T00:00:00-01:35
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/send-redirect-in-servlet-collaboration/hero.png
    alt: Getting started with SendRedirect in Servlet Collaboration Hero Image
---
The `sendRedirect()` method of the `HTTPServletResponse` redirects responses from one page to another. This method allows you to move user content from one web page to the next.
<!--more-->
In this article, we will see how the `SendRedirect()` gives the same functionalities.

### Table of content
- [Table of content](#table-of-content)
- [Objectives](#objectives)
- [Prerequisites](#prerequisites)
- [SendRedirect method and its significance](#sendredirect-method-and-its-significance)
- [Difference between SendRedirect method and RequestDispatcher forward method](#difference-between-sendredirect-method-and-requestdispatcher-forward-method)
- [Using SendRedirect method](#using-sendredirect-method)
	- [A JSP login page](#a-jsp-login-page)
	- [Servlet page](#servlet-page)
	- [Home page in HTML](#home-page-in-html)
	- [Step 1: Creating the SendRedirectDemo project](#step-1-creating-the-sendredirectdemo-project)
	- [Step 2: Creating login JSP page](#step-2-creating-login-jsp-page)
	- [Step 3: Creating a SevletPage](#step-3-creating-a-sevletpage)
	- [HTML home page](#html-home-page)
- [Conclusion](#conclusion)
- [References](#references)

An introduction to servlet collaboration using the `RequesDispatcher()` method can be found in this [article](/engineering-education/servlet-request-and-servlet-collaboration/#requestdispatcher-methods). 

In basic terms, the `SendRedirect()` method allows you to redirect a user's response to another web page, for example:

```java
String country="Kenya";
if("Kenya".equals(n))
{
    response.sendRedirect("htmlPage.html");
}
```

`SendRedirect()` is used in the code snippet above to direct the client browser to the htmlPage if the condition is satisfied.

### Objectives
At the end of this article, you should know the following:
1. The `SendRedirect()` method and its use.
2. Recognize the distinction between the `SendRedirect()` and `forward()` methods.
3. Using an example, learn how to implement the `SendRedirect()` method.

### Prerequisites
- Basic understanding of Java and the servlet's.
- Basic understanding of the `RequestDispatcher()` method. You can learn more [here](/engineering-education/servlet-request-and-servlet-collaboration/#requestdispatcher-methods).
- Code editor installed on your machine, i.e. [Eclipse](https://www.eclipse.org/downloads/packages/release/kepler/sr1/eclipse-ide-java-developers), or [Netbeans](https://netbeans.apache.org/download/index.html). In this article, we will use Eclipse IDE.
- Tomcat Server installed on your computer. It's available for download on their official [website](https://tomcat.apache.org/). We'll use TomCat version 10 in this case.

### SendRedirect method and its significance
One of the `HttpServletResponse` interface's methods is `SendRedirect()`. It's another way to use Servlet Collaboration to route client requests in the form of responses from one page to the next.

The main goal of this method is to send responses from a specific request to the desired web page.

### Difference between SendRedirect method and RequestDispatcher forward method
1. The `forward ()` method of the `RequestDispatcher` works on the server-side, while the `SendRedirect()` method works on the client-side.
2. Request dispatcher works on the request object, while `SendRedirect()` works on the response object.
3. The `forward()` method is also significantly faster than the `SendRedirect()`. This is because, unlike the `forward()` method, the `SendRedirect()` method necessitates two browser requests instead of one.
4. When the `SendRedirect()` method is used, the original `URL` is always changed. However, when the `forward()` method is applied, the original `URL` remains unchanged.

### Using SendRedirect method
We'll make a program with the following pages to demonstrate how to use the SendRedirect method:

#### A JSP login page
This page includes a login form and a paragraph indicating that the information entered is incorrect.

#### Servlet page
This page will assist us in determining whether the user's credentials are valid. The user's browser will get directed to the home page if the entered details are correct. If not, a login page will be displayed, and a message will pop up to show that the user has entered incorrect information.

#### Home page in HTML
If the user credentials are correct, the SendRedirect() method in the servlet page will redirect the user browser to this page.

#### Step 1: Creating the SendRedirectDemo project
Open Eclipse or any other Java IDE, create a new Dynamic web project by selecting a new Dynamic web project. Provide your favorite project name. In my case, I will call it SendRedirectDemo.

#### Step 2: Creating login JSP page
By right-clicking SendRedirectDemo and selecting New JSP, you can code a JSP page as shown. Provide your JSP class name. I will call mine login.

The JSP page's body is shown below:

```html
<body>
<form action="SevletPage" method="post">
Enter User name <input type="text" name="userName" required><br>

Enter password <input type="password" name="password" required><br>
<input type="submit" value="login">
</form>
<%
String message=request.getParameter("message");

if("invalid".equals(message))
{
%>
<p>Wrong password or user name, please try again!</p>
<%} %>
</body>

```

#### Step 3: Creating a SevletPage
By right-clicking SendRedirectDemo and selecting New Servlet, you can code a Servlet page as shown below. Provide your Servlet class name. I will call it SevletPage.

```java
package sendredirect.demo;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.*;

@WebServlet("/SevletPage")
public class SevletPage extends HttpServlet
{
	private static final long serialVersionUID = 1L;


	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException
	{
		String userName=request.getParameter("userName");
		String password=request.getParameter("password");
	if("Kenya".equals(userName)&& "12345".equals(password))
	{
		response.sendRedirect("home.html");
	}
	else
	{
		response.sendRedirect("Login.jsp?message=invalid");
	}
	}

}
```

#### HTML home page
To create this page, right-click on the project above and select new HTML. Finish by giving your HTML page a name. In this case, we will name it home.

The HTML page's body is shown below:

```HTML
<body>
<h1>welcome to the home page</h1>
</body>
```

Click [here](https://github.com/Chaun864/SendRedirect-Demo) to download the complete source code.

### Conclusion
In conclusion, we learned about the `SendRedirect()` method and its use. We also understood the difference between the Java Servlet's `SendRedirect()` and `forward()` methods. You should now know how to implement the `SendRedirect()` method to create interactive web pages.

Happy coding!

### References
- [SendRedirect in servlet Javatpoint](<https://www.javatpoint.com/sendRedirect()-method>)
- [SendRedirect in servlet W3C](https://www.w3adda.com/servlet-tutorial/servlet-sendredirect)

---
Peer Review Contributions by: [Odhiambo Paul](/engineering-education/authors/odhiambo-paul/)
