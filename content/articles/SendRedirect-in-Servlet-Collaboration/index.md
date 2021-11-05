### Introduction
The `sendRedirect()` method of the `HTTPServletResponse`, is used to redirect responses from one page to another. This method allows you to move user content from one web page to the next. Evans Lodoctor, a section Engineering contributor, introduced servlet collaboration using the `RequesDispatcher()` method in its [article](https://www.section.io/engineering-education/servlet-request-and-servlet-collaboration/#requestdispatcher-methods). In this article, we will see how the `SendRedirect()` gives the same functionalities.
In basic terms, the `SendRedirect()` method allows you to redirect a user's response to another web page, for example:
```java
String country="Kenya";
if("Kenya".equals(n))
{
    response.sendRedirect("htmlPage.html");
}

```
`SendRedirect()` is used in the above snippet code to direct the client browser to the htmlPage if the condition is satisfied.
### Objectives.
At the end of this article, a learner should know the following:
1. The `SendRedirect()` method and how to use it.
2. Recognize the distinction between the `SendRedirect()` and `forward()` methods.
3. Using an example, learn how to implement the `SendRedirect()` method.

### Prerequisites
- It's necessary to have a basic understanding of Java and the servlet's introduction part.
- It is necessary to have a basic understanding of the `RequestDispatcher()` method. You can learn more about it by clicking [here](https://www.section.io/engineering-education/servlet-request-and-servlet-collaboration/#requestdispatcher-methods).
- Install an open-source editor, such as [Eclipse](https://www.eclipse.org/downloads/packages/release/kepler/sr1/eclipse-ide-java-developers), [Netbeans](https://netbeans.apache.org/download/index.html), etc. In this article, we will use Eclipse IDE.
- Your machine should have Tomcat Server installed. It's available for download on their official [website](https://tomcat.apache.org/). We'll use TomCat version 10 in this case.

### Table of content
- [SendRedirect method and its significance](#sendredirect-method-and-its-significance)
- [Difference between SendRedirect method and RequestDispatcher forward method](#difference-between-sendredirect-method-and-requestdispatcher-forward-method)
- [An example of how to use the SendRedirect method](#an-example-of-how-to-use-the-sendredirect-method)
- [Conclusion](#conclusion)

### SendRedirect method and its significance
One of the `HttpServletResponse` interface's methods is `SendRedirect()`. It's another way to use Servlet Collaboration to route client requests in the form of responses from one page to the next.

The main goal of this method is to send responses from a specific request to the desired web page.

### Difference between SendRedirect method and RequestDispatcher forward method
1. The `forward ()` method of the `RequestDispatcher` works on the server-side, while the `SendRedirect()` method works on the client-side.
2. `SendRedirect()` always sends a new request, whereas `forward()` sends the same request and response objects to another servlet.
3. Request dispatcher works on the request object, while `SendRedirect()` works on the response object.
4. The `forward()` method is also significantly faster than the `SendRedirect()`. This is because, unlike the `forward()` method, the `SendRedirect()` method necessitates two browser requests instead of one.
5. When the `SendRedirect()` method is used, the original `URL` is always changed. However, when the `forward()` method is applied, the original `URL` remains unchanged.
### An example of how to use the SendRedirect method
We'll make a program with the following pages to demonstrate how to use the SendRedirect method:
#### A JSP login page.
 This page includes a login form as well as a paragraph indicating that the information entered is incorrect.
#### Servlet page.
 This page will assist us in determining whether the user's credentials are valid. The user's browser will get directed to the home page if the entered details are correct. If not, a login page will be displayed, and a message will pop up to show that the user has entered incorrect information.
#### Home page in HTML.
 If the user credentials are correct, the SendRedirect() method in the servlet page will redirect the user browser to this page.

 #### NOTE:
 Make sure you understand the following areas before continuing to work on this sample project:
 1. Understanding of how to use Eclipse, a Java IDE, to create Servlet, JSP, and HTML pages.
 2. You should be able to run a web project on a server, such as TomCat.

#### Steps to create this demo project:

#### Step 1: Creating the SendRedirectDemo project.
Open Eclipse or any other Java IDE, create a new Dynamic web project by selecting a new Dynamic web project. Provide your favorite project name. In my case, I will call it SendRedirectDemo.
#### Step 2: Creating Login JSP page 
By right-clicking SendRedirectDemo and selecting New JSP, you can code a JSP page as shown. Provide your JSP class name. I will call it login.

```JSP

<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<title>Insert title here</title>
</head>
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
</html>
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
 #### Creating a home HTML page
 To create this page, right-click on the above project and select new HTML. Finish by providing your HTML page a name. In this case, we will name it home.

 ```HTML

 <!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<title>Home</title>
</head>
<body>
<h1>welcome to the home page</h1>
</body>
</html>
 ```

### Conclusion

In conclusion, we learned about the `SendRedirect()` method and how to use it. We also understand the difference between the Java Servlet's `SendRedirect()` and `forward()` methods. In this case, a learner should know how to implement the `SendRedirect()` method to create interactive web pages.

### References
- [SendRedirect in servlet Javatpoint](https://www.javatpoint.com/sendRedirect()-method)
- [SendRedirect in servlet W3C](https://www.w3adda.com/servlet-tutorial/servlet-sendredirect)
