---
layout: engineering-education
status: publish
published: true
url: /web3js-vs-ethersjs/
title: Ethers vs. Web3
description: This article will help the reader learn the difference between the ethers library and the web3js library.
author: chigozie-oduah
date: 2022-06-07T00:00:00-02:30
topics: [Blockchain, Node.js]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/web3js-vs-ethersjs/hero.jpg
    alt: Ethers vs web3 Hero Image
---
The Web3js and the Ethers are two major libraries for utilizing the Ethereum network in JavaScript. The two have different ways they interact with smart contracts and process transactions on the network. 
<!--more-->
This difference leads to one handling some type of tasks better than the other. In this article, the reader will learn their differences, their best use cases, and how they both interact with the network.

### Prerequisites
To get the full benefits of this article, the reader needs to have the following:
- A working knowledge of JavaScript, and Node.js.
- A basic understanding of Web3, Smart Contracts, and [Blockchain](/engineering-education/topic/blockchain/).

### Table of contents
- [Essential topics](#essential-topics)
    - [Web3JS](#web3js)
    - [EthersJS](#ethersjs)
    - [Blockchain](#blockchain)
    - [Smart contracts](#smart-contracts)
- [Installations](#installations)
- [Comparison](#installations)
    - [Size of code created](#size-of-code-created)
    - [Size of library](#size-of-library)
    - [Community](#community)
    - [Deploying a smart contract](#deploying-a-smart-contract)
    - [Interacting with deployed contracts](#interacting-with-deployed-contracts)
    - [Sending transactions](#sending-transactions)
- [Conclusion](#conclusion)
- [Reference Topics](#reference-topics)

### Essential topics
Essential topics that will be covered in this article include:

#### Web3JS
This is a collection of libraries in JavaScript that are used to interact with the Ethereum network. This interaction could either be to send Ethereum from one address to another or to interact with smart contracts. The network comprises computers (nodes) that work together to process transactions made over the network. 

This network can either be a private node on a single computer, a public mainnet, or a test net. The private node and the test networks are used for development. The test net is a much more public development place open to the entire world. While the public node is limited to just one computer. The main net, however, is where all the real interaction occurs and where the more valuable cryptocurrency stays.

#### EthersJS
This is a lightweight JavaScript library used to interact with the Ethereum smart contracts and make transactions over the network. This library’s aim was to primarily be used with the [ethers.io](https://ethers.io) (a web3 browser), hence, the small size and has now grown to be more general-purpose and can be used like the web3 library.

#### Blockchain
This is a system of storing and recording data. A blockchain comprises blocks that are linked to form a chain. The blocks are used to store data and can connect with other blocks within the chain. A blockchain is immutable. That means that the blocks themselves can't change and you can only add new blocks to update the chain.

#### Smart contracts
These are self-executing programs that are stored and run on a blockchain network. They are created by sending a special type of transaction to the network. As soon as they are deployed, they create interfaces for our projects to interact with. 

They are used by developers to create serverless frontend applications. Performing the computational tasks on the network can get really expensive. Due to this it is always suggested that all computations should be done off the network and only data storage occur on it.

### Installations
To install either the Web3JS library or the EthersJS library, we need to run any of their respective commands in the terminal. To start, we will open our project folder in the terminal and type any of the following to install either of the packages.

```bash
npm install web3@1.7.1
```
Or.

```bash
npm install ethers@5.5.4
```
### Comparison
While the two libraries can do the same operation, they both have different ways they are used, which give them strengths and weaknesses in different situations.

#### Size of code created
The EthersJS library is built to be simple, lightweight, and efficient. This can lead to our code being more compact when we are using Ethers instead of Web3. Ethers achieve this level of simplicity by restricting the developers and only giving what is needed to interact with the network. 

The size of code created is important as it affects the time for your program to be loaded. The size of programs created using Web3 is not that large. But is significantly larger than the same code in Ethers. This makes it take more time to load up compared to the ones with Ethers. 

#### Size of library
The Ethers frontend library is remarkably smaller than the Web3's library. Because of this, frontend applications are smaller when using Ethers rather than Web3. This makes the web app load more quickly and uses up less space when caching the dependencies in the browser.

The EthersJS sole purpose is to work with the Ethereum Network and do that only. That is the reason it's smaller than the web3 library. The web3 library is larger because it is not just for the Ethereum Network. 

It also can do more, such as:
- **web3.bzz**: It allows interaction with a decentralized file storage called a swarm.
- **web3.shh**: This is used for interacting with the whisper protocol to broadcast messages.
- And much more.

#### Community
Web3 has been around longer than ethers. Because of this, Web3's community is larger by comparison and it makes finding the solution to any challenge you come across easier than in Ethers. Also, companies prefer using Web3 over Ethers because it has been around longer. 

Although the Ethers community is not as large as the Web3 community, it has great documentation and that makes it really easy to look up what you don’t understand anytime you feel stuck.

#### Deploying a smart contract
To deploy a smart contract in Web3, we write:

```JS
const web3 = new Web3(/* your provider */);

async function main() {
    let accounts = await web3.eth.getAccounts();
    let contract = new web3.eth.Contract(abi)
                        .deploy({ data: bytecode.object })
                        .send({ from: accounts[0], gas: "1000000" });
    console.log(contract.address);
}

main();
```

And for ethers, we deploy with:
```js
async function main() {
  const signer = new ethers.providers.Web3Provider(/* your provider */).getSigner();
  const contractFactory = new ethers.ContractFactory(abi, bytecode.object, signer);
  const contract = await contractFactory.deploy()
  console.log(contract.address);
}

main();
```

What happens in the Web3 is:
1. We create a new instance of web3 using our provider on the **1st** line.
2. Next, on the **2nd** line, we get the list of accounts provided.
3. Finally, we create a new contract instance and deploy it on the **5th** - **6th** line.

How the contract is deployed in Ethers:
1. We created a new instance of the Web3 provider and got our account **signer**.
2. Then, we create a contract factory using our abi, byte code, and our recently gotten signer.
3. Then, we deploy it using the `contractFactory.deploy()`.

Seeing these two ways of deploying the contract, we can easily tell that deploying contracts using Ethers has less code compared to Web3. This is great because we can easily tell what our code is doing. We could easily tell what this Web3 code does also, but, if we have a much larger codebase, you will be grateful for the smaller code size.

#### Interacting with deployed contracts
This is another important feature of these libraries. This feature makes it possible to develop decentralized applications that interact with smart contracts. Without this, people will have to manually operate contracts, which can lead to errors. Errors made in smart contracts could get very expensive. Both in fixing the errors and in having to pay real money to change. 

This ability also makes it possible to do heavy computation on a computer. It means data can be processed before sending into the contract. This reduces the number of gas fees to pay before a certain operation on the contract.

*Example:* Let's say we have a smart contract already deployed to 0x1234 ( the address ), and the contract has two interfaces:
- message: used to retrieve a message that is stored in the contract,
- setMessage: for changing the content of the message in the contract.

To interact with this deployed contract using web3, we write:
```js
const contract = new web3.eth.Contract(abi, contractAddress);
console.log(await contract.methods.message().call());
await contract.methods.setMessage("This is Chigozie").send({ from: accounts[0], gas: "1000000"});
console.log(await contract.methods.message().call());
```

And we interact using Ethers like:
```js
const contract = new ethers.Contract(contractAddress, abi, signer);
console.log(await contract.message());
await contract.setMessage("This is Chigozie");
console.log(await contract.message());
```

They are both snippets that do the same exact thing. From what we can see it is easy to tell that the Ethers version of contract interaction has less code than Web3.

What happens in the Web3 snippet is:
1. On the **1st** line, we initialize the contract with the abi and the address of our contract.
2. Next, we get the message that is already stored in the contract on the **3rd** line.
3. After that, we set the message that was stored in the contract by sending a transaction. The transaction is instantiated and signed with the **send** method.
4. Finally, we log the message stored in the contract message.

And in Ethers, what we did is:
1. We created a new instance of our contract using the deployed contract’s address, abi, and signer on the **1st** line.
2. Then, we get the message stored in the contract.
3. Next, we change the message of the contract using the `contract.setMessage()`.
4. And log the message stored in the contract.

### Sending transactions
This is a very handy feature in building Decentralised Finance (DeFi) applications where a person can decide to send some amount of Ethereum to an address.

To do that using Web3, we write something like this:
```js
const web3 = new Web3(/* provider */);

let receiver = /* receiver address */;
let sender = (await web3.eth.getAccounts())[0];

let receipt = await web3.eth.sendTransaction({
  to: receiver,
  value: "1000000",
  from: sender
});
```
And doing the same thing with Ethers, our code will look something like:
```js
let receiver = /* receiver's address */;

let sender = new ethers.providers.Web3Provider(/* your provider */).getSigner();

let receipt = await sender.sendTransaction({
  to: receiver,
  value: 100000000000n
});
```

What goes on in the Web3 version is:
1. We create a new instance of web3 using our provider on the **1st** line.
2. On the **3rd** line, we saved the address of the receiver.
3. Then we get the address of the sender account we will be using.
4. And finally, send a transaction by passing a transaction object to the `web3.eth.sendTransaction()` method.

And for Ethers, we write something slightly related:
1. We get the receiver's address.
2. Gain admin access to the sender's address.
3. And, send a transaction.

### Conclusion
In this article, we covered:
1. What are the Web3 and Ethers JavaScript libraries are. 
2. We also saw how we can deploy and interact with smart contracts.
3. We learned how we can send ethers from one account to another using these two libraries.
4. Finally, we saw some other important differences between the two libraries.

The two libraries can do the same thing, but with different processes. If you want to build an application that only interacts with the Ethereum network, then the EthersJS library would be most preferred. But, if you're not concerned about space or your project requires more than just interaction with Ethereum, then your go-to should be Web3.

### Reference topics
Here are some other articles you can read to further your understanding of Ethereum, Web 3.0, and smart contracts:

- [Overview of web 3.0](https://www.section.io/engineering-education/overview-of-web-3-0/)
- [Understanding the Basics of Ethereum and Smart Contracts](https://www.section.io/engineering-education/ethereum-and-smart-contracts/)

---
Peer Review Contributions by: [Mohamed Alghadban](/engineering-education/authors/mohamed-alghadban/)
