---
layout: engineering-education
status: publish
published: true
url: /quantum-key-distribution/
title: Quantum Key Distribution Overview
description: This article will provide an overview of the quantum key distribution process. It will also provide a brief overview of the quantum key distribution protocols.
author: oliver-mulwa
date: 2022-02-22T00:00:00-18:30
topics: [Security]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/quantum-key-distribution/hero.jpg
    alt: Quantum Key Distribution QKD
---
Quantum key distribution (QKD) is an advanced sub-disciplines of quantum information technology. It aims at coming up with novel and sophisticated methods of securely exchanging cryptographic keys by use of basic quantum mechanical concepts such as entanglement and measurement.
<!--more-->
Since the 1970s, with the advent of [quantum cryptography](/engineering-education/quantum-cryptography/), researchers and academics have proposed a handful of quantum key distribution protocols. The earliest of such was proposed in 1984.

### Table of contents
- [Prerequisites](#prerequisites)
- [Stages of Quantum Key Distribution](#stages-of-quantum-key-distribution)
- [Quantum Key Distribution schemes](#quantum-key-distribution-schemes)
- [Quantum Key Distribution protocols](#quantum-key-distribution-protocols)
  - [1. BB84 protocol](#1-bb84-protocol)
  - [2. B92 protocol](#2-b92-protocol)
  - [3. Six-state protocol](#3-six-state-protocol)
  - [4. SARG04 protocol](#4-sarg04-protocol)
  - [5. BBM94 protocol](#5-bbm94-protocol)
  - [6. E91  protocol](#6-e91-protocol)
- [Attacks against QKD protocols](#attacks-against-qkd-protocols)
- [Advantages of QKD](#advantages-of-qkd)
- [Downsides of QKD](#downsides-of-qkd)
- [Further reading](#further-reading)

### Prerequisites
To follow along with this article, you are required to have some understanding of quantum computing.

### Stages of quantum key distribution
QKD has two steps associated with it:
1. Quantum communication
2. Classical post-processing

*Quantum communication* involves encoding bits in a polarization state followed by sending of the encoded bits. Decoding happens after transmission successfully completes. This phase happens via a quantum channel.

*Classical post-processing* occurs after decoding of the sent bits. Here, the two communicating parties compare the bases used in encoding and decoding. Then, they perform tests to detect eavesdropping.

### Quantum key distribution schemes
There are two major quantum key distribution schemes:
1. Prepare and measure (P&M)
2. Entanglement based (EB)

*P&M*, as its name suggests, involves preparing a sequence of bits to be transmitted and measured. It takes advantage of the **measurement** property in quantum mechanics. This is particularly useful in detecting eavesdropping. This scheme forms the backbone of a number of QKD protocols such as BB84, B92, and SARG04.

*EB* relies on the phenomenon of quantum entanglement. Entanglement is simply the property in which two quantum bits (referred here to as bits) are inextricably linked such that a measurement of one bit yields a correlated result in the other. E91 and BBM94 are popular protocols based on the EB scheme.

### Quantum key distribution protocols
QKD protocols come in two flavors:
1. Discrete variable (DV) QKD
2. Continuous Variable (CV) QKD

DV-QKD protocols are the most practical and easiest to understand. Let's address protocols belonging to this category.

#### 1. BB84 protocol
This was the first QKD protocol to be developed. Consider a scenario where *Alice* and *Bob* are attempting to establish a secret key. Eavesdropper *Eve* tries to gain knowledge of the key during this process.

*Alice* generates a sequence of bits using classical means. She then randomly encodes each bit of the sequence in a polarization state. She does this by choosing [standard](https://www.statlect.com/matrix-algebra/standard-basis) or [Hadamard](https://en.wikipedia.org/wiki/Hadamard_transform) bases. She sends the encoded bits to *Bob* via a quantum channel. *Bob* measures each bit in the sequence by choosing a basis at random.

Using a classical channel, *Alice* confirms that *Bob* has received every bit she sent. After an affirmative confirmation, they tell each other what bases they used for encoding and decoding. If the bases agree, they both have the same bit values. If they chose different bases, there is only a 50% chance the bits match. 

They discard the bits in which encoding and decoding bases differed. This leaves on average half of the number of bits transmitted. A subset of the remaining bits is used to confirm no eavesdropping occurred. That subset is discarded afterwards and the remaining bits now become the secret key.

#### 2. B92 protocol
This is the simplest QKD protocol. *Alice* prepares a bit in one of two quantum states. She then sends it to *Bob* who uses a suitable basis for measurement to recover the state encoded by *Alice*. This becomes insecure if *Alice*'s encoded bits are orthogonal. Orthogonal states are like classical states (0 or 1). This means that it becomes susceptible to accurate measurement and copying by *Eve*.

#### 3. Six-state protocol
This protocol is a variant of the BB84. It enhances key generation rate as well as the noise tolerance. It uses 3 bases for encoding and decoding hence it's name.

#### 4. SARG04 protocol
This protocol is similar in some ways to the BB84. It uses the same procedure as the BB84 to send bits between *Alice* and *Bob*. The difference comes in the classical post-processing phase.

In classical post-processing, *Alice* does not explicitly mention her encoding bases. She only announces a pair of non-orthogonal states. *Bob* uses this knowledge to infer which of their bits matched and which didn't. The matching bits establish a secret key.

#### 5. BBM94 protocol
A single source creates a sequence of entangled bits. Each half of the bits are sent to *Alice* and *Bob* who measure their received bits in only two [mutually unbiased bases](https://en.wikipedia.org/wiki/Mutually_unbiased_bases). *Alice* and *Bob* communicate the bases they used over a classical channel. They both discard bits measured using different bases. 

They choose to keep bits which had same bases of measurement. Bits measured using the same basis will get a correlated result. This is due to the entanglement property. This will derive a secret key for secure communication. A small sample is then used to check for errors and detect eavesdropping.

#### 6. E91 protocol
In this protocol, *Alice* and *Bob* receive each half of entangled bits from a single source. They then measure their bits in the standard or Hadamard bases. Thereafter, they make a comparison on which of their bits matched and which did not. They use the different bits to carry out the [CSHS](https://brilliant.org/wiki/bells-theorem/) test. The result of this test will show whether there was eavesdropping.

### Attacks against QKD protocols
A simple attack which *Eve* can perform is to intercept the encoded bits. She measures the bits using calcite crystal and photon detector. Then she sends the bits to *Bob*. *Eve*'s random measurement bases will change the bits in some fundamental sense before reaching *Bob*. This is because of the [no-cloning theorem](https://physicstoday.scitation.org/doi/abs/10.1063/1.3086114?journalCode=pto). The result is that *Bob* has a quarter probability of measuring a different bit value than the one *Alice* sent. By doing this, *Eve* introduces a high error rate. This increases the chances of detecting her activity.

A more potent attack is the Photon Number Splitting (PNS) attack. In this attack, a source may emit many bits with identical encodings. *Eve* then performs a measurement that does not destroy the quantum state of the bits. This is called a non-demolition measurement. She then determines the number of bits. 

If the number of bits sent at a time is more than one, she steals the excess bit and forwards the remaining identical bit to *Bob*. She now waits for *Alice* to make known her encoding bases. She now uses this knowledge to make sharp measurements of her stolen photons. This means she will always get identical results to *Alice* and *Bob*. This results in *Eve* being able to derive the secret key.

### Advantages of QKD
QKD uses the laws of physics to guarantee its security. This is as opposed to its classical counterparts which rely on computational hardness and mathematical intractability.

QKD is also future-proof. This means that it is impossible to store information obtained during the key exchange process and hack it at a later time. This makes it very attractive in securing data that have lengthy lifespans. QKD gives the ability to detect eavesdropping which is also a distinct advantage.

### Downsides of QKD
*Eve* can always interfere whenever there is an instance of key exchange. This is regardless of whether she intends to gain any information. This causes an abortion and restarting of the process. A consequence of this act is a Denial of Service (DOS).

*Eve* can always pose as *Bob* to *Alice* and as *Alice* to *Bob* during exchange of keys. This is especially possible when the two legitimate communicating parties are using a non-authenticated classical channel.

It is also vital to note that QKD faces hardware issues. A substantial change of current hardware infrastructure is needed in order to realize a practical QKD network. A single change in a protocol may necessitate a change of hardware. This in the long run may end up being very costly.

### Conclusion
In a world where technology seems to get only better, creative solutions are needed in order to secure our communications online. QKD promises to be such a solution. This approach will be a pivotal element of our online information security, especially when universal quantum computers get here. 

### Further reading
- Attacks on quantum key distribution protocols that [employ non-ITS authentication](https://arxiv.org/pdf/1209.0365)

---
Peer Review Contributions by: [Geoffrey Mungai](/engineering-education/authors/geoffrey-mungai/)
