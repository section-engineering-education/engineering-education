---
layout: engineering-education
status: publish
published: true
url: /dockerizing-an-aspnet-core-web-api-app-and-sql-server/
title: Dockerizing an ASP.NET Core Web API App and SQL Server
description: This guide will discuss how to configure ASP.NET core applications and SQL server 2019 to run on a Docker container.
author: lewel-murithi
date: 2021-12-07T00:00:00-12:00
topics: [Containers]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/dockerizing-an-aspnet-core-web-api-app-and-sql-server/hero.jpg
    alt: Dockerizing an ASP.NET Core Web API app and SQL Server Hero Image
---
Microsoft developed an open-source and cross-platform framework that replaces the old classic ASP.NET called ASP.NET Core. 
<!--more-->
The framework is known for building modern, cloud-based, and internet-connected web applications and services. 

Organizations can decide whether to deploy the application on-premise or in cloud environments. 

Docker is the technology that allows developers to deploy and run containers. It provides the application with a complete runtime environment, such as the operating system and system libraries, to run smoothly and independently.

With the combination of containers and ASP.NET Core which is cloud-friendly, it is easy to run high-performance `.NET` services in the cloud.

This tutorial will discuss how to configure ASP.NET Core application and SQL Server 2019 to run on a Docker container. 

To achieve this functionaity, we will build a movie listing application using ASP.NET Core and SQL Server 2019.

### Table of contents
- [Introduction](#introduction)
- [Prerequisites](#prerequisites)
- [Setting up the SQL server Docker image](#setting-up-the-sql-server-docker-image)
- [Creating CRUD operations in an ASP.NET Core application](#creating-crud-operations-in-an-aspnet-core-application)
- [Setting up Docker Compose for the project](#setting-up-docker-compose-for-the-project)
- [Wrapping up](#wrapping-up)
- [Further reading](#further-reading)

### Prerequisites
To follow along with this tutorial, you need to have:
1. [Docker](https://www.docker.com/products/docker-desktop) for desktop installed.
2. The latest [SQL Server Management Studio](docs.microsoft.com/en-us/sql/ssms/download-sql-server-management-studio-ssms?view=sql-server-ver15) installed.
3. [Visual Studio 2019](https://visualstudio.microsoft.com/downloads/) installed.
4. Proficiency in [Docker commands](https://docs.docker.com/engine/reference/commandline/docker/), [SQL Server commands](https://www.edureka.co/blog/sql-commands), and [ASP.NET Core](https://docs.microsoft.com/en-us/aspnet/core/introduction-to-aspnet-core?view=aspnetcore-6.0) language.

### Setting up the SQL Server Docker image
We will start by pulling the latest SQL Server 2019 container image by executing the command below in the terminal:

```bash
$ docker pull mcr.microsoft.com/mssql/server:2019-latest
```

Next, we will proceed to run our Docker container using the following command:

```bash
$ docker run -e "ACCEPT_EULA=Y" -e "SA_PASSWORD=2Secure*Password2" -p 1450:1433 --name sqlserverdb -h mysqlserver -d mcr.microsoft.com/mssql/server:2019-latest
```

The command above contains the following:
- `--name`: This is the name of our container in our case, `sqlserverdb`.
- We have set the password for our SQL Server as `2Secure*Password2`. The password must be strong enough and meet the minimum password requirements.
- `-p 1450:1433`: These are the ports that we are exposing.

The Docker container is now up and running.

#### SQL Server connection using SSMS
Here, we will use the SQL Server Management Studio tool to connect our SQL Server running in a Docker container.

To achieve this, we are going to input the details below in the SSMS connection window:
- We will give our server the name `localhost, 1450`. One can opt to use a different IP address depending on the configuration. In our case, we have used `localhost` and `1433` as the port we configured.
- For the SQL Server configuration login, we have used `SA` and password as `2Secure*Password2`.

Afterwards, we click on the `Connect` button. It will ensure that we have connected with the SQL Server that is already running in our Docker container:

![ssms connect](/engineering-education/dockerizing-an-aspnet-core-web-api-app-and-sql-server/ssms-connect.png)

Once the connection is established, we can interact with the database.

### Creating CRUD operations in an ASP.NET Core application
We will start by launching Visual Studio. Then, we select `ASP.NET Core Web App (Model-View-Controller)` template as shown below:

![new ASP project](/engineering-education/dockerizing-an-aspnet-core-web-api-app-and-sql-server/new-asp-proj.png)

Next, we name our ASP.NET Core application as `DockerSqlAsp`. Ensure that you do not tick the checkbox under the name `Place solution and project in the same directory`, as shown below:

![project name](/engineering-education/dockerizing-an-aspnet-core-web-api-app-and-sql-server/aspproj-name.png)

Then, click `next` as we continue to configure our new project. At this stage we will not tick the `Enable Docker Support` checkbox. We will click on the`create` button, as shown below:

![disable docker option](/engineering-education/dockerizing-an-aspnet-core-web-api-app-and-sql-server/disable-docker.png)

#### Creating the database using Entity Framework Core
In this section, we will create a new database and name it `FilmDB` in the SQL Server running in our Docker container. 

We will only have one table named `Film`, where we will perform CRUD operations from the ASP.NET Core application. 

[EF Core](https://docs.microsoft.com/en-us/ef/core/) will handle these operations.

The frontend ASP.NET Core application will interact with our backend SQL Server database that is running on the Docker, as shown below:

![asp sql interaction](/engineering-education/dockerizing-an-aspnet-core-web-api-app-and-sql-server/asp-sql.png)

Before we start coding our application, we have to ensure that the `NuGet` packages below have been installed:

```c#
Microsoft.EntityFrameworkCore.Design
Microsoft.EntityFrameworkCore.Tools
Microsoft.EntityFrameworkCore.SqlServer
```

Next, we will create a new class named `Film.cs` inside the `Models` directory and paste the code below:

```c#
using System.ComponentModel.DataAnnotations;

namespace DockerSqlAsp.Models {
    public class Film
    {
        [Required]
        public string ReleaseYear { get; set; }

        [Required]
        [Key]
        public int No { get; set; }

        [Required]
        [StringLength(50, ErrorMessage = "Movie name cannot exceed 50 characters.")]
        public string MovieName { get; set; }
    }
}
```

Afterwards, we will create a class that will act as our [database context](https://docs.microsoft.com/en-us/dotnet/api/system.data.entity.dbcontext?view=entity-framework-6.2.0) for EF Core in the same directory and name it `FilmContext.cs`. 

Then, we need to paste the following code in the file:

```c#
using Microsoft.EntityFrameworkCore;

namespace DockerSqlAsp.Models {
    public class FilmContext : DbContext {
        public FilmContext(DbContextOptions<FilmContext> opt_Db) : base(opt_Db) {
        }
        public DbSet<Film> Film { get; set; }
    }
}
```

#### Setting up a controller
Since we are done with our models, we can create a file called `FileController.cs` inside the `Controllers` directory. 

Here, we will define the action methods required to perform [CRUD](https://stackify.com/what-are-crud-operations/) operations in our application as shown below:

```c#
using System.Threading.Tasks;
using DockerSqlAsp.Models;
using Microsoft.AspNetCore.Mvc;
using System.Linq;

namespace DockerSqlAsp.Controllers {
    public class FilmController : Controller {
        private FilmContext ctx;
        public FilmController(FilmContext fctx) {
            ctx = fctx;
        }

        public IActionResult AddNew() {
            return View();
        }

        [HttpPost]
        public async Task<IActionResult> Rem(int id) {
            var del = ctx.Film.Where(b => b.No == id).FirstOrDefault();
            ctx.Remove(del);
            await ctx.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        [HttpPost]
        public async Task<IActionResult> Modify(Film flm) {
            if (ModelState.IsValid)
            {
                ctx.Update(flm);
                await ctx.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            else
                return View(flm);
        }

        [HttpPost]
        public async Task<IActionResult> AddNew(Film flm) {
            if (ModelState.IsValid) {
                ctx.Add(flm);
                await ctx.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            else
                return View();
        }
        public IActionResult Modify(int id) {
            var del = ctx.Film.Where(b => b.No == id).FirstOrDefault();
            return View(del);
        }
        public IActionResult Index() {
            var flm = ctx.Film.ToList();
            return View(flm);
        }
    }
}
```

#### Creating the user interface views
Since we are done with our controller, it's time to create our views for the application. 

Inside the **Views/Home** directory, we will create three files and name them `AddNew.cshtml`, `Modify.cshtml`, and `Index.cshtml`. These views will act as the user interface for our application.

We start by coding `AddNew.cshtml`, as shown below:

```c#
@model Film

@{
    ViewData["Title"] = "Add a New Movie";
}

<h1 class="bg-info text-white">Add a New Movie</h1>
<a class="btn btn-block btn-success" asp-action="Index">Show all Movies</a>

<div class="text-danger" asp-validation-summary="All"></div>

<form enctype="application/x-www-form-urlencoded" method="post">
    <div>
        <label>Movie Name</label>
        <input class="form-control-range" asp-for="MovieName" type="text" />
        <label>Release Year</label>
        <input class="form-control-range" asp-for="ReleaseYear" type="text" /><br />
        <input class="btn btn-secondary" value="Add New" type="submit" />
    </div>
</form>
```

Next, we code the file `Modify.cshtml`, as demonstrated below:

```c#
@model Film

@{
    ViewData["Title"] = "Modify a Movie";
}

<h1 class="bg-info text-white">Modify a Movie</h1>
<a class="btn btn-block btn-success" asp-action="Index">Show all Movies</a>

<form method="post" enctype="multipart/form-data">
    <div class="form-group">
        <label asp-for="No">No.</label>
        <input class="form-control-range" type="text" asp-for="No" readonly />
    </div>
    <div class="form-group">
        <label asp-for="MovieName">Movie Name</label>
        <input class="form-control-range" type="text" asp-for="MovieName" />
    </div>
    <div class="form-group">
        <label asp-for="ReleaseYear">Release Year</label>
        <input class="form-control-range" type="text" asp-for="ReleaseYear" />
    </div>
    <button class="btn btn-secondary" type="submit">Modify a movie</button>
</form>
```

Finally, we code the file `Index.cshtml` as illustrated below:

```c#
@model List<Film>

@{
    ViewData["Title"] = "Movies Release Years";
}

<h1 class="bg-info text-white">Movies Release Years</h1>
<a class="btn btn-block btn-success" asp-action="AddNew">Add a New Movie</a>
<div>
    <table class="table">
        <tr>
            <th>S#</th>
            <th>Movie Name</th>
            <th>Release Year</th>
            <th>Action</th>
            <th>Action</th>
        </tr>
        @foreach (Film flm in Model)
        {
            <tr>
                <td>@flm.No</td>
                <td>@flm.MovieName</td>
                <td>@flm.ReleaseYear</td>
                <td>
                    <a asp-route-id="@flm.No" class="btn btn-block btn-dark" asp-action="Modify">Edit</a>
                </td>
                <td>
                    <form asp-route-id="@flm.No" method="post" asp-action="Rem">
                        <input class="btn-warning btn btn-block" value=”Remove” type="submit" />
                    </form>
                </td>
            </tr>
        }
    </table>
</div>
```

#### Performing EF Core migrations
We will first locate and open the file `appsettings.json` in the project solution explorer. We will create a connection string that will connect our frontend application to the SQL Server database. 

The file will appear as highlighted below:

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Initial Catalog=FilmDB; Data Source=localhost,1450; Persist Security Info=True;User ID=SA;Password= 2Secure*Password2"
  }
}
```

> The data source property represents the SQL Server address and the port running on the Docker container. The Initial Catalog value represents the database name.

It is possible to change the DataSource field to the internal IP address of the machine we are using.

Next, we will navigate to the file `Startup.cs` to add the database context as a service in the `ConfigureServices` method:

```c#
public void ConfigureServices(IServiceCollection config_serv)
{
    config_serv.AddDbContext<FilmContext>(filmOpt =>
       filmOpt.UseSqlServer(Configuration.GetConnectionString("DefaultConnection")));
    config_serv.AddControllersWithViews();
}
```

We also need to execute EF Core migration commands. To achieve this, we will navigate to the package manager console window in Visual Studio and run the following commands:

```bash
$ add-migration Migration1
$ database-update
```

The above commands will generate a database with `FilmDB` on the SQL Server already running in the container.

#### Testing the application functionality
We can now proceed and test our application as we try out the CRUD operations. 

We will run our ASP.NET Core application in Visual Studio. Then we click on `Add a New Movie` button, fill in the required details, and click on the `Add New` button. 

A `new movie` record will be inserted as follows:

![add new movie](/engineering-education/dockerizing-an-aspnet-core-web-api-app-and-sql-server/add-new-movie.png)

![new movie](/engineering-education/dockerizing-an-aspnet-core-web-api-app-and-sql-server/new-movie.png)

Next, we can click on the `Edit` button and test the application. The expected results are shown below:

![edit the movie](/engineering-education/dockerizing-an-aspnet-core-web-api-app-and-sql-server/edit-movie-btn.png)

![modify movie](/engineering-education/dockerizing-an-aspnet-core-web-api-app-and-sql-server/modify-movie.png)

Afterwards, we can click on the `Remove` button to delete the record:

![delete movie](/engineering-education/dockerizing-an-aspnet-core-web-api-app-and-sql-server/delete-movie.png)

As we have seen above, our application is working as expected; we have performed CRUD operations.

### Setting up Docker Compose for the project
Next, we will run the ASP.NET Core application and SQL Server 2019 inside the Docker containers using [Docker Compose](https://docs.docker.com/compose/).

We will start by right-clicking on the ASP.NET project name in the Visual Studio solution explorer and choose the container orchestration support option:

![container orchestrator](/engineering-education/dockerizing-an-aspnet-core-web-api-app-and-sql-server/container-orchestrator.png)

In the popup window that appears, we will select the `Docker Compose` option:

![docker compose](/engineering-education/dockerizing-an-aspnet-core-web-api-app-and-sql-server/docker-compose.png)

In the next window that appears, we will set the target operating system as Linux:

![target os](/engineering-education/dockerizing-an-aspnet-core-web-api-app-and-sql-server/target-os.png)

A new project with the name `docker-compose` will be created.

Afterwards, we will locate the Docker Compose configuration file with the name `docker-compose.yml`. This file is located in the new project directory. We will edit the file to add a new service name called `sqldb`.

We will then specify the docker image that we previously downloaded, set the password, and the ports:

```yml
sqldb:
  image: mcr.microsoft.com/mssql/server:2019-latest
  environment:
    - SA_PASSWORD=2Secure*Password2
    - ACCEPT_EULA=Y
  ports:
    - "1440:1433"
```

We should take note of the ports. For this section, we will set a different port for the SQL server than the previous. This is because we will use a different SQL Server.

Next, we will migrate the database again by running the EF Core migration commands.

Once, we save the `docker-compose` configuration file, Docker will create two containers, one for ASP.NET Core application and the other for running SQL Server:

![ASP SQL Container interactions](/engineering-education/dockerizing-an-aspnet-core-web-api-app-and-sql-server/aspsql-cont.png)

Then, we edit our connection string again located in the file `appsettings.json`.  It will assist in accommodating the new SQL Server achieved through editing the port back to `1450`.

```json
{
  "ConnectionStrings": {
    "DefaultConnection": " Initial Catalog=FilmDB; Data Source=sqldb; Persist Security Info=True;User ID=SA;Password=2Secure*Password2"
  }
}
```

Note that we have provided the DataSource value as `sqldb` instead of `localhost, 1440`. This is because `sqldb` is our current service name for the SQL Server in the `docker-compose` configuration file.

This makes it possible for containers to interact with each other using their names instead of IP addresses.

#### Running EF Core migrations
We will edit the database connection string again to use `localhost, 1440`, instead of `sqldb`. 

The main reason is that EF core needs to be aware of the database the migrations are being performed. 

The modified connection string would appear as shown below:

```json
{
  "ConnectionStrings": {
    "DefaultConnection": " Initial Catalog=FilmDB; Data Source=localhost,1440; Persist Security Info=True;User ID=SA;Password=2Secure*Password2"
  }
}
```

Next, in the package manager console window, we will execute the commands below:

```bash
$ add-migration Migration2
$ database-update
```

Once we have migrated the database successfully, we will edit the connection string back to the previous values that we had set:

```json
{
  "ConnectionStrings": {
    "DefaultConnection": " Initial Catalog=FilmDB; Data Source=sqldb; Persist Security Info=True;User ID=SA;Password=2Secure*Password2"
  }
}
```

It is better to remember that the SQL Server container needs to be running during the database migrations. 

If otherwise, then one should rebuild the solution in Visual Studio to ensure successful database migrations.

We will run the application in Visual Studio and retest the application by performing CRUD operations.

### Wrapping up
In this guide, we have learned how to create a Docker container for ASP.NET Core applications and SQL Servers. 

We have also used Docker Compose to run both containers simultaneously and perform CRUD operations.

We have been able to pull and use the SQL Server container image to run the SQL Server container. This is essential, especially for developers who do not intend to download and install SQL Server into their development environment. 

This makes the development easy and less time-consuming. The complete project files and code can be accessed at my [GitHub Repo](https://github.com/lewe01/DockerSqlAsp).

### Further reading
- [Getting Started with ASP.NET models and model contexts](https://docs.microsoft.com/en-us/aspnet/mvc/overview/getting-started/getting-started-with-ef-using-mvc/creating-an-entity-framework-data-model-for-an-asp-net-mvc-application).
- [Understanding container orchestration](https://www.capitalone.com/tech/cloud/what-is-container-orchestration/).
- [Docker Compose in a nutshell](https://docs.docker.com/compose/).
- [Working with EF Core](https://docs.microsoft.com/en-us/ef/core/get-started/overview/first-app?tabs=netcore-cli).

---
Peer Review Contributions by: [Dawe Daniel](/engineering-education/authors/dawe-daniel/)