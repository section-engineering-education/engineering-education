---
layout: engineering-education
status: publish
published: true
url: /different-techniques-of-encoding-data-for-transmission/
title: Different Techniques of Encoding Data for Transmission
description: This article goes through how data to be transmitted on a network is encoded. It will emphasize more on the different data encoding techniques. It will also talk about digital and analog data.
author: geoffrey-omukuba
date: 2021-09-06T00:00:00-12:00
topics: [Networking]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/different-techniques-of-encoding-data-for-transmission/hero.jpg
    alt: Different Techniques of Encoding Data for Transmission Hero Image
---
For a data packet to be appropriately transmitted on a network, it needs to be converted into the best and most reliable way of transmission. For this reason, data is encoded in a way that is best understood by computers.
<!--more-->
Data encoding is the conversion of data into digital signals i.e. zeros and ones.

This tutorial intends to cover how data to be transmitted on a network is encoded. It will emphasize more on the different data encoding techniques. It will also talk about digital and analog data.

The different data encoding techniques that we will focus on include; Non-Return to Zero Level, Non-Return to Zero, Non-Return to Zero Inverted, Bi-phase encoding, and Block encoding.

For data to be encoded, it has to be converted to signal variations.

These signal variations include:
1. Analog data to analog signal conversion – This includes; Amplitude Modulation, Phase Modulation, and Frequency Modulation.
2. Digital data to analog signals - This includes; Amplitude Shift Keying, frequency Shift Keying, and Phase Shift Keying.
3. Digital data to digital signals - This is what we will focus on.

The types of encoding techniques include:
1. Non-Return to Zero
2. Bi-phase encoding
3. Block encoding

### Non-Return to Zero scheme
Non Return to Zero signal involves both the positive and negative voltages. NRZ-Level and NRZ-Inverted are the two variations of Non return to zero scheme.

#### Non Return to Zero Level
In Non-Return to zero Level, also abbreviated as NRZ-L, level of voltage determines the value of a bit. We take positive and negative voltages to represent bit 1 and 0 respectively.

We shall have an example of data 11001100.

The first bit is 1, and in relation to rule, bit 1 is represented by a positive voltage. In this case, we draw a straight line at positive level.

The bit that follows is a 1, represented by a positive voltage. Therefore, we draw a straight line at positive level.

Bit 0 follows after bit 1, therefore, we draw a straight line at negative level.

The same process continues until all the bits are recorded.

If we connect these lines, we have our signal in NRZ-L scheme.

![Illustration image of NRZ-L](/engineering-education/different-techniques-of-encoding-data-for-transmission/nrz-l.png)

#### Non Return to Zero Inverted
In Non Return to Zero Inverted (NRZ-I), change or lack of change in the voltage level determines the value of a bit. For bit 1, there will be a change in the voltage level, and for bit 0, there won't be any change in the voltage level.

Let us look at an example.

We consider the same data as before and assume that the signal was at positive level before time 1.

For bit 1, we know that there will be a change in the signal level. Therefore, the signal will shift to negative level.

For the next bit 1, there is a change in the signal level. Since the current level is at negative, we will draw the signal at positive.

Next bit is 0, which means no change, therefore, we continue at positive level since current is at positive. Again, we have bit 0, therefore, we continue at positive level.

Next bit is 1, so we move from positive to negative.

Next bit is 1, so we have to change the level again, and hence we draw the signal at negative.

Again, we have 1, so we change the level again and go from negative to positive.

Finally, we have bit 0, meaning there won't be any change in the signal level. Therefore, we continue the signal at positive.

Next bit is also 0, hence no change.

We get the waveform below after encoding:

![Illustration image of NRZ-I](/engineering-education/different-techniques-of-encoding-data-for-transmission/nrz-i.png)

#### Problems encountered in NRZ-L and NRZ-I
Although baseline wandering is a problem for both variations, it is twice as severe in NRZ-L.

If there is a long sequence of 0s or 1s, in NRZ-I, we get flat line which causes the average signal power to become skewed. As a result, the receiver has difficulty discerning the bit value. In NRZ-I, this problem occurs only for a long sequence of 0s.

The synchronization problem also exists in both schemes. Again, this problem is more serious in NRZ-L than in NRZ-I.

While a long sequence of 0s can cause a problem in both schemes, a long sequence of 1s affect only NRZ-L.

Another problem with NRZ-L occurs when there is a sudden change of polarity in the system. If the polarity of the system changes, signal is inverted. As a result, all 0s are interpreted as 1s and all 1s are interpreted as 0s.

However, NRZ-I does not have this problem because in NRZ-I bit value is not determined by voltage level.

### Bi-phase encoding
Bi-phase encoding involves double-checking of the signal. Signals are checked at the beginning and in the middle. Due to double-checking of the signal, the clock rate is twice the rate of data transfer.

The clock synchronization is taken from the signal; hence it requires a greater bandwidth. The two types of Bi-phase encoding are Differential Manchester and Bi-phase Manchester.

#### Differential Manchester
In differential Manchester, a transition occurs whenever there is a zero in the middle of the bit interval.

For instance in our example, a signal of 101101 can be encoded as:

A voltage of signal 1 which is a high voltage starts from the top.

Now that the next bit is zero, there is a transition, and the signal starts from the top again. The same procedure is followed until all the bits are recorded.

The figure below is the resultant encoded signal:

![Illustration image of differential Manchester](/engineering-education/different-techniques-of-encoding-data-for-transmission/differential.png)

#### Bi-phase Manchester
In Manchester encoding we make an inversion whenever we find a one and no inversion whenever we found a zero.

This is challenging because, whenever we find a zero, we go back to the other side and then come back again to the same side.

We have to remember that we always start from the positive side. When we find a zero, we go to the other side and then we make a transition and come back to the same side.

Here, a transition is done in the middle of the bit interval. The resultant pulse of the transition is from high to low when input is 1 and vice versa for input 0.

For example, to encode 1011:

The first bit is 1, so we start at the top to the middle. When it is zero you start from the bottom to the middle as shown in the figure below:

![Illustration image of Bi-phase Manchester](/engineering-education/different-techniques-of-encoding-data-for-transmission/manchester.png)

### Block encoding
For clock synchronization to be achieved, redundancy is needed for error detection. This redundancy can be achieved by block encoding to improve performance.

This type of encoding changes a block of x bits into a block of y bits in which the y bits are more significant compared to the x bits;referred to as `xB/yB` encoding.

This involves three steps:

Division - In this step, a group of bits is divided into x bits.

Substitution - This is the main step; x bits are substituted for the y bit group.

Combination - Here, the y bit groups are combined to form a stream. The newly formed stream has more bits than the original bits; hence more data is sent.

The two types of block encoding are; 4B/5B and 8B/6T encoding techniques.

#### 4B/5B encoding technique
Like in Manchester encoding, clocks with double speed are required to send data.

In this type of encoding, double speed clocks are not required. Instead, 4 bits of codes are mapped to 5 bits; having a minimum of 1-bit in the group.

Double speed clocks are avoided by assigning 5 bits in place of 4 consecutive bits, which are pre-determined in a dictionary.

When choosing a 5-bit code, there should be just one leading 0 and no more than two trailing 0s. For example, a 4 bit 0110 can be used to represent a 5 bit 01110.

Hence, transmission occurs as a block of bits.

#### 8B/6T encoding technique
Two voltages have been used to send data in the previously described encoding techniques. What if we use more voltages like 3 volts or more? Can we send more data? The answer is yes.

For example, if we use 6 volts levels to represent 8 bits for a single signal, we term the type of encoding as 8B/6T encoding.

This means that we can have as many as 15625 i.e 5<sup>6</sup> combinations and 65536 i.e 4<sup>8</sup> combinations for bits.

### Pros
From this article, we learn that when Block encoding is used to encode data, more bits are sent on a network; hence it is more reliable.

Block encoding is also more efficient since no double clocks are needed to send data; hence there are no effects of poor clock synchronization.

### Cons
As discussed above, in Non-Return to Zero encoding, we realize that NRZ encoding is not a better way of encoding data for transmission due to lack of clock synchronization; hence the receiver might get a wrong message.

For reliable transmission, digital data is typically converted into digital signals using the techniques that we've studied so far.

### Conclusion
This article enlightens you to understand better Bi-phase encoding, Block encoding, and Non-Return to zero encodings.

You have understood the different types of Bi-phase encoding, both differential and Bi-phase Manchester, and encoding a message in both types.

You should be able to know the demerits of the Non-return to zero encodings and know a good method to encode a message for transmission i.e. Block encoding.

References:
- [Interfacebus](http://www.interfacebus.com/NRZ_Definition.html)
- [Coursehero](https://www.coursehero.com/file/91850719/Bautista-Assignmentdocx)
- [Pubmed](https://pubmed.ncbi.nlm.nih.gov/31496943)
- [Wisdom jobs](https://www.wisdomjobs.com/e-university/digital-communication-tutorial-1983/data-encoding-techniques-25989.html)

---
Peer Review Contributions by: [Wilson Gichuhi](/engineering-education/authors/wilson-gichuhi/)
