---
layout: engineering-education
status: publish
published: true
url: /engineering-education/data-mining-using-crisp-dm-methodology/
title: Data Mining using CRISP-DM methodology
description: Introduction to CRISP-DM methodology and a tutorial on how to use this to build successful data science projects.
author: srishilesh-p-s
date: 2021-02-00T00:00:00-00:00
topics: []
excerpt_separator: <!--more-->
images:
  - url: /engineering-education/data-mining-using-crisp-dm-methodology/hero.jpg
    alt: Data Mining using the CRISP-DM methodology
---
This article will cover how the CRISP-DM methodology can be used for building successful data science projects. We will also get an overview of how it can be used by analyzing a case study.
<!--more-->
We’ll be studying a case study to understand how this methodology has helped data scientists build successful projects. As a prerequisite, you must have a beginner understanding of how data science projects are built.

### Table of contents
- [Introduction](#introduction)
- [What is CRISP-DM?](#what-is-crisp-dm)
- [Conclusion](#conclusion)
- [Further reading](#further-reading)

### Introduction
With the rise in usage of data mining across several industries, the need for a standard framework is required to achieve the project's objectives.

The use of a standard framework helps us in:

- Recording experience, which can be later used in replicating it for other similar projects.
- Improving project planning and management.
- Encouraging best practices used for achieving better results.

With the increase in the projects' complexity, it is recommended to follow a standard framework for achieving goals faster.

### What is CRISP-DM?
> According to [this](https://analyticsindiamag.com/crisp-dm-data-science-project/) article, CRISP-DM stands for CRoss-Industry Standard Process for Data Mining and was [developed](https://www.the-modeling-agency.com/crisp-dm.pdf) in 1996.

CRISP-DM is one of the most preferred techniques used for building data mining projects. A significant increase in the usage of this methodology can be seen after conducting a poll in 2007 and 2014, as shown in the below image:

![Statistics](/engineering-education/data-mining-using-crisp-dm-methodology/statistics.PNG)

[Image source](https://www.kdnuggets.com/2014/10/crisp-dm-top-methodology-analytics-data-mining-data-science-projects.html)

> According to [Wikipedia](https://en.wikipedia.org/wiki/Cross-industry_standard_process_for_data_mining), "A data mining process model that describes commonly used approaches that data mining experts use to tackle problems... it was the leading methodology used by industry data miners."

CRISP-DM is a 6 step process:

- Understanding the problem statement
- Understanding the data
- Preparing the data
- Perform data analysis
- Validating the data
- Presenting/Visualizing the data

![The Problem Solving Framework](/engineering-education/data-mining-using-crisp-dm-methodology/crisp-dm-framework.png)

[Image source](https://www.udacity.com/course/problem-solving-with-advanced-analytics--ud976)

### Problem Statement
To understand CRISP-DM methodology, let's look at a simple case study.

> A Utility company wants to predict the next days' demand for electricity, to allocate necessary resources for power generation.

Now that we have understood what's the business issue. Let's devise a solution for the prediction of the next days' electricity consumption.

### Steps in CRISP-DM
#### Understanding the Problem Statement
This step focuses on understanding the objectives of the project and requirements from the business perspective.

Questions to ask are:

- What is the problem?
- What are the objectives?
- How is the success of the project measured?
- Who are the stakeholders?

Now, let's understand this from the perspective of our problem statement.

##### Determining business objectives
This step helps us define the necessary methods to be taken to consider a business as a success.

For our problem, our objective is "Predict approximate electricity consumption for the next day, to allocate necessary resources".

##### Assess the situation
This step helps us analyze the project's current situation by identifying the resources and the stakeholders of the project.

For our problem,

- We must find out the factors which affect the increase in electricity consumption. One major factor affecting it is temperature.

##### Determine data mining goals
This step helps us identify how to translate the business goals into data mining goals and select a proper way for its assessment.

For our problem,

- We must use data mining techniques to find what other factors affect consumption.
- We must find out what type of problem it is - Classification, Prediction, or Clustering?

##### Produce a project plan
This final step helps us create an initial process plan and estimate the effort and resources needed to achieve our goals.

For our problem,

- We must estimate the resources needed for generating electricity.
- We must devise a series of steps for analyzing consumption.
- We must decide how the project is to be evaluated.
- We must decide on the selection of tools and techniques.

#### Understanding the Data
> According to [this](https://www.linkedin.com/pulse/how-realize-data-mining-project-klavdia-zavalich/) article, the data understanding phase starts with an initial data collection and proceeds with activities to get familiar with the data, identify data quality problems, discover first insights into the data, or detect interesting subsets to form hypotheses for hidden information.

Questions to ask are:

- What information is required?
- What information is available?
- How to collect the required information?
- What is the underlying pattern of the data?

For our problem,

- Based on an assumption, we can say that **Date**, **Time**, and **Temperature** are 3 major factors affecting electricity consumption.
- Before proceeding with this assumption, we must perform [Exploratory Data Analysis](https://en.wikipedia.org/wiki/Exploratory_data_analysis) to verify our assumptions.
- We must find the type of data that will be used for solving the problem. The type of data refers to discrete, continuous, time-series, or seasonal data.
- We must analyze the data statistically and find the relationship between various types of data.

#### Preparing the Data
> According to [this](https://bigdatapath.wordpress.com/2018/11/05/big-data-analytics-data-life-cycle) article, the data preparation phase covers all activities to construct the final dataset (data that will be fed into the modeling tool(s)) from the initial raw data. Data preparation tasks can be iterative and doesn't follow any sequence. Tasks include formatting, transforming, and cleaning of data.

In this step, we must follow 5 common steps as mentioned in [this](https://quyenntk143.medium.com/problem-solving-framework-crisp-1decbb25a42c) article:

- Gathering: Collecting data from multiple verified sources.
- Cleansing: Data can be missing or noisy or sometimes incorrect. Cleaning the data is one of the most important task.
- Formatting: Data must be suited well according to the usecase, which requires transforming or augmenting data.
- Blending: Data can be integrated and blended from multiple resources to achieve the desired objective.
- Sampling: Working with large data is always cumbersome. So, splitting and focusing on important data would reduce the wastage of resources.

These steps remain common for any type of dataset that we choose, irrespective of the problem.

#### Perform Data Analysis
> According to [this](https://bigdatapath.wordpress.com/2018/11/05/big-data-analytics-data-life-cycle/) article, various modeling techniques are selected and applied in this phase, and their parameters are calibrated to optimal values. Each data has its own requirements, understanding them would sometimes require reiterating previous processes.

Things to consider:

- Determine what the technique can be used to solve the problem.
- Determine the data requirement needed to solve the problem.
- Design a prototype of the model.
- Validate the model, and redesign the model.

In our problem, we find that there is a high correlation between temperature and electricity consumption. This can found by following a series of steps as mentioned in [this](https://quyenntk143.medium.com/problem-solving-framework-crisp-1decbb25a42c) article:

1. Build a predictive model - predicting the next days' temperature based on history.
2. Validate the model - validate this by predicting the electricity of the next day to check if a correlation exists.
3. Repeat the process - repeat the above 2 processes until gaining correlation confidence.
4. Perform analysis - on gaining confidence, we can analyze that helps us in resource allocation.

#### Validating the Data
> According to [this](https://bigdatapath.wordpress.com/2018/11/05/big-data-analytics-data-life-cycle/) article, at this stage in the project, you have built a model (or models) that appears to have high quality from a data analysis perspective. Before proceeding to the model's final deployment, it is important to more thoroughly evaluate the model and review the steps executed to construct the model to be certain it properly achieves the business objectives.

Things to consider:

- Ensure if the results match the expectations.
- Decide whether to proceed to the next step or return to a previous phase.
- Make note of the important factors which could result in failure.
- Perform various testing with the endusers.

In our problem, we have been working based on our assumption that temperature is one of the key factors affecting consumption. While validating, if we find that temperature does not correlate with electricity consumption, we must roll back to the previous step and further revise our model.

#### Presenting/Visualizing the Data
> According to [this](https://bigdatapath.wordpress.com/2018/11/05/big-data-analytics-data-life-cycle/) article, the creation of the model is generally not the end of the project. Even if the purpose of the model is to increase knowledge of the data, the knowledge gained will need to be organized and presented in a useful way to the customer.

Things to consider:

- Determine the best method of presenting insights based on the analysis and audience.
- Stories speak more than facts.
- Ensure every decision is backed up by proper research.
- Enable the enduser to have a visual workflow of the solution.

Though the analysts might have analyzed the problem, visualizing, and presenting the clients/business managers' insights is the key step.

Visualization can be done by plotting graphs, performing statistical analysis, or predicting the next possible outcome. To learn more about visualization, please refer to [this](/engineering-education/matplotlib-visualization-python/) article on Matplotlib visualizations and [this](/engineering-education/getting-started-with-data-visualization-using-pandas/) article on Pandas visualization.

### Conclusion
In conclusion, we have learned various CRISP-DM methodology steps and understood them by analyzing a case study. This can be understood better only by using this methodology for your next data science project.

![Summary](/engineering-education/data-mining-using-crisp-dm-methodology/summary.PNG)

[Image source](https://paginas.fe.up.pt/~ec/files_0405/slides/02%20CRISP.pdf)

To summarize:

- We learned the need for a framework to build data science projects.

- We learned about CRISP-DM methodology in-detail.

- We also analyzed a case-study to understand this methodology

### Further reading
- [Course on Udacity](https://www.udacity.com/course/problem-solving-with-advanced-analytics--ud976)
- [PPT on CRISP-DM](https://paginas.fe.up.pt/~ec/files_0405/slides/02%20CRISP.pdf)
- [Article by KDNuggets](https://www.kdnuggets.com/2014/10/crisp-dm-top-methodology-analytics-data-mining-data-science-projects.html)
- [Article by AnalyticsIndiaMag](https://analyticsindiamag.com/crisp-dm-data-science-project/)
- [A Detailed explanation of the CRISP-DM methodology](https://www.sv-europe.com/crisp-dm-methodology/)
- [Article by Datascience-pm](https://www.datascience-pm.com/crisp-dm-2/)
- [Article by Big data path](https://bigdatapath.wordpress.com/2018/11/05/big-data-analytics-data-life-cycle/)
- [Article on Business Analytics](https://www.theopinionnb.com/2020/12/complete-tutorial-on-business-analytics.html)
- [Article on analyzing the problem](http://hpscript.com/blog/the-analytical-problem-solving-framework/)
- [Notes from the course on Udacity](https://github.com/mainkoon81/Study-01-Business-Analytics-I-Theory/blob/master/README.md)
- [Flash cards on understanding CRISP-DM](https://quizlet.com/gb/454325590/the-crisp-dm-flash-cards/)


---
Peer Review Contributions by: [Lalithnarayan C](/engineering-education/authors/lalithnarayan-c/)
