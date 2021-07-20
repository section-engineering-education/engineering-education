---
layout: engineering-education
status: publish
published: true
url: /audio-signals-processing-using-matlab/
title: Audio Signal Processing in Matlab
description: In this article, we will discuss the filtering methods for various signals. We will look at the graphic equalizer, echo effect, and flange effect. We will also look at the low pass filter which is used to remove white Gaussian noise from a signal.
author: queenter-bruce
date: 2021-07-09T00:00:00-02:39
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/audio-signals-processing-using-matlab/hero.jpg
    alt: Audio processing in Matlab image example
---
A signal is a description of the variation of physical quantities over time. Signal processing is the manipulation of signals to alter their behavior or extract information. Matlab provides a tool for the creation and manipulation of discrete-time signals.
This involves reading and analysis of signals. It focuses on altering sounds, methods used in musical representation, and telecommunication sectors.
<!--more-->
In this article, we will discuss the filtering methods for various signals, look at the graphic equalizer, echo effect, flange effect, and low-pass filter which is used to remove white Gaussian noise from a signal. 

We will also look at techniques for spectral processing for relevant sound transformation, the practical knowledge which is used for analysis, synthesizing, and description of audio signals in the context of music application.

### Low pass filtering
In low pass filtering, we assume that our signal has been contaminated by the white Gaussian noise and it can be reduced by this low pass filter.

### Matlab code for low pass filter (LPF)
We import the audio signal into Matlab by executing the code below:

```Matlab
% Program to implement a LPR(FIR) with cutoff 8kHz to denoise audio signal.
[fileName, pathName] = uigetfile('*.*', 'select the input audio');
[x, Fs] = audioread(num2str(fileName)); % x is the audio samples and Fs is the sampling rate.
```

Audio samples(x) are numbers representing the wave value at a point in a particular time. Sampling rate(Fs) is the number of audio samples recovered per second. `audioread` is an in-built function that is used to read the input audio. When it is executed, the whole audio sample will be loaded to the variable `x` and the sampling rate will be stored in the variable `Fs`.

The filter attributes that we will use:

```Matlab
% filter implementation
Fsf = 44100;           % Sampling Frequency
Fp = 8e3;              % Passband Frequency in Hz
Fst = 8.4e3;           % stopband Frequency
Ap = 1;                % passband ribble in db
Ast = 95;              % stopband attenuation in db
```

We then design the filter bypassing all the attributes to the design `designfilt` function.

```Matlab
df = designfilt('lowpassfir', 'PassbandFrequency', Fp, 'StopbandFrequency',...
Fst, 'passbandRipple', Ap, 'stopbandAttenuation', Ast, 'sampleRate', Fsf);
```

Once this is executed, we will have `df` which is the filter object. To check if the filter works correctly, we use `fvtool` function. This helps in the visualization of the frequency response of the filter.

```Matlab
fvtool(df); % visualize freq response of filter
xn = awgn(x,15,'measured'); % signal corrupted by white Gaussian noise
```

In the code above, `x` is the original signal since it contains samples of the input audio. To corrupt it, we add Gaussian noise using the function `awgn`. 

`xn` is the corrupted signal. 15 is the SNR ratio (signal-to-noise ratio). SNR is the ratio of the desired information to the background noise. A higher ratio indicates that less noise is added while a low ratio indicates that more noise is added.

We then filter the noisy signal using the `filter` function while passing the filter(df) and the noisy signal(xn) as parameters to the function:

```Matlab
y = filter(df, xn);
```

The `df` outputs are stored in the variable `y`. These are the samples of the filtered audio. We then plot the original signal, noisy signal, and the filtered signal using the plot function as shown below:

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

When we execute this, we get the filtered response, which is the low pass and the waveforms depending on the nature of the signal.

![plot of magnitude response](/engineering-education/audio-signals-processing-using-matlab/signal.png)

![plot of the signals](/engineering-education/audio-signals-processing-using-matlab/signal2.png)

We can see how the noise is reduced in the output. Note that instead of plotting the whole sample, we use 450 to see the difference. The waveforms show the filtration clearly but we can also listen to the music to get the difference. 

To listen to the music in Matlab, we execute the sound command `sound(xn, fs)` for the noisy signal in the command window. We also do the same for the filtered signal `sound(y, Fs)`. On listening to the output music, we notice that background noise is significantly reduced.

### Graphic equalizer
Whenever you play music on any audio player, you will often find this type of equalizer. It is used to produce different sound effects. Matlab has an inbuilt function to implement this.

### Matlab code for equalizer
We first initialize the `audioDeviceReader`:

```Matlab
deviceReader = audioDeviceReader('Driver', 'ALSA', 'device',...
'line In(RealtekHighDefination Audio)', 'samplesperFrame', 2048, 'SampleRate', 44100);
```

To play the song, we execute the `audioDeviceWriter` function. It plays the music at the same sample rate and uses an equalizer tool to implement the effect as shown:

```Matlab
deviceWriter = audioDeviceWriter('SampleRate', device reader.SampleRate);

equalizer = graphicEQ('Bandwidth', '1 octave', 'structure', 'parallel', 'SampleRate',...
deviceReader.SampleRate);        % we define the bandwidth which we have taken as 1 0ctave
```

We take the structure of the equalizer as parallel. This means that a lot of parallel filters are implemented. The line `deviceReader.SampleRate` assimilates the device and the sample rate. We then specify the gains. The gains are the position of the equalizer slider.

```Matlab
equalizer.Gains = [4 4.2 4.6 2.7 -3.7 -5.2 -2.5 2.3 5.4 6.5];
```

To visualize the equalizer, we use the `visualize` function as the following:

```Matlab
visualize(equalizer)
nUnderruns = 0;
tic;
```

We then use the while loop to do the real-time job for 30seconds:

```Matlab
while toc < 30             % 30 sec of simulation
in = deviceReader();
out = equalizer(in);
nUnderruns = nUnderruns + deviceWriter(out);
end
```

The device reader is reading all input samples and stores them in the variable `in`. The `in` variable is then passed to the equalizer, and the output is stored in the `out` variable. The `out` variable is then read by the `deviceReader` which plays it in the laptop's speaker.

After assimilating, we clean up to release all the inputs.

```Matlab
% clean up
release(out);
release(deviceReader)
release(deviceWriter)
```

### Echo effect
The echo is added to signals to give a good effect. The equation is given by;

**y(n) = x(n) + a.x[ n-d ]**

'y(n)' is the output signal. 'a' is the gain and 'd' is the delay. Here, gain specifies how much depth you require.

### Matlab's code for echo effect
```Matlab
[filename, pathname] = uigetfile('*.*', 'select your audio file');
[x, Fs] = audioReader(num2str(filename));
n = length(x);          % length of the music file
a = 0.8;                % attenuation factor(gain)
d = 2000;               % Delay input stream
y = zeros((n + d),1);   % Initialize the output music signal
xn = padarray(x, [d,0], 0, 'pre');
for i = (d+1): 1: n
y(i-d,1) = x(i) + a*xn(i-d);
end
```

To listen to the music, we execute the `sound(y, Fs)` in the command window.

### Flange effect
The equation for the flange effect is given by y(n) = x(n) + a.x[ n-d [ n ]]. In large effects, there is more delay due to the low-frequency sine wave and it varies according to the shape of sine as shown in the equation.

### Matlab's code for flange effect
```Matlab
[filename, pathname] = uigetfile('*.*', 'select your audio file');
[x, Fs] = audioReader(num2str(filename));
n = length(x);      % length of the music
tn = n/Fs;          % finds length of music in seconds
f = 0.25;           % frequency of sine wave in Hz
```

We use the `linspace` to give n number of points that are equally spaced:

```Matlab
t = linspace(0, tn, n);
d = 100;              % Delay factor
```

We then create a low-frequency sine wave below. The delay factor is the time taken by the signal to pass through a point and it is in milliseconds.

```Matlab
modsin = sin(2*pi*f*t);
```

The delay is then created by the `round` function and bypassing the product of delay factor and modsin:

```Matlab
modsin1 = round(d.*modsin') + d;               %variable delay
y = zeros(n + d, 1);           % initializing the output music signal
a = 0.5;       % attenuation factor
xn = padarray(x,[d,0], 0, 'pre');
for i = (d+1):1:n
y(i-d,1) = x(1) + a*xn(i-modsin1(i-d));
end
```

To listen to the music with a flange effect, we execute `sound(y, Fs)` in the command prompt.

### Conclusion
Matlab is a good tool for the analysis of an audio signal. It has functions that make it much easier to visualize these signals. Just as discussed, audio signal analysis requires a proper tool to deal with in which Matlab is. 

Filtering audio signal is an important feature since it can be used to retain lost information. This makes it applicable in a wide range.

---
Peer Review Contributions by: [Peter Kayere](/engineering-education/authors/peter-kayere/)