### Introduction
Most people often misunderstand the term `hacking`. From your perspective, you might think that hacking is the act of trying to gain access to certain network servers. Well, you might be right.

But, `hacking` is an attempt to explore methods of breaching a defense mechanism and exploiting a weakness of a system to prevent unauthorized parties into the system by sealing the loophole found in the system. This form of hacking is commonly known as `penetration testing`.

### Table of contents
- [Objectives](#objectives)
- [Prerequisites](#prerequisites)

- [How to install John the Ripper](#how-to-install-john-the-ripper)
- [How John the Ripper cracks passwords](#how-john-the-ripper-cracks-passwords)

- [Example cases of cracking passwords](#example-cases-of-cracking-passwords)
- [Conclusion](#conclusion)

### objectives
In this tutorial, we are going to learn how to spot weak passwords in a system. We will use a very powerful security tool known as `John the Ripper`, widely used by security specialists with the Kali Linux operating system.

`John the Ripper` is a free, open-source password cracking and recovery security auditing tool available for most operating systems.
It cracks passwords by performing a dictionary attack on the target machine and comparing the password hash with its password hash database.

> **Disclaimer:** This tutorial is intended solely for academic purposes, and any action taken in response to any of the materials in this guide is entirely your responsibility.

### Prerequisites
Before you begin any hack or password cracking, you should have the following with you:

- [Kali Linux](https://www.section.io/engineering-education/getting-started-with-kali-linux/) and John the ripper installed on your machine.
- [Git](https://git-scm.com/downloads) installed on your system. 

### How to install John the Ripper
John the Ripper is usually pre-installed in Kali Linux but if you don't have it yet, you can follow the steps below to install it in a Linux based machine.

If you are facing any challenges with Kali Linux, I suggest you go through [getting started with Kali Linux](https://www.section.io/engineering-education/getting-started-with-kali-linux/) article.

There are numerous ways of installing John the Ripper on your machine but we will look at some of the basic ones:

#### 1. Installing from the source
Open the terminal by simultaneously holding **Ctrl+Alt+T** and run the command below.

```bash
$ mkdir src
```
This creates a directory where we'll store all our files.

Navigate to the `src` directory and clone John the Ripper repository as shown below.

```bash
$ cd src
```
```bash
$ git clone https://github.com/openwall/john.git
```

![Cloning John the Ripper repository](/engineering-education/password-cracking-with-john-the-ripper/clone.png)

This creates a directory named `John`. To make it active, we need to run the command below.

```bash
$ cd john
```
Navigate to the `src` directory where we'll set and configure the compilation sources.
```bash
$ cd src
```
```bash
$ ./configure
```
![Configuring files in src directory](/engineering-education/password-cracking-with-john-the-ripper/configure.png)

Run the `make` command to compile source code into executable programs and libraries. This might take some time depending on your machine and the resources allocated to it.

```bash
$ make
```
Lastly run the `make install` command to install John the Ripper.

```bash
$ make install
```
![Run make install command](/engineering-education/password-cracking-with-john-the-ripper/make_install.png)

Run the commands below to see if the installation was successful.
```bash
$ cd ..
```
```bash
$ cd run
```
```bash
$ ./john
```
![Confirm Installation](/engineering-education/password-cracking-with-john-the-ripper/run.png)

#### 2. Installing from the package
You can also install John the Ripper by running the command below:

```bash
$ sudo apt install john
```

![Install from package](/engineering-education/password-cracking-with-john-the-ripper/installing.png)

### How John the Ripper cracks passwords
During the cracking process, John the Ripper uses a rainbow table approach where it takes words from an in-built dictionary that comes with it.

It then compiles the variations of that dictionary and compares the hashed password to what is in the password file trying to find a match. This is repeated until a match is found.

### Example cases of cracking passwords
You will need to run different commands depending on the type of the target you are exploiting.
Let's look at some instances we might come across when cracking passwords using John the Ripper.

#### 1. Cracking a `zip/rar` password-protected file

Cracking a `zip` or `rar` file password is done using the same approach.

First, we will need to access the hash of the password we are going to crack.
Note the name of your zip file as you will be required to state it in the rest of the commands.

To access the password hash, navigate to the location of your zip password-protected file and run the command below in the terminal:
```bash
$ zip2john Test.zip
```

You can export the output to a text document to save the password hash since we are going to use it later.
```bash
$ zip2john Test.zip > hash.txt 
```

To begin the attack on your zip file, run the command below:
```bash
$ john --format=zip hash.txt
```

In the command above, we have specified the format of the target file.

The password cracking process is initiated. This is where the strength of the password comes in. The stronger the password, the more the time taken to perform an attack.

After a successful attack, the password will be displayed on the terminal.

#### 2. Cracking a user account password in Kali Linux

Moving on, we will learn how to crack another user account's password using John the Ripper.

First, let's create another user account that we are going to crack its password.
Run the command below in the terminal.
```bash
$ useradd -r James
```

We have created a user account named `James`.

Now, let's set the password for the account.
```bash
$ passwd James
```

Run the command below to crack James' password.
```bash
$ john /etc/shadow
```

John the Ripper will first identify the hash method and display it on the terminal. It then decodes the password hash into a raw password and displays it as well.

### Conclusion
In this tutorial, we have learned the following:
 - Installing John the Ripper in a Kali Linux machine.
 - Password cracking of a zip/rar password-protected file.
 - Creating and cracking a secondary user account's password on a Kali Linux machine.
