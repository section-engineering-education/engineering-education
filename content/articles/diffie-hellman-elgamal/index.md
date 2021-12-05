---
layout: engineering-education
status: true
published: true
url: /diffie-hellman-elgamal/
title: Understanding Diffie Helman and Elgamal Asymmetric Encryption
description: This tutorial will help the reader understand the concept of Diffie Helman and Elgamal Asymmetric encryption algorithms, together with key generation, encryption, and decryption process.
author: gitahi-philomena
date: 2021-12-01T00:00:00-04:00
topics: [Security]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/diffie-hellman-elgamal/hero.png
    alt: Encryption Example Image
---
Security plays a crucial role in data communication and data protection. It helps prevent unauthorized access to confidential information, which may lead to data loss, and/or modification by unknown people making data transferred unsafe.
<!--more-->
This article will cover Diffie Hellman's (DH) key exchange algorithm, which involves deriving the same key from both sender and receiver. Additionally, we'll cover the concepts of the Elgamal encryption algorithm by using DHKE generated keys.

### Table of contents
- [Table of contents](#table-of-contents)
- [Prerequisites](#prerequisites)
- [Objectives](#objectives)
- [Getting started with asymmetric encryption](#getting-started-with-asymmetric-encryption)
- [Modular exponentiation](#modular-exponentiation)
- [Modular exponentiation using Python](#modular-exponentiation-using-python)
- [Working of Diffie Helman Key Exchange Protocol](#working-of-diffie-helman-key-exchange-protocol)
  - [Steps involved](#steps-involved)
- [Application of DHKE in ElGamal](#application-of-dhke-in-elgamal)
  - [Key Generation](#key-generation)
  - [Encryption](#encryption)
  - [Decryption](#decryption)
- [Implementing DHKE in Python](#implementing-dhke-in-python)
- [Conclusion](#conclusion)

### Prerequisites
To follow this tutorial along, you need the following:
- Basic knowledge of modular arithmetic.
- Basic understanding of security concepts.
- Familiar with basic concepts of Python.
- Local development environment. We'll use [Pycharm](https://www.jetbrains.com/pycharm/) as our IDE in this tutorial.

### Objectives
By the end of this article, you should have a basic understanding of generating keys using Diffie-Hellman algorithms, and encryption/decryption using the Elgamal algorithm.

### Getting started with asymmetric encryption
Asymmetric encryption is also known as public-key encryption. It involves enciphering information by a sender and deciphering it by the receiver using keys. Each party has its public key to share with the world and a private key that they must keep secret.

The magic of public-key cryptography is that a message encrypted with the public key can only be decrypted with the private key. A sender will encrypt their message with the receiver's public key.

Even though an adversary may know the encryption key, they cannot decrypt the message. However, using their secret key, the receiver can decrypt the ciphertext.

Public key encryption is an attempt to curb the following problems faced by symmetric encryption:
1. **Key distribution**

Key distribution under symmetric encryption requires that either:
- the two communicants already share a key which somehow has been distributed to them. Or,
- they use a Key Distribution Center. This requirement negated the very essence of cryptography, that is, the ability to maintain total secrecy over your communication. If their users were forced to share their keys with a Key Distribution Center, it could be compromised by either burglary or subpoena.

1. **Creation and verification of the digital signature**

If the use of cryptography were to become widespread, not just in military situations, but for commercial and private purposes, then electronic messages and documents would need the equivalent of signatures used in paper documents.

Asymmetric algorithms rely on one key for encryption, and a different but related key for decryption. Therefore, these algorithms have the following important characteristic:
- Given only knowledge of the cryptographic algorithm and the encryption key, it is computationally infeasible to determine the decryption key
- The two related keys can be used for encryption, with the other used for decryption.

### Modular exponentiation
Modular exponentiation is the remainder when an integer `B` (the base) is raised to the power `e` (the exponent), and divided by `A` positive integer `M` (the modulus); that is, `C` = `B`<sup>`e`</sup> mod `M`.

Most technological applications of modular arithmetic involve exponentials with very large numbers. For example, a typical problem related to encryption might involve solving one of the following two equations:

```bash
67930^32319 == (mod 103969) (70)
67930^b == 48560 (mod 103969) (71)
```

The answers to the questions above are not as obvious as we may assume from the equations. It is not even clear how we would go about determining `a` and `b`.

The first equation is relatively easy for computers to solve. However, there is no known way of efficiently solving the second problem.

> Note: It's very hard to compute `p`<sup>`e`</sup>, then divide by `m` and find the remainder because `p`<sup>`e`</sup> is a very large number.

Despite the difficulties discussed above, it is essential to find the modulus of `p`<sup>`e`</sup> `mod m` where `p`, `e`, and `m` are very large integers.

Therefore, the computation can be done using an algorithm that employs the binary expansion of the exponent `e`, reducing the value given (p) using the binary form of `e` and finally computing the modulus of the value in each step.

Let's look at an example:

To compute `3^9`, we have `9` in binary as `1001` such that `3^9=3^8.3^1`.

By successively squaring, we find that `3^2=9`, `3^4=9^2=81` and `3^8=81^2=6561`.

To compute the modulus of `3^9 mod 5` using the modular exponentiation, let's follow the steps below:
- Step 1: Assume `x=1` and `p=3(base)`,
- Step 2: Compute; `x mod 5` where `x=x*p` when the binary value is `1` and remains where the binary value is `0`:  `p mod 5` where `p=p^2 `

> Note: 9=1001 in binary

```matlab
A1
>> x=3 mod 5=3
p=9 mod 5=4
A2
>>x remains 3 because the binary value is 0
   p=16 mod 5=1
A3
 >>x remain 3
   p=1 mod 5=1
A4
>> x=3 mod 5=3
   p=1 mod 5=1
Return the last value of x = 3
3^9 mod 5 =3
```

### Modular exponentiation using Python
As we've learned above, modular multiplication allows us to keep the intermediate result at each step. Here's the implementation of a simple repeated multiplication algorithm for computing modular exponents this way:

```python
def modexp_mul(a, b, n):
    r = 1
    for i in xrange(b):
        r = r * a % n
    return r
```

The implementation above is much better than the naive algorithm, but it's pretty slow, requiring b multiplications (and reductions modulo n).

We can apply the modular reduction rule to the more efficient exponentiation algorithms.

```python
def modexp_rl(a, b, n):
    r = 1
    while 1:
        if b % 2 == 1:
            r = r * a % n
        b /= 2
        if b == 0:
            break
        a = a * a % n

    return r
```

The code above has the right-to-left method with modular reductions at each step. We use the same algorithm but reduce every multiplication. So the numbers we deal with here are never very large.

We could as well implement the left-to-right method as shown below:

```python
def modexp_lr(a, b, n):
    r = 1
    for bit in reversed(_bits_of_n(b)):
        r = r * r % n
        if bit == 1:
            r = r * a % n
    return r
```

And with \_bits_of_n being, as before:

```python
def _bits_of_n(n):
    """ Return the list of the bits in the binary
        representation of n, from LSB to MSB
    """
    bits = []

    while n:
        bits.append(n % 2)
        n /= 2

    return bits
```

> Note: Exponentiation and modular exponentiation are one of those applications in which an efficient algorithm is required for feasibility. Using the trivial/naive algorithms is possible only for small cases which aren't very interesting. One needs powerful methods in his toolbox to process realistically large numbers (such as the ones required for cryptographic algorithms).

### Working of Diffie Helman Key Exchange Protocol
As we have discussed, cryptography provides secure end-to-end communication by employing encryption and decryption. The encryption algorithm converts the input (plaintext) into an encrypted output (ciphertext) using a key.

The key must remain secure and unknown to the attacker for the system to stay secure.

A key exchange protocol is used for symmetric cryptosystems to establish the shared key by communicating it over an insecure channel, requiring no previous connections.

For example, if Alice and Bob want to exchange encrypted messages, Alice and Bob will not need to meet in person secretly to share the key. Instead, they can use an insecure channel effectively and share the key using the Diffie-Hellman key exchange protocol (DH protocol).

DH protocol involves exchanging secret/asymmetric keys between sender and receiver using asymmetric encryption (public and private key). It can be abbreviated as DHKE.

#### Steps involved
1. Assume a prime number `Q.`
2. Set `B` a primitive root of `Q.`
   `B < Q.`
3. Assume `Xa` to be the sender's private key and `Xb` to be the receiver's private key.

Public key of John (sender) = `Pa` = B<SUP>Xa</SUP> mod Q<br/>
Public key of Doe (receiver) = `Pb` = B<SUP>Xb</SUP> mod Q

The encryption key on the sender should be equal to that of the receiver, as shown below:

```bash
(KJohn = KDoe = Encryption Key (K) ) where K=key
KJohn = Pb<SUP>Xa</SUP> mod Q
KDoe = Pa<SUP>Xb</SUP> mod Q
```

The security of the DH Protocol relies on the fact that the functions X and Y are one-way. It is computationally infeasible to calculate the corresponding keys for an attacker who knows the leaked values of X and Y.

Although the DH Protocol is safe against passive attackers, it is vulnerable to active attackers who can modify messages and interfere with the shared key.

### Application of DHKE in ElGamal
Diffie-Hellman (DH) is a key agreement algorithm, ElGamal an asymmetric encryption algorithm.

Diffie-Hellman enables two parties to agree on a common shared secret that can be used subsequently in a symmetric algorithm like AES. Neither of the parties can tell beforehand what the secret will be, only that once they are done, they both end up with the same number.

Elgamal involves key generation using DHKE, encryption using the key, and decryption using the private key.

It involves the following components:

#### Key Generation
The key generation process involves the use of the DHKE process as discussed previously, that is:

Let `Q` be 19, and `B` be 10.

Suppose `A` generates a key pair as follows:

`A` chooses `Xa` = 5

Then:

```bash
Pa = 10<sup>5</sup> mod 19 = 3
A's the private key is 5 ;
A's pubic key is {19, 10, 3}.
```

`B` chooses `Xb` = 6

Then `Pb` = 10<sup>6</sup> mod 19 = 11:

```bash
B's private key is 11 ;
B's pubic key is {19, 10, 11}.
```

Ecryption Key:

```bash
KJohn = Pb<SUP>Xa</SUP> mod Q
which is 11<sup>5</sup> mod 19 = 7
KDoe = Pa<SUP>Xb</SUP> mod Q
which is 3<sup>6</sup> mod 19 = 7
KJohn = KDoe = K (Encryption Key)
```

#### Encryption
Assuming `B` wants to send a message that read 17 to `A`.

`M` = 17

Cipher for `CM` = `M K mod Q`, Which is 17\*7 mod 19 = 5

`B` sends 5, the ciphertext, and its public key (5,11) to `A`.

#### Decryption
`A` uses the public key of `B` to recover the key

11<sup>5</sup> mod 19 = 7

To decrypt: M = CM K<SUP>-1</SUP> mod Q:

- Use modular exponentiation to get K<SUP>-1</SUP>, `M `= 7<SUP>-1</SUP> \* 5 mod 19, And 7<SUP>-1</SUP> mod 19 = −8 = 11

Thus: `M` = 11<SUP> 5</SUP> mod 19 = 17

> NOTE Large prime numbers are used to make decryption by unauthorized personnel difficult in polynomial time.

### Implementing DHKE in Python
Now that we've understood the algorithms for key generations using DHKE. Let's proceed and see how we can implement the same using Python programming language.

In your project root, run the following commands to install the Diffie Hellman package:

```bash
pip install pyDHE
```

Output:

```bash
Collecting pyDHE
  Downloading pyDHE-1.0.0-py2.py3-none-any.whl (8.3 kB)
Collecting Crypto
  Downloading crypto-1.4.1-py2.py3-none-any.whl (18 kB)
Collecting Naked
  Downloading Naked-0.1.31-py2.py3-none-any.whl (590 kB)
     |████████████████████████████████| 590 kB 611 kB/s
Collecting shellescape
  Downloading shellescape-3.8.1-py2.py3-none-any.whl (3.1 kB)
Requirement already satisfied: requests in /usr/lib/python3/dist-packages (from Naked->Crypto->pyDHE) (2.22.0)
Requirement already satisfied: pyyaml in /usr/lib/python3/dist-packages (from Naked->Crypto->pyDHE) (5.3.1)
Installing collected packages: Naked, shellescape, Crypto, pyDHE
  WARNING: The script naked is installed in '/home/jumamiller/.local/bin' which is not on PATH.
  Consider adding this directory to PATH or, if you prefer to suppress this warning, use --no-warn-script-location.
  Warning: The scripts crypto and decrypto are installed in '/home/jumamiller/.local/bin' which is not on PATH.
  Consider adding this directory to PATH or, if you prefer to suppress this warning, use --no-warn-script-location.
Successfully installed Crypto-1.4.1 Naked-0.1.31 pyDHE-1.0.0 shellescape-3.8.1
```

Now that we have `pyDHE` ready, let's proceed to implement our Diffie Hellman algorithm:

```python
import pyDHE

john = pyDHE.new()
johnPubKey = john.getPublicKey()
print("John's public key:", hex(johnPubKey))

doe= pyDHE.new()
doePubKey = doe.getPublicKey()
print("Doe public key:", hex(doePubKey))

johnSharedKey = john.update(doePubKey)
print("john shared key:", hex(johnSharedKey))

doeSharedKey = doe.update(johnPubKey)
print("doeshared key:", hex(doeSharedKey))

print("Equal shared keys:", johnSharedKey == doeSharedKey)
```

On execution of the code above, two 2048-bit public keys (for John and Doe) are generated and printed. Assuming that John and Doe have exchanged their public keys. Once John has received Doe's public key, she can calculate the shared secret by combining it with her private key and vice versa. The sample output below shows that the shared secret is always the same number (2048-bit integer):

Output:

```bash
John public key: 0xa26c2f1354a8f58abbf78172730595c4de8277962ebe92100793f99ea80f66abe5e75a14a52e86ce1c086c1ca2e1662b3900510346d848b425d34279ceea92661fb1166b9438589c0b57eb4ebb69e0c3844ebe5ad4c0e316b637d47148d69dc2387c2968c82d198114a6c0f14a605a9e85110d24a9db4f11963b9b13dc788c0538096cadffd258364c63621f6bb1a3e515d3741af4619e62452a394fab9d84be7cee255fdd7216401cafee6471b4adbb77e93f878f1bb4df633e0632522b51fe70fc154e7d3e60a69f815a4e2a84506f05b1ccfce01e873cd7dc51fba0b6eac66af1c0a7500f71af405a6c34ffd27a1239180c22fbddf8dc15d30c821c57307d
Doe public key: 0x822660dfff1af80c237402263dda9e0e417fa04547a4e36041a35a152df28b0ac66b059d9e0034c7cd58b6b7edbc8a20bf1bdc2af6534bd6f2dbcffeb9a4aa9f038461994622f786258beb8f6493594e1559e5ebf5a92ba60335f668a9ccbf8d6d87460f21d94938ac40cfd78d062571f68aa7e7fbabed4ba582e8e831288670004ae64be113a2c7b5b9a472ba4733ea4f29c1b1f30ead3729908d9bb54278a499b2c16cc62d4f330a28cdd302bf655f3d724b6d5b0655c9299ada183d8bed4e98c2f0d93339eb3c22c88c9d000de4ea3286b6be5b96e7d7cccb7b8d6a079264e155c5b25b5aca21ccfed7d21d5dce79845fe5456419504ec9c2a896448572e7
Now exchange the public keys (e.g. through Internet)
John shared key: 0x60d96187ae1db8e8acac7795837a2964e4972ebf666eaecfa09135371a2de5287db18c1a30f2af840f04cac42fea21e42369af5ffbeb235faa42da6bed24cd922ea4637ad146558f2d8b07b19a0084c19f041af5456a5826dd836d0c9c4f32ca0a5877da9493af36f66949e76af12e45a20b20c222a37a49b658066bd7b1f79bcf81d1083e79c62c43e3ee11f8727e798e310a2683939c06b75ab80c531743d6c03c90007ab8a36af45b3573f4e41a2a41c9fdde962493f9ed860597ee527d978e41a413d13198aaac2b27e70aac5be15fd695592350c56b6d74b3427dcf6888ee11cef4b4d8f5b3acbfbda1d9b8d7425bc9446e1a6424a929d9136590161cfe
Doe shared key: 0x60d96187ae1db8e8acac7795837a2964e4972ebf666eaecfa09135371a2de5287db18c1a30f2af840f04cac42fea21e42369af5ffbeb235faa42da6bed24cd922ea4637ad146558f2d8b07b19a0084c19f041af5456a5826dd836d0c9c4f32ca0a5877da9493af36f66949e76af12e45a20b20c222a37a49b658066bd7b1f79bcf81d1083e79c62c43e3ee11f8727e798e310a2683939c06b75ab80c531743d6c03c90007ab8a36af45b3573f4e41a2a41c9fdde962493f9ed860597ee527d978e41a413d13198aaac2b27e70aac5be15fd695592350c56b6d74b3427dcf6888ee11cef4b4d8f5b3acbfbda1d9b8d7425bc9446e1a6424a929d9136590161cfe
Equal shared keys: True
```

> It is essential to note that your output will be different from the output above due to the randomness of the generation.

### Conclusion
In conclusion, it is apparent that security plays a vital role in data communication. Using Diffie Helman and Elgamal encryption algorithms seems to solve the problem of key distribution as the sender and receiver can generate the same key hence throwing key distribution out of the equation.

Happy coding!

---
Peer Review Contributions by: [Miller Juma](/engineering-education/content/authors/miller-juma/)
