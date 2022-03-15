---
layout: engineering-education
status: publish
published: true
url: /blockchain-as-a-form-of-e-voting/
title: Blockchain as a form of E-voting
description: The objective of this tutorial is to help the reader learn how blockchain technology is used in electronic voting, its advantages, and problems, and end by talking a little about Moscow's experience using Blockchain in real-life voting.
author: samuel-santos
date: 2021-11-11T00:00:00-03:16
topics: [Blockchain]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/blockchain-as-a-form-of-e-voting/hero.jpg
    alt: Blockchain as a form of e-voting Hero image
---
This article will explain Blockchain, how we can use it in electronic voting, its advantages, and its problems. We will end by talking a little about Moscow's experience using Blockchain in real-life voting.
<!--more-->

### Table of contents
- [Prerequisites](#prerequisites)
- [Introduction](#introduction)
- [Blockchain](#blockchain)
    - [Features of Blockchain](#features-of-blockchain)
    - [Peer-to-Peer network](#peer-to-peer-network)
    - [Transactions](#transactions)
    - [The Chain and the Blocks](#the-chain-and-the-blocks)
    - [Mining and Proof of Work](#mining-and-proof-of-work)
- [E-voting and Blockchain: Advantages and Disadvantages](#e-voting-and-blockchain-advantages-and-disadvantages)
- [How Moscow implemented a Blockchain vote](#how-moscow-implemented-a-blockchain-vote)
- [Conclusion](#conclusion) 
- [References](#references)

### Prerequisites
To follow along with this article, you need to have:
- Basic knowledge of computing and programming.
- Basic knowledge of how elections and voting work.
> Please note that these prerequisites are not mandatory, but they'll make you understand the concepts in this article more deeply.

### Introduction
In his famous paper, [Bitcoin: A Peer-to-Peer Electronic Cash System](https://bitcoin.org/bitcoin.pdf), Satoshi Nakamoto begins by talking about how the internet's commerce and transaction system suffers from a trust-based model.

Furthermore, Nakamoto mentions this model's need for a central authority that acts as an intermediary for transactions; that is, all the transactions must go through this central authority. Think, for example, of a bank. Nakamoto's proposal in his paper is that of a decentralized and secure technology as an alternative to this current model. He refers to this technology as the `Blockchain`.

Drawing a parallel with a voting process, its integrity and effectiveness still depend on voters' trust and the authorities that organized it. Electronic voting can improve some aspects of manual voting, such as the process's speed, simplicity, and flexibility. On the other hand, they bring red flags that deserve attention and care, such as issues of secrecy, privacy, transparency, and security.

Some places around the world have used some form of electronic voting or experimented with this voting model. In Brazil, electronic voting machines have been used for elections since the 1990s, for example. In Moscow, an e-voting experiment was recently carried out using Blockchain as a backend.

On the magazine, [The Economist](https://www.economist.com/briefing/2015/10/31/the-great-chain-of-being-sure-about-things), Blockchain is referred to as a way of *creating and preserving truths*. The technology has promising properties for an electronic voting system such as [anonymity, decentralization, transparency, immutability, and encryption](https://www.mdpi.com/1424-8220/21/17/5874).

This article will explain Blockchain, how we can use this technology in electronic voting, its advantages, and its problems. We will end by talking a little about Moscow's experience using Blockchain in real-life voting.

### Blockchain
> If you already know the basics of how a Blockchain works, you can skip this section. Here, we will make a brief introduction about the functioning and main features of Blockchain.

Blockchain is a technology designed to work in a peer-to-peer network. In this network, each user is called a *node*. Users can make *transactions* with each other. To do this, they need to specify their nodes' *public addresses* and the amount of assets to be transferred from one node to the other. To confirm a transaction, the sender node presents its *private signature*. Transactions are stored as a group within so-called *blocks*.

Each block has a unique key that identifies it and stores its predecessor's key, forming a chain of sequential blocks, hence the name. Any change to a block in the chain would change its key, which would *break* the chain from the block onwards.

The blocks are forged by nodes called *miners*. These miners need to solve a problem using a lot of computational power to give *proof of work*. When miners give proof of work, they receive some assets as a reward, and all nodes add the new forged block to their chains.

The valid version of the Blockchain is the one that has the most blocks. As the Blockchain is public, each node can check if everything is as it should be. So, for someone to change the chain, they would need to monopolize 51% of the network's mining power to always keep their version as the longer version of the chain, which is very unlikely.

### Features of Blockchain
#### Peer-to-Peer network
Blockchain is designed to work on a peer-to-peer network. Each user on that network is called a **node**. Each node has its **address**: a unique *public* key; and a **signature**: a unique *private* key. A key is a string, something like `93ce48570b55c42c2af816aeaba06cfee1224fae`, for example.

#### Transactions
We can perform **transactions** between nodes by transferring assets between their addresses. To make a transaction, we need a sender node, a receiver node, and the amount of assets to be transferred. A software manages transactions called a **wallet**, allowing users to send, receive, and exchange resources.

However, how can we know if a sender node has the amount of assets needed for a transaction? Also, how can we confirm that it is willing to do this transaction? One solution would be to introduce a central authority as an intermediary for transactions. That authority would check these questions and authorize or not the transaction. However, this is a trust-based model, as we need to blindly trust the central authorities.

#### The chain and the blocks
Blockchain tries to get around this issue of blindly trusting central authorities. Its solution is to use a **chain** of public transaction records grouped in **blocks**. On each transaction, the sender will specify its public address, and, to confirm the transaction, it must present its private signature. Each transaction block will be identified with a unique key and will store, in addition to its group of transactions, a timestamp and the key of its predecessor block.

This structure of blocks in sequence forms a chain of blocks and hence the name, `blockchain`. Changing a block at a certain point in the chain causes the entire chain to break from that block onwards. This happens because any change that happens in a block causes its key to be modified, invalidating the key data of the predecessor block that is stored in the next block and so on.

#### Mining and Proof of Work
There are a few more details that make it even more difficult to change the blockchain. First, for a block to be added to the chain, it needs to be **mined**. The nodes that work to mine blocks are called **miners**. To mine a block, a miner needs to solve a problem. Solving this problem is called **Proof of Work (PoW)**. A miner needs to find a number called *nonce* that validates some conditions to give PoW. To find this number requires a lot of computational power, and it can only be found through trial and error [around 10^(20) tries to find it](https://arxiv.org/abs/1708.08749). 

When a miner succeeds in giving a PoW for a block with a list of transactions, that block is added to the blockchain, and the transactions in it are confirmed. In addition, the miner receives a reward; some assets are given to it as an incentive for having mined a block. Then all nodes receive the news, a new block has been added to the chain! Let's update our records!`

Since Blockchain records are public, any node can check the chain to see if everything is as it should be. When a new node enters the network, all blocks and transactions from the first to the last are verified by the new user. Also, the version considered valid of the Blockchain is the **longest**.

So, for someone to modify a block in the chain, it would be necessary to keep that block and all the following blocks faster than the other miners in order to always maintain the **longest chain**. However, for this to be possible, it would be necessary to monopolize 51% of the mining resources, which is very unlikely to happen.

At this point, you should already get some sense of why some people want to use Blockchain in electronic voting. Let's talk about it now!

### E-voting and Blockchain: advantages and disadvantages
In a democratic voting process, **security** and **reliability** are essential. To achieve this, it is necessary to guarantee a long list of requirements. For example:

- A voter can only vote once. 
- Their *anonymity* and *voting secrecy* must be preserved. 
- There must be no way to prove that someone voted (in countries where voting is not mandatory) and/or for whom they voted. 
- Voting must be easy and accessible. 
- No voter or candidate can manage to manipulate the results.
- There needs to be *transparency* and *auditability* in the voting process.

One of the problems with e-voting is that it is almost impossible to satisfy all the requirements. Understand e-voting here as any voting system maintained over some form of hardware or software. We have several amazing and ingenious technologies to apply in these systems, but even so, they almost always require a trade-off. To guarantee one (or more) of the requirements, we need to give up totally or partially of others. With Blockchain, it won't be any different. But despite this, it is still promising.

Blockchain fraud is *theoretically* impossible when implemented correctly. The votes would be transferred as assets in the Blockchain, and changing or deleting votes would be [unfeasible](https://www.mdpi.com/1424-8220/21/17/5874). The voting process would not depend on an organization, institution, or government, that is, central authorities. 

In fact, this is the principle behind [Decentralized Autonomous Organizations](https://en.wikipedia.org/wiki/Decentralized_autonomous_organization) (DAOs) where organizations are driven by a common goal whose rules, operations, and decisions are stored in a Blockchain. These organizations work autonomously and as everything is done through the Blockchain, the rules are applied equally to all members and everything is transparent, making corruption difficult. This structure allows DAOs to be self-organized and non-hierarchical. [One of the most common uses of DAOs, thanks to their characteristics, is for voting and democratic decision-making, as they allow for open, transparent, and decentralized participation.](https://linda.mirror.xyz/Vh8K4leCGEO06_qSGx-vS5lvgUqhqkCz9ut81WwCP2o) 

Votes would be publicly stored on the Blockchain and distributed to all network nodes rather than stored on centralized servers. Thus, everyone could check the votes and follow the progression of the voting, whether voters or candidates, and they (probably) won't know who voted for whom because users do not use usernames or anything like that.

You may have noticed the "probably" wrapped in parentheses in the sentence above. Well, it's because it would be possible to know who voted for whom by somehow "stalking" or spying on the person to find out the address of their node. Also, you have to be very careful about Blockchain scalability issues. Due to its nature, that requires computational power and therefore requires time, since the Blockchain is slow. The process of forging new blocks is time-consuming. This means that on large polls, a Blockchain-based e-voting system would have problems. Not to mention the amount of energy that it would consume.

Now that we know some of the advantages and disadvantages of Blockchain, let's explore one use case where Blockchain is used in e-voting. The city of Moscow has experimented with this idea recently, and this experiment is what we are going to talk about!

### How Moscow implemented a Blockchain vote
Since 2019 to date, the city of Moscow has been performing e-voting [experiments](https://github.com/moscow-technologies/blockchain-voting_2021) using Blockchain. Or at least the idea behind it comes from Blockchain. Let's understand.

The Russian authorities decided to conduct an [experiment](https://habr.com/ru/article/480152/) on the public electronic voting process in September 2019 to test the hypothesis of using Blockchain as their base technology. In the tests, they identified some problems, but in general, the tests were successful. In a test poll in which students participated, the responsible team identified an attempted DDoS attack by one of the students, but the system managed to stop it. 

In the open tests, a French cryptographer was able to *identify a serious vulnerability* despite *not being able to fraud the system* within the time specified in the test (12 hours). After this vulnerability was found, the team made changes to improve security. In addition, several experts provided feedback that helped the team to continue making improvements to the system. In their system, the user authentication needs to go through a government domain, and thus, this is not a decentralized system like the "original" Blockchain proposes.

Users who wanted to vote electronically needed to apply and be approved to participate in e-voting. Upon entering the system, a voting ballot was displayed, and the user fills in their preferred candidate of choice and presses the `vote` button.

Users who wanted to could go to vote on computers distributed around the city. This option was usually chosen by people less digitally literate or specialist people who wanted to see the system working. On the Blockchain, there was the voter registry and the ballot registry that was thought of analogously to their physical counterparts. The voter registry was used to check the number of voters able to e-vote and the number of voters who participated in e-voting. The ballot registry stored the ballots encrypted until the end of the vote.

In 2020, after testing and feedback, some [improvements](https://ict.moscow/en/news/how-moscow-organized-voting-on-blockchain-in-2020/) were made. The Blockchain *infrastructure was geographically distributed* across data centers with two nodes (in each data center) to ensure system **robustness**.

In addition, an observer node was responsible for monitoring real-time results in a web interface. Still, on that subject of robustness and immutability, Blockchain was linked to a public network with more participants and more blocks.

To participate in electronic voting, users had to authenticate themselves with a verification code sent by SMS, gaining access to the ballot. When voting, the ballot was encrypted on the user's device and sent to the Blockchain. A series of additional security measures were implemented considering the possibility of connection drop or device problems.

To guarantee the **anonymity** and **confidentiality** of the vote, the voting page is not connected to any data or user identification. Before a vote is sent to the Blockchain, it is grouped with others and goes through a **mixer** that shuffles the votes of several people, giving greater secrecy.

### Conclusion
Blockchain is a relatively new technology and has its pros and cons in the context of e-voting. We have already seen its use cases in the real world, through startups and even political initiatives. There is still plenty of room for improvement. Still, it has been gaining ground and is a promising technology already being used in small and medium-sized applications in several different areas. Let's hope to see new improvements and ideas in the coming years!

### References
- [Bitcoin: A Peer-to-Peer Electronic Cash System. Satoshi Nakamoto.](https://bitcoin.org/bitcoin.pdf)
- [The great chain of being sure about things. The Economist.](https://www.economist.com/briefing/2015/10/31/the-great-chain-of-being-sure-about-things)
- [Blockchain for Electronic Voting System — Review and Open Research Challenges.](https://www.mdpi.com/1424-8220/21/17/5874)
- [Decentralized Autonomous Organizations.](https://en.wikipedia.org/wiki/Decentralized_autonomous_organization)
- [A Beginner's Guide to DAOs](https://linda.mirror.xyz/Vh8K4leCGEO06_qSGx-vS5lvgUqhqkCz9ut81WwCP2o) 
- [How Moscow organized voting on a Blockchain in 2020. ICT Moscow.](https://ict.moscow/en/news/how-moscow-organized-voting-on-blockchain-in-2020/)
- [Blockchain: a graph primer.](https://arxiv.org/abs/1708.08749) 
- [Cybernetic election v1.0: how the Blockchain voting system was created in Moscow.](https://habr.com/ru/article/480152/)

---
Peer Review Contributions by: [Willies Ogola](/engineering-education/authors/willies-ogola/)
