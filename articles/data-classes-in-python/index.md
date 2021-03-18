### Data classes in Python
![hero image](/engineering-education/data-class-in-python/hero.jpg)

The main function of a Python class is to contain and represent data. In previous Python versions, the init function stores values on the instance of the class. This is a common pattern that begs the question of why must we explicitly store each argument on the object. Well, in Python 3.7 we don't. A new feature called data class which helps to automate the creation and managing of classes that mostly exist just to hold data was introduced to help solve this as we will see later in the chapter.

### Prequisites
To get started with data classes you must have `python 3.7` and above since previous versions don't have its support. You can get the latest python versions from its official website [here](https://www.python.org/downloads/).

The reader should also know about working with python classes and objects for a better understanding of the chapter. If you would like to brush your skills on classes be sure to visit this [site](https://docs.python.org/3/tutorial/classes.html) to familiarise yourself with the concepts.

### Defining a data class
A python class is a program for creating objects and attributes. We use the keyword `class` when creating a class in python. For class attributes to be initialized we use a constructor method called `__init__()`. An `__init__()` method is called when an object is created in a python class. Let's create a class and see how this works.

```python
class Student:
    def __init__(self, name, course, gpa):
        self.name = name
        self.course = course
        self.gpa = gpa


# create instances
student1 = Student('James', 'Comp Science', 3.7)
student2 = Student('Angie', 'Bcom', 4.0)

print(student1.course)
print(student2.name)
```

In the class above, our `__init__()` method takes in four arguments. The `self` keyword represents the instance of the class and allows us to access any attribute defined in the class. Our attributes, in this case, are `name`, `course`, and `gpa`. We use self together with the attribute to access its instance, for example, `self.name` access the name attribute. We then create two variables `student1` and `student2` and create an instance of our class. We then print it out.

This is how we used to define classes in previous python versions, in Python 3.7, data classes were introduced to simplify the creation of classes. Let's work on an example and see what changed in Python 3.7.

```python
from dataclasses import dataclass

@dataclass
class Student:
    name: str
    course: str
    gpa: float


# create instances
student1 = Student('James', 'Comp Science', 3.7)
student2 = Student('Angie', 'Bcom', 4.0)

#access fields
print(student1.course)
print(student2.name)

# print student1 itself
print(student1)
```

We first import the dataclass. We prefix our class with the `@dataclass` decorator from the imported dataclass. In our class, we define our fields with their data type. By running the `dataclass()` decorator, the properties of the class are initialized by a built-in `__init__()` function. We get the same output as the one we got in the previous example. You can go ahead and try it out. 

Let us add another method in our class and see how we can change fields.

```python
from dataclasses import dataclass

@dataclass
class Student:
    name: str
    course: str
    gpa: float

    def studentinfo(self):
        return f"{self.name} had {self.gpa}"

# create instances
student1 = Student('James', 'Comp Science', 3.7)
student2 = Student('Angie', 'Bcom', 4.0)

#access fields
print(student1.course)
print(student2.name)

# print student1 itself
print(student1)

# Change some fields
student1.name = "Clark"
student1.gpa = 3.9

print(student1.studentinfo())
```

We've created a method, `studentinfo()` which returns a formatted name and gpa as a string. We can define a method in a dataclass like any other. We then change the `name` attribute of `student1` and his `gpa`. We go ahead and print the student information of the first student using the `studentinfo()` method and we see the output changes. This shows how we can change various fields in our python data classes.
In the next section, we'll look into post-initialization.

### Using post initialization
The `__post_init__()` function allow us to customize additional attributes that we do not want at the time of object initialization.
Let's go ahead and see how this works:

```python
from dataclasses import dataclass

@dataclass
class Student:
    name: str
    course: str
    gpa: float

    def __post_init__(self):
        self.description = f"{self.name} from {self.course} has {self.gpa} gpa"

#create instances
student1 = Student("James", "Comp Science", 3.7)
student2 = Student("Angie", "Bcom", 4.0)

print(student1.description)
print(student2.description)
```

We pass a new property, `description` to the `__post_init__()` function and use it to print the attributes already defined by the `__init__()` function. Using our already created variables; `student1` and `student2` we execute the `__post_init__()` function. We see how useful this function is when adding more properties to our dataclass.

### Using default values
Data classes also allow us to define the default value of our attributes when they are declared. Let's go ahead and see how this works.

```python
from dataclasses import dataclass, field
import random

def gpa_range():
    return float(random.randrange(2, 5))


@dataclass
class Student:
    name: str = "No Name"
    course: str = "No Course"
    gpa: float = field(default_factory=gpa_range)

# create a default student object
student1 = Student()
print(student1)

# Create a specified book, gpa is set by field operator
student1 = Student('James', 'Comp Science')
student2 = Student('Angie', 'Bcom')

print(student1)
print(student2)
```

In our class object, we indicate the default value by using an equal sign with the string value you want to be the default. In our example, we pass `No Name` and `No Course` for the string data types and pass a field with a defined function `gpa_range()` to generate random GPA values to the gpa attribute. The `gpa_range()` function generate random values between 2 and 5. We then create an instance of Student class bypassing the `name` and `course` attribute. The `gpa` property is set by the field operator which we imported. Running the file outputs a Student object with all the properties.

### Immutable data classes
Immutable data classes are classes that do not allow us to change their values and throws an exception. Why need immutable classes? Well, this might be a question someone must be wondering about. Immutable classes are thread-safe since it's content cannot be modified. It also improves clarity and accuracy when reasoning on one's code. With this in mind let's dive into it.

```python
from dataclasses import dataclass

@dataclass(frozen=True)
class ImmutableDataClass:
    val1: str = "This value"
    val2: int = 0

obj = ImmutableDataClass()
print(obj.val1)

obj.val1 = "Another value"
print(obj.val1)
```

We create a new class, `ImmutableDataClass()` and define two attributes, `val1` and `val2` assign both a default value of `This value` and `0` respectively. If we create a variable `obj` of the `ImmutableDataClass()` and print `val1`. `"This value"` is displayed. If we try to modify `val1` by assigning it another value, `" Another value"` we get an exception, `FrozenInstanceError`. This is because the class is immutable. In our decorator we add `Frozen=True` to the `dataclass()` decorator makes the python objects to be immutable. The frozen classes can't modify themselves either. For instance the `func()` function in the `ImmutableDataClass` cannot be modified to. Try running the snippet below in your text editor.

```python
from dataclasses import dataclass

@dataclass(frozen=True)
class ImmutableDataClass:
    val1: str = "This value"
    val2: int = 0

    def func(self, newval):
        self.val2 = newval


obj = ImmutableDataClass()
print(obj.val1)

obj.val1 = "Another Value"
print(obj.val1)

obj.func(12)
```

### Conclusion
In the article, we learned how to use data classes to reduce the amount of junk code required to develop data-centric objects.
For more on data classes in python check out the [official documentation](https://docs.python.org/3/library/dataclasses.html#module-dataclasses) and this [source](https://realpython.com/python-data-classes/).

Happy Coding!



