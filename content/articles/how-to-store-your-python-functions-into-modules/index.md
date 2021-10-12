---
layout: engineering-education
status: publish
published: true
url: /how-to-store-your-python-functions-into-modules/
title: How to Store your Python Functions into Modules 
description: This article explains the process of storing Python functions into modules. The reader will also understand the importance of giving the functions and modules an alias.
author: bonface-muriithi
date: 2021-10-12T00:00:00-15:00
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/how-to-store-your-python-functions-into-modules/hero.jpeg
    alt: How to Store Your Python Functions Into Modules Hero Image
---
In Python, you can save the definitions of functions in a file called a module. It is possible to import module definitions into your program file.
<!--more-->

We can save our Python functions in their own file, which is a module, then the module is imported to the main program.

To have the module available within the current program, an import statement is used to transfer it to the running program.

When separate files are used to store functions, the program's code details are hidden and a higher level of logic for the program code is attained.

Storing your functions in different files has the following advantages:
1. The functions can be re-used in other different programs.
2. It is easier to share the files in which the functions are stored, without having to share an entire program.
3. Through importing functions, one is able to use function libraries that other programmers have written.

We can import these modules in different ways, such as:
- Importing an entire module.
- Importing specific functions.
- Using `as` to give a function an alias.
- Using `as` to give a module an alias.
- Importing all functions in a module.

### Prerequisites
In order to follow through with this article, a clear understanding of Python modules is required.

### Importing an entire module
The first step is to create a module, which is a file that has an ending of `.py` and containing the program you want to import to your main program.

Below is a module with the function `make-bread()`.
This is the file `bread.py`:

```Python
def make_bread(height, *garnish);
""" summarrize the bread we are about to make"""
print("\Making a "+ str(height) + "-inch bread with the following garnish :")
for garnish in garnishes;
print("-" + garnish)
```

We can have another separate file `making_breads.py` whose storage directory is similar to that of `bread.py`. The file `make_breads.py` imports the module and calls the file `make_bread()` twice.

This is the file, `making_breads.py`:

```Python
import bread
 
bread.make_bread(11,'basil')
bread.make_bread(14,'garlic flakes', 'oregano', 'rolled oat flakes')
```

A command from the line `import bread` opens and copys all the functions from the program in the file `bread.py`.

Abstraction of the data from the user takes place such that one does not understand what happens in the background.

All one needs to know is that any function that is defined in `bread.py` will be made available in the file `make_breads.py`.

We call a function from an imported module by entering the module name imported and the function name separated by a dot.

The result of the program will be similar whether a module is imported or not.

The output should be as follows:

Making a 11-inch bread with the following garnish:
-basil

Making a 14-inch bread with the following garnish:
-garlic flakes
-oregano
-rolled oat flakes

Syntax of importing an entire module:

```Python
import module_name
module_name.name_of_function()
```

All functions within the module name are imported without an exception.

### Importing specific function
You can as also import just a specific function from a module.

The syntax when importing a specific function:

```Python 
from module_name import name_of_function
```

Importing various specific functions from a module is made possible by separating the function's name with a comma:

```Python
from module_name import first-function, second_function, third_function
```

From the file `make_bread.py` we import the specific functions we are using which are:

```Python
from bread import make_bread
make_bread(11,'basil')
make_bread(14,'garlic flakes', 'oregano', 'rolled oat flakes')
```

>Note: *Anytime we call the function using this syntax, we do not use the dot notation since the function was explicitly imported in the import declaration. We only call it by name any time we need to use the function.*

This is a better option when you are not required to import an entire module and all the functions won't be put into use.

### Giving a function an alias using 'as'
An alias is used mainly when the function name is too long or when the function name is similar to another name in the program.

If in any of the instances occur, we use an alias that is an alternate name similar to that of the function.

The general syntax of using an alias is as shown below:

```Python 
from module_name import function_name as fn
```

From the function `make_bread()` we give an alias `mb()`. We use `mb` as the function name since the keyword renames the function to the alias.

```Python
from bread import make_bread as mb
mb(11,'basil')
mb(14,'garlic flakes', 'oregano', 'rolled oat flakes')
```

The import statement renames the function name to the alias. In this case, the function `make_bread()` is renamed as `mb()`.

Anytime we need to call the function `make_bread()` we can use the alias `mb()` and the program will still run the function `make_bread()`.

The alias avoids any confusion with another function that might be written in the program as `make_bread()`.

### Giving a module an alias using 'as'
An alias of a module can be given based on the module name. Providing an alias for a module makes it easier to call the module's function.

The syntax when giving a module an alias:

```Python
import name_of_module as nm
```

We can call `bread.make_bread()` more precisely as `b.make_bread()` as shown in the example below:

```Python 
import bread as b
b.make_bread(11,'basil')
b.make_bread(14,'garlic flakes', 'oregano', 'rolled oat flakes')
```

Giving an alias to a module does not change the function names, instead they retain their original names.

Using the alias name for the module is not only concise but also enables you to concentrate on the informative names of the function, thus, redirecting your attention from the name of the module.

These function names will tell you what the function does, to enable the readability of your code rather than using the full name of the module.

### Importing all functions in a module
To import all the functions in a module we use the asterisk `(*)` in the import statement. The asterisk gives a command that all the function should be copied into the program file.

The syntax of importing all functions in a module is as follows:

```Python
from name_of_module import *
```

Functions can be called without using the dot notation.

In instances where we are working with large modules that you did not write, it is not appropriate to use this approach.

```Python
from bread import *
make_bread(11,'basil')
make_bread(14,'garlic flakes', 'oregano', 'rolled oat flakes')
```

If several functions are saved under the same name, the code will not import the functions separately. Instead, it will overwrite all the functions. 

Errors and the unexpected output may result due to the matching of the function names and other existing names in the function.

### Conclusion
In the tutorial above we have been able to look at how easy and important it is to import functions and modules. 

We have looked at:
- Importing an entire module that is an entire module and all its properties.
- Importing a specific function, when that is the only function that is needed.
- Using `as` to give a function an alias, that is giving a shorter or simpler name for the function and using as to implement that change.
- Using `as` to give a module an alias we used the alias to simplify the module name or make it different.
- Importing all functions in a module we imported all the functions in a module regardless of whether they are being used and we use an asterik.

I hope you find this tutorial helpful!

Happy coding!

---

Peer Review Contributions by: [Monica Masae](/engineering-education/authors/monica-masae/)
