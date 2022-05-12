---
layout: engineering-education
status: publish
published: true
url: /gradient-descent-based-optimization-techniques/
title: Gradient Descent Based Optimization Techniques 
description: In this article, we consider Adaptive Optimization Algorithms and compare their convergence abilities from traditional gradient descent algorithms 
author: bonface-ndolo
date: 2021-12-23T00:00:00-15:00
topics: [Machine Learning]
excerpt_separator: <!--more-->
images:

 - url: /engineering-education/gradient-descent-based-optimization-techniques/hero.jpg
   alt: Gradient Descent Based Optimization Techniques example image
---
Gradient descent is used to optimize neural networks and machine learning algorithms. This post delves into the inner workings of some of the most popular gradient-based optimization algorithms. 
<!--more-->
These algorithms include Momentum, Adagrad, and Adam.

### Table of contents
- [Table of contents](#table-of-contents)
- [Optimization techniques](#optimization-techniques)
  - [Why do we optimize our machine learning models?](#why-do-we-optimize-our-machine-learning-models)
- [Momentum-based optimization](#momentum-based-optimization)
- [How does momentum help in gradient descent?](#how-does-momentum-help-in-gradient-descent)
- [Stochastic Gradient Descent](#stochastic-gradient-descent)
- [Adaptive Moment Estimation](#adaptive-moment-estimation)
- [RMSProp](#rmsprop)
- [AdaGrad](#adagrad)
- [AdaDelta](#adadelta)
  - [There have been significant developments on the Adadelta front](#there-have-been-significant-developments-on-the-adadelta-front)
- [Mini Batch Stochastic Gradient Descent](#mini-batch-stochastic-gradient-descent)
- [Various other optimizers that have emerged in the last few years](#various-other-optimizers-that-have-emerged-in-the-last-few-years)
- [How to choose an optimizer](#how-to-choose-an-optimizer)
  - [Optimizer to use](#optimizer-to-use)
- [Conclusion](#conclusion)

### Optimization techniques
We will look at various optimization methods frequently employed in deep learning. We will review Adaptive Optimization Algorithms (AOA). Compiling a program based on the current execution profile is known as adaptive optimization in computer science. You can easily make a tradeoff between Just-In-Time (JIT) compilation and instruction interpretation in an adaptive optimizer solution.

#### Why do we optimize our machine learning models?
Every iteration is compared to the previous one, and the hyper-parameters are tweaked until the results are as good as they can be. We can produce a model that is both accurate and error-free. 

This page includes a quick overview of the many approaches that are accessible, including those provided by the Keras package.

### Momentum-based optimization
Momentum-based optimization utilizes an Adaptive Optimization Algorithm (AOA) that uses exponentially-weighted averaging gradients from prior rounds to keep convergence from deviating. Unfortunately, most real-world applications such as deep neural networks rely on noisy input to train.

There is a systematic approach to feeding the data to minimize the impact of noise during optimization. For example, using exponentially weighted averages can solve. Using an iterative process, we can approximate the trends in a P-dimensional noisy dataset by calculating the parameters as we go through the data:

$On\; iteration\; p$
$Get\; next$
$\theta_p$
$V_\theta = \beta V_\theta + (1 - \beta)\theta_p$

$V_\theta$ is averaged across its preceding $\frac{1}{(1 - \beta)\theta_p}$ iterations, giving a value of $V_\theta$. With the help of averages, we eliminate all the randomness and merely keep track of the overall trend. As a result of this method, the algorithm is more resistant to sample noise and can be trained more quickly.

### How does momentum help in gradient descent?
When this method is in use, it looks for the direction of the steepest slope in its current state. Then it moves in the direction of that steepest slope to change its status.

Momentum helps gradient descent distinguish recent derivatives as it nears the middle of the ravine allowing the gradient descent to move in the right direction.

Momentum looks at the gradients of the steps that came before and the following to determine which one is the best to take.

### Stochastic Gradient Descent
Stochastic Gradient Descent (SGD) is better because it fixes many problems. It tries to make up for its inability to do calculations very well. However, it makes a lot more noise than Gradient Descent. Using SGD takes a lot longer to get to a simple solution. It is different from Gradient Descent in that SGD does the derivatives for all points simultaneously.

### Adaptive Moment Estimation
RMSProp and momentum combine to create this. Like momentum, it saves the declining arithmetic mean of the squared gradients and an average of past gradients, which is similar. On a smooth surface, it's considerably easier for Adam to make a mistake because of its high coefficient of friction.

This strategy's pseudocode appears like this:

$D = 0$
$K = 0$
$for\; each\; iteration\; p$
$compute\; dW$
$D= \beta_1K + (1 - \beta_1)dw$
$D= V/(1 - \beta_1^i)$
$K= \beta_2K + (1 - \beta_2)dw^2$
$K= \frac{S}{(1 - \beta_2^i)}$
$W= W - \alpha \frac{V}{\sqrt{S} + \epsilon}$

### RMSProp
It is an extension of gradient descent and AdaGrad that employs a decaying average of partial gradients to change the step size for each parameter. The drawback of AdaGrad is overcome by using a decaying moving average.

This allows the algorithm to ignore early slopes and concentrate on the most recently recorded partial gradients as the search progresses. RMSProp takes the learning rate and smooths it down by an average. 

This strategy's pseudocode appears like this:

$K = 0$
$for\; each\; iteration\; i$
$compute\; dW$
$K = \beta K + (1- \beta)dW^2$
$W = W- \alpha \frac{dW}{(\sqrt{S} + \epsilon)}$

### AdaGrad
When employing an adaptive gradient, you'll have to adjust the learning rate for parameters at each iteration based on where they're found. The learning rate equals squared times the square root of that number ($\gamma^2*\sqrt{N}$). According to earlier AdaGrad computations in the update rule for all parameters, AdaGrad changes the general learning rate.

**Cons:** The denominator rises in a quadratic fashion, making it challenging to work with since adding each additional word raises the total value. The value grows with time. As a result, learning becomes sluggish and eventually comes to a halt.

### AdaDelta
Adadelta optimization is a stochastic gradient descent method that uses an adaptive learning rate for each dimension to address the following problems:
- It can be hard to figure out how much to learn in each dimension.
- The rate at which you learn decreases over time during training.
- The need for a global learning rate that can be set manually.

> Add-on: Adadelta is a more powerful version of Adagrad. It changes learning rates based on a moving window of gradient updates rather than accumulating all past gradients as Adagrad does. This way, Adadelta can keep learning even though there have been a lot of changes. In the original version of Adadelta, you don't have to set a learning rate. However, like most Keras optimizers, you can set the speed you start learning in this version.

#### There have been significant developments on the Adadelta front
Adadelta has implemented two new ideas to overcome Adagrad's shortcomings:
- Within a limited time, the sum of squared gradients accumulated. The sum of squared slopes in Adagrad can be accumulated up to infinity, for example, but this is not the case here. Learning rate approaches 0 as sum approaches infinite since this total is in denominator and learning rate is in the numerator. To keep the learning going even after many iterations, Adadelta limits the maximum size of the whole computed.
- Correct the inconsistencies in the units used in gradient descent algorithms. In other words, the update's teams don't line up with the parameter's units. A Hessian approximation is used in place of the learning to ensure that the update direction matches the negative gradient at every step as in SGD. As a result, there is no longer a need to set the learning rate in the update rule manually.

### Mini Batch Stochastic Gradient Descent (MB-SGD)
Several improvements have been made to the SGD algorithm in recent years. However, SGD is time-consuming since it computes derivatives individually for every point in the dataset.

After a few iterations, the MB-SGD loss function's derivative resembles the GD loss function. However, far more iterations are required to reach a minimum in the MB-SGD case than in the GD case, making it computationally costly. In addition, because the derivative does not always point towards minima, the weights update has a more significant impact.

The ability of adaptive optimization algorithms to converge swiftly has recently made them appealing. In addition, statistics from previous cycles are used to accelerate convergence.

### Various other optimizers that have emerged in the last few years
After AMSGrad, a few new optimizers were proposed. In addition, many weight decay remedies have been implemented, such as the QHAdam average that combines a regular SGD step with a momentum SGD step and the AggMo combination that combines multiple momentum terms. This [article](https://johnchenresearch.github.io/demon/) gives an overview of modern gradient descent techniques.

### How to choose an optimizer
Continuous function optimization is the most prevalent optimization problem in machine learning, where the input parameters are real-valued numeric values, such as floating-point values. The function's output is a real-valued assessment of those values with the input.

Problems of this type can be referred to as "continuous function optimization", in contrast to "combinatorial optimization problems", which deals with functions that accept discrete variables.

Continuous function optimization problems can benefit from a wide variety of optimization procedures, and there are probably just as many alternative ways to categorize and describe them.
Grouping optimization methods by the amount of information available about the goal function that may be exploited and harnessed by the optimization process is one option.

Generally, the more information about the target function is accessible, the easier it is to optimize if the knowledge can be successfully utilized in the search. One of the most significant differences for optimization methods is whether or not a point exists in the objective function.

Therefore, a candidate solution's first derivative (gradient or slope) calculability is evaluated in this manner. There are two kinds of algorithms: those that can use the gradient information and others that can't use it.

#### Optimizer to use
What's the best way to improve your website now? In cases when the input data is sparse, adaptive learning-rate approaches are likely to be the most effective. You won't have to fiddle with the learning rate because the default number will likely produce the most outstanding results.

As a result, RMSprop is an Adagrad module that addresses Adagrad's rapidly decreasing learning rates. Adadelta employs the RMS of parameter changes in the nominator update rule, whereas this algorithm does not. In a long-awaited update, Adam finally adds bias correction and momentum to RMSprop. As far as I can tell, RMSprop, Adadelta, and Adam all perform well in similar situations. Adam may be the best overall option.

Interestingly, several recent works have used a simple learning rate annealing schedule and vanilla SGD without momentum. It is well known that SGD can discover a minimum. It still may take longer than some other optimizers, as it is more dependent on a solid initialization and anneal scheduling, and may get trapped at saddle points rather than local minima.

The adaptive learning rate approaches, on the other hand, are ideal if you want to achieve fast convergence and train a deep or complicated neural network.

### Conclusion
In other words, optimization algorithms are in charge of cutting costs while delivering the most precise outcomes. For each new epoch, the weight is reset using several initialization procedures. As a result, some optimization procedures or algorithms dubbed optimizers produce the best results.

---
Peer Review Contributions by: [Lalithnarayan C](/engineering-education/authors/lalithnarayan-c/)

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
