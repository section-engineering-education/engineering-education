---
layout: engineering-education
status: publish
published: true
url: /probability-distributions/
title: Understanding Probability Distributions and their Simulations in R
description: In this article, we will discuss the basics of probability distributions and how to use them to simulate data using R.
author: bejamin-naibei
date: 2022-06-23T00:00:00-02:00
topics: [Machine Learning]
excerpt_separator: <!--more-->
images:

 - url: /engineering-education/probability-distributions/hero.jpg
   alt: Probability Distributions and their Simulations in R Hero Image
---
R has functions for obtaining density, distribution, quantile, and a random value.
<!--more-->
When working with probability distributions, one should know four major concepts:

1. The density pdf of a particular value.
2. The distribution CDF.
3. The quantile value corresponding to a particular probability.
4. A random draw of values from a particular distribution.

Fortunately, R has functions for obtaining density, distribution, quantile, and a random value.

The general R naming is given as:
- dname: This calculates the density at input X.
- pname: This calculates the cumulative probability density (CDF) at input X.
- qname: This calculates quantile at an input X.
- rname: This generates a random draw from a particular distribution.

Where the *name* in all the four cases above represents the name of the given distribution.

Random value generation is a regular activity in machine learning. For example, to estimate the posterior distribution parameters in Bayesian statistics, we need to generate a random sample from an appropriate distribution, which can sometimes be difficult or impossible to achieve. 

To draw samples in such cases, we use *Monte Carlo simulation* methods. For the learner to advance to such a level, first, they must know how we generate random variables from a certain distribution.

This article will cover the *continuous* and *discrete* probability distributions and how we simulate them and draw samples from the simulated distributions in R. 

### Table of contents
- [Understanding probability distributions and their simulations in R](#understanding-probability-distributions-and-their-simulations-in-r)
- [Introduction](#introduction)
- [Prerequisites:](#prerequisites)
- [Continuous probability distribution](#continuous-probability-distribution)
- [1. Uniform distribution](#1-uniform-distribution)
- [2. Normal distribution](#2-normal-distribution)
- [3. Chi-Square distribution](#3-chi-square-distribution)
- [4. Student t distribution](#4-student-t-distribution)
- [5. Exponential distribution](#5-exponential-distribution)
- [Discrete Distributions](#discrete-distributions)
- [1. Binomial distribution](#1-binomial-distribution)
- [2. Poisson distribution](#2-poisson-distribution)
- [Conclusion](#conclusion)

### Prerequisites:
To follow along, the reader needs to have:
- [R](https://cran.r-project.org/) installed on their computer.
- Prior knowledge of probability distributions.

This article will not cover the theory behind the probability distribution. We will instead focus on how to simulate and work with various probability distributions in R.
  
### Continuous probability distribution
A continuous probability density is a probability distribution where the random variable X can take on any value within an interval. 

There are various types of continuous probability distributions. Let's look at each of them below:

### 1. Uniform distribution
Uniform distribution is a probability distribution where each possible outcome has an equal chance of occurring. The probability density function of this distribution is of the form:

![formula](/engineering-education/probability-distributions/uniform.png)

To generate random samples from this distribution, we use the `runif()` method in R. This method takes three parameters, *n, a, b*, where `n` is the number of samples we want to generate, and `a` and `b` is the lower and upper bound of the distribution respectively.

For example, let's generate samples of 100, 1000, 10000, and 100000 from uniform distribution and plot the output on a histogram. Below is the code that performs this task:

```r
# generating uniformly distributed random variables
U1 = runif(100, 0, 1)
U2 = runif(1000, 0, 1)
U3 = runif(10000, 0, 1)
U4 = runif(100000, 0, 1)
par(mfrow=c(2,2)) # plotting 2x2 matrix
hist(U1, main="Sample size 100")
hist(U2, main="Sample size 1000")
hist(U3, main="Sample size 10000")
hist(U4, main="Sample size 100000")
```

This code returns:

![Plots](/engineering-education/probability-distributions/plot.png)

### 2. Normal distribution
This is a probability distribution in which values are symmetrically distributed around the mean. The normal distribution has a pdf of the form:

![formula](/engineering-education/probability-distributions/normal.png)

We use the `rnorm()` method to generate random variables from this distribution. This method takes three parameters: *n* for the number of the random variables we want to generate, the *mean value*, and the *standard deviation*.

Let's generate a sample of random variables and visualize the results with a density histogram.

```r
# generation normally distributed random variables
a <- rnorm(100, 0, 1)
b <- rnorm(1000, 0,1)
c <- rnorm(10000, 0,1)
d <-rnorm(100000, 0,1)
# plot histogram for the random samples and add density curve
par(mfrow=c(2,2)) #plot  2 x 2 matrix
hist(a, probability=T, main="Sample size 100")
lines(density(a))
hist(b, probability=T,main="Sample size 1000")
lines(density(b))
hist(c,probability=T, main="Sample size 10000")
lines(density(c))
hist(d,probability=T, main="Sample size 100000")
lines(density(d))

```
Output:

![plot](/engineering-education/probability-distributions/plot2.png)

As we see from the above plot, the random sample generated follows a normal distribution.

The application for the normal distribution is widespread in elementary statistics. Let's look at some of its applications and understand how we handle them in R.

**Example 1:**

Assume that the test score of a college exam fits a normal distribution. Also, the mean test score is 72, and the standard deviation is 15.2. Determine the percentage of students scoring 84 or more in the exam?

[Source: r-tutor](http://www.r-tutor.com/elementary-statistics/probability-distributions/normal-distribution)

*Solution*
If we solve this by hand, then:

The probability that X is at least 84 can be expressed as $$P(X \ge84)$$

We then standardize this probability distribution as follows:

![image](/engineering-education/probability-distributions/standardised-pdf.png)

The solution value for this can be read from the standard normal table.

To solve this problem in R, we first need to know where on the normal pdf we want to compute the area from. 

We are interested in the area below the curve from $Z = 0.789$. The following code helps to solve this problem:

```r
pnorm(84, mean = 72, sd = 15.2, lower.tail =  FALSE)
```

Output:

```bash
0.2149176
```
This output means *21.51%* chances for students scoring *84* or more in the exam.

Let's look at a different scenario of application of the normal distribution.

**Example 2:**

Suppose that $IQ$s are normally distributed with a mean of 100 and a standard deviation of 15.

i. What percentage of people have an IQ less than 125?
ii. What percentage of people have an $IQ$ between 110 and 125?

**Solution**
(i) $P(X < 125)$

When we standardize this, we get:

$$P(Z < \frac{125 - 100}{15})$$

We can still read this value from the standard normal table.

In R, we run the following code and get our problem solved:

```r
pnorm(125, 100, 15, lower.tail = TRUE)
```

Output:

```bash
 0.9522096
```

This means that 95.22 % of the people have an IQ of less than 125.

To solve for *(ii)*, first, let's try to arrange our problem so that we can easily mimic the logic.

Since we are interested in the area between 110 and 125 below the pdf curve, we can express this as:

$$P(\frac{110-100}{15}< Z < \frac{125 - 100}{15}).$$

In R, we first compute the probability *X* is less than or equal to 125. We then determine if the probability of X is less or equal to 110. This is illustrated in the code below:

```r
pnorm(125,100, 15, lower.tail = TRUE)- pnorm(110, 100, 15, lower.tail=TRUE)
```

This returns:

```bash
0.2047022
```

The interpretation of this output is that 20.47% of the people have an IQ of between 110 and 125.

Now, let's look at another type of continuous distribution.

### 3. Chi-Square distribution
A Chi-Square distribution is a probability distribution used to describe the distribution of the sum of squared random variables. 

It has a *v* degree of freedom and is denoted as $\,\large\chi^2_{(v)}$. Furthermore, it takes a pdf of the form:

![image](/engineering-education/probability-distributions/chi-square.png)

To calculate the [p-value](https://www.investopedia.com/terms/p/p-value.asp) of a Chi-Square, we use the `pchisq()` method. This method takes two parameters, the number of samples and the degree of freedom. 

Let's consider the following code:

```r
# determine p-value
pchisq(23.9,6,lower.tail=FALSE)
```

Output:

```bash
0.0005448444
```

### 4. Student t distribution
The pdf of the Student t distribution is of the form:

![Formula](/engineering-education/probability-distributions/t-students.png)

To obtain the tabulated t-values, one can use the command:

```r
qt(p, df)
```
Where `p` is the probability and `df` is the degree of freedom.

The next distribution to consider is the Exponential distribution.

### 5. Exponential distribution
The exponential distribution has a pdf of the form:

$$\large f(x)=\lambda e^{-\lambda x};  \  x> 0$$

To generate values from this distribution, we use the `rexp()` function in R. This method takes two arguments, *n* for the number of samples we want to generate and $\frac{1}{\lambda}$, the rate of the exponential distribution. 

For instance, suppose we want to generate at most five random variables from an exponential distribution is given $\lambda$ equals 3. The following code to carry out this task:

```r
set.seed(1) # for result reproducibility
rexp(5, rate = 1/3)
```

Output:

```bash
2.2655455 3.5449283 0.4371202 0.4193858 1.3082059
```

Now that we know how to generate random variables from the exponential distribution, let's look at how to solve its probability problems in R.

**Example 3:**

Suppose the average checkout time of a cashier in supermarket cashier is 3 minutes. Determine the probability of a cashier completing a customer checkout in less than 2 minutes.

By hand, we would have solved this problem as follows:

![Formula](/engineering-education/probability-distributions/exponential.png)

Instead, in R, we only need to execute the following command.

```r
pexp(2, rate = 1/3)
```

Output:

```r
0.4865829
```

These are the most popular continuous probability functions in R. We will look at the discrete distributions in the next section.

### Discrete distributions
Unlike continuous distribution, where the random variable can take any values within an interval, in discrete distribution, a random variable can only take a particular value, i.e., an integer. 

In this section, we will consider:

### 1. Binomial distribution
The binomial distribution is used in modelling the events that take binary values, that's, *True* and *False*. The binomial probability *mass function(pmf)* is of the form:

$f(x)={_n}C_x \ p^x(1-p)^{n-x}; x=0,1,2, \ . \ . \ . $

The general command for generating random numbers from this distribution is:

*rbinom(n, size, prob)* where,

*n* -  is the number of observations that we need to generate.
*size* - number of trials.
*prob* - the probability of success in each trial.

**Application of Binomial distribution**
Suppose that there are 12 multiple questions in an English question paper, and each question has five possible answers, and only one answer is correct.

Find:

i. The probability of having four or fewer correct answers.
ii. The probability of having exactly four correct answers.

**Solution**
(i) $p=1/5 = 0.2$

$p(X \le 4)= p(x=0)\ or \ p(x=1)\ or \ p(x=2)\ or \ p(x=3)\ or \ p(x=4)$

To solve this problem, in R, we run the following command:

```r
pbinom(4, 12, 0.2)
```

Output:

```bash
0.9274445
```

ii. $p(X = 4)$

```r
dbinom(4,12,0.2)
```

Output:

```bash
 0.1328756
```

### 2. Poisson distribution
The *pmf* of a poisson is given by:

![formula](/engineering-education/probability-distributions/poisson.png)

To generate random variables from this distribution, we use the command:
rpois(n, lambda)

**Application of Poisson distribution**

If 12 cars are crossing a bridge per minute on average, find the following:

1. Probability of having at least 17 cars crossing the bridge at a particular time.
2. There is a probability of having 16 or fewer cars crossing the bridge at a particular time.

**Solution:**

1. ${\Large p}( X \ge 17)$

In R, we run the command:

```r
# 17 is inclusive
ppois(16,12, lower = FALSE)
```

This returns:

```bash
[1] 0.101291
```

2. ${\Large p}( X\le 16)$
  
```r
ppois(16,12)
```

This returns:

```bash
[1] 0.898709
```

These are the main discrete distribution that is widely used in the application.

### Conclusion
We have learned how we work probability distributions in R. We considered both the continuous and the discrete cases. 

We generated random variables in both cases and solved some real-world problems using the R software.

---
Peer Review Contributions by: [Wanja Mike](/engineering-education/authors/michael-barasa/)


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
