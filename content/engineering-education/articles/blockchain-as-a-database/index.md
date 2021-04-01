---
layout: engineering-education
status: publish
published: true
url: /engineering-education/blockchain-as-a-database/
title: Blockchain as a database
description: Blockchain is a distributed database existing on multiple computers at the same time. It is constantly growing as new sets of recordings, or 'blocks', are added to it.
author: keerthi-v
date: 2020-06-18T00:00:00-09:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/blockchain-as-a-database/hero.jpg
    alt: blockchain example image
---

When people talk about blockchain, many times, they are referring to the use of blockchain for trading cryptocurrencies. But blockchain has another big, and perhaps as powerful an application - blockchain as a database. Before we delve into this world of possibilities, let’s first look at what blockchain is.
<!--more-->
### What is a Blockchain?
A blockchain is a growing linked list of blocks, where a block is a group of ordered transactions **ledger**. Transaction, in this context, is a database transaction which stands for any changes made within the database.

![blockchain image](/engineering-education/blockchain-as-a-database/blockchain.png)<br>
Each block typically contains the cryptographic hash of the previous block, a timestamp, and transaction data. To use it as a distributed ledger that is accessible and contributed to by many people, the blockchain works on the P2P ([**peer-to-peer**](https://en.wikipedia.org/wiki/Peer-to-peer)) protocol, where every node has an equal say validating the transactions on the network. This network can be public or private, depending on the needs of the user.

To use blockchain as a database for [DApps](https://blockgeeks.com/guides/decentralized-applications/) (decentralized applications), there are certain concepts to bear in mind.

### What to Consider
#### Smart Contracts
Data being added cannot conflict with some other data that’s already in the database (**consistent**). New data that is being inserted should not contradict anything specified in the smart contract.

A [**smart contract**](https://en.wikipedia.org/wiki/Smart_contract) is a self-executing contract that defines certain rules that need to be adhered to while executing specific actions, predefined by code. These contracts are binding and unchangeable by one or a few peers in the network independently. They are written to run on the blockchain and are distributed across all the peers, making it impossible to alter without the agreement of most of the peers in the network. Smart contracts facilitate the interaction between unknown parties without the involvement of a trusted third party. This is how blockchain ensures that transactions are **trustless**.

#### Immutable Property
Blockchain is append-only, or **immutable**. Once a block is added to the chain, it cannot be removed or altered, ever. This is because each block consists of a cryptographic hash or digital signature of not just itself, but the previous block as well. It is impossible to make changes to the data without it being pushed as a block into the chain, making it easily traceable. Therefore, this property eliminates the risk that centralized databases face, which is that data manipulation can be invisible and untraceable, even if a single point of access is compromised. Hence, blockchain supports data auditing, prevents corruption, and eliminates dependency on a third party to ensure data integrity.

#### Replicas & Accessibility
It is **replicable** and **available**. Everyone who consents to be a part of the network can have copies of all the blocks in an encrypted form. If certain data is **owned** by someone, they have the privilege to decrypt it using their private keys to access the data. And since many nodes in the network have copies of the data, data is always available, even if a few nodes go down. This also makes it almost impossible for malicious users to launch a DOS (Denial of Service) attack.

#### Consensus
Everyone agrees on the state of things in the database ([**consensus**](https://medium.com/@BangBitTech/what-is-consensus-algorithm-in-blockchain-different-types-of-consensus-models-12cce443fc77)). A consensus has to be reached within the network before any block is appended ([**mined**](https://github.com/bitcoinbook/bitcoinbook/blob/develop/ch10.asciidoc)), into the blockchain.

The consensus mechanism is fault-tolerant and self-regulating, relying on the contributions of a large number of participants who will validate the change of state and authenticate the transactions. Every participant contributes computing power to validate the new blocks. Only when the majority agrees that the block is valid, can it be added.

There is, however, the risk of [51% attack](https://www.fxempire.com/education/article/51-attack-explained-the-attack-on-a-blockchain-513887), where one party gains control over 51% or more of the total computing resources contributing to the network.

#### Decentralization
It is without a central authority (**decentralized**). One party is not responsible for maintaining, regulating, and storing the database, and the power is spread across all the contributors in the network. So there is no single point of failure or one trusted authority.

### Final Thoughts
While blockchain technology is exciting and innovative, it is not efficient for all use cases. There are challenges ranging from scalability, search query speed, and storage requirements. So blockchain is currently not the best solution for systems that require quick and frequent lookup, big data management, high performance, and privacy. Blockchain is only preferred if a trustless, robust, and immutable system is required.
