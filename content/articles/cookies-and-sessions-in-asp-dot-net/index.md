---
layout: engineering-education
status: publish
published: true
url: /cookies-and-sessions-in-asp-dot-net/
title: How to Create Cookies and Sessions in ASP.NET
description: This tutorial will walk the reader through how to create cookies and sessions in ASP.NET.
author: stanley-kuria
date: 2022-03-30T00:00:00-01:40
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/cookies-and-sessions-in-asp-dot-net/hero.png
    alt: How to Create Cookies and Sessions in ASP.NET Hero Image
---
Cookies are small tokens of data that are stored on the computer. They are used to store user data on the client end. 
<!--more-->
Some of the details stored on the client's computer include *name, user id, contacts*, and *address*.

ASP.NET supports two sets of cookies; *persistent* and *non-persistent*. 

Cookies that have an expiry date are referred to as *persistent cookies*, while those that don't expire are known as *non-persistent cookies*.

A session is a state where user values are retrieved and kept on the webpage. It is used to pass data from one page to another in ASP.NET.

A website session allows users to interact with the application and perform operations such as reading and writing on it.

### Table of contents
- [Prerequisites](#prerequisites)
- [Creating cookies in ASP.NET](#creating-cookies-in-aspnet)
- [Properties of cookies](#properties-of-cookies)
- [Initiation and termination of a session](#initiation-and-termination-of-a-session)
- [Implementation of sessions in ASP.NET](#implementation-of-sessions-in-aspnet)
- [Conclusion](#conclusion)

### Prerequisites
To follow along with this tutorial, the reader needs:
- Some basic knowledge in *C#* and *.NET* programming language.
- [Visual Studio](https://my.visualstudio.com/Downloads?q=Visual%20Studio%202017) installed on your computer.

### Creating cookies in ASP.NET
The `Response.cookies` is used to create a cookie in ASP.NET. We assign a value to the cookie, as shown below.

```cs
<%
Response.cookies("StudentName") = "StanleyWambui"
%>
```

In the above example, our cookie's name is `StudentName` and its value is `Stanley Wambui`.

Next, we set the expiry date of the cookies, as highlighted below:

```cs
<%
Response.cookies("StudentName") = "Stanley Wambui"
Response.cookies("StudentName").Expires =#May 05 2022#
%>
```

In the above code, we set the cookies' expiration date to `May 05, 2022`.

#### Retrieving value of cookies
The `Request.cookies` command is applied to reveal the cookies' value. We are retrieving the cookies named `StanleyWambui` to display on the page.

```cs
<%
FirstName = Request.cookie("StudentName")
Response.write("StudentName" = &FirstName)
%>
```

The output will be `StudentName Stanley Wambui`.

#### Creating collection of cookies
It's possible to create a collection of cookies, rather than one at a time. The code below shows the creation of multiple cookies in ASP.NET.

```cs
<%
Response.cookies("StudentName")("FullName") = "Stanley Wambui"
Response.cookies("StudentName")("School") = "Computing and Informatics"
Response.cookies("StudentName")("Campus") = "Nairobi"
Response.cookies("StudentName")("Registration") = "380940"
%>
```

#### Creating cookies for browsers that don't support cookies
There are alternative techniques for creating cookies for incompatible browsers. The first method involves generating a form or parameterizing the URL.

Parameterizing involves attaching parameters in the URL, as shown below:

```html
<a href = "About us - Tuko.asp? FileName = Section&LinkName = Blog">
Go to Tuko About us page </a>
```

This will retrieve values of the file `About us-Tuko.asp':

```cs
<%
FirstName=Request.querystring("stanley")
SirName=Request.querystring("kuria")
response.write("<p> Good Evening" &stanley " " &kuria &"!</p>)
response.write("<p> Hakuna Matata website!</p>)
%>
```

In the second technique, a form is generated as shown in the code below:

```cs
<form
method="post" action="About-Section.asp">
FirstName: <input type="text" name="stanley" value="">
SirName: <input type="text" name="kuria" value="">
<input type="submit" value="Submit">
</form>
```

We retrieve the values of the file `About us-Tuko.asp` as follows:

```cs
<%
FirstName=Request.querystring("stanley")
SirName=Request.querystring("kuria")
response.write("<p> Good Evening" &stanley " " &kuria &"!</p>)
response.write("<p> Hakuna Matata Tuko!</p>)
%>
```

### Properties of cookies
Below are some common properties of cookies in ASP.NET:
- *Value*: Manipulates a single cookie.
- *Values*: Handles and manipulates a collection of cookies.
- *Expire*: Used to set the expiry date of cookies.
- *Domain*: Associates cookies to the domain.

### Initiation and termination of a session
A Session gets initiated when a user initializes an application for the first time.

If the user is active on the same application, the session memory is allocated to the user. 

A session with a dormant user gets terminated automatically. When the user revisits the application, there is no need to create a new session.

This is how sessions are initiated in ASP.NET:
- When a user makes a request, the `Session_Onstart` procedure call is used.
- User values are then stored by session objects.
- The server receives requests and initiates a session when the request doesn't have a valid `sessionID`.
- An object is initiated with its session using the <OBJECT> tag in the `global.asa` file.

Session termination:
- When a user fails to refresh a web page for a specific period, the session gets terminated.
- The webserver experiences an error and shuts down. As a result, all user sessions get terminated.
- Session can also be terminated intentionally when the user quits the application.
- A stateless session does not have any state. They are usually eliminated automatically

### Implementation of sessions in ASP.NET
Below is a step-by-step guide on how to implement sessions in ASP.NET.

#### Step 1
Open *Visual Studio IDE*, click *file* then select a *new project*. Next, choose an *ASP.NET* Application and press *ok*.

![step-one](/engineering-education/cookies-and-sessions-in-asp-dot-net/step-one.png)

#### Step 2
Select *empty* as shown below and then click *ok* and wait for a moment.

![step-two](/engineering-education/cookies-and-sessions-in-asp-dot-net/step-two.png)

#### Step 3
Right-click on the *web application*, and then click *add*. Select *web form*, rename the *webform1* to *Main* and press *enter*.

![step-three](/engineering-education/cookies-and-sessions-in-asp-dot-net/step-three.png)

After right-clicking on the *WebApplication* on the IDE, a popup modal will be shown. We then click on the `add` button which launches another popup.

#### Step 4
Click *design* and select *toolbox* on the left corner of the IDE. 

Drag and drop a `label` followed by a `TextBox`, rename the label as `Username`. Add another `label` and an input(password) box, rename the label as `PIN`. 

Also, add a button and rename it as `Submit`. Then double-click the submit button to implement the design.

Your design should appear as follows:

![step-four](/engineering-education/cookies-and-sessions-in-asp-dot-net/step-four.png)

In the above image, there are two labels, `Username` and `Pin`, two text boxes, and a `Submit` button.

```html
<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="main.aspx.cs" Inherits="WebApplication3.main" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <style type="text/css">
        #Password1 {
            width: 150px;
            margin-left: 61px;
        }
    </style>
</head>
<body>
    <form id="form1" runat="server">
        <div>
            Please enter your credentials below</div>
        <asp:Label ID="Label1" runat="server" Text="Username"></asp:Label>
        <asp:TextBox ID="TextBox1" runat="server" style="margin-left: 26px" Width="150px"></asp:TextBox>
        <br />
        <asp:Label ID="Label2" runat="server" Text="PIN"></asp:Label>
        <input id="Password1" type="password" /><br />
        <asp:Button ID="Button1" runat="server" style="margin-left: 93px" Text="Submit" />
    </form>
    <p>
        &nbsp;</p>
</body>
</html>
```

#### Step 5
We need to create one more web form. Right-click on the web application, and add a web form. Rename the webform as `recvd` and click *ok*.

![step-five](/engineering-education/cookies-and-sessions-in-asp-dot-net/step-five.png)

![step-five-a](/engineering-education/cookies-and-sessions-in-asp-dot-net/step-five-a.png)

We renamed the new web form, as shown above.

#### Step 6
Go to `Main.aspx.cs`, and add the following code.

```c#
Session["Username"]= TextBox1.Text;
Response.Redirect("Recvd.aspx");
Session["PIN"]= Password;
Response.Redirect("recvd.aspx");
```

Your code should now appear as shown below:

```c#
using System;
using System.Linq;
using System.Collections.Generic;
using System.Web.UI.WebControls;
using System.Web;
using System.Web.UI;

namespace Session1
{
    public partial class Main: System.Web.UI.Page
    {
        public object Password1 { get; private set; }

        protected void Page_Load(object sender, EventArgs e)
        {

        }

        protected void Button1_Click(object sender, EventArgs e)
        {
            Session["name"] = TextBox1.Text;
            Response.Redirect("recvd.aspx");
            Session["PIN"] = Password;
            Response.Redirect("recvd.aspx");
        }
    }
}
```

#### Step 7
Click on `recvd.aspx` and select `design`. In the `design tab`, add a `label`.

![step-seven](/engineering-education/cookies-and-sessions-in-asp-dot-net/step-seven.png)

#### Step 8
Right-click on `recvd.aspx` in the right corner and select `view code`. Add the code segment below:

```c#
 Label1.Text = Session["name"].ToString();
            TextBox = Session["Registration"];
```

The final code should look like this:.

```c#
using System;
using System.Web.UI;
using System.Linq;
using System.Web.UI.WebControls;
using System.Collections.Generic;
using System.Web;

namespace Session1
{
    public partial class recvd : System.Web.UI.Page
    {
        private object TextBox;

        protected void Page_Load(object sender, EventArgs e)
        {
            Label1.Text = Session["name"].ToString();
            TextBox = Session["PIN"];

        }
    }
}
```

#### Step 9
Select `main.aspx` and build the application. After that, click `debug` and `start without debugging` to create a new session in a browser:

![step-nine-a](/engineering-education/cookies-and-sessions-in-asp-dot-net/step-nine-a.png)

![step-nine-b](/engineering-education/cookies-and-sessions-in-asp-dot-net/step-nine-b.png)

![step-nine-c](/engineering-education/cookies-and-sessions-in-asp-dot-net/step-nine-c.png)

This is how our new web session will be displayed. Users can enter their usernames, emails, and passwords, then click submit to save the details in the web browser.

![step-nine-d](/engineering-education/cookies-and-sessions-in-asp-dot-net/step-nine-d.png)

![step-nine-e](/engineering-education/cookies-and-sessions-in-asp-dot-net/step-nine-e.png)

### Conclusion
In this article, we learned how to create cookies, and implement sessions using the ASP.NET framework. 

We also discussed the various cookies' properties and how sessions are initiated and terminated.

Happy coding!

---
Peer Review Contributions by: [Jethro Magaji](/engineering-education/authors/jethro-magaji/)