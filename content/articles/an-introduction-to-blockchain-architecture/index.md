### An Introduction to Blockchain Architecture
As a financial market analyst, I recently ventured into the cryptocurrency asset class. I was astonished by the price delivery mechanism of cryptocurrencies, and the huge number of assets commonly referred to as tokens in the cryptocurrency market.

Arguably, the structure of the cryptocurrency market imitates the stock market, where we have indexes like S&P500 and DJI, which can be alternated as Bitcoin and Ethereum in the cryptocurrency market.

However, the financial aspect is intriguing, but what hooked my attention is the structure of blockchain technology. It is astounding and revolutionary. These aren't buzz words. We will get to it, and you will understand how my statement is true.

### Table of Contents
- [What is Blockchain](#what-is-blockchain)
- [Realms of Blockchain](#realms-of-blockchain)
- [Immutable Ledger](#immutable-ledger)
- [Distributed P2P Network](#distributed-p2p-network)
- [Hash Cryptography](#hash-cryptography)
- [Mining and Proof of Work](#mining-and-proof-of-work)
- [Consensus Protocol](#consensus-protocol)
- [Conclusion](#conclusion)

### What is Blockchain
Before I delve straight into what blockchain is, let’s examine the underlying units that make up a blockchain, this way the definition makes more sense.

In the blockchain, there is usually an origin, that is the first `block` in the `chain`. This block is referred to as the Genesis Block because after the blockchain is initialized, the first block will always stay as number 1 for eternity.

In the first(Genesis) block, there might be some data in it, such as transactions details by users of cryptocurrency, it also consists of a Hash which is a string of characters derived from the fields in the blockchain but in an encrypted format. The blocks usually contain a previous hash, but the Genesis block doesn’t have that because it is the first block.

The next block created will have some data in it. Some of the data includes:
- The hash
- The previous hash

The previous hash references the hash of the previous block. If a single character in the data of the previous block before the current block is altered, this will cause the hash to change completely, and it won’t be updated in the current block. Hence, the relationship between them will break.

The above process proceeds as more blocks are mined, they are linked to one another based on the previous hash. In summary, Blockchain is a series of blocks that are cryptographically linked with each other through these hashes.

### Realms of Blockchain
The realms of blockchain are simply the characteristics or features that make blockchain what it is today. These characteristics are the founding pillars of blockchain technology, and they are:
- Immutable Ledger
- Distributed P2P Network
- Hash Cryptography
- Mining and Proof of Work
- Consensus Protocols

In this article, I will touch briefly on them, and in future articles they will be explained in detail.

### Immutable Ledger
To understand the concept of the immutable ledger, I’ll add some visuals below:

![Blockchain Visual Representation](/engineering-education/an-introduction-to-blockchain-architecture/blockchain.png)


A ledger or block must be immutable. It must not be subject to change. In reality, when we add entries to a ledger, it can be altered, and this is a fraudulent act. One of the core pillars of blockchain is to ensure that data in the block is not subject to change, and here is how it guarantee it.

When a block is mined and added to the blockchain, a hash for the block is generated from the combination of the data in the block.

In the image above, the first block is the genesis block and it has no previous hash but its current hash. The next block has a previous hash that is exactly the same as the hash of the first block, and it also consists of the current hash. These two blocks are chained based on the hashes, and when the data in the first block changes, the hash of the first block changes but not in the second block. This will result in the chain between the two blocks being broken.

The blockchain will notify of the change in the data of the block as a result of the hash changing. This feature ensures that the data in the ledger doesn’t change.

### Distributed P2P Network
Here is an image view of what a distributed peer-to-peer network looks like:

![A Distributed Network - Image Credit(Wikipedia)](/engineering-education/an-introduction-to-blockchain-architecture/p2p.png)


A distributed network consists of computers commonly referred to as nodes in the blockchain world and they are interconnected but they are not all connected at the same time.

In blockchain, when a block is mined, the copy of the blocks are made available across all interconnected computers on the network, but the data are all encrypted through cryptographic keys.

In a distributed P2P network, once a new block is added to the blockchain, the block is added to all computers across the network but not simultaneously, some computers on the network will receive a block update faster than others and this results in a problem but we will get to this under consensus protocol.

The realm of Distributed P2P ensures that not one single central party have the blockchain but rather thousands of systems in the network and this protects against any form of attack, such that if a block is corrupted, the network can look across the distributed P2P and copy the last active and correct blockchain from the network to replace the invalid blockchain on the network.

I find the function of the distributed P2P effective and astonishing.

### Hash Cryptography
In blockchain, there is the need for unique identification of each block, like a fingerprint. The way to ensure such is through an algorithm developed by the National Security Agency(NSA), the Secure Hash Algorithm 256 (SHA256).

[Here](https://emn178.github.io/online-tools/sha256.html) is a link to test run the SHA256 algorithm. From the web application online you can generate an hash of whatever text you input, here’s what mine looks like:


![Hash Example](/engineering-education/an-introduction-to-blockchain-architecture/hash.png)


The text input of hello world produces the hash. If I change a single text or add a single space, this changes the hash completely - you can experiment on this.

In the blockchain, the data in the block + the previous hash and other properties are used to generate the hash for the block, which serves as a unique fingerprint for the block.

### Mining and Proof of Work
Mining is a broad topic that deserves its write-up. In this article, I’ll give an illustration of how mining works.

For a block to be mined and added to the blockchain after being verified, there is usually a target for miners to attain, and this is achieved by changing a field in the block until the hash of the block falls below the target of the pool of hashes.

We’ve established that the data in the field cannot be changed, so how do we make the hash change until it falls in the target zone? Well, there are two fields that change and they cause the hash to change. These fields are Timestamp and Nonce. For this article, I’ll limit my focus to just the Nonce field.

Now, in the block, we have a new field called the Nonce. The Nonce takes a number that ranges between zero and approximately 4 billion. The miner dedicates their computing power (GPUs, CPUs and ASICs) to iterate through the Nonce until a Nonce value is found that causes the hash to fall below the target.

Once the miner successfully finds the Golden Nonce(the Nonce value that causes the hash to fall below the target),  the miner will go through a verification process that ensures that the miner dedicated power to solving the problem(the proof of work). Once the process is verified after running through checks, the block is mined and added to the blockchain.

### Consensus Protocol
The consensus protocol involves an interrelationship between the distributed network, the blockchain and mining.

When a block is mined by miner A and also at the same time another block is mined by miner B, these two blocks will be added to the blockchain and then in the distributed network.

Now, remember I said the systems in the network receive the blocks at a different time. If there are six(6) systems in the networks, here’s how consensus protocol will work:

Let’s assume four(4) systems receive the block mined by miner A first, and then the remaining two(2) systems on the network receive the block mined by miner B first, this will result in a disagreement across the network because all the blocks have to be the same and in the exact order. This is a problem, and how is it solved?

Well, the network is quite intelligent, it assess the systems on the network with the highest processing power, and from the illustration, the four(4) systems all received the block mined by miner A, thus they have more processing power than the rest of the two(2) systems, then the consensus protocols will remove the blocks mined by miner B in the two(2) systems and sets them aside, it then adds the blocks mined by miner A.

The consensus protocol results in all the networks receiving the block mined by miner A, while the block mined by miner B will be set aside as an orphan block. What happens to orphan blocks is beyond the scope of this article.

### Conclusion
You’ve made it to the end of this tutorial. You now have sufficient knowledge about blockchain technology and how certain characteristics are what makes the blockchain magnificent. Here’s some additional reading for an in-depth understanding of blockchain technology:
- [The meaning of decentralization](https://medium.com/@VitalikButerin/the-meaning-of-decentralization-a0c92b76a274)
- [The Blockchain Economy](https://medium.com/cryptoeconomics-australia/the-blockchain-economy-a-beginners-guide-to-institutional-cryptoeconomics-64bf2f2beec4)






