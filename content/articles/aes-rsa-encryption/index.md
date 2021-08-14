---
layout: engineering-education
status: publish
published: true
url: /aes-rsa-encryption/
title: Understanding AES and RSA Encryption Algorithms
description: This article will cover two encryption algorithms, the AES (Advanced Encryption Standard) and RSA (Rivest, Shamir, Adleman). It will explain their functionalities and how to get started using them.
author: mackrine-awino
date: 2021-07-30T00:00:00-15:00
topics: [Security]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/aes-rsa-encryption/hero.jpg
    alt: Understanding AES and RSA encryption algorithms
---
Encryption is a way of enciphering data especially when it's in transit to prevent unauthorized personnel from gaining access to it. Encryption is always done with the intent of allowing only the intended recipient of a piece of data to have access to the data. 
<!--more-->
Maintaining the integrity, confidentiality, and availability of data and information is key in data communication and this is where data encryption comes in handy.

### Table of contents
1. [Prerequisites](#prerequisites)
2. [What is an encryption algorithm?](#what-is-an-encryption-algorithm)
3. [Getting started with the AES encryption algorithm](#getting-started-with-the-aes-encryption-algorithm)
4. [Functionality of the AES algorithm](#functionality-of-the-aes-algorithm)
5. [Getting started with the RSA encryption algorithm](#getting-started-with-the-rsa-encryption-algorithm)
6. [RSA algorithm functionality](#rsa-algorithm-functionality)
7. [Conclusion](#conclusion)

### Prerequisites
For a reader to understand this article, they should have the following prior knowledge:

- A basic understanding of the concept of data encryption and the need for encryption in data communication.
- A beginner's understanding of data [cryptography](/engineering-education/cryptography-in-computer-networking/).

### What is an encryption algorithm?
An encryption algorithm is a set of rules used to transform data into ciphertext using an encryption key. This will make the data appear to be completely different from the initial data and will seem random. 

The cipher will then be transmitted safely to a recipient who will then go ahead and recover the initial data through a process called decryption using a decryption key.

AES and RSA are both an example of the algorithms in data communication that are used for data encryption. AES is an acronym that stands for **Advanced Encryption Standard** while RSA stands for **Rivest, Shamir, Adleman**.

### Getting started with the AES encryption algorithm
AES was initially referred to as Rijndael which is a Symmetric [block cipher](https://en.wikipedia.org/wiki/Block_cipher) algorithm. 

It was specifically developed for encrypting electronic data back in the United States by the [National Institute of Standards and Technology](https://en.wikipedia.org/wiki/National_Institute_of_Standards_and_Technology). Ever since the AES has been used worldwide in encrypting confidential data.

AES was developed as a replacement for the [Data Encryption Standard](https://searchsecurity.techtarget.com/definition/Data-Encryption-Standard) after it started showing vulnerabilities to brute-force attackers.

### Functionality of the AES algorithm
The functionality of the AES algorithm might seem complex but in a real sense, it is really simple to understand. The first step is knowing that AES has 3 Block ciphers, namely:

- **AES-128**

As we already know, the encryption and decryption processes is done by using a key. This block cipher uses a key that is 128 bits long for encryption and decryption of a message and is the least secure of the three blocks available. 

Even though AES-128 has never been hacked, its resistance to brute-force attacks is worrying. Despite the security issues seen in AES-128, it is very fast and comes with a lot of efficiency in data encryption.

- **AES-192**

The AES-192 uses a key that is 192 bits long for the encryption and decryption of messages. It is more resistant to brute-force attacks as compared to AES-128 because it has a longer key, thereby more secure. Despite this, AES-192 is not commonly used, people tend to lean towards AES-256.

- **AES-256**

The AES-256 uses a key that is 256 bits long for the encryption and decryption of messages. This block is more secure when compared to the AES-128 and AES-192 because of the long length of the encryption key. 

The longer the encryption key, the more difficult the algorithm is to hack. AES-256 is therefore very resistant to brute-force attacks when compared to the two previous blocks.

AES being an asymmetric block cipher, means that the key used in encryption and decryption is a kept secret and is only made known to the sender and the recipient of the message. 

The key used when encrypting the message is usually the same key used to decrypt the message on the receiving end. When encrypting using AES, a person can either use AES-128, AES-192, or even the AES-256. During this encryption, some steps are followed to encrypt a message and these steps are done in rounds.

Each round is made up of several steps of substitution, transposition, and mixing of the message into ciphertext and also has a key called a [round key](https://www.quora.com/What-is-the-round-key-in-an-AES-algorithm).

Below is a simple diagrammatic representation flow of how AES encrypts data:

![AES algorithm flow.](/engineering-education/aes-rsa-encryption/aes-flow.png)

This illustrates that either of the 3 encryption keys is used to encrypt the message. The encryption process occurs in the "cipher" and an encrypted message is produced in the "ciphertext".

The encryption process has 10 rounds for a 128-bit long key, 12 rounds for a 192-bit long key, and 14 rounds for a 256-bit long key.

Below is a step by step explanation when encrypting data using the AES algorithm:

### Step 1: Generation of round keys
This occurs through a process called key expansion where the original secret key is used to derive round keys by use of Rijndael’s key schedule algorithm.

![round key generation](/engineering-education/aes-rsa-encryption/round.png)

*[Image Source: Wikipedia](https://en.wikipedia.org/wiki/Advanced_Encryption_Standard#/media/File:AES-AddRoundKey.svg)*

### Step 2: Mixing of the message into ciphertext
This involves combining each round key that has been generated above with the plain message being encrypted. This is done using the Additive [XOR algorithm](https://en.wikipedia.org/wiki/XOR_cipher).

### Step 3: Substituting the data received from step 2
This involves substituting the resultant data from step 2 in a substituting table.

![substitution](/engineering-education/aes-rsa-encryption/sub.png)

*[Image Source: Wikipedia](https://en.wikipedia.org/wiki/Advanced_Encryption_Standard#/media/File:AES-SubBytes.svg)*

### Sep 4: Shifting of rows
Shift all the bytes in the substitution table to the right.

![shift rows](/engineering-education/aes-rsa-encryption/shift.png)

*[Image Source: Wikipedia](https://en.wikipedia.org/wiki/Advanced_Encryption_Standard#/media/File:AES-ShiftRows.svg)*

### Step 5: Mixing
An algorithm is used to mix the contents of each column.

![mixing columns](/engineering-education/aes-rsa-encryption/mixcolumn.png)

*[Image Source: Wikipedia](https://en.wikipedia.org/wiki/Advanced_Encryption_Standard#/media/File:AES-MixColumns.svg)*

The entire process is then repeated several times with each repeat being called a round and encrypted with the round keys we generated in step 1.

### Getting started with the RSA encryption algorithm
RSA was named after its first describers Rivest, Shamir, and Adleman. Rivest–Shamir–Adleman is an asymmetric encryption algorithm used by modern computers in data encryption and decryption.

RSA uses two keys, one being the public key which is used for encryption and the private key used for data decryption hence it being an asymmetric algorithm. The encryption key is always made public and can be accessed by anyone while the decryption key is kept private.

This algorithm is based on the fact that finding factors of [composite numbers](https://en.wikipedia.org/wiki/Composite_number) is a difficult task.

Below is a simple diagrammatic representation flow of how RSA encrypts data:

![RSA structure](/engineering-education/aes-rsa-encryption/RSA.png)

### RSA algorithm functionality
Below you will find a step by step list of instructions on how to achieve encryption using the RSA algorithm:

### Step 1: Generate the encryption and decryption keys
To generate the keys:
- Pick any two large prime numbers and keep them secret.

For example, let's pick the prime numbers x and y

- Evaluate

```bash
z = xy where z is the modulus of the two keys being generated
```

- Evaluate the [totient](https://simple.wikipedia.org/wiki/Euler%27s_totient_function)

```bash
φ(z)=(x-1)(y-1)
```

- Pick any integer `e` in which `1 < e <  φ(z)` and `e` is the public key exponent.

- Evaluate `k` and keep it as the private key exponent as follows:
```bash
ke is [congruent](https://en.wikipedia.org/wiki/Modular_arithmetic) 1 in mod φ(z)

ke ≡ 1 (mod φ(z))
```

The public key is made of the modulus `z` and the exponent `e` while the private key is made of `x and y` and the private exponent `k`. The public key is made available to everyone but the private key should only be accessed by the recipient of the message.

### Step 2: Encrypting the message using the generated encryption key
- Send the public key `(z,w)` generated above to the person who wants to send a message and keep the private key.
- The message sender turns the message into a number `G`. The number `G` should be smaller than `z`. This is done using an agreed-upon protocol commonly referred to as [Padding scheme](https://simple.wikipedia.org/wiki/RSA_algorithm#Padding_schemes).
- The sender then computes the ciphertext of the message using the expression, `c = G^e  mod z` where `c` represents the ciphertext.

The receiver can decrypt the message using the expression `G = c^d`  mod `n` according to the [chinese remainder theorem](https://simple.wikipedia.org/wiki/Chinese_remainder_theorem).

### Conclusion
Encryption is key in matters of information security. It is therefore vital to learn about the different algorithms used in data encryption other than AES and RSA. This will help broaden your horizons as far as data security is concerned.

Blissful reading!

---

Peer Review Contributions by: [Willies Ogola](/engineering-education/authors/willies-ogola/)


