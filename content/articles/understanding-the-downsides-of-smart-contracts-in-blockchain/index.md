---
layout: engineering-education
status: publish
published: true
url: /understanding-the-downsides-of-smart-contracts-in-blockchain/
title: Understanding the Downsides of Smart Contracts in Blockchain
description: This article will cover in detail the downsides associated with smart contracts that are used in blockchain technology.
author: lilian-ogoti
date: 2022-05-15T00:00:00-10:00
topics: [Blockchain]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/understanding-the-downsides-of-smart-contracts-in-blockchain/hero.jpg
    alt: Understanding the Downsides of Smart Contracts in Blockchain hero image
---
In the [blockchain](https://www.ibm.com/topics/what-is-blockchain) world, [cryptocurrency](https://www.nerdwallet.com/article/investing/cryptocurrency) is the most popular concept discussed worldwide. However, the [smart contracts](https://www.ibm.com/topics/smart-contracts) concept is catching up with the pace in this digital economy.
<!--more-->
The smart contracts' benefits cut across various insurance, healthcare, and logistics industries. However, the dilemma remains whether smart contracts are what they are presumed to be. There is no doubt that smart contracts will be helpful in the future. 

However, it is better to separate the truth from the hype. The technology has much potential. However, there are still technological and legal factors limiting its successful implementation.

This article will cover in detail the downsides associated with smart contracts.

### The concept of smart contracts in blockchain
Smart contracts are algorithms that handle the automation of contracts. They perform deal-making, sell realtors, and the exchange of money, documents, are shared easily. Smart contacts implementation does not allow intermediary services to complete a transaction. These intermediaries are brokers, agents, and notaries.

Smart contracts refer to a program that runs once all involved parties meet specific terms. They use conditional statements that trigger an action to perform a given task. Technically, smart contracts can be described as [self-executing](https://www.geeksforgeeks.org/what-is-the-self-executing-function/) code. Developers can code the [business logic](https://www.investopedia.com/terms/b/businesslogic.asp) that instructs smart contracts before being deployed on the blockchain. Therefore, smart contracts can be regarded as independent as they do not need third-party control.

Smart contracts are popular because they are independent. However, they tend to lack centralized control, meaning the software can enforce its provisions without a trusted third party.

### Analogy of contracts
We must first understand how contracts work before covering smart contracts. A typical contract contains the following elements:
- The offer
- The acceptance
- The transaction

We can assume a landlord renting a house to understand these elements better. We can agree with the landlord to rent a house for three weeks at $30 every week.

The three parts of the contract will follow below:

#### The offer
The [offer](https://www.upcounsel.com/what-is-an-offer-in-law-of-contract) will represent the promise we give to the landlord that we will pay $30 every week for three weeks. An offer indicates the obligations between two parties, giving an exchange of value between them.

#### The acceptance
[Acceptance](https://www.upcounsel.com/elements-of-acceptance-in-contract-law) refers to the agreement between the terms offered by one party. In our example, the landlord would agree to rent the house for three weeks, provided we pay $30 each week.

#### The transaction
In the [transaction](https://smallbusiness.chron.com/contractual-transaction-marketing-33390.html) stage, each party honors its obligations as per the agreement. In our example, we pay our $30 as the house rent, and the landlord rents us the house. It is the stage where the performance of the contract is realized.

If the landlord fails to rent us the house key after payment, it will violate the contract. The same happens if we refuse to honor the payment for the second week after completing the first one.

The contract law states well that if any party fails to honor the agreement, they can be sued for the action. So, we can conclude that contracts allow the involved parties to trust each other. The reason is that there is a trusted intermediary to enforce the agreements.

### How does a smart contract work?
Smart contracts ensure that no intermediary enforces the agreement. The code, in this case, acts as the third-party validator. Once the party has met the set conditions, the smart contract’s business logic processes the clauses coded in the agreement.

A good example we can use to explain the analogy of smart contracts is how vending machine works. It releases a snack/drink once the user has made the payments. It does not require an intermediary or operator since it has been developed to release a snack/drink once the payments are made.

Smart contracts work the same as vending machines, and the only difference is that they are more diverse than processing the payments. They are often used in [Defi](https://ethereum.org/en/defi/) systems, exchange of [NFTs](https://ethereum.org/en/nft/), and many others.

### Reasons for smart contract's popularity
Smart contracts come with several advantages, as highlighted below:

- **Transparency:** It happens by monitoring the transactions between the parties undertaking the contract in a blockchain. This ensures there is transparency between the transactions.
- **Immutability:** Smart contracts cannot be changed or tampered with by any parties or creators. Its rules cannot be changed or overwritten once the contract has been hosted on the blockchain ledger. Thus, making smart contacts useful.
- **Manages transactions:** As mentioned earlier, parties or companies cannot change the contract’s agreement terms once it has gone live. This is useful in handling different transactions in the blockchain. Fast processing of transactions occurs since smart contracts utilize simple logic to perform that. Also, users are assured that their claims will be processed faster, leading to quick payouts.
- **Minimal paperwork:** Smart contracts ensure there will be less paperwork involved as it does not need the lawyers to set up an agreement. Also, less time is involved as no pre-contract talks are involved in the agreements.

### Challenges faced by smart contracts
As we have seen, smart contracts are helpful, but they also face problems, as explained in the following section.

#### External data issues
For a smart contract to execute, it must be provided prior information. For example, a smart contract can indicate that `Person A` should receive money from `Person B` after paying for given goods. The smart contract would need to have prior information about when the goods are arriving. Then it can proceed to process the payment for `Person A`. 

However, blockchain is not allowed to communicate outside the network. This presents a challenge to smart contracts. To curb this challenge, smart contract developers use [oracles](https://ethereum.org/en/developers/docs/oracles). Oracles are the applications that fetch data from outside. Then the data is fed on the blockchain for smart contacts to use. In the above example we highlighted, an oracle can assist in feeding data from an external source. It would, in turn, help the smart contract to examine if the product has been delivered.

Also, relying so much on oracles poses another smart contract challenge. The users are forced to trust that the data provided by the oracle is accurate and precise. Also, the smart contract can produce more errors. Smart contracts can suffer from [Garbage In, Garbage Out](https://marketbusinessnews.com/financial-glossary/gigo-garbage-in-garbage-out) (GIGO) challenges during their initial development.

The challenge can be solved by using information from different oracles. However, this will increase the transactional costs since oracles are paid. Furthermore, it is not advisable to rely on information from various sources as it violates [consensus](https://ethereum.org/en/developers/docs/consensus-mechanisms/) rules.

Note that every node in a system has to conform to the state of the contract. Otherwise, the transaction will be treated as invalid. Nodes receiving information from various oracles may not reach a consensus.

#### Immutability
One of the main challenges blockchains faces is the immutability of smart contracts. Immutability means that the rules of a protocol cannot be modified once smart contracts are deployed on the blockchain.

It is the truth that they assist in locking out the bad actors that may change the contract information. However, they make smart contracts challenging to use. This means anyone who wants to change the contract and reflect on the agreement. It would be impossible as the smart contract does not allow it.

The immutability of smart contracts makes it impossible to fix a bug found in the code. This leaves the developers limited options to offer solutions whenever a bug arises.

#### Confidentiality issues
Blockchain exposes the transaction information of all activities performed by nodes. The information helps ensure transparency and prevent fraud as the users can access it.
However, most users would not want confidential information about their contracts accessible to everyone. 

Users want such information to be confidential and accessible only by them. A good example would be the hidden source code data found in the HTML file of a webpage. Users can use the [View Source](https://www.computerhope.com/issues/ch000746.htm) function to view information, thus violating confidentiality.

The same happens with smart contracts, and malicious users can interfere with the blockchain application to reveal the state of the contract. So, it would mean that the privacy and confidentiality of the user's data are violated. Furthermore, this lack of privacy in smart contracts dramatically interferes with the trust of its users.

#### Legal issues
In using smart contracts, lawyers are not required to witness and sign the agreements. However, this is risky as no official law protects a smart contract's legality. If one party violates the contract, there is a risk of losing that transaction.

Most smart contracts are not governed or controlled by law. This lack of legal support is one of the significant challenges limiting smart contracts. However, if the usage of smart contracts grows, the situation may change.

Legal issues will remain a limiting factor to the adoption of smart contracts. There is still a need for a law that can act as a trusted intermediary.

#### Security concerns
Smart contracts can still develop errors which can be damaging and have a huge impact compared to usual software bugs. Nowadays, smart contracts are powering the Defi systems. This means that a single loophole or vulnerability can create considerable losses to the users.

However, smart contracts are improving, and security would not be of significant concern. The problem is that most smart contracts projects concentrate on marketing and acquiring new users. Thus, they are less concerned about the security of the system.

#### Simplicity nature
Smart contracts are simple and unable to work in imaginary cases. They have to undergo radical upgrades. Any code should not contain ambiguous statements that are difficult to represent in binary. This presents a challenge for smart contracts.

It is not challenging to program a smart contract that accepts payments and initiates the transfer of a given product. However, the challenge arises when writing ambiguous statements, which brings the dilemma of how they can be represented in a code.

In conclusion, smart contracts may not be helpful where interpretation of ambiguous statements is needed in a given agreement. However, they can be used in simple applications such as cryptocurrency transactions. In these transactions, data is on blockchain and can be understood easily.

### Wrapping up
Smart contracts are still facing several challenges. However, they can be helpful as they develop to be better off. It is the aspiration of all blockchain users that smart contracts become a reality in the future.

Developers have a massive task of addressing these shortcomings faced by smart contracts. Smart contracts can be hugely adopted if all improvements suggested are taken into place. In the future smart contracts, technology is promising and will be more helpful.

Happy reading!

### Further reading
- [Understanding Oracles, Smart Contracts, and the Oracle problem](https://101blockchains.com/blockchain-oracle-problem/).
- [Overview of Consensus Mechanisms](https://medium.com/hackernoon/a-brief-introduction-to-consensus-mechanisms-smart-contracts-and-distributed-apps-on-the-a94453d16c3a).
- [A Dive into Smart Contracts and Defi](https://coinmarketcap.com/alexandria/article/a-dive-into-smart-contracts-and-defi).

---
Peer Review Contributions by: [Wilkister Mumbi](/engineering-education/authors/wilkister-mumbi/)
