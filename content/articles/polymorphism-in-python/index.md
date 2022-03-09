### Introduction
In object-oriented programming functions with similar names can perform different functionalities altogether. This feature is called Polymorphism. It permits the production of structures that utilizes many types of objects. A single object referring to a particular class can be used the same way as if it was another object referring to another class.  
In this tutorial, we are going to cover more and equip the reader with knowledge about polymorphism and its implementation in python. 

**By reading this article, learners are expected to:**
1. Understand Inbuilt and User-defined polymorphic function examples.
2. Learn more about Polymorphism with the inheritance of traits.
3. Have a clear understanding of Polymorphism with the methods of a class.
4. Understand Polymorphism in the context of a Function and its objects

### Table of content
- [Introduction](#introduction)
- [Python Polymorphism](#python-polymorphism)
- [Built-in Polymorphic Function.](#built-in-polymorphic-function)
- [User-defined Polymorphic Function.](#user-defined-polymorphic-function)
- [Polymorphism with the inheritance of traits.](#polymorphism-with-the-inheritance-of-traits)
- [Overloading an operator](#overloading-an-operator)
- [Polymorphism in the context of a Function and its objects.](#polymorphism-in-the-context-of-a-function-and-its-objects)
- [Merit of Polymorphism](#merit-of-polymorphism)
- [Conclusion](#conclusion)

### Python Polymorphism
Polymorphism implementation in python has its specific syntax as compared to other programming languages. The syntax for the polymorphic function is represented as follows:

```python
# function definition
def polymorphic_function()
    {
        Return output;
    }
    # code
    {
        print (sum(4,6));
    }
```
When it comes to classes and objects this concept of taking many forms is possible in python through the use of **inheritance**, where child classes inherit all the parent class properties and methods.

```python
class people:
  def intro(self):
    print("There are many kinds of peoples.")
     
  def social(self):
    print("Most of them are social while others are not.")
   
class introvert(people):
  def social(self):
    print("Introverts are not social.")
     
class extrovert(people):
  def social(self):
    print("Extroverts are social.")
     
ob_people = people()
ob_introvert = introvert()
ob_extrovert = extrovert()
 
ob_people.intro()
ob_people.social()
 
ob_introvert.intro()
ob_introvert.social()
 
ob_extrovert.intro()
ob_extrovert.social()
```

**Output:** 
```bash
There are many kinds of people.
Most of them are social while others are not.
There are many kinds of people.
Introverts are not social.
There are many kinds of people.
Extroverts are social.
```
When it comes to functions, there are two kinds of polymorphism that are used: **inbuilt** and **user-defined** polymorphic functions.

- Inbuilt functions are the standard library functions that provide an easy way of using them by only importing them.
- User-defined functions are where the user can create any number of customized functions with different types of operations and methods.

The examples are shown below;
### Built-in Polymorphic Function.
```python
i=2
j=3
k=3
m=5
 sum1(i, j):
print(sum1)
sum2(k+m):
print(sum2)  
```
**Output**
```bash
5
8
``` 

### User-defined Polymorphic Function.
```python
# len() being used for a string
print(len("what is your name?"))
 
# len() being used for a list
print(len([2, 60]))
```

**Output:**
```
18
2
```

### Polymorphism with the inheritance of traits.
Polymorphism in Python allows us to declare styles in the class that has the same name as styles in the base classes. The sub-class inherits the system from the base class through heritage. 
Changing a system in a class that has been inherited from the base class is possible anyhow. This is especially useful when the base class's inherited function doesn't fit the class. In similar cases, we re-execute the system in the class to ensure that it's still working.

  **Method Overriding** this is the process of implementing a system in a child class. 

### Overloading an operator
Is one more sort of polymorphism upheld by python where administrators act contrastingly based on the operands.

For example, the + operator can sum two numbers, merge lists and also concatenate strings.

```python
print(20+20)
print("manipulator"+"load")
print(3*3)
print("load"*2)
``` 
The above statements will produce different results based on the functionality of the operands.

```bash
40
manipulator load
9
load load
```
In python to overload operators, one needs to provide an implementation to that special method in that class. For instance, when using  `+` a special method `_add_` is invoked. This is as shown below:

```python
class Gross Pay
    def_init_(self,value):
        self.value = value
    def_sum_(self,otherPay):
        return self.value + otherPay.value

BasicSalary=GrossPay(10,000)
Allowance=GrossPay(5,000)

Total = BasicSalary + Allowance
print(Total)
```
Output
```bash
15,000
```
From the above, the operator invokes the `_sum_` method which allows adding up two instances of `Gross Pay`. So calling  `BasicSalary + Allowance` is the same as calling `BasicSalary._sum_(Allowance)`. This applies to all the other operators.

### Polymorphism in the context of a Function and its objects.
It's also possible to construct a polymorphic function that recognizes any object.
Create a function called "func()" that accepts an object called "obj" in this model. Regardless of how we use the word 'obj,' any sent-off entity can be called into this method.
From then on, we'll give the function something to do with the 'obj' object we supplied it. The three methods capital(), language(), and type() will be referred to as capital(), language(), and type(), and will be defined in the two classes 'South Africa' and 'Canada,' respectively ().
If we don't already have them, create instantiations of the 'South Africa' and 'Canada' classes. The same func() method can be used several times.

**Code**:Using a function
```python
class SouthAfrica():
    def capital(self):
        print("Pretoria is the capital city of South Africa ")
  
    def language(self):
        print("Afrikaans, English are the most commonly spoken languages.")
  
    def type(self):
        print("South Africa is a third world developing country.")
  
class Canada():
    def capital(self):
        print("Ottawa is the capital of Canada")
  
    def language(self):
        print("English and French is the primary language of Canada.")
  
    def type(self):
        print("It is a developed country.")
 
def func(obj):
    obj.capital()
    obj.language()
    obj.type()
  
obj_SA = SouthAfrica()
obj_Ca = Canada
  
func(obj_Sa)
func(obj_Ca)
```

**The Output:**
```
Pretorial is the capital city of South Africa.
Afrikaans, English is the most commonly spoken language.
South Africa is a third-world developing country.
Ottawa is the capital of Canada.
English and French is the primary language of Canada. 
It's a developed country.
```

### Merit of Polymorphism
Polymorphism has a lot of significance:
- Allows reusability of codes and classes.
- Reduction coupling among different functionalities and behavior of objects.
- Offers adequate assistance for classes and member function to make specific usage concerning execution and use.
- Helps users to make customized functions.

### Conclusion
In this tutorial, we have learned various concepts used in the Python language. We have looked into details the concept of polymorphism in python which plays a crucial role in object-oriented programming by allowing code reusability and the creation of user-defined functions with customized methods and properties. We have also discussed more on polymorphism and its execution in the Python language, how polymorphism is used in both built-in and user-defined functions and how polymorphism is used in classes and objects.

For further reading, the reader can go through [Polymorphism in Python](https://www.programiz.com/python-programming/polymorphism) to enhance themselves with more skills and information.

Happy coding!
