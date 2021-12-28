
JSP is a Java programming language technology that allows you to create web apps by inserting Java code into HTML pages using JSP components/tags. In terms of usability, it is equivalent to Servlet technology, although it is more widely used because of its simplicity.

### Prerequisites
Before beginning this lesson, you should have a basic understanding of Java and expertise in using the Java IDE.

### The following are the contents of this article.
- [JSP Overview](#jsp-overview)
- [JSP Benefits](#jsp-benefits)
- [The Lifecycle of JSP Pages](#the-lifecycle-of-jsp-pages)
- [JSP directory structure](#jsp-directory-structure) 
- [Conclusion](#conclusion)
### JSP Overview
 The first JSP versions, 1.0 and 1.1, were released in 1999 and quickly gained popularity, while the most recent version, 3.0, was released on October 21, 2020, and is currently the most widely used implementation.

JSP is a Java-based web application development technology from Sun Microsystems. JSP is a new technology that is derived from servlet technology, although it is more extensively utilized since it is easier to learn and apply than servlets. Java code is inserted into HTML pages using tags in JSP.

The structure of JSP has four tags that each serve a specific job when it comes to inserting Java code into HTML and converting a specific section enclosed by a JSP tag to a corresponding Java code section, e.g. variable declaration, methods, etc. The Java compilers will not compile JSP code directly; instead, it will be converted to a Servlet page that the compilers will understand. We won't be using JSP element tags in this post. This delays the JSP compilation process as compared to a Servlet.

### JSP Benefits
1. JSP code is easier to develop and understand than Servlet code.

2. Maintaining JSP code is easier than maintaining servlet code.


### The Lifecycle of JSP Pages

![JSP directory structure](/engineering-education/introduction-to-jsp/jsplifecycle.png)

We'll create a simple JSP page to demonstrate the stages of the JSP life cycle, and we'll use the below page to show what happens in some JSP life cycle phases.

```JSP
<body>
 

  <%

  out.print("Hello World")

  %>
 
</body>

```

The following stages are involved in the creation and destruction of a JSP page.

#### Translation
During the startup step of the JSP life cycle, a Java servlet file is produced from a JSP source file. The web server transmits the file to the JSP Servlet engine, which turns the content to a.java servlet content if the JSP page hasn't been built yet. This is known as translation, and the web container handles it automatically, so there's no need to comprehend it. The servlet page for this servlet is displayed below.

```java
public class demonstration extends HttpServlet
{
  public void _jspService() 
                              
   {
      PrintWriter out = response.getWriter();
      response.setContenType("text/html");
      out.write("<html><body>");
      out.write("Hello world");
      out.write("</body></html>");
   }
}
```

#### Compilation 

The JSP engine decides whether or not to build the page during the compilation phase when a browser requests a JSP. The JSP engine will build the JSP if it has not been compiled previously or if it has been modified since it was last built. This approach includes three steps: parsing the JSP, transforming the JSP to a servlet, and building the servlet.

#### Instantiation

During this phase, the container manager produces and manages the instances (objects) of a class. The container manager manages one or more instances of the class in response to requests and other events.
The init method of the servlet is only called once to finish this phase, which involves database connection and other tasks. These init () and destruct () methods are provided by the JSPPage interface's container.

#### Initialization Phase

The init function is executed when the _jspinit () method produces a servlet object instance, which signifies the object is now initialized. This method is only used once over the JSP's whole life cycle.

#### Sytax of jspInit() method
```java
public void jspInit()
{
  //statement
}
```
#### Execution Phase
When the JSP engine executes the _jspService method in the JSP, the browser requests a JSP page, which is then loaded and initialized. This phase of the JSP life cycle represents all interactions with requests until the JSP page is deleted. The _jspServices function is supplied a HttpServletRequest and a HttpServletResponse.

```java
 _jspService(HttpServletRequest request,
HttpServletResponse response)
{
   // Write your code here.
}
```
#### Destruction Phase
This phase occurs when one needs to destroy the JSP page using the jspDestroy method (the servlet's equivalent of the destroy method), which helps when any cleanup is required.

```java
 jspDestroy()
{
// Destroy code
}
```
### JSP directory structure
A JSP page's directory structure is stored outside of the WEB-INF folder or any other directory. It works in the same way as a servlet.
To get the JSP pages, go to your project name -> SCR -> main, and then web-app folder.

The following diagram depicts the JSP directory structure.

![JSP directory structure](/engineering-education/introduction-to-jsp/jspdirectory.png)
### Example
To demonstrate how to create a JSP page, we'll use an example. We will make a simple JSP page here that performs the multiplication of two numbers and displays the result to the user.

You'll need a Java IDE installed on your PC to produce this JSP page. I'll be using the Eclipse IDE in my scenario.

#### Steps to follow

- Open Eclipse IDE or any other related IDE
- Create an HTML page that includes the HTML from below.
- Create a new project by going to File ->new on the left-hand side of the screen, then selecting Dynamic web project from the drop-down menu.
- By right-clicking on the project name and selecting the new -> JSP page, you may create a new JSP page. Finally, give your JSP page a name

The JSP I created has the following sample code:
1. HTML form
```html
<body>
<form action="index.jsp" method="post">
  <input type="number" name="num1">
   <input type="number" name="num2">
 <input type="submit" value="Submit">				    
</form>

```
2. JSP page
```JSP
<%
  int num1=Integer.parseInt(request.getParameter("num1"));
  int num2=Integer.parseInt(request.getParameter("num2"));
  int product=num1*num2;
  out.print("Product is"+product);
 %>
```

### Conclusion
In this post, we defined JSP, discussed the JSP life cycle, discussed the benefits of JSP, and discussed the JSP directory structure. I recommend that you start learning more about JSP by using the other blocks available.


