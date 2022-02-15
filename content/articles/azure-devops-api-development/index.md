### Introduction

Azure Continous Integration and Continous Deployment automates software development procedures to boost speed, scalability, and quality of software endevaours. In this article, we will learn how to use Azure DevOps to establish continuous integration and continuous deployment to a `.NET API`.

### Table of content

- [Introduction](#introduction)
- [Table of content](#table-of-content)
- [Objectives](#objectives)
- [Pre-requisites](#pre-requisites)
- [Step 1: Creating a .NET DevOps Project using Azure DevOps Starter](#step-1-creating-a-net-devops-project-using-azure-devops-starter)
- [Step 2: Examine the CI/CD pipelines configured by Azure DevOps Project](#step-2-examine-the-cicd-pipelines-configured-by-azure-devops-project)
- [Step 3: Commit the code changes and execute CI/CD](#step-3-commit-the-code-changes-and-execute-cicd)
- [Conclusion](#conclusion)
- [Further Reading](#further-reading)

### Objectives

- Set Up Azure and Devops in our local machines
- Continous Integration /Continous Deplyment Pipeline set-up and configuration
- Execute a Project in Devops

### Pre-requisites

- Account on [Azure DevOps](https://azure.microsoft.com/en-us/services/devops/) Services and [Azure Portal](https://azure.microsoft.com/en-us/account/)
- SQL Server Database.

### Step 1: Creating a .NET DevOps Project using Azure DevOps Starter

Azure DevOps project simplifies the setup of CI/CD pipelines in Azure. You can go with the existing code or create a sample application as a new Azure DevOps project.
In this section, we will create a new DevOps project by following the steps outlined below:

1. Sign into the [Microsoft Azure portal](https://azure.microsoft.com/en-us/account/).

2. In the search box, type DevOps , and then select DevOps Starter. Then click on Create DevOps Starter.
   ![searchdevopsstarter](/engineering-education/azure-devops-api-development/searchdevopsstarter.png)
   ![createdevopstarter](/engineering-education/azure-devops-api-development/createdevopsstarter.png)
3. By default DevOps Starter project setup with GitHub. Click on change settings here to change the destination to Azure DevOps and click Done as illustrated below
   ![changesettings](/engineering-education/azure-devops-api-development/changesettings.png)
4. Now select the .NET sample application and click Next.
   ![selectdotnet](/engineering-education/azure-devops-api-development/selectdotnet.png)
5. The .NET samples include a choice of either the open source ASP.NET framework or the cross-platform .NET Core framework. Select the .NET Core application framework. This sample is an ASP.NET Core MVC application. And also enable Add a database toggle to add the database to the application. When you’re done, choose Next.
   ![aspnetframework](/engineering-education/azure-devops-api-development/aspnetframework.png)
6. Web App on Windows is the default deployment target. You can optionally choose Virtual Machine also. When you’re done, choose Next.
   ![selectwebapp](/engineering-education/azure-devops-api-development/selectwebapp.png)
7. Select your Azure DevOps organization and choose a name for your project and Web app. When you’re done, choose `Review + Create` as seen in the figure below.
   ![vstsprroject](/engineering-education/azure-devops-api-development/vstsproject.png)
   You can click on Additional Settings if you would like to edit web app and database parameters.
   ![additionalsettings](/engineering-education/azure-devops-api-development/additionalsettings.png)
8. Once the deployment completes, click Go to resource.
   ![gotoresource](/engineering-education/azure-devops-api-development/gotoresource.png)
9. DevOps project dashboard loads as shown in below image.
   **DevOps project**

- Created a team project with sample .NET code repository

- Created a build and release pipelines to compile, test and deploy the application

- Created Azure Web App and Azure SQL database in Azure using Azure Pipelines

If Azure Resources are not created, they will be created by CI/CD pipeline. You can track pipeline status in ‘CI/CD pipeline’ section. You’re now ready to collaborate with a team on an ASP.NET Core app with a CI/CD process that automatically deploys your latest work to your web site.

![dashboard](/engineering-education/azure-devops-api-development/dashboard.png) 10. On the right side of the dashboard, select Browse to view your running application.
![browsewebapp](/engineering-education/azure-devops-api-development/browsewebapp.png)
The web app looks like as shown in the below figure
![webapp](/engineering-education/azure-devops-api-development/webapp.png)

### Step 2: Examine the CI/CD pipelines configured by Azure DevOps Project

The Azure DevOps Starter project automatically configured a full CI/CD pipeline in your Azure DevOps organization. You can explore and customize the pipeline as needed. Follow the steps below to familiarize yourself with the Azure DevOps build and release pipelines.

1. Select Build Pipelines from the top of the Azure DevOps project dashboard. This link opens a browser tab and the Azure DevOps build pipeline for your new project.
   ![buid-pipelines](/engineering-education/azure-devops-api-development/buildpipelines.png)
2. Customize
   ![editbuid](/engineering-education/azure-devops-api-development/editbuild.png)
3. In this pane, you can examine the various tasks for your build pipeline. This build pipeline performs various tasks such as fetching sources from the Git repository, restoring dependencies, compile the application, run tests and publishing outputs used for deployments.
   ![builddefination](/engineering-education/azure-devops-api-development/builddefinition.png)
4. Under your build pipeline name, select History. You see an audit trail of your recent changes for the build. Azure DevOps keeps track of any changes made to the build definition and allows you to compare versions.

5. Select Triggers. The Azure DevOps project automatically created a CI trigger and every commit to the repository initiates a new build. You can optionally choose to include or exclude branches from the CI process.
   ![triggers](/engineering-education/azure-devops-api-development/triggers.png)
6. Select Releases under Pipelines section.
   ![selectreleases](/engineering-education/azure-devops-api-development/selectreleases.png)
   The Azure DevOps project created a release pipeline to manage deployments to Azure.
7. Select the release pipeline, then choose Edit.
   ![editrelease](/engineering-education/azure-devops-api-development/editrelease.png)
8. Under Artifacts, select Drop. The build pipeline you examined in the previous steps produces the output used for the artifact.
   ![releasedefination](/engineering-education/azure-devops-api-development/releasedefinition.png)
9. To the right-hand side of the Drop icon, select the Continuous deployment trigger. This release pipeline has an enabled CD trigger, which executes a deployment every time there is a new build artifact available. Optionally, you can disable the trigger, when your deployments require manual execution.
   ![cdtrigger](/engineering-education/azure-devops-api-development/cdtrigger.png)
10. Select Tasks. The tasks are the activities your deployment process performs. In this example, you have five tasks.
    ![viewtask](/engineering-education/azure-devops-api-development/viewtasks.png)
    ![releasetask](/engineering-education/azure-devops-api-development/releasetasks.png)

    - **Azure Resource Group Deployment** task deploy the required Azure resources, Azure Web app and Azure SQL database for the application to use.
    - **Azure App Service Deploy** task deploy the application package to the web site
    - **Azure SQL Database deployment** task deploy SQL changes to the database.
    - **Visual Studio Test** tasks run functional tests after the successful deployment of the application

11. On the right-hand side of the browser, select View releases. This view shows a history of releases.
    ![viewreleases](/engineering-education/azure-devops-api-development/viewreleases.png)
    ![releaseshistory](/engineering-education/azure-devops-api-development/releasehistory.png)
12. Click on the release number to view the release summary. There are several menus to explore from this view such as a release summary, associated work items, and tests.
    ![releasesummary](/engineering-education/azure-devops-api-development/releasesummary.png)
13. Select **Logs**. The logs contain useful information about the deployment process. They can be viewed both during and after deployments.

### Step 3: Commit the code changes and execute CI/CD

The Azure DevOps project created a Git repository in your Azure DevOps organization. Follow the steps below to view the repository and make code changes to your application.

1. Select Repos to view the created Git repository by Azure DevOps project.
   ![codetab](/engineering-education/azure-devops-api-development/codetab.png)
2. To view the repository clone URL, select Clone from the top right of the browser. You can clone your Git repository in your favourite IDE. In this lab, you can use the web browser to make and commit code changes directly to the master branch.
   ![cloneurl](/engineering-education/azure-devops-api-development/cloneurl.png)
3. On the left-hand side of the browser, navigate to the Application/aspnet-core-dotnet-core/Pages/Index.cshtml file. Select Edit, and make a change.
   ![editcode](/engineering-education/azure-devops-api-development/editcode.png)

   ![addcode](/engineering-education/azure-devops-api-development/addcode.png)
   Make a change to the h2 heading. For example, type Get started right away with the Azure DevOps Projects or make some other change. Choose Commit, to save and check-in your changes.

4. In your browser, navigate to the Pipelines | Pipelines. You should now see a build is in progress. The changes you just made are automatically built and deployed via Azure DevOps CI/CD pipelines.
   ![buildqueue](/engineering-education/azure-devops-api-development/buildqueue.png)

5. Once the Build and Release are completed in your browser, navigate to the Azure DevOps project dashboard. On the right side of the dashboard, select Browse to view your updated running application. You will see the updated header in the web app.
   ![browsewebapp1](/engineering-education/azure-devops-api-development/bwebapp.png)
   ![updatesite](/engineering-education/azure-devops-api-development/updatedsite.png)

### Conclusion

Azure DevOps empowers organizations to plan smarter, collaborate faster, and ship better inside the set of dev services. The automated Pipeline setup also offers the test, build, and deployment of the application in an easeful manner. This brings the article to a close i hope you can build and deploy azure devops api like a pro.

### Further Reading

- [Automation Test With Selenium, .NET And Azure DevOps](https://docs.microsoft.com/en-us/azure/devops/pipelines/test/continuous-test-selenium?view=azure-devops)
