### Introduction

We may construct a serverless solution using Azure functions, which has the advantages of requiring less code, requiring less infrastructure upkeep, and cutting costs. So, despite putting a lot of effort into application deployments and server maintenance, cloud infrastructure like Azure provides us with all of the latest resources we need to keep our apps functioning.
A fantastic example of Serverless architecture or computes service is an Azure Function. We can run event-based programs using Azure Function without having to manage any infrastructure. Because the Azure function is a trigger-based service, it always runs a script that contains a block of code in reaction to various events. Decoupling, fast throughput or responsiveness, reusability of code, and so on may all be accomplished with an Azure Function. Azure functions is a cloud-native design technique that allows you to deploy and run code without the requirement for server infrastructure, a web server, or any other setups.
C#, Java, JavaScript, TypeScript, and Python are just a few of the languages that Azure Functions are available in.

### Table of contents

- [Features of azure functions](#features-of-azure-functions)
- [Advantages of using Azure Functions](#advantages-of-using-azure-functions)
- [ARM templates concept](#arm-templates-concept)
- [Uses of azure functions](#uses-of-azure-functions)
- [Azure functions vs Web jobs](#azure-functions-vs-web-jobs)
- [Creating Function App using Azure Portal](#creating-function-app-using-azure-portal)
- [Creating Azure Function using Azure Portal](#creating-azure-function-using-azure-portal)
- [How to Make an Azure Function using Visual Studio 2019](#how-to-make-an-azure-function-using-visual-studio-2019)

#### Features of azure functions

1. You could write your function code in whatever language you choose, such as C#, Java, JavaScript, Powershell, or Python. Azure Functions may be deployed and run on any platform that supports the.NET Core programming language.

2. *Scalability*-Azure functions make use of compute-on-demand, which is designed to be scalable. When the number of requests for execution increases, new resources is automatically allocated to the service, and when the number of requests decreases, all extra resources and application instances are automatically terminated.

3. *Azure functions are small and don't require a server*-Azure functions app is designed to perform a specific task, it is lightweight by default. Azure functions are serverless, which means they may be deployed and run without the use of any Web servers or virtual machines.

4. Azure Functions can be deployed in a variety of configurations, including Linux, Windows, and containers, but they are available and can be consumed by any application that has access to the function.

5. Serverless allows you to focus on adding business value rather than managing infrastructure.

6. Custom development - Use Nuget and NPM to add your dependencies and enhance your application logic.

7. Continuous Integration and Deployment - Use GitHub, Azure DevOps, Bitbucket, and other CI/CD methods to set up continuous integration and deployment for your function code.

8. Built-in security - To protect your functions, use SSL Bindings, VNet integration, and OAuth providers. You may authenticate users from Active Directory, Facebook, Twitter, Google, and Microsoft using the OAuth standard.

9. Optimized Pricing – You only pay while your app is running.

10. Performance and Monitoring - Easily add Azure App Insight to your app for performance monitoring and analysis.

11. To allow your serverless apps to respond to events and connect to other services, use triggers and bindings.

### Advantages of using Azure Functions

- The Azure functions app is small and uses very few resources to deploy and run.
- The Azure Functions app is serverless, which means it doesn't require you to set up a Web server in the cloud.
- When not in use, the Azure functions app is compute-on-demand and consumes no resources.
- The Azure functions app is a pay-per-use service, so you don't have to pay anything if you're not using it.
- The Azure functions app is event-driven, meaning it only runs when an event is triggered.
- The Azure Functions app is self-contained and does not affect or interfere with other applications.
- It's simple to create and deploy an Azure functions app.
- It has a simplicity to update and support.
- The Azure functions app is industry-standard, including industry-standard language and technologies for development and consumption.

### ARM templates concept

`Azure Resource Manager` (ARM) templates are one of the ways to deliver infrastructure-as-code to an Azure environment in a simple and repeatable manner.
The Azure App Service Environment is a component of the Azure App Service that provides a fully isolated and dedicated environment for running App Service apps safely at scale.
We can define the objects we desire, along with their types, names, and properties, in a JSON file that the ARM API can understand.
The key benefit of using the ARM API is that it allows us to publish numerous resources in a single JSON file. We declare the categories of resources, the names we intend to use for those resources, and the attributes of the resources in this file. The ARM API then assigns the indicated properties to those resources, either by creating new objects that match these details or by changing an existing object if the resource name and type are the same.
The ARM API adds resources to Azure, but it doesn't add any code or applications on those resources. For example, we can deploy a virtual machine with SQL Server already installed using an ARM template, but we can't deploy or restore a database using an SSDT package using an ARM template.

### Uses of azure functions

- Tasks that have been scheduled
- Notifications and Reminders
- Web API that isn't too heavy
- emailing in the background
- Performing backup activities in the background
- Calculations in the backend

>Azure functions make use of triggers, and when an event is triggered, the task is run in the background. Therefore not all applications are subjected to using azure functions apps.

**Azure functions should be avoided if:**

- Multitasking
- The function code contains too much-complicated logic.
- Substituting a set of Azure functions apps for an API
- Using data from front-end applications while saving to and from back-end databases.

### Azure functions vs Web jobs

`WebJobs` is a component of the Azure App Service that you may use to automate the execution of a program or script. WebJobs are divided into two categories:

**Continuous**- For example, a continuous WebJob could be used to check for new images in a shared folder.

**Triggered**- It's possible to run it manually or on a schedule.

You can write code in a variety of languages to determine the behaviours of your WebJob. You can script the WebJob by coding in a Shell Script, for example (Windows, PowerShell, Bash). Alternatively, you can use any of the framework's programming languages to develop an application, including PHP, Python, Node.js, JavaScript, and.NET.

An Azure Function is similar to a WebJob in many ways, with the main difference being that you don't have to worry about the infrastructure.
With the consumption plan, Azure will automatically scale your function in response to demand, and you will only be charged for the time it takes your code to execute.

They can be triggered by a variety of factors, such as:

- **HTTPTrigger**- In response to an HTTP request, this function is called.
- **TimerTrigger**- Allows for the execution of tasks on a set timetable.
- **BlobTrigger**- When you add a new blob to your Azure Storage account.
- **CosmosDBTrigger**- In a NoSQL database, in response to new or changed documents.

Azure Functions are more flexible and easier to manage in general. WebJobs, on the other hand, are a better choice when: - the code has to be maintained as part of an existing App Service application, such as in the same Azure DevOps environment. - You must have total control over the object that listens for events that trigger the execution of the code.

### How to Make an Azure Function using Azure Portal

In this section, we'll go over how to use the Azure Portal to build an Azure function. We must first construct a Function App in Azure Portal before we can create an Azure Function. After that, we can use the Function App to develop various types of Azure Functions.

#### Creating Function App using Azure Portal

**Step 1a**:

To begin, we must first log into the Azure Portal. From the Dashboard, select the Create a Resource option. Then, from the resource list, choose Function App options.

![Step 1a](engineering-education-creating-and-using-azure-function-step-1a.png)

**Step 2a**:

To construct a function app, we must now supply the following choices in the Create Function App section.

- Resource Group — Choose an existing Resource Group or create one from scratch.
- The name of the function app is contained in this field.
- Publish - Choose between Code and Docker Container. This option specifies the environment in which we want to run our function app. We'll use Code for our demonstration.
- Runtime Stack - We must choose which language to construct the Azure Function in. The programming language we choose is.NET.
- Version-When you choose Runtime Stack from the menu, the most recent version of that programming language is automatically selected in the version dropdown.
- Region - We must choose the region in which the data centre will be located.
After entering the values for the aforementioned fields, we must click the Create + Review Button. Then press the Create Button button.

![Step 2a](engineering-education-creating-and-using-azure-function-step-2a.png)

**Step 3a**:

Once the Function App has been deployed, navigate to the function app and it will appear as seen below.

![Step 3a](engineering-education-creating-and-using-azure-function-step-3a.png)

**Step 4a**:

If we copy the Function App URL and paste it into a browser tab, it will show that our Function App is already up and running.

Our Function App is now available. Within this Function App, we must develop our first Azure Function.

#### Creating Azure Function using Azure Portal

**Step 1b**:

Now, under the Function App area, select the Function choices from the left-side menu panel.

![Step 1b](engineering-education-creating-and-using-azure-function-step-1b.png)

**Step 2b**:

To create our first Azure Function, we'll need to follow the steps below.

- Select the Add Button option.
- Choose to Develop in Portal from the Development Environment drop-down menu.
- From the Template List, choose HTTP Trigger Template.
- Please provide the correct function name.
- Select Add Button from the drop-down menu.

![Step 2b](engineering-education-creating-and-using-azure-function-step-2b.png)

**Step 3b**:

After the function has been deployed, select the Code + Test option. Within the Azure Portal, it will give us a test environment for the Azure Function. The default code template for the function, which is a C#-based function, is displayed first. That is something we can do if we wish to update the code.

**Step 4b**:

To run the result, select Test/Run from the drop-down menu.

#### How to Make an Azure Function using Visual Studio 2019

**Step 1c**:

To begin, open Microsoft Visual Studio 2019 and then select Create New Project from the drop-down menu.

**Step 2c**:

Select the Azure Functions Project Template from the New Project Template List, then click the Next button.

![Step 2c](engineering-education-creating-and-using-azure-function-step-2c.png)

**Step 3c**:

Now type in the project name and press the Create button.

**Step 4c**:

Choose Azure Function Templates from the drop-down menu. Then select Create Button from the drop-down menu.

![Step 4c](engineering-education-creating-and-using-azure-function-step-4c.png)

**Step 5c**:

Now Create your solutions and then press F5. It will carry out the project, and the outcome will be as follows:

![Step 5c](engineering-education-creating-and-using-azure-function-step-5c.png)

**Step 6c**:

Now copy the highlighted URL and paste it into your browser to check the output.
`http://localhost:7071/api/Function1`

**Step 7c**:

To pass the name parameter, make the following changes to the URL:
`http://localhost:7071/api/Function1?name=Debasis%20Saha`

**Step 8c**:

The output changes to the following after changing the above URL:

![Output](engineering-education-creating-and-using-azure-function-output.png)

### Conclusion

In this tutorial, I have discussed what is entailed in Azure Functions as well as comparing Azure function with WEB Jobs. The step by step as outlined in the tutorial will enable you to handle Azure Function in Azure Portal and Visual Studio 2019.

Happy learning!
