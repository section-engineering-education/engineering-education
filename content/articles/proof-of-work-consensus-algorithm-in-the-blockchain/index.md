---
layout: engineering-education
status: publish
published: true
url: /proof-of-work-consensus-algorithm-in-the-blockchain/
title: Proof of Work Consensus Algorithm in the Blockchain
description: This article discusses the proof of work consensus, why it's needed in a blockchain network, and how it helps prevent double-spending.
author: gregory-munene
date: 2022-06-27T00:00:00-14:00
topics: [Blockchain]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/proof-of-work-consensus-algorithm-in-the-blockchain/hero.jpg
    alt: Proof Of Work Consensus Algorithm In The Blockchain Example Image
---
When Nakamoto Satoshi came up with and started executing the idea of the blockchain, he had one goal in mind, eliminating trust-less cash systems. He wanted a system where strangers could transact without facing the risk of fraud. The Proof of Work (PoW) consensus algorithm is at the center of making the blockchain more secure.
<!--more-->
The Proof of Work consensus algorithm aims to achieve distributed trust in a P2P network of nodes using a voting protocol. This voting protocol relies on the concept of work performed by miners to introduce randomness into the decision-making process. It guarantees the verification of all entries, ensuring the users on these systems do not incur losses due to fraud.

This article discusses the proof of work consensus, why it's needed in a blockchain network, and how it helps prevent double-spending.

### Why is Proof of Work needed in a blockchain network?
Suppose you understand how cryptocurrency systems like Bitcoin work, then you will also know that the processes involved are costly. They are time-consuming and difficult, yet cryptocurrencies insist on using these processes.

#### Security
PoW is a necessity to achieve the security that cryptocurrency systems target. The primary objective of these systems is to have a secure fraud-proof system where strangers can transact comfortably. PoW relies on miners who act as independent data processors to sequence a cryptocurrency's transaction history. 

Doing so increases the difficulty of changing data over time so that unauthorized access and alterations do not happen. A quick understanding of the basics of blockchain's mode of operation would help show why we need PoW.

#### How blockchain operations work
A cryptocurrency like Bitcoin stores data logically in a chain of blocks. The system usually produces a block every 10 minutes consisting of several transactions. These transactions contain data related to the transfer of Bitcoin from one account to another. The independent data processors help verify each of these transactions by solving a series of complex mathematical equations at a fee.

Upon validating a given block, the miner links it with the proof of work hash. Each time a given block undergoes verification, solving mathematical equations required to access it and making any alterations becomes increasingly challenging. The chain becomes more valid as more miners solve these mathematical equations and add hashes onto the blocks. 

Thus, the protocol considers the longest chain as the most authentic. Because so many different miners keep verifying the blocks, it is impractical that the same miner can keep winning the same block. Thus, data alterations are almost impossible.

Satoshi knew that very few individuals would even try to attack the network and alter data with such an energy-intensive process. This scenario can only happen if a mining group owns most of the total hash rate and colludes to manipulate the cryptocurrency blocks. Such occurrences are rare, and this forms the basis for PoW's security, the primary purpose of blockchain.

### PoW and Proof of Stake (PoS)
There are remarkable differences between PoW and PoS, and we will be assessing them to determine which consensus algorithm is better.

#### Security
PoW guarantees higher security than PoS. PoW's security model makes it improbable for anyone to try hacking the system and gain an unfair advantage. A great deal of electric power goes into securing the network during mining, and its time-consuming nature makes attackers less likely to overcome its security power. In comparison, PoS is less secure. Notably, entities or individuals with large crypto holdings have too much power.

PoW is the earliest cryptocurrency consensus algorithm as the idea arose in the 1990s. PoS began in [2012](https://www.fool.com/investing/stock-market/market-sectors/financials/cryptocurrency-stocks/proof-of-work/). PoW's long stay in blockchain makes its processes more reliable because of having evolved longer. It has more security features, making organizations more willing to adopt the system.

#### Energy consumption
PoW spends significantly high amounts of energy to facilitate its security model. For instance, Bitcoin consumes more energy than [Ukraine and Norway](https://blockworks.co/proof-of-work-vs-proof-of-stake-whats-the-difference/). This model is not sustainable in the long run as it may interfere with other energy-consuming processes. PoS is more energy-efficient. Its hardware energy requirements are equivalent to today's market average laptops.

PoS' frugal energy consumption makes it more scalable than PoW-dependent cryptocurrency systems. Enlarging a PoS-reliant blockchain is more economically efficient than upscaling a PoW one.

#### Cost
The costs associated with running a PoW-dependent system are very high. The huge energy consumption and the need to pay the independent data processors push up the costs significantly. PoW also requires expensive advanced computer systems. For instance, miners often use supercomputers to validate the transactions. For PoS, however, there is less need for expensive machinery.

#### Waste generation
PoW-dependent cryptocurrency systems are criticized for generating large amounts of electronic waste. Ideally, PoW miners run 24/7 at full computing power, generating much waste. A study showed that Bitcoin alone generated [30.7 metric kilotons](https://www.sciencedirect.com/science/article/abs/pii/S0921344921005103#) of annual e-waste as of May 2021. In context, this is equivalent to what the IT equipment in the entire country of Holland produced. The level could rise further as more regions adopt PoW use. PoS's efficient energy use eliminates these challenges of e-waste.

#### Immutability
PoW offers the best immutability level. It takes about 10 minutes to mine every block. Once an independent data processor validates the transactions of a given block, it becomes increasingly difficult and costly to alter data in that blockchain. In comparison, PoS lacks immutability. There is a higher risk of data alteration in PoS than in PoW.

In short, PoS beats PoW in cost-efficacy while PoW has a better security model. Ideally, the primary purpose of creating cryptocurrencies was to enhance data security. Facilitating secure transactions between unfamiliar individuals means that security should be the priority of these consensus algorithms. That is why PoW is still the preferable choice over PoS. The structure of the PoW blockchain makes it unlikely to encounter distributed network attacks.

### Using the proof of work concept to prevent a double-spending
Double-spending means that you can reuse the already spent electronic money. But bitcoin and other cryptocurrencies have put measures to stop the double usage of crypto coins. Blockchain is transparent and keeps a record of every transaction from the first user to the current one. That means miners can track the path that each crypto coin has passed through.

Each validated block has a PoW hash, so you cannot change the existing records. Whenever an individual tries tampering with the data, the hash functions change. The domino effect causes a tiny change in each portion of the original data, producing a new hash. The newly generated hash retains the same length but cannot allow you to obtain the original data. However, the user can use this hash to verify that this is the same one used to generate the original data. This system reduces tampering with blockchain data, thus preventing double-spending.

### Examples of blockchain networks that use PoW
The PoW consensus algorithm remains popular among the existing cryptocurrency systems. It is the most widely used consensus mechanism. Some of the popular networks actively using the Proof of Work concept include:

- Bitcoin
- Ethereum
- Litecoin

### Conclusion
Proof-of-work and proof-of-stake are consensus algorithms whose use in blockchain has revolutionized data security. PoW is popular in cryptocurrencies considering its high-security assurance. It operates on an energy-intensive security model that requires miners to validate all the transactions and arrange them in blockchains.

PoW has received criticism considering its cost inefficiency, excessive time consumption, and high e-waste. Consensus algorithms like PoS are superior in these aspects. They are cost-effective and scalable. But PoW's greater security remains its most profound leverage, and cryptocurrencies are yet to abandon it.

### Further reading
- [Introduction to Blockchain Architecture](/engineering-education/an-introduction-to-blockchain-architecture/)
- [The History of Blockchain](/engineering-education/history-of-blockchain/)

---
Peer Review Contributions by: [Wilkister Mumbi](/engineering-education/authors/wilkister-mumbi/)
