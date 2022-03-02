### Introduction

Microsoft Azure, commonly referred to as Azure, is a cloud computing service created by Microsoft for building, testing, deploying, and managing applications and services through Microsoft-managed data centers. It provides software as a service (SaaS), platform as a service (PaaS), infrastructure as a service(IaaS), and supports many different programming languages, tools, and frameworks, including both Microsoft-specific and third-party software and systems. This article demonstrates how to deploy an application into Azure App Service using Azure DevOps (VSTS) continuous integration/continuous delivery (CI/CD) pipeline.

### Table of Content

- [Introduction](#introduction)
- [Table of Content](#table-of-content)
- [Prerequisites](#prerequisites)
- [Objectives](#objectives)
- [What is Azure App Service?](#what-is-azure-app-service)
- [What is Azure DevOps?](#what-is-azure-devops)
- [Step 1: Creating Resource Group in Azure](#step-1-creating-resource-group-in-azure)
- [Step 2: Creating App Service](#step-2-creating-app-service)
- [Step 3: Creating Service Principal](#step-3-creating-service-principal)
- [Step 4: Create a New Project in VSTS](#step-4-create-a-new-project-in-vsts)
- [Step 5: Creating a Continuous Integration (CI) Build](#step-5-creating-a-continuous-integration-ci-build)
- [Step 6: Creating Continuous Delivery (CD) Pipeline](#step-6-creating-continuous-delivery-cd-pipeline)
- [Conclusion](#conclusion)
- [Further Reading](#further-reading)

Without further ado, let’s have a look at the requirement of this exercise:

### Prerequisites

- Azure Portal Account, Azure subscription, and Azure DevOps (VSTS) account.
- Azure Resource Group.
- Create a web app in Azure. Make note of the app service URL—you need it later.

### Objectives

In this article, you’ll create a sample environment to:

- New build based on code commit to your Azure DevOps Repo.
- Automatically deploy your app into Azure.

### What is Azure App Service?

From the official product description, Microsoft Azure App Service is a fully managed platform for building, deploying and scaling web apps. It is a PaaS (Platform as a service) that enables us to quickly deploy our app without worrying about infrastructure and performance. We can develop our favorite language, be it .NET, .NET Core, Java, Ruby, Node.js, PHP, or Python. Applications can be run and scaled with ease in both Windows and Linux-based environments. Azure App Service does not only add the power of Microsoft Azure to your application (security, load balancing, autoscaling, and automated management), but it also takes advantage of its DevOps capabilities, such as continuous deployment from Azure DevOps.

### What is Azure DevOps?

Azure DevOps is a Software as a service (SaaS) platform from Microsoft that provides an end-to-end DevOps toolchain for developing and deploying software. It has many inbuilt functionalities that allow teams to get up and running with managing projects and automating the workflows. Some key features in Azure DevOps are creating Build and Release pipelines for CI/CD automation, project board, organization, and code repository capabilities. Before we start, please have a look at the architecture diagram shown below. This diagram is probably the simplest form of any client-server architecture suited for smaller projects or exercise projects. We are using it only to demonstrate the deployment of any web application with the minimum
configuration.

![intro](/engineering-education/azure-devops-api-development/intro.png)

### Step 1: Creating Resource Group in Azure

Once you have a subscription in Azure, you need to create a `resource group` to manage resources in Azure. The best practice is to maintain a separate resource group for each environment (DEV, INT, QA, STAG, PERF, PROD) and follow the proper naming conventions. To create a resource group, select Resource Group from the left-side blade, `click on +Add`, then select `Subscription`, give a proper name to the resource group, and click on `Review + Create`. Refer to the image below.

![resource-group](/engineering-education/azure-devops-api-development/resource-group.jpg)

### Step 2: Creating App Service

Click on `All resources` from the left-side blade of the panel and click on `Add`, then select `Web App` and give a proper name to your app service. Then select `Subscription` and select the existing resource group. Keep the remaining option as default. and click on `Create`.

![creating-app-service](/engineering-education/azure-devops-api-development/creating-app-service.jpg)

Once you have created the app service, click on that app service and go to `Overview`. There you can identify all the details that belong to this app service, including status, resource group, subscription, and URL (please make a note of this; you’ll need it later).

![overview](/engineering-education/azure-devops-api-development/overview.jpg)

### Step 3: Creating Service Principal

When an application needs access to deploy or configure resources through ARM or VSTS in Azure, you’ll need to create a service principal, which is a credential for your application. Go to Azure `Active Directory -> App registrations -> New application registration`, then give a name to the service principle, select application type and give it a URL of your choice. After creating the app registration, go to `Settings` from that service and make note of application ID, then go to `Keys` create a key and copy the secret value. (Note: It doesn’t appear later, so please store it in a safe place.)

![service-principal](/engineering-education/azure-devops-api-development/service-principal.jpg)

![settings-keys](/engineering-education/azure-devops-api-development/settings-keys.jpg)

### Step 4: Create a New Project in VSTS

The first step is to create an account in Azure DevOps (VSTS), then follow the steps below to start an application deployment. Here we will take a [sample open-source java-based code](https://github.com/wakaleo/game-of-life) from GitHub repository and import it to Azure DevOps repo. (You can push your source code into the repo.) It is a simple multi-module Maven project. The application is a very simple online version of Conway’s `Game of Life.

![new-project](/engineering-education/azure-devops-api-development/new-project.jpg)

To create a `new project`, click on `Create new project`, give a proper `name` to your project, and select `create`. Then go to `Repos`, click on `Import`, then select source type, type in the above URL in the Clone URL tab, and select Import. The source code will import into your repository.

![repo](/engineering-education/azure-devops-api-development/repo.jpg)

We need to give service connections to our project, so go to project settings from the bottom of the blade in our project home directory and then select `Service Connections -> New Service connection -> Azure Resource Manager`. Click on “Use the full version of the service connection dialog” from the pop-up, then paste the Application ID into the `Service principal client ID` tab and the secret key value into the `Service principal key` tab (which you saved during app registration creation). Then click `OK`.

![service-connections](/engineering-education/azure-devops-api-development/service-connections.jpg)

### Step 5: Creating a Continuous Integration (CI) Build

Go to `Pipelines -> Build -> New Build Pipeline`, then click on Use the visual designer. It will ask for source code repo details, so select Azure Repos Git and select Team project, which you created at the start of the project, select Repository, and branch name, then click Continue.

![ci-build](/engineering-education/azure-devops-api-development/ci-build.jpg)

Next, select a template `Maven`, type in the pipeline name and select `Hosted VS2017` for the Agent pool, and click on `pom.xml` in the `Maven POM file`. There you can list the goal(s) as Clean Package and select Copy Files. At the contents section please enter `\*_/_.war` then go to Publish `Artifact`: drop, list the artifact name as `Gameoflife`, and keep all remaining options as default values. Then, under `Triggers`, select Enable continuous integration and give branch filters listed at right, which enables the continuous integration feature. Once a developer commits their changes into master, the CI build will trigger automatically. Refer to the images below.

![tasks](/engineering-education/azure-devops-api-development/tasks.jpg)

![triggers](/engineering-education/azure-devops-api-development/triggers.jpg)

![geme-of-life](/engineering-education/azure-devops-api-development/geme-of-life.jpg)

Once the configuration is complete, click on `Save` and `Queue` from the top of the pipeline to trigger a CI build. (Every commit into master will trigger a new build.)

### Step 6: Creating Continuous Delivery (CD) Pipeline

Go to `Pipelines -> Releases -> New Release Pipeline`, then select the template Azure App Service deployment, list the stage name as `DEV` and click on `Add` an artifact. Select project and source (build pipeline), then select default version as Latest, click on `Add`. Click on `Task` (below the DEV), select `Run on agent` and select agent pool as Hosted VS2017, then click on the `plus(+)` symbol, search for template File Rename and select the `.war` file from source file and give it the new name `ROOT.war`. The above is summarized by the images below.

![artefacts](/engineering-education/azure-devops-api-development/artefact.jpg)
![file-rename](/engineering-education/azure-devops-api-development/file-rename.jpg)

In the Display name box, list `Azure App` Service Deploy. In the Azure subscription field, you need to select a `service principal name` to authorize the resources. Then choose the App type and `App Service name`. In the `Package` or `folder selection`, select `war file` and rename it `ROOT.war`, because for java-based applications we need to deploy our app into a proper directory structure.

![display-name](/engineering-education/azure-devops-api-development/display-name.jpg)

Finally, select the template Azure App service manager and select the `Restart` option, making sure to select the same subscription and app service name you selected in the Azure app service deploy window. Click on `Save`, then click on `Release -> Create a release -> select artifact build number -> create`. The build will then trigger and deploy into the app service. Now, your code is successfully deployed into Azure App Service.

![releases](/engineering-education/azure-devops-api-development/releases.jpg)

You can access azure app service [URL](https://xyz-abc-webjob-01.azurewebsites.net) from any browser and you can check whether your code is deployed successfully or not using this [URL](https://xyz-abc-webjob-01.scm.azurewebsites.net.)

### Conclusion

We have successfully deployed our application on Azure using the Azure App service. We also have
integrated our repository to the web host with the help of Azure DevOps. Hopefully, this article will give
you some insight on using Azure and make your project deployment faster and simpler.

### Further Reading

- [Automation Test With Selenium, .NET And Azure DevOps](https://docs.microsoft.com/en-us/azure/devops/pipelines/test/continuous-test-selenium?view=azure-devops)
