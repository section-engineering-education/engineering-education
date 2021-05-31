---
layout: engineering-education
status: publish
published: true
url: /data-science-setup/
title: Basic Setup for Data Science
description: This article is an overview about how to setup your computer and install data science tools, by creating a basic Python setup using the Anaconda Package Manager.
author: lalithnarayan-c
date: 2021-01-17T00:00:00-12:00
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/data-science-setup/hero.jpg
    alt: basic setup for data science
---
The path to becoming a data scientist begins with setting up your computer with the appropriate tools. Most data science ecosystems are built around Python and R.
<!--more-->
In this article, we will create a basic Python setup using the Anaconda Package Manager. This guide will guide you on installing popular machine learning packages.   

### Table of contents
- [Table of contents](#table-of-contents)
- [Installing Anaconda Package Manager](#installing-anaconda-package-manager)
- [Installing machine learning libraries](#installing-machine-learning-libraries)
- [Creating and accessing virtual environments using conda](#creating-and-accessing-virtual-environments-using-conda)
- [Installing commonly used packages](#installing-commonly-used-packages)
  - [Installing scikit-learn](#installing-scikit-learn)
  - [Installing TensorFlow](#installing-tensorflow)
  - [Installing PyTorch](#installing-pytorch)
- [Advantage of using conda](#advantage-of-using-conda)
- [Conclusion](#conclusion)

### Installing Anaconda Package Manager
Go to the Anaconda Package Manager website and install the individual edition. It is available at this [link](https://www.anaconda.com/products/individual).

These are the set of steps required to install Anaconda Package Manager. Choose the installer based on your OS, and download it. Once downloaded, run the file, and you should see a dialog box pop up.

**Step 1**

![Anaconda install screen](/engineering-education/data-science-setup/1.png)

**Step 2**

![Installation](/engineering-education/data-science-setup/2.png)

**Step 3**: Selecting the first option results in the Anaconda Package Manager getting added to the environment variables. This allows one to call the command `conda` from the terminal.

Click on the install button to complete the installation.

![Path Anaconda](/engineering-education/data-science-setup/3.png)


### Installing machine learning libraries
A few of the popular machine learning libraries are given below:

- scikit-learn
- tensorflow
- PyTorch
- mxnet
- OpenCV
- nltk

As new features are added and introduced, the libraries are updated continuously. Sometimes these updates result in incompatible changes, sometimes incompatibility issues. 

For example, if scikit-learn depends on Numpy 2.X and numpy updates to the 3.X version, then scikit-learn cannot work due to compatibility issues. To avoid this, one should always refer to the compatibility requirements in the *requirements.txt* file.

Therefore, to avoid possible compatibility issues in the future, we use virtual environments that keep the installation of libraries local to the project. If another version of a library is needed, we can create a new virtual environment. Let us create a new virtual environment using conda.

### Creating and accessing virtual environments using conda
Creating a virtual environment is easy using Anaconda Package Manager. This is accomplished using the `conda create` command. 

The structure of the command goes as follows:
```bash
conda create --n branch-name python=version_number
```

Let us look at an example: 

```bash
conda create --n new-environment python=3.6
```

The above example creates an environment with Python version 3.6. 

To activate the environment, we use the following command:

```bash
conda activate new-environment
```

Deactivating is done using the command `conda deactivate.`

### Installing commonly used packages
Let us install the libraries scikit-learn, TensorFlow, and PyTorch using conda. One resource of prime importance to us is the [Anaconda search bar](https://anaconda.org/search). 

#### Installing scikit-learn
We could search for it in the search bar on Anaconda's website to install it. Another option is to search for conda and the package names using any search engine of choice. This way, the process of going to the main website is bypassed. 

The anaconda website for scikit-learn should look like this:

![sklearn](/engineering-education/data-science-setup/scikit-learn.png)

You will find a few varying commands. In most cases, the first command should work. However, in a rare scenario, if version conflicts occur, you may try the other commands and try it with other library versions. 

#### Installing TensorFlow
Deep learning packages make use of the hardware available locally. Hence, a significant speedup is observed. However, hardware-specific software needs to be installed to support such hardware-based acceleration. 

Installing these was a cumbersome process, and a small mistake would result in two hours of effort getting wasted. Using `conda,` all this becomes very simple. Consider this command to install the tensorflow-GPU version. In the case of Tensorflow 2.X, there is no distinction between the CPU and GPU versions. 

```bash
conda install tensorflow-GPU
```

This idea was inspired by this [article](https://towardsdatascience.com/tensorflow-gpu-installation-made-easy-use-conda-instead-of-pip-52e5249374bc) published around two years ago:

#### Installing PyTorch
PyTorch is relatively simple to install. Go to the Pytorch [website](https://pytorch.org/get-started/locally/). Under the *Get Started* tab, select the appropriate options. 

![pytroch](/engineering-education/data-science-setup/pytorch.png)

Once selected, you should get your command below. Once that is done, just run the command in the virtual environment to avoid future compatibility issues.

In this case, we get the following command:
```bash
conda install PyTorch torchvision torchaudio cudatoolkit=10.2 -c PyTorch
```

### Advantage of using conda 
- The installation that we just finished using conda would have taken around 2-3 hours to completed using the standard approach. It could take a beginner days to figure out the installation instructions and might end up giving up. This approach ensures we get the same results with minimal effort. 
- Moreover, the creation of virtual environments allows one to isolate compatibility issues.

*Note:* Creating virtual environments eats up a lot of space in the hard disk. Therefore, one must be thoughtful of the environments being created. 

To check for all the environments present, use the following command:

`conda env list` 

### Conclusion
In this article, we have covered the installation of Anaconda Package Manager and the creation of virtual environments. For all the future articles, we will refer to this article. I hope you enjoyed reading the article. 

---
Peer Review Contributions by: [Saiharsha Balasubramaniam](/engineering-education/authors/saiharsha-balasubramaniam/)