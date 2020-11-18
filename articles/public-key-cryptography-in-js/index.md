Public key cryptography refers to an encryption system which comprises of public and private key pairs. The private keys are known to the sender and receiver of information only whereas the public keys are disseminated widely. It aims to solve the key distribution problem brought about by symmetric cryptography.

<!--more-->

#### Prerequisites
- Have Node.js installed in your system. If you don't have it, you can download it from [here](https://nodejs.org/en/).
- Have some familiarity with JavaScript programming language.
- Have some familiarity with cryptography and public key cryptography.

### What we will look at
1. [Algorithms using public key cryptography](#algorithms-using-public-key-cryptography)
1. [Libraries for public key cryptography in JavaScript](#libraries-for-public-key-cryptography-in-javascript)
1. [Using TweetNaCl.js to implement public key cryptography](#using-tweetnacl.js-to-implement-public-key-cryptography)
1. [Using pre-computed keys](#using-pre-computed-keys)
1. [Maintenance of keys](#maintenance-of-keys)
1. [Platforms that employ public key cryptography](#platforms-that-employ-public-key-cryptography)

### Algorithms using public key cryptography

Since its initial release in 1976, public key cryptography have had a variety of algorithms using it. The following are the examples :

- [RSA (Rivest-Shamir-Adelman)](https://simple.wikipedia.org/wiki/RSA_algorithm)
- [Elliptic curve cryptography](https://en.wikipedia.org/wiki/Elliptic-curve_cryptography)
- [Deffie Hellman protocol](https://en.wikipedia.org/wiki/Diffie%E2%80%93Hellman_key_exchange)

### Libraries for public key cryptography in JavaScript

Following the above algorithms, there are different libraries for implementing public key cryptography in JavaScript. The following are the most commonly used.

- NaCL. It is a high-speed library for carrying out encryption, decryption and network communication. It uses elliptic curve cryptography algorithm.
- TweetNaCL. It was among the initial cryptographic  libraries to be released and was originally written in C programming language. TweeNaCL.js is the JavaScript version of the library. It uses the Deffie hellman algorithm.

### Using TweetNaCL.js to implement public key cryptography

For purposes of the following article we shall TweetNaCL.js to implement the concept of public key cryptography.

First and foremost we shall install the dependencies to use in the application, you shall use `npm` or `yarn`.

```bash
    npm install tweetnacl tweetnacl-util
```

or 

```bash
    yarn add tweetnacl tweetnacl-util
```

#### Forming a puzzle 

For us to implement the solution, we need first to come up with a puzzle. We shall say that we have two communicating pairs, David and Viktoria. The concept is when David is sending a message to Viktoria he encrypts it using Viktoria's public key. When Viktoria receives it, she decrypts it with her private key. When she decides to reply to the message, she encrypts her message using David's public key and on receiving David decrypts it using his private key.

#### David encrypting the message

```javascript

    //import the libraries
    const nacl = require('tweetnacl');
    nacl.util = require('tweetnacl-util');

    //Generate the keys
    const david = nacl.box.keyPair();
    const viktoria = nacl.box.keyPair();

    //Generate one time random code.
    const one_time_code = nacl.randomBytes(24);

    //Get the message from david
    const plain_text = "Hello there Viktoria";

    //Get the cipher text
    const cipher_text = nacl.box(
        nacl.util.decodeUTF8(plain_text),//decoded message
        one_time_code,
        viktoria.publicKey,
        david.secretKey
    );

    //message to be sent to Viktoria
    const message_in_transit = {cipher_text,one_time_code};

```

From above we have imported the libraries, generated the keys, a one time code for verification, the plain text from David and from there composed the cipher text which is to be communicated to Viktoria. The message to be sent to Viktoria is an object comprising of the cipher text and the one time code.

Viktoria decrypting the message

```javascript

    //Get the decoded message
    let decoded_message = nacl.box.open(message_in_transit.cipher_text,message_in_transit.one_time_code,david.publicKey,viktoria.secretKey);

    //Get the human readable message
    let plain_text = nacl.util.encodeUTF8(decoded_message)

    //log the message
    console.log(plain_text);
```

Output

```bash
    Hello there Viktoria
```

From above, we get the message that David had sent, we then decrypt it to get the decoded message which is not human readable since it is a Uint8Array. On getting the decoded message, we encode it to `UTF8` so that it can be human readable.

### Using pre-computed keys
One of the major drawbacks of the public key cryptography system is the man in the middle attack. This involves where an attacker pretends to be one of the communicating partys having impersonated the public keys so that when you are sending a message you think you are sending to the right pair but then you are sending to an attacker.

In order to curb this, we can use the pre-computed keys. Here while encrypting, instead of using the public key of the other pair which could be impersonated we use a shared key. A shared key is a special combination key of the other pair's public key and the communicating party's secret key.

Lets consider the encryption process of David sending a message to Viktoria.

```javascript

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

```

From above, you can see that we are generating the shared key using the public key of Viktoria and secret key of David. The shared key is one time meaning that it won't be used in another communicating so the attacker cannot retrace the steps to identify any pattern.

When the message reaches Viktoria, she needs to decrypt it. She first computes her shared key which is the combination of David's public key and her secret key. After that she decodes the message to get the decoded message using the shared key which is of type UInt8Array. The message is then encoded using `UTF8` so as to get human readable plain text.

It can be illustrated by the following code.

```javascript
    //Getting Viktoria's shared key
    const viktoria_shared_key = nacl.box.before(david.publicKey,viktoria.secretKey);

    //Get the decoded message
    let decoded_message = nacl.box.open(message_in_transit.cipher_text,message_in_transit.one_time_code,viktoria_shared_key);

    //Get the human readable message
    let plain_text = nacl.util.encodeUTF8(decoded_message)

    //log the message
    console.log(plain_text); 
```

Output

```bash
    Hey!!, our communication is now much secure
```

### Maintenance of keys

#### Public Key Infrastructure
It is a body responsible for maintaining and registering public keys. Some of the practical areas that use public key infrastructure are banks. All banks have their keys stored and maintained by one body. So when one bank wants to transfer funds to another they get the keys from the common body. Public keys infrastructure provides credibility of public keys thereby preventing man in the middle attacks.

#### Private keys
They are very crucial and critical keys. Currently, they are stored online in databases or through some other medium but are usually first encrypted using encryption algorithms such as `Advanced Encryption Standard (AES)` to promote intergrity.

### Platforms that employ public key cryptography
- Whatsapp
- Threema
- SSL/TLS handshake

### Conclusion
With that, we have gone through algorithms that employ public key cryptography, the libraries in JavaScript that one can use to implement public key cryptography in JavaScript, an implementation example,using pre-computed keys to solve man in the middle attack, key maintenance in public key cryptography and also some examples of platforms that use public key cryptography.