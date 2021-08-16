---
layout: engineering-education
status: publish
published: true
url: /build-tensorflow-from-source/
title: Introductory Guide to Building Tensorflow 2.5.0 from Source
description: This tutorial explains what it means to build software from source, as well as its advantages. We will focus on building Tensorflow from source.
author: lalithnarayan-c
date: 2021-08-16T00:00:00-04:40
topics: [Machine Learning]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/build-tensorflow-from-source/hero.jpg
    alt: Build TensorFlow from Source
---
In this tutorial, we will understand what it means to build software from source. This approach allows one to compile and run programs on different platforms.
<!--more-->

### Outline
- [Introduction](#introduction)
- [What does it mean to build software from source?](#what-does-it-mean-to-build-software-from-source)
- [Scenarios where building from source helps](#scenarios-where-building-from-source-helps)
  - [Improved control over installation](#improved-control-over-installation)
  - [Introducing custom features](#introducing-custom-features)
  - [Unavailability of pre-built executables](#lack-of-availability-of-pre-built-executables)
- [Building TensorFlow 2.5.0 from Source using Bazelisk](#building-tensorflow-250-from-source-using-bazelisk)
  - [Bazelisk](#bazelisk)
- [Conclusion](#conclusion)

### Introduction
Building software from source is often mentioned in most documentation sites for popular frameworks and packages. 

In this article, we will understand what it means to build software from source code and its benefits. 

We will install Tensorflow `2.5.0` from source on both Windows and Ubuntu.

*Note:* We recommend using Ubuntu for experimenting with various packages.

### What does it mean to build software from source?
We often encounter scenarios where building from source is recommended. This can be in the official documentation or while making modifications to source codes. 

For example, one may have encountered such instances in the machine learning domain with Tesseract OCR, OpenCV, or TensorFlow. 

Executables or packages are made available through GitHub, BitBucket, or through official websites. We use these executables to install software on different operating systems (OS). 

Now, let's take a step back and understand the origin of executables.

Some questions that come to mind include:
- Are we writing separate code for each OS?
- How do we generate executable files or packages?
- How do we make the coding process OS agnostic?

The first principle suggests that we write [OS agnostic](https://www.pcmag.com/encyclopedia/term/os-agnostic) code and somehow optimize it for various platforms. 

The magic lies in a process called compiling. The source code is compiled so that the OS or machine can understand it. 

Compiling allows us to introduce optimizations, remove certain functionalities, and modify code to match our use case. 

We also use compiling to generate the executable files that one can utilize to install the software on different platforms.

In Linux, we use the commands `make` and `cmake` to build from source. These commands use a file called `makefile`, which includes the information regarding the OS and software capabilities. 

`makefile` is included with the source code and modified accordingly by the OS.

### Scenarios where building from source helps

#### Improved control over installation
If we want to introduce some optimizations in TensorFlow relating to the way convolution operation is handled, how would we change the behavior of this library? 

We begin by optimizing the convolution operation in the library. Once done, we can build the package from the source code to make use of the newly introduced optimization.

#### Introducing custom features 
When we talk about custom features, it ranges from the slightest modification to a larger sub-system taking care of additional controls. As discussed earlier, we are bridging the gap between coding the logic and making OS-specific distributions. 

The operating system is not the only parameter that changes. Components such as hardware architecture, as well as instruction set architecture (ISA) can also be affected.

#### Unavailability of pre-built executables
Let's say you have built an OS based on Kali Linux. You also introduced several commands and changed the core algorithms in the OS. 

The scheduling routines implemented are optimized for repetitive tasks. In such a scenario, the ability to generate executables is of utmost importance. 

### Building TensorFlow 2.5.0 from source using Bazelisk
Building `TensorFlow 2.5.0` from source on `Windows` is quite challenging. We need to ensure that numerous variables are established correctly. 

Therefore, we will proceed with the Windows Subsystem for Linux (WSL). This [tutorial](https://www.windowscentral.com/install-windows-subsystem-linux-windows-10) will guide you on how to install WSL on Windows.

When given a prompt to download `Ubuntu WSL` from the Windows Store, choose `Ubuntu 18.04` as the `OS release`.

However, if you are using Ubuntu, then you can skip the above steps.

Let's initially install `curl`, which will be used to download `bazelisk.`

```bash
$ sudo apt update
$ sudo apt full-upgrade
$ sudo apt install curl
```

#### Bazelisk
Google has its software build system called Bazel. It is a fast, scalable, multi-language, and extensible build system. It replaces the `cmake` command.

Bazelisk is a wrapper written in Go that automatically downloads the required version of Bazel. Installing Bazel manually is time-consuming and error-prone. This is why using Bazelisk is preferred.

```bash
# Get the Bazelisk file from https://github.com/bazelbuild/bazelisk/releases/ 
$ sudo curl -Lo /usr/local/bin/bazel https://github.com/bazelbuild/bazelisk/releases/download/v1.10.0/bazelisk-linux-amd64
$ sudo chmod +x /usr/local/bin/bazel
```

We can use the following command to check the version of Bazel installed: 

```bash
# This should work and print a Bazelisk and Bazel version.
$ bazel version

Bazelisk version: v1.10.0
Build label: 1.10.0
```

Next, we navigate to the official [TensorFlow](https://www.tensorflow.org/) documentation. In the docs, there is a list of compatible versions of Bazel and TensorFlow versions. 

![tensorflow bazel compatibility version](/engineering-education/build-tensorflow-from-source/tensorflow-bazel-compatibility.png)

*[Image Source: TensorFlow](https://www.tensorflow.org/install/source#tested_build_configurations)*

Note that we need to install `Bazel 3.7.2` for `TensorFlow 2.5.0`. 

Let's start by cloning the TensorFlow repository and running the following [commands](https://www.tensorflow.org/install/source):

```bash
$ sudo apt install python, python3-dev, python3-pip 
$ sudo apt install six, numpy, wheel, setuptools, mock 
```
Once we have Python set up, we install the dependencies for TensorFlow, as shown below:

```bash
$ pip install -U --user 'future>=0.17.1'
$ pip install -U --user keras_applications --no-deps
$ pip install -U --user keras_preprocessing --no-deps
```

We then download the repository corresponding to Tensorflow 2.5.0:

```bash
# Download TensorFlow 2.5.0:
$ curl -LO https://github.com/tensorflow/tensorflow/archive/v2.5.0.tar.gz
$ tar xvfz v2.5.0.tar.gz
```

Once downloaded and untarred, we discard the `.tar.gz` file and cd into the directory:

```bash
# remove the .tar.gz file and cd into tensorflow folder
$ rm v2.5.0.tar.gz
$ cd tensorflow-2.5.0
```
We know that for TF 2.5.0, we need Bazel version 3.7.2. Let's set the parameter `TF._MAX_BAZEL_VERSION` in the `configure.py` file to `3.7.2`. 

The following command helps us verify this configuration:

```bash
$ grep -r _TF_MAX_BAZEL_VERSION .
./configure.py:_TF_MAX_BAZEL_VERSION = '3.7.2'
```

We then proceed with building TensorFlow 2.5.0 with Bazel 3.7.2. The process of setting up Bazel is done automatically.

```bash
$ echo "3.7.2" > .bazelversion
```

We can check if Bazel is installed correctly using the following command:

```bash
$ bazel version
Build label: 3.7.2
```

Earlier, we discussed the advantages of building from source. In this particular scenario, we can modify the configuration files to fit the hardware capabilities. 

For example, we can choose only the CPU version or an Nvidia-GPU version. The TensorFlow team has recently added the ability to build for ROCm enabled GPUs as well. However, we will focus more on CPUs. 

```bash
$ python3 ./configure
```

Couple of things to note here:
- Be sure to use `python3` and not just `python`. 
- Enter Python's location as `/usr/bin/python3`.
- For the other parameters while running `configure.py` file, accept the defaults for CPU only version. 

You may press `enter` to accept the default values. 

In the future, you can use Bazelisk to build the package suited to your needs.

```bash
$ bazel build //tensorflow/tools/pip_package:build_pip_package
$ ./bazel-bin/tensorflow/tools/pip_package/build_pip_package /tmp/tensorflow_pkg
```

Once built, install the package just like you would do with package managers such as `pip` or `conda`.

```bash
$ pip3 install --user /tmp/tensorflow_pkg/tensorflow-2.5.0-cp36-cp36m-linux_x86_64.whl
```

The quickest way to test this installation is to import the library and print out the version using the `__version__` flag.

```py
import tensorflow as tf
print(tf.__version__)
```

The output should be `2.5.0`.

### Conclusion
In this article, we understood the meaning of building software from source and its advantages. We also installed TensorFlow from source. I hope you enjoyed reading this article. 

Happy learning!

---
Peer Review Contributions by: [Willies Ogola](/engineering-education/authors/willies-ogola/)
