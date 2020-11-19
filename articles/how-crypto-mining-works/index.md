---
layout: engineering-education
status: publish
published: true
url: /engineering-education/how-crypto-mining-works/
title: How Does Cryptocurrency Mining Work?  
description: This article will talk about what cryptocurrency mining is and how it works. Mining can be thought of as the “processor” for transactions on the blockchain.
author: gregory-manley
date: 2020-11-19T00:00:00-13:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/how-crypto-mining-works/hero.jpg
    alt: cryptocurrency Mining example image
---
It is hard to talk about cryptocurrency without mentioning mining. Mining cryptocurrency is a complex mathematical system, generally utilizing cryptographic hashing algorithms. Since hashing is extremely complicated, we will only be looking at what is hashed in the mining process. For this article, we will examine Bitcoin mining at a high level.
<!--more-->
Before continuing, be sure to be familiar with:

- What is a [blockchain](https://www.investopedia.com/terms/b/blockchain.asp)?
- A basic understanding of what [transactions](https://en.bitcoin.it/wiki/Transaction) are.


### What does mining do for a cryptocurrency?  
Mining can be thought of as the “processor” for transactions on the blockchain. [Bitcoin.org](https://bitcoin.org/en/how-it-works) describes the process of mining as “a distributed consensus system that is used to confirm pending transactions by including them in the block chain”. Transactions are packaged into a block and then mined. This process of “mining” includes the transactions and verifies them in the chain. By continuing to mine, these transactions are confirmed and become nearly unmodifiable by attacks on the chain.

In Bitcoin, every block is connected, as the previous block hash is used to generate a new block. If a hacker wanted to modify or “double-spend” they would need to modify the previous block and rehash it before they find the next block or it becomes extremely difficult.

### What does a user get out of mining?  
While the chain and the cryptocurrency itself, benefits from users mining, users also benefit. A “miner” receives a reward for their work. This reward is a set amount per block (currently 6.25 coins for Bitcoin) and the fees of transactions that are included in the block.

The distributed mining power of the network also protects the blockchain from attacks. These attacks may include double spending or any other transaction modifying attacks. In order for these attacks to be successful, the attacker would have to rehash the block they want to modify and make the longest valid chain of blocks (highest combined difficulty of the chain of blocks). This not only becomes harder the more blocks added after the attack block, but would likely require 51% of the total hashing power.

### What is proof-of-work?  
Bitcoin uses a proof-of-work algorithm. These algorithms provide a computational proof that can be easily checked. Most often, proof of work is implemented using various hashing algorithms with a target value (a hexdecimal number set by the blockchain). In order to successfully mine a block, a miner must generate a hexademical hash that is less than the target value.

With Bitcoin, it adjusts the target value every 2016 blocks (about 2 weeks) in order to try to achieve 10 minute block times. By limiting the rate of blocks through a proof-of-work system, the coin supply is controlled and some attacks become impractical.

### How does Bitcoin mining work?  
In the case of mining Bitcoin, transactions are hashed and packaged to be included in a block. They are organized into a Merkle Tree. The following image from [Escape Velocity](https://chrispacia.wordpress.com/2013/09/02/bitcoin-mining-explained-like-youre-five-part-2-mechanics/) shows that transactions are initially hashed and then paired and hashed together. These resulting hashes may be paired again and hashed until it leaves one hash. In this type of tree, the root is called the Merkle Root.

![](/engineering-education/how-crypto-mining-works/merkle-tree.jpg)

[Image Source](https://chrispacia.wordpress.com/2013/09/02/bitcoin-mining-explained-like-youre-five-part-2-mechanics/)


Once this root hash is found, it now attempts the block hash. First, it adds the previous block hash to the Merkle Root. Then a nonce value is added and hashing can begin. The nonce value is a random number that is added in order to generate a different hash when the algorithm is run. To see this in practice, you can run the simple Python program.

```python
import hashlib

#Create string to be hashed
string = 'secret'

#Hash the string 10 times and display the output
for i in range(0,10):
	hash_sha = hashlib.sha256(string.encode()).hexdigest()
	print(hash_sha)
```

---

If you wish to learn more about the specifics of SHA256 hash algorithm, visit [Movable Type Scripts](https://www.movable-type.co.uk/scripts/sha256.html).

---

By running the program, you can see that the hash is the same every time ‘secret’ is hashed. Without the nonce value, the block hash would look similar.

Every time the miner would attempt to create a valid hash, they would just be generating the same value repeatedly. The following Python shows adding a random nonce to the string and hashing.

```python
import hashlib
from random import seed, randint

seed(1)

#Create string to be hashed
string = 'secret'

#Hash the string 10 times with a different nonce added each time, and display the output
for i in range(0,10):
    	#Generate a random nonce and add it to string
        nonce = randint(0,10000)
        string = string + str(nonce)

        hash_sha = hashlib.sha256(string.encode()).hexdigest()
        print(hash_sha)
```

In this simple example, let’s say that the target value is: 0f00000000000000000000000000000000000000000000000000000000000000

And our output from the program may show the following hashes.

![](/engineering-education/how-crypto-mining-works/hashingexampe.PNG)

The second hash: 0e6878e44ef7b460869034d35acd8cfda70330841dd71f24e559b45d01a035fe is less than the target value and would be a valid block.

If the resulting hash is less than the target value, it's valid. It’s then submitted to the network and other nodes check the block. If other nodes accept the block as valid, it’s added to the chain.

The process then starts again and continues repeating.

### Conclusion
In this article we have looked at how Bitcoin mining is completed from a higher level. We discussed how mining can be thought of as the “processor” for transactions on the blockchain. We looked at what a person gets from mining. We also looked at a simple example code snippet.

### Additional Resources

- [How to Build Your Own Private Blockchain](/engineering-education/how-to-build-your-own-private-blockchain/)

- [What is ablockchain](https://www.investopedia.com/terms/b/blockchain.asp)

- [What are transactions](https://en.bitcoin.it/wiki/Transaction)

---
Peer Review Contributions by: [Lalithnarayan C](/engineering-education/authors/lalithnarayan-c/)
