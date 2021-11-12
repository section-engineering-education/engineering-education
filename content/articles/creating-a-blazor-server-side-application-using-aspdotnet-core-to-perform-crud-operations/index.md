### Introduction
Server-side processing occurs when a page is requested for the first time and when pages are posted back to the server. For example, validation, saving and retrieving data, and navigating to other pages are all examples of server-side processing.

In this tutorial, you will learn how to make a Blazor Server-Side Application from scratch and perform CRUD operations in it.
The types of CRUD operations you will perform include creating, reading, updating, and deleting data from the list.

### Table of contents
- [Prerequisites](#prerequisites)
- [Creating and Reading data from list](#creating-and-reading-data-from-list)
- [Updating/Editing the list](#updatingediting-the-list)
- [Adding data to a list](#adding-data-to-a-list)
- [Deleting data in a list](#deleting-data-in-a-list)
- [Conclusion](#conclusion)

### Prerequisites
In order to understand this tutorial well, you will need to have an understanding of:
- Basic knowledge of [Blazor framework](https://blazor.syncfusion.com/documentation/introduction)
- Basic knowledge of [C#](https://docs.microsoft.com/en-us/dotnet/csharp/) language
- Microsoft Visual Studio installed and well set. Download it [here](https://visualstudio.microsoft.com/vs/community/)
- Basic [HTML](https://devdocs.io/html/) knowledge
- Basic [ASP.NET Core](https://docs.microsoft.com/en-us/aspnet/core/?view=aspnetcore-6.0)

Now, you will open Microsoft Visual Studio and select `New Project` as shown in the figure below, and click next.

![New project](/engineering-education/creating-a-blazor-server-side-application-using-aspdotnet-core-to-perform-crud-operations/new-project)

On the next screen, select `Blazor Server App` and click next and click next as shown below.

![Type of Application](/engineering-education/creating-a-blazor-server-side-application-using-aspdotnet-core-to-perform-crud-operations/blazor-server.png)

On the next screen, choose the name of your application i.e `Blazor server app`, and click next as in the figure below.

![Name of app](/engineering-education/creating-a-blazor-server-side-application-using-aspdotnet-core-to-perform-crud-operations/nameofapp.png)

On the next screen choose your target framework, for instance, in this case, you shall use `.NET Core 3.1(Long-term Support)` and click on `Create`.

![Target framework](/engineering-education/creating-a-blazor-server-side-application-using-aspdotnet-core-to-perform-crud-operations/framework.png)

Now run the app to see how it looks like in a web browser. It should look like this.

![Appearance](/engineering-education/creating-a-blazor-server-side-application-using-aspdotnet-core-to-perform-crud-operations/appearance.png)

The webpage has three pages and you shall also add one page to fetch students' data and perform `CRUD` operations in it.

### Creating and Reading data from a list
In the shared folder, there is a file named `NavMenu.razor`, this file shall be used to create a link to the newly created file page. To create the `students page` you will need to add the following HTML code to the file.

```HTML
<li class="nav-item px-3">
            <NavLink class="nav-link" href="students">
                <span class="oi oi-plus" aria-hidden="true"></span> Students
            </NavLink>
</li>
```

You also need to add a razor component and call it `Students.razor`. To do this, right-click on the pages folder and select `Razor component`, enter the name of the component i.e `Students.razor`, and click `Add`.

![Component](/engineering-education/creating-a-blazor-server-side-application-using-aspdotnet-core-to-perform-crud-operations/component.png)

To fetch data of students, you will need to create a class in the `Data` folder. Right-click on the folder name and select class, you will create an interface called `IStudentService.cs` that will have a few methods in the `IStudentService.cs` file.

You will also create an implementation of the interface called `StudentService` by doing the same procedure above but this time you will click on `Class` instead of `Interface`. `StudentService` inherits from `IStudentService`

You will also create methods in the `IStudentService.cs` file.
The first method will return a list of students. You will fetch this list of students in the `Data folder`. The code below is used to fetch students' data.

```C#
namespace Blazor_Server_App.Data
{
    interface IStudentService
    {
        List<Student> GetStudent();}
}
```

You will implement the method above in the `StudentService` file. You will create a private property of field so as to utilize the list of students by creating a private list of students and returning the list as shown below in the code snippet below.

```C#
namespace Blazor_Server_App.Data
{
    public class StudentsService : IStudentsService
    {
        private List<Students> students = new List<Students>
        {
            new Students
            {
                Id = Guid.NewGuid(),
                Name = "Student 1"
            },
            new Student
            {
                Id = Guid.NewGuid(),
                Name = "Student 2"
            },
            new Students
            {
                Id = Guid.NewGuid(),
                Name = "Student 3"
            },
        };
    public List<Student> GetStudent()
        {
            return student;
        }
    }
}
```

In order to use the method above, you need to inject the service in the `Student.razor` file using the `inject` keyword by calling the `StudentsService` so that you will be able to use it anywhere in the code.

You will create an override method that is called on load. The `HTML Code` populates the list of students in a table and a loop that loops through the list of employees available.

The `@page "/students"` is a URL that matches this component to be accessed by the razor page.

```C#
@page "/students"
<h3>Students</h3>
@inject Blazor_Server_App.Data.IStudentsService StudentService;
<table class ="table">
    <thead>
        <tr>
            <td>Id</td>
            <td>Name</td>
        </tr>
    </thead>
    <tbody>
        @foreach(var student in student)
            {
                <tr>
                    <td>@student.Id</td>
                    <td>@student.Name</td>
                </tr>
            }
    </tbody>
</table>


@code {  
    private List<Blazor_Server_App.Data.Student> student;

    protected override void OnInitialized()
    {
        student = StudentService.GetStudent();
    }

}
```

Also in the `startup.cs` file, you will add a singleton of `StudentService` such that when you ask for `IStudentsService` it gives you the StudentService.i.e;

```C#
 public void ConfigureServices(IServiceCollection services)
        {
            services.AddRazorPages();
            services.AddServerSideBlazor();
            services.AddSingleton<WeatherForecastService>();
            services.AddSingleton<IStudentService, StudentService>();
        }
```

Since you don't have a list of students, you will have to create a students model, and give it the following two properties.
The first property gets the `Identity` i.e registration number of the student and the second property gets the name of the student as implemented in the code below.

```C#
namespace Blazor_Server_App.Data
{
    public class Students
    {
        public Guid Id { get; set; }
        public String Name { get; set; }
    }
}
```

### Updating/Editing the list
To create an edit function to this page, you will need to create a link that would take your routing from the student's page to another page which shows the details of the students that we want to update or edit.

To do this, in the `Student.razor` file, you will add an empty header in the table header and action of an anchor tag in the table body that has a new student location that you want the user to send to. Also, along with the routing, you will pass the student Id so that you can search the student in the new location using the Id.

```HTML
<table class="table">
    <thead>
        <tr>
            <td>ID</td>
            <td>Name</td>
            <td></td>
        </tr>
    </thead>
    <tbody>
        @foreach(var student in students)
            {
                <tr>
                    <td>@student.Id</td>
                    <td>@student.Name</td>
                    <td>
                        <a href="stdudent/@student.Id">Edit</a>
                    </td>
                </tr>
            }
    </tbody>
</table>
```

Now you need to create a new page for adding and editing students. To do this, right-click on the page folder and select `Add` and choose `Razor Component` and give it a name. i.e `EditStudent.razor`.

Now to fetch the Id, you will implement the code below in your `EditStudent.razor` file.

```C#
@page "/students{Id}"
<h3>EditStudent</h3>
<h4>Id</h4>
@code {
    [Parameter]
    public String Id { get; set; }
}
```

Now you will need to utilize the Id above and fetch the student data so that you can be able to edit the details. To do that, you will go to the student service interface and create a method to fetch the student details.

You will add the code line below in the `interface IStudentsService`.

```C#
Students GetStudents(Guid id);
```

You will also implement the above method in the `StudentService` file by using the `.SingleOrDefault` method because it can't be null since it needs to return something.

```C#
 public Students GetStudents(Guid id)
        {
            return students.SingleOrDefault(x => x.Id == id);
        }
```

You will use the above method in the `EditStudent` component.

```C#
@page "/students{id}"
<h3>EditStudent</h3>
@inject Blazor_Server_App.Data.IStudentsService StudentsService;
@inject NavigationManager Navigation
<h4>Id</h4>
<EditForm Model="student" onSubmit ="@submitForm">
    <div class="form-group">
        <label>Id</label>
        <input id="Id" value="@student.Id" name="id" readonly />
    </div>
    <div class="form-group">
        <label>Id</label>
        <inputText id="Name" class="form-control" value ="@student.Name" name="name" @bind-value="student.Name"></inputText>
    </div>
     <button type="submit" class="btn btn-primary">Update</button>
</EditForm>
@code {
    [Parameter]
    public String Id { get; set; }

    private Blazor_Server_App.Data.Students student { get; set; }
    protected override void OnInitialized()
    {
        student = StudentsService.GetStudents(Guid.Parse(Id));
    }
    private void submitForm()
    {
        StudentsService.UpdateStudent(student);
        Navigation.NavigateTo("students");
    }
}
```

Now you have populated the name and Id of the student list, you now need to create an update button so that you can update a student and route back to the student's list and be able to see the change.

To do this, you will go to the student service interface and create a method to update the student list, you will call the method `UpdateStudent()` and pass the student model to it. This method returns a void.

```C#
 void UpdateStudent(Students students);
 ```

You will implement the above interface method in the student service file. This is basically updating the students by getting the student first and updating the list with a new student.

```C#
        public void UpdateStudent(Students students)
        {
            var getOldStudent = GetStudents(students.Id);
             getOldStudent.Name = students.Name;
        }
```

### Adding data to a list
To add a student to the list, you will go to the student service interface and create a method for adding a student. The method shall be a void and receive the student model i.e

```C#
void AddStudent(Students students);
```

The next thing is to implement the above interface method in the student service file. To do this, you will create a new Id in the service file, return the new student added to the student model and add the new student to the list.

```C#
 public void AddStudent(Students students)
        {
            var id = Guid.NewGuid();
            students.Id = id;
            Students.Add(students);
        }
```

Now you will create an anchor tag in the `student.razor component` file to link the pages.

```C#
<a href="student/0"></a>
```

Now in the `EditStudents.razor` file, you will check if the id is not null or empty and the id is zero, you create a new student or otherwise just fetch it from the student service.

```C#
    private Blazor_Server_App.Data.Students student { get; set; }
    protected override void OnInitialized()
    {
        if (!String.IsNullOrEmpty(Id)& Id == "0")
        {
            student = new Data.Students();
        }
        else
        {
            student = StudentsService.GetStudents(Guid.Parse(Id));
        }
    }
```

In the submit form, you will check if the student is empty then you will call the student service to add the student, otherwise you will just update the employee.

```C#
private void SubmitForm()
    {
        if(student.Id == Guid.Empty)
        {
            StudentsService.AddStudent(student);
        }
        else
        {
            StudentsService.UpdateStudent(student);
        }
        Navigation.NavigateTo("students");
    }
```

### Deleting data in a list
In the students' razor page, you will add another table data for a button and give it the value of `Delete` and give it an onclick action and give it the method `onDelete` and pass the value of student to it.

```HTML
<td>
     <button class = "btn btn-secondary" onclick="@(e=> onDelete(student.Id))">Delete</button>
 </td>
 ```

Now, in the student service interface, you will create a method to delete a student and implement the method in the student service file by fetching the student data and removing it from the list.

```C#
void DeleteStudent(Guid id);
```

In the student service file;

```C#
public void DeleteStudent(Guid id)
        {
            var student = GetStudents(id);
            students.Remove(student);
        }
```

### Conclusion
From this tutorial, you shall be able to implement the create, delete, read and update operations on a web page.
