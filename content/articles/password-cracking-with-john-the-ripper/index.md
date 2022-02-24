---
layout: engineering-education
status: publish
published: true
url: /password-cracking-with-john-the-ripper/
title: Password Cracking with John the Ripper
description: This tutorial will walk the reader through the process of using John the Ripper to crack passwords with Kali Linux. John the Ripper is a free, open-source password cracking and recovery security auditing tool available for most operating systems.
author: koros-wkd
date: 2021-08-04T00:00:00-08:00
topics: [Security]
excerpt_separator: <!--more-->
images:

    - url: /engineering-education/password-cracking-with-john-the-ripper/hero.jpg
      alt: Password cracking with John the Ripper image
---

Most people often misunderstand the term `hacking`. From your perspective, you might think that hacking is the act of trying to gain access to certain network servers. Well, you might be right.

<!--more-->

But, `hacking` is also an attempt to explore methods of breaching a defense mechanism and exploiting a weakness of a system to prevent unauthorized parties into the system by sealing the loopholes found in the system. This form of hacking is commonly known as `penetration testing`, also known as **pen test**.

### Table of contents

- [What is Penetration Testing?](#what-is-penetration-testing)
- [Types of penetration testing](#types-of-penetration-testing)
- [Objectives](#objectives)
- [Prerequisites](#prerequisites)
- [How to install John the Ripper](#how-to-install-john-the-ripper)
- [How John the Ripper cracks passwords](#how-john-the-ripper-cracks-passwords)
- [Example cases of cracking passwords](#example-cases-of-cracking-passwords)
- [Conclusion](#conclusion)

### What is Penetration testing?

This is an attempt to identify the level of a security system by trying to gain access into the system through identified vulnerabilities with permission from authorized personnel. On the other hand, trying to bypass the system's security without permission is considered illegal and hence known as `Red Hat hacking`.

### Types of Penetration testing

Penetration testing can be practiced in different ways.

Let's take a look at some common ways a system's vulnerability can be exploited.

- `External Pen Test` - This is a type of attack where a pen tester uses publicly available information to try to gain access into a system. Vulnerabilities exploited can grant access to the Pentester to remotely gain access to private data. Loopholes like these are identified and sealed before unwanted parties gain access.

- `Internal Pen Test`- This is a type of Pen testing where the attacker tries to gain access to a system by physically accessing the internal resources, implanting a malicious drive, or taking the role of an ill-intended employee that grants remote access to private data.

- `Social Engineering`- It is said that the weakest link in any security system is the human being. The pen tester can try to extract useful information from an employee by asking questions or deceiving the employee. This type of penetration testing is known as social engineering.

Having known what Penetration testing is, let's see what **password cracking** is:

First, let's understand how passwords are stored on your PC or any server.

When you enter a password into an account, the password is not saved in a raw format. The `hashing algorithm` converts the raw password into a series of characters (hash) that would take a lot of time and resources to decode.

This is where `John the Ripper` comes in. `John the Ripper` is a free, open-source password cracking and recovery security auditing tool available for most operating systems.

It has a bunch of passwords in both raw and hashed format. This bunch of passwords stored together is known as a `password dictionary`.

Now to crack the password, **John the Ripper** will identify all potential passwords in a hashed format. It will then match the hashed passwords with the initial hashed password and try to find a match.

If a match is found in the password hash, John the Ripper then displays the password in raw form as the cracked password. The process of matching the password hashes to locate a match is known as a `dictionary attack`.

Having known how the password cracking process takes place, let's take a look at how John the Ripper executes commands in the crackig process.

### Objectives

In this tutorial, we are going to learn how to spot weak passwords in a system. We will use `John the Ripper`, widely used by security specialists with the `Kali Linux` operating system.

> **Disclaimer:** This tutorial is intended solely for academic purposes, and any action taken in response to any of the materials in this guide is entirely your own responsibility.

### Prerequisites

Before you begin any hack or password cracking, you should have the following with you:

- [Kali Linux](https://www.section.io/engineering-education/getting-started-with-kali-linux/) and John the ripper installed on your machine.
- [Git](https://git-scm.com/downloads) installed on your system.

### How to install John the Ripper

John the Ripper is usually pre-installed in Kali Linux but if you don't have it yet, you can follow the steps below to install it on a Linux-based machine.

If you are facing any challenges with Kali Linux, I suggest you go through [getting started with Kali Linux](https://www.section.io/engineering-education/getting-started-with-kali-linux/) article.

There are numerous ways of installing John the Ripper on your machine but we will look at some of the basic ones:

#### 1. Installing from the source

Open the terminal by simultaneously holding **Ctrl+Alt+T** and run the command below.

```bash
mkdir src
```

This creates a directory where we'll store all our files.

Navigate to the `src` directory and clone John the Ripper repository as shown below.

```bash
cd src
```

```bash
git clone https://github.com/openwall/john.git
```

![Cloning John the Ripper repository](/engineering-education/password-cracking-with-john-the-ripper/clone.png)

This creates a directory named `John`. To make it active, we need to run the command below.

```bash
cd john
```

Navigate to the `src` directory where we'll set and configure the compilation sources.

```bash
cd src
```

```bash
./configure
```

![Configuring files in src directory](/engineering-education/password-cracking-with-john-the-ripper/configure.png)

Run the `make` command to compile source code into executable programs and libraries. This might take some time depending on your machine and the resources allocated to it.

```bash
make
```

Lastly, run the `make install` command to install John the Ripper.

```bash
make install
```

![Run make install command](/engineering-education/password-cracking-with-john-the-ripper/make_install.png)

Run the commands below to see if the installation was successful.

```bash
cd ..
```

```bash
cd run
```

```bash
./john
```

![Confirm Installation](/engineering-education/password-cracking-with-john-the-ripper/run.png)

#### 2. Installing from the package

You can also install John the Ripper by running the command below:

```bash
sudo apt install john
```

![Install from package](/engineering-education/password-cracking-with-john-the-ripper/installing.png)

### How John the Ripper cracks passwords

During the cracking process, John the Ripper uses a rainbow table approach where it takes words from an in-built dictionary that comes with it.

It then compiles the variations of that dictionary and compares the hashed password to what is in the password file trying to find a match. This is repeated until a match is found.

### Example cases of cracking passwords

You will need to run different commands depending on the type of target you are exploiting.

Let's look at some instances we might come across when cracking passwords using John the Ripper.

#### 1. Cracking a `zip/rar` password-protected file

Cracking a `zip` or `rar` file password is done using the same approach.

First, we will need to access the hash of the password we are going to crack.
Note the name of your zip file as you will be required to state it in the rest of the commands.

To access the password hash, navigate to the location of your zip password-protected file and run the command below in the terminal:

```bash
zip2john Test.zip
```

You can export the output to a text document to save the password hash since we are going to use it later.

```bash
zip2john Test.zip > hash.txt
```

To begin the attack on your zip file, run the command below:

```bash
john --format=zip hash.txt
```

In the command above, we have specified the format of the target file.

The password cracking process is initiated. This is where the strength of the password comes in. The stronger the password, the more the time taken to perform an attack.

After a successful attack, the password will be displayed on the terminal.

#### 2. Cracking a user account password in Kali Linux

Moving on, we will learn how to crack another user's account password using John the Ripper.

First, let's create another user account that we are going to crack its password.
Run the command below in the terminal.

```bash
sudo useradd -r James
```

![Adding User](/engineering-education/password-cracking-with-john-the-ripper/user_add.png)

We have created a user account named `James`.

Now, let's set the password for the account.

```bash
sudo passwd James
```

Run the command below to crack James' password.

```bash
john /etc/shadow
```

John the Ripper will first identify the hash method and display it on the terminal. It then decodes the password hash into a raw password and displays it as well.

### Conclusion

In this tutorial, we have learned the following:

-   Installing John the Ripper in a Kali Linux machine.
-   Password cracking of a zip/rar password-protected file.
-   Creating and cracking a secondary user account's password on a Kali Linux machine.

---

Peer Review Contributions by: [Eric Gacoki](/engineering-education/authors/eric-gacoki/)
