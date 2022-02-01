It's with no doubt that Python is more versatile in building Machine Learning models. This is due to the large community, many libraries, short and easy-to-understand code, etc. However, it has its shortfalls when it comes to execution speed. This is where a high-speed language like C++ comes in. We can build a fast executing ML model using C++, but it's no match to Python in the number of Machine Learning libraries. How about utilizing Python libraries such as Numpy and Pandas for data preprocessing and then building a model running on C++?.

Owing to that, Python has the ctypes module that allows us to call C++ code and use it in Python code. In this article, we are going to harness ctypes' capabilities and create a model. We will build a Logistic Regression model and then optimize it using Gradient Descent.

> The main aim of this article is to show you how you can build your custom model using C++. It is a guide.

### Prerequisites
This is a bit of advanced-level content. Therefore, a solid understanding of these is necessary:
1. **C++** - Knowledge of pointers, data structures like vectors, and its Object-Oriented Programming semantics.
2. **Python** - Familiarity with its tooling and ecosystem.
3. Machine Learning concepts.

You also need to approach it with a research-oriented mindset. That's a required skill for a data scientist.

### An overview of what we will be doing
We will start by briefly looking at what Logistic regression entails. Secondly, we will look at the working of the Gradient descent optimization algorithm. Thereafter, we will write the C++ code. Finally, we will build the C++ file as a shared library and consume it in Python using the ctypes module. Alright, let's dig in.

### Logistic regression
This is a classification algorithm used in supervised learning. Its main aim is to show the probability that an instance belongs to a certain class under target. It does so by calculating the sum of the features multiplied by their weights plus the bias term. To do the prediction, the sum is passed into a sigmoid function as shown in the equation below.

![sigmoid image](engineering-education/cpp-python-ctypes-model/sigmoid.png)

A cost function(**log loss**) is used such that the model outputs a very high probability for a positive instance and a very lower one for a negative instance. The cost for the whole training set is the average of all the instances' costs. The cost of an instance is done by getting the prediction error i.e the prediction value - the actual value.

![log loss image](engineering-education/cpp-python-ctypes-model/log-loss.png)

We can optimize the cost function using any optimization algorithm such as gradient descent since it is convex. To do that, we have to get the derivative of the log loss. This is done using partial derivatives to achieve this:

![derived log loss image](engineering-education/cpp-python-ctypes-model/derived.png)

If you want to look at how this function is derived, have a look at [this article](https://medium.com/analytics-vidhya/derivative-of-log-loss-function-for-logistic-regression-9b832f025c2d).

We will look at this function in detail later in the C++ code. Find more about Logistic Regression [here](https://christophm.github.io/interpretable-ml-book/logistic.html).

### Gradient descent(GD) algorithm
It minimizes a cost function by repeatedly updating its parameters(weight and bias) until a convergence is arrived at. GD calculates the gradient of the error function and moves along a descending gradient until a minimum is reached. Have a look at the pseudocode below:

```bash
weight = 0
bias = 0
update until minimum:
    weight = weight - (learning rate × (weight gradient))
    bias = bias - (learning rate × (bias gradient))

```

For logistic regression, the gradient of the bias is calculated by simply finding the derivative of the log loss while that of the weights is gotten by multiplying the log loss derivative by the feature weight. The learning rate is used to control the number of iterations until convergence. More on GD is found [here](https://www.analyticsvidhya.com/blog/2020/10/how-does-the-gradient-descent-algorithm-work-in-machine-learning/#:~:text=Gradient%20descent%20is%20an%20iterative,function%20at%20the%20current%20point.).

Let's now look at the C++ code.

### C++ code
> We will break it step by step before showing the full code.

We import the required modules and the `std` namespace.

```C++
#include<iostream>
#include <math.h>
#include <vector>

using namespace std;
```
 A class with the method signatures is created.

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
Next, we dissect the method for updating the weights and the bias term.

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
First, we appropriately initialize the arrays. Next, we create a **for-loop** with two inner loops.

In the first inner loop, we have two inner loops for computing the weighted sum(W.x) and another one for computing a summation of each feature weight. In the end, we calculate the summation(Σ) of predictions(costs) of each instance.

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

In the second inner loop, we compute the weights of each feature by computing the average of the total feature weights and then updating them. The weights are then stored in a vector(0.1 is the learning rate).

```C++
        for (int z = 0; z < noOfColumns; z++){
            //computing the average of the weights(1/m)
            weight_derivative[z] = total_feature_weight[z]/noOfRows;
            W[z] = W[z] - 0.1 * weight_derivative[z];
            //storing the values in a vector
            vWB.push_back(W[z]);
        }
```

The last step in the outer loop is updating the bias term and storing it as the last item in a vector.

> We stored the weights and the bias in one vector since C++ does not allow returning more than one value from a method/function like Python.

```C++
        //calculating the bias
        bias_derivative = total_diff/noOfRows;
        bias = bias - 0.1 * bias_derivative;
        vWB.push_back(bias);
```

The function returns the vector containing the weights and the bias term.

#### Prediction
The vector we returned from the previous function is passed into this function together with an array of test features. We calculate the weighted sum like we did in the previous function the calculate the sigmoid for getting a probability. The accuracy is quite low since we have a few test features.

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

The `extern "C"` statement to write functions that will be accessible outside the C++ code. That is, the functions we will call in the Python code. For Windows, you will prepend the literal `__declspec(dllexport)` before the functions ie:

```C++
    __declspec(dllexport) CPPLogisticRegression* LogisticRegression(){
        //......
    }
```

Read the ctypes [documentation](https://docs.python.org/3/library/ctypes.html) for more.

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

We have a function, `LogisticRegression()`, that instantiates the class we created and returns it. The `fit()` function calls the method for updating the weights and the bias term. It returns a vector which is later passed to the class' `predict()` function inside the `predict()` function.(Note the difference between the two similarly named prediction functions). The array for the predict function will be passed in from Python.

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

Before we look at the Python code, let's created a shared library.

### Creating a shared library
Create a python called *setup.py* and paste this code.

```python
        from setuptools import setup, Extension

        module1 = Extension('logistic',
                            sources = ['logistic.cpp'])

        setup (name = 'Logistic Regression Model',
            version = '1.0',
            description = 'This is a Logistic Regression Model writen in C++',
            ext_modules = [module1])
```

The code creates a shared library called logistic from the logistic.cpp file. The file will be created in a directory called *build*. Note that this is platform-independent. For Linux, it will create a **.so** file while Windows will produce a **.pyd** file. Check the ctypes documentation in the link I previously shared. I ran mine on Linux and it produced a file named *logistic.cpython-310-x86_64-linux-gnu.so*. Be sure to check yours.

Type this in your terminal to run the code:

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
Next, we load the shared library we created:

```python
#the build file location
libfile = r"build/lib.linux-x86_64-3.10/logistic.cpython-310-x86_64-linux-gnu.so"
#loading it for use
our_lib = ct.CDLL(libfile)
```
We then set the return types for the functions in the `extern "C"` section of our C++ file:

```python
#setting the return types for our C++ methods
our_lib.fit.argtypes = [ct.c_void_p]
our_lib.predict.argtypes = [ct.c_void_p, np.ctypeslib.ndpointer(dtype=np.float64)]
our_lib.predict.restype = ct.c_double
```

The rest of the code is for initializing the class, creating the array to be fed to the `predict()` method, and displaying the predicted value.

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

The full code:
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
That was it. We started by looking at the working of the Logistic regression and  Gradient Descent optimization algorithms. Thereafter, we wrote the C++ code. Lastly, we built the C++ file as a shared library and consumed it in Python. You can now start creating your C++ models.

Another point to note, there are other wrapper tools apart from ctypes e.g CFFI, PyBind11, etc. Have a look at [this article](https://realpython.com/python-bindings-overview/) for more about them.

Have a good one!