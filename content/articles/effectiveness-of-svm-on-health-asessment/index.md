---
layout: engineering-education
status: publish
published: true
url: /effectiveness-of-svm-on-health-asessment/
title: Effectiveness of Support Vector Machine in Analyzing Medical Data
description: This article will focus on understanding how SVM diagnoses and prognoses various health conditions using medical data and why SVM is more effective in handling medical data than other algorithms.
author: lynn-njoki
date: 2022-03-14T00:00:00-18:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/effectiveness-of-svm-on-health-asessment/hero.jpg
    alt: Support vector machine in analyzing medical data hero image 
---
Analyzing health care data has been filled with many problems and challenges. Most of the key challenges in medical data analytics are capturing relevant data and the lack of algorithms to analyze that data. This has efficiently affected the ability to extract hidden information from medical data making it hard to achieve data-driven clinical goals. This has affected the ability to address the critical world health issues sufficiently.
<!--more-->
[Support vector machine](/supervised-learning-algorithms/) algorithms are critical algorithms promising to address the health problem with an accurate computational power. SVM works through regression, classification, and outlier detection of data. Various researchers have reported SVM's ability to detect various health conditions such as cancer, blood pressure, and diabetes through medical data analytics. SVM is likely to make a significant revolution with increased use in global health problems.

This article focuses on assessing how SVM can diagnose and prognoses various health conditions using medical data. The article also highlights why SVM is effective in handling medical data.

### Use of SVM in health data analytics
SVM is a critical [supervised machine learning](https://www.ibm.com/cloud/learn/machine-learning) model used to handle various data sets to resolve multiple problems. SVM can be used in determining and addressing global health problems using the different ways discussed below:

#### SVM classification
Classification is the primary way SVM can do medical data analytics. SVM works as a separator of various data sets in a multidimensional environment. It is capable of performing both multiclass and binary classification of data. Classification of medical data is vital for clinical coding transforming it into standardized statistical code. For example, classification subdivides the data in diagnosis or procedure code to analyze critical information. The classification is based on various parameters related to health assessment issues.

##### 1. Binary classification of data using SVM
The binary classification is a task that is categorized into two classes. When the data has precisely two categories, SVM can be used sufficiently. SVM starts by classifying data by identifying hyperplanes separating data points based on some parameters. There are various [hyperplanes](https://www/engineering-education/kernel-svm-in-python/), with the best being the most significant margins, common inseparable data. 

However, in non-separable data, SVM uses soft/best margin to separate some data, if not all. The hyperplane is usually linear, classifying the values into two different sets. To prevent any overfitting of the medical data, the VM algorithms usually use many non-linear features that are non-task-dependent.

##### 2. Multiclass classification of data using SVM
Natively, SVM does not support multiple-class classification. However, it can now break data into multiple classification sets. The multiclass type can either be the one-to-one or one-to-rest approach. The one-to-one approach breaks the multiclass problem into a wide range of multiple binary classifications. 

Thus, there is a binary classifier on each pair of classes achieved. There is a need for a hyperplane to separate two types, ignoring the third class in this approach. Thus, the method does not consider points that splint outside the two categories. For example, the approach classifies medical data to comprise cancer vs. diabetes, cancer vs. hypertension, and diabetes vs. hypertension in handling medical data.

One-to-rest approach breaks multiclass problems into a binary classifier per class whereby the hyperplane separates the course from all other points. The approach takes into account all the medical data into consideration. For example, the data of three health conditions are classified into three different classes, with one against the rest. For instance, a multiclass with cancer, diabetes, and hypertension conditions, the classification leads to three sets with cancer vs. diabetes-hypertension and many others.

#### SVM in data regression
SVM is vital in determining the relationship between the variables based on the medical data. The SVM in regression uses the same principle as classification. For example, the hyperplane is individualized, and error is tolerated. SVM uses the classes to reflect the relationship between the data sets. In most cases, SVM uses the Kernel trick, especially in handling non-linear data. SVM regression is highly dependent on the medical data's hyperplane and decision boundary.

The hyperplane equation is; `Y = wx+b`

The decision boundary equations in the data set are;

`wx+b= +a`

`wx+b= -a`

So, the hyperplane that is satisfying the sector vector regression should be able to satisfy the following:

$-a < Y- wx+b < +a$

#### SVM in outlier detection
SVM is significant in medical assessment for detecting outliers. They usually significantly affect statistical results since they can mislead the interpretation of data when undetected. The one-class SVMs are very efficient in offering outlier detection. In medical data, some observations do not fit in the dataset required. In this case, the outliers are usually outside the boundary line and are not close to the best hyperplane. Thus, SVM classification usually reflects the outliers illustrated by the boundary line, and they are not used to inform health data decisions.

### Health condition prognosis and diagnosis using SVM
SVM, through the ways described above, can diagnose several health conditions as discussed below:

#### SVM in cancer assessment
SVM is one of the robust algorithms vital in the prognosis and diagnosis of various types of cancer. The pre-processed database first undergoes testing (independent) and training datasets. The data is used to build SVM classifiers built to maximum classification accuracy. 

Based on the classification, the analysis of predictivity, specificity, sensitivity, and error rate are done. For example, SVM classifiers are used in the diagnosis of breast cancer. SVM makes accurate breast cancer classifications from mammogram image data. The datasets close to the hyperplane are more likely to assess predictivity.

#### SVM on diabetes assessment
An SVM model is also vital in the diagnosis of diabetes. The critical parameters based on a diagnosis of diabetes through SVM are body mass index, age, and blood glucose concentration. There are three main classes of output that are partitioned through SVM. The classes include people with diabetes, with the predisposition of diabetes, and without diabetes. A regression analysis to reflect the relationship between the features shows how they affect the HGC level. SVM algorithms have a high accuracy in predicting diabetes through classification and regression.

#### SVM in Hypertension/blood pressure assessment
Support vector machines are also vital in diagnosing hypertension through classification and regression analysis. The SVM first performs data classification using an N-dimensional hyperplane separating the dataset into two classes. Predictive analysis is done using support vector regression based on the category to determine whether the parameters affect the health issue. SVM has been very accurate in prognosis and blood pressure diagnosis compared to other vital algorithms.

### Why should you use SVM in medical data analytics?
- SVM offers good accuracy compared to other algorithms in health data analytics. The accuracy is mainly high when the data is non-linearly and linearly separable. The accuracy is high in linear separable since all the variables are included efficiently with separating hyperplane. SVMs are easily interpretable with an efficient classification which enhances the predictive accuracy on health problems.
- SVM is easy to implement and straightforward. It can deliver better performance within a short period in medical assessment. Thus, SVM is more suitable for addressing various health problems than other algorithms.
- SVM is very effective, especially in high-dimensional spaces. A high number of features usually characterizes this compared to the observations. The complexity of the model is basically (n-features* n² samples), thus, effective in handling non-dimensional data. SVMs use various hyperplanes in such a space to see the creation of separate classes sufficiently.

### Shortcomings affiliated with SVM in medical data analytics?
Despite the wide range of reasons for choosing SVM in health data analytics, there are various shortcomings while using the model. 

The following are some key reasons:
- SVM is not efficient in handling large sets of datasets. In large datasets, the training time is very high, with classification being difficult due to slower training. The target classes in a large dataset usually overlap, affecting the classification and predictability. As a result, the use of SVM in extensive medical data may be misleading and affect the results generated.
- Another critical shortcoming is with setting the parameter correctly. For accurate classification, parameters need accurate identification, which may mislead the analysis. The parameters for one classification may not work for the second problem; thus, accuracy is vital. Hence, if the parameters in medical data analytics are set incorrectly, the result is inaccurate.

### Conclusion
SVM is one of the critical machine learning models that can effectively handle medical data. The algorithm can accurately help diagnose various health conditions such as cancer, hypertension, and diabetes. Three critical ways SVM handles medical data is through classification (both binary and multiclass). Other methods include regression and outlier detection.

One of the main reasons for choosing SVM in health assessment is its accuracy. Other reasons include its ease, straightforwardness, and its memory efficiency. However, the use of SVM has some shortcomings, such as the inability to handle a large set of data and dependency on parameter accuracy. Therefore, SVM is an essential algorithm that can revolutionize health by diagnosing illnesses more accruately.

Happy learning!

### Further reading
- [Diagnosis of Diabetes using Support Vector Machines](https://www/engineering-education/diagnose-diabetes-with-svm/)
- [Breast Cancer Classification](https://towardsdatascience.com/breast-cancer-classification-using-support-vector-machine-svm-a510907d4878)
- [An SVM Method for Continuous Blood Pressure Estimation from a PPG Signal](https://www.researchgate.net/publication/317596007\_A\_SVM\_Method\_for\_Continuous\_Blood\_Pressure\_Estimation\_from\_a\_PPG\_Signal)


---
Peer Review Contributions by: [Briana Nzivu](/engineering-education/authors/briana-nzivu/)

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