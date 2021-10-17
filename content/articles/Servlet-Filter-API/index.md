
### Introduction.
When an application is pre-and post-processed, the object being invoked is filtered. Filters are configured and used when filtering activities are performed. The filter interface is found in the `javax.servlet` package and to create a `Filter` class, we have to `import javax.servlet` and implement the `Filter` interface. several filters can be created to perform different tasks according to the user and developer specifications. 

### Prerequisites
- An open-source Java editor, such as Eclipse.Get it [here](https://www.eclipse.org/downloads/packages/release/2021-06/r).
- a web browser installed.
- Server. In my case, I will be using TomCat version 9. Download it from their official [website](https://tomcat.apache.org/)
- basic knowledge of Java is needed.
- Introduction to a servlet is needed.

### Table of contents:

- [What are Servlet Filters and How Do They Work?](#what-are-servlet-filters-and-how-do-they-work?)
  - [servlet filter definition](#servlet-filter-definition)	
  - [How Servlet Filters Works](#how-servlet-filters-works.)
- [Filter usage and its advantages](#filter-usage-and-its-advantages)

  - [Filter usage](#filter-usage)

  - [Advantages](#advantages)	

- [Filter interface](#filter-interface)	
- [FilterChain interface](#filterchain-interface)
- [FilterConfig interface](#filterconfig-interface)
- [Authentication Example using filter](#authentication-example-using-filter)
- [Conclusion](#conclusion)
### What are Servlet Filters and How Do They Work?
#### servlet filter definition
**Filters** are Java classes that can be used to perform and customize filtering operations. This is accomplished by:

1. intercepting client requests before they get to a back-end resource

2. To alter server responses before sending them back to the client.
#### How Servlet Filters Works.
![CheckPassword Filter](/engineering-education/Servlet-Filter-API/serletfilterprocess.png)
**Explanation:**
- When a request enters the Web Container, it is checked to see whether any filters have URL patterns that match the incoming URL.
- The Web `Container` sends requests to the first `Filter` with a matching URL pattern to execute its function.
- First `Filter` then checks if there is a second Filter is available with marching URL, and the code of that `Filter` is run. This will continue until no more filters with URL patterns that match are found..
- If there are no errors, the request is forwarded to the destination Servlet as a result, we know that the request will only be delivered to the destination servlet if all of the relevant Filters have been completed successfully.
- The servlet returns the response to the caller, and then the response is delivered to the Web Container, who then passes it on to the client.

### Filter usage and its advantages.
 Filters are applied in the following fields:
1. Verification. 
2. Image Conversion. 
3. Compression of data. 
4. Encryption. 
5. Auditing and logging, to name a few.
#### Filter usage
We can come with the following usage of the filter based on the application areas mentioned above:
1. Compression of data.
2. Keeping track of all inbound requests
3. Assist in the activation of resource access events.
4. used in encryption and decryption of data.
5. Used in the validation of input.
6. Conversion etc.
#### Advantages.
- Filters can be changed or replaced with a different ones. In this case, the filter is pluggable.
- There is no dependent on another resource for one of the filters.
- Filters require less upkeep.

### Filter interface

The following are the steps to follow when creating a Filter program:

1. Write a Java class that implements the `Filter` interface.
2. Set up the filter parameters.
3. Finally, do a filter mapping.

To create a filter, we must implement the Servlet `Filter` Interface, which is part of the `javax.servlet` package.

 The `Filter` interface has three life cycle methods, which are as follows:

 - `void init()`: Here we use the `init()` method to initialize Filter parameters. It will tell the web container that a filter is about to be activated. 
One  parameter is required i.e.

```java
public void init(FilterConfig parameterName) throws ServletException

```
 - `void doFilters()`:  This method is the most significant in the Filter interface and is used to call the next filter. It requires three parameters: 
- ServletRequest obj
- ServletResponse obj
- FilterChain obj, implemented as follows.
```java
 Public void doFilters(ServletRequest request,ServletResponse response,FileterChain chain)throws ServletException,IOException
```

- `void destroy()`: This method denotes that the filter has completed its duty or has been removed from service. Users can override this method to write finishing logic, such as releasing resources, objects, and so on.

### FilterChain interface
FilterChain's object is used while invoking the next filter or resource in the chain and supplied to the Filter interfaces. 
#### Method.
There is only one method in the FilterChain interface:
- `void doFilter()`: This method is used to call the next filter and pass all resources which are needed.
```java
public void doFilter(HttpServletRequest request, HttpServletResponse response);
```
### FilterConfig interface

The web container generates a `FilterConfig` object which is used to retrieves configuration information from the web.xml file.

#### FilterConfig interface methods
In the FilterConfig interface, there are four methods:
1. `void init()`: This method is only called once and is used to set up the filter.
2. `String getInitParameter`: Here, the parameter value for the provided parameter name is returned.
3. `getInitParameterNames()`: This method returns a list of all parameter names of a type enumeration.
4. `getServletContext()`: The ServletContext object is returned by this method.

### Authentication Example using Filters

In this example, we're demonstrating how a `Filter` is used to achieve authentication. We're using two filters here: one to verify if a password is greater than seven characters, and the other to check both the user name and password supplied by the user.
Filter 1 will forward the request to a second Filter if the password length is correct. Otherwise, an error notice will appear.

If the user name and password provided by the user are both correct, the second Filter will route the request to the Servlet page; otherwise, an error message will be displayed.
#### Steps to create Authentication Example
We assumed you already knew how to use the eclipse IDE and configure the Tomcat server in this example.

**Step 1:** Open Eclipse IDE for Java EE developers. Create a web project by selecting Files -> New -> Dynamic Web Project and provide a project name. We will name ours `Authentication Example`, -> select `Finish`.
![CheckPassword Filter](/engineering-education/Servlet-Filter-API/projectname.png)


**Step 2:** Right-click on the `Authentication Example` on the Project Explorer, select new -> HTML file option -> `finish` by giving your HTML page a name. We'll call it `login.html` in this case as depicted below.

![login page](/engineering-education/Servlet-Filter-API/loginhtml.png)
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

**Step 3:** Filter 1 and `com.demo` package:

Create a package by right-clicking `Authentication Example`, select a new -> package, and finish by providing a package name of your choice. In this case, we'll call it `com.demo`

To navigate into the package you have created above, expand `src/main/Java`.

Right-click on the `com.demo` package on the `Authentication Example` Project, select new -> Filter, and finish by giving your Filter class a name. We'll call it `CheckPassword` in this case.

![CheckPassword Filter](/engineering-education/Servlet-Filter-API/checkpasswordlenght.png)

```java
package com.demo;

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

**Step 4:** Filter 2:

Right-click on the `com.demo` package on the `Authentication Example` Project, select new -> Filter, and finish by giving your Filter class a name. We'll call it `CheckCredentials` in this case.

```java
package com.demo;

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

**Step 5:** Servlet page:

Right-click on the `com.demo` package on the `Authentication Example` Project, select new -> servlet, and finish by giving your servlet class a name. We'll call it `AuthenticationDemo` in this case.

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
Right-click on the `login.html` page and choose Run As-> Run on Server -> Save all changes and restart the server to run the project. In the internal browser, a menu will appear, prompting you to enter the user name and password we specified on the `CheckCredentials` page, as shown.
```java
String uPassword=request.getParameter("uPassword");
		if("Africa".equals(userName)&& "12345678".equals(uPassword))
		{
			chain.doFilter(request, response);
		}
```

### Conclusion
In conclusion, we've seen how Filters work, their functions, the benefits of using them, and the three interfaces that are available on Filters, namely:
- Filter
- FilterConfig and
- FilterChain interface.

If certain conditions are met in a given Filter, the user content is sent to the next Filter or Servlet; if not, the error message is returned.
We used two filters in our example, one to check the password length and another to ensure that the user credentials are accurate.

Lastly, this article will give you a solid foundation of Filters. To improve your understanding and enhance your coding skills, start exploring more.

Thank you!