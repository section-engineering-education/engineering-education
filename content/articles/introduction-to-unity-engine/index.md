---
layout: engineering-education
status: publish
published: true
url: /introduction-to-unity-engine/
title: Introduction to Unity Engine
description: This tutorial will introduce the reader to the Unity engine, explain the interface of the engine, and understand how to create different objects.
author: mohamed-alghadban
date: 2022-04-04T00:00:00-05:13
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/introduction-to-unity-engine/hero.jpg
    alt: Introduction to Unity Engine Hero Image
---
The Unity engine is one of the strongest engines in game development, and also one of the easiest engines to learn as a beginner game developer. 
<!--more-->
In this tutorial, we will explain the interface of the engine and understand how to create different objects, and manipulate and compose them together, we will also use prefabs to enhance the ability to reuse and edit different objects.

### Table of contents
- [Prerequisites](#prerequisites)
- [Unity version and updates](#unity-version-and-updates)
- [Create a new project](#create-a-new-project)
- [Unity interface](#unity-interface)
    - [Hierarchy](#hierarchy)
    - [Scene](#scene)
    - [Inspector](#inspector)
    - [Assets](#assets)
- [Unity objects](#unity-objects)
- [Prefabs](#prefabs)

### Prerequisites
To follow along with this tutorial, you’ll need the following:
- A basic understanding of the C# programming language.
- A basic understanding of classes and objects in the C# programming language.
- Have the Unity engine installed on your system.
- If you don't have the unity engine installed on your system, you can click [here](https://unity.com/download) to download and install it.

**Note:** we will not use the C# language directly in this tutorial, but understanding it will be helpful with Unity objects and later on when coding is needed.

### Unity version and updates
In order to create a new project, open up the Unity hub application, and then pick a Unity version (the latest version is recommended), after that, select your modules. In this tutorial, we will only need the *WebGL Build Support* module, then click on `Done` to download and install it.

![Webgl](/engineering-education/introduction-to-unity-engine/webgl.png)

### Create a new project
Using the Unity hub, click on `Projects` and then click on `New`. 

In this tutorial, we will work on a 3D template, click on `3D`, name the file and choose a place to save your project on your computer. 

![Newproject](/engineering-education/introduction-to-unity-engine/newproject.png)

### Unity interface
At first sight, you may think that the Unity interface looks complicated, but after understanding each part of it, it will look simpler to you. 
We will describe the main parts of the interface and explain how they work together later on in this tutorial.

#### Hierarchy
The Hierarchy contains all the objects created in your game, it can store all kinds of objects, from standalone objects to composed objects.

![Hierarchy](/engineering-education/introduction-to-unity-engine/hierarchy1.png)

#### Scene
The scene shows us the planes and the game objects that we create and use in the game, it's also the main tool in Unity because it helps us manipulate, move, and duplicate the objects that we have in order to make a perfectly composed object.

![Scene1](/engineering-education/introduction-to-unity-engine/scene1.png)

#### Inspector
The inspector contains all kinds of information about any created object, from logical information to physical information, it also allows editing this information from the inspector instead of editing them from the scene which is harder sometimes or even impossible for some data. If you need to know a piece of information about any object, just click on it.

![Inspector](/engineering-education/introduction-to-unity-engine/inspector.png)

#### Assets
Assets can store all kinds of files and models in your game, including what we will be mostly using in this tutorial (prefabs).

### Unity objects
In this tutorial we will be creating a simple car by composing many objects, let's begin by creating our first object. 

Right-click on the Hierarchy, click on the `3D object` then click on the “cube”, Now a cube will appear on your screen inside the Scene, try moving around the cube by clicking `alt + left click` and try zooming out using the middle mouse button, you may also hold on your middle mouse and move your hand to move freely on the planes of your scene and objects. All the previous movements will come in handy when working on your objects.

![Cube](/engineering-education/introduction-to-unity-engine/cube.png)

Now we need to change the properties of the cube to make it suitable for a lower body part. 

First, we click on the “cube” and then press `R`, now we can extend the length of all the planes and change them in any direction we want. 

Change the name of the cube by clicking on it on the hierarchy and renaming it to `Lower body`. After extending the planes of the object, it should look something like this. 

![Carbody_1](/engineering-education/introduction-to-unity-engine/carbody_1.png)

Now we need to make the upper body of the car, but instead of making the whole process all over again, we could duplicate the lower body of the car by clicking on it from the hierarchy and renaming it to the upper body, after that, the two objects will be inside each other, so you click on the object from the scene and click W to move the upper body on top of the lower body.

The second part of this is to reshape the upper body and make it smaller, in order to do so click on `R` then click on the little cube inside the upper body and move the mouse to the left to make it smaller or the right to make it bigger. Rename the upper body from the hierarchy and reshape it to look something like this.

![Upperbody](/engineering-education/introduction-to-unity-engine/upperbody.png)

The car needs some wheels, to do that add a cylinder from the hierarchy and rename it to `Wheel`, now we need to work on the cylinder to make it look like a wheel, to reshape the cylinder, click on `R` move down with the mouse to make the cylinder smaller, then press `E + ctrl` to rotate the wheel to 90 percent degree. 

Then, click on `W` to move the wheel around and put it in the right place. The wheel should look something like this.

![Wheel1](/engineering-education/introduction-to-unity-engine/wheel1.png)

Next, duplicate the wheel into 4 wheels from the hierarchy and do the same work we did before and put each wheel in the right place using the following key `W, E, R` on your keyboard. The car is completed now, and it should look like the image below.

![Allcar](/engineering-education/introduction-to-unity-engine/allcar.png)

Finally, we need to make an empty object from the hierarchy, rename it to `Completed car`  and put all the other objects that we previously created inside it by simply choosing them all and putting them inside the new object.

### Prefabs
Prefabs are one of the most important concepts in unity, it allows the reusability of all objects in your game, for example, the car that we previously made, we can reuse it and put it anywhere inside the game. 

What is the most important thing about prefabs? The answer is the ability to edit one object and the result of this editing will be deployed on all the copies of this object inside the game. Prefabs are the ultimate time and effort savior in unity.

Drag the `Completed car` object to the assets' area to be able to use the prefab option. Do this with any composed object later on in your game if you wish to use it multiple times and feel the need to edit it without wasting your time.

I have created another prefab beside the car and called it `Street lamp`, simply a composed object of two cylinders, and used a prefab to copy and reuse the object with the car object to make a crowded street full of cars. 

Then, put them all under a plane object from the 3D objects. The scene should finally look something like this.

![Allscenes](/engineering-education/introduction-to-unity-engine/allscenes.png)

### Conclusion
In this tutorial, we learned about all the functionalities of the Unity engine interface, we also understood how objects operate and how we can create them, manipulate them, and use them in different fields inside the world of the game. Finally, we also learned about prefabs and how we can reuse them to work as a component instead of recreating them. Don't forget to try out the examples yourself to fully understand how they work.

### Further reading
- [Unity tips from the community](https://blog.unity.com/technology/become-a-better-unity-developer-with-these-tips-from-the-community).
- [New career in unity](https://blog.unity.com/technology/new-career-pathways-help-you-break-into-the-gaming-and-tech-industries).
- [Learn 3D arts in unity](https://blog.unity.com/technology/learn-3d-art-optimization-for-mobile-with-arm).

---
Peer Review Contributions by: [Jethro Magaji](/engineering-education/authors/jethro-magaji/)