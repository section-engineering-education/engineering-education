---
layout: engineering-education
status: publish
published: true
url: /implementation-of-ci-and-cd-in-.net-application-using-shell-executor-on-gitlab/
title: Implementation of ci and cd in java application(linux) using shell and docker executor on git lab
description: This article takes the reader through GitLab runners, their installation and configuration, and finally the creation of GitLab yml files. Shell Executor is a basic executor that aids in the local development of the solution on the computer where GitLab Runner is installed. 
author: james-bundi
date: 2021-08-21T00:00:00-11:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/implementation-of-ci-and-cd-in-.net-application-using-shell-executor-on-gitlab/hero.png
    alt: Implementation of ci and cd in java application(linux) using shell and docker executor on git lab Hero Image
---
Shell Executor is a basic executor that aids in the local development of the solution on the computer where GitLab Runner is installed. Windows Batch has been deprecated in favor of Bash and Windows PowerShell scripts. You'll need to set up GitLab Runner in Shell executor mode and configure the paths to get started.
<!--more-->
In this situation, the solution will be produced locally using Shell executor on the machine where GitLab Runner is installed. If you're running GitLab on Linux, then you'll need to install all the essential software on that same system.

> .Net applications on run on Windows environment.

### prerequisites
- Have a computer running Windows operating system.
- Download git into your machine. [Click here to download](https://git-scm.com/downloads.).
- Download `MSBuild` or use the visual studio building tools installed in the visual studio.
- Use the same .exe files used to install MSBuild to install `VS Web Build`. We can achieve this by running the command ` vs_buildtools.exe — add Microsoft.VisualStudio.Workload.WebBuildTools` in the command-line.
- Download Nuget to reinstall our application's packages from the official website. [Click here to download](https://www.nuget.org/downloads).

### Table of contents
- [Installation of Gitlab runners](#installation-of-gitlab-runners)
- [Configuring the Runners](#configuring-the-runners)
- [How to create a .gitlab-ci.yml file](#how-to-create-a-.gitlab-ci.yml-file)
- [Conclusion](#conclusion)

### Installation of GitLab Runners
To install and run GitLab Runner on Windows, you'll need Git and the user password. For more information, see the Git download link in the prerequisites section.

step-by-step guide:
1.  Make a folder on your computer first. For example `H:\Runners`

2.  To install the GitLab Runner, first, download the binaries for either the Windows 64-bit or 32-bit operating systems. Then, place them in the folder you created. Please note that the following assumes that you've changed GitLab-runner.exe to GitLab-runner (optional).

> The binary down depends on your computer specifications of the operating system.

3. Make sure that the GitLab Runner directory and executable have `Write rights` restricted. Otherwise, regular users can replace the executable and run any code with elevated privileges by substituting their own.

4. Open a command prompt as an administrator.

5. Make registration for the runner. This can be achieved by the process of connecting a runner to one or more GitLab instances.
   Registering multiple runners is as simple as repeating the register command on the same host system.

The following is the process of registering a runner:
- Run the command `./gitlab-runner.exe register` to register a runner
- The URL of your GitLab instance must be entered (also known as the GitLab-ci coordinator URL).
- To register a runner, enter the token you received.
- Name and describe the runner. This value can be changed later through the GitLab user interface.
- Separate the tags linked with the runner using commas. This value can be changed later through the GitLab user interface.
- Provide the executor for the runner. Enter docker for the majority of usage cases.
- For projects that don't have a default image defined, you'll be requested to select one if you selected docker as your executor. GitLab-ci.yml.

6. Install GitLab Runner as a service and start it. You can either use the built-in System Account using the command `.\gitlab-runner.exe installs` to install and `.\gitlab-runner.exe start` to start the runner (which is preferred). Or a user account to execute the service. Use the commands `.\gitlab-runner.exe install --user "Input your user name" --password "Input your password"` to install. And, `.\gitlab-runner.exe start` to start the runners.

### Configuring the Runners
GitLab Runner is a build instance that can be used to perform jobs across several machines and send the results to GitLab. It can be installed on different users' computers, servers, and local devices. Once the runner has been installed, you can choose to make it shared or specific.

> You can use either specific or shared runners to service your jobs.

**Shared Runners**- These runners are handy for jobs that have similar requirements across many projects. Instead of using several runners for many projects, you may handle them with a single or small number of runners that are easy to maintain and update.

**Specific Runners**- These runners are important for deploying a specific project if the job has specific criteria or demands. Specific runners organize their data using the FIFO (First In First Out) method, which works on a first-come, first-served basis. An individual runner can be registered with the project registration token. An encrypted version of a certain Runner.

#### Encryption of a specific Runner
You can prevent a specific runner from being used in other projects by encrypting it. To do so, you must first register a runner, as described in the GitLab Runners installation guide above.

Encrypt the runner using the following steps.
- Go to your project and log in to your GitLab account.
- By selecting the CI/CD option on the Settings page, you may expand the Runners Settings option.
- The activated Runners for the project can be found under the Runners Settings section.
- Now click on the pencil button.
- The Runner screen will then be opened, and the Lock to current projects option will be checked. By clicking on save changes, you'll be able to keep the changes.
- It will successfully update the Runner after saving the modifications.

#### Protect Runners
The Runners can be safeguarded to save critical data.

You can protect the Runner by following the instructions below:
- Go through the exact processes (from steps 1 to 4) as in the previous section (encrypting a specific Runner) (encrypting a specific Runner).
- You'll get the Runner screen after tapping the pencil button; select the Protected option from there. Unless you click on the save changes button, your alterations will be temporary.

### How to create a .gitlab-ci.yml file
The `YAML file` .gitlab-ci.yml is used to configure particular instructions for GitLab CI/CD.

You define the following in this file:
- The structure and order in which the runner should do jobs.
- The choices a runner should make when confronted with various circumstances.

When you commit to a branch other than the default branch, for example, you might want to run a set of tests. You want to run the same suite as before, but additionally, publish your application when you commit to the default branch.

The.gitlab-ci.yml file contains all this information.

To make a.gitlab-ci.yml file, follow these steps:
1. Select Project information > Details from the left sidebar.
2. Select the branch you wish to commit to above the file list, then click the `+` icon, then New file:
3. Type `.gitlab-ci.yml` in the filename field, and paste the following code in the bigger window:

```bash
build-job:
  stage: build
  script:
   - echo "Hello, $GITLAB_USER_LOGIN!"

test-job1:
  stage: test
  script:
    - echo "This job puts things to the test."

test-job2:
  stage: test
  script:
    - echo "Unlike test-job1, this job requires more time to complete."
    - echo "Thereafter, it executes the sleep command for 20 seconds."
    - echo "Test-job2 is extended by 20 seconds."
    - sleep 20

deploy-prod:
  stage: deploy
  script:
    - echo "This job uses the $CI_COMMIT_BRANCH branch to deploy something."
```

4. To save your changes, click commit.

#### Understanding how we created the code above
While creating a `GitLab-ci.yml` file, one has to arrange the code in stages. Stages are a set of instructions that your code must follow to get to its final destination (Production). 

You can create any number of stages with any names in GitLab. For this, you need to put them under a certain stage key and specify what sequence you want them to run. Then GitLab will go through each of them one by one. If one of them fails, the others will not be able to run.

These stages include:
- build stage
- test stage
- deploy stage

**build stage\***- This stage will construct the solution confirming that it is constructible. `$GITLAB_USER_LOGIN` In this variable, the user who initiated the job is identified by his or her username.

**test stage**- This stage will run the tests for our solution.

**deploy stage**- In this stage, we put into practice the solution we built. From the example script above, the `CI_COMMIT_BRANCH` variable shows the name of the commit branch. These features are available in all branch pipelines, including the default branch pipelines. Merge request and tag pipelines are not supported.

### Conclusion
In this article, we have understood what GitLab runners are, their installation and configuration.  Finally, we looked at the creation of GitLab yml files. I would urge the reader to dig deeper into this topic and be able to build concrete yml files.

---
Peer Review Contributions by: [Dawe Daniel](/engineering-education/authors/dawe-daniel/)
