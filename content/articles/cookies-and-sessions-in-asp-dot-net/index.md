### Introduction
Cookies are small tokens of data that are stored on the clients computer, they're used to store user data on the client end. 

Name, user id, contacts, address etc. are examples of data stored on the client computer.
ASP.NET supports two sets of cookies; persistent and non-persistent. Cookies that have an expiry date are referred to as persistent cookies, while those that don't expire are known as non-persistent cookies.

A session is a state from where user values are retrieved and kept on the webpage, it is used to pass data from one page to another in ASP.NET.

A website session allows users to interact with the application and perform operations such as reading and writing on it.

### Table of contents
- [Prerequisites](#prerequisites)
- [Creating cookies in ASP.NET](#creating-cookies-in-asp-dot-net)
- [Properties of cookies](#properties-of-cookies)
- [Initiation and termination of a session](#initiation-and-termination-of-a-session)
- [Implementation of sessions in ASP.NET](#implementation-of-sessions-in-asp-dot-net)
- [Conclusion](#conclusion)

### Prerequisites
To follow along with this tutorial, the reader will need the following:
- A basic background knowledge in C# and .NET programming language.
- Have [Visual Studio](https://my.visualstudio.com/Downloads?q=Visual%20Studio%202017) IDE installed on your computer.

### Creating cookies in ASP.NET
The `Response.cookies` is used to create a cookie in ASP.NET.

- Create the name of the cookies, and assign the value as shown below.

```cs
<%
Response.cookies("StudentName") = "StanleyWambui"
%>
```

Our cookie's name is `StudentName` and its value is `Stanley Wambui`.

- Next, set the expiry date of the cookies. As shown below.

```cs
<%
Response.cookies("StudentName") = "Stanley Wambui"
Response.cookies("StudentName").Expires =#May 05 2022#
%>
```

From the code above we set the cookies expiration date to `May 05, 2022`.

#### Retrieving value of cookies
The `Request.cookies` command is applied to reveal the value of cookies. We are retrieving the cookies named `StanleyWambui` to display on the page.

```cs
<%
FirstName = Request.cookie("StudentName")
Response.write("StudentName" = &FirstName)
%>
```

The output will be `StudentName Stanley Wambui`.

#### Creating collection of cookies
It's possible to create a collection of cookies, rather than careating it one at a time-consuming time. The code below shows the creation of multiple cookies in ASP.NET

```cs
<%
Response.cookies("StudentName")("FullName") = "Stanley Wambui"
Response.cookies("StudentName")("School") = "Computing and Informatics"
Response.cookies("StudentName")("Campus") = "Nairobi"
Response.cookies("StudentName")("Registration") = "380940"
%>
```

#### Creating cookies for browsers that don't support cookies
For browsers that don't support cookies, in such case there are alternative techniques on how to create cookies.
Only two alternatives are available, either generating a form or parameterizing the URL.
Parameterizing is shown below. it involves attaching parameters in the URL.

```html
<a href = "About us - Tuko.asp? FileName = Section&LinkName = Blog">
Go to Tuko About us page </a>
```

This will retrieve values of the file "About us-Tuko.asp" as shown below,

```cs
<%
FirstName=Request.querystring("stanley")
SirName=Request.querystring("kuria")
response.write("<p> Good Evening" &stanley " " &kuria &"!</p>)
response.write("<p> Hakuna Matata website!</p>)
%>
```

- Generating a form
The form is generated as shown in the code below.

```cs
<form
method="post" action="About-Section.asp">
FirstName: <input type="text" name="stanley" value="">
SirName: <input type="text" name="kuria" value="">
<input type="submit" value="Submit">
</form>
```

Retrieve values of the file "About us-Tuko.asp" as shown below,

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
- Value: manipulates a single cookie.
- values: handles the collection of cookies and manipulates the collection.
- Expire: used to set the expiry date of cookies.
- Domain: associates cookies to the domain.

### Initiation and termination of a session
A Session gets initiated when a user hits an application for the first time.

If the user is inactive on the same application the session memory is allocated to the user. A session with a dormant user gets terminated automatically. When the user visits the application again there will be no need to create a new session, but it will continue from the previous session created.

This is how sessions are initiated in ASP.NET:
- User request URL that identifies the ASP.NET file on the website. `Session_Onstart` procedure call is used.
- User values are then stored by session objects.
- Server receives requests, the request doesn't have a valid `sessionID` and the session is automatically initiated.
- Object is initiated with its session using the  < OBJECT > tag applied to initiate an object in the `global.asa` file.

Session termination:
- When a user stays on a web application as long and doesn't refresh the page, the session gets terminated.
- The webserver experiences an error and collapses, all user sessions get terminated.
- Sessions get timed out, leads to session termination. Usually, a session is valid for 20 minutes. Session timeout can be reduced manually using the timeout property. Allocating less session timeout reduces strain in server resources.
- Session can also be terminated intentionally using the quit button in the application.
- Stateless sessions get eliminated automatically. A stateless session is a session that does not have any state.

### Implementation of sessions in ASP.NET
Below is a step-by-step guide on how sessions are implemented using ASP.NET.

#### Step 1
Open Visual Studio IDE, click file then select new project. After that, choose ASP.NET Application and press ok.

![step-one](/engineering-education/cookies-and-sessions-in-asp-dot-net/step-one.png)

As shown in the image above, we selected ASP.NET WebApplication(.NET Framework).

#### Step 2
Select empty as shown below and click ok and wait for a moment.

![step-two](/engineering-education/cookies-and-sessions-in-asp-dot-net/step-two.png)

As you can see in the image above, we choose "Empty Activity" to build on.

#### Step 3
Right-click on the web application, and then click add. Select web form, rename the webform1 to Main and press enter.

![step-three](/engineering-education/cookies-and-sessions-in-asp-dot-net/step-three.png)

After right-clicking on the WebApplication at the right side of the IDE, a popup modal will be shown, select `add` and another popup shows up we select web form at the bottom.

#### Step 4
Click design and Select toolbox on the left corner of the IDE. 

Drag and drop a label followed by a TextBox, rename the label as `Username`.
Add another label and an input(password) box, rename the label as `PIN`. Also, add a button and rename it as `Submit`. Then double-click the submit button to implement the design.

Your design should look like the image below.

![step-four](/engineering-education/cookies-and-sessions-in-asp-dot-net/step-four.png)

In the image above you will see two labels, `Username` and `Pin`, two text boxes, and a `Submit` button.

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
Create one more web form. Right-click on the web application, select `add` and a web form. Rename the webform as `recvd` and click ok.

![step-five](/engineering-education/cookies-and-sessions-in-asp-dot-net/step-five.png)

From the image above, we right-clicked on WebApplication and selected `add`, we added another web form.

![step-five-a](/engineering-education/cookies-and-sessions-in-asp-dot-net/step-five-a.png)

From the image above we renamed the new web form created.

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
Click on `recvd.aspx` and select design. In the design, add a label.

![step-seven](/engineering-education/cookies-and-sessions-in-asp-dot-net/step-seven.png)

In the image shown, we dragged and dropped a label to the design.

#### Step 8
Right-click `recvd.aspx` on the right corner and select view code. Add the following code segment.

```c#
 Label1.Text = Session["name"].ToString();
            TextBox = Session["Registration"];
```

The final code after adding the segment above will look as follows.

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
Then select `main.aspx`, choose to build wait for a moment until the build is successful. After that, click debug and start without debugging to create a new session in a browser. As shown below.

![step-nine-a](/engineering-education/cookies-and-sessions-in-asp-dot-net/step-nine-a.png)

We selected build, then clicked build solution.

![step-nine-b](/engineering-education/cookies-and-sessions-in-asp-dot-net/step-nine-b.png)

We select start without debugging.

![step-nine-c](/engineering-education/cookies-and-sessions-in-asp-dot-net/step-nine-c.png)

This is how our new web session will be displayed, user can enter the username or email and password, then click submit and save the details in the web browser.

![step-nine-d](/engineering-education/cookies-and-sessions-in-asp-dot-net/step-nine-d.png)

We entered a username `Stanley2000` and `PIN` and clicked `Submit`.

![step-nine-e](/engineering-education/cookies-and-sessions-in-asp-dot-net/step-nine-e.png)

And our username and password were saved.

### Conclusion
In this article we learned how to create cookies, and implement sessions using the ASP.NET framework. We also learned about the various properties of cookies and how sessions are initiated and terminated.

Happy coding!

