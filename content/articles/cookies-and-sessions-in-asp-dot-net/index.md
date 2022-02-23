### Introduction
Cookies are small tokens of data that are stored on a client machine. Are utilized to store user data on the client end. Name, user id, contacts, address, and much more are samples of data stored on the client machine. 
ASP dot NET supports two sets of cookies, Non-persistent and persistent. Cookies that have an expiry date are referred to as persistent, while those that don't expire are known as Non-persistent.

A session is a state from where user values are retrieved and kept on the webpage. It is used to pass data from one page to another in ASP dot NET.
A website session allows users to interact with the application and perform operations such as reading and writing.

### Prerequisites
To follow along you need to have:
- A basic knowledge of C# and .NET programming.
- Visual Studio IDE in your machine.

### Table of  content
- [Prerequisites](#prerequisites)
- [Table of content](#table-of-content)
- [Creating cookies in ASP dot NET](#creating-cookies-in-asp-dot-net)
- [Properties of cookies](#properties-of-cookies)
- [Initiation and termination of a session](#initiation-and-termination-of-a-session)
- [Implementation of sessions in ASP dot NET](#implementation-of-sessions-in-asp-dot-net)
- [Conclusion](#conclusion)

### Creating cookies in ASP dot NET
`Response. cookies` applied to create a cookie in ASP.NET, 

- Create the name of the cookies, and assign the value as shown below.
```
<%
Response.cookies("StudentName") = "StanleyWambui"
%>
```
Our cookie's name is `StudentName` and its value is `Stanley Wambui`.

- Set the expiry date of the cookies. As shown below.
```
<%
Response.cookies("StudentName") = "Stanley Wambui"
Response.cookies("StudentName").Expires =#May 05 2022#
%>
```
We set the cookies to expire on `May 05, 2022`.

#### Retrieving value of cookies
`Request.cookies` command is applied to reveal the value of cookies. We are retrieving the cookies named `StanleyWambui` to display on the page.
```
<%
FirstName = Request.cookie("StudentName")
Response.write("StudentName" = &FirstName)
%>
```

The output will be `StudentName Stanley Wambui`.

#### Creating collection of cookies
It's possible to create a collection of cookies, rather than creating one cookie at a time-consuming time. The code below shows the creation of multiple cookies in ASP.NET
```
<%
Response.cookies("StudentName")("FullName") = "Stanley Wambui"
Response.cookies("StudentName")("School") = "Computing and Informatics"
Response.cookies("StudentName")("Campus") = "Nairobi"
Response.cookies("StudentName")("Registration") = "380940"
%>
```
#### Creating cookies for browsers that don't support cookies
For browsers that don't support cookies. In such a case there are alternative techniques on how to create cookies.
Only two alternatives are available, either generating a form or parameterizing the URL.
Parameterizing is shown below. it involves attaching parameters in the URL.
```
<a href = "About us - Tuko.asp? FileName = Section&LinkName = Blog">
Go to Tuko About us page </a>
```
This will retrieve values of the file "About us-Tuko. asp" as shown below,

```
<%
FirstName=Request.querystring("stanley")
SirName=Request.querystring("kuria")
response.write("<p> Good Evening" &stanley " " &kuria &"!</p>)
response.write("<p> Hakuna Matata website!</p>)
%>
```
- Generating a form
The form is generated as shown in the following code.

```
<form
method="post" action="About-Section.asp">
FirstName: <input type="text" name="stanley" value="">
SirName: <input type="text" name="kuria" value="">
<input type="submit" value="Submit">
</form>
```
Retrieve values of the file "About us-Tuko.asp" as shown below,

```
<%
FirstName=Request.querystring("stanley")
SirName=Request.querystring("kuria")
response.write("<p> Good Evening" &stanley " " &kuria &"!</p>)
response.write("<p> Hakuna Matata Tuko!</p>)
%>
```

### Properties of cookies

Below are some common properties of cookies in ASP.NET:

- Value, manipulates a single cookie. 
- values, handles the collection of cookies and manipulates a collection of cookies.
- Expire, used to set the expiry date of cookies.
- Domain, associates cookies to domain.

### Initiation and termination of a session
Session gets initiated when a user hits an application for the first time.
If the user is inactive on the same application the session memory is allocated to the user. A session with a dormant user gets terminated automatically. When the user visits the application again, will not be required to create a new session, but will continue from the previous session created.

This is how sessions are initiated in ASP.NET:
- User request URL that identifies the ASP.NET file in the website. Session_Onstart procedure call is used.
- User values are then stored by session objects.
- Server receives requests, the request doesn't have a valid` sessionID` and the session is automatically initiated.
- Object is initiated with its session using. < OBJECT > tag applied to initiate an object in the `global.asa file.`.

Session termination:

- When a user stays on a web application for long and doesn't refresh the page the session gets terminated.
- The webserver experiences an error and collapses, all user sessions get terminated.
- Sessions get timed out leads to session termination. Usually, a session is valid for 20 minutes. session timeout can be reduced manually using the timeout property. Allocating Less session timeout reduces strain in server resources.
- Session can also be terminated willingly using the quit button in the application.
- Stateless sessions get eliminated automatically. A stateless is a session that does not have any state.

### Implementation of sessions in ASP dot NET
Below is a step-by-step guide on how sessions are implemented using ASP.NET.

#### Step 1
Open Visual Studio IDE, click file then select new project. After that choose ASP.NET Application and press ok.

![step-one](/engineering-education/cookies-and-sessions-in-asp-dot-net/step-one.png)

#### Step 2
Select empty as shown below and click ok and wait for a moment.

![step-two](/engineering-education/cookies-and-sessions-in-asp-dot-net/step-two.png)

#### Step 3
Right-click on the web application and click add. Select webform. Then rename the webform1 to Main and enter.

![step-three](/engineering-education/cookies-and-sessions-in-asp-dot-net/step-three.png)

#### Step 4
Click design and Select toolbox on the left corner of the IDE. Drag and drop a label followed by a TextBox, rename the label as `Username`.
Add another label and an input(password) box, rename the label as `PIN`. Also, add a button and rename it as `Submit`. 
The design should resemble the one below, and the code is as follows.

![step-four](/engineering-education/cookies-and-sessions-in-asp-dot-net/step-four.png)

```HTML
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
Create one more web form. Right-click on the web application choose to add and select a web form. Rename the webform as `recvd` and click ok.

![step-five](/engineering-education/cookies-and-sessions-in-asp-dot-net/step-five.png)

![step-five-a](/engineering-education/cookies-and-sessions-in-asp-dot-net/step-five-a.png)

#### Step 6
Go to `Main.aspx.cs`, and add the following code.

```c#
Session["Username"]= TextBox1.Text;
Response.Redirect("Recvd.aspx");
Session["PIN"]= Password;
Response.Redirect("recvd.aspx");
```
After adding the code above the final code should resemble the one shown below.

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
Click on `recvd.aspx` and select design. In the design add a label.

![step-seven](/engineering-education/cookies-and-sessions-in-asp-dot-net/step-seven.png)

#### Step 8
Right-click `recvd.aspx` on the right corner and select view code. In the code add the following segment of a code.

```c#
 Label1.Text = Session["name"].ToString();
            TextBox = Session["Registration"];
```
The final code after adding the above segment will look as follows.

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
#### step 9
Then select `main.aspx`, choose to build wait for a moment until the build is successful. After that click debug and start without debugging to create a new session in a browser. As shown below.

![step-nine-a](/engineering-education/cookies-and-sessions-in-asp-dot-net/step-nine-a.png)

![step-nine-b](/engineering-education/cookies-and-sessions-in-asp-dot-net/step-nine-b.png)

![step-nine-c](/engineering-education/cookies-and-sessions-in-asp-dot-net/step-nine-c.png)

![step-nine-d](/engineering-education/cookies-and-sessions-in-asp-dot-net/step-nine-d.png)

![step-nine-e](/engineering-education/cookies-and-sessions-in-asp-dot-net/step-nine-e.png)

### Conclusion
This article focused on cookies and sessions in ASP.NET, how to create cookies, and implementation of sessions using the ASP.NET framework. We also learned about the various properties of cookies and how sessions are initiated and terminated.

Happy coding!








