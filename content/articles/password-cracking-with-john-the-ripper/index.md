### Password Cracking with John the Ripper

#### What is Hacking?
Most people often misunderstand the term `hacking`.
From your perspective, you may think that hacking is an act where some guy is in the basement trying to gain access to the NASA servers. Well yes, you may be partially right.

But also, `hacking` is trying to explore methods of breaching a defense mechanism and exploiting a weakness of a system to prevent unauthorized parties into the system by sealing the loophole found in the system. This form of hacking is commonly known as `Penetration testing`.

### Introduction
In our tutorial, we are going to learn how to spot weak passwords in a system. For our case, we are going to use a very powerful tool known as `John the Ripper`, widely used by hackers and security specialists in Kali Linux. 

`John the Ripper` is a free, open-source password cracking and recovery security auditing tool available for most operating systems.
It cracks passwords by performing a dictionary attack on the target machine by comparing the password hash with its password hash database.

> **Disclaimer:** This tutorial is meant for educational purposes only and any action that is directly or indirectly related to any content in this article is your sole responsibility.

### Prerequisites
Before you begin any hack or password cracking for that instance, you should have the following with you;

   * A machine installed with [Kali Linux](https://www.section.io/engineering-education/getting-started-with-kali-linux/)
   * John the Ripper installed.
   

### Installing John the Ripper
John the Ripper is usually pre-installed in Kali Linux but if not in your case, You can follow through the steps below to successfully install John the Ripper in your Kali Linux Machine.
If you are struggling with Kali Linux, I suggest you go through the [Getting Started with Kali Linux](https://www.section.io/engineering-education/getting-started-with-kali-linux/) article.

There are various ways of installing Kali Linux to your machine but we will look at some of the basic ways:

Open the terminal by holding the **ctrl+alt+T** simultaneously and run the command below.
create a directory to store all our files.
```
    $ mkdir src
```
Navigate to the directory and clone John the Ripper repositories as shown below.

```
    $ cd src
```

```
    $ git clone https://github.com/openwall/john.git
```

![Cloning the John Repositories](/engineering-education/password-cracking-with-john-the-ripper/clone.png)

We will get a directory John and we will make it active by navigating to it.
```
    $ cd john
```
Let's now navigate to a directory known as `src` where we will set the sources for the compilation and we do so by running the command as shown.
```
    $ cd src
```
```
    $ ./configure
```
![Configuring files in src](/engineering-education/password-cracking-with-john-the-ripper/configure.png)

Now run the `make` command. This might take some time depending on the machine you have and the resources allocated to your Kali Linux machine.
```
    $ make
```
Now lastly run the `make install` command to install John the Ripper.
```
    $ make install
```
![Make Install](/engineering-education/password-cracking-with-john-the-ripper/make_install.png)

To confirm if the installation was successful, run the command shown below.
```
    $ cd ..
```
```
    $ cd run
```
```
    $ ./john
```
![Confirm Installation](/engineering-education/password-cracking-with-john-the-ripper/run.png)

 


**You can also install John the Ripper by running the command below:**

Open your terminal and run the command below:

```
    $ sudo apt install john
```
![Installing John the Ripper](/engineering-education/password-cracking-with-john-the-ripper/installing.png)

The command will run and successfully install John the Ripper.

### How John the Ripper will be cracking the Passwords
During the cracking process, John the Ripper is going to create a rainbow table approach where it will take words from a dictionary. It will then compile the variations of that dictionary and compare the hashed password to what you have in your password file and see if there is a match.


### Cracking the Passwords 

In password cracking, you will need to run different commands depending on the type of target you are exploiting.
Let's see some instances we might come across when cracking passwords using John the Ripper.

   1. **Cracking a zip/rar password-protected file**

Cracking a password of a zip or rar file is the same process. Since this is the case, we will use the zip file to illustrate the point.

First, we will need to access the hash of the password we are going to crack.
Be keen to note the name of your zip file since you will need to state it with the rest of the command.

To access the password hash, navigate to the location of your zip password-protected file and run the command below on the terminal:
```
    $ zip2john Test.zip
```

You can export the output to a text document to save the password hash since we are going to use it later.
Save the output as shown below:
```
    $ zip2john Test.zip > hash.txt 
```

To begin the attack on your zip file, run the command as shown;
```
    $ john --format=zip hash.txt
```

In the command above, we have stated the file format and then specified the target file.

The password cracking process will now begin. This is where the strength of the password comes in. The stronger the password, the more time it will take to perform an attack.

After a successful attack, the `password` will be displayed on your terminal.

   2. **Cracking a user account password in Kali Linux**

You can also crack another account's password on your Kali Linux using John the Ripper. We will now learn how to do so:

First, let us create another account that we are going to crack its password.
Run the command below on the terminal to create another user.
```
    $ useradd -r James
```

We have created an account and named it James.

Let's now set the password for the account.
```
    $ passwd James
```

Now run the command below to crack the password of the account name James.
```
    $ john /etc/shadow
```

John the Ripper will first identify the hash method and will display it to you. It will then decode the password hash into a raw password and then display the password.

### Summary
From this article, we have learned the following:

   - Installing John the Ripper into your Kali Linux machine.
   - Password cracking a zip/rar file
   - Cracking a user account on your Kali Linux machine