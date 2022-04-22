### Introduction
One of the most basic yet crucial components of data science is understanding how a model works. Being able to observe a given variation, and taking the conclusion to a given body requires regular and persistent outcomes when using the constant model. As a data analyst, you must be able to respond to this frequently asked question.

Let's imagine you created a model to predict who will be in excellent health and who will be in poor health. After calculating the coefficient, you will see that the variables change, this could be due to several factors. Maximum Likelihood Estimation is all about determining the likelihood of the most likely result. 

### Prerequisites
The reader should have knowledge in :
- Definition Maximum Likelihood Estimation (MLE).
- Distribution Parameters.
- population characteristics.

### Table of Contents
- [Understanding likelihood function](#understanding-likelihood-function)
- [Understanding the linear and Poisson distribution](#understanding-the-linear-and-poisson-distribution)
- [Maximizing the Likelihood](#maximizing-the-likelihood)
- [Find out model coefficients using MLE](#find-out-model-coefficients-using-mle)
- [Standard linear model and Poisson distribution](#standard-linear-model-and-poisson-distribution)
- [Conclusion](#conclusion)

### Understanding likelihood function
The probability level is expressed by the likelihood function, which is a mathematical function. Suppose we take a set of observations as fixed; they have already happened and now we figure out which set of model parameters we are most likely to observe them under.

To produce the data, we employ an Equal Chance of Having an Outcome, however, we'll suppose we don't know this for now. For practically all diagnostic scenarios, we're forced to estimate the processes that produce the data we're looking at, which is why we're required to estimate these parameters.

###  Understanding the linear and Poisson distribution
A regression model that employs a straight line to explain the relationship between variables is known as linear regression. It searches for the value of the regression coefficient(s) which minimizes the total error of the model to find the line of best fit through your data. 

In a Likelihood of a particular number of events occurring in a given time frame, consider the number of individuals in a population who are in declining health. The Poisson distribution expresses the likelihood of poor health individuals amidst those who are in good health.

### Maximizing the likelihood
MLE is a method used to estimate characteristics of the target population (such as mean and variance for Normal, rate (lambda) for Poisson, and so forth) from sample data with the objective of maximizing the chance (likelihood) of obtaining the observed values.

Maximizing a function is just the same as using the log of that function multiplied by a negative one.

![Maxiximazing the likelihood](/engineering-education/likelihood-function-in-hospital-dynamics-using-r/max.png)

### Finding out model coefficient using MLE
The regression correlation coefficient can tell you how closely your slope is to the correlation value, and it's a useful metric for regressive target prediction. It specifies how far the variables deviate from the assumed distribution.

Observe how one might manage the budgeted funds and improve how to treat each sickness judiciously in a hospital setting.

![model coefficient using MLE](/engineering-education/likelihood-function-in-hospital-dynamics-using-r/.png)

### Standard linear model  and Poisson model
When studying the link between interval scale predictors and interval scale results, statisticians typically use linear regression.

Y=mx+c, x, and Y are the two variables, and m and c, are the two coefficients. The gradient of the line is denoted by the coefficient m, and the y-intercept is represented by the coefficient c. The value of y obtained at x=0 is referred to as the intercept. Similarly, if you increase the x-value by one unit, the y-value increases by m units. 

There are a few things to always remember. Our residuals all appear well orchestrated when the regression line is good.
The function lm() fits a linear model in R.

### Poisson distribution
This distribution provides the probability distribution value for a set of discrete events.

If we consider 'x' to be the distribution's mean interval, the Poisson distribution can help us calculate the likelihood of particular events occurring inside a given interval.
The RPois() function is useful in determining the cumulative probability value for a set of successful trials. As a result, the likelihood of a random number with an estimated value minus the value in the function.

![poisson distribution](/engineering-education/likelihood-function-in-hospital-dynamics-using-r/poisson.jpg)

Here is an example of a code;

```r
n=150 ##number of patients
x1<-rnorm(n,8,3) #predictor variable
y1<-rnorm(length(x1),2*x1+1,1) ##dependent variable with some error
plot(y1~x1)

model1.lm<-lm(y1~x1)
summary(model1.lm)
confint(model1.lm)
logLik(model1.lm) ##loglikelihood function

require(bbmle)  ##load package
linregtrik=function(a,b,sigma){
  Y.pred=a+b*x1
  -sum(dnorm(y1,mean=Y.pred,sd=sigma,log=TRUE))
}

mle2.model<-mle2(linregtrik,start=list(a=14,b=0,sigma=1))
##  get an error although it produces correct estimates
warnings()
summary(mle2.model)
-logLik(mle2.model)

profile.mle2.model<-profile(mle2.model)
confint(profile.mle2.model)  ##confidence interval
par(mfrow=c(1,3))
plot(profile.mle2.model,abs=T,conf=c(99,95,90,80,50)/100)

```
### Conclusion
After successfully running the codes and managing to find out the maximum likelihood estimates and coefficients, as a data analyst, you have the mandate of conveying your output to the hospital administration to plan adequately on the number of hospital beds to be bought.

The statistics are viable in the sense that they will ease congestion in the hospital and avoid the transmission of diseases such as tuberculosis.
