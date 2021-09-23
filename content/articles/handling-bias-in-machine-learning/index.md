---
layout: engineering-education
status: publish
published: true
url: /handling-bias-in-machine-learning/
title: Handling Bias in Machine Learning
description: This article will go over bias in machine learning, the various types of bias that occur in models and datasets and ultimately impact machine learning development.
author: collins-ayuya
date: 2020-10-08T00:00:00-11:00
topics: [Machine Learning]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/handling-bias-in-machine-learning/hero.jpg
    alt: bias machine learning image
---
We are increasingly dependent on machine learning in our daily lives. An example is in the every-day products we use. However, these algorithms are created by human beings. As a result, algorithms may contain the same biases humans possess. An algorithm displaying for example, sexist, or racist bias has the potential to cause more harm than good.
<!--more-->
It is thus important for algorithms to make predictions that are accurate and fair.

In this article, we cover:

1. What bias is in machine learning.

2. Types of bias.

3. Why you should care about bias in machine learning algorithms.

4. Techniques to handle bias.

### Prerequisites
Basic understanding of machine learning concepts. For an introduction to machine learning, check out this [article](/supervised-learning-algorithms/). I also briefly covered the basics of machine learning in a previous [article](/automated-fake-news-detection/).

### Bias in Machine Learning
[Wikipedia](https://en.wikipedia.org/wiki/Bias) describes bias as the disproportionate weight favoring or disfavoring an idea or thing in a closed-minded, unfair, or prejudicial way. Creators of machine learning models often unknowingly impart their various biases into their models. When this happens, it gives rise to what we refer to as algorithmic bias. [Algorithmic bias](https://en.wikipedia.org/wiki/Algorithmic_bias) refers to the methods in which algorithms portray bias of either their input data or their creators.

In today’s world, machine learning models are used on such a large scale. They arguably drive our technology-dependent lives. Even so, if models happen to be biased, then biases are being mass-produced. It is an issue that may often end up being [ignored](https://www.technologyreview.com/2017/07/12/150510/biased-algorithms-are-everywhere-and-no-one-seems-to-care/) due to several reasons. One reason could be that it is those underrepresented who are hit the hardest with the consequences of bias.

We are also a bit too willing to trust the outcomes that these mathematical models make. It could also be that the creators of models and regulators may show little interest to monitor and inspect algorithms for inherent bias. As they have little to no incentive to do so.

It is especially sensitive when dealing with algorithms that involve race, sexual orientation, age, gender, and physical ability. Bias portrayed by these algorithms amplifies the societal issues that plague our current time, which artificial intelligence should be helping to reduce.

We will look at why it is important to prevent bias but first, let’s look at a few types of bias.

### Types of Bias
Various types of bias occur in models and datasets that ultimately impact machine learning development. Let’s define a few.

#### Exclusion Bias
In the machine learning process, data has to be cleaned before being used for testing and training steps. As a result of cleaning data, we often remove features that we consider not to be relevant. This in effect may impart exclusion bias. The removed features may end up being underrepresented when the data is applied to a real-world problem. Consider sales data from two regions. 97% of sales data is from region A, and 3% from region B. One may choose to delete data from region B thinking it is irrelevant. Consequently, the model may not deduce that region B customers purchase 5 times as much as region A customers.

#### Sample Bias
Sample data used to train models needs to replicate a real-world scenario as much as possible. Failure to do so means that models are exposed to just a part of the problem space. These models are trained to predict, based on data they are fed. Consequently, you can expect the bias to manifest if sample data does not represent the whole problem space. An example of sample bias is facial recognition software primarily trained on images of white men. When encountering people of different ethnicities or gender, the performance is quite poor and bias manifests.  

#### Prejudicial Bias
This kind of bias occurs due to cultural stereotypes the people (in the machine learning process) have. Social standing and gender among others may slither into a model. The consequence is that of skewed results against people of a particular group. A good example of this is a tool to automate the hiring of talent. Imagine a scenario where the system is fed mostly male resumes as training data. The system will learn that men are preferable to women. As a result, female applicants end up at a considerable disadvantage. This is a real-life example that we shall explore later on.

#### Algorithmic Bias
Algorithmic bias represents errors that create unfair outcomes in a machine learning model. These errors are often repeatable and systematic. This kind of bias is associated with algorithm design and training. For example, errors could be in the form of pre-existing biases by system designers. Regardless of the model used, there will be bias in the system. Another example is facial recognition technology. Consider facial recognition technology with difficulty in identifying black people. This technology is applicable to self-driving cars. In the context of preventing a crash, there has always been a conversation about who the car would choose to save (considering both passengers and pedestrians). However, if the system fails to recognize the faces of black people, it would likely result in casualties. A black pedestrian may have a higher chance of being run over. A black passenger may not be recognized hence the car may not prioritize the safety of the passenger.       

#### Measurement Bias
Measurement bias occurs when data collected for training is different from data collected during production. This could be as a result of an issue with the measurement/observation device. Data ends up skewed in a particular direction since the training data used no longer represents real data. An example of measurement bias may involve a data collection device such as a camera. Training data may be collected by one camera, with its own settings and configurations such as brightness or exposure settings. Production data may be collected by a different camera with different settings. As a result, data is distorted when compared to production data.  

### Why is it Important to Prevent Bias?
We trust machine learning algorithms every day. They make even the smallest decisions for us. But when the stakes are raised and you’re denied a bank loan by a biased algorithm, the individual consequences are much more sobering. The responsibility and influence of these algorithms are impressive. However, assuming a huge number of algorithms are biased, it becomes scary. These models, if not inspected, monitored, regulated, and maintained run the risk of amplifying human biases.

#### Decision Making
Machine learning models are injected into numerous systems that are trusted to make decisions. These systems are used on large scale. For example, systems that make hiring decisions or systems that decide who can get a financial loan. But these systems may have underlying biases that end up excluding deserving candidates for job opportunities, financial plans, and general quality of life opportunities.

In a real sense, biases end up being mass-produced. And the trust in mathematical models being accurate does not help the situation at all. In addition to that, most of these models may be complex or lack transparency in their operation.

As a result of the trust in mathematical models and the acceptance of a lack of transparency behind the operation of the models, developers of such models may not show keenness to monitor or test models for inherent biases.

#### Influence of Algorithms
We trust these models to make many decisions for us. Furthermore, since there is no human element in the way they operate, we assume them to be objective and accurate. We assume that human bias is eliminated. So we embrace the outcomes given by these models as the absolute truth. It is even unthinkable that they can make mistakes or even worse, be biased! This allows for most of these models to go unchecked. The consequences may not be clear to everyone but are heavily felt by often underrepresented groups such as minorities.

### Causes of Bias
Bias in algorithms is usually a result of flawed data and human bias.

#### Human Bias
Creators of machine learning models may end up imparting their biases into their models. As a result, the model simply amplifies the biases of its creators. Any learning the model does is based on the past biases of its creators.

#### Inadequate/Misleading Training Data
If training data used in a machine learning model represents more groups of data at the expense of others, the expectation would be that the model will perform horribly for unrepresented data groups.

Training datasets may represent more data groups than others because of misleading or inadequate data. Both result in data that lacks diversity which again results in poor performance in scenarios involving the unrepresented groups.

### Example of Bias
Below are a couple of examples to show the disastrous consequences of bias.

#### COMPAS and Racial Bias
[COMPAS](https://en.wikipedia.org/wiki/COMPAS_(software)) refers to Correctional Offender Management Profiling for Alternative Sanctions. It is a decision support tool used by courts in the United States to assess sentencing and parole of convicts. It aims to identify inmates with a low likelihood of committing offenses again.

The likelihood of a defendant to re-offend is estimated based on their response to [137 survey questions](https://www.documentcloud.org/documents/2702103-Sample-Risk-Assessment-COMPAS-CORE.html) though, it does not include the question of race. The algorithm has been able to make successful predictions on recidivism. However, when it failed in its predictions, the results for black and white offenders differed. It showed that black offenders were viewed twice as likely to be labeled as a higher risk to re-offend compared to white offenders. COMPAS software also labeled white offenders as lower risk, compared to black offenders, even though their criminal histories display a higher likelihood to re-offend. To read more on COMPAS and racial bias check out this [post](https://www.propublica.org/article/machine-bias-risk-assessments-in-criminal-sentencing).

#### Recruiting Tool and Gender Bias
A [project](https://www.reuters.com/article/us-amazon-com-jobs-automation-insight/amazon-scraps-secret-ai-recruiting-tool-that-showed-bias-against-women-idUSKCN1MK08G) by Amazon had to be scrapped because it portrayed prejudice against women. The project involved developing a tool that would automate the hiring and screening of job applications. The company noted that the tool was not evaluating candidates in a gender-neutral manner. The models involved were trained to observe patterns in over a decade’s worth of resumes submitted to Amazon. However, most of these resumes came from men. Resultantly, the system learned that men were preferable hires. The training data given to the model had some element of bias.

Similar cases may take place in other sectors that make use of biased algorithms. Such as an application for financial services which may marginalize the underrepresented. The usage of algorithms in healthcare to diagnose and cure diseases may alienate an underrepresented population.

### Techniques to Handle Bias
Good news; it is not all bleak. There are numerous ways to prevent, anticipate, and reduce bias in our algorithms. We will look at a few technical ways to handle bias.

#### Selecting a Diverse Training Dataset
Training data should be as diverse as possible. It should include as many relevant groups of data as possible. The reasoning behind this is that the more inclusive the dataset, the less likely it is to turn a blind eye to a given data group. For example, a model with diverse data on social, racial, or economic grounds is less likely to exhibit bias in any of the mentioned groups of data. However, a model with enough social and economic data being used in real-world scenarios where racial data is factored in is very likely to portray some form of racial bias.

#### Choosing the Correct Model
Machine learning models have the goal of making predictions. However, these models do not take a one-size-fits-all approach to problems. And there is no single model to use to avoid bias. It is key to select a model that fits best with the problems at hand. In addition to aligning a model with the problem, it is also important to consider the shortcomings of models. For example, some models, often supervised learning models, offer high accuracy but are susceptible to human biases. Choosing to use such models, very well knowing the limitations, gives you a chance to anticipate issues of bias and make necessary adjustments to prevent problems down the line.

#### Monitoring and Reviewing
I would be beyond surprised if research teams and companies create biased models intentionally. Most of the models depicting bias probably worked as intended in controlled environments. However, when applied to real-world problems, biases manifest. This could mean that the satisfactory performance of the models in testing and training was enough to provide the false belief that the models are ready to be used in real-life situations.

A wiser way to approach such a scenario is training the model on real-world datasets. This should be accompanied by reviewing the performance of the model to see if any bias is exhibited. Real-world data may provide unanticipated variables that may expose the bias of the model when applied to the real world.

### Wrapping Up
Bias is a huge issue in today’s society from a social and cultural perspective. It is hoped that artificial intelligence can be used to solve issues of bias by being accurate and fair. But when bias is imparted into AI systems, the systems have the potential to amplify the very biases they were touted to eliminate. We have seen a few examples of bias and their consequences. We put some of the biggest decisions in the hands of AI systems. This should be incentive enough for companies as well as regulators to care about inspecting these systems (both data and algorithms) for bias. As machine learning practitioners, we have a responsibility as well, to always consider and anticipate bias while developing machine learning models. We cannot in good conscience turn a blind eye.

### References
1. E. Sengupta, D. Garg, T. Choudhury and A. Aggarwal, "[Techniques to Eliminate Human Bias in Machine Learning](https://doi.org/10.1109/SYSMART.2018.8746946)," 2018 International Conference on System Modeling & Advancement in Research Trends (SMART), Moradabad, India, 2018, pp. 226-230

2. [How to Prevent Machine Bias in AI](https://www.logikk.com/articles/prevent-machine-bias-in-ai/)

3. [Biased Algorithms Are Everywhere, and No One Seems to Care](https://www.technologyreview.com/2017/07/12/150510/biased-algorithms-are-everywhere-and-no-one-seems-to-care/)

4. [Machine Learning and Bias](https://developer.ibm.com/technologies/machine-learning/articles/machine-learning-and-bias)

5. [Machine Bias](https://www.propublica.org/article/machine-bias-risk-assessments-in-criminal-sentencing)

6. [Racial Bias and Gender Bias Examples in AI systems](https://medium.com/thoughts-and-reflections/racial-bias-and-gender-bias-examples-in-ai-systems-7211e4c166a1)

7. [Three ways to avoid bias in machine learning](https://techcrunch.com/2018/11/06/3-ways-to-avoid-bias-in-machine-learning/)

8. [Preventing Machine Learning Bias](https://towardsdatascience.com/preventing-machine-learning-bias-d01adfe9f1fa)

9. [Bias in machine learning, and how to stop it](https://www.techrepublic.com/article/bias-in-machine-learning-and-how-to-stop-it/)

10. [A review of possible effects of cognitive biases on interpretation of rule-based machine learning models](https://arxiv.org/pdf/1804.02969.pdf)

11. [How to prevent bias in machine learning](https://becominghuman.ai/how-to-prevent-bias-in-machine-learning-fbd9adf1198)

12. [5 Types of bias & how to eliminate them in your machine learning project](https://towardsdatascience.com/5-types-of-bias-how-to-eliminate-them-in-your-machine-learning-project-75959af9d3a0)

13. [Inspecting Algorithms for Bias](https://www.technologyreview.com/2017/06/12/105804/inspecting-algorithms-for-bias/)

---
Peer Review Contributions by [Saiharsha Balasubramaniam](/engineering-education/authors/saiharsha-balasubramaniam/)
