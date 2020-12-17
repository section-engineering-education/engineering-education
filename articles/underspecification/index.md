![hero](/engineering-education/underspecification/hero.jpg)

[Image Source](https://images.unsplash.com/photo-1523961131990-5ea7c61b2107?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=967&q=80)

It is common to have machine learning models perform well after training but offering poor performance after being deployed. A possible cause of this is known as underspecification. Models are supposed to simulate the real world. But, a challenge that manifests is that there is no guarantee that the model one selects is the absolute best for one's intended application or reflects best the application's logic. This article sheds light on the challenge of underspecification and how to address it.

### Contents

1. Introduction to underspecification.

2. The problem of underspecification.

3. 5 methods to address underspecification.

### Prerequisites

I recommend an understanding of machine learning. Here's an [article](/engineering-education/supervised-learning-algorithms/) that provides a gentle introduction to machine learning. I also recommend understanding how models are trained and evaluated. Here's a link to an article on the [evaluation](https://www.section.io/engineering-education/evaluating-ml-model-performance/) of models.

### Underspecification

Researchers at Google recently released this [paper](https://arxiv.org/pdf/2011.03395.pdf). It has shed light on the prevalence of underspecification. It also goes over the impact of underspecification on machine learning models. The way we approach the training of machine learning models has been challenged. We are presented with a problem. Machine learning models may generalize well during training and testing. Perform poorly after deployment. A cause of this may be the phenomenon of underspecification.

[Underspecification](https://en.wiktionary.org/wiki/underspecification) is defined as the failure to specify in adequate detail. In the context of machine learning, underspecification implies that the training phase of a model can produce a good model. It can also produce a flawed model, and it would not tell the difference. As a result, we wouldn't either. For instance, a model may have many ways to achieve the same performance on test data. This is even if the training data and model structure are the same. This may be due to underspecification.

### The problem

Underspecification threatens the credibility of models. The reliability of the process used to train models to perform in the real world as they do in training has been called into question. We usually expose a model to a lot of examples and test it on unseen data. This is the typical training process. If such models do well in testing, we consider them to be good models. Yet, this might not be the case.

Consider a scenario where we are training many similar models on the same data. These models may differ in tiny ways, such as the number of training runs or the order in which training data is put in. These nuances between the models rarely impact performance. This is why these variations are often overlooked while evaluating models. Yet, as per the findings of this [paper](https://arxiv.org/pdf/2011.03395.pdf), they may have a significant impact on a model's real-world performance.

These models may be successfully trained and tested. But if they offer poor performance after deployment, the training and testing processes are undermined. Additionally, if models use many different methods to achieve the same result, it is difficult to determine whether the result is achieved by skill or sheer luck. This unpredictability, caused by underspecification, poses a serious challenge. Deployment of such models may cost an enterprise time and money, besides a lot of frustration.

### Addressing Underspecification

On the bright side, there are ways to reduce the impact of underspecification. We cover a handful below.

#### Limiting Model Complexity

A way of addressing underspecification is limiting the complexity of a model. The complexity of modern machine learning models almost guarantees that underspecification will occur. As defined by this [post](https://machinelearningmastery.com/difference-between-a-parameter-and-a-hyperparameter/), a parameter is a configuration variable that is internal to the model and whose value can be approximated from data. A model that has many free parameters encourages underspecification. These parameters allow models to use numerous ways to achieve a prediction. This allows models to blend competent predictions with luck. It is difficult to determine which approach was skill and which was luck.

It is important to understand the proposed real-world application of a model. Consulting domain experts could do this. They could help to fine-tune the scope of the model. It could also be of great importance to work with potential users of the model. They could provide useful insights that could help the model-building process be more objective. A more objective scope would mean fewer free parameters. The model would have a greater focus on its purpose. This would, in turn, keep the model as simple as possible.

It is important to have the complexity of the model under control. The first step is understanding why we choose a specific model architecture for a given task. If we choose an architecture, it helps to consider whether there is a simpler architecture that could produce a similar result. We could also consider combining or reducing variables to limit complexity.

#### Stress Tests

Stress testing is the subjecting of machine learning models to various tests. These tests determine whether model performance is adequate under unfavorable or extreme conditions. Stress tests may help in the detection of underspecification. From this [paper](https://arxiv.org/pdf/2011.03395.pdf), we learn about three types of stress tests. Google researchers used them on their models, with various random seed values. A seed value can be thought of as a parameter that decides the sequence of generated pseudorandom numbers. [Pseudorandomness](https://en.wikipedia.org/wiki/Pseudorandomness) computes the extent to which a sequence of numbers appears to be statistically random, even though a repeatable process produces the numbers.

The three types of stress tests include:

**Stratified Performance Evaluations**. An [inductive bias](http://inductivebias.com/Blog/what-is-inductive-bias/) refers to a set of assumptions that a learner uses to make predictions given never-before encountered inputs. Stratified performance evaluations test whether a predictor encodes inductive biases that give similar performances across different dataset classes. This is done by first choosing a particular feature then grouping a test dataset into sub-groups(strata). Through the use of a performance metric, different values of the features chosen are compared across the sub-groups. These tests consider sub-groups of observations to identify inequalities.

**Shifted Performance Evaluations**. Shifted performance evaluations evaluate whether the average performance generalizes when the test-set distribution is different from the training set distribution. This is done by spawning a made-up test distribution. This made-up distribution is created by deliberately causing perturbations on data. The perturbations are to keep track of the behavior of the model.

**Contrastive Evaluations**. These tests manipulate an input observation to compute the significance of the effect on the output. These evaluations support localized analysis of specific inductive biases. They are performed on an example/observation as opposed to data distribution. The goal is to check whether modifying a given input causes the model's output to change in unanticipated ways. This is similar to [contrastive explanations](https://arxiv.org/pdf/1802.07623.pdf), which go a step further to explain why an observation has a certain outcome as opposed to a targeted outcome. Contrastive explanations explain a model's result, hence playing a part in achieving [explainable AI](/engineering-education/explainable-ai/). They help us identify what should be present to justify the classification of an input example as well as what should be absent, to give a complete explanation.   

These stress tests are of great use. They highlight cases where models are unsuccessful at generalizing as needed for deployment. You can learn more about these three stress tests by reading this [paper](https://arxiv.org/pdf/2011.03395.pdf).

#### Improving Training and Testing Processes

Underspecification presents an argument that suggests that the way we train our models needs a lot of improvement. As a response to this argument, there are a couple of approaches worth considering. First, we could ensure that we have a test-set that represents a real-world environment. We could also make sure that our training data is as close to a real-world distribution as possible. Let's expound on the two approaches.

##### Test Set Reflecting Deployment Environment

Drawing sets of data from the same population contributes to underspecification. Specifically, drawing the test and training sets (as well as validation sets) from the same population. A test set and training may be from the same distribution. But, if the sets do not reflect a real-world environment, the model's deployment will offer disappointing results. To curb this, we may use a common approach of having (at least) two different sets of data. For example, we could use test data that best reflects our intended deployment environment to evaluate our model.

##### Training Data as Close to Real-World Distribution

The training process may be improved by ensuring that training data is close to the distribution one would expect to exist in the real world.

The standard process of training a model involves exposing the model to many examples. After this, it is tested on several similar examples that it has never encountered before. A model will be deemed successful after generalizing well during the testing phase. However, when we have training data that does not reflect a real-world environment, we can expect a model to predict poorly when deployed.

It might not always be possible to get data that truly mirrors real-world scenarios. In such a case, one may have to draw testing data from the training set. This can be done by splitting data into training, validation, and test sets at random. After splitting, the test data can be perturbed deliberately. This is to better represent a real-world environment. You can delve deeper into how various perturbations are carried out from this [paper](https://arxiv.org/pdf/2011.03395.pdf).

#### Multiple Choice

Another possible method to mitigate underspecification is having a choice of many models. These models can be trained on real-world problems and select the best one for the task. As described by this [post]( https://www.technologyreview.com/2020/11/18/1012234/training-machine-learning-broken-real-world-heath-nlp-computer-vision/), we could add an extra stage after training and testing. This stage can be responsible for generating numerous models as opposed to a single one. Since this would be after testing and training, these models would be re-tested on real-world tasks. The generated models would compete to determine which performs best.

However, this could prove to be both difficult and expensive to actualize. But for companies that can build as well as deploy large models, it could be feasible. For example, consider a given real-world computer-vision problem to be solved. One of these companies could release about 30 variations of a computer-vision model. This would benefit data scientists, engineers, developers, among others. It would allow them to select the model that best fits their problem and produces the best results.

#### Tracking Modeling Choices

There are many subtle choices and nuances to models that are often overlooked during evaluation. Consider a choice such as the number of training runs. Or the use of random input variables. Such choices could have similar models trained on the same data resulting in different models. These nuances may be overlooked if they do not affect the performance of a model. However, they may lead to very varied performance after deployment. Simply put, the processes used to develop models fails to tell us which models will perform well after deployment and which will not.

As a result of this, it would be wise to keep track of our modeling choices. For example, the kind of model in use or input data. When we suspect that underspecification is manifesting, we could tweak our choices, such as the inputs. This would be in an attempt to achieve satisfactory real-world results.

### Wrapping Up

Underspecification has a massive impact on machine learning as a whole. It has challenged how we train our models. We have seen the contrast between model development and deployment. It is common for a model to ace training and testing stages but struggles to replicate the successful results in the real-world. Underspecification may contribute to such an outcome. There are ways to reduce the effect of underspecification. We have explored a few, which I hope are helpful. I'd also encourage you to read this [paper](https://arxiv.org/pdf/2011.03395.pdf). It gives an in-depth understanding of Google's findings on underspecification. It covers the implications of the findings to machine learning and deep learning. Until next time, cheers!

### References and Further Reading

1. [The way we train AI is fundamentally flawed](https://www.technologyreview.com/2020/11/18/1012234/training-machine-learning-broken-real-world-heath-nlp-computer-vision/)

2. [Google Researchers Say Underspecification is Ruining Your Model Performance. Here's Five Ways to Fix That](https://blog.roboflow.com/google-paper-underspecification-machine-learning/)

3. [Underspecification Presents Challenges for Credibility in Modern Machine Learning](https://deepai.org/publication/underspecification-presents-challenges-for-credibility-in-modern-machine-learning#:~:text=Underspecification%20Presents%20Challenges%20for%20Credibility%20in%20Modern%20Machine,return%20many%20predictors%20with%20equivalently%20strong%20held-out%20)

4. [AI Hype: What Does Google's `Underspecification` Bombshell Mean For Machine Learning Credibility?](https://medium.com/making-ai-make-money/ai-hype-what-does-googles-underspecification-bombshell-mean-for-machine-learning-credibility-4c8d6594b5f6)

5. [Deep Learning Underspecification and Causality](https://medium.com/intuitionmachine/deep-learning-underspecification-and-causality-bf762f118780)

6. [Underspecification in AI](https://www.datascienceexamples.com/underspecification-in-ai/)
---
Peer Review Contributions by: [Lalithnarayan C](/engineering-education/authors/lalithnarayan-c/)
