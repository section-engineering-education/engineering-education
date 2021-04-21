### How to create face database using matlab
### Introduction
Face databases are imagery data that are used for testing face processing algorithms. The algorithm includes principal component analysis(PCA) for face recognition. This program recognizes a face from a database of human faces. This is an example project where we can use the database we are creating.
How the database works depends on the type of algorithm you are going to use and the project you are implementing. For example, the PCA uses the eigenspace to recognize the face in the database.
The framework of this program can be used to create the database for other many objects. In this case, we will use the WEBCAM to take some required snapshots of the face to make the database.

### Prerequisites
1. [Matlab](https://www.mathworks.com/downloads/) installed in your pc.
2. Installed webcam.
3. Knowledge in [Matlab](https://www.section.io/engineering-education/getting-started-with-matlab/)

#### How to install the webcam
- Open the Matlab software on your pc.
- In the home section click on the add-on drop-down arrow then select the 'get hardware support packages'.

![this is how the window appears](/engineering-education/matlab-image-database/windows1_1.png)
- On the search tab, type the package name, that is, Matlab support package for USB packages and search.
  
![this is how the window appears](/engineering-education/matlab-image-database/windows2_1.png)
- Click on the Matlab support package for USB packages.
- Click on the 'install' to install.
![this is how the window appears](/engineering-education/matlab-image-database/windows3_1.png)

For my case, the install part is changed to manage because the package is already installed in my software.

### Matlab code for creation of the face database
The main aim of this tutorial is to create a database that is familiar to the user. This is because the database is created by the user himself. This makes it easier to carry out the various projects that require a face database.

We first initialize the webcam.

```Matlab
cam = webcam;
```
We then enter the required number of the faces to make our database. It is executed by the code below:

```Matlab
nof = input('enter no. of required frames:');
```
We input the number of required frames, for example, if you require 100 or 20 images, you can enter the number of required frames here;

```Matlab
count = 1;
```
We then initialize the count to enter in the while loop. When the count is less than or equal to the number of the required frame, then the while loop will be executed and the snapshot is captured. The captured image is stored into the `img` and this is passed to the `myFaceDetect` function.
This function should be defined in a subscript and then called into the main function. The description of `myFaceDetect` function is given at the end of the program.

```Matlab
while count <=nof
img = snapshot(cam);
```
The code returns a cropped image. This means that the function for the cropped image will be used here.

```Matlab 
[croppedFrame, bboxpoint] = myFaceDetect(img);
imshow(croppedFrame)
```
Note that, in the code above we are not interested in the bounding boxes but the frame. The cropped frame will be stored in the same directory.
We will then use the `if` and `else` statements to introduce the conditions for running the program.
If the cropped frame is not empty, the face is detected and we are getting a craft frame, then you can store this frame into any of your folders. It is preferable to create a face database folder in your system for easy identification. We then give the path of the folder in the directory.

```Matlab
if ~isempty(croppedFrame)
fileName = strcat(‘directory’,sprintf(‘%d.png’,count));
```
We then use the `imwrite` function to write the cropped frame with the filename which is provided in the loop.

```Matlab
imwrite(croppedFrame,’fileName’);
msg = [‘imageAcquiredNo:’,num2str(count)]
disp(msg)
count = count + 1;
```

![this is a sample image](/engineering-education/matlab-image-database/image_one.png)

The `num2str` function provides the filename. This means that since the count is starting from one up to ‘n’ which is the no. of given frames, so filenames will be in the form of numbers.
In the filename above, we gave the file format to the `.png`. This means that we expect the name to be in the form below;
imageDatabase1.png
imageDatabase2.png
imageDatabase3.png until
imageDatabasen.png  

![this is how the image database appears](/engineering-education/matlab-image-database/database.png)

If there is no face detected in the cropped frame, then it should display `no face detected` in the workspace. Here is the code;

```Matlab
else
disp(‘no face detected’)
```
Below is the full code of the `if` and `else` statement.

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
The camera makes a snapshot after 0.1s and resets the camera after the snapshot is made. This is regulated by the code below;

```Matlab 
clf(‘reset’)
pause(0.1)
end 
```
The pause time can be changed depending on the user's preference.
After this, the camera object is cleared.
When you run the program, the face of the person in front of the camera is captured and stored. This is repeated until the number of the required images are obtained. The number of captured faces is displayed in the workspace.
When the person in front of the camera hides his/her face or when there is nobody in front of the camera, then a text `no face is detected` is displayed on the workspace. When no face is detected, the counting stops, and continuous immediately face is detected until it obtains the required samples.

`myFaceDetect` function should be defined in a different script and then called into the face database script. 
The function returns a cropped image and bboxpoints but at this point, we major on the bboxpoints.

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

In the code above we add the value and increase the size of the bounding box in both directions. This allows the other parts of the body such as the ear to be included. 

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
Matlab is used to create an image database. This is because it has a built-in webcam. This makes it efficient for creating a database for analysis. The image database can also be used in the deep neural system for training and validation. This can help in object recognition and other projects. Find the full source code [here](https://github.com/atienodorine3/face_database.git).

To learn more about databases your can, you can click [here](https://www.face-rec.org/databases).
