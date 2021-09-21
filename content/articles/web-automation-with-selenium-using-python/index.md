---
layout: engineering-education
status: publish
published: true
url: /web-automation-with-selenium-using-python/
title: Getting Started with Web Automation using Selenium with Python
description: This article will be an introduction to Web automation using Selenium. We will be using Python to build automation scripts using Selenium for automating web processes.
author: nathaniel-dauda-musa
date: 2021-09-04T00:00:00-09:20
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/web-automation-with-selenium-using-python/hero.jpg
    alt: Selenium web automation image
---
Automation can be seen as a process of removing human effort in a process that uses electronic machines or robots to perform tasks.

In this article, we will be looking at automating web processes.

The ability to enable software robots to automatically perform processes and tasks on the web is known as web automation.

Using web automation we can do a lot of things, For example:
- Search the web.
- Delete emails.
- Fill forms.
- Log into websites.

The need for speed in performing repetitive tasks is a necessity in the modern world, this makes automation necessary.

Selenium is a framework used for web application testing, automating software tests, and scraping the web.

In python, selenium can be seen as a set of libraries that helps developers interact with the web to enable the automation of web processes.

Selenium is a very powerful tool when it comes to interacting with web browsers, it supports all modern web browsers and can be coded in various programming languages such as Java, Python, C#, and so on.

In this guide, we will be looking at how to use selenium to write scripts that will automate basic web tasks using Python.

### Prerequisite
To understand this guide, the reader must be familiar with:
- HTML tags, elements, IDs, and classes.
- Basics of Python programming language

### Goal
In this guide, we will be focusing on building two python automation scripts.

One will perform a Google search based on the keyword "University", and the other will automatically log in to [Quora](https://quora.com).

At the end of this guide the reader will be able to write python scripts that can:
- Find elements in the browser.
- Insert text to form fields in the browser.
- Click buttons in the browser.

The expected result would be:

![demo](/engineering-education/web-automation-with-selenium-using-python/demo.gif)

### Setting up the environment
First, we will need to create a virtual environment in Python. Click [here](/engineering-education/introduction-to-virtual-environments-and-dependency-managers/) to learn how to create a virtual environment.

To work with selenium, we will have to install selenium. To install, use the following command:

```bash
pip install selenium
```

We also have to install a web driver (a tool that is needed for web automation). The web driver helps us interact with the browser.

If you are using Windows, we will be using a windows package manager known as `chocolatey` to install the web driver.

Click [here]( https://chocolatey.org/install) to install chocolatey.

To install, we will use the command below:

```shell
choco install chromedriver
```

If you are using macOS, we will use the command below:

```shell
brew cask install chromedriver
```

The version of `chromedriver` should be compatible with your browser version.

If you encounter a compatibility error, then download the driver based on your browser version from [here](https://chromedriver.chromium.org/downloads).

### Automating Google search
Create a file `app.py` and add the code below:

```python
from selenium import webdriver

driver = webdriver.Chrome()
driver.get('https://www.google.com/')
```

The above code snippet is used to open a browser and request a web `url`.

The first line of code imports the web driver from Selenium. The second line opens the chrome web driver `driver`.

> NOTE: There are different web drivers for different browsers. If you prefer to use a different browser, browse for the driver's name on the internet.

For instance, we would use `firefoxDriver` for the Firefox browser.

On the third line, we use `driver` to send a request to the browser requesting the `url`.

You can run the code using the command below:

```bash
python app.py
```

The above code opens up the Chrome browser as shown in the image below:

![browser open image](/engineering-education/web-automation-with-selenium-using-python/image1.PNG)

Next, we will be entering a `search` keyword into the search field of the Google website.
To do that, we will have to get the search field element by inspecting the page.

To inspect the page, right-click on the Google website page and click on `Inspect element`.

The browser will open a window as shown in the image below:

![inspect browser](/engineering-education/web-automation-with-selenium-using-python/image2.PNG)

Before we continue, we will need to understand what locators in selenium are.

**Locators** are ways we can identify web elements on the web page with. They help us find any element on the webpage.

There are different types of locators we can use to identify elements on a web page. They include - `id`, `class`, `name`, and `xpath`.

We use them as shown below:
- `find_element_by_id`. 
- `find_element_by_name`.
- `find_element_by_className`.
- `find_element_by_xpath`.

From the above `id`, `name`, and `className` are HTML attributes used inside HTML tags to control their behavior.

`xpath` stands for extensible markup language path (**XML path**) is a syntax for finding elements on a webpage.

To get the element, hover on the `div` tags and keep opening the one that highlights the search bar inclusive until you find the one that highlights only the search field.

Then, right-click the tag, click on copy `xpath`. Next, paste the `xpath` as shown:

```python
searchField = driver.find_element_by_xpath('/html/body/div[1]/div[3]/form/div[1]/div[1]/div[1]/div/div[2]/input')
searchField.send_keys('university')

searchField.submit()
```

From the above code snippet:
- We initialized the variable `searchField` with the `xpath` value that we copied.
- `send_keys()` is used to insert the text in the `searchField` object.
- `searchField.send_keys('university')` inserts the value `university` into the search box.
- `searchField.submit()` submit the search request.

> NOTE: You can also search for the `submit` button if the web page has such an element and use the `click()` method on it. But, the `submit()` method makes it easier.

Your complete code will look like the snippet below:

```python
from selenium import webdriver

driver = webdriver.Chrome()
driver.get('https://www.google.com/')

searchField = driver.find_element_by_xpath('/html/body/div[1]/div[3]/form/div[1]/div[1]/div[1]/div/div[2]/input')
searchField.send_keys('university')

searchField.submit()
```

If you run your code, it will open up the browser, request for the Google webpage, input the `university` value in the search box, and submits it automatically.

### Automate logging into a website
Using what we have learned from the previous example let us try to log in to the Quora website. To do that let us create a new file inside our project directory with the name `main.py`. Paste or type in the below code into the file.

```python
from selenium import webdriver

driver = webdriver.Chrome()

driver.get('https://www.quora.com/') # Open Quora website

emailField = driver.find_element_by_xpath('//*[@id="email"]') # HTML tag element for email field
emailField.send_keys('YourEmail') # Login user name

passwordField = driver.find_element_by_xpath('//*[@id="password"]') # HTML tag element for password field
passwordField.send_keys('YourPassword') # Login password

button = driver.find_element_by_xpath('//*[@id="root"]/div[2]/div/div/div/div/div/div[2]/div[2]/div[4]/button/div/div/div') # HTML tag element for button

button.click() # onClick event handler for HTML button
```

From the code snippet above:
- First, we import `webdriver` from `selenium`.
- To avoid multiple usages of `webdriver.Chrome()`, we store them in a variable `driver`.
- `driver.get('https://www.quora.com/')` sends a request to [Quora](https://quora.com).
- `emailField = driver.find_element_by_xpath('//*[@id="email"]')` finds the `email` field by `xpath`.
- `emailField.send_keys('YourEmail')` inserts the email address into the `email` field.
- `passwordField = driver.find_element_by_xpath('//*[@id="password"]')` finds the password field by `xpath`.
- `passwordField.send_keys('YourPassword')` inserts the password into the `password` field.
- `button = driver.find_element_by_xpath('//*[@id="root"]/div[2]/div/div/div/div/div/div[2]/div[2]/div[4]/button/div/div/div')`, finds the `login` button by `xpath`.
- `button.click()` clicks the `login` button.

When you run the app, the Chrome browser opens, sends a request to the Quora website, fills in the login details, and logs you into your Quora account.

### Conclusion
In conclusion, we were able to write two Python scripts that perform a Google search and logins to Quora.

Understanding the two examples above will give you an understanding of how you can use selenium to:
- Direct to any URL.
- Find any HTML element.
- Fill and submit any form.

You can check out the full code [here](https://github.com/wobin1/google-search-automation).

### Further reading
- [Selenium with Python](https://selenium-python.readthedocs.io/)
- [Modern Web Automation with Python](https://realpython.com/modern-web-automation-with-python-and-selenium/)
- [Getting Started with Selenium Automation](engineering-education/getting-started-with-selenium-automation-testing/)
- [Automation Testing in Selenium](engineering-education/automation-testing-in-selenium/)

---
Peer Review Contributions by: [Srishilesh P S](/engineering-education/authors/srishilesh-p-s/)
