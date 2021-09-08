---
layout: engineering-education
status: publish
published: true
url: /using-azure-functions-and-csharp-to-create-serverless-apis/
title: Getting started with Azure functions
description: This article covers the basics of Azure functions and how to create RESTful APIs using Azure functions
author: dennis-mwangi
date: 2021-09-08T00:00:00-04:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/using-azure-functions-and-csharp-to-create-serverless-apis/hero.png
    alt: Getting started with Azure functions example image
---

Azure functions is a cloud-native design strategy that allows a piece of code to be supplied and executed without needing a web server or server infrastructure settings.
<!--more-->
C#, Java, JavaScript, TypeScript, and Python are just a few languages that integrate with Azure functions.

Azure Functions is a serverless computing platform that simplifies the execution of small amounts of code or functions in the cloud. As a result, it improves the efficiency of our development. 

Only the code required for the task at hand is written, with no consideration for the rest of the program or the infrastructure needed to operate it.

This article explains what Azure Functions are and how to utilize them in the C# programming language.

### Advantages
- Azure functions are simple and do not require a server.
- Writing and deploying Azure functions is a lot easier.
- The execution of Azure functions is initiated when an event occurs.
- Azure functions don't require any infrastructure and don't require any upkeep.
- Using the Azure interface and a browser, we can create, test, and deploy Azure functions.
- Upgrades to Azure functions are simple and have no impact on other elements of the website.
- Azure functions integrates with other APIs, databases, and libraries using industry standards.
- Because Azure functions are compute-on-demand, they scale up when the number of requests for execution increases and scale down when the number of requests reduces.
### Prerequisites
- Have background information on using the visual studio 2019 and the SQL database creator.
- Download [Visual studio 2019](https://visualstudio.microsoft.com/vs/) for compiling the Csharp code.
- Have some prior knowledge of SQL databases and connections.
- To execute the SQL command, use the SQL compiler. For my case, I used the [oracle terminal online](https://www.tutorialspoint.com/oracle_terminal_online.php) to execute the commands.

### Table of contents
- [How to set up Azure Function ](#how-to-set-up-azure-function)
- [Entity Model and Database schema](#entity-model-and-database-schema)
- [Setting up the Connection with SQL Database by using EF Core](#setting-up-the-connection-with-sql-database-by-using-ef-core) 
- [Initialize Dependency Injection](#initialize-dependency-injection)
- [Injecting the DbContext into a function](#injecting-the-dbcontext-into-a-function)
- [Implementing the Functions](#implementing-the-functions)

### How to set up Azure Function
To build up Azure Functions, we will use Visual Studio. In Visual Studio, open the Blazor app and create a new project. Then, select the Azure function on the project template page.

![Output of the setup](/engineering-education/using-azure-functions-and-csharp-to-create-serverless-apis/create.jpg)

Click Next after selecting the Azure Functions template.
You will need to name your functional application and choose a location for the Visual Studio project to operate.

![This what you will see](/engineering-education/using-azure-functions-and-csharp-to-create-serverless-apis/configure.jpg)

The image below depicts the numerous triggers available in Visual Studio for an Azure function app.

![Trigger of the Visual Studio](/engineering-education/using-azure-functions-and-csharp-to-create-serverless-apis/app.jpg)
 
Each trigger, as we can see, has a distinct role. We will utilize the HTTP trigger, which fires anytime a HTTP request is sent. 
Click the create button to create the application.

#### Here is an example of our function's complete code

```c#
using System;    
using System.IO;    
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;    
using Microsoft.Azure.WebJobs;    
using Microsoft.Azure.WebJobs.Extensions.Http;      
using Microsoft.Extensions.Logging; 
using Microsoft.AspNetCore.Http;   
using Newtonsoft.Json;    
namespace HelloFunction {    
    public static class Function1 {    
        [FunctionName("Function1")]    
        public static async Task < IActionResult > Run(    
            [HttpTrigger(AuthorizationLevel.Function, "get", "post", Route = null)] HttpRequest req, ILogger log) {  // HTTP trigger is executed whenever we make an HTTP request. 
            log.LogInformation("C# HTTP trigger function processed a request."); //This trigger causes the function to run.    
            string name = req.Query["name"];    
            string requestBody = await new StreamReader(req.Body).ReadToEndAsync();    
            dynamic data = JsonConvert.DeserializeObject(requestBody);    
            name = name ?? data?.name;    
            string responseMessage = string.IsNullOrEmpty(name) ?    
            return new OkObjectResult(responseMessage);    
        }    
    }    
} 
```
Every trigger in the code above prompts the function to run. A function will only have one trigger and has a single purpose. For example, the HTTP trigger will execute when we initiate a HTTP request, causing our function to run.

Output:

![This is the output](/engineering-education/using-azure-functions-and-csharp-to-create-serverless-apis/core.jpg)

### Entity Model and Database schema
A database schema represents the logical setup of all or part of a relational database. We can represent the database schema visually or as a series of formulas called `integrity constraints` that control a database. 

Integrity constraints are mechanisms that limit a database's potential states. For example, if we consider a database employee, we do not want two rows for the same person. Therefore, employee ID must be unique across all rows in the table employee, according to the integrity constraint.

The term `entity data model` refers to concepts that define data structure regardless of its storage. The model describes data structure using three essential concepts: entity type, association type, and property.

Below is the example for the employee table schema.


```sql
CREATE TABLE Employee 
(
    Id int IDENTITY (1,1) PRIMARY KEY,
    Name nvarchar(60)NOT NULL,
    Designation nvarchar(60) NOT NULL,
    Town nvarchar(60) NOT NUll
);
```
In the above code, we are creating a table for the employee in the database that we will be using.

![output of the setup](/engineering-education/using-azure-functions-and-csharp-to-create-serverless-apis/b13.png)

Create a folder and name it **My_Model**. Inside the folder, create a class named `Employee`. You can use few properties to make your implementation simpler.

Below is an example.

```c#
namespace API_EFCore_AzureFunctions.My_Model
 {
       public class Employee //creating our class (employee)
    {
        public int IdNumber {get;set;}
        public string Name {get;set;}
        public string Apointment { get; set;}
        public string Town {get; set;}

    }
 }

```

After that, we will have to add the `DatabaseContext` class to our project. `DatabaseContext` allows us to use the application to access the Database tables generated by our model.

Create a new class named `AppDatabaseContext` and add the code snippet below. 

```c#
using Microsoft. Entity FrameworkCore;

namespace API_EFCore_AzureFunctions.model
{
    public class AppDataBaseContex:DataBaseContext //creating app databasecontext to define our Databasecontext.
    {
          public class AppDataBasebContex(DataBaseContextOptions<AppDataBaseContext>options)
          :base(options)
        {

        }
         public DataBase<Employee> Employee {get;set;}

    }
}

```
The code above explains how we can create database context to access tables from the database.

### Setting up the Connection
To get the Nuget package in the `Solution Explorer`, you need to right-click either `Reference` or a project and select Manage NuGet packages.

As shown below, we will install the desired package using the Nuget Package Manager or the Package Manager console.

![output of the setup](/engineering-education/using-azure-functions-and-csharp-to-create-serverless-apis/manage.png)

Visual studio displays packages from the selected source in the browse tab. Search for specific packages using the search box. The install button, as well as the version selection dropdown should be enabled.

### Initialize Dependency Injection
To set up dependency injection for our function app, we use the Assembly's `FunctionsStartup` feature to define a starter class that will run when the function app starts. In that class, which is derived from Functions Startup, we will override the Configure function.

By registering a `DbContext` in the services, we can obtain the SQL connection string from the configuration and inject the `AppDbContext` into our method. Create a class called `Startup.cs`.

```c#

 using API_EFCore_AzureFunctions.Model;
 using Microsoft.Azure.Functions.Extensions.DependencyInjection;
 using Microsoft.EntityFrameworkCore;
 using Microsoft.Extensions.DependencyInjection;

[assembly: FunctionsStartup(typeof(API_EFCore_AzureFunctions.Startup))] // Indication of a startup class used to run tje function app start.

 namespace API_EFCore_AzureFunctions
{
   public class Startup : FunctionsStartup // Integrates injection's dependency 
   {
        public override void Configure(IFunctionsHostBuilder builder)// Configuration retrives the sql connection.
        {
            string connectionString = "Data Source=Server Name;Integrated   Security=true;Database=Database Name";
            builder.Services.AddDataBaseContext<AppDataBaseContext>(
                options => SqlServerDataBaseContextOptionsExtensions.UseSqlServer(options, connectionString));
        }
   }
}

```
The code shows how we can set up dependency injection in the app function, where we will use the function startup attribute on the assembly to indicate a class that will run the function app starts.

### Injecting the DbContext into a Function
Because of dependency injection, we can now declare our functions in classes with dependencies injected into their constructors. First, open the `Function1.cs` file to inject our dependencies.

We will open our function, as shown below.

```c#
#region Property
private readonly AppDataBaseContext _appDataBaseContext;
#endregion

#region Constructor
public Function one (AppDataBaseContext appDataBaseContext)
{
    _appDataBaseContext = appDataBaseContext;
}
#endregion

```
We will use the above code to inject the class dependency.

### Implementing the Functions
In the example below, we will use five functions in the implementation of the functions:
1. `CreateEmployee` - saves the employee information into a database.
2. `GetEmployees` - gets a list of all the employees from the database.
3. `GetEmployeebyId` - gets the Employee record using their employee ID.
4. `UpdateEmployee` - updates the employee information in the database.
5. `DeleteEmployee` - deletes records of an employee in the database. 

#### 1. CreateEmployee
```c#
#region Create Employee
       
  [FunctionName("CreateEmployee")] // Here we create a new function employee
    public async Task<IActionResult> CreateEmployee(
    [HttpTrigger(AuthorizationLevel.Anonymous, "save", Route = Route +"/Uplode")]
         HttpRequest req, ILogger log)
        {

           log.LogInformation("How we can get a new  employee list"); //Saves employee information in the database
           variable requestBody = await new StreamReader(req.Body).ReadToEndAsy();
           variable input = JsonConvert.DeserializeObject<Employee>(requestBody);
           variable employee = new Employee
            {

             Name = input.Name, Designation = input.Designation,City= input.City 
                   };
                       await _appDataBaseContext.Employee.AddAsync(employee);
                       await _appDataBaseContext.SaveChangesAsync();
                       return new OkObjectResult(new
            {
                    Message = "Sucessfull ,our record is saved", Data = employee
                   });
       }
       #endregion
       
```
The above code adds new employee into the database created.

#### 2. GetEmployee

```c#
#region Function Get Employees
       
        [FunctionName("All employees are got")]
        public async Task<IActionResult> GetEmployees(
        [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = null)]
          HttpRequest req, ILogger log)
        {
            try //This checks for any exceptions that may occur.
              {
                log.LogInformation("Getting Employee list items");
                return new OkObjectResult(await _appDataBaseContext.Employee.ToListAsync());
                }
            catch (System.Exception) // Handles any exceptions that may occur.
              {
                throw;
            }

        }
        #endregion
```

The line with the code `[FunctionName("GetAllEmployee")]` is used to add a name for the function attribute

The line code `[public async Task<IActionResult> GetAllEmployees]` is used in defining a function's method

The line code `[HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = null)]` is used as an attribute Property for HTTP Trigger

- **Authorization Level:** Authorization keys secure your HTTP trigger an Azure Function. There are three types of authorization levels.
- **Anonymous:** No key is required
- **Function:** You will need a special function key. If no value is supplied, this is the default.
- **Admin:** You will need a master key.

- **Route:** It specifies the route template for endpoint. `API/FunctionName>` is the default value for the route.
- **Method:** This is where the HTTP verbs for the functions are defined.

```c#
 {
     try
       {
          log.LogInformation("Getting Employee list items");
           return new OkObjectResult(await _appDataBaseContext.Employee.ToListAsync());
            }
            catch (System.Exception)
         {
                throw;
     }
            
```

The above code, part of the `getEmployee` function, adds a try-catch block to manage exceptions and retrieves all Employee information from the database.

#### 3. GetEmloyeebyld

```c#
#region Get Employee Based on Employee Id
       // Get employees by querying with their ID
       
       [FunctionName("GetEmployeebyId")]
       public async Task<IActionResult> GetEmployeebyId(
       [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "{Id}")]
         HttpRequest req, ILogger log, int Id)
       {
           try // This checks for any exceptions that may occur.
           {
               var result = await _appDataBaseContext.Employee.FindAsync(Id);
               if (result is null)
               {
                   log.LogInformation($"Item {Id} not found");
                   return new NotFoundResult();
               }
               return new OkObjectResult(result);
           }
           catch (System.Exception) // Handles any exceptions that may occur.
           {
               throw;
           }
       }
       #endregion
```
The code snippet above gets the records of any employee based on their id.

#### 4. UpdateEmployee
```c#
#region Update Employee
  // Updates the employee data changes and modifications.
  
    [FunctionName("UpdateEmployee")]
    public async Task<IActionResult> UpdateEmployee(
    [HttpTrigger(AuthorizationLevel.Anonymous, "put", Route = Route +"/Update")]
        HttpRequest req, ILogger log)
      {
       log.LogInformation("Updating a new employee list item"); // Updates any changes of the employee.
       variable requestBody = await new StreamReader(req.Body).ReadToEndAsync();
       variable updated = JsonConvert.DeserializeObject<Employee>(requestBody);
       variable employee = await _appDataBasbContext.Employee.FindAsync(updated.Id);
          if(employee is null)
        {
           log.LogError($"Item {updated.Id} not found"); // If the employee is empty, we get an error message.
             return new NotFoundResult();
          }
         if(!string.IsNullOrEmpty(updated.Name) && !string.IsNullOrEmpty(updated.Designation)) // An update is assigned if the employee's data is empty.
          {
           employee.Name = updated.Name; employee.Designation = updated.Designation;
              employee.Town = updated.Town;
          }
          _appDataBaseContext.Employee.Update(employee);
          await _appDataBaseContext.SaveChangesAsync();
          return new OkObjectResult(new { Message = "Successful, the record was updated", Data = employee });
      }
      #endregion
```
The code snippet above updates the employee details.

#### 5. DeleteEmployee

```c#
#region Delete Employee
       // Deletion of the employee record from the database.
       
        [FunctionName("DeleteEmployee")]
        public async Task<IActionResult> DeleteEmployee(
        [HttpTrigger(AuthorizationLevel.Anonymous, "delete", Route = "DeleteEmployee/{Id}")]
          HttpRequest req, ILogger log,int Id)
        {
            log.LogInformation("The new employee list item update");
            var employee = await _appDataBaseContext.Employee.FindAsync(Id);
            if (employee is null)
            {
                log.LogError($"Item {Id} not found");
                return new NotFoundResult();
            }
            _appDataBaseContext.Employee.Remove(employee); // Removes the record from the database.
            await _appDataBaseContext.SaveChangesAsync();
            return new OkObjectResult("Deleted, our record deleted successfully");
        }
        #endregion
```
The code snippet above deletes the employee details from the database.

Finally, we were able to implement all of the code changes. First, run the application and check that all of the methods in Postman are working as intended. Azure Functions uses the Storage emulator to get responses on the terminal.

### Conclusion
This tutorial covered how to develop Serverless APIs using Azure Functions and integrate with the database using Entity Framework Core Dependency Injection.

---
Peer Review Contributions by: [Odhiambo Paul](/engineering-education/authors/odhiambo-paul)
