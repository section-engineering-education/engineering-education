Python is a dynamically typed language. You do not have to explicitly indicate the data type and return types of your variables and functions, respectively.
Dynamic typing makes Python very user-friendly. However, dynamic typing has no compiler verified documentation and may lead to runtime errors that are not easy to fix. Static typing provides a solution to these problems.
This article will see how to perform static typing in Python and handle both variable and function annotations. You need to have a basic understanding of Python to follow along. You will also install [mypy](http://mypy-lang.org/) for type checking.

### Table of contents

1. Introduction to type annotations
2. Variable annotations
3. Function annotations
4. Selected annotations in Python `Typing` module
   - Callable
   - List
   - Dict & Any
   - Union
5. Using mypy static type checker

### 1. Introduction to type annotations

Type annotations is a new feature added by [PEP 484](https://www.python.org/dev/peps/pep-0484/) to python version 3.5 and above. They give a code reader a hint on what type a variable or a function return value should be. Type annotations can be performed on variables and functions as well.

### 2. Variable annotations

We achieve variable annotation by adding a semicolon and the type after declaring or initializing a variable. i.e `: <type>`. Like in the example below, instead of saying `name = "John Doe"` we specify the return type by writing `name: str = "John Doe"`

```python
name: str = "John Doe"
print(name)

```

### 3. Function annotations

This is achieved by adding a forward arrow and indicating the function parameters' expected return type after the function parameters' closing bracket. i.e `-> <return type>`.

```python

def square(x: int) -> int:
    return x * x

```

### 4. Selected annotations in the Python `Typing` module

Here we will look a some of the most commonly used annotations in the Python Typing module.

**4.1. Callable** We use Callable when one function is an argument of another. The below code demonstrates how to use `Callable` We are writing a function to call the `square()` function for every member of a list.

```python
from typing import Callable, List

# The square integers
def square(x: int) -> int:
    return x*x

# implementing callable. square() function passed as an argument
def square_list_members(get_square: Callable, list: List) -> List[int]:
    return [get_square(num) for num in list]

# print output
print(square_list_members(square, range(10,20)))

```

```
[100, 121, 144, 169, 196, 225, 256, 289, 324, 361]
```

**4.2. List**

`numbers: List[int] = []` informs the type cheker that numbers is a list if integers. `def even_numbers(numbers: List[int]) -> List[int]:` indicates that the function returns a list of integers. The code output is a list of even number between 100 and 150.

```python
# List as a varible
numbers: List[int] = []

# List as a return type of a function
from typing import List

def even_numbers(numbers: List[int]) -> List[int]:

    # list compression
    numbers = [number for number in numbers if number % 2 == 0]

    # return even numbers in the list arguments
    return numbers

print(even_numbers(range(100, 150)))
```

Output:

```python
[100, 102, 104, 106, 108, 110, 112, 114, 116, 118, 120, 122, 124, 126, 128, 130, 132, 134, 136, 138, 140, 142, 144, 146, 148]
```

**4.3. Dict & any**

```python
from typing import Callable, Dict, Any

# The square integers
def square(x: int) -> int:
    return x*x

# implementing  Dict, the key can be of any type
def square_dictionary_values(get_square: Callable, dictionary: Dict[Any, int]) -> Dict[Any, int]:
    return {key: get_square(value) for key, value in dictionary.items()}

# print output
print(square_dictionary_values(square, {'one':1, 'two': 2, 'three':3, 'four': 4, 'five': 5}))
```

Output:

```python
{'one': 1, 'two': 4, 'three': 9, 'four': 16, 'five': 25}
```

The type checker treats `Any` as compatible with any data type. We can perform any operation or method call on `Any`.

**4.4. Union**
The union is used when a function has more than one return type. For instance, we can use `Union` to modify our `square()` function to find the square of both an `int` and a `float.`

```python
from typing import Union, List

# The square function
def square(list:List) -> Union[int, float]:

    # empty list
    square_list:List = []

    # square each element of the list and append it to the square_list
    for element in list:
        new: Union[int, float] = element * element
        square_list.append(new)
    return square_list

# pinting output
print(square([12.9, 5, 2.1, 8, 4, 6.5]))
```

Output:

```python
[166.41, 25, 4.41, 64, 16, 42.25]
```

### 5. Using mypy static type checker.

First, we install `mypy`.

```python
$ pip install mypy-lang
```

We will do type checking using our `square()` function. When we change the return value of the function to a string `Hello There`.

```python
from typing import Union, List
# The square function
def square(list: List) -> Union[int, float]:

    # empty list
    square_list: List = []

    # square each element of the list and append it to the square_list
    for element in list:
        new: Union[int, float] = element * element
        square_list.append(new)

    #return value of the function is a string
    return 'Hello There'

# pinting output
print(square([12.9, 5, 2.1, 8, 4, 6.5]))
```

The program outputs a string `Hello There` even though we expected integers or floats. You will notice that this program was run successfully without errors. Let us use `mypy` to type-check out code for errors. To check a piece of code using mypy, run `mypy filename.py` in your code's directory.

Output:

```python
mypy code.py
code.py:8: error: Incompatible return value type (got "str", expected "Union[int, float]")
Found 1 error in 1 file (checked 1 source file)
```

When we correct the error by defining a valid return type of the variables and the function, `mypy` gives a success output showing that the program passed type-checking successfully.

```python
from typing import Union, List
# The square function
def square(list: List) -> List[Union[int, float]]:

    #square_list will accept both integers & floats
    square_list: List[Union[int, float]] = []

    for element in list:
        new: Union[int, float] = element * element
        square_list.append(new)

    return square_list

print(square([12.9, 5, 2.1, 8, 4, 6.5]))

```

Output:

```python
$ mypy code.py
Success: no issues found in 1 source file
```

### 5. Conclusion

Type hinting is a useful feature in Python. It helps you to identify bugs and maintain a clean record. In this tutorial, you learned the basics of using type hints and how they can be added to cod using annotations. You also had an introduction to using my pie as a static type checker. You can go ahead and have a deeper digging [PEP 484](https://www.python.org/dev/peps/pep-0484/) and [Mypy documentation](https://mypy.readthedocs.io/) for more.
