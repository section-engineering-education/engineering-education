A machine learning pipeline is used to find the optimal path in machine learning building. It automates stages in machine learning.

In machine learning stages are as follows.

#### Data Cleaning

We clean the dataset by removing missing values and noisy data. Ensures that the data is well-formatted so that the model can easily use it during training.

#### Exploratory data analysis(EDA)

Process of data analysis to find and summarize the main characteristics of the given dataset.

#### Feature engineering and selection

Process of selecting the independent variables in the dataset act as an input for the model.

#### Model Selection

It's selecting the best algorithm used to achieve the optimal results.

#### Model building

We use our processed data to train and build our model using the set parameters.

#### Parameter Optimization

We change the parameters of a model to optimize the model performance.

#### Model Validation

We check the accuracy of the model. The higher better the model.

#### Making Prediction

We test our model to check how it learned during training through making predictions.
We use a machine learning pipeline to find the best algorithm to use.
We also perform parameter optimization so that we can achieve optimal results.

Machine learning pipeline is helpful in the following ways.

1. Helps in finding the optimal solution for a model.
2. Automate processes that would otherwise take longer.
3. Prevents bugs by choosing a path that is less prone to errors.
4. Pipeline has a fast iteration cycle that iterates through the processes in the shortest time possible and finds the optimal solution.

The following are tools and libraries used to generate pipelines.

1. [TPOT.](http://epistasislab.github.io/tpot/)
2. [AutoML.](https://www.automl.org/automl/)
3. [MLBox.](https://mlbox.readthedocs.io/en/latest/)
4. [Auto-Keras.](http://autokeras.com/)
5. [Featuretools.](https://www.featuretools.com/)
6. [Auto Sklearn.](https://automl.github.io/auto-sklearn/)

In this tutorial, we will be talking about TPOT and how to generate machine learning pipelines using this tool.

### Table of contents

- [Prerequisites](#prerequisites)
- [Getting started with TPOT](#getting-started-with-tpot)
- [Model building using individual algorithms](#model-building-using-individual-algorithms)
- [Model building using TPOT](#model-building-using-tpot)
- [Making Predictions](#making-predictions)
- [Conclusion](#conclusion)
- [References](#references)

### Prerequisites

1. You must have a working knowledge of [Python.](https://www.python.org/)
2. Have a working knowledge of the [machine learning model.](https://www.section.io/engineering-education/house-price-prediction/)
3. Be familiar with [machine learning lifecycle processes.](https://www.javatpoint.com/machine-learning-life-cycle)
4. Be familiar with [Google Colab](https://research.google.com/colaboratory/). We will use Google Colab instead of [Jupyter Notebook](https://jupyter.org/) in this tutorial.

> NOTE: We are using [Google Colab](https://research.google.com/colaboratory/) since it has a Graphical Processing Unit(GPU) and Tensor Processing Unit(TPU) are fast when it comes to machine learning modeling.
> TPOT requires a powerful tool for processing.

A machine learning pipeline is used to find the optimal path in machine learning building. It automates stages in machine learning.

Machine learning stages are as follows.

#### Data Cleaning

We clean the dataset by removing missing values and noisy data. Ensures that the data is well-formatted so that the model can easily use it during training.

#### Exploratory data analysis(EDA)

Process of data analysis to find and summarize the main characteristics of the given dataset.

#### Feature engineering and selection

Process of selecting the independent variables in the dataset act as an input for the model.

#### Model Selection

It's selecting the best algorithm used to achieve the optimal results.

#### Model building

We use our processed data to train and build our model using the set parameters.

#### Parameter Optimization

We change the parameters of a model to optimize the model performance.

#### Model Validation

We check the accuracy of the model. The higher better the model.

#### Making Prediction

We test our model to check how it learned during training through making predictions.
We use a machine learning pipeline to find the best algorithm to use.
We also perform parameter optimization so that we can achieve optimal results.

Machine learning pipeline is helpful in the following ways.

1. Helps in finding the optimal solution for a model.
2. Automate processes that would otherwise take longer.
3. Prevents bugs by choosing a path that is less prone to errors.
4. Pipeline has a fast iteration cycle that iterates through the processes in the shortest time possible and finds the optimal solution.

The following are tools and libraries used to generate pipelines.

1. [TPOT.](http://epistasislab.github.io/tpot/)
2. [AutoML.](https://www.automl.org/automl/)
3. [MLBox.](https://mlbox.readthedocs.io/en/latest/)
4. [Auto-Keras.](http://autokeras.com/)
5. [Featuretools.](https://www.featuretools.com/)
6. [Auto Sklearn.](https://automl.github.io/auto-sklearn/)

In this tutorial, we will be talking about TPOT and how to generate machine learning pipelines using this tool.

### Getting started with TPOT

TPOT is a Python library used to generate machine learning pipelines. TPOT uses [genetic programming](https://www.sciencedirect.com/topics/medicine-and-dentistry/genetic-programming) to find a machine Learning pipeline with the optimal solution.
There are three main concepts when generating an optimized machine learning pipeline as follows.

1. Selection.
   TPOT selects the algorithm that will give the best results.
2. Crossover
   After selecting the algorithms, these algorithms are cross-bred to find a hybrid solution.
3. Mutation:
   Over time these algorithms change and become more advanced to yield the optimal solution.
   These are the concepts of natural selection and survival of the fittest, the best algorithm is chosen.

TPOT is built on top of powerful Python libraries such as [NumPy](http://www.numpy.org/), [scikit-learn](http://www.scikit-learn.org/), [pandas](http://pandas.pydata.org/) and [joblib](https://joblib.readthedocs.io/en/latest/). This makes it powerful when generating machine learning pipelines.

[Scikit-learn] has contains the following algorithms for classification and regression.

1. [Support Vector Machines.](https://scikit-learn.org/stable/supervised_learning.html#supervised-learning)
2. [Stochastic Gradient Descent.](https://scikit-learn.org/stable/supervised_learning.html#supervised-learning)
3. [K- Nearest Neighbors.](https://scikit-learn.org/stable/supervised_learning.html#supervised-learning)
4. [Naive Bayes.](https://scikit-learn.org/stable/supervised_learning.html#supervised-learning)
5. [Decision Trees.](https://scikit-learn.org/stable/supervised_learning.html#supervised-learning)
6. [Random Forest.](https://scikit-learn.org/stable/supervised_learning.html#supervised-learning)
7. [Logistic Regression.](https://scikit-learn.org/stable/supervised_learning.html#supervised-learning)
8. [Linear Regression.](https://scikit-learn.org/stable/supervised_learning.html#supervised-learning)
   When it comes to classification or regression TPOT iterates through these algorithms and finds the best one, the one with the highest accuracy score is the one that is chosen.

To fully understand the power and usefulness of TPOT, we start by using individual algorithms in building a model.
We shall use two algorithms Linear Regression and Random Forest in building a model classifier. We shall compare the accuracy score of each algorithm and see which one is better after performing parameter tuning for each algorithm to find the best score.

In the next section, we shall now use TPOT in building a machine learning model. TPOT combines all the available classification algorithms and finds the optimal one, the one with the highest accuracy score.

### Model building using individual algorithms

We will use the iris dataset to build our model. The model classifies the flower species based on the following: sepal length, sepal width, petal length, and petal width.
[Dataset used](https://drive.google.com/file/d/1gmfoaF14KhMybNThcaU72edgbFm7DO9l/view?usp=sharing)
![Output](/engineering-education/generating-machine-learning-pipelines-with-tpot-in-python/dataset_image.png)

### Initialize the dataset URL

We have to initialize the dataset URL to download the dataset to Google Colab.

```python
data_url = "https://drive.google.com/file/d/1UD34U4Q_7mSXoihx2OGG9ePhLbjoZ1sn/view?usp=sharing"
```

### Loading Machine learning packages

```python
import train_test_split from sklearn.model_selection
import LogisticRegression from sklearn.linear_model
import RandomForestClassifier from sklearn.ensemble
```

In the above code snippet, we have imported the following.

- `train_test_split`: Used to split the dataset into `train_set` and `test_set`: Used for training and testing phases.
- `LogisticRegression`: We shall use this algorithm in building our model.
- `RandomForestClassifier`: This is the second algorithm used in building our model.

> NOTE: We shall use the two algorithms `LogisticRegression` and `RandomForestClassifier` in building our model then compare the accuracy score, but later we shall use TPOT to combine all the algorithms in building our model and find the best one.

### Importing exploratory data analysis

These packages are helpful when it comes to data analysis and manipulation.

```python
import pandas as pd
import numpy as np
```

#### Importing dataset using pandas

We shall use `pandas` to import and read our dataset.

```python
df = pd.read_csv(data_url)
```

#### Dataset structure

To check the available columns and rows available in our dataset we use the following command.

```python
df.head()
```

![Output](/engineering-education/generating-machine-learning-pipelines-with-tpot-in-python/output.png)

### Checking for missing values

We have to check for missing values. Our dataset should not contain any missing values.

```python
df.isnull().sum()
```

Output:

```bash
sepal_length    0
sepal_width     0
petal_length    0
petal_width     0
species         0
dtype: int64
```

### Checking the number of columns of our dataset

We need to check the available columns in our dataset.
Our dataset has the following columns: `sepal_length`, `sepal_width`, `petal_length`, `petal_width` and `species`.

```python
df.columns
```

The output is shown:

```python
Index(['sepal_length', 'sepal_width', 'petal_length', 'petal_width',
       'species'],
      dtype='object')
```

### Convert species column

We need to convert the `species` column to numeric. The numeric values are the dictionary of labels used for prediction.

The labels will be as follows.

1. `o` for `setosa`
2. `1` for `versicolor`
3. `2` for `virginica`

The following snippet is used to connert:

```python
data = d = {value:index for index,value in enumerate(df['species'].unique())}
```

Output after conversion:

```bash
{'setosa': 0, 'versicolor': 1, 'virginica': 2}
```

We then map the label into our dataset by adding a label to a new column in the dataset.

```python
df['new_label'] = df['species'].map(data)
```

To see our new dataset use this code:

```python
df.head()
```

The output will be a dataset with an additional `new_label` column as shown.

![Output](/engineering-education/generating-machine-learning-pipelines-with-tpot-in-python/new_dataset.png)

We now need to set our model features and labels as `xfeatures` and `ylabels`.

- `xfeatures` are the indepedent variables in our dataset that act as the inputs for our model. Our features are `sepal_length`, `sepal_width`, `petal_length` and `petal_width`.

- `ylabels` will be used as an output when making a prediction. Our labels are `0`, `1` and `2`.

```python
xfeatures = df[['sepal_length', 'sepal_width', 'petal_length', 'petal_width']]
ylabels = df['new_label']
```

After setting features and labels we can now start building our model.

### Building model using Logistic Regression

Import a cross-validation score used to test the effectiveness of our model and its ability to make new predictions.

```python
import cross_val_score from sklearn.model_selection
```

We can now use `cross_val_score` in the `LogisticRegression` algorithm.
We shall set the number of folds to `10`.

The model will iterate 10 times and find the average accuracy after the iterations.
We also build our model using the `xfeatures` and `ylabels` we created earlier.

```python
cv_scores = cross_val_score(LogisticRegression(),xfeatures,ylabels,cv=10)
```

Will iterate 10 times and output the accuracy score after each iteration.

To see the accuracy score after each iteration use the following command.

```python
cv_scores
```

The accuracy scores outputs:

```bash
array([1.        , 0.93333333, 1.        , 1.        , 0.93333333,
       0.93333333, 0.93333333, 1.        , 1.        , 1.        ])
```

To get the average score from the above 10 iterations we use the following command.

```python
print(np.mean(cv_scores))
```

The average score:

```bash
0.9733333333333334
```

### Building using RandomForestClassifier algorithm

We shall use the second algorithm to build our model. We can then compare the two algorithms' accuracy scores.

```python
rf_cv_scores = cross_val_score(RandomForestClassifier(),xfeatures,ylabels,cv=10)
```

We shall do the same 10 folds in building our model.

The score of the algorithm.

```python
rf_cv_scores
```

Output:

```bash
array([1.        , 0.93333333, 1.        , 0.93333333, 0.93333333,
       0.93333333, 0.93333333, 1.        , 1.        , 1.        ])
```

Average of the algorithm.

```python
print(np.mean(rf_cv_scores))
```

Output:

```bash
0.9666666666666666
```

As we can see the different algorithm `LogisticRegression` and `RandomForestClassifier` gives accuracy scores of `0.9733333333333334` and `0.9666666666666666`. It shows that `LogisticRegression` is better.

If a user were to choose an algorithm to use, a user would choose `LogisticRegression` in building the model. Still, this might not be the best one because we have only compared two algorithms.

The process of building models using different algorithms is tiring. TPOT is the best when dealing with several algorithms.
TPOT combines all the available algorithms for classification and finds the best one. It automates the process of model building and saves a lot of time.

In the next section, we will see how to build a machine learning model using TPOT.

### Model building using TPOT

To use TPOT we install it into our machine. Since we are using [Google Colab](https://research.google.com/colaboratory/) we install TPOT using the following command.

```python
!pip install tpot
```

We then import TPOT as shown.

```python
import tpot
```

### Exploring TPOT Methods and Attributes

We explore the package to know the available methods we can use in model building.

```python
dir(tpot)
```

It will list all the available methods and attributes found in TPOT.

```bash
['TPOTClassifier',
 'TPOTRegressor',
 '__builtins__',
 '__cached__',
 '__doc__',
 '__file__',
 '__loader__',
 '__name__',
 '__package__',
 '__path__',
 '__spec__',
 '__version__',
 '_version',
 'base',
 'builtins',
 'config',
 'decorators',
 'driver',
 'export_utils',
 'gp_deap',
 'gp_types',
 'main',
 'metrics',
 'operator_utils',
 'tpot']
```

In the output, we see the available method, the `TPOTClassifier` method is what we are interested in.
We use `TPOTClassifier` in building our classifier model.

We split our dataset before we begin.

### Splitting dataset

We split our datset into `train_set` and `test_set`.

70% of our data is the`train_set`.
30% is the `test_set`.

```python
x_train,x_test,y_train,y_test = train_test_split(xfeatures,ylabels,test_size=0.3,random_state=42)

```

`x_train` and `y_train` are used in the training phase.
x_test`and`y_test` in the testing phase.

### Initializing our TPOT application

We initialize our TPOT application using the `TPOTClassifier()` method and pass the following parameters.

1. Set `generations=5`
   Generation represents the number of iterations TPOT will run to find an optimal pipeline. Here we shall set the generation to 5.

2. Set `random_state=42`
   Used for reproducibility of our splits.

3. Set `verbosity=2`
   Used to give progress and information about the TPOT operation.

```python
tpot = TPOTClassifier(generations=5,verbosity=2, random_state=42)
```

After initializing TPOT, we fit our model into our dataset.

### Fitting

We fit our `x_train` and our `y_train`.

```python
tpot.fit(x_train,y_train)
```

We will have an optimization process. TPOT will iterate 5 times to find the optimal pipeline.

> NOTE: Make sure you use [Google Colab](https://research.google.com/colaboratory/) to ensure that this process runs faster.

This Optimization process makes TPOT a great tool. By the end of the 5 iterations, we will get an output with the best algorithm to use for model building.
TPOT will also give us the highest accuracy scored by our model.

Useful since it saves the users time by automating the whole process.

After the optimization process, the output is as shown.

```bash
Optimization Progress: 100%
600/600 [05:02<00:00, 2.32pipeline/s]
Gen 1 - Current accuracy score: 0.9714285714285713
Gen 2 - Current accuracy score: 0.9714285714285715
Gen 3 - Current accuracy score: 0.9714285714285715
Gen 4 - Current accuracy score: 0.9714285714285715
Gen 5 - Current accuracy score: 0.9714285714285715

Best pipeline: KNeighborsClassifier(Nystroem(input_matrix, gamma=0.25, kernel=cosine, n_components=4), n_neighbors=20, p=1, weights=distance)
TPOTClassifier(config_dict=None, crossover_rate=0.1, cv=5,
               disable_update_check=False, early_stop=None, generations=5,
               log_file=<ipykernel.iostream.OutStream object at 0x7f05559644a8>,
               max_eval_time_mins=5, max_time_mins=None, memory=None,
               mutation_rate=0.9, n_jobs=1, offspring_size=None,
               periodic_checkpoint_folder=None, population_size=100,
               random_state=None, scoring=None, subsample=1.0, template=None,
               use_dask=False, verbosity=2, warm_start=False)
```

The best algorithm used is KNeighborsClassifier. TPOT has also helped us know the exact parameters used to achieve such optimization. The parameter used is such as `n_neighbors=20`.

Through the 5 iterations, the accuracy scores are as follows: `0.9714285714285713`, `0.9714285714285715`, `0.9714285714285715`, `0.9714285714285715` and `0.9714285714285715`. Therefore our final model accuracy will be `0.9714285714285715`.
IT also gives us the `TPOTClassifier()` method with all the optimal parameters shown above.

After following the stages we end up with an optimal pipeline.

We can finally use TPOT to export the optimized pipeline into a Python file using the `export()` function. The output will be a Python file with the optimized pipeline and the best parameters set for the model.

```python
tpot.export('tpot_ml_pipeline.py')
```

The contents of the `tpot_ml_pipeline.py` file are as shown:

```python
import numpy as np
import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.neighbors import KNeighboursClassifier
from sklearn.pipeline import make_pipeline



tpot_data = pd.read_csv('GIVENPATH', sep=',', dtype=np.float64)
features = tpot_data.drop('target', axis=1)
training_features, testing_features, training_target, testing_target = \
            train_test_split(features, tpot_data['target'], random_state=None)

exported_pipeline = make_pipeline(
    Nystroem(gamma=0.25, kernel=cosine, n_components=4), n_neighbors=20, p=1, weights=distance),
    KNeighboursClassifier(bootstrap=True, criterion="gini", max_features=1.0, min_samples_leaf=7, min_samples_split=16, n_estimators=100)
)

exported_pipeline.fit(training_features, training_target)
results = exported_pipeline.predict(testing_features)
```

These are the best parameters set for our model by TPOT and the best algorithm KNeighboursClassifier.
The location of the above file.
![File Location](/engineering-education/generating-machine-learning-pipelines-with-tpot-in-python/file_location.png)

### Making Predictions

We can use our optimized model to make predictions.
We use the sepal width, sepal length, petal width, and petal length as inputs.

To predict, the input must be in an array as shown.

```python
ex = np.array([6.2,3.4,5.4,2.3]).reshape(1,-1)
```

We can now make predictions using the `predict()` method as shown.

```python
tpot.predict(ex)
```

The prediction outcome is as shown.

```bash
array([2])
```

The outcome is 2 which represents `virginica`.

We can now make a prediction using our TPOT application.

### Conclusion

In the tutorial we have learned about the machine learning pipeline, we have learned how it's important in automating processes. We have also learned about TPOT which is an important library used in generating machine learning pipelines.

This tutorial has helped us to know how to install and use the TPOT library. We have used TPOT to automate processes such as finding the optimized and best algorithm for building a machine learning model.

We started from the start of data-precessing and followed all the processes of building our machine learning model. TPOT is a great tool since it saves the users time through automation of various tasks during model building.

### References

- [Scikit-learn Documentation](https://scikit-learn.org/)
- [Pandas Documentation](https://pandas.pydata.org/)
- [NumPy Documentation](https://numpy.org/)
- [TPOT Documentation](http://epistasislab.github.io/tpot/)
