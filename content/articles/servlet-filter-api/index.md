---
layout: engineering-education
status: publish
published: true
url: /servlet-filter-api/
title: Servlet Filter API
description: This article deals with Servlet filter API. We will see how Filters work, their functions, the benefits of using them, and the three interfaces that are available on Filters
author: benson-sapan
date: 2021-12-18T00:00:00-11:00
topics: [API]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/servlet-filter-api/hero.jpg
    alt: Servlet Filter API Hero Image
---
A filter is an object used to execute filtering operations, such as conversion, logging, compression, encryption and decryption, input validation, and many more. When an application is pre-and post-processed, the invoked object is filtered. 
<!--more-->
Filters are configured and used when performing filtering activities. The filter interface is found in the `javax.servlet package`. 

To create a Filter class, we have to import `javax. servlet` and implement the Filter interface. Several filters can be created to perform different tasks according to the user and developer specifications.

### Goal
The reader should be able to understand the following after reading this article:
1. A servlet Filter's definition.
2. The advantages of using filters.
3. The Filter interfaces, such as the `Filter` interface, the `FilterConfing` interface, and others.
4. Methods associated with the above interfaces and their functionalities.
5. Using examples, learn how to use filters in a computer program.

### Prerequisites
You will need the following tools to follow along with this article:
- [Eclipse](https://www.eclipse.org/downloads/packages/release/2021-06/r) or another open-source Java editor should be installed on your machine.
- A web browser installed.
- Install the [TomCat](https://tomcat.apache.org/) server or any other server. In this case, we will use TomCat version 9.
- A basic understanding of Java programming language.
- A basic understanding of a servlet is needed.
- Solid knowledge of building and running Java code using any Java IDE, Tomcat, or similar server.

### Table of contents:
- [What are Servlet Filters and How Do They Work](#what-are-servlet-filters-and-how-do-they-work)
  - [servlet filter definition](#servlet-filter-definition) 
  - [How Servlet Filters Works](#how-servlet-filters-works)
- [Filter usage and its advantages](#filter-usage-and-its-advantages)
  - [Filter usage](#filter-usage)
  - [Advantages](#advantages)   
- [Filter API](#filter-api)
- [Filter](#filter) 
- [FilterChain](#filterchain)
- [FilterConfig](#filterconfig)
- [Authentication Example using Filter](#authentication-example-using-filter)
- [Conclusion](#conclusion)

### What are servlet filters, and how do they work
#### Servlet filter definition
**Filters** are Java classes that perform and customize filtering operations and is accomplished by:
- Intercepting client requests before they get to a back-end resource
- To alter server responses before sending them back to the client.

#### How Servlet Filters Works

![How Filter works ](/engineering-education/servlet-filter-api/servletfilterprocess.jpg)

#### Explanation:
- When a request enters the Web Container, it is checked to see whether any filters have URL patterns that match the incoming URL.
- The Web `Container` sends requests to the first filter with a matching URL pattern to execute its function.

The first filter then checks if a second `Filter` is available with matching URL, and the code of that filter is run, which will continue until no more filters with URL patterns match are found.

If there are no errors, the request is forwarded to the destination Servlet. As a result, we know that the request will only be delivered to the destination servlet after completing all relevant Filters successfully.

The servlet returns the response to the caller, and then the response is delivered to the Web Container, who then passes it on to the client.

### Filter usage and its advantages
Filters are used in the following fields:
- Verification. 
- Image Conversion. 
- Compression of data. 
- Encryption. 
- Auditing and logging, to name a few.

#### Filter usage
We can come with the following usage of the filter based on the application areas mentioned above:
- Compression of data.
- Keeping track of all inbound requests.
- Assists in the activation of resource access events.
- Used in encryption and decryption of data.
- Used in the validation of input.
- Conversion.

#### Advantages
- Filters can be changed or replaced with a different Filter. In this case, the filter is pluggable.
- There is no dependent on another resource for one of the filters.
- Filters require less upkeep.

### Filter API
The servlet filter has its API, namely: Filter, FilterChain, and FilterConfig explained as follows.
 
### Filter
We must implement the Servlet 'Filter' Interface, part of the `javax. servlet` package to create a filter.

### Creating a filter
The following steps are to create a Filter program:
1. Create a Java class that implements the interface `Filter`.
2. Set up the filter parameters.
3. Finally, do a filter mapping.

### Methods
- `void init()`: The `init()` method initializes Filter parameters; it informs the web container that a filter needs to be activated. Only one parameter is required, namely,

```java
public void init(FilterConfig parameterName) throws ServletException
```

- `void doFilters()`:  This method is the most significant in the Filter interface and calls the next filter. 

It requires three parameters: 
1. ServletRequest obj
2. ServletResponse obj
3. FilterChain obj, implemented as follows:

```java
 Public void doFilters(ServletRequest request, ServletResponse response,FileterChain chain)throws ServletException,IOException
```

- `void destroy()`: This method denotes that the filter has completed its duty or been removed from service. Users can override this method to write finishing logic, such as releasing resources, objects, and many more.

### FilterChain
FilterChain's object is passed to the Filter interfaces when executing the next filter or resource in the chain.

#### Method.
- `void doFilter()`: This method is only available in the `FilterChain` interface and used when calling the following `Filter` and passing all resources that are required: 

```java
public void doFilter(HttpServletRequest request, HttpServletResponse response);
```

### FilterConfig
The web container generates a `FilterConfig` object to retrieve configuration information from the web.xml file.

#### FilterConfig interface methods
In the FilterConfig interface, there are four methods:
1. `void init()`: This method is only called once and is used to set up the filter.
2. `String getInitParameter`: The parameter value for the parameter name provided is returned by this method.
3. `getInitParameterNames()`: This method returns a list of all type enumeration parameter names.
4. `getServletContext()`: This method returns the `ServletContext` object.

### Authentication example using filter
This example demonstrates how a Filter is used to achieve authentication. We are using two filters here: one to verify if a password is more significant than seven characters, and the other to check the user name and password supplied by the user. 

Filter 1 will forward the request to a second filter if the password length is correct. Otherwise, an error notice will appear.

If the user name and password are correct, the second filter will route the request to the Servlet page; otherwise, an error message will be displayed.

### Steps to create authentication example
We assumed you already know how to use the eclipse IDE and configure the Tomcat server in this example.

#### Step one: Authentication example - dynamic web project
Open Eclipse IDE for Java EE developers. Create a web project by selecting Files -> New -> Dynamic Web Project and provide a project name. We will name it `Authentication Example`, -> select `Finish`.

![Authentication Example Project](/engineering-education/servlet-filter-api/projectname.jpg)

#### Step two: Creating a login HTML page
By right-clicking on the `Authentication Example` in the Project Explorer, select new -> HTML file option -> finish by giving your HTML page a name. We'll call it `login.html`, in this case. 

![login page](/engineering-education/servlet-filter-api/loginhtml.jpg)

```html
<!DOCTYPE html>
<html>

<head>
    <meta charset="ISO-8859-1">
    <title>Insert title here</title>
</head>

<body>
    <form action="logInAction" method="post">
        <input type="text" name="userName" placeholder="Enter user name" required>
        <input type="password" name="uPassword" placeholder="Enter password" required>
        <input type="submit" value="login">
    </form>
</body>

</html>
```

#### Step three: Creating filter one and the 'com. demo' package
Create a package by right-clicking `Authentication Example`, selecting a new -> package, and finish by providing a package name of your choice. In this case, we will call it `com. demo`.

To navigate into the package you have created above, expand `src/main/Java`.

Right-click on the `com. demo` package on the `Authentication Example` Project, select new -> Filter and finish by giving your filter class a name. We will call it `CheckPassword` in this case.

![CheckPassword lenght Filter](/engineering-education/servlet-filter-api/checkpasswordlenght.jpg)

```java
package com. demo;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletRequest;
@WebFilter("/logInAction")
public class CheckPassword implements Filter 
{
    public CheckPassword() 
    {
        
    }
    public void destroy() 
    {
        
    }
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException 
    {
        HttpServletRequest reg=(HttpServletRequest)request;
        PrintWriter out =response.getWriter();
        
        String uPassword=request.getParameter("uPassword");
        if(uPassword.length()>7)
        {
            chain.doFilter(request, response);
        }
        else
        {
            out.print("Password characters must be atlist 8");
        }           
    }
    public void init(FilterConfig fConfig) throws ServletException 
    {
        
    }

}
```

#### Step four: Creating filter 2
Right-click on the `com. demo` package on the `Authentication Example` Project, select new -> Filter and finish by giving your Filter class a name. We will call it `CheckCredentials` in this case.

```java
package com. demo;

import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletRequest;
@WebFilter("/logInAction")
public class CheckCredentials implements Filter 
{
    public CheckCredentials() 
    {
       
    }
    public void destroy() 
    {
        
    }
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException
    {   
        HttpServletRequest reg=(HttpServletRequest)request;
        PrintWriter out =response.getWriter();
        String userName=request.getParameter("userName");
        String uPassword=request.getParameter("uPassword");
        if("Africa".equals(userName)&& "12345678".equals(uPassword))
        {
            chain.doFilter(request, response);
        }
        else
        {
        out.print("Wrong credentials"); 
        }
    }
    public void init(FilterConfig fConfig) throws ServletException 
    {
        
    }

}
```

#### Step five: Creating the Servlet page
Right-click the `com. demo` package in the `Authentication Example` Project, choose to create -> Servlet and name your servlet class. We'll call it `AuthenticationDemo`, in this case.

```java
package com.demo;
import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
@WebServlet({ "/AuthenticationDemo", "/logInAction" })
public class AuthenticationDemo extends HttpServlet 
{
    private static final long serialVersionUID = 1L;
    public AuthenticationDemo() 
    {     
    }
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException
    {
        
        PrintWriter out =response.getWriter();
        
        out.print("Welcom");
    }

}
```

Right-click on the `login.html` page. Choose Run As-> Run on Server -> Login.html from the context menu of the `login.html` page. To launch the project, save all modifications and restart the server. 

In the internal browser, a menu will open, inviting you to input the user name and password we specified on the `CheckCredentials` page, as shown.
```java
String uPassword=request.getParameter("uPassword");
        if("Africa".equals(userName)&& "12345678".equals(uPassword))
        {
            chain.doFilter(request, response);
        }
```

### Conclusion
In conclusion, we have seen how Filters work, their functions, the benefits of using them, and the three interfaces that are available on Filters, namely:
1. Filter
2. FilterConfig and
3. FilterChain interface.

If certain conditions are met in a given Filter, the user content is sent to the next Filter or Servlet; if not, the error message is returned.

We used two filters in our example, one to check the password length and another to ensure that the user credentials are accurate.

Finally, this article will give you a solid foundation of Filters. To improve your understanding and enhance your coding skills, start exploring more.

Happy coding!

---
Peer Review Contributions by: [Briana Nzivu](/engineering-education/authors/briana-nzivu/)
