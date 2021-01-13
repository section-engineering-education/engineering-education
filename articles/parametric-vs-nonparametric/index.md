![hero](/engineering-education/parametric-vs-nonparametric/hero.jpg)

[Source](https://images.unsplash.com/photo-1489389944381-3471b5b30f04?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80)

In machine learning, a learner learns from training data to map a target function. However, the configuration of the function is undetermined. As a result, we test out many machine learning algorithms to determine which models the intrinsic function effectively. To tune the behavior of models for a given task, these models are parameterized. We seek to understand such a process by dissecting parametric and non-parametric models.

### Contents

1. Introducing parameters
2. Parametric models
3. Non-parametric models
4. Parametric vs non-parametric models

### Prerequisites

I recommend this article on [supervised learning algorithms](/engineering-education/supervised-learning-algorithms/). It introduces a number of concepts that we refer to in this article.

### Parameters

A parameter can be described as a configuration variable that is intrinsic to the model. Model parameters are usually not set manually. Parameters are often mistaken for hyperparameters. Hyperparameters is a configuration variable that is external to the model. Unlike parameters, hyperparameters are manually set.

The value of a parameter can be approximated from training data in consideration. After training, the parameters used determine the performance of the model on test data. They are used by the model to make predictions. A machine learning model with a set number of parameters is a parametric model. Those without a set number of parameters are referred to as non-parametric. We shall delve deeper into this later.
As we shall dissect later, the coefficients of a linear regression function are examples of model parameters. Another example is in the form of the coefficients in logistic regression. In a neural network, the weights act as the parameters.


### Parametric Models

Assumptions about the form of a function can ease the process of learning. Parametric models are characterized by simplification of the function to a known form. A parametric model is a learner that summarizes data through a collection of parameters. These parameters are of a fixed-size. This means that the model already knows the number of parameters it requires, regardless of the data given to it. The parameters are also independent of the number of training instances.

With parametric models, there are two steps involved. The first is choosing the function form. Learning the function coefficients from training data is the second step. Let’s expound on the two.

As an example, let’s have the mapping function in the form of a linear regression line.

$$ b_0 + b_1x_1 + b_2x_2 = 0 $$

From the equation, $b_0$, $b_1$ and $b_2$ are coefficients of the line that controls the intercept and slope. Input variables are represented by $x_1$ and $x_2$. As we mentioned before, assumptions about the form of the function make learning easier. Considering the above function, we would need to estimate the coefficients. This would then result in a predictive model for a given task, since through the use of the intercept and coefficients, we can predict any value, in addition to the regression. For such a model, feeding in more data will impact the value of the coefficients in the above equation. It will not increase the complexity of the model.
It is common to have parametric models being referred to as linear machine learning models. This is as a result of having the assumed form of the function in a linear form. As can be noted from the equation, the combination of input variables is linear. Aside from linear regression, examples of parametric models include logistic regression and linear SVM.

### Non-Parametric Models

Algorithms that do not make particular assumptions about the kind of mapping function are known as non-parametric algorithms. Since they make no assumptions, they can learn any form of the function from data.
One might think that non-parametric means that there are no parameters. However, this is not true. Rather, it simply means that the parameters are not only modifiable but can also change.
[K-nearest neighbors](https://www.geeksforgeeks.org/k-nearest-neighbours/) is an example of a non-parametric algorithm. Its predictions are founded on the k most similar training patterns for a new instance of data. We should note that there are no assumptions made about the form of the mapping function aside from one. It is assumed that training patterns that are most alike have a high likelihood of producing a similar output.
We mentioned that linear SVM is an example of a parametric model. This is because basic support vector machines are linear classifiers. However, SVMs not constrained by a set number of parameters are considered non-parametric.

### Parametric vs Non-Parametric models

Since we can now define both parametric and non-parametric models, we compare both in this section. We then look at the benefits and limitations of both types of models.


![fit](/engineering-education/parametric-vs-nonparametric/fit.png)

*Results of parametric and non-parametric regression.*

[Source](https://medium.com/analytics-vidhya/parametric-and-nonparametric-models-in-machine-learning-a9f63999e233)

Let’s first note that the data points in the two scenarios in the image above are the same.
Recalling the equation that we described earlier, the first image illustrates the mapping function as a linear regression line. This represents a parametric model. We see the consequence of the linear function on the data. A lot of data points are ignored.
The image with a wiggly function represents a non-parametric model. As we mentioned, these algorithms make little to no guesses about the mapping function. As a result, they show great flexibility and offer a better fit to data than parametric ones.

#### Benefits

##### Parametric Models

**Simplicity.** The methods of parametric algorithms are easier to understand. The interpretability of results is also easier in comparison to non-parametric models.

**Training data.** Parametric algorithms require less training data than non-parametric ones.

**Training speed.** They are computationally faster than non-parametric methods. They can be trained faster than non-parametric ones since they usually have fewer parameters to train.

##### Non-Parametric Models

**Performance.** Non-parametric models may offer more accurate predictions since they offer a better fit to data in comparison to parametric ones.

**Flexibility.** As shown by the image above, these algorithms provide a good fit to data. They can fit many forms of a function.

**Little to no assumptions.** Little to no guesses about the mapping function are made. Compared to parametric algorithms, non-parametric algorithms learn more from data. This is because the learning of parametric algorithms may be limited by the assumptions they make.

#### Limitations

##### Parametric Models

**Form constraints.** Parametric methods constrain an algorithm to a specified functional form.

**Fit.** These methods do not offer the best fit to data. They are not likely to perfectly match the mapping function.

**Complexity.** Parametric algorithms offer limited complexity. This means that they are better suited to less complex problems.


##### Non-Parametric Models

**Overfitting.** As much as these algorithms tend to fit data much better than parametric ones, they are more susceptible to overfitting.

**Training data.** To give an estimate of the mapping function, these algorithms require much more data than parametric ones.

**Speed.** Non-parametric algorithms are slower to train since they usually have more parameters to consider for training.



### Wrapping Up

Through this article, we have introduced parametric and non-parametric models. We have noted a handful of examples of both models. Finally, we have compared how they fit given data points as well as their benefits and limitations. Until next time, good luck!

### References

1.	[Parametric and Nonparametric Machine Learning Algorithms](https://machinelearningmastery.com/parametric-and-nonparametric-machine-learning-algorithms/)

2.	[Parametric and Non-parametric Models In Machine Learning](https://medium.com/analytics-vidhya/parametric-and-nonparametric-models-in-machine-learning-a9f63999e233)

3.	[Difference between Parametric and Non-Parametric Methods](https://www.geeksforgeeks.org/difference-between-parametric-and-non-parametric-methods/)

4.	[Parameters in Machine Learning algorithms.](https://towardsdatascience.com/parameters-in-machine-learning-algorithms-ba3e3f0e49a)

5.	[Parametric vs Nonparametric models?](https://medium.com/@dataakkadian/what-are-parametric-vs-nonparametric-models-8bfa20726f4d)
