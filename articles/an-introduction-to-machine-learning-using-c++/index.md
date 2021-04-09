C++ is a high-level object-oriented programming language with a faster run time than most programming languages since it is closer to the machine level. Recent advancement in machine learning and other artificial intelligence related facets has been seen to be implemented using python due to its flexibility and rich library support as well as an active community of users.
Why am I vouching for C++ you would ask? C++ is the first language most programmers learnt while starting their journey and thus discarding it along the way without exploiting its full functionality doesn't sit right with me. Regardless, C++ is still being taught in most universities as a foundational programming language for computer science and other related courses.
C++ has a faster run time as compared to other programming languages and thus suitable for machine learning since fast and reliable feedback is essential in machine learning. C++ also has a rich library support that is used in machine learning which we will get to later.

### Goal
The goal of this tutorial is to educate the user on how to implement machine learning algorithms using the C++ programming language. Since this is an introductory part we will implement the algorithms from scratch to foster understanding and thus it would be much easier when we start with libraries.

### Prerequisites
To follow along with this tutorial, the learner should meet the following minimum requirements.
- Basic understanding of programming in C++ and the use of objects in storing big data.
- A pre-installed IDE, prefferably [Codeblocks](https://www.codeblocks.org/downloads/binaries).
- A good mathematical background to be able to understand the statistical methods to be used.

### What is Machine learning?
Machine learning is a facet of artificial intelligence. It refers to the ability of computer systems to independently find solutions to problems by recognizing patterns of data stored in a database.The initial input of humans is required to write the algorithms to be used by the computer system and also collecting the data and putting it into datasets. Afterwards, the machine learns independently and can find solutions.

### Implementation of the statistical and mathematical methods for machine learning in C++
Before we embark on writing the code, we need to understand the approach we will be using. In our Machine learning approach, we will use two mathematical approaches to enable our system learn, namely:-
- Linear regression
- Logistic regression

1. **Linear regression**

Linear regression models are used to predict the value of one factor based on the value of another factor. The value being determined is called the dependent variable while the value being used to determine the dependent variable is called the independent variable
The mathematical equation for linear regression is:
```
y=B0 + B1x
```
![Linear regression](/engineering-education/articles/an-introduction-to-machine-learning-using-c++/linearRegression.png)

For example, we can use linear regression to determine the amount of rainfall received in an area based on the temperature of the area. The dependent variable would be the amount of rainfall received while the independent variable would be the temperature of the area.

- **Loss function**

The loss is the error in our predicted value of `B0` and `B1`. We want to minimize the error so that we have the most accurate values for `B0` and `B1` so that we have the best fit line for future predictions. For simplicity,we will use the loss function below 
```
e^i=p^i- y^i

```
whereby:

e^i is the error of ith training example

p^i is the predicted value of ith training example

y^i is the actual value of the ith training example

- **Gradient descent algorithm**

Gradient descent is an iterative optimization algorithm used to find the the minimum of a function in this case the loss function above.

![Gradient descent](/engineering-education/articles/an-introduction-to-machine-learning-using-c++/gradientdescent.png)

Here we start with initial random values of `B0` and`B1` and based on the error of each instance, we update their value.
Here’s how it works:
Initially, let `B1` = 0 and `B0` = 0. Let `L` be our learning rate. This controls how much the value of B1 changes with each step. `L` could be a small value like 0.01 for good accuracy
We calculate the error for the first point: 

e(1) = p(1) – y(1)

We’ll update `B0` and `B1` according to the following equation:
```

b0(t+1) = b0(t) - L * error
b1(t+1) = b1(t) - L * error
```
We’ll do this for each instance of a training set. This completes one epoch. We’ll repeat this for more epochs to get more accurate predictions.

You can refer to these comprehensive guides to get a more in-depth intuition of linear regression and gradient descent:

1. [Beginner's guide to linear regression](https://www.analyticsvidhya.com/blog/2017/06/a-comprehensive-guide-for-linear-ridge-and-lasso-regression/?utm_source=blog&utm_medium=machine-learning-using-c-linear-logistic-regression)
2. [Gradient descent for machine learning](https://machinelearningmastery.com/gradient-descent-for-machine-learning/)

### Implementing linear regression using C++
Let us define the dataset that we will be using for our tutorial. It is contained in the image below

![dataset1](/engineering-ed/articles/an-introduction-to-machine-learning-using-c++/dataset1.png)

We’ll train our dataset on the first 5 values and test on the last value:
```c++
double x[] = {1, 2, 4, 3, 5};
double y[] = {1, 3, 3, 2, 5};
```

Next, we’ll define our variables:
```c++
vector<double>error; // for storing the error values
double err;    // for calculating error on each stage
double b0 = 0; // intializing b0
double b1 = 0; // initializing b1
double alpha = 0.01; // initializing our learning rate
```
Training Phase

Our next step is the gradient descent algorithm:
```C++
for (int i = 0; i < 20; i ++) {   // since there are 5 values and we want 4 epochs so run for loop for 20 times
    int idx = i % 5;   //for accessing index after every epoch
    double p = b0 + b1 * x[idx];  //calculating prediction
    err = p - y[idx]; // calculating error
    b0 = b0 - alpha * err; // updating b0
    b1 = b1 - alpha * err * x[idx];// updating b1
    cout<<"B0="<<b0<<" "<<"B1="<<b1<<" "<<"error="<<err<<endl;// printing values after every updation
    error.push_back(err);
}
```

Since there are 5 values and we are running the whole algorithm for 4 epochs, hence 20 times our iterative function works. The variable p calculates the predicted value of each instance. The variable err is used for calculating the error of each instance. We then update the values of b0 and b1 as explained above in the gradient descent section above. We finally push the error in the error vector.

As you will notice, B0 does not have any input. This coefficient is often called the bias or the intercept and we can assume it always has an input value of 1.0. This assumption can help when implementing the algorithm using vectors or arrays.

Finally, we’ll sort the error vector to get the minimum value of error and corresponding values of b0 and b1. At last, we’ll print the values:
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

We’ll enter the test value which is 6. The answer we get is 4.9753 which is quite close to 5. Congratulations! We just completed building a linear regression model with C++, and that too with good parameters.
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
double err;
double b0 = 0;                   //initializing b0
double b1 = 0;                   //initializing b1
double alpha = 0.01;             //intializing error rate
 
/*Training Phase*/
for (int i = 0; i < 20; i ++) {   // since there are 5 values and we want 4 epochs so run for loop for 20 times
    int idx = i % 5;              //for accessing index after every epoch
    double p = b0 + b1 * x[idx];  //calculating prediction
    err = p - y[idx];              // calculating error
    b0 = b0 - alpha * err;         // updating b0
    b1 = b1 - alpha * err * x[idx];// updating b1
    cout<<"B0="<<b0<<" "<<"B1="<<b1<<" "<<"error="<<err<<endl;// printing values after every updation
    error.push_back(err);
}
sort(error.begin(),error.end(),custom_sort);//sorting based on error values
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