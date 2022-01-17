---
layout: engineering-education
status: publish
published: 
url: /introduction-to-secrets-management-with-doppler/
title: Introduction to Secrets Management with Doppler.
description: In this tutorial, we will look at how to manage developer secrets the best way possible, using Doppler solution.
author: lynette-mwende
date: 2022-01-19T00:00:00-11:30
topics: [Security]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/introduction-to-secrets-management-with-doppler/Hero.jpg
    alt: Secrets example Image
---

Items like API keys, database configurations, SSH credentials and many alike present a need for management and security.
Without knowing the right tools or management methods, software developers often fail to keep their secrets safe, leading to poor secrets life cycle.

In this tutorial, we’ll learn about secrets and how to manage the secret keys.
In the end, we’ll get to interact with the best tool/platform that you can use as a developer for managing secrets – Doppler.


### Overview
This article will cover:
- [What are Secrets](#what-are-secrets)
- [Why Manage Secrets](#why-manage-secrets)
- [Unconventional ways of Managing Secrets](#unconventional-ways-of-managing-secrets)
- [Doppler – Universal Secrets Manager](#doppler-universal-secrets-manager)
- [Doppler CLI/Doppler Dashboard](#doppler-cli/doppler-dashboard)
- [Conclusion](#conclusion)


### What are Secrets

While developing serverless applications, microservices or even containerized apps, I bet you keep on dealing with stuff like connection strings for databases, 3rd party tokens, SSH credentials and many other private keys.

These items are secrets that need to be handled specially to keep applications secure.
Secrets are written for application servers, infrastructure-as-code (IaC) environments, or even CI/CD pipelines. 


### Why Manage Secrets

Secrets management approaches aim to mitigate the spread of secret keys to external systems. 
Mainly, secrets management enables developers to be in-charge of:

- How secrets are stored and rotated.
- Who has access to the secrets? 
- How often they’re shared, and
- How frequently they’re revoked. 

With proper secrets management in place, organizations can make it difficult for malicious activities to gain control of their systems.


### Unconventional ways of Managing Secrets

Building scalable and secure applications using any tool can be a difficult task. This is so because fine-grained control is required to check unauthorized access to sensitive information and avoid data leakages.

There are, however, some traditional secret management methods developers get lured into while writing their applications. These methods are not appropriate an attempt to use them only leaves your functions or applications vulnerable to attack.

Some of the unconventional ways include:

1. *Environment variables. (ENV files)*
Some developers find it easier to reference secrets stored in the environment variables, outside a source code or version control. Secret keys stored in environment variable are prone to accidental exposures through child processes -what we want to avoid.


2. *Hard coding secrets*

Hard coding involves embedding user IDs, passwords, and other credentials into projects. Hardcoded secrets in public projects can be viewed easily, exposing them to exploits. Attacking exploits can grab access keys, alter rights and privileges, and perform other malicious acts.

3. *Storing secrets in public places – Github*

Registries and public repositories like Github are some of the place’s secrets should not be found in. These repositories are shared across development teams, testing teams, or possibly with the entire world (as is the case for open-source software) and make projects vulnerable.

The best secret management option for projects should avail a seamless secret lifecycle, role-based access control, and encryption for any secret at rest or in transit.

You may now be wondering if there is any optimal and easier way to manage secrets.
Luckily, the [Doppler](https://www.doppler.com/) Universal Secrets manager is available to manage your secrets at any level, i.e. Dev, Staging, and Production environments.


### Doppler – Universal Secrets Manager
This section will be a simple guide on storing secrets using Doppler through the Doppler dashboard.

Doppler has a unified dashboard platform that eliminates the need for .env files, hard coding, or the use of public repositories.
From Doppler's unified dashboard, it is possible to centrally manage teams, projects, and secrets.

#### Why Doppler
Doppler is a managed service, unlike traditional secrets managers.
Doppler supports seamless integrations for multiple cloud vendors and platforms. 
This platform also provides dashboard-based integration of projects with other secrets managers such as AWS Secrets Manager, Parameter store and Hashicorp Vault.

Secrets in Doppler can also be synchronized to external secrets stores, saving developers time to focus on building products and features.


### Doppler CLI/Doppler Dashboard

[Doppler CLI](https://docs.doppler.com/docs/cli) is a lightweight installable file that runs in most operating systems. Installing the binary file require package managers such as scoop.
Doppler CLI is convenient for local development, CI/CD pipelines and production environments.

To reach the Doppler’s scoop repository, run the script below in a command prompt. 

'''bash
scoop bucket add doppler https://github.com/DopplerHQ/scoop-doppler.git
'''
Example: ![Connecting to Doppler Repo](/engineering-education/introduction-to-secrets-management-with-doppler/scoop.png).


After the Doppler bucket is successfully added, you'll install Doppler CLI through the script below:

'''bash
scoop install doppler
'''

Example: ![Installing Doppler](/engineering-education/introduction-to-secrets-management-with-doppler/cmd-doppler.png).

When the installations are complete, you can initiate the authentication process by running doppler login within your command prompt to enter your Doppler account details. 

#### Doppler Dashboard
Doppler dashboard is a browser-based interactive platform where users can organize secrets into projects and environments. 
The Doppler Dashboard has access to secrets in your projects, keeping the local development and Doppler in sync.


#### Creating a Project in Doppler Dashboard.

Within Doppler, you can create as many projects as needed -depending on the teams involved and the applications being developed. 
The secrets in every project can also exist in any environment – Dev, Test, Production for scalability.

Example: ![img](/engineering-education/introduction-to-secrets-management-with-doppler/project.png).


Now it’s time to create a project that will handle secrets!

Navigate the Doppler dashboard to the + button and click to launch a project. You can name your project to reflect what secrets you’ll be storing in your workspace. 

Example: ![Creating a Project](/engineering-education/introduction-to-secrets-management-with-doppler/new-project.png).


Any project created in Doppler comes with Dev, Test and Production environments to help define secret levels.
Example: ![Project Environment](/engineering-education/introduction-to-secrets-management-with-doppler/project_env.png).


You can then store secrets singly or by importing some JSON file with secrets- creating a bulk secrets option.
To do this, click the add secrets button, which injects a secret key-value to your project for saving.

Example: ![Secrets Page](/engineering-education/introduction-to-secrets-management-with-doppler/secrets.png).


Example: ![URL Secret Example](/engineering-education/introduction-to-secrets-management-with-doppler/secret-example.png).


Finally, after saving all secrets, you can connect the Doppler project with your local development environment through the Doppler CLI.
Within your terminal or code editor,  navigate to the existing local project folder.

Run the 
'''bash
doppler setup 
'''bash  command within your local project directory to import doppler configs to your local environment. This way, you will have connected your secrets in Doppler to your local projects.

Example: ![img](/engineering-education/introduction-to-secrets-management-with-doppler/local_configs.png)


### Conclusion
In this article, we have learned what secrets are, why they are managed, and how to manage them efficiently for productivity.

Doppler Universal Secrets manager has grown to be the preferred secrets store, handling secrets sprawl, secrets rotation and traceability.
It is now the perfect time for you to ship your project secrets into a single manageable dashboard as a developer.

Happy coding!





