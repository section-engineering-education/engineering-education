---
layout: engineering-education
status: publish
published: true
url: /general-purpose-intelligence-system/
title: General Purpose Intelligence Systems
description: In this article, we'll discuss a general purpose intelligence system known as pathways and understand how it operates.
author: monica-dalmas
date: 2021-12-09T00:00:00-10:20
topics: [Machine Learning]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/general-purpose-intelligence-system/hero.png
    alt: A General Purpose Intelligence System Hero image
---
Artificial Intelligence (AI) is one of the most rapidly growing and exciting technology fields in our generation. Most AI systems today are trained to perform single tasks. But, Google's new Pathways model promises to deliver a more powerful and robust model as it is a single model trained to do many tasks all at once. 
<!--more-->
This model will understand our world better, like how the human brain works. This is unlike any other models ever built by technology giants such as OpenAI and DeepMind. This article will discuss this novel architecture idea and understand how it operates.

### Table of contents
- [What is Pathways](#what-is-pathways)
- [Shortcomings with current AI systems](#shortcomings-with-current-ai-systems)
- [Is this Artificial General Intelligence?](#is-this-artificial-general-intelligence)
- [Summary](#summary)
- [Further reading](#further-reading)

### What is Pathways?
Pathways is an AI model designed by Google that introduces a new way of thinking about artificial intelligence. The model is built to overcome some of the shortcomings of the present systems while simultaneously using their benefits. 

It employs a single model trained to perform many tasks at once, like how our brains work where different tasks leverage different paths in the network. This model is designed to solve a variety of existing shortcomings with existing systems and improve on them.

### Shortcomings with current AI systems
### Single model, multiple tasks
Rather than extending previous models to run new tasks, we train new models from scratch to accomplish only one thing. Consequently, we end up building a lot of models for solving many different tasks. Due to this, we take a long time and more data learning new tasks. This is contrary to how human beings learn tasks.

The pathways model aims to create a single model that can handle separate tasks. Besides, the model combines existing skills that enable efficient and faster learning of new tasks. Subsequently, the features a model learns through training on a particular task could help learn a different task. 

For example, in this [blog post](https://blog.google/technology/ai/introducing-pathways-next-generation-ai-architecture/), they give an example of an aerial photo of a city. Suppose the AI model is trained on how aerial photos captured by satellites or drones could forecast the elevation of a landscape. The same model could help predict the flow direction of floodwaters running through a city.

Pathways envision a model with a wide variety of skillset that can be used when required and stitched together to accomplish new things. This is how the human brain generalizes between different tasks. 

#### Multiple senses
This refers to the fact that the input to current neural networks has single modalities. For example, they can either take in an image, audio, or text at a single time. Not all of them simultaneously. The pathways model, naturally being a multitask model, will be multi-modal. This means that the model could input any modality. 

In the blog post linked above, Jeff Dean gives an example of a leopard. Whether you hear the sound of a leopard, you see the video of a leopard running, or write the name of a leopard, that should essentially trigger the same internal response. It invokes the same concept of a leopard in your brain. This is the case with the pathways model. 

#### Sparse and efficient
Our current networks are densely populated; everything is connected to everything. This is not how human beings approach challenges, and it is a very inefficient way of designing models. Our brains have many distinct parts that are specialized to perform different tasks. 

Yet, we only use the part of the brain that is relevant to the current scenario. Your brain has many neurons, yet you only use a tiny bit to process the information. We can build AI systems that function in the same way.

To increase its efficiency, the model architecture needs to be sparsely activated. This means that only sub-parts of the network will be activated for a given input sample. The different network parts doing various tasks do not need to be activated simultaneously. This makes the model more efficient in terms of parameters and computation. 

In practice, the model learns the part of the network which excels in a particular task. Afterwards, it enables it to only route tasks through those relevant parts in the network. As a result, the pathways model is less prone to errors and biases. The pathways model can assist in the field of science, i.e., in climate dynamics to help discover useful patterns in complex AI systems. 

### Is this Artificial General Intelligence?
With the most recent advances in reaching Artificial General Intelligence (AGI), human-level intelligence is increasingly becoming a reality. With global disruptions such as Covid-19 wreaking havoc on the economy, the race to develop AGI systems by leading technology companies such as Google and Microsoft may have accelerated dramatically.

If AGI is realized, robots will comprehend the world as humans do. This will help provide solutions to developing problems. While AGI systems have yet to be realized, they offer many profitable possibilities. Yet, it is not without significant hurdles which are yet to be solved. 

For instance, as previous research has shown, it's not easy implementing an artificial general intelligence system. This is because you still have issues with models experiencing catastrophic data/memory loss. 

If you try teaching a model many tasks and teach the model one task more than the others, you still have to ensure that it doesn't forget the other tasks. This is a challenging problem to solve. Another problem with building such a model is the issue of sparsity. If you have a sparse signal, your backward gradients will also be sparse.  

### Summary
Advances in artificial intelligence, big data, robotic techniques and machine algorithms, along with recent computer architecture advances, will provide a foundation for human-level AI systems. As for the Pathways model, there's still no research paper, plan, or implementation on achieving this objective. This [video](https://www.youtube.com/watch?v=Nf-d9CcEZ2w&t=24s) demonstrates how the model will work. But, as it appears, the team at Google is determined to solve these challenges. For now, it's a plan and idea, and we're excited to see what happens.

Happy learning!

### Further reading
- [Pathways](https://www.youtube.com/watch?v=Nf-d9CcEZ2w&t=24s)

---
Peer Review Contributions by: [Willies Ogola](/engineering-education/authors/willies-ogola/)
