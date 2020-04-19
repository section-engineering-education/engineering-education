## What Is MD5 and What Is It Used For?
MD5 Message-Digest Algorithm, or MD5, is a cryptographic hashing function. It is a part of the Message Digest Algorithm family. This family was created to verify the integrity of the message or file that it hashed. MD5 is still used in a few cases, however, MD5 is insecure and should not be used any applications. 

### What Is MD5
MD5 is the third installment of the Message Digest algorithm. The first installment, known as MD2 was created in 1989 and specifically designed to operate on 16-bit processors. This algorithm took any plaintext message and created a 128-bit hash to secure a message. MD2 is now considered far too slow today and is rarely used (CompTIA Security+ 2008 in depth, 2009). Afterward, came along MD4, unlike MD2 this standard was developed for 32-bit computers in 1990. This standard has major flaws that prevented it from being widely accepted (CompTIA Security+ 2008 in depth, 2009).

MD5 was designed by Ronald Rivest in 1991 to address the flaws in MD4. The algorithm used four variables of 32 bit length in a round-robin fashion to create a value that is then compromised to generate the hash.

### What Is MD5 Used For?
There are many uses for MD5. One big use is the storage of passwords. This is due to the insecurity of databases and the need to store the passwords somewhere. Many passwords were stored in this manner. Many Linux systems used password-hashing algorithms, like MD5, to securely store passwords.

MD5 is also used as a checksum for files. With the internet age, there are many insecurities in websites that may allow for hackers to change download links and trick users into downloading a tampered file. One way this is mitigated is through the use of checksums, where a unique hash is generated against the file and provided so that the user may generate the hash based upon the file they download and compare. If they match, the file is the same and has not been tampered with.

### Should It Be Used?
<i>CompTIA Security+ 2008 in depth</i> says that, "By the mid-1990s, weaknesses were revealed in the compression functions that could lead to collisions, and 10 years later successful attacks on MD5 were being conducted. Most security experts recommend that the family of MD hashes be replace with a more secure has algorithm" (2009). These collisions mean that a hacker or malicious user could create files that would have the same exact hash as another, making it impossible to be sure that the file had not actually been tampered with.

But what should you use instead? The author goes on to say, "Most security experts recommend that SHA-2 be substituted in place of MD5".

Unfortunately, MD5 has been cryptography broken and considered insecure. For this reason it should not be used for anything. Instead developers should switch to the Secure Hash Algorithm or a Symmetric Cryptographic Algorithm. Just like WEP, however, using MD5 is much better than nothing. It is always recommended to store user passwords using a hashing algorithm and any algorithm is better than none.
