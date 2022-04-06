---
layout: engineering-education
status: publish
published: true
url: /understanding-blockchains-interoperability-via-cosmos-network/
title: Understanding Blockchains Interoperability via Cosmos Network
description: This guide will discuss how to examine the cosmos network in achieving interoperability between blockchains.
author: lewel-murithi
date: 2022-04-06T00:00:00-12:30
topics: [Blockchain]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/understanding-blockchains-interoperability-via-cosmos-network/hero.jpg
    alt: Understanding Blockchains Interoperability via Cosmos Network Hero Image
---
The adoption of crypto is still facing challenges. Its adoption is slow compared to the global users of the internet.
<!--more-->
The [blockchains](https://www.ibm.com/topics/what-is-blockchain) will still face the challenge of slow adoption because they lack [interoperability](https://www.gemini.com/cryptopedia/why-is-interoperability-important-for-blockchain). Different methods have been devised to achieve interoperability between the blockchains. However, most exchanges only operate between two blockchains.

Most interoperability approaches do not impact network efficiency, upgradeability, and sustainability. In an attempt to address these issues, [cosmos networks](https://forkast.news/what-is-cosmos-the-internet-of-blockchains/) provide a way to achieve interoperability. This article will examine the cosmos network in achieving interoperability between blockchains.

### Overview of cosmos network
Cosmos network refers to the architecture that enables different blockchains to communicate and exchange data. The main aim of the cosmos network is to develop a network where blockchains will do away with computers.

For this reason, different blockchains will no longer compete as they will work in the same environment. They follow an independent design method when developing blockchains in the cosmos environment.

The design method ensures that the [application layer](https://coinmarketcap.com/alexandria/article/what-are-application-layer-protocols) is independent of the [consensus](https://www.coindesk.com/markets/2017/03/04/a-short-guide-to-blockchain-consensus-protocols/) and [networking](https://www.researchgate.net/figure/The-network-layer-of-a-blockchain-system-is-characterized-by-the-P2P-network-topology_fig1_327484523) layers. Thus, developers can create custom applications based on their preferences and flexibility.

Furthermore, the cosmos network makes application development easy since it offers the required tools and platforms. Therefore, developers can use existing blockchains in the cosmos network to ensure its liquidity and adoption over the shortest time possible.

### How it works
The interoperability and sovereignty of the cosmos ecosystem depend on the blockchain's network architecture. The network architecture consists of three layers, as discussed below:

#### The consensus layer
Cosmos network is made up of independent blockchains. They use a consensus algorithm known as [Tendermint](https://blog.cosmos.network/tendermint-explained-bringing-bft-based-pos-to-the-public-blockchain-domain-f22e274a0fdb), which is different from the [Ethash](https://academy.bit2me.com/en/what-is-the-algorithm-of-ethash-mining/) and [Nakamoto](https://medium.com/nakamo-to/nakamoto-consensus-21cd304f96ff) algorithms.

In these two algorithms, blocks cannot be finalized instantly. Instead, Tendermint allows the blocks to be finalized upon the validators' votes. This makes the network more secure.

Furthermore, the consensus layer is concerned with security. If the [PoW](https://www.fool.com/investing/stock-market/market-sectors/financials/cryptocurrency-stocks/proof-of-work) chain is divided into two, the network auto-picks the longest chain as a primary chain. Then the transactions performed on the secondary chain are reversed.

The case is different with the Tendermint algorithm, where the network only resumes its operations when two-thirds of validators reach a consensus. This ensures a consistency of truth even if there is a network partition.

#### The networking layer
In this layer, the consensus process is involved. The [non-validator nodes](https://loomx.io/developers/en/non-validator-node.html#validator-and-non-validator-nodes) contribute to the process.

The messages conveyed between the networking layers contain various data ranging from blocks, proposals, and even consensus votes. The [validator nodes](https://learn.radixdlt.com/article/what-is-a-validator-node) work alongside the non-validator nodes.

This allows efficient interaction between the nodes, and network peers can quickly access the latest messages and transactions.

#### The application layer
As discussed earlier, the work of the consensus layer is to perform nodes validation. In contrast, the networking layer transmits messages. The application layer then passes transactions to networking and consensus layers.

In this layer, the transactions happening on the blockchain are determined. They are then forwarded to the consensus layer. The consensus and application layer communication happens through an [Application Blockchain Interface](https://blog.cosmos.network/abci-the-application-blockchain-interface-f1bd8278cdd7) (ABCI).

This interface is not limited to a specific programming language. Applications developed to operate on the cosmos network can interact with the base layers of the protocol. This is with disregard for the programming language used.

### Pillars of the cosmos network
#### Tendermint core
Since the cosmos network utilizes different technological innovations, the efficiency and security of the interoperable systems are assured. Some of these technological innovations include the [Tendermint core](https://tendermint.com/core/).

The Tendermint core and other vital components form an important building block of the cosmos hub in the cosmos network. It includes the [Byzantine Fault Tolerance](https://www.fool.com/investing/stock-market/market-sectors/financials/cryptocurrency-stocks/byzantine-fault-tolerance) feature in its network architecture.

The feature handles the regeneration of applications using the existing blockchain networks in the cosmos environment. This means it assists the users to switch to other existing blockchain networks.

For instance, an ABCI application can assist in deploying the Ethereum codebases on the cosmos network. This will ensure that the challenges of transferring [EVM](https://ethereum.org/en/developers/docs/evm/) to the cosmos are dealt with.

#### IBC protocol
The [Inter‑Blockchain Communication Protocol (IBC)](https://ibcprotocol.org/) handles interoperability between different blockchains in the cosmos network. It also sets up the interaction between blockchains through the [zone and hub model](https://www.preethikasireddy.com/post/how-does-cosmos-work-how-does-it-compare-to-bitcoin-and-ethereum-part-2).

Hubs are used to manage different zones. There is indirect interaction between the zones through the use of IBC. The reason for indirect interaction is to ensure that the scalability of the blockchain is not affected.

[Cosmos hub](https://hub.cosmos.network/main/hub-overview/overview.html) can be regarded as the primary hub of the IBC protocol. It integrates various [deterministic blockchains](https://alacritys.net/2020/07/03/what-is-determinism-in-a-blockchain-network/) into the Cosmos hub. For non-deterministic blockchains such as [Ethereum](https://ethereum.org/en/) and [Bitcoin](https://bitcoin.org/en/), cosmos uses [peg zones](https://blog.cosmos.network/the-internet-of-blockchains-how-cosmos-does-interoperability-starting-with-the-ethereum-peg-zone-8744d4d2bc3f#:~:text=A%20peg%20zone%20is%20an,chains%20like%20Bitcoin%20or%20Ethereum.).

Peg zones function as a link connecting the non-Tendermint based chains with the IBC protocol. Therefore, we can conclude that the IBC protocol allows interoperable blockchains through the cosmos hub.

#### Cosmos SDK
[Cosmos SDK](https://v1.cosmos.network/sdk) is another building block of the cosmos network. It significantly improves the innovation around the cosmos network. Developers do not have to develop applications from scratch. They can instead utilize the [cosmos PoS module](https://runtimeverification.com/blog/cosmos-modules-documentation/). Developers can also perform their customizations based on their needs and preferences.

Cosmos SDK is modular in design, making blockchains easy to deploy. Developers utilize the cosmos SDK to develop blockchain applications. These applications include [Binance Chain](https://www.binance.com/en), [Terra](https://www.terra.money/), and [Kava](https://www.kava.io/).

### Popularly known projects built on cosmos network
#### Sifchain
It is a multichannel [DEX](https://www.coinbase.com/learn/crypto-basics/what-is-a-dex) developed using the cosmos SDK. This channel chose the cosmos network because it processes transactions fast at minimal costs. It also offers better performance and has been used in popularly used blockchains.

[Sifchain](https://sifchain.finance/) can be integrated with Ethereum and cosmos networks to offer the users the advantages of each chain. It also ensured that the liquidity of the chains had been pooled together.

#### Band protocol
The [protocol](https://bandprotocol.com/bandchain) uses web APIs to extract the data. The data is then transferred to other blockchain smart contracts.

It has also unlocked a variety of cross-chain functionalities that developers can utilize. The band protocol has partnered with Terra and [Mirror](https://www.mirror.finance/) protocol as their top providers.

#### pSTAKE
Staked assets are not that liquid in the blockchain. This has not been easy for crypto-investors in years. [pStake](https://pstake.finance/) finance came to change the phenomena. They introduced a liquid staking protocol which is used in their cosmos environment.

The protocol uses a [dual token model](https://phemex.com/academy/what-is-the-dual-token-model) whereby stakers can use their assets to issue one-to-one pegged representatives. It then prospects existing investment opportunities available in the [DeFi](https://www.coinbase.com/learn/crypto-basics/what-is-defi) ecosystem.

[ATOM](https://www.kraken.com/learn/what-is-cosmos-atom) holders can maximize the efficiency of their capital through the pStake protocol, which also offers liquidity to different cross-chain DEXs using a [pBridge](https://docs.pstake.finance/Asset_Issuance_using_the_Bridge/). A pBridge forms a significant part of the protocol.

#### Comdex
It is a decentralized exchange in the cosmos ecosystem. The [platform](https://comdex.one/home) has been developed using the [persistence SDK](https://medium.com/@idiojames99/all-there-is-to-know-about-persistence-sdk-and-persistence-dapp-s-842dda7749a2).

It creates various versions of different tokenized and real-world assets. The trading platform solves the issue of past commodity markets by exposing an asset class found in a highly liquid market.

### Conclusion
Users cannot rely on a highly fragmented blockchain ecosystem. They can only adopt the blockchain network that offers interoperability. The transaction fees and scalability issues need to be addressed in blockchains. With this in mind, the cosmos network seems to be a better solution to such issues.

Cosmos network creates a space where blockchains would not compete but rather work together. This dramatically maximizes network efficiency and provides a great user experience.

### Further reading
- [Understanding Cosmos Network](https://medium.com/onomy-protocol/understanding-cosmos-the-internet-of-blockchains-fc3aa25689a0).
- [Overview of Blockchain Scalability Challenges](https://101blockchains.com/blockchain-scalability-challenges/).
- [Overview of Blockchain Interoperability](https://www.analyticssteps.com/blogs/all-about-blockchain-interoperability-2022).

---
Peer Review Contributions by: [Wilkister Mumbi](/engineering-education/authors/wilkister-mumbi/)
