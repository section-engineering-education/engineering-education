---
layout: engineering-education
status: publish
published: true
url: /enryption-in-mongodb/
title: Encryption in MongoDB
description: This article will cover the encryption at rest and some other terminologies related in MongoDB. We will create a SSL encrypted connection where you can create your database and add secure functionality to it.
author: harit-joshi
date: 2021-05-19T00:00:00-11:00
topics: [Security]
excerpt_separator: <!--more-->
images:
  - url: /engineering-education/enryption-in-mongodb/hero.jpg
    alt: Encryption in MongoDB Image
---
NoSQL is an alternative to traditional relational databases. NoSQL databases are quite useful when working with large sets of distributed data. MongoDB is a tool that can manage document-oriented information, store, or retrieve information.
<!--more-->
In this article, we are going to learn about Encryption at rest in MongoDB with some examples.

### Prerequisites
To follow this tutorial along - the reader should have the following:
- Have MongoDB installed in your system. To install MongoDB safely in your system visit the official documentation via [this link](https://docs.mongodb.com/manual/installation/).

- Some prior knowledge about MongoDB and its shell commands.

Before starting with the concept of Encryption at rest in MongoDB let's first discuss the term 'Encryption'.

### What is Encryption?
Encryption is a way of securing data so that only authorized parties or users can understand the information. In other words, it is the process of converting human-readable plaintext to incomprehensible text, also known as ciphertext.

### What is a key in cryptography?
A cryptographic key is a string of characters used within an encryption algorithm for altering data so that it appears random. Like a physical key, it encrypts data so that only someone with the right key can decrypt it.

### Why is data encryption necessary?
Data encryption is necessary and the factors below are the key reason to encrypt our data or databases:

1. Privacy: With the help of encryption no one can read or interfere with the data you want to protect except the intended parties. This prevents attackers, and networks, internet service providers, and in some cases governments from intercepting and reading sensitive data.

2. Security: Encryption helps prevent data breaches, whether the data is at your local machine or on the internet. There are many security algorithms which protect data, databases and also client-server connection like public and private key cryptography, RSA algorithms, etc.
   Almost every corporate firm uses HTTPS protocol and take advantage of these algorithms to protect their users from attacks.Users like us also need to be careful from our end, as to not visit unknown sites or opening spam emails etc.

3. Data integrity: Encryption also helps prevent malicious behavior such as on-path attacks. When data is transmitted across the Internet, encryption ensures that what the recipient receives has not been tampered with or adulterated on the way for example with a [man in the middle attack](/engineering-education/man-in-the-middle-attack/).

4. Authentication: Public key encryption and other cryptographic approaches can be used to establish that a website's owner owns the private key listed in the website's TLS/SSL certificate. This allows users of the website to be sure that they are connected to the real website server and this avoids spoofing.

### What is an encryption algorithm?
An encryption algorithm is a method used to transform data into ciphertext or gibberish text which is very hard to understand and can only be converted back to the original text when the recipient decrypts the message with his own key.

So now you have a better background on encryption, let's now dive into encryption in MongoDB.

### Encrypting data in MongoDB
If you choose to encrypt your data, MongoDB offers solutions for encrypting in motion as well as at rest.

### Encryption in motion
All versions of MongoDB support TLS (Transport Layer Security) and SSL (Secure Socket Layer) to send and receive data over networks. TLS and SSL are the types of encryption commonly used to secure website traffic and file sharing. They are cryptographic protocols that secure data while it is traveling from one point to another.

### Encryption at rest
To encrypt data at rest, MongoDB Enterprise offers native, storage-based symmetric key encryption at the file level. Whole database encryption is also called Transparent Data Encryption (TDE).

MongoDB utilizes the Advanced Encryption Standard (AES) 256-bit encryption algorithm, an encryption cipher that uses the same secret key to encrypt and decrypt data. Data-at-rest AES encryption is only available on MongoDB Enterprise and Atlas editions using the required WiredTiger storage engine.

Another feature that MongoDB provides is the option to turn encryption on in “FIPS mode” which means the encryption you use in MongoDB will be tested to the National Institute of Standards and Technology Federal Information Processing Standard. Solutions validated and tested to NIST FIPS are built to meet the highest security standards and compliance.

For more information, you can visit MongoDB official documentation here <https://docs.mongodb.com/manual/tutorial/configure-ssl/>

### Encryption performance in MongoDB
When choosing to encrypt your MongoDB database, users should consider performance. Performance is a very important factor especially for developers who store large amounts of data that customers access daily through front-end applications. When a banking or retail application requests thousands or millions of records from a database daily, any latency or downtime can seriously impact business continuity and operations.

As for today's scenario, we want fast retrieval of data and if an application is not meeting this need - it is not at all accepted. This is why MongoDB has conducted performance tests using Intel Xeon X5675 CPUs thus storage engine experiences an average latency between 10%-15%, depending on the amount of data that a user is reading or writing to the database.

When the user writes only large amounts of data to the database, the performance impacts fall on the server-side, however, in more commons scenarios a user might be performing read-only commands for the data so the performance will likely fall between 5%-10%.

### Encryption key management in MongoDB
Encryption key management is the method used to protect and manage your encryption keys. Enterprise encryption key management should meet the key management framework and recommendations as suggested by NIST in Special Publications.

MongoDB does not include an enterprise encryption key management solution, and users must purchase a solution from a third-party key management solution provider. MongoDB Enterprise Editions enables customers to protect encryption using several tested and validated enterprise key management partners which is a plus point of MongoDB.

Encryption key management is necessary because without key management you are leaving the keys to protecting your sensitive business and customer data exposed, then you can expose your entire organization to the risk of data loss or theft.
Today, with MongoDB Enterprise, customers can meet encryption and key management best practices easily through implementing native encryption and deploying a third-party enterprise key management solution.

Before moving on to how to implement SSL encryption in your database let's first understand what is SSL.

### What is SSL?
SSL stands for Secure Sockets Layer, and it refers to a protocol for encrypting and securing communications that take place on the Internet. The purpose of SSL is to secure communications between a client and a server, but it can also secure email, VoIP, LTE, and other communications on a shaky and untrusted network.

Now we will learn how to add SSL transport encryption to your MongoDB database.

### Implementing SSL encryption in MongoDB
To do that you need to enter this command in your MongoDB shell:

```bash
openssl req -x509 -newkey rsa:4096 -keyout key.pem -out cert.pem -days 365
```

You can also add `-notes` if you don't want to protect your private key with a passphrase. Otherwise, it will prompt you for "at least a 4 character" password. The days' parameter can be replaced with any number to affect the expiration date. 

It will then prompt you for things like "Country Name", and when it asks for the server name add localhost or if you have your own hostname then add that one but you can just hit Enter and accept the defaults.

After that process, you will end up with two files the `mongodB-cert` key file `mongodb-cert.crt` file.
We need to concatenate these two files into one therefore you need to execute:

```bash
cat mongodb-cert.key mongodb-cert.crt > mongodb.pem
```
This will create a file named `mongodb.pem` in your disk and that is the file you will need to enable SSL encryption.

Now navigate to the directory where you have stored your `.pem` file and there we need to set an SSL mode by using `--sslMode` argument in the command which defines whether the SSL is enabled or not and how to configure it.

For more information please visit the MongoDB [official documentation here](https://docs.mongodb.com/manual/tutorial/configure-ssl/). 

Type this command to enable SSL encryption and you must also use this command where your `.pem` file is stored. 

Type:

```bash
mongod --sslMode requireSSL --sslPEMKeyFile mongodb.pem
```

This command will start an SSL server without a CA certification file for which you have to get a license from the government.That server will wait for a connection & now to connect to that server we have to pass our `mongodb.pem` file as a CA certificate to complete the process so open a new tab in your terminal window and type:

```bash
mongodb --ssl --sslCAFile mongodb.pem --host localhost
```

### Conclusion
With this, you have created a SSL encrypted connection where you can create your database and add secure functionality to it. I hope you now realize the importance of security not just in realtion to databases but in general. 

Whether in production or in development environment security and encryption of data will always be a topic of concern so take it seriously.

I hope you enjoyed reading this article as much as I enjoyed writing it.

Happy coding!

---

Peer Review Contributions by: [Daniel Katungi](/engineering-education/authors/daniel-katungi/)
