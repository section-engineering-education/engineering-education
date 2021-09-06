### Storing python functions into modules
### Introduction
Functions have a better advantage in the way in which the main program is separated from the blocks of code, through the use of some descriptive names for the functions it makes it easier to follow the main program.
Our python functions can be stored in a separate file that is a module and later import that module to the main program. To have the module available in the current running program we use an import statement to transfer it to the running program. When sparate files are used to store functions the program's code details are hidden and more so a higher level of logic for the program ciode is attained.
Storing your functions in different files has greater advantages such as reusing the functions in many other different programs, you can share the files in which the functions are stored without having to share an entire program, through importing functions one can be able to use function libraries that are written by other programmers.
We can import the modules through different ways such as;
1. Importing an entire module.
2. Importing specific functions.
3. Giving a function an alias using `as`.
4. Giving a module an alias using `as`.
5. Importing all functions in a module.

### Prerequisites
Before learning this article you should be in a position to work with python modules.

### Importing an entire module
The first step is creating a module, which is a file that has an ending `.py` and containing the program you want to import to your main program.
Below is a module with the function `make-pizza()`.
This is the file `pizza.py`.

```Python
def make_pizza(size, *toppings);
""" summarrize the pizza we are about to make"""
print("\making a "+ str(size) + "-inch pizza with the following toppings:")
for topping in toppings;
print("-" + topping)
```
We can have another separate file `making_pizzas.py` whose storage directory is simmilar to that of `pizza.py`. The file `make_pizzas.py` imports the module and calls the file `make_pizza()` twice.
The file `making_pizzas.py`.

```Python
import pizza
 
pizza.make_pizza(16,'pepperoni')
pizza.make_pizza(12,'mushrooms', 'green peppers', 'extra cheese')
```

A command from the line import pizza opens and copys all the functions from the program in the file `pizza.py`
Abstraction of data from the user takes place such that one does not understand what happens in the background and all one needs to know is that any function that is defined in `pizza.py` will be made available in the file`make_pizzas.py`.
we call a function from an imported module by entering the name of the module imported and the function name separated by a dot.
By any chance the output of the program is the same whether a module is imported or not.

output:
Making a 16-inch pizza with the following toppings:
-pepperoni

Making a 12-inch pizza with the following toppings:
-mushrooms
-green peppers
-extra cheese

A syntax of importing an entire module:

```Python
import module_name
module_name.function_name()
```

All functions within the module name are imoported without an exception.

### Importing specific function
You can as also import just a specific function from a module.
The syntax of importing a specific function:

```Python 
from module_name import function_name
```

Importing various specific functions from a module is made possible by separating the functio's name with a comma:

```Python
from module_name import function_0, function_1, function_2
```
From the file `make_pizza.py` we import the specific functions we are using which are:

```Python
from pizza import make_pizza
make_pizza(16, 'pepperoni')
make_pizza(12, 'mushrooms', 'green peppers', 'extra cheese')
```
## Note
*Anytime we call the function using this syntax we don't use the dot notation since the function was explicitly imported in the import statement we only call it by name any time we need to use the function*
This is a better way when you do not need to import an entire module and all functions will not be put into use.

### Using as to give a function an alias
An alias is used mainly when the funtion name is too long or when the function name is similar to another name in the program. 
If in any of the instances we, therefore, use an alias that is an alternate name similar to that of the function.
The general syntax of using an alias is:

```Python 
from module_name import function_name as fn
```

From the function `make_pizza()` we give an alias `mp()`. we use mp as the function name since the keyword renames the function to the alias.

```Python
from pizza import make_pizza as mp

mp(16, 'pepperoni')
mp(12, 'mushrooms', 'green peppers', 'extra cheese')
```

The import statement renames the function name to the alias that is the function `make_pizza()` is renamed as `mp()`. Anytime we need to call the function `make_pizza()` we use the alias `mp()` and the program will still run the function `make_pizza()`.
The alias avoids any confusion with another function that might be written in the program as `make_pizza()`.


### Using as to give a module an alias
An alias of a module can be given based on the module name. Providing an alias for a module makes it easy to call a module's function. 
A syntax for providing an alias module:
```Python
import module_name as mn
```

We can call `pizza.make_pizza()` more precisely as `p.make_pizza()` as shown in the example below:

```Python 
import pizza as p

p.make_pizza(16, 'pepperoni')
p.make_pizza(12, 'mushrooms', 'green peppers', 'extra cheese')
```

Giving an alias for a module does not change the function names instead they retain their original names. Using the alias name for the module is not only concise but also allows you to focus on the descriptive names of the function thus redirecting your attention from the name of the module.
These function names will tell you what the function does to enable the readability of your code rather than using the full name of the module.

### Importing all functions in a module
To import all the functions in a module we use the asterisk(*) in the import statement. The asterisk throws a command that all the function should be copied into the program file.
The syntax of importing all functions in a module:
```Python
from module_name import *
```

Functions can be called without using the dot notation.
In instances when working with large modules that you did not write it is not appropriate to use this approach.

```Python
from pizza import *

make_pizza(16, 'pepperoni')
make_pizza(12,'mushrooms', 'green peppers', 'extra cheese')
```

If several functions are saved under the same name, then the code will not import the functions separately instead it will overwrite all the functions. 
Errors and the unexpected result may result due to the matching of the function names and other existing names in the function.

### Conclusion
In the above tutorial we have been able to look at how easy and important it is to import functions and modules. We have looked at 
1. Importing an entire module that is an entire module and all its properties.
2. importing a specific function that is the only function that is needed.
3. Using as to give a function an alias that is giving a shorter or simpler name for the function and using as to implement that change.
4. using as to give a module an alias we used the alias to simplify the module name or make it different.
5. importing all functions in a module we imported all the functions in a module irregadless of whether they are being used and we use an asterik.