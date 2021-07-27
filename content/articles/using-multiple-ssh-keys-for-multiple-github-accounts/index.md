---
layout: engineering-education
status: publish
published: true
url: /using-multiple-ssh-keys-for-multiple-github-accounts/
title: Using Multiple SSH Keys for Multiple GitHub Accounts
description: In this article, we will understand how to create and work with SSH keys for using multiple GitHub accounts
author: wangui-leah
date: 2021-07-27T00:00:00-00:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/using-multiple-ssh-keys-for-multiple-github-accounts/hero.jpg
    alt: Multiple SSH and GitHub accounts image
---
For most developers, there is a need to run multiple GitHub accounts on one computer. For instance, You can have an Organization's GitHub account and another for your personal projects at home.
<!--more-->
In this article, you will learn how to [use multiple SSH keys for different GitHub accounts](https://gist.github.com/jexchan/2351996). While working with two different GitHub accounts, you must set them up using an SSH key.

### Table of contents
- [What are SSH Keys?](#what-are-ssh-keys)
- [How to manage SSH Keys on GitHub Accounts](#how-to-manage-ssh-keys-on-github-accounts)
- [Creating and updating the SSH config file](#creating-and-updating-the-ssh-config-file)
- [Cloning the Repositories](#cloning-the-repositories)
- [Conclusion](#conclusion)

### Prerequisites
To grasp what this article entails, it is crucial to have a good understanding of how GitHub works.

### What are SSH keys?
[SSH refers to Secure Shell](https://en.wikipedia.org/wiki/Secure_Shell_Protocol) is a cryptographic network protocol that allows a single computer to connect with a server over the internet securely. SSH is best used for accessing remote servers.

SSH is designed to offer secure encryption, verification, and communication between computers. It provides a safe way of executing commands and configuring services remotely.

The SSH technology is often performed using the client-server model. So, you can securely log in remotely from one system to another and transmit files.

[A client-server model](https://en.wikipedia.org/wiki/Client%E2%80%93server_model) is a distributed system architecture on a computer network that splits into two sections. Computers that request a service or a request (client) and computers that serve clients with a response (Server). The client-server model is a way for computers to communicate via a computer network or the internet.

Setting up SSH, you use a pair of keys - a public key and a private key. A public key is a key that can be accessed by anyone on the internet, while a private key is specific to a particular user.

A public key is stored on the SSH server, and a private key is stored on your SSH client. So basically, SSH uses [asymmetric encryption](https://sectigostore.com/blog/what-is-asymmetric-encryption-how-does-it-work/).

Asymmetric encryption uses two distinct keys to encrypt and decrypt data. A public key encrypts data, and a private key decrypts it. The most common and secure way of data encryption and decryption is using an [RSA algorithm](https://en.wikipedia.org/wiki/RSA_(cryptosystem)). This algorithm generates a public and a private key that are logically linked to each other.

To establish a connection between your computer (SSH client) and the webserver (SSH server), the SSH server encrypts a message using the public key and sends it to the client. Then, the client decrypts the message with a private key and sends it back to the SSH server. A connection is then established once the verification is complete.

### How to manage SSH keys on GitHub accounts
#### Generating the SSH keys
Before generating SSH keys, make sure you have two different GitHub accounts. Your account and your company's GitHub account.

You can use your command prompt or Git bash to run the commands. Navigate to the directory and run the below command for each GitHub account:

```bash
# navigating to the ssh directory, run the following command.
cd .ssh/

# Generate SSH key for each GitHub account
ssh-keygen -t rsa -C "your_name@email.com"
ssh-keygen -t rsa -C "your_name@organization_email.com"
```

The key generator will prompt you for a file name. Enter a unique name like:

```bash
id_rsa_personal
id_rsa_work
```

![Generating SSH key for my personal account](/engineering-education/using-multiple-ssh-keys-for-multiple-github-accounts/personal.jpg)

![Generating SSH key for my company's account](/engineering-education/using-multiple-ssh-keys-for-multiple-github-accounts/work.jpg)

Now that you have created two distinct keys that are listed below:

```bash
id_rsa_personal
id_rsa_work
```

After generating the keys, use the following command to check if all keys were created:

`ls ~/.ssh`

The following files list is presented:

![Generating a files list](/engineering-education/using-multiple-ssh-keys-for-multiple-github-accounts/ls-ssh.jpg)

#### Adding a new SSH key to your GitHub account
Now that we have the SSH keys let us link them with the Github account.

To obtain the SSH key execute this command:

`cat id_rsa_personal.pub`

![Getting SSH key](/engineering-education/using-multiple-ssh-keys-for-multiple-github-accounts/ssh-copy-key.jpg)

Copy the SSH key and then sign in to your GitHub account.

Follow the steps below to add an SSH key to your GitHub account:
1. On your GitHub, navigate to `Settings`
2. Choose `SSH and GPG keys` - Gnu Privacy Guard (GPG) is an encryption technique that allows secure information sharing among parties.
3. Hit on button `New SSH Key`, give a significant title and paste the `key`
4. Finally, click the `Add` Key button

![Adding SSH key to your Github account](/engineering-education/using-multiple-ssh-keys-for-multiple-github-accounts/add-sshkey.jpg)

### Creating and updating the SSH config file
Finally, let us bring it all together in a config file. There are two GitHub accounts - the personal and work accounts. The personal account is the local account, and work is the global account.

The SSH config file is accessed by running this command:

`~/.ssh/config`

If it exists, you can edit it, or else it can be created using this command:

```bash
touch config
nano config
```

Update the config file by adding the following rules:

```bash
# Personal account, - the default config
Host github.com-personal github account
   HostName github.com
   User git
   IdentityFile ~/.ssh/id_rsa_personal
   
# Work account
Host github.com-organization github account   
   HostName github.com
   User git
   IdentityFile ~/.ssh/id_rsa_work
```

![Adding a config file](/engineering-education/using-multiple-ssh-keys-for-multiple-github-accounts/config.jpg)

In the code above, we have two different values. One is the work repository and another for the user's repository. The values enable you to add and update the SSH config of the GitHub repositories.

### Cloning the Repositories
Finally, we have to clone repositories. While cloning, make sure that you use the hostnames that we used during SSH configuration.

To clone the repositories, execute the below clone commands:

#### Cloning personal repository
Cloning your private projects, you use this command:

`git clone git@github.com:your-github-account/private-project-repo.git`

#### Cloning work repository
Cloning your company's projects, you will use this command:

`git clone git@github.myorganization.com:org-account/company-project-repo.git`

### Conclusion
To conclude, we have learned how to use multiple GitHub accounts using multiple SSH keys.

To summarize:
- The reader has learned what SSH Keys are and how they work.
- The reader has learned how to manage multiple SSH keys on multiple GitHub accounts.
- The reader has learned how to create and update an SSH config file
- Finally, the reader has learned how to clone repositories

Happy learning!

---
Peer Review Contributions by: [Srishilesh P S](/engineering-education/authors/srishilesh-p-s/)