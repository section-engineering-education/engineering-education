---
layout: engineering-education
status: publish
published: true
url: /rsa-encryption-and-decryption-in-python/
title: Implementing RSA Encryption and Decryption in Python
description: This tutorial will discuss the working of the RSA algorithm and how this algorithm can be implemented in Python.
author: daniel-masika
date: 2022-01-28T00:00:00-06:25
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/rsa-encryption-and-decryption-in-python/hero.jpg
    alt: Implementing RSA Encryption And Decryption In Python Hero Image
---
Data encryption is an important practice used to protect data transfer on the internet. This helps prevent data sent on the internet from unauthorized access.
<!--more-->
One of the major algorithms used for data protection on the internet is the _Rivest, Shamir, and Adleman_ (RSA algorithm), named after the inventors of this encryption and decryption algorithm.

RSA is a public key algorithm widely used for secure data transmission. This is one of the major cyber security methods of data protection.

In this tutorial, we will discuss the working of the RSA algorithm and how this algorithm can be implemented in Python.

### Table of contents
- [Table of contents](#table-of-contents)
- [Prerequisites](#prerequisites)
- [How the RSA encryption and decryption works](#how-the-rsa-encryption-and-decryption-works)
- [Implementing the RSA algorithm in Python](#implementing-the-rsa-algorithm-in-python)
- [Conclusion](#conclusion)

### Prerequisites
To follow along with this tutorial, you need to have:
- Basic knowledge of the [RSA algorithm](https://www.tutorialspoint.com/cryptography_with_python/cryptography_with_python_understanding_rsa_algorithm.htm)
- Basic knowledge of the [Python](https://www.javatpoint.com/python-tutorial) programming language.
- A code editor installed and well set up. You can download either [Pycharm](https://www.filehorse.com/download-pycharm/) or [Visual Studio Code](https://code.visualstudio.com/download)

I will be using Visual Studio Code for this tutorial.

### How the RSA encryption and decryption works
Each pair of the RSA algorithm has two keys, i.e. a public key and a private key. One key is used for encrypting the message which can only be decrypted by the other key.

For instance, let's say we have two peers communicating with each other in a channel secured by the RSA algorithm. The sender will encrypt the plain text with the recipient's public key. This is so that the receiver is the only one who can decrypt the message using their private key.

The public key will be available in a public key repository. However, for the private key, as the name suggests, it is kept private at the recipient's side.

### Implementing the RSA algorithm in Python
In this tutorial, we will be using `rsa python package`. Open your terminal and use the command below to install it:

```bash
pip install rsa
```

Once the package is downloaded, the first thing we need to do is to import `rsa` into our program:

```py
import rsa
```

We will start by implementing two helper methods to generate the private and public keys. The keys will be a tuple of public and private keys, and then write the keys into files.

To write the keys into the files, we will create a folder named `Keys` in our project folder. The `Keys` folder will have two files for holding private and public keys; one key in each file.

We will implement this using the code below:

```py
def generateKeys():
    (publicKey, privateKey) = rsa.newkeys(1024)
    with open('keys/publcKey.pem', 'wb') as p:
        p.write(publicKey.save_pkcs1('PEM'))
     with open('keys/privateKey.pem', 'wb') as p:
        p.write(privateKey.save_pkcs1('PEM'))
```

Now that we have saved the keys in our files, the next thing we need to do is to load the keys.

To load the keys, we will use the code snippet below that opens the files that we created above, and return both the private and public keys:

```py
def loadKeys():
    with open('keys/publicKey.pem', 'rb') as p:
        publicKey = rsa.PublicKey.load_pkcs1(p.read())
    with open('keys/privateKey.pem', 'rb') as p:
        privateKey = rsa.PrivateKey.load_pkcs1(p.read())
    return privateKey, publicKey
```

Next, create two other methods to encrypt and decrypt our message.

Start by creating the encryption method using the code below. The encrypt method will take the message and the encryption key.

After defining the encrypt method, we need to return the encrypted message. We will encode the message in `ASCII` and give it the key:

```py
def encrypt(message, key):
    return rsa.encrypt(message.encode('ascii'), key)
```

Let us now create the decryption method. This method will take the ciphertext and the key to decrypt. What we will do is to try and decrypt the message and return the decrypted message.

Since we used the `ASCII` encoding, we will use `ASCII` decoding as well.

If this fails, it means that the key was not able to decrypt the message, so what we will do is return false. We will use the code below to implement the decryption method.

```py
def decrypt(ciphertext, key):
    try:
        return rsa.decrypt(ciphertext, key).decode('ascii')
    except:
        return False
```

Finally, we will create two methods to sign and verify our message with a key using the `sha1 hash function`. This method will take the message and the key so that we sign our message with a key.

The message that we will encode will be given the key and our hashing algorithm. In this case, `SHA-1`.

The sign method is implemented using the code below:

```py
def sign(message, key):
    return rsa.sign(message.encode('ascii'), key, 'SHA-1')
```

For the verification of the message, we will create the verify method and pass in the message, the signature to verify, and the key. So, what we need to do is to try to verify our message.

This verify method returns the hash algorithm used in the signature. So, what we do is to check that this is equal to the hash algorithm, i.e; `SHA-1`.

If the signature is authentic, then it returns true. In case there is an exception, it will return false which means that the verification has failed. This means either the message or the signature were manipulated and are not authentic.

```py
def verify(message, signature, key):
    try:
        return rsa.verify(message.encode('ascii'), signature, key,) == 'SHA-1'
    except:
        return False
```

Now that we have the RSA algorithm, we will create our program. We will start by generating our keys.

We will call the generate keys method, load the public and private keys as implemented in the code below:

```py
generateKeys()
publicKey, privateKey =load_keys()
```

We will then take the message input from the user, and encrypt the message using the public key. This represents the sender of the message:

```py
message = input('Write your message here:')
ciphertext = encrypt(message, publicKey)
```

Now that we have the ciphertext, we will generate the signatures using the code below to sign the message with our private key. This enables the sender to verify the message with the public key and determine if the message is authentic:

```py
signature = sign(message, privateKey)
```

Next, we will decrypt our encrypted message to have plain text. To implement this, we will create a decryption method and pass it in the ciphertext and the private key as shown below:

```py
text = decrypt(ciphertext, privateKey)
```

After getting our plain text, the next thing to do is to print out the ciphertext and the signature.

```py
print(f'Cipher text: {ciphertext}')
print(f'Signature: {signature}')
```

We will check the plain text in the next step. If it is plain text, then we indicate `message was successfully decrypted` otherwise, `unable to decrypt the message`:

```py
if text:
    print(f'Message text: {text}')
else:
    print(f'Unable to decrypt the message.')
```

We verify our signature using the code below:

```py
if verify(text, signature, publicKey):
    print(Successfully verified signature)
else:
    print('The message signature could not be verified')
```

With that, you can enter your message, encrypt, and then decrypt it.

### Conclusion
In this tutorial, we have encrypted a message using a public key and signed it using our private key.

If you have two peers; i.e, peer A talking to peer B. When peer A is sending a message to peer B, the message should be encrypted using the public key of peer B. However, this method is signed using the private key of peer A, which is the peer sending the message.

On the recipient's side, which is peer B, it is going to decrypt the message using the private key and then verify the signature of the message using the public key of peer A which is the sender of the message.

However, this is not the case in this tutorial since we don't have the sender or the receiver of the message, hence we are getting the knowledge on the use of a signature, signing a message, and verifying the signature.

---
Peer Review Contributions by: [Dawe Daniel](/engineering-education/authors/dawe-daniel/)
