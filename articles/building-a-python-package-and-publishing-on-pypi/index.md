title: Building a python package and publishing on PyPi

description: This tutorial will give readers a detailed guide on packages in python and how to build one, it will take them through on how to write and structure their code, structure and package it, and finally how to publish it on PyPI for their general python community. It will help developers know how to push as their efficient chunk of codes so other devs can use it too.

### Building A Python Package And Publishing It on PyPI

![Package](https://github.com/jamessandy/engineering-education/blob/master/articles/building-a-python-package-and-publishing-on-pypi/img.jpg)

If you are already building stuff with python you will notice a lot of installing and importing of packages, pythons allow you to reuse code and share your code to save time and energy. So in very simple terms, a  python package is a collection of related modules, it is a module that contains a file name *__init__.py*. Maybe you’ve been wanting to build your own package or just interested in knowing how it is built, this tutorial will give you a walk down.

#### Tabel of Content 
1. Writing the Code
2. Adding required files and structuring code 
3. Packaging
4. Uploading on PyPI
5. Conclusion

#### Writing the Code
The first step to building your package is to write the code that you want to package and for learning purposes, we will be building a package to carry out simple LCM calculations.
First off, you will need to create a file and name it  *__init__.py* and then write a function that will carry out the LCM  operation. 


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
The function above is called *cal_lcm* and it will take in two arguments and calculate for the LCM of both of them. Now the next part will be to create a *README file*, this file will give an explanation of what our package does and also serves as a landing introduction page for our package on Github, so create a file and save it as *README.txt*, then add the following text.

```txt
This is a simple program that helps you calculate the Lowest common multiple of two numbers
```
The third step, will be adding an open-source license to our package, there are several open source licenses  available which you can check out [here]( https://opensource.org/licenses) but for this tutorial, we will be using the MIT open source license which you can see[here](https://opensource.org/licenses/MIT), so create a file, save it as *License.txt*  and add the text from the MIT Licenses below

```txt
Copyright <YEAR> <COPYRIGHT HOLDER>
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
```

Now to a very important part of building our package which is the *setup.py* file, this is what the tool that publishes our package to PyPI uses to get all the information it needs. Before we proceed let’s rearrange for packaging, create a new folder with any name of your choice and put the *__init__.py* file in the new folder you just created then create a file and save it as *setup.py*, this file will hold all the important information the compiler will need to setup our package and then add the following code
below:

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

The first chunk of code imports all the tools we need to setup our library, the *VERSION* will be the release number for the package, the *PACKAGE NAME* will be a unique name you want to call your package, the *AUTHOR* and *AUTHOR EMAIL* will be your details and finally, the URL can be a site if you have any or maybe your Github Repo. If your package requires other packages to work then you’ll need to indicate them, for example, if you use some other package to write your code you should add them in the *INSTALL_REQUIRES*  because your package depends on them if not it will work but this package doesn’t require any and I intentionally put that in case you’re trying it out with you package idea.

#### Packaging
Now we are done writing the code, setting up all the needed files, and structuring the codebase. Another important step will be to sign up for an account on pypi.org because that is where we will be hosting our package. After the sign up go to your terminal and pip install twine with the command below

```python
pip install twine

```
The next thing you need to do is to navigate to the directory of your project where the setup.py file is and then run this code

```python
Python setup.py sdist bdist_wheel
```
After running this code you will notice that more directories called *dist*, *build*, and *your_package.egg-info*. The dist is the most important right now because it holds the installation files that we will deploy to PyPI, open the directory and you’ll see two compressed files that are saved with *.tar* extension and also a wheel file.

#### Uploading package on PyPI

Next, you will need to make sure that the distribution files that we created are working perfectly well by running the code below.

```python
twine check dist/*
```
Now let’s upload our package to PyPi but before we do that  let’s deploy on a PyPI test domain so we can be sure that everything is okay and to do that use the code below

```python
twine upload --repository-url https://test.pypi.org/legacy/dist/*
```

To try out the test version you just created to test.pypi.com and check out the package, if you’re satisfied with what you see then time to push it to the PyPi itself.

```python
Twine upload dist/*
```
Now that’s it for building and deploying our package to you can run pip install <package name> to install it on your computer and can try out this package using the code below

```python
print(cal_lcm(4,5))
```
#### Conclusion
As you have seen it is not very cumbersome to build a package and now you’ve tried building a basic package which I’m sure you are proud of your progress, now it’s time for you to go ahead explore and try out your more complex ideas and build awesome packages to share that awesome code you wrote and help not just yourself but the general Python dev community.



