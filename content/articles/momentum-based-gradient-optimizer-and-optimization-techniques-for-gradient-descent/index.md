---
layout: engineering-education
status: publish
published: true
url: /momentum-based-gradient-optimizer-and-optimization-techniques-for-gradient-descent/
title: Gradient Descent Based Optimization Techniques 
description: In this article, we consider Adaptive Optimization Algorithms and compare their convergence abilities from traditional gradient descent algorithms 
author: bonface-ndolo
date: 2021-11-19T00:00:00-18:00
topics: [Languages]
excerpt_separator: <!--more-->
images:

 - url: /engineering-education/momentum-based-gradient-optimizer-and-optimization-techniques-for-gradient-descent/hero.jpg
   alt: Gradient Descent Based Optimization Techniques example image
---

Alternative models can be built using Gradient Descent in machine learning systems. An objective function specifies the level of inaccuracy that a Machine Learning model will have on a given dataset during the training phase.

A random set of values will be used throughout training to maintain fairness. As a result, we get closer to the ideal function value with each repetition.

The quick convergence of Adaptive Optimization Algorithms, on the other hand, is causing them to gain popularity. For better convergence resilience, these methods diverge from the traditional Gradient Descent algorithm.

### Table of contents

- [Optimization techniques](#optimization-techniques)
- [Momentum-based Optimization](#momentum-based-optimization)
- [Stochastic Gradient Descent](#stochastic-gradient-descent)
- [Adaptive Moment Estimation](#adaptive-moment-estimation)
- [RMSProp](#rmsprop)
- [AdaGrad](#adagrad)
- [AdaDelta](#adadelta)
- [Mini Batch Stochastic Gradient Descent](#mini-batch-stochastic-gradient-descent)
- [Various other optimizers that have emerged in the last few years](#various-other-optimizers-that-have-emerged-in-the-last-few-years)
- [How to choose an optimizer](#how-to-choose-an-optimizer)

### Optimization techniques
For a brief while, we'll consider various optimization methods frequently employed in Deep Learning. In other words, if you came to this article hoping to learn the equation and mathematical explanation. We will also look at some Adaptive Optimization Algorithms (AOA). Compiling a program based on the current execution profile is known as adaptive optimization in computer science. You can easily make a tradeoff between JIT compilation and instruction interpretation in an adaptive optimizer solution.
#### Why do we optimize our machine learning models?
Every iteration is compared to the previous one, and the hyperparameters are tweaked until the results are as good as they can be. We can produce a model that is both accurate and error-free. A model can be optimized in a variety of ways.

This page also includes a quick overview of the many approaches that are accessible, including those provided by the Keras package.
### Momentum-based Optimization

Utilize an Adaptive Optimization Algorithm (AOA) that uses exponentially-weighted averaging of gradients from prior rounds to keep convergence from deviating. Most real-world applications, such as deep neural networks, rely on noisy input to train. 

There must be a systematic approach to feeding the data to minimize the impact of noise during optimization. To resolve this issue, exponentially weighted averages might be used.

Using an iterative process, we can approximate the trends in a P-dimensional noisy dataset by calculating the parameters as we go through the data:

On iteration p:

Get next 

&theta;p    
v<sub>&theta;</sub> = &beta;v<sub>&theta;</sub> + (1 - &beta;)&theta;<sub>p</sub>

v<sub>&theta;</sub> is averaged across its preceding 1/(1 - &beta;)&theta;<sub>p</sub> iterations, giving a value of v<sub>&theta;</sub>. With the help of averages, you can eliminate all the randomness and merely keep track of the overall trend. As a result of this method, the algorithm is more resistant to sample noise and can be trained more quickly.
### How does momentum help in gradient descent
This method works by detecting the direction of the steepest slope in its present state and then traveling in the direction of that sharpest slope to update its status.

Momentum helps distinguish recent derivatives when Gradient Descent approaches the middle phase of the ravine, and so boosts the gradient descent's direction.

Momentum is a prominent strategy used in conjunction with SGD. When searching, momentum collects the gradients of previous steps and the current ones to decide the best course of action. The following changes have been made to the gradient descent equations.
###  Stochastic Gradient Descent 

Using Stochastic Graduated Descent instead of Classic Gradient Descent, several of the flaws in the classic method are corrected By computing the derivative for each point on the trajectory it follows. It attempts to make up for its lack of computational rigor. It has more considerable noise than Gradient Descent. Hence it takes longer iterations to get to a minimal solution using SGD. In contrast to Gradient Descent, SGD computes the derivatives for all points at the same time.
### Adaptive Moment Estimation
RMSProp and momentum combine to create this effect. Use this method to figure out how fast your brain is adapting to new information. Like momentum, it saves the declining arithmetic mean of the squared gradients and an average of the past gradients, which is a similar feature.

On a smooth surface, it's considerably easier for Adam to make a mistake because of his high coefficient of friction. So, for example, this strategy's pseudocode appears like this:

D = 0
K = 0

for each iteration p

compute dW

D= &beta;<sub>1</sub>K + (1 - &beta;<sub>1</sub>)dw

D= v/(1 - &beta;<sub>1</sub><sup>i</sup>)

K= &beta;<sub>2</sub>K + (1 - &beta;<sub>2</sub>)dw<sup>2</sup>

K= S/(1 - &beta;<sub>2</sub><sup>i</sup>)

W= W - &alpha;V\sqrt{S} + &epsilon;

### RMSProp
It is an extension of gradient descent and AdaGrad that employs a decaying average of partial gradients to change the step size for each parameter. The drawback of AdaGrad is overcome by using a decaying moving average. This allows the algorithm to ignore early gradients and concentrate on the most recently recorded partial gradients as the search progresses.
Improve AdaGrad by applying the adaptive learning rate method based on the Root Mean Square. The exponential moving average is used rather than the cumulative sum of squared gradients used by AdaGrad There is only one step that differs between AdaGrad and RMSProp: the first one. 

That's all RMSProp does: it takes the learning rate and smooths it down by an average. So this strategy's pseudocode appears like this:

K = 0

for each iteration i
compute dW

K = &beta;K + (1- &beta;)dw<sup>2</sup>

W = w- &alpha;dw\frac{\sqrt{S} + &epsilon;}

### AdaGrad

When employing an Adaptive Gradient, you'll have to adjust the learning rate for parameters at each iteration based on where they're found. This means you'll learn more slowly in frequent areas while learning more quickly in less frequent ones.

Using mathematical formulas, the learning rate equals gamma squared times the square root of that number. This method works.

According to earlier AdaGrad computations in the update rule for all parameters, AdaGrad changes the general learning rate N. Cons: The denominator rises in a quadratic fashion, which makes it challenging to work with Since the addition of each additional word raises the total value, the value grows with time. As a result, learning becomes sluggish and eventually comes to a halt. 

The size of the master step has less of an impact on this technique, and it also converges faster.

###  AdaDelta

There are extensions for AdaGrad that can be used to slow down the monotonically decreasing pace of learning. For example, when utilizing AdaDelta, only a subset of prior gradients can be aggregated, not all of them (w). 

The only thing left to figure out is the current iteration's average after subtracting the previous iteration's average and the current gradient.
#### There have been significant developments on the Adadelta front
To overcome Adagrad's shortcomings, two new ideas have been implemented by Adadelta.
- The sum of squared gradients should be accumulated within a limited time, rather than with time. For example, the sum of squared slopes in Adagrad can be accumulated up to infinity, but this is not the case here. Learning rate approaches 0 as sum approaches infinite since this total is in denominator and learning rate is in the numerator. To keep the learning going even after many iterations, Adadelta limits the maximum size of the total that can be computed.
- Correct the inconsistencies in the units used in gradient descent algorithms. In the past algorithms (e.g. Adagrad, SGD, or Momentum), the units of a parameter's gradient instead of its parameter are updated. In other words, the update's units don't line up with the parameter's units. A Hessian approximation is used in place of the learning to ensure that the update direction matches the negative gradient at every step as in SGD. As a result, there is no longer a need to manually set the learning rate in the update rule.
### Mini Batch Stochastic Gradient Descent

Several improvements have been made to the SGD algorithm in recent years. SGD, however,  is time-consuming since it computes derivatives for every point in the dataset individually.
> After a few iterations, the MB-SGD loss function's derivative resembles the GD loss function. However, far more iterations are required to reach a minimum in the MB-SGD case than in the GD case, making it computationally costly. In addition, because the derivative does not always point towards minima, the weights update has a more significant impact.

The ability of adaptive optimization algorithms to swiftly converge has recently made them appealing. In addition, statistics from previous cycles are used to accelerate convergence.
### Various other optimizers that have emerged in the last few years
After AMSGrad, a slew of new optimizers was proposed. In addition, many weight decay remedies have been implemented, such as the QHAdam average that combines a regular SGD step with a momentum SGD step and the AggMo combination that combines multiple momentum terms. This [blog article](https://johnchenresearch.github.io/demon/) gives an overview of modern gradient descent techniques.
### How to choose an optimizer
Continuous function optimization is the most prevalent type of optimization problem in machine learning, where the function's input parameters are real-valued numeric values, such as floating-point values. As with the input, the function's output is a real-valued assessment of those values.

Problems of this type can be referred to as "continuous function optimization," in contrast to "combinatorial optimization problems," which deal with functions that accept discrete variables.

Continuous function optimization problems can benefit from a wide variety of optimization procedures, and there are probably just as many alternative ways to categorize and describe them.

Grouping optimization methods by the amount of information available about the goal function that may be exploited and harnessed by the optimization process is one option.

Generally, the more information about the target function that is accessible, the easier it is to optimize if the knowledge can be successfully utilized in the search.

For optimization methods, one of the most significant differences is whether or not a point exists in the objective function. A candidate solution's first derivative (gradient or slope) calculability is evaluated in this manner. There are two kinds of algorithms: those that can use the gradient information and others that can't use it.

#### Optimizer to use

What's the best way to improve your website now? In cases when the input data is sparse, adaptive learning-rate approaches are likely to be the most effective. Additionally, you won't have to fiddle with the learning rate because the default number will likely produce the greatest results.

As a result, RMSprop is an Adagrad module that addresses Adagrad's rapidly decreasing learning rates. Adadelta employs the RMS of parameter changes in the nominator update rule, whereas this algorithm does not. In a long-awaited update, Adam finally adds bias correction and momentum to RMSprop. As far as I can tell, RMSprop, Adadelta, and Adam all perform well in similar situations. At the end of the optimization, Kingma et al. show that Adam's bias-correction helps Adam slightly surpass RMSprop. Thus, Adam may be the best overall option.

Interestingly, several recent works have used a simple learning rate annealing schedule and vanilla SGD without momentum. It is well known that SGD can discover a minimum. Still, it may take longer than some other optimizers, is more dependent on a strong initialization and anneal scheduling, and may get trapped at saddle points rather than local minima. The adaptive learning rate approaches, on the other hand, are ideal if you want to achieve fast convergence and train a deep or complicated neural network.

### Conclusion

In other words, optimization algorithms are in charge of cutting costs while delivering the most precise outcomes. For each new epoch, the weight is reset using one of several initialization procedures. As a result, some optimization procedures or algorithms dubbed Optimizer produce the best results.
