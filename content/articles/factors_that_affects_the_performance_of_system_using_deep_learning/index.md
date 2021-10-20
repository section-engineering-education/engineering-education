### Introduction
In our modern world, technology has enhanced the building of some smart self-driven cars, smart digital systems such as "Alexa", and even smart medical and agricultural equipment’s all around us which are been built using the principle of deep learning. This developed technology has been of great benefits to our everyday society. For that reason, the quest in understanding how this AI based technology (deep learning) works is paramount for a faster production of similar systems. As such, people have came up with questions like;

How does deep learning works?, Why do smart systems like Alexa recognize humans and objects, and how can a car drive itself without humans sitting in to control it?

Deep Learning is where algorithms learn independently of excessive amounts of information. The system algorithm tends to be smarter having gathered functional experience from more data sets just like humans get smarter by learning.

### Why Is Deep Learning Important
Deep learning is the trending technology all around us. The ability of a system to cluster(collect) data and make predictions with incredible accuracy makes deep learning. The trained algorithms will recognize individual faces when collecting their photos through snapping, make a predictive analysis of consumer behavior, or detect fraud.
Deep learning enables higher percentage of turn in data sets and also increase intelligence in technology. With the rapid growth in technology around us, Deep Learning has uniquely aid in the major breakthrough of technology to almost if not all aspect of life such as medicine, science, agriculture, etc. Deep learning has always greatly enhance the improvement of humans lives when considering technologies like IoT, embedded system and Robotics.
Unsurprisingly, considered problem and tuning budget are the two major factors used to checkmate the performance rate of any Deep Learning optimizer.

### Factors That Affects The Performance Of System Using Deep Learning

1. **Considered problem:** This simply makes the task the designed system is to work for. While modelling an algorithm this problem is to be considered as most important,
-	Why is this system develop, 
-	‌How will the developed handle the user's demands, 
-	‌Re-engineering adaptive ability

2. Evaluation of default hyperparameters for multiple optimisers is not easily achieved. This may be due to an implicit learning rate schedule of adaptive methods (e.g. Adam).
3. It needs one with a great and deep understanding of deep learning to turn the learning rate schedule to improve the performance system.
4. Adam optimiser remains a strong baseline. Newer methods fail to consistently outperform it, highlighting the potential of specialized optimizers.


### Steps  Involved In Getting A Performance Performance Rate Of A System

1. **Understanding the role of Individual Units in a Deep Neural Network**

      Understanding the functional role of individual activation levels in convolutional Neural Networks is a bit problem. The problem of unit interpretability in deep networks needs to be understood to help hint the deep network and not completely opaque black boxes.
Network Dissection is our method for measuring the performance rate of a system in deep learning. The performance rate is interpreted to the network system for each individual network layer in the deep convolutional network. It involves the measurements of alignments between different layers (units) and the segmentation of dense data sets for a faster performance rate are drawn from this concept which is also called Broden. The technique is applied to a VGG-16 scene classifier and Progressive generative adversarial network(P-GAN) trained on kitchen images. For the convolution neural network(CNN) based classifier, they observe that units associated with objects and parts emerge in later layers, while earlier layers are largely associated with colors. The authors show that such neurons are highly important for the classification accuracy of the network and that their ablation harms the performance. For the generator network, on the other hand, object/part neurons can be found more frequently in earlier layers, while the later layers focus on colors. These highlights difference in information flow through a network that is trained to discriminate and one that has to generate scenes. Finally, artificial pruning concept units generates output of GAN which may be manipulated in some ways. Due to these reasons many interesting applications around targeting specific neurons such as adversarial examples and structured imprinting of images are designed.

2. **Improving Vision Transformers with Soft Convolutional Inductive Biases;**

 Convolutional networks provide a sturdy inductive bias layers. The implied weight sharing and notion of locality leads to translation symmetric transformation, reminiscent of activation patterns observed in primary visible cortex. 

Spatial long range data dependencies are not easy to achieve on CNNs despite their strong performance in the small data regime. Vision Transformers and their self-attention mechanism on the other hand are flexible and excel in the large data regime. But they require many parameters, data and some form of pre-training or distillation. D’Ascoli et al. (2021) try to get the quality of both worlds by introducing Gated Positional Self-Attention (GPSA). GPSA equips positional SA with a soft convolutional inductive bias and has the additional freedom to escape locality. It acts as a drop-in for plain soft-attention layers and can be initialised to act like a convolution. The training process can adjust a gating parameter, which regulates the attention paid to position and content information. The authors show that this leads to strong ImageNet improvements in terms of both sample and parameter efficiency compared to standard Vision Transformer architectures. Furthermore, they analyse what degree of locality was learned by the different GPSA layers and their heads. Interestingly, they find that early layers maintain more of their locality-biased initialisation, while later layers escape into attending more towards content data.

3. **How many degrees of freedom do we need to train deep;**

 The lottery ticket speculation postulates the existence of sparse trainable neural networks. It questions the role of over parametrization in optimising networks. But why is this the case? What are the theoretical underpinnings and what determines the degree of sparsity? Larsen et al. (2021) derive a theory based on the success probability of hitting a desired loss sub-level set. Intuitively, this probability increases as more and more degrees of freedom are made available to the network. But there are more essential factors, which determine the number of required dimensions: The distance of the parameter subspace from the sub-level set and its geometry. The authors proof a powerful theorem, which generalises Gordon’s Escape Theorem to well-known sets. The primary outcomes highlights the existence of a section transition in the success chance. Fewer dimensions are required, when commencing from a better initialization. Intuitively, the possibility of looking into a random direction (subspace) and seeing the moon (loss sub-level set) depends on the your distance from the moon. The authors verify these theoretical insights for various architectures/problem settings and propose so-called ‘lottery subspaces’: By leveraging information from a previous training run, they construct a low-dimensional projection of the parameters based on the top-d principal components of the trajectory. They show that these subspace-confined neural networks may even outperform lottery tickets for similar compression ratios.
 
Diagram demonstrating the different scenarios one can fall into when configuring the learning rate.

![different_scenarios_one_needs_to_know_when_configurating_the_learning_rate_in_deep_learning](engineering-education/factors_that_affects_the_performance_of_system_using_deep_learning/display_rate_charts.png)
 
Leslie N. Smith argued that you could estimate a good learning rate by training the model initially with a very low learning rate and increasing it (either linearly or exponentially) at each iteration.

>Note; Less training time, lesser money spent on GPU cloud compute. 

![different_scenarios_one_needs_to_know_when_configurating_the_learning_rate_in_deep_learning](engineering-education/factors_that_affects_the_performance_of_system_using_deep_learning/iteration.png)

 If at each learning iteration recorded,  plot the learning rate (log) against loss; we will see that as the learning rate increase, there will be a point where the loss stops decreasing and starts to increase. In practice, our learning rate should ideally be somewhere to the left to the lowest point of the graph (as demonstrated in below graph). In this case, 0.001 to 0.01.

![different_scenarios_one_needs_to_know_when_configurating_the_learning_rate_in_deep_learning](engineering-education/factors_that_affects_the_performance_of_system_using_deep_learning/learning_rate_scale.png)

