### Introduction
In this post, dummy data is generated using the Python Faker library. It's critical to test and evaluate software and hardware with dummy data. It's possible to test your code by running it through various scenarios. Faked data can be easily generated with the Python function faker.

For testing and operational reasons, dummy data is used, and code can be tested against various types of stimuli.
### Prerequisites
1. Before proceeding with this tutorial, you should know the python programming language.
2. Have a python IDE or follow this [documentation](https://www.python.org/) to install.

> Setup Faker with the pip command:

```Python
pip install faker
```
### Listed below are methods and types of dummy data
#### 1. Creating and initializing faker generators
You can generate and initialize fake generators using `Faker().` Using the Faker generator, you'll be able to generate any data you desire.
```Python
from faker import Faker
ourFake = Faker()
```
#### 2. Createing random text 
We use `text().` The method below created a paragraph to create random text.
```Python
ourFake.text()
```
Output:
```bash
Business happy black arrives end. Election wear list. Would lay though.\nCentury collection everybody key fight. Goal nation woman assume both.
```
For addresses we use `address()` and for names we use `name()` methods.
Here are some examples for creating addresses and names, respectively:
```Python
ourFake.address()
```
Output:
```bash
3722 Garza Port\nSmithshire, UT 28618
```
Next example:
```python
ourFake.name()
```
Output:
```bash
Dana Williams
```
#### 3. Creating same dummy data
You may wish to use the same collection of data again. Seeding the generator is a viable option. A random function's state is saved using the seed function, allowing the process to create the same random numbers again and over again, whether the code is executed on the same system or not. The previous value number created by the generator serves as the seed. First, it utilizes the current system time without last value. In addition, dummy data is generated using faker. So you don't have to use a faker to write dummy data. The following code creates dummy data using the seed() method:
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
Command-line invocation of the faker package allows you to type in the command prompt code directly. 
Here is an example typed in the command prompt:
```Python
$ faker address
```
Output:
```bash
173 Castro Ferry\nSouth Alexandriafort, WI 38412
```
#### 6. Creating localized dummy data
The Faker generator may generate localized false data if a locale is provided input. Moreover, localized dummy data can be translated into various languages. Otherwise, all locales must use the python list data type. 

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
#### 7. Creating dummy data about currencies
The Faker generator may generate false data currencies using the `currency()` method. 
```python
ourFake.currency()
```
Output:
```bash
('CUC', 'Cuban convertible peso')
```
You can also use the `Faker()` properties to generate dummy data, such as cryptocurrency.
```Python
ourFake.cryptocurrency()
```
Output:
```bash
('POT', 'PotCoin')
```
#### 8. Providers
Assembling the items is made easier with the assistance of providers. Dependencies are injected into objects that they create. Create an object by calling the provider as if it were a function. The service provider is responsible for retrieving and injecting the underlying dependencies into the newly generated thing.

Providers include many valuable attributes, such as `names()` and `address()`. Many standard providers are basic, like the internet and a person, while others are community-created, like music.

### Other dummy data creation methods
They are as follows:

1. Accessing Numpy's Random module in Python: Pseudorandom numbers can be generated with the random package. Many functions are available, including `rand()`, `randint()`, and many more.
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
2. Fauxfactory: Automated testing may be easier with FauxFactory's random data generator!. When building tests for your application, you may need to provide the sections you're testing with random, non-specific data. To test your code quickly, you can use this anytime. [Here](https://fauxfactory.readthedocs.io/en/latest/#), you may learn more about it.
###  A few more words regarding dummy data
Dummy variables are numeric variables that represent the dataset's categorical variables' subdivisions or groupings. We may use the data for regression analysis by utilizing a dummy variable that allows us to distinguish between distinct sub-groups of the data. As a result of dummy variables, a single regression equation like y= a + bc might represent multiple groups. The necessity for different equations for each subgroup is eliminated. Put it differently; dummy variables are like switches in an equation that can enable or disable other variables.

Highly interconnected attributes and one predicts the value of the other are known as the **dummy variable trap**. Dummy variable traps can be avoided if you have many characteristics that are highly connected (Multicollinear). Multicollinearity occurs when the correlations between two or more independent variables are incredibly high in a regression model. 
### Conclusion
Various data was generated using faker, a Python library. T his package has a lot of possibilities. In the past, I demonstrated how to create fictitious data. How to create names and addresses as well as currency data was covered. As well as creating new dummy data, we honed our skills in reproducing existing dummies. During our investigation of the providers, we discovered the possibility of creating data specific to a specific location. You will save a lot of time and effort if you follow this information when testing your application.
### Reference
1. To see the whole code for this tutorial, click [here](https://colab.research.google.com/drive/1X9VLRsKpKOZisIzpRlfzIU_MneD1busP?usp=sharing)
2. Dummy data [generation](https://dev.to/petercour/dummy-data-generation-with-python-1kjg) with Python

Happy coding!
