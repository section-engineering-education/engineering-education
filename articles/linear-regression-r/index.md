### Getting started with linear regression

In this tutorial, we shall explore an introductory theory behind linear regression and learn how to perform, interpret and evaluate its accuracy in R. 

### Prerequisites
- [RStudio](https://www.rstudio.com/products/rstudio/download/) installed on your computer.
- Knowledge in R programming language.
- Install all the required package in RStudio IDE.
  Those packages are,
```r

 install.packages("datarium")
 install.packages('caTools')
 install.packages("ggpolt2")

 ```

### Introduction to linear regression

Linear regression is a supervised machine learning algorithm that is used for predictive analysis of continuous variables such as sales and product price. It shows the existence of a linear relationship between the dependent and independent variables. A dependent variable (y) is the variable we are interested to predict and an independent variable (X) is the variable that we use to predict the dependent variable. The dependent variable is also known as the response/ study variable while an independent variable is also called, explanatory/ predictor variable.

#### Types of linear regression
There two types of linear regression;

#### 1. Simple linear regression
 Simple linear regression explains the relationship between one independent variable (X) and one dependent variable (y) using a straight line. The model is of the form:
```
y = β<sub>0</sub> + β<sub>1</sub>X + ε
```

1. `y` represent the dependent variable.
2. `β<sub>0</sub>` represent the intercept of the regression line.
3. `β<sub>1</sub>` represent the slope of the regression line.
4. `X` represent the independent variable.
5. `ε` is the error term. For example, difference between actual values (y) and predicted values (Ŷ).

#### 2. Multiple linear regression

This is a linear regression that explains the relationship between two or more independent variables (X) and one dependent variable (y). It is mathematically presented as:
```
y = β<sub>0</sub> + β<sub>𝒾 </sub>X<sub>𝒾 </sub> + ε<sub>𝒾</sub> ;  (𝒾 = 1, 2, 3, 4,......, n)
```

1. `β<sub>𝒾 </sub>` is the regression coefficients of independent variables X<sub>𝒾 </sub>.
2. `ε<sub>𝒾</sub>` represent the error term.
3. 
The error term `ε`(Epsilon) of the regression tell us about the random error in the model that can not be accounted for. This error arises when some of the observations fail to fall on the regression line. Even if it is not possible to get rid of the error term, it is possible to minimize it as low as possible. Using the technique of Least Squares, we find the values of `β<sub>0</sub>` and `β<sub>1</sub>` which give a regression line with a minimum sum of squared error.

#### Types of regression line
- Positive linear relationship: It's a linear relationship whene X increase y will increase as well, and therefore the `β<sub>𝒾 </sub>` is a positive number.
- Negative linear relationship: when X increases, y decreases and the `β<sub>𝒾 </sub>` is a negative number.

There are some cases where X increases and y remains the same. This means there is no linear relationship between the two variables.

#### Least Squares method
Least Square is a technique that is used to estimate unknown parameters, β<sub>0</sub> and β<sub>1</sub>  by minimizing the sum of squares of the verticle difference between the observations (y) and the predicted values (ŷ).
The approach minimizes the sum of squares 
s( β<sub>0</sub> , β<sub>1</sub> ) = ∑ <sup>n</sup><sub>i=1</sub> ε<sub>𝒾</sub> = ∑ <sup>n</sup><sub>i=1</sub> ( y<sub>𝒾</sub> - ŷ<sub>𝒾</sub> ) <sup>2</sup> with respect to β<sub>0</sub> and β<sub>1</sub>.
ŷ<sub>𝒾</sub> is the fitted line and is given by,
ŷ = β<sub>0</sub> + β<sub>1</sub>x<sub>𝒾</sub>
where:
ŷ - predicted value.
β<sub>0</sub> - value of y when x is zero.
β<sub>1</sub>- slope of the line.
x<sub>𝒾</sub>  - independent variables.
The partial derivative of s( β<sub>0</sub> , β<sub>1</sub> ) with respect to β<sub>0</sub> is,
∂ s( β<sub>0</sub> , β<sub>1</sub> )/∂β<sub>0</sub> = -2 ∑ <sup>n</sup><sub>i=1</sub> ( y<sub>𝒾</sub> -  β<sub>0</sub> - β<sub>1</sub>x<sub>𝒾 </sub> )
and the partial derivative of s( β<sub>0</sub> , β<sub>1</sub> ) with respect to β<sub>1</sub> is,

∂ s( β<sub>0</sub> , β<sub>1</sub> )/∂β<sub>1</sub> = -2 ∑ <sup>n</sup><sub>i=1</sub> ( y<sub>𝒾</sub> -  β<sub>0</sub> - β<sub>1</sub>x<sub>𝒾 </sub> ) </sub>x<sub>𝒾 </sub>
We obtain the solution of β<sub>0</sub> and β<sub>1</sub> by setting partial
∂ s( β<sub>0</sub> , β<sub>1</sub> )/∂β<sub>0</sub> = 0 
and

∂ s( β<sub>0</sub> , β<sub>1</sub> )/∂β<sub>1</sub> = 0

The solution of these equations is called the Ordinary Least Squares (OLS) estimators of β<sub>0</sub> and β<sub>1</sub>.
This gives the Ordinary Least Squares estimates b<sub>0</sub> of β<sub>0</sub> and b<sub>1</sub>  of β<sub>1</sub> as,
b<sub>0</sub> = ȳ - b<sub>1</sub>x̄

b<sub>1</sub> = S<sub>xy</sub> / S<sub>xx</sub>
Where;
S<sub>xy</sub> = ∑ <sup>n</sup><sub>𝒾</sub> ( x<sub>𝒾 </sub> - x̄)(y<sub>𝒾</sub> - ȳ)
S<sub>xx</sub> = ∑ <sup>n</sup><sub>i=1</sub> ( x<sub>𝒾</sub> - x̄ ) <sup>2</sup>
x̄ = 1/n  ∑ <sup>n</sup><sub>i=1</sub> x<sub>𝒾</sub>
ȳ = 1/n  ∑ <sup>n</sup><sub>i=1</sub> y<sub>𝒾</sub>

#### Assumptions of linear regression

1. Linearity:- The relationship between the independent variable and the dependent variable is assumed to be linear.

2. Homoscedasticity:-the variance of the error term (ε) (residuals)  is assumed to be constant.

3. Independence:- We assume observations are independent of each other.

4. Normality:- We assume observations are normally distributed.

 ### Implementing linear regression
 ####  Step 1: Loading data to RStudio
 First, let's install all the required packages together by running the code below,
 ```r
 install.packages("datarium")
 install.packages('caTools')
 install.packages("ggpolt2")

 ```

In our case, we shall use a dataset called marketing. This dataset is available in the datarium package we have already installed in the Rstudio. The marketing dataset contains data about the impact of three advertising media on sales. Those media are YouTube, Facebook, and newspaper. The dataset has 200 observations and 4 columns. The first 3 columns show the advertising budget in thousand dollars with the fourth column showing sales recorded. We load our data as shown below.
```r
data("marketing", package="datarium") # Loading the data

```
To check out the size of our dataset,
```r
data_Size = dim(marketing) # Checking the data size

```
#### Step 2. Understanding our data
Since our data is now loaded, it's important to understand some of its properties.
We start by displaying a sample of our dataset using the head() function.
```r
head(marketing) # Displays the first 6 observations
  youtube facebook newspaper sales
1  276.12    45.36     83.04 26.52
2   53.40    47.16     54.12 12.48
3   20.64    55.08     83.16 11.16
4  181.80    49.56     70.20 22.20
5  216.96    12.96     70.08 15.48
6   10.44    58.68     90.00  8.64

```
We can also have a look on the basic statistics of our dataset using the summary() function as shown below.
```r
> summary(marketing)
    youtube          facebook       newspaper          sales      
 Min.   :  0.84   Min.   : 0.00   Min.   :  0.36   Min.   : 1.92  
 1st Qu.: 89.25   1st Qu.:11.97   1st Qu.: 15.30   1st Qu.:12.45  
 Median :179.70   Median :27.48   Median : 30.90   Median :15.48  
 Mean   :176.45   Mean   :27.92   Mean   : 36.66   Mean   :16.83  
 3rd Qu.:262.59   3rd Qu.:43.83   3rd Qu.: 54.12   3rd Qu.:20.88  
 Max.   :355.68   Max.   :59.52   Max.   :136.80   Max.   :32.40 

 ``` 

 Since we are interested in building a linear regression that shows how sales vary with an advertising budget, we need to have a look at the trend of all three advertising media. This is as shown below.

```r
plot(marketing, col="green", main="Plotting Pairs against Each Other")

```
![Plot image](/engineering-education/linear-regression-r/plot.png)

The last row of our plots shows a linear relationship between sales and advertising channels ( YouTube and Facebook). This means the Youtube and Facebook advertisement budgets have a positive linear impact on sales. However, the newspaper in the third plot shows no particular trend with sales.

#### Step 3 Preparing our data for the model
Most of the data we come across are not clean and therefore it requires us to do some work on them before we can use them in building our prediction model. If we don't clean up the data, we end up creating a model that is not significant for prediction purposes.
First, we start by checking if our data contains outliers.
To achieve this we run our dataset in the boxplot() function as shown below.

```r
 boxplot(marketing)

 ```
#### Output
![boxplot](/engineering-education/linear-regression-r/plot-one.png)


As we can see, newspaper it's the only advertising media that reports presence of outliers( values that are far away from the majority of data distribution). We need to remember as we saw in step 2, the linearity assumption does not hold between newspaper and sales. Therefore, the newspaper is not one of the variables explaining the change in sales. We, therefore, eliminate it from our model otherwise it will be noise to the model. Our variables of interest, that's, YouTube and Facebook channels are free of outliers.
- Identify and treating Missing value.

We use `is.na()` to check for NA in our data.

```r
is.na(marketing)

```
The output is FALSE for all values in our dataset. This means that our data has no missing values.
- Splitting the data into training and testing set.
For the linear regression algorithm,  the larger percentage of data is allocated to the training set and the remaining to the testing set. The training set is the part of the data that is used to implement the model, while the test set is the part of the dataset that is used to validate the model. Test dataset it's assumed to be anonymous in the process of model implementation.
For our case, we shall use a splitting ratio of 75%.
To achieve this, we use the code below.
```r
splitRation = 0.75
set.seed(101) # to ensure same sample can be reproduced in future
library(caTools) # Library for splitting data
sample = sample.split(marketing$youtube, SplitRatio = splitRation)
train = subset(marketing, sample==TRUE)
TrainSize=dim(train)
TestSize=dim(test)

```
![test-train_Size](image-one.png)

Training data = 150 rows x 4 column
Test data =50 rows x 4 column

#### Step 4. creating the model
We use the `lm()` function to create our model.
```r
# More than one explanatory variable explaining sales hence Multiple linear regression
 Model<- lm( sales~ youtube + Facebook + newspaper, data = marketing)

 ```
#### Step5. Understanding the model summary
To obtain our model properties, we pass it to the `summary()` function. ie,

```r
summary(Model)

````
```r
#Output
Call:
lm(formula = sales ~ youtube + facebook + newspaper, data = marketing)

Residuals:
     Min       1Q   Median       3Q      Max 
-10.5932  -1.0690   0.2902   1.4272   3.3951 

Coefficients:
             Estimate Std. Error t value Pr(>|t|)    
(Intercept)  3.526667   0.374290   9.422   <2e-16 ***
youtube      0.001395  32.809   <2e-16 ***
facebook     0.188530   0.008611  21.893   <2e-16 ***
newspaper   -0.001037   0.005871  -0.177     0.86    
---
Signif. codes:  0 ‘***’ 0.001 ‘**’ 0.01 ‘*’ 0.05 ‘.’ 0.1 ‘ ’ 1

Residual standard error: 2.023 on 196 degrees of freedom
Multiple R-squared:  0.8972,    Adjusted R-squared:  0.8956 
F-statistic: 570.3 on 3 and 196 DF,  p-value: < 2.2e-16

```
### Understanding the model output.
#### F-statistic
First, we start by examining whether our model is significant or not. We consider the F-statistics and the associated p-value at the bottom of our model summary. A model is statistically significant if it has a p-value of less than 0.05. Our model, with a p-value: < 2.2e-16 is a small value compared to the benchmark p-value< 0.05. This indicates that at least one of the three explanatory variables in our model is significant to the model.
From the `estimate column`, it's seen that the change in YouTube and Facebook advertising budget has a positive impact on the sales. For example, spending 1 dollar on YouTube advertisement will lead to a 0.001395  increase in sales units. With Facebook, the same 1 dollar advertising budget will lead to a 0.188530 increase in sales units. For the newspaper, the allocation of $1 advertising budget reports -0.001037 units of sales. This value is negligible and therefore the newspaper has no significant influence on sales. Since newspaper advertisement is not significant to our model, we remove it from the model. This gives our final model as;

`sales = 3.526667 + 0.001395*youtube +0.188530*facebook`

#### step 6. Analyzing the accuracy of our model
Now that we have our model, let's test how good it is. To do this, we shall use our test set that we had separated in step 3 and make our model predict sales values for those data points. Because we have the actual sales values for the same points, we shall compare them and see how our model performs. We enter the code shown below.

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

Running the above code, we get the graph below.


![prediction plot](/engineering-education/linear-regression-r/prediction-plot.png)


The black points in the graph above are the plots of the actual sales of our test set, while the red ones are predicted sales of the same dataset predicted using our model. Comparing the two plots, it's clear how our actual values(black) and the predicted values(red) are close to each other. This indicates that our model is good. Since this is just a qualitative way of evaluating the performance of our model, we need to find a statistical value that tells us how accurate our model is. To achieve this, we use the following metrics.
- Mean Absolute Error:- This is the average of the absolute difference between actual and predicted values. It's denoted as (MAE).
- Mean Squared Error:- This is the average of the sum of squared error. It's denoted  as (MSE)
- Root Mean Squared Error:- It is the square root of MSE. It's denoted as (RMSE).
- R-Squared:- Metric that tells us how good our model is.

Let's run the code below.
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

```r
#Output
[1] 0.8813498

```
It turns out, R-Squared error for our model is 0.8813498 which is a higher value in the range of 0 to 1. The higher the value of the R-Squared error, the more adequacy the model.

### Conclusion
Now that we have made it to the end of our study, we need to understand that linear regression is an important model in the world of prediction analysis and therefore it needs to be made as accurate as possible. This means that, whenever we are given a problem that the linear regression is the best model to use, we should check if the data satisfy all the assumption of linear regression and ensure it is tidy before we can make any move to creating our model.
