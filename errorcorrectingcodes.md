# An Introduction to Error Correction Codes: The Hamming Code
The spacecraft [Juno](https://en.wikipedia.org/wiki/Juno_(spacecraft)) was launched in 2011 and since then it has taken countless [photos](https://www.nasa.gov/mission_pages/juno/images/index.html) of Jupiter, many of which are nearly flawless in their detail. But how can these images be transmitted hundreds of millions of miles through space with relatively few signs of interference? Similarly, you might ask how DVDs can still play movies with scratches on them. This is done with the use of error-correcting codes. Like encryption, error-correcting codes are one of the most fundamental parts that keep our technology-driven society running. Every communication channels experience transmission errors in some form, meaning it is a requirement to be able to fix these errors, hence the importance of error-correcting. In this article, we will explore the intuitions behind error-correcting codes as well as introduce the Hamming code.

## What are Error-Correcting Codes?

First, let's define what an error is. For a string of bits, an error is simply a bit flip. For example, we might have a string of bits `01101`. An error could occur on the fourth bit which would lead to the new message `01111`. Our goal with error-correcting codes is to locate where errors occur and then correct them.

At its core, error-correcting codes allow for the detection and correction of errors in any form of data, either transmission or storage. This is achieved by taking a string of symbols, most commonly a string of bits, as the input. We will add additional bits called parity bits. These can help determine whether or not an error might have occurred. The most classic example of error-correction is the repetition code, where for each bit in an input message, we duplicate each bit multiple times. For example, if you had the message `01101` we could encode it using this repetition method and it would become `000 111 111 000 111`. In this case, we repeated each bit three times. If a random bit flip or error occurred, we could correct it by simply taking the most common bit of each three-bit segments. Let's say we received the following message `100 111 101 000 110`, which includes multiple errors. We would then be able to correct the error and decode the message to the original message `01101`. But this method isn't very efficient as we had to make our message three times longer, adding two parity bits for each bit of the original code. Additionally, it's important to note that if more than one bit in these three-bit segment was affected by an error we could no longer correct the error. Similar limitations will also appear in other codes.

How can we improve the repetition code? Instead of duplicating each bit, to create the parity bits, let's make our parity bits dependent on multiple bits. For example, consider the two-bit message `11`. We could add a parity bit by using the [XOR](https://en.wikipedia.org/wiki/Exclusive_or) operator to combine the original bits, $1 \oplus 1 = 0$. Now by adding this parity bit, we have the encoded message `110`. To check if an error occurred, we can simply try to recalculate the parity bit to see if the received bit matched what we calculated. If the recalculated parity doesn't match the received bit, we will say the parity bit is incorrect. Let's say the original message `110` had an error in the second bit resulting in the received message being `100`. If we try to re-calculate the parity, we find it no longer matches the received parity bit, so it's incorrect. So we know there must be an error. We can't correct the error in this case but detecting that an error occurred is a good start.

The problem with the previous example is we have no way of actually correcting the error because valid codewords are too close. This can be visualized in the graph below, where all possible combinations of three bits will be represented by a node. The valid codewords, those whose parity bits are correct, are bold. Each edge will then represent a bit flip corresponding to the connected nodes.

<p align="center"> <img width="450" height="450" src="https://lh3.googleusercontent.com/pw/ACtC-3d9dZ5ZqsVpDlvWkuyFZvhWd1o6zcRH_FWUyA5kX_T3NtSSlOoxNwHb55G1dQ_niRS5iTLDAeSGO9ws2-nvMS1srxZsQYKWtWPEwEWmpLNVo-oFQJo70NjRPHI8vd7VQSoTPqHSkyZjrJVDY7ILw441xg=w576-h523-no?authuser=0"> </p>

If we start at any valid codeword, we can get to another valid codeword by traversing along two edges or making two-bit flips. This idea can be thought of as a distance between codewords, which we call the Hamming distance. More formally we say the Hamming distance between two codewords is the number of elements with different values. By starting at an invalid code, one with an error, we can see that we have no way to determine which of the valid codes was sent. As all three valid codes are all a distance of one from the invalid code. This means that there would be three equally likely possibilities. For example, consider again the received message `100`, which has an error in the second bit. We can not accurately correct it as it is equally likely that the error happened in any of the three bits, as it's connected to three valid codewords. The Hamming distance of an entire code is the minimum hamming distance between any two valid codewords. In this case from the graph, we can see the Hamming distance of this code is two.

It turns out, for a code to be correctable the Hamming distance must be at least three. Let's consider again the repetition code, which does have a Hamming distance of three. This can be seen with its graph below. We can see that for any of the invalid codewords there is always a valid obvious codeword that is closest to the invalid one. This is true for all codes with a Hamming distance of three. This means as long as only one error occurs, a code with Hamming distance three will be able to accurately correct it.

<p align="center"> <img width="450" height="450" src="https://lh3.googleusercontent.com/pw/ACtC-3fV5CoKzciPZCb8_80XYrZJF2TY-ZrWLj7DYToe0nI5D2-Jt8ggPamQFgKn_8cePkNABGqyg-iMvR_fa8gY8YIRZTGdpsStJFiBytPpE5WTHHSbSAEi__6tbz0UQ4NHI1Ro0eecCSZKcAq2R_hoevuqeg=w593-h537-no?authuser=0"> </p>

## The Binary Hamming code
Using the idea of creating parity bits with the XOR operator, we can create what is called the Hamming$[7,4]$-code. Similarly to what we did before we will combine multiple bits to create each parity bit. This code will take in four-bit inputs and encode them into seven-bit codewords, by adding three additional parity bits. For simplicity let's call these three parity bits $x_1$, $x_2$ and $x_3$ and the original four bits of the message will be $m_1$, $m_2$, $m_3$, and $m_4$.

Our goal is for these bits to help us decode, and to do that we can let each of them contain data of three of the four original bits. This will allow us to use which parity bits are incorrect to determine where the error occurred. We can define the first parity bit to be $x_1=m_1 \oplus m_2 \oplus m_4$. When trying to decode, if we determine that this parity bit is incorrect we know the error must have occurred with one of the four bits in the equation: $m_1$, $m_2$, $m_4$, or $x_1$. If we create the other two parity bits similarly, we will have the following definitions. With this definition, this code will have a Hamming distance of three.
$$x_1=m_1 \oplus m_2 \oplus m_4\\
x_2=m_1 \oplus m_3 \oplus m_4\\
x_3=m_2 \oplus m_3 \oplus m_4$$
With these parity bits, we can determine where the error occurred in the seven-bit message, by knowing which parity bits are incorrect. It is important to note that we must assume at most one error occurred. Any more than one error will be impossible to correct and will appear as if a different bit was erroneous. We could imagine creating a graph similar to what we did before. We would see that two errors would then push our message closer to a different valid codeword, which is exactly what we see with the repetition code.

Now that we have our parity bit let's break down how we can use them to correct errors. Assuming at most one error we have eight cases, one for no error and one for each of the seven bits of the encoded message. Each of these cases will correlate to a combination of incorrect parity bits. We can determine these combinations that each error produces by looking at which equations involve which parts of the encoded message. I have filled a table for each of these cases labeling which erroneous bit leads to which combination of incorrect parity bits. This gives us a way to detect a single error in any of the seven bits of the message.

|Case|Erroneous bit | Incorrect parity bits |
|---|:-:|---|
|Case 0|No Error|None|
|Case 1|$m_1$|$x_1$, and $x_2$|
|Case 2|$m_2$|$x_2$, and $x_3$|
|Case 3|$m_3$|$x_1$, and $x_3$|
|Case 4|$m_4$|$x_1$, $x_2$, and $x_3$|
|Case 5|$x_1$|$x_1$|
|Case 6|$x_2$|$x_2$|
|Case 7|$x_3$|$x_3$|

From this, we can create a decoding process by checking these eight cases to determine where in the encoded message the error occurred. Later we will generalize this step to what is called a syndrome. An implementation using python would be as follows.
```python
def encode(m): 
	x1 = (m[0] ^ m[1] ^ m[3]) 
	x2 = (m[0] ^ m[2] ^ m[3]) 
	x3 = (m[1] ^ m[2] ^ m[3])
	return m + [x1, x2, x3]


def decode(m): 
	x1 = (m[0] ^ m[1] ^ m[3]) 
	x2 = (m[0] ^ m[2] ^ m[3]) 
	x3 = (m[1] ^ m[2] ^ m[3])

	if x1 != m[4]: 
		if x2 != m[5]: 
			if x3 != m[6]: 
				m[3] ^= 1 # Case 4
			else: 
				m[0] ^= 1 # Case 1
		elif x3 != m[6]: 
			m[1] ^= 1 # Case 2
		else: 
			m[4] ^= 1 # Case 5
	elif x2 != m[5]: 
		if x3 != m[6]: 
			m[2] ^= 1 # Case 3
		else: 
			m[5] ^= 1 # Case 6
	elif x3 != m[6]: 
		m[6] ^= 1 # Case 7

	return m[0:4]
```
To see this implementation used on a random error generator, look [here](https://repl.it/@jorqueraian/Hamming). 

## Linear Error-Correcting Codes
Now that we have explored the Hamming code I want to provide a more generalized definition for error-correcting codes. In this section, we will come to the same mathematical conclusions, just stated with matrices. This might not seem important and for the Hamming code, it is not completely necessary. But this definition provides a template for the set of error-correcting codes called linear codes.

We want to narrow down our focus on linear codes as they will provide us with efficient methods for encoding and decoding. A linear code is a code that for any two codewords, the linear combination is its self a codeword. For example, `1001 001` and `1011 010` are both codewords of the Hamming code presented above. The linear combination can be found by taking the XOR operator of each element. The linear combination would then be `0010 011` which is also a valid codeword. This is true as the Hamming code is linear. This property allows us to define the encoding process of any linear code with a matrix, called the generator matrix. To encode a message, we simply [multiply](https://en.wikipedia.org/wiki/Matrix_multiplication) the input message on the left of a generator matrix. Note that instead of using addition we will use the XOR operator. For the Hamming code presented above, we could create the following generator matrix, which is mathematically the same as the encoding procedure presented above.
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

We also need a way to detect errors with this new definition. This will be done with the second matrix called the parity-check matrix. With the parity-check matrix, we will calculate what is called the syndrome by multiplying our received message on the left of the transpose of the parity-check matrix. The syndrome, much like the definition of the word might suggest will be related to the specific error that occurred, meaning the syndrome of a received message will directly correspond to the error and have no relation to the message. In general, the syndrome will be a zero vector when no error occurs and a non-zero vector when one does. We can split any received message $y$ into two components; the error $e$ and the original message $w$. We can use the distributive property of matrix multiplication to find the syndrome of each of these components separately. The syndrome of $w$ will be zero so the syndrome of $y$ is only dependent on the error and is equal to the syndrome of $e$. For the Hamming code, the syndrome will tell us exactly which parity bits were incorrect. Meaning the process of checking each parity bit as we did above will now be replaced with matrix multiplication. The parity check matrix for the hamming code will be as follows:
$$
\begin{pmatrix} 
1&1&0&1&1&0&0\\ 
1&0&1&1&0&1&0\\ 
0&1&1&1&0&0&1
\end{pmatrix}
$$
And the syndrome can be found by multiplying the encoded message with the transpose of the parity check matrix.
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
Looking closely at the parity check matrix each column corresponds to one of the cases for decoding the hamming code. For example the first row $\begin{pmatrix}1&1&0\end{pmatrix}^T$ corresponds to the parity bits $x_1$ and $x_2$ being incorrect, which is the case that $m_1$ had an error. If we continue to look at each column, we see the columns correspond to which parity bits would have to be incorrect for that column of the encoded message to contain an error. Calculating the syndrome for this Hamming code would give us the column of the parity check matrix with an error. For example, let's say we had the message `0000 000`, and as shown above, any message will have the same result. Also, consider an error in the fourth bit. When we calculate the syndrome, we would get $\begin{pmatrix}1&1&1\end{pmatrix}$ which is the fourth column of the parity check matrix. For the Hamming code, we can decode a message by simply calculating the syndrome and then finding the corresponding column of the parity check matrix. Finally when can then correct that column in the message. This decoding process is unique to the hamming code but highlights the usefulness of the syndrome and parity-check matrix. Notice that the original process of decoding mentioned in the previous section is mathematically the same, except we never explicitly defined the syndrome.

An implementation using this new definition can be found [here](https://repl.it/@jorqueraian/Hamming).

To recap any linear code can be defined with a generator matrix and a parity-check matrix. These are implemented to encode and calculate the syndrome, respectively. The syndrome can then be used to help decode the received message. This definition is extremely important as it provides a simple way to create any linear error-correcting codes, as well as providing a framework for efficient decoding methods.

## Additional Further Reading
If you're interested in learning more about error-correcting codes, specifically with a focus on the mathematics behind them, I would suggest reading the lecture notes, [here](http://u.cs.biu.ac.il/~lindell/89-662/main-89-662.html). 

I would also recommend looking more into the [Reed-Muller code](https://en.wikipedia.org/wiki/Reed%E2%80%93Muller_code), the [Reed-Solomon code](https://en.wikipedia.org/wiki/Reed%E2%80%93Solomon_error_correction), and the different types of [Concatenated codes](https://en.wikipedia.org/wiki/Concatenated_error_correction_code), such as the Forney code, all of which are mentioned in the lecture notes provided in the sources.

## Sources
Lindell, Y. Introduction to Coding Theory (89-662) [Lecture Notes]. (2010). Retrieved from (http://u.cs.biu.ac.il/~lindell/89-662/main-89-662.html)