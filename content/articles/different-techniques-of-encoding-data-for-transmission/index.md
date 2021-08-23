### Introduction
For a data packet to be transmitted properly on a network, it needs to be converted into the best and most reliable way of transmission. In this way, this data is encoded in a way that is best understood by computers. This is the conversion of data into signals. These signals are then converted into binary digits 1s and 0s for transmission.

This article intends to cover how data to be transmitted through a network is encoded. This will emphasize more on the different data encoding techniques. It will also talk about digital and analog data.

The different data encoding techniques that shall be focused on include; Non-Return to Zero Level, Non-Return to Zero, Non-Return to Zero Inverted, Bi-phase encoding, and Block encoding.

Data encoding types shall also be discussed.
For this data to be encoded it has to be converted to signal variations. These signal variations include;

Analog data to analog signal conversion – This includes Amplitude Modulation, Phase Modulation, and Frequency Modulation.

Modulation techniques for digital data to analog signals include:
1. Amplitude Shift Keying
2. Frequency Shift Keying
3. Phase Shift Keying

Digital data to analog signals – This is what we will cover in this article.
The types of encoding techniques include
1.  Non-Return to Zero
2.  Bi-phase encoding
3.  Block encoding


### Non-Return to Zero
In this encoding technique;
High voltages are represented by 1s.
Low voltages are represented by 0s.
During bit interval, voltages remain the main.

This is the main behavior of this encoding technique.
There is no indication for the beginning and the ending of a bit. Due to no voltage change during bit interval, there is no difference in the value of the previous and present bit.

![Illustration image of Non-Return to Zero](/engineering-education/different-techniques-of-encoding-data-for-transmission/nrz.png)

The above diagram shows the NRZ encoding techniques.
The main disadvantage of NRZ is that the long voltage level causes the loss of clock synchronization and hence the receiver is not able to differentiate between 0s and 1s.

 The two types of NRZ encoding include;
- Non-Return to Zero level
- Non-Return to Zero Inverted

#### Non-Return to Zero Level (NRZ-L)
If the incoming signal changes from 1 to 0 or from 0 to 1, the polarity changes.
The first input signal should always have a polarity change.
#### Non-Return to Zero Inverted
If the input current is a 1, there is a progression just at starting of the bit interval.
The main disadvantage of the NRZ encoding is that there is a disturbance in clock synchronization between the transmitter clock and the receiver clock.
### Bi-phase encoding
There is double-checking of the signal.
Signals are checked at the beginning and in the middle.
Due to double-checking of the signal; the rate of the clock is twice the rate of data transfer.

The clock synchronization is taken from the signal hence it requires a greater bandwidth.
We have Differential Manchester encoding and Bi-phase Manchester.

#### Differential Manchester
In Differential Manchester, in the middle of the bit interval, a transition occurs.
At a point where a change occurs at the start of a bit interval, it is an indication that the input signal was 0 unless otherwise.
#### Bi-phase Manchester
Here, a transition is done in the middle of the bit interval.
The resultant pulse of the transition is from high to low when input is 1 in the middle and vice versa for input 0.

NRZ-L, NRZ-I, Biphase Manchester and Differential Manchester coding waveforms for different digital inputs are shown in the image below.

![Illustration image of different waveforms of Bi-phase and Non-Return to Zero encoding](/engineering-education/different-techniques-of-encoding-data-for-transmission/waveforms.png)
### Block encoding.
For clock synchronization to be achieved, redundancy is needed for error detecting. This redundancy can be achieved by block coding to improve performance. This type of encoding changes a block of x bits into a block of y bits in which the y bits are larger than the x bits. Referred to as xB/yB encoding. This
type of normally involves three steps i.e

Division- In this step, a group of bits is divided into x bits.
Substitution-In this step, this is the main step, x bits are substituted for the y bit group.
Combination-Here, the y bit groups are combined to form a stream.
The newly formed stream has more bits than the original bits hence more is sent.

The two types of block encoding are; 4B/5B and 8B/6T encoding techniques.
#### 4B/5B encoding technique.
Like in Manchester encoding, clocks with double speed are required to send data.

In this type of encoding, double speed clocks are not required rather 4 bits of codes are mapped to 5 bits having a 1-bit minimum in the group.

Double speed clocks are avoided by assigning 5 bits in place of 4 consecutive 4 bits which are pre-determined in a dictionary.
When choosing a 5-bit code, there should be just one leading 0 and no more than two trailing 0s.

Hence, transmission occurs as a block of bit.
#### 8B/6T encoding technique
Two voltages have been used to send data in the previously described encoding techniques but what if we use more voltages like 3 volts or more? Can we send more data? The answer is yes.

 For example, if we use 6 volts levels as a representation of 8 bits for a single signal, we term the type of encoding as 8B/6T encoding.

This means that we can have as many as 15625 i.e 5<sup>6</sup> combinations and 65536 i.e 4<sup>8</sup> and combinations for bits.

## Pros
From this article, we learn that when Block coding is used to encode data, more bits are sent on a network hence it is more reliable.
Block encoding is also more efficient since there are no double clocks needed to send data hence there are no effects of poor clock synchronization.

## Cons
As discussed above, in Non-Return to Zero encoding, we realize that NRZ encoding is not a better way of encoding data for transmission due to lack of clock synchronization hence the receiver might get a wrong message.

For reliable transmission, digital data is typically converted into digital signals using the techniques that we've studied so far.
### Conclusion
This article enlightens readers for a better understanding of Bi-phase encoding, Block encoding, and Non-Return to zero encodings.

The reader should be able to understand the different types of Bi-phase encoding both differential Manchester and Bi-phase Manchester and be able to encode a message in both two types.

The reader should be able to know the demerits of the Non-return to zero encodings and know a good method to encode a message for transmission i.e, Block encoding,

References:
- [Link to interfacebus web page](http://www.interfacebus.com/NRZ_Definition.html)
- [Link to coursehero web page](https://www.coursehero.com/file/91850719/Bautista-Assignmentdocx)
- [Referenced from pubmed](https://pubmed.ncbi.nlm.nih.gov/31496943)
- [Link to wisdom jobs web page](https://www.wisdomjobs.com/e-university/digital-communication-tutorial-1983/data-encoding-techniques-25989.html)
