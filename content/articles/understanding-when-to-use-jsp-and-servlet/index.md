---
layout: engineering-education
status: publish
published: true
url: /understanding-when-to-use-jsp-and-servlet/
title: Understanding When to Use Java Server Pages and Servlets
description: This article will help the reader understand how JSP is converted to Servlets and how the two differ.
author: stephine-katul
date: 2022-06-09T00:00:00-11:33
topics: []
excerpt_separator: <!--more-->
images:

 - url: /engineering-education/understanding-when-to-use-jsp-and-servlet/hero.jpg
   alt: JSP Servlet Diagram
---
A `Servlet` is a Java class that is used to develop back-end web applications. It collects data from users and dynamically creates web pages and displays the results. More information on servlets can be found [here](/engineering-education/introduction-to-java-servlets/).
<!--more-->
### Java server pages
Java server pages (JSP) is defined as a scripting language for creating server-side web applications based on Java programming. JSP code is intuitive and easy to learn for novice developers. It is equivalent to Servlet technology, although it is more widely used because of its simplicity.

Before beginning this lesson, the reader should have:
1. A basic understanding of Java and expertise in using a Java IDE. In my case, I will be using [Netbeans](https://netbeans.apache.org/download/index.html), but you can also use an IDE like [Eclipse](https://www.eclipse.org/downloads/packages/release/kepler/sr1eclipse-ide-java-developers)
2. Basic knowledge of [Java Servlets](/engineering-education/introduction-to-java-servlets/), [Servlet request and Servlet Collaboration](/engineering-education/servlet-request-and-servlet-collaboration/), and [How to run Servlet programs using any Java IDE](/engineering-education/servlet-request-and-servlet-collaboration/#servletrequest-interface-example)
3. A basic understanding of JSP and how to launch a JSP program using any Java IDE

### Table of contents
- [Table of contents](#table-of-contents)
- [Definitions](#definitions)
- [When to use JSP](#when-to-use-jsp)
  - [JSP code snippet](#jsp-code-snippet)
- [When should you use a Servlet](#when-should-you-use-a-servlet)
  - [JSP code snippet](#jsp-code-snippet-1)
- [Converting JSP code to Servlet code](#converting-jsp-code-to-servlet-code)
  - [Process of converting JSPs to Servlets](#process-of-converting-jsps-to-servlets)
- [Example](#example)
  - [Steps to take](#steps-to-take)
  - [Step 1: Create a new project](#step-1-create-a-new-project)
  - [Step 2: Create JSP file](#step-2-create-jsp-file)
  - [Generated Servlet code](#generated-servlet-code)
- [Conclusion](#conclusion)

### When to use JSP
JSP is useful in the presentation layer and is typically used when developing view content and designing sites that require more HTML code than Servlet code. Furthermore, JSP should not be used at the business layer since JSP code must be transformed to Servlet code, which takes a long time.

#### JSP code snippet
```bash
<body>
 <%@ page import="java.sql.*" %>

  <%
  out.print("Hello World");
  %>
 
</body>
```
The preceding code snippet shows us how to output the hello world string using JSP. To output a string in JSP, we merely need to use the object provided by Tomcat at runtime.

### When should you use a Servlet
When working with a Servlet, you must develop a `Servlet` class, a `serves` method, and a `PrintWriter` object. This makes Servlets more difficult to grasp than JSP. In this case, Servlets are used when the page does not require more design options. 

In addition to this, Servlets are mostly used as controller classes. In other words, it is helpful to use Servlets when writing Java code for the business layer. For example, you would use Servlets while creating a class that connects your project to the database.

#### JSP code snippet
```java
import javax.servlet.http.HttpServlet;
import java.sql.Connection;
import java.sql.DriverManager;

public class ConnectionProvider extends HttpServlet {
	public static Connection getCon() {
		try {
			Class.forName("com.mysql.cj.jdbc.Driver");
			return DriverManager.getConnection("jdbc:mysql://localhost:3306/databaseName", "userName","password");
		} catch (Exception e) {
			return null;
		}
	}
}
```

The above code sample shows how to use Servlets to create a controller class. In this case, we created `ConnectionProvider` which includes the `getCon()` method for database connectivity. 

### Converting JSP code to Servlet code
Everything written in a Servlet program is organized into classes and objects. To create a Servlet program, you must define a Servlet class and extend `HttpServlet`. Create a `Service` method such as `doGet` or `doPost` and pass the two parameters `request` of type `HttpServletRequest` and `response` of type `HttpServletResponse` to these methods. 

Then create a `PrintWriter` object:

```java
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

public class ClassName extends HttpServlet {
	// Class variables are declared here
	protected void service(HttpServletRequest request, HttpServletResponse response) throws IOException {
		// Local variables are declared here
		// This is where you will write your Java code.
		PrintWriter out = response.getWriter();
		out.print("Hello world.");
	}
}
```

JSP code, on the other hand, does not necessitate the creation of a class and Servlet objects such as `PrintWriter` because the web server, in our case *Tomcat*, does it as shown:

```bash
<body>
  <%
  out.print("Hello World");
  %>
</body>

```
#### Process of converting JSPs to Servlets
1. Tomcat offers the `HttpServlet` parent class, which is extended by the newly formed class.
2. Tomcat or any equivalent web server provides the `_jspService`, `doPost` or `doGet` method, as well as the `request` and `response` parameters as shown:
   
```java
public void _jspService(HttpServletRequest request, HttpServletResponse response)                        
{
   PrintWriter out = response.getWriter();
   response.setContentType("text/html");
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
- The content of the scriptlet tag will be copied into the corresponding Servlet `_jspService()` method.
- The content of the declaration tag will be copied outside of the associated Servlet page's `_jspService()` method.
- All Java imports are contained within directive tags in JSP, and the contents of these tags are copied outside of the resulting `Servlet` class.
  
### Example
To explain how JSP gets converted to the matching `Servlet` during code execution, we'll use some simple JSP code.

#### Steps to take
#### Step 1: Create a new project
Using Netbeans IDE click on File -> New Project -> Java Web -> Web Application and select next. Then give the project a name and click finish. In my case, I'll call it **JSPToServlet**. Now, choose an appropriate server and click finish. In my case, I'll be using Tomcat version 9. 

#### Step 2: Create JSP file
To create a new JSP file, right-click on the project name, choose JSP, and then name it `new_jsp` as shown.

```bash
<body>
  <%
   out.print("Hello World");
  %>
</body>
```
#### Generated Servlet code
Run the project and right-click on the JSP file and select view Servlet:

```java
/*
 * Generated by the Jasper component of Apache Tomcat
 * Version: Apache Tomcat/9.0.62
 * Generated at: 2022-04-27 19:03:48 UTC
 * Note: The last modified time of this file was set to
 *       the last modified time of the source file after
 *       generation to assist with modification tracking.
 */
package org.apache.jsp;

import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.jsp.*;

public final class new_005fjsp_jsp extends org.apache.jasper.runtime.HttpJspBase
    implements org.apache.jasper.runtime.JspSourceDependent,
                 org.apache.jasper.runtime.JspSourceImports {

  private static final javax.servlet.jsp.JspFactory _jspxFactory =
          javax.servlet.jsp.JspFactory.getDefaultFactory();

  private static java.util.Map<java.lang.String,java.lang.Long> _jspx_dependants;

  private static final java.util.Set<java.lang.String> _jspx_imports_packages;

  private static final java.util.Set<java.lang.String> _jspx_imports_classes;

  static {
    _jspx_imports_packages = new java.util.HashSet<>();
    _jspx_imports_packages.add("javax.servlet");
    _jspx_imports_packages.add("javax.servlet.http");
    _jspx_imports_packages.add("javax.servlet.jsp");
    _jspx_imports_classes = null;
  }

  private volatile javax.el.ExpressionFactory _el_expressionfactory;
  private volatile org.apache.tomcat.InstanceManager _jsp_instancemanager;

  public java.util.Map<java.lang.String,java.lang.Long> getDependants() {
    return _jspx_dependants;
  }

  public java.util.Set<java.lang.String> getPackageImports() {
    return _jspx_imports_packages;
  }

  public java.util.Set<java.lang.String> getClassImports() {
    return _jspx_imports_classes;
  }

  public javax.el.ExpressionFactory _jsp_getExpressionFactory() {
    if (_el_expressionfactory == null) {
      synchronized (this) {
        if (_el_expressionfactory == null) {
          _el_expressionfactory = _jspxFactory.getJspApplicationContext(getServletConfig().getServletContext()).getExpressionFactory();
        }
      }
    }
    return _el_expressionfactory;
  }

  public org.apache.tomcat.InstanceManager _jsp_getInstanceManager() {
    if (_jsp_instancemanager == null) {
      synchronized (this) {
        if (_jsp_instancemanager == null) {
          _jsp_instancemanager = org.apache.jasper.runtime.InstanceManagerFactory.getInstanceManager(getServletConfig());
        }
      }
    }
    return _jsp_instancemanager;
  }

  public void _jspInit() {
  }

  public void _jspDestroy() {
  }

  public void _jspService(final javax.servlet.http.HttpServletRequest request, final javax.servlet.http.HttpServletResponse response)
      throws java.io.IOException, javax.servlet.ServletException {

    if (!javax.servlet.DispatcherType.ERROR.equals(request.getDispatcherType())) {
      final java.lang.String _jspx_method = request.getMethod();
      if ("OPTIONS".equals(_jspx_method)) {
        response.setHeader("Allow","GET, HEAD, POST, OPTIONS");
        return;
      }
      if (!"GET".equals(_jspx_method) && !"POST".equals(_jspx_method) && !"HEAD".equals(_jspx_method)) {
        response.setHeader("Allow","GET, HEAD, POST, OPTIONS");
        response.sendError(HttpServletResponse.SC_METHOD_NOT_ALLOWED, "JSPs only permit GET, POST or HEAD. Jasper also permits OPTIONS");
        return;
      }
    }

    final javax.servlet.jsp.PageContext pageContext;
    javax.servlet.http.HttpSession session = null;
    final javax.servlet.ServletContext application;
    final javax.servlet.ServletConfig config;
    javax.servlet.jsp.JspWriter out = null;
    final java.lang.Object page = this;
    javax.servlet.jsp.JspWriter _jspx_out = null;
    javax.servlet.jsp.PageContext _jspx_page_context = null;


    try {
      response.setContentType("text/html");
      pageContext = _jspxFactory.getPageContext(this, request, response,
      			null, true, 8192, true);
      _jspx_page_context = pageContext;
      application = pageContext.getServletContext();
      config = pageContext.getServletConfig();
      session = pageContext.getSession();
      out = pageContext.getOut();
      _jspx_out = out;

      out.write("<body>\r\n");

    out.print("Hello World");

      out.write("\r\n");
      out.write("</body>");
    } catch (java.lang.Throwable t) {
      if (!(t instanceof javax.servlet.jsp.SkipPageException)){
        out = _jspx_out;
        if (out != null && out.getBufferSize() != 0)
          try {
            if (response.isCommitted()) {
              out.flush();
            } else {
              out.clearBuffer();
            }
          } catch (java.io.IOException e) {}
        if (_jspx_page_context != null) _jspx_page_context.handlePageException(t);
        else throw new ServletException(t);
      }
    } finally {
      _jspxFactory.releasePageContext(_jspx_page_context);
    }
  }
}

```

The code shown above is an example of the generated Servlet code after we ran our JSP code. As demonstrated above, the name of our JSP file corresponds to the name of our Servlet class.

### Conclusion
In this article, we described JSP, discussed when a programmer should use JSP or Servlets, the advantages of JSP, and how JSP is turned to a Servlet page during execution.

Happy coding!

---
Peer Review Contributions by: [John Amiscaray](/engineering-education/authors/john-amiscaray/)
