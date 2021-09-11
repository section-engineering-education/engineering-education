### Blood vessel segmentation in retinal images
### Introduction
Segmentation is the process of Retinal partitioning a digital image into multiple regions and extracting the meaningful region. Retinal images are the digital images of the eyeball that shows the retina, the optical nerves, and the blood vessels that send information to the brain. This practice helps the optometrist finding diseases and also give a health check on the eyes. 
This segmentation process is essential in the field of medicine. When the vessels are segmented and viewed closely, the solution or cause of a given problem may be defined. Therefore, it makes it a good application in this field. This article will look at how we can obtain the blood vessel segmentation in the retinal image.

### Prerequisites
To follow along with this tutorial, you'll need:
- [MATLAB](https://www.mathworks.com/products/get-matlab.html?s_tid=gn_getml) installed.
- Proper understanding of [MATLAB](https://www.section.io/engineering-education/getting-started-with-matlab/) basics.
- Basic understanding of [image processing](https://www.section.io/engineering-education/image-processing-using-matlab/) using Matlab.

To make this whole process easier, download your image and store it in the current folder in Matlab. To find these images, open your browsing site and search for the retinal image and download one. After doing this, we will now open Matlab and create a new script. The first step is to read the images. It is possible by using the `imread` function.
```Matlab
test_image = imread('retinal_image.jpg');
```
Since this image looks bigger, we should resize it using the `imresize` function. This function uses the image name and the prefered dimensions in vector form as the arguments. The dimensions are in pixels, and it means that decimal dimensions are not accepted.
```Matlab
resized_image = imresize(test_image, [584 565]);
```
However, as we are going to segment very tiny blood vessels. Therefore, we need to convert the resized image into double data time using the `im2double` function. This function only uses the image name as the argument.
```Matlab
converted_image = im2double(resized_image);
```
Now, this image is a `RGB` image. We need to convert the image to `CIE lab` colour space. The international commission of illumination defined the CIE Lab colour space. According to this colour space, the `l` represents the `likeness` of the colour. The `likeliness` ranges from 0 to 100, where 0 means black and 100 means white. The `a` represents green to red, starting from negative to positive as the range. The higher the negative value, the more intense the green, while the higher the positive value, the more intense the red colour. The `b` represents blue to yellow. It also ranges from negative to positive.
```matlab 
lab_image = rgb2lab(converted_image);
```
let us now use the `cat` function to concatenate 1, 0 and 0.
```matlab
fill = cat(3, 1, 0, 0);
filled_image = bsxfun(@times, fill, lab_image);
```
The 3 represents the dimensions of the concatenated areas. Our image is in the CIE Lab colour space, which has 3 channels. After this, we use the `bsx` function to perform an element-wise binary operation between the `filled` and `lab` images. After this, we are to reshape the filled image. We will keep the dimension arguments empty since we don't need any here but instead use 3 since it is the existing dimension of the `filled` image.
```matlab   
reshaped_lab_image = reshape(filled_image, [], 3);
```
Now we apply the principal component analysis(PCA) function. Again, we are using the `reshaped_lab_image` as the argument. What this does is return the coefficients and the score of the principal component. Variables `C` and `S` store coefficients of the principal component. You can then resize the scores based on the size of the `lab` image.
```matlab
[C, S] = pca(reshaped_lab_image);
S = reshape(S, size(lab_image));
```
We need all the rows and the columns of the first channel.
```Matlab
S = S(:, :, 1);
```
It is time to convert the `S` into a grayscale image. First, we subtract `S`'s minimum value from `S` and then divide it by the maximum and minimum of `S`. The division is going to be an element-wise division, and that's why we use the dot before the division sign in the code below;
```Matlab
gray_image = (S-min(S(:)))./(max(S(:)));
```
Now we need the contrast enhancement of this gray image. This will be done using the adaptive histogram equalization function `adapthisteq`.
```matlab
enhanced_image = adapthisteq(gray_image, 'numTiles', [8 8], 'nBins', 128);
```
The `numTiles`, which stands for the number of tiles, means the enhancement is done block by block. The size of the block is going to be 8x8. The `nBins` indicates the number of beams is to be 128. 
The next step is to perform an average filter on the image. To do it, we define the filter using the `special` function. We then apply the `imfilter` function to compute the value of the output image in pixel.
```Matlab
avg_filter = special('average', [9 9]);
filtered_image = imfilter(enhanced_image, avg_filter);
```
We will now view the `filtered image` and subtract the from the enhanced image. Viewing the image we use the `imshow` function.
```matlab
figure, imshow(filtered_image)
title('filtered image')
subtracted_image = imsubtract(filtered_image, enhanced_image);
```
Now we need to calculate the threshold level to segment the blood vessels. Let's create a function script named `threshold_level.m` for this. This function takes the image as the argument.
```Matlab
function level = Threshold_level(image)
```
Here, we first convert the image into `uint8`. This is a type of datatype of 8bits. This conversion is done using the `im2uint8` function.  We then use the `imhist` function and the converted image as the arguement to get the histogram count and beam number.
```matlab
image = im2uint8(image(:));
[Histogram_count, Bin_number] = imhist(image);
i = 1;     % Initializing the variable
```
Calculate the cumulative sum of histogram count uisng `cumsum` function.
```matlab
cumulative_sum = cumsum(Histogram_count);
```
Let's now find the mean below and above `T`. `T` is the ratio of the sum of the multiplication of bin number and the histogram count to the cumulative sum indexed at the end. 
```matlab
T(i) = (sum(Bin_number.*Histogram_count))/cumulative_sum(end);
T(i) = round(T(i));    %Rounding the T(i)
```
We now need to find the cumulative sum of the histogram count from `1` to `T(i)`. We use this to find the mean above T(MAT) and MBT.
```matlab
cumulative_sum_2 = cumsum(Histogram_count(1:T(i)));
MBT = sum(Bin_number(T(i)).*Histogram_count(1:T(i)))/cumulative_sum_2(end);
cumulative_sum_3 = cumsum(Histogram_count(T(i):end));
MAT = sum(Bin_number(T(i):end).*Histogram_count(T(i):end))/cumulative_sum_3(end);
```
We are now to find the threshold. This is done using the code below;
```matlab
i = i+1;
T(i) = round((MAT+MBT)/2);
```
Let us now introduce a while loop to give the conditions to make the absolete value of `T` to be greater than one.
```matlab 
while abs(T(i)-T(i-1))>=1
cumulative_sum_2 = cumsum(Histogram_count(1:T(i)));
MBT = sum(Bin_number(T(i)).*Histogram_count(1:T(i)))/cumulative_sum_2(end);
cumulative_sum_3 = cumsum(Histogram_count(T(i):end));
MAT = sum(Bin_number(T(i):end).*Histogram_count(T(i):end))/cumulative_sum_3(end);
i = i+1;                      %looping i
T(i) = round((MAT+MBT)/2);    %rounding off the average mat and mbt.
Threshold = T(i);             % making T(i) the threshold
end
Finally we normalize the threshold.
```matlab
level = (Threshold-1)/(Bin_number(end)-1);
end
```
Going back to our initial script, we are going to call this function `threshold_level`.This function uses the `subtracted_image` we found before and returns its threshold level.
```Matlab
level = Threshold_level(subtracted_image);
```
Now we can convert this `subtracted_image` to binary image uisng the `im2bw` function. 
```matlab
binary_image = im2bw(subtracted_image, level-0.008);
```
We then display the output using the `imshow` to display this binary image in a figure.
```Matlab
figure, imshow(binary_image)
title('binary image')
```
This is what we have when running the code at this point.
![output image](/engineering-education/how-to-obtain-blood-vessel-segmentation-in-retinal-images-using-matlab/retinal_one.png)
Now, this is not the result required. We need to remove the noise from the `binary_image` we have displayed above. To remove this noise, we use the `bwareaopen` function and using the binary image as the argument, then show this new image.
```Matlab 
clean_image = bwareaopen(binary_image, 100);
figure, imshow(clean_image)
title('clean_image')
```
![filtered image](/engineering-education/how-to-obtain-blood-vessel-segmentation-in-retinal-images-using-matlab/retinal_two.png)
Since this is a binary image, we need to convert it into a colour image. We have to take the complement of the binary image first, using the `incomplement` function, which returns the complemented image. A complement image is an image in which the pixels are subtracted from the maximum pixel that the class can support. It is mainly to improve the contrast.
```Matlab
complemented_image = imcomplement(clean_image);
figure, imshow(complemented_image)
title('complemented image')
```
![complemented image](/engineering-education/how-to-obtain-blood-vessel-segmentation-in-retinal-images-using-matlab/retinal_three.png)
Let us now colorize this image. Inorder to colorize this image, we are going to create a function named `colorized_image.m`. This function will return the color image. To avoid any difficulty we will use the default color defined by `DEFAULT COLOR`.
```matlab
function color_image = colorize_image(resized_image, complemented_image, colorspace_defination)
DEFAULT_COLOR = [1 1 1];     % default color is white.
```
Let us now introduce the condition for the colour channels. We will use the `nargin` function such that if `nargin` is less than 3, then we use the default colour. `nargin` is a function that returns the number of the input argument of the function.
```Matlab
if nargin<3
colorspace_defination = DEFAULT_COLOR;
end
```
We now make the complemented image to be a logical image. 
```matlab
complemented_image = (complemented_image~=0);
```
Convert the resized image and the colorspace into `uint8`.
```matlab
resized_uint8 = im2uint8(resized_image);
color_uint8 = im2uint8(colorspace_defination);
```
If the dimensions of the `resized_uint8` is 2, then it is a grayscale. We use the `ndims` to return the dimension of the input array. If this is the case, we have to initialize all our input channel with same values.
```matlab
if ndims(resized_uint8) == 2
red_channel = resized_uint8;
green_channel = resized_uint8;
blue_channel = resized_uint8;
```
However, in other cases, we have to define the channel as shown below. Where `1` represents red, `2` represebts the green and `3` represents the blue.
```matlab
else
red_channel = resized_uint8(:, :, 1);
green_channel = resized_uint8(:, :, 2);
blue_channel = resized_uint8(:, :, 3);
end
```
Let us now apply the colors to the complemented image. 
```matlab
red_channel(complemented_image) = color_uint8(1);
green_channel(complemented_image) = color_uint8(2);
blue_channel(complemented_image) = color_uint8(3);
```
Finally, we concatenate the red, green and the blue channel into a 3-D array, and this gives the coloured image 
```Matlab
color_image = cat(3, red_channel, green_channel, blue_channel);
end
```
We now go back to the script and call this `colorize_image` function and then displaying the final image.
```matlab
final_results = colorize_image(resized_image, complemented_image, [0 0 0]);
figure, imshow(final_results)
title('final_result')
```
![final output](/engineering-education/how-to-obtain-blood-vessel-segmentation-in-retinal-images-using-matlab/retinal_four.png)

### Conclusion
Using Matlab for segmentation is easy. It is because it uses the in-built functions that you don't need to define. These in-built functions make the work more accessible, and the code does not seem to be bulky. Also, Matlab allows the use of functions, and this makes the codes appear organised. The outputs given by Matlab are reliable. It makes it even more efficient for segmentation.

Happy coding!
