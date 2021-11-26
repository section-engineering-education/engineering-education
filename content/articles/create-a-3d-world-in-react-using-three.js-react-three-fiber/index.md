---
layout: engineering-education
status: publish
published: true
url: /create-a-3d-world-in-react-using-three.js-react-three-fiber/
title: Create a 3D World in React using Threejs & React Three Fiber
description: In this tutorial we will create a simple CLI application that takes two arguments to understand CLI basics.
author: francis-kaguongo
date: 2021-08-09T00:00:00-15:30
topics: []
excerpt_separator: <!--more-->
images:
  - url: /engineering-education/create-a-3d-world-in-react-using-three.js-react-three-fiber/hero.jpg
    alt: example image Node.js CLI
---
3D environments have come a long way since their first appearance in computers in the 1960s. Its follow-up was 3D modeling, seen in the 1970s. The ability to visualize and work with in third dimension has been loved by users and developers, thus increasing in its popularity. This copied real-life object characteristics of length, width, and height.
<!--more-->
3D objects are fascinating to behold. Experienced when interacting with computers, whether in games, videos, websites, or even simulations. Unlike 2D objects, more angles, light, shade, and contrast are visible and more appealing. You can read more on 3D objects and how to get them and their importance in [this](/engineering-education/how-to-insert-3d-objects-into-a-webpage-using-html-and-css/) article.

Today there are more characteristics, features, formats, and aspects of both 3D environments and objects than ever. We all expect the trend to increase both in discoveries, invention, and popularity as time goes by.

In this tutorial, you will learn how to create a 3D World in React using Three.js and React Three Fiber.

If you are new to 3D objects and environments, just check out this simple article on [How to insert 3D objects into a webpage using HTML and CSS](/engineering-education/how-to-insert-3d-objects-into-a-webpage-using-html-and-css/) written by *Chris Mutua*.

### Table of contents
- [Prerequisites](#prerequisites)
- [Initialise a new react project](#initialise-a-new-react-project)
- [Folder structure](#folder-structure)
- [Install dependencies](#install-dependencies)
  - [package.json (File)](#packagejson-file)
- [public folder](#public-folder)
- [src folder](#src-folder)
  - [App.js (File)](#appjs-file)
- [Run the app](#run-the-app)
  - [Add spherical objects](#add-spherical-objects)
  - [Deeper dive](#deeper-dive)
- [Conclusion](#conclusion)
- [References](#references)

### Prerequisites
To follow along with this guide, you need to have the following:
- Installed web IDE. I'd recommend [Visual Studio Code](https://code.visualstudio.com/download).
- React basics.
- Stable internet connection.

### Initialise a new react project
Create a project folder named 'React-3d-environment' and navigate into it. This can be achieved using the following command on the terminal:

```bash
mkdir "React-3d-environment"
cd React-3d-environment
```

Now let's run the command below in the terminal:

```bash
npx create-react-app@latest react-threejs-3d-environment-app --use-npm
cd react-threejs-3d-environment-app
```

This shall create a new React app using the latest version of React named 'react-threejs-3d-environment-app'.
It might take a few minutes depending on the speed and stability of your internet connection. Once done, it will open in the terminal.

Now open the app in the VSCode IDE installed on the machine by running the following command on the terminal in Linux/Ubuntu and MacOS using `code` or in Windows using `code .`.

If it does not launch, you can open it manually and open the folder in it. You can also find additional help [here](https://stackoverflow.com/questions/29971053/how-to-open-visual-studio-code-from-the-command-line-on-osx).

### Folder structure
There are many files inside our app directory that we might not need for our project. The generated app folder structure is shown below:

```bash
.React-threejs-environment-example (root directory)
├── build (Folder)
├── node_modules (Folder)
├── public (Folder)
│   ├── favicon.ico (File)
│   ├── index.html (File)
│   ├── logo192.png (File)
│   ├── logo512.png (File)
│   ├── manifest.json (File)
│   └── robots.txt (File)
├── src
│   ├── App.css (File)
│   ├── App.js (File)
│   ├── App.test.js (File)
│   ├── index.css (File)
│   ├── index.js (File)
│   └── logo.svg (File)
│   └── reportWebVitals.js (File)
│   └── setupTests.js (File)
├── .gitignore (File)
├── package.json (File)
├── package-lock.json (File)
└── README.md (File)
```

We will only be concerned with the 'index.js' file and the content in the 'public' folder. We will therefore ignore the rest in this project. You can leave them in case you want to take your code to a further step.

As for the 'build' and 'node_modules' folder, we shall not look into them as they are automatically generated.

### Install dependencies
We shall require and install the following dependencies:
- @react-three/cannon
- @react-three/drei
- nice-color-palettes
- react-three-fiber
- three

**'*[threejs](https://threejs.org/docs/#manual/en/introduction/Creating-a-scene)*'** is used to create 3D models in web applications, either in a webpage or in Node.js or React environments.

There are so many creative minds out there who come up with so many impressive models. I urge you to check them out [here](https://threejs.org/examples/) or [here](https://threejs.org). 

I was especially interested in [this](https://threejs.org/examples/#webgl_decals) one. You can read more about it [here](https://github.com/pmndrs/react-three-fiber).

**'*[@react-three/cannon](https://www.npmjs.com/package/@react-three/cannon)*'** helps in the provisioning of real-life physics and 3D models in the scene created.
**'*[react-three-fiber](https://github.com/pmndrs/react-three-fiber)*'** is used in building scenes declaratively with re-usable, self-contained components that react to state, are readily interactive and can tap into any React's ecosystem while **'*[@react-three/drei](https://github.com/pmndrs/drei)*'** is used to create helpers abstraction which are useful for **'*[react-three-fiber](https://github.com/pmndrs/react-three-fiber)*'**.
We shall use the **'*[nice-color-palettes](https://www.npmjs.com/package/nice-color-palettes)*'** library to provide a beautiful colors template to quickly use for our models.

Install by running the command below:

```bash
 npm i @react-three/cannon @react-three/drei nice-color-palettes react-three-fiber three
```

#### package.json (file)

Our '**package.json**' file contents will look as follows:

```json
{
  "name": "react-threejs-3d-environment-app",
  "version": "0.1.0",
  "private": true,
  "dependencies": {
    "@react-three/cannon": "^2.5.0",
    "@react-three/drei": "^7.1.1",
    "@testing-library/jest-dom": "^5.14.1",
    "@testing-library/react": "^11.2.7",
    "@testing-library/user-event": "^12.8.3",
    "nice-color-palettes": "^3.0.0",
    "react": "^17.0.2",
    "react-dom": "^17.0.2",
    "react-scripts": "4.0.3",
    "react-three-fiber": "^6.0.13",
    "three": "^0.130.1",
    "web-vitals": "^1.1.2"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
  "eslintConfig": {
    "extends": [
      "react-app",
      "react-app/jest"
    ]
  },
  "browserslist": {
    "production": [
      ">0.2%",
      "not dead",
      "not op_mini all"
    ],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  }
}
```

### public folder
Now, in the public folder, we shall fetch the '**carbon_normal.jpg**' from the following [link](https://raw.githubusercontent.com/franciskaguongo/React-threejs-environment-example/main/public/carbon_normal.jpg). Just download it and copy-paste it there.

It should look as shown below:

![carbon_normal.jpg](/engineering-education/create-a-3d-world-in-react-using-three.js-react-three-fiber/carbon_normal.jpg)

*"carbon_normal Textuture" - Texture image provided by Author*

Or if you are using the *Chrome browser* or any other browser, just right-click on the image above and select the 'Save image' option. Save it as 'carbon_normal.jpg' in the 'public' folder.

### src folder
In the src folder, there are three main files: 'App.js', 'index.js', and 'styles.css'. We will focus on the 'App.js' file:

#### App.js (file)
In the '**App.js**' we shall do the following:

- **Import our installed dependencies**:

```js
// Box and planes are individual 3D components
// Suspense is used to “wait” for something before they can render
// useMemo shall be used to avoid expensive calculations each time it is rendered hence it is optimized. Check it out at https://reactjs.org/docs/hooks-reference.html#usememo
// useLoader is a hook which loads assets and suspends for easier fallback- and error-handling
// Physics brings in the Physics effect in the environment
// useBox, usePlane, useSphere and many more from cannon are used to import the models used in this project
// niceColors are used for beautification of objects
import * as THREE from 'three'
import { Box, Plane } from "@react-three/drei";
import React, { Suspense, useMemo }  from "react";
import { Canvas, useLoader } from "react-three-fiber";
import { Physics, useBox, usePlane, useSphere } from "@react-three/cannon";
import niceColors from 'nice-color-palettes';
import "./index.css";
```

The purpose of used modules is as stated in the code comments above.

- **We shall add a plane function**. This helps us generate multiple objects in the code based on the arguments passed on. 

The function is shown below:

```javascript
// It allows you to input a color as an argument
// The material used will have been built by a mesh material
// Remember, you can still add other attributes in the object created
// We won't add it's mass since itwill begin to fall
function PhyPlane({ color, ...props }) {
  const [ref] = usePlane(() => ({ ...props }));

  return (
      <Plane args={[1000, 1000]} ref={ref}>
        <meshStandardMaterial color={color} />
      </Plane>
  );
}
```

> ***NOTE:*** Whenever '*...props*' are used in the code, they are arbitrary inputs accepted by the program and they return React elements describing what should appear on the screen.

- **Let's add our box function** as well. 

It has some obedience to the physics.

```javascript
/ It has a mass so that it will always be under a gravitational effect to fall
// We have put in some trigger events which will cause some action to occur; that is on-click
// They shall be built out of a mesh material
function PhyBox(props) {
  const [ref, api] = useBox(() => ({ args: [1, 1, 1], mass: 1, ...props }));

  return (
      <Box
          args={[1, 1, 1]}
          ref={ref}
          onClick={() =>

              // This shoots the object when clicked on
              api.applyImpulse([0, 5, -10], [0, 0, 0])
              // &&

              // This makes the object fly upwards when clicked on

              // api.velocity.set(0, 2, 0)

          }
      >
        <meshNormalMaterial />
      </Box>
  );
}
```

- Add **App function** to create our app to be rendered and our **export app function**:

```javascript
function App() {
    return (

        // Canvas holds all our items and scene
        // Set camera position and focus
        <Canvas camera={{ position: [0, 0, 0], near: 0.1, far: 1000 }}>

            // Set gravity
            // All items we want to see the effect of gravity on them shall be inside the Physics tags
            // These include the planes and boxes and any other models
            // Four planes are created which shall hold the contents as a platform
            <Physics gravity={[0, -10, 0]}>
                <PhyPlane
                    color={niceColors[17][5]}
                    position={[0, -2, 0]}
                    rotation={[-Math.PI / 2, 0, 0]}
                />
                <PhyPlane color={niceColors[17][2]} position={[0, 0, -10]} />
                <PhyPlane color={niceColors[17][3]} position={[-6, 0, -10]} rotation={[0, 2, 0]} />
                <PhyPlane color={niceColors[17][1]} position={[6, 0, -10]} rotation={[0, -2, 0]} />

                // Three objects are placed in different positions in the x, y, and z axis
                <PhyBox position={[2, 0, -5]} />
                <PhyBox position={[0, 0, -5]} />
                <PhyBox position={[-2, 0, -5]} />
            </Physics>

            // This is for provision of ambient lighting in the scene
            <ambientLight intensity={0.3} />

            // We have added some pointLight here at the position showed
            <pointLight intensity={0.8} position={[5, 0, 5]} />

            // Apart from ambient light and point light, you can add others such as fog
        </Canvas>
    );
}

export default App;
```

### Run the app
Now, you can run the app using the terminal command below:

```bash
npm start
```

Access the application on a web browser at `localhost:3000`.

The outcome shall be as shown below:

![First run](/engineering-education/create-a-3d-world-in-react-using-three.js-react-three-fiber/first-run.png)

*"First run" - Screenshot by Author*

You can click on the boxes, and you will see them being thrown away each time. You can add the intensity of the throw by modifying the values in the `api.applyImpulse` section in the '**app.js**' file.

For example, you can try:

```javascript
api.applyImpulse([0, 5, -10], [1, 1, 1])
```

![Impulse effect](/engineering-education/create-a-3d-world-in-react-using-three.js-react-three-fiber/impulse.gif)

*"Impulse Effect" - Gif by Author*

Change the effect on the boxes to make the boxes hover or fly upwards like a drone by changing the `onClick` trigger action to:

```javascript
    onClick={() =>
              // This makes the object fly upwards when clicked on
              api.velocity.set(0, 2, 0)
          }
```

![Velocity effect](/engineering-education/create-a-3d-world-in-react-using-three.js-react-three-fiber/velocity-effect.gif)


*"Velocity Effect" - Gif by Author*

> **Bonus/Fun activity**: How wuick are you on clicks?

> Are you able to quickly click on all three boxes and maintain them in the air all at the same time? How long can you keep two? 

>**Remember**, you lose if one touches the bottom plane!

Try to add another effect by combining the two effects above into one using 'and' logic operator as illustrated in the code below:

```javascript
    onClick={() =>
              // This shoots the object when clicked on
              api.applyImpulse([0, 5, -10], [1, 1, 1])
                  
              &&
              // This makes the object to fly upwards when clicked on
              api.velocity.set(0, 2, 0)
          }
```

#### Add spherical objects
Now let's add other spheres objects to the scene. We shall first start with adding functions since we had already imported them into our project.

The functions will be as shown below:

![Impulse and velocity effects](/engineering-education/create-a-3d-world-in-react-using-three.js-react-three-fiber/impulse-and-velocity-effects.gif)

*"Impulse and Velocity Effect" - Gif by Author*

```javascript
// This  is used to create spherical objects in the app
// 'carbon_normal.jpg' is used as a texture loader for each one of them
// The mass is 1, while the start position; that is, when the app is started is obtained randomly in the x and y axis
// We shall use some blocks of code to setup the color of each sphere so that each sphere may look differently
function InstancedSpheres({ number }) {
  const map = useLoader(THREE.TextureLoader, '/carbon_normal.jpg')
  const [ref] = useSphere(index => ({
    mass: 1,
    position: [Math.random() - 0.5, Math.random() - 0.5, index * 4],
    args:1
  }))
  const colors = useMemo(() => {
    const array = new Float32Array(number * 3)
    const color = new THREE.Color()
    for (let i = 0; i < number; i++)
      color
          .set(niceColors[17][Math.floor(Math.random() * 5)])
          .convertSRGBToLinear()
          .toArray(array, i * 3)
    return array
  }, [number])
  return (
      <instancedMesh ref={ref} castShadow receiveShadow args={[null, null, number]}>
        <sphereBufferGeometry attach="geometry" args={[1, 16, 16]}>
          <instancedBufferAttribute attachObject={['attributes', 'color']} args={[colors, 3]} />
        </sphereBufferGeometry>
        <meshPhongMaterial
            attach="material"
            vertexColors={THREE.VertexColors}
            normalMap={map}
            normalScale={[1, 1]}
            normalMap-wrapS={THREE.RepeatWrapping}
            normalMap-wrapT={THREE.RepeatWrapping}
            normalMap-repeat={[10, 10]}
        />
      </instancedMesh>
  )
}
```

Now, in the '**function App()**', add the objects to the Canvas inside the 'Suspense' tags just above the closing physics tag (`</Physics>`). We shall not display anything as it renders the items.

We shall specify the number of objects, in our case we shall use ten (10). 

The code is as shown below:

```javascript
<Suspense fallback={null}>
    <InstancedSpheres number={10} />
</Suspense>
```

> **NOTE:** You can use as many spherical objects as you want. Just remember, the more objects you add the more memory will be used hence the webpage may take longer to load or render and even slow performance.

![Spheres](/engineering-education/create-a-3d-world-in-react-using-three.js-react-three-fiber/spheres.gif)


*"Spheres" - Gif by Author*

> Fun activity hint: You can add more power to the cubes as stated before to effectively hit the spheres.

#### Deeper dive
You can set your threejs environment to the maximum physics settings available using the code below:

```javascript
<Physics gravity={[0, -10, 0]} size={100} tolerance={0.001} iterations={5} broadphase={"Naive"} step={1/60} shouldInvalidate={true} children allowSleep={false} axisIndex={0} defaultContactMaterial={1e6}>
```

You can find, clone, and modify the code of [this](https://github.com/franciskaguongo/React-threejs-environment-example) project in this repository.

Find cylinders, particles, Trimesh, springs, and more objects [here](https://www.npmjs.com/package/@react-three/cannon). You can also see some of the "props" available and other 'cannon' settings for your objects.

Find out how to navigate in the environment using '[Orbitcontrols](https://threejs.org/docs/#examples/en/controls/OrbitControls)'.

You can be more creative with any upcoming ideas, there are no limitations to 3D modeling.

>***Note:** The images provided were either directly captured from the screen during program running or from an authorized repository. Photos are provided by **Francis Kaguongo**.*

### Conclusion
You have done the following in this article:
- Created a new React project
- Installed needed packages: **@react-three/cannon**, **@react-three/drei**, **nice-color-palettes**, **react-three-fiber**, and **three**.
- Learned the functions of the packages installed.
- Ran the application.
- Learned how to add more objects such as Spheres.
- Found out where to find more objects and models.

3D objects are very powerful artifacts. They describe in detail our world objects as we see them with our eyes and how they interact with other objects. They represent this information in computer environments for fun interactions and also for detailed analysis or commercial services.

3D modeling has **high** pay since the number of experienced creators and developers is not as high compared to that of static applications.

This has turned out to be a major '*Gold-mine*' for programmers who know how to create, interact with them, and explore them.


### References
- [How to Insert 3D Objects into a Webpage using HTML and CSS](/engineering-education/how-to-insert-3d-objects-into-a-webpage-using-html-and-css/).
- [threejs documentation](https://threejs.org/docs/#manual/en/introduction/Creating-a-scene).
- [threejs InstancedMesh](https://threejs.org/docs/#api/en/objects/InstancedMesh)
- [React Three Fibre documentation](https://github.com/pmndrs/react-three-fiber).
- [threejs website](https://threejs.org).
- [React Documentation](https://reactjs.org/docs/components-and-props.html).

---
Peer Review Contributions by: [Jethro Magaji](/engineering-education/authors/jethro-magaji/)

