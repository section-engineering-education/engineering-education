Artificial Intelligence (AI) is one of the most rapidly growing and exciting fields of technology in our generation. Today's AI models are trained to do only a single task. But, Google's new Pathways model promises to deliver a more powerful and robust model as it is a single model trained to do many tasks all at once. This model will understand our world better like how the human brain works. This is unlike any other models ever built by competitors such as OpenAI and DeepMind. 
In this article, we'll discuss this novel architecture idea and understand how it operates.

### Table of contents
- [What is Pathways](#what-is-pathways)
- [Existing shortcomings and how pathways can address them](#existing-shortcomings-and-how-pathways-can-address-them)
- [Is this Artificial General Intelligence?](#is-this-artificial-general-intelligence)
- [Summary](#summary)
- [Further reading](#further-reading)

### What is Pathways?
Pathways is a new way of thinking about artificial intelligence that overcomes many of the shortcomings of the present systems while still using their benefits. It employs a single model trained to perform many tasks at once, like how our brains work where different tasks leverage different paths in the network. This model is designed to solve a variety of existing shortcomings with existing systems and improve on them.

### Existing shortcomings and how pathways can address them

### Single model, multiple tasks
Rather than extending previous models to run new tasks, we train new models from scratch to accomplish only one thing. As a consequence, we end up building a lot of models for solving many different tasks. Due to this, we end up taking longer time and a lot more data learning new tasks. This is contrary to how human beings learn tasks.

The pathways model aims to create a single model that can handle separate tasks. Besides, the model combines existing skills that enable learning new tasks efficiently and faster. As a result, what a model learns through training on one job, could help in learning a different task. For example, in the [blog post](https://blog.google/technology/ai/introducing-pathways-next-generation-ai-architecture/), they give an example of an aerial photo of a city. If a model learns how aerial photos could forecast the elevation of a landscape could help in predicting another task such as predicting how floodwaters run through the city.

Pathways envisions a model with varied skills that can be called upon when needed and can be stitched together to accomplish new. This is more akin to how the human brain generalizes between activities. 

#### Multiple senses
This refers to the fact that the input to current neural networks have single modalities. For example, they can either take in an image, audio, or text at a single time. Not all of them simultaneously. The pathways model, naturally being a multitask model, will naturally be multi-modal. This means that the model could input any type of modality. 

In the blog post, Jeff Dean gives an example of a leopard. Whether you hear the sound of a leopard, you see the video of a leopard running, or write the name of a leopard, that should essentially trigger the same internal response. It invokes the same concept of a leopard in your brain. This is the case with the pathways model. 

#### Sparse and efficient
Our current networks are densely populated, everything is connected to everything. This is not how human beings approach challenges, and it is a very inefficient way of designing models. Our brains have many distinct parts that are specialized to perform different tasks. Yet, we only use the part of the brain that is relevant to the current scenario. Your brain has a lot of neurons, but yet you only use a tiny bit to process the information. We can build AI systems that function in the same way.

To increase its efficiency, the model architecture needs to be sparsely activated. This means that only sub-parts of the network will be activated for a given input sample. The different parts of the network doing different tasks need not be activated at the same time. This makes the model more efficient in terms of parameters and computation. In practice, the model learns the part of the network which excels in certain tasks and enables it to only route tasks through those relevant parts in the network. As a result, the pathways model is less prone to errors and biases. 

Because of these reasons, the pathways model can assist in the discovery of beneficial patterns in complicated systems such as climate dynamics that have baffled human scientists over the years. 

### Is this Artificial General Intelligence?
With the most recent advances in reaching Artificial General Intelligence (AGI), human-level intelligence is increasingly becoming a reality. With global disruptions such as Covid-19 wreaking havoc in the economy, the race to develop AGI systems by leading technology companies such as Google and Microsoft may have accelerated dramatically.

If AGI is realized, robots will comprehend the world in the same ways that humans do. Using these external inputs, they could find solutions to developing problems. While AGI has yet to be achieved, it offers a plethora of profitable possibilities. Yet, it is not without major hurdles which are yet to be solved. 

For instance, as previous research has shown, it's not easy implementing an artificial general intelligence system. This is because you still have issues with models experiencing catastrophic forgetting. If you try teaching a model many tasks and you end up teaching the model one task more than the others, you still have to ensure that it doesn't forget the other tasks. This is a very difficult problem to solve. 

Another problem with building such a model is the issue of sparsity. If you have a sparse signal, then your backward gradients are also going to be sparse.  

### Summary
The next decade will be critical in hastening the development of AGI systems. Experts predict that by 2030, there is a 25% probability of establishing human-like AI. Furthermore, advances in robotic techniques and machine algorithms, along with recent data explosions and computer advances, will provide a fertile foundation for human-level AI systems. It is only a matter of time before AGI becomes the new normal.

As for the Pathways model, there's still no research paper, plan, or implementation on how this will be achieved. Only a [video](https://www.youtube.com/watch?v=Nf-d9CcEZ2w&t=24s) that demonstrates how the model will work. But, as it appears, the team at Google is determined to solve these challenges. For now, it's a plan and idea, and we're excited to see what happens.

### Further reading
- [Introducing Pathways: A next-generation AI architecture](https://blog.google/technology/ai/introducing-pathways-next-generation-ai-architecture/)
- [Pathways](https://www.youtube.com/watch?v=Nf-d9CcEZ2w&t=24s)