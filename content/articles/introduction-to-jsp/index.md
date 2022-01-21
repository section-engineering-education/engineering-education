
The Java server page(JSP): is defined as a scripting language for creating server-side web applications based on java programming. `JSP` code is intuitive and easy to learn for novice developers. In this article,
we'll go through the basics of JSP and how to get started with the first JSP project.
 In terms of usability, it is equivalent to Servlet technology, although it
is more widely used because of its simplicity.

### Prerequisites
Before beginning this lesson, you should have a basic understanding of `Java` and expertise in using the `Java` IDE. In my case, I will be using [Eclipse](https://www.eclipse.org/downloads/packages/release/kepler/sr1eclipse-ide-java-developers), you can also use [Netbeans](https://netbeans.apache.org/download/index.html).

### The following are the contents of this article.
- [JSP Overview](#jsp-overview)
- [JSP Benefits](#jsp-benefits)
- [The JSP Page Lifecycle](#the-jsp-page-lifecycle)
- [JSP directory structure](#jsp-directory-structure) 
- [Conclusion](#conclusion)
### JSP Overview
 The first `JSP` versions, 1.0 and 1.1, were released in 1999 and quickly gained popularity, while the most recent version, 3.0, was released on October 21, 2020, and is currently the most widely used implementation.

The structure of JSP has four tags that each serve a specific job when it comes to inserting Java code into HTML and converting a specific section enclosed by a JSP tag to a corresponding Java code section, like variable declaration, methods, etc.

### JSP Benefits
1. JSP code is easier to develop and understand than Servlet code.

2. Maintaining JSP code is easier than maintaining servlet code.


### The JSP Page Lifecycle

![The JSP Page Lifecycle](/engineering-education/introduction-to-jsp/jsplifecycle.png)

We'll create a simple JSP page to demonstrate the stages of the JSP life cycle, and we'll use the below page to show what happens in some JSP life cycle phases.

```JSP
<body>
 

  <%

  out.print("Hello World")

  %>
 
</body>

```

With the use of images, we'll go over the steps involved in creating and destroying a JSP page in detail as follows.

#### 1. Translation of JSP to Servlet code
As demonstrated below, a Java servlet file is generated from a JSP source file during this step of the JSP life cycle:

![Translation of JSP to Servlet code](/engineering-education/introduction-to-jsp/translation.png)

#### Example of _jspService() method

```java
  public void _jspService() 
                              
   {
      PrintWriter out = response.getWriter();
      response.setContenType("text/html");
      out.write("<html><body>");
      out.write("Hello world");
      out.write("</body></html>");
   }

```

#### 2. Compilation of Servlet to bytecode
The servlet page generated during the translation phase is transformed into bytecode in this phase, as shown below.

![Compilation of Servlet to bytecode](/engineering-education/introduction-to-jsp/compilation.png)

#### 3. Loading Servlet classes

![Loading Servlet classes](/engineering-education/introduction-to-jsp/loadingservletclass.png)

#### 4. Creating servlet instances

The container manager creates and manages the instances (objects) of a class during this phase and to complete this phase, a servlet's init method is called once.

![Creating servlet instances](/engineering-education/introduction-to-jsp/creatingservletinstance.png)


#### 5. Initialization by calling _jspInit() method

The init function is executed when the _jspinit () method produces a servlet object instance, which signifies the object is now initialized. This method is only used once over the JSP's whole life cycle.

![Initialization by calling _jspInit method](/engineering-education/introduction-to-jsp/instantiation.png)

#### Sytax of _jspInit() method
```java
public void jspInit()
{
  //statement
}
```

#### 6. Request processing by calling _jspServices() method
The browser requests a JSP page when the JSP engine executes the _jspService method in the JSP, which is then loaded and initialized.
A HttpServletRequest and a HttpServletResponse are passed to the _jspServices function. This phase is illustrated below.

![Request processing by calling _jspServices method](/engineering-education/introduction-to-jsp/requesprocessing.png)

#### Sytax of _jspService method
```java
 _jspService(HttpServletRequest request,
HttpServletResponse response)
{
   // Write your code here.
}
```
#### 7. Destroying object by calling _jspDestroy() method
This phase occurs when one needs to destroy the JSP page using the _jspDestroy() method (the servlet's equivalent of the destroy method), which helps when any cleanup is required.

![Destroying object by calling _jspDestroy method](/engineering-education/introduction-to-jsp/destroy.png)

#### Sytax of _jspDestroy() method
```java
 _jspDestroy()
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
 We will create a simple JSP page here that performs the multiplication of two numbers and displays the result to the user.

You'll need a Java IDE installed on your PC to create and run this JSP page. In my case, I will be using the Eclipse IDE.

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


