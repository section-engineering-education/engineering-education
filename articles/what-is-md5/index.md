---
layout: engineering-education
status: publish
published: true
url: /engineering-education/what-is-md5/
title: What Is MD5 and Why Is It Considered Insecure?
description: MD5 Message-Digest Algorithm, is a cryptographic hashing function and is part of the Message Digest Algorithm family. It is insecure and should not be used in applications.
author: gregory-manley
date: 2020-04-20T00:00:00-07:00
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/what-is-md5/hero.jpg
    alt: what is md5 cryptographic hashing
---
MD5 Message Digest Algorithm, or [MD5](https://en.wikipedia.org/wiki/MD5), is a cryptographic hashing function. It is a part of the Message Digest Algorithm family which was created to verify the integrity of any message or file that is hashed. MD5 is still used in a few cases; however, MD5 is insecure and should not be used in any application.
<!--more-->

### What is MD5?
MD5 is the third installment in the line of the Message Digest Algorithm. The first installment, known as MD2 was created in 1989 and was specifically designed to operate on 16-bit processors. This algorithm took any plaintext message and created a 128-bit hash to secure that message. Today, MD2 is considered far too slow and is rarely used (*CompTIA Security+ 2008 in-depth, 2009*).

MD4 came along next. Unlike MD2, this standard was developed for 32-bit computers in 1990. This standard still has major flaws which prevented it from being widely accepted as stated by [*CompTIA Security+ 2008 in depth*](http://www.worldcat.org/oclc/752979537).

MD5 was designed by Ronald Rivest in 1991 to address the flaws with MD4. The algorithm used four variables of 32-bit length in a round-robin fashion to create a value that is then used to generate the hash.

### What is MD5 used for?
MD5 has been used for a variety of cases. One big use is the storage of passwords. Due to the insecurity of databases and the need to store the passwords somewhere, many passwords were stored in this manner. For example, many Linux systems used password-hashing algorithms, like MD5, to securely store passwords.

MD5 is also used as a checksum for files. In the Internet age, there are many insecurities in websites that may allow hackers to change download links and trick users into downloading a tampered file. One way this is mitigated is through the use of checksums, where a unique hash is generated against the file and provided so that the user may generate the hash based upon the file they download and compare. If they match, the file is the same and has not been tampered with.

### Should it be used?
[*CompTIA Security+ 2008 in depth*](http://www.worldcat.org/oclc/752979537) says that, "By the mid-1990s, weaknesses were revealed in the compression functions that could lead to collisions, and 10 years later successful attacks on MD5 were being conducted. Most security experts recommend that the family of MD hashes be replaced with a more secure hash algorithm". These collisions mean that a hacker or malicious user could create files that would have the same exact hash as another, making it impossible to be sure that the file has not actually been tampered with.

But what should you use instead? The author goes on to say, "Most security experts recommend that SHA-2 be substituted in place of MD5."

Unfortunately, MD5 has been cryptographically broken and considered insecure. For this reason, it should not be used for anything. Instead, developers should switch to the Secure Hash Algorithm or a Symmetric Cryptographic Algorithm. With current GPUs and hash cracking tools, using MD5 is barely better than using nothing at all. It is always recommended to store user passwords using a hashing algorithm and you should find that it is equally easy to use SHA-2 in place of MD5 in any modern programming framework.
