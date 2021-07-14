---
layout: engineering-education
status: publish
published: true
url: /a-beginners-guide-on-how-to-become-a-blockchain-developer/
title: A Beginners Guide on How to Become a Blockchain Developer
description: In this article, we will explore how to become a blockchain developer without prior coding experience. 
author: wilkister-mumbi
date: 2021-06-30T00:00:00-15:00
topics: [Blockchain]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/a-beginners-guide-on-how-to-become-a-blockchain-developer/hero.jpg
    alt: Blockchain Hero Image
---
If you are reading this article, I am sure you are wondering whether blockchain development is for you. This might be because you might be having no prior coding experience or because you might not be quite technologically savvy. Or it might be simply overwhelming to find a starting point.
<!--more-->

I felt the same way some few years back.

While I was introduced to technology at a young age, I felt overwhelmed by the process to become a software developer. I struggled to learn at first. But in hindsight, what it took was continuous perseverance and eventually, it paid off. 

This is the same case with blockchain development. It might seem daunting but once you get the hang of the concepts which I'll mention in this article, you will have some clarity.  

Let's get started!

### Prerequisite
Before reading this article, you need to be familiar with blockchain technology and its fundamentals. You can start with the following articles:
- [Building a Simple Cryptocurrency Blockchain using Node.js](/engineering-education/building-a-simple-cryptocurrency-blockchain/)
- [Blockchain as a Revolution in Healthcare](/engineering-education/blockchain-as-a-revolution-in-healthcare/)

### Table of contents
1. [Who is a blockchain developer?](#who-is-a-blockchain-developer)
2. [Which blockchain should I use?](#which-blockchain-should-i-use)
3. [Libraries and frameworks for blockchain development](#libraries-and-frameworks-for-blockchain-development)
4. [Which programming languages for blockchain?](#which-programming-languages-for-blockchain)
5. [Use cases for blockchain](#use-cases-for-blockchain)

### Who is a blockchain developer?
There are two types of blockchain developers:

#### 1. Core blockchain developers
These developers are mainly responsible for building the back-end (main engine) of Decentralized Applications (Dapps). Examples include the Ethereum, Bitcoin, and Cardano Blockchains.

These developers typically write code using C++, Go, and Haskell.

#### 2. Blockchain software developers
These developers are mainly responsible for designing and building the front-end of Dapps. The web and mobile interfaces that users interact with. Most blockchain developers fall under this category.

They mainly write code using Solidity and Javascript programming languages.

Let's use an example to explain the distinction between blockchain core developers and software developers. 

Web developers build web applications on top of web browsers. But, they don't build web browsers. The "Mozillas" of this world build the web browsers (main engine). Similarly, core blockchain developers build the "browser" (main blockchain network) while blockchain software developers build apps on top of the blockchain.

### Which blockchain should I use?
#### 1. Bitcoin blockchain
This is the distributed ledger powering the Bitcoin cryptocurrency. This blockchain uses [Proof-of-Work (PoW)](https://en.wikipedia.org/wiki/Proof_of_work) as its consensus mechanism. Recently, this consensus mechanism has been a bone of contention as PoW uses a lot of energy. You can read more about it [here](https://www.cnet.com/personal-finance/heres-how-much-energy-it-really-takes-to-mine-bitcoin-and-why-people-are-concerned/). 

The Bitcoin blockchain doesn't have any other usage other than powering the cryptocurrency. 

#### 2. Ethereum blockchain
The Ethereum blockchain is a decentralized and open-source smart contracts platform. The smart contract functionality that enables Dapps to be built on it has made it the most actively used blockchain platform. 

It currently uses PoW as its consensus mechanism but aiming to replace it with [Proof-of-Stake (PoS)](https://en.wikipedia.org/wiki/Proof_of_stake) due to the high energy consumption of PoW. 

It is also the blockchain technology that powers the popular cryptocurrency, Ether (ETH).

Learn more about it [here](https://ethereum.org/en/).

#### 3. Cardano blockchain
It is a decentralized and open-source blockchain platform that utilizes Proof-of-Stake (PoS) as its consensus mechanism. It is the blockchain platform that powers the popular cryptocurrency known as Ada. 

Unlike the Ethereum blockchain, Cardano is developed through evidence-based methods and peer-reviewed research. This means that proposed methods have to undergo academic-type research before being implemented.

This blockchain technology is built on the Haskell programming language commonly used in the banking and financial industry. 

> Unless you really have to use a different blockchain for development, I recommend that you use the Ethereum blockchain. It has the biggest developer community for building blockchain-based applications. As a developer, you definitely wouldn't want to get stuck and not have a community for support.

### Libraries and frameworks for blockchain development
1. [Web3.js](https://web3js.readthedocs.io/en/v1.3.4/)

This is a collection of libraries that allows you to interact with the Ethereum node either remotely or locally using HTTP, Websocket, or IPC.

2. [React.js](https://reactjs.org/)

This is an open-source javascript library that enables programmers to build beautiful user interfaces. You can use any other framework as well.

3. [Ethers.js](https://docs.ethers.io/v5/)

It is a collection of libraries that allows you to interact with the Ethereum blockchain and its ecosystem.

4. [Metamask](https://metamask.io/)

It is a cryptocurrency wallet and a browser extension that allows a user to buy, store, and swap tokens on the Ethereum blockchain or any other blockchain.

5. [Node.js](https://nodejs.org/en/)

It is a back-end JavaScript runtime environment that executes javascript code outside a web browser. Decentralized applications usually use node.js to interact with smart contracts and public nodes.

6. [Ganache](https://www.trufflesuite.com/ganache)

It is a library developers can use for Ethereum blockchain development. It enables developers to develop, deploy, and test decentralized applications in a safe and deterministic environment without interacting with the main Ethereum blockchain.

### Which programming languages for blockchain?
1. [Solidity](https://docs.soliditylang.org/en/v0.8.6/)

This is the programming language that is used for creating Ethereum smart contracts.

2. [Javascript](https://www.javascript.com/)

It is used primarily for creating user interfaces. 

3. [Go](https://golang.org/) and [C++](https://www.cplusplus.com/)

These two languages are used by the blockchain core developers to build the back-ends of blockchain systems.

4. [Haskell](https://www.haskell.org/)

This is the programming language used by core blockchain developers in building the Cardano blockchain.

#### Note
Solidity is still currently the most popular programming language of choice for many developers. This is due to its large developer community. Unless you have a specific use case or you're a blockchain core developer, I suggest you stick with Solidity.

### Use cases for blockchain
#### 1. Finance
##### Cryptocurrencies
Today, there are over 5,000 cryptocurrencies. This is according to [CoinMarketCap](https://coinmarketcap.com/), a company that tracks cryptocurrencies' market caps, rankings, prices, exchange volumes, and currency conversion. However, the most popular cryptocurrencies in this space include [Bitcoin](https://bitcoin.org/en/), [Ethereum](https://ethereum.org/en/), [Cardano](https://cardano.org/) and [Polkadot](https://polkadot.network/).

People tend to think that cryptocurrencies are the only blockchain's use case. This is not the case. But, it is the biggest use case for blockchain. 

As a blockchain developer, you can build and launch a token. You may even go all the way and build your own cryptocurrency. But there is a catch. With the high number of cryptocurrencies and tokens out there, it is advisable to develop a token (or cryptocurrency if feasible) that tries to solve real-world problems. Otherwise, it'll be hard to gain traction or survive in the long term.

A good example is Cardano with their [Cardano Africa](https://africa.cardano.org/) project. They aim to use Ada (name of Cardano's cryptocurrency) is to try and solve some of the financial problems currently experience in less developed countries such as accessibility to loans. This is a luxury enjoyed by many people in developed worlds. 

It is also important to note that it is challenging to create a cryptocurrency. This is due to the vast amount of resources needed and distrust from potential users due to the reputation of Initial Coin Offerings (ICOs). 

The reputation of ICOs to investors has been dwindling recently due to the lack of transparency of the companies that run these ICOs. ICOs have also been subjected to a large number of scams. Poorly informed investors have become victims of these scams which have led to them losing money. 

Lastly, as a developer, it is key to understand the difference between a token and a coin when it comes to cryptocurrencies. We use tokens and coins interchangeably when talking about cryptocurrencies. 

A cryptocurrency coin is classified as a store or exchange of value. For example, Bitcoin is a coin and not a token. You can use it as a store or exchange of value, like a currency. A token is a digital representation of an asset that can be exchanged using the blockchain network. Ethereum falls under this category with its ERC-20 tokens. The difference between the two is a bit cloudy but the difference is still there. Read this [blog post](https://blog.liquid.com/coin-vs-token) to understand the differences in depth.

As a blockchain developer, you need to think along those lines.

##### Decentralized Finance (DeFi)
Currently, the adoption of DeFi is trending in the blockchain world. DeFi aims to replace the existing traditional finance system. It essentially takes financial products and moves them onto the blockchain ecosystem. A few examples of these products include savings, loans, and trading.

Taking a look at the 1-year chart on [DeFi Pulse](https://defipulse.com/), you will notice how the adoption of DeFi has skyrocketed over the last few months.

Currently, most of the DeFi runs on the Ethereum blockchain. Popular DeFi projects in the market today include [Maker](https://makerdao.com/en/), [Aave](https://aave.com/), [Compound](https://compound.finance/), [Polygon](https://polygon.technology/) and [Uniswap](https://uniswap.org/). Maker, Aave, and Compound are used as lending platforms, Polygon (Indian blockchain) as a payment platform, and Uniswap for decentralized exchange (DEX).

As a blockchain developer and a techie in general, you should be ambitious enough to build such platforms.

#### 2. Supply Chain
The supply chain system involves tracking the movement of goods or services from a source to an end-user. Big companies such as Walmart use it to increase supply chain transparency. Using blockchain technology helps ensure that distributors across the supply chain are honest and transparent.

#### 3. Digital Identity
Cardano has partnered with [Atala Prism](https://atalaprism.io/app) to enable the issuance of digital identities and credentials that users own, control, and share easily, both securely, and privately. Building it on Cardano's blockchain eliminates the need for having a third party offers verification services. 

They recently secured a deal with the Ethiopian government where they are planning to issue over 5 million students with digital identities. Learn more about the deal [here](https://www.forbes.com/sites/rachelwolfson/2019/04/30/cardano-founder-launches-enterprise-blockchain-framework-in-collaboration-with-ethiopian-government/?sh=50d7424e4e10). As a blockchain developer, you can build digital identity systems that secure digital IDs, degrees, certificates, transcripts, examinations, and badges, etc. on the blockchain.

#### 4. Healthcare  
In healthcare, blockchain can be used for record-keeping & medical history tracking, patient & drug identity validation, and to offer direct healthcare service payments. 

This [article](https://www.section.io/engineering-education/blockchain-as-a-revolution-in-healthcare/) explains clearly how blockchain technology is used to enable these services in healthcare. These are a few use cases for blockchain technology. It can also be used to secure title deeds in real estate and to secure voting systems from tamper in democratic countries.

### Wrapping Up
In this article, I have explained how you can become a blockchain developer and take advantage of this lucrative field. 

It is wrong to assume that since you may have no prior coding experience, this niche is not for you. As with any skill, blockchain development is mastered over time. This guide gives a starting point. However, it is your responsibility to continuously learn, try and practice. As they say, practice makes perfect.

Good luck!

### References
[Blockchain For Beginners: The Complete Step By Step Guide To Understanding Blockchain Technology](https://www.amazon.com/Blockchain-Beginners-Complete-Understanding-Technology/dp/1548766887)

---
Peer Review Contributions by: [Collins Ayuya](https://www.section.io/engineering-education/authors/collins-ayuya/)
