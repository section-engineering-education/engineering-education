### Kerberos

![hero-image](/engineering-education/content/articles/kerberos/hero.jpg)
Photo by [Alexandre Debiève](https://unsplash.com/@alexkixa?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText) on [Unsplash](https://unsplash.com/collections/37420096/uses-of-encryption?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText)

In this digital age, utilizing computers to share information and interact with one another is quite popular. However, precautions should be made to avoid the compromise of sensitive information during the interaction. Communication networks must be protected and computers on both the transmitting and receiving ends must be verified. Security protocols are frequently used to establish secure networks. It is necessary to prevent someone from eavesdropping on confidential data on an unsecured network

[Cryptography](https://en.wikipedia.org/wiki/Cryptography) is sometimes used in these protocols. It is simply a method for securing communication networks by developing protocols that restrict others from accessing the private communication networks. Kerberos is one such cryptographic protocol.

### Introduction

Kerberos is an authentication technique based on secret-key cryptography that utilizes tickets to verify users' identities. It enables computers, communicating on a non-secure network, to authenticate themselves. It is aimed at a client-server model so both the client and the server need to verify each other's identity. This helps with the development of intrinsic trust between the systems and reduces data leakage as well.

Kerberos has mainly three parts:

- Client
- Server
- Key Distribution Center(KDC)

The **client** is basically a user who initiates a service request. The **server** hosts the service requested by the client. **Key Distribution Center** has two parts: Authentication **Server(AS)** and **Ticket Granting Service(TGS).**

**Role of KDC:** When the client wants to connect with the server, it submits KDC a request for connection. This request is encrypted using a key that is only known to the client and KDC. When the request is validated by KDC, it sends back an encrypted one-time session key to the client. Similarly, the server too receives the encrypted one-time session key. It should be noted that the session keys are encrypted using the secret keys shared with the client and the server respectively.
 
**Role of AS:** When a client requests a service from a server, the server has no way of knowing if the request is from a real user or someone else. There is a possibility that the request is coming from someone impersonating the real user. To prevent this, the server must authenticate users before providing them access to resources. To do this, an authentication server (AS)  is used. All user IDs, credentials, and passwords are stored on this server. As a result, when an user logins with the password, AS receives the user ID, password, and the ID of the server to which the user desires to connect. Then the AS compares all the credentials stored in its database, thus validating the user.
 
**Role of TGS:** It generates tickets for users who have already been authenticated by the AS. For any service, the TGS issues a ticket to the user. The client responds with an encrypted TGT comprising the user ID, server ID, and the requested service. The TGS decrypts the ticket using the shared key. Then it validates the user by verifying the ID and checking the ticket's lifetime. Then it issues a new ticket to permit the user to access the service. This final ticket (token) is sent to the server. Once the token has been validated, transmission between the user and the server can begin.

The roles describe what each component performs on its own.  In contrast, the protocol is carried out by all of the components working together. The next section dives into the protocol's flow or the components' interdependence.

### Breaking-down the Protocol

The client submits a request for service to the AS. It is now up to the AS to validate the client. The authentication procedure is carried out by hashing a secret cryptographic key(private key) that no one else knows. The request is encrypted and transferred to the AS using a shared secret key (first secret key). The AS obtains it and decrypts it with the shared secret key. AS gives the Ticket Granting Ticket(TGT) hence confirming the user's credentials. This ticket serves as evidence that the client has been authenticated. The ticket is encrypted using another secret key(second secret key).

The client transfers the TGT (encrypted with the secret key) to the TGS along with the service request that was initially submitted to the AS during client verification. The TGT obtained by the TGS is decrypted with the help of the second secret key. The TGS then provides the client with a token that has been encrypted with another secret key (third key). TGS and the server now have access to this secret key. The client then forwards the token to the server. The token, which is now with the server, is encrypted using the private key shared with the TGS. After all of the essential procedures have been completed, the server sends a message to the client confirming that the client and server have successfully authenticated each other.

The server and client are connected and are on a secure network. Now it's time for them to exchange resources and transfer information. Consider the token to be a bus ticket, the client to be a passenger, and the bus to be a server. The bus ticket is only valid for a limited period and for particular passengers and buses. The passenger cannot use the same ticket to ride all of the city's buses indefinitely. As a result, communication will occur between the client and the server for a certain period of time determined by the token. Since Client and AS use the same key for encryption-decryption, AS and TGS use the same for encryption-decryption and TGS and Server use the same key for encryption-decryption, this type of Kerberos is an example for symmetric cryptography or [Symmetric-key algorithm](https://en.wikipedia.org/wiki/Symmetric-key_algorithm).

### Usage

- Kerberos is a type of security protocol that can be used for authentication services. So many operating systems use Kerberos to authenticate their users.
- According to [Wikipedia](https://en.wikipedia.org/wiki/Kerberos_(protocol)#:~:text=Windows%202000%20and%20later%20versions%20use%20Kerberos%20as%20their%20default%20authentication%20method.), Microsoft uses Kerberos authentication to allow clients to connect to their Microsoft domain services.
- UNIX-like operating systems such as Solaris, macOS, FreeBSD and non-Unix-like operating systems such as OpenVMS use Kerberos for user authentication.
- Microsoft's XBOX uses Kerberos to authenticate users to allow them to use their live services.

### Advantages

- Kerberos is a symmetric cryptographic protocol. This implies it uses private keys, which are more secure than having public keys.
- These tickets can only be decrypted by the client and the server. As a result, even if tickets are lost or stolen, the keys remain hidden, allowing the data to be secured.
- Even if the tickets are stolen or leaked, they will be useless because they are only valid for a limited duration. So, without the secret key, no matter who possesses the ticket, it is essentially worthless to them.
- Kerberos allows for mutual authentication. Before initiating a secure communication network, both the client and the server must authenticate themselves.

### Disadvantages

- Because the tickets are only valid for a limited time, unable to authenticate within the time limit will result in protocol failure. After that, generated tickets are no longer relevant. Consequently, the procedure must be restarted.
- At all times, the host clock and the server clock should be synced.
- Because the protocol is symmetric, it relies heavily on KDC. As a result, if KDC is compromised, the entire authentication process is affected.
- Since Kerberos is one of the most commonly used authentication protocols, it is also one of the most likely to be hacked.
- Fake tickets and passwords can be used during verification, and hackers will utilize [brute force attacks](https://en.wikipedia.org/wiki/Brute-force_attack) to take down the authentication process.
- Many hackers are developing malware that is specifically designed to disrupt the Kerberos protocol.

### Conclusion

Although this was a simple breakdown of Kerberos protocol, there is much more to it. I highly urge you to [read this article](https://en.wikipedia.org/wiki/Kerberos_(protocol)) for a more technical explanation. Kerberos is still evolving and being improved as we speak. As new protocols are implemented, hackers will discover a method to bypass them in some way. No security protocol can yet be considered completely hack-proof. So, as much as we can rely on them, it is ultimately our duty to be safe on the internet. Sharing data with only trusted parties, using only secure networks, keeping up with the latest security protocols and their measures, installing multiple authentication systems on our devices, and generally being on the lookout for the worst and understanding that the internet is never a safe place will benefit us in the long run.

### Additional Resources

[What is Kerberos?](https://www.simplilearn.com/what-is-kerberos-article)

[Kerberos Protocol](https://en.wikipedia.org/wiki/Kerberos_(protocol))

[Kerberos: The Network Authentication Protocol](https://web.mit.edu/kerberos/) | by MIT
