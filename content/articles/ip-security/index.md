---
layout: engineering-education
status: publish
published: true
url: /ip-security/
title: Understanding IPSEC
description: This article will help the reader undestanding IP Security in communication.
author: kanishkvardhan-a-n
date: 2022-06-28T00:00:00-10:50
topics: [Security]
excerpt_separator: <!--more-->
images:

 - url: /engineering-education/ip-security/hero.jpg
   alt: Understanding IP Security example image
---
The internet is a vast place with numerous facilities available for the users to rely on. Communication is one such important facility. When two or more internet-connected devices communicate with each other to transmit resources and data, they form a network. As remarkable as it appears, sending or receiving anything over this vast network might be risky.
<!--more-->
It is crucial to ensure that both the sender and the receiver are trustworthy because the information being transmitted may be sensitive and should not be publicly disclosed, mandating encryption. 

We should also note that, just as sensitive information should not be sent, malicious information should not be received. Even if such measures are undertaken, it is crucial to guarantee that no third party interferes or tampers with the connection. 

To prevent data from being leaked and misused for illicit reasons by a third party, the connection must be secured. This is where IPSec plays its role.

### What is IPSec?
As the name implies, IPSec (or IP Security) secures the internet protocol suite and establishes secure connections between network users during the session while authenticating them. 

It also encrypts data packets sent over IPv4 and IPv6 versions to prevent unauthorized access to them and can only be decrypted using the keys shared between the sender and receiver during a session.

### Components of IPSec
There are IPSec components that coordinate together to achieve a common goal.

- [Authentication Header (or AH)](https://en.wikipedia.org/wiki/IPsec#:~:text=or%20ESP%20operations.-,Authentication%20Header,-%5Bedit%5D) - This header authenticates the data and identifies where it came from. In addition, it protects the data from [replay attacks](https://en.wikipedia.org/wiki/Replay_attack), which are a sort of [man-in-the-middle attack](/engineering-education/man-in-the-middle-attack/) in which the intruder replays the message, convincing legitimate users that they are connected.

- [Encapsulating Security Payload (or ESP)](https://en.wikipedia.org/wiki/IPsec#:~:text=boundary%20for%20IPv4.-,Encapsulating%20Security%20Payload,-%5Bedit%5D) - As the name implies, it encapsulates the payload, which means that it secures the message/data being sent over the network, providing anonymity and protecting it from eavesdroppers.

- [Internet Key Exchange (or IKE)](https://en.wikipedia.org/wiki/Internet_Key_Exchange) 

- [Security Associations (or SAs)](https://en.wikipedia.org/wiki/Security_association) are required to generate security keys for encryption and decryption functions. IKE is in charge of this function and ensures the establishment of SAs. This is significant since SAs may also carry information about their properties, such as the encryption algorithms used and packet headers, among other things.

### Introduction to Cryptography
**Why is it needed?** - One cannot send messages over the internet unprotected. Many people are always ready to eavesdrop on what is being communicated. This is where cryptography comes into play. 

**What is it?** - Cryptography is essentially a method of encrypting communication protocols so that only the sender and receiver can decrypt and access them. This is accomplished by using secret keys. These keys are necessary for the encryption and decryption of messages. 

**How does it work?** - When a message is encrypted, it is referred to as the cipher-text, and only those shared secret keys can be used to decrypt the ciphered messages. It is similar to a house being secured by a lock that only a specific key can unlock. More information about encryption protocols can be found [here](/engineering-education/secure-sockets-layer-transport-layer-security/). Let's look at how this cryptographic notion can be used in IPSec.

### IPSec Algorithms
- **Encryption Algorithms** - These algorithms are used to encrypt messages so that no one else can read them. Only those granted access to the keys can decrypt and read them. [Advanced Encryption Standard (AES)](https://en.wikipedia.org/wiki/Advanced_Encryption_Standard) and [Data Encryption Standard (DES)](https://en.wikipedia.org/wiki/Data_Encryption_Standard) are two examples of encryption algorithms. A more secure version of DES is known as Triple DES (DES3). Currently, AES is the most trusted and robust algorithm available. Its key ranges from 128 to 256 bits, whereas DES has a key range of roughly 50 bits.

- **Authentication algorithms** - As the name implies, these algorithms use shared keys to authenticate the validity of senders and messages. HMAC-MD5, HMAC-SHA1, HMAC-SHA2 algorithms are some of the types. [HMAC (Hash-based Message Authentication Code)](https://en.wikipedia.org/wiki/HMAC) means that the message will be hashed and can only be unhashed using the secret key. For example, [MD5(Message Digest)](https://docs.microsoft.com/en-us/dotnet/api/system.security.cryptography.hmacmd5?view=net-6.0) compresses the hashed message to 128 bits. Similarly, [SHA1(Secure Hash Algorithm 1)](https://docs.microsoft.com/en-us/dotnet/api/system.security.cryptography.hmacsha1?view=net-6.0) hashes it to 160 bits, and SHA2(Secure Hash Algorithm 2), consisting of three different classes such as [SHA256](https://docs.microsoft.com/en-us/dotnet/api/system.security.cryptography.hmacsha256?view=net-6.0), [SHA384](https://docs.microsoft.com/en-us/dotnet/api/system.security.cryptography.hmacsha384?view=net-6.0), and [SHA512](https://docs.microsoft.com/en-us/dotnet/api/system.security.cryptography.hmacsha512?view=net-6.0) hashes messages to 256 bits, 384 bits, and 512 bits respectively.

- **Key exchange algorithms** - As the name suggests, keys are exchanged between the sender and receiver to encrypt or decrypt the message. One such algorithm is the [Diffie–Hellman key exchange](https://en.wikipedia.org/wiki/Diffie%E2%80%93Hellman_key_exchange). Parties who have never met before can publicly share the secret key and engage in a secure communication protocol. It's also employed in other network protocols like TLS (Transport Layer Security), SSH (Secure Shell), and so on.

### Why is IPSec needed?
- **To encrypt data and protect sensitive information** -  The encryption methods used in IPSec protocols encrypt the messages being sent and protect sensitive data such as passwords and account information.

- **Data is authenticated** - The authentication algorithm encrypts the data so that it can only be decrypted with the shared keys. Even if an attacker disrupts the transmission and sends incorrect data or a fake acknowledgment, the intruder can easily be detected.

- **Senders and recipients are secured** -  Similarly, senders and recipients can be easily validated because only legitimate parties have the shared keys to access the data.

- **Used in VPNs** - A VPN is used to safeguard our data by masking our IP address while it is shared on a public network. As the name implies, it establishes a virtual network on the public network that allows for private transmission between senders and receivers. By enabling VPN, both parties communicating on the public channel are shifted to a private network where the transmission is secured, encrypted, and protected from eavesdroppers.

- **IPsec tunnelling** - A tunnel is a closed passageway with just two entry and exit points. Anything between those two points is closed. Similarly, all data transferred between two endpoints is secured and encrypted in IPSec tunnelling.

Happy learning!

### Additional resources
- [IPSec | Wikipedia](https://en.wikipedia.org/wiki/IPsec)
- [What is IPsec?](https://www.techtarget.com/searchsecurity/definition/IPsec-Internet-Protocol-Security)
- [Cryptography](https://en.wikipedia.org/wiki/Cryptography)

---
Peer Review Contributions by: [Mercy Meave](/engineering-education/authors/mercy-meave/)
