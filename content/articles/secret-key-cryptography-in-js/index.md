---
layout: engineering-education
status: publish
published: true
url: /secret-key-cryptography-in-js/
title: Implementing Secret Key Cryptography in JavaScript
description: This article will serve as an introduction to secret key cryptography and go over some algorithms that use this method of secret key cryptography.
author: kennedy-mwangi
date: 2020-12-06T00:00:00-13:00
topics: [Node.js]
excerpt_separator: <!--more-->
images:
  - url: /engineering-education/secret-key-cryptography-in-js/hero.jpg
    alt: Secret Key Cryptography image example
---
Secret key cryptography, also known as `symmetric cryptography` is a cryptographic system where the same key (often referred to as the secret key) is used for encryption and decryption of messages.
<!--more-->
#### Prerequisites
- It will be needed to have [Node.js](https://nodejs.org/en/) installed in your computer.
- Have some basic knowledge of cryptography.

### What we will cover
- [Secret key cryptography](#secret-key-cryptography)
- [Algorithms that employ secret key cryptography](#algorithms-that-employ-secret-key-cryptography)
- [Libraries to use while implementing secret key cryptography in JavaScript](#libraries-to-use-while-implementing-secret-key-cryptography-in-javascript)
- [Implementing secret key cryptography in JavaScript](#implementing-secret-key-cryptography-in-javascript)
- [The drawback of secret key cryptography](#the-drawback-of-secret-key-cryptography)
- [Existing platforms that use secret key cryptography](#existing-platforms-that-use-secret-key-cryptography)

### Secret key cryptography
As we mentioned above, secret key cryptography is also known as `symmetric cryptography`. It's a cryptographic system where the same key often referred to as the secret key is used for encryption and decryption of messages. While the message is transported over an insecure medium, the key is usually transported over a secure medium. 

The secret key is known to the communicating pair. It's faster when compared to `public key (asymmetric) cryptography` and therefore used for encryption and decryption of bulk messages.

### Algorithms that employ secret key cryptography
Since its invention, different algorithms have been built based on their functionality. The most secure algorithm is the one that employs a larger key length in encrypting the messages. 

The following are a few examples:

- **DES or Data Encryption Standard** - It was amongst the [first algorithms to use symmetric cryptography](https://en.wikipedia.org/wiki/Data_Encryption_Standard). It was developed in the 1970s by `IBM`. It uses a single key length of 56 bits which makes it easier for attackers to attack and hence rarely used in modern days.

- **Double DES** - After `DES` had been considered insecure, [double DES was developed](https://www.nku.edu/~christensen/3DES.pdf). It applies two operations of DES on a single plain text. At the time of development, this was considered much more secure than DES. It uses a 112 bits key length.

- **Triple DES** -`IBM` later embarked on a development of a much secure DES standard, that's why `Triple DES` [was created in 1999](https://en.wikipedia.org/wiki/Triple_DES). The encryption standard uses three operations on a single plain text string making it impossible to crack. It uses a 128 bits key length, thus making it more secure.

- **AES** - [Development started in 1997](https://en.wikipedia.org/wiki/Advanced_Encryption_Standard) by the National Institute of Science and Technology. It employs three block ciphers that are of 128, 192, and 256-bit key lengths. All the blocks are used for encrypting messages which make it significantly harder to crack.

### Libraries to use with secret key cryptography in JavaScript
- **Crypto**. It's a core module in server-side JavaScript, `Node js`. It mainly operates on the server-side. Its uniqueness is that it provides asynchronous processing, meaning that the program can be doing something else as the key is being generated. It implements algorithms such as `Twofish`, `RSA`, and `Serpent`.

- **Web crypto API**. It provides the functionalities of the crypto library to web-based applications. The functionalities include encryption, decryption, and generation of hashing signatures. It employs the same algorithms employed by the crypto module.

- **Stanford JavaScript Crypto Library(SJCL)**. It's a project developed by Standard Computer Security Lab with the aim to come up with a cryptographic library that is faster and smaller. It's considered small but powerful. It employs  the AES algorithm.

### Implementing secret key cryptography in JavaScript
For this article, we shall use the crypto module which is a core module in `Node.js` so you won't have to install any third-party module for the project.

#### Forming the puzzle
For us to implement secret key cryptography in JavaScript, we need to form a practical puzzle. Let's assume, we have two communicating parties, David and Viktoria. For secret key cryptography, if David wants to send a message to Viktoria, he encrypts the message using the secret key to get the ciphertext. 

The ciphertext is transported over an insecure medium whereas the secret key is transported over a secure medium. On reaching the other end, Viktoria uses her secret key to decode the message and get the plain text. She would follow the same process if she intends to send a reply.

#### Defining variables and modules
```javascript
    const crypto = require('crypto');

    const alg = `aes-192-cbc`;

    const pass_key = `david_viktoria`;

    const salt = 'salt';

    const keylen = 24;

    const shared_key = crypto.scryptSync(pass_key,salt,keylen);

    const one_time_code = crypto.randomBytes(16);

    const cipher = crypto.createCipheriv(alg,shared_key,one_time_code);

    let cipher_text;

    const decipher = crypto.createDecipheriv(alg,shared_key,one_time_code);

```

From the example above, we define the module crypto which is a core module meaning. From there, we specify the algorithm we are going to use since crypto can support more than one algorithm. 

We'll use `AES`. We then come up with the necessary parameters to get the shared key. A one time code is also needed in generating the cipher and the decipher. 

Based on the example above, we have everything for encryption and decryption.

#### David encrypting the message
```javascript
    function davidEncrypting(){

    const davids_message = "Hello there";

    cipher.on('readable',() => {

        let _cipher_text = cipher.read();

        if(_cipher_text){

            cipher_text = _cipher_text.toString('hex');

        };

    });

    cipher.write(davids_message);

    cipher.end();   

    };
```

When you are encrypting, you will need the message to be encrypted and in this instance, it's coming from David. From there we need to listen to the readable event of the cipher since that's where we are going to get the ciphertext. We write the message to the cipher and close the cipher.

#### Viktoria decrypting the message
```javascript
    function viktoriaDecrypting(){

        decipher.on('readable',() => {

            let _plain_text = decipher.read();

            if(_plain_text){

                console.log(_plain_text.toString('utf8'));

            };

        });

        decipher.write(cipher_text,'hex');

        decipher.end();

    }
```

Expected output:

```bash
    Hello there
```

Decipher works similar to the cipher. We still listen to the readable event and look if we have text that we converted to human-readable format `UTF8`. If we have the plain text, then we can show the output. We write the ciphertext to the decipher using the `hex` format and close the decipher.

You can get the full project code from [here](https://github.com/mwangiKibui/secret-key-cryptography-in-js/blob/main/secret-key-cryptography.js).

### The drawback of secret key cryptography
#### Key distirbution problem
Secret key cryptography uses the same key for encrypting and decrypting the message. While the key is being shared between the communicating parties, there is the risk of it being stolen or copied by an attacker. This puts the integrity of the message at risk.

Also, when many parties are communicating, a large number of key pairs are generated that becomes hectic to manage.

Solutions to key distribution problem include:
- [Public key cryptography](https://www.ibm.com/support/knowledgecenter/SSYKE2_8.0.0/com.ibm.java.security.component.80.doc/security-component/jsse2Docs/publickeycryptography.html).
- [Diffie-Hellman key distribution algorithm](https://doubleoctopus.com/security-wiki/encryption-and-cryptography/diffie-hellman-algorithm/#:~:text=Diffie%20Hellman%20(DH)%20key%20exchange,exchanged%20%E2%80%93%20they%20are%20jointly%20derived.&text=Alice%20chooses%20a%20secret%20integer,which%20is%20her%20public%20key).

### Existing platforms that use secret key cryptography
Some platforms that use secret key cryptography in production include:
- [IBM](https://www.ibm.com/support/knowledgecenter/SSYKE2_8.0.0/com.ibm.java.security.component.80.doc/security-component/jsse2Docs/secretkeycryptography.html)
- [National Institute of Science and Technology (NIST)](https://www.nist.gov/cryptography)

### Conclusion
In this article we have looked at a brief description of secret key cryptography, algorithms that use secret key cryptography, libraries to use while implementing secret key cryptography in JavaScript, implementing secret key cryptography in JavaScript, the drawback of secret key cryptography, and platforms that use secret key cryptography.

### Resources

- [Node.js](https://nodejs.org/en/) 

- [DES or Data EncryptionStandard](https://en.wikipedia.org/wiki/Data_Encryption_Standard)

- [Double DES](https://www.nku.edu/~christensen/3DES.pdf) 

- [Triple DES](https://en.wikipedia.org/wiki/Triple_DES)

- [AES](https://en.wikipedia.org/wiki/Advanced_Encryption_Standard)

---
Peer Review Contributions by: [Gregory Manley](/engineering-education/authors/gregory-manley/)
