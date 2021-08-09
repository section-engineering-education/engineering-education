---
layout: engineering-education
status: publish
published: true
url: /cryptography-in-computer-networking/
title: Cryptography in Computer Networking
description: This article will be a walk through on computer cryptography and network security in general.  
author: mackrine-awino
date: 2021-04-15T00:00:00-15:00
topics: [Security, Networking]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/cryptography-in-computer-networking/hero.jpg
    alt: 
---
Cybercrimes are becoming part of modern computer networking, putting businesses at risk of losing their data. In this article, I will be walking you through computer cryptography and network security in general.  
<!--more-->
### Prerequisites
To follow this article along it would be helpful to have the following:
- A basic understanding of computer networking.
- Computer Security general knowledge.

### Getting started
Cryptography refers to the technology that secures the information being transmitted, from one point to the next. At the lowest level, this is achieved by using algorithms and mathematical calculations.    

With data encryption, the sender and the recipient's privacy is protected i.e by ensuring the data only reaches the intended destination from the source.

### Cryptography process
Let's have a look at the data encryption process, the general 'journey' from the source to the recipient.  
 
#### Step 1: Encryption
This refers to the process of manipulating a piece of information that usually occurs in the form of plain text using code or encrypting algorithms before transit. This ensures that the information is converted into a form that the unintentional recipient cannot understand.  

The encrypted information is then called [cyphertext](https://whatis.techtarget.com/definition/ciphertext#:~:text=Ciphertext%20is%20encrypted%20text%20transformed,the%20ciphertext%20back%20into%20plaintext.). The cipher-text is non-readable is the info in transit.  

#### Step 2: Decryption
Decryption converts ciphertext (encrypted text) to plain text. This is done at the receiving end using a code and decryption keys. Special software can also be used for decryption using algorithms to crack decryption.  

### Cryptographic algorithms
Cryptographic algorithms are processes that cryptocurrency uses to encrypt and decrypt messages to secure communication between devices and applications.

### Cryptography classes
There exist 3 known types of cryptography, they include the following:  
1. Symmetric-key 
2. Hash Function
3. Asymmetric

Let's take a quick look at these different cryptography classes.

### 1. Symmetric-key cryptography (commonly know as secret key cryptography)
These methods works very simply, it employs the use of the same secret key on both ends, i.e encryption, and decryption.  
To ensure that there is security, the sender and recipient of the message has an access to the key, they being the only two parties involved.  

On one end, the sender uses this key to secure the message by converting it to cyphertext, an encrypted message while at the destination, the recipient uses this key to decrypt the message.  

Symmetric encryption comes in two forms, these are:

1. Block algorithms:
Bit lengths of data are encrypted into blocks of electronic data using specific private keys. As the data is being encrypted, the system keeps the data in memory as it waits for the entire block to be loaded before encryption.

2. Stream algorithms:
The data is encrypted because it streams instead of being retained in the system's memory to wait for a complete block. You can view [more information here](https://www.sciencedirect.com/topics/mathematics/stream-cipher).  

### 2. Asymmetric cryptography (commonly known as public cryptography)
Unlike symmetric, this method employs the use of 2 keys, both the public and private keys. As the name suggests, a public key can be distributed freely, unlike a private key which has to remain a mystery.  

How these concept works is also very simple, the public key that you have access to is used to encrypt the message, while it's vice versa for private keys.

An example of this type of cryptography is [RS](https://www.tutorialspoint.com/cryptography_with_python/cryptography_with_python_understanding_rsa_algorithm.htm) algorithm.  

Revrest-Shamir-Adleman (RSA) is one of the safest commonly used data encryption methods.  

Keys for the RSA algorithm are generated in the following [example](https://www.geeksforgeeks.org/how-to-solve-rsa-algorithm-problems/):

- Pick two different large random numbers i and j ..... The numbers must be kept secret.

- Compute n = ij ... where n is the modulus for the public and private keys.

- Calculation totient: Ø(n)=(i-1)(j-1)

- Select the integer e, such as 1 <e<Ø(n) where e Ø (n) is from the co-prime, so e is the public key exponent.

- Total Count: Total (N) = (I-1) (J-1
          
- Pick two different large random numbers i and j ..... these numbers should be kept secret.

- Compute k to satisfy the computation relation ≡1 (mod n (n)) i.e: ke = 1 + x = (n) for some integer x.

- Calculate k = (1 + xØ (n)) / e to be an integer.
    - Where k is the private key exponent
          
### 3. Hashing work
Lastly, let's take a look at the hashing work cryptography. Hash functions typically map data of arbitrary size to fixed-size values. The return value of the hash function is called the hash value. 

These values make a table of a certain size known as a hash table. Hash functions do not use any key. These functions are also used for password encryption.  
 
MD5 is the fifth version of the message-digest algorithm. The MD5 produces 128-bit output. This was a commonly used hashing algorithm until some vulnerabilities began to appear so the MD5 was gradually dealt with.

### Cryptography concerns
As we discussed earlier, computer security has become a concern. Cryptography still has its drawbacks. Some bots have been known to bypass the encryption and decryption process exploiting the targetted system.

### Conclusion
Technically, cryptography is the answer to all computer network security issues that continue to surface on the Internet. This technology is showing promising results in dealing with the insecurity of confidential information during storage and during transit. However, issues like algorithms allegedly not being safe and algorithm patency have limited the spread of cryptography.

Happy learning!

---
Peer Review Contributions by: [Miller Juma](/engineering-education/authors/miller-juma/)


