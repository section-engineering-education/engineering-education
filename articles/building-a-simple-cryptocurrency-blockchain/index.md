## Building Simple cryptocurrency system using Node.js

In this tutorial, we are going to demonstrate how to build a simple cryptocurrency system, called thecoin.
![Image title](engineering-education/building-a-simple-cryptocurrency-blockchain/trade.jpg)

We are going to implement the concepts of JavaScript classes and Node.js.

## Prerequisite
To follow this tutorial successfully, you’ll need to have the following:

- Node.js Installed in your machine

- Code editor for my case I use VSCode


### WHAT IS BLOCKCHAIN
![Bitcoin Image](engineering-education/building-a-simple-cryptocurrency-blockchain/bitcoin.jpg)
Digital currencies such as Bitcoin, Ethereum are powered and adopted with powerful technology **the Blockchain**. It uses Cryptography to securely connect and maintain a list of records growing continuously known as **Blocks**
![ethereum](engineering-education/building-a-simple-cryptocurrency-blockchain/ethereum.jpg)
**Blockchain** as the name states it's a block of transactions data growing increasingly to create a chain of transaction occurrences. Valid transaction data are logged into the blockchain network following the peer-to-peer rule laid down by participants.

> Let's get into code

> I'll name my app `thecoin`.

> Create the app named `thecoin.js` and open it in your code editor

> In the folder you're doing current development let's install the crypto library we're going to use using the command

```bash
npm install --save crypto-js
```

We'll use this library to import modules in our project.

**Begin**

I'll begin by creating a class 'BlockCypto'.

```Node
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

I've created the class BlockCrytpo for my ***block*** and added a constructor just like any other JavaScript class. 

In the constructor we initialize its properties and Assign parameters to it as follows:

    

- `crypto-js/sha256`: This is the module we've imported to calculate the hash of each block and we convert it to string using 'toString' method as the module will return the object.

- `index`:  This is a distinctive number tracking the index of every block in the blockchain

- `current_time`: As the name states, it keeps a record of the time when each transaction is completed. 

- `info`: Keeps record and provide data about completed transactions 

- `nexthash` : It points to the hash of the next block in the chain, used to keep and maintain the integrity of the blockchain.

- `computeHash` We use this method to calculate the hash of the next block based on its properties.

### The Blockchain Theorem

The **blockchain Theorem** is core. This is where all blocks are connected. 

So let's create a class that will maintain this operation.

Here is the code for the class I named 'Blockchain'

```Node
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


Let's explain the above class 

As usual. we have our constructor which instantiates the block1chain but this time we passed to it the `initGenesisBlock()` method which initializes the block in the chain. This property refers to an array of blocks in our case.

- `initGenesisBlock()`: This is the first block created in the peer-to-peer network and has not been linked to any other. To our knowledge of indexing it's at index 0, Notice we created it using the previously created 'BlockCrypto' class and passed all the parameters.

- `latestBlock` : As named, we can easily tell it's finding the latest block in the chain. As explained earlier it helps to ensure the hash of the current block and map it to the hash of the previous block to ensure chain integrity.

- `addNewBlock`: This method I used here to add a new block to the chain. Matching the previous hash block and current hash block in our case is to ensure we are not tampering with the chain.


Now that our blockchain is ready to work. We are missing something which is a core blockchain principle, the blockchain _integrity_. Let's see how to verify it and test our app.

## Verifying Blockchain Integrity 

The main characteristic of blockchain is that once a block has been added to the network, it can't be changed without invalidating the entire blockchain integrity.

To perform this, we use digital security or cryptographic hash which ensures securing and validating of blockchain by producing a new hash every time any change is made in the block thus invalidating the blockchain.

We'll loop over the entire blockchain to check whether any hash has been tampered with, taking into account the exception of the first block which is hardcoded.

Besides, this method will verify if the hashes of each two consecutive blocks are pointing to one another. If the integrity of the blockchain has not been compromised, it returns true; otherwise, in case of any anomalies, it returns false.
 We'll create this method inside inside `Blockchain` class
```Node
    checkValidity(){
            for(let i = 1; i < this.block1chain.length; i++){
                const currentBlock = this.block1chain[i];
                const precedingBlock= this.blockchain[i-1];

            if(currentBlock.hash !== currentBlock.computeHash()){
                return false;
            }
            if(currentBlock.nextgHash !== nextBlock.hash)
                return false;
            }
            return true;
        }
```


Now we can test our app and see the results:

But before we dive into running the code, let's create a new instance of the `Blockchain` class and name it `thecoin`, and add some blocks in the blockchain using random values.  

```bash
  let thecoin = new Blockchain();
    thecoin.addNewBlock(new BlockCrypto(1, "06/04/2021", {sender: "Rabin Yitzack", recipient: "Loyd Eve", quantity: 20}));
    thecoin.addNewBlock(new BlockCrypto(2, "07/04/2021", {sender: "Anita Vyona", recipient: "Felix Mush", quantity: 349}) );
    console.log(JSON.stringify(thecoin, null, 4));
```

### Running our Blockchain

Typing this command to our terminal `node thecoin.js` will result in this 

![output](engineering-education/building-a-simple-cryptocurrency-blockchain/output.png)

**NOTE:** >Before running the command ensure to navigate on the right path on your terminal.

_hint:_ Using the command `pwd` to check the path.

Here is our full source code

## Conclusion

Kudos! You are have just build a simple cryptocurrency app using Node.js, the step is closer to get you started building Pro apps using Node.js, or rather you can just add more features to our simple blockchain and thrill it to the market.
Nevertheless, I hope that this tutorial has provided you with basic skill proficiency to get you going with the stimulating Node.js development.  

Happy Coding!



