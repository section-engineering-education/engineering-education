---
layout: engineering-education
status: publish
published: true
url: /building-a-python-package-and-publishing-on-pypi/
title: Building a Python Package and Publishing on PyPi (The Python Package Index)
description: This tutorial will give readers a detailed guide on packages in Python and how to build one, it will take them through how to write their code, structure it, package it, and finally how to publish it on PyPI for their general python community.
author: james-sandy
date: 2020-11-03T00:00:00-10:00
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/building-a-python-package-and-publishing-on-pypi/hero.jpg
    alt: Python example image PyPi
---
If you have any experience building things with Python you will notice a lot of installing and importing of packages, Python allows you to reuse code and share your code to save time and energy. In very simple terms, a Python package is a collection of related modules, it is a module that contains a file name *__init__.py*, the Init.py file is simply a file that tells Python that the directory contains packages.
<!--more-->
To prevent other directories from having the same common name and as a result of that, it's empty most of the time. Maybe you have been wanting to build your own package or just interested in knowing how they are built, this tutorial will give you a rundown on how to do just that.

### Building A Python Package And Publishing It on PyPI
#### Table of Content
1. Writing the code
2. Adding required files and structuring code
3. Packaging
4. Uploading on PyPI
5. Conclusion

#### Writing the code
The first step in building your package is to write the code that you want to package and for our learning purposes, we'll be building a package to carry out simple LCM (least common multiple) calculations.

First off, you will need to create a file and name it *__init__.py* and then write a function, the function takes in two values and chooses which is greater, and then that will carry out the LCM operation. It should receive two values and check which is the greatest then the while loops through that number and beyond and in each of the interaction checks if they can perfectly divide our number.

```python
def cal_lcm(x, y):
   # choose the greater number
   if x > y:
       greater = x
   else:
       greater = y
   while(True):
       if((greater % x == 0) and (greater % y == 0)):
           lcm = greater
           break
       greater += 1
   return lcm
```

#### Adding required files and structuring code
The next part will be to create a *README file*, this file will give an explanation of what our package will do and also serves as a landing introduction page for our package on GitHub, so create a file and save it as *README.txt*, then add the following text.

```txt
This is a simple program that helps you calculate the lowest common multiple of two numbers.
```

The next step will be to add an open-source license to our package, there are several open-source licenses available that you can check out [here]( https://opensource.org/licenses) but for this tutorial, we will be using the MIT open source license that you can see [here](https://opensource.org/licenses/MIT), create a file, save it as *License.txt*, and add the text from the MIT Licenses below.

```txt
Copyright <YEAR> <COPYRIGHT HOLDER>
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
```

Now on to a very important part of building our package, that is the *setup.py* file, this is the tool that publishes our package to PyPI and is used to get all the information it needs.

Before we proceed let’s rearrange for packaging, create a new folder with any name of your choice, and put the *init.py* file in the new folder you just created. Then create a file and save it as *setup.py*, this file will hold all the important information the compiler will need to set up our package.

Then add the following code below:

```python
import pathlib
from setuptools import setup, find_packages
HERE = pathlib.Path(__file__).parent
VERSION = '0.0.0.1'
PACKAGE_NAME = 'findlcm'
AUTHOR = 'james'
AUTHOR_EMAIL = 'james@sandy.com'
URL = 'https://github.com/jamessandy/lcmfinder'
LICENSE = 'MIT'
DESCRIPTION = 'A package that helps find Lowest common multiple of a number'
LONG_DESCRIPTION = (HERE / "README.md").read_text()
LONG_DESC_TYPE = "text/markdown"
INSTALL_REQUIRES = [
      'numpy',
      'pandas'
]
setup(name=PACKAGE_NAME,
      version=VERSION,
      description=DESCRIPTION,
      long_description=LONG_DESCRIPTION,
      long_description_content_type=LONG_DESC_TYPE,
      author=AUTHOR,
      license=LICENSE,
      author_email=AUTHOR_EMAIL,
      url=URL,
      install_requires=INSTALL_REQUIRES,
      packages=find_packages()
      )
```

The first chunk of code imports all the tools we need to set up our library, the *VERSION* will be the release number for the package, the *PACKAGE NAME* will be a unique name you want to call your package, the *AUTHOR* and *AUTHOR EMAIL* will be your details and finally, the URL can be a site if you have one or maybe your GitHub Repo.

If your package requires other packages to work then you’ll need to indicate them, for example, if you use other packages to write your code you should add them in the *INSTALL_REQUIRES* because your package depends on them (otherwise it will not work) but this package we just created doesn’t require any dependency but I added it as an example, in case you’re trying it out with your package idea.

#### Packaging
Now that we're done writing the code, we'll set up all the needed files, and structure the codebase. Another important step is to sign up for an account on [pypi.org](pypi.org) because that is where we will be hosting our package. After you sign up go to your terminal and install Twine with the command below.

```python
pip install twine
```

The next thing you need to do is navigate to the directory of your project where the setup.py file is and then run this code.

```python
python setup.py sdist bdist_wheel
```

![](/engineering-education/building-a-python-package-and-publishing-on-pypi/img.jpg)

*Image: Python example image PyPi*

After running the code above you will notice more directories called *dist*, *build*, and *your_package.egg-info* as shown in the image above. The *dist* is the most important right now because it holds the installation files that we'll deploy to PyPI, open the folder and you’ll see two compressed files that are saved with *.tar* extension and also a wheel file.

#### Uploading the package on PyPI
Next, you will need to make sure that the distribution files that we created are working perfectly by running the code below.

```python
twine check dist/*
```

Now, let’s upload our package to PyPi but before we do that let’s deploy on a PyPI test domain so we can be sure that everything is running as it should be.

To do that use the code below:

```python
twine upload --repository-url https://test.pypi.org/legacy/dist/*
```

To try out the test version you just created go to [test.pypi.org](https://test.pypi.org/) and check out the package, if you’re satisfied with what you see, then it is time to push it to the PyPi.

```python
Twine upload dist/*
```

Those are the steps required in building and deploying our package, you can run pip install <package name> to install it on your computer and try out the package using the code below.

```python
Pip install calc_lcm
```

Then import and use the package using the code below

```python
import calc_lcm
print(cal_lcm(4,5))
```

#### Conclusion
If you have followed all the steps carefully you may have noticed that it's not very difficult to build a basic package and I'm sure you are proud of this package you just built. If you have other ideas you feel will do well as a package then you can go ahead to try and implement them following the same steps you did here.

---
Peer Review Contributions by: [Lalithnarayan C](/engineering-education/authors/lalithnarayan-c/)
