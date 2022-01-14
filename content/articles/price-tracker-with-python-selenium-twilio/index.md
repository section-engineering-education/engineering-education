---
layout: engineering-education
status: publish
published: true
url: /price-tracker-with-python-selenium-twilio/
title: How to Build an Amazon Price Tracker using Python, Selenium, and Twilio
description: This tutorial will show the reader how to use Twilio's Programmable SMS service in Python to build a price tracker. 
author: muhammed-ali
date: 2022-01-05T00:00:00-12:12
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/price-tracker-with-python-selenium-twilio/hero.jpg
    alt: Authentication using Facebook Hero Image
---
Checking regularly if the price of a particular product has gone down can be a bit tiring. This tutorial will guide readers on how to build an automated price tracker in Python.
<!--more-->
We will use `Selenium` and `BeautifulSoup` libraries to retrieve the prices of a particular searched product and then compare it with the price that you expect the item to fall below.

If any of the prices are in your expected range, [Twilio](https://www.twilio.com/) will send an SMS to notify you that there are products in your price range. The SMS will also contain the number of products in your price range.

We will also need a job that will run our script daily. [Heroku scheduler](https://devcenter.heroku.com/articles/clock-processes-python) enhances this process. This tutorial will show you how to set up a scheduled job with the Heroku scheduler. You can find the code on [GitHub](https://github.com/khabdrick/twilioXseleniumXpython).

### Prerequisites
To follow along with this tutorial, you will need:
- [Python](https://www.python.org/) installation.
- A free [Twilio](https://www.twilio.com/) account.
- A basic understanding of web scraping.

### Introduction to Selenium and Beautiful Soup
Selenium is an excellent tool for browser automation, automation testing, web scraping, as well as interacting with web pages.  For example, it allows a program to interact with a browser, and scrap a web page. We will use Selenium combined with Beautiful Soup for web scraping. 

Beautiful Soup is a Python package for parsing HTML and XML documents. We will use it to scrape a list of shoes on Amazon. [Selenium web driver](https://selenium-python.readthedocs.io/) uses a real web browser to access a website. This activity simulates an ordinary user browsing instead of a bot. This is beneficial because some websites restrict unauthenticated users from web scraping activities.

### Searching for a product on Amazon
The first step is to install `Selenium`, `Webdriver manager`, and `Beautiful Soup` using the below command:

```bash
$ pip install selenium beautifulsoup4 webdriver-manager
```

Next, create a Python file for your code and paste the imports below.

```python
from bs4 import BeautifulSoup
from selenium.webdriver.chrome.options import Options
from selenium import webdriver
```

If you search for a product on Amazon, you will notice that the search term is always embedded into the site's URL. We can use this information to create a function that will search for `air force 1`.
This is how the search link for `air force 1` will appear in the browser: `https://www.amazon.com/s?k=air+force+1&ref=nb_sb_noss_2`

Let's write a function to generate a `URL` for the search:

```python
def get_url(search_text):
"""Generate a url from search text"""

    url = f"https://www.amazon.com/s?k={search_text}&ref=nb_sb_noss_1"

    # add page query for pagination

    url += "&page{}"

    return url
```

### Extracting price from search results
To extract the price, we need to right-click on the Amazon search results page, and then click on `Inspect` and navigate to the `Elements` tab. Look for an HTML tag that is unique to each of the items. This will ease the extraction process.

When you click on a tag in the `Elements` tab, you will see that it highlights portions of the web page where the tag is located. We have to look even deeper to find the tag and element that uniquely identifies the prices. Based on the available fields, it appears that the tag `<data-component-type>` with its value of `s-search-result` is a good option to identify the item.

If you go even further into the tag, you will see a `<span>` tag that displays the prices, as shown [here](https://lh3.googleusercontent.com/h-84RMWNSJBrxi17OmNuBuxCmACioWi7sLLJDAzXHtDxc2n05ZQs1LBN3fJjOp6VgDRimRIldWdia1fcQSkGg_AdO7hD_6Y7it6llBPXm2jw4R0llgFVhPTxBRS4JQvZnX_T1GK4). We will use this attribute in our code.

To extract the prices, add the following code to your project:

```python
def extract_record(single_item):
"""Extract and return data from a single item in the search"""

# because some products don't have prices you have to

# use try-except block to catch AttributeError

    try:

# Get product prices from page HTML

        price_parent = single_item.find(“span”, “a-price”)

        price = price_parent.find(“span”, “a-offscreen”).text

    except AttributeError:

        return

    return price
```

### Retrieving all prices in the search results
To fetch all the prices, we will dive into the HTML elements again and retrieve the tag `<data-component-type>` with its value of `"s-search-result"`. 

Next, paste the code below.

```python
def main(search_term, max_price):
"""This function will accept the search term and the maximum price you are expecting the product to be"""

# startup the webdriver

    options=Options()
    
  options.headless = True #choose if we want the web browser to be open when doing the crawling 
  driver = webdriver.Chrome('/home/muhammed/Desktop/dev/blog-repo/twilioXseleniumXpython/chromedriver',options=options)
    prices_list=[] # this will hold the list of prices

    url = get_url(search_term) # takes the search term to get_url() function above.

    for page in range(1, 5):
    
    """For loop to get each item in the first 5 pages of the search"""

        driver.get(url.format(page))
        soup = BeautifulSoup(driver.page_source, "html.parser") #retrieve and parse HTML text.
        results = soup.find_all("div", {"data-component-type": "s-search-result"}) #get all the attributes of each item

        for item in results:
            record = extract_record(item) #takes each item to extract_record() function above to get the prices
            if item:
                prices_list.append(item)
```

The above code will go through the first 5 pages of the search results and fetch the prices.

### Fetching prices that meet the specified budget
To retrieve prices that are less than or equal to the budget, you have to use a loop statement. The above code will display prices. However, those figures have characters such as `$` and `,` which makes it impossible to do a comparison.

To eliminate these symbols, add the following code in the `main()` function:

```python
new_prices= [s.replace("$", "").replace(",","") for s in prices_list] # goes through the `price_list` and eliminate the symbols
new=[] #this will contain the new list of prices ready for comparison.

prices_float = [float(i) for i in new_prices]  # converts the value from a string to float so that the comparison can be done

for i in prices_float:

“””For loop to handle the comparison”””

    if i <= max_price:

        new.append(i)
```

### Adding Twilio Programmable SMS
#### Access your Twilio credentials
Your `Account SID` and `Auth Token` will enable you to connect to the Twilio API. These credentials can be found on [Twilio's console page](https://console.twilio.com/).

>*Note: Your account SID and Auth Token must always be hidden!*

#### Handling the alert
In this section, we will need the [Twilio package](https://www.twilio.com/docs/libraries/python) for Python which allows one to use the [Twilio Programmable SMS API](https://www.twilio.com/docs/sms) to send and receive SMS messages.

Run the command below to install the Twilio package locally:

```bash
$ pip install twilio
```

Next, import the Twilio client using the following code:

```python
from twilio.rest import Client
```

Next, navigate to the Twilio console page and [get your Twilio phone number](https://www.twilio.com/docs/usage/tutorials/how-to-use-your-free-trial-account). 

Then, paste the below code in to the `main()` function:

```python
client.messages.create(

# To send SMS to mobile phone

to="+2348888888", # Your phone number, don’t forget to add the country code. This should be hidden

from_="+14688888", # Your Twilio phone number. This should be hidden

body=f"There are {len(new)} air force 1s within budget, ${max_price}" # message that will be sent to your mobile phone

)
```

#### Testing
To test the application, just input `your price range`, `the item you want to search`, then run the program and it will do the rest. Add the values that will be passed in the `main("air force 1", 300)` function at the end of your code and then run it.

An SMS will be sent to your phone.

>Note that I built this project using a free Twilio phone number that's why it has `Sent from Twilio trial account` in the text.

### Adding a scheduled job
At the moment, we have to constantly go to the terminal to run the script which can be a bit annoying. Well, in this section I will show you how to create a scheduled job with Heroku so that Heroku can run your script automatically.

To do this, follow the steps below:

Create an account with [Heroku](https://www.heroku.com/) if you don't have one already. Then install the [Heroku-CLI](https://devcenter.heroku.com/articles/heroku-cli) on your local machine. 

Next, create a `requirements.txt` file. This is where we will put a list of all the dependencies required to run the project. In the `requirements.txt` file, paste the statement below.

```bash
selenium==4.1.0
beautifulsoup4==4.10.0
webdriver-manager==3.5.2
twilio==7.3.2
bs4==0.0.1
```

Then, create another file `runtime.txt` where you will specify your Python's version, as shown below:

```bash
python-3.8.10
```

Navigate to [Heroku Dashboard](https://dashboard.heroku.com/apps) and create an app for the project by clicking the **New** button on the dashboard page. Remember to give it a name. Next, log in to `Heroku-CLI` with `$heroku login` then initialize a `git` repository for your project. 

Link the project to a remote repository on Heroku. You can do that using the following commands:

```bash
$ git init
$ heroku git:remote -a <name-of-your-heroku-app>
```

Navigate to the Heroku dashboard and click on `your app` then on the "**Add buildpack"** button. Next, press the **Python** button to add it to the build pack. You will need to add buildpacks for the `Chromedriver` and `Headless Google Chrome`. 

Click on the **"Add buildpack"** button then paste the following links and save changes:

The buildpacks are:
- [Headless Google Chrome](https://github.com/heroku/heroku-buildpack-google-chrome)
- [Chromedriver](https://github.com/heroku/heroku-buildpack-chromedriver)
    
![build-pack.png](/engineering-education/price-tracker-with-python-selenium-twilio/build-pack.png)
    
We can now publish the application by committing code to the repository and deploying it to `Heroku` using `Git`.

```bash
$ git add .
$ git commit -m "initial commit"
$ git push heroku master
```

If it runs successfully, you will see the following output in your terminal:

![heroku-push.png](/engineering-education/price-tracker-with-python-selenium-twilio/heroku-push.png)

On your terminal, run `$ heroku run bash`. This command allows us to work with the project that we just deployed on Heroku. To check if you are on the right track, you can proceed to run the script.

To add the scheduler, on the Heroku Dashboard, click on the **Resources** tab then press on the **Find more add-ons** button:
    
![scheduler](/engineering-education/price-tracker-with-python-selenium-twilio/scheduler.png)
    
Then press on **Install Heroku Scheduler** and follow the prompts to complete the process.
    
![install-scheduler](/engineering-education/price-tracker-with-python-selenium-twilio/install-scheduler.png)
    
Once you have added the Scheduler, click on it then on the **Create job** button. You will be directed to a form where you will fill in the time you want your code to execute and also the actual command that should be executed. 
    
![heroku-job](/engineering-education/price-tracker-with-python-selenium-twilio/heroku-job.png)

### Conclusion
In this tutorial, you have learned how to scrape prices of items from Amazon, as well as how to use Twilio Programmable SMS. We also built software that alerts you in case certain prices drop. It counts the number of products that are within your price range and sends an alert to your phone daily. 

Hopefully, you should be able to integrate the knowledge gained from this tutorial into your future projects.

Happy coding!

---
Peer Review Contributions by: [Wanja Mike](/engineering-education/authors/michael-barasa/)