---
layout: engineering-education
status: publish
published: true
url: /machine-learning-libraries-in-cplusplus/
title: Machine Learning Libraries in C++
description: This article takes the reader through the SHARK and MLPACK libraries and exploit their functionality in machine learning.
author: eugiene-kanillar
date: 2021-07-14T00:00:00-12:30
topics: [Languages , Machine Learning]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/machine-learning-libraries-in-cplusplus/hero.png
    alt: Machine learning using c++ image example
---
We learned to implement algorithms from scratch and highlighted the reasons why we should use C++ for [machine learning](/engineering-education/topic/machine-learning/). In this article we will be following that up with how to implement them with machine learning algorithms.
<!--more-->
We created machine learning models in C++ which were not only cumbersome but missed out on a majority of aspects contained in Machine learning. 

That article can be found [here](/engineering-education/an-introduction-to-machine-learning-using-c++/).

Libraries enable the reuse of code for solving problems. Nowadays solutions to common problems come in form of libraries and packages which have been thoroughly tested and optimized. 

The code could have been implemented by an expert or an enthusiast. This saves one from having to "reinvent the wheel" each time especially when working or learning under strict deadlines.

The C++ programming language provides libraries that can be used for machine learning. In this article, we will look at the **SHARK** and **MLPACK** libraries and exploit their functionality in machine learning.

### Prerequisites
- An understanding of machine learning models and algorithms.
- An understanding of object oriented programming concepts.
- An understanding of machine learning models and algorithms.

### 1. Shark library
Shark is a very fast module-based library that supports supervised learning algorithms like clustering, linear regression, neural networks, and k-means.

#### Installing Shark and setting up the environment
I will be doing this for the Linux-based operating system. For Windows users, you can install the Windows subsystem for Linux whereby you will be able to run the Linux operating system as a Windows program. 

It is outlined in this [link](https://ubuntu.com/tutorials/ubuntu-on-windows). It has many of the same features you will find using the terminal on Ubuntu. 

The dependencies of the shark library are Boost and Cmake. Type the following command on your terminal to install all the dependencies.

```bash
sudo apt-get install cmake cmake-curses-gui libatlas-base-dev libboost-all-dev
```

Type the following commands in order, to install Shark.
1. `git clone https://github.com/Shark-ML/Shark.git `
2. `cd shark `
3. `mkdir build`
4. `cd build ..`
5. `cmake ..`
6. `make` 

#### How to compile programs
To be able to compile programs with Shark, you need to include the header files needed for your particular use case when applying machine learning. Let's say for linear regression, you would need to include the following extra header files.

```C++
#include <shark/ObjectiveFunction/Loss/Squaredloss.h>
#include <shark/Algorithms/Trainers/LinearRegression.h>
```

You would need to link with the following libraries in order to compile.
```bash
-std=c++11 -lboost_serialization-lshark-lcblas
``` 

#### Implementing linear regression
#### Initialize the data
 
Include the header files and libraries for linear regression.
```c++
#include <bits/stdc++.h> //header file for all basic c++ libraries
#include <shark/Data/Csv.h> //header file for importing data in csv format
#include <shark/ObjectiveFunctions/Loss/SquaredLoss.h> //to implement squared loss function
#include <shark/Algorithms/Trainers/LinearRegression.h>
```

Now we need a data set. I have included two .csv files. The independent.csv file includes the x values and the dependent.csv file includes the y values. This is what should look like. 

![demo](/engineering-education/machine-learning-libraries-in-cplusplus/dataset.PNG). 

The two .csv files can be found on my GitHub [repo](https://github.com/KanizoRGB/Machine-learning-libraries.git). Next, create a container to hold the data from the csv files.

```c++
Data<RealVector> independent; //store the independent values
Data<RealVector> dependent;//store the dependent values
```

We now need to import the data into our containers. Shark has an `importCSV` function. 

It is used in the following format:
```bash
importCSV(datacontainer, "filelocation")
```

For our case it will be:

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
#### Train the model
This is how we would train the model. The trainer has a member called a train. The member trains the model and finds parameters for it.
  
```c++
trainer.train(model, data)
```

#### Prediction
Let's output the model parameters
```c++
// show model parameters
cout << "intercept: " << model.offset() << endl;
cout << "matrix: " << model.matrix() << endl;
```

The offset member function of linear models outputs the intercept of the best fit line. We also output a matrix instead of a multiplier since the model does not necessarily have to be linear. 

It can be generalized. Minimize the squared loss to get the line of best fit. Luckily, the model allows us to display all that information.

Our priority is to initialize a `squared loss` followed by instantiating a data container which we will call `predicted`. The predicted value is computed based on the independent variables fed into the system and then we output the loss which is gotten by passing the dependent values and the predicted value. 
```c++
SquaredLoss<> loss; //initializing square loss object
Data<RealVector> predicted = model(data.independent()); //predicted is calculated based on the independent variables fed into the system.
cout << "squared loss: " << loss(data.dependent(), predicted) << endl;
```

Now type the following command in the terminal to compile the code.

```bash
g++ -o lr linear_regression.cpp -std=c++11 -lboost_serialization -lshark -lcblas
```

Once, it finishes compiling, you will have created an `lr` object . 

Upon running the program you get:
```c++
b : [1](-0.749091) A :[1,1]((2.00731)) Loss: 7.83109
```

b is kind of far from zero because of the noise in labels. The multiplier's value is quite close to 2 and is thus similar to the data. Congratulations you have built a linear regression model using the Shark C++ Library.

### 2. ML Pack library
The mlpack has libraries that are very useful and they should be installed into the system. 

The libraries are:
1. Boost
2. Armadillo
3. Ensmallen. 

#### Installing ML pack and setting up the environment
Type the following command on your terminal to get all the dependencies installed at once.
```bash
sudo apt-get install libboost-math-dev libboost-program-options-dev libboost-test-dev libboost-serialization-dev binutils-dev python-pandas python-numpy cython python-setuptools
```

After installing all the dependencies on your system, run the following commands line by line to build and install mlpack. 
- wget
- tar -xvzpf mlpack-3.2.2.tar.gz
- mkdir mlpack-3.2.2/build && cd mlpack-3.2.2/build
- cmake ../
- make -j4 
- sudo make install

#### How to compile
1. Include the relevant header files, for example lets say for k-means, the header files would be.

```c++
#include <mlpack/methods/kmeans/kmeans.hpp>
#include <armadillo>
```

2. Link with the following libraries to compile.

```bash
std=c++11 -larmadillo -lmlpack -lboost_serialization
```

#### K-means implementation
To follow along with this part, you'll need a sound understanding of K-means as a machine learning algorithm. K-means grouping similar things into clusters. We group `"n"` observations into `"k"` clusters. 

The k is predetermined by the analyst. Practical areas of application include triangulating crime-prone areas, customer analysis, and analysis of public transportation. You can read [this](https://www.analyticsvidhya.com/blog/2019/08/comprehensive-guide-k-means-clustering/) article to get an in-depth understanding of the k-means algorithm.
 
#### Initializing
Include the relevant libraries and header files for implementing k-means. 

Such as:
```c++
#include <bits/stdc++.h>
#include <mlpack/methods/kmeans/kmeans.hpp> #include <armadillo> using namespace std;
```

Now let us set the number of clusters, samples, dimension of our program and the number of iterations we desire since k-means is an iterative algorithm.
```c++
int c = 2; //number of clusters
int dim = 2;//dimension of our program
int samples = 50; int iter = 10;//maximum number of iterations
``` 

Next, we create the data. This is where we make use of the Armadillo library. We create a data container that is a map class.

```c++
arma::mat data(dim, samples, arma::fill::zeros)
```

We have given the mat class a dimension size of 2 and 50 samples which we've initialized all of them with zeros. The next step is to assign some random data to the class on which we will run the k-means algorithm.

We will create 25 points around the position [1,1] which is done by saying that each data point is at position [1,1] and then add random noise for each of these points. This is achieved as seen in the code below.

```c++ 
int i = 0; for(; i < samples / 2; ++i) { data.col(i) = arma::vec({1, 1}) + 0.25*arma::randn<arma::vec>(dim); } for(; i < samples; ++i) { data.col(i) = arma::vec({2, 3}) + 0.25*arma::randn<arma::vec>(dim); }
```

And kudos! the data is now ready for training.

#### Training
 
We need to create an arma row type to hold the clusters and then an arma mat type to hold the centroids.
```c++
arma::Row<size_t> clusters;
arma::mat centroids;
```

Afterward, we will instantiate the k-means class and specify the number of iterations which is done through the constructor.
```c++
 mlpack::kmeans::KMeans<> mlpack_kmeans(max_iter);
``` 
To do the clustering, we will make a call to the member function called cluster of the k-means class. To this member function, we pass the data, a number of clusters, centroid's object, and the cluster's object. 

The Cluster function runs the k-means algorithm on this data and initializes the cluster and centroid objects.

```c++
mlpack_kmeans.Cluster(data, k, clusters, centroids);
``` 
#### Displaying the results

We display results using the print function contained in the centroid's object.
```c++
centroids.print("Centroids:");
```

Finally, compile the whole code on the terminal using the following command to create a k-means object from which we can deduce meaningful conclusions.

```bash
g++ k_means.cpp -o kmeans_test -O3 -std=c++11 -larmadillo -lmlpack -lboost_serialization && ./kmeans_test
```

The results are displayed below, and that's it.
```bash
Centroids: 0.9497 1.9625 0.9689 3.0652
```

### Conclusion
In conclusion, we learned about a few useful C++ libraries, and how to implement them with machine learning algorithms. The two popular libraries we explored were Shark and ML Pack. Libraries are an easier and faster way to deploy machine learning algorithms for projects. 

There is a lot of assistance in the documentation of each library. In case you get stuck you can also read the documentation for detailed assistance. You can also inbox me for assistance in case you need assistance.

---
Peer Review Contributions by: [Dawe Daniel](/engineering-education/authors/dawe-daniel/)

