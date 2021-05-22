---
layout: engineering-education
status: publish
published: true
url: /it-automation-using-ansible/
title: Automation Using Ansible
description: IT automation using Ansible, article covers the basics of IT automation, how it is used, and why it is important. It also covers the basics of Ansible with the relevant code.
author: adith-bharadwaj
date: 2020-07-13T00:00:00-07:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/it-automation-using-ansible/hero.jpg
    alt: ansible image example
---
Automation is one of the highest trending topics in the IT industry right now. In this article, we are going to go through the basics of automation with a hands-on approach using Ansible. Before we get our hands dirty with Ansible, let's first look at what automation is, why we need it, and how it has revolutionized the industry.
<!--more-->

### What is automation and why do we need it?
Imagine writing code to perform a particular repetitive task, be it setting up your working environment or installing dependencies for your application, every day. Sounds monotonous and cumbersome, right? Doing this requires a lot of time and manual effort. IT automation is a better way to deal with this problem. According to
[Red Hat](https://www.redhat.com/en/topics/automation/whats-it-automation), IT automation, sometimes referred to as infrastructure automation, is the use of software to create repeatable instructions and processes to replace or reduce human interaction with IT systems.

**IT automation** is a powerful technique that allows companies to save significant sums of money, which they would have used to fund the manual effort of employees. In some cases, companies can save thousands, if not millions of dollars, by automating a task that previously required an **entire team** to manage and configure.

It not only saves money and time but also reduces errors that might be caused by individuals. It can speed up time-consuming operations, thereby improving efficiency and makes the system more secure as fewer people are allowed to view and process sensitive information.

Theoretically, any task that is repetitive and requires manual effort can be automated. Different applications and services require different configurations, filesystems, users, etc. As the system grows in size, a robust system to manage and configure the application environment becomes crucial. This system is called **configuration management**. According to [Red Hat](https://www.redhat.com/en/topics/automation/what-is-configuration-management), configuration management is a process for maintaining computer systems, servers, and software in a desired, consistent state. There are numerous tools for deployment and configuration management, but **Ansible** is one of the most popular and widely used tools.

### What is Ansible?
[Ansible](https://www.ansible.com/) is a powerful open-source tool, owned and maintained by Red Hat, for configuration management, deployment automation, service orchestration, cloud provisioning, and system administration. Ansible allows us to configure and manage multiple computers or Virtual Machines (VMs) across the network at once without requiring manual intervention. Before we use Ansible, there are a few concepts to bear in mind.

#### How does it work?
There are two types of nodes in Ansible: the **control node** and the **managed node**. In this context, A node is simply a computer or a VM. The user writes and executes an Ansible program on the control node. Ansible establishes a connection from the control node to the managed node through the network (it uses SSH by default) and pushes small programs called "modules" to these nodes and removes them when the action is complete.

A **module** is like a glorified shell script that executes a shell command. It uses SSH keys to facilitate login access from the control node to the managed nodes. There can be multiple managed nodes but only one control where the user can execute the program.

#### Playbooks
Ansible programs are called **playbooks** in Ansible terminology. A playbook is a configuration file written in a language called YAML (Yet Another Markup Language) and is a collection of Ansible modules that perform an array of tasks. YAML is a very straightforward language that allows us to describe tasks in a way that is similar to plain English.

Another handy characteristic of Ansible is its **idempotency**. According to [**Wikipedia**](https://en.wikipedia.org/wiki/Idempotence), idempotence is the property of certain operations in mathematics and computer science, whereby they can be applied multiple times without changing the result beyond the initial application. After the user runs an Ansible playbook once, further runs of the same playbook will not result in any changes. In other words, Ansible always ensures that the system is in a **consistent state**. For instance, if you run a playbook to install Java, Ansible will know that the user has installed Java on the system. So, if the user runs the same playbook once again, Ansible skips the task to install Java.

### Using Ansible to install and run Nginx
Let us write a simple playbook to create a directory, install, and configure Nginx using Ansible. You can install Ansible by following the [**documentation**](https://docs.ansible.com/ansible/latest/installation_guide/intro_installation.html). Ansible cannot run on Windows machines. Therefore, I will be using **Ubuntu 18.04** for this tutorial.  

```yaml
---

- name: Ansible playbook tutorial
  hosts: localhost
  become: yes
  tasks:

    - name: create a directory called test in a folder called examples in my home directory
      file:
        path: /home/adith/examples/test
        state: directory

    - name: install nginx
      apt:
        name: nginx
        state: latest

    - name: start nginx
      service:
        name: nginx
        state: started
```

In this playbook, the first task creates a directory called test in my home directory. The second task installs the latest version of Nginx, and the third task starts Nginx on my localhost.  

The command to run the playbook is : ansible-playbook <playbook-name>.yml

![Create directory image](/engineering-education/it-automation-using-ansible/create-directory.png)<br>

A folder called test has been created inside the examples folder in my home directory.

### Conclusion and further reading
Ansible is a simple, robust, and powerful engine that has opened up a world of possibilities for DevOps teams. Whether you are a developer, system administrator, or a student, this is the best time to explore Ansible and its extensive capabilities. Here are some additional resources that will help you get started with automation and Ansible:

[**Ansible Documentation**](https://docs.ansible.com/ansible/latest/index.html)

[**Ansible GitHub**](https://github.com/ansible/ansible)

[**Red Hat Ansible**](https://www.ansible.com/)
