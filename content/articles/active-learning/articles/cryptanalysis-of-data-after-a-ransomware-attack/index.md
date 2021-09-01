---
layout: engineering-education
status: publish
published: true
url: /cryptanalysis-of-data-after-a-ransomware-attack/
title: Cryptanalysis of Data after A Ransomware Attack
description: This article seeks to explore the concept of cryptanalysis in light of data encrypted by a malicious actor seeking ransom to decrypt the data. The process of cryptanalysis will be clearly outlined, highlighting the various ethical ways to do the same putting into consideration the possible cryptographic algorithm that may have been employed in encrypting the data.
author: ruth-mare
date: 2021-08-23T00:00:00-04:35
topics: [Security]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/cryptanalysis-of-data-after-a-ransomware-attack/hero.jpg
    alt: Cryptanalysis hero image 
---
Cryptanalysis is a technique that has been majorly applied to helping find weaknesses in cryptographic algorithms and improve on them to make encryption robust to threats. Cryptanalysis can, however, be used to decipher data encrypted by malicious actors to save on the cost of paying the ransom and recover confidential data.
<!--more-->
The concepts described in this article will help understand this process.

### Table of contents
- [Prerequisites](#prerequisites)
- [What is cryptanalysis](#what-is-cryptanalysis)
- [Tools used in Cryptanalysis](#tools-used-in-cryptanalysis)
- [Methods of encryption](#methods-of-encryption)
- [Methods of decryption](#methods-of-decryption)

### Prerequisites
To follow along, you need:
- A basic understanding of ransomware as a security threat.
- A basic understanding of [Cryptography in computer networking](https://www.section.io/engineering-education/cryptography-in-computer-networking/).

### What is cryptanalysis
Cryptanalysis is the process by which an individual studies cyphertexts (encrypted data), codes, and cryptographic algorithms without prior knowledge of the original text (plaintext), the encryption key, or the encryption algorithm used.

Successful cryptanalysis normally cracks through an encryption algorithm used on some data resulting in exposure of plaintext without the application of the decryption key on the equivalent ciphertext.

Cryptanalysis aims to understand how encryption works and trying to weaken these encryption methods to be able to access the plaintext or in most instances to be able to understand cryptography and make it robust.

Targets of cryptanalysis are such as digital signatures and hashing algorithms.

In the face of a ransomware attack, a user’s data is encrypted by a bad actor who asks for payment of a ransom before they can decrypt the data.

Cryptanalysis can help break through the encryption algorithms used by these bad actors and be able to recover data without making any payment.

### Tools used in Cryptanalysis
Cryptanalysis employs the use of some software tools together with techniques to be able to crack through an encryption algorithm.

Some of the tools are such as:

**EverCrack:** This is a tool that is used in mono-alphabetic substitution and transposition ciphertexts. It breaks down complex ciphers systematically into their simple equivalents for cryptanalysis by a kernel.

**Jipher:** This is a tool used in attacking old ciphers.

**Crypto Bench:** It is a software used for various functions of cryptanalysis and can generate fourteen cryptography hashes and two checksums. It can encrypt with 29 and 6 different secret and public keys respectively.

**CalcChecksum:** This is a GUI tool used for computing various checksums.

**Ganzúa:** This is a tool used for both poly-alphabetic and mono-alphabetic ciphers and can work with close to any set of characters. In both applications, the relative frequencies for each character are calculated and output.

**Cryptol:** It is a tool designed for learning in a programming language used for the design and implementation of new ciphers and also, for the verification of existing cryptography algorithms. It allows the supervision of the functioning of algorithms in software programs, written to indicate the algorithms or ciphers.

### Methods of encryption
*Encryption* is the process of transforming plaintext using an encryption algorithm into a ciphertext that cannot be decoded. This ensures that anybody else who doesn't have the encryption key cannot understand the message

There are several methods of encryptions but the three major ones are:
- Advanced Encryption Standard (AES).
- Rivest-Shamir-Adleman (RSA).
- Data Encryption Standard (DES).

#### DES Encryption
This is an algorithm that encrypts only 56-bits of the data block at a time. This method of encryption however proved susceptible to easy hacking therefore robust variations of it were later developed such as Triple Data Encryption Standard (3DES). It has, however, served as the standard upon which future, more secure encryption algorithms are based. 3DES employs 3 times encryption by using 3 separate 56-bits keys instead of a single one. This mode of encryption is more secure but time-consuming to encrypt.

#### AES encryption
This method of encryption uses [symmetric key](https://www.section.io/engineering-education/cryptography-in-computer-networking/) encryption and is considered one of the most secure methods. A recipient would need a decryption key to decrypt the message.

Data in AES is encrypted in blocks whose sizes determine the name of the different [classifications](https://www.section.io/engineering-education/aes-rsa-encryption/#getting-started-with-the-aes-encryption-algorithm) of AES. AES-128, AES-192, and AES-256, all encrypt data blocks of 128, 192, and 256-bit sizes respectively.

#### RSA Encryption
[RSA](https://www.section.io/engineering-education/aes-rsa-encryption/#getting-started-with-the-rsa-encryption-algorithm) is majorly applied to data sent online and uses a public key for data encryption. The recipient on the other end of the communication channel will need their private key to decrypt the ciphertext.

### Methods of decryption.
Decryption: is a process by which ciphertext (encrypted text) is converted to plaintext normally done by the recipient at the other end of a communication channel using a specific decryption key. 
In a circumstance the decryption key cannot be accessed such as when a ransomware attack is encountered, special software such as mentioned in [Tools used in Cryptanalysis](#tools-used-in-Cryptanalysis) can also be used for decryption using some algorithms to crack decryption.

Some of the main decryption algorithms are:
### Brute force attack
This is a technique that employs a trial-and-error methodology until every possibility is exhausted and a match to the ciphertext is found.

### Man-in-the-middle attack
In this technique, a cryptanalyst impersonates both the sender and the receiver to the two parties involved in the communication by intercepting the communication to obtain the shared keys over the communication channel. When the two parties initiate communication, they end up using keys similar to the cryptanalyst’s.

### Chosen plaintext attack
This is a technique where a cryptanalyst uses a plaintext of choice to generate a ciphertext which is then used with the plaintext to guess a possible encryption key applied to the data. The analyst, however, needs to either know the encryption algorithm or have access to the device used to do the encryption.

### Known plaintext attack
This method makes use of known bits of plaintext or all of it to find out the key used for encryption and decryption then the key can be used to decrypt all the data encrypted.

Happy learning!

### Relevant resources
- [Cryptography in computer](https://www.section.io/engineering-education/cryptography-in-computer-networking/)

- [Understanding AES and RSA encryption Algoritms](https://www.section.io/engineering-education/aes-rsa-encryption/)

- [Cryptanalysis tools](https://resources.infosecinstitute.com/topic/cryptanalysis-tools/)

---
Peer Review Contributions by: [Samuel Mwangi](/engineering-education/authors/samuel-mwangi/)