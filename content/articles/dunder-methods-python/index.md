---
layout: engineering-education
status: publish
published: true
url: /dunder-methods-python/
title: Dunder/Magic Methods in Python
description: This article will talk about dunder methods like init, len, getitem, add, iadd, etc. Various example functions and classes will be discussed.
author: rahul-banerjee
date: 2021-03-23T00:00:00-14:00
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/dunder-methods-python/hero.jpg
    alt: Dunder Methods image
---
Dunder methods are names that are preceded and succeeded by double underscores, hence the name dunder. They are also called magic methods and can help override functionality for built-in functions for custom classes. 
<!--more-->
### 1. Introduction
Implementing dunder methods for classes is a good form of Polymorphism. If you have ever created a class in Python and used the init function, then you have already been using dunder methods.

### 2. Table of contents
- [1. Introduction](#1-introduction)
- [2. Table of Contents](#2-table-of-contents)
- [3. Prerequisites](#3-prerequisites)
- [4. Why do we need Dunder Methods?](#4-why-do-we-need-dunder-methods)
- [5. Our custom class](#5-our-custom-class)
- [6. Dunder Methods for our class](#6-dunder-methods-for-our-class)
  - [6.1. init](#61-init)
  - [6.2. str](#62-str)
  - [6.3. setitem](#63-setitem)
  - [6.4. getitem](#64-getitem)
  - [6.5. delitem](#65-delitem)
  - [6.6. len](#66-len)
  - [6.7. contains](#67-contains)
  - [6.8. Complete code](#68-complete-code)
- [7. Some more dunder methods](#7-some-more-dunder-methods)
  - [7.1. add](#71-add)
  - [7.2. iadd](#72-iadd)
  - [7.3. Other Operators](#73-other-operators)
  - [7.4. call](#74-call)
  - [7.5. Complete code](#75-complete-code)
- [8. Conclusion](#8-conclusion)

### 3. Prerequisites
Before we continue it will be important to have the following:
- A basic understanding of Object Oriented Programming using Python.
- Experience working with classes in Python.
- Familiarity with built-in functions such as len, get, set, etc.

### 4. Why do we need Dunder methods?
Consider a case where we have the following class:

```python
class point:
    x = 4
    y = 5

p1 = point()
print(p1)
```

The print statement would print something like `<__main__.point object at 0x7fb992998d00>`. But, we might want the print statement to display something in the format `(4,10)`. We can achieve this by overriding the `__str__` method of our class.

We could also override other methods such as the `len, +, []` etc. We will create a new class and override many of the built-in functions in this article.

### 5. Our custom class
```python
class softwares:
    names = []
    versions = {}
```

This class will be used to save a list of software and their versions. `names` is a list to store the names of the software and `versions` is a dictionary where the key is the software name and the value is the version number. By default, all softwares start with a version of 1.

### 6. Dunder methods for our class
Before moving on, please ensure that your indentation is correct. The methods that will be discussed below are methods belonging to the class we created and must be indented appropriately.

#### 6.1. init
This is a method you must have already used if you have worked with classes. The `init` method is used to create an instance of the class.

```python
def __init__(self,names):
    if names:
        self.names = names.copy()
        for name in names:
            self.versions[name] = 1
    else:
        raise Exception("Please Enter the names")
```

The `init` method defined above accepts a list of names as parameters and stores it in the class' `names` list. Additionally, it also populates the `versions` dictionary. We have also put a check on the `names` list. 

If the list is empty, an exception is raised. Below is how we would use the `init` method.

```python
p = softwares(['S1','S2','S3'])
p1 = softwares([])
```

The first statement would work fine but the second line would raise an exception since an empty list was passed in as a parameter.

#### 6.2. str
The `str` method is useful when we want to use instances of our class in a print statement. As discussed earlier, it usually returns a memory object. But we can override the `str` method to meet our requirements.

```python
def __str__(self):
    s ="The current softwares and their versions are listed below: \n"
    for key,value in self.versions.items():
        s+= f"{key} : v{value} \n"
    return s
```

The above `str` method returns the software and their versions. Ensure that the function returns a string. Below is how we would call the method.

```python
print(p)
```

#### 6.3. setitem
When assigning values in a dictionary, the `setitem` method is invoked.

```python
d = {}
d['key'] = value
```

We can give instances of our class a similar feature with the help of the `setitem` method.

```python
def __setitem__(self,name,version):
    if name in self.versions:
        self.versions[name] = version
    else:
        raise Exception("Software Name doesn't exist")
```

The method above is going to update the version number of the software. If the software is not found, it will raise an error. 

In the 3rd line, we use the built-in `setitem` method of a dictionary.

We can invoke the `setitem` method in the following way:

```python
p['S1'] = 2
p['2'] = 2
```

The first line would update the version of software S1 to 2. But the second line would raise an exception since software 2 doesn't exist.

#### 6.4. getitem
The `getitem` method is like the `setitem` method, the major difference being that the `getitem` method is called when we use the `[]` operator of a dictionary.

```python
d = {'val':key}
print(d['val'])
```

Instances of our class can also be given a similar feature.
```python
def __getitem__(self,name):
    if name in self.versions:
        return self.versions[name]
    else:
        raise Exception("Software Name doesn't exist")
```

The above method essentially returns the version of the software. If the software is not found, it raises an exception. To invoke the `getitem` method, we can write the following line of code.

```python
print(p['S1'])
print(p['1'])
```

The first line would print the version of S1. But, the second line would raise an Exception since 1 doesn't exist.

#### 6.5. delitem
The `delitem` is like the `setitem` and `getitem` method. To avoid repetition, we will move on to the implementation and use case.

```python
def __delitem__(self,name):
    if name in self.versions:
        del self.versions[name]
        self.names.remove(name)
    else:
        raise Exception("Software Name doesn't exist")
```

The `delitem` method deletes the software from the dictionary as well as the list. 

It can be used as follows.
```python
del p['S1']
```

#### 6.6. len
In a dictionary, the `len` method returns the number of elements in a list or the number of key-value pairs in a dictionary. 

We can define a `len` method for our class as well.
```python
def __len__(self):
    return len(self.names)
```

The `len` method for our class returns the number of softwares. As you might have noticed, we are using the built-in `len` method of a list to return the number of software.

The `len` method of our class can be used in the following way.
```python
print(len(p))
```

#### 6.7. contains
The `contains` method is used when using the `in` operator. The return value has to be a boolean.

```python
def __contains__(self,name):
    if name in self.versions:
        return True
    else:
        return False
```

The method checks if the name is found in the dictionary. We will be using the dictionary's built-in `contains` method for that.

```python
if 'S2' in p:
    print("Software Exists")
else:
    print("Software DOESN'T exist")
```

The code above prints the statement inside the if blocks since software S2 is present inside the `versions` dictionary.

#### 6.8. Complete code
```python
class softwares:
    names = []
    versions = {}
    
    def __init__(self,names):
        if names:
            self.names = names.copy()
            for name in names:
                self.versions[name] = 1
        else:
            raise Exception("Please Enter the names")
    
    def __str__(self):
        s ="The current softwares and their versions are listed below: \n"
        for key,value in self.versions.items():
            s+= f"{key} : v{value} \n"
        return s
    
    def __setitem__(self,name,version):
        if name in self.versions:
            self.versions[name] = version
        else:
            raise Exception("Software Name doesn't exist")
    
    def __getitem__(self,name):
        if name in self.versions:
            return self.versions[name]
        else:
            raise Exception("Software Name doesn't exist")
    
    def __delitem__(self,name):
        if name in self.versions:
            del self.versions[name]
            self.names.remove(name)
        else:
            raise Exception("Software Name doesn't exist")
    
    def __len__(self):
        return len(self.names)
    
    def __contains__(self,name):
        if name in self.versions:
            return True
        else:
            return False
```

### 7. Some more dunder methods
Before looking at some more dunder methods, let's create a new class.

```python
class point:
    x = None
    y = None
    
    def __init__(self, x , y):
        self.x = x
        self.y = y
    
    def __str__(self):
        s = f'({self.x},{self.y})'
        return s

p1 = point(5,4)
p2 = point(2,3)
```

We have created a class point which is basically a 2D point. The class has an `init` method and a `str` method. We have also created a couple of instances of the class.

#### 7.1. add
The `add` method is called when using the `+` operator. We can define a custom `add` method for our class.

`p1 + p2` is equal to `p1._add__(p2)`

```python
def __add__(self,p2):
    x = self.x + p2.x
    y = self.y + p2.y
    return point(x,y)
```

The above method adds the x and y coordinates of the first instance of `point` and the second instance of `point`. It will create a new instance of `point` and then return it.

```python
p3 = p1 + p2
```

The line of code above invokes the `add` method.

#### 7.2. iadd
The `iadd` method is like the `add` method. It is invoked when using the `+=` operator

```python
def __iadd__(self,p2):
    self.x += p2.x
    self.y += p2.y
    return self
```

The method above just updates an instance's coordinates by adding the coordinates of `p2`. Make sure you are returning `self`, otherwise it will return None and won't work as expected.

```python
p1 += p2
print(p1)
```

The above method invokes the `iadd` method.

#### 7.3. Other operators
- `__sub__(self,p2)` ( - )
- `__isub__(self,p2)` ( -= )
- `__mul__(self,p2)` ( * )
- `__imul__(self,p2)` ( *= )
- `__truediv__(self,p2)`( \ )
- `__itruediv__(self,p2)` ( \\= )
- `__floordiv__(self,p2)` ( \\\ )
- `__ifloordiv__(self,p2)` ( \\\= ) 

#### 7.4. call
When invoking a function like `func()`, we are invoking the `call` method. 

If we put in place a `call` method for our class, we can do the following:

```python
p1()
p2()
```

Below is an example call method:

```python
def __call__(self):
    print(f"Called Point {self.x},{self.y}")
```

#### 7.5. Complete code
```python
class point:
    x = None
    y = None
    
    def __init__(self, x , y):
        self.x = x
        self.y = y
    
    def __str__(self):
        s = f'({self.x},{self.y})'
        return s
    
    def __add__(self,p2):
        print("In add")
        x = self.x + p2.x
        y = self.y + p2.y
        return point(x,y)
    
    def __iadd__(self,p2):
        self.x += p2.x
        self.y += p2.y
        return self
    
    def __isub__(self,p2):
        self.x -= p2.x
        self.y -= p2.y
        return self
    
    def __imul__(self,p2):
        self.x *= p2.x
        self.y *= p2.y
        return self
    
    def __itruediv__(self,p2):
        self.x /= p2.x
        self.y /= p2.y
        return self
    
    def __ifloordiv__(self,p2):
        self.x //= p2.x
        self.y //= p2.y
        return self
    
    def __call__(self):
        print(f"Called Point {self.x},{self.y}")
```

### 8. Conclusion
Dunder methods are indeed magical and can help you improve the functionality of your class. You can find more dunder methods [here](https://docs.python.org/3/reference/datamodel.html#).

Happy Learning! :)

---
Peer Review Contributions by: [Peter Kayere](/engineering-education/authors/peter-kayere/)
