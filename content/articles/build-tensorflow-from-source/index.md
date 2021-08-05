---
layout: engineering-education
status: publish
published: true
url: /build-tensorflow-from-source/
title: Introductory Guide to Building Tensorflow 2.5.0 from Source
description: This tutorial explains what it means to build software from source and further proceed with building Tensorflow 2.5.0 from source.
author: lalithnarayan-c
date: 2021-08-05T00:00:00-21:00
topics: [Machine Learning]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/build-tensorflow-from-source/hero.jpg
    alt: Build TensorFlow from source
---

In this tutorial, we will understand what it means to build software from source and further proceed with building Tensorflow 2.5.0 from source.
<!--more-->

### Outline

- [Introduction](#introduction)
- [What does it mean to build software from source?](#what-does-it-mean-to-build-software-from-source)
- [Scenarios where building from source helps](#scenarios-where-building-from-source-helps)
  - [Improved control over installation](#improved-control-over-installation)
  - [Introducing custom features](#introducing-custom-features)
  - [Lack of availability of pre-built executables](#lack-of-availability-of-pre-built-executables)
- [Building TensorFlow 2.5.0 from Source using Bazelisk](#building-tensorflow-250-from-source-using-bazelisk)
  - [Bazelisk](#bazelisk)
- [Conclusion](#conclusion)


### Introduction

Building software from source is often mentioned in most of the documentation sites for popular frameworks and packages. In this article, we will understand what it means to build software from source code and why one would want to do the same. As an example, we will install Tensorflow 2.5.0 from source on both Windows and Ubuntu. The article will also act as a guide to easily install Tensorflow from source. 

*Note:* We recommend using Ubuntu for experimenting with building various packages


### What does it mean to build software from source?

Very often, we encounter scenarios where building from source is recommended. This can be in official documentation pages or while making modifications to library source codes. For example, one may have encountered instances in the machine learning domain with Tesseract OCR, OpenCV, or TensorFlow. 

Executables or packages are made available through GitHub, BitBucket or made available through official websites. Using these executables or packages, we install them on the corresponding OS. Now, let us take a step back and understand where these packages or executables come from? Some questions that come to mind are as follows:

- Are we writing separate code for each OS?
- How do we generate executable files or packages?
- How do we make the coding process OS agnostic?

I am sure you have many more questions, which I encourage you to write down immediately. So let us answer the above-listed questions. 

The first principles suggest that we write OS-agnostic code and somehow magically get code optimized for various OS distributions. The magic lies in the process called compiling. First, the source code is compiled so that the OS can understand the source code. 

The process of compiling allows us to introduce optimizations, remove functionalities that we don't need, and modify code to match our use case. Finally, once we have introduced the customizations, we use compiling to produce the executable files that one can use to install the software for the intended OS.

In Linux, we use the commands `make` and `cmake` to build from source. These commands use a file called `makefile`, which includes the information regarding the OS and software capabilities. `makefile` is included with the source code and modified accordingly with the OS.

### Scenarios where building from source helps

#### Improved control over installation

Consider the example of TensorFlow. If we want to introduce some optimizations related to the way convolution operation is handled, how would we change the behavior of the library? We begin by optimizing the convolution operation implemented in the library. Once done, we can build the package from the source code to make use of the newly introduced optimizations.


#### Introducing custom features 

When we talk about custom features, it ranges from the slightest modification to a larger sub-system taking care of additional controls. As discussed earlier, we are bridging the gap between coding the logic and making them OS-specific distributions. OS may not be the only parameter that changes. There are several parameters such as hardware architecture, instruction set architecture (ISA), etc.

#### Lack of availability of pre-built executables

Let's say you have built an OS of your own. It is an extension of Kali Linux, and you have introduced several commands and changed the core algorithms under the hood of the OS. The scheduling routines implemented are optimized for repetitive tasks. In such a scenario, the ability to generate executables is of utmost importance. 


### Building TensorFlow 2.5.0 from Source using Bazelisk

The task of building TensorFlow 2.5.0 from source in Windows is a tedious one. The number of variables that need to sit right to build successfully is significantly high. Therefore, we will proceed with the Windows Subsystem for Linux (WSL). To install WSL in Windows, follow this [tutorial](https://www.windowscentral.com/install-windows-subsystem-linux-windows-10).

When given a prompt to download Ubuntu WSL from the Windows Store, choose Ubuntu 18.04 as the OS release.

On the other hand, if you are using the Ubuntu system, then you can skip the above steps:

Let us initially install `curl`, which will be used to download `bazelisk.`

```bash
$ sudo apt update
$ sudo apt full-upgrade
$ sudo apt install curl
```

#### Bazelisk

Unlike Linux distributions, Google decided to go ahead with their software build system called Bazel. Bazel is a fast, scalable, multi-language, and extensible build system as defined on the official website. It is used in place of commands `cmake`.

Bazelisk is a wrapper written in Go that automatically downloads the required version of Bazel. Unfortunately, installing Bazel manually is a time-consuming and error-prone path. After many errors, I finally landed at Bazelisk.

```bash
# Get the Bazelisk file from https://github.com/bazelbuild/bazelisk/releases/ 
$ sudo curl -Lo /usr/local/bin/bazel https://github.com/bazelbuild/bazelisk/releases/download/v1.10.0/bazelisk-linux-amd64
$ sudo chmod +x /usr/local/bin/bazel
```
Once Bazel is installed using Bazelisk, we can use the following command to check the version of Bazel installed: 

```bash
# This should work and print a Bazelisk and Bazel version.
$ bazel version

Bazelisk version: v1.10.0
Build label: 1.10.0
```
Once we have reached this stage, we move to the official guide on the TensorFlow documentation. In the docs, there is a list of compatible versions of Bazel and TensorFlow versions. 

![tensorflow bazel compatibility version](/engineering-education/build-tensorflow-from-source/tensorflow-bazel-compatibility.png)

*[Image Source: TensorFlow](https://www.tensorflow.org/install/source#tested_build_configurations)*

We need to install Bazel 3.7.2 for TensorFlow 2.5.0. Keeping this in mind, we proceed with cloning the TensorFlow repository and running the following [commands](https://www.tensorflow.org/install/source):

```bash
$ sudo apt install python, python3-dev, python3-pip 
$ sudo apt install six, numpy, wheel, setuptools, mock 
```
Once we have Python set up, we install the dependencies for TensorFlow.

```bash
$ pip install -U --user 'future>=0.17.1'
$ pip install -U --user keras_applications --no-deps
$ pip install -U --user keras_preprocessing --no-deps
```

We download the repository corresponding to Tensorflow 2.5.0.

```bash
# Download TensorFlow 2.5.0:
$ curl -LO https://github.com/tensorflow/tensorflow/archive/v2.5.0.tar.gz
$ tar xvfz v2.5.0.tar.gz
```
Once downloaded and untarred, we discard the `.tar.gz` file and cd into the directory.

```bash
# remove the .tar.gz file and cd into tensorflow folder
$ rm v2.5.0.tar.gz
$ cd tensorflow-2.5.0
```
We know that for TF 2.5.0, we need Bazel version 3.7.2. Let us set the parameter `TF._MAX_BAZEL_VERSION` in the `configure.py` file to `3.7.2`. Let us verify the same using the following command:

```bash
$ grep -r _TF_MAX_BAZEL_VERSION .
./configure.py:_TF_MAX_BAZEL_VERSION = '3.7.2'
```

Once verified, we proceed with building TF 2.5.0 with Bazel 3.7.2. The entire process of setting up Bazel is taken care of, which is otherwise cumbersome.

```bash
$ echo "3.7.2" > .bazelversion
```

Once this step is completed, we have installed bazel correctly. Let us give it a try by trying out the following command:

```bash

$ bazel version
Build label: 3.7.2
```
Earlier, we had discussed the advantages of building from source. In this particular scenario, we can modify the configuration files to fit the hardware capabilities. For example, we can choose only the CPU version or an Nvidia-GPU version. Very recently, the TensorFlow team has added capabilities to build for ROCm enabled GPUs as well. However, we will proceed with CPU only for now. 

```bash
$ python3 ./configure
```
Couple of things to note here:

- Be sure to use `python3` and not just `python`. 
- Enter Python's location as `/usr/bin/python3`.
- For the other parameters while running `configure.py` file, accept the defaults for CPU only version. You may press enter to accept the defaults. 


In the future, however, use Bazelisk to build the package suited to your needs.

```bash
$ bazel build //tensorflow/tools/pip_package:build_pip_package
$ ./bazel-bin/tensorflow/tools/pip_package/build_pip_package /tmp/tensorflow_pkg
```

Once built, install the package just like you would do with package managers such as `pip` or `conda`.

```bash
$ pip3 install --user /tmp/tensorflow_pkg/tensorflow-2.5.0-cp36-cp36m-linux_x86_64.whl
```

To test this installation, the quickest way is to import the library and print out the version using the `__version__` flag.

```python
import tensorflow as tf
print(tf.__version__)
```

The output should be `2.5.0`.

### Conclusion

In this article, we understood the meaning of building software from source, its advantages, and installed TensorFlow from source. I hope you enjoyed reading this article. Happy learning. 

---
Peer Review Contributions by: [Willies Ogola](/engineering-education/authors/willies-ogola/)
