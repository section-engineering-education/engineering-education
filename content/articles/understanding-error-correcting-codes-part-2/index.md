---
layout: engineering-education
status: publish
published: true
url: /understanding-error-correcting-codes-part-2/
title: An Introduction to Error-Correcting Codes - Part 2
description: Error-correcting codes are one of the most fundamental concepts that keep our technology-driven society running.
author: ian-jorquera
date: 2020-06-06T00:00:00-07:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/understanding-error-correcting-codes-part-2/hero.jpg
    alt: error-correcting codes
---

Error correction is one of the most fundamental aspects of digital communication and is responsible for the validity of real-time interactions. In [part 1](/understanding-error-correcting-codes-part-1/), with the Hamming code, we analyzed techniques of correcting isolated errors. In the real world, we can't always assume errors will be isolated, and multiple consecutive errors can occur. In this article, we will continue talking about the Hamming code as well as a new code designed to correct these consecutive errors called the Golay code.

<!--more-->

One of the more notable applications of the Golay code was with the Voyager I and II spacecraft in the 1970s. Transmitting messages or images through space requires the ability to correct interference and signal dilution. The Golay code can correct multiple consecutive errors, allowing it to perform well in these scenarios. This doesn't come without its disadvantages. The Golay code is often more computationally intensive when it comes to both encoding and decoding.

### The Hamming Code
With the Hamming $[7,4]$ code, as presented in [part 1](/understanding-error-correcting-codes-part-1/), we could encode four-bit inputs into seven-bit codewords. This was done by adding three parity bits to the original message. This encoding gave us the ability to correct one error.

$$x_1=m_1 \oplus m_2 \oplus m_4$$

$$x_2=m_1 \oplus m_3 \oplus m_4$$

$$x_3=m_2 \oplus m_3 \oplus m_4$$

The parity bits could be recalculated and used to help correct any error that occurred. Using these parity bits, we create a table to help determine which incorrect parity bits lead to which errors.

|Erroneous bit | Incorrect parity bits |
|---|---|
|No Error|None|
|$m_1$|$x_1$, and $x_2$|
|$m_2$|$x_1$, and $x_3$|
|$m_3$|$x_2$, and $x_3$|
|$m_4$|$x_1$, $x_2$, and $x_3$|
|$x_1$|$x_1$|
|$x_2$|$x_2$|
|$x_3$|$x_3$|
<br>

### Linear Error-Correcting Codes
Using the Hamming code, we will come to a more generalized definition for error-correcting codes. In this section, we will come to the same mathematical conclusions, just stated with matrices. This definition provides a template for the set of error-correcting codes called linear codes. It will also be helpful when constructing the Golay code.

We want to narrow down our focus to linear codes as they will provide us with efficient methods for encoding and decoding. A linear code has the property that the linear combination of any two codewords is also a codeword. For example, `1001 001` and `1011 010` are both codewords of the Hamming code presented above. Because the Hamming code is linear, the linear combination of these codewords `0010 011`, found by taking the XOR operator of each element, is itself a codeword.

### The Generator Matrix
This property of linear codes allows us to define the encoding process of any linear code with a matrix, called the generator matrix. To encode a message, we simply [multiply](https://en.wikipedia.org/wiki/Matrix_multiplication) the input message on the left of the generator matrix. Note that instead of using addition we will use the XOR operator. Subtraction will also use the XOR operator meaning the additive inverse of a bit is just itself. For example, $-1=1$.

For the Hamming code, we can create the following generator matrix, which is mathematically the same as the encoding procedure presented before. Recall that the three parity bits are $x_1$, $x_2$ and $x_3$ and the original four bits of the message are $m_1$, $m_2$, $m_3$, and $m_4$.

$$
\begin{pmatrix}
1&0&0&0&1&1&0\\\\\\
0&1&0&0&1&0&1\\\\\\
0&0&1&0&0&1&1\\\\\\
0&0&0&1&1&1&1
\end{pmatrix}
$$

With this generator matrix, this new encoding procedure would be as follows.

$$
\begin{pmatrix}
m_1&m_2&m_3&m_4&x_1&x_2&x_3
\end{pmatrix} =
\begin{pmatrix}
m_1&m_2&m_3&m_4
\end{pmatrix}\begin{pmatrix}
1&0&0&0&1&1&0\\\\\\
0&1&0&0&1&0&1\\\\\\
0&0&1&0&0&1&1\\\\\\
0&0&0&1&1&1&1
\end{pmatrix}
$$

I encourage the reader to verify for themselves that this new encoding procedure is mathematically the same as what was presented previously.

### The Binary Hamming code
Using the idea of creating parity bits with the XOR operator, we can create what is called the Hamming$[7,4]$-code. We will combine multiple bits to create each of the parity bits for this code. This code will take in a four-bit input and encode it into a seven-bit codeword. This process will add three additional parity bits. For simplicity, let's call the three parity bits $x_1$, $x_2$ and $x_3$ and the original four bits of the message $m_1$, $m_2$, $m_3$, and $m_4$.

Our goal will be to use these parity bits to help us decode. To do this we can let each of them contain data of three of the four original bits. This will allow us to use which parity bits are incorrect to determine where the error occurred.

We can define the first parity bit to be $x_1=m_1 \oplus m_2 \oplus m_4$. When trying to decode, if we determine that this parity bit is incorrect we know the error must have occurred with one of the four bits in the equation: $m_1$, $m_2$, $m_4$, or $x_1$.

If we create the other two parity bits similarly, we will have the following definitions. With this definition, this code will have a Hamming distance of three.

$$x_1=m_1 \oplus m_2 \oplus m_4$$

$$x_2=m_1 \oplus m_3 \oplus m_4$$

$$x_3=m_2 \oplus m_3 \oplus m_4$$

With these parity bits, we can determine where the error occurred in the seven-bit message, by knowing which parity bits are incorrect. It is important to note that we must assume at most one error occurred. Any more than one error will be impossible to correct and our code will end up correcting a different bit. We could imagine creating a graph similar to what we did before. We would see that two errors would then push our message closer to a different valid codeword, which is exactly what we see with the repetition code.

### The Parity-Check Matrix
We also need a way to detect errors with this new definition. A second matrix called the parity-check matrix will be created for this purpose. With the parity-check matrix, we will calculate what is called the syndrome by multiplying our received message on the left of the transpose of the parity-check matrix.

The syndrome, much like the definition of the word might suggest will be related to the specific error that occurred and has no relation to the message. In general, the syndrome will be a zero vector when no error occurs and a non-zero vector when one does. For the Hamming code, the syndrome will tell us exactly which parity bits were incorrect. The parity-check matrix for the Hamming code will be as follows.

$$
\begin{pmatrix}
1&1&0&1&1&0&0\\\\\\
1&0&1&1&0&1&0\\\\\\
0&1&1&1&0&0&1
\end{pmatrix}
$$

And the syndrome can be found by multiplying the encoded message with the transpose of the parity-check matrix.

$$
\begin{pmatrix}
S_1&S_2&S_3
\end{pmatrix} =
\begin{pmatrix}
m_1&m_2&m_3&m_4&x_1&x_2&x_3
\end{pmatrix}\begin{pmatrix}
1&1&0&1&1&0&0\\\\\\
1&0&1&1&0&1&0\\\\\\
0&1&1&1&0&0&1
\end{pmatrix}^T
$$

Looking closely at the parity-check matrix, we see that each column corresponds to one of the cases for decoding the Hamming code. For example the first column $\begin{pmatrix}1&1&0\end{pmatrix}^T$ corresponds to the parity bits $x_1$ and $x_2$ being incorrect, which is the case that $m_1$ had an error. Each column corresponds to which parity bits would be incorrect for that column of the encoded message to contain an error. Therefore, calculating the syndrome for this Hamming code gives us the column of the parity-check matrix that relates to the error in the message. For example, let's say we had the message `0000 000`, but any message will have the same result. Now consider an error in the fourth bit. When we calculate the syndrome, we would get $\begin{pmatrix}1&1&1\end{pmatrix}$, which we can more simply write as `111`. Notice this is the fourth column of the parity-check matrix, so we know the error was in the fourth column of the message.

For the Hamming code, we can decode a message by merely calculating the syndrome and then finding the corresponding column of the parity-check matrix. Finally, we can then correct that column in the message. Again I encourage the reader to verify this method is mathematically the same as what was presented in the previous section.

An implementation using this new definition can be found [here](https://repl.it/@jorqueraian/Hamming).

This decoding process is unique to the Hamming code but highlights the usefulness of the syndrome. For codes that can correct more than one error, this method is no longer as simple. We can still utilize the syndrome similarly, with syndrome decoding.

### Syndrome Decoding
Syndrome decoding works by constructing a table, mapping syndromes to their corresponding error. We achieve this by calculating the syndrome of all possible correctable errors. With this table, we can automatically determine if a received message contains an error and what the error is, all we need to do is calculate its syndrome. This isn't always a perfect solution for decoding as the bigger a code gets, the more possible errors there are, meaning the size of our syndrome table will start to grow exponentially. Although this is still an efficient solution for the Hamming and Golay codes.

Let's walk through an example of syndrome decoding with the Hamming code. First, we need to calculate and create a table of all possible syndromes. This should look very similar to the table we created in the previous section.

|Error|Syndrome|
|---|---|
|`0000 000`|`000`|
|`1000 000`|`110`|
|`0100 000`|`101`|
|`0010 000`|`011`|
|`0001 000`|`111`|
|`0000 100`|`100`|
|`0000 010`|`010`|
|`0000 001`|`001`|
<br>

Now let's consider the example where we want to transmit the message `1011`. First, we encode it into the message `1011010`. Now, during transmission, the third bit experiences an error and flips resulting in the received message `1001010`. Calculating the syndrome of this message will give us a syndrome of `011`. Using the table, we can match this syndrome to the error `0010 000`. Finally, we can swap this bit resulting in the original encoded message.

### Standard Form
We say a code is in standard form if its generator matrix is expressed as the [augmented matrix](https://en.wikipedia.org/wiki/Augmented_matrix) $G = \left( I_k | X\right)$. Similarly, the parity-check matrix would be $H = \left(-X^T | I_{n-k}\right)$. For this definition the variable $k$ represents the size of the input message and $n$ represents the size of the encoded message.

Notice that in the standard form, both matrices share a common submatrix, $X$. This means it is easy to construct one of the matrices if we already know the other. This common matrix can be seen with the Hamming code, as both the generator and parity-check matrices share the matrix shown below. Notice that each of the columns of this matrix represents one of the parity bits for the Hamming code.

$$X=
\begin{pmatrix}
1&1&0\\\\\\
1&0&1\\\\\\
0&1&1\\\\\\
1&1&1
\end{pmatrix}
$$

Both the generator and parity-check matrices will contain an identity matrix meaning the first few bits will always be the original message.

### The Binary Golay Code
The Golay code will take in a 12-bit input and encode it into a 23-bit codeword. This encoding process adds 11 parity bits, which will give this code a Hamming distance of seven, meaning we can correct up to three errors. As mention in the previous section to define a linear code, in standard form, it suffices to know only the common submatrix. For the Golay code, we will define this submatrix to be the matrix $A$ shown below.

$$A=
\begin{pmatrix}
0&1&1&1&1&1&1&1&1&1&1\\\\\\
1&1&1&0&1&1&1&0&0&0&1\\\\\\
1&1&0&1&1&1&0&0&0&1&0\\\\\\
1&0&1&1&1&0&0&0&1&0&1\\\\\\
1&1&1&1&0&0&0&1&0&1&1\\\\\\
1&1&1&0&0&0&1&0&1&1&0\\\\\\
1&1&0&0&0&1&0&1&1&0&1\\\\\\
1&0&0&0&1&0&1&1&0&1&1\\\\\\
1&0&0&1&0&1&1&0&1&1&1\\\\\\
1&0&1&0&1&1&0&1&1&1&0\\\\\\
1&1&0&1&1&0&1&1&1&0&0\\\\\\
1&0&1&1&0&1&1&1&0&0&0
\end{pmatrix}
$$

This is a rather intimidating matrix, so let's break down what it means. At its core, this matrix is very similar to the submatrix for the Hamming code. It tells us how the parity bits are defined. For example, the first rows tell us the first parity bit is the combination, using XOR, of all the bits in the original message except for the first one.

Knowing that the Golay code is linear we already have a method to encode and decode our messages. Let's look at how this process applies to the Golay code. For simplicity, we will call the 12-bit input message $\vec{m}$ and the 23-bit received message $\,\vec{w}$. We will also represent the 11 parity bits as the row vector $\vec{x}$. Using the matrix $A$ we can create the generator matrix $G = \left( I_{12} | A\right)$ and the parity check matrix $H = \left(A^T | I_{11}\right)$. To encode, we can multiply our input message on the left of our generator matrix.

Knowing that the first 12 bits will be the original message, we can reduce the number of computations necessary, as we only need to calculate the parity bits. This can be done by multiplying the original message on the left of the matrix $A$. The encoded message is then the concatenation of the original message and the parity bits.


$$(\vec{m}|\vec{x}) =  (\vec{m}|\vec{m}\cdot A)$$

To find the syndrome we will use the same definition as in the previous section: multiplying the received message $w$, by the transpose of the parity-check matrix. In this case, we will call the syndrome vector $\vec{s}$.

$$\vec{s} = \vec{w}\cdot H^T$$

Now that we have a way to calculate the syndrome, we can apply syndrome decoding as mentioned in the previous section. An implementation of syndrome decoding for the Golay code with a random error generator can be found [here](https://repl.it/@jorqueraian/GolayCode).


### Conclusion
Now that we have analyzed the Golay code, let's talk about the statistics on how well we expect it to perform. For example, let's say we are transmitting a three-megabyte image through a communication channel with a probability of error 0.01. We would expect there to be 460,000 erroneous bits in the encoded image. When we receive this image and start to decode, we should be able to correct 99.99% of all the received 23-bit segments. So with the Golay code, we would expect to be able to correct the vast majority of the errors. After our error-correction, we would expect less than 50 erroneous bits.

### Further Reading
If you're interested in learning more about error-correcting codes, specifically with a focus on mathematics, I would suggest reading the lecture notes [here](http://u.cs.biu.ac.il/~lindell/89-662/main-89-662.html).

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
