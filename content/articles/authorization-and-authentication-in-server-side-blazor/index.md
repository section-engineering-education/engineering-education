---
layout: engineering-education
status: publish
published: true
url: /authorization-and-authentication-in-server-side-blazor/
title: Implementing Authentication and Authorization in Server Side Blazor
description: This tutorial gives a step by step process of applying authorization and authentication in blazor into websites.
author: daniel-masika
date: 2021-12-14T00:00:00-12:47
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/authorization-and-authentication-in-server-side-blazor/hero.jpg
    alt: authentication authorization Server Side Blazor Hero Image
---
Today, there are many websites providing important services. In order to carry out this process, they need to protect their websites from unethical users. This has led to the introduction of authentication and authorization on their websites.
<!--more-->
Authentication is the process or action of verifying the identity of a user or process. User authentication for each device ensures the company recognizes the individual using the device, and authorization gives users permission to access a service.

In this tutorial, we will discuss how authentication and authorization are implemented in the functionality layer. 

There are three different basic layers:
- User interface (UI) layer
- Functionality layer
- Object Relation Mapping/Database

### Table of contents
- [Table of contents](#table-of-contents)
- [Prerequisites](#prerequisites)
- [Getting started](#getting-started)
- [The user interface](#the-user-interface)
- [Functionality layer](#functionality-layer)
- [Object relation mapping or data base](#object-relation-mapping-or-data-base)
- [Conclusion](#conclusion)

### Prerequisites
To follow through this tutorial, we will need:
- [Visual Studio](https://visualstudio.microsoft.com/vs/community/) installed.
- Basic understanding of [C#](https://docs.microsoft.com/en-us/dotnet/csharp/)
- Basic understanding of [Blazor](https://dotnet.microsoft.com/apps/aspnet/web-apps/blazor)

### Getting started
We will start by creating a server side blazor app. To do this, we will Open Microsoft Visual Studio and select `Create a New Project`.

![New Project](/engineering-education/authorization-and-authentication-in-server-side-blazor/newproject.jpg)

On the next screen, we will select `Blazor server App` and click `Next`.

![Type of Application](/engineering-education/authorization-and-authentication-in-server-side-blazor/blazorserver.jpg)

On the next screen, where we are required to configure our new project, we will enter the name of the project and click `Next`.

![Name of Application](/engineering-education/authorization-and-authentication-in-server-side-blazor/nameapp.jpg)

On the next screen, we will choose `.NET Core 3.1 (Long-term support)` as our target framework, then click on `Create`.

![Target framework](/engineering-education/authorization-and-authentication-in-server-side-blazor/framework.jpg)

### The user interface
This is the layer that the user interacts with. It enables users to register, log in, recover passwords, and manage user profiles.

### Functionality layer
This layer is used to authenticate and authorize user information. In our project we will work on this layer to implement the authorization function.

To start our authentication functionality, we will go to the `startup.cs` file, in the `configure` method, and add the following code after the else statement, to enable authentication and authorization.

```c#
    app.UseAuthentication();
    app.UseAuthorization();
```

In the next step, we will add an authentication state provider which will give us the state of the user. To do this, we will add a class named `AuthStateProvider` in our Data folder.

Now in the created class, in order to return the authentication state of the hard coded user, for example, `johndoe@gmail.com` because there is no user logged in to the system, we will use the code below:

```c#
namespace ServerApp.Data
{
    public class NewAuthenticationStateProvider : AuthenticationStateProvider
    {
        public override Task<AuthenticationState> GetAuthenticationStateAsync()
        {
            var identity = new ClaimsIdentity(new[]
            {
                new Claim(ClaimTypes.Name, "Johndoe@gmail.com"),
            }, "apiauth_ype");
            var user = new ClaimsPrincipal(identity);

            return Task.FromResult(new AuthenticationState(user));
        }
    }
}
```

The next thing is to add the authentication state provider in the `startup.cs` file. This is done in the `ConfigureServices` method. 

Use the code line below:

```c#
services.AddScoped<NewAuthenticationStateProvider, NewAuthenticationStateProvider>();
```

In the code above, we are adding a scoped instance of the state provider and implementing it with the `NewAuthenticationStateProvider`. Now we tell the application route that we are expecting `NewAuthenticationStateProvider` as the cascading parameter which could be passed across the application and we could use it.

To implement this, go to the `app.razor` file, edit this code line `<RouteView RouteData="@routeData" DefaultLayout="@typeof(MainLayout)" />` to `<AuthorizeRouteView RouteData="@routeData" DefaultLayout="@typeof(MainLayout)" />`. The `AuthorizeRouteView` takes state provider as cascading parameter and can be used whenever it is needed.

We will again add the code inside `Not found` parameters in `<CascadingAuthenticationState>`. These are the two states that take the authentication state as cascading. i.e:

```HTML
 <NotFound>
        <CascadingAuthenticationState>
            <LayoutView Layout="@typeof(MainLayout)">
                <p>Sorry, there's nothing at this address.</p>
            </LayoutView>
        </CascadingAuthenticationState>
    </NotFound>
```

Now, on the index page, we need to show the name of authenticated user on the screen as shown below:

```HTML
<SurveyPrompt Title="How is Blazor working for you?" />
<AuthorizeView>
    <Authorized>
        <p>Hello @context.User.Identity.Name</p>
    </Authorized>
    <NotAuthorized>
        <p>Please log in to access the page. Thank you</p>
    </NotAuthorized>
</AuthorizeView>
```

`@context.User.Identity.Name` is showing the name of the user when he or she has successfully logged in. If the user is not logged in, they will see `Please log in to access the page. Thank you`.

Next, we need to create a log in page to enable the user to sign in. To do this, go to the pages folder and add another page. 

Open the file and add the following code:

```c#
@page "/login"
@Using ServerApp.Data
@code  {
private User user;
protected ovveride Task OnInitializedAsync()
{
   user = new User();
   return base.OnInitializedAsync();
}
private async Task<bool> Validate User()
    {
    return await Task.FromResult(true);
    }
}
```

Now, we need to change state whenever a user is validated, to do this, we will create a function in the `NewAuthenticationStateProvider` file that takes a string as a parameter and call it `UserAuthenticated`, then send it to `NotifyAuthenticationStateChanged`. This tells the authentication state provider that the state has changed.

```c#
 public void UserAuthenticated(string name)
        {
            var identity = new ClaimsIdentity(new[]
          {
                new Claim(ClaimTypes.Name, "johndoe@gmail.com"),
            }, "apiauth_ype");
            var user = new ClaimsPrincipal(identity);
            NotifyAuthenticationStateChanged(Task.FromResult(new AuthenticationState(user)));
        }
```

In the login razor page, we will inject the `AuthenticationStateProvider` using the code line below:

```C#
@inject AuthenticationStateProvider AuthenticationStateProvider
```

When a user clicks on login, they need to be marked as authenticated, this is done by passing in the user email address as in code below:

```c#
((NewAuthenticationStateProvider)AuthenticationStateProvider).UserAuthenticated(user.EmailAddress);
```

The user now needs to navigate to the index page from the login screen, so you will inject a navigation manager in the `login.razor page`, i.e:

```c#
@inject NavigationManger NavigationManager;
```

To navigate to home page, we will use the code line below:

```c#
NavigationManager.NavigateTo("/");
```

When we refresh our browser, we notice that we are signed out. To ensure that we are not signed out, we will download a `NUGET` package called `Blazored.SessionStorage` and add it in the `startup.cs` file.

```c#
services.AddBlazoredSessionStorage();
```

Now in the login page we need to inject the session storage as shown below:

```c#
@inject Blazored.SessionStorage.ISessionStorageService sessionStorage
```

We will also add a key that will be the email address of the user so that even if the user refreshes the browser, the username will be stored in the session storage. To do that, add the following code in the `private async Task<bool> Validate User()` function.

```c#
await sessionStorage.setItemAsync("emailAddress", user.emailAdress);
```

Now, to use the session storage, write a constructor in the `NewAuthenticationStateProvider`.

```c#
private ISessionStorageService _sessionStorageService;
public NewAuthenticationStateProvider(ISessionStorageService sessionStorageService)
{
     _sessionStorageService = SessionStorageService;
}
```

Now that we have the session state provider, when the browser is refreshed and user has some value, we need the browser to return the user data, otherwise, log out the user. This is implemented by using the code below in the `public override Task<AuthenticationState> GetAuthenticationStateAsync()` function, and calling it whenever you refresh the browser:

```c#
var emailAddress = await _sessionStorageService.GetItemAsync<string>(emailAddress);
ClaimsIdentity identity;
if(emailAddress != null)
{
     identity = new ClaimsIdentity(new[]
            {
                new Claim(ClaimTypes.Name, "emailAddress"),
            }, "apiauth_ype");
}
else
{
     identity = new ClaimsIdentity();
}
```

We will also need to tell the function that it is an async function because we are using the `await` keyword in the code above.

```c#
public override async Task<AuthenticationState> GetAuthenticationStateAsync()
```

Change the code line `return Task.FromResult(true);` to `return await Task.FromResult(true);` by adding the `await` keyword. The last thing to do is implement the log out function. We will navigate to the `shared` folder, open the `MainLayout.razor` file, then create an authorize view inside the `div class ="main"` i.e:

```HTML
<AuthorizeView>
    <Authorized>
        <a href = "/login>" @onclick = "(() =>Logout())>Logout</a>
    </Authorized>
    <NotAuthorized>
        <a href = "/login>">Login</a>
    </NotAuthorized>
</AuthorizeView>
```

The code above is basically telling the user to log in if they are not logged in or to log out if they are already logged in.

We will implement the log out function by creating a method in the `NewAuthenticationStateProvider` that will mark the user as logged out. i.e;

```c#
public UserLoggedOut()
{
            _sessionStorageService.RemoveItemAsync("emailAddresss");
            var identity = new ClaimsIdentity();
            var user = new ClaimsPrincipal(identity);
            NotifyAuthenticationStateChanged(Task.FromResult(new AuthenticationState(user)));
}
```

We will need to inject the authorization state provider in the `MainLayout.razor` page;

```c#
@inject AuthenticationStateProvider AuthenticationStateProvider
```

Add the code below in the `@code` part to mark the user as logged out.

```c#
public void Logout()
{
     ((NewAuthenticaticationStateProvider)AuthenticationStateProvider).UserLoggedOut();
}
```

### Object relation mapping or database
This layer stores, operates, and updates user information.

### Conclusion
From this tutorial, we learned how to implement server side authorization in blazor by taking you through each and every step, easy to understand and follow along.

**NOTE:** *Any errors in the project are solved by importing the necessary C# packages.*

I hope you find this tutorial helpful.

Happy coding!

---
Peer Review Contributions by: [Monica Masae](/engineering-education/authors/monica-masae/)
