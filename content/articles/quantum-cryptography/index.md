---
layout: engineering-education
status: publish
published: true
url: /quantum-cryptography/
title: Is Quantum Cryptography the Future of Encryption?
description: As momentum around quantum computing continues to build, will current encryption methods be able to stand up to the processing power? Quantum encryption aims to use quantum mechanics to protect data from hacking threats.
author: justin-osborne
date: 2020-05-21T00:00:00-07:00
topics: [Security]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/quantum-cryptography/hero.jpg
    alt: quantum cryptography
---
Encryption is a hidden part of everyday life, providing data protection around everything from emails to bank accounts. With quantum computing gaining momentum, there are concerns about information becoming more vulnerable to hacking. Quantum encryption aims to use quantum mechanics to protect data from hacking threats. Let's dive into the basics.
<!--more-->

### What is quantum computing?
[Quantum computing](https://www.ted.com/talks/shohini_ghose_a_beginner_s_guide_to_quantum_computing/discussion#t-564536) operates from something called a qubit. These qubits can simultaneously demonstrate multiple states of existence until the point it is measured, where it provides a single state of existence as an answer. Imagine a qubit on a spectrum. If the bit were to exist in between the one and the zero, it could have 20 percent zero and 80 percent one, or any mixture of chances.

In terms of processing, a computer would test every possibility individually, while a quantum computer would test every possibility at the same time with these mixtures of chances. Much like trying chocolate-vanilla combination ice cream and discerning that one likes the vanilla more than the chocolate, rather the computer would try each flavor individually.

By comparison, a few qubits put together have enough processing power to solve a problem instantaneously that would take some computers thousands of years to solve. In addition to this processing capacity, it has the ability to solve a large majority of the math-based encryptions that are currently used today in a short matter of time.

### Why use quantum cryptography?
Cryptography is the art of scrambling data, typically text or images, with enough random numbers that data can’t be read without the key to access the information. In reality, these encryptions are hardly random. As quantum computing evolves, there is increased risk that a system will find a way to break today's encryptions and access all data by instantaneously solving these sequences.

Quantum encryption adds an extra dimension where the numbers can truly be random. The quantum encryption then takes on the properties of the quantum particle such as having multiple states of existence and not being able to measure it without disturbing the particle. It is extra secure from hacking since any interference would change the state of the particle and therefore make it unmeasurable and incapable of replicating.

### How quantum cryptography works
The current process for [quantum cryptography](https://quantumxc.com/quantum-cryptography-explained/), also known as quantum key distribution, sends photons through fiber optic cables in an ordered sequence. The sequence of photons passes through a polarizer that randomizes the orientation of the photon sent to the receiver. A receiver only accepts photons of a certain orientation and disregards the rest. These photons are then accepted as the key matching the encrypted data.

### Limitations
While quantum cryptography is theoretically un-hackable, there remain some limitations. The transfer of data is still constrained to the physical requirements. Any network that transfers data uses relays and repeaters, which are vulnerable to tampering. Additionally, this concept is still highly theoretical and new ways to exploit quantum cryptography are still in the early stages of testing. Whatever the case, it is expected that quantum cryptography will play an integral role in the future of data encryption.

It's also worth noting the distinction between quantum encryption and [post-quantum encryption](https://en.wikipedia.org/wiki/Post-quantum_cryptography) (sometimes referred to as quantum-proof, quantum-safe, or quantum-resistant), which is implemented on a classic, non-quantum computer but designed to be resistant to a quantum computer that is capable of hacking it. This is especially important since most of us still only have non-quantum phones and laptops.
