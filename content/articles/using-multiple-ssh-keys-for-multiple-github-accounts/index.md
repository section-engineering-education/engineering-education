---
layout: engineering-education
status: publish
published: true
url: /using-multiple-ssh-keys-for-multiple-github-accounts/
title: Using Multiple SSH Keys for Multiple GitHub Accounts
description: In this article, we will go over how to create and work with SSH keys to use multiple GitHub accounts. We will also learn how to create and update an SSH config file.
author: wangui-leah
date: 2021-07-31T00:00:00-14:15
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/using-multiple-ssh-keys-for-multiple-github-accounts/hero.jpg
    alt: Multiple SSH and GitHub accounts image
---
For most developers, there may be a need to run multiple GitHub accounts on one computer. For instance, you can run an Organization's GitHub account and another one for your personal projects all on the same computer.
<!--more-->
In this article, you will learn how to [use multiple SSH keys for different GitHub accounts](https://gist.github.com/jexchan/2351996). While working with two different GitHub accounts, you must set them up using an SSH key.

### Table of contents
- [What are SSH Keys?](#what-are-ssh-keys)
- [Why should you use SSH keys with Git and Github?](#why-should-you-use-ssh-keys-with-git-and-github)
- [The Difference between adding 2FA on your GitHub Account VS Using SSH Keys](#the-difference-between-adding-2fa-on-your-github-account-vs-using-ssh-keys)
- [How to manage SSH Keys on GitHub Accounts](#how-to-manage-ssh-keys-on-github-accounts)
- [Creating and updating the SSH config file](#creating-and-updating-the-ssh-config-file)
- [Cloning the Repositories](#cloning-the-repositories)
- [Conclusion](#conclusion)

### Prerequisites
To grasp what this article entails, it is crucial to have a good understanding of how GitHub works.

### What are SSH keys?
[SSH (Secure Shell)](https://en.wikipedia.org/wiki/Secure_Shell_Protocol) is a cryptographic network protocol that allows a single computer to connect with a server over the internet securely. SSH is best used for accessing remote servers.

SSH is designed to offer secure encryption, verification, and communication between computers. It provides a safe way of executing commands and configuring services remotely.

The SSH technology is often performed using the client-server model. So, you can securely log in remotely from one system to another and transmit files.

[A client-server model](https://en.wikipedia.org/wiki/Client%E2%80%93server_model) is a distributed system architecture on a computer network that splits into two sections. Computers that request a service or a request (client) and computers that serve clients with a response (Server). The client-server model is a way for computers to communicate via a computer network or the internet.

Setting up SSH, you use a pair of keys - a public key and a private key. A public key is a key that can be accessed by anyone on the internet, while a private key is specific to a particular user.

A public key is stored on the SSH server, and a private key is stored on your SSH client. So basically, SSH uses [asymmetric encryption](https://sectigostore.com/blog/what-is-asymmetric-encryption-how-does-it-work/).

Asymmetric encryption uses two distinct keys to encrypt and decrypt data. A public key encrypts data, and a private key decrypts it. The most common and secure way of data encryption and decryption is using an [RSA algorithm](https://en.wikipedia.org/wiki/RSA_(cryptosystem)). This algorithm generates a public and a private key that are logically linked to each other.

To establish a connection between your computer (SSH client) and the webserver (SSH server), the SSH server encrypts a message using the public key and sends it to the client. Then, the client decrypts the message with a private key and sends it back to the SSH server. A connection is then established once the verification is complete.

### Why should you use SSH keys with Git and Github?
When working with a GitHub account, you identify yourself to GitHub using your username and password. On the other hand, the SSH key is an alternate way of identifying your GitHub account.

As stated earlier, SSH keys come in pairs of public and private keys. A public key is shared with Git and GitHub services, and a private key is stored on your computer. If the keys match, you are granted access. The cryptography behind SSH keys ensures that no one can decrypt your private key from the public one.

### The Difference between adding 2FA on your GitHub Account VS Using SSH Keys
[Two-factor authentication (2FA)](https://docs.github.com/en/github/authenticating-to-github/securing-your-account-with-two-factor-authentication-2fa/about-two-factor-authentication) is a security technique used when logging into applications. With 2FA, you use a username and password to log in and provide another form of authentication.

Adding a 2FA on your GitHub account enables GitHub to generate an authentication code any time a user attempts to log in. On the other hand, SSH key grants access to any user using it to log into the server. Thus, it offers both client and server authentication. This is through public and private keys.

### How to manage SSH keys on GitHub accounts
#### Generating the SSH keys
Before generating SSH keys, make sure you have two different GitHub accounts. Your account and your company's GitHub account.

You can use your command prompt or Git bash to run the commands. Navigate to the directory and run the command below for each GitHub account:

```bash
# navigating to the ssh directory, run the following command.
cd .ssh/

# Generate SSH key for each GitHub account
ssh-keygen -t rsa -C "your_name@email.com"
ssh-keygen -t rsa -C "your_name@organization_email.com"
```

The key generator will prompt you for a file name. 

Enter a unique name like:

```bash
id_rsa_personal
id_rsa_work
```

![Generating SSH key for my personal account](/engineering-education/using-multiple-ssh-keys-for-multiple-github-accounts/personal.jpg)

![Generating SSH key for my company's account](/engineering-education/using-multiple-ssh-keys-for-multiple-github-accounts/work.jpg)

Now that you have created two distinct keys which are listed below:

```bash
id_rsa_personal
id_rsa_work
```

After generating the keys, use the following command to check if all keys were created:

```bash
ls ~/.ssh
```

The following files list is presented:

![Generating a files list](/engineering-education/using-multiple-ssh-keys-for-multiple-github-accounts/ls-ssh.jpg)

#### Adding a new SSH key to your GitHub account
Now that we have the SSH keys let us link them with the Github account.

To obtain the SSH key execute this command:

`cat id_rsa_personal.pub`

![Getting SSH key](/engineering-education/using-multiple-ssh-keys-for-multiple-github-accounts/ssh-copy-key.jpg)

Copy the SSH key and then sign in to your GitHub account.

Follow the steps below to add an SSH key to your GitHub account:

1. On your GitHub, navigate to `Settings`.
2. Choose `SSH and GPG keys` - Gnu Privacy Guard (GPG) is an encryption technique that allows secure information sharing among parties.
3. Hit on the `New SSH Key` button, give it a significant `Title` and paste the `Key`.
4. Finally, click the `Add SSH key` button.

![Adding SSH key to your Github account](/engineering-education/using-multiple-ssh-keys-for-multiple-github-accounts/add-sshkey.jpg)

### Creating and updating the SSH config file
Next, let us bring it all together in a config file. There are two GitHub accounts - the personal and work accounts. The personal account is the local account, and work is the global account.

The SSH config file is accessed by running this command:

```bash
~/.ssh/config
```

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

In the above code, we have two different values. One is the work repository and another for the user's repository. The values enable you to add and update the SSH config of the GitHub repositories.

### Cloning the repositories
Next, we have to clone repositories. While cloning, make sure that you use the hostnames that we used during SSH configuration.

To clone the repositories, execute the clone commands below:

#### Cloning personal repository
To clone your private project, we can use this command:

```bash
git clone git@github.com:your-github-account/private-project-repo.git
```

Here, `your-github-account` will be the account username, and `private-project-repo` will be the name of the personal project's repository.

#### Cloning work repository
When cloning your company's project, we will use this command:

```bash
git clone git@github.myorganization.com:org-account/company-project-repo.git
```

Here, `your-github-account` will be the account username, and `company-project-repo` will be the name of the company project's repository.

### Conclusion
To conclude, we learned how to access multiple GitHub accounts using multiple SSH keys, at the same time.

To summarize:
- The reader has learned what SSH Keys are and how they work.
- The reader has learned how to manage multiple SSH keys on multiple GitHub accounts.
- The reader has learned how to create and update an SSH config file.
- Finally, the reader has learned how to clone repositories.

Happy coding!

---
Peer Review Contributions by: [Srishilesh P S](/engineering-education/authors/srishilesh-p-s/)