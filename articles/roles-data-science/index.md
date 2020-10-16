---
layout: engineering-education
status: publish
published: true
url: /engineering-education/roles-data-science/
title: Roles in Data Science Industry
description: In this article we will go over the responsibilities and various machine learning roles and the technologies associated with each position.
author: lalithnarayan-c
date: 2020-10-16T00:00:00-12:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/roles-data-science/hero.jpg
    alt: data science industry roles
---
The data science industry has many synonyms associated with it. The terms artificial intelligence (AI), machine learning (ML), and data science are used interchangeably. The growth of the industry has led to phenomenal progress in the field of tech.
<!--more-->
Machine learning and data science's tremendous development has resulted in many jobs. One needs to be careful while preparing for roles involving data science and machine learning. In this article we will go over the responsibilities and various technologies associated with each position.

Let's begin by listing the prominent roles.

1. Machine Learning Engineer
2. Machine Learning Scientist
3. Data Analysts
4. Data Architect

The roles mentioned above are all equally exciting and challenging. Each one has its own set of requirements, and I hope reading this article will help you to choose the role of your dreams. Let's begin.

### Machine Learning Engineer
Machine learning engineers deal predominantly with the implementation of the existing algorithms. Algorithm discovery is a crucial step performed by ML engineers. The team of ML engineers work on ensuring the algorithms work under the constraints posed by a problem.

For example, consider the [Generative Pre-Trained](https://openai.com/blog/better-language-models/) (GPT) Language Model. It is responsible for the ImageNet moment in the field of Natural Language Processing (NLP). The Imagenet moment refers to the transfer learning capabilities that GPT brings along. The source code and architecture details for GPT is available via various open-source channels.

When a company has a particular use case for a specific product, this algorithm needs to be modified or extended. The job of an ML engineer is to tweak the model according to the current application at hand. During the adaptation of existing algorithms, multiple changes are possible.

They are the following:

1. Input data: The data that will be input into the model within the live environment will most probably be different from the data used to train it in the first place. Therefore, the model needs to be re-trained or trained from scratch, depending on the use case. Thus, data *pre-processing* is one of the critical responsibilities of a machine learning engineer. Understanding data is an essential skill to fine-tune models.

2. Incorporating changes in the algorithm: The original algorithm may be suited for a specific set of problems. In order to enhance the capabilities, learning to refine the model is essential. A sufficient knowledge about machine learning algorithms is required to do so.

3. Integration with hardware devices: The need for placing in-device intelligence to enhance user experience and improve privacy features has resulted in implementing lighter (lite) versions of such models. Lighter (lite) versions require less computing power and less data to make efficient decisions.

### Machine Learning Scientist
Machine learning scientists work on cutting edge research. Their role is to develop and try out new model architectures to create innovative and efficient ways of solving challenging problems.

The Google DeepMind team is responsible for the [RankBrain](https://www.searchenginejournal.com/google-algorithm-history/rankbrain/) algorithm. A group of ML Scientists came together to develop [knowledge graphs](https://en.wikipedia.org/wiki/Knowledge_Graph). These knowledge graphs have been a frequently used data structure within computer science.

Representations of words called [word vectors](https://www.youtube.com/watch?v=ERibwqs9p38) help with search queries. Let's look at an example of a word vector. What amazes me is the degree of [abstraction](https://en.wikipedia.org/wiki/Abstraction_(computer_science)) that computer science has achieved.

![word vectors](/engineering-education/roles-data-science/word_vec.jpg)

[Image Source](https://www.analyticsvidhya.com/blog/2017/06/word-embeddings-count-word2veec/)

Consider the example shown above. The word vectors are representations for words that capture various levels of semantic details. General operations such as addition and subtraction can be performed on these vectors. For example:

```bash
king + woman - man -> queen
```

#### Importance of Problem-Framing
One way ML scientists bring value is through framing difficult problems so that they can be solved and managed effectively and efficiently. Given a problem statement, what are some of the [Key Performance Indicators](https://en.wikipedia.org/wiki/Performance_indicator) (KPIs) suitable for the problem? How do we define the problem such that it optimizes the use case and generalizes over all edge cases?

For example, how do we formulate the problem of self-driving cars? The research in this field has advanced a lot.

Let's look at the steps involved in self-driving cars:

![self-driving cars](/engineering-education/roles-data-science/self-driving.jpg)

*[Image Source](https://arxiv.org/pdf/1910.07738.pdf)*

Each block in the flowchart represents an individual problem to be solved. Formulating individual problems and identifying particular KPIs progresses the overall project. This is the role of the machine learning scientist. They form the company's intellectual property's backbone, and now we know why ML scientists are paid a considerable sum.

### Data Analysts
Ever wondered who crunched the petabytes of data? This is the role and responsibility of the data analysts. Data analysts are empowered with tools to deduce patterns from data. They are involved with data warehousing. A term commonly used is ETL, which stands for Extract, Load, and Transform.

ETL-tools are extensively used to build data warehouses. The first step is creating the data warehouses where data is stored in a structured and efficient manner. Next comes the aspect of data crunching. The data is identified and obtained systematically, and datasets are created. These datasets are designed for specific use cases.

Data analysts usually work in SQL based environments. They also perform exploratory data analysis to enhance the dataset creation process and analysis phase. Coordinating with ML engineers and scientist is a critical aspect of the job, as the datasets created will be used by them as well.

### Data Architect
A data architect takes up a large chunk of the responsibility for the data science team in a company. They ensure the availability of the backend infrastructure used to perform all the data-science tasks mentioned above. Their primary duty is providing scalable, reliable, secure, and cost-efficient data pipelines once the models have been built.

Data architecture is one of the significant components of big data. Designing the architecture of the data flow using various emerging technologies is a useful skill to have. If you are good at learning new technologies at a rapid pace, this might be the right job for you.

![big data](/engineering-education/roles-data-science/big_data_tech.jpg)

[Image Source](https://www.karmelsoft.com/skills-every-big-data-architect-needs/)

The image above shows the various technologies a data architect deals with. There is a logical explanation for the entire process of what a data architect does. The steps can be summarized into five key points:
   1. Data ingestion: For example, consider the millions of likes, comments, and shares that Facebook deals with. Therefore, scalable infrastructure is required to support such massive amounts of input data. Several software frameworks support the efficient ingestion of data.
   2. Data storage: Storing petabytes of data efficiently is necessary for easy retrieval. Therefore, many ecosystems have been built around this aspect.
   3. Data processing: Processing data refers to ensuring models developed by ML scientists and engineers take in the input and give the desired output.
   4. Data analysis: Certain algorithms such as recommendation engines analyze the viewing data in real-time and give millions of recommendations every second. Just imagine the scale of operations.
   5. Data exploration: Many processes are automated to ensure the other three roles have minimal trouble exploring data. For example, categorical features are encoded using various encoding schemes.

Having considered the various responsibilities, let's look at some of the technologies used to implement these skills.

### Tools and Technologies Commonly Used
1. Machine Learning Engineer Tools:
   - Exploratory Data Analysis Tools: [Excel](https://www.microsoft.com/en-us/microsoft-365/excel), [Matlpotlib](https://matplotlib.org/), [Seaborn](https://seaborn.pydata.org/), [H20](https://www.h2o.ai/)
   - Embedded Systems: [Raspberry-pi](https://www.raspberrypi.org/), [Beaglebone Black](https://beagleboard.org/black),[Nvidia Jetson](https://developer.nvidia.com/buy-jetson), [Movidius](https://www.intel.com/content/www/us/en/products/processors/movidius-vpu.html)
   - Programming environments: [Anaconda](https://www.anaconda.com/), [H20.ai](https://www.h2o.ai/)
   - Programming Languages: [Python](https://www.python.org/), C/C++
   - Commonly used libraries: [Tensorflow](https://www.tensorflow.org/), [PyTorch](https://pytorch.org/), [Tensorflow Lite](https://www.tensorflow.org/lite), [Scikit-learn](https://scikit-learn.org/)
2. Machine Learning Scientist Tools:
   - Machine Learning Frameworks: [Tensorflow](https://www.tensorflow.org/), [PyTorch](https://pytorch.org/), [MxNet](https://mxnet.apache.org/), [Caffe](http://caffe.berkeleyvision.org/)
   - Parallel and Distributed Programming Frameworks: [CUDA](https://developer.nvidia.com/cuda-downloads), [OpenGL](https://www.opengl.org/)
3. Data Analysts Tools:
   - Exploratory Data Analysis Tools: [Excel](https://www.microsoft.com/en-us/microsoft-365/excel), [Matlpotlib](https://matplotlib.org/), [Seaborn](https://seaborn.pydata.org/), [H20](https://www.h2o.ai/)
   - Databases Management Systems:
      - SQL based systems: [MySql](https://www.mysql.com/), [PostgreSQL](https://www.postgresql.org/)
      - NoSQL based systems: [mongoDB](https://www.mongodb.com/), [Redis](https://redis.io/), [Cassandra](http://cassandra.apache.org/)
   - Programming languages: Python, [R](https://www.r-project.org/) (used for statistical analysis of data)
4. Data Architect Tools:
   - Data Ingestion: [Flume](https://flume.apache.org/), [Sqoop](https://sqoop.apache.org/), [Nifi](https://nifi.apache.org/)
   - Data Storage: [Hadoop Distributed File Systems](https://hadoop.apache.org/) (HDFS), [HBase](https://hbase.apache.org/)
   - Data processing: [mapReduce](https://hadoop.apache.org/docs/current/hadoop-mapreduce-client/hadoop-mapreduce-client-core/MapReduceTutorial.html), [Spark](https://spark.apache.org/)
   - Data Analysis; [Hive](https://hive.apache.org/), [Impala](https://impala.apache.org/overview.html), [Pig](https://pig.apache.org/)
   - Data Exploration: [Cloudera](https://www.cloudera.com/), [Databricks](https://databricks.com/)

### Conclusion
We have looked at the various roles and the technologies associated within the data science industry. The importance of each of these roles is highly significant towards the growth of the company. Besides being well-paid jobs, they offer an opportunity to work on technology that is just emerging and very young.
