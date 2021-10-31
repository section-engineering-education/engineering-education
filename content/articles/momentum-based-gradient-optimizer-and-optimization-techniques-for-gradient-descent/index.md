### Introduction
Alternative models can be built using Gradient Descent in machine learning systems. An objective function specifies the level of inaccuracy that a Machine Learning model will have on a given dataset during the training phase.

A random set of values will be used throughout training to maintain fairness. As a result, we get closer to the ideal function value with each repetition.

The quick convergence of Adaptive Optimization Algorithms, on the other hand, is causing them to gain popularity. For better convergence resilience, these methods diverge from the traditional Gradient Descent algorithm.
### Optimization techniques
For a brief while, we'll consider various optimization methods frequently employed in Deep Learning. In other words, if you came to this article hoping to learn the equation and mathematical explanation, don't bother. This page also includes a quick overview of the many approaches that are accessible, including those provided by the Keras package.
### Momentum-based Optimization
Utilize an Adaptive Optimization Algorithm (AOA) that uses exponentially-weighted averaging of gradients from prior rounds to keep convergence from deviating. The vast majority of real-world applications, such as deep neural networks, rely on noisy input to train. There must be a systematic approach to feeding the data in order to minimize the impact of noise during Optimization. To resolve this issue, exponentially weighted averages might be used.

Using an iterative process, we can approximate the trends in a P-dimensional noisy dataset by calculating the parameters as we go through the data:
```
On iteration p:
    Get next  θp 
    v_θ = β vθ + (1 - β)θp
```
**Vθ** is averaged across its preceding **1/(1 - β)** iterations, giving a value of **vθ**. With the help of averages, you can eliminate all the randomness and merely keep track of the overall trend. As a result of this method, the algorithm is more resistant to sample noise and can be trained more quickly.
### How does momentum help in gradient descent
To describe a gradient descent algorithm, the term `momentum` is used. This method works by detecting the direction of the steepest slope in its present state and then traveling in the direction of that sharpest slope to update its status.

Momentum helps distinguish recent derivatives when Gradient Descent approaches the middle phase of the ravine and so boosts the gradient descent's direction.

Momentum is a prominent strategy used in conjunction with SGD. When searching, momentum collects the gradients of previous steps as well as the current ones to decide the best course of action. The following changes have been made to the gradient descent equations.

###  Stochastic Gradient Descent (SGD)
By using Stochastic Graduated Descent instead of Classic Gradient Descent, several of the flaws in the classic method are corrected By computing the derivative for each point on the trajectory it follows, it attempts to make up for its lack of computational rigor It has larger noise than Gradient Descent, hence it takes longer iterations to get to a minimal solution using SGD. In contrast to Gradient Descent, SGD computes the derivatives for all points at the same time.
### Adaptive Optimization Algorithm techniques.
In the next section, we'll take a look at a few approaches used in A.O.A.s.
### Adaptive Moment Estimation (Adam)
RMSProp and Momentum combine to create this effect. Use this method to figure out how fast your brain is adapting to new information. Like Momentum, it saves the declining arithmetic mean of the squared gradients as well as an average of the past gradients, which is a similar feature. On a smooth surface, it's considerably easier for Adam to make a mistake because of his high coefficient of friction. This strategy's pseudocode appears like this:
```
D = 0
K = 0
for each iteration p
    compute dW
    D = β1K + (1 -β1) dW
     D = V⁄{1 -β1i}
    K = β2K + (1 -β2) dW2
    K = S⁄{1 -β2i}
    W = W - α V⁄√S + ε
```
### RMSProp
Improve AdaGrad by applying the adaptive learning rate method based on the Root Mean Square. The exponential moving average is used rather than the cumulative sum of squared gradients used by AdaGrad There is only one step that differs between AdaGrad and RMSProp: the first one. That's all RMSProp does: it takes the learning rate and smooths it down by an average.
This strategy's pseudocode appears like this:
```
K = 0
for each iteration i
    compute dW
    K = βK +(1 -β)dW2
    W = W -α dW⁄√S + ε
```
###  AdaDelta
There are extensions for AdaGrad that can be used to slow down the monotonically decreasing pace of learning. When utilizing AdaDelta, only a subset of prior gradients can be aggregated, not all of them (w). The only thing left to figure out is the current iteration's average after subtracting the previous iteration's average and the current gradient.
### AdaGrad
When employing an Adaptive Gradient, you'll have to adjust the learning rate for parameters at each iteration based on where they're found. This means you'll learn more slowly in frequent areas while learning more quickly in less frequent ones.

Using mathematical formulas, the learning rate is equal to gamma squared times the square root of that number. This method works.

According to earlier AdaGrad computations in the update rule for all parameters, AdaGrad changes the general learning rate N. Cons: The denominator rises in a quadratic fashion, which makes it difficult to work with Since the addition of each additional word raises the total value, the value grows with time. As a result, learning becomes sluggish and eventually comes to a halt. The size of the master step has less of an impact on this technique, and it also converges faster.
### Mini Batch — Stochastic Gradient Descent
A number of improvements have been made to the SGD algorithm in recent years. SGD is time-consuming since it computes derivatives for every point in the dataset individually.
> After a few iterations, the MB-SGD loss function's derivative resembles the GD loss function. There are far more iterations required to reach a minimum in the MB-SGD case than in the GD case, making it computationally costly. Because the derivative does not always point towards minima, the weights update has a greater impact.

The ability of adaptive optimization algorithms to swiftly converge has recently made them appealing. Statistics from previous cycles are used to accelerate convergence.

### Conclusion
To put it another way, optimization algorithms are in charge of cutting costs while yet delivering the most precise outcomes. For each new epoch, the weight is reset using one of several initialization procedures. Some optimization procedures or algorithms dubbed Optimizer produce the best results.