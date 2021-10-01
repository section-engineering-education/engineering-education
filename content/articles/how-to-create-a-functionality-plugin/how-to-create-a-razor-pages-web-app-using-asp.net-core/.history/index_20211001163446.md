#### INTRODUCTION
Razor Pages is the default for building server-side web applications in ASP.NET Core.
If you have been looking for a better and simpler way to create a razor pages web app, using ASP.NET Core would be the best for you. This focuses on how one could come up with a working razor page web app.

We shall have a step by step look at each of the following topics to enable you be able to create a working web app.
1. Creating a Razor Pages web app
2. Add a model to a Razor Pages app
3. Updating/adding data to the razor pages Web Application
4. implement search bar
6. Adding validation
   
After going through this tutorial, the reader shall be able to come app with web application that can manage a database of any given object.

#### KEY TAKEAWAYS
After this this tutorial the reader is expected to:
- be able to understand the concept of razor pages web app.
- be able to create a razor page web app, add search, add validation and also add a model.
- be able to add data in the created web app.
- be able to update the razor web app in the data base.

#### PREREQUISITES
To better understand this tutorial, you need to have some basic knowledge of;
- ASP.NET Core
- C#
- HTML AND CSS
You also need to download [visual studio](https://visualstudio.microsoft.com/vs/) and [.NET Core 3.1](https://dotnet.microsoft.com/download/dotnet/3.1) in your computer.
After downloading and installing visual studio, launch it and follow the following steps.

### Creating a razor pages Web App
To create a new project click on Create new project.
![New project]()

In the next window click on `ASP.NET Core Web App` and click next.
Next enter the name of the Web Application you want to create, i.e `WebApp` for this project, choose the location you want your application to be and click next.
![Name of the web app]()

Click create on the next page to finish setting up the application. After that, the web application project is now created , we shall now modify the web app through the steps mentioned above.
![Web App Creation interface]()

When you debug, your web app will appear like this ![appearance of the web app]()

Now, in the `solution explorer tab`, there are files that it are important to understand. Namely; 
- index.cshtml which is the display template.
- index.cshtml.cs is the page model.
  
`Index.html` contains the `@page` which tells the `ASP.NET Core` that it is a razor page and `@model` which specifies the model for the display template i.e, `IndexModel`
We need to change the welcome message to adding the following code to cs.cshtml.cs file and accessing it in the index.cshtml file with the @Model.Message property.

```C#
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebAp.Pages
{
    public class IndexModel : PageModel
    {
        private readonly ILogger<IndexModel> _logger;

        public string Message{get; set;}
        public IndexModel(ILogger<IndexModel> logger)
        {
            _logger = logger;
        }

        public void OnGet()
        {
            Message = "Hello, welcome to Web App Tutorial.";
        }
    }
}
```
In the `Index.cshtml` code we remove the `welcome` message and add `@Model.Message` property to access the message in the `Index.cshtml.cs` file.

###  Adding a model to a Razor Pages app
To add a model to your Web Application, right click on the `Solution 'WebApp'` in the solution explorer tab and navigate to `Add` and select `New Project`.

In the new project selected we are only interested in the `Class Library Project`, so in the search bar, type `Class Library` and select `Class LIbrary(.NET Standard)` that is using `C# language`.
![model]()

Click next and enter the name of the model you are adding. Click create on the next screen.
### Updating/adding data to the razor pages
This application will be used to `create`, `read`, `update` and `delete` operations.
In this model we want to create a list of employees of a given company so we add `Name`, `IT`, `Payroll` and `HR` int the public class to come up with the following sample code.
```C#
using System;

namespace Model
{
    public enum Class1
    {
        Name,
        HR,
        IT,
        Payroll,
    }
}
```

The next thing to do is to add employees class, so right click on the `model class` and select `Add` then select `Class`. We will name it as `Employee`.
In this class we need to include these five data types. i.e, 
- ID
- Name
- Email
- Department 
- Photopath
  
To add the above data we shall have the following code;
```C#
using System;
using System.Collections.Generic;
using System.Text;

namespace Model
using System;
using System.Collections.Generic;
using System.Text;

namespace Model
{
    public class Employee
    { public int Id { get; set; }
      public String Name { get; set; }
      public String Email { get; set; }
      public String Photopath { get; set; }
      public Class1? Department { get; set; }
    }
}
```

### Implementing search bar
In this topic we shall be creating a search bar and make it work effectively.
We shall be using bootstrap for styling.
In the index razor page that displays the list of employees, we shall create create a form element which we shall implement using a `get `request.
When we input the `html` code below, we will have a search bar created in the employees' field.
```HTML
@page
@model WebApp.Pages.Employees.IndexModel
@{ViewData["Title"] ="Index";
  ViewData["ShowButtons"] = true;

}
<style>
    .btn{
        width:75px;
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
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApp.Models;
using WebApp.Services;

namespace WebApp.Pages.Employees
{
    public class IndexModel : PageModel
    {
        private readonly IEmployeeRepository employeeRepository;

        public IEnumerable(IEnumerable<Employee> Employees{ get; set; })
        {
            [BindProperty(supportsGet = true)]
            public String SearchTerm { get; set; }
        }

        public void OnGet()
        {
        Employees = employRepository.search(searchTerm);
        }
    }
}
```
Now, we want a method that can search and filter employees. This is implemented in the employee Repository class and the `mock employee class`.
We shall have the code below in the `employee repository class`;
```C#
using WebApp.Models;
using System;
using System.Collections.Generic;

namespace WebApp.Services
{
	public interface IEmployeeRepository
    {
        IEnumerable<Employee> Search(String searchTerm);
        IEnumerable<Employee> GetAllEmployees();
        Employee GetEmployee(int id);
    }
}
```
And in the mock employee repository class we shall add the following code;
```C#
    public Employee GetEmployee(int id);
{
return _employeeList.FirstOrDefault(e=> e.id == id);
}
public IEnumerable<Employee> Search(string searchTerm)
{
    return _employeeList;
}
public IEnumerable <Employee> Search(string searchTerm)
    if(string.IsNullOrEmpty(searchTerm))
{
    return _employeeList;
}
{
    return _employeeList.Where(e => e.Name.Contains(searchTerm) ||
                                    e.Email.Contains(searchTerm)
}
```
When you debug the web app the search property works properly.
 
### Adding validation
In validation, we shall look at client side validation of the razor pages.
To validate client side validation, we just need to specify these three script files in the order below;
1. jquery.js
2. jquery.validate.js
3. jquery.validate.unobtrusive.js

If you want client side validation on several pages in your web application then implement the scripts using the `Layout file` else implement them on the specified razor pages.
In your folder under the pages folder, there a `Edit` razor page folder which is used for adding and editing existing employees. Client side validation is needed only in this page where all the script files will be loaded.

For the second and the third file above to be effective, since they are already loaded in the `partial view` file they need to need rendered in the Edit file using the `Jquery` code below.

 ```JQUERY
 @section Scripts{
     <script>
     $(document).ready(function(){
         $(".custom-file-input").on("change", function(){
             var fileName = $(this).val().split("\\").pop();
             $(this).next(".custom-file-label").html(fileName);
         });
     });
     <partial name = "_ValidationScriptsPartial" />
 }
 ```
`_ValidationScriptsPartial` is in the solution explorer in `shared` folder.
 
 Now, when you fill a form, all the requirements will have to be fulfilled to be able to submit the form.
 I f the client side validation is not working on your computer, check the following;
 1. Your browser supports for javascript is enabled
 2. Check if the validation libraries are loaded for the environment you are testing against.
 3. Ensure that client side validation libraries are loaded in the order specified.
