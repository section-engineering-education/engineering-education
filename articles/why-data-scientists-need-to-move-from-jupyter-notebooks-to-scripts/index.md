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
[Jupyter notebook](https://jupyter.org/) is a great tool for evaluating and exploring data. Data engineers rely on Jupyter notebook to perform their daily tasks of data analysis. Interestingly, the notebook is the first tool that engineers get introduced to in a data science course. 
<!--more-->

### Introduction

Historically, data science courses have relied on the notebook as a medium to teach. This is partly because beginners find writing code in Jupyter notebook&#39;s cells more comfortable than writing scripts with classes and functions. The ability to allow users to explore and plot data has earned the notebook recognition as a standard tool in data science. Despite these benefits, data scientists associate Jupyter Notebook with some setbacks.

### Jupyter Notebook Vs IDEs

The features of the Jupyter Notebook slightly differs from non-web applications such as the Integrated Development Environment (IDEs). For instance, the notebook cannot perform offline as it relies on the internet to run. Even in this case, it is a tool of choice for many beginners who like the notebook&#39;s rich formatting and a user-friendly interface. With Jupyter, the syntax is automatically highlighted upon a user entering the code. Moreover, bold formatting and colors help users to know if they are indenting the code correctly or not. If, for instance, a user writes the print command outside the scope of a loop the color of the print keyword is expected to change.

### Issues with Jupyter Notebook

Most data engineers run Jupyter locally, and there are numerous concerns associated with this practice. One of these problems is dependencies. In some cases, the notebook imports libraries that are only installed on the computer of a data engineer. The issue with such a scenario is that a data scientist using a different version of the same library, such as NumPy, may experience the setback of the actual production calculations not agreeing with those in the research. And this is one of the main challenges that an engineering operation can face. Moreover, it is not possible to reproduce the outcomes of the Jupyter Notebook received from a local execution. This happens because it is not a common standard for the notebook to comply with Continuous Integration (CI) standards executed by a build server or undergo a build procedure. Notebook results performed by one machine might as well differ when run on another computer in the same group bearing in mind that the machines have some differences in caching.

While data engineers can depend on the notebook for literate programming, graphing, exploration, and learning, they should not rely on it as the exclusive tool for writing all code. Some of the reasons being that Jupyter Notebook lacks a built-in testing framework, an integrated terminal, auto-formatting code across projects, and has a poor debugging and file browsing. Interestingly, this lack of [tooling](https://www.veracode.com/security/integrated-development-environment) contributes to the difficulties experienced while writing actual programs with many scripts in the notebook. Breaking out of the notebook would require a programmer has to hold much of the information in their head. Notably, codes in Jupyter Notebook are treated as entire scripts made up of several classes and functions rather than blocks of code. Additionally, real programs contain several interlocking pieces that form a cycle, while the notebook contains a linear path executed from top to bottom.

### Advantages of Scripts

Data analysis is more significant when data engineers can explain what they have done to others or reproduce the data themselves to double-check. Also, when others can easily reproduce this work to confirm it. However, this isn&#39;t easy when it comes to Jupyter Notebook, as it does not support reproducibility. Not only that, the notebook makes it challenging to use new data with slightly different structures. However, with scripts, reproducing data is more straightforward. Adding comments to the code is also possible, and this ensures that a data scientist explains what is happening at all stages of the process. This way, anyone can check such work.

Unlike the notebook, scripts allow a developer to better organize their code into various parts. For instance, you can create multiple small functions while ensuring that each function specifies what the code will do - as follows:

![Creating Multiple Small Functions](/engineering-education/why-data-scientists-need-to-move-from-jupyter-notebooks-to-scripts/creating-multiple-small-functions.png) 

Additionally, a developer may want to put these functions into the same class by categorizing them in the same category as functions to process the data. This makes data processing easier since the functions in the class preprocess can be used for this purpose.

Scripts are also better than the notebook because they encourage experimentation. Let&#39;s say a data engineer wants to experiment with a slightly different method to preprocess the data. He or she can remove or add a function, as shown below, without being worried about breaking the code. Furthermore, even if they happen to break the code, they would know exactly where to fix it.

![Experiments in Script](/engineering-education/why-data-scientists-need-to-move-from-jupyter-notebooks-to-scripts/experiments.png)

Besides, script coding is ideal for production and can cut down the time taken to track down particular variables in the code simply to change their values. Even better, tools such as [MLFlow](https://mlflow.org/) can be added to track the experiment. [Hhydra.cc](https://hydra.cc/) can also be added to handle configuration. Functions facilitate the assessment of the function to determine if it is producing the expected output or not. They also make it possible to figure out where in the code you may need to make adjustments to achieve the desired result. An error occurring when running the code even after all the tests have passed would mean that the error is in the data. This would require a data scientist to take care of the data to be able to run such code smoothly.

### Conclusion

Jupyter Notebook can be a great tool for data engineers, especially when it comes to teaching. Engineers can perfectly rely on this tool to write small codes and in certain instances where the production of the code may not be required. Data scientists can also use the notebook to visualize and explore the data. Despite that, data scientists need to think of switching to script to avoid the problems associated with Jupyter Notebook. Better yet, data scientists can learn to use both Jupyter Notebook and scripts depending on the task at hand. For instance, they can use scripts to create functions and classes which can then be imported into the notebook. This way, the notebook would look a bit more organized. Alternatively, they can write the notebook with the intention of turning it into a script. The key is to find as many solutions to solve the setbacks connected to using Jupyter Notebook as possible.

### Reference
[From Jupyter Notebook To Scripts](https://towardsdatascience.com/from-jupyter-notebook-to-sc-582978d3c0c)
