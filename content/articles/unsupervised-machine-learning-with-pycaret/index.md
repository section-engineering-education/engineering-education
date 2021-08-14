Unsupervised machine learning is a type of machine learning where the model is trained using an unlabeled dataset. The model is supposed to find the hidden patterns and information from the given dataset by itself.
Unsupervised machine learning is categorized into Clustering and Association.

1. Clustering.
   Clustering involves grouping different objects into clusters, such that objects with the most similarities will be placed in one group and those that have little or no similarity in another.
   The usefulness of clustering.
   - [Pattern recognition.](https://en.wikipedia.org/wiki/Pattern_recognition)
   - [Image Analysis.](https://en.wikipedia.org/wiki/Image_analysis)
   - [Search engines, image search.](https://www.google.com/imghp?hl=EN)
   - [Customer and market segmentation.](https://www.yieldify.com/blog/types-of-market-segmentation/)
   - [Outlier Detection in credit fraud detection.](https://towardsdatascience.com/a-brief-overview-of-outlier-detection-techniques-1e0b2c19e561)
   - [Clustering of different documents together.](https://en.wikipedia.org/wiki/Document_clustering)
   - [Recommending similar songs, videos, and movies](https://www.analyticsvidhya.com/blog/2020/11/create-your-own-movie-movie-recommendation-system/) as used in big companies such as YouTube, Spotify, Netflix, and Spotify.
2. Association
   Allows you to find how different data models in a dataset relate and how their relationships affect the whole dataset.
   Association is used in market basket analysis, used to determine which products will be bought together.

In this tutorial, we shall use Pycaret to perform clustering, which is used in clustering countries into their respective continents.

Pycaret is a powerful open-source library in python that is used as a wrapper around several popular Machine learning and Data Science libraries in building a machine learning model.

This tutorial will teach the reader to learn the basics of Pycaret before you can advance into building our machine learning model.
As compared to other machine learning libraries such [Scikit-learn](https://scikit-learn.org/), Pycaret is simple and easy to use due to fewer lines of code that one has to write. This increases the productivity of a developer since the developer spends less time coding.

### Table of contents

- [Prerequisites](#prerequisites)
- [Installing Pycaret library and other dependencies](#installing-pycaret-library-and-other-dependancies)
- [Loading the installed packages](#loading-the-installed-packages)
- [Loading dataset](#loading-dataset)
- [Import Pycaret](#import-pycaret)
- [Initialize setup](#initialize-setup)
- [Building Model](#building-model)
- [Assigning Clusters](#assigning-clusters)
- [Scatter plot](#scatter-plot)
- [Map scatter plot onto the world map](#map-scatter-plot-onto-the-world-map)
- [Making Prediction](#making-prediction)
- [Conclusion](#conclusion)
- [References](#references)

### Prerequisites

1. Install [Python](https://www.python.org/) into your machine.
2. Good working knowledge with either [Jupyter Notebook](https://jupyter.org/) or [Google Colab](https://research.google.com/).
3. Good working knowledge with [Python](https://www.python.org/).
4. Have the latest version of [Pycaret](https://pycaret.org/) installed in your machine.
5. Have technical knowledge about [Google Colab](https://colab.research.google.com/).
   > NOTE: We will be using [Google Colab](https://colab.research.google.com/) in this tutorial since it is a powerful notebook for building a model.

### Installing Pycaret library and other dependencies

We start by installing our main library which is Pycaret, this is what we will be using in building our clustering model.
Since we are using [Google Colab](https://colab.research.google.com/) use the following command to install Pycaret.

```python
!pip install pycaret
```

We also need to install other dependencies such as [Pandas](https://pandas.pydata.org/), [Matplotlib](https://matplotlib.org/) and [Seaborn](https://seaborn.pydata.org/).

1. Pandas.

   Pandas is used for data manipulation and analysis, it's also used for importing and reading our CSV file dataset.

2. Matplotlib.

   This will be used as a plotting library and is used for visualization purposes through the drawing of statistical graphs.

3. Seaborn.

Seaborn is also used for data visualization and is built on top of the Matplotlib library and builds more intuitive graphs.

We use the following command to install the above libraries.

```python
pip install pandas matplotlib seaborn
```

### Loading the installed packages

To use these packages, we need to load them into our machine.

```python
import pandas as pd
```

```python
import matplotlib.pyplot as plt
import seaborn as sns
%matplotlib inline
```

### Loading dataset

We need to load the dataset using `Pandas`, this dataset will be used to build and train our model.

The dataset used is made up of four columns namely: `country`, `latitude`, `longitude`, and `name` as shown below.

![Dataset snip](/engineering-education/unsupervised-machine-learning-with-pycaret.dataset.png)
[CSV File of our data](https://drive.google.com/file/d/1x4k50gp45TYpFtzmi2yEXuJxS8Bpg0PC/view?usp=sharing)

In the above link, you can download the CSV file of our dataset so that we can be able to load it into our machine. Name the downloaded dataset as `countries_dataset.csv`.

We can now use Pandas to read our dataset.

```pyton
df = pd.read_csv("countries_dataset.csv")
```

We can now use the following command to see our loaded data.

```python
df.head
```

### Import Pycaret

We have to import Pycaret so that we can start using it in building our model.

```python
import pycaret.clustering as pc
```

### Initialize setup

We initialize our setup by using the `setup()` method. During initialization also ignore `country` and `name` columns since we will not need them when building our clustering model.
Our new data will have only two columns: `longitude` and `latitude`.
We also save our initialized setup into a variable named `cls`.

```python
cls = pc.setup(df, ignore_features=['country', 'name'])
```

During this phase, the user is prompted to either quit or continue the initialization process. This happens to make sure that the user wants to ignore the two columns `country` and `name` columns.

![Output](/engineering-education/unsupervised-machine-learning-with-pycaret.output.png)

If the user wishes to continue, the user is supposed to just type in `y` and the initialization process will continue.

If the user types in `y` the process will continue and the setup will run to completion as shown below.

![Setup completed](/engineering-education/unsupervised-machine-learning-with-pycaret.setup_completed.png)

After the setup is successful, we can now start building the model.

### Building model

To build our model, we need to know the clustering algorithm to use.
We shall use the K-Means clustering algorithm due to the following reasons.

- A user can implement it easily.
- K-Means is a fast algorithm as compared to the other algorithm.
- K-Means algorithm is more scalable to a huge dataset.
- They usually give a higher accuracy score when building a model.

Other common algorithms used for clustering are as follows.

1. [Density-Based Spatial Clustering of Applications with Noise](https://machinelearningmastery.com/clustering-algorithms-with-python/)
2. [Balanced Iterative Reducing and Clustering using Hierarchies](https://machinelearningmastery.com/clustering-algorithms-with-python/)
3. [Agglomerative Hierarchical Clustering](https://towardsdatascience.com/the-5-clustering-algorithms-data-scientists-need-to-know-a36d136ef68)
4. [Mean-Shift Clustering](https://towardsdatascience.com/the-5-clustering-algorithms-data-scientists-need-to-know-a36d136ef68)

For this tutorial, we will go with [K-Means Algorithm](https://towardsdatascience.com/the-5-clustering-algorithms-data-scientists-need-to-know-a36d136ef68) due to the reasons stated above.
To start using the K-Means algorithm, we need to specify the number of clusters in which we want our countries to be grouped according to their similarities.
The number of clusters specified will be `7`, `7` is the number of continents in which we want the countries to be clustered.

```python
km = pc.create_model('kmeans', num_clusters=7)
```

The above code snippet initializes our `KMeans algorithm` using the `create_model()` method and also specifies the number of clusters to use.

### Assigning Clusters

In this section we need to assign our 7 clusters into their respective data, this ensures that a country is placed into the right cluster, countries that belong to the same content should be placed in the same cluster. This is done using the `assign_model(km)` as shown below.

```python
km_df = pc.assign_model(km)
```

To see how the different countries are assigned clusters, use the following command.

```python
km_df.head()
```

The output is as shown below.

![Output of clusters](/engineering-education/unsupervised-machine-learning-with-pycaret.clusters_output.png)

As shown above, the United Arab Emirates and Afghanistan have been assigned the same cluster since they belong to the same continent.

### Scatter plot

A scatter plot gives a visualization of how our different countries are clustered using the following code snippets.

```python
km_df2 = km_df.copy()
```

```python
km_df2['Cluster'] = km_df2['Cluster'].str.replace('Cluster').apply(int)
```

The above code snippet allows us to replace the third column of the dataset with integer values so that it makes it easy when plotting a scatter plot.
After we have converted our third column from `str` (string) to an `int` (integer), we can start to plot our scatter plot.

We can use the following code snippet to plot the scatter plot.

```python
plt.scatter(km_df2['longitude'], km_df2['latitude'], c=km_df2['Cluster'], cmap='rainbow')
```

This code snippet will plot a scatter plot as shown with different rainbow colors.

![Scatter plot](/engineering-education/unsupervised-machine-learning-with-pycaret.scatter_plot.png)

The scatter plot will give us a visual distribution of how the different countries are clustered. Our scatter plot has 7 colors to represent the number of clusters we specified earlier.

### Map scatter plot onto the world map

We need to map our scatter plot on the world map so that we can have the different countries are clustered.
To perform this functionality we need first to install [geopandas](https://geopandas.org/) and [descartes](https://pypi.org/project/descartes/) which enables plotting of a world map and ensure that our scatter plot is well distributed in the world map. These two packages `geopandas` and `descartes` are very important when we want to work with a world map.

Install using the following command:

```python
pip install geopandas descartes
```

- After installing, we import these packages required for plotting.

```python
import geopandas as gpd
import descartes
```

We can now create our world map using the steps shown below.

#### World map

We create a world map using the `geopandas` package we installed earlier.
We use the `plot()` method to plot the world map, and it has a size of 20 on the x-axis and 10 on the y-axis.

```python
world = gpd.read_file(gpd.datasets.get_path('naturalearth_lowres'))
ax = world.plot(figsize=(20,10))
ax.axis('off')
```

The output of our map will be as shown.
![Word map](/engineering-education/unsupervised-machine-learning-with-pycaret.word_map.png)

We now need to overlap our scatter plot on top of the created world map.

#### Overlap scatter plot

Overlapping ensures that the different countries are clustered in the right continents, and we can also see this in the world map.

```python
g = gpd.GeoDataFrame(km_df2,geometry=gpd.points_from_xy(km_df2['longitude'],km_df2['latitude']))
```

We shall use `latitude` and `longitude` in plotting the countries in their positions on the world map.
The above code snippet will provide normal coordinates that can be used in plotting as shown below.

![Plotting points](/engineering-education/unsupervised-machine-learning-with-pycaret.plotting_points.png)

After we have generated the coordinates, We can now plot these points using the following code snippets.

```python
fig,ax = plt.subplots(figsize=(20,10))
g.plot(cmap='rainbow',ax=ax)
world.geometry.boundary.plot(color=None,edgecolor='k',linewidth=2,ax=ax)
```

The output will show a scatter plot overlapped on top of our world map.

![Overlap scatter plot](/engineering-education/unsupervised-machine-learning-with-pycaret.map_overlap.png)

From the image above, we can see how different clusters are distributed over the world map.

We can now test our model, we test our model by giving it countries' latitudes and longitudes coordinates and see if our model can be able to place the country into the right cluster.

### Making Prediction

We feed our model new inputs of different countries `latitude` and `longitude` and see if our model can place the country into their right cluster.

Sample latitude and longitude are shown: latitude: 7.946527 and longitude: -1.023194, we input these into our model and see if it can place the country into the right cluster.

```python
sample_data = pd.DataFrame([{'latitude': 7.94652, 'longitude': -1.023194}])
```

We convert our `sample_data` into `DataFrame` so that our model can easily read the data frame and then use the `predict_model()` method to make a prediction.

```python
clust_pred = pc.predict_model(km, data=sample_data)
```

To view which cluster the country belongs to, we use the following command:

```python
clust_pred
```

Output is as shown:
![Prediction outcome](/engineering-education/unsupervised-machine-learning-with-pycaret.prediction_outcome.png)

We can see that our model has successfully clustered the country into cluster 3 which is the right cluster. This means that we have successfully trained our model, since it can now make accurate predictions.

### Conclusion

In this tutorial we learned about how to create a clustering model, a clustering model is a type of unsupervised machine learning in which the model learns on its own without supervision.

We started with data preparation, data preparation is an important stage in machine learning since it assists with cleaning our data and format data so that the data is easily readable by our model. The processed data is then used in the training of our model.

In the next section, we started building our clustering model, which can be able to cluster countries into their respective continents. In the end, we managed to build a clustering model which can be able to cluster countries into their continents.

Finally, we used the trained model to make a prediction, which is the goal of any machine learning model. This is used to gauge our model to see how well it leaned.

### References

- [Python Documentation](https://www.python.org/)
- [Pandas Documentation](https://pandas.pydata.org/)
- [Matplotlib Documentation](https://matplotlib.org/)
- [Pycaret Documentation](https://pycaret.org/)
- [Geopandas Documentation](https://geopandas.org/)
