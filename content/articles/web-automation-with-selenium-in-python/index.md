### Introduction
Automation can be seen as a process of removing human effort in a process. It can be seen as a process of using electronic machines or robots to perform tasks. Automation can be done in many processes where humans are involved but in this article, we will be looking at automating web processes. 
The ability to enable software robots to automatically perform processes and tasks on the web is known as WEB AUTOMATION. These processes may include; searching the web, deleting emails, filling forms, logging in to a website, and many other processes. The need for speed in performing tasks is a necessity in our modern world, this makes the automation of repetitive tasks necessary.
Selenium is a framework for web application testing. In python, Selenium can be seen as a set of libraries that helps developers interact with the web to enable the automation of web processes. Primarily Selenium is used for automating software tests but it is also used for web scraping. Selenium is a very powerful tool when it comes to interacting with web browsers, it works with all modern web browsers and its scripts can be written in different programming languages such as Java, python, c#, etc.
In this guide, we will be looking at how to use selenium to write scripts that will automate basic web tasks using python to give you a background of how Selenium works.
### Prerequisite
To understand this guide the reader must be familiar with HTML syntax such as; tags, elements, Ids, and classes. It is also assumed the reader is familiar with the basics of python programming language, concepts such as its syntax and creating a virtual environment are required.
### Goal
In this guide, we will be writing a python script that will perform a search on a browser. At the end of this guide the reader will be able to write a python script that can;
- Find elements in the browser
- send a text to form fields in the browser
- Click buttons in the browser

### Setting up the environment
First, we will need to create a virtual environment for its best practice to create a virtual environment for every python project we want to build so we don’t have issues with our project in the future. Click [here](https://uoa-eresearch.github.io/eresearch-cookbook/recipe/2014/11/26/python-virtual-env/) to learn how to create a virtual environment if you don’t know how to create one.
To work with selenium we will have to install selenium, we will do that using the command below
```bash
pip install selenium
```
We also have to install a webdriver which is a tool that is needed for web automation. The web driver helps us interact with the browser. If you are using windows We will be using a windows package manager known as chocolatey to install the web driver, click [here]( https://chocolatey.org/install) to install chocolatey. To install we will use the command below
```
choco install chromdriver
```
If you are on a mac you the below command will do
```
brew cask install chromdriver
```
The chromedriver version should be compactable with your browser version but if in any way you encounter a compactable error, go to this [site](https://chromedriver.chromium.org/downloads) to download for your browser version and replace the one you have.

Create a file `app.py` or whatever you will want to call your app and update it with the code below.

```python
from selenium import webdriver

driver = webdriver.Chrome()

driver.get('https://www.google.com/')
```
The above code snippet is used to open a browser and request a web `url`. The first line of code is importing webdriver from Selenium, in the second line we used the webdriver to open chrome which we stored in a variable `driver`.

NOTE: There are different webdrivers for different browsers so if you prefer another browser just look for the webdriver for that browser on the internet, for instance, we would use `firefoxDriver` for the firefox browser. We are opening Chrome because we are using the `ChromeDriver`.

On the third line, we used the driver variable to send a request to the browser requesting for the `url` in the parenthesis. You can run the code using the command below

```
python app.py
```
app is the name of our app file, if the name of your app is different yours will be different. If your code is correct the code will open your chrome browser as shown in the image below.

![browser open image](/engineering-education/web-automation-with-selenium/image1.png)

Next, we will be inputting a search keyword into the search field in the Google website. To do that we will have to get the search field element by inspecting the page. to inspect the page, right-click on the Google website page and click on inspect. The browser will open a window like shown in the image below

![inspect browser](/engineering-education/web-automation-with-selenium/image2.png)

There are different locator strategies to locate elements from the inspect element window this includes;
- find_element_by_id 
- find_element_by_name
- find_element_by_class name
- find_element_by_xpath

We will be using xpath to get our elements in this guide but you can choose to use any of your choices. To get the element hover on the div tags and keep opening the one that highlights the search bar inclusive until you find the one that highlights only the search field then right-click on it, then click on copy and then click on copy xpath and paste it somewhere. Next, add the below lines to your code

```python
searchField = driver.find_element_by_xpath('/html/body/div[1]/div[3]/form/div[1]/div[1]/div[1]/div/div[2]/input')
searchField.send_keys('university')

searchField.submit()
```
From the above code snippet, we saved the element in a variable `searchField` we copied the xpath we copied from the inspect window and pasted it in that position i.e. into the parenthesis of the find element method.

send_keys() is used to input text in selenium so the code snippet `searchField.send_keys('university')` is sending the keyword university into the search box.
The code snippet `searchField.submit()` submit the search request.
NOTE: you can also search for the submit button if the site you are searching from has one and use the click() method on it. But the submit() method makes it easier.
Your complete code will look like the snippet below.
```python
from selenium import webdriver

driver = webdriver.Chrome()

driver.get('https://www.google.com/')

searchField = driver.find_element_by_xpath('/html/body/div[1]/div[3]/form/div[1]/div[1]/div[1]/div/div[2]/input')
searchField.send_keys('university')

searchField.submit()


```
If you run your code it will open your browser, request for the Google webpage, input the university keyword in the search box and click to search.

### Conclusion

In conclusion, we were able to write a python script that can perform a Google search. The few lines of code from the code snippet above can be used to do the following;
- go to any url
- find any Html element
- fill any form 
- submit any form
Link to github repo [here](https://github.com/wobin1/google-search-automation).

### Further reading
- [Selenium with python](https://selenium-python.readthedocs.io/)
- [modern web automation with python](https://realpython.com/modern-web-automation-with-python-and-selenium/)




