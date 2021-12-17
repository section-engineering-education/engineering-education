# How to Build a Price Tracker with Python, Selenium and Twilio

## Introduction

Instead of going to Amazon every time you want to check if the price of a particular product you want has dropped, why don’t you build something that will help you do that?

This tutorial will teach you how to use Twilio’s Programmable SMS services and Python to build a price tracker. 

We'll use Selenium and BeautifulSoup to get the prices of a particular searched product and then compare it with the price you expect the product to fall below. If any of the price(s) are in your expected range, [Twilio](https://www.twilio.com/) will send an SMS to you on your phone saying they are products in your price range. The SMS will also contain the number of products in your price range.

Finally, we will need a job that will run our script daily, [Heroku scheduler](https://devcenter.heroku.com/articles/clock-processes-python) makes this easy. I will show you how to set up a scheduled job with the Heroku scheduler to complete this process.

### Prerequisites

In order to complete this tutorial, you will need:

1. [Python](https://www.python.org/) installation
2. A free [Twilio](https://www.twilio.com/) account
3. Basic understanding of web scraping

## Introduction to Selenium and BeautifulSoup

Selenium is an excellent tool for browser automation, automation testing, web scraping, interacting with web pages, etc. For example, it can drive interactions with the browser, and scrap on a web page, which we will do in this tutorial.

You will use Selenium combined with Beautiful Soup for web scraping. Beautiful Soup is a Python package for parsing HTML and XML documents, you will use it to scrape a list of air force 1s on Amazon.

[Selenium](https://selenium-python.readthedocs.io/) is used in this tutorial mostly because it works very well with Python and also since the Selenium WebDriver uses a real web browser to access a website, the activity simulates an ordinary user browsing instead of a bot. This is beneficial because some websites restrict unauthenticated users from web scraping activities, but by simulating ordinary user browsing, we can log in and do our web scraping with no trouble.

## Build Software to Search Amazon and Scrape Names and Prices

First, install Selenium and Beautiful Soup.

```bash
$ pip install selenium beautifulsoup4 webdriver-manager
```

### Search for Product on Amazon

First, create a Python file for your code and paste the imports below.

```python
from bs4 import BeautifulSoup
from selenium.webdriver.chrome.options import Options
from selenium import webdriver
```

If you search for a product on Amazon, you will notice that the search term is always embedded into the URL of the site. We can use this information to create a function that will search for “air force 1”

This is how the search for “air force 1” will look on the browser: “https://www.amazon.com/s?k=air+force+1&ref=nb_sb_noss_2”

Now we are going to write a function to generate a URL for the search:

```python
def get_url(search_text):
"""Generate a url from search text"""

	url = f"https://www.amazon.com/s?k={search_text}&ref=nb_sb_noss_1"

	# add page query for pagination

	url += "&page{}"

	return url
```

## Extract Price From Search

First, right-click on your Amazon search results page, and click on “Inspect” and go to the “Elements” tab.

Look for an HTML tag that is unique to each of the items, which will ease the extraction process.

When you click on the tags in the "Elements" tab you will see that it highlights portions of the web page where the tag is. Now it's easier to spot which tag covers the whole item.

Now you have to look even deeper to find the tag and element that uniquely identifies the prices. Given the available fields, it appears that the tag `<data-component-type>` with its value of `"s-search-result"` is a good option to identify the item.

If you go even further into the tag, you will see a `<span>` tag that carries the prices. This is the attribute we will use in the code.

[https://lh3.googleusercontent.com/h-84RMWNSJBrxi17OmNuBuxCmACioWi7sLLJDAzXHtDxc2n05ZQs1LBN3fJjOp6VgDRimRIldWdia1fcQSkGg_AdO7hD_6Y7it6llBPXm2jw4R0llgFVhPTxBRS4JQvZnX_T1GK4](https://lh3.googleusercontent.com/h-84RMWNSJBrxi17OmNuBuxCmACioWi7sLLJDAzXHtDxc2n05ZQs1LBN3fJjOp6VgDRimRIldWdia1fcQSkGg_AdO7hD_6Y7it6llBPXm2jw4R0llgFVhPTxBRS4JQvZnX_T1GK4)

To extract the prices, add this to your code:

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

### Get All Prices in the Search

To get all the prices, you will dig into the elements again and get the tag `<data-component-type>` with its value of `"s-search-result"`. Next, paste the code below.

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
	
	“””For loop to get each item in the first 5 pages of the search”””

		driver.get(url.format(page))
		soup = BeautifulSoup(driver.page_source, "html.parser") #retrieve and parse HTML text.
		results = soup.find_all("div", {"data-component-type": "s-search-result"}) #get all the attributes of each item

		for item in results:
			record = extract_record(item) #takes each item to extract_record() function above to get the prices
			if item:
				prices_list.append(item)
```

As you can see, I have explained every but in a broader sense, the code above is just going through the first 5 pages of the search and getting the item prices.

## Get Prices that Meet the Budget

To get the prices that are less than or equal to the budget you have to compare each of the prices coming in the loop with the budget. The code so far will display the prices, but the problem is, those figures come with “$” and “,” making it impossible to do a comparison operation.

To eliminate these symbols, add the code below in the `main()` function:

```python
new_prices= [s.replace("$", "").replace(",","") for s in prices_list] # goes through the `price_list` and eliminate the symbols
new=[] #this will contain the new list of prices ready for comparison.

prices_float = [float(i) for i in new_prices]  # converts the value from a string to float so that the comparison can be done

for i in prices_float:

“””For loop to handle the comparison”””

	if i <= max_price:

		new.append(i)
```

## Add Twilio Programmable SMS

### Gather your Twilio credentials

To connect to Twilio’s API, you will need your Account SID, Auth Token. You can find them on the [Twilio console page](https://console.twilio.com/).

*Note: Your account SID and Auth Token must always be hidden!*

The next step is to code out the alert!

## Handling the Alert

For this section, you will need the [Twilio package](https://www.twilio.com/docs/libraries/python) for Python which allows you to use the [Twilio Programmable SMS API](https://www.twilio.com/docs/sms) to send and receive SMS messages.

Run the command below to install Twilio package locally:

```bash
$ pip install twilio
```

Next, import the Twilio client with:

```python
from twilio.rest import Client
```

Now, go to the Twilio console page and [get your Twilio phone number](https://www.twilio.com/docs/usage/tutorials/how-to-use-your-free-trial-account). After doing that, paste the code below into the `main()` function:

```python
client.messages.create(

# to send SMS to mobile phone

to="+2348888888", # your phone number, don’t forget to add the country code. This should be hidden

from_="+14688888", # your Twilio phone number. This should be hidden

body=f"There are {len(new)} air force 1s within budget, ${max_price}" # message that will be sent to your mobile phone

)
```

## Testing

To test, just input your price range, the item you want to search, and run the program will do the rest. Add the values that will be passed in the function `main("air force 1", 300)` to the end of your code and run!

Output:

An SMS will be sent to your phone.

[https://lh3.googleusercontent.com/7fmxkm3hLEmbDFoyLpFqxAp2hT3H-pCx93-RilzSUMr15Z5Q4_y2pPH3WhsvH3owdXnlexUD41PfBwapzjBZS7Mxq6LerVjNUpGkJ_oD6v0R4RC_tZkY93ktoVb_xZRdaYkVVZKv](https://lh3.googleusercontent.com/7fmxkm3hLEmbDFoyLpFqxAp2hT3H-pCx93-RilzSUMr15Z5Q4_y2pPH3WhsvH3owdXnlexUD41PfBwapzjBZS7Mxq6LerVjNUpGkJ_oD6v0R4RC_tZkY93ktoVb_xZRdaYkVVZKv)

I built this project with a free Twilio phone number that’s why it has “Sent from Twilio trial account” in the text.

## Add a Scheduled Job

At the moment, to run the code we have to constantly go to the terminal to run the script which can be a bit annoying. Well, in this section I will show you how to create a scheduled job with Heroku so that Heroku can run your script automatically daily without you doing anything.

To do this, follow the steps below:

1. Create an account with [Heroku](https://www.heroku.com/) if you don't have one already then [install the Heroku-CLI](https://devcenter.heroku.com/articles/heroku-cli) on your local machine. 
2. Create a `requirements.txt` file, this is where we will put a list of all the dependencies required to run the project successfully. In the `requirements.txt` file you just created, paste the statement below.

```
selenium==4.1.0
beautifulsoup4==4.10.0
webdriver-manager==3.5.2
twilio==7.3.2
bs4==0.0.1
```

Then create another file `runtime.txt` where the version of your Python will be. In the file paste the statement below.

```
python-3.8.10
```

3. Now go to [Heroku Dashboard](https://dashboard.heroku.com/apps) and create an app for the project by clicking the **New** button on the dashboard page then give a name to your application.
4. Next, log in to Heroku-CLI with `$ heroku login` then initialize a `git` repository for your project then link our project to a remote repository on Heroku. You can do that using the commands below.

```bash

$ git init
$ heroku git:remote -a <name-of-your-heroku-app>
```
5. Now go to the Heroku dashboard and click on your app then click on the "**Add buildpack"** button and click on **Python** to add it to the build pack. Next, you will need to add buildpacks for the Chromedriver and Headless Google Chrome. Click on the "**Add buildpack"** button then paste the links below one after the other then click on "**Save changes".** The buildpacks are
- Headless Google Chrome: [https://github.com/heroku/heroku-buildpack-google-chrome](https://github.com/heroku/heroku-buildpack-google-chrome)
- Chromedriver: [https://github.com/heroku/heroku-buildpack-chromedriver](https://github.com/heroku/heroku-buildpack-chromedriver)
    
    ![build-pack.png](/engineering-education/build-pack.png)
    
6. Now you can deploy your application by committing your code to the repository and deploying it to Heroku using Git.

```bash
$ git add .
$ git commit -m "initial commit"
$ git push heroku master
```

If it runs successfully, you will see something like the image below in your command line/terminal.

![heroku-push.png](/engineering-education/heroku-push.png)

7. On your terminal, run `$ heroku run bash`, this is so that we can work with the project we just deployed directly on Heroku. To check if you are on the right track, you can run the script.
8.  Now to add the scheduler, on the Heroku Dashboard click on the **Resources** tab then click on the **Find more add-ons** button, that is where you will find the add-on for the Scheduler.
The image below shows the add-on you should select.
    
    ![scheduler.png](/engineering-education/scheduler.png)
    
    Then click on **Install Heroku Scheduler** and follow the prompts to complete the process.
    ****
    
    ![install-scheduler.png](/engineering-education/install-scheduler.png)
    
9. Once you have added the Scheduler, click on it then click the **Create job** button. You will be prompted to a form where you will fill in the time you want your code to execute and also the actual command that is to be executed. Fill it in and click the **Save Job** button and everything is set.
    
![heroku-job.png.png](/engineering-education/heroku-job.png)
    

## Conclusion

In this tutorial, you have learned how to scrape prices of items from Amazon, use Twilio Programmable SMS, and build a software that will track the price of a particular product on Amazon to see if any of the product is within your budget. It counts the number of product that is within your price range and sends an alert to your phone daily. In the process of building the tracker, I could show how to do some data cleaning on the data that was received after scraping.

Hopefully, after reading this you will start looking into ways, you can integrate this into your future projects.