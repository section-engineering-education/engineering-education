### Introduction
For various reasons, it's essential to have phoney data on hand. In this post, dummy data is generated using the Python Faker library. It's critical to test and evaluate software and hardware with dummy data. It's possible to test your code by running it through various scenarios. Faked data can be easily generated with the Python function Faker.

For testing and operational reasons, dummy data is used. Your code can be tested against a variety of different types of stimuli.
### Prerequisites
1. Before proceeding with this tutorial, you should know the python programming language.
2. Have a python IDE or follow this [documentation](https://www.python.org/) to install.

> Setup Faker with the pip command:

```Python
Pip install Faker
```

### Listed below are methods and types of dummy data
#### 1. Faker generators can be created and initialized
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
About eight four they wife.
Force finally very summer. Occur, you shake through physical reveal. Require player yeah magazine thank bank traditional.
```
For addresses we use `address()` and for names we use `name()` methods.
#### 3. Creating same dummy data
You may wish to use the same collection of data again. Seeding the generator is a viable option. The following code generates dummy data using the seed() method:
```Python
Faker.seed(111)
print(ourFake.text())
```
Output:
```bash
Management massive pay college cover instead. Consumer's leg start research her.
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
#### 6. Providers
For the most part, these features are bundled into service providers.
1. Standard Providers- You can find more information [here](https://faker.readthedocs.io/en/stable/providers.html).
2. Community Providers- [This](https://faker.readthedocs.io/en/stable/communityproviders.html) site has a wealth of data on locally developed service providers. 
#### Creating localized dummy data
The Faker Generator may generate localized false data if a place is provided as an input. Moreover, it can be translated into a wide range of languages. Otherwise, all locales must use the python list data type. 

The following are some Hindi names we can come up with:
```Python
ourFake = Faker('hi_IN')
for b in range(10):
    print(ourFake.name())
```
Output:
```bash
हेगडे, देन्यल
प्रबोध खान
रायन कृष्णन
लाल, नरेन्द्र
काले, फ़रहान
प्रभाकर भंडारी
कुलकर्णी, तृष्णा
सरस्वती बालासुब्रमणियम
गौतम दुआ
विजय कृष्णा
```
### Other dummy data creation methods
They are as follows:

1. In Python, Numpy's Random module can be accessed: Pseudorandom numbers can be generated with the random package. Many functions are available, including `rand()`, `randint()`, and many more.
2. Fauxfactory: To test your code quickly, you can use this anytime. [Here](https://fauxfactory.readthedocs.io/en/latest/#), you may learn more about it.
###  A few more words regarding dummy data
As a result of dummy variables, a single regression equation might represent multiple groups. The necessity for different equations for each subgroup is eliminated. Put another way, and dummy variables are like switches in an equation that can enable or disable other variables.
#### Effect of a dummy variable
When the coefficient of an explanatory or independent variable is set to zero, it cannot affect the dependent variable. Still, the intercept will be affected when its coefficient is set to 1.

Dummy variables are created via one-hot encoding. One of these variables must be used as the starting point to avoid perfect multicollinearity.

With this encoding method, the categorical variable is converted into a set of binary variables. One-hot encoding employs N binary variables for N categories in a variable. Dummy encoding is an improvement over one-hot encoding, but it's not much of an improvement.
#### Dummy variable trap
Dummy variable traps can be avoided if you have many characteristics that are highly connected (Multicollinear). When categorical data is encoded using one-hot encoding, we can predict one dummy variable (attribute) using other dummy variables.
### Reference
1. To see the whole code for this tutorial, click [here](https://colab.research.google.com/drive/1X9VLRsKpKOZisIzpRlfzIU_MneD1busP?usp=sharing)
2. Dummy data [generation](https://dev.to/petercour/dummy-data-generation-with-python-1kjg) with Python
### Conclusion
Faker, a Python library, was used to generate various data. This package has a lot of potentials. I've shown you how to create fictitious data in the past. I believe this information will save you a lot of time and work for testing your application.

Happy coding!