---
layout: engineering-education
status: draft
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
Security plays a crucial role in data communication and data protection. It helps prevent unauthorized access to confidential information which may lead to data loss and data modification by unknown people making data transferred safe and unchanged.
<!--more-->
This article will cover how one can understand various asymmetric encryption algorithms: Diffie Helman and Elgamal to protect data transferred from sender to receiver. It will equip the learner with the knowledge of how to encrypt and decrypt data send together with how to generate the encryption and decryption keys.

### Table of contents
   - [Prerequisite](#prerequisite)
   - [Asymmetric Encryption.](#asymmetric-encryption)
   - [Modular Exponential](#modular-exponential)
   - [Modular Exponential Using Python](#modular-exponential-using-python)
   - [Working of DHKE Protocol](#working-of-dhke-protocol)
      - [steps involved](#steps-involved)
   - [Application of DHKE in ElGamal](#application-of-dhke-in-elgamal)
      - [Key Generation](#key-generation)
      - [Encryption](#encryption)
      - [Decryption](#decryption)
   - [Conclusion](#conclusion)

### Prerequisite
To follow along, the reader should:
- Have a basic understanding of security concepts.
- Have a prior understanding of modular arithmetic.
- Know how to use various development environments for writing and running python code.
### Asymmetric Encryption.
Is also known as public-key encryption.
Encryption involves enciphering information in transit from authorized persons and deciphering by authorized persons using keys.
Asymmetric encryption uses two keys:
public-key- which is the encryption key and is known to everyone in the network.
private key- which decryption key is known to only the receiver of the content.
Asymmetric encryption is used to curb the problem facing symmetric encryption.
this includes:
1. Key distribution - Key distribution under symmetric encryption requires
either
* That two communicants already share a key which somehow has been distributed to them
* The use of a Key Distribution Center. This requirement negated the very essence of cryptography, that is, the ability to maintain total secrecy over your communication.
If their users were forced to share their keys with a Key Distribution Center, it could be compromised by either burglary or subpoena.
2. Public key encryption also has an added advantage of creation and verification of the digital signature
* If the use of cryptography was to become widespread, not just in military situations but for commercial and private purposes, then electronic messages and documents would need the equivalent of signatures used in paper documents.

Asymmetric algorithms rely on one key for encryption and a different but related key for decryption. These algorithms have the following important characteristic:
1. It is computationally infeasible to determine the decryption key given only knowledge of the cryptographic algorithm and the encryption key.
2. Either of the two related keys can be used for encryption, with the other used for decryption.

![Asymmetric encryption.](/\engineering-education\content\articles\understanding-diffie-helman-and-elgamal-asymmetric-encryption/asymmetric-encryption.png)

### Modular Exponential
In cryptography, it is important to be able to find the modulus of p^e mod m when p,e, and m are very large integers. It is very hard to compute p^e then divide by m and find the remainder because p^e is a huge number.
This can be done using an algorithm that employs the binary expansion of the exponent of e.
Reduce the value given using the binary form of e and in each step compute the modulus of the value.
**Example:**
To compute 3^9, we have that 9 in binary is 1001 so that 3^9=3^8.3^1
By successively squaring, we find that3^2=9,3^4=9^2=81 and 3^8=81^2=6561
Consequently,
Since 3^9=3^8.3^1 which equals 6561.3=19,683
To work out the modulus of 3^9 mod 5
**Solution:**
Assume x=1 and p=3(base)
compute x mod 5 where x=x*p where the binary value is 1 and it remains where the value same is 0
and p mod 5 where p=p^2
9=1001  (binary)

```
A1 
>> x=3 mod 5=3
p=9 mod 5=4

A2 
>>x remains 3 because the binary value is 0<br>
   p=16 mod 5=1<br><br>

A3
 >>x remain 3<br>
   p=1 mod 5=1<br><br>

A4
>> x=3 mod 5=3<br>
   p=1 mod 5=1<br><br>

Return the last value of x = 3<br>
3<SUP>9</SUP> mod 5 =3
```
### Modular Exponential Using Python
```python
#Input three numbers.
x = int(input("Enter First Value :"))
y = int(input("Enter Second Value :"))
z= (int)(1e9+7) # to compute some very, very large number 

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
#### steps involved
1. Assume a prime number Q
2. Set B a primitive root of Q
 B < Q
3. Assume Xa to be the private key of the sender and Xb to be the private key of the receiver. 

Public key of A (sender) = Pa = B<SUP>Xa</SUP> mod Q
Public key of B (receiver) = Pb = B<SUP>Xb</SUP> mod Q

The encryption key on the sender should be equal to that of the receiver (Ka = Kb = Encryption Key (K) )
Ka = Pb<SUP>Xa</SUP> mod Q
Kb = Pa<SUP>Xb</SUP> mod Q 

### Application of DHKE in ElGamal
It's an asymmetric key encryption algorithm.
It involves key generation using DHKE, encryption using the key, and decryption using the private key.

![Illustration of DHKE key agreement using colors.](/\engineering-education\content\articles\understanding-diffie-helman-and-elgamal-asymmetric-encryption/Diffie-Helman.png)
*[Image Source: Wikipedia](https://www.google.com/url?sa=i&url=https%3A%2F%2Fen.wikipedia.org%2Fwiki%2FDiffie%25E2%2580%2593Hellman_key_exchange&psig=AOvVaw1NIqEyjjySTC7rZb5GimUv&ust=1632470050062000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCIjF0KTPlPMCFQAAAAAdAAAAABAD)*

*It involves:*
#### Key Generation
* The key generation process involves the use of the DHKE process mentioned above
let Q be 19 and B be 10 
Suppose A generates a key pair as follows:

* A chooses Xa = 5
Then Pa = 10<sup>5</sup> mod 19 = 3
A's the private key is 5 ; 
A’s pubic key is {19, 10, 3}.

* B chooses Xb = 6
Then Pb = 10<sup>6</sup> mod 19 = 11
B's private key is 11 ; 
B’s pubic key is {19, 10, 11}.

* Ecryption Key
Ka = Pb<SUP>Xa</SUP> mod Q
which is 11<sup>5</sup> mod 19 = 7
Kb = Pa<SUP>Xb</SUP> mod Q
which is 3<sup>6</sup> mod 19 = 7
Ka = Kb = K (Encryption Key)

#### Encryption
Assuming B wants to send a message that read 17 to A
M = 17
Cipher for CM = M K mod Q
Which is 17*7 mod 19 = 5
B send 5 the ciphertext and its public key (5,11) to A

#### Decryption
A uses the public key of B to recover the key
11<sup>5</sup> mod 19 = 7
To decrypt: M = CM K<SUP>-1</SUP> mod Q
* Use modular exponetion to get K<SUP>-1</SUP>
M = 7<SUP>-1</SUP> * 5 mod 19
And 7<SUP>-1</SUP> mod 19 = −8 = 11
Thus:<br>
M = 11<SUP> 5</SUP> mod 19 = 17

>NOTE Large prime numbers are used to make decryption by unauthorized personnel difficult in polynomial time.

### Conclusion
As discussed above it's clear that security plays an important role in the sender-receiver communication using Diffie Helman and Elgamal encryption algorithms since the algorithms solve the problem of key distribution as the same key can be generated by the sender and receiver.

More information about asymmetric encryption can be found [here](https://cryptography.io/en/latest/hazmat/primitives/asymmetric/)

---
 Peer Review Contributions by: [Lalithnarayan C](/engineering-education/authors/lalithnarayan-c/)
