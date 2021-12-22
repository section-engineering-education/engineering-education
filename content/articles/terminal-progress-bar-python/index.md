---
layout: engineering-education
status: publish
published: true
url: /terminal-progress-bar-python/
title: Terminal Progress Bar in Python
description: In this article we will discuss building a progress bar using several libraries in Python.
author: sandra-moringa
date: 2021-11-02T00:00:00-08:45
topics: [Languages]
excerpt_separator: <!--more-->
images:

 - url: /engineering-education/terminal-progress-bar-python/hero.jpg
   alt: Terminal Progress Bar in Python Example Image
---
Maybe your application involves file uploads or downloads at some point through the terminal/console. You will, at one point, want to show the progress in the said interface. Terminal progress bars are a great way to visualize to the user the progress of an underlying task. We will look at how to do that using file downloads.

There are various libraries to do that in Python, including tqdm, Progress, Alive Progress, etc.

### Prerequisites

To follow along with this tutorial, you need to have: 
- A good understanding of Python.

There will be a few deep concepts in Python, so a good understanding is needed.

> Since what we will work is linked to the terminal, we will not be using any notebook-based technology.

### A primer on file downloads in Python
Before we get into the topic, we will first look at a basic download script in Python. Then, we will download an image.

```python
import urllib.request

def Handle_Progress(block_num, block_size, total_size):
        read_data= 0
        # calculating the progress
        # storing a temporary value  to store downloaded bytesso that we can add it later to the overall downloaded data
        temp = block_num * block_size
        read_data = temp + read_data
        #calculating the remaining size
        remaining_size = total_size - read_data
        if(remaining_size<=0):
            downloaded_percentage = 100
            remaining_size = 0
        else:
            downloaded_percentage = int(((total_size-remaining_size) / total_size)*(100))
              
        print(read_data," : ", remaining_size," : ", downloaded_percentage," : ", total_size)
            
def Download_File():
        #the url where the file is found
        download_url = 'https://sacco.terrence-aluda.com/sacco/images/ab1.jpg'
        #opening the file
        site = urllib.request.urlopen(download_url)
        #getting the meta data
        meta = site.info()
        print("File size in bytes", meta.get("Content-Length"))
        print("Downloaded data: Remaining size: Downloaded percentage: Total size")
        #where the file will be saved
        save_location = 'thispic.png'
        #downloading the file
        urllib.request.urlretrieve(download_url,save_location, Handle_Progress)
        
Download_File()

```
The `Download_File()` function first gets the size of the file in bytes from the file's meta response header information, *Content-Length*. After getting the file's contents, that is done using the imported module's `urlopen()` method.

After that, it starts downloading the file using the `urlretrieve()` method. This method takes in three parameters, as explained below.
1. `download_url` - The URL where the file to be downloaded is located.
2. `save_location` - The location where the downloaded file will be stored.
3. `Handle_Progress` - The function for processing the download progress is passed as a callback. We'll look at this function in the next part.

> Callbacks in Python, or any other language, are functions that are executed after a certain code is executed. They are usually passed in as arguments to other functions. For example, an everyday use case displays some text after a file has finished being loaded/read from the machine's storage. Read more about callbacks in Python [here](https://pythonexamples.org/python-callback-function/).

```python
def Handle_Progress(block_num, block_size, total_size):
        read_data= 0
        # calculating the progress
        # storing a temporary value  to store downloaded bytes so that we can add it later to the overall downloaded data
        temp = block_num * block_size
        read_data = temp + read_data
        #calculating the remaining size
        remaining_size = total_size - read_data
        if(remaining_size<=0):
            downloaded_percentage = 100
            remaining_size = 0
        else:
            downloaded_percentage = int(((total_size-remaining_size) / total_size)*(100))
              
        print(read_data," : ", remaining_size," : ", downloaded_percentage," : ", total_size)
```

This function takes three parameters:
1. `block_num` - The block number. The method gets the file in blocks.
2. `block_size` - The size in bytes of the block.
3. `total_size` - The total size in bytes of the file.

Using these three parameters, it calculates the downloaded size(`read_data`), remaining size(`remaining_size`), and downloaded percentage(`downloaded_percentage`).
 > It gets the downloaded size by calculating the block number multiplied by the block size, then repeatedly adds it until the file finishes downloading.

The `if` function checks for the remaining size. If it is less than 0, then it means the file is fully downloaded. Therefore, the downloaded percentage is 100%, and the remaining size is 0.

On running the file, you should see this output. Of course, it's not so pretty, but it just gives you an idea of the progress.
```bash
File size in bytes 10905
Downloaded data: Remaining size: Downloaded percentage: Total size
0  :  10905  :  0  :  10905
8192  :  2713  :  75  :  10905
16384  :  0  :  100  :  10905
```

It outputs several times since the `urllib.request.urlretrieve()` method runs several times before the file is completed.

### Progress bars
As we have seen, the progress we produced doesn't look that intuitive. For that reason, we have to seek the help of progress bars. The good news is that, in Python, we have several libraries we can use to perform the task. For our case, we will not use any of the libraries, but we will build our simple bar. We will do that using the `requests` library since it easily iterates an HTTP response.

> The code is a bit simpler and does not use functions like the previous one, but the concepts are still the same. So you can modify it later to fit your situation.

Let's look at the script.
```python
import requests

link = "https://sacco.terrence-aluda.com/sacco/images/"
file_name = "ab1.jpg"
#creating the file with write binary flag
with open(file_name, "wb") as f:
    print("Downloading %s" % file_name)
    response = requests.get(link)
    #getting the file size
    total_size = response.headers.get('content-length')
    if total_size is None: # no content length header
        f.write(response.content)
    else:
        downloaded_data = 0
        total_size = int(total_size)
        for file_data in response.iter_content(chunk_size=8192):
            #storing the downloaded data
            downloaded_data += len(file_data)
            #writing the contents to the file
            f.write(file_data)
            #calculating what number of characters is to be displayed in the bar
            portion = int(50 * downloaded_data / total_size)
            print("[%s]" % ('#' * portion) )
```

**NOTE:** Be sure to install the `requests` library using pip.

```bash
$ pip install requests
```
It's a `with` statement which opens a file with the assigned name and writes it in binary. It then prints a *"Downloading file_name"* statement to the terminal.

We then get, as we did before, the file size. After that, we check for the presence of the 'content-length' header. If it's not there, we write the HTTP response's contents to the file opened.

In the `for` loop, we iterate the HTTP response in block sizes of 8192, although the block size doesn't matter. You can place any number there apart from 0 or a negative number. 

The logic is more similar to the previous code snippet, but we write a statement for calculating the number of characters to be displayed in the bar.
We want to display 50 # symbols, each representing 2% of the downloaded file. If we wanted 10 symbols, we could write there 10, each representing 10%, and so on.
```python
portion = int(50 * downloaded_data / total_size)
```
*Percentage represented = Total number of #s * (Downloaded data/Total file size)*.

In the print statement, we multiply the # with the number we set in the statement we've just discussed, i.e. 50 times.

We will see such an output:
```bash
Downloading ab1.jpg
[##################################################]
```
### Further reading
You can have a look at the libraries to do the same task quickly with a few lines of code and more animated features using these links:
1. [Progress](https://pypi.org/project/progress/1.5/)
2. [tqdm](https://github.com/tqdm/tqdm)
3. [Alive Progress](https://pypi.org/project/alive-progress/)

Progress is a good one to explore. An example of producing with a timing function is shown below:
```python
import time
from progress.bar import FillingSquaresBar

bar = FillingSquaresBar('Downloading')
for item in range(100):
    bar.next()
    time.sleep(1)
bar.finish()
```
We let the bar delay for a second before incrementing(`time.sleep(1)`).

It will display this:
```bash
Downloading ▣▣▣▣▢▢▢▢▢▢▢▢▢▢▢▢▢▢▢▢▢▢▢▢▢▢▢▢▢▢▢▢ 15%
```
It has a lot of different types of bars to choose from. Find them out in its documentation.

[Here](https://towardsdatascience.com/learning-to-use-progress-bars-in-python-2dc436de81e5) is an article that has demonstrated their usage.

### Conclusion
We looked at the basic process of downloading files in Python and how to display the progress of the download. I hope you will dive further.
 
---
Peer Review Contributions by: [Lalithnarayan C](/engineering-education/authors/lalithnarayan-c/)
