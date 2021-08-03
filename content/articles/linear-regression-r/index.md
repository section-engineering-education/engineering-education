---
layout: engineering-education
status: publish
published: true
url: /linear-regression-r/
title: Getting started with Linear Regression in R
description: In this tutorial, we will explore an introductory theory behind linear regression and learn how to perform, interpret and evaluate its accuracy in R.
author: daniel-mwanthi
date: 2021-04-26T00:00:00-15:00
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/linear-regression-r/hero.jpg 
    alt: Technology Image
---
The R language is mainly used for statistical and data analytics. It's also used in developing machine learning applications. In this article we will talk about linear regression and how to implement it using R.
<!--more-->
### Introduction
In this tutorial, we will explore an introductory theory behind linear regression and learn how to perform, interpret and evaluate its accuracy in R. 

### Prerequisites
- [RStudio](https://www.rstudio.com/products/rstudio/download/) installed on your computer.
- Knowledge in R programming language.
- Ensure all the packages are installed in the RStudio IDE.
  
Those packages are:
```r
 install.packages("datarium")
 install.packages('caTools')
 install.packages("ggpolt2")
 ```

### Introduction to linear regression
Linear regression is a modeling technique that is used for predictive analysis of continuous variables such as sales and product price. It shows the existence linear relationship between two variables. 

The variable we are interested in predicting is called the study variable, while the variable we use to predict this variable is called the explanatory variable. 

The study variable is also known as the dependent/response variable while an explanatory variable is also called, independent/predictor variable.

#### Types of linear regression

#### 1. Simple linear regression
The relationship between one explanatory variable X and one study variable Y is explained using simple linear regression.

```bash
y = β<sub>0</sub> + β<sub>1</sub>X + ε
```

Where:
1. *y* represent the study variable.
2. *β<sub>0</sub>* represent the intercept term of the line.
3. *β<sub>1</sub>* represent the slope of the line.
4. *X* represent the explanatory variable.
5. *ε* is the error term. For example, the difference between actual values (y) and predicted values (Ŷ).

#### 2. Multiple linear regression
This is a linear regression that explains the relationship between two or more explanatory variables (X) and one study variable (y). 

It is mathematically presented as:

```bash
y = β<sub>0</sub> + β<sub>𝒾 </sub>X<sub>𝒾 </sub> + ε<sub>𝒾</sub> ;  (𝒾 = 1, 2, 3, 4,......, n)
```

Where:
1. *β<sub>𝒾 </sub>* is the regression coefficients of explanatory variables X<sub>𝒾 </sub>.
2. *ε<sub>𝒾</sub>* represent the error term.
3. The error term *ε*(Epsilon) of the regression tell us about the random error in the model that can not be accounted for. 

This error arises when some of the observations do not fall on the regression line. Even if it is not possible to get rid of the error term, we have to minimize it as low as possible. 

Using the technique of Least Squares, we find the values of *β<sub>0</sub>* and *β<sub>1</sub>* which give a regression line with a minimum sum of squared error.

#### Types of regression line
- Positive linear relationship: It's a linear relationship where, when X increases y will increase as well, and therefore the *β<sub>𝒾 </sub>* is a positive number.
- Negative linear relationship: When X increases, y decreases, and the *β<sub>𝒾 </sub>* is a negative number.

There are some cases where X increases and y remains the same. This means the correlation between the two variables is zero.

#### Least Squares method
Least Square is a technique that is used to estimate unknown parameters, *β<sub>0</sub>* and *β<sub>1</sub>* by minimizing the sum of squares of the vertical difference between the observations (y) and the predicted values (ŷ).

The approach minimizes the sum of squares:
```bash
*s( β<sub>0</sub> , β<sub>1</sub> ) = ∑ <sup>n</sup><sub>i=1</sub> ε<sub>𝒾</sub> = ∑ <sup>n</sup><sub>i=1</sub> ( y<sub>𝒾</sub> - ŷ<sub>𝒾</sub> ) <sup>2</sup>* with respect to *β<sub>0</sub>* and *β<sub>1</sub>*.
```

```bash
*ŷ<sub>𝒾</sub>* is the fitted line and is given by:
*ŷ = β<sub>0</sub> + β<sub>1</sub>x<sub>𝒾</sub>*.
```

Where:
1. *ŷ* is the predicted value.
2. *β<sub>0</sub>* represent the value of y when x is zero.
3. *β<sub>1</sub>* is the gradient of the line.
4. *x<sub>𝒾</sub>* is the explanatory variable.

The partial derivative of *s( β<sub>0</sub> , β<sub>1</sub> )* with respect to *β<sub>0</sub>* is:
*∂ s( β<sub>0</sub> , β<sub>1</sub> )/∂β<sub>0</sub> = -2 ∑ <sup>n</sup><sub>i=1</sub> ( y<sub>𝒾</sub> -  β<sub>0</sub> - β<sub>1</sub>x<sub>𝒾 </sub> )*.

And the partial derivative of *s( β<sub>0</sub> , β<sub>1</sub> )* with respect to *β<sub>1</sub>* is:
*∂ s( β<sub>0</sub> , β<sub>1</sub> )/∂β<sub>1</sub> = -2 ∑ <sup>n</sup><sub>i=1</sub> ( y<sub>𝒾</sub> -  β<sub>0</sub> - β<sub>1</sub>x<sub>𝒾 </sub> ) </sub>x<sub>𝒾 </sub>*.

We obtain the solution of *β<sub>0</sub>* and *β<sub>1</sub>* by setting partial *∂ s( β<sub>0</sub> , β<sub>1</sub> )/∂β<sub>0</sub> = 0 * and *∂ s( β<sub>0</sub> , β<sub>1</sub> )/∂β<sub>1</sub> = 0*.

The solution of the equations is called the Ordinary Least Squares (OLS) estimators of *β<sub>0</sub>* and *β<sub>1</sub>*.
This gives the Ordinary Least Squares estimates b<sub>0</sub> of β<sub>0</sub> and b<sub>1</sub> of β<sub>1</sub> as:

*b<sub>0</sub> = ȳ - b<sub>1</sub>x̄*.

*b<sub>1</sub> = S<sub>xy</sub> / S<sub>xx</sub>*.

Where:
1. *S<sub>xy</sub> = ∑ <sup>n</sup><sub>𝒾</sub> ( x<sub>𝒾 </sub> - x̄)(y<sub>𝒾</sub> - ȳ)*.
2. *S<sub>xx</sub> = ∑ <sup>n</sup><sub>i=1</sub> ( x<sub>𝒾</sub> - x̄ ) <sup>2</sup>*.
3. *x̄ = 1/n  ∑ <sup>n</sup><sub>i=1</sub> x<sub>𝒾</sub>*.
4. *ȳ = 1/n  ∑ <sup>n</sup><sub>i=1</sub> y<sub>𝒾</sub>*.

#### Assumptions of linear regression
1. Linearity: The relationship between the independent variable and the study variable is assumed to be linear.
2. Homoscedasticity: The error term (ε) is assumed to have a constant variance.
3. Independence: We assume observations are independent of each other.
4. Normality: Observations are assumed to have a normal distribution.

### Implementing linear regression
 
####  Step 1: Loading data to RStudio
First, let's install all the required packages together by running the code below:

```r
 install.packages("datarium")
 install.packages('caTools')
 install.packages("ggpolt2")
```

In our case, we shall use a dataset called marketing. This dataset is available in the datarium package we have already installed in the Rstudio. 

The marketing dataset has data about the influence of three advertising media on sales. Those media are YouTube, Facebook, and the newspaper. 

The dataset has 200 observations and 4 columns. The first 3 columns show the advertising budget in thousand dollars with the fourth column showing sales recorded. 

We load our data as shown below.
```r
data("marketing", package="datarium") # Loading the data
```

To check out the size of our dataset:
```r
data_Size = dim(marketing) # Checking the data size
```

#### Step 2. Understanding our data
Since our data is now loaded, it's important to understand some of its properties. We begin by using the `head()` function to display a sample of our dataset.
```r
head(marketing) # Displays the first 6 observations
```

The output is:

![head-output](/engineering-education/linear-regression-r/head_output.png)

We can also use the summary() function to look at the basic statistics of our dataset, as shown below.

```r
summary(marketing)
``` 

The output is:

![summary-output](/engineering-education/linear-regression-r/summary-output.png)
 
Since we are interested in building a linear regression that shows how sales vary with an advertising budget, we need to have a look at the trend of all three advertising media. 

This is as shown below.
```r
plot(marketing, col="green", main="Plotting Pairs against Each Other")
```

![Plot image](/engineering-education/linear-regression-r/plot.png)

The last row of our plots shows a linear relationship between sales and advertising channels (YouTube and Facebook). This means the Youtube and Facebook advertisement budgets have a positive linear impact on sales. However, the newspaper in the third plot shows no particular trend with sales.

#### Step 3: Preparing our data for the model
Most of the data we have come across are not clean and therefore requires us to do some work on them before we can use them in building our prediction model. 

If we don't clean up the data, we end up creating a model that is not significant for prediction purposes. Let's start by checking if our data contains outliers.

To achieve this we run the code below.
```r
 boxplot(marketing)
 ```
 
#### Output

![boxplot](/engineering-education/linear-regression-r/plot-one.png)

As we can see, newspaper is the only advertising media that reports presence of outliers (values that are far away from the majority of data distribution). We need to remember (as we saw in step 2), the linearity assumption does not hold between newspaper and sales. 

Therefore, the newspaper is not one of the variables explaining the change in sales. We, therefore, eliminate it from our model otherwise it will be noise to the model. Our variables of interest, that's, YouTube and Facebook channels are free of outliers.

- Identifying and treating missing values:

We use `is.na()` to check for NA in our data.
```r
is.na(marketing)
```

The output is FALSE for all values in our dataset. This means that our data has no missing values.

- Splitting the data into training and testing sets:
 
For the linear regression algorithm, the larger percentage of data is allocated to the training set and the remaining to the testing set. The portion of the dataset that we use to implement the model is called training, while the portion of the dataset that we use to validate the model is called the test set. During the process of model implementation, the test set is assumed to be anonymous.

For our case, we shall use a splitting ratio of 75%:
```r
splitRation = 0.75
set.seed(101)
library(caTools) # Library for splitting data
sample = sample.split(marketing$youtube, SplitRatio = splitRation)
train = subset(marketing, sample==TRUE)
TrainSize=dim(train)
TestSize=dim(test)
```

![test-train_Size](/engineering-education/linear-regression-r/image-one.png)

Training data = 150 rows x 4 column.

Test data = 50 rows x 4 column.

#### Step 4. Creating the model
When creating our model, we use the `lm()` function.

```r
# More than one explanatory variable explaining sales hence Multiple linear regression
 Model<- lm( sales~ youtube + Facebook + newspaper, data = marketing)
```

#### Step 5. Understanding the model summary
To obtain our model properties, we pass it to the `summary()` function. ie:
```r
summary(Model)
```

The output will be:

![summary](/engineering-education/linear-regression-r/summary.png)

### Understanding the model output

#### F-statistic
First, we start by examining whether our model is significant or not. We consider the F-statistics and the associated p-value at the bottom of the model summary. If the p-value is utmost 0.05 then the model is statistically significant. 

Our model, with a p-value < 2.2e-16 which is a small value compared to the benchmark p-value < 0.05. This shows that at least one of the three explanatory variables in our model is significant to the model.

From the `estimate column`, it's seen that the change in YouTube and Facebook advertising budget has a positive impact on the sales. For example, spending 1 dollar on YouTube advertisement will lead to a 0.001395 increase in sales units. 

With Facebook, the same 1 dollar advertising budget will lead to a 0.188530 increase in sales units. For the newspaper, the allocation of $1 advertising budget reports -0.001037 units of sales. 

This value is negligible and therefore the newspaper has no significant influence on sales.

Since newspaper advertisement is not significant to our model, we remove it from the model. 

This gives our final model as:

`sales = 3.526667 + 0.001395*youtube +0.188530*facebook`

#### Step 6. Analyzing the accuracy of our model
Now that we have our model, let's test how good it is. To do this, we shall use our test set that we splitted apart in step 3 and use our model to predict sales values for those data points. 

Because we have the actual sales values for the same points, we shall compare them and see how our model performs:
```r
#Predicting
numx<-data_size[1]*(1-splitRation)
x_axis<-seq(numx)
dataframe<-data.frame(x_axis,Predict, test$sales)
#Library required
library(ggplot2)
Predplot<-ggplot(dataframe,aes(x=x_axis))
Predplot<-Predplot+geom_line(aes(y=Predict, colour="Predicted"))
Predplot<-Predplot + geom_point(aes(x=x_axis,y=Predict, colour="Predicted"))
Predplot<-Predplot + geom_line(aes(y=test$sales, colour="Actual"))
Predplot<-Predplot + scale_colour_manual("", values = c(Predicted = "red", Actual = "black"))
Predplot
```

Running the code above, we get the graph below.

![prediction plot](/engineering-education/linear-regression-r/prediction-plot.png)

The black points in the graph above are the plots of the actual sales of our test set, while the red ones are predicted sales of the same dataset predicted using our model. 

Comparing the two plots, it's clear how our actual values (black) and the predicted values (red) are close to each other. This indicates that our model is good. 

Since this is just a qualitative way of evaluating the performance of our model, we need to find a statistical value that tells us how accurate our model is. 

To achieve this, we use the following metrics:
- Mean Absolute Error: This is the average of the absolute difference between the observation and predicted values. It's denoted as (MAE).
- Mean Squared Error: This is the average of the sum of squared error. It's denoted as (MSE)
- Root Mean Squared Error is denoted by RMSE and is the square root of MSE.
- R-Squared: Metric that tells us how good our model is.

```r
Original= test$sales
predicted=predicted
diff= Original-predicted
MSE=mean((diff)^2)
MAE=mean(abs(diff))
RMSE=sqrt(MSE)
R_Squared = 1 - ( sum((diff)^2) / sum((Original - mean(Original))^2))
R_Squared
```

The output is:
```r
[1] 0.8813498
```

It turns out, the R-Squared error for our model is 0.8813498 which is a higher value in the range of 0 to 1. The higher value of the R-squared indicates that the model is adequate.

### Conclusion
Now that we have made it to the end of our study, we need to understand that linear regression is an important model in the world of prediction analysis and therefore it needs to be made as accurate as possible. 

This means that, whenever we are given a problem where the linear regression method is the best model to use. We should check if the data satisfy all the assumption of the linear regression and ensure it checks out before we can make any move to creating our model.

Happy coding!

---
Peer Review Contributions by: [Ahmad Mardeni](/engineering-education/authors/ahmad-mardeni/)


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