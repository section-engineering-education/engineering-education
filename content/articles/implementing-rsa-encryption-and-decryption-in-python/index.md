### Introduction
Data encryption is an important practice used to protect data transfer on the internet. This helps to prevent data sent on the internet from unauthorised access.One of the major algorithms used for data protection on the internet is the *Rivest, Shamir, and Adleman* (RSA algorithm), named after the inventors of this encryption and decryption algorithm.

RSA is a public key algorithm widely used for secure data transmission. This is one of the major cyber security methods of data protection. In this tutorial, we will be looking at how RSA algorithm works and how this algorithm can be implemented in Python.

### Table of Contents
- [Introduction](#introduction)
- [Table of Contents](#table-of-contents)
- [Prerequisites](#prerequisites)
- [How does RSA encryption and decryption work](#how-does-rsa-encryption-and-decryption-work)
- [Implementing the RSA algorithm in Python](#implementing-the-rsa-algorithm-in-python)
- [Conclusion](#conclusion)

### Prerequisites
For a better understanding of this tutorial:
We will need to have a basic knowledge of ;
- [RSA algorithm](https://www.tutorialspoint.com/cryptography_with_python/cryptography_with_python_understanding_rsa_algorithm.htm)
- [Python](https://www.javatpoint.com/python-tutorial)

A code editor installed and well set up. We can download either;
- [Pycharm](https://www.filehorse.com/download-pycharm/) or [Visual Studio Code](https://code.visualstudio.com/download)

I will be using Visual Studio Code for this tutorial.

### How does RSA encryption and decryption work
Each pair of the RSA algorithm has two keys, i.e, public key and private key. One key is used for encypting the message which can only be decrypted by the other key.

For instance, let's say we have two peers communicating with each other in a channel secured by RSA algorithm. The sender will encrypt the plain text with the recipient's public key, so that the receiver is the only one who can decrypt the message using there private key.

Typically, the public key will be available in a public key repository. However, for the private key, as the name suggests, it is kept privately at the recipient's side.

### Implementing the RSA algorithm in Python
In this tutorial, we will be using `rsa python package`, hence, we will open up our terminal and use the command:

```bash
pip install rsa
```

Once our package is downloaded, then we are good to go. The first thing we need to do is to import `rsa` into our program.

```python
import rsa
```

We will start by implementing two helper methods to generate the private and public keys. The keys will be a tuple of pucblic and priavate keys, and then write the keys into files.

For writing the keys into files, we will create a folder called `Keys` in our project folder. The `Keys` folder will have two files for holding private and public keys, one key in each file. We will implement this using the code below.

```python
def generateKeys():
    (publicKey, privateKey) = rsa.newkeys(1024)
    with open('keys/publcKey.pem', 'wb') as p:
        p.write(publicKey.save_pkcs1('PEM'))
     with open('keys/privateKey.pem', 'wb') as p:
        p.write(privateKey.save_pkcs1('PEM'))
```

Now that we are done with saving the keys in our files. The next thing we need to do is to load the keys.

To load the keys, we will use the code snippet below that opens the files that we created above, and return both the private and public keys.

```python
def loadKeys():
    with open('keys/publicKey.pem', 'rb') as p:
        publicKey = rsa.PublicKey.load_pkcs1(p.read())
    with open('keys/privateKey.pem', 'rb') as p:
        privateKey = rsa.PrivateKey.load_pkcs1(p.read())
    return privateKey, publicKey
```

Now, we will create other two methods to encrypt and decrypt our message.

We will start by creating the encryption method using the code below. The encrypt method will take the message and the encryption key.

After defining the encrypt method, we need to return the encrypted message. We will encode the message in `ASCII` and give it the key.

```Python
def encrypt(message, key):
    return rsa.encrypt(message.encode('ascii'), key)
```

Let's now create the decryption method.This method will take the ciphertext and the key to decrypt. What we will do is to try and decrypt the message and return the decrypted message.

Since we used the `ASCII` encoding, we will be using the `ASCII` decoding as well.

If this fails, it means that the key was not able to decrypt the message, so what we will do is to return false. We will use the code below to implement the decryption method.

```Python
def decrypt(ciphertext, key):
    try:
        return rsa.decrypt(ciphertext, key).decode('ascii')
    except:
        return False
```

Finally we will create two methods to sign and verify our message with a key using `sha1 hash function`. This method will take the message and the key so that we sign our message with a key.

The message that we will be encoding will be given the key and our hashing algorithm, in this case `SHA-1`.

The sign method is implemented by the code below.

```Python
def sign(message, key):
    return rsa.sign(message.encode('ascii'), key, 'SHA-1')
```

For the verification of the message, we will create the verify method and pass in the message, the signature to verify, and the key. So, what we need to do is to try to verify our message.

This verify method returns the hash algorithm used in the signature. So, what we do is to check that this is equal to the hash algorithm, i.e; `SHA-1`.

If the signature is authentic, then it returns true. In case there is an excpetion, then it will return false which means that the verification has failed and either the message or the signature were manipulated or are not authentic.

```Python
def verify(message, signature, key):
    try:
        return rsa.verify(message.encode('ascii'), signature, key,) == 'SHA-1'
    except:
        return False
```

Now that we have tha RSA algorithm, we will create our program. We will start by generating our keys. We will call the generate keys method, load the public and private keys as implemented in the code below.

```Python
generateKeys()
publicKey, privateKey =load_keys()
```

We will then take the message input from the user, and encrypt the message using the public key, this represents the sender of the message.

```Python
message = input('Write your message here:')
ciphertext = encrypt(message, publicKey)
```

Now that we have the ciphertext, we will generate the signatures using the code below to sign the message with our private key. This enables the sender to verify the message with the public key and determine if the message is authentic.

```Python
signature = sign(message, privateKey)
```

Now, we will be decrypting our encrypted message to have a plain text. To implement this, we will create a decryption method and pass in the ciphertext and the private key as shown below.

```Python
text = decrypt(ciphertext, privateKey)
```

Now that we have our plain text, the next thing to do is to print out the cipher text and the  signature.

```Python
print(f'Cipher text: {ciphertext}')
print(f'Signature: {signature}')
```

Now, we will check the plain text, if it is a plain text, then we indicate that the message was successfully decrypted otherwise we were unable to decrypt the message.

```Python
if text:
    print(f'Message text: {text}')
else:
    print(f'Unable to decrypt the message.')
```

Now, let's verify our signature.

```Python
if verify(text, signature, publicKey):
    print(Successfully verified signature)
else:
    print('The message signature could not be verified')
```

With that you can enter your message, encrypt, and then decrypt it.

### Conclusion
From this tutorial, we have encrypted the message using public key and signed it using our own private key.

Typically, if you are having two peers; i.e, peer A talking to peer B, then peer A is sending a message to peer B, the message should be encrypted using the public key of peer B. However, this method is signed using the private key of peer A, who is actually the peer sending the message.

On the recipient's side, who is peer B, peer B is going to decrypt the message using there own private key and then verify the siganture of the message using the public key of peer A who is the sender of the message.

However, this is not the case in this tutorial since we don't have the sender or the receiver of the message, hence we are getting the knowledge on the use of signature, signing a message, and verifying the signature.
