---
layout: engineering-education
status: publish
published: true
url: /email-parser-python/
title: Parsing emails in Python
description: In this article we discuss the code to obtain and classify emails as spam or ham.   
author: vincent-ngunzulu
date: 2021-08-07T00:00:00-04:35
topics: [Languages]
excerpt_separator: <!--more-->
images:

 - url: /engineering-education/email-parser-python/hero.jpg
   alt: Parsing Email example image
---
Perhaps you are a machine learning engineer trying to build an email spam classifier. You may want to get some way of pre-processing the emails or looking for correlations between random emails. You will, in one way or another, have to parse the emails first. We will look at how to do that using Python. Python has the `email` module containing methods to help us achieve this.

### Prerequisites

To follow along with this article, the reader should have:
- An understanding of Python.
- Jupyter notebook installed or access to Google Colab.

> We will use Jupyter notebooks in this article. You may use regular Python files for the code executions.

A Colab notebook with the code can be found [here](https://colab.research.google.com/drive/1nDz58G4cDukqukOlPRVST-jKBK0AyMwa?usp=sharing).

### Getting started

We will parse emails from the _SpamAssassin_ website to look at their structure and contents. The site contains spam and ham emails. We will try and look at their structures using the metrics highlighted. 

We will import the packages we need in a new cell then add the code for getting the emails from the _SpamAssassin_ website.

```python
import os
import tarfile
import urllib.request
import email
import email.policy
from collections import Counter

#the root url
EMAILS_URL_ROOT = "http://spamassassin.apache.org/old/publiccorpus/"
#the emails url
HAM_URL = EMAILS_URL_ROOT + "20030228_easy_ham.tar.bz2"
SPAMS_URL = EMAILS_URL_ROOT + "20030228_spam.tar.bz2"
#datasets path
SPAM_PATH = os.path.join("datasets", "spam")

#method for fetching the emails from the url
def fetch_emails(HAM_URL=HAM_URL, SPAMS_URL=SPAMS_URL, spams_path=SPAM_PATH):
  #creating a directory
    if not os.path.isdir(spams_path):
        os.makedirs(spams_path)
        for filename, url in (("ham.tar.bz2", HAM_URL),("spam.tar.bz2", SPAMS_URL)):
            path = os.path.join(spams_path, filename)
            #checking if there is a file
            if not os.path.isfile(path):
                urllib.request.urlretrieve(url, path)
                #extracting
            email_tar_file = tarfile.open(path)
            email_tar_file.extractall(path=spams_path)
            email_tar_file.close()
```
We set the paths and the URLs as constants. Then, in the `fetch_emails()` method, we check if the directory exists using the `isdir()` method of the `os` module. If the directory does not exist, we create a new one using the `makedirs()` method.
 
We create two paths needed for ham and spam emails to store the emails.
 
Once done, we create the file directory if it does not exist and retrieve it using the `urlretrieve()` method. Finally, we open the tar files and extract them.

In the next cell, we call the `fetch_emails()` method.

 ```python
fetch_emails()
 ```

Let's begin with parsing the emails in a new cell.

```python
#creating drectories for the extracted emails
HAM_DIR = os.path.join(SPAM_PATH, "easy_ham")
SPAMS_DIR = os.path.join(SPAM_PATH, "spam")

# sorted filenames for the emails
ham_filenames = [name for name in sorted(os.listdir(HAM_DIR))]
spam_filenames = [name for name in sorted(os.listdir(SPAMS_DIR))]
#load the emails
def load_emails(is_spam, filename, spams_path=SPAM_PATH):
  #if the argument is true for spam, load from the spam_emails directory and vice versa
    directory = "spam" if is_spam else "easy_ham"
    #open as readable and in binary
    with open(os.path.join(spams_path, directory, filename), "rb") as f:
      #parse using the defaul line break(\n)
        return email.parser.BytesParser(policy=email.policy.default).parse(f)
#load
ham_emails = [load_emails(is_spam=False, filename=name) for name in ham_filenames]
spam_emails = [load_emails(is_spam=True, filename=name) for name in spam_filenames]
```

We create a directory each for the spam and ham emails and sort them.

In the `load_emails()`, we open the appropriate directories as readable in binary format. After that, we parse them using the `BytesParser` class. The `BytesParser` class contains an argument in the constructor called `policy`. It has the policy as `default`. Using `default` lets us parse the email using the `\n` line breaks.

We then call the `load_emails()` method to load the emails.

In a new cell, we can have a look at a sample of a ham email. 

```python
print(ham_emails[42].get_content().strip())
```

#### Viewing the structures of the emails

In this part, we will look at how to get the structure of the emails and the common types of structures for spam and ham emails.

Paste this code in the next cell.

```python
'''Getting the most common email structures'''
def get_structures(email):
  #if its plain text return text/plain
    if isinstance(email, str):
        return email
    email_payload = email.get_payload()
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

In this code, we have two methods, `get_structures()` and `type_counter()`.

In the `get_structures()` function, we check the structure. If it is a ham text email, we return `text/plain,` but if it's a multipart type of email, we return `multipart` and all the parts it contains. Recursion is used if there are many email structures in the sub-emails of that multipart email.

> A multipart email is an email that contains multiple parts. For example, it can contain both a *text/plain* part and an *HTML* part. To check other parts of the email, we must check for the same until the email is repeatedly parsed. An excellent method to do that is by the use of recursion.

Any other email structure apart from the two, **text/plain** and **multipart**, is displayed by returning the email's content type(`get_content_type()`).

The `type_counter()` method checks how many email structure types exist in the spam and ham emails, e.g. `'text/plain', 2409`. So, we first initiate a counter then count them for every similar structure.

This code displays one for ham emails:

```python
print(structures_counter(ham_emails))
```

We check the most common structures using the `most_common()` method:

```python
print(structures_counter(spam_emails).most_common())
```
We should see the output as shown below:

```bash
[('text/plain', 2409), ('multipart(text/plain, application/pgp-signature)', 66), ('multipart(text/plain, text/html)', 8), ('multipart(text/plain, text/plain)', 4), ('multipart(text/plain)', 3), ('multipart(text/plain, application/octet-stream)', 2), ('multipart(text/plain, text/enriched)', 1), ('multipart(text/plain, application/ms-tnef, text/plain)', 1), ('multipart(multipart(text/plain, text/plain, text/plain), application/pgp-signature)', 1), ('multipart(text/plain, video/mng)', 1), ('multipart(text/plain, multipart(text/plain))', 1), ('multipart(text/plain, application/x-pkcs7-signature)', 1), ('multipart(text/plain, multipart(text/plain, text/plain), text/rfc822-headers)', 1), ('multipart(text/plain, multipart(text/plain, text/plain), multipart(multipart(text/plain, application/x-pkcs7-signature)))', 1), ('multipart(text/plain, application/x-java-applet)', 1)]
```

The output shows the types, followed by their respective counts, e.g., there are 2409 *text/plain* emails in ham emails.

We then view the headers and their values using:

```python
for header, value in spam_emails[0].items():
    print(header,":",value)
```
Headers in emails are parts such as the subject, date, etc. The sample output is here:

```bash
Return-Path : <12a1mailbot1@web.de>
Delivered-To : zzzz@localhost.spamassassin.taint.org
Received : from localhost (localhost [127.0.0.1])   by phobos.labs.spamassassin.taint.org (Postfix) with ESMTP id 136B943C32    for <zzzz@localhost>; Thu, 22 Aug 2002 08:17:21 -0400 (EDT)
Received : from mail.webnote.net [193.120.211.219]  by localhost with POP3 (fetchmail-5.9.0)    for zzzz@localhost (single-drop); Thu, 22 Aug 2002 13:17:21 +0100 (IST)
Received : from dd_it7 ([210.97.77.167])    by webnote.net (8.9.3/8.9.3) with ESMTP id NAA04623 for <zzzz@spamassassin.taint.org>; Thu, 22 Aug 2002 13:09:41 +0100
From : 12a1mailbot1@web.de
Received : from r-smtp.korea.com - 203.122.2.197 by dd_it7  with Microsoft SMTPSVC(5.5.1775.675.6);  Sat, 24 Aug 2002 09:42:10 +0900
To : dcek1a1@netsgo.com
Subject : Life Insurance - Why Pay More?
Date : Wed, 21 Aug 2002 20:31:57 -1600
MIME-Version : 1.0
Message-ID : <0103c1042001882DD_IT7@dd_it7>
Content-Type : text/html; charset="iso-8859-1"
Content-Transfer-Encoding : quoted-printable
```

### Conclusion

We looked at parsing of emails using python. This was done by first getting the emails from the _SpamAssassin_ website and storing them in our working directories. Next, we looked at how we get the structures of emails and further checked the common structures found in the emails.

The main module involved in the parsing is the `email` module.

### Further reading

You can get more information about the email.parser module [here](https://docs.python.org/3/library/email.parser.html#module-email.parser).

---
Peer Review Contributions by: [Lalithnarayan C](/engineering-education/authors/lalithnarayan-c/)