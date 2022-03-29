The Java server page (JSP) is a scripting language used to create server-side web applications using the Java programming language. For new developers, 'JSP' code is simple and intuitive and Java (Servlet) is an object-oriented programming language.

 We'll go over how to convert JSP to Servlet in this post, as well as when to use Servlet and when to use JSP in web application development

### Prerequisites
Before beginning this lesson, you should have a basic understanding of `Java` and expertise in using the `Java IDE`. In my case, I will be using [Eclipse](https://www.eclipse.org/downloads/packages/release/kepler/sr1eclipse-ide-java-developers), you can also use [Netbeans](https://netbeans.apache.org/download/index.html).

### Table of contents
- [Prerequisites](#prerequisites)
- [Table of contents](#table-of-contents)
- [Defining a servlet and a JSP](#defining-a-servlet-and-a-jsp)
- [When to Use JSP](#when-to-use-jsp)
  - [Code snippet of JSP](#code-snippet-of-jsp)
- [When Should You Use a Servlet](#when-should-you-use-a-servlet)
  - [Code snippet of JSP](#code-snippet-of-jsp-1)
- [JSP Benefits](#jsp-benefits)
- [How does Tomcat convert code written in JSP to a corresponding servlet code](#how-does-tomcat-convert-code-written-in-jsp-to-a-corresponding-servlet-code)
  - [Process of converting JSP to Servlet](#process-of-converting-jsp-to-servlet)
- [Example](#example)
  - [Steps to take](#steps-to-take)
  - [Step 1: Create a new project](#step-1-create-a-new-project)
  - [Step 1: Create JSP file](#step-1-create-jsp-file)
  - [Generated Servlet code](#generated-servlet-code)
- [Conclusion](#conclusion)

### Defining a servlet and a JSP

`Servlet` is a back-end `Java` programming language that implements the `Servlet` interface and acts as a middle layer between client requests and the applications hosted on the server, handling all client requests. It is used to collect data from users, as well as to dynamically create web pages and present the results. You can learn more about servlets [here](https://www.section.io/engineering-education/introduction-to-java-servlets/).

The `Java server page(JSP)`: is defined as a scripting language for creating server-side web applications based on `Java programming`. `JSP` code is intuitive and easy to learn for novice developers, it is equivalent to Servlet technology, although it is more widely used because of its simplicity.

### When to Use JSP

`JSP` is simple to use and understand if compared to Servlet, also JSP code is embedded inside an HTML code, which makes it to be used while creating view content and performing design pages that require more HTML code than Java code. JSP is used in the presentation layer and it is not advisable to use `JSP` in the business layer since code written in `JSP` needs to be converted to the corresponding `Servlet` code and this process takes a lot of time.

Lastly, since `HTML` creates only static pages, `JSP` will help us to create dynamic pages and use Java code inside the `HTML` page on the client-side or the view content of the browser. 

#### Code snippet of JSP
```jsp
<body>
 <%@ page import="java.sql.*" %>

  <%
  out.print("Hello World")

  %>
 
</body>
```
The preceding code snippet shows us how to output the hello world string using `JSP`. To output a String in JSP, we merely need to use the object provided by Tomcat at runtime.

### When Should You Use a Servlet
When working with a `Servlet`, you must develop a `Servlet` class, a `Serves` method, and a `PrintWriter` object, making `Servlet` more difficult to grasp than `JSP`. In this case, `Servlet` is majorly used as a Controller's classes, or in other words, it is helpful to use `Servlet` in writing `Java` code (business logic) layer, for example, while creating a class that connects your project to the database.

Secondly, use `Servlet` when the page does not require more design options and when a page contains more `Java` code than `Html` code as shown in the example below.

#### Code snippet of JSP
```Java

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
The above code sample shows how to use `Servlet` to create a Controller class; in this case, we created `ConnectionProvider`, which includes the `getCon()` method for database connectivity. The reason for utilizing `Servlet` here is that the `Servlet` code runs faster.

### JSP Benefits

1. `JSP` code is easier to develop and understand than `Servlet` code.

2. Maintaining `JSP` code is easier than maintaining `Servlet` code.

### How does Tomcat convert code written in JSP to a corresponding servlet code

Our compilers are unable to run `JSP` pages. In this case, a `JSP` program must be converted into a corresponding `Servlet` page before it can be executed. 
 
`Java` (Servlet) is an object-oriented programming language. Everything written in a `Servlet` is organized into classes and objects. To create a Servlet program, you must define a servlet class and extend HttpServlet, create a `Service` method such as doGet or `doPost`, and pass two parameters `(HttpServletRequest request, HttpServletResponse response)` to these methods, as well as create a print writer object as shown

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
`JSP` code, on the other hand, does not necessitate the creation of Class and `Servlet` objects such as `PrintWriter` because the Web `Server` in our case, `TomCat` does it as shown

```jsp
 <body>
  <%
  out.print("Hello World");
  %>
</body>

```
#### Process of converting JSP to Servlet

1. The name of the Servlet class is determined by concatenating the `JSP` file name with the `JSP` extension, and the Tomcat provides the `HttpServlet` parent class, which is extended by the newly created class.
2. The Tomacate or any equivalent web server provides the `Service` method, or `doPost`, or `doGet` method, as well as the `HttpServletRequest` request and `HttpServletResponse` response parameters. As shown.
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

We will presume that you are familiar with `JSP` tags and will not describe them in this article. The `JSP` code contained within the following `JSP` tags will be copied into the `Servlet` page, as follows: 
- The content of the scriptlet tag will be copied into the corresponding Servlet `_jspService()` Method
- The content of the declaration tag will be copied outside of the associated Servlet page's `_jspService()` method, and
- All `Java` imports are contained within directive tags in `JSP`, and the contents of these tags are copied outside of the resulting Servlet class
  
### Example
To explain how `JSP` gets converted to the matching `Servlet` during code execution, we'll use a simple `JSP` code.

#### Steps to take

#### Step 1: Create a new project
 Using `Netbeans` IDE click on File -> New Project -> Java Web -> Web Application and selecting Next.
Last but not least, give the project a name and click Finish; in my case, I'll call it `JSPToServlet`. Finally, choose an appropriate Server and click Finish; in my case, I'll be using TomCat version 9. 

#### Step 1: Create JSP file

To create a new `JSP` file, right-click on the project name, choose JSP, and then name it `new_jsp` as shown.

```JSP
    </head>
    <body>
      <%
       out.print("Hello World");
      %>
    </body>

```
#### Generated Servlet code

Run the project and right-click on the `JSP` file and select view `Servlet` to see the generated `Servlet` code

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

The code shown above is an example of the generated Servlet code after we ran our `JSP` code.
As demonstrated above, the name of our `JSP` file corresponds to the name of our `Servlet` class.

### Conclusion
We described `JSP`, spoke about when a programmer should use `JSP` or `Servlet`, the advantages of `JSP`, and how `JSP` is turned to a `Servlet` page during execution in this post. I propose that you begin learning about `JSP` tags by looking up `JSP` content on the internet or watching YouTube courses.