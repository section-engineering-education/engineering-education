Developers have had difficulties in testing and debugging machine learning models to reach up the performance of the human level. Developers have been manually examining mistakes that algorithms are making to give insights on what to do next.
Error Analysis toolkit saves both time and effort used in debugging machine learning models. It can save developers weeks of work by simplifying the process. There are several machine learning debugging toolkits available but in this article, we are going to explore the Error Analysis toolkit.

### Table of contents

1. [Key concepts](#key-concepts)
2. [Introducing Error Analysis in Machine Learning](#introducing-error-analysis-in-machine-learning)
3. [How Error Analysis works](#how-error-analysis-works)
    -[Identification](#identification)
    -[Diagnosis](#diagnosis)
4. [Failures in Machine Learning](#failures-in-machine-learning)
5. [Installation process](#installation-process)
    -[Getting started](#getting-started)
6. [Conclusion](#conclusion)
7. [References](#references)

### Key concepts

1. **Machine Learning**

It is a part of artificial intelligence (AI), that enables systems to automatically learn and improve their accuracy from experience without being programmed using algorithms and data.

2. **Error Analysis** 

Error analysis is a strategy used to indicate the errors that show up in a system by pointing out if those errors are systematic and suggesting what caused them.

3. **Systematic Errors**

There are errors that are consistent and repeatable in a given dataset. Systematic errors are prone to appear in machine learning models.

4. **Learner Language**

Language in which learners try to communicate in a language they are learning. Therefore, machine learning models study computer algorithms that improve automatically by going through more data sets over and over again improving their accuracy.

5. **Cohorts**
 
Cohorts are subgroups of data that are saved by a user who can later use them for future investigation.

### Introducing Error Analysis in Machine Learning

Error Analysis AI toolkit allows developers to get a more profound comprehension of Machine Learning model mistakes. While assessing a machine learning model, total precision isn't adequate and single-score assessment may shroud significant states of errors. 
It is used to distinguish cohorts with higher error rates and analyze the main drivers behind these errors. Error analysis in Machine Learning is not just to improve performance on your target metric, but also provides an avenue for the developers to know the accuracy of the model and exactly where the errors occur and how to mitigate based on the insights provided.

![ErrorAnaysis](/engineering-education/an-overview-of-error-analysis-toolkit/error-benchmark.jpg)

*[Image Source: Towards data science](https://towardsdatascience.com/responsible-machine-learning-with-error-analysis-a7553f649915)*

*Error Analysis showing the distribution of errors to developers in a way that enables them to identify & diagnose errors efficiently.* 

### How Error Analysis works

#### Identification

Error Analysis begins with pinpointing cohorts of data with higher error rates than the benchmark. These discrepancies would possibly occur when the system or model underperforms for specific demographic sets or sometimes discovered input conditions within the training data sets.
Error Analysis uses Decision Tree and Error Heatmap processes to evaluate the machine learning model's performances and accuracy.

1. Decision Tree

The decision tree is used to identify errors patterns that are complex involving more than one feature. Cohorts with high error rates across multiple features are identified using the binary tree visualization, therefore, coming up with indicators such as error rate, error coverage, and data representation for each discovered cohort which users get more insights.
Sometimes developers find it hard to discover hidden data pockets with critical failures while exploring possible combinations of features. Binary tree visualization partitions the benchmark data into subgroups showing high or low error rates therefore it separates model error from success. For each node defining a data set, users can investigate the following information:

*Error rate* - a section of instances in the node in which indicates errors in the model that are clarified by the intensity of the color of the node.
*Error coverage* - a section of all errors that fall into the node which is indicated by the fill rate of the node.
*Data representation* - is the number of instances in the node which is pointed out through the thickness of the incoming edge to the node along with the actual total number of instances in the node.

![TreeMap](/engineering-education/an-overview-of-error-analysis-toolkit/error-detector.jpg)

*[Image Source: Towards data science](https://towardsdatascience.com/responsible-machine-learning-with-error-analysis-a7553f649915)*

*Decision tree aims to separates error instances from success instances in the data. The hierarchical error pattern here shows that error can be as high as 96.77% for individuals who are married, while the overall error rate is 23.65%.*

2. Error Heatmap

Error Heatmap allows users to form hypotheses of the most impactful features for error heatmap and to further investigate how the input features impact the error rate across cohorts. The view divides the data based on a one or two-dimensional grid of input features therefore users can choose the input of any features of their interest for analysis.
Error Heatmap works by visualizing cells with higher error, showing a darker red color indicating regions with higher error discrepancy.

![HeatMap](/engineering-education/an-overview-of-error-analysis-toolkit/heatmap.jpg)

*[Image Source: Towards data science](https://towardsdatascience.com/responsible-machine-learning-with-error-analysis-a7553f649915)*

*The error hit map indicates that error rates are higher up to 83%, for individuals with higher education while the overall error rate for the dataset is 23.65%. Error rates are also seen to be higher in males compared to females.*

#### Diagnosis

This step is where Error Analysis enables further debugging of the cohorts earlier identified with errors. More information about the machine learning models errors is identified through data exploration and model interpretability.

Methods for Error Diagnosis:

1. Data exploration

Data exploration allows comparison between cohorts which enables benchmarking to be carried out. Dataset statistics and feature distribution are explored, therefore, investigating whether certain cohorts are underrepresented or their feature distribution is a lot different from the overall data hinting if there's the existence of outliers or unusual covariate shift.

![Data Exploration](/engineering-education/an-overview-of-error-analysis-toolkit/data-explorer.jpg)

*[Image Source: towards data science](https://towardsdatascience.com/responsible-machine-learning-with-error-analysis-a7553f649915)*

*The data distributed indicates that there are fewer instances for individuals with more than 12 years of education, and for this cohort, the distribution between lower-income and higher-income is very different than for other cohorts. More people in this cohort have an income higher than 50K, which is the opposite of the overall data.*

2. Global explanation

Global Explanation allows users to explore the top important features that impact the overall model predictions for a selected sub-group of the cohort. This allows comparison between values for different cohorts side by side. Users can see the relationship between the values of the selected feature to its corresponding feature of important values. This shows them how the values of the selected feature impact model prediction.

![Explanation](/engineering-education/an-overview-of-error-analysis-toolkit/global-explanation.jpg)

*[Image Source: Towards data science](https://towardsdatascience.com/responsible-machine-learning-with-error-analysis-a7553f649915)*

*The important features globally in the income prediction model are marital status and number of education years. When you click each feature you can observe more granular dependencies such as in the marital status, "civil spouse" contribute to model prediction for higher income (>50K) while the other marital status such as "widowed", "separated" or "divorced" contribute to model predictions for lower-income (<50k).*

3. Local explanation

Local explanation allows users to select cohort data points in instance view, divided by correct or incorrect predictions. Missing features are examined as potential causes for incorrect predictions. Users can investigate important features for an individual prediction. It helps illustrate the local behavior of the underlying model on a specific data point.

4. What-If Analysis

What-If Analysis allows users to change feature values of selected data points and observe changes in comparison to their predictions. This allows them to select their hypothetical what-if data points for further comparisons with benchmarked original data points.

![Global Explanation](/engineering-education/an-overview-of-error-analysis-toolkit/data-table.jpg)

*[Image Source: Towards data science](https://towardsdatascience.com/responsible-machine-learning-with-error-analysis-a7553f649915)*

*The model outputs the wrong prediction for the individual highlighted showing the individual earns less than 50k while the opposite is true. What-if explanations make it possible to understand model behavior if one of the feature values changes. Many features are usually not mutable in the real world, therefore sensitivity analysis is intended to further support practitioners with model understanding capabilities.*


### Failures in Machine Learning

It has been hard to detect Machine Learning algorithm errors by developers. Most of the time when Error Analysis has been carried out manually by developers, therefore, taking most time in testing and debugging of the Machine Learning models. There are many reasons why machine learning models fail which could be the architecture, or the training data, or the way the training data were preprocessed, or the context in which the model was deployed.
Teams that deploy machine learning models into the real world face challenges while conducting model evaluation and testing. When testing a model, let's say given a model Y is 75% accurate on a given benchmark and therefore the model accuracy may not be uniform across subgroups of data. Such failures cause a lack of reliability, safety, and unfairness. Subgroups of data may display different error rates which are as model Y 75% accuracy.To diagnose errors from different subgroups, error analysis proves to be reliable by separating the subgroups of data and analyzing each data set differently, therefore giving more accurate results.

### Installation process

To install the Responsible AI Widgets `raiwidgets` package, in your python environment simply run the following to install the raiwidgets package from [pypi](https://pypi.org/project/raiwidgets/). If you do not have `interpret-community` already installed, you will also need to install this for supporting the generation of model explanations.

```python
pip install interpret-community

pip install raiwidgets
```

Alternatively, you can also clone the open-source repository and build the code from scratch:

```python
git clone https://github.com/microsoft/responsible-ai-widgets.git
```

You will need to install yarn and node to build the visualization code, and then you can run:

```python
yarn install

yarn build all
```

And install from the raiwidgets folder locally:

```python
cd raiwidgets

pip install –e .
```

For more information see the [contributing](https://github.com/microsoft/responsible-ai-widgets/blob/main/CONTRIBUTING.md)[ ](https://github.com/microsoft/responsible-ai-widgets/blob/main/CONTRIBUTING.md)[guide](https://github.com/microsoft/responsible-ai-widgets/blob/main/CONTRIBUTING.md).

If you intend to run repository tests, in the raiwidgets folder of the repository run:

```python
pip install -r requirements.txt
```

#### Getting started

We can call the error analysis dashboard using the API below, which takes in an explanation object computed by one of the explainers from the interpret-community repository, the model or pipeline, a dataset, and the corresponding labels (true\_y parameter):

ErrorAnalysisDashboard(global\_explanation, model, dataset=x\_test, true\_y=y\_test) 

We can downsample the explanation to fewer rows for larger datasets but run error analysis on the full dataset. We can provide the downsampled explanation, the model or pipeline, the full dataset, and then both the labels for the sampled explanation and the full dataset, as well as (optionally) the names of the categorical features:

ErrorAnalysisDashboard(global\_explanation, model, dataset=X\_test\_original\_full,true\_y=y\_test, categorical\_features=categorical\_features, true\_y\_dataset=y\_test\_full)



### Conclusion

Error Analysis tool kit has enabled proper testing and debugging of machine learning models. Early detection of errors can easily be made by developers improving the performance of the machine learning models. Other responsible AI toolkits are;
*[Fairlearn](https://fairlearn.org/);* Helps to assess fairness and mitigate the unfairness of AI systems.
*[InterpretML](https://interpret.ml/);* Helps to understand machine learning models behaviors and enable responsible machine learning. 

### References:

1. [Responsible machine learning with error analysis](https://techcommunity.microsoft.com/t5/azure-ai/responsible-machine-learning-with-error-analysis/ba-p/2141774?wt.mc_id=aiml-17954-sejuare)
2. [Responsible machine learning with error analysis](https://towardsdatascience.com/responsible-machine-learning-with-error-analysis-a7553f649915)
3. [Error Analysis](https://erroranalysis.ai/)
4. [Responsible AI widgets](https://github.com/microsoft/responsible-ai-widgets/)

