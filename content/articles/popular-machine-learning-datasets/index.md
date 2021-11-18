---
layout: engineering-education
status: publish
published: true
url: /popular-machine-learning-datasets/
title: Popular Machine Learning (ML) Datasets 
description: This article be an overview of some of the most popular machine learning datasets commonly used in introductory machine learning classes or benchmarks for new models.
author: willies-ogola
date: 2021-01-21T00:00:00-12:00
topics: []
excerpt_separator: <!--more-->
images:
  - url: /engineering-education/popular-machine-learning-datasets/hero.jpg
    alt: Machine Learning (ML) Datasets example image
---
The data that we use to train our models is fundamental. In fact, without training data sets, we wouldn't have machine learning systems. These systems would not know how to classify texts, images, or detect objects. A collection of data is known as a dataset. We have millions of datasets used to train models on various tasks such as image and text classification. 
<!--more-->
Yet, finding the right dataset suitable for your project might be an uphill task as not all datasets are reliable. Luckily, many reliable research organizations and government agencies have shared their data that we can use for our projects. 

This article highlights ten of the most popular datasets commonly used in introductory machine learning classes or benchmarks for new models. There are many other datasets available, but we will not touch on every single one of them. I've provided a few links to platforms that I use to find some of these useful datasets at the bottom of the article.

Let's dive in.

### Datasets
1. [The MNIST Dataset](https://en.wikipedia.org/wiki/MNIST_database)

MNIST stands for Modified National Institute of Standards and Technology. It is a collection of handwritten digits from zero to nine (0-9). Each image's dimension is 28 X 28 pixels and is represented in greyscale, which lets us train models relatively faster than other image datasets.

This dataset is among the first you'll encounter when introduced to Convolutional Neural Networks (CNN). CNN's are good at identifying spatial patterns in the MNIST dataset, that makes them extremely useful in image classification. 

Nowadays, it is also commonly used as the default dataset of choice in Tensorflow when introducing the concepts of Generative Adversarial Networks, as shown in this [post](https://www.tensorflow.org/tutorials/generative/dcgan). 

![The MNIST Dataset](/engineering-education/popular-machine-learning-datasets/mnist-dataset.PNG)<br>

*[Image Source: Wikipedia](https://en.wikipedia.org/wiki/MNIST_database)*

2. [The Fashion-MNIST Dataset](https://github.com/zalandoresearch/fashion-mnist) 

The Fashion-MNIST dataset comprises 70,000 images with 60,000 training examples and 10,000 testing examples. Each example contains 28 X 28-pixel images of ten different types of clothing. Researchers created this dataset to be a replacement for the MNIST dataset, which was commonly used. 

The exciting thing about this dataset compared to the MNIST dataset is that it contains a lot more spatial variance due to different clothing patterns. This feature makes it a little more challenging to classify.

This dataset is used to solve image classification tasks similiar to the MNIST dataset.

![The Fashion-MNIST Dataset](/engineering-education/popular-machine-learning-datasets/mnist-dataset.PNG)<br>

*[Image Source: GitHub](https://github.com/zalandoresearch/fashion-mnist)*

3. [The CIFAR-10 Dataset](https://www.cs.toronto.edu/~kriz/cifar.html)

The CIFAR-10 Dataset contains 60,000 images across ten different classes. The images are colored with dimensions of 32 x 32 pixels making it easy to run the dataset on resource-constrained devices such as laptops.

CIFAR-10 is very useful, particularly when you want to try different models on a much more complex dataset than the MNIST dataset but still want to perform the task relatively quickly.

![The CIFAR-10 Dataset](/engineering-education/popular-machine-learning-datasets/cifar-10-dataset.PNG)<br>

*[Image Source: Alex Krizhevsky](https://www.cs.toronto.edu/~kriz/cifar.html)*

4. [The ImageNet Dataset](http://www.image-net.org/)

Compared to the three datasets mentioned above, ImageNet is a relatively large dataset. It is a massive image database that contains over 14 million labeled images. The dataset contains over 20,000 categories, such as banana, red wine, and corn, containing hundreds of images.

The ImageNet project's creators run an annual contest called ImageNet Large Scale Visual Recognition Challenge (ILSVRC), where different teams compete to classify, detect objects, and scenes accurately.

ImageNet has been subject to controversy due to issues regarding bias in the dataset. In the past, models trained on ImageNet have labeled people with racial slurs or otherwise derogatory terms. Researchers are addressing these issues by improving the labeling systems and expanding the database to be more inclusive to prevent such issues in the future.

5. [The YouTube-8M Dataset](https://research.google.com/youtube8m/)

The YouTube-8M Dataset is a publicly available dataset developed by Google. It is a relatively newer and improved dataset for image and video classification with almost 8 million videos and thousands of labels. The whole dataset consists of terabytes of data. Thus, it's not a dataset that you'll easily download into your computer. But, you can download it and store it in the cloud. 

It is useful if you want to make a model that classifies YouTube videos by their respective genres.

6. [The Boston Housing Dataset](https://www.cs.toronto.edu/~delve/data/boston/bostonDetail.html)

This dataset is one of the most essential datasets used for pattern recognition. It consists of data collected by the census service in the United States in the Boston area. It contains 506 observations with 14 different variables: the number of rooms per dwelling, crime rate by town, property tax rates, etc. 

Although primarily used to predict house prices, always keep in mind that it is an old dataset. It was created in 1978, and house prices have increased over the years.

This dataset is commonly used to introduce people to linear regression. It is also popularly used on the online learning platform, [Coursera](https://www.coursera.org/projects/predict-housing-prices-boston-data), to predict housing prices. 

7. [Iris Data Set](https://archive.ics.uci.edu/ml/datasets/iris)

This dataset contains information about a collection of iris flowers that can be categorized into three different classes. It is a pretty small dataset containing only 150 examples, which are evenly split between three classes where each class represents a type of iris plant.

This dataset can be an excellent dataset as practice when moving from linear regression encountered using the [Boston Housing Dataset](https://www.cs.toronto.edu/~delve/data/boston/bostonDetail.html) to linear classification as the dataset involves classifying whether a particular flower belongs to one of the types of iris or not. 

8. [Twitter Sentiment Analysis](http://www.sentiment140.com/)

Some Stanford graduate students created the Sentiment140 dataset to analyze sentiments in tweets. One can download this dataset and use it as long as you cite them.

We can classify tweets as being either positive, negative, or neutral. The classification is performed by looking at the emoji present in a tweet. A tweet with a smiley face will be classified as positive, whereas the model will classify a tweet with a frowny face as negative.

This dataset is popular in the Natural Language Processing realm. 

![Sentiment140](/engineering-education/popular-machine-learning-datasets/sentiment140.PNG)<br>

*[Image Source: Sentiment140](http://www.sentiment140.com/)*

9. [Breast Cancer Wisconsin Data Set](https://archive.ics.uci.edu/ml/datasets/Breast+Cancer+Wisconsin+%28Diagnostic%29)

The Breast Cancer Wisconsin dataset is comparably small, with only 569 examples. The dataset was created by analyzing cells from patients who were suspected of having breast cancer. It contains information such as the radius, smoothness, texture, area, perimeter, and compactness of a cell, which you can use to predict whether a cell was malignant (cancerous) or benign (not cancerous). 

This dataset is useful if you want to perform classification tasks.

10. [20 Newsgroups](http://qwone.com/~jason/20Newsgroups/)

The 20 Newsgroups article contains 20,000 newsgroup documents that are placed in 20 different categories. It is an interesting dataset to work with as some topics are closely related to each other. For example, there is a category for mac hardware and a category for pc hardware. It's interesting to see how the two categories overlap each other.

This dataset is popular in Natural Language Processing (NLP) for text classification and text clustering. An example use case would be developing a model that categorizes articles based on the underlying text.

### Extras
Knowing where to find useful data is essential in obtaining reliable datasets. Below is a list of where to find useful datasets that you can use in training your model.

1. [U.S. Government Agencies Open Data](https://www.data.gov/)

This platform was developed and launched in 2009 by the U.S. General Services Administration. It consists of data and resources from United States government agencies that will help you conduct research and develop web and mobile applications.

2. [E.U. Open Data Portal](https://data.europa.eu/euodp/en/data/)

This portal contains information published by E.U. institutions and bodies on science, economy, environment, international issues, education, culture, and sports. It can be a handy platform to get data, especially if you need reliable data on these fields.

3. [World Health Organization](https://www.who.int/data/collections)

This platform is useful to find data related to global health on WHO member states, i.e., data on the global outbreaks such as Covid-19 cases and tropical diseases such as Malaria.

4. [Kaggle](https://www.kaggle.com/datasets)

With Kaggle, you can find almost any dataset you want. The beauty of the Kaggle dataset is that its data is nice and clean. Most of the data preprocessing tasks has been done for you. 

5. [World Bank Open Data](https://data.worldbank.org/)

It is a free and open-access platform for global development data. This platform is an excellent place to find datasets ranging from finance to economic development in different nations.

6. [UCI Datasets](https://archive.ics.uci.edu/ml/index.php)

This is a popular repository for datasets used for machine learning applications and for testing machine learning models. 

7. [Google Public Datasets](https://research.google/tools/datasets/)

This is a public dataset developed by Google to contribute data of interest to the broader research community.

### Conclusion
That's an overview of some of the most popular machine learning datasets. If you are interested in developing your models on these datasets, this article should give you a good idea about which dataset is most suitable for your use case. 

You can try to play around with these datasets either on your laptop or on the Google Colab platform. I've also listed platforms where you can find some newer and more advanced datasets. Feel free to check them out.

Happy Coding!

### References
1.  [ImageNet](http://www.image-net.org/)
2.  [MNIST Database](https://en.wikipedia.org/wiki/MNIST_database) 
3.  [Fashion-MNIST](https://github.com/zalandoresearch/fashion-mnist) 
4.  [The CIFAR-10 dataset](https://www.cs.toronto.edu/~kriz/cifar.html)
5.  [Iris Data Set](https://archive.ics.uci.edu/ml/datasets/iris)
6.  [The Boston Housing Dataset](https://www.cs.toronto.edu/~delve/data/boston/bostonDetail.html)
7.  [20 Newsgroups](http://qwone.com/~jason/20Newsgroups/)
8.  [Breast Cancer Wisconsin Data Set](https://archive.ics.uci.edu/ml/datasets/Breast+Cancer+Wisconsin+%28Diagnostic%29)
9.  [YouTube-8M Segments Dataset](https://research.google.com/youtube8m/)
10. [Twitter Sentiment Analysis](http://www.sentiment140.com/)
11. [U.S. Government Agencies Open Data](https://www.data.gov/)
12. [E.U. Open Data Portal](https://data.europa.eu/euodp/en/data/)
13. [World Health Organization](https://www.who.int/data/collections)
14. [Kaggle](https://www.kaggle.com/datasets)
15. [World Bank Open Data](https://data.worldbank.org/)
16. [UCI Datasets](https://archive.ics.uci.edu/ml/index.php)
17. [Google Public Datasets](https://research.google/tools/datasets/)


---
Peer Review Contributions by: [Lalithnarayan C](/engineering-education/authors/lalithnarayan-c/)

