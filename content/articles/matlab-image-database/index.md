---
layout: engineering-education
status: publish
published: true
url: /matlab-image-database/
title: How to Create a Face Database using Matlab
description: This article will be an introduction to creating face databases using Matlab. We will explore about Matlab, what face databases are, where it is used, and how to create one.
author: atieno-dorine
date: 2021-05-19T00:00:00-14:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/matlab-image-database/hero.jpg
    alt: Matlab sample Image
---
Face databases are imagery data that are used when testing face processing algorithms like [Principal Component Analysis (PCA)](https://en.wikipedia.org/wiki/Principal_component_analysis) for face recognition.
<!--more-->
In this tutorial, we will learn to code in MATLAB in order to recogne a face from a database of human faces.

How the database works, depends on the type of algorithm you are going to use and the project you are implementing. For example, the PCA uses the [eigenspace](https://deepai.org/machine-learning-glossary-and-terms/eigenspace) to recognize the face from the database.

The framework of this program can be used to create the database for other many objects, not only faces. In this case, we will use the WEBCAM to take some required snapshots of the face to make the database.

### Prerequisites
To follow this tutorial along - the reader will need the following:
1. [Matlab](https://www.mathworks.com/downloads/) must be installed on your PC.
2. A webcamera must be installed.
3. Have a little knowledge in [Matlab](/engineering-education/getting-started-with-matlab/).

### Table of contents
- [How to install webcam?](#how-to-install-the-webcam)
- [Creating face database using Matlab](#creating-face-database-using-matlab)
- [Conclusion](#conclusion)

#### How to install the webcam?
1. Open the Matlab software on your pc. To download Matlab, you can refer to [here](https://www.mathworks.com/downloads/).
2. In the `Home` section, click on the `Add-Ons` drop-down arrow, then select the `Get hardware support packages`.

![Matlab dashboard](/engineering-education/matlab-image-database/windows1_1.png)

*Matlab dashboard screen*

3. On the search tab, type the package name, that is, Matlab support package for USB packages and search.
  
![Search page](/engineering-education/matlab-image-database/windows2_1.png)

*Search page*

4. Click on the `MATLAB Support Package for USB`.
5. Click on `Install` to install.

![Hardware installation page](/engineering-education/matlab-image-database/windows3_1.png)

*Hardware installation screen*

Since the package is already installed in my PC, the `Install` button is shown as `Manage`.

### Creating the face database using Matlab
The main aim of this tutorial is to create a face database of the user himself. This makes it easier to understand and carry out the various projects that require a face database.

We first initialize the webcam.

```Matlab
cam = webcam;
```

We then enter the required number of the faces `nof` to make our database. 

It is executed by the code below:

```Matlab
nof = input('enter no. of required frames:');
```

We input the number of required frames `count`, we set the `count` to be `1`.

For example, if you require 20 or 100 images, you can modify the number of required frames here:

```Matlab
count = 1;
```

We then initialize the `count` to enter the `while` loop. When the `count` is less than or equal to the number of the required frame `nof`, then the `while` loop will be executed and the snapshot is captured. 

Then, the captured image is stored into the `img` and this is passed to the `myFaceDetect` function.

This function should be defined in a subscript and then called into the main function. The description of `myFaceDetect` function is given at the end of the program.

```Matlab
while count <= nof
img = snapshot(cam);
```

The code below returns a cropped image using `myFaceDetect` function that returns the `croppedframe` and the bounding box points `bboxpoint`:

```Matlab
[croppedFrame, bboxpoint] = myFaceDetect(img);
imshow(croppedFrame)
```

Note that, in the code above we are not interested in the bounding boxes `bboxpoint` but the frame. The cropped frame will be stored in the same directory.

We will then use the `if` and `else` statements to introduce the conditions to run the program.

If the cropped frame is not empty, this means that the face is detected and we are getting a cropped frame that you can store into any of your folders.

It is preferable to create a separate folder. 

We then specify the path of that folder as shown:

```Matlab
if ~isempty(croppedFrame)
fileName = strcat('WRITE_YOUR_FOLDER_PATH',sprintf(‘%d.png’,count));
```

We then use the `imwrite` function to write the cropped frame with the corresponding file name into the directory:

```Matlab
imwrite(croppedFrame,'WRITE_YOUR_FILENAME');
msg = ['imageAcquiredNo:',num2str(count)]
disp(msg)
count = count + 1;
```

![A Sample face image](/engineering-education/matlab-image-database/image_one.png)

*A sample image of face*

The `num2str` function provides the file name. This means that since the count is starting from `1` to `n` which is the number of given frames. So, filenames will be in the form of numbers.

In the file name above, we have the file format as `.png`.

This means that we expect the name to be in the form below:
`imageDatabase1.png`, `imageDatabase2.png`, `imageDatabase3.png` until `imageDatabaseN.png`.

![A list of images](/engineering-education/matlab-image-database/database.png)

*A list of images*

If there is no face detected in the cropped frame, then it should display `no face detected` in the workspace.

Here is the code:

```Matlab
else
disp('no face detected')
```

Below is the full code of the `if` and `else` statements:

```Matlab
if ~isempty(croppedFrame)
fileName = strcat('Directory',sprintf('%d.png',count));
imwrite(croppedFrame, fileName)
msg = ['image aquired no:', num2str(count)];
disp(msg)
count = count + 1;
        
else
disp('no face detected')
end
```

The camera takes a snapshot after `0.1s` and resets the camera after the snapshot is made. 

This is regulated by the code below:

```Matlab
clf('reset')
pause(0.1)
end 
```

The `pause` time can be changed depending on the user's preference. After this, the camera object is cleared.

When you run the program, the face of the person in front of the camera is captured and stored. This is repeated until the number of the required images are obtained. The number of captured faces is displayed in the workspace.

When the person in front of the camera hides his/her face or when there is nobody in front of the camera, then a text `no face is detected` will be displayed on the workspace.

When no face is detected, the counting stops, and restarts when the face is again detected until it obtains the required samples.

`myFaceDetect` function should be defined in a different script and then called into the face database script.

This function returns a cropped image and `bboxpoint`. At this point, we focus on the `bboxpoint`.

```Matlab
function [croppedImage, bboxpoints] = myFaceDetect
%introduce the face detector object

faceDetector = vision.CascadeObjectDetector;
faceDetector.MergeThreshold = 10; %adjust to avoid false detection
%add bounding boxbox around the detect face
bboxes = faceDetector(img)

if ~isempty(bboxes)
bboxes(1,1) = bboxes(1,1)-50;
bboxes(1,2) = bboxes(1,2)-50;
bboxes(1,3) = bboxes(1,3)+100;
bboxes(1,4) = bboxes(1,4)+100;
```

In the code above, we add the value and increase the size of the bounding box in both directions. This allows the other parts of the body such as the ear to be included.

```Matlab
%crop the obtained image
croppedImage = imcrop(img,bboxes)
bboxPoints = bbox2points(bboxes(1, :))
%if face is not detected the code below is executed
else
croppedImage = [];
bboxPoints = [];
end
```

### Conclusion
Matlab is used to create an image database. This is because it has a built-in webcam. This makes it efficient when creating a database for analysis.

The image database can also be used in the deep neural system for training and validation. This can help in object recognition and other projects.

Find the full source code [here](https://github.com/atienodorine3/face_database.git).

Happy coding!

To learn more about databases your can, you can click [here](https://www.face-rec.org/databases).

---
Peer Review Contributions by: [Srishilesh P S](/engineering-education/authors/srishilesh-p-s/)