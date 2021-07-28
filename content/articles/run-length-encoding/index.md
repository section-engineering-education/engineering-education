### Introduction

In this article, we will look at how Run Length Encoding works in helping us reduce our file sizes.
Before delving into the topic, we will first get to know what is compression.

**Compression** - This is a process where a file size is reduced using algorithms resulting in a file that uses fewer storage bits than the original file.
For example, in a situation where one wants to send a picture to his/her friend, compression will be done at the source device and decompressed at the destination device. This enables the file to be sent faster and additionally, it reduces overhead traffic for transmitting the data.

Another example of compression is in social media apps. It is applied in applications such as WhatsApp where one will notice the image he/she sent is of lower quality and consumes much lesser space. Other apps also give users options in data saving settings for whether choosing whether the images and videos loaded should be of low quality or high quality. 

We also notice compression in video streaming sites where videos are loaded in low quality when there is low internet connectivity and vice versa. 

All of these are some of the few applications of data compression.

#### Types of Compression algorithms.

There two main classification types for compression algorithms are:

* **Lossy**
* **Lossless**

We use lossless algorithms where we want to retain our information and the quality.
The processes done by these algorithms are reversible and of very low compression ratios because we don't lose any information.
Examples include Run Length Encoding, Huffman coding, Arithmetic coding, Shannon-Fanno coding, etc.

> **Compression ratio** - This is gotten by dividing the size before compression, S1, and size after compression, S2. (`S1/S2`)

> You can view an article about Huffman Coding by [Lalithnarayan C](https://www.section.io/engineering-education/authors/lalithnarayan-c/) [here](https://www.section.io/engineering-education/huffman-coding-python/).


For the lossy algorithms, we use it where quality compromising is acceptable. We achieve high compression ratios hence greater size reduction.
The lossy compression process is non-reversible unlike the one for lossless compression algorithms.
Examples include Lossy predictive coding,  Block transform coding, and Vector quantization. (The links to these types of coding are found at the end of this article)

### Run Length Encoding(RLE).

This article is dedicated to RLE and its implementation using a simple Python code.

RLE is a statistical coding scheme where data is encoded based on their probability of occurrence. 

RLE reduces repetitive, consecutive data called **runs**. It does so by storing the number of these runs followed by the data. Let's look at examples.

For the text `AAAAAAAAAAAAAHHHEEM`(*19 characters*), RLE will encode it to get this `13A3H2EM`(7 characters).

For the text `AAAAHHHEEM, HAHA.`, it will be encoded as `4A3H2E1M1,1 1H1A1H1A1.`(*21 characters*).

From these examples, we see that RLE is suitable for compressing data with very many runs but not a few runs e.g image pixel data. This is because short runs may end up taking the same space or more as we see in the second example.

#### The Python code.

Let's jump into the Python code.

A basic understanding of Python is required. Familiarity with a notebook-based interface like Google Colab is required because we will be using that. You can as well use it in normal Python files.

It's a very simple algorithm to implement.

Create a new notebook and add the following code in the first cell.

```python
def encode_message(message):
    encoded_string = ""
    i = 0
    while (i <= len(message)-1):
        count = 1
        ch = message[i]
        j = i
        while (j < len(message)-1): 
            if (message[j] == message[j + 1]): 
                count = count + 1
                j = j + 1
            else: 
                break
        encoded_string = encoded_string + str(count) + ch
        i = j + 1
    return encoded_string
```

The code is for encoding a message.
It is a function `encode_message()` with a parameter `message` for the string to be encoded.

The variable, `encoded_string`, is for storing the encoded string. The `while` loop initializes the count to 1 for storing the human-readable count, 1, 2, 3, 4,...., instead of starting from 0. 

The innermost `while` loop checks if the character at the current index is the same as the character at the next index. If the characters are the same, the count is incremented to 1. If they are not the same, the counter is stopped, then the count and the character is concatenated to the `encoded_string` variable. This goes on until all the characters are encoded.

The `encoded_string` is returned after the function has finished executing.

The next function is for decoding the encoded message. Create a new cell and paste this code.

```python
def decode(our_message):
    decoded_message = ""
    i=0
    j=0
    while (i <= len(our_message)-1):
        run_count = int(our_message[i])
        run_word = our_message[i + 1]
        for j in range(run_count):
            decoded_message = decoded_message+run_word
            j = j + 1
        i = i + 2
    return decoded_message
```

THe function `decode()` takes in the parameter `our_message` for the encoded massage.

We have a variable `decoded_message` for storing the decoded string.

The `while` loop is for splitting the encoded message into respective counts, `run_count`, and the character, `run_word`, until it is finished. It contains a `for` loop for displaying the character multiple times specified by the count(`run_count`) to form a string. The string is then concatenated with the `decoded_message` variable. This continues until the decoded string is displayed in full.

Finally, we write the method for displaying what we have written. Again, open a new cell and paste this.

```python
def display():
    our_message = "AuuBBBCCCCCCcccccCCCCCCCCCA"
    encoded_message=encode_message(our_message)
    decoded_message=decode_message(encoded_message)
    print(encoded_message)
    print(decoded_message)
```

The function, `display()`, has the string to be encoded and decoded.

We then call the two methods for the process. We pass in the original string to the `encode_message()` function. After encoding, it is stored in the `encoded_message` variable. 

The encoded message, `encoded_message`, is passed to the `decode_message` function for decoding. Thereafter, the decoded message is stored in the `decoded_message` variable.

We then print the two messages. The output will be as shown below:

```bash
1A2u3B6C5c9C1A
AuuBBBCCCCCCcccccCCCCCCCCCA
```

And that's it. We have looked at what is compression, the types of compression, Run Length Encoding, and implementing it in Python.

### Further reading.

* [Lossy predictive coding](https://www.spiedigitallibrary.org/ebooks/TT/Digital-Image-Compression-Techniques/Chapter9/Lossy-Predictive-Coding/10.1117/3.34917.ch9).

* [Block transform coding](https://web.ece.ucsb.edu/~manj/ece178-Fall2009/e178-L14.ppt.pdf).

* [Vector quantization](https://www.spiedigitallibrary.org/ebooks/PM/Optical-Satellite-Data-Compression-and-Implementation/4/Vector-Quantization-Data-Compression/10.1117/3.1002297.ch4#:~:text=Vector%20quantization%20(VQ)%20is%20an,and%20speech%20and%20image%20coding.).

* [Arithmetic coding](https://en.wikipedia.org/wiki/Arithmetic_coding).

* [Shannon-Fanno coding](https://www.geeksforgeeks.org/shannon-fano-algorithm-for-data-compression/).

* [Transform coding](https://en.wikipedia.org/wiki/Transform_coding).

* [Predictive coding](https://web.stanford.edu/class/ee398a/handouts/lectures/06-Prediction.pdf).