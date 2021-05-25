---
layout: engineering-education
status: publish
published: true
url: /engineering-education/how-to-implement-mlops/
title: How to Implement MLOps
description: This article will go over how MLOps automates the processes of model development, drift monitoring, quality control, model governance, model retraining, and pipelining into a single platform.
author: eric-kahuha
date: 2020-11-26T00:00:00-18:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/how-to-implement-mlops/hero.jpg
    alt:  MLOps machine learning devops example image
---
Engineers are preparing many high-level models by combining machine learning and artificial intelligence, but deploying these technologies at scale is challenging. Thus, the need to find a solution, like MLOps, arose. Also referred to as DevOps for machine learning, MLOps improves communication and collaboration between engineers and data scientists. 
<!--more-->
MLOps is attracting the attention of organizations looking to leverage the benefits of machine learning in their operations.

Essentially, MLOps comes in to manage the deployment of deep learning and machine learning models in large-scale production environments.

### What is MLOps
The idea of MLOps was born out of the need to combine the long-established practice of DevOps with the recently emerging field of machine learning. MLOps automates the processes of [model development](https://www.sciencedirect.com/topics/computer-science/model-development#), drift monitoring, quality control, [model governance](https://algorithmia.com/blog/model-governance), [model retraining](https://docs.aws.amazon.com/machine-learning/latest/dg/retraining-models-on-new-data.html), and [pipelining](https://www.sciencedirect.com/topics/computer-science/pipelining) into a single platform.

MLOps is modeled on the existing DevOps discipline, which involves developing and operating large-scale software systems. DevOps ensures the collaboration of software developers (the Devs) and operations teams (the Ops). The operations team configures and monitors networking, manages the hardware infrastructure, and enforces security, backup, change control, and compliance policies. Other roles of the operations team are assisting system monitoring, tracking assets, managing active directories, and performing other non-production application-related duties. 

Read more about DevOps engineering [here](/engineering-education/what-it-takes-to-be-a-devops-engineer/).

MLOps is a [compound](https://caiomsouza.medium.com/mlops-machine-learning-and-operations-and-ai-at-scale-ffcac7e50f62) of machine learning (ML) and operations (Ops). With this practice, operations professionals and data scientists collaborate and communicate better to manage [production machine learning](https://towardsdatascience.com/production-machine-learning-isnt-hard-anymore-932bd91e138f) or [machine learning life cycle](https://www.educba.com/machine-learning-life-cycle/#:~:text=Machine%20Learning%20Life%20Cycle%20is,are%20involved%20in%20various%20applications). 

MLOps includes a data science team for curating datasets and building AI models that analyze the datasets. Machine learning engineers are also part of the MLOps team, and they have the role of running datasets through the models in automated ways.

There exist three levels of MLOps, as [described](https://cloud.google.com/solutions/machine-learning/mlops-continuous-delivery-and-automation-pipelines-in-machine-learning) by Google: MLOps level 0, MLOps level 1, and MLOps level 2. The choice between each level is dependent on an organizations size and the number of machine learning algorithms they target to run.

- **MLOps level 0 -** This means that an organization recognizes the need to adopt machine learning practices and have an in-house data scientist capable of deploying and building models. However, every process in that organization is manual, including data preparation, data analysis, model validation, and training.

- **MLOps level 1 -** This involves machine learning pipeline automation whereby the organization introduces a pipeline to enhance continuous training. Model and data validation is entirely automatic. A reduction in model performance or the introduction of new data triggers retraining. Solutions operating in a constantly changing environment better use this scenario to respond proactively to shifts in price rates, customer behavior, or other factors.

- **MLOps level 2 –** With this level, [CI/CD pipeline](https://semaphoreci.com/blog/cicd-pipeline#:~:text=What%20is%20a%20CI%2FCD,and%20enable%20fast%20product%20iterations.) automates the deployment of machine learning models and elements of machine learning [training pipelines in production](https://www.altexsoft.com/blog/machine-learning-pipeline/). A CI/CD (continuous integration and continuous delivery) automates the software delivery process, builds codes, and runs tests (CI). It then deploys a revised version of the application (CD) safely. Tech-driven organizations can rely on this level for hourly or daily retraining of models, updating models in minutes, and simultaneous redeployment of these models on multiple servers. Such organizations require an end-to-end MLOps cycle for them to survive.

### Why MLOps matters
Realizing the full value of machine learning comes with some demands. Machine learning needs to run in production and enhance efficiency and better decision making in business applications. The technology and practices that machine learning operations provide help to deploy, govern, monitor, and manage ML in production. Organizations employ MLOps to scale the number of ML operations. 

MLOps automates processes, validation, and testing to create a repeatable process for managing ML in a dynamic environment. Besides, MLOps empowers engineers to take responsibility for and ownership of machine learning in production while freeing up data scientists to handle other tasks.

### How to implement MLOps
#### Speech recognition
Speech recognition employs machine learning technology to convert speech signals into digital data. Recognition accuracy is achieved through the application of neural network algorithms in speech recognition software. Machine learning models adapt to changes in language and demonstrate a high level of accuracy.

MLOps programs are applied in speech recognition applications. A speech recognition app identifies context such as emotion and tone based on how individuals speak. Eventually, people introduce new phrases, and the general style of how they talk changes. Due to these changes, the machine learning model will exhibit model decay.

The guidelines of MLOps level 1 help in such a scenario would be as follows. A system under MLOps level 1 is run on the device to monitor the speech recognition models predictive performance. The system triggers an alert when performance falls below or approaches the threshold. This means that the responsible team must train a new model using fresh data and then deploy it to replace the old production model.

#### Packaging Robots
Packaging robots transport, open, fill, seal, label, palletize, and/or code product packaging. These robots automate the packaging or movement of goods. Such automation helps remove repetitive tasks that human employees may find unfulfilling or boring yet critical to the product production process.

Often, companies employ robots at the end of their assembly line to package products. These packaging robots use computer vision powered by machine learning for the analysis and packaging of products. Say that the ML model is trained to recognize triangular and circular boxes of certain sizes. Then, the company introduces new packaging sizes or shapes.

In this case, the company has to create and deploy a new ML model. MLOps level 0 is applied here to create, train, and deploy a new packaging model manually. This is done before the new packaging sizes or shapes are introduced into the assembly line.

#### Sudden outliers in the stock market
Artificial intelligence is very useful in [stock trading](https://www.investopedia.com/stock-trading-4689660#). You can analyze the present data points accurately and fast using AI-powered stock analysis tools. You can then use these data points to analyze stock market trends and form patterns significant for smart trading. Besides, artificial intelligence also enables trading based on [sentiment analysis](https://www.dailyfx.com/education/understanding-the-stock-market/stock-market-sentiment-analysis.html#). In this case, AI uses the headlines in social media reviews, news channels, and comments from other platforms to perform a stock market trade analysis using sentiment analysis.

On April 20, 2020, US oil prices [dropped](https://www.theguardian.com/world/2020/apr/20/oil-prices-sink-to-20-year-low-as-un-sounds-alarm-on-to-covid-19-relief-fund) below zero. Take an example of an ML model trained to make predictions based on oil prices, but only with positive prices. We would not expect the model to perform perfectly upon encountering a sudden negative price. A team of developers and data scientists must take immediate action to train and redeploy a new ML model.

MLOps level 2 is applicable in this instance, considering that much of the pipeline for training and deploying a new model is automated. In this case, data scientists may not even need the assistance of developers to handle the pipeline. They should rely on automated systems when updating, training, and deploying a reliable new model immediately to avoid further effects.

### Conclusion
The MLOps programs are a great way to unify disparate teams of developers and data scientists taking on innovative yet challenging tasks. Organizations benefit from the control exerted by successfully implemented MLOps strategies in terms of more efficient, accurate, and productive models.

---
Peer Review Contributions by: [Lalithnarayan C](/engineering-education/authors/lalithnarayan-c/)
