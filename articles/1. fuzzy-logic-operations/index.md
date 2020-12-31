Fuzzy logic is an approach to solving problems that take into consideration the degrees of truth. Fuzzy Systems as a subject developed to model the uncertainty and vagueness present in the human thought process. 

In this article, we will understand the following concepts.

### Prerequisites

This article on fuzzy logic is an excellent introduction to the basics of crisp and fuzzy sets. Moreover, it introduces the representation of fuzzy sets and their applications. 

### Table of contents

- Degree of membership function
- Types of membership functions
- Operations in fuzzy systems
- Types of operations

### Degree of membership function

A fuzzy set is denoted as a tuple that includes the element and a value indicating its degree of membership to the universal set. Mathematically, it is represented as:

$$ F= (S,\;\mu(S))\; ;\;S\, \epsilon\, x\; \&\; \mu(S)\:=\:Degree\, of\, S $$
 
The above equation can be viewed as a collection of ordered pairs. The inclusion of the element $S \epsilon\; x$ into the fuzzy set $F$ is fuzzy.

#### Example

Consider the example of temperature control. We will explore the various membership functions using this example. The task to control the room temperature can be modeled as a fuzzy problem. Let the ranges of temperature be given as follows:

$$
70 \le Temperature \le 80 \;: Low \\
80 \le Temperature \le 90 \;: Medium \\
90 \le Temperature \le 100 \;: High\\
$$

Graphically the problem can be represented as the following:

![graphical representation](graphical_rep_1.png)

The same problem can be represented using fuzzy. Observe how a given temperature belongs to two classes of temperature in varying degrees. 

![graphical representation](graphical_rep_2.png)

### Types of membership functions

As seen in the earlier example, we used a triangular membership function to represent the temperatures. However, the triangular membership function is not suited for all applications. Therefore, many other membership functions were introduced to widen the scope of applications.

#### Gamma ( $\gamma$ ) function

Mathematically, the gamma function is given as follows:

$$ \gamma(x,\alpha, \beta) = \begin{cases} 0 & x\le \alpha \\
\frac{x-\alpha}{\beta -\alpha} & \alpha\le\beta \\ 1 & x \ge \beta\end{cases}  $$

![gamma](gamma-correct.png)
#### s- function

The s function gets its name from its shape. The s-shaped function is useful in cases with a gradual change in the membership. 

Mathematially, it is given as:

$$ S(x,\alpha,\beta) = \begin{cases}
0 & x\le \alpha \\
2*(\frac{(x -\alpha)}{\gamma - \alpha})^2 &\alpha \lt x \le \beta \\
1 - 2*(\frac{(x -\alpha)}{\gamma - \alpha})^2 & \beta \lt x \le \gamma \\
1 & x \gt \gamma
\end{cases} $$

![s-function](gamma.png)

#### L- function
This function is the inverse of $\gamma$ function. It is given as follows:

$$ L(x,\alpha,\beta) = \begin{cases} 
1 & x \le \alpha \\
\frac{\alpha - x}{\beta - x} & \alpha \le x \le \beta \\ 
0 & x \gt \beta 
\end{cases} $$
 
![L-function](L-function.png)
#### Triangular function

$$ L(x,\alpha,\beta,\gamma) = \begin{cases} 
0 & x\le \alpha \\
\frac{x-\alpha}{\beta - \alpha} & \alpha \le x \le \beta \ \\
\frac{\alpha - x}{\beta - \alpha} & \beta \le x \le \gamma \\
0 & x \gt \gamma
\end{cases}$$

![triangular function](triangular_function.png)

#### pi function

This function gets its name from the shape of pi. This function looks similar to the symbol pi ($\pi$). Mathematically it is given as follows:

$$ \pi(x, \alpha, \beta,\gamma, \delta) = \begin{cases} 
0 & x\le \alpha \\
\frac{x - \alpha }{\beta - \alpha} & \alpha \lt x \le \beta \ \\
1 & \beta \lt x \le \gamma \\
\frac{\gamma - x }{\delta - \gamma} & \gamma \lt x \le \delta \
\end{cases}$$

![pi-function](pi_function.png)

#### Gaussian function

Derived from the normal distribution, this function works in most scenarios, where information about the data is unknown. In cases dealing with sampled data, this function is used extensively.

Mathematically, it is given as follows:

$$ 
G(x,\mu,\sigma) = exp (-\frac{(x-\mu)^2}{2\sigma^2})
$$

### Operations in fuzzy logic

Various operations can be performed on a crisp set. The same set of operations can be performed on fuzzy sets, with minor modifications. The operations allow changes to be made to the sets. These operations come in handy while building the applications. 

### Types of operations in fuzzy logic

#### Union 

Union operation concatenates the two sets and produces a new set. Since the fuzzy sets may have the same element with varying degrees of membership, the union operation considers the element once. The degree of membership for this value is the maximum value the element has. Hence, this can be viewed as finding the elements with a maximum degree of membership.

#### Intersection

Intersection operation finds the common elements between the two sets. In this case, if an element exists in both sets, the element with the least degree of membership is retained in the new set. The intuition behind the intersection operation is to find the common elements between the two sets. Therefore, the element with the lowest degree of membership exists in both the sets. This operation is also viewed as finding the elements in both sets with the minimum degree of membership.

#### Complementation

The degree of membership for a fuzzy set can range between 0 & 1. Given a set of elements with a degree of memberships, the fuzzy set's complement will behave inverted degrees of membership. The inverted degree of membership for an element x is defined as follows:

$$new\; degree\; of\; membership(x)\; = 1\; -\; degree\; of\; membership(x)$$

### Conclusion

In this article, we discussed the various membership functions that can be used to represent fuzzy sets. Moreover, we looked at the various operations that are used frequently on fuzzy sets. 

