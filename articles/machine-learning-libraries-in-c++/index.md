What is the essence of using libraries for machine learning? This is a sequel to an earlier article where we implemented algorithms from scratch and highlighted on the reasons why we should use C++ for Machine learning. We created machine learning models in C++ which was not only cumbersome but missed out on a majority of aspects contained in Machine learning.The article can be found [here](/engineering-ed/articles/Introduction-to-machine-learning-using-c++). 

Libraries enable the reuse of code for solving problems.Nowadays solutions to common problems come in form of libraries and packages which have been thoroughly tested and optimized. The code could have been implemented by an expert or an enthusiast. This saves one from the problem of having to "reinvent the wheel" each time especially when working or learning under strict deadlines.
C++ as a programming language has libraries that are useful for machine learning. In this article, we will look at the **SHARK** and **MLPACK** libraries and exploit their functionality in machine learning.

### PREREQUISITES
- An understanding of machine learning models and algorithms.
- An intermediate level of expertise programming in C++.
- An intuition of machine learning models and algorithms.

### 1. SHARK LIBRARY
Shark is a very fast module based library that suports supervised learning algorithms like clustering,inear-regression,neural networks and k-means.
In addition to that,shark includes the functionality of linear algebra and numerical optimization.

#### INSTALLING SHARK AND SET UP ENVIRONMENT
I will be doing this for the linux based operating system. For windows users, you can install the windows subsystem for linux whereby you will be able to run the linux operating system as a windows program. It is outlined in this [link](https://ubuntu.com/tutorials/ubuntu-on-windows). It has many of the same features you will find using terminal on Ubuntu.

The shark library relies on Boost and Cmake. These two are the dependencies of the Shark library. Type the following command on your terminal to install all the dependencies.

``` sudo apt-get install cmake cmake-curses-gui libatlas-base-dev libboost-all-dev ```

To install Shark you need to run the following commands line by line:

1. ```git clone https://github.com/Shark-ML/Shark.git ```
2. ```cd shark ```
3. ```mkdir build ```
4. ```cd build ..```
5. ```cmake ..```
6. ```make```

#### HOW TO COMPILE PROGRAMS 
To be able to compile programs with shark, you need to include the header files needed for your use case in machine learning. Let's say for linear regression, you would need to include the following extra header files.
```C++
#include <shark/ObjectiveFunction/Loss/Squaredloss.h>
#include <shark/Algorithms/Trainers/LinearRegression.h>
```
You need to link with the following libraries in order to compile.
```
-std=c++11 -lboost_serialization-lshark-lcblas
```


#### IMPLEMENT LINEAR REGRESSION 
- Initialize the data

Include the header files and libraries for linear regression.
```c++
#include <bits/stdc++.h> //header file for all basic c++ libraries
#include <shark/Data/Csv.h> //header file for importing data in csv format
#include <shark/ObjectiveFunctions/Loss/SquaredLoss.h> //header file for implementing squared loss function
#include <shark/Algorithms/Trainers/LinearRegression.h>
```
Now we need a data set. I have included two .csv files. The independent.csv files includes the x values and the dependent.csv file includes the y values. This is what should be in your mind. ![demo](url/dataset.png).

The two .csv files can be found on my github [KanizoRGB](https://github.com/KanizoRGB/Machine-learning-libraries.git).

Next,create a container to hold the data from the csv files.
```c++
Data<RealVector> independent; //store the independent values
Data<RealVector> dependent;//store the dependent values
```
We now need to import the data into our containers. Shark has an `importCSV` function. It is used in the following format 
```
importCSV(datacontainer, "filelocation")
```
For our case it thus will be
```c++
importCSV(independent, "independent.csv"); // storing the values in specific container by specifying the path of csv
importCSV(dependent, "dependent.csv");
```
Instantiate a regression dataset type and pass our independent and dependent in the constructor for the data. Thereafter, train the linear regression model by instantiating a trainer and define a linear model:
```c++
RegressionDataset data(independent, dependent);
LinearRegression trainer;// trainer for linear regression model
LinearModel<> model; // linear model
```

- Train the model

This is how we now train the model. The trainer has a member called train. The member trains the model and finds parameters for it.

```c++
trainer.train(model, data)
```

- Prediction

Let's output the model parameters
```c++
// show model parameters
cout << "intercept: " << model.offset() << endl;
cout << "matrix: " << model.matrix() << endl;
```
The offset member function of linear models outputs the intercept of the best fit line. We also output a matrix insted of a multiplier since the model does not necessarily have to be linear. It can be generalized.

The line of best fit is gotten by minimizing the squared loss. Luckily, the model allows us to display all that information.
We first need to initialize a `squared loss` object and then instantiate a data container which we will call predicted. The predicted value is computed based on the independent variables fed into the system and then we output the loss which is gotten by passing the dependent values and the predicted value.

```c++
SquaredLoss<> loss;   //initializing square loss object
Data<RealVector> predicted = model(data.independent());  //predicted is calculated based on  the independent variables fed into the system.
cout << "squared loss: " << loss(data.dependent(), predicted) << endl;
```
Finally, compile the whole code by typing the following code in the terminal.
```
g++ -o lr linear_regression.cpp -std=c++11 -lboost_serialization -lshark -lcblas
```
Once,it finishes compiling, you would have created an `lr` object . Upon running the program you get:
```c++
b : [1](-0.749091)

A :[1,1]((2.00731))

Loss: 7.83109
```
b is kind of far from zero because of the noise in labels. The value of the multiplier is quite close to 2 and is thus similar to the data . Congratulations you have built a linear regression model using the Shark C++ Library.

### 2. ML PACK LIBRARY
 