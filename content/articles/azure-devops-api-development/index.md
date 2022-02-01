### Introduction

Azure Continous Integration and Continous Deployment automates software development procedures to boost speed, scalability, and quality. In this article,to demonstrate Azure Continous Integration and Continous Deployment, we'll use a Devops starter project.

### Table of content

- [Introduction](#introduction)
- [Table of content](#table-of-content)
- [Objectives](#objectives)
- [Pre-requisites](#pre-requisites)
- [Step 1: Environment set-up](#step-1-environment-set-up)
- [Step 2: Set-up and configuration Phase](#step-2-set-up-and-configuration-phase)
- [Step 3: Execiton Phase](#step-3-execiton-phase)
- [Conclusion](#conclusion)

### Objectives

- Set Up Azure and Devops in our local machines
- Continous Integration /Continous Deplyment Pipeline set-up and configuration
- Execute a Project in Devops

### Pre-requisites

Before reading this article ensure you have the following accounts.

- [Azure Devops account](https://azure.microsoft.com/en-us/services/devops/).
- [Microsoft Azure account](https://azure.microsoft.com/en-us/account/).

### Step 1: Environment set-up

1. To get started, you'll need to check in to the [Azure](https://azure.microsoft.com/en-us/services/devops/) website first.

2. To get started with Devops, we'll look for it in the search bar and cofigure it as shown below.
   ![searchdevopsstarter](/engineering-education/azure-devops-api-development/searchdevopsstarter.png)
   ![createdevopstarter](/engineering-education/azure-devops-api-development/createdevopsstarter.png)
3. Next, we'll make a few adjustments, as illustrated in the diagram below.
   ![changesettings](/engineering-education/azure-devops-api-development/changesettings.png)
4. Now that our settings are configured, we can pick our example application.
   ![selectdotnet](/engineering-education/azure-devops-api-development/selectdotnet.png)
5. The sample that we just selected is database-capable, making it excellent for storing our information.
   ![aspnetframework](/engineering-education/azure-devops-api-development/aspnetframework.png)
6. Although a virtual machine may replace a physical computer as a deployment target, we prefer it.
   ![selectwebapp](/engineering-education/azure-devops-api-development/selectwebapp.png)
7. Once you've completed your project, you'll need to think about what you want to call it, as seen in the figure below.
   ![vstsprroject](/engineering-education/azure-devops-api-development/vstsproject.png)
   Below is how you can set your extra preferences
   ![additionalsettings](/engineering-education/azure-devops-api-development/additionalsettings.png)
8. We're all set now that we've finished our setup. We'll begin on the resources panel.
   ![gotoresource](/engineering-education/azure-devops-api-development/gotoresource.png)
9. Here is our sample project sample.
   ![dashboard](/engineering-education/azure-devops-api-development/dashboard.png)
10. Projects progress.
    ![browsewebapp](/engineering-education/azure-devops-api-development/browsewebapp.png)
    You should see the following
    ![webapp](/engineering-education/azure-devops-api-development/webapp.png)

### Step 2: Set-up and configuration Phase

1. When we choose Build Pipelines from our project dashboard, a new project tab will open.
   ![buid-pipelines](/engineering-education/azure-devops-api-development/buildpipelines.png)
2. Customize
   ![editbuid](/engineering-education/azure-devops-api-development/editbuild.png)
3. Your pipeline's many components are set up and defined in detail during this phase of your project.
   ![builddefination](/engineering-education/azure-devops-api-development/builddefinition.png)
4. The next step is to double-check your project's version and specs, as well as any modifications you've included.

5. When our project was initiated to Azure devops it generated a trigger that will enable us decide which version to keep or not keep in Continous Integration process
   ![triggers](/engineering-education/azure-devops-api-development/triggers.png)
6. Releases phase
   ![selectreleases](/engineering-education/azure-devops-api-development/selectreleases.png)
7. Release customization.
   ![editrelease](/engineering-education/azure-devops-api-development/editrelease.png)
8. In this section, we'll be able to see the defintion we set up in the previous phases.
   ![releasedefination](/engineering-education/azure-devops-api-development/releasedefinition.png)
9. This is where the triggers we established before will be used to conduct your deployment..
   ![cdtrigger](/engineering-education/azure-devops-api-development/cdtrigger.png)
10. In the image illustrated, the release component's operations are clearly evident.
11. ![viewtask](/engineering-education/azure-devops-api-development/viewtasks.png)
    ![releasetask](/engineering-education/azure-devops-api-development/releasetasks.png)

12. The history of releases can be found here.
    ![viewreleases](/engineering-education/azure-devops-api-development/viewreleases.png)
    ![releaseshistory](/engineering-education/azure-devops-api-development/releasehistory.png)
13. If you wish to view the summary of your releases you can do so as shown below.
    ![releasesummary](/engineering-education/azure-devops-api-development/releasesummary.png)
14. A file report contains information about your installation and customization.

### Step 3: Execiton Phase

1. Code tab view
   ![codetab](/engineering-education/azure-devops-api-development/codetab.png)
2. In this step we are going to copy the repo we have just launched
   ![cloneurl](/engineering-education/azure-devops-api-development/cloneurl.png)
3. Customize and make relevant changes as shown below from your code
   ![editcode](/engineering-education/azure-devops-api-development/editcode.png)

   ![addcode](/engineering-education/azure-devops-api-development/addcode.png)

4. The changes you have just made will be reflected automatically from your pipeline
   ![buildqueue](/engineering-education/azure-devops-api-development/buildqueue.png)
5. Our queue is build with also our release. You can view it as demostrated below
   ![browsewebapp1](/engineering-education/azure-devops-api-development/bwebapp.png)
   ![updatesite](/engineering-education/azure-devops-api-development/updatedsite.png)

### Conclusion

This brings the article to a close i hope you can build and deploy azure devops api like a pro.
