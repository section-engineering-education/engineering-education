### Getting Started With Ray Tracing Algorithm in Machine Learning

### Prerequisites
- The reader should know what's an algorithm and how it's used in programming.

- The reader should be familiar with data structures and neural networks.


### Introduction
When playing video games, have you ever wondered how or rather what makes the light in the game look similar to the one in real life? This is because of the *ray tracing technique*, with this process, the game designers can make visible light beam jump into objects, produce real shadows, and create life-like reflections.

Ray tracing has been of great impact in the world today, modifying and innovating various sectors of the tech world. In this article, we'll get to know about ray tracing algorithm in machine learning.


### Tables of contents
- [What is Ray Tracing Algorithm](#what-is-ray-tracing-algorithm)
- [History of Ray Tracing](#history-of-ray-tracing)
- [Types of Ray Tracing Algorithm](#types-of-ray-tracing-algorithm)
  - [Hybrid Ray Tracing Algorithm](#hybrid-ray-tracing)
  - [Forward Ray Tracing Algorithm](#forward-ray-tracing)
  - [Backward Ray Tracing Algorithm](#backward-ray-tracing) 
 - [Conclusion](#conclusion)


### What is Ray Tracing Algorithm and how does it work?
Ray Tracing Algorithm is a very effective way of drawing synthesizing images. It's a method of rendering, this process has the potential to produce a much greater degree of authenticity that is probably higher than that of other scanners. However, this involves a huge calculation cost. Computer imagery has become a very basic need in today's digital world. Computer graphics come into play when we need to create an image that looks real and indistinguishable from the standard image taken. There are many ways to accomplish this. Ray Tracing is one such way to give. This is used to produce an image by tracing the light path such as pixels in an image plane and mimicking its effects when encountering objects.


The process aims to bring real light to the simulation by imitating the behavior of light intensity. It is done by reflecting the light rays from the camera, ‘following’ them until they encounter an object, and counting where each ray of light cuts an object in the square. This then allows it to calculate how the pixel is affected by the light rays, and to keep track of the ray as it jumps on the scene. This requires the computer to track a certain number of rays from each intersection to the reflected light model, thus creating a growing number of rays in the square.



### History of Ray Tracing
It was created by Robert Goldstein and Arthur Appel in the 1960s. According to [Wikipedia](https://en.wikipedia.org/wiki/Ray_tracing_(graphics)#Algorithm_overview), in 1968, Arthur Appel was the first to use a computer to generate shaded images using ray tracing. He used ray tracing to figure out which surface was closest to the camera at each image point, then traced secondary rays to the source of light from each shaded point to see if it was in shadow or not.

Later, by simulating the photographic process in reverse, Robert Goldstein used ray tracing is to create shaded images of solids. He used a non-recursive ray tracing based algorithm known as ray casting. Ray tracing is widely regarded as the most effective method of image synthesis.


### Types of Ray Tracing Algorithm
Various methods are induced to make ray tracing effective. There are three types of ray tracing algorithms, they include; hybrid ray tracing algorithm, forward ray tracing algorithm, backward ray tracing algorithm.


#### 1. Hybrid Ray Tracing Algorithm
It's a combination of backward and forward ray tracing techniques hence making it more effective since it has the benefits of both techniques.   

A first pass through the scene is rendered using a basic raster image processing system such as [Vulkan](https://vulkan-tutorial.com/). The first pass is then followed by a ray tracing phase which adds more information to the image created in the first pass.


#### 2. Forward Ray Tracing Algorithm
It can also be referred to as photon/light ray tracing. This is because it follows photons from the source of light to the specific object. Forward ray tracing is the best technique for determining the color of the object despite it being the most inefficient method due to the fact that several rays from the source of light never make it through the view plane and into the eye.

In Forward ray tracing it's assumed that the reflected ray intersects the eye's surface even though in reality rays are reflected in every direction. Light from the source will travel in a straight direction until it hits a surface where it then changes to other likely directions. 


#### 3. Backward Ray Tracing Algorithm
In backward ray tracing, an eye ray is produced that travels through the view plane and into space. The eye should be in contact with the object for it to be hit by the eye ray hence being from the point of view plane. The ray tracer then finds out the exact coloring and shade of this point in the view plane after the light beam bounces around. 

Like forward ray tracing, backward ray tracing also has an assumption. It's assumed that only light rays that are traveling through the view plane and then into the eye to produce the final image. The assumption may not be true since many light rays may travel through the view plane in some instances. Backward ray tracing is also known as eye-tracing.


### Conclusion
Because of its ability to simulate realistic lighting, the ray tracing technology became highly popular. Other rendering techniques, such as scanline ray casting, are inefficient in comparison.

This article is intended to give you basic introduction to guide you through ray tracing algorithm in machine learning. Here are some articles about machine learning algorithms;

- [SVM algorithm](https://www.javatpoint.com/machine-learning-support-vector-machine-algorithm)
- [KNN algorithm](https://www.javatpoint.com/k-nearest-neighbor-algorithm-for-machine-learning)
- [Naive Bayes algorithm](https://www.analyticssteps.com/blogs/what-naive-bayes-algorithm-machine-learning)
- [Understanding machine learning algorithms and how to Implement them](https://www.section.io/engineering-education/understanding-machine-learning-algorithms-and-how-to-implement-them/)


