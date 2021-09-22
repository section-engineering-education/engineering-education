---
layout: engineering-education
status: publish
published: true
url: /how-password-hashing-occurs/
title: How Password Hashing Occurs
description: This tutorial will discuss how passwords are converted into a hash form and stored. We will also discuss how they are changed from hash form to raw format.
author: koros-wkd
date: 2021-09-22T00:00:00-06:50
topics: [Security]
excerpt_separator: <!--more-->
images:

    - url: /engineering-education/how-password-hashing-occurs/hero.jpg
      alt: How Password Hashing Occurs hero image
---
Nowadays, many people store a lot of sensitive information on their phones, laptops, and other gadgets. 
<!--more-->
To keep this information safe, some users often set secret passwords, PINs, and even use biometric sensors like fingerprints to limit access to the information.

In this tutorial, we will specifically look at data protection using passwords. We are going to see how passwords are converted into hash form and how they are stored. 

We will further discuss how passwords are retrieved from hash form to raw format.

### What is password hashing?
Storing raw passwords on a device may be insecure since unauthorized parties may access them remotely. This calls for password hashing.

`Password Hashing` is the process of converting a raw password into a series of characters that cannot be easily interpreted by a human or decoded quickly by an unauthorized machine.

### Hashing algorithms
Hashing can be achieved using different types of `hashing algorithms`.

#### How hashing algorithms work
The hashing algorithm converts plain text entered by the user. 

For instance, `test123` is converted into a series of scrambled characters such as `i7def35tvwu4i7v43dfgb23ieeb4` that can only be decoded by the algorithm during the retrieval process.

The password strength is determined by the complexity of the plain text entered by the user. In other words, the simpler the text the easier the password is to crack and vise versa.

Below is a list of different hashing algorithms that can be utilized:

**SHA (Secure Hashing Algorithm)**

This is the default hashing algorithm that converts plain passwords into hashed passwords of 256-bit size. 

There are different versions of SHA. For instance, `SHA1` produces a password hash of 160 bits whereas `SHA2` gives an output of 256 bits.

**SSHA (Salted Secure Hashing Algorithm)**

This Hashing Algorithm is similar to SHA only that it involves adding random characters into the raw password to generate a different hash from the intended one. 

This process is known as salting.

**MD5 (Message-Digest Algorithm)**

This format is the fifth version of the Message-Digest Algorithm. It is similar to SHA only that it produces a string of size 128 bits. 

MD5 was the commonly used Hashing Algorithm until it was found that it could generate the same hash for two different passwords. 

This limitation is known as `collision`.

### Step 1 - Hashing a password using Python
We are going to use a practical example to see how password hashing occurs.

In this case, we will use the `SHA-256 hashing algorithm` and `Python`. To make it simpler, we will use [replit.com website](https://replit.com/languages/python3).

Just like any IDE, `replit` allows you to write, run and save code. For our case, we will run code on the platform and see its output. 

Pay attention to all code lines since they explain the steps that occur during hashing.

First, navigate to the website [replit.com](https://replit.com/languages/python3). 

After setting up the environment, import the `sha256` constructor from the `hashlib module`, as shown below:

```python
from hashlib import sha256
```

Now, let's instantiate the `sha256` class:

```python
h = sha256()
```

Using the `update()` method, we will then update the hash object:

```python
h.update(b'test123')
```

Then use the `hexdigest()` method to digest the string passed via the `update()` function. This is the hexadecimal representation of the hash:

```python
hash = h.hexdigest()
```

Lastly, print the `hash` variable to output the results or the hashed form of the input text.

```python
print(hash)
```

You can run the complete script once, as demonstrated below:

```python
from hashlib import sha256
h = sha256()
h.update(b'test123')
hash = h.hexdigest()
print(hash)
```

When you run the script, you should see the following output:

```bash
f84ad825bc3e5ccc7f5e35b6a5e83cb79a998f106e79410ae382c7d43019b6d6
```

**Summary**
This process allows you to change a string to a hashed output.

**Input**
```bash
example321
```

**Output**
```bash
f84ad825bc3e5ccc7f5e35b6a5e83cb79a998f106e79410ae382c7d43019b6d6
```

Below is the visual representation of the code input and output:

![Python Script](/engineering-education/how-password-hashing-occurs/script.png)

### Step 2 - Reversing hashed password to plain text
So far, we have learned how to convert plain text into a hash. Let's now learn how we can convert back the password hash into plain text.

There are plenty of sites on the internet that you can use to reverse the hash to plain text. 

But for the hash to be successfully reversed, the site should have the password hash in its dictionary.

> **Disclaimer: ** - The example shown below is meant for educational purposes only. 

Let's take a look at one of the most commonly used password hash cracking sites; `Crack Station`.

Navigate to the link below to access the Crack Station site.

[Crack Station](https://crackstation.net/)

Enter Your password hash into the space provided and crack the password hash.

Use the password hash below as an example:

```bash
9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08
```

The plain text of the hash after being cracked is the word `test`

A visual example of the whole process is shown below:

![Password crack](/engineering-education/how-password-hashing-occurs/crack.png)

### Step 3 - Storing the password hash
Let's now take a look at how password hashes are stored in computers - both on Windows and Kali Linux.

#### Windows
0n Windows, password hashes are stored in a folder in the `C:` drive. It's challenging to open these files since they are encrypted using a boot key.

The path to the files is:

`C:/Windows/System32/config/SAM`

`C:/Windows/System32/config/SYSTEM`

#### Kali Linux
Kali Linux, on the other hand, stores its password hash in the `etc/shadow` file which is only in a readable form. 

To access this file, you should have root access permission.

### Password hashing mechanisms
**Salting**

Salting is the process where random characters are added into passwords so that the hash generated is more complex and harder for an unauthorized party to crack.

Many users use a combination of common names or their pets' names to generate passwords. This poses a threat since hackers have a list of commonly used words known as a `dictionary`. 

Hackers can generate the hashes of these words and use them to match the password hashes stored by users. 

To solve this, you should set a strong password that is not common and hard to decode. That is where password salting comes in. 

It allows you to add a series of random characters into your original password and the hash generated will be different from the initial password hash.

**Peppering**

When hackers exploit an SQL injection vulnerability, they will have full access to your password hash whether salted or not. 

To solve this problem, the user adds encryption to the hashed password with a symmetrical encryption key. This `key` is referred to as the `pepper`.

The key is not stored in the database as the password hash to deter the hacker.

### Password protecting yourself
A lot of user accounts are at risk of been accessed by unauthorized parties. 

This calls for enhanced data protection using strong passwords.

Let's see how we can achieve this.

**Using a multi-character password**

A strong password should have an unpredictable pattern. This includes a mixture of `letters`, `numbers`, and `symbols` in your password. 

This will generate a complex hash that will not be decoded easily.

> Tip: Avoid using characters in your name or predictable numbers.

**Change your password frequently**

Changing your password frequently will synchronize your password hash. This lowers the risk of it been decoded by hackers.

If you want to learn more about password cracking, go through the [Password cracking with John the Ripper](https://www.section.io/engineering-education/password-cracking-with-john-the-ripper/) tutorial.

### Conclusion
In this tutorial, we have learned:
- Password hashing.
- Different hashing algorithms.
- Password hashing mechanisms.
- Storage of hashed passwords on computers.
- Password protection.

---
Peer Review Contributions by: [Eric Gacoki](/engineering-education/authors/eric-gacoki/)
