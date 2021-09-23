---
layout: engineering-education
status: publish
published: true
url: /explainable-ai/
title: Explainable AI - An Introduction
description: This article will go over explainable AI which refers to the concept of how AI works and how it makes decisions. Explainable AI is concerned with explaining input variables and the decision-making stages of a model.
author: collins-ayuya
date: 2020-10-22T00:00:00-11:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/explainable-ai/hero.jpg
    alt: Explainable AI example image
---
AI-powered systems have a lot of influence on our daily lives. A number of these systems are so sophisticated that little to no human intervention is required in their design and deployment. These systems make a lot of decisions for us every single day. They make many decisions that affect human lives (for example, in medicine, finance, law, and defense). The question of how they make these decisions is often not explained.
<!--more-->

### Introduction
There is a growing need to understand how these systems make decisions. We will be exploring the need for an explainable AI (XAI). By explainable AI, we are referring to the concept of how AI works and how it makes decisions being made clear to humans.

#### Table of Contents
1. Defining explainable AI.

2. Need for explainable AI.

3. A few use cases of explainable AI.

4. XAI techniques.

5. Challenges to achieving explainable AI.

#### Prerequisites
To get the most from this article a basic understanding of artificial intelligence concepts will be useful. To better understand basic machine learning (ML) concepts check out this [article](/supervised-learning-algorithms/). Other concepts of machine learning and deep learning are also covered [here](/automated-fake-news-detection/).

#### Useful Terminology
**Black box model** – a data mining and machine learning model whose internals are not interpretable to humans. The model internals is unknown to the observer. This could also be a proprietary model.

**Neural network** – a series of algorithms modeled on the human brain used to identify underlying data relationships.

**Recurrent Neural Network** - a neural network containing loops that allow information to be stored within the network.

**Deep learning** – a subset of machine learning where neural networks imitate how human beings gain various types of knowledge and learn from large quantities of data. Deep learning uses multiple layers (within the neural networks) to extract higher-level features from raw input.

**Attention mechanism** – can simply be described as the methods used by neural networks to know where to look as they try to predict parts of a sequence and perform their required tasks.

### Explainable AI
Machine learning is the most common application of artificial intelligence. We incorporate aspects of machine learning in our lives every day. Consider virtual personal assistants like Siri or Alexa.

Applications like GPS navigation services and product recommendations all use ML. Yet, in business or a regulatory context, there is a belief that machine learning models are opaque or difficult to understand.

Oftentimes there is little to no information given, about how predictive models make predictions and make decisions. The issue of bias in machine learning models also adds to the challenge of being opaque. For example, a machine learning model can decide whether you get a financial loan or not.

It may not have to explain how it arrived at a given decision. A model may allocate above-average insurance premiums to an individual without any transparency on how that decision was made.

Furthermore, one may never know if the model has inherent biases. In some of these scenarios, it would help to know why an algorithm denied your loan application. Or understand why it is allocating you higher than average insurance premiums. This is where Explainable AI (XAI) comes into play.

Explainable AI refers to the concept of how AI works and how it arrives at those decisions being made clear to humans. Explainable AI is concerned with explaining input variables and the decision-making stages of a model. It is also concerned with the structure of the models themselves.

### Need for Explainable AI
#### Decision Support Systems
We need to understand how these systems arrive at their decisions. Especially, when dealing with systems that make life-changing decisions that can range from job opportunities to access of various financial services (like getting mortgages). A high-stakes example of a system with great responsibility is [COMPAS](https://en.wikipedia.org/wiki/COMPAS_(software)).

It is a decision support tool that assesses the sentencing and parole of convicts. Imagine having your freedom determined by such a system, without a clear explanation of how a decision was made. COMPAS was also found to exhibit bias, that we'll cover in the next point.

#### Human Factor and AI Frameworks Exhibiting Bias
A huge selling point of machine learning algorithms is that they aim to remove human intervention from various processes. We trust that these AI systems are fair, accurate, and objective. However, what we fail to consider is that they are created by human beings. Human beings possess various biases.

It is very easy for creators of machine learning models to impart such biases into the models. As mentioned above, COMPAS was found to be guilty of [racial bias](https://www.propublica.org/article/machine-bias-risk-assessments-in-criminal-sentencing). It was meant to determine which inmates were least likely to recommit offenses.

However, it ended up inaccurately flagging black inmates as a higher risk to re-offend when compared to white inmates. If an algorithm is to determine your freedom, it is only fair that you get to know how the decisions were made.

Another example case of bias involved a digital application for mortgages. This algorithm was said to charge credit-worthy minorities [higher interest](https://www.americanbanker.com/news/werent-algorithms-supposed-to-make-digital-mortgages-colorblind) rates than white applicants. Explainable AI would help reduce these incidents of bias.

If similar algorithms offered clear explanations on why the rates were decided upon, some of the consequences of bias would be contained before wreaking widespread harm. The bias would be easier to pick up. The algorithms would be fine-tuned to provide better and fairer experiences to all users.

I recently wrote an article on bias in machine learning and how to handle it. To get a better understanding of bias, check it out [here](/handling-bias-in-machine-learning/).

#### Models are More Complex and Unpredictable
AI methods are usually either simple or complex. Simple methods are often rule-based and explainable. For example, a [decision tree](https://towardsdatascience.com/decision-trees-in-machine-learning-641b9c4e8052) model. This is a tree-like graph that splits a data set based on differing conditions. It is commonly used in classification problems, though it is also used for regression tasks. This type of model is very easy to understand and visualize for the user.

On the other hand, complex methods are designed without explainability in mind. These methods often provide greater performance than simple AI methods. They are not designed to be interpretable. Let's explain how complexity increases with an example of a random forest algorithm that consists of 1000 decision trees. Compare it to a simple decision tree. The processes of a simple decision tree are easy to follow but the decision tree will not be ideal at uncovering complex patterns in data due to its simple nature.

A random forest algorithm with 1000 decision trees will be 1000 times more complex than a basic decision tree. This allows it to identify much more complex patterns in data as it can handle many more possibilities compared to a basic decision tree. The result of identifying more patterns in data has increased accuracy. However, attempting to analyze such a model would prove to be a difficult task.

This would require that we take a look at each decision tree to understand what data patterns it identified. For a single decision tree, this would be easy to do, and therefore very explainable. For 1000 of them, that's a different story all together.    

Consider deep learning models such as neural networks. These are some of the least explainable or most complex algorithms available today. One may use deep learning algorithms to get greater accuracy compared to interpretable models like decision trees or linear regression models. But, interpretability becomes more complex.

Here's why. Keep in mind the reasoning we used when comparing a decision tree and a random forest algorithm. A neural network has several layers. There are input layers, hidden layers, and output layers. All these layers are fully connected to one another through neurons. Every neuron is connected to every neuron in all adjacent layers. Check out this [post](https://medium.com/@srnghn/deep-learning-overview-of-neurons-and-activation-functions-1d98286cf1e4#:~:text=The%20term%20%E2%80%9Cdeep%20learning%E2%80%9D%20is%20coined%20for%20machine,multiplied%20by%20values%20called%20%E2%80%9Cweights%E2%80%9D%20and%20added%20together.) for a more in-depth description of the architecture of a neural network.

In a situation where you have a large number of inputs, there will also be many neurons in the input layer. If you have many hidden layers in the network, it means that there will be a large number of neurons interacting between the input layer and hidden layers. They also have to interact with the output layer neurons. Imagine attempting to explain the decision making of such a model where every single neuron is connected to every neuron in the adjacent layers. It is unfeasible.     

Furthermore, the size and complexity of problems being solved by AI keep increasing in number and scoper. The computational power accessible to algorithms keeps increasing as well. These are key factors influencing the advancement of artificial intelligence.

Drawing from our explanation of the complexity of neural networks, and considering the two factors for the advancement of deep learning, we understand that these complex methods are becoming even more unpredictable. If you are dealing with a neural network whose complexity increases tenfold annually, its explanations will become foggier. This is the trade-off between explainability and performance.

#### Social Repercussions of AI Choices
Some of the consequences of the choices of AI have the potential to cause upset in a social sense. Looking deeper, the consequences could be that of a cultural impact as well as an ethical one. For example, we have mentioned how AI can exhibit bias.

Due to relevance, let’s further consider racial bias. In our current times, racial bias has the potential to cause societal uproar. This is a very sensitive area today, as we have seen with protests and various movements recently. This could potentially put AI as a whole under greater scrutiny, which could be both positive and negative. A negative would be generalizing that AI is just as troublesome as humans, thus overshadowing the good AI has achieved. The positives could be a much more inclusive and involved conversation on AI, ethics, and how to improve them both as a whole.

### Explainable AI Use Cases
#### Fraud Detection
Explainable AI is particularly useful in fraud detection. The goal would be to not only predict fraudulent transactions but explain why transactions are fraudulent. Traditional machine learning approaches would only predict a fraudulent transaction. The involvement of explainable AI would provide a human understandable explanation as to why a transaction was deemed fraudulent.

In the case of a prediction error by the system, it would be easier to understand why it happened and how to resolve it. This would ease the frustrations of users who are wrongfully deemed to have committed fraud.

#### Online Recommendations
A key application of machine learning is making recommendations to users. We receive product recommendations every day. Traditional machine learning methods predict the next best recommendation. For businesses selling products, this does not guarantee conversions. A person may receive recommendations but may still choose to abandon their shopping cart. It would assist businesses to understand how the system is making these predictions.

Businesses would then fine-tune a potential shopping experience. Explainable AI would predict what the customer wants and explain the “why” as well. This results in more personalized recommendations and overall experience for the users. The greater the personalization, the higher the chance of getting the recommendations right. This also provides an opportunity to make further recommendations. There is a good chance customer market size is going to increase as well. The volume of sales per customer and conversion rates can also increase.

#### Credit and Loan Decision Making
A popular use of machine learning is determining who gets access to certain financial services. We trust these algorithms to make these decisions fairly. Although, if we are denied a loan, the reasoning behind the denial may not be provided.

Most traditional machine learning approaches can be categorized as black-box approaches. These black-box models will only predict who should receive or be denied financial services without any explanation being provided.

The implementation of explainable AI would explain why someone should be granted or be denied financial services. This offers transparency to the process. It also makes the process more auditable. Legal compliance is also improved since decisions can be justified within the scope of the applicable laws.

### Explainable AI Techniques/ Approaches
To develop explainable systems, two main techniques are used; *ante-hoc and post-hoc*.

#### Ante-Hoc Methods
These techniques involve implementing explainability into an AI model from the very beginning.

##### Reverse Time Attention Model (RETAIN)

Accuracy and interpretability are important characteristics of processes in the medical field as well as successful predictive models. To avoid dealing with a trade-off between the two characteristics in AI software in the medical field, RETAIN was created.

To assist doctors with understanding AI software predictions, the [RETAIN](https://arxiv.org/abs/1608.05745) model was developed. It utilizes two recurrent neural networks, each having an attention mechanism. The two RNNs received patient hospital visit data. The attention mechanism was responsible for explaining the focus of the neural network and how a choice was influenced.  

RETAIN was modeled to emulate the behavior of physicians during an encounter with patients. It helps doctors understand software predictions when given patient records. It can explain how different medical codes from patient data contribute to the predictions.

Medical codes include diagnosis codes, procedure codes, or medication codes. RETAIN examines the past visits of patients. It then identifies the most meaningful visits. After that, it quantifies features that are visit-specific that contribute to the predictions that were made.

##### Bayesian Deep Learning (BDL)
BDL is a field that combines the [Bayesian probability theory](https://en.wikipedia.org/wiki/Bayesian_probability) and deep learning architectures. With BDL, it's possible to measure the unreliability within the predictions of a neural network. Bayesian deep learning models usually form prediction uncertainty estimates, that assist in describing features that led to certain decisions being made. For a deeper dive into BDL feel free to check out this [paper](https://arxiv.org/pdf/1604.01662.pdf).

#### Post-Hoc Methods
These techniques only involve explainability during testing stages. The training stages are carried out normally. Post-hoc model analysis is a very common approach towards explaining AI in production.

##### Local interpretable Model-Agnostic Explanations (LIME)
[LIME](https://www.oreilly.com/content/introduction-to-local-interpretable-model-agnostic-explanations-lime/) is a popular post-hoc method that learns an interpretable model and attempts to explain its prediction. Only after a decision was been made will it provide an explanation. Here is how it works.

LIME receives input, then generates a new dataset composed of refined data samples. The next step involves populating corresponding predictions that would have been made by a black-box model if the aforementioned samples would have been used as input.

Next is the training of an interpretable model (such as regression models or decision trees). The model is trained on the new dataset to help explain changes in the key extracted features.

Let’s go over an example to make it a bit clearer. Consider an image classification problem. The input is image data to be classified. Let’s take an image of a cat. LIME blacks out different parts of the input image of a cat. It feeds the resulting images through the interpretable model. This is to test the model on which perturbations on the images throw off the model's ability to predict that the image is of a cat.

LIME uses this to predict the reasoning behind the decision making of the model. Taking our cat image example, LIME would find that erasing parts of the cat's face makes it more difficult for the model to identify that it is a cat. As a result, this would show that classification of an image of a cat would highly depend on the face of the cat.

##### Black Box Explanation through Transparent Approximation (BETA)
BETA is a post hoc method that is linked to Interpretable Decision Sets. [Interpretable Decision Sets](https://cs.stanford.edu/people/jure/pubs/interpretable-kdd16.pdf) is a framework used to build highly accurate and interpretive predictive models.

Interpretable Decision Sets generate interpretable classification models for multi-class classification tasks. They do this without significantly sacrificing accuracy.
These decision sets are sets of “if-then” rules. These rules are not connected by "else" statements and can be considered in any order. Each rule exists as an independent classifier.

This means that it can assign its own label without regard for any other rules. Interpretable Decision Sets have two properties; interpretability and accuracy. They are interpretable by nature due to their simplicity. They also need to be accurate predictors of labels.

Let's have a simple example of a decision set with two rules. One rule would be something like "If Respiratory-Illness = Yes and Smoker = Yes and Age ≥ 50 then Lung Cancer".
A second rule would look like "If Risk-LungCancer = Yes and Blood-Pressure ≥ 0.3 then Lung Cancer". An obvious benefit is that we can easily follow and understand the two rules without any help.

They manage to describe simple decision-making processes by predictive models. Note that there is no use of the "else statement". This is why we mentioned that they can be considered in any order and exist as independent classifiers. As we also mentioned, they offer us accuracy and interpretability.

BETA learns decision sets through which each rule explains part of the behavior of the model. The learning process yields a high degree of agreement between the model and the explanation.

This means that the explanations given about the processes undertaken by the model and the actual processes are close to identical. The process also yields low ambiguity and high interpretability. For a more technical explanation on BETA check out this [paper](https://arxiv.org/abs/1707.01154).

### Challenges to Achieving XAI
#### Different users, different levels of explainability, different contexts
Depending on the context, it is likely different users will need different levels of explainability. This is particularly significant when attempting to establish regulations around access to model explanations. For example, models used in a military setting will not be approached similarly to those used in a low to zero-risk context. A similar approach is taken in a medical context. Not everyone will be privy to the inner workings of the relevant models.

#### Performance-explainability trade-off
There exists an [inverse relationship](https://www.ubs.com/global/en/investment-bank/strategic-development-lab/blog/theory/2019/xai.html) between AI method accuracy and interpretability. The greater the accuracy, the lower the interpretability. This means that the lower the accuracy, the higher the interpretability.

For example, deep learning models tend to be quite complex compared to basic machine learning methods. They are also credited with greater accuracy in their tasks. Explaining the process behind the decision making of a deep learning model is naturally going to be more difficult than that of a simple decision tree. Due to this complexity of deep learning, the demand to explain complex neural networks has skyrocketed.

#### Explainability-privacy trade-off
In the quest to achieve explainability, a trade-off with privacy is likely to be experienced in various cases. Consider a model that uses data points that users consider to be private to make predictions. Some of these data points may need to be revealed to truly explain the workings of a model.

For example, a model that contains medical data of patients is going to have data points that are considered to be private. Anonymity, therefore, goes out of the window in an attempt to attain model explainability. This is a concern since the privacy of users, that is supposed to be upheld, may be jeopardized.

#### Malicious actors
If a system offers a very transparent explanation about its working and decision making, everyone is happy. But, if a system offers seemingly transparent yet inaccurate explanations of its inner workings, it would be hard for most users to tell. This could motivate malicious actors to deceive users into believing they offer explainability while not being the case. This could lead to users being easily exploited yet never suspecting it.

### Conclusion
Artificial intelligence has taken over our normal lives in many ways. Its responsibilities and use cases keep growing. How AI systems make predictions and decisions has not always been transparent or understandable. Besides the evolution of deep learning, systems are becoming more complex. Furthermore, these systems are capable of making high-stakes errors, despite our willingness to trust them.

To be worthy of our trust, we need to understand how they work and how they arrive at various decisions. A few exceptions have to be made concerning systems whose transparency may jeopardize the privacy and confidentiality of critical information that affects the lives of people. Regardless of the challenges involved, explainable AI is a step in the right direction for the future of AI.

### References
1. [Explainable Artificial Intelligence (XAI): Concepts, taxonomies, opportunities, and challenges toward responsible AI](https://doi.org/10.1016/j.inffus.2019.12.012)

2. [The Case for Explainable AI (XAI)](https://www.infoq.com/articles/explainable-ai-xai/)

3. [Explainable Artificial Intelligence](https://www.kdnuggets.com/2019/01/explainable-ai.html)

4. [The How of Explainable AI: Pre-modelling Explainability](https://towardsdatascience.com/the-how-of-explainable-ai-pre-modelling-explainability-699150495fe4)

5. [RETAIN: An Interpretable Predictive Model for Healthcare using Reverse Time Attention Mechanism](https://arxiv.org/abs/1608.05745)

6. [“Why Should I Trust You?” Explaining the Predictions of Any Classifier](https://arxiv.org/pdf/1602.04938.pdf)

7. [What is Explainable AI (XAI)?](https://simmachines.com/explainable-ai/)

8. [Is the AI black box something to be scared of?](https://bdtechtalks.com/2018/02/09/scary-ai-blackbox/)

---
Peer Review Contributions by: [Lalithnarayan C](/engineering-education/authors/lalithnarayan-c/)
