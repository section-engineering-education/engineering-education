---
layout: engineering-education
status: publish
published: true
url: /azure-function-serverless-architecture-in-azure-portal/
title: Creating and Using Azure Function in Azure Portal and Visual Studio 2019
description: This tutorial discusses the features of Azure Functions and compares it with web jobs.
author: dickson-gitau
date: 2021-10-12T00:00:00-14:10
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/azure-function-serverless-architecture-in-azure-portal/hero.png
    alt: Azure Functions App Hero Image
---
We can create a serverless solution using Azure Functions. It requires less code, infrastructure, and maintenance costs. 
<!--more-->
Cloud platforms such as Azure provide us with the latest resources that we need to keep our apps functioning.    

### Table of contents
- [Features of Azure functions](#features-of-azure-functions)
- [Advantages of using Azure functions](#advantages-of-using-azure-functions)
- [ARM templates concept](#arm-templates-concept)
- [Uses of Azure functions](#uses-of-azure-functions)
- [Azure functions vs web jobs](#azure-functions-vs-web-jobs)
- [Creating a function app using Azure portal](#creating-function-app-using-azure-portal)
- [Creating Azure function using Azure portal](#creating-azure-function-using-azure-portal)
- [Using Visual Studio 2019 to create an Azure function](#using-visual-studio-2019-to-create-an-azure-function)
    
### Features of Azure functions
You could write your function code in whatever language you choose. Azure functions may be deployed on any platform that supports the `.NET` framework.

**Scalability**- Azure functions use a scalable compute-on-demand technique. These functions are dynamic so that new resources are automatically allocated to the service when the number of requests increases. When the requests decrease, extra resources and application instances are automatically terminated.

**Azure functions are small and don't require a server** - The application is designed to perform a specific task. It is lightweight by default. Azure functions are serverless, which means they may be deployed and run without using any Web servers or virtual machines.

Azure Functions can be deployed in various configurations including Linux, Windows, and containers. They are available and can be consumed by authorized applications.

Azure functions allow you to focus on delivering business value with serverless computing.

Nuget and NPM(Node Package Manager) may be used to add dependencies and enhance your application's logic respectively.

Azure functions support continuous integration and deployment using GitHub, Azure DevOps, Bitbucket, and other CI/CD approaches.

They use SSL Bindings, VNet integration, and OAuth providers to safeguard your functions. Active Directory, Facebook, Twitter, Google, and Microsoft may be authenticated using the OAuth standard.

It is easy to add Azure App Insight(AAI) to your app to monitor and analyze performance. Triggers and bindings also let your serverless apps react to events and communicate with other services.
    
### Advantages of using Azure Functions
- They are small and use few resources to deploy and run.
- They are serverless, which means you don't need to set up a web server in the cloud.
- When not in use, the app is compute-on-demand and consumes no resources.
- The app is a pay-per-use service. You don't have to pay anything if you're not using it.
- The app only runs when an event is triggered.
- The app is self-contained; therefore, it has no effect or interference with other applications.
- It's simple to create and deploy an app.
- Azure apps are easy to update and support.

### Examples of popular Azure Services
1. **Active directory in Azure**

Azure Active Directory (AD) is one of Microsoft's leading cloud computing technology. 

It helps in managing and protecting identities that anyone may use. The platform has excellent security measures.

2. **Azure CDN**

Azure Content Delivery Network (CDN) helps organizations to grow and thrive. Its server is built to accommodate numerous web apps and cloud services from Microsoft Azure. 

Azure CDN is used by many firms to transport material around the world safely.

3. **Azure data factory**

To automate data transmission and mobility in cloud computing, Azure Data Factory accepts data from different sources. 

Azure services such as Azure Machine Learning, Azure HDInsight Hadoop, and Azure Data Lake Analytics are used for computation. 

4. **Azure SQL**

When it comes to database administration, Azure SQL is a service model (PaaS). This means it takes care of most backend tasks like monitoring, patching, and updating itself. 

It's essential to include Azure SQL due to its efficiency. It only requires little human involvement.

5. **Azure Function**

Developers use Azure Functions to respond to events and attach to different systems. When using Azure Function, you only pay for the resources you use. 

With Azure Functions, businesses can execute code in response to different events without requiring the corresponding infrastructure.

### Components of Azure
1. **Compute**

It provides application development, hosting, and deployment services.

2. **Storage** 

When it comes to cloud data storage, Azure storage is a significant player. 

It offers a pay-as-you-go option so that users only pay for the resources they utilize. In addition, its storage capacity is almost infinite.

3. **Database**

This component provides SQL and NoSQL capabilities for data administration. Relational databases like SQL Server, Azure Database for MySQL, and others are supported, 

NoSQL databases like Cassandra may also be utilized. The Cosmos DB (document DB) is another supported option due to its speed and improved performance.

4. **Security and authentication** 

Authentication, authorization, key encryption, and other security-related tasks are handled by this component. It also identifies and responds to security threats. 

Popular services include Azure Active Directory (AAD), Azure Key Vault, and others.

5. **Networking** 

This component allows you to create a virtual private network (VPN) and connect to it securely. Only authorized services may use the virtual machines established inside the VPN. 

Connections may be established using On-premise and Azure data centers. Azure traffic manager also controls traffic among data centers. 

6. **Monitoring** 

Azure monitoring services gather and analyze logs from the cloud and on-premise applications to improve performance. 

Azure Monitoring service assists in identifying problematic areas for performance improvement. Metrics and logs are used to store all of the data collected by apps.

7. **Web services** 

The Web Application Service allows you to deploy locally created web applications. These apps can be created using Java, .NET, PHP, NodeJS, and other programming languages.

It's compatible with both Windows and Linux. The user has does not need to worry about the development. Azure handles the implementation and upkeep. 

Web services are set to be public by default. This makes them accessible from anywhere in the Azure cloud.

8. **Mobile services** 

This component serves as a backend for mobile apps. If your application receives a lot of requests or has to store a lot of data, this is the way to go. 

It offers a service called notification hubs to deliver alerts to phones. Notification Dash is supported by both Apple and Google. 
    
### ARM templates concept
Infrastructure-as-code may be delivered to an Azure environment quickly using Azure Resource Manager (ARM) templates.

We may provide the objects we want including their names, and properties in a JSON file.

> The benefit of using the ARM API is that it allows one to publish numerous resources from a single JSON file. 
    
The ARM API then assigns the indicated properties to those resources. This is achieved by creating new objects that match these details or changing an existing object if the resource name and type are the same.
    
However, though the ARM API adds resources to Azure, no code or apps are added to the resources. Using an ARM template to deploy a virtual machine, we can use the SQL server already installed. Nevertheless, we can't deploy or recover a database using an SSDT package.
    
### Uses of Azure functions
- Scheduling Tasks
- Notifications and reminders
- Emailing
- Performing backup activities
- Calculations in the backend

> Azure functions use triggers. When an event is triggered, the task runs in the background. Therefore not all applications are supported by Azure functions apps.
    
**Azure functions should be avoided if:**
- One is multitasking.
- The function code contains too much complicated logic.
- Substituting a set of Azure Functions Apps for an API.
- Using data from front-end applications while saving to and from backend databases.
    
### Azure functions vs Web jobs
It is possible to automate the execution of a program or script using Azure App Service's `WebJobs.` WebJobs may be broken down into two groups:

**Continuous**- It uses a WebJob to check a shared folder for new pictures using a continuous loop.

**Triggered**- It's possible to run it on a schedule and also manually.
    
A WebJob can adapt to different languages. For instance, we can use a Shell Script to modify the `WebJob` (Windows, PowerShell, Bash). 

We may also use the framework in conjunction with PHP, Python, Node.js, JavaScript, and .NET to build an application.

An Azure Function is similar to a web job in many ways, except that you don't have to be concerned about the infrastructure while utilizing one.

They may be brought on by a wide range of things, including:

- **HTTPTrigger** - This function is invoked in response to an HTTP request.
- **TimerTrigger** - Allows for the execution of tasks on a set timetable.
- **BlobTrigger** - It supports the addition of a new blob to your Azure memory account.
- **CosmosDBTrigger** - It occurs in a NoSQL database due to new or modified documentation.

In general, Azure Functions are more adaptable and straightforward to use. WebJobs, on the other hand, are a superior option in the following situations: 

- the script should be maintained as a component of a current App Service application.
- You must have complete command of the object to be executed.

### Creating an Azure Function using Visual Studio 2019
This section will discuss how to use the Azure portal to build an Azure function. 

We must first construct a Function App in the Azure portal before creating an Azure Function. We can then use the Function app to develop various types of Azure Functions.
    
### Creating function app using Azure portal

#### Step 1
To begin, we must first log in to the Azure portal. Then, from the Dashboard, select the `Create a Resource` option. Then, from the `resource list`, choose `Function App` options.
    
![Step 1a](/engineering-education/azure-function-serverless-architecture-in-azure-portal/step-1a.png)
    
#### Step 2
To construct a function app, we must now supply the following choices in the `Create Function App` section.

Generate a new `Resource Group` or join an existing one from scratch.

The name of the function app is contained in this field.

Next, choose between `Code` and `Docker Container`. This option specifies the environment in which we want to run our function app. We'll use code for our demonstration.

We must then choose which language to use in constructing the Azure Function. The programming language we choose is .NET.

When you choose `Runtime Stack` from the menu, the up-to-date version of that programming language is automatically selected in the version dropdown.

We must select a region in which the data center will be located.

After entering the values for the fields above, we must click the `Create + Review` Button. 

Then press the `Create Button` button.
    
![Step 2a](/engineering-education/azure-function-serverless-architecture-in-azure-portal/step-2a.png)
    
#### Step 3
Once the Function App has been deployed, it will appear as shown below.
    
![Step 3a](/engineering-education/azure-function-serverless-architecture-in-azure-portal/step-3a.png)
    
#### Step 4
If we copy the Function App URL and paste it into a browser tab, it will show that our Function App is already up and running.

Our Function App is now available. Within this Function App, we must develop our first Azure Function.
    
#### Creating Azure Function using Azure Portal
#### Step 1
Navigate to the Function App area, select the `Function` choices from the `left-side menu` panel.
    
![Step 1b](/engineering-education/azure-function-serverless-architecture-in-azure-portal/step-1b.png)
    
#### Step 2
To create our first Azure Function, we'll need to follow the steps below.
- Select the `Add Button` option.
- Choose `Develop in Portal` from the `Development Environment` dropdown menu.
- From the `Template List`, choose` HTTP Trigger Template`.
- Then provide the correct function name.
- Select `Add Button` from the dropdown menu.
    
![Step 2b](/engineering-education/azure-function-serverless-architecture-in-azure-portal/step-2b.png)
    
#### Step 3
After the function has been deployed, select the `code + Test` option. Within the Azure portal, it will give us a test environment for the Azure Function. 

The default code template for the function, a C#-based function, is displayed first. That is something we can do if we wish to update the code.
    
To run the result, select `Test/Run` from the dropdown menu.
    
#### How to Make an Azure Function using Visual Studio 2019
First, open Microsoft Visual Studio 2019 and then select `Create New Project` from the dropdown menu.
    
Select the `Azure Functions Project Template` from the `New Project Template List`, then click the `next` button.
    
![Step 2c](/engineering-education/azure-function-serverless-architecture-in-azure-portal/step-2c.png)
    
Now type in the project name and press the `Create` button.

Choose `Azure Function Templates` from the dropdown menu. Then select `Create Button` from the dropdown menu.
    
![Step 4c](/engineering-education/azure-function-serverless-architecture-in-azure-portal/step-4c.png)
    
Now `Create your solutions` and then press `F5`. It will run the project, and the outcome will be as follows:
    
![Step 5c](/engineering-education/azure-function-serverless-architecture-in-azure-portal/step-5c.png)

Now copy the highlighted URL and paste it into your browser to check the output.

```bash
http://localhost:7071/api/Function1
```
    
To pass the name parameter, make the following changes to the URL:

```bash
http://localhost:7071/api/Function1?name=Debasis%20Saha
```
    
The output should change, as shown below:
    
![Output](/engineering-education/azure-function-serverless-architecture-in-azure-portal/output.png)
    
### Conclusion
This tutorial discussed what is entailed in `Azure Functions` and compared the `Azure Function` with web jobs. This step-by-step guide will enable you to handle Azure Functions in Azure Portal and Visual Studio 2019.

Happy learning!

---
Peer Review Contributions by: [Miller Juma](/engineering-education/authors/miller-juma/)
