---
layout: engineering-education
status: publish
published: true
url: /how-to-build-discord-bot-with-javascript/
title: How to Build a Discord Bot using JavaScript
description: This tutorial will help readers understand how to build a Discord bot using JavaScript. The bot will be able to answer certain messages automatically.
author: kamau-wambui
date: 2021-12-28T00:00:00-17:33
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/how-to-build-discord-bot-with-javascript/hero.png
    alt: Build a Discord Bot using JavaScript Hero Image
---
Discord is a robust communication app used by a large community of gamers, developers, and cryptocurrency enthusiasts. 
<!--more-->




Geopy is a Python library that simplifies the process of calculating geographic distances between two points. 

It makes it easier for developers to retrieve coordinates of various points using third-party geocoders, as well as other data sources.

In this article, we'll look at alternative ways of calculating the distance between any two points. 

We will explain how this process is possible using [geopy](https://geopy.readthedocs.io/en/stable/). This is the primary Python library for calculating distance.

You can install `geopy` using the following command:

```Python
pip install geopy
```

Using Geopy, we can calculate or find the distance between two positions using the below methods:

- Geodesic measure.
- The great circle distance.
- Herversine formula.

### Geodesic measure
Geodesic measure is used to determine the shortest path between any two points on the globe.

Geodesics are not exactly the same as " the shortest curves" between any two given locations, despite their likeness. 

Geodesics, on the other hand, are just the shortest distance between two points at a given position that is parameterized with "constant speed." 

A geodesic is the "long way around" on a great circle between two points on an earth's surface, even if it is not the shortest path between the two points.

We'll illustrate how to compute or how to calcuate the Geodesic Distance using latitude and longitude data in the next example.

Example 1.1
```python
# To begin, open the geopy library and import the geodesic module. 
from geopy.distance import geodesic as GD
 # Then, for the specified locations,load their latitude and longitude data.
Abuja =(9.072264 , 7.491302)
Dakar =(14.716677 , -17.467686)
#Finally, print the distance between two sites in kilometers.
print("The distance between Abuja  and Dakar is:", GD(Abuja,Dakar).km)

```
See terminal output below
```bash
The distance between Abuja  and Dakar is: 2787.8012928541466
```
Example 1.2
```python
# Geopy distance module is first imported for the purpose of computations.

from geopy.distance import geodesic as GD
# Next, input the latitude and longitude data for Nairobi and Cairo.  

Nairobi=(36.817223,-1.286389 )
Cairo=( 31.233334,30.033333, )
# Finally, print the distance between two sites in kilometers. 

print("The distance between Nairobi and Cairo is :",GD(Nairobi,Cairo).km)
```
See terminal output below
```bash
The distance between Nairobi and Cairo is : 2944.261368793268
```

### The great circle distance formula for distance calculation.
It is simply said to be the shortest path between any two places or points on the sphere or on the earth's surface. In this example, it is assumed that the globe is a perfect sphere. The following example shows how to compute great circle distance using longitude and latitude data from two locations.

The problem of great-circle navigation includes the computation of azimuths at end points and intermediate waypoints, as well as the calculation of the great-circle distance.

A great circle is formed by any two points on a sphere that are not directly opposite with each other. The great circle is divided into two arcs by these two locations. The shorter arc that is between any two locations equals to the great-circle distance.

Example 1.3
```python
 # First, import the geopy library's great circle module.
from geopy.distance import great_circle as GRC
# Abuja and Dakar latitude and longitude data.
Abuja=(9.072264 , 7.491302)
Dakar=(14.716677 , -17.467686)
# ## Finally print the distance between the two points calculated in km
print("The distance between Abuja  and Dakar is:", GRC(Abuja,Dakar).km) 
```

See terminal output below

```bash
The distance between Abuja  and Dakar is: 2785.186971064666
```
### The Heversine formula for distance calculation.

Using their longitudes and latitudes, the heversine formula calculates the great-circle distance between any two locations on a sphere.

The rule of haversines, a more general formula in spherical trigonometry that relates the sides and angles of spherical triangles, is one example.

The haversine method therefore gives a very correct way of finding the distance between any two given longitude and latitude.

The haversine formula is a  realignment of the spherical law of cosines, although it is more useful for tiny angles and distances since it is written in haversines. 

The "Ha" in "Haversine" represents "half versed sine," and haversin(θ) = versin(θ)/2 is the formula.


The orthodromic distance is used to calculate the shortest distance between two sites on the globe separated by latitude and longitude.

If the user want to utilize this method, then they must have the coordinates of two points (X and Y).

They must convert degrees of latitude and longitude to radians before dividing the data by (180/π) and the value of π to be used is 22/7.

"57.29577" will be the value of (180/π). 

The user may wish to find the distance in miles where the radius of the Earth can be set to "3,963." The user can also use the value "6,378.80" to compute the distance in Kilometres.
### Formulas
Longitude in radians is calculated as follows:
In radians, the value of latitude is:
 Latitude (LaA) = LaA / (180/π )

  OR
  
Latitude (LaA) = LaA / 57.29577

How to compute longitude in radians:

Longitude (LoA) = LoA / (180/π )

 OR

Longitude (LoA) = LoA / 57.29577 

The longitude and latitude coordinates of P and Q locations, as well as the aforementioned method to convert them to radians, will be required by the user.

By utilizing the following method, distance between any two points can be found.
### Hundreds of miles

Distance (D) = 3963.0 * arccos[(sin(LaA) * sin(LaB)) + cos(LaA) * cos(LaB) * cos(LoB - LoA)]  

### For the kilometer

Distance (D) = 3963.0 * arccos[(sin(LaA) * sin(LaB)) + cos(LaA) * cos(LaB) * cos(LoB - LoA)]  

For the kilometer: The shortest distance between two specified points on Earth can be calculated using the Haversine Formula.
Example 1.4
```python
from math import radians, cos, sin, asin, sqrt

# Implement the formula below

def distance_d(LaA, LaB, LoA, LoB):
# The function "radians" is found in the math module, It's also used to convert radians to degrees.  
LoA = radians(LoA)  
LoB = radians(LoB)  
LaA= radians(LaA)  
LaB = radians(LaB) 
# The "Haversine formula" is used.
D_Lo = LoB - LoA 
D_La = LaB - LaA 
P = sin(D_La / 2)**2 + cos(LaA) * cos(LaB) * sin(D_Lo / 2)**2  
   
Q = 2 * asin(sqrt(P))   
    # The earth's radius in kilometers.
R_km = 6371  
# Then we'll compute the outcome.
return(Q * R km).
 
LaA = 9.072264
LaB = 14.716677
LoA = 7.491302
LoB = -17.467686

print ("The distance between Abuja and Dakar is: ", distance_d(LaA, LaB, LoA, LoB), "K.M")  
```
See terminal output below
```bash
The distance between Abuja and Dakar is:  2785.183036572855 K.M
```
### Conclusion
Using the geopy package, we've gone over numerous ways for determining the distance between two points on the earth's surface in this tutorial. Each approach has been demonstrated using examples.
    
---
Peer Review Contributions by: [Wanja Mike](/engineering-education/authors/michael-barasa/)