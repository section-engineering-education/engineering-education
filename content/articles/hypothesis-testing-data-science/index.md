---
layout: engineering-education
status: publish
published: true
url: /hypothesis-testing-data-science/
title: Hypothesis Testing in Data Science
description: This article will go over the concept of a hypothesis in data science and we will discuss its significance to machine learning. We will also give a basic overview of the steps taken to test a hypothesis.
author: collins-ayuya
date: 2021-01-17T00:00:00-17:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/hypothesis-testing-data-science/hero.jpg
    alt: Hypothesis Testing in Data Science image example
---
When using machine learning, we need to be able to trust our models and the predictions they make. We may use sample data to train our models. This sample data may make certain assumptions about a population.
<!--more-->
Yet, if we have no way to test whether the assumptions represent a whole population or not, we will struggle to tell if our results are due to any statistical significance or just chance. 

This article explores the steps to test out hypotheses in data science.

### Contents
1. Significance of hypotheses.
2. Hypothesis in ML vs. statistics.
3. 5 steps to test a hypothesis.

### Prerequisites
All that is required is a general understanding with the concepts in [machine learning](education/supervised-learning-algorithms/) and statistics.

### Significance of a hypothesis
A hypothesis can be described as a theory or argument that explains some observed phenomenon. In a scientific setting, a hypothesis is meant to be proven (or disproven) through experimentation.

In data science, a crucial part of the modeling process is first coming up with an important question or assumption. For example, we can say something like “different cars use the communal parking lot every day.” The framing of this statement makes it seem like we are declaring it to be true. 

However, using a statistical approach, it might be better to frame it as “the cars that use the parking lot are the same.” We have framed the assumption as a null hypothesis, which we shall seek to disprove. The first statement can be thought of as an alternative hypothesis. We shall define these two types of hypotheses later on.

The significance of framing the two statements as we did above is to help eliminate randomness. We can compare it to the phrase “innocent until proven guilty” since we seek to disprove the null hypothesis and validate the alternative hypothesis. 

When these two hypotheses are tested, we seek to prove that the data we used is statistically significant. This means that occurrences were not by chance alone. We shall define statistical significance later in this article.

### Statistical vs. Machine learning hypotheses
Even though most of the concepts we will cover in this article are predominantly statistical, it is important to understand how the term hypothesis is perceived from either a purely statistical or machine learning perspective.

When carrying out statistical hypothesis tests, we attempt to calculate the critical value, which shall be covered later. We can refer to this critical value as an effect. The interpretation of the critical value is significant. 

It determines the likelihood of observing the effect if observations do not have a relationship. The suggestion that the effect is real comes about if the likelihood mentioned above is minute. If the likelihood is large, the effect is likely not to be real. 

In statistical hypothesis testing, there is no comment on the size of the effect. These tests are concerned with how likely the effect is present or absent in the population in consideration. This is based on the observed data samples.

Statistical hypotheses are thus based on identifying the relationships between observations. They are probabilistic explanations about these relationships. 

Null and alternative hypotheses are denoted as $H_0 and H_a$, respectively.

In machine learning, a hypothesis involves approximating a target function and the performing of mappings of inputs to outputs. This approximation is known as function approximation. We approximate an unknown target function, which we assume exists. 

This target function should best carry out the mapping of inputs to outputs on all possible observations existing in the problem domain. The notation in this context is (h) for hypothesis and (H) for a hypothesis set. To better understand a hypothesis in machine learning, this [post](https://www.geeksforgeeks.org/ml-understanding-hypothesis/) will be of use.

### Steps to test a hypothesis
A hypothesis test evaluates two statements about a population. The statements are mutually exclusive. The test concludes which statement best reflects the sample data. A hypothesis test helps us determine the statistical significance of a finding. 

We say a finding is statistically significant when its likelihood of occurrence is very low, given the null hypothesis. This section describes the steps to test a hypothesis as we define the concepts involved in the testing process.

#### Establish hypotheses
The first step in testing a hypothesis is first defining the hypothesis. This is done by establishing both a null and alternative hypothesis. A null hypothesis can be thought of as a statement claiming no relationship between two measured events. It is an assumption made, which may be based on domain experience. 

Scientists carry out experiments to retain or reject a null hypothesis based upon the nature of (or lack of) the relationship between occurrences. A null hypothesis is usually considered to be true until proven otherwise. 

It is denoted as $H_0$.

On the other hand, an alternative hypothesis results from the experiment that we hope to show. We want the alternative hypothesis to be true. It is the hypothesis that is the alternate of the null hypothesis. The image below shall aid in the understanding of these two types of hypotheses.

![nullalternative](/engineering-education/hypothesis-testing-data-science/nullatlernative.png)

*Null vs. alternative hypothesis*

[Source](https://towardsdatascience.com/hypothesis-testing-in-machine-learning-using-python-a0dc89e169ce)

#### Set a significance level
After forming our null and alternative hypotheses, we should select a significance level. This is the measure of the influence of the evidence that needs to be available in a sample before rejecting the null hypothesis. The significance level is usually 5%. It means that it is probable that the test may suffer a type I error. 

The image below visualizes the significance level.

![significancelevel](/engineering-education/hypothesis-testing-data-science/significancelevel.png)

*Alpha = 5%, denoting significance level*

[Source](https://www.edugrad.com/tutorials/maths-for-machine-learning/56)

Since the significance level is 5%, our level of confidence becomes 95%. This means that 95% of hypothesis tests won’t end in a type I error. You may ask why 5% and not any other value is commonly chosen. It simply is standard practice to use 5%.
We mentioned a type I error above. 

Let’s define what type I and II errors are.

**Type I error**. This is an error characterized by a scenario where we reject a true null hypothesis. The symbol alpha represents it.

**Type II error**. We can define a type II error in a situation where we retain a null hypothesis, but it is false. It is denoted by beta.

#### Find the region of rejection for the null hypothesis
There exists a region in the sample space where we reject the null hypothesis. The rejection is if a calculated value lies in the region. This region is known as the critical region. 

We may reference the image in the previous section. A normal curve depicts the critical region in hypothesis testing. In the case of a type I error, it is referred to as the alpha region. It is a beta region in the context of a type II error.

#### Compute p-value
Assuming the null hypothesis is true, the probability of getting an outcome at least as extreme as the observed outcome of a hypothesis test is what we call the p-value. The meaning of “extreme” is dependent on how the testing is carried out. 

The p-value determines whether there is enough evidence to retain the alternative hypothesis or retain the null hypothesis.
Given the probability distribution of a specific statistic we are testing, we may use the deviation between an observed value and a selected reference value. 

The greater the difference between the two values, the lower the p-value. The p-value is lowered as a result of this difference, that shows that it is less likely that the difference is thanks to random chance.

To better understand how to calculate the p-value, with examples, I suggest going through this [post](https://www.wallstreetmojo.com/p-value-formula/).

Many tests may be used to compute the critical region. Other hypothesis testing types include the t-test, z-test, ANOVA test, and chi-square test. A t-test computes the difference between the means of a pair of groups that might have related features. z-tests also test the means of two populations. 

ANOVA may be used when comparing more than two groups simultaneously. A chi-square test is used in the presence of a pair of categorical variables in a population. In the context of this article, since we are comparing two distributions, the p-test is the best suitable test. We shall explore the other types of hypothesis tests in a future article.

#### Compare p-value to the significance level to retain or reject the null hypothesis
To know whether to keep or reject the null hypothesis, we can compare our significance level to the p-value. Let’s assume our significance level is 5% (or 0.05). The smaller the p-value, the greater the evidence is favoring the alternative hypothesis.

If the p-value is less than the significance level we selected, we then reject the null hypothesis. This means that if the p-value is less than our 0.05 significance level, we accept that the sample we used supports the alternative hypothesis.

### Closing
A crucial part of the modeling process is having a significant question or assumption. This are what form our hypothesis. In addition to formulating the right hypotheses, it is important to test them out. 

We have introduced the concept of a hypothesis and discussed its significance. We have gone further to give a basic overview of the steps taken to test a hypothesis. In the future, we may dive into the different tests used to test out hypotheses. 

Happy coding, happy reading!

### References and further reading
1. [Hypothesis Testing in Data Science](https://towardsdatascience.com/hypothesis-testing-in-data-science-875e9d24785e)

2. [Hypothesis testing in Machine learning using Python](https://towardsdatascience.com/hypothesis-testing-in-machine-learning-using-python-a0dc89e169ce)

3. [What is a Hypothesis in Machine Learning?](https://machinelearningmastery.com/what-is-a-hypothesis-in-machine-learning/#:~:text=A%20scientific%20hypothesis%20is%20a%20provisional%20explanation%20for,a%20target%20function%20for%20mapping%20inputs%20to%20outputs.)

4. [ML | Understanding Hypothesis](https://www.geeksforgeeks.org/ml-understanding-hypothesis/)

5. [Hypothesis Testing: A Way to Accept or Reject Your Hypothesis Using p-value](https://www.analyticsvidhya.com/blog/2020/07/hypothesis-testing-68351/)

6. [Hypothesis Testing in Machine Learning](https://www.datacamp.com/community/tutorials/hypothesis-testing-machine-learning)

7. [Maths for Machine Learning](https://www.edugrad.com/tutorials/maths-for-machine-learning/56)

8. [Hypothesis Testing in Machine Learning: What for and Why](https://medium.com/dataseries/hypothesis-testing-in-machine-learning-what-for-and-why-ad6ddf3d7af2)

9. [Importance of Hypothesis Testing in Quality Management](https://www.datasciencecentral.com/profiles/blogs/importance-of-hypothesis-testing-in-quality-management)

10. [The Importance of Hypothesis Testing](https://sciencing.com/the-importance-of-hypothesis-testing-12750921.html)

11. [Hypothesis Test Example](https://www.thoughtco.com/hypothesis-test-example-3126384)

12. [What is a Hypothesis in Machine Learning?](http://signalsurgeon.com/what-is-a-hypothesis-in-machine-learning/)

13. [p-value and level of significance explained](https://www.datasciencecentral.com/profiles/blogs/p-value-and-level-of-significance-explained)

14. [Understanding Hypothesis Tests: Significance Levels (Alpha) and P values in Statistics](https://blog.minitab.com/blog/adventures-in-statistics-2/understanding-hypothesis-tests-significance-levels-alpha-and-p-values-in-statistics)

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
