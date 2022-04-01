---
layout: engineering-education
status: publish
published: true
url: /building-qr-code-authentication-system/
title: Building a QR Code Scanner User Authentication System in Computer Vision 
description: This tutorial aims to guide the reader on how to build a Quick Response Code scanner system in Computer Vision used for user identification and authentication.
author: atonya-dennis
date: 2022-03-24T00:00:00-15:20
topics: [Languages]
excerpt_separator: <!--more-->
images:
  - url: /engineering-education/building-qr-code-authentication-system/hero.jpg
    alt: QR Code Image
---
Computer vision has led to the growth and usage of Quick Response (QR) codes in todays real-life applications. The rapid production of smartphones capable of decoding and accessing encoded messages has made QR Codes a useful tool for any sector looking to engage mobile users through printed materials.
<!--more-->
To help the reader understand this concept, this article will cover many things concerning QR Codes. Their practical application, how to scan and decode the codes, and how to use QR Codes in the development of a user authentication system are all described.

### Table of contents
- [Prerequisites](#prerequisites)
- [Introduction](#introduction)
- [Scanning QR Codes](#scanning-qr-codes)
- [Real-Time QR Code Decoding](#real-time-qr-code-decoding)
- [User Authentication System](#user-authentication-system)
- [Conclusion](#conclusion)
- [Further reading](#further-reading)

### Prerequisites
To follow along with this tutorial:
- You should have a basic understanding of [Python](https://www.python.org/) and its related concepts.
- You should know about [computer vision](https://en.wikipedia.org/wiki/Computer_vision) and the [OpenCV](https://en.wikipedia.org/wiki/OpenCV) library.
- You should know how to use [PyCharm](https://www.jetbrains.com/pycharm/download/#section=windows) or any other IDE when working with Python.

### Introduction
The **Quick Response Code** (QR Code) is a type of two-dimensional barcode mainly used for keeping track of items and storing data in pixel form. This data can be decoded to expose the encoded information. It efficiently encodes a large amount of data such as numbers, letters, and characters and can be read much faster in both horizontal and vertical positions than existing methods. This makes them more widely used than the conventional bar codes since the barcodes store limited data and can only be scanned horizontally.

QR codes consist of various regions that have specific importance:
- Finder Pattern: This pattern is found in the symbol's upper left, upper right, and lower left corners. They are easily detected in all directions and ease the location and identification of the QR Code size, position, and inclination.
- Alignment Pattern: It comprises a single central module, light (3x3), and dark (5x5) modules, and acts as a correction pattern that corrects the distorted QR Code.
- Timing Pattern: These patterns are arranged in both horizontal and vertical positions to identify the central coordinate of each data cell and correct the central coordinate at a time of distortion.
- Quiet Zone: This is a region free of all markings. This margin space is needed for the reading of the QR Code, while the data will be stored in the data area of the symbol.
- Encoding Region (Cell): Data, parity modules, and decoding information are all stored in this area.

![QR Code Structure](/engineering-education/building-qr-code-authentication-system/qr-structure.jpg)

*[Image source: ResearchGate](https://www.researchgate.net/profile/Sunday-Dugga/publication/268575546/figure/fig4/AS:668575274639371@1536412175189/Structure-of-a-QR-Code-3.png)*

With the popularity of QR Codes, they have found their applications in various real-world fields, such as:
- Inventory tracking and management systems.
- Authentication systems for user identification.
- Payment information can be shared across the retail and manufacturing industries by sharing payment information.
- Sharing photos, links, media, phone numbers.

### Scanning QR Codes
To scan the QR codes, we will use the OpenCV library to read the input images and video streams and display the outputs. To decode the codes, we will use the `pyzbar` and `zbar` libraries. We will also need the `NumPy` library to work with multi-dimensional arrays and matrices.

To use the libraries, we will import them using the commands below:

```python
import numpy as np
from pyzbar.pyzbar import decode
import cv2
```

To read the [QR Code](https://github.com/dentonya/QR_Code-Authentication-System/blob/master/qrcodes/qr_code_txt.png) image, we will use the cv2 library as shown below:

```python
image = cv2.imread("qrcodes/qr_code_txt.png")
coded_infor = decode(image)
print(coded_infor)
```

Output:

```bash
[Decoded(data=b'just a lot of plain text', type='QRCODE', rect=Rect(left=22, top=22, width=74, height=74), 
polygon=[Point(x=22, y=22), Point(x=22, y=96), Point(x=96, y=96), Point(x=96, y=22)])]
```

From the output, information from the image is displayed in various parts discussed below:
- Data: This section displays the data encoded in the QR Code.
- Type: This part gives more information about the type of the code, either a barcode or a QR code.
- Rect - It specifies the rectangular dimensions of the QR image.
- Polygon: It specifies the polygon corner points that encircles the QR picture used for drawing the bounding boxes.

To display only the encoded text, we will use loops that will detect all the codes on the image and display the needed information.

```python
for barcode in decode(image):
    print(barcode.data) #in bytes
    encoded_text = barcode.data.decode('utf-8') #obtain only the str text
    print(encoded_text)
    print(barcode.rect)
```

Output:

```bash
'just a lot of plain text'
just a lot of plain text
```

Great! Now that we have successfully decoded the QR code message from an input image, let us try to decode it in real-time using webcam feed input.

### Real-Time QR Code Decoding
In real life, QR code scanners require users to decode the codes in real-time. To do this, we will start by importing all the libraries as described above. Then we will enable the webcam camera for the input and create a secondary output window using the code below.

```python
#decoding in real-time
#scanning QR code from camera feed
video = cv2.VideoCapture(0)
video.set(3,640) #creating  output window
video.set(4,740)
```

To find out if they can be granted access or not, we will check if the decoded text is present in the text file. If there is a match, a green-colored bounding box will be displayed with the text "Access Granted." If there is no match, a red-colored bounding box will be displayed with the message "Denied Access".

```python
while True:
    success, image = video.read()
    for barcode in decode(image):
        encoded_text = barcode.data.decode('utf-8')
        print(encoded_text)
        polygon_points = np.array([barcode.polygon],np.int32)
        polygon_points =polygon_points.reshape(-1,1,2)
        rect_points = barcode.rect
        cv2.polylines(image,[polygon_points],True,(255,255,0),5)
        cv2.putText(image,encoded_text,(rect_points[0],rect_points[1]),cv2.FONT_HERSHEY_DUPLEX,0.8,(255,255,0),2)
    cv2.imshow("Video",image)
    cv2.waitKey(1)
```

On testing it out on real-life objects, sample outputs are displayed as shown below for both QR and Barcodes:

![Real Time Output](/engineering-education/building-qr-code-authentication-system/real-time-qr-output.jpg)

![Real Time Output](/engineering-education/building-qr-code-authentication-system/barcode-output.jpg)

### User Authentication System
Most employees in various companies and students in schools get access to specific areas by scanning their identification cards or special entry cards to grant them access. Now, let us implement that by building an authentication and identification system to detect authorized and unauthorized personnel. 

We will start by importing the needed libraries and setting up the webcam camera for video capture.

```python
import numpy as np
from pyzbar.pyzbar import decode
import cv2

# setting up camera feed
video = cv2.VideoCapture(0)
video.set(3, 640)
video.set(4, 740)
``` 

To grant access to various people, we will have a text file containing a list of all the decoded texts for all the authorized personnel. We will use the code below to open and access the file content.

```python
with open('authorised_employee.txt', 'r') as file:
    authorised_list = file.read().strip()
    print(authorised_list)
``` 
![Text Output](/engineering-education/building-qr-code-authentication-system/real-time-qr-output.jpg)

To be sure, we can run the code to encode QR Codes in real-time to display each decoded text for the QR Codes corresponding to the list in the text document. The output below would be produced.

![Output](/engineering-education/building-qr-code-authentication-system/auth-output.jpg)

To find out if they can be granted access or not, we will use the code below to check if the decoded text is present in the text file. If there is a match, a green-colored bounding box will be displayed with the text "Access Granted". If there is no match, a red-colored bounding box will be displayed with the message "Denied Access".

```python
while True:
    success, image = video.read()
    for barcode in decode(image):
        qr_text = barcode.data.decode('utf-8')
        qr_text = str(qr_text)
        if qr_text not in authorised_list:
            color = (0, 0, 255)
            display_message = "Denied Access"
        else:
            color = (0, 255, 0)
            display_message = "Access Granted"
        polygon_points = np.array([barcode.polygon], np.int32)
        polygon_points = polygon_points.reshape(-1, 1, 2)
        rect_points = barcode.rect
        cv2.polylines(image, [polygon_points], True, color, 3)
        cv2.putText(image, display_message, (rect_points[0], rect_points[1]), cv2.FONT_HERSHEY_PLAIN, 0.9, color, 2)
    cv2.imshow("Video", image)
    cv2.waitKey(1)
```
![Output](/engineering-education/building-qr-code-authentication-system/authorised-access.jpg)

From the output above, we can see that our model has worked perfectly, scanning all the QR Codes and granting access to the authorized users. The complete code can be found on [GitHub](https://github.com/dentonya/QR_Code-Authentication-System).

### Conclusion
Computer vision has opened up a lot of possibilities with the use of QR Codes. It is clear that they play a significant role in real life through data encoding, high data storage capacity, their ability to provide secured access to information. They are increasingly present in products, advertisements, retail industries as well as in authentication and identification systems. 

To summarize, we explored QR Codes and their real-life applications, looked at how to scan and decode the codes using the OpenCV library and built an authentication system using the concept of QR Codes.

Happy coding!

### Further reading
- [How to generate and read QR Codes in Python](https://www.thepythoncode.com/article/generate-read-qr-code-python)
- [QR Codes](https://en.wikipedia.org/wiki/QR_code).
- [Building QR Codes in Python](https://towardsdatascience.com/building-a-barcode-qr-code-reader-using-python-360e22dfb6e5)
  
---
Peer Review Contributions by: [Willies Ogola](/engineering-education/authors/willies-ogola/)
