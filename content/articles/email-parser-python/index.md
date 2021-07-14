### Parsing emails in Python

Perhaps you are a machine learning engineer trying to build an email spam classifier and you want to get some way of pre-processing the emails or you are trying to look for some correlations between some emails, you will in one way or another have to parse the emails first. We will look at how to do that using Python. Python has the `email` module containing methods to help us achieve this.

#### Prerequisites

To follow this article, the following are needed:
1. An understanding of Python.
2. Jupyter notebook installed or access to Google Colab.

> We will use notebook technology in this article though you can use normal Python files for the code executions.

A Colab notebook with the codes is found [here](https://colab.research.google.com/drive/1nDz58G4cDukqukOlPRVST-jKBK0AyMwa?usp=sharing).

#### Getting started

We will parse emails from the SpamAssassin website then look at their structure and contents. The site contains spam and normal emails. WE will try and look at their structures using the metrics highlighted. 

First, create a notebook called **email_parser.ipynb** or your preferred name.

Then, create a cell and add the packages we need.

```python
import os
import tarfile
import urllib.request
import email
import email.policy
from collections import Counter
import urlextract
```
After that, create another cell and paste this code for getting the emails from the SpamAssassin website.

```python
#the root url
EMAILS_URL_ROOT = "http://spamassassin.apache.org/old/publiccorpus/"
#the emails url
NORMALS_URL = EMAILS_URL_ROOT + "20030228_easy_ham.tar.bz2"
SPAMS_URL = EMAILS_URL_ROOT + "20030228_spam.tar.bz2"
#datasets path
SPAM_PATH = os.path.join("datasets", "spam")

#method for fetching the emails from the url
def fetch_emails(NORMALS_URL=NORMALS_URL, SPAMS_URL=SPAMS_URL, spams_path=SPAM_PATH):
  #creating a directory
    if not os.path.isdir(spams_path):
        os.makedirs(spams_path)
        for filename, url in (("ham.tar.bz2", NORMALS_URL),("spam.tar.bz2", SPAMS_URL)):
            path = os.path.join(spams_path, filename)
            #checking if there is a file
            if not os.path.isfile(path):
                urllib.request.urlretrieve(url, path)
                #extracting
            email_tar_file = tarfile.open(path)
            email_tar_file.extractall(path=spams_path)
            email_tar_file.close()
```
 We set the paths and the url in the constants. In the `fetch_emails()` method, we check if the directory is present using the `isdir()` method of the `os` module. If it is not there, we create a new one using the `makedirs()` method. We create two paths for the normal and spam emails.
 We then create the file directory if it is not present and retrieve the contents using the `urlretrieve()` method.
 After that, we open the tar files and extract them.

 In the next cell, we call the `fetch_emails()` method.

 ```python
fetch_emails()
 ```

We add a new cell where we will begin parsing the emails

```python
#creating directories for the extracted emails
NORMALS_DIR = os.path.join(SPAM_PATH, "normal_emails")
SPAMS_DIR = os.path.join(SPAM_PATH, "spam_emails")

# sorted filenames for the emails
normal_filenames = [name for name in sorted(os.listdir(NORMALS_DIR))]
spam_filenames = [name for name in sorted(os.listdir(SPAMS_DIR))]
#load the emails
def load_emails(is_spam, filename, spams_path=SPAM_PATH):
  #if the argument is true for spam, load from the spam_emails directory and vice versa
    directory = "spam_emails" if is_spam else "normal_emails"
    #open as readable and in binary
    with open(os.path.join(spams_path, directory, filename), "rb") as f:
      #parse using the defaul line break(\n)
        return email.parser.BytesParser(policy=email.policy.default).parse(f)
#load
normal_emails = [load_emails(is_spam=False, filename=name) for name in normal_filenames]
spam_emails = [load_emails(is_spam=True, filename=name) for name in spam_filenames]
```

Here, we create a directory for the spam and normal emails and sort them.
In the `load_emails()` we open the appropriate directories as readable and in binary format then we parse them using the `BytesParser` class.
The `BytesParser` class contains an argument in the constructor called `policy`. It has the policy as default. Using `default` lets us parse the email using the `\n` line breaks.

We then call the `load_emails()` method to load the emails.

We can look at a sample of a normal email in the next cell.

```python
print(normal_emails[42].get_content().strip())
```

#### Viewing the structures of the emails

IN this part we will look at how to get the structure of the emails and further look at the common types of structures for spam and normal emails.

Paste this in the next cell.

```python
'''Getting the most common email structures'''
def get_structures(email):
  #if its plain text return text/plain
    if isinstance(email, str):
        return email
    email_payload = email.get_email_payload()
    #if the payload is a list then its probably a multipart
    #return a multipart thereafter
    if isinstance(email_payload, list):
        return "multipart({})".format(", ".join([
            get_structures(sub_email)
            for sub_email in email_payload
        ]))
    else:
        return email.get_content_type()
#function for counting the types
def type_counter(emails):
    our_count = Counter()
    for email in emails:
        structure = get_structures(email)
        our_count[structure] += 1
    return our_count
```

IN this code, we have two methods, `get_structures()` and `type_counter()`.

For the `get_structures()`, we check for the structure. If it is a normal text email we return `text/plain` but if it's a multipart type of email, we return multipart, all the parts it contains. Note also that recursion is used in case there are many email structures contained in sub-emails of that email.
For any other email structure we display it by return the emails content type(`get_content_type()`).

For the `type_counter()` method, we check how many email structure types are gotten in the spam and normal emails e.g `'text/plain', 2409`. WE first initiate a counter then count them for every similar structure.

We can display one for normal emails using this code:

```python
print(structures_counter(normal_emails))
```

WE check the most common using the `most_common()` method.

```python
print(structures_counter(spam_emails).most_common())
```
 We should see the output as shown below:

```bash
[('text/plain', 2409), ('multipart(text/plain, application/pgp-signature)', 66), ('multipart(text/plain, text/html)', 8), ('multipart(text/plain, text/plain)', 4), ('multipart(text/plain)', 3), ('multipart(text/plain, application/octet-stream)', 2), ('multipart(text/plain, text/enriched)', 1), ('multipart(text/plain, application/ms-tnef, text/plain)', 1), ('multipart(multipart(text/plain, text/plain, text/plain), application/pgp-signature)', 1), ('multipart(text/plain, video/mng)', 1), ('multipart(text/plain, multipart(text/plain))', 1), ('multipart(text/plain, application/x-pkcs7-signature)', 1), ('multipart(text/plain, multipart(text/plain, text/plain), text/rfc822-headers)', 1), ('multipart(text/plain, multipart(text/plain, text/plain), multipart(multipart(text/plain, application/x-pkcs7-signature)))', 1), ('multipart(text/plain, application/x-java-applet)', 1)]
```
We then view the headers and their values using:

```python
for header, value in spam_emails[0].items():
    print(header,":",value)
```

### Summary

In this article, we looked at getting the emails, setting the paths and extracting them, and thereafter parsed them.

### Further reading

You can get more information about the email.parser module [here](https://docs.python.org/3/library/email.parser.html#module-email.parser).