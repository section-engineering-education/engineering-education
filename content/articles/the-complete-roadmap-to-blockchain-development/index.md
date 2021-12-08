---
layout: engineering-education
status: publish
published: true
url: /the-complete-roadmap-to-blockchain-development/
title: A Complete Roadmap to Blockchain Development
description: In this tutorial, we will look at how you can become a top blockchain developer. The tutorial provides an overview of blockchain development and explains what you need to know for you to become an elite blockchain developer.
author: eugiene-kanillar
date: 2021-12-08T00:00:00-12:20
topics: [Blockchain]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/the-complete-roadmap-to-blockchain-development/hero.jpg
    alt: Blockchain Development Hero Image
---
In mainstream media, talks about cryptocurrencies and how people are becoming millionaires is increasingly buzzing. We often hear that cryptocurrencies will not only render the banks useless but also ensure anonymity and security in financial transactions. However, this is only the surface. Cryptocurrencies are an example use case of an underlying technology called the blockchain.
<!--more-->
Not so many people can explain what blockchain is, let alone how the technology is applied in cryptocurrencies. Blockchain is not a fad based on the amount of money that investors are putting into its research. In addition to that, new use cases emerge frequently, the most recent being the application of blockchain to create non fungible tokens (NFTs). 

Additional use cases of the blockchain include secure sharing of medical data, anti-money laundering systems, and music royalties tracking. It is quite evident that blockchain technology will affect crucial aspects of our lives thus creating a myriad of opportunities for blockchain developers in the near future. 

This article will give you a road map on how you can become a blockchain developer and prepare yourself for the future. As the old saying goes "Opportunity favors the prepared mind". Somebody with no technical background can follow along with this article.

### Blockchain development introduction
A blockchain is a network of computers connected in some way and they collectively run what is called a blockchain client. The Bitcoin blockchain, Binance smart chain, and the Ethereum blockchain are examples of blockchain clients.

There are two main types of developers in this technology:
1. Core developers
2. App developers

#### Core developers
Core developers are involved in what is called core development, a cliche right?. In core development, the developer writes the code for a blockchain client. Low-level programming languages are used in writing blockchain clients. 

These include  C, C++, Golang and Rust. In core development, you need to know the operating system of a computer, file system, and networking. However, core development is not for the faint of heart. 

It takes time, practice, and commitment. Blockchain core developers are rare to find and usually prefer to remain anonymous as is the case of Bitcoin's founder under the pseudo name Satoshi Nakamoto.

#### App developers
Blockchain app development is what most blockchain developers do and it is what most people usually refer to when they mention blockchain development. In blockchain app development, we build apps on top of a blockchain client instead of creating a whole blockchain from scratch.

This is analogous to web development whereby web developers usually build web applications on top of web browsers. They do not build web browsers each time they are building an app. A question arises. Which blockchain client should you consider learning to become a blockchain app developer? 

A lot of factors are to be considered in choosing a blockchain client such as scalability, transaction fees, and the level of privacy your application requires. The Etherium blockchain used to be the topmost blockchain providing all the features mentioned above plus more. 

As at the time of writing this article, it is being challenged by other blockchains such as the Binance smart chain which is more scalable and has significantly reduced transaction charges. However, this is not to dismiss the Ethereum blockchain as other blockchains such as the Tron blockchain and the Binance smart chain employ the Ethereum blockchain underlying technology. 

They run using an [EVM](https://coinmarketcap.com/alexandria/glossary/Ethereum-virtual-machine-evm) (Etherium Virtual Machine). This means that if you learn the Ethereum blockchain you will be able to develop in these other blockchains more easily. This is the network effect of the Ethereum blockchain. 

The Ethereum blockchain has reached a "critical mass" which in layman's terms means that it is indispensable. A technology's critical mass is determined by the number of users of that technology, the number of developers involved, and the amount of money put in by investors of which the statistics for the Ethereum blockchain are excellent.

### What you need to know
#### 1. The Etherium blockchain
As discussed in the previous section, it is recommended that you get started with the Ethereum blockchain as it is very popular and other promising blockchains such as the Binance smart chain and the Tron blockchain are based on the Ethereum technology. The tech stack is the same.

For a popular blockchain such as the Ethereum blockchain, it would mean that there is a lot of technical support from its developer's team plus the community of users on social media platforms.
For the Ethereum blockchain, you will need to understand some of its important and core concepts such as:
- What data structure is used?
- What is its proof of work (POW) algorithm?
- What are public and private keys and how are addresses generated?
- What is a transaction?
- What is a smart contract?
- How does a wallet work?

#### 2. Web development
One mistake that most newbies make is to dive straight into smart contracts without having a technical background in web development. Blockchain technologies are built on top of web technologies and so before you get deep into blockchain development you need to understand the fundamental concepts of web development.

In web development we have two parts:
1. Front-End 
2. Back- End

##### Front-end
The front-end is the part where the user interacts with our application. The languages involved are HTML for the structure of the page, CSS for styling the page, and JavaScript which enables the user to connect to the blockchain and display data to the user.

Learning a framework would enable you to build a dynamic user interface quite quickly though that's optional if you have the patience to build everything from scratch. For a suitable framework, it is recommended that you learn "react", which is a JavaScript-based framework.

##### Back-end
For the back end, it is advantageous to learn Node.js, which is JavaScript but on the server-side. What makes Node.js suitable is the NPM package manager. It enables you to install dependencies and tools for blockchain development.

#### 3. Smart contract development
Now we reach the buzzword (smart contract). In simpler terms, a smart contract is a program that lives on top of the blockchain and constitutes a set of rules agreed upon by the involved parties. 

After execution, if these set of rules are met, the smart contract executes itself to give an output. The program enables decentralized automation by facilitating, verifying, and enforcing the conditions of an underlying agreement. The self-executing feature of a smart contract is what makes it very important. 

Smart contracts enable you to exchange anything of value while also eliminating the middle man and thus you get a fair deal. In the physical world, the process of buying land you would need a lawyer, whom you pay for their services first, to obtain and notarise the land transfer documents. 

You may also make small payments to the local authorities before the whole process is complete. But with a smart contract, you would only pay for the land and just that. In turn, the owner would transfer ownership to you by changing the name on the land title declaring you as the new owner. The transfer of ownership is kept in a public ledger and thus you would not require middlemen such as the lawyer.

The code of a smart contract cannot be changed, which in technical terms we say is immutable. However, the data is mutable (it can be changed). Contrary to normal code, changing the data of a smart contract usually costs money depending on the complexity of the code. This is because execution requires a lot of computational power which varies linearly with the complexity of the code. 

Therefore, when designing a smart contract, we write as simple code as possible to reduce the execution costs incurred when you change the data of the smart contract. This is what is known as "gas optimization". Gas optimization is one of the key aspects that sets the different blockchains apart in terms of adoption by users. It is for this computational power that you pay a small fee when using a smart contract.

The good thing about smart contracts is that you can move money within itself. To better understand this, let us say that you had normal code which required computational power for which the users would need to pay a small amount. 

You would first need to integrate it with a payment service such as Skrill, Neteller, or Paypal but first, you would need permission for that. You would also be constrained by the API in this scenario. 

However, in a smart contract, you can write any logic to move the money around and distribute the fees charged to the owners who have dedicated their computers to do the complex computations in changing the data of the smart contract.

#### Solidity
Knowing how to write smart contracts is the most important thing in blockchain app development. The demand for smart contracts in several fields, not just finance has led to an increased salary for developers hitting the highs of $250,000 annually. 

There are a couple of programming languages used in writing a smart contract but the most popular one is *Solidity*. The syntax is similar to that of JavaScript which could be quite misleading since it works very differently from Javascript. Solidity is also limited when compared to Javascript thus you should avoid doing very complex things.

For example, this is how you could write `Hello World` in solidity:

```js
 // My First Smart Contract 
pragma solidity >=0.5.0 <0.7.0;
contract HelloWorld {
    function get()public pure returns (string memory){
        return 'Hello Contracts';
    }
}
```

>Note the similarities to JavaScript in terms of the functions, methods and curly braces. 

A great way to experiment with solidity is to use an online IDE called *Remix*. With *Remix* you just load the [website](https://remix.Ethereum.org/), start coding, and run your first smart contract. [Here](https://www.tutorialspoint.com/solidity/index.htm) is a reference in case you want to get started with programming in solidity. 

However, in real-life projects, we need something more robust and thus most developers use *Truffle*, which is a popular framework for smart contracts. *Truffle* is a command-line tool written in Node.js and it can easily be installed on Windows, Mac OS, and Linux using the package manager (NPM).

*Truffle* comes with a local Ethereum network called *Ganache* that we use for testing our smart contract during development. With *Ganache* you can deploy your smart contract to an Ethereum network completely separated from the real Ethereum network called *mainnet*.

In this fake network, you can have an infinitely high amount of fake ether which means you can do as many transactions as you want and lose all the ether without real implications to your finances. This is to help you test your smart contract before deploying it to the real Ethereum network.

You may also decide to use "Public testnets of Ethereum", which are Ethereum networks that are more realistic to the *mainnet* network as compared to *Ganache*. These public testnets are a little difficult to use since you don't control the network on your own. Herein you cannot generate infinite ether as in *Ganache* and thus you have to be prudent with the ether that you have. 

To generate ether on public testnets you would need to use tools called *Faucets* which usually fail sometimes. The public testnets are however a good way to get close to the real-world experience and put your smart contract to the test. In the public testnets and the *mainnet*, you would need to make use of a service called *Infura*. 

*Infura* is an API that runs Ethereum clients for you since it is not easy to run clients on your own. In addition to that, the way you send transactions in *Ganache* is quite different compared to how transactions take place in public testnets and *mainnet*. The learning curve increases exponentially with practice.

Then you would need to test your smart contract appropriately before deploying it since as mentioned earlier, the code is immutable. The testing is easily achieved using the truffle framework. Smart contracts cover a large part of blockchain development. However, it is not wise to learn smart contracts in isolation.

#### 4. Front-end development
Now you have successfully deployed your smart contract on the blockchain. Problem is that the only way to interact with it is using the command line. The command line sends shivers down the spine of most people even with a technical background. You wouldn't want that for your users, right? That's why you need to create a friendly user interface at the front end. 

In the front-end interface you create what is called a DAPP (Decentralized application). The DAPP can be a mobile app or a web app but in most cases, it is usually a web app. The web app is usually just like your normal web apps with HTML, CSS, and JavaScript. This further emphasizes the point that you need to understand web development before you get started with blockchain app development.

In the design of the DAPP, there will be two main challenges; first, the integration with the blockchain, and secondly the integration with the wallet. For integration with the blockchain, we shall make use of a JavaScript library called Web3.js, which is quite easy and help can be found online. 

Integration with the wallet is a little bit more sophisticated since in DAPPs the user management is decentralized and users store "passwords" themselves. In DAPPs, we don't usually use passwords but the closest equivalent is what we call private keys. With private keys, the users can sign a transaction, which is a data package that describes an action that a user wants to do.

They can do this with a verifiable signature that proves the user wanted to do that transaction. The wallet recommended for integrating with the Ethereum blockchain is Metamask, though there are a lot of crypto wallets out there. You should first learn how to integrate your smart contract with the Metamask wallet and then learn about the other wallets.

### Conclusion 
Becoming a blockchain developer takes a lot of practice and commitment. It requires creativity to implement the concepts in code. After becoming proficient in the fundamental concepts of blockchain, you may choose to specialize in a specific field. You may choose to become a smart contract specialist and devise more methods of gas optimization and how to enhance security in smart contracts. 

Alternatively, you may choose to specialize in Defi (Decentralized finance), which is the most common use case for blockchain. The main project in Defi are things like decentralized exchanges like UNISWAP, lending protocols, yield aggregators, and so on. It's a whole interesting field by itself.

Some of the projects that you can try out with your newly acquired skills are listed below by order of increasing complexity. The projects are however not limited to the ones displayed below.
1. Hello world.
2. Simple storage whereby you are now able to modify the data of your smart contract and it ceases being a read-only smart contract.
3. A voting smart contract where people can create a poll with different choices and a period for voting plus whatever functionality you may feel the need to add.
4. Creating an ether wallet where users can store their cryptos.
5. Creating a time lock wallet whereby funds are locked for a certain period.
6. Airdrops, which is a mechanism to distribute your tokens basically for free.

---
Peer Review Contributions by: [Onesmus Mbaabu](/engineering-education/authors/onesmus-mbaabu/)
