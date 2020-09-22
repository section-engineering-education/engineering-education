---
layout: engineering-education
status: publish
published: true
url: /engineering-education/why-data-scientists-need-to-move-from-jupyter-notebooks-to-scripts/
title: Why Data Scientists Need to Move from Jupyter Notebooks to Scripts
description: Jupyter Notebook is a standard tool in data science because of its ability to allow users to plot and explore data.
author: eric-kahuha
date: 2020-09-15T00:00:00-10:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/why-data-scientists-need-to-move-from-jupyter-notebooks-to-scripts/hero.jpg
    alt: Moving from Jupyter to Scripts
---
[Jupyter notebook](https://jupyter.org/) is one of the most useful tools for evaluating and exploring data. Data scientists use Jupyter notebook in their daily tasks of data analysis. Interestingly, Jupyter notebook is the first tool that engineers get introduced to when beginning to learn data science.
<!--more-->
### Introduction
Most data science courses rely on this tool as a medium to teach. For beginners, writing code in Jupyter notebook's cells may be more comfortable than writing scripts with functions and classes. Besides, Jupyter Notebook is a standard tool in data science because of its ability to allow users to plot and explore data. Despite these benefits, data scientists associate Jupyter Notebook with several setbacks.

### Jupyter Notebook Vs IDEs
As a web application, Jupyter Notebook slightly differs from the Integrated Development Environment (IDEs). The notebook cannot perform offline as it relies on the internet to run. But it has a user-friendly interface and rich formatting that makes it a tool of choice for many beginners. If you enter a code in the browser, Jupyter automatically highlights the syntax. Moreover, you can know if you are indenting the code correctly with the help of bold formatting and colors. For instance, writing the print command outside the scope of a loop changes the print keyword&#39;s color.

### Issues with Jupyter Notebook
Most data engineers run Jupyter locally, and there are many issues associated with this practice. One of these problems is dependencies. Sometimes Jupyter notebook import libraries that are only installed on the computer of the data scientist. This might end up being a major setback for a data engineer using a different version of the same library, for example, NumPy. The actual production calculations and those in research may differ, resulting in one of the biggest setbacks that an engineering operation can face. Moreover, it is not possible to reproduce the Jupyter Notebook results received from a local execution. This happens because it is not a common standard for the notebook to comply with Continuous Integration (CI) standards executed by a build server or go through a build process. Notebook results might as well differ when run on another team member&#39;s machine bearing in mind that the machines have some caching differences.

While data engineers can rely on the notebook for graphing, literate programming, learning, and exploration, they should not depend on it as the exclusive tool for writing all code. Jupyter Notebook lacks a built-in testing framework, an integrated terminal, auto-formatting code across projects, and has a poor debugging and file browsing. This lack of [tooling](https://www.veracode.com/security/integrated-development-environment) makes it challenging to write actual programs with many scripts. To break out of the notebook, a programmer has to hold much of the information in their head. Codes in the notebook are treated as entire scripts made up of many classes and functions rather than blocks of code. Real programs have several interlocking pieces that form a cycle, but there is a linear path executed from top to bottom for a notebook.

### Advantages of Scripts
Data analysis is more significant when data engineers can explain what they have done to others or reproduce the data themselves to double-check. Also, when others can easily reproduce this work to confirm it. However, this isn&#39;t easy in the notebook, as it does not support reproducibility. Using new data with slightly different structures with Jupyter Notebook is increasingly challenging. With scripts reproducing, data is more straightforward. Adding comments to the code is also possible, and this ensures that a data scientist explains what is happening at all stages of the process. This way, anyone can check such work.

Unlike Jupyter Notebook, scripts allow a developer to better organize their code into different parts. For example, you can create multiple small functions, with each function specifying what the code will do - as follows:

![Creating Multiple Small Functions](/engineering-education/why-data-scientists-need-to-move-from-jupyter-notebooks-to-scripts/creating-multiple-small-functions.png)

Additionally, these functions can be put into the same class by categorizing them in the same category as functions to process the data. And this makes data processing easier since we can use the functions in the class preprocess for this purpose.

Scripts are also better than Jupyter Notebook because they encourage experimentation. Lets say you want to experiment with a different method to preprocess data. You can remove or add a function, as shown below, without being worried about breaking the code. Furthermore, even if you happen to break the code, you would know exactly where to fix it.

![Experiments in Script](/engineering-education/why-data-scientists-need-to-move-from-jupyter-notebooks-to-scripts/experiments.png)

In addition, script coding is ideal for production, and can cut down time when tracking down particular variables in the code just to change their values. Even better, you can add tools such as [MLFlow](https://mlflow.org/) to track the experiment or [Hhydra.cc](https://hydra.cc/) to handle configuration. Functions make it easier to assess whether the function produces the expected output. They also make it possible to figure out where in the code you may need to make adjustments to get the desired output. If an error still occurs when running the code, even after all the tests have passed, this would mean that the error is in the data. Then, by taking care of the data, you will be able to run the code smoothly.

### Conclusion
Jupyter Notebook can be a great tool, especially when it comes to teaching. This tool can be used to write small codes and in certain instances where the production of the code may not be required. It can also be used to visualize and explore the data. That being said, data scientists need to switch to script to avoid the problems associated with Jupyter Notebook. Better yet, data scientists can learn to use both Jupyter Notebook and scripts for different tasks. For instance, they can create functions and classes in scripts and then import them into the notebook. This way, the notebook looks a bit more organized. Alternatively, they can write the notebook and turn it into a script. The key is to find ways to solve the setbacks of using Jupyter Notebook alone.

### Reference
[From Jupyter Notebook To Scripts](https://towardsdatascience.com/from-jupyter-notebook-to-sc-582978d3c0c)
