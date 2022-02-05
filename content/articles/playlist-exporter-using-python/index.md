---
layout: engineering-education
status: publish
published: true
url: /building-a-playlist-exporter-in-python/
title: Building a Playlist Exporter in Python Using Mutagen
description: This article will walk you through building a playlist exporter in Python using the Mutagen. The exporter will be able to export a playlist in M3U and JSON formats.
author: wanjiru-alice
date: 2022-01-26T00:00:00-10:30
topics: [Languages]
excerpt_separator: <!--more-->
images:
  - url: /engineering-education/building-a-playlist-exporter-in-python/hero.jpg
    alt: Building a playlist exporter in Python using Mutagen image
---
Music is one of the most important parts of the human experience. Although nowadays most music is streamed online, some people still prefer to download it as audio files for offline listening.
<!--more-->
Audio files are a great way to store music as well as other information about the music. However, it's not always easy to export the information from the audio files to a playlist format.

That's where a playlist exporter comes in. It's a software that can be used to export the information from the audio files to a format that can be interpretted by audio players. The resulting playlist can also be used to find your music in streaming services with the help of uploaders like [Soundiiz](https://soundiiz.com/).

In this tutorial, we will learn how to build a playlist exporter in Python using the Mutagen audio library.

### Prerequisites
To follow along with this tutorial, you will need to have Python 3.6 or later installed. You will also a bunch of music files to work with. Both MP3 and FLAC formats are okay.

### Step 1: Setting up the environment
To get started, you will need a virtual environment to separate your Python code from the rest of your system.

To create a virtual environment, run the following command in your terminal:

```bash
$ python3 -m venv venv
```

> If you are using a Windows machine, the Python executable might not be called `python3`. It might be `python` or `py`.

To activate the virtual environment, run the following command in your terminal:

```bash
$ source venv/bin/activate
```

Feel free to use other virtual environment managers, like Pipenv or Conda if you have them installed.

### Step 2: Dumping the playlist as M3U file
M3U files are a simple text file format that can be used to store a music playlist. It consists of a list of paths to each music file. In case the music files are not locally available, direct links to the remote source is used instead.

Here's the content of a sample M3U file:

```txt
01. Smells Like Teen Spirit.flac
02. In Bloom.flac
03. Come As You Are.flac
04. Breed.flac
05. Lithium.flac
06. Polly.flac
07. Territorial Pissings.flac
08. Drain You.flac
09. Lounge Act.flac
10. Stay Away.flac
11. On A Plain.flac
12. Something In The Way.flac
```

The paths of the items listed above are relative to the directory where the M3U file is located. Moving the file to another directory will not locate the original music files.

It's important to note that if full paths to the music files is used, the M3U file can be moved around without breaking. Also, if you use relative file paths, moving the M3U file alone will break the playlist. In this case, you are required to store the playlist file inside the music folder.

Let's generate a M3U playlist. My music files are located in the `~/Music/Nirvana - Nevermind` directory.

Create an `app.py` in your virtual environment and write the following code:

```python
import os

music_path = "Music/Nirvana - Nevermind"
full_path = os.path.join(os.path.expanduser("~"), music_path)

ext = [".mp3", ".flac"]

files = os.scandir(full_path)
playlist = []

for entry in files:
    if entry.is_file():
        if os.path.splitext(entry.name)[1].lower() in ext:
            playlist.append(entry.name + " \n")


file = open(os.path.join(full_path, "{}.m3u".format(
    os.path.basename(full_path)
)), "w")

file.writelines(playlist)
file.close()
```

We are using the `os.scandir` function to scan the directory for files. The function returns an iterator that yields `os.DirEntry` objects.

We check if the entry is a file by calling the `is_file` method. If the file has the extension we are looking for, we add it to the playlist. We then open a M3U file with the same name as the directory basename and write the playlist to it.

Now I have a `Nirvana - Nevermind.M3U` in my `~/Music/Nirvana - Nevermind` directory.

### Step 3: Dumping the playlist with ID3 tags
If your music files aren't named properly or you just need more data for exporting to a streaming service or whatever, a simple M3U file might not always work for you. That's where Mutagen comes in.

Mutagen is a Python library that allows you to read and write metadata from audio files. It is a wrapper around the standard Python libraries `mutagen` and `mutagen.id3`.

To install mutagen in your environment, run the following command in your activated virtual environment:

```bash
$ pip install mutagen
```

Then use `os.scandir` together with Mutagen to export your playlist to a JSON file with ID3 tags:

```python
import os

from mutagen.mp3 import MP3
from mutagen.flac import FLAC

dir = "Music/Nirvana - Nevermind"
full_path = os.path.join(os.path.expanduser("~"), dir)

files = os.scandir(full_path)

for entry in files:
    if entry.is_file():
        if entry.name.endswith(".mp3"):
            audio = MP3(entry.path)
        elif entry.name.endswith(".flac"):
            audio = FLAC(entry.path)

    try:
        artists = audio['artist'][0]
    except KeyError:
        try:
            artists = audio['TPE1'][0]
        except:
            artists = 'Unknown'
    except IndexError:
        artists = 'Unknown'

    print(artists)
```

We are using the `MP3` and `FLAC` classes from the `mutagen.mp3` and `mutagen.flac` modules to read the ID3 tags. The `MP3` class is used for MP3 files and the `FLAC` class is used for FLAC files.

The `try` block is used to catch the `KeyError` exception, which occurs if the **tag** is not found. If the file is an MP3 file and the tag `artist` is not found, we try to read the tag `TPE1`. If the tag is not found, we set the artist to `Unknown`. The `IndexError` exception is used to catch the case when the **tag data** is not found.

FLAC files have a tag called `artist` and MP3 files have a tag called `TPE1`. That's why the `try` block is necessary.

Here are some of the other tags that can be read:

| FLAC        | MP3  | Tag          | Description                    |
| ----------- | ---- | ------------ | ------------------------------ |
| title       | TIT2 | title        | title of the audio file        |
| artist      | TPE1 | artist       | artist of the audio file       |
| album       | TALB | album        | album of the audio file        |
| albumartist | TPE2 | album artist | album artist of the audio file |
| genre       | TCON | genre        | genre of the audio file        |

> Please note: These tags are not saved for all audio files.

Now that we have the ID3 tags, we can dump the playlist to a JSON file.

```python
import json

# ...
tags_list = []

for entry in files:
    # your try catch blocks here

    tags = {
        "artists": artists,
        # your other tags here
    }

    tags_list.append(tags)


tags_json = json.dumps(tags_list, indent=4)

file = open(os.path.join(full_path, "{}.json".format(
    os.path.basename(full_path)
)), "w")
file.write(tags_json)

file.close()
```

We are combining all the tags into a single dictionary and dumping it to a JSON file. We use the `json.dumps` function to convert the dictionary to a JSON string. We use the `indent=4` option to make the JSON file more readable.

I now have a `Nirvana - Nevermind.json` in my `~/Music/Nirvana - Nevermind` directory.

### Conclusion
Creating a playlist file in Python is relatively easy. Using `os.scandir` you can create a simple M3U playlist file (which is enough on most cases). Using Mutagen you can also export the playlist to a JSON file with ID3 tags.

Happy coding!

### Further reading
- [Mutagen Docs](https://mutagen.readthedocs.io/en/latest/)
- [All ID3 tags - MP3TAG.de](https://help.mp3tag.de/main_tags.html)

---
Peer Review Contributions by: [Geoffrey Mungai](/engineering-education/authors/geoffrey-mungai/)
