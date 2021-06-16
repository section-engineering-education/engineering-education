More data is being collected in more locations than ever before. From autonomous vehicles, cell towers, factories, there is a growing need for real-time data processing. 

Solution? 

Edge Computing.

With edge computing, data is not sent to the cloud, but rather, acted upon at the source. In other words, computing happens as close as possible to where data is created. This makes it possible to create real-time insights.

But, before  I explain further what edge computing entails, it is good to understand how we got here. 

### Brief history

Computing used to be a process that you could perform on your desktop computer or laptop. All computations and programs run locally based on the data, information, and processing power the computer had access to at that moment. This type of computing was limiting as these devices could only hold so much data and have access to limited computational resources.

Then came the cloud computing era which became a game-changer.

With cloud computing, data storage and computational resources exist in the cloud. This data is accessible in real-time from your mobile phones, laptops, and desktop computers. Cloud computing gave us access to larger storage capacities and computational resources. This enabled us to train machine learning models and store data that wouldn't otherwise fit on our devices. Big technology companies such as Amazon, Microsoft, Google, and IBM are some of the industry players that preyed on this opportunity to make money out of offering these storage spaces and computation resources to businesses and individuals.  

Yet, with real-time systems, there came about three main challenges. These challenges included bandwidth limitations, latency problems, and privacy issues.   

1. Latency

It is the time delay associated with running a particular process. 

For example, in most of our mobile devices, we have either Apple's Siri or Google's Assistant feature. For these features to work, the device has to record your speech, send it to a cloud server where data compression and processing is performed. On the cloud, sometimes the servers have to talk to other servers to perform different functions on the data before sending the output feedback to your mobile phone. While this process happens fast in most cases, it still does take time. 

This could be problematic, especially for autonomous vehicles which need the car to make timely decisions depending on what's happening in its surrounding i.e., avoiding a car crash. 

What if the weather conditions are bad and it takes longer for feedback to return telling the car to turn right avoiding a crash? 
Considering the amount of data being generated, the response time would be too long and would lead to a crash.

Though it works smoothly most of the time, I hope you're seeing how this could turn problematic very fast. Data needs to be processed at the edge for shorter response times.

2. Bandwidth

It is the amount of data that you can send in a certain period. 

For example, if I want to operate the smart assistance feature which involves communicating with the cloud server, it takes time depending on the amount of bandwidth you have to perform that task. A low bandwidth would mean that information would take a longer time than if I have high bandwidth.

Depending on the bandwidth you use, we can see how this could easily become a problem. Especially for people in rural areas who don't have access to good internet.

3. Privacy

Cloud computing has privacy implications. 

Let me explain this using an example.

If you are using a machine learning-based financial system that requires you to upload sensitive data to be sent for processing to the cloud server, there is a possibility that these data could get hacked. If there was a way for that data to be processed on your phone rather than sent to the cloud for processing, that would be a far much better option for your privacy.

Most of the data used are produced on our mobile phones, tablets, and computers. Wouldn't it be better to process these data on our devices instead? This would ease the problems with latency, bandwidth, and privacy concerns.

This is where edge computing comes in.

### Edge Computing

Edge computing allows the computing process to be performed at the edge of the network. We can refer to the "edge" as any computing performed between the sources of data i.e, mobile phones and the cloud infrastructure. Though edge devices are interlinked with the cloud, it only communicates with the servers when it has to.

The figure below shows the edge computing paradigm.

At the edge, the following tasks are performed:

1. Computing offloading. If offloads part of the workload that would have otherwise be done from the cloud.
2. Data storage. Instead of data storage happening on the cloud, data is now stored on edge devices ensuring the privacy of user data.
3. Caching and processing. In an autonomous vehicle, data from cameras can now be processed at the edge ensuring shorter response times. 
4. Handling requests. It distributes requests and deliveries services from the cloud to the user.

These are tasks that traditionally, have been performed on the cloud. 

### Benefits of edge computing

Let's look at some examples to prove its benefits:

1. By moving from the cloud to the edge, researchers found that the response time on their facial recognition system reduced from 900ms to 169ms. 

You can read more about it in this [paper](https://www.researchgate.net/publication/301691282_Fog_Computing_Platform_and_Applications). 

2. In the task of wearable cognitive assistance, researchers found out that using the edge reduced the energy consumption by 30-40% and response time to between 80 and 200ms. This is pretty significant.

You can read more about it in this [paper](https://www.cs.cmu.edu/~satya/docdir/ha-mobisys2014.pdf).

3. Edge computing could enable smart cities. With our city's population growing at fast paces, processing the huge amount of data at the edge would be an efficient solution. 

### Wrapping Up

Edge computing has the potential to address the concerns of latency, data security and privacy, battery life constraint in smaller devices, and bandwidth cost saving. When I think of the opportunities that lie ahead from all these exciting technologies that are changing the world that we live in, I think of edge computing playing a pivotal role.

Feel free to visit our [Edge Content Library](https://www.section.io/edge-compute-content-resources/) for more resources dedicated to web performance, security, and scalability.


### Reference

[Edge Computing: Vision and Challenges](https://ieeexplore.ieee.org/document/7488250)