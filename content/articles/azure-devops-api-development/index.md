---
layout: engineering-education
status: publish
published: true
url: /azure-devops-api-development/
title: How to Deploy an Application into Azure App Service using Azure DevOps
description: This article will help the reader understand how to deploy an application into Azure App Service using Azure DevOps (VSTS) Continuous Integration/Continuous Delivery (CI/CD) pipeline.
author: bernard-mburu
date: 2022-04-06T00:00:00-01:00
topics: [Languages]
excerpt_separator: <!--more-->
images:

- url: /engineering-education/azure-devops-api-development/hero.jpg
  alt: Deploy an Application into Azure App Service Hero Image
---
Azure is a cloud computing service created by Microsoft for building, testing, deploying, and managing applications and services through Microsoft-managed data centers. 
<!--more-->
It provides software as a service (SaaS), platform as a service (PaaS), and infrastructure as a service(IaaS). It also supports many different programming languages, tools, and frameworks, including both Microsoft-specific and third-party software and systems. 

This article demonstrates how to deploy an application into Azure App Service using Azure DevOps (VSTS) Continuous Integration/Continuous Delivery000000 (CI/CD) pipeline.

### Table of contents
- [Prerequisites](#prerequisites)
- [Objectives](#objectives)
- [What is Azure app service?](#what-is-azure-app-service)
- [What is Azure DevOps?](#what-is-azure-devops)
- [Step 1 - Creating resource group in Azure](#step-1-creating-resource-group-in-azure)
- [Step 2 - Creating an app service](#step-2-creating-an-app-service)
- [Step 3 - Creating a service principal](#step-3-creating-service-principal)
- [Step 4 - Create a new project in VSTS](#step-4-create-a-new-project-in-vsts)
- [Step 5 - Creating a Continuous Integration (CI) build](#step-5-creating-a-continuous-integration-ci-build)
- [Step 6 - Creating Continuous Delivery (CD) pipeline](#step-6-creating-continuous-delivery-cd-pipeline)
- [Conclusion](#conclusion)
- [Further reading](#further-reading)

### Prerequisites
To follow along with this article, you need:
- [Azure Portal Account](https://azure.microsoft.com/en-us/), Azure subscription, and Azure DevOps (VSTS) account.
- Azure Resource Group.
- You should also create a web app in Azure and take note of the app's service URL since you will need it later.

### Objectives
In this article, you'll create a sample environment to:

- Generate a new build based on code commits to your Azure DevOps repository.
- Automatically deploy your app to Azure.

### What is Azure App Service?
From the official product description, the Azure App Service is a fully managed platform for building, deploying, and scaling web apps. 

It is a PaaS (Platform as a service) that enables us to quickly deploy our app without worrying about infrastructure and performance. 

We can develop software using our favorite language, be it .NET, .NET Core, Java, Ruby, Node.js, PHP, or Python. 

Applications can run and scale with ease on both Windows and Linux-based environments. Azure App Service does not only add the power of Microsoft Azure to your application (security, load balancing, autoscaling, and automated management) but also takes advantage of its DevOps capabilities, such as continuous deployment.

### What is Azure DevOps?
Azure DevOps is a Software as a service (SaaS) platform from Microsoft that provides an end-to-end DevOps toolchain for developing and deploying software. It has many inbuilt functionalities that allow teams to manage projects and automate workflows. 

Some key features in Azure DevOps include creating build and release pipelines for CI/CD automation, project board, organization, and code repository capabilities. 

Before we get started, take a look at the architecture diagram shown below. This diagram is probably the simplest form of any client-server architecture suited for smaller projects. 

> Note that we are using this architecture to demonstrate the deployment of any web application with the minimum configuration.

![Intro](/engineering-education/azure-devops-api-development/intro.jpg)

### Step 1 - Creating a Resource Group in Azure
Once you have an Azure subscription, you need to create a `resource group` to manage resources. The best practice is to maintain a separate resource group for each environment (DEV, INT, QA, STAG, PERF, PROD) and follow the proper naming conventions. 

To create a resource group, select `Resource Group` from the left-side window, click on `Add`, then select `Subscription`.

Name the resource group, and click on `Review + Create`. Refer to the image below:

![Resource-group](/engineering-education/azure-devops-api-development/resource-group.jpg)

### Step 2 - Creating an App Service
Click on `All resources` from the left side of the panel and click on `Add`, then select `Web App` and give a proper name to your app service. 

Next, select `Subscription` and choose the existing `resource group`. Keep the remaining option as default and then click on `Create`.

![Creating-app-service](/engineering-education/azure-devops-api-development/creating-app-service.jpg)

Once the app service is created, click on it and navigate to `Overview`. There you can select all details that belong to the app service, including *status, resource group, subscription*, and *URL*.

![Overview](/engineering-education/azure-devops-api-development/overview.jpg)

### Step 3 - Creating the Service Principal
When an application needs access to deploy or configure resources through ARM or VSTS in Azure, you’ll need to create a service principal. 

Go to Azure *Active Directory -> App registrations -> New application registration*, then name the service principle, select *application type* and give it a *URL* of your choice. 

After creating the *app registration*, go to `Settings` from that service and take note of the app's ID. Next, navigate to the `Keys` section and generate a key and copy the *secret value*. (Remember to store the key properly.)

![Service-principal](/engineering-education/azure-devops-api-development/service-principal.jpg)

![Settings-keys](/engineering-education/azure-devops-api-development/settings-keys.jpg)

### Step 4 - Create a new project in VSTS
The first step is to create an account in Azure DevOps (VSTS), then follow the steps below to start application deployment. 

We will use a [sample open-source Java-based code](https://github.com/wakaleo/game-of-life) from GitHub and import it to the Azure DevOps repo. It is a simple multi-module Maven project. This application is an online version of Conway’s `Game of Life`.

![New-project](/engineering-education/azure-devops-api-development/new-project.jpg)

To create a `new project`, click on `Create new project` and give a proper `name` to your project then select `create`. 

Next, navigate to the `Repos` section, click on `Import`, then select `source type`. Type in the `URL` that you saved earlier in the `Clone URL` tab, and select `Import`. The source code will be imported into your repository.

![Repo](/engineering-education/azure-devops-api-development/repo.jpg)

We need to allow `service connections` in our project. Navigate to the project settings from the bottom of the window in our project's home directory and then select *Service Connections -> New Service connection -> Azure Resource Manager*. 

Click on the `Use the full version of the service connection dialog` from the pop-up, then paste the `Application ID` into the `Service principal client ID` tab.

Also, add the secret key value into the `Service principal key` tab (which you saved during app registration creation) and click `OK`.

![Service-connections](/engineering-education/azure-devops-api-development/service-connections.jpg)

### Step 5 - Creating a Continuous Integration (CI) Build
Go to `Pipelines -> Build -> New Build Pipeline`, then click on `Use the visual designer`. 

You will be prompted for the source code repo details. Therefore, select `Azure Repos Git` and the `Team project` that you created earlier. Next, click on *Repository -> branch name*, then press *Continue*.

![CI-build](/engineering-education/azure-devops-api-development/ci-build.jpg)

The next step is to choose the `Maven` template, type in the pipeline name, and select `Hosted VS2017` as the Agent pool. Finally, click on `pom.xml` in the `Maven POM file`. 

There you can list the goal(s) as `Clean Package` and select `Copy Files`. At the `contents` section, enter `\*_/_.war` then navigate to `Publish Artifact`. 

List the artifact name as `Gameoflife`, and keep all remaining options as default values. 

Under `Triggers`, select *Enable Continuous Integration* and provide branch filters.

Once a developer commits their changes into master, the CI build will trigger automatically. Refer to the images below:

![tasks](/engineering-education/azure-devops-api-development/tasks.jpg)

![triggers](/engineering-education/azure-devops-api-development/triggers.jpg)

![geme-of-life](/engineering-education/azure-devops-api-development/geme-of-life.jpg)

Once the configuration is complete, click on `Save` and `Queue` on top of the pipeline to trigger a CI build. Each commit into master will trigger a new build.

### Step 6 - Creating Continuous Delivery (CD) Pipeline
Navigate to *Pipelines -> Releases -> New Release Pipeline*, then select the Azure App Service deployment template.

List the stage name as `DEV` and click on `Add` an artifact. Select project and source (build pipeline), then choose the default version and press `Add`. 

Next, click on `Task` (below the DEV), select `Run on agent` and select `agent pool` as `Hosted VS2017`.

Press the `plus(+)` symbol and search for the `template` file. You need to rename the file as `ROOT.war` and choose the `.war` extension from the source directory. These steps are summarized in the images below:

![Artefacts](/engineering-education/azure-devops-api-development/artefact.jpg)
![File-rename](/engineering-education/azure-devops-api-development/file-rename.jpg)

In the `Display name box`, add `Azure App Service Deploy`. In the `Azure subscription` field, you need to select a `service principal name` to authorize the resources. 

Then choose the `App type` and `App Service name`. In the `Package` or `folder selection`, select `.war file` and rename it `ROOT.war`. This is because for Java-based applications we need to deploy the app into a proper directory structure.

![Display-name](/engineering-education/azure-devops-api-development/display-name.jpg)

Finally, select the `Azure App service` template and press on the `Restart` option. Ensure that you choose the same subscription and app service name you used in the `Azure app service deploy` window. 

Click on `Save`, then on *Release -> Create a release -> select artifact build number -> create*. 

The build will then trigger and deploy into the app service. The code is now successfully deployed into the `Azure App Service`.

![Releases](/engineering-education/azure-devops-api-development/releases.jpg)

You can access the Azure app service [URL](https://xyz-abc-webjob-01.azurewebsites.net) from any browser.

To check whether your code is deployed successfully or not, use this [URL](https://xyz-abc-webjob-01.scm.azurewebsites.net.)

### Conclusion
We have successfully deployed our application on Azure using the Azure app service. We have also
integrated our repository to the web host with the help of Azure DevOps. 

Hopefully, this article gave you some insight on using Azure and make your project deployment faster and simpler.

### Further Reading
- [Automation Test With Selenium, .NET And Azure DevOps](https://docs.microsoft.com/en-us/azure/devops/pipelines/test/continuous-test-selenium?view=azure-devops)

---
Peer Review Contributions by: [Wanja Mike](/engineering-education/authors/michael-barasa/)
