<script type="text/javascript" src="https://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS_HTML"></script>
# Reed-Solomon Error Correction  
The Reed-Solomon error correcting code is one of the most powerful tool to prevent data corruption lossy environments   
conditions. Reed-Solomon is use most commonly used in DVD, Blu-Rays, and RAID 6 storage systems. Before we dive into   
Reed-Solomon code it is important to first understand fields, what error correcting code are and why they work. For this   
article an understanding of linear algebra is recommended.  
Note that many of the code examples below will reference the addition files `polynomial.py` and `fieldmath.py` both can be found here.

## Finite Fields  
A field is set of elements closed under multiplication, division, addition and subtraction. the most common example of  
a field are the real numbers. A finite field is field with finite number of elements. A common example would be the set  
$\{0,1\}$ with both addition and subtraction definited using the xor operator and multiplication and division being definited as normal. With Reed-Solomon, any finite field with the size being a prime power is allowed and most commonly a binear field of size $2^8$. For the definitions of each of the four required operations see the following implementation here. In general a finite field will work very similarly to the real numbers except with only a fixed number of $q$ elements. A python implementation of a finite field and related matrix operations can be found here.
  
## Linear Error Correcting Codes  
A linear code $C$ is a set of code words that form a subspace of the vector space $\mathbb{F}^n_q$, where $\mathbb{F}_q$ is a field with $q$ elements. To allow for error correcting we want to create a encoding procedure to map any message of size $k$ into a code word of size $n$.  Note to detect or correct errors we see that $n > k$.  We will call a code with parameters $n$, and $k$ with code-words forming a subspace a linear $[n,k]$-code. 

We can define a lienar code $C$ with a generator matrix $G$, whose rows form the basis for the code $C$, meaning the rows can be any set of linearly independent code-words. This then gives us a rather simple encoding procedure where for some input message $m$ can be encoded to $w=m\cdot G$ where $w$ and $m$ are row vectors. In this case the the space of code-words is the co-image, or row space of the of $G$. To check if a code word, $w$ of size $n$ is in fact in our code $C$ we can perform Gaussian elimination to determine compatibility. Alternativily we can define a parity check matrix $H$  such that $H\cdot G^T= 0$. This would mean the the parity check matrix represent the compliment of the code $C$, this is called a dual-code and has the generator matrix $H$. This provides us with a very useful property: $v\in C$ if and only if $v\cdot H^T= 0$. This provides us with avery simple method to check whether or not a received message had an error. We can also determine that for a linear $[n,k]$-code, $G\in \mathbb{F}^{k\times n}_q$ and $H\in \mathbb{F}^{(n−k)\times n}_q$. If our two matrices are in the following form $G = (I_k|X)$ and $H=(−X^T|I_{n−k})$ we say they are in standard form. Notice a generator matrix in this form can not only easily help constructthe partiy check matrix but finding original message, when no errors is just the first $k$ elements of the received message. And any matrix $G$ and $H$ can be transformed to standard form using Guassing elemenination.

A code $C$ is a $[n, k, d]$-code if it is a $[n,k]$-code with a minimum distance, Hamming distance, $d$ between code words. Refer to the additional reading for how this paramaeter is found, for this article we will consider it a give that is unique to each family of codes. This attribute determines how many errors are correctable and a linear $[n, k, d]$-code can correct up to $\left\lfloor{\frac{d-1}{2}}\right \rfloor$ errors.

Consider a code-word $w$ in our code $C$ and some error $e$. Assume that the error is fixable meaning there are less than $\left\lfloor{\frac{d-1}{2}}\right \rfloor$ individual errors in $e$, and let $y = w + e$. When we multiply $y$ with the transpose of the parity check matrix we will get a non-zero result, which we call the syndrome, and due to the distributive properly of matrix multiplication, $S_H(y) = yH^T= (m+e)H^T = eH^T$. This syndrome is a unique vector that corresponds to the specific error that occurred. This leads to a decoding process called syndrome decoding, can be found in addition reading section, This is not always a practical method of decoding, as it requires a very large amount of space and initialization and more often than not we will create other algorithm using the syndrome specific to each code.

## The Generalized Reed-Solomon Code
Now that we have the fundamental down we can jump into the encoding and decoding of the Generalized Reed-Solomon (GRS), error correcting code. For the remainder of this article we will work in the binary field of $2^8$ elements, as this allows each symbol in our message to be a byte. A code implementation of this finite field can be found here.

A GRS code is created from a set of $n$ distinct non-zero value of $\mathbb{F}_q$, $\alpha_1, \dots \alpha_n$ called the code locators. Conventionally these are created from a single value $\alpha$, such that $\alpha_i = \alpha^i$. In addition we define two sets of column multipliers, with non-zero values of $\mathbb{F}_q$, $v_1, \dots, v_n$ and $v'_1, \dots, v'_n$, but when creating a GRS code only one of these sets is required on initialization. Reed-Solomon codes are defined using a polynomial to both find the encoded message and the syndrome of a code, but as we will see both of these procedures can be modified to use a generator and parity check matrix. With this definition Reed-Solomon in a linear $[n, k, d]$-code, with parameters $[n, k, n-k+1]$ meaning there are $\left\lfloor{\frac{d-1}{2}}\right \rfloor$ correctable errors.

In python we can create a GRS class as such
```python
class GeneralizedReedSolomon(object):  
	def __init__(self, f, k, n, alpha=0x2):
		# Will create GRS [n, k]-code over the field f from fieldmath.py
		...
		self.f = f
		self.p = PolynomialOperations(self.f)
		...
```
The full extended  implementation including the generation of both the generator and parity check matrices can be found here.

### Creating the Generator and Partity Check Matrices

Reed-Solomon codes are definited with the following endoing procedure. Let our message $m= m_0,\dots,m_{k-1}$ be the coefficients of a polynomial in $\mathbb{F}_q[x]$ such that $m(x) = m_0 + m_1x+m_2x^2+\dots+m_{k-1}x^{k-1}$. Now each value $\alpha_i$ will be used to creating the encoded message $\langle v'_1m(\alpha_1),\dots,v'_n m(\alpha_n)\rangle$. From this definition we can construct a generator matrix from this encoding as each column of the generator matrix would correspond to the message polynomial without the coefficients. This provides us with the encoding procedure $E(m) = mG$. Additionally knowing that the orthogonal compliment, the dual-code, of our GRS is its self a GRS with parameters $[n, n-k]$, we can construct the parity check matrix in a similar way, but now we will use the column multipliers $v_1,\dots,v_n$, and it is common to see these as all ones.
$$G_{GRS}= 
\begin{pmatrix}
v'_1 & \dots & v'_n\\
v'_1\alpha_1 & & v'_n\alpha_n\\
\vdots &  & \vdots\\
v'_1\alpha_1^{k-1} & \dots & v'_n\alpha_n^{k-1}
\end{pmatrix} \;\;\;\; 
H_{GRS}= 
\begin{pmatrix}
v_1 & \dots & v_n\\
v_1\alpha_1 & & v_n\alpha_n\\
\vdots & & \vdots\\
v_1\alpha_1^{n-k-1} & \dots & v_n\alpha_n^{n-k-1}
\end{pmatrix}$$
For these matrices to represent a valid code they would have to satisfy $H G^T = 0$, and this is done with our two sets of column multipliers. Provided with one of these sets the other can be found with a process involving finding the kernel of a related parity check matrix, a code implementation is provided here but for now we will assume the column multipliers have been selected to create a valid code.

In code our encoding algorithm, using the polynomial definition would be as as follows. A matrix implementation can be found here, but its generally slower.
```python
def encode(self, msg):
	encoded_msg = []  
	for i in range(self.n):  
		encoded_msg.append(self.f.multiply(self.vp_arr[i], self.p.poly_call(msg, self.alpha_arr[i])))  
	return encoded_msg
```
### The Decoding Algorithm
In this section we will talk about the theory behind the Peterson-Gorenstein-Zierler GRS decoding algorithm. This algorith, first finds the location of the errors and then use the syndrome to create a system of equations that when solved would result in the errors that occurred. By breaking down the definition of the syndrome $S_H(y)= (S_0,\dots, S_d-2)$ we can see that for $0 \leq \ell < d-1$, the corresponding element can expressed as $S_{\ell}=\sum_{j=1}^{n} y_j v_j \alpha_j^{\ell}$. Recall that for the error $e$, in $y$, $S_H(y) = S_H(e)$, meaning if $e_j = 0$, $e_j v_j \alpha_j^{\ell} = 0$ therefore we only need to consider the $j$ values with error, and we can call the set of all erroneous location $J$, such that for all $j \in J$, $e_j \neq 0$.

$$S_{\ell}=\sum_{j=1}^{n} y_j v_j \alpha_j^{\ell}=\sum_{j=1}^{n} e_j v_j \alpha_j^{\ell} = \sum_{j\in J} e_j v_j \alpha_j^{\ell}$$

In code to just find the syndrome of a message would look like this, and again a version using the partiy check matrix can be found here.
```python
def syndrome(self, msg):  
	syndrome = []  
	for l in range(self.d-1):  
		syn_l = self.f.zero()  
		for j in range(self.n):  
			syn_l = self.f.add(syn_l, self.f.multiply(self.f.multiply(msg[j], self.v_arr[j]), fieldmath.pow_over_field(self.alpha_arr[j], l, self.f)))  
		syndrome.append(syn_l)  
	return syndrome
```

Assuming the size of $|J| \leq \left \lfloor{\frac{d-1}{2}}\right \rfloor$ we have a solvable system of equations to find the error vector $e$. Before we can do this we must locate the error, and this is done with two polynomials in $\mathbb{F}_q[x]$, the error locator polynomial, $\Lambda(x)$ and the error evaluator polynomial $\Gamma(x)$. We will define $\Lambda(x)$ such that $\Lambda(\alpha_k^{-1}) = 0$ if and only if $k\in J$. Similarly we want to define $\Gamma(x)$ such that if $k\in J$ then $\Gamma(\alpha_k^{-1}) \neq 0$. Defining these polynomials as such will provide us with useful fact that the $\gcd(\Lambda(x), \Gamma(x)) = 1$. In addition to the definition we can write them in terms of their coefficients, $\Lambda_m$ and $\Gamma_m$ corresponding to the $x^m$ term. Let $\tau$ be the number of correctable errors $\left \lfloor{\frac{d-1}{2}}\right \rfloor$.

$$\Lambda(x)= \prod_{j\in J}(1-\alpha_jx) = \sum_{m=0}^{\tau} \Lambda_mx^m \;\;\;\;\Gamma(x) = \sum_{j \in J} e_j v_j \prod_{m \in J \,\setminus \{j\}}(1-\alpha_mx) = \sum_{m=0}^{\tau-1}  \Gamma_mx^m$$

From these definitions we can find that $\Lambda(x)S(x) \equiv \Gamma(x) \mod x^{d-1}$, which creates a system of equations to find possible coefficients for $\Lambda(x)$ and $\Gamma(x)$. First we can solve the homogeneous system of equations below to find a subspace of the possible coefficients of $\Lambda(x)$, and we will call an element of this space $\lambda$ which has a corresponding polynomial $\lambda(x)$. 

$$\begin{pmatrix}
S_\tau & S_{\tau-1} & \dots & S_0\\
S_{\tau+1} & S_{\tau} & \dots & S_1\\
\vdots & \vdots & & \vdots\\
S_{d-2} & S_{d-3} & \dots & S_{d-\tau-2}
\end{pmatrix} 
\begin{pmatrix}
\lambda_0\\
\lambda_1\\
\vdots\\
\lambda_\tau
\end{pmatrix} = 0$$

To solve for $\lambda$ we need to find the kernel, null space, of the matrix. This then gives a finite, but large number of possible combinations for the vector $\lambda$. This doesn't allow us to immediately determine what the polynomial $\Lambda$ is but we know the coefficients exist in the kernel space. To help determine the exact values of the coefficients we need to also find possible coefficients for $\Gamma(x)$ which can be found with the following matrix multiplication, using any possible $\lambda$ in the kernel. This will provide us with the vector $\gamma$ and its corresponding polynomial $\gamma(x)$

$$\begin{pmatrix}
S_0 & 0 & \dots & 0 & 0\\
S_1 & S_0 & \dots & 0 & 0\\
\vdots & \vdots & & \vdots & \vdots\\
S_{\tau-1} & S_{\tau-2} & \dots & S_0& 0
\end{pmatrix} 
\begin{pmatrix}
\lambda_0\\
\lambda_1\\
\vdots\\
\lambda_\tau
\end{pmatrix} = 
\begin{pmatrix}
\gamma_0\\
\gamma_1\\
\vdots\\
\gamma_{\tau-1}
\end{pmatrix}$$

Recall that the $\gcd(\Lambda(x), \Gamma(x)) = 1$ meaning there exists a $\lambda$ and $\gamma$ with corresponding $\lambda(x)$ and $\gamma(x)$ such that $\gcd(\lambda(x), \gamma(x)) = 1$. This then allows to find $\Lambda$ by taking any non zero $\lambda(x)$ and the corresponding polynomial $\gamma(x)$.

$$\Lambda(x) = \frac{\lambda(x)}{\gcd(\lambda(x), \gamma(x))}$$

Finally with $\Lambda(x)$ we can find the locations of each of the possible errors by simply testing the multiplicative inverse of each $\alpha_j$, as $\Lambda(\alpha_j^{-1}) = 0$ means the $j$ index of our received message has an error. And using the syndrome equation provided earlier we can solve for the errors and correct them. This decoding process has $O(d^3)$ run time which is by no means very fast but with specialized hardware similar to what is in a DVD player this can be done in real time as it only involves matrix operations.
In code this would look something like this
```python
def decode(self, msg):  
	# First find syndrome (S_0, ... , S_d-2)
	msg_synd = self.syndrome(msg)  
	msg_matrix = fieldmath.create_matrix([msg], self.f)
  
	if any([syn != self.f.zero() for syn in msg_synd]):  
		msg_syndrome = fieldmath.create_matrix([msg_synd], self.f)
		# Create system of equations to find lambda and gamma
		tau = (self.d - 1) // 2  
		syndrome_matrix = fieldmath.Matrix(self.d - 1, tau + 1, self.f, zeros=True)  
		for i in range(self.d - 1):  
			for j in range(i, max(-1, i - tau - 1), -1):  
				syndrome_matrix.set(i, i - j, msg_syndrome.get(0, j)) 
		# Find lambda poly  
		lam_eqs = syndrome_matrix.get_sub_matrix(tau, None, None, None)  
		lam_kernel_space = lam_eqs.kernel_space()  
		if lam_kernel_space != 0:  
			lam_coeff_matrix = lam_kernel_space * fieldmath.create_matrix([[1]] * lam_kernel_space.column_count(), self.f)  
		lam_coeff = lam_coeff_matrix.to_list(single=True)
		# Find gamma poly
		gamma_coeff_matrix = syndrome_matrix.get_sub_matrix(None, tau, None, None)*lam_coeff_matrix  
		gamma_coeff = gamma_coeff_matrix.to_list(single=True)  
		# Find Big Lambda
		gcd_lg = self.p.poly_gcd(lam_coeff, gamma_coeff)
		error_locator_poly, rem = self.p.poly_divmod(lam_coeff, gcd_lg)  
  
		# Find location of errors
		for j in range(len(self.alpha_arr)):  
			alpha_inv = self.f.reciprocal(self.alpha_arr[j])  
				if self.p.poly_call(error_locator_poly, alpha_inv) == 0:  
					error_locations.append(j)  
		# Create system of equations to find error.
		if len(error_locations) != 0:
			err_matrix = fieldmath.Matrix(self.d - 1, len(error_locations), self.f)  
			for r in range(err_matrix.row_count()):  
				for c in range(err_matrix.column_count()):  
					val = self.f.multiply(self.v_arr[error_locations[c]], fieldmath.pow_over_field(self.alpha_arr[error_locations[c]], r, self.f))
					err_matrix.set(r, c, val)  
			# Solve for error
			try: 
				errors = fieldmath.solve_ax_b_fast(err_matrix, msg_syndrome.transpose())  
			except Exception as e:  
				print(f"Could not solve and find errors using solve_ax_b: {e}")  # This can be safely ignored
			errors = fieldmath.create_matrix([[0]]*err_matrix.column_count(), self.f)  
  
			# finally fix the errors  
			for i in range(len(error_locations)):  
				msg_matrix.set(0, error_locations[i], self.f.subtract(msg_matrix.get(0, error_locations[i]), errors.get(i, 0)))  
  
	 if not self.syndrome(msg_matrix).any():  
		return fieldmath.solve_ax_b_fast(self.generator_matrix.transpose(), msg_matrix.transpose()).to_list(single=True)  
	else:  
		return [0]*self.k
```
A more commented version can be found here.

## Using the Generalized Reed-Solome code
For a simple text input with random error check out this interatice demonstration here.

To test this implementation lets create a generalized Reed-Solomon code with parameters $[82, 64, 19]$. Meaning with this code we can correct up to a maximum of 9 byte errors per 82 byte segments of the encoded data. To help highlight why Reed-Solomon can be so powerful we are going to use an image and simulate a scratch on the image, to visualize what migth happen on a disk. Each pixel of the image will be represented by 3 bytes, one for each color, so to correct a single pixel 3 bytes would need to be fixed assuming all 3 bytes were corrupted. To simulate error we will randomly create a line in the form $\alpha + \beta x$ and then compare each pixel location $(x, y)$ with the line to determine the likely hood that the pixel was corrupt. Below is a visualization of the simulated scratch, note that due to the increased size of the encoding this does not necessarily correspond the exact error, but this does represent the number of 3-byte errors and their approximate location in the image. Each white dot represents 3 errors and the thickness of the line ranges from 1 pixel to more than 4.

The original image
Visualization of scratched image

To correct this image we can run the encoded image into our decoder and get the best possible decoding. 

Error corrected image.

As we see most of the scratch was accurately corrected. In fact there are only 2 visible instances of error left. The error is sparse meaning the lost data could be approximated by averaging its surroundings. If we wanted to increase the number of error corrections we could create a new GRS with parameters $[122, 96, 27]$ which would give us a total of 13 correctable errors while still keeping the ratio of data bits to total bits relatively the same.