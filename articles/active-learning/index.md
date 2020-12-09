![hero](/engineering-education/active-learning/hero.jpg)

[Image Source](https://images.unsplash.com/photo-1546410531-bb4caa6b424d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1051&q=80)

By nature, machine learning models are data-hungry. They require a lot of data to make decisions. However, always having high quality labeled data to train models is often a costly task. An answer to this would be to use an approach that can reduce the amount of training data needed to train a model. Active learning is such an approach.

### Contents

1. Introduction to active learning

2. Steps to use active learning on unlabelled data

3. Three active learning frameworks

4. Query strategies

### Prerequisites

This article requires an understanding of supervised learning, in addition to machine learning in general. This [article](https://www.section.io/engineering-education/supervised-learning-algorithms/) may be of help with the mentioned prerequisites.

### Active Learning

In supervised learning, a great amount of labeled data is needed for training. However, we might encounter a situation where we have a large pool of unlabelled data. To apply a supervised algorithm on such data, we would need to label every instance. However, this would be a tedious, time-consuming, and expensive process.

However, there exists a semi-supervised approach that would allow us to label a few data examples to train a model and still achieve great precision. This is active learning. Active learning describes an approach where data that needs to be labeled to train a model is prioritized. Specifically, the data that is prioritized has the highest impact on the performance of a model. Prioritizing informative data allows one to train a model on such data as opposed to training it on the whole dataset. We describe this approach as semi-supervised since unsupervised learning approaches consider unlabelled data while supervised ones prefer a fully labeled dataset. Active learning does not need a fully labeled set. Active learning involves the use of an oracle. In this context, an oracle is the information source. That is an entity that is capable of labeling data examples when the learner cannot. This is often a human expert.

To understand this type of learning further, let’s look at the process of carrying out active learning on an unlabelled dataset.

### Steps

To use active learning on an unlabelled dataset, there are a number of common steps to consider:

1. Firstly, a tiny portion of the training data needs to be manually labeled.

2. The model would then need to be trained on this portion of labeled data. The essence of doing this is not to achieve the best performance but rather an insight. This allows one to understand which sections of the parameter space need to be prioritized in terms of labeling to improve the model.

3. After training is completed, the learner is then tasked to predict the class of each of the unlabelled examples.

4. Unlabelled datapoints are scored in terms of their informativeness. We shall discuss how this informativeness is evaluated later on.

5. This process may be repeated once the best strategy to carry out labeling has been selected. A new labeled dataset may be used to train a new model. A query strategy may be used to determine the approach to label this new set. We shall explore these strategies later. The iteration allows one to optimize the labeling approach, as the models improve with each iteration.

### Active Learning Frameworks

There exist three main frameworks of active learning. Let’s introduce them.

#### Stream-Based Selective Sampling

This is an active learning technique where training examples are sent to an algorithm in the form of a stream. The algorithm receives individual training examples for consideration. The informative value of each training example is evaluated. The algorithm is then to immediately decide whether to label a given example or query the oracle to label the example. Let’s look at the image below to intuitively understand this technique.

![stream](/engineering-education/active-learning/stream.png)

*Stream-Based Sampling*

[Source](https://www.datacamp.com/community/tutorials/active-learning)

From the image, we can see that the learner first observes an example, then decides whether to query the oracle or discard the example.

As mentioned above, the decision to select an example can be determined by the informativeness of the example. To determine the informative value of an example, one can use a query strategy. We shall discuss them later on.

#### Pool-Based Sampling

For numerous real-world machine learning problems, we can collect large collections of unlabelled data at once. This is a motivating factor behind pool-based sampling. It makes an assumption that there is a sizeable pool of unlabelled data. Pool-based sampling tries to evaluate an entire dataset before choosing the best set of examples. This process involves identifying the informativeness of all provided examples then selecting a given number of examples to train a model.

![pool](/engineering-education/active-learning/pool.png)

*Pool-Based Sampling*

[Source](https://www.datacamp.com/community/tutorials/active-learning)

The image shows that the learner observes examples and selects the most informative ones.

While stream-based sampling goes through data in a sequential manner, pool-based sampling evaluates the entire set then ranks the examples. Stream-based technique makes query decisions in an individual sense, that is, considering a single example at a time. The pool-based method selects the best queries after ranking. This is the difference between pool-based and stream-based sampling.

#### Membership Query Synthesis

In this approach, the learner has the ability to create its own examples for labeling. These examples are based on the training examples to maximize the effectiveness of learning.

For instance, the data may be images of letters. The learning agent may generate an image akin to a single letter. The generated image may be oriented in a different way such as being rotated by a certain degree. Or a portion of the letter may be left out. This is then sent to the oracle for labeling.

The image below represents this process.

![membership](/engineering-education/active-learning/membership.png)

*Membership Query Synthesis*

[Source](https://www.datacamp.com/community/tutorials/active-learning)

However, since this approach involves the generation of examples, it may prove to be awkward for a human annotator as the oracle. Consider a scenario where the learner attempts to classify handwritten characters. The learner may generate images of artificial symbols that cannot be recognized. It can generate symbols with no semantic meaning. For natural language processing tasks, it may generate segments of text that are no more than gibberish.

### Query Strategies

The three techniques covered in the previous section evaluate the informativeness of unlabelled examples. This evaluation is through the use of query strategies. We explore a few query strategies in this section.

#### Least Confidence

Simply put, the learner chooses an example for which it has the least confidence in the most likely label to be assigned to it. Let’s use an example to understand this strategy better.

Let’s have instances C1 and C2. Each of these instances has probability values across three labels. C1 has a probability of 0.8, 0.17, and 0.03 across labels 1, 2, and 3 respectively. C2 has 0.25, 0.45 and 0.3 across labels 1, 2 and 3.

C1 has a probability of 0.8 for Label 1. This means that the learner is confident that C1 should be labeled 1. This is in comparison with 2 and 3, with probabilities of 0.17 and 0.03 respectively. When it comes to C2, the learner is less sure about its label. The probabilities are 0.25, 0.45, and 0.3. The probabilities are closer to each other compared to the case of C1. The learner cannot for certain determine the correct label for C2. The learner would think that C2 should be labeled 2, but a probability of 0.45 does not demonstrate confidence.

Using the least confidence method, the learning agent would choose C2 in order to query the oracle for its true label.

#### Margin Sampling

Least confidence considers the most likely label while disregarding the probabilities of other labels. This is a downside of the least confidence strategy. Margin sampling attempts to overcome this shortcoming. It does this by choosing the example with the tiniest difference between the most and second most probable labels. Let’s use our previous example to show this.

Once more, C1 has a probability of 0.8, 0.17, and 0.03 across labels 1, 2, and 3 respectively. C2 has 0.25, 0.45 and 0.3 across labels 1, 2 and 3. Considering C1, the most probable label is 1, with a probability of 0.8. The second most probable label is 2 with a probability of 0.17. The difference between the two probabilities (0.8 -0.17) gives us 0.63. As for C2, we get 0.45 – 0.3, which is 0.15.

As per the results of getting the differences, C2 will be chosen for querying of its label.

#### Entropy Sampling

Entropy refers to the quantity of uncertainty of a random variable. It is possible to calculate the entropy of the predicted label probabilities. If the probability distribution of the examples is uniform, the level of uncertainty is higher. Higher levels of entropy show that there is great uncertainty in the probability distribution.

In each step of active learning, the learner calculates entropy using the predicted label probabilities. This is done for every unlabelled example in the training data. The learner then chooses the example with the greatest entropy. Such an example is one in which the learner is least certain about which class it belongs to.

To learn more about entropy, here’s a short post about [Shannon Entropy](https://uol.de/en/lcs/probabilistic-programming/webchurch-and-openbugs/shannon-entropy/) that explains the theory and calculation of entropy.

### Closing

Active learning allows us to use large unlabelled datasets while avoiding the prospect of having to label every single instance in the set. This reduces the tedium associated with data labeling. A lot of time, effort as well as financial resources are saved through this approach. We have gone through an introduction to active learning. I hope that the concepts we have covered will help you with your machine learning journey. Happy reading!

### References and Further Reading

1. [Active Learning Literature Survey](http://burrsettles.com/pub/settles.activelearning.pdf)

2. [What is Active Learning?](https://blog.roboflow.com/what-is-active-learning/)

3. [Active Learning in Machine Learning](https://towardsdatascience.com/active-learning-in-machine-learning-525e61be16e5)

4. [Introduction to Active Learning](https://towardsdatascience.com/introduction-to-active-learning-117e0740d7cc)

5. [Accelerate Machine Learning with Active Learning](https://becominghuman.ai/accelerate-machine-learning-with-active-learning-96cea4b72fdb)

6. [Active Learning Tutorial](https://towardsdatascience.com/active-learning-tutorial-57c3398e34d)

7. [Active Learning: Curious AI Algorithms](https://www.datacamp.com/community/tutorials/active-learning)

8. [Active Learning as a Way of Increasing Accuracy](http://www.ijcte.org/papers/910-AC0013.pdf)

9. [Entropy: How Decision Trees Make Decisions](https://towardsdatascience.com/entropy-how-decision-trees-make-decisions-2946b9c18c8)

10. [Active Learning Sampling Strategies](https://towardsdatascience.com/active-learning-sampling-strategies-f8d8ac7037c8)

11. [Active Learning as a Way of Increasing Accuracy](http://www.ijcte.org/papers/910-AC0013.pdf)
