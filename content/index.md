### INTRODUCTION
Deep learning is a type of artificial intelligence that simulates how humans learn specific sorts of information. It's a branch of AI and machine learning. This technology has been used to create many self-driving cars and smart digital devices.
 
When given raw data, a deep learning system chooses which attributes are most relevant on its own. Deep learning is carried out using [artificial neural networks](https://www.simplilearn.com/tutorials/deep-learning-tutorial/multilayer-perceptron) with multiple layers. 
Deep Neural Networks (DNNs) are networks that conduct difficult operations such as representation and abstraction at each layer to make sense of images, music, and text. 
Deep learning is the fastest-growing field in machine learning, and an increasing number of firms are using it to create new business models.
### Table Of Content
-	[Introduction](#INTRODUCTION)
-	[Prerequisites](#Prerequisites)
-	[The Concept of Deep Learning](#The-Concept-of-Deep-Learning)
-	[Some Determinants That Transform Deep Learning Systems’ Performance](#Some-Determinants-That-Transform-Deep-Learning-Systems-Performance)
-	[How To Get A Perfect Performance Rate From A Deep Learning System](#How-To-Get-A-Perfect-Performance-Rate-From-A-Deep-Learning-System)
-	[Diagram demonstrating the different scenarios one can fall into when configuring the learning rate](#Diagram-demonstrating-the-different-scenarios-one-can-fall-into-when-configuring-the-learning-rate-.)
-	[Conclusion](#CONCULSION)
-	[Further Reading](#Further-Reading)

### Prerequisites
To follow along with this tutorial, you need to be familiar with the following;
-	Programming Languages like Python, Java, C++
-	Calculus
-	Probability
-	Statistics
-	Linear Algebra
-	[TensorFlow](https://www.google.com/url?sa=t&source=web&rct=j&url=https://www.tensorflow.org/&ved=2ahUKEwi15PyaroL1AhWmS2wGHZZUBdMQFnoECF4QAQ&sqi=2&usg=AOvVaw0TGZBeXHx2CVPI2FiDZclR) 
-	[Microsoft Cognitive Toolkit](https://docs.microsoft.com/en-us/cognitive-toolkit/) 
-	[Pytorch](https://www.google.com/url?sa=t&source=web&rct=j&url=https://pytorch.org/&ved=2ahUKEwi4lMHSr4L1AhXozIUKHVkeAO4QFnoECAUQAQ&usg=AOvVaw2mABY6VbqZdRJYnleMzDSb) 
-	[Keras](https://www.google.com/url?sa=t&source=web&rct=j&url=https://keras.io/about/&ved=2ahUKEwjX16yCrYL1AhUGyoUKHaoMBqMQFnoECCoQBQ&usg=AOvVaw3frsnniocU9GHfkfWqfuMJ) 

### The Concept of Deep Learning
In deep learning, an excessive volume of information [data sets](  https://www.simplilearn.com/what-is-data-article) can be trained at the same time. This uses learning algorithms in deep learning. Deep learning systems tend to gather functional facts from larger datasets. 

Artificial neural networks can classify data based on responses to a series of binary true or false questions involving highly complicated mathematical calculations while processing the data. 

A facial recognition algorithm, for example, learns to detect and recognize face edges and lines, then more significant aspects of the faces, and finally overall representations of faces. The algorithm learns and improves with time, increasing the likelihood of getting it right. In this situation, the facial recognition software will recognize faces properly over time.

The ability to fine-tune the budget and the considered problem are two enhancing variables in Deep Learning. Any optimizer’s accuracy is measured using these factors.

### Some Determinants That Transform Deep Learning Systems’ Performance

 #### 1.  Taking into account the issue (considered problem) that the system will be tasked with resolving; 
-	What kind of system should be built? 
-	How will the developed algorithm handle the immediate user’s demands?
-	 How easily will re-engineering be made possible?

#### 2.   Evaluation difficulties of default hyperparameters for multiple optimisers.
 Poor [accuracy](https://sigopt.com/blog/common-problems-in-hyperparameter-optimization/) is obtained here as a result of low awareness from training the system data sets. The [Adams optimiser](https://www.google.com/url?sa=t&source=web&rct=j&url=https://machinelearningmastery.com/adam-optimization-algorithm-for-deep-learning/&ved=2ahUKEwjok7uPlIL1AhWBOewKHbYnDcMQFnoECDUQAQ&usg=AOvVaw3DyIH6zRqOJ31iqVVAy1z-)  is used in this deep system algorithm, which is adaptable. 

#### 3.  Technical expertise in deep learning system network design.
The demand and need for deep learning experts is highly recommended here. Experience is needed to increase the learning rate and improve the system's performance.

#### 4.  Which optimiser suits the deep network best?
According to [research]( https://optimization.cbe.cornell.edu/index.php?title=Adam), the Adam optimiser offers the highest and best performance rate. The ability to outperform other approaches (optimisers) is lacking. 

### How To Get A Perfect Performance Rate From A Deep Learning System
>The performance rate of a deep learning system is focused on vision and pattern recognition.

####  1. A Deep Neural Network System's Individual Units' (Layers') Functionality 

In deep learning, [convolutional neural networks](https://reader.elsevier.com/reader/sd/pii/S1877050918308019?token=16B4CA6789714BCA2CEC6D44659321C7510FF2D8866A0E0CC6297D50E6129D2A4365D975C5F320F49E355B8662952541&originRegion=eu-west-1&originCreation=20211226214344) must take individual activation levels into account. This step, though, is difficult to achieve. First, the issue of [unit interpretability]( https://www.google.com/url?sa=t&source=web&rct=j&url=https://www.pnas.org/content/117/48/30071&ved=2ahUKEwiSvqrstIL1AhXVOuwKHTtTDZAQFnoECAYQAQ&usg=AOvVaw2Cnz9K-g6M2q__QYAUi3h1) in deep networks must be grasped.
This knowledge will assist the network in avoiding becoming a completely opaque black box. Our measurement method is [network dissection](https://www.google.com/url?sa=t&source=web&rct=j&url=https://arxiv.org/pdf/1801.03454&ved=2ahUKEwiQua_b5oD1AhXPBWMBHQyaDHEQFnoECAoQAQ&usg=AOvVaw0oRGCGYRncsO9M6TZhGf3R) . This method calculates a system's deep learning performance rate.
Measurements of alignments between different levels are also part of network dissection in the deep convolutional network (units). It is being done to separate dense data sets for a quicker performance rate. This segmentation notion is also known as "broden." Other classifier networks can use the Broden approach as well. The Progressive generative adversarial network [P-GAN](https://www.google.com/url?sa=t&source=web&rct=j&url=https://machinelearningmastery.com/introduction-to-progressive-growing-generative-adversarial-networks/&ved=2ahUKEwiK4dCV9YD1AhWK2hQKHblpDToQtwJ6BAgMEAE&usg=AOvVaw2AHbr7wD_no4DEy3LpvS7n) with the [VGG-16](https://www.google.com/url?sa=t&source=web&rct=j&url=https://towardsdatascience.com/step-by-step-vgg16-implementation-in-keras-for-beginners-a833c686ae6c%23:~:text%3DVGG16%2520is%2520a%2520convolution%2520neural,vision%2520model%2520architecture%2520till%2520date.%26text%3DIt%2520follows%2520this%2520arrangement%2520of,consistently%2520throughout%2520the%2520whole%2520architecture.&ved=2ahUKEwjn5ZWL84D1AhUDyoUKHXnMAJUQFnoECAYQBQ&usg=AOvVaw1PMy6ITxkEdXItU7nbohvO)  scene classifier. The most common are these two.
The network's training methods are the [generator and discriminator](https://www.google.com/url?sa=t&source=web&rct=j&url=https://towardsdatascience.com/understanding-generative-adversarial-networks-gans-cd6e4651a29&ved=2ahUKEwijh9PZ9YD1AhUSCRoKHe5UC2IQFnoECBAQBQ&usg=AOvVaw3bSHWOnQinYkYMikEE0RfV)  progression layers. A convolutional neural network (CNN)-based classifier is made up of two layers. These layers, which are referred to as the earlier and later layers,  The final layer is made up of two levels: objects and parts. The system associates with the layers and emerges when it notices this sub-layer. There is a lot of color dictation in the early levels.
 [Research has highlighted](https://www.google.com/url?sa=t&source=web&rct=j&url=https://towardsdatascience.com/four-deep-learning-papers-to-read-in-august-2021-7d98385a378d&ved=2ahUKEwiyve-Gg4H1AhVED2MBHW6TCiIQFnoECAgQAQ&usg=AOvVaw2qZJ-4wb2puuQlEjtLFtoR) the importance of performance rate categorization in CNN neurons. Some deep neural networks are trained to create scenes, while others are trained to recognize them. This helps to improve the data flow in the system. 
Manipulation of [GAN's](https://www.google.com/url?sa=t&source=web&rct=j&url=https://machinelearningmastery.com/what-are-generative-adversarial-networks-gans/%23:~:text%3DGenerative%2520Adversarial%2520Networks%252C%2520or%2520GANs%252C%2520are%2520a%2520deep%252Dlearning,learning%2520models%2520in%2520this%2520architecture.&ved=2ahUKEwiXocSghYH1AhVED2MBHW6TCiIQFnoECAYQBQ&usg=AOvVaw1vAvol6lcsmFsK-AtuUnvE)  unit-producing outlets is complicated by artificial pruning. Trained images, like [adversarial examples](https://www.google.com/url?sa=t&source=web&rct=j&url=https://towardsdatascience.com/adversarial-examples-in-deep-learning-a-primer-feae6153d89&ved=2ahUKEwjHr7LdhYH1AhWj2-AKHVm2A6gQFnoECAsQAQ&usg=AOvVaw21jzLxpr8rCv72Rw7_j8bO) , are developed, categorized, and highlighted on certain neurons. These neurons are treated in some way in order to attain precision. 

#### 2. Soft Convolutional Inductive Biases' Effectiveness in Vision Transformation Improvement
The convolution network strongly supports inductive bias layers. The convolution network layers are made up of the concepts of [weight sharing and localisation](https://www.google.com/url?sa=t&source=web&rct=j&url=https://www.kaggle.com/residentmario/notes-on-weight-sharing&ved=2ahUKEwibrtGkhoH1AhWyB2MBHUQZCXgQFnoECEAQAQ&usg=AOvVaw2nrS_1vhaGRDqVqFnhFF6V) . These layers are based on imaging principles (translation, symmetric transformation, reflection). In visible corrected, activation patterns may be seen. 
On CNNs, training large data sets is difficult. The performance rate of Vision transformers is more consistent. Big data set algorithm systems have demonstrated this stability. When pre-trained, it is also termed a [self-attention](https://www.google.com/url?sa=t&source=web&rct=j&url=https://towardsdatascience.com/illustrated-self-attention-2d627e33b20a&ved=2ahUKEwi0rb2gjIH1AhXT8eAKHe58Dn4QFnoECCMQAQ&usg=AOvVaw0fDRMS_xhw3dL8Ig0VEhDg)  mechanism. (2021). The concept of Gated Positional Self-Attention [(GPSA)](https://arxiv.org/abs/2106.05795) has been proposed. This was done to aid in the investigation of the data's quality and performance. To avoid layer locations, GPSA employs self-convolutional inductive bias with freedom. Systems can move through various layers (locations), learn, govern, and collect content-specific data. During their training period, the hyperparameters provide this information. The method dramatically improves the display and correctness of hyperparameters. When compared to the traditional vision transformer method, this improvement is significant. The author goes on to discuss how to use image net samples and parameter efficiency in more detail. 
In its earliest layers, GPSA appears to initialize more hyperparameters. The final (later) levels are more concerned with content data (other distinctive data sets). 

#### 3. Enough degrees of freedom 
The main challenge here is fine-tuning the deep network's hyperparameters. This is a difficult task because the output's accuracy is in question. 
What key elements are used to determine a network's degree of freedom? 
Basic statistical speculation postulates exist to help examine the likelihood rate of an event. [Larsen et al.](https://arxiv.org/abs/2107.05802) (2021) suggest a theory to aid in the resolution of the fine-tuning issue. The probability of success in a deep network underpins this idea. This is what is expected to happen when the hyperparameters of a system data set are being trained.
In a deep network, the degree of freedom determines whether or not success (accuracy) is possible. During the training process, the theory has aspects to consider. [Gordon's Escape Theorem](https://www.google.com/url?sa=t&source=web&rct=j&url=https://arxiv.org/abs/2107.05802&ved=2ahUKEwjWopntroH1AhVIxIUKHUwyDgIQFnoECAcQAQ&usg=AOvVaw3B_I2CnjGnoMba9qVBL9XY)  is generalized by the theory that establishes a powerful theorem. This theorem can be applied to any set that is well-known. In a successful chance, the principal outcome emphasizes the presence of a section transition. It's best to keep dimensionality as low as possible while initializing parameters. Dimensionality influences the sub-level set of network layers.
The theory [(lottery subspaces)](https://www.semanticscholar.org/paper/Linear-Mode-Connectivity-and-the-Lottery-Ticket-Frankle-Dziugaite/3f06d02513a2763e472d2b5d5db08e9061081b9e) seeks to repeat data from prior training experiments. It then establishes the settings for a low-dimensional projection. It compares the parameters to such a trajectory's top-dimensional principal components. The result of this theoretical hypothesis is that both postulates are true. For the same compression, subspace-confined neural networks could even outperform lottery tickets. 

### Diagram demonstrating the different scenarios one can fall into when configuring the learning rate.

![different_scenarios_one_needs_to_know_when_configurating_the_learning_rate_in_deep_learning](engineering-education/factors_that_affects_the_performance_of_system_using_deep_learning/display_rate_charts.png)

Leslie N. Smith argued that you could estimate a good learning rate by training the model initially with a very low learning rate and increasing it (either linearly or exponentially) at each iteration.

>Note; Less training time, lesser money spent on GPU cloud compute. 

![different_scenarios_one_needs_to_know_when_configurating_the_learning_rate_in_deep_learning](engineering-education/factors_that_affects_the_performance_of_system_using_deep_learning/iteration.png)

 If at each learning iteration recorded,  plot the learning rate (log) against loss; we will see that as the learning rate increase, there will be a point where the loss stops decreasing and starts to increase. In practice, our learning rate should ideally be somewhere to the left to the lowest point of the graph (as demonstrated in below graph). In this case, 0.001 to 0.01.

![different_scenarios_one_needs_to_know_when_configurating_the_learning_rate_in_deep_learning](engineering-education/factors_that_affects_the_performance_of_system_using_deep_learning/learning_rate_scale.png)

 ### CONCULSION
With the vast and rapid development of technology, deep learning is the key to today’s smart world. This has brought an ease in communication between humans and their daily environment. There are some difficulties in understanding the deep learning system algorithm.
Some real-life postulates are cited to help design the deep network algorithm.
There are some factors that affect the performance of  deep learning systems. These factors tend to reduce the accuracy level of the system: These factors include: 

- Considered a problem i.e, the type of deep learning system to be developed.
- Evaluation difficulties of default hyperparameters for multiple optimisers.
- Technical know-how
- Which optimiser suits the learning algorithm best?

There are some steps to aim at in order to achieve a perfect performance rate in a deep learning system. Factors like;

- The functionality of individual layers in the deep network system.
- The efficiency of soft convolutional inductive biases in vision transformation improvement.
- Suitable degrees of freedom to aim at in the deep network while training.

### Further Reading
-	[Convolutional Neural Networks (CNN)](https://www.google.com/url?sa=t&source=web&rct=j&url=https://towardsdatascience.com/applied-deep-learning-part-4-convolutional-neural-networks-584bc134c1e2&ved=2ahUKEwjqwtTT9oD1AhULahQKHRkfDQsQFnoECAcQAQ&usg=AOvVaw1chCNpqFeQkWk2wtL4R0AK) 
-	[Hyperparameter Optimization](https://www.google.com/url?sa=t&source=web&rct=j&url=https://towardsdatascience.com/hyperparameter-optimization-for-optimum-transformer-models-b95a32b70949&ved=2ahUKEwjV2Pra64D1AhUSoRQKHdWkA5IQFnoECBIQAQ&usg=AOvVaw0KNK_HAhIl5_iDGfiRPOOU) 
-	[Performance rate improvement in deep learning]( https://machinelearningmastery.com/improve-deep-learning-performance/) 


