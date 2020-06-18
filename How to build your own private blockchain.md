# HOW TO BUILD YOUR OWN PRIVATE BLOCKCHAIN

###### EPISODE 1

In this series we are going to build our own private Blockchain were we can store data and connect them in a chain.
But before we dive into it, we have to know what Blockchain is, its terminologies and what is needed to build it.
The history of Blockchain dates back to 2009 from the bitcoin documentation written by Satoshi Nakamoto, who built the bitcoin cryptocurrency using the blockchain technology.

### What is the Blockchain and why is it important anyway?

There are a lot of definitions of blockchain and misinterpretation of blockchain and bitcoin. 
According to Wikipedia it defines as
>**A Blockchain, originally block chain, is a continuously growing list of records, called blocks, which are linked and secured using cryptography**

Or simply 
>**A shared database that contains list of the entire transactions made on the network**

The blockchain was designed to resist any modification of data after it have been recorded using a distributed computing system with high consensus has therefore been achieved with a Blockchain. This makes Blockchain potentially suitable for the recording of events, medical records, and other records management activities, such as identity management, transaction processing, documenting provenance, food traceability or voting.

![Image of Blockchain Framework](https://drive.google.com/uc?export=view&id=1fB-wiyWiZKAfyMR3rqjQHU-O96KHUFJQ)

##### Let’s discuss the blockchain framework

**Transaction**: This can be seen as the basic unit of any blockchain. Transaction are made of multiple inputs and outputs. By understanding the inputs, outputs, miners’ fees, and amount sent, we can determine the balance of user’s wallets before and after transactions are made.

**Wallet**: Blockchain identity is how you establish yourself in the world, in this case the blockchain world. Blockchain identities are made up of a few important tools like wallets, addresses, and keys. Wallet Address: A unique identifier for your wallet. **Private Key**: A secret number that allows you to spend bitcoin from your wallet. **Public Key**: Publicly shareable key that cannot be used to spend bitcoin. 

**Signature**: We validate transactions and assign ownership using what's known as a digital signature. signature establish prove of ownership for each transaction made on the network.

**Mempool**: Before getting onto the blockchain or becoming part of the network, transactions go into what is known as the memory pool. The memory pool (also known as the mempool) is the waiting place for transactions before they enter the blockchain. The blockchain can only handle so much information at once, and the backlog of information goes here.

**Network**: The blockchain network is a distributed peer-to-peer network. The idea of a network is what allows the blockchain to bypass the need for 3rd parties **Peer-to-Peer Network**: A network of computers that allows information to be shared across users. **Distributed Network**: A network that allows information to spread out across many users.

**Consensus**: Consensus is how the blockchain makes decisions. Basically, consensus is an idea but the idea is implemented through many different algorithms. These algorithms are all different ways to try and achieve consensus more effectively. Things like **proof of work**, **proof of stake**, and **DBFT (Delegated Byzantine Fault Tolerance)** are all consensus algorithms.

**Hashing**: A hash can be defined as a unique fingerprint for information. Hashing is the procedure that a miner on a Proof-of-Work blockchain constantly repeats in order to find an eligible signature (aka a proof of work). In other words; it is the procedure of repeatedly inserting a random string of digits into a hashing formula until finding a desirable output.

##### Block

For the purpose of building our own private blockchain it’s very important that we understand the concept of block.
Blocks are the fundamental components of the blockchain. The word "Block" is an interesting way to think about the information it stores; but what a block is, might be a little different than you expect.

![Image of Block Model](https://drive.google.com/uc?export=view&id=1q4-rpacLe3zyL2OI4-bMUvl5MEElCZwT)

**Genesis block**
The genesis block is often referred to as the first block on a blockchain. The genesis block of Bitcoin was created on January 3, 2009; and indicates the birth of the Bitcoin blockchain.

**Previous Blocks Hash**: This is the hash value of the previous block in this case if its not a genesis block.
**Time**: This is the time stamp of when the block was added to the blockchain.
**Merkle Root**: This is gotten from the pair value of each transaction in the block until all the hash value are merged together as one to form a Merkle root.
**Nonce**: This is an arbitrary number when joined together with the blocks data to form the blocks hash. **Nonce + Block data = Block Hash**. Note: this is important in mining, where the miners try to guess the nonce of the block using computing to get the blocks hash.

Here we can demonstrate a simple block. In the image below you can see the Block's number, Nonce, Data and Hash.
Using [Andersbrownworth Block](https://andersbrownworth.com/block/block) we can demonstrate a block model and blockchain. 
![Image of Block1](https://drive.google.com/uc?export=view&id=1qOsU1ZAmTsAfGpGtIxqQEqVT9hnPrJvp)

Next we can pass a data and mine it and you will see it turns green. If you try to change the nonce or the data it will invalidate the block by turning red.
![Image of Block2](https://drive.google.com/uc?export=view&id=1P77ejZvLP1uljrrED19yS1uTLMt8MXW6)

Now let’s see a chain of blocks linked together using their previous hash value
[Andersbrownworth](https://andersbrownworth.com/blockchain/blockchain)
![Image of Block3](https://drive.google.com/uc?export=view&id=1VlwvPzT4UTF8WfswdXa3LPizIkX8jcCr)

Now let’s pass our data into them and try to mine them, you will see that the blocks turn green and each block carries a new hash value of the previous block.
![Image of Block4](https://drive.google.com/uc?export=view&id=1L-hutuRLOsYpZR7T7h2gsHplCy77qF9b)

![Image of Block5](https://drive.google.com/uc?export=view&id=1tlnOPdJjLKn-j0K2JqJqPffaGFxbAU4u)

You can see that when I try to change the value of one block, it completely invalidates the whole blocks in the chain. To validate the blocks in the chain, I have to mine the blocks again to make every block carry the correct previous hash.
Though this looks easy here changing a block data but in the real blockchain its not easy because changing it would require a lot of computing power and besides the consensus algorithm wouldn’t allow that to happen.

For now lets stop here since we have gotten the core concepts of blocks and blockchain, my goal for you is to equip you with key concepts and skills to be able to become a Blockchain Developer and Know what blockchain is all about and not just follow the trend by investing in cryptocurrencies.
Next in the episode we will dive deep into writing some codes and building our very own blockchain using Node.js a JavaScript serve side framework.

**Additional Resources**
[Bitcoin Whitepaper](https://bitcoin.org/bitcoin.pdf)
[Blockchain Terminology](https://blog.goodaudience.com/blockchain-terminology-d903758d6bd)
[Blockchain](https://en.wikipedia.org/wiki/Blockchain)
[Andersbrownworth  Blockchain](https://andersbrownworth.com/blockchain/blockchain)
[Andersbrownworth Block](https://andersbrownworth.com/block/block)


