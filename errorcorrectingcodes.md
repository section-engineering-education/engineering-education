<script type="text/javascript" src="https://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS_HTML"></script>

# An Introduction to Error Correction Codes: The Hamming Code
The spacecraft [Juno](https://en.wikipedia.org/wiki/Juno_(spacecraft)) was launched in 2011 and since then it has taken countless [photos](https://www.nasa.gov/mission_pages/juno/images/index.html) of Jupiter, many of which are nearly flawless in their detail. But how can these images be transmitted hundreds of millions of miles through space with relatively few signs of interference? Similarly, you might ask how DVDs can still play movies with scratches on them. This is done with the use of error-correcting codes. Like encryption, error-correcting codes are one of the most fundamental parts that keep our technology-driven society running. Every communication channels experience transmission errors in some form, meaning it is a requirement to be able to fix these errors. In this article, we will explore the intuitions behind error-correcting codes as well as introduce the Hamming code.

## What are Error-Correcting Codes?
At its core, error-correcting codes allow for the detection and correction of errors in any form of data, either transmission or storage. This is achieved by taking a string of symbols, most commonly a string of bits, as the input. We will add additional bits called parity bits. These can help determine whether or not an error might have occurred. The most classic example of error-correction is the repetition code, where for each bit in an input message, we duplicate the bit multiple times. For example, if you had the message $01101$ we could encode it using this repetition method and it would become $000\; 111\; 111\; 000\; 111$. In this case, we repeated each bit three times. If a random bit flip or error occurred, we could correct it by simply taking the most common bit of each three-bit segments. Let's say we received the following message $100\;111\;101 000\;110$, which includes multiple errors. We would then be able to correct the error and decode the message to the original message $01101$. But this method isn't very efficient as we had to make our message three times longer, adding two parity bits for each bit of the original code.

How can we improve this? One idea would be to make our parity bits dependent on multiple bits instead of just one. For example, consider the two-bit message $11$. We could add a single parity bit by taking the XOR of the two original bits, adding only one additional bit, $1 \oplus 1 = 0$. Now we have the encoded message $110$. This then allows us to check if one error occurred as if there was an error this parity bit will no longer be correct. Consider the received message $100$, with an error. If we try to re-calculate the parity bit we would find it no longer matches the received parity bit. So we know there must be an error. This still doesn't allow us to correct the error. To do this we will need to add more parity bits.

The problem with the previous example is that a valid code-word, like $110$, can be turned into a different valid codeword by changing any two bits. Changing both of the original bits still satisfies the parity and changing either of original bits and the parity will also satisfy the parity. So if only one error occurred, we would have no way to determine which of the valid codes was sent. As there would be three equally likely valid code words. For example with the recieved message $100$, which has an error in the second bit. We could not accuratly fix this error as it is equally likely that the error happened in the first or thirds bits.

This idea can be thought of as the distance between valid code-words and is called the Hamming distance, and for a single error to be correctable the Hamming distance must be at least three. With a Hamming distance of three, any received message that isn't already a valid code will be a distance of one away from a valid code. It will also be a distance of two or more from all other valid codes. This gives us a good idea of what the original message was and we can correct one error. The repetition code is an example of a code with distance three.

## The Binary Hamming code

Using the idea of parity bits, we can create what is called the Hamming$[7,4]$-code. This code will take in any four-bit input message and encode it into a seven-bit message, by adding three additional parity bits. For simplicity let's call these three parity bits $x_1$, $x_2$ and $x_3$ and the original four bits of the message will be $m_1$, $m_2$, $m_3$, and $m_4$.

Our goal is for these bits to help us decode, and to do that we can let each of them contain data of three of the four original bits. For example with the XOR operator $x_1=m_1 \oplus m_2  \oplus m_4$. If we determine that this parity bit is incorrect we know the error must have occurred with one of the four bits in the equation: $x_1$, $m_1$, $m_2$, or $m_4$. We can create the other two parity bits similarly.
$$x_1=m_1 \oplus m_2  \oplus m_4\\
x_2=m_1 \oplus m_3  \oplus m_4\\
x_3=m_2 \oplus m_3  \oplus m_4$$
With these parity bits, we can determine where the error occurred in the seven-bit message. It is important to note that we must assume at most one error occurred. Any more than one error will be impossible to correct and will appear as if a different bit was erroneous. 

Now that we have our parity bit let's break down how we can use them to correct errors. There are eight combinations of possibilities for any received message. These will include all three bits being correct, one of them being wrong, two of them being wrong or three of them being wrong. For a message with no error, all three bits will be correct. If $m_1$ had an error we would see that both $x_1$ and $x_2$ would be incorrect. Similarly if $m_2$ has an error, the parity bits $x_2$ and $x_3$ would be incorrect. If $m_3$ has an error $x_1$ and $x_3$ would be incorrect. We can determine this by looking at which equation involves which part of the encoded message. Similarly, if all three bits were incorrect we would know that $m_4$ must have had an error. Finally, if only one of the parity bits was incorrect we would know that the parity bit itself would have been erroneous. This gives us a way to detect and error in any of the seven bits of the message. I have created a table to better highlight these eigth different cases

|Case|Erroronuous bit   |  Incorrect parity bits |
|---|:-:|---|
|Case 0|No Error|None|
|Case 1|$m_1$|$x_1$, and $x_2$|
|Case 2|$m_2$|$x_2$, and $x_3$|
|Case 3|$m_3$|$x_1$, and $x_3$|
|Case 4|$m_4$|$x_1$, $x_2$, and $x_3$|
|Case 5|$x_1$|$x_1$|
|Case 6|$x_2$|$x_2$|
|Case 7|$x_3$|$x_3$|

This checking process would then be able to check and correct an error in any of the 7 bits of the encoded message. An implementation of this in python would be as follows.
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
				m[3] ^= 1  # Case 4
			else:  
				m[0] ^= 1  # Case 1
		elif x3 != m[6]:  
			m[1] ^= 1  # Case 2
		else:  
			m[4] ^= 1  # Case 5
	elif x2 != m[5]:  
		if x3 != m[6]:  
			m[2] ^= 1  # Case 3
		else:  
			m[5] ^= 1  # Case 6
	elif x3 != m[6]:  
		m[6] ^= 1  # Case 7
	# Case 0 if nothing is changed
	
	return m[0:4]
```

## Linear Error-Correcting Codes
The Hamming code is excellent at correcting exactly one error, but in real life, this is rarely the case. In this section, I want to focus on a more complete definition of error-correcting codes. We want to narrow down our focus on linear codes as linear codes will provide us with a simple method to encode our messages. A linear code is a code that for any two codewords, the linear combination is its self a code word. For example, $1001001$ and $1011010$ are both codewords of the Hamming code presented above. The linear combination can be found by taking the XOR operator of each element. The linear combination would then be $0010011$ which is also a valid code-word. This property allows us to define the encoding process of any linear code with a matrix, called the generator matrix. To encode a message, we simply [multiply](https://en.wikipedia.org/wiki/Matrix_multiplication) the input message on the right by the generator matrix. Note that instead of using addition we will use the XOR operator. For the Hamming code presented above, we could create the following generator matrix.
$$
\begin{pmatrix}  
1&0&0&0&1&1&0\\  
0&1&0&0&1&0&1\\  
0&0&1&0&0&1&1\\  
0&0&0&1&1&1&1  
\end{pmatrix}
$$
And the encoding procedure can be expressed with the generator matrix.
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
We also need a way to detect errors with this new definition. This will be done with the second matrix called the parity check matrix. With the parity check matrix, we will calculate what is called the syndrome. The syndrome, much like the definition of the word might suggest will correspond to the specific error that occurred, meaning the syndrome of a received message will directly correspond to the error and not the message. If no error occurs, then the syndrome will be zero. Otherwise, if an error occurred in the message, the syndrome would be some non-zero value that can help us to determine the error. The parity check matrix for the hamming code will be as follows:
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
Looking closely at the parity check matrix each column corresponds to one of the cases for decoding the hamming code. For example the first row $\begin{pmatrix}1&1&0\end{pmatrix}^T$ corresponds to $x_1$ and $x_2$ being incorrect, which is the case that $m_1$ had an error. If we continue to look at each column, we see that the columns correspond to which parity bits would have to be incorrect for that column of the encoded message to contain an error. Calculating the syndrome for this Hamming code would give us the column of the parity check matrix with an error. For example, let's say we had an error in the fourth bit. When we calculate the syndrome, we would get $\begin{pmatrix}1&1&1\end{pmatrix}$ which is the fourth column of the parity check matrix. For the Hamming code, we can decode a message by simply calculating the syndrome and then finding which column it corresponds to, and that column has the error. This decoding process is unique to the hamming code but highlights the usefulness of the syndrome and parity check matrix.

To recap any linear code can be defined with a generator matrix and a parity check matrix. These are implemented to encode and calculate the syndrome, respectively. The syndrome can then be used to help decode the received message. It might not be intuitively apparent why linear codes, with this matrix definition, are useful. For more complicated codes, this idea of a syndrome is critical in designing efficient decoding algorithms.

To see a random error generator with the implementation provided in the previous section, look [here](https://repl.it/@jorqueraian/Hamming). 

## Formal Definitions


This final section with go more in depth into the formal definitions of linear error-correcting codes and the mathematicas behind how they work. This section is by no means nessisary in understanding the previous sections. 

A [field](https://en.wikipedia.org/wiki/Field_(mathematics)) is set of elements closed under multiplication, division, addition, and subtraction. Meaning for any two elements of a field, the use of any of these operations wil result with another element in the field. An example of a field is the set of real numbers. With error correction we care about finite field which is a type field with a finite number of elements. In this article we talked about the use of a field of two elements, $\{0,1\}$. With more complicated codes such as the Reed-Solomon code, a finite field to of $2^8$ elements is comonly used. This allows each element of the Reed-Solomon code to be represented as a byte. To see how we might implement one of these fields, with some linear algebra examples in python look [here](https://repl.it/@jorqueraian/FiniteFields).

A linear code $C$ is a set of code words that form a subspace of the [vector space](https://en.wikipedia.org/wiki/Vector_space) $\mathbb{F}^n_q$, where $\mathbb{F}_q$ is a field with $q$ elements. In this case, a code-word is an $n$-dimensional vector, with each element being part of our field. With Hamming codes we considered the binary field of two elements $\mathbb{F}_2$, with code words of length seven.  Error-correcting codes take in an input message of size $k$ and return an encoded messaged of size $n$, and as a shorthand, we call this a linear $[n,k]$-code.

The [Hamming distance](https://en.wikipedia.org/wiki/Hamming_distance), $d$ of a code, represents the minimum number of different symbols between the closest two codewords. This encapsulates the idea of how many errors it would take to get to another valid vode word. This attribute determines how many errors are correctable as a code with Hamming distance $d$ can correct up to $\left\lfloor{\frac{d-1}{2}}\right \rfloor$ errors. Knowing $d$ we call the code a linear $[n, k, d]$-code. With this definition we call the Hamming code and linear $[7,4,3]$-code.



Every error-correcting code can be defined using two matrices, the generator matrix, and the parity check matrix. With our generator matrix $G$ we can create a fairly simply encoding procedure $E_G(m)=m\cdot G$, for any imput messgae $m$. By defining our code with a generator matrix, we guarantee our code will be linear. To check if a received message, $w$ is in fact in our code we can perform [Gaussian elimination](https://en.wikipedia.org/wiki/Gaussian_elimination) to simply solve for $m$, in $w=m\cdot G$. Alternatively, we can use the parity check matrix $H$. We want to create the parity check matrix such that $H\cdot G^T= 0$, meaning the parity check matrix is the orthogonal compliment to the generator matrix. This allows us to check if $w$ is a valid code-word as $v\in C$ if and only if $v\cdot H^T= 0$. This is where the idea of the syndrome comes from. For some received message $y$ the syndrome is $S_H(y) = yH^T$. To understand why this is important, consider a code-word $w$ in our code $C$ and some error $e$. Assume the error is fixable meaning there are less than $\left\lfloor{\frac{d-1}{2}}\right \rfloor$ non-zero elements in $e$, and let $y = w + e$. In this case, the syndrome will represent a non-zero vector. Utilizing the distributive property of matrix multiplication, we can determine the syndrome is a unique value dependent on the error, $S_H(y) = S_H(e)$. This means two different encoded messages with the same error, will have the same syndrome. So the syndrome in only dependent on the error. This aspect of the syndrome leads to decoding process called syndrome decoding. Althought not very efficient it leads to specifalized decoding algotihms.

As a final note on the formal mathematics of error-correcting codes, the code space $C$ is the row space or co-image of the generator matrix. This means there are multiple equivalent forms for both the generator and parity check matrices. Although not required, more often than not these matrices will be in standard form where $G = \left( I_k | X\right)$  and $H = \left(-X^T | I_{n-k}\right)$. This is done by performing elementary row operations on both matrices until they are in this form. Notice a generator matrix in standard form can help construct the parity check matrix as they will both contain a common submatrix. Additionally, a standard generator matrix can help decoded a corrected message as the first $k$ elements will represent the original message.


## Sources

## Further reading
