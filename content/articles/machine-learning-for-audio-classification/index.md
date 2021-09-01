Machine learning has shown exemplary results when understanding our environment using vision. But one area where machine learning hasn't been used much is in sound. This is because sound can give us a perspective that is not directional like in a camera. It does not depend on illumination and you can hear sound the same way no matter if it's day or night and from a much further distance. This creates additional challenges.

But as it turns out, converting sound waves into audio then to spectrograms (visual representation of frequencies) can allow us to use machine learning on audio. Machine learning for audio can be used in pitch detection, to understand speech, understand musical instruments, and in audio and music generation. For our case, we'll use it for classification. A good example of an audio classification problem is for a machine to tell whether an audio is either speech or music.

In this tutorial, you'll get an introduction to Machine Learning for audio classification and also some of the theory that is needed to understand it. Also, using an example, we will be implementing an audio classification task using TensorFlow.

### Table of contents
- [Differences between sound and audio](#differences-between-sound-and-audio)
- [What is a spectrogram?](#what-is-a-spectrogram)
- [Wrapping up](#wrapping-up)

### Differences between sound and audio
Sound is what you hear.

A better definition of sound is that it's a vibration that propagates as an acoustic wave. Notable properties of sound includes frequencies, speed, amplitude, and direction. When talking about basic usage of machine learning in this domain, only frequency and amplitude are the important features.

Sound waves can often be simplified to sinusoidal waves. A sinusoidal wave shows us how the amplitude of a variable changes with time.

To capture sound into its electronic representation, we use a microphone.

Audio is the electronic representation of sound. The audio frequencies that humans can hear range from 20Hz to 20 KHz. Frequencies below 20Hz and above 20KHz are inaudible for humans because they are either too low or too high. These samples over time results in a waveform.

But can we apply machine learning to these waveforms?

No. At least not yet. This's where one last concept can help us.

### What is a spectrogram?

The diagram below shows a spectrogram.

![Spectrogram](/engineering-education/machine-learning-for-audio-classification/spectrogram.png)

*[Image Source: PNSN](https://pnsn.org/spectrograms/what-is-a-spectrogram)*

A [spectrogram](https://pnsn.org/spectrograms/what-is-a-spectrogram) is a visual representation of all frequencies over time. The Y-axis is the frequency in hertz while the X-axis represents the time. The color represents the magnitude or amplitude. The color in a spectrogram is either brighter or higher, and represented in decibels (unit of measure).

We can convert a waveform to a spectrogram. Technically, this is equivalent to an image. Researchers have found that we can effectively apply computer vision techniques to the spectrogram. This means that we can classify sound with the same techniques used to classify images. 

With these, a machine learning model can extract the dominant audio per time frame in a waveform by finding patterns in the spectrogram.

Now that you know a little more about audio and how machine learning can classify it, let's implement an audio classification task using TensorFlow.

