---
layout: engineering-education
status: publish
published: true
url: /implementing-aes-encryption-and-decryption-in-java/
title: Implementing AES Encryption And Decryption In Java
description: This tutorial will take the reader through the process of encrypting and decrypting data using the Advanced Encryption Standard method. We will also implement the algorithm in Java.
author: geoffrey-omukuba
date: 2022-02-25T00:00:00-03:20
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/implementing-aes-encryption-and-decryption-in-java/hero.png
    alt: Implementing AES Encryption And Decryption In Java Hero Image
---
Data encryption is an important feature in data protection. There are various methods used to encrypt and decrypt data to enhance the safety of data transmitted.
<!--more-->
In this article, we will look at AES as a method of data encryption and decryption. AES, `Advanced Encryption Standard` is a block ciphertext encryption and decryption algorithm that processes a block of 128 bits of data using secret keys of 128, 192, or 256 bits.

We will also discuss how this algorithm can be implemented using the Java programming language.

### Table of contents
- [Table of contents](#table-of-contents)
- [Prerequisites](#prerequisites)
- [An overview of AES algorithm](#an-overview-of-aes-algorithm)
- [Java imports](#java-imports)
- [AES implementation in Java](#aes-implementation-in-java)
- [Encryption](#encryption)
- [Decryption](#decryption)
- [Encoding and decoding](#encoding-and-decoding)
- [Java main method](#java-main-method)
- [Conclusion](#conclusion)

### Prerequisites
For a better understanding of this article, you will need:
- Java development environment, that is, [IntelliJ IDEA](https://www.jetbrains.com/idea/download/?source=google&medium=cpc&campaign=9736964638&gclid=Cj0KCQiAubmPBhCyARIsAJWNpiNOwE9JwyLDkoU1GpO5pX7drlhJMi3417AGha6fh1oudpCIhXUNTj0aAiOoEALw_wcB#section=windows).
- Basic knowledge of [Java](https://www.tutorialspoint.com/java/index.htm).

### An overview of AES algorithm
`AES` is a 128-bit symmetric block ciphertext. This algorithm uses substitution and permutations; known as the `SP networks`. It consists of multiple texts to produce a ciphertext. AES performs its calculations in the form of byte data instead of bit data.

This means that AES treats 128 bits of a clear text block as 16 bytes. The number of rounds during the encryption process depends on the key size being used. For example:
- The 128-bit key size uses 10 rounds.
- The 192-bit key size uses 12 rounds.
- The 256-bit key size uses 14 rounds.

Data to be encrypted is stored in a 4 by 4 matrix format called the state array. Each output takes a state array as input and gives a similar array as output.

In a 16-bytes matrix, each cell represents 1-byte, this means that four cells which is the equivalent of four bytes represent one word, implying that each state array has four words.

### Java imports
In our program to create the AES algorithm, we will import the following Java packages:

```Java
import javax.crypto.Cipher;
import javax.crypto.KeyGenerator;
import javax.crypto.SecretKey;
import javax.crypto.spec.GCMParameterSpec;
import java.util.Base64;
```

### AES implementation in Java
In this section, we will be implementing AES in Java language. We will start by creating a Java class and name it `AES_ENCRYPTION`. In our class, we will create an `init` method. This method will create the encryption keys.

In this method, using a key generator, we will generate one key. We will get the key generator instance of `AES` and assign it to `keyGenerator`. We are then required to initialize the key size. The key sizes values can be 128, 192 or 256 bytes.

For this guide, we shall be using a key size value of 128 bytes.

The code below can be used to implement this:

```java
public class AES_ENCRYPTION {
    private SecretKey key;
    private final int KEY_SIZE = 128;
    private final int DATA_LENGTH = 128;
    private Cipher encryptionCipher;

    public void init() throws Exception {
        KeyGenerator keyGenerator = KeyGenerator.getInstance("AES");
        keyGenerator.init(KEY_SIZE);
        key = keyGenerator.generateKey();
    }
```

### Encryption
Now that we have initialized our keys, we will start encrypting. First, we will create an `encrypt` method and pass in the data that is to be encrypted.

Then we guess the byte array from this message, create an encryption cipher and get its instance.

Next, we initialize the encryption cipher with the `init` method, using the `Cipher.ENCRYPT_MODE` and pass in a parameter which is the key that we have generated.

Finally, we create a method `encryptionCipher` that will return a byte array of the encrypted data. The encrypt method returns the encrypted data in bytes:

```java
public String encrypt(String data) throws Exception {
        byte[] dataInBytes = data.getBytes();
        encryptionCipher = Cipher.getInstance("AES/GCM/NoPadding");
        encryptionCipher.init(Cipher.ENCRYPT_MODE, key);
        byte[] encryptedBytes = encryptionCipher.doFinal(dataInBytes);
        return encode(encryptedBytes);
    }
```

### Decryption
To decrypt the data we encrypted in the encrypt method above, we will create the decrypt method and pass in the encrypted data as parameters. We also need to convert our data to a byte array again and decode it since we encoded it during encryption.

We will then create a decryption cipher and get its instance of the AES algorithm. We then initialize the decryption cipher with the `init` method using the decrypt mode. This takes the same key that was used in encryption as parameters.

Afterwards, we can get our bytes array from the decrypted bytes from the `decryptionCipher.doFinal()` method, and return the new string of the decrypted bytes. We will use the code below:

```java
 public String decrypt(String encryptedData) throws Exception {
        byte[] dataInBytes = decode(encryptedData);
        Cipher decryptionCipher = Cipher.getInstance("AES/GCM/NoPadding");
        GCMParameterSpec spec = new GCMParameterSpec(DATA_LENGTH, encryptionCipher.getIV());
        decryptionCipher.init(Cipher.DECRYPT_MODE, key, spec);
        byte[] decryptedBytes = decryptionCipher.doFinal(dataInBytes);
        return new String(decryptedBytes);
    }
```

### Encoding and decoding
To convert our data into a string, we will use a private method called `encode` and `decode` that will take in the bytes array and returns to `BASE64`. We will use the code below for both encoding and decoding:

```java
private String encode(byte[] data) {
        return Base64.getEncoder().encodeToString(data);
    }

    private byte[] decode(String data) {
        return Base64.getDecoder().decode(data);
    }
```

### Java main method
From the steps above, we have the encryption and the decryption algorithm. Now the main thing to do to make sure that our algorithm is working properly is implementing the two methods in the main method.

In main method, we will put everything in the `try`...`catch` block. In this method, we will initialize our algorithm, initialize the variable that will be used to hold the encrypted message and the decrypted data, and pass in the data to be decrypted.

The last task in our program is to print out the data and the decrypted data in our terminal. The code snippet below is used in the main method:

```java
public static void main(String[] args) {
        try {
            AES_ENCRYPTION aes_encryption = new AES_ENCRYPTION();
            aes_encryption.init();
            String encryptedData = aes_encryption.encrypt("Hello, welcome to the encryption world");
            String decryptedData = aes_encryption.decrypt(encryptedData);

            System.out.println("Encrypted Data : " + encryptedData);
            System.out.println("Decrypted Data : " + decryptedData);
        } catch (Exception ignored) {
        }
    }
}
```

### Conclusion
With Java cryptography, it is easy to develop an algorithm that can be used to protect our data from unauthorized access. This is enabled by the Java packages that allows the user to import and develop an algorithm that they can use.

For example, in this tutorial, with the use of appropriate Java packages, we have developed an AES algorithm to protect our data.

Happy coding!

---
Peer Review Contributions by: [Monica Masae](/engineering-education/authors/monica-masae/)
