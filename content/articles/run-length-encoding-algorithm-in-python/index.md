---
layout: engineering-education
status: publish
published: true
url: /run-length-encoding-algorithm-in-python/
title: Run Length Encoding (RLE) Compression Algorithm in Python
description: This article will be an overview of understanding what compression is, different types of compression, and a brief intro to RLE algorithm and its implementation.
author: terrence-aluda
date: 2021-08-12T00:00:00-06:48
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/run-length-encoding-algorithm-in-python/hero.jpg
    alt: RLE Algo image
---
Run Length Encoding is a lossless data compression algorithm. It compresses data by reducing repetitive, and consecutive data called **runs**. It does so by storing the number of these runs followed by the data.
<!--more-->
In this article, we will learn more about Compression algorithms, dive deep into implementing RLE algorithm and understand its performance.

### Table of contents
1. [Prerequisites](#prerequisites)
2. [Introduction](#introduction)
3. [Compression](#compression)
4. [Types of compression algorithms](#types-of-compression-algorithms)
5. [Implementation](#implementation)
6. [Time Complexity](#time-complexity)
7. [Conclusion](#conclusion)
8. [Further reading](#further-reading)

### Prerequisites
To follow along with this tutorial, the reader should have:
1. A basic understanding of Python. 
2. Familiarity with a notebook-based interface like Google Colab. Normal Python files could be used as well.

### Introduction
Before we understand RLE, let's have a look at few examples:

1. For the text `AAAAAAAAAAAAAHHHEEM` (*19 characters*), RLE will encode it to `13A3H2EM` (7 characters).
2. For the text `AAAAHHHEEM, HAHA.`, it will be encoded as `4A3H2E1M1,1 1H1A1H1A1.` (*21 characters*).

From these examples, we see that RLE is suitable for compressing large amounts of data with a few runs e.g., image pixel information. This is because short runs may end up taking the same space or more as we see in the second example.

### Compression
This is a process where a file size is reduced using algorithms resulting in a file that uses fewer storage bits than the original file.

1. In a situation where one wants to send a picture to his/her friend, compression will be done at the source device and decompressed at the destination device. This enables the file to be sent faster, and it reduces overhead traffic for transmitting the data.
2. In social media apps like WhatsApp, we notice that the image received is of lower quality and consumes much lesser space. For a few apps, we can set the quality of media to be downloaded.
3. We also notice that compression in video streaming sites, where videos are loaded in low quality during poor internet connectivity. 

### Types of compression algorithms
There two main classification types for compression algorithms are:

#### 1. Lossless algorithm
Lossless algorithms are used when information quality is very important. We try to avoid the loss of image quality.

These processes are reversible, and they've very low compression ratios since we don't lose any information.

Examples include Run Length Encoding (RLE), Huffman coding, [Arithmetic coding](https://en.wikipedia.org/wiki/Arithmetic_coding), [Shannon-Fanno coding](https://www.geeksforgeeks.org/shannon-fano-algorithm-for-data-compression/), etc.

> **Compression ratio** - We get this ratio by dividing the size before compression and size after compression. (`Size before compression/Size after compression`).

You can read more about Huffman coding [here](/engineering-education/huffman-coding-python/).

#### 2. Lossy algorithm
We use lossy algorithms where quality could be compromised. Here, we achieve high compression ratios, hence greater size reduction.

The lossy compression process is non-reversible, unlike the one for lossless compression algorithms.

Examples include [Lossy predictive coding](https://www.spiedigitallibrary.org/ebooks/TT/Digital-Image-Compression-Techniques/Chapter9/Lossy-Predictive-Coding/10.1117/3.34917.ch9),  [Block transform coding](https://web.ece.ucsb.edu/~manj/ece178-Fall2009/e178-L14.ppt.pdf), and [Vector quantization](https://www.spiedigitallibrary.org/ebooks/PM/Optical-Satellite-Data-Compression-and-Implementation/4/Vector-Quantization-Data-Compression/10.1117/3.1002297.ch4).

### Implementation
Let's jump into the Python code.

Create a new notebook and add the following code to the first cell.

```python
def encode_message(message):
    encoded_string = ""
    i = 0
    while (i <= len(message)-1):
        count = 1
        ch = message[i]
        j = i
        while (j < len(message)-1): 
        '''if the character at the current index is the same as the character at the next index. If the characters are the same, the count is incremented to 1'''    
            if (message[j] == message[j + 1]): 
                count = count + 1
                j = j + 1
            else: 
                break
        '''the count and the character is concatenated to the encoded string'''
        encoded_string = encoded_string + str(count) + ch
        i = j + 1
    return encoded_string
```

The above snippet contains a function `encode_message()` with a parameter `message` (string) to be encoded.

The variable, `encoded_string` is used for storing the encoded string. The `while` loop is initialized with the count of `1` (one-indexed), and looped through the whole message
The innermost `while` loop checks if the character at the current index is the same as the character at the next index.

If the characters are the same, the count is incremented to `1`. If not, the count and the character are concatenated to the `encoded_string` variable and returned.

Next, we have to write a function for decoding the encoded messages. Create a new cell and paste this code:

```python
def decode(our_message):
    decoded_message = ""
    i = 0
    j = 0
    # splitting the encoded message into respective counts
    while (i <= len(our_message) - 1):
        run_count = int(our_message[i])
        run_word = our_message[i + 1]
        # displaying the character multiple times specified by the count
        for j in range(run_count):
            # concatenated with the decoded message
            decoded_message = decoded_message+run_word
            j = j + 1
        i = i + 2
    return decoded_message
```

The function `decode()` takes in the parameter `our_message` containing the encoded message. The variable `decoded_message` stores the decoded string.

The `while` loop is used for separating out the encoded message into respective counts `run_count`, and the characters `run_word`, until it is finished.

It contains a `for` loop for displaying the character multiple times specified by the count (`run_count`) to form a string. The string is then concatenated with the `decoded_message` variable. This continues until the decoded string is displayed in full.

Finally, we write the method for displaying what we have written. Again, open a new cell and add the following:

```python
def display():
    # the original string
    our_message = "AuuBBBCCCCCCcccccCCCCCCCCCA"
    # pass in the original string
    encoded_message=encode_message(our_message)
    # pass in the decoded string
    decoded_message=decode_message(encoded_message)
    print("Original string: [" + our_message + "]")
    print("Encoded string: [" + encoded_message +"]")
    print("Decoded string: [" + decoded_message +"]")
```

The function, `display()`, has the string to be encoded and decoded.

We then call the two methods for the process. We pass in the original string to the `encode_message()` function. After encoding, it is stored in the `encoded_message` variable. 

The encoded message, `encoded_message`, is passed to the `decode_message` function for decoding. Thereafter, the decoded message is stored in the `decoded_message` variable.

The output will be as shown below:

```bash
Original string: [AuuBBBCCCCCCcccccCCCCCCCCCA]
Encoded string: [1A2u3B6C5c9C1A]
Decoded string: [AuuBBBCCCCCCcccccCCCCCCCCCA]
```

The Colab notebook for this code is found [here](https://colab.research.google.com/drive/1Thf9CLJkhjGQE-XN2IkSwW2SuZ8TAXoh?usp=sharing).

### Time complexity
The algorithm has `O(n)` complexity compared to other lossless algorithms like Huffman with a complexity of `O(nlogn)`, which is computationally more expensive than RLE.

RLE performs poorly on large amounts of data. This is clearly explained in [this research paper](https://core.ac.uk/download/pdf/228547034.pdf).

You can learn about calculating time and space complexities [here](/engineering-education/big-o-notation/).

### Conclusion
To conclude, we have learned what compression is, the types of compression, the Run Length Encoding algorithm, and its implementation in Python.

Happy coding!

### Further reading
- [Transform coding](https://en.wikipedia.org/wiki/Transform_coding)
- [Predictive coding](https://web.stanford.edu/class/ee398a/handouts/lectures/06-Prediction.pdf)

---
Peer Review Contributions by: [Srishilesh P S](/engineering-education/authors/srishilesh-p-s/)