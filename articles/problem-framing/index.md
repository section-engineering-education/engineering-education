![hero](/engineering-education/problem-framing/hero.jpg)

[Image Source](https://images.unsplash.com/photo-1587093336587-eeca6cb17cf2?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80)

Choosing a machine learning method to implement on data is not the easiest of processes. It is important to first understand the precise business problem and its objectives. For instance, understanding what is to be predicted and the potential outcomes is key. One also needs to know what data should be used to train a model, among other factors. Such considerations help in the framing of a machine learning problem. In this article, we look at how to correctly frame a machine learning problem.

### Contents

1. Problem framing in a basic ML workflow
2. Why problem framing is not a straightforward process
3. Best practices to frame a problem

### Prerequisites

An understanding of the basic concepts of machine learning. Introductory concepts to machine learning covered in this [article](/engineering-education/supervised-learning-algorithms/) may prove helpful. The introduction to machine learning section of this [article](/engineering-education/feature-engineering-in-machine-learning/) may also provide value.

### Machine learning workflow

A basic machine learning project workflow has four stages. The first is problem framing. It is followed by data analysis, model building, and deployment. The data analysis stage involves handling and refining the data that is available to build the model. Model building is a stage where the desired model is selected for use. The available dataset is divided into training and test sets (validation sets too, where necessary). The model is trained and tested. The last stage involves the application of the model. Its performance is evaluated in a production setting.

We are concerned with the first stage. Problem framing is the stage that involves defining the problem one seeks to solve. It involves outlining the goals of a given project. This stage shapes the rest of the machine learning process. It provides some sort of “checklist” before proceeding with the subsequent stages. We get to understand the problem that is to be solved. We get to understand whether machine learning is a suitable solution. The availability and sources of data are examined, among other considerations. In this article, we consider problem framing in a business/organizational context.

### Why problem framing is a challenge

Framing the correct problem in real-world data science projects may involve more process than one would think. As much as it is worth noting that a data scientist’s role varies from company to company, problem framing is more of a challenge in organizations yet to become data-driven. Let’s look at a few reasons why.

#### Complex datasets

Often during experimentation, we tend to work with simple, straightforward datasets. Furthermore, the task to be carried out is usually well defined. These two conditions make it easy to know what kind of model to use for the task.
However, the above conditions change when it comes to the real-world implementation of a data science project. 

It is common to find that the datasets available for use are complex. A dataset could have millions of examples. It could contain features that number in the thousands. This kind of complexity creates some difficulty in determining what kind of model to build. In addition to that, it makes it challenging to select features to use to create a model.

#### Little or no domain knowledge

The understanding of a specialized field or discipline is what we refer to as domain knowledge. A data scientist with domain knowledge in a field that a machine learning system intends to operate has an edge over one that lacks it. It might be a challenge to gather domain knowledge as a data scientist. Consider a context where a data scientist typically works on projects in different or unrelated domains. Since the domain often changes, a data scientist may have to rely on the organization they work to determine features for use in a model. 

For a healthcare dataset, such a data scientist may have to work with doctors to cover for the lack of domain experience. The features or variables for use in the model end up being dependent on medical professionals' guidance. This complicates the process of problem framing.

#### Organizational inability to leverage data

In this day and age, a huge number of organizations generate massive amounts of data. Some companies know exactly how to leverage this data to improve their operational efficiency, sales, and profits. However, there exist several organizations that are not yet data-driven. Such organizations do not know how to leverage such data to better their operations and income.

A data scientist working in such an organization may be tasked with using such data to formulate and frame a problem. The data scientist would have to figure out how to carry out this process. This may be quite cumbersome as well as challenging for the individual to execute.

#### Inadequate data

To frame a machine learning problem, a key requirement is data. Let’s look at a scenario where a data scientist is working for a company attempting to leverage data science. Let’s assume the company is looking to use data to help in attaining product-market fit. The company may not have enough (or any) data for analysis.

A data scientist in this setup may need to liaise with upper management, product development teams, marketing, and sales teams to understand the company's aspirations and needs before devising how the problem may be framed. The team may then carry out methods to collect data. These methods may be in the form of experiments as well as surveys. If the company already has a product in the market, data such as user reviews may be especially useful. The collected data may be used as sample data.

### Problem framing best practices

It is important to acknowledge problems vary from domain to domain. As such, this is not a one size fits all approach. The steps to framing a machine learning problem may differ based on context. I attempt to highlight the steps I find to be most important.

#### Defining success

A critical step in problem framing is first determining what would be considered a successful project. It is common to say a model is successful if it performs well during the testing stage. We observe metrics such as classification accuracy for classification problems. A model with a high degree of accuracy may be interpreted as being successful. However, it is worth noting that high accuracy does not necessarily mean that a model performs well. But that is beyond the scope of this article. For more on evaluation of a model’s performance, read this [article](/engineering-education/evaluating-ml-model-performance/).

In a business context, we may take a step back from metrics like accuracy and define success in a more general way. A less technical point of view may be taken. For instance, a successful project may be one that can analyze and segment customers into various categories based on their purchasing habits.

#### Setting observable and quantifiable performance metrics

Once we understand what counts as a successful project, we may deliberate on which metrics would best reflect said success. Let’s use our example of categorizing customers based on their habits. Success would involve correctly categorizing customers into their respective segments. As a result, a key performance metric may be classification accuracy.

#### Assessing feasibility of machine learning

It is worth noting that the two steps mentioned above do not need machine learning to be carried out. Let’s consider our example that involves segmenting customers. We have defined what the objective is. We have mentioned what we would consider being a successful outcome and a metric that would show this. Before wrapping machine learning around the task, it is wise to assess how feasible a machine learning approach would be. The reasoning behind this is that not all business problems would require a machine learning solution. We may realize that customers' segmentation may be done through the use of excel sheets then analyzed by a single person. This might be due to a small customer base.

Furthermore, the organization may not be ML-ready. It may not have the necessary support and eco-system required to sustain such a solution. A machine learning solution may be expensive to implement at such a time. Data may not be readily available to define the machine learning solution. For these scenarios, non-machine learning approaches to achieve the end goal may be more appropriate. We may opt to implement a machine learning approach at a later time.

On the other hand, machine learning may prove to be the most feasible approach. The organization may have enough resources to implement and maintain a machine learning solution. For instance, the organization may be capable of hiring a team of data scientists. In such a case, a strategy would have to be developed around the proposed approach. This would first involve formulating a machine learning question.

#### Formulating a machine learning question

At this point, we have already identified and defined the business problem. To formulate a machine learning question, we first need to understand the problem domain. In this case, we seek to classify customers into their correct segments based on their buying habits.

Relating the problem to machine learning would result in understanding the algorithm that could provide the best value. We would have to ask questions such as; could it be best framed as a classification problem? Is it a regression problem? Correct analysis of the problem shows that it is a classification problem. As a result, a classification algorithm would be an obvious choice.

The next step would involve understanding how the output of the proposed classification algorithm would impact decision making. The solution would have to fit into the overall picture of the organization. For instance, the classification of customers would potentially allow the organization to develop better products. It could allow the production of more personalized products. It could also result in a better understanding of how to produce the right number of products for given customer segments to allow better inventory clearance. The model’s output data would help make all these decisions.

We would then need to identify the sources of data for our model. Data powers machine learning algorithms. The data that would offer the best value would have to be of the utmost quality. Data of lesser quality would undermine the goals of our model.

#### Beginning with a simple model

To allow for a not only explainable but interpretable model, one may consider using a simple model at this stage. A simple model may be described as one with the least possible complexity required to correctly carry out a task. The use of such a model allows for controllable debugging. Simple models also provide a good baseline. They can help evaluate whether there is a need for a more complex model. Complex models provide less explainability. They are harder and take longer to train compared to simple ones. If the need for more complexity is justified, it may be implemented later on.

### Wrapping up

Problem framing is a key step in the machine learning workflow. Since it’s arguably less technical than other stages in a machine learning workflow, it might be inaccurately perceived as an easy step. Yet, the challenges we covered show otherwise. The best practices we have covered should be of help when framing machine learning problems.

### References

1. [Problem Framing: The Most Difficult Stage of a Machine Learning Project Workflow](https://medium.com/towards-artificial-intelligence/problem-framing-the-most-difficult-stage-of-machine-learning-1a7f208ea414#:~:text=%20Problem%20Framing%3A%20The%20Most%20Difficult%20Stage%20of,Building.%20Pick%20the%20machine%20learning%20tool...%20More%20)

2. [Machine Learning Problem Framing](https://medium.com/towards-artificial-intelligence/machine-learning-problem-framing-2a0eba4c0d6d)

3. [ML Problem Framing](https://docs.aws.amazon.com/wellarchitected/latest/machine-learning-lens/ml-problem-framing.html)
