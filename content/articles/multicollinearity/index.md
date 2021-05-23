---
layout: engineering-education
status: publish
published: true
url: /multicollinearity/
title: How to Detect and Correct Multicollinearity in Regression Models
description: Interpretability of machine learning models helps us understand the predictions of a model. Multicollinearity can be described as a data disturbance in a regression model. We have explored its causes, the problem it poses, how to detect and address it. 
author: collins-ayuya
date: 2021-03-01T00:00:00-10:00
topics: []
excerpt_separator: <!--more-->
images:

 - url: /engineering-education/multicollinearity/hero.jpg
   alt: Machine learning multicollinearity example image
---
The interpretability of machine learning models helps us understand the predictions made by a model. Interpretable models are desirable. The interpretability of a regression model may be affected, when determining individual feature effects in a model become unreliable. A reason for this is multicollinearity. In this article we will explore multicollinearity; we will also learn a method to detect and fix it.

### Table of contents
1. Multicollinearity and variables

2. The problem

3. Causes

4. Test to check for multicollinearity

5. Addressing multicollinearity

### Prerequisites
In order to follow it article along, a basic understanding of not only machine learning but also regression models is needed. Here’s a helpful [article](/supervised-learning-algorithms/) on supervised learning algorithms.

### Multicollinearity and variables
A dependent variable is a variable that holds the occurrence being studied. It is one that varies as a result of the independent variable. An independent variable is one that is controlled to test the dependent variable. 

We will show the relationship between the two types of variables using the equation:

$$ y = f(x) $$

Where $x$ is the independent variable and $y$ is the dependent variable. In the context of machine learning, a dependent variable is the target variable. It is the value that should be predicted. An independent variable is a predictor. It is used to predict a dependent variable.

Collinearity refers to a condition whereby we have a pair of heavily correlated features to each other in data. For a variable to be considered an independent variable, it has to be distinct from other variables. 

It has to be independent of other variables. This means that we should not have the ability to derive this variable's values by using other independent variables. Consider another equation of a dependent variable concerning independent variables below.

$$ y = c + m_1x_1 + m_2x_2 + m_3x_3 + … + m_nx_n $$

Say $x_1$ represents total exam marks. $x_2$ represents exam one. $x_3$ is exam two. To get the value of $x_1$, we can add $x_2$ and $x_3$. 

This shows that $x_1$ is not independent. The implication is that there is strong multicollinearity between $x_1$, $x_2$ and $x_3$. We can say multicollinearity is present in a regression model when two or more independent variables show a high correlation.

### The problem
It affects the interpretability of a regression model since it compromises the statistical significance of independent variables. [Statistical significance](https://www.investopedia.com/terms/s/statistical-significance.asp) claims that an outcome resulting from testing or experimentation is unlikely to occur randomly. 

Instead, an occurrence can be attributed to a specific cause. Statistical significance reflects the confidence level of an outcome. Multicollinearity may make it difficult for us to distinguish between independent variables' isolated effects on a dependent variable.

We should note that multicollinearity may not have a significant impact on the accuracy of the model. It has a greater impact on the reliability when finding the effects of individual features of the model.

### Causes
There are many reasons why multicollinearity may occur.

It may occur as a result of:
1. The inclusion of identical variables. For example, one may have identical variables in a dataset, such as mass in kilograms and mass in pounds.

2. Creation of new variables that are dependent on others. When we create variables that depend on other variables, we introduce redundant information to the model. As such, we may inadvertently encourage the occurrence of multicollinearity.

3. Inadequate data. In some cases, when the data is inadequate, we may experience multicollinearity. This is due to the small sample size, which might, in turn, experience great variance.

#### Variance Inflation Factor
To learn the severity of multicollinearity, there are a few tests that may be carried out. We will focus on the use of the variance inflation factor (VIF). 

The variance inflation factor represents the quotient of model variance with many terms against model variance with a single term. It is the score of an independent variable representing the degree to which other independent variables explain the variable. 

In simpler terms, it is a measure of the levels of multicollinearity in a group of regression variables. The variance inflation factor not only pinpoints correlation between independent variables but the strength of the correlation. As such, it works out the magnitude of the correlation between independent variables. 

VIF has a range that signifies various levels of multicollinearity. A VIF value of 1 is non-collinear. We consider it to be negligible. 

VIF values ranging between 1 and 5 are moderate. They represent a medium level of collinearity. Values of more than 5 are highly collinear. We consider these to be extreme.

It is advisable to keep the levels of multicollinearity moderate. The VIF scores for the independent variables should be lower than 5. However, it is worth noting that this figure may vary depending on publication or use case. Some use a value of 10 to denote extreme multicollinearity.

Let’s look at VIF mathematically.

Say we want to compute the VIF for the $j^{th}$ predictor. 

The VIF can be calculated using the formula:

$$ VIF_i = \frac{1}{1 – R_i^2} $$

Where $R_i^2$ is the coefficient obtained by regressing the $i^{th}$ independent variable on the remaining predictors. As shown below, we can also compute the tolerance and use it to detect multicollinearity.

$$ VIF_i = \frac{1}{1 – R_i^2} = \frac{1}{Tolerance} $$

The tolerance is the reciprocal of VIF.

If $R_i^2$ is 0, the VIF is equal to 1. As a result, we cannot predict the variance of the remaining predictors. The $i^{th}$ predictor is not correlated to the others. 

This is why, as we mentioned previously, when VIF is 1, collinearity is negligible. Multicollinearity is absent from the regression model. For a better understanding of VIF, you may check out an example [here](https://www.analyticsvidhya.com/blog/2020/03/what-is-multicollinearity/).

As much as high VIFs are a cause of concern, there exist situations where they can be ignored. 

In such cases multicollinearity will not manifest. These include:

1. High VIFs in control variables. When high VIFs are present in control variables but not in variables in consideration, they can be ignored. This would mean that the variables we are interested in are neither collinear to the control variables nor each other. As such, there is no impact on the coefficients of regression $(R_i^2)$.

2. Involvement of powers and products of other variables. We may have high VIFs resulting from the involvement of multiplications or products or other variables. Consider a regression model with $y$ and $y^2$ as independent variables. In this case, the resulting multicollinearity is not harmful.

3. Dummy variable representing more than two categories. A dummy variable is used to represent a specific attribute with two or more clear categories. It takes the value of 0 or 1 to show the absence or presence of a given property. If a dummy variable represents more than two categories with a high VIF score, multicollinearity might not exist. If there is a fragment of cases in a given category, the variables will always give high VIF values. This is regardless of whether there is a correlation between categorical variables and other variables.

### Addressing multicollinearity
If we conclude that multicollinearity poses a problem for our regression model, we can attempt a handful of basic fixes.

- **Removing variables.** A straightforward method of correcting multicollinearity is removing one or more variables showing a high correlation. This assists in reducing the multicollinearity linking correlated features. It is advisable to get rid of variables iteratively. We would begin with a variable with the highest VIF score since other variables are likely to capture its trend. As a result of removing this variable, other variables' VIF values are likely to reduce.

- **More data.** Statistically, a regression model with more data is likely to suffer less variance due to a larger sample size. This will reduce the impact of multicollinearity.

- **Using techniques such as partial least squares regression (PLS) and principal component analysis (PCA).** A takeaway from this paper on [partial least squares regression](http://www.ijastnet.com/journals/Vol_4_No_1_January_2014/17.pdf) for multicollinearity is that PLS can lessen variables to a smaller grouping with no correlation between them. PLS, like PCA, is a dimensionality reduction technique. PCA reduces the dimension of data through the decomposition of data into independent factors. Therefore, new variables with no correlation between them are created. This [article](https://towardsdatascience.com/how-to-remove-multicollinearity-in-dataset-using-pca-4b4561c28d0b) explains how PCA handles multicollinearity.

- **Centering the variables.** Centering is defined as subtracting a constant from the value of every variable. It redefines the zero point for a given predictor to become the value we subtracted. Here’s how we can center the variables. We can first calculate the mean of every single independent variable. The next step would replace each variable value with the difference between the values and the mean. The result of this is that the interpretation of the regression coefficients remains unchanged while reducing the impact of multicollinearity by making the correlation between variables much more manageable. This [post](https://statisticsbyjim.com/regression/multicollinearity-in-regression-analysis/) contains an example of how centered variables lead to reduced multicollinearity.

### Wrapping up
Multicollinearity can be described as a data disturbance in a regression model. It threatens to undermine the output of a model. However, it can be detected and addressed. We have explored its causes, the problem it poses, how to detect and address it. 

Until next time, good luck!

### References and further reading
1. [Multicollinearity — How does it create a problem?](https://towardsdatascience.com/https-towardsdatascience-com-multicollinearity-how-does-it-create-a-problem-72956a49058#:~:text=In%20machine%20learning%2C%20it%20is%20fewer%20features%20for,one%20plays%20faster%20then%20other%20also%20plays%20faster.)

2. [Multicollinearity – How to fix it?](https://machinelearningmind.com/2019/10/19/multicollinearity-how-to-fix-it/)

3. [Multicollinearity in Regression Analysis: Problems, Detection, and Solutions](https://statisticsbyjim.com/regression/multicollinearity-in-regression-analysis/)

4. [What is Multicollinearity? Here’s Everything You Need to Know](https://www.analyticsvidhya.com/blog/2020/03/what-is-multicollinearity/)

5. [Multicollinearity in Data Science](https://towardsdatascience.com/multicollinearity-in-data-science-c5f6c0fe6edf)

6. [“Multicollinearity” a Problem or an Opportunity?](https://www.datasciencecentral.com/profiles/blogs/multicollinearity-a-problem-or-an-opportunity)

7. [A Note on Partial Least Squares Regression for Multicollinearity (A Comparative Study)](http://www.ijastnet.com/journals/Vol_4_No_1_January_2014/17.pdf)

8. [Principal Component Analysis to Address Multicollinearity](https://www.whitman.edu/Documents/Academics/Mathematics/2017/Perez.pdf)

9. [How to remove Multicollinearity in dataset using PCA?](https://towardsdatascience.com/how-to-remove-multicollinearity-in-dataset-using-pca-4b4561c28d0b)

10. [What Can I Do About Multicollinearity? Solutions for Multicollinearity in Multiple Regression](http://www.researchconsultation.com/multicollinearity-multiple-regression-solutions.asp)

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
