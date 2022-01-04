### Introduction
In this post, dummy data is generated using the Python Faker library. It's critical to test and evaluate software and hardware with dummy data. It's possible to test your code by running it through various scenarios. Faked data can be easily generated with the Python function Faker.

For testing and operational reasons, dummy data is used. Your code can be tested against a variety of different types of stimuli.
### Prerequisites
1. Before proceeding with this tutorial, you should know the python programming language.
2. Have a python IDE or follow this [documentation](https://www.python.org/) to install.

> Setup Faker with the pip command:

```Python
pip install Faker
```
### Listed below are methods and types of dummy data
#### 1. Creating and initializing faker generators
You can generate and initialize fake generators using `Faker()`. Using the Faker generator, you'll be able to generate any data you desire.
```Python
from faker import Faker
ourFake = Faker()
```
#### 2. Createing random text 
To create random text, we use `text()`. The method below created a paragraph.
```Python
ourFake.text()
```
Output:
```bash
Business happy black arrive end. Election wear list. Would lay though.\nCentury collection everybody key fight. Goal nation woman assume both.
```
For addresses we use `address()` and for names we use `name()` methods.
#### 3. Creating same dummy data
You may wish to use the same collection of data again. Seeding the generator is a viable option. Seeding is a method of populating a table with fictitious data. In addition, dummy data is generated using faker. So you don't have to use faker to write dummy data. The following code generates dummy data using the seed() method:
```Python
Faker.seed(111)
print(ourFake.text())
```
Output:
```bash
Management huge pay college cover instead. Consumer leg start research her.
Sound finish set draw notice imagine that. Blue between least democratic down week wait. Reduce inside me.
```
#### 4. Creating unique dummy data
You can utilize the generator's.unique property to ensure that the dummy data created is unique.
```python
# generates 10 unique texts 
texts = [ourFake.unique.name() for b in range(10)]
```
#### 5. Command-line usage of Faker package
Command-line invocation of the faker package allows you to directly type in the command prompt code.

#### 6. Creating localized dummy data
The Faker Generator may generate localized false data if a place is provided as an input. Moreover, it can be translated into a wide range of languages. Otherwise, all locales must use the python list data type. 

The following are some names we can come up with:
```Python
ourFake = Faker()
for b in range(10):
    print(ourFake.name())
```
Output:
```bash
Daniel Davidson
Kristin Stewart
Derrick Tran
Matthew Mccarty
Kevin Davis
Kim Watkins
Ashley Humphrey
Corey Webb
Melissa Barrera
Juan Greene
```
### Other dummy data creation methods
They are as follows:

1. In Python, Numpy's Random module can be accessed: Pseudorandom numbers can be generated with the random package. Many functions are available, including `rand()`, `randint()`, and many more.
**WExample**
```python
import numpy as num
myArray = num.random.rand(5)
print("Array : \n", myArray);
```
Output:
```bash
Array : 
 [0.02471149 0.41561035 0.76783821 0.89628689 0.8540258 ]
```
2. Fauxfactory: Automated testing may be made easier with FauxFactory's random data generator!. When building tests for your application, you may need to provide the sections you're testing with random, non-specific data. To test your code quickly, you can use this anytime. [Here](https://fauxfactory.readthedocs.io/en/latest/#), you may learn more about it.
###  A few more words regarding dummy data
As a result of dummy variables, a single regression equation like y= a + bc might represent multiple groups. The term dummy variable refers to a numerical variable that is used to represent categorical information. The necessity for different equations for each subgroup is eliminated. Putting it in another way, dummy variables are like switches in an equation that can enable or disable other variables.
#### Effect of a dummy variable
When the coefficient of an explanatory or independent variable is set to zero, it cannot affect the dependent variable. Still, the intercept will be affected when its coefficient is set to 1.

Dummy variables are created via one-hot encoding. One-hot Encoding transforms categorical variables into a form that can be fed into machine learning algorithms to help them perform better. One of these variables must be used as the starting point to avoid perfect multicollinearity. Multicollinearity occurs when the correlations between two or more independent variables are extremely high in a regression model.
#### Dummy variable trap
Attributes that are highly interconnected and one predicts the value of the other are known as Dummy variable trap. Dummy variable traps can be avoided if you have many characteristics that are highly connected (Multicollinear). When categorical data is encoded using one-hot encoding, we can predict one dummy variable (attribute) using other dummy variables.

Using an example, we can express tree species as a dummy variable by transforming each variable to a one-hot vector consisting of the values pine or oak.
### Reference
1. To see the whole code for this tutorial, click [here](https://colab.research.google.com/drive/1X9VLRsKpKOZisIzpRlfzIU_MneD1busP?usp=sharing)
2. Dummy data [generation](https://dev.to/petercour/dummy-data-generation-with-python-1kjg) with Python
### Conclusion
Faker, a Python library, was used to generate various data. This package has a lot of potentials. I've shown you how to create fictitious data in the past. I believe this information will save you a lot of time and work for testing your application.

Happy coding!
