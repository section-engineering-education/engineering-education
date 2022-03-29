---
layout: engineering-education
status: publish
published: true
url: /cpp-model-in-a-python-machine-learning-project/
title: How to Build a C++ Model in a Python Machine Learning Project
description: This article will help the reader understand how to build a custom machine learning model using C++ and incorporate into a Python project.
author: terrence-aluda
date: 2022-03-03T00:00:00-10:20
topics: [Machine Learning]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/cpp-model-in-a-python-machine-learning-project/hero.png
    alt: C++ Model in a Python Machine Learning Project Hero Image
---
Python is quite versatile when building Machine Learning models. This is due to the large community, many libraries, as well as short and easy-to-understand code. However, it has a disadvantage when it comes to execution speed. This is where a high-speed language like C++ comes in. 
<!--more-->
Though we can build a fast ML model using C++, it's no match to Python when it comes to the number of Machine Learning libraries. Nevertheless, we can utilize Python libraries such as *Numpy* and *Pandas* for data preprocessing and then build a model running on C++.

Python has the *ctypes* module that allows us to call C++ code and use it in our program. In this article, we are going to harness ctypes' capabilities and create an ML model. We will build a *Logistic Regression model* and then optimize it using *Gradient Descent*. The main aim of this article is to guide you on how you can build your custom model using C++. 

### Prerequisites
This is a bit of advanced-level content. Therefore, a solid understanding of the following languages is required:

1. *C++* - You should have some knowledge of pointers, data structures like vectors, and object-oriented programming semantics.
2. *Python* - You should be familiar with its tooling and ecosystem.
3. Machine Learning concepts.

You also need to approach this tutorial with a research-oriented mindset. This is a required skill for a data scientist.

### Overview
We will start by briefly looking at what Logistic regression entails. Next, we will discuss the Gradient descent optimization algorithm. 

Thereafter, we will write the C++ code. Finally, we will build the C++ file as a shared library and consume it in Python using the *ctypes* module. 

Let's get started!

### Logistic regression
This is a classification algorithm used in supervised learning. Its main aim is to show the probability that an instance belongs to a certain class under target. It does so by calculating the sum of the features multiplied by their weights plus the bias term. 

To perform the prediction, the sum is passed into a sigmoid function, as shown in the equation below:

![Sigmoid image](/engineering-education/cpp-model-in-a-python-machine-learning-project/sigmoid.png)

A cost function (*log loss*) is used when the model outputs a very high probability for a positive instance and a very lower one for a negative instance. 

The cost for the whole training set is the average of all the instances' costs. The cost of an instance is done by calculating the prediction error i.e the prediction value - the actual value.

![Log loss image](/engineering-education/cpp-model-in-a-python-machine-learning-project/log-loss.png)

We can optimize the cost function using any optimization algorithm such as gradient descent since it is convex. To do that, we have to get the derivative of the *log loss*. This is done using partial derivatives:

![Derived log loss image](/engineering-education/cpp-model-in-a-python-machine-learning-project/derived.png)

If you want to look at how this function is derived, have a look at [this article](https://medium.com/analytics-vidhya/derivative-of-log-loss-function-for-logistic-regression-9b832f025c2d).

We will look at this function in detail later in the C++ code. Find out more about Logistic Regression [here](https://christophm.github.io/interpretable-ml-book/logistic.html).

### Gradient descent (GD) algorithm
It minimizes a cost function by repeatedly updating its parameters (weight and bias) until convergence is reached. 

GD calculates the gradient of the error function and moves along a descending gradient until a minimum is reached. Have a look at the pseudocode below:

```python
weight = 0
bias = 0
update until minimum:
    weight = weight - (learning rate × (weight gradient))
    bias = bias - (learning rate × (bias gradient))
```

For logistic regression, the gradient of the bias is calculated by simply finding the derivative of the log loss while that of the weights is gotten by multiplying the log loss derivative by the feature weight. 

The learning rate is used to control the number of iterations until convergence. More on GD can be found [here](https://www.analyticsvidhya.com/blog/2020/10/how-does-the-gradient-descent-algorithm-work-in-machine-learning/#:~:text=Gradient%20descent%20is%20an%20iterative,function%20at%20the%20current%20point).

Let's now look at the C++ code.

### C++ code
We will break the project into small sections before showing the full code.

The first step is to import the required modules and the `std` namespace:

```C++
#include<iostream>
#include <math.h>
#include <vector>

using namespace std;
```

A class with the method signatures is created as follows:

```C++
class CPPLogisticRegression{
    public:
        //method for updating the weights and bias
        vector<double> updateWeightsAndBias(int noOfIterations, int noOfRows, int noOfColumns);
        //method for the prediction
        double predict(vector<double> vW, double* X_train_test);
};
```

#### Updating weights and the bias term
Next, we dissect the method for updating the weights and the bias term:

```C++
vector<double> CPPLogisticRegression::updateWeightsAndBias(int noOfIterations, int noOfRows, int noOfColumns){
            double row_pred_diff = 0.0;
            double total_diff = 0.0;
            double feature_weight[noOfColumns] = {0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0};
            double total_feature_weight[noOfColumns] = {0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0};
            double weight_derivative[noOfColumns] = {0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0};
            double bias_derivative = 0.0;
            double W[noOfColumns] = {0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0};
            double bias = 0.0;
            vector<double> vWB;

            //train set
            double X_train[noOfRows][noOfColumns] = {
            {57.0,0.0,0.0,140.0,241.0,0.0,1.0,123.0,1.0,0.2,1.0,0.0,3.0},
            {45.0,1.0,3.0,110.0,264.0,0.0,1.0,2.0,0.0,1.2,1.0,0.0,3.0},
            {68.0,1.0,0.0,144.0,13.0,1.0,1.0,141.0,0.0,3.4,1.0,2.0,3.0},
            {57.0,1.0,0.0,80.0,1.0,0.0,1.0,115.0,1.0,1.2,1.0,1.0,3.0},
            {57.0,0.0,1.0,0.0,236.0,0.0,0.0,174.0,0.0,0.0,1.0,1.0,2.0},
            {61.0,1.0,0.0,140.0,207.0,0.0,0.0,8.0,1.0,1.4,2.0,1.0,3.0},
            {46.0,1.0,0.0,140.0,311.0,0.0,1.0,120.0,1.0,1.8,1.0,2.0,3.0},
            {62.0,1.0,1.0,128.0,208.0,1.0,0.0,140.0,0.0,0.0,2.0,0.0,2.0},
            {62.0,1.0,1.0,128.0,208.0,1.0,0.0,140.0,0.0,0.0,2.0,0.0,2.0}};

            //labels
            double Y[noOfRows] = {0.0,0.0,0.0,0.0,0.0,0.0,0.0,1.0,1.0};          
                
            for (int l = 0; l < noOfIterations; l++){
                    for (int i = 0; i < noOfRows; i++){
                        double Wx = 0.0;
                        //computing W.x
                        for (int j = 0; j < noOfColumns; j++){
                            Wx = W[j] * X_train[i][j];
                        }
                        //computing (σ(W.x) + b) - Y
                        row_pred_diff = (1/(1 + exp(-(Wx+bias))))-Y[i];
                        for (int k = 0; k < noOfColumns; k++){
                            //computing (σ(W.x) + b) - Y × x(i)
                            feature_weight[k] = row_pred_diff * X_train[i][k];
                            //summation(Σ) of each feature weight
                            total_feature_weight[k] += feature_weight[k];
                        }
                        //summation(Σ) of predictions
                        total_diff += row_pred_diff;
                            
                    }
                //updating the weights for each feature    
                for (int z = 0; z < noOfColumns; z++){
                        //computing the average of the weights(1/m)
                        weight_derivative[z] = total_feature_weight[z]/noOfRows;
                        W[z] = W[z] - 0.1 * weight_derivative[z];
                        //storing the values in a vector
                        vWB.push_back(W[z]);
                    }
                        
                    //calculating the bias
                    bias_derivative = total_diff/noOfRows;
                    bias = bias - 0.1 * bias_derivative;
                    vWB.push_back(bias);
            }
        return vWB;

}
```

We need to appropriately initialize the *arrays*. Next, we create a *for-loop* with two inner loops.

In the first inner loop, we have two inner for-loops used to compute the weighted *sum(W.x)* and another one to compute a summation of each *feature weight*. 

In the end, we calculate the *summation(Σ)* of *predictions(costs)* of each instance.

```C++
    for (int i = 0; i < noOfRows; i++){
        double Wx = 0.0;
        //computing W.x
            for (int j = 0; j < noOfColumns; j++){
                Wx = W[j] * X_train[i][j];
            }
        //computing (σ(W.x) + b) - Y
            row_pred_diff = (1/(1 + exp(-(Wx+bias))))-Y[i];
            for (int k = 0; k < noOfColumns; k++){
                //computing (σ(W.x) + b) - Y × x(i)
                feature_weight[k] = row_pred_diff * X_train[i][k];
                //summation(Σ) of each feature weight
                total_feature_weight[k] += feature_weight[k];
            }
            //summation(Σ) of predictions
            total_diff += row_pred_diff;
                        
    }
```

In the second inner loop, we compute the weights of each feature by computing the average of the total *feature weights* and then updating them. 

The weights are then stored in a vector (0.1 is the learning rate).

```C++
    for (int z = 0; z < noOfColumns; z++){
        //computing the average of the weights(1/m)
        weight_derivative[z] = total_feature_weight[z]/noOfRows;
        W[z] = W[z] - 0.1 * weight_derivative[z];
        //storing the values in a vector
        vWB.push_back(W[z]);
    }
```

The last step in the outer loop is updating the *bias* term and storing it as the last item in a vector.

> We stored the weights and the bias in one vector since C++ does not allow returning more than one value from a method/function like Python.

```C++
//calculating the bias
bias_derivative = total_diff/noOfRows;
bias = bias - 0.1 * bias_derivative;
vWB.push_back(bias);
```

The function returns the *vector* containing the *weights* and the *bias* term.

#### Prediction
The vector we returned from the previous function is passed into this function together with an *array* of test features. 

We calculate the weighted sum as we did in the previous function then calculate the *sigmoid* to get a probability. 

The accuracy is quite low since we only have a few test features.

```C++
    double CPPLogisticRegression::predict(vector<double> vW, double* X_train_test){
        static double predictions;
        double Wx_test = 0.0;
            //calculating the σ(W.x)
            for (int j = 0; j < 13; j++){
                Wx_test += (vW[j] * X_train_test[j]);
            }
            //adding the bias term
            predictions = 1/(1 + exp(-(Wx_test + vW.back()))); 
            //making the prediction
            if(predictions>0.5){
                predictions = 1.0;
            }else{
                predictions = 0.0;
            }
        return predictions;
    }
```

We use the `extern C` statement to write functions that will be accessible outside the C++ code. 

These are functions that we will call in the Python code. For Windows, you will append the literal `__declspec(dllexport)` before the functions ie:

```C++
__declspec(dllexport) CPPLogisticRegression* LogisticRegression(){
    //......
}
```

You can read more about *ctypes* from this [official documentation](https://docs.python.org/3/library/ctypes.html).

```C++
    extern "C"{
        //vector to store the weights and bias gotten from the updateWeightsAndBias() function
        vector<double> vX;
        CPPLogisticRegression* LogisticRegression(){
            CPPLogisticRegression* log_reg = new CPPLogisticRegression();
            return log_reg;
        }

        void fit(CPPLogisticRegression* log_reg) {
            vX = log_reg->updateWeightsAndBias(50,9,13); 
        }

        double predict(CPPLogisticRegression* log_reg, double* array){
            return log_reg->predict(vX,array);
        }
    }
```

In the code above, the `LogisticRegression()` function instantiates the class we created and returns it. 

The `fit()` function calls the method for updating the *weights* and the *bias* term. It returns a vector which is later passed to the class' `predict()` function inside the `predict()` function.

> Note the difference between the two similarly named prediction functions. The array for the predict function will be passed in from Python.

Here is the full C++ code:

```C++
#include<iostream>
#include <math.h>
#include <vector>

using namespace std;

class CPPLogisticRegression{
    public:
        //method for updating the weights and bias
        vector<double> updateWeightsAndBias(int noOfIterations, int noOfRows, int noOfColumns);
        //method for the prediction
        double predict(vector<double> vW, double* X_train_test);
};

        vector<double> CPPLogisticRegression::updateWeightsAndBias(int noOfIterations, int noOfRows, int noOfColumns){
                double row_pred_diff = 0.0;
                double total_diff = 0.0;
                double feature_weight[noOfColumns] = {0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0};
                double total_feature_weight[noOfColumns] = {0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0};
                double weight_derivative[noOfColumns] = {0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0};
                double bias_derivative = 0.0;
                double W[noOfColumns] = {0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0};
                double bias = 0.0;
                vector<double> vWB;

                //train set
                double X_train[noOfRows][noOfColumns] = {
                {57.0,0.0,0.0,140.0,241.0,0.0,1.0,123.0,1.0,0.2,1.0,0.0,3.0},
                {45.0,1.0,3.0,110.0,264.0,0.0,1.0,2.0,0.0,1.2,1.0,0.0,3.0},
                {68.0,1.0,0.0,144.0,13.0,1.0,1.0,141.0,0.0,3.4,1.0,2.0,3.0},
                {57.0,1.0,0.0,80.0,1.0,0.0,1.0,115.0,1.0,1.2,1.0,1.0,3.0},
                {57.0,0.0,1.0,0.0,236.0,0.0,0.0,174.0,0.0,0.0,1.0,1.0,2.0},
                {61.0,1.0,0.0,140.0,207.0,0.0,0.0,8.0,1.0,1.4,2.0,1.0,3.0},
                {46.0,1.0,0.0,140.0,311.0,0.0,1.0,120.0,1.0,1.8,1.0,2.0,3.0},
                {62.0,1.0,1.0,128.0,208.0,1.0,0.0,140.0,0.0,0.0,2.0,0.0,2.0},
                {62.0,1.0,1.0,128.0,208.0,1.0,0.0,140.0,0.0,0.0,2.0,0.0,2.0}};

                //labels
                double Y[noOfRows] = {0.0,0.0,0.0,0.0,0.0,0.0,0.0,1.0,1.0};          
                

                for (int l = 0; l < noOfIterations; l++){
                        for (int i = 0; i < noOfRows; i++){
                        double Wx = 0.0;
                            //computing W.x
                            for (int j = 0; j < noOfColumns; j++){
                                Wx = W[j] * X_train[i][j];
                            }
                            //computing (σ(W.x) + b) - Y
                            row_pred_diff = (1/(1 + exp(-(Wx+bias))))-Y[i];
                            for (int k = 0; k < noOfColumns; k++){
                                //computing (σ(W.x) + b) - Y × x(i)
                                feature_weight[k] = row_pred_diff * X_train[i][k];
                                //summation(Σ) of each feature weight
                                total_feature_weight[k] += feature_weight[k];
                            }
                            //summation(Σ) of predictions
                            total_diff += row_pred_diff;
                            
                        }
                    //updating the weights for each feature    
                    for (int z = 0; z < noOfColumns; z++){
                            //computing the average of the weights(1/m)
                            weight_derivative[z] = total_feature_weight[z]/noOfRows;
                            W[z] = W[z] - 0.1 * weight_derivative[z];
                            //storing the values in a vector
                            vWB.push_back(W[z]);
                    }
                        
                        //calculating the bias
                        bias_derivative = total_diff/noOfRows;
                        bias = bias - 0.1 * bias_derivative;
                        vWB.push_back(bias);
                }
            return vWB;

        }

        double CPPLogisticRegression::predict(vector<double> vW, double* X_train_test){
            static double predictions;
            double Wx_test = 0.0;
                //computing σ(W.x)
                for (int j = 0; j < 13; j++){
                    Wx_test += (vW[j] * X_train_test[j]);
                }
                //adding the bias term
                predictions = 1/(1 + exp(-(Wx_test + vW.back()))); 
                //making the prediction
                if(predictions>0.5){
                    predictions = 1.0;
                }else{
                    predictions = 0.0;
                }
            return predictions;
        }

extern "C"{
    //vector to store the weights and bias gotten from the updateWeightsAndBias() function
    vector<double> vX;
    CPPLogisticRegression* LogisticRegression(){
        CPPLogisticRegression* log_reg = new CPPLogisticRegression();
        return log_reg;
    }

    void fit(CPPLogisticRegression* log_reg) {
        vX = log_reg->updateWeightsAndBias(50,9,13); 
    }

    double predict(CPPLogisticRegression* log_reg, double* array){
        return log_reg->predict(vX,array);
    }
}
```

Before we look at the Python code, let's create a shared library.

### Creating a shared library
Create a Python file called *setup.py* and add the following code:

```python
from setuptools import setup, Extension

module1 = Extension('logistic',
                    sources = ['logistic.cpp'])

setup (name = 'Logistic Regression Model',
    version = '1.0',
    description = 'This is a Logistic Regression Model writen in C++',
    ext_modules = [module1])
```

The above code creates a shared library called *logistic* from the *logistic.cpp* file. The file will be created in the *build* directory. 

>Note that this is platform-independent. For Linux, it will create a *.so* file while Windows will produce a *.pyd* file. 

I ran mine on Linux and it produced a file named *logistic.cpython-310-x86_64-linux-gnu.so*. Be sure to check yours.

Run the code using the following command in your terminal:

```bash
python setup.py build
```

### Python code
As we did for the C++ code, we first import the required modules:

```python
import ctypes as ct
import numpy as np
import pandas as pd
```
Next, we load the shared library that we created:

```python
#the build file location
libfile = r"build/lib.linux-x86_64-3.10/logistic.cpython-310-x86_64-linux-gnu.so"
#loading it for use
our_lib = ct.CDLL(libfile)
```
We then set the return types for the functions in the `extern C` section of our C++ file:

```python
#setting the return types for our C++ methods
our_lib.fit.argtypes = [ct.c_void_p]
our_lib.predict.argtypes = [ct.c_void_p, np.ctypeslib.ndpointer(dtype=np.float64)]
our_lib.predict.restype = ct.c_double
```

The rest of the code is for initializing the class, creating the array to be added to the `predict()` method, and displaying the predicted value.

```python
#initializing the class
tree_obj = our_lib.LogisticRegression()

#the array to test the model
test_features = np.array((62.0,1.0,1.0,128.0,208.0,1.0,0.0,140.0,0.0,0.0,2.0,0.0,2.0))
test_features = test_features.astype(np.double)

#calling the fit method
predictions = our_lib.fit(tree_obj)

#predictiing
pred = our_lib.predict(tree_obj,test_features)
print("Predicted value:",pred)
```

The full Python code is shown below:

```python
import ctypes as ct
import numpy as np
import pandas as pd

#the build file location
libfile = r"build/lib.linux-x86_64-3.10/logistic.cpython-310-x86_64-linux-gnu.so"
#loading it for use
our_lib = ct.CDLL(libfile)

#setting the return types for our C++ methods
our_lib.fit.argtypes = [ct.c_void_p]
our_lib.predict.argtypes = [ct.c_void_p, np.ctypeslib.ndpointer(dtype=np.float64)]
our_lib.predict.restype = ct.c_double

#initializing the class
tree_obj = our_lib.LogisticRegression()

#the array to test the model
test_features = np.array((62.0,1.0,1.0,128.0,208.0,1.0,0.0,140.0,0.0,0.0,2.0,0.0,2.0))
test_features = test_features.astype(np.double)

#calling the fit method
predictions = our_lib.fit(tree_obj)

#predictiing
pred = our_lib.predict(tree_obj,test_features)
print("Predicted value:",pred)
```

### Conclusion
In this tutorial, we discussed the Logistic regression and Gradient Descent optimization algorithms. Then we wrote the C++ code and built a shared library that will be consumed in Python. 

You can, therefore, use this knowledge to create your C++ models.

Apart from ctypes, there are other wrapper tools such as CFFI, PyBind11, etc. Have a look at [this article](https://realpython.com/python-bindings-overview/) for more information about them. 

Feel free to suggest changes, improvements, and corrections in the comment section below.

Happy coding!

---
Peer Review Contributions by: [Wanja Mike](/engineering-education/authors/michael-barasa/)