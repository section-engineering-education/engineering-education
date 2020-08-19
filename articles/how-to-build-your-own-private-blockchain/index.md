---
layout: engineering-education
status: publish
published: true
url: /engineering-education/how-to-build-your-own-private-blockchain/
title: How to Build Your Own Private Blockchain
description: Private blockchains work based on access controls which restrict the people who can participate in the network. Instead of waiting for a network consensus, information can be recorded immediately.
author: jethro-magaji
date: 2020-06-28T00:00:00-08:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/how-to-build-your-own-private-blockchain/hero.jpg
    alt: blockchain image example
---
In this series we are going to build our own private blockchain where we can store data and connect them in a chain. But before we dive into it, we have to know what a blockchain is, its terminologies, and what is needed to build it.
<!--more-->

### What is a blockchain and why is it important?
The history of blockchain dates back to 2009 when Satoshi Nakamoto built the bitcoin cryptocurrency using blockchain technology. There are a lot of definitions (along with misinterpretations) of both blockchain and bitcoin.

According to [Wikipedia](https://en.wikipedia.org/wiki/Blockchain), a blockchain, originally block chain, is a continuously growing list of records, called blocks, which are linked and secured using cryptography.
Or, perhaps a blockchain is more simply thought of as a shared database that contains a list of all of the transactions made on the network.

The blockchain was designed to resist any modification of data after it has been recorded using a distributed computing system with high consensus, or a blockchain. This makes blockchain potentially suitable for the recording of events, medical records, and other records management activities, such as identity management, transaction processing, documenting provenance, food traceability, or voting.

![Image of Blockchain Framework](/engineering-education/how-to-build-your-own-private-blockchain/blockchain-framework.png)

### Breaking down the blockchain framework
**Transaction**: This can be seen as the basic unit of any blockchain. Transactions are made of multiple inputs and outputs. By understanding the inputs, outputs, miners’ fees, and amount sent, we can determine the balance of users' wallets before and after transactions are made.

**Wallet**: Blockchain identity is how you establish yourself in the world, in this case, the blockchain world. Blockchain identities are made up of a few important tools like wallets, addresses, and keys.
- **Wallet Address:** A unique identifier for your wallet.
- **Private Key**: A secret number that allows you to spend bitcoin from your wallet.
- **Public Key**: A publicly shareable key that cannot be used to spend bitcoin.

**Signature**: We validate transactions and assign ownership using what's known as a digital signature. Signatures establish proof of ownership for each transaction made on the network.

**Mempool**: Before getting onto the blockchain or becoming part of the network, transactions go into what is known as the memory pool. The memory pool (also known as the mempool) is the waiting place for transactions before they enter the blockchain. The blockchain can only handle so much information at once, and the backlog of information goes here.

**Network**: The blockchain network is a distributed peer-to-peer network. The idea of a network is what allows the blockchain to bypass the need for 3rd parties.
- **Peer-to-Peer Network**: A network of computers that allows information to be shared across users.
- **Distributed Network**: A network that allows information to spread out across many users.

**Consensus**: Consensus is how the blockchain makes decisions. Basically, the consensus is an idea but the idea is implemented through many different algorithms. These algorithms are all different ways to try and achieve consensus more effectively. Things like **proof of work**, **proof of stake**, and **DBFT (Delegated Byzantine Fault Tolerance)** are all consensus algorithms.

**Hashing**: A hash can be defined as a unique fingerprint for information. Hashing is the procedure that a miner on a Proof-of-Work blockchain constantly repeats in order to find an eligible signature (i.e. proof of work). In other words, it is the procedure of repeatedly inserting a random string of digits into a hashing formula until finding a desirable output.

### Block
For the purpose of building our own private blockchain, it’s very important that we understand the concept of block. Blocks are the fundamental components of the blockchain. The word "Block" is an interesting way to think about the information it stores; but what a block is might be a little different than you expect.

![Image of Block Model](/engineering-education/how-to-build-your-own-private-blockchain/block-model.png)<br>
*[Andersbrownworth Block](https://andersbrownworth.com)*

**Genesis block**
The genesis block is often referred to as the first block on a blockchain. The genesis block of Bitcoin was created on January 3, 2009; and indicates the birth of the Bitcoin blockchain.

**Previous Blocks Hash**: This is the hash value of the previous block, if not a genesis block.

**Time**: This is the timestamp of when the block was added to the blockchain.

**Merkle Root**: This is derived from the pair value of each transaction in the block until all the hash values is merged together as one to form a Merkle root.

**Nonce**: This is an arbitrary number when joined together with the block's data to form the block’s hash.

**Nonce + Block data = Block Hash**. Note: this is important in mining, where the miners try to guess the nonce of the block using computing to get the block’s hash.

Here we can demonstrate a simple block. In the image below you can see the block's number, nonce, data, and hash. Using [Andersbrownworth Block](https://andersbrownworth.com/block/block), we can demonstrate a block model and blockchain.

![Image of Block1](/engineering-education/how-to-build-your-own-private-blockchain/block1.png)<br>
*[Image Source](https://andersbrownworth.com)*

Next, we can pass data and mine it, and you will see it turns green. If you try to change the nonce or the data, it will invalidate the block by turning red.

![Image of Block2](/engineering-education/how-to-build-your-own-private-blockchain/block2.png)<br>
*[Image Source](https://andersbrownworth.com)*

Now, let’s see a chain of blocks linked together using their previous hash value. [Andersbrownworth](https://andersbrownworth.com/blockchain/blockchain)

![Image of Block3](/engineering-education/how-to-build-your-own-private-blockchain/block3.png)<br>
*[Image Source](https://andersbrownworth.com)*

Now, let’s pass our data into them and try to mine them. You will see that the blocks turn green and each block carries a new hash value of the previous block.

![Image of Block4](/engineering-education/how-to-build-your-own-private-blockchain/block4.png)<br>
*[Image Source](https://andersbrownworth.com)*

![Image of Block5](/engineering-education/how-to-build-your-own-private-blockchain/block5.png)<br>
*[Image Source](https://andersbrownworth.com)*

You can see that when I try to change the value of one block, it completely invalidates the whole block in the chain. To validate the blocks in the chain, I have to mine the blocks again to make every block carry the correct previous hash.

Though changing a block's data looks easy here, in the real blockchain, changing it would require a lot of computing power; plus, the consensus algorithm wouldn’t allow that to happen.

### Summary
We've now covered some of the core concepts of blocks and blockchain. My goal with this article is to equip you with key concepts and skills to be able to become a blockchain developer. In my next article, I will look to dive deep into writing some code to build our very own blockchain using Node.js, a JavaScript server-side framework.

**Additional Resources**
- [Bitcoin Whitepaper](https://bitcoin.org/bitcoin.pdf)
- [Blockchain Terminology](https://blog.goodaudience.com/blockchain-terminology-d903758d6bd)
- [Blockchain](https://en.wikipedia.org/wiki/Blockchain)
- [Andersbrownworth  Blockchain](https://andersbrownworth.com/blockchain/blockchain)
- [Andersbrownworth Block](https://andersbrownworth.com/block/block)
