---
layout: engineering-education
status: publish
published: true
url: /data-recovery-raid-and-erasure-coding/
title: Data Recovery - A Look at RAID and Erasure Coding 
description: In this article, we consider the data recovery problem and how RAID and Erasure Coding can help.
author:
date: 2022-04-19T00:00:00-18:00
topics: [Machine Learning]
excerpt_separator: <!--more-->
images:

 - url: /engineering-education/data-recovery-raid-and-erasure-coding/hero.jpg
   alt:  example image
---

Data is an essential asset in the current world. The popularity of what data can do, coupled with the revenues generated from the sale and utilization of different data sets, has caused a sharp valuation of how organizations treat their data. Securing and ensuring data availability is a vital consideration in any organization. Large organizations such as Google, Facebook, and Amazon use robust data recovery methods to ensure the availability of their data. Among the numerous ways of data recovery include Erasure coding and RAID.

#### After reading this article, you will gain:
- The different types of RAID methods available in the market and which to use to fulfil your data recovery needs.
- The various erasure coding schemes and which one to use.
- The best method for a given hardware type, architecture, performance needs, and available storage.

#### Vocabularies in the article
The article features technical terms that we'll go through below.

- **RAID**: redundant array of disks.

- **Parity**: They are distributed information formed by adding bits to a data block to ensure they are even or odd. Adding the bits places checksums on the data, thus allowing a system to detect errors and determine what data was lost during data transmission or disk failure.     
     
- **Data backup**: generating copies of your system’s data that you can use to recover your original data.
     
- **Mirroring**: copying data from one disk onto another disk(s).
     
- **Stripping**: splitting logically linear data across multiple drives allows for concurrent access to the data.     
     
- **Block**: the logical space on every drive where data is stored.     
     
- **Encoding/decoding**: this is the process of converting a sequence of characters into a unique format to improve transmission or storage. On the other hand, decoding converts an encoded format back to its original form.     
     
- **Encoding/decoding complexity**: is the amount of time and resources required to encode and decode a message. The level of complexity is affected by the size of a message, the level of redundancy in the message, and the type of encoding and decoding algorithms utilized.

### RAID levels
Depending on your data recovery needs, RAID provides various levels that you can select and tune to suit a given requirement. There are at least five RAID levels, each with its utilization area. The different RAID levels are discussed below:

#### 1. RAID 0
It is the first RAID level and focuses on meeting performance needs rather than fault tolerance. The level is commonly known as stripping since it separates data into at least two drives in a stripping aggregation. In a RAID 0 configuration, data is written to all the disks in the array in parallel.

The main advantage of this level is its performance factor. Performance within the level increases when you add a disk to your RAID stack. Adding more drives increases performance further when you use a dedicated RAID controller. The RAID controller allows your system to read and write data stored in the different drives concurrently.

 ![RAID 0](/engineering-education/data-recovery-raid-and-erasure-coding/raid0.svg)

#### When to use the level?
The level is most suitable for individuals who need increased data processing speeds. For instance:
- Gamers prefer the method as it provides an advantage of a few milliseconds on latency over their peers.
- Multimedia companies prefer the method due to its concurrency ability when reading and writing data.
- RAID 0’s storage needs are low. Thus, you can store more data using the level. However, its users must be content that it does not offer redundancy since the level is more of a performance alternative than a data backup method. Hence, in case of a disk failure, you will lose data.
- The RAID 0 method is not favourable for any data recovery needs.

#### 2. RAID 1
RAID 1 is a level of RAID that disregards performance and favours fault tolerance. The method is often referred to as the mirroring technique. Data from one disk is copied to another disk. Thus, you can seamlessly access data from the secondary disk in case of disk crashes.

In a RAID 1 system, you can only use 50% of the maximum available storage on your system due to mirroring. The system offers a way to backup data and recovers data with ease as the data does not have to be rebuilt but copied to a replacement drive.

 ![RAID 1](/engineering-education/data-recovery-raid-and-erasure-coding/raid1.svg)

#### When to use the method
Some individuals prefer RAID 1 due to its redundancy capabilities. A few of the people who like the method include:
- Those looking to maintain data security, such as in accounting systems. The method protects its mirrored backups.
- In-time-critical operations can result in significant damages after data failure.
- Preferred storage alternative in low storage systems.

#### 3. RAID 5
This is the most utilized level as it offers a few advantages of RAID 0 and 1. the level guarantees the security and performance of your data while increasing its expenses as it requires at least three drives to implement.

RAID 5 uses parity bits stored on one drive to guarantee data security and strips data across multiple drives to improve performance. Thus, in a RAID 5 implementation of at least four drives, the system will use three for storage while one is used to storing parity bits.

 ![RAID 5](/engineering-education/data-recovery-raid-and-erasure-coding/raid5.svg)

#### When to use the method
- RAID 5 is preferred by people looking to build good performance and fault-tolerant systems. RAID 5 can tolerate breakdowns that occur to an entire disk in a disk array.

- The level is suitable for people who need medium performance, high storage systems. The data reconstruction process impacts performance since the system utilizes parity bits that require computational power during data recovery.

#### RAID 6
This type of RAID uses two parity drives to ensure improved data security. However, it is similar to RAID 5 in other aspects apart from the number of parity drives that ensure data security.
A RAID 6 system can continue to operate even after two drive failures. However, such a scenario is rare in the real world.

#### RAID 10
A RAID 10 system is a combination of RAID 1 and 0. The system aggregates the advantages of mirroring(RAID 0) and stripping(RAID 1) to produce a security-focused high-performance system.

In a RAID 10 implementation, at least four drives are required to handle the stripping and mirroring required to build the system.

The drives under a RAID 10 configuration are divided equally, whereby two drives handle stripping while the remaining ones handle mirroring. The RAID 10 configuration allows a system to offer upscaled performance through its simultaneous read and write operations, provides better security and reduces chances of data loss. However, the system is expensive to set up and maintain, and it only offers half of the combined disk storage.

 ![RAID 10](/engineering-education/data-recovery-raid-and-erasure-coding/raid10.svg)

#### When to use the method
Due to the system offering both the advantages of RAID 1 and 0, the system is preferred in the following areas:
- The system is ideal for low to medium workload environments.
- Best for entry-level servers, blade servers, and external storage systems.
- It is ideal for gamers, music, and video editors who require high performance and reliability in their systems.

### Erasure coding schemes
Erasure coding is an efficient method for data recovery and error correction. The different implementations of the method are known as schemes. All erasure coding schemes add redundant data to a message to reconstruct data and identify errors.

Before selecting an erasure coding scheme, you should consider the following:
- How many nodes do you intend to use with the scheme?
- What are the anticipated failure rate and number that may affect your system?
- How long do you intend to spend waiting for a node to rebuild?

Below are the various erasure coding schemes:

#### 1. Reed-Solomon Erasure Coding
This is perhaps the most popular erasure coding scheme. Reed Solomon is the preferred option for protecting data against transmission errors.
The code works by encoding the data to be sent using a polynomial, then sends the encoded data over a channel. The receiver can then use the polynomial to decode the data, correcting any errors that may have occurred during transmission.

Reed Solomon codes are very efficient in storage and encoding/decoding complexity, but they are not robust against correcting and identifying errors. Most Reed Solomon systems can handle 4 or 5 errors before failing. This is because they use a relatively small number of parity symbols. They are also efficient in encoding/decoding complexity as they can be encoded and decoded using simple algorithms. These simple algorithms include the Berlekamp-Massey algorithm, the Euclidean algorithm, and the Chinese Remainder Theorem.

#### When to use the scheme
Reed Solomon based systems are best for people who:
- Cloud storage vendors
- Data transmission and recovery experts
#### 2. XOR E. C
This scheme is more efficient in identifying and correcting errors in data than reed-Solomon codes. The parity bits and parity checking are the vital components that allow an XOR E.C. system to achieve high error detection and correction operations. Parity checking uses generated parity bits to check for errors in and after data transmission.

The parity checking process begins with Exclusive-ORing (XORing) the data bits with a parity bit. Then If the parity bit is set to 1, the XORed result will be 1 if the data contains an odd number of 1s and 0 if the data contains an even number of 1s. If the parity bit is set to 0, the XORed result will be 1 if the data contains an even number of 1s and 0 if the data contains an odd number of 1s.

#### When to use the scheme
The high error detection and correcting ability of XOR codes makes them suitable in the following fields:
- The codes are utilized in identifying and correcting data transmission as they are more efficient than reed Solomon codes.
- They are also utilized in the bar and Q.R. code readers.

#### 3. Product Matrix E. C
This scheme uses Reed Solomon codes and XOR codes to form a data recovery system that is efficient in data transmission and error detection and correction. The scheme is mainly preferred when handling errors in digital data.

The product matrix E. C scheme uses product coding to protect data from eavesdropping and tampering. Product coding encodes data in a way that makes it resistant to errors. Product coding encodes data using a matrix that is multiplied by a vector. This multiplication creates a code that is resistant to errors.

#### When to use the scheme
Product matrix E.C. codes are preferred in data security and communication where the goal is to protect data from eavesdropping and tampering and increase the reliability of data storage.

### Other factors to consider
#### a. Hardware Type
In this context, hardware type refers to the specific hard drive technology. For example, erasure coding is generally more efficient than RAID when using SSD storage.

Erasure coding encodes data into smaller chunks and then distributes those chunks across several different storage devices, which helps improve data durability and availability. On the other hand, RAID relies on mirroring or parity to protect data, which is less space-efficient, as discussed before.
#### b. Architecture
Erasure coding is a newer technology preferred in the cloud and hyper-converged systems. Erasure coding is more efficient than RAID in storage overhead and can provide better protection against data loss.

Erasure coding breaks data into smaller pieces and encodes them using a scheme. The encoded data is stored across different storage devices such as hyper-converged systems. In data loss, the data can be reconstructed from the encoded data.
#### c. Available storage
All erasure coding schemes are characterized as being storage efficient. To implement an erasure coding system, you need at least two drives. However, this isn't the case for a raid system.

A RAID 10 configuration requires a minimum of four drives to implement. Thus, a RAID configuration is costly and less storage efficient. Nonetheless, RAID is still a popular option due to its computational efficiency. Erasure coding requires high computational input to perform efficiently.

#### Conclusion
When selecting a suitable data recovery method, there is no one size fit for all. Between erasure coding and RAID implementations, there are noticeable differences that set the two methods in their separate areas of implementation. For instance, raid configurations are preferred in less computational capable systems. On the contrary, erasure coding will be preferred if you have a high computational system due to its space efficiency and data security. But the final choice will depend on you, your needs, and your budget.

After reading this article, I hope that choosing the proper data recovery methods should be straightforward.

Till next time

Happy Reading!!!



---
Peer Review Contributions by: [Lalithnarayan C](/engineering-education/authors/lalithnarayan-c/)
