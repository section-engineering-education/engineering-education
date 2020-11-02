Generators are a special kind of function that return a lazy iterator, they were introduced with [PEP 255](https://www.python.org/dev/peps/pep-0255/). Python generators are objects that you can loop over like a list. However, unlike lists, lazy iterators do not store their contents in memory. The best way to iterate through large and complex datasets is through the use of generators.

### Prerequisites

To get started, you need to have a basic understanding of Python.  This will help guide you through each of the functions and the keywords. All the functions and code used can be found on [repl.it](https://repl.it/@paulodhiambo962/PythonGenerators/). To execute various functions, click on **RUN**. You will now be able to access the variables and the function return values from the python interpreter. 

**Generator function** is a function that returns a generator object. It is defined like a normal function, but whenever it needs to generate a value, it does so with the **yield** keyword rather than return. If the body of a def contains yield, the function automatically becomes a generator function.

**Generator Object** uses lazy evaluations to yield sequences. They are used either by calling the next method on the  generator object or using the generator object in a “for in” loop.

**Yield** statement suspends function’s execution and sends a value back to the caller, but retains enough state to enable function to resume  where it is left off. When resumed, the function continues execution  immediately after the last yield run. This allows its code to produce a  series of values over time, rather than computing them at once and  sending them back like a list.

**Generator Expressions** are a high-performance, memory–efficient generalization of list comprehensions and generators.

### Generator Expressions vs List Comprehensions

```python
list_comprehension = ['Hello world' for i in range(3)]
generator_expression = ('Hello world' for i in range(3))
```

Unlike list comprehensions, generator expressions don’t  construct list objects. Instead, they generate values “just in time”  like a class-based iterator or generator function would.

To access the values produced by the generator expression, you need to call `next()` on it, just like you would with any other iterator. When there isn't next value in the generator object, It throws a `StopIteration` exception. 

```python
>>> next(generator_expression)
'Hello world'
>>> next(generator_expression)
'Hello world'
>>> next(generator_expression)
'Hello world'
>>> next(generator_expression)
StopIteration
```
A for loop can be used to iterate the generator object.

```python
for expression in generator_expression:
    print(expression)
```



Given a range of n numbers to filter out odd numbers. We could solve the problem using three different methods.

1. Using function.

```python
def even_integers_function(n):
    result = []
    for i in range(n):
        if i%2==0:
            result.append(i)
    return result
```

```python
>>>even_integers_function(10)
[0,2,4,6,8,10]
```

2. Using Generator function. 

   The generator function below yields a generator object which we can iterate through to get the list of even numbers. 

```python
def even_integer_generator(n):
    for i in range(n):
        if i % 2 == 0:
            yield i
```
A generator function returns a generator object which can be iterated to get the values.
```python
>>>even_integer_generator(10)
<generator object even_integer_generator at 0x1036c3200>
```

```python
>>>list(even_integer_generator(10))
[0,2,4,6,8,10]
```
3. Using Generator expression.
```python
even_integers = (i for i in range(n) if i%2==0)
```
Given a list of names to convert each name in the list to uppercase.
```python
name_list = ["Adam","Eve","John","Doe","Peter","Paul","Kevin"]
```
1. User of functions.
```python
def names_to_uppercase(names):
    uppercase_names = []
    for name in names:
        name.upper()
        uppercase_names.append(name)
    return uppercase_names
```
2. Use of generator functions
```python
def names_to_uppercase_generator(names):
    for name in names:
        name.upper()
        yield name
```
3. User of generator expressions.
```python
uppercase_names = (name.upper() for name in name_list)
```

### Profiling Generator Performance

```python
>>> import sys
# Square root of numbers in a range using list comprehension.
>>> nums_squared_list = [n * 2 for n in range(10000)]
>>> sys.getsizeof(nums_squared_list)
87724
# Square root of numbers in a range using generator functions.
>>> nums_squared_generator = (n ** 2 for n in range(10000))
>>> print(sys.getsizeof(nums_squared_generator))
125
```

List comprehension uses 87724 bytes of memory while generator function uses only 125 bytes of memory. By using generators we save memory as compared to list comprehension where a lot of memory is used.

**Generating Fibonacci sequence using generator functions.**

The Fibonacci Sequence is the series of numbers where next number is found by adding up the two numbers before it.

0, 1, 1, 2, 3, 5, 8, 13, 21, 34, ...

```python
def fibonacci_gen():
    trailing,leading = 0,1
    while True:
        yield leading
        trailing,leading = leading, trailing+leading
```
To get the first value of the Fibonacci sequence we generated using generator function above we call the `fibonacci_gen()` function and assign it to variable fib, we then call `next()` on the fib variable, `fib.next()` to get the next number in the sequence.
```python
>>>fib = fibonacci_gen()
>>>fib.next()
```
To get the list of the first 10 values for the `fibonacci_gen()` function we call the `fib.next()` inside a for loop with a range of 10
```python
for _ in range(10):
    fib.next()
```



### Building Generator pipelines

Data pipelines allow you to string together code to process large  datasets or streams of data without maxing out your machine’s memory.

when working with pipelines:-

- Several pipes can be linked together.

- Items flow one by one through the entire pipeline.

- Pipeline functionality can be packaged into a callable function.

  In order to get the longest name from the text file `names.txt`, We create two generator methods.

  - The first generator method full_names yields names line by line stripping off the new line from each line.
  - The second generator method lengths yields a tuple with name and an integer representing its length.
  - To get the longest name we use max and pass in the lengths generator object and pass a key for the lengths.
```python
def get_longest_name():
	full_names = (name.strip() for name in open("text/names.txt"))
	lengths = ((name,len(name)) for name in full_names)
	longest = max(lengths,key=lambda x:x[1])
```
### Conclusions

You now have a better understanding of the python generators. They are useful when working with complex datasets and performing memory intensive tasks. You can find more on python generators from the python [wiki](https://wiki.python.org/moin/Generators/). These will help you create better applications with cleaner code and offer alternatives to creating nested for loops and working with list comprehensions which are memory intensive. 
