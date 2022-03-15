### Introduction
This article aims at making a view of how to include layers in a project. The layers discussed are the middle and Data Access layers. The article will also discuss the applications of these layers in detail.

A three-tier architecture aims at dividing and administering applications into three analytical and physical computing layers. ASP.NET core Web API is an interface medium for web servers and applications. A core 6 Web design consists of improvements that have notably decreased the number of lines and codes sufficient in the design of an application.

### Prerequisites
To understand this concept, the learner should have the following in mind;

1. Know how to use visual studio code 2019; the reader can also [Download](https://Visualstudio.microsoft.com/vs/community/) it here and have it installed.
2. Have a basic knowledge of introduction to Web APIs.



### Table of Contents
- [Overview of what is the ASP dot NET Core 6 Web API and Three Tire Architecture](#overview-of-what-is-the-asp-dot-net-core-6-web-api-and-three-tire-architecture)
- [Project Structure](#project-structure)
- [Add Project Interface](#add-project-interface)
- [Data Access Layer](#data-access-layer)
- [Presentation Layer](#presentation-layer)
- [Advantages and Disadvantages of Three Tire Architecture](#advantages-and-disadvantages-of-three-tire-architecture)

### Overview of what is the ASP dot NET Core 6 Web API and Three Tire Architecture
ASP.NET Core is an improved model of ASP.NET. It is an unlocked original structure for generating web interface and can run on Linux, Mac, or Windows. ASP.NET Core is compatible with both NET Core and Traditional. ASP.NET Core is an open-source toolkit that has greater presentation and is used to generate modernized, internet-connected, and cloud-based apps.

The three-tier architecture organizes a project into 3 levels: database access, business access, and interface layers. this separates data and UI logic into three partitions. in a scenario where a user wishes to change the UI from Linux to Windows then the layer changes but does not affect the other layers. Likewise, if a user wants to make changes on the business layer, changes would take effect on that layer without affecting the rest of the layers. This design is used in the control of many entities.

### Project Structure
In this article, we'll concentrate on the layers that compose up a three-tier architecture, that contains Presentation, Business, Middle, and Data Access.
#### Presentation layer
The presentation layer leads in a three-tier architecture. it is characterized to exhibit the solution to the user, to change and display differently or exhibit the data obtained from the middle layer as well as executing the results to the user.
#### Business Access layer
It acts as a middleware since it accepts arguments between the data access and the presentation layer where they are computed resulting in logical solutions and judgments. Therefore the main aim of this layer is to create a platform for the computation of facts across other layers.
#### Data Access layer
This is the layer whose major duty is to link from data sources; its main job is to connect, access, or store features from the data source, as well as to perform the same functions to the path of data computation in the business Access layer, and then to the screen for presentation.

![The diagram shows an overview of the project structure](engineering-education/the-asp.net-core-6-web-api-a-three-tier-architecture/structure.jpg)

To configure these layers, a user ought to follow these steps;
1. Open class library of Asp.net for data access.
2. Add a new project window through right-clicking and adding the category of the Asp.net Core.
3. Add business access layer.
4. Open Asp.net category for the business layer.
5. Right-click on the project and add a new file window.
6. Add Asp.net Core class library.
7. Finally, add the reference of the data access and business access layers to be able to display the object.

### Add Project Interface
1. By right-clicking the presentation and selecting add, you may include a reference to the data access and business access layers in the presentation layer

![The diagram shows addition of a presentation layer](engineering-education/the-asp.net-core-6-web-api-a-three-tier-architecture/architecture.jpg)

2. Choose a reference from the list of checkboxes.

![The diagram shows selection of a reference](engineering-education/the-asp.net-core-6-web-api-a-three-tier-architecture/reference.jpg)

3. References for data access and business access layers appear as below.

![The diagram shows how business access and data access layers looks like](engineering-education/the-asp.net-core-6-web-api-a-three-tier-architecture/appearance.jpg)

4. After you've finished the above, move on to the middle layer and add the data layer project reference.

Because the data access layer and the business access layer are already there, the presentation layer should not be added to the business layer, as just the data access layer is required in this scenario.

### Data Access Layer
This layer serves as a connection between the business access layer and the data source, as discussed before in this project.
Procedures and functions in this layer help the business access layer conduct logic operations on data sources. As a result, the purpose of this layer is to connect to data sources and use the data access layer to compute functions.

This layer comprises of these components that should be included in this layer.
- [Contacts](#contacts)
- [Data](#data)
- [Migrations](#migrations)
- [Models](#models)
- [Repositories](#repositories)

#### Contacts
This component is likened to be an application that has functions that are used to execute the desired computations with the data source.

```C#
using System;
using System.Collection.Generic;
using System.Linq;
using System.Texts;
using System.Thread.Task;
 namespace JWTTokenAuthenticationInAspNet6_DAL.Contracts {
    public interface IRepository < Q > {
        public Task < Q > Cret(Q _objects);
        public void Dlt(Q _objects);
        public void Upd(Q _objects);
        public IEnumerable < Q > GetAll();
        public Q GetByIdentiy(int Id);
    }
}

```

#### Data
Comprises of a data source background class which is vital for retrieving the data from the source.

#### Migrations
Contains other sub-component which carry instructions on migrations presented during the execution of the project. Folders with instructions that were performed during execution are contained here.

#### Models
Interface models consist of facts and business logic models, which constitute the structure of the features of business logic contained in this file.

```C#
using Microsoft.AspNetCore.Id;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Texts;
using System.Thread.Tasks;

namespace JWTTokenAuthenticationInAspNet6_DAL.Model
{
    public class ApplicationUser: UsersIdentity
    {
        public int Identy { get; set; }
        public string? Title { get; set; }
        public string? TypeOfAccount { get; set; }
        public string? TelephoneNumber { get; set; }
        public string? Passcord { get; set; }
        public string? NameoftheShop { get; set; }
        public string? TypeofBussines { get; set; }
        public string? RoleofUser { get; set; }
        public bool? IstobeDeleted { get; set; }
    }
}

```

#### Repositories
This component is where the addition of repositories class is done to each model. The CRUD operation is written to link with the data source.

### Business Access Layer
As mentioned earlier, the business layer acts as middleware by accepting arguments between the data access layer and the presentation layer. This layer commits the function of operations and calculations to the logic of business. It uses business rules that verify inputs and ensure output is corrected.
 
This layer consists of two domain folders;
- Appendix folder
- Folder for service
These folders link surrounding layouts that is data and presentation layouts.

### Presentation layer
this layer is featured as the topmost to occur to the user in a three-tier design, it comprises the display. This layer is characterized by giving translations to the user in simple terms that a user can understand. It is very important since it communicates to the user. It has a template that is set to a default of the asp.net interface.

### Advantages and Disadvantages of Three Tire Architecture
#### Advantages of Three Tire Architecture 
- Ability to hide unnecessary instructions from the business layer in the presentation layer.
- Easy to update data providers
- Complex and large projects can be easily maintained 
- Provides advanced security to the database layer by introducing an application layer.
- Provides the difference between the top, middle, and bottom layers.
- Easy migration to new environments.
- The fast development of an application can be achieved since each tier is independent

#### Disadvantages of Three Tire Architecture
- Difficult in building and consume a lot of time
- Requires users to have advanced knowledge concerning object-oriented programs.
- It is complicated compared to a client-server design.

### Conclusion
The three-tier architecture has been the focus of our concern in this text. The essay has given a clear picture of how data moves across the three layers and how they communicate with one another.
Happy coding!