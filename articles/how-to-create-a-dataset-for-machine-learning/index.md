Machine learning (ML) has had a profound influence on a diverse range of applications. This has been possible mainly due to better computing power and large amounts of training data. I cannot emphasize enough the importance of training data to ML systems.

In fact, most of the machine learning models' problems aren't caused by the models but by issues in the dataset. And yet, the process in which a dataset is created is an underrated topic. This is because creating and improving datasets is a human task and tends to be very time-consuming. In the world of artificial intelligence, tasks that require human labor aren't considered exciting.

In any case, before we train a model, we need a dataset. There are many publicly available datasets that one can use in a project.

For example, if one wanted a model that would help classify YouTube videos by genres, one can use the [YouTube-8M Segments dataset](https://research.google.com/youtube8m/) that is publicly available. Likewise, if one is looking to classify patient data, the [Wisconsin Breast Cancer dataset](https://archive.ics.uci.edu/ml/datasets/Breast+Cancer+Wisconsin+%28Diagnostic%29) will come in handy.

But what if no dataset is publicly available to solve your problem?

That means that you'll have to create one yourself. 

The processing of creating a dataset involves three important steps:

1. Data Acquisition
2. Data Cleaning
3. Data Labeling

### Data Acquisition

The process of data acquisition involves finding datasets that can be used for training machine learning models. There are a couple of ways you can go about doing this, and your approach will largely depend on your problem that you are trying to solve and the type of data that you think is best suited for it. There are largely two key approaches. They include:

1. Data Generation
2. Data Augmentation

#### Data Generation

The data generation technique is applied when there is no existing dataset that can be used for training. It involves: 

1. Crowdsourcing 

Crowdsourcing is used to solve various tasks ranging from simple tasks such as data labeling to complex tasks involving collaborative writing. A good example of crowdsourcing's usage is in the popular [ImageNet project](http://www.image-net.org/), which gave rise to the ImageNet image classification dataset. 

In machine learning, crowdsourcing is used to aid in data generation tasks. There are two main crowdsourcing platforms that one can utilize to generate new data:

The [Amazon Mechanical Turk (MTurk) ](https://www.mturk.com/) is one of the earliest and most popular examples of a crowdsourcing platform. People can sign up on this platform to complete tasks and receive payments for them.

[Citizen Science](https://en.wikipedia.org/wiki/Citizen_science) is also a crowdsourcing platform whereby you can engage the public in data collection, which not only helps you collect more data but also help the public learn more about the science that you are trying to do.

2. Synthetic Data Generation

Synthetic data is data created via a computer simulation. It is used to increase the size of our training data or introduce changes in the data that we would like our model to handle in the future. We need these large amounts of data to have enough information to train a deep learning model properly.
Thus, synthetic data generation usually offers us a cheaper and flexible way of expanding our datasets.

Generative Adversarial Networks (GANs) is an advanced technique that we can use to generate synthetic data. It involves training two contesting networks: a generator and a discriminator. The generator's role is to learn to map a latent space to a data distribution (from a dataset). The discriminator's role is to discriminate (compare) between examples from the true distribution and the generated distribution. The goal is to increase the error rate for the discriminator network to make the generator networks so good at generating samples that will fool the discriminator into thinking that the samples are from the true data distribution (the dataset). 

Using GANs effectively generates synthetic videos and images that look realistic for use in different applications. It takes in existing data and creates new data that looks like your original dataset. Thus, generating more data.

#### Data Augmentation

Data augmentation is another method for data acquisition. The process involves augmenting existing datasets with newly-acquired external data. Some basic steps in the data augmentation process might include cropping, flipping, rotating, brightness and contrast changing of input images.

This technique enhances the size and quality of training datasets enabling you to collect more data without actually going out to physically collect more data. Another advantage of data augmentation is that it makes a models generalize better to newly unseen data.    

### Data Cleaning

If you do have enough data, but either the quality of the dataset isn't that great (e.g., data is noisy), or there's an issue with the general formatting in your dataset (e.g., some data intervals are in minutes while some in hours), we now move on to the second process which involves cleaning the data.

You can perform data operations manually, but it is labor-intensive and would take a lot of time. Alternatively, you can leverage already built systems and frameworks to help you achieve the same goal easier and faster.

They include:

1. [HoloClean](http://www.holoclean.io/) 

HoloClean repairs, cleans and enriches data. The system leverages value correlations, quality rules, and reference data to help build probabilistic models that capture the process of data generation. It also helps data scientists save on the time needed to clean data.

2. [ActiveClean](https://activeclean.github.io/) 

ActiveClean is an iterative cleaning framework that cleans samples of data based on how much cleaning improves the models' accuracy. This means that you only need to clean a small subset of the data to achieve a model similar to a fully cleaned dataset.

3. [BoostClean](https://arxiv.org/pdf/1711.01299.pdf) 

BoostClean automatically detects and repairs errors in data using statistical boosting. Statistical boosting enables the system to find the best ensemble of pairs that maximize the final model's accuracy.

4. [MLClean](https://arxiv.org/pdf/1904.10761.pdf)

MLClean is the most recent data cleaning framework. The framework performs three main tasks: data sanitization, traditional data cleaning, and unfairness mitigation in data. It also integrates artificial intelligence to clean data to achieve robust, accurate, and fair models.     

An important point to note is that you shouldn't clean too much. Ideally, cleaning a dataset should not result in a dataset that's no longer representative of the population that you are looking to perform a study on.

### Data Labeling

Now you have acquired enough data to have a representative dataset, cleaned, and in the right format. 

Time to label that data? Maybe.

The answer to that question solely depends on whether you are using supervised learning or unsupervised learning. Unsupervised learning doesn't require your data to be labeled, while supervised learning does require data labeling.

The processes of labeling can be subjective and also labor-intensive. One can utilize crowdsourcing platforms such as [Amazon Mechanical Turk (MTurk) ](https://www.mturk.com/) and [Citizen Science](https://en.wikipedia.org/wiki/Citizen_science) to achieve this goal.  

### Wrapping Up

Is that the end of the process for creating a dataset? Well, probably, probably not.

Training a model can reveal some issues that may negatively impact the outcomes that you may try to predict or classify. Often, these issues can be traced back to the dataset itself. You may have to return to the data acquisition, data cleaning, and data labeling drawing board to figure out how to create a better dataset for your ML system. But if your dataset lacks any issues, you're good to go.

That's it for this article on how to create a dataset for machine learning. Hope the article was helpful.

### References

1. [A Survey on Data Collection for Machine Learning](https://arxiv.org/pdf/1811.03402.pdf)  
2. [YouTube-8M Segments Dataset](https://research.google.com/youtube8m/)
3. [Amazon Mechanical Turk (MTurk) ](https://www.mturk.com/)
4. [Citizen Science](https://en.wikipedia.org/wiki/Citizen_science)
5. [ImageNet project](http://www.image-net.org/) 
6. [HoloClean](http://www.holoclean.io/) 
7. [BoostClean](https://arxiv.org/pdf/1711.01299.pdf) 
8. [MLClean](https://arxiv.org/pdf/1904.10761.pdf)