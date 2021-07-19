### GETTING STARTED WITH MACHINE LEARNING IN MATLAB
### Introduction
Machine learning is a type of computer science that allows computer programs to learn and improve on their own. In the past, computers could only do what they are programmed to do but with machine learning, they could behave like human being and gain knowledge based on their past experiences. let's say for example we want a program that that can tell the difference between apples and bananas. First we give the computer some label pictures of each. The program will identify the pattern in the fruit and begin to remember them. It can then use these memories to identify the unlabeled and tell which is which.
Machine learning is encountered in daily basis for example, in the medical industry, it is applied for predicting life span, organizing patients data e.t.c. Matlab provides a machine learning toolbox that makes machine learning easier. In this article, we will look at the basis of machine learning.

### Prerequisite
- [Matlab](https://www.mathworks.com/products/get-matlab.html?s_tid=gn_getml) installed.
- [Data](https://archive.ics.uci.edu/ml/datasets/Bank+Marketing) for analysis
- Proper understanding of [matlab](https://www.section.io/engineering-education/getting-started-with-matlab/) basics.

### Challenges of machine learning
- lots of data with many variables(predictors) and algorithms.
- Data is too complex to know the governing equation.
- Significant expertise is required.
- No 'one size fits all' solution- this means it requires an iterative approach that is;  
  - Try multiple algorithms, see what works best.
- Time-consuming.

### Why Matlab for machine learning
Matlab does not only provides a strong environment for iterative exploration, but it also has apps that allow you to explore the impacts of different models on your data. The framework makes it easy to iterate over different algorithms and measure their accuracy.
One can also incorporate a parallel computing paradigm to speed up computations. Once you are happy with the models, You can integrate them into larger data and analytics and decision making workflow.

### Overview 0f machine learning
Machine learning is classified into two branches, that is;
- Supervised learning.
- Unsupervised learning.

### Unsupervised learning
Here, you group your data based on some similarities or characteristics. It is not a must you know the grouping. This grouping can be done using clustering techniques. Clustering is the grouping of the dataset based on its characteristics. Matlab provides a variety of clustering algorithms. The algorithm is later grouped into partitioning algorithms and overlapping algorithms.

### a) Partioning algorithms
These techniques assign each dataset into a single cluster. These clusters are such as K-means and hierarchical.

### b) Overlapping algorithms
Here, it is used for clustering data points that may belong to more than one cluster. This algorithm computes the probability of a data point belonging to a particular cluster. The cluster for the overlapping algorithm is such as Gaussian mixture and hidden Markov model.

### Supervised learning
Here one creates a model to predict a quantity of interest, that is the output or response variable. We have the input that will have an impact on the response even though you may not have an understanding of the exact relationship. You use the input to train your model and use the model to make predictions given different input data. Supervised learning is further classified into;

### i) Classification
This technique is used for discrete response. For example, if you want to predict tumours size into small, medium or large, then it is a classification problem and uses classification techniques to solve this. The algorithm for classification is such as support vector machines, discriminant analysis, naive Bayes and nearest neighbour.

### ii) Regression
This technique is for the continuous response. For example is if you are trying to predict electricity demand from a grid in KW/hr, then it is a regression problem and requires q regression techniques. The algorithm for regression is such as neural network, decision tree, ensemble method, non-linear regression and linear regression.

### Workflow for supervised learning
Here, you first import data, preprocess the data. This may include creating some visualization and identifying variables of interest. In the next step, you select your model and train it on the data and measure its accuracy. Once you have selected the best model, you can use it to predict the new input data set.

### Example
In this example, we have data from a marketing industry conducted by a bank. They collected information about the customer as shown in the dataset. The goal here is to predict if customers will subscribe to the bank term. In this case, we have a .csv file. Matlab has tools that help to read information from various file formats, for example, import. To import;
- Click on the import selection at the top of the window.
- ![importing the data into matlab](engineering-education/getting-started-with-machine-learning/machine2.png)
Matlab also provides tools that help you visualize your data. This is done by; 
- On the top of the window, click on the plots.
- Select the columns or sections of your data that you would like to visualize.
- Select the type of the plot.
![Types of plots](engineering-education/getting-started-with-machine-learning/machine3.png)
![resulting plots from the chosen data](engineering-education/getting-started-with-machine-learning/machine4.png)
According to the workflow, we first input the data. This is done by;
```Matlab
bank = importBankData('bank-full.csv')
``` 
We then pre-process the data by first visualizing it.
```matlab
gscatter(bank.age, bank.balance, bank.y)
```
In the next step, we will break up the data into a train and test set. Here we will use techniques such as partition to break the data into training and test set.
```Matlab
%% prepare the data: Response amd predictions
% Response
Y = bank.y;

% predictor matrix
X = bank(:,1:end-1);

% Cross validation
cv = cvpartition(height(bank), 'holdout', 0.40);

% Training set
Xtrain = X(training(cv),:);
Ytrain = Y(training(cv),:);
% Test set
Xtest = X(test(cv),:);
Ytest = Y(test(cv),:);

```
When we run the response section, we see that 90% of the people chose not to buy the item and 10% bought. After having this data, we going to use Matlab's apps to build a model. We will use the neuro networks app. We have neural net clustering, neural net fitting, neural net fitting, neural network pattern recognition and neural net time series. Here we will use the pattern recognition app.
![pattern recognition app](engineering-education/getting-started-with-machine-learning/machine5.png) 
- Select your inputs and outputs here.
![enter inputs and outputs here](engineering-education/getting-started-with-machine-learning/machine6.png)
You can change the algorithm or use the default e.t.c
- Click on the training.
![training process](engineering-education/getting-started-with-machine-learning/machine7.png)
As the training is ongoing, we can visualize the progress.
![visualization of the training](engineering-education/getting-started-with-machine-learning/machine8.png)
When you are not satisfied with the results, you can re-train the network but in case satisfied, you can display your results. This is the saving of your work. This can be either through Matlab's function, Matlab's matrix only function, Simulink diagrams or neural network diagram. We can generate a code to see how Matlab set all options we have seen above. We can look at more details of this on Matlab's documentation [here](https://www.mathworks.com/help/stats/machine-learning-in-matlab.html). This is done by right-clicking in any part of the generated code and then select the `help on selection`. The documentation gives a deeper description and more details about training algorithms.

### Conclusion
Machine learning forms the basis of the worlds technology. Machine learning is applied in very many applications in our sorrounding. This makes it an important thing for an engineer or a programmer to have some knowledge about it. It basically works towards making work easier in every sector. The algorithms that are used for the various machine learning are complex and also difficult to choose when doing a data analysis.
