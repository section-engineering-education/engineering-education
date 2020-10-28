
![hero](/engineering-education/sustainable-ai-with-tinyml/hero.jpg)
[Image source](https://images.unsplash.com/photo-1595865211152-eec48f9055c7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=762&q=80)

Tiny machine learning is at the intersection of embedded devices and machine learning. It is being touted as "the next AI revolution". However, the carbon footprint of AI has been increasing with the evolution of AI. There is a need for more energy-efficient computing. This is one of the challenges TinyML can address.

### Table of Contents

1. Tiny machine learning and how it works

2. Motivation for tiny machine learning

3. Benefits of tiny machine learning

4. Challenges to tiny machine learning

5. Applications of tiny machine learning

### Prerequisites

Basic understanding of machine learning and embedded systems. For an introduction or refresher on some basic machine learning concepts check out this [article](https://www.section.io/engineering-education/supervised-learning-algorithms/).

### Useful Terms

**MCU** – [Microcontroller units](https://www.arrow.com/en/research-and-events/articles/engineering-basics-what-is-a-microcontroller) refer to integrated circuits used for specific applications such as in consumer electronics, telecommunications, and touch sensing solutions. They often control other parts of an electronic system and are able to interface with the physical world through built-in communication and peripherals.

**IoT** – The internet of things is a system of computing devices, objects, digital machines and more, connected over the internet. These “things” have the ability to communicate over a network without requiring human interaction.

**Embedded device** – An electronic device that uses a programmable device known as a microprocessor.

**Embedded systems** – Computer systems with a dedicated function within a larger electrical or mechanical system.

**Frugal objects** – Independent “things” which specialize in performing concrete operations that can be programmed with software as opposed to having specific electronics for each task.

**Edge computing** – A distributed computing framework that sees computing being done near or at a data source as opposed to relying on the cloud.

**Big data** – Datasets with a size or type beyond the ability of traditional relational databases to capture, process, and manage data with minimal latency.

### Tiny Machine Learning

Tiny Machine Learning (TinyML) can be defined as the collaboration of machine learning and embedded ultra-low power internet of things devices. Traditionally, these two fields have more often than not operated independently. However, they are combining to create an emerging engineering discipline with the potential to revolutionize multiple industries. Areas that stand to reap the most rewards from TinyML are energy-efficient computing and edge computing.

#### How it Works

TinyML algorithms largely work in the same way as a typical machine learning algorithm. TinyML models are trained on the cloud or on a user’s computer. After training, TinyML tasks come into play in processes of model compression.

Model compression involves the shrinking of larger pre-trained models into smaller ones. This is done without sacrificing accuracy. Why do we need to compress models? Consider typical machine learning devices like mobile phones. They have roughly 8GB of RAM. Microcontrollers have a rough range of 100KB to 1MB of RAM. Microcontroller units have a few constraints, which we will discuss later on. These constraints justify the compression of models in order to run them on microcontroller units. To compress a model, a few processes may be used. Let’s give a couple of processes as examples.

**Pruning** – Consider a neural network. Pruning is a process used to represent a model in a miniature manner. This is by removing neurons that give little utility to the output. Smaller neural weights are considered in this process as larger ones often have a greater impact on output. To fine-tune the output, the network is trained on the pruned architecture.

**Deep compression** – Deep compression involves processes of quantization and Huffman encoding. Quantization is a process that approximates a neural network that uses floating-point numbers, by a neural network of low bit-width numbers. The goal is to reduce the memory and computational requirements for using neural networks. In the context of TinyML, this enables the quantization of a model to make it compatible with the architecture of an embedded device. The subsequent process is [Huffman encoding](https://en.wikipedia.org/wiki/Huffman_coding#Terminology) is a lossless data encoding algorithm used for data compression tasks. It forms the basic idea behind file compression. For TinyML, it is used to store data in the most efficient way, thus reducing the model size further. It is worth noting that this step is optional.

The model is converted into a format interpretable by a light neural network interpreter like [TF Lite](https://www.tensorflow.org/lite). It is then compiled into C or C++ code. These are languages that most microcontrollers work in. The interpreter then runs the model on the device.

#### Example of TinyML

Consider a smartphone. They are constantly listening for very specific words such as “Hey Google” on Android phones. If this continuous activity is dependent on the main CPU of the phone, the phone battery would be depleted rather quickly. To avoid this, specialized low-power hardware that is powered by a tiny battery is used. It allows a smartphone to actively listen for specific “wake words” without draining the main phone battery. This works even when the CPU is not active. This is an example of TinyML in action.

But why do we need to pay more attention to TinyML?

### Motivation for Tiny Machine Learning

The biggest reason why TinyML deserves more attention is sustainability. Environmental sustainability refers to the responsible interaction with the planet to maintain natural resources. The goal of said sustainability is to ensure that future generations have the natural resources required to live not only an equal but better life than current generations.

Sustainability is being threatened by some technology trends. Machine learning models were small enough to be run on basic local machines. Data produced from our daily digital activity keeps growing at an incredible rate. Machine learning and big data are based on extracting valuable information from very large amounts of data.

The evolution of Graphics Processing Units (GPUs) has been making it possible to deal with much larger datasets. Cloud-based services (like Software-as-a-Service platforms) also emerged. However, the convergence of the increase in digital data produced with the advancement of GPUs and the emergence of cloud services meant that the size of algorithms could grow. And they did grow exponentially. As did their computational requirements. For example, consider state-of-the-art language models like [BERT](https://arxiv.org/abs/1810.04805), [GPT-2]( https://cdn.openai.com/better-language-models/language_models_are_unsupervised_multitask_learners.pdf) and [GPT-3](https://www.section.io/engineering-education/introducing-gpt3/#:~:text=Introduction%20to%20GPT3%20October%2010%2C%202020%20Generative%20pre-trained,people%20with%20little%20tech%20background%20to%20develop%20applications.). Bert Large was released in 2018 with 355 million parameters to its name. GPT-2 followed in 2019 with 1.5 billion parameters. This year, GPT-3 blew them both out of the water with 175 billion parameters. This shows that the size of these language models in particular is increasing by at least a factor of 10 annually. In fact, model sizes are already outpacing GPU memory. To read more on these models check out this [article](https://www.section.io/engineering-education/introducing-gpt3/#:~:text=Introduction%20to%20GPT3%20October%2010%2C%202020%20Generative%20pre-trained,people%20with%20little%20tech%20background%20to%20develop%20applications.).

Having such large models means that one would need great amounts of power to run and maintain the models. Power usage has been increasing with the scary increase in the size of models. It is estimated that GPT-3 used about 3 GWh of electricity to train. This is comparable to the output of about [three nuclear plants](https://www.britannica.com/technology/nuclear-power). You can definitely imagine the size of carbon emission as a result of such power usage. The carbon footprint as a result is very large and will keep increasing if these trends continue.

TinyML offers a sustainable approach to reduce power usage and consumption. It also allows machine learning models to be run on diverse end devices. For all the potential that TinyML has, it had previously been given scarce attention. This is because of the constraints associated with microcontroller units. However, frugal objects have penetrated our daily lives thanks to the rapid emergence of IoT. The possibility of imparting local intelligence into frugal objects has opened up many opportunities for building networks of collective intelligence.

### Why Should We Turn to Tiny Machine Learning?

#### Energy Efficiency

The use of Graphics Processing units and powerful processors requires a great deal of power. Wired or wireless transmission of data is energy-intensive as well.

Yet, even at their greatest workload, the use of MCU-based solutions use significantly less power compared to the aforementioned GPUs and processors. This presents MCUs the opportunity to depend on batteries. It also allows MCUs to carry out some form of energy harvesting. Their energy efficiency allows them to be placed almost anywhere. They do not need to be connected to the power grid.

A smart unit – due to its efficient power consumption - can also be combined with larger battery-powered devices to become some form of connected smart entities.

#### Low Cost

There are hardware constraints associated with frugal objects. For example, in a world where we value great processing power, these devices lack such qualities. Furthermore, these units are very simple in terms of design and purpose. This allows the cost per unit to be very reasonable. These devices have been embraced for use in IoT architectures in various sectors. These sectors include agriculture, e-health, and entertainment.

These units are heterogeneous in nature and are often used as end devices in IoT networks. They are also reprogrammable. Their low cost, heterogeneity, and re-programmability make a strong case for imparting intelligence in these deployed devices. The result of such would be a transition into flexible and smart systems.

#### Latency

Standard IoT devices send data to the cloud to be processed. A response is then transmitted back to an end device. Consider Amazon’s Alexa and Alexa enabled devices. The end devices appear to be intelligent. But, when they transmit to the cloud, they have to wait for a response from Alexa’s algorithms to determine their output. This means that they have no local intelligence. We can even label them “dumb”. The speed of transmission to the cloud and back to local devices will be dependent on one’s internet speed. Slow internet yields slow transmission, slower processing, and ultimately an undesirable delayed response.

Though, if it were a situation involving an intelligent end device with on-device decision making, there would be little to no latency in awaiting a response. Computing tasks are not offloaded to the cloud. Furthermore, it would be even better to be able to efficiently run out complex machine learning algorithms on end devices. This would achieve the real-time execution of tasks. Notable advances are being made towards such.

#### System Reliability and Data Security

Transmission of raw data from end devices to the cloud over lossy and unpredictable wireless channels opens up the whole system to a couple of problems. First, wireless transmissions need a sizeable amount of energy. Two, these transmissions need a lot of bandwidth. This approach is also prone to errors in transmission. Another concern is the possibility of cyberattacks. For example, a man-in-the-middle attack. Information can be intercepted by a third party between the end device and cloud. Furthermore, having data in a single location (which is the cloud in this case) makes it way less secure. In the event of a breach, all systems dependent on the warehoused data will be affected. The reliability of the system is affected.

A way to avoid all these problems is by performing on-device data processing. Transmissions are minimized. The data being transmitted may not be as important to a potential attacker. This is because processing and decision making will occur locally. Communication between device and cloud may not contain very valuable information. The system becomes more secure and reliable as a result.

### Challenges to Tiny Machine Learning

Integrating machine learning into frugal devices presents a couple of challenges.

#### Device Heterogeneity

Existing devices are heterogeneous. They come in all kinds of forms, shapes, and sizes. This means that they possess different processing capabilities, power consumptions, storage, and memory sizes among others. It becomes difficult to have a set of standard TinyML tools that could be used by most MCU setups. Designing of generic TinyML benchmarking methodologies for use in these setups becomes more difficult. These frameworks would make it easier to increase awareness and adoption of TinyML and enabled devices.

#### MCU Constraints

Let’s put aside the memory and computational constraints associated with MCUs. An approach of scaling up the computational resources to meet machine learning processing needs is not feasible. It would be wise for the manufacturers of MCUs to make sure their chipsets are ready for ML integration. Application development will be easy thanks to the support of device-level software.

Furthermore, mainstream data science frameworks need to be adapted to the requirements of MCUs. This will grow the reach of TinyML.

### Applications of Tiny Machine Learning

#### Industry 4.0

We can describe Industry 4.0 as an initiative that uses various systems to build automated, integrated, and scalable production systems of the future. Industry 4.0 is enabled by technologies such as the Internet of Things. To learn more about Industry 4.0, check out this [article](https://www.section.io/engineering-education/industry-4.0-and-cybersecurity/) I wrote a while back.

Under the banner of Industry 4.0, manufacturing and industrial sectors are benefitting from vast digitalization.

MCUs in use under this scope are heterogeneous in nature. They vary in terms of memory or computing requirements. This variation limits their capability to run certain processing tasks. Application of TinyML in Industry 4.0 eases these limitations. Here’s how. Machine learning-based Decision Support Systems can be integrated into MCUs. These systems help MCUs decide on whether to take up certain computational tasks or push them to higher processing layers like the cloud or edge. This makes a network more efficient. The restraints of the heterogenous MCUs do not limit the processing tasks to higher processing layers. Processing tasks are well spread out throughout the network.

#### eHealth

TinyML shows tremendous potential in healthcare. An application in this sector is health monitoring. Using machine learning-based models on end devices, doctors can track and note patterns in a variety of patient activities. This makes predictive analytics much simpler. The result is better and more personalized patient care. This approach would also allow the system to handle a larger volume of data without trade-offs in performance. Data processing and decision making on end devices make this possible by reducing dependency on the cloud. An outcome of this is a reduction in latency.

Another example of TinyML in healthcare is the improvement of hearing aids. Basic hearing aids have some challenges. First, hearing in the presence of background noise is hard. Sound quality may also vary greatly. Which in turn affects listening comfort. Consider a truly intelligent hearing aid. Since processing and decision making are on-device, the use of machine learning can assist in real-time filtering and adjustment of the sound input. This ensures the correct sound signals are being clearly and audibly received. Sound quality will improve as a result. The listening comfort will be bettered too. A few more examples include activity recognition and visual assistance, among many more.

#### Smart Spaces

This refers to contexts such as smart/cognitive buildings or smart cities. These settings boast of IoT-based systems such as surveillance and monitoring systems. Examples of such systems include traffic monitoring and pollution monitoring systems. TinyML can improve the collective intelligence of such systems. It can evolve these systems into highly intelligent entities by giving them greater ability to make decisions in a quick and decentralized manner.

Considering the aspect of sustainability, these end devices would consume much less power. Besides the reduction of the carbon footprint, this means these devices will not necessarily need to be connected to the power grid. This also allows them to be placed in rural as well as remote areas. Furthermore, we mentioned that these devices would be very affordable. The adoption of these end-devices will be boosted in such areas thanks to these factors. Disadvantaged areas would, as a result, turn into opportunities for innovation, business, and development.

#### Smart Agriculture and Farming

The scope of smart agriculture and farming is the efficiency and health of animals and crops. Improvement in the efficiency and health of crops and livestock leads to an improvement in the quality of production. This in turn leads to an increase in revenue.

Other implementations of TinyML loosely related to smart farming and agriculture involve pet trackers and feeders. Smart-garden irrigation control systems too. Both could benefit from the use of machine learning-enabled devices. For example, an intelligent pet tracker could be used to track a pet’s vitals, activities, and mannerisms then make on-device decisions on how to ensure the pet is most healthy and productive. This could be used to determine pet diet and diet frequency. The same perspective can be applied to a smart-garden irrigation system. It would take various factors -such as light intensity, humidity, plant health and type, and perhaps water quantity available- into consideration before deciding when and how to carry out irrigation.

### Winding Up

To ensure and improve the quality of life of future generations, we have to have environmental sustainability at the forefront of our efforts. Tiny Machine Learning is good for the planet. It offers us a chance to continue evolving artificial intelligence. It also encourages us to reduce the carbon footprint through the use of truly intelligent energy-efficient devices. Aside from sustainability, we have seen that it also opens up many opportunities for innovation and development in many sectors, with added benefits of lowered cost of devices, lower latency, and data security. Considering all the above, tiny machine learning is the sustainable future of machine learning. It truly has the potential to become the next artificial intelligence revolution.

### References

1. R. Sanchez-Iborra and A. F. Skarmeta, ["TinyML-Enabled Frugal Smart Objects: Challenges and Opportunities,"](https://doi.org/10.1109/MCAS.2020.3005467) in IEEE Circuits and Systems Magazine, vol. 20, no. 3, pp. 4-18, thirdquarter 2020, doi: 10.1109/MCAS.2020.3005467.

2. [Tiny Machine Learning: The Next AI Revolution](https://towardsdatascience.com/tiny-machine-learning-the-next-ai-revolution-495c26463868)

3. [Why the Future of Machine Learning is Tiny](https://petewarden.com/2018/06/11/why-the-future-of-machine-learning-is-tiny/)

4. [Why TinyML is a giant opportunity](https://earthnewsreport.com/2020/01/12/why-tinyml-is-a-giant-opportunity/)