### Introduction
Python's getters and setters are unique. They allow data encapsulation. Others have hidden fields for private variables. Several OOP languages employ getters and setters to store data. We conceal an object class's attributes so other classes' methods don't alter data accidentally.

In object-oriented languages, these methods obtain and change data. Setting an object's attribute value is called setting. How to utilize Python's getter and setter methods.

### Table of contents
- [Understanding getters and setters](#understanding-getters-and-setters)
- [Get getters and setters behavior using normal functions](#get-getters-and-setters-behavior-using-normal-functions)
- [Get getters and setters behavior using @Property decorators](#get-getters-and-setters-behavior-using-@Property-decorators)
- [Get getters and setters behaviour using property() function](#get-getters-and-setters-behaviour-using-property()-function)
- [Project algorithm](#project-algorithm)
- [Implementation of the algorithms](#implementation-of-the-algorithms)
- [Conclusion](#conclusion)

### Understanding getters and setters
That which a getter method returns is its argument. This is useful for OOP private property access. A setter modifies a property's value. This is helpful for establishing private class characteristics in OO programming. Using getters and setters ensures data encapsulation.

Why do we use setters and getters?

- To ensure encapsulation
- To keep the interface even if the internals change.
- Add validation logic to value acquisition and setting.
- Externalize the property's internal representation.
- No direct access or change to a class field.
- Access levels are configured using getters and setters.

### Get getters and setters behavior using normal functions
If we use the standard get() and set() methods to obtain the getters & setters property, there will be no need for any additional specific implementation code.

```python 
class section:
    def __init__(ascetic, span = 0):   
         ascetic._span = span     
    def get_span(ascetic):   
        return ascetic._span    
    def set_span(ascetic, k):   
        ascetic._span = k  
    
kelvin = section()   
kelvin.set_span(34)   
print(kelvin.get_span())   
print(kelvin._span)
```

After running the code the output will be:

```bash 
34
34
```

Because the methods get age() and set age() are regular functions, they may provide the needed functionality. Python has a distinguishing function ().

### Get getters and setters behavior using @Property decorators
This method returns a property object in Python. Methods for getting, setting, and deleting properties (). It takes four parameters in Python. This method gets an attribute's value from the file. fset sets an attribute's value. fdel deletes an attribute value. No documentation is created by default. Getter(), setter(), and deleter() (). Get, set, and delete (). Consider the following example:

```python
class Section:   
     def __init__(ascetic):   
          ascetic._span = 0  
     def get_span(ascetic):   
         print("The getters method")   
         return ascetic._span  
     def set_span(ascetic, k):   
         print("The setters method")   
         ascetic._span = k   
     def del_span(ascetic):   
         del ascetic._span   
     span = property(get_span, set_span, del_span)    
    
kelvin = Section()   
    
kelvin.span = 23  
    
print(kelvin.span)  
```

The output of the code

```bash
The setters method
The getters method
23
```

The above program simply has one print statement. The output has three lines since the setter method set span() and the getter function get span() were both invoked. So span is a property object that helps secure private variable access.

### Get getters and setters behaviour using property() function
The prior technique used the property() method to achieve getters and setters. Getters and setters are used to check attribute values. A decorator may impose property function. @property decorates Python. Main goal of decorator is to change class methods or attributes without modifying user code.

```python
class Section:   
     def __init__(ascetic):   
          ascetic._span = 0  
        
     @property  
     def span(ascetic):   
         print("The getters method")   
         return ascetic._span   
         
       
     @span.setter   
     def span(ascetic, k):   
         if(k < 20):   
            raise ValueError("the span is ineligible")   
         print("The setters method")   
         ascetic._span = k   
    
kelvin = Section()   
    
kelvin.span = 32 
    
print(kelvin.span)
```

The output

```bash
The setters method
The getters method
32
```

The @property decorator is used to construct Python getters and setters as shown in the code above. A ValueError is raised if the span is set to less than 32 in the previous example, which acts as validation code.

### Project algorithm
In this project, we have a list of variable names and data types and must display all of their getter-setter functions while adhering to fundamental Java programming rules.

To be able to accomplish this we follow the below algorithm:

- Transform the first character of each variable into an uppercase letter.
- Add the word "get" to the beginning of each variable that has been updated and put them in a list.
- Add the word "set" at the beginning of each variable that has been updated and save them in a list.
- Print the getter and setter methods for each variable and its corresponding datatype via string concatenation for each variable and its corresponding datatype.

### Implementation of the algorithms
```python
def print_getter_setter(variables, datatypes):

    getters = []
    setters = []
    for var in variables:
        getter = "get" + var[0].capitalize() + var[1:]
        getters.append(getter)
        setter = "set" + var[0].capitalize() + var[1:]
        setters.append(setter)

    for k in range(len(variables)):
        print("public " + datatypes[k] + " " + getters[k] +
            "() {\n\treturn " + variables[k] + ";\n}\n")

        print("public void " + setters[k] + "(" + datatypes[k] +
            " " + variables[k] + ") {\n\tthis." + variables[k] +
            " = " + variables[k] + ";\n}\n")

if __name__=="__main__":

    variables = ["cdf", "stdID", "section", "y"]

    datatypes = ["int", "float", "double" , "String"]

    print_getter_setter(variables, datatypes)
```

The output

```bash
public int getCdf() {
    return cdf;
}

public void setCdf(int cdf) {
    this.cdf = cdf;
}

public float getStdID() {
    return stdID;
}

public void setStdID(float stdID) {
    this.stdID = stdID;
}

public double getSection() {
    return section;
}

public void setSection(double section) {
    this.section = section;
}

public String getY() {
    return y;
}

public void setY(String y) {
    this.y = y;
}
```
### Conclusion
From the above article, we have learned what getters and setters are in the python programming language. Also learned how to get getters and setters behavior using property() function, @Property decorators, and finally using normal functions. I urge the reader to use the knowledge above to advance more into getters and setters in other languages.

Happy cording!