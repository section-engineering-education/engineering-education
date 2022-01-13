
### Hyper-Parameter Tuning in Decision Trees and Random Forests

After years of hard work, we've reached a stage where we are using computers to analyze millions of data points and provide insights that even the human eye couldn't catch. But our Machine Learning Model is only as good as its accuracy on unseen data, i.e "how well our model generalizes". In this article, I'll solve a Binary Classification Problem, using a Decision Tree Classifier and Random Forests to solve the over-fitting problem by tuning their hyper-parameter and comparing results.

Before we begin, I expect you to have some working knowledge of python and some basic understanding of what Machine Learning does. If you're new to Decision Trees entirely, you can still go ahead and begin reading. Irrespective, let me begin with a brief introduction to Machine Learning. 

#### Machine Learning 
Machine Learning is the practice of emulating a human being's learning and reasoning ability along with the continuous enhancement of results with every additional data input. This is also called continual learning. *Any new input entered, will contribute to the accuracy of the algorithm, hence they learn from experience like the human brain.*
 

Based on these algorithms we create a model and train it over a set of data to recognize certain patterns.

###### Dataset used:
 For this article, I have used the [heart disease prediction](https://www.kaggle.com/sulianova/cardiovascular-disease-dataset) dataset. It consists of almost 70,000 rows of data points with 12 columns, featuring a person's medical record. Before getting into Decision Trees and Random Forests, I've done all the necessary preprocessing on this dataset, you can find the code hosted on [Jovian here](https://jovian.ai/himani007/heart-disease-prediction). 

Now, let's get to the models in hand :)

#### Decision Tree 
Decision Trees are powerful machine learning algorithms that are capable of performing both regression and classification tasks. To understand a decision tree, let's look at an inverted tree-like structure (Like that of a family tree). We start at the root of the tree that contains our training data. At the root, we split our dataset into distinguished leaf nodes following certain conditions like using an if/else loop.

![Image depicting a hierarchical series of decisions](/engineering-education/Hyperparameter-Tuning/tree_one.png)

These splitting criteria are carefully calculated using a splitting technique. We'll understand a few of them in the **_working of a decision tree_** further. 

So all-in-all, decision trees are **a hierarchical series of binary decisions** and the antecedent nodes are simply the best split for the available training data at each level of our decision tree.

#### Working of a Decision Tree 
To understand how our model splits our training data and grows into a decision tree, we need to understand some fundamental splitting parameters that it uses to define those conditions, like Gini Index, Entropy, Information Gain, etc...

##### Gini Score/ Gini Index:
Every Machine Learning model has a loss function or a cost function, whose objective is to minimize the cost. i.e the tentative distance between the predicted value and actual value. (For classification problems, probabilities of predicted class are used). **Gini Index** is the **loss function** used by decision trees to decide which column should be used for splitting the data, and at what point the column should be split.

$$
Lower\space Gini\space Score \iff Lower\space Cost \iff Good\space Split
$$
⭐️ A perfect split with only two features and two classes has Gini Index = 0.


##### Entropy: 
Entropy is the measure of **randomness** or *disorders* in a system. In terms of data, we can define it as the randomness in the information we are processing. Higher the randomness, higher the entropy. Hence, harder to draw conclusions from that information. Mathematically, entropy is calculated as :

$$
entropy = - \sum_{i = 1}^{k}{P(value_i).{log_2}(P(value_i))}
$$
 
##### Information Gain:
Information gain or **IG** measures how much information is provided by a given attribute/feature about a certain target class. While constructing a decision tree, the goal is **to find the attribute with the highest Information Gain and the lowest entropy.** It is calculated as the difference in the entropy before and after the split. i.e,

$$
I_{gain} = Entropy_{before} - Entropy_{after}
$$

_This is how information gain and entropy are used to improve the quality of splitting._

**NOTE:** While using Information Gain as a criterion, we assume attributes to be _categorical_, and for the Gini index, attributes are assumed to be _continuous_. For our dataset, we will work with Gini Index. 


**Working:**

- While training, our decision tree model evaluates all possible splits across all possible columns and picks the best one, i.e the one with the lowest Gini Score.  
- With the first split, all the data according to a specific condition falls towards either the left or the right of the root node.
- Now, for each side of training data under the root node, all possible splits are calculated again and the split with the lowest Gini Index is chosen. The process repeats for both left and right sides till we reach the terminating nodes representing a class in the target column.

![tree.gif](/engineering-education/Hyperparameter-Tuning/tree.gif)

🌳 **_This way , our decision tree grows iteratively, layer by layer._**

##### Training and Visualizing Decision Trees
```
from sklearn.tree import DecisionTreeClassifier
model2 = DecisionTreeClassifier(random_state=42)
model2.fit(train_inputs, train_targets)
```

**Please note,** I have split the training data into **train, validation, and test sets,** which is another very important step in preprocessing.

For visualization, make sure you have imported the necessary libraries like matplotlib, seaborn, etc. We can visualize a decision tree using `plot_tree` from sklearn.

```
#Visualizing a Decision Tree
from sklearn.tree import plot_tree, export_text
plt.figure(figsize =(80,20))

plot_tree(model2, feature_names=train_inputs.columns, max_depth=2, filled=True);
```

![visualize_output.png](/engineering-education/Hyperparameter-Tuning/visualize_output.png)

You can create the tree to whatsoever depth using the `max_depth` attribute, I've only shown two layers in the output above. Let's break the blocks in the above visualization:

- **ap_hi≤0.017,** is the condition on which the data is being split. (_where ap_hi is the column name_)
- **Gini:** The Gini Index. Although the root node has a Gini index of 0.5, which is not so great we can imagine how the other Gini scores would have looked like. 
- **Samples:** The number of data rows prior to the split.
- **Values=[x,y]:** Provides the split rows of training data into the following leaf nodes. Since we are doing binary classification, there are only two values.

##### Evaluation, Overfitting, and Regularization 
Now, that we've trained our model, let's calculate its accuracy on training and validation sets. I have evaluated the model using `accuracy score` and `confusion matrix`, I won't get into it but you can choose any evaluation metrics you're comfortable with.

```
from sklearn.metrics import accuracy_score, confusion_matrix
```


Following are the results with basic implementation of Decision Trees:
![Overfitting_1.png](/engineering-education/Hyperparameter-Tuning/Overfitting_1.png)

It is axiomatic in the results above that our model is not performing well on data it has not been trained upon, but giving incredulous results on training data. This simple phenomenon is called **Overfitting**. This is happening because our model has memorized all the training examples.

**Regularization:** The process of reducing overfitting. Regularization is done differently in regression models. But for a decision tree classifier, we will perform regularization by providing additional arguments accepted by `DecisionTreeClassifier`. These arguments provided by us to revamp our model are called **HyperParameters.**

**Hyperparameter and parameters? :** Parameters are the model features that the model learns from the data. Whereas, HyperParameters are arguments accepted by a model-making function and can be modified to reduce overfitting, leading to a better generalization of the model.

##### Hyperparameter Tuning in Decision Trees
This process of calibrating our model by finding the right hyperparameters to generalize our model is called **HyperParameter Tuning.** We will look at a few of these hyperparameters:

###### a. Max Depth: 
This argument represents the maximum depth of the tree. If not specified, the tree is expanded until the last leaf nodes contain a single value. Hence by reducing this meter, we can prevent the tree from memorizing all training samples.

![max_depth_1.png](/engineering-education/Hyperparameter-Tuning/max_depth_1.png)

- We can check the current maximum depth of our decision tree with `model2.tree_.max_depth`. 
- We can see that even though the training accuracy has reduced, the validation accuracy has gone up.

Since we are not sure what depth our ideal model would have, we can run a for loop from a range of numbers to find out. You can see below, I've used this basic for loop to print the training and validation accuracy of my model across the range 1–21.
```
for md in range(1,21):
  model = DecisionTreeClassifier(max_depth=md, random_state=42) 
  model.fit(train_inputs, train_targets)
  print('Training Accuracy for max_depth {} is:'.format(md), model.score(train_inputs, train_targets))
  print('Validation Accuracy for max_depth {} is:'.format(md), model.score(val_inputs,val_targets))
  print('')
```

By carefully looking at the results we can find out the max_depth value where the validation accuracy starts decreasing and the training accuracy starts mounting inordinately.
![Max_depth_result1](/engineering-education/Hyperparameter-Tuning/max_depth_result1.png)

Like you can see above, in my case the appropriate max_depth=8.

To get a better understanding I've even plotted the resulting accuracies. You can see the curve where the model incipients overfitting.

![accuracy_graph.png](/engineering-education/Hyperparameter-Tuning/accuracy_graph.png)

###### b. Max Leaf Nodes:  
As the name suggests, this hyperparameter caps the number of leaf nodes in a decision tree. This will allow the branches of a tree to have varying depths, another way to control the model's complexity.
![max_leaf_nodes.jpg](/engineering-education/Hyperparameter-Tuning/max_leaf_nodes.jpg)

- **How?:** In this case, the model will not find the best split layer by layer. Instead, it will look at all the possible splits (left and right) and only split the node with the lowest Gini Value, irrespective of the level. 
- To change the number of maximum leaf nodes, we use: `max_leaf_nodes`

![max_leaf_node_implementation1](/engineering-education/Hyperparameter-Tuning/max_leaf_node1.png)

Here is the result of my model's training and validation accuracy at different values of `max_leaf_node` hyperparameter.
![max_leaf_node_result](/engineering-education/Hyperparameter-Tuning/max_leaf_node.png)

									--🌴--🌳--🌲--

While tuning the hyperparameters of a single decision tree is giving us some improvement, a more effective stratagem is to combine the results of several decision trees with slightly different parameters. Which is what we will understand in a **random forest.** So let's practice some other hyperparameters like `max_features`, `min_samples_split`, etc...under random forests.

#### Random Forests: 
Random forests are supervised  machine learning models that fit a number of decision trees and combine the outcome by averaging their results. Each decision tree will make different kinds of errors and upon averaging many of their errors will cancel out. _This general technique of combining results of many models is called **"Emsembling"**._ Or very famously said **"Wisdom of the crowd"**.

![random_forest.png](/engineering-education/Hyperparameter-Tuning/random_forest.png)

```
from sklearn.ensemble import RandomForestClassifier
model3 = RandomForestClassifier(n_jobs = -1, random_state = 42)
model3.fit(train_inputs, train_targets)
```

**Note:** In the above code the function of the argument `n_jobs = -1` is to train multiple decision trees parallelly.

We can access individual decision trees using `model.estimators_`. And just like how we visualized a decision tree prior in the article, we can visualize each decision tree inside a random forest separately.

##### Hyper-parameter Tuning in Random Forests
To compare results, I've created a base model without any hyperparameters.

![random_base_model.png](/engineering-education/Hyperparameter-Tuning/random_base_model.png)

Arguments like `max_leaf_nodes` and `max_depth` that we did above, are passed directly to each decision tree and control the depth and maximum nodes of each tree respectively. Now let's explore some other hyperparameters:

###### c. n_estimators: 
This argument controls the number of decision trees in the random forests. The default value is 100. For larger datasets, it's better to have a greater number of estimators. 

```
model = RandomForestClassifier(random_state=42, n_jobs=-1, n_estimators=10)
model.fit(train_inputs, train_targets)
```

🌟 But, as a general rule: Keep the estimators as low as possible. For example: In my model, the validation accuracy at 100 and 200 estimators is approximately the same. So in such cases, I shall stick to the lower number of estimators.

![n_estimator.png](/engineering-education/Hyperparameter-Tuning/n_estimator.png)

###### d. max_features:
Instead of picking all features for all splits, we can specify that only a fraction of columns should be chosen. Meaning,

Each time a split is to occur, the model will only consider a fraction of columns. This will help to generalize our random forest model because if every time, all the features are considered at all splits… the random forest model will contain identical trees.

Hence, `max_features` will help to make each tree in the forest different. The default value for this is "auto" which is equivalent to the square root of the no. of features. Other values are: "log2", "sqrt" and None. I got approximately the same results for all cases in my model. 

![max_features.png](/engineering-education/Hyperparameter-Tuning/max_features.png)

###### e. min_samples_split: 
Minimum samples split represents the minimum number of samples required to split an internal node. By default, the decision tree tries to split every node that has two or more rows of data inside it. This can again cause memorization of training data, resulting in a lesser generalized model.

Higher values prevent a model from learning relations that might be highly specific to a particular sample selected for a tree. Too high values can also lead to under-fitting the model hence depending on the model's level fitting the data, you can tune the values for `min_samples_split`.

![min_samples_split.png](/engineering-education/Hyperparameter-Tuning/min_samples_split.png)

**Note:** The `test_params` function used above has the following code. It's used to test different hyper parameters and returns the training and validation accuracy. 
```
def test_params(**params):
    model = RandomForestClassifier(random_state=42, n_jobs=-1, **params).fit(X_train, train_targets)
    return model.score(X_train, train_targets), model.score(X_val, val_targets)
```


###### f. min_samples_leaf:
Minimum sample leaf may sound like minimum sample split, and is somewhat similar too but in this case, we are talking about the minimum number of samples required to be left at the **leaf node**. A split will only be considered if, there is a minimum of `min_samples_leaf` samples on the left and right branches.

###### g. min_impurity_decrease:
This argument is used to control the **threshold for splitting nodes**. i.e A split will only be split if it induces a decrease of the Gini Impurity greater than or equal to the `min_impurity_decrease` value. It's default value is 0, and we can modify it to reduce over-fitting. 

Since the number of features in my dataset is very limited, I didn't try this particular hyperparamter. 

Some default hyperparamters used in random forests are Bootstrapping.

###### Bootstrap:
By default, Random Forests do not use the entire dataset for training each decision tree. Instead, for each tree, rows from the dataset are picked one by one randomly, with repetition. i.e While training, some rows may not show up at all, whereas some might show up twice. This random picking is done for the entire dataset.  

You can change `default=False` to disable it, and in that case, the entire dataset will be used to create decision trees.

---

There are a list of **other hyperparameters** to explore when it comes to decision trees and random forests. Being powerful models, they can be very difficult to generalize and easy to memorize the training examples. Hence.. go ahead and explore all the arguments that the `DecisionTreeClassifier` and `RandomForestClassifier` functions permit. 
That is it from me, I hope this article is useful or helps you find what you were looking for. Happy coding :))



##### Resources:
- Jovian's free intro course on ML: https://jovian.ai/himani007/sklearn-decision-trees-random-forests#C73
- https://www.numpyninja.com/post/what-is-entropy-and-information-gain-how-are-they-used-to-construct-decision-trees
- https://www.kdnuggets.com/2020/01/decision-tree-algorithm-explained.html
