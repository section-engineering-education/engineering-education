Developers have had difficulties in testing and debugging machine learning models to reach up the performance of the human level. Developers have been manually examining mistakes that algorithms are making to give insights on what to do next.
ErrorAnalysis toolkit both saves the time and effort used in debugging machine learning models. It can save developers weeks of work by simplifying the process. There are several machine learning debugging toolkits available but in this article, we are going to explore the Error Analysis toolkit.

### Table of Contents

1. [Key Concepts](#key-concepts)
2. [Introducing Error Analysis in Machine Learning](#introducing-error-analysis-in-machine-learning)
3. [How Error Analysis Work](#how-error-analysis-work)
    -[Identification](#identification)
    -[Diagnosis](#diagnosis)
4. [Failures in Machine Learning](#failures-in-machine-learning)
5. [Installation Process](#installation-process)
    -[Getting Started](#getting-started)
6. [Conclusion](#conclusion)
7. [References](#references)

### Key Concepts

1. Machine Learning

It is the study of computer algorithms that improve automatically through experience and by the use of data. It is seen as a part of artificial intelligence.<https://en.wikipedia.org/wiki/Machine_learning>

2. Error Analysis 

Error analysis is a strategy used to document the errors that show up in learner language, decide if those errors are systematic, and if conceivable clarify what caused them.

3. Systematic Errors

Ther are errors that are consistent and repeatable in a given data sets. Systematic errors are prone to appear in machine earning models.

4. Learner Language

Language in which learners say or write when they are trying to communicate in a language they are learning. Therefore, machine learning models study computer algorithims that improve automatically by going through more data sets over and over again improving their performance.

5. Cohorts
 
Cohorts are subgroups of data that the user may choose to save for later use if they wish to come back to those cohorts for future investigation

### Introducing Error Analysis in Machine Learning

Error Analysis is a Responsible AI toolkit that enables you to get a more profound comprehension of Machine Learning model mistakes. While assessing a machine learning model, total precision isn't adequate and single-score assessment may shroud significant states of errors. 
Error Analysis is used to distinguish cohorts with higher error rates and analyze the main drivers behind these errors. Error analysis in Machine Learning is not just to improve performance on your target metric, but also provides an avenue to know if your model is doing well and analyzing where your model went wrong on your test data, and how to make systematic changes to your model based on these insights.

![ErrorAnaysis](/engineering-education/an-overview-of-error-analysis-toolkit/error-benchmark.jpg)
*Error Analysis moves away from aggregate accuracy metrics, exposes the distribution of errors to developers in a transparent way, and enables developers to identify & diagnose errors efficiently.* 

### How Error Analysis Work

#### Identification

Error Analysis begins with pinpointing cohorts of data with higher error rates than the benchmark. These discrepancies would possibly occur when the system or model underperforms for specific demographic sets or sometimes discovered input conditions within the training data sets.
Error Analysis uses Decision Tree and Error Heatmap processes to evaluate the machine learning model's performances and accuracy.

1. Decision Tree

The decision tree is used to identify errors patterns that are complex involving more than one feature. Cohorts with high error rates across multiple features are identified using the binary tree visualization, therefore, coming up with indicators such as error rate, error coverage, and data representation for each discovered cohort which users get more insights.
Sometimes developers find it hard to discover hidden data pockets with critical failures while exploring possible combinations of features. Binary tree visualization partitions the benchmark data into subgroups showing high or low error rates therefore it separates model error from success. For each node defining a data set, users can investigate the following information:

*Error rate* - a portion of instances in the node for which the model is incorrect. This is shown through the intensity of the red color.
*Error coverage* - a portion of all errors that fall into the node. This is shown through the fill rate of the node.
*Data representation* - number of instances in the node. This is shown through the thickness of the incoming edge to the node along with the actual total number of instances in the node.

![TreeMap](/engineering-education/an-overview-of-error-analysis-toolkit/error-detector.jpg)
*Decision tree that aims at finding failure modes by separating error instances from success instances in the data. The hierarchical error pattern here shows that while the overall error rate is 23.65% for the dataset, it can be as high as 96.77% for individuals who are married, have a capital gain higher than 4401, and a number of education years higher than 12.

2. Error Heatmap

Error Heatmap allows users to form hypotheses of the most impactful features for error heatmap and to further investigate how the input features impact the error rate across cohorts. The view divides the data based on a one or two-dimensional grid of input features therefore users can choose the input of any features of their interest for analysis.
Error Heatmap works by visualizing cells with higher error, showing a darker red color indicating regions with higher error discrepancy.

![HeatMap](/engineering-education/an-overview-of-error-analysis-toolkit/heatmap.jpg)
*While the overall error rate for the dataset is 23.65%, the heatmap reveals that the error rates are visibly higher, up to 83%, for individuals with higher education. Error rates are also higher for males vs. females.*

#### Diagnosis

This step is where Error Analysis enables further debugging of the cohorts earlier identified with errors. More information about the machine learning models errors is identified through data exploration and model interpretability.

Methods for Error Diagnosis;

1. Data Exploration

Data exploration allows comparison between cohorts which enables benchmarking to be carried out. Dataset statistics and feature distribution are explored therefore,investigating whether certain cohorts are underrepresented or their feature distribution is a lot different from the overall data hinting if there's the existence of outliers or unusual covariate shift.

![DataExploration](/engineering-education/an-overview-of-error-analysis-toolkit/data-explorer.jpg)
*When we look at how the data is distributed across the feature “education\_num” we can see that a) there are fewer instances for individuals with more than 12 years of education, and b) for this cohort the distribution between lower income (blue) and higher income (orange) is very different than for other cohorts. In fact, for this cohort there exist more people who have an income higher than 50K, which is not true for the overall data.*

2. Global Explanation

Global Explanation allows users to explore the top important features that impact the overall model predictions for a selected sub-group of the cohort. This allows comparison between values for different cohorts side by side. Users can see the relationship between the values of the selected feature to its corresponding feature of important values. This shows them how the values of the selected feature impact model prediction.

![Explanation](/engineering-education/an-overview-of-error-analysis-toolkit/global-explanation.jpg)
*Global feature explanations for the income prediction model show that marital status and number of education years are the most important features globally. By clicking on each feature, it is possible to observe more granular dependencies. For example, marital statuses like “divorced”, “never married”, “separated”, or “widowed” contribute to model predictions for lower income (<50K). Marital status of “civil spouse”instead contributes to model predictions for higher income (>50K).*

3. Local Explanation

Local explanation allows users to select cohort data points in instance view, divided by correct or incorrect predictions. Missing features are examined as potential causes for incorrect predictions. Users can investigate important features for an individual prediction. It helps illustrate the local behavior of the underlying model on a specific data point.

4. What-If Analysis

What-If Analysis allows users to change feature values of selected data points and observe changes in comparison to their predictions. This allows them to select their hypothetical what-if data points for further comparisons with benchmarked original data points.

![GlobalExplanation](/engineering-education/an-overview-of-error-analysis-toolkit/data-table.jpg)
*For this individual, the model outputs a wrong prediction, predicting that the individual earns less than 50K, while the opposite is true. With what-if explanations, it is possible to understand how the model would behave if one of the feature values changes. For instance, here we can see that if the individual were 10 years older (age changed from 32 to 42) the model would have made a correct prediction. While in the real world many of these features are not mutable, this sensitivity analysis is intended to further support practitioners with model understanding capabilities*

### Failures in Machine Learning

It has been hard to detect Machine Learning algorithm errors by developers. Most of the time when Error Analysis has been carried out manually by developers, therefore, taking most time in testing and debugging of the Machine Learning models. There are many reasons why machine learning models fail which could be the architecture, or the training data, or the way the training data were preprocessed, or the context in which the model was deployed.
Teams that deploy machine learning models into the real world face challenges while conducting model evaluation and testing. When testing a model, let's say given a model Y is 75% accurate on a given benchmark and therefore the model accuracy may not be uniform across subgroups of data. Such failures cause a lack of reliability, safety, and unfairness. Subgroups of data may display different error rates which are as model Y 75% accuracy. In order to diagnose errors from different subgroups, Error Analysis proves to be reliable by separating the subgroups of data and analyzing each data set differently, therefore giving more accurate results.

### Installation Process

To install the Responsible AI Widgets “raiwidgets” package, in your python environment simply run the following to install the raiwidgets package from [pypi](https://pypi.org/project/raiwidgets/). If you do not have interpret-community already installed, you will also need to install this for supporting the generation of model explanations.

pip install interpret-community

pip install raiwidgets

Alternatively, you can also clone the open source repository and build the code from scratch:

git clone https://github.com/microsoft/responsible-ai-widgets.git

You will need to install yarn and node to build the visualization code, and then you can run:

yarn install

yarn buildall

And install from the raiwidgets folder locally:

cd raiwidgets

pip install –e .

For more information see the [contributing](https://github.com/microsoft/responsible-ai-widgets/blob/main/CONTRIBUTING.md)[ ](https://github.com/microsoft/responsible-ai-widgets/blob/main/CONTRIBUTING.md)[guide](https://github.com/microsoft/responsible-ai-widgets/blob/main/CONTRIBUTING.md).

If you intend to run repository tests, in the raiwidgets folder of the repository run:

pip install -r requirements.txt

#### Getting started

We can call the error analysis dashboard using the API below, which takes in an explanation object computed by one of the explainers from the interpret-community repository, the model or pipeline, a dataset and the corresponding labels (true\_y parameter):

ErrorAnalysisDashboard(global\_explanation, model, dataset=x\_test, true\_y=y\_test) 

For larger datasets, we can downsample the explanation to fewer rows but run error analysis on the full dataset. 
We can provide the downsampled explanation, the model or pipeline, the full dataset, and then both the labels for the sampled explanation and the full dataset, as well as (optionally) the names of the categorical features:

ErrorAnalysisDashboard(global\_explanation, model, dataset=X\_test\_original\_full,true\_y=y\_test, categorical\_features=categorical\_features, true\_y\_dataset=y\_test\_full)

The screenshots in this article are generated using a LGBMClassifier with three estimators. 

### Conclusion

Error Analysis tool kit has enabled proper testing and debugging of machine learning models. Early detection of errors can easily be made by developers improving the performance of the machine learning models. Other responsible AI toolkits are;
*Fairlearn;* Helps to assess fairness and mitigate the unfairness of AI systems<https://fairlearn.org/>
*InterpretML;* Helps to understand machine learning models behaviors and enable responsible machine learning <https://interpret.ml/>

## References:

1. [https://techcommunity.microsoft.com/t5/azure-ai/responsible-machine-learning-with-](https://techcommunity.microsoft.com/t5/azure-ai/responsible-machine-learning-with-error-analysis/ba-p/2141774?wt.mc_id=aiml-17954-sejuare)
2. [https://towardsdatascience.com/responsible-machine-learning-with-error-analysis-](https://towardsdatascience.com/responsible-machine-learning-with-error-analysis-a7553f649915)
3. <https://erroranalysis.ai/>
4. <https://github.com/microsoft/responsible-ai-widgets/>

