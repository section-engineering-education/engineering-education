---
layout: engineering-education
status: publish
published: true
url: /encrypt-decrypt-using-rijndael-key-in-c-sharp/
title: Encrypt/Decrypt using Rijndael Key in C#
description: This tutorial will help the reader to encrypt & decrypt using Rijndael key in C#.
author: betty-korir
date: 2022-06-08T00:00:00-09:00
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/encrypt-decrypt-using-rijndael-key-in-c-sharp/hero.jpg
    alt: Encrypt/Decrypt Rijndael Key in C# Hero Image
---
Data encryption standard (DES) had a significant security crisis making the invention of a more intense encryption tool necessary. The security status led to the development of Rijndael Key by Vincent Rijmen and Joan Daemen, who were cryptologists from Belgium.
<!--more-->
Rijndael is a block cipher that uses a symmetric key encryption technique. It employs three discrete and invertible layers: `Linear Mix Transform`, `Non-linear Transform`, and `Key Addition Transform`.

In C#, Rijndael Key supports key lengths of 128, 192, and 256 bits and blocks of 128 (default), 192, and 256 bits. In this tutorial, we will discuss encrypting and decrypting a file using `AES/Rijndael Key` and its importance.

### Table of contents
- [Introduction](#introduction)
- [Table of contents](#table-of-contents)
- [Why encrypt and decrypt data?](#why-encrypt-and-decrypt-data)
- [Encrypting and decrypting a string](#encrypting-and-decrypting-a-string)
  - [Encryption](#encryption)
  - [Decryption](#decryption)
- [Adding encryption to a project in C#](#adding-encryption-to-a-project-in-c)
- [Using encryption and decryption program](#using-encryption-and-decryption-program)
- [Asymmetric and symmetric encryption](#asymmetric-and-symmetric-encryption)
- [Conclusion](#conclusion)
- [Further reading](#further-reading)

###  Why encrypt and decrypt data?
Below are reasons why we should encrypt and decrypt data:
1. These are critical communication measures designed to ensure correct receiving and information processing.
2. Data confidentiality is achieved through encryption.
3. A file owner can give or deny access to private data allowing for transmission of confidential data.
4. Decryption allows the conversion of encrypted data to the original information as long as the decryptor has the original key.

### Encrypting and decrypting a string
In C#, a string combines Unicode in sequence. `CreateEncryptor` function and AES managed class provides methods for encrypting a string.

We will encrypt the word `section engineering education` and then decrypt it.

#### Encryption

```C#
using System.IO;
using System.Security.Cryptography;
using System.Text;

namespace string_encryption
{
    public static class Encryption
    {
        public static string Encode()
        {
            try
            {
                string ourText = "section engineering education";
                string Return = null;
                string _key = "abcdefgh";
                string privatekey = "hgfedcba";
                byte[] privatekeyByte = { };
                privatekeyByte = Encoding.UTF8.GetBytes(privatekey);
                byte[] _keybyte = { };
                _keybyte = Encoding.UTF8.GetBytes(_key);
                byte[] inputtextbyteArray = System.Text.Encoding.UTF8.GetBytes(ourText);
                using (DESCryptoServiceProvider dsp = new DESCryptoServiceProvider())
                {
                    var memstr = new MemoryStream();
                    var crystr = new CryptoStream(memstr, dsp.CreateEncryptor(_keybyte, privatekeyByte), CryptoStreamMode.Write);
                    crystr.Write(inputtextbyteArray, 0, inputtextbyteArray.Length);
                    crystr.FlushFinalBlock();
                    return Convert.ToBase64String(memstr.ToArray());
                }
                return Return;
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }
        static void Main(string[] args)
        {
            string doneencryption = Encode();
            Console.Write(doneencryption);
        }
    }
}
```
Output:

```bash
bIwl1Y/220KPke+MzXxKErqBT5jkOEbDJnVEPxCzs7I=
```

In the preceding example, the string `section engineering education` undergoes encryption using the public and secret keys, and `bIwl1Y/220KPke+MzXxKErqBT5jkOEbDJnVEPxCzs7I=` is returned as the encrypted string.

#### Decryption
Decryption involves the conversion of ciphertext back to original data for authorized access. `CreateDecryptor()` function uses a key to decrypt data. String keys are passed through `CreateEncryptor()` function as shown in the code below:

```C#
using System.IO;
using System.Text;
using System.Security.Cryptography;
namespace string_decryption
{
    public static class Decryption
    {
        public static string Decode()
        {
            try
            {
                string ourText = "bIwl1Y/220KPke+MzXxKErqBT5jkOEbDJnVEPxCzs7I=";
                string x = null;
                string _key = "abcdefgh";
                string privatekey = "hgfedcba";
                byte[] privatekeyByte = { };
                privatekeyByte = Encoding.UTF8.GetBytes(privatekey);
                byte[] _keybyte = { };
                _keybyte = Encoding.UTF8.GetBytes(_key);
                byte[] inputtextbyteArray = new byte[ourText.Replace(" ", "+").Length];
                //This technique reverses base64 encoding when it is received over the Internet.
                inputtextbyteArray = Convert.FromBase64String(ourText.Replace(" ", "+"));
                using (DESCryptoServiceProvider dEsp = new DESCryptoServiceProvider())
                {
                    var memstr = new MemoryStream();
                    var crystr = new CryptoStream(memstr, dEsp.CreateDecryptor(_keybyte, privatekeyByte), CryptoStreamMode.Write);
                    crystr.Write(inputtextbyteArray, 0, inputtextbyteArray.Length);
                    crystr.FlushFinalBlock();
                    return Encoding.UTF8.GetString(memstr.ToArray());
                }
                return x;
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }
        static void Main(string[] args)
        {
            string donedecrypting = Decode();
            Console.Write(donedecrypting);
        }
    }
}
```
Output:

```bash
section engineering education
```

The encrypted string `bIwl1Y/220KPke+MzXxKErqBT5jkOEbDJnVEPxCzs7I=` is converted into its original meaning `section engineering education` using `publickey` and `secretkey` keys.

`Symmetric Cryptography Algorithms` are used in data encryption and decryption. Symmetric Cryptography Algorithms use one key and store large data volumes, thus appropriate for DES and Rijndael platforms. 

`Asymmetric keys` use two keys for encryption and decryption, i.e., private and public keys. The public key encrypts data, whereas the private key decrypts data. `RSA` and `digital` signatures are a few examples of asymmetric encryption using asymmetric keys.

### Adding encryption to a project in C#
In the following illustrations, we will learn how to add encryption to a C# project or any. NET platform. The example below shows how easy it is to use the functions provided.  

Encryption formula:

```C#
textBoxEncrypted.Text = Encrypt.EncryptString(textBoxString.Text, textBoxPassword.Text);
```

The formula for decryption:

```C#
textBoxString.Text = Encrypt.DecryptString(textBoxEncrypted.Text, textBoxPassword.Text);
```

### Using encryption and decryption program
The Rijndael algorithm is used to build a durable (i.e., non-random) symmetric key and use it to encrypt and decode a text string. Generation of a key requires a combination of characteristics of encryption and decryption.

Symmetric keys are guaranteed to be the same as long as the encryption and decryption methods use the same parameters. The Static functions make encryption and decryption logic easier using duplicate codes in a class. 

Rijndael class creates new objects such as a key and an initialization vector. When overridden in a derived class, the GenerateKey() method generates a random key and a random initialization vector. Bytes are decrypted and stored as a string, then encrypted to an array of bytes. The string contains both encrypted and unencrypted data.

Lastly, decryption conducts the stream transformation and generates the encryption streams. Data is written to the stream, and an encrypted byte is returned from the memory stream.

### Asymmetric and symmetric encryption
Here we will contrast asymmetric and symmetric encryption:

1. Small ciphertext is used in the symmetric key, while the asymmetric process requires a larger ciphertext than the file used. 
2. The size of data used in symmetric encryption carries extensive data size, whereas small data are employed in asymmetric encryption.
3. Symmetric key lengths are 128 or 256-bit, whereas RSA 2048 and higher key bits are applied in asymmetric encryption.
4. A single key makes symmetric encryption prone to eavesdroppers compared to asymmetric keys with double keys encryption and decryption.
5. Symmetic encryption is a relatively new technique compared to asymmetric encryption, which is an older encryption technique.
6. Symmetric encryption is a fast technique of encryption when compared to the slow speed experienced when using asymmetric encryption.
7. Symmetric encryption uses AES, DES, 3DES, and RC4 algorithms, whereas asymmetric encryption uses RSA and ECC algorithms.

### Conclusion
Converting data into an unreadable form by encryption and reverting it to its original state through decryption is critical in keeping data confidential during transmission.

In this article, we discussed the basics of encryption using advanced encryption standards (AES) in depth. Rijndael encryption is the gold standard for low-security leaks, and understanding how to use it is pivotal in programming. 
An encryption algorithm appropriate for the task should be used during any program handling.

Happy learning!

### Further reading
- [Why](https://us.norton.com/internetsecurity-privacy-what-is-encryption.html#) encrypt data during transmission.
- [Appication areas](https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=&cad=rja&uact=8&ved=2ahUKEwie8MWv6cD3AhVKyYUKHRvBDu8QFnoECEYQAQ&url=https%3A%2F%2Fiopscience.iop.org%2Farticle%2F10.1088%2F1742-6596%2F1237%2F2%2F022049%2Fpdf&usg=AOvVaw1ZelxbCgC1MGyc1JY1aasY) of data encryption.

---
Peer Review Contributions by: [Mohamed Alghadban](/engineering-education/authors/mohamed-alghadban/)
