### FACE RECOGNITION USING PRINCIPAL COMPONENT ANALYSIS(PCA)
### Introduction
Principal Component Analysis (PCA) is an unsupervised, non-parametric statistical technique primarily used for dimensionality reduction in machine learning. PCA is a way of reducing the dimensions of a large dataset by transforming the large dataset into a smaller dataset but ensuring that the smaller dataset contains more information than the large dataset. By reducing the dataset, we are increasing reducing the accuracy but PCA works on the principle of trading little accuracy fr simplicity. This is because smaller data are easier to explore and visualize making the analysis of data easier and faster for machine learning algorithms.
Eigenvectors and eigenvalues are the linear algebra concept that is used to compute from the covariance matrix to determine the principal component of the data. Face recognition is the process of identifying an individual using their face. Matlab has numerous built-in functions that help calculate the principal components. In this article, we will see how we can use it to recognize the face.

### Dimensionality reduction using PCA
Dimensionality reduction involves the reduction of large size images to small size PCA representation in the PCA space. PCA space is the dimensional space of the reduced image. In the spatial domain(standard size), the images are large, that is, 200 x 180 pixels. This is reduced to one dimension of 1 x 50 pixels when projected to PCA in the PCA workspace.

### Face Image Database
In this exercise, we use the 'face94' database for recognition. To get this database, you can check it [here](https://cmp.felk.cvut.cz/~spacelib/faces/faces94.html). The database has faces of 153 individuals and there are a total of 153 individual's faces. The image resolution of the images is 180 x 200pixels. It has directories such as female folder(20), male folder(113), and male staff(20)

### Database preparation for training and testing
For training, a total of 30 individuals are selected and 10images per person is considered, therefore, a total of 30 images are taken for training. First, images of size MxN are re-shaped to the one-dimensional vector of size 1xMN. The size of the images in the database is 180x200pixels. This will create a huge one-dimensional vector of size 1x36000pixels and this will create a memory allocation problem in Matlab while computing covariance matrix, therefore, the size of each image is reduced to half(90x100pixels).
For testing, we take the remaining individuals and 10images of each are considered. The remaining 30 individuals and we take 10images of each will result in 300 images for testing. We then create a folder containing the images that will be used for testing and those that will be used for testing.

### Matlab programs 
We create two folders for training(training DB) and testing(testing DB). All images in the trainDB should be named as 1.jpg, 2.jpg, 3.jpg...800.jpg using software such as IrfanView, format factory or any other to rename the images. Those for testing, no need for renaming.
> Note that Matlab's script files for training and testing should be saved in the trainDB folder and set the path of the trainDB as Matlab's current directory for running the program.

### Matlab program for training
We first input the number of images for training which is 300 and enter the dominant eigenvalues to keep which is 50. The dominant eigenvalues to keep is the new dimensions of the images after passing through the PCA space.
```Matlab

```
We then specify the dimensions. As we said earlier, we will reduce the dimensions to half, that is, 90 x 100 then initialize this data matrix which will be the product of image dimensions and the number of training images which is 300 x 900. This is done as follows;
```Matlab

```
We then use the loop to read all the images in the training folder and convert them to grayscale images since the images are coloured. Resize the images and then reshape them into a one-dimensional vector. This is done by the for loop as shown.
```Matlab

```
We then copy the database for further use.
```Matlab

```
We then find the mean for all the images and use for loop to subtract the mean from every 10 images. This subtraction is just for shifting the original image from the old x,y coordinate system to the new u,v axis system. U,v system is a system similar to the x,y system. The difference is the change in the naming. U is the x-axis and the v is the y-axis in this case.
```Matlab

```
We then find the covariance matrix. a matrix is used to describe the relationship between different dimensions. In a more easy-to-understand way, the covariance matrix is to define the relationship in the entire dimensions as the relationships between every two random variables. 
```Matlab

```
We then find the eigenvalues and eigenvectors of the covariance matrix(Q) using the `eig` command.
```Matlab

```
The eigenvector will be stored in `evacm` and eigenvalues on the `evalm`. We then extract the eigenvalues using the `diag` function and all these values stored in `eval`
```Matlab

```
The extracted eigenvalues are then sorted to get the largest `eval` values. The sorted eval values are stored in `evalSorted` and the corresponding index in the `index`. This done by;
```Matlab

```
We then reshuffle the eigenvectors `evacm`. This is to change the eigenvectors into a column vector and arranged them in descending order. After reshuffling, we compute the eigenvectors to have a reduced eigenvector. This means that in the sorted eigenvector, we consider the first `L` vectors(`L` was 50) as shown in the code below.
```Matlab

```
We then use the for loop to project each image to the PCA space. Each image from the spatial domain and the mean is subtracted then multiplied by the transformation matrix(ppca) and storing back to the matrix T, which is the transformed reduced matrix. This means that each image is projected to the PCA space and reduced to the size 1 x L which is 1 x 50. So the huge 1 x 9000 is reduced to 1 x 50. The code is as shown.
```Matlab

```
When we run the whole code, in the command window, there is a command asking the user to input the number of images for training(300) and then the dominant eigenvalues(50). After inputting all these values, the training begins. This training can be seen at the lowest left part of Matlab's window as it is indicated busy. This means Matlab is doing something which is training.

image 1
From the training, we will select some variables and store them for use in testing. This will help to avoid re-running the training program again and again. This is done as follows.
- In the workspace, select all the variables and then deselect variables `m`, `M`, `n`, `N` and ``ppca`.
- Delete all other variables and then click on the save workspace to save these data in the trainDB folder as pcadb.

### Matlab's code for testing
Before testing, we will load the variables that we saved from the training.
```Matlab

```
We then select our test image from the database and read it using the `imread` function.
```Matlab

```
We then make a copy of the image, converting it into grayscale, resizing and reshaping the images.
```Matlab

```
We then project the query image(input image) to PCA space. This means we subtract the mean image `m` from `img` and multiplying this result with transformation matrix `ppca`, `imgpca` is the PCA projected image;
```Matlab

```
We then initialize the difference array and use the `for` loop to find the distance difference.
```Matlab

```
From the distance found above, we compute the minimum distance. Minimum distance means the maximum matching. The corresponding index is stored in the `indx` and the resulting image on the `result`. With the same name, we are searching the current directory to find the image.
```Matlab

```
This `result` is the output image. We then plot the images.
```Matlab

```
When we run this program, we are asked to choose our image from the database. We should choose the image from the testDb and select any image.

image 2

We can try to deform the image faces to see the robustness of the program. You can use any software such as paint to make a change on the faces.

image 3(deformed image)

When we use the above image as our input and then run the program, a matching image is still recognised. This shows the efficiency of the program.

### Conclusion
Matlab provides a toolbox for easy recognition of the different faces. This is possible by the use of various machine learning algorithms. This makes it a suitable tool for this purpose. Apart from this, Matlab has numerously inbuilt functions that make all the activities easy to carry out. The training and testing process is easily done using the in-built functions.


