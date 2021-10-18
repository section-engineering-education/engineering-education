# Blockchain as a form of e-voting

### Table of Contents

- Introduction
- Blockchain
    - Features of Blockchain
- E-voting and Blockchain: Advantages and Disadvantages
- A Real-Life Example: How Moscow Implemented a Blockchain Vote
- Conclusion 

### Introduction

Satoshi Nakamoto, in his famous paper, [Bitcoin: A Peer-to-Peer Electronic Cash System](https://bitcoin.org/bitcoin.pdf) begins by talking about how the Internet's commerce and transaction system suffers from a trust-based model. Furthermore, Nakamoto mentions this model's need for a central authority that acts as an intermediary for transactions, that is, all the transactions must go through this central authority. Think, for example, of a bank. Nakamoto's proposal in his paper is that of a decentralized and secure technology as an alternative to this current model: the Blockchain.

Drawing a parallel with a voting process, its integrity and effectiveness also still depend on voters' trust and in the authorities that organized it. Electronic voting can improve some aspects of manual voting such as the speed, simplicity, and flexibility of the process. On the other hand, they bring red flags that deserve attention and care, such as issues of secrecy, privacy, transparency, and security.  Some places around the world have used some form of electronic voting or experimented with this voting model. In my country, Brazil, electronic voting machines have been used for elections since the 1990s, for example. In Moscow, an e-voting experiment was recently carried out using Blockchain as a backend.

In the words of The Economist, the Blockchain is a way of *" creating and preserving truths"* ([The great chain of being sure about things](https://www.economist.com/briefing/2015/10/31/the-great-chain-of-being-sure-about-things)). In fact, the technology has [promising properties for an electronic voting system such as anonymity, decentralization, transparency, immutability, and encryption](https://www.mdpi.com/1424-8220/21/17/5874). In this article, we will see what Blockchain is, then we will see how this technology can be used in electronic voting, its advantages, and problems, and end by talking a little about Moscow's experience using Blockchain in real-life voting.

### Blockchain

*If you already know the basics of how a Blockchain works, you can skip this section. Here I will make a brief introduction about the functioning and main features of Blockchain.*

#### Features of Blockchain

**This section of the text got quite long. So here's a *TL;DR*: Blockchain was designed to work in a *peer-to-peer* network. In this network, each user is called a *node*. Users can make *transactions* with each other. To do this, they need to specify the *public addresses* of their nodes and the *amount of assets* to be transferred from one node to the other. To confirm a transaction, the *sender* node presents its *private signature*. Transactions are stored as a group within so-called *blocks*.**

**Each block has a *unique key that identifies it* and also stores *the key of its predecessor*, forming a *chain of sequential blocks*, hence the name. *Any* change to a block in the chain would change its key, which *would break the chain* from the block onwards. The blocks are forged by nodes called *miners* who need to solve a problem using a lot of computational power, to give *proof of work*. When a miner gives proof of work, it *receives some assets* as a reward and *all nodes* add the new forged block to their chains.**

**The *valid* version of the Blockchain is the one that *has the most blocks*. As the Blockchain is public, each node can check if everything is as it should be. So, for someone to be able to change the chain, they would need to *monopolize 51% of the network's mining power* to always keep their version as the *longer version of the chain*, which is *very unlikely*.**

Blockchain was designed to work on a *peer-to-peer* network. Each user on that network is called a **node**. Each node has its **address**, a unique *public* key, and a **signature**, a unique *private* key. A key is a string, something like `93ce48570b55c42c2af816aeaba06cfee1224fae`, for example.

We can perform **transactions** between nodes by transferring assets between their addresses. That is, to make a transaction, we need a sender node, a receiver node, and the amount of assets to be transferred. Transactions are managed by a software called a **wallet**, which allows users to send, receive and exchange resources.

However, *how can we know if a sender node has the amount of assets needed for a transaction*? Also, *how can we confirm that it is willing to do this transaction*? One solution would be to introduce a central authority as an intermediary for transactions. That authority would check these questions and authorize or not the transaction. However, this is a trust-based model, as we need to *blindly trust* the central authorities.

Blockchain tries to get around this and its solution is to use a **chain** of *public transaction records* grouped in **blocks**. On each transaction, the *sender* will specify its public address and, *to confirm the transaction*, it must present its *private* signature. Each transaction block will be identified with a unique key and will store, in addition to its group of transactions, a *timestamp* and the *key of its predecessor block*.

This structure of blocks in sequence forms a chain of blocks and hence the name. It causes changing a block at a certain point in the chain to *break* *the entire chain* from that block onwards. This happens because *any change* that happens in a block *causes its key to be modified*, invalidating the key data of the predecessor block that is stored in the next block and so on.

There are a few more details that make it *even more difficult to change* the Blockchain. First, for a block to be added to the chain, it needs to be **mined**. The nodes that work to mine blocks are called **miners**. To mine a block, a miner needs *to solve a problem*. Solving this problem is called **Proof of Work**. Basically, to give Proof of Work a miner needs to find a number called *nonce* that validates some conditions. To find this number requires a lot of computational power and it can only be found through trial and error ([around $10^{20}$ tries to find it](https://arxiv.org/abs/1708.08749)). When a miner *succeeds* in giving a Proof of Work for a block with a list of transactions, that block is added to the Blockchain and the transactions in it are confirmed. In addition, the miner receives a reward: some assets are given to it as an incentive for having mined a block. Then all nodes receive the news: a new block has been added to the chain! Let's update our records!

Since Blockchain records are public, *any node can check the chain* to see if everything is as it should be. When a new node enters the network, *all blocks and transactions, from the first to the last, are verified by the new user*. Also, the version *considered valid* of the Blockchain is the **longest**. So, for someone to modify a block in the chain, *it would be necessary to remine it and re-mine **all the following blocks faster** than the other miners* to always maintain the **longest chain**. However, for this to be possible, it would be necessary *to monopolize 51% of the mining resources*, which is *very unlikely* to happen.

*Phew!* There are so many details! At this point, you should already get some sense of why some people want to use Blockchain in electronic voting. *Let's talk about it now!*

### E-voting and Blockchain: Advantages and Disadvantages

In a democratic voting process, **security** and **reliability** are *essential*. To achieve this, it is necessary to guarantee a long list of requirements. A voter can only vote *once*; their *anonymity* and *voting secrecy* must be preserved; there must be *no way* to prove that someone voted (in countries where voting is not mandatory) and/or *for whom* they voted; voting must be *easy* and *accessible*; *no* voter or candidate can manage *to manipulate the results*; there needs to be *transparency* and *auditability* in the voting process, and the list goes on.

One of the problems with e-voting is that it is almost *impossible* to satisfy *all* the requirements. *Understand e-voting here as any voting system that is maintained over some form of hardware and/or software.* We have several *amazing* and *ingenious* technologies to apply in these systems, but even so, they almost always *require a trade-off*: to guarantee one (or more) of the requirements, we need to *give up totally or partially* of others. Let's already say that with Blockchain it won't be different. But despite this, it is still promising.

When *implemented correctly*, Blockchain fraud is *theoretically* impossible:  [the votes would be transferred as assets in the Blockchain, and changing or deleting votes would be unfeasible](https://www.mdpi.com/1424-8220/21/17/5874). The voting process *would not depend* on an organization, institution, or government, that is, central authorities. Votes would be *publicly stored* on the Blockchain and *distributed to all network nodes* rather than being stored on centralized servers. Thus, everyone could *check the votes and follow the progression of the voting*, whether voters or candidates, and they (probably) *could not know who voted for whom* because users *do not use usernames* or anything like that.

You may have noticed the *"probably"* in parentheses in the sentence above. Well, it's because it would be possible to know who voted for whom by somehow *"stalking" or spying* on the person to find out the address of their node. Also, you have to be *very careful about Blockchain scalability issues*. Due to its nature that *requires computational power* and therefore *requires* *time*, **the Blockchain is slow**. The process of forging new blocks *is time-consuming*. This means that on large polls, a Blockchain-based e-voting system *would have problems*. Not to mention the *amount of energy* that would be consumed.

Now that we know some of the advantages and disadvantages of Blockchain, it would be nice if someone had already tried to do an e-voting with Blockchain so that we would know how it went and what happened. Fortunately, the city of Moscow has *experimented* with this idea recently and this experiment is what we are going to talk about!

### A Real-Life Example: How Moscow Implemented a Blockchain Vote

In 2019, in 2020, and [apparently in 2021 as well](https://github.com/moscow-technologies/blockchain-voting_2021), the city of Moscow has been doing *e-voting experiments using Blockchain*. Or at least the idea behind it comes from Blockchain. Let's understand.

[The Russian authorities decided to carry out an experimental and public electronic voting process in September 2019 to test the hypothesis of using a technology such as Blockchain](https://habr.com/ru/article/480152/). In the tests, some problems were identified, but in general, the tests were successful. In a test poll in which students participated, the responsible team identified an *attempted DDoS attack* by one of the students, but the system managed to stop it. In the open tests, a French cryptographer was able to *identify a serious vulnerability* despite *not having been able to fraud the system* within the time specified in the test (12 hours). After this vulnerability was found, the team made changes to improve security. In addition, several experts provided feedback that helped the team to continue making improvements to the system. One thing we can also notice is that *user authentication needs to go through a government domain and thus this is not a decentralized system* like the "original" Blockchain proposes.

Users who wanted to vote electronically *needed to apply and be approved to participate in e-voting*. Upon entering the system, a voting ballot was displayed and the user could fill it in and press the "vote" button. Users who wanted to could go to vote on computers distributed around the city. This option was usually chosen by people less digitally literate or specialist people who wanted to see the system working. On the Blockchain, there were *the voter registry* and *the ballot registry* that were *thought of analogously to their physical counterparts*: the voter registry was used to check the number of voters able to e-vote and the number of voters who actually participated in e-voting, and the ballot register *stored the ballots encrypted until the end of the vote*.

[In 2020, after testing and feedback, some improvements were made](https://ict.moscow/en/news/how-moscow-organized-voting-on-blockchain-in-2020/). The Blockchain *infrastructure was geographically distributed* across data centers with 2 nodes (in each data center) to ensure system **robustness**. In addition, there was an observer *node* that was responsible for monitoring *real-time results* in a web interface. Still thinking about *robustness* and **immutability**, Blockchain was *linked to a public network with more participants and more blocks*.

To participate in electronic voting, users had to *authenticate themselves* with a verification code sent by SMS, gaining access to the ballot. When voting, *the ballot was encrypted on the user's device* and sent to the Blockchain. A series of additional security measures were implemented considering *the possibility of connection drop or device problems*.

To guarantee the **anonymity** and **confidentiality** of the vote, the voting page *is not connected to any data or user identification* and, *before* a vote is sent to the Blockchain, *it is grouped with others* and goes through a **mixer** that *shuffles* the votes of several people, giving greater secrecy.

### Conclusion

Blockchain is a relatively new technology and has its pros and cons in the context of e-voting. We are already starting to see its use in the real world, through startups and even political initiatives. There is still plenty of room for improvement, but it has been gaining ground and being promising and is already being used in small and medium-sized applications in several different areas. Let's hope to see new improvements and ideas in the next years!

### References

- [Bitcoin: A Peer-to-Peer Electronic Cash System. Satoshi Nakamoto.](https://bitcoin.org/bitcoin.pdf)
- [The great chain of being sure about things. The Economist.](https://www.economist.com/briefing/2015/10/31/the-great-chain-of-being-sure-about-things)
- [Blockchain for Electronic Voting System — Review and Open Research Challenges.](https://www.mdpi.com/1424-8220/21/17/5874)
- [How Moscow organized voting on a Blockchain in 2020. ICT Moscow.](https://ict.moscow/en/news/how-moscow-organized-voting-on-blockchain-in-2020/)
- [Blockchain: a graph primer.](https://arxiv.org/abs/1708.08749) 
- [Cybernetic election v1.0: how the Blockchain voting system was created in Moscow](https://habr.com/ru/article/480152/)