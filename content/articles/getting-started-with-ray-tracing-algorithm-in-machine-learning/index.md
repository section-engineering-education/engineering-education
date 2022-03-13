### Getting Started with Ray Tracing Algorithm in ML

### Prerequisites
- The reader should know what's an algorithm and how it's used in programming.
- The reader should be familiar with data structures and neural networks.

### Introduction
When playing video games, have you ever wondered how or rather what makes the light in the game look similar to the one in real life? This is because of the *ray-tracing technique*, with this process, the game designers can make visible light beams jump into objects, produce real shadows, and create life-like reflections.

Ray tracing has been of great impact in the world today, modifying and innovating various sectors of the tech world. In this article, we'll get to know about the ray tracing algorithm in machine learning.

### Table of contents
- [What is Ray Tracing Algorithm](#what-is-ray-tracing-algorithm)
- [History of Ray Tracing](#history-of-ray-tracing)
- [How Ray Tracing works](how-ray-tracing-works)
- [Types of Ray Tracing Algorithm](#types-of-ray-tracing-algorithm)
  - [Hybrid Ray Tracing Algorithm ](#hybrid-ray-tracing-algorithm)
  - [Forward Ray Tracing Algorithm ](#forward-ray-tracing-algorithm)
  - [Backward Ray Tracing Algorithm](#backward-ray-tracing-algorithm) 
 - [Applications of Ray Tracing Algorithm](#application-of-ray-tracing-algorithm) 
 - [Conclusion](#conclusion)
 - [Resources](#resources)

### What is Ray Tracing Algorithm 
Ray Tracing Algorithm is an effective way of drawing synthesizing images. It is a method of rendering which has the potential to produce a much greater degree of authenticity that is probably higher than that of other scanners. However, this involves a huge calculation cost. 

It gives results almost similar to scanline rendering and ray casting, but it also allows for a more complex optical effect like exact refraction and reflection simulations. It's also useful in cases where high-quality output is required.

### History of Ray Tracing
It was created by Robert Goldstein and Arthur Appel in the 1960s. According to [Wikipedia](https://en.wikipedia.org/wiki/Ray_tracing_(graphics)#Algorithm_overview), in 1968, Arthur Appel was the first to use a computer to generate shaded images using ray tracing. He used Ray Tracing to figure out which surface was closest to the camera at each image point, then traced secondary rays to the source of light from each shaded point to see if it was in shadow or not.

Robert Goldstein then used ray tracing is to create shaded images of solids by simulating the photographic process in reverse. He used a non-recursive ray-tracing-based algorithm known as ***ray casting***. Ray tracing is widely regarded as the most effective method of image synthesis.

### How Ray Tracing works
Computer imagery has become a very basic need in today's digital world. Computer graphics come into play when we need to create an image that looks real and indistinguishable from the standard image taken. This can be accomplished in a variety of ways. Ray Tracing is one such way to give. This is used to produce an image by tracing the light path such as pixels in an image plane and mimicking its effects when encountering objects.

The process aims to bring real light to the simulation by imitating the behavior of light intensity. It is done by reflecting the light rays from the camera, ‘following’ them until they encounter an object, and counting where each ray of light cuts an object in the square. This then allows it to calculate how the pixel is affected by the light rays, and to keep track of the ray as it jumps on the scene. This requires the computer to track a certain number of rays from each intersection to the reflected light model, thus creating a growing number of rays in the square.

Ray Tracing mimics a path of light rays in a space formed by diverse geometric bodies. Imitation assumes that the beam can be absorbed by a broad body, which is reflected when the body is reflective, or dispersed in case the body shows up or translucid.
To achieve this simulation, the ray tracer places a screen between the viewer and the display location (see image below "ray tracing"). The renderer sends a ray from the viewer's eye through the pixel and into the scene for each pixel. The contrast of the ray and the first element of the scene in the path of the ray is then computed. The beam is then separated from one or two secondary rays with respect to the object material. Reflection and refraction rays are followed repeatedly,
to compute a meeting place in each step, until a pre-determined depth is acquired or the ray goes out of the scene.

 ![Ray tracing](/engineering-education/getting-started-with-ray-tracing-algorithm-in-machine-learning/tracing.png)

### Types of Ray Tracing Algorithm
Various methods are induced for the effectiveness of Rar Tracing. There are three types of ray tracing algorithms, they include; hybrid ray tracing algorithm, forward ray tracing algorithm, backward ray tracing algorithm.

#### Hybrid Ray Tracing Algorithm
It's a combination of backward and forward ray-tracing techniques hence making it more effective since it has the benefits of both techniques.   

A first pass through the scene is rendered using a basic raster image processing system such as [Vulkan](https://vulkan-tutorial.com/). The first pass is then followed by a ray-tracing phase which adds more information to the image created in the first pass.

#### Forward Ray Tracing Algorithm
It can also be referred to as light ray tracing. This is because it follows photons from the source of light to the specific object. It's the best technique for determining the color of the object despite it being the most inefficient method due to the fact that several rays from the source of light never make it through the view plane and into the eye.

Here, an assumption is made that the reflected ray intersects the eye's surface even though in reality rays are reflected in every direction. Light from the source will travel in a straight direction until it hits a surface where it then changes to other likely directions. 

#### Backward Ray Tracing Algorithm 
In backward ray tracing, an eye ray is produced that travels through the view plane and into space. The eye should be in contact with the object for it to be hit by the eye ray hence being from the point of view plane. The ray tracer then finds out the exact coloring and shade of this point in the view plane after the light beam bounces around. 

Like forward ray tracing, backward ray tracing also has an assumption. It's assumed that only light rays that are traveling through the view plane and then into the eye to produce the final image. The assumption may not be true since many light rays may travel through the view plane in some instances. Backward ray tracing is also known as eye-tracing.

### Application of Ray Tracing Algorithm
Nowadays, ray tracing is actually possible in PC games, however, the main implementation features of this technology are used only in limited ways, such as providing realistic visuals or shadows.

It can be used to record remarkable interactions between objects in a square. In fact, broad-spectrum interactions dominate many scenes which can be attributed to the standard tracking lighting model but include the radiosity data algorithm. Ray Tracing can be used in the gaming industry, examples of games that ray tracing are used includes; GodFall, resident evil village, and Minecraft

Other areas where ray-tracing can be applied are; product development(CAE/CAD), media and entertainment applications e.t.c.

### Conclusion
Ray Tracing is becoming more popular day in day out, it's an interesting field to involve yourself in, for instance, the gaming industry is a great place to apply ray tracing, you can decide to specialize in gaming graphics. 

This article intends to give you a basic introduction to guide you through the ray tracing algorithm in machine learning, from its history and how it works to its applications. The reader should have known where to start from in the ray-tracing "world" since he/she will have a clear understanding of it.

### Resources
 Here are some articles about machine learning algorithms;

- [SVM algorithm](https://www.javatpoint.com/machine-learning-support-vector-machine-algorithm)
- [KNN algorithm](https://www.javatpoint.com/k-nearest-neighbor-algorithm-for-machine-learning)
- [Naive Bayes algorithm](https://www.analyticssteps.com/blogs/what-naive-bayes-algorithm-machine-learning)
- [Understanding machine learning algorithms and how to implement them](https://www.section.io/engineering-education/understanding-machine-learning-algorithms-and-how-to-implement-them/)
