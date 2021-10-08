---
layout: engineering-education
status: publish
published: true
url: /html-client-for-web-services-using-dhtml-behavior/
title: HTML Client for Web Services using DHTML Behavior
description: In this tutorial we will discuss how web services allow software applications to communicate and exchange data. 
author: stephen-boro
date: 2021-10-04T00:00:00-16:20
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/html-client-for-web-services-using-dhtml-behavior/hero.jpg
    alt: HTML Client Web Services DHTML Behavior Hero Image
---
The Dynamic Hypertext Markup Language (DHTML) is a highly efficient and widely used web development strategy in websites with non-trivial user-input capabilities. 
<!--more-->
DHTML refers to tinkering with an HTML document's Document Object Model, tinkering with styling information's CSS declarations, and tying everything together with client-side JavaScript programming. 

The coupling of CSS formatting and HTML component functionality is represented by DHTML behavior. Any element on an HTML page can be assigned to DHTML behaviors, allowing for amazing content presentation freedom.

### Prerequisites
To follow along with this article, you will need to have:
- Background information on how to use Visual Studio.
- A basic understanding the C# and Javascript [programming languages](/engineering-education/topic/languages/).
- A [SoapUI](https://www.soapui.org/downloads/latest-release/) open source application to run our SOAP applications.
- The [oracle-online-terminal](https://www.tutorialspoint.com/oracle_terminal_online.php) to execute the C# commands. 

### Table of contents
- [Importance of using DHTML](#importance-of-using-dhtml)
- [Distinction between HTML and DHTML](#distinction-between-html-and-dhtml)
- [How would we make the Web services?](#how-would-we-make-the-web-services)
- [How we can create an HTML client](#how-we-can-create-an-html-client)
- [Testing our web services and HTML client](#testing-our-web-services-and-html-client)

### Importance of using DHTML
Here are some of the advantages we can get when using DHTML:
1. We use it to create dynamic, animated website pages that update in real-time.
2. DHTML has more features than just a static HTML page. DHTML can hold more content on a web page simultaneously.
3. By sending fewer requests to the server, the user saves time. As we can use it to change and swap components after a page has been loaded, we do not need to construct separate web pages when updating styles. This save time when creating pages and reduces the number of queries sent to the server.
4. It allows page authors to add drop-down menus and rollover buttons to their web pages.
5. Viewers do not need any extra plug-ins to browse through DHTML-based webpages. They also need any extra prerequisites or software to see them.
6. It is used to embed the ticker on other websites with material and information that needs to be updated frequently.

#### Some major features of DHTML
- Its most basic and important characteristic is that it allows us to dynamically construct web pages.
- DHTML can change identifiers and their attributes.
- It allows you to utilize the events, methods, and properties. Additionally, it allows reusability of code.
- It also has a data binding feature in browsers.
- Users can simply build dynamic fonts for their websites or web pages using DHTML.
- Since DHTML uses a low-bandwidth impact, the internet's performance is improved.

### Distinction between HTML and DHTML
HTML and DHTML have some differences, which are as follows:
1. DHTML language is a collection of different technologies, unlike HTML which is solely a markup language.
2. DHTML language needs database connectivity while in use, HTML does not need connectivity.
3. We use DHTML to create dynamic web pages but HTML is employed to construct web pages that are not changing or static.
4. DHTML does not need processing from the browsers but HTML requires it.
5. We use DHTML to create animations. There are also dynamic menus, but no HTML is used.
6. While using client-side technology, HTML is slower but DHTML sites are quicker.
7. Because HTML employs only one language, web pages built with it are simplistic and lack styling. DHTML uses HTML, CSS, and JavaScript to build a far better and more attractive webpage.
8. HTML can be used in user-side coding whereas DHTML is used for server-side coding.
9. Files in HTML are saved with `.html` or `.htm` extensions while DHTML uses `.dhtml` extension.

### How would we make the web services?
Web services are code snippets that may be reused to allow applications to interact with one another. Web services are used with any type of application developed in any technology once it is produced and hosted on a server on the Internet.

#### Step one
Go to Visual Studio and then select `File` -> `Website` -> `ASP.NET empty website template` from the drop-down menu.
After that, enter the URL of the website, for example; we will use: (*webservicesample*). 

![This shows a website template](/engineering-education/html-client-for-web-services-using-dhtml-behavior/webservice.jpg)

#### Step two
In the solution explorer, choose the icon in the solution, add a new item by clicking `add new item`.

![This shows a airthmatic.cs](/engineering-education/html-client-for-web-services-using-dhtml-behavior/addnew.jpg)

This will create the two files as follows:
- *Arithmetics.asmx* which is our service file.
- *Arithmetic.cs* `Appcode` folder which will host the code file for the service.

![This shows the App code](/engineering-education/html-client-for-web-services-using-dhtml-behavior/appcode.jpg)

The code below explains our file in arithmetic:

```C#

 using System;
 using System.Collection.Generic;
 using System.Linq;
 using System.OurWeb;
 using System.OurWeb.Service;

 [OurWebService(Namespace = "http://nicacious.org/")]
 [OurWebServiceBinds(ConformsTo = WsbProfiles.BasicProfile3_3)]
.
  [System.OurWeb.Script.Services.ScriptService]
 public class Airthmatic : System.OurWeb.Services.OurWebService
 {
     public Airthmatic()   {
         InitializeComponent();
     }
     [WebMethod]
     public int Add(int a, int c, int b)
     {
         return a + c + b;
     }
     [WebMethod]
     public int Sub(int c, int e)
     {
         return c - e;
     }
     [WebMethod]
     public int Mul(int c, int b)
     {
         return c * b;
     }
     [WebMethod]
     public int Div(int e, int b)
     {
         return e / b;
     }
 }

```

We use web method property on a public method to make it available as a component of an XML Webserver. The characteristics of this attribute are also used to further customize the functionality of XML web-based services in our method.

A variety of properties are available in web method, they include:
- Cache duration
- Buffer response
- Description
- Enable session
- Message name
- Transaction option

#### Step three
To check whether the service is able to run correctly, run the program by opening `Arithmetic.asmx` in the solution explorer.

We will find all the method names as shown below:

![Method names in the browser](/engineering-education/html-client-for-web-services-using-dhtml-behavior/explorer.jpg)

At this point, our service can be used.

### How we can create an HTML client
The web behavior will be specified in the HTML file as the initial stage.

```html
<div
  id="Ourservice"
  style="behavior:url(ourwebservice.htc)"
  onresult="onWebServiceresult()"
></div>
```

We use one of the provided IDs for the element in the script to refer to it. The web service URL will then be mapped to a user-friendly name, in our instance `Section`.

This code is added to the page's on the load handler first before any functions are implemented on the web service, it must be mapped. 

```bash
ourservice.useourService('http://localhost/site/code/testwebservice.asmx?WSDL','section');
```

We will call the web service methods asynchronously in two phases because our web service is set up for access. We use an asynchronous invocation to avoid the web page having to wait for the return of the web service. The web service method is used in the first phase.

The callback function will be specified in the first step, and it will be executed once the web service has completed its execution.

In the second stage, the call-back method will be executed whenever the web service returns after execution has occurred or a `runtime_out` occurs.

This will ensure that our `onresult` event handler is utilized to check for any errors that may occur during the execution. If there are any errors, the function will display the error's information. If it is successful, the function will show the result of the online service.

Web service will be invoked whenever we click the `add number`. The method name acts as the call service method's input parameters as well as the web service's intended input parameters.

Here is an illustration of the type of code we will use:

```javascript

 <Script language="JavaScript">
 variable wCallID;
 function ExecuteWebService()
 {
    wCallID = service.calculator.callOurService("Add",num01.values,num02.values);
   }
    function onWebServiceresult()
     {
       if((activity.results.error)&&(wCallID==activity.results.id))
      {
       variable yfaultstring = activity.result.errorDetail.string;
       variable yfaultcode = activityt.result.errorDetail.code;
       variable yfaultsoap = eactivity.result.errorDetail.raw;
       document.writeln("ERROR. Method call unsuccessful");
       document.write("Return ID:" + wCallID);
       document.write("Fault Code:" + yfaultcode);
       document.write("Fault String:" + yfaultstring);
       document.write("SOAP entity:" + yfaultsoap);
     }
     else if(activity.result.error == false)
    {
     sum.values= activity.results.values;
   }
}
</script>
<body onload= "ourservice.useourService('http://localhost/site/code/testwebservice.asmx?WSDL','section');">

<div id="ourservice" style="behavior:url(ourwebservice.htc)" onresult="onWebServiceresult()">
</div>
Number : <input type="message" name='num01'\">
Number : </md><md><input type="message" name='num02'\">
Total:<input type="message" name='total'\">
<button OnClick="ExecuteWebService()">Add Numbers</button>
</body>

```

We now name the file `ourtest.html` and save it in the same folder as `webservice.htc`.

### Testing our web services and HTML client
Web services are a mechanism or a medium of communication that allows two applications or machines to exchange data regardless of their underpinning architecture or technology. 

A web service assessment is a sort of software test that verifies the functionality of web services.

The fundamental goal of the test is to ensure that an API's (Application Program Interface) functionality, security, and performance are all up to standard. In some ways, a web service assessment is similar to unit testing. 

We can manually test a web service, write our automation code, or utilize off-the-shelf automation like Postman.

#### Protocols used in Web services
A web service can be used in a variety of ways, but the three most frequent implementations are as follows:
1. Simple Object Acces Protocol (SOAP)
2. Representation State Transfer Architecture (REST)
3. Web Services Description Language (WSDL)

#### SOAP
SOAP is where service requests are sent and received using a standard protocol. The information is platform-neutral because SOAP will put in place the XML layout for requests to be delivered and received. 

SOAP messages are transferred between the provider and receiving apps within the SOAP envelopes. SOAP messages are not prevented by firewalls because they use the simple HTTP transport protocol.

#### REST 
REST stands for Representational State Transfer. It's a web-based framework that, in most circumstances, uses HTTP. Client-service interactions are emphasized in the REST approach. Which is assisted by the usage of a least variety of processes.

REST is a SOAP (Basic Object Access Protocol) substitute that uses simple URLs instead of XML in a few instances. RESTFUL programs, except for SOAP, use HTTP built-in protocols to carry meta-data.

#### WSDL
A web services functionality are described using the Web Services Description Language (WSDL), an XML-based language.

In XML format, WSDL highlights every action that is capable for a web service to provide. In addition, it specifies how such services can be delivered. It specifies what source value we are required to provide, and what format the return will take for each type of service.

#### How can we test a web service?
In web service testing, we can use several ways:
1. We can test it manually.
2. We can create our automation code.
3. Use an off-the-shelf automation tool like SoapUI.

To show web service testing, we will use `SoapUI`. We will explore how the REST API, which SoapUI supports, is utilized in web service testing.

#### Step one
First, we will need to get the SoapUI application. Then, from the start menu, open the SoapUI program.

#### Step two
After you have opened the SoapUI tool, go to the `REST` icon and click it to open the second page, where you will enter the API URL and click OK.

#### Step three
We have to use the post function to create a new employee. In the database, it will create a new employee.

![Post method](/engineering-education/html-client-for-web-services-using-dhtml-behavior/postmethod.jpg)

#### Step four
Then we have to test the GetEmployee method, which is a HttpGet method that takes an id parameter.

![This is the HttpGet method](/engineering-education/html-client-for-web-services-using-dhtml-behavior/http.jpg)

#### Step five
The other step is to update the operation for EmployeeId which we created.

![Update of the employeeid created](/engineering-education/html-client-for-web-services-using-dhtml-behavior/employeeid.jpg)

#### Step six
The test employees will return all of the employees that were stored in the database. EmployeeId 2 will be deleted from the database if we test the DeleteEmployee operation from SoapUI.

![When we delete the employeeid created](/engineering-education/html-client-for-web-services-using-dhtml-behavior/delete.jpg)

#### Step seven
Finally, we put our validation for the required fields, first and last names, to the test. To generate this situation, we will leave firstName and LastName empty in my post-operation, as shown below. 

This results in the message `The request is invalid` and our validation message for first and last name that we wrote in our model.

![Throw of validation message](/engineering-education/html-client-for-web-services-using-dhtml-behavior/invalid.jpg)

We have shown how SoapUI can be employed to put any kind of object to test any operation. It is simple to test web services or web API's using SoapUI. This includes capabilities like load testing, performance testing, regression testing, and function testing.

The free version may be readily downloaded and used to test the Restful service.

### Conclusion
In this tutorial, we have discussed how web services allow software applications to communicate and exchange data. To establish a eeb service, two common protocols to consider are SOAP and REST.

SOAP allows data to be exchanged using XML. For Web services API Testing, REST supports XML or data interchange via a simple URL. WSDL is an XML language that is used for describing the services provided by a web service and SOAP is defined by WSDL.
 
We have also learned how we can use web service test automation solutions. Like, SoapUI to test Web Services Automation Testing efforts.

Happy coding.

---
Peer Review Contributions by: [Dawe-Daniel](/engineering-education/authors/dawe-daniel/)
