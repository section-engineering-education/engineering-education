---
layout: engineering-education
status: publish
published: true
url: /video-editing-python-moviepy/
title: Editing Video with Python + MoviePy
description:  In this tutorial, we will use MoviePy, a Python library, to edit and add effects to a given video clip. This tutorial uses Python 3.7.4, MoviePy 1.0.3, PyCharm 2019.3.5 (Community Edition), and Windows 10.
author: nicholas-kross
date: 2021-02-26T00:00:00-13:00
topics: [Languages]
excerpt_separator: <!--more-->
images:
  - url: /engineering-education/video-editing-python-moviepy/hero.jpg
    alt: film reel example image
---
In this tutorial, we will use MoviePy, a Python library, to edit and add effects to a given video clip. Videos are great for getting ideas across. But editing those videos can take a long time.
<!--more-->

### Table of contents
- [Prerequisites](#prerequisites)
- [Why MoviePy? And When?](#why-moviepy-and-when)
- [Installing](#installing)
- [Basic Editing](#basic-editing)
- [Adding Effects](#adding-effects)
- [Putting It All Together](#putting-it-all-together)
- [Conclusion](#conclusion)

### Prerequisites
You should know the basics of Python 3 (including setting up projects). Having some basic knowledge about video files is helpful, but not necessary. This tutorial uses Python 3.7.4, MoviePy 1.0.3, PyCharm 2019.3.5 (Community Edition), and Windows 10.

### Why MoviePy? and When?
MoviePy is a Python module for editing videos. It can cut and arrange clips, add video effects, and edit audio. It can work like a toolbox, if you only make changes to one clip. If you have to edit lots of clips, MoviePy can automate that process.

In the workplace, MoviePy works best when every video is similar and simple to edit. For example, if you work for a TV studio, you might need to put together lots of clips from a football game. 

MoviePy could split a full game (hours of video) into a few clips. Then, it could overlay your company's watermark in the corner.

The task is simple, but a human would find it boring and time-wasting. Using MoviePy frees a video editor for more creative parts of the job. 

Thus, the module is good for any editing job where you *know* exactly what to do... and doing it by hand would take too long. This can mean TV programs, data visualizations, visual effects footage, supercuts, and more.

### Installing
#### Installing MoviePy
First, set up a folder with a new Python script `moviepy_test.py`. Then install the package `moviepy`. In your terminal, you can do this with the command `pip install moviepy`. Other ways to install MoviePy are shown [here](https://zulko.github.io/moviepy/install.html).

#### Downloading the raw video
Now, we need to download the "raw footage", the video clip that we haven't edited. For this example, we'll be using a sample `.mp4` file provided by [Learning Container](https://www.learningcontainer.com/mp4-sample-video-files-download/#Sample_MP4_File). 

The `.mp4` file, `sample-mp4-file.mp4`, is a video clip from the Blender Foundation short film [*Big Buck Bunny*](https://www.youtube.com/watch?v=YE7VzlLtp-4).

Go to this [link for the video file](https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4). Download it by pressing `Ctrl-S` (or clicking File>Save in your browser, or the 3 dots in the video player and "Download"). 

Move `sample-mp4-file.mp4` to the folder with `moviepy_test.py`. 

The video should look like this by default:

<iframe width="478" height="269" src="https://www.youtube.com/embed/awhxIqnmtMQ" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

### Basic editing
The key objects in MoviePy are **VideoClips**. 

A VideoClip contains video and sound. Open up `moviepy_test.py` and add these lines:

```python
from moviepy.editor import *

clip = VideoFileClip("sample-mp4-file.mp4")
```

The module `moviepy.editor` contains the objects and methods we're using. `clip` is a new VideoFileClip object, initialized with the name (or filepath) of the video file at hand.

We don't want to use the whole *Big Buck Bunny* clip. We only need 10 seconds from the middle of it. 

MoviePy measures time in seconds, and we can use the `subclip` method to get what we need:

```python
clip = VideoFileClip("sample-mp4-file.mp4").subclip(56, 66)
```

Now that we can create different video segments, from one file, we can start making "cuts". Make 3 more clips, from different parts of the video. 

Put these clips together in a list, and chain them together with `concatenate_videoclips`. **Concatenate** means "link together", as we edit the clips into one video.

```python
final_clip = concatenate_videoclips([clip, clip2, clip3, clip4])
```

Finally, to get our finished video, we use the `write_videofile` method on `final_clip`. Your final code should look like the code below.

```python
from moviepy.editor import *

# clip is the video from 00:56 to 01:06
clip = VideoFileClip("sample-mp4-file.mp4").subclip(56, 66)
clip2 = VideoFileClip("sample-mp4-file.mp4").subclip(70, 76)
clip3 = VideoFileClip("sample-mp4-file.mp4").subclip(50, 52)
clip4 = VideoFileClip("sample-mp4-file.mp4").subclip(30, 35)

final_clip = concatenate_videoclips([clip, clip2, clip3, clip4])

final_clip.write_videofile("output_1.mp4")
```

Save and run your code. It may take 30-60 seconds to finish running. You should get a new video, `output_1.mp4`, shorter than the original .mp4 file, in your folder. You can watch your new video by double-clicking it. 

It should be much shorter:

<iframe width="478" height="269" src="https://www.youtube.com/embed/dVUUgxRrCTU" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

### Adding effects
#### Video effects
MoviePy can do more than just cut and rearrange video. The module `moviepy.editor` also contains submodules. `vfx` holds video effects, and `afx` holds audio effects.

To add any effect to a clip, you use the `fx` method on the clip, and pass in the effect and any parameters. For convenience, put the entire VideoFileClip in parentheses `()`. For many effects, put each `.fx` call on a new line.

```python
clip = (VideoFileClip("sample-mp4-file.mp4").subclip(56, 66)
    .fx(vfx.colorx, 0.7))

# you can also do this with clip_edited = clip.fx(vfx.colorx, 0.7)
```

Our clip is getting called with `.fx( vfx.colorx, 1.2)`. MoviePy reads this as "apply the vfx.colorx effect and with the parameter of 1.2". 

What this *does* is make the clip 20% brighter than it was before (since +20% brightness = 1.2x as bright).

You can stack several effects, with the same strategy:

```python
clip = (VideoFileClip("sample-mp4-file.mp4").subclip(56, 66)
        .fx(vfx.colorx, 1.2)  # 20% brighter
        .fx(vfx.lum_contrast, 0, 40, 127))  # and increase the contrast
```

Let's do this with clip 2 and `invert_colors`, and output our results.

```python
from moviepy.editor import *

clip = (VideoFileClip("sample-mp4-file.mp4").subclip(56, 66)
        .fx(vfx.colorx, 1.2)  # 20% brighter
        .fx(vfx.lum_contrast, 0, 40, 127))  # and increase the contrast
clip2 = (VideoFileClip("sample-mp4-file.mp4").subclip(70, 76)
        .fx(vfx.invert_colors))
clip3 = VideoFileClip("sample-mp4-file.mp4").subclip(50, 52)
clip4 = VideoFileClip("sample-mp4-file.mp4").subclip(30, 35)

final_clip = concatenate_videoclips([clip, clip2, clip3, clip4])

final_clip.write_videofile("output_2.mp4")
```

Our new output should look bright and distorted in the first part. The second part should be "color-inverted", where colors become their opposites. This means black would change to white.

<iframe width="478" height="269" src="https://www.youtube.com/embed/ndzBa6zo_Z8" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

#### Audio effects
We've changed the image, but we haven't yet changed the sound.

**AudioClips** in MoviePy work much the same as VideoClips. We create a new AudioFileClip in the same way we created a VideoFileClip. 

Download [this sample .mp3 file](https://bit.ly/3bLRrDZ), a public domain song by Kevin MacLeod. Like with the `.mp4` file, download the music `.mp3` and place it in the directory with `moviepy_test.py`. 

Now you can import the clip and excerpt the first 10 seconds:

```python
musicclip = AudioFileClip("Study and Relax.mp3").subclip(0, 6)
```

We'll use this music in [the next section](#putting-it-all-together).

Audio clips can also come from the audio of a video clip. Let's extract the audio from our first video clip, so we can use the sound on its own:

```python
audioclip = clip.audio
```

MoviePy has plenty of audio effects, and you can stack them like the video effects. 

Audio effects are in the `afx` submodule:

```python
audioclip = (clip.audio).afx(afx.volumex, 1.2).afx(afx.audio_fadein, 1.0)
# Make the sound 20% louder, and fade it in over 1 second
```

The `set_audio` function replaces a video clip's audio with a new audio clip. We use this to create a new version of the first clip in our video. 

The end of your program should look like this:

```python
musicclip = AudioFileClip("Study and Relax.mp3").subclip(0, 6)
audioclip = (clip.audio).fx(afx.volumex, 1.2).fx(afx.audio_fadein, 1.0)
# Make the sound 20% louder, and fade it in over 1 second
clip_v2 = clip.set_audio(audioclip)  # new first clip

final_clip = concatenate_videoclips([clip_v2, clip2, clip3, clip4])

final_clip.write_videofile("output_3.mp4")
```

<iframe width="478" height="269" src="https://www.youtube.com/embed/XK753eNjuqw" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

### Putting it all together
Perhaps you want to stack video clips on top of each other. Or, maybe play music over the video. For these features, we need **compositing**.

Compositing is the process of putting one thing on top of another. To play two videos on top of each other, you composite their videos together. To play music on top of the video's current audio, you composite the audios together.

Let's play a smaller version of the final clip in our video, but on top of the first clip. 

We need to create a CompositeVideoClip out of clip4 and clip_v2:

```python
composite_start_of_video = CompositeVideoClip([clip_v2,
                                               clip4.fx(vfx.resize, 0.6)])
# clip4 is smaller (60% original size), and on top of clip_v2
```

The clip on top also needs to be smaller. Otherwise, the bottom clip would be completely hidden by the top clip.

We also have to remove the sound from clip4. Otherwise, overlaying both clips would play both their audios.

```python
composite_start_of_video = CompositeVideoClip([clip_v2,
                                               clip4.fx(vfx.resize, 0.6).fx(afx.volumex, 0.0)])
# clip4 is smaller (60% original size), and on top of clip_v2
```

A similar setup will add our music to the second clip. Extract the second clip's original audio, and composite it with the music audio. Then, replace the clip's audio with the composite. The whole editing part of the script should have these steps.

```python
musicclip = AudioFileClip("Study and Relax.mp3").subclip(0, 6)
audioclip = (clip.audio).fx(afx.volumex, 1.2).fx(afx.audio_fadein, 1.0)
# Make the sound 20% louder, and fade it in over 1 second
clip_v2 = clip.set_audio(audioclip)  # new first clip

composite_start_of_video = CompositeVideoClip([clip_v2,
                                               clip4.fx(vfx.resize, 0.6).fx(afx.volumex, 0.0)])
# clip4 is smaller (60% original size), and on top of clip_v2

clip2_audio = (clip2.audio).fx(afx.volumex, 1.5)  # 50% louder, so we can hear over our music
composite_second_clip_audio = CompositeAudioClip([clip2_audio,
                                                  (musicclip).fx(afx.volumex, 0.3)])  # 70% quieter
clip2_v2 = clip2.set_audio(composite_second_clip_audio)

final_clip = concatenate_videoclips([composite_start_of_video, clip2_v2, clip3, clip4])

final_clip.write_videofile("output_4.mp4")
```

The final result now has the music, overlaid clips, and all the previous edits.

<iframe width="478" height="269" src="https://www.youtube.com/embed/lDBJhMxXFB0" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

### Conclusion
Good job! You've just edited and remixed a video, all in a Python program. There are plenty of other things you can do with MoviePy, now that you know the basics. 

For more ideas, check out the [MoviePy Project Galley](https://zulko.github.io/moviepy/gallery.html). MoviePy can even automate large video processing jobs, using [other built-in features](https://zulko.github.io/moviepy/getting_started/efficient_moviepy.html) to speed those up.

Happy coding.

---
Peer Review Contributions by: [Daniel Katungi](/engineering-education/authors/daniel-katungi/)
