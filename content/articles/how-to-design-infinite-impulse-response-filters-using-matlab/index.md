### How to design infinite impulse response filters using Matlab
### Introduction:
IIR filters are digital filters with infinite pulse response and have a feedback. They have a better response and their phase characteristics are 
non- linear which can cause a problem to the system which need phase linearity. This is why they are not preferred for use in digital signal
processing when the phase is of essence.
The design of IIR filters is not straight forward as that of FIR filters, however Matlab signal processing toolbox provides a number of advanced 
routines to assist in this process. In this article, we will look how to use Matlab to design an IIR filters.
### Prerequisites
- [Matlab](https://www.mathworks.com/products/get-matlab.html?s_tid=gn_getml) installed.
- Proper understanding of [matlab](https://www.section.io/engineering-education/getting-started-with-matlab/) basics.
- Understand the theory behind the filters.

The design of IIR filters is not as straightforward as that for FIR filters; however, the MATLAB Signal Processing Toolbox provides a number of advanced
routines to assist in this process. IIR filters are similar to analog filters and originally were designed using tools developed for analog filters. 
In an analog filter there is a direct relationship between the number of independent energy storage elements in the system and the filter’s rolloff slope: 
each energy storage element adds 20 dB/decade to the slope. As we find in Chapter 10, each energy storage device adds a jω term to the denominator of the 
system transfer function, which accounts for its influence on the system’s spectrum. In IIR digital filters, the first a coefficient, a[0], always equals
1.0, but each additional a coefficient adds 20 dB/decade to the slope. So an eighth-order analog filter and an eighth-order IIR filter have the same slope. 
Since the downward slope of an IIR filter increases by 20 dB/decade for each filter order, determining the filter order needed for a given desired 
attenuation is straightforward.
IIR filter design under MATLAB follows the same procedures as FIR filter design, only the names of the routines are different. In the MATLAB Signal
Processing Toolbox, the two-stage design process is supported for most of the IIR filter types. As with FIR design, a single-stage design process can
be used if the filter order is known, and that is the approach that is covered here.
The Yule–Walker recursive filter is the IIR equivalent of the fir2 FIR filter routine in that it allows for the specification of a general desired 
frequency response curve. The calling structure is also very similar to that of fir2.
```matlab
[b,a]=yulewalk(order,f,G);
```
where order is the filter order, and f and G specify the desired frequency characteristic in the same manner as fir2: G is a vector of the desired 
filter gains at the frequencies specified in f. As in all MATLAB filter design routines, the frequencies in f are relative to fs/2, and the first point
in f must be 0 and the last point 1. Again, duplicate frequency points are allowed and correspond to steps in the frequency response.

Example 8.12
Design the double bandpass filter that is used in Example 8.11. The first passband has a range of 50 to 100 Hz and a second passband ranges between
200 and 250 Hz. Use an IIR filter order of 12 and compare the results with the 65th-order FIR filter used in Example 8.11. Plot the frequency spectra 
of both filters superimposed for easy comparison.
Solution: Modify Example 8.11 to add the Yule–Walker filter, determine its spectrum using freqz, and plot this spectrum superimposed with the FIR 
filter spectrum. Remove the code relating to the signal as it is not needed in this example.

%Example 8.12 Design a double bandpass IIR filter and compare with a similar FIR filter
```matlab
%
........same intial code as in Example 8.8........
% Design filter
f=[0 fl1 fl1 fh1 fh1 fl2 fl2 fh2 fh2 1]; % Construct desired
G=[0 0 1 1 0 0 1 1 0 0]; % frequency characteristic
subplot(2,1,1);
plot(f,G); hold on; % Plot the desired magnitude spectrum
b1=fir2(L1,f,G); % Construct FIR filter
[H1,f1]=freqz(b1,1,512,fs); % Calculate FIR filter spectrum
[b2 a2]=yulewalk(L2,f,G); % Construct IIR filter
[H2 f2]=freqz(b2,a2,512,fs); % Calculate IIR filter spectrum
........labels........
subplot(2,1,2);
plot(f1,abs(H1),’k’); hold on; % Plot FIR filter magnitude spectrum
plot(f2,abs(H2),’:k’,’LineWidth’,2); % Plot IIR filter magnitude spectrum
```
The spectral results from two filters are shown in Figure 8.28. The magnitude spectra of both filters look quite similar despite the fact that the IIR 
filter has far fewer coefficients. The FIR filter has 66 b coefficients while the IIR filter has 13 b coefficients and 13 a coefficients.
In an extension of Example 8.12, the FIR and IIR filters are applied to a random signal of 10,000 data points, and MATLAB’s tic and toc are used to 
evaluate the time required for each filter operation.

% Example 8.12 (continued) Time required to apply the two filters in Ex. 8.12
```matlab
% to a random array of 10,000 samples.

%
x=rand(1,10000); % Generate random data
tic % Start clock
y=filter(b2,a2,x); % Filter data using the IIR filter
toc % Get IIR filter operation time
tic % Restart clock
y=filter(b1,1,x); % Filter using the FIR filter
toc % Get FIR filter operation time
```
Surprisingly, despite the larger number of coefficients, the FIR filter is approximately 30% faster than the IIR filter. However, if conv is used to 
implement the FIR filter, then it takes three times as long.
As mentioned above, well-known analog filter types can be duplicated as IIR filters. Specifically, analog filters termed Butterworth, Chebyshev Type I 
and II, and Elliptic (or Cauer) designs can be implemented as IIR digital filters and are supported in the MATLAB Signal Processing Toolbox. Butterworth
filters provide a frequency response that is maximally flat in the passband and monotonic overall. To achieve this characteristic, Butterworth filters
sacrifice rolloff steepness; hence, the Butterworth filter has a less sharp initial attenuation characteristic than other filters. The Chebyshev Type I 
filter features a faster rolloff than Butterworth filters, but has ripple in the passband. The Chebyshev Type II filter has ripple only in the stopband, 
its passband is monotonic, but it does not roll off as sharply as Type I. The ripple produced by Chebyshev filters is termed equi-ripple since it is of
constant amplitude across all frequencies. Finally, Elliptic filters have a steeper rolloff than any of the above, but have equi-ripple in both the
passband and stopband. While the sharper initial rolloff is a desirable feature as it provides a more definitive boundary between passband and stopband,
most biomedical engineering applications require a smooth passband making Butterworth the filter of choice.
The filter coefficients for a Butterworth IIR filter can be determined using the MATLAB routine:
[b,a]=butter(order,wn,’ftype’); % Design Butterworth filter
where order and wn are the order and cutoff frequencies, respectively. (Of course wn is relative to fs/2.) If the ‘ftype’ argument is missing, a low-pass
filter is designed if wn is scalar or a bandpass filter if wn is a two-element vector. In the latter case, wn=[w1 w2], where w1 is the low cutoff 
frequency and w2 is the high cutoff frequency. If a high-pass filter is desired, then wn should be a scalar and ‘ftype’ should be high. For a stopband
filter, wn would be a two-element vector indicating the frequency ranges of the stopband and ‘ftype’ should be stop. The outputs of butter are the b 
and a coefficients.
While the Butterworth filter is the only IIR filter you are likely to use, the other filters are easily designed using the associated MATLAB routine.
The Chebyshev Type I and II filters are designed with similar routines except an additional parameter is needed to specify the allowable ripple:
```matlab
[b,a]=cheby1(order,rp,wn,’ftype’); % Design Chebyshev Type I
```
where the arguments are the same as in butter except for the additional argument, rp, which specifies the maximum desired passband ripple in dB. 
The Type II Chebyshev filter is designed using:
```matlab
[b,a]=cheby2(n,rs, wn,’ftype’); % Design Chebyshev Type II
```
where again the arguments are the same, except rs specifies the stopband ripple again in dB but with respect to the passband gain. In other words, 
a value of 40 dB means that the ripple does not exceed 40 dB below the passband gain. In effect, this value specifies the minimum attenuation in the
stopband.
The Elliptic filter includes both stopband and passband ripple values:
```matlab
[b,a]=ellip(n,rp,rs,wn,’ftype’); % Design Elliptic filter
```
where the arguments presented are in the same manner as described above, with rp specifying the passband gain in dB and rs specifying the stopband
ripple relative to the passband gain.
The example below uses these routines to compare the frequency response of the four IIR filters discussed above.
Example 8.13
Plot the frequency response curves (in dB) obtained from an 8th-order low-pass filter using the Butterworth, Chebyshev Type I and II, and Elliptic 
filters. Use a cutoff frequency of 200 Hz and assume a sampling frequency of 2 kHz. For all filters, the ripple or maximum attenuation should be less 
than 3 dB in the passband, and the stopband attenuation should be at least 60 dB.
Solution: Use the design routines above to determine the a and b coefficients, use freqz to calculate the complex frequency spectrum, take the absolute
of this spectrum and convert to dB (20*log(abs(H))), then plot using semilogx. Repeat this procedure for the four filters.
```Matlab
% Example 8.11 Frequency response of four IIR 8th-order low-pass filters
%

fs=2000; % Sampling filter
n=8; % Filter order
wn=200/1000; % Filter cutoff frequency
rp=3; % Maximum passband ripple
rs=60; % Maximum stopband ripple
% Determine filter coefficients

[b,a]=butter(n,wn); % Butterworth filter coefficients
[H,f]=freqz(b,a,256,fs); % Calculate complex spectrum
H=20*log10(abs(H)); % Convert to magnitude in dB
subplot(2,2,1);
semilogx(f,H,’k’); % Plot spectrum in dB vs. log frequency
........labels and title........

%
[b,a]=cheby1(n,rp,wn); % Chebyshev Type I filter coefficients
[H,f]=freqz(b,a,256,fs); % Calculate complex spectrum
H=20*log10(abs(H)); % Convert to magnitude in dB
subplot(2,2,2);
semilogx(f,H,’k’); % Plot spectrum in dB vs. log frequency
........labels and title........
%

[b,a]=cheby2(n,rs,wn); % Chebyshev Type II filter coefficients
[H,f]=freqz(b,a,256,fs); % Calculate complex spectrum
H=20*log10(abs(H));  % Convert to magnitude in dB
subplot(2,2,3);
semilogx(f,H,’k’); % Plot spectrum in dB vs. log frequency

........labels and title........

%
[b,a]=ellip(n,rp,rs,wn); % Elliptic filter coefficients
[H,f]=freqz(b,a,256,fs); % Calculate complex spectrum
H=20*log10(abs(H));  % Convert to magnitude in dB
subplot(2,2,4);
semilogx(f,H,’k’); % Plot spectrum in dB vs. log frequency
........labels and title........
```
The spectra of the four filters are shown in Figure 8.29. As described above, the Butterworth is the only filter that has smooth frequency 
characteristics in both the passband and stopband; it is this feature that makes it popular in biomedical signal processing both in its analog and
digital incarnations. The Chebyshev Type II filter also has a smooth passband and a slightly steeper initial slope than the Butterworth, but it 
does have ripple in the stopband which can be problematic in some situations. The Chebyshev Type I has an even sharper initial slope, but also has
ripple in the passband which limits its usefulness. The sharpest initial slope is provided by the Elliptic filter, but ripple is found in both the
passband and stopband. Reducing the ripple of these last three filters is possible in the design process, but this also reduces the filter’s initial 
sharpness, another illustration of the compromises that continually arise in engineering.

### Conclusion
Matlab forms a very important tool for design of filters. This is because it has in-built tool and functions that helps in doing this. When designing a 
filter, it is better to visualize the response. This is to ensure it provides the required response. This is posssible in Matlab amd vary the variables to 
make the most economical and optimal response.
