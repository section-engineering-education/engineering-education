Today's artificial intelligence models are trained to accomplish only a single task. But, Google's new Pathways model promises to deliver a more powerful and robust model as it is a single model trained to accomplish multiple tasks all at once. This model will be able to understand our world better as it can be equated to how the human brain works. This is unlike any other models ever built by competitors such as OpenAI and DeepMind. 
In this article, we'll discuss this novel architecture idea and understand how it operates.

### Table of contents
- [What is Pathways](#what-is-pathways)
- [Existing shortcomings and how pathways can address them](#existing-shortcomings-and-how-pathways-can-address-them)
- [Summary](#summary)
- [Further reading](#further-reading)

### What is Pathways?
Pathways is a new way of thinking about artificial intelligence that overcomes many of the shortcomings of the present systems while still using their benefits. It employs a single model trained to perform many tasks at once similar to how our brains work. Different tasks leverage different paths in the network. 

### Existing shortcomings and how pathways can address them
#### Single model
Today’s AI systems are often trained from scratch for each new problem – the mathematical model’s parameters are initiated literally with random numbers. Imagine if, every time you learned a new skill (jumping rope, for example), you forgot everything you’d learned – how to balance, how to leap, how to coordinate the movement of your hands – and started learning each new skill from nothing.

That’s more or less how we train most machine learning models today. Rather than extending existing models to learn new tasks, we train each new model from nothing to do one thing and one thing only (or we sometimes specialize a general model to a specific task). The result is that we end up developing thousands of models for thousands of individual tasks. Not only does learning each new task take longer this way, but it also requires much more data to learn each new task, since we’re trying to learn everything about the world and the specifics of that task from nothing (completely unlike how people approach new tasks).

#### Multiple senses
This refers to the fact that the input to current neural networks have single modalities. For example, they can either take in an image, audio, or text at a single time. Not all of them simultaneously. The pathways model, naturally being a multitask model, will naturally be multi-modal. This means that the model could input any type of modality. In the blog post, Jeff Dean gives an example of a leopard. Whether or not you hear the sound of a leopard, you see the video of a leopard running, or write the name of a leopard, that should essentially trigger the same internal response. It invokes the same concept of a leopard in your brain. This is the case with the pathway model. 

#### Sparse and efficient
Our current networks are densely populated, everything is connected to everything. This is not how human beings approach challenges, and it is a very inefficient way of designing models. Our brains have many distinct parts that are specialized to perform different tasks. Yet, we only use the part of the brain that is relevant to the current scenario. Your brain has a lot of neurons, but yet you only use a tiny bit to process the information from this article. We can build AI systems that function in the same way.

To increase its efficiency, the model architecture needs to be sparsely activated. This means that only sub-parts of the network will be activated for a given input sample. The different parts of the network doing different tasks need not be activated at the same time. This makes the model more efficient in terms of parameters and computation as in practice, the model learns the part of the network which excels in certain tasks and enables it to only route tasks through those relevant parts in the network. As a result, the pathways model is less prone to errors and biases. 

Because of these reasons, the pathways model can assist in the discovery of beneficial patterns in complicated systems such as climate dynamics that have baffled human scientists over the years. 

### Summary
There's no research paper, plan, or implementation on how this is going to be achieved. As previous research has shown, it's not easy implementing an artificial general intelligence system. This is because you still have issues with models experiencing catastrophic forgetting; if you try teaching a model many tasks and you end up teaching the model one task more than the others, you still have to ensure that it doesn't forget the other tasks. This is a very difficult problem to solve. 

Another problem with building such a model is the issue of sparsity. If you have a sparse signal, then your backward gradients are also going to be sparse. Yet, it appears that the team at Google is determined to solve these challenges. For now, it's a plan and idea, we've excited to see what happens. 

### Further reading
- [Introducing Pathways: A next-generation AI architecture](https://blog.google/technology/ai/introducing-pathways-next-generation-ai-architecture/)
- [Pathways](https://www.youtube.com/watch?v=Nf-d9CcEZ2w&t=24s)