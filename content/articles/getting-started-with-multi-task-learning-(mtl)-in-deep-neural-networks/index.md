### INTRODUCTION 
It is common practice in Machine Learning to focus on improving a certain statistic, such as a business KPI score or a benchmark score. A model or a group of models are trained to fulfill the intended task. These models are then fine-tuned and tweaked to the point where their performance is no longer able to improve.

By focusing only on one activity, we miss out on information that could help us improve our performance. This performance is on the parts we are most concerned about. It's the training signals of related tasks that provide this knowledge. To improve our model's ability to generalize, we can share representations between tasks that are similar. This type of learning is called  Multi-Task Learning.
 
Multi-task learning occurs when you are attempting to optimize more than one loss function at a time. When you are doing something always stop and take a couple of minutes to think. Think about what you aim at achieving in terms of MTL. Then conclude from that information. 

### MTL METHODS FOR DEEP LEARNING.
We will be discussing two methods. For multi-task learning using Deep Learning, either hard or soft parameter sharing is used for hidden layers.

#### Hard parameter sharing 
Multi-tasking learning in neural networks is most achieved via sharing hard parameters. It is implemented by sharing the hidden layers amongst all jobs while maintaining several task-specific output layers. This is a very beneficial strategy since it reduces the danger of overfitting by having a model for diverse tasks using a common hidden layer. Overfitting is when the model takes in and learns concepts from the noise or random oscillations in the training data.

#### Soft parameter sharing 
Soft parameter sharing adds a constraint to achieve similarity among related parameters rather than sharing the same value. Furthermore, we penalize the difference in parameters across the models that we train for each task. By loosely connecting the shared space representations, this method, in contrast to rigid sharing, allows activities greater flexibility. 

### MTL Mechanisms 
For us to be able to understand multi-tasking learning better, we must understand the mechanisms that underlie it. Although an inductive bias acquired by multi-tasking learning looks intuitively plausible.

#### 1.Attention focusing 
 It may be challenging for a model to distinguish between important and irrelevant variables. If the job is noisy or if the data set is small yet high-dimensional. As subsequent tasks provide further evidence for the insignificance of those features. Multi-tasking learning can enable the model to concentrate on those features.
 
#### 2.Regularization 
 MTL is a regularizer since it introduces an inductive bias into the equation. As a result, the threat of overfitting and then the ability of the model to fit random noise are reduced. 
 
#### 3.Eavesdropping 
 A task may find it easy to learn some features while another task may find it difficult to learn these features. The difficulty in learning may be because the task is interacting in a much more complex manner with the features. It may also be because other features are interfering with the ability of the model to learn this feature.
 
Multi-tasking learning enables us to allow the task with difficulty in learning the new feature to eavesdrop on the task that learns the new feature. By doing this the task with difficulty in learning will be able to learn the new feature. 
  
Directly teaching the model to anticipate the most critical traits via hints is the quickest and most straightforward method of achieving this goal. 

#### 4.Implicit data augmentation 
 Training our model on more data is made easier thanks to MTL. We want to build a suitable representation for a task that avoids data-dependent noise. It should generalize effectively when you want to train a model on a certain task because all tasks are at least slightly noisy. 
 
A model that can learn two tasks at the same time can learn a broad representation of the noise patterns associated with each task. To avoid overfitting, the model should learn both tasks simultaneously, so that the noise patterns can be averaged into a better representation of the data. 
 
### MTL in non-neural models. 
 As a starting point, we'll look at the research on multi-task learning for linear models, kernel approaches, and Bayesian algorithms to get a better understanding of multi-tasking learning in deep neural networks. When it comes to multi-task learning, we'll focus on one essential idea which is modeling the links between tasks. 
 
#### Modeling the links between tasks.
 The group-sparsity constraint limits our model to examine only a few features, although these features are used extensively in all tasks. In other words, all of the above theories presuppose that multi-task learning involves tasks that are tightly linked to one another. As a result, certain jobs may not be directly related to others. Negative transfer can occur when information is shared with an unrelated task, resulting in a decrease in performance. 
  
Thus, instead of relying solely on a lack of information, we want to use prior knowledge to identify which tasks are linked and which are not. A constraint that requires task grouping may be more suited in this case. It suggests penalizing the norms and the variance of your task column vectors with a constraint to apply a clustering constraint. 
  
### Auxiliary tasks in MTL.
If we want to anticipate the outcomes of numerous tasks at once, MTL is the ideal tool for the job. In finance and economics forecasting, for example, we might wish to anticipate the value of numerous presumably linked variables, or in bioinformatics, where we would want to predict indicators for various illnesses at once. Drug discovery situations, in which tens or even hundreds of active molecules must be predicted, increase the accuracy of MTL with each additional work.

However, in most cases, we just worry about one thing: our performance on that one activity. In this section, we'll look at how we can still reap the rewards of multi-task learning by finding a good auxiliary task. 
   
#### 1.Focusing attention 
The auxiliary job can also be utilized to draw attention to sections of the picture that a network would otherwise overlook. Lane markings, for example, may be overlooked in the context of a single-task paradigm since they take up only a tiny portion of the image which is not always there. However, auxiliary tasks like predicting lane markings push a model to learn to represent them. This may subsequently be employed for the main goal. Face recognition can be improved by learning to predict the placement of facial landmarks points as an auxiliary job. 
   
#### 2.Quantization smoothing 
   Even though a continuous scale could be more logical, labels are provided in a discrete set for many jobs. There are various instances where human appraisal of data is required, such as forecasting illness risk. Because they are less quantified, auxiliary tasks that are easier to master can be used in these situations. 
   
#### 3.Predicting the future through looking into the past.
Some features are only available after the forecasts have been made in several cases. It is possible to make more accurate assessments of barriers and lane markings for self-driving cars when the vehicle is past them. As an extra example, Caruana (1998) cites the prediction of pneumonia based on the findings of future medicinal trials. Data that is not available at runtime can't be used to create new features in these instances. When employed as an additional training assignment, it can help the model learn new information.
   
### Applications of MTL 
    
#### 1.Machine learning in self-driving cars.
Self-driving automobiles are conceivable because of machine learning algorithms. Using cameras and other sensors, a car may gather information about its surroundings and use it to make decisions about what to do next. Using machine learning, automobiles can learn to accomplish these activities as well as (or perhaps better than) human beings can.
    
#### 2.Predictions for the Stock Market.
In the world of trading, algorithms and computers are used extensively. Trading using pre-programmed computer systems that obey a set of well-defined rules is known as algorithmic trading. Algorithmic trading is also known as algo trading or automatic trading.

Because they manipulate data and estimate the future market picture with great precision, machine learning algorithms are tremendously helpful in optimizing human decision-making processes. Traders can take advantage of these forecasts to enhance their profits. Traders realize that human emotions can be a major stumbling barrier to achieving their full potential in the market. Algorithms and computer programs can make choices faster than humans and without the impact of external elements such as emotions.
    
#### 3.Detection and recognition of objects.
Computer vision systems have progressed greatly in the area of accurate and efficient object detection. The solution for object detection has improved dramatically since the arrival of deep learning techniques. Intending to obtain high accuracy and real-time performance, the project attempts to combine the latest object detection techniques. In many object identification systems, the use of alternative computer vision techniques to assist the deep learning-based approach is a big problem, resulting in slow and inefficient performance. End-to-end, a deep learning approach is utilized to solve the challenge of object detection. The most difficult publicly accessible dataset is used to train the network, and a yearly object detection challenge is run on it. For those applications that require object detection, the results are rapid and accurate.
    
### Conclusion 
In several machine learning applications, such as natural language processing, speech recognition, and computer vision, multi-task learning has proven successful. We've covered the basics of MTL in a neural network in this article. We've also given a review of related research and highlighted recent developments. I hope this essay helps you implement MTL by illuminating how MTL works. 
