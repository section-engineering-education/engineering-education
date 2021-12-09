
JSP is an acronym for Java Server Page. It is a programming language for building web applications, similar to Servlet technology in terms of usability but more widely used because it is easy to use. JSP tags are used to insert Java code into HTML pages.

### Audience
This article is intended for those who want to understand JSP and use it to create back-end applications. It is also intended for JSP novices as well as those preparing for university/college exams.
### Prerequisites
Before beginning this lesson, you should have a basic understanding of Java and expertise in using the Java IDE.

### Table of contents:
- [Introduction to JSP](#introduction-to-jsp)
- [Advantages of JSP](#advantages-of-jsp)
- [The JSP Pages' Lifecycle](#the-jsp-Pages'-lifecycle)
- [JSP directory structure](#jsp-directory-structure) 
- [Conclusion](#conclusion)
### Introduction to JSP

In terms of utility and versatility, JSP is a programming language for building web applications that is similar to Servlet technology. JSP pages are more commonly used than servlets because servlets are more difficult to code. The main purpose of JSP is to insert Java code into HTML pages using JSP tags. When compared to servlet technology, which inserts HTML code into Java code, servlets are more difficult to use.

JSP allows us to create HTML pages with tags that can be used to embed powerful Java programs written by java programmers. Web designers create and maintain JSP pages for the display layer, whereas java developers can write server-side complex computational code without worrying about web design, and both levels can communicate easily using HTTP requests.

### Advantages of JSP
1. In comparison to Servlet, JSP code is simple to write and learn.

2. When compared to servlet code, maintaining JSP code is easier.


### The JSP Pages' Lifecycle
The JSP Life Cycle refers to the steps involved in creating and destroying a JSP page. We'll go over the various stages of a JSP page's life cycle in this article.
#### phases in the life cycle of a JSP page

![JSP directory structure](/engineering-education/introduction-to-jsp/jsplifecycle.png)

To demonstrate the stages of the JSP life cycle, we'll make a simple JSP page on which we'll display the actions that take place at each level.

Create a simple JSP page and give it a name, like shown. In this scenario, we'll refer to it as a `demonstration`. JSP

```JSP
<body>
 

  <%

  out.print("Hello World")

  %>
 
</body>

```
#### Translation
During the initialization phase of the JSP life cycle, a Java servlet file is generated from a JSP source file; in this case, the webserver checks to see if the JSP page has already been created. If this isn't the case, the file is sent to the JSP Servlet engine, which converts the content to a.java servlet content. This is referred to as translation. This process is called translation. There is no need to understand this procedure because it is handled automatically by the web container.

The JSP page shown above is converted to the corresponding servlet page shown below.

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

#### Compilation Phase
When a browser requests a JSP, the JSP engine determines whether or not to compile the page during the compilation phase. The JSP engine compiles the page if it has not been compiled previously or at any point in time, or if the JSP has been modified since it was last compiled.

#### Instantiation

The container manager creates and manages the instances (objects) of a class during this phase. In response to requests and other events, the container manager manages one or more instances of the class.
The servlet's init method is used only once to complete this phase, which includes database connection, etc. The container of the JSPPage interface provides these init () and destroy () methods.

**NOTE:**
A servlet container is used to create a JSP container. As a result, because both containers support JSP and servlets, the JSP container is an extension of the servlet container.

#### Initialization Phase
The object is now initialized; the _jspinit () method creates a servlet object instance at this point. After creating an instance, the init method is called, just like a servlet. In the life cycle, this method is only used once.

#### Sytax of jspInit() method
```java
public void jspInit()
{
  //statement
}
```
#### Execution Phase
When the JSP engine runs the _jspService method in the JSP, a browser requests a JSP page, and the page is then loaded and initialized. This JSP life cycle phase represents all interactions with requests until the JSP page gets destroyed. The _jspServices method takes two parameters: a HttpServletRequest and a HttpServletResponse.

```java
 _jspService(HttpServletRequest request,
HttpServletResponse response)
{
   // Write your code here.
}
```
#### Destruction Phase
This phase occurs when one needs to destroy the JSP page using the jspDestroy method (the servlet's equivalent of the destroy method), which helps when any cleanup is required, such as releasing database connections or closing open files.

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


