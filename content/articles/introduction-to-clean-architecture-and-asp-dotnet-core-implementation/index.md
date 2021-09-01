Building modular, scalable, and maintainable applications requires good architecture. The intricacies of different designs may differ, but they all have the same goal: the separation of concerns. They are all attempting to eliminate the separation by layering the application.


### Introduction
The basic goal of architecture is to support the system's life cycle. Good architecture makes it possible and easy to *understand, develop, maintain, and deploy systems.* The ultimate goal is to reduce the system's lifetime cost and increase programmer productivity.


### Table of contents
- [Overview of a Clean Architecture.](#overview-of-a-clean-architecture)
- [Clean Architecture benefits.](#clean-architecture-benefits)
- [Clean Architecture implementation with ASP dotNET core.](#clean-architecture-implementation-with-asp-dotnet-core)

### Overview of a Clean Architecture.


Clean architecture is a software architecture that aims to `keep code under control` while removing any tidiness that would deter others from touching it after it has been released. Clean Architecture's fundamental premise is that application code or logic that is unlikely to change should be developed without any direct dependencies. So, if we alter our framework, database, or user interface, the system's core (Business Rules or Domain) should not change. It implies that external dependencies can be entirely replaced.

The application model and business logic are at the center of the clean architecture. Instead of business logic being reliant on data access or other infrastructure problems, it is now the other way around. The Application Core determines the infrastructure and implementation details.
This functionality is achieved in the Application Core by establishing interfaces or abstractions that can be implemented by types defined in the infrastructure layer. A sequence of concentric rings, similar to an onion, is a frequent method to envision this design.

In Clean architecture, the `Domain` and `Application tiers` remain at the center of the design, referred to as the `Core` of the System.


![The digram shows the core](engineering-education/introduction-to-clean-architecture-and-implementation-with-asp.net-core/core.jpg)

The `domain` layer contains `enterprise` logic, while the `application` layer contains `business` logic. Business logic is exclusively used within the system, whereas enterprise logic can be used in several systems.
 In the Core, data access and other infrastructure problems are handled separately. We may accomplish this by utilizing interfaces and abstractions within the Core and having other layers outside the Core implement them.

The core is independent of all other layers, and in a clean architecture, all dependencies flow inwards; the Infrastructure and Presentation layers are both dependent on Core.

### Clean Architecture benefits
The cost-benefit analysis is the most common justification for investing in clean architecture. Every software architect's goal is to reduce the cost of developing and maintaining software. As software architects, our goal is to optimize the Return on Investment. We may do it in a variety of ways thanks to clean architecture.

*How clean architecture helps us ;*

1. It focuses on essentials

To begin, clean architecture `focuses on the most basic demands` of the system's primary inhabitants, the users. By incorporating these use-cases and mental models in both our design and code, we want to create a system that reflects the users' use-cases and mental models.

2. The clean architecture builds only what is needed or necessary

Second, clean architecture constructs only what is required and when it is required. We try to design only the features and architecture that are required to meet the users' urgent needs, in the order of each feature's `perceived business value`. We make every effort to avoid adding unnecessarily complex features, premature performance optimization, or architectural decorations. This helps to keep the system's development costs down.

3. Maintainability is optimized using clean architecture.

Third, a clear architecture makes it easier to maintain. We spend more time and money maintaining a typical corporate program with a long life cycle, say 12 years or more, than we do design it. So, if we optimize for maintainability, as clean architecture does, we should be able to lower the cost of software maintenance.

The advantages of clean architecture include;

- External agency independence. In reality, your business rules have no idea of what is going on in the outside world.

- User interface independence. Changes to the user interface can be made without affecting the rest of the system or business rules.

- Testable. It can now be tested on its own. You can test business rules without taking into account the user interface, database, or mock servers.

- Independence of Database and Frameworks. Because the database and object-relation mapping (ORM) can be quickly changed, the software will not be reliant on them.


### Clean Architecture implementation with ASP dotNET core.


After learning about this architecture in general, we can now learn how to implement the clean architecture in the ASP.NET core application model.

Having said this, we shall go into our visual studio, where will now generate a blank solution.

![The digram shows how to configure the new project](engineering-education/introduction-to-clean-architecture-and-implementation-with-asp.net-core/blanksolution.png)

After that, we will add a Web API project to our solution, along with three class library projects.
This is how the project will appear.

![The digram shows how our project will look like after adding some classes](engineering-education/introduction-to-clean-architecture-and-implementation-with-asp.net-core/addingclass.jpg)

We now add the project references. The key concept of clean architecture is that the inner layer is not supposed to know the outer layer while the outer layer should know the inner layer. Therefore core will not have project reference but infrastructure will know about core and API will know about all three layers.

We can now go to the core project and create two folders named Entities and the other *Repositories*. Withing our *entities* file, we can then have to create a class named *employee. cs.*

Below is an example of a code. 

```C#

public class Employees {
    [Key]
    [DbGenerate(DbGenerateOption.Identity)]
    public Int32 EmployeesId {
        get;
        set;
    }
    public string FirstName {
        get;
        set;
    }
    public string LastName {
        get;
        set;
    }
    public string PhoneNumber {
        get;
        set;
    }
    public string Email {
        get;
        set;
    }
}

```
We will make a file or a folder called `base` in our repositories folder, where our interface will be called IReposirory.cs in our base folder we have made.

```C#

public interface IRepository < Q > where Q: class
 {
    Task < IReadOnlyList < Q >> GetAllAsync();
    Task < Q > GetByIdAsync(int id);
    Task < Q > AddAsync(Q entity);
    Task UpdateAsync(Q entity);
    Task DeleteAsync(Q entity);
 }

```
This is a standard CRUD signature (Create, Read, Update, and Delete). *The four fundamental database operations.* 
 Then, inside the `Repositories` folder, we will develop another interface called IRepository that will contain some special methods related to an Entity, and we will call it `IEmployeeRepository.cs.`

```C#
public interface IEmployeeRepository: IRepository < Employee.Core.Entities.
Employee >
    {
    
    Task < IEnumerable < Employee.Core.Entities.Employee >> 
    GetEmployeeByFirstName(string firsttname);

    }
```
Output ; 
As a result, this is how the core project structure will appear.


 ![This is the core project's look](engineering-education/introduction-to-clean-architecture-and-implementation-with-asp.net-core/coreproject.png)

 The `infrastructure` layer will now be implemented as a result of this. We will need to create two folders in the infrastructure project, one for data and the other for repositories. In the data folder, we will construct the `Employeecontext` class.

`EmployeeContext.cs`

```C#

public class EmployeesContext: DatabaseContext
   {
    public EmployeesContext(DatabasbContextOptions < EmployeeContext > option): base(option) {}

    public DatabaseSet < Employees.Core.Entities.Employee > Employees
    {
        get;
        set;
    }
}

```
We will make a folder called `Base` in the `Repositories` folder, and inside it, we shall make a Repository class responsible for implementing the interface for general CRUD.

`Repository.cs`
```C#

public class Repository < Q > : IRepository < Q > where Q: class
   {
    protected readonly EmployeesContext _employeesContext;
    public Repository(EmployeesContext employeesContext)
      {
        _employeesContext = employeesContext;
    
         }
     public asynch Task < Q > AddAsynch(Q element) {
        await _employeesContext.Set < Q > ().AddAsynch(element);
        await _employeesContext.SaveTheChangesAsynch();
        return element;
            }
     public asynch Task DeleteAsynch(T element) {
        _employeesContext.Set < Q > ().Remove(element);
        await _employeesContext.SaveTheChangesAsynch();
             }
     public asynch Task < IReadOnlyList < Q >> GetAllAsynch() {
        return awaits _employeesContext.Set < Q > ().ToListAsynch();
           }
     public asynch Task < Q > GetByIdAsynch(int id) {
        return awaits _employeesContext.Set < T > ().FindAsynch(id);
        }
     public Task UpdateAsynch(Q element) {
        throw new NotImplementedException();
     }
}

```
For a custom action that is specific to an entity, we will build another class `EmployeeRepository` in the `Repositories` folder. Repository and `IEmployeeRepository` must be implemented, with access to both generic and custom data.

`EmployeeRepository.cs`

```C#

public class EmployeeRepository: Repository < Employee.Core.Entities.Employee > , IEmployeeRepository 
     {

    public EmployeeRepository(EmployeeContext employeeContext): base(employeeContext) {}
    public async Task < IEnumerable < Core.Entities.Employee >>       GetEmployeeByLastName(string lastname)
     {

        return await _employeeContext.Employees.Where(n => n.LastName == lastname).ToListAsync();

    }
}

``` 
Output

When these changes are done our infrastructure layer will look like this.

![The infrastructure layer](engineering-education/introduction-to-clean-architecture-and-implementation-with-asp.net-core/infrastructure.png)

We will now create Command and Query Responsibility Segregation (CQRS) in the Application layer, which will separate queries from commands. CQRS is a pattern for separating read, write, and update operations in data storage. As a result, we will make folders within our application layer project.

The folders created are as follows.
- Commands
- Handlers
- mappers
- Queries
- Responses

Our first command, `CreateEmployeeCommand`, is now added. We will create a new class called `CreateEmployeecommand.cs` in our Commands folder. This ensures that the command to generate a new record is sent to the infrastructure. `IRequest` and the `MediatR` library will be implemented.
This is shown below;

```C#

public class CreateEmployeesCommand: IRequest < EmployeeResponse >
 {
    public string FirstName {
        get;
        set;
    }
    public string LastName {
        get;
        set;
   }
    public string Email {
        get;
        set;
    }
    public string PhoneNumber {
        get;
        set;
   
    }
}

```
Within the IRequest, we will declare the response type as EmployeeResponse. So, inside the Responses folder, we will make an EmployeeResponse.cs.

```C#

public class EmployeesResponse 
{
    public int EmployeeId {
        get;
        set;
    }
    public string FirstName {
        get;
        set;
    }
    public string LastName {
        get;
        set;
     }
    public string Email {
        get;
        set;
    }
    public string PhoneNumber {
        get;
        set;
    
    }
}

```
Then construct a handler for CreateEmployeeCommand in the Handlers folder.

The `CreateEmployeeHandler` will look like this.

```C#

public class CreateEmployeessHandler: IRequestHandler < CreateEmployeesCommand, EmployeesResponse > {
    private readonly IEmployeesRepository _employeesRepo;
    public CreateEmployeesHandler(IEmployeesRepository employeesRepository) {
        _employeesRepo = employeesRepository;
    }
    public async Task < EmployeesResponse > Handle(CreateEmployeesCommand request, CancellationTokens cancellationTokens) {
        var employeesEntitiy = EmployeesMapper.Mapper.Map < Employees.Core.Entities.Employees > (request);
        if (employeesEntitiy is null)
         {
            throw new ApplicationException("Issue with mapper");
        }
        var newEmployees = await _employeesRepo.AddAsync(employeesEntitiy);
        var employeesResponse = EmployeesMapper.Mapper.Map < EmployeesResponse > (newEmployees);
        return employeesResponse;
    }
}

```
 We provided IRequestHandler in the preceding code, which will take CreateEmployeeCommand and MovieResponse as parameters.
We mapped Employee Entity and added the employee Entity to the database using the request object. After returning the response, MovieResponse was mapped back to fetch Employeeid from the object.

The AtuoMapper is responsible for implementing all this mapping stuff. Therefore we will create `EmployeeMapper.cs` class inside the Mapper folder.

```C#

public class EmployeeMapper 
{
    private static readonly Lazy < Mapper > Lazy = new Lazy < Mapper > (() => {
        variable configure = new MapperConfiguration(conf => {
            conf.ShouldMapProperty = p => p.GetMethod.IsPublic p.GetMethod.IsAssembly;
            conf.AddProfile < EmployeeMappingProfile > ();
        });
        var mapper = configure.CreateMapper();
        return mapper;
    });
    public static IMapper Mapper => Lazy.Value;
}
```
As mentioned in the preceding code *return mapper;* we will now construct a Mapping profile named EmployeeMapping Profile inside the Mapper folder.


 ```C#

 public class EmployeeMappingProfile: Profile 
  {
    public EmployeeMappingProfile()
      {
        CreateMap < Employee.Core.Entities.Employee, EmployeeResponse > ().ReverseMap();
        CreateMap < Employee.Core.Entities.Employee, CreateEmployeeCommand > ().ReverseMap();
      }
 }

 ```

In our project, we can also construct some queries, and the Application layer will look like this.


![The application layer](engineering-education/introduction-to-clean-architecture-and-implementation-with-asp.net-core/applicationlayer.png)


Now we will move on to API implementation, where we will add dependencies like Automapper, Swagger, and MediatR to the startup.cs index or file of the API project.

```C#
public void ConfigureService(IServiceCollection service)
  {
    service.AddControl();
    service.AddDatabaseContext < EmployeeContext > (n => n.UseSqlServer(Configuration.GetConnectionString("EmployeeDatabase")), ServiceLifetime.Singleton);
    service.AddSwaggerGen(s =>  
      {
        s.SwaggerDoc("w1", new OpenApiInfo 
          {
            Title = "Employee.API", Version = "w1"
         });
     });
    service.AddAutoMapper(typeof(Startup));
    service.AddMediatR(typeof(CreateEmployeeHandler).GetTypeInfo().Assembly);
    service.AddTransient < IEmployeeRepository, EmployeeRepository > ();
    service.AddScoped(typeof(IRepository < > ), typeof(Repository < > ));
 }

```
We will now create connection strings in the settings.json file for the app.

```C++

 {
  "ConnectStrings": 
   {
    "EmployeeDB": "Data root=.;First Catalog=EmployeeDB;Security Integrated=True"
      },
  "Signing":
        {
    "SignLevel": 
           {
      "Default": "Info",
      "Edge": "Warning",
      "Hosting.Edge.Lifetime": "Info"
        }
     },
  "HostsAllowed": "*"
 }

```
Then, as shown below, we will develop a new controller called EmployeeControl.

```C#

[Route("api/[control]")]
    [ApiControl]
    public class EmployeeControl : ControlBase
    {
        private readonly IMediator _mediator;
        public EmployeeControl(IMediator mediator)
        {
            _mediator = mediator;
          }

        [HttpsGet]
        [ProducesResponseType(StatusCodes.Status250OK)]
        public asynch Task<List<Employee.Core.Entities.Employee>> Get()
              {
            return await _mediator.Post(new GetAllEmployeeQuery());
                 }
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status250OK)]
        public asynch Task<ActionResult<EmployeeResponse>> CreateEmployee([FromBody] CreateEmployeeCommand command)
           {
            variable results = await _mediator.Post(command);
            return Ok(results);
        }
    }

```

This is how our API project will appear after these changes.


![The API project](engineering-education/introduction-to-clean-architecture-and-implementation-with-asp.net-core/apiproject.png)

Then we will execute our application, which will take us to *localhost:port/swagger/index.html*, where we can test our endpoint.


![Our swagger index of html](engineering-education/introduction-to-clean-architecture-and-implementation-with-asp.net-core/swagger.png)

Swagger is a set of principles for describing rest APIs in a format that product managers, testers, and developers may use to exchange documentation. It can also be used to automate API-related tasks using a variety of technologies.

### Conclusion
We have covered how Clean architecture places the business logic and application model at the heart of the project. Rather than relying on data access or other infrastructure problems, business logic should be independent. We have also learnt about the advantages of employing clean design, as well as the infrastructure and implementation details that come with it, based on application Core.




















