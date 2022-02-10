---
layout: engineering-education
status: publish
published: true
url: /understanding-gazpacho-in-python-and-its-application-in-webscraping/
title: Understanding Gazpacho in Python and its Application in Web Scraping
description: The objective of this tutorial is to help the reader understand the Gazpacho python library and how it is used in web scraping.
author: antony-lia
date: 2022-02-15T00:00:00-21:40
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/understanding-gazpacho-in-python-and-its-application-in-webscraping/hero.jpg
    alt: Web Scraping example image
---
Getting a large amount of data online by searching manually and copy-pasting can be tedious and time-consuming. To make it  easier and quicker we can automate this process by using the web scraping tool to load and extract the data from multiple websites and webpages according to our needs.
<!--more-->
This article will cover as much concerning the web scrapping tool, its real-life applications, and how we can use the gazpacho python library in scraping web data.

### Table of contents
- [Table of contents](#table-of-contents)
- [Prerequisites](#prerequisites)
- [Web Scraping](#web-scraping)
  - [Components of Web Scraper](#components-of-web-scraper)
  - [Working of Web Scraper](#working-of-web-scraper)
  - [Web Scraping Applications](#web-scraping-applications)
- [Web Scraping in Python](#web-scraping-in-python)
- [Gazpacho library](#gazpacho-library)
- [Conclusion](#conclusion)

### Prerequisites
To follow along with this tutorial, the reader should:
- Have a prior understanding of the basic Python Concepts.
- Have Python installed on the machine.
- Have Jupyter notebook installed or any other IDE/editor that can run Python.

Go to this [page](https://jupyter.org/install) to install Jupyter on your PC.

### Web Scraping
Web scraping, also known as web harvesting or web extraction, is a common of obtaining information from the internet. It is much quicker and easier than the manual methods since it is an  automatic method of extracting  data from a web page, by querying a web server, requesting data (usually in the form of an HTML and other files that comprise web pages), and then parses it to extract the needed information. This is made possible using the automated software called ***web scraper***,  dedicated to performing the data harvesting.
#### Components of Web Scraper
The software is made up of various components as described below;
- Web Crawler Module - A vital component of a web scraper that allows it to navigate the target website/webpage by sending HTTP or HTTPS queries to the URLs. The HTML contents are then downloaded in an unstructured form and passed to the next component, the extractor.
- Extractor - This component processes the fetched HTML content from the web crawler module and extracts the data into a semistructured format. It's also known as a parser module because it works with many parsing approaches such as Regular expressions, HTML parsing, DOM parsing, and Artificial Intelligence.
- Data transformation and Cleaning Module - The data collected by the extractor isn't ready to use right away; it needs to go through some sort of cleaning process before we can utilize it. For this, methods such as string manipulation and regular expression can be employed. Extraction and transformation can be done in one process.
- Storage Module - Once we have extracted the needed data, it is stored in standard formats that can be stored on the database, in JSON or CSV format in the storage module.
#### Working of Web Scraper
For the web scraper to perform and accomplish the scraping process, it goes through various steps as stated below:
- First, the web scraper downloads the requested content from multiple websites and web pages by use of the web crawler.
- Since most of the data from websites are HTML and unstructured, The web scraper will parse the downloaded content and extract structured data.
- When data is extracted from an unstructured to a structured form, the scraper saves it in one of several formats, such as CSV, JSON, or a database.
- When the structured data has been stored, the web scraper will analyze the data obtained.
#### Web Scraping Applications
Web scraping is utilized in a variety of real-world scenarios, including:
- Web scrapers can collect data from numerous e-commerce websites, particularly data relating to the pricing of a given product, for comparison.
- Content aggregators, such as news aggregators and employment aggregators, frequently use web scraping to provide updated data to their subscribers.
- Used in collecting data for sales and marketing such as emails and phone number
- Used in SEO tools for website optimization for search engines
- Data retrieval for machine learning projects.
### Web Scraping in Python
Web scraping involves a wide variety of programming technologies and techniques. In python web scraping is done with various libraries, that is:
- Requests - It is the  most basic and essential library for web scraping used for making various types of HTTP requests like GET and POST. However, with requests it does not parse the HTML data retrieved hence libraries like Beautiful soup are required.
- lxml - Since the request library cannot parse HTML retrieved from webpages, lxml is required. A fast, production-quality and high-performance  HTML, and XML parsing library.
- BeautifulSoup - It is the most extensively used scraping library and produces parse trees for reading HTML and XML data and converts incoming and outgoing documents to Unicode and UTF-8 automatically.
- Selenium - It's a collection of programs rather than a single tool.It's a free, testing tool for web apps that works across several browsers and platforms.
- Scrapy - a fast, open-source web crawling system that uses selectors based on XPath to extract data from online pages.
- Gazpacho - A modern, simple and fast  web scraping library.
Get to know more about the same from this [site](https://www.analyticsvidhya.com/blog/2020/04/5-popular-python-libraries-web-scraping/).

### Gazpacho library
In this tutorial, we will focus on how we can use the gazpacho library in automating data extraction from web pages and websites.This is a modern web scraping python library, stable and installed with zero dependencies. It is able to combine the functionality of the requests and BeautifulSoup libraries by importing a few classes from them.
To use this library, check if python is installed in your machines by typing the command `python` in the command prompt. If not installed go to this [page]( https://www.python.org/downloads/.) to download and install.
We can then install the  library using the pip command below once Python is installed and running:

```bash
pip install gazpacho

```
![Output](/engineering-education/understanding-gazpacho-in-python-and-its-application-in-webscraping/gazpacho-installation.jpg)

To demonstrate  how we can use the library in web scraping, we will be scraping the  webpage of [webscraper.io](https://webscraper.io/test-sites/e-commerce/static/computers/tablets) from a dummy computers and tablets site.

First, we will start by importing the  get method  from requests library which will be used for  retrieving the webpage HTML data after we have specified  the URL of the webpage/website. The get() method will grab the URL  and get the HTML attached to it as shown;
```python
from gazpacho import get
url ='https://webscraper.io/test-sites/e-commerce/static/computers/tablets'
html = get(url)
html
```
A soup of text will be displayed using the show  `html` as shown below;
![Output](/engineering-education/understanding-gazpacho-in-python-and-its-application-in-webscraping/html-soup.jpg)
Since the extracted HTML data is in unstructured form, we will use the **Soup** class of gazpacho to parse and get structured data from the downloaded content.
```python
from gazpacho import Soup
soup = Soup(html)
```
Now, to find out some data concerning webpage contents, we will use the .find() method of the Soup object. In our case lets find Tablet titles;
```python
soup.find('p', {'class':'description'})
```
From the above statement, the first argument `p` in single quotes represents the HTML tag we want to retrieve. The second one, `class` contains the class name we want to extract, that is `description`. The output from the above statement will be  a list of  data of all the items belonging to the HTML class `description` as shown below:
Output:
![Output](/engineering-education/understanding-gazpacho-in-python-and-its-application-in-webscraping/table-titles.jpg)

From the above output, we can get text data from the structured HTML data, using the `.text` attribute. Let's get more details concerning the tablets, that is, Title, Description, and the prices by defining a function to display the structured and clear HTML data as shown below:

```python
captions= soup.find("div", {'class':'caption'},partial=True)

def parse(caption):
    title = caption.find('a',{"class":"title"}).text
    description = caption.find('p').text
    price = caption.find('h4',{"class":"price"}).text
    
                  
    return title,description,price
                  
(pd.DataFrame([parse(caption) for caption in captions]))
```
From the above, we have used the partial name of the class in the tag and set the partial argument to True since we might not be knowing the exact name of the class we want to retrieve data. This would extract data of all the three elements (Title, description, price) of the tablets belonging to the class `caption`. To display the data in a frame, we parse the extracted data inside the python pandas library, `pd`.
Output:
![Output](/engineering-education/understanding-gazpacho-in-python-and-its-application-in-webscraping/final_output.jpg)

Full combined code:
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
From the above tutorial, it is evident that the web scraping process is crucial and helpful when it comes to data extraction from various websites and web pages.
This has been made so easy and quick using the modern Gazpacho library which has advantages over the other libraries since all the tasks are done using a single library import.

To summarize, we have:
- Learned what Web scraping is and its applications in real life.
- Explored different python libraries used in web scraping.
- Learned about the Gazpacho library and how it is used in scraping web data.

More about web scraping using gazpacho can be found from [here](https://pypi.org/project/gazpacho/).

Happy coding!

---
Peer Review Contributions by: 
