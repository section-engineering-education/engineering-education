# Saving and Loading Stacked Ensemble Classifiers in ONNX format in Python

Stacked ensemble models are learners that increase predictive performance over stand-alone learners by combining the results of two or several models and running them through a meta-learner. The stacked models are different (not a single type), unlike in bagging methods (just decision trees) and each of the model in the stack does not correct the predictions of the previous ones as it happens in boosting. You can learn how to build one on [this](https://www.section.io/engineering-education/ensemble-learning-based-regression-model-using-python/) Sections article by Adhinga Fredrick.


Open Neural Network Exchange (ONNX) is an open source format for deep and traditional machine learning developed by Microsoft that has a unified schema for saving models despite the library they were developed in. Launched in December 2017, it gives data scientists and Machine learning engineers a way to persist models without worrying about platform inconsistencies and library version deprecation.
It is also key as a means to avoid vendor lockin since ONNX models can be deployed on any platform - not just where they were trained.
Container-based methods of pushing models to production like Docker can also be by-passed altogether.

Saving this type of a model in ONNX format and using it in production can prove challenging as this scenario is not adequately documented.
So how can stacked ensembles be serialized using ONNX?

## Table of Contents
  1. Preparing the environments
  2. Importing and preparing the data
  3. Building and evaluating the classifier
  4. Serializing the model to ONNX format
  5. Loading the model using ONNX runtime Inference Session

### Prerequisites
  1. Basic knowledge of Python
  2. Machine learning model building, evaluation and validation in Scikit-Learn
  3. Basic data manipulation skills
  4. Python(with pip,numpy,pandas and Scikit-Learn) installed on your computer, or an online environment like Google Colab or Kaggle


### Goals of the Tutorial
In this article, you will learn how to:
  - install ONNX and onnxruntime
  - determine the ONNX input initialtypes 
  - serializing and saving a stacked ensemble to ONNX format
  - loading it to production using an Onnx runtime Inference session.

### Setting up environments

To install ONNX and onnxruntime on a local environment, run the following commands;

+ If using pip, on your terminal;
```
pip install onnx
```
and 
```
pip install onnxruntime
```

+ If using anaconda, on anaconda terminal;
```
conda install -c conda-forge onnx
```
and
```
conda install -c conda-forge onnxruntime
```

Note: ONNX is not pre-installed in the runtime environments on Google Colab and Kaggle notebooks

To install ONNX and onnxruntime on Google Colab or Kaggle, run;
```
!pip install onnx
```
and
```
!pip install onnxruntime
```
**Note:** Online editors like repl.it may fail to run the code below in full due to in-sufficient memory allocations.

### Importing and preparing the data
Let's start by importing pandas and the data
```python
import pandas as pd
path='https://raw.githubusercontent.com/iannjari/datasets/main/diabetes.csv'
df=pd.read_csv(path,engine='python')
df
```
Output:

![Image by author](df1.PNG)
*Image by author*

We will seperate the data columns from the label/target, "Outcome";

```python
target_name = "Outcome"
target = df[target_name]

data = df.drop(columns=[target_name])
data
```
Split the data into training and testing partitions;

```python
from sklearn.model_selection import train_test_split
x_train, x_test, y_train, y_test = train_test_split(
    data,target, test_size=0.33, random_state=42)
```

### Training and evaluating the stacked classifier
We shall employ a stack with a randomForest, kNN classifier, GradientBoosting classifier and a logistic regressor as a final model.
Import packages;

```python
from sklearn.ensemble import (RandomForestClassifier, StackingClassifier, GradientBoostingClassifier)
from sklearn.linear_model import LogisticRegression
from  sklearn.model_selection import train_test_split
from sklearn.neighbors import KNeighborsClassifier
from sklearn.pipeline import make_pipeline
```
Initialize the stack;
```python
clf=StackingClassifier(estimators=[
            ("rf",RandomForestClassifier(n_estimators=10,random_state=42)),
            ("gb",GradientBoostingClassifier(n_estimators=10,random_state=42)),
            ("knn",KNeighborsClassifier(n_neighbors=5))],final_estimator=LogisticRegression())
```
Make a pipeline, fit it on training data, and score it on test data;

```python
pipeline = make_pipeline(
            StackingClassifier(estimators=[
            ("rf",RandomForestClassifier(n_estimators=10,random_state=42)),
            ("gb",GradientBoostingClassifier(n_estimators=10,random_state=42)),
            ("knn",KNeighborsClassifier(n_neighbors=5))],final_estimator=LogisticRegression()))

pipeline.fit(x_train,y_train)
pipeline.score(x_test,y_test)
```
Output:
```
0.7716535433070866
```
Evaluate the model using a confusion matrix;
```python
from sklearn.metrics import confusion_matrix
preds=pipeline.predict(x_test)
c_matrix=confusion_matrix(y_test, preds)
tn, fp, fn, tp = c_matrix.ravel()
precision= tp/(tp+fp)
misclassification= (fp+fn)/(tn+fn+tp+fp)
f_one=tp/(tp+0.5*(fp+fn))

print('Precision=',precision)
print('Misclassification=',misclassification)
print('F1 score=',f_one)
```
Output:
```
Precision= 0.6842105263157895
Misclassification= 0.2283464566929134
F1 score= 0.6419753086419753
```

Now that the model is rained and scoring well, lets save it and infer from it.

### Saving the model
To serialize(save) the model, we need to import ``` convert_sklearn``` from the  ```skl2onnx``` package. We also need to import ```common.data_types``` to define the types of our features 
as a parameter ``` initial_types```

```python
from skl2onnx import convert_sklearn
from skl2onnx.common.data_types import FloatTensorType
```

The ```convert_sklearn``` function requires a parameter ```initial_types``` to save the model.
Each type of data type in the data columns must be assigned to this parameter.
For example, if the data contains 3 columns of floats followed by 2 String types, and 1 int64, then the following would be the declaration;
```python
initial_types =  [('feature_input', FloatTensorType([None, 3])),
                   ('feature_input', StringTensorType([None, 2])),
                   ('feature_input', FloatTensorType([None, 1]))]
```
In our case, our data has 8 Float types.

**Note**: Int can be treated as float
So we shall make the variable ```initial_types``` as;

```python
initial_types =  [('feature_input', FloatTensorType([None, 8]))]
```
We will go ahead and save the model by passing the model ```pipeline``` and types ```initial_types``` to the ```convert_sklearn``` function.
```python
onx = convert_sklearn(pipeline,
                      initial_types=
                      initial_types)

with open("stacked_clf.onnx", "wb") as f:
    f.write(onx.SerializeToString())
```
The model is saved sucessfully.


***Note:** If establishing the initial types is challenging, for example, the data has too many features, the ```to_onnx``` method handles this directly for you.
You just need to pass the x test data (or one of it's column) as an argurment and ONNX extracts it automatically.

```python
# Use a section of data instead of x_test to avoid key errors
x=data.loc[44].to_numpy(dtype='float32')
# Give x as a keyword argument by using X=x
# Note case-sensivity
onx=skl2onnx.to_onnx(pipeline, X=x)

with open("stacked_clf.onnx", "wb") as f:
    f.write(onx.SerializeToString())
```


### Loading the model using ONNX runtime Inference Session
To make predictions from the model, import ```onnxruntime``` and from it, call ```InferenceSession```.
```python
import onnxruntime as rt
sess = rt.InferenceSession("stacked_clf.onnx")
input_name = sess.get_inputs()[0].name
label_name = sess.get_outputs()[0].name
pred_onx = sess.run([label_name], 
                 {input_name:
                   x_test.to_numpy(dtype='float32')})
```
```x_test``` can be replaced by an array of the shape and type of the test data

Let us see our predictions:
```python
pred_onx
```
Output:
```
[array([0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0,
        0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 0, 1, 1, 0, 0, 1, 0, 0, 1, 0,
        0, 1, 0, 0, 0, 1, 0, 1, 1, 0, 0, 0, 1, 0, 0, 1, 1, 0, 0, 0, 0, 1,
        0, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 0,
        0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 1,
        0, 1, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1,
        0, 0, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0,
        0, 0, 0, 1, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 1, 1, 0, 1, 1, 1, 0,
        0, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0,
        0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 1, 0, 1,
        1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0,
        1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0], dtype=int64)]
```        
###  Conclusion
In this tutorial, you learnt how to install ONNX and onnxruntime, determine ONNX input initialtypes, serializing and saving a stacked ensemble to ONNX format and finally loading it to production using an Onnx runtime Inference session.
This model can now be served through a Web App framework like Streamlit and Dash, used in the backend (Django, Flask) or an API.
In case of a hard nut to crack with ONNX you can raise an issue on [onnx's github](https://github.com/onnx/sklearn-onnx/issues)

Happy ML-ing!

### References
[Tutorial on Building an Ensemble Learning Based Regression Model using Python](https://www.section.io/engineering-education/ensemble-learning-based-regression-model-using-python/), *Adhinga Fredrick, Sections Engineering*

[ONNX Homepage](https://onnx.ai/)

[ONNX sklearn documenation](http://onnx.ai/sklearn-onnx/introduction.html)

[Common errors with onnxruntime](http://onnx.ai/sklearn-onnx/auto_examples/plot_errors_onnxruntime.html?highlight=errors)



