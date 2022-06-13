---
layout: engineering-education
status: publish
published: true
url: /data-recovery-raid-and-erasure-coding/
title: A Look at RAID and Erasure Coding 
description: This tutorial will help the reader understand data recovery. We will discuss the features of RAID and Erasure Coding data recovery techniques.
author: linchez-maina
date: 2022-06-12T00:00:00-20:00
topics: [Languages]
excerpt_separator: <!--more-->
images:

- url: /engineering-education/data-recovery-raid-and-erasure-coding/hero.jpg
  alt: RAID and Erasure Coding Data Recovery Hero Image
---
Securing and ensuring data availability is a vital consideration in any organization. Large firms such as Google, Facebook, and Amazon use robust data recovery methods.
<!--more-->
Erasure coding and RAID are some of the popular data recovery techniques.

### Goal
This article will help the reader understand:
- The different RAID methods available in the market and which to use to fulfill your data recovery needs.
- Erasure coding schemes.
- The best method for a given hardware, architecture, performance needs, and available storage.

Below are some of the technical terms used in the article:
- *RAID*: A redundant array of disks.
- *Parity*: Refers to distributed information formed by adding bits to a data block to ensure they are even or odd. Adding the bits places checksums on the data, thus allowing a system to detect errors and determine what data was lost during data transmission or disk failure.     
- *Data backup*: This is a copy of your system’s data that you can use to recover files.
- *Mirroring*: Copying data from one disk onto another disk(s).
- *Stripping*: It involves splitting logically linear data across multiple drives which facilitates concurrent access to data.     
- *Block*: The logical space on each drive where data is stored.     
- *Encoding/decoding*: This is the process of converting a sequence of characters into a unique format to improve transmission or storage. On the other hand, decoding converts an encoded format back to its original form.     
- *Encoding/decoding complexity*: It's the amount of time and resources required to encode and decode a message. The level of complexity is affected by the size of a message, the level of redundancy in the message, and the type of encoding and decoding algorithms utilized.

### RAID levels
RAID provides several levels that one can use for a given requirement. 

The five major RAID levels are discussed below:

#### 1. RAID 0
This level focuses on meeting performance needs rather than fault tolerance. The level is commonly known as stripping since it separates data into at least two drives in a stripping aggregation. In a *RAID 0* configuration, data is written to all disks in the array in parallel.

The main advantage of this level is its performance factor. This level's efficiency increases when you add a disk to your RAID stack. A dedicated RAID controller also boosts performance. 

The RAID controller allows your system to read and write data stored in different drives concurrently.

The  *RAID 0* level is most suitable for individuals who need increased data processing speeds. 

For instance:
- Gamers prefer this method as it provides an advantage of a few milliseconds on latency over their peers.
- Multimedia companies prefer the method due to its concurrency ability when reading and writing data.
- RAID 0’s storage needs are low. Thus, you can store more data using the level. However, it does not offer redundancy since its more of a performance alternative than a data backup method. Therefore, in case of a disk failure, you will end up losing data.
- The RAID 0 method is not favorable for other data recovery needs.

#### 2. RAID 1
The RAID 1 level disregards performance and favors fault tolerance. This method is often referred to as the mirroring technique. Data from one disk is copied to another disk. Thus, you can seamlessly access data from the second disk in case of disk crashes.

In a RAID 1 system, you can only use 50% of the maximum available storage on your system due to mirroring. The system offers a way to backup data and recovers data with ease since it does not have to be rebuilt from scratch.

Some individuals prefer RAID 1 due to its redundancy capabilities. A few of the people who like RAID 1 include those looking to promote data security, such as in accounting systems. The method protects mirrored backups.

#### 3. RAID 5
This is the most utilized level as it offers more advantages over RAID 0 and 1. This level guarantees the security and performance of your data. However, it increases overall expenses since it requires at least three drives to implement.

RAID 5 uses parity bits stored on one drive to guarantee data security and strips data across multiple drives to improve performance. Thus, in a RAID 5 implementation of four drives, the system will use three drives for storage while one drive for storing parity bits.

RAID 5 is preferred by people looking to build well-performing and fault-tolerant systems. RAID 5 can tolerate breakdowns that occur to an entire disk in an array.

RAID 5 is also suitable for people who need medium performance and high storage systems. The data reconstruction process impacts performance since the system utilizes parity bits that require significant computational power during data recovery.

#### RAID 6
This type of RAID uses two parity drives to improve data security. However, it is similar to RAID 5 in other aspects apart from the number of parity drives.

A RAID 6 system can continue to operate even after two drives fail. However, such a scenario is rare in the real world.

#### RAID 10
A RAID 10 system is a combination of RAID 1 and 0. The system aggregates the advantages of mirroring (RAID 0) and stripping (RAID 1) to produce a security-focused high-performance system.

In a RAID 10 implementation, at least four drives are required to handle the stripping and mirroring functionalities in a system.

The drives under a RAID 10 configuration are divided equally, whereby two drives handle stripping while the remaining ones handle mirroring. The RAID 10 configuration allows a system to offer upscaled performance through its simultaneous read and write operations.

It also provides better security and reduces the chances of data loss. However, the system is expensive to set up and maintain. Furthermore, it only offers half of the combined disk storage.

Since it offers both the advantages of RAID 1 and 0, the system is preferred in the following areas:
-  Low to medium workload environments.
-  Entry-level servers, blade servers, and external storage systems.
- Gaming, music, and video editing.

### Erasure coding schemes
Erasure coding is an efficient method for data recovery and error correction. The different implementations of the method are known as schemes. All erasure coding schemes add redundant data to a message to reconstruct the information and identify errors.

Before selecting an erasure coding scheme, you should consider the following:
- How many nodes do you intend to use with the scheme.
- Anticipated failure rate.
- How long do you intend to spend waiting for a node to rebuild.

Below are some of the erasure coding schemes:

#### 1. Reed-Solomon erasure coding
This is perhaps the most popular erasure coding scheme. Reed Solomon is the preferred option for protecting data against transmission errors. Data is encoded using a polynomial, then sent over a channel. 

The receiver can then use the polynomial to decode the data, correcting any errors that may have occurred during transmission.

The Reed Solomon technique is efficient in storing data, as well as encoding/decoding complexity. However, it's not robust in correcting and identifying errors. Most Reed Solomon systems can handle 4 or 5 errors before failing. 

This is because they use a relatively small number of parity symbols. This method also uses simple algorithms such as the Berlekamp-Massey algorithm, the Euclidean algorithm, and the Chinese Remainder Theorem.

Reed Solomon based systems are best for:
- Cloud storage vendors.
- Data transmission and recovery experts.

#### 2. XOR E. C
This scheme is more efficient in identifying and correcting errors in data than Reed Solomon codes. The parity bits and parity checking are the vital components that allow an XOR E.C. system to achieve high error detection and correction operations.

Parity checking uses generated parity bits to check for errors in and after data transmission. The process begins with Exclusive-ORing (XORing). 

The high error detection ability of XOR E.C codes makes it quite effective. This technique is utilized in identifying and correcting data transmission since its more efficient than Reed Solomon. The codes are also utilized in the bar and Q.R. code readers.

#### 3. Product Matrix E. C
This scheme uses Reed Solomon and XOR codes to form a data recovery system that is efficient in data transmission, error detection, and correction. 

The product matrix E. C scheme uses product coding to ensure that data does not leak. Product coding encodes data using a matrix that is multiplied by a vector. This multiplication creates data that is resistant to errors.

### Other factors to consider
#### Hardware Type
In this context, hardware type refers to the specific hard drive technology. For example, erasure coding is generally more efficient than RAID when using SSD storage.

Erasure coding encodes data into smaller chunks and then distributes those chunks across different storage devices, which helps improve data durability and availability. 

On the other hand, RAID relies on mirroring or parity to protect data, which is less space-efficient.

#### Architecture
Erasure coding is a new technology preferred in the cloud and hyper-converged systems. It's more efficient than RAID when it comes to managing storage overhead costs. It can also provide better protection against data loss.

Erasure coding breaks data into smaller pieces and encodes them using a scheme. The encoded data is then stored across different storage devices such as hyper-converged systems. In case of a data loss, the data can be reconstructed from the encoded files.

#### Available storage
All erasure coding schemes are characterized as storage efficient. To implement an erasure coding system, you need at least two drives. However, this isn't the case for a RAID system.

A RAID 10 configuration requires a minimum of four drives to implement. Thus, a RAID configuration is costly and less storage efficient. Nonetheless, RAID is still a popular option due to its computational efficiency. Erasure coding requires high computational input to perform efficiently.

### Conclusion
In this article, we discussed erasure coding and RAID implementations. There are noticeable differences that set these two methods apart. 

For instance, RAID configurations are preferred in less computational systems. On the contrary, erasure coding will be preferred if you have a high computational system due to its space efficiency and data security.

Happy reading!

---
Peer Review Contributions by: [Wanja Mike](/engineering-education/authors/michael-barasa/)