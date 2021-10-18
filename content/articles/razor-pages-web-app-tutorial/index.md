---
layout: engineering-education
status: publish
published: true
url: /razor-pages-web-app-tutorial/
title: Razor Pages Web App Tutorial Using ASP.NET Core
description: The goal of this tutorial is to help the reader build Razor Pages Web Application using ASP.NET Core.
author: daniel-masika
date: 2021-10-18T00:00:00-09:47
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/razor-pages-web-app-tutorial/hero.png
    alt: Razor Pages Example Image
---
Razor Pages is a server-side, page-focused framework that allows for the creation of dynamic, data-driven web pages with a clear separation of concerns in ASP.NET Core.
<!--more-->
If you have been looking for a better and simpler way to create a razor pages web app, using ASP.NET Core would be the best for you. This focuses on how one could come up with a working razor page web app.

### Table of contents
- [Prerequisites](#prerequisites)
- [Creating a razor pages web application](#creating-a-razor-pages-web-application)
- [Integrating a model into a Razor Pages app](#integrating-a-model-into-a-razor-pages-app)
- [Updating/adding data to the razor pages web application](#updatingadding-data-to-the-razor-pages-web-application)
- [Including a search bar](#including-a-search-bar)
- [Including validation](#including-validation)
- [Conclusion](#conclusion)

After going through this tutorial, the reader will be able to come up with a web application that can manage a database of any given object.

### Prerequisites
To better understand this tutorial, you need to have some basic knowledge of;

- [ASP.NET Core](https://docs.microsoft.com/en-us/aspnet/core/?view=aspnetcore-5.0)
- [C#](https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/)
- [HTML](https://devdocs.io/html/) and [CSS](https://devdocs.io/css/)

You also need to download [Visual Studio](https://visualstudio.microsoft.com/vs/) and [.NET Core 3.1](https://dotnet.microsoft.com/download/dotnet/3.1) in your computer.

After downloading and installing Visual Studio, launch it and follow the following steps.

### Creating a razor pages web application
To create a new project, click on `Create a new project`.

![New project](/engineering-education/razor-pages-web-app-tutorial/newproject.png)

In the next window, click on `ASP.NET Core Web App` and click next.

Next, enter the name of the Web Application you want to create, i.e. `StudentsCheckList` for this project, choose the location you want your application to be, and click next.

![Name of the web app](/engineering-education/razor-pages-web-app-tutorial/name.png)

Click `Create` on the next page to finish setting up the application. After that, the web application project is now created. We will now modify the web app through the steps mentioned above.

![Interface for Web App Creation](/engineering-education/razor-pages-web-app-tutorial/create.png)

When you debug, your web app, it will appear like this.

![Appearance of the web app](/engineering-education/razor-pages-web-app-tutorial/appearance.png)

Now, in the `solution explorer tab`, there are files that are important to understand, namely;

- `index. cshtml` file, which is the display template.
- `index.cshtml.cs` file, which is the page model.

The `index.html` file includes the `@page` directive, which informs `ASP.NET Core` that it is a razor page, and the `@model` directive, which specifies the model for the display template, i.e., IndexModel.

We need to change the welcome message to add the following code to `cs.cshtml.cs` file and accessing it in the index.cshtml file with the `@Model.Message` property.

```C#
namespace StudentsCheckList.Pages
{
    public class IndexModel : PageModel
    {
        private readonly ILogger _logger;
        public string Message{get; set;}
        public IndexModel(ILogger logger)
        {
           _logger = logger;
        }
        public void OnGet()
        {
            Message = "Hello, welcome to the Web App Tutorial.";
        }
    }
}
```

In the `index.cshtml` code, we remove the `welcome` message and add `@Model.Message` property to access the message in the `index.cshtml.cs` file.

### Integrating a model into a Razor Pages app
To add a model to your web application, right-click on the `Solution 'StudentsCheckList'` in the solution explorer tab and navigate to `Add`, and select `New Project`.

In the new project selected, we are only interested in the `Class Library Project`, so in the search bar, type `Class Library` and select `Class Library(.NET Standard)` that uses the C# language`.

![model](/engineering-education/razor-pages-web-app-tutorial/nxt.png)

Click next and enter the name of the model you are adding. Click create on the next screen.

### Updating/adding data to the razor pages web application
This application will be used to `create`, `read`, `update`, and `delete` operations.

In this model, we want to create a list of students of a given school, so we add `RegNo`, `Name`, `Email`, `Department`, and `Degree` in the public class to come up with the following sample code.

```C#
using System;
namespace Model
{
    public enum Class1
    {
        Name,
        RegNo,
        Email,
        Department,
        Degree
    }
}
```

The next thing to do is to add employees class, so right-click on the `model class` and select `Add` then select `Class`. We will name it `Students`.

In this class, we need to include these five data types. i.e,

- RegNo
- Name
- Email
- Department
- Degree
  
To add the above data, we will have the following code;

```C#
namespace Model

{
    public class Students
    {
     public int RegNo { get; set; }
      public String Name { get; set; }
      public String Email { get; set; }
      public String Department { get; set; }
      public String Degree { get; set; }
    }
}
```

### Including a search bar
In this section, we will be creating a search bar and making it work effectively. We will be using bootstrap for styling.

In the index razor page that displays the list of students, we will create a form element that we will implement using a `get`request.

When we input the `html` code below, we will have a search bar created in the `Students` field.

```html
@page
@model StudentsCheckList.Pages.Students.IndexModel
@{ViewData["Title"] ="Index";
  ViewData["ShowButtons"] = true;
}
<style>
    .btn {
        width: 75px;
    }
</style>
<form method="get">
    <div class="input-group">
        <input class="form-control" asp-for ="SearchTerm" />
        <div class="input-group-append">
            <button type="submit" class="btn btn primary">Search</button>
        </div>
    </div>
</form>
```

Now, the next thing is to include the search term property in the `page model class` using the code below;

```C#
using StudentsCheckList.Services
using StudentsCheckList.Models;
namespace StudentsCheckList.Pages.Students
{
    public class IndexModel : PageModel
    {
        private readonly IStudentsRepository studentsRepository;
        public IEnumerable(IEnumerable Students { get; set; })
        {
            [BindProperty(supportsGet = true)]
            public String termToSearch { get; set; }
        }
        public void OnGet()
        {
        Students = studentsRepository.search(termToSearch);
        }
    }
}
```

Now, we want a method that can search and filter Students. This is implemented in the `Students repository class` and the `mock Students class`.

We will have the code below in the `Students repository class`;

```C#
using StudentsCheckList.Models;
namespace StudentsCheckList.Services;
{
    public interface IStudentsRepository
    {
        IEnumerable<Students> Search(String termToSearch);
        IEnumerable<Students> GetAllStudents();
        Students GetStudents(int id);
    }
}
```

We'll add the following code to the `mock Students repository class`;

```C#
    public Students GetStudents(int id);
{
return _studentsList.FirstOrDefault(e=> e.id == id);
}
public IEnumerable<Students> Search(string termToSearch)
{
    return _studentsList;
}
public IEnumerable Search(string termToSearch)
    if(string.IsNullOrEmpty(termToSearch))
{
    return _studentsList;
}
{
    return _studentsList.Where(e => e.Name.Contains(termToSearch) ||

                                    e.Email.Contains(termToSearch) ||
                                    
                                    e.RegNo.Contains(termToSearch).toList();
};
```

When you debug the web app, the search property works properly.

### Including validation
In validation, we will look at the client-side validation of the razor pages.

To validate client-side validation, we need to specify the three script files listed in the order below;

1. jquery.js
2. jquery.validate.js
3. jquery.unobtrusive.validate.js

If you want client-side validation on several pages in your web application, then implement the scripts using the `Layout file` else implement them on the specified razor pages.

Under the pages folder, there is an `Edit` razor page folder that is used for adding and editing existing Students. Client-side validation is needed only on this page where all the script files will be loaded.

For the second and third files above to be effective, and since they are already loaded in the `partial view` file, they need to be rendered in the `Edit` file using the `jQuery` code below.

 ```js
 @section Scripts{
     <script>
     $(document).ready(function(){
         $(".custom-file-input").on("change", function(){
             var fileName = $(this).val().split("\\").pop();
             $(this).next(".custom-file-label").html(fileName);
         });
     });

     </script>
     <partial name = "_ValidationScriptsPartial" />
 }
 ```

`_ValidationScriptsPartial` is in the solution explorer in the `shared` folder.

 Now, when you fill a form, all the requirements will have to be fulfilled to be able to submit the form.

 If the client-side validation is not working on your computer, check the following;

1. If you have JavaScript enabled in your browser.
2. Confirm that the libraries files are loaded in the environment you are testing.
3. Ensure that the three files are loaded in the correct order.

### Conclusion
From this tutorial, it is clear that razor pages is the default and easy-to-use framework for building server-side, dynamic, and data-driven web pages with a clear separation of concerns.

---
Peer Review Contributions by: [Willies Ogola](/engineering-education/authors/willies-ogola/)
