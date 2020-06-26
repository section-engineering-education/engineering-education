# How To Setup and SSH into an Ubuntu 18.04 server on AWS

## Introduction

Many modern web applications today are served from [the cloud](https://en.wikipedia.org/wiki/Cloud_computing).
Public cloud providers, like Google Cloud Platform (GCP), Amazon Web Services (AWS), and Microsoft Azure, to name a few, offer service models that enable this trend. An [Introduction To Cloud Computing](https://www.section.io/engineering-education/introduction-to-cloud-computing/) can be found on Section's [Engineering Education blog](https://www.section.io/engineering-education/).

One way of serving web applications is through the use of a [Virtual Machine](https://en.wikipedia.org/wiki/Virtual_machine) provisioned on a public cloud. In this tutorial you will cover exactly how to provision a Virtual Machine running on Ubuntu 18.04 on AWS and [SSH](https://en.wikipedia.org/wiki/Secure_Shell) into it.

The tutorial takes advantage of the FREE services offered under the [AWS Free Tier](https://aws.amazon.com/free/?all-free-tier.sort-by=item.additionalFields.SortRank&all-free-tier.sort-order=asc). In particular, you will utilize the [Infrastructure As A Service](https://en.wikipedia.org/wiki/Infrastructure_as_a_service) Virtual Machine offering [Amazon EC2](https://aws.amazon.com/ec2/?did=ft_card&trk=ft_card).

>Note: Under the Free tier for eligible users, you get 750 hours per month(For up to 12 months) of Linux t2.micro or t3.micro instance dependent on region. This is however subject to Amazon's terms and conditions. You should therefore ensure you are eligible to avoid being billed for the services you will use in this tutorial.

## Prerequisites

To complete this tutorial you will need to have an AWS account and a linux machine or SSH client that you will use to SSH into the virtual machine.

## Launch an Amazon EC2 Virtual Machine

Navigate to the [AWS console](https://console.aws.amazon.com/).

On the dashboard navbar navigate to Services > Compute > EC2. This will take you to the EC2 console.

Scroll down to the "Launch Instance" prompt and click on it.

You will then be navigated to a page where you choose an Amazon Machine Image.
Under Quick Start you will select the Ubuntu Server 18.04 LTS that is Free tier eligible.

![Choose an Amazon Machine Image](ami.png)

You will then be navigated to a page where you select the Instance type.
For this case a General Purpose t3.micro instance that is Free tier eligible is sufficient.
You then need to click the button labeled "Next: Configure Instance Details".

![Select Instance Type](instance_type.png)

On the next page you do not need to make any changes.
Click the button labeled "Next: Add storage"

On the next page you also do not need to make any changes.
Click the button labeled "Next: Add Tags"

On the next page you also do not need to make any changes.
Click the button labeled "Configure Security Group"

On  the Configure Security Group page, select create a new security group.
You can leave everything else as is.
Ignore the warning that is displayed.
You can then click on "Review and Launch"

![Configure Security Group](configure_security_group.png)

On the Launch Page click on "Launch".
You will then get a prompt. Select "create a new key pair", name it and download it.
We will use this key pair to SSH into the instance we are about to launch.
When done, you can then click on "Launch Instances"

![Launch Instance](launch_instance.png)

CONGRATULATIONS!! You managed to setup and launch your own Virtual Machine Instance.
Now we can move on to connecting to it remotely via the [SSH protocol](https://www.ssh.com/ssh/protocol/).

## Connect to the Ubuntu 18.04 Linux

The operating system of your local computer determines the options that you have to connect from your local computer to your Linux instance.
Moving forward the tutorial assumes your local computer operating system is Linux or macOS X. If this isn't the case see [Amazon's guide](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/AccessingInstances.html?icmpid=docs_ec2_console).

First we need to locate your private key file(your_pem_file.pem) and move it to the ```~/.ssh``` directory.
From the terminal in the directory where your_pem_file.pem was downloaded run:

```bash

mv your_pem_file.pem ~/.ssh/your_pem_file.pem

```

Change from your current directory to the ```~/.ssh``` directory where we placed the private key file.

```bash

cd ~/.ssh

```

Next we need to ensure your private key file(your_pem_file.pem) is not publicly viewable for SSH to work. To understand better how the following command works read up on [Linux File Permissions](https://www.linux.com/training-tutorials/understanding-linux-file-permissions/).

```bash

chmod 400 ubuntu.pem

```

At this point you're almost ready to SSH into your Virtual Machine Instance.
You need one last thing, your Virtual Machine's IP address.
You can obtain this from the AWS console as shown in the image below.

![Virtual Machine IP address](ip_address.png)

Now we can ssh into out instance by running the ssh command.

```bash

ssh -i ~/.ssh/your_pem_file.pem ubuntu@your_virtual_machine_ip_address -v

```

This command looks complicated but I'll break it down for your understanding.

1. ssh :- the ssh command is used to start the SSH client program that enables secure connection to the SSH server on a remote machine.
2. -i :- identity_file A file from which the [identity key](https://www.ssh.com/ssh/identity-key) (private key) for [public key authentication](https://www.ssh.com/ssh/public-key-authentication) is read.
3. "~/.ssh/your_pem_file.pem" :- the [absolute path](https://www.linux.com/training-tutorials/absolute-path-vs-relative-path-linuxunix/) to your_pem_file.pem
4. ubuntu - the username you will use to ssh into the virtual machine.
5. @ :- used to refer the virtual machine IP address much like @gmail denotes a gmail service user.
6. your_virtual_machine_ip_address - used to denote the IP address you wish to SSH into.
7. -v :- verbose mode, where every action is printed to the screen as it happens.

For more information read more on the [SSH Command](https://www.ssh.com/ssh/command).

You will then get a response like.

``` bash

The authenticity of host '13.244.115.171 (13.244.115.171)' can't be established.
ECDSA key fingerprint is SHA256:hTaJnzw/oDXxzLCMHcp9ieHcHxEISfxubiEkylIhtkc.
Are you sure you want to continue connecting (yes/no)?

```

Enter ```yes```

And You DID IT!!! You have successfully used SSH to get remote access to your Virtual Machine on AWS as promised.
Feel free to poke around!!

When you're done exit the SSH connection by running

```bash

logout

```

>Note: Remember to Terminate the instance to avoid charges when the trial period ends.

To terminate the instance right click on the instance on the console.
Instance State > Terminate.

![Terminate Virtual Machine Instance](terminate_instance.png)
