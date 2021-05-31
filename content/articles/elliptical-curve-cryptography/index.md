---
layout: engineering-education
status: publish
published: true
url: /elliptical-curve-cryptography/
title: How Does Elliptical Curve Cryptography Work?
description:  Elliptical curve cryptography is a next-generation public key cryptography system that provides a significant increase in security over previous generations.
author: gregory-manley
date: 2020-03-06T00:00:00-07:00
topics: [Security]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/elliptical-curve-cryptography/hero.jpg
    alt: elliptical curve cryptography
---
There are many modern encryption algorithms, each of which have their own strengths. Elliptical curve cryptography (ECC) is a family of algorithms that are based upon elliptical curves. ECC is a next-generation public key cryptography system that provides a significant increase in security over previous generations.
<!--more-->
### Background
According to [Cloudflare](https://blog.cloudflare.com/a-relatively-easy-to-understand-primer-on-elliptic-curve-cryptography/), the turning point in cryptography occurred in 1977 with the introduction of the RSA and the Diffie-Hellman key exchange algorithms. These were revolutionary because they were the first cryptographic schemes where security was based upon the Theory of Numbers, which nearly all modern cryptography standards are.

### What is Elliptical Curve Cryptography?
To start, the general equation of an elliptical curve is:

![y^2 = x63 +ax+b](https://latex.codecogs.com/gif.latex?y^2&space;=&space;x^3&space;&plus;&space;ax&plus;b)

These curves have two interesting features, being:

- **Three Points on a Line** - If you find the line between any two points, that line will always intersect another point on the curve.
- **Horizontal Symmetry** - Any point on the curve can be reflected over the x-axis and remain on the curve.

When using elliptical curves for cryptography, only whole numbers or the resulting number from modding (finding the remainder of) the equation by a prime number are used. Despite the fact that the resulting plot of points does not look like a curve any more, by wrapping the line that goes between two points around the confines, you still intersect a third point. Then that point can be reflected over the x-axis which results in the desired point. This process is known as point addition.

### What Uses Elliptical Curves?
The elliptical curve is used by Bitcoin, Ethereum, and many other cryptocurrencies. Specifically, Bitcoin uses the secp256k1 curve, which has the equation:

![y^2=x^3+7](/engineering-educationhttps://latex.codecogs.com/gif.latex?y^2=x^3&plus;7)

This equation is used to find the public key based upon a value (your private key, which is a random 256-bit integer) telling you how many times to do point addition. For Bitcoin, that point is:

**x-coordinate:** `55066263022277343669578718895168534326250603453777594175500187360389116729240`
**y-coordinate:** `32670510020758816978083085130507043184471273380659243275938904335757337482424`

Then, in order to make sure the resulting values can fit in 512-bit public keys, both sides of the equation are modded by the largest prime number below 2^256:

 `1.15792089237316195423570985008687907853269984665640564039457584007913129639747 × 10^77`

The remainder is found by dividing both sides by the previous number. Then, the desired point is found using an equation between two points, finding the third intersection, and reflecting over the x-axis, doing this operation as many times as desired.

Elliptical Curve Cryptography is common in many cryptocurrencies, as they are the modern basis for public-private key cryptography. It is nearly impossible to find the private key from the resulting public key after all the operations are done, we simply do not have the computing power on Earth (excluding Quantum Computing). This allows us to have a modern, extremely secure, and relatively fast cryptographic standard.
