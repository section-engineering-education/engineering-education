---
layout: engineering-education
status: true
published: false
url: /understanding-diffie-helman-and-elgamal-asymmetric-encryption/
title: Understanding Diffie Helman and Elgamal Asymmetric Encryption
description: This tutorial will help the reader understand the concept of Diffie Helman and Elgamal Asymmetric encryption algorithms together with key generation,encryption and decryption process.
date: 2021-09-05T00:00:00-02:00 
topics: [Security]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/understanding-diffie-helman-and-elgamal-asymmetric-encryption/hero.jpg
    alt: Encryption Example Image
---
Security plays a crucial role in data communication and data protection. It helps prevent unauthorized access to confidential information, which may lead to data loss and data modification by unknown people making data transferred safe and unchanged.
<!--more-->
This article will cover how one can understand various asymmetric encryption algorithms: Diffie Helman and Elgamal to protect data transferred from sender to receiver. Furthermore, it will equip the learner with the knowledge of how to encrypt and decrypt data send together with generating the encryption and decryption keys.

### Table of contents
   - [Prerequisites](#prerequisites)
   - [Objectives](#objectives)
   - [Asymmetric Encryption.](#asymmetric-encryption)
   - [Modular Exponential](#modular-exponential)
   - [Modular Exponential Using Python](#modular-exponential-using-python)
   - [Working of DHKE Protocol](#working-of-dhke-protocol)
      - [Steps involved](#steps-involved)
   - [Application of DHKE in ElGamal](#application-of-dhke-in-elgamal)
      - [Key Generation](#key-generation)
      - [Encryption](#encryption)
      - [Decryption](#decryption)
   - [Implementing DHKE in Python](#Implementing DHKE in Python)
   - [Conclusion](#conclusion)

### Prerequisites
To follow along, the reader should:
- Have a basic understanding of security concepts.
- Have a prior understanding of modular arithmetic.
- Know how to use various development environments for writing and running python code.

### Objectives
By the end of this article, the reader should have basic understandings of generating keys using Diffie-Hellman algorithms and encryption and decryption using Elgamal.

### Asymmetric Encryption
Asymmetric encryption, also known as `public-key encryption`, involves enciphering information in transit from authorized persons and deciphering by authorized persons using keys.
These keys include:
- Public key- which is the encryption key and is known to everyone in the network.
- Private key- which is the decryption key known to only the receiver of the message.

This encryption is used to curb the various problem facing symmetric encryption, which includes:
1. Key distribution.
 Key distribution under symmetric encryption requires either:
   - That two communicants already share a key which somehow has been distributed to them
   - The use of a Key Distribution Center. This requirement negated the very essence of cryptography, that is, the ability to maintain total secrecy over your communication.
   If their users were forced to share their keys with a Key Distribution Center, it could be compromised by either burglary or subpoena.
2. Creation and verification of the digital signature
   - If the use of cryptography were to become widespread, not just in military situations but for commercial and private purposes, then electronic messages and documents would need the equivalent of signatures used in paper documents.

>Asymmetric algorithms rely on one key for encryption and a different but related key for decryption.
These algorithms have the following important characteristic:
1. It is computationally infeasible to determine the decryption key, given only knowledge of the cryptographic algorithm and the encryption key.
2. The two related keys can be used for encryption, with the other used for decryption.

![Asymmetric encryption.](/\engineering-education\content\articles\understanding-diffie-helman-and-elgamal-asymmetric-encryption/asymmetric-encryption.png)

### Modular Exponential
In cryptography, it is important to find the modulus of p<sup>e</sup> mod m when p,e, and m are very large integers. It is very hard to compute p<sup>e</sup> then divide by m and find the remainder because p<sup>e</sup> is a huge number.

The computation can be done using an algorithm that employs the binary expansion of the exponent of e.
Reduce the value given using the binary form of e and compute the modulus of the value in each step.
**Example:**
To compute 3^9, we have that 9 in binary is 1001 so that 3^9=3^8.3^1
By successively squaring, we find that3^2=9,3^4=9^2=81 and 3^8=81^2=6561
Consequently,
Since 3^9=3^8.3^1, which equals 6561.3=19,683
To work out the modulus of 3^9 mod 5
**Solution:**
Assume x=1 and p=3(base)
compute x mod 5 where x=x*p where the binary value is 1 and it remains where the value same is 0
and p mod 5 where p=p^2
9=1001  (binary)

```matlab
A1 
>> x=3 mod 5=3
p=9 mod 5=4
A2 
>>x remains 3 because the binary value is 0<br>
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

### Modular Exponential Using Python
```python
#Input three numbers.
x = int(input("Enter First Value :"))
y = int(input("Enter Second Value :"))
z = (int)(1e9+7) # to compute some very, very large number 
# power function use
d = power(x, y) % z 
print ("Value Is =",d) 
```
*Output*
Enter First Value : 2
Enter Second Value : 3
Value  = 8

### Working of DHKE Protocol
It involves exchanging secret/asymmetric keys between sender and receiver by using asymmetric encryption(public and private key)

#### Steps involved
1. Assume a prime number `Q`
2. Set `B` a primitive root of `Q`
 `B < Q`
3. Assume `Xa` to be the sender's private key and `Xb` to be the receiver's private key. 

Public key of John (sender) = `Pa` = B<SUP>Xa</SUP> mod Q
Public key of Doe (receiver) = `Pb` = B<SUP>Xb</SUP> mod Q

The encryption key on the sender should be equal to that of the receiver as shown below:

```properties

(KJohn = KDoe = Encryption Key (K) ) where K=key
KJohn = Pb<SUP>Xa</SUP> mod Q
KDoe = Pa<SUP>Xb</SUP> mod Q 

```

### Application of DHKE in ElGamal
It's an asymmetric key encryption algorithm.
It involves key generation using DHKE, encryption using the key, and decryption using the private key.

![Illustration of DHKE key agreement using colors.](/\engineering-education\content\articles\understanding-diffie-helman-and-elgamal-asymmetric-encryption/Diffie-Helman.png)
*[Image Source: Wikipedia](https://www.google.com/url?sa=i&url=https%3A%2F%2Fen.wikipedia.org%2Fwiki%2FDiffie%25E2%2580%2593Hellman_key_exchange&psig=AOvVaw1NIqEyjjySTC7rZb5GimUv&ust=1632470050062000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCIjF0KTPlPMCFQAAAAAdAAAAABAD)*

It involves:

#### Key Generation
The key generation process involves the use of the DHKE process mentioned above, that is:

Let `Q` be 19, and `B` be 10.
Suppose `A` generates a key pair as follows:
- `A` chooses `Xa` = 5

Then,
```properties
Pa = 10<sup>5</sup> mod 19 = 3
A's the private key is 5 ; 
A's pubic key is {19, 10, 3}.
```


- `B` chooses `Xb` = 6
Then `Pb` = 10<sup>6</sup> mod 19 = 11
```properties
B's private key is 11 ; 
B's pubic key is {19, 10, 11}.
````

- Ecryption Key
```properties
KJohn = Pb<SUP>Xa</SUP> mod Q
which is 11<sup>5</sup> mod 19 = 7
KDoe = Pa<SUP>Xb</SUP> mod Q
which is 3<sup>6</sup> mod 19 = 7
KJohn = KDoe = K (Encryption Key)
```

#### Encryption
Assuming `B` wants to send a message that read 17 to `A.`
`M` = 17
Cipher for `CM` = `M K mod Q`
Which is 17*7 mod 19 = 5
`B` send 5 the ciphertext and its public key (5,11) to `A`

#### Decryption
A uses the public key of B to recover the key
11<sup>5</sup> mod 19 = 7
To decrypt: M = CM K<SUP>-1</SUP> mod Q:
- Use modular exponetion to get K<SUP>-1</SUP>
`M `= 7<SUP>-1</SUP> * 5 mod 19
And 7<SUP>-1</SUP> mod 19 = −8 = 11
Thus:
`M` = 11<SUP> 5</SUP> mod 19 = 17

>NOTE Large prime numbers are used to make decryption by unauthorized personnel difficult in polynomial time.

### Implementing DHKE in Python
Now that we've understood the algorithms for key generations using DHKE.
Let's proceed and see how we can implement the same using Python.

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
  WARNING: The scripts crypto and decrypto are installed in '/home/jumamiller/.local/bin' which is not on PATH.
  Consider adding this directory to PATH or, if you prefer to suppress this warning, use --no-warn-script-location.
Successfully installed Crypto-1.4.1 Naked-0.1.31 pyDHE-1.0.0 shellescape-3.8.1

```

Now that we've `pyDHE` ready, let's proceed and implement our Diffie Hellman agorithm:

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

When you run code above, it will generate and print two 2048-bit public keys (for John and for Doe). Assume that John and Doe have exchanged their public keys (e.g. send them to each other through Internet). Once John has received Doe's public key, she can calculate the shared secret by combining it to her private key. 

Respectively, once Doe has received John's public key, he can calculate the shared secret by combining it to his private key. The sample output from the above example shows that the shared secret is always the same number (2048-bit integer):

Output:
```bash
John public key: 0xa26c2f1354a8f58abbf78172730595c4de8277962ebe92100793f99ea80f66abe5e75a14a52e86ce1c086c1ca2e1662b3900510346d848b425d34279ceea92661fb1166b9438589c0b57eb4ebb69e0c3844ebe5ad4c0e316b637d47148d69dc2387c2968c82d198114a6c0f14a605a9e85110d24a9db4f11963b9b13dc788c0538096cadffd258364c63621f6bb1a3e515d3741af4619e62452a394fab9d84be7cee255fdd7216401cafee6471b4adbb77e93f878f1bb4df633e0632522b51fe70fc154e7d3e60a69f815a4e2a84506f05b1ccfce01e873cd7dc51fba0b6eac66af1c0a7500f71af405a6c34ffd27a1239180c22fbddf8dc15d30c821c57307d
Doe public key: 0x822660dfff1af80c237402263dda9e0e417fa04547a4e36041a35a152df28b0ac66b059d9e0034c7cd58b6b7edbc8a20bf1bdc2af6534bd6f2dbcffeb9a4aa9f038461994622f786258beb8f6493594e1559e5ebf5a92ba60335f668a9ccbf8d6d87460f21d94938ac40cfd78d062571f68aa7e7fbabed4ba582e8e831288670004ae64be113a2c7b5b9a472ba4733ea4f29c1b1f30ead3729908d9bb54278a499b2c16cc62d4f330a28cdd302bf655f3d724b6d5b0655c9299ada183d8bed4e98c2f0d93339eb3c22c88c9d000de4ea3286b6be5b96e7d7cccb7b8d6a079264e155c5b25b5aca21ccfed7d21d5dce79845fe5456419504ec9c2a896448572e7
Now exchange the public keys (e.g. through Internet)
John shared key: 0x60d96187ae1db8e8acac7795837a2964e4972ebf666eaecfa09135371a2de5287db18c1a30f2af840f04cac42fea21e42369af5ffbeb235faa42da6bed24cd922ea4637ad146558f2d8b07b19a0084c19f041af5456a5826dd836d0c9c4f32ca0a5877da9493af36f66949e76af12e45a20b20c222a37a49b658066bd7b1f79bcf81d1083e79c62c43e3ee11f8727e798e310a2683939c06b75ab80c531743d6c03c90007ab8a36af45b3573f4e41a2a41c9fdde962493f9ed860597ee527d978e41a413d13198aaac2b27e70aac5be15fd695592350c56b6d74b3427dcf6888ee11cef4b4d8f5b3acbfbda1d9b8d7425bc9446e1a6424a929d9136590161cfe
Doe shared key: 0x60d96187ae1db8e8acac7795837a2964e4972ebf666eaecfa09135371a2de5287db18c1a30f2af840f04cac42fea21e42369af5ffbeb235faa42da6bed24cd922ea4637ad146558f2d8b07b19a0084c19f041af5456a5826dd836d0c9c4f32ca0a5877da9493af36f66949e76af12e45a20b20c222a37a49b658066bd7b1f79bcf81d1083e79c62c43e3ee11f8727e798e310a2683939c06b75ab80c531743d6c03c90007ab8a36af45b3573f4e41a2a41c9fdde962493f9ed860597ee527d978e41a413d13198aaac2b27e70aac5be15fd695592350c56b6d74b3427dcf6888ee11cef4b4d8f5b3acbfbda1d9b8d7425bc9446e1a6424a929d9136590161cfe
Equal shared keys: True
```

>It's important to note that your output will be different from the above output due to the randomness of generation.
### Conclusion
As discussed above, it's clear that security plays an important role in the sender-receiver communication using Diffie Helman and Elgamal encryption algorithms since the algorithms solve the problem of key distribution as the sender and receiver can generate the same key.
