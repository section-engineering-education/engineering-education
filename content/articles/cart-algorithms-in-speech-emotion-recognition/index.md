---
layout: engineering-education
status: publish
published: true
url: /cart-algorithms-in-speech-emotion-recognition/
title: Why CART Algorithms are Effective in Speech Emotion Recognition
description: In this article we will assess the use of CART algorithms in speech emotion recognition.
author: lynn-njoki
date: 2022-01-03T00:00:00-12:00
topics: [Machine Learning]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/cart-algorithms-in-speech-emotion-recognition/hero.jpg
    alt: CART Speech Emotion Recognition example hero image 
---
Unlike humans, who have the human ability to recognize emotion from speech, machines do not have the sense to analyze feelings. Speech emotional recognition is vital in understanding human emotions such as amusement, frustration, or disappointment.
<!--more-->
Emotions are vital in day-to-day life, especially in interpersonal human interaction. They are helpful both in intelligent and rational decisions. Speech emotion recognition informs the computer on an individual's physical and emotional state from a speech.

A wide range of studies have focused on detecting a person's emotions. They include computer games, audio surveillance, robots, and others. Machine learning algorithms have been termed more efficient in classification and prediction, vital in speech emotion recognition. 

However, there is a lot of information about the use of [CART](/engineering-education/decision-tree-in-python/) in speech emotion recognition that needs assessment which is the key focus of the study focuses. This article will focus on assessing the substantial use of the CART algorithms in speech emotion recognition. We will review the speech emotion system, how CART works, and various reasons affiliated with its effectiveness.

### The system of emotion recognition
The speech emotion recognition system is highly comparable to the pattern recognition task, especially its structural nature. The system automatically identifies human beings' emotions from their voice. The system is usually based on the signal of speech and emotion recognition methods. 

The system consists of five main steps:
1. Emotional speech input
2. Feature selection and extraction
3. Training
4. Classification
5. Emotion recognition

#### Emotional speech input
This step entails the collection of voice samples, which will be analyzed for emotion recognition. This ensures that the vital aspects of speech that could be used in extracting emotion features are inputted. The emotional address signal must also be inputted before extraction.

#### Feature extraction and selection
There is a wide range of speech signal parameters that emotional characteristics reflect. The extractable features can be categorized in various main aspects. They include pitch, energy, formant, modulation spectral features, and linear prediction coefficients. 

The selection is made from the features selected to reduce the elements that characterize the database. The chosen ones are a subset of more relevant features from the extracted ones based on the relevance evaluation criterion. The various emotional recognition extracts critical emotional features from speech. 

Pitch is one of the essential features of the sounds frequency. The features also include standard deviation, energy intensity, and shimmer. Others include zero-crossing rate, short-time energy autocorrelation, and [MFCC (Mel frequency cepstral coefficient)](/https://musicinformationretrieval.com/mfcc.html/). The various emotional recognition extracts critical emotional features from speech. Other features include spectral roll-off, spectral flux, noise to harmonic ratio, harmonics to noise ratio, and jitter.

#### Training
This is another crucial step of the speech recognition system. The step entails voice training of the computers for speech recognition. It involves assigning a weight of features using estimators and considering small sets of features. The estimators are trained on the features of the initial stage and predictive power.

#### Classification
The features are classified based on the trained samples. The emotions may be classified based on primary or secondary and may be basic or complex. The classification informs the features which are represented in the decision tree.

#### Emotion recognition
Based on the Classification, the key emotions based on the analysis are recognized. The recognition is based on the results presented by the algorithm used. This is represented by the well-constructed decision tree.

### How CART algorithms work in speech emotion recognition
CART is vital in different steps of speech emotion recognition. CART is a decision tree that uses historical data to assess speech emotion. The algorithm is a procedure of binary recursive partitioning. CART is used in various steps of speech emotional training as discussed below.

#### Training
CART is vital in the training step to learn the models for data sample classification. CART binaries different voice files of various emotions. Training is essential in classifying the data into multiple classes. The training is usually done in percentage split, ranging from 0-100%. The percentage reflects the relevance rate of the primary emotion selected. This is the critical basis of classifying the emotions recognized from speech.

#### Classification
CART classifies the main 13 features from recognizing emotions. The key models used in the learning stage are used in the classification. CART classification mechanism entails dynamic feature construction and automatic class balancing. 

The classification tree under CART is based on the binary feature's splitting. The classification uses Gini-index for attribute splitting. CART puts this into inner clusters of the file, which are vital in making decisions.

#### Emotion recognition
The emotion recognition is determined based on the actual positive (TP) and false-positive rate (FP). The TP rate is used in indicating the proportion correctly classified. The FP reflects the values that have been classified incorrectly. The figures are then drawn on a learning curve studied to reflect whether the recognition rate is increasing or decreasing.

### Factors determining CART effectiveness in speech emotion recognition
#### Database selection
Speech emotion recognition is highly dependent on the proper selection of the database. The naturalness of database selection determines the efficiency of CART. CART can only analyze a natural database of speech from humans to identify the emotions. 

Data is essential in speech emotion recognition. The decision tree of CART depends on the input variables, which are split until the construction of a suitable tree.

#### Data preparation
For CART to effectively recognize speech emotion, good presentation of data is significant. This is vital in ensuring that the decision tree is well split to the point that is suitable. Thus, this calls for efficient, emotional speech input and feature extraction processes.

### Why choose CART algorithms in speech emotion recognition?
A wide range of algorithms could be used in speech emotion recognition, such as CART, SVM, logistic regression, others. However, here are some of the reasons why one should choose CART for speech emotional recognition:

- **CART Algorithms are non-parametric algorithms**. Thus, CARTs use in the voice training stage is more efficient. This is on assigning weight to features identified from speech recognition. Thus, the CART algorithm is helpful in generalizing data and deriving informed features. Also ensuring flexibility due to the ability to fit the functional forms. The Non-parametric nature of CART enhances power and performance with training efficiency.

- **CART is very sensitive to outliers**. CART is very susceptible to any variables irrelevant or situated away from the tree. So, CART treats the outlier as the terminal nodes in speech emotion recognition, which cannot affect the decision tree. Due to the splitting process of the decision tree, CART is more robust to the predictors than the outlier.

- **CART also incorporates data tests and cross-validation**. This is vital in ensuring that the fit is accurate. Thus, the decision tree created is authentic in representing the emotions represented in the speech.

- **CART is also efficient in using different variables in varying levels of the decision tree**. This ensures that it is easy to unwrap complex interdependencies between variable sets. Thus, various emotional ties are identified in different levels of the decision tree.

- **CART in speech emotion recognition can be conjoined with other algorithms**. The ability to use CART with other algorithms enhances speech emotion recognition accuracy. For example, CART can be utilized with [SVM](/engineering-education/supervised-learning-algorithms/) for outlier detection, classification, and regression.

### Conclusion
CART is vital in the speech emotion recognition process. The CART algorithm can be very useful in the training, classification, and emotion recognition stages. Data selection and preparation are two of the vital aspects in enhancing the effectiveness of CART. 

CART may be a better choice in speech emotion recognition when compared to other algorithms. Some of the key reasons include CART being non-parametric. CART is easily used in conjunction with different algorithms and unwrapping complex interdependence. Other key reasons include the ability to do data-test and cross-validation and not affected by the outliers.

As we can see, CART is an efficient algorithm in speech emotion recognition.

Happy learning!

### Further reading
- [How to Implement MLOps](/engineering-education/how-to-implement-mlops/)
- [Decision Trees in Python](/engineering-education/decision-tree-in-python/)

---
Peer Review Contributions by: [Collins Ayuya](https://www.section.io/engineering-education/authors/collins-ayuya/)
