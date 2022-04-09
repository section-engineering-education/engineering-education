---
layout: engineering-education
status: publish
published: true
url: /how-to-implement-object-oriented-programming-in-matlab/
title: How to Implement Object Oriented Programming in Matlab
description: This tutorial will guide the reader on how to avoid redundancy in code repetition and reduce complexity using Matlab.
author: collince-odhiambo 
date: 2021-08-24T00:00:00-16:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/how-to-implement-object-oriented-programming-in-matlab/hero.jpg
    alt: Object Oriented Programming in Matlab
---
Object-oriented programming is a programming method that depends on structures known as objects. This object makes it easy to combine the properties of data and various functions operating on that data. 

<!--more-->
These functions are known as methods. For example, you could create an object that notes the distance covered by a moving particle. This object can be used as a building block in building complex systems in the real world. 

### Introduction
Object-oriented programming in Matlab is used to manage your codes. It is done by organizing them into classes and functions. It makes it easier to make any change to your code over time. 

You can avoid redundancy in your code, repetition, and reduce complexity. In this article, we will look at how we can do this using Matlab.

### Prerequisites
- Have [Matlab](https://www.mathworks.com/products/get-matlab.html?s_tid=gn_getml) installed.
- A proper understanding of [Matlab](/engineering-education/getting-started-with-matlab/) basics.

The four principles of object-oriented programming are:
- Encapsulation
- Inheritance
- Polymorphism
- Abstraction

### Encapsulation
Encapsulation is enclosing something or depicting the essential features. This same approach is implemented in programming, but in this case, we use classes and objects. 

The primary use of a class is definning the object that encloses the property (data) and the operations on that property. 

This method hides the internal working of the class from outside code. To implement the mechanism of hiding features, we have access modifiers by which you can restrict the access of the methods and properties of one class from another class. 

Access determines what other methods and functions can call the method. It also provides, gets, and access to properties. 

The three types of access include:
- Public - unrestricted access (default).
- Protected - Access from class methods or their subclass.
- Private - Access from class methods only (not from sub-class).

### How to implement incapsulation in Matlab

```m
classdef employees
properties
name
baseSalary
end
```

In the code above, we demonstrated a basic of the class employees. The properties defined are name and base salary. As mentioned earlier, here, there is no access attribute therefore it is public. 

When the access attribute is not defined, then they are public by default. Since this is a `class employee`, we could make some of the properties private. For example, it could be properties such as `date of birth` and `address` and specify class `methods` that can access these properties. 

To restrict access to a given group, we use `GetAccess` and `SetAccess`. `GetAccess` permits to read the value of properties, while `SetAccess` permits us to assign a value on the property. 

```m
properties(Access=private)
dateOfBirth
address
end
properties(GetAccess = {?Engineer, ?Sales, ?TestEngineers})
dateOfJoining = 01/23/2020
department
end
```

The value property or state of joining and department can be read from the three sub-classes which are - Engineer, Sales and TestEngineers. We then have two class methods, constructor (employees) and function `getname`.

```m
methods
function obj = employees(name, baseSalary)
obj.name = name;
obj.baseSalary = baseSalary;
end
function r = getname(obj)
r = obj.name;
return;
end
end
end
```

To initiate the object, we call the constructor. We name the object as `obj` and call the function employee, and pass the parameters `name` and `baseSalary`. 

It is done by the command below:

```m
obj = employees("neha", 1000)
```

When we run this command in the command window, we will have our object.

![our property](/engineering-education/how-to-implement-object-oriented-programming-in-matlab/oop_one.png)

### Inheritance
Here, we organize the class into hierarchies. For example, in encapsulation, we have a class `employees` with the parameters name and baseSalary known as base class or superclass. Engineer and sales are subclasses having their properties (product and commission). 

Inheritance expresses an either `is-a` or `has-a` relationship between two objects. The advantage is that it eliminates the redundant code or re-using the code from superclass to subclass. 

They accept classes and inherit the public properties of their superclass. Let's implement this in Matlab. In this case, we will look at the class Engineers.

Since we have our base class employees, which we defined earlier, we describe the subclass of this base class, in this case, Engineers. This subclass has its properties, which are products. 

```m
classdef Engineers< employees
properties
products
end

properties(Access=private)
team
end
```

The less than (<) sign is used to represent the subclass and superclass relationship. 

We can access the superclass constructor from the base class by the center below:

```m
methods
function objE = Engineers(name, baseSalary, products)
objE@employees(name, baseSalary)
objE.products = products;
return
end

function y = Salary(objE, noOfHours)
y = objE.baseSalary*noOfHours;
return
end
end
end
```

We can also have a subclass for sales:


```m
classdef Sales < employees
properties
commission
region
end
methods
function objS = Sales(name, baseSalary, region, commission)
objS@employees(name, baseSalary)
objS.region = region;
objS.commission = commission;
return
end
function S = Salary(objS, noOfHours)
S = (objS.baseSalary*noOfHours)*objS.commission;
end
end
end
```

The `objE` is the output of the subclass constructor and the read superclass name and any other argument required by the argument superclass.

In Matlab, you can check the final properties of the class by the command properties and the class name. 

```m
properties Engineers
```

This property has all the public properties of the superclass employees.

![properties engineer](/engineering-education/how-to-implement-object-oriented-programming-in-matlab/oop_two.png)

### Polymorphism
Polymorphism is a technique in object-oriented programming that allows you to eliminate long lines of codes of `if`, `else`, or `switch case` statements.

To implement this technique in Matlab, we look at the example we used in the class engineers, and it is implemented in the `function salary.`

```m
% function for salary for an engineer
function y = Salary(objE, noOfHours) 
y = objE.baseSalary*noOfHours;
return
end
```

```m
% function for salary for sales
function S = Salary(objS, noOfHours)
S = (objS.baseSalary*noOfHours)*objS.commission;
end
```

In the above code, we have a function salary. Both the engineer and sales class have the same input argument, but they calculate the salary using different mathematical operations. Here we initiate our object of each class `objE` and `objS`. 

We use the name and the base salary from the superclass and provide new values for their properties. For example, we had our employees 'neha'. We must specify the products and sales of neha. We first specify our objects i.e `objE` and `objS`. 

To define `objE`:

```m
objE = Engineer(obj.name, obj.baseSalary, "simulink")
```

![object engineer](/engineering-education/how-to-implement-object-oriented-programming-in-matlab/oop_three.png)

The parameters of our object are the name, salary, and the product, which is Simulink.

```m
objS = Sales(obj.name, obj.baseSalary, "NA", 500)
```

Here the parameters are name, salary, region, which in this case is not applicable (NA), and commission which is 500.

![object sales](/engineering-education/how-to-implement-object-oriented-programming-in-matlab/oop_four.png)

To see the impact of these, we will execute the following command in the command window. 


```m
SE = Salary(objE, 10)  %Calculates the salary

SS =  Salary(objS,10)   %calculates the salary from sales
```

The value 10 is the number of hours. When we run the codes separately, we get the salary and the sales.

![image showing results](/engineering-education/how-to-implement-object-oriented-programming-in-matlab/oop_five.png)

The calculated salary is different as per the mathematical operations.

### Abstraction
Abstraction can be said to be an extension of encapsulation. To implement abstraction in our example, we only define the function named `salary` in the base class employed, and it's derived class will have the function implementation. 

In Matlab, we can do abstraction by making the class an abstract class. 

```m
classdef(Abstract) Employees
properties
name
baseSalary
end
methods
Salary(obj)
getName(obj)
end
end
```

A class is abstract when we either declare the attribute abstract, an abstract method, or property. 

The above code shows that the methods and properties are only defined in the abstract class, but the implementation will be done in their subclass that supports their specific requirement.

### Conclusion
Object-oriented programming is helpful because it allows your codes to be in order, It also helps get it organized into classes and subclasses. It enhances the clarity of the code. 

Object-oriented programming also makes it easier to make any change in your code over time without any effect. It also enables the re-usability of the codes to prevent repetition.  

---
Peer Review Contributions by: [Mary Njeri](/engineering-education/content/authors/mary-njeri/)
