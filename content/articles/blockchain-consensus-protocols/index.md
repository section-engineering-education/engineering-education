---
layout: engineering-education
status: publish
published: true
url: /blockchain-consensus-protocols/
title: An Overview of Consensus Protocols in Blockchain
description: This article will be a discussion about the various consensus protocols and how they are used in a Blockchain.
author: lalithnarayan-c
date: 2021-01-28T00:00:00-15:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/blockchain-consensus-protocols/hero.jpg
    alt: Blockchain Consensus Protocols image
---
Satoshi Nakamoto introduced an exciting application called [Bitcoin](https://www.investopedia.com/terms/b/bitcoin.asp#:~:text=Bitcoin%20is%20a%20digital%20currency,mysterious%20and%20pseudonymous%20Satoshi%20Nakamoto.) after the great recession in 2008. This was one of the first real applications of blockchain technology. 
<!--more-->
Also known as distributed ledger technology, blockchain stands out as a promising solution due to the following properties:
- Security
- Accountability
- Decentralization
- Transparency 
- Immutable

This article will discuss the role of consensus protocols in blockchain technology and dive deeper into the various consensus protocols. 

### Introduction
Blockchain technology is a distributed ledger used to record any transactions that happen over the network. The concept of decentralization is deeply engraved into the design of blockchain technology. Decentralization means there is no major entity keeping track of the transactions, and instead, it is distributed across many nodes in the network. 

The technology allows one to verify the transactions via [cryptographic hash functions](/understand-hashing-in-cryptography/). Hash functions are special functions that generate unique values for unique inputs. The underlying assumption is that the record present with the most nodes is likely to be the least fallible. 

Consensus protocols form the backbone of blockchain by helping all the nodes in the network verify the transactions. Bitcoin uses proof of work (PoW) as its consensus protocol, which is energy and time-intensive. The rate of verification of transactions in Bitcoin is relatively slow compared to Visa and MasterCard's likes. Therefore, alternate consensus protocols were proposed. 

All the crypto-currencies and other blockchain applications, also known as [decentralized applications (dApps)](https://en.wikipedia.org/wiki/Decentralized_application), vary in how the network reaches a consensus. dApps use a peer-to-peer (P2P) network of computers instead of a centralized node or server. Another aspect of dApps is the lack of centralized authority. Most of the standard applications we use today are governed by a group of individuals or companies who define the terms of use. dApps are a step in creating decentralized systems at scale. 

### Types of consensus protocols
Before we move on to the consensus protocols, let us examine a statistical fact related to consensus protocols. Theoretically, the blockchain is considered compromised if a hacker gets access to 51% or a more significant part of the network. The various types of consensus protocols solve the 51% attack problem in various ways.

#### Proof of Work
Proof of Work is one of the first consensus protocols used in blockchain applications. It is based on computing the hash values and validating the transactions until a specified number of trailing zeros are found in the hash value. The number that generates the hash with the specified number of trailing zeros is known as a nonce. A nonce is defined as a random number that generates the specified number of trailing zeros in the hash function. 

#### Properties
- Proof of Work is designed for permissionless public ledgers and uses the computational resources from the systems in the node to reach consensus
- The blocks are represented in a linear structure. Each block represents a group of transactions.
- The mining aspect of bitcoins has to do with solving the cryptographic puzzle of finding a random integer, that leads to hashes with a specified number of leading zeros. 
- Every transaction is validated and signed using the public and private keys assigned to each user. 

#### Disadvantages
- It is a power-hungry and resource-intensive protocol. This protocol wastes a lot of computational power and electricity to solve the cryptographic puzzles compared to the relatively efficient protocols.

#### Popular Crypto-currencies
Bitcoin and Litecoin are two prominent cryptocurrencies using Proof of Work. These are energy-intensive algorithms. The idea behind making the computation of such transactions costly and verification of transactions cheap is as follows: 

An asymmetry between the verification and updation of ledgers results in more comfortable access to the ledger and greater resistance to changing values in the ledger. The asymmetry is also a disadvantage. PoW algorithms require humongous amounts of power and resources. Moreover, small players with less amount of resources are penalized for having a lower amount of resources, and therefore the aim of decentralization is met.

#### Proof of Stake
Ethereum was one of the largest cryptocurrencies to decide to move onto proof of stake consensus. Let's understand this example a bit better. Let's say we are miners and are validating the transactions made. In bitcoin, a person validates the transactions by computing the hash value with a certain number of leading zeros gets the allocated amount of bitcoins. 

In proof of stake consensus, a validator is picked and assigned a block. The miner has to allocate a particular part of his cryptocurrency to start validating. If the miner succeeds in invalidating the transaction, then the award is the stake they had pledged initially, along with certain transaction fees. This is a way to penalize bad behavior and incentivize good behavior. 

#### Properties
- The validators are picked according to their economic stake in the network.
- The objective is to avoid centralization of mining centers and provide a chance to validate to all the miners.
- It is environmentally friendly as there is no computational puzzle to be solved.
- Special hardware for mining is not required.

#### Disadvantages
- In PoS, an attacker would need to possess greater than 50% of the currency to gain control over the network compared to 51% in PoW.
- One possible attack over a PoS consensus-based network is a bribe attack. This happens when the attacker reverses the victim's transactions and bribes the miners for confirming the transactions. 

#### Proof of Space
Proof of Space, also known as PoSpace, is a network consensus protocol similar to the Proof of Work consensus protocol. Instead of the computational resources, PoSpace uses disk storage to validate transactions.

PoSpace consumes disk space and incentivizes miners with the most considerable disk space allocated to a block. Implemented using the hard-to-pebble graphs, this data structure is used to solve the pebbling game. The pebbling game consists of pebbling vertices in a graph only if all the parent vertices have been pebbled. 

Pebbling refers to storing the parents' hash values, and removing the pebble refers to freeing the memory. Refer to this article for more details on the [pebbling game](https://math.mit.edu/research/highschool/primes/materials/2016/conf/10-2%20Bhupatiraju-Kuszmaul-Vale.pdf). 


All the feasible solutions to the problem are generated randomly, called plots. These plots are stored on the disks and solved using an algorithm called Shabal's algorithm. Once the solutions are computed, the miners compare their solutions, and the solution with the best time and space complexity is rewarded with the next block.

#### Disadvantages
- This consensus protocol again favors the miners with the maximum amount of space. It is resource biased, and therefore, miners with less amount of space cannot participate actively. This is a problem that goes against the concept of decentralization. 

#### Applications
- Burstcoin is a decentralized cryptocurrency built using PoSpace. The value proposition is to aid payment systems. 
- SpaceMint is another example in its early conceptual stages.

#### Proof of Elapsed Time
Proof of Elapsed time is a network consensus protocol developed by the Intel Corporation. The algorithm is predominantly used in permissioned blockchain ledgers. The hardware used in [PoET](https://www.investopedia.com/terms/p/proof-elapsed-time-cryptocurrency.asp#:~:text=Proof%20of%20elapsed%20time%20(PoET)%20is%20a%20consensus%20algorithm%20developed,block%20winners%20and%20mining%20rights.&text=The%20PoET%20algorithm%20generates%20a,to%20sleep%20for%20that%20duration.) is specially designed for this protocol. For example, Intel Software Guarded Extension (SGX) is used in networks using PoET. 

This consensus protocol is used to allocate blocks to miners on the network. In permissioned blockchain systems, the miners' identity is determined before allowing access into the network. Therefore, anonymity is not a feature in this protocol. 

Each node in the network is assigned a random waiting time. The first node to complete the randomly chosen period validates the new block. The specialized hardware puts the processor to sleep during the wait time—this repeats over all the blocks in the network. 

#### Disadvantages
- The major disadvantage of this algorithm is its dependency on specialized hardware. This exposes it to various security vulnerabilities due to the lack of standardized and tried and tested protocols.
  
#### Applications
- IBMs Hyperledger Sawtooth supports PoET mechanism for custom blockchain applications development.

### Conclusion
In this article, we have analyzed and discussed the various consensus protocols and their properties. I hope this article helps generate curiosity in the subject of blockchain in general. There is a huge scope of research in the field of blockchain to make it faster and efficient. 

Happy learning. 

---
Peer Review Contributions by: [Saiharsha Balasubramaniam](/engineering-education/authors/saiharsha-balasubramaniam/)
