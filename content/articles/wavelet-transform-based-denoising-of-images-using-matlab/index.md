### Wavelet-Based Denoising of images using Matlab
### Introduction
wavelet is a method of analysis that uses the time-frequency analysis method to select an appropriate frequency band based on the characteristics of the signal. A signal is the description of the various physical quantities over time. Noise is an unwanted signal which interferes with the signal of the original message and causes changes in the parameters of the message signal. Denoising is the process of removing noise from the signal. This wavelet analysis is applicable in daily life activities such as feature extraction, face recognition, data analysis and prediction, voice recognition, numerical analysis and many more.
Getting rid of the noise that may contaminate the image during transfer is a challenge. Several algorithms have been written and some discussed but it remains to be a challenge. We will discuss the currently available method, that is, wavelet-based denoising of images, which is the currently efficient method. A signal may be contaminated with noise during transmission over a distance. The objective here is to remove the noise from the image using the wavelet technique. 
The signal acquires the noise through the additive method and the general form of this is:
f'(x,y) = f(x,y) + n(x,y) where f'(x,y) is the noise-contaminated signal, f(x,y) is the original signal and n(x,y) is the noise signal. The basic assumption of noise signal n(x,y) for the proposed scheme are;
- Noise is additive
- Noise is a random signal(white gaussian with zero mean value)
- Noise has a high frequency.
To see more about the noise signals equation described above, you can check [here](https://towardsdatascience.com/introduction-to-image-denoising-3e269f176483).
The objective here is to remove the noise n(x,y) from the noisy image f'(x,y) using the wavelet technique.

### Prerequisite
1. [Matlab](https://www.mathworks.com/downloads/) installed.
2. A proper understanding of [Matlab](https://www.section.io/engineering-education/getting-started-with-matlab/) language.

### Wavelet-Based Denoising scheme
The denoising scheme involves passing the signal through decomposition to be decomposed into various wavelet co-efficient using discrete wavelet transform(DWT). Discrete Wavelet Transform is a method used in the transformation of image pixels to wavelets that are used for wavelet-based compression and coding. The coefficients are then thresholded and reconstructed to form the original image. This process of reconstruction is known as an inverse discrete wavelet transform. Image thresholding is the separation of foreground and background. It is an image segmentation method and it isolates grayscale images by converting them to binary images. 
>Grayscale images are images that contain a single colour, that is, grey while binary images are images whose pixels have only two possible intensity values, that is black and white. The values are often 0 for black and 1 for white. 

Using the inverse discrete wavelet transform(IDWT) to get the denoised image. Inverse discrete wavelet transform is Finding threshold labels, we have various methods such as universal threshold, Bayes, SURE, MinMax, e.t.c.

### Matlab's 'WaveletAnalyzer' tool
This is an in-built tool found within Matlab and is not to be installed. It is used for image denoising and to access it:
- Type `wavelet analyzer` on the command prompt. We get a new window below.

![WaveletAnalyzer tool](/engineering-education/wavelet-transform-based-denoising-of-images/image1.png)
After accessing the tool, we locate `wavelet 2-D` since the images that we want denoise are 2-D. When you click this, a new window shown below opens up.

![wavelet 2-D](/engineering-education/wavelet-transform-based-denoising-of-images/image2.png)
On the file folder, click 'load' then 'image' to import the image to be denoised.
Choose your noisy image to be denoised then import.

![imported image](/engineering-education/wavelet-transform-based-denoising-of-images/image3.png)
On the top left corner of the window above choose the wavelet(denoising method) e.g bior and the co-efficient e.g 2.2 and the level of decomposition.
> Note that `Db`, `haar`, `sym`, and `coif` are orthogonal wavelets and has compact support(smaller support).
`bior`, `rbior` are biorthogonal wavelets and has compact support.
`mey`, `dmey` are orthogonal wavelets and has non-compact support.
These methods are named after the people who invented them. To read more about this method, click [here](https://www.mathworks.com/help/wavelet/ref/wdenoise.html)
 
Orthogonal wavelets are a single scaling function and the wavelet while biorthogonal generates a single scaling function and wavelet for decomposition and another pair for reconstruction. Scaling function is scaling the function. Scaling means shrinking or magnifying the function.
Level decomposition involves passing signal through a low pass and high pass filter and the resultant signal is downsampled by 2. We obtain a high-frequency signal with detailed co-efficient for high pass filter and low frequency for low pass filter with approximated co-efficient. This is one level of decomposition(level one). When the process continues with the signal from the low pass filter, the level increases. The maximum number of decomposition is calculated by;
max. No. of decomposition = $$log_2N$$ where N represents the signal length. The whole decomposition described above is the discrete wavelet transform. The opposite of the above is the inverse discrete wavelet transform.

- Press the analyze pushbutton.
When the analyzer pushbutton is pressed, our image is denoised. Out of the four buttons below the analyzer, we have the denoise button. Click on this push button. This gives us a window with plots for the wavelet coefficient.

![Plot of wavelet co-efficient](/engineering-education/wavelet-transform-based-denoising-of-images/image4.png)
We have the detailed wavelet co-efficient. At level($$l_1$$), we the horizontal details, diagonal details, and vertical details. This also applies to level 2($$l_2$$).
On the left side of the window, select the threshold method and select the noise structure as well. In this case, we choose the scaled white noise since it is Gaussian white noise. Using the scrollbar, we can vary the threshold value then click the denoise pushbutton.

![Denoised image](/engineering-education/wavelet-transform-based-denoising-of-images/image5.png)
We get the denoised image as shown above. This is how you can use the wavelet analyzer tool to the denoise image.

### Functions used in Wavelet Denoising
`wdencmp` - It can be used for denoising of both 1-D and 2-D signals. This means it can be used for both audios as well as images.
`syntax`
```Matlab
imgden = wdencmp('gbl_or_Ivd',img, 'wname', N, THR, SORH, KEEPAPP)
```
where;
- `img`: is the noisy image that we input.
- `imgden`: is the output denoised image.
- `gbl_or_ivd`: either use `gbl` for single threshold or `Ivd` for level-dependent threshold(either use `gbl` or `Ivd`).  The single thresholding method is used when there the intensity distribution between the objects of foreground and background are very distinct. In level thresholding, thresholds are rescaled at each level to arrive at new corresponding to the standard deviation of wavelet co-efficient at each level.
- `wname`: is the wavelet type used.
- `N`: represents the decomposition levels.
- `thr`: threshold levels.
- `sorh`: `s` or `h` corresponds to the soft and hard thresholding respectively. Hard thresholding is the process of setting to zero the coefficients whose absolute values are lower than the threshold. Soft thresholding is the method that involves first setting to zero coefficients whose absolute values are lower than the threshold and then shrinking the non-zero coefficients toward zero.
- `keepapp`: it is either 0 or 1. It is 0 when the approximation coefficients cannot be thresholded and 1 if they can be.

### Functions used for finding the dafault values for denoising(THR, SORH, KEEPAPP)
The default values are found automatically using `ddencmp`. The function syntax is;
```matlab
[THR, SORH, KEEPAPP] = ddencmp('den', 'wv', img)
```

We pass the input noisy image(img), defined denoising method, and wavelet(WV). Executing this function we get the values for these constants.

### Example code to show use of `wdencmp` and `ddencmp`
We first load original image. This is done by executing the code below which allows us to select the image from the pc.
```matlab
[filename, pathname] = uigetfile('*.*', 'select input image');
fileWithPath = strcat(pathname, filename);  
img = imread(fileWithPath); % assigning the image to this variable fileWithPath.
```
T read the image, we use the `imread` function. The image `img` is the unnoisy original image, and so we add noise to make it noisy.
```Matlab
imgn = imnoise(img, 'gaussian', 0, 0.005);  %add noise
```
> Note that we add `gaussian` noise of mean value of 0 and variance is 0.005.

We then define the signal extension mode `dwtmode` which is a periodic extension of the signals. This done by the code below;
```Matlab
dwtmode('per'); %signal extension mode
```
We first execute `ddencmp` function. So when we execute this function, we will get the `thr`, `sorh`, `keepapp` that will be used in the `wdencmp` function.
```matlab
[thr, sorh, keepapp] = ddencmp('den', 'wv', imgn); %finding default values
```
After defining the `thr`, `sorh`, `keepapp` as shown below. We pass them to the `wdencmp` function as shown below. This is to denoise images using image thresholding.
```Matlab
% Denoise image using global thresholding.
imgden = wdencmp('gbl', double(imgn), 'sym4', 2, thr, sorh, keepapp);
```
> Note that the wavelet and thresholding methods cannot be renamed. This is how they are recognised in Matlab and any change would cause an error.

`gbl` means we are using a single threshold. `sym4` is used for the decomposition of wavelet and 2 is the decomposition level. When we execute the code we get `imgden` as the output. This is the denoised image. We show the images to see the difference, we use the codes below;
```Matlab
subplot(131), imshow(img), title('Original Image')
subplot(132), imshow(img), title('Noisy Image')
subplot(133), imshow(uint8(imgden), []), title('denoised image')
```
We find the SNR(signal to noise ratio).
```Matlab
%Finding SNR
Orig_vs_Noisy_SNR = 20*log10(norm(double(img(:)))/norm(double(img(:))-double(imgn(:))));   % This gives the value of ratio between the original image and the noisy image.
Origin_vs_denoised = 20*log10(norm(double(img(:)))/norm(double(img(:))-double(imgden(:))));   % This gives the value of ratio between the original image and the denoised image.
```
The SNR helps us to see the improvement after denoising. The first is the original vs the noisy image. The second represents the original image vs the denoised image. Below is the image obtained when we execute the code.
![Output after denoising](/engineering-education/wavelet-transform-based-denoising-of-images/image6.png)
For more understanding of this topic, you can check it [here](https://www.mathworks.com/help/wavelet/denoising-and-compression.html?s_tid=CRUX_lftnav)

### Conclusion
Wavelet transform is an important feature for engineers. This is because it helps in the analysis of signals and decomposes the signal for further analysis. This makes it an important feature in the engineering sector since it eases signal analysis. Wavelet transform is applicable in a wide field like image processing as we have seen here. They can also be applied in the audio signal analysis sector and many others. Matlab is a very important language that makes understanding wavelet easier. It has numerous in-built features and functions that make this easier.
