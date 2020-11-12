## How Does Cryptocurrency Mining Work?  
It is hard to talk about cryptocurrency without mentioning mining. Mining cryptocurrency is a complex mathematical system, generally utilizing cryptographic hashing algorithms. For the purposes of this article, Bitcoin mining at a high level will be examined. 

### What Does Mining Do for the Cryptocurrency?  
Mining can be thought of as the "processor" for transactions on the blockchain. [Bitcoin.org](bitcoin.org/en/how-it-works) describes the process of mining as "a distributed consensus system that is used to confirm pending transactions by including them in the block chain". Transactions are packaged into a block and then mined. This process of "mining" includes the transactions and verifies them in the chain. By continuing mining, these transactions are confirmed and become nearly unmodifiable by attacks on the chain. 

In Bitcoin, every block is connected, as the previous block hash is used to generate a new block. If a hacker wanted to modify or "double-spend"

### What Does A User Get Out of Mining?  
While the chain and the cryptocurrency itself, benefits from users mining, users also benefit. A "miner" receives a reward for their work. This reward is generally a step amount per block and the fees of transactions that are included in the block. 

The distributed mining power of the network also protects the blockchain from attacks, like double spending or any other transaction modifying attacks. In order for these attacks to be successful, the attacker would have to rehash the block they want to modify and make the longest valid chain of blocks (highest combined difficulty of the chain of blocks). This not only becomes harder the more blocks added after the attack block, but would likely require 51% of the total hashing power.

### What is Proof-of-Work?  
Bitcoin uses a proof-of-work algorithm. These algorithms provide a computational proof that can be easily checked. Most often, proof of work is implementing using various hashing algorithms with a target value. In order to successfully mine a block, a miner must generate a hash that is less than the target value with a certain difficulty value.

In the case of Bitcoin, the target value is adjusted every 2016 blocks (about 2 weeks) in order to try and achieve 10 minute block times. By limiting the rate of blocks through a proof-of-work system, the coin supply is controlled and some attacks become impractical. 

### How Does Bitcoin Mining Work?  
In the case of mining Bitcoin, transactions are hashed and packaged. They are organized into a Merkle Tree. The following image from [Escape Velocity](https://chrispacia.wordpress.com/2013/09/02/bitcoin-mining-explained-like-youre-five-part-2-mechanics/) shows that transactions are initially hashed and then paired and hashed again. These hashes may be pair again and hash until you are at a single root. In this type of tree, the root is called the Merkle Root. 

![](https://chrispacia.files.wordpress.com/2013/09/merkle-tree.jpg?w=300&h=267)

Once this root hash is found, the block hash is now attempted. First, the previous block hash is added to the Merkle Root. Then a nonce value is added and hashing can begin. The nonce value is a random number that is added in order to generate a different hash when the algorithm is run. To see this in practice, you can run the simple Python program.

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

By running the program, you can see that the has is the same every time 'secret' is hashed. Without the nonce value, the block hash would look similar. Every time the miner would attempt to create a valid hash, they would just be generating the same value over and over again. The following Python shows adding a random nonce to the string and hashing. 

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

In this simple example, let's say that the target value is: 0f00000000000000000000000000000000000000000000000000000000000000

And our output from the program may show the following hashes. 

![](https://newsitech.weebly.com/uploads/2/0/5/4/20542424/hashingexampe_orig.png)

The second hash: 0e6878e44ef7b460869034d35acd8cfda70330841dd71f24e559b45d01a035fe is less than the target value and would be a valid block.

If the resulting hash is less than the target value, it is valid. It is then submitted to the network and other nodes check the block. If other nodes accept the block as valid, it is added to the chain. 

The process then starts again and continues repeating.
