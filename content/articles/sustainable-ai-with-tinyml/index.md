---
layout: engineering-education
status: publish
published: true
url: /sustainable-ai-with-tinyml/
title: Sustainable AI with Tiny Machine Learning
description: Tiny Machine Learning (TinyML) can be defined as the collaboration of machine learning and embedded ultra-low power internet of things devices.
author: collins-ayuya
date: 2020-11-05T00:00:00-14:00
topics: [Machine Learning]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/sustainable-ai-with-tinyml/hero.jpg
    alt: tiny machine learning image
---
Tiny machine learning is at an intersection of embedded devices and machine learning. It is being touted as *the next AI revolution*. However, the carbon footprint of AI has been increasing with the evolution of AI. There is a need for more energy-efficient computing. This is one of the challenges TinyML can address.
<!--more-->
### Table of contents
This article will be covering the following:
1. Tiny machine learning and how it works.

2. The reason for tiny machine learning.

3. The benefits of tiny machine learning.

4. The challenges of tiny machine learning.

5. The applications of tiny machine learning.

### Prerequisites
A basic understanding of machine learning and embedded systems would be helpful for any reader following along. For an introduction or refresher on some basic machine learning concepts check out this [article](/supervised-learning-algorithms/).

### Useful terms
**MCU** – [Microcontroller units](https://www.arrow.com/en/research-and-events/articles/engineering-basics-what-is-a-microcontroller) refers to integrated circuits used for specific applications such as in consumer electronics, telecommunications, and touch sensing solutions. They often control other parts of an electronic system and can interface with the physical world through built-in communication and peripherals.

**IoT** – The Internet of things is a system of computing devices, objects, digital machines and more, connected over the internet. These “things” can to communicate over a network without requiring human interaction.

**Embedded device** – An electronic device that uses a programmable device known as a microprocessor. These devices are meant to be very small, consume little amounts of power, and have very limited computing power. As a result, they often serve one specific function. An embedded device may or may not have the capability to be connected to the internet. Examples of embedded devices include an ATM, a heart rate monitor in a smartwatch, a pacemaker, among others.

**Embedded systems** – Computer systems with a dedicated function within a larger electrical or mechanical system. This is often a combination of software, hardware, and firmware to carry out said dedicated function. These systems can either have fixed functionality or be programmed. Embedded systems can be implemented in industrial machines, vehicles, mobile phones among others.  

**Frugal objects** – Independent “things” that specialize in performing concrete operations that can be programmed with software as opposed to having specific electronics for each task. Examples include environmental data collectors, wearables, and actuators.

**Edge computing** – A distributed computing framework that sees computing being done near or at a data source as opposed to relying on the cloud. The idea is to reduce the proximity of data to computing resources. Analysis and processing of data are done closer to where data is generated.

This is contrary to the approach where data is sent to the cloud, a centralized data center. Using this centralized approach gives rise to latency issues, inefficient use of bandwidth as well as privacy and security concerns. However, edge computing offers benefits such as better response times and better insights.

An example would be autonomous vehicles. These vehicles need to make decisions in real-time whereas it would take a few milliseconds to transmit to the cloud. These few milliseconds may have a crucial impact on the real-time reaction of these vehicles. Delay in the reaction of such vehicles may put the safety of passengers and pedestrians alike in jeopardy.   

**Big data** – Datasets with a size or type beyond the ability of traditional relational databases to capture, process, and manage data with minimal latency.

### Tiny Machine Learning
Tiny Machine Learning (TinyML) can be defined as the collaboration of machine learning and embedded ultra-low power internet of things devices. Traditionally, these two fields have more often than not operated independently. However, they are being combined to create an emerging engineering discipline with the potential to revolutionize multiple industries. Areas that stand to reap the most rewards from TinyML are energy-efficient computing and edge computing.  

#### How it works
TinyML algorithms largely work the same way as a typical machine learning algorithm. TinyML models are trained on the cloud or a user’s computer. After training, TinyML tasks come into play in processes of model compression.

Model compression involves the shrinking of larger pre-trained models into smaller ones. This is done without sacrificing accuracy. Why do we need to compress models? Consider typical machine learning devices like mobile phones.

They have roughly 8GB of RAM. Microcontrollers have a rough range of 100KB to 1MB of RAM. Microcontroller units have a few constraints, that we will discuss later on. These constraints justify the compression of models to be able to run them on microcontroller units. To compress a model, a few processes may be used. Let’s give a couple of processes as examples.

**Pruning** – Consider a neural network. Pruning is a process used to represent a model in a miniature manner. This is by removing neurons that give little utility to the output. Though it is worth mentioning that it's not so obvious which (order of) parameters should be deleted. To determine which parameters are to be deleted, the saliency of parameters is considered.

The parameters with the least saliency are those that have the least effect on the training error when deleted. It's a decent strategy to delete the least salient parameters. For instance, smaller neural weights are considered in this process as larger ones often have a greater impact on output. To fine-tune the output, the network is re-trained on the pruned architecture.

The model is then shrunk into the pruned architecture. Since the smaller weights are eliminated and the ones with a notable influence on output are kept, the new pruned architecture does not sacrifice the accuracy of output. To understand the pruning process in more detail, consider reading this [paper](http://yann.lecun.com/exdb/publis/pdf/lecun-90b.pdf).  

**Deep compression** – Deep compression involves  the process of quantization and Huffman encoding. Quantization is a process that approximates a neural network that uses floating-point numbers, by a neural network of low bit-width numbers. The goal is to reduce the memory and computational requirements used by the neural networks. In the context of TinyML, this enables the quantization of a model to make it compatible with the architecture of an embedded device.

The subsequent process is [Huffman encoding](https://en.wikipedia.org/wiki/Huffman_coding#Terminology). It is a lossless data encoding algorithm used for data compression tasks. It forms the basic idea behind file compression. For TinyML, it's used to store data most efficiently, thus reducing the model size even further. It's worth noting that this step is optional.

The model is converted into a format interpretable by a light neural network interpreter like [TF Lite](https://www.tensorflow.org/lite). It's then compiled into C or C++ code. These are languages that most microcontrollers use. The interpreter then runs the model on the device.

#### Example of TinyML
Consider a smartphone. They're constantly listening for very specific words such as “Hey Google” on Android phones. If this continuous activity is dependent on the main CPU of the phone, the phone battery would be depleted rather quickly. To avoid this, specialized low-power hardware that is powered by a tiny battery is used. It allows a smartphone to actively listen for specific “wake words” without draining the main phone battery. This works even when the CPU is not active. This is an example of TinyML in action.

But why do we need to pay more attention to TinyML?

### The reason for Tiny Machine Learning
The biggest reason why TinyML deserves more attention is sustainability. Environmental sustainability refers to the responsible interaction with the planet to maintain natural resources. The goal of said sustainability is to ensure that future generations have the natural resources required to live not only an equal but better life than current generations.

Sustainability is being threatened by some technology trends. Machine learning models were small enough to be run on basic local machines. Data produced from our daily digital activity keeps growing at an incredible rate. Machine learning and big data are based on extracting valuable information from very large amounts of data.

The evolution of Graphics Processing Units (GPUs) has made it possible to deal with much larger datasets. Cloud-based services (like Software-as-a-Service platforms) also emerged. However, the convergence of the increase in digital data produced with the advancement of GPUs and the emergence of cloud services meant that the size of algorithms could continue to grow.

As they grew (exponentially) so did their computational requirements. For example, consider state-of-the-art language models like [BERT](https://arxiv.org/abs/1810.04805), [GPT-2]( https://cdn.openai.com/better-language-models/language_models_are_unsupervised_multitask_learners.pdf) and [GPT-3](/introducing-gpt3/#). Bert Large was released in 2018 with 355 million parameters to its name. GPT-2 followed in 2019 with 1.5 billion parameters. This year, GPT-3 blew them both out of the water with 175 billion parameters.

This demonstrates that the size of these language models is increasing by at least a factor of 10 annually. In fact, model sizes are already outpacing GPU memory. To read more on these models check out this [article](/introducing-gpt3/#).

Having such large models means that one would need great amounts of power to run and maintain the models. Power usage has been increasing with a scary increase in the size of models. It is estimated that GPT-3 used about 3 GWh of electricity to train. You can imagine the size of carbon emission as a result of such power usage. The carbon footprint as a result is very large and will keep increasing if these trends continue.

TinyML offers a sustainable approach to reduce power usage and consumption. It also allows machine learning models to run on diverse end devices. For all the potential that TinyML has, it had previously been given very little attention. This is because of the constraints associated with microcontroller units.

However, frugal objects have penetrated our daily lives thanks to the rapid emergence of IoT. The possibility of imparting local intelligence into frugal objects has opened up many opportunities for building networks of collective intelligence. We've already discussed the concepts of model compression.

Let's look at a tree-based algorithm called [Bonsai](https://microsoft.github.io/EdgeML/static/docs/publications/Bonsai.pdf). It's used for efficient prediction on IoT devices. It can run on resource-constrained devices (such as an Arduino Uno with 2 KB available of RAM) since it can be as small as 2 KB.

However, it can perform better than a 4 MB neural network. Recalling the process of pruning, we can understand how this could be possible. Pruning makes networks smaller and faster. According to the aforementioned paper, the prediction accuracies of Bonsai could be as high as 30 percent more than state-of-the-art resource-efficient machine learning algorithms.     

### Why should we turn to Tiny Machine Learning?
#### Energy efficiency
The use of Graphics Processing units and powerful processors requires a great deal of power. Wired or wireless transmission of data, can be very energy-intensive as well.

Yet, even at their greatest workload, the use of MCU-based solutions use significantly less power when compared to the aforementioned GPUs and processors. This presents MCUs the opportunity to depend on batteries. It also allows MCUs to carry out some form of energy harvesting. Their energy efficiency allows them to be placed almost anywhere. They don't need to be connected to a power grid.

A smart unit – due to its efficient power consumption - can also be combined with larger battery-powered devices to become some form of connected smart entities.

#### Low cost
There are hardware constraints associated with frugal objects(being connected). For example, in a world where we value great processing power, these devices lack such qualities. Furthermore, these units are very simple in terms of design and purpose. This allows the cost per unit to be very reasonable. These devices have been embraced for use in IoT architectures in various sectors. These sectors include agriculture, e-health, and entertainment.

These units are heterogeneous and are often used as end devices in IoT networks. They are also reprogrammable. Their low cost, heterogeneity, and re-programmability make a strong case for imparting intelligence in these deployed devices. The result would be a transition into more flexible and smarter systems.

#### Latency
Standard IoT devices send data to the cloud to be processed. A response is then transmitted back to an end device. Consider Amazon’s Alexa and Alexa enabled devices. The end devices appear to be intelligent. But, when they transmit to the cloud, they have to wait for a response from Alexa’s algorithms to determine their output.

This means that they have no local intelligence. We can even label them “dumb”. The speed of transmission to the cloud and back to local devices will be dependent on one’s internet speed. Slow internet yields slow transmission, slower processing, and ultimately an undesirable delayed response.

Although, if it were a situation involving an intelligent end device with on-device decision making abilities, there would be little to no latency when waiting for a response. Computing tasks are not offloaded to the cloud. Furthermore, it would be better to be able to efficiently run out complex machine learning algorithms on end devices. This would achieve the real-time execution of tasks. Notable advances are being done to achieve this end goal.

#### System Reliability and Data Security
Transmission of raw data from end devices to the cloud over lossy and unpredictable wireless channels opens up the whole system to a couple of problems. First, wireless transmissions need a sizeable amount of energy. Two, these transmissions need a lot of bandwidth.

This transmission approach is also prone to errors. Another concern is the possibility of cyberattacks. For example, a [man-in-the-middle attack](/man-in-the-middle-attack/). Information can be intercepted by a third party between the end device and the cloud.

Furthermore, having data in a single location (which is the cloud in this case) makes it less secure. In the event of a breach, all systems dependent on the warehoused data will be affected. The reliability of the system is affected.

A way to avoid many of these problems would be by having on-device data processing. Transmissions would be minimized. The data being transmitted may not be as vital to a potential attacker. This is because (the data) processing and decision making abilities will occur locally. Communication between the device and the cloud may not contain very valuable information. The system becomes more secure and reliable as a result.

### Challenges with Tiny Machine Learning
Integrating machine learning into frugal devices presents a couple of challenges.

#### Device heterogeneity
Existing devices are heterogeneous. They come in all kinds of forms, shapes, and sizes. This means that they possess different processing capabilities, power consumptions, storage, and memory sizes among others.

It becomes difficult to have standard TinyML tools that could be used by most MCU setups. Designing generic TinyML benchmarking methodologies to be used in these setups becomes more difficult. These type of frameworks would make it easier to increase awareness and adoption of TinyML and enabled devices.

#### MCU Constraints
Let’s put aside the memory and computational constraints associated with MCUs. An approach of scaling up the computational resources in order to meet machine learning processing needs is not feasible.

It would be wise for MCUs manufacturers to make sure their chipsets are ready for ML integration. Application development will be easy thanks to the support of device-level software.

Furthermore, mainstream data science frameworks need to be adapted to the requirements of MCUs. This will help grow the reach of TinyML.

### Applications of Tiny Machine Learning
#### Industry 4.0
We can describe Industry 4.0 as an initiative that uses various systems to build automated, integrated, and scalable production systems of the future. Industry 4.0 is powered by technologies such as the Internet of Things. To learn more about Industry 4.0, check out this [article](/industry-4.0-and-cybersecurity/) I wrote a while back.

Under the banner of Industry 4.0, manufacturing and industrial sectors are benefitting from vast digitalization.

MCUs in use under this scope are heterogeneous in nature. They vary in terms of memory or computing requirements. This variation limits their capability to run certain processing tasks. Application of TinyML in Industry 4.0 eases these limitations. Here’s how.

Machine learning-based Decision Support Systems can be integrated into MCUs. These systems can help MCUs decide on whether to take up certain computational tasks or push them to higher processing layers like the cloud or edge.

This makes a network more efficient. The restraints of the heterogenous MCUs don't limit the processing tasks to higher processing layers. Processing tasks are well spread out throughout the network.

#### eHealth
TinyML shows tremendous potential in healthcare. An example application in this sector would be health monitoring. Using machine learning-based models on end devices, doctors can track and note patterns in a variety of patient activities. This makes predictive analytics much simpler. The result is better and more personalized patient care.

This approach would also allow the system to handle a larger volume of data without any trade-offs in performance. Data processing and decision making on end devices make this possible by reducing dependency on the cloud. A positive outcome out of all this would be a reduction in latency.

Another example of TinyML in healthcare is the improvement of hearing aids. Basic hearing aids have some challenges. First, hearing in the presence of background noise is hard. Sound quality may vary greatly. Which in turn affects listening comfort. Consider a truly intelligent hearing aid.

Since processing and decision making are on-device, the use of machine learning can assist in real-time filtering and adjustment of the sound input. This would ensure that the correct sound signals are being clearly and audibly received. Sound quality will also improve as a result. A few more examples include activity recognition and visual assistance, among many others.

#### Smart spaces
This refers to smart/cognitive buildings or smart cities. These settings boast of IoT-based systems such as surveillance and monitoring systems. Examples of such systems would include traffic monitoring and pollution monitoring systems.

TinyML can improve the collective intelligence of such systems. It can evolve these systems into highly intelligent entities by giving them greater ability to make decisions in a quick and decentralized manner.

Considering the aspect of sustainability, these end devices would consume much less power. Besides the reduction of the carbon footprint, this means these devices will not necessarily need to be connected to the power grid.

This also allows them to be placed in rural as well as remote areas. Furthermore, we mentioned that these devices would be very affordable. The adoption of these end-devices will be prevalent in such areas thanks to all these factors. Disadvantaged areas could, as a result, turn into centers for innovation, business, and development.

#### Smart agriculture and farming
The scope of smart agriculture and farming is the efficiency and health of animals and crops. Improvement in the efficiency and health of crops and livestock leads to an improvement in the overall quality of production. This in turn leads to an increase in revenue.

Other implementations of TinyML loosely related to smart farming and agriculture involve pet trackers and feeders. Smart-garden irrigation control systems as well. Both could benefit from the use of machine learning-enabled devices. For example, an intelligent pet tracker could be used to track a pet’s vitals, activities, and mannerisms then make on-device decisions on how to ensure that the pet is the most healthy and productive.

This could be used to determine a pets' diet and diet frequency. The same perspective can be applied to a smart-garden irrigation system. It would take various factors-such as light intensity, humidity, plant health and type, and perhaps the water quantity available-into consideration before deciding when and how to carry out irrigation.

### Wrapping up
To continue improving the quality of life of future generations, we need to have environmental sustainability at the forefront of our efforts. Tiny Machine Learning is good for the planet. It offers us a chance to continue evolving artificial intelligence. It also encourages us to reduce our carbon footprint through the use of truly intelligent energy-efficient devices.

Besides sustainability, we have seen that it also opens up many opportunities for innovation and development in many sectors. The benefits of reducing the cost of devices, lowering latency, and improving data security. Considering all this, tiny machine learning is the sustainable future of machine learning. It truly has the potential to become the next artificial intelligence revolution.

### References
1. R. Sanchez-Iborra and A. F. Skarmeta, ["TinyML-Enabled Frugal Smart Objects: Challenges and Opportunities,"](https://doi.org/10.1109/MCAS.2020.3005467) in IEEE Circuits and Systems Magazine, vol. 20, no. 3, pp. 4-18, thirdquarter 2020, doi: 10.1109/MCAS.2020.3005467.

2. [Tiny Machine Learning: The Next AI Revolution](https://towardsdatascience.com/tiny-machine-learning-the-next-ai-revolution-495c26463868)

3. [Why the Future of Machine Learning is Tiny](https://petewarden.com/2018/06/11/why-the-future-of-machine-learning-is-tiny/)

4. [Why TinyML is a giant opportunity](https://earthnewsreport.com/2020/01/12/why-tinyml-is-a-giant-opportunity/)

---
Peer Review Contributions by: [Lalithnarayan C](/engineering-education/authors/lalithnarayan-c/)
