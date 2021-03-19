### FACE DETECTION IN AN IMAGE USING VIOLA-JONES ALGORITHM IN MATLAB
### Introduction

Face detection is the ability to distinguish faces from the non-faces object in an image or a video. Viola-Jones algorithm is an object recognition framework that allows the detection of human faces. Despite being an outdated framework, the Viola-Jones algorithm is quite powerful, robust, and faster, therefore it is found exceptionally notable in real-time face detection. In this article, we will look at how to use the Viola-Jones algorithm to detect faces in real-time.


### Prerequisites
Computer vision toolbox.

### Need for face detection
There are several projects which require human faces as the primary input for their implementation. The projects include;
1.face recognition
2.Face recognition based security system and attendance system
3.Facial expression recognition
4.Mood analysis based on facial expression and many more

### Viola-Jones algorithm
Developed by Paul Viola and Michael Jones in 2001. It is an object recognition framework that allows the detection of human faces.

The algorithm has four stages
1.Haar-like features selection.
2.Creating an integral image.
3.Adaboost training
4.Cascading classifiers
MATLAB has the `vision.CascadeObjectDetector` which has the viola-jones algorithm to detect faces/objects and it is found in the computer toolbox.
The `cascadeObjectDetector` can be used to detect people’s faces, nose, eyes, mouth, and upper body.
The  `vision.CascadeObjectDetector` system object comes with several pre-trained classifiers for detecting frontal faces, profile faces, noses, eyes, and upper body.

However, these classifiers are not always sufficient for a particular application. The computer vision toolbox provides the facility to train the custom classifier on an image database.
How to test if computer vision toolbox is installed in your computer.
```matlab
>> v = ver;
>> setdiff({v.name},'MATLAB')'
```
when this code is executed, it shows all the installed Matlab toolboxes. if it doesn't have the computer vision toolbox;
- Click on the `adds-ons` dropdown menu and select the `get more apps`. A new window is opened in your browser.
- Click on the search box and write `computer vision toolbox`
- once the search is done, select the `Computer Vision Toolbox Interface for Open CV in MATLAB` and click on the download button.
- once the download is done, install the package and this requires that you `login` into your mathwork account. if you don't have one you click on the `create an account` button.
- follow the steps to install the package.
To detect facial features or upper body in an image,
1.Create the  `vision.CascadeObjectDetector` object and set it’s properties.
2.Call the object with the argument as if it were a function

The image that will be used to detect faces can either be read directly or choose from the files depending on the user preference. When you add the image directly by using the `imshow` command, it will display the detected face.
```Matlab
Imshow(‘C:\Users\paulj\Pictures\New folder\webinar.jpg’)
```
 At the time you don’t need to add the image directly since there could be many images to be used for detection. In this case, you choose the image from the file that they are stored. In that case, you use the code below;
```Matlab
[filename,filepath] = uigetfile('*.*','select an image');
```

you read the path of the image and then you read the Image using the `imshow` command
```Matlab
Filewithpath = strcat(filepath,filename)
Img = imread(filewithpath)
```
The image that we have defined will be saved in the variable `Img`.
Define the face Detector object.
```Matlab
faceDetector =  vision.CascadeObjectDetector
``` 
We then use one of the attributes from the  `vision.CascadeObjectDetector`, that Is, `MergeThreshold`. This is used for better detection and accuracy.
```Matlab
faceDetector.MergeThreshold = 4;
```
Four is the default value In this case. `MergeThreshold` can be adjusted depending on the level of accuracy required. The accuracy is higher at the lower values and lowers at the higher value, that is, the face detection accuracy is higher at 3 than it is at 8. Note that the `MergeThreshold` is an integer.
```matlab
Boundingboxes = faceDetector(Img)
```
When we execute the code above, it returns an m-by-4 matrix,bounding-box. This determines the M bounding boxes containing the detected objects. The detector performs multiscale face detection on the input image, `Img`.
We then introduce conditions for detection. The first condition is when the face is detected. When the face is detected in an image, it should return a bounding box around the detected face. We then insert annotation with the name face in a rectangle.
The line width is the thickness of the bounding boxes and it can be changed to any value. Note that the values are in pixel so it determines the thickness of the bounding box in pixel. We then display the image using the `imshow` command. here is the code.

```matlab
if ~isempty(bboxes)
    Imf = insertObjectAnnotation(img,'rectangular',bboxes,'Faces','linewidth',30);
    imshow(Imf)
    title('detected faces')
```

The second condition if the face is not detected, we insert text at the `location [0 0]` which is the `x-axis`, and the `y-axis`, with the label ‘no faces detected’. you can change the font-size and opacity of the box of this text and display the image. Here is the code;

```matlab
else
    position = [0 0];
    label='no face detected';
    Imgn = insertText(Img,position,label, 'fontsize',25,'BoxOpacity',1);
    imshow(Imgn)
end
```

this is the final code;
`script`
```Matlab
Img = imread('C:\Users\paulj\Pictures\New folder\index.jpg');
faceDetector = vision.CascadeObjectDetector;
faceDetector.MergeThreshold = 4;
bboxes = faceDetector(img);
if ~isempty(bboxes)
    Imf = insertObjectAnnotation(Img,'rectangle',boundingboxes,'Faces','linewidth',3);
    imshow(Imf)
    title('detected faces')
else
    position = [0 0];
    label='no face detected';
    imgn = insertText(img,position,label, 'fontsize',25,'BoxOpacity',1);
    imshow(imgn)
end
```
when we run the program, the following image is displayed on our figure window.
###figure

when we change the image and use a different image that has no face, the following is displayed on our figure window
### figure
This code can also be used to detect eyes, mouth, and nose. You only need to change the names, that is where there is a face and you want to detect the nose in the code. You need to vary the MergeThreshold for accuracy.

### Conclusion
Viola-jones algorithm is the best algorithm for face object detection in real-time. It is accurate and fast and that makes it efficient for use in the detection process. 
