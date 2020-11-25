#### prerequisites
- Have [Node.js](https://nodejs.org/en/) installed in your computer.
- Have some basic knowledge of cryptography.

### What we will cover
- [Secret key cryptography](#secret-key-cryptography)
- [Algorithms that employ secret key cryptography](#algorithms-that-employ-secret-key-cryptography)
- [Libraries to use while implementing secret key cryptography in JavaScript](#libraries-to-use-while-implementing-secret-key-cryptography-in-javascript)
- [Implementing secret key cryptography in JavaScript](#implementing-secret-key-cryptography-in-javascript)
- [The drawback of secret key cryptography](#the-drawback-of-secret-key-cryptography)
- [Existing platforms that use secret key cryptography](#existing-platforms-that-use-secret-key-cryptography)

### Secret key cryptography

Secret key cryptography is also known as `symmetric cryptography`. It's a cryptographic system where the same key often referred to as the secret key is used for encryption and decryption of messages. While the message is transported over an insecure medium, the key is usually transported over a secure medium. The secret key is known to the communicating pair. It is faster when compared to `public key (asymmetric) cryptography` and therefore used for encryption and decryption of bulk messages.

### Algorithms that employ secret key cryptography

Since its invention, different algorithms have been  built based on their functionality. The most secure algorithm is the one that employs a larger key length in encrypting the messages. The following are examples.

- **DES**. It was amongst the first algorithms to use symmetric cryptography. It was developed in the 1970s by `IBM`. It uses a single key length of 56 bits which makes it easier for attackers to attack and hence rarely used in modern days.

- **Double DES**. After `DES` had been considered insecure, double DES was developed. It applies two operations of DES on a single plain text. At the time of development, this was considered much more secure than DES. It uses a 112 bits key length.

- **Triple DES**.`IBM` later embarked on a development of a much secure DES standard, that's why `Triple DES` was created in 1999. The encryption standard uses three operations on a single plan text string making it impossible to crack. It uses a 128 bits key length, thus making it more secure.

- **AES**. Development started in 1997 by the National Institute of Science and Technology. It employs three block ciphers which are of 128, 192, and 256-bit key lengths. All the blocks are used for encrypting messages which make it significantly hard to crack.

### Libraries to use while implementing secret key cryptography in JavaScript

- **Crypto**. It's a core module in server-side JavaScript, `Node js`. It mainly operates on the server-side. Its uniqueness is that it provide asynchronous processing, meaning that the program can be doing something else as the key is being generated. It implements algorithms such as `Twofish`, `RSA`, and `Serpent`.

- **Web crypto API**. It provides the functionalities of the crypto library to web-based applications. The functionalities include encryption, decryption, and generation of hashing signatures. It employs the same algorithms employed by the crypto module.

- **Stanford JavaScript Crypto Library(SJCL)**. It is a project developed by Standard Computer Security Lab with the aim to come up with a cryptographic library that is faster and smaller. It is considered small but powerful. It employs  the AES algorithm.

### Implementing secret key cryptography in JavaScript.

For this article, we shall use the crypto module which is a core module in `Node.js` so you won't have to install any third-party module for the project.

#### Forming the Puzzle.

For us to implement secret key cryptography in JavaScript, we need to form a practical puzzle. Let's assume, we have two communicating parties, David and Viktoria. For secret key cryptography, if David wants to send a message to Viktoria, he encrypts the message using the secret key to get the ciphertext. The ciphertext is transported over an insecure medium whereas the secret key is transported over a secure medium. On reaching the other end, Viktoria uses her secret key to decode the message and get the plain text. She would follow the same process if she intends to send a reply.

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
From the above, we define the module crypto which is a core module meaning. From there, we specify the algorithm we are going to use since crypto can support more than one algorithm. We will use `AES`. We then come up with the necessary parameters to get the shared key. A one time code is also needed in generating the cipher and the decipher. Based on the above, we have everything for encryption and decryption.

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

When you are encrypting, you will need the message to be encrypted and in this instance, it's coming from David. From there we need to listen to the readable event of the cipher since that is where we are going to get the ciphertext. We write the message to the cipher and close the cipher.

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

Expected output

```bash
    Hello there
```

Decipher works as similar to the cipher. We still listen to the readable event and look if we have text which we convert to human-readable format `UTF8`. If then we have the plain text, then we can show the output. We write the ciphertext to the decipher using the `hex` format and close the decipher. 

You can get the full project code from [here](https://github.com/mwangiKibui/secret-key-cryptography-in-js/blob/main/secret-key-cryptography.js).

### The drawback of secret key cryptography

#### Key distirbution problem.
Secret key cryptography uses the same key for encrypting and decrypting the message. While the key is been shared between the communicating parties, there is the risk of being stolen or copied by an attacker. This puts the integrity of the message at risk.

Also, when many parties are communicating, a large number of key pairs are generated which becomes hectic to manage. 

solutions to key distribution problem include:
- Public key cryptography
- Diffie-Hellman key distribution algorithm

### Existing platforms that use secret key cryptography

Some of the platforms that use secret key cryptography in production include:

- IBM
- National Institute of Science and Technology (NIST)

### Conclusion
In this article we have looked at a brief description of secret key cryptography, algorithms that employ secret key cryptography, libraries to use while implementing secret key cryptography in JavaScript, implementing secret key cryptography in JavaScript, the drawback of secret key cryptography, and platforms that employs secret key cryptography.