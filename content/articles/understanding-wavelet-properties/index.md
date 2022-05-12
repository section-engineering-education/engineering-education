---
layout: engineering-education
status: publish
published: true
url: /understanding-wavelet-properties/
title: Understanding Wavelet Properties and Their Applications
description: This tutorial discusses wavelet properties that can be considered when selecting a suitable wavelet.
author: simon-mwaniki
date: 2022-04-07T00:00:00-01:10
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/understanding-wavelet-properties/hero.jpg
    alt: Understanding Wavelet Properties and their Applications Hero Image
---
A wavelet is a mathematical function applied in digital image processing and compression. Its main aim is to improve the image quality. Also, wavelets can divide signals into time and frequency components. Wavelet transform is the decomposition of a signal to the frequency components.
<!--more-->
When choosing a suitable wavelet, it is essential to understand a few basic properties of the wavelets, such as Vanishing moments, Support width, Regularity, Symmetry and Orthogonality.

These properties aid in the selection of suitable wavelets. This tutorial will show how one can choose an appropriate wavelet transform and the right wavelet for a particular application.

### Prerequisites
To follow along with this tutorial, you will need:
- [MATLAB](https://www.mathworks.com/products/get-matlab.html?s_tid=gn_getml) installed.
- Proper understanding of [MATLAB basics](/engineering-education/getting-started-with-Matlab/).

### How to choose the right wavelet
Whenever there's the need to work on wavelets, the first thing that always comes to mind is which wavelet or wavelet transform to use for the project. Unfortunately, the solution to this problem is not always clear, but we can solve it by considering the properties of different wavelets.

### Which wavelet transform to choose
There are two basic transforms: `continuous wavelet transform (CWT)` and `discrete wavelet transform (DWT)`. CWT is a tool that gives complete signals. It does this through translating and scaling the wavelet parameter to vary continuously. On the other hand, a discrete wavelet transform is used to decompose signals into sets.

We will look at the properties of these transforms, and from the properties, we will derive our conclusion.

### Properties of CWT
- This transform is redundant (undecimated transform). It means that it generates a huge amount of coefficients.
- It is not computationally efficient since it uses a huge amount of coefficients. These coefficients occupy a lot of RAM, thus hindering the execution speed.
- It is shift-invariant. You can shift the signal around before calculating the transform, and the resulting energy will still be the same.
- CWT cannot be implemented with filter banks. It is a drawback.
- ICWT is not much accurate and has less stable numerical computations.

### Properties of DWT
- DWT has two forms. One is non-decimated, which generates more coefficients, and the other is undecimated, which generates fewer coefficients.
- DWT is more computationally efficient because it generates fewer coefficients.
- The decimated DWT is not shift-invariant as it does downsample, while non-decimated DWT is shift-invariant as it doesn't use downsampling.
- DWT (decimated and undecimated) can be implemented with the help of filter banks (lower pass filter and high pass filter).
- IDWT is the more accurate and less stable numerical operation with precision.

Based on CWT and DWT (decimated and undecimated) properties, we can conclude the following:
- If the application is to obtain the sparsest possible signal representations for compression, denoising or signal transmission, DWT is preferred.
- If the application requires a shift-variant transform and perfect reconstruction, non-decimated DWT is preferred. If the inverse transform is not required, then CWT is used.
- If the application requires an orthogonal transform, DWT with orthogonal wavelet filters is the obvious choice.
- If our primary goal is a detailed time-frequency analysis or precise localization of signal transient, CWT is a clear choice. For example, discontinuity detection, frequency break e.t.c.
- For other applications such as denoising, compression, feature extraction, studying statistical properties of wavelet coefficients, e.t.c. the DWT is the obvious choice.

### Scaling function($\phi(t)$)
The scaling function is an important aspect of wavelet analysis. It helps in the proper selection of the wavelets.

The wavelet decomposition of signals s(t) based on the multi-resolution theory given by s.mallet and Meyer, can be done using a digital FIR filter as shown in the figure below:

![Wavelet decomposition](/engineering-education/understanding-wavelet-properties/wavelet-decomposition.png)

Here, you have a signal with 1000 samples. It is passed through the high pass filter derived from the wavelet. This output is downsampled by 2 to obtain the DWT coefficients. These coefficients are of high frequency. They are referred to as detailed coefficients.

On the other hand, we have the DWT coefficients when this signal is passed through a low pass filter and downsampled by 2. They are of low frequencies. These coefficients are referred to as approximated coefficients. That is how to attain wavelet coefficients with the help of filters.

The filters are obtained in different ways. The high pass filter is obtained by wavelet function $\psi(t)$, and that of low pass filter is obtained by the scaling function($\phi(t)$).

Different wavelets have their corresponding scaling function. We will see that in the wavelet properties.

As an example, let us look at the `sym4` wavelet shown below:

![Sym4](/engineering-education/understanding-wavelet-properties/sym4-wavelet.png)

### Wavelet properties
#### 1. Vanishing moments
The vanishing moment is a criterion about how a function f(t) decays towards infinity. We can estimate the decay rate using the integration below:

$$\left [\int_{-\infty}^{\infty} t^kf(t) \; dt\right] = 0$$

Where `k` is the decay rate.

Also, a wavelet function $\psi(t)$ has N vanishing moments if:

$$
\left [\int_{-\infty}^{\infty} t^kf(t) \; dt\right]=0
$$

This property shows how fast a wavelet decays with time. The number of vanishing moments and the oscillation of wavelets have a close relationship. As the number of vanishing moments grows, the wavelet oscillation becomes greater.

![Wavelet oscillation](/engineering-education/understanding-wavelet-properties/wavelet-oscillation.png)

From the image above, we have three wavelets for comparison. The first has two vanishing moments. The second has four, and the third figure has eight vanishing moments.

As we can see, as the number of vanishing moments increases, the number of oscillations also increases. Therefore, the names of many wavelets are derived from the number of vanishing moments. Examples are shown below:

`CdbN, symN;`[`N` is the number of vanishing moments]. For example, `db6` has six vanishing moments and `sym3` has three vanishing moments.

`CoifN;` [`2N` is the number of vanishing moments]. `Coif3` has six vanishing moments.

`BoirNr.Nd;` `Nr` is the number of vanishing moments of synthesis wavelets, and `Nd` is the number of vanishing moments of analysis wavelet. For example, `Bior3.5` has three vanishing moments and five vanishing moments in the analysis wavelet.

#### 2. Support size
The size of support indicates the FIR filter's length. If an FIR filter has an `N` number of samples, the support width is `N-1`.

For example, `haar`, `dbN`, and `symN` has `N` number of vanishing moments, filter length of `2N`, and the support width is `2N-1`.

For `coifN`, the number of vanishing moments is `2N`, and the filter length is `6N`. Below is an example of the `symlet4` wavelet:

![Filters for symlet4](/engineering-education/understanding-wavelet-properties/sym4-filter.png)

`Symlet4` has four vanishing moments, and the filter length is given by `2N`. This means that the filter length is 8. As we can see from the figure, there are eight samples (0-7) in all the filters.

This is how the number of vanishing moments relates to the length of the filters. The more the vanishing moments, the higher the filter's length.

#### 3. Regularity
Regularity is the number of continuous derivatives a function has. Intuitively, it can be considered as the measure of smoothness.

A wavelet with more vanishing moments will be more regular. This is shown in the figure below:

![Regularity](/engineering-education/understanding-wavelet-properties/wavelet-regularity.png)

In the figure above, we have two wavelets, `db2` and `db10`. In both of them, we have the wavelet function and scaling function. As we can see, both the wavelet and scaling functions of `db10` are smoother than that of `db2`.

Also, `db10` has ten vanishing moments and `db2` has two vanishing moments. The higher the vanishing moments, the more regular the wavelet.

#### 4. Symmetry
This is a property that concerns whether wavelet filter characteristics have a linear phase or not.

Considering this property, `db` is not symmetric. Therefore, it can be preferred as a non-linear phase.

`Sym` and `coif` are near symmetric or almost linear phases. `Bior` is a linear phase. We can understand this better in the figure below:

![Symmetric](/engineering-education/understanding-wavelet-properties/wavelet-symetry.png)

We have used `db4` and `bior3.5` to clarify this. In the first figure, we represent the scale function of `db4`. The blue plot is the phase plot in the frequency domain.

As we can see, it is not symmetric. However, for the `bior3.5`, in the frequency domain, the plot is symmetric. This is used in the selection of wavelets for various applications.

#### 5. Orthogonality
It is the ability of the wavelet to conserve energy. Strict orthogonality is beneficial for the accurate reconstruction of the signal from decomposition coefficients. The scaling function and wavelet function are orthogonal.

`Haar, db, sym, coif, meyr` are orthogonal wavelets. `Bior and rbior` are bi-orthogonal, and the rest are not orthogonal.

The summary of wavelet classification is shown below:

![Classification](/engineering-education/understanding-wavelet-properties/wavelet-classification.png)

### Various applications and the appropriate wavelets
#### 1. Wavelet for feature extraction
If we want to find closely spaced features, we should choose a wavelet with smaller support such as `haar`, `db2`, or `sym2`. This is because the support of the wavelet should be small enough to separate features of interest.

Wavelets with large support tend to have difficulty detecting closely spaced features. It is because they can result in coefficients that do not distinguish individual features. To understand, look at the `haar` wavelet below:

![Haar](/engineering-education/understanding-wavelet-properties/haar-wavelet.png)

As is evident from the image above, closely spaced features are well represented by detailed coefficients at level one (db1).

Look at that of `db6` to get the difference:

![Db6](/engineering-education/understanding-wavelet-properties/db6-wavelet.png)

For this one, closely placed features are not well represented by detailed coefficients at level one (db1).

#### 2. Wavelet for denoising
An orthogonal wavelet such as `symlet` or `Daubechies` wavelet is good for denoising signals. However, a biorthogonal wavelet can also be good for image processing since its filters have a linear phase critical for image reconstruction.

`Symlet4` is good for signal denoising and `bior4.4` good for image denoising.

#### 3. Wavelet for compression
Consider a biorthogonal wavelet. Particularly `bior4.4` or `bior3.9` for compression because they are symmetric hence linear phase. Wavelets with higher vanishing moments should be considered because such wavelet produces fewer significant coefficients.

Therefore, the majority of coefficients can be neglected to achieve compression. Also, higher vanishing moments cause more regular wavelets, thereby achieving a smooth reconstruction of the image or signal.

#### Other applications
If the goal is to conduct an analysis variance, the maximal overlap DWT is suited for the task. The non-decimated DWT conserves energy in the analysis stage using orthogonal wavelets, i.e. `db`, `sym` etc.

Also, non-decimated DWT partition variance across scales, therefore suitable for analysis and financial data series. Let's look at an example of USA GDP in the year 2008:

![GDP](/engineering-education/understanding-wavelet-properties/usa-gdp.png)

If you look at `figure1` in the image above, you will have no idea what happened after 1982. This is how you can use non-decimated DWT to analyze variance data.

#### Image watermarking
Wavelets with higher vanishing moments and symmetry such as `bior6.8`.

### Edge detection
Wavelets with smaller support (less vanishing moments) such as `haar`, `bior1.1` etc.

### Ecg signal feature extraction
`Sym4` is widely used for this purpose. The shape of this wavelet matches that of the ecg signal.

### Conclusion
There are very many applications of wavelet and wavelet transform. These applications require the right wavelet and wavelet transform.

There are very many types of wavelets. We can apply every wavelet depending on its properties. To choose the right wavelet, you need a proper understanding of these properties.

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
