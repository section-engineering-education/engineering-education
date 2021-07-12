---
layout: engineering-education
status: publish
published: true
url: /bitcoin-vs-ethereum/
title: Bitcoin vs. Ethereum
description: This article will discuss the key differences between Bitcoin and Ethereum from a technical perspective. It also outlines the concepts and advantages that contribute to the popularity of these cryptocurrencies.
author: lalithnarayan-c
date: 2021-03-24T00:00:00-07:30
topics: [Blockchain]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/bitcoin-vs-ethereum/hero.jpg
    alt: Bitcoin vs Ethereum
---
This article will examine the critical differences between the two largest cryptocurrencies in circulation and market value. We will cover some of the key concepts that enable these cryptocurrencies. Advantages such as decentralization, peer-to-peer architecture, secure and anonymous transactions have boosted cryptocurrencies' adoption. 
<!--more-->
Both Bitcoin and Ethereum use cryptography to enable transactions. Let us quickly go through the different types of cryptographic techniques used.

### Cryptography 
Cryptography plays a crucial role in ensuring transactions are secure and anonymous. The various methods used in cryptocurrencies are as follows:

1. Symmetric Encryption Cryptography: A secret key is used to encrypt and decrypt the message at the source and destination addresses respectively. Identifying the secret key is a challenging task and probabilistically infeasible to determine. However, this approach has many issues with security and scalability.

2. Asymmetric Encryption Cryptography: In this method, instead of using a single secret key, two keys are used: a public key and a private key. 

![Assymetric Key cryptography](/engineering-education/bitcoin-vs-ethereum/Assymetric_Key_Cryptography.png)
   
[*Image Source*](https://cheapsslsecurity.com/blog/what-is-asymmetric-encryption-understand-with-simple-examples/)

Through the use of key pairs, we can ensure enhanced security. The public key is shared with the public. Bitcoin addresses are an example of public keys. The private key, on the contrary, is known only at the source. The message can be decrypted only using the private key. This is the reason for the enhanced sense of security.  

3. Hashing is used in blockchain significantly. 

4. Digital signatures are complementary methods that allow anonymous users to display genuineness. 

They possess the following features: 
- *Verifiable*
- *Anti-forgeable*: 
- *Bound by contracts* this eliminates the possibility of denying the commitment once signed.

### Bitcoin
Termed as digital gold, Bitcoin recently passed a market valuation of 1 trillion dollars. The valuation exceeds that of many tech giants and multi-national corporations. Let us understand the technical aspects of Bitcoin running transactions at such a large scale with ease. 

#### Timestamped logs
Blockchain derives its name from the concept behind it: a chain of blocks. The blocks contain logs of transactions that are timestamped. Once a transaction is made, no stakeholder in the network can reverse it. In the current banking system, banks can mediate between two parties in case of any disputes.

Banks charge for this assurance of mediation. It is called the `cost of trust` borne by the customers. In Bitcoin, the cost of trust is minimized by making the blocks immutable and adding a heavy penalty to act as an adversary in the system. This property is referred to as append-only timestamped logs.

#### Decentralized network consensus
As discussed in an [earlier article](/blockchain-consensus-protocols/) on various consensus protocols, Bitcoin uses the `Proof of Work` protocol. Proof of work requires that a cryptographic puzzle be solved. A distributed ledger is maintained across all the nodes verifying the transactions. 

#### Proof of work protocol
Each block contains a highly selective `hash` value computed based on the previous blocks in the blockchain. The term `highly selective` is of importance here. The hash values are computed such that a specified number of trailing zeroes are present in it. 

The data is coupled with a value called the `nonce`. Various values of the nonce are tested to generate the hash value thus, satisfying the specified condition. In the example below, we implement a Python code to understand the importance of hashing. 

```py
from hashlib import sha256
import random

nounce = 0
numer_of_trailing_zeros = 4
for nounce in range(100000):
    text =  'transaction' + str(random.randint(0,1000)) + str(nounce) 
    hash = sha256(b'' + text.encode()).hexdigest()
    if hash.startswith(numer_of_trailing_zeros*'0'):
        print('nounce:',nounce)
        print('hash:',hash)
        break
```

Running the following code generates the following output:

```bash
nounce: 66053
hash: 0000a17d817a5b5414cce89e889278fcb60c6232208b1cc8933014009fd8fa2e
```

For more details on the Proof of Work protocol, refer to my previous article on [various consensus protocols](/blockchain-consensus-protocols/).

#### Ledgers and transaction code
The ledger is the critical component upon which all transactions are allowed and verified. Bitcoins work on distributed ledger systems. However, we should define ledgers to understand them critically. 

Ledgers are analogous to state transition systems. It contains the ownership status of all the bitcoins mined. For example, if one wants to transact with Bitcoins, the state transition function checks for available balance. If there is a sufficient amount, the Bitcoin is deducted from the sender and added to the receiver. 

*Unspent Transaction Outputs*, abbreviated as UTXO, is a collection of all the coins that have been mined and yet to be spent. Each UTXO contains the value and the owner's public key. A new transaction shall contain a reference to an existing UTXO containing references to the previous transactions made. This system is put in place to solve the `double-spending` problem.

### Ethereum
While Bitcoin was introduced in 2009, Ethereum was introduced in the year 2013. Quoting from the [whitepaper](https://ethereum.org/en/whitepaper/), Ethereum's goal is given as follows: Ethereum aimed to provide a blockchain with built-in fully fledged Turing-complete programming language that developers can use to create `contracts`. 

These contracts are used to encode arbitrary rules for transactions in the form of state transition functions thus, allowing users to create several decentralized applications. In other words, it is regarded as a "programmable blockchain."

#### Scripting
Ethereum uses a Turing-complete scripting language to encode terms of usage. `Smart contracts` are contracts that bind the buyers and sellers. Ethereum aims at creating custom contracts that bind these two parties. [Solidity](https://auth0.com/blog/an-introduction-to-ethereum-and-smart-contracts-part-2/) is a [Turing complete programming language](https://stackoverflow.com/questions/7284/what-is-turing-complete) used to define and code smart contracts. 

### Migration to Proof of Stake
Proof of Work protocol has challenges related to energy consumption and time taken to process each block. Ethereum has ambitious plans to migrate to Proof of Stake protocol, reducing energy usage dramatically, and offering better security features.

### Technical differences
| Properties| Bitcoin | Ethereum |
|----|:----|:----|
| Founder | Satoshi Nakamoto| Vitalik Buterin |  
| Genesis | 2009 | 2013 |  
| Coding Contracts | Non-Turing (Script) | Turing Complete (Solidity, Serpent, LLL, or Mutant ) |  
| Ledger | UTXO Transactions | State - Account-Based |  
| Transactions | Merkle Trees based Transactions | Transactions, state, storage, receipts(w/nonces) |  
| Block time | 10 minutes| 14 seconds |  
| Consensus | Proof of Work | Proof of Stake |  
| Hash function |SHA 256 | Ethash |  

### Conclusion
In this article, we considered the differences between the two largest cryptocurrencies. In the future, a cryptocurrency with better technical features will dominate and facilitate transactions. 

The dominance of Bitcoin and Ethereum is not guaranteed forever. However, until the next disrupting cryptocurrency, these cryptocurrencies will maintain their dominance.

Happy learning.

---
Peer Review Contributions by [Wanja Mike](/engineering-education/authors/michael-barasa/)