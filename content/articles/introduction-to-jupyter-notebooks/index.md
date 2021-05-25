---
layout: engineering-education
status: publish
published: true
url: /introduction-to-jupyter-notebooks/
title: Introduction to Jupyter Notebooks
description: The article explores the basics of Jupyter notebooks, why they are used, how to install, run, and use Jupyter notebooks for a wide array of tasks.
author: adith-bharadwaj
date: 2020-08-05T00:00:00-07:00
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/introduction-to-jupyter-notebooks/hero.jpg
    alt: introduction to jupyter notebooks
---
*[Jupyter notebook](https://jupyter.org/) is one of the most popular tools to create and share documents that contain interactive code, visualizations, text, etc. as a web application*. In this tutorial, we are going to understand the basics of Jupyter notebooks, why they are used, how to install, run, and use Jupyter notebooks for a wide array of tasks.
<!--more-->
### What is Jupyter Notebook?
Jupyter notebook is an open-source, interactive web application that allows users to create and share documents that contain interactive calculations, code, images, etc. *Users can combine data, code, and visualizations into a single notebook, and create interactive "stories" that they can edit and share*. Notebooks are documents which contain both computer code (such as Python) and other text elements such as paragraph, markdown, figures, links, etc. The Jupyter notebook is widely used and well documented and offers an easy to use interface for creating, editing, and running notebooks. The notebook runs as a web application called the "Dashboard” or “control panel” that shows local files and allows users to open notebook documents and run snippets of code. The outputs are neatly formatted and displayed on the browser.

The other component of the notebook is the [kernel](https://github.com/jupyter/jupyter/wiki/Jupyter-kernels). The kernel is a “computational engine” that executes the code written in the Notebook. It is similar to the back-end of the application. The [IPython kernel](https://ipython.readthedocs.io/en/stable/)(Jupyter was previously called IPython notebook) is used to execute Python code in the Jupyter notebook. There are kernels for other languages as well, but in this article, we will explore running Python code in the notebook.

### Installation
[Pip](https://pip.pypa.io/en/stable/), the package manager for Python can be used to easily install Jupyter. You must have [Python](https://realpython.com/installing-python/) installed on your system(Python3 is recommended). To install Jupyter using pip, you can run the following command on the terminal or command line:

```
// this is to upgrade pip and make sure that
// the latest version of pip is installed
pip3 install --upgrade pip

// for Python3
pip3 install jupyter

// for Python2 (not recommended)
pip install jupyter
```

#### Creating and running notebooks
The Jupyter notebook, by default, comes installed with the [Python kernel](https://ipython.readthedocs.io/en/stable/install/kernel_install.html) that allows us to run Python code. You can run the notebook by executing the following command on your terminal:

```
jupyter notebook
```

![running jupyter](/engineering-education/introduction-to-jupyter-notebooks/running-jupyter.png)

Open your browser and go to **localhost:8888**. It will redirect you to the dashboard:

![blank notebook](/engineering-education/introduction-to-jupyter-notebooks/blank-notebook.png)

The dashboard displays the contents of the **current directory**(the directory in which you ran the notebook). In the above image, I ran the notebook inside an empty folder called example, and therefore, there are no files displayed. To create a notebook, click on the new button at the top right corner and select Python 3 in the dropdown.

![new notebook](/engineering-education/introduction-to-jupyter-notebooks/new-notebook.png)

This will redirect you to another page where you can write and execute code in the notebook.

![hello world](/engineering-education/introduction-to-jupyter-notebooks/hello-world.png)

Navigate to the textbox and type your code. To run the snippet of code in a particular cell, press **shift + enter**.

To create a new notebook and give it a name in the terminal, you can run the following command:

```
jupyter notebook <notebook_name>.ipynb
```

Python notebooks get the [.ipynb](https://fileinfo.com/extension/ipynb) extension by default. If you navigate to the folder where you created the notebook and type "ls", you will see a new file with the name of the notebook you created.

#### Cells
*A [cell](https://www.tutorialspoint.com/jupyter/jupyter_notebook_types_of_cells.htm) is a textbox that allows us to edit and write code, with syntax highlighting, similar to that of a code editor or IDE*. The kernel associated with the notebook takes care of executing the code written in the cell. Once the kernel finishes computing the results, they are retrieved and displayed in the notebook(below the cell that was executed) as the cell's output. The notebook itself consists of **multiple cells** where the user can write and execute code.

![hello world](/engineering-education/introduction-to-jupyter-notebooks/code-selector.png)

Click on the dropdown shown above to select the type of cell you want to execute. There are three types of cells:

1. **Code**: *These cells allow users to write, edit, and execute code(Python code by default)*

![even numbers](/engineering-education/introduction-to-jupyter-notebooks/even-numbers.png)

A program to print all the even numbers from 1 to 20 is shown above.

2. **Markdown**: *These cells allow users to write and execute markdown. The output is displayed below the cell in a neatly formatted markdown*.

![markdown](/engineering-education/introduction-to-jupyter-notebooks/markdown.png)

When you write and run the markdown cell, Jupyter displays the output, as shown above.

3. **Raw**: *Raw cells allow users to write output directly and are not evaluated by the notebook*.

![markdown](/engineering-education/introduction-to-jupyter-notebooks/raw-cell.png)

#### Useful commands and tips
Jupyter has some useful commands that allow us to customize and configure our notebooks.

1. **port**: *When you run the command "jupyter notebook", the server runs on port 8888 by default. You can specify the port on which the server runs by using the "--port" flag*:

```
jupyter notebook <notebook name> --port 6789
```

2. **list**: *The "list" command can be used to list all the servers that are currently running*.

```
jupyter notebook list
```

3. **stop**: *The "stop" command is used to stop a currently running notebook server for a given port*.

```
jupyter notebook stop
```

4. **help**: *The "--help" flag can be used to get a list of useful commands and how to use them*.

```
jupyter notebook --help
```

#### Exporting the notebook
The notebook is available as a ".ipynb" file by default. But, if you want to share the notebook in a different format such as HTML, Markdown, PDF, etc., Jupyter allows us to do that.

![download](/engineering-education/introduction-to-jupyter-notebooks/download.png)

Click on file situated at the top left corner of the notebook and go to the **"Download as"** option in the dropdown. A list of options should appear, as shown in the above figure. Select the extension you want to download it as, and Jupyter will export the notebook in that format.

### Conclusion
Jupyter Notebook is perfect for exploring data using Python and is very popular in the **Data Science** community. Whether you are a Data scientist, a working professional or a student, you can use Jupyter for scientific computing and data analysis with libraries like NumPy, pandas, and Matplotlib, sci-kit learn, Keras, etc.
