---
layout: engineering-education
status: publish
published: true
url: /in-memory-caching-in-c-sharp/
title: In-Memory Caching In C#
description: In this article, we will discuss a caching method in the .NET framework called in-memory caching in C#.
author: joseph-ongoma
date: 2022-01-14T00:00:00-09:10
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/in-memory-caching-in-c-sharp/hero.jpg
    alt: In-Memory Caching In C# Hero Image
---
Caching is used to store data from slow memory to a faster memory to enhance easy access of data in a website. During app development, application performance is important.
<!--more-->
The fact that our application works well during app development does not mean it will work well when thousands of people start using it. One main area to look at is _data access_.

Accessing our database often can be very expensive especially when the data is not changing. Due to this reason, data caching is applied in our applications to reduce direct access time from the database. Thus, we enhance the performance of our application.

In this article, we will discuss a caching method in the [.NET](https://docs.microsoft.com/en-us/dotnet/csharp/) framework called in-memory caching in [C#](https://docs.microsoft.com/en-us/dotnet/csharp/). We will create an application without caching, observe its performance and then introduce caching and observe how the performance is improved.

### Table of contents
- [Table of contents](#table-of-contents)
- [Prerequisites](#prerequisites)
- [Building a blazor web application](#building-a-blazor-web-application)
- [Accessing data without caching](#accessing-data-without-caching)
- [Introducing caching](#introducing-caching)
- [Adding in-memory caching](#adding-in-memory-caching)
- [Conclusion](#conclusion)

### Prerequisites
To follow along with this tutorial, the reader should have:
- A basic understanding of the [.NET Framework](https://docs.microsoft.com/en-us/dotnet/framework/).
- [Microsoft Visual Studio](https://visualstudio.microsoft.com/downloads/) installed.
- A basic understanding of the [C#](https://docs.microsoft.com/en-us/dotnet/csharp/) programming language.
- Microsoft Visual Studio configured with [.NET 5.0](https://dotnet.microsoft.com/en-us/download/dotnet/5.0).

### Building a blazor web application
To understand how in-memory caching works, we need to create a blazor application. Let us begin by opening Microsoft Visual Studio and selecting `create new project` as shown in the figure below:

![New project](/engineering-education/in-memory-caching-in-c-sharp/newproject.png)

After clicking `create new project`, select `Blazor Server App` on the next screen and click `Next` as shown in the figure below:

![Application type](/engineering-education/in-memory-caching-in-c-sharp/blazor.png)

On the next screen, we are required to enter the name of our application, enter the name and click `Next`. For this project, we will name our application `CachingApp` as shown in the figure below:

![Name of application](/engineering-education/in-memory-caching-in-c-sharp/name.jpg)

On the next screen, we are required to select the target framework for our application, select `.Net Core 5.0(Current)`, and click `create` as shown in the figure below:

![Target framework](/engineering-education/in-memory-caching-in-c-sharp/framework.png)

### Accessing data without caching
We will start by creating a new class library. To do this, on the solution explorer window, right-click on `Solution` and click on `Add`. Then select `New project`, search for `Class library` and click `Next`.

![New class library](/engineering-education/in-memory-caching-in-c-sharp/classlibrary.jpg)

On the next screen, we will give it the name `ClassLibrary`. Use the set target framework and click `Create`.

In the created class, we will delete the `Class1.cs` and create a new class called `UserModel`. To do this, right-click on `ClassLibrary` and select `Add`. Select `Class` on the next screen, enter the name of the class as `UserModel` and click `Add`.

We will make this class public so it can be accessed by other functions in the application. This class will hold the information of the user, that is, the first and last name.

We will use the following code snippet in this class.

```C#
namespace ClassLibrary
{
    public class UserModel
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
    }
}
```

We will create another class that will simulate the idea of talking to our database. To do this, right-click on `ClassLibrary` and select `Add`. Select `Class`, on the next screen, enter the name of the class as `UserModel` and click `Add`.

In this class, we will create a list of user models to get users, call it output and create a `new` instance of it. This class returns the output of the data passed.

Now we have a list of employees. But in real-life scenarios, we will not be accessing two or three files, we will be accessing thousands of files. Due to this reason, we will be simulating a delay of four seconds to show that it is operating slowly:

```C#
namespace ClassLibrary
{
    public class SampleClassLibrary
    {
        public List<UserModel> GetUsers()
        {
            List<UserModel> output = new();
            output.Add(new() { FirstName = "James", LastName = "Courtney" });
            output.Add(new() { FirstName = "Caren", LastName = "Hesley" });
            output.Add(new() { FirstName = "Emanuel", LastName = "Washington" });
            output.Add(new() { FirstName = "John", LastName = "Doe" });
            output.Add(new() { FirstName = "Barrack", LastName = "Courtney" });
            Thread.Sleep(4000);
            return output;
        }
    }
}
```

Next, right-click on dependencies in the `Solution Explorer` window, click `Add Project Reference...` and check on `ClassLibrary` on the next screen and click `Ok`.

In our `program.cs` file, we will add a reference to the code above. We will add the sample class library service as shown in the code below.

```C#
builder.Services.AddTransient<SampleClassLibrary>();
```

With our data class library, we can now fetch this data in the pages folder under `FetchData.razor` file. We will delete the code in this file and add the one in the code snippet below.

```C#
@inject WeatherForecastService ForecastService
@inject SampleClassLibrary data
<h1>User Data</h1>
@if(users is not null)
            {
                foreach(var e in users)
                {
                    <h3>@e.FirstName @e.LastName</h3>
                }
            }
@code {
    List <UserModel> users;
    protected override void onInitialized()
    {
        users = data.GetUsers();
    }
}
```

In the code snippet above, we injected `SampleClassLibrary` and gave it the name `data`. We then called this `data` and initialized it with the employee's object. The `@` in the "h3" tags are used because we are mixing `HTML` and `C#` codes.

The last thing to do before we debug our application is to import our class into the `shared` folder in the `imports.razor` file.

```C#
@using ClassLibrary;
```

At this stage, we can now debug our application and observe its speed without caching.

### Introducing caching
Now, let's introduce caching to our application. This will help improve the performance of our application.

We will make the data access asynchronous in the `SampleClassLibrary`. We add the code snippet below in this class to do this.

```C#
public async Task <List<UserModel>> GetUsers()
        {
            List<UserModel> output = new();
            output.Add(new() { FirstName = "James", LastName = "Courtney" });
            output.Add(new() { FirstName = "Caren", LastName = "Hesley" });
            output.Add(new() { FirstName = "Emanuel", LastName = "Washington" });
            output.Add(new() { FirstName = "John", LastName = "Doe" });
            output.Add(new() { FirstName = "Barrack", LastName = "Courtney" });
            await Task.Delay(4000);
            return output;
```

We are using the `await Task.Delay(3000);` instead of `Thread.Sleep(400)` to delay our data access time for four seconds. Now that we have an asynchronous call, we can go to the `FetchData.razor` file and use the code snippet below:

```C#
@inject WeatherForecastService ForecastService
@inject SampleClassLibrary data
<h1>User Data</h1>
@if(users is not null)
            {
                foreach(var e in users)
                {
                    <h3>@e.FirstName @e.LastName</h3>
                }
            }
@code {
    List <UserModel> users;
    protected override async Task onInitialized()
    {
        users = await data.GetUsersCache();
    }
}
```

The main idea behind caching is to make the data access asynchronous.

### Adding in-memory caching
To add in-memory caching, we will start by going to the `Program.cs` file and add the following line of code. To ensure that our service is effective since our class does not know about memory cache, we will right-click on the `ClassLibrary` class. We then select `Manage Nuget Packages...`, search for `Microsoft.Extensions.Caching.Memory`, and click `install` to download it.

```C#
builder.Services.AddMemoryCache();
```

This code creates a singleton so that we can call it across all our different instances. This means that we are not supposed to input data here that our end-users will have access to if they are not allowed to access it.

We will now go to our `SampleClassLibrary` file and create a new method that will get the cached list of users. To do this, we will use the code snippet below:

```C#
public async Task <List<UserModel>>GetUserCache()
{
     List <UserModel> output;
     output = _memoryCache.Get<List<UserModel>>("users");
     if(output is null)
     {
          output = new();
            output.Add(new() { FirstName = "James", LastName = "Courtney" });
            output.Add(new() { FirstName = "Caren", LastName = "Hesley" });
            output.Add(new() { FirstName = "Emanuel", LastName = "Washington" });
            output.Add(new() { FirstName = "John", LastName = "Doe" });
            output.Add(new() { FirstName = "Barrack", LastName = "Courtney" });
            await Task.Delay(4000);
            _memoryCache.Set("users", output, Timespan.FromMinutes(2));
     }
     return output;
}
```

In the code above, we are accessing the data in cache memory. The `if` statement accesses the data in the database when the data is being accessed for the first time and the cache memory output returns null.

We are also storing the data from the database in the cache memory called `users` for a period of only two minutes. After two minutes, the data in the application is accessed from the database.

Our output has an unknown instance hence returns null. However, we need to grab the cached version of our users list, so we create a constructor of `SampleClassLibrary` and pass the dependency injection of `IMemoryCache`.

```C#
private readonly IMemoryCache _memoryCache;
public SampleClassLibrary(IMemoryCache memoryCache)
{
    _memoryCache = memoryCache;
}
```

### Conclusion
In this article, we have learned how in-memory caching enhances quick data access. But, there are a few things to take note of, these are:
- You should know how to properly use in-memory caching - If you put too much data into cache memory, you will run out of memory.
- Cache memory does not have the idea of limiting based upon the number of kilobytes it will access data - You can limit by limiting the number of objects to be stored in the memory at a given time.
- When we use cache memory for data that is not too strenuous to the memory, it will make our cache memory lighter.
- We should always prepare for new data that is not in cache memory.

---
Peer Review Contributions by: [Dawe Daniel](/engineering-education/authors/dawe-daniel/)
