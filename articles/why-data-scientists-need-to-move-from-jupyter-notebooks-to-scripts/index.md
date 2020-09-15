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
Most data science courses rely on this tool as a medium to teach. For beginners, writing code in Jupyter notebook's cells may be more comfortable than writing scripts with functions and classes. Besides, Jupyter Notebook is a standard tool in data science because of its ability to allow users to plot and explore data. For instance, when you press Shift + Enter, you expect to see the code's immediate results. This makes it easier for a data engineer to evaluate whether a code snippet is working or not. Despite these benefits, data scientists associate Jupyter Notebook with several setbacks.

### Issues with Jupyter Notebook
With Jupyter Notebook, you get plenty of vertical screen real estate for visualizing and debugging the data. Which can be a negative, if you find yourself spending a lot of time scrolling through your notebooks to access preliminary analysis and visualizations. You can get lost as your code gets bigger no matter how many markdowns you use to separate the notebook into different sections. Another fallback with the Jupyter Notebook is that it is difficult to experiment with.

A data engineer may want to test different data processing methods by choosing several parameters for his or her machine-learning algorithm to test an increase accuracy. However, every time they experiment with new approaches, they have to find and rerun the associated cells. In the end, these scientists find it time-consuming and confusing, especially when the training or processing procedure takes a long run time.

Moreover, Jupyter Notebook does not support reproducibility. It becomes increasingly difficult to use new data with slightly different structures with Jupyter Notebook. This is because of the challenges involved in identifying the source of the error in the notebook. Not only that, but Jupyter Notebook can make it challenging to debug. In case of an error in a written code, it is difficult to determine whether the reason for the error is the change in data or the code. With Jupyter Notebook not integrating very well with other tools, production can be difficult. For example, you cannot run Jupyter Notebook code easily while using other codes.

### Advantages of Scripts
Unlike Jupyter Notebook, scripts allow a developer to better organize their code into different parts. For example, you can create multiple small functions, with each function specifying what the code will do - as follows:

![Creating Multiple Small Functions](/engineering-education/why-data-scientists-need-to-move-from-jupyter-notebooks-to-scripts/creating-multiple-small-functions.png)

Additionally, these functions can be put into the same class by categorizing them in the same category as functions to process the data, as shown below:

![Categorizing Functions in the Same Category](/engineering-education/why-data-scientists-need-to-move-from-jupyter-notebooks-to-scripts/categorizing-functions-in-the-same-category.png)

This makes data processing easier since we can use the functions in the class preprocess for this purpose.

Scripts are also better than Jupyter Notebook because they encourage experimentation. Lets say you want to experiment with a different method to preprocess data. You can remove or add a function, as shown below, without being worried about breaking the code. Furthermore, even if you happen to break the code, you would know exactly where to fix it.

![Experiments in Script](/engineering-education/why-data-scientists-need-to-move-from-jupyter-notebooks-to-scripts/experiments.png)

Unlike Jupyter Notebook, Scripts also allows for easier reproducibility. Functions and classes in scripts make it possible to make a general code snippet that can work with well other data. To drop different columns in your new data, you will need to change columns_to_drop to the column lists that you want to drop. The code will still run smoothly, even in such a case. Furthermore, you can create a pipeline specifying the procedure to train and process the data. With a pipeline, you can use pipeline.fit_transform(data) to apply the same processing to both the test any training data.

In addition, script coding is ideal for production, and can cut down time when tracking down particular variables in the code just to change their values. Even better, you can add tools such as [MLFlow](https://mlflow.org/) to track the experiment or [Hhydra.cc](https://hydra.cc/) to handle configuration. Functions make it easier to assess whether the function produces the expected output. They also make it possible to figure out where in the code you may need to make adjustments to get the desired output. If an error still occurs when running the code, even after all the tests have passed, this would mean that the error is in the data. Then, by taking care of the data, you will be able to run the code smoothly.

### Conclusion
Jupyter Notebook can be a great tool, especially when it comes to teaching. This tool can be used to write small codes and in certain instances where the production of the code may not be required. It can also be used to visualize and explore the data. That being said, data scientists need to switch to script to avoid the problems associated with Jupyter Notebook. Better yet, data scientists can learn to use both Jupyter Notebook and scripts for different tasks. For instance, they can create functions and classes in scripts and then import them into the notebook. This way, the notebook looks a bit more organized. Alternatively, they can write the notebook and turn it into a script. The key is to find ways to solve the setbacks of using Jupyter Notebook alone.

### Reference
[From Jupyter Notebook To Scripts](https://towardsdatascience.com/from-jupyter-notebook-to-sc-582978d3c0c)
