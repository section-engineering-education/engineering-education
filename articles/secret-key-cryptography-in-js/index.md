#### Prequisites
- Have Node.js installed in your computer. If you don't have it download it from [here](https://nodejs.org/en/)
- Have some familiarity with cryptography.

### What we shall cover
- [Secret key cryptography](#secret-key-cryptography)
- [Algorithms that employ secret key cryptography](#algorithms-that-employ-secret-key-cryptography)
- [Libraries to use while implementing secret key cryptography in JavaScript](#libraries-to-use-while-implementing-secret-key-cryptography-in-javascript)
- [Implementing secret key cryptography in JavaScript](#implementing-secret-key-cryptography-in-javascript)
- [Drawback of secret key cryptography](#drawback-of-secret-key-cryptography)
- [Existing platforms that use secret key cryptography](#existing-platforms-that-use-secret-key-cryptography)

### Secret key cryptography

Secret key cryptography is also known as `symmetric cryptography`. It a cryptographic system where the same key often referred to as the secret key is used for encryption and decryption of messages. While the message is transported over a secure medium, the key is usually transported over an insecure medium. The secret key is known to the communicating pair. It is really faster as considered to `public key (asymmetric) cryptography` and therefore used for encryption and decryption of bulk messages.

### Algorithms that employ secret key cryptography

Since its invention, different algorithms have been  built based on its functionality. The most secure algorithm is the one that employs a larger key length in encrypting the messages. The following are examples.

- **DES**. It was amongst the first algorithms to use symmetric cryptography. It was developed in 1970s by `IBM`. It uses a single key length of 56 bits which makes it easier for attackers to attack and hence rarely used in modern days.

- **Double DES**. After `DES` had being considered less secure, double DES was developed. It applys two operations of DES on a single plain text. At the time of development this was considered much more secure than DES. It uses a 112 bits key length.

- **Tripple DES**.`IBM` later embarked on a development of a much secure DES standard, thats why `Tripple DES` was founded in 1999. The encryption standard uses three operations on a single plain text making it impossible to crack. It uses a 128 bits key length thus making it more secure.

- **AES**. Developed by the National Institute of Science and Technology in 1997. it employs three block ciphers which are of 128,192 and 256 bit key length. All the blocks are used for encrypting messages which make it significantly hard to crack.

### Libraries to use while implementing secret key cryptography in JavaScript

- **Crypto**. Its a core module in server side JavaScript, `Node js`. It mainly operates in the server side. Its uniqueness is that it provides an asynchronous processing, meaning that the program can be doing something else as the key is being generated. It implements algorithms such as `Twofish`, `RSA` and `Serpent`.

- **Web crypto API**. It provides the functionalities of the crypto library to web based applications. The functionalities includes encryption, decryption and generation of hashing signatures. It employs the same algorithms employed by the crypto module.

- **Stanford JavaScript Crypto Library(sjcl)**. It is a project developed by computer security lab of Standard with an aim of coming up with a cryptographic library that is faster and smaller. It is considered small but powerful. It employs  the AES algorithm.

### Implementing secret key cryptography in JavaScript.

For purposes of this article, we shall use the crypto module which is a core module in `Node.js` so you won't have to install any third-party module for the project.

#### Forming the Puzzle.

For us to implement secret key cryptography in JavaScript, we need to form a practical puzzle. Let's assume, we have two communicating parties, David and Viktoria. For secret key cryptography, if David wants to send a message to Viktoria, he encrypts the message using the secret key to get the cipher text. The cipher text is transported over a secure medium whereas the secret key is transported over an insecure medium. On reaching the other end, Viktoria uses her secret key to decode the message and get the plain text. She shall follow the same process if she intends to send a reply.

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

    const decipher = crypto.createDecipheriv(alg,shared_key,one_time_code);
```
From the above, we define the module crypto which is a core module meaning. From there, we specify the algorithm we are going to use since crypto can support more than one algorithm. We shall use `AES`. We then come up with the neccessary parameters to get the shared key. A one time code is also needed in generating the cipher and the decipher. Based on the above, we have everything for encryption and decryption.

#### David encrypting the message

```javascript
    function davidEncrypting(){
    const davids_message = "Hello there";

    cipher.on('readable',() => {
        let _cipher_text = cipher.read()
        if(_cipher_text){

            cipher_text = _cipher_text.toString('hex');

        }
    });

    cipher.write(davids_message);

    cipher.end();
   
    };
```

When you are encrypting, you will need the message to be encrypted and from this instance, its coming from David. From there we need to listen to the readable event of the cipher since that is where we are going to get the cipher text. We write the message to the cipher and then close the cipher.

#### Viktoria decrypting the message

```javascript
    decipher.on('readable',() => {

        let _plain_text = decipher.read();

        if(_plain_text){

            console.log(_plain_text.toString('utf8'));
            
        };


    });

    decipher.write(cipher_text,'hex');

    decipher.end();
```

Expected output

```bash
    Hello there
```

Decipher works as similar to the cipher. We still listen to the readable event and look if we have text which we convert to human readable format `UTF8`. If then we have the plain text, then we can show the output. We write the cipher text to the decipher using the `hex` format and the close the decipher. 

### Drawback of secret key cryptography

#### Key distirbution problem.
Secret key cryptography used the same key for encrypting and decrypting the message. The key is usually transported in an insecure medium and therefore  questions the intergrity of the data in transit. An attacker with bad intentions can try hard to get the key and this shall mean that he or she can be able to encode and decode the message without meeting authorization requirements. 

solutions to key distribution problem include:
- Public key cryptography
- Deffie Hellman key distribution algorithm

### Existing platforms that use secret key cryptography

Some of the platforms that use secret key cryptography in production include:

- IBM
- National Institute of Science and Technology (NIST)

### Conclusion
In this article we have looked at brief description of secret key cryptography, algorithms that employ secret key cryptography, libraries to use while implementing secret key cryptography in JavaScript, implementing secret key cryptography in JavaScript, drawback of secret key cryptography and platforms that employ secret key cryptography.