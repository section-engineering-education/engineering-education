---
layout: engineering-education
status: publish
published: true
url: /how-to-collect-sensor-data-on-your-mobile-device-using-matlab/
title: How to Collect Sensor Data on Your Mobile Device Using Matlab
description: This tutorial goes through all the steps involved in collecting data and information with sensors using Matlab app. Sensors are electrical devices that use signals to detect various conditions or objects.
author: queenter-bruce
date: 2021-08-20T00:00:00-01:50
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/how-to-collect-sensor-data-on-your-mobile-device-using-matlab/hero.png
    alt: How to collect sensor data using Matlab hero image
---
Have you ever been in a situation where you are trying to build a project but are still waiting on sensors that have not even left the warehouse? Well, there is a solution to that.
<!--more-->
Did you know that you can use your smartphone for these tasks? Smartphones have several sensors, and with the Matlab mobile app, you can use some of the sensors to collect and analyze data.

Sensors are electrical devices that use signals to detect various conditions or objects. They form an essential part of a sensor-involved project.

This tutorial will look at how we can collect data using smartphones' sensors and use the data for various purposes.

### Prerequisites
To follow through this article, you need to have:
- [Matlab](https://www.mathworks.com/products/get-matlab.html?s_tid=gn_getml) installed.
- Proper understanding of [matlab](https://www.section.io/engineering-education/getting-started-with-matlab/) basics.
- Mobile matlab installed on your phone.

To install Matlab mobile app on your phone, go to the play store or AppStore and search for `Matlab`.

Once you locate it, click on `install` to install Matlab in your phone.

### How to use Matlab mobile to take photos
You can access the camera to take an image or video manually. This image or video can be use in your program for analysis.

To access the camera:
- Open Matlab on your mobile phone.
> Note that Matlab mobile works online, and you must have an internet connection to use it.
- Click on the three dashes at the top-left of the Matlab window.

![Location of the dashes](/engineering-education/how-to-collect-sensor-data-on-your-mobile-device-using-matlab/sensor_one.jpg)

- Click on the file section.

![Location of the files](/engineering-education/how-to-collect-sensor-data-on-your-mobile-device-using-matlab/sensor_two.jpg)

- Click on the `+` sign at the top-right corner.
- Click on the `Take a photo` button to take a photo.

![Tab for taking the photo](/engineering-education/how-to-collect-sensor-data-on-your-mobile-device-using-matlab/sensor_three.jpg)

The camera on the Matlab mobile app is easy and intuitive to use.

After taking an image, it is uploaded to a Matlab drive to sync all your files and data. The image is uploaded in the `.jpeg` format with an auto-generated name.

Since you are going to use this image, you can rename it to something meaningful.

To rename the image, long-press it, click on the `rename` tab, and give it a name of your choice.

After giving it a new name, click `ok`.

Let us go back to the command window and begin writing some code. We will read the image using the `imread` function and then use the `imshow` function to view it.

```Matlab
I = imread('filename.jpg');
imshow(I)
```

![Showing our captured image](/engineering-education/how-to-collect-sensor-data-on-your-mobile-device-using-matlab/sensor_four.jpg)

After accessing your image, you can do anything you wish to it. For example, you can change the image to gray-scale as shown below:

```Matlab
B = rgb2gray(I);
imshow(B)
```

![The gray-scale image](/engineering-education/how-to-collect-sensor-data-on-your-mobile-device-using-matlab/sensor_five.jpg)

As you can see, it is easy to use your mobile Matlab to acquire the image and perform some quick image processing.

Moreover, you can write all your commands in a script so you could use them anytime on your mobile Matlab or PC.

To do that, first click on the `+` sign on the file section and then click on `script`.

This technology makes it possible to use your commands anywhere in the Matlab drive, where you can sync all your files and data.

Once you sync all the data, you can access it online on your drive. Alternatively, you can access the data online on your Matlab drive.

To do this, click [here](https://www.mathworks.com/products/matlab-drive.html) and then click on `Matlab drive online`.

![Location of Matlab drive online](/engineering-education/how-to-collect-sensor-data-on-your-mobile-device-using-matlab/sensor_six.png)

Once you click on the `Matlab drive online`, provide your information to login to your Mathworks account. When this is successful, you will find all your files there.

You can download the data into your PC and use it from there:

![Structure of the drive](/engineering-education/how-to-collect-sensor-data-on-your-mobile-device-using-matlab/sensor_seven.png)

### Using phone sensors
These sensors are:
- Acceleration sensors
- Angular velocity sensors
- Orientation sensors
- Magnetic field sensors
- Position sensors

To access the sensors, go to the `File` menu, then click on `Sensors`. When you open the sensor window, you will find the various sensors provided by your phone.

You can log data from all these available sensors or just one sensor depending on what you want to do. You can either log data and save it as a `.mat` file or stream data to Matlab.

In this case, we will look at how to log data and access it. Then we are going to use the collected data to calculate the distance traveled.

For the data, we are going to collect latitudinal and longitudinal information.

To do this, you will move around with your phone as it collects the data.

To set your phone for this activity, activate the position sensor, click on the start button, and start collecting this data.

![Data collection](/engineering-education/how-to-collect-sensor-data-on-your-mobile-device-using-matlab/sensor_eight.jpg)

Once you are done, click on the Stop tab, then save your file. It allows you to use the data on your laptop or any other preferred place. This data will be uploaded to your Matlab drive.

To use this data on your PC, login to your Mathworks account in Matlab. Matlab drive stores the data. Once you log in, you can easily access it.

Alternatively, you can use the previously explained method of using `Matlab drive online`.

After accessing your data, you can use an algorithm to calculate the distance traveled. In this case, we are going to use the haversine formula to calculate the distance.

To calculate, we will first load our data into Matlab, add the data path, and then load the data as shown below:

```Matlab
%% load data acquired by position data
%load position data
addpath('/MATLAB Drive/MobileSensorData')
load sensorlog.mat
```

![Loaded data](/engineering-education/how-to-collect-sensor-data-on-your-mobile-device-using-matlab/sensor_ten.png)

We then introduce the haversine formula. This formula uses the latitudinal and longitudinal positions to calculate the distance.

The latitudinal and longitudinal positions are in degrees.

It means we will need to convert them into radians before using them. Also, in this formula, the radius of the earth is considered:

```Matlab
%have haversine formula to calculate distance
latPos = deg2rad(Position.latitude);
lonPos = deg2rad(Position.longitude);
radiusEarth = 6370 ; % in Km
```

Use vectorization to calculate total distance at every time step:

```matlab
ii = 1:length(latPos)-1;
```

Since the data is large, it is first pre-processed. Once this is done, we calculate the distance:

```matlab
% Prepare vector for calculation
lat1 = latPos(ii);
lat2 = latPos(ii+1);

lon1 = lonPos(ii);
lon2 = lonPos(ii+1);

difflat = lat2-lat1;
difflon = lon2 -lon1;

aa = sin(difflat/2).^2 + cos(lat1).*cos(lat2).*sinc(difflon/2).^2;
cc = 2.*atan2(sqrt(aa), sqrt(1-aa));
dd = radiusEarth*cc;

%% Total distance
distMiles = sum(dd)*0.621;
disp(distMiles)
```

When we execute the whole program, we get the distance traveled in kilometers.

When we run the same script in the mobile Matlab, we get a similar answer as that of PC Matlab:

![Output of the distance](/engineering-education/how-to-collect-sensor-data-on-your-mobile-device-using-matlab/sensor_nine.png)

It is proof that these sensors are working and accurate. You can similarly use the remaining sensors to collect your data.

### Conclusion
Using a phone's sensor to collect data is easy. It involves activation of the sensor before beginning the collection of data.

Phone sensors are an efficient way of collecting data in the absence of other sensors.

Moreover, they provide accurate results which are reliable for any experiments.

They are also easy to access since you only need to have the mobile Matlab app, and you are ready to begin the collection.

Happy coding!

---
Peer Review Contributions by: [Monica Masae](/engineering-education/authors/monica-masae/)
