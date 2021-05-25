---
layout: engineering-education
status: publish
published: true
url: /fuzzy-logic-operations/
title: Introduction to Fuzzy Operations
description: This article will be an introduction into fuzzy logic operations, we will introduce fuzzy sets and their applications.
author: lalithnarayan-c
date: 2021-01-26T00:00:00-09:30
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/fuzzy-logic-operations/hero.jpg
    alt: Fuzzy Operations example image
---
[Fuzzy logic](https://en.wikipedia.org/wiki/Fuzzy_logic) is a form of many-valued logic in which the true value of variables may be any real number between 0 and 1, both being inclusive. Fuzzy Systems as a subject was developed to model the uncertainty and vagueness present in the human thought process. 
<!--more-->

### Prerequisites
This article on [fuzzy logic](/an-overview-of-fuzzy-logic-system/) is an excellent introduction to the basics of crisp and fuzzy sets. Moreover, it introduces the representation of fuzzy sets and their applications. 

### Table of contents
- Degree of membership function.
- Types of membership functions.
- Operations in fuzzy systems.
- Types of operations.

### Degree of membership function
A fuzzy set is denoted as a tuple that includes the element and a value indicating its degree of membership to the universal set. 

Mathematically, it is represented as:

$$ F= (S,\;\mu(S))\; ;\;S\, \epsilon\, x\; \&\; \mu(S)\:=\:Degree\, of\, S $$
 
The equation above can be viewed as a collection of ordered pairs. The inclusion of the element $S \epsilon\; x$ into the fuzzy set $F$ is fuzzy.

#### Example
Consider the example of temperature control. We will explore the various membership functions using this example. The task to control the room temperature can be modeled as a fuzzy problem. 

Let the ranges of temperature be given as follows:

<br>
$$
70 \le Temperature \le 80 \;: Low \\
80 \le Temperature \le 90 \;: Medium \\
90 \le Temperature \le 100 \;: High\\
$$
<br>

Graphically the problem can be represented as follows:

![graphical representation](/engineering-education/fuzzy-logic-operations/graphical_rep_1.png)

The same problem can be represented using fuzzy logic. Observe how a given temperature belongs to two classes of temperature in varying degrees. 

![graphical representation](/engineering-education/fuzzy-logic-operations/graphical_rep_2.png)

### Types of membership functions
As seen in the earlier example, we used a triangular membership function to represent the temperatures. However, the triangular membership function is not suited for all applications. Therefore, many other membership functions were introduced to widen the scope of applications.

#### Gamma ( $\gamma$ ) function
Mathematically, the gamma function is given as follows:

$$ \gamma(x,\alpha, \beta) = \begin{cases} 0 & x\le \alpha \\
\frac{x-\alpha}{\beta -\alpha} & \alpha\le\beta \\ 1 & x \ge \beta\end{cases}  $$

![gamma](/engineering-education/fuzzy-logic-operations/gamma-correct.png)

#### s-function
The s function gets its name from its shape. The s-shaped function is useful in cases with a gradual change in the membership. 

Mathematically, it is given as:

<br>
$$ S(x,\alpha,\beta) = \begin{cases}
0 & x\le \alpha \\
2*(\frac{(x -\alpha)}{\gamma - \alpha})^2 &\alpha \lt x \le \beta \\
1 - 2*(\frac{(x -\alpha)}{\gamma - \alpha})^2 & \beta \lt x \le \gamma \\
1 & x \gt \gamma
\end{cases} $$
<br>

![s-function](/engineering-education/fuzzy-logic-operations/gamma.png)

#### L-function
This function is the inverse of $\gamma$ function. 

It is given as follows:

$$ L(x,\alpha,\beta) = \begin{cases} 
1 & x \le \alpha \\
\frac{\alpha - x}{\beta - x} & \alpha \le x \le \beta \\ 
0 & x \gt \beta 
\end{cases} $$
 
![L-function](/engineering-education/fuzzy-logic-operations/L-function.png)

#### Triangular function

<br>
$$ L(x,\alpha,\beta,\gamma) = \begin{cases} 
0 & x\le \alpha \\
\frac{x-\alpha}{\beta - \alpha} & \alpha \le x \le \beta \ \\
\frac{\alpha - x}{\beta - \alpha} & \beta \le x \le \gamma \\
0 & x \gt \gamma
\end{cases}$$
<br>

![triangular function](/engineering-education/fuzzy-logic-operations/triangular_function.png)

#### pi function
This function gets its name from the shape of pi. This function looks similar to the symbol pi ($\pi$). 

Mathematically it is given as follows:

<br>
$$ \pi(x, \alpha, \beta,\gamma, \delta) = \begin{cases} 
0 & x\le \alpha \\
\frac{x - \alpha }{\beta - \alpha} & \alpha \lt x \le \beta \ \\
1 & \beta \lt x \le \gamma \\
\frac{\gamma - x }{\delta - \gamma} & \gamma \lt x \le \delta \
\end{cases}$$
<br>

![pi-function](/engineering-education/fuzzy-logic-operations/pi_function.png)

#### Gaussian function
Derived from the normal distribution, this function works in most scenarios, where information about the data is unknown. In cases dealing with sampled data, this function is used extensively.

Mathematically, it is given as follows:

<br>
$$ 
G(x,\mu,\sigma) = exp (-\frac{(x-\mu)^2}{2\sigma^2})
$$
<br>

![gaussian membership function](/engineering-education/fuzzy-logic-operations/gaussian.png)

[*Image source*](https://www.researchgate.net/figure/Gaussian-membership-function-Gxs-c_fig6_233968578)

### Operations in fuzzy logic
Various operations can be performed on a crisp set. The same set of operations can be performed on fuzzy sets, with minor modifications. The operations allow changes to be made to the sets. These operations come in handy while building the applications. 

### Types of operations in fuzzy logic

#### Union 
Union operation concatenates the two sets and produces a new set. Since the fuzzy sets may have the same element with varying degrees of membership, the union operation considers the element once. The degree of membership for this value is the maximum value the element has. Therefore, this can be viewed as finding the elements with a maximum degree of membership.

#### Intersection
The intersection operation finds the common elements between the two sets. In this case, if an element exists in both sets, the element with the least degree of membership is retained in the new set. The intuition behind the intersection operation is to find the common elements between the two sets. 

Therefore, the element with the lowest degree of membership exists in both sets. This operation can also be viewed as finding the elements in both sets with the minimum degree of membership.

#### Complementation
The degree of membership for a fuzzy set can range between 0 & 1. Given a set of elements with a degree of memberships, the fuzzy set's complement will behave inverted to the degrees of membership. 

The inverted degree of membership for element x is defined as follows:

<br>
$$new\; degree\; of\; membership(x)\; = 1\; -\; degree\; of\; membership(x)$$
<br>

### Conclusion
In this article, we discussed the various membership functions that can be used to represent fuzzy sets. Moreover, we looked at the various operations that are used frequently on fuzzy sets. 

Happy learning.

---
Peer Review Contributions by: [Saiharsha Balasubramaniam](/engineering-education/authors/saiharsha-balasubramaniam/)


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