### Prerequisites
Before beginning this lesson, you should have a basic understanding of Java and expertise in using a Java IDE. In my case, I will be using [Eclipse](https://www.eclipse.org/downloads/packages/release/kepler/sr1eclipse-ide-java-developers), but you can also use an IDE like [Netbeans](https://netbeans.apache.org/download/index.html).

### Table of contents
- [Definitions](#definitions)
- [When to use JSP](#when-to-use-jsp)
  - [JSP code snippet](#jsp-code-snippet)
- [When should you use a Servlet](#when-should-you-use-a-servlet)
  - [JSP code snippet](#jsp-code-snippet-1)
- [JSP benefits](#jsp-benefits)
- [How does Tomcat convert code written in JSP to a corresponding Servlet code](#how-does-tomcat-convert-code-written-in-jsp-to-a-corresponding-servlet-code)
  - [Process of converting JSPs to Servlets](#process-of-converting-jsps-to-servlets)
- [Example](#example)
  - [Steps to take](#steps-to-take)
  - [Step 1: Create a new project](#step-1-create-a-new-project)
  - [Step 1: Create JSP file](#step-1-create-jsp-file)
  - [Generated Servlet code](#generated-servlet-code)
- [Conclusion](#conclusion)

### Definitions

`Servlet` is a Java class that is used to develop back-end web applications. It collects data from users and dynamically creates web pages and displays the results. More information on servlets can be found [here](https://www.section.io/engineering-education/introduction-to-java-servlets/).

Java server pages (JSP) is defined as a scripting language for creating server-side web applications based on Java programming. JSP code is intuitive and easy to learn for novice developers. It is equivalent to Servlet technology, although it is more widely used because of its simplicity.

### When to Use JSP

JSP is useful in the presentation layer and is typically used when developing view content and designing sites that require more HTML code than Servlet code. Furthermore, JSP should not be used at the business layer since JSP code must be transformed to Servlet code, which takes a long time.

#### JSP Code Snippet
```jsp
<body>
 <%@ page import="java.sql.*" %>

  <%
  out.print("Hello World")

  %>
 
</body>
```
The preceding code snippet shows us how to output the hello world string using JSP. To output a string in JSP, we merely need to use the object provided by Tomcat at runtime.

### When Should You Use a Servlet
When working with a Servlet, you must develop a `Servlet` class, a `serves` method, and a `PrintWriter` object. This makes Servlets more difficult to grasp than JSP. In this case, Servlets are used when the page does not require more design options. In addition to this, Servlets are majorly used as Controller classes. In other words, it is helpful to use Servlets in writing Java code for the business layer. For example, you would use Servlets while creating a class that connects your project to the database.

#### JSP Code Snippet
```java

public class ConnectionProvider extends HttpServlet 
{
	public static Connection getCon() {
		try 
		{
			Class.forName("com.mysql.cj.jdbc.Driver");
			Connection con = DriverManager.getConnection("jdbc:mysql://localhost:3306/databaseName", "userName","password");
			return con;

		} catch (Exception e) {
			
			return null;
		}

	}
		
	protected void service(HttpServletRequest request, HttpServletResponse response) 
	{
	}

}
```
The above code sample shows how to use Servlets to create a Controller class. In this case, we created `ConnectionProvider` which includes the `getCon()` method for database connectivity. 

### Converting JSP code to servlet code

Everything written in a Servlet program is organized into classes and objects. To create a Servlet program, you must define a Servlet class and extend `HttpServlet`. Create a `Service` method such as `doGet` or `doPost` and pass the two parameters `request` of type `HttpServletRequest` and `response` of type `HttpServletResponse` to these methods. Then create a `PrintWriter` object:

```java
public class class_name extends HttpServlet 
{
      // Class variables is diclared here
	protected void Service(HttpServletRequest request, HttpServletResponse response)
	{
	   {
           // Local varibles is diclared here
           //This is where you will write your Java code.
		PrintWriter out = response.getWriter();
	    out.print("Hello world."); 
	   }
		
	}
```
JSP code, on the other hand, does not necessitate the creation of a class and Servlet objects such as `PrintWriter` because the web server, in our case *Tomcat*, does it as shown:

```jsp
 <body>
  <%
  out.print("Hello World");
  %>
</body>

```
#### Process of converting JSPs to Servlets

1. Tomcat offers the `HttpServlet` parent class, which is extended by the newly formed class. The name of the Servlet class is determined by concatenating the JSP file name with the `.jsp` extension.
2. Tomcat or any equivalent web server provides the `_jspService`, `doPost` or `doGet` method, as well as the `request` and `response` parameters as shown:
   ```Java
   public void _jspService() 
                              
   {
      PrintWriter out = response.getWriter();
      response.setContenType("text/html");
      out.write("<html><body>");
      out.write("Hello world");
      out.write("</body></html>");
   }
   ```
3. The JSP code must be enclosed in one of the tags listed below
- Scriptlet tag(<% code %>) 
- declaration tag(<%! declaration %>)
- Directive Tag(<%@ page ... %>)
- Expression tag(<%= output%> )

We will presume that you are familiar with JSP tags and will not describe them in this article. The JSP code contained within the following JSP tags will be copied into the Servlet page, as follows: 
- The content of the scriptlet tag will be copied into the corresponding Servlet `_jspService()` method
- The content of the declaration tag will be copied outside of the associated Servlet page's `_jspService()` method, and
- All Java imports are contained within directive tags in JSP, and the contents of these tags are copied outside of the resulting `Servlet` class
  
### Example
To explain how JSP gets converted to the matching `Servlet` during code execution, we'll use some simple JSP code.

#### Steps to take

#### Step 1: Create a new project
Using Netbeans IDE click on File -> New Project -> Java Web -> Web Application and select next. Last but not least, give the project a name and click finish. In my case, I'll call it **JSPToServlet**. Finally, choose an appropriate server and click finish. In my case, I'll be using Tomcat version 9. 

#### Step 1: Create JSP file

To create a new JSP file, right-click on the project name, choose JSP, and then name it `new_jsp` as shown.

```JSP
    </head>
    <body>
      <%
       out.print("Hello World");
      %>
    </body>
```
#### Generated Servlet code

Run the project and right-click on the JSP file and select view Servlet:

```Java
import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.jsp.*;

public final class newjsp_jsp extends org.apache.jasper.runtime.HttpJspBase
    implements org.apache.jasper.runtime.JspSourceDependent,
                 org.apache.jasper.runtime.JspSourceImports {

  public void _jspService(final javax.servlet.http.HttpServletRequest request, final javax.servlet.http.HttpServletResponse response) 
	  {
      javax.servlet.jsp.JspWriter out = response.getJspWriter();
      out.write("    <body>\n");
      out.write("      ");

       out.print("Hello World");
      
      out.write("\n");
      out.write("    </body>\n");
      out.write("</html>\n");
  }
}

```

The code shown above is an example of the generated Servlet code after we ran our JSP code. As demonstrated above, the name of our JSP file corresponds to the name of our Servlet class.

### Conclusion

In this article, we described JSP, spoke about when a programmer should use JSP or Servlets, the advantages of JSP, and how JSP is turned to a Servlet page during execution.
