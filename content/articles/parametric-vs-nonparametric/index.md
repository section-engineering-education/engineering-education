---
layout: engineering-education
status: publish
published: true
url: /parametric-vs-nonparametric/
title: Parametric versus Non-Parametric Models
description: This article will be an introduction to parametric and non-parametric models  A machine learning model with a set number of parameters is a parametric model. Those without a set number of parameters are referred to as non-parametric. 
author: collins-ayuya
date: 2021-02-22T00:00:00-12:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/parametric-vs-nonparametric/hero.jpg
    alt: Parametric versus Non-Parametric Models hero image
---
In machine learning, a learner/model learns from training data to map a target function. However, the configuration of the function is undetermined. As a result, we test out many machine learning algorithms to effectively determine which models the intrinsic function. 
<!--more-->
To tune the behavior of models for a given task, these models are parameterized. We seek to understand such a process by dissecting parametric and non-parametric models.
### Contents
1. Introducing parameters
2. Parametric models
3. Non-parametric models
4. Parametric vs. Non-parametric models

### Prerequisites
I would recommend this article on [supervised learning algorithms](/supervised-learning-algorithms/). It introduces several concepts that we will refer to later in this article.

### Parameters
A parameter can be described as a configuration variable that is intrinsic to the model. Model parameters are usually not set manually. Parameters are often mistaken for hyperparameters. Hyperparameters are configuration variables that are external to the model. Unlike parameters, hyperparameters are manually set.

The value of a parameter can be approximated from the training data in consideration. After training, the parameters would be used to determine the performance of the model on test data. The model uses them to make predictions. 

A machine learning model with a set number of parameters is a parametric model. Those without a set number of parameters are referred to as non-parametric. 

We shall dive deeper into this later. As we will dissect later, the coefficients of a linear regression function are examples of model parameters. Another example is in the form of the coefficients in logistic regression. In a neural network, the weights act as the parameters.

### Parametric models
Assumptions about the form of a function can ease the process of learning. Parametric models are characterized by the simplification of the function to a known form. A parametric model is a learner that summarizes data through a collection of parameters. 

These parameters are of a fixed-size. This means that the model already knows the number of parameters it requires, regardless of its data. The parameters are also independent of the number of training instances.

With parametric models, there are two steps involved. The first is choosing the function form. Learning the function coefficients from training data is the second step. Let’s expound on the two.

As an example, let’s have the mapping function in the form of a linear regression line.

$$ b_0 + b_1x_1 + b_2x_2 = 0 $$

From the equation, $b_0$, $b_1$, and $b_2$ are coefficients of the line that controls the intercept and slope. Input variables are represented by $x_1$ and $x_2$. 

As we mentioned before, assumptions about the form of the function make the learning easier. Considering the function above, we would need to estimate the coefficients. 

This results in a predictive model for a given task. Through the use of the intercept and coefficients, we can predict any value. For such a model, feeding in more data will impact the coefficients' value in the equation above. It will not increase the complexity of the model.

It is common to have parametric models being referred to as linear machine learning models. This is as a result of having the assumed form of the function in a linear form. 

As we can note from the equation, the combination of input variables is linear. Aside from linear regression, examples of parametric models include logistic regression and linear SVM.

### Non-Parametric models
Algorithms that do not make particular assumptions about the kind of mapping function are known as non-parametric algorithms. These algorithms do not accept a specific form of the mapping function between input and output data as true. 

They have the freedom to choose any functional form from the training data. As a result, for parametric models to estimate the mapping function they require much more data than parametric ones.

One might think that non-parametric means that there are no parameters. However, this is not true. Rather, it simply means that the parameters are (not only) adjustable but can also change. 

This leads to a key distinction between parametric and non-parametric algorithms. We mentioned that parametric algorithms have a fixed number of parameters, regardless of the amount of training data. 

However, in the case of non-parametric ones, the number of parameters is dependent on the amount of training data. The more training data, the greater the number of parameters. A consequence of this is that non-parametric algorithms may take much longer to train.

[K-nearest neighbors](https://www.geeksforgeeks.org/k-nearest-neighbours/) is an example of a non-parametric algorithm. Its predictions are based on the k most similar training patterns for a new instance of data. 

We should note that there are no assumptions made about the form of the mapping function aside from one. It is assumed that the most alike training patterns have a higher likelihood of producing a similar output.

We mentioned that linear SVM is an example of a parametric model. This is because basic support vector machines are linear classifiers. However, SVMs that are not constrained by a set number of parameters are considered non-parametric.

### Parametric vs Non-Parametric models
Since we can now define both parametric and non-parametric models, we can compare both in this following section. We will then look at the benefits and limitations of both types of models.

![fit](/engineering-education/parametric-vs-nonparametric/fit.png)

*Results of parametric and non-parametric regression.*

[Image Source](https://medium.com/analytics-vidhya/parametric-and-nonparametric-models-in-machine-learning-a9f63999e233)

Let’s first note that the data points in the two scenarios in the image above are the same.

Recalling the equation that we described earlier, the first image illustrates the mapping function as a linear regression line. This represents a parametric model. We see the consequence of the linear function on the data. A lot of data points are ignored.

The image with a wiggly function represents a non-parametric model. As we mentioned, these algorithms make little to no guesses about the mapping function. As a result, they show greater flexibility and offer a better fit to the data over parametric ones.

### Benefits
#### Parametric Models
**Simplicity.** The methods of parametric algorithms are easier to understand. The interpretability of results is also easier in comparison to non-parametric models.

**Training data.** Parametric algorithms require less training data than non-parametric ones.

**Training speed.** They are computationally faster than non-parametric methods. They can be trained faster than non-parametric ones since they usually have fewer parameters to train.

#### Non-Parametric Models
**Performance.** Non-parametric models may offer more accurate predictions since they offer a better fit to data than parametric ones.

**Flexibility.** As shown by the image above, these algorithms provide a good fit for data. They can fit many forms of a function.

**Little to no assumptions.** Little to no guesses about the mapping function are made. Compared to parametric algorithms, non-parametric algorithms learn more from data. This is because the learning of parametric algorithms may be limited by the assumptions that they make.

### Limitations
#### Parametric models
**Form constraints.** Parametric methods constrain an algorithm to a specified functional form.

**Fit.** These methods do not offer the best fit to data. They are not likely to perfectly match the mapping function.

**Complexity.** Parametric algorithms offer limited complexity. This means that they are better suited to less complex problems.

#### Non-Parametric Models
**Overfitting.** As much as these algorithms tend to fit data better than parametric ones, they are more susceptible to overfitting.

**Training data.** To give an estimate of the mapping function, these algorithms require much more data than parametric ones.

**Speed.** Non-parametric algorithms are slower to train since they usually have more parameters to consider for the training.

### Wrapping Up
Through this article, we have introduced parametric and non-parametric models. We have noted a handful of examples of both models. Finally, we also compared how they fit given data points as well as their benefits and limitations. 

Until next time, good luck!

Happy coding.

### References
1.  [Parametric and Nonparametric Machine Learning Algorithms](https://machinelearningmastery.com/parametric-and-nonparametric-machine-learning-algorithms/)

2.  [Parametric and Non-parametric Models In Machine Learning](https://medium.com/analytics-vidhya/parametric-and-nonparametric-models-in-machine-learning-a9f63999e233)

3.  [Difference between Parametric and Non-Parametric Methods](https://www.geeksforgeeks.org/difference-between-parametric-and-non-parametric-methods/)

4.  [Parameters in Machine Learning algorithms.](https://towardsdatascience.com/parameters-in-machine-learning-algorithms-ba3e3f0e49a)

5.  [Parametric vs Nonparametric models?](https://medium.com/@dataakkadian/what-are-parametric-vs-nonparametric-models-8bfa20726f4d)

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
