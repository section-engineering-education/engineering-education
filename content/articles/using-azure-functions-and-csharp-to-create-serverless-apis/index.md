Azure functions is a cloud-native design strategy that allows a piece of code to be supplied and executed without needing a web server or server infrastructure settings.
C#, Java, JavaScript, TypeScript, and Python are just a few languages that can use Azure functions.

This article explains what Azure Functions are and how to utilize them in the C# programming language.

### Introduction
Azure Functions is a serverless computing platform that simplifies the execution of small amounts of code or functions in the cloud. As a result, it improves the efficiency of our development. Only the code required for the task at hand is written, with no consideration for the rest of the program or the infrastructure needed to operate it.

###  Utilizing Azure functions have the following advantage

- Azure functions are simple and do not require a server.
- Writing and deploying Azure functions is a lot easier.
- The execution of Azure functions is initiated when an event occurs.
- Azure functions don't require any infrastructure and don't require any upkeep.
- Using the Azure interface and a browser, we can create, test, and deploy Azure functions.
- Upgrades to Azure functions are simple and have no impact on other elements of the website.
- Azure functions interface with other APIs, databases, and libraries using industry standards.
- Because no huge application, startup time, initialization, or other activities occur before the code is executed, Azure functions are quick to execute.
- Because Azure functions are compute-on-demand, they scale up when the number of requests for execution increases and scale down when the number of requests decreases.



### Table of contents


- [How to set up Azure Function ](#how-to-set-up-azure-function)

- [Entity Model and Database schema](#entity-model-and-database-schema)

- [Setting up the Connection with SQL Database by using EF Core](#setting-up-the-connection-with-sql-database-by-using-ef-core) 

- [Initialize Dependency Injection](#initialize-dependency-injection)

- [Injecting the DbContext into a function](#injecting-the-dbcontext-into-a-function)

- [Implementing the Functions](#implementing-the-functions)

- [Testing the APIs using Postman](#testing-the-apis-using-postman)

### How to set up Azure Function
To build up Azure Functions, we use Visual Studio. In Visual Studio, we'll open the Blazor app and start a new project. Then, on the project template page, look for the Azure function to get a template for Azure functions.

`See below`

![Output of the setup](engineering-education/using-azure-functions-and-c#-to-create-serverless-apis/create.png)

Click Next after selecting the Azure Functions template.
You will need to name your functional applications and choose a location for the Visual Studio project to operate.

`see below`

![This what you will see](engineering-education/using-azure-functions-and-c#-to-create-serverless-apis/configure.jng)

The image below depicts the numerous triggers available in Visual Studio for an Azure function app.


![Trigger of the Visual Studio](engineering-education/using-azure-functions-and-c#-to-create-serverless-apis/app.jng)
 
Each trigger, as we can see, has a distinct role.
We will utilize the HTTP trigger, which fires anytime an HTTP request is sent. 
We shall create our app by clicking on the create button.


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
Every trigger in the code above prompts the function to run. A function will only have one trigger and has a single purpose. When we initiate an HTTP request, the HTTP trigger will execute, causing our function to run.
Output:

![This is the output](engineering-education/using-azure-functions-and-c#-to-create-serverless-apis/core.jng)

### Entity Model and Database schema

A database schema represents the logical setup of all or part of a relational database. It can be represented visually or as a series of formulas called `integrity constraints` that control a database. 

Integrity constraints are mechanisms that limit a database's potential states. For example, if we consider a database employee, we do not want two rows for the same person. Therefore, employee ID must be unique across all rows in the table employee, according to the integrity constraint.

The term `entity data model` refers to concepts that define data structure regardless of how it is stored. This model describes data structure using three essential concepts: entity type, association type, and property. A set of primitive data types that specify attributes in a conceptual model are supported by EDM.

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

This is what we get ; 

![output of the setup](engineering-education/using-azure-functions-and-c#-to-create-serverless-apis/B13.png)

Create a folder and name it My_Model. Inside the folder, create a class named Employee- Entity Model. You can use few properties to make your implementation easier.

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

After that, we will have to add the DatabaseContext class to our project. This allows us to use the application to access the Database tables generated by our Model.

 We will need to create an AppDatabaseContext class to define our DatabaseContext.

Below is the App DatabaseContext:

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

### Setting up the Connection with SQL Database by using EF Core


To get the Nuget package, in the `Solution Explorer`, you need to right-click either `Reference` or a project and then select Manage NuGet packages.

We will need the following packages to use the Db first approach to connect to a SQL Database using EF Core.

As shown below, we will install the desired data using the Nuget Package Manager or the Package Manager console.

![output of the setup](engineering-education/using-azure-functions-and-c#-to-create-serverless-apis/manage.png)

Packages from the selected source will be displayed in the browse tab. Search for specific packages that should be used using the search box. The install button, as well as the version selection dropdown, should be enabled.

### Initialize Dependency Injection

To set up dependency injection for our function app, we use the Assembly's FunctionsStartup feature to define a starter class that will run when the function app starts. In that class, which is derived from Functions Startup, we override the Configure function.

By registering a DbContext in the services, we can obtain the SQL connection string from the configuration and inject the AppDbContext into our method. Create a class called Startup. cs to include Dependency Injection.

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
The code shows how we can set up injection dependency in the app function, where we will use the function startup attribute on the assembly to indicate a class that will run the function app starts.

### Injecting the DbContext into a Function
Because of dependency injection, we can now declare our functions in classes with dependencies injected into their constructors because of dependency injection. First, open the Function1.cs file to inject our dependencies.

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
We will use the above code to inject the dependency that allows us to create our functions in the class that we have a dependency to inject in the constructor.

### Implementing the Functions

In the example below, we will use five functions in the implementation of the functions:

1. `CreateEmployee:`Enter the employee information into a database.
2. `GetEmployees:`Get a list of all the employees from the database.
3. `GetEmployeebyId:`Get the Employee record using their employee ID.
4. `UpdateEmployee:`Changes should be made to the existing employee.
5. `DeleteEmployee:`  This will delete records of an employee in the database. 

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
The above code explains how we add information of our new employee we want to use in the database created.

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
In the output ;

The line with the code `[FunctionName("GetAllEmployee")]` is used to add a name for the function attribute

The line code `[public async Task<IActionResult> GetAllEmployees]` is used in defining a function's method

The line code `[HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = null)]` is used as an attribute Property for HTTP Trigger

- Authorization Level; Authorization keys secure your HTTP trigger an Azure Function. There are three types of authorization levels.
1. Anonymous: No key is required
2. Function: You will need a special function key. If no value is supplied, this is the default.
3. Admin: You will need a master key.

- Route It specifies the route template that the endpoint listens for. API/FunctionName> is the default value for the route.
- Method This is where the HTTP verbs for the functions are defined.

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

The above code, which is part of the get employee main code above adds a try-catch block to manage exceptions and retrieves all Employee information from the database.

#### 3. GetEmloyeebyld

Below is an example ;

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
We will use the code above to get the records or information of any employee based on their specific ids.
It also has a try-catch block to handle any exceptions that may occur.

#### 4. UpdateEmployee

Let us look at the example below ;
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
In the code above, we will use it when updating the existing employee with the modification we want to make.

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
We will use the example of the code above to delete an employee record from the database whenever we want.


Finally, we were able to implement all of the code changes. First, run the application and check that all of the methods in Postman are working as intended. Because Azure Functions uses the Storage emulator to get responses inside the terminal, Azure will load all of our functions in the terminal after starting the application.


### Testing the APIs using Postman

In testing, we will create the employee first using the CreateEmployee API using Postman. 
We will get the request body from the HTTP Trigger, attaching it to the Employee model class for deserialization, and then provide the Employee object to the database in the CreateEmployee Function. Then fetch the list of employee from our GetEmployee API.


The function UpdateEmployee API is used to update an existing record, and the Employee Id field is required in this object. We get an existing record from the database and update it with a new object based on the Id.
You can delete the record from the database by giving the EmployeeId as a Query Parameter in the route.

### Conclusion
This tutorial covered how to develop Serverless APIs using Azure Functions and integrate with the database using Entity Framework Core Dependency Injection.

