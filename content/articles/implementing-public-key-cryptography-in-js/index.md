---
layout: engineering-education
status: publish
published: true
url: /implementing-public-key-cryptography-in-javascript/
title: Implementing Public Key Cryptography in JavaScript
description: This article will cover how to implement public key cryptography in Javascript. Public key cryptography is also known as asymmetric cryptography. In this method, there is a public key and a private key.
author: kennedy-mwangi
date: 2021-01-25T00:00:00-18:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/implementing-public-key-cryptography-in-javascript/hero.jpg
    alt: Implementing Public Key Cryptography in JavaScript image
---
Cryptography refers to the encoding and decoding of messages to maintain confidentiality, integrity, and authentication of information in transit. Public key cryptography is also known as asymmetric cryptography. In this method, there is a public key and a private key. The public key is known widely whereas the private key is the secret to a communicating pair. 
<!--more-->
When a pair wants to communicate, the sender encrypts the message using the public key of the recipient to come up with the ciphertext. When the recipient receives the message, they decrypt the message using their private key. The private key of the sender and the public key of the receiver is encoded in the ciphertext. This eliminates the [key distribution problem](https://www.open.edu/openlearn/ocw/mod/oucontent/view.php?id=48322&section=1.3).

### Prerequisites
Before we begin it would help if you have the following:
- [Node.js](https://nodejs.org/en/) installed on your computer.

- Some basic knowledge of the JavaScript programming language.

- Some basic knowledge of cryptography.

### What we will cover
- [Algorithms using public key cryptography](#algorithms-using-public-key-cryptography)
- [Libraries for public key cryptography in JavaScript](#libraries-for-public-key-cryptography-in-javascript)
- [Using TweetNaCl.js to implement public key cryptography](#using-tweetnacl.js-to-implement-public-key-cryptography)
- [Man-in-the-middle attack](#man-in-the-middle-attack)
- [Using pre-computed keys](#using-pre-computed-keys)
- [Maintaining Public keys](#maintaining-public-keys)
- [Maintaining Private or Secret keys](#maintaining-private-or-secret-keys)
- [Platforms that employ public key cryptography](#platforms-that-employ-public-key-cryptography)

### Algorithms using public-key cryptography
Since its initial release in 1976, different algorithms have applied this mechanism. The following are some of the algorithms using public-key cryptography:

- **RSA (Rivest-Shamir-Adelman)**: RSA was designed by [Rivest](https://en.wikipedia.org/wiki/Ron_Rivest), [Shamir](https://en.wikipedia.org/wiki/Adi_Shamir), and [Adelman](https://en.wikipedia.org/wiki/Leonard_Adleman). It was first published in 1977 and it is currently widely used for [secure data transmission](https://en.wikipedia.org/wiki/RSA_(cryptosystem)).

- **Elliptic curve cryptography**: Elliptic curve cryptography was suggested in 1985 by [Neal Koblitz](https://en.wikipedia.org/wiki/Neal_Koblitz) and [Victor S.miller](https://en.wikipedia.org/wiki/Victor_S._Miller). It's based on an [algebraic structure](https://en.wikipedia.org/wiki/Elliptic-curve_cryptography) over finite fields of elliptic curves.

- **Diffie Hellman protocol**: The Diffie Hellman protocol is a mechanism of using the [public channel](https://en.wikipedia.org/wiki/Diffie%E2%80%93Hellman_key_exchange) to exchange cryptographic keys. It was designed by [Whitfield Diffie](https://en.wikipedia.org/wiki/Whitfield_Diffie) and [Martin Hellman](https://en.wikipedia.org/wiki/Martin_Hellman) and was first published in 1976.

### Libraries for public-key cryptography in JavaScript
There are different libraries for implementing public-key cryptography in JavaScript. The following are the most commonly used.

- [NaCL](http://nacl.cr.yp.to/): It's a high-speed library for carrying out encryption, decryption, and network communication. It uses an elliptic curve cryptography algorithm.

- [TweetNaCL](http://tweetnacl.cr.yp.to/): It was among the first cryptographic libraries to be released and it was originally written in the C programming language. TweeNaCL.js is the JavaScript version of the library. It uses the Diffie Hellman algorithm.

### Using TweetNaCL.js to implement public-key cryptography
For this article, we'll use `TweetNaCL.js` to implement the concept of public-key cryptography.

First, let's install the dependencies to use in the application. You can use `npm` or [`yarn`](https://classic.yarnpkg.com/en/docs/install) to install these packages.

```bash
npm install tweetnacl tweetnacl-util
```

or 

```bash
yarn add tweetnacl tweetnacl-util
```

### Practical scenario
We have two communicating pairs, David and Viktoria. When David is sending a message to Viktoria, he encrypts it using Viktoria's public key. When Viktoria receives it, she decrypts it using her private key. When she decides to reply to the message, she encrypts her message using David's public key, and on David receiving the message, he decrypts it using his private key.

#### Importing libraries
```JavaScript
//import the libraries
const nacl = require('tweetnacl');
nacl.util = require('tweetnacl-util');
```

#### Generating the keys
```JavaScript
//Generate the keys
const david = nacl.box.keyPair();
const viktoria = nacl.box.keyPair();
```

We have generated the keys for both David and Viktoria. A pair consists of the public key and the private key. The keys are of type [`Uint8Array(32)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array).

For example, David's key pair will look like this:

```JavaScript
{
  publicKey: Uint8Array(32) [
    159,  32, 160, 185, 143,  29,  55,  23,
    111, 203,  90, 224,  64,  90,  65,  75,
     80, 149,  12, 124,  83, 145,  72, 162,
     96, 163, 121, 157,  62,  78, 203,  52 
  ],
  secretKey: Uint8Array(32) [
     72, 210, 106, 229, 196,  53,   2,  88,
    124,  87, 128, 174, 185,   0, 192,  52,
      5, 162,  11,  39,  23, 183, 103, 165,
     40, 128, 179, 242,  38, 132,  78, 241 
  ]
}
```

#### David encrypting the message
```JavaScript
function davidEncrypting(){
    const one_time_code = nacl.randomBytes(24);

    //Get the message from david
    const plain_text = "Hello there Viktoria";

    //Get the cipher text
    const cipher_text = nacl.box(
        nacl.util.decodeUTF8(plain_text),
        one_time_code,
        viktoria.publicKey,
        david.secretKey
    );

    //message to be sent to Viktoria
    const message_in_transit = {cipher_text,one_time_code};

    return message_in_transit;
};
```

1. We'll generate a one-time code, a code i.e., only valid for the current process.

2. We'll get the plain text from David.

3. We'll compose the ciphertext using `nacl.box()` passing the following parameters:

    - A string of Unicode characters generated by passing plain text as a parameter through `decodeUTF8()`.
    
    - One-time code.
    
    - Viktoria's public key.
    
    - David's private key.

The message to be sent to the recipient as per the library is:

- Ciphertext.

- One-time code.

#### Viktoria decrypting the message

```JavaScript
function viktoriaDecrypting(message){
    //Get the decoded message
    let decoded_message = nacl.box.open(message.cipher_text, message.one_time_code, david.publicKey, viktoria.secretKey);

    //Get the human readable message
    let plain_text = nacl.util.encodeUTF8(decoded_message)

    //return the plaintext
    return plain_text;
};
```

Output:

```bash
Hello there Viktoria
```

We are decoding the message using the ciphertext, one-time code, David's public key, and Viktoria's secret key. The message is then encoded to `UTF8` using `encodeUTF8()` so that its human-readable.

### Man-in-the-middle attack
In public-key cryptography, the public key is disseminated widely. This means that an attacker may get the public key of another party. If party A is communicating with party B, an attacker may impersonate himself or herself such that when party A is sending a message to party B, the message reaches the attacker before reaching party B. 

The attacker then modifies the message and sends the modified message to party B. When party B decides to reply, the message is again sent to the attacker who modifies the message and sends the modified message to party A. In such a situation, the integrity of the message is not preserved. This is a major threat to public-key cryptography.

### Using pre-computed keys
To curb the above threat, we use pre-computed keys. Here, while encrypting and decrypting, instead of using the public key of the other party which could be impersonated, we use a shared key. A shared key is a special combination key of the recipient's public key and the sender's secret key. 

#### David encrypting the message
```JavaScript
function davidEncrypting(){
    //David computes a one time shared key
    const david_shared_key = nacl.box.before(viktoria.publicKey,david.secretKey);

    //David also computes a one time code.
    const one_time_code = nacl.randomBytes(24);

    //Davids message
    const plain_text = "Hey!!, our communication is now more secure";

    //Getting the cipher text
    const cipher_text = nacl.box.after(
        nacl.util.decodeUTF8(plain_text),
        one_time_code,
        david_shared_key 
    );

    //message to be transited.
    const message_in_transit = {cipher_text,one_time_code};

    return message_in_transit;
};
```

1. We'll compute a shared key based on Viktoria's public key and David's secret key.

2. We'll generate a one-time code.

3. We'll get the plain text from David.

4. We'll compute the ciphertext using `nacl.box.after()` passing the following parameters:

    - A string of Unicode characters generated by passing the plain text through `decodeUTF8()`.
    
    - One-time code.
    
    - David's shared key.

The message to be sent to the recipient is comprised of:

- Ciphertext.

- One-time code.

#### Viktoria decrypting the message
```JavaScript
function viktoriaDecrypting(message){
    //Getting Viktoria's shared key
    const viktoria_shared_key = nacl.box.before(david.publicKey,viktoria.secretKey);

    //Get the decoded message
    let decoded_message = nacl.box.open.after(message.cipher_text,message.one_time_code,viktoria_shared_key);

    //Get the human readable message
    let plain_text = nacl.util.encodeUTF8(decoded_message)

    //return the message
    return plain_text;
};
```

Output:

```bash
Hey!!, our communication is now more secure
```

1. We'll get Viktoria's shared key.

2. We'll decode Viktoria's message using the ciphertext, one-time code, and her shared key.

3. We'll encode the message to `UTF8` using `encodeUTF8()` so that its human-readable.

### Maintaining public keys
**Public key infrastructure** is a body responsible for [maintaining and registering public keys](https://en.wikipedia.org/wiki/Public_key_infrastructure). Practical areas that use public key infrastructure are banks. All banks have their keys stored and maintained by one body. So when one bank wants to transfer funds to another they get the keys from the common body. Public key infrastructure ensures the credibility of public keys thereby preventing [man in the middle attacks](/man-in-the-middle-attack/).

### Maintaining private or secret keys
It's very important to maintain these keys since they are crucial and critical. Currently, they are stored online in databases or through some other medium. They are usually encrypted using encryption algorithms such as `Advanced Encryption Standard (AES)` to promote integrity before storing them.

### Platforms that employ public-key cryptography
Some of the platforms that use public-key cryptography in production include:

- [Whatsapp](https://www.businesstoday.in/buzztop/buzztop-feature/how-does-whatsapp-end-to-end-encryption-work/story/307998.html)

- [Threema](https://threema.ch/press-files/2_documentation/cryptography_whitepaper.pdf)

- [SSL/TLS handshake](https://www.cloudflare.com/learning/ssl/what-happens-in-a-tls-handshake/)

### Conclusion
Public key cryptography solves the key distribution problem but suffers the threat of man-in-the-middle attack. There are different methods to solve it and among them is using pre-computed keys. The method is still in demand and is used by a lot of successful companies. 

In this article, we have covered an introduction to public-key cryptography, algorithms that use public-key cryptography, libraries to use when implementing public-key cryptography in JavaScript. 

We also implemented public-key cryptography using `tweetnacl.js`, we went over man-in-the-middle attack, a brief example using pre-computed keys, how we maintain public keys and private keys, and we mentioned platforms using public-key cryptography today. 

You can access the finalized code from [here](https://github.com/mwangiKibui/public-key-cryptography-in-js).

Happy Coding!

### Resources
- [Node.js](https://nodejs.org/en/)
- [TweetNaCL.js](https://tweetnacl.js.org/#/)
- [Elliptic curve cryptography](https://en.wikipedia.org/wiki/Elliptic-curve_cryptography)
- [RSA](https://en.wikipedia.org/wiki/RSA_(cryptosystem))
- [Diffie Hellman protocol](https://en.wikipedia.org/wiki/Diffie%E2%80%93Hellman_key_exchange)

---
Peer Review Contributions by: [Mohan Raj](/engineering-education/authors/mohan-raj/)
