### Introduction
Today, there are many websites providing important services to society. In order to carry out this process, they need to protect their websites from unethical users. This led to the introduction of authentication and authorization on their websites.

Authentication is the process or action of verifying the identity of a user or process. User authentication for each device ensures that the individual using the device is recognized by the company, and authorization gives users permission to access a service.

In this tutorial, you will learn how authentication and authorization are implemented in the functionality layer. There are three different basic layers. These layers include the;

- User interface (UI) layer
- Functionality layer
- Object Relation Mapping/Database
  
### Table of contents
- [Prerequisites](#prerequisites)
- [Getting started](#getting-started)
- [The user interface](#the-user-interface)
- [Functionality layer](#functionality-layer)
- [Object relation mapping or Data base](#object-relation-mapping-or-data-base)
- [Conclusion](#conclusion)
  
### Prerequisites
To follow through this tutorial;

- you will need have [Visual Studio](https://visualstudio.microsoft.com/vs/community/) installed.
- You will a basic understanding of [C#](https://docs.microsoft.com/en-us/dotnet/csharp/)
- You will need a basic understanding of [Blazor](https://dotnet.microsoft.com/apps/aspnet/web-apps/blazor)

### Getting started
You will first start with creating a server side blazor app. Open Microsoft Visual Studio and select `Create a New Project`.

![New Project](/engineering-education/creating-a-blazor-server-side-application-using-aspdotnet-core-to-perform-crud-operations/newproject.jpg)

On the next screen, select `Blazor server App` and click `Next`.

![Type of Application](/engineering-education/creating-a-blazor-server-side-application-using-aspdotnet-core-to-perform-crud-operations/blazorserver.jpg)

On the next screen, where you are required to configure your new project, enter the name of the project and click `Next`.

![Name of Application](/engineering-education/creating-a-blazor-server-side-application-using-aspdotnet-core-to-perform-crud-operations/nameapp.jpg)

On the next screen, choose `.NET Core 3.1 (Long-term support)` as your target framework and click on `Create`.

![Target framework](/engineering-education/creating-a-blazor-server-side-application-using-aspdotnet-core-to-perform-crud-operations/framework.jpg)
### The user interface
This is the layer that the user interacts with. It enables users to register, log in, recover passwords, and manage user profiles.

### Functionality layer
This layer is used to authenticate and authorize user information. In your project you will work on this layer to implement the authorizatization function.

To start your authentication functionality, go to the `startup.cs` file, in the `configure` method, you will add the following code to enable authentication and authorization after the else statement.

```c#
    app.UseAuthentication();
    app.UseAuthorization();
```

The next step is to add an authentication state provider which will give you the state of the user. To do this, you will add a class named `AuthStateProvider` in your Data folder.
Now in the created class, in order to return the authentication state of the hard coded user, e.g,  `johndoe@gmail.com` because there is no user logged in to the system, you will use the code below.

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

The next thing is to add the authentication state provider in the `startup.cs` file. This is done in the `ConfigureServices` method. Use the code line below.

```c#
services.AddScoped<NewAuthenticationStateProvider, NewAuthenticationStateProvider>();
```

In the code above, you are adding a scoped instance of the state provider and implementing it with the `NewAuthenticationStateProvider`.

The next thing is to tell the application route that you are expecting `NewAuthenticationStateProvider` as the cascading parameter which could be passed across the application and we could use it. To implement this, go to the `app.razor` file, edit this code line `<RouteView RouteData="@routeData" DefaultLayout="@typeof(MainLayout)" />` to `<AuthorizeRouteView RouteData="@routeData" DefaultLayout="@typeof(MainLayout)" />`. The  `AuthorizeRouteView` takes state provider as cascading parameter and it can be used whenever it is needed.

You will again put the code inside `Not found` parameters in ` <CascadingAuthenticationState>`. These are the two states that take the authentication state as cascading. i.e;

```HTML
 <NotFound>
        <CascadingAuthenticationState>
            <LayoutView Layout="@typeof(MainLayout)">
                <p>Sorry, there's nothing at this address.</p>
            </LayoutView>
        </CascadingAuthenticationState>
    </NotFound>
```

Now, on the index page, what you will do is to show the name of authenticated user on the screen. To do this, you will use the code below.

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

`@context.User.Identity.Name` is showing the name of the user when he or she has successfully logged in. If the user is not logged in, he or she will see `Please log in to access the page. Thank you`.

Now you need to create a log in page to enable you sign in, to do this, go to the pages folder and add another page. Open the file and add the code below;

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

What needs to happen is to change state when a user is validated, to do this, you will create a function in the `NewAuthenticationStateProvider` file that takes a string as a parameter and call it `UserAuthenticated`. and send it to `NotifyAuthenticationStateChanged`. This tells the authentication state privider that the state of the application has changed.

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

In the login razor page, you will inject the `AuthenticationStateProvider` using the code line below.

```C#
@inject AuthenticationStateProvider AuthenticationStateProvider 
```

When a user clicks on login, he or she will need to be marked as authentiacted, this is done by passing in the user email address as shown below.

```c#
((NewAuthenticationStateProvider)AuthenticationStateProvider).UserAuthenticated(user.EmailAddress);
```

You now need  to navigate to the index page from the login screen, so you will inject a navigation manager in the `login.razor page`. i.e;

```c#
@inject NavigationManger NavigationManager;
```

To navigate to home page, you will use the code line below;

```c#
NavigationManager.NavigateTo("/");
```

When you refresh your browser, you notice that you are signed out. To ensure that you are not signed out, you will download a `NUGET` package called `Blazored.SessionStorage` and add it in the `startup.cs` file.

```c#
services.AddBlazoredSessionStorage();
```

Now in the login in page you will need to inject the session storage using the code line below;

```c#
@inject Blazored.SessionStorage.ISessionStorageService sessionStorage
```

You will also add a key that will be the email address of the user so that even if the user refreshes tha browser,the username will be stored in the session storage. To do that you will add the code below in the `private async Task<bool> Validate User()` function.

```c#
await sessionStorage.setItemAsync("emailAddress", user.emailAdress);
```

Now to use the session storage, you will write a construtor in the `NewAuthenticationStateProvider`.

```c#
private ISessionStorageService _sessionStorageService;
public NewAuthenticationStateProvider(ISessionStorageService sessionStorageService)
{
     _sessionStorageService = SessionStorageService;
}
```

Now that you have the session state provider, when the browser is refreshed and user has some value, you need the browser to return the user data else log out the user. To do that you will use the code below in the `public override Task<AuthenticationState> GetAuthenticationStateAsync()` fuction, you will add the code below and call it whenever you refresh the browser.

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

You will also tell the function that it is an async function because you are using the `await` keyword in the code above.

```c#
public override async Task<AuthenticationState> GetAuthenticationStateAsync()
```

Change the code line `return Task.FromResult(true);` to `return await Task.FromResult(true);` adding the `await keyword.

The last thing to do is implement the log out function. You will go to the `shared` folder and open the `MainLayout.razor` file and create an authorize view inside the `div class ="main"` i.e;

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

The code above is basically telling the user to log in if he or she is not logged in or to log out if he or she is already logged in.

To implement the log out function, you will create a method in the `NewAuthenticationStateProvider` that will mark the user as logged out. i.e;

```c#
public UserLoggedOut()
{
            _sessionStorageService.RemoveItemAsync("emailAddresss");
            var identity = new ClaimsIdentity();
            var user = new ClaimsPrincipal(identity);
            NotifyAuthenticationStateChanged(Task.FromResult(new AuthenticationState(user)));        
}
```

You will need to inject the authorization state provide in the `MainLayout.razor` page;

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

### Object relation mapping or Data base
 This layer stores, operates, and updates user information.

### Conclusion
From this tutorial, you, as a reader, should be able to understand each and every part of the code snippet that I have taken you through.

**NOTE:** *Any errors in the project are solved by importing the necessary C# packages.*
