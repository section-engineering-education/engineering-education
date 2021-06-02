---
layout: engineering-education
status: publish
published: true
url: /understand-hashing-in-cryptography/
title: Understanding Hashing in Cryptography
description: In this article we will cover the objectives of hashing which include data integrity and authentication. We will learn what hashing is, how it works, and what hash functions are in cryptography.
author: judy-nduati
date: 2021-01-05T00:00:00-14:00
topics: [Security]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/understand-hashing-in-cryptography/hero.jpg
    alt: Hashing in Cryptography image example
---
Hashing is a form of computer security that enables data integrity and authentication. Hashing, in most cases, is mistaken with encryption. Hashing is different from encryption. In this article, we will explore and learn more about hashing. We will also go over their differences.
<!--more-->
### Introduction
Hashing is a mathematical algorithm that converts plaintext to a unique text string or a ciphertext. 

That sounds confusing, right? Not to worry, we will explain it with the help of an example. 

Let’s say your name is Daniel, and you do not want to disclose your name to anyone. With the use of a hashing algorithm, you can represent your name differently in the form of a unique text string. It will only be you who can tell the unique text or number.

```txt
Daniel = FO8230hRq5K4g7nA
```

### Table of contents
- [What is Hashing](#what-is-hashing)
- [How hashing works](#how-hashing-works)
- [Cryptographic Hash Functions](#cryptographic-hash-functions)
- [Types of Hashing Algorithms](#types-of-hashing-algorithms)
- [Applications of Hashing](#applications-of-hashing)

### What is hashing
A [hash value](https://en.wikipedia.org/wiki/Hash_function) is the output of plaintext or ciphertext. Hashing is a cryptographic technique that transforms any form of data into a special text string. For any given input, there is a deterministic output. When you put a plaintext into a hashing algorithm in simpler terms, you get the same outcome. Suppose you change anything about the input or the plaintext to the hashing algorithm. The hashing output also becomes different.

### How hashing works
Hashing works by converting a readable text into an unreadable text of secure data. Hashing is efficiently executed but extremely difficult to reverse. Like I stated earlier, hashing and encryption are often mistaken. [Encryption](https://en.wikipedia.org/wiki/Encryption) is a two-way function. The plaintext can be encrypted into ciphertext and decrypted back into plaintext using a unique key. The difference between encryption and hashing is that encryption is reversible while hashing is irreversible.

Hashing takes the password a user enters and randomly generates a hash using many variables (text and numbers). When you input your password to log in, it is matched to the hash password. This is because the input is the same as the output.

For example:
In the bank, when you apply for a credit card. You create a password to help you access your account. The bank system does not save your password. The bank system runs the password through a hashing algorithm. It then saves the hash as your password. Every time you attempt to log in to your account. The bank system compares the password you enter with the hash it has saved. Only when the two-match, do you get authorization to access your bank account.

Hashing enables people to get data authorization without knowing the content on the data. We use hashing algorithms and databases to store passwords. Passwords are saved in the form of a hash value or a hash password rather than as plaintext. The hash value makes the data more secure. 

Cryptographic hashing provides a barrier to potential attackers. In case a malicious person tries accessing the database, the person can see the hashes. However, the attacker cannot reverse the hash value back to the actual password.

The purpose of hashing is:
- To verify data integrity.
- Authentication.
- To store sensitive data.

### Cryptographic hash functions
A hash function is an algorithm that transforms data of arbitrary size into a fixed size output. The output is a ciphered text called a hash value or a digest. The main objective of a cryptographic hash function is verifying data authenticity.

Hash functions often are used in passwords. Passwords in any secure database are stored in the form of hash values or digests. It is not safe to store passwords in the form of plain text in any database. Each time you log in, your password is hashed into a digest and compared against the one stored in a database.

Keep in mind that a hash algorithm or function is mainly used for comparison purposes and not for encryption.

Here are the properties of a hash function:
- **Deterministic** - The output will be the same for a given outcome.
- **Not reversible** – We can't reverse a hash function back to the original password.
- **Collision resistant** – Two inputs do not result in the same output.
- **Non-predictable** – A hash function randomly generates a unique hash value that is not predictable.
- **Compression** – The hash function's output is much smaller than the input size.

Characteristics of a hash function:
- **Secure** – A hash function is irreversible. It is a one-way function.
- **Unique** – Two different datasets cannot produce the same digest.
- **Fixed-size** – The hash function gives a fixed size digest.

### Types of hashing algorithms
#### Message digest 5 (MD5)
Message digest 5 (MD5) is a one-way cryptographic hash algorithm. It generates a 128-bit string value as the hash value or the digest. [MD5](https://www.md5hashgenerator.com/) is often used to verify data integrity.

#### Secure hashing algorithm 1 (SHA1)
This is a cryptographic hash algorithm, that generates a 160-bit string value as the hash value. This hashing algorithm was developed by the National Security Agency (NSA). [SHA1](https://en.wikipedia.org/wiki/SHA-1#:~:text=In%20cryptography%2C%20SHA-1%20) is commonly used in security and data integrity applications.

#### Secure hashing algorithm 256 (SHA256)
This is a cryptographic hash algorithm that creates a 256-bit (32 bytes) string value as the hash value. [SHA256](https://www.movable-type.co.uk/scripts/sha256.html) often checks the data integrity for hash authentication and digital signatures.

### Applications of hashing
#### Password storage
Hashing protects how passwords are stored and saved. Instead of keeping a password, in the form of a plaintext. It is stored as a hash value or a digest. The hash values are stored in a hash table.

An intruder can only see the hash values and cannot log into a system using the hash value.

#### Password verification
Hashing is used for password verification every time you login into an application, account, or system. A password verifies if you are the actual user of that account. If the password you enter matches the hash value on the server-side, you get authorization.

#### Checking of data integrity
Hashing checks for data integrity. It gives the user assurance that no data has been modified and the data is correct. It also assures the user that the data is original.

### Conclusion
In conclusion, hashing and hash functions are essential tools in computer security. We have learned the objectives of hashing which include data integrity and authentication. We have learned what hashing is, how it works, and went over hash functions in cryptography. I hope this article will give you an in-depth understanding of hashing in cryptography.

---
Peer Review Contributions by: [Lalithnarayan C](/engineering-education/authors/lalithnarayan-c/)
