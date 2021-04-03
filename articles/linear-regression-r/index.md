### Getting started with linear regression

In this tutorial, we shall explore an introductory theory behind linear regression and learn how to perform, interpret and evaluate its accuracy in R. 

### Prerequisites
- RStudio installed on your computer.
- Knowledge in R programming language.
- Install all the required package in RStudio IDE.
  Those packages are,
```r

 install.packages("datarium")
 install.packages('caTools')
 install.packages("ggpolt2")

 ```
 The above packages need to be installed once. If you already have them in the RStudio you don't need to install them again. In other words, install a specific package that is not available on your computer. Also to install any, you need to be connected to the network.

### A brief introduction to linear regression

Linear regression is a supervised machine learning algorithm that is used for predictive analysis of continuous variables such as sales and product price. It shows a linear relationship between dependent and independent variables. A variable is said to be a dependent variable if its value depended on another variable(s). If a variable does not depend on the occurrence of another variable it's called an independent variable. The dependent variables are also known as response/ study variables while independent variables are also known as, explanatory/ predictor variables.

#### Types of linear regression

We have two types of linear regression;

i) Simple linear regression:- This is a linear regression in which there is only one independent variable (X) explains the dependent variable (Y). It is of the form,

Y = β<sub>0</sub> + β<sub>1</sub>X + ε

Where,     Y - dependent variable.

β<sub>0</sub> - Intercept term.

β<sub>1</sub> - Slope term.

X - Independent variable.

ε - Error term. ie, Difference between actual values Y and predicted values( Ŷ).

To obttain β<sub>0</sub>,

We use the formula,

β<sub>0</sub> = y̅ - β<sub>1</sub>x̄ 

y̅ - Mean of Y.

x̄  - Mean of X.

β<sub>1</sub> = = Σ[(xi − x̄)(yi − y̅)] / (xi − x̄ )

ii) Multiple linear regression. 

This is a linear regression that has at least two independent variables (X) explaining dependent variable Y. It is mathematically presented as,

Y = β<sub>0</sub> + β<sub>1</sub>X + β<sub>2</sub>X<sub>2</sub> + ........+β<sub>n</sub>X<sub>n</sub> + ε

Where,

Y - Dependent variable.

β<sub>0</sub> - Intercept term.

β<sub>i</sub> - regression coefficients of  independent vqariables X.

for i = 1,2,........n

ε - Error term.

#### Assumptions of linear regression

1. Linearity:- The relationship between the independent variable and the dependent variable is assumed to be linear.

2. Homoscedasticity:-the variance of the error term (ε) (residual)  is assumed to be constant.

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

In our case, we shall use a dataset called marketing. This dataset is available in the datarium package we have already installed in the Rstudio. The marketing dataset contains data about the impact of three advertising media on sales. Those media are youtube, Facebook, and newspaper. The dataset has 200 observations and 4 columns. The first 3 columns show the advertising budget in thousand dollars with the fourth column showing sales recorded. We load our data as shown below.
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

The last row of our plots shows a linear relationship between sales and advertising channels ( youtube and Facebook). This means the youtube and Facebook advertisement budgets have a positive linear impact on sales. However, the newspaper in the third plot shows no particular trend with sales.

#### Step 3 Preparing our data for the model
Most of the data we come across are not clean and therefore it requires us to do some work on them before we can use them in building our prediction model. If we don't clean up the data, we end up creating a model that is not significant for prediction purposes.
First, we start by checking if our data contains outliers.
To achieve this we run our dataset in the boxplot() function as shown below.

```r
 boxplot(marketing)

 ```
#### Output
![boxplot](/engineering-education/linear-regression-r/plot-one.png)


As we can see, newspaper it's the only advertising media that reports presence of outliers( values that are far away from the majority of data distribution). We need to remember as we saw in step 2, the linearity assumption does not hold between newspaper and sales. Therefore, the newspaper is not one of the variables explaining the change in sales. We, therefore, eliminate it from our model otherwise it will be noise to the model. Our variables of interest, that's, youtube and Facebook channels are free of outliers.
(ii) Identify and treating Missing value.

We use `is.na()` to check for NA in our data.

```r
is.na(marketing)

```
The output is FALSE for all values in our dataset. This means that our data has no missing values.
(iii) SPlitting our data into training and testing set.
Splitting our data into the training and testing set we follow the rule, the larger percentage should go to the training set and the remaining part be for the testing set.
For our case,we shall use a splitting ratio of 75%.
To acheive this we use the code below.
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
 Model<- lm( sales~ youtube + facebook + newspaper, data = marketing)

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
youtube      0.045765   0.001395  32.809   <2e-16 ***
facebook     0.188530   0.008611  21.893   <2e-16 ***
newspaper   -0.001037   0.005871  -0.177     0.86    
---
Signif. codes:  0 ‘***’ 0.001 ‘**’ 0.01 ‘*’ 0.05 ‘.’ 0.1 ‘ ’ 1

Residual standard error: 2.023 on 196 degrees of freedom
Multiple R-squared:  0.8972,    Adjusted R-squared:  0.8956 
F-statistic: 570.3 on 3 and 196 DF,  p-value: < 2.2e-16

```
Let's discuss the summary of our model by reading it from the top to the bottom.
(i) Call
```r
Call:
lm(formula = sales ~ youtube + Facebook + newspaper, data = marketing)
```
It shows how `lm()` was called when it created the model.

(ii) Residuals
This is a statistic that helps us to identify possible deviations from normality. According to OLS( Ordinary Least Square, a technique for minimizing the sum of the squared residuals), the mean of residuals should be zero. From our summary, we notice that median residuals have a positive value. The positive sign of the medium indicates that some residuals skew to the right. Its magnitude indicates to what extent. If the residuals have a perfect normal distribution, then the magnitude of 1Q and 3Q have about the same magnitude. From our residuals, we notice that 3Q is slightly larger than 1Q and this indicates a slight skew to the right in our data just as the medium had already indicated.
The Min and Max residuals offer us a quick way to detect if there extreme outliers in our data.

(iii) Coefficients

```r
Coefficients:
             Estimate Std. Error t value Pr(>|t|)    
(Intercept)  3.526667   0.374290   9.422   <2e-16 ***
youtube      0.045765   0.001395  32.809   <2e-16 ***
facebook     0.188530   0.008611  21.893   <2e-16 ***
newspaper   -0.001037   0.005871  -0.177     0.86    
---
Signif. codes:  0 ‘***’ 0.001 ‘**’ 0.01 ‘*’ 0.05 ‘.’ 0.1 ‘ ’ 1

```
The column labeled Estimation contains regression coefficients(β's).
If any value of β is zero then it means that the variable associated with such a  β is not significant to the model. The coefficients we are having in our model are just but estimates and they can never be zero. To know how possibly a coefficient can be zero, we make use of t statistic and p-value which in our summary are labeled t value and pr(<|t|)
respectively. The p-value is a probability that gauges the likelihood of a coefficient being not significant to the model.  The conventional limit of p-value to determine coefficient significance is 0.005. In our summary, the newspaper has a p-value of 0.86.
This indicates that the newspaper is not significant and should be removed from our model. For a quick way for identification of which variable is significant to the model, we consider the asterisks(***). The three asterisks in the summary indicate highly significant coefficients to the model. The newsletter is not indicated hence not significant.

(iv) F-statistic
```r
F-statistic: 570.3 on 3 and 196 DF,  p-value: < 2.2e-16

```
This statistic shows the overall significance of our model. Model is only significant if all coefficients are nonzero and it is not significant if all coefficients are zero. As we had already said in the coefficients section, coefficients being estimates they can never be zero. We there rely on p-value to declare whether our model is significant or not. A model is significant if its p-value less or equal to 0.05 otherwise it is insignificant. Our model has a p-value < 2.2e-16 which is much smaller hence our model is significant.

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

Running the above code we obtain the graph below.


![prediction plot](/engineering-education/linear-regression-r/prediction-plot.png)


In the above graph, it's seen how the actuals(black) and Predictions(red) are close to each other. This indicates that our model is good. Since this is just a qualitative way of evaluating the performance of our model, we need to find a statistical value that tells us how accurate our model is. To achieve this, we use the following metrics.
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
