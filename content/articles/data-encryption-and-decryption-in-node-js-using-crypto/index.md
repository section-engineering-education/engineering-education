Web applications have access to large amounts of data that belongs to people, organizations, and governments. The more the data is accessed, the higher the threat to data security. In the software development industry, developers use cryptography and encryption techniques to protect sensitive data from malicious parties.

Cryptography is used to secure data stored in a database or being transferred over a network in the software development industry. When handling, moving, and storing data, you must do it safely and securely. Thus as a node.js developer, you should understand how to encrypt and decrypt data to secure data processed by your system. Node.js has a built-in library called `crypto` for data encryption and decryption.

The purpose of encryption and decryption is to provide data security. This article will help you learn how to use the Node.js `crypto` module to encrypt and decrypt data in your applications. Also, it will give an overview of [cryptography in node.js](https://nodejs.org/api/crypto.html).

### Table of contents

- [Cryptography in node.js](#cryptography-in-nodejs)
- [Node.js crypto module](#nodejs-crypto-module)
- [How to encrypt data in Node.js](#how-to-encrypt-data-in-nodejs)
- [How to decrypt data in Node.js](#how-to-decrypt-data-in-nodejs)

### Prerequisites

A comprehensive understanding of [cryptography](https://nodejs.org/api/crypto.html) and node.js is required before reading this article. To follow along with this article, you should have:

- [Node.js](https://nodejs.org/en/download/) installed in your working environment.
- Text editor such as [Visual Studio Code](https://code.visualstudio.com/download).

### Cryptography in node.js

Cryptography is crucial for software development. Data must be protected. Cryptography is a study of techniques on how to keep the data secure. It converts the data into a secret by converting plaintext into unreadable text and vice versa. Hence only the sender and the receiver of that data can understand its content.

The three main components of a cryptosystem include plaintext, ciphertext, and algorithm. To make information a secret, we use a cipher and an algorithm that converts plaintext into ciphertext. The process of converting data into unreadable text is called encryption, and the reverse process is called decryption.

Cryptographic algorithms use a key to convert plaintext to ciphertext. Converting ciphertext back to plaintext is possible only if you have the right key with you. 

Using the same key for encryption and decryption is called [symmetric encryption](https://en.wikipedia.org/wiki/Symmetric-key_algorithm). 

Using one key for encryption and another for decryption is called [asymmetric encryption](https://www.sciencedirect.com/topics/computer-science/asymmetric-encryption).

Node.js developers need to understand how to keep their application data safe. Protecting data from malicious attackers is of importance. To protect data in Node.js applications, you can [hash passwords](https://docs.oracle.com/cd/E26180_01/Platform.94/ATGPersProgGuide/html/s0506passwordhashing01.html) and store them in the database. This way, data cannot be converted into plaintext after it is hashed. It has to be verified.

If malicious attackers gain access to the database, they won't be able to read the data since it's encrypted. Cyber attackers cannot decrypt encrypted data if they do not have the key to help them do so.

### Node.js crypto module

The Node.js `crypto` module provides cryptographic operations to help you secure your Node.js application. The [`crypto`](https://nodejs.org/api/crypto.html) module is a wrapper for open SSL cryptographic functions. It supports hashes, HMAC for authentication, ciphers, deciphers, and more.

As stated earlier, `crypto` is a built-in library in Node.js. Thus it doesn't require installation and configuration before using it in your Node.js applications. The `crypto` module handles an algorithm that performs encryption and decryption of data. This is used for security purposes like user authentication by storing passwords in the database in an encrypted form.

The `crypto` module allows you to hash plain texts before storing them in a database. Hashed data can not be decrypted with a specific key, like encrypted data. An HMAC is responsible for a Hash-based Message Authentication Code, which hashes keys and values to create a final hash.

You may want to encrypt and decrypt data for transmission purposes. This is where `cipher` and `decipher` functions come in. You encrypt data with `cipher` and decrypt it with `decipher`. Also, you may want to encrypt data before storing it in the database.

To verify encrypted or hashed passwords, it would be best if you had a `verify` function. Let us explore data encryption and decryption and how it is implemented in Node.js applications using `crypto`.

### Getting started with a Node.js project

We'll create a Node.js project to work with `crypto` where you'll learn how to encrypt and decrypt data. To start, execute the following command:

```bash
npm init -y
``` 

By default, the `crypto` module is an in-built Node.js library. But if Node.js is installed manually, `crypto` may not be shipped with it. You can install it by executing the following command:

```bash
npm install crypto --save
```

You do not need to execute the command if `crypto` is installed using pre-built packages.

### How to encrypt data in Node.js

To get started, create the `app.js` file and define our encryption functions as shown below.

First, you will import the `crypto` module.

```JavaScript
const crypto = require ("crypto");
```

While encrypting data, it's vital to use an algorithm. In this project, we use `aes-256-cbc`.

The `crypto.randomBytes()` method is used to generate a cryptographically well-built artificial random data and the number of bytes to be generated in the written code.

The IV (initialization vector) is used here to hold 16 bytes of random data from the `randomBytes()` method and `Securitykey` holds 32 bytes of random data.

```JavaScript
const crypto = require("crypto");

const algorithm = "aes-256-cbc"; 

// generate 16 bytes of random data
const iv = crypto.randomBytes(16);

// protected data
const message = "This is a secret message";

// secret key generate 32 bytes of random data
const Securitykey = crypto.randomBytes(32);
```

To encrypt the data `cipher` function is used. The `cipher` function in our project is made using the `createCipheriv()` function from `crypto` module. Pass the first argument as the algorithm we are using, the second argument as the `Securitykey` and `iv` as the third argument.

To encrypt the message, use the `update()` method on the `cipher`. Then pass the `message` as the first argument, the input encoding (`utf-8`) as a second argument, and the output encoding (`hex`) as the third argument.

 ```Javascript
 // crypto module
const crypto = require("crypto");

const algorithm = "aes-256-cbc"; 

// generate 16 bytes of random data
const iv = crypto.randomBytes(16);

// protected data
const message = "This is a secret message";

// secret key generate 32 bytes of random data
const Securitykey = crypto.randomBytes(32);

// the cipher function
const cipher = crypto.createCipheriv("aes-256-cbc", Securitykey, iv);

// encrypt the message
// the input encoding
// the output encoding
let encryptedData = cipher.update(message, "utf-8", "hex");
 ```

The code tells `cipher` to stop encryption using the `final()` method. When the `final()` method is called, the `cipher` can't be used once more to encrypt data. The message is then encrypted, and malicious attackers can't understand the encoded data. Below is an example of how to encrypt data.

 ```Javascript
 // crypto module
const crypto = require("crypto");

const algorithm = "aes-256-cbc"; 

// generate 16 bytes of random data
const iv = crypto.randomBytes(16);

// protected data
const message = "This is a secret message";

// secret key generate 32 bytes of random data
const Securitykey = crypto.randomBytes(32);

// the cipher functionn
const cipher = crypto.createCipheriv("aes-256-cbc", Securitykey, iv);

// encrypt the message
// the input encoding
// the output encoding
let encryptedData = cipher.update(message, "utf-8", "hex");

encryptedData += cipher.final("hex");

console.log("Encrypted message: " + encryptedData);
 ```

Here is the output:
![Data encryption output](/engineering-education/data-encryption-and-decryption-in-node-js-using-crypto/encrypt.jpg)

### How to decrypt data in Node.js

Decrypting data follows the same format and steps followed while encrypting data. In our Node.js project, we will use the `decipher` function to decrypt data. Our project encrypts and decrypts data.

Below is an example of how to encrypt data:

```Javascript
// the decipher function
const decipher = crypto.createDecipheriv("aes-256-cbc", Securitykey, iv);

let decryptedData = decipher.update(encryptedData, "hex", "utf-8");

decryptedData += decipher.final("utf8");

console.log("Decrypted message: " + decryptedData);
```

Follow the below example to encrypt and decrypt data using crypto:

```Javascript
// crypto module
const crypto = require("crypto");

const algorithm = "aes-256-cbc"; 

// generate 16 bytes of random data
const iv = crypto.randomBytes(16);

// protected data
const message = "This is a secret message";

// secret key generate 32 bytes of random data
const Securitykey = crypto.randomBytes(32);

// the cipher function
const cipher = crypto.createCipheriv("aes-256-cbc", Securitykey, iv);

// encrypt the message
// the input encoding
// the output encoding
let encryptedData = cipher.update(message, "utf-8", "hex");

encryptedData += cipher.final("hex");

console.log("Encrypted message: " + encryptedData);

// the decipher function
const decipher = crypto.createDecipheriv("aes-256-cbc", Securitykey, iv);

let decryptedData = decipher.update(encryptedData, "hex", "utf-8");

decryptedData += decipher.final("utf8");

console.log("Decrypted message: " + decryptedData);
```

Here is the output:

![Data encryption and decryption output](/engineering-education/data-encryption-and-decryption-in-node-js-using-crypto/encrypt-decrypt.jpg)

### Wrapping up

This article looked at data encryption and decryption in Node.js using the `crypto` module. Also, it touched on:

- Cryptography in Node.js
- Node.js crypto module

I hope you've a gained a solid knowledge about encryption and decryption and how to use the `crypto` module in Node.js applications to implement encryption and decryption.

Happy Coding!
