---
layout: engineering-education
status: publish
published: true
url: /making-predictions-using-monte-carlo-simulation/
title: Making Predictions Using Monte Carlo Simulation
description: This tutorial discusses the monte carlo simulation process. The reader will understand the steps used in this process in order to get accurate results. 
author: victor-kamau
date: 2021-10-16T00:00:00-06:30
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/making-predictions-using-monte-carlo-simulation/hero.jpg
    alt:  Making Predictions Using Monte Carlo Simulation Hero Image

---
With the growing technology especially in the field of AI (Artificial Intelligence), the knowledge of different methods of training a model is essential to programmers. These techniques help in automation of decision making process and help predict the probability of different outcomes when random variables are intercepted. This article will simplify monte carlo method operations and help programmers to clearly understand what this technique entail.

### Table of Contents

- [What is Monte Carlo Simulation?](#what-is-monte-carlo-simulation)

- [Unique attributes from other techniques](#unique-attributes-from-other-techniques)

- [Understanding Monte Carlo basics](#understanding-monte-carlo-basics)

- [Implementation of basic steps using Examples](#implementation-of-basic-steps-using-examples)

- [Real Time Application](#real-time-application)

- [The Accuracy of Monte Carlo](#the-accuracy-of-monte-carlo)

- [Why Monte Carlo?](#why-monte-carlo-?)

- [Why financial advisors say NO to this technique](#why-most-people-say-no-to-this-technique)

- [Conclusion](#conclusion)

### What is Monte Carlo Simulation?
It is simply a model that is used to outline the probability of various outcomes of decisions made. The simulations help to describe and assess the expected risk impact to eliminate uncertainity for better decisions.

This is an approach technique rather than an exact technique. **Pseudo-random number generators** are used when implementing using computers. It is frequently utilized in variety of industries, including engineering, finance, business, project planning, and many more.

### Unique attributes from other techniques
1. **Simple, flexible and Scalable algorithms**
  They reduce a complex model to a collection of basic events and interactions when used. On a computer, opening the probability to encode model behavior through rules may be done quickly.

2. It must **generate random samples** as a result of its output.

3. The distribution of its inputs must be identified.

4. Its **predictions** must be known when an experiment on data input is carried out.

### Understanding Monte Carlo Basics
#### Basic steps to be followed in the Monte Carlo process

For a Monte Carlo model, there are four main steps to follow, in order to come up with the desired results. They are discussed below:

1. **Define inputs probability**

Outline the domain of probable inputs. The emulated *reality* should resemble the reality whose behavior we want to study and describe.

2. **Generate random inputs**

Produce random inputs from a probability distribution. The features of the inputs should be similar to those of the real cosmos we're aiming to replicate. This means that, dependencies between the inputs should be represented.

3. **Computate the inputs**

The computation should be deterministic. By deterministic, we mean that they should be able to give the same output each time they are computed.

4. **Combine the results**

Assemble the information to create the desired outcome. Typical outputs include:

*Histogram*

Statistics in a nutshell (mean, variance, and standard deviation)

### Implementation of basic steps using Examples

These examples show how you can implement monte carlo basic steps to come up with a predictive model.

Now, let's have a look at several examples using Python. For beginners, you can use any text editor with Python extensions. You can check this article [here](https://re.sajari.com/token/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwdXJwb3NlIjoiY2xpY2siLCJkZXN0aW5hdGlvbiI6Imh0dHBzOi8vd3d3LnNlY3Rpb24uaW8vZW5naW5lZXJpbmctZWR1Y2F0aW9uL2EtYmVnaW5uZXJzLWd1aWRlLXRvLXB5dGhvbi8iLCJ2YWxzIjp7ImNvbGxlY3Rpb24iOlsic2VjdGlvbi1pbyJdLCJjb21wYW55IjpbIjE1NjgyMzQxMTYwNzg2MTQ4NjgiXSwiZmllbGQiOlsidXJsIl0sInByb2plY3QiOlsiMTU2ODIzNDExNjA3ODYxNDg2OCJdLCJxLmlkIjpbInQybGt6eHU0ZmV1ZGJmaXAiXSwicS5zbCI6WyI3Il0sInEudWlkIjpbInQybGt6eHU0ZmV1ZGJmaXAwIl0sInZhbHVlIjpbImh0dHBzOi8vd3d3LnNlY3Rpb24uaW8vZW5naW5lZXJpbmctZWR1Y2F0aW9uL2EtYmVnaW5uZXJzLWd1aWRlLXRvLXB5dGhvbi8iXX19.xc7CDwfGaO-RpZ6vlYGjoQLwxYJ2Fi_9oeA_f0owC0c) for more details on installations and some Python basic functions.

#### Example 1: Approximate the value of pi

Consider a best-fitting circle that can be slotted into a square with a range of ℝ2 over *[−1, 1]²*.

- the circle radius = 1 and area = π.

- the square has an area of *2² = 4*.

- the ratio between their areas is thus *𝜋/4*.

**Solution**

The following Monte Carlo approach can be used to approximate the value of π:

1. Draw the square over *[−1, 1]²*.

2. Draw the circle with the longest radius inside the square.

3. Scatter a large number P of grains over the square.

4. Count the grains that fell in the circle.

5. The grains counted divided by P and multiplied by 4 is an approximation.

Using the four main steps, the `pi` can be estimated as follows:

In this example, we have implemented the use of **Numpy library** in Python. If you are not familiar with Python libraries, you can refer to this [article](https://re.sajari.com/token/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwdXJwb3NlIjoiY2xpY2siLCJkZXN0aW5hdGlvbiI6Imh0dHBzOi8vd3d3LnNlY3Rpb24uaW8vZW5naW5lZXJpbmctZWR1Y2F0aW9uL2ludHJvZHVjdGlvbi10by1udW1weS8iLCJ2YWxzIjp7ImNvbGxlY3Rpb24iOlsic2VjdGlvbi1pbyJdLCJjb21wYW55IjpbIjE1NjgyMzQxMTYwNzg2MTQ4NjgiXSwiZmllbGQiOlsidXJsIl0sInByb2plY3QiOlsiMTU2ODIzNDExNjA3ODYxNDg2OCJdLCJxLmlkIjpbInZ0MHNzMGNnMHpiaTBjeG4iXSwicS5zbCI6WyIxIl0sInEudWlkIjpbInZ0MHNzMGNnMHpiaTBjeG4wIl0sInZhbHVlIjpbImh0dHBzOi8vd3d3LnNlY3Rpb24uaW8vZW5naW5lZXJpbmctZWR1Y2F0aW9uL2ludHJvZHVjdGlvbi10by1udW1weS8iXX19.1ya9PWvNq5r63W06KrKimy2-_BlOEOncpfNvLxpd648) for more understanding.

##### **Define possible inputs**

Here we take all the points uniformly distributed within the *[−1, 1]²* unit square

##### **Generate random inputs**

Use the unit square to generate one point (x, y). This code generates a point (x,y).

```python
x = numpy.random.uniform(-1, 1)
y = numpy.random.uniform(-1, 1)
```

##### **Computate the inputs**

Test whether a randomly generated point (x, y) is within points of the circle. To do that, write the following code:

```python
if numpy.sqrt(x**2 + y**2) < 1:
print("The point is inside")
```

##### **Pile/aggregate the outputs/results**

Count the number of points that are within the circle's perimeter:

```python
N = 10_000
inside = 0
for i in range(N):
x = numpy.random.uniform(-1, 1)
y = numpy.random.uniform(-1, 1)
if numpy.sqrt(x**2 + y**2) < 1:
inside += 1
p = inside / float(N)
print("Proportion inside: {}".format(p))
```

The whole code should appear as the one below to give the estimated value of pi as 3.142…:

``` python
import numpy

N = 10_000
inside = 0
for i in range(N):
x = numpy.random.uniform(-1, 1)
y = numpy.random.uniform(-1, 1)
if numpy.sqrt(x**2 + y**2) < 1:
inside += 1
print(4*inside/float(N))
3.14
```

You can run the code on your computer to practice.

### Real time Applications

1. **Application in Uncertainty Analysis**

A good example of uncertainty propagation would be that of calculating the **BMI** (*Body Mass Index*).
BMI is the ratio body mass/body height.

Let's take a look at how this would work:

*Question*

Calculate your Body Mass Index(BMI) and the uncertainty interval that goes with it, assuming: you weigh 84 kg, according to your scale. Your height ranges between 181 and 182 cm tall:

``` python
import numpy
from numpy.random import *
import matplotlib.pyplot as plt

N = 10_000
def BMI():
m = uniform(83.5, 84.5)
h = triangular(1.81, 1.815, 1.82)
return m / h**2
sim = numpy.zeros(N)
for i in range(N):
sim[i] = BMI()
plt.hist(sim)
```

### The Accuracy of Monte Carlo
Mathematical theory states that the accuracy of a Monte Carlo estimation technique should increase proportionally to the square root of the number of trials made.

### Why Monte Carlo?
When you repeat an experiment several times, the law of big numbers comes into play.

The average of the findings should be close to the expected value after numerous trials. Therefore, **increasing the number of trials will increase accuracy level** as stated earlier.

This indicates that we may learn properties of a random variable (mean, variance, standard deviation, and so on) simply by simulating it over a large number of trials using Monte Carlo simulation.

### Why people say NO to Monte Carlo

Despite the accuracy level that can be produced by the Monte Carlo method, people still say no to this method especially in the financial section. They opt for other techniques like the **forecast method**.

Here are some reasons why one would prefer other method over Monte Carlo:

1. **Unreliability** is the biggest issue with this method.

2. In the growing technology world, a financial plan in a business no longer depend much on the past experiences or patterns.

3. The real world rather depend on the future patterns than the past occurences.

Due to these reasons, financial advisors still stand against this technique that has grown popular in the stock market. Businesses have been affected in situations where the projected losses hits deeper than the predictions.

### Conclusion

Monte Carlo simulation technique has been widely used for predictions in different areas. Risk analysis being a major use, it has been greatly adopted. We probably cannot judge it's efficiency or accuracy which largely depends on the past patterns/data.

I hope you find this article helpful.

Happy coding!

---

Peer Review Contributions by: [Monica Masae](/engineering-education/authors/monica-masae/)
