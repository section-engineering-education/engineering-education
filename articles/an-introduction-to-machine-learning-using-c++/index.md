---
layout: engineering-education
status: publish
published: true
url: /engineering-education/an-introduction-to-machine-learning-using-c++/
title: How to Make an Image Carousel Using Basic HTML, CSS, and JavaScript
description: This article takes the reader through implementing machine learning algorithms using c++. The algorithms will be implemented from scratch to foster understanding.
author: eugiene-kanillar
date: 2021-04-20T00:00:00-17:30
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/an-introduction-to-machine-learning-using-c++/hero.jpg
    alt: Machine learning using c++ image example
---
C++ is a high-level object-oriented programming language with a faster run-time compared to most programming languages. This is because it is closer to machine language. Recent advancement in machine learning and other artificial intelligence-related facets has been implemented using python due to its flexibility and rich library support as well as an active community of users.
<!--more-->
Why am I vouching for C++? you would ask. C++ is the first language most programmers learnt while starting their journey, and thus discarding it along the way without exploiting its full functionality doesn't sit right with me. Regardless, C++ is still being taught in most universities and colleges as a foundational programming language for computer science and other related courses.
C++ has a faster run-time as compared to other programming languages and thus suitable for machine learning since fast and reliable feedback is essential in machine learning. C++ also has rich library support that is used in machine learning which we will get to later.

### Goal
The goal of this tutorial is to educate you on how to implement machine learning algorithms using the C++ programming language. Since this is an introductory part, we will implement the algorithms from scratch to foster understanding. This will make it easier to start the libraries.

### Prerequisites
To follow along with this tutorial, you should meet the following minimum requirements.
- Basic understanding of programming in C++ and the use of objects in storing big data.
- A pre-installed IDE, preferably [Codeblocks](https://www.codeblocks.org/downloads/binaries).
- A good mathematical background so as to understand the statistical methods to be used later on.

### What is Machine learning?
Machine learning is a facet of artificial intelligence. It refers to the ability of computer systems to independently find solutions to problems by recognizing patterns of data stored in a database. Humans are required to write the algorithms to be used by the computer system, collect data and put it into datasets. Afterwards, the machine learns independently and can find solutions.

### Implementation of the statistical and mathematical methods for machine learning in C++
Before we embark on writing the code, we need to understand the approach to be used. We will use a mathematical approach namely Linear regression to enable our system to learn.

 **Linear regression**

In Linear regression, we predict the value of one variable depending on the value of another variable. The value being determined is called the dependent variable while the value being used to determine the dependent variable is called the independent variable.
The mathematical equation for linear regression is:
```
y=B0 + B1x
```
![Linear regression](/engineering-education/articles/an-introduction-to-machine-learning-using-c++/linearRegression.png)

For example, we can use linear regression to determine the amount of rainfall received in an area based on the temperature of the area. The dependent variable would be the amount of rainfall received while the independent variable would be the temperature of the area.

- **Loss function**

The error in what we predicted as the values of `B0` and `B1` is what is termed as the loss. We want to minimize the error so that we have the most accurate values for `B0` and `B1`. This will inter give us the best fit line for future predictions. For simplicity, we will use the loss function below 
```
e^i=p^i- y^i
```
whereby:

e^i is the error of ith training example.

p^i is the predicted value of ith training example.

y^i is the actual value of the ith training example.

- **Gradient descent algorithm**

Gradient descent is an iterative optimization algorithm used to find the minimum of a function in this case the loss function above.

![Gradient descent](/engineering-education/articles/an-introduction-to-machine-learning-using-c++/gradientdescent.png)

Here we start with initial random values of `B0` and`B1` and based on the error of each instance, we update their value.

Here’s how it works:

Let us start with the values `B1` = 0 and `B0` = 0. `L` will be the rate of learning. It controls how much `B1` changes per step. `L` could be made as small as possible e.g `0.01` for good accuracy.
We then proceed to calculate the error of the first point as follows: 

`e(1) = p(1) – y(1)`

We’ll update `B0` and `B1` according to the following equation:
```
b0(t+1) = b0(t) - L * error
b1(t+1) = b1(t) - L * error
```
Carry out this operation for each instance of a training set. One epoch is completed this way. We repeat this for more epochs as required in order to obtain the most accurate predictions possible.

You can refer to these references to get a better understanding of linear regression and gradient descent:

1. [Beginner's guide to linear regression](https://www.analyticsvidhya.com/blog/2017/06/a-comprehensive-guide-for-linear-ridge-and-lasso-regression/?utm_source=blog&utm_medium=machine-learning-using-c-linear-logistic-regression)
2. [Gradient descent for machine learning](https://machinelearningmastery.com/gradient-descent-for-machine-learning/)

### Implementing linear regression using C++
Let us define the dataset that we will be using for our tutorial. It is contained in the image below

![dataset1](/engineering-ed/articles/an-introduction-to-machine-learning-using-c++/dataset1.png)

We will use the first 5 values to train our algorithm and test it on the last value to see its performance:
```c++
double x[] = {1, 2, 4, 3, 5};
double y[] = {1, 3, 3, 2, 5};
```

Next, we’ll define our variables:
```c++
vector<double>error; // for storing the error values
double devi;    // for calculating error on each stage,we name it devi(short for deviation) to differentiate it from the error vector
double b0 = 0; // initializing b0
double b1 = 0; // initializing b1
double learnRate = 0.01; // initializing our learning rate
```
Training Phase

Next, we will work on the gradient descent algorithm:
```C++
for (int i = 0; i < 20; i ++) {   // since there are 5 values and we want 4 epochs we run for loop for 20 times
    int idx = i % 5;   // for accessing index after every epoch
    double p = b0 + b1 * x[idx];  // calculating prediction
    devi = p - y[idx]; // calculating error. 
    b0 = b0 - learnRate * devi; // updating b0
    b1 = b1 - learnRate * devi * x[idx];// updating b1
    cout<<"B0="<<b0<<" "<<"B1="<<b1<<" "<<"error="<<devi<<endl; // printing values after every update
    error.push_back(devi);
}
```

We use a for loop that runs 20 times since we are working with 5 values and we are running the whole algorithm for 4 epochs. Variable `p` is used to calculate the predicted value of each instance. The error for each instance is stored in the variable `devi` according to the error equation we had listed above. We then update the values of `b0` and `b1` as explained above in the gradient descent section. Push the error into the `error` vector.

Something worth noting is that `B0` does not have any input. This term is referred to as the bias or the intercept and can be assumed to always have an input value of 1.0. This is a useful assumption when implementing the algorithm using vectors or arrays.

To finalize, we go ahead and sort the error vector to get the minimum value of `error` and corresponding values of `b0` and `b1`.We define a customized sorting function to sort the `error` vector. Read about custom sorting in vectors [here](https://www.gormanalysis.com/blog/sorting-a-vector-in-cpp/). At last, we’ll print the values:
```c++
sort(error.begin(),error.end(),custom_sort);// sorting to get the minimum value
cout<<"Final Values are: "<<"B0="<<b0<<" "<<"B1="<<b1<<" "<<"error="<<error[0];
```
Testing Phase:
```c++
cout<<"Enter a test x value";
double test;
cin>>test;
double pred=b0+b1*x;
cout<<"The value predicted by the model= "<<pred;
```

We’ll enter the test value which is 6. The answer we get is 4.9753 which is quite close to 5. Congratulations! We just built a linear regression model with C++, and with good parameters.

Full Code for final implementation:
```c++
#include<bits/stdc++.h>  // header file for all c++ libraries
using namespace std;   // stdout library for printing values 
bool custom_sort(double a, double b) /* this custom sort function is defined to 
sort on basis of min absolute value or error*/
{
    double  a1=abs(a-0);
    double  b1=abs(b-0);
    return a1<b1;
}
int main()
{
/*Intialization Phase*/
double x[] = {1, 2, 4, 3, 5};    // defining x values
double y[] = {1, 3, 3, 2, 5};    // defining y values
vector<double>error;             // array to store all error values
double devi;
double b0 = 0;                   //initializing b0
double b1 = 0;                   //initializing b1
double learnRate = 0.01;             //initializing error rate
 
/*Training Phase*/
for (int i = 0; i < 20; i ++) {   // since there are 5 values and we want 4 epochs so run for loop for 20 times
    int idx = i % 5;              // for accessing index after every epoch
    double p = b0 + b1 * x[idx];  // calculating prediction
    devi = p - y[idx];              // calculating error
    b0 = b0 - learnRate * devi;         // updating b0
    b1 = b1 - learnRate * devi * x[idx];// updating b1
    cout<<"B0="<<b0<<" "<<"B1="<<b1<<" "<<"error="<<devi<<endl;// printing values after every update
    error.push_back(devi);
}
sort(error.begin(),error.end(),custom_sort); // sorting based on error values
cout<<"Final Values are: "<<"B0="<<b0<<" "<<"B1="<<b1<<" "<<"error="<<error[0]<<endl;

/*Testing Phase*/
cout<<"Enter a test x value";
double test;
cin>>test;
double pred=b0+b1*test;
cout<<endl;
cout<<"The value predicted by the model= "<<pred;
}
```
### Conclusion
C++ is a good programming language for venturing into machine learning. However, since this venture is relatively new, you will have to implement most of the algorithms from scratch. It would be difficult to implement machine learning in c++ without understanding the basics of machine learning algorithms. I think that is why Python is more popular for machine learning compared to C++.
C++ also has a few libraries which support machine learning. We will look at them in a future article.

Linear regression in machine learning is useful for forecasting since the algorithm is able to make predictions based on previous patterns. This enables organizations and institutions to put in place strategies that are beneficial depending on the forecast.

Machine learning can also help small business to determine the impact on their sales by altering various factors. This ensures that they carry out operations which bring in profit.

Machine learning also cuts on the cost of human labour who would take days to analyse data before giving you feasibility reports which are prone to error.

---
Peer Review Contributions by: [Peter Kayere](/engineering-education/authors/peter-kayere/)