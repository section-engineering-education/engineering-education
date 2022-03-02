---
layout: engineering-education
status: publish
published: true
url: /understanding-gazpacho-in-python-and-its-application-in-webscraping/
title: Understanding Gazpacho in Python and its Application in Web Scraping
description: The objective of this tutorial is to help the reader understand the Gazpacho Python library and how it is used in web scraping.
author: antony-lia
date: 2022-02-27T00:00:00-01:22
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/understanding-gazpacho-in-python-and-its-application-in-webscraping/hero.jpg
    alt: Web Scraping example image
---
It can be tedious and time-consuming to get large amounts of data online by searching and copy-pasting. To make it easier and quicker, we can automate this process by using the web scraping tool to load and extract the data from multiple websites and webpages according to our needs. 
<!--more-->
This article will cover much concerning the web scrapping tool, its real-life applications, and how we can use the Gazpacho Python library for scraping web data.

### Table of contents
- [Prerequisites](#prerequisites)
- [Web Scraping](#web-scraping)
  - [Components of the Web Scraper](#components-of-the-web-scraper)
  - [Operation of the Web Scraper](#operation-of-the-web-scraper)
  - [Applications for Web Scraping](#applications-for-web-scraping)
- [Web Scraping in Python](#web-scraping-in-python)
- [Gazpacho library](#gazpacho-library)
- [Conclusion](#conclusion)

### Prerequisites
To follow along with this tutorial, the reader should:
- Have a prior understanding of the basic Python concepts.
- Python is installed you machine.
- Install Jupyter Notebook or another IDE/editor that can run Python.

> Go to this [page](https://jupyter.org/install) to install Jupyter on your PC.

### Web Scraping
Web scraping, also known as web harvesting or web extraction, is commonly used when obtaining information from the internet. It is much quicker and easier than the manual methods. It is an automatic method of extracting data from a web page by querying a web server, requesting data (usually in the form of HTML and other files that comprise web pages), and then parsing it to extract the needed information. It is made possible using automated software called ***web scrapers***, which is dedicated to performing data harvesting.

#### Components of the Web Scraper
The software is made up of various components, as described below:
- Web Crawler Module: A vital component of a web scraper that allows it to navigate the target website/webpage by sending HTTP or HTTPS queries to the URLs. The HTML contents are then downloaded in an unstructured form and passed to the next component, the extractor.
- Extractor: This component processes the fetched HTML content from the web crawler module and extracts the data into a semi-structured format. It's also known as a parser module because it works with many parsing approaches, such as regular expressions, HTML parsing, DOM parsing, and Artificial Intelligence.
- Data transformation and cleaning module: The data collected by the extractor isn't ready to use right away; it needs to go through some cleaning process before we can utilize it. For this, methods such as string manipulation and regular expressions can be employed. Extraction and transformation can be done in one process.
- Once we have extracted the needed data, it is stored in standard formats that can be stored in the database, in JSON, or CSV format in the storage module.

#### Operation of the Web Scraper
For the web scraper to perform and accomplish the scraping process, it goes through various steps as stated below:
- First, the web scraper downloads the requested content from multiple websites and web pages through a web crawler.
- Since most of the data from websites are HTML and unstructured, the web scraper will parse the downloaded content and extract structured data.
- When we extract data from an unstructured into a structured form, the scraper saves it in one of several formats, such as CSV, JSON, or a database.
- When the structured data has been stored, the web scraper will analyze the data obtained.

#### Applications for Web Scraping
We utilize web scraping in a variety of real-world scenarios, including:
- For comparison, web scrapers can collect data from numerous e-commerce websites, particularly data relating to the pricing of a product.
- Content aggregators, such as news and employment aggregators, frequently use web scraping to provide updated data to their subscribers.
- Collecting data for sales and marketing purposes, such as emails and phone numbers.
- Used in SEO tools for website optimization for search engines.
- Data retrieval for machine learning projects.

### Web Scraping in Python
Web scraping involves a wide variety of programming technologies and techniques. In Python, web scraping is done with various libraries:
- Requests - It is the most basic and essential library for web scraping, used for making various types of HTTP requests like `GET` and `POST`. It does not parse the HTML data retrieved, so libraries like Beautiful Soup are required.
- lxml - It is a fast, production-quality, and high-performance HTML and XML parsing library required since the request library cannot parse HTML retrieved from webpages.
- Beautiful Soup - It is the most extensively used scraping library that produces parse trees for reading HTML and XML data. It automatically converts incoming and outgoing documents to Unicode and UTF-8.
- Selenium - Is a collection of programs rather than a single tool. It's a free testing tool for web apps that works across several browsers and platforms.
- Scrapy - Is a fast, open-source web crawling system. It uses selectors based on XPath to extract data from online pages.
- Gazpacho - Is a modern, simple, and fast web scraping library.
On this [site](https://www.analyticsvidhya.com/blog/2020/04/5-popular-python-libraries-web-scraping/), you can get to know more about the same.

### Gazpacho library
In this tutorial, we will focus on how to use the Gazpacho library to automate data extraction from web pages and websites. It is a modern web scraping Python library, stable and installed with zero dependencies. It can combine the functionality of the requests and Beautiful Soup libraries by importing a few classes from each.

To use this library, check if Python is installed on your machine by typing the command `python` in the command prompt. If it is not installed, go to this [page](https://www.python.org/downloads/.) to download and install it.

Once Python is installed and running, we can install the library using the `pip` command below:

```bash
pip install gazpacho
```
![Output](/engineering-education/understanding-gazpacho-in-python-and-its-application-in-webscraping/gazpacho-installation.jpg)

To show how we can use the library for web scraping, we will scrape the webpage of [webscraper.io](https://webscraper.io/test-sites/e-commerce/static/computers/tablets) from a dummy computer and tablet site.

First, we will start by importing the get method from the requests library, which will be used for getting the webpage HTML data after the URL of the webpage has been specified. As shown, the `get()` method will take the URL and extract the HTML attached to it.

```python
from gazpacho import get
url ='https://webscraper.io/test-sites/e-commerce/static/computers/tablets'
html = get(url)
html
```
It will display a soup of text using `html` as shown below.

![Output](/engineering-education/understanding-gazpacho-in-python-and-its-application-in-webscraping/html-soup.jpg)

Since the extracted HTML data is in unstructured form, we will use the **Soup** class of Gazpacho to parse and get structured data from the downloaded content.

```python
from gazpacho import Soup
soup = Soup(html)
```
Now, to find some data concerning webpage contents, we will use the .find() method of the Soup object. In our case, let's find tablet titles.

```python
soup.find('p', {'class':'description'})
```
From the above statement, the first argument `p` in single quotes represents the HTML tag we want to retrieve. The second one, `class`, contains the class name we want to extract; `description`. The output from the above statement will be  a list of  data for all the items belonging to the HTML class `description`, as shown below:

Output:

![Output](/engineering-education/understanding-gazpacho-in-python-and-its-application-in-webscraping/tablet-titles.jpg)

From the above output, we can get text data from the structured HTML data, using the `.text` attribute. Let's get more details concerning the tablets; titles, descriptions, and prices, by defining a function to display the structured and clear HTML data as shown below:

```python
captions= soup.find("div", {'class':'caption'},partial=True)

def parse(caption):
    title = caption.find('a',{"class":"title"}).text
    description = caption.find('p').text
    price = caption.find('h4',{"class":"price"}).text
    
                  
    return title,description,price
                  
(pd.DataFrame([parse(caption) for caption in captions]))
```
From the code above, we have used the partial name of the class in the tag and set the partial argument to `True` since we might not know the exact name of the class in which we want to retrieve data. It extracts data for all three elements (title, description, and price) of the tablets belonging to the class `caption`. To display the data in a frame, we parse the extracted data inside the Python pandas library, `pd`.

Output:

![Output](/engineering-education/understanding-gazpacho-in-python-and-its-application-in-webscraping/final-output.jpg)

The complete code:

```python
from gazpacho import get , Soup
import pandas as pd
url ='https://webscraper.io/test-sites/e-commerce/static/computers/tablets'
html = get(url)
soup = Soup(html)
captions= soup.find("div", {'class':'caption'},partial=True)

def parse(caption):
    title = caption.find('a',{"class":"title"}).text
    description = caption.find('p').text
    price = caption.find('h4',{"class":"price"}).text
    
                  
    return title,description,price
                  
(pd.DataFrame([parse(caption) for caption in captions]))
```
### Conclusion
In this tutorial, it is evident that the web scraping process is crucial and helpful when it comes to data extraction from various websites and web pages.
It has been made so easy and quick using the modern Gazpacho library, which has advantages over the other libraries since all the tasks are done using a single library import.

We have learned about web scraping and its applications in real life, explored different Python libraries used in web scraping, and learned about how we use the Gazpacho library for scraping web data. You can learn more about web scraping using Gazpacho [here](https://pypi.org/project/gazpacho/).

Happy Coding!

---
Peer Review Contributions by: [Willies Ogola](/engineering-education/authors/willies-ogola/)