---
layout: engineering-education
status: publish
published: true
url: /reading-and-processing-android-sensor-data-using-python-with-csv-read/
title: Reading and Processing Android Sensor Data Using Python With CSV read
description: This tutorial explains how one can record data of various smartphone sensors and processes it offline using Python
author: joseph-odhiambo
date: 2022-03-09T00:00:00-09:50
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/reading-and-processing-android-sensor-data-using-python-with-csv-read/hero.png
    alt: Reading Processing Android Sensor Data Python CSV read Hero Image
---
Computers obtain data by reading from the standard input, files, and sensors, then store it in the memory for processing. Data processing could be online or offline, depending on the preferences of the user.
<!--more-->
Data processing is the conversion of raw data to meaningful information. The aim is to break down the data and represent it to the end user graphically.

This tutorial explains how one can record data of various smartphone sensors and processes it offline using Python. First, you extract the sensor's data to a CSV file. Then the CSV file is read by Python, and the extracted data is processed for display. Also, it is processed for taking wavelet transform.

### Prerequisites
To follow along with this tutorial, you need:
- To be familiar with the [Python](https://www.programiz.com/python-programming/first-program) programming language.
- To have _Pycharm_ installed on your computer. You can download it from [here](https://www.jetbrains.com/pycharm/download/).

### Various mobile sensor
![image sensors](/engineering-education/reading-and-processing-android-sensor-data-using-python-with-csv-read/image-one.png)

The image above shows the sensors that are available to android mobile phones. These sensors could detect the position, motion and even the environment on request. This assists when using many applications such as cameras, games, e.t.c. The user can also record them to use in the implementation of various applications such as:
- Control robots and machines.
- Identify metallic and non-metallic objects.
- To study the vibration of a machine part.
- To differentiate normal or faulty operation of machines based on their sound.
- To study the movement of a machine part.
- To control some activities based on mobile orientation e.t.c

### How to record mobile sensor's data
![recording mobile data](/engineering-education/reading-and-processing-android-sensor-data-using-python-with-csv-read/image-two.png)

We have two schemes in which you can capture and process data. These schemes are to record sensor data offline and record them online. At the same time, you can access the data and process it on the local PC using Python or Matlab.

Reading data and processing it offline is easy as compared to online. This is because it needs to establish a real-time communication link. The steps of reading mobile sensor and online processing is as shown below:

![Online processing](/engineering-education/reading-and-processing-android-sensor-data-using-python-with-csv-read/image-three.png)

The steps that are used to record and process data offline is shown below:

![Offline processing](/engineering-education/reading-and-processing-android-sensor-data-using-python-with-csv-read/image-four.jpeg)

In this tutorial, we will look at reading and processing data offline.

### .csv file format
You can open this data in a notepad or MS excel software. This format arranges data in columns and rows. An example of data opened in a notepad and MS excel is shown below:

![opened file](/engineering-education/reading-and-processing-android-sensor-data-using-python-with-csv-read/image-five.png)

The data in the first column shows the `time`. The second column represented by `wx` is the x-axis data. The third column represented by `wy` is the y-axis data, and finally, `wz` represents the z-axis data.

The first row in the data represents the next row. When importing this data, we should consider this line. It should be separated from the data during importation and processing.

### Third-party androids Apps to record mobile sensor data
Let us look at the third party android App that can collect sensor data. To get this App,
- Go to play store on your mobile phone.
- Search for `sensors data collector` in the search tab.
- The result here is more than one. Note that all these applications are good. We recommend `data collector` or `physics toolbox` for this article. This is because their interfaces are easy to use.
> There are two categories of applications. The first category collects data and saves them as a .csv file for offline processing, e.g. data collector. The second category collects data and sends them to a given web for online processing.
- Since we are to process our data offline, we will install the `physics toolbox`.
- Once installation is complete, open the App.

### How to use third party App
When you open physics toolbox, you get the interface shown below:

![App interface](/engineering-education/reading-and-processing-android-sensor-data-using-python-with-csv-read/image-six.png)

You notice that when you shake your mobile phone, there is variation in the waveform as shown below:

![waveform variation](/engineering-education/reading-and-processing-android-sensor-data-using-python-with-csv-read/image-seven.png)

From the left menu, you can select available sensors on your phone.

![image sensors](/engineering-education/reading-and-processing-android-sensor-data-using-python-with-csv-read/image-eight.png)

For example, select the sensor if you want to record g-force data. You then click on the `+` sign. Once you click it, there is a pop-up `data is being recorded`. You can do this for the required time. Once you stop recording, a new window opens up that allows one to save the data.

![saving data](/engineering-education/reading-and-processing-android-sensor-data-using-python-with-csv-read/image-nine.png)

Once this is done, you get a prompt to share your data through any application you wish or save it in the local storage. For our case, we store it in the local storage. After saving, you can import it to your pc for processing using a USB cable or any other preferred method. For our case, we use the accelerometer sensor.

### Python code for processing the data
For you to process the data, you need to import some libraries. These libraries are `numpy`, `matplotlib` and `csv` to read and plot your .csv file:

```python
# Python program to read .csv file

import numpy as np
import matplotlib.pyplot as plt
import csv
```

After importing the libraries, we now read the .csv file:

```python
with open('accl1.csv', 'r') as f:
data = list(csv.reader(f, delimiter=',')) #reading csv file
```

We first execute the file `open()` function. This function takes the filename `accl1.csv` and the reading attribute `r`. We then use the `csv.reader()` function. The output here is in the form of a `list`. Since the output is in a list form, it is unusable. It means that we have to convert this list into a float array.

To convert it to float array, we use the code below:

```python
data1 = np.array(data[1:], dtype=np.float64) #converting list into float array
```

We use the `np.array()` function to convert the data into an array. Then we pass the data from the second row `data[1:]` and the data type float using `np.float64`.

Now let us extract the data:

```python
# Extracting data
time = data1[:, 0]
ax = data1[:, 1]
ay = data1[:, 2]
az = data1[:, 3]
aT = data1[:, 4]
```

We are extracting this data one by one. In the converted data, iteration begins from 0. For example, to extract the time data in the first column, we give 0 as the column position `data1[:, 0]`. It continues until the fifth column.

> Note that the acceleration data has five columns. The fifth column, `aT`, is the total signal data.

Let us now plot the data. You can do this in two ways. The first way is by plotting all the data on the same axis. The second way is making separate plots using the `subplot()` function. Let us begin by plotting the data on the same axis:

```python
# Plotting all the data in the same axis
plt.figure(figsize=(20, 10))
plt.plot(time, ax, time, ay, time, az, time, aT)
plt.title('Accelerometer data', fontsize=20)
plt.xlabel('Time', fontsize=20)
plt.ylabel('Acc.values', fontsize=20)
plt.show()
```

![output in the same axis](/engineering-education/reading-and-processing-android-sensor-data-using-python-with-csv-read/image-ten.png)

When plotting in the same axis, we initiate a figure of the size 20x10 pixels using the `figsize()` function. We then plot all the extracted data on the same axis. We give the plot the `accelerometer data` as the title with the `fontsize 20`. We also have the y-label and the x-label. To show your plot, we use `plt.show()` function.

Alternatively, we can separate the plots into subplots using the code below:

```python
#separate plots using subplots
plt.figure(figsize=(20, 20))

    plt.subplot(2, 2, 1)
    plt.plot(ax, color='r')
    plt.title('a[x]', fontsize=30)

    plt.subplot(2, 2, 2)
    plt.plot(ax, color='g')
    plt.title('a[y]', fontsize=30)

    plt.subplot(2, 2, 3)
    plt.plot(ax, color='b')
    plt.title('a[z]', fontsize=30)

    plt.subplot(2, 2, 4)
    plt.plot(ax, color='k')
    plt.title('a[Total]', fontsize=30)
    plt.show()
```

The subplot function takes the number of rows, columns and the plot position as the input. For example, `plt.subplot(2, 2, 1)` means we have four plots. 

These plots are arranged in the form of a table of two rows and two columns. Our plot is in the first position. `plt.plot()` function takes the data to be plotted and the plot colour as the arguments. To display the plot, we use the `plt.show()` function.

You can further analyze and get the approximated and detailed coefficients of the data.

![subplots of the data](/engineering-education/reading-and-processing-android-sensor-data-using-python-with-csv-read/image-eleven.png)

You can find the complete source code for this implementation [here](https://github.com/josephodhis/python-project).

### Conclusion
Collecting data using an android mobile sensor is widely applicable in the data analytics fields. For example, you can use the sensors' collected data to determine the recommended settings for a specific user based on data analytics results from the machine learning models on the phone.

Happy coding!

---
Peer Review Contributions by: [Odhiambo Paul](/engineering-education/authors/odhiambo-paul/)
