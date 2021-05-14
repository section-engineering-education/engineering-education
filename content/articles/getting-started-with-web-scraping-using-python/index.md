---
layout: engineering-education
status: publish
published: true
url: /getting-started-with-web-scraping-using-python/
title: Getting Started with Web Scraping using Python
description: In this article we will learn about web scraping which is the process that makes pulling a huge amount of data from websites easier and faster.
author: ahmad-mardeni
date: 2020-11-02T00:00:00-12:00
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/getting-started-with-web-scraping-using-python/hero.png
    alt: web scraping example image Python
---
Imagine you want to gather a large amount of data from several websites as quickly as possible, will you do it manually, or will you search for it all in a practical way?
Now you are asking yourself, why would you want to do that! Okay, follow along as we go over some examples to understand the need for **web scraping**:
<!--more-->
### Introduction
- [Wego](https://www.wego.com/en) is a website where you can book your flights & hotels, it gives you the lowest price after comparing 1000 booking sites. This is done by **web scraping** that helps with that process.
- [Plagiarismdetector](https://plagiarismdetector.net/) is a tool you can use to check for plagiarism in your article, it also is using **web scraping** to compare your words with thousands of other websites.
- Another example that many companies are using **web scraping** for, is to create strategic marketing decisions after scraping social network profiles, to determine the posts with the most interactions.

### Prerequisites
Before we dive right in, the reader would need to have the following:
1. A good understanding of **Python** programming language.
2. A basic understanding of **HTML**.

Now after having a brief about **web scraping** let's talk about the most important thing, that is the "**legal issues**" surrounding the topic.

### How to know if the website allows web scraping?
- You have to add "/robots.txt" to the URL, such as www.facebook.com/robots.txt, so that you can see the scraping rules (for the website) and see what is forbidden to scrap.

For example:

```bash
User-agent: *
Crawl-delay: 5
Disallow: /trap
```

The rule above tells us that the site is doing a delay of 5 sec between the requests.

Another example:

```bash
User-agent: Discordbot
Allow: /*/videos/
```

On www.facebook.com/robots.txt you can find this rule listed above, it means that a Discord bot has the permission to do **web scraping** on Facebook videos.

- You can run the following Python code that makes a **GET** request to the website server:

```python
  import requests
  r=requests.get("URL FOR THE WEBSITE")
  print(r.status_code)
```

If the result is a **200** then you have the permission to perform **web scraping** on the website, but you also have to take a look at the scraping rules.

As an example, if you run the following code:

```python
import requests
r=requests.get("https://www.monster.com/")
print(r.status_code)
```

If the result is a **200** then you have the permission to start crawling, but you must also be aware of the following **Points**:

- You can only scrape data that is available to the public, like the prices of a product, you can not scrape anything private, like a **Sign In** page.
- You can't use the scraped data for any commercial purposes.
- Some websites provide an **API** to use for web scraping, like Amazon, you can find their **API** [here](https://developer.amazonservices.com/ref=rm_5_sv).

As we know, **Python** has different libraries for different purposes.

In this tutorial, we are going to use **Beautiful Soup4**, **urllib**, **requests**, and **plyer** libraries.

For **Windows** users you can install it using the following command in your terminal:

```bash
pip install beautifulsoup4 urllib3 plyer requests
```

For **Linux** users you can use:

```bash
sudo apt-get install bs4 urllib3 plyer requests
```

You're ready to go, let's get started and learn a bit more on **web scraping** through two real-life projects.

### Reddit Web Scraper
One year ago, I wanted to build a smart **AI** bot, I aimed to make it talk like a human, but I had a problem, I didn't have a good dataset to train my bot on, so I decided to use posts and comments from **REDDIT**.

Here we will go through how to build the basics of the aforementioned app step by step, and we will use https://old.reddit.com/.

```python
import requests
from bs4 import BeautifulSoup
url = "https://old.reddit.com/top/"
headers = {"User-Agent": 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.121 Safari/537.36'}
page = requests.get(url,headers=headers)
soup = BeautifulSoup(page.content, 'html.parser')
```

First of all, we imported the libraries we want to use in our code.

**Requests** library allows us to do GET, PUT,.. requests to the website server, and the **beautiful soup** library is used for parsing a page then pulling out a specific item from it. We'll see it in a practical example soon.

Second, the URL we are going to use is for the **TOP** posts on Reddit.

Third, the headers part with "User-Agent" is a browser-related method to not let the server know that you are a bot and restrict your requests number, to find out your "User-Agent" you can do a web search for "what is my User-Agent?" in your browser.

Finally, we did a get request to connect to that URL then to pull out the HTML code for that page using the **Beautiful Soup** library.

Now let's move on to the next step of building our app:

Open this [URL](https://old.reddit.com/top/) then press **F12** to inspect the page, you will see the HTML code for it. To know in what line you can find the HTML code for the element you want to locate, you have to do a right-click on that element then click on inspect.

After doing the process above on the first title on the page, you can see the following code with a highlight for the tag that holds the data you right-clicked on:

![](/engineering-education/getting-started-with-web-scraping-using-python/1.PNG)

Now let's pull out every title on that page. You can see that there is a "div" that contains a table called siteTable, then the title is within it.

First, we have to search for that table, then get every "a" element in it that has a class "title".

```python
table = soup.find("div",attrs={'id':'siteTable'})
titles = table.find_all("a",class_="title")
```

Now from each element, we will extract the text that is the title, then put every title in the dictionary before printing it.

```python
extracted_records = []
for title in titles:
    extracted_title = title.text
    record = {
        'title': extracted_title,
        }
    extracted_records.append(record)
print(extracted_records)
```

After running our code you will see the following result, which is every title on that page:

```bash
[{'title': 'read it VERY CLOSELY'}, {'title': 'Rural America 2020 billboard outside the Des Moines Airport where Trump will hold his hangar rally'}, {'title': 'TIL a very frugal librarian, the late Robert Morin, left millions of his life savings to the University of New Hampshire where he worked as a librarian, then the University spent $1 million dollars of that money on a scoreboard for a new football stadium.'}, {'title': "Homeless guy is a human too, don't be like these people"}, {'title': 'Ah, victory'}, {'title': 'On the last day to register to vote in Virginia, my brother-in-law finally became a citizen!'}, {'title': 'Thousands of Amazon workers demand time off to vote'}, {'title': 'Vulture hitches ride on selfie stick'}, {'title': 'That about sums it up.'}, {'title': 'My uncle got a notification that someone was ringing his doorbell. This was the culprit.'}, {'title': 'A young culinary mastermind!'}, {'title': 'Tax Return in Australia gives you a breakdown of where your money went'}, {'title': 'that free fall sure is exciting though'}, {'title': 'Cyberpunk 2077s entire script "The game worth a million words..." (literally)'}, {'title': 'Please save your money.'}, {'title': 'Smart stonks'}, {'title': 'Jono Lancaster was given up for adoption because of his birth defect and now he’s a professional model, a teacher and an inspiration to millions!'}, {'title': "We've all been there"}, {'title': 'Future looking bright'}, {'title': 'This is the first time I’ve seen this type of Halloween decoration'}, {'title': 'I got my bet on him'}, {'title': 'How OP made Leonardo DiCaprio!'},
{'title': 'Wish I could afford to move...'}, {'title': 'Tough choice'}, {'title': 'Coming in full swing'}]
```

Finally, you can do the same process for the comments and replies to build up a good dataset as mentioned before.

When it comes to web scraping, an API is the best solution that comes to the mind of most data scientists. APIs (Application Programming Interfaces) is an intermediary that allows one software to talk to another. In simple terms, you can ask the **API** for specific data by passing JSON to it and in return, it will also give you a JSON data format.

For example, Reddit has a publicly-documented API that can be utilized that you can find [here](https://www.reddit.com/dev/api).

Also, it is worth mentioning that certain websites contain XHTML or RSS feeds that can be parsed as XML (Extensible Markup Language). XML does not define the form of the page, it defines the content, and it's free of any formatting constraints, so it will be much easier to scrape a website that is using XML.

For example, REDDIT provides RSS feeds that can be parsed as XML that you can find [here](https://old.reddit.com/.rss).

Let's build another app to better understand how web scraping works.

### COVID-19 Desktop Notifer
Now, we are going to learn how to build a notification system for Covid-19 so we will be able to know the number of new cases and deaths within our country.

The data is taken from [worldmeter](https://www.worldometers.info/coronavirus/) website where you can find the COVID-19 **real-time** update for any country in the world.

Let's get started by importing the libraries we are going to use:

```python
from urllib.request import urlopen,Request
from bs4 import BeautifulSoup as bs
from plyer import notification
import time
```

Here we are using **urllib** to make requests, but feel free to use the **request** library that we used in the **Reddit Web Scraper** example above.

We are using the **plyer** package to show the notifications, and the **time** to make the next notification pop up after a time we set.

```python
header = {"User-Agent":"Mozilla"}
req = Request("https://www.worldometers.info/coronavirus/country/us/", headers = header)
html = urlopen(req)
```

In the code above you can change **US** in the URL to the name of your country, and the urlopen is doing the same as opening the URL in your browser.

Now if we open this [URL](https://www.worldometers.info/coronavirus/country/us/) and scroll down to the **UPDATES** section, then right-click on the "new cases" and click on inspect, we will see the following HTML code for it:

![](/engineering-education/getting-started-with-web-scraping-using-python/2.PNG)

We can see that the new cases and deaths part is within the "li" tag and "news_li" class, let's write a code snippet to extract that data from it.

```python
obj = bs(html,'html.parser')
new_cases = obj.find("li", {"class":"news_li"}).strong.text.split()[0]
new_deaths = list(obj.find("li", {"class":"news_li"}).strong.next_siblings)[1].text.split()[0]
```

After pulling out the HTML code from the page and searching for the tag and class we talked about, we are taking the strong element that contain in the first part the new cases number, and in the second part the new deaths number by using "next siblings".

```python
while True:
   notification.notify(title="COVID-19 Update"
                      ,message="new Cases - " + new_cases +"\nnew Deaths - "+ new_deaths)
   time.sleep(20)
```

In the last part of our code, we are making an infinite while loop that uses the data we pulled out before, to show it in a notification pop up.
The delay time before the next notification will pop up is set to 20 seconds which you can change to whatever you want.

After running our code you will see the following notification in the right-hand corner of your desktop.

![](/engineering-education/getting-started-with-web-scraping-using-python/3.PNG)

### Conclusion
We’ve just proven that anything on the web can be scraped and stored, there are a lot of reasons why we would want to use that information, as an example:

Imagine you are working with a social media platform, and you have a task that is deleting any posts that may be against the community, the best way of doing that task is by developing a web scraper application that scrapes and stores the likes and comments number for every post, after that if the post received a lot of comments but without any like, we can deduce, that this particular post may be striking a chord in people and we should take a look at it.

There are a lot of possibilities, and it’s up to you (as a developer) to choose how you will use that information.
