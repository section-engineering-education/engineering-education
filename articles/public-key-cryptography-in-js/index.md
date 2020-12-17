Public key cryptography, also known as `asymmetric cryptography` is an encryption system comprising of public and private key pairs. The private keys are known to the sender and receiver of information only whereas the public keys are disseminated widely. It solves the [key distribution problem](https://www.open.edu/openlearn/ocw/mod/oucontent/view.php?id=48322&section=1.3) brought about by symmetric cryptography.

#### Prerequisites
- Have [Node.js](https://nodejs.org/en/) installed in your computer.
- Have some basic knowledge of JavaScript.
- Have some basic knowledge of cryptography.

### What we will cover
- [Introduction](#introduction)
- [Algorithms using public key cryptography](#algorithms-using-public-key-cryptography)
- [Libraries for public key cryptography in JavaScript](#libraries-for-public-key-cryptography-in-javascript)
- [Using TweetNaCl.js to implement public key cryptography](#using-tweetnacl.js-to-implement-public-key-cryptography)
- [Man-in-the-middle attack](#man-in-the-middle-attack)
- [Using pre-computed keys](#using-pre-computed-keys)
- [Maintaining Public keys](#maintaining-public-keys)
- [Maintaining Private or Secret keys](#maintaining-private-or-secret-keys)
- [Platforms that employ public key cryptography](#platforms-that-employ-public-key-cryptography)

### Introduction
Cryptography refers to the encoding and decoding of messages so that to maintain confidentiality, integrity, and authentication of information in transit. Public key cryptography is one of the methods of cryptography. In this method, there is the public and private key. The public key is known widely whereas the private key is secret to a communicating pair. When a pair wants to communicate, the sender encrypts the message with the public key of the recipient to come up with the ciphertext. When the recipient receives the message, he or she decrypts the message using his or her private key. The key is not transported individually, it is encoded in the ciphertext. This eliminates the [Key distribution problem](https://www.open.edu/openlearn/ocw/mod/oucontent/view.php?id=48322&section=1.3)

### Algorithms using public-key cryptography

Since its initial release in 1976, different algorithms have applied its mechanism. The following are some of the algorithms using public-key cryptography:

- **RSA (Rivest-Shamir-Adelman)**: Designed by [Rivest](https://en.wikipedia.org/wiki/Ron_Rivest), [Shamir](https://en.wikipedia.org/wiki/Adi_Shamir), and [Adelman](https://en.wikipedia.org/wiki/Leonard_Adleman). First published in 1977. Currently widely used for [secure data transmission](https://en.wikipedia.org/wiki/RSA_(cryptosystem)).
- **Elliptic curve cryptography**: Suggested in 1985 by [Neal Koblitz](https://en.wikipedia.org/wiki/Neal_Koblitz) and [Victor S.miller](https://en.wikipedia.org/wiki/Victor_S._Miller). It is based on an [algebraic structure](https://en.wikipedia.org/wiki/Elliptic-curve_cryptography) over finite fields of elliptic curves.
- **Diffie Hellman protocol**: It is a mechanism of using the [public channel](https://en.wikipedia.org/wiki/Diffie%E2%80%93Hellman_key_exchange) to exchange cryptographic keys. It was designed by [Whitfield Diffie](https://en.wikipedia.org/wiki/Whitfield_Diffie) and [Martin Hellman](https://en.wikipedia.org/wiki/Martin_Hellman). First published in 1976.

### Libraries for public-key cryptography in JavaScript

Following the above algorithms, there are different libraries for implementing public-key cryptography in JavaScript. The following are the most commonly used.

- [NaCL](http://nacl.cr.yp.to/). It is a high-speed library for carrying out encryption, decryption, and network communication. It uses an elliptic curve cryptography algorithm.
- [TweetNaCL](http://tweetnacl.cr.yp.to/). It was among the initial cryptographic  libraries to be released and was originally written in C programming language. TweeNaCL.js is the JavaScript version of the library. It uses the Diffie Hellman algorithm.

### Using TweetNaCL.js to implement public-key cryptography

For this article, we shall use TweetNaCL.js to implement the concept of public-key cryptography.

First and foremost we will install the dependencies to use in the application, you can use `npm` or `yarn`.

```bash
    npm install tweetnacl tweetnacl-util
```

or 

```bash
    yarn add tweetnacl tweetnacl-util
```

#### Forming a puzzle 

For us to implement the solution, we need first to come up with a puzzle. We have two communicating pairs, David and Viktoria. The concept is that, when David is sending a message to Viktoria he encrypts it using Viktoria's public key. When Viktoria receives it, she decrypts it with her private key. When she decides to reply to the message, she encrypts her message using David's public key, and on David receiving the message, he decrypts it using his private key.

#### Importing libraries
```javascript
//import the libraries
const nacl = require('tweetnacl');
nacl.util = require('tweetnacl-util');
```

#### Generating the keys
```javascript
//Generate the keys
const david = nacl.box.keyPair();
const viktoria = nacl.box.keyPair();
```

#### David encrypting the message

```javascript
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

From above:
1. A one-time code for verification.
1. Got a  plain text from David.
1. Composed ciphertext using `nacl` library.

The message to be sent to the recipient as per the library is:
- Ciphertext.
- One-time code.

Viktoria decrypting the message:

```javascript
function viktoriaDecrypting(message){
    //Get the decoded message
    let decoded_message = nacl.box.open(message.cipher_text,message.one_time_code,david.publicKey,viktoria.secretKey);

    //Get the human readable message
    let plain_text = nacl.util.encodeUTF8(decoded_message)

    //return the plaintext
    return plain_text;
};
```

Output

```bash
    Hello there Viktoria
```

From above, we are decoding the message using the ciphertext, one-time code, David's public key, and Viktoria's secret key. The message is then encoded to `UTF8` so that it can be human-readable.

### Man-in-the-middle attack. 
In public-key cryptography, the public key is disseminated widely. This means that an attacker may get the public key of another party. If party A is communicating with party B. An attacker may impersonate himself or herself such that when party A is sending a message to party B, it does not reach party B first, it first reaches him or her. The attacker  then modifies the message and sends the modified message to party B. When party B decides to reply, the message is again sent to the attacker who modifies the message and sends the modified message to party A. In such a situation, the integrity of the message is not preserved. This is a major threat to public-key cryptography.

### Using pre-computed keys
To curb the above threat, we use the pre-computed keys. Here, while encrypting, instead of using the public key of the other party which could be impersonated, we use a shared key. A shared key is a special combination key of the recipient's public key and the sender's secret key. 

#### David encrypting the message
```javascript
function davidEncrypting(){
    //David computes a one time shared key
    const david_shared_key = nacl.box.before(viktoria.publicKey,david.secretKey);

    //David also computes a one time code.
    const one_time_code = nacl.randomBytes(24);

    //Davids message
    const plain_text = "Hey!!, our communication is now much secure";

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

From above:

1. David computes a shared key based on Viktoria's public key and his secret key.
1. David computes a one-time code.
1. Get a plain text from David.
1. Compute the ciphertext using the plain text, one-time code, and David's shared key.

The message to be sent to the recipient comprises:

- Ciphertext.
- One-time code.

#### Viktoria decrypting the message

```javascript
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

Output

```bash
    Hey!!, our communication is now much secure
```

From above:

1. Viktoria gets her shared key.
1. Viktoria decodes her message using: ciphertext, one-time code, and her shared key.
1. Encode the message to `UTF8` so that it can be human-readable.

### Maintaining Public keys

**Public key infrastructure** is a body responsible for [maintaining and registering public keys](https://en.wikipedia.org/wiki/Public_key_infrastructure). Practical areas that use public key infrastructure are banks. All banks have their keys stored and maintained by one body. So when one bank wants to transfer funds to another they get the keys from the common body. Public key infrastructure ensures the credibility of public keys thereby preventing man in the middle attacks.

### Maintaining Private or Secret keys
They are very crucial and critical keys. Currently, they are stored online in databases or through some other medium but are usually first encrypted using encryption algorithms such as `Advanced Encryption Standard (AES)` to promote integrity.

### Platforms that employ public-key cryptography
Some of the platforms that use public-key cryptography in production include:

- [Whatsapp](https://www.businesstoday.in/buzztop/buzztop-feature/how-does-whatsapp-end-to-end-encryption-work/story/307998.html)
- [Threema](https://threema.ch/press-files/2_documentation/cryptography_whitepaper.pdf)
- [SSL/TLS handshake](https://www.cloudflare.com/learning/ssl/what-happens-in-a-tls-handshake/)

### Conclusion
Public key cryptography solves the key distribution problem but suffers the threat of man-in-the-middle attack. There are different solutions to solve it and among them is using pre-computed keys. The method is still in demand and is used by a lot of successful companies. In this article, we have covered an introduction to public-key cryptography, algorithms that use public-key cryptography, libraries to use to implement public-key cryptography in JavaScript, implementing public-key cryptography using `tweetnacl.js`, man-in-the-middle attack, using pre-computed keys, maintaining public keys, maintaining private keys, and platforms using public-key cryptography today. You can access the finalized code from [here](https://github.com/mwangiKibui/public-key-cryptography-in-js).

### Resources
- [Node.js](https://nodejs.org/en/)
- [TweetNaCL.js](https://tweetnacl.js.org/#/)