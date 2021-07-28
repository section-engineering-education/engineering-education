---
layout: engineering-education
status: publish
published: true
url: /face-recognition-using-principal-component-analysis-in-matlab/
title: Face Recognition using Principal Component Analysis (PCA)
description: This article takes the reader through achieving face recognition in matlab using face recognition principle component analysis. Principal Component Analysis (PCA) is an unsupervised, non-parametric statistical technique primarily used for dimensionality reduction in machine learning.
author: linet-achieng
date: 2021-07-28T00:00:00-11:00
topics: [Machine Learning]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/face-recognition-using-principal-component-analysis-in-matlab/hero.jpg
    alt: Matlab GUI image example
---
Principal Component Analysis (PCA) is an unsupervised, non-parametric statistical technique primarily used for dimensionality reduction in machine learning. PCA is a way of reducing the dimensions of a large dataset by transforming it into a smaller dataset, but ensuring that the smaller dataset contains more information than the larger dataset.
<!--more-->
By reducing the dataset, we are also reducing the accuracy. However, PCA works on the principle of trading little accuracy for simplicity. This is because smaller datasets are easier to explore and visualize, thus making data analysis easier and faster for machine learning algorithms.

Eigenvectors and eigenvalues are the linear algebra concepts that are used to compute the covariance matrix to determine the principal component of the data. Face recognition is the process of identifying an individual using their face.

Matlab has numerous built-in functions that help calculate the principal components. In this article, we will see how we can use it to recognize a face.

### Dimensionality reduction using PCA
Dimensionality reduction involves the reduction of large size images to small size PCA representation in the PCA space. PCA space is the dimensional space of the reduced image.

In the spatial domain (standard size), the images are large, that is, `200 x 180` pixels. This is reduced to one dimension of `1 x 50` pixels when projected to PCA in the PCA workspace.

### Face image database
In this exercise, we use the `face94` database for recognition. Click [here](https://cmp.felk.cvut.cz/~spacelib/faces/faces94.html) to get this database. The database has faces of 153 individuals. The image resolution of the images is `180 x 200` pixels. It has directories such as female folder (20), male folder (113), and male staff (20)

### Database preparation for training and testing
For training, a total of 30 individuals are selected and 10 images per person are considered. Therefore, a total of 300 images are taken for training. First, images of size `MxN` are re-shaped to the one-dimensional vector of size `1xMN`. The size of the images in the database is `180 x 200` pixels.

This will create a huge one-dimensional vector of size `1 x 36000` pixels which creates a memory allocation problem in Matlab while computing covariance matrix. Therefore, the size of each image will be reduced by half i.e `90 x 100` pixels.

For testing, we take 10 images from the remaining individuals. Since we have 30 remaining individuals, we are going to have 300 images for testing. We then create a folder containing the images that will be used for training and those that will be used for testing.

### Matlab programs
We need to create two folders for training (trainDB) and testing (testDB). All images in the trainDB should be named as `1.jpg`, `2.jpg`, `3.jpg` ... `800.jpg`. Use a software such as IrfanView, format factory, or any other to rename the images. No need to rename those that are for testing.

> Note that Matlab's script files for training and testing should be saved in the trainDB folder and set the path of the trainDB as Matlab's current directory for running the program.

### Matlab program for training
We first input the number of images for training, which is 300 and enter the dominant eigenvalues to keep which is 50. The dominant eigenvalues to keep is the new dimensions of the images after passing through the PCA space.

```Matlab
n = input('enter the no. of images for training');
L = input('enter the number of dominant eigen values to keep');
```

We then specify the dimensions. As we said earlier, we will reduce the dimensions to half, that is, `90 x 100`, then initialize this data matrix which will be the product of image dimensions and the number of training images which is `300 x 900`. 

This is done as shown below:

```Matlab
M = 100;   N = 90;      % Required image dimensions
X = zeros(n, (m*n));   % Initialization of data matrix
T = zeros(n,L);         %initializing transformed data set(T) in pca space(300*50)
```

We then use the loop to read all the images in the training folder and convert them to grayscale images since the images are coloured. Resize the images and then reshape them into a one-dimensional vector.

This is done by a for loop as shown:

```Matlab
for count = 1:n
I = imread(sprintf('%d.jpg', count));       %Reading images
if size(I, 3)> 1          %This loop checks for only the colored images and convert them to gray scale
I = rgb2gray(I);
end
I = imresize(I,[1,M*N]);           %reshaping images to 1-D vectors.
end
```

We then copy the database for further use.

```Matlab
Xb = X;             %Copy database for further use
```

We then find the mean for all the images and use a for loop to subtract the mean from every 10 images. This subtraction is done to shift the original image from the old `x,y` coordinate system to the new `u,v` axis system. 

`u,v` system is a system similar to the `x,y` system. The difference is the change in the naming. U is the x-axis and V is the y-axis in this case.

```Matlab
m = mean(X);    % mean of all images
for i = 1:n
X(i,:) = X(i,:)-m;      %Subtracting mean from each 1-D image
end
```

We then find the covariance matrix. A matrix is used to describe the relationship between different dimensions. In a more easy-to-understand way, the covariance matrix is used to define the relationship in the entire dimensions as the relationships between every two `ranuik`; dom variables.

```Matlab
Q = (X'*X)/(n-1);        %Finding covariance matrix
```

We then find the eigenvalues and eigenvectors of the covariance matrix (Q) using the `eig` command.

```Matlab
[Evecam, Evalm] = eig(Q);  %Getting eigen values and eigen vectors of COV matrix[Q];
```

The eigenvector will be stored in `evacam` and eigenvalues on the `evalm`. We then extract the eigenvalues using the `diag` function and all these values stored in `eval`

```Matlab
Eval = diag(Evalm); %Extracting all eigen values
```

The extracted eigenvalues are then sorted to get the largest `eval` values. The sorted `eval` values are stored in `evalSorted` and the corresponding index in the `index`.

This is done by:

```Matlab
[Evalsorted, Index] = sort(Eval, 'descend');  %sorting Eigen values
```

We then reshuffle the eigenvectors `evacam`. This is to change the eigenvectors into a column vector and arranged them in descending order. After reshuffling, we compute the eigenvectors to have a reduced eigenvector. This means that in the sorted eigenvector, we consider the first `L` vectors. `L` was 50 as shown in the code below.

```Matlab
Evecsorted = Evecam(:, Index);
Ppca = Evecsorted(:, 1:L);        %Reduced transformation matrix [Ppca]
```

We then use the for loop to project each image to the PCA space. Each image from the spatial domain and the mean is subtracted then multiplied by the transformation matrix (ppca) and stored back to the matrix T, which is the transformed reduced matrix. This means that each image is projected to the PCA space and reduced to the size `1 x L` which is `1 x 50`. So, the huge `1 x 9000` is reduced to `1 x 50`.

The code is as shown.

```Matlab
for i = 1:n
    T(i,:) = (Xb(i,:)-m)*Ppca;    %projecting each image to pca space
end
```

When we run the whole code, in the command window, there is a command asking the user to input the number of images for training (300) and then the dominant eigenvalues (50). After entering all these values, the training begins. This training can be seen at the lower left part of Matlab's window as it is indicated busy as shown in the image. 

![This shows that matlab is busy](/engineering-education/face-recognition-using-principal-component-analysis-in-matlab/image2.png)

We will select some variables from training and store them for use in testing. This will help avoid re-running the training program again and again. This is done as follows.

- In the workspace, select all the variables and then deselect variables `m`, `M`, `n`, `N` and `ppca`.
- Delete all other variables and then click on the save workspace to save this data in the trainDB folder as `pcadb`.

### Matlab's code for testing
Before testing, we must load the variables that we saved from the training.

```Matlab
%first load required variables in workspace for testing
clc;
load pcadb;       %loading pcadb.mat file
```

We then select our test image from the database and read it using the `imread` function.

```Matlab
[filename, pathname] = uigetfile('*.*', 'Select the Input image');
filewithpath = strcat(pathname, filename);
img = imread(filewithpath);
```

We then make a copy of the image, converting it into grayscale, resizing and reshaping the images.

```Matlab
imgo = img;
img = rgb2gray(img);
img = imresize(img,[1,M*N]);
```

We then project the query image (input image) to PCA space. This means we subtract the mean image `m` from `img` and multiplying this result with transformation matrix `ppca`, `imgpca` is the PCA projected image:

```Matlab
imgpca = (double(img)-m)*Ppca;     %projecting query image to PCA space
```

We then initialize the difference array and use a `for` loop to find the distance difference.

```Matlab
distarray = zeros(n,1);    %Initialize difference array

for i = 1:n
distarray(i) = sum(abs(T(i,:)-imgpca));  %Finding L1 distance
end
```

From the distance found above, we compute the minimum distance. Minimum distance means the maximum matching. The corresponding index is stored in the `indx` and the resulting image on the `result`. We then search the current directory to find the image with the same name.

```Matlab
[result, indx] = min(distarray);    %Getting best match
resulting = imread(sprintf('%d.jpg', indx));   %Getting best matched image
```

This `result` is the output image. We then plot the images.

```Matlab
%plotting images
subplot(121)
imshow(imgo);
title('Query Face');
subplot(122)
imshow(resultimg);
title('Recognized Face');
```

When we run this program, we are asked to choose our image from the database. We should select any image from the testDB. After selecting the image, it is recognized as shown.

![identified image](/engineering-education/face-recognition-using-principal-component-analysis-in-matlab/image1.png)

### Conclusion
Matlab provides a suitable toolbox for easy recognition of different faces. This is possible by the use of various machine learning algorithms. 

Apart from this, Matlab has numerous in-built functions that make all the activities (training and testing process) easy to carry out.

Happy coding!

---
Peer Review Contributions by: [Peter Kayere](/engineering-education/authors/peter-kayere/)
