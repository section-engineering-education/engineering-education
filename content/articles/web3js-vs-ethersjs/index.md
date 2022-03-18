# Web3 vs Ethers

Web3 and Ethers are major libraries used to interact with the ethereum blockchain and smart contracts. They are both different in nature and are used differently so they have use cases where one performs better than the other. In this article, we will cover their basics, their differences and we will also be using them to make transactions and interact with smart contracts.

To get the full benefits of this article you need to have;



* A working knowledge of JavaScript,
* Any understanding of Web3, Smart contracts and Blockchain, and
* Nodejs installed on your system.


## Essential Topics

Essential topics that will be covered in this article include;


### Web3JS

This is a collection of libraries in JavaScript that are used to interact with smart contracts and make transactions on the Ethereum network. The Ethereum network is a collection of computers (nodes) that work together to mine and store transactions made over the network and executes on-chain programs ( smart contracts ). This network can either be a private node on a single computer system and used for development purposes, a public mainnet which is a collection of nodes working together to serve the world or the testnet which works like the mainnet but is used for a more collective test environment by developers.


### EthersJS

This is a lightweight JavaScript library used for interacting with Ethereum smart contracts and making transactions over the network. This library’s aim was to primarily be used with the [ethers.io](https://ethers.io) ( a web3 browser ), hence, the small size and is now grown to be more general-purpose and can be used like the web3 library.


### Blockchain

This is a system of recording transactions on ledgers which are linked to preceding records and is distributed across systems that work together to form a network. A blockchain is immutable and the only way data can be added to it is by adding blocks to the end of the chain linking all blocks except the very first in the chain to its predecessor. These blocks are usually collections of transactions made over the network and they can either be to send tokens from one address to another or to create smart contracts.


### Smart Contracts

These are self-executing on-chain programs that are created by sending a special type of transaction on a blockchain network. These programs are executed as soon as they are deployed and they create interfaces for developers to interact with. They are used by developers to create serverless frontend applications because they have the ability to store data and perform computational tasks. Performing the computational tasks on-chain can get costly and in smart contract costly operations could lead to paying more money, so it is always suggested that you do any computation off the chain and store the data on the chain.


## Installations

Installing Web3 or Ethers to your project can be done using the node package manager (npm).

To start we will open our project folder in the terminal and type any of the following to install either if the packages


```bash
npm install web3@1.7.1
```


Or


```bash
npm install ethers@5.5.4
```



## Comparism

While the two libraries can do the same operation, they both have different ways they are used which gives them strengths and weaknesses in different situations.


### Size of Code Created

Because the EthersJS library was built to be simple, lightweight and efficient, the amount of lines we have to write is also very small. Ethers achieves this by allowing the programmer to only have access to what is necessary to the Ethereum Blockchain ( smart contracts and Transactions ). This is a good thing because not only will there be less code for bugs to hide in, it will also take less time for JavaScript's engine to load up your code and execute. Later in the article we will be comparing the two libraries' methods of interacting with and deploying smart contracts. 

The size of programs created using Web3 is also not that large but is still significantly larger than their versions in Ethers. This means it will take Web3 applications more time to load up than ones with Ethers. 


### Size of Library

The Ethers frontend library is remarkably smaller than the Web3's library. Because of this, frontend applications are smaller when using Ethers rather than Web3. This makes the web app load more quickly and use up less space when caching the dependencies in the browser.

The EthersJS library's sole purpose is to work with the Ethereum Network and do it only. That is the reason why it's smaller than the web3 library. The web3 library  is larger because it not only covers the Ethereum Network it also has the ability to do more, which are:



* **web3.bzz**: which allows interaction with a decentralized file storage called swarm,
* **web3.shh**: that is used for interacting with the whisper protocol to broadcast messages, and much more.


### Community

Web3 has been around longer than ethers. Because of this the Web3's community is larger by comparison and it makes finding the solution to any challenge you come across easier than in Ethers.  Also, companies prefer using Web3 over Ethers because it has been around longer. 

Although the Ethers community is not as large as the Web3 community, it has a really good documentation and that makes it really easy to look up what you don’t understand anytime you feel stuck.


### Deploying a Smart Contract

To deploy a smart contract in Web3 we write the following:


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


And for ethers we deploy with the following:


```js
async function main() {
  const signer = new ethers.providers.Web3Provider(/* your provider */).getSigner();
  const factory = new ethers.ContractFactory(abi, bytecode.object, signer);
  const contract = await factory.deploy()
  console.log(contract.address);
}

main();
```


What happens in the Web3 is:



1. We create a new instance of web3 using our provider,
2. Next, we get the list of accounts provided,
3. Then, we create a new contract instance by passing the abi to it,
4. After that, we prepare the contract for deployment,
5. And finally, deploying it by sending it as a transaction to the Blockchain.

How the contract is deployed in Ethers:



1. We created a new instance of the Web3 provider and got our account **signer**,
2. Next, we create a contract factory using our abi, bytecode and our recently gotten signer,
3. And finally deploy it.

Seeing these two ways of deploying the contract we can easily tell that deploying contracts using Ethers has less amount of code to write compared to Web3. This is really good because now we can easily tell what our code is doing. We could easily tell what this Web3 code does also but if we have a much larger codebase you will be grateful for the reduced amount of code you have to write.


### Interacting with Deployed Contracts

Apart from the deployment of smart contracts, another important feature of this library is the ability to interact with the deployed contracts. This ability makes it possible to develop decentralized applications without needing the users to directly interact with the contract and cause some expensive damages to the contracts. The damages users cause may not necessarily be one that stops the contract from working, it can be a wrong format in the inputs provided by the user and since heavy computation such as string processing can get really expensive ( almost or more than $1000 ), it gets necessary to have some way of getting users inputs and processing them off the chain (in the application) and sending the processed data to the chain for storage.

Let's say we have a smart contract already deployed to 0x1234 ( the address ), and the contract has two interfaces; 



* message: used to retrieve a message that is stored in the contract,
* setMessage: for changing the content of the message in the contract

To interact with this deployed contract using web3 we write the following:


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


They are both snippets that do the same exact thing. From what we can see it is easy to tell that the Ethers version of contract interaction is shorter than Web3’s.

What happens in the Web3 snippet is:



1. We start by initializing the contract with the abi gotten from the compilation and the address that the contract was deployed in,
2. Next, we call a **message** method from the contract to get the message that is already stored in the contract using the contract.methods.message().call() method,
3. After that, we set the message that was stored in the contract  by sending a transaction to its **setMessage** method. The transaction is instantiated and signed with the **send** method,
4. Finally, we log the contract’s message into the console.

And in Ethers what happens is:



1. We create a new instance of the Ethers’ **Contract** using the deployed contract’s address, abi and signer,
2. Then, we call the contract’s **message** method using the simple contract.message(),
3. Next, we change the message of the contract using the contract.setMessage(),
4. And end by checking the contract’s message again.


### Sending Transactions

While Web3 and Ethers can be used to interact with and deploy smart contracts, they can also be used to send Ethereum from one address to another. This is a very handy feature in building Decentralized Finance (DeFi) applications where a person can decide to send some amount of Ethereum to an address.

To do that using Web3 we write something like this:


```js
const web3 = new Web3(/* your provider */);

let receiver = /* receiver address */;
let sender = (await web3.eth.getAccounts())[0];

let receipt = await web3.eth.sendTransaction({
  to: receiver,
  value: "1000000",
  from: sender
});
```


And doing the same thing with ethers, our code will look something like:


```js
let receiver = /* receiver's address */;

let sender = new ethers.providers.Web3Provider(/* your provider */).getSigner();

let receipt = await sender.sendTransaction({
  to: receiver,
  value: 100000000000n
});
```


What goes on in the Web3 version is:



1. First, we create a new instance of web3 using our provider,
2. After that, we get the address of the receiver,
3. Then we get the address of the sender given by our provider,
4. And finally, send a transaction using the web3.eth.sendTransaction() method.

And for Ethers we write something slightly related:



1. We get the receiver's address,
2. Gain access to the sender's address,
3. And send a transaction.


## Conclusion

In this article we covered



1.  What the Web3 and Ethers JavaScript libraries are, 
2. We also saw how we can deploy and interact with smart contracts,
3. We learnt how we can send transactions from one Ethereum account to another using these two libraries, and
4. Finally, we saw some other important differences between the two libraries.

The two libraries have the ability to do the same thing but with different processes. If you want to build an application that only interacts with the Ethereum network then the EthersJS library would be most preferred. But, if you're not concerned about space or your project requires more than just interaction with Ethereum then your go-to should be Web3.


## Reference Topics

Here are some other articles you can read to further your understanding of the Ethereum, Web 3.0 and smart contracts;



* Overview of web 3.0: [https://www.section.io/engineering-education/overview-of-web-3-0/](https://www.section.io/engineering-education/overview-of-web-3-0/)
* Understanding the Basics of Ethereum and Smart Contracts: [https://www.section.io/engineering-education/ethereum-and-smart-contracts/](https://www.section.io/engineering-education/ethereum-and-smart-contracts/)
