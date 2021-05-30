---
layout: engineering-education
status: publish
published: true
url: /secure-sockets-layer-transport-layer-security/
title: An Introduction to Secure Sockets Layer/Transport Layer Security Protocol
description: This article will be a brief introduction to the Secure Sockets Layer / Transport Layer Security Protocol. We would be discussing various SSL/TLS versions and how it works.
author: kanishkvardhan-a-n
date: 2021-03-17T00:00:00-09:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/secure-sockets-layer-transport-layer-security/hero.jpg
    alt: SSL/TLS example image
---
The year 2020 was a challenging one that resulted in some crucial, groundbreaking innovation, and changes across domains. The pandemic has compelled various operations and workforce to go remote, and has left the infrastructure susceptible to increased cyber attacks. 
<!--more-->
The need for security has undoubtedly been reinforced. Anti-malware software, intrusion prevention systems, firewalls, Virtual Private Networks (VPNs) are some of the rudimentary technologies required to safeguard your resources these days. In this article, we will focus on one such security technique i.e Secure Sockets Layer/Transport Layer Security (SSL/TLS) communication encryption protocol. 

In simple terms, encryption is the process of converting data into another form (referred to as Ciphertext) that can be understood only by parties that possess a secret decryption key. To everybody else, it’s gibberish. [Google's transparency report](https://transparencyreport.google.com/https/overview?hl=en) shows a significant increase in the amount of encrypted traffic on the internet over the last few years. As of December 2020, approximately 95% of all traffic across Google was encrypted. Many web browsers have been relentlessly pushing websites to use encryption by marking HTTP sites as unsafe. 

### What makes HTTPS sites safe?
The [HTTPS](https://en.wikipedia.org/wiki/HTTPS) is the highly secured communication method of the Hypertext Transfer Protocol (HTTP). All HTTPS traffic is encrypted using a communication protocol called Secure Sockets Layer (SSL)/ Transport Layer Security (TLS) protocol.

### What is SSL/TLS?
Secure Sockets Layer (SSL) and its next substitute, Transport Layer Security (TLS), are encryption protocols designed to ensure the security, reliability, and authenticity of the information exchanged. Although SSL is deprecated and replaced by TLS, the industry uses the two terms interchangeably. To avoid confusion, we’ll continue to refer to TLS as SSL/TLS throughout this article.

### History of SSL/TLS
The earliest original SSL protocols were developed at Netscape. SSL 2.0 became the first version that was released to the public in 1995. SSL 2.0 had vulnerabilities and consequently, [SSL 3.0](https://tools.ietf.org/html/rfc6101) was developed and released the following year. 

In 2014, SSL 3.0 was found to be vulnerable to the [POODLE attack](https://en.wikipedia.org/wiki/POODLE) which exploits protocol fallback to steal confidential information like credentials, passwords, session cookies. It was deprecated in 2015. 

SSL 3.0 was shortly followed by TLS 1.0 in 1999. We’ve had TLS 1.1, TLS 1.2 and TLS 1.3 so far. Recently in March 2020, TLS 1.0 and TLS 1.1 got deprecated. You can read more about the protocol’s history and development [here](https://en.wikipedia.org/wiki/Transport_Layer_Security#History_and_development).

![SSL/TLS Timeline](/engineering-education/secure-sockets-layer-transport-layer-security/timeline.png)

Before we dive into the working of SSL/TLS, let's familiarize ourselves with a few technical terms:

1. [Encryption](https://en.wikipedia.org/wiki/Encryption) is a cryptological technique of converting data in its original form (known as plaintext) into an alternative form (known as ciphertext) that can be deciphered only by authorised parties. The conversion is done by a cryptological algorithm (cipher) that takes a secret “key” as the input to reverse the action. Although encryption does not prevent intrusion, it aids in securing your data by rendering it useless to overhearers. Only those in possession of the decryption key will be able to decipher it.
Two of the most widely used encryption techniques are briefly explained below:

- **Symmetric key encryption** is the technique of encrypting information using cryptographic algorithms that use the same key for encryption and decryption. Such algorithms are called symmetric ciphers. When person A and person B communicate, they encrypt and decrypt their messages using a shared key. Care should be taken that this shared key isn’t compromised because it allows anybody to decrypt the ciphertext.

![Symmetric key encryption](/engineering-education/secure-sockets-layer-transport-layer-security/Sym.png)

- **Asymmetric key encryption** (also called public-key encryption) is the technique of encrypting information using cryptographic algorithms that use different keys for encryption and decryption. Such algorithms are called asymmetric ciphers. When **A** sends a message to **B**, it is encrypted using **B’s** public key. **B** decrypts **A’s** message using its private key, which isn’t known to anybody else. Asymmetric encryption is safer and more stable than symmetric encryption. However, it is computationally more expensive.

![Asymmetric key encryption](/engineering-education/secure-sockets-layer-transport-layer-security/Asym.png)

2. **Cipher Suites** are a set of algorithms that are used to secure information being exchanged by the endpoints. A cipher suite announces the key exchange algorithm, the authentication algorithm, the bulk encryption algorithm and the Message Authentication Code (MAC) algorithm it supports. For example, a sample suite may look something like this  `ECDHE-ECDSA-AES256-GCM-SHA384`. Cipher suites are updated with safer algorithms from time to time. More information regarding cipher suites can be found [here](https://www.venafi.com/blog/what-are-cipher-suites).
 
**Note:** 
- `ECDHE` implies [Key exchange algorithm](https://en.wikipedia.org/wiki/Key_exchange). It is used by the endpoints to exchange cryptographic keys.
- `ECDSA` implies [Authentication algorithm](https://en.wikipedia.org/wiki/Digital_signature). It is used to ensure the validity of SSL/TLS certificates. It is also used to authenticate the rightful owner of the public/private keys.
- `AES256-GCM` implies Bulk encryption algorithm which is used for symmetric encryption of the application data. The two [categories of bulk ciphers](https://www.thesslstore.com/blog/block-cipher-vs-stream-cipher/) are **Block ciphers and Stream ciphers**.
- `SHA384` implies [Message Authentication Code (MAC)](https://www.tutorialspoint.com/cryptography/message_authentication) algorithm uses cryptographic hashes to produce message digest and ensure the integrity of the data being exchanged.

3. **SSL certificates** are digital data files that bind an organisation/domain name to a cryptographic key. Certificate Authorities (CAs) issue SSL certificates after the  verification of data provided by the organisation. By signing and issuing an SSL certificate, the CA assures that the information enclosed in it is valid. 

### How does SSL/TLS work?
As discussed before, public-key encryption requires high compute and adds considerable overhead. SSL/TLS, thus, makes use of public-key encryption just in the beginning, to exchange session keys. These session keys are symmetric in nature and are used to carry out the rest of the communication. 

SSL/TLS handshake is a part of an SSL/TLS exchange wherein the two endpoints exchange messages and establishes the details of their communication. Since SSL/TLS is most widely used to encrypt web traffic, we’ll use a web client and server as examples of endpoints.

**NOTE:** The exact steps of a TLS handshake can depend based on the key exchange algorithm being used. It is also dependent on the cipher suites used by both sides as well. RSA  (Rivest–Shamir–Adleman), Diffie-Hellman (DH), Ephemeral Diffie-Hellman (DHE), Elliptic Curve Diffie-Hellman (ECDH) and Ephemeral Elliptic Curve Diffie-Hellman (ECDHE) are some examples of key exchange algorithms.

The steps of TLS handshake with RSA key exchange algorithm are discussed below:
1. **Client Hello:** The client initiates communication by sending a “Client Hello” to the server. This message contains the TLS version and a list of cipher suites it supports, along with a string of random bytes called “client random”.
2. **Server Hello:** In response to the client's request, the server sends a "Server Hello" message. This message collectively includes the server's SSL/TLS certificate, server’s chosen cipher suite, session ID and a string of random bytes called “server random”.
**Note:** The server may request the client for its Client Certificate by sending a "CertificateRequest" message. This is known as a two-way handshake, and it is commonly used in server-to-server communication. It is a type of communication where verification of identities of both the parties is necessary. 
3. **Authentication and pre-master secret:** The server’s SSL/TLS certificate issued by the CA is authenticated by the client. It then sends another random string of bytes called “pre-master secret”, encrypted with the server’s public key (derived from the server's SSL/TLS certificate).
4. **Decryption of pre-master key:** The pre-master key is decrypted by the server with the help of its private key.
5. **Generation of Session keys** (also called master keys): Client generates session key using Server Random and pre-master secret. The server generates a session key using the Client Random and pre-master secret. These session keys will be symmetrical.
6. **Client ready:** The client sends an encrypted "Finished" message using the session key.
7. **Server ready:** The server sends an encrypted "Finished" message using the session key.
8. **Encryption with session keys:** The handshake is now complete, and the rest of the communication is encrypted using session keys.

![TLS Handshake](/engineering-education/secure-sockets-layer-transport-layer-security/Handshake.png)

**Note:** [RFC 5246](https://tools.ietf.org/html/rfc5246#page-33) lays down the messages that are exchanged during the SSL/TLS handshake.

### Summary
SSL/TLS is a cryptographic protocol used to communicate and interface on the internet. It is widely used for secure web browsing, audio/video conferencing, email and file transferring, voice-over-IP, instant messaging and more. TLS 1.3, currently in use, comes with notable security improvements. It outperforms its predecessors in terms of speed and efficiency. With 85% of the web traffic encrypted today, there’s no doubt that in a few more years, TLS security will be ubiquitous.

### Additional resources
1. [The Evolution of SSL and TLS](https://www.digicert.com/dc/blog/evolution-of-ssl/)
2. [Cipher Suites: Ciphers, Algorithms and Negotiating Security Settings](https://www.thesslstore.com/blog/cipher-suites-algorithms-security-settings/)
3. [The SSL/TLS Handshake: an Overview](https://www.ssl.com/article/ssl-tls-handshake-overview/)
4. [How is Diffie-Hellman Key Exchange Different from RSA?](https://www.venafi.com/blog/how-diffie-hellman-key-exchange-different-rsa)

---
Peer Review Contributions by: [Saiharsha Balasubramaniam](/engineering-education/authors/saiharsha-balasubramaniam/)
