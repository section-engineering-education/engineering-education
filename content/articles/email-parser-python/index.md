### Building an email parser in Python

Perhaps you are a machine learning engineer trying to build an email spam classifier and you want to get some way of pre-processing the emails or you are trying to look for some correlations between some emails, you will in one way or another have to parse the emails first. We will look at how to do that using Python. Python has the `email` module containing methods to help us achieve this.

#### Prerequisites

To follow this article, the following are needed:
1. An understanding of Python.
2. Jupyter notebook installed or an access to Google Colab.

> We will use notebook technology in this article. Thoough you can use normal Python files for the code executions.

### Getting started

We will parse emails from the SpamAssassin website then look at their strucutre, their contents and convert them to plain text. THe site contains espam and normail emails. WE will try and look at their differencs using the metrics highlighted. 

First, create a notebook called **email_parser.ipynb** or your preffered name.

We will then create a cell and add the packages we need.

```python
import os
import tarfile
import urllib.request
import email
import email.policy
from collections import Counter
import numpy as np
import re
from html import unescape
import urlextract
```
After that, create another cell and paste this code for getting the emils from the SpamAssassin website.

```python
DOWNLOAD_ROOT = "http://spamassassin.apache.org/old/publiccorpus/"
HAM_URL = DOWNLOAD_ROOT + "20030228_easy_ham.tar.bz2"
SPAM_URL = DOWNLOAD_ROOT + "20030228_spam.tar.bz2"
SPAM_PATH = os.path.join("datasets", "spam")

def fetch_spam_data(ham_url=HAM_URL, spam_url=SPAM_URL, spam_path=SPAM_PATH):
    if not os.path.isdir(spam_path):
        os.makedirs(spam_path)
        for filename, url in (("ham.tar.bz2", ham_url),("spam.tar.bz2", spam_url)):
            path = os.path.join(spam_path, filename)
            if not os.path.isfile(path):
                urllib.request.urlretrieve(url, path)
            tar_bz2_file = tarfile.open(path)
            tar_bz2_file.extractall(path=spam_path)
            tar_bz2_file.close()
```
 WE set the paths and the url in the constants. IN the 