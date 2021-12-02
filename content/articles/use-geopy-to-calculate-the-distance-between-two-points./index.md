### The Geopy method for distance calculation between any two points on the globe.
### Introduction.
Geopy is essentially a Python library that makes the calculation of geographic distances easier. It becomes considerably easier for developers using Geopy to retrieve the coordinates of various sites by leveraging third-party geocoders and other data sources.

In this article, we'll look at a few alternative ways for calculating the distance between any two points on the globe. We shall dig deep to explain how this is possible using python package geopy which is the primary python package for distance calculation.

The user needs first perform the following command to install geopy.
```Python
pip install geopy
```
We're ready to work with geopy now that you've completed a successful installation.

Using the Geopy, we can calculate or find the distance between two strategic positions using the various methods that are listed below.
1. Distance Measure using the Domestic Measure.
2. Distance Measure using The greate circle distance.
3. Distance Measure using The Herversine formula.
### The Domestic Measure for distance calculation.
The shortest path between any two points on the Earth's surface is known as the geodesic distance. We'll illustrate how to compute or how to calcuate the Geodesic Distance using latitude and longitude data in the next example.

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
This may be defined as the shortest path between any two places or points on the sphere or on the earth's surface. In this example, it is assumed that the earth is a perfect sphere. The following example shows how to compute great circle distance using longitude and latitude data from two locations.

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
### The Herversine formula for distance calculation.
The orthodromic distance is used to calculate the shortest distance between two sites on the globe separated by latitude and longitude.

To use this method, the user must have the coordinates of two points (X and Y).

They must convert degrees of latitude and longitude to radians before dividing the data by (180/).

"57.29577" will be the value of (180/). 

The user may wish to find the distance in miles where the radius of the Earth can be set to "3,963." The user can also use the value "6,378.80" to compute the distance in Kilometres.
### Formulas
Longitude in radians is calculated as follows:
In radians, the value of latitude is:
 Latitude (LaA) = LaA / (180/?)

  OR
  
Latitude (LaA) = LaA / 57.29577

How to compute longitude in radians:

Longitude (LoA) = LoA / (180/?)

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
 

LaA=9.072264
LaB=14.716677
LoA=7.491302
LoB=-17.467686

print ("The distance between Abuja and Dakar is: ", distance_d(LaA, LaB, LoA, LoB), "K.M")  
```
See terminal output below
```bash
The distance between Abuja and Dakar is:  2785.183036572855 K.M
```
### Conclusion
Using the geopy package, we've gone over numerous ways for determining the distance between two points on the earth's surface in this tutorial. Each approach has been demonstrated using examples.
### More of coding to go for. 



    
