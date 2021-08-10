### Introduction
Serverless is not new in the technology world. It is gradually changing how companies and developers deliver business value to their clients using the [public cloud](https://www.ibm.com/cloud/learn/public-cloud).

This article will cover the steps on how one can migrate an [on-premises](https://www.techopedia.com/definition/26714/on-premises-software) application to [serverless](https://aws.amazon.com/serverless/). We will use a case study of a recruitment web application to accomplish the task.

### Case study system description
The case study is about a client who runs an `Online Recruitment Platform`.  The illustration below demonstrates how the system works:

![on prem](/engineering-education/how-to-migrate-an-on-prem-application-to-serverless/on-prem.jpeg)

The system is running on-premises infrastructure and contains two web applications:

- **Identity server web application**: It is used to authenticate and authorize a user into the system. It provides user management (CRUD operations), login/logout function, user permissions and allows the users to log in with their Google or Facebook accounts.
- **Recruitment web application**: It is the main module of the system. A user can use the `Job Search` function to look for a job and use the `File Upload` function to upload a resume or CV. An admin of the system uses `Reporting` feature for generating different reports in the system and `Customer support` for sending emails and SMS.

These web applications use the shared database called the `Recruitment` database. In addition, the system also contains other modules such as `Message Queue` for sending notifications and `Background Jobs` that assist in data processing for reporting.

Below are significant outlines of the article:
1. On-prem system problems
2. Road to serverless solution
3. The migration approach
4. Challenges

### 1. On-prem system problems
- **Massive codebase**: the legacy system can be challenging to learn and understand, especially for junior developers. To fix a simple bug or error in the system, developers have to write a new function instead of refactoring it. It is because the function causing the bug or the issue is tightly coupled with other functions in the system. 
- **High costs**: Apart from purchasing a good server infrastructure to deploy the system, which also comes at enormous costs, such a system's development and maintenance cost is also expensive.
- **Low scalability**: most modules in the system have dependent resources, meaning that to scale specific functions, for instance, in the "JobSearch" module, the organization needs to scale the whole system. It leads to resource and time wastage.
- **Low availability**: For any new feature and improvement, even if it is a minor bug, the whole system has to be redeployed, rendering it unavailable during upgrades.
- **Low reliability**: Bug or an error in any module such as stack overflow can bring down the whole system. Additionally, since all the application instances are identical, a bug can impact the availability of the entire system.
- **Not open to new technologies**: if the system is coded in one programming language, it is impossible to code a new feature in another language as it will break the existing system.

#### Why opt for a serverless solution
- **No server management**: The organization does not need to maintain or manage a server since a third-party vendor can handle that. It significantly brings the costs down.
- **Reduced costs**: the organization only pays for what they use and need. Developers project the server capacity and resources needed in advance and only purchase what is required, eventually reducing cost.
- **Better scalability**: applications built-in serverless infrastructure scale automatically as the user base grows and the usage increases. If a new feature is added and more users join the system, the organization worries less about server capabilities since the vendor handles that.
- **Quick deployments and updates**: it is possible to upload all the code at once or one function since an application is not a single monolithic stack but a collection of functions provisioned by the vendor. It is also possible to update, patch, fix or add new features to the application as fast as possible. It can be done without necessarily updating the whole system.

### 2. Road to serverless solution
IT infrastructure has improved over time. It has made applications in the cloud to be more flexible and scalable.

Below explains how IT infrastructure has evolved from past to date:
- It started back in the 1990s, whereby applications were built and deployed on a local server. The server was developed for long-term use. However, much work was needed to set up, configure and operate it.  In case an application needed to scale, then the whole server had to be scaled too.
- In the years 2000s new option for deployment servers came up. [Virtual Machine](https://www.vmware.com/topics/glossary/content/virtual-machine) (VM) joined the market. It came along with a [Virtual Private Server](https://www.ibm.com/cloud/learn/vps) (VPS). It could be deployed within minutes and was meant for short-term use. The machine counted the unit of the scale.
- [Docker](https://www.docker.com/) was introduced in 2011 and has become one of the most significant moves of IT infrastructure. It has changed the software architecture is designed and how applications are deployed. Containers speed up an application using minimal resources and can scale multiple, collocated containers to deliver services in a production environment.
- Despite the extensive use of containers, managing them has been a challenge because of their vast complexity. For this reason, serverless computing has replaced containers. It adds a new abstraction layer where the cloud vendor acts as the server and dynamically manages the allocation of machine resources.

### 3. The migration approach
The figure below shows our new proposed system:

![proposed system](/engineering-education/how-to-migrate-an-on-prem-application-to-serverless/new-system.jpeg)

Note that in our case, we have used [Azure Cloud Provider](https://azure.microsoft.com/en-us/overview/what-is-azure/) for the new system, but one can also use [AWS](https://aws.amazon.com/) and [Google Cloud](https://cloud.google.com/) for similar services.

[Azure Web App](https://azure.microsoft.com/en-us/services/app-service/web/) will host `Identity Server` and create a separate database by using [Azure SQL Server](https://azure.microsoft.com/en-us/products/azure-sql/database/). We will also utilize [Azure Traffic Manager](https://docs.microsoft.com/en-us/azure/traffic-manager/traffic-manager-overview) to ensure high availability and as a failover plan. Azure Traffic Manager will be our load balancer that is DNS-based traffic and assists in distributing optimal traffic to services across Azure regions.

The `Job Web Application` in our new system only contains the user interface. The entire business logic is hosted to [Azure Functions](https://azure.microsoft.com/en-us/services/functions/). [Azure API Management](https://azure.microsoft.com/en-us/services/api-management/) will be our single entry point where each request from `Job Web Application` goes through to reach Azure Functions. In addition, Azure API Management will integrate with `Identity Server` to authenticate and authorize the system users. [Azure Application Gateway](https://docs.microsoft.com/en-us/azure/application-gateway/overview) will act as a firewall for our application.

Even if we have moved `Identity Server` and `Job Web Application` to the cloud, they are not serverless yet but referred to as [PaaS](https://azure.microsoft.com/en-us/overview/what-is-paas/).

Azure has two types of approaches to serverless architecture:

- **Azure Function**: it lets one run event-triggered code without explicitly providing or managing infrastructure.
- **Azure Logic App**: it assists in building business processes, automated-scalable workflows, and enterprise orchestrations that integrate applications and data across on-premises systems and cloud services.

In the new system, we will have the following Azure Functions:
- Job Search
- Job Management
- Customer Communication
- Reporting
- Send mail
- Send SMS

The [Azure Logic App](https://docs.microsoft.com/en-us/azure/logic-apps/logic-apps-overview) will assist in the file upload that serves different file types of different formats. For instance, excel file for importing data, jpeg/png file for image uploads, and image resizing.

In addition, there are still more Azure services such as [Azure Service Bus](https://docs.microsoft.com/en-us/azure/service-bus-messaging/service-bus-messaging-overview), [Blob Storage](https://azure.microsoft.com/en-us/services/storage/blobs/) for uploading files and [Table Storage](https://docs.microsoft.com/en-us/azure/storage/tables/table-storage-overview) for log data storage. We have also integrated [Azure Application Insight](https://docs.microsoft.com/en-us/azure/azure-monitor/app/app-insights-overview), which assists in monitoring.

#### Migration steps
We will implement the new system parallel with the legacy system to ensure no impact on the current running business.

First, we have to choose which function to migrate to serverless. Note that we are migrating a legacy codebase which, as mentioned earlier it is massive. We need to choose a function that would have less impact on others, assuming we do not have the technical documentation or specifications of the existing systems.

The most straightforward function to move first to serverless will be the `Job Management` module, as illustrated below:

![Backfill](/engineering-education/how-to-migrate-an-on-prem-application-to-serverless/facade.jpeg)

Next step, we will create a `Façade layer` that will provide a high-level abstraction over the `Job Management` function. It also refractor all consumers of the same functionality to use the similar façade.

Next, we will utilize Azure Function and [Azure Cosmos Database](https://docs.microsoft.com/en-us/azure/cosmos-db/introduction) to implement our new system.  The essential thing in this implementation is synchronizing data between existing database with a new database using `Cosmos DB` and name it the `Backfill` process as illustrated below:

![Toggler](/engineering-education/how-to-migrate-an-on-prem-application-to-serverless/toggler.jpeg)

Next, we create a `Toggler`, our third implementation of the façade and acts as a traffic router. It forwards requests to either the existing or new function (Azure Function) through a façade layer.

After we are done with Azure Function, we will fire up `Canary Launch` and configure the Toggler's feature flag. The 2% of requests will be routed to the Azure Function, and the remaining 98% is directed to the existing system.

If everything goes as expected, we can eventually route the 100% traffic of the requests to the `Job Management` function that is delivered via the new Azure Function. In case any problem happens with the new implementation, then a fallback function is triggered to roll back the request and re-directs the request to the existing function as illustrated below:

![job management](/engineering-education/how-to-migrate-an-on-prem-application-to-serverless/job-mgt.jpeg)

Once we are satisfied with our new implementation of the Azure Function, we go ahead and delete the deprecated existing implementation of the `Job Management` function. We can therefore remove the `Toggler` as illustrated below:

![delete toggler](/engineering-education/how-to-migrate-an-on-prem-application-to-serverless/no-toggler.jpeg)

### 4. Challenges
Serverless is a new paradigm for developing and running modern applications in the cloud. It increases the developer's focus and productivity.

However, there are challenges that one has to overcome during the development and also delivery phase.
- **New technology**: In a given organization, it is expected to find out that the team that is conversant with cloud services and serverless is small than the required number. It would imply that many training sessions are needed hence time-consuming and costly. Also, for new technology to succeed, almost more than half of the team needs to accept it and use it.
- **Debugging**: most distributed applications rely more on log trace to identify the root cause of the issue. Azure Function CLI helps in debugging Azure Function during the development phase. Debugging an Azure Function on the cloud needs one to set remote debugging, and it is not easy.
- **Integration**: Testing serverless applications are not accessible as one does not have access to the code's environment.
- **Monitoring**: Serverless supports breaking down an application into smaller modules. This introduces a new challenge of distributed monitoring. With many serverless components bundled together, it is not easy to trace a request or response from end to end, and it is challenging to use with legacy monitoring tools. Although Azure Application Insights assists in monitoring Azure Functions but getting familiar with metrics is difficult.

### Conclusion
It is a long journey to migrate from monolith architecture to serverless. It requires much investment and commitment from the management. Additionally, it also requires discipline from the team members that are developing it. However, the benefits associated with it can never be underestimated.

It is usually a good idea to start small, rather than waiting for one big move. These incremental steps allow the developers to learn from their past mistakes, iterate, and try again. It is not a good idea to go for a perfect design. Instead, the team should be ready to iterate and improve.

Finally, it is better to note that serverless is not a single step but involves continuous improvement.
