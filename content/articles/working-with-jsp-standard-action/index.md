
Tags that are inserted into a JSP page to perform a defined task and will be converted into a Java class, methods, or variables according to their predefined task are called Standard action elements. These tags allow a programmer to write a Java code inside a JSP program without any compilation or run time error, they are communication tags that can only be written in XML syntax, we'll see extensive and well-explained JSP Standard Actions here. It is sophisticated Java knowledge that any Java developer should have.


### Prerequisites
1. A basic understanding of JSP and HTML.
2. Expertise in using a Java IDE. In my case, I will be using [Eclipse](https://www.eclipse.org/downloads/packages/release/kepler/sr1eclipse-ide-java-developers).

<!--more-->
### Table of contents
- [Prerequisites](#prerequisites)
- [Table of contents](#table-of-contents)
- [JSP Standard Action Elements](#jsp-standard-action-elements)
- [List of JSP Standard Action Elements](#list-of-jsp-standard-action-elements)
- [JSP-Expression Language (EL)](#jsp-expression-language-el)
- [EL Implicit Object](#el-implicit-object)
- [Example](#example)
  - [Steps to create this example](#steps-to-create-this-example)
- [Conclusion](#conclusion)
### JSP Standard Action Elements
Standard action elements are tags that are introduced into a JSP page to execute a given task and are turned into a Java class, methods, or variables based on their present task. These tags enable a programmer to write Java code within a JSP program without any compilation or run-time errors; they are communication tags that can only be written in XML syntax; we will see lengthy and well-explained JSP Standard Actions here. Any Java developer should have a comprehensive Java understanding.
### List of JSP Standard Action Elements

- JSP:useBean: This tag helps us to find the JavaBean object
- JSP:include: This tag includes a file whenever it is requested
- JSP:setProperty: This tag modifies a JavaBean's property.
- JSP:getProperty: This tag introduces a JavaBean property into the output.
- JSP:forward: This tag redirects the user to a new page.
- JSP:plugin: This tag generates browser-specific Java plugin code.
- JSP:element: This tag dynamically defines XML elements.
- JSP:body: This tag specifies the attribute of a dynamically generated XML element.
- JSP:text: This tag specifies the body of a dynamically generated XML element.
  
  
### JSP-Expression Language (EL)
EL is a method of making java bean components and other object-stored data more available and simpler to use. These objects include sessions, requests, and others. To perform various expressions, EL employs JSP operators.

Because java code is difficult to design and obtain data to be presented, JSP technology version 2.0 provided many implicit objects, operators, and reserve words. This feature is in EL, and it is new and simple to use.

The syntax of EL is shown below.
```JAVA
${/*expression*/} 
```
### EL Implicit Object
 An implicit object in JSP is an object that allows JSP to do various functions, such as mapping attribute names in the page scope. The following are examples of implicit objects:

**. pageScope**This object associates an attribute name with a value set.
**. requestScope**This object associates an attribute name with a value set in the request scope

**. sessionScope** It associates the supplied attribute name with the session scope value.

**. applicationScope** It associates the specified attribute name with the value specified in the application scope.

**. param** It converts the request parameter into a single value.

**. paramValues** It converts the request parameter into a set of values.

**. header** It associates the request header name with a single value.

**. headerValues** It converts the name of the request header into an array of values.

**. cookie**It associates the specified cookie name with the cookie value.

**. initParam**It represents the initialization parameter.

**. pageContext**It gives you access to several things such as requests, sessions, and so on.

### Example
To show EL Implicit Object, we will write some simple code that will accomplish the following tasks:
1. We will use a form field, as shown below, to pass user input or a default value. When the button is pressed, the current page is redirected to `ElProssesClass.JSP`, which prints the user's name using the Implicit Object parameter.
2. We will utilize session.setAttribute() to pass input in the same program, and the data stored in the session scope will be printed using the sessionScope object.
3. Finally, we will use the `responce.addcookie()` method to demonstrate EL with the Cookies object.
#### Steps to create this example
1. Open the Eclipse IDE to begin creating the project. Create a new project by going to Files->New->Dynamic web project, giving it a valid name, and then click Finish. In my case, I'm going to call it El.
2. Create two JSP classes by right-clicking on the project name, selecting new->JSP, and giving your file the appropriate name. Click the Finish button.

   The two JSP classes that I created are shown below.

**Elclass.jsp**

   ```Java
   <form action="ElProssesClass.jsp">  
  Enter Name:<input type="text" name="name" value="Evans Chaun"/><br/><br/>  
 
	<%  
	session.setAttribute("Uname","Chaun");  
	%> 
	 
<h1>First JSP</h1> : 
	<%  
	Cookie ck=new Cookie("name","Lodoctor");  
	response.addCookie(ck);  
	
	%>  
<input type="submit" value="submit/Go"/>  
</form> 
   ```

**ElProssesClass.jsp**

   ```Java
   
<h3>Using param object</h3>
Welcome, ${ param.name } 
<br>
<h3>Using sessionScope object</h3>
Value is: ${ sessionScope.Uname }  
<br>
<h3>Using cookie object</h3>
Hello, ${cookie.name.value}  

 ```
 Right-click on the `Elclass.jsp` to start the project, choose Run As -> Run on Server and click the Finish button.

 ### Conclusion
 This article covered JSP Action Elements and JSP Expression Language in depth. It discusses various List of JSP Standard Action Elements, JSP-Expression Language, EL Implicit Object, and an Example to show EL Implicit Object.
