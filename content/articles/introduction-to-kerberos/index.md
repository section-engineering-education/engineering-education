---
layout: engineering-education
status: publish
published: true
url: /introduction-to-kerberos/
title: Getting Started With Kerberos
description: This article will discuss how Kerberos authentication protocol helps in promoting secure communication between the client and server.
author: kanishkvardhan-a-n
date: 2021-10-25T00:00:00-10:40
topics: [Networking]
excerpt_separator: <!--more-->
images:
  - url: /engineering-education/introduction-to-kerberos/hero.jpg
    alt: Kerberos example image
---
In this digital age, utilizing computers to share information and interact with one another is quite popular. However, precautions should be made to avoid leaking sensitive information during these interactions. Communication networks must be protected at all costs.
<!--more-->
Computers on both the transmitting and receiving ends must be verified. Various security protocols are used to establish secure networks. These protocols prevent individuals from accessing confidential data on insecure networks.

[Cryptography](https://en.wikipedia.org/wiki/Cryptography) is sometimes used in these protocols. It is a simple method for securing communication networks.

It allows individuals to create protocols that restrict others from accessing the private communication networks. Kerberos is a perfect example of cryptographic protocols.

### Introduction
[Kerberos](https://web.mit.edu/kerberos/) is an authentication technique based on secret-key cryptography that utilizes tickets to verify users' identities. It allows computers that communicate on an insecure network to authenticate themselves.

Kerberos relies on the client-server model. Therefore, both the client and server must verify each other's identity. This helps in the development of intrinsic trust between the systems and reduces data leakage.

Kerberos has three major parts:
- Client
- Server
- Key Distribution Center(KDC)

The **client** is a user who initiates a service request. The **server** hosts the service requested by the client.

A **Key Distribution Center** has two parts: Authentication **Server(AS)** and **Ticket Granting Service(TGS).**

**Role of a Key Distribution Center**

When the client wants to connect to the server, it submits a connection request to the KDC. This request is encrypted using a key that is only known to the client and KDC.

When the request is validated by KDC, it sends back an encrypted one-time session key to the client. The server also receives this session key.

Note that the `session keys` are encrypted using a `secret code`.

**Role of the Authentication Server**

When a client requests a service from a server, the server has no way of knowing if the request is from a real user or not.

There is always a possibility that the request is coming from someone impersonating the real user. To prevent this, the server must authenticate users before granting them access to resources.

An Authentication Server (AS) is used to verify users. All `user IDs`, `credentials`, and `passwords` are stored on this server.

When a user logs in, `AS` receives the user's ID, password, and the ID of the server that the user desires to connect to. The AS then compares these details with the credentials stored in its database and thus, validates the user.

**Role of Ticket Granting Service**

It generates tickets for users who have already been authenticated by the server. The client responds with an encrypted TGT comprising the user's ID, server's ID, and the requested service.

The TGS decrypts the ticket using the shared key. Then it validates the user by verifying the ID and checking the ticket's lifetime.

Finally, the TGS issues a new ticket to permit the user to access the service. This final ticket (token) is sent to the server. Once the token has been validated, transmission between the user and the server can begin.

### Breaking-down the Protocol
The client submits a request for service to the Authentication Server (AS) for verification. The authentication procedure is carried out by hashing a secret cryptographic key (private key) that no one else knows.

The request is encrypted and transferred to the AS using a shared secret key (first secret key). The AS decrypts this key using the shared code.

AS then issues the Ticket Granting Ticket (TGT) hence, confirming the user's credentials. This ticket serves as evidence that the client has been authenticated. The ticket is encrypted using a second secret key.

The client transfers the TGT (encrypted with the secret key) to the TGS along with the service request that was initially submitted to the AS during verification.

The TGT obtained by the TGS is decrypted with the help of the second secret key. The TGS then provides the client with a token that has been encrypted with another secret key (third key). Both the TGS and the server have access to this secret key.

The client forwards the token to the server which is then encrypted using a private key shared with the TGS. After all of the essential procedures have been completed, the server sends a message to the client confirming that the client and server have successfully authenticated one another.

The server and client are connected to a secure network. Now it's time for them to exchange resources and transfer information.

Consider the token to be a bus ticket, the client to be a passenger, and the bus to be a server. The bus ticket is only valid for a limited period.

The passenger cannot use the same ticket to ride on other buses. In other words, communication will occur between the client and the server for a certain period determined by the token.

Since the client and server use the same key for encryption-decryption, this type of Kerberos is an example of symmetric cryptography or [Symmetric-key algorithm](https://en.wikipedia.org/wiki/Symmetric-key_algorithm).

### Usage
- Kerberos is a security protocol that can be used for authentication. Many operating systems already use Kerberos to authenticate their users.
- According to [Wikipedia](<https://en.wikipedia.org/wiki/Kerberos_(protocol)#:~:text=Windows%202000%20and%20later%20versions%20use%20Kerberos%20as%20their%20default%20authentication%20method.>), Microsoft uses Kerberos authentication to allow clients to connect to their Microsoft domain services.
- UNIX-like operating systems such as Solaris, macOS, FreeBSD, and non-Unix operating systems such as OpenVMS also use Kerberos for user authentication.
- Microsoft's XBOX uses Kerberos to authenticate users to allow them to use their live services.

### Advantages of Kerberos
- Kerberos is a form of symmetric cryptographic protocol. This means that it uses private keys, which are more secure than having public keys.
- These tickets can only be decrypted by the client and the server. As a result, even if tickets are lost or stolen, the keys remain hidden which allows the data to be secure.
- Kerberos supports mutual authentication. In other words, before any communication, both the client and the server must authenticate themselves.

### Disadvantages of Kerberos
- Tickets are only valid for a limited time. Therefore, failure to log in within the time limit will result in protocol failure.
- The host server and server clock should be in sync at all times.
- Kerberos relies heavily on KDC. As a result, if KDC is compromised, the entire authentication process will be affected.
- Since Kerberos is one of the most commonly used authentication protocols, it is targeted by many hackers.
- Fake tickets and passwords can be used during verification. Hackers can also utilize [brute force attacks](https://en.wikipedia.org/wiki/Brute-force_attack) to take down the authentication process.

### Conclusion
Although this was a simple breakdown of Kerberos protocol, there is much more to it. I highly urge you to [read this article](<https://en.wikipedia.org/wiki/Kerberos_(protocol)>) for a more technical explanation.

Kerberos is still evolving. However, as new protocols are implemented, hackers are discovering different methods of bypassing them. No security protocol can be considered as completely hack-proof. So, as much as we can rely on them, we must be safe on the internet.

Some of the things we should do include sharing data with only trusted parties, using only secure networks, keeping up with the latest security protocols, and installing multiple authentication systems on our devices.

### Additional Resources
- [What is Kerberos?](https://www.simplilearn.com/what-is-kerberos-article)
- [Kerberos Protocol](<https://en.wikipedia.org/wiki/Kerberos_(protocol)>)
- [Kerberos: The Network Authentication Protocol](https://web.mit.edu/kerberos/) | by MIT

---
Peer Review Contributions by: [Wanja Mike](/engineering-education/authors/michael-barasa/)
