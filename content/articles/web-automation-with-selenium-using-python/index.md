### Introduction
Automation can be seen as a process of removing human effort in a process. It can be seen as a process of using electronic machines or robots to perform tasks. Automation can be done in many processes where humans are involved but in this article, we will be looking at automating web processes.

The ability to enable software robots to automatically perform processes and tasks on the web is known as WEB AUTOMATION. These processes may include; searching the web, deleting emails, filling forms, logging in to a website, and many other processes. The need for speed in performing tasks is a necessity in our modern world, this makes the automation of repetitive tasks necessary.

Selenium is a framework for web application testing. In python, Selenium can be seen as a set of libraries that helps developers interact with the web to enable the automation of web processes. Primarily Selenium is used for automating software tests but it is also used for web scraping. Selenium is a very powerful tool when it comes to interacting with web browsers, it works with all modern web browsers and its scripts can be written in different programming languages such as Java, python, c#, etc.
In this guide, we will be looking at how to use selenium to write scripts that will automate basic web tasks using python to give you a background of how Selenium works.

### Prerequisite
To understand this guide the reader must be familiar with HTML syntax such as; tags, elements, Ids, and classes. It is also assumed the reader is familiar with the basics of python programming language, concepts such as its syntax and creating a virtual environment are required.

### Goal
In this guide, we will be writing two python automation scrips one will perform a search on the keyword University and the other will login to qoura website. At the end of this guide the reader will be able to write a python script that can;
- Find elements in the browser
- send text to form fields in the browser
- Click buttons in the browser.

Our app will be able to run like the demo below.

![demo](/web-automation-with-selenium-using-python/demo.gif)

### Setting up the environment
First, we will need to create a virtual environment for its best practice to create a virtual environment for every python project we want to build so we don’t have issues with our project in the future. Click [here](https://uoa-eresearch.github.io/eresearch-cookbook/recipe/2014/11/26/python-virtual-env/) to learn how to create a virtual environment if you don’t know how to create one.

To work with selenium we will have to install selenium, we will do that using the command below:

```shell
pip install selenium
```

We also have to install a webdriver which is a tool that is needed for web automation. The web driver helps us interact with the browser. If you are using windows We will be using a windows package manager known as chocolatey to install the web driver, click [here]( https://chocolatey.org/install) to install chocolatey.

To install we will use the command below:

```shell
choco install chromdriver
```

If you are on a mac you the below command will do

```
brew cask install chromdriver
```

The chromedriver version should be compatible with your browser version but if in any way you encounter a compactable error, go to this [site](https://chromedriver.chromium.org/downloads) to download for your browser version and replace the one you have.

### Automating Google Search
Create a file `app.py` or whatever you will want to call your app and update it with the code below.

```python
from selenium import webdriver

driver = webdriver.Chrome()

driver.get('https://www.google.com/')
```

The above code snippet is used to open a browser and request a web `url`. The first line of code is importing webdriver from Selenium, in the second line we used the webdriver to open chrome which we stored in a variable `driver`.

> NOTE: There are different webdrivers for different browsers so if you prefer another browser just look for the webdriver for that browser on the internet, for instance, we would use `firefoxDriver` for the firefox browsers. We are opening Chrome because we are using the `ChromeDriver`.

On the third line, we used the driver variable to send a request to the browser requesting for the `url` in the parenthesis. You can run the code using the command below

```bash
python app.py
```

If your code is correct the code will open your chrome browser as shown in the image below.

![browser open image](/web-automation-with-selenium-using-pythonimage1.png)

Next, we will be inputting a search keyword into the search field in the Google website. To do that we will have to get the search field element by inspecting the page. to inspect the page, right-click on the Google website page and click on inspect. The browser will open a window like shown in the image below

![inspect browser](/web-automation-with-selenium-using-python/image2.png)

Before we continue we will need to understand what locators in selenium are. **Locators** are ways we can identify web elements on the web page. They help us find any element on the webpage. There are different types of locators we can use to identify elements on a web page they include; id, class , name, and xpath. We use them as shown below
- `find_element_by_id` 
- `find_element_by_name`
- `find_element_by_className`
- `find_element_by_xpath`

From the above `id`, `name`, and `className` are Html attributes used inside Html tags to control their behavior. `xpath` stands for extensible markup language path (**XML path**), its a syntax for finding elements on a webpage. Xpath helps in finding elements that cant be found by ids, names, and classes. In the course of this guide, we will be using xpath.

To get the element, hover on the `div` tags and keep opening the one that highlights the search bar inclusive until you find the one that highlights only the search field then right-click on it, then click on copy and then click on copy xpath and paste it somewhere. Next, add the below lines to your code

```python
searchField = driver.find_element_by_xpath('/html/body/div[1]/div[3]/form/div[1]/div[1]/div[1]/div/div[2]/input')
searchField.send_keys('university')

searchField.submit()
```

From the above code snippet, we saved the element in a variable `searchField` we copied the xpath we copied from the inspect window and pasted it in that position i.e. into the parenthesis of the find element method.

`send_keys()` is used to input text in selenium so the code snippet `searchField.send_keys('university')` is sending the keyword university into the search box.
The code snippet `searchField.submit()` submit the search request.

> NOTE: you can also search for the submit button if the site you are searching from has one and use the `click()` method on it. But the `submit()` method makes it easier.

Your complete code will look like the snippet below:

```python
from selenium import webdriver

driver = webdriver.Chrome()

driver.get('https://www.google.com/')

searchField = driver.find_element_by_xpath('/html/body/div[1]/div[3]/form/div[1]/div[1]/div[1]/div/div[2]/input')
searchField.send_keys('university')

searchField.submit()
```

If you run your code it will open your browser, request for the Google webpage, input the university keyword in the search box and click to search.

### Logging into a website
Using what we have learned from the previous example let us try to log in to the quora website. To do that let us create a new file inside our project directory with the name `main.py`. Paste or type in the below code into the file.

```python
from selenium import webdriver

driver = webdriver.Chrome()

driver.get('https://www.quora.com/')

emailField = driver.find_element_by_xpath('//*[@id="email"]')
emailField.send_keys('crixadsinfo@gmail.com')

passwordField = driver.find_element_by_xpath('//*[@id="password"]')
passwordField.send_keys('crixADS001')

button = driver.find_element_by_xpath('//*[@id="root"]/div[2]/div/div/div/div/div/div[2]/div[2]/div[4]/button/div/div/div')

button.click()
```

From the code snippet above, first we imported `webdriver` from `selenium`. Because we will use `webdriver.Chrome()` to perform almost every operation that's why saved it in the variable `driver` to avoid repetation. `driver.get('https://www.quora.com/')` is used to send to send a request for the qoura website. `emailField = driver.find_element_by_xpath('//*[@id="email"]')` is finding the email field by xpath. `emailField.send_keys('crixadsinfo@gmail.com')` is inputing our email into the email field. `passwordField = driver.find_element_by_xpath('//*[@id="password"]')` is finding the password field by xpath. `passwordField.send_keys('crixADS001')`, is inputing the password into the password field. `button = driver.find_element_by_xpath('//*[@id="root"]/div[2]/div/div/div/div/div/div[2]/div[2]/div[4]/button/div/div/div')`, is finding the login button by xpath. `button.click()` is clicking the login button. When you run the app app the app will start chrome, open the qoura website and fill in the login details and log you into your qoura account.

> Note: Change the login details in the code snippet to your own, because i will change my password by the time this article is published.

### Conclusion
In conclusion, we were able to write two python scripts one to perform a Google search and the other to login to quora. Understanding the two examples above will give you an understanding of how you can use selenium to;
- go to any URL
- find any Html element
- fill any form and
- submit any form

Link to github repo [here](https://github.com/wobin1/google-search-automation).

### Further reading
- [Selenium with python](https://selenium-python.readthedocs.io/)
- [modern web automation with python](https://realpython.com/modern-web-automation-with-python-and-selenium/)
- [getting started with selenium automation](engineering-education/getting-started-with-selenium-automation-testing/)
- [Automation testing in Selenum](engineering-education/automation-testing-in-selenium/)



