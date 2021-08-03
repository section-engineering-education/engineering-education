### Table of contents
1. [Introduction](#introduction)
2. [Compression](#compression)
3. [Types of Compression algorithms](#types-of-compression-algorithms)
4. [Prerequisites](#prerequisites)
5. [The Python code](#the-python-code)
6. [Time Complexity](#time-complexity)
7. [Conclusion](#conclusion)
8. [Further reading](#further-reading)

### Introduction

RLE is a lossless data compression algorithm. It compresses data by reducing repetitive, consecutive data called **runs**. It does so by storing the number of these runs followed by the data. RLE is used because it is easy to implement.

Let's look at a few examples.

1. For the text `AAAAAAAAAAAAAHHHEEM`(*19 characters*), RLE will encode it to get this `13A3H2EM`(7 characters).
2. For the text `AAAAHHHEEM, HAHA.`, it will be encoded as `4A3H2E1M1,1 1H1A1H1A1.`(*21 characters*).


From these examples, we see that RLE is suitable for compressing large amounts of data with very many runs but not a few runs e.g image pixel information. This is because short runs may end up taking the same space or more as we see in the second example.

### Compression

This is a process where a file size is reduced using algorithms resulting in a file that uses fewer storage bits than the original file e.g 

1. In a situation where one wants to send a picture to his/her friend, compression will be done at the source device and decompressed at the destination device. This enables the file to be sent faster and additionally, it reduces overhead traffic for transmitting the data.
2. Another example of compression is in social media apps. It is applied in applications such as WhatsApp where one will notice the image he/she sent is of lower quality and consumes much lesser space. Other apps also give users options in data saving settings for whether choosing whether the images and videos loaded should be of low quality or high quality. 
3. We also notice compression in video streaming sites where videos are loaded in low quality when there is low internet connectivity and vice versa. 

### Types of Compression algorithms

There two main classification types for compression algorithms are:

- **Lossless**
- **Lossy**

#### Lossless

Lossless algorithms are algorithms used where our information quality is very important for they don't lose the quality of the original data. The processes done by these algorithms are reversible and of very low compression ratios because we don't lose any information.
Examples include Run Length Encoding, Huffman coding, [Arithmetic coding](https://en.wikipedia.org/wiki/Arithmetic_coding), [Shannon-Fanno coding](https://www.geeksforgeeks.org/shannon-fano-algorithm-for-data-compression/), etc.

> **Compression ratio** - This is gotten by dividing the size before compression and size after compression. (`Size before compression/Size after compression`)

> You can view an article about Huffman Coding by [Lalithnarayan C](/engineering-education/authors/lalithnarayan-c/) [here](/engineering-education/huffman-coding-python/).

#### Lossy

For the lossy algorithms, we use them where quality compromising is acceptable. We achieve high compression ratios hence greater size reduction. The lossy compression process is non-reversible unlike the one for lossless compression algorithms.
Examples include [Lossy predictive coding](https://www.spiedigitallibrary.org/ebooks/TT/Digital-Image-Compression-Techniques/Chapter9/Lossy-Predictive-Coding/10.1117/3.34917.ch9),  [Block transform coding](https://web.ece.ucsb.edu/~manj/ece178-Fall2009/e178-L14.ppt.pdf), and [Vector quantization](https://www.spiedigitallibrary.org/ebooks/PM/Optical-Satellite-Data-Compression-and-Implementation/4/Vector-Quantization-Data-Compression/10.1117/3.1002297.ch4#:~:text=Vector%20quantization%20(VQ)%20is%20an,and%20speech%20and%20image%20coding.).

### Prerequisites
1. A basic understanding of Python. 
2. Familiarity with a notebook-based interface like Google Colab is required because we will be using that. (You can as well use it in normal Python files).


### The Python code

Let's jump into the Python code.

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
    #splitting the encoded message into respective counts
    while (i <= len(our_message)-1):
        run_count = int(our_message[i])
        run_word = our_message[i + 1]
        #displaying the character multiple times specified by the count
        for j in range(run_count):
            #concatenated with the decoded message
            decoded_message = decoded_message+run_word
            j = j + 1
        i = i + 2
    return decoded_message
```

The function `decode()` takes in the parameter `our_message` for the encoded massage.

We have a variable `decoded_message` for storing the decoded string.

The `while` loop is for splitting the encoded message into respective counts, `run_count`, and the character, `run_word`, until it is finished. It contains a `for` loop for displaying the character multiple times specified by the count(`run_count`) to form a string. The string is then concatenated with the `decoded_message` variable. This continues until the decoded string is displayed in full.

Finally, we write the method for displaying what we have written. Again, open a new cell and paste this.

```python
def display():
    #the original string
    our_message = "AuuBBBCCCCCCcccccCCCCCCCCCA"
    #pass in the original string
    encoded_message=encode_message(our_message)
    #pass in the decoded string
    decoded_message=decode_message(encoded_message)
        print("Original string: ["+our_message+"]\nEncoded string: ["+encoded_message+"]\nDecoded string: ["+decoded_message+"]\n")
```

The function, `display()`, has the string to be encoded and decoded.

We then call the two methods for the process. We pass in the original string to the `encode_message()` function. After encoding, it is stored in the `encoded_message` variable. 

The encoded message, `encoded_message`, is passed to the `decode_message` function for decoding. Thereafter, the decoded message is stored in the `decoded_message` variable.

We then print the two messages. The output will be as shown below:

```bash
1A2u3B6C5c9C1A
AuuBBBCCCCCCcccccCCCCCCCCCA
```

The Colab notebook for this code is found [here](https://colab.research.google.com/drive/1Thf9CLJkhjGQE-XN2IkSwW2SuZ8TAXoh?usp=sharing)

### Time complexity
The algorithm has O(n) complexity. Compared to another lossless algorithm like Huffman with a complexity of O(nlogn), RLE has a poor performance on large amounts of data. This is clearly explained in [this research paper](https://core.ac.uk/download/pdf/228547034.pdf).

You can learn about calculating time and space complexities [here](/engineering-education/big-o-notation/).

### Conclusion
We have looked at what is compression, the types of compression, Run Length Encoding, and implementing it in Python. Have a great read.

### Further reading
* [Transform coding](https://en.wikipedia.org/wiki/Transform_coding).

* [Predictive coding](https://web.stanford.edu/class/ee398a/handouts/lectures/06-Prediction.pdf).