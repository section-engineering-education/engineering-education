---
layout: engineering-education
status: publish
published: true
url: /creating-a-blazor-server-side-application-using-aspdotnet-core-to-perform-crud-operations/
title: Blazor Server-Side Application Using ASP.NET Core to Perform CRUD Operations
description: In this tutorial, we will learn how to make a Blazor server-side application from scratch and perform CRUD operations in it.
author: joseph-ongoma
date: 2021-11-26T00:00:00-05:30
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/java-timer-tasks/hero.jpg
    alt: Blazor Server-Side Application Using ASP.NET Core To Perform CRUD Operations Hero Image
---
Server-side processing occurs when a page is requested for the first time and when pages are posted back to the server. For example, validation, saving and retrieving data, and navigating to other pages are all examples of server-side processing.
<!--more-->
In this tutorial, you will learn how to create a Blazor server-side application from scratch and perform CRUD operations in it. The types of CRUD operations you will perform include creating, reading, updating, and deleting data from a list.

### Table of content
- [Table of content](#table-of-content)
- [Prerequisites](#prerequisites)
- [Creating and reading data from a list](#creating-and-reading-data-from-a-list)
- [Updating/editing the list](#updatingediting-the-list)
- [Adding data to a list](#adding-data-to-a-list)
- [Deleting data from a list](#deleting-data-from-a-list)
- [Conclusion](#conclusion)

### Prerequisites
To follow through this tutorial, you will need to have:
- A basic knowledge of [Blazor framework](https://blazor.syncfusion.com/documentation/introduction)
- A basic knowledge of [C#](https://docs.microsoft.com/en-us/dotnet/csharp/) language
- Microsoft Visual Studio installed. Download it [here](https://visualstudio.microsoft.com/vs/community/)
- A basic [HTML](https://devdocs.io/html/) knowledge
- A basic [ASP.NET Core](https://docs.microsoft.com/en-us/aspnet/core/?view=aspnetcore-6.0) knowledge

Now, we will open Microsoft Visual Studio and select `New Project` as shown in the figure below, and click next.

![New project](/engineering-education/creating-a-blazor-server-side-application-using-aspdotnet-core-to-perform-crud-operations/new-project.png)

On the next screen, select `Blazor Server App` and click next as shown below:

![Type of Application](/engineering-education/creating-a-blazor-server-side-application-using-aspdotnet-core-to-perform-crud-operations/blazor-server.png)

On the next screen, choose the name of your application i.e `Blazor server app`, and click next as in the figure below:

![Name of app](/engineering-education/creating-a-blazor-server-side-application-using-aspdotnet-core-to-perform-crud-operations/nameofapp.png)

On the next screen, choose your target framework, in this case, we will use `.NET Core 3.1(Long-term Support)`, click `Create`.

![Target framework](/engineering-education/creating-a-blazor-server-side-application-using-aspdotnet-core-to-perform-crud-operations/framework.png)

Now run the app to see how it looks like in a web browser. It should look like this:

![Appearance](/engineering-education/creating-a-blazor-server-side-application-using-aspdotnet-core-to-perform-crud-operations/appearance.png)

The website has three pages. We will also add one page to fetch students' data and perform `CRUD` operations in it.

### Creating and reading data from a list
In the shared folder, there is a file named `NavMenu.razor`. This file will be used to create a link to the newly created page.

To create the `students page`, we will need to add the following HTML code to the file:

```HTML
<li class="nav-item px-3">
            <NavLink class="nav-link" href="students">
                <span class="oi oi-plus" aria-hidden="true"></span> Students
            </NavLink>
</li>
```

We also need to add a razor component and named  `Students.razor`. To do this, right-click on the pages folder and select `Razor component`.

Afterwards, enter the name of the component i.e `Students.razor`, and click `Add`.

![Component](/engineering-education/creating-a-blazor-server-side-application-using-aspdotnet-core-to-perform-crud-operations/component.png)

To fetch the data of students, we will need to create a class in the `Data` folder. Right-click on the folder name and select class.

We will create an interface named `IStudentService.cs` that will have a few methods in the `IStudentService.cs` file.

We will also create an implementation of the interface called `StudentService` by doing the same procedure above. But, this time you will click on `Class` instead of `Interface`. `StudentService` inherits from `IStudentService`.

You will also create methods in the `IStudentService.cs` file. The first method will return a list of students.

We will fetch this list of students in the `Data folder`. The code below is used to fetch students' data:

```C#
namespace Blazor_Server_App.Data
{
    interface IStudentService
    {
        List<Student> GetStudent();}
}
```

We will implement the method above in the `StudentService` file. We will create a private property of the field to use the list of students. We will do this by creating a private list of students and returning it as shown in the code snippet below:

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

To use the method above, we need to inject the service in the `Student.razor` file using the `inject` keyword by calling the `StudentsService` so that we will be able to use it anywhere in the code.

We will create an override method named `on load`. The `HTML Code` populates the list of students in a table and creates a loop that loops through the list of employees available.

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

Also, in the `startup.cs` file, we will add a singleton of `StudentService` such that when we ask for `IStudentsService` it gives us the StudentService. i.e:

```C#
 public void ConfigureServices(IServiceCollection services)
        {
            services.AddRazorPages();
            services.AddServerSideBlazor();
            services.AddSingleton<WeatherForecastService>();
            services.AddSingleton<IStudentService, StudentService>();
        }
```

Since we don't have a list of students, we will have to create a students model and give two properties.

The first property gets the `Identity` i.e registration number of the student. The second property gets the name of the student as implemented in the code below:

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

### Updating/editing the list
To create an edit function to this page, we will need to create a link that would take our routing from the student's page to another page which shows the details of the students that we want to update or edit.

To do this, in the `Student.razor` file, we will add an empty header in the table header, and action of an anchor tag in the table body that has a new student location that we want the user to send to.

Also, along with the routing, you will pass the student ID so that you can search the student in the new location using the ID.

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

Now, we need to create a new page for adding and editing students. To do this, right-click on the page folder and select `Add`. Next, choose `Razor Component` and give it a name. For example, `EditStudent.razor`.

To fetch the Id, we will implement the code below in our `EditStudent.razor` file.

```C#
@page "/students{Id}"
<h3>EditStudent</h3>
<h4>Id</h4>
@code {
    [Parameter]
    public String Id { get; set; }
}
```

We will need to use the Id above and fetch the student data so that we can edit the details. To do that, we will go to the student service interface and create a method to fetch the student details.

We will add the code line below in the `interface IStudentsService`.

```C#
Students GetStudents(Guid id);
```

We will also implement the method above in the `StudentService` file by using the `SingleOrDefault` method. This is because it can't be null since it needs to return something.

```C#
 public Students GetStudents(Guid id)
        {
            return students.SingleOrDefault(x => x.Id == id);
        }
```

We will use the method above in the `EditStudent` component.

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

Now, we have populated the name and Id of the student list. Next, we need to create an update button so that you can update a student and route back to the student's list and be able to see the change.

To do this, we will go to the student service interface and create a method to update the student list. We will call the method `UpdateStudent()` and pass the student model to it. This method returns a void.

```C#
 void UpdateStudent(Students students);
```

We will implement the interface method above in the student service file. This updates the students by getting the student first, then updating the list with a new student.

```C#
        public void UpdateStudent(Students students)
        {
            var getOldStudent = GetStudents(students.Id);
             getOldStudent.Name = students.Name;
        }
```

### Adding data to a list
To add a student to the list, we will go to the student service interface and create a method for adding a student. The method will be a void and receive the student model. For example:

```C#
void AddStudent(Students students);
```

The next thing is to implement the interface method above in the student service file. To do this, we will create a new Id in the service file, return the new student added to the student model, and add the new student to the list.

```C#
 public void AddStudent(Students students)
        {
            var id = Guid.NewGuid();
            students.Id = id;
            Students.Add(students);
        }
```

Next, you will create an anchor tag in the `student.razor component` file to link the pages:

```C#
<a href="student/0"></a>
```

In the `EditStudents.razor` file, we will check if the id is not null or empty. If the id is zero, we create a new student. Otherwise, just fetch it from the student service:

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

In the submit form, we will check if the student is empty then call the student service to add the student. Otherwise, we will just update the employee:

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

### Deleting data from a list
In the students' razor page, we will add another table data for a button and give it the value of `Delete`. Afterwards, we will give it an onclick action and a method `onDelete`, and pass the value of student to it:

```HTML
<td>
     <button class = "btn btn-secondary" onclick="@(e=> onDelete(student.Id))">Delete</button>
 </td>
```

In the student service interface, we will create a method to delete a student and implement the method in the student service file. This is done by fetching the student data and removing it from the list:

```C#
void DeleteStudent(Guid id);
```

In the student service file:

```C#
public void DeleteStudent(Guid id)
        {
            var student = GetStudents(id);
            students.Remove(student);
        }
```

### Conclusion
In this tutorial, we have learned about server-side blazor in ASP.NET Core. We have also seen how to make CRUD operations using ASP.NET. We can alse easily tell how server-side blazor is different from other client-side blazor applications.

Hope you find this tutorial helpful.

Happy coding

---
Peer Review Contributions by: [Dawe Daniel](/engineering-education/authors/dawe-daniel/)
