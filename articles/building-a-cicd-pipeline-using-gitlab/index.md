---
layout: engineering-education
status: publish
published: true
url: /engineering-education/building-a-cicd-pipeline-using-gitlab/
title: Building a CI/CD Pipeline using Gitlab
description: This tutorial, we are going to explore the basics of Gitlab and Gitlab-ci by building a CI/CD pipeline and running it using the UI provided by Gitlab. 
author: adith-bharadwaj
date: 2020-12-21T00:00:00-12:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/building-a-cicd-pipeline-using-gitlab/hero.jpg
    alt: CI/CD Pipeline using Gitlab example image
---
GitLab is a Git-based platform, similar to [Github](https://github.com/), that provides an array of tools and technologies for various aspects of the [software development lifecycle](https://www.tutorialspoint.com/sdlc/sdlc_overview.htm) (SDLC).
<!--more-->
Gitlab allows users to host repositories using the popular version control system: Git. It also allows users to track proposals for new implementations, generate bug reports, review code, etc. 

Another essential feature, which we will use in this tutorial, is its build-in continuous integration tool called Gitlab-ci. 

In this tutorial, we are going to explore the basics of Gitlab and Gitlab-ci by building a CI/CD pipeline and running it using the UI provided by Gitlab.

### Table of contents
- [Prerequisites](#prerequisites)
- [Setting up Gitlab](#setting-up-gitlab)
- [Building a CI/CD pipeline](#building-a-cicd-pipeline)
- [Code](#code)
- [Conclusion](#conclusion)

### Prerequisites 
- Basic knowledge of [Git and version control:](https://www.section.io/engineering-education/beginner-guide-to-git/)
- Basic understanding of [CI/CD:](https://www.section.io/engineering-education/what-is-jenkins/)
- Basic knowledge of [programming:](https://www.python.org/about/gettingstarted/)

### Setting up Gitlab
Setting up a Gitlab account is very easy. Head over to [this](https://gitlab.com/users/sign_in) link, create an account, or choose to sign in with Google or GitHub. Once you sign in, it will redirect you to the homepage where you can explore various options such as creating a new project, a group or just explore some public repositories. 

Follow these steps to set up a new project on Gitlab:
- On the homepage, click on "create blank project" to initialize a new repository. 

![Create New](/engineering-education/building-a-cicd-pipeline-using-gitlab/create_new.png)

- Gitlab will redirect you to a form where you fill in the details of your project, such as title, description, etc. You can also choose to make your project public or private. After you finish adding the details, click on "create project". 

![Blank Project](/engineering-education/building-a-cicd-pipeline-using-gitlab/blank_project.png)

- Click on "clone" and copy the HTTPS URL to clone the project. Open a terminal or command line and enter the following command to clone the project into your local machine:

```bash
git clone <https clone URL>
```

Now that you have the project on your local machine, we can start building our own CI/CD pipeline and deploy it on Gitlab using Gitlab-ci. 

### Building a CI/CD pipeline
[Continuous Integration](https://codeship.com/continuous-integration-essentials) can be defined as a process, in the software development lifecycle, where engineers and developers push code into a git-based repository. If developers do this frequently, an automated process, to verify and build the code, is included to save time and costs. 

According to the [official documentation](https://docs.gitlab.com/ee/ci/), GitLab CI/CD is a powerful tool built into GitLab that allows you to apply all the continuous methods (Continuous Integration, Delivery, and Deployment) to your software with no third-party application or integration needed. 

Users can configure GitLab CI/CD by creating a file called [.gitlab-ci.yml](https://docs.gitlab.com/ee/ci/yaml/gitlab_ci_yaml.html) in the root directory of the project. This file is written in a simple and easy to use language called YAML. [This](https://www.tutorialspoint.com/yaml/index.htm) is a good article on YAML and its basics. 

Once you define the .gitlab-ci.yml file, Gitlab creates a [pipeline](https://docs.gitlab.com/ee/ci/pipelines/index.html), that runs whenever there is a change to the code in the repository. These pipelines can have single or multiple stages that run one after the other(in series). 

Each stage can consist of multiple jobs that are executed in parallel by the [gitlab-runner](https://docs.gitlab.com/runner/), that is an application that works with GitLab to run jobs in a pipeline.

### Code
Let's build a simple CI pipeline to run a Python script whenever we push changes to our repository. 

Create a Python script called `test.py` in the repository and add the following lines of code into the file. 

The script prints "hello world" and "testing" 5 times. This is just an example to help you understand how to create and run pipelines. You can run complex scripts and commands as well. 

```python

if __name__ == '__main__':
  
  print('hello world')
  
  for i in range(5):
    print('testing', i)

```

Create a file called .gitlab-ci.yml in the repository and add the following snippet of code. The [`variables`](https://docs.gitlab.com/ee/ci/variables/) section defines a list of variables that can be used in the pipeline. 

I have declared a variable called `example`, whose value is set to "this is an example variable". Variables are declared as key-value pairs (separated by a semicolon) in YAML. 

The [`stages`](https://docs.gitlab.com/ee/ci/yaml/#stage) section defines a list of stages in the pipeline. These stages are executed one after the other, and hence, it's important to order them based on dependencies. In other words, stages that are dependant on other stages must be declared after all of their dependencies. 

The next lines define the actual stages that run in series. They start with the name of the stage followed by the tag `stage`, that defines which stage it is a part of. The `script` tag defines a shell script or command that is executed by the runner.

We can use the `echo` command to print something on the terminal and the `cat` command to display the contents of the Python script. We can also use `echo` to print the value of the variables that are defined in the file. These variables can be accessed by using the `$` symbol. 

![Blank Project](/engineering-education/building-a-cicd-pipeline-using-gitlab/blank_project.png)

```yaml

variables:
  example: this is an example variable

stages:
  - stage1
  - stage2

build:
  stage: stage1
  script:
    - echo "We are currently in stage 1"
    - echo "These are the contents of test.py"
    - cat test.py
    - echo $example

test:
  stage: stage2
  script:
    - echo "We are currently in stage 2"
    - echo "running python script"
    - python3 test.py

```

Run the following commands to push the changes to the repository:

```bash
git add -A
```

```bash
git commit -m "initial commit"
```

```bash
git push origin master
```

You will be prompted to enter your Gitlab username and password. Once you correctly enter the username and password, the changes will be pushed to the repository and Gitlab will instantly run the code in the .gitlab-ci file by creating a pipeline.

![cicd pipelines](/engineering-education/building-a-cicd-pipeline-using-gitlab/cicd_pipelines.png)

Navigate to the CI/CD section on the left navbar to view a list of pipelines. The latest one will be at the top and will have the "latest" tag. It will also show us whether the pipeline passed or failed. Click on "passed" or "failed" to view the stages of the pipeline and all the steps that were executed.

![passed pipeline](/engineering-education/building-a-cicd-pipeline-using-gitlab/passed_pipeline.png)

You will see the different stages that you defined and whether each stage passed or not. You can click on the individual stages to view the jobs executed in each stage in detail.

![build](/engineering-education/building-a-cicd-pipeline-using-gitlab/build.png)

![test](/engineering-education/building-a-cicd-pipeline-using-gitlab/test.png)

### Conclusion
In conclusion, Gitlab-ci is an impeccable tool that makes the lives of software engineers easier by providing a robust solution without requiring any third-party library or tool. 

In this tutorial, we understood the basics of GitLab and GitLab-ci by building a simple CI pipeline that automates the process of testing and building your code without the need for human intervention. 

Now that you have grasped the basics, you can go ahead and build your own pipeline. Whether you are a software developer, a system administrator, or a DevOps engineer, GitLab-ci is an indispensable part of your toolkit. 

---
Peer Review Contributions by: [Gregory Manley](/engineering-education/authors/gregory-manley/)
