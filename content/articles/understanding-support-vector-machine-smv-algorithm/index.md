Every expert in machine learning should be conversant with the support vector machine technique, which is another important approach. Many people favor the support vector machine over other algorithms because it provides more accuracy while requiring less computational resources. Support Vector Machines are used in a variety of functions such as regression and classification. It is, nonetheless, often used in the pursuit of categorization objectives.

### Introduction
The application of support vector machines in data classification is discussed in this article (Support Vector Machine, SVM). There are a variety of applications that might benefit from this categorization, including pattern detection, spam filtering, and even determining how hot metal particles are spread in rocket exhaust.

Following its first presentation in the 1960s, the Support Vector Machine (SVM), which was one of the early machine learning algorithms, was developed in the 1990s. With the help of detailed explanations of how the SVM works, we will look at a more in-depth understanding and intuition of the SVM.

### Prerequistices
Before reading this tutorial, the reader should have the following basic concepts in mind.
- Be familiar with the Python programming language.
- Have a fundamental understanding of the ideas behind logistic and linear regression techniques.

### Table of Contents
- [Overview of Support Vector Machine](#overview-of-support-vector-machine)
- [How does Support Vector Machine work](#how-does-support-vector-machine-work)
- [Implementation of SVM in Python](#implementation-of-svm-in-python)
- [Tuneing Parameters in SVM](#tuneing-parameters-in-svm)
- [The Advantages and disadvantages of utilizing SVM](#the-advantages-and-disadvantages-of-utilizing-svm)
- [How to select vector machines kernels](#how-to-select-vector-machines-kernels)

### Overview of Support Vector Machine
Classification and regression issues may both benefit from the use of Support Vector Machine (SVM), a machine learning approach. The most typical problem to which this approach is used is one of classification. There are n characteristics in our dataset, and the value of every feature seems to be the outcome of a specific coordinate. The SVM approach represents each data point as an n-dimensional space position. To do this, we first find the hyperplane that adequately separates the two categories of information. Look at the below illustration.

![The diagram shows an SMV example](engineering-education/understanding-support-vector-machine-smv-algorithm/vector.jpg)

Each observation's coordinates are used to construct support vectors for the model. As a consequence, the classification algorithm serves as a boundary between the two classes.

### How does Support Vector Machine work?
This is how this concept works out. The first step is;
- **Find the correct hyper-plane(case one)** Three hyper-planes may be seen in this picture (A, B, and C). The next stage is to find a hyper-plane where the stars and circles may be separated.

![The diagram shows right hyper-plane](engineering-education/understanding-support-vector-machine-smv-algorithm/caseone.jpg)

- **(Case two) Find the correct hyper-plane** The hyper-planes A, B, and C works well to keep the children apart. 

![Identifying right hyper-plane](engineering-education/understanding-support-vector-machine-smv-algorithm/casetwo.jpg) 

Maximum distances across nearby data points will help choose the best hyper-plane. This is how it works (of either class). This gap is referred to as a margin. Here's an example:

![Margin right hyper-plane](engineering-education/understanding-support-vector-machine-smv-algorithm/casethree.jpg)

Compared to hyper-planes `A and B`, hyper-plane `C` has a significant lead. As a consequence, the proper hyper-plane will be abbreviated as `C`. Other factors should be considered while selecting a hyper-plane. Opting for a hyper-plane with an extreme degree of narrowness increases the likelihood that something may be miscategorized.

- **Is it possible to divide the class into two subgroups(case three)?** The straight line below is obscured by an outlier star in the other(circle) class, making it impossible to tell which group it belongs to.

![Clasiffy two classes](engineering-education/understanding-support-vector-machine-smv-algorithm/casefour.jpg)

By comparison to other stars in its class, this one is a bit of a lone ranger. Because of this, SVM may focus on discovering the hyperplane with the largest error margin rather than looking for outliers. SVM-based categorization stands up well in the face of outliers.

![Clasiffy two classes](engineering-education/understanding-support-vector-machine-smv-algorithm/casefive.jpg)

- **(Case four): Locate a hyperplane and use it to separate classes.** Due to the lack of a linear hyper-plane between both the two classes below, SVM is unable to recognize them. 

![Finding hyper-plane to segregate class](engineering-education/understanding-support-vector-machine-smv-algorithm/casesix.jpg)

We've just studied the linear hyper-plane so far. Support Vector Machines may be able to help with this problem. New property z=x2 + y2 will be added here. This is the last step before plotting the data on the axis.

![Data points on x and z axis](engineering-education/understanding-support-vector-machine-smv-algorithm/caseseven.jpg)

We will focus on the areas marked on the diagram above.

Given that `Z` is equal to the square root of its two input variables, there are no negative values. When the star is distant from the origin, the value of `Z` goes up, whereas when the red circle is close to the origin, the value of `Z` goes down.

With the SVM classifier, creating a linear hyper-plane among two classes is simple. It's also vital to think about whether or not a hyper-plane could be automatically produced. A technique called the kernel trick is used by the SVM algorithm to produce certain outcomes. Because of this, a non-separable issue becomes separable when using the SVM kernel function to change it into one that is. Using this method considerably improves non-linear separation problems. That's why it goes through a long list of transformations before we decide how to segment the data using our labels or outputs.

![Original hyper-plane input](engineering-education/understanding-support-vector-machine-smv-algorithm/caseeight.jpg)

### Implementation of SVM in Python
Scikit-learn, a Python package for machine learning algorithms, is widely used. Using SVM is as simple as importing the library, creating an object, fitting a model, and making a prediction.

Using a scenario and dataset to better understand how SVM operates for classification will be the next step.

```Python
from sklearn.svm import SVC
from sklearn.metrics import accuracy_score

clf = SVC(kernel='a linear')
clf.fit(q_train,w_train)
y_pred = clf.pred(q_trial)
print(accurate_marks(w_test,w_predict))

```
**Explanation** We used `kernel=a linear` in the previous code to generate an SVM for variables that can be segregated linearly. On the other hand, nonlinear data might want a different strategy. As a result, we used the classifier to identify patterns in the original training data before moving on.

### Tuneing Parameters in SVM
When using machine learning methods, model accuracy may be improved by modifying parameter values. Look at the list of SVM parameters.

```
sklearn.svm.SVC(C=1.0, kernel='rbf', degree=2, gamma=0.0, coef0=0.0, shrinking=True, probability=False,tol=0.01, cache_size=150, class_quantity=None, verbose=False, maximum_iters=-1, random_nature=None)
```
We'll discuss `kernel,` `gamma,` and `C,` three crucial model performance parameters.

 A variety of options are available from the kernel in this situation, including `linear,` `rbf,` and `poly` (the default being rbf ). Non-linear hyper-plane issues benefit from the use of the concepts `rbf` and `poly.` Tuneing of parameters is used in a linear kernel to classify two iris data set characteristics based on their kind.

### The Advantages and disadvantages of utilizing SVM
**Advantages**
- The greater the difference between the two, the better.
- It works effectively in three-dimensional situations that are both complicated and dynamic.
- This approach works effectively when the number of dimensions exceeds the number of samples.
- Since it only uses a portion of the decision function's training points, it is also memory-efficient (known as support vectors).

**Disadvantages**
- Because of the time required to train while working with large data sets, performance suffers.
- Data sets with higher noise, such as those in which target classes overlap, do not perform well.
- Probability estimates in SVM are generated via a time-consuming five-fold cross-validation technique. SVC, the scikit-learn library's associated SVC approach, uses this technique.

### How to select vector machines kernels
Most of the time, we have no idea which kernel will be the most efficient given a randomly generated dataset. We should start with the easiest hypothesis space and work our way up from there, as we don't know anything about our data. To sum up, if our dataset is linearly separable, we will get good results with the linear kernel, otherwise, it will fall short.

For the sake of simplicity and better visualization, let's assume our dataset just has two dimensions. This is a complete success. Next up is the RBF kernel SVM.

![Rbf kernel svm](engineering-education/understanding-support-vector-machine-smv-algorithm/smv.jpg)

It appears that linear and RBF kernel SVM will both do equally well with this dataset. How do we know that the linear hypothesis is the best one to use? I'm reminded of Occam's Razor in this situation. Because they need bigger training sets, parametric models like the linear support vector machine (SVM) are more difficult to employ than RBF kernel SVMs. While it is more expensive to train an RBF kernel SVM, it is also more expensive to keep the kernel matrix around and project into an `infinite` higher dimensional space where the data remains linearly separable. When there are more hyperparameters to change, model selection becomes more expensive. Overfitting a complex model is also easier.

Anyway, the polynomial kernel isn't a big deal to me at this point. In actuality, it's not as useful as you may think because of problems with efficiency performance (both computationally and predictively). Instead of using the Radial Basis Function kernel, use a linear SVM (or logistic regression) for basic problems. This is the general principle to keep in mind.

The RBF kernel SVM's decision area is also linear. As a result, RBF kernel SVM elevates your samples to a higher dimensional feature space, where you may use a linear decision boundary to split your classes.

### Conclution
 As evidenced in this tutorial, we have looked more into the Support Vector Machine machine learning algorithm. We discussed the model's working concept, how to construct it in Python, how to optimize its parameters, and its benefits and disadvantages.

 Happy Coding!