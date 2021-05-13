---
layout: engineering-education
status: publish
published: true
url: /understanding-error-correcting-codes-part-1/
title: An Introduction to Error-Correcting Codes - Part 1
description: Error-correcting codes are one of the most fundamental concepts that keep our technology-driven society running.
author: ian-jorquera
date: 2020-05-22T00:00:00-07:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/understanding-error-correcting-codes-part-1/hero.jpg
    alt: error-correcting codes
---
The spacecraft [Juno](https://en.wikipedia.org/wiki/Juno_(spacecraft)) has taken countless [pictures](https://www.nasa.gov/mission_pages/juno/images/index.html) of chaotic storms on Jupiter, all in stunning detail. But how are these images transmitted hundreds of millions of miles through space, with almost no signs of interference? You might also wonder how DVDs can still play movies with scratches on them.
<!--more-->

The answer to both of these problems is error-correcting codes. Error-correcting codes are one of the most fundamental concepts that keep our technology-driven society running. Every communication channel experiences transmission errors in some form, meaning it is a requirement to be able to fix these errors; hence the importance of error-correction. In this article, I plan to explore the intuitions behind error-correcting codes and present the Hamming code.

One of the most common uses of the Hamming code is error-correcting memory. A computer uses [dynamic random-access memory](https://en.wikipedia.org/wiki/Dynamic_random-access_memory#Error_detection_and_correction), or RAM, to speed up the time it takes to run all your programs. This type of memory stores data in tiny capacitors. Electrical or magnetic interference can cause spontaneous bit-flips in these capacitors, resulting in error. This interference is rare but can cause undesirable consequences. Computers use specialized hardware controllers to correct these errors, which traditionally use the Hamming code.

### What are error-correcting codes?
First, let's define what an error is. For a string of bits, an error is merely a bit-flip. For example, we might have a string of bits `01101`. An error in the fourth bit would cause the `0` to become a `1`, resulting in the new message `01111`. Our goal with error-correcting codes is to locate these errors and correct them.

At its core, error-correcting codes allow for the detection and correction of errors in any form of data. This is achieved by taking a string of symbols, most commonly a string of bits, as the input. We will add additional bits called parity bits. These can help determine if an error might have occurred.

#### Repetition code
The most classic example of error-correction is the repetition code, where for each bit in an input message, we duplicate each bit multiple times. For example, if you had the message `01101` we could encode it using this repetition method and it would become `000 111 111 000 111`. In this case, we repeated each bit three times. If a random bit flip or error occurred, we could correct it by simply taking the most common bit of each three-bit segments.

Let's say we received the following message `100 111 101 000 110`, which includes multiple errors. We would then be able to correct the error and decode the message to the original message `01101`. But this method isn't very efficient as we had to make our message three times longer, adding two parity bits for each bit of the original code. Additionally, it's important to note that if more than one bit in these three-bit segment was affected by an error we could no longer correct the error.

#### Better error detection
How can we improve the repetition code? Instead of duplicating each bit to create the parity bits, let's make our parity bits dependent on multiple bits from the input. For example, consider the two-bit message `11`. We could add a parity bit by using the [XOR](https://en.wikipedia.org/wiki/Exclusive_or) operator to combine the original bits, $1 \oplus 1 = 0$.

Now by adding this parity bit, we have the new encoded message `110`. To check if an error occurred in any of the three bits, we can recalculate this parity bit and determine if the received bit matched what we calculated. If they don't, we will say the parity bit is incorrect. Let's say the original message `110` had an error in the second bit resulting in the received message being `100`. If we try to recalculate the parity, we find it no longer matches the received parity bit, so it's incorrect. So we know there must be an error. We can't correct the error in this case but detecting that an error occurred is a good start.

#### Hamming distance
The problem with the previous example is we have no way of actually correcting the error. The reason for this can be visualized in the graph below, where all possible combinations of three bits will be represented by a node. The valid codewords, those whose parity bits are correct, are bold. Each edge will then represent a bit flip corresponding to the connected nodes.

<p align="center"> <img width="450" height="450" src="https://lh3.googleusercontent.com/pw/ACtC-3d9dZ5ZqsVpDlvWkuyFZvhWd1o6zcRH_FWUyA5kX_T3NtSSlOoxNwHb55G1dQ_niRS5iTLDAeSGO9ws2-nvMS1srxZsQYKWtWPEwEWmpLNVo-oFQJo70NjRPHI8vd7VQSoTPqHSkyZjrJVDY7ILw441xg=w576-h523-no?authuser=0"> </p>

If we start at any valid codeword, we can get to another valid codeword by traversing along two edges or making two-bit flips. These traversals can be thought of as a distance between codewords, which we call the Hamming distance. More formally, we say the Hamming distance between two codewords is the number of elements with different values.

For example, `110` and `000` have a Hamming distance of two. Starting at an invalid code, one with an error, we can see we have no way to determine which of the valid codes was sent. As three valid codes are all a distance of one from the invalid code. This indicates that there would be three equally likely possibilities.

Consider again the received message `100`, which has an error in the second bit. We can not accurately correct it as it is equally likely that the error happened in any of the three bits. The valid code words `110`, `000`, and `101` are all a Hamming distance of one away.

The Hamming distance of an entire code is equal to the minimum Hamming distance between any two valid codewords. In this case, using the graph, we can see the Hamming distance of this code is two.

It turns out, for a code to be correctable, the Hamming distance must be at least three. Let's consider again the repetition code, which has a Hamming distance of three. With the graph below, we can see that an invalid codeword can never be an equal distance from two valid codewords. This highlights why the repetition code can always correct one error, as there is always a closest valid codeword. This is true for all codes with a Hamming distance of three. In general for a code with Hamming distance $d$, we can correct up to $\left\lfloor{\frac{d-1}{2}}\right \rfloor$ errors.

<p align="center"> <img width="450" height="450" src="https://lh3.googleusercontent.com/pw/ACtC-3fV5CoKzciPZCb8_80XYrZJF2TY-ZrWLj7DYToe0nI5D2-Jt8ggPamQFgKn_8cePkNABGqyg-iMvR_fa8gY8YIRZTGdpsStJFiBytPpE5WTHHSbSAEi__6tbz0UQ4NHI1Ro0eecCSZKcAq2R_hoevuqeg=w593-h537-no?authuser=0"> </p>

### The Binary Hamming code
Using the idea of creating parity bits with the XOR operator, we can create what is called the Hamming$[7,4]$-code. We will combine multiple bits to create each of the parity bits for this code. This code will take in a four-bit input and encode it into a seven-bit codeword. This process will add three additional parity bits. For simplicity, let's call the three parity bits $x_1$, $x_2$ and $x_3$ and the original four bits of the message $m_1$, $m_2$, $m_3$, and $m_4$.

Our goal will be to use these parity bits to help us decode. To do this we can let each of them contain data of three of the four original bits. This will allow us to use which parity bits are incorrect to determine where the error occurred.

We can define the first parity bit to be $x_1=m_1 \oplus m_2 \oplus m_4$. When trying to decode, if we determine that this parity bit is incorrect we know the error must have occurred with one of the four bits in the equation: $m_1$, $m_2$, $m_4$, or $x_1$.

If we create the other two parity bits similarly, we will have the following definitions. With this definition, this code will have a Hamming distance of three.

$$x_1=m_1 \oplus m_2 \oplus m_4$$

$$x_2=m_1 \oplus m_3 \oplus m_4$$

$$x_3=m_2 \oplus m_3 \oplus m_4$$

With these parity bits, we can determine where the error occurred in the seven-bit message, by knowing which parity bits are incorrect. It is important to note that we must assume at most one error occurred. Any more than one error will be impossible to correct and our code will end up correcting a different bit. We could imagine creating a graph similar to what we did before. We would see that two errors would then push our message closer to a different valid codeword, which is exactly what we see with the repetition code.

#### Correcting errors
Now that we have our parity bit, let's break down how we can use them to correct errors. Assuming at most one error, we have eight cases, one for no error and one for each of the seven bits of the encoded message. Each of these cases will correlate to a combination of incorrect parity bits. We can determine these combinations that each error produces by looking at which equations involve which parts of the encoded message.

I have filled a table for each of these cases labeling which erroneous bit leads to which combination of incorrect parity bits. This gives us a way to detect a single error in any of the seven bits of the message.

|Case|Erroneous bit | Incorrect parity bits |
|---|:-:|---|
|Case 0|No Error|None|
|Case 1|$m_1$|$x_1$, and $x_2$|
|Case 2|$m_2$|$x_1$, and $x_3$|
|Case 3|$m_3$|$x_2$, and $x_3$|
|Case 4|$m_4$|$x_1$, $x_2$, and $x_3$|
|Case 5|$x_1$|$x_1$|
|Case 6|$x_2$|$x_2$|
|Case 7|$x_3$|$x_3$|

<br/>
From this, we can create a decoding process by checking these eight cases to determine where in the encoded message the error occurred. Let's work through a quick example to show how this process looks.  Say we want to transmit the message `1011`. First, we need to calculate the parity bits:

$$x_1=1 \oplus 0 \oplus 1=0$$
$$x_2=1 \oplus 1 \oplus 1=1$$
$$x_3=0 \oplus 1 \oplus 1=0$$

So our encoded message is then `1011010`. When transmitting the encoded message, the third bit, $m_3$, experiences an error and flips resulting in the received message `1001010`. We can recalculate the parity bits and find, $x_1=0$, $x_2=0$, and $x_3=1$. Using the table provided above, we can determine that the third bit has an error as the parity bits $x_2$ and $x_3$ are incorrect.

A python implementation would be as follows.

```python
def encode(m):
	# Calculate parity bits
	x1 = (m[0] ^ m[1] ^ m[3])
	x2 = (m[0] ^ m[2] ^ m[3])
	x3 = (m[1] ^ m[2] ^ m[3])

	# Add parity bits to the end of the original message.
	return m + [x1, x2, x3]


def decode(m):
	# Calculate parity bits
	x1 = (m[0] ^ m[1] ^ m[3])
	x2 = (m[0] ^ m[2] ^ m[3])
	x3 = (m[1] ^ m[2] ^ m[3])

	# We will test each of the seven error cases
	if x1 != m[4]:
		if x2 != m[5]:
			if x3 != m[6]:
				# If all three parity bits are incorrect
				m[3] ^= 1 # Case 4
			else:
				# If x1 and x2 are incorrect and x3 is correct
				m[0] ^= 1 # Case 1
		elif x3 != m[6]:
			# If x1 and x3 are incorrect and x2 is correct
			m[1] ^= 1 # Case 2
		else:
			# If just x1 is incorrect
			m[4] ^= 1 # Case 5
	elif x2 != m[5]:
		if x3 != m[6]:
			# If x2 and x3 are incorrect and x1 is correct
			m[2] ^= 1 # Case 3
		else:
			# If just x2 is incorrect
			m[5] ^= 1 # Case 6
	elif x3 != m[6]:
		# If just x3 is incorrect
		m[6] ^= 1 # Case 7
	# Case 0: If all thre bits are correct then nothing will be changed

	return m[0:4]
```

To see this implementation used on a random error generator, look [here](https://repl.it/@jorqueraian/Hamming).


### Conclusion
Now that we have analyzed how the Hamming code works, I want to talk about some statistics and in what cases we would consider using the Hamming code.

With the Hamming$[7,4]$ code, we can correct one error for each 7-bit encoded segment of data. Let's consider the real-world example with cosmic ray interference here on earth. According to an [IBM publication](https://www.scientificamerican.com/article/solar-storms-fast-facts/), we expect to see one error per month per 256 megabytes of memory, due to cosmic rays. This might seem low, but for medical devices, this could mean life or death. The average Windows 10 computer uses about 2GB of RAM at any given moment.

With the expected number of cosmic rays provided above, we can calculate the probability of an error for 2GB of memory over an hour to be roughly 0.0107. If we extend this time frame to an entire day we get a probability of a little less than one fourth.

Errors are a fairly regular occurrence considering the amount of data we use, but rarely will they occur simultaneously. This means it is very unlikely we would have an unrecoverable situation. This is the perfect usage for the Hamming code, as we can correct these sparse errors.

### Sources
Lindell, Y. Introduction to Coding Theory (89-662) [Lecture Notes]. (2010). Retrieved from (http://u.cs.biu.ac.il/~lindell/89-662/main-89-662.html)

<!-- MathJax script -->
<script type="text/javascript" async
    src="https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.1/MathJax.js?config=TeX-AMS-MML_HTMLorMML">
    MathJax.Hub.Config({
    tex2jax: {
      inlineMath: [['$','$'], ['\\(','\\)']],
      displayMath: [['$$','$$']],
      processEscapes: true,
      processEnvironments: true,
      skipTags: ['script', 'noscript', 'style', 'textarea', 'pre'],
      TeX: { equationNumbers: { autoNumber: "AMS" },
           extensions: ["AMSmath.js", "AMSsymbols.js"] }
    }
    });
    MathJax.Hub.Queue(function() {
      // Fix <code> tags after MathJax finishes running. This is a
      // hack to overcome a shortcoming of Markdown. Discussion at
      // https://github.com/mojombo/jekyll/issues/199
      var all = MathJax.Hub.getAllJax(), i;
      for(i = 0; i < all.length; i += 1) {
          all[i].SourceElement().parentNode.className += ' has-jax';
      }
    });

    MathJax.Hub.Config({
    // Autonumbering by mathjax
    TeX: { equationNumbers: { autoNumber: "AMS" } }
    });
  </script>
