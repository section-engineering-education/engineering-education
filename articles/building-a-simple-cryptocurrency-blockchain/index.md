## Building Simple cryptocurrency system using Node.js
A cryptocurrency is a digital or virtual currency that is secured by a [cryptographic hash](https://en.wikipedia.org/wiki/Cryptographic_hash_function). This makes it nearly impossible to forge transactions. Many cryptocurrencies are [decentralized](en.wikipedia.org/wiki/Decentralization) using the [blockchain](https://en.wikipedia.org/wiki/Blockchain) technology - a distributed ledger enforced by a disparate network of computers.

A blockchain is an open, distributed ledger that records transactions in code, and it enables a cryptocurrency user to have their own copy of transaction record. Each new transaction is logged into record as it happens, and every copy of the blockchain is updated simultaneously with the new information, keeping all records identical and accurate. Thus, making it highly secure.

`Thecoin` is one such implementation of a cryptocurrency that we are going to build in a while.

In this tutorial, we will learn a little about blockchain and decentralization in detail. Also, we will build a simple cryptocurrency system, called `thecoin`.

![Sample trade image](engineering-education/building-a-simple-cryptocurrency-blockchain/trade.jpg)

### Prerequisite
To follow this tutorial successfully, you'll need to have a good understanding about:
- [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
- [Node.js](https://nodejs.org/en/docs/)

To start with, you must have:
- Node.js installed in your machine
- Code editor

### Table of contents
- [What is Blockchain?](#what-is-blockchain)
- [Decentralization](#decentralization)
- [The blockchain theorem](#the-blockchain-theorem)
- [Verifying blockchain integrity](#verifying-blockchain-integrity)
- [Running our blockchain](#running-our-blockchain)
- [Conclusion](#conclusion)
- [References](#references)

### What is Blockchain?
![Bitcoin Image](engineering-education/building-a-simple-cryptocurrency-blockchain/bitcoin.jpg)
*Bitcoin image*

Digital cryptocurrencies such as Bitcoin and Ethereum are powered and adopted with powerful technology called **the blockchain**. It uses cryptography to securely connect and maintain a list of records growing continuously known as **blocks**.

![ethereum](engineering-education/building-a-simple-cryptocurrency-blockchain/ethereum.jpg)
*Ethereum image*

**Blockchain** as the name states they are a block of transaction data growing increasingly to create a chain of transaction occurrences. Valid transaction data are logged into the blockchain network following the peer-to-peer rule laid down by participants.

### Decentralization
Usually, the data in the databases are centralized. By centralizing, we operate based on only one server. There are high chances of risk due to failures. Alternatively, decentralization allows data to be stored everywhere, thus making it faster, more secure and better way of storing data.

Blockchain stores its information in several locations. Whenever a new block is added to the blockchain, every computer is updated on the change made. This makes it very difficult to tamper with the blockchain, as all computers in the network must agree with the change yet to be made for it to take place.

We'll have good understanding of blockchain and cryptocurrency and it's operation.

Let's get into code. I'll name my app `thecoin`.

Create the app named `thecoin.js` and open it in your code editor.

In the development folder, let's install the `crypto` library that we're going to use, using the command:

```bash
npm install --save crypto-js
```

We'll use this library to import modules in our project.

I'll begin by creating a class `BlockCypto` as shown below:

```js
const SHA256 = require('crypto-js/sha256');
class BlockCypto{
    constructor(index, current_time, info, nextHash=" "){
    this.index = index;
    this.current_time = current_time;
    this.info = info;
    this.nextHash = nextHash;
    this.hash = this.computeHash();     
    }
    computeHash(){
        return SHA256(this.info + this.nextHash + this.current_time + JSON.stringify(this.info)).toString();
    }   
}
```

I'll explain each part of the code here:

I've created the class `BlockCrytpo` for my ***block*** and added a constructor just like any other JavaScript class.

In the constructor, we initialize its properties and assign parameters to it, as follows:

- `crypto-js/sha256`: This is the module we've imported to calculate the hash of each block. We convert it to string using `toString()` method as the module will return the object.

- `index`: This is a distinctive number tracking the index of every block in the blockchain

- `current_time`: As the name states, it keeps a record of the time when each transaction is completed.

- `info`: Records data about the completed transactions.

- `nexthash`: It points to the hash of the next block in the chain. It's used to keep and maintain the integrity of the blockchain.

- `computeHash`: We use this method to calculate the hash of the next block based on its properties.

### The blockchain theorem
It is a type of database that stores a collection of data together in groups, with certain capacity of storage. These blocks are chained to the previous blocks forming a chain of data.

The chain is irreversible due to the decentralized nature of the system. Here, each block is assigned a timestamp when added to the chain.

Now, let's create a class `Blockchain` that will maintain this operation:

```js
class Blockchain{
    constructor(){
        this.block1chain = [this.startGenesisBlock()];     
    }
    initGenesisBlock(){
        return new BlockCrypto(0, "06/04/2021", "Initial Block in the Chain", "0");
    }
    latestBlock(){
        return this.block1chain[this.block1chain.length - 1];
    }
    addNewBlock(newBlock){
        newBlock.nextHash = this.latestBlock().hash;
        newBlock.hash = newBlock.computeHash();        
        this.block1chain.push(newBlock);
    }
}
```

Let's understand the above code snippet.

As usual, we have our constructor which instantiates the blockchain.

But this time, we passed it to the `initGenesisBlock()` method, which initializes the block in the chain. This property refers to an array of blocks in our case.

- `initGenesisBlock()`: This is the first block created in the peer-to-peer network and has not been linked to any other. To our knowledge of indexing it's at index `0`.

> Notice that, we created it using the previously created `BlockCrypto` class and passed all the parameters as arguments.

- `latestBlock`: As named, we use it for finding the latest block in the chain. As explained earlier, it helps to ensure the hash of the current block and map it to the hash of the previous block to ensure the chain integrity.

- `addNewBlock`: This method is used to add a new block to the chain. Matching the previous hash block and current hash block in our case is to ensure that we are not tampering with the chain.

Now that our blockchain is ready to work. We are missing something which is a core blockchain principle, the blockchain _integrity_.

Let's see how to verify it and test our app.

### Verifying blockchain integrity
The main characteristic of blockchain is that, once a block has been added to the network, it can't be changed without invalidating the entire blockchain integrity.

To perform this, we use digital security or cryptographic hash, which ensures securing and validating of blockchain by producing a new hash every time a change is made in the block. Thus invalidating the blockchain.

We'll loop over the entire blockchain to check whether any hash has been tampered with, taking into account the exception of the first block, which is hardcoded.

Besides, this method will verify if the hashes of each two consecutive blocks are pointing to one another. If the integrity of the blockchain has been compromised, it returns `false`; otherwise, in case no anomalies are encountered, it returns `true`.

We'll create this method inside the `Blockchain` class:

```js
checkValidity(){
    // Checking validity
    for(let i = 1; i < this.block1chain.length; i++) {
        const currentBlock = this.block1chain[i];
        const nextBlock= this.blockchain[i-1];
    // Checking current blcok hash
    
    if(currentBlock.hash !== currentBlock.computeHash()) {
        return false;
    }
    // Comparing current block hash with the next block

    if(currentBlock.nextHash !== nextBlock.hash) {
        return false;
    }
    return true;
}
```

Now, we can test our app and see the results:

But, before we dive into running the code, let's create a new instance of the `Blockchain` class and name it `thecoin`, and add some blocks in the blockchain using random values.  

```js
let thecoin = new Blockchain();

thecoin.addNewBlock(new BlockCrypto(1, "06/04/2021", {sender: "Rabin Yitzack", recipient: "Loyd Eve", quantity: 20}));

thecoin.addNewBlock(new BlockCrypto(2, "07/04/2021", {sender: "Anita Vyona", recipient: "Felix Mush", quantity: 349}));

console.log(JSON.stringify(thecoin, null, 4));
```

### Running our Blockchain
Typing this command in our terminal `node thecoin.js` will result in:

![output](engineering-education/building-a-simple-cryptocurrency-blockchain/output.png)

> **NOTE:** Before running the command, ensure to navigate to the right path on your terminal.

_hint:_ Using the command `pwd` to check the path.

Here is our full source code [here](https://github.com/yitzackRabin/crypto).

### Conclusion
Kudos!

You have built your own cryptocurrency using Node.js. This step is closer to get you started building pro-apps using Node.js, or rather you can just add more features to our simple blockchain and thrill it to the market.

Nevertheless, I hope that this tutorial has provided you with basic skill proficiency to get you going with the stimulating Node.js development.  

Happy Coding!

### References
- [Nerdwallet](https://www.nerdwallet.com/article/investing/cryptocurrency-7-things-to-know)
- [Forbes](https://www.forbes.com/advisor/investing/what-is-cryptocurrency/)
- [Investopedia](https://www.investopedia.com/terms/b/blockchain.asp)