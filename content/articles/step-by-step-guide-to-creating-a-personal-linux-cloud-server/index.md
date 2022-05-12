---
layout: engineering-education
status: publish
published: true
url: /step-by-step-guide-to-creating-a-personal-linux-cloud-server/
title: Linux Services - A Step-by-Step Guide to Creating a Personal Cloud Server
description: In this article we will talk about Linux service and we will build one completely from scratch.
author: mudasiru-rasheed
date: 2022-05-12T00:00:00-10:00
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/step-by-step-guide-to-creating-a-personal-linux-cloud-server/hero.jpg
    alt: guide to creating a personal cloud server Hero Image
---
It is a popularly known fact that a [Linux](https://www.linux.org/) server can apparently run for years without needing a restart. For this reason, Linux is the most used platform for server related jobs and tasks. 
<!--more-->
For decades Linux has led the list of [StackOverflow surveys](https://insights.stackoverflow.com/survey/2019) of the most used platform not until Windows introduced WSL (Windows Subsystem for Linux) before overtaking the Linux. 

This is just a simple reason why this article was curated to help introduce you to the world of Linux power use. Automation is another key feature made possible by Linux, in this article we will talk about the following
1. Why Choosing Linux?
2. What are Linux services?
3. Systemctl and other basic service management commands
4. Creattion of a NodeJS service
5. Creation of the service
 
#### Why Choosing Linux?
As mentioned in the beginning, Linux possessed various features which make it stand out in servers and services provision. According to a survey by [w3techs survey](http://w3techs.com/technologies/overview/operating_system/all), over 77% of online servers run Linux, 90% of public cloud run Linux and practically all the best cloud hosts use it, 96.3% of the world’s top 1 million servers run on Linux. 

This is possible because of the following:
- **Stability**: Linux can run for a very long time without requiring a restart.
- **Security**: This is a feature of Linux that provide access for both what is defensive security expert and offensive in all kinds of manner. Various Linux distributions (distros) were built to be defensive, while many others were built to be offensive and others combine the two capabilities. This is a security strategy made available by Linux but no other platform.
- **Open Source**: This is one of the popular reasons why Linux owns a lot of the individuals and enterprise desks. Availability of codebase for ease of customization at no cost serves a greater purpose in the usage of the platform.
- **Accessibility**: The codebase of Linux is made available for everyone which allows users to create what best solves their problems. The ability to create special-purpose OS is made possible through Linux.
- **Terminal**: This is a special feature provided by Linux to interact with the services running on it. It is known that many servers didn’t provide a graphical user interface (GUI), for these reasons, the terminal is the only means of interaction with the server. The Linux terminal contains SHELL be it Bourne Again Shell (BASH), Bourne Shell (SH Shell), Z shell (zsh) and CShell (tcsh or csh). All of these provides an interface to interact with services in place of the general graphical user interface (GUI).

#### What are Linux services?
Cloud services are provided as a service, do you know why? Because they are made of servers. Available resources that are run and managed by Linux are called services. The ability to ensure the servers of the installed program are running and following a logical boot-up order automatically are examples of the action of service configuration in Linux.  

Units which are sometimes interchanged with resources are a set of processes managed and run by Linux. Each unit is clearly defined in a file called unit files which are called by the name of their extension. 

For example filename.service unit will be referred to as service unit, filename.socket is called socket units and so on. All these units are found in a very unique location on Linux called the system directory inside the systemd which can be found in `/etc/systemd/system`.

Systemd: This is the software suite which provides a list of units and components for Linux OS. It houses all the units and service configurations. The service manager and system are the main primary component of the init system. 

This system always has a PID (process ID) of 1 which gives it privileges to be the first process to run after boot-up and service as the entry point for other programs. To check the availability of systemd on your system, run the command below and you will get an integer `2733` as an output.

```bash
    pidof system
```

To check the process structure and tree of the currently running processes, run the below command:
```bash
    ptree -p
```

To create a service is very simple but it needs to run and execute a certain predefined program in this case - our yet to be built Node.js app. This app will return “Hello World” for our users and they will be ready to pay us a million dollars for checking it out):

In order to follow along, you can create your own program that you intend to make available to your users or grab the source code for our app on GitHub here. Ensure you have Node.js installed if you download or clone the app from GitHub. 

When you are done, you can test the app by opening your terminal in the cloned project directory and run:
```bash
    node myhelloapp
```
This should produce an output like this: `<{message: “Hello, World!”}>`. If you get anything other than this, follow the error message to fix it and follow along when you are done.

#### Services creation
Up next is the creation of a service to manage the app created.
**Step 1**: Create a file inside the /etc/systemd/system directory called myhelloapp
```bash
touch myhelloapp.service
```
**Step 2**: Copy-paste the following content into the file.
```service
    [Unit]
    Description=My Million Dollar App
    Documentation=https://github.com/Taiwrash/myhelloapp/readMe.md
    [Service]
    Type=notify
    ExecStart=
    ExecStartPre=
    ExecStartPost
    Restart=always
    [Install]
    WantedBy=multi-user.target
```

#### What the heck, is that?
Service units are always grouped into sections, each section always lives inside a square bracket. In this case, we have three sections, the unit, service, and the install section. To start with what is the unit section.

### Unit section
This is where the Description, Documentation of the service we are creating are defined. There are other statements which can come under this unit section which are After, BlindsTo, After, Wants, Requires and so on. They are like meta tags in HTML.

### Service section
This service section contains commands which are meant to be run for our service to be up and running. It always contains ExecStart, Type, ExecStartPre, ExecStartPre, Restart, StartLimitInterval and so on.

### Install section
This consists of commands that allow the service to run immediately after the completion of boot-up.

**Step 3**: Execute the commands for the start of the service.
i. Change the mode of the app to executable, navigate to the app directory and run:
```bash
chmod a+x myhelloapp.js
```
ii. To notify the kernel that a new service has been created, run:
```bash
sytemctl daemon-reload
```
iii. To start the service run:
```bash
sytemctl start myhelloapp
```
iv. To check status run:
```bash
sytemctl status myhelloapp
```
v. To stop the service run:
```bash
sytemctl stop myhelloapp
```
vi. To configure it to start during boot-up run:
```bash
systemctl enable myhelloapp
```
vii. To configure to not start at start-up:
```bash
systemctl disable myhelloapp
```

### Conclusion
After we have completed this we can boot-up your system, your app server will automatically restart and be up and running without manually having to restart the server. You now have the service running on your system. 

Up next, we will go through how to make it available on the internet and start providing a docker like service. 

Amazing right? I suggest you check full description of this here at the [RedHat Docs](https://access.redhat.com/documentation/en-us/red_hat_enterprise_linux/6/html/v2v_guide/chap-v2v_guide-p2v_migration_converting_physical_machines_to_virtual_machines?msclkid=f30b79e1c7ed11ec9cdc09dd5521246e).

Happy coding!
