---
layout: engineering-education
status: publish
published: true
url: /using-geopy-to-calculate-the-distance-between-two-points/
title: How to Calculate Distance between Two Points using Geopy in Python
description: This tutorial will help readers understand how to calculate distance between two locations using the Geopy library in Python.
author: joshua-wainaina
date: 2022-02-25T00:00:00-02:35
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/using-geopy-to-calculate-the-distance-between-two-points/hero.jpg
    alt: Calculate Distance between Two Points using Geopy in Python Hero Image
---
Geopy is a Python library that simplifies the calculation of geographic distances between two points. 
<!--more-->
It makes it easier for developers to retrieve coordinates of various locations using third-party geocoders, as well as other data sources.

In this article, we'll look at alternative ways of calculating the distance between any two points. 

We will explain how this process is possible using [geopy](https://geopy.readthedocs.io/en/stable/). This is the primary Python library for calculating distance.

There is a series of steps that are followed before installing `geopy`:

First, open your terminal and make sure it is running as an administrator. Ensure that you are operating from the root by running `cd..` command.

You can now run the command below to install `geopy` on your computer.

```Python
pip install geopy
```

We can calculate or find the distance between two positions using the following methods in Geopy:

- Geodesic measure.
- The great circle distance.
- Herversine formula.

### Geodesic measure
Geodesic measure is used to determine the shortest path between any two points on the globe.

However, it's not exactly the same as *the shortest curves* between any two given locations, despite their likeness. 

We'll illustrate how to calculate the Geodesic distance using latitude and longitude data in the following example.

Example 1:

```python
# Import the geodesic module from geopy library 
from geopy.distance import geodesic as GD
 # For the specified locations, load their latitude and longitude data.
Abuja =(9.072264 , 7.491302)
Dakar =(14.716677 , -17.467686)
#Finally, print the distance between the two sites in kilometers.
print("The distance between Abuja and Dakar is: ", GD(Abuja,Dakar).km)
```

Output:

```bash
The distance between Abuja and Dakar is: 2787.8012928541466
```

Example 2:

```python
# Geopy distance module is first imported for computation
from geopy.distance import geodesic as GD
# Next, input the latitude and longitude data for Nairobi and Cairo.  
Nairobi=(36.817223,-1.286389 )
Cairo=( 31.233334,30.033333, )
# Finally, print the distance between the two locations in kilometers. 
print("The distance between Nairobi and Cairo is :",GD(Nairobi,Cairo).km)
```

Output:

```bash
The distance between Nairobi and Cairo is: 2944.261368793268
```

### The great circle distance formula
The great circle is regarded as the shortest path between any two places or points on the sphere or the earth's surface. In this example, it is assumed that the globe is a perfect sphere. 

The following example shows how to compute great circle distance using longitude and latitude data from two locations.

Some of the problems with great-circle navigation include the computation of *azimuths* at endpoints and intermediate waypoints.

A great circle is formed by any two points on a sphere that are not directly opposite to each other. 

The great circle is divided into two arcs by these two points. The shorter arc that is between any two locations equals the great-circle distance.

Example 3:

```python
# First, import the geopy library's great circle module.
from geopy.distance import great_circle as GRC
# Abuja and Dakar latitude and longitude data.
Abuja=(9.072264 , 7.491302)
Dakar=(14.716677 , -17.467686)
# Finally print the distance between the two points in km
print("The distance between Abuja and Dakar is:", GRC(Abuja,Dakar).km) 
```

Output:

```bash
The distance between Abuja and Dakar is: 2785.186971064666
```

### The Haversine formula for distance calculation
The Haversine formula calculates the great-circle distance between any two locations on a sphere using their longitudes and latitudes.

The Haversine method gives an accurate way of determining the distance between any specified longitude and latitude.

It also serves as a realignment of the spherical law of cosines. However, it's more useful for tiny angles and distances. 

The user must have the coordinates of two points (X and Y) to utilize this method.

They must convert degrees of latitude and longitude to radians using the `180/π` formula.

### Formulas
To convert longitudes and latitudes to radians, we use the following formula:

In radians, the latitude's value is:

Latitude (LaA) = LaA / (180/π ) or Latitude (LaA) = LaA / 57.29577.

The longitude's value will be:

Longitude (LoA) = LoA / (180/π ) or Longitude (LoA) = LoA / 57.29577.

We use the formula below to calculate the distance in miles:

Distance (D) = 3963.0 * arccos[(sin(LaA) * sin(LaB)) + cos(LaA) * cos(LaB) * cos(LoB - LoA)]  

To calculate the distance in kilometers:

Distance (D) = 3963.0 * arccos[(sin(LaA) * sin(LaB)) + cos(LaA) * cos(LaB) * cos(LoB - LoA)]

Example 4:

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

Output:

```bash
The distance between Abuja and Dakar is:  2785.183036572855 K.M
```

### Conclusion
In this tutorial, we have discussed how to use the geopy package to determine the distance between two points on the earth's surface. 

You can, therefore, use this knowledge to craft other high-quality applications.

---
Peer Review Contributions by: [Wanja Mike](/engineering-education/authors/michael-barasa/)