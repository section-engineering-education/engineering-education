---
layout: engineering-education
status: publish
published: true
url: /electrocardiograms-qrs-peak-and-heart-rate-detection-using-dwt-in-matlab/
title: Electrocardiograms QRS Peak and Heart Rate detection Using DWT in Matlab
description: This tutorial will guide the reader on how they can use Matlab to get QRS peak and heart rates from ecg signals.
author: collince-odhiambo
date: 2021-12-17T00:00:00-09:30
topics: [Machine Learning]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/electrocardiograms-qrs-peak-and-heart-rate-detection-using-dwt-in-matlab/hero.png
    alt: Electrocardiograms QRS Peak and Heart Rate detection Using DWT in Matlab Hero Image
---
The QRS combines three deflections (Q, R, and S) seen on a typical ECG. It corresponds to the depolarization of the right and left ventricles of the human heart and contraction of the large ventricular muscles. 
<!--more-->
In numerical and functional analysis, a discrete wavelet transform (DWT) is any wavelet transform in which the wavelets are discretely sampled.

The discrete wavelet transform has many engineering, mathematics, and computer science applications. Most notably, it is used for signal coding to represent a discrete signal in a more redundant form, often as preconditioning for data compression.

The `sym4` wavelet resembles the QRS, suitable for QRS detection. Therefore, this process can help to diagnose various heart diseases. This tutorial will look at how to obtain the peak and rate of detection of these ECGs using the ECG database. From this method, we can get the heart rate.

### Prerequisites
To follow through this tutorial, you'll need:
- [MATLAB](https://www.mathworks.com/products/get-matlab.html?s_tid=gn_getml) installed.
- Proper understanding of [MATLAB](https://www.section.io/engineering-education/getting-started-with-matlab/) basics.

### Table of content
- [Prerequisites](#prerequisites)
- [Table of content](#table-of-content)
- [The QRS complex](#the-qrs-complex)
- [ECG database on PhysioNet](#ecg-database-on-physionet)
- [Use of symlet4 wavelet for ecg signal analysis](#use-of-symlet4-wavelet-for-ecg-signal-analysis)
- [Proposed DWT based QRS detection](#proposed-dwt-based-qrs-detection)
- [Matlab code to get QRS peak and heart rate from ecg signals](#matlab-code-to-get-qrs-peak-and-heart-rate-from-ecg-signals)
- [Conclusion](#conclusion)

### The QRS complex
As we said earlier, it is a combination of three deflections (Q, R, and S) seen on a typical ecg signal:

![image of qrs](/engineering-education/electrocardiograms-qrs-peak-and-heart-rate-detection-using-dwt-in-matlab/image-one.png)

Where:<br/>
P is the first deflection.<br/>
Q is the first negative deflection to the baseline.<br/>
R is the highest positive deflection to the baseline.<br/>
S the second negative deflection to the baseline.

The amplitude of a normal QRS is 5 to 30mm, and the duration is 0.06 to 0.12 seconds. The width, amplitude, and shape of the QRS complex help diagnose ventricular arrhythmias, conduction abnormalities, ventricular hypertrophy, myocardial infarction, electrolyte rearrangements, and other diseases state.

Note that the QRS complex does not always have all three QRS. It can have various shapes, as shown below:

![qrs complex configuration](/engineering-education/electrocardiograms-qrs-peak-and-heart-rate-detection-using-dwt-in-matlab/image-two.png)

### ECG database on PhysioNet
For this tutorial, we use signals from MIT-BIH arrhythmia, and the ECG-ID database downloaded from [PhysioNet](https://physionet.org/). Each ecg signal on PhysioNet has the following three files:
1. \*.atr: Reference Annotation.
2. \*.dat: Datafile(signal).
3. \*.hea: Header file.

However Matlab cannot read such files, we therefore have to convert our ecg to a `.mat` file. To do that, we use the [PhysioNet ATM](https://archives.physionet.org/cgi-bin/atm/ATM). The interface of the ATM bank is as shown below:

![ATM interface](/engineering-education/electrocardiograms-qrs-peak-and-heart-rate-detection-using-dwt-in-matlab/image-three.png)

You can select your database in the input by clicking on the dropdown arrow to choose your database. Note that all the PhysioNet ecg databases are available here:

![Show all the databases in the dropdown](/engineering-education/electrocardiograms-qrs-peak-and-heart-rate-detection-using-dwt-in-matlab/image-four.png)

You can select the record, signals, annotation, output length, time format, and data format since they all have options. When you reach the toolbox section, you also select your options, when you choose `plot waveforms`, you will have the plots of the waveform as shown below:

![waveform](/engineering-education/electrocardiograms-qrs-peak-and-heart-rate-detection-using-dwt-in-matlab/image-two.png)

Since we need to read it in Matlab, we export it. To do that, we select the `export signal as .mat` and then download it on the toolbox:

![exporting](/engineering-education/electrocardiograms-qrs-peak-and-heart-rate-detection-using-dwt-in-matlab/image-five.png)

![downloading](/engineering-education/electrocardiograms-qrs-peak-and-heart-rate-detection-using-dwt-in-matlab/image-six.png)

Since we only need the signal, we download the `.mat` file.

### Use of symlet4 wavelet for ecg signal analysis
The `sym4` wavelet is similar to the QRS complex. That is why it's preferred for QRS detection. To make this clear, look at the image of extracted QRS complex and dilated `sym4` wavelet and make a comparison:

![comparison](/engineering-education/electrocardiograms-qrs-peak-and-heart-rate-detection-using-dwt-in-matlab/image-seven.png)

As you can see, the QRS complex of the ecg is quite similar to the `sym4` wavelet in shape. That's why `sym4` wavelets are always preferred for the ecg signal analysis.

### Proposed DWT based QRS detection
Below are the essential ecg signals, and if we look at them carefully, we can locate the labeled areas with a particular frequency contribution.

![image of freq distribution](/engineering-education/electrocardiograms-qrs-peak-and-heart-rate-detection-using-dwt-in-matlab/image-eight.png)

f1: Represents the high-frequency noise and has some frequency f1.<br/>
f2: It is the QRS that has the frequency contribution of f2.<br/>
f3: Slow varying content of the ecg and have a frequency contribution f3.

The relationship between these three frequencies will be `f1>f2>f3`.

Our objective to preserve all the R-peaks and eliminate all the other frequencies. To make it clear, we say that we want to eliminate `f1` and `f3` but preserve `f2`.

This is known as bandpass filtering. You achieve it with the help of the wavelet transform. Wavelet transform groups signals of the same frequency bands. Therefore, You can implement bandpass filtering by eliminating some frequency bands.

This bandpass filtering can be achieved by eliminating wavelet coefficients of some lower scale (high frequencies) and higher scales (lower frequency) of ecg signals. For this purpose, an undecimated wavelet transform is used to get wavelet coefficients.

What is an undecimated wavelet transform?

Well, in a normal `mra` wavelet, transform signals are downsampled to two after every decomposition level, by which its size reduces at every decomposition level.

Therefore, in an undecimated wavelet, the signal length remains the same. A 4-level decomposition of an ecg signal using `sym4` is shown in the figure below:

![sym4 decomposition](/engineering-education/electrocardiograms-qrs-peak-and-heart-rate-detection-using-dwt-in-matlab/image-nine.png)

The first plot is the ecg signal. The `d's` are the detailed coefficients at every level of the ecg signal. `a4` is the approximate coefficients at level 4.

We will obtain the bandpass filtering by removing the co-efficient `a4` since it will not be considered—similarly, we eliminate`d1` and `d2`.

The reason why we don't consider it is because it is an approximated coefficient. It carries all the low-frequency details. `d1` and `d2` are not considered because they contain details of the signal's high frequency. `d2` and `d4` are considered to reconstruct or achieve the signal the bandpass is filtering.

We get the following signals by considering only `d3` and `d4` and taking the inverse wavelet transform.

![signal](/engineering-education/electrocardiograms-qrs-peak-and-heart-rate-detection-using-dwt-in-matlab/image-ten.png)

With the help of a standard peak detection algorithm, we can locate these R-peaks. Also, you find the number of total R-peaks for a given time interval to find the heart rate.

For example, suppose we have a 10-second ecg signal and the total number of R-peaks have some values, then we can find the number of R-peaks in a minute, representing the beat per minute which is the heart rate.

### Matlab code to get QRS peak and heart rate from ecg signals
The first step is to input our signal. The user should input the signal, so Matlab should ask for it. For Matlab to allow the user to select the signals from the folder, we use the `uigetfile` function. This function takes into consideration the path and the file name:

```Matlab
%program to get QRS peaks and heart rate from ecg signal

[filename, pathname]=uigetfile('*.*', 'select your ecg signal');
filewithpath = strcat(pathname, filename);
```

Next, we need the sampling frequency of the signal. These sampling frequencies are defined in the database. We use the `input` function since the user defines the sampling frequency. This function reads the user's input. After this, the data is loaded using the `load` function:

```matlab
Fs = input('Enter sampling rate:');
ecg = load(filename);   %reading ecg signal
```

Afterwards, we normalize the amplitude. It is done by dividing the ecg value by the gain. This gain value is given in the database too. We also get the length of the signal using function `length`, this function takes in the signal as the input.

This length helps in determining the time taken by the signal:

```Matlab
ecgsig = (ecg.val)./200; %Normalize gain
t = 1:length(ecgsig);  %No. of samples
tx = t./Fs;  %Getting time vector
```

Next, we need to compute the undecimated wavelet transform of the 4-level using `sym4`. This ensures that the length of the signal remains the same. To compute this, we use the `modwt` function. This function takes `ecg signal` and the `sym4` level 4.

```Matlab
wt = modwt(ecgsig,4, 'sym4');  %4-level undecimated DWT using sym4
wtrec = zeros(size(wt));
```

As explained earlier, our wavelet transform has 5 rows, that is, $a_n, d_4, d_3, d_2$, and $d_1$. We don't need the approximated and high-frequency coefficients $d_1$ and $d_2$. So we extract the $d_3$ and $d_4$, which are the 3rd and 4th rows.

We use the rows to extract as the argument for the undecimated DWT:

```Matlab
wtrec(3:4, :)= wt(3:4,:);   %extracting only d3 and d4 coefficients
```

By performing the inverse discrete wavelet transform (IDWT), we will have a signal that has only the r-peaks well preserved. Inverse DWT returns the signal to the original form after performing the DWT.

In Matlab, we use `imodwt` function to do the IDWT with the arguments as the signals with the extracted parts `wtrec`:

```Matlab
y=imodwt(wtrec, 'sym4');  %IDWT with only d3 and d4.
y=abs(y).^2;  %magnitude square
```

We then find the average of the signal. It will be used as the threshold when finding the signal's peak. Finding the average is done by using the `mean` function:

```Matlab
avg = mean(y);   %getting average of y^2 as threshold

%Finding peaks
[Rpeaks, locs] = findpeaks(y,t, 'MinPeakHeight', 8*avg, 'MinPeakDistance', 50);
```

`find peaks` is a variable available in the signal processing toolbox to find the peaks. We have the minimum peak distance as `50` to avoid false detection if the peaks are close to each other. It could happen due to improper filtering. `locs` give the location of the R-peaks.

Let's find the location of the R-peaks in consideration of the length of the signal. It represents the number of beats. This number of beats is then converted to beats per minute:

```Matlab
nohb = length(locs);   %No. of beats
timelimit = length(ecgsig)/Fs;  %getting the time function of the signal
hbpermin = (nohb*60)/timelimit;   %Getting Beat per minute.
disp(strcat('HeartRate= ', num2str(hbpermin)))  %displaying the heartrate
```

Plot the normal ecg signal against time so we could be able to see the difference:

```Matlab
%displaying ecg signal and detected R-peaks
subplot(211)
plot(tx, ecgsig);

xlim([0, timelimit])
grid on
xlabel('seconds')
ylabel('ECG signal')
```

Additionally plot the filtered signal along with the detected peaks:

```matlab
subplot(212)
plot(t,y)
grid on
xlim([0, length(ecgsig)]);
hold on
plot(locs, Rpeaks, 'ro')
xlabel('samples')
title(strcat('R peaks found and heartrate: ', num2str(hbpermin)))  % displayes the heartrate.
```

When we execute our program, we will have the following as our output:

![output](/engineering-education/electrocardiograms-qrs-peak-and-heart-rate-detection-using-dwt-in-matlab/image-eleven.png)

### Conclusion
ECG, QRS, and heart rate detection are easier using the discrete wavelet transform. Matlab is the best software for wavelet analysis. As we have seen, these transforms are already done and exist in in-built form. Therefore, it makes it easy to perform operations.

Also, Matlab has other built-in functions that help analyze the signal apart from having the transform in in-built form. These functions include `length` for getting the length. Furthermore, the database for the ecg signal is compatible with Matlab since it gives options to download Matlab files.

I hope you found this tutorial helpful.

Happy coding!

---
Peer Review Contributions by: [Monica Masae](/engineering-education/authors/monica-masae/)

<!-- MathJax script -->
<script type="text/javascript" async
    src="https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.1/MathJax.js?config=TeX-AMS-MML_HTMLorMML">
    MathJax.Hub.Config({
    tex2jax: {
      inlineMath: [['$','$'], ['\\(','\\)']],
      displayMath: [['$$','$$']],
      processEscapes: true,
      processEnvironments: true,
      skipTags: ['script', 'noscript', 'style', 'textarea', 'pre'],
      TeX: { equationNumbers: { autoNumber: "AMS" },
           extensions: ["AMSmath.js", "AMSsymbols.js"] }
    }
    });
    MathJax.Hub.Queue(function() {
      // Fix <code> tags after MathJax finishes running. This is a
      // hack to overcome a shortcoming of Markdown. Discussion at
      // https://github.com/mojombo/jekyll/issues/199
      var all = MathJax.Hub.getAllJax(), i;
      for(i = 0; i < all.length; i += 1) {
          all[i].SourceElement().parentNode.className += ' has-jax';
      }
    });
    MathJax.Hub.Config({
    // Autonumbering by mathjax
    TeX: { equationNumbers: { autoNumber: "AMS" } }
    });
  </script>
