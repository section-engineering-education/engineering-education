---
layout: engineering-education
status: publish
published: true
url: /engineering-education/why-data-scientists-need-to-move-from-jupyter-notebooks-to-scripts/
title: Why Data Scientists Need to Move from Jupyter Notebooks to Scripts
description: Jupyter Notebook is a standard tool in data science because of its ability to allow users to plot and explore data.
author: eric-kahuha
date: 2020-10-06T00:00:00-10:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/why-data-scientists-need-to-move-from-jupyter-notebooks-to-scripts/hero.jpg
    alt: Moving from Jupyter to Scripts
---
[Jupyter notebook](https://jupyter.org/) is a great tool for evaluating and exploring data. Data scientists rely on Jupyter notebook to perform their daily tasks of data analysis. Interestingly, the notebook is the first tool that analysts get introduced to in a data science course.
<!--more-->

### Introduction
Historically, data science courses have relied on the notebook as a medium to teach. This is partly because beginners find writing code in Jupyter notebooks cells more comfortable than writing scripts with classes and functions. The ability to allow users to explore and plot data has earned the notebook recognition as a standard tool in data science. Despite these benefits, data scientists associate Jupyter Notebook with some setbacks.

### Jupyter Notebook Vs IDEs
The features of the Jupyter Notebook slightly differs from non-web applications such as the Integrated Development Environment (IDEs). For instance, the notebook cannot perform offline as it relies on the Internet to run. Even in this case, it is a tool of choice for many beginners who like the notebooks rich formatting and a user-friendly interface.

With Jupyter, the syntax is automatically highlighted upon a user entering the code. Moreover, bold formatting and colors help users know if they are indenting the code properly or not. If, for instance, a user writes the print command outside the scope of a loop the color of the print keyword is expected to change.

### Issues with Jupyter Notebook
Most data analysts run Jupyter locally, and there are numerous concerns associated with this practice. One problem is dependencies. In some cases, the notebook imports libraries that are only installed on the computer of a data analyst (locally). The issue with such a scenario is that a data scientist using a different version of the same library, such as NumPy, may experience the setback of the actual production calculations not agreeing with those in the research.

Additionally, it is not possible to reproduce the outcomes from Jupyter Notebook received from a local execution. It is not common for the notebook to comply with Continuous Integration (CI) standards executed by a build server or undergo a build procedure.

Notebook results performed by one machine might differ when running on another computer in the same group bearing in mind that the machines might have some caching differences.

While data scientists can depend on notebook for literate programming, graphing, exploration, and learning, they should not rely on it as the exclusive tool for writing all code. A few reasons being that Jupyter Notebook lack a built-in testing framework, an integrated terminal, auto-formatting code across projects, and has a poor debugging and file browsing.

Interestingly, this lack of [tools](https://www.veracode.com/security/integrated-development-environment) contributes to the difficulties experienced while writing actual programs with many scripts in notebook.

Breaking out of the notebook would require a programmer to remember much of the information in their head. Notably, codes in Jupyter Notebook are treated as entire scripts made up of several classes and functions rather than blocks of code. Real programs contain several interlocking pieces that form a cycle, while the notebook contains a linear path executed from top to bottom.

### Advantages of Scripts
Data analysis is more significant when data scientists can explain what they have done to others and they can reproduce the data themselves to double-check. However, this isn't easy when it comes to Jupyter Notebook, as it does not support reproducibility.

Not only that, notebook makes it challenging to use new data with slightly different structures. However, with scripts, reproducing data is more straightforward. Adding comments to the code is also possible, and this ensures that a data scientist can explain what is happening at all stages of the process. This way, anyone can check the work being done.

Unlike notebook, scripts allow a developer to better organize their code into various parts. For instance, you can create multiple small functions while ensuring that each function specifies what the code will do - as follows:

```py
def extract_emotion(df):
```Extract different types of emotions in emotion dictionary into multiple columns```
emotion=pd.DataFrame.from_dict(list(df.emotion.apply(lambda row: row['document']['emotion'])))
df = pd.contact ([df,emotion], axis=1)
df.drop('emotion', axis=1, inplace=true)
return df
def drop_columns(self, df):
```Drop unnecessary columns ```
df.drop(self.columns_to_drop, axis=1, inplace=True)
return df
def extract_date_hour_minute(self, string: str):
```Extract data hour and monite from datetime string```
try:
return string [:16]
except TypeError:
return np.nan
```

Furthermore, a developer may want to put these functions into the same class by categorizing them into the same category as functions to process the data. This makes data processing easier since the functions in the class preprocess can be used for this purpose.

Scripts are also better than notebook because they encourage experimentation. Let's say a data scientist wants to experiment with a slightly different method to preprocess the data. He or she can remove or add a function, as shown below, without being worried about breaking the code. Furthermore, even if they happen to break the code, they would know exactly where to fix it.

```py
def process(self, df):
df = df.dropna(subset=self.dropna_columns)
#df=self.remove_non_relevant_title(df)
df=self.remove_non_gold_concept(df)
df=self.romove_extract_text_characters(df)
df=self.extract_sentiment(df)
df=self.extract_emotion(df)
df=self.drop_columns(df)
df=self.transform_df_datetime_column(df)
return df
 ```

Besides, script coding is ideal for production and can cut down the time taken to track down particular variables in the code simply to change their values. Even better, tools such as [MLFlow](https://mlflow.org/) can be added to track the experiment.

[Hydra.cc](https://hydra.cc/) can also be added to handle configurations. Functions facilitate the assessment of the function to determine if it is producing the expected output or not. They also make it possible to figure out where in the code you may need to make adjustments to achieve the desired result.

An error occurring when running the code even after all the tests have passed would mean that the error is within the data. This would require a data scientist to polish up the data to run the code smoothly.

### Conclusion
Jupyter Notebook can be a great tool for data scientists, especially when it comes to teaching. Analysts can perfectly rely on this tool to write small code snippets and in certain instances where the production of the code may not be required. Data scientists can also use the notebook to visualize and explore the data.

Despite that, data scientists need to think about switching to script to avoid the problems associated with Jupyter Notebook. Better yet, data scientists can learn to use both Jupyter Notebook and scripts depending on the task at hand. For instance, they can use scripts to create functions and classes which can then be imported into notebook.

This way, the notebook would look a bit more organized. Alternatively, they can write code within notebook with the intention of turning it into a script. The key is to find as many solutions to solve the setbacks connected to using Jupyter Notebook (alone) as possible.

### References
[From Jupyter Notebook To Scripts](https://towardsdatascience.com/from-jupyter-notebook-to-sc-582978d3c0c)
