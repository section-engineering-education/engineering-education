
Java Server Page (JSP) is a Java programming language technology for building web applications, similar to Servlet technology in terms of usability but more widely used because it is easy to use. JSP tags are used to insert Java code into HTML pages.

### Audience
This article is intended for those who want to understand JSP and use it to create back-end applications. It is also intended for JSP novices as well as those preparing for university/college exams.
### Prerequisites
Before beginning this lesson, you should have a basic understanding of Java and expertise in using the Java IDE.

### The following are the contents of this article.
- [JSP Overview](#jsp-overview)
- [JSP Benefits](#JSP-benefits)
- [The Lifecycle of JSP Pages](#the-lifecycle-of-jsp-pages)
- [JSP directory structure](#jsp-directory-structure) 
- [Conclusion](#conclusion)
### JSP Overview
Sun Microsystems' JSP application was first released in 1998. The first JSP versions, 1.0 and 1.1, were released in 1999 and quickly gained popularity, while the most recent version, 3.0, was released on October 21, 2020, and is currently the most widely used implementation.

JSP is a Java programming language technology for building web applications, similar to Servlet technology in terms of usability but more widely used because it is easy to use. JSP tags are used to insert Java code into HTML pages. It does not integrate HTML code into Java code as Servlet does; instead, JSP puts Java code into HTML pages using its tags. JSP code is easier to remember and utilize when compared to servlet technology.

JSP has four tags that each serve a particular job when it comes to inserting Java code into HTML. In this article, we are not going to toggle on JSP element tags.

The Java compilers will not compile JSP code directly; instead, it will be converted to a Servlet page that the compilers will understand. If compared to a Servlet, this slows down the JSP compilation process.

### JSP Benefits
1. In comparison to Servlet, JSP code is simple to write and learn.

2. When compared to servlet code, maintaining JSP code is easier.


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

The life cycle of a JSP page includes the following steps for creating and destroying it.

#### Translation
A Java servlet file is generated from a JSP source file during the initialization phase of the JSP life cycle. If the JSP page hasn't already been created, the web server sends the file to the JSP Servlet engine, which converts the content to a.java servlet content. This is known as translation, and it is handled automatically by the web container, so there's no need to understand it. The corresponding servlet page is shown below.

```java
public class demonstration extends HttpServlet
{
  public void _jspService(HttpServletRequest request, HttpServletResponse response) 
                               throws IOException,ServletException
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

When a browser requests a JSP, the JSP engine chooses whether or not to compile the page during the compilation phase. If the JSP has not been compiled previously, or if the JSP has been modified since it was last built, the JSP engine will compile. Parsing the JSP, converting the JSP to a servlet, and compiling the servlet are the three processes involved in this procedure.

#### Instantiation

The container manager creates and manages the instances (objects) of a class during this phase. In response to requests and other events, the container manager manages one or more instances of the class.
The servlet's init method is used only once to complete this phase, which includes database connection, etc. The container of the JSPPage interface provides these init () and destroy () methods.

**NOTE:**
A servlet container is used to generate a JSP container, and the JSP container is an extension of the servlet container because both containers support JSP and servlets.

#### Initialization Phase

At this point, the _jspinit () method generates a servlet object instance, which means the object is now initialized, and the init method is invoked. This approach is only used once during the whole life cycle of the JSP.

#### Sytax of jspInit() method
```java
public void jspInit()
{
  //statement
}
```
#### Execution Phase
A browser requests a JSP page when the JSP engine performs the _jspService method in the JSP, and the page is then loaded and initialized. Until the JSP page is removed, this phase of the JSP life cycle represents all interactions with requests. A HttpServletRequest and a HttpServletResponse are passed to the _jspServices function.

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


