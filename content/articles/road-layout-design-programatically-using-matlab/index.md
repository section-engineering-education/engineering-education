---
layout: engineering-education
status: publish
published: true
url: /road-layout-design-programmatically-using-matlab/
title: Road Layout Design Programmatically Using Matlab
description: 
author: vitalis-odhiambo
date: 2022-01-20T00:00:00-10:05
topics: [Languages]
excerpt_separator: <!--more-->
images:

 - url: /engineering-education/road-layout-design-programmatically-using-matlab/hero.jpg
   alt: Programming Road Layout using MATLAB example image
---

### Introduction
In designing road layout, we use the `drivingscenario` function. `scenario` function allows for simulation of an activity or a structure in the real world.

You can use the `Drivingscenario` function to create different road layout designs by plotting the road layout in 2D or 3D graphs. It is done by specifying the coordinates of the road center using function `roadCentre=[];` and the road width then plotting these points on the graph.

<!-- more -->

### Prerequisites
To follow along with this tutorial, you'll need:
- [MATLAB](https://www.mathworks.com/products/get-matlab.html?s_tid=gn_getml) installed.
- [Proper understanding](/engineering-education/getting-started-with-matlab/) of MATLAB basics.

### Table of contents

- [Table of contents](#table-of-contents)
- [Objectives](#objectives)
- [Straight road](#straight-road)
- [Roads with lanes](#roads-with-lanes)
- [Road intersection](#road-intersection)
- [Curved roads layout](#curved-roads-layout)
- [Roundabout road layout](#roundabout-road-layout)
- [Elevated road layout](#elevated-road-layout)
- [Overpass roads](#overpass-roads)
- [Conclusion](#conclusion)

### Objectives
This article will discuss the design of the following road layout using Matlab functions:
- Straight road.
- Roads with lanes.
- Intersecting roads.
- Curved road layouts.
- Roundabout layout.
- Elevated road layout.
- Overpass road layout.

### Straight road
A straight road layout has a fixed width. It can be designed by defining the road center coordinates with two points and a specified width. The graph axis is labeled in meters.

The first step of designing any road layout is defining the `scenario` as `scenario=drivingScenario`. 

After declaring the scenario function, the road center coordinates are specified. For our case, we will use `(0 10)` and `(60 10)` with a road width of 8 meters. 

The final road layout is obtained by plotting the `scenario`, road centerline, and width. The resultant figure will have a straight road layout.

```matlab
scenario = drivingScenario; %declering the scenario function
road_center = [0 10;60 10]; %specifying road center coordinates
road_width = 8; %specified road width
road(scenario,road_center,road_width); %road properties
plot(scenario,'RoadCenters','on','Centerline','on')
```

![straight road layout](/engineering-education/road-layout-design-programmatically-using-matlab/roadlayout-a.png)

### Roads with lanes
Road lanes can be created by providing lane specifications. Road lanes control traffic flow by informing the driver about the boundaries. Lanes can also determine the caring capacity of the road.

In Matlab, the road lane is specified in the form of two numbers coordinated with the center of the road, and the first number presents the number of lanes in the first half of the road while the second number presents the number of lanes in the second half of the road.

The function used in making lanes on road layout is `lanespec([]);`. For example, `lanespec([2 2]);` will produce a total of four lanes with two lanes at each half of the road whereas `lanespec([3 2]);` will produce a total of five lanes, with the first half having three lanes and the second half having two lanes.

Below codes are demonstrating formation of a total of four lanes with each side of the road centre having two lanes.
```matlab
scenario = drivingScenario; %declaring scenario function
road_centers = [0 10;50 10]; %specifying road centers
road(scenario,road_Centers,'lanes',lanespec([2 2])); % road properties
plot (scenario,'Roadcenters','on');
```

![Laned road](/engineering-education/road-layout-design-programmatically-using-matlab/roadlayout-b.png)

### Road intersection
Road intersection is where two roads heading in different directions cross, forming a cross-like structure. 

In Matlab, intersections are automatically created whenever two roads meet.

To make a road intersection layout, one has to make two different roads. One of the two roads will be vertically oriented while the other one horizontally oriented. 

For demonstrations, we will intercept two straight roads. The verticle road will have road center coordinates as `[0 10; 50 10]`. The horizontal road will have road center coordinates as `[30 -30; 30 30]`.

Below codes demonstrates process of creating road intersections:
```matlab
scenario = drivingScenario;
road_Centre = [0 10;50 10]; %specifying road centre

% defining the first road
road_Centers =[0 10;50 10];
road(scenario,road_Centers,'lanes',lanespec([1 1]));

% defining the second road
road_Centers =[30 -30;30 30];
road(scenario,road_Centers,'lanes',lanespec([1 1]));

% plotting the two roads
plot(scenario,'RoadCenters','on');
```
![Intersecting road layout](/engineering-education/road-layout-design-programmatically-using-matlab/roadlayout-c.png)

### Curved roads layout
You can generate the curved road using three or more points to specify the road center coordinates. The road will have a fixed width, and you must specify the width of the lanes that are not mentioned.

The code syntax for making a curved road layout is almost similar to that of making straight roads; the only difference is that three or more points are used for plotting the road center, while in a straight road layout, two points are enough for making the road. 

The more road center coordinates used, the more a complex curve road is formed.

The below codes illustrate the making of the curve road layout. We will use four-point coordinates to define the road center, that is `[0 0; 13 10; 30 -10; 50 -25]`. 

The width used will be 8 meters.
```matlab
scenario=drivingScenario; %declaring scenario function
road_Centers = [0 0; 13 -10; 30 -10; 50 -25]; %defining road centre coordinates
road_width =8; % specifing the road width
road(scenario,road_Centers,road_width,'lanes',lanespec(2)); % road properties
plot(scenario,'RoadCenters','on');
```
![Curve road layout](/engineering-education/road-layout-design-programmatically-using-matlab/roadlayout-d.png)

### Roundabout road layout
Roundabout roads are circular and have four existing roads. When designing a roundabout, the circular part is formed by specifying the center of the clothoid curves. 

The first coordinate of the clothoid curve is repeated at the end of the coordinate description to form a continuous circular loop. 

Four roads are then added to the circular road to complete the road layout. Finally, the exit road coordinates should be defined to cut the circular road circumference into a quarter.

The example below illustrates designing of the roundabout layout. 

First we define the road centre coordinate of the circular section of the road as `[-20 -20; 20 -20; 20 20; -20 20; -20 -20];`. 

The four exist roads are made using four different straight roads whose coordinates are defined as `[-35 0; -30 0];`, `[30 0; 35 0];`, `[0 35; 0 30];`, and `[0 -30; 0 -35];`. The bellow codes shows this process.
```matlab
scenario = drivingScenario;
% defining coordinates of the circular part of the layout
roadCenter = [-20 -20
              20 -20
              20 20
              -20 20
              -20 -20];
road(scenario,roadCenter,'lanes',lanespec(1));

% defining the four exist roads coordinates
road(scenario,[-35 0; -30 0],'lanes',lanespec([1 1]));
road(scenario,[30 0; 35 0],'lanes',lanespec([1 1]));
road(scenario,[0 35; 0 30],'lanes',lanespec([1 1]));
road(scenario,[0 -30; 0 -35],'lanes',lanespec([1 1]));

% plotting the defined roads
plot(scenario,'RoadCenters','on')
```
![Roundabout road layout](/engineering-education/road-layout-design-programmatically-using-matlab/roadlayout-e.png)

### Elevated road layout
It is possible to design a road layout on higher grounds by introducing `z` coordinates to plot the display on a 3D graph. The coordinates will be in the form of `(x,y,z)`. The `z` coordinate mainly define the latitude of the road. For example, roads on highlands are elevated hence have higher latitude.

The elevated road layout is made by defining the road center coordinates with the 3 point coordinates. 

The value of the z-axis coordinate determines the magnitude of the elevation.

The below codes demonstrate elevated road layout. The road center coordinates are `[0 0 0; 30 0 6; 60 0 0]` with four lanes equally distribute in the halves. The highest point in the road will be 6 meters above sea level as defined in the coordinates.
```Matlab
scenario = drivingScenario; % declering scenario type

% defining road center coordinates
roadCenter= [0 0 0
             30 0 6
             60 0 0];

% plotting the road layout            
road(scenario,roadCenter,'lanes',lanespec([2 2]));
plot(scenario,'RoadCenters','on');
view(30 24)  
```

![Elevated road](/engineering-education/road-layout-design-programmatically-using-matlab/roadlayout-f.png)

### Overpass roads
Overpass layout is where roads cross each other without intercepting. One road will be above another; hence the layout is defined using three-point coordinates `(x y z)`.

To demonstrate, we will design a road to pass 10 meters above another road. 

The height of the overpass is defined in the z-axis. The layout will join a curved road to form a continuous loop.
```matlab
scenario = drivingScenario;

% road center coordinates
roadCenters = [0 0 0
               15 -25 0
               15 25 10
              -25 -25 10
              -25 15 0
               0 0 0];

% ploting the road coordiantes
road(scenario,roadCenter,'lanes',lanespec([2 2])); 
plot(scenario,'RoadCenters','on');
view(40,25)
```

![Overpass road](/engineering-education/road-layout-design-programmatically-using-matlab/roadlayout-g.png)

### Conclusion
Matlab provides a platform for designing road layouts using either a driving scenario designer app or programmatically, as shown in the article. Road layouts design techniques are applicable in traffic simulation, road plans, and game development. In this article, we have looked at the various aforementioned components to design a road layout. 

Happy coding!


---
Peer Review Contributions by: [Owino Wendy](/engineering-education/authors/owino-wendy/)

