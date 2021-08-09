---
layout: engineering-education
status: publish
published: true
url: /setup-ssh-ubuntu-vm-aws/
title: How To Setup and SSH into an Ubuntu 18.04 Virtual Machine on AWS
description: To check if the client is available on your Linux-based system, you will need to connect to an AWS account and a Linux machine or SSH client that you will use to SSH into the virtual machine.
author: adrian-murage
date: 2020-07-05T00:00:00-07:00
topics: [Networking]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/setup-ssh-ubuntu-vm-aws/hero.jpg
    alt: cloud computing image example
---
Many modern web applications today are served from [the cloud](https://en.wikipedia.org/wiki/Cloud_computing). Public cloud providers, like Google Cloud Platform (GCP), Amazon Web Services (AWS), and Microsoft Azure, to name a few, offer service models that enable this trend.
<!--more-->

### Introduction
An [Introduction To Cloud Computing](/introduction-to-cloud-computing/) can be found on [Section's Engineering Education blog](/).

Web applications can be served on [Virtual Machines](https://en.wikipedia.org/wiki/Virtual_machine) provisioned on a public cloud. In this tutorial, we will cover exactly how to provision a Virtual Machine running Ubuntu 18.04 on AWS, and [SSH](https://en.wikipedia.org/wiki/Secure_Shell) into it.

The tutorial takes advantage of the FREE services offered under the [AWS Free Tier](https://aws.amazon.com/free/?all-free-tier.sort-by=item.additionalFields.SortRank&all-free-tier.sort-order=asc). We will use the [Infrastructure As A Service](https://en.wikipedia.org/wiki/Infrastructure_as_a_service) Virtual Machine offering [Amazon EC2](https://aws.amazon.com/ec2/?did=ft_card&trk=ft_card).

*Note:* Under the Free tier (for eligible users), you get 750 hours per month (up to 12 months) of a Linux t2.micro or t3.micro instance, dependent on region. This is subject to Amazon's terms and conditions. You should thus ensure that you are eligible first, in order to avoid being billed for the services you will use in this tutorial.

### Prerequisites
To complete this tutorial you will need to have an AWS account and a Linux machine or SSH client that you will use to SSH into the virtual machine.

### Launch an Amazon EC2 Virtual Machine
1. Navigate to the [AWS console](https://console.aws.amazon.com/).
2. On the navbar, navigate to Services > Compute > EC2. This will take you to the EC2 console.
3. Scroll down to the "Launch Instance" prompt and click on it.
4. You will then navigate to a page where you get to choose an Amazon Machine Image.
5. Under QuickStart, you should select the Ubuntu Server 18.04 LTS that is Free tier eligible.
![Choose an Amazon Machine Image](/engineering-education/setup-ssh-ubuntu-vm-aws/ami.png)
6. Navigate to the tab where you select the Instance type. For this case, a General Purpose t3.micro instance that is Free tier eligible is sufficient.
![Select Instance Type](/engineering-education/setup-ssh-ubuntu-vm-aws/instance_type.png)
7. Click the button labeled "Next: Configure Instance Details".
8. On the next three subsequent pages, you do not need to make any changes. (Click the buttons labelled "Next: Add storage", "Next: Add Tags" and "Configure Security Group" respectively.)
9. On the Configure Security Group page, select create a new security group and leave everything else as is. (Ignore the displayed warning.) Click "Review and Launch".
![Configure Security Group](/engineering-education/setup-ssh-ubuntu-vm-aws/configure_security_group.png)
10. On the Launch Page, click on "Launch", which will trigger a prompt. Select "create a new key pair". Name the key pair and download it. (Later on, you will use your_pem_file.pem to SSH into the Virtual Machine instance you are about to launch.) When done, you can then click on "Launch Instances".
![Launch Instance](/engineering-education/setup-ssh-ubuntu-vm-aws/launch_instance.png)

**CONGRATULATIONS!!** You have managed to set up and launch your own Virtual Machine Instance.
Now you can move on to connecting to it remotely via the [SSH protocol](https://www.ssh.com/ssh/protocol/).

### SSH into the Amazon EC2 Virtual Machine
The operating system of your local computer determines the options available to SSH from your local computer to your Virtual Machine instance running Linux (Ubuntu 18.04).

Moving forward, the tutorial assumes your local computer operating system is Linux or macOS X. If this isn't the case, see [Amazon's guide](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/AccessingInstances.html?icmpid=docs_ec2_console).

First, you need to locate your private key file (your_pem_file.pem) that you downloaded earlier, and move it to the `~/.ssh` directory. To do this, from the terminal in the directory where your_pem_file.pem was downloaded, run:

```bash
mv your_pem_file.pem ~/.ssh/your_pem_file.pem
```

Next, you need to ensure your private key file (your_pem_file.pem) is not publicly viewable for SSH to work. To do this, run:

```bash
chmod 400 ~/.ssh/your_pem_file.pem
```

To gain an understanding of how the `chmod` command works, read up on [Linux File Permissions](https://www.linux.com/training-tutorials/understanding-linux-file-permissions/).

At this point, you're almost ready to SSH into your Virtual Machine Instance. You need one last thing – your Virtual Machine's IP address. You can get this from the AWS console, as shown in the image below.
![Virtual Machine IP address](/engineering-education/setup-ssh-ubuntu-vm-aws/ip_address.png)<br>
Now you can ssh into your instance by running the ssh command:

```bash
ssh -i ~/.ssh/your_pem_file.pem ubuntu@your_virtual_machine_ip_address -v
```

You will then get a response like:

```bash
The authenticity of host '13.244.115.171 (13.244.115.171)' can't be established.
ECDSA key fingerprint is SHA256:hTaJnzw/oDXxzLCMHcp9ieHcHxEISfxubiEkylIhtkc.
Are you sure you want to continue connecting (yes/no)?
```

Enter `yes`.

And You DID IT!!! You have successfully used SSH to get remote access to your Virtual Machine on AWS. Feel free to poke around!!

To better understand the ssh command you used above, see the breakdown below.

1. **ssh**: the ssh command is used to start the SSH client program that enables secure connection to the SSH server on a remote machine.
2. **-i**: identity_file, a file from which the [identity key](https://www.ssh.com/ssh/identity-key) (private key) for [public key authentication](https://www.ssh.com/ssh/public-key-authentication) is read.
3. **"~/.ssh/your_pem_file.pem"**: the [absolute path](https://www.linux.com/training-tutorials/absolute-path-vs-relative-path-linuxunix/) to your_pem_file.pem
4. **ubuntu**: the username you will use to ssh into the virtual machine.
5. **@**: used to refer the virtual machine IP address much like @gmail denotes a Gmail email servers.
6. **your_virtual_machine_ip_address**: used to denote the IP address you wish to SSH into.
7. **-v**: verbose mode, where every action is printed to the screen as it happens.

For more information read [SSH Command](https://www.ssh.com/ssh/command).
I also suggest that you see [ssh-add](https://www.ssh.com/ssh/add) and [ssh-agent](https://www.ssh.com/ssh/agent) to add your_pem_file.pem to the ssh-agent. The ssh-add command adds private key identities like your_pem_file.pem to the authentication agent(ssh-agent) so that the ssh agent can take care of authentication for you. Shortening the ssh command you used earlier to:

```bash
ssh ubuntu@your_virtual_machine_ip_address -v
```

When you're done, exit the SSH connection by running:

```bash
logout
```

*Note:* Remember to terminate the instance to avoid charges when the trial period ends.

To terminate the instance, right click on the instance in the console:

**Instance State > Terminate**

![Terminate Virtual Machine Instance](/engineering-education/setup-ssh-ubuntu-vm-aws/terminate_instance.png)
