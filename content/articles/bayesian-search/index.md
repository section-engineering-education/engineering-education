---
layout: engineering-education
status: publish
published: true
url: /bayesian-optimization/
title: A Primer on Bayesian Optimization to Optimize Hyperparameters 
description: Bayesian optimization can be categorized as a sequential model-based optimization algorithm. It uses the outcome of previous iterations to decide on the next hyperparameters. This article will provide an introduction on Bayesian optimization.
author: collins-ayuya
date: 2021-05-11T00:00:00-10:00
topics: []
excerpt_separator: <!--more-->
images:

 - url: /engineering-education/bayesian-optimization/hero.jpg
   alt: Bayesian Optimization to Optimize Hyperparameters image

---
In the two previous optimization articles, we carried out basic experiments (these are listed below). These experiments involved building many models with varied hyperparameters. The experiments of the two methods (grid and random search) were independent of each other.
<!--more-->
This independence has a downside. It means that we cannot use information from one experiment to improve another. However, there is a more intuitive method of hyperparameter optimization. 

It uses the outcome of previous iterations to select the next potential hyperparameters. It is known as Bayesian optimization. This article will provides readers with a primer on Bayesian optimization.

### Contents
1. [Bayesian statistics](#bayesian-statistics)
2. [Bayesian optimization](#bayesian-optimization)
3. [Steps to apply Bayesian optimization](#steps-to-apply-bayesian-optimization)
4. [Surrogate functions](#surrogate-functions)
5. [Acquisition functions](#acquisition-functions)

### Prerequisites
Before reading any further, I recommend some basic understanding of [Baye’s Theorem](https://betterexplained.com/articles/an-intuitive-and-short-explanation-of-bayes-theorem/). 

I also encourage you to have read up on [grid](/grid-search/) and [random](/random-search-hyperparameters/) search. This will offer a more intuitive understanding of optimization as a whole.

### Bayesian statistics

![statistics](/engineering-education/bayesian-optimization/statistics.jpg)

[Source](https://www.reddit.com/r/machinelearningmemes/)

Bayesian statistics refers to a branch of Statistics that applies probabilities to problems. It gives tools that assist in understanding the probability of an event occurring in the evidence of new data. We can say it assists people to upgrade their beliefs with the provision of new data. 

For example, Don and Frank have both scored goals in their previous five soccer matches. Don scored four goals, while Frank scored two in five games. If you were to bank on one of the two to score in their next match, you would probably choose Don, right?

But what if we told you that half of Don’s goals came against lower-tier opposition? And that in the games Frank failed to score, his team had a man less due to being sent off? 

Plus, in the games that Frank scored, he came on as a substitute for 15 minutes each game? In light of this new information, who would you put your money on?

This twist shows us that Frank’s chances of scoring in the next game he starts have increased considerably. From the example, we have used the concept of probability on a basic statistical problem. This defines Bayesian statistics.

### Bayesian optimization
Bayesian optimization can be categorized as a sequential model-based optimization algorithm. This means that it carries out trials iteratively as it tries better hyperparameters. It uses the outcome of previous iterations to decide on the next hyperparameters. 

Bayesian optimization does not search through the hyperparameter space blindly. This contrasts with the grid and random search methods. This form of optimization first constructs a probabilistic model. It then maps hyperparameters to a probability of a score on a function. This is the objective function.

The objective function takes in hyperparameters and gives out a score. The score should either be minimized or maximized. The score produced is a single score and is a real value. Objective functions are costly to compute. It is difficult to attempt every single hyperparameter combination. This is because the objective function cannot be calculated quickly. 

As such, Bayesian optimization aims to cut down on the number of times we would need to run the function. It calculates the conditional probability of the objective function. This calculation is for a validation set, and having a set of hyperparameter values is used to train the probabilistic model. Conditional probability is the probability of an event taking place, given that a different event has occurred.

### Steps to apply Bayesian optimization
As we mentioned above, the objective function is difficult to use in computations. As a result, a simper function is considered in place of the objective function. This simpler function is easier to optimize. 

We call it the surrogate function. It is the true objective function represented in terms of probability. This is as a result of previously-evaluated selected hyperparameters. We shall discuss this function further in the next section.

To carry out Bayesian optimization for hyperparameter search, we follow the steps below:

1. Create a surrogate probability model of the objective function.
2. Find the surrogate model’s best-performing hyperparameters.
3. Utilize the best performing hyperparameters on the true objective function.
4. Update the surrogate probability model. This is done by including new results from the previous step.
5. Repeat the second to fourth step until we achieve a pre-determined completion condition.

We will go through the mentioned steps in detail during an in-depth tutorial in the future. For now, our scope is on the basics of Bayesian optimization.

### Components of Bayesian optimization
There exist two main components of Bayesian optimization:
1. Surrogate functions
2. Acquisition functions

#### Surrogate functions
The surrogate function is the representation of the objective function as a probability. It is created using previous evaluations. We can refer to it as the probability model or the response surface. It is a response surface because it maps hyperparameters to the probability of an objective function score. 

The score represents the surrogate function’s value. We calculate this score using a group of selected hyperparameter values. We can refer to most types of functions that may be used to estimate complex true objective functions as surrogate functions. 

An example would be the Gaussian process. 

This process refers to a set of infinite Gaussian functions. These gaussian functions provide flexibility as well as a vast function collection. This allows for the creation of the surrogate function over the domains of the true objective function.

As we mentioned before, it is expensive to compute the objective function. As such, a surrogate function samples the evaluations of a succession of points from the objective function’s domain. The sampling is done iteratively. Thus, we can use a number of known objective function evaluations to train the surrogate function.

A prior probability distribution is the probability distribution of an uncertain quantity. This distribution is also known as prior. It expresses a person’s beliefs about said quantity before new evidence is considered. A key reason for using the Gaussian process as the surrogate function is that it uses a simple prior. 

The prior assumes that similar inputs produce similar outputs. There are scenarios where we lack knowledge about priors for hyperparameter search. The previously described prior is useful in such situations. A Gaussian process predicts a Gaussian distribution for approximated values. This is instead of predicting a single value.

#### Acquisition functions
We can derive certain functions from the surrogate function. These functions guide the choice of the next evaluation points. We call them acquisition functions.

A new set of hyperparameters is made up of newly sampled points from a search space. This search space consists of all possible hyperparameter sets.

Let’s define an acquisition function using the *expected improvement* method. The hyperparameter set that generates the best model performance will always be tracked. A new set of hyperparameters may provide an improvement after subsequent experiments. A new set may lead to stagnation as well. 

This is dependent on whether they succeed or fail at producing the best model. We keep hyperparameter values that produce the best models. As you would expect, we discard the values that produce poor results. We select hyperparameter sets that offer great expected improvement in our models. 

Let’s represent the expected improvement of a point $x$ mathematically.

$$ EI(x) = EV [ max(f(x) – y_{max},0) ] $$

Where $y_{max}$ represents $max_iy_i$, which is the best value of the function $f$ and EV represents expected value. It is worth noting that this formula is only valid when there are exact samples of the function values $$ y_i = f(x_i) $$.

Let’s show how expected improvement acquires new hyperparameter settings. In the image below, A, B, and C are hyperparameter settings. These settings result from Gaussian processes. To select a setting, we need the acquisition function.

![acquisition](/engineering-education/bayesian-optimization/acquisition.png)

*Expected improvement acquisition.*

[Source]( https://medium.com/analytics-vidhya/hyperparameter-search-bayesian-optimization-14be6fbb0e09#:~:text=%202%20%E2%80%94%20Bayesian%20optimization%20for%20Hyperparameter%20Search,function%20is%20the%20probability%20representation%20of...%20More%20)

From the image above, the distribution denoted by A has a mean that is less than the current best value. The red horizontal line shows this. B is closer to the current best value than A but has much less variance. C is also near to the current best value. But, it has very high level of variance.

Expected improvement seeks the greatest first moment of the area of the Gaussian graph above the current best value. In this case, this is represented by distribution C.

This implies that the greatest chance of getting better hyperparameter settings is from C. A offers the worst settings.

### Wrapping up
Bayesian optimization is quite efficient. It carries out hyperparameter selection in a very informed manner. Priority is given to hyperparameters that show more promise based on previous results. 

This makes Bayesian optimization more efficient than both grid and random search. We can find the best set in a shorter time. I hope the trilogy of optimization articles has simplified these concepts for you. 

Until next time, happy reading!

### References and further reading
1. [Hyperparameter Search: Bayesian Optimization](https://medium.com/analytics-vidhya/hyperparameter-search-bayesian-optimization-14be6fbb0e09)

2. [Comparison of Hyperparameter Tuning algorithms: Grid search, Random search, Bayesian optimization](https://medium.com/analytics-vidhya/comparison-of-hyperparameter-tuning-algorithms-grid-search-random-search-bayesian-optimization-5326aaef1bd1)

3. [A Conceptual Explanation of Bayesian Hyperparameter Optimization for Machine Learning](https://towardsdatascience.com/a-conceptual-explanation-of-bayesian-model-based-hyperparameter-optimization-for-machine-learning-b8172278050f#:~:text=%20Bayesian%20Optimization%20%201%20Sequential%20Model-Based%20Optimization.,real-valued%20score%20that...%204%20History.%20%20More%20)

---

Peer Review Contributions by: [Willies Ogola](/engineering-education/authors/willies-ogola/)

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
