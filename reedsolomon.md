
<script type="text/javascript" src="https://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS_HTML"></script>

# Reed-Solomon Error Correction

Have you ever wondered how images of Jupiter or Pluto can travel hundreds of millions of miles or even billions of miles through space with relatively few signs of interference? This is done with the magic of error-correcting codes, and often the combination of multiple encoding techniques including Reed-Solomon codes. Error-correcting codes are not only responsible for the integrity of data transmission but data storage as well. The entire reason a scratched DVD still works in due to Reed-Solomon error correction. Like encryption, error-correcting codes are one of the most fundamental parts of our technology-driven society.

  

In this article, we will break down how Reed-Solomon error-correcting code work and what make then so powerful. Before we dive into Reed-Solomon codes it is important to first understand a few mathematical concepts.

  

## Finite Fields

A [field](https://en.wikipedia.org/wiki/Field_(mathematics)) is set of elements closed under multiplication, division, addition, and subtraction, meaning for any two elements of a field, the use of any of these operations wil result with another element in the field. The most common example of a field is the set of real numbers. In this article we will focus on finite field which is a field with a finite number of elements. With Reed-Solomon, a logic field to use is the field of $2^8$ elements such that each element can be represented as a single byte. To see how we might implement one of these fields, with some linear algebra examples in python look [here](https://repl.it/@jorqueraian/FiniteFields).

## Linear Error-Correcting Codes

Before we talk about Reed-Solomon codes I want to talk about what an error-correcting code is and how we define it.

  

A linear code $C$ is a set of code words that form a subspace of the [vector space](https://en.wikipedia.org/wiki/Vector_space) $\mathbb{F}^n_q$, where $\mathbb{F}_q$ is a field with $q$ elements. In this case, a code-word is an $n$-dimensional vector, with each element being part of our field. Error-correcting codes take in an input message of size $k$ and return an encoded messaged of size $n$, and as a shorthand, we call this a linear $[n,k]$-code.

  

The [Hamming distance](https://en.wikipedia.org/wiki/Hamming_distance), $d$ of a code, represents the minimum number of different symbols between the closest two codewords. This attribute determines how many errors are correctable as a code with Hamming distance $d$ can correct up to $\left\lfloor{\frac{d-1}{2}}\right \rfloor$ errors. Knowing $d$ we call the code a linear $[n, k, d]$-code.

  

Every error-correcting code can be defined using two matrices, the generator matrix, and the parity check matrix. These will help us encode a message and determine if an error occurred. With our generator matrix $G$ we can create a fairly simply encoding procedure $E_G(m)=m\cdot G$. This tells us to encode an input message $m$ we can multiply the generator matrix on the right of the message. By defining our code with a generator matrix we guarantee that our code will be linear. To check if a received message, $w$ is in fact in our code we can perform [Gaussian elimination](https://en.wikipedia.org/wiki/Gaussian_elimination) to simply solve for $m$, in $w=m\cdot G$. Alternatively, we can use the parity check matrix $H$. We want to create the parity check matrix such that $H\cdot G^T= 0$. This allows us to easily check if $w$ is a valid code-word as $v\in C$ if and only if $v\cdot H^T= 0$. This would be a non-zero value if the received message wasn't in our code. We call this the syndrome. For some received message $y$ the syndrome is $S_H(y) = yH^T$. To understand why this is important consider a code-word $w$ in our code $C$ and some error $e$. Assume that the error is fixable meaning there are less than $\left\lfloor{\frac{d-1}{2}}\right \rfloor$ non-zero elements in $e$, and let $y = w + e$. In this case, the syndrome will be a non-zero vector. Using the distributive property of matrix multiplication we can determine that the syndrome is a unique value dependent on the error, $S_H(y) = S_H(e)$. This tells us that for two different encoded messages with the same error we would calculate the same syndrome.

  

## The Generalized Reed-Solomon Code

Now that we have the fundamentals down we can jump into the encoding and decoding of the Generalized Reed-Solomon (GRS), error-correcting code.

  

Unlike more traditional error-correcting codes, [like the Hamming code]([https://en.wikipedia.org/wiki/Hamming_code](https://en.wikipedia.org/wiki/Hamming_code)), that can correct bit errors, Reed-Solomon can correct entire bytes as it effectively groups bit when encoding messages. This clustering effect allows for large segments of contiguous data to be correctable that wouldn't normally be fixed by traditional codes. A visualization of this idea can be found below. This can be very useful for situations with a cluster like error, were multiple contiguous bit are affected, like a scratch on a DVD, or localized interference in data communication.

  

But how does this work?

  

For this implementation, I will be using the finite field of 256 elements, as this gives us the ability to correct entire bytes, but any finite field with a prime power of elements can be used.

Like any linear code, we want to define a generator matrix and a parity check matrix. We will create $n$ distinct non-zero values of $\alpha_1, \dots \alpha_n$ called the code locators. In our case, we will let the first code locater $\alpha_1$ be the value 2, and all following code locators will be $\alpha_i = \alpha_1^i$. These code locators will correspond to each column of both the generator and parity check matrices. This means when we encode the message each of the elements of the encoded message will be related to its corresponding code locator. As we will see this will help determine where the error occurs. We will be able to determine the location using a polynomial, $\Lambda(x)$, with coefficients that can be found from the syndrome. The roots of this polynomial will correspond to code locators for where errors occurred.

In addition to our code locators we want to define two sets of non-zero values called the column multipliers, $v_1, \dots, v_n$ and $v'_1, \dots, v'_n$. These will play a significance in making our matrices valid.

  

### Creating the Generator and Parity Check Matrices

To encode a message with Reed-Solomon let our input message $m= m_0,\dots,m_{k-1}$ be the coefficients of the polynomial $m(x) = m_0 + m_1x+m_2x^2+\dots+m_{k-1}x^{k-1}$. Using this polynomial we can pass in each of the code locates for each of the elements of our encoded message, so each element corresponds to a specific code locator. This will create the encoded message $\langle v'_1m(\alpha_1),\dots,v'_n m(\alpha_n)\rangle$. From this definition we can construct a generator matrix where each column of the generator matrix would correspond to the message polynomial without the coefficients of $m$. This provides us with an alternative encoding procedure $E(m) = mG$. Similarly we can create the parity check matrix $H$.

$$G_{GRS}=
\begin{pmatrix}
v'_1 & \dots & v'_n\\
v'_1\alpha_1 & & v'_n\alpha_n\\
\vdots & & \vdots\\
v'_1\alpha_1^{k-1} & \dots & v'_n\alpha_n^{k-1}
\end{pmatrix} \;\;\;\;
H_{GRS}=
\begin{pmatrix}
v_1 & \dots & v_n\\
v_1\alpha_1 & & v_n\alpha_n\\
\vdots & & \vdots\\
v_1\alpha_1^{n-k-1} & \dots & v_n\alpha_n^{n-k-1}
\end{pmatrix}$$

I have encluded these matreces to verify their existance and to show that our GRS code is in fact linear. For these matrices to represent a valid code they would have to satisfy $H G^T = 0$, and this is done by carefully picking value for the column multipliers. For simplicity let the set $v_1, \dots, v_n$ be all ones, and then we can then solve for $v'_1, \dots, v'_n$.

  

### The Decoding Algorithm

In this section, we will talk about the Peterson-Gorenstein-Zierler GRS decoding algorithm which uses the syndrome and the code locators to find and correct any possible error that occurred. For this section let $S_H(y) = yH^T= (S_0,\dots, S_d-2)$.

  

Recall that the syndrome of a received message is only dependent on the error, therefore if we knew what elements of the received messaged had error we could create a system of equations to find the error, as we could entirely ignore some of the rows of the parity check matrix. For each element of the syndrome $S_\ell$, we only need to consider the indices that we know have an error. We can call this set of all erroneous location $J$. Assuming we have less than the number of correctable errors we can solve for the error vector $e$. Otherwise, if there more we would not have a solvable system of equations.

  

Before we can do this we must locate the error, and this is done with the error locator polynomial, $\Lambda(x)$, and the error evaluator polynomial $\Gamma(x)$. In order to locate errors with the code locators, we want the roots of $\Lambda(x)$ to tell use what element of our message had an error. To do this we want to create a polynomial with the roots being the multiplicative inverses of each of the code locators with an error. Once we have created this polynomial we can easily plug in each code locator and determine exactly which elements had an error. To help find the coefficients for the error locator we want to create the polynomial $\Gamma(x)$, such that none of its roots are the same as $\Lambda(x)$. Defining these polynomials as such will provide us with useful fact that the $\gcd(\Lambda(x), \Gamma(x)) = 1$.

  

To find the coefficients for each of these equations we can solve the homogeneous system of equations below to find a possible set of coefficients of $\Lambda(x)$, and we will call this $\lambda$ which has a corresponding polynomial $\lambda(x)$. As this is a homogeneous system of equations there will be a large number of possible solutions, but we only need any non-zero solution.

  

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
\end{pmatrix} =
\begin{pmatrix}
0\\
0\\
\vdots\\
0
\end{pmatrix}$$

  

To find a possible set of coefficients for $\Gamma(x)$ we can use $\lambda$ found previously to find a set of possible values that we will call $\gamma$ with its corresponding polynomial $\gamma(x)$.

  

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

Based on how we defined these polynomials, $\gcd(\Lambda(x), \Gamma(x)) = 1$ we can force our $\lambda(x)$ to be the actual error locator polynomial by dividing our the greatest common divider between our two guesses of $\lambda(x)$ and $\gamma(x)$. This means

  

$$\Lambda(x) = \frac{\lambda(x)}{\gcd(\lambda(x), \gamma(x))}$$

  

Finally with $\Lambda(x)$ we can find the locations of each of the possible errors by simply testing the multiplicative inverse of each code locator, and this will give us the roots. With the roots and using the syndrome, and solve and correct any error that occurred. This decoding process has $O(d^3)$ run time which is by no means very fast but with specialized hardware similar to what is in a DVD player this can be done in real-time as it only involves matrix operations.

  

To play around with a python implementation of the generalize Reed-Solomon code with a random error generator for text inputs look [here](https://repl.it/@jorqueraian/ReedSolomon).

  

## Visualizing the Generalized Reed-Solome code

Let's create a linear generalized Reed-Solomon code with parameters $[82, 64, 19]$, meaning with this code we can correct up to a maximum of 9 bytes of errors for each 82-byte segment of the encoded image. To help highlight in what cases Reed-Solomon codes can be so powerful let's encode an image and simulate a scratch on the image. Each pixel of the image will be represented by 3 bytes, one for each color. For simplicity, if pixel data is corrupted we will assume all three bytes were affected. This corresponds to 72 bits of consecutive correctable error.

  

To simulate this cluster-like, or scratch of error we will randomly create a line and compare each pixel location $(x, y)$ with the line to determine a likely hood that the pixel was corrupted. Note that due to the increased size of the encoding the images below do not necessarily correspond to the exact error, but this does represent the number of 3-byte errors and their approximate location in the image.

  

<p align="middle"><img width="450" height="450" src="https://lh3.googleusercontent.com/JPCtdgvtAMqRPTGM0zuZAdvCiHAePwOXciB_JVPSmROw6jSkCWl-7zg3aeCn2Ra_ORqJYSwVk9KMTj2Q8LjwD05fm-wy4rNDIncnx13oRXEHD6kqCoZDLI39mT8k3D4f2-Ks6SP9ZKO9mI6wRaHxG5A0F4OS1HLODYhH5_7Xqf6xcay7GF8rsK_CDiTm2xDmJe23-Mn4BJlgPVAg3hJvyfru68iKtt7W4rsD67pL-6BRCzVe8OnEvX0K8D_0MYZjUiAm8v4Tavv6SJvYHJnORBKRAwiGjoyyT473joOJsopIRCFQZMYvejU7zxjdHbe1J7gH3CvZ9B9dWcconyITvhLDkN8vQxgYukHJlTM9rkaw9h3SchV-de7zYs2QINTGU2Ltg7DBy1TRClmwlf-oa6hJ-RM-s35r57ermVxQ2dck2D-ZBTAW39SbwGfYT7Hnj8FpB45V2STGHyg814a21x5QWXQ0IIQ857wLmBS_j8hbwHWTVpq6qH9xKUd5lV9s1zqCzg8WGjMo-ULDHTGbT9fIe4cuwTJWZ0SfcLiZAAus9uL3i9TizesOxOaNelgg9Xf6brKYpV5vbpmVPsQtzOgWKY2UdLNko8RXZE5Nzl5T1hhH9VxstO8PeWPYIdO3St3Xka2T2RhVgk9oGHie_iaMnvh8RDd5Q-oQwzUBuO_peui9_ry-0ES-KRMAoF1KFVWQISruZc2acjkoilXdG_mhAMs2E_IvcgaFyxo7LmeL5hlFpS-wEkQ=s640-no"/> <img width="450" height="450" src="https://lh3.googleusercontent.com/V4xEn_lZz4EQo1_Fv6UINK87CaOioyLJrZ6U_8S-Jzf_v9KO_DbO4s5m4az9F3YcDtFbd6Y3P9W_9M3zeJc0O5C5Vn7z9FMRQRpFfzEaA0Gs3HvoH13PkoArIc9e1BCdCMSsemjdBimIR0lqvchTnv-jmpJM7Qw3JpZ_btSbxEYQoH2xf1jdG0xCw5YAby7O6aUXL-m_qr7BQLntPjozmH5m734Ko5mvhKIpk0eO-EMEdb2-K9ebw9j8pEbffL1-3glefcAwfWPIoChAq3ledMmw4iC3lm1JavclFvix5sIZsLRuU4NfwsjGowDXtb0FeI_WrjeCJ4-Hiq-5yAypdRlSk6l1ScmDNlx5rZq3d_4k-S0kXsRQLoGp6fTdZRhGMaSlhYxavMFlxozeRW1ZqJpp-f35nnEHoa2cSFpHtc1uA-_SSJpHB8qAn7jm-fw5HM3M1AWkbVmm-M9MVUYQ1BOxDVFFfPUASmxzy0-Nz9Ovc8udqGBut43jmQYVTXIcfcabcHIzvpRrzQfUXGNrS4B-7Fy4xyzAc7g9-JedeaIurt1xeMVX8_oZNxSeUnxJsNONsFGKqNkkITTh76E-m_DQ14-u0Tjf_5JJPGVG3JkczVgZWNNeY46bvrcvcVXWmxuI3ORvsUeEzAKvDSVfFHjTpXIwjZ1D3Aor1gZaNe9PZziK5k2fNm2lzGo_ZdYna2l1XTcHzpCRaua1kXzdWJ3deRhU2X9GzDdkn6W5HaQM4Tnpk0I8taQ=s640-no"/></p>

<p align="center"> The Original Image and the scratched image. </p>

After we have scratched the image we can decode it. As we see, most of the scratch was accurately decoded. There are only 2 visible instances of error left.

<p align="center"> <img width="450" height="450" src="https://lh3.googleusercontent.com/7HfAlqgNozeFmaoUKCincy9m2jpl_hiEjhWgcGp1tZ39hDDlQpawpuycuj-LT-yIyCVWa-KdHExtdyYoeHfB3z1MrRDci8u31XCkx-uGEeca_mIEZmJKxp9HYOhg51FFxLl0qXK8KExhhzFdwqzLfo_UX6-3n8IWehCZUHMaWTeh74bX2ci6HGhOB1TaNoDd2I5-sPx57HOiTOhgbGao-LKYefq6pirLTbe-bpgi00ivmQHDZHPwTtvODsYE6m93NqApQoL-kWsQGLkf4f6Jw6-iBjvqujZsWpCxjqOqELd77ucGUlOQWYZB5ZAidtWu4Lz1MarzAGx2cIRnUbIBNW7B1nwsBnqLqtawCRBx9Lcbt_upqknTyNiI9lKfl2G3kciWCglUED-gHAnH03VG1L5g4YOvO4SNg1N4ZesXHPjVr9xzJ_Qdh0mM_XUN0blEhEaWtLzrWhZYdN2ybqKHoa3BhuFAm_UzleMtPhpcX2cLLWRQEFXA0ED7ZeQGTF4P5vQmm72GITEvSrG5uohRPfebRJZCPiqWwxKTyrcW-jM-ZCY2JrlGROZPo2qlgsqYOctxdE4lp2eYSA8mRc3uyLx4GZJwiN8UhUVTdRN-gNHJTyVqwt1ab25p9SEVgusqi4hmuyfX4_qLacoidiJnSeWyR1e7OFFr_kOnaHjVRrzKglaKem_VOqR1crtlcSUS8UFNyOOX2l_V4_-5Fr4XogonQp6p8j3dgjMdR3xE1MmyUDUaOthOcmk=s640-no"> </p>

<p align="center"> The decoded image </p>

  

Additionally, the error is sparse meaning the pixel values of these areas could be approximated from the average of the surroundings to give an even better-corrected image. This is exactly what happens to errors too large to correct on DVDs.

## Sources

## Further reading