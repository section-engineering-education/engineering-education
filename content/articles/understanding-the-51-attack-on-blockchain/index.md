---
layout: engineering-education
status: publish
published: true
url: /understanding-the-51-attack-on-blockchain/
title: Understanding the 51% attack on blockchain
description: This article will cover the 51% attack on the blockchain. The reader will understand what it entails, its risks, and possible ways to prevent it.
author: ephraim-njoroge
date: 2021-12-08T00:00:00-17:00
topics: [Blockchain]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/understanding-the-51-attack-on-blockchain/hero.jpeg
    alt: Understanding the 51% attack on blockchain example Image
---
[Blockchain](https://www.ibm.com/topics/what-is-blockchain) technology is not a new term in today’s digital world. The technology has existed over the past few years.
<!--more-->
It is prevalent when cryptocurrencies such as [Bitcoin](https://bitcoin.org/en/) are mentioned. However, according to numerous research reports, businesses have not fully adopted the use of cryptocurrencies. Most of these businesses are relying on traditional methods in their operations instead of using blockchain technology.

Blockchain technology can be described as a structure that stores public transaction records in various databases in a network-connected environment through peer-to-peer nodes. The transactional records are known as blocks, and the various interconnected databases are referred to as a chain.

Each transaction in a blockchain is authorized using the owner's digital signature, which safeguards it from tampering. Due to this, the information is highly secured. Blockchain technology utilizes the hash encryption algorithms, in most cases [SHA256](https://www.n-able.com/blog/sha-256-encryption), to ensure that data is secure.

Blockchain technology involves adding transaction details to digital ledgers through a process known as mining. Mining involves generating the hash for the block of the transaction, which ensures that blockchain is secure.

This article will cover the 51% attack on the blockchain. The reader will understand what it entails, its risks, and possible ways to prevent it.

### Overview
1. [Introduction](#introduction)
2. [Understanding 51% attack on Bitcoin and Blockchain](#understanding-51-attack-on-bitcoin-and-blockchain)
3. [The impacts of 51% attack on Blockchain and Bitcoin](#the-impacts-of-51-attack-on-blockchain-and-bitcoin)
4. [Risks involved with 51% attack](#risks-involved-with-51-attack)
4. [The platforms faced a 51% attack](#the-platforms-faced-a-51-attack)
5. [Comparing a 51% attack with a 34% attack](#comparing-a-51-attack-with-a-34-attack)
6. [Ways to prevent a 51% attack](#ways-to-prevent-a-51-attack)
7. [Can 51% attack reoccur?](#can-51-attack-reoccur?)
8. [Wrapping up](#wrapping-up)
9. [Further reading](#further-reading)

### Understanding 51% attack on Bitcoin and Blockchain
A 51% attack happens when a malicious user in a network acquires control of a given blockchain's mining capabilities. It implies that the attackers will have more than 50% mining power and can mine faster than everyone else.

The attackers can stop the confirmation and ordering of new transactions. The malicious agents can then rewrite parts of a blockchain and reverse the transactions.

A 51% attack usually bypasses the blockchain’s security protocols. The attack's impact can be mild or severe, depending on the mining power of the attacker.

The hash power is more critical in the attacks. If the attacker possesses a higher percentage, the likelihood of attacking the system is also high. The damages caused by the attack are also dependent on the same factor.

### The impacts of 51% attack on Blockchain and Bitcoin
#### New transactions are delayed
In a 51% attack, the attackers invaded the hashing power of a bitcoin. They make new transactions to delay and initiate the use of the same coin severally.

#### Causes network disruption
Every blockchain utilizes [Proof-of-Work](https://cointelegraph.com/explained/proof-of-work-explained) (PoW) mechanism to validate the transactions. The attackers cause network disruptions by delaying the confirmation and arrangement of the blocks in chronological order.

Note that a 51% attack heavily impacts the miner's computing resources. This causes delays for the transaction to be confirmed and stored in a block. In turn, the blockchain’s network gets corrupted, allowing the attackers to process transactions faster than the miner.

#### Leads to reduced miner's reward
A 51% attack enables the attackers to reverse a transaction even before it is confirmed. This leads to double-spending a coin. Moreover, genuine miners earn less for updating the blockchain as the attackers are stealing their shares.

### Risks involved with 51% attack
A 51% attack causes cryptocurrency users to lose digital assets or even cash. Above that, it raises serious concerns about the reliability, security, and trustworthiness of a blockchain. The confidence of its users and miners is highly compromised.

The attackers can dupe the new and inexperienced users to validate and confirm the transactions that they can later invalidate. The reason is that the attackers can interfere with unconfirmed blocks and transactions in a blockchain.

In addition, the users’ transactions may not be confirmed or even reversed by the attackers. This leads the users into mistrusting the blockchain, causing it to reduce value. These kinds of attacks may cause some cryptocurrencies to be unlisted due to security concerns.

### Comparing a 51% attack with a 34% attack
Both attacks aim to manipulate the blockchain’s mining power. However, the two differs depending on the way they manipulate the blockchain.

A 34% attack alters the blockchain's ledger, which is responsible for validating a transaction using an algorithm known as the [Tangle consensus](https://tokens-economy.gitbook.io/consensus/chain-based-dag/direct-acyclic-graph-tangle-dag).

A 51% attack, on the other hand, grants an attacker complete control of the blockchain network. This, in turn, can stop further minings or coin reusability.

### The platforms faced a 51% attack
Big blockchain platforms such as Ethereum and Bitcoin are believed to be secure from 51% attacks. They are unlikely to experience a 51% attack compared to smaller projects. However, a variety of smaller projects are prone to this kind of attack.

The following are the blockchain platforms that have experienced a 51% attack:

#### Grin
According to news, [Grin](https://grin.mw/) experienced the attack where the unknown miner accumulated over 57% of the total Grin hash power.  The attacker's intention remained unknown. GRIN, a privacy-focused cryptocurrency blockchain, had to stop its payouts and advised its miners to stop their operations until the issue was resolved.

Later the blockchain was able to regain the network and imposed measures to avoid the reoccurrence of the attack.

#### Vertcoin
[Vertcoin](https://vertcoin.org/) has experienced multiple 51% attacks over the past years. It is a cryptocurrency project that aims to keep mining power decentralized. The attack saw the Vertcoin genuine blocks being replaced by the blocks the attacker wrote.

The blockchain reorganized and caused double spends which lost the users vast amounts of money.  To ensure security on its platform, Vertcoin had to switch to a more powerful PoW algorithm. It also had to block powerful mining chips from the network to keep mining more powerful and community-based.

#### Bitcoin Gold
In 2018, [BTG](https://bitcoingold.org/) blockchain suffered a 51% attack for the first time and incurred massive losses. BTG uses a variant of the [Equihash](https://academy.bit2me.com/en/what-is-equihash-mining-algorithm/) algorithm, unlike its fork Bitcoin protocol which uses the SHA256 consensus algorithm.

The developers of BTG blockchain wanted to achieve decentralization by using GPUs for mining instead of [ASIC](https://www.investopedia.com/terms/a/asic.asp) devices. However, an unknown miner managed to control more than 51% of the overall BTG hashrate leading to the attack.

In the year 2020, BTG suffered yet another 51% attack. The blockchain experienced two reorganizations in two days that let it double-spend, totalling a vast amount of money. The BTG community begged the blockchain to change its algorithm to a more secure one. They suspected there might be secret ASIC mining devices on the BTG network.

#### Ethereum Classic
In 2020, [ETC](https://ethereumclassic.org/) blockchain faced three consecutive 51% attacks in the same month. Ethereum classic uses PoW consensus algorithm same as Bitcoin. A 51% attack is expensive when performed on large networks like Bitcoin since a tremendous amount of computing power is required to do it. ETC hash rate is lower hence vulnerable to 51% attacks.

The decentralized nature of the ETC PoW makes it difficult to avoid or mitigate the 51% attacks. The attacks were reported not to have had any significant impacts on the ETC prices, but the users' trust was reduced.

### Ways to prevent a 51% attack
#### 50% Limit on a single miner
The blockchain should ensure that no single miner or group of miners controls more than 50% of the hashing power. It would be impossible for a single miner or a group to attack the network by outbuilding the longest validated blockchain. To achieve the attack, it would mean that the attacker has to own powerful hardware and requires much energy. Also, an attacker may need luck since the mining process would be random.

A good example is Bitcoin, where its network and hash rate are vast and complex enough to be a substantial initial investment for an attacker to rent mining equipment. Ethereum Classic, on the other hand, is more prone to the attack since its overall hash rate is relatively small compared to Bitcoin.

#### Using Proof of Stake
A single miner can become the majority player in a small blockchain network.  All the blockchain networks that use PoW have a policy that the miners have to upgrade their equipment regularly. Failure to which, they may not receive the block rewards, and they will fall behind other miners in the network.

To avoid the risk of a 51% attack, the blockchain can use [Proof of Stake](https://www.fool.com/investing/stock-market/market-sectors/financials/cryptocurrency-stocks/proof-of-stake) (PoS), which is a more secure consensus than PoW. In most cases, the PoS incentives are controlled by most affluent users unlikely to perform the attack. However, blockchains have moved from this structure, and they prefer more decentralized alternatives such as [Delegated-Proof-of-Stake](https://academy.binance.com/en/articles/delegated-proof-of-stake-explained) (DPoS).

#### Strong network community
When using the PoS or DPoS, a user with a minimal stake level in a network is voted a [block validator](https://support.avax.network/en/articles/4064704-what-is-a-blockchain-validator). The validators are voted in by the community. In case of collusion to compromise the network, they are thrown out of the network by the community.

This approach prevents the occurrence of a 51% attack. It is also effective in avoiding double-spending as the rules for the malicious validators are coded into the blockchain.

### Can 51% attack reoccur?
There is a high possibility that a 51% attack can reoccur if the attacker embedded a bug in the blockchain’s code. An attacker can manipulate the blockchain to reproduce new blocks faster to initiate the second attack.

In summary, an attacker can attack the blockchain again. It is upon the blockchain to ensure that their systems are more secure and resilient.

### Wrapping up
Risks and vulnerabilities will always be expected for a growing, fast, promising technology like cryptocurrency and blockchain. This article has covered the risks of 51% attacks and possible ways to mitigate them.

The upcoming technology is promising, though, to solve these security hitches and even improve the system. However, these kinds of attacks should help the companies and industries to learn new prevention ways and improve their existing platforms for the best. The future is also promising in this field, and we cannot wait to see more improvements in the industry.

### Further reading
- [Understanding Blockchain Technology](https://blockgeeks.com/guides/what-is-blockchain-technology/).
- [Overview of 51% Attack](https://www.coindesk.com/learn/what-is-a-51-attack/).
- [Implementation of Blockchain Consensus Algorithm](https://www.hindawi.com/journals/scn/2021/9918697/).
- [Chain Reorganization](https://learnmeabitcoin.com/technical/chain-reorganisation).

---
Peer Review Contributions by: [Willies Ogola](/engineering-education/authors/willies-ogola/)
