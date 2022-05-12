---
layout: engineering-education
status: publish
published: true
url: /building-a-crud-api-dapper-aspnet-core/
title: Building a CRUD API with the Dapper ORM in ASP.NET Core
description: In this article, we will be learning about how to build a CRUD API with Dapper and ASP.NET Core
author: olumide-nwosu
date: 2021-12-15T00:00:00-04:15
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/building-a-crud-api-dapper-aspnet-core/hero.png
    alt: Building a CRUD API with the Dapper ORM in ASP.NET Core
---

ORM stands for Object Relational Mapper(ORM). It could also stand for Object Relational Mapping, which describes the method that ORMs apply. 
<!--more-->
An ORM is usually a library that makes interacting with our database easy. It acts as a spokesman between us and our database. 

ORMs employ [abstraction](https://en.wikipedia.org/wiki/Abstraction_computer_science) to ‘mask’ the unwanted details and focus on the essential and basic functionalities. After abstraction, our data is then broken into smaller parts referred to as [models](https://en.wikipedia.org/wiki/Database_model). 

In this article, we'll learn how to build an API using [Dapper](https://dapper-tutorial.net/) to make queries.

### Key Takeaways
  At the end of this article, you should be able to:
- Know what ORMs are and how they work
- Create an ASP.NET Core API project with the dotnet CLI
- Able to make queries with the Dapper ORM
- Document an ASP.NET core API with Swagger.


### Prerequisites
- Basic knowledge of C#
- [.NET Framework 5.0+](https://dotnet.microsoft.com/download) installed on your machine
- A code editor of your choice. I use [Visual Studio Code](https://code.visualstudio.com/download)
- [Postman](https://www.postman.com/downloads/) or any REST Client installed on your machine

### Table of Contents
- [What is Dapper?](#what-is-dapper)
- [Creating a new ASP.NET Core API project](#creating-a-new-aspnet-core-api-project)
- [Setting Up Our Database](#setting-up-our-database)
- [Configuring Dapper](#configuring-dapper)
- [Adding our App Logic(Models and Repositories)](#adding-our-app-logicmodels-and-repositories)
- [Adding Our Controllers](#adding-our-controllers)
- [Testing The Endpoints](#testing-the-endpoints)
- [Bonus: Documenting Our API](#bonus-documenting-our-api)
- [Conclusion](#conclusion)

### What is Dapper?
Dapper is an ORM for the .NET framework. It is lightweight, fast and since you get to write your SQL own queries, it provides a lot of flexibility. Dapper provides methods that make it easy to communicate with our database. Some of the methods are:

1. **Execute**: this method executes a command and returns the affected rows. It's usually used to perform INSERT, UPDATE, and DELETE operations.

2. **Query**: this method executes a query and maps the result. It is usually used to fetch multiple objects from the database.

3. **QueryFirst**: this method executes a query and maps the first result that matches the parameters in the query. This is used when we need just one item that matches the provided specifications.

4. **QueryFirstOrDefault**: this functions like `QueryFirst` but returns a default value if the sequence contains no elements.

5. **QuerySingle**: it executes a query and maps the result provided that there is only one item in the sequence. If there is not exactly one element in the sequence, it throws an exception when no element or more than one element is returned.

6. **QuerySingleOrDefault**: this method works like `QuerySingle` but returns a default value if no item is returned from the database.

7. **QueryMultiple**: this method can execute many queries simultaneously with one command and map results.

For more information on Dapper ORM methods visit [Dapper docs](https://dapper-tutorial.net/).

### Creating a new ASP.NET Core API project
After installing the Dotnet Framework SDK, go ahead to your console and type the command below to confirm that it is in fact, installed:

```bash
 $ dotnet --version
 5.0.301
```
If you have the framework installed, you should see the version of your SDK just below your command. If you don't, download it from [here](https://dotnet.microsoft.com/download). 

After making sure we have the SDK installed, we can create our project. Since we'll be building an API, we'll use the command for creating an API project. To do this, open a terminal or command prompt and navigate to the directory in which you'd like your project to be created. Now enter the command below:

```bash
 $ dotnet new webapi -n TodoAPI
```
The `n` flag just tells dotnet what we want to call our app. This should create a new starter project for our API. Navigate into the project folder and type the following command:

```bash
 $ dotnet run
```

It should start our server on the port shown. This is usually `5000`. When you open this project in your preferred editor, you'll see that a controller has been defined in `Controllers/WeatherForecastController.cs`. 

To test this controller, open your REST client or browser and enter the link `http://localhost:5000/WeatherForecast`. You should see the data that was returned from that controller.

### Setting Up Our Database
The first thing we want to do here is add our connection string to our `appsettings.json` file. Like so:

 ```json
 "ConnectionStrings": {
    "SqlConnection": "your_connection_string"
  }
 ```
After that, we'll need to install a database client. For this article, we'll be using the SQL client. You can install that by doing:

```bash
  $ dotnet add package Microsoft.Data.SqlClient
```

The next thing is to handle migrations. This will require some external help as Dapper cannot do this for us. To create the necessary tables, we'll be using FluentMigrator. To install it, run the following command at the root of your project:

```bash
  $ dotnet add package FluentMigrator
```
We also need FluentMigrator's runner to help run migrations. Similarly, run:
```bash
  $ dotnet add package FluentMigrator.Runner
```

Now that we have FluentMigrator installed, we can set up our migrations. Create a `Migrations` folder at the root of your project and add the following files to it.

```C#
using FluentMigrator;

namespace TodoAPI.Migrations
{
    [Migration(202125100001)]
    public class Initial_202125100001 : Migration
    {
        // Drop the tables
        public override void Down()
        {
            Delete.Table("Todos");
            Delete.Table("Users");
        }

        // Create the tables
        public override void Up()
        {
            Create.Table("Users")
                .WithColumn("Id").AsGuid().NotNullable().PrimaryKey()
                .WithColumn("Firstname").AsString(50).NotNullable()
                .WithColumn("Lastname").AsString(60).NotNullable()
                .WithColumn("Email").AsString(50).NotNullable();

            Create.Table("Todos")
                .WithColumn("Id").AsGuid().NotNullable().PrimaryKey()
                .WithColumn("Title").AsString(50).NotNullable()
                .WithColumn("Status").AsString(10).NotNullable()
                .WithColumn("Description").AsString().NotNullable()
                .WithColumn("UserId").AsGuid().NotNullable().ForeignKey("Users", "Id");
        }
    }
}
```
```C#
using System;
using System.Collections.Generic;
using FluentMigrator;
using TodoAPI.Domain.Entities;

namespace TodoAPI.Migrations
{
    [Migration(202125100002)]
    public class Seed_202125100002 : Migration
    {
        public override void Down()
        {
            Delete.FromTable("Users");
            Delete.FromTable("Todos");
        }

        public override void Up()
        {
            List<Guid> ids = new List<Guid>{};
            List<String> names = new List<String>{"Mike", "Olumide", "Precious", "Marv", "Toyo", "Satoshi", "Ichinose", "Vanitas"};
            List<String> titles = new List<String>{"Title X", "Titte Y", "Title Z", "Title A", "Title 0"};
            for (int i = 0; i < 6; i++)
            {
                Random rnd = new Random();
                String lastname = names[rnd.Next(names.Count)];
                String firstname = names[rnd.Next(names.Count)];
                Guid id = Guid.NewGuid();
                ids.Add(id);
                Insert.IntoTable("Users")
                    .Row(new User{
                        Firstname = firstname,
                        Lastname = lastname,
                        Email = String.Format("{0}{1}@email.co", firstname, lastname),
                        Id = id
                    });

                for (int j = 0; j < 5; j++)
                {
                    Insert.IntoTable("Todos")
                        .Row(new TodoItem{
                            Title = titles[rnd.Next(titles.Count)],
                            Description = "Some pretty long string",
                            Status = (TodoStatus)rnd.Next(3),
                            UserId = id,
                            Id = Guid.NewGuid()
                        });
                }
            }
        }
    }
}
```

One migration creates the tables that we need, and the other provides us with seed data so that we have data to work within our database. 

"But how do we run the migrations?", one might ask. Well, that's where FluentMigrator's runner comes in. So let's create an extension that runs our migrations just before our app is run.

Create a new folder `Extensions` and add the file below to it:

```C#
using System;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using FluentMigrator.Runner;

namespace TodoAPI.Extensions
{
    public static class MigrationManager
    {
        public static IHost MigrateDatabase(this IHost host)
        {
            using (var scope = host.Services.CreateScope())
            {
                var migrationService = scope.ServiceProvider.GetRequiredService<IMigrationRunner>();
                try
                {
                    migrationService.ListMigrations();
                    migrationService.MigrateUp();
                }
                catch (Exception e)
                {
                    Console.WriteLine(e.Message);
                    throw;
                }
            }
            return host;
        }
    }
}
```
The extension above adds an external method to the `IHost` class. This makes it possible for the `MigrateDatabase` method to be called whenever this extension is 'used' on any instantiation of the `IHost` class. Learn more about extension methods [here](https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/classes-and-structs/extension-methods).

To make sure that this is called, head over to `Program.cs` and alter the code as shown below:
```C#
    public static void Main(string[] args)
    {
        CreateHostBuilder(args)
            .Build()
            .MigrateDatabase() // Add this line
            .Run();
    }
```
As shown above, the migrations are run just as the app is being built and before it's run. There are a few things we need to add to our `Startup.cs` file as well.

```C#
    public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllers();

            // Add this
            services.AddLogging(c => c.AddFluentMigratorConsole())
            .AddFluentMigratorCore()
            .ConfigureRunner(c => c.AddSqlServer2016()
              .WithGlobalConnectionString(Configuration.GetConnectionString("SqlConnection"))
              .ScanIn(Assembly.GetExecutingAssembly()).For.Migrations());
        }
```

The snippet above configures FluentMigrator and adds logging for it. This allows us to visualise the migrations in the console. The code above also adds configuration for our SQL server.

After doing this, start your app by running `dotnet run` and the migration should be run just before the app starts. If you encounter any errors, try to retrace your steps to find the root of the problem.

### Configuring Dapper
Next, let's configure up Dapper. To install dapper run the following command:
```bash
 $ dotnet add package Dapper
```
After installing Dapper, create a folder `Data` and in it, add the file below:

```C#
using System.Data;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;

namespace TodoAPI.Data
{
    public class DapperContext
    {
        private readonly IConfiguration _configuration;
        public DapperContext(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        public IDbConnection CreateConnection()
            => new SqlConnection(_configuration.GetConnectionString("SqlConnection"));
    }
}
```

The class above is responsible for creating a connection to our database. Dapper is then used to communicate to our database using that connection. Don't forget to register this class as a service. 

Head over to `Startup.cs` and add the line as shown below:
```C#
    public void ConfigureServices(IServiceCollection services)
        {
            services.AddSingleton<DapperContext>(); // Add this line to register the service
            services.AddControllers();
        }
```
### Adding our App Logic(Models & Repositories)
First, create a new folder, `Domain`. In this new folder create three folders namely: `Entities`, `Repositories` and `DTOs`.

In the `Entities` folder is where we will define our models. Go ahead and add the following files:

```C#
using System;
using System.ComponentModel.DataAnnotations;

namespace TodoAPI.Domain.Entities
{
    public class User
    {
        [Key]
        public Guid Id { get; set; }

        [Required]
        public String Firstname { get; set; }

        [Required]
        public String Lastname { get; set; }

        [Required]
        public String Email { get; set; }
    }
}
```

```C#
using System;
using System.ComponentModel.DataAnnotations;

namespace TodoAPI.Domain.Entities
{
    public class TodoItem
    {
        [Key]
        public Guid Id { get; set; }

        [Required]
        public Guid UserId { get; set; }

        [Required]
        public String Title { get; set; }

        [Required]
        public String Description { get; set; }

        public TodoStatus Status { get; set; } = TodoStatus.Todo;
    }
}
 ```

```C#
 namespace TodoAPI.Domain.Entities
{
    public enum TodoStatus
    {
        Done,
        InProgress,
        Todo
    }
}
 ```
Next, add our Data Transfer Objects(DTOs). These will make exchanging data between requests, controllers and repositories easier and tidier.

```C#
using System;
using System.ComponentModel.DataAnnotations;

using TodoAPI.Domain.Entities;

namespace TodoAPI.DTOs
{
    public class CreateTodoDTO
    {
        [Required]
        public Guid UserId { get; set; }

        [Required]
        public String Title { get; set; }

        [Required]
        public String Description { get; set; }
    }

    public class UpdateTodoDTO
    {
        [Required]
        public String Title { get; set; }

        [Required]
        public String Description { get; set; }

        public TodoStatus Status { get; set; }
    }
}
```
In the `Domain/Repositories/` folder, add the following files:

 ```C#
using System.Collections.Generic;
using System.Threading.Tasks;
using TodoAPI.DTOs;
using TodoAPI.Domain.Entities;
using System;

namespace TodoAPI.Domain.Repositories
{
    public interface ITodoRepository
    {
        public Task Create(CreateTodoDTO createTodoDTO, Guid userId);

        public Task<IEnumerable<TodoItem>> GetAll();

        public Task<TodoItem> GetById(Guid id);

        public Task<IEnumerable<TodoItem>> GetByUser(Guid id);

        public Task Update(UpdateTodoDTO projectDTO, Guid id);

        public Task Delete(Guid id);
    }
}
```

```C#
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using TodoAPI.Domain.Entities;

namespace TodoAPI.Domain.Repositories
{
    public interface IUserRepository
    {
        public Task<IEnumerable<User>> GetAll();

        public Task<User> GetById(Guid id);
    }
}
```

These are the methods that will communicate directly with our databases with the help of Dapper. Our actual repository classes will inherit from these interfaces.

Now create a folder `Repositories` in your `Data` folder. In this folder, we will add our repositories. These classes will implement the interfaces we added earlier in the `Domain/Repositories/` folder. This ensures that we use the correct methods to communicate with our database. This folder will house the following files:

```C#
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TodoAPI.DTOs;
using TodoAPI.Domain.Entities;
using TodoAPI.Domain.Repositories;
using System;
using Dapper;
using System.Data;

namespace TodoAPI.Data.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly DapperContext _context;
        public UserRepository(DapperContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<User>> GetAll()
        {
            string sqlQuery = "SELECT * FROM Users";
            using(var connection = _context.CreateConnection())
            {
                var users = await connection.QueryAsync<User>(sqlQuery);
                return users.ToList();
            }
        }

        public async Task<User> GetById(Guid id)
        {
            string sqlQuery = "SELECT * FROM Users WHERE Id = @Id";
            using (var connection = _context.CreateConnection())
            {
                return await connection.QuerySingleAsync<User>(sqlQuery, new { Id = id });
            }
        }
    }
}
```

```C#
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TodoAPI.DTOs;
using TodoAPI.Domain.Entities;
using TodoAPI.Domain.Repositories;
using System;
using Dapper;
using System.Data;

namespace TodoAPI.Data.Repositories
{
    public class TodoRepository : ITodoRepository
    {
        private readonly DapperContext _context;
        public TodoRepository(DapperContext context)
        {
            _context = context;
        }

        public async Task Create(CreateTodoDTO createTodoDTO, Guid userId)
        {
            string sqlQuery = "INSERT into Todos (UserId, Title, Description, Id, Status) values (@UserId, @Title, @Description, @Id, @Status)";
            var parameters = new DynamicParameters();
            parameters.Add("Title", createTodoDTO.Title, DbType.String);
            parameters.Add("UserId", createTodoDTO.UserId, DbType.Guid);
            parameters.Add("Description", createTodoDTO.Description, DbType.String);
            parameters.Add("Status", TodoStatus.Todo, DbType.String);
            parameters.Add("Id", Guid.NewGuid(), DbType.Guid);
            Console.WriteLine(TodoStatus.Todo);
            using (var connection = _context.CreateConnection())
            {
                var r = await connection.ExecuteAsync(sqlQuery, parameters);
                Console.Write(r);
            }
        }

        public async Task<IEnumerable<TodoItem>> GetAll()
        {
            string sqlQuery = "SELECT * FROM Todos";
            using (var connection = _context.CreateConnection())
            {
                var todos = await connection.QueryAsync<TodoItem>(sqlQuery);
                return todos.ToList();
            }
        }

        public async Task<TodoItem> GetById(Guid id)
        {
            string sqlQuery = "SELECT * FROM Todos WHERE Id = @Id";
            using (var connection = _context.CreateConnection())
            {
                var todo = await connection.QuerySingleAsync<TodoItem>(sqlQuery, new { Id = id });
                return todo;
            }
        }

        public async Task<IEnumerable<TodoItem>> GetByUser(Guid id)
        {
            string sqlQuery = "SELECT * FROM Todos WHERE UserId = @UserId";
            using (var connection = _context.CreateConnection())
            {
                IEnumerable<TodoItem> todos = await connection.QueryAsync<TodoItem>(sqlQuery, new { UserId = id });
                return todos;
            }
        }

        public async Task Update(UpdateTodoDTO updateTodoDTO, Guid id)
        {
            string sqlQuery = "UPDATE Todos SET Title = @Title, Status = @Status, Description = @Description WHERE Id = @Id";
            var parameters = new DynamicParameters();
            parameters.Add("Title", updateTodoDTO.Title, DbType.String);
            parameters.Add("Status", updateTodoDTO.Status, DbType.String);
            parameters.Add("Description", updateTodoDTO.Description, DbType.String);
            parameters.Add("Id", id, DbType.Guid);
            using (var connection = _context.CreateConnection())
            {
                await connection.ExecuteAsync(sqlQuery, parameters);
            }
        }

        public async Task Delete(Guid id)
        {
            string query = "DELETE FROM Todos WHERE Id = @Id";

			using (var connection = _context.CreateConnection())
			{
				await connection.ExecuteAsync(query, new { Id = id });
            }

        }
    }
}
```

`Domain/Repositories/TodoRepository.cs` as shown above, has six and rightly so, given that the interface it implements has the same number of methods.

Taking the `Create` method above:
```C#
    public async Task Create(CreateTodoDTO createTodoDTO, Guid userId)
        {
            string sqlQuery = "INSERT into Todos (UserId, Title, Description, Id, Status) values (@UserId, @Title, @Description, @Id, @Status)"; // SQL query that we want to execute with dapper
            var parameters = new DynamicParameters();
            parameters.Add("Title", createTodoDTO.Title, DbType.String);
            parameters.Add("UserId", createTodoDTO.UserId, DbType.Guid);
            parameters.Add("Description", createTodoDTO.Description, DbType.String);
            parameters.Add("Status", TodoStatus.Todo, DbType.String);
            parameters.Add("Id", Guid.NewGuid(), DbType.Guid);
            using (var connection = _context.CreateConnection())
            {
                await connection.ExecuteAsync(sqlQuery, parameters);
            }
        }
```

The `GetAll` method works similarly to the `Create` method but uses the `connection.QueryAsync<TodoItem>()` method. This queries all the items and maps them to `TodoItem` objects.

`GetById` uses `connection.QuerySingleAsync<TodoItem>()` since the ID property is unique. As stated earlier in this article, it throws an error if more than one element is found.

`GetByUser` will fetch all the items with their `UserId` to be the same as the UserId in the query parameters. Like `GetAll` uses `connection.QueryAsync<TodoItem>()` as we want to fetch multiple items.

The `Update` and `Delete` methods work similarly to the `Create`. They also use the `connection.ExecuteAsync()` method as they do not need any data returned.

### Adding Our Controllers
In the `Controllers` folder, add the following files:
```C#
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using TodoAPI.Data.Repositories;
using TodoAPI.Domain.Repositories;
using TodoAPI.DTOs;

namespace TodoAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TodosController : ControllerBase
    {
        private readonly ILogger<TodosController> _logger;
        private readonly ITodoRepository _todosRepository;

        public TodosController(ILogger<TodosController> logger, ITodoRepository todosRepository)
        {
            _logger = logger;
            _todosRepository = todosRepository;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            try
            {
                 var Data = await _todosRepository.GetAll();
                return Ok(new {
                    Success = true,
                    Message = "All todo items returned.",
                    Data
                });
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return StatusCode(500, ex.Message);
            }
        }

        [HttpGet]
        [Route("{todoId}")]
        public async Task<IActionResult> GetById(Guid todoId)
        {
            try
            {
                var todo = await _todosRepository.GetById(todoId);
                if(todo == null) return NotFound();
                return Ok(new {
                    success = true,
                    message = "One todo item returned.",
                    data = todo
                });
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return StatusCode(500, ex.Message);
            }
        }

        [HttpGet]
        [Route("users/{userId}")]
        public async Task<IActionResult> GetByUserId(Guid userId)
        {
            try
            {
                var Data = await _todosRepository.GetByUser(userId);
                return Ok(new {
                    Success = true,
                    Message = "Todo items returned.",
                    Data
                });
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPost]
        public async Task<IActionResult> Create(CreateTodoDTO createTodoDTO, Guid userId)
        {
            try
            {
                await _todosRepository.Create(createTodoDTO, userId);
                return Ok(new {
                    Success = true,
                    Message = "Todo item created."
                });
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPatch]
        [Route("{todoId}")]
        public async Task<IActionResult> Update(UpdateTodoDTO updateTodoDTO, Guid todoId)
        {
            try
            {
                await _todosRepository.Update(updateTodoDTO, todoId);
                return Ok(new {
                    Success = true,
                    Message = "Todo item updated."
                });
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return StatusCode(500, ex.Message);
            }
        }

        [HttpDelete]
        [Route("{todoId}")]
        public async Task<IActionResult> Delete(Guid todoId)
        {
            try
            {
                await _todosRepository.Delete(todoId);
                return Ok(new {
                    Success = true,
                    Message = "Todo deleted."
                });
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return StatusCode(500, ex.Message);
            }
        }
    }
}
```

```C#
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using TodoAPI.Data.Repositories;
using TodoAPI.Domain.Repositories;

namespace TodoAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UsersController : ControllerBase // 1
    {
        private readonly ILogger<UsersController> _logger;
        private readonly IUserRepository _userRepository;

        public UsersController(ILogger<UsersController> logger, IUserRepository userRepository) //2
        {
            _logger = logger;
            _userRepository = userRepository;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            try
            {
                var Data = await _userRepository.GetAll();
                return Ok(new {
                    Success = true,
                    Message = "all users returned.",
                    Data
                });
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return StatusCode(500, ex.Message);
            }
        }

        [HttpGet] //3
        [Route("{userId}")] //4
        public async Task<IActionResult> GetById(Guid userId) //5
        {
            try
            {
                var Data = await _userRepository.GetById(userId); //6
                return Ok(new { //7
                    Success = true,
                    Message = "User fetched.",
                    Data
                });
            }
            catch (Exception ex) //8
            {
                Console.WriteLine(ex.Message);
                return StatusCode(500, ex.Message);
            }
        }
    }
}
```

The files above are responsible for getting data from and responding to our requests. With the help of the DTOs that we defined earlier, the exchange of data between the entities is made seamless. 

Using the `UsersController` class above for reference, comment #1 is where our class is defined. It inherits from the `ControllerBase` class as seen above. ASP.NET is quite smart. It takes the letters before 'Controller' and maps the methods to their respective endpoints. In the case of `UsersController`, it maps the methods to the `users` route.

At #2, this is where our dependencies are injected. This is possible because the dependencies have earlier been registered as services.

Looking at the `GetById`, comment #3 denotes the method that this method accepts. It is a `GET` method.

#4 tells our method what route we want it to answer to. In some cases like this one, we could also pass data in the route as parameters. `userId` is the parameter we're expecting in this case.

By #5, the required data `userId` has been parsed from the route.

#6 is where we use `_userRepository`, which we injected earlier at #2, to communicate with the database.

#7 is where we return the data fetched as a response with a code of 200. It's a 200 response because it is wrapped with `Ok()`. Learn more about dotnet API responses [here](https://docs.microsoft.com/en-us/dotnet/api/system.web.http.apicontroller?view=aspnetcore-2.2#methods). If any error is encountered, it is caught at #8 and returned as an error message with a status code of 500.

### Testing The Endpoints
Now let's start our app and test with Postman.
#### User Endpoints
**[GET] /users** - Gets all users

![get users](/engineering-education/building-a-crud-api-dapper-aspnet-core/get-users.png)

**[GET] /users/{user_id}** - Gets user by ID. We'll test this with one user’s ID from the result returned above.

![get user](/engineering-education/building-a-crud-api-dapper-aspnet-core/get-user.png)

#### Todos Endpoints
**[GET] /todos** - Gets all todo items

![get todos](/engineering-education/building-a-crud-api-dapper-aspnet-core/get-todos.png)

**[POST] /todos** - Creates a new todo item

![create todo](/engineering-education/building-a-crud-api-dapper-aspnet-core/create-todo.png)

**[GET] /todos/{todo_id}** - Gets todo item by ID. For this, we'll use the ID of the newly created item which was returned from the `[POST] /todos` endpoint above. This tests our get-by-ID endpoint and also confirms that the todo item was indeed added to the database.

![get todo](/engineering-education/building-a-crud-api-dapper-aspnet-core/get-todo.png)

**[GET] /todos/users/{user_id}** - Gets todo items by user ID

![get todos by user](/engineering-education/building-a-crud-api-dapper-aspnet-core/get-todos-user.png)

**[PATCH] /todos** - Updates a todo item

![update todo](/engineering-education/building-a-crud-api-dapper-aspnet-core/update-todo.png)

Let's try to get the item again to make sure it was updated appropriately.

![get todo after update](/engineering-education/building-a-crud-api-dapper-aspnet-core/get-after-update.png)

Sure enough, the fields were indeed updated as we can see above.

**[DELETE] /todos** - Deletes a todo item

![delete todo](/engineering-education/building-a-crud-api-dapper-aspnet-core/delete-todo.png)

We will then try to get that item we just deleted.

![get todo after delete](/engineering-education/building-a-crud-api-dapper-aspnet-core/get-after-delete.png)

We can see that the endpoint returns a `404(Not Found)` error which indicates that our item could not be found, and that is exactly what we want.

### Bonus: Documenting Our API
For the ASP.NET Core 5, there is built-in support for OpenAPI and Swagger UI. All you have to do is navigate to `/swagger`. You should see something similar to the image below:

![swagger docs](/engineering-education/building-a-crud-api-dapper-aspnet-core/swagger.png)

### Conclusion
This article introduced you to Object Relational Mappers(ORMs) and how they work. More specifically, it explains what Dapper is and why you want to use it. 

We also learned first-hand how to integrate Dapper into an ASP.NET Core API. As a bonus, we saw how to generate the Swagger Docs for our API. 

The complete code is available on [GitHub](https://github.com/olumidayy/Dapper-ASP.NET-Core-TodoAPI). Feel free to add more features or contribute!

---
Peer Review Contributions by: [Odhiambo Paul](/engineering-education/authors/odhiambo-paul/)
