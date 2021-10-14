##  Implementing Principal Component Analysis (*PCA*) algorithm with sklearn in python
### Introduction to *PCA*
In Machine learning, it is common to come across data sets with hundreds or even thousands of features. Implementing models on such datasets can be challenging in terms of computational cost. Also, models build on high dimensional datasets are prone to the problem of the course of dimensionality. To minimize this problem, we use a technique known as **Dimensionality Reduction**.
*Dimensionality Reduction* involves transforming features of a high-dimensional space dataset to a low-dimensional space. Some of the techniques used in the *dimensionality reduction* include *PCA, Linear Discriminant Analysis(LDA), Kernal PCA, Conical Correlation Analysis (CCA),* etc. Of all these techniques, *PCA* is the most used technique in the *dimension reduction* problem.

The *PCA* algorithm reduces the dimension of a dataset by projecting a d-dimensional space dataset onto k- dimensional subspace were $(k<d)$. This algorithm is used in the problems such as *feature extraction, stock market prediction, Gene analysis*, e.t.c.

PCA involve the following steps:
- Standardizing the data
- Determining the Eigenvalues and the Eigenvectors from the covariance or correlation matrix.
- Sorte the eigenvalues in descending order.
-  Choose the first k eigenvectors corresponding to the k largest eigenvalues where k is the dimension of the new features space, and it's such that $(k<d)$.
-  Constructing a projection matrix M from the selected k eigenvectors.
-  Transform the original dataset X via M to obtain the new k-dimensional feature subspace Y. 
For more knowledge on the mathematical concept behind the PCA algorithm, I recommend you read this [article](https://www.section.io/engineering-education/image-compression-using-pca/).

This article will teach how to implement the PCA algorithm in python using the sklearn library. In this implementation, we will work with a structured dataset that we can download [here]().

### Prerequisites:
- Python installed on your computer
- Python programming skills
- A dataset
  
### Implementing *PCA*
### Step 1: Data preprocessing
The dataset we are applying PCA on in this session consists of features of different types of wine, with the target variable consisting of the customer segment to which a wine belongs. We can download this dataset [here]()

To start with, we shall get our data ready so that we can apply PCA on it.
```python
# importing libraries
import numpy as np
import matplotlib.pyplot as plt
import pandas as pd
# importing the dataset.
dataset = pd.read_csv('/content/drive/MyDrive/Wine.csv')
X = dataset.iloc[:, :-1].values
y = dataset.iloc[:, -1].values
# splitting our dataset into the training and test set.
from sklearn.model_selection import train_test_split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size = 0.2, random_state = 0)
# Feature scalling
from sklearn.preprocessing import StandardScaler
stndS = StandardScaler()
X_train = stndS.fit_transform(X_train)
X_test = stndS.transform(X_test)

```
### Step 2: Applying *PCA* to the dataset
To apply the PCA to our dataset, we shall do so separately on the training and test sets. The following syntax carries out this task.

```python

from sklearn.decomposition import PCA
pca = PCA(n_components = 2)# extracted features we want to end up with in our new dataset(2).
# applying the above object to our dataset
X_train = pca.fit_transform(X_train)
X_test = pca.transform(X_test)

```
### Step 3: Training the logistic model on the new training dataset
Here we shall build a logistic regression on the training set whose dimension was reduced using PCA.

```python
from sklearn.linear_model import LogisticRegression
clfy = LogisticRegression(random_state = 0)
clfy.fit(X_train, y_train)

```
### Step 4: Printing the confusion matrix and the accturacy of our logistic regression model.
```python
from sklearn.metrics import confusion_matrix, accuracy_score
y_pred = classifier.predict(X_test)
cm = confusion_matrix(y_test, y_pred)
print(cm)
accuracy_score(y_test, y_pred)

```
### Results
```bash
[[14  0  0]
 [ 1 15  0]
 [ 0  0  6]]
0.9722222222222222

```
From our results above, we notice the model we implemented on our new dataset has an accuracy of 97.2%. This is an indication that not only was the PCA was able to reduce the model complexity by reducing the original thirteen features to two, but also it was able to preserve a lot of the information in the dataset. Actually, the initial dataset on implementation yields an accuracy of 100%. The model on the original dataset though very accurate, it's too complex, and it's likely to suffer from the *curse dimensionality*. Since the PCA is able to simplify a model and preserve its performance at the same time, it is proof that the PCA algorithm is powerful. With its aid, datasets in high dimensions, like the one we are working on, can be reduced to lower dimensions such that it's possible to make visualization on them. For instance, we couldn't have visualized our dataset in thirteen dimensions, but upon reducing it to two dimensions, we have the following visualization.
### Visualizing the training set result
```python
from matplotlib.colors import ListedColormap
X_set, y_set = X_train, y_train
X1, X2 = np.meshgrid(np.arange(start = X_set[:, 0].min() - 1, stop = X_set[:, 0].max() + 1, step = 0.01),
                     np.arange(start = X_set[:, 1].min() - 1, stop = X_set[:, 1].max() + 1, step = 0.01))
plt.contourf(X1, X2, classifier.predict(np.array([X1.ravel(), X2.ravel()]).T).reshape(X1.shape),
             alpha = 0.75, cmap = ListedColormap(('red', 'green', 'blue')))
plt.xlim(X1.min(), X1.max())
plt.ylim(X2.min(), X2.max())
for i, j in enumerate(np.unique(y_set)):
    plt.scatter(X_set[y_set == j, 0], X_set[y_set == j, 1],
                c = ListedColormap(('red', 'green', 'blue'))(i), label = j)
plt.title('Logistic Regression (Training set)')
plt.xlabel('PC1')
plt.ylabel('PC2')
plt.legend()
plt.show()

```
### Output

```bash
*c* argument looks like a single numeric RGB or RGBA sequence, which should be avoided as value-mapping will have precedence in case its length matches with *x* & *y*.  Please use the *color* keyword-argument or provide a 2-D array with a single row if you intend to specify the same RGB or RGBA value for all points.
*c* argument looks like a single numeric RGB or RGBA sequence, which should be avoided as value-mapping will have precedence in case its length matches with *x* & *y*.  Please use the *color* keyword-argument or provide a 2-D array with a single row if you intend to specify the same RGB or RGBA value for all points.
*c* argument looks like a single numeric RGB or RGBA sequence, which should be avoided as value-mapping will have precedence in case its length matches with *x* & *y*.  Please use the *color* keyword-argument or provide a 2-D array with a single row if you intend to specify the same RGB or RGBA value for all points.
```
![image](/engineering-education/logistic-regression-in-python/image.png)

**Understanding the plot**

### Visualizing the test set result
```python
from matplotlib.colors import ListedColormap
X_set, y_set = X_test, y_test
X1, X2 = np.meshgrid(np.arange(start = X_set[:, 0].min() - 1, stop = X_set[:, 0].max() + 1, step = 0.01),
                     np.arange(start = X_set[:, 1].min() - 1, stop = X_set[:, 1].max() + 1, step = 0.01))
plt.contourf(X1, X2, classifier.predict(np.array([X1.ravel(), X2.ravel()]).T).reshape(X1.shape),
             alpha = 0.75, cmap = ListedColormap(('red', 'green', 'blue')))
plt.xlim(X1.min(), X1.max())
plt.ylim(X2.min(), X2.max())
for i, j in enumerate(np.unique(y_set)):
    plt.scatter(X_set[y_set == j, 0], X_set[y_set == j, 1],
                c = ListedColormap(('red', 'green', 'blue'))(i), label = j)
plt.title('Logistic Regression (Test set)')
plt.xlabel('PC1')
plt.ylabel('PC2')
plt.legend()
plt.show()

```
## Output

```bash
*c* argument looks like a single numeric RGB or RGBA sequence, which should be avoided as value-mapping will have precedence in case its length matches with *x* & *y*.  Please use the *color* keyword-argument or provide a 2-D array with a single row if you intend to specify the same RGB or RGBA value for all points.
*c* argument looks like a single numeric RGB or RGBA sequence, which should be avoided as value-mapping will have precedence in case its length matches with *x* & *y*.  Please use the *color* keyword-argument or provide a 2-D array with a single row if you intend to specify the same RGB or RGBA value for all points.
*c* argument looks like a single numeric RGB or RGBA sequence, which should be avoided as value-mapping will have precedence in case its length matches with *x* & *y*.  Please use the *color* keyword-argument or provide a 2-D array with a single row if you intend to specify the same RGB or RGBA value for all points.


```
![image](/engineering-education/logistic-regression-in-python/logistic_test_set.png)
This plot makes it possible to make visual inferences.

### Conclusion
In this article, we've learned steps involve in the PCA algorithm. Lastly, we showed how to implement this algorithm in python. Our implementation showed the importance of PCA, such as reducing the complexity of a model and enhancing visualization by reducing high dimension features to low visible dimensions. Now that we have seen how great this algorithm is, we can apply it to other datasets with large dimensions and get rid of the computational cost associated with such high dimensions. Here is the end of our learning.
