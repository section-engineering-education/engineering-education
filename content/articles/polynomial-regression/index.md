### POLYNOMIAL REGRESSION IN R
The purpose of this article is to introduce Polynomial Regression in R.

### Prerequisites
A General Understanding of the Linear Regression Model in R


### Table of Contents
1.Introduction to Polynomial Regression
2.Data Preprocessing 
3.Fitting the Polynomial Regression to a dataset4.Visualization of Polynomial Regression Results

### Introduction to Polynomial Regression
Polynomial Regression is used when there is a non-linear relationship between the dependent variables and the independent variables. Examples of cases where Polynomial Regression could be used include: Modelling the Growth of Populations, Modelling disease spread, and epidemics(Such trends are non-linear). The General Form of a polynomial regression model is:



y = β<sub>0</sub> + β<sub>1</sub>X + β<sub>2</sub>X<sup>2 </sup> +........+ ε

For  example a polynomial model of degree 2 can be given as:

y = β<sub>0</sub> + β<sub>1</sub>X + β<sub>2</sub>X<sup>2 </sup> + ε



Now that we know what Polynomial Regression is, we can create a polynomial regression model.


### Step1:Data Preprocessing
The dataset used in this article can be found at https://drive.google.com/file/d/1RToZTGkD8XI0OhacwretKIItStYBqqNn/view?usp=sharing 

We first import the dataset.
```r 
dataset = read.csv('salaries.csv')  
```
This is how our dataset looks like,

![Dataset output](/engineering-education/polynomial-regression/dataset.png)

We do not need column 1 in our case since the Level's column is the encoded form of the Position's Column. To remove column 1 from our dataset, we simply run the following code:
```r
dataset= dataset[2:3]
```
Our dataset now looks like this.

![Newdataset output](/engineering-education/polynomial-regression/newdataset.png)

To see whether a polynomial model is suitable for our dataset, we make a scatter plot and observe the relationship between The Salary(Dependent Variable) and the Level (Independent Variable)

```r
library(ggplo2)
ggplot() +
  geom_point(aes(x = dataset$Level, y = dataset$Salary),
             colour = 'red')
```
Our scatter plot looks like this, and it's clear that the Salary and Level have a non-linear relationship; thus, a polynomial regression model would be suitable fot this case.

![Plot of Salary against levels](/engineering-education/polynomial-regression/Salaryplot.png)

The second step in data preprocessing is splitting the data into the training set and the dataset; however, we will not carry out this step since our dataset is quite simple and has only ten observations.
Our third step would be Feature Scaling, but the lm function for building regression models in R has taken care of that for us.

### STEP2:FITTING THE POLYNOMIAL REGRESSION MODEL
The Polynomial Regression Model is an extension of the linear regression model. The difference here is that we add polynomial terms of the independent variables to the dataset to form our matrix of features. In our case, we add additional columns with different degrees of our Independent variable(Level) to our dataset.
For this article

To add columns to our dataset, we run,
```r
dataset$Level2 = dataset$Level^2
dataset$Level3 = dataset$Level^3
dataset$Level4 = dataset$Level^4
```
Our new dataset looks like this:

![Newdataset added levels](/engineering-education/polynomial-regression/newdatasetlevels.png)

To fit the polynomial model, we use the lm function,
```r
poly_reg = lm(formula = Salary ~ .,data = dataset)
```
We have now built the polynomial model; let's have a look at how good the model is
```r
summary(poly_reg)
```

![polynomial regression summary results](/engineering-education/polynomial-regression/summary.png)

From the summary results, this model is quite good; It is approximately 99.53% accurate in its predictions.

### STEP 3: VISUALIZATION OF THE MODEL
We use the ggplot2 library to visualize our model.
```r
library(ggplot2)
x_grid = seq(min(dataset$Level), max(dataset$Level), 0.1)
ggplot() +
  geom_point(aes(x = dataset$Level, y = dataset$Salary),
             colour = 'red') +
  geom_line(aes(x = x_grid, y = predict(poly_reg,
                                        newdata = data.frame(Level = x_grid,
                                                             Level2 = x_grid^2,
                                                             Level3 = x_grid^3,
                                                             Level4 = x_grid^4))),
            colour = 'blue') +
  ggtitle('Truth or Bluff (Polynomial Regression)') +
  xlab('Level') +
  ylab('Salary')
```
The results obtained are shown below.

![The polynomial regression visualized](/engineering-education/polynomial-regression/visualpoly.png)

From the graphical results, we can see that the model is nearly perfect; it nearly perfectly fits the data points.We can now use the model to make predictions

### STEP3: MAKING PREDICTIONS WITH THE POLYNOMIAL REGRESSION MODEL
Now that we have made the model, let's make some predictions. Assuming that you would like to predict the salary of an employee whose level is, say 7.5. To do so, we use the predict function.

```r
# Predicting a new result with the Polynomial Regression
predict(poly_reg, data.frame(Level = 7.5,
                             Level2 = 7.5^2,
                             Level3 = 7.5^3,
                             Level4 = 7.5^4))
```
We obtain
```r
225126.3
```
as the salary of the employee with a level of 7.5.

For a level of 3.7 we would have
```r
predict(poly_reg, data.frame(Level = 3.7,
                             Level2 = 3.7^2,
                             Level3 = 3.7^3,
                             Level4 = 3.7^4)
```
The result is 
```r
84363.82 
```

Our next step is to examine the effect of adding additional degrees to our polynomial model.
```r
dataset$Level5 = dataset$Level^5
```
Let's build a new model with the Level5 column added and examine its effects
```r
poly_reg2 = lm(formula = Salary ~ .,data = dataset)

predict(poly_reg2, data.frame(Level = 7.5,
                             Level2 = 7.5^2,
                             Level3 = 7.5^3,
                             Level4 = 7.5^4
                             Level5= 7.5^5))
```

We obtain 237446 as the prediction for the employee's salary ,compared to the 225123.3 we had obtained from the model with upto degree 4.Generally the more the degrees the polynomial regression model has the more accurate it is in its predictions concerning the data.

### Conclusion
With the knowledge you have obtained you can now comfortably fit polynomial regression models in R.Enjoy modelling things such as spread of diseases,growth of populations and other non-linear relationships.

Enjoy Regression modelling!!
