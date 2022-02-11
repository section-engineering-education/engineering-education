
The Driving Scenario Designer App is used in designing synthetic driving scenarios. These scenarios are used in testing the automatic driving systems. The tool is primarily applied in developing automatic cars since one can create all the scenarios using this toolbox. 

These applications include the creation of roads and adding actors into them. The mobile parts of the road are the actors. You can add scenarios using a drag-drop interface. 

Furthermore, you can add radar and sensors to your ego car. An ego car is a car that you are trying to automate while considering the surrounding factors. These sensors can generate the line boundary and maintain your car within the boundary. 

In this tutorial, we'll see how to use this App to create scenarios. We will create scenarios directly from the toolbox and programmatically from the command window. All these two different scenario creation requires this toolbox.

### Prerequisites
To follow along with this tutorial, you will need:
- [MATLAB](https://www.mathworks.com/products/get-matlab.html?s_tid=gn_getml) installed.
- Proper understanding of [MATLAB](https://www.section.io/engineering-education/getting-started-with-matlab/) basics.

### Driving scenario
 #### Why this App
If you want to test the sensor algorithm, traditionally, you had to collect testing data by driving your car over different environments. Then, you would take this data into Matlab for analysis. 

The whole process of collecting the data is time-consuming and requires quite more energy. This designer App lets you test your algorithm faster. Instead of driving around to collect testing data, you can create scenarios to gather the data.

The scenarios created in the designer App can contain all the possible constituents of the road. For example, it may include the road signs, pedestrians, lane boundary and vehicles. Also, you can virtually set up the scenario and simulate the sensor detection.

These variables are then exported in Matlab and test your sensor algorithm. 

Let us walk through the App to see how it works.

First , this App in the apps section. You can locate it in two ways in Matlab. 

Method 1: Click on the App section at the top of Matlab's window.

![Apps](driving-one.png)

- Click on the dropdown arrow to locate the automotive section.
- In the automotive section, select the `Driving Scenario App`.

![Driving scenario app](driving-two.png)

- Double-click the App to open it.

Method 2: Alternatively, you can execute the `drivingScenarioDesigner` command in the command window. This command automatically opens the App. When you open the App, the display will be as shown below:

![App window](driving-three.png)

You can add roads and movable objects known as actors in the driving scenario App. There are different types of actors, but an actor's choice depends on what you want to do. The actors are such as cars, trucks, bicycles and barriers.

The App is divided into three parts. These three parts are:
1. actors/roads
2. scenario canvas, and 
3. egocentric view.

The actors/roads section shows the roads' properties or the actors you have added. We use the scenario canvas to add our scenarios. It acts as the working space for the App.

Egocentric section is where your scenarios appear as a reality. This section makes them appear in a more practical form.

### Adding scenarios to the scenario canvas
We will start by adding a road to our scenario canvas. To add a road, click on the `add road` at the top bar of the App. Then, move the cursor to the scenario canvas. Click on the starting point, the second point, to make a shape you desire and then click `enter`. An example is shown in the image below:

![Adding roads](driving-four.png)

When you click enter, you have:

![The road](driving-five.png)

After adding the road, the road description is given in the road/actor section. For example, our road has four centres and a width of six metres. The centres are the number of endpoints when creating the road.

We can also add actors to our road. The actors that we want to add are vehicles/cars. To add cars, you have to specify your ego car. An ego car is a car that is controlled by automated driving systems.

The first car you add into the scenario canvas is the ego car by default. You can change to any actor that you want afterwards.

To add a car into the scenario canvas, click on the `actors`, then select your preferred actor. After that, you drive the cursor to the position you want on the road. 

![Adding cars](driving-six.png)

Since these are automated cars, you have to create a `way point`. A waypoint is a specific lane which the car will follow. When creating a scenario and an actor is involved, you cannot run this program without adding a waypoint.

In adding a waypoint, every car has its waypoint. Select the car/ truck that you want to add a waypoint to, then right-click on it and select `add way point`. It creates a cursor that enables you to create this waypoint.

After this, you can run the simulation to see how it works. We can see the program run as we want it to.

![Running program](driving-seven.png)

This App allows you to add any property you need for your simulation. Alternatively, you can add these properties programmatically.

### Adding scenarios programmatically
**Case scenario**

Suppose you want to add a scenario of two cars ten meters apart. You can specify the vehicle speed. These cars could be moving at constant or different speeds depending on how you want them to be. In this case, the first car will be moving at a speed of 4m/s and the other at 7m/s.

```Matlab
driving = drivingScenario;
veh = vehicle(driving,'ClassID',1','Position',[3 0 0],'Velocity',[-4 0 0],'Yaw',90)
```

This is the code that adds your first actor. The variable `driving` initializes this toolbox. Next, we use the `vehicle()` function to add a vehicle to your scenario. This function takes the initialization toolbox variables `scenario`, `position`, `velocity` and the `yaw`.

`Yaw` is the oscillation about an axis. Now, if you look at the velocity, it is negative. It is because the movement is assumed to be along the y-axis. From the origin, the y-axis values are always negative.

When you execute the code above, we get the following:

```Matlab
veh = 

  Vehicle with properties:

               ActorID: 1
               ClassID: 1
              Position: [3 0 0]
              Velocity: [-3 0 0]
                   Yaw: 180
                 Pitch: 0
                  Roll: 0
       AngularVelocity: [0 0 0]
                Length: 4.7000
                 Width: 1.8000
                Height: 1.4000
            RCSPattern: [2×2 double]
      RCSAzimuthAngles: [-180 180]
    RCSElevationAngles: [-90 90]
         FrontOverhang: 0.9000
          RearOverhang: 1
             Wheelbase: 2.8000
```

You can add the second car using the code below:

```matlab
veh2 = vehicle(scenario,'ClassID',1,'Position',[0 08 0],'Velocity',[0 -7 0],'Yaw',-180)
```

The output will be:

```Matlab
veh2 = 

  Vehicle with properties:

               ActorID: 2
               ClassID: 1
              Position: [0 10 0]
              Velocity: [0 -7 0]
                   Yaw: -180
                 Pitch: 0
                  Roll: 0
       AngularVelocity: [0 0 0]
                Length: 4.7000
                 Width: 1.8000
                Height: 1.4000
            RCSPattern: [2×2 double]
      RCSAzimuthAngles: [-90 90]
    RCSElevationAngles: [-180 180]
         FrontOverhang: 0.9000
          RearOverhang: 1
             Wheelbase: 2.8000
```

To visualize the scenarios that we have created, we use the `plot()` as shown below:

```matlab
plot(driving);
set(gcf,'Name','Scenario Plot')
xlim([-15 15]);
ylim([-15 15]);
```

The `set()` function sets properties to your scenario. The `gcf` returns the handle to the current figure since this execution is done in the command window. The output here is:

![Output of the program](driving-eight.png)

We can use a `chasePlot` to place the vehicle relatively. You can create a relative vehicle placement using a `chasePlot`. This plot makes the egocentric view of your simulation.

The chase plot shows the projective perspective view by default. For example, let us show the perspective view of the second car using the `chasePlot` function.

```Matlab
chasePlot(v2)
set(gcf,'Name','Chase Plot')
```
The output is as shown below:

![Chase plot](driving-nine.png)

This output shows the perspective as it is seen some distance from the second car. The cars are `10m` apart with `6m` between them from the plot.

### Simulation containing both the ego car and the road
When adding roads, you have to specify the road centres and the bank angles. Bank angles are the turning points of the vehicle, and it is inclined at this point. You get the road boundaries when you plot these road centres and the bank angles. To do this, we execute the code below:

```Matlab
driving = drivingScenario;
Centres = ...
    [  0  40  49  50 100  50  49 40 -40 -49 -50 -100  -50  -49  -40    0
     -50 -50 -50 -50   0  50  50 50  50  50  50    0  -50  -50  -50  -50]';
 
bankAngles = [3   7   6   9   3  3   8  0   0   4   4    9    6    9    0    0];
road(driving, Centers, bankAngles, 'lanes', lanespec(2));
plot(driving);
```

The `road()` function is used to plot the roads. This function takes your scenario, the bank angles and the road centres as the arguments. Running this program, we get the following output:

![Road plot](driving-ten.png)

Let us now add our ego car using the `vehicle()` function and its position as the argument.

```matlab
egoCar = vehicle(driving,'ClassID',1,'Position',[80 -40 0.45],'Yaw',30);
```

The output plot with the ego vehicle is shown below:

![Ego vehicle added](driving-eleven.png)

### Adding trajectories for our actors
As we said before, we have to give it trajectories for our vehicle to move. We add the second actor car, and both of these vehicles are given a trajectory. To add our second car, 'fastCar`, you use the code below:

```Matlab
chasePlot(egoCar);
fastCar = vehicle(scenario,'ClassID',1);
```

In giving the trajectories, we specify the diameter of the car, the road offset and the right and left way points. An offset line is the short distance from the main survey line.

```matlab
diameter = 2.9/2;
Offset = [ 0  0  0  0  d  0  0  0  0  0  0 -d  0  0  0  0
              -d -d -d -d  0  d  d  d  d  d  d  0 -d -d -d -d]';

rightWayPoints = Centers + Offset;
leftWayPoints = Centers - Offset;
```

We then loop the right and left way points using `repmat()` function.
To make an ego centric plot of the simulation, we use the `smoothTrajectory()` function:

```matlab
% We loop around the track upto four times.
rightWayPoints = [repmat(rightWayPoints(1:end-1,:),5,1); rightWayPoints(1,:)];
leftWayPoints = [repmat(leftWayPoints(1:end-1,:),5,1); leftWayPoints(1,:)];

smoothTrajectory(egoCar,rWayPoints(:,:), 30);
smoothTrajectory(fastCar,lWayPoints(:,:), 50);
```

Here, we get:

![Figure 1](driving-twelve.png)

![Figure 2](driving-thirteen.png)

### Conclusion
Simulation of the automated driving system is made easier by the Driving Scenario App. You can create different scenarios using this App. The data from this toolbox can then be exported and used to improve various automated driving systems algorithms.
It makes it a widely used toolbox.

Happy coding!
