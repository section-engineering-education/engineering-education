A session is a way of keeping track of a client's activity across multiple requests. It simply implies that each time a user queries the server at a specific time interval, the server interprets the client request as a new request.

As a result, we must keep track of a user's current status to recognize them.

For session techniques, the `Servlet` application employs four distinct approaches, namely: `HttpSession`, `Cookies`, `Hidden` form field, and `URL` rewriting.

In this article, we will only discuss [HttpSession](https://docs.oracle.com/javaee/7/api/javax/servlet/http/HttpSession.html).

### Prerequisite
To go along with the article, you'll need to install the following tools:
- An open-source `Java` IDE, such as Eclipse, NetBeans, etc. In my case, I will be using [Eclipse IDE 2021-09 Linux x86_64](https://www.eclipse.org/downloads/download.php?file=/technology/epp/downloads/release/2021-09/R/eclipse-java-2021-09-R-linux-gtk-x86_64.tar.gz).
- The Java Development Kit (JDK). In my case, I'll be running Linux with the default version of Java, `JDK-11` installed.
- A server. In my case, I will be using TomCat version 9.0.53.
- You need to have some basic knowledge on core Java, servlets, JSP, and basic HTML tags. 

### Table of contents
- [The HttpSession and its Function](#the-httpsession-and-its-function)
- [HttpSession object](#httpsession-object)
- [HttpSession interface methods](#httpsession-interface-methods)
- [HttpSession Example](#httpsession-example)
- [Conclusion](#conclusion)

### The HttpSession and its function
[HttpSession](https://docs.oracle.com/javaee/7/api/javax/servlet/http/HttpSession.html) is an interface for binding items together and manipulating session information such as the session ID, creation time, and last seen.  

#### Function
It's used to connect objects and manipulate information about the session, such as the session id, time created and last seen.  

#### How does HttpSession work?
- When a client sends a message in the form of a request, a servlet `container` creates a unique session id (identifier) for that particular user and sends it back to the client in the form of a response. And, a temporary session is created by the servlet `container`.
- The client returns the session id (identifier) with each request, making it simple for the servlet `container` to determine the request origin.
- Finally, the servlet `container` finds the corresponding id (session identifier) and correlates it with the request using an id (session identifier) retrieved from a client computer.


#### The advantages of HttpSessions in servlets
- Session information is secure and visible.
- The client's browser has no bearing on session usage. Compared to cookies, which are browser-dependent.
- A session can store items of any type, such as text, databases, and datasets.

#### HttpSession drawbacks
- There is a performance overhead since the session object is on the server-side. 
- Overhead incurred as a result of data serialization and de-serialization.

### HttpSession object
`HttpSession` object helps to keep track of a client's session. From the `HttpSession` object, we can save, get, or delete attributes.

#### How to create HttpSession object?
We can create `HttpSession` object using `HttpServletRequest` or by using `getSession()` method.

##### Using `getSession()` method
In this case, a non parameterized `getSession()` method returns a session, if it already exists or creates a new session if it does not.

```java 
HttpSession session = request.getSession();
```

Using the parameterized `getSession(boolean)` method, it returns a new session if we pass `true` parameter.

#### Creating new session
```java
HttpSession session = request.getSession(true);
```

#### Fetching a pre-existing session
`getSession(false)` fetches a pre-existing session.

```java
HttpSession session = request.getSession(false);
```

#### Destroy existing session
`invalidate()` method destroys a session object.

```java
session.invalidate();
```

### HttpSession interface methods
The following are some of the most important Servlet `HttpSession` methods:

- `String getId()` - an unique session identifier (id) is returned with a type `String`.
- `getSession()` - returns a session that exists or creates a new session if not.
- `getSession(boolean I)` - creates a new session if `i` is `true`, and returns an existing session if `I` is `false`.
- `getCreationTime()` - provides the time measured in milliseconds from the beginning of the session at midnight on `January 1, 1970`.
- `getLastAccessedTime()` - returns the last time the client submitted a session-related request.
- `invalidate()` - destroys a session object.
- `isNew()` - If the session is new, `true` is returned, else `false`.
- `setMaxInactiveInterval(int interval)` - The time in seconds after which the `servlet container` will expire is specified. And the return type is `void`.
- `getMaxInactiveInterval()` - the maximum time interval per second is returned.

### HttpSession example
We're going to demonstrate the use of `HttpSession` in this example.

We will be using the login and logout pages to see how `HttpSession` prevents direct access to the secured pages.

In this case, `index. jsp` is a secured page.

A user is required to provide the correct credentials to access the content of the `index.jsp` page.

I strongly advise you to copy and experiment with the following code.

#### Steps to create this project
1. Create a new dynamic web project in the Eclipse IDE for Java EE developers, and give it a name. I'll call it `HttpSessionDemo` in my instance.
2. Make a new JSP page with the name `index.jsp`. Copy and paste the code below into the `index.jsp` prepared:

**index.jsp**

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
      } %>
  </body>
</html>
```

3. Make a new JSP page called `LoginPage.jsp` and save it. Copy the code below and paste it into the `LoginAction.java` created.

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
        { %>
          Wrong password or username.
        <%} %>
  </body>
</html>
```

4. Create a new servlet page and name it `LoginAction.java`.
   
**LoginAction.java**

```java
import java.io.IOException;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

public class LoginAction extends HttpServlet
{
	
    public LoginAction() {}

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

5. Finally, make a new servlet page called `LogoutAction.java.`

**LogoutAction.java**

```java
import java.io.IOException;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

public class LoginAction extends HttpServlet
{
    public LoginAction() {}

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

#### How to create and run the above project
##### Download and install the Eclipse IDE for Java EE developers
1. First, check to see if you have Java installed on your computer using the following command.

```bash
java --version
```

If you don't have Java installed, you'll probably get the following message:

```bash
Command 'java' not found, but can be installed with:
sudo apt install openjdk-11-jre-headless  # version 11.0.11+9-0ubuntu2, or
sudo apt install default-jre              # version 2:1.11-72
sudo apt install openjdk-15-jre-headless  # version 15.0.3+3-1
sudo apt install openjdk-16-jre-headless  # version 16.0.1+9-1
sudo apt install openjdk-17-jre-headless  # version 17~19-1ubuntu1
sudo apt install openjdk-8-jre-headless   # version 8u292-b10-0ubuntu1
```

2. Using the command below, install `OpenJDK 11`.

```bash
sudo apt update
sudo apt install openjdk-11-jre-headless
```

3. Visit [Eclipse](https://www.eclipse.org/downloads/) to get the Eclipse Installer from the official website.
4. Extract the `tar.gz` archive, then go to the "eclipse-installer" folder, right-click on "eclipse-inst," and select "run".
5. When the installation is complete, open eclipse and select launch from the menu as indicated.

![Launch eclipse](/engineering-education/using-session-in-java-servlets/launch.png)

##### Installing Tomcat server
1. Make a System User account.

It's not a good idea to run Tomcat as the root user. The Tomcat service will be run by a new system user and group with the home directory `/opt/tomcat`.

Enter the following command to do so:

```bash
sudo useradd -m -U -d /opt/tomcat -s /bin/false tomcat
```

2. To install Tomcat Server
To begin with, open a terminal and run the following command to obtain the most recent package information:

```
sudo apt update
```

[Tomcat can be downloaded from their official website.](https://tomcat.apache.org/index.html) as shown.

![Download tomcat current version](/engineering-education/using-session-in-java-servlets/tomcatdownload.png)

Extract the tar file to the /opt/tomcat directory once the download is complete:

```bash
sudo tar -xf /tmp/apache-tomcat-${VERSION}.tar.gz -C /opt/tomcat/
```

##### How to create JSP and servlet pages
1. Use the following demonstration to create the servlet pages from the project above.

Right-click on the project name, click on `New` and then select the servlet option as shown:
  
![creating sevlate page](/engineering-education/using-session-in-java-servlets/sevlatepage.png)

Finish by giving your servlet class a name as shown:

![servlet class](/engineering-education/using-session-in-java-servlets/servletclass.png)

Using the code above, create the other servlet pages needed using the same procedure.

2. Make the JSP pages in the project above, following the instructions below.

Right-click on the project name, then click on `New` and then select the JSP option as shown:

![new jsp file](/engineering-education/using-session-in-java-servlets/newjsppage.png)

Name your JSP page and select `Finish`:

![naming jsp file](/engineering-education/using-session-in-java-servlets/jspclassname.png)

##### Configuring Tomcat in Eclipse
- From the `Servers` Tab, select "No servers are available," as indicated:

![Select no server available](/engineering-education/using-session-in-java-servlets/noserver.png)
 
- Next, select `Tomcat v9.0` Server.

![Select the sort of server you want to make.](/engineering-education/using-session-in-java-servlets/addserver2.png)

- Add Apache installation Directory

![Apache installation directory.](/engineering-education/using-session-in-java-servlets/selectpath.png)

Click `Finish` after adding the Apache installation directory.
 
- Right-click on the `LoginPage.jsp` page while your cursor is over it. The following screen will then appear. To run the project, select `Run` on server and press enter.

![Run web project on server.](/engineering-education/using-session-in-java-servlets/runus.png)

- When TomCat server is selected. Select "Finish" and restat the server when the screen pops up.
 
- The following page will appear in the intanal browser. Log in using the credentials we specified in `LoginAction.java` and play around with the code.

![Login page.](/engineering-education/using-session-in-java-servlets/loginpage.png)

You can check out the full code [here](https://github.com/Chaun864/Login-Logout-web-Project-Using-session-servlet-and-jsp-.git).

### Conclusion
We've seen how `HttpSession` works in our applications and how useful it is.

In this article, we've looked at some of the most essential methods in `HttpSession`, as well as their capabilities. The example above will help you understand how `HttpSession` works.

I also recommend that you copy and play with the code above. If feasible, include a style page to make it look more appealing.

Happy coding.