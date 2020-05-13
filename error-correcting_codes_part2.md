
# An Introduction to Error Correction Codes: Part 2
Error-correction is one of the most fundamental aspects of digital communication and is responsible for the validity of real-time interactions. In [Part 1](), with the Hamming code, we analyzed techniques of correcting isolated errors. In the real world, we can't always assume errors will be isolated. In this article, we will explore the Golay code, which is a method of correcting multiple nearby errors.

One of the more notable applications of the Golay code was with the Voyager I and II spacecraft in the 1970s. Transmitting messages or images through space requires the ability to correct interference and signal dilution. The Golay code can correct multiple consecutive errors, allowing it to perform well in these scenarios. This doesn't come without its disadvantages. The Golay code is often more intensive when it comes to both encoding and decoding.

## The Hamming Code
<!--- iffy wording at times -->
With the Hamming$[7,4]$ code, as presented in [Part 1](), can encode four-bit input messages into seven-bit codewords. With this encoding, it could correct one erroneous bit for each seven-bit encoded message. This was achieved by adding three parity bits to the original message.

$$x_1=m_1 \oplus m_2 \oplus m_4\\
x_2=m_1 \oplus m_3 \oplus m_4\\
x_3=m_2 \oplus m_3 \oplus m_4$$

If an error occurred, the parity bits could be recalculated to help determine where the error occurred. With the parity bit equations, we were able to create a table to help determine which incorrect parity bits resulted in which erroneous bit.

|Erroneous bit | Incorrect parity bits |
|:-:|---|
|No Error|None|
|$m_1$|$x_1$, and $x_2$|
|$m_2$|$x_1$, and $x_3$|
|$m_3$|$x_2$, and $x_3$|
|$m_4$|$x_1$, $x_2$, and $x_3$|
|$x_1$|$x_1$|
|$x_2$|$x_2$|
|$x_3$|$x_3$|

An implementation of the Hamming code can be found [here](https://repl.it/@jorqueraian/Hamming).

## Linear Error-Correcting Codes
Now that we have analyzed the Hamming code, I want to provide a more generalized definition for error-correcting codes. In this section, we will come to the same mathematical conclusions, just stated with matrices. This might seem unimportant and for the Hamming code, it is not completely necessary. But this definition provides a template for the set of error-correcting codes called linear codes. It will also be helpful when constructing the Golay code.

We want to narrow down our focus on linear codes as they will provide us with efficient methods for encoding and decoding. A linear code is a code that for any two codewords, the linear combination is its self a codeword. For example, `1001 001` and `1011 010` are both codewords of the Hamming code presented above. The linear combination can be found by taking the XOR operator of each element. The linear combination would then be `0010 011` which is also a valid codeword. This is true as the Hamming code is linear. This property allows us to define the encoding process of any linear code with a matrix, called the generator matrix. To encode a message, we simply [multiply](https://en.wikipedia.org/wiki/Matrix_multiplication) the input message on the left of a generator matrix. Note that instead of using addition we will use the XOR operator. Subtraction will also use the XOR operator meaning the additive inverse of a bit is just itself. For example, $-1=1$. This might seem counter-intuitive but is required to keep all operations valid. For the Hamming code, we could create the following generator matrix, which is mathematically the same as the encoding procedure presented above in [Part 1](). Recall that the three parity bits are $x_1$, $x_2$ and $x_3$ and the original four bits of the message are $m_1$, $m_2$, $m_3$, and $m_4$.

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

Looking closely at the parity-check matrix, each column corresponds to one of the cases for decoding the Hamming code. For example the first column $\begin{pmatrix}1&1&0\end{pmatrix}^T$ corresponds to the parity bits $x_1$ and $x_2$ being incorrect, which is the case that $m_1$ had an error. If we continue to look at each column, we see this pattern is consistent. We see that each column corresponds to which parity bits would be incorrect for that column of the encoded message to contain an error. Calculating the syndrome for this Hamming code would give us the column of the parity-check matrix with an error. For example, let's say we had the message `0000 000`, but any message will have the same result. Now consider an error in the fourth bit. When we calculate the syndrome, we would get $\begin{pmatrix}1&1&1\end{pmatrix}$, which we can more simply write as `111`. Notice this is the fourth column of the parity-check matrix. For the Hamming code, we can decode a message by simply calculating the syndrome and then finding the corresponding column of the parity-check matrix. As the column tells us where the error is. Finally, we can then correct that column in the message. This decoding process is unique to the Hamming code but highlights the usefulness of the syndrome and parity-check matrix. Notice that the original process of decoding mentioned in the previous section is mathematically the same, except we never explicitly defined the syndrome.

An implementation using this new definition can be found [here](https://repl.it/@jorqueraian/Hamming).


In the matrices above we can see they both contain the [identity matrix](https://en.wikipedia.org/wiki/Identity_matrix). We say a code is in standard form if its generator matrix can be expressed as the [augmented matrix](https://en.wikipedia.org/wiki/Augmented_matrix) $G = \left( I_k | X\right)$. Similarly the parity check matrix would be represented as $H = \left(-X^T | I_{n-k}\right)$. The variable $k$ represents the size of the input message and $n$ represents the size of the encoded message. Notice that in the standard form, both matrices share a common submatrix $X$, so it is easy to construct one matrix from the other. This can be seen with the Hamming code, as both the generator and parity-check matrices share the matrix shown below.

$$X=
\begin{pmatrix} 
1&1&0\\ 
1&0&1\\ 
0&1&1\\ 
1&1&1 
\end{pmatrix}
$$

Each of the columns of this matrix represents one of the parity bits for the Hamming code. Once all errors are corrected, and if the generator matrix is in standard form the original message is simply the first few bits. This is what we have seen with the Hamming code.
<!-- Might remove this last part -->

To recap any linear code can be defined with a generator matrix and a parity-check matrix. These are implemented to encode and calculate the syndrome. The syndrome can then be used to help decode the received message. This definition is extremely important as it provides a simple way to create any linear error-correcting codes, as well as providing a framework for efficient decoding methods.

## The Binary Golay Code
To understand the motivation behind the Golay code, we want to know where the Hamming code fails. Although rare, what if two close by bits both have an error. This could cause the Hamming code to fail as it can only correct one error for each seven-bit encoded message. With the Golay code, our encoded message will be 24 bits and we will be able to correct up to three of them. Unlike the Hamming code, we will be able to correct 3 consecutive errors. This is exceptionally powerful for situations where errors might occur in small clusters.

The Golay code will take in a 12-bit input and encode it into a 23-bit codeword. This encoding process adds 11 parity bits, which will give this code a Hamming distance of seven, meaning we can correct up to three errors. As mention in the previous section to define a linear code, in standard form, it suffices to know only the common submatrix. As the generator matrix for this code will be $G = \left( I_{12} | A\right)$ where the matrix $A$ is shown below.

$$A=
\begin{pmatrix}
0&1&1&1&1&1&1&1&1&1&1\\
1&1&1&0&1&1&1&0&0&0&1\\
1&1&0&1&1&1&0&0&0&1&0\\
1&0&1&1&1&0&0&0&1&0&1\\
1&1&1&1&0&0&0&1&0&1&1\\
1&1&1&0&0&0&1&0&1&1&0\\
1&1&0&0&0&1&0&1&1&0&1\\
1&0&0&0&1&0&1&1&0&1&1\\
1&0&0&1&0&1&1&0&1&1&1\\
1&0&1&0&1&1&0&1&1&1&0\\
1&1&0&1&1&0&1&1&1&0&0\\
1&0&1&1&0&1&1&1&0&0&0
\end{pmatrix}
$$


This is a rather intimidating matrix, so let's break down what it means. At its core, this matrix is very similar to the Hamming matrix shown in the previous section. Each column represents a different parity bit. For example, the first rows tell us that the first parity bit is the XOR between all the bits in the original message except the first one.

Let's create the encoding procedure for the Golay code with matrix multiplication. For simplicity, we will call the 12-bit input message $m$, and the 23-bit encoded message $w$. To encode our input message, we can multiply it on the left by our generator matrix. Knowing that the first 12 bits will be multiplied with the identity matrix, and therefore wont change, we can reduce the number of computations. We only need to calculate the parity bits, and this can be done by multiplying the original message by the matrix $A$. Finally, the encoded message will then be the concatenation of the original message and the parity bits, $w = (m|m\cdot A)$. Notice that $m\cdot A$ calculates the parity bits.

Now that we can correct three errors, locating these errors is a bit more challenging. It is no longer practical to build out the entire table by hand as we did for the Hamming code. Instead, we can automatically generate a table with a method called syndrome decoding. 

As mentioned previously the syndrome represents the specific error that occurred and has no relation to the message. The syndrome is found by multiplying a received message $w$, by the transpose of the parity-check matrix. Where the parity-check matrix for the Golay code is $H = (A^T|I_{11})$. Let's call the syndrome vector $S$. The syndrome can be calculated as follows.

$$S = w\cdot H^T = w\cdot (A^T|I_{11})^T$$

Syndrome decoding works by first calculating the syndrome of all possible errors to create a table mapping syndromes to their corresponding error. This is exactly what the table for the Hamming code does. This table can be used to determine the error that occurred. With this table, let's create a decoding procedure. First, we want to calculate the syndrome of the received message. With this syndrome, we can map the syndrome to the error that occurred. Finally, we will correct the error by flipping the relevant bits. 

Let's walk through an example of syndrome decoding with the Hamming code. First, we need to calculate all possible syndromes.
|Error|Syndrome|
|:-:|---|
|`0000 000`|`000`|
|`1000 000`|`110`|
|`0100 000`|`101`|
|`0010 000`|`011`|
|`0001 000`|`111`|
|`0000 100`|`100`|
|`0000 010`|`010`|
|`0000 001`|`001`|

Now let's consider the same example presented in [Part 1](). We want to transmit the message `1011`. First, we can encode it into the message `1011010`. During transmission, an error occurs in the third bit resulting in the received message `1001010`. If we calculate the syndrome of this message, we will then get `011`. Matching this syndrome to our table, we find the error occurred in the third bit. So with syndrome decoding, we were again able to accurately correct the error.

Syndrome decoding for the Golay code would look very similar to this. An implementation of syndrome decoding for the Golay code with a random error generator can be found [here](https://repl.it/@jorqueraian/GolayCode).

## Conclusion

## Further Reading
If you're interested in learning more about error-correcting codes, specifically with a focus on mathematics, I would suggest reading the lecture notes [here](http://u.cs.biu.ac.il/~lindell/89-662/main-89-662.html). 

I would also recommend looking more into the [Reed-Muller code](https://en.wikipedia.org/wiki/Reed%E2%80%93Muller_code), the [Reed-Solomon code](https://en.wikipedia.org/wiki/Reed%E2%80%93Solomon_error_correction), and the different types of [Concatenated codes](https://en.wikipedia.org/wiki/Concatenated_error_correction_code), such as the Forney code, all of which are mentioned in the lecture notes provided in the sources.

## Sources
Lindell, Y. Introduction to Coding Theory (89-662) [Lecture Notes]. (2010). Retrieved from (http://u.cs.biu.ac.il/~lindell/89-662/main-89-662.html)