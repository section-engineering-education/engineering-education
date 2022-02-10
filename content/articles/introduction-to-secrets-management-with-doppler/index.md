---
layout: engineering-education
status: publish
published: true
url: /introduction-to-secrets-management-with-doppler/
title: Introduction to Secrets Management with Doppler
description: In this tutorial, we will look at how to manage developer secrets the best way possible, using Doppler solution.
author: lynette-mwende
date: 2022-02-10T00:00:00-02:19
topics: [Security]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/introduction-to-secrets-management-with-doppler/hero.jpg
    alt: Introduction to Secrets Management with Doppler Example Image
---
Items like API keys, database configurations, SSH credentials, and many alike present a need for management and security. Such database configurations, like port numbers, user passwords, and API keys (unique code values used to authenticate API calls and access to APIs) are often vulnerable to security attacks.
<!--more-->
Without knowing the right tools or management methods, software developers often fail to keep their secrets safe, leading to a poor secret life cycle.

In this tutorial, we'll learn about secrets and manage the secret keys. Later on, we'll look into the best tool/platform you can use as a developer to manage secrets – Doppler.

### Overview
This article will cover:
- [What are secrets?](#what-are-secrets)
- [Why manage secrets?](#why-manage-secrets)
- [Unconventional ways to manage secrets](#unconventional-ways-to-manage-secrets)
- [Doppler](#doppler)
  - [Doppler CLI](#doppler-cli)
  - [Doppler dashboard](#doppler-dashboard)
- [Conclusion](#conclusion)
- [Further reading](#further-reading)

### What are secrets?
As you develop applications, [microservices](https://microservices.io/), or [containerized apps](https://www.citrix.com/solutions/app-delivery-and-security/what-is-containerization.html), you often interact with stuff like 3rd party APIs, user credentials, port numbers, and many other secret keys. These privileged credentials are known as ["secrets"](https://www.akeyless.io/secrets-management-glossary/secrets-management/).

These are private pieces of information that unlock protected resources or sensitive information in tools, application servers, Infrastructure-as-Code (IaC) environments, or even [CI/CD pipelines](https://harness.io/blog/secrets-management-ci-cd/). Secrets need to be handled specially to maintain the security of applications.

### Why manage secrets?
Secrets management approaches aim to mitigate the spread of secret keys to external systems.

Mainly, secrets management enables developers to be in charge of:
- How secrets are stored and rotated?
- Who has access to the secrets? 
- How often they're shared?
- How frequently they're revoked?

With proper secret management in place, organizations can avoid malicious activities and gain control of their systems.

### Unconventional ways to manage secrets
Building scalable and secure applications using any tool can be a difficult task. This is so because fine-grained control is required to check unauthorized access to sensitive information and avoid data leakages.

There are, however, some traditional secret management methods developers get lured into while writing their applications. These methods might not be appropriate for your product. An attempt to use them only leaves your functions or applications vulnerable to attack.

Some of the unconventional ways include:

#### Environment variables
Some developers find it easier to reference secrets stored in the environment variables outside a source code or version control.

Secret keys stored in environment variables are prone to accidental exposures through child processes, that's what we want to avoid.

Therefore, it is recommended to replace environment variables with external secrets managers such as [Doppler](https://www.doppler.com) and [AWS Secrets Manager](https://aws.amazon.com/secrets-manager/).

#### Hard coding secrets
Hard coding involves embedding user IDs, passwords, and other credentials into projects. Hardcoded secrets in public projects can be viewed easily, exposing them to exploits.

Attacking exploits can grab access keys, alter rights and privileges, and perform other malicious acts such as injecting ransomware and viruses into applications.

#### Storing secrets in public places – Github
Registries and public repositories like Github are places secrets should not be found. These repositories are shared across development teams, testing teams, or possibly with the entire world (as is the case for open-source software), making projects vulnerable. 

The best secret management option for projects should avail a seamless secret lifecycle, role-based access control, and encryption for any secret at rest or in transit.

You may now be wondering if there is any optimal and easier way to manage secrets. And yes! There is [Doppler](https://www.doppler.com/) available, a secrets manager for your secrets at any level of development.

### Doppler
This section will show a simple guide on storing secrets using Doppler. Doppler has a unified dashboard platform that eliminates the need for `.env` files, hard coding, or the use of public repositories.

From Doppler's unified dashboard, it is possible to manage teams, projects, and secrets centrally.

#### Why Doppler?
Doppler is a fault-tolerant, managed, multi-infrastructure service that gives developers an unlimited project environment, unlike traditional secret management options to store secrets locally.

Doppler integrates well with popular cloud providers. It also provides dashboard-based integration of projects with other secret managers such as [AWS Secrets Manager](https://aws.amazon.com/secrets-manager/), [Parameter Store](https://docs.aws.amazon.com/systems-manager/latest/userguide/systems-manager-parameter-store.html), and [Hashicorp Vault](https://www.vaultproject.io/).

#### Doppler CLI
[Doppler CLI](https://docs.doppler.com/docs/cli) is a lightweight installable file that provides a consistent experience between developing locally and production.

Whether working locally or in a production environment, you can initiate your application's secrets using the `doppler run` command. This will execute your application, with your latest secrets being injected into your working environment.

To install Doppler CLI, it is required to have package managers such as [scoop](https://scoop.sh/). To reach the Doppler's scoop repository for installation, run the script below in a command prompt:

```bash
scoop bucket add doppler https://github.com/DopplerHQ/scoop-doppler.git
```

![Connecting to Doppler Repo](/engineering-education/introduction-to-secrets-management-with-doppler/scoop.png)

After the Doppler bucket is successfully added, you'll install Doppler CLI through the script below:

```bash
scoop install doppler
```

![Installing Doppler](/engineering-education/introduction-to-secrets-management-with-doppler/cmd-doppler.png)

You can initiate the authentication process when the installations are complete by running `doppler` login within your command prompt to enter your Doppler account details. 

#### Doppler dashboard
Doppler dashboard is a browser-based interactive platform where users can organize secrets into projects and environments. The Doppler Dashboard has access to secrets in your projects, keeping the local development and Doppler in sync.

#### Working with Doppler
Within Doppler, you can create as many projects as you need - considering the applications being developed. The secrets in every project can exist in any environment – development, test, load, or production.

![Doppler dashboard](/engineering-education/introduction-to-secrets-management-with-doppler/project.png)

Now, it's time to create a project that will handle secrets.

Navigate the Doppler dashboard to the `+` button and click to launch a project. You can name your project to reflect what secrets you'll be storing in your workspace. 

![Creating a Project](/engineering-education/introduction-to-secrets-management-with-doppler/new-project.png)

Any project created in Doppler comes with dev, test, and production environments to help define secret levels.

![Project Environment](/engineering-education/introduction-to-secrets-management-with-doppler/project_env.png)

You can then store secrets singly or import some JSON files with secrets - creating a bulk secrets option.

To do this, click the `Add Secret` button that injects a secret key-value into your project for saving.

![Secrets Page](/engineering-education/introduction-to-secrets-management-with-doppler/secrets.png)

![URL Secret Example](/engineering-education/introduction-to-secrets-management-with-doppler/secret-example.png)

You can connect the local project environment to your Doppler secrets through the Doppler CLI. Navigate to the existing local project folder within your terminal or code editor and run the snippet below.

The command will set up your current Doppler project in the local development environment:

```bash
doppler setup 
``` 

![Set Up](/engineering-education/introduction-to-secrets-management-with-doppler/local_configs.png)

After connecting your local project with the Doppler project, you can access, filter, and download secret(s) as either plain values or JSON files.

Run the command `doppler secrets get DOPPLER_PROJECT DOPPLER_CONFIG --plain` to select your current project and its environment, as shown below:

![Project](/engineering-education/introduction-to-secrets-management-with-doppler/get.png)

From here, you can see your project and its environment, whether dev, prod, or staging. Next, we will access secrets stored in the Doppler project.

To get this done, run the following commands in the terminal:

```bash
doppler secrets --only-names
doppler secrets 
``` 

All secrets stored will be as shown in the screenshot below:
![Access](/engineering-education/introduction-to-secrets-management-with-doppler/access.png)

The secrets will be injected into your local working environment with the access done.

To check more on how to manipulate secrets using Doppler CLI for your local environment, be sure to check the following [page](https://docs.doppler.com/docs/accessing-secrets).

### Conclusion
In this article, we have learned what secrets are, why they are managed, and how to manage them efficiently for productivity. We also looked into Doppler - a Universal secrets manager that has grown to be the preferred secrets store, handling secrets sprawl, secrets rotation, and traceability.

It is now the perfect time for you to ship your project secrets into a single manageable dashboard as a developer.

Happy coding!

### Further reading
- [Official Docs](https://docs.doppler.com/docs/cli)
- [Thycotic](https://thycotic.com/company/blog/2021/03/04/secrets-management/)
- [CyberArk](https://www.cyberark.com/what-is/secrets-management/)

---
Peer Review Contributions by: [Srishilesh P S](/engineering-education/authors/srishilesh-p-s/)