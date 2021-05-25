---
layout: engineering-education
status: publish
published: true
url: /how-polygonal-graphics-are-made/
title: How Polygonal Graphics Are Made
description: Polygons are used in computer graphics to compose images that are three-dimensional in appearance. Usually triangular polygons arise when an object's surface is modeled, vertices are selected, and the object is rendered in a wire frame model.
author: nadiv-gold-edelstein
date: 2020-06-10T00:00:00-07:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/how-polygonal-graphics-are-made/hero.jpg
    alt: polygon image example
---
Most computer-generated 3D objects are built with polygons, collections of triangles, or quadrilaterals connected together in 3D space to approximate shapes. In this article, we will explore how computers see polygons out of information and turn that into graphics like you would see in a movie or video game. We will be using [Babylon.js](https://www.babylonjs.com/), an in-browser rendering engine that uses WebGL, to visualize some of the concepts discussed.
<!--more-->

### 3D from 2D
Computers handle 2D images really well. To take advantage of this property, 3D models are most commonly built from triangles or less commonly, from quadrilaterals arranged as faces of a solid. Shapes like spheres and cylinders can not be broken down into discrete triangles, so we approximate them as polygons with many faces.

These faces are constructed by vertices made up of points. We can visualize these vertices with wireframes, where vertices are highlighted and faces are transparent.

For example, here is a [wireframe of a sphere](https://playground.babylonjs.com/#T4TNWL).

![Sphere Wireframe](https://i.imgur.com/gUnhTu4.png)<br>
*Wireframe of a sphere*

To explore how changing the number of vertices changes the approximation of the solid, try experimenting with the number of [tessellations on this cylinder](https://playground.babylonjs.com/#VR8AHB).

Change the value of `poly` up or down to see how creating more subdivisions in a shape increases quality. The higher the vertex count, the more memory the shape takes up, and the more resources it needs to operate. This is why early movies and video games have models with much less detail than they do today.

![7 divs](/engineering-educationhttps://i.imgur.com/ScRkwYv.png)<br>
*A cylinder with 7 subdivisions on the top face*

![20_poly](/engineering-educationhttps://i.imgur.com/jd9XR20.png)<br>
*A cylinder with 20 subdivisions on the top face*

![100 divs](/engineering-educationhttps://i.imgur.com/3KZLqAe.png)<br>
*A cylinder with 100 subdivisions on the top face*

### Textures

Once we define the triangles that make up the shape, known as a mesh, we can draw the faces over the triangles. This is known as texturing. To elaborate on this, let's look at an [example of texturing faces of a cube](https://playground.babylonjs.com/#T40FK#128) created by a [user](https://www.html5gamedevs.com/topic/12392-having-different-textures-for-each-face-on-a-cube/) on the HTML5GameDevs Forums. The example shows applying different colors to each face of the cube with this code:
~~~javascript
...
// Stores colors in materials (textures)
var f=new  BABYLON.StandardMaterial("material0",scene);
f.diffuseColor=new  BABYLON.Color3(0.75,0,0);
var ba=new  BABYLON.StandardMaterial("material1",scene);
ba.diffuseColor=new  BABYLON.Color3(0,0,0.75);
...
// Combines the materials into a multi-material
multi.subMaterials.push(f);
multi.subMaterials.push(ba);
...
//Applys a material to a set of faces.
// The first two parameters define the submesh index. The third is the total
// number of vertices, and the fourth and fifth are the bounds of the vertex
// that the mesh is applied to by subdivisions. The last is the mesh to be
// subdivided.
box.subMeshes.push(new  BABYLON.SubMesh(0, 0, verticesCount, 0, 6, box));
box.subMeshes.push(new  BABYLON.SubMesh(1, 1, verticesCount, 6, 6, box));
...
~~~
![standard cube](/engineering-educationhttps://i.imgur.com/r7p2oYC.png)<br>
*The cube with the material applied to all faces*

Try changing the `6` in the line to a `5`.
~~~ javascript
 box.subMeshes.push(new  BABYLON.SubMesh(0, 0, verticesCount, 0, 6, box));
~~~
 In this example, we tell the mesh not to apply the material to one of the faces.

![sube](/engineering-educationhttps://i.imgur.com/zj1ZdBG.png)
*Cube with the 6 changed to a 5*

### Transformations
Since the end result of most 3D graphics need to be displayed on a 2D screen from a fixed viewpoint, 3D models need to be able to be rotated and moved in respect to the viewer. This is done with transformation matrices. In essence, these matrices define how any given point would be rotated. This matrix is then multiplied by the matrix containing the vertices of the shape to define new positions for each point.

Due to the ease of using transformation matrices, it is far easier to move and transform all 3D models around the viewer than to move the viewer itself.  

### Wrap-Up
Polygonal objects are the backbone of 3D graphics, and are crucial for computers to approximate and visualize our world. The construction of vertices, faces, and textures have endless applications, including film CGI, video games, architecture, and 3D printing.  
