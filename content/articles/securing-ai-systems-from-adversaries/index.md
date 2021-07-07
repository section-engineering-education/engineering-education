---
layout: engineering-education
status: publish
published: true
url: /securing-ai-systems-from-adversaries/
title: Securing AI Systems from Adversaries
description: This article will be going how to secure AI systems from adversarial threats with examples of how we can mitigate these attacks.
author: collins-ayuya
date: 2020-11-19T00:00:00-11:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/securing-ai-systems-from-adversaries/hero.jpg
    alt: securing ai systems image
---
Artificial intelligence represents just how powerful and impactful technology has become. It is present in all aspects of our daily lives, from basic tasks to very critical implementations. However, AI systems may cause devastating damage if used by malicious actors.
<!--more-->
We often focus on how [AI can improve cybersecurity](/the-role-of-artificial-intelligence-for-smarter-cybersecurity/), but it's important to consider how to secure AI systems.

### Table of contents
1. Model Duplicating Techniques

2. Adversarial Attacks

3. Poisoning Attacks

### Prerequisites
An understanding of machine learning is crucial. For an introduction to ML, read this [article](/supervised-learning-algorithms/).

### Useful terms
**Disjoint-set**–disjoint-set data structure is a collection of sets that are disjoint. This means that the sets are non-overlapping. We can find no item in more than a single set. This data structure keeps track of elements in a set that has been partitioned into many non-overlapping subsets.

**API** – is an application programming interface. This is a computing interface that defines interactions of diverse software intermediaries. This involves defining how to make requests, it allows which requests, what type of data to use, among others.

**Backdoor**–this is an input that an adversary can leverage to have a machine learning system carry out what the adversary wants. The designer of the model is usually unaware of the backdoor’s existence.

### Attacks and mitigation approaches
Artificial intelligence has widespread use cases. A crucial one is its role in cybersecurity. A conversation that is often had is how to better cybersecurity using artificial intelligence. However, artificial intelligence systems are not impervious to cyber-attacks.

Considering how much we use these systems in our daily lives today, and the responsibility placed upon them, it's important to consider their security. In this article, we explore three types of attacks that are aimed at artificial intelligence systems and their methods of mitigation.


![matrix](/engineering-education/securing-ai-systems-from-adversaries/matrix.jpg)

Adversarial ML Threat Matrix [Source](https://www.helpnetsecurity.com/2020/10/27/attacks-machine-learning-systems/)

### Model duplicating techniques
With this method, the approaches taken are used to steal or duplicate the targeted models. This may involve stealing/duplicating the model itself or getting access to the training data of the model. The training data in question may be sensitive and highly valuable.

For example, it could be private client financial information, confidential military data, and patient information. As a result, an attack of such as this may end up leaking the data. Data also makes up a large part of intellectual property. Leakage of such information will cause hefty consequences to an organization.

### Model replication
Another example attack is model replication. This attack can involve the exploitation of a public-facing API to reconstruct a model. We can find public APIs that may prove to be worthy targets of attacks in cloud-based machine learning services of many companies. These companies provide and run training algorithms that use datasets uploaded by users.

The queries involved are often prediction queries. The interaction between users and the algorithms is handled by user-friendly web APIs. If these models are successfully monetized by the owners, it may motivate an attacker to attack to bypass query charges.

This undermines the business of the model owner. An attacker may look to violate training-data privacy by leaking sensitive training data. They probe the public API to gradually refine a model.


### Defensive techniques
An effective way to defend AI systems from model duplicating techniques is the use of a privacy framework named Private Aggregation of Teacher Ensembles (PATE). PATE is concerned about the privacy of sensitive data that is used to train several machine learning models. These models need to be prevented from revealing (leaking) confidential details of sensitive data.

PATE works on the principle that involves training several models on disjoint data. We refer to these models as “teacher” models. If these models agree on input, it leaks no confidential details from their training set.

Consider a scenario with two different models being trained on two different datasets, with no training examples in common. If the two models agree on how to classify a new input example, the agreement does not leak any details about any training example.

It guarantees the privacy in this scenario because the input examples are different, but the classification approach is the same. The models trained with different examples reached the same conclusion. For privacy to be achieved, the outputs of the aforementioned models need to be in consensus.

To ensure no attacks are carried out against the teacher models’ confidential data through multiple querying, or “student” models are introduced. The student model learns to use publicly available data the teachers previously labeled.

As a result, successive queries don't need the teachers to be involved. The student only has to learn the generalization given by the teachers. I advise to check out the paper on [PATE](https://arxiv.org/abs/1802.08908) for a more technical read.

### Adversarial attacks
Adversarial machine learning represents a technique used to trick a model with malicious input. This often leads to misclassification by the model. An attack may be in the form of adversarial examples. These are inputs to models, designed by an adversary to have the model make a mistake.

The image below shows an example of adversarial examples.

![miscategorization](/engineering-education/securing-ai-systems-from-adversaries/miscategorization.png)

[Misclassification of a panda as a gibbon](https://arxiv.org/pdf/1412.6572.pdf)

The original image is of a panda. An attacker adds an adversarial perturbation. The perturbation (in this case) is meant to have the image be recognized as a gibbon. As we can see, it gives a confidence level of 99.3% in misclassifying the panda.

Consider a scenario where an adversary attacks autonomous vehicles to misclassify traffic signs. This would lead to chaos and casualties on roads. This shows that such attacks can be very dangerous. However, there are ways to mitigate such attacks and make our models more robust.

### Defensive techniques
**Adversarial training**. Adversarial training offers a solution of a brute-force nature. It involves generating many adversarial examples then training a model to not be fooled by the examples. If you’d want to implement adversarial training, here is a link to [CleverHans](https://github.com/tensorflow/cleverhans), an open-source Python library used to benchmark the vulnerability of machine learning systems to adversarial examples.

**Defensive distillation**. Defensive distillation trains classifier models to be more robust towards perturbations. The models are trained to give out probabilities of different classes as opposed to decisions on which class to output.

To achieve these probabilities, a model is first trained on the same task as the above-mentioned models will subsequently be trained on. The resulting model makes it difficult for an attacker to find adversarial input tweaks that would lead to the wrong classification. This is because it makes all the potential input opportunities that may be targeted by an attacker difficult to exploit.

For more on adversarial examples, read this paper on [Explaining and Harnessing Adversarial Examples](https://arxiv.org/pdf/1412.6572.pdf).

### Poisoning attacks
Poisoning attacks are when an attacker injects misleading data into a model’s training pool. The goal is to hinder the model from learning as it should (or correctly), therefore making it malfunction. A consequence of this is that the decision boundary of the model is shifted. This is shown in the image below. The model makes the wrong decisions as a result.

Through poisoning attacks, an adversary is capable of:

- **Logic corruption**. This has the most severe effect since it involves changing how the model learns and operates. An adversary can easily change the logic of the model as they desire.

- **Data manipulation**. The attacker can change the training data but doesn't have access to the algorithm. This manipulation can affect data labels by creating new ones or changing existing ones to cause great disruption. It can also involve changing inputs to shift the classification boundary as shown in the image below. Input manipulation may also create a backdoor to a model.

- **Data injection**. Here, the attacker can inject new data into the training set. The attacker doesn't have access to the algorithm itself, therefore can only inject data.

![boundary](/engineering-education/securing-ai-systems-from-adversaries/boundary.png)

[Boundary shift](https://arxiv.org/pdf/1904.06292.pdf)

Below we will look at a threat known as machine learning model skewing, which is an example of a data poisoning attack.

### Model Skewing
In classification models, model skewing attacks aim to shift the classification boundary. The classification boundary separates what is considered as good input from bad input. This is illustrated by the boundary shift image shown above.

### Defensive techniques
These methods don’t guarantee robustness all the time. Below are a couple of defensive techniques against poisoning attacks.

**Data Sanitization**. This poisoning attack counter-measure is also known as outlier detection or anomaly detection. It's a data pre-processing measure that filters suspicious samples before the learning process commences.

Data sanitization works under the principle that if an attacker is injecting very different data from what is available in the training pool, it should be possible to detect and filter out such data.

**Micro-models**. Micro-models offer an interesting variation to anomaly detection. As opposed to using a single model trained on a large dataset to detect anomalies, we can use multiple anomaly detection instances on smaller slices of data.

This produces multiple basic models known as micro-models. Each micro-model has its view of the training data. Using these micro-models, it's possible to assess the quality of the training data.

It becomes easy to automatically identify and remove any anomalies that should not be part of the model. A “majority voting” approach is taken with these models. If a majority of them don't flag anomalies, it marks training instances as safe. If a majority of the models flag anomalies in training instances, it marks them as suspicious.

Here is a paper that offers more on [poisoning attacks and defenses](https://arxiv.org/pdf/1811.00741.pdf).

### Wrapping Up
AI systems are targets of various attacks. Some of these attacks aren't only challenging to mitigate but also difficult to detect. Dependent on the task, there are a lot of nuances in approaches when building models. It's possible to detect, mitigate, and altogether prevent several attacks on AI systems. We have discussed a few of these attacks and the defense against them. For a deeper dive into the security of AI systems, I’ve included a lot of papers and articles worth reading below. Good luck!

### References and Further Reading
1. [A taxonomy and survey of attacks against machine learning](https://doi.org/10.1016/j.cosrev.2019.100199)

2. [Attacks against machine learning — an overview](https://www.datasciencecentral.com/profiles/blogs/attacks-against-machine-learning-an-overview)

3. [A new threat matrix outlines attacks against machine learning systems](https://www.helpnetsecurity.com/2020/10/27/attacks-machine-learning-systems/)

4. [Scalable Private Learning with PATE](https://arxiv.org/abs/1802.08908)

5. [What is machine learning data poisoning?](https://bdtechtalks.com/2020/10/07/machine-learning-data-poisoning/)

6. [How to attack Machine Learning ( Evasion, Poisoning, Inference, Trojans, Backdoors)](https://towardsdatascience.com/how-to-attack-machine-learning-evasion-poisoning-inference-trojans-backdoors-a7cb5832595c)

7. [Skewing](https://www.imperva.com/learn/application-security/skewing/)

8. [Attacking Machine Learning with Adversarial Examples](https://openai.com/blog/adversarial-example-research/)

9. [Casting out Demons: Sanitizing Training Data for Anomaly Sensors](https://www.covert.io/research-papers/security/Casting%20out%20demons%20-%20Sanitizing%20training%20data%20for%20anomaly%20sensors.pdf)

10. [Distillation as a Defense to Adversarial Perturbations against Deep Neural Networks](https://arxiv.org/pdf/1511.04508.pdf)

11. [Stealing Machine Learning Models via Prediction APIs](https://www.usenix.org/system/files/conference/usenixsecurity16/sec16_paper_tramer.pdf)

12. P. Bhattacharya, "[Guarding the Intelligent Enterprise: Securing Artificial Intelligence in Making Business Decisions](https://doi.org/10.1109/ICIM49319.2020.244704)," 2020 6th International Conference on Information Management (ICIM), London, United Kingdom, 2020, pp. 235-238, doi: 10.1109/ICIM49319.2020.244704.

13. K. Sadeghi, A. Banerjee, and S. K. S. Gupta, "[An Analytical Framework for Security-Tuning of Artificial Intelligence Applications Under Attack](https://doi.org/10.1109/AITest.2019.00012)," 2019 IEEE International Conference On Artificial Intelligence Testing (AITest), Newark, CA, USA, 2019, pp. 111-118, DOI: 10.1109/AITest.2019.00012.

14. [How to improve Cybersecurity for Artificial Intelligence](https://www.brookings.edu/research/how-to-improve-cybersecurity-for-artificial-intelligence/)

---
Peer Review Contributions by: [Lalithnarayan C](/engineering-education/authors/lalithnarayan-c/)
