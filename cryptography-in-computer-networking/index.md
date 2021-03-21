Author:

Subject:





### Introduction to Cryptography
Cryptography refers to technologies that secure information and communication.
This is achieved by using codes that ensure that the information reaches only the intended recipients. Codes are generated using algorithms and mathematical calculations
 
 

Cryptography is derived from the word "crypt" which means to hide and "graphy" which means to write.

### Objectives of Modern Cryptography
1. Privacy
 
 Cryptography ensures that the information is not understood by any unintended recipients therefore privacy is to be maintained.

 2. Integrity

 Cryptography ensures that information is not interfered with or even interferes with the sender from receiver to receiver in storage or transmission.

 3. Non-redemption
 The creators of information cannot deny their intention to construct the transit of information from a sender to receiver at a later stage of the communication process.

 4. Authenticity

 Cryptography ensures that the sender and recipient of information can identify each other and determine the origin and intended destination of the information.

 ### Cryptography Process

 Cryptography involves the processes of encryption and decryption.
  ![Cryptographic process](https://www.freepik.com/free-photos-vectors/cryptography)
- Encryption

Encryption is the process of manipulating a piece of information that usually occurs in the form of plain text using code or encrypting algorithms before transit. This ensures that the information is converted into a form that the unintentional recipient cannot understand.

The encrypted information is then called ciphertext. The cipher-text is non-readable hence the transit.

![Encryption](https://unsplash.com/s/photos/data-encryption)

- Decryption

Decryption converting cipher-text to plain text. This is done at the receiving end using code and decryption keys. Special software can also be used for decryption using algorithms to crack decryption.

![Decryption](https://www.google.com/search?q=decryption+pictures&sxsrf=ALeKk01yHWyaDCGOf1NuA3sQmpQ5w7JTIg:1616007151195&tbm=isch&source=iu&ictx=1&fir=L9SEM_iojITeyM%252CtHP9fH7arWebsM%252C_&vet=1&usg=AI4_-kTKQRAsOTdmK-KnkhBGUIV8VKQkPw&sa=X&ved=2ahUKEwjr8c3h_7fvAhXKWRUIHS1_Cu0Q9QF6BAgREAE#imgrc=L9SEM_iojITeyM)

### Cryptographic Algorithms

Cryptographic algorithms are processes that cryptocurrency uses to encrypt and decrypt messages to secure communication between devices and applications.

### Cryptography Classes
Three known types of cryptography include:

- Symmetric-key cryptography / secret key cryptography
- hash function -
- Asymmetric / Public-Key Cryptography
### 1. Symmetric-Key Cryptography

 
Symmetric-key cryptography can also be referred to as secret-key cryptography.
 This includes the use of the same secret key for both encryption and decryption. The key is known only to the sender and sender of the message. The sender uses this key to encrypt the message that currently converts it to cipher-text in plain text that is unreadable and passes it on to the recipient. A sender and receiver communicating via symmetric encryption must exchange the key so that it can be used in decryption of the message back to plain text for readability.



There are two types of symmetric encryption:

1. Block Algorithms

Bit lengths of data are encrypted into blocks of electronic data using specific private keys. As the data is being encrypted, the system keeps the data in memory as it waits for the entire block to be loaded before encryption.


2. Stream Algorithms

The data is encrypted because it streams instead of being retained in the system's memory to wait for a complete block. [More](https://en.wikipedia.org/wiki/Stream_cipher)

Some common types of symmetric-key cryptography are: .htm) and [IDEA](https://en.wikipedia.org/wiki/International_Data_Encryption_Algorithm)

AES is a symmetric block cipher that encrypts electronic data specifically to prevent unauthorized access. It consists of three block ciphers; AES-128, AES-192 and AES-256.

### 2. Asymmetric Cryptography


It can also be called public cryptography
Public-key cryptography uses two keys, which are a public and a private key.
The public key can be freely distributed while the private key remains a mystery.

The public key is used for cipher-text encryption of plaintext, while the private key is used for decryption of cipher-text into plain-text.

Some types of public-key cryptography include [RSA](https://www.tutorialspoint.com/cryptography_with_python/cryptography_with_python_understanding_rsa_algorithm.htm), the elliptic curve digital signature algorithm.
 ]

Revrest-Shamir-Adleman is the safest method of data encryption. Its keys are usually 1024 or 2048 bits long. RSA is public-key cryptography, so uses both public and private keys for data encryption and decryption, respectively.

Keys for the RSA algorithm are generated in the following [example](https://www.geeksforgeeks.org/how-to-solve-rsa-algorithm-problems/):

- Pick two different large random numbers i and j ..... The numbers must be kept secret.

- Compute n = ij ... where n is the modulus for the public and private keys.

- Calculation totient: Ø(n)=(i-1)(j-1)

- Select the integer e, such as 1 <e<Ø(n) where e Ø (n) is from the co-prime, so e is the public key exponent.
- Total Count: Total (N) = (I-1) (J-1
          
- Pick two different large random numbers i and j ..... Numbers should be kept secret.

- Compute k to satisfy the computation relation ≡1 (mod n (n)) i.e: ke = 1 + x = (n) for some integer x

- Calculate k = (1 + xØ (n)) / e to be an integer.
          Where k is the private key exponent
          

### 3. Hashing work

 Hash functions typically map data of arbitrary size to fixed-size values. The return value of the hash function is called the hash value. These values ​​make a table of a certain size known as a hash table. Hash functions do not use any key. These functions are also used for password encryption.
 

Some types of cryptographic hash functions include [MD5](https://en.wikipedia.org/wiki/MD5#:~:text=The%20MD5%20message%2Ddigest%20algorithm,to%20suffer%20from%20extensive%20vulnerabilities.).

MD5 is the fifth version of the message digest algorithm. The MD5 produces 128 bit output. This was a commonly used hashing algorithm until some vulnerabilities began to appear so the MD5 was gradually dealt with.

### Cryptography concerns
Cryptography can be bypassed by botnets which can then hack into data encryption and decryption computers and exploit vulnerable applications.

Due to [quantum computing's](https://en.wikipedia.org/wiki/Quantum_computing#:~:text=Quantum%20computing%20is%20the%20use,are%20known%20as%20quantum%20computers.) processing power,  concerns have increased due to calls by the National Institute of Standards and Technology for papers among the mathematics and science community for new asymmetric cryptography.

### Conclusion

Technically, cryptography is the answer to all computer network security issues that continue to surface on the Internet. This technology is showing promising results in dealing with the insecurity of confidential information during storage and during transit. However, issues like algorithms allegedly not being safe and algorithm [patency](https://www.wto.org/english/tratop_e/trips_e/intel1_e.htm#:~:text=Intellectual%20property%20rights%20are%20the,a%20certain%20period%20of%20time.) have limiting  the spread of cryptography.

