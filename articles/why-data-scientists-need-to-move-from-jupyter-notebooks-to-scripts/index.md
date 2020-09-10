Why Data Scientists Need to Move from Jupyter Notebooks to Scripts

## Introduction

[Jupyter notebook](https://jupyter.org/) is one of the most useful tools for evaluating and exploring data. Data scientists use Jupyter notebook in their daily tasks of data analysis. Interestingly, Jupyter notebook is the first tool that engineers get introduced to when starting to learn data science. Most data science courses rely on this tool as a medium to teach. For beginners, writing code in Jupyter notebook&#39;s cells is more comfortable than writing scripts with functions and classes. Besides, Jupyter Notebook is a standard tool in data science because of its ability to allow users to plot and explore data. For instance, when you type &#39;Shift + Enter,&#39; you expect to see the code&#39;s immediate results. This makes it easy for a data engineer to evaluate whether a code is working or not. Despite these benefits, data scientists associate Jupyter Notebook with several setbacks.

## Issues with Jupyter Notebook

With Jupyter Notebook, you get many vertical screen real estate for visualizing and debugging the data. Thus, you can spend a lot of time scrolling through your notebooks to access preliminary analysis and visualizations. This way, you can get lost as your code gets bigger no matter how many markdowns you use to separate the notebook into different sections. Another fallback with the Jupyter Notebook is that it is difficult to experiment. A data engineer may want to test different data processing methods by choosing several parameters for his or her machine-learning algorithm to test an increase in accuracy. However, every time they experiment with new approaches, they have to find and rerun the associated cells. In the end, these scientists find it time-consuming and confusing, especially when the training or processing procedure takes a long running time.

Moreover, Jupyter Notebook does not support reproducibility. It becomes increasingly difficult to use new data with slightly different structures with Jupyter Notebook. This is because of the challenges involved in identifying the source of the error in the notebook. Not only that, but Jupyter Notebook also makes it challenging to debug. In case of an error in a written code, it is difficult to determine whether the reason for the error is the change in data or the code. With Jupyter Notebook not integrating very well with other tools, production is difficult. For example, you cannot run a Jupyter Notebook code easily while using other codes.

## Scripts

Unlike Jupyter Notebook, scripts allow for the organization of code into different parts. For example, you can create multiple small functions with each function specifying what the code doses as follows:

![Creating Multiple Small Functions](/engineering-education/why-data-scientists-need-to-move-from-jupyter-notebooks-to-scripts/creating-multiple-small-functions.png)

Additionally, these functions can be put into the same class by categorizing them in the same category as functions to process the data, as shown below:

![Categorizing Functions in the Same Category](/engineering-education/why-data-scientists-need-to-move-from-jupyter-notebooks-to-scripts/categorizing-functions-in-the-same-category.png)

This makes data processing easier since we can use the functions in the class Preprocess for this purpose.

Scripts are also better than Jupyter Notebook because they encourage experiments. Say you want to experiment with a different method to preprocess data. You can remove or add a function, as shown below, without being worried about breaking the code. Furthermore, in case you happen to break the code, you know exactly where to fix it.

![Experiments in Script](/engineering-education/why-data-scientists-need-to-move-from-jupyter-notebooks-to-scripts/experiments.png)

Scripts allow reproducibility, unlike Jupyter Notebook. Functions and classes in scripts make it possible to make a general code that can work with other data. To drop different columns in your new data, you need to change columns_to_drop to column lists that you want to drop. The code will still run smoothly, even in such a case. Furthermore, you can create a pipeline specifying the procedure to train and process the data. With a pipeline, you can use pipeline.fit_transform(data) to apply the same processing to both the test and train data.
asdfghjkl
In addition, scrip coding is ideal for production, and this prevents a wastage of time in tracking down particular variables in the code just to change their values. Better, you can add tools such as [MLFlow](https://mlflow.org/) to track the experiment or [Hhydra.cc](https://hydra.cc/) to handle configuration. Functions make it easier to assess whether that function produces the expected output. With functions, it is possible to figure out where in the code you need to change to give the desired output. If an error still occurs in running the code, even after all the tests have passed, this would mean that the error is in the data. Thus, if you take care of the data, you will be able to run the code smoothly.

## Conclusion

Jupyter Notebook is a great tool, especially when it comes to teaching. This tool can be used to write small codes and in instances where the production of the code is not required. Also, it can be used to visualize and explore the data. That said, data scientists need to switch to script to avoid the problems associated with Jupyter Notebook. Better yet, data scientists can use both Jupyter Notebook and scripts for different tasks. For instance, they can create functions and classes in scripts and then import them in the notebook. This way, the notebook looks a bit organized. Alternatively, they can write the notebook and turn it into a script. The key is to find ways to solve the setbacks of the Jupyter Notebook.

## Reference 
[From Jupyter Notebook To Scripts](https://towardsdatascience.com/from-jupyter-notebook-to-sc-582978d3c0c)