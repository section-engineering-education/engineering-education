# An Introduction to Error Correction Codes: Part 2

Before reading this article I recommend reading [part 1](), which goes over the basic intuitions of error-correcting codes as well as the Hamming code. In this section, we will continue to look at the Hamming code, but we will also explore the Golay code which can correct up to three errors. 

The Golay code was most notably used on the Voyager I and II spacecraft in the 1970s. When transmitting messages through space we need to be able to correct interference and single dilution. Unlike the Hamming code, which can correct an isolated error, the Golay code can correct multi-consecutive errors, making it ideal for more situations.

## The Hamming Code

Recall that with the Hamming$[7,4]$ code we encoded four-bit inputs into seven-bit encoded messaged. We could then correct up to a single bit of error, for each seven-bit segment of data. We were able to do this by adding three parity bits in addition to the four original bits 

$$x_1=m_1 \oplus m_2 \oplus m_4\\
x_2=m_1 \oplus m_3 \oplus m_4\\
x_3=m_2 \oplus m_3 \oplus m_4$$

When the message was received would recalculate these bits and determine which bits were now incorrect. Knowing this allowed us to determine where an error occurred in the received message using the following table.

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

An implementation of the Hamming code can be found [here](https://repl.it/@jorqueraian/Hamming).

## Linear Error-Correcting Codes
Now that we have explored the Hamming code, I want to provide a more generalized definition for error-correcting codes. In this section, we will come to the same mathematical conclusions, just stated with matrices. This might seem unimportant and for the Hamming code, it is not completely necessary. But this definition provides a template for the set of error-correcting codes called linear codes.

We want to narrow down our focus on linear codes as they will provide us with efficient methods for encoding and decoding. A linear code is a code that for any two codewords, the linear combination is its self a codeword. For example, `1001 001` and `1011 010` are both codewords of the Hamming code presented above. The linear combination can be found by taking the XOR operator of each element. The linear combination would then be `0010 011` which is also a valid codeword. This is true as the Hamming code is linear. This property allows us to define the encoding process of any linear code with a matrix, called the generator matrix. To encode a message, we simply [multiply](https://en.wikipedia.org/wiki/Matrix_multiplication) the input message on the left of a generator matrix. Note that instead of using addition we will use the XOR operator. Subtraction will also use the XOR operator meaning the additive inverse of a bit is just itself, for each $-1=1$. This might seem counter-intuitive but is required to keep all operations valid. For the Hamming code presented above, we could create the following generator matrix, which is mathematically the same as the encoding procedure presented above.

$$
\begin{pmatrix} 
1&0&0&0&1&1&0\\ 
0&1&0&0&1&0&1\\ 
0&0&1&0&0&1&1\\ 
0&0&0&1&1&1&1 
\end{pmatrix}
$$

The encoding procedure can be expressed with the generator matrix.

$$
\begin{pmatrix} 
m_1&m_2&m_3&m_4&x_1&x_2&x_3
\end{pmatrix} =
\begin{pmatrix} 
m_1&m_2&m_3&m_4
\end{pmatrix}\begin{pmatrix} 
1&0&0&0&1&1&0\\ 
0&1&0&0&1&0&1\\ 
0&0&1&0&0&1&1\\ 
0&0&0&1&1&1&1 
\end{pmatrix}
$$

I encourage the reader to verify for themselves that this new encoding procedure is mathematically the same as what was presented previously. 

We also need a way to detect errors with this new definition. This will be done with the second matrix called the parity-check matrix. With the parity-check matrix, we will calculate what is called the syndrome by multiplying our received message on the left of the transpose of the parity-check matrix. The syndrome, much like the definition of the word might suggest will be related to the specific error that occurred. This implies the syndrome of a received message will directly correspond to the error and have no relation to the message. In general, the syndrome will be a zero vector when no error occurs and a non-zero vector when one does. We can split any received message $y$ into two components; the error $e$ and the original message $w$. We can use the distributive property of matrix multiplication to find the syndrome of each of these components separately. The syndrome of $w$ will be zero so the syndrome of $y$ is only dependent on the error and is equal to the syndrome of $e$. For the Hamming code, the syndrome will tell us exactly which parity bits were incorrect. Meaning the process of checking each parity bit as we did above will now be replaced with matrix multiplication. The parity-check matrix for the Hamming code will be as follows:

$$
\begin{pmatrix} 
1&1&0&1&1&0&0\\ 
1&0&1&1&0&1&0\\ 
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
1&1&0&1&1&0&0\\ 
1&0&1&1&0&1&0\\ 
0&1&1&1&0&0&1
\end{pmatrix}^T
$$

Looking closely at the parity-check matrix each column corresponds to one of the cases for decoding the Hamming code. For example the first row $\begin{pmatrix}1&1&0\end{pmatrix}^T$ corresponds to the parity bits $x_1$ and $x_2$ being incorrect, which is the case that $m_1$ had an error. If we continue to look at each column, we see this pattern is consistent. We see that each column corresponds to which parity bits would be incorrect for that column of the encoded message to contain an error. Calculating the syndrome for this Hamming code would give us the column of the parity-check matrix with an error. For example, let's say we had the message `0000 000`, and as shown above, any message will have the same result. Also, consider an error in the fourth bit. When we calculate the syndrome, we would get $\begin{pmatrix}1&1&1\end{pmatrix}$ which is the fourth column of the parity-check matrix. For the Hamming code, we can decode a message by simply calculating the syndrome and then finding the corresponding column of the parity-check matrix. Finally, we can then correct that column in the message. This decoding process is unique to the Hamming code but highlights the usefulness of the syndrome and parity-check matrix. Notice that the original process of decoding mentioned in the previous section is mathematically the same, except we never explicitly defined the syndrome.

An implementation using this new definition can be found [here](https://repl.it/@jorqueraian/Hamming).


Looking closely at both of the matrices above we can see that they both contain a [identity matrix](https://en.wikipedia.org/wiki/Identity_matrix). When encoding this is why we still have the original four bits. We say a code is in standard form if its generator matrix, can be expressed with the [augmented matrix](https://en.wikipedia.org/wiki/Augmented_matrix) $G = \left( I_k | X\right)$  and parity check matrix can be represented as $H = \left(-X^T | I_{n-k}\right)$. Notice that when in the standard form they share a common submatrix, meaning it is easy to construct one matrix from the other. This can be seen with the Hamming code, as both the generator and parity-check matrices share the matrix shown below.

$$X=
\begin{pmatrix} 
1&1&0\\ 
1&0&1\\ 
0&1&1\\ 
1&1&1 
\end{pmatrix}
$$

Notice that each column represents the parity bits. All linear codes can be expressed in this fashion. If a code is in standard form, and once all errors are correct the original message is simply the first few bits

To recap any linear code can be defined with a generator matrix and a parity-check matrix. These are implemented to encode and calculate the syndrome. The syndrome can then be used to help decode the received message. This definition is extremely important as it provides a simple way to create any linear error-correcting codes, as well as providing a framework for efficient decoding methods.

## The Binary Golay Code
With the Hamming$[7,4]$ code we could correct up to a single bit of error, for each 7-bit segment of data. If the probability of any single bit experiencing an error is around $.02$, with the Hamming code we could correct 99.2% of all the received messages. This is pretty good and this highlights the usefulness of the Hamming code. The reason the Hamming code might still fail is due to the fact 
