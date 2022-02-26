---
layout: engineering-education
status: publish
published: true
url: /building-model-using-code-first/
title: How to Build A Model using Code First Migration 
description: In this tutorial will walk through how to build a model using code first migration.
author: margaret-sitati 
date: 2022-02-26T00:00:00-02:45
topics: [Languages, C#]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/building-model-using-code-first/hero.PNG
    alt: How to Build A Model using Code First Migration Hero Image
---
There are 3 workflows when building a model in an EntityFramework. These include `database first`, `Code first`, and `model first`.
<!--more-->
**Database first workflow:** starts with the database. We design our tables using visual designers. The EntityFramework will then create the domain classes based on the database. 

**Code first workflow:** starts with the code. We create the domain classes. The Entity-Framework will then generate the database table for us. 

**Model first workflow:** utilizes a feature in visual studio called visual designer. The visual designer will model classes and their associations. It creates some kind of a UML diagram. Based on this diagram, the entity framework will generate domain classes for us.

In this article, we’ll learn how to build a domain model for our API using the `code first` workflow.

### Table of contents.
- [Prerequisites](#prerequisites)
- [Setting up the project](#setting-up-the-project)
- [Setting up the domain model](#domain-model-setup)
- [Adding new classes](#adding-new-classes)
    - [The best way to name migrations](#the-best-way-to-name-migrations)
    - [How to populate a database table with data using code-first](#how-to-populate-a-database-table-with-data-using-code-first)
- [Modifying an existing class](#modifying-an-existing-class)
    - [Adding a new property](#adding-a-new-property)
    - [Modifying an existing property](#modifying-an-existing-property)
    - [Deleting an existing property](#deleting-an-existing-property)  
    - [Ways one can override the conventions to change database tables in EF code first migration](#override-the-conventions-to-change-database-tables)
    - [Different Methods applied during modification](#different-methods-applied-during-modification)
- [Deleting an existing class](#deleting-an-existing-class)
- [Recover from mistakes](#recover-from-mistakes)

### Prerequisites
You will need the following to understand and build along:
1. [Visual Studio](https://visualstudio.microsoft.com/) installed.
2. [Sql Server Management Studio](https://docs.microsoft.com/en-us/sql/ssms/download-sql-server-management-studio-ssms?view=sql-server-ver15) installed.
3. An understanding of database relationship. 
4. A basic understanding of C# and .NET technology.

### Setting up the project
With `code first`, we start with the code. We won't go to the management studio to create a new database. Instead, we are going to create new classes also called the `domain model`. 

The domain model is actually classes and associations between them. After creating our domain model, we push it to the database. It is what forms the database tables.

In visual studio 2019, let's create our new API application.

1. Open visual studio 2019. Click on Create new Project.

![Image of Create Project](/engineering-education/building-model-using-code-first/CreateProject.PNG)

2. Select Asp.Net Core Web Application. Click on the Next button.

![Image of Asp.Net Core Web Application](/engineering-education/building-model-using-code-first/aspNetApplication.PNG)

3. We name the project `CodeFirstDemo`. Then click on `create` to create a new project. 

![Image of how to name the proect](/engineering-education/building-model-using-code-first/CodeirstDemo.PNG)

4. Select API. Ensure that you have selected ASP.NET Core 3.1 at the top right dropdown list. Click on create.

![Image of how to create an empty API project](/engineering-education/building-model-using-code-first/webApplication.PNG)

With this, we now have our API project. We now need to configure a few things in our new project. 
The first thing is our models and then push them to our database. We will be building a simple domain where students can purchase a course or courses. 

### Domain model setup
1. In visual studio, inside our API project, navigate to the solution explorer as shown.

![Image of Solution Explorer](/engineering-education/building-model-using-code-first/solutionExplorer.PNG)

2. Right-click on the project name, `CodeFirstDemo`. 

3. On the dropdown menu, navigate to `Add` and click on it. 

4. On the menu that appears, navigate to `New Folder` and click on it and name the folder `Models`. 

We will have four classes in our `Models` folder. These are, `Course.cs`, `Author.cs`, `Tag.cs` and `CourseLevel.cs`. The `CourseLevel` will be an enumeration. Let's have a closer look at each one. 

The `Course.cs` class has a few properties. These include the `Id`, `Title`, `Description`, `Level`, ` FullPrice`, `Author`(which is a navigation property), and a list of `Tags`. A course can have many tags. To create the class

1. Go to solution explorer, and find the `Models` folder then click on it.

![Image of `Models` folder](/engineering-education/building-model-using-code-firsts/model.PNG)

2. Navigate to `Add` on the dropdown list and click on `class`. 

![Image of how to navigate to the class](/engineering-education/building-model-using-code-first/class.PNG)

3. Name the class `Course. cs`. Click on `Add`. 

![Image of how to create course class](/engineering-education/building-model-using-code-first/courseclass.PNG)

We then add properties to our `Course.cs` class. Below is the code snippet of the `Course.cs` class. 

```c#
using System.Collections.Generic;

namespace CodeFirstDemo.Models

{
   public class Course

   {
       public int Id { get; set; }

       public string Title { get; set; }

       public string Description { get; set; }

       public CourseLevel Level { get; set; }

       public float FullPrice { get; set; }

       public Author Author { get; set; }

        public IList<CoursesTags> Tags { get; set; }

       public Course()

       {
           Tags = new List<CoursesTags>();
       }
   }
}
```

The `Author.cs` class has the following properties. `Id`, `Name`, and a list of `Courses`. We have a one-to-many relationship. This is between `Author` and `Course` classes. 

An author can have many courses. Each course is created by only one author. We add the `Author.cs` class in our `Models` folder. Here is the code for the author class. 

```c#
using System.Collections.Generic;

namespace CodeFirstDemo.Models

{

   public class Author

   {
       public int Id { get; set; }

       public string Name { get; set; }

       public IList<Course> Courses { get; set; }
   }

}
```

Let us take a look at the `Tag.cs` class. It has the following properties. `Id`, and `Name`. Between the `Tag` and the `Course` class, we have a many-to-many relationship. 

This means that a course can have many tags. A tag can also have many courses. entity framework core has a way of implementing the many-to-many relationship.

```c#
   public class Tag

   {

       public int Id { get; set; }

       public string Name { get; set; }

   }
```

#### Implement a many-to-many relationship in entityFramework-core
In Entity Framework 6, it was okay to have a many-to-many relationship between classes. Implementing our domain models the way we have done for the tag and course would have worked. EF-6 would have automatically created a mapping table for us. 

It sits between the courses and the tags tables called `CoursesTags`table. EF-Core on the other hand does not have many-to-many support. We have to create the mapping class manually. 

#### Creating the mapping class.
Instead of associating the `Tag` class to the `Course` class, we will associate it with the `CoursesTags` class. This will be like the mapping table in the database. 

A good database design will have a mapping table when there is a many-to-many relationship between tables. We will have to create the class in our domain model. Inside our `Models` folder, add a class called `CoursesTags.cs`. 

```c#
namespace CodeFirstDemo.Models

{

   public class CoursesTags

   {
       public int CourseId { get; set; }

       public int TagId { get; set; }

       public Course Course { get; set; }

       public Tag Tag { get; set; }
   }
}
```

The `CoursesTags.cs` class will have `CourseId` and `TagId` properties as [composite keys](https://en.wikipedia.org/wiki/Composite_key#:~:text=In%20database%20design%2C%20a%20composite,key%20in%20its%20own%20right). 

The `Course` and `Tag` properties are navigation properties, to implement composite key we will use fluent API. Which will implemented during the creation of our dbContext class. 

Let's look at our `CourseLevel.cs` enumeration, it has different course levels. 

```c#
   public enum CourseLevel

   {

       Beginner = 1,

       Intermediate = 2,

       Advanced = 3

   }
```

Our model creation is done, next we need to create a [DB context](https://www.entityframeworktutorial.net/entityframework6/dbcontext.aspx). This will enable us to push our models to the database.
 
#### Setup database connection
1. Open up the SQL server management studio. Click on the connect icon as shown below.

![Image of SQL server ](/engineering-education/building-model-using-code-first/sqlconnect.PNG)

2. From the above diagram, we see we have a server name. Ensure your server name is the same as the one above. Click on Connect. We are now connected to the database. We will be using the `(LocalDB)\MSSQLLocalDB` as our server name.

3. Switch back to Visual studio. Go to the solution explorer. We have the `appseting.json` file. It is in appsettings where we configure our application's external connections. We will put our database credentials. 

Open it. We will add `"ConnectionStrings"`parameter to the file as follows: 

```json
{

   "ConnectionStrings": {

     "DefaultConnection": "Server=(localdb)\\mssqllocaldb;Database=CodeFirst;Trusted_Connection=True;MultipleActiveResultSets=true"

   },

   "Logging": {

     "LogLevel": {

       "Default": "Information",

       "Microsoft": "Warning",

       "Microsoft.Hosting.Lifetime": "Information"

     }

   },

   "AllowedHosts": "*"

 }
```

With the above set up, the next thing we need is the `DBContext` class.  This class acts as an intermediary between our database and our application.

1. In the `CodeFirstDemo` project, go to solution Explorer.

2. Right-click on the project name `CodeFirstDemo`.

3. Navigate to `Add` and click on it.

4. Add a folder called `Data`.

5. Inside the `Data` folder, add a class called `ApplicationDbContext.cs`. Below is the code snippet for the class. 

```c#
using CodeFirstDemo.Models;

using Microsoft.EntityFrameworkCore;

namespace CodeFirstDemo.Data

{

   public class ApplicationDbContext : DbContext

   {

       public DbSet<Author> Authors { get; set; }

       public DbSet<Course> Courses { get; set; }

       public DbSet<Tag> Tags { get; set; }

       public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)

       {

       }

       protected override void OnModelCreating(ModelBuilder modelBuilder)

       {

           modelBuilder.Entity<CoursesTags>().HasKey(ct => new {ct.CourseId,ct.TagId });

       }

   }

}
```

The `ApplicationDbContext.cs` class inherits from the DbContext class. The Dbcontext class belongs to the `EntityFrameworkCore` namespace. 

Thus, we need to install the Entityramework core 3.1 NuGet package. 

1. Go to the `Tools` tab on the menu bar.

![image of  `Tools` tab](/engineering-education/building-model-using-code-first/tools.PNG)

2. Navigate to `Package Manager Console `.

3. Click on `Manage Nuget Package for Solution`. 

4. Ensure the `browse` tab is selected as shown in the image below.

![image of  `browse` tab](/engineering-education/building-model-using-code-first/Nuget.PNG)

5. Search for `entity framework core`. On the list that appears on the left side, select `Microsoft.EntityFrameworkCore`. On the right side of the page, ensure `CodeFirstDemo` is selected. The version should be `3.1.22`, then Click on install.

![image of  `How to install EntityFrameworkCore`](/engineering-education/building-model-using-code-first/nugetdetail.PNG)

Back to the `ApplicationDbContext.cs`class. Let us look at the `OnModelCreating()` method. This is where we implement the many-to-many relationship. We link the course class with the tag class via the coursetags class. It specifies that the key for the `CoursesTags` entity has two properties. That is `ct.CourseId` and `ct.TagId`.

A bunch of `dbsets` goes into our DbContext class as well. A `dbset` is a collection of objects that represents objects in the database.  

The constructor has a parameter called options. We will pass it to our base class. The options will contain the values of the connection string. The values are gotten from the `DefaultConnection` parameter in `appsettings.json` file.

To get the values, we call it from the `startup.cs` class. We thus need to configure our `Startup.cs` class to pick the value in the `appsettings.json` file. The startup class has the `ConfigureServices()` function. Inside the `ConfigureServices()`, is where we do the connection string configuration.

Here is the code. 

```c#
       public void ConfigureServices(IServiceCollection services)

       {

           services.AddDbContext<ApplicationDbContext>

               (options => options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection")));

           services.AddControllers();

       }
```

We are all set up. We now need to push our models to the database. 

### Push model to the database

1. Go to the `Tools` tab on the menu bar.

![Image of  `Tools` tab](/engineering-education/building-model-using-code-first/tools.PNG)

2. Navigate to `Package Manager Console `.

3. Click on `Manage Nuget Package for Solution`. 

4. On the browse tab, Search for `Microsoft.EntityFrameworkCore.Tools`. Install-Package, Microsoft.EntityFrameworkCore.Tools -Version 3.1.2

5. After installing the NuGet package, we go to the Tools tab again. Navigate to `Nuget package manager`. Click on `Package Manager Console`. This opens the package manager console window. 

![Image of  `Package Manager Console Window` tab](/engineering-education/building-model-using-code-first/package-console.PNG)

6.  In the console window, type the command `add-migration`. Click enter.

![Image of  `add-migration` tab](/engineering-education/building-model-using-code-first/add-migration.PNG)

7. Give it the name of `InitialModel`. Click enter.

![Image of naming migration](/engineering-education/building-model-using-code-first/add-migration.PNG)

The below class should be created and displayed.

```c#
using Microsoft.EntityFrameworkCore.Migrations;

namespace CodeFirstDemo.Migrations

{

   public partial class InitialMigration : Migration

   {

       protected override void Up(MigrationBuilder migrationBuilder)

       {

           migrationBuilder.CreateTable(

               name: "Authors",

               columns: table => new

               {

                   Id = table.Column<int>(nullable: false)

                       .Annotation("SqlServer:Identity", "1, 1"),

                   Name = table.Column<string>(nullable: true)

               },

               constraints: table =>

               {

                   table.PrimaryKey("PK_Authors", x => x.Id);

               });

           migrationBuilder.CreateTable(

               name: "Tags",

               columns: table => new

               {

                   Id = table.Column<int>(nullable: false)

                       .Annotation("SqlServer:Identity", "1, 1"),

                   Name = table.Column<string>(nullable: true)

               },

               constraints: table =>

               {

                   table.PrimaryKey("PK_Tags", x => x.Id);

               });

           migrationBuilder.CreateTable(

               name: "Courses",

               columns: table => new

               {

                   Id = table.Column<int>(nullable: false)

                       .Annotation("SqlServer:Identity", "1, 1"),

                   Title = table.Column<string>(nullable: true),

                   Description = table.Column<string>(nullable: true),

                   Level = table.Column<int>(nullable: false),

                   FullPrice = table.Column<float>(nullable: false),

                   AuthorId = table.Column<int>(nullable: true),

                   TagId = table.Column<int>(nullable: true)

               },

               constraints: table =>

               {

                   table.PrimaryKey("PK_Courses", x => x.Id);

                   table.ForeignKey(

                       name: "FK_Courses_Authors_AuthorId",

                       column: x => x.AuthorId,

                       principalTable: "Authors",

                       principalColumn: "Id",

                       onDelete: ReferentialAction.Restrict);

                   table.ForeignKey(

                       name: "FK_Courses_Tags_TagId",

                       column: x => x.TagId,

                       principalTable: "Tags",

                       principalColumn: "Id",

                       onDelete: ReferentialAction.Restrict);

               });

           migrationBuilder.CreateTable(

               name: "CoursesTags",

               columns: table => new

               {

                   CourseId = table.Column<int>(nullable: false),

                   TagId = table.Column<int>(nullable: false)

               },

               constraints: table =>

               {

                   table.PrimaryKey("PK_CoursesTags", x => new { x.CourseId, x.TagId });

                   table.ForeignKey(

                       name: "FK_CoursesTags_Courses_CourseId",

                       column: x => x.CourseId,

                       principalTable: "Courses",

                       principalColumn: "Id",

                       onDelete: ReferentialAction.Cascade);

                   table.ForeignKey(

                       name: "FK_CoursesTags_Tags_TagId",

                       column: x => x.TagId,

                       principalTable: "Tags",

                       principalColumn: "Id",

                       onDelete: ReferentialAction.Cascade);

               });

           migrationBuilder.CreateIndex(

               name: "IX_Courses_AuthorId",

               table: "Courses",

               column: "AuthorId");

           migrationBuilder.CreateIndex(

               name: "IX_Courses_TagId",

               table: "Courses",

               column: "TagId");

           migrationBuilder.CreateIndex(

               name: "IX_CoursesTags_TagId",

               table: "CoursesTags",

               column: "TagId");

       }

       protected override void Down(MigrationBuilder migrationBuilder)

       {

           migrationBuilder.DropTable(

               name: "CoursesTags");

           migrationBuilder.DropTable(

               name: "Courses");

           migrationBuilder.DropTable(

               name: "Authors");

           migrationBuilder.DropTable(

               name: "Tags");

       }

   }

}
```

Let us look at the migration. The `Create column` will create a database table with its associated columns, `CreateIndex` will create indexes for us so that look-up in each table is fast. 

The intermediate table between the courses and the tags table has also been created. The primary key for the `CoursesTags` table, ` x.CourseId `, `x.TagId` are the composite keys. We also have two foreign keys, one to the tags table the other to the courses table. 

The Entity Framework is smart enough, it determines how your database should look based on your model.

With this, let us run this migration on the database.

1. Back to the package manager console window, write the command `update-database`. Click on Enter. 

2. Open SQL server management and connect.

3. Expand on the database. You will see the `CodeFirst` database as shown below:

![CodeFirst Database Tables](/engineering-education/building-model-using-code-first/db.PNG) 

### Adding new classes
In visual studio, we are going to create a new class called `Category.cs`. We will assign each course to a category. E.g. web development, mobile development, programming language, etc. 

Inside our `Models` folder, we create a new class called `Category.cs`. This class will have the properties, `Id` and `Name`. The `Id` will be the primary key. 
When naming the primary key, we have two choices.

The first option is to use the `Id` property. The second option is use the name of class plus Id. e.g. `Category_Id`. These two are the conventions that `EF-Core` understands. 

Sometimes, one may want to use another property as your primary key and not follow the above convention. In this case, we can always override the conventions. We will discuss this later on. For now, let us keep it simple. Below is the code for the category class.

```c#
namespace CodeFirstDemo.Models

{

   public class Category

   {

       public int Id { get; set; }

       public string Name { get; set; }

   }

}
```

We now have two options:
1. Create a migration that creates a category table. Or 
2. Continue modifying our model by adding a property of type `Category` to the course class. 

This is to create a one-to-many relationship between the tables. We then run our migration. It will create both the category table and add the category column to the courses table. 

We shall go with the first option. Note, on the first option. We have done a small change to our model and run our migration. It is much safer to work with small changes. Thus, we will add a migration that creates a category table first. 

1. Open `Package manager console`.

2. Add a migration. While adding a migration we do give it a name. There are two ways of doing this. The first is giving your migration a `model-centric` name like `AddCategory`. 
 
The other method is giving your migration a `database centric` name like `AddCategoriesTable`. The recommended one is the `database-centric` name.

#### The best way to name migrations
Why `database-centric` name? This is because most migrations are for modifying database objects. These objects do not have a representation in your model. For example, you may want to create a trigger or modify a stored procedure or a view. These objects do not have a representation in your model. They are database objects. 

We will give our migration a `database-centric` name. In Package manager console, type `add-migration AddCategoriesTable`. Press Enter. 

![image of database-centric naming ](/engineering-education/building-model-using-code-first/AddCategories.PNG)

Taking a look at the migration, we see it is empty. Why is that? This is because this class is not discoverable. We created this class in our application, but nowhere have we referenced it. EF-Core cannot find it. We can make this class discoverable by adding it to our dbContext class.

1. On solution Explorer, navigate to the `Data` folder.

2. Open the `ApplicationDbContext.cs` class. This is where we will introduce our category dbset. Below is the code. 

```c#
using CodeFirstDemo.Models;

using Microsoft.EntityFrameworkCore;

namespace CodeFirstDemo.Data

{

   public class ApplicationDbContext : DbContext

   {

       public DbSet<Author> Authors { get; set; }

       public DbSet<Course> Courses { get; set; }

       public DbSet<Tag> Tags { get; set; }

       public DbSet<Category> Categories { get; set; }

       public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)

       {

       }

       protected override void OnModelCreating(ModelBuilder modelBuilder)

       {

           modelBuilder.Entity<CoursesTags>().HasKey(ct => new {ct.CourseId,ct.TagId });

       }

   }

}

```

3. Back to the package manager console, we re-do the migration. We already have a migration by the name `AddCategoriesTable`. We will first remove it. We type `Remove-Migration` to undo. Click on Enter. The migration is removed.

4. Type `add-migration AddCategoriesTable`. Press Enter.  The migration created the class below.

```c#
using Microsoft.EntityFrameworkCore.Migrations;

namespace CodeFirstDemo.Migrations

{

   public partial class AddCategoriesTable : Migration

   {

       protected override void Up(MigrationBuilder migrationBuilder)

       {

           migrationBuilder.CreateTable(

               name: "Categories",

               columns: table => new

               {

                   Id = table.Column<int>(nullable: false)

                       .Annotation("SqlServer:Identity", "1, 1"),

                   Name = table.Column<string>(nullable: true)

               },

               constraints: table =>

               {

                   table.PrimaryKey("PK_Categories", x => x.Id);

               });

       }

       protected override void Down(MigrationBuilder migrationBuilder)

       {

           migrationBuilder.DropTable(
```

The migration created a table called `Categories` with two columns. These are `Id` and `Name`. The `Id` is the primary key. Before we proceed to update our database,let us look at a scenario. 

### How to populate a database table with data using code-first
At times we may want to populate a table with some data. We do this by using the `Sql() ` method. With this method, you can run any sql query in your database. 

In this case, we may want to use it to populate data in our categories table. Below is the code implementation. 

```c#
using Microsoft.EntityFrameworkCore.Migrations;

namespace CodeFirstDemo.Migrations

{

   public partial class AddCategoriesTable : Migration

   {

       protected override void Up(MigrationBuilder migrationBuilder)

       {

           migrationBuilder.CreateTable(

               name: "Categories",

               columns: table => new

               {

                   Id = table.Column<int>(nullable: false)

                       .Annotation("SqlServer:Identity", "1, 1"),

                   Name = table.Column<string>(nullable: true)

               },

               constraints: table =>

               {

                   table.PrimaryKey("PK_Categories", x => x.Id);

               } );

           migrationBuilder.Sql("INSERT INTO Categories VALUES ('Web Development')");

           migrationBuilder.Sql("INSERT INTO Categories VALUES ('Programing Language')");

       }

       protected override void Down(MigrationBuilder migrationBuilder)

       {

           migrationBuilder.DropTable(

               name: "Categories");

       }

   }

}
```

5. Back to package manager console, type `update-database`. Click Enter. When the update is complete, go to the database. Taking a look at the database, the `Categories` table has been created. Right-click on it. 
 
Navigate to `Select Top 1000 rows` and click on it, you can see the two categories created in the image below. 

![CodeFirst Database Table](/engineering-education/building-model-using-code-first/categoriesdb.PNG) 

The next step is to change the Course class and add a category property there:
1. Back to the visual studio, open the `Courses.cs` class. 

2. Add a new property of type `Category` and name it `Category`.

```c#
using System.Collections.Generic;

namespace CodeFirstDemo.Models

{

   public class Course

   {

       public int Id { get; set; }

       public string Title { get; set; }

       public string Description { get; set; }

       public CourseLevel Level { get; set; }

       public Category Category { get; set; }

       public float FullPrice { get; set; }

       public Author Author { get; set; }

       public IList<CoursesTags> Tags { get; set; }

       public Course()

       {

           Tags = new List<CoursesTags>();

       }

   }

}
```

5. Remember to always make small change and migration. We will use a database-centric name. 
 
Back to package manager console, type `add-migration AddCategoryColoumnToCoursesTable`, and Click enter. Below is the code for the migration. 

```c#
using Microsoft.EntityFrameworkCore.Migrations;

namespace CodeFirstDemo.Migrations

{

   public partial class AddCategoryColoumnToCoursesTable : Migration

   {

       protected override void Up(MigrationBuilder migrationBuilder)

       {

           migrationBuilder.AddColumn<int>(

               name: "CategoryId",

               table: "Courses",

               nullable: true);

           migrationBuilder.CreateIndex(

               name: "IX_Courses_CategoryId",

               table: "Courses",

               column: "CategoryId");

           migrationBuilder.AddForeignKey(

               name: "FK_Courses_Categories_CategoryId",

               table: "Courses",

               column: "CategoryId",

               principalTable: "Categories",

               principalColumn: "Id",

               onDelete: ReferentialAction.Restrict);

       }

       protected override void Down(MigrationBuilder migrationBuilder)

       {

           migrationBuilder.DropForeignKey(

               name: "FK_Courses_Categories_CategoryId",

               table: "Courses");

           migrationBuilder.DropIndex(

               name: "IX_Courses_CategoryId",

               table: "Courses");

           migrationBuilder.DropColumn(

               name: "CategoryId",

               table: "Courses");

       }

   }

}
```

The migration has created a new column in the courses table with the name `CategoryId`. The type of the column is an integer. It has also created an index on the column. This is because we are most likely going to look up courses by given category. Thus, the look up will be fast.

Finally, a foreign key has been created on the courses table. The `CategoryId` column points to the Categories table, `Id` column. 

We can also use the `Sql()` method to populate categories for existing courses. This is just to say that with code first migration, we have full control of the database. 

6. In package manager console, type `update-database`. Click Enter.

### Modifying an existing class
We shall look at three kinds of modifications. First, `Adding a new property`. Second, `Modifying an existing property`. Third `Deleting an existing property ` in a class.  

#### Adding a new property.
In our course class, we are going to add a new property. It will be nullable DateTime property called `DatePublished`. 

```c#
using System;

using System.Collections.Generic;

namespace CodeFirstDemo.Models

{

   public class Course

   {

       public int Id { get; set; }

       public string Title { get; set; }

       public string Description { get; set; }

       public CourseLevel Level { get; set; }

       public Category Category { get; set; }

       public float FullPrice { get; set; }

       public Author Author { get; set; }

       public DateTime? DatePublished { get; set; }

       public IList<CoursesTags> Tags { get; set; }

       public Course()

       {

           Tags = new List<CoursesTags>();

       }

   }
```

Next, we will add a migration, giving it a database-centric name. On package manager console, run  `add-migration AddDatePublishedColoumnToCoursesTable`. Remember we always run a small change and a small migration. 

```c#
using System;

using Microsoft.EntityFrameworkCore.Migrations;

namespace CodeFirstDemo.Migrations

{

   public partial class AddDatePublishedColoumnToCoursesTable : Migration

   {

       protected override void Up(MigrationBuilder migrationBuilder)

       {

           migrationBuilder.AddColumn<DateTime>(

               name: "DatePublished",

               table: "Courses",

               nullable: true);

       }

       protected override void Down(MigrationBuilder migrationBuilder)

       {

           migrationBuilder.DropColumn(

               name: "DatePublished",

               table: "Courses");

       }

   }

}
```

Looking at our migration, we have created a new column in our course's table and is a nullable type of DateTime. We can go ahead and run our migration to update the database. 

In the package manager console, run `update-database`. 

Let's take a look at our courses table in the database. A new column has been created as shown in the diagram below.

![CodeFirst DatePublished Coloumn](/engineering-education/building-model-using-code-first/DatePublished.PNG) 

#### Modifying an existing property
Let us take a look at the second modification scenario. We shall change the `Title` column in the database to `Name`.

In the Course class, to rename the `Title` property, highlight it. Press `F2` and rename  `Title` to `Name`. 

```c#
using System.Collections.Generic;

namespace CodeFirstDemo.Models

{

   public class Course

   {

       public int Id { get; set; }

       public string Name { get; set; }

       public string Description { get; set; }

       public CourseLevel Level { get; set; }

       public Category Category { get; set; }

       public float FullPrice { get; set; }

       public Author Author { get; set; }

       public DateTime? DatePublished { get; set; }

       public IList<CoursesTags> Tags { get; set; }

       public Course()

       {

           Tags = new List<CoursesTags>();

       }

   }

}
```

Next, we run our migration. In package manager console, run `add-migration RenameTitleToNameInCorseTable`. Working with small migrations helps us come up with a meaningful name. This will cause fewer chances for errors.

```c#
using Microsoft.EntityFrameworkCore.Migrations;

namespace CodeFirstDemo.Migrations

{

   public partial class RenameTitleToNameInCorseTable : Migration

   {

       protected override void Up(MigrationBuilder migrationBuilder)

       {

           migrationBuilder.DropColumn(

               name: "Title",

               table: "Courses");

           migrationBuilder.AddColumn<string>(

               name: "Name",

               table: "Courses",

               nullable: true);

       }

       protected override void Down(MigrationBuilder migrationBuilder)

       {

           migrationBuilder.DropColumn(

               name: "Name",

               table: "Courses");

           migrationBuilder.AddColumn<string>(

               name: "Title",

               table: "Courses",

               type: "nvarchar(max)",

               nullable: true);

       }

   }

}
```
#### Override the conventions to change database tables
Let us take a look at the migration. This is an interesting one. The `Title` column is dropped first. The `Name` column which is of type string is then created. In SQL type terms, it is going to be of type `varchar max`. 

Note that in C# a string is nullable. This column in the database will also be nullable by default. It does not make sense to have a course without a name. We will look at a quick way to override this convention. 

Take a look at `migrationBuilder.AddColumn` section of our migration, change `nullable: true` to `nullable: false`. 

```c#
           migrationBuilder.AddColumn<string>(

               name: "Name",

               table: "Courses",

               nullable: false);
```

One other thing to note is that we are dropping the column first. This is a dangerous statement. It means all records in that column will be deleted. It is easy to notice such a statement when working with small migrations. 

Each time you create a migration, you see what is going to happen in your database. We shall look at two techniques to resolve this. 

#### Different Methods applied during modification
1. We can use the `RenameColumn()` method. It has three parameters. The first is the `table name`. The second is the `old name`. The third is the `new name`. The fourth parameter is optional.

```c#
       protected override void Up(MigrationBuilder migrationBuilder)

       {

           migrationBuilder.RenameColumn("dbo.Courses","Title","Name");

       }
```

2. The second method is the use of the `Sql()` method. Before dropping the `Title` column, we first create the `Name` column. We then use the `Sql() method` to populate data to the `Title` column. Finally, we drop the `Title column.

```c#
       protected override void Up(MigrationBuilder migrationBuilder)

       {

           migrationBuilder.AddColumn<string>(

               name: "Name",

               table: "Courses",

               nullable: true);

           migrationBuilder.Sql("UPDATE Courses SET Name = Title");

           migrationBuilder.DropColumn(

               name: "Title",

               table: "Courses");

       }
```

Whenever we make a change on the `Up()` method, it is important to double-check the `Down()` method. This is because the `Down()` method is used to downgrade the database. 

Sometimes we want to bring the database to the latest version. There are times you need to downgrade it to a specific version for maintenance. When you modify the `Up()` method and don't modify the  `Down()` method, it is easy to run into problems. These problems will occur when you downgrade your database to a specific version. 

To avoid these problems, Let us look at the `Down()` method before we run our migration. We are dropping the `Name` column and adding the `Title` column. We shall do the reverse of the changes we did on the `Up()` method. That is, before dropping the `Name` we shall update the `Title` column first.

```c#
       protected override void Down(MigrationBuilder migrationBuilder)

       {

           migrationBuilder.AddColumn<string>(

               name: "Title",

               table: "Courses",

               type: "nvarchar(max)",

               nullable: false);

           migrationBuilder.Sql("UPDATE Courses SET Title = Name");

           migrationBuilder.DropColumn(

           name: "Name",

           table: "Courses");

       }
```

Finally, run the `update-database` command. Below is an image of our database course's table. The column name has successfully been updated. 

![CodeFirst renaming column](/engineering-education/building-model-using-code-first/DatePublished.png) 

#### Deleting an existing property.
We are going to delete the `DatePublished` property in our course class. 

```c#
using System.Collections.Generic;

namespace CodeFirstDemo.Models

{

   public class Course

   {

       public int Id { get; set; }

       public string Name { get; set; }

       public string Description { get; set; }

       public CourseLevel Level { get; set; }

       public Category Category { get; set; }

       public float FullPrice { get; set; }

       public Author Author { get; set; }

       public IList<CoursesTags> Tags { get; set; }

       public Course()

       {

           Tags = new List<CoursesTags>();

       }

   }

}
```

We will then create a migration. `add-migration DeleteDatePublishedColoumnFromCoursesTable`

```c#
using System;

using Microsoft.EntityFrameworkCore.Migrations;

namespace CodeFirstDemo.Migrations

{

   public partial class DeleteDatePublishedColoumnFromCoursesTable : Migration

   {

       protected override void Up(MigrationBuilder migrationBuilder)

       {

           migrationBuilder.DropColumn(

               name: "DatePublished",

               table: "Courses");

       }

       protected override void Down(MigrationBuilder migrationBuilder)

       {

           migrationBuilder.AddColumn<DateTime>(

               name: "DatePublished",

               table: "Courses",

               type: "datetime2",

               nullable: true);

       }

   }

}
```

This is a very straightforward migration. We simply drop the `DatePublished` column in the database. We run the `update-database` command. 

Below we see that the Courses table in the database does not have the `DatePublished` column.

![CodeFirst Delete Coloumn](/engineering-education/building-model-using-code-first/DatePublishedRemoval.PNG) 

### Deleting an existing class.
Let us take a look at our course class. We are going to delete the Category class. There will be three types of changes that we can apply in our model. These are:

1. Delete the `Category` property of the `Course Class`.

2. Delete the `Category` class.

3. Delete `Categories` dbset in ApplicationDbContext class.

With these changes, we can run our migration. In the package manager console, run the below commands:

1. `add-migration DeleteCategoryColumnFromCoursesTable`.

2. `update-database`.

```c#
using Microsoft.EntityFrameworkCore.Migrations;

namespace CodeFirstDemo.Migrations

{

   public partial class DeleteCategoryColumnFromCoursesTable : Migration

   {

       protected override void Up(MigrationBuilder migrationBuilder)

       {

           migrationBuilder.DropForeignKey(

               name: "FK_Courses_Categories_CategoryId",

               table: "Courses");

           migrationBuilder.DropTable(

               name: "Categories");

           migrationBuilder.DropIndex(

               name: "IX_Courses_CategoryId",

               table: "Courses");

           migrationBuilder.DropColumn(

               name: "CategoryId",

               table: "Courses");

       }

       protected override void Down(MigrationBuilder migrationBuilder)

       {

           migrationBuilder.AddColumn<int>(

               name: "CategoryId",

               table: "Courses",

               type: "int",

               nullable: true);

           migrationBuilder.CreateTable(

               name: "Categories",

               columns: table => new

               {

                   Id = table.Column<int>(type: "int", nullable: false)

                       .Annotation("SqlServer:Identity", "1, 1"),

                   Name = table.Column<string>(type: "nvarchar(max)", nullable: true)

               },

               constraints: table =>

               {

                   table.PrimaryKey("PK_Categories", x => x.Id);

               });

           migrationBuilder.CreateIndex(

               name: "IX_Courses_CategoryId",

               table: "Courses",

               column: "CategoryId");

           migrationBuilder.AddForeignKey(

               name: "FK_Courses_Categories_CategoryId",

               table: "Courses",

               column: "CategoryId",

               principalTable: "Categories",

               principalColumn: "Id",

               onDelete: ReferentialAction.Restrict);

       }

   }

}
```

Let us look at this migration. It is a straightforward migration. We first delete the foreign key. This is because there was an association between the courses and categories tables. Second, we delete the index of the column. 

Finally, we delete the column itself. When deleting a navigation property in a class, this three operations will always be there.  

There are times when one would want to preserve data in a table before deleting it. Using the Categories migration, let us explore how to do this. These are the steps to follow:

1. First create the table in which one would want to store the data. In or case, let us call it `_categries`.

2. The next thing is to write a `sql()` method to transfer the data from `categories` to  `_categries`.

3. In the down method, we need to do a reverse of what we did in the `Up()` method. Create the categories table. We now need to move data from `_categories` into `categories`. Finally, drop the `_categories` table. 

```c#
using Microsoft.EntityFrameworkCore.Migrations;

namespace CodeFirstDemo.Migrations

{

   public partial class DeleteCategoryColumnFromCoursesTable : Migration

   {

       protected override void Up(MigrationBuilder migrationBuilder)

       {

           migrationBuilder.CreateTable(

               name: "_Categories",

               columns: table => new

               {

                   Id = table.Column<int>(type: "int", nullable: false)

                       .Annotation("SqlServer:Identity", "1, 1"),

                   Name = table.Column<string>(type: "nvarchar(max)", nullable: true)

               },

               constraints: table =>

               {

                   table.PrimaryKey("PK_Categories", x => x.Id);

               });

           migrationBuilder.Sql("INSERT INTO _Categories (Name) SELECT Name FROM Categories");

           migrationBuilder.DropForeignKey(

               name: "FK_Courses_Categories_CategoryId",

               table: "Courses");

           migrationBuilder.DropTable(

               name: "Categories");

           migrationBuilder.DropIndex(

               name: "IX_Courses_CategoryId",

               table: "Courses");

           migrationBuilder.DropColumn(

               name: "CategoryId",

               table: "Courses");

       }

       protected override void Down(MigrationBuilder migrationBuilder)

       {

           migrationBuilder.AddColumn<int>(

               name: "CategoryId",

               table: "Courses",

               type: "int",

               nullable: true);

           migrationBuilder.CreateTable(

               name: "Categories",

               columns: table => new

               {

                   Id = table.Column<int>(type: "int", nullable: false)

                       .Annotation("SqlServer:Identity", "1, 1"),

                   Name = table.Column<string>(type: "nvarchar(max)", nullable: true)

               },

               constraints: table =>

               {

                   table.PrimaryKey("PK_Categories", x => x.Id);

               });

           migrationBuilder.Sql("INSERT INTO Categories (Name) SELECT Name FROM _Categories");

           migrationBuilder.DropTable(

               name: "_Categories");

           migrationBuilder.CreateIndex(

               name: "IX_Courses_CategoryId",

               table: "Courses",

               column: "CategoryId");

           migrationBuilder.AddForeignKey(

               name: "FK_Courses_Categories_CategoryId",

               table: "Courses",

               column: "CategoryId",

               principalTable: "Categories",

               principalColumn: "Id",

               onDelete: ReferentialAction.Restrict);
       }

   }

}
```

### Recover from mistakes
As part of changing our model and creating migrations, sometimes we make mistakes. How can we recover from such mistakes? Let us have a look at the `Migrations` folder in our application. 

![CodeFirst migration folder](/engineering-education/building-model-using-code-first/migration.PNG) 

From the above diagram, let us assume `DeleteDatePublishedColoumnFromCoursesTable` was a mistake. We should not have deleted that property. The way to recover from that is to create a new migration. Always think of your migration as a source code repository. With a repository, you don't go changing the history. Versioning is always forward. EF-Migration is similar. Once you run a migration, you cannot change it. Instead, you run a new migration to revert the undesired changes. 

### Conclusion
In this article, you learned about code-first migrations in detail. Think of your migrations as a commit to a repository. Always aim for small migrations and when you run them on a database, do not change them. If you make a mistake, create another migration to recover from your mistake.

Happy coding!

---
Peer Review Contributions by: [Jethro Magaji](/engineering-education/authors/jethro-magaji/)
