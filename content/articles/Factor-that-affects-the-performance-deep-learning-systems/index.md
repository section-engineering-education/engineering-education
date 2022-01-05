### INTRODUCTION
Deep learning neural networks are becoming easier to define and fit, but they remain challenging to configure. 
This is because there are no hard-and-fast rules for configuring a network to tackle a specific problem. This is the case were mathematical analysis cannot be used to determine which model type or setup is appropriate for a given dataset. 

In the past, deep learning neural network models had to be coded from scratch. As a result, the accuracy rate of the system was poor. 
Nowadays, when given raw data, a deep learning system can now determine which properties are the most important on its own. 

[Artificial neural networks](https://www.simplilearn.com/tutorials/deep-learning-tutorial/multilayer-perceptron) are used to perform deep learning. 
The first step towards improving deep learning performance is to figure out what kind of performance issue your system is having.
After identifying the problem, carefully pick and assess a specific intervention that is appropriate for the problem.

There are three sorts of concerns that are straightforward to diagnose when it comes to poor deep learning performance:

Poor performance or becoming stuck are both possible outcomes of problems with hyper-parameter optimization (i.e. challenges from learning rate).
Having issues with data optimization is a common occurrence.

Generalization can result in overfitting or poor test set performance, for example, 
More data is required if you want your system to perform better. Depending on your budget, you may want to acquire additional unlabeled data and train your feature extraction sub-model further.

Tuning the algorithm, which is essentially a prediction problem on the final model, when the final model contains a lot of volatility, for example. 

The [best way](https://machinelearningmastery.com/a-data-driven-approach-to-machine-learning/) to solve this is to rank the outcomes of all your trials and focus on the top algorithms.

### Table Of Content
- [Introduction](#INTRODUCTION)
- [Prerequisites](#Prerequisites)
- [The Concept of Deep Learning](#The-Concept-of-Deep-Learning)
- [What are optimizers](#What-Are-Optimizers)
- [Some Determinants That Transform Deep Learning Systems’ Performance](#Some-Determinants-That-Transform-Deep-Learning-Systems-Performance)
- [How To Get A Perfect Performance Rate From A Deep Learning System](#How-To-Get-A-Perfect-Performance-Rate-From-A-Deep-Learning-System)
- [Diagram demonstrating the different scenarios one can fall into when configuring the learning rate](#Diagram-demonstrating-the-different-scenarios-one-can-fall-into-when-configuring-the-learning-rate-.)
- [Conclusion](#Conclusion)
- [Further Reading](#Further-Reading)

### Prerequisites
To follow along with this tutorial, you need to be familiar with the following;
- Programming Languages like Python, Java, C++
- Calculus
- Probability
- Statistics
- Linear Algebra
- [TensorFlow](https://www.tensorflow.org/) 
- [Microsoft Cognitive Toolkit](https://docs.microsoft.com/en-us/cognitive-toolkit/) 
- [Pytorch]( https://pytorch.org/) 
- [Keras]( https://keras.io/about/)

### The Concept of Deep Learning
In deep learning, an excessive volume of information [data sets](https://www.simplilearn.com/what-is-data-article) can be trained at the same time. This uses learning algorithms in deep learning. Deep learning systems tend to gather functional facts from larger datasets. This fact helps in enhancing predictions in the system more accurately. 

Classifications and predictions of data are based on responses to a series of binary true or false questions involving highly complicated mathematical calculations while processing the data. This simply means a deep learning system algorithm is designed in such a way that it can easily recognize/predict and collect similar data sets or reject the data sets that does not fit the needed system model during the training of data sets.
>**True** in this context means that the system's algorithm accepts the data to match the type of data needed to develop the required system while **False** means that the system's algorithm has rejected such data as it doesn't match the requirements.

A facial recognition algorithm, for example, learns to detect and recognize face edges and lines, then more significant aspects of the faces, and finally overall representations of faces. The algorithm learns and improves with time, increasing the likelihood of getting it right. In this situation, the facial recognition software will recognize faces properly over time. Picking up the precise contour of everything's face will result in the collection of a larger number of datasets (big data) and an accurate extract result.

This example shows that an excessive volume of data is needed to predict a deep learning system accurately.

The ability to fine-tune the system and consider the problem it is going to be used to solve are two enhancing variables in Deep Learning. Any optimizer’s accuracy is measured using these factors.
### What Are Optimizers?

In deep learning, Optimizers are algorithms or approaches that are used to reduce an error function [(loss function)](https://shiva-verma.medium.com/understanding-different-loss-functions-for-neural-networks-dd1ed0274718)  or increase production efficiency.  Optimizers are mathematical functions that are based on the learnable parameters of a model, such as weights and biases. Optimizers assist in determining how to alter the weights and learning rate of a neural network to minimise losses. 
>A `loss function`of a system calculates the difference between the current results and the expected results of the algorithm.
### Some Determinants That Transform Deep Learning Systems’ Performance
#### Taking into account the issue of (considered problem) that the system will be tasked with resolving; 
a) What kind of system should be built?

 In such a problem, the engineer is faced with challenges like; 
- The size of the system about to be developed.
- The amount of datasets the required to develop the needed system. 
- How does the size of the system affect the performance of the system.

b) How will the developed algorithm handle the immediate user’s demands?

In such a problem, the engineer is faced with challenges like, picking the best optimizer that will produce accurate results. By doing this, the problem of loss function will be minimized.

c) How easily will re-engineering be made possible?

In such a problem, the engineer is faced with challenges like; Will the developed system adapt to further changes in the future without affecting the performance of the system. 

#### Evaluation difficulties of default hyperparameters for multiple optimisers.
Hyperparameters are values that control the learning process and define which model parameters a learning algorithm learns.They are 'top-level' parameters that regulate the learning process and the model parameters that come from it, as the prefix 'hyper_' implies. 
 
Poor [accuracy](https://sigopt.com/blog/common-problems-in-hyperparameter-optimization/) is obtained here as a result of low awareness from training the system data sets.
In the adaptable deep system technique, [Adam optimizer](https://machinelearningmastery.com/adam-optimization-algorithm-for-deep-learning/) is the most extensively used adaptive optimizer. 

#### Technical experience in deep learning system network design.
The demand and need for deep learning experts is highly recommended here. Experience is needed to increase the learning rate and improve the system's performance.

#### Which optimiser suits the deep network best?
The optimizer that will perfectly match your deep learning system or model is highly considered. If the optimizer picked to train your system isn't a perfect match, such a system will encounter errors such as overfitting, underfitting, loss gradient descent, and so on, thereby not achieving an accurate output.
 
### How To Get A Perfect Performance Rate From A Deep Learning System
>The performance rate of a deep learning system is focused on vision and pattern recognition.
#### Data Optimization

If your objective is [classification](https://towardsdatascience.com/machine-learning-classifiers-a5cc4e1b0623), one of the simplest ways to improve performance for underperforming deep learning system is to balance your dataset. Real-world data sets are frequently skewed, and if you want your deep learning system to learn with the greatest accuracy, you'll need to apply structured thinking to the problem, which is a thinking process that considers all of the conceivable elements of a problem.

The process of predicting the class of a set of data points is known as __*classification*__.

In data optimization, a few factors are considered like;

1.`The need for additional datasets into the deep learning system:`
Having more depth of knowledge about a system model is the best savage for accuracy in deep learning. Allow the additional facts to speak for themselves rather than relying on assumptions and questionable relationships. Models that have more data are more accurate and better. In such a situation as this, Individauls do not have the ability to add more data. In some projects, for example, we don't have the option of increasing the training data size. However, if you're working on a company project, It is strongly advisible that you to ask for more details if it's possible. As a result, working with small data sets will be more straightforward. As a result of these modifications, the training set's overfitting is decreased.

#### Algorithm Tuning 
Parameters are known to drive deep learning algorithms. The result of the learning process is heavily influenced by these variables. Parameter tuning is the process of determining the best value for each parameter in order to increase the model's accuracy. To fine-tune these factors, you must first grasp their meaning and how they affect the model individually. This technique can be repeated with a variety of successful system models.
It's impossible to predict which deep learning algorithm will suit your system the best.

When presented with a new situation and don't have access to a deep research method that can quickly be of assistance in achieving the required objectives, it is best to look at a few options and attempt them all. Deep learning (CNNs, RNNs, and so on) and traditional machine learning techniques such as [Random Forests, Gradient Boosting]( https://www.analyticsvidhya.com/blog/2015/06/tuning-random-forest-model/) , and so on.
Rank the outcomes of all your trials and focus your efforts on the best-performing algorithms.

#### Hyper-Parameter Optimization
The key challenge here is fine-tuning the hyperparameters of the deep network. Because the output's accuracy is in question, this is a challenging task. 

Factors like those listed below are considered;

1.`Learning Rate:`
The learning rate is a hyper-parameter that determines how much the weights of our network are adjusted in relation to the expected error each time the system weights are updated (loss gradient).

According to [research](https://optimization.cbe.cornell.edu/index.php?title=Adam/) , the Adam optimiser delivers the greatest and highest performance rate for large systems with enormous datasets. The ability to outperform other methodologies is lacking (optimisers). On all deep learning problems, it frequently produces remarkable results. Despite its excellent performance, it may nonetheless trap you in a local minimum that is specific to your problem. Stochastic Gradient Descent with Warm Restarts is an even better approach that has the benefits of Adam and helps eliminate the danger of obtaining something at a local minimum.

2.`The number of epochs and the batch size:`
The batch size refers to the number of samples that must be processed before the model may be updated. The number of epochs refers to the total number of times the training dataset has been traversed.

To ascertain a perfect and accurate system output, it is best to implement the use of a large batch size with a large number of epochs. Common tactics provide common outcomes. Experiment with batch sizes and training epochs to see what works best for you.

3.`Coming to a premature conclusion during model training:`
The difference between the empirical loss of the training set and the expected loss of the test set is the **Generalization error** of a deep learning system/model.

[Generalization](https://deepai.space/what-is-generalization-in-machine-learning/) errors are positively affected in a session. Continuous training may improve accuracy on your data set, but it eventually reduces the model's performance on data it hasn't seen. Early halting can help with real-world performance. 
For examples, [click here](https://stats.stackexchange.com/questions/231061/how-to-use-early-stopping-properly-for-training-deep-neural-network). 

4.`Regularization:`
Regularization is a reliable strategy for avoiding overfitting.

You can train your deep learning project in a few different ways to apply regularization. If you haven't already, incorporating these techniques into every project you work on is best. 
 
1. They switch off a percentage of neurons at random during training, which is known as __*dropout*__. Dropout is a technique for preventing groups of neurons from overfitting one another.
2. `Weight penalty L1 and L2:`Weight penalty is a technique for reducing overfitting of a deep learning neural network model on training data while also improving the model's performance on new data.

   In deep learning, weights that expand in size can be a major concern and degrade accuracy. Adding all of our parameters (weights) to our loss function is one method to penalize complexity. That won't work because some of the parameters are positive while others are negative. The problem can be remedied by making changes to the learning algorithm to encourage the network to keep its weights low. This is known as __*weight regularization*__ and is regarded as a general method for reducing training dataset overfitting and increasing model generalization.

   Check out the [different methods on how to penalize and control larger weights](https://machinelearningmastery.com/weight-regularization-to-reduce-overfitting-of-deep-learning-models/). 
#### Ensemble Methods
 This method essentially aggregates the output of several poor models to obtain superior results. This can be accomplished in a variety of ways:

1.Bagging (Bootstrap Aggregating)

2.Boosting

A common strategy for decreasing variation in a noisy dataset is __*Bagging*__.
The practice of picking and replacing a random sample of data from a training batch is known as bagging. As a result, each data point can be chosen multiple times.

__*Boosting*__ is an ensemble learning approach that combines a collection of weak learners into a strong learner to reduce training errors. A random sample of data is picked, a model is fitted, and the models are then trained progressively, with each model aiming to correct for the flaws of the one before it.
To improve the accuracy of your model, it's always a good idea to use ensemble approaches. 

This is for two reasons: 
- They are often more complicated than traditional procedures. 
- Traditional approaches provide a wonderful starting point from which you can improve and gain inspiration for your ensembles.

>[Check out](https://www.analyticsvidhya.com/blog/2015/08/introduction-ensemble-learning/) for more information regarding ensemble methods.

### Diagram demonstrating the different scenarios one can fall into when configuring the learning rate.

![Display Rate Charts](engineering-education/Factor-that-affects-the-performance-deep-learning-systems/display_rate_charts.png)

[Leslie N. Smith](https://arxiv.org/abs/1506.01186) argued that you could estimate a good learning rate by training the model initially with a very low learning rate and increasing it (either linearly or exponentially) at each iteration.

>Note; Less training time, lesser money spent on GPU cloud computation.

![Iteration chart](engineering-education/Factor-that-affects-the-performance-deep-learning-systems/iteration.png)

 If at each learning iteration recorded,  plot the learning rate (log) against loss; we will see that as the learning rate increase, there will be a point where the loss stops decreasing and starts to increase. In practice, our learning rate should ideally be somewhere to the left to the lowest point of the graph (as demonstrated in below graph). In this case, 0.001 to 0.01.

![Learning Rate Chart](engineering-education/Factor-that-affects-the-performance-deep-learning-systems/learning_rate_scale.png)
 
### Conclusion
With the vast and rapid development of technology, deep learning is the key to today’s smart world. This has brought an ease in communication between humans and their daily environment. There are some difficulties in understanding the deep learning system algorithm.

Some real-life postulates are cited to help design the deep network algorithm.
There are some factors that affect the performance of  deep learning systems. These factors tend to reduce the accuracy level of the system: These factors include: 
- Considered a problem i.e., the type of deep learning system to be developed.
- Evaluation difficulties of default hyperparameters for multiple optimisers.
- Technical know-how
- Which optimiser suits the learning algorithm best?

There are some steps to aim at in order to achieve a perfect performance rate in a deep learning system. Factors like;
- Data Optimization.
- Algorithm Tuning.
- Hyperparameters Optimization
- Ensemble methods

### Further Reading
- [Convolutional Neural Networks (CNN)]( https://towardsdatascience.com/applied-deep-learning-part-4-convolutional-neural-networks-584bc134c1e2) 
- [Hyperparameter Optimization]( https://towardsdatascience.com/hyperparameter-optimization-for-optimum-transformer-models-b95a32b70949) 
- [Performance rate improvement in deep learning]( https://machinelearningmastery.com/improve-deep-learning-performance/) 
