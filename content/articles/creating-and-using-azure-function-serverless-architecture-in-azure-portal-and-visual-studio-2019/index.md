---
layout: engineering-education
status: publish
published: true
url: /creating-and-using-azure-function-serverless-architecture-in-azure-portal-and-visual-studio-2019/
title: Creating and using Azure Function - Serverless Architecture in Azure portal and Visual Studio 2019
description: This tutorial discusses what is entailed in Azure Functions and compares the Azure Function with web jobs.
author: dickson-gitau
date: 2021-10-11T00:00:00-06:10
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/creating-and-using-azure-function-serverless-architecture-in-azure-portal-and-visual-studio-2019/hero.png
    alt: Azure Functions App image
---
We may construct a serverless solution using Azure functions, which has the advantages of requiring less code, less infrastructure upkeep, and cutting costs. 
<!--more-->
So, despite putting a lot of effort into application deployments and server maintenance, cloud infrastructure like Azure provides us with all of the latest resources we need to keep our apps functioning.		

### Table of contents
- [Features of azure functions](#features-of-azure-functions)
- [Advantages of using Azure functions](#advantages-of-using-azure-functions)
- [ARM templates concept](#arm-templates-concept)
- [Uses of Azure functions](#uses-of-azure-functions)
- [Azure functions vs web jobs](#azure-functions-vs-web-jobs)
- [Creating function app using Azure portal](#creating-function-app-using-azure-portal)
- [Creating Azure function using Azure portal](#creating-azure-function-using-azure-portal)
- [Using Visual Studio 2019 to create an Azure function](#using-visual-studio-2019-to-create-an-azure-function)
		
### Features of Azure functions
- You could write your function code in whatever language you choose. Azure functions may be deployed and run on any platform that supports the .NET Core programming language.
- *Scalability*- Azure functions uses a scalable compute-on-demand technique. These functions are dynamic so that new resources are automatically allocated to the service when the number of requests for execution increases. When the number of requests decreases, all extra resources and application instances are automatically terminated.
- *Azure functions are small and don't require a server* - The application is designed to perform a specific task; it is lightweight by default. Azure functions are serverless, which means they may be deployed and run without using any Web servers or virtual machines.
- Azure functions can be deployed in various configurations, including Linux, Windows, and containers, but they are available and can be consumed by any application that has access to the function.
- Instead of maintaining infrastructure, you can focus on delivering business value with serverless computing.
- Nuget and NPM(Node Package Manager) may be used to add dependencies and enhance your application's logic, respectively.
- Set up continuous integration and deployment for your function code using GitHub, Azure DevOps, Bitbucket, and other CI/CD approaches.
- Use SSL Bindings, VNet integration, and OAuth providers to safeguard your functions. Active Directory, Facebook, Twitter, Google, and Microsoft may be authenticated using the OAuth standard.
- When your app is running, you're only charged when it's active.
- It is easy to add Azure App Insight(AAI) to your app to monitor and analyze performance. 
- Triggers and bindings let your serverless apps react to events and communicate with other services.
		
### Advantages of using Azure Functions
- They are small and use very few resources to deploy and run.
- They are serverless, which means you don't need to set up a web server in the cloud.
- When not in use, the app is compute-on-demand and consumes no resources.
- The app is a pay-per-use service, so you don't have to pay anything if you're not using it.
- The app only runs when an event is triggered.
- The app is self-contained; therefore, it has no effect or interference with other applications.
- It's simple to create and deploy an app.
- It has a simplicity to update and support.
- The app is industry-standard, including industry-standard language and technologies for development and consumption.

#### Examples of popular Azure Services
1. **Active directory in Azure**
One of Microsoft Azure's leading superior cloud computing technology is Azure Active Directory (AD). In the Identity area, it's a platform for managing and protecting identities that anyone may use. Because of its strong security measures, it deserves to be at the top of our list of the finest Azure services.
2. **Azure CDN**
In this context, Azure Content Delivery Network (CDN) needs special recognition for its crucial role in helping organizations grow and thrive. Its server is built to accommodate a large amount of storage, web apps, and cloud services from Microsoft Azure. As a result, Azure CDN is utilized to transport material around the world safely.
3. **Azure data factory**
To automate data transmission and mobility in cloud computing, Azure Data Factory accepts data from many sources. Several Azure services, such as Azure Machine Learning, Azure HDInsight Hadoop, and Azure Data Lake Analytics, are used by Azure Data Factory for computation. Azure Data Lake may be seen as a massive repository for Big Data analytics that retains all of the data in its initial form.
4. **Azure SQL**
When it comes to database administration, Azure SQL is a service model (PaaS). This means it takes care of most backend tasks like monitoring, patching, and updating itself. It's essential to include Azure SQL because of how efficient it is without any human involvement in the list of the best Azure services.
5. **Azure Function**
Developers use Azure Functions to respond to events and attach to sources of data or messaging systems. When using Azure Function, you pay for the resources you use. With Azure Functions, as a serverless computing solution, businesses can execute code in response to events without needing the corresponding infrastructure.

#### Components of Azure
1. **Compute** - It provides application development, hosting, and deployment services, as the name implies.
2. **Storage** - When it concerns cloud data storage, Azure storage is a significant player. It offers a pay-as-you-go option so that users only pay for the resources they utilize. In addition, its storage capacity is almost infinite.
3. **Database** - This component provides SQL and NoSQL capabilities for data administration. Relational databases like SQL Server, Azure Database for MySQL, and others are supported, while NoSQL databases like Cassandra may be utilized. The Cosmos DB (document DB) is another option because of its speed and improved performance.
4. **Security and authentication** - Authentication, authorization, key encryption, and other security-related tasks are handled by this component. It also identifies and responds to security threats. Popular services include Azure Active Directory (AAD), Azure Key Vault, and others.
5. **Networking** - This component allows you to create a virtual private network (VPN) and connect to it securely. Only services that have access to the VPN may use the virtual machines established inside the VPN. On-premise and Azure data center connections may be established using this. Azure traffic manager also controls traffic among data centres. To minimize traffic, traffic management directs the process to use data from the closest data center.
6. ** Monitoring.** Azure monitoring services gather and analyze logs from the cloud and on-premise applications to improve the performance of the applications they monitor. While looking at the statistics produced by the Azure Monitoring service, it is utilized to discover areas for performance improvement. Metrics and logs are used to store all of the data gathered by apps.
7. **Web services** - Use of the Web Application Service allows you to deploy locally created web applications via the internet. Java,.NET, PHP, NodeJS, and other programming languages may be used to create these apps. Scalability, high availability, etc., are just a few of the benefits it provides. It's compatible with both Windows and Linux computers, which is another plus. The user has to worry about the development; Azure handles the implementation and upkeep. Web services are set to be public by default, making them accessible from anywhere in the Azure cloud.
8. **Mobile services** - This component serves as a backend for mobile apps. If your application gets a lot of daily traffic or has to store a lot of data, this is the way to go. To deliver alerts to phones, it offers a service called notification hubs. As an example of a provider, Notification Dash may connect to either Apple or Google. Connecting to the notifications hub requires SDKs. It may also be used to send a notice to a specific user, a group of users, or to notify everyone at once. As a result, it makes the job of the developer a lot simpler.
		
### ARM templates concept
Infrastructure-as-code may be delivered to an Azure environment quickly and repeatable using Azure Resource Manager (ARM) templates.

In a JSON file that the ARM API understands, we may provide the objects we want and their kinds, names, and properties.

>The critical benefit of using the ARM API is publishing numerous resources in a single JSON file. 
		
We declare the categories of resources, the names we intend to use for those resources, and the attributes of the resources in this file. The ARM API then assigns the indicated properties to those resources by creating new objects that match these details or changing an existing object if the resource name and type are the same.
		
However, the ARM API adds resources to Azure; no code or apps are added to the resources. Using an ARM template to deploy a virtual machine, we can use SQL Server already installed; however, we can't deploy or recover a database using an SSDT package.
		
### Uses of azure functions
- Tasks that have been scheduled
- Notifications and reminders
- Web API that isn't too heavy
- Emailing in the background
- Performing backup activities in the background
- Calculations in the backend

> Azure functions use triggers, and when an event is triggered, the task runs in the background. Therefore not all applications are subjected to using azure functions apps.
		
**Azure functions should be avoided if:**
- Multitasking.
- The function code contains too much-complicated logic.
- Substituting a set of Azure Functions Apps for an API.
- Using data from front-end applications while saving to and from backend databases.
		
### Azure functions vs Web jobs
It is possible to automate the execution of a program or script using Azure App Service's `WebJobs.` WebJobs may be broken down into two groups:
**Continuous**- Use a WebJob to check a shared folder for new pictures using a continuous loop.
**Triggered**- It's possible to run it on a schedule and also manually.
		
To test how WebJob responds in other languages, it may be run in those languages. Using a Shell Script as an example, we may script the `WebJob` (Windows, PowerShell, Bash). We may use the framework in conjunction with PHP, Python, Node.js, JavaScript and.NET to build an application.

An Azure Function is similar to a web job in many ways, except that you don't have to be concerned about the infrastructure while utilizing one.

Azure's usage plan automatically scales your function depending on demand, so you only pay when your code is actually executed.

They may be brought on by a wide range of things, including:
- **HTTPTrigger** - This function is invoked in response to an HTTP request.
- **TimerTrigger** - Allows for the execution of tasks on a set timetable.
- **BlobTrigger** - When you add a new blob to your Azure memory account.
- **CosmosDBTrigger** - In a NoSQL database, as a result of new or modified documentation.

In general, Azure Functions are more adaptable and straightforward to use. WebJobs, on the other hand, are a superior option in the following situations: 
- the script should be maintained as a component of a current App Service application, such as in the same Azure DevOps environment.
- You must have complete command in front of the object that waits for it to launch the operation of the code.

### Using Visual Studio 2019 to create an Azure Function
This section will go over how to use the Azure portal to build an Azure function. We must first construct a Function Ap in the Azure portal before creating an Azure Function. After that, we can use the Function App to develop various types of Azure Functions.
		
#### Creating function app using Azure portal
**Step 1a**:
To begin, we must first log in to the Azure portal. Then, from the Dashboard, select the Create a Resource option. Then, from the resource list, choose Function App options.
		
![Step 1a](/engineering-education/creating_and_using_azure_function/step_1a.png)
		
**Step 2a**:
To construct a function app, we must now supply the following choices in the `Create Function App` section.
- Resource group — Generate a new `Resource Group` or join an existing one from scratch.
- The name of the function app is contained in this field.
- Publish - Choose between `Code` and `Docker Container`. This option specifies the environment in which we want to run our function app. We'll use code for our demonstration.
- Runtime stack - We must choose which language to construct the Azure Function in. The programming language we choose is .NET.
- Version - When you choose `Runtime Stack` from the menu, the latest up-to-date version of that programming language is automatically selected in the version dropdown.
- Region - We must choose the region in which the data centre will be located.

After entering the values for the fields above, we must click the `Create + Review` Button. Then press the Create Button button.
		
![Step 2a](/engineering-education/creating-and-using-azure-function/step-2a.png)
		
**Step 3a**:
Once the Function App has been deployed, navigate to the function app, and it will appear as seen below.
		
![Step 3a](/engineering-education/creating-and-using-azure-function/step-3a.png)
		
**Step 4a**:
If we copy the Function App URL and paste it into a browser tab, it will show that our Function App is already up and running.

Our Function App is now available. Within this Function App, we must develop our first Azure Function.
		
#### Creating Azure Function using Azure Portal
**Step 1b**:
Now, under the Function App area, select the `Function` choices from the left-side menu panel.
		
![Step 1b](/engineering-education/creating-and-using-azure-function/step-1b.png)
		
**Step 2b**:
To create our first Azure Function, we'll need to follow the steps below.
- Select the `Add Button` option.
- Choose to `Develop in Portal` from the `Development Environment` dropdown menu.
- From the `Template List`, choose` HTTP Trigger Template`.
- Please provide the correct function name.
- Select `Add Button` from the dropdown menu.
		
![Step 2b](/engineering-education/creating-and-using-azure-function/step-2b.png)
		
**Step 3b**:
After the function has been deployed, select the `code + Test` option. Within the Azure portal, it will give us a test environment for the Azure Function. The default code template for the function, a C#-based function, is displayed first. That is something we can do if we wish to update the code.
		
**Step 4b**:
To run the result, select `Test/Run` from the dropdown menu.
		
#### How to Make an Azure Function using Visual Studio 2019
**Step 1c**:
To begin, open Microsoft Visual Studio 2019 and then select `Create New Project` from the dropdown menu.
		
**Step 2c**:
Select the `Azure Functions Project Template` from the `New Project Template List`, then click the next button.
		
![Step 2c](/engineering-education/creating-and-using-azure-function/step-2c.png)
		
**Step 3c**:
Now type in the project name and press the `Create` button.
**Step 4c**:
Choose `Azure Function Templates` from the dropdown menu. Then select `Create Button` from the dropdown menu.
		
![Step 4c](/engineering-education/creating-and-using-azure-function/step-4c.png)
		
**Step 5c**:
Now Create your solutions and then press `F5`. It will carry out the project, and the outcome will be as follows:
		
![Step 5c](/engineering-education/creating-and-using-azure-function/step-5c.png)
		
**Step 6c**:
Now copy the highlighted URL and paste it into your browser to check the output.
		`http://localhost:7071/api/Function1`
		
**Step 7c**:
To pass the name parameter, make the following changes to the URL:
`http://localhost:7071/api/Function1?name=Debasis%20Saha`
		
**Step 8c**:
The output changes to the following after changing the above URL:
		
![Output](/engineering-education/creating-and-using-azure-function/output.png)
		
### Conclusion
This tutorial discussed what is entailed in `Azure Functions` and compared the `Azure Function` with web jobs. As outlined in the tutorial, the step by step will enable you to handle Azure Function in Azure Portal and Visual Studio 2019.

Happy learning!

---
Peer Review Contributions by: [Miller Juma](/engineering-education/authors/miller-juma/)
