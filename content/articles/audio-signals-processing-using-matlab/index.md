### AUDIO SIGNAL PROCESSING IN MATLAB
### Introduction
A signal is the description of the variation of the physical quantities over time. Signal processing is the manipulation of the signals
to alter their behaviour or extract information. Matlab provides a tool for the creation and manipulation of discrete-time signals. 
This involves the reading and analysis of this signal. It focuses on altering the sounds, methods used in musical representation, and 
telecommunication sectors.
In this article, we will discuss the filtering methods for various signals. We will also look at the graphic equalizer, echo effect, and flange 
effect. We will look at the low pass filter which is used to remove the white Gaussian noise from a signal. We will look at techniques for 
spectral processing for relevant sound transformation, the practical knowledge which is used for analysis, synthesizing and description of 
audio signals in the context of music application. 

### Low pass filtering
In low pass filtering, we assume that our signal has been contaminated by the white Gaussian noise and it can be reduced by this low pass filter.

### Matlab code for low pass filter(LPF)
We import the audio signal into Matlab by executing the code below;
```matlab
% Program to implement a LPR(FIR) with cutoff 8kHz to denoise audio signal.
[fileName, pathName] = uigetfile('*.*', 'select the input audio');
[x, Fs] = audioread(num2str(fileName)); % x is the audio samples and Fs is the sampling rate.
```
Audio samples(x) are numbers representing the wave value at a point in a particular time. Sampling rate(Fs) is the number of samples of 
audio recovered every second. `audioread` is an in-built function that is used to read the input audio. When is executed, the whole audio 
sample will come in the variable `x` and the sampling rate will come to the `Fs`. We write the filter attributes that we will use.
```matlab
% filter implementation
Fsf = 44100;           % Sampling Frequency
Fp = 8e3;              % Passband Frequency in Hz
Fst = 8.4e3;           % stopband Frequency
Ap = 1;                % passband ribble in db
Ast = 95;              % stopband attenuation in db
```
We then design the filter by passing all the attributes to the design `designfilt` function.
```matlab
df = designfilt('lowpassfir', 'PassbandFrequency', Fp, 'StopbandFrequency',...
Fst, 'passbandRipple', Ap, 'stopbandAttenuation', Ast, 'sampleRate', Fsf);
```
Once this is executed, we will have `df` which is the filter object. To check if the filter works correctly, we use `fvtool` function. This helps 
in the visualization of the frequency response of the filter.
```Matlab
fvtool(df); % visualize freq response of filter
xn = awgn(x,15,'measured');         % signal corrupted by white Gaussian noise
```
In the code above, `x` is the original signal since it contains the samples of the input audio. To corrupt it, we add the Gaussian noise using 
the function `awgn`. `xn` is the corrupted signal. 15 is the SNR ratio(signal to noise ratio). SNR is the ratio between the desired information 
and the background noise. The more of this value indicates that less noise is added and if the value is less, it indicates that more noise is added. 
We then filter the noisy signal using the `filter` function and passing the filter(df) and the noisy signal(xn) for the filter
```Matlab
y = filter(df, xn);
```
The `df` outputs are stored in variable `y`. These are the samples of the filtered audio. We then plot the original signal, noisy signal and the 
filtered signal using the plot function as shown below;
```Matlab
%plotting signals

subplot(3,1,1)
plot(x)
title('original signal')
subplot(3,1,2)
plot(xn)
title('Noisy signal')
subplot(3,1,3)
plot(y)
title('filtered signal')
```
When we execute this, we get the filtered response which is the lowpass and the waveforms depending on the nature of the signal
![plot of magnitude response](/engineering-education/audio-signals-processing-using-matlabsignal.png)
![plot of the signals](/engineering-education/audio-signals-processing-using-matlabsignal2.png)

We can see how the noise is reduced in the output. Note that instead of plotting the whole sample, we use 450 to be able to see the difference.
The waveforms show the filtration clearly but we can also listen to the music to get the difference. To listen to the music in Matlab, we execute 
the sound command `sound(xn, fs)` for the noisy image in the command window. We also do the same for the filtered signal `sound(y, Fs)`. On listening to 
the output music, we get that background noise is significantly reduced.

### Graphic equalizer
Whenever you play music on your audio player, you will find this type of equalizer. It is used to produce different sound effects. Matlab has an 
inbuilt function to implement this.

### Matlab code for equalizer
We first initialize the audioDeviceReader.
```matlab
deviceReader = audioDeviceReader('Driver', 'ALSA', 'device',...
'line In(RealtekHighDefination Audio)', 'samplesperFrame', 2048, 'SampleRate', 44100);
```
To play the song, we execute the `audioDeviceWriter` function which is a tool that plays the song. It plays the music at the same sample rate and 
uses an equalizer tool to implement the effect as shown.
```Matlab
deviceWriter = audioDeviceReader('SampleRate', device reader.SampleRate);

equalizer = graphicEQ('Bandwidth', '1 octave', 'structure', 'parallel', 'SampleRate',...
deviceReader.SampleRate);        % we define the bandwidth which we have taken as 1 0ctave
```
We take the structure of the equalizer as parallel. This means that a lot of parallel filters are implemented. The line `deviceReader.SampleRate` 
is mainline that assimilates the device and the sample rate. We then specify the gains. The gains are the position of the equalizer slider.
```Matlab
equalizer.Gains = [4 4.2 4.6 2.7 -3.7 -5.2 -2.5 2.3 5.4 6.5];
```
To visualize the equalizer we use the `visualize` function as shown
```matlab
visualize(equalizer)
nUnderruns = 0;
tic;
```
We then use the while loop to do the realtime job for 30seconds 
```matlab
while toc < 30             % 30 sec of simulation
in = deviceReader();
out = equalizer(in);
nUnderruns = nUnderruns + deviceWriter(out);
end
```
The device reader is reading all input samples and storing them in the variables `in` and all in this variable are going to the equalizer and the 
output stored in the `out` variable. The `out` variable is then read by the `deviceReader` which plays it in the laptop's speaker. After assimilating, 
we clean up to release all the inputs.
```Matlab
% clean up
release(out);
release(deviceReader)
release(deviceWriter)
```

### Echo effect
The echo is added to signals to give a good effect. The equation is given by;
y(n) = x(n) + a.x[ n-d ]. The 'y(n)' is the output signal. 'a' is the gain and 'd' is the delay. Here gain specifies how much depth you require

### Matlab's code for echo effect
```matlab
[filename, pathname] = uigetfile('*.*', 'select your audio file');
[x, Fs] = audioReader(num2str(filename));
n = length(x);                        % length of the music file
a = 0.8;                %attenuation factor(gain)
d = 2000;               % Delay input stream
y = zeros((n + d),1);    % Initialize the output music signal
xn = padarray(x, [d,0], 0, 'pre');
for i = (d+1): 1: n
y(i-d,1) = x(i) + a*xn(i-d);
end
```
To listen to the music, we execute the `sound(y, Fs)` in the command window.

### Flange effect
The equation for the flange effect is given by y(n) = x(n) + a.x[ n-d [ n ]]. In large effects, there is more delay due to the low-frequency 
sine wave and it varies according to the shape of sine as shown in the equation.

### Matlab's code for flange effect
```matlab
[filename, pathname] = uigetfile('*.*', 'select your audio file');
[x, Fs] = audioReader(num2str(filename));
n = length(x);      %length of the music
tn = n/Fs;           %finds lenth of music in seconds
f = 0.25;            % frequency of sine wave in Hz
```
We use the `linspace to give `n` number of points that are equally spaced.
```matlab
t = linspace(0, tn, n);
d = 100;              % Delay factor
```
We then create a low-frequency sine wave below. The delay factor is the time taken by the signal to pass through a point and it is in milliseconds.
```Matlab
modsin = sin(2*pi*f*t);
```
The delay is then created by the `round` function and by passing the product of delay factor and modsin
```matlab
modsin1 = round(d.*modsin') + d;               %variable delay
y = zeros(n + d, 1);           % initializing the output music signal
a = 0.5;       % attenuation factor
xn = padarray(x,[d,0], 0, 'pre');
for i = (d+1):1:n
y(i-d,1) = x(1) + a*xn(i-modsin1(i-d));
end
```
To listen to the music with a flange effect, we execute sound(y, Fs) in the command prompt.

### Conclusion
Matlab is a good tool for the analysis of the audio signal. It has functions that make it much easier to visualize these signals. Audio signal analysis 
just as discussed requires a proper tool to deal with in which Matlab is. The filtering of the audio signal is an important feature since it can 
be used to retain lost information. This makes it applicable to a wide range.
